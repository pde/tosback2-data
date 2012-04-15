/* Global variable globalGoogleNoOfAds to store the value - no of narraw ads - 
   which will be accessed by google_afs_request_done() call back function
   This value is needed because HD is following left side first fill
   strategy.So if narrow ads is less , then we need to move some ads from
   the wide ad bottom section to left.
   - Contact rxg8229 for queries - 
*/
 var globalGoogleNoOfAds; 
 function construct_google_afd_request(googlepropsObj){
    if(googlepropsObj!=""){
     var googlepropsObj  = jQuery.parseJSON(googlepropsObj);
	  google_afs_ad = googlepropsObj.hd_afs_ad;
	  globalGoogleNoOfAds = googlepropsObj.hd_afs_ad; 
	  google_afs_adpage=googlepropsObj.hd_afs_adpage;
	  google_afs_client = googlepropsObj.hd_afs_client;
	  channel_name = googlepropsObj.hd_afs_channel;
	  if(channel_name!=null){
	   channel_name= channel_name.replace(/ /g,'_');
       google_afs_channel = channel_name.replace(/&/g,'AND');
      }
	  google_afs_adsafe=googlepropsObj.hd_afs_adsafe;
	  google_afs_adtest = googlepropsObj.hd_afs_adtest;
	  google_afs_hl = googlepropsObj.hd_afs_lang;	
	  hd_localization_info = getTHDLocalStoreInfo();//reading locale information from cookie
	  if(hd_localization_info!=null && hd_localization_info!="")
	    {
	         hd_localization_info = hd_localization_info + "|"
	    }
	  if(googlepropsObj.google_which_page=='PLP')
	  {
		   google_afs_query = hd_localization_info + decodeURIComponent(googlepropsObj.google_afs_qry); 
		   var ctxt = googlepropsObj.google_afs_qry_ctxt;
		   if(ctxt!=null && ctxt!="")
		    {
		     //google_afs_qry_ctxt = hd_localization_info + decodeURIComponent(googlepropsObj.google_afs_qry_ctxt);
			 /*** Changed for Defect 8448 ***/
		      google_afs_query = hd_localization_info + decodeURIComponent(googlepropsObj.google_afs_qry_ctxt)+"|"+ decodeURIComponent(googlepropsObj.google_afs_qry);	     
		    }
		  }else{
		      google_afs_query = hd_localization_info +  decodeURIComponent(googlepropsObj.google_afs_qry);
		     
		  }
	  }  
 
  }
  
 function google_afs_request_done(google_ads) {  
    var adRendering="";
    var narrowAds=new Array();
    var wideAds=new Array(); 
    if(google_ads!=null){
	    for(i = 0; i < google_ads.length; i++){  
           var isNarrow = google_ads[i].type=="text/narrow";
           var line3 = isNarrow ? ' '+ google_ads[i].line3 : '';
		/*** Added For Defect 8448***/
		var urlAD = google_ads[i].visible_url;
		//alert("OLD::::	"+urlAD);

   		var newUrlAD = "";
		if(urlAD){
   		var inTag = false;
   		for(var idx = 0; idx < urlAD.length; idx++) {

        		if(urlAD.charAt(idx) == '<') inTag = true;
        		if(urlAD.charAt(idx) == '>') {
              		if(urlAD.charAt(idx+1)=="<")
              		{
              		//dont do anything
				}
				else
				{
					inTag = false;
					idx++;
				}
        		}

        		if(!inTag) newUrlAD += urlAD.charAt(idx);

   		}
		}

           if(pPage=='NRFPage'){        
           /* adRendering ='<div class="goopod">'
           		+'<div class="maintext">'
           		+google_ads[i].line1
           		+'</div>'
           		+ google_ads[i].line2+line3           		
				+'<div class="goolink">'
				+'<a href="'+google_ads[i].url+'" target="_blank">'+google_ads[i].visible_url+'</a>'
				+'</div>'
		    	+'</div>';	*/
		     adRendering ='<div class="goopod"><div class="maintext">'+google_ads[i].line1+'</div>'+ google_ads[i].line2+line3+'<div class="goolink"><a href="'+google_ads[i].url+'" id="'+newUrlAD+'" target="_blank" onClick="adsenseTrack(this.id);">'+google_ads[i].visible_url+'</a></div></div>';	
		     /*** Changed For Defect 8448 : CSS change has been done. Also id added to the link and onClick event added to track Omniture variables***/
		     
		    	
           }else
           { 
           /*** Changed for Defect 8448 : id added to the link and onClick event added to track Omniture variables ***/
	   adRendering = '<ul><li><a href="'+google_ads[i].url+'" id="'+newUrlAD+'" class="adHeader" target="_blank" onClick="adsenseTrack(this.id);">'+google_ads[i].line1+'</a></li><li><p class="adText">'+google_ads[i].line2+line3+ '</p></li><li><a href="'+google_ads[i].url+'" id="'+newUrlAD+'" class="adURL" target="_blank" onClick="adsenseTrack(this.id);">'+google_ads[i].visible_url+'</a></li></ul>';
           }
           if(isNarrow){
             narrowAds.push(adRendering);
           }else{
             wideAds.push(adRendering); 
           } 
		} 
		if( google_ads.length>0)
		 { 
			/* 
			  Function Call - borrowEachOther - Logic to perform the move from wide section to narrow section  if there is insufficient narrow.
			  vice versa for no results page.
			  The decision to perform Left to Bottom Borrow or Bottom to Left borrow depends upon the existance of the
			  googleAdSenseBottom and googleAdSenseLeft template.
			*/
			  if($('#googleAdSenseLeft').length==0){// which means we need only bottom so borrow from left google ads
			    var indexOfN = globalGoogleNoOfAds.indexOf("n"); 
			    var adsRequested = globalGoogleNoOfAds.substring(1,indexOfN);//Wide Ad Requested
			    borrowEachOther(adsRequested,narrowAds,wideAds);
			  }else{
			   //Borrow from bottom  
			    var noOfAdsReqObj = globalGoogleNoOfAds.split("n"); 
			    var adsRequested = noOfAdsReqObj[1]; 
			    borrowEachOther(adsRequested,wideAds,narrowAds);
			  } 
		}
  }
 } 
 
 function borrowEachOther(adsRequested , donorAds , acceptorAds){ 
   		    var remainingtobefilled = adsRequested - acceptorAds.length;	
			var extractLength = 0;
			if(remainingtobefilled>0){
				if(donorAds.length>=remainingtobefilled){
				    extractLength = remainingtobefilled;
				}else{ //if there is insufficient wide add to pull
				    extractLength = donorAds.length;
				}
				/*** Changed for Defect 8448 : Start ***/
				donorAds=donorAds.reverse();
				for(j = 0; j < extractLength; j++){  
				    acceptorAds.push(donorAds.pop());  	
				}
				donorAds=donorAds.reverse();
				/*** Changed for Defect 8448 : End ***/
			}  

	   deliverResults(acceptorAds,donorAds);		
 }
 
 function deliverResults(acceptorAds,donorAds){
   var labelGoogle = "Ads by Google";
   var labelWhat="What's this?";
    /*** Changed for Defect 8448 ***/
   var adsByGoogleInLeft = "<p class='paddingUp'> </p><hr><p class='paddingDown'> </p><h4>"+labelGoogle+" <a href='javascript:showDialog(\"leftAdv\")' id='leftAdv' class='whatisthis'>"+labelWhat+"</a></h4>";
   var adsByGoogleInBottom = "<h4>"+labelGoogle+" <a href='javascript:showDialog(\"bottomAdv\")' id='bottomAdv'  class='whatisthis'>"+labelWhat+"</a></h4>";
 	var adsByGoogleInBottomNRF = '<div class="line"></div>'
                                +'<br/>'
   								+ '<div class="gootitle">'
   								+labelGoogle
   								+'</div>';
	  if($('#googleAdSenseLeft').length>0){  
	      if(acceptorAds.length>0){ 
			   acceptorAds = acceptorAds.join("");
			   $('#googleAdSenseLeft').show(); //same as display=block
			   $('#googleAdSenseLeft').html(adsByGoogleInLeft + acceptorAds.toString()); 
		   }
		   if(donorAds.length>0){
			    donorAds = donorAds.join("");
			    $('#googleAdSenseBottom').show(); //same as display=block
			    $('#googleAdSenseBottom').html(adsByGoogleInBottom+ donorAds.toString());
		   }
	  }else{
	    // Only have bottom - example no search results page - Here acceptor
	       if(acceptorAds.length>0){
			   acceptorAds = acceptorAds.join("");
			   if(pPage=='NRFPage'){
			   $('#googleAdSenseBottom').show(); //same as display=block
			   $('#googleAdSenseBottom').html(adsByGoogleInBottomNRF + acceptorAds.toString());
			   }
			   else{
			   $('#googleAdSenseBottom').show(); //same as display=block
			   $('#googleAdSenseBottom').html(adsByGoogleInBottom + acceptorAds.toString());
			   } 
		   }
	  }
	  
  	 
 }
 
 /*
   Right now sponsoredText content is settint up here .No requirement yet to set it up in documentum
 */ 
 function showDialog(component) {
   var sponsoredText = "Products & services represented as links under Ads by Google are provided by the Google AdWords&#153; program."+
   					   "Companies pay for these links to have their products and services appear with specific search terms. These "+
   					   "listings are administered, sorted and maintained by Google. Clicking on Ads by Google links will take you away "+
   					   "from Homedepot.com. The website you link to is not endorsed by The Home Depot.";
  $('#googleSponsoredText').html(sponsoredText);
  /*
    Before displaying adjust the position of the pop up based on the what is this link location.
    
  */
     var googleOffset = 0;
     var googleLeftPos = 0;
     var googleTopPos =0; 
     var googleLeftPos=0; 
     if(component.indexOf("leftAdv")==0){
        googleOffset = $('#leftAdv').offset(); 
        googleTopPos = googleOffset.top;
        googleLeftPos =googleOffset.left;
       $('#google-whatisthis').css('left',googleLeftPos+120);
       $('#google-whatisthis').css('top',googleTopPos);
     }else{
        googleOffset  = $('#bottomAdv').offset();
        googleLeftPos = googleOffset.left;
        googleTopPos = googleOffset.top;
        $('#google-whatisthis').css('left',googleLeftPos-90);
        $('#google-whatisthis').css('top',googleTopPos+40);
     } 
     $('#google-whatisthis').show();
 
 }