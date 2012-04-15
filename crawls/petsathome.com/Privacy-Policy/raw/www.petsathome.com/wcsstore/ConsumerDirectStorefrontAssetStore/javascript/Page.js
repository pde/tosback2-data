$(document).ready(function() {

	//*************************************************************************
	// Superfish animated navigation dropdowns + bgiframe plugin + delayed hover plugin
	$(".navigation").superfish({animation : { opacity:"show", height:"show" }, autoArrows:false, delay:200, speed:'fast', dropShadows:false }).find('ul').bgIframe({opacity:false});

});


/*************************************************************************
* Set up salmon namespace
*************************************************************************/

if (!salmon) var salmon = {};


/*************************************************************************
* Name space methods
*************************************************************************/

salmon.namespace = {
	addNamespace: function(namespace) {
		var parts = namespace.split(".");
		var root = window;
		for(var i=0;i<parts.length;i++) {
			if(typeof root[parts[i]] != "object") {
				root[parts[i]] = {};
			}
			root = root[parts[i]];
		}
	}
}


/*************************************************************************
* Page utility methods
*************************************************************************/

salmon.page = {
   
   // get page context   
   //SITENAME : "",
   //PAGENAME : "",
   //LANGUAGE : "",
   
   //reset display of default form field text      
   resetField : function(fieldName) {
       //Get reference
       var field = document.getElementById(fieldName);
       //get defensive
       if (!field) return;
       //Clear search field
       field.onclick = function() {field.value="";};
       //Re-populate with default value
       //field.onblur = function() {field.value = field.defaultValue;};
                               
   },
               
   // cookie get and set
   setCookie : function(name,value,days) {
       if (days) {
                      var date = new Date();
                      date.setTime(date.getTime()+(days*24*60*60*1000));
                      var expires = "; expires="+date.toGMTString();
       }
       else { 
       var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
       }
   },
               
   getCookie : function(name) {
       var cookie = null;
       var nameEQ = name + "=";
       var ca = document.cookie.split(';');
       for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
    	      if (c.indexOf(nameEQ) == 0) {
	             cookie = c.substring(nameEQ.length,c.length);
              }
           }
           return cookie;
       },
 
       removeCookie : function(name) {
           sas.page.createCookie(name,"",-1);
       },
               
       spawn : function( linkRef, winName, features ) {
           // this,'Howtoguide','width=415,height=500,directories=no,location=no,top=10,left=0'
           var popUp = window.open(linkRef.href, winName, features);
           //linkRef.removeAttribute("target");
           //popUp.focus();
           	//if(window.focus) {
           	//	popUp.window.focus()
           	//	}
           return false;
       },
               
       saveTrolley : function(basket) {
           // get defensive
           var basketRef = basket || {quantity : "0", total : "0"};
           
           //save trolley info
           //0 - set expiry to session
           sas.page.setCookie("quantity",basketRef.quantity,0);
           sas.page.setCookie("total",basketRef.total,0);
       },

       displayPersistentTrolley : function() {
           // future proof
           // Unicode : pound "\u00A3", euro "\u20AC"
           var currency = "\u00A3";
           // get defensive
           if (!document.getElementById || !document.getElementById("persistentitems") || !document.getElementById("persistentsubtotal")) return;
           //display nothing if elements do not exist
           var trolleyQuantity = sas.page.getCookie("quantity") || "0";
           var trolleyTotal = sas.page.getCookie("total") || "0";
           
           //show items and subtotal
           document.getElementById("persistentitems").style.visibility="visible";
           document.getElementById("persistentsubtotal").style.visibility="visible";
           
           //populate header
           document.getElementById("trolleyitems").innerHTML=trolleyQuantity;       
           document.getElementById("trolleyprice").innerHTML=trolleyTotal;                             
       }
}

