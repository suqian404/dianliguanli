//处理json对象空指针以及不存在值报js错误的情况
function dealJsonObject(obj) {
    var objReturn;
    if (typeof obj != "undefined" && obj != null) {
        objReturn = obj;
    }
    else {
        objReturn = null;
    }
    return objReturn;
}
//处理json字符串
function dealJsonString(obj) {
    var vStr = "";
    if (typeof obj != "undefined" && obj != null) {
        vStr = obj;
    }
    return vStr;
}

//编码
function encodeParam(vStr) {
    return encodeURIComponent(vStr);
}

//解码
function decodeParam(vStr) {
    return decodeURIComponent(vStr);
}

//根据文件后缀，获取小图标
function getIconByFileExt(vExt) {
    if (vExt.indexOf(".") != -1) {
        vExt = vExt.substring(vExt.indexOf(".") + 1);
    }
    var vIconSrc = "/ServicePlatform/css/images/ext/";
    if (vExt == "asp" || vExt == "aspx" || vExt == "avi" || vExt == "bmp" || vExt == "doc" || vExt == "docx"
    || vExt == "fla" || vExt == "flv" || vExt == "gif" || vExt == "guard" || vExt == "help" || vExt == "html"
    || vExt == "htm" || vExt == "jpg" || vExt == "js" || vExt == "jsp" || vExt == "mov" || vExt == "mp3"
    || vExt == "mp4" || vExt == "pdf" || vExt == "php" || vExt == "png" || vExt == "ppt" || vExt == "pptx" || vExt == "rar"
    || vExt == "reg" || vExt == "rm" || vExt == "swf" || vExt == "ttf" || vExt == "txt" || vExt == "video"
    || vExt == "warn" || vExt == "video" || vExt == "wmp" || vExt == "wmv" || vExt == "xls" || vExt == "xlsx" || vExt == "zip") {
        vIconSrc = vIconSrc + vExt + ".gif";
    }
    else {
        vIconSrc = vIconSrc + "unknown.gif";
    }
    return vIconSrc;
}

//敏感字符过滤
function validateSpecialCharacters(vTextString) {
    var bFlag = true;
    if (vTextString.indexOf("'") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("<") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf(">") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("/") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("\\") != -1) {
        bFlag = false;
    }
    return bFlag;
}

function validateLeagalControl(vTextString) {
    var bFlag = true;
    if (vTextString.indexOf("'") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("\"") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("<") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf(">") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("/") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("\\") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("&") != -1) {
        bFlag = false;
    }
    if (vTextString.indexOf("!") != -1) {
        bFlag = false;
    }
    return bFlag;
}


//去掉字符串头尾空格   
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//替换成html格式   
function getHtmlStr(str) {
    return str.replace(/</g, "&lt").replace(/>/g, "&gt").replace(/\r\n/g, "<BR/>").replace(/\n/g, "<BR/>");
}
//表单验证时，过滤特殊字符,处理安全隐患
function fiterSpecialChars(vControlValue) {
    if (vControlValue.indexOf(">") != -1) {
        vControlValue = vControlValue.replace(new RegExp(">", "g"), "＞");
    }
    if (vControlValue.indexOf("<") != -1) {
        vControlValue = vControlValue.replace(new RegExp("<", "g"), "＜");
    }
    if (vControlValue.indexOf("'") != -1) {
        vControlValue = vControlValue.replace(new RegExp("'", "g"), "’");
    }
    if (vControlValue.indexOf("\"") != -1) {
        vControlValue = vControlValue.replace(new RegExp("\"", "g"), "”");
    }
    if (vControlValue.indexOf("&") != -1) {
        vControlValue = vControlValue.replace(new RegExp("&", "g"), "＆");
    }
    if (vControlValue.indexOf("!") != -1) {
        vControlValue = vControlValue.replace(new RegExp("!", "g"), "！");
    }
    //过滤左右两端空格
    vControlValue = vControlValue.replace(/(^\s*)|(\s*$)/g, "");

    return vControlValue;
}

