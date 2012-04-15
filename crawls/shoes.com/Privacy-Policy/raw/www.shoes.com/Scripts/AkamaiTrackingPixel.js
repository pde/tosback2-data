function WriteAkamaiTrackingImage() {
	var sURL = document.URL;
	var sRef = document.referrer;
	var sTrackURL = '/Akamai/Track.ashx';

	// look for querystring parameters
	var nQPos = sURL.indexOf('?');

	// look for ELES data
    //var elesValue = $('.elesValue');
    //if(elesValue.length > 0) {
    //// set ELES cookie
    //document.cookie = 'eles=' + elesValue[0].value + '; domain=' + siteDomain + '; path=/';
    //}

	if (nQPos > 0){
		// if there are querystring params, send them up
		sTrackURL += sURL.substr(nQPos);
        //sTrackURL += '&sciurl=' + escape(sURL.substr(0, nQPos))
	}
    //else {
    //// if there are none, then still send the url
    //sTrackURL += '?sciurl=' + escape(sURL)
    //}
	// send up the referrer
	//sTrackURL += '&sciref=' + escape(sRef)


    //Try to call the tracking pixel only when one of the following three values are present.
	if (nQPos > 0 && (sURL.search(/partnerid|promocode|dklsjfsa/i) >= 0 ))
	    document.write( '<img src="' + sTrackURL + '" style="visibility:hidden;border:none;height:1px;width:1px;">' );
		
    //if(elesValue.length > 0) {
    //var yesterdaysDate = new Date();
    //yesterdaysDate.setTime(yesterdaysDate.getTime()+(-1*24*60*60*1000));	// sets to yesterday
    //			
    //// clear ELES cookie by expiring it
    //document.cookie = 'eles=; domain=' + siteDomain + '; path=/; expires=' + yesterdaysDate.toGMTString();
    //}
}
WriteAkamaiTrackingImage();
