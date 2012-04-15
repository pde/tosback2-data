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
	var strBrwsr= navigator.userAgent.toLowerCase();  
	if(strBrwsr.indexOf("msie") > -1 && strBrwsr.indexOf("mac") < 0){    
		if(parseInt(strBrwsr.charAt(strBrwsr.indexOf("msie")+5)) < 6){      
			return false;    
		}    
		if(strBrwsr.indexOf("win98") > -1 || strBrwsr.indexOf("win 9x 4.90") > -1 || strBrwsr.indexOf("winnt4.0") > -1 || strBrwsr.indexOf("windows nt 5.0") > -1)    
		{      
			return false;    
		}    
	return true;  
	}else{    
		return false;  
	}
}


function  viewFlash(sURL, sName, sFeatures){ 

 
 var FLASHCAB = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"; 
 var FLASHCID = "CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000"; 
 var FLASHVER = "8,0,0,0"; 

 var sFeature; 
 var sWidth  = "100%"; 
 var sHeight  = "100%"; 
 var pmBoolean = "false"; 
 var sTempArray; 
 var sParamTag = ""; 

 sFeature = sFeatures.split(/\s*,\s*/); 
 for (var i=0; i< sFeature.length ; i++) 
 { 
  sTempArray = sFeature[i].split(/\s*=\s*/); 
  if (sTempArray[0].toLowerCase() == "width"){ 

  sWidth = sTempArray[1]; 
  }else if (sTempArray[0].toLowerCase() == "height"){ 

  sHeight = sTempArray[1]; 
  }else{ 

  if (sTempArray[1].toLowerCase() == "yes" || sTempArray[1] == "1" || sTempArray[1].toLowerCase() == "true"){ 
    pmBoolean = "true"; 
  }else if (sTempArray[1].toLowerCase() == "no" || sTempArray[1] == "0" || sTempArray[1].toLowerCase() == "false"){ 
    pmBoolean = "false"; 
  }else{ 
    pmBoolean = sTempArray[1]; 
  } 
  sParamTag = "<PARAM NAME='"+sTempArray[0]+"'VALUE='" + pmBoolean + "'>\n"+sParamTag; 
  } 
 } 

 document.write("<OBJECT ID='"+sName+"' NAME='"+sName+"' CLASSID='"+FLASHCID+"' CODEBASE='"+FLASHCAB+"#version="+FLASHVER+"' WIDTH='"+sWidth+"' HEIGHT='"+sHeight+"'>"); 
 document.write("<PARAM NAME='movie' VALUE='" + sURL + "'>"); 
 document.write(sParamTag); 
 document.write("<EMBED  wmode='transparent' SRC='"+sURL+"' MENU='false' WIDTH='"+sWidth+"' HEIGHT='"+sHeight+"' ID='"+sName+"' NAME='"+sName+"' TYPE='application/x-shockwave-flash' PLUGINSPAGE='http://www.macromedia.com/go/getflashplayer' />") 
 document.write("</OBJECT>"); 
} 
