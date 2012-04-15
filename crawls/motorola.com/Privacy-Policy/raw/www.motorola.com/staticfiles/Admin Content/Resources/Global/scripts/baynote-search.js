//v30
var bn_response = 0;
var country='', language='', description, locale='', wtSeg = '', dcsextb2csupport = '', wtzbhome = '', dcsextresourcelibrary = '';
//MD Specific Meta Data Variables
var srchCategory='', srchCategoryTranslation='', srchDescription='', srchName='', srchPageType='', srchTemplateName='', srchThumbnailUrl='';
//BMS Specific Meta Data Variables
var productLine='', productCategory='', industries='', pageType='', businessUnit='', documentType='', solutionCategory='', accessory='';
baynote_getMetaInfo();
//console.log('language' + language);
//var languages = ['da', 'de', 'en', 'es', 'fi', 'fr', 'it', 'ja', 'ko', 'nl', 'no', 'pt', 'sv', 'zh_cn', 'zh_tw'];
//var corp_emea = ['cz', 'dk', 'hu', 'ie', 'il', 'no', 'at', 'pl', 'pt', 'ro', 'sk', 'es', 'se', 'tr', 'ua'];
//var corp_latam = ['ar', 'cl', 'co', 'cr', 'pe', 'pr', 've'];

var b2b_apac = ['XP', 'XA', 'HK', 'ID', 'JP', 'PH', 'KR', 'TW', 'TH', 'VN'];
var b2b_emea = ['AF', 'XF', 'AT', 'W1', 'Y1', 'XC', 'W2', 'XE', 'IL', 'IT', 'XM', 'XN', 'W4', 'PK', 'PL', 'Y4', 'ZA', 'ES', 'W5', 'Y5'];
var b2b_latam = ['XL'];

var b2c_apac = ['Indonesia', 'ID', 'New Zealand', 'NZ', 'Philippines', 'PH', 'Thailand', 'TH', 'Vietnam', 'VN', 'AP', 'HK', 'TW', 'XP', 'XA', 'BD', 'BN', 'Bhutan', 'BT', 'KH', 'JP', 'LA', 'MV', 'NP', 'PW', 'PG',  'KR', 'LK', 'AP' ];
var b2c_emea = ['Africa', 'XF', 'Alternative Middle East', 'AR', 'Austria', 'AT', 'Belgium [Nederlands]', 'Belgium [Français]',  'Belgium [FranÃ§ais]', 'BE', 'Bulgaria', 'BG', 'Czech Republic', 'CZ', 'Danmark', 'DK', 'Finland', 'EU', 'FI', 'Greece', 'GR', 'Hungary', 'HU', 'IE', 'Eire', 'IL', 'Jamaica', 'JM', 'Kenya', 'KE', 'Lithuania', 'LT', 'Arab Countries [French]', 'Middle East and Africa', 'XZ', 'Nederlands', 'NL', 'Nigeria', 'NG', 'NN', 'Norwegian', 'Norweigan', 'NO','Pakistan', 'PK', 'Poland', 'PL', 'Portugal', 'PT', 'Romania', 'RO', 'Slovakia', 'SK', 'Slovenia', 'SI', 'SL', 'South Africa', 'ZA', 'España', 'EspaÃ±a','ES', 'Sweden', 'SE','Switzerland [Deutsch]', 'Switzerland [Français]', 'Switzerland [FranÃ§ais]', 'CH', 'Turkey', 'TR', 'UA', 'Ukraine', 'UR', 'XE', 'XW'];
var b2c_latam = ['Argentina', 'AR', 'América Central', 'AmÃ©rica Central', 'Cabire', 'CB', 'CE', 'CR', 'Chile', 'CL', 'Colombia', 'CO', 'Ecuador', 'EC', 'EP', 'Paraguay', 'PY', 'Peru', 'PE', 'PR', 'Caribe', 'Venezuela', 'VE','XA'];

