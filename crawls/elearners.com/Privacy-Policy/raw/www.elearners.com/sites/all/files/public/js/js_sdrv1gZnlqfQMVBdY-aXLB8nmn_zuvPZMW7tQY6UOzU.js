var lpMTagConfig=lpMTagConfig||{};lpMTagConfig.vars=lpMTagConfig.vars||[];lpMTagConfig.dynButton=lpMTagConfig.dynButton||[];lpMTagConfig.lpProtocol=document.location.toString().indexOf("https:")==0?"https":"http";lpMTagConfig.pageStartTime=(new Date).getTime();if(!lpMTagConfig.pluginsLoaded)lpMTagConfig.pluginsLoaded=!1;
lpMTagConfig.loadTag=function(){for(var a=document.cookie.split(";"),b={},c=0;c<a.length;c++){var d=a[c].substring(0,a[c].indexOf("="));b[d.replace(/^\s+|\s+$/g,"")]=a[c].substring(a[c].indexOf("=")+1)}a=b.HumanClickRedirectOrgSite;b=b.HumanClickRedirectDestSite;if(!lpMTagConfig.pluginsLoaded)lpMTagConfig.pageLoadTime=(new Date).getTime()-lpMTagConfig.pageStartTime,b="?site="+(a==lpMTagConfig.lpNumber?b:lpMTagConfig.lpNumber)+"&d_id="+lpMTagConfig.deploymentID+"&default=simpleDeploy",lpAddMonitorTag(lpMTagConfig.deploymentConfigPath!=
null?lpMTagConfig.lpProtocol+"://"+lpMTagConfig.deploymentConfigPath+b:lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpTagSrv+"/visitor/addons/deploy2.asp"+b),lpMTagConfig.pluginsLoaded=!0};
function lpAddMonitorTag(a){if(!lpMTagConfig.lpTagLoaded){if(typeof a=="undefined"||typeof a=="object")a=lpMTagConfig.lpMTagSrc?lpMTagConfig.lpMTagSrc:lpMTagConfig.lpTagSrv?lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpTagSrv+"/hcp/html/mTag.js":"/hcp/html/mTag.js";a.indexOf("http")!=0?a=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpServer+a+"?site="+lpMTagConfig.lpNumber:a.indexOf("site=")<0&&(a+=a.indexOf("?")<0?"?":"&",a=a+"site="+lpMTagConfig.lpNumber);var b=document.createElement("script");b.setAttribute("type",
"text/javascript");b.setAttribute("charset","iso-8859-1");b.setAttribute("src",a);document.getElementsByTagName("head").item(0).appendChild(b)}}window.attachEvent?window.attachEvent("onload",lpMTagConfig.loadTag):window.addEventListener("load",lpMTagConfig.loadTag,!1);
(function(){lpMTagConfig.containsUnit=!1;lpMTagConfig.containsLanguage=!1;for(var a=0;a<lpMTagConfig.vars.length;a++){var b=null;lpMTagConfig.vars[a].length==2?b=lpMTagConfig.vars[a][0]:lpMTagConfig.vars[a].length>2&&(b=lpMTagConfig.vars[a][1]);switch(b){case "unit":lpMTagConfig.containsUnit=!0;break;case "language":lpMTagConfig.containsLanguage=!0}}})();
function lpSendData(a,b,c){if(arguments.length>0)lpMTagConfig.vars=lpMTagConfig.vars||[],lpMTagConfig.vars.push([a,b,c]);if(typeof lpMTag!="undefined"&&typeof lpMTagConfig.pluginCode!="undefined"&&typeof lpMTagConfig.pluginCode.simpleDeploy!="undefined"){var d=lpMTagConfig.pluginCode.simpleDeploy.processVars();lpMTag.lpSendData(d,!0)}}function lpAddVars(a,b,c){lpMTagConfig.vars=lpMTagConfig.vars||[];lpMTagConfig.vars.push([a,b,c])};

