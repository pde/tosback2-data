// UNPACKED VERSION NA 3.0.2.08.11
// MAP PRICING UPDATE - fix for MAP display
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function rrGetCMTag(thisLink){
    var rrPT = R3_COMMON.placementTypes;
    var t="";
    if(typeof(rrPT)!=="undefined"){
        if (rrPT.indexOf('item')>0){
            if(thisLink.indexOf('pa=content1')>0){t="2000000351";}
            else if(thisLink.indexOf('pa=content2')>0){t="2000000352";}
            else if(thisLink.indexOf('pa=content3')>0){t="2000000353";}
            else if(thisLink.indexOf('pa=content4')>0){t="2000000354";}
        }else if (rrPT.indexOf('category')>0){
            if(thisLink.indexOf('pa=content1')>0){t="2000000361";}
            else if(thisLink.indexOf('pa=content2')>0){t="2000000362";}
            else if(thisLink.indexOf('pa=content3')>0){t="2000000363";}
        }else if (rrPT.indexOf('search')>0){
            if(thisLink.indexOf('pa=content1')>0){t="2000000371";}
            else if(thisLink.indexOf('pa=content2')>0){t="2000000373";}
        }else if (rrPT.indexOf('add')>0){
            if(thisLink.indexOf('pa=content1')>0){t="2000000381";}
            else if(thisLink.indexOf('pa=content2')>0){t="2000000382";}
        }else if (rrPT.indexOf('cart')>0){
            if(thisLink.indexOf('pa=content1')>0){t="2000000391";}
            else if(thisLink.indexOf('pa=content2')>0){t="2000000392";}
        }else if (rrPT.indexOf('purchase')===1){
            if(thisLink.indexOf('pa=content1')>0){t="2000000401";}
            else if(thisLink.indexOf('pa=content2')>0){t="2000000402";}
        }else if (rrPT.indexOf('error')>0){
            if(thisLink.indexOf('pa=content1')>0){t="2000000411";}
            else if(thisLink.indexOf('pa=content2')>0){t="2000000422";}
        }
    }
    return t;
}

var check_a;

