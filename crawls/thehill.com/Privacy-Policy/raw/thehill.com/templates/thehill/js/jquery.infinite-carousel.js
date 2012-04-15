/**
 * @author Stéphane Roucheray
 * @extends jquery
 */


jQuery.fn.carousel = function(previous, next, options){
  var separator = jQuery('.twtr-reference-tweet');
  separator.children().insertAfter(separator);
  separator.remove();
  //alert("inside carousel...");
  //alert(document.getElementById('twtr-widget-1').innerHTML);
  //alert(document.getElementById('block-multiblock-14').innerHTML);

    var sliderList = jQuery(this).children()[0];

    if (sliderList) {
        //!var increment = jQuery(sliderList).children().outerWidth("true"),
        var increment = jQuery(sliderList).children().outerHeight("true"),
        elmnts = jQuery(sliderList).children();
        
        if (!elmnts.size()) return;

        var numElmts = elmnts.length,
        sizeFirstElmnt = increment,
        //!shownInViewport = Math.round(jQuery(this).width() / sizeFirstElmnt),
        shownInViewport = Math.round(jQuery(this).height() / sizeFirstElmnt),
        firstElementOnViewPort = 1,
        isAnimating = false;

        jQuery(sliderList).css('height',(numElmts+shownInViewport)*increment + increment + "px");
        for (var i = 0; i < shownInViewport; i++) {
            //!jQuery(sliderList).css('width',(numElmts+shownInViewport)*increment + increment + "px");
            jQuery(sliderList).append(jQuery(elmnts[i]).clone());
        }


        jQuery(previous).click(function(event){
            if (!isAnimating) {
                if (firstElementOnViewPort == 1) {
                    //!jQuery(sliderList).css('left', "-" + numElmts * sizeFirstElmnt + "px");
                    jQuery(sliderList).css('top', "-" + numElmts * sizeFirstElmnt + "px");
                    firstElementOnViewPort = numElmts;
                }
                else {
                    firstElementOnViewPort--;
                }

                jQuery(sliderList).animate({
                    //!left: "+=" + increment,
                    top: "+=" + increment,
                    y: 0,
                    queue: true
                }, "swing", function(){isAnimating = false;});
                isAnimating = true;
            }

        });

        jQuery(next).click(function(event){
            if (!isAnimating) {
                if (firstElementOnViewPort > numElmts) {
                    firstElementOnViewPort = 2;
                    //!jQuery(sliderList).css('left', "0px");
                    jQuery(sliderList).css('top', "0px");
                }
                else {
                    firstElementOnViewPort++;
                }
                jQuery(sliderList).animate({
                    //!left: "-=" + increment,
                    top: "-=" + increment,
                    y: 0,
                    queue: true
                }, "swing", function(){isAnimating = false;});
                isAnimating = true;
            }
        });
    }
};
