var imagepath_prefix = "/static";
//var serverURL="http://216.227.79.66";
var serverURL="http://" + location.host;
//var googleServiceTarget="http://209.105.163.13/search?q=$$$&btnG=Search&sort=date%3AD%3AL%3Ad1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=Sample_frontend&proxystylesheet=Sample_frontend&site=fairpoint";
//var googleServiceTarget2="http://209.105.163.13/search?q=$$$&btnG=Search&sort=date%3AD%3AL%3Ad1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=default_frontend&proxystylesheet=telco_frontend&site=@@@";
var googleServiceTarget="http://209.105.163.13/search?q=$$$&btnG=Search&sort=date%3AD%3AL%3Ad1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=NNE_CMS&proxystylesheet=NNE_CMS&site=fairpoint";
var googleServiceTargetTelco="http://209.105.163.13/search?q=$$$&btnG=Search&sort=date%3AD%3AL%3Ad1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=TG_CMS&proxystylesheet=TG_CMS&site=fairpoint";

var googleServiceTarget2="http://172.24.69.18/search?q=$$$&btnG=Search&sort=date%3AD%3AL%3Ad1&output=xml_no_dtd&oe=UTF-8&ie=UTF-8&client=default_frontend&proxystylesheet=telco_frontend&site=@@@";

function sendUserAway(index, link) {
	if (index == 12) {
		setCookie('prohibited_from_nne', 'true', 365);
	}

	if (link != null) {
		if (link.indexOf('manageAccountURL') != -1) {
			isManageAccountURL = true;
		} else {
			isManageAccountURL = false;
		}
	}

	if (index && indexedLocation[index] != null) {
		if (index == 12) {
			setCookie('fp_city','', 0);
			setCookie('fp_zip','', 0);
			setCookie('fp_state','', 0);
			setCookie('fp_telco','', 0);

			if (isManageAccountURL) {
				window.location = manageAccIndexedLocation[index];
			} else {
				window.location=indexedLocation[index];
			}
		} else {
			if (isManageAccountURL) {
				window.location=manageAccIndexedLocation[index];
			} else {
				if(link == "") {
					window.location = modifyLink(window.location);
				} else {
					var modifiedLink = modifyLink(link);
					window.location = modifiedLink;
				}
			}
		}
	} else {
		if($('#errorBleed').data('bleed')) {
			var isGateway 	= $('#segments-gw').length? true : false,
				fp_aud 		= getCookie('fp_audience'),
				redURL		= isGateway? '/'+getCookie('fp_audience') : window.location.href,
				redInfo		= $('#errorBleed').data('bleed'),
				zip			= getCookie('fp_zip');
			setCookie('newloc', redInfo.newLoc);
			setCookie('fp_state', redInfo.state);
			setCookie("fp_telco", indexedLocation[redInfo.newLoc]+ '-' + redInfo.state);
			setCookie('fp_city', redInfo.city);
			setCookie('fp_phone', '', 0);
			setCookie('fp_audience', fp_aud);
			setCookie('fp_zip', redInfo.zip);
			window.location = redURL;
		} else {
			$('#errorBleed').hide();
			$('#errorZip').show();
		}
	}
	/*
    if (link != null) {
		if (link.indexOf('manageAccountURL') != -1)	{
			isManageAccountURL = true;
		} else {
			isManageAccountURL = false;
		}
    }

    if (index && indexedLocation[index] != null) {
			if(isManageAccountURL) {
				window.location = manageAccIndexedLocation[index];
			} else {
				if(link == "") {
					window.location = modifyLink(window.location);
				} else {
					var modifiedLink = modifyLink(link);
					window.location = modifiedLink;
				}
			}
	} else {
		$('#errorZip').show();
	}
	*/
}


// Search Functionality

function googleMiniSearch(keywordInput,isopennew) {
	var keyword = document.getElementById(keywordInput).value;
	var googleServiceTarget1;
    keyword = processKeyword(keyword);
	var telcoCookie = getCookie('fp_telco');
	
	if(telcoCookie && telcoCookie.indexOf("NNE") == -1) {
		googleServiceTarget1 = googleServiceTargetTelco.replace('$$$', keyword);
	} else {
 		googleServiceTarget1 = googleServiceTarget.replace('$$$', keyword);
	}
   
    if (isopennew)
        window.open(googleServiceTarget1);
    else
        window.location.href = googleServiceTarget1;
}

