
HN.Scroller = new function () {
	var self = this;
	
    this.inject = function(id, objClass, height) {
        
        
        var $containners = $('ul[class*="'+objClass+'"]');
        if($containners.length > 0) {
           
            $containners.each(function() {
                var $ul = $(this);
                if($ul.parents('#findDealerModal').length > 0)
                    height = 525;
                    
                $ul.wrap('<div class="content viewport" style="height:'+height+'px"></div>');
                $ul.css({'position':'absolute'});
                if(!$ul.hasClass('overview')) {
                    $ul.addClass('overview');
                }
                
                var $content = $ul.parent();
                $content.wrap('<div class="scrollwrapper" id="'+id+'" style="overflow:hidden;position:relative;width:100%;z-index:9999;height:'+height+'px"></div>');
                var $scrollerDiv = $content.parent();
                $scrollerDiv.append('<div class="scrollbar scroller" style="height:'+height+'px"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>');
               // $scrollerDiv.tinyscrollbar({size:height});
                $scrollerDiv.tinyscrollbar({ size: height, sizethumb: 50 });
            });
            
                
                
        }
    }
        

};