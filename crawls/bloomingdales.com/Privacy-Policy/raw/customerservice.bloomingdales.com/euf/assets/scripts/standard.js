		
				var state=0;
				//group cookie vals
				var groupName = "GCs";
				var delim = "||";
				
				function getQueryValue(param) {
					var args = new Object();
					var pairs = location.search.substring(1).split('&');
					for(var i = 0; i < pairs.length; i++) {
						var pos = pairs[i].indexOf('=');
						if (pos == -1) continue;
						var argname = pairs[i].substring(0,pos);
						var value = pairs[i].substring(pos+1);
						args[argname] = unescape(value);
					}
					
				  return args[param];
				}
				
				function disableButton(btn) {
					//btn variable is there in the case we want to change the image in the future
					if (state) return false;
					else { state++; return true; }	
				}

				function changeParentFrameWindow(url) {
					opener.top.location.href=url;
					self.close();
					opener.focus();
				}

				function setCookie(name, value, expdate) {
					//cookie code
					var theCookie 	= name+"="+value;
					var tempstr = this.location.toString();
					var endIndex = tempstr.indexOf(".com")+4;
					var domain = tempstr.substring(tempstr.indexOf("."),endIndex);
					theCookie += ";domain="+domain;
					theCookie += ";path=/"
					
					if (expdate)  theCookie += ";expires=" + expdate;
					
					document.cookie = theCookie;
				}
				
				function getCookie(name) {
					var myCookie = document.cookie;
					var regExp = new RegExp(name);
					myCookie 	= unescape(myCookie);

				   return (myCookie.search(regExp) != -1);
				}

				function getCookieValue(name) {
					var othName = groupName+"="+name;
					var cookies = document.cookie.split(';');
					var tempArray = new Array();
					var startStr = 0;
					
					for (i=0; i<cookies.length; i++) {
						tempArray = cookies[i].split(delim);
						startString = (tempArray.length==1) ? (i==0) ? 0 : 1 : 0;
						for (j=0; j<tempArray.length; j++) {
							if ((tempArray[j].substring(startString,tempArray[j].lastIndexOf('='))==name) || (tempArray[j].substring(startString,tempArray[j].lastIndexOf('='))==othName)) {
								return (tempArray[j].substring(tempArray[j].lastIndexOf('=')+1,tempArray[j].length));
							}
						}	
					}
				}

				function expireCookie(name) {
					setCookie(name, "", "Wed, 10 Jan 1900 05:00:00 GMT");
				}
				
				function pop(url,winString) {
					var popWindow = window.open(url,"",winString);
					popWindow.focus();
				}
				
				//--------------------------------------------=[ START Rollovers for Top/Bottom Navigation ]=------------------------------------------------------------
				//
					//Top NAV Pre-Loader
					var topnav_m_01_on = new Image();
					var topnav_m_01_off = new Image();
					var topnav_m_02_on = new Image();
					var topnav_m_02_off = new Image();
					var topnav_m_03_on = new Image();
					var topnav_m_03_off = new Image();
					var topnav_m_04_on = new Image();
					var topnav_m_04_off = new Image();
					var topnav_m_05_on = new Image();
					var topnav_m_05_off = new Image();
					var topnav_m_06_on = new Image();
					var topnav_m_06_off = new Image();
					var topnav_m_07_on = new Image();
					var topnav_m_07_off = new Image();
					var topnav_m_08_on = new Image();
					var topnav_m_08_off = new Image();
					var topnav_m_09_on = new Image();
					var topnav_m_09_off = new Image();
					var topnav_m_10_on = new Image();
					var topnav_m_10_off = new Image();
					var topnav_m_11_on = new Image();
					var topnav_m_11_off = new Image();
		
					topnav_m_01_on.src = assetsServer + "/img/nav/r09/topnav/topnav_designers_on.gif";
					topnav_m_01_off.src = assetsServer + "/img/nav/r09/topnav/topnav_designers_off.gif";
					topnav_m_02_on.src = assetsServer + "/img/nav/r09/topnav/topnav_women_on.gif";
					topnav_m_02_off.src = assetsServer + "/img/nav/r09/topnav/topnav_women_off.gif";
					topnav_m_03_on.src = assetsServer + "/img/nav/r09/topnav/topnav_contemporary_on.gif";
					topnav_m_03_off.src = assetsServer + "/img/nav/r09/topnav/topnav_contemporary_off.gif";
					topnav_m_04_on.src = assetsServer + "/img/nav/r09/topnav/topnav_shoes_on.gif";
					topnav_m_04_off.src = assetsServer + "/img/nav/r09/topnav/topnav_shoes_off.gif";
					topnav_m_05_on.src = assetsServer + "/img/nav/r09/topnav/topnav_handbags_on.gif";
					topnav_m_05_off.src = assetsServer + "/img/nav/r09/topnav/topnav_handbags_off.gif";
					topnav_m_06_on.src = assetsServer + "/img/nav/r09/topnav/topnav_jewelry_accessories_on.gif";
					topnav_m_06_off.src = assetsServer + "/img/nav/r09/topnav/topnav_jewelry_accessories_off.gif";
					topnav_m_07_on.src = assetsServer + "/img/nav/r09/topnav/topnav_beauty_on.gif";
					topnav_m_07_off.src = assetsServer + "/img/nav/r09/topnav/topnav_beauty_off.gif";
					topnav_m_08_on.src = assetsServer + "/img/nav/r09/topnav/topnav_men_on.gif";
					topnav_m_08_off.src = assetsServer + "/img/nav/r09/topnav/topnav_men_off.gif";
					topnav_m_09_on.src = assetsServer + "/img/nav/r09/topnav/topnav_kids_on.gif";
					topnav_m_09_off.src =assetsServer + "/img/nav/r09/topnav/topnav_kids_off.gif";
					topnav_m_10_on.src = assetsServer + "/img/nav/r09/topnav/topnav_home_on.gif";
					topnav_m_10_off.src =assetsServer + "/img/nav/r09/topnav/topnav_home_off.gif";
					topnav_m_11_on.src = assetsServer + "/img/nav/r09/topnav/topnav_sale_on.gif";
					topnav_m_11_off.src =assetsServer + "/img/nav/r09/topnav/topnav_sale_off.gif";

		

					function rollOver(imgName,rollType) { document[imgName].src = eval(imgName + "_" + rollType + ".src");

		 }		
		
		
				//--------------------------------------------=[       END Navigation Rollovers        ]=------------------------------------------------------------------
				
				
				//--------------------------------------------=[ START Popup Window Functions ]=------------------------------------------------------------
				//
				//HC:Popup window script that is dynamic and will regain focus
				// Modified link system to use this one script and pass parameters
				//for lighter page weight and more flexibility. 
						function pop(u,n,f){
							var d = "default";
							var sf = "directories,location,menubar,resizable,scrollbars,status,toolbar";
							if (!n){n = d}
							if (!f){f = sf}
							pw = window.open(u,n,f);
							pw.focus();
						}
						
				//----------------------------------------------=[ END Popup Window Functions ]=--------------------------------------------------------------

				//----------------------------------------------=[ START Flash detection script ]=----------------------------------------------------------------
			      //
						  var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
						  var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false;
						  
						  var hasFlash3 = false;
						  var hasFlash4 = false;
						  var hasFlash5 = false;
						  var hasFlash6 = false;
  						  var hasFlash7 = false;
  						  var hasFlash8 = false;
  						  var hasFlash9 = false;		
						  var pluginVersion = 0;
						  
						  function flashDetect() {
							    if (isIE && isWin) {  
								      document.writeln('<SCRIPT language="VBScript">');
								      document.writeln('on error resume next');
								      document.writeln('hasFlash9 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.9")))');		
								      document.writeln('hasFlash8 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.8")))');
								      document.writeln('hasFlash7 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.7")))');
								      document.writeln('hasFlash6 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6")))');
								      document.writeln('hasFlash5 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5")))');
								      document.writeln('hasFlash4 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4")))');
								      document.writeln('hasFlash3 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.3")))');
								      document.writeln('</SCR'+'IPT\>');        
							    } else if (navigator.plugins.length>0) {
								      if(navigator.plugins["Shockwave Flash"]) {
									        var flashDescriptor = navigator.plugins["Shockwave Flash"].description;
									        pluginVersion = parseInt(flashDescriptor.charAt(flashDescriptor.indexOf('.') - 1));
									        switch(pluginVersion) {
										          case 9: hasFlash9 = true;
										          case 8: hasFlash8 = true;
										          case 7: hasFlash7 = true;
										          case 6: hasFlash6 = true;
										          case 5: hasFlash5 = true;
										          case 4: hasFlash4 = true;
										          case 3: hasFlash3 = true;
									        }
								      } 
							     }
						   }
						  
						  function pluginAlert() {
 						  	    if(hasFlash9) { alert("Flash 9 supported"); }		
 						  	    if(hasFlash8) { alert("Flash 8 supported"); }
 						  	    if(hasFlash7) { alert("Flash 7 supported"); }
						  	    if(hasFlash6) { alert("Flash 6 supported"); }
							    if(hasFlash5) { alert("Flash 5 supported"); }
							    if(hasFlash4) { alert("Flash 4 supported"); }
							    if(hasFlash3) { alert("Flash 3 supported"); }
						  }
						  
						  flashDetect();
						  
				//-----------------------------------------------=[ END Flash detection script ]=-------------------------------------------------------------------

