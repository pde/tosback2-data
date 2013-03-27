_spHashtable.prototype.hash = null;
function _spHashtable(){  this.hash = new Array();}
_spHashtable.prototype.get = function (key){  var imgSrc = this.hash[key ? key.toLowerCase() : ''];  return imgSrc == 1;}
_spHashtable.prototype.getVal = function (key){  var imgSrc = this.hash[key ? key.toLowerCase() : ''];  return imgSrc;}

var vsr_shopping_cart='';var vsr_button_url='';var vsr_button_text = ''; var vsr_launch_graphic ='';var vsr_price=''; //var vsr_button_link = '';
var vsr_show_srp='';var vsr_stock='';var vsr_call_back='';var ttpid = '';var vsr_sku=''; var vsr_html_id=''; var vsr_currency=''; 
var sp_date = new Date();sp_date = sp_date.getFullYear()+''+(sp_date.getMonth()+1)+''+sp_date.getDate();
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/smart_button/lookup/83.js?dt="+sp_date+"'></script>");
document.write("<script type='text/javascript' src='http://sb.sellpoint.net/smart_button/lookup/acp/83_acp.js?dt="+sp_date+"'></script>");

function _spIsNull(_spNo) { if(_spNo == undefined || !_spNo || _spNo == null || typeof(_spNo) == 'undefined' || typeof(_spNo) == 'unknown')return true; return false;}
function _spLoadJs(_spJs) {	var _spTh = document.getElementsByTagName('head')[0];	var _spScr = document.createElement('script');	if(_spIsNull(_spTh) || _spIsNull(_spScr)) { document.write("<script type='text/javascript' src='"+ _spJs +"'><\/script>");}	else{_spScr.setAttribute('type','text/javascript');_spScr.setAttribute('src',_spJs);_spTh.appendChild(_spScr);}}

function _atu(sName, sValue){return isNe(sValue) ? '' : ('&'+ sName +'=' + escape(sValue));}
function isNe(sValue){if(sValue == null || typeof(sValue) == 'undefined' || trimString(sValue).length == 0)return true;	return false;}
function trimString(sString) {return sString.replace(/^\s*|\s*$/g,'');}
var vsr_server = 'syndicate.sellpoint.net';
var ttpid = 'TTPID-104-121';

function _spIsNull(_spNo) { if(_spNo == undefined || !_spNo || _spNo == null || typeof(_spNo) == 'undefined' || typeof(_spNo) == 'unknown')return true; return false;}
function _spLoadJs(_spJs) {	var _spTh = document.getElementsByTagName('head')[0];	var _spScr = document.createElement('script');	if(_spIsNull(_spTh) || _spIsNull(_spScr)) { document.write("<script type='text/javascript' src='"+ _spJs +"'><\/script>");}	else{_spScr.setAttribute('type','text/javascript');_spScr.setAttribute('src',_spJs);_spTh.appendChild(_spScr);}}

var _spMobileBrowserType = null;
try {
	var _spAppVersion = navigator.appVersion.toLowerCase();
 	if(/iphone os 1/.test(_spAppVersion)) _spMobileBrowserType = 'iPhone OS 1';
 	else if(/iphone os 2/.test(_spAppVersion)) _spMobileBrowserType = 'iPhone OS 2';
 	else if(/iphone/.test(_spAppVersion)) _spMobileBrowserType = 'iPhone';
 	else if(/android/.test(_spAppVersion)) _spMobileBrowserType = 'Android';
	else if(/skyfire/.test(_spAppVersion)) _spMobileBrowserType = 'Skyfire';
} catch(e) {
	
}

function show_vsr_button()
{
	if(! isNaN(vsr_sku))
	vsr_sku = '' + vsr_sku;
	
	if(_spMobileBrowserType) { 
		document.write('<div id="_spmDivImage"></div>')
		document.write('<img style="display: none" id="_spmDuration">')
		_spLoadJs('http://'+ vsr_server +'/Syndicate/JSP/iPhoneSkuRequestJson.jsp?PartnerKey=' + ttpid + '&SKU=' + vsr_sku);
	} else {
		if(skus.get(vsr_sku)) {
		  // (APT) Sku Found ..
			var _vsrParams = 	_spGetParams(vsr_sku, vsr_button_url, vsr_shopping_cart, vsr_price, vsr_stock, vsr_show_srp, vsr_call_back, vsr_launch_graphic, vsr_html_id, vsr_currency);
			document.write("<script type='text/javascript' src='http://"+ vsr_server +"/Syndicate/AptSmartSync?"+ _vsrParams +"&dt="+sp_date+"'></script>");
		}

		var spLookup = skusAcp.getVal(vsr_sku);
		if(spLookup != undefined && spLookup != null){
			sAcpDir =  (vsr_server.indexOf('qasync') != -1 ? "qa/" : "" ) +"_acp_";
			var aSpLookupVals = spLookup.split("_");
			var spSupp = aSpLookupVals.length > 0 ? aSpLookupVals[0] : '';
			var spAcpId = aSpLookupVals.length > 1 ? aSpLookupVals[1] : '';
			var spAcpSynId = aSpLookupVals.length > 2 ? aSpLookupVals[2] : '';
			var spAcpUrl = getAcpSmartSyncJsUrl(sAcpDir, spSupp, spAcpId, spAcpSynId);
			window.setTimeout("_spWriteAcpMain('"+ spAcpUrl +"')", 1500);
		}
	}	
}

