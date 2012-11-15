function jsSEOTagCommon(seoTagOn,rte){
	var organic ="false"; 
	if(seoTagOn=="true"){
	    var CAMPAIGN_ID_PARAMETER_NAME="WT.srch";    	
		var REFERRER_URL=top.document.referrer;
		var CURRENT_URL=top.document.URL;	
		var result = trackRequest(REFERRER_URL, CURRENT_URL, CAMPAIGN_ID_PARAMETER_NAME);
	   	if(result.modeOfAccess == "ORGANIC" ) {    	   
      		if(result.source=="Google" || result.source=="Bing" ){      		
        		 var imageURL = "https://ad.doubleclick.net/ad/N2992.6557.THEVANGUARDGROUP/B5111195;sz=1x1;u=" +encodeURI( result.source) + "-" + result.query + "|"+rte+";ord="+encodeURI(result.timestamp)+"?"; 
        	  	 document.write("<IMG SRC=\"" + imageURL + "\" BORDER=0 WIDTH=1 HEIGHT=1 ALT=\"Advertisement\">");          	
        		 organic = true; 
        		        	
       		}   
  
     	}
     
   		
 	} 
          
}