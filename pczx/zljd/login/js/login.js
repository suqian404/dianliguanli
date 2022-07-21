//页面加载 初始化页面信息
$(document).ready(function () {
    //默认用户名得到焦点
    $("#userName").focus();
});
//登录
function onLogin() {
    //输入验证
    if (true) {//runCheckRange($("#cardedit"))
        var bFlag = checkInput(true);
        if (bFlag) {
            var vUserName = $("#userName").val();
            var vUserPwd = $("#userPwd").val();
            var vTelCode = $("#telCode").val();
            var vIsTourist = $("#txtTourist").val();
            var o$S = new $S("userLogin", "0");
            o$S.setParamValue("default", "userName", vUserName);
            o$S.setParamValue("default", "userPwd", vUserPwd);
            o$S.setParamValue("default", "telCode", vTelCode);
            o$S.setParamValue("default", "telCodePwd", $("#telCodePwd").val());
            o$S.setParamValue("default", "IsTourist", vIsTourist);
            o$S.callService();
            if (o$S.getCode() >= 0) {
                var vResult = o$S.getDefaultParamValue("RESULT");
                if (vResult == "1") {
                    location.href = WEB_PATH + "/zljd/home/index.aspx";
                }
                else if (vResult == "2") {
                    $("#userName").val("");
                    $("#userPwd").val("");
                    $("#telCode").val("");
                    $("#userName").focus();
                    alert('您的账号还未审核,暂不能登录系统！');
                }
                else if (vResult == "3") {
                    $("#userName").val("");
                    $("#userPwd").val("");
                    $("#telCode").val("");
                    $("#userName").focus();
                    alert('您的账号已被禁用,不能登录系统！');
                }
                else if (vResult == "4") {
                    $("#userName").val("");
                    $("#userPwd").val("");
                    $("#telCode").val("");
                    $("#userName").focus();
                    alert("密码累计错误次数5次，您的账号已被锁定,请联系系统管理员解锁！");
                }
                else if (vResult == "5") {
                    var vLogErrorMsg = o$S.getDefaultParamValue("LOGIN_ERROR_MSG");
                    alert(vLogErrorMsg);
                }
                else if (vResult == "6") {  //短信校验错误
                    $("#userName").val("");
                    $("#userPwd").val("");
                    //$("#telCode").val("");    //正式使用去掉该行注释
                    $("#userName").focus();
                    var vInf = o$S.getDefaultParamValue("LOGIN_ERROR_MSG");
                    alert(vInf);
                }
                else if (vResult == "11") {  //短信校验错误
                    location.href = WEB_PATH + "/zljd/union/repeatUserInf.aspx";
                }
                else {
                    $("#userName").val("");
                    $("#userPwd").val("");
                    $("#telCode").val("");
                    $("#userName").focus();
                    alert('用户名或密码错误,请重新登录！');
                }
            }
            else {
                o$S.showErr(1);
            }
        }
    }
}
//回车登录
function onKeyPress(obj) {
    if (event.keyCode == 13) {
        var controlName = $(obj).attr("name");
        if (controlName == "userName") {
            $("#userPwd").focus();
        }
        else if (controlName == "userPwd") {
            getTelCode();
        }
        else if (controlName == "telCode") {
            onLogin();
        }
    }
}
//验证输入
function checkInput(bNeedTelCode) {
    var bFlag = true;
    var vUserName = $("#userName").val();
    var vUserPwd = $("#userPwd").val();
    var vTelCode = $("#telCode").val();
    //用户名密码，空指针验证
    if (vUserName == "") {
        bFlag = false;
        alert("用户名不能为空，请输入用户名！");
        $("#userName").focus();
    }
    if (bFlag) {
        if (vUserPwd == "") {
            bFlag = false;
            alert("登录密码不能为空，请输入登录密码！");
            $("#userPwd").focus();
        }
    }
    //用户名密码，特殊字符验证
    if (bFlag) {
        if (!validateSpecialCharacters(vUserName)) {
            bFlag = false;
            alert("用户名不能输入'  < > / \等敏感字符,请重新输入用户名！");
            $("#userName").val("");
            $("#userName").focus();
        }
    }
    if (bFlag) {
        if (!validateSpecialCharacters(vUserPwd)) {
            bFlag = false;
            alert("登录密码不能输入'  < > / \等敏感字符,请重新输入登录密码！");
            $("#userPwd").val("");
            $("#userPwd").focus();
        }
    }
    //短信口令验证
    if (bNeedTelCode) {
        if (bFlag) {
            if (vTelCode == "") {
                bFlag = false;
                alert("短信口令不能为空，请输入短信口令！");
                $("#telCode").focus();
            }
        }
        if (bFlag) {
            if (!validateSpecialCharacters(vTelCode)) {
                bFlag = false;
                alert("短信口令不能输入'  < > / \等敏感字符,请重新输入短信口令！");
                $("#telCode").val("");
                $("#telCode").focus();
            }
        }
        if (bFlag) {
            var regNum = /^[0-9]+.?[0-9]*$/;
            if (!regNum.test(vTelCode)) {
                bFlag = false;
                alert("短信口令必须为数字！");
            }
        }
        if (bFlag) {
            var vFlag = checkTelCode(vUserName, vUserPwd, vTelCode);
            if (vFlag == "1") {
                document.getElementById("userPwd").value = dealEncrypt(vUserPwd);
            }
            else {
                bFlag = false;
                alert("短信口令错误！");
            }
        }
    }
    return bFlag;
}
//设置短信口令失效时间
var iTime = 0;
var Account;
function RemainTime() {
    var iDay, iHour, iMinute, iSecond;
    var sDay = "", sHour = "", sMinute = "", sSecond = "", sTime = "";
    if (iTime >= 0) {
        iSecond = parseInt(iTime % 60);
        if (iSecond >= 0) {
            sSecond = iSecond + "秒后可重新获取短信口令";
        }
        if ((sDay == "") && (sHour == "")) {
            sTime = sSecond;
            $("#sendToTel").attr("disabled", true);
            $("#sendToTel").attr("href", "javascript:void();");
        }
        else {
            sTime = sSecond;
        }
        if (iTime == 0) {
            clearTimeout(Account);
            sTime = "获取短信口令";
            $("#telCodePwd").val("");
            $("#sendToTel").attr("disabled", false);
            $("#sendToTel").attr("href", "javascript:getTelCode();");
        }
        else {
            Account = setTimeout("RemainTime()", 1000);
        }
        iTime = iTime - 1;
    }
    else {
        $("#telCodePwd").val("");
        sTime = "获取短信口令";
    }
    $("#sendToTel").text(sTime);
}
//随机获取手机验证码
function getTelCode() {
    //输入验证
    var bFlag = checkInput(false);
    if (bFlag) {
        var vUserName = $("#userName").val();
        var vUserPwd = $("#userPwd").val();
        if (vUserName != "" && vUserPwd != "") {
            var o$S = new $S("getTelCode", "0");
            o$S.setParamValue("default", "userName", vUserName);
            o$S.setParamValue("default", "userPwd", dealEncrypt(vUserPwd));
            o$S.callService();
            if (o$S.getCode() >= 0) {
                var vLogErrorFlag = o$S.getDefaultParamValue("LOG_ERROR_FLAG");
                if (vLogErrorFlag == "1") {
                    $("#telCodePwd").val(o$S.getDefaultParamValue("TEL_CODE"));
                    alert("手机验证码已发送成功，请查收！");
                    $("#telCode").focus();
                    iTime = 59;
                    RemainTime();
                }
                else {
                    var vLogErrorMsg = o$S.getDefaultParamValue("LOG_ERROR_MSG");
                    alert(vLogErrorMsg);
                }
            }
            else {
                o$S.showErr(1);
            }
        }
        else {
            alert("请输入用户名\密码后，再获取短信口令！");
        }
    }
}
//短信口令验证
function checkTelCode(vUserName, vUserPwd, vTelCode) {
    //    var vFlag = "0";
    //    var o$S = new $S("checkTelCode", "0");
    //    o$S.setParamValue("default", "userName", vUserName);
    //    o$S.setParamValue("default", "userPwd", dealEncrypt(vUserPwd));
    //    o$S.setParamValue("default", "telCode", vTelCode);
    //    o$S.setParamValue("default", "telCodePwd", $("#telCodePwd").val());
    //    o$S.callService();
    //    if (o$S.getCode() >= 0) {
    //        vFlag = o$S.getDefaultParamValue("FLAG");
    //    }
    //    else {
    //        o$S.showErr(1);
    //    }
    //        return vFlag;
    return "1";
}
//密码加密(md5 sha256双重加密)
function dealEncrypt(vUserPwdParam) {
    var vReturnStr = CryptoJS.MD5(vUserPwdParam) + "";
    vReturnStr = CryptoJS.SHA256(vReturnStr) + "";
    return vReturnStr;
}
//找回密码
function findPwd() {
    location.href = WEB_PATH + "/ServicePlatform/main/login/find_pwd.aspx";
}

