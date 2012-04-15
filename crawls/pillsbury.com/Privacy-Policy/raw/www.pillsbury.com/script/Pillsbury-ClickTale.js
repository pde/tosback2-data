function CTIsPlayback() {
    try { return parent && parent.WebPlayer; }
    catch (e) { return false; }
}

//top menu during playback
jQuery(".bottomHeaderNav > li").hover(
function () {
    var a = jQuery(this).find("UL").attr("class");
    ClickTaleExec("jQuery(\"." + a + "\").css(\"display\",\"block\")")
},
function () {
    var b = jQuery(this).find("UL").attr("class");
    ClickTaleExec("jQuery(\"." + b + "\").css(\"display\",\"none\")")
});


// top menu for aggregated reports

if (CTIsPlayback() && !parent.P2SIDs) {
    jQuery("ul.bottomHeaderNav ul").css("display", "block");
    jQuery("ul.bottomHeaderNav ul").css("visibility", "hidden")
}


//recipe pages (recipe, tips and reviews)

jQuery(".rdTabContainer > div").click(function () {
    ClickTaleExec("jQuery(\"#" + jQuery(this).attr("id") + "\").trigger(\"click\")")
});


//coupon page - aggregated reports

if (CTIsPlayback() && !parent.P2SIDs) {
    jQuery(document.body).ready(function () {
        setTimeout(function () {
            var CTmsg = { "d": { "__type": "GeneralMills.Pillsbury.Web.CouponHandler+CouponListSummary", "CouponList": [{ "Number": 16156029, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307898137800)\/", "Summary": "Save 60¢ on TWO", "MidLevel": "when you buy TWO any flavor Betty Crocker® Suddenly Salad® Mixes", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/029/16156029.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16155365, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307828197793)\/", "Summary": "SAVE 60¢", "MidLevel": "when you buy ONE BOX any flavor Lucky Charms® Treats, Golden Grahams® Treats, Chex Mix® Treats, OR Milk ...", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/365/16155365.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16150070, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307146052260)\/", "Summary": "SAVE $1.10 ON TWO", "MidLevel": "when you buy any TWO BOXES General Mills cereals: Basic 4® • Cheerios® (any) • Chex® (any) • Cinnamon ...", "DollarSavingsAmount": 1.10, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/070/16150070.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16150069, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307205027800)\/", "Summary": "SAVE 85¢", "MidLevel": "when you buy any ONE BOX Fiber One® cereal listed: Fiber One® Original • Fiber One® Honey Clusters® • ...", "DollarSavingsAmount": 0.85, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/069/16150069.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16150063, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307299622603)\/", "Summary": "SAVE 60¢", "MidLevel": "when you buy ONE BOX Original Cheerios® cereal (the one in the yellow box)", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/063/16150063.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16150065, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307114068387)\/", "Summary": "SAVE 60¢", "MidLevel": "when you buy ONE BOX Reese’s® Puffs® cereal", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/065/16150065.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16157067, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307741712323)\/", "Summary": "Save 60¢ on EIGHT", "MidLevel": "when you buy EIGHT CUPS any variety Yoplait® Yogurt (Includes Original, Light, Thick & Creamy, OR Whips!®)", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/067/16157067.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16158090, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307105851120)\/", "Summary": "Save 85¢ on TWO", "MidLevel": "when you buy TWO any flavor Yoplait® products listed: • Yoplait® Go-GURT® Yogurt • Yoplait® Trix® Multipack ...", "DollarSavingsAmount": 0.85, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/090/16158090.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16157091, "StartDate": "\/Date(1306904460000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1307301448190)\/", "Summary": "Save 60¢", "MidLevel": "when you buy any flavor 32 OZ. Yoplait® Yogurt", "DollarSavingsAmount": 0.60, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/091/16157091.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16156052, "StartDate": "\/Date(1307422860000)\/", "ExpirationDate": "\/Date(1312174740000)\/", "EndDate": "\/Date(1308323638163)\/", "Summary": "Save $1.10", "MidLevel": "when you buy ONE any variety Old El Paso®  Tortilla Stuffers™ Microwavable Meal", "DollarSavingsAmount": 1.10, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/052/16156052.gif", "IsActive": false, "IsExpired": true, "IsPrinted": false }, { "Number": 16085193, "StartDate": "\/Date(1299736800000)\/", "ExpirationDate": "\/Date(1328075940000)\/", "EndDate": null, "Summary": "SAVE $3.00", "MidLevel": "On Any Prevacid®24HR Product", "DollarSavingsAmount": 3.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/193/16085193.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16163364, "StartDate": "\/Date(1306818060000)\/", "ExpirationDate": "\/Date(1317445140000)\/", "EndDate": null, "Summary": "Save $0.50", "MidLevel": "on any ONE (1) Windex®, Pledge®, or Scrubbing Bubbles® Cleaning Cloths & Sponges By Libman", "DollarSavingsAmount": 0.50, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/364/16163364.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16189075, "StartDate": "\/Date(1306990800000)\/", "ExpirationDate": "\/Date(1325397540000)\/", "EndDate": null, "Summary": "SAVE $1.00", "MidLevel": "on any one (1) NIVEA Express Hydration Lotion or Gel", "DollarSavingsAmount": 1.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/075/16189075.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false }, { "Number": 16194368, "StartDate": "\/Date(1306904400000)\/", "ExpirationDate": "\/Date(1314766740000)\/", "EndDate": null, "Summary": "$5.00 OFF", "MidLevel": "on Any ROGAINE® product", "DollarSavingsAmount": 5.00, "ImageUrl": "http://download1.coupons.com/7/19/7125/1450/insight.coupons.com/COS20/_Cache/_ImageCache/368/16194368.gif", "IsActive": true, "IsExpired": false, "IsPrinted": false}], "SavingsSummary": "9.50,0,7.50"} };
            getCouponsSuccess(CTmsg);
        }, 100);
    });
}

//register pop-up removal for aggregated reports
if (CTIsPlayback() && !parent.P2SIDs) {
    jQuery(".reg_call_out").css("display", "none");
}

