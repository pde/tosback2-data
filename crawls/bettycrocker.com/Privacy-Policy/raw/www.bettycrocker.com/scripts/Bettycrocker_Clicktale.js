function CTIsPlayback() {
    try { return parent && parent.WebPlayer; }
    catch (e) { return false; }
}

//top code playback
jQuery(document).ready(function () {
    jQuery("#menu > li").hover(function () {
        var id = jQuery(this).attr("id");
        ClickTaleExec("jQuery(\"#" + id + "\").addClass(\"hovering\")")
    },
function () {
    var id = jQuery(this).attr("id");
    ClickTaleExec("jQuery(\"#" + id + "\").removeClass(\"hovering\")")
});
}); 


// top menu for aggregated reports

if (CTIsPlayback() && !parent.P2SIDs) {
    jQuery(".subMenu").css("display", "block");
    jQuery(".subMenu").css("visibility", "hidden")
}


//register page - aggregated reports
if (CTIsPlayback() && !parent.P2SIDs) {
    jQuery(".registration_panel").show();
}

//register page form - playback and form submission
var curStep = 0;
var stepsCount = 3;

jQuery(".button_line").click(function(){
curStep++;
ClickTaleExec("jQuery(\"#" + jQuery(this).attr("id") + "\").trigger(\"click\")");
if(curStep == stepsCount){
    if(typeof ClickTaleTag=="function"){
        ClickTaleTag("form_submit_success");
    }
}else{
    if(typeof ClickTaleTag=="function"){
        ClickTaleTag("form_submit_fail");
    }
}
});


//coupon page - aggregated reports

