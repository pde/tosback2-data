function log(m){if(typeof console!="undefined"){console.log(m);}}
if (typeof TSC=="undefined") {
  var TSC = {
    reporting: {},
    util: {},
    ads: {},
    logger: {}
  };
}  

if(typeof TSC != "undefined") {
  if(typeof TSC.reporting == "undefined") {
    TSC.reporting={};
  }
}

TSC.util = {
  getPuc: function() {
            var path = document.location.pathname;
            var puc = "";
            var index = path.indexOf("/_") + 1;
            if(index > -1) {
              puc = path.substring(index, path.indexOf("/", index));
            }
            var qRef = TSC.util.getQueryString("ref");
            if (TSC.util.isDefined(qRef)){
              puc="_" + qRef;
            }      
            var qPuc = TSC.util.getQueryString("puc");
            if (TSC.util.isDefined(qPuc)){
              puc = qPuc;
            }              
            return puc;    
  },    
  dateDisplay: function(dateObj) {
                 var d_names   = new Array("Sun", "Mon", "Tue","Wed", "Thu", "Fri","Sat");
                 var m_names   = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec");
                 var retMonth  = dateObj.getMonth();
                 var retYear   = dateObj.getFullYear();
                 var retDay    = dateObj.getDay();
                 var retDate   = dateObj.getDate();
                 var retString = d_names[retDay] + " " + m_names[retMonth] + " " + retDate + " " + retYear;
    
                 return retString;
  },
  isValidPuc: function(checkPuc) {
                if (TSC.util.isDefined(checkPuc)) {
                  if (checkPuc.indexOf("txt") !=- 1 || checkPuc.indexOf("html")!=-1 || 
                      checkPuc.indexOf("text")!=-1 || checkPuc.indexOf("tscrmb")!=-1) {
                    return false;
                  } else { 
                      return true;
                  }
                } else {
                    return true;
                }   
  },
  getCookie: function(c_name) {
               if (document.cookie.length > 0) {
                 c_start = document.cookie.indexOf(c_name + "=");

                 if (c_start != -1) { 
                   c_start = c_start + c_name.length+1 
                   c_end = document.cookie.indexOf(";",c_start)

                   if (c_end == -1) {
                     c_end = document.cookie.length
                   }

                   return unescape(document.cookie.substring(c_start,c_end))
                 } 
               }
               return "";
  },  
  getDatestamp: function(){
                  var currentTime=new Date();
                  var month = currentTime.getMonth() + 1;
                  var day = currentTime.getDate();
                  var year = currentTime.getFullYear();
                  var dateStamp=month + "" + day + "" + year;
                  return dateStamp;
  },
  getQueryString: function (variable) {
                    var query = window.location.search.substring(1);
                    var vars = query.split("&");
                    for (var i=0;i<vars.length;i++) {
                      var pair = vars[i].split("=");
                      if (pair[0].toLowerCase() == variable.toLowerCase()) {
                        return pair[1];
                      }
                    } 
                    return "";
  },
  isDefined: function(v) {
               if(typeof v === 'undefined' || v === null || v === '' || v === 'undefined') {
                 return false;
               } else {
                   return true;
               }
  },     
  cleanString: function(thestring) {
               thestring = thestring.replace(/"/g,'\\"');
			   thestring = thestring.replace(new RegExp(String.fromCharCode(8216),"g"),"'");
  			   thestring = thestring.replace(new RegExp(String.fromCharCode(8217),"g"),"'");
  			   thestring = thestring.replace(new RegExp(String.fromCharCode(8220),"g"),'\\"');
  			   thestring = thestring.replace(new RegExp(String.fromCharCode(8221),"g"),'\\"');			   
			   return thestring;
			   
  }
};
  
TSC.reporting.propMap={};

TSC.reporting.setAccount=function(account){};

TSC.reporting.sendLinkEvent=function(lnkName) {};

TSC.reporting.config=function(o) {};

TSC.reporting.hasRepObj=function(args) {};

TSC.reporting.makeCall=function(){};