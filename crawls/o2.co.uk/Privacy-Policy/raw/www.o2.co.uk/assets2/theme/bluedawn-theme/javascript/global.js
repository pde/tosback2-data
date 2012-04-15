
function getURLParam(strParamName){
	  var strReturn = "default";
	  var strHref = window.location.href;
	  if ( strHref.indexOf("?") > -1 ){
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
		  if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
			var aParam = aQueryString[iParam].split("=");
			strReturn = aParam[1];
			break;
		  }
		}
	  }
	  return unescape(strReturn);
	}

var item_param = getURLParam('tc');
var myindex = 0;
var myID = null;

	
$E('html').addClass('js');
	
var Site = {
	
	
	init: function() {
		Site.all_pages();
	},
	
	all_pages: function() {
		new Element('div', {"id":"top_corners"}).injectTop($('page_wrap'));
	},
	
	ff: function() {
		$E('body').addClass('ff');
	},
	
	enable_accordian: function() {
		$$(".toggler").each(function(toggler,i){
			toggler.getElements("dt").getElements("a").each(function(a){
				myID = a[0].id;
				a.addEvent("click", function(e){
					e.preventDefault()
					a.toggleClass("open");
				})
			})
			toggler.getElements("dt").addClass("togg_control");
			toggler.getElements("dd").addClass("reveal");
			
			myindex ++;
			
			//expand selected term
			if(myID == item_param){
				  new Accordion(toggler, 'dt.togg_control', 'dd.reveal', {alwaysHide:true, display:myindex-1});				  
			}else new Accordion(toggler, 'dt.togg_control', 'dd.reveal', {alwaysHide:true, display:null});
		})
	}
	
}

window.addEvent('domready', function() {
	Site.init();
	

	new Asset.javascript(js_path+'classes/Helper.js?v=1.3');
	new Asset.javascript(js_path+'classes/MainNavigation.js?v=1.3');
	new Asset.javascript(js_path+'classes/SearchForm.js?v=1.3');

	if ((document.forms.length - $$('.gsearch_form').length != 0) && document.forms.length > 1) {
		new Asset.javascript(js_path+'validanguage_uncompressed.js?v=1.3');
		new Asset.javascript(js_path+'classes/FormHelper.js?v=1.3');
	}
	
	if ($$(".select_table").length > 0)		new Asset.javascript(js_path+'classes/SelectTableHelper.js?v=1.3');
	if ($$('.tab-panel').length > 0) 		new Asset.javascript(js_path+'classes/TabHelper.js?v=1.3'); 		
	if ($$('.popular_recent').length > 0) 	new Asset.javascript(js_path+'classes/RecentPopular.js?v=1.3');
	if ($$('.boltons').length > 0)			new Asset.javascript(js_path+'classes/BoltOnPicker.js?v=1.3');
	if ($$('.explore_hub').length > 0) {
		new Asset.javascript(js_path+'classes/ExploreHub.js?v=1.0');
		new Asset.javascript(js_path+'classes/Carousel.js?v=1.0');	
		
	}
	if ($$('.toggler').length > 0) 			Site.enable_accordian();
	if (window.ie6)  						new Asset.javascript(js_path+'classes/FixIE6.js?v=1.3');
	if (window.gecko) 						Site.ff();
	
	//scroll to expanded term
	var myobject = document.getElementById(item_param);
	if (myobject != null){
		document.getElementById(item_param).scrollIntoView(true);
	}
});

window.js_path = "js/";
window.flash_path = "/bluedawn-theme/flash/";

