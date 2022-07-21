$S = function (sServiceName, iServiceType) {
    this.requestxml = "";
    this.browertype = "IE";
    var userAgent = navigator.userAgent; //ȡ���������userAgent�ַ���
    var isEdge = userAgent.indexOf("Edge") > -1; //�ж��Ƿ�IE��Edge�����
    var isChrome = userAgent.indexOf("Chrome") > -1; //�ж��Ƿ�ȸ������
    //IE�����
    if (window.ActiveXObject || "ActiveXObject" in window) {
        this.browertype = "IE";
    }
    //Edge�����
    else if (isEdge) {
        this.browertype = "EDGE";
        Node.prototype.__defineGetter__("xml", function () {
            return (new XMLSerializer).serializeToString(this);
        });
    }
    //�ȸ������
    else if (isChrome) {
        this.browertype = "CHROME";
        Node.prototype.__defineGetter__("xml", function () {
            return (new XMLSerializer).serializeToString(this);
        });
    }
    //�ȸ������
    else if (isEdge) {
        this.browertype = "EDGE";
        Node.prototype.__defineGetter__("xml", function () {
            return (new XMLSerializer).serializeToString(this);
        });
    }
    //��������
    else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        this.browertype = "FIREFOX";
        Node.prototype.__defineGetter__("xml", function () {
            return (new XMLSerializer).serializeToString(this);
        });
    }
    else {
        alert("ϵͳ��֧���������������ѡ���������ͼ��ʹ�������������");
        this.browertype = "NONE";
    }
    if (this.browertype != "NONE") {
        this.doc = newDom(this.browertype);
        var oNode = this.doc.createProcessingInstruction("xml", "version='1.0'");
        this.doc.appendChild(oNode);
        this.oRootNode = this.doc.createElement("ZZ");
        this.doc.appendChild(this.oRootNode);
        this.oDataNode = this.oRootNode;
        this.setParamAttribute(this.oDataNode, "VERSION", "2.0");
        this.setParamAttribute(this.oDataNode, "COMPANY", "���ڻ�����Ϣϵͳ���޹�˾");
        this.setParamAttribute(this.oDataNode, "COPYRIGHT", "2007~2010");
        if (sServiceName != null && sServiceName.length > 0) {
            oNode = this.doc.createElement("SERVICE");
            this.setParamAttribute(oNode, "NAME", sServiceName);
            if (typeof iServiceType != "undefined")
                this.setParamAttribute(oNode, "TYPE", iServiceType);
            else
                this.setParamAttribute(oNode, "TYPE", "0");
            this.oRootNode.appendChild(oNode);
        }
        this.serviceXml = null;
    }
};

$S.prototype.ref = function () {
    this.doc = newDom(this.browertype);
    if (this.browertype == "IE") {
        this.doc.loadXML(this.serviceXml);
    }
    else if (this.browertype == "EDGE") {
        var parser = new DOMParser();
        this.doc = parser.parseFromString(this.serviceXml, "text/xml");
    }
    else if (this.browertype == "FIREFOX") {
        var parser = new DOMParser();
        this.doc = parser.parseFromString(this.serviceXml, "text/xml");
    }
    this.oRootNode = this.doc.documentElement;
    this.oDataNode = this.oRootNode;
}
$S.prototype.callService = function () {
    this.serviceXml = this.doc.xml;
    this.requestxml = this.doc.xml;

    var sUrl = _AJAX_URL;
    var sReturn;
    var oXmlHttp = null;
    if (this.browertype == "IE") {
        this.request = this.doc.documentElement.selectSingleNode("//ZZ");
        oXmlHttp = new ActiveXObject("Microsoft.XmlHttp");
    }
    else if (this.browertype == "EDGE") {
        this.request = this.doc.documentElement.getElementsByTagName("ZZ");
        oXmlHttp = new XMLHttpRequest();
    }
    else if (this.browertype == "CHROME") {
        this.request = this.doc.documentElement.getElementsByTagName("ZZ");
        oXmlHttp = new XMLHttpRequest();
    }
    else if (this.browertype == "FIREFOX") {
        this.request = this.doc.documentElement.getElementsByTagName("ZZ");
        oXmlHttp = new XMLHttpRequest();
    }
    else {
        alert("ϵͳ��֧���������������ѡ�������������");
    }
    oXmlHttp.open("POST", sUrl, false);
    oXmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    oXmlHttp.send(this.doc.xml);
    //alert(this.doc.xml);
    //alert(oXmlHttp.status);
    if (oXmlHttp.status != 200) {
        alert("���������⣬����ѯϵͳ����Ա");
        return;
    }
    sReturn = oXmlHttp.responseText;
    if (this.browertype == "IE") {
        if (!this.doc.loadXML(sReturn)) {
            alert("����ϵͳ�쳣������ϵϵͳ����Ա��");
            return;
        }
        this.rootNode = this.doc.documentElement.selectSingleNode("//ZZ/RESPONSE");
    }
    else {
        try {
            var parser = new DOMParser();
            sReturn = sReturn.replace("encoding=\"��������(GB2312)\"", "encoding=\"utf-8\"");
            this.doc = parser.parseFromString(sReturn, "text/xml");
        } catch (e) {
            alert("����ϵͳ�쳣������ϵϵͳ����Ա��");
        }
        this.rootNode = getObjectByKeyName(this.doc.documentElement, "RESPONSE");
    }
}

