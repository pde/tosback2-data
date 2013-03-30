
var totalResultsLength;
var nextIndex = 0;
var currentIndex = 0;
var offset = 5;
var defOffSet = 5;
var cStart;
var pht=0;
var restrict_domain = "walgreens.medhelp.ws"; // If planning to restrict all 3rd party sites, make this var as array
var domaincheck=document.location.href; 
var disableSessionTimeout=false;

function initializePrescriptionRefil(){
    var pn_default = $('#prescription-number').val();
    $('#prescription-number').focus(function(){
		if ($(this).val() == pn_default) {
			$(this).val('');
		}
    });
}
function getMyUri(oOb) {
	return oOb.protocol
			+ ((oOb.protocol.indexOf(':') + 1) ? '' : ':')
			+ oOb.hostname
			+ ((typeof (oOb.pathname) == typeof (' ') && oOb.pathname
					.indexOf('/') != 0) ? '/' : '') + oOb.pathname + oOb.search;
}
function selfLink(oRootElement, oClass) {
	if (!document.getElementsByTagName || !document.childNodes) {
		return;
	} else {
		oRootElement = document.getElementById(oRootElement);
		for ( var x = 0, y = oRootElement.getElementsByTagName('a'); y[x]; x++) {
			if (y[x].getAttribute('href') && !y[x].href.match(/#$/)
					&& getMyUri(y[x]) == getMyUri(location)) {
				y[x].className = (y[x].className ? (y[x].className + ' ') : '')
						+ oClass;
			}
		}
	}
}
function initializeEmailSignup(){
    var email_default = $('#email').val();
    $('#email').focus(function(){
          if ($(this).val() == email_default){
			$(this).val('');
		  }
        }).blur(function(){
          if ($(this).val() == '') {
			$(this).val(email_default);
        }
    });
}

function initializeBodyEmailSignup(){
    var email_default = $('#offersemail').val();
    $('#offersemail').focus(function(){
            if ($(this).val() == email_default) {
                $(this).val('');
        	}
        }).blur(function(){
            if ($(this).val() == '') {
                $(this).val(email_default);
        }
    });
}

function initializePhoneField(){
    if ($('#txtPhoneNumber').length) {
        var phone_default = $('#txtPhoneNumber').val();
        $('#txtPhoneNumber').focus(function(){
                if ($(this).val() == phone_default) {
                    $(this).val('');
            	}
            }).blur(function(){
                if ($(this).val() == '') {
                    $(this).val(phone_default);
            }
        });
    }
    
    if ($('#phone').length) {
        var phone_default = $('#phone').val();
        $('#phone').focus(function(){
                if ($(this).val() == phone_default) {
                    $(this).val('');
            	}
            }).blur(function(){
                if ($(this).val() == '') {
                    $(this).val(phone_default);
            }
        });
    }
    
    if ($('#fax').length) {
        var phone_default = $('#fax').val();
        $('#fax').focus(function(){
                if ($(this).val() == phone_default) {
                    $(this).val('');
            	}
            }).blur(function(){
                if ($(this).val() == '') {
                    $(this).val(phone_default);
            }
        });
    }
}

function initializeBirthDate(){
    var birthdate_default = $('#txtBirthDate').val();
    $('#txtBirthDate').focus(function(){
            if ($(this).val() == birthdate_default) {
                $(this).val('');
        	}
        }).blur(function(){
            if ($(this).val() == '') {
                $(this).val(birthdate_default);
        }
    });
}

function initializePromoCode(){
    var promocode_default = $('#txtPromoCode').val();
    $('#txtPromoCode').focus(function(){
            if ($(this).val() == promocode_default) {
                $(this).val('');
        	}
        }).blur(function(){
            if ($(this).val() == '') {
                $(this).val(promocode_default);
        }
    });
}

function initializeZIP(){
    var zipCode = $('#zipCode').val();
    $('#zipCode').focus(function(){
            if ($(this).val() == zipCode) {
                $(this).val('');
            }
        }).blur(function(){
            if ($(this).val() == '') {
                $(this).val(zipCode);
        }
    });
}
$(document).ready(function(){
	if($.browser.msie){$('.pharmacy_ab, .photo_ab').corner('top')};	
    //Eternal Links
	if($('#query').length) {
		var prestxt = 'Enter Prescription, Prescriber Name or RX #';
		var winloc = window.location+'';
		var showtext = '';
		if(winloc.indexOf('webpickup')!=-1) showtext = "Search your local store"; 
		else showtext = "Enter keyword or item #";
		if($('#query').val()=='') {
			$('#query').val(showtext);
			$('#query').attr('style','color:#898989');
			pht=1;
		}
		if($('#prescription_search').val()=='') {
			$('#prescription_search').val(prestxt);
			$('#prescription_search').attr('style','color:#898989');
			pht=1;
		}
		if($('#query2').val()=='') {
			$('#query2').val(showtext);
			$('#query2').attr('style','color:#898989');
			pht=1;
		}
		if($("#search_block").length){			
			$("#search_block").hide();
			mobileSiteSearch = 'true';
		}
		else {
			mobileSiteSearch = 'false';		
		}
		$('#query').focus(function(){			
			if(mobileSiteSearch == 'true'){			
				if($('#query').val()==showtext) {
					$('#query').val('');
					$("#query").animate( {
						"width" :"196px"
					}, 500);
					$("#search_block").show("slide", {
						direction :"right"
					}, 150);
					return false;
				}
			}
			else {
				if($('#query').val()==showtext) {
					$('#query').val('');
					$('#query').attr('style','color:#464646');
					pht=0;
				}
			}
		});
		$('#query').keydown(function(){
			var typedVal = $('#query').val();
			if(/Search Site/i.test(typedVal)){
				if(pht==1){
					pht=0;
					$('#query').val(typedVal.replace(showtext,''));
					$('#query').attr('style','color:#464646');
				}
			} else if(/Search your local store/i.test(typedVal)){
				if(pht==1){
					pht=0;
					$('#query').val(typedVal.replace(showtext,''));
					$('#query').attr('style','color:#464646');
				}
			}
		});
		$('#query').blur(function(){
			if(mobileSiteSearch == 'true'){
				if ($("#query").val() == '') {
					$("#query").animate( {
						"width" :"106px"
					}, 500);
					$("#search_block").hide("slide", {
						direction :"right"
					}, 150);
					$('#query').val(showtext);
					return false;
				}
			} else {
				if($('#query').val()=='') {
					$('#query').val(showtext);
					$('#query').attr('style','color:#898989');
					pht=1;
				}
			}
		});
		
		$('#query2').focus(function(){			

				if($('#query2').val()==showtext) {
					$('#query2').val('');
					$('#query2').attr('style','color:#464646');
					pht=0;
				}
		});
		
		$('#query2').blur(function(){
			
				if($('#query2').val()=='') {
					$('#query2').val(showtext);
					$('#query2').attr('style','color:#898989');
					pht=1;
			
			}
		});
		$('#prescription_search').focus(function(){			

			if($('#prescription_search').val()==prestxt) {
				$('#prescription_search').val('');
				$('#prescription_search').attr('style','color:#464646');
				pht=0;
			}
	});
	
	$('#prescription_search').blur(function(){
		
			if($('#prescription_search').val()=='') {
				$('#prescription_search').val(prestxt);
				$('#prescription_search').attr('style','color:#898989');
				pht=1;
		
		}
	});
		
		
	}
	$('.extSite').click(function(){
        extLink = this.attr("href");
        extTitle = extLink.replace("http:\/\/", "");
        extTitle = extTitle.replace(/\/.*$/, "");
        extName = this.attr("name");
        question = confirm('You are now leaving Walgreens.com\n\nPlease be advised that you are leaving the Walgreens.com web site to enter a web site operated by ' + extName + '. If you choose to provide any information or use the tools, information and/or content hosted on this new site, it will be handled in accordance with the ' + extName + ' privacy policy. It is in your best interest to review the ' + extName + ' privacy policy at ' + extTitle + '.')
        if (question != "0") {
            window.location.href = extLink;
        }
        return false;
    });   
    //Toggle Visible
    $('.showHide, .showhide').click(function(){
        contentBox = $(this).attr("rel")
        $(contentBox).toggleClass('hide').toggleClass('show');
        return false;
    });

	
	// End new logic - 11-22-2010 - mxd1
    if ($('#findStore').length) {
    	if ($('#commentErro').length) {
            $('#commentErro').innerHTML = '';
            $('#commentErro').css('visibility', 'hidden');
        }
        $('#findStore').click(function(event){
        	
        	event.stopPropagation();
            var searchOption = new Array();
            if ($('#open-24-hours:checked').val()) {
                searchOption.push($('#open-24-hours').val());
            }
            if ($('#drive-thru:checked').val()) {
                searchOption.push($('#drive-thru').val());
            }
            if (searchOption.length == 0) {
            	var dataStr = {
                    'searchCriteria': $('#combCriteria').val(),
                    //'storeOverlay': $('#storeOverlay').val(),
                    'requestType': $('#requestType').val()
                    //,
                    //'source': $('#source').val(),
                    //'successView': $('#successview').val(),
                    //'errorView': $('#errorview').val(),
                    //'multipleView': $('#multipleview').val(),
                    //'address': ''
                };
            } else {
            	var dataStr = {
                    'searchOptions': searchOption,
                    'searchCriteria': $('#combCriteria').val(),
                    //'storeOverlay': $('#storeOverlay').val(),
                    'requestType': $('#requestType').val()
                    //,'source': $('#source').val(),
                    //'successView': $('#successview').val(),
                    //'errorView': $('#errorview').val(),
                    //'multipleView': $('#multipleview').val(),
                    //'address': ''
                };
            }
            callAjax(dataStr);
        });
    }
        
        if ($('#prescription-number').length) {
            initializePrescriptionRefil();
        }
        
       /* if ($('#username').length) {
            initializeLogin();
        }*/
        
        if ($('#email').length) {
            initializeEmailSignup();
        }
        
        if ($('#txtPhoneNumber').length) {
            initializePhoneField();
        }
        
        if ($('#txtBirthDate').length) {
            initializeBirthDate();
        }
        
        if ($('#txtPromoCode').length) {
            initializePromoCode();
        }
        
        if ($('#zipCode').length) {
            initializeZIP();
        }
        // added for the Homepage Body email Sign up
        if ($('#offersemail').length) {
            initializeBodyEmailSignup();
        }
});
function get_search_string(url, targetvar){

    var param = (url.slice(1))
    var pairs = param.split("&")
    
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=')
        if (pos == -1) 
            continue
        var argname = pairs[i].substring(0, pos)
        var value = pairs[i].substring(pos + 1)
        if (argname == targetvar) {
            var searchstring = value
            {
                break
            }
        }
    }
    
    return searchstring
}