(function ($) {	
	
	$(document).ready(function(){	
		loadLPChat();		
	});
	
	$(window).unload(function(){
		unloadLPChat();
	});
	
	
    $('a#eddy-live-person').live("click", function(event) {	
		
		livePersonPopUp(Drupal.settings.EddyLivePerson);
		//event.preventDefault();
    });
	
	
	function livePersonPopUp (params) {	
		var url = livePersonGetUrl(params.url);
		var windowName = 'chat' + params.accountId;
		var specs = 'width=500,height=500,resizable=yes';
		window.open(url, windowName, specs);
		return false;
    }
	
	
	function livePersonGetUrl (url) {
      if (typeof(lpAppendVisitorCookies) != 'undefined') {
        url = lpAppendVisitorCookies(params.url);
      }
      if (typeof(lpMTag) != 'undefined' && typeof(lpMTag.addFirstPartyCookies) != 'undefined') {
        url = lpMTag.addFirstPartyCookies(url);
      }
      return url;
    }
})(jQuery);





;

var first_dropdown_name = "EduLevel";
var second_dropdown_name = "Category";
var third_dropdown_name = "Subject";

var first_dropdown_mapping = new Array();
var second_dropdown_mapping = new Array();
var third_dropdown_mapping = new Array();


function generateURL(formObj){

		var appName = Drupal.settings.degree_questions.appName;
		var submit_type = formObj.find(".submit_type").val();
		
		var actionUrl = ((submit_type == 'qdf-listing') ? "" : 'http://forms.'+ appName + '.com');
		var formUrl = "/regpath/elrn/track.aspx";
		var formUrl_spec = formObj.find('.form_url').val();
				
		var level = formObj.find(".qdf-" + Drupal.settings.degree_questions.level_text + "-select").val();		
		var category = formObj.find(".qdf-" + Drupal.settings.degree_questions.category_text + "-select").val();
		//subject_id is not using
		var subject_real_value = get_subject_mapping(formObj.find(".qdf-Subject-select").val());
		var subject = formObj.find(".qdf-" + Drupal.settings.degree_questions.subject_text + "-select option:selected").text();				
		
		//Add Tracking
		var trackingString = "";
		var url = "";
		
		formObj.find(".tracking-param").each(function () {
			if (trackingString.length > 1) trackingString += '&';
			else trackingString = '?';
			trackingString += (this.name + "=" + this.value);
		});

		//Go to form
		if(submit_type == "qdf-form"){
			if(formUrl_spec == ""){
				url = actionUrl + formUrl + trackingString + "&edulvl=" + level + "&industry=" + subject;		
			}else{
				url = formUrl_spec + trackingString + "&edulvl=" + level + "&industry=" + subject;
			}
		}else{

			//Send to Programs Section
			if (level == '5') {
				// var replaced_subject = subject_real_value.toLowerCase().replace(/ /g, "-");
				// replaced_subject = replaced_subject.replace(/&/g, "and");
				// replaced_subject = replaced_subject.replace(/,/g, "");
				url = actionUrl + "/" + subject_real_value;//"/programs/" + replaced_subject + ".htm" + trackingString;											
			}

			//Send to Online Degrees Section
			else {

				switch (level) {
					case "1":
						level = "associate";
						break;
					case "2":
						level = "bachelor";
						break;
					case "3":
						level = "master";
						break;
					case "4":
						level = "doctorate";
						break;
					
				}
				// subject_real_value includes alias url
				url = actionUrl + "/" + subject_real_value;
			}
		}
		return url;
}

function get_val_1(ask_val, ask_r_val){
	return ask_val;
}
function get_val_2(ask_val, ask_r_val){
	return ask_val;
}
function get_val_3(ask_val, ask_r_val){
	return ask_val;
}

// the value show in dropdown option value mapping to the value pass to IS web service
// level mapping "1"--"1"
function first_dropdown_map(ask_val, ask_r_val){
	first_dropdown_mapping[ask_val] = ask_r_val;
}

function second_dropdown_map(ask_val, ask_r_val){
	second_dropdown_mapping[ask_val] = ask_r_val;
}

function third_dropdown_map(ask_val, ask_r_val, alias_url){
	third_dropdown_mapping[ask_val] = alias_url;
}

// get the subject mapping array, it's third dropdown in elearners
function get_subject_mapping(mapping_key){
	return third_dropdown_mapping[mapping_key];
};