//��ȡ������
function getObjectByKeyName(obj, vKeyName) {
    var objReturn = null;
    var arObj = obj.childNodes;
    for (var i = 0; i < arObj.length; i++) {
        var vNodeName = arObj[i].nodeName;
        if (vNodeName == vKeyName) {
            objReturn = arObj[i];
            break;
        }
    }
    return objReturn;
}

$S.prototype.getCode = function () {
    var sCode = 0;
    try {
        if (this.browertype == "IE") {
            sCode = this.doc.documentElement.selectSingleNode("//ZZ/RETURN/CODE").text;
        }
        else {
            var objReturn = getObjectByKeyName(this.doc.documentElement, "RETURN");
            sCode = getObjectByKeyName(objReturn, "CODE").textContent;
        }
    }
    catch (e) {
    }
    return sCode;
}
$S.prototype.getMsg = function () {
    var vReturn = null;
    if (this.browertype == "IE") {
        vReturn = this.doc.documentElement.selectSingleNode("//ZZ/RETURN/MSG").text;
    }
    else {
        var objReturn = getObjectByKeyName(this.doc.documentElement, "RETURN");
        vReturn = getObjectByKeyName(objReturn, "MSG").textContent;
    }
    return vReturn;
}

$S.prototype.getExp = function () {
    var vReturn = null;
    if (this.browertype == "IE") {
        vReturn = this.doc.documentElement.selectSingleNode("//ZZ/RETURN/EXP").text;
    }
    else {
        var objReturn = getObjectByKeyName(this.doc.documentElement, "RETURN");
        vReturn = getObjectByKeyName(objReturn, "EXP").textContent;
    }
    return vReturn;
}
$S.prototype.showErr = function (type) {
    if (this.getCode() < 0) {
        if (type == 0)
            alert("����ţ�" + this.getCode());
        else if (type == 1)
            alert("����ţ�" + this.getCode() + "\n" + "������Ϣ��" + this.getMsg());
        else if (type == 2)
            alert("����ţ�" + this.getCode()
				+ "\n������Ϣ��" + this.getMsg()
				+ "\n�쳣��Ϣ��" + this.getExp());
    }
}

$S.prototype.setDataSet = function (sDataSetName) {
    var oNodes = getChildNodesByName(this.rootNode, "PARAMETERS");
    for (i = 0; i < oNodes.length; i++) {
        //alert(oNodes[i].getAttribute("Name"));
        if (oNodes[i].getAttribute("NAME").toUpperCase() == sDataSetName.toUpperCase()) {
            this.oDataNode = oNodes[i];
        }
    }
}