// this function is used primarily on checkout pages to advance the cursor from one phone # input field to the next
// the regex object is used to determine which numpad or number keys were used to enter the phone #
	function movePhoneCursor(e,w) {
		var testInput = new RegExp("[0-9a-i`]");
		switch(true) {
			case (testInput.test(String.fromCharCode((navigator.appName.indexOf("Netscape")!=-1) ? e.which : e.keyCode))):
				document.getElementById(phoneFields[w]).focus();
				break;
		}
	}						
	
	
	function showHideDivByID(divID){
		elem = document.getElementById(divID);
		if (elem.className == 'bl_hide'){
			elem.className = 'bl_show';
		}
		else {
			elem.className = 'bl_hide';
		}
	}
	
/* use to get a param from url */
/* all params are evaluated as uppercase, example: getURLParam(PARAMNAME); */
/* TODO: make case insensitive */
function getURLParam(strParamName){
	var strReturn = "";
	var tempHref = window.location.href;
       strHref = tempHref.toUpperCase();
	if ( strHref.indexOf("?") > -1 ){
		var strQueryString = strHref.substr(strHref.indexOf("?"));
		var aQueryString = strQueryString.split("&");
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
			if ( aQueryString[iParam].indexOf(strParamName.toUpperCase() + "=") > -1 ){
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
	return strReturn;
}

	/*
	 * methods: showElements(), hideElements()
	 * params:  unlimited
	 * desc:    Show hide list of block elements
	 * sample:  sv-cu-xx-xx.index.xml
	 */
	function hideElements() {
		for (i=0;i<arguments.length;i++) {
			document.getElementById(arguments[i]).style.display='none';
		}
	}
	function showElements() {
		for (i=0;i<arguments.length;i++) {
			document.getElementById(arguments[i]).style.display='';
		}
	}

		