var level, category, subject, subject_id;
var ServiceCall = 1;
var field_1_name, field_2_name, field_3_name;
(function ($) {

	var subject_mapping = new Array();
	
	$(document).ready(function(){		
		
		//inactive select with inactive class name
		$('.qdf-holder select.inactive').attr("disabled","disabled");
		$('.qdf-holder select.hide').parent().hide();
		
		var cidGuid = $(".cid").val();
		var qsbType = $(".qsb_type");
		//var level_mapping = new Array();
		//var first_dropdown_mapping = new Array();
		//var second_dropdown_mapping = new Array();
		

		
		// Load QSB Questions Data
		// search each QSB's QSB type	
		// maybe more than 1 QSB on the page	
		for(var n = 0; n < qsbType.length; n++){
			if(qsbType.length > 1){
				qType = $(qsbType[n]).val();
			}else{
				qType = $(qsbType).val();
			}
			// Degree QSB
			// call web service to load Level, Category, and Subject when degreeStatic.degree_text = "Degree", which is set in qsb module file
			// Degree QSB will only call web service once in the current page, even if there are more than 1 Degree QSB.
			if((qType == Drupal.settings.degree_questions.degree_text) && (ServiceCall == 1)){

				
				
				if($('form.qdf-block-form .qq-0.' + first_dropdown_name).length > 0){
					field_1_name = first_dropdown_name;
					field_2_name = second_dropdown_name;
					field_3_name = third_dropdown_name;
				}
				
				var webservice = "/service/loadqsb/";
				$.get(webservice, function (data) {	
					var jsonObj = data.ask_items;
					
					if(jsonObj.length >0){
						for(var i = 0; i < jsonObj.length; i++){ 
						
							var ask_display = jsonObj[i]['showtitle'];
							var ask_val = jsonObj[i]['showvalue'];	
							var ask_r_val = jsonObj[i]['realvalue'];	
							
							first_dropdown_map(ask_val, ask_r_val);
							$('ul.qq-detail li.' + first_dropdown_name + ' select').append('<option value="' + get_val_1(ask_val,ask_r_val) + '">' + ask_display + '</option>');			
						}
					}
					
				});
				ServiceCall = 0;
			}else{
			// Campus QSB, Career QSB 

			}			
			
			
		}
		

		//select degree level event
		$(".qdf-holder .qdf-" + field_1_name + "-select").live("change", function () {
		
			var currentDegreeSelect = $(this);			
			qsb_question_unselect($(this));

			//AJAX Call to Replace
			webservice = "/service/loadqsb/" + first_dropdown_mapping[$(currentDegreeSelect).val()] + "/";
						
			$.get(webservice, function (data) {
				var jsonObj = data.ask_items;
				// remove all options from category dropdown
				$(currentDegreeSelect).parents(".qq-detail").find(".qdf-" + field_2_name + "-select option[value!=-1]").remove();
				
				// add new options into category dropdown
				if(jsonObj.length >0){
					for(var i = 0; i < jsonObj.length; i++){ 
						var ask_display = jsonObj[i]['showtitle'];
						var ask_val = jsonObj[i]['showvalue'];
						var ask_r_val = jsonObj[i]['realvalue'];	
						second_dropdown_map(ask_val, ask_r_val);
						//second_dropdown_mapping[ask_val] = ask_r_val;	
						
						$(currentDegreeSelect).parents(".qq-detail").find(".qdf-" + field_2_name + "-select").append('<option value="' + get_val_2(ask_val,ask_r_val) + '">' + ask_display + '</option>');			
						var display_select = true;
						if(($(currentDegreeSelect).parents(".qq-detail").find(".qdf-" + field_2_name + "-select option").length >=2) &&  display_select) {
							
							qsb_question_select(currentDegreeSelect);
							display_select = false;
						}	
						
					}
				}
				

			});


		});

		// select category event
		$(".qdf-holder .qdf-" + field_2_name + "-select").live("change", function () {
			var currentDegreeSelect = $(this).parents(".qq-detail").find(".qdf-" + field_1_name + "-select");
			var currentCatSelect = $(this);
			
			var submit_type = $(this).parent().parent().parent().attr("target-type");			
			
			qsb_question_unselect($(this));	

			webservice = "/service/loadqsb/" + first_dropdown_mapping[$(currentDegreeSelect).val()] + "/" + second_dropdown_mapping[$(currentCatSelect).val()] + "/";
			//AJAX Call to Replace
			$.get(webservice, function (data) {
			
				var jsonObj = data.ask_items;
				// remove all options from subject dropdown
				$(currentCatSelect).parents(".qq-detail").find(".qdf-" + field_3_name + "-select option[value!=-1]").remove();
				
				if(jsonObj.length >0){
					// add new options into subject dropdown
					for(var i = 0; i < jsonObj.length; i++){ 
						var ask_display = jsonObj[i]['showtitle'];
						//var ask_r_display = jsonObj[i]['real_title'];
						var ask_val = jsonObj[i]['showvalue'];	
						var ask_r_val = jsonObj[i]['realvalue'];	
						var alias_url = jsonObj[i]['subject_url'];
						
						//subject_mapping[s_val] = alias_url;	
						third_dropdown_map(ask_val, ask_r_val, alias_url);
						
						
						//if(alias_url != ""){
							$(currentCatSelect).parents(".qq-detail").find(".qdf-" + field_3_name + "-select").append('<option value="' + get_val_3(ask_val,ask_r_val) + '">' + ask_display + '</option>');			
						//}
						
						//else{
							// $(currentCatSelect).parents(".qq-detail").find(".qdf-" + field_3_name + "-select").append('<option value="' + s_r_display + '">' + s_display + '</option>');			
						// }
						var display_select = true;
						if(($(currentCatSelect).parents(".qq-detail").find(".qdf-" + field_3_name + "-select option").length >=2) &&  display_select) {
							
							qsb_question_select(currentCatSelect);
							display_select = false;
						}	
					}	
				}

			});
				

		});		
	

		// Degree Finder Submit
		$(".qdf-holder. form.qdf-block-form").live("submit", function () {

				var submit_type = $(this).find(".submit_type").val();
				var qType = $(this).find(".qsb_type").val();
				
				// degreeStatic.degree_text = "Degree", which is set in qsb module file
				// only check form validation when it's a Degree finder

				if(qType == Drupal.settings.degree_questions.degree_text){
				
					if(form_validate($(this), submit_type)){
						var url = generateURL($(this));
						if(url == ""){
							return false;
						}else{						
							window.location = url;
							return false;
						}
					}else{				
						 return false;
					}
				}else{
				// Other situation, such as Campus Search, Career Search
				}
		});
		
	});
	// end of document.ready
		
		
		
	function form_validate(formObj, submit_type){		
		//will check validation if this is a Degree qsb and submit to school form page
		if(Drupal.settings.degree_questions.appName == "elearners"){
			var questions = formObj.find(".qdf-block-form-item");

			for(var i =0; i < questions.length; i++){
				if($(questions[i]).val() == "-1"){

					switch($(questions[i]).attr("name")){
					case 'qdf-' + field_1_name + '-select':
						alert("Please choose a Degree Level.");
						break;
					case 'qdf-' + field_2_name + '-select':
						alert("Please choose an Area of Study.");
						break;
					case 'qdf-' + field_3_name + '-select':
						alert("Please choose a Concentration.");
						break;
					}
					return false;
				}
			}
		}
		
		return true;
	}
	
	
	// call this function when user select any value from dropdown list except -1
	function qsb_question_select(eventObj){
		var qq_obj = eventObj.parent();
		if((qq_obj.next() != null) && qq_obj.next().hasClass('qsb-question')){
			//qq_obj.next().find('select').
			if($(qq_obj).next().find('select').hasClass('hide')){
				//$(currentDegreeSelect).parents(".qq-detail").find(".qdf-" + field_2_name + "-select").slideDown(300).parent().slideDown(300);
				$(qq_obj).next().find('select').attr("disabled", "").show().parent().show();
			}
			if($(qq_obj).next().find('select').hasClass('inactive')){
				$(qq_obj).next().find('select').attr("disabled", "").removeClass('inactive').addClass("active");
			}
		}
	}
	
	
	// call this function when user select 'please select XXXXX' which value is -1 from dropdown list
	function qsb_question_unselect(eventObj){
		var qq_obj = eventObj.parent();
		while((qq_obj.next() != null) && qq_obj.next().hasClass('qsb-question')){
			qq_obj.next().find('select option[value=-1]').attr("selected","selected");
			if($(qq_obj).next().find('select').hasClass('hide')){
				$(qq_obj).next().hide();
			}
			if($(qq_obj).next().find('select').hasClass('active')){
				$(qq_obj).next().find('select').removeClass('active').addClass('inactive').attr("disabled","disabled");
			}
			qq_obj = qq_obj.next();
		}
		
	}
	
})(jQuery);;