$S.prototype.getDataSet = function (sDataSetName) {
    var oNodes = getChildNodesByName(this.rootNode, "PARAMETERS");
    for (i = 0; i < oNodes.length; i++) {
        //alert(oNodes[i].getAttribute("Name")+"="+sDataSetName.toUpperCase());
        if (oNodes[i].getAttribute("NAME").toUpperCase() == sDataSetName.toUpperCase()) {
            return oNodes[i];
        }
    }
    return null;
}


$S.prototype.getDefaultParamValue = function (name) {
    var oNode = this.getDataSet("DEFAULT");
    if (oNode != null)
        return this.getParamValue(oNode, name);
    else
        return "";
}

$S.prototype.getParamValue = function (name) {

    return this.getParamValue(this.oDataNode, name);
}


$S.prototype.getParamValue = function (node, name) {
    var vReturn = null;
    name = name.toUpperCase();
    var nodes = getChildNodesByName(node, name);
    var node;
    if (nodes.length == 0) {
        node = this.doc.createElement(name);
        this.oDataNode.appendChild(node);
    } else {
        node = nodes[0];
    }
    if (this.browertype == "IE") {
        vReturn = node.text;
    }
    else {
        vReturn = node.textContent;
    }
    return vReturn;
}

$S.prototype.setParamAttribute = function (name, value) {
    node.setAttribute(this.oDataNode, name, value);
}

$S.prototype.setParamAttribute = function (node, name, value) {
    name = name.toUpperCase();
    node.setAttribute(name, value);
}

$S.prototype.setParamValue = function (name, value) {    
    name = name.toLowerCase();
    var nodes = getChildNodesByName(this.oDataNode, name);
    var node;
    if (nodes.length == 0) {
        node = this.doc.createElement(name);
        this.oDataNode.appendChild(node);
    } else {
        node = nodes[0];
    }
    if (this.browertype == "IE") {
        node.text = value;
    }
    else {
        node.appendChild(this.doc.createTextNode(value));
    }
}