function callAjax(dataString) {
    $.ajax({
        type: 'POST',
        url: '/storelocator/storeLocatorAjax.jsp',
        dataType: 'json',
        traditional: true,
        data: dataString,
        success: function(response){
            var Data;
            var doc = parent.document;                       
            //response = eval("(" + response + ")");
            var errFound = 'false';
            var errString = '';
            
            switch (response.storeDetails[0].searchStatus) {
                case 'session':
                    errString = '<strong>Session Expired:</strong> Your session has expired due to a time lapse. Please search again.';
                    errFound = 'true';
                    break;
                case 'general':
                    errString = '<strong>No Results:</strong> This information produced no results. Please modify your search and try again.';
                    errFound = 'true';
                    break;
                case 'noStoreFound':
                    errString = '<strong>No Results:</strong> This information produced no results. Please modify your search and try again.';
                    errFound = 'true';
                    break;
                case 'address':
                    errString = '<strong>Address Match:</strong> This address shows no results. Please modify your search and try again.';
                    errFound = 'true';
                    break;
                case 'all':
                    errString = '<strong>No Results:</strong> This information produced no results. Please modify your search and try again.';
                    errFound = 'true';
                    break;
                case 'zip':
                    errString = '<strong>ZIP Code Match:</strong> This ZIP code shows no results. Please modify your search and try again.';
                    errFound = 'true';
                    break;
                case 'wagError':
                    errString = '<strong>Temporarily Unavailable:</strong> The Store Locator Utility is temporarily unavailable. Please try again later.';
                    errFound = 'true';
                    break;
                case 'mqError':
                    errString = '<strong>Temporarily Unavailable:</strong> The Store Locator is temporarily unavailable. Please try again later.';
                    errFound = 'true';
                    break;
                case 'missingCriteria':
                    errString = '<strong>Missing or Invalid Info:</strong> The city, state or ZIP code entered is missing or invalid. Please modify your search and try again.';
                    errFound = 'true';
                    break;
                case 'invalidSearchCriteria':
                    errString = '<strong>Missing or Invalid Info:</strong> The city, state or ZIP code entered is missing or invalid. Please modify your search and try again.';
                    errFound = 'true';
                    break;
            }
            var currentLeft = parent.$("#wOverlay").css('left');
            if (errFound == 'true' || !response.storeDetails[0].results) {
                if (errFound == 'false' && !response.storeDetails[0].results) {
                    errString = 'The city, state or ZIP code entered is invalid';
                }
                var commentErrorDiv = document.getElementById('commentErro');
                commentErrorDiv.innerHTML = errString;
                commentErrorDiv.style.visibility = 'visible';
                commentErrorDiv.style.display = 'block';
                errFound = 'false';
                errString = '';
                Data = '';
                document.getElementById('resultsContainer').innerHTML = Data;
                if(doc.getElementById && doc.getElementById('wOverlay') != null){							
                	parent.$("#wOverlay").css('height', '210px');
				}
                return;
            }
            if (doc.getElementById && doc.getElementById('wOverlay') != null) {                            
            	var cssObj = {
        			'visibility': 'visible',
                    'opacity': '1',
                    'display': 'block',
                    'width': '633px',
                    'height': '770px',
                    'top': '20px',
                    'left': currentLeft
    		    }
            	parent.$("#wOverlay").css(cssObj);
            }
            var clear = $('#findAWalgreensForm');
            var table = $('<div/>', {
                id: 'resultsContainer'
            });
            clear.append(table);
            var table1 = $('<div/>', {
                id: 'paginationLinks'
            }); 
            clear.append(table1);
            Data = '<table id="results-container" cellpadding="0" cellspacing="0" border="0"><colgroup><col width="35" /><col width="250" /><col width="200" /><col width="115" /></colgroup><tr><th>&nbsp;</th><th>Store Location</th><th>Pharmacy Hours</th><th>&nbsp;</th></tr>';
            var result;
            var length = response.storeDetails[0].results.length;
            totalResultsLength = length;
            resultList = response.storeDetails[0].results;
            if (totalResultsLength < defOffSet) {
                offset = totalResultsLength;
            } else {
                offset = defOffSet;
            }
            for (i = 0; i < offset; i++) {
                result = response.storeDetails[0].results[i];

                var x = i + 1;
                var sNumber = result.storeNumber;
                if (result.storeInfoBean) {
                
                    Data = Data +
                    '<tr><td><strong>' +
                    result.resultNumber +
                    '</strong></td><td>Store ' +
                    result.storeNumber +
                    '<br/>' +
                    result.streetAddress +
                    '<br/>' +
                    result.city +
                    ',' +
                    result.state +
                    ' ' +
                    result.zipCode +
                    '<br/>' +
                    '(' +
                    result.storeInfoBean.storeAreaCd +
                    ')' +
                    result.storeInfoBean.storePhoneNum.substring(0, 3) +
                    '-' +
                    result.storeInfoBean.storePhoneNum.substring(3.7) +
                    '<br/>' +
                    result.storeInfoBean.intersection +
                    '<br/></td>'
                    Data = Data +
                    storeHours(result);
                    Data = Data +
                    '<td class="button"><input type="image" src="/images/buttons/choose-this-store.gif" name="pickStore"  onclick="selectstore(' +
                    sNumber +
                    ');" alt="Choose This Store" class="pickStore" value="' +
                    sNumber +
                    '"/></td></tr>';
                } else {
                    Data = Data +
                    '<tr><td><strong>' +
                    result.resultNumber +
                    '</strong></td><td>Store ' +
                    result.storeNumber +
                    '<br/>' +
                    result.streetAddress +
                    '<br/>' +
                    result.city +
                    ',' +
                    result.state +
                    ' ' +
                    result.zipCode +
                    '<br/></td><td>Open 24 Hours</td><td class="button"><input type="image" src="/images/buttons/choose-this-store.gif" name="pickStore"  onclick="selectstore(' +
                    sNumber +
                    ');" alt="Choose This Store" class="pickStore" value="' +
                    sNumber +
                    '"/></td></tr>';
                }
            }
            nextIndex = currentIndex + offset;
            document.getElementById('resultsContainer').innerHTML = Data;
            Data = '';
            Data = '<table cellpadding="0" cellspacing="0" border="0">';
            Data = Data + '<tr>';
            Data = Data + '<td width="98%"></td>';
            if (response.storeDetails[0].prevPageNumber > 0) {
                Data = Data +
                '<td width="1%"><a href="#" class="pagination" title="prev" id="prevLink" onclick="doPagination(\'prev\')">' +
                '<img src="/images/buttons/prev-btn.gif" alt="Previous Page" width="18" height="18" class="vertical-middle"  /></a></td>';
            }
            if (response.storeDetails[0].nextPageNumber > 1) {
                Data = Data +
                '<td width="1%"><a href="#" class="pagination" title="next" id="nextLink" onclick="doPagination(\'next\')">' +
                '<img src="/images/buttons/next-btn.gif" alt="Next Page" width="18" height="18" class="vertical-middle" /></a></td>';
            }
            Data = Data + '</tr></table>';
           	document.getElementById('paginationLinks').innerHTML = Data; // store
           	document.getElementById('content').style.height = '870px';
            //if (response.prevDataURL || response.nextDataURL) {
                //initializePagination();
            //}
            return (false);
        }
    });
}

function doPagination(navAction){
	var dataStr = {'navAction': navAction};
	callAjax(dataStr);
}

function initializePickStore(){

    if ($('#pickStore').length) {
        $('#pickStore').click(function(event){
            $('#pickUpStore').val($(this).val());
        });
    }
}
function selectstore(storeNumber){
    $('#pickUpStore').val(storeNumber);
    document.findAWalgreensForm.submit();
}
/* Quick Look */
function QuickLook(el){
    if (el.quicklook != "enabled") {
        var product = $(el).find("a:first");
        var href = product.attr("href");
        var qs = "";
        if (href && href.indexOf("ID=") > 0) {
            qs = href.substr(href.indexOf("ID="), href.length);
            var temp1 = qs.substr(qs.indexOf("ID=") + 2, href.length);
            var temp2 = qs.substr(qs.indexOf("ID="), 2);
            temp2 = temp2.replace('ID', 'id');
            qs = "?" + temp2 + temp1;
        }
        else {
            qs = (href && href.indexOf("?") > 0 ? href.substr(href.indexOf("?"), href.length) : "");
        }
        if (qs.indexOf('-product') != -1) {
            qs = qs.replace('-product', '');
        }
        qs = qs+"&overlay=true";
        var size;
    	if($(el).width()==130){
    		size = 55;
    	} else if ($(el).width()/ 2 == 0) {
            size = 77.5;
        } else {
            size = $(el).width()/ 2;
        }
        // quick look image asset
        var quickLookImage = $('<img/>', {
            alt: 'Quick Look - Opens a simulated dialog',
            title: 'Quick Look - Opens a simulated dialog',
            'class': 'quick-image mouseover_on',
            src: '/images/buttons/quick-look.png',
            width: 107,
            height: 26,
            css: {
                height: '26px',
                left: (size - 55),
                display: 'none',
                position: 'absolute',
                top: (size-10),
                width: '107px'
            }
        })
        var pageURL = '/store/browse/overlays/quick_view_details.jsp';
        if(document.location.href.indexOf('/iso')!=-1) pageURL = '/iso/product/quick_look_iso.jsp';
        var quickLook = $('<a/>', {
            href: pageURL + qs,
            'class': 'quick-look-trigger mb vpdmb',
            alt: 'Quick Look - Opens a simulated dialog',
            title: 'Quick Look - Opens a simulated dialog',
            rel: 'width:597::height:680'
        }).append(quickLookImage)
		.appendTo(el)
		$(quickLook).focusin(function(e){ 
        	$('.quick-image', quickLook).css('display', 'block')
        });
        $(quickLook).focusout(function(e){ 
        	$('.quick-image', quickLook).css('display', 'none')
        });
        $(quickLook).appendTo(el);
        $(el).mouseover(function(e){ 
				$('.quick-image', el).css('display', '')
			 });
        $(el).mouseout(function(e){
				$('.quick-image', el).css('display', 'none')
	    });
        $(this).quicklook = "enabled";
    }
}
$(document).ready(function(){
    $(".quick-look").each(function(i,el){
        QuickLook(el)
    });
});

