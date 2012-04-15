/*theObjects = document.getElementsByTagName("object");
for (var i = 0; i < theObjects.length; i++) {
theObjects[i].outerHTML = theObjects[i].outerHTML;
}*/

var bo_ns_id = 0;

function startIeFix(){
  if(isIE()){
      document.write('<div id="bo_ns_id_' + bo_ns_id + '"><!-- ');
  }
}

function endIeFix(){
  if(isIE()){
      document.write('</div>');
      var theObject = document.getElementById("bo_ns_id_" + bo_ns_id++);
      var theCode = theObject.innerHTML;
      
      theCode = theCode.substring(4 ,9+theCode.indexOf("</object>"))
      document.write(theCode);
    }
}

function isIE(){
  // only for Win IE 6+
  // But not in Windows 98, Me, NT 4.0, 2000
  var strBrwsr = navigator.userAgent.toLowerCase();
  if(strBrwsr.indexOf("msie") > -1 && strBrwsr.indexOf("mac") < 0){
      if(parseInt(strBrwsr.charAt(strBrwsr.indexOf("msie")+5)) < 6){
            return false;
        }
	  
	  if(strBrwsr.indexOf("win98") > -1 || strBrwsr.indexOf("win 9x 4.90") > -1 || strBrwsr.indexOf("winnt4.0") > -1 || strBrwsr.indexOf("windows nt 5.0") > -1) {
			return false;
	    }
	    
	  return true;
  }
  else
  {    
	  return false;
  }
}