$S.prototype.setParamValue = function (nodeName, name, value) {    
    if (getChildNodesByName(this.oRootNode, "REQUEST").length == 0) {
        oNode = this.doc.createElement("REQUEST");
        this.oRootNode.appendChild(oNode);
        this.oRootNode = oNode;
    }
    else
        this.oRootNode = getChildNodesByName(this.oRootNode, "REQUEST")[0];

    var node = null;
    if (getChildNodesByName(this.oRootNode, "PARAMETERS").length == 0) {
        oNode = this.doc.createElement("PARAMETERS".toUpperCase());
        this.setParamAttribute(oNode, "NAME", nodeName.toUpperCase());
        this.oRootNode.appendChild(oNode);
        node = oNode;
    }
    else {
        var nodes = getChildNodesByName(this.oRootNode, "PARAMETERS");
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].getAttribute("NAME").toUpperCase() == nodeName.toUpperCase()) {
                node = nodes[i];
            }
        }
    }
    if (node != null) {
        if (nodeName.toUpperCase() == "DEFAULT") {
            var nodes = getChildNodesByName(node, name.toUpperCase());
            if (nodes.length == 0) {
                oNode = this.doc.createElement(name.toUpperCase());
                if (this.browertype == "IE") {
                    oNode.text = value;
                }
                else {
                    oNode.appendChild(this.doc.createTextNode(value));
                    //oNode.textContent = value;
                }
                node.appendChild(oNode);
            }
            else {
                oNode = nodes[0];
                if (this.browertype == "IE") {
                    oNode.text = value;
                }
                else {
                    oNode.removeChild(oNode.firstChild);
                    oNode.appendChild(this.doc.createTextNode(value));
                }
                node.appendChild(oNode);
            }
        }
    }
    this.oRootNode = getChildNodesByName(this.doc, "ZZ")[0];
}
/*
<!--��ҳ --> <div class="pageBox">
<div class="page"> <span class="s2">����10�м�¼</span><span class="s2">10�� / ÿҳ</span><span><a href="#">��ҳ</a></span><span><a href="#">��һҳ</a></span><span><a href="#">��һҳ</a></span><span><a href="#">βҳ</a></span> <span>
<input class="gtext" type="text" />
</span><span>
<input class="go" name="" type="submit" value="��ת" />
</span>
</div></div><!--��ҳ end-->
*/
$S.prototype.writePage = function (divPage, iCurrentPage, iPagesize) {
    var pageHtml = "";
    var sName = "_para_";
    var iSum = this.getDefaultParamValue("SUM");
    if (iSum == "") {
        divPage.innerHTML = "";
        return;
    }
    var iPages = 8;
    var iBottom = Math.ceil(iCurrentPage / iPages);
    var iAllPages = Math.ceil(iSum / iPagesize);
    var iTop = iBottom * iPages > iAllPages == true ? iAllPages : iBottom * iPages;

    pageHtml += "<div class='page'><span class='s2'><input type=hidden name='" + sName + "pagesize' value='7'>�� " + iSum + "�м�¼</span><span class='s2'> ҳ" + iCurrentPage + "/" + iAllPages + "(ÿҳ " + iPagesize + " ��)</span>";
    if (iCurrentPage <= 1)
        pageHtml += "\n<span>|<&nbsp;</span>";
    else {
        pageHtml += "\n<span><a style='cursor:hand'onClick=javascript:selData(\"" + sName + "\",1," +
                    iPagesize + "," + iSum + ") alt=\"�� ҳ\" >|<</a>&nbsp;</span>";
    }
    if (iCurrentPage <= 1)
        pageHtml += "<span><&nbsp;</span>";
    else
        pageHtml += "<span><a style='cursor:hand'onClick=javascript:selData(\"" + sName + "\"," + (iCurrentPage - 1)
				+ "," + iPagesize + "," + iSum + ") alt=\"��&nbsp;"
				+ (iCurrentPage - 1) + " ҳ\"><</a>\n</span>";

    if (iBottom > 1)
        pageHtml += "<span><a style='cursor:hand'onClick=javascript:selData(\"" + sName + "\"," +
                    ((iBottom - 1) * iPages) + "," + iPagesize +
                    "," + iSum + ")> ��</a></span>\n";
    if (iBottom > 0)
        for (i = ((iBottom - 1) * iPages + 1); i <= iTop; i++) {
            if (iCurrentPage == i)
                pageHtml += "<span><font color=\"#FF0000\">" + i + "</font>&nbsp;</span>\n";
            else
                pageHtml += "<span><a style='cursor:hand'onClick=javascript:selData(\"" + sName + "\","
				+ i + "," + iPagesize + "," + iSum + ")>" + i + "</a>&nbsp;</span>\n";
        }
    if (iTop < iAllPages)
        pageHtml += "<span><a style='cursor:hand'onClick=javascript:selData(\"" + sName + "\"," +
				(iTop + 1) + "," + iPagesize + "," + iSum + ")>��</a>&nbsp;</span>\n";

    if (iCurrentPage == iAllPages)
        pageHtml += " \n<span>></span> ";
    else {
        pageHtml += "<span><a style='cursor:hand'onClick=javascript:selData(\"" + sName + "\"," +
				(iCurrentPage + 1) + "," + iPagesize + "," + iSum + ")";
        pageHtml += " alt=\"��&nbsp;" + (iCurrentPage + 1) +
				"ҳ\">></a></span>\n";

    }


    if (iCurrentPage == iAllPages)
        pageHtml += "<span>>|</span>\n";
    else {
        pageHtml += "<span><a style='cursor:hand'onClick=javascript:selData(\"" + sName + "\"," +
				iAllPages + "," + iPagesize + "," + iSum + ")";
        pageHtml += " alt=\"β ҳ\" >>|</a></span>\n";
    }
    pageHtml += "<span> <input maxLength=6 class='pageinput' datatype='number' desc='��תҳ��' name=currentpage size=3 value=\""
			+ iCurrentPage + "\">\n</span><span><input type=\"button\" class=\"button_a\" onClick=\"if(ifDigit(document.all.currentpage.value)){selData('" + sName + "',document.all.currentpage.value," + iPagesize + "," + iSum + ");}\"  value=\"&nbsp;��ת\"></span>\n";
    pageHtml += "\n<div class='clear'></div></div>";
    //alert(pageHtml);
    divPage.innerHTML = pageHtml;
}
function ifDigit(str) {
    slen = str.length;
    for (i = 0; i < slen; i++) {
        var cc = str.charAt(i);
        if ((cc >= "0" && cc <= "9")) {
            return true;
        }
        else {
            alert('��������������');
            return false;
        }
    }
}
//д�򵥷�ҳҳ��
$S.prototype.writeSimplePage = function (divPage, iCurrentPage, iPagesize) {
    var pageHtml = "";
    var sName = "_para_";
    var iSum = this.getDefaultParamValue("SUM");
    if (iSum == "") {
        divPage.innerHTML = "";
        return;
    }
    var iPages = 8;
    var iBottom = Math.ceil(iCurrentPage / iPages);
    var iAllPages = Math.ceil(iSum / iPagesize);
    var iTop = iBottom * iPages > iAllPages == true ? iAllPages : iBottom * iPages;

    pageHtml += "<table align=right><tr><td align=right><input type=hidden name='" + sName + "pagesize' value='7'>�� " + iSum + " ��" + iCurrentPage + "/" + iTop + "(ÿҳ " + iPagesize + " ��)";
    pageHtml += "<input maxLength=6 datatype='number' desc='��תҳ��' name=currentpage size=3 value=\""
	+ iCurrentPage + "\">\n<input type=\"button\" class=\"btSkip\" onClick=\"if(ifDigit(document.all.currentpage.value)){selData('" + sName + "',document.all.currentpage.value," + iPagesize + "," + iSum + ");}\"  value=\"&nbsp;��ת\">\n";
    pageHtml += "\n</td></tr></table>";
    divPage.innerHTML = pageHtml;
}