/**
*验证指定范围内网页数据的有效性
*@objRange 指定范围的jquery对象
*/
function runCheckSpecialRange(objRange) {
    var bFlag = true;
    var objText = objRange.find("input[type='text']");
    objText.each(function () {
        if (!runValidateControl($(this))) {
            bFlag = false;
            return false;
        }
    });
    if (bFlag) {
        var objTextArea = objRange.find("textarea");
        objTextArea.each(function () {
            if (!runValidateControl($(this))) {
                bFlag = false;
                return false;
            }
        });
    }
    if (bFlag) {
        var objSelect = objRange.find("select");
        objSelect.each(function () {
            if ($(this).attr("multiple") != "multiple") {
                if (!runValidateControl($(this))) {
                    bFlag = false;
                    return false;
                }
            }
        });
    }
    return bFlag;
}

/**
*验证指定范围内网页数据的有效性
*@objRange 指定范围的jquery对象
*/
function runCheckRange(objRange) {
    var bFlag = true;
    var objText = objRange.find("input[type='text']");
    objText.each(function () {
        if (!$(this).is(":hidden")) {
            $(this).val(fiterSpecialChars($(this).val()));
            if (!runValidateControl($(this))) {
                bFlag = false;
                return false;
            }
        }
    });
    var objPwd = objRange.find("input[type='password']");
    objPwd.each(function () {
        if (!$(this).is(":hidden")) {
            if (!runValidateControl($(this))) {
                bFlag = false;
                return false;
            }
        }
    });
    if (bFlag) {
        var objTextArea = objRange.find("textarea");
        objTextArea.each(function () {
            $(this).val(fiterSpecialChars($(this).val()));
            if (!$(this).is(":hidden")) {
                if (!runValidateControl($(this))) {
                    bFlag = false;
                    return false;
                }
            }
        });
    }
    if (bFlag) {
        var objSelect = objRange.find("select");
        objSelect.each(function () {
            if ($(this).attr("multiple") != "multiple") {
                if (!$(this).is(":hidden")) {
                    if (!runValidateControl($(this))) {
                        bFlag = false;
                        return false;
                    }
                }
            }
        });
    }
    return bFlag;
}