function storeHours(result){
    var Data = '';
    if (result.storePharmacyHoursBean) {
    
        var openPhMon = result.storePharmacyHoursBean.monOpen;
        var closePhMon = result.storePharmacyHoursBean.monClose;
        var openPhTue = result.storePharmacyHoursBean.tueOpen;
        var closePhTue = result.storePharmacyHoursBean.tueClose;
        var openPhWed = result.storePharmacyHoursBean.wedOpen;
        var closePhWed = result.storePharmacyHoursBean.wedClose;
        var openPhThu = result.storePharmacyHoursBean.thuOpen;
        var closePhThu = result.storePharmacyHoursBean.thuClose;
        var openPhFri = result.storePharmacyHoursBean.friOpen;
        var closePhFri = result.storePharmacyHoursBean.friClose;
        var openPhSat = result.storePharmacyHoursBean.satOpen;
        var closePhSat = result.storePharmacyHoursBean.satClose;
        var openPhSun = result.storePharmacyHoursBean.sunOpen;
        var closePhSun = result.storePharmacyHoursBean.sunClose;
        var finalPhMon = '';
        var finalPhTue = '';
        var finalPhWed = '';
        var finalPhThu = '';
        var finalPhFri = '';
        var finalPhSat = '';
        var finalPhSun = '';
        if (result.storeInfoBean.rx24hr == "Y") {
            finalPhMon == 'Open 24 Hours';
        }
        else {
            if (openPhMon == 'CLOSED') {
                finalPhMon = 'CLOSED';
            }
            else {
                finalPhMon = openPhMon + ' - ' + closePhMon;
            }
            
            if (openPhTue == 'CLOSED') {
                finalPhTue = 'CLOSED';
            }
            else {
                finalPhTue = openPhTue + ' - ' + closePhTue;
            }
            
            if (openPhWed == 'CLOSED') {
                finalPhWed = 'CLOSED';
            }
            else {
                finalPhWed = openPhWed + ' - ' + closePhWed;
            }
            
            if (openPhThu == 'CLOSED') {
                finalPhThu = 'CLOSED';
            }
            else {
                finalPhThu = openPhThu + ' - ' + closePhThu;
            }
            
            if (openPhFri == 'CLOSED') {
                finalPhFri = 'CLOSED';
            }
            else {
                finalPhFri = openPhFri + ' - ' + closePhFri;
            }
            
            if (openPhSat == 'CLOSED') {
                finalPhSat = 'CLOSED';
            }
            else {
                finalPhSat = openPhSat + ' - ' + closePhSat;
            }
            
            if (openPhSun == 'CLOSED') {
                finalPhSun = 'CLOSED';
            }
            else {
                finalPhSun = openPhSun + ' - ' + closePhSun;
            }
        }
    }
    
    if (result.storePharmacyHoursBean != null &&
    ((result.storePharmacyHoursBean.wkdaySameInd != 1) && (result.storePharmacyHoursBean.wkdaySameInd != 'N')) &&
    (result.storeInfoBean.rx24hr == 'N')) {
        Data = Data + "<td style='padding-left:2px;'>" + "M:&nbsp;&nbsp;" +
        finalPhMon +
        "<br/>" +
        "Tu:&nbsp;&nbsp;" +
        finalPhTue +
        "<br/>" +
        "Wed:&nbsp;&nbsp;" +
        finalPhWed +
        "<br/>" +
        "Th:&nbsp;&nbsp;" +
        finalPhThu +
        "<br/>" +
        "Fri:&nbsp;&nbsp;" +
        finalPhFri +
        "<br/>" +
        "Sat:&nbsp;&nbsp;" +
        finalPhSat +
        "<br/>" +
        "Sun:&nbsp;&nbsp;" +
        finalPhSun +
        "<br/>" +
        "</td>";
    }
    else {
        if (result.storeInfoBean.rx24hr == "Y") {
            Data = Data + '<td>Open 24 Hours</td>';
        }
        else {
            Data = Data + "<td style='padding-left:2px;'>" + "M-F:&nbsp;&nbsp;" +
            finalPhMon +
            "<br/>" +
            "Sat:&nbsp;&nbsp;" +
            finalPhSat +
            "<br/>" +
            "Sun:&nbsp;&nbsp;" +
            finalPhSun +
            "<br/>" +
            "</td>";
        }
    }
    return Data;
}
/* Store locator functionalities for pagination. */
/* Store locator store pagination next function next(); */
function next(){ // next function start
    currentIndex += offset;
    nextIndex = currentIndex + offset;
    if (nextIndex > totalResultsLength) 
        nextIndex = totalResultsLength;
    var DataNext;
    DataNext = '<table id="results-container" cellpadding="0" cellspacing="0" border="0"><colgroup><col width="35" /><col width="250" /><col width="200" /><col width="115" /></colgroup><tr><th>&nbsp;</th><th>Store Location</th><th>Pharmacy Hours</th><th>&nbsp;</th></tr>';
    for (i = currentIndex; i < nextIndex; i++) { // for start
        resultNext = resultList[i];
        var x = i + 1;
        DataNext = DataNext +
        '<tr><td><strong>' +
        x +
        '</strong></td><td>Store' +
        resultNext.storeNumber +
        '<br/>' +
        resultNext.address +
        '<br/>' +
        resultNext.city +
        ',' +
        resultNext.state +
        ' ' +
        resultNext.zipcode +
        '<br/></td><td>Open 24 Hours</td><td class="button"><input type="image" src="/images/buttons/choose-this-store.gif" name="pickStore" alt="Choose This Store" class="pickStore" value="' +
        resultNext.storeNumber +
        '"/></td></tr>';
        // } //if end
    } // for end
    preformPagination(DataNext);
} // next function end
function preformPagination(Data){ // storeLocator common function start
    // common function for pagination. It will call inside findStore function.
    if (nextIndex > offset) {
        Data = Data + '<td><span onclick="previous();"><input type="image" src="/images/common/icons/arrow_left.gif" 	alt="Previous" /></span></td>';
    }
    if (totalResultsLength > nextIndex) {
        Data = Data + '<td><span></span></td><td><span></span></td><td/><td><span></span></td><td><span><input onclick="next();" type="image" src="/images/common/icons/arrow_right.gif" alt="Next" /></span></td>';
    }
    
    Data = Data + '</table>';
    $('resultsContainer').innerHTML = Data; // Getting Data from findStore
    // function
    // document.getElementById('results-container').innerHTML=Data;
} // function end
/* Store locator store pagination Previous functionality */
function previous(){ // Previous function start
    nextIndex = currentIndex;
    currentIndex -= offset;
    var DataPrevious;
    // Displaying header
    DataPrevious = '<table id="results-container" cellpadding="0" cellspacing="0" border="0"><colgroup><col width="35" /><col width="250" /><col width="200" /><col width="115" /></colgroup><tr><th>&nbsp;</th><th>Store Location</th><th>Pharmacy Hours</th><th>&nbsp;</th></tr>';
    for (i = (currentIndex); i < nextIndex; i++) { // for start
        resultNext = resultList[i];
        // store details
        var x = i + 1;
        DataPrevious = DataPrevious +
        '<tr><td><strong>' +
        x +
        '</strong></td><td>Store' +
        resultNext.storeNumber +
        '<br/>' +
        resultNext.address +
        '<br/>' +
        resultNext.city +
        ',' +
        resultNext.state +
        ' ' +
        resultNext.zipcode +
        '<br/></td><td>Open 24 Hours</td><td class="button"><input type="image" src="/images/buttons/choose-this-store.gif" name="pickStore" alt="Choose This Store" class="pickStore" value="' +
        resultNext.storeNumber +
        '"/></td></tr>';
        // } //if end
    } // for end
    preformPagination(DataPrevious);
} // Previous function end
function getWindowObject(){
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera,
        // Safari
    }
    else 
        if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
        }
        else {
            alert("Your browser does not support AJAX");
            return null;
        }
}
// Email and ZIP Code validation javascript
function containsDigits(sVar){
    return /\d/.test(sVar);
}
function validateZip(sVar){
    var regExp = /^\d+$/;
    if (sVar.length != 3 && sVar.length != 5) {
        return false;
    }
    else {
        if (regExp.test(sVar)) {
            return true;
        }
        else {
            return false;
        }
    }
    
}
function numDigits(sVar){
    var dig3 = /^\d{3,5}$/g;
    return dig3.test(sVar);
}

function validateEmail(ths){
    var validFormatRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validFormatRegExp.test(ths);
}

function ltrim(s){
    return s.replace(/^\s*/, "");
}

function rtrim(s){
    return s.replace(/\s*$/, "");
}

function trim(s){
    return rtrim(ltrim(s));
}

var cartItem = 0;
var loginStat = false;
function getSessionTimeoutCookieInfo(){
    var nameLOGIN = "ACO_LOGIN" + "=true";
    
    var cks = document.cookie.split(';');
    for (var i = 0; i < cks.length && (!loginStat); i++) {
        var c = trim(cks[i]);
        if (c.indexOf(nameLOGIN) == 0) {
            loginStat = true;
        }
    }
}

function sessionTimeout(){
    getSessionTimeoutCookieInfo();
    
    // only run timeout counter if logged in or has item in cart
    if (loginStat) {
        // 840 seconds = 14 minutes
        var millsec = 840 * 1000;
        setTimeout("sessionWarning()", millsec);
        // 120 seconds = 2 mins
        var logoutmillsec = 120 * 1000;
        setTimeout("logoutOnSessionTimeout()", millsec+logoutmillsec);
    }
}

function logout() {
	parent.location.href = "/logout_redirect.jsp";
}

function logoutOnSessionTimeout(){
	parent.location.href = "/logout_redirect.jsp?sessionTimeoutSuccessURLparam=true";
}

function sessionWarning(){
    getSessionTimeoutCookieInfo();
    
    var warningURL = null;
    if (loginStat) {
        warningURL = "/common/sessiontimeoutlogoutwarning.htm";
    }
    
    if (warningURL != null) {
        var win = window.open(warningURL, "sessionTimeoutWarning", "width=450,height=175");
        win.focus();
    }
}

if (domaincheck.indexOf(restrict_domain)!= -1){ 
	disableSessionTimeout = true;
}
if(disableSessionTimeout == false){	
	sessionTimeout();
}

sessionTimeout();
function clearTxt(field){
    if (field.value == field.id) {
        field.value = "";
    }
}

function retainValue(field){
	
	
    if (trim(field.value) == "") {
        field.value = field.id;
    }
    
    
}
//for additional msg validation code added on 16/6/2010 - for Add Adult - Additional message front end validation.
function addMsgValidation(){
	var field = window.document.getElementById('Type message here.');
	var temp;
    var reLetterOrDigit = /^([a-zA-Z]|\d)$/
    var addMsg = trim(field.value);
    
   
        // to check whether it contains more than 250 characters.
        var addMsgLength = addMsg.length;
        if (addMsgLength > 1000) {
            alert('Your additional message exceeds the 1000 character limit. Please reduce your message to continue.');
            field.focus();
            return false;
        }
        for (var i = 0; i < addMsgLength; i++) {
            temp = addMsg.charAt(i);
            
            if (reLetterOrDigit.test(temp) || (temp == '-') ||
            (temp == ' ') ||
            (temp == '.') ||
            (temp == ',') ||
            (temp == '_') ||
            (temp == '\'') ||
            (temp == '(') ||
            (temp == ')') ||
            (temp == '@') ||
            (temp == '&') ||
            (temp == '\r') ||
            (temp == '\n')) {
            }
            else {
                //alert("Invalid Characters: Your additional message can only contain letters, numbers and standard punctuation.");
                document.getElementById('addmsg').innerHTML="<div class='error'>"+
                                                            "<p><strong>Invalid Characters: </strong>Your additional message can only contain letters, numbers and standard punctuation.</p>"+
                                                            "<p class='float_left'>"+
                                                            "<label for='textarea'></label>"+
                                                            "<label for='additionalMessage'>"+
                                                            "<textarea onblur='retainValue(this);' id='Type message here.' name='additionalMessage' onfocus='clearTxt(this);' class='width_448' maxlength='1000' rows='4' cols='52'>"+document.addaddultinfo.additionalMessage.value+" </textarea></label>&nbsp;&nbsp;(optional)</p>"+
                                                            "<div class='clear'></div>"+
                                                            "</div>";
                field.focus();
                return false;
            }
        }
   
	

}



