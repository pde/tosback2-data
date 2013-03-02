// UNPACKED VERSION NA 4.0.2.15.13
// Optimization and rewrite for updated layouts

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

function populatePrices(a) {
    var b;
    for(b=0,d=a.prices.length;b<d;b++){
        pid = a.prices[b].pid; // pid from the data prices object; used for referencing DOM elements, should match RR externalID passed in
        thisItem = 'rrItemInfoId-' + pid;
        if (typeof rrItemInfo[thisItem] != "undefined"){
            rrCT = rrItemInfo[thisItem].ct;     // customize tag
            rrUOM = rrItemInfo[thisItem].uom;   // unit of measure
            rrLink = rrItemInfo[thisItem].link;
            rrItemInfo[thisItem].pid = a.prices[b].pid;
            rrItemInfo[thisItem].pidForDisplay = a.prices[b].pidForDisplay;
            
            var item_suffix;
            for (i in rrItemInfo[thisItem].placements){
                if (a.prices[b].valid !== "true") continue;
                rrPlacement = rrItemInfo[thisItem].placements[i];
                item_suffix = a.prices[b].pid + "_" + rrPlacement;
                if (document.getElementById("rrRating" + item_suffix) != null) {
                    var rating = a.prices[b].rating;
                    if (rating > 0){
                        document.getElementById("rrRating" + item_suffix).className += " bv" + (rating*10);
                        document.getElementById("rrReview" + item_suffix).innerHTML = "(" + a.prices[b].reviewCount + ")";
                    } else {
                        document.getElementById("rrRatingBox" + item_suffix).innerHTML = '<a href="' + rrLink +'%23reviewTab" class="underline">Write the first review</a>';
                    }
                    $("#rrRatingBox" + item_suffix).show();
                    
                    if (a.prices[b].mapPrice !== '$0.00') { 
                        var ele = document.getElementById("rrMapMessage" + item_suffix);
                        ele.className += ' map_pricing_block';
                        ele.innerHTML = '<li><a href="'+rrLink+'" class="map_title" style="text-align: left;">See Sale Price in Cart</a></li>';
                        $("#rrMapMessage" + item_suffix).show();
                        document.getElementById("rrPriceElement" + item_suffix).innerHTML = '<span class="main_price" style="float:left; clear:both;"><span style="text-decoration:line-through">' + a.prices[b].mapPrice + '</span>' + rrUOM + '</span></span>';
                    } else if (a.prices[b].price !== undefined) { 
                        document.getElementById("rrPriceElement" + item_suffix).innerHTML = '<span class="main_price" style="float:left; clear:both;">' + a.prices[b].price + rrUOM + '</span></span>';
                    }
                } 
                if (document.getElementById("rrInput" + item_suffix) != null){
                    var bulkStr = (a.prices[b].hasBulkPricingAvailable === "true") ? rrStr.asLowAs :  rrStr.yourPrice;
                    var rrPriceBlock = ['<span class="merchPrice"><label class="price_title">' + bulkStr + '</label>'];
                    if (a.prices[b].mapPrice !== '$0.00') { 
                        rrPriceBlock.push('<span class="main_price"><span style="text-decoration:line-through">' + a.prices[b].mapPrice + '</span> <br/> ' + rrUOM + '</span></span>');
                    } else if (a.prices[b].price !== undefined) {                        
                        rrPriceBlock.push('<span class="main_price">' + a.prices[b].price + ' <br/> ' + rrUOM + '</span></span>');
                    }
                    document.getElementById("rrPriceElement" + item_suffix).innerHTML = rrPriceBlock.join('');
                    document.getElementById("item_atc_rrSKU" + item_suffix).value = a.prices[b].pidForDisplay;
                    $("ul.rrAddCartBtn" + a.prices[b].pid).show(); // show the add to cart button
                }
            }
        }
    }
    if (typeof(odCarousel)==="function"){odCarousel();} // if carousel is on page, call it after pricing fires off
}
          
function rrSetLink(pid) {
    var pid, pidForDisplay; 
    var link = rrItemInfo['rrItemInfoId-' + pid].link;
    var ct = rrItemInfo['rrItemInfoId-' + pid].ct;
    if (typeof(rrItemInfo['rrItemInfoId-' + pid].pid) !== "undefined") {
        pid = rrItemInfo['rrItemInfoId-' + pid].pid;
        pidForDisplay = rrItemInfo['rrItemInfoId-' + pid].pidForDisplay;
        link = link.replace('id%3D' + pid, 'id%3D' + pidForDisplay);
    }
    if (ct !== "") {
        link += "%26configurableItemType%3D" + ct;
    }
    link += "%26cm_cat%3D" + rrGetCMTag(link);
    return link;
}