(function($){
    $.fn.dropDownSelectBox = function(options) {	
        return this.each(function() {
            var $this = $(this);
            $this.hide();			
			if($this.attr('title') ===undefined || $this.attr('title') =='') {//check for excercise module
            $this.attr('autocomplete','off'); /* FF4 bug */
            var dropDownHTML = methods.createHTML($this);
            $this.after(dropDownHTML);
            methods.bindHTML(dropDownHTML, $this);
            methods.collapseOnClickOut(dropDownHTML);
			}
        });
    };
    var methods = {
        createHTML : function(selectObject) {
            var html = $('<div class="dropDownSelectBox"><div class="window"></div><div class="options"></div></div>');
            $(selectObject).find('option:selected').each(function() {
                $(html).find('.window').append('<span>' + $(this).html() + '</span>');
            });
            $(selectObject).find('option').each(function() {
                if($(this).is(':selected')) {
                    $(this).attr('selected','selected');
                }
                $(html).find('.options').append('<span rel="' + $(this).val() + '">' + $(this).html() + '</span>');
            });
            $(html).find('.options').hide();
            $(html).find('.options span[rel=""]').hide();
            return html;
        },
        bindHTML : function(dropDownHTML, selectObject) {
            $(dropDownHTML).find('.window').click(function(event) {			
                if($(dropDownHTML).find('.options span[rel!=""]').length) {
                    $(dropDownHTML).toggleClass('open');
					$(dropDownHTML).parent().toggleClass('current');
                    $(dropDownHTML).find('.options').toggle();
                } else {
                    alert('Please choose an option.');
                }
                event.preventDefault();
            });
            
            /* hack */
            
            /* !hack */
            
            $(dropDownHTML).find('.options > span').click(function(event) {
                var $item = $(this);
                $(dropDownHTML).find('.window').html($(this).clone());
                $(dropDownHTML).toggleClass('open');
				$(dropDownHTML).parent().toggleClass('current');
                $(dropDownHTML).find('.options').toggle();
                $(selectObject).find('option:selected').removeAttr('selected');
                $(selectObject).find('option').each(function() {
                    if(($(this).html()==$item.html())&&($(this).val()==$item.attr('rel'))) { // html=html, val=title; href does not work in IE - using rel
                        $(this).attr('selected','selected');
                        $(selectObject).change();
                    } 
                });
                event.preventDefault();
            });
        },
        setWidth : function(dropDownHTML) {
            /* assign width to dropdowns if not specified */
        },
        collapseOnClickOut : function(dropDownHTML) {
            $(document).click(function(event){
                var $target = $(event.target);
                if($(dropDownHTML).hasClass('open') && !$target.closest($(dropDownHTML)).length && !$target.is($(dropDownHTML))){ // needs fix
                    $(dropDownHTML).toggleClass('open');
					$(dropDownHTML).parent().toggleClass('current');
                    $(dropDownHTML).find('.options').toggle();
                }
            });
        },
        bindSelect : function(select) {
            /* track original select's options */
        }
    };
})(jQuery);