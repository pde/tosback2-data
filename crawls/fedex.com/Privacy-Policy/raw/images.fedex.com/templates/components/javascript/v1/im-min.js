var wwwLoc = new String(window.location);
var wwwHost = wwwLoc.replace(/http(s)?:\/\/((.*\.)?fedex\.com)\/.*/, "$2");
var devCk = new RegExp("(localhost|127\.0\.0\.1)", "g");
var devFlag = devCk.exec(wwwHost);
var testSite = true;
if (wwwHost == "www.fedex.com") {
    testSite = false;
}

var maxIMTime = 1500;
var maxIMTimeFO = 2000;
var turnOffIM = false;
var g_timeout = null;
var g_script_url = null;
var g_script_id = null;
var bDisplayed = false;
var flashMovie = null;
var xplusoneid = null;
var isFlashReady = false;
var containerReady = false;
var bagCode = null;
var bagClickThrURL= null;

var IM = {
    _xp1_useAutoReplaceClickURLs: false,
    _xp1_o: "37257",
    _xp1_random: Math.floor(Math.random() * 99),
    _xp1_qsNameValuePairs: { "ssv_callback": "IM.setPlacements" },
    _cvp_qsNameValuePairs: { "cvp_callback": "IM.setCVPPlacements" },
    setPlacements: function (placements) {
        clearTimeout(g_timeout);
        if (bDisplayed)
            return;
        try {
            for (var p in placements) {
                var placement = document.getElementById(p);   
				if(xplusoneid == null){
					if (p == "placement_1"){
						xplusoneid = placements[p].xp1_id;  						
					}
				}
				var creative = xp1_bagMapping[placements[p].creativeID];
                if (placement == undefined || placement == null) {
                    throw "Placement Not Found";
                }
                if (creative == undefined || creative == null) {
                    throw "Creative Not Found";
                }
				
                if (placement != undefined && creative != undefined && placement != null && creative != null) {
                    if (placements[p].clickURL != undefined && placements[p].clickURL != null) {
                        placement.innerHTML = "<a href='" + placements[p].clickURL + creative["url"] + IM.getParamSeparator(creative["url"]) + "INTCMP=BAL-" + placements[p].creativeID + "'><img border='0' src='" + creative["image"] + "'/></a>";
                    }
                    else {
                        placement.innerHTML = "<a href='" + creative["url"] + IM.getParamSeparator(creative["url"]) + "INTCMP=BAL-" + placements[p].creativeID + "'><img border='0' src='" + creative["image"] + "'/></a>";
                    }
                    try {
                        scDsp("BAL-" + placements[p].creativeID);
                    } catch (e) { }
                }
            }
            bDisplayed = true;
			
			/* check and set the cookie value */			        
        if (xplusoneid == undefined || xplusoneid== null) 
                    throw "xid Not Found";
	      else 
			  checkCookie(xplusoneid);
			
        } catch (err) {
            if (placements != xp1_failoverPlacements) {
                IM.setPlacements(xp1_failoverPlacements)
            }
        }	
	
    },
    getParamSeparator: function (baseURL) {
		if (baseURL.indexOf("?") > -1) {
			return "&";
		} else {
			return "?";
		}
    },
    loadIMScript: function (type, tag) {
        if (!turnOffIM) {
            var spath = getMetaTagValue("wssmlc");
            var imid;
            var runme = false;
            if ((spath.indexOf("US/Home") > -1 && amILoggedIn() != "")) { /*CVP Integration */
				runme = true;
                g_script_url = "https://" + IM.requestCVPDomain() + "/sonarService?data=" + IM.createCVPString();
                imid = "cvpScript";
				
            }
            else {
				   if (((spath.indexOf("US/Home") < -1)||(spath.indexOf("US/Home") == -1))){
				     runme = true;
                    g_script_url = IM.getProtocol() + "://" + IM.requestDomain() + "/meta" + IM.createQueryString(type, tag);
                    imid = "xp1Script";   
					         
				}/*end of if condition*/
				/* To display the SAG off */	
			  if ((spath.indexOf("US/Home") > -1)) {
                    var sagwrap = document.getElementById("placement_1"); // hide the SAG div if not logged in
                    if(sagwrap != null && sagwrap != undefined)
                    	sagwrap.parentNode.parentNode.style.display = "none";
              }
			}
			  
            if (runme)
			  {
                g_script_id = imid + type;
                loadScript(g_script_id, g_script_url);
                if (type == "D") {
                    g_timeout = setTimeout(function (event) {
                        var scripts = document.getElementsByTagName("script");
                        for (var i = 0; i < scripts.length; i++) {
                            if (scripts[i].id == g_script_id) {
                                if (bDisplayed)
                                    return;
                                var head = document.getElementsByTagName('HEAD').item(0);
                                head.removeChild(scripts[i]);
                                IM.setPlacements(xp1_failoverPlacements);
                                var imgFail = new Image();
                                imgFail.src = "/images/ascend/shared/headers/corp_logo.gif?xp1_response_failure";
                                break;
                            }
                        }
                    }, maxIMTime)
                }
            }
        } else {			
            IM.setPlacements(xp1_failoverPlacements);
        }
    },	
    getSSVParameters: function () {
        var ssvParameters = "";
        var regexS = /ssv_[^\=]*\=[^\&]*/gi;
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        var matches = window.location.href.match(regex);
        for (var i in matches) {
            ssvParameters += matches[i] + "&";
        }
        return ssvParameters;
    },
    getReferrer: function () {
        var domain = document.referrer.match(/\/\/([^\/]+)\/?/);
        var referringDomain = "";
        if (domain != null && domain.length > 1) {
            domain = domain[1].split(".");
            referringDomain = domain.pop();
            if (domain.length > 0) {
                referringDomain = domain.pop() + "." + referringDomain;
            }
        }
        return referringDomain;
    },
    createQueryString: function (type, tag) {
        var sname = getMetaTagValue("wsstitle");
        sname = sname.toLowerCase();
        sname = sname.replace(/^\+/g, "");
        sname = sname.replace(/\+/g, " ");
        var spath = getMetaTagValue("wssmlc");
        spath = spath.toLowerCase();
        spath = spath.substring(6);
        spath = spath.replace(/\/+/g, " ");
        if (spath.indexOf("inet") > -1) {
            sname = "inet label " + sname;
        } else if (spath.indexOf("supplies") > -1) {
            sname = "supplies " + sname;
        } else if (spath.indexOf("wgrt") > -1) {
            sname = "rating " + sname;
        } else if (spath.indexOf("pickup") > -1) {
            sname = "pickup confirmation";
        } else if (spath.indexOf("oadr") > -1) {
            sname = "oadr confirmation";
        } else if (spath.indexOf("gfbo") > -1) {
            sname = "global fedex billing online";
        } else if (spath.indexOf("detail tracking") > -1) {
            sname = "tracking results";
        }
        sname = sname.replace(/\ /g, "-");
        var qs = "?_o=" + IM._xp1_o + "&_t=";
        var _t = null;
        if (type == "B") {
            _t = "behavior";
        } else if (type == "T") {
            _t = sname;
        } else {
            _t = xp1_t;
        }
        qs += _t;
        if (type == "B") {
            qs += "&ssv_013=" + sname;
        }
        qs += "&ssv_015=" + getcookie("fcl_uuid");
        if (type == "D") {
            for (var n in IM._xp1_qsNameValuePairs) {
                qs += "&" + n + "=" + IM._xp1_qsNameValuePairs[n];
            }
            qs += "&ssv_random=" + IM._xp1_random + "&ssv_012=" + IM.getReferrer() + "&" + IM.getSSVParameters();
        }
        return qs;
    },

    //Create the CVP String 
    createCVPString: function () {

        //build json string
		var myCookie = getcookie("fcl_uuid");
		var xp1Cookie = getcookie("xp1_uid");
		//xp1Cookie = AB123456;
        var cvpQs = '{"Sonar_request":{"guestID":"'+ myCookie +  '","guestType":"IM","destination":"FEDEX.COM","touchpoint":"FDXPR","location":"FHP","brand":"","style":"fdx.com-sonar","priorityOnlyFlag":"","productionFlag":"","externalData":"","_o":"37257","_t":"opCo","ssv_012":"fedex.com","ssv_011":"' + IM._xp1_random + '","ssv_015":"';       
        cvpQs += myCookie;
        //cvpQs += '","ssv_016":""';
        cvpQs += '","ssv_016":"' + getUrlParam("ssv_016") + '",';
		cvpQs += '"xp_uuid":"';
		cvpQs += xp1Cookie;
		cvpQs +='"}}';		
		
        for (var n in IM._cvp_qsNameValuePairs) {
            cvpQs += "&" + n + "=" + IM._cvp_qsNameValuePairs[n];
        }
        return cvpQs;
    },
    requestCVPDomain: function () {
        if (testSite) {
            return "mnfxuat.epsilon.com/sonar";
        }
	else
            return "sonar.fedex.com"; //this url needs to be replaced with the production url once we get a confirmation from Epsilon
    },
    setCVPPlacements: function (Sonar_response_obj) {
        //parse placements for cvp or x+1 that cvp return
        clearTimeout(g_timeout);
        //parse placements if it is a CVP customer
		/*        
		00: This indicates, JSON call is success and CVP messages and x+1 BAG tracking code is returned successfully in response.
		01: Indicates call to JSON is success but no messages returned from CVP and only X+1 tracking codes returned for both BAG and SAG.
		02: : Indicates call to JSON is success but only CVP messages returned and  no  X+1 tracking codes returned. FedEx should show default BAG content on the site.
		99: This indicates JSON call is failed. FedEx should show both default BAG and SAG content on the site.
		*/
        try {
            if (Sonar_response_obj == undefined || Sonar_response_obj == null) {
                throw "Sonar Response Not Found";
            }
            var statusCode = Sonar_response_obj.Sonar_response.status;

            if (Sonar_response_obj.Sonar_response.status == undefined || Sonar_response_obj.Sonar_response.status == null) {
                throw "Status Code Not Found";
            }

            if (Sonar_response_obj != undefined && statusCode != undefined && Sonar_response_obj != null && statusCode != null) {
                var i = "";
                if (statusCode == "00") {
                    bagCode = Sonar_response_obj.Sonar_response.trackingCodes.bagCode;
                    bagClickThrURL = Sonar_response_obj.Sonar_response.trackingCodes.bagClickThrURL;
                    if (bagCode == undefined || bagCode == null) {
                        throw "Bag Code Not Found";
                    }
                    if (bagClickThrURL == undefined || bagClickThrURL == null) {
                        throw "Bag Click Url Not Found";
                    }
                }
                //set the global variable....this needs to be clarified with Epsilon or tested against a response
                if (statusCode == "02") {
                    bagCode = "failover_us"
                    bagClickThrURL = "";
                }

                if (statusCode == "00" || statusCode == "02") {
                    var myZones = Sonar_response_obj.Sonar_response.zones;
                    if (myZones == undefined || myZones == null)
                        throw "No Zones";

                    for (var zone in myZones) {

                        if (zone == undefined || zone == null)
                            throw "Zone Not Found";

                        var code = myZones[zone].code;
                        if (code == undefined || code == null)
                            throw "Code not found";

                        //to display the message in the welcome component
                        if (code == "RC") {
                            var myMessages = myZones[zone].messages;
                            if (myMessages == undefined || myMessages == null)
                                throw "No Messages";

                            for (var msg in myMessages) {
                                if (msg == null || msg == undefined)
                                    throw "No message";

                                var placement = document.getElementById("placement_cvp");
                                if (placement != null && placement != undefined) {
                                    placement.innerHTML = myMessages[msg].message; //check on the quotes	
                                }
                            } // end for loop
                        } // end if zone

                        //to display the right side SAG            
                        if (code == "FC") {
                            var myMessages = myZones[zone].messages;
                            if (myMessages == undefined || myMessages == null)
                                throw "No Messages";

                            for (var msg in myMessages) {
                                if (msg == null || msg == undefined)
                                    throw "No message";

                                var placement = document.getElementById("placement_1");
                                if (placement != null && placement != undefined) {
                                    //placement.innerHTML = "<img border='0' src='" + myMessages[msg].message + "'/>";	//check on the quotes
                                    placement.innerHTML = myMessages[msg].message; // temporary text until we get img url
                                }
                            } // end messages
                        } // end of FC
                    } // end of Zones
                } // end status code

                if (statusCode == "01") {

                    	bagCode = Sonar_response_obj.Sonar_response.trackingCodes.bagCode;
                    var sagCode = Sonar_response_obj.Sonar_response.trackingCodes.sagCode;
					

                    	bagClickThrURL = Sonar_response_obj.Sonar_response.trackingCodes.bagClickThrURL;
                    var sagClickThrURL = Sonar_response_obj.Sonar_response.trackingCodes.sagClickThrURL;
					

                    if (bagCode == undefined || bagCode == null) {
                        throw "bag Code Not Found";
                    }
                    if (sagCode == undefined || sagCode == null) {
                        throw "sag Code Not Found";
                    }
                    if (bagClickThrURL == undefined || bagClickThrURL == null) {
                        throw "bag URL Not Found";
                    }
                    if (sagClickThrURL == undefined || sagClickThrURL == null) {
                        throw "sag URL Not Found";
                    }

                    if (bagCode != undefined && sagCode != undefined && bagClickThrURL != undefined && sagClickThrURL != undefined && bagCode != null && sagCode != null && bagClickThrURL != null && sagClickThrURL != null) {
                       
					     //console.log("Within bagCode condition");
                        //use bagmapping to put images in the placements
                        for(var p in xp1_bagMapping){
                            if (p == sagCode) {
                            	var placement1 = document.getElementById("placement_1");
                            	placement1.innerHTML = "<a href='"+ sagClickThrURL + xp1_bagMapping[p].url + IM.getParamSeparator(xp1_bagMapping[p].url) + "INTCMP=BAL-" + p + "'><img border='0' src='" + xp1_bagMapping[p].image + "'/></a>";
							  try {
                                scDsp("BAL-" + p);
                                  } catch (e) {//console.log(e.toString());
                                }	
								
                            } //end of if loop for sag_code

                          
                        } // end xp1 for loop
                    } //end of check for ifk for if                                    
                } //end of status code 01

                if (statusCode == "99") {
                    throw "Error 99 in response from Epsilon";
                }
            } //end of if for status Code check 													

        } //end of try 				   

        catch (err) {
        	//console.log(err);
            IM.setPlacements(xp1_failoverPlacements);
        }
        
		// try setting the flash vars every 100ms for 3 seconds 
		var bagSetInterval = setInterval(setBagPlacement, 100);
		// give up after 3 seconds
		var bagTimeout = setTimeout(function(){ clearInterval(bagSetInterval); }, 3000);
		
		function setBagPlacement(){
		
			//console.log("Is flash ready: " + isFlashReady);
			try{
			
				if(isFlashReady){
					//console.log("before getFlashMovieObj");
					var flashMovie = getFlashMovieObject("bagShell");
					//console.log("before goCVP: " + bagCode);
					flashMovie.goCVP(bagCode);
					//console.log("after goCVP");
					//console.log("before linkCVP: " + bagClickThrURL);
					flashMovie.linkCVP(bagClickThrURL);
					//console.log("after linkCVP");
					clearInterval(bagSetInterval);
				}
			}
			catch (e){
				//console.log(e.toString());
			}
		}
    }, //end of setCVPPlacements,
    requestDomain: function () {
		 if (testSite) {
            return "stg.xp1.ru4.com";
        }
     else
        return "s.xp1.ru4.com";
    },
    getProtocol: function () {
        var proto = window.location.protocol;
        if (proto.toLowerCase().indexOf("https") > -1) {
            return "https";
        }
        return "http";
    },
    log: function (tag, view) {
        var stype = "B";
        try {
            if (view != "P") {
                stype = "T";
            }
        } catch (e) { }
        IM.loadIMScript(stype, tag);
    },
    // Expose method for Apps to pass data to IM so we can send to SiteCatalyst
    setIM_Props: function (obj, objName) {
    	// stubbed
 		return;
    },    
    /**
    * Check for Ad being displayed
    * @param element String html element where the Ad will be displayed 
    * @param failover Object json object of failover Ad to show in the html element
    * @return
    */
    checkPlacement: function (element, failover, tmname) {
        tmname = setTimeout(function (event) {
            //check for innerHTML element if there 
            var p = document.getElementById(element);
            if (p.innerHTML == null || p.innerHTML == undefined || p.innerHTML == "") {
                bDisplayed = false;
                clearTimeout(tmname);				
                IM.setPlacements(failover);
                //call to log failure
                var imgFail = new Image();
                imgFail.src = "/images/ascend/shared/headers/corp_logo.gif?testtarget_response_failure";
            }
        }, maxIMTimeFO);
    }
};
function loadScript(id, url) {
    var oScript = document.createElement("script");
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    oScript.charset = "utf-8";
    oScript.async = 'true';
    oScript.id = id;
    oScript.src = url; 
    var oHead = document.getElementsByTagName('HEAD').item(0);
    oHead.appendChild(oScript);
}
function getMetaTagValue(metaName) {
    var sreturn = "";
    var m = document.getElementsByTagName('meta');
    for (var i in m) {
        if (m[i].name == metaName) {
            sreturn = m[i].content;
            break;
        }
    }
    return sreturn;
}
function getUrlParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) {
        return "";
    } else {
        return results[1];
    }
}

