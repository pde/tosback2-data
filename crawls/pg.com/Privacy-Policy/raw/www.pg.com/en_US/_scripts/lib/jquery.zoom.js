/*
jquery.zoom.js
By: Chris Klanac, 20 July 2009

Simple plugin used to make zoom pop-ups of images

USAGE:
    Create an image with the thumbnail as it's source.
    Wrap the image in an anchor with the full size image as it's href
    Initialize the plugin using a jequery selector such as $('.zoom').zoom();

    If .zoom is on image tag
        <a href="image.gif"><img src="image.gif" class="zoom"/></a>
        then zoom image filename = image-thumb-zoom.gif
    ==OR==
    If .zoom is on a tag
        <a href="image.gif" class="zoom"><img src="image-thumb.gif"/></a>
        then zoom image filename = image-zoom.gif
*/

    (function($) {
        $.fn.zoom = function(options) {
            return this.each(function(){
                var el = $(this);   //handle on link tag
                var h = el.height(), w = el.width(); //get height and width to calculate center. see below
                var url = (this.tagName.toLowerCase() == 'a')? this.href:this.src;
                var timer;
                el.mouseover(function() {
                    //user timeout so user must pause over image
                    timer = setTimeout(function (){
                        el.parents('li').css({'z-index':10});
                        var zoom = buildZoomImgSrc(url);
                        //image already exists in DOM, show it else fetch and build html overlay
                        if (el.find('img[src='+zoom+']').length) {  //find image is zoom is on a tag
                            el.find('img[src='+zoom+']:hidden').fadeIn();
                        } else if (el.next('img[src='+zoom+']').length) { //find image if zoom is on img tag
                            el.next('img[src='+zoom+']:hidden').fadeIn();
                        } else {
                            var img = new Image(); //create cached image
                            img.onload = function() {
                                $(img).addClass('zoom-overlay')
                                .css({
                                    height:img.height+'px', width:img.width+'px',   //set height & width to image natural size
                                    top:-(img.height/2)+(h/2)+'px', left:-(img.width/2)+(w/2)+'px'  //calculate center
                                })
                                .mouseout(function (){
                                    $(this).fadeOut('fast');
                                    el.parents('li').css({'z-index':0});
                                });

                                if (el[0].tagName.toLowerCase() == 'a') $(img).appendTo(el);
                                else $(img).insertAfter(el);

                            }
                            img.src = zoom; //set image src after onload to fix IE 6
                            delete img; //delete image object
                        }
                    },100);

                }).mouseout(function (){
                    clearTimeout(timer); //clearTimeout if user moves mouse quickly over target
                })
            });
        };

        function buildZoomImgSrc(imgUrl){
            return imgUrl.substring(0,imgUrl.lastIndexOf('.'))+ '-zoom' + imgUrl.substring(imgUrl.lastIndexOf('.'))
        }
    })(jQuery);
