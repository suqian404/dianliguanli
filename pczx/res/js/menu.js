// JavaScript Document
//<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<!--
function runTableOnClick(TableHandle, mode){
    var e = event.srcElement;
    if(typeof(e.tagName)=='undefined') return;
    if (e.tagName == 'TABLE' || e.tagName == 'TR' || e.tagName == 'TBODY') return;
    while (e.tagName != 'TR') e = e.parentElement;
    if (e.rowIndex == 0 || e.className == 'itemDisabled') return;
    var el = e;
    while (el.tagName != 'TABLE') el = el.parentElement;
    for (var i = 0; i < el.rows.length; i++){
        if (isRowSelected(el.rows(i)) && el.rows(i)!=e){
            /*if(i%2 == 0){   
                el.rows(i).className = 'tr_records1';
            }else{
                el.rows(i).className = 'tr_records2';
            }*/
            setRowSelected(el.rows(i), false);
            break;
        }
    }
    if(mode == true)
    {
        //if(e.className =='itemOver') e.className='itemOut';
        //else e.className ='itemOver';
        setRowSelected(e, !isRowSelected(e))
    }else{
        //e.className ='tr_records_over';
        setRowSelected(e, true);
    }
    if (TableHandle != null){
        if (event.button == 2) menuShow(TableHandle); else menuHide(TableHandle);
    }
}

/*
function runTableOnClick(TableHandle, mode){
var e = event.srcElement;
if(typeof(e.tagName)=='undefined') return;
if (e.tagName == 'TABLE' || e.tagName == 'TR' || e.tagName == 'TBODY') return;
while (e.tagName != 'TR') e = e.parentElement;
if (e.rowIndex == 0 || e.className == 'itemDisabled') return;
var el = e;
while (el.tagName != 'TABLE') el = el.parentElement;
for (var i = 0; i < el.rows.length; i++){
if (el.rows(i).className == 'itemOver' && el.rows(i) !=e){
el.rows(i).className = 'itemOut';
break;
}
}
if(mode ==true)
{
if(e.className =='itemOver') e.className='itemOut';
else e.className ='itemOver';
}
else
{
e.className ='tr_records_over';
}
if (TableHandle != null){
if (event.button == 2) menuShow(TableHandle); else menuHide(TableHandle);
}
}*/

function isRowSelected(oRow){
    return (oRow.className == 'tr_records_over');
}

function setRowSelected(oRow, state){
    if (state){
        oRow.className = 'tr_records_over';
    }
    else{
        if (oRow.rowIndex % 2 == 0){
            oRow.className = "tr_records1";
        }else{
            oRow.className = "tr_records2";
        }
    }
}

function getTableSingleSelected(TableHandle){
    var oActiveItem = null;
    for (i = 1; i < TableHandle.rows.length; i++){
        if  (isRowSelected(TableHandle.rows(i))){
            //oMultiple.push(e);
            oActiveItem = TableHandle.rows(i);
            break;
        }
    }
    return oActiveItem;
}

function setRowFixed(RowIndex){
    try
    {
        var e = event.srcElement;
        if (e.tagName != 'DIV') return;
        var oTab = e.children(0);
        var iTop = e.scrollTop;
        var iBor = parseInt(oTab.border);
        if (RowIndex == null || RowIndex < 0) RowIndex = 0;
        with (oTab.rows(RowIndex).style){
            //if (position != 'absolute') position = 'absolute';
            left = -iBor;
            top = iTop-iBor;
        }
    }catch(e){}
}

function runRowInsert(TableHandle, GetCells, RowIndex){
    var oRow = null;
    var oCel = null;

    if (typeof(GetCells) != 'object' || GetCells.length == 0){
        message('错误信息:\n* 没有任何数据需添加!');
    }else{
        if (typeof(RowIndex) != 'number'|| RowIndex < 0){
            oRow = TableHandle.insertRow();
        }else{
            if (RowIndex < TableHandle.length){
                oRow = TableHandle.insertRow(RowIndex);
            }else{
                oRow = TableHandle.insertRow();
            }
        }
        /*if (oRow.rowIndex % 2 == 0){
            oRow.className = "tr_records1";
        }else{
            oRow.className = "tr_records2";
        }*/
        setRowSelected(oRow, false);
        for (var i = 0; i < GetCells.length; i++){
            oCel = oRow.insertCell();
            oCel.innerHTML = GetCells[i];
        }
    }
    return oRow;
}