function getAcpSmartSyncJsUrl(sAcpDir, sSupplierId, sAcpId, sSyndicateLinkId)
{
  return "http://assetsw.sellpoint.net/" + sAcpDir + "/" + sSupplierId + "/" + sAcpId + "/js/acp_" + sSyndicateLinkId + ".js";
}

function _spWriteAcpMain(acpUrl)
{
	try{
		var cobj = document.getElementById('product-tab1');
		if(cobj != undefined && cobj != null){
			cobj.innerHTML = cobj.innerHTML +"<div id='_spSellPointAcp'></div>"+ "<div style='border-bottom:1px solid #B7B7B7;margin-bottom:5px;'></div>";
		}
			
		_spLoadJs(acpUrl);
	}catch(waee){}
}
//To show mulitple APTs on one page use this javascript file ..
function show_vsr_button_multi(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_html_id, _spApt_currency)
{
  if(! isNaN(vsr_sku))
 	vsr_sku = '' + vsr_sku;
  if(! skus.get(vsr_sku))
    return; // Sku Not Found ..

  var _vsrParams = 	_spGetParams(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_button_and_lg, _spApt_html_id, _spApt_currency);
  document.write("<script type='text/javascript' src='http://"+ vsr_server +"/Syndicate/AptSmartSync?"+ _vsrParams +"&dt="+sp_date+"'></script>");  
}

function _spGetParams(_sp_sku, _sp_button_and_lg, _sp_shopping_cart, _sp_price, _sp_stock, _sp_show_srp, _sp_call_back, _sp_launch_graphic, _sp_html_id, _sp_currency)
{
  var _sp_Params  = 'ttpid='+ ttpid + _atu('vsr_sku', _sp_sku) + _atu('vsr_button_url', _sp_button_and_lg) + _atu('vsr_shopping_cart', _sp_shopping_cart)
		+ _atu('vsr_price', _sp_price) + _atu('vsr_stock', _sp_stock) + _atu('vsr_call_back', _sp_call_back) + _atu('vsr_show_srp', _sp_show_srp) 
		+ _atu('vsr_launch_graphic', _sp_launch_graphic) + _atu('vsr_currency', _sp_currency)
		+ _atu('vsr_html_id', _sp_html_id) ;
  return _sp_Params;
}

function callTentoe()
{
    if(! isNaN(vsr_sku))
 	  vsr_sku = '' + vsr_sku;
	  
    var _vsrParams = 	_spGetParams(_spApt_sku, _spApt_button_and_lg, _spApt_shopping_cart, _spApt_price, _spApt_stock, _spApt_show_srp, _spApt_call_back, _spApt_button_and_lg, _spApt_button_text);
	var sOpenCmd = "onclick=\"return openVsrWin("+ escpae(_vsrParams) +");\"";
	var sSrc = "http://"+ vsr_server +"/Syndicate/SynImage?r="+ sp_date + "&" + _vsrParams;
	document.writeln('<a href="javascript:;" '+ sOpenCmd +'><img src="'+ sSrc +'" border=0></a>');
}

function openVsrWin(_spMyParams)	
{
  var sLink = 'http://'+ vsr_server +'/Syndicate/SynMaster?'+ _spMyParams +'&ParentUrl=' + escape(window.location.href);			
  window.open(sLink,'_blank', 'width=536,height=525,scrollbars=no,toolbar=no,personalbar=no,statusbar=no,directories=no,location=no,resizable=no,menubar=no,locationbar=no');
}

function _spCallMetrix(_spAptId)
{
  try
  {
    //if(ttpid != undefined && ttpid=='-999999')
    if(ttpid != undefined && ttpid=='TTPID-D2-96')
    {
	  var sProdName = null;
	  try
	  {
	    sProdName = window.document.title;
		var aName = sProdName.split("|");
	    sProdName = aName[0];
	  }catch(etmp){}
	  
	  window.cmSetProduction ? cmSetProduction() : '';
      window.cmCreatePageviewTag ? cmCreatePageviewTag(vsr_sku, null, "SELLPOINT") : '';
	}
  }catch(err){}  
}