//д�򵥷�ҳҳ��
$S.prototype.writeNewCssPage = function (divPage, iCurrentPage, iPagesize) {
    var pageHtml = "";
    var sName = "_para_";
    var iSum = this.getDefaultParamValue("SUM");
    if (iSum == "") {
        divPage.innerHTML = "";
        return;
    }
    var iPages = 8;
    var iBottom = Math.ceil(iCurrentPage / iPages);
    var iAllPages = Math.ceil(iSum / iPagesize);
    var iTop = iBottom * iPages > iAllPages == true ? iAllPages : iBottom * iPages;

    pageHtml = "<div class='pageIndex1'><span class='s2'><input type=hidden name='" + sName + "pagesize' value='7'>����" + iSum + "�м�¼</span><span class='s2'>" + iPagesize + " �� / ҳ</span>"
    if (iCurrentPage == 1) {
        pageHtml += "<span class='pageIndex01' disabled='none'>��ҳ</span><span class='pageIndex01' disabled='none'>��һҳ</span>";
    } else if (iCurrentPage > 1) {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "',1," + iPagesize + "," + iSum + ")>��ҳ</a></span>";
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + (parseInt(iCurrentPage) - 1) + "," + iPagesize + "," + iSum + ")>��һҳ</a></span>";
    }
    if (parseInt(iCurrentPage) + 1 > iAllPages) {
        pageHtml += "<span class='pageIndex01' disabled='none'>��һҳ</span>";
    } else {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + (parseInt(iCurrentPage) + 1) + "," + iPagesize + "," + iSum + ")>��һҳ</a></span>";
    }

    if (iCurrentPage >= iAllPages) {
        pageHtml += "<span class='pageIndex01' disabled='none'>βҳ</span>";
    } else {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + iAllPages + "," + iPagesize + "," + iSum + ")>βҳ</a></span>";
    }
    pageHtml += "<span><input maxLength=6 datatype='number' desc='��תҳ��' class='gtext' id=currentpage name=currentpage size=3 value=\"" + iCurrentPage + "\">"
             + "</span><span><input class='go' name=\"\" type='button' onClick=\"if(ifDigit(document.getElementById('currentpage').value)){selData('" + sName + "',document.getElementById('currentpage').value," + iPagesize + "," + iSum + ");}\" value='��ת' /></span></div>";
    divPage.innerHTML = pageHtml;
}


