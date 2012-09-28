/* Google AdSense request and callback functions */

 function construct_google_csa_request(pPage, googlepropsObj, adblockLeft, adblockBottom ){	 
	if(googlepropsObj != ""){
		 // NoResultsPage has only one Ad Block at the bottom
		 if(pPage == "NoResultsPage" &&  adblockBottom != ""){
			 new google.ads.search.Ads(googlepropsObj, adblockBottom );
		 } else {
			 if(adblockLeft != "" && adblockBottom != ""){
				 new google.ads.search.Ads(googlepropsObj, adblockLeft, adblockBottom );
			 }
		 }		
	 }
}

 /*
  * Google Adsense Callback function
  */
function google_csa_request_done(google_ads_container, adsLoaded) {  
	//Check if there are any Ad results
	 if(adsLoaded){
		 var labelGoogle = "Ads by Google";
		 var labelWhat="What's this?";
		 var adsByGoogleInLeft = "<h4>"+labelGoogle+" <a href='javascript:showDialog(\"leftAdv\")' id='leftAdv' class='whatisthis'>"+labelWhat+"</a></h4>";
		 var adsByGoogleInBottom = "<h4>"+labelGoogle+" <a href='javascript:showDialog(\"bottomAdv\")' id='bottomAdv'  class='whatisthis'>"+labelWhat+"</a></h4>";
		 
		 if(google_ads_container=="googleAdSenseLeft") {
			 var leftDiv = $("#googleAdSenseLeft");
			 // var leftContent = document.createTextNode(adsByGoogleInLeft);
			 leftDiv.prepend(adsByGoogleInLeft);
			 $('#googleAdSenseLeft').show();	 
		 }
		 if(google_ads_container=="googleAdSenseBottom") {
			 var bottomDiv = $("#googleAdSenseBottom");
			 // var bottomContent = document.createTextNode(adsByGoogleInBottom);
			 bottomDiv.prepend(adsByGoogleInBottom);
			 $('#googleAdSenseBottom').show();			 
		 }
	 } 
}
  
/*
 *   Sponsored text dialog when What's this? link is clicked
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