function googleMiniSearch2(keywordInput,isopennew,site) {
 // this func is just for telco sites
	var keyword = document.getElementById(keywordInput).value;
	s2 = new String(site);   
	s3 = new String(s2.substring(1,8));
//   alert(site);
//   alert(s3);
    googleServiceTarget21 = googleServiceTarget2.replace('$$$', keyword);
    googleServiceTarget21 = googleServiceTarget21.replace('@@@', s3);
    if (isopennew)
        window.open(googleServiceTarget21);
    else
        window.location.href = googleServiceTarget21;
}

function getCookie(c_name){
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape($.trim(value)) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path=/";
} 
// search Fuctionality ends


function send_user(link) {
	var $phone 		= $('#phone'),
		$zip		= $('#zip_code'),
		phoneNum	= $phone.val().replace(/-|\(|\)/, ''),
		zipVal		= ($zip.val() != '' && $zip.val() != $zip.data('defaultText'))? $zip.val(): '',
		area_code 	= phoneNum.substr(0, 3),
		exchange 	= phoneNum.substr(3, 3),
		zipcode 	= zipVal || getCookie('fp_zip'), /* modified this - since contact us form also uses the same id */
		go2page = "";
	
	if(!getCookie('fp_audience'))	setCookie('fp_audience', 'residential', 365);
	
	var bu_aud = $.trim(getCookie('activeBU') || getCookie('fp_audience')),
		aud	   = $.trim(getCookie('fp_audience') || getCookie('activeBU').toLowerCase().replace(/\s/,'_')),
		newloc = parseInt($.trim(getCookie('newloc')));
		
		if(bu_aud.match(/small_business|Small\sBusiness|business/i)) {
			if(newloc == 1) {
				link = link.replace(/\/business\//, '/small_business/');
				setCookie('activeBU', 'Small Business', 365);
			} else {
				link = link.replace(/small_business/, 'business');
				setCookie('activeBU', 'Business', 365);
			}
		}
		if(aud.match(/enterprise|industry_solutions/i)) {
			if(newloc != 1) {
				//link = '/residential';
				setCookie('fp_audience', 'residential', 365);
			}
		} else if(aud.match(/small_business|Small\sBusiness|business/i)) {
			if(newloc == 1) {
				setCookie('fp_audience', 'small_business', 365);
			} else {
				setCookie('fp_audience', 'business', 365);
			}
		}
	
	if ($('#page').length > 0) {
		go2page = $('#page')[0].val();
	} else {
		go2page = "root";
	}
	
	if (phoneNum == '') {
		$phone[0].focus();
	}
	
    if ((zipcode == '') && ((area_code != '' && exchange == '') || (area_code == '' && exchange != ''))) {
        $phone[0].focus();
		$('#loc-veri-error').empty().append('<li class="error">Please enter both the area code, and the exchange</li>');
    } else if (area_code != '' && exchange != '') {
		$('#loc-veri-error').empty();
        /*var state = getCookie('fp_state');
        index = findWithNumber(area_code, exchange);
		setCookie('fp_phone', area_code+'-'+exchange, 365);
		if (state != '' && index && indexedLocation[index] != null ) {
            setCookie("fp_telco",indexedLocation[index]+ '-' + state,365);
	    }*/
		//sendUserAway(index, link);
		window.location = link;
    } else if(zipcode != '') {
		$('#loc-veri-error').empty();
		//sendUserAway(index, link);
		window.location = link;
	}
	
	/*if(calleeButton=="zip") {
		if (zipcode != '') {
			$('#errorZip').hide();
			$('#errorPhone').hide();
			var state = getCookie('fp_state'),
				cookieZip = findWithZip(zipcode),
				index = ((typeof(cookieZip) == 'object') && cookieZip.bleedZip)? cookieZip.bleedZip : cookieZip;
			if (state != '' && index && indexedLocation[index] != null) {
				setCookie("fp_zip",zipcode,365);
				setCookie("fp_telco",indexedLocation[index] + '-' + state,365);
			}
			sendUserAway(index, link);
		}
	}*/
}
