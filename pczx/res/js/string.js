/**
*��һ��һ��Ϊ���������˷�������ɾ������һ�������������
*@TableHandle ���������
*/
function runTableClear(TableHandle) {
	if (typeof TableHandle =="undefined" || TableHandle == null)
	{
		return;
    } 
	for (var i = TableHandle.rows.length-1; i >=1; i--)
	{
		TableHandle.deleteRow(i);
    }
};
/**
*��һ��һ��Ϊ���������˷�������ɾ������һ�к����һ�������������
*@TableHandle ���������
*/
function runClearTable(TableHandle)
{
	if (typeof TableHandle =="undefined" || TableHandle == null)
	{
		return;
	}
	for (var i = TableHandle.rows.length-2; i >=1; i--)
	{
		TableHandle.deleteRow(i);
	}
};
/**
*ɾ�����������
*@TableHandle ���������
*/
function runTableClearAll(TableHandle)
{
	if (typeof TableHandle =="undefined" || TableHandle == null) 
	{
		return;
	}
	for (var i = TableHandle.rows.length-1; i >=0; i--)
	{
		TableHandle.deleteRow(i);
	}
};
/**
*��񵥻�ʱ����ʾ��ʽ
*@TableHandle ���������
*/
function runTableOnClick(TableHandle)
{
	if (typeof TableHandle =="undefined" || TableHandle == null) 
	{
		return;
	}
	var e = event.srcElement;
	if(e.tagName.toUpperCase()!="TD")
	{
		return;
	}
	else
	{
		e=e.parentElement;
	}
	var rows=TableHandle.rows.length;
	if(rows>1)
	{
		for(var i=1;i<rows;i++)
		{
			if(i%2==0)
			{
				TableHandle.rows(i).className="tr-a";
			}
			else
			{
				TableHandle.rows(i).className="";
			}
		}
		e.className="tr-selected";
	}
}
/**
*���ͣ��ʱ����ʾ��ʽ
*@TableHandle ���������
*/
function runTableOnMouseOver(TableHandle)
{
	if (typeof TableHandle =="undefined" || TableHandle == null) 
	{
		return;
	}
	var e = event.srcElement;
	if(e.tagName.toUpperCase()!="TD")
	{
		return;
	}
	else
	{
		e=e.parentElement;
	}
	var rows=TableHandle.rows.length;
	if(rows>1)
	{
		for(var i=1;i<rows;i++)
		{
			if(i%2==0)
			{
				TableHandle.rows(i).className="tr-a";
			}
			else
			{
				TableHandle.rows(i).className="";
			}
		}
		e.className="tr-hover";
	}
}
/**
*��񻬹�ʱ����ʾ��ʽ
*@TableHandle ���������
*/
function runTableOnMouseOut(TableHandle)
{
	if (typeof TableHandle =="undefined" || TableHandle == null) 
	{
		return;
	}
	var e = event.srcElement;
	if(e.tagName.toUpperCase()!="TD")
	{
		return;
	}
	else
	{
		e=e.parentElement;
	}
	var rows=TableHandle.rows.length;
	if(rows>1)
	{
		for(var i=1;i<rows;i++)
		{
			if(i%2==0)
			{
				TableHandle.rows(i).className="tr-a";
			}
			else
			{
				TableHandle.rows(i).className="";
			}
		}
	}
}
/**
*ɾ�������б�������
*@SelectHand ���������б����
*/
function runSelectClear(SelectHand)
{
	if (typeof SelectHand =="undefined" || SelectHand == null) 
	{
		return;
	}
	SelectHand.options.length=0;
};
/**
*������ҳ����Ԫ�ػ������Ԫ��
*@from ������ҳ����������
*/
function disabledAllElement(FormHandle)
{
	if (typeof FormHandle =="undefined" || FormHandle == null) 
	{
		return;
	}
	var inputs=FormHandle.getElementsByTagName('INPUT');
	var textareas	= FormHandle.getElementsByTagName('TEXTAREA');
	var selects	= FormHandle.getElementsByTagName('SELECT');
	if(inputs.length>0)
	{
		for (var i = 0; i < inputs.length; i++)
		{
			inputs[i].disabled=true;
		}
	}
	if(textareas.length>0)
	{
		for (var i = 0; i < textareas.length; i++)
		{
			textareas[i].disabled=true;
		}
	}
	if(selects.length>0)
	{
		for (var i = 0; i < selects.length; i++)
		{
			selects[i].disabled=true;
		}
	}
}
/**
*������ҳ����Ԫ�ػ������Ԫ��
*@FormHandle ������ҳ����������
*/
function activeAllElement(FormHandle)
{
	if (typeof FormHandle =="undefined" || FormHandle == null) 
	{
		return;
	}
	var inputs=FormHandle.getElementsByTagName('INPUT');
	var textareas	= FormHandle.getElementsByTagName('TEXTAREA');
	var selects	= FormHandle.getElementsByTagName('SELECT');
	if(inputs.length>0)
	{
		for (var i = 0; i < inputs.length; i++)
		{
			inputs[i].disabled=false;
		}
	}
	if(textareas.length>0)
	{
		for (var i = 0; i < textareas.length; i++)
		{
			textareas[i].disabled=false;
		}
	}
	if(selects.length>0)
	{
		for (var i = 0; i < selects.length; i++)
		{
			selects[i].disabled=false;
		}
	}
}
/**
*��֤��ҳ����Ԫ�ػ������Ԫ��
*@FormHandle ������ҳԪ�ػ������
*/
function runCheckForm(FormHandle)
{
	if (typeof FormHandle =="undefined" || FormHandle == null) 
	{
		return;
	}
	var inputs=FormHandle.getElementsByTagName('INPUT');
	var textareas	= FormHandle.getElementsByTagName('TEXTAREA');
	var selects	= FormHandle.getElementsByTagName('SELECT');
	if(inputs.length>0)
	{
		for (var i = 0; i < inputs.length; i++) {
		    inputs[i].value = onFiterSpecialChars(inputs[i].value);
			if (!runCheckControl(inputs[i])) 
			{
				return false;
			}
		}
	}
	if(textareas.length>0)
	{
		for (var i = 0; i < textareas.length; i++) {
		    textareas[i].value = onFiterSpecialChars(textareas[i].value);
			if (!runCheckControl(textareas[i])) 
			{
				return false;
			}
		}
	}
	if(selects.length>0)
	{
		for (var i = 0; i < selects.length; i++)
		{
			if (!runCheckControl(selects[i])) 
			{
				return false;
			}
		}
	}
	return true;
}
/**
*��֤ControlHandle����
*@ControlHandle ������ҳ�ؼ�
*/
function runCheckControl(ControlHandle) {
	var isIE=navigator.userAgent.toUpperCase().indexOf("MSIE")==-1?false:true;
	//�жϿؼ��Ƿ����
	if (typeof ControlHandle =="undefined" || ControlHandle == null) 
	{
		return;
	}
	//��ȡ�ؼ�����
	var desc="δ֪�ؼ�";
	if(isIE) {
	    if (typeof ControlHandle.id != "undefined" && ControlHandle.id != null && ControlHandle.id != "" && ControlHandle.getAttribute("datatype") != null)
		{
		    desc = ControlHandle.id;
		}
	}
	else
	{
		if(typeof  ControlHandle.getAttribute("id")!="undefined" &&  ControlHandle.getAttribute("id")!=null)
		{
		    desc = ControlHandle.getAttribute("id");
		}
	}
	if(isIE)
	{
		if(typeof  ControlHandle.name!="undefined" &&  ControlHandle.name!=null && ControlHandle.name!="")
		{
		    desc = ControlHandle.name;
		}
	}
	else
	{
		if(typeof ControlHandle.getAttribute("name")!="undefined" && ControlHandle.getAttribute("name")!=null)
		{
		    desc = ControlHandle.getAttribute("name");
		}
	}
	if(typeof ControlHandle.getAttribute("desc")!="undefined" && ControlHandle.getAttribute("desc")!=null)
	{
	    desc = ControlHandle.getAttribute("desc");
	}
	//�������Ϊ���ض��󣬲�������֤
	if(ControlHandle.getAttribute("type")=="hidden" && ControlHandle.tagName=="INPUT")
	{
		return true;
	}
	if(ControlHandle.style.visibility=='hidden') 
	{
		return true;
	}
	//��ָ����֤
	if(typeof ControlHandle.getAttribute("allownull")!='undefined' && ControlHandle.getAttribute("allownull")!=null && ControlHandle.getAttribute("allownull")=='true')
	{
		if(getTrimString(ControlHandle.value)=='')
		{
			return true;
		}
	}
	else
	{
	    if (getTrimString(ControlHandle.value) == '' && ControlHandle.getAttribute("type") != "button" && desc != "δ֪�ؼ�" && ControlHandle.getAttribute("type") != "file") {
			alert('* ˵��: '+desc+'\n* ����: ����ֵ����Ϊ��!');
			ControlHandle.focus();
			return false;
		}
	}
    var datatype=ControlHandle.getAttribute("datatype");
    if (typeof datatype == "undefined" || datatype == null) {
        datatype = "string";
    }
	//��֤����
    if (datatype == "int")
	{
		//��֤������ʽ
		if(IsInteger(ControlHandle.value))
		{
		    //��֤������ֽڳ����Ƿ�С�����Ƶ���Сֵ
		    if (typeof ControlHandle.getAttribute("min") != "undefined" && typeof ControlHandle.getAttribute("min") != null) {
		        var result = ControlHandle.value;
		        if (result.length < ControlHandle.getAttribute("min")) {
		            alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ�������' + ControlHandle.getAttribute("min") + '!');
		            ControlHandle.focus();
		            return false;
		        }
		    }
		    //��֤������ֽڳ����Ƿ�������Ƶ����ֵ
		    if (typeof ControlHandle.getAttribute("max") != "undefined" && typeof ControlHandle.getAttribute("max") != null) {
		        var result = ControlHandle.value;
		        if (result.length > ControlHandle.getAttribute("max")) {
		            alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ��ܴ���' + ControlHandle.getAttribute("max") + '!');
		            ControlHandle.focus();
		            return false;
		        }
		    }
		}
		else
		{
			alert('* ˵��: ' + desc + '��ʾ��Ϣ\n* ����: ��������ȷ��������ʽ! ʾ��: -+0123456789');
			ControlHandle.focus();
			return false;
		}
	}
	//��֤����
    else if (datatype == "number")
	{
		//��֤���ָ�ʽ
		if(IsNumber(ControlHandle.value))
		{
		    //��֤������ֽڳ����Ƿ�С�����Ƶ���Сֵ
		    if (typeof ControlHandle.getAttribute("min") != "undefined" && typeof ControlHandle.getAttribute("min") != null) {
		        var result = ControlHandle.value;
		        if (result.length < ControlHandle.getAttribute("min")) {
		            alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ�������' + ControlHandle.getAttribute("min") + '!');
		            ControlHandle.focus();
		            return false;
		        }
		    }
		    //��֤������ֽڳ����Ƿ�������Ƶ����ֵ
		    if (typeof ControlHandle.getAttribute("max") != "undefined" && typeof ControlHandle.getAttribute("max") != null) {
		        var result = ControlHandle.value;
		        if (result.length > ControlHandle.getAttribute("max")) {
		            alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ��ܴ���' + ControlHandle.getAttribute("max") + '!');
		            ControlHandle.focus();
		            return false;
		        }
		    }
		}
		else
		{
			alert('* ˵��: ' + desc + '\n* ����: ��������ȷ�����ָ�ʽ!');
			ControlHandle.focus();
			return false;
		}
	}
	//��֤�ʼ�
    else if (datatype == "mail")
	{
		//��֤�ʼ���ʽ
		if(IsMail(ControlHandle.value))
		{
			//��֤������ֽڳ����Ƿ�С�����Ƶ���Сֵ
			if(typeof ControlHandle.getAttribute("min")!="undefined" && typeof ControlHandle.getAttribute("min")!=null)
			{
				var result=ControlHandle.value;
				if(result.length<ControlHandle.getAttribute("min"))
				{
					alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ�������' + ControlHandle.getAttribute("min") + '!');
					ControlHandle.focus();
					return false;	
				}
			}
			//��֤������ֽڳ����Ƿ�������Ƶ����ֵ
			if(typeof ControlHandle.getAttribute("max")!="undefined" && typeof ControlHandle.getAttribute("max")!=null)
			{
				var result=ControlHandle.value;
				if(result.length>ControlHandle.getAttribute("max"))
				{
					alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ��ܴ���' + ControlHandle.getAttribute("max") + '!');
					ControlHandle.focus();
					return false;	
				}
			}
		}
		else
		{
			alert('* ˵��: ' + desc + '\n* ����: ��������ȷ���ʼ���ʽ! ʾ��: xxx@xxx.xxx');
			ControlHandle.focus();
			return false;
		}
	}
	//��֤http
    else if (datatype == "http")
	{
		//��֤http��ʽ
		if(IsHttp(ControlHandle.value))
		{
			//��֤������ֽڳ����Ƿ�С�����Ƶ���Сֵ
			if(typeof ControlHandle.getAttribute("min")!="undefined" && typeof ControlHandle.getAttribute("min")!=null)
			{
				var result=ControlHandle.value;
				if(result.length<ControlHandle.getAttribute("min"))
				{
					alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ�������' + ControlHandle.getAttribute("min") + '!');
					ControlHandle.focus();
					return false;	
				}
			}
			//��֤������ֽڳ����Ƿ�������Ƶ����ֵ
			if(typeof ControlHandle.getAttribute("max")!="undefined" && typeof ControlHandle.getAttribute("max")!=null)
			{
				var result=ControlHandle.value;
				if(result.length>ControlHandle.getAttribute("max"))
				{
					alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ��ܴ���' + ControlHandle.getAttribute("max") + '!');
					ControlHandle.focus();
					return false;	
				}
			}
		}
		else
		{
			alert('* ˵��: ' + desc + '\n* ����: ��������ȷ��http��ʽ! ʾ��: http://xxx.xxx.xxx');
			ControlHandle.focus();
			return false;
		}
	}
	//��֤����
    else if (datatype == "date")
	{
		//��֤�Ƿ�Ϊ���ڸ�ʽ
		if(IsDate(ControlHandle.value))
		{
			var result=new Date(ControlHandle.value.replace(/\-/g,'/'));
			//��֤����ֵ�Ƿ�С�����Ƶ���Сֵ
			if(typeof ControlHandle.getAttribute("min")!="undefined" && typeof ControlHandle.getAttribute("min")!=null)
			{
				var min=new Date(ControlHandle.getAttribute("min").replace(/\-/g,'/'));
				if(result<min)
				{
					alert('* ˵��: ' + desc + '\n* ����: ����ֵ����С��' + ControlHandle.getAttribute("min") + '!');
					ControlHandle.focus();
					return false;
				}
			}
			//��֤����ֵ�Ƿ�������Ƶ����ֵ
			if(typeof ControlHandle.getAttribute("max")!="undefined" && typeof ControlHandle.getAttribute("max")!=null)
			{
				var max=new Date(ControlHandle.getAttribute("max").replace(/\-/g,'/'));
				if(result>min)
				{
					alert('* ˵��: ' + desc + '\n* ����: ����ֵ���ܴ���' + ControlHandle.getAttribute("max") + '!');
					ControlHandle.focus();
					return false;
				}
			}
		}
		else
		{
			alert('* ˵��: ' + desc + '\n* ����: ��������ȷ�����ڸ�ʽ! ʾ��: 1999-12-31');
			ControlHandle.focus();
			return false;
		}
	}
	//��֤ʱ��
    else if (datatype == "datetime")
	{
		//��֤�Ƿ�Ϊʱ���ʽ
		if(IsDateTime(ControlHandle.value))
		{
			var result=new Date(ControlHandle.value.replace(/\-/g,'/'));
			//��֤����ֵ�Ƿ�С�����Ƶ���Сֵ
			if(typeof ControlHandle.getAttribute("min")!="undefined" && typeof ControlHandle.getAttribute("min")!=null)
			{
				var min=new Date(ControlHandle.getAttribute("min").replace(/\-/g,'/'));
				if(result<min)
				{
					alert('* ˵��: ' + desc + '\n* ����: ����ֵ����С��' + ControlHandle.getAttribute("min") + '!');
					ControlHandle.focus();
					return false;
				}
			}
			//��֤����ֵ�Ƿ�������Ƶ����ֵ
			if(typeof ControlHandle.getAttribute("max")!="undefined" && typeof ControlHandle.getAttribute("max")!=null)
			{
				var max=new Date(ControlHandle.getAttribute("max").replace(/\-/g,'/'));
				if(result>max)
				{
					alert('* ˵��: ' + desc + '\n* ����: ����ֵ���ܴ���' + ControlHandle.getAttribute("max") + '!');
					ControlHandle.focus();
					return false;
				}
			}
		}
		else
		{
			alert('* ˵��: ' + desc + '\n* ����: ��������ȷ��ʱ���ʽ! ʾ��: 1999-12-31 11:59:59');
			ControlHandle.focus();
			return false;
		}
	}
	else
	{
		var result = getByteLength(ControlHandle.value); 
		if(typeof ControlHandle.getAttribute("max")!="undefined" && typeof ControlHandle.getAttribute("max")!=null)
		{
			if(result>parseInt(ControlHandle.getAttribute("max")))
			{
				alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ��ܶ���' + ControlHandle.getAttribute("max") + '!');
				ControlHandle.focus();
				return false;
			}
		}
		if(typeof ControlHandle.getAttribute("min")!="undefined" && typeof ControlHandle.getAttribute("min")!=null)
		{
			if(result<parseInt(ControlHandle.getAttribute("min")))
			{
				alert('* ˵��: ' + desc + '\n* ����: ����ֵ�ֽڳ��Ȳ�������' + ControlHandle.getAttribute("min") + '!');
				ControlHandle.focus();
				return false;
			}
		}
	}
	return true;
}
function getByteLength(str)
{
    var intCount = 0;
    var charCode;
	for(var i = 0;i < str.length;i++)
	{
		// Ascii�����255��˫�ֽڵ��ַ�
	    //if(str.charCodeAt(i) > 255) intCount += 2; else intCount += 1;
	    charCode = str.charCodeAt(i);
	    if (charCode >= 0 && charCode <= 128) {
	        intCount++;
	    } else {
	        intCount += 2;
	    }
	}
	return intCount;
}
/**
*ʹ��������ʽУ��ʱ���ʽ
*@str �����ַ���
*/
function IsDateTime(str)
{
	str=getTrimString(str);
	if(str.length!=0)
	{
		var reg=/\d{2,4}[-\/]\d{1,2}[-\/]\d{1,2}( \d{1,2}:\d{1,2}:\d{1,2})?$/;
		if(reg.test(str))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	return true;
}
/**
*ʹ��������ʽУ��http��ʽ
*@str �����ַ���
*/
function IsHttp(str)
{
	str=getTrimString(str);
	if(str.length!=0)
	{
		var reg=/http:\/\/[\w-]+(\.[\w-]+)*(\/[\w-]?)*$/;
		if(reg.test(str))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	return true;
}
/**
*ʹ��������ʽУ���ʼ���ʽ
*@str �����ַ���
*/
function IsMail(str)
{
	str=getTrimString(str);
	if(str.length!=0)
	{
		var reg=/\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if(reg.test(str))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	return true;
}
/**
*ʹ��������ʽУ�����ָ�ʽ
*@str �����ַ���
*/
function IsNumber(str)
{
	str=getTrimString(str);
	if(!isNaN(str))
	{
		return true;
	}
	else
	{
		return false;
	}
}
/**
*ʹ��������ʽУ�����θ�ʽ
*@str �����ַ���
*/
function IsInteger(str)
{
	str=getTrimString(str);
	if(str.length!=0)
	{
		var reg=/^[-+]?\d*$/; 
		if(reg.test(str))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	return true;
}
/**
*ʹ��������ʽУ�����ڸ�ʽ
*@str �����ַ���
*/
function IsDate(str)
{
	str=getTrimString(str);
	if(str.length!=0)
	{
		var reg	= /\d{2,4}[-\/]\d{1,2}[-\/]\d{1,2}$/;
		if(reg.test(str))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	return true;
}
/**
*����ȥ���������߿ո���ַ���
*@str �����ַ�������
*/
function getTrimString(GetString)
{
	return GetString.replace(/^\s+|\s+$/g, ''); 
}
/**
*����ȥ����߿ո���ַ���
*@str �����ַ�������
*/
function getLTrimString(GetString)
{
	return GetString.replace(/^\s+/,'');	
}
/**
*����ȥ���ұ߿ո���ַ���
*@str �����ַ�������
*/
function getLTrimString(GetString)
{
	return GetString.replace(/\s+$/,'');
}

//����֤ʱ�����������ַ�,����ȫ����
function onFiterSpecialChars(vControlValue) {
    if (vControlValue.indexOf(">") != -1) {
        vControlValue = vControlValue.replace(new RegExp(">", "g"), "��");
    }
    if (vControlValue.indexOf("<") != -1) {
        vControlValue = vControlValue.replace(new RegExp("<", "g"), "��");
    }
    if (vControlValue.indexOf("'") != -1) {
        vControlValue = vControlValue.replace(new RegExp("'", "g"), "��");
    }
    if (vControlValue.indexOf("\"") != -1) {
        vControlValue = vControlValue.replace(new RegExp("\"", "g"), "��");
    }
    return vControlValue;
}

/**
*�رղ�ˢ�¸�����
*/
function onClose()
{
	try
	{
		top.window.frames["frmright"].onPageLoad();
		top.Dialog.close();
	}catch(e){}
}
/**
*��ȡ����
*@seekParameter ����href
*/
function getParameter(seekParameter)
{
	var url=location.href;
	if(url.indexOf("?")!=-1)
	{
		var parameters=url.substr(url.indexOf("?")+1);
		if(parameters.indexOf("&")!=-1)
		{
			var parameterItems=parameters.split("&");
			var parameterName;
			var parameterVar;
			for(var i=0;i<parameterItems.length;i++)
			{
				parameterName=parameterItems[i].split("=")[0];
				parameterVar=parameterItems[i].split("=")[1];
				if(parameterName==seekParameter)
				{
					return(parameterVar);
				}
			}
		}
		else
		{
			var parameterName=parameters.split("=")[0];
			var parameterVar=parameters.split("=")[1];
			if(parameterName==seekParameter)
			{
				return(parameterVar);
			}
		}
	}
	return "";
}
/**
*�л�ѡ�
*@obj ����ǰѡ�
*/
function onChangeTab(obj) 
{
	//��ȡ����ѡ�����������ѡ���Ϊδѡ��״̬
	var oTabsUl = obj.parentNode;
	for (var i = 0; i < oTabsUl.childNodes.length; i++) 
	{
		oTabsUl.childNodes[i].className = "menubg_white_6";
		oTabsUl.childNodes[i].childNodes[0].className = "";
	}
	//���õ�ǰѡ���ʽΪѡ��״̬
	obj.childNodes[0].className = "link_1";
	obj.className = "menubg_blue_6";
}


function getURLencode(GetURL){
	GetURL = GetURL.replace('~','%7e');
	GetURL = GetURL.replace('@','%40');
	GetURL = GetURL.replace('#','%23');
	GetURL = GetURL.replace('$','%24');
	GetURL = GetURL.replace('%','%25');
	GetURL = GetURL.replace('\^','%5e');
	GetURL = GetURL.replace(/\&/g,'%26');
	GetURL = GetURL.replace('+','%2b');
	GetURL = GetURL.replace('|','%7c');
	GetURL = GetURL.replace('\\','%5c');
	GetURL = GetURL.replace(/\=/g,'%3d');
	GetURL = GetURL.replace('`','%60');
	GetURL = GetURL.replace('{','%7b');
	GetURL = GetURL.replace('}','%7d');
	GetURL = GetURL.replace(']','%5d');
	GetURL = GetURL.replace('[','%5b');
	GetURL = GetURL.replace('"','%22');
	GetURL = GetURL.replace(':','%3a');
	GetURL = GetURL.replace(';','%3b');
	GetURL = GetURL.replace('?','%3f');
	GetURL = GetURL.replace('>','%3e');
	GetURL = GetURL.replace('<','%3c');
	GetURL = GetURL.replace('/','%2f');
	GetURL = GetURL.replace(',','%2c');
	GetURL = GetURL.replace(' ','+');
	return GetURL;
}

//�����ݽ��б�׼��ʽ��(0.00��ʽ)
function getNumberToCurrency(vSource){
//�����ݽ��б�׼��ʽ��(0.00��ʽ)
	vSource = vSource.toString();
	if(vSource=="" || vSource==null) return "0.00";
	vSource = vSource.toString();
	var vPos=vSource.indexOf(".");
	if((vPos>-1) && (vSource.length -vPos -1)>2){
		vSource=vSource.substr(0,vPos+3);
	}else if((vPos>-1) && (vSource.length -vPos -1)==1){
		vSource=vSource+"0";
	}else if((vPos>-1) && (vSource.length -vPos -1)==0){
		vSource=vSource+"00";
	}else if(vPos==-1){
		vSource=vSource+".00"; 
	}
	return vSource;
}


function runBarCodePrint(sBarCodes,sMsg1,sMsg2,sBarType)
{
    var oCodeList=sBarCodes.split(",");
    var iCodeCount=oCodeList.length;
    if(sMsg1==null)
    {
        sMsg1="";
    }
    if(sMsg2==null)
    {
        sMsg2="";
    }
    if(sBarType==null)
    {
        sBarType="0";
    }
    
    
    
    var iInitWidth=350;
    var iInitHeight=80;
    
    var iDeltaWidth=350;
    var iDeltaHeight=110;
    
    var iDialogWidth=iInitWidth;
    var iDialogHeight=iInitHeight;
    
    var iMaxHeight=630;
    
    if(iCodeCount>1)
    {
        iDialogWidth+=iDeltaWidth;
    }
    var iLines=Math.ceil(iCodeCount/2);
    iDialogHeight=iDialogHeight+(iDeltaHeight*iLines);
    
    if(iDialogHeight>iMaxHeight)
    {
        iDialogHeight=iMaxHeight;
    }
    
	var sFeatures = 'dialogHeight	=' + iDialogHeight + 'px;' +
				'dialogWidth	=' + iDialogWidth + 'px;' +
				'help: no;' +
				'status: no;' +
				'scroll: no;';
				
    window.showModalDialog(GlobalNames.WEB_PATH+"/oa/process/process_bar_code_print.aspx?bar_code="+sBarCodes+"&posi1="+sMsg1+"&posi2="+sMsg2+"&bar_type="+sBarType,window,sFeatures);
}
function runBarCodePrintForm(oBarForm)
{
    try
    {
        var sBarCodes=oBarForm.bar_code.value;
        var saBarCodes=sBarCodes.split(",");
        
        var iCodeCount=saBarCodes.length;

        var iInitWidth=350;
        var iInitHeight=80;
        
        var iDeltaWidth=350;
        var iDeltaHeight=110;
        
        var iDialogWidth=iInitWidth;
        var iDialogHeight=iInitHeight;
        
        var iMaxHeight=630;
        
        if(iCodeCount>1)
        {
            iDialogWidth+=iDeltaWidth;
        }
        var iLines=Math.ceil(iCodeCount/2);
        iDialogHeight=iDialogHeight+(iDeltaHeight*iLines);
        
        if(iDialogHeight>iMaxHeight)
        {
            iDialogHeight=iMaxHeight;
        }
        
        var iX=(screen.availWidth-iDialogWidth)/2;
        var iY=(screen.availHeight-iDialogHeight)/2;
        
        var sFeatrues="width="+iDialogWidth+",height="+iDialogHeight+",top="+iY+",left="+iX;
        
        var oPrintWin=window.open("","BarCodePrintWin", sFeatrues);
        oBarForm.action=GlobalNames.WEB_PATH+"/oa/process/process_bar_code_print.aspx";
        oBarForm.method="post";
        oBarForm.target="BarCodePrintWin";
        oBarForm.submit();
    }
    catch(e)
    {
    }
}
function openNewWin(vUrl,iDialogWidth,iDialogHeight)
{
    var iX = (screen.availWidth - iDialogWidth) / 2;
    var iY = (screen.availHeight - iDialogHeight) / 2;
    window.open(vUrl, "newwin", "width=" + iDialogWidth + ",height=" + iDialogHeight + ",top=" + iY + ",left=" + iX + ",toolbar=no,status=yes,menubar=no,scrollbars=auto");
}
function getStringToHtml(TextString){
	TextString = TextString.replace(/\&/g,		'&amp;');
	TextString = TextString.replace(/</g,		'&lt;');
	TextString = TextString.replace(/>/g,		'&gt;');
	TextString = TextString.replace(/\"/g,		'&quot;');
	TextString = TextString.replace(/ /g,		'&nbsp;');
	TextString = TextString.replace(/\n/g,		'<br>');
	return TextString;
}

function getHtmlToString(HtmlString){
	HtmlString = HtmlString.replace(/\&lt;/g,		'<');
	HtmlString = HtmlString.replace(/\&gt;/g,		'>');
	HtmlString = HtmlString.replace(/\&quot;/g,		'"');
	HtmlString = HtmlString.replace(/\&nbsp;/g,		' ');	
	HtmlString = HtmlString.replace(/\&amp;/g,		'&');
	HtmlString = HtmlString.replace(/<br>/g,		'\n');
	return HtmlString;
}

function getCurrencyToString(vSource){
	//��Ǯ��ת��Ϊ��д
	var ls_bit = "��Ǫ��ʰ��Ǫ��ʰ��Ǫ��ʰԪ�Ƿ�";
	var ls_num = "Ҽ��������½��ƾ�";
	var lmax = ls_bit.length;
	var ls_je, ls_dw, ls_result ="";
	var ll_len, i, k;
	
	//�����ݽ��б�׼��ʽ��(0.00��ʽ)
	vSource = vSource.toString();
	var vPos=vSource.indexOf(".");
	if((vPos>-1) && (vSource.length -vPos -1)>2){
		vSource=vSource.substr(0,vPos+3);
	}else if((vPos>-1) && (vSource.length -vPos -1)==1){
		vSource=vSource+"0";
	}else if((vPos>-1) && (vSource.length -vPos -1)==0){
		vSource=vSource+"00";
	}else if(vPos==-1){
		vSource=vSource+".00";	
	}
	
	ls_je=vSource;
	ll_len = ls_je.length;	
	ls_je=ls_je.replace(".","")
	ll_len = ls_je.length;
	for(var i=ll_len;i>0;i--){	
		lmax =lmax-1;
		ls_dw =ls_bit.substr(lmax,1);
		k = parseInt(ls_je.substr(i-1,1));
		
		
		if(k == 0){
			switch(ls_dw){
				case 'Ԫ':
					if(ls_result==""){
						ls_result = ls_dw + ls_result+"��";
					}else{
						ls_result = ls_dw + ls_result;
					}
					break;
				case '��':
					ls_result = ls_dw + ls_result;
					break;
				case '��':
					ls_result = ls_dw + ls_result;
					break;	
				case '��':
					ls_result = ''; //��
					break;
				case '��':					
					if (ls_result != '') ls_result = '��' + ls_result;
					break;
				default:
					switch(ls_result.substr(0,1)){				
						case '��':
							break;
						case '��':
							break;
						case 'Ԫ':
							break;
						case '��':
							break;
						default:						
							ls_result = '��' + ls_result;
					}				
			}
		}else{
			if(ls_result=="" && ls_dw=="Ԫ" ){
				ls_result = ls_num.substr(k-1, 1 ) + ls_dw + ls_result+"��";
			}else{
				ls_result = ls_num.substr(k-1, 1 ) + ls_dw + ls_result;
			}					
		}
	}
	
	return ls_result;	
}

function IsValidDateTimeString(DateTimeString){
	if (typeof(DateTimeString) != 'string') return false;

	var str_m_31	= ',1,3,5,7,8,10,12,';
	var str_m_30	= ',4,6,9,11,';
	var reg_date	= /(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2})( (\d{1,2}):(\d{1,2}):(\d{1,2}))?$/;
	var arrDate		= reg_date.exec(DateTimeString);
	if (arrDate == null) return false;
	for (var i = 1; i < arrDate.length; i++) if (arrDate[i].toString() == '') arrDate[i] = '0';

	if (parseInt(arrDate[2], 10) < 1 || parseInt(arrDate[2], 10) > 12) return false;
	if (parseInt(arrDate[3], 10) < 1 || parseInt(arrDate[3], 10) > 31) return false;
	if (parseInt(arrDate[4], 10) < 0 || parseInt(arrDate[4], 10) > 59) return false;
	if (parseInt(arrDate[5], 10) < 0 || parseInt(arrDate[5], 10) > 59) return false;
	if (parseInt(arrDate[6], 10) < 0 || parseInt(arrDate[6], 10) > 59) return false;

	if (str_m_31.indexOf(','+parseInt(arrDate[2], 10)+',') == -1){
		if(str_m_30.indexOf(','+parseInt(arrDate[2], 10)+',') == -1){
			if (parseInt(arrDate[1], 10) < 21){
				arrDate[1] = '20' + arrDate[1];
			}else{
				arrDate[1] = '19' + arrDate[1];
			}
			if (parseInt(arrDate[1], 10)%4 == 0){
				if (parseInt(arrDate[3], 10) > 29) return false;
			}else{
				if (parseInt(arrDate[3], 10) > 28) return false;
			}
		}else{
			if (parseInt(arrDate[3], 10) > 30) return false;
		}
	}
	return true;
}

var sTmpUrlArgs = null;
function runOpen(GetURL, IsModal, GetWidth, GetHeight, ScrollType){
	sTmpUrlArgs = GetURL;
	var sDialogUrl = GlobalNames.WEB_PATH+'/res/include/dailogbox.htm';
	if (ScrollType == "no")
	{
	    sDialogUrl = GlobalNames.WEB_PATH+'/res/include/dailogbox_noscroll.htm';
	}
	if (typeof(GetWidth)	!= 'number' || GetWidth < 0)  GetWidth	= screen.availWidth/2;
	if (typeof(GetHeight)	!= 'number' || GetHeight < 0) GetHeight	= screen.availHeight/2;
	var sFeatures = 'dialogHeight	=' + GetHeight + 'px;' +
					'dialogWidth	=' + GetWidth + 'px;' +
					'help: no;' +
					'status: no;'
	if (typeof(IsModal) == 'boolean' && IsModal == false){ 
		window.showModelessDialog(sDialogUrl,window,sFeatures);
	}else{
		return window.showModalDialog(sDialogUrl,window,sFeatures);
	}
}

function runCardOpen(GetURL, IsModal, GetWidth, GetHeight){
	if (typeof(GetWidth)	!= 'number' || GetWidth < 0)  GetWidth	= screen.availWidth/2;
	if (typeof(GetHeight)	!= 'number' || GetHeight < 0) GetHeight	= screen.availHeight/2;
	var sFeatures = 'dialogHeight	=' + GetHeight + 'px;' +
					'dialogWidth	=' + GetWidth + 'px;' +
					'help: no;' +
					'status: no;'
	if (typeof(IsModal) == 'boolean' && IsModal == false){ 
		window.showModelessDialog(GetURL,window,sFeatures);
	}else{
		window.showModalDialog(GetURL,window,sFeatures);
	}
}


//ȫ���򿪴���
function  openFullWin(sUrl)
{
	newwin=window.open(sUrl,"","scrollbars")   
	newwin.moveTo(0,0);   
	newwin.resizeTo(screen.width,screen.height-30);
	return newwin;
}


function runDateSelect(TextBoxHandle, IsCenter, IsDateTime){
	var sFeatures	= null;
	var iHeight		= 300;
	var iWidth		= 400;
	if (typeof(IsCenter) == 'boolean' && IsCenter == true){ 
		sFeatures = 'dialogHeight:'+iHeight+'px;'+
					'dialogWidth:' +iWidth+'px;'+
					'help: no;' +
					'status: no;'
	}else{
		var x = event.screenX;
		var y = event.screenY;
		if (x 	>= parseInt(screen.availWidth - iWidth)) x -= iWidth;
		if (y 	>= parseInt(screen.availHeight - iHeight)) y -= iHeight;
		sFeatures = 'dialogHeight:'+iHeight+'px;'+
					'dialogWidth:' +iWidth+'px;'+
					'dialogLeft:' +x+'px;'+
					'dialogTop:' +y+'px;'+
					'center: no;'+
					'help: no;' +
					'status: no;'
	}
	var sOldValue = TextBoxHandle.value;
	//dialogHide: no;
	if (typeof(IsDateTime) == 'boolean' && IsDateTime == true){
	    var args = new Array();
	    args[0] = TextBoxHandle;
	    args[1] = "";
		window.showModalDialog(GlobalNames.WEB_PATH+'/res/include/getdatetime.htm',args,sFeatures);
	}else{
		window.showModalDialog(GlobalNames.WEB_PATH+'/res/include/getdate.htm',TextBoxHandle,sFeatures);
	}
	if (TextBoxHandle.value != sOldValue && typeof(setDirty)=='function'){
	    setDirty();
	}
}

function runDateSelectWithOther(TextBoxHandle, IsCenter, IsDateTime){
	var sFeatures	= null;
	var iHeight		= 300;
	var iWidth		= 400;
	if (typeof(IsCenter) == 'boolean' && IsCenter == true){ 
		sFeatures = 'dialogHeight:'+iHeight+'px;'+
					'dialogWidth:' +iWidth+'px;'+
					'help: no;' +
					'status: no;'
	}else{
		var x = event.screenX;
		var y = event.screenY;
		if (x 	>= parseInt(screen.availWidth - iWidth)) x -= iWidth;
		if (y 	>= parseInt(screen.availHeight - iHeight)) y -= iHeight;
		sFeatures = 'dialogHeight:'+iHeight+'px;'+
					'dialogWidth:' +iWidth+'px;'+
					'dialogLeft:' +x+'px;'+
					'dialogTop:' +y+'px;'+
					'center: no;'+
					'help: no;' +
					'status: no;'
	}
	var sOldValue = TextBoxHandle.value;
	//dialogHide: no;
	if (typeof(IsDateTime) == 'boolean' && IsDateTime == true){
	    var args = new Array();
	    args[0] = TextBoxHandle;
	    args[1] = "";
		window.showModalDialog(GlobalNames.WEB_PATH+'/res/include/GetDateYMD.htm',args,sFeatures);
	}else{
		window.showModalDialog(GlobalNames.WEB_PATH+'/res/include/getdate.htm',TextBoxHandle,sFeatures);
	}
	if (TextBoxHandle.value != sOldValue && typeof(setDirty)=='function'){
	    setDirty();
	}
}

function runDateSelectWithDefault(TextBoxHandle, IsCenter, IsDateTime, DefaultTime){
	var sFeatures	= null;
	var iHeight		= 300;
	var iWidth		= 400;
	if (typeof(IsCenter) == 'boolean' && IsCenter == true){ 
		sFeatures = 'dialogHeight:'+iHeight+'px;'+
					'dialogWidth:' +iWidth+'px;'+
					'help: no;' +
					'status: no;'
	}else{
		var x = event.screenX;
		var y = event.screenY;
		if (x 	>= parseInt(screen.availWidth - iWidth)) x -= iWidth;
		if (y 	>= parseInt(screen.availHeight - iHeight)) y -= iHeight;
		sFeatures = 'dialogHeight:'+iHeight+'px;'+
					'dialogWidth:' +iWidth+'px;'+
					'dialogLeft:' +x+'px;'+
					'dialogTop:' +y+'px;'+
					'center: no;'+
					'help: no;' +
					'status: no;'
	}
	var sOldValue = TextBoxHandle.value;
	//dialogHide: no;
	if (typeof(IsDateTime) == 'boolean' && IsDateTime == true){
	    var args = new Array();
	    args[0] = TextBoxHandle;
	    args[1] = DefaultTime;
	    window.showModalDialog(GlobalNames.WEB_PATH+'/res/include/getdatetime.htm',args,sFeatures);
	}else{
		window.showModalDialog(GlobalNames.WEB_PATH+'/res/include/getdate.htm',TextBoxHandle,sFeatures);
	}
	if (TextBoxHandle.value != sOldValue && typeof(setDirty)=='function'){
	    setDirty();
	}
}
function acknowledge(sMessage) {
    if (sMessage == null) {
        sMessage = "";
    }
    var oMessageArray = serializeMessage(sMessage);
    var sFeatures = getMessageBoxFeatureByTextSize(sMessage);
    var bResult = window.showModalDialog(GlobalNames.WEB_PATH + "/res/include/confirm.aspx", oMessageArray, sFeatures);
    return bResult;
}
function message(sMessage) {
    if (sMessage == null) {
        sMessage = "";
    }
    var oMessageArray = serializeMessage(sMessage);
    var sFeatures = getMessageBoxFeatureByTextSize(sMessage);
    var _$win = window.showModalDialog(GlobalNames.WEB_PATH + "/res/include/alert.aspx", oMessageArray, sFeatures);
}
function serializeMessage(sMessage) {
    if (sMessage == null) {
        sMessage = "";
    }

    var sMessageTemp = sMessage;
    var oMessageArray = new Array();

    while (sMessageTemp.length > 4096) {
        oMessageArray[oMessageArray.length] = sMessageTemp.substring(0, 4096);
        sMessageTemp = sMessageTemp.substr(4096, (sMessageTemp.length - 4096));
    }
    oMessageArray[oMessageArray.length] = sMessageTemp;
    return oMessageArray;
}
function getMessageBoxFeatureByTextSize(sMessage) {
    var iInitWidth = 250;
    var iInitHeight = 156;

    var iMaxWidth = 750;
    var iMaxHeight = 500;

    var iInitMessageCol = 10;
    var iInitMessageRow = 1;

    var iDeltaWidth = 16.7;
    var iDeltaheight = 18;

    var iMaxMessageCol = iInitMessageCol + ((iMaxWidth - iInitWidth) / iDeltaWidth);

    var iFinalWidth = iInitWidth;
    var iFinalHeight = iInitHeight;
    var iCurrMessageCol = 0;
    var iCurrMessageRow = 0;

    var oMessageLine = sMessage.split('\r');
    if (oMessageLine.length != null)//����
    {
        iCurrMessageCol = oMessageLine.length;
        for (var i = 0; i < oMessageLine.length; i++) {
            var iDeltaCol = (oMessageLine[i].length - iInitMessageCol) < 0 ? 0 : (oMessageLine[i].length - iInitMessageCol);
            var iCurrWidth = iInitWidth + iDeltaCol * iDeltaWidth;
            if (iCurrWidth > iMaxWidth) {
                iCurrWidth = iMaxWidth;
                var iCurrMessageColTemp = Math.ceil(oMessageLine[i].length / iMaxMessageCol);
                iCurrMessageCol += (iCurrMessageColTemp - 1);
            }

            if (iCurrWidth > iFinalWidth) {
                iFinalWidth = iCurrWidth;
            }
        }
    }
    else//����
    {
        var iDeltaCol = (sMessage.length - iInitMessageCol) < 0 ? 0 : (sMessage.length - iInitMessageCol);
        iFinalWidth = iInitWidth + iDeltaCol * iDeltaWidth;
        iCurrMessageCol = 1;
        if (iFinalWidth > iMaxWidth) {
            iFinalWidth = iMaxWidth;
            iCurrMessageCol = Math.ceil(sMessage.length / iMaxMessageCol);
        }
    }

    iFinalHeight = (iCurrMessageCol - 1) * iDeltaheight + iInitHeight;
    if (iFinalHeight > iMaxHeight) {
        iFinalHeight = iMaxHeight;
    }

    var sFeatures = 'dialogHeight	=' + iFinalHeight + 'px;' +
				'dialogWidth	=' + iFinalWidth + 'px;' +
				'help: no;' +
				'status: no;' +
				'scroll: no;';

    return sFeatures;
}


//����������ת��Ϊ��������
function getChinaByNumber(amountPart) 
{ 
    var chineseDigits=new Array();
    chineseDigits[0]="��";
    chineseDigits[1]="һ";
    chineseDigits[2]="��";
    chineseDigits[3]="��";
    chineseDigits[4]="��";
    chineseDigits[5]="��";
    chineseDigits[6]="��";
    chineseDigits[7]="��";
    chineseDigits[8]="��";
    chineseDigits[9]="��";
    var units=new Array();
    units[0]="";
    units[1]="ʰ";
    units[2]="��";
    units[3]="Ǫ";
    var temp=amountPart;
    var amountStr=""+amountPart;
    var amountStrLength=amountStr.length;
    var lastIsZero=true;//�ڴӵ�λ����λѭ��ʱ����¼��һλ�����ǲ��� 0  
    var chineseStr="";
	for(var i=0; i<amountStrLength; i++) 
    {  
		if(temp == 0)  // ��λ��������  
			break;  
		var digit = temp % 10;
		if (digit == 0) 
        { // ȡ��������Ϊ 0  
		    if(!lastIsZero)  //ǰһ�����ֲ��� 0�����ڵ�ǰ���ִ�ǰ�ӡ��㡱��;  
				chineseStr = "��" + chineseStr;  
				lastIsZero = true;  
		}  
		else { // ȡ�������ֲ��� 0  
			chineseStr = chineseDigits[digit] + units[i] + chineseStr;  
			lastIsZero = false;  
		}  
		temp = temp / 10;  
	}  
	return chineseStr;  
}