var codes = new Array();
var b2bcodes = new Array();
/*******************************
codes['corp_emea'] = corp_emea;
codes['corp_latam'] = corp_latam;
codes['corp_na'] = ['ca',''];
codes['corp_au'] = ['au',''];
codes['corp_sg'] = ['sg',''];
codes['corp_br'] = ['br',''];
codes['corp_fr'] = ['fr',''];
codes['corp_de'] = ['de',''];
codes['corp_in'] = ['in',''];
codes['corp_it'] = ['it',''];
codes['corp_kr'] = ['kr',''];
codes['corp_my'] = ['my',''];
codes['corp_mx'] = ['mx',''];
codes['corp_ru'] = ['ru',''];
codes['corp_uk'] = ['uk',''];
codes['corp_usa'] = ['ww', 'us'];
*******************************/
b2bcodes['b2b_apac'] = b2b_apac;
b2bcodes['b2b_emea'] = b2b_emea;
b2bcodes['b2b_latam'] = b2b_latam;
b2bcodes['b2b_na'] = ['CA',''];
b2bcodes['b2b_cn'] = ['CN',''];
b2bcodes['b2b_au'] = ['AU',''];
b2bcodes['b2b_sg'] = ['SG',''];
b2bcodes['b2b_br'] = ['BR',''];
b2bcodes['b2b_fr'] = ['FR',''];
b2bcodes['b2b_de'] = ['DE',''];
b2bcodes['b2b_in'] = ['IN',''];
b2bcodes['b2b_kr'] = ['KR',''];
b2bcodes['b2b_my'] = ['MY',''];
b2bcodes['b2b_mx'] = ['MX',''];
b2bcodes['b2b_ru'] = ['RU',''];
b2bcodes['b2b_uk'] = ['XU',''];
b2bcodes['b2b_usa'] = ['US','WW'];
/********************************/
codes['b2c_apac'] = b2c_apac;
codes['b2c_emea'] = b2c_emea;
codes['b2c_latam'] = b2c_latam;
codes['b2c_ru'] = ['Россия','RU'];
codes['b2c_br'] = ['Brasil','BR'];
codes['b2c_cn'] = ['CN',''];
codes['b2c_de'] = ['Germany','DE'];
codes['b2c_in'] = ['India','IN'];
codes['b2c_it'] = ['Italia','IT']; 
codes['b2c_kr'] = ['Korea', 'KR'];
codes['b2c_mx'] = ['México', 'MÃ©xico', 'MX'];
codes['b2c_uk'] = ['United Kingdom','GB'];
codes['b2c_my'] = ['Malaysia','MY'];
codes['b2c_sg'] = ['Singapore','SG'];
codes['b2c_au'] = ['Australia','AU'];
codes['b2c_fr'] = ['France','FR'];
codes['b2c_na'] = ['Canada','CA'];
codes['b2c_sg'] = ['Singapore', 'SG'];
codes['b2c_usa'] = ['USA', 'US','WW'];

/*
 * This function will check if an array "a" has a certain value
 */
function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}

/*
 * This function will go through every sub-array in codes[]. 
 * The for loop will get every key in codes[], that is 'corp_apac', 'b2c_apac', etc.
 * Then it will access the content of the sub-array with that key, that is codes['corp_apac'], 
 * and examine whether or not the string in var language is in that subarray.  
 * USA B2B and B2C has a special logic.
 */
function get_cc() {
	var code = '';	
	
		if ((window.location.href.search(/business/i) != -1) && (wtzbhome == '') && (window.location.href.search(/consumers/i) == -1) && (dcsextb2csupport = ''))  {
			for (i in b2bcodes) {
				if (country in oc(b2bcodes[i])) {
					code = i;
				}
			}
			if (code == '')
			{
				for (i in codes) {
					if (country in oc(codes[i])) {
						code = i;
					}
				}
			}
		}else {
		for (i in codes) {
			if (country in oc(codes[i])) {
				code = i;
				if(language=='AR' && country=='AR'){
					code='b2c_emea';
				}
			}
		}
	}
	if(language == 'Russian'){
		code = "b2c_ru";
	}

	if(code == ''){
		code = "www_en";
	}
	return code;
}

