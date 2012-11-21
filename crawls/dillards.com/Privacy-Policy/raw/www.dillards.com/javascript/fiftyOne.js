//<%--   /*
//* COPYRIGHT NOTICE
//*
//* This software is the copyrighted work of Dillard's, Inc.  The software is
//* made available solely for use for the benefit of and as authorized by Dillard's, Inc.
//* Use of the software for any other purpose, and any reproduction or
//* redistribution of the software (or any portion thereof) in any form to any other person, firm or entity,
//* are expressly prohibited, and may result in severe civil and criminal penalties. Violators will be
//* prosecuted to the maximum extent possible.
//* WITHOUT LIMITING THE FOREGOING, COPYING OR REPRODUCTION OF THE SOFTWARE FOR FURTHER REPRODUCTION
//* OR REDISTRIBUTION EXPRESSLY PROHIBITED.
//*
//*Copyright C Dillard's, Inc., 1600 Cantrell Rd., Little Rock, AR 72201 U.S.A. All rights reserved.
//*
//* Revision History
//-----------------------------------------------------------------------------
//* Date		Change #	Author		Description
//* 07/02/12  			woodse		New. Builds fiftyOne.js file
//--%>



//DO NOT MODIFY THIS FILE DIRECTLY! Java Batch (FiftyOneConversionBuilder.java) builds this js file daily.


	var countryCodeArray = new Array();
		countryCodeArray[0]="ANTIGUA AND BARBUDA|AG|USD|1.2000000000|8295";
		countryCodeArray[1]="ARGENTINA|AR|ARS|1.2000000000|8295";
		countryCodeArray[2]="ARUBA|AW|USD|1.2000000000|8295";
		countryCodeArray[3]="AUSTRALIA|AU|AUD|1.2000000000|8295";
		countryCodeArray[4]="AUSTRIA|AT|EUR|1.2000000000|8295";
		countryCodeArray[5]="BAHRAIN|BH|BHD|1.2000000000|8295";
		countryCodeArray[6]="BANGLADESH|BD|BDT|1|0";
		countryCodeArray[7]="BARBADOS|BB|BBD|1.2000000000|8295";
		countryCodeArray[8]="BELGIUM|BE|EUR|1.2000000000|8295";
		countryCodeArray[9]="BELIZE|BZ|BZD|1.2000000000|8295";
		countryCodeArray[10]="BERMUDA|BM|USD|1.2000000000|8295";
		countryCodeArray[11]="BOLIVIA|BO|BOB|1.2000000000|8295";
		countryCodeArray[12]="BRAZIL|BR|BRL|1.2000000000|8295";
		countryCodeArray[13]="BRUNEI|BN|USD|1|0";
		countryCodeArray[14]="BULGARIA|BG|BGN|1|0";
		countryCodeArray[15]="CAMBODIA|KH|KHR|1|0";
		countryCodeArray[16]="CANADA|CA|CAD|1.2000000000|8295";
		countryCodeArray[17]="CAYMAN ISLANDS|KY|KYD|1.2000000000|8295";
		countryCodeArray[18]="CHILE|CL|CLP|1.2000000000|8295";
		countryCodeArray[19]="CHINA|CN|CNY|1.2000000000|8295";
		countryCodeArray[20]="COLOMBIA|CO|COP|1.2000000000|8295";
		countryCodeArray[21]="COSTA RICA|CR|CRC|1.2000000000|8295";
		countryCodeArray[22]="CYPRUS|CY|EUR|1|0";
		countryCodeArray[23]="CZECH REPUBLIC|CZ|CZK|1|0";
		countryCodeArray[24]="DENMARK|DK|DKK|1.2000000000|8295";
		countryCodeArray[25]="DOMINICA|DM|USD|1|0";
		countryCodeArray[26]="DOMINICAN REPUBLIC|DO|DOP|1.2000000000|8295";
		countryCodeArray[27]="ECUADOR|EC|USD|1.2000000000|8295";
		countryCodeArray[28]="EGYPT|EG|EGP|1|0";
		countryCodeArray[29]="EL SALVADOR|SV|SVC|1|0";
		countryCodeArray[30]="ESTONIA|EE|EUR|1|0";
		countryCodeArray[31]="FINLAND|FI|EUR|1.2000000000|8295";
		countryCodeArray[32]="FRANCE|FR|EUR|1.2000000000|8295";
		countryCodeArray[33]="FRENCH GUIANA|GF|EUR|1|0";
		countryCodeArray[34]="GERMANY|DE|EUR|1.2000000000|8295";
		countryCodeArray[35]="GIBRALTAR|GI|GBP|1.2000000000|8295";
		countryCodeArray[36]="GREECE|GR|EUR|1.2000000000|8295";
		countryCodeArray[37]="GRENADA|GD|USD|1|0";
		countryCodeArray[38]="GUADELOUPE|GP|EUR|1|0";
		countryCodeArray[39]="GUATEMALA|GT|GTQ|1.2000000000|8295";
		countryCodeArray[40]="GUERNSEY (UK)|GG|GBP|1|0";
		countryCodeArray[41]="HONDURAS|HN|HNL|1.2000000000|8295";
		countryCodeArray[42]="HONG KONG|HK|HKD|1.2000000000|8295";
		countryCodeArray[43]="HUNGARY|HU|HUF|1|0";
		countryCodeArray[44]="ICELAND|IS|EUR|1.2000000000|8295";
		countryCodeArray[45]="INDIA|IN|INR|1.2000000000|8295";
		countryCodeArray[46]="INDONESIA|ID|IDR|1.2000000000|8295";
		countryCodeArray[47]="IRELAND|IE|EUR|1.2000000000|8295";
		countryCodeArray[48]="ISRAEL|IL|ILS|1.2000000000|8295";
		countryCodeArray[49]="ITALY|IT|EUR|1.2000000000|8295";
		countryCodeArray[50]="JAMAICA|JM|JMD|1.2000000000|8295";
		countryCodeArray[51]="JAPAN|JP|JPY|1.2000000000|8295";
		countryCodeArray[52]="JERSEY (UK)|JE|GBP|1|0";
		countryCodeArray[53]="JORDAN|JO|JOD|1.2000000000|8295";
		countryCodeArray[54]="KUWAIT|KW|KWD|1.2000000000|8295";
		countryCodeArray[55]="LATVIA|LV|LVL|1|0";
		countryCodeArray[56]="LIECHTENSTEIN|LI|EUR|1.2000000000|8295";
		countryCodeArray[57]="LITHUANIA|LT|LTL|1|0";
		countryCodeArray[58]="LUXEMBOURG|LU|EUR|1.2000000000|8295";
		countryCodeArray[59]="MACAU|MO|HKD|1|0";
		countryCodeArray[60]="MALDIVES|MV|MVR|1|0";
		countryCodeArray[61]="MALTA|MT|EUR|1|0";
		countryCodeArray[62]="MARTINIQUE|MQ|EUR|1.2000000000|8295";
		countryCodeArray[63]="MEXICO|MX|MXN|1.2000000000|8295";
		countryCodeArray[64]="MONACO|MC|EUR|1|0";
		countryCodeArray[65]="MONTSERRAT|MS|USD|1.2000000000|8295";
		countryCodeArray[66]="NETHERLANDS|NL|EUR|1.2000000000|8295";
		countryCodeArray[67]="NEW ZEALAND|NZ|NZD|1.2000000000|8295";
		countryCodeArray[68]="NICARAGUA|NI|NIO|1.2000000000|8295";
		countryCodeArray[69]="NORWAY|NO|NOK|1.2000000000|8295";
		countryCodeArray[70]="OMAN|OM|OMR|1|0";
		countryCodeArray[71]="PAKISTAN|PK|PKR|1|0";
		countryCodeArray[72]="PANAMA|PA|PAB|1.2000000000|8295";
		countryCodeArray[73]="PARAGUAY|PY|PYG|1.2000000000|8295";
		countryCodeArray[74]="PERU|PE|PEN|1.2000000000|8295";
		countryCodeArray[75]="PHILIPPINES|PH|PHP|1.2000000000|8295";
		countryCodeArray[76]="POLAND|PL|PLN|1.2000000000|8295";
		countryCodeArray[77]="PORTUGAL|PT|EUR|1.2000000000|8295";
		countryCodeArray[78]="QATAR|QA|QAR|1.2000000000|8295";
		countryCodeArray[79]="REUNION|RE|EUR|1|0";
		countryCodeArray[80]="ROMANIA|RO|RON|1|0";
		countryCodeArray[81]="RUSSIAN FEDERATION|RU|RUB|1|0";
		countryCodeArray[82]="SAINT KITTS AND NEVIS|KN|USD|1.2000000000|8295";
		countryCodeArray[83]="SAINT LUCIA|LC|USD|1.2000000000|8295";
		countryCodeArray[84]="SAUDI ARABIA|SA|SAR|1.2000000000|8295";
		countryCodeArray[85]="SINGAPORE|SG|SGD|1.2000000000|8295";
		countryCodeArray[86]="SLOVAKIA|SK|EUR|1|0";
		countryCodeArray[87]="SLOVENIA|SI|EUR|1|0";
		countryCodeArray[88]="SOUTH AFRICA|ZA|ZAR|1.2000000000|8295";
		countryCodeArray[89]="SOUTH KOREA|KR|KRW|1.2000000000|8295";
		countryCodeArray[90]="SPAIN|ES|EUR|1.2000000000|8295";
		countryCodeArray[91]="SRI LANKA|LK|LKR|1|0";
		countryCodeArray[92]="SWEDEN|SE|SEK|1.2000000000|8295";
		countryCodeArray[93]="SWITZERLAND|CH|CHF|1.2000000000|8295";
		countryCodeArray[94]="TAIWAN|TW|TWD|1.2000000000|8295";
		countryCodeArray[95]="THAILAND|TH|THB|1.2000000000|8295";
		countryCodeArray[96]="TRINIDAD AND TOBAGO|TT|USD|1.2000000000|8295";
		countryCodeArray[97]="TURKEY|TR|TRY|1.2000000000|8295";
		countryCodeArray[98]="TURKS AND CAICOS ISLANDS|TC|USD|1.2000000000|8295";
		countryCodeArray[99]="UNITED ARAB EMIRATES|AE|AED|1.2000000000|8295";
		countryCodeArray[100]="UNITED KINGDOM|GB|GBP|1.2000000000|8295";
		countryCodeArray[101]="UNITED STATES|US|USD|1|0";

	var currencyCodeArray = new Array();
		currencyCodeArray[0]="United Arab Emirates Dirham|AED|3.9504400000|2|28104811";
		currencyCodeArray[1]="Argentine Peso|ARS|5.1113400000|2|28104812";
		currencyCodeArray[2]="Australian Dollar|AUD|1.0252300000|1|28104813";
		currencyCodeArray[3]="Barbados Dollar|BBD|2.1402600000|2|28104814";
		currencyCodeArray[4]="Taka|BDT|87.8689000000|2|28104815";
		currencyCodeArray[5]="Bulgarian Lev|BGN|1.6308900000|2|28104816";
		currencyCodeArray[6]="Bahraini Dinar|BHD|0.4054980000|2|28104817";
		currencyCodeArray[7]="Boliviano|BOB|7.5930700000|2|28104818";
		currencyCodeArray[8]="Brazilian Real|BRL|2.1825300000|1|28104819";
		currencyCodeArray[9]="Belize Dollar|BZD|2.1617700000|2|28104820";
		currencyCodeArray[10]="Canadian Dollar|CAD|1.0479000000|2|28104821";
		currencyCodeArray[11]="Swiss Franc|CHF|1.0083900000|1|28104822";
		currencyCodeArray[12]="Chilean Peso|CLP|518.2860000000|-1|28104823";
		currencyCodeArray[13]="Yuan Renminbi|CNY|6.7155700000|2|28104824";
		currencyCodeArray[14]="Colombian Peso|COP|1966.4500000000|-2|28104825";
		currencyCodeArray[15]="Costa Rican Colon|CRC|538.2910000000|2|28104826";
		currencyCodeArray[16]="Czech Koruna|CZK|20.8960000000|0|28104827";
		currencyCodeArray[17]="Danish Krone|DKK|6.2206200000|0|28104828";
		currencyCodeArray[18]="Dominican Peso|DOP|42.6438000000|2|28104829";
		currencyCodeArray[19]="Egyptian Pound|EGP|6.5686600000|1|28104830";
		currencyCodeArray[20]="Euro|EUR|0.8220110000|2|28104831";
		currencyCodeArray[21]="British Pound|GBP|0.6604340000|2|28104832";
		currencyCodeArray[22]="Quetzal|GTQ|8.4717700000|2|28104833";
		currencyCodeArray[23]="Hong Kong Dollar|HKD|8.3361400000|2|28104834";
		currencyCodeArray[24]="Lempira|HNL|21.1875000000|2|28104835";
		currencyCodeArray[25]="Hungarian Forint|HUF|237.9230000000|0|28104836";
		currencyCodeArray[26]="Indonesian Rupiah|IDR|10335.6000000000|-2|28104837";
		currencyCodeArray[27]="Israeli Shekel|ILS|4.1804900000|1|28104838";
		currencyCodeArray[28]="Indian Rupee|INR|58.1742000000|0|28104839";
		currencyCodeArray[29]="Jamaican Dollar|JMD|97.6345000000|2|28104840";
		currencyCodeArray[30]="Jordanian Dinar|JOD|0.7614580000|2|28104841";
		currencyCodeArray[31]="Japanese Yen|JPY|84.4498000000|0|28104842";
		currencyCodeArray[32]="Riel|KHR|4347.2000000000|2|28104843";
		currencyCodeArray[33]="Korean Won|KRW|1180.8000000000|0|28104844";
		currencyCodeArray[34]="Kuwaiti Dinar|KWD|0.3028950000|2|28104845";
		currencyCodeArray[35]="Cayman Islands Dollar|KYD|0.8926700000|2|28104846";
		currencyCodeArray[36]="Sri Lanka Rupee|LKR|139.7080000000|2|28104847";
		currencyCodeArray[37]="Lithuanian Litas|LTL|2.8789200000|2|28104848";
		currencyCodeArray[38]="Latvian Lats|LVL|0.5806660000|2|28104849";
		currencyCodeArray[39]="Rufiyaa|MVR|16.8532000000|2|28104851";
		currencyCodeArray[40]="Mexican Peso|MXN|14.0509000000|0|28104852";
		currencyCodeArray[41]="Cordoba Oro|NIO|25.7164000000|2|28104853";
		currencyCodeArray[42]="Norwegian Krone|NOK|6.2176100000|0|28104854";
		currencyCodeArray[43]="New Zealand Dollar|NZD|1.3125600000|1|28104856";
		currencyCodeArray[44]="Omani Rial|OMR|0.4141020000|2|28104857";
		currencyCodeArray[45]="Balboa|PAB|1.0675000000|2|28104858";
		currencyCodeArray[46]="Peruvian Nuevo Sol|PEN|2.7973900000|1|28104859";
		currencyCodeArray[47]="Philippine Peso|PHP|44.4130000000|0|28104860";
		currencyCodeArray[48]="Pakistan Rupee|PKR|103.1950000000|2|28104861";
		currencyCodeArray[49]="Polish Zloty|PLN|3.4600100000|2|28104862";
		currencyCodeArray[50]="Guarani|PYG|4829.0300000000|0|28104863";
		currencyCodeArray[51]="Qatari Riyal|QAR|3.9162400000|2|28104864";
		currencyCodeArray[52]="New Romanian Leu|RON|3.7924500000|2|28104865";
		currencyCodeArray[53]="Russian Ruble|RUB|33.8865000000|2|28104866";
		currencyCodeArray[54]="Saudi Riyal|SAR|4.0335800000|1|28104867";
		currencyCodeArray[55]="Swedish Krona|SEK|7.1865400000|0|28104868";
		currencyCodeArray[56]="Singapore Dollar|SGD|1.3140500000|1|28104869";
		currencyCodeArray[57]="Thai Baht|THB|33.0826000000|0|28104871";
		currencyCodeArray[58]="Turkish Lira|TRY|1.9406400000|1|28104872";
		currencyCodeArray[59]="Taiwan Dollar|TWD|31.4866000000|0|28104873";
		currencyCodeArray[60]="US Dollar|USD|1.0000000000|2|28104875";
		currencyCodeArray[61]="South African Rand|ZAR|9.3617400000|1|28104876";

	function setCookies(cookieName,codeValue){
		$.cookie(cookieName, codeValue,{ path: '/', domain: '.dillards.com' });
	}
	function getCookieValues(cookieName){
		return $.cookie(cookieName);
	}
	function calculateNewPrice(price,exchangeRate,FLC,roundMethod,qty){
		//If the Round_Method digit is a positive value, the rounding is to the right of the decimal point
		//("1" for tenths, "2" for hundredths, "3" for thousandths, etc).
		//If the Round_Method digit is zero, round to the nearest whole number.
		//If the Round_Method digit is a negative value, the rounding is to the left of the decimal point
		//("-1" for tens, "-2" for hundreds, "-3" for thousands, etc).
		if(!FLC) var FLC= 1;
		if(!qty) var qty= 1;
		var amt = parseFloat(price * exchangeRate * FLC);
		var calcPrice =  round(amt,roundMethod);
		var newPrice = calcPrice * qty;
		return newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function round(price,roundMethod) {
		var multiple = Math.pow(10, roundMethod);
		var rndedNum = Math.round(price * multiple) / multiple;
		return rndedNum;
	}
	function calculateCartSubTotal(roundMethod){
		var cartTotal = 0;
		$("div").each(function (index) {
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					if ($(this).is("#cart-table")) {
						$(this).children(this).children('tr').each(function () {
							if($(this).find('.big-price')){
								var itemPrice = $(this).find('.big-price').text().replace('$','').replace(',','');
								if(itemPrice != ""){
									cartTotal = parseFloat(itemPrice.substring(4).replace(',','')) + parseFloat(cartTotal);
								}
							}
						});
					}
				});
			}
		}); 
		return round(cartTotal,roundMethod).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function calculateCartDiscounts(roundMethod){
		var cartDiscount = 0;
		$("div").each(function (index) {
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					if ($(this).is("#cart-table")) {
						$(this).children(this).children(this).each(function () {
							if($(this).is('.noborder')){
								if($(this).find('.discount')){
									var itemPrice = $(this).find('.discount').text().replace('$','').replace(',','');
									if(itemPrice != ""){
										cartDiscount = parseFloat(itemPrice.substring(4).replace(',','')) + parseFloat(cartDiscount);
									}
								}
							}
						});
					}
				});
			}
		}); 
		return round(cartDiscount,roundMethod).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function calculateCartTotal(roundMethod){
		var subtotal = 0;
		$("div").each(function (index) {
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					if ($(this).is("#cart-table")) {
						$(this).children(this).children('tr').each(function () {
							if($(this).find('.big-price')){
								var itemPrice = $(this).find('.big-price').text().replace('$','').replace(',','');
								if(itemPrice != ""){
									subtotal = parseFloat(itemPrice.substring(4).replace(',','')) + parseFloat(subtotal);
								}
							}
						});
					}
				});
			}
		}); 

		var cartDiscount = 0;
		$("div").each(function (index) {
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					if ($(this).is("#cart-table")) {
						$(this).children(this).children(this).each(function () {
							if($(this).is('.noborder')){
								if($(this).find('.discount')){
									var itemPrice = $(this).find('.discount').text().replace('$','').replace(',','');
									if(itemPrice != ""){
										cartDiscount = parseFloat(itemPrice.substring(4).replace(',','')) + parseFloat(cartDiscount);
									}
								}
							}
						});
					}
				});
			}
		}); 

		var totalWithDiscounts = subtotal +  cartDiscount;
		return round(totalWithDiscounts,roundMethod).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	//---------------------------------------------------------//
	// FiftyOne International Visitor Welcome Mat | Nov. 2010
	//---------------------------------------------------------//
	// Write Dynamic JavaScript
	function wlcme51func(url) {
		var wlcme51 = document.createElement("script");
		wlcme51.src = url;
		wlcme51.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(wlcme51);
	}
	// Drop / Check for cookie to ensure visitor only sees Welcome Mat once per session
	function isWelcome() {
		var c_name = 'wlcme';
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				//alert (document.cookie.substring(c_start, c_end));
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}
	function isSupportedCountry(countryCode){
		var supported = 'N';
		if(countryCode != null || countryCode != "")
		{
			for (var i = 0; i < countryCodeArray.length; i++)
			{
				var ccArrayValueSplit = countryCodeArray[i].split('|');
				if(ccArrayValueSplit[1] == countryCode){
					supported = 'Y';
					break;
				}
			}
		}
		return supported;
	}
	function launchWelcomeMat(countryCode){
		var supportCountry = isSupportedCountry(countryCode);
		// If first page view per session, launch the Welcome Mat
		if (!isWelcome() && supportCountry == 'Y') {
			var urlString = "https://sandbox.fiftyone.com/welcome/welcome.srv";

			wlcme51func(urlString + "?merchId=3706&countryId=" +countryCode + "&setCookie=Y");
		}
	}
	function localizeHeaderFooter(countryCode,exchangeRate,FLC,roundMethod,currencyCode){
		$("#imgFlagCode").append('<img src="/images/flags/'+countryCode+'.gif" alt= "" border="0" height="16" width="25"/>');
		if(countryCode == 'US' || countryCode == '' || countryCode == null){
			$("div").each(function (index) {
				//Start:MyDillards
				if ($(this).is("#myDillardsBar")) {
					$(this).children('div').children('span').children('span').each(function () {
						if($(this).is("#imgFlagCode")){
							$(this).append('<img src="/images/flags/'+countryCode+'.gif" alt= "" border="0" height="16" width="25"/>');
						}
					});
				}
				//End:MyDillards
				//Start: Kana
				if ($(this).is(".us-content")) {
					$(this).css("display","");
				}
				//End: Kana
				//Start: Header Cart Total
				if ($(this).is("#utility-nav")) {
					if ($(this).find('.fiftyOne-cartTotal')) {
						$(this).find('.fiftyOne-cartTotal').css("display","");
						$(this).find('.fiftyOne-cartTotalDollarSign').css("display","");
					}
					$(this).css("display","");
				}
				if($(this).is("#fiftyOneContext")){
					if($(this).children('span').children('a').is('#context-chooser-us')){
						$(this).children('span').children('a').css("display","");
					}
				}
				//End: Header Cart Total
				if ($(this).is("#utility-nav")) {
					$(this).children('ul').children('li').each(function () {
						if($(this).is(".us-nav")){
							$(this).css("display","");
						}
					});
				}
				//header supers
				if ($(this).is(".us-nav")) {
					$(this).css("display","");
				}
				//saved-search
				if ($(this).is("#saved-search")) {
					$(this).css("display","");
				}
				//promo link (orderitemdisplay.jsp)
				if ($(this).is("#promo-codes-info")) {
					$(this).css("display","");
				}
				if ($(this).is("#poplinks")) {
					$(this).css("display","");
				}
			});
			$('a').each(function () {
				if ($(this).is("#add-wishlist")) {
					$(this).css("display","");
				}
				if ($(this).is("#add-registry")) {
					$(this).css("display","");
				}
				if ($(this).is("#find-store")) {
					$(this).css("display","");
				}
			});

		}
		else{
			//fix to hide links (remove once display:none's on bundleDisplay)
			$('a').each(function () {
				if ($(this).is("#add-wishlist")) {
					$(this).css("display","none");
				}
				if ($(this).is("#add-registry")) {
					$(this).css("display","none");
				}
				if ($(this).is("#find-store")) {
					$(this).css("display","none");
				}
			});
			var trackingUrlString = "https://sandbox.fiftyone.com/tracking.srv";
			//unbinds saved search and typeahead
			$('#search-input').unbind();
			$('#search-filter').unbind();
			$('#error-search-filter').unbind();
			$('div').each(function (index) {
				//Start:MyDillards
				if ($(this).is("#myDillardsBar")) {
					$(this).children('div').children('span').children('span').each(function () {
						if($(this).is("#imgFlagCode")){
							$(this).append('<img src="/images/flags/'+countryCode+'.gif" alt= "" border="0" height="16" width="25"/>');
						}
					});
				}
				//End:MyDillards
				//Start: Kana
				if ($(this).is(".fiftyOne-content")) {
					$(this).css("display","");
				}
				//End: Kana

				if ($(this).is("#fiftyOne-poplinks")) {
					$(this).css("display","");
				}
				$(this).children('title').each(function () {
					if($(this).text().indexOf("$") != -1){
						$(this).empty();
						$(this).append("Dillard's International - Official Site of Dillard's Department Stores - Dillards.com | The Style of Your Life");
					}
				});
/*
				if ($(this).is("#cart-area")) {
					$("form").each(function (index) {
						if($(this).is("#ShopCartForm")){
							$(this).prop("action","FiftyOneXML");
						}
					});
				}
*/
				if ($(this).is(".continue-checkout")) {
					$(this).children('button').each(function () {
						$(this).unbind();
						$(this).bind("click", function (e) {$("#international-processing").modal({
							onOpen: function (d) {
							d.overlay.fadeIn(function() {
							d.container.fadeIn();
							d.data.fadeIn();
							});
							},onClose:function (d) {
							d.data.fadeOut('fast');
							d.container.fadeOut('fast',function() {
							d.overlay.fadeOut('fast', function () {
							$.modal.close();
							});
							});
							},closeHTML:'<a href="javascript:void(0);">CLOSE [X]</a>'
						});
						fiftyOneEncodeXML(document.ShopCartForm);
						});
						$(this).removeAttr("onClick");
						$(this).removeAttr("id");

					});
				}
				if($(this).children('span').children('a').is('#context-chooser-us')){
					$(this).children('span').children('a').css("display","none");
				}
				if($(this).children('span').children('a').is('#APOFPO-link')){
					$(this).find('#APOFPO-link').bind("click", function (e) {$("#APOFPO-info-modal").modal({
						onOpen: function (d) {
						d.overlay.fadeIn(function() {
						d.container.fadeIn();
						d.data.fadeIn();
						});
						},onClose:function (d) {
						d.data.fadeOut('fast');
						d.container.fadeOut('fast',function() {
						d.overlay.fadeOut('fast', function () {
						$.modal.close();
						});
						});
						},closeHTML:'<a href="javascript:void(0);">CLOSE [X]</a>'
					});
					});
				}
				//Start: Header Cart Total
				if ($(this).is("#utility-nav")) {
					$(this).children('ul').children('li').each(function () {
						if($(this).is(".fiftyOne-nav")){
							$(this).css("display","");
							$(this).children('div').children('span').children('a').each(function () {
								if($(this).is('#track-inter-order')){
									$(this).removeAttr("href");
									$(this).prop("href", trackingUrlString);
								}
							});
						}
						if($(this).is(".us-nav")){
							$(this).css("display","none");
						}
					});
					if ($(this).find('.fiftyOne-cartTotal')) {
						var itemPrice = $(this).find('.fiftyOne-cartTotal').text();
						var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
						$(this).find('.fiftyOne-cartTotal').text(newPrice);
						$(this).find('.fiftyOne-cartTotal').css("display","none");
						$(this).find('.fiftyOne-cartTotalDollarSign').css("display","none");
						$(this).find('.fiftyOne-cartTotal').prepend(currencyCode + "&nbsp;");
					}
					$(this).css("display","");
				}
				//End: Header Cart Total
				//header
				if ($(this).is(".fiftyOne-nav")) {
					$(this).css("display","");
				}
				if ($(this).is(".us-nav")) {
					$(this).css("display","none");
				}
				// top footer links
				if ($(this).is("#bottom-nav-container")) {
					$(this).children('div').children('div').children('ul').children('li').children('div').children('span').each(function () {
						if($(this).is("#imgFlagCode")){
							$(this).append('<img src="/images/flags/'+countryCode+'.gif" alt= "" border="0" height="16" width="25"/>');
						}
					});
					$(this).children('div').children('div').children('ul').children('li').children('a').each(function () {
						if($(this).is('#track-inter-order')){
							$(this).removeAttr("href");
							$(this).prop("href", trackingUrlString);
						}
					});
				}
			});

		}
	}
	function loadDefaultPrices(){
		$("div").each(function(index){
		//Start:Breadcrumbs.jsp
		if ($(this).is(".cat-search-wrap")) {
			$(this).children('span').children('h1').each(function () {
				if ($(this).is("#breadcrumb")) {
					$(this).css("display","");
				}
			});
			$(this).children('h2').children('div').each(function () {
				if ($(this).is("#related-searches")) {
					$(this).css("display","");
				}
			});
		}
		if ($(this).is(".cat-search-wrap-fixed")) {
			$(this).children('span').children('h1').each(function () {
				if ($(this).is("#breadcrumb")) {
					$(this).css("display","");
				}
			});
		}
		//End:Breadcrumbs.jsp
		// Start: (GuidedNavigationDropDown.jsp)
		if ($(this).is(".facet-wrap")) {
			$(this).children('div').each(function () {
				if ($(this).is('.facet')) {
					if ($(this).children(this).is('.fiftyOne-nav-price-hdr')) {
						$(this).css("display","");
					}
				}
				$(this).children('div').children('ul').children('li').children('a').each(function () {
					if ($(this).is(".fiftyOne-nav-price-a")) {
						$(this).css("display","");
					}
					if ($(this).is(".fiftyOne-nav-category-a")) {
						$(this).css("display","");
					}
				});
				if($(this).is('.selected')){
					$(this).find('.fiftyOne-filtered-price').css("display","");
					if($(this).find('.fiftyOne-filtered-category')){
						var text = $(this).find('.fiftyOne-filtered-category').text();
						var holdRightString = text.split("[");
						var text1 = holdRightString[0];
						var navQty = holdRightString[1];
						var resetURL = $(this).find('.fiftyOne-filtered-category a:first').prop('href');
						$(this).find('.fiftyOne-filtered-category').empty();
						$(this).find('.fiftyOne-filtered-category').replaceWith(text1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
					}
				}
				if ($(this).is('#fiftyOne-nav-brand-facet')) {
					$(this).css("display","");
				}
			});
		}
		// Finish: (GuidedNavigationDropDown.jsp)
		// Start: (Product.jsp) 
		if ($(this).is(".productInfo")) {
			if ($(this).find('.price')) {
				$(this).find('.price').css("display","");
			}
		}
		if ($(this).is(".info")) {
			if ($(this).find('.sale')) {
				$(this).find('.sale').css("display","");
			}
		}
		// Finish: (Product.jsp)
		// Start: (HeroProductDisplay.jsp)
		if ($(this).is(".product")) {
			$(this).children('a').children('span').each(function () {
				if ($(this).is('.price')) {
					$(this).css("display","");
			}
			});
		}
		//Finish: (HeroProductDisplay.jsp)
		// Start: (All Product Display Pages Header Price)
		if ($(this).is("#promotion_copy")) {
			$(this).css("display","");
		}
		if ($(this).is("#promo-section")) {
			$(this).css("display","");
		}
		if ($(this).is("#top-info")) {
			if ($(this).find('#price')) { 
				$(this).find('#price').css("display","");
			}
		}
		if ($(this).is("#info-section")) {
			if ($(this).find('#price')) { 
				$(this).find('#price').css("display","");
			}
		}
		// Finish: (All Product Display Pages Header Price) 
		// : (ProductItemDisplay)
		if ($(this).is(".info")) {
			$(this).children('div').children('div').each(function () {
				if ($(this).is(".price")) {
					$(this).css("display","");
				}
			});
		}
		// Finish: (ProductItemDisplay)
		if ($(this).is("#cart-area")) {
			$("table").each(function (index) {
				//Start: ShoppingCart.jspf
				if ($(this).is("#cart-table")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.avail')){
							if($(this).find('.move-wl')){
								$(this).find('.move-wl').css("display","");
							}
							if($(this).find('.remove')){
								$(this).find('.remove').css("display","");
							}
						}
						if($(this).is('.qty')){
							$(this).css("display","");
						}
						if($(this).is('.price')){
							if($(this).find('.fiftyOne-lil-price')){
								$(this).find('.fiftyOne-lil-price').css("display","");
							}
						}
						if($(this).is('.subttl')){
							if($(this).find('.big-price')){
								$(this).find('.big-price').css("display","");
							}
						}
					});
					$(this).children(this).children(this).each(function () {
						if($(this).is('.noborder')){
							if($(this).find('.discount')){
								$(this).find('.discount').css("display","");
							}
						}
					});
				}
				//End: ShoppingCart.jspf
				//Start: RegistryShoppingCart.jspf
				if ($(this).is("#registry-cart-table")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.qty')){
							$(this).css("display","");
						}
						if($(this).is('.price')){
							if($(this).find('.big-price')){
								$(this).find('.big-price').css("display","");
							}
						}
						if($(this).is('.subttl')){
							if($(this).find('.big-price')){
								$(this).find('.big-price').css("display","");
							}
						}
					});
					$(this).children(this).children(this).each(function () {
						if($(this).is('.noborder')){
							if($(this).find('.discount')){
								$(this).find('.discount').css("display","");
							}
						}
					});
				}
				//End: RegistryShoppingCart.jspf
				//Start: OrderItemDisplay.jsp
				if ($(this).is(".fiftyOne-cartTotals")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('#subtotal')){
							if($(this).children().is('.fiftyOne-subTotal')){
								$(this).children().css("display","");
							}
						}
						if($(this).is('#orderDiscountTotal')){
							if($(this).children().is('.fiftyOne-orderDiscountTotal')){
								$(this).children().css("display","");
							}
						}
						if($(this).is('#shippingTotal')){
							if($(this).children().is('.fiftyOne-shippingTotals')){
								$(this).children().css("display","");
							}
						}
						if($(this).is('.total')){
							if($(this).children().is('.fiftyOne-orderTotal')){
								$(this).children().css("display","");
							}
						}
					});
				}
				//End: OrderItemDisplay.jsp
			});
		}
		//Start horizontal seo RR 
		if ($(this).is("#rr-product-seo")) {
			$(this).css("display","");
			$("table").each(function (index) {
				if ($(this).is(".rr_h_seo")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.rr_itemLoop_h_seo')){
							$(this).children('div').each(function () {
								if($(this).is(".rr_item_h_seo")){
									$(this).children('span').children('a').children('b').each(function (){
										$(this).css("display","");
									});
								}
							});
						}
					});
				}
			});
		}
		//End horizontal seo RR
		//Start vertical RR
		if ($(this).is("#rr-product-vertical")) {
			$(this).css("display","");
		}
		if ($(this).is("#side-rr")) {
			$(this).css("display","");
		}
		if ($(this).is("#rr-display")) {
			$(this).css("display","");
		}
		if ($(this).is("#rr-search-category")) {
			$(this).css("display","");
		}
		if ($(this).is("#rr-brand")) {
			$(this).css("display","");
		}
		if ($(this).is(".rr_vertical")) {
			$(this).css("display","");
			$("table").each(function (index) {
				if ($(this).is(".rr_itemLoop_vertical")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.rr_item_vertical')){
							$(this).children('div').each(function () {
								if($(this).is(".rr_itemPrice_vertical")){
									$(this).children('a').children('b').each(function (){
										$(this).css("display","");
									});
								}
							});
						}
					});
				}
			});
		}
		//End  vertical RR
		//Start horizontal RR 
		if ($(this).is("#rr-wrapper")) {
			$(this).css("display","");
			$("table").each(function (index) {
				if ($(this).is(".rr_h")) {
					$(this).children(this).children(this).children(this).each(function () {
						if($(this).is('.rr_itemLoop_h')){
							$(this).children('div').each(function () {
								if($(this).is(".rr_item_h")){
									$(this).children('span').children('a').children('b').each(function (){
										$(this).css("display","");
									});
								}
							});
						}
					});
				}
			});
		}
		//End horizontal RR
		});
	}
	function loadInternationalPrices(exchangeRate,FLC,roundMethod,currencyCode){
		var priceHdrSet = "N";
		var filteredPriceHdrSet = "N";
		$("div").each(function (index) {
			//Start:Breadcrumbs.jsp
			if ($(this).is(".cat-search-wrap")) {
				$(this).children('span').children('h1').each(function () {
					if ($(this).is("#breadcrumb")) {
						$(this).children('div').each(function () {
							if($(this).is(".parent")){
								if($(this).text().indexOf("$") != -1){
									if($(this).text().indexOf("-") != -1){
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0]; 
										var navPrice1 = navPriceString[1].replace('$','').replace('-',''); 
										var navRightStringPortion = navPriceString[2]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
										var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
										$(this).empty();
										$(this).append(navLeftStringPortion + " " + "(" + currencyCode + ")"  + "&nbsp;" +newPrice1+ "-" + newPrice2);
									}
									else{ 
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0]; 
										var navRightStringPortion = navPriceString[1]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
										var navQty = holdRightString[1]; 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
										$(this).empty();
										$(this).text(navLeftStringPortion + " " + "(" + currencyCode + ")"  + " " + newPrice1 + " ");
									}
								}
							}
							if($(this).is(".current")){
								if($(this).text().indexOf("$") != -1){
									if($(this).text().indexOf("-") != -1){
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0];
										var navPrice1 = navPriceString[1].replace('$','').replace('-',''); 
										var navRightStringPortion = navPriceString[2]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
										var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
										$(this).empty();
										$(this).append("<span itemprop=\"title\">" + navLeftStringPortion + " " + "(" + currencyCode + ")"  + "&nbsp;" +newPrice1+ "-" + newPrice2 + "</span>");
									}
									else{ 
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0]; 
										var navRightStringPortion = navPriceString[1]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
										var navQty = holdRightString[1]; 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
										$(this).empty();
										$(this).append("<span itemprop=\"title\">" +  navLeftStringPortion + " " + "(" + currencyCode + ")"  + " " + newPrice1 + " " + "</span>");
									}
								}
							}
						});
						$(this).css("display","");
					}
				});
			}
			//End:Breadcrumbs.jsp
			// Start: (GuidedNavigationDropDown.jsp)
			if ($(this).is(".facet-wrap")) {
				$(this).children('div').each(function () {
					if ($(this).is('.facet')) {
						if ($(this).children(this).is('.fiftyOne-nav-price-hdr')) {
							if(priceHdrSet == "N"){
								$(this).find('.fiftyOne-nav-price-hdr').append("&nbsp;(" + currencyCode + ")");
								priceHdrSet = "Y";
							}
						}
						$(this).children('div').children('ul').children('li').children('a').each(function () {
							if ($(this).is(".fiftyOne-nav-price-a")) {
								if($(this).text().indexOf("-") != -1){
									var navPriceString = $(this).text().split("-"); 
									var navPrice1 = navPriceString[0].replace('$','').replace(',',''); 
									var navRightStringPortion = navPriceString[1]; 
									var holdRightString = navRightStringPortion.split("(");
									var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
									var navQty = holdRightString[1]; 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
									var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
									$(this).empty();
									$(this).append(newPrice1+ "-" + newPrice2 + "&nbsp;" + "<b>(" + navQty + "</b>");
								}
								else if($(this).text().toLowerCase().indexOf("under") != -1){
									var navPriceString = $(this).text().toLowerCase().split("under"); 
									var navRightStringPortion = navPriceString[1]; 
									var holdRightString = navRightStringPortion.split("(");
									var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
									var navQty = holdRightString[1]; 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
									$(this).empty();
									$(this).append("Under" + "&nbsp;" + newPrice1 + "&nbsp;" + "<b>(" + navQty + "</b>");
								}
								else if($(this).text().toLowerCase().indexOf("over") != -1){
									var navPriceString = $(this).text().toLowerCase().split("over"); 
									var navRightStringPortion = navPriceString[1]; 
									var holdRightString = navRightStringPortion.split("(");
									var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
									var navQty = holdRightString[1]; 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
									$(this).empty();
									$(this).append("Over" + "&nbsp;" + newPrice1 + "&nbsp;" + "<b>(" + navQty + "</b>");
								}
								$(this).css("display","");
							}
							if ($(this).is(".fiftyOne-nav-category-a")) {
								if($(this).text().indexOf("$") != -1){
									if($(this).text().indexOf("-") != -1){
										var navPriceString = $(this).text().split("$"); 
										var navPrice1 = navPriceString[1].replace('$','').replace('-',''); 
										var navLeftStringPortion = navPriceString[0]; 
										var navRightStringPortion = navPriceString[2]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
										var navQty = holdRightString[1]; 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
										var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
										$(this).empty();
										$(this).append(navLeftStringPortion + "&nbsp;" + "(" + currencyCode + ")"  + "&nbsp;" +newPrice1+ "-" + newPrice2 + "&nbsp;" + "<b>(" + navQty + "</b>");
									}
									else{ 
										var navPriceString = $(this).text().split("$"); 
										var navLeftStringPortion = navPriceString[0]; 
										var navRightStringPortion = navPriceString[1]; 
										var holdRightString = navRightStringPortion.split("(");
										var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
										var navQty = holdRightString[1]; 
										var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1);
										$(this).empty();
										$(this).append(navLeftStringPortion + "&nbsp;" + "(" + currencyCode + ")"  + "&nbsp;" + newPrice1 + "&nbsp;" + "<b>(" + navQty + "</b>");
									}
								}
								$(this).css("display","");
							}
						});
					}
					if($(this).is('.facet-name')){
						if($(this).text().toLowerCase().indexOf("price") != -1){
							if(filteredPriceHdrSet == "N"){
								if($(this).text().toLowerCase().indexOf(":") != -1){
									var hdrText = $(this).text().split(":"); 
									$(this).html(hdrText[0] + "&nbsp;(" + currencyCode + ")&nbsp;:");
								}
								else{
									$(this).append("&nbsp;(" + currencyCode + ")&nbsp;");
								}
								filteredPriceHdrSet = "Y";
							}
						}
					}
					if($(this).is('.selected')){
						if($(this).find('.fiftyOne-filtered-price').text().toLowerCase().indexOf("under") != -1){
							var navPriceString = $(this).text().toLowerCase().split("under"); 
							var navRightStringPortion = navPriceString[1]; 
							var holdRightString = navRightStringPortion.split("[");
							var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
							var navQty = holdRightString[1]; 
							var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
							var resetURL = $(this).find('a:first').prop('href');
							$(this).empty();
							$(this).append("Under" + "&nbsp;" + newPrice1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
						}
						else if($(this).find('.fiftyOne-filtered-price').text().indexOf("$") != -1){
							var selectedPrice = $(this).text();
							if(selectedPrice.indexOf("-") != -1){
								var navPriceString = $(this).text().split("-"); 
								var navPrice1 = navPriceString[0].replace('$','').replace(',',''); 
								var navRightStringPortion = navPriceString[1]; 
								var holdRightString = navRightStringPortion.split("[");
								var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
								var navQty = holdRightString[1]; 
								var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
								var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
								var resetURL = $(this).find('a:first').prop('href');
								$(this).empty();
								$(this).append(newPrice1+ "&nbsp;-&nbsp;" + newPrice2 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
							}
						}
						else if($(this).find('.fiftyOne-filtered-price').text().toLowerCase().indexOf("over") != -1){
							var navPriceString = $(this).text().toLowerCase().split("over"); 
							var navRightStringPortion = navPriceString[1]; 
							var holdRightString = navRightStringPortion.split("[");
							var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
							var navQty = holdRightString[1]; 
							var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
							var resetURL = $(this).find('a:first').prop('href');
							$(this).empty();
							$(this).append("Over" + "&nbsp;" + newPrice1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
						}
						if($(this).find('.fiftyOne-filtered-category').text().indexOf("$") != -1){
							if($(this).text().indexOf("$") != -1){
								if($(this).text().indexOf("-") != -1){
									var navPriceString = $(this).text().split("$"); 
									var navLeftStringPortion = navPriceString[0];
									var navPrice1 = navPriceString[1].replace('$','').replace('-',''); 
									var navRightStringPortion = navPriceString[2]; 
									var holdRightString = navRightStringPortion.split("[");
									var navPrice2 = holdRightString[0].replace('$','').replace(',',''); 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
									var newPrice2 = calculateNewPrice(navPrice2,exchangeRate,FLC,roundMethod,1); 
									var resetURL = $(this).find('a:first').prop('href');
									$(this).empty();
									$(this).append(navLeftStringPortion + "&nbsp;" + "(" + currencyCode + ")"  + "&nbsp;" +newPrice1+ "-" + newPrice2 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
								}
								else{ 
									var navPriceString = $(this).text().split("$");
									var navLeftStringPortion = navPriceString[0];
									var navRightStringPortion = navPriceString[1];
									var holdRightString = navRightStringPortion.split("[");
									var navPrice1 = holdRightString[0].replace('$','').replace(',',''); 
									var newPrice1 = calculateNewPrice(navPrice1,exchangeRate,FLC,roundMethod,1); 
									var resetURL = $(this).find('a:first').prop('href');
									$(this).empty();
									$(this).append(navLeftStringPortion + "&nbsp;" + "(" + currencyCode + ")" + "&nbsp;" + newPrice1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
								}
							}
						}
						else if($(this).find('.fiftyOne-filtered-category')){
							var text = $(this).find('.fiftyOne-filtered-category').text();
							var holdRightString = text.split("[");
							var text1 = holdRightString[0];
							var navQty = holdRightString[1];
							var resetURL = $(this).find('.fiftyOne-filtered-category a:first').prop('href');
							$(this).find('.fiftyOne-filtered-category').empty();
							$(this).find('.fiftyOne-filtered-category').replaceWith(text1 + "&nbsp;" + "<a href=\"" + resetURL + "\"rel=\"nofollow\"><div class=\"exitBtn\"></div></a>");
						}
					}
				});
			}
			// Finish: (GuidedNavigationDropDown.jsp)
			// Start: (Product.jsp)
			if ($(this).is(".productInfo")) {
				if ($(this).find('.price')) {
					if($(this).find('.price').text().indexOf("-") != -1){
						var itemPrice = $(this).find('.price').text().split("-"); 
						var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
						var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
						var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
						var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
						$(this).find('.price').text(newPrice1 + "-" + newPrice2);
					}
					else{
						var itemPrice = $(this).find('.price').text().replace('$','').replace(',','');
						var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
						$(this).find('.price').text(newPrice);
					}
					$(this).find('.price').prepend(currencyCode + "&nbsp;");
					$(this).find('.price').css("display","");
				}
			}
			// End: (Product.jsp)
			// Start: (All Product Display Pages Header Price)
			if ($(this).is("#top-info")) {
				$(this).children('div').each(function () {
					if ($(this).is('#price')) { 
						if($(this).html().indexOf("<") != -1){
							var itemPrice = $(this).text().split("Orig:"); 
							var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
							var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
							var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
							var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
							$(this).html(newPrice1 + " &nbsp;<span>Orig:" + newPrice2 + "</span>" );
						}
						else{
							if($(this).text().indexOf("-") != -1){
								var itemPrice = $(this).text().split("-"); 
								var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
								var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
								var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
								var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
								$(this).text(newPrice1 + "-" + newPrice2);
							}
							else{
								var itemPrice = $(this).text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
								$(this).text(newPrice);
							}
						}
						$(this).prepend(currencyCode + "&nbsp;");
						$(this).css("display","");
					}
				}); 
			}
			if ($(this).is("#info-section")) {
				$(this).children('div').each(function () {
					if ($(this).is('#price')) { 
						if($(this).html().indexOf("<") != -1){
							var itemPrice = $(this).text().split("Orig:"); 
							var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
							var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
							var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
							var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
							$(this).html(newPrice1 + " &nbsp;<span>Orig:" + newPrice2 + "</span>" );
						}
						else{
							if($(this).text().indexOf("-") != -1){
								var itemPrice = $(this).text().split("-"); 
								var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
								var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
								var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
								var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
								$(this).text(newPrice1 + "-" + newPrice2);
							}
							else{
								var itemPrice = $(this).text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
								$(this).text(newPrice);
							}
						}
						$(this).prepend(currencyCode + "&nbsp;");
						$(this).css("display","");
					}
				}); 
			}
			// Finish: (All Product Display Pages Header Price)
			//Start: (HeroProductDisplay.jsp)
			if ($(this).is(".product")) {
				$(this).children('a').children('span').each(function () {
					if ($(this).is('.price')) {
						if($(this).text().indexOf("-") != -1){
							var itemPrice = $(this).text().split("-");
							var itemPrice1 = itemPrice[0].replace('$','').replace(',','');
							var itemPrice2 = itemPrice[1].replace('$','').replace(',','');
							var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1);
							var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
							$(this).text(newPrice1 + "-" + newPrice2);
						}
						else{
							var itemPrice = $(this).text().replace('$','').replace(',','');
							var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1);
							$(this).text(newPrice);
						}
						$(this).prepend(currencyCode + "&nbsp;");
						$(this).css("display","");
					}
				});
			}
			//Finish: (HeroProductDisplay.jsp)
			// Start: (ProductItemDisplay)
			if ($(this).is(".info")) {
				$(this).children('div').children('div').each(function () {
					if ($(this).is(".price")) {
						if($(this).html().indexOf("<") != -1){
							var itemPrice; 
							if($(this).html().indexOf("Orig.") != -1){
								itemPrice=$(this).text().split("Orig.");
							}
							else if($(this).html().indexOf("Orig:") != -1){
								itemPrice= $(this).text().split("Orig:");
							}
							var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
							var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
							var tempVerb = $(this).children(this).text();
							if (typeof itemPrice[1] != "undefined") {
								var itemPrice2 = itemPrice[1].replace('$','').replace(',','');
								var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
								$(this).html(newPrice1 + " "+  "<span class=\"temp-verb\">" + "Orig." + " " + newPrice2  +"</span>");
							}
							else{
								$(this).html(newPrice1 + "<span class=\"temp-verb\">" + tempVerb +"</span>");
							}
						}
						else{
							if($(this).text().indexOf("-") != -1){
								var itemPrice = $(this).text().split("-"); 
								var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
								var itemPrice2 = itemPrice[1].replace('$','').replace(',',''); 
								var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
								var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1);
								$(this).text(newPrice1 + "-" + newPrice2);
							}
							else{
								var itemPrice = $(this).text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
								var tempVerb = $(this).children(this).text();
								$(this).html(newPrice + " " + "<span class=\"temp-verb\">" + tempVerb +"</span>");
							}
						}
						$(this).prepend(currencyCode + "&nbsp;");
						$(this).css("display","");
					}
				});
			}
			// Finish: (ProductItemDisplay)
			if ($(this).is("#cart-area")) {
				$("table").each(function (index) {
					//Start: RegistryShoppingCart.jspf
					if ($(this).is("#registry-cart-table")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.avail')){
								if($(this).find('.remove')){
									$(this).find('.remove').children(this).each(function () {
										$(this).html("<img alt=\"\" src=\"/images/delete.gif\">Remove to proceed");
									});

								}
							}
						});
						$(this).children(this).children(this).each(function () {
							if($(this).is('.noborder')){
								$(this).hide();
								if($(this).find('.discount')){
									$(this).find('.discount').css("display","none;");
								}
							}
						});
						$(".fiftyOne-cartTotals").hide();
						$(".continue-checkout").hide();
						$("#international-registry-error").modal({
						containerCss: {position:"fixed"},
						onOpen: function (d) {
						d.overlay.fadeIn(function() {
							d.container.fadeIn();
							d.data.fadeIn();
						});
						},onClose:function (d) {
							d.data.fadeOut('fast');
							d.container.fadeOut('fast',function() {
							d.overlay.fadeOut('fast', function () {
								$.modal.close();
							});
							});
						},
						closeHTML:'<a href="javascript:void(0);">CLOSE [X]</a>',overlayClose:true // <-- This would allow the user to close the modal by clicking anywhere on the screen, not just the close button
						});
					}
					//End: RegistryShoppingCart.jspf
					//Start: ShoppingCart.jspf
					if ($(this).is("#cart-table")) {
						var itemQty;
						$(this).children(this).children('tr').each(function () {
							var itemPrice;
							if($(this).find('.remove')){
								$(this).find('.remove').css("display","");
							}
							if($(this).find('.qty')){
							$(this).find('.qty').css("display","");
								$(this).children(this).children('select').each(function () {
									itemQty = $(this).val();
								});
							}
							if($(this).find('.fiftyOne-lil-price')){
								var itemPrice = $(this).find('.fiftyOne-lil-price').text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1);
								$(this).find('.fiftyOne-lil-price').text(newPrice);
								$(this).find('.fiftyOne-lil-price').prepend(currencyCode + "&nbsp;");
								$(this).find('.fiftyOne-lil-price').css("display","");
							}
							if($(this).find('.big-price')){
								var itemPrice = $(this).find('.big-price').text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice/itemQty,exchangeRate,FLC,roundMethod,itemQty);
								$(this).find('.big-price').text(newPrice);
								$(this).find('.big-price').prepend(currencyCode + "&nbsp;");
								$(this).find('.big-price').css("display","");
							}
							if($(this).is('.noborder')){
								if($(this).find('.discount')){
									var itemPrice = $(this).find('.discount').text().replace('$','').replace(',','');
									var newPrice = calculateNewPrice(itemPrice/itemQty,exchangeRate,FLC,roundMethod,itemQty);
									$(this).find('.discount').text(newPrice);
									$(this).find('.discount').prepend(currencyCode + "&nbsp;");
									$(this).find('.discount').css("display","");
								}
							}
						});
					}
					//End: ShoppingCart.jspf
					//Start: OrderItemDisplay.jsp
					if ($(this).is(".fiftyOne-cartTotals")) {
						var subTotal = calculateCartSubTotal(roundMethod);
						var discount = calculateCartDiscounts(roundMethod);
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('#subtotal')){
								if($(this).children().is('.fiftyOne-subTotal')){
									$(this).children().text(subTotal);
									$(this).children().prepend(currencyCode + "&nbsp;");
									$(this).children().css("display","");
								}
							}
							if($(this).is('#orderDiscountTotal')){
								if($(this).children().is('.fiftyOne-orderDiscountTotal')){
									$(this).children().text(discount);
									$(this).children().prepend(currencyCode + "&nbsp;");
									$(this).children().css("display","");
								}
							}
							if($(this).is('#shippingTotal')){
								if($(this).children().is('.fiftyOne-shippingTotals')){
									var newPrice = calculateNewPrice(0,exchangeRate,FLC,roundMethod,1); 
									$(this).children().text(newPrice);
									$(this).children().prepend(currencyCode + "&nbsp;");
									$(this).children().css("display","");
								}
							}
							if($(this).is('.total')){
								if($(this).children().is('.fiftyOne-orderTotal')){
									var total = calculateCartTotal(roundMethod);
									$(this).children().text(total);
									$(this).children().prepend(currencyCode + "&nbsp;");
									$(this).children().css("display","");
								}
							}
						});
					}
					//End: OrderItemDisplay.jsp
				});
			}
			//Start horizontal seo RR 
			if ($(this).is("#rr-product-seo")) {
				$("table").each(function (index) {
					if ($(this).is(".rr_h_seo")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.rr_itemLoop_h_seo')){
								$(this).children('div').each(function () {
									if($(this).is(".rr_item_h_seo")){
										$(this).children('span').children('a').children('b').each(function (){
											if($(this).text().indexOf("-") != -1){
												var rrDispPrice = $(this).text().split("-");
												var rrPrice1 = rrDispPrice[0].replace('$','').replace(',','');
												var rrPrice2 = rrDispPrice[1].replace('$','').replace(',','');
												var newRRPrice1 = calculateNewPrice(rrPrice1,exchangeRate,FLC,roundMethod,1); 
												var newRRPrice2 = calculateNewPrice(rrPrice2,exchangeRate,FLC,roundMethod,1); 
												$(this).text(newRRPrice1 + "-" + newRRPrice2);
												$(this).prepend(currencyCode + "&nbsp;");
											}
											else if($(this).text().indexOf("$") != -1){
												var rrPrice = $(this).text().replace('$','').replace(',','');
												var newRRPrice = calculateNewPrice(rrPrice,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice);
												$(this).prepend(currencyCode + "&nbsp;");
											}
										});
									}
								});
							}
						});
					}
				});
			}
			//End horizontal seo RR
			//Start side RR
			if ($(this).is("#side-rr")) {
				$("table").each(function (index) {
					if ($(this).is(".rr_itemLoop_vertical")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.rr_item_vertical')){
								$(this).children('div').each(function () {
									if($(this).is(".rr_itemPrice_vertical")){
										$(this).children('a').children('b').each(function (){
											if($(this).text().indexOf("-") != -1){
												var rrDispPrice = $(this).text().split("-"); 
												var rrPrice1 = rrDispPrice[0].replace('$','').replace(',',''); 
												var rrPrice2 = rrDispPrice[1].replace('$','').replace(',',''); 
												var newRRPrice1 = calculateNewPrice(rrPrice1,exchangeRate,FLC,roundMethod,1); 
												var newRRPrice2 = calculateNewPrice(rrPrice2,exchangeRate,FLC,roundMethod,1); 
												$(this).text(newRRPrice1 + "-" + newRRPrice2);
												$(this).prepend(currencyCode + "&nbsp;");
											}
											else if($(this).text().indexOf("$") != -1){
												var rrPrice = $(this).text().replace('$','').replace(',','');
												var newRRPrice = calculateNewPrice(rrPrice,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice);   
												$(this).prepend(currencyCode + "&nbsp;");
											}
										});
									}
								});
							}
						});
					}
				});
			}
			//End  side RR
			//Start vertical RR
			if ($(this).is(".rr_vertical")) {
				$("table").each(function (index) {
					if ($(this).is(".rr_itemLoop_vertical")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.rr_item_vertical')){
								$(this).children('div').each(function () {
									if($(this).is(".rr_itemPrice_vertical")){
										$(this).children('a').children('b').each(function (){
											if($(this).text().indexOf("-") != -1){
												var rrDispPrice = $(this).text().split("-"); 
												var rrPrice1 = rrDispPrice[0].replace('$','').replace(',',''); 
												var rrPrice2 = rrDispPrice[1].replace('$','').replace(',',''); 
												var newRRPrice1 = calculateNewPrice(rrPrice1,exchangeRate,FLC,roundMethod,1); 
												var newRRPrice2 = calculateNewPrice(rrPrice2,exchangeRate,FLC,roundMethod,1); 
												$(this).text(newRRPrice1 + "-" + newRRPrice2);
												$(this).prepend(currencyCode + "&nbsp;");
											}
											else if($(this).text().indexOf("$") != -1){
												var rrPrice = $(this).text().replace('$','').replace(',','');
												var newRRPrice = calculateNewPrice(rrPrice,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice);   
												$(this).prepend(currencyCode + "&nbsp;");
											}
										});
									}
								});
							}
						});
					}
				});
			}
			//End  vertical RR
			//Start horizontal RR 
			if ($(this).is("#rr-wrapper")) {
				$("table").each(function (index) {
					if ($(this).is(".rr_h")) {
						$(this).children(this).children(this).children(this).each(function () {
							if($(this).is('.rr_itemLoop_h')){
								$(this).children('div').each(function () {
									if($(this).is(".rr_item_h")){
										$(this).children('span').children('a').children('b').each(function (){
											if($(this).text().indexOf("-") != -1){
												var rrDispPrice = $(this).text().split("-");
												var rrPrice1 = rrDispPrice[0].replace('$','').replace(',','');
												var rrPrice2 = rrDispPrice[1].replace('$','').replace(',','');
												var newRRPrice1 = calculateNewPrice(rrPrice1,exchangeRate,FLC,roundMethod,1);
												var newRRPrice2 = calculateNewPrice(rrPrice2,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice1 + "-" + newRRPrice2);
												$(this).prepend(currencyCode + "&nbsp;");
											}
											else if($(this).text().indexOf("$") != -1){
												var rrPrice = $(this).text().replace('$','').replace(',','');
												var newRRPrice = calculateNewPrice(rrPrice,exchangeRate,FLC,roundMethod,1);
												$(this).text(newRRPrice);
												$(this).prepend(currencyCode + "&nbsp;");
											}
										});
									}
								});
							}
						});
					}
				});
			}
		//End horizontal RR
		}); 
	}
	function loadDefaultSwatchPrices(){
		$("div").each(function (index) {
			// Start: (All Product Display Pages containing swatches)
			if ($(this).is("#swatches")) {
				if ($(this).find('.price')) {
				$(this).find('.price').css("display","");
				}
			}
			// Finish: (All Product Display Pages containing swatches) 
		});
	}
	function loadInternationalSwatchPrices(exchangeRate,FLC,roundMethod,currencyCode){
		$("div").each(function (index) {
			// Start: (All Product Display Pages containing swatches)
				if ($(this).is(".props")) {
					$(this).children('div').children('div').children('ul').children('li').each(function () {
						if($(this).children(this).text().indexOf("$") != -1){
							var ddDisplayPrice = $(this).children(this).text().split("$");
							if (typeof ddDisplayPrice[1] != "undefined") {
								var desc = ddDisplayPrice[0];
								var price = ddDisplayPrice[1].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text(desc+"$"+newPrice);
							}
							else{
								var price = ddDisplayPrice[0].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text("$"+newPrice);
							}
						}
					});
				}

				if ($(this).is(".prop-section")) {
					$(this).children('div').children('div').children('ul').children('li').each(function () {
						if($(this).children(this).text().indexOf("$") != -1){
							var ddDisplayPrice = $(this).children(this).text().split("$");
							if (typeof ddDisplayPrice[1] != "undefined") {
								var desc = ddDisplayPrice[0];
								var price = ddDisplayPrice[1].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text(desc+"$"+newPrice);
							}
							else{
								var price = ddDisplayPrice[0].replace('$','').replace(',','');
								var newPrice = calculateNewPrice(price,exchangeRate,FLC,roundMethod,1); 
								$(this).children(this).text("$"+newPrice);
							}
						}
					});
				}
				if ($(this).is("#swatches")) {
					$(this).children('p').each(function () {
						if ($(this).is(".price")) {
							if($(this).html().indexOf("<") != -1){
								var itemPrice = $(this).text().split("Orig."); 
								var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
								var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
								var tempVerb = $(this).children(this).text();
								if (typeof itemPrice[1] != "undefined") {
									var itemPrice2 = itemPrice[1].replace('$','').replace(',','');
									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
									$(this).html(newPrice1 + " "+ "Orig." + " " + newPrice2 + "<span class=\"temp-verb\">" + tempVerb +"</span>");
								}
								else{
									$(this).html(newPrice1 + "<span class=\"temp-verb\">" + tempVerb +"</span>");
								}
							}
							else{
								var itemPrice = $(this).text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
								var tempVerb = $(this).children(this).text();
								$(this).html(newPrice + " " + "<span class=\"temp-verb\">" + tempVerb +"</span>");
							}
							$(this).prepend(currencyCode + "&nbsp;");
							$(this).css("display","");
						}
					});
					$(this).children('div').children('p').each(function () {
						if ($(this).is(".price")) {
							if($(this).html().indexOf("<") != -1){
								var itemPrice = $(this).text().split("Orig."); 
								var itemPrice1 = itemPrice[0].replace('$','').replace(',',''); 
								var newPrice1 = calculateNewPrice(itemPrice1,exchangeRate,FLC,roundMethod,1); 
								var tempVerb = $(this).children(this).text();
								if (typeof itemPrice[1] != "undefined") {
									var itemPrice1a = $(this).html().split("Orig.");
									var itemPrice2;
									if(itemPrice1a[1].indexOf("<") != -1){
										var itemPrice1aSplit = itemPrice1a[1].split("<"); 
										itemPrice2 = itemPrice1aSplit[0].replace('$','').replace(',','');
									}
									else{
										var itemPrice2 = itemPrice1a[1].replace('$','').replace(',','');
									}
									var newPrice2 = calculateNewPrice(itemPrice2,exchangeRate,FLC,roundMethod,1); 
									$(this).html(newPrice1 + " "+ "Orig." + " " + newPrice2 + "<span class=\"temp-verb\">" + tempVerb +"</span>");
								}
								else{
									$(this).html(newPrice1 + "<span class=\"temp-verb\">" + tempVerb +"</span>");
								}
							}
							else{
								var itemPrice = $(this).text().replace('$','').replace(',','');
								var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1); 
								var tempVerb = $(this).children(this).text();
								$(this).html(newPrice + " " + "<span class=\"temp-verb\">" + tempVerb +"</span>");
							}
							$(this).prepend(currencyCode + "&nbsp;");
							$(this).css("display","");
						}
					});
					$(this).children('div').children('ul').each(function () {
						if($(this).prop("title").indexOf("$") != -1){
							var itemPrice =$(this).prop("title").replace('$','').replace(',','');
							var newPrice = calculateNewPrice(itemPrice,exchangeRate,FLC,roundMethod,1);
							$(this).prop("title",newPrice);
							$(this).children('li').each(function () {
								if($(this).prop("id").indexOf("$") != -1){
									var id = $(this).prop("id").split("$");
									var idText1 = id[0];
									var idText2 = id[1];
									var idPrice = 0;
									if (typeof id[2] != "undefined") {
										idPrice = id[2].replace('$','').replace(',','');
										var newTextPrice = calculateNewPrice(idPrice,exchangeRate,FLC,roundMethod,1);
										$(this).prop("id",idText1+idText2+"$"+newTextPrice);
									}
									else{
										idPrice = id[1].replace('$','').replace(',','');
										var newTextPrice = calculateNewPrice(idPrice,exchangeRate,FLC,roundMethod,1);
										$(this).prop("id",idText1+"$"+newTextPrice);
									}
								}
								if($(this).prop("title").indexOf("$") != -1){
									var title = $(this).prop("title").split("$");
									if (typeof title[1] != "undefined") {
										var titleText = title[0];
										var titlePrice = title[1].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
										$(this).prop("title",titleText+"$"+newPrice);
									}
									else{
										var titlePrice = title[0].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
										$(this).prop("title","$"+newPrice);
									}
								}
								$(this).children('img').each(function () {
									if($(this).prop("title").indexOf("$") != -1){
										var title = $(this).prop("title").split("$");
										if (typeof title[1] != "undefined") {
											var titleText = title[0];
											var titlePrice = title[1].replace('$','').replace(',','');
											var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
											$(this).prop("title",titleText+"$"+newPrice);
										}
										else{
											var titlePrice = title[0].replace('$','').replace(',','');
											var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
											$(this).prop("title","$"+newPrice);
										}
									}
								});
							});
						}
						else if ($(this).is(".swatches-all")) {
							$(this).children('li').each(function () {
							if($(this).prop("id").indexOf("$") != -1){
								var id = $(this).prop("id").split("$");
								var idText1 = id[0];
								var idText2 = id[1].replace('$','').replace(',','');
								var newTextPrice = calculateNewPrice(idText2,exchangeRate,FLC,roundMethod,1);
								$(this).prop("id",idText1+"$"+newTextPrice);
							}
							if($(this).prop("title").indexOf("$") != -1){
								var title = $(this).prop("title").split("$");
								if (typeof title[1] != "undefined") {
									var titleText = title[0];
									var titlePrice = title[1].replace('$','').replace(',','');
									var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
									$(this).prop("title",titleText+"$"+newPrice);
								}
								else{
									var titlePrice = title[0].replace('$','').replace(',','');
									var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
									$(this).prop("title","$"+newPrice);
								}
							}
							$(this).children('img').each(function () {
								if($(this).prop("title").indexOf("$") != -1){
									var title = $(this).prop("title").split("$");
									if (typeof title[1] != "undefined") {
										var titleText = title[0];
										var titlePrice = title[1].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
										$(this).prop("title",titleText+"$"+newPrice);
									}
									else{
										var titlePrice = title[0].replace('$','').replace(',','');
										var newPrice = calculateNewPrice(titlePrice,exchangeRate,FLC,roundMethod,1); 
										$(this).prop("title","$"+newPrice);
									}
								}
							});
						});
					}
				});
			}
			// End: (All Product Display Pages containing swatches)
		});
	}
	$(document).ready(function(){
		var countryCode = getCookieValues("country");
		if(countryCode != null && countryCode != "" && countryCode != "US"){
			var supportCountry = isSupportedCountry(countryCode);
			if(supportCountry == 'N'){
				countryCode = 'US';
			}
			var currencyCode = getCookieValues("currency"); 
			var exchangeRate;
			var FLC;
			var roundMethod;
			var quoteId;
			var lcpRuleId;
			if(countryCode != 'US'){
				//if no currency cookie is set then get country default currency info
				if(currencyCode == null || currencyCode == ""){
					for (var i = 0; i < countryCodeArray.length; i++){
						var ccArrayValueSplit = countryCodeArray[i].split('|');
						if(ccArrayValueSplit[1] == countryCode){
							currencyCode = ccArrayValueSplit[2];
							setCookies("currency",currencyCode);
							FLC = ccArrayValueSplit[3];
							lcpRuleId = ccArrayValueSplit[4];
							setCookies("lcpRuleId",lcpRuleId);
							break;
						}
					}
					for (var i = 0; i < currencyCodeArray.length; i++){
						var ccArrayValueSplit = currencyCodeArray[i].split('|');
						if(ccArrayValueSplit[1] == currencyCode){
							exchangeRate = ccArrayValueSplit[2];
							roundMethod = ccArrayValueSplit[3];
							quoteId = ccArrayValueSplit[4];
							setCookies("quoteId",quoteId);
							break;
						}
					}
				}
				else{
					for (var i = 0; i < countryCodeArray.length; i++){
						var ccArrayValueSplit = countryCodeArray[i].split('|');
						if(ccArrayValueSplit[1] == countryCode){
							FLC = ccArrayValueSplit[3];
							lcpRuleId = ccArrayValueSplit[4];
							setCookies("lcpRuleId",lcpRuleId);
							break; 
						}
					}
					for (var i = 0; i < currencyCodeArray.length; i++){
						var ccArrayValueSplit = currencyCodeArray[i].split('|');
						if(ccArrayValueSplit[1] == currencyCode){
							exchangeRate = ccArrayValueSplit[2];
							roundMethod = ccArrayValueSplit[3];
							quoteId = ccArrayValueSplit[4];
							setCookies("quoteId",quoteId);
							break;
						}
					}
				}
				localizeHeaderFooter(countryCode,exchangeRate,FLC,roundMethod,currencyCode);
				launchWelcomeMat(countryCode); 
				setTimeout(function() {loadInternationalPrices(exchangeRate,FLC,roundMethod,currencyCode);},0);
				var executed = "N";
				$('#attributes').ajaxComplete(function(e, xhr, settings) {
					if(settings.url.indexOf("/webapp/wcs/stores/servlet/SizeColorAndQtyView") != -1){
						loadInternationalSwatchPrices(exchangeRate,FLC,roundMethod,currencyCode);
						executed = "Y";
					}
				});
				if(executed == "N"){
					loadInternationalSwatchPrices(exchangeRate,FLC,roundMethod,currencyCode);
				}
			}
			else{
				localizeHeaderFooter(countryCode,exchangeRate,FLC,roundMethod,currencyCode);
				loadDefaultPrices();
				var executed = "N";
				$('#attributes').ajaxComplete(function(e, xhr, settings) {
					if(settings.url.indexOf("/webapp/wcs/stores/servlet/SizeColorAndQtyView") != -1){
						loadDefaultSwatchPrices();
						executed = "Y";					}
				});
				if(executed == "N"){
					loadDefaultSwatchPrices();
				}
			}
		}
		else{
			if(countryCode == null || countryCode == ""){ 
				countryCode = 'US';
				setCookies("country",countryCode);
			}
			// check for currency cookie and set if not there
			var currencyCode = getCookieValues("currency"); 
			if(currencyCode == null || currencyCode == ""){
				for (var i = 0; i < countryCodeArray.length; i++){
					var ccArrayValueSplit = countryCodeArray[i].split('|');
					if(ccArrayValueSplit[1] == countryCode){
						currencyCode = ccArrayValueSplit[2];
						setCookies("currency",currencyCode);
						break;
					}
				}
			}
			localizeHeaderFooter(countryCode);
			loadDefaultPrices();
			var executed = "N";
			$('#attributes').ajaxComplete(function(e, xhr, settings) {
				if(settings.url.indexOf("/webapp/wcs/stores/servlet/SizeColorAndQtyView") != -1){
					loadDefaultSwatchPrices();
					executed = "Y";
				}
			});
			if(executed == "N"){
				loadDefaultSwatchPrices();
			}
		}
	});