/**
 * JavaScript behaviors for the front-end display of webforms.
 */

(function ($) {

Drupal.behaviors.webform = Drupal.behaviors.webform || {};

Drupal.behaviors.webform.attach = function(context) {
  // Calendar datepicker behavior.
  Drupal.webform.datepicker(context);
};

Drupal.webform = Drupal.webform || {};

Drupal.webform.datepicker = function(context) {
  $('div.webform-datepicker').each(function() {
    var $webformDatepicker = $(this);
    var $calendar = $webformDatepicker.find('input.webform-calendar');
    var startDate = $calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
    var endDate = $calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
    var firstDay = $calendar[0].className.replace(/.*webform-calendar-day-(\d).*/, '$1');
    // Convert date strings into actual Date objects.
    startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
    endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

    // Ensure that start comes before end for datepicker.
    if (startDate > endDate) {
      var laterDate = startDate;
      startDate = endDate;
      endDate = laterDate;
    }

    var startYear = startDate.getFullYear();
    var endYear = endDate.getFullYear();

    // Set up the jQuery datepicker element.
    $calendar.datepicker({
      dateFormat: 'yy-mm-dd',
      yearRange: startYear + ':' + endYear,
      firstDay: parseInt(firstDay),
      minDate: startDate,
      maxDate: endDate,
      onSelect: function(dateText, inst) {
        var date = dateText.split('-');
        $webformDatepicker.find('select.year, input.year').val(+date[0]);
        $webformDatepicker.find('select.month').val(+date[1]);
        $webformDatepicker.find('select.day').val(+date[2]);
      },
      beforeShow: function(input, inst) {
        // Get the select list values.
        var year = $webformDatepicker.find('select.year, input.year').val();
        var month = $webformDatepicker.find('select.month').val();
        var day = $webformDatepicker.find('select.day').val();

        // If empty, default to the current year/month/day in the popup.
        var today = new Date();
        year = year ? year : today.getFullYear();
        month = month ? month : today.getMonth() + 1;
        day = day ? day : today.getDate();

        // Make sure that the default year fits in the available options.
        year = (year < startYear || year > endYear) ? startYear : year;

        // jQuery UI Datepicker will read the input field and base its date off
        // of that, even though in our case the input field is a button.
        $(input).val(year + '-' + month + '-' + day);
      }
    });

    // Prevent the calendar button from submitting the form.
    $calendar.click(function(event) {
      $(this).focus();
      event.preventDefault();
    });
  });
}

})(jQuery);
;
(function ($) {

$(document).ready(function() {

  // Accepts a string; returns the string with regex metacharacters escaped. The returned string
  // can safely be used at any point within a regex to match the provided literal string. Escaped
  // characters are [ ] { } ( ) * + ? - . , \ ^ $ # and whitespace. The character | is excluded
  // in this function as it's used to separate the domains names.
  RegExp.escapeDomains = function(text) {
    return (text) ? text.replace(/[-[\]{}()*+?.,\\^$#\s]/g, "\\$&") : '';
  }

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for absolute internal links.
      var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");
      // Expression to check for the sites cross domains.
      var isCrossDomain = new RegExp("^(https?|ftp|news|nntp|telnet|irc|ssh|sftp|webcal):\/\/.*(" + RegExp.escapeDomains(ga.trackCrossDomains) + ")", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for download tracking?
        if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^=mailto:],area[href^=mailto:]")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutbound && this.href) {
          if (ga.trackDomainMode == 2 && isCrossDomain.test(this.href)) {
            // Top-level cross domain clicked. document.location is handled by _link internally.
            _gaq.push(["_link", this.href]);
          }
          else if (ga.trackOutboundAsPageview) {
            // Track all external links as page views after URL cleanup.
            // Currently required, if click should be tracked as goal.
            _gaq.push(["_trackPageview", '/outbound/' + this.href.replace(/^(https?|ftp|news|nntp|telnet|irc|ssh|sftp|webcal):\/\//i, '').split('/').join('--')]);
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
          }
        }
      }
    });
  });
});

})(jQuery);
;
