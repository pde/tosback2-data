/*
 * parameters :
 * 		facebookAppId: Facebook iFrame Application ID
 * 		productName: Name of the current selected product.
 * 		productDescription: Description of the current product. *
 * 		productSourceURLForFacebook: Array of products URL/Links to access from facebook wall post.
 * 		productsImageSource: Recommended product image  to display on facebook wall post.
 * 		productsURLSource: Recommended/additional array of products URL sources to display on facebook wall post.
 *
 */
function shareProduct(appId, productName, productDescription, productURL, productImage, productURLSource){
   var mediaArrayRecommendedProducts = new Array();
    mediaArrayRecommendedProducts[0] = { "type" : "image", "src" : productImage, "href" : productURLSource };
     FB.ui({
           method: 'feed',
           name: productName,
           link: productURL,
           picture: productImage,
           caption: productName,
           description: productDescription,
           message: ' '
             },
             function(response) {
                  if (response && response.post_id) {
                       // alert('Post was published.');
                       facebookReport('FacebookShare', productURL);
                     } else {
                       // alert('Post was not published.');
                     }
             });
 }

function shareProductOld(facebookAppId, productName, productDescription, productSourceURLForFacebook, productImageSource, productURLSource){
   var mediaArrayRecommendedProducts = new Array();
    mediaArrayRecommendedProducts[0] = { "type" : "image", "src" : recommendedProductsImageSource, "href" : recommendedProductsURLSource };
     FB.ui({
           method: 'stream.publish',
           message: ' ',
           attachment: {
                             name: productName,
                             caption: productName,
                             description: productDescription,
                             href: productSourceURLForFacebook,
                             media: mediaArrayRecommendedProducts
           }});
 }


function queryLikeCount(productURL, callback) {
      count = 0;
      FB.api(
      {
         method: 'fql.query',
        query: 'SELECT share_count, like_count, comment_count, total_count FROM link_stat WHERE url="'+productURL+'"'
      },
     function(response) {
         count = response[0].total_count;
         callback(count)
      });
      return count;
}

function facebookReport (evt, obj) {
    if (!facebookReportingEnabled) return;

    var $ = jQuery;
    $('iframe.reportingFrame').remove();

    var uniqueNum = new Date().getTime();
    var frameid = "reportingFrame" + uniqueNum;
    var reportingWin = $('<iframe class="reportingFrame" frameborder="0" tabindex="-1" src="javascript:false;" style="display:block;position:absolute;z-index:-1;width:0;height:0" name="' + frameid + '" id="' + frameid + '"/>');
    $('body').append(reportingWin);
    var src = '/syndicated-store/reporting.do?rand=' + new Date().getTime() + '&' + $.param({'evt': evt, 'obj': obj});
    reportingWin.attr("src", src);
}