/**
*验证ControlHandle对象
*@ControlHandle 代表网页控件
*/
function runValidateControl(ControlHandle) {
    var bReturn = true;
    //判断控件是否存在
    if (typeof ControlHandle == "undefined" || ControlHandle == null) {
        return;
    }
    //获取控件名称
    var desc = "未知控件";
    var controlId = ControlHandle.attr("id");
    if (typeof controlId != 'undefined' && controlId != null && controlId != "") {
        desc = controlId;
    }
    var controlName = ControlHandle.attr("name");
    if (typeof controlName != 'undefined' && controlName != null && controlName != "") {
        desc = controlName;
    }
    var controlDesc = ControlHandle.attr("desc");
    if (typeof controlDesc != 'undefined' && controlDesc != null && controlDesc != "") {
        desc = controlDesc;
    }
    //空指针验证 如果某些字段不能为空，则在此处进行验证
    var controlValue = getTrimString(ControlHandle.val());
    var allowNull = ControlHandle.attr("allownull");
    if (typeof allowNull != 'undefined' && allowNull != null && allowNull != "") {
        if (allowNull == "false" && controlValue == "") {
            bReturn = false;
            alert('* 说明: ' + desc + '\n\n* 描述: 输入值不能为空!');
        }
    }
    //校验空格
    var allowspace = ControlHandle.attr("allowspace");
    if(typeof allowspace != 'undefined' && allowspace != null){
        if (allowspace == "false") {
            if (bReturn) {
                var strValue = ControlHandle.val();
                if (strValue.indexOf(" ") > 0) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 输入值不能为空格!');
                }
            }
        }
    }



    //验证字节长度最大值、最小值
    if (bReturn) {
        var iCharacterLenth = getByteLength(ControlHandle.val()); //获取字节长度

        var iMax = parseInt(ControlHandle.attr("max"));
        if (typeof iMax != "undefined" && iMax != null) {
            if (iCharacterLenth > iMax) {
                bReturn = false;
                alert('* 说明: ' + desc + '\n\n* 描述: 输入值长度过长(不能超过' + (iMax) + "个字符)");
            }
        }
        if (bReturn) {
            var iMin = parseInt(ControlHandle.attr("min"));
            if (typeof iMin != "undefined" && iMin != null) {
                if (iCharacterLenth < iMin) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 输入值长度过短');
                }
            }
        }
    }
    //验证数据类型
    if (bReturn) {
        var dataType = ControlHandle.attr("datatype");
        if (typeof dataType != 'undefined' && dataType != null) {
            var strValue = ControlHandle.val();
            //验证数字
            if (dataType == "number") {
                if (!IsNumber(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的数字格式!');
                }
                /*else {   //用于判断number型数据的大小是否在max，min中
                    var vMax = parseInt(ControlHandle.attr("max"));
                    var vValue = parseFloat(strValue);
                    if (vValue > vMax) {
                        bReturn = false;
                        alert('* 说明: ' + desc + '\n\n* 描述: 输入值不能大于' + vMax);
                        return false;
                    }
                    var vMin = parseInt(ControlHandle.attr("min"));
                    if (vValue < vMin) {
                        bReturn = false;
                        alert('* 说明: ' + desc + '\n\n* 描述: 输入值不能小于' + vMin);
                        return false;
                    }

                }*/

            }
            //验证整数
            else if (dataType == "int") {
                if (!IsInteger(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的整数格式! 示例: -+0123456789');
                }
            }
            //验证正整数
            else if (dataType == "plus-int") {
                if (!IsPlusInt(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的正整数格式! 示例: 0123456789');
                }
            }
            //验证邮件格式
            else if (dataType == "email") {
                if (!IsMail(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的邮件格式! 示例: xxx@xxx.xxx');
                }
            }
            //电话号码
            else if (dataType == "phone") {
                if (!IsPhone(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的办公电话格式! 示例: 0755-12345678');
                }
            }
            //手机
            else if (dataType == "tel") {
                if (!IsTEL(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的手机号码格式! 示例: 13800138000')
                }
            }
            //全国信用机构代码
            else if (dataType == "code") {
                if (!IsCode(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的信用机构代码格式! 示例: G12345678912345678')
                }
            }
            //联系人
            else if (dataType == "staff") {
                if (!IsStaff(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 不能输入纯数字!');
                }
            }
            //传真
            else if (dataType == "fax") {
                if (!IsFax(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的传真格式! 示例: 1234-12345678')
                }
            }
            //验证http格式
            else if (dataType == "http") {
                if (!IsHttp(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的http格式! 示例: http://xxx.xxx.xxx');
                }
            }
            //验证日期格式
            else if (dataType == "date") {
                if (!IsDate(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的日期格式! 示例: 2014-01-01');
                }
            }
            //验证时间格式
            else if (dataType == "datetime") {
                if (!IsDateTime(strValue)) {
                    bReturn = false;
                    alert('* 说明: ' + desc + '\n\n* 描述: 请输入正确的时间格式! 示例: 2014-01-01 11:59:59');
                }
            }
        }
    }
    //特殊字符校验
    if (bReturn) {
        var bValidate = validateLeagalControl(controlValue);
        if (!bValidate) {
            bReturn = false;
            alert('* 说明: ' + desc + '\n\n* 描述: 非法字符输入！不容许输入字符\'"&!<>/\\');
        }
    }
    if (!bReturn) {
        if (!ControlHandle.is(":hidden")) {
            ControlHandle.focus();
        }
    }
    return bReturn;
}

function getByteLength(str) {
    var intCount = 0;
    var charCode;
    for (var i = 0; i < str.length; i++) {
        charCode = str.charCodeAt(i);
        /*if (charCode < 0x007f) {
            intCount++;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            intCount += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            intCount += 3;
        } else {
            intCount += 4;
        }*/
        if (charCode >= 0 && charCode <= 128) {
            intCount++;
        } else {
            intCount += 2;
        }

        // Ascii码大于255是双字节的字符
        //        if (str.charCodeAt(i) > 255) intCount += 2; else intCount += 1;
    }
    return intCount;
}
/**
*使用正则表达式校正时间格式
*@str 代表字符串
*/
function IsDateTime(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /\d{2,4}[-\/]\d{1,2}[-\/]\d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}
/**
*使用正则表达式校正http格式
*@str 代表字符串
*/
function IsHttp(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /http:\/\/[\w-]+(\.[\w-]+)*(\/[\w-]?)*$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}
/**
*使用正则表达式校正邮件格式
*@str 代表字符串
*/
function IsMail(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}
/**
*使用正则表达式校正数字格式
*@str 代表字符串
*/
function IsNumber(str) {
    str = getTrimString(str);
    if (!isNaN(str)) {
        return true;
    }
    else {
        return false;
    }
}
/**
*使用正则表达式校正整数格式
*@str 代表字符串
*/
function IsInteger(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /^[-+]?\d*$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}
/**
*使用正则表达式校正正整数格式
*@str 代表字符串
*/
function IsPlusInt(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /^[0-9]+$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}
/**
*使用正则表达式校正日期格式
*@str 代表字符串
*/
function IsDate(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /\d{2,4}[-\/]\d{1,2}[-\/]\d{1,2}$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}

//使用正则表达式校正电话号码格式
function IsPhone(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /\d{3}-\d{6,8}|\d{4}-\d{6,8}/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}

//使用正则表达式校正手机号码格式
function IsTEL(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /^\d{11}$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}
//使用正则表达式校正传真号格式
function IsFax(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /^(\d{3,4}-)?\d{7,8}$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}
//联系人格式校验(不能输入纯数字)
function IsStaff(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /^[0-9]*$/;
        if (reg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }
    return true;
}


//使用正则表达式校正全国信用机构代码格式
function IsCode(str) {
    str = getTrimString(str);
    if (str.length != 0) {
        var reg = /^[0-9a-zA-Z_-]{1,28}$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}


/**
*返回去掉左右两边空格的字符串
*@str 代表字符串参数
*/
function getTrimString(GetString) {
    return GetString.replace(/^\s+|\s+$/g, '');
}
/**
*返回去掉左边空格的字符串
*@str 代表字符串参数
*/
function getLTrimString(GetString) {
    return GetString.replace(/^\s+/, '');
}
/**
*返回去掉右边空格的字符串
*@str 代表字符串参数
*/
function getLTrimString(GetString) {
    return GetString.replace(/\s+$/, '');
}

/**
*关闭窗口
*/
function onCloseWindow() {
    try {
        top.Dialog.close();
    } catch (e) {
        window.close();
    }
}

/**
*清空表格
*/
function onClearTable(jqObj) {
    jqObj.find("tr:not(:first)").remove();
}

//安全参数处理
function encodeParameter(value) {
    return encodeURI(value);
}
/**
*获取参数
*@seekParameter 代表href
*/
function decodeParameter(seekParameter) {
    var url = location.href;
    if (url.indexOf("?") != -1) {
        var parameters = url.substr(url.indexOf("?") + 1);
        if (parameters.indexOf("&") != -1) {
            var parameterItems = parameters.split("&");
            var parameterName;
            var parameterVar;
            for (var i = 0; i < parameterItems.length; i++) {
                parameterName = parameterItems[i].split("=")[0];
                if (parameterName == seekParameter) {
                    var vParamterCell = parameterItems[i].split("=")[1];
                    parameterVar = decodeURI(vParamterCell);
                    return (parameterVar);
                }
            }
        }
        else {
            var parameterName = parameters.split("=")[0];
            var parameterVar = decodeURI(parameters.split("=")[1]);
            if (parameterName == seekParameter) {
                return (parameterVar);
            }
        }
    }
    return "";
}

//禁用所有可编辑
function disabledAll() {
    $("input[type='text']").attr("disabled", true);
    $("textarea").attr("disabled", true);
    $("select").attr("disabled", true);
    $("input[type='radio']").attr("disabled", true);
}

//激活所有禁用状态的编辑框
function activeAll() {
    $("input[type='text']").attr("disabled", false);
    $("textarea").attr("disabled", false);
    $("select").attr("disabled", false);
    $("input[type='radio']").attr("disabled", false);
}


