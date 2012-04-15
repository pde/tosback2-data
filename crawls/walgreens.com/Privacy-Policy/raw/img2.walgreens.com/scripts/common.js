
var totalResultsLength;
var nextIndex = 0;
var currentIndex = 0;
var offset = 5;
var defOffSet = 5;
var cStart;
var pht=0;
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
	
    //Eternal Links
	if($('#query')) {
		var winloc = window.location+'';
		var showtext = '';
		if(winloc.indexOf('webpickup')!=-1)showtext = 'Search your local store'; 
		else showtext = 'Search Site';
		if($('#query').val()=='') {
			$('#query').val(showtext);
			$('#query').attr('style','color:#6b747c');
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
			}
			else {
				if($('#query').val()=='') {
					$('#query').val(showtext);
					$('#query').attr('style','color:#6b747c');
					pht=1;
				}
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
                top: (size + 10),
                width: '107px'
            }
        })
        var quickLook = $('<a/>', {
            href: '/store/browse/overlays/quick_view_details.jsp' + qs,
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
    var nameLOGIN = "ACO_LOGIN" + "=";
    
    var cks = document.cookie.split(';');
    for (var i = 0; i < cks.length && (!loginStat); i++) {
        var c = trim(cks[i]);
        if (c.indexOf(nameLOGIN) == 0) {
            loginStat = c.substring(nameLOGIN.length, c.length);
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
	var listCount;
	var $searchBox = $('#termAutoComp input.textfield');
	$searchBox.data('oldVal', $searchBox);
	$searchBox.bind('propertychange keyup input paste', function(e){
		var currentSearchValue = $searchBox.val();
		if ($searchBox.data('oldVal') != currentSearchValue) {
			$searchBox.data('oldVal', currentSearchValue);
			if(currentSearchValue.length >= 3){
				$.ajax({
					url:'/marketing/termsearch/termquery.html?query='+currentSearchValue,
					dataType:'json',
					error:function(){$('#searchResultsBox').empty().hide();currentSearchResults='';},
					success:function(data) {
						var numberOfResults = (data.ResultSet.totalResultsAvailable);
						
						if(numberOfResults>=1){
							$('#searchResultsBox').empty();
							currentSearchResults='';
							listCount=0;
							if (numberOfResults >10){numberOfResults=12;}
							for(x=0;x<=numberOfResults-1;x++){
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
										} else {
											var resultText = resultTerm.replace(currentSearchValue,'<b>' + currentSearchValue + '</b>');
											currentSearchResults += '<li style="font-size:12px"><a href="/search/results.jsp?Ntt=' + resultTerm + '">' + resultText + '</a></li>';
										}									}
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
		if ($('#query').val() == 'Search Site' || $('#query').val() == 'Search your local store'){
			$('#query').val('');
		}
		  return true;
	});
	
	if($('#back')) {
		$('#back').attr('href', '#');
		$('back').live("click", function(){
			self.window.close();
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