if (CTIsPlayback() && !parent.P2SIDs) {
    jQuery(document.body).ready(function () {
        setTimeout(function () {
            var CTmsg = { "d": { "__type": "GeneralMills.BettyCrocker.Services.CouponHandler+CouponListSummary", "CouponList": [{ "Number": 16152123, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1308236482733)\/", "Summary": "SAVE 60¢", "MidLevel": "when you buy ONE 28 OZ. OR LARGER Bisquick® Baking Mix OR Complete Pancake & Waffle Mix", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/123/16152123.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16156029, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307898137800)\/", "Summary": "Save 60¢ on TWO", "MidLevel": "when you buy TWO any flavor Betty Crocker® Suddenly Salad® Mixes", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/029/16156029.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16155365, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307828197793)\/", "Summary": "SAVE 60¢", "MidLevel": "when you buy ONE BOX any flavor Lucky Charms® Treats, Golden Grahams® Treats, Chex Mix® Treats, OR Milk ...", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/365/16155365.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16150070, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307146052260)\/", "Summary": "SAVE $1.10 ON TWO", "MidLevel": "when you buy any TWO BOXES General Mills cereals: Basic 4® • Cheerios® (any) • Chex® (any) • Cinnamon ...", "DollarSavingsAmount": 1.10, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/070/16150070.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16150069, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": null, "Summary": "SAVE 85¢", "MidLevel": "when you buy any ONE BOX Fiber One® cereal listed: Fiber One® Original • Fiber One® Honey Clusters® • ...", "DollarSavingsAmount": 0.85, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/069/16150069.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16150063, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307299622603)\/", "Summary": "SAVE 60¢", "MidLevel": "when you buy ONE BOX Original Cheerios® cereal (the one in the yellow box)", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/063/16150063.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16150065, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307114068387)\/", "Summary": "SAVE 60¢", "MidLevel": "when you buy ONE BOX Reese’s® Puffs® cereal", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/065/16150065.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16157067, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": null, "Summary": "Save 60¢ on EIGHT", "MidLevel": "when you buy EIGHT CUPS any variety Yoplait® Yogurt (Includes Original, Light, Thick & Creamy, OR Whips!®)", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/067/16157067.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16158090, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307105851120)\/", "Summary": "Save 85¢ on TWO", "MidLevel": "when you buy TWO any flavor Yoplait® products listed: • Yoplait® Go-GURT® Yogurt • Yoplait® Trix® Multipack ...", "DollarSavingsAmount": 0.85, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/090/16158090.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16157091, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1308761145677)\/", "Summary": "Save 60¢", "MidLevel": "when you buy any flavor 32 OZ. Yoplait® Yogurt", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/091/16157091.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16156052, "StartDate": "\/Date(1307422860000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1308323638163)\/", "Summary": "Save $1.10", "MidLevel": "when you buy ONE any variety Old El Paso®  Tortilla Stuffers™ Microwavable Meal", "DollarSavingsAmount": 1.10, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/052/16156052.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 15546117, "StartDate": "\/Date(1280206800000)\/", "ExpirationDate": "\/Date(1310705940000)\/", "EndDate": null, "Summary": "SAVE $1.00", "MidLevel": "GOOD ON ANY ALKA-SELTZER® ANTACID OR ALKA-SELTZER PLUS® COLD PRODUCT", "DollarSavingsAmount": 1.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/117/15546117.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 15546126, "StartDate": "\/Date(1280206800000)\/", "ExpirationDate": "\/Date(1310705940000)\/", "EndDate": null, "Summary": "SAVE $3.00", "MidLevel": "GOOD ON THE COMBINED PURCHASE OF ANY ALKA-SELTZER® ANTACID AND ALKA-SELTZER PLUS® COLD PRODUCT", "DollarSavingsAmount": 3.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/126/15546126.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16131196, "StartDate": "\/Date(1303102800000)\/", "ExpirationDate": "\/Date(1325397540000)\/", "EndDate": null, "Summary": "Save $2.00", "MidLevel": "on renu® fresh™ or renu® sensitive™ multi-purpose solution (8 oz or larger)", "DollarSavingsAmount": 2.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/196/16131196.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16194368, "StartDate": "\/Date(1306904400000)\/", "ExpirationDate": "\/Date(1314766740000)\/", "EndDate": null, "Summary": "$5.00 OFF", "MidLevel": "on Any ROGAINE® product", "DollarSavingsAmount": 5.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/368/16194368.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16210379, "StartDate": "\/Date(1308114000000)\/", "ExpirationDate": "\/Date(1314766740000)\/", "EndDate": null, "Summary": "$3.00 OFF", "MidLevel": "any Sally Hansen Wax Product", "DollarSavingsAmount": 3.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/379/16210379.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16212007, "StartDate": "\/Date(1308114000000)\/", "ExpirationDate": "\/Date(1317445140000)\/", "EndDate": null, "Summary": "$2.00 OFF", "MidLevel": "Sally Hansen® Nail Treatment Products, when you buy ANY Sally Hansen® Nail Color", "DollarSavingsAmount": 2.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/007/16212007.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16213187, "StartDate": "\/Date(1308459600000)\/", "ExpirationDate": "\/Date(1312606740000)\/", "EndDate": null, "Summary": "SAVE $1.00", "MidLevel": "on TWO (2) packages of any OSCAR MAYER Hot Dogs", "DollarSavingsAmount": 1.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/187/16213187.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16214057, "StartDate": "\/Date(1308546000000)\/", "ExpirationDate": "\/Date(1313902740000)\/", "EndDate": null, "Summary": "SAVE $1.00", "MidLevel": "on any JOHNSON’S® Baby Powder 15 oz. or larger (excludes sizes 1 oz. – 9 oz.)", "DollarSavingsAmount": 1.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/057/16214057.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16214100, "StartDate": "\/Date(1308286800000)\/", "ExpirationDate": "\/Date(1318741140000)\/", "EndDate": null, "Summary": "SAVE 75¢", "MidLevel": "on any one (1) package of Truvia® natural sweetener", "DollarSavingsAmount": 0.75, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/100/16214100.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false}], "SavingsSummary": "20.20,0,6.65"} }
            getCouponsSuccess(CTmsg);
        }, 100);
    });
}