//д�򵥷�ҳҳ��
$S.prototype.writeSinglePage = function (divPage, iCurrentPage, iPagesize) {
    var pageHtml = "";
    var sName = "_para_";
    var iSum = this.getDefaultParamValue("SUM");
    if (iSum == "") {
        divPage.innerHTML = "";
        return;
    }
    var iPages = 8;
    var iBottom = Math.ceil(iCurrentPage / iPages);
    var iAllPages = Math.ceil(iSum / iPagesize);
    var iTop = iBottom * iPages > iAllPages == true ? iAllPages : iBottom * iPages;

    pageHtml = "<div class=\"page\"><span class=\"s2\"><input type=\"hidden\" name=\"" + sName + "pagesize\" value=\"7\">����" + iSum + "�м�¼</span><span class=\"s2\">" + iPagesize + " �� / ҳ</span>"
    if (iCurrentPage == 1) {
        pageHtml += "<span class=\"s1\" disabled=\"none\">��ҳ</span><span class=\"s1\" disabled=\"none\">��һҳ</span>";
    } else if (iCurrentPage > 1) {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "',1," + iPagesize + "," + iSum + ")>��ҳ</a></span>";
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + (parseInt(iCurrentPage) - 1) + "," + iPagesize + "," + iSum + ")>��һҳ</a></span>";
    }
    if (parseInt(iCurrentPage) + 1 > iAllPages) {
        pageHtml += "<span class=\"s1\" disabled='none'>��һҳ</span>";
    } else {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + (parseInt(iCurrentPage) + 1) + "," + iPagesize + "," + iSum + ")>��һҳ</a></span>";
    }
    if (iCurrentPage >= iAllPages) {
        pageHtml += "<span class=\"s1\" disabled='none'>βҳ</span>";
    } else {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + iAllPages + "," + iPagesize + "," + iSum + ")>βҳ</a></span>";
    }
    pageHtml += "<span><input maxLength=10 datatype='number' desc='��תҳ��' class='gtext' id=currentpage name=currentpage size=10 value=\"" + iCurrentPage + "\">"
             + "</span><span><input class=\"button\" style=\"width:60px;text-align:center\" onClick=\"if(ifDigit(document.getElementById('currentpage').value)){selData('" + sName + "',document.getElementById('currentpage').value," + iPagesize + "," + iSum + ");}\" value='��ת' /></span></div>";
    divPage.innerHTML = pageHtml;
}

//д���ҳҳ��
$S.prototype.writeMutilPage = function (flag, divPage, iCurrentPage, iPagesize) {
    var pageHtml = "";
    var sName = "_para_";
    var iSum = this.getDefaultParamValue("SUM");
    if (iSum == "") {
        divPage.innerHTML = "";
        return;
    }
    var iPages = 8;
    var iBottom = Math.ceil(iCurrentPage / iPages);
    var iAllPages = Math.ceil(iSum / iPagesize);
    var iTop = iBottom * iPages > iAllPages == true ? iAllPages : iBottom * iPages;

    pageHtml = "<div class=\"page\"><span class=\"s2\"><input type=\"hidden\" name=\"" + sName + "pagesize\" value=\"7\">����" + iSum + "�м�¼</span><span class=\"s2\">" + iPagesize + " �� / ҳ</span>"
    if (iCurrentPage == 1) {
        pageHtml += "<span class=\"s1\" disabled=\"none\">��ҳ</span><span class=\"s1\" disabled=\"none\">��һҳ</span>";
    } else if (iCurrentPage > 1) {
        pageHtml += "<span><a onClick=javascript:selData('" + flag + "','" + sName + "',1," + iPagesize + "," + iSum + ")>��ҳ</a></span>";
        pageHtml += "<span><a onClick=javascript:selData('" + flag + "','" + sName + "'," + (parseInt(iCurrentPage) - 1) + "," + iPagesize + "," + iSum + ")>��һҳ</a></span>";
    }
    if (parseInt(iCurrentPage) + 1 > iAllPages) {
        pageHtml += "<span class=\"s1\" disabled='none'>��һҳ</span>";
    } else {
        pageHtml += "<span><a onClick=javascript:selData('" + flag + "','" + sName + "'," + (parseInt(iCurrentPage) + 1) + "," + iPagesize + "," + iSum + ")>��һҳ</a></span>";
    }
    if (iCurrentPage >= iAllPages) {
        pageHtml += "<span class=\"s1\" disabled='none'>βҳ</span>";
    } else {
        pageHtml += "<span><a onClick=javascript:selData('" + flag + "','" + sName + "'," + iAllPages + "," + iPagesize + "," + iSum + ")>βҳ</a></span>";
    }
    pageHtml += "<span><input maxLength=10 datatype='number' desc='��תҳ��' class='gtext' id=currentpage name=currentpage size=10 value=\"" + iCurrentPage + "\">"
             + "</span><span><input class=\"button\" style=\"width:60px;text-align:center\" onClick=\"if(ifDigit(document.getElementById('currentpage').value)){selData('" + flag + "','" + sName + "',document.getElementById('currentpage').value," + iPagesize + "," + iSum + ");}\" value='��ת' /></span></div>";
    divPage.innerHTML = pageHtml;
}


