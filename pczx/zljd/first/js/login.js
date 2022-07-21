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
            var o$S = new $S("userLogin", "0");
            o$S.setParamValue("default", "userName", vUserName);
            o$S.setParamValue("default", "userPwd", dealEncrypt(vUserPwd));
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
                    $("#userName").focus();
                    var vInf = o$S.getDefaultParamValue("LOGIN_ERROR_MSG");
                    alert(vInf);
                }
                else if (vResult == "11") { 
                    location.href = WEB_PATH + "/zljd/union/repeatUserInf.aspx";
                }
                else {
                    $("#userName").val("");
                    $("#userPwd").val("");
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

function doLogin() {
    //输入验证
    if (true) {//runCheckRange($("#cardedit"))
        var bFlag = checkInput(true);
        if (bFlag) {
            var vUserName = $("#userName").val();
            var vUserPwd = $("#userPwd").val();
            var vTelCode = $("#telCode").val();
            if (vUserName == "admin" && vUserPwd=="123456"){
                location="/pczx/zljd/login/dologin.html";
            }else {
                alert('用户名或密码错误,请重新登录！');
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
    return bFlag;
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