function numValidation(evt, rxValue){
    var isValidEntry = false;
    var evt = evt;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    /* Check the function is called for prescription number only and so allow minus sign by checking charCode == 45  */
    if (rxValue == 1 && charCode == 45) {
        isValidEntry = true;
        return isValidEntry;
    }
    else 
        if (rxValue == 2 && (charCode == 46 || charCode == 37 || charCode == 39)) {
            isValidEntry = true;
            return isValidEntry;
        }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        isValidEntry = false;
        return isValidEntry;
    }
    else {
        isValidEntry = true;
        return isValidEntry;
    }
}
/* NEW OVERLAY PLUGIN */
(function($) {
	$.fn.wOverlay = function(){	
		var checking=0;
		$(this).click(function(e){
			
			
			$(this).attr('id', 'popUpWindow');
			
			var linkPosition = $(this).offset();
			if($("#wOverlay")) { $("#wOverlay").remove();}
			if($("#screen")) { $("#screen").remove();}
			$('<div/>',{
				'id':'screen',
				'css':{
					'top':$(window).scrollTop(),
					'left':0,
					'width':$(window).width()+'px',
					'height':$(window).height()+'px',
					'display':'none',
					'visibility':'visible',
					'opacity':'0.7',
					'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)',
					'filter':'alpha(opacity=50)',
					'background-color': '#333'
				}
			}).appendTo('body').fadeIn();			
			$(window).resize(function(){
				$('#screen').css('width',$(this).width());
				$('#screen').css('height',$(this).height());
			});
			
			$(window).scroll(function(){
				$('#screen').css('left',$(this).scrollLeft());
				$('#screen').css('top',$(this).scrollTop());
			});
			var wOverlay = $('<div/>',{
				'id':'wOverlay',
				'css':{
					top: linkPosition.top + "px",
					left: linkPosition.left + "px",
					height:0,
					width:0,
					visibility: "visible"
				}
			}).appendTo('body');
			$('<span/>',{'style':'position:absolute;left:-1500px;top:0;width:1;height:1;overflow:hidden;'}).html("Beginning of dialog content").appendTo(wOverlay);
			var wIframe = $('<iframe/>',{
				'src':this.href,				
				'tabindex':'-1',
				'scrolling':'no',
				'frameborder':0
			}).appendTo(wOverlay).focus();			
			setTimeout( function() {
				  $(wIframe).focus();
				} , 500); 
			$('<a/>',{
				'id':'overlayClose',
				'class':'MultiBoxClose',
				'href':'javascript:void(0)',
				'text':'Close'
			}).appendTo(wOverlay);
			$('<span/>',{'style':'position: absolute;left:-1500px;top:0;width:1;height:1;overflow:hidden;'}).html("End of dialog content").appendTo(wOverlay);
			wIframe.load(function(){
				if($.browser.webkit){
					var newHeight = $(wIframe).contents().find('#content').innerHeight()+30;
					var newWidth = $(wIframe).contents().find('#content').width()+50;
				}else{
					var newHeight = $(wIframe).contents().find('#content').innerHeight()+5;
					var newWidth = $(wIframe).contents().find('#content').width()+20;
				}
				var currTop = ($(window).height() / 2) - (newHeight / 2)+$(window).scrollTop();
				$(wIframe).contents().find("html").css("background","none repeat scroll 0 0 #FFFFFF"); 
				$(wIframe).contents().find("body").css("background","none repeat scroll 0 0 #FFFFFF");
				if(currTop <= 0){ 
					newTop = 30; 
				}
				else{ 
					newTop = currTop; 
				}
			
				$("#wOverlay").css({
					visibility: "visible",
					width:newWidth+'px',
					height:newHeight+'px',
					left:($(window).width() / 2) - (newWidth / 2)+$(window).scrollLeft(),
					top:newTop
				});
				
				$("#wOverlay").fadeIn('slow');
				
				checking = setInterval(function() { 
					if($.browser.webkit){
						var currHeight = $(wIframe).contents().find('#content').innerHeight()+30;
					}else{
						var currHeight = $(wIframe).contents().find('#content').innerHeight()+5;
					}
				    var currTop = ($(window).height() / 2) - (currHeight / 2)+$(window).scrollTop();
				    if(currTop <= 0){  
				    	newTop = 30; 
				    }
					else{ 
						newTop = currTop; 
					}
				    if (newTop != currHeight) {
						 $("#wOverlay").animate({
							 height:currHeight+'px',
							 top:newTop
						 }, function() {
							 if($.browser.msie && $.browser.version=="6.0") {
								 $("#wOverlay").css({
									 overflow: "visible"
								 });
							 }
						 });
						 newTop = currHeight;
						 clearInterval(checking);
				    }
				  },100);
					var internalClose = $(wIframe).contents().find("#back, #back-link, #back-click, #back-clickView");
					internalClose.click(function(){	

							clearInterval(checking);
							$("#screen").fadeOut();
							$("#wOverlay").fadeOut();
							
					});
				});
			$('a.MultiBoxClose').live("blur", function(){
				$(wIframe).focus();
			});
			$(wIframe).live("blur", function(){
				$("a.MultiBoxClose").focus();
			});
			return false;
		});
		$("a.MultiBoxClose").live("click", function(){
			if($('#popUpWindow', window.parent.document).length){			
				$("#popUpWindow").attr('id', '');
			}
			
			$('#popUpWindow', window.parent.document).html();
			var iframeSrc = $(this).parent().find('iframe').attr('src'); 
			if((iframeSrc.indexOf('.flv'))!=-1){
				$(this).parent().find('iframe').remove();
			}
			clearInterval(checking); 
			$("#screen").fadeOut();
			$("#wOverlay").fadeOut();
		});
		
		$("#screen").live("click", function(){
			var iframeSrc = $(this).parent().find('iframe').attr('src'); 
			if((iframeSrc.indexOf('.flv'))!=-1){
				$(this).parent().find('iframe').remove();
			}
			clearInterval(checking);
			$("#screen").fadeOut();
			$("#wOverlay").fadeOut();
		});
		setTimeout( function() {
			  $("#wOverlay").focus();
			} , 500); 
	};
})(jQuery)

