//Old tracking
function si_tracking() {
 var now=new Date();
 var url='//track.searchignite.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=5422&transactionamount=0&SICustTransType=23915&jscript=0&timecode='+now.getTime();
 var proto = location.protocol.toLowerCase(); if( proto == 'https:' ) { url = proto + url; } else { url = 'http:' + url; }
 var siimage=new Image();
 siimage.src=url;
}

//Retailer Links
function si_tracking2(partner) {
    var now=new Date();
    var url='//track.searchignite.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=5422&transactionamount=0&SICustTransType=23914&jscript=0&x1='+escape(partner)+'&timecode='+now.getTime();
    var proto = location.protocol.toLowerCase(); if( proto == 'https:' ) { url = proto + url; } else { url = 'http:' + url; }
    var siimage=new Image();
    siimage.src=url;
}

//Coloring Page
function si_tracking3() {
 var now=new Date();
 var url='//track.searchignite.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=5423&transactionamount=0&SICustTransType=30723&jscript=0&timecode='+now.getTime();
 var proto = location.protocol.toLowerCase(); if( proto == 'https:' ) { url = proto + url; } else { url = 'http:' + url; }
 var siimage=new Image();
 siimage.src=url;
}
