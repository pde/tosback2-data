
/*de.bild.video:22900814.3*/

var de = de || {};
de.bild = de.bild || {};
de.bild.video = (function($){
    /**
     * videocenter: sets up video centre teaser
     * @name videocenter
     * @returns {$Object} jQuery Collection of video center elements
     * @function
     * @private
     */
    function videocenter(){
        var $videocenter = $('div.videocenter');
        if ($videocenter) {
            var $vidframes = $videocenter.find('div.hentry'),
            $lis = $videocenter.find('li');
            $lis.on('mouseover', function(e) {
                var $this = $(this),
                index = $this.index();
                $lis.removeClass('current');
                $this.addClass('current');
                $vidframes.css({
                 'display' : 'none'
                })
                .eq(index)
                .css({
                 'display' : 'block'
                })
            }); 
        }
        return $videocenter;
    };
    /**
     * Flash-Player wird auf dem iPad durch video-Tag ersetzt
     * betrifft qgtv.js, de.bild.legacy.js & sfx.js
     */
    function replaceFlash(){
        if (de.bild.utils.isIPad() || de.bild.utils.isIPhone()) {
            var $players = $('object.player, .videoGallery object');
            if ($players.length) {
                $players.each(function(){
                    var $this = $(this),
                    xmlurl = $this.find('param[name="FlashVars"]').first().val();
                    if (xmlurl !== 'undefined' && xmlurl !== null) {
                        xmlurl = xmlurl.replace(/xmlsrc=/i, '');
                        $.ajax({
                            url : xmlurl
                        }).done(function(data){
                            var $tmpVid = $(data).find('video').first(),
                            src = $tmpVid.attr('src'),
                            poster = $tmpVid.attr('img'),
                            height = $this.attr('height'),
                            width = $this.attr('width'),
                            $newVid = $('<video height="' + height +  '" width="' + width + '" src="' + src + '" poster="' + poster + '" controls="controls"></video>');
                            $newVid.on('ended', function(){
                                var $this = $(this),
                                $tmpVid = $this.clone(true);
                               
                                $this.replaceWith($tmpVid);
                            });
                            $this.replaceWith($newVid);
                        }); // ajax
                    }
                });
            }
            return $players;
        } // end mobile check
        return null;
    };    
    /**
     * init: inits video center load funcs
     * @name init
     * @returns {Bool} true
     * @function
     * @private
     */
    function init() {
        videocenter();
        registerAllVideoObjects( de.bild.settings.videoSettings.cssFile, null, de.bild.settings.videoSettings.swfFile);
        return true;
    };
    /**
     * initVideoIn: inits (registers) all videos which are childnodes of $context
     * @name initVideoIn
     * @returns {Bool} true
     * @function
     * @private
     * param $context - jQuery Object
     */
    function initVideoIn( $context ) {
        registerAllVideoObjectsForContext( $context )
        return true;
    };
    return {
        'registerAll' : function(){
            registerAllVideoObjects( de.bild.settings.videoSettings.cssFile, null, de.bild.settings.videoSettings.swfFile);
        },
        'replaceFlash' : function(){
            return replaceFlash();
        },
        'init' : function(){
            return init();
        },
        'initVideoIn' : function($context) {
            initVideoIn( $context );
        }
    }
}(jQuery));