//д�򵥷�ҳҳ��
$S.prototype.getWriteSinglePage = function (divPage, iCurrentPage, iPagesize) {
    var pageHtml = "";
    var sName = "_para_";
    var iSum = this.getDefaultParamValue("SUM");
    if (iSum == "") {
        divPage.innerHTML = "";
        return;
    }
    var iPages = 8;
    var iBottom = Math.ceil(iCurrentPage / iPages);
    var iAllPages = Math.ceil(iSum / iPagesize);
    var iTop = iBottom * iPages > iAllPages == true ? iAllPages : iBottom * iPages;

    pageHtml = "<div class=\"page\"><span class=\"s2\"><input type=\"hidden\" name=\"" + sName + "pagesize\" value=\"7\">����" + iSum + "�м�¼</span><span class=\"s2\">ҳ" + iCurrentPage + "/" + iAllPages + "(ÿҳ " + iPagesize + " ��)</span>"
    //pageHtml += "<span class=\"s2\"><input type=hidden name='" + sName + "pagesize' value='7'>�� " + iSum + "�м�¼</span><span class=\"s2\">ҳ" + iCurrentPage + "/" + iAllPages + "(ÿҳ " + iPagesize + " ��)</span>";
    if (iCurrentPage == 1) {
        pageHtml += "<span class=\"s1\" disabled=\"none\">��ҳ</span><span class=\"s1\" disabled=\"none\">��һҳ</span>";
    } else if (iCurrentPage > 1) {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "',1," + iPagesize + "," + iSum + ")>��ҳ</a></span>";
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + (parseInt(iCurrentPage) - 1) + "," + iPagesize + "," + iSum + ")>��һҳ</a></span>";
    }
    if (parseInt(iCurrentPage) + 1 > iAllPages) {
        pageHtml += "<span class=\"s1\" disabled='none'>��һҳ</span>";
    } else {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + (parseInt(iCurrentPage) + 1) + "," + iPagesize + "," + iSum + ")>��һҳ</a></span>";
    }
    if (iCurrentPage >= iAllPages) {
        pageHtml += "<span class=\"s1\" disabled='none'>βҳ</span>";
    } else {
        pageHtml += "<span><a onClick=javascript:selData('" + sName + "'," + iAllPages + "," + iPagesize + "," + iSum + ")>βҳ</a></span>";
    }
    pageHtml += "<span><input maxLength=10 datatype='number' desc='��תҳ��' class='gtext' id=currentpage name=currentpage size=10 value=\"" + iCurrentPage + "\">"
             + "</span><span><input class=\"button\" style=\"width:60px;text-align:center\" onClick=\"if(ifDigit(document.getElementById('currentpage').value)){selData('" + sName + "',document.getElementById('currentpage').value," + iPagesize + "," + iSum + ");}\" value='��ת' /></span></div>";
    divPage.innerHTML = pageHtml;
}


$S.prototype.getXml = function () {
    return this.doc.xml;
}

