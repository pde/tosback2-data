ATT.namespace("ui");
/**
 * Object will display hint text to text inputs.  The text input's title attribute's value will display when input's value is empty.
 * include inputs on the page with class="hint".  
 * @example <input type="text" class="hint" value="" title="This hint will display when value is empty" />
 **/
ATT.ui.hints = {
	inited : false,
	init : function (options) {
		options = options || {hintClass:'hint'};
		var hintClass = options.hintClass;
		var hintSelector = 'input.'+hintClass;
		jQuery(hintSelector).each(function(idx, input) {
			if (input.value === '' && !!!input.atthinted) {
				input.value = input.title;
				input.atthinted = true;
				jQuery(input).addClass(hintClass+'ing');
			} else {
				jQuery(input).removeClass(hintClass+'ing');
				input.atthinted = true;
			}
		});
		if ( ! ATT.ui.hints.inited) { // only delegate once on document
			jQuery(document).delegate(hintSelector,'focus',function(e){
				tgt = e.currentTarget;
				if (tgt.value === tgt.title && !!tgt.atthinted) {
					tgt.value = '';
					jQuery(tgt).removeClass(hintClass+'ing');
				}
			});
			jQuery(document).delegate(hintSelector,'blur',function(e){
				tgt = e.currentTarget;
				if (tgt.value === '' && !!tgt.atthinted) {
					tgt.value = tgt.title;
					jQuery(tgt).addClass(hintClass+'ing');
				}
			});
			jQuery(document).delegate('form','submit', function(e){
				form = e.currentTarget;
				jQuery(form).find(hintSelector+'ing').each(function(idx, input) {
					input.value = '';
				});
				return true;
			});
			ATT.ui.hints.inited = true;
		}
	}
}
jQuery(document).ready(function(){
	if (jQuery('input.hint').length > 0) ATT.ui.hints.init();
	jQuery(document).bind('cbox_complete cbox_closed',function() {
		if (jQuery('input.hint').length > 0) ATT.ui.hints.init();
	});
});