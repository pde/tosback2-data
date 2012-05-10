//product click (category, family, department page)
function ProductClick(server, product, evar4) {
    //alert(server);
    var s = s_gi(String(server)); //Your organization's report suite ID
    s.linkTrackVars = 'events,products';
    s.linkTrackEvents = 'event15';
    s.events = 'event15';
    s.products = ';' + product + ';;;;evar4=' + evar4;
    s.tl(this, 'o', evar4);
    return true;
}


function ProductPageClicks(server, product, evar25) {
    var s = s_gi(String(server)); //Your organization's report suite ID
    s.linkTrackVars = 'events,products';
    s.linkTrackEvents = 'event2';
    s.events = 'event2';
    s.products = ';' + product + ';;;;evar25=' + evar25;
    s.tl(this, 'o', evar25);
    return true;
}


//<a href="omniture.com/feedback.html" onClick="
//    var s=s_gi('spgftspencerdev'); //Your organization's report suite ID
//    s.linkTrackVars='events,products,eVar15,eVar24';
//    s.linkTrackEvents='scOpen,scAdd,event17';
//    s.events='scOpen,scAdd,event17';
//    s.products=";02321776;;;event17=19.99;evar15=<<SKU#>>|evar24=Product Detail Page"
//    s.tl(this,'o','Add to Cart');
//">ADD TO CART</a>
