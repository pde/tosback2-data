(function($){
	
	
	$(document).ready(function(){
		$.each(BNYS.views, function(){
			this();
		});
	});
	
	
	
})(jQuery)