function populatePrices(a) {
    check_a = a;
    var b;    
    for(b=0,d=a.prices.length;b<d;b++){
        //// not used: rrItemInfo[thisItem].simple, setQtyChange()
        //// layout changes: rrRating, rrReview, rrRatingBox, rrPriceElement, item_atc_rrSKU, rrAddCartBtn
        
        pid = a.prices[b].pid; // get the pid from the data prices object
        thisItem = 'rrItemInfoId-' + a.prices[b].pid; // get the item id from the data object placeholder from the item iteration
        
        if (typeof rrItemInfo[thisItem].layout_type != 'undefined' && rrItemInfo[thisItem].layout_type=="new"){
            rrCT = rrItemInfo[thisItem].ct;     // customize tag
            rrUOM = rrItemInfo[thisItem].uom;   // unit of measure
            rrLink = rrItemInfo[thisItem].link; // link
            rrItemInfo[thisItem].pid = a.prices[b].pid;
            rrItemInfo[thisItem].pidForDisplay = a.prices[b].pidForDisplay;
            
            var item_suffix;
            for (i in rrItemInfo[thisItem].placements){
                rrPlacement = rrItemInfo[thisItem].placements[i];
                item_suffix = "" + a.prices[b].pid + "_" + rrPlacement;
                rrPriceBlock = [];
                
                if (a.prices[b].valid === "true" && document.getElementById("rrRating" + item_suffix) != null) {
                    var rating = a.prices[b].rating;
                    if (rating > 0){
                        document.getElementById("rrRating" + item_suffix).className += " bv" + (rating*10);
                        document.getElementById("rrReview" + item_suffix).innerHTML = "(" + a.prices[b].reviewCount + ")";
                    } else {
                        document.getElementById("rrRatingBox" + item_suffix).innerHTML = '<a href="' + rrLink +'%23reviewTab" class="underline">Write the first review</a>';
                    }
                    $("#rrRatingBox" + item_suffix).show();
                    
                    if (a.prices[b].mapPrice !== '$0.00') { 
                        rrPriceBlock.push('<span class="main_price" style="float:left; clear:both;"><span style="text-decoration:line-through">' + a.prices[b].mapPrice + '</span>' + rrUOM + '</span></span>');
                    } else if (a.prices[b].price !== undefined) { 
                        rrPriceBlock.push('<span class="main_price" style="float:left; clear:both;">' + a.prices[b].price + rrUOM + '</span></span>');
                    }
                    document.getElementById("rrPriceElement" + item_suffix).innerHTML = rrPriceBlock.join(''); // join the elements of the array
                    if (a.prices[b].mapPrice !== '$0.00'){
                        var ele = document.getElementById("rrMapMessage" + item_suffix); 
                        ele.className += ' map_pricing_block';
                        ele.innerHTML = '<li><a href="'+rrLink+'" class="map_title" style="text-align: left;">See Sale Price in Cart</a></li>';
                        $("#rrMapMessage" + item_suffix).show();
                    }
                } 
            }
        } else {
            rrPriceBlock = []; // set a price object
            rrCT = rrItemInfo[thisItem].ct; // customize tag
            rrUOM = rrItemInfo[thisItem].uom; // unit of measure
            rrLink = rrItemInfo[thisItem].link; // link
            if (typeof rrItemInfo[thisItem].simple != 'undefined' && rrItemInfo[thisItem].simple){
                rrSeperator = '';
                rrPriceStyle = ' style="float:left; clear:both;"';
                rrMapStyle = ' style="text-align: left;"';
            } else {
                rrSeperator = '<br/>';
                rrPriceStyle = '';
                rrMapStyle = '';
            }
            rrItemInfo[thisItem].pid = a.prices[b].pid; // add pid to object
            rrItemInfo[thisItem].pidForDisplay = a.prices[b].pidForDisplay; // add pid for display to object

            if (a.prices[b].valid === "true") { // if JSON response object item is valid
                //do rating stuff
                var rating = a.prices[b].rating;
                var review_txt = " Reviews ";
                if (rating > 0){
                    if (a.prices[b].reviewCount == 1) review_txt = " Review ";
                    if (rrSeperator == '') review_txt = "";
                    $("#rrRating" + a.prices[b].pid).addClass("bv" + rating*10);
                    $("#rrReview" + a.prices[b].pid).html("(" + a.prices[b].reviewCount + review_txt + ")");
                    $("#rrRatingBox" + a.prices[b].pid).show();
                }else{
                    $("#rrRatingBox" + a.prices[b].pid).html('<a href="' + rrLink +'%23reviewTab" class="underline">Write the first review</a>');
                    $("#rrRatingBox" + a.prices[b].pid).show();
                }								
                var bulkStr = "";
                if (a.prices[b].hasBulkPricingAvailable === "true") { // if has bulk pricing messaging
                    bulkStr = rrStr.asLowAs;
                } else {
                    bulkStr = rrStr.yourPrice;
                }
                if (a.prices[b].pid !== a.prices[b].pidForDisplay) { // if pid/pidfor display are different, update the sku
                    $(".rrSKU" + a.prices[b].pid).html(rrStr.item + a.prices[b].pidForDisplay);
                }else{
                    $(".rrSKU" + a.prices[b].pid).html(rrStr.item + a.prices[b].pid);
                }
                if (a.prices[b].mapPrice !== '$0.00') { 
                    if (rrSeperator != '') rrPriceBlock.push('<span class="merchPrice"><label class="price_title">' + bulkStr + '</label>');
                    rrPriceBlock.push('<span class="main_price"'+rrPriceStyle+'><span style="text-decoration:line-through">' + a.prices[b].mapPrice + '</span>' + rrSeperator + rrUOM + '</span></span>');
                }
                else if (a.prices[b].price !== undefined) { // just show price
                    if (rrSeperator != '') rrPriceBlock.push('<span class="merchPrice"><label class="price_title">' + bulkStr + '</label>');
                    rrPriceBlock.push('<span class="main_price"'+rrPriceStyle+'>' + a.prices[b].price + rrSeperator + rrUOM + '</span></span>');
                }
                rrPriceBlock.push('<input type="hidden" value="'+rrGetCMTag(rrLink)+'" name="trackingCategory">'); // add CM input tag to form for tracking
                $(".rrPriceElement" + a.prices[b].pid).html(rrPriceBlock.join('')); // join the elements of the array
                $(".item_atc_rrSKU" + a.prices[b].pid).html(a.prices[b].pidForDisplay); // update the pid for display
                if (a.prices[b].mapPrice !== '$0.00'){
                    $("ul.rrAddCartBtn" + a.prices[b].pid).addClass('map_pricing_block').html('<li><a href="'+rrLink+'" class="map_title"'+rrMapStyle+'>See Sale Price in Cart</a></li>').show();
    //				$("ul.rrAddCartBtn" + a.prices[b].pid).html('<a href="javascript:void(0);" class="map_title" onclick="od_uielements.loadPromoView('+a.prices[b].pid+')">See Sale Price in Cart</a>').show(); // show the MAP price
                } else if (rrCT !== "") { 
                    $("div.moduleStructContent .rrCustomBtn" + a.prices[b].pid).show(); // if there's a customize button show it
                } else if (rrSeperator != ''){ // show the regular pricing data
                    $(".rrAddCartBtnDisplay" + a.prices[b].pid).val(rrStr.atc); // get the localized string for add to cart
                    $("ul.rrAddCartBtn" + a.prices[b].pid).show(); // show the add to cart button
                }
            } else {
                $(".item_atc_rrSKU" + a.prices[b].pid).html(a.prices[b].pidForDisplay); // update the pid for display
                $(".rrPriceElement" + a.prices[b].pid).html('<div class="skuAvailability">' + rrStr.skuAvailability + '</div>'); // show localized availability message
            }
        }
    }
    if (typeof(odCarousel)==="function"){odCarousel();} // if carousel is on page, call it after pricing fires off
}
          
function rrSetLink(pid) {
    if (typeof(rrItemInfo['rrItemInfoId-' + pid].pid) !== "undefined") {
        pid = rrItemInfo['rrItemInfoId-' + pid].pid;
        pidForDisplay = rrItemInfo['rrItemInfoId-' + pid].pidForDisplay;
        ct = rrItemInfo['rrItemInfoId-' + pid].ct;
        link = rrItemInfo['rrItemInfoId-' + pid].link;
        link = link.replace('id%3D' + pid, 'id%3D' + pidForDisplay);
        if (ct !== "") {
            link += "%26configurableItemType%3D" + ct;
        }
        link += "%26cm_cat%3D" + rrGetCMTag(link);
        return link;
    }
}