$S.prototype.setValue = function (id, value)//ͨ��id,��ҳ���ϵ�** ��ֵinnerHTML
{
    var handle = document.getElementById(id);
    handle.innerHTML = value;
}
$S.prototype.setTextValue = function (name, value)//ͨ��name,��ҳ���ϵ�** ��ֵ��value
{
    var handle = document.getElementById(name);
    handle.value = value;
}

function getChildNodesByName(parentNode, nodeName) {    
    var nodes = parentNode.childNodes;
    var childNodes = new Array();
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.nodeName.toUpperCase() == nodeName.toUpperCase()) {
            childNodes[childNodes.length] = node;
        }
    }
    return childNodes;
}

function newDom(vBrowserType) {
    var xmlDoc = null;
    //IE�����
    if (vBrowserType == "IE") {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = false;
        xmlDoc.validateOnParse = false;
        xmlDoc.resolveExternals = false;
    }
    //EDGE
    else if (vBrowserType == "EDGE") {
        xmlDoc = document.implementation.createDocument('', '', null);
    }
    //CHROME
    else if (vBrowserType == "CHROME") {
        xmlDoc = document.implementation.createDocument('', '', null);
    }
    //��������
    else if (vBrowserType == "FIREFOX") {
        xmlDoc = document.implementation.createDocument('', '', null);
    }
    else {
        alert('���������ϵͳ��֧�֣���ѡ�������������');
    }
    return xmlDoc;
}

$D = function (dataset) {
    var bFlag = false;
    if (window.ActiveXObject || "ActiveXObject" in window) {
        bFlag = true;
    }
    this.Rows = new Array();
    var rowNodes = getChildNodesByName(dataset, "ROW");
    for (var i = 0; i < rowNodes.length; i++) {
        var colNodes = rowNodes[i].childNodes;
        var Cols = new Array();
        for (var j = 0; j < colNodes.length; j++) {
            var fieldNode = colNodes[j];
            var Field = new Array();
            Field[0] = fieldNode.nodeName;
            if (bFlag) {
                Field[1] = fieldNode.text;
            }
            else {
                Field[1] = fieldNode.textContent;
            }
            Cols[j] = Field;
        }
        this.Rows[i] = Cols;
    }
}
$D.prototype.getFieldValue = function (irow, field) {
    var ret = "";
    if (this.Rows.length >= irow) {
        var row = this.Rows[irow - 1];
        for (var j = 0; j < row.length; j++) {
            if (row[j][0] == field) {
                ret = row[j][1];
                break;
            }
        }
    }
    if (typeof ret != 'undefined' && ret != 'undefined' && ret != null)
        return ret;
    else
        return "";
}
$D.prototype.getRows = function () {
    return this.Rows.length;
}
/*
function S$(sHandleName, sHandleValue)
{
var handle =document.getElementsByName(sHandleName);
if(handle.length ==0)
{
alert("û���ҵ�����Ϊ["+sHandleName+"]�Ŀؼ�");
}
else
handle[0].value =sHandleValue;
}
*/
function setCell(td) {
    td.className = "autoHidden";
    td.noWrap = "nowrap";
}

function getParameter(fieldName) {
    var urlString = document.location.search;
    while (urlString.indexOf("& ") > 0) {
        urlString = urlString.replace("& ", "?");
    }
    while (urlString.indexOf("? ") > 0) {
        urlString = urlString.replace("? ", "?");
    }
    if (urlString != null) {
        var typeQu = "?" + fieldName + "=";
        var urlEnd = urlString.toUpperCase().indexOf(typeQu.toUpperCase());
        if (urlEnd == -1) {
            typeQu = "&" + fieldName + "=";
            urlEnd = urlString.toUpperCase().indexOf(typeQu.toUpperCase());
        }
        if (urlEnd != -1) {
            var paramsurl = urlString.substring(urlEnd + typeQu.length);
            var IsEnd = paramsurl.indexOf("&");
            if (IsEnd != -1) {
                return paramsurl.substring(0, IsEnd);
            } else {
                return paramsurl;
            }
        } else {
            return "";
        }
    } else {
        return "";
    }
}