$(document).ready(function () {
    /* On focus, hide field label */
	$('#login input.textfield').focus(function(){
		$(this).prev().hide();
	});
/* On blur, show field label if field is empty */
	$('#login input.textfield').blur(function(){
		if ($(this).val() == ''){
			$(this).prev().show();
		} else {
			$(this).prev().hide();
		}
	});
/* Remove the right border from the last main nav item so borders only appear between tabs */
	/* Search box auto-complete */
	$('<ul/>',{'id':'searchResultsBox'}).appendTo('#termAutoComp'); 
	var currentSearchResults = '';
	var submit_url;
	var iso_page=String(document.getElementById("iso_page"));
	var listCount;
	var $searchBox = $('#termAutoComp input.textfield');
	$searchBox.data('oldVal', $searchBox);
	$searchBox.bind('propertychange keyup input paste', function(e){
		var currentSearchValue = $searchBox.val();
		
		if(iso_page==''||iso_page=='null'||iso_page=='undefined') 
		{
			submit_url='/marketing/termsearch/termquery.html?query='+currentSearchValue;  
		}
		else
		{
			submit_url='/marketing/termsearch/termquery.html?query='+currentSearchValue+"&iso_flag="+"isoheadersearch";
		}
		if ($searchBox.data('oldVal') != currentSearchValue) {
			$searchBox.data('oldVal', currentSearchValue);
			if((currentSearchValue.length >= 3)&&(currentSearchValue !='Enter keyword or item #')){
				$.ajax({
				
					url:submit_url,
					dataType:'json',
					error:function(){$('#searchResultsBox').empty().hide();currentSearchResults='';},
					success:function(data) {
						var numberOfResults = (data.ResultSet.totalResultsAvailable);
						var isISo='no';
						if(numberOfResults>=1){
							$('#searchResultsBox').empty();
							currentSearchResults='';
							listCount=0;
							if(data.ResultSet.Result[0].Term.toLowerCase().indexOf('isourl')!=-1){
								isISo='yes';
							}
							if (numberOfResults >10){numberOfResults=12;}
							for(x=1;x<=numberOfResults-1;x++){
								/*
								 * This line verifies the resultSet Array object is null or not.
								 * If not null then only this will populate the sugesstions with relevant URLs
								 */
								if(data.ResultSet.Result[x]!=null){
								var resultTerm = data.ResultSet.Result[x].Term;								
								if(resultTerm.toLowerCase().indexOf('<a')!=-1){
									currentSearchResults += '<li class="categories" style="font-size:12px">' + resultTerm + '</li>';
								} else {
									if(resultTerm.toLowerCase().indexOf('categories')!=-1){
										currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultTerm + '</a></li>';
									} else {
										var loc = window.location+'';
										
										if(loc.indexOf('webpickup')!=-1) {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="/webpickup/browse/search_results.jsp?Ntt=' + resultTerm + '">' + resultText + '</a></li>';
										}
										else if(loc.indexOf('iso')!=-1) {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											if(isISo=='yes'){
											currentSearchResults += '<li style="font-size:12px"><a href="/iso/search/results.jsp?Ntt=' + resultTerm + '">' + resultText + '</a></li>';
										}
										else {
												currentSearchResults += '<li style="font-size:12px"><a href="/search/results.jsp?Ntt=' + resultTerm + '">' + resultText + '</a></li>';
											}												
										}
										else {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="/search/results.jsp?Ntt=' + resultTerm + '">' + resultText + '</a></li>';
										}
									}
								}
								}
							}
							if($('#searchResultsBox').is(':hidden')){$('#searchResultsBox').show()}
							$('#searchResultsBox').html(currentSearchResults);
						} else {$('#searchResultsBox').empty().hide();currentSearchResults='';}
					}
				});
				
			} else {$('#searchResultsBox').empty().hide();currentSearchResults='';} 
	  	}
	});
	$('#searchResultsBox').width(250); //Set the width of the suggestion box
    
		$searchBox.keydown(function(e){
			switch(e.which){
				case 40: // down arrow
					e.preventDefault();
					//if($('#searchResultsBox').is(':hidden')){$('#searchResultsBox').show();}
					$('#searchResultsBox a:first').focus();					
					$('#searchResultsBox li:first').addClass('autocompleter-selected');
					
					break;
				case 38: // up arrow
					e.preventDefault();
					$('#searchResultsBox').hide();currentSearchResults='';
					break;
				case 27: // escape key
					$('#searchResultsBox').hide();currentSearchResults='';
					break;
			}
		});
		
	$('#searchResultsBox li').live('hover',function(){			
		if($('#searchResultsBox li').hasClass('autocompleter-selected')){
			$('#searchResultsBox li').removeClass('autocompleter-selected');
			$('#searchResultsBox li a').blur();  
		}
	});
	
	$('#searchResultsBox li').live('click',function(){
		$searchBox.data('oldVal',$(this).text());
		$searchBox.val($(this).children('a').text());
		location.href=$(this).children('a').attr("href");
	});	
	$('#searchResultsBox a').live('focus',function(){
		$searchBox.data('oldVal',$(this).text());
	
		if($.trim($(this).text()) == "SUGGESTED CATEGORIES")
		{
			$searchBox.val($('#searchResultsBox li:first').text());		
		}
		else
		{
			$searchBox.val($(this).text());
		}
		
		
	});
	
	$('#searchResultsBox a').live('keydown',function(e){
		switch(e.which){
			case 40: // down arrow 
				e.preventDefault();
				if($(this).parent().not(':last-child')){
					$(this).parent().next().children('a').focus();
					listCount++;
					if(listCount > $('#searchResultsBox li').size()-1){
						listCount = $('#searchResultsBox li').size()-1;
					}
					
					$('#searchResultsBox li').eq(listCount).prevAll().removeClass('autocompleter-selected');
					$('#searchResultsBox li').eq(listCount).addClass('autocompleter-selected');
					
				}
				break;
			case 38: // up arrow
				e.preventDefault();
				if($(this).parent().is(':first-child')){
					$('#searchResultsBox').hide();currentSearchResults='';
					$searchBox.focus();
				} else {
					
					listCount--;
					$(this).parent().prev().children('a').focus();
					$('#searchResultsBox li').eq(listCount).nextAll().removeClass('autocompleter-selected');
					$('#searchResultsBox li').eq(listCount).addClass('autocompleter-selected');
				}
				break;
			case 27: // escape key
				$('#searchResultsBox').empty().hide();currentSearchResults='';
				$searchBox.focus();
			break;
		}
	});
	
	$(document).click(function(event) {
			if ($(event.target).closest('#searchResultsBox').get(0) == null) {
			$('#searchResultsBox').hide();currentSearchResults='';
		}
	});
	
    $('a.mb').each(function(i,el){
    	var anchorHref = $(this).attr("href");
    	var anchorTitle = $(this).attr("title");
    	var anchorText = $(this).text();
    	var altText = $(this).attr("alt");
    	if(anchorText) {
    		var strTxt = jQuery.trim(anchorText);
    		if(strTxt!="") {anchorTitle = strTxt+" - Opens a simulated dialog";}
    		else if(altText){anchorTitle = altText+" - Opens a simulated dialog";}
    		else {anchorTitle = "Quick Look - Opens a simulated dialog";}
    	}
    	else {
    		if(altText){anchorTitle = altText+" - Opens a simulated dialog";}
    		else {anchorTitle = "Quick Look - Opens a simulated dialog";}
    	}
    	if (anchorHref.lastIndexOf('overlay=true') == -1) {
	    	if (anchorHref.lastIndexOf('?') == -1) {
	    		anchorHref = anchorHref+"?overlay=true";
	    	} else {
	    		anchorHref = anchorHref+"&overlay=true";
	    	} 
    	}
    	$(this).attr('href', anchorHref);
    	$(this).attr('title', anchorTitle);
    });
	$(".mb").wOverlay();
	
	$('#frmHeaderSearch').submit(function() {
		if ($('#query').val() == 'Enter keyword or item #' || $('#query').val() == 'Search your local store'){
			$('#query').val('');
		}
		  return true;
	});
	
	$('#frmISOBodySearch').submit(function() {
		if ($('#query2').val() == 'Enter keyword or item #' ){
			$('#query2').val('');
		}
		  return true;
	});
	
	if($('#back')) {
		$('#back').attr('href', '#');
		$('#back').live("click", function(e){
		self.window.close();
		e.preventDefault();
		});
	}
	if($('#back-link')) {
		$('#back-link').live("click", function(){
			if(parent.location.href == $('#back-link')[0].href){
				history.go(-1);
			} else {
				self.window.close();
			}
		});
	}

	if($('#back-click')) {
		$('#back-click').live("click", function(){
			if(parent.location.href == $('#back-click')[0].href){
				history.go(-1);
			} else {
				parent.location.href=$('#back-click')[0].href;
				self.window.close();
			}
		});
	}
	
	if($('#back-clickView')) {
		$('#back-clickView').live("click", function(){
			parent.location.href=$('#back-clickView')[0].href;
			self.window.close();
		});
	}
	
	
	/*type ahead in drug search page begins*/
	$('<ul/>',{'id':'searchResultsBox_new'}).appendTo('#termAutoComp1'); 
	var currentSearchResults = '';
	var listCount;
	var $searchBox_new = $('#termAutoComp1 input.textfield');
	$searchBox_new.data('oldVal', $('#termAutoComp1 input.textfield').val());
	$searchBox_new.bind('propertychange keyup input paste', function(e){
		var currentSearchValue = $('#termAutoComp1 input.textfield').val();
				
		if ($searchBox_new.data('oldVal') != currentSearchValue) {
			$searchBox_new.data('oldVal', currentSearchValue);
			if(currentSearchValue.length >= 3){
				
				
				var testFlag="drug";
				$.ajax({
					url:'/marketing/termsearch/termquery.html?query='+currentSearchValue+"&druginfo_flag="+"testFlag",
					dataType:'json',
					error:function(){$('#searchResultsBox_new').empty().hide();currentSearchResults='';},
					success:function(data) {
						var numberOfResults = (data.ResultSet.totalResultsAvailable);
						
						if(numberOfResults>=1){
							$('#searchResultsBox_new').empty();
							currentSearchResults='';
							listCount=0;
							if (numberOfResults >10){numberOfResults=12;}
							for(x=0;x<=numberOfResults-1;x++){
								/*
								 * This line verifies the resultSet Array object is null or not.
								 * If not null then only this will populate the sugesstions with relevant URLs
								 */
								if(data.ResultSet.Result[x]!=null){
								var resultTerm = data.ResultSet.Result[x].Term;								
								if(resultTerm.toLowerCase().indexOf('<a')!=-1){
									currentSearchResults += '<li class="categories" style="font-size:12px">' + resultTerm + '</li>';
								} else {
									if(resultTerm.toLowerCase().indexOf('categories')!=-1){
										currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultTerm + '</a></li>';
									} else {
										var loc = window.location+'';
										
										if(loc.indexOf('webpickup')!=-1) {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="/marketing/library/finddrug/search/search_results_drug.jsp?term=' + resultTerm + '">' + resultText + '</a></li>';
										}
										else if(loc.indexOf('iso')!=-1) {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="/iso/search/results.jsp?Ntt=' + resultTerm + '">' + resultText + '</a></li>';
										}
										else {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="/marketing/library/finddrug/search/search_results_drug.jsp?term=' + resultTerm + '">' + resultText + '</a></li>';
										}
									}
								}
								}
							}
							if($('#searchResultsBox_new').is(':hidden')){$('#searchResultsBox_new').show()} 
							$('#searchResultsBox_new').html(currentSearchResults);
						} else {$('#searchResultsBox_new').empty().hide();currentSearchResults='';}
					}
				});
				
			} else {$('#searchResultsBox_new').empty().hide();currentSearchResults='';} 
	  	}
	});

	$('#searchResultsBox_new').width(250); //Set the width of the suggestion box

	$searchBox_new.keydown(function(e){
		switch(e.which){
			case 40: // down arrow
				e.preventDefault();
				//if($('#searchResultsBox_new').is(':hidden')){$('#searchResultsBox_new').show();}
				$('#searchResultsBox_new a:first').focus();					
				$('#searchResultsBox_new li:first').addClass('autocompleter-selected');
				
				break;
			case 38: // up arrow
				e.preventDefault();
				$('#searchResultsBox_new').hide();currentSearchResults='';
				break;
			case 27: // escape key
				$('#searchResultsBox_new').hide();currentSearchResults='';
				break;
		}
	});

	$('#searchResultsBox_new li').live('hover',function(){			
	if($('#searchResultsBox_new li').hasClass('autocompleter-selected')){
		$('#searchResultsBox_new li').removeClass('autocompleter-selected');
		$('#searchResultsBox_new li a').blur();  
	}
	});

	$('#searchResultsBox_new li').live('click',function(){
	$searchBox_new.data('oldVal',$(this).text());
	$searchBox_new.val($(this).children('a').text());
	location.href=$(this).children('a').attr("href");
	
	});	
	$('#searchResultsBox_new a').live('focus',function(){
	$searchBox_new.data('oldVal',$(this).text());

	if($.trim($(this).text()) == "SUGGESTED CATEGORIES")
	{
		$searchBox_new.val($('#searchResultsBox_new li:first').text());		
	}
	else
	{
		$searchBox_new.val($(this).text());
	}


	});

	$('#searchResultsBox_new a').live('keydown',function(e){
	switch(e.which){
		case 40: // down arrow 
			e.preventDefault();
			if($(this).parent().not(':last-child')){
				$(this).parent().next().children('a').focus();
				listCount++;
				if(listCount > $('#searchResultsBox_new li').size()-1){
					listCount = $('#searchResultsBox_new li').size()-1;
				}
				
				$('#searchResultsBox_new li').eq(listCount).prevAll().removeClass('autocompleter-selected');
				$('#searchResultsBox_new li').eq(listCount).addClass('autocompleter-selected');
				
			}
			break;
		case 38: // up arrow
			e.preventDefault();
			if($(this).parent().is(':first-child')){
				$('#searchResultsBox_new').hide();currentSearchResults='';
				$searchBox_new.focus();
			} else {
				
				listCount--;
				$(this).parent().prev().children('a').focus();
				$('#searchResultsBox_new li').eq(listCount).nextAll().removeClass('autocompleter-selected');
				$('#searchResultsBox_new li').eq(listCount).addClass('autocompleter-selected');
			}
			break;
		case 27: // escape key
			$('#searchResultsBox_new').empty().hide();currentSearchResults='';
			$searchBox_new.focus();
		break;
	}
	});
	/*$('#searchResultsBox_new a').live('hover',function(e){

	$("#finddrug").val($(this).text());

	});*/

	$(document).click(function(event) {
		if ($(event.target).closest('#searchResultsBox_new').get(0) == null) {
		$('#searchResultsBox_new').hide();currentSearchResults='';
	}
	});
			
	
	/*type ahead in drug search page ends*/
	
	
	/*type ahead in add allergies drug search page begins*/
	$('<ul/>',{'id':'searchResultsBox_addallergy'}).appendTo('#termAutoComp_addallergy'); 
	var currentSearchResults = '';
	var listCount;
	var $searchBox_new = $('#termAutoComp_addallergy input.textfield');
	$searchBox_new.data('oldVal', $searchBox_new);
	$searchBox_new.bind('propertychange keyup input paste', function(e){
		var currentSearchValue = $searchBox_new.val();
				
		if ($searchBox_new.data('oldVal') != currentSearchValue) {
			$searchBox_new.data('oldVal', currentSearchValue);
			if(currentSearchValue.length >= 3){
				
				
				var testFlag="drug";
				$.ajax({
					url:'/marketing/termsearch/termquery.html?query='+currentSearchValue+"&druginfo_flag="+"testFlag",
					dataType:'json',
					error:function(){$('#searchResultsBox_addallergy').empty().hide();currentSearchResults='';},
					success:function(data) {
						var numberOfResults = (data.ResultSet.totalResultsAvailable);
						
						if(numberOfResults>=1){
							$('#searchResultsBox_addallergy').empty();
							currentSearchResults='';
							listCount=0;
							if (numberOfResults >10){numberOfResults=12;}
							for(x=0;x<=numberOfResults-1;x++){
								/*
								 * This line verifies the resultSet Array object is null or not.
								 * If not null then only this will populate the sugesstions with relevant URLs
								 */
								if(data.ResultSet.Result[x]!=null){
								var resultTerm = data.ResultSet.Result[x].Term;								
								if(resultTerm.toLowerCase().indexOf('<a')!=-1){
									currentSearchResults += '<li class="categories" style="font-size:12px">' + resultTerm + '</li>';
								} else {
									if(resultTerm.toLowerCase().indexOf('categories')!=-1){
										currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultTerm + '</a></li>';
									} else {
										var loc = window.location+'';
										
										if(loc.indexOf('webpickup')!=-1) {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultText + '</a></li>';
										}
										else if(loc.indexOf('iso')!=-1) {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultText + '</a></li>';
										}
										else {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultText + '</a></li>';
										}
									}
								}
								}
							}
							if($('#searchResultsBox_addallergy').is(':hidden')){$('#searchResultsBox_addallergy').show()} 
							$('#searchResultsBox_addallergy').html(currentSearchResults);
						} else {$('#searchResultsBox_addallergy').empty().hide();currentSearchResults='';}
					}
				});
				
			} else {$('#searchResultsBox_addallergy').empty().hide();currentSearchResults='';} 
	  	}
	});

	$('#searchResultsBox_addallergy').width(204); //Set the width of the suggestion box

	$searchBox_new.keydown(function(e){
		switch(e.which){
			case 40: // down arrow
				e.preventDefault();
				//if($('#searchResultsBox_new').is(':hidden')){$('#searchResultsBox_new').show();}
				$('#searchResultsBox_addallergy a:first').focus();					
				$('#searchResultsBox_addallergy li:first').addClass('autocompleter-selected');
				
				break;
			case 38: // up arrow
				e.preventDefault();
				$('#searchResultsBox_addallergy').hide();currentSearchResults='';
				break;
			case 27: // escape key
				$('#searchResultsBox_addallergy').hide();currentSearchResults='';
				break;
		}
	});

	$('#searchResultsBox_addallergy li').live('hover',function(){	
	if($('#searchResultsBox_addallergy li').hasClass('autocompleter-selected')){
		$('#searchResultsBox_addallergy li').removeClass('autocompleter-selected');
		$('#searchResultsBox_addallergy li a').blur();  
	}
	});

	$('#searchResultsBox_addallergy li').live('click',function(){
	$searchBox_new.data('oldVal',$(this).text());
	$searchBox_new.val($(this).children('a').text());
	location.href=$(this).children('a').attr("href");
	$('#searchResultsBox_addallergy').hide();
	});	
	$('#searchResultsBox_addallergy a').live('focus',function(){
	$searchBox_new.data('oldVal',$(this).text());

	if($.trim($(this).text()) == "SUGGESTED CATEGORIES")
	{
		$searchBox_new.val($('#searchResultsBox_addallergy li:first').text());		
	}
	else
	{
		$searchBox_new.val($(this).text());
	}


	});

	$('#searchResultsBox_addallergy a').live('keydown',function(e){
	switch(e.which){
		case 40: // down arrow 
			e.preventDefault();
			if($(this).parent().not(':last-child')){
				$(this).parent().next().children('a').focus();
				listCount++;
				if(listCount > $('#searchResultsBox_addallergy li').size()-1){
					listCount = $('#searchResultsBox_addallergy li').size()-1;
				}
				
				$('#searchResultsBox_addallergy li').eq(listCount).prevAll().removeClass('autocompleter-selected');
				$('#searchResultsBox_addallergy li').eq(listCount).addClass('autocompleter-selected');
				
			}
			break;
		case 38: // up arrow
			e.preventDefault();
			if($(this).parent().is(':first-child')){
				$('#searchResultsBox_addallergy').hide();currentSearchResults='';
				$searchBox_new.focus();
			} else {
				
				listCount--;
				$(this).parent().prev().children('a').focus();
				$('#searchResultsBox_addallergy li').eq(listCount).nextAll().removeClass('autocompleter-selected');
				$('#searchResultsBox_addallergy li').eq(listCount).addClass('autocompleter-selected');
			}
			break;
		case 27: // escape key
			$('#searchResultsBox_addallergy').empty().hide();currentSearchResults='';
			$searchBox_new.focus();
		break;
	}
	});
	/*$('#searchResultsBox_new a').live('hover',function(e){

	$("#finddrug").val($(this).text());

	});*/

	$(document).click(function(event) {
		if ($(event.target).closest('#searchResultsBox_addallergy').get(0) == null) {
		$('#searchResultsBox_addallergy').hide();currentSearchResults='';
	}
	});
			
	
	/*type ahead in add alergies drug search page ends*/
	
	
	load_transfer = function(obj){
		
		var load_cnt = obj;
		//alert(load_cnt);
		for(i=1;i<=load_cnt;i++){
			add_transfer_prescription(i);
		}
	};
	
	/* sample transfer */
	add_transfer_prescription = function(obj){
		
		var pres_count = obj;
		
		$('.termAutoComp').attr("style","'position':''");
		if($('#termAutoComp_transfer'+pres_count+' .searchResultsBox_transfer')){
			
			$('#termAutoComp_transfer'+pres_count+' .searchResultsBox_transfer').remove();
		}
	$('<ul/>',{'id':'searchResultsBox_transfer'+pres_count,'class':'searchResultsBox_transfer'}).appendTo('#termAutoComp_transfer'+pres_count); 
	var currentSearchResults = '';
	var submit_url;
	var iso_page=String(document.getElementById("iso_page"));
	var listCount;
	var $searchBox_transfer = $('#termAutoComp_transfer'+pres_count+' input.prescriptionNameFld');
	$searchBox_transfer.data('oldVal', $searchBox_transfer);
	$searchBox_transfer.bind('propertychange input paste', function(e){
		var currentSearchValue = $searchBox_transfer.val();
		
		
		if ($searchBox_transfer.data('oldVal') != currentSearchValue) {
			$searchBox_transfer.data('oldVal', currentSearchValue);
			if((currentSearchValue.length >= 3)&&(currentSearchValue !='Enter keyword or item #')){
				$.ajax({
				
					url:'/marketing/termsearch/termquery.html?query='+currentSearchValue+"&pharmacy_flag="+"testFlag",
						dataType:'json',
						error:function(){$('#searchResultsBox_transfer'+pres_count).empty().hide();currentSearchResults='';},
						success:function(data) {
							$('.termAutoComp').css("position","");
							$('#termAutoComp_transfer'+pres_count).css("position","relative");
							var numberOfResults = (data.ResultSet.totalResultsAvailable);
							//alert(numberOfResults);
							if(numberOfResults>=1){
								$('#searchResultsBox_transfer'+pres_count).empty();
								currentSearchResults='';
								listCount=0;
								if (numberOfResults >10){numberOfResults=12;}
								for(x=0;x<=numberOfResults-1;x++){
									/*
									 * This line verifies the resultSet Array object is null or not.
									 * If not null then only this will populate the sugesstions with relevant URLs
									 */
									if(data.ResultSet.Result[x]!=null){
									
									var resultTerm = data.ResultSet.Result[x].Term;								
									if(resultTerm.toLowerCase().indexOf('<a')!=-1){
										
										currentSearchResults += '<li class="categories" style="font-size:12px">' + resultTerm + '</li>';
										
									} else {
										if(resultTerm.toLowerCase().indexOf('categories')!=-1){
											currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultTerm + '</a></li>';
											currentSearchResults
										} else {
											var loc = window.location+'';
											
											if(loc.indexOf('webpickup')!=-1) {
											
												var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
												currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultText + '</a></li>';
											}
											else if(loc.indexOf('iso')!=-1) {
												
												var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
												currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultText + '</a></li>';
											}
											else {
												
												var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
												
												currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultText + '</a></li>';
										}
									}
								}
								}
							}
							if($('#searchResultsBox_transfer'+pres_count).is(':hidden')){$('#searchResultsBox_transfer'+pres_count).show()}
							$('#searchResultsBox_transfer'+pres_count).html(currentSearchResults);
						} else {$('#searchResultsBox_transfer'+pres_count).empty().hide();currentSearchResults='';}
					}
				});
				
			} else {$('#searchResultsBox_transfer'+pres_count).empty().hide();currentSearchResults='';} 
	  	}
	});
	$('#searchResultsBox_transfer'+pres_count).width(250); //Set the width of the suggestion box
    
		$searchBox_transfer.keydown(function(e){
			switch(e.which){
				case 40: // down arrow
					e.preventDefault();
					//if($('#searchResultsBox_transfer'+pres_count).is(':hidden')){$('#searchResultsBox_transfer'+pres_count).show();}
					$('#searchResultsBox_transfer'+pres_count+' a:first').focus();					
					$('#searchResultsBox_transfer'+pres_count+' li:first').addClass('autocompleter-selected');
					
					break;
				
				case 9:
					//e.preventDefault();
					//if($('#searchResultsBox_transfer').is(':hidden')){$('#searchResultsBox_transfer').show();}
					//alert('keyin');
					//$('#searchResultsBox_transfer'+pres_count+' a:first').focus();					
					$('#searchResultsBox_transfer'+pres_count+' li:first').addClass('autocompleter-selected');
					
					break;
				case 38: // up arrow
					e.preventDefault();
					$('#searchResultsBox_transfer'+pres_count).hide();currentSearchResults='';
					break;
				case 27: // escape key
					$('#searchResultsBox_transfer'+pres_count).hide();currentSearchResults='';
					break;
			}
		});
		
		$("#searchResultsBox_transfer1 li").live('mouseover mouseout',function(event) {
			if (event.type == 'mouseover') {
				//alert('in');
				if($('#searchResultsBox_transfer'+pres_count+' li').hasClass('autocompleter-selected')){
					$('#searchResultsBox_transfer'+pres_count+' li').removeClass('autocompleter-selected');
					$('#searchResultsBox_transfer'+pres_count+' a').blur();
				}
				$(this).children('a').focus();
			  } else {
				  $("#prescriptionName1").focus();
			  }
		});
	
	
		$('#searchResultsBox_transfer'+pres_count+' li').live('click',function(){
			$searchBox_transfer.data('oldVal',$(this).text());
			//$("#termAutoComp_transfer > #prescriptionName1").attr("value",$(this).text());
			
			$searchBox_transfer.val($(this).children('a'). text());
			//$("#prescriptionName1").val($(this).text());
			$('#searchResultsBox_transfer'+pres_count).hide();
			
			});
		
		
	$('#searchResultsBox_transfer'+pres_count+' a').live('focus',function(){
		$searchBox_transfer.data('oldVal',$(this).text());
	
		if($.trim($(this).text()) == "SUGGESTED CATEGORIES")
		{
			$searchBox_transfer.val($('#searchResultsBox_transfer'+pres_count+' li:first').text());		
		}
		else
		{
			$searchBox_transfer.val($(this).text());
		}
		
		
	});
	
	$('#searchResultsBox_transfer'+pres_count+' a').live('keydown',function(e){
		switch(e.which){
			case 40: // down arrow 
				e.preventDefault();
				if($(this).parent().not(':last-child')){
					$(this).parent().next().children('a').focus();
					listCount++;
					if(listCount > $('#searchResultsBox_transfer'+pres_count+' li').size()-1){
						listCount = $('#searchResultsBox_transfer'+pres_count+' li').size()-1;
					}
					
					$('#searchResultsBox_transfer'+pres_count+' li').eq(listCount).prevAll().removeClass('autocompleter-selected');
					$('#searchResultsBox_transfer'+pres_count+' li').eq(listCount).addClass('autocompleter-selected');
					
				}
				break;
			case 9: //tab key
				e.preventDefault();
				if($(this).parent().not(':last-child')){
					$(this).parent().next().children('a').focus();
					listCount++;
					if(listCount > $('#searchResultsBox_transfer'+pres_count+' li').size()-1){
						listCount = $('#searchResultsBox_transfer'+pres_count+' li').size()-1;
					}
					
					$('#searchResultsBox_transfer'+pres_count+' li').eq(listCount).prevAll().removeClass('autocompleter-selected');
					$('#searchResultsBox_transfer'+pres_count+' li').eq(listCount).addClass('autocompleter-selected');
					
				}
				break;
			
			case 38: // up arrow
				e.preventDefault();
				if($(this).parent().is(':first-child')){
					$('#searchResultsBox_transfer'+pres_count).hide();currentSearchResults='';
					$searchBox_transfer.focus();
				} else {
					
					listCount--;
					$(this).parent().prev().children('a').focus();
					$('#searchResultsBox_transfer'+pres_count+' li').eq(listCount).nextAll().removeClass('autocompleter-selected');
					$('#searchResultsBox_transfer'+pres_count+' li').eq(listCount).addClass('autocompleter-selected');
				}
				break;
			case 27: // escape key
				$('#searchResultsBox_transfer'+pres_count).empty().hide();currentSearchResults='';
				$searchBox_transfer.focus();
			break;
			
			case 13: 
				e.preventDefault();	
			   $("#prescriptionName"+pres_count).focus();
				$('#searchResultsBox_transfer'+pres_count).hide();				
			break;
		}
	});
	
	$(document).click(function(event) {
			if ($(event.target).closest('#searchResultsBox_transfer'+pres_count).get(0) == null) {
			$('#searchResultsBox_transfer'+pres_count).hide();currentSearchResults='';
		}
	});
	
	};
	/* sample transfer ends */
	
	/* type ahead implementation in transfer prescription page ends */
	
	
	
	/* type ahead implementation in transfer prescription page ends */

	/*type ahead in ISO Body page begins*/
	$('<ul/>',{'id':'searchResultsBox_iso'}).appendTo('#termAutoCompISOBody'); 
	var currentSearchResults = '';
	var listCount;
	var $searchBox_iso = $('#termAutoCompISOBody input.textfield');
	$searchBox_iso.data('oldVal', $searchBox_iso);
	$searchBox_iso.bind('propertychange keyup input paste', function(e){
		var currentSearchValue = $searchBox_iso.val();
				
		if ($searchBox_iso.data('oldVal') != currentSearchValue) {
			$searchBox_iso.data('oldVal', currentSearchValue);
			if((currentSearchValue.length >= 3)&&(currentSearchValue !='Enter keyword or item #')){
				
				
				var testFlag="drug";
				$.ajax({
					url:'/marketing/termsearch/termquery.html?query='+currentSearchValue+"&iso_flag="+"isoheadersearch",
					dataType:'json',
					error:function(){$('#searchResultsBox_iso').empty().hide();currentSearchResults='';},
					success:function(data) {
						var numberOfResults = (data.ResultSet.totalResultsAvailable);
						var isISo="No";
						if(numberOfResults>=1){
							$('#searchResultsBox_iso').empty();
							currentSearchResults='';
							listCount=0;
							if(data.ResultSet.Result[0].Term.toLowerCase().indexOf('isourl')!=-1){
								isISo='yes';
							}
							if (numberOfResults >10){numberOfResults=12;}
							for(x=1;x<=numberOfResults-1;x++){
								/*
								 * This line verifies the resultSet Array object is null or not.
								 * If not null then only this will populate the sugesstions with relevant URLs
								 */
								if(data.ResultSet.Result[x]!=null){
								var resultTerm = data.ResultSet.Result[x].Term;								
								if(resultTerm.toLowerCase().indexOf('<a')!=-1){
									currentSearchResults += '<li class="categories" style="font-size:12px">' + resultTerm + '</li>';
								} else {
									if(resultTerm.toLowerCase().indexOf('categories')!=-1){
										currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + resultTerm + '</a></li>';
									} else {
										var loc = window.location+'';
										
										if(loc.indexOf('webpickup')!=-1) {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="/marketing/library/finddrug/search/search_results_drug.jsp?term=' + resultTerm + '">' + resultText + '</a></li>';
										}
										else if(loc.indexOf('iso')!=-1) {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											if(isISo){
												currentSearchResults += '<li style="font-size:12px"><a href="/iso/search/results.jsp?Ntt=' + resultTerm + '">' + resultText + '</a></li>';
											}else{
												currentSearchResults += '<li style="font-size:12px"><a href="/search/results.jsp?Ntt=' + resultTerm + '">' + resultText + '</a></li>';
											}
										}
										else {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="/marketing/library/finddrug/search/search_results_drug.jsp?term=' + resultTerm + '">' + resultText + '</a></li>';
										}
									}
								}
								}
							}
							if($('#searchResultsBox_iso').is(':hidden')){$('#searchResultsBox_iso').show()} 
							$('#searchResultsBox_iso').html(currentSearchResults);
						} else {$('#searchResultsBox_iso').empty().hide();currentSearchResults='';}
					}
				});
				
			} else {$('#searchResultsBox_iso').empty().hide();currentSearchResults='';} 
	  	}
	});

	$('#searchResultsBox_iso').width(250); //Set the width of the suggestion box

	$searchBox_iso.keydown(function(e){
		switch(e.which){
			case 40: // down arrow
				e.preventDefault();
				//if($('#searchResultsBox_iso').is(':hidden')){$('#searchResultsBox_iso').show();}
				$('#searchResultsBox_iso a:first').focus();					
				$('#searchResultsBox_iso li:first').addClass('autocompleter-selected');
				
				break;
			case 38: // up arrow
				e.preventDefault();
				$('#searchResultsBox_iso').hide();currentSearchResults='';
				break;
			case 27: // escape key
				$('#searchResultsBox_iso').hide();currentSearchResults='';
				break;
		}
	});

	$('#searchResultsBox_iso li').live('hover',function(){			
	if($('#searchResultsBox_iso li').hasClass('autocompleter-selected')){
		$('#searchResultsBox_iso li').removeClass('autocompleter-selected');
		$('#searchResultsBox_iso li a').blur();  
	}
	});

	$('#searchResultsBox_iso li').live('click',function(){
	$searchBox_iso.data('oldVal',$(this).text());
	$searchBox_iso.val($(this).children('a').text());
	location.href=$(this).children('a').attr("href");
	
	});	
	$('#searchResultsBox_iso a').live('focus',function(){
	$searchBox_iso.data('oldVal',$(this).text());

	if($.trim($(this).text()) == "SUGGESTED CATEGORIES")
	{
		$searchBox_iso.val($('#searchResultsBox_iso li:first').text());		
	}
	else
	{
		$searchBox_iso.val($(this).text());
	}


	});

	$('#searchResultsBox_iso a').live('keydown',function(e){
	switch(e.which){
		case 40: // down arrow 
			e.preventDefault();
			if($(this).parent().not(':last-child')){
				$(this).parent().next().children('a').focus();
				listCount++;
				if(listCount > $('#searchResultsBox_iso li').size()-1){
					listCount = $('#searchResultsBox_iso li').size()-1;
				}
				
				$('#searchResultsBox_iso li').eq(listCount).prevAll().removeClass('autocompleter-selected');
				$('#searchResultsBox_iso li').eq(listCount).addClass('autocompleter-selected');
				
			}
			break;
		case 38: // up arrow
			e.preventDefault();
			if($(this).parent().is(':first-child')){
				$('#searchResultsBox_iso').hide();currentSearchResults='';
				$searchBox_iso.focus();
			} else {
				
				listCount--;
				$(this).parent().prev().children('a').focus();
				$('#searchResultsBox_iso li').eq(listCount).nextAll().removeClass('autocompleter-selected');
				$('#searchResultsBox_iso li').eq(listCount).addClass('autocompleter-selected');
			}
			break;
		case 27: // escape key
			$('#searchResultsBox_iso').empty().hide();currentSearchResults='';
			$searchBox_iso.focus();
		break;
	}
	});
	/*$('#searchResultsBox_iso a').live('hover',function(e){

	$("#finddrug").val($(this).text());

	});*/

	$(document).click(function(event) {
		if ($(event.target).closest('#searchResultsBox_iso').get(0) == null) {
		$('#searchResultsBox_iso').hide();currentSearchResults='';
	}
	});
			
	
	/*type ahead in ISO Body page ends*/
/* type ahead in prescription page starts */
	
	$('<ul/>',{'id':'searchResultsBox_prescription'}).appendTo('#termAutoComp_prescription'); 
	var currentSearchResults = '';
	var listCount;
	var $searchBox_prescription = $('#termAutoComp_prescription input.query_prescription');
	$searchBox_prescription.data('oldVal', $searchBox_prescription);
	$searchBox_prescription.bind('propertychange keyup input paste', function(e){
		var currentSearchValue = $searchBox_prescription.val();
				
		if ($searchBox_prescription.data('oldVal') != currentSearchValue) {
			$searchBox_prescription.data('oldVal', currentSearchValue);
			if(currentSearchValue.length >= 3){
				var testFlag="drug";
				$.ajax({
					url:'/pharmacy/refillhub/refillhub_typeahead_ajax.jsp?searchKeyword='+currentSearchValue+"&pharmacy_flag="+"testFlag",
					dataType:'json',
					error:function(){$('#searchResultsBox_prescription').empty().hide();currentSearchResults='';},
					success:function(data) {
						//alert(data.typeAheadList);
						var Results = data.typeAheadList.split('~');
						var numberOfResults = Results.length;
						//alert(numberOfResults);
						if(numberOfResults>=1){
							$('#searchResultsBox_prescription').empty();
							currentSearchResults='';
							listCount=0;
							if (numberOfResults >11){numberOfResults=12;}
							for(x=0;x<=numberOfResults-1;x++){
								//alert(Results[x]);
									currentSearchResults += '<li style="font-size:12px"><a href="javascript:void(0)">' + Results[x] + '</a></li>';
							}
							if($('#searchResultsBox_prescription').is(':hidden')){$('#searchResultsBox_prescription').show()} 
							$('#searchResultsBox_prescription').html(currentSearchResults);
						} else {$('#searchResultsBox_prescription').empty().hide();currentSearchResults='';}
					}
				});
				
			} else {$('#searchResultsBox_prescription').empty().hide();currentSearchResults='';} 
	  	}
	});

	//$('#searchResultsBox_prescription').width(252); //Set the width of the suggestion box

	$searchBox_prescription.keydown(function(e){
		//alert(e.which);
		switch(e.which){
			case 40: // down arrow
				e.preventDefault();
				//if($('#searchResultsBox_prescription').is(':hidden')){$('#searchResultsBox_prescription').show();}
				$('#searchResultsBox_prescription a:first').focus();					
				$('#searchResultsBox_prescription li:first').addClass('autocompleter-selected');
				break;
			case 9:
				e.preventDefault();
				//if($('#searchResultsBox_prescription').is(':hidden')){$('#searchResultsBox_prescription').show();}
				$('#searchResultsBox_prescription a:first').focus();					
				$('#searchResultsBox_prescription li:first').addClass('autocompleter-selected');
				break;
			case 13://enter key
				e.preventDefault();
				$('#pres_search').click();
				break;
			case 38: // up arrow
				e.preventDefault();
				$('#searchResultsBox_prescription').hide();currentSearchResults='';
				break;
			case 27: // escape key
				$('#searchResultsBox_prescription').hide();currentSearchResults='';
				
				break;
		}
	});

	$("#searchResultsBox_prescription li").live('mouseover mouseout',function(event) {
		if (event.type == 'mouseover') {
			//alert('in');
			if($('#searchResultsBox_prescription li').hasClass('autocompleter-selected')){
				$('#searchResultsBox_prescription li').removeClass('autocompleter-selected');
				$('#searchResultsBox_prescription a').blur();
			}
			$(this).children('a').focus();
		  } else {
			  $("#prescription_search").focus();
		  }
	});

	$('#searchResultsBox_prescription li').live('click',function(){
        $searchBox_prescription.data('oldVal',$(this).text());
        var anchor = document.getElementById("omnitureLink");      
              s.linkTrackVars='prop27';
              s_prop27 = "SmartSearch: "+$(this).text();
              setTimeout(function(){s.tl(anchor, 'o')},50); 
              //s.tl(anchor, 'o');
        
        //$("#termAutoComp_transfer > #prescriptionName1").attr("value",$(this).text());
        
        $searchBox_prescription.val($(this).children('a').text());
        //$("#prescriptionName1").val($(this).text());
        $('#searchResultsBox_prescription').hide();
        $('#pres_search').click();
        });  	
	
		$('#searchResultsBox_prescription a').live('focus',function(){
			$searchBox_prescription.data('oldVal',$(this).text());
	
			if($.trim($(this).text()) == "SUGGESTED CATEGORIES")
			{
				$searchBox_prescription.val($('#searchResultsBox_prescription li:first').text());		
			}
			else
			{
				$searchBox_prescription.val($(this).text());
			}
	
	
			});

		$('#searchResultsBox_prescription a').live('keydown',function(e){
			
			
			switch(e.which){
				case 40: // down arrow 
					e.preventDefault();
					if($(this).parent().not(':last-child')){
						$(this).parent().next().children('a').focus();
						listCount++;
						if(listCount > $('#searchResultsBox_prescription li').size()-1){
							listCount = $('#searchResultsBox_prescription li').size()-1;
						}
						
						$('#searchResultsBox_prescription li').eq(listCount).prevAll().removeClass('autocompleter-selected');
						$('#searchResultsBox_prescription li').eq(listCount).addClass('autocompleter-selected');
						
					}
					break;
				case 9: //tab key
					e.preventDefault();
					if($(this).parent().not(':last-child')){
						$(this).parent().next().children('a').focus();
						listCount++;
						if(listCount > $('#searchResultsBox_prescription li').size()-1){
							listCount = $('#searchResultsBox_prescription li').size()-1;
						}
						
						$('#searchResultsBox_prescription li').eq(listCount).prevAll().removeClass('autocompleter-selected');
						$('#searchResultsBox_prescription li').eq(listCount).addClass('autocompleter-selected');
						
					}
					break;
				case 13://enter key
					e.preventDefault();
                    $searchBox_prescription.val($(this).text());
                    var anchor = document.getElementById("omnitureLink"); 
                    s.linkTrackVars='prop27';
                    s_prop27 = "SmartSearch: "+$(this).text();      
                    //s.tl(anchor, 'o');
                    setTimeout(function(){s.tl(anchor, 'o')},60); 
                    $('#pres_search').click();
                    break;
				case 38: // up arrow
					e.preventDefault();
					if($(this).parent().is(':first-child')){
						$('#searchResultsBox_prescription').hide();currentSearchResults='';
						$searchBox_prescription.focus();
					} else {
						
						listCount--;
						$(this).parent().prev().children('a').focus();
						$('#searchResultsBox_prescription li').eq(listCount).nextAll().removeClass('autocompleter-selected');
						$('#searchResultsBox_prescription li').eq(listCount).addClass('autocompleter-selected');
					}
					break;
				case 27: // escape key
					$('#searchResultsBox_prescription').empty().hide();currentSearchResults='';
					$searchBox_prescription.focus();
					
				break;
			}
			});
	
		$(document).click(function(event) {
			if ($(event.target).closest('#searchResultsBox_prescription').get(0) == null) {
			$('#searchResultsBox_prescription').hide();currentSearchResults='';
		}
		});
	/* type head in prescription page ends */
	
	
});
//Tab implementation
	$().ready(function() {
	     $("#tab-description").click(function(e){
	    	 e.preventDefault(); 
				$("#tab-uses").removeClass('on');
				$("#tab-shipping").removeClass('on');
				$("#tab-warnings").removeClass('on');
				$("#tab-ingredients").removeClass('on');
				$("#tab-description").addClass('on');

				$("#shipTab1").attr('title','Shipping - Tab');
				$("#descTab1").attr('title','Description - Tab - Active');
				$("#usesTab1").attr('title','Uses - Tab');
				$("#ingreditentsTab1").attr('title','Ingredients - Tab');
				$("#warningsTab1").attr('title','Warnings - Tab');
				
				$("#uses-content").addClass('hide');
				$("#shipping-content").addClass('hide');
				$("#warnings-content").addClass('hide');
				$("#ingredients-content").addClass('hide');
				$("#description-content").removeClass('hide');
				});
	  });
		
		$().ready(function() {
		     $("#tab-uses").click(function(e){
		    	 e.preventDefault(); 
					$("#tab-description").removeClass('on');
					$("#tab-shipping").removeClass('on');
					$("#tab-warnings").removeClass('on');
					$("#tab-ingredients").removeClass('on');
					$("#tab-uses").addClass('on');

					$("#shipTab1").attr('title','Shipping - Tab');
					$("#descTab1").attr('title','Description - Tab');
					$("#usesTab1").attr('title','Uses - Tab - Active');
					$("#ingreditentsTab1").attr('title','Ingredients - Tab');
					$("#warningsTab1").attr('title','Warnings - Tab');

					$("#description-content").addClass('hide');
					$("#shipping-content").addClass('hide');
					$("#warnings-content").addClass('hide');
					$("#ingredients-content").addClass('hide');
					$("#uses-content").removeClass('hide');
					});
		  });
		
		$().ready(function() {
		     $("#tab-shipping").click(function(e){
		    	 e.preventDefault(); 
					$("#tab-description").removeClass('on');
					$("#tab-uses").removeClass('on');
					$("#tab-warnings").removeClass('on');
					$("#tab-ingredients").removeClass('on');
					$("#tab-shipping").addClass('on');
					
					$("#shipTab1").attr('title','Shipping - Tab - Active');
					$("#descTab1").attr('title','Description - Tab');
					$("#usesTab1").attr('title','Uses - Tab');
					$("#ingreditentsTab1").attr('title','Ingredients - Tab');
					$("#warningsTab1").attr('title','Warnings - Tab');

					$("#description-content").addClass('hide');
					$("#uses-content").addClass('hide');
					$("#warnings-content").addClass('hide');
					$("#ingredients-content").addClass('hide');
					$("#shipping-content").removeClass('hide');
					});
		  });
		
		$().ready(function() {
		     $("#tab-warnings").click(function(e){
		    	 e.preventDefault(); 
					$("#tab-description").removeClass('on');
					$("#tab-uses").removeClass('on');
					$("#tab-shipping").removeClass('on');
					$("#tab-ingredients").removeClass('on');
					$("#tab-warnings").addClass('on');

					$("#shipTab1").attr('title','Shipping - Tab');
					$("#descTab1").attr('title','Description - Tab');
					$("#usesTab1").attr('title','Uses - Tab');
					$("#ingreditentsTab1").attr('title','Ingredients - Tab');
					$("#warningsTab1").attr('title','Warnings - Tab - Active');

					$("#description-content").addClass('hide');
					$("#uses-content").addClass('hide');
					$("#shipping-content").addClass('hide');
					$("#ingredients-content").addClass('hide');
					$("#warnings-content").removeClass('hide');
					});
		  });
		
		$().ready(function() {
		     $("#tab-ingredients").click(function(e){
		    	 e.preventDefault(); 
					$("#tab-description").removeClass('on');
					$("#tab-uses").removeClass('on');
					$("#tab-shipping").removeClass('on');
					$("#tab-warnings").removeClass('on');
					$("#tab-ingredients").addClass('on');

					$("#shipTab1").attr('title','Shipping - Tab');
					$("#descTab1").attr('title','Description - Tab');
					$("#usesTab1").attr('title','Uses - Tab');
					$("#ingreditentsTab1").attr('title','Ingredients - Tab - Active');
					$("#warningsTab1").attr('title','Warnings - Tab');

					$("#description-content").addClass('hide');
					$("#uses-content").addClass('hide');
					$("#shipping-content").addClass('hide');
					$("#warnings-content").addClass('hide');
					$("#ingredients-content").removeClass('hide');
					});
		  });		
		$().ready(function(){
			$('#freeze1 .termAutoComp_tab #prescription_search').keydown(function(e){
				if(e.which==9){$(this).blur();$('#pres_search').focusin()};
			});
		});
		