//function runTableClear(TableHandle){
//    if (TableHandle == null) return;
//    for (var i = TableHandle.rows.length; i > 1; i--){
//        TableHandle.deleteRow();
//    }
//    /*var iTop = 1;
//    var iBor = parseInt(TableHandle.border);
//    with (TableHandle.rows(0).style){
//        //if (position != 'absolute') position = 'absolute';
//        left = -iBor;
//        top = iTop-iBor;
//    }*/
//}

//function runClearTable(TableHandle){
//	if (TableHandle == null) return;
//	for (var i = TableHandle.rows.length; i > 0; i--){
//		TableHandle.deleteRow(0);
//	}
//}

function runRowSelect(TableHandle, RowIndexs){
    if (typeof(RowIndexs) != 'object' ||
        RowIndexs.length == 0) return;
    for (var i = 0; i < RowIndexs.length; i++){
        //TableHandle.rows(RowIndexs[i]).className = 'itemOver';
        setRowSelected(TableHandle.rows(RowIndexs[i]), true);
        var oChk = TableHandle.rows(RowIndexs[i]).cells(0).children(0);
        if (oChk != null && oChk.checked != null){
            oChk.checked = true;
        }
    }
}

function runTableMultipleSelect(){
    var e = event.srcElement;
    // if (e.tagName != 'TD') return;
    while (e.tagName != 'TR') e = e.parentElement;
    if (e.rowIndex == 0 ||
        e.className == 'itemDisabled') return;
    /*if  (e.className != 'tr_records_over'){
        e.className = 'tr_records_over';
    }else{
        if (e.rowIndex % 2 == 1)
            e.className = 'tr_records2';
        else
            e.className = 'tr_records1';
    }*/
    setRowSelected(e, !isRowSelected(e));
}

function runTableMultipleReset(TableHandle){
    //message("1");
    var e = null;
    for (var i = 1; i < TableHandle.rows.length; i++){
        e = TableHandle.rows(i);
        /*if (e.className == 'tr_records_over'){
            if (e.rowIndex % 2 == 1)
                e.className = 'tr_records2';
            else
                e.className = 'tr_records1';
        }*/
        if (isRowSelected(e))
            setRowSelected(e, false);
    }
}

function getTableMultipleSelected(TableHandle){
    var oMultiple = new Array();
    var e = null;
    var iLoop = 0;
    for (i = 1; i < TableHandle.rows.length; i++){
        e = TableHandle.rows(i)
        //if  (e.className == 'tr_records_over'){
        if  (isRowSelected(e)){
            //oMultiple.push(e);
            oMultiple[iLoop] = e;
            iLoop++;
        }
    }
    return oMultiple;
}

function menuShow(TableHandle){
    with(document.all){
        var menuLeft = parseInt(event.clientX);
        var menuTop = parseInt(event.clientY);
        if (menuLeft >= parseInt(document.body.offsetWidth) - parseInt(TableHandle.clientWidth)) menuLeft -= parseInt(TableHandle.clientWidth);
        if (menuTop >= parseInt(document.body.offsetHeight) - parseInt(TableHandle.clientHeight)) menuTop -= parseInt(TableHandle.clientHeight);
        TableHandle.style.top = menuTop + document.body.scrollTop;
        TableHandle.style.left = menuLeft + document.body.scrollLeft;
        TableHandle.className = 'menuShow';
    }
}

function menuHide(TableHandle){
    TableHandle.className = 'menuHide';
}

function menuOver(){
    var e = event.srcElement;
    if (e.tagName == 'TABLE') return;
    while (e.tagName != 'TR') e = e.parentElement;
    if (e.className != 'moveDisabled') e.className = 'moveOver';
}

function menuOut(){
    var e = event.srcElement;
    if (e.tagName == 'TABLE') return;
    while (e.tagName != 'TR') e = e.parentElement;
    if (e.className != 'moveDisabled') e.className = 'moveOut';
}

