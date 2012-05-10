


var OverlayPlayer = new Class({
    Implements: Options,
    options: {
        'channels':[],
        'default_channel':[],
        'text':null,
        'page_title':'Zappos.com',
        'featured_header':'Featured Zappos.com Videos',
         //'search_header':'Search', // Currently disabled
        'body_text':'Zappos.com was founded in 1999 with the goal of becoming the premiere destination for online shoes. Since then, we\'ve become much more than just an online shoe store. Our unwavering focus on superior customer service has allowed us to expand our online offerings to include handbags, clothing, electronics and so much more! If you\'re looking for shoes, clothing and handbags online, compare us to other online shoe and online clothing stores, as well as online handbag stores. You\'ll find the absolute best service and the best selection in online shopping here at Zappos.com!',
        'button_color':'#f6d58e',
        'text_color':'#ffffff',
        'background_color':'#000000',
        'background_url':'',
        'width':966,
        'height':650,
        'playerURL':'http://content.retail.overlay.tv/flash/zappos/retail_player_experience.swf'
    },

    initialize: function(el, position, options) {
        this.setOptions(options);
        var embedPlayerDiv = new Element('div', {id: 'embed-player'});
        embedPlayerDiv.inject(document.getElement(el), position);

        Overlay.queryEmbed('embed-player', 
        {
            "default_overlay": "1318e3e1-7487-4218-8a8d-fbfd54f90377", 
            "criteria": {
                "channels": this.options['channels']
            }, 
            "default_channel": this.options['default_channel'],
            "text": this.options['text'],
            "client": "ZAPPOS"
        }, {
            "flashVars": {
                "PAGE_TITLE": this.options['page_title'],
                "FEATURED_HEADER": this.options['featured_header'],
                //"SEARCH_HEADER":options['search_header'], // Currently disabled
                "CONTEXT": "Brand+Landing+Page", 
                "BODY_TEXT": this.options['body_text'],
                "BUTTON_COLOR": this.options['button_color'],
                "TEXT_COLOR": this.options['text_color'],
                "BACKGROUND_COLOR": this.options['background_color'],
                "BACKGROUND_URL": this.options['background_url'],
                "EMBEDDED_PLAYER_CONFIG": "%7B%22HEIGHT%22%3A+%22330%22%2C+%22playerURL%22%3A+%22http%3A%2F%2Fcontent.retail.overlay.tv%2Fflash%2Fzappos%2Fretail_recorder.swf%22%2C+%22WIDTH%22%3A+%22295%22%7D"
           }, 
            "playerURL": this.options['playerURL'], "width": this.options['width'], "height": this.options['height']
        }
        );
        
    }
});