/* Added for IN-871 - contactus */
function calcTextLimit(obj, maxCount, showCount){
	var charText = obj.value;
	var len = charText.length;
	if(len > maxCount){
        charText = charText.substring(0, maxCount);
        obj.value = charText;	
        return false;
    }

	if(showCount=="myCounterForSubject"){
		if (len > 0) document.getElementById("msg1").innerHTML="character left";
		else document.getElementById("msg1").innerHTML="character max";
		document.getElementById(showCount).innerHTML = maxCount-len;
	}else{
		if (len > 0) document.getElementById("msg").innerHTML="character left";
		else document.getElementById("msg").innerHTML="character max";
		document.getElementById(showCount).innerHTML = maxCount-len;
	}

	if (len < 3925) { document.getElementById("msg").style.color='Black';	
		document.getElementById("myCounter").style.color='Black'; }
	else { document.getElementById("msg").style.color='Red';
		document.getElementById("myCounter").style.color='Red'; }
}
(function(a){function l(a,b,c){switch(a){case"round":return Math.round(c*(1-Math.cos(Math.asin(b/c))))}}function k(b){while(b){var c=a.css(b,"backgroundColor"),d;if(c&&c!="transparent"&&c!="rgba(0, 0, 0, 0)"){if(c.indexOf("rgb")>=0){d=c.match(/\d+/g);return"#FFFFFF";}return c}if(b.nodeName.toLowerCase()=="html")break;b=b.parentNode}return"#ffffff"}var b=document.createElement("div").style,c=b["MozBorderRadius"]!==undefined,d=b["WebkitBorderRadius"]!==undefined,e=b["borderRadius"]!==undefined||b["BorderRadius"]!==undefined,f=document.documentMode||0,g=a.browser.msie&&(a.browser.version<8&&!f||f<8),h=a.browser.msie&&function(){var a=document.createElement("div");try{a.style.setExpression("width","0+0");a.style.removeExpression("width")}catch(b){return false}return true}();a.support=a.support||{};a.support.borderRadius=c||d||e;a.fn.corner=function(b){if(this.length==0){if(!a.isReady&&this.selector){var f=this.selector,j=this.context;a(function(){a(f,j).corner(b)})}return this}return this.each(function(f){var j=a(this),m=[j.attr(a.fn.corner.defaults.metaAttr)||"",b||""].join(" ").toLowerCase(),n=/keep/.test(m),o=(m.match(/cc:(#[0-9a-f]+)/)||[])[1],p=(m.match(/sc:(#[0-9a-f]+)/)||[])[1],q=parseInt((m.match(/(\d+)px/)||[])[1])||10,r=/round|bevelfold|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dogfold|dog|invsteep|steep/,s=(m.match(r)||["round"])[0],t=/dogfold|bevelfold/.test(m),u={T:0,B:1},v={TL:/top|tl|left/.test(m),TR:/top|tr|right/.test(m),BL:/bottom|bl|left/.test(m),BR:/bottom|br|right/.test(m)},w,x,y,z,A,B,C,D,E,F,G,H,I,J;if(!v.TL&&!v.TR&&!v.BL&&!v.BR)v={TL:1,TR:1,BL:1,BR:1};w=document.createElement("div");a(w).css({overflow:"hidden",height:"1px",minHeight:"1px",fontSize:"1px",backgroundColor:p||"transparent",borderStyle:"solid"});x={T:parseInt(a.css(this,"paddingTop"))||0,R:parseInt(a.css(this,"paddingRight"))||0,B:parseInt(a.css(this,"paddingBottom"))||0,L:parseInt(a.css(this,"paddingLeft"))||0};if(typeof this.style.zoom!=undefined)this.style.zoom=1;if(!n)this.style.border="none";w.style.borderColor=o||k(this.parentNode);y=a(this).outerHeight();for(z in u){A=u[z];if(A&&(v.BL||v.BR)||!A&&(v.TL||v.TR)){w.style.borderStyle="none "+(v[z+"R"]?"solid":"none")+" none "+(v[z+"L"]?"solid":"none");B=document.createElement("div");a(B).addClass("jquery-corner");C=B.style;A?this.appendChild(B):this.insertBefore(B,this.firstChild);if(A&&y!="auto"){if(a.css(this,"position")=="static")this.style.position="relative";C.position="absolute";C.bottom=C.left=C.padding=C.margin="0";if(h)C.setExpression("width","this.parentNode.offsetWidth");else C.width="100%"}else if(!A&&a.browser.msie){if(a.css(this,"position")=="static")this.style.position="relative";C.position="absolute";C.top=C.left=C.right=C.padding=C.margin="0";if(h){C.setExpression("width","this.parentNode.offsetWidth - "+D+'+ "px"')}else C.width="100%"}else{C.position="relative";C.margin=!A?"-"+x.T+"px -"+x.R+"px "+(x.T-q)+"px -"+x.L+"px":x.B-q+"px -"+x.R+"px -"+x.B+"px -"+x.L+"px"}for(E=0;E<q;E++){F=Math.max(0,l(s,E,q));G=w.cloneNode(false);G.style.borderWidth="0 "+(v[z+"R"]?F:0)+"px 0 "+(v[z+"L"]?F:0)+"px";A?B.appendChild(G):B.insertBefore(G,B.firstChild)}if(t&&a.support.boxModel){if(A&&g)continue;for(H in v){if(!v[H])continue;if(A&&(H=="TL"||H=="TR"))continue;if(!A&&(H=="BL"||H=="BR"))continue;I={position:"absolute",border:"none",margin:0,padding:0,overflow:"hidden",backgroundColor:w.style.borderColor};J=a("<div/>").css(I).css({width:q+"px",height:"1px"});switch(H){case"TL":J.css({bottom:0,left:0});break;case"TR":J.css({bottom:0,right:0});break;case"BL":J.css({top:0,left:0});break;case"BR":J.css({top:0,right:0});break}B.appendChild(J[0]);var K=a("<div/>").css(I).css({top:0,bottom:0,width:"1px",height:q+"px"});switch(H){case"TL":K.css({left:q});break;case"TR":K.css({right:q});break;case"BL":K.css({left:q});break;case"BR":K.css({right:q});break}B.appendChild(K[0])}}}}})};a.fn.corner.defaults={useNative:true,metaAttr:"data-corner"}})(jQuery)

function showStoreLocToolTipTop(){
	var strtooltip=$('#storeLocToolTip').clone(true);
	strtooltip.attr('id','dynaToolTip'); 
	$(".left-shadow").append(strtooltip); 
	$("#dynaToolTip").css({'position':'absolute','left':210,'top':78}).show();  
}
function hideStoreLocToolTipTop(){
	$('#dynaToolTip').hide().remove();
}