function setControlStyle(CssClass){
    var e = event.srcElement;
    if (e.tagName != 'INPUT' ||
        e.disabled == true) return;
    if (e.type == 'button' ||
        e.type == 'submit' ||
        e.type == 'reset'){
        e.className = CssClass
    }
}

function runFillCheckList(TableHandle, GetTexts, GetValues){
    var oData = null;
    var oRow = null;
    var oCel = null;
    var oChk = null;
    var iCels = TableHandle.rows(0).cells.length;

    if (GetTexts.length != GetValues.length) return;
    if (GetTexts.length < iCels) return;

    for (var i = 0; i < GetTexts.length; i++){
        oData = GetTexts[i];
        oRow = TableHandle.insertRow();
        oCel = oRow.insertCell();
        oCel.innerHTML = '<input type="checkbox" value="'+GetValues[i]+'" name="'+TableHandle.id+'"> '+oData[0];
        for (var j = 1; j < iCels; j++){
            oCel = oRow.insertCell();
            oCel.innerHTML = oData[0];
        }
    }
}

function runListenCheckList(){
    var e = event.srcElement;
    if (e.tagName != 'INPUT' || e.type != 'checkbox') return;
    var el = e;
    while (el.tagName != 'TR') el = el.parentElement;
    if (e.checked){
        e.checked = true;
        //el.className = 'itemOver';
        setRowSelected(el, true);
    }else{
        e.checked = false;
        //el.className = 'itemOut';
        setRowSelected(el, false);
    }
}

function runCheckListSelectAll(TableHandle, IsSelected){
    var chks = TableHandle.all.tags('INPUT');
    if (IsSelected){
        for (var i = 0; i < chks.length; i++){
            if (chks[i].type == 'checkbox'){
                chks[i].checked = true;
                var e = chks[i].parentElement;
                while (e.tagName != 'TR') e = e.parentElement;
                //e.className = 'itemOver';
                setRowSelected(e, true);
            }
        }
    }else{
        for (var i = 0; i < chks.length; i++){
            if (chks[i].type == 'checkbox'){
                chks[i].checked = false;
                var e = chks[i].parentElement;
                while (e.tagName != 'TR') e = e.parentElement;
                //e.className = 'itemOut';
                setRowSelected(e, false);
            }
        }
    }
}

function runFillListBox(ListBoxHandle, GetOptions){
    for (var i = 0; i < GetOptions.length; i++){
        var oData = GetOptions[i];
        if (oData.length != 2) return;
        var oItem = document.createElement("OPTION");
        oItem.text = oData[0];
        oItem.value = oData[1];
        ListBoxHandle.options.add(oItem);
    }
}

function setLinkSingleSelectStyle(){
    var e = document.activeElement;
    if (e.tagName != 'A') return;
    var el = e;
    while (el.tagName != 'TD') el = el.parentElement;

    var alinks = el.all.tags('A');
    for (var i = 0; i < alinks.length; i++){
        if (alinks[i].className == 'aVisited'){
            alinks[i].className = '';
            break;
        }
    }
    e.className = 'aVisited';
}

function setRowVisible(TableHandle, RowIndex) {
    if (TableHandle.rows(RowIndex).style.visibility != 'hidden')return;
    for (var i = 0; i < TableHandle.rows.length; i++) {
        if (TableHandle.rows(i).style.visibility != 'hidden') {
            TableHandle.rows(i).style.visibility = 'hidden';
            TableHandle.rows(i).style.position = 'absolute';
            break;
        }
    }
    TableHandle.rows(RowIndex).style.visibility = 'visible';
    TableHandle.rows(RowIndex).style.position = 'relative';
}

//Check all radio/check buttons script- by javascriptkit.com

function checkAll(handlename,thestate){
    var handle =document.all.tags('input');
    for (c=0;c<handle.length;c++)
    {
        if(handle[c].name ==handlename)
        {
            handle[c].checked=thestate;
        }
    }
}
function delSelectRow(handle)
{
    var selected =handle.selectedIndex;
    for(i=selected; i<handle.options.length -1; i++)
    {
        handle.options[i].value =handle.options[i+1].value
        handle.options[i].text =handle.options[i+1].text
    }
    handle.options.length =handle.options.length -1;
}
//-->