function baynote_getMetaInfo() {
	var metas = document.getElementsByTagName("meta");
	if (metas) {   
		for (var i = 0; i < metas.length; i++) {			
			if (metas[i] && metas[i].name =="language") {
				language =  metas[i].content;
			} else if (metas[i] && (metas[i].name =="country")) {
				country =  metas[i].content;
			} else if (metas[i] && metas[i].name =="description") {
				description =  metas[i].content;						
			} else if(metas[i] && (metas[i].name =="DCSext.locale")) {
				if(metas[i].content) {
					result = metas[i].content.split("-");
					if(result.length>1) {
						country = result[0];
						language = result[1];
					}
				}
			} else if (metas[i] && metas[i].httpEquiv =="Content-Language") {			
				language =  metas[i].content;
			} else if (metas[i] && metas[i].name == "WT.seg_1" ){
				wtSeg = metas[i].content;
			} else if (metas[i] && metas[i].name == "DCSext.b2csupport" ){
				dcsextb2csupport = '1';
			} else if (metas[i] && metas[i].name == "WT.z_bhome" ){
				wtzbhome = '1';
			} else if (metas[i] && metas[i].name == "ProductLine" ){
				productLine = metas[i].content;
			} else if (metas[i] && metas[i].name == "ProductCategory" ){
				productCategory = metas[i].content;
			} else if (metas[i] && metas[i].name == "Industries" ){
				industries = metas[i].content;
			} else if (metas[i] && metas[i].name == "PageType" ){
				pageType = metas[i].content;
			} else if (metas[i] && metas[i].name == "BusinessUnit" ){
				businessUnit = metas[i].content;
			} else if (metas[i] && metas[i].name == "DocumentType" ){
				documentType = metas[i].content;
			} else if (metas[i] && metas[i].name == "SolutionCategory" ){
				solutionCategory = metas[i].content;
			} else if (metas[i] && metas[i].name == "Accessory" ){
				accessory = metas[i].content;
			} else if (metas[i] && metas[i].name == "srchCategory" ){
				srchCategory = metas[i].content;
			} else if (metas[i] && metas[i].name == "srchCategoryTranslation" ){
				srchCategoryTranslation = metas[i].content;
			} else if (metas[i] && metas[i].name == "srchDescription" ){
				srchDescription = metas[i].content;
			} else if (metas[i] && metas[i].name == "srchName" ){
				srchName = metas[i].content;
			} else if (metas[i] && metas[i].name == "srchPageType" ){
				srchPageType = metas[i].content;
			} else if (metas[i] && metas[i].name == "srchTemplateName" ){
				srchTemplateName = metas[i].content;
			} else if (metas[i] && metas[i].name == "srchThumbnailUrl" ){
				srchThumbnailUrl = metas[i].content;
			} else if (metas[i] && metas[i].name == "DCSext.resourcelibrary" ){
				dcsextresourcelibrary = metas[i].content;
			}
		}
	}
	if ( language == ''|| typeof(language) == undefined || country=='') {
		baynote_getSearchFormInfo();		
	}
	
	if(country.length == 2){
		country = country.toUpperCase();
	}
	
	if(language.length == 2){
		language = language.toUpperCase();
	}
	
	if(locale == '' && language != '' && country != ''){
		locale = country + '-' + language;	
	}	
	
}
function baynote_getSearchFormInfo() {
	if (document.forms['searchform'] && document.forms['searchform'].elements['qp']) {
		var queries = document.forms['searchform'].elements['qp'].value.split(' ');
		for(var i = 0; i < queries.length;i++)
		{
			if((queries[i] == "DCSext.locale") && ((i + 1) < queries.length))
			{
				result = queries[i+1].split('-');
				break;
			}
		}
		if(result.length > 1) {
			country = result[0].toUpperCase();
			language = result[1].toUpperCase();
		}
	}
}

function baynote_handleSubmit(frm){
	var code = get_cc();
	var mode = frm.mode.value;
	var tempLanguage = language.toLowerCase();
	if(frm.action == "http://advancedsearch.motorola.com/socialsearch/query")
	{
		//Remove any input parameters that are Legacy Baynote parameters.
		removeInputElement('cn', frm.cn);
		removeInputElement('cc', frm.cc);
		removeInputElement('st', frm.st);
		removeInputElement('bn_af', frm.bn_af);
		removeInputElement('bn_if', frm.bn_if);
		
		//Remove any input parameters that may have been used previously by Ultraseek.
		removeInputElement('col', frm.col);
		removeInputElement('la', frm.la);
		removeInputElement('qp', frm.qp);
		removeInputElement('charset', frm.charset);
		removeInputElement('charset', frm.view);
		
		//Insert any input parameters that are used by both Baynote and GSA.
		//Format language into GSA acceptable language.
		if(language == "ZH")
			tempLanguage = "zh-CN";
		else if(language == "ZA")
			tempLanguage = "zh-TW";
		else if(country == "PT" || country == "BR")
			tempLanguage = "pt-" + country;
		addInputElement('hl', tempLanguage, frm)
		
		//Format requiredfields based on locale.
		//Add the worldwide locale to get worldwide results.
		//Single encode value based on GSA requirements.
		var requiredfields = "HM_country_locale:" + locale + " DCSext.locale:" + locale + " country:" + country.toLowerCase();
		requiredfields += " HM_country_locale:WW-EN DCSext.locale:WW-EN country:ww";
		requiredfields = requiredfields.replace(/ /g, "|").replace(/[.]/g, "%2E").replace(/-/g, "%2D").replace(/_/g, "%5F");
		addInputElement('requiredfields', requiredfields, frm);
		
		//If Baynote is unavailable failover to GSA
		if (!bn_response) {
			//Change the form action to point to GSA.
			if(code.search(/b2b/) == -1)
				frm.action = "http://search-b2c.motorola.com/search";
			else
				frm.action = "http://search-b2b.motorola.com/search";

			//Remove any input parameters that are only used by Baynote.
			removeInputElement('mode', frm.mode);
			
			//Add/Modify parameters that are only used by GSA.
			if(frm.query != null)
				frm.query.setAttribute('name', 'q');
			addInputElement('start', '0', frm);
			addInputElement('ie', 'UTF-8', frm);
			addInputElement('oe', 'UTF-8', frm);
			addInputElement('filter', '0', frm);
			addInputElement('output', 'xml_no_dtd', frm);
			addInputElement('site', 'motorola_collection', frm);
			addInputElement('getfields', '*', frm);
			
			if (mode == 'corpgsa' || mode == 'corp')
			{
				addInputElement('client', 'motorola_b2b_frontend', frm);
				addInputElement('proxystylesheet', 'motorola_b2b_frontend', frm);
			}
			else if (mode == 'motogsa' || mode == 'moto')
			{
				addInputElement('client', 'motorola_b2c_hellomoto_frontend', frm);
				addInputElement('proxystylesheet', 'motorola_b2c_hellomoto_frontend', frm);
			}
			else
			{
				addInputElement('client', 'motorola_b2c_frontend', frm);
				addInputElement('proxystylesheet', 'motorola_b2c_frontend', frm);
			}
		}
		else
		{
			//Add/Modify parameters that are only used by Baynote.
			//Don't remove q or mode params.  Those cannot be dynamically generated
			if(frm.mode.value.search("gsa") == -1)
				frm.mode.value += "gsa";
			
			if(frm.q != null)
				frm.q.setAttribute('name', 'query');
			
			//Insert required query parameters for Baynote+GSA Search.
			addInputElement('customerId', 'motorola', frm);
			addInputElement('code', code, frm);
			frm.mode.setAttribute('id', 'mode');
			addInputElement('startingDocNum', '1', frm);
			addInputElement('attrFilter', get_attrFilter(), frm);
			
			//Insert required query parameters for WebTrends
			addInputElement('WTseg_1', wtSeg, frm);
			addInputElement('DCSextb2csupport', dcsextb2csupport, frm);
			addInputElement('WTz_bhome', wtzbhome, frm);
		}
	}
}

function removeInputElement(inputId, inputReference)
{
	if(inputReference != null)
		inputReference.setAttribute("id", inputId);
	var inputElement = document.getElementById(inputId);
	if((document.getElementById(inputId) == inputReference) && (inputReference != null))
	{
		var parentElement = inputElement.parentNode;
		parentElement.removeChild(inputElement);
	}
}

function addInputElement(inputName, inputValue, frm)
{
	if(document.getElementById(inputName) == null)
	{
		var inputElement = document.createElement("input");
		inputElement.setAttribute("name", inputName);
		inputElement.setAttribute("id", inputName);
		inputElement.setAttribute("type", "hidden");
		inputElement.setAttribute("value", inputValue);
		frm.appendChild(inputElement);
	}
}

function get_attrFilter() {
	var code = get_cc();
	var filterGroup = "";
	
	
	if(locale.length > 2){
		if(code == 'b2c_apac' || code=='b2c_emea' || code=='b2c_latam' || code=='b2b_latam' || code=='b2b_emea' || code=='b2c_na' || code=='b2b_na' ){
			filterGroup="bnGroup:" + locale;
		}
	}
	
	return filterGroup;
}

/*	baynote_validateSearchBox() - Determine if the service is available and show the search box if it is.  */
function baynote_validateSearchBox(server, customerId, code) {
	var failsafeId = baynote_tag.getFailsafeResourceId();

	baynote_tag.server = server;
	baynote_tag.customerId = customerId;
	baynote_tag.code = code;
	
	if ((bnResourceManager != "undefined")
		 && (bnResourceManager != null)
		 && (typeof(failsafeId) != "undefined")
		 && (failsafeId != null)) {
			 bnResourceManager.waitForResource(failsafeId,
			 "baynote_modifySearchBox()",
			 baynote_tag.getFailsafeResourceAddress(),
			 "img");			 
		 }		
	}
/*	baynote_modifySearchBox() - Modify the search box to point directly to Ultraseek */
function baynote_modifySearchBox() {	
	bn_response=1;	
}