    /*
    (C) Copyright MarketLive. 2006. All rights reserved.
    MarketLive is a trademark of MarketLive, Inc.
    Warning: This computer program is protected by copyright law and international treaties.
    Unauthorized reproduction or distribution of this program, or any portion of it, may result
    in severe civil and criminal penalties, and will be prosecuted to the maximum extent
    possible under the law.
    */

    // A global boolean for turning on/off debug statements printed out to the firebug console.
    var bDebugOmniture = false;

    // A global object used to hold product info tab views, so we report them only once
    var oTabViews = {};

    /**
     * Parses an Omniture specific JSON Object.
     * Evals all root level key value pairs, prepending "s." to the key
     * Separates out the handling of keys with a non-string values (objects, arrays)
     * Special Case parsing is done within switch statements
     * @param {Object} oOmnitureJSON An Omiture specific JSON Object.
     */
    function parseOmnitureJSON(oOmnitureJSON){

        // add an empty products array to the JSON object if the conditions are satisfied
        oOmnitureJSON = addEmptyProductsArray(oOmnitureJSON);

        // loop through all properties within the object
        for(key in oOmnitureJSON) {

            // only continue if the property has a value != null
            if (oOmnitureJSON[key] != null){

                // parse object/array values here
                if (typeof(oOmnitureJSON[key]) == "object"){

                    // switch on the key name (eg. products, events, ect.)
                    switch(key){
                        case "products":
                            var sKeyVal = "s."+ key +"="; // the string to eval
                            var aProds = new Array(); // an array of products in the omniture syntax (;name;code;qty;subTotal;)
                            var aEventKeyValues = new Array(); // an array of events in the omniture syntax (event=value)

                            // loop through the products and add them, in the omniture syntax, to the aProds array
                            for (var i=0; i<oOmnitureJSON[key].length; i++){
                                var sName = oOmnitureJSON[key][i]["name"];
                                var sCode = "("+ oOmnitureJSON[key][i]["code"] +")";
                                var sQty = nullValueToString(oOmnitureJSON[key][i]["quantity"]);
                                var sSubTotal = nullValueToString(oOmnitureJSON[key][i]["subTotal"]);

                                var eventString = "";
                                if (oOmnitureJSON[key][i]["events"] != null){
                                    var event = "";
                                    for(event in oOmnitureJSON[key][i]["events"]) {
                                        if(eventString.length > 0){
                                            eventString += "|";
                                        }
                                        if(event.length > 0){
                                            eventString += event + "=" + oOmnitureJSON[key][i]["events"][event];
                                            }
                                            }
                                        }

                                var eVarString = "";
                                if (oOmnitureJSON[key][i]["eVars"] != null){
                                    var eVar = "";
                                    for(eVar in oOmnitureJSON[key][i]["eVars"]) {
                                        if(eVarString.length > 0){
                                            eVarString += "|";
                                        }
                                        if(oOmnitureJSON[key][i]["eVars"][eVar] != null){
                                            eVarString += eVar + "=" + oOmnitureJSON[key][i]["eVars"][eVar];
                                        }
                                    }
                                }

								var productString = ";" + sName +" "+ sCode +";"+ sQty +";"+ sSubTotal +";"
								if(eventString.length > 0){
                                    productString += eventString + ";";
                                }
                                if(eVarString.length > 0){
									if(eventString=="")
									productString += ";" +eVarString + ";";
									else
                                    productString += eVarString + ";";
                                }
								//Fix for WOMA-917
								if(productString.length > 0){
									productString=productString.substr(0,productString.length - 1);
								}
                                aProds[aProds.length] = productString;
                            }

                            // loop through the events and add them, in the omniture syntax, to the aEventKeyValues array
                            for(subKey in oOmnitureJSON["events"]) {
                                if(oOmnitureJSON["events"][subKey] != null){
                                    aEventKeyValues[aEventKeyValues.length] = subKey +"="+oOmnitureJSON["events"][subKey];
                                }
                            }
							//Reverted back the changes for WOMA-1366
                            // add the gathered events (joined by a "|") to the aProds array
                            if (aEventKeyValues.length > 0) aProds[aProds.length] = ";;;;" + aEventKeyValues.join("|")

                            // build the final string by joining the aProds array with a ","
                            sKeyVal += '"'+ escapeChars(aProds.join(",")) +'"';

                            // print out the final string (if debugging is turned on)
                            debugOmniture(sKeyVal);

                            // eval the resulting string
                            eval(sKeyVal);
                            break;

                        case "events":
                            var sKeyVal = "s."+ key +"="; // the string to eval
                            var aEventKeys = new Array(); // an array of event key names
                            var oSubObject = oOmnitureJSON[key]; // the event's object var

                            // loop through the event object's properties, adding the key names to the aEventKeys array
							//special case for order confirmation page -WOMA-917
							//Reverted back the changes for WOMA-1366
							/*if(oOmnitureJSON["purchaseID"]!=null){
								for(subKey in oSubObject) {									
									if(oOmnitureJSON["events"][subKey]!=null && oOmnitureJSON["events"][subKey].length > 0)
									aEventKeys[aEventKeys.length] = subKey +"="+oOmnitureJSON["events"][subKey];
									else
									aEventKeys[aEventKeys.length] = subKey
								}
							}else{*/
								for(subKey in oSubObject) {									
									aEventKeys[aEventKeys.length] = subKey
								}
							//}

                            // build the final string by joining the aEventKeys array with a ","
                            sKeyVal += '"'+ aEventKeys.join(",") +'"';

                            // print out the final string (if debugging is turned on)
                            debugOmniture(sKeyVal);

                            // eval the resulting string
                            eval(sKeyVal);
                            break;
                        case "assignments":
                            var oSubObject = oOmnitureJSON[key]; // the assignments' object var

                            // loop throug the object's properties
                            for(subKey in oSubObject) {
                                var sKeyVal = "s."+ subKey +"=s."+ oSubObject[subKey]; // the string to eval

                                // print out the final string (if debugging is turned on)
                                debugOmniture(sKeyVal);

                                // eval the resulting string
                                eval(sKeyVal);
                            }

                            break;
                        default:
                            break;
                    }

                // parse string values here
                } else {

                    // switch on the key name
                    switch(key){
                        case "specialCaseHere":
                            break;

                        default:
                            // only continue if the property has a value != null
                            if (oOmnitureJSON[key] != null){
                                // the string to eval, in the omniture syntax s.keyName="Value"
                                var sKeyVal = "s." + key +'="'+ escapeChars(oOmnitureJSON[key]) +'"';

                                // print out the final string (if debugging is turned on)
                                debugOmniture(sKeyVal);

                                // eval the resulting string
                                eval(sKeyVal);
                            }
                            break;
                    }
                }
            }
        }
    }

    /**
     * Converts a null value to an empty string.
     * @param {String} sValue A string value.
     * @return The value passed in or an empty string if the value was null.
     * @type String
     */
    function nullValueToString(sValue){
        return (sValue != null)? sValue:"";
    }

    /**
     * Escapes characters contained within a string
     * @param {String} sValue A string value.
     * @return The original string with the escaped characters
     * @type String
     */
    function escapeChars(sValue){
        sValue = sValue.replace(/\\/g, "\\\\");
        return sValue.replace(/\"/g, "\\\"");
    }

    /**
     * Prints out a string to FireBug's Console, if the bDebugOmniture boolean is set to true.
     * @param {String} A String value to pass the the console.log() function call.
     */
    function debugOmniture(sKeyVal){
        if (bDebugOmniture == true && typeof(console) != "undefined"){
            console.log("Omniture: "+sKeyVal);
        }
    }

    /**
     * Returns the value of the input variable.
     * Can be used only for getting the values of eVars, props and the pageName.
     * @param {String} A String varaible mame.
     */
    function getOmnitureVariable(variableName) {
        return oOmnitureJSON[variableName];
    }
    
    /**
     * Sends the tab name to parseOmnitureJSON to instantiate the appropriate Omniture vars.
     * This only sends the tab name once per tab view/click.
     * @param {String} sTabID A String value holding the tab id.
     * @param {String} sTabName A String value holding the tab name.
	 * Function modified for WOMA-784
     */
    function reportTabViewToOmniture(sTabID, sTabName){		
        if (oTabViews[sTabID] == null){
            var s=s_gi(getId());
            //var sLinkName = "TabView_";
			var sLinkName = "";
            sLinkName += sTabName;
            var sTrackEvents = "";
			var sTrackEvars="";
			var oProducts =  oOmnitureJSON["products"];
			var key="products";
			 // send data to parseOmnitureJSON()
            parseOmnitureJSON({"prop16":sTabName,"eVar31":sLinkName});
			//WOMA-784
			if(typeof(oProducts)){
				for (var i=0; i<oProducts.length; i++){            
				 var sEvent = oProducts[i]["events"]; 
				 if(typeof(sEvent))
				 oProducts[i]["events"]=null;
				 oProducts[i]["eVars"]["eVar31"]=sLinkName;
				}
			}		
            // special case for customer reviews
            if (sTabID == "tab_99") {
                parseOmnitureJSON({"events":{"event25":null}});
                s.linkTrackEvents="event25";
				if(typeof(oProducts))
				parseOmnitureJSON({"products":oProducts});				
				sTrackEvents=",events";	
            }
			//special case for Overview tab
			 if (sTabID == "tab_90") {							
                parseOmnitureJSON({"events":{"event62":null}});	
				if(typeof(oProducts))
				parseOmnitureJSON({"products":oProducts});
                s.linkTrackEvents="event62";				
                sTrackEvents=",events";				
            }
			//special case for Story Behind tab
			 if (sTabID == "tab_91") {			
                parseOmnitureJSON({"events":{"event63":null}});
				if(typeof(oProducts))
				parseOmnitureJSON({"products":oProducts});
                s.linkTrackEvents="event63";				
                sTrackEvents=",events";				
            }            
			  // send the data to Omniture
		    s.linkTrackVars="prop16,products" +sTrackEvents;
            s.tl(true,'o',"Product Detail Pg Interactions");

            // set the tab id in oTabViews so we don't send the data again
            oTabViews[sTabID] = true;
        }
    }

    /**
     * Sends the code of the sourcecode added to the user's session,
     * to parseOmnitureJSON to instantiate the appropriate Omniture vars.
     * @param {String} sourceCodeValue The CODE of the source code added.
     */
    function reportSourceCodeAdditionToOmniture(sourceCodeValue){
        var s=s_gi(getId());
        var sLinkName = "SourceCodeAdd_";
        sLinkName += sourceCodeValue;
        var sTrackEvents = "";

        // send data to parseOmnitureJSON()
        parseOmnitureJSON({"eVar8":sourceCodeValue});
        parseOmnitureJSON({"events":{"event3":null}});
        s.linkTrackEvents="event3";
        sTrackEvents=",events";

        // send the data to Omniture
        s.linkTrackVars="eVar8" + sTrackEvents;
        s.tl(true,'o',sLinkName);
    }

	/**
	* This function is used for tracking call to 
	* social media buttons WOMA-786
	**/
	function trackSocialMedia(socialTagName){		
		var s=s_gi(getId());		
		var oProducts = oOmnitureJSON["products"];		
		var sTrackEvents = "";				
		// send data to parseOmnitureJSON()		
		parseOmnitureJSON({"eVar45":socialTagName});			
		if(typeof(oProducts)){
				for (var i=0; i<oProducts.length; i++){
				 oProducts[i]["events"]=null;
				 //WOMA-1088
				 if(typeof(oProducts[i]["eVars"]["eVar30"]))
					oProducts[i]["eVars"]["eVar30"]=null;
				if(typeof(oProducts[i]["eVars"]["eVar33"]))
					oProducts[i]["eVars"]["eVar33"]=null;
				 oProducts[i]["eVars"]["eVar45"]=socialTagName;
				}
			}
			parseOmnitureJSON({"products":oProducts});
		//FaceBook Likes
		if(socialTagName=="Facebook Likes"){
		parseOmnitureJSON({"events":{"event64":null}});
		s.linkTrackEvents="event64";
		}
		//FaceBook Comments
		if(socialTagName=="Facebook Comments"){
		parseOmnitureJSON({"events":{"event68":null}});
		s.linkTrackEvents="event68";
		}
		//Twitter
		if(socialTagName=="Twitter Tweets"){
		parseOmnitureJSON({"events":{"event65":null}});
		s.linkTrackEvents="event65";
		}

		//Google Plus
		if(socialTagName=="Google +1 Shares"){
		parseOmnitureJSON({"events":{"event66":null}});	
		s.linkTrackEvents="event66";
		}
		//Pinterest
		if(socialTagName=="Pinterest Pins"){
		parseOmnitureJSON({"events":{"event67":null}});
		s.linkTrackEvents="event67";
		}
						
		sTrackEvents=",events";	
		s.linkTrackVars="prop24,products" +sTrackEvents;
		s.prop24="s.getPreviousValue";
		s.tl(true,'o','Social Media');
	}
    /**
     * Handle "onload type" tracking, or tracking that requires the modification of DOM elements,
     * such as adding click event tracking to links.
     */
    if(typeof(jQuery) != "undefined"){
        jQuery(document).ready(function($){
            // check for and track linked fillslot images
            trackLinkedFillslotImages();
        });
    }

    /**
     * Method for tracking linked images (generated by marketlive display) within kickers and fillslots
     * 1) Checks for images with the "mlfsimg" CSS class.
     * 2) Grab the image name and assign an onclick event to the image's link.
     * 3) Set and send the Omniture vars.
     */
    function trackLinkedFillslotImages(){
        jQuery(".mlfsimg").each(function (i){
            var oImg = jQuery(this);
            var sSrc = oImg.attr("src").split("/");
            var sImgName = sSrc[sSrc.length -1];
            oImg.parent("a").click(function () {
                // set the Omniture vars
                parseOmnitureJSON({
                    "eVar2":sImgName,
                    "prop12":sImgName,
                    "assignments":{
                    	"eVar16":"pageName",
                        "prop13":"pageName",
                        "eVar17":"prop1",
                        "prop14":"prop1"}
                    });

                // send the data to Omniture - Modified for WOMA-1004
                var s=s_gi(getId());
                s.linkTrackVars="eVar2,prop12,eVar16,prop13,eVar17,prop14";
                s.tl(jQuery(this)[0],'o','Content Slot Tracking');

                //return false;
            });
        });
    }

    /**
     * Checks for null products with non null events.
     * If this condition is found we create/add an empty products array,
     * so that the parser appends the event key/values to the empty products var.
     * @param {Object} oOmnitureJSON The original Omniture JSON object.
     * @return The oOmnitureJSON object with the empty products array if the condition is satisfied.
     * @type Object
     */
    function addEmptyProductsArray(oOmnitureJSON){
        // grab the events and products from the Omniture JSON object
        var oEvents = oOmnitureJSON["events"];
        var oProducts =  oOmnitureJSON["products"];

        // only continue if there are no products, but there are events
        if(!oProducts && oEvents){
            // boolean for holding whether or not we find a non null event value.
            var bFoundNonNullEvent = false;

            // loop through the event object
            for(subKey in oEvents) {
                // set bFoundNonNullEvent to true if any non null value is found
                if (oEvents[subKey] != null) bFoundNonNullEvent=true;
            }

            // set the products to an empty array if we found any non null event values
            if (bFoundNonNullEvent) oOmnitureJSON["products"] = new Array();
        }

        // return the Omniture JSON object
        return oOmnitureJSON;
    }
	/**
     * Sets the events for bazarrvoice rating and link name (WOMA-1082)
     * to parseOmnitureJSON to instantiate the appropriate Omniture vars.
     */
    function reportBazarrVoiceReview(){		
        var s=s_gi(getId());
		var sLinkName = "Bazarrvoice Review";
		var oProducts = oOmnitureJSON["products"];
        var sTrackEvents = "";
        // send data to parseOmnitureJSON()
		if(typeof(oProducts)){
			parseOmnitureJSON({"products":oProducts});
		}		
        parseOmnitureJSON({"events":{"event24":null}});
        s.linkTrackEvents="event24";
        sTrackEvents=",events";

        // send the data to Omniture
		s.linkTrackVars="products" +sTrackEvents;
        s.tl(true,'o',sLinkName);
    }
	/**
     * Sets the events,evar and products data when change in store is called through store page
     * to parseOmnitureJSON to instantiate the appropriate Omniture vars.(WOMA-1823)
     */
	function reportInStoreChange(omniJSON){		 
		var s=s_gi(getId());
		var aEventKeys = new Array(); 
		var oEvents = omniJSON["events"];
		var eventStr="";
		var oProducts =  omniJSON["products"];
		 // loop through the event object
		if(typeof(oEvents)){
			for(subKey in oEvents) {    			
				aEventKeys[aEventKeys.length] = subKey;				   
			}
		  parseOmnitureJSON({"events":oEvents});
	    }
         eventStr += aEventKeys.join(",");

		if(typeof(oProducts)){			
			parseOmnitureJSON({"products":oProducts});
		}
		s.linkTrackEvents=eventStr;
		sTrackEvents=",events";	
		s.linkTrackVars="eVar34,products" +sTrackEvents;		
		s.tl(true,'o','Store Tracking');
	}