function amILoggedIn(){
    var cookieValue = "";
    
    cookieValue = getcookie("fcl_uuid");

    return !Boolean(cookieValue == "" || cookieValue == ";");

}
/*Check if the cookie is set */
function checkCookie(value)
{
	var xp1_uuid=getcookie("xp1_uid"); 
  	if (xp1_uuid == null || xp1_uuid == "")
    {
    	setCookie("xp1_uid",value,90);
    }
  
}
/*Set the cookie value*/
function setCookie(cookie_name,value,exdays)
{
if (value != null){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=cookie_name + "=" + c_value;
}
}


function getcookie(cookiename) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(cookiename + "=");    // account for the '=' for some browsers (even when no value). it if aint there we can guarantee there's no value set.
        if (c_start != -1) {
            c_start = c_start + cookiename.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

// Gets a reference to the specified SWF file by checking which browser is
// being used and using the appropriate JavaScript.
// Unfortunately, newer approaches such as using getElementByID() don't
// work well with Flash Player/ExternalInterface.
function getFlashMovieObject(bagShell)
{
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[bagShell];
	} else {
		return document[bagShell];
	}
}

function scriptLoaded(){
	// record that JavaScript is ready to go.
	//console.log("script onload event within im.js");
	containerReady = true;
}

function isContainerReady(){
	//console.log("flash asking if container is ready: " + containerReady);
	//return containerReady;
	return true;
}

function flashReady(value){
   isFlashReady = true;
   //console.log("flash told us its good to go");
}

//load bag mapping js
(function(){
	// Include appropriate bagmapping .js by page name.
	var wss_mlc = getMetaTagValue("wssmlc");
	var wss_title = getMetaTagValue("wsstitle");
	
	if(wss_mlc.indexOf("US/Home") > -1) {
		loadScript('loginbm',"/templates/components/javascript/us/en/bagmappings/usHome_bm.js");
	}
	else if(wss_title.indexOf("/newcustomer") > -1) {
		if(wss_mlc == "/br/pt/fedex/")
			loadScript('lac_welcome_bm',"/templates/components/javascript/bagmappings/lac/port/welcomecenter_br_pt_bm.js");
		else if(wss_mlc == "/ar/es/fedex/")
			loadScript('lac_welcome_bm',"/templates/components/javascript/bagmappings/lac/espanol/welcomecenter_ar_es_bm.js");
		else if(wss_mlc == "/co/es/fedex/")
			loadScript('lac_welcome_bm',"/templates/components/javascript/bagmappings/lac/espanol/welcomecenter_co_es_bm.js");
		else if(wss_mlc == "/mx/es/fedex/")
			loadScript('lac_welcome_bm',"/templates/components/javascript/bagmappings/lac/espanol/welcomecenter_mx_es_bm.js");
		else if(wss_mlc == "/pr/es/fedex/")
			loadScript('lac_welcome_bm',"/templates/components/javascript/bagmappings/lac/espanol/welcomecenter_pr_es_bm.js");	
	}
})(); // self-executing