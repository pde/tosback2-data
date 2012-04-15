// JavaScript Document

/* Image rollovers */
$(function(){
	$('img.over').mouseover(function(){
		if(!this.src.match('-over')){
			var file = this.src.substr(0,this.src.length-4),
				ext = this.src.substr(this.src.length-4,this.src.length);
			file += '-over';
			this.src = file + ext;
		}
	})
	.mouseout(function(){
		if(this.src.match('-over')){
			var source = this.src.replace('-over','');
			this.src = source;
		}
	});
	
/* prevent exec script in search box */	
	$("form[action='/search/'] a")
	.attr("href","#")
	.click(function(e){
				e.preventDefault();
				$(this).parents("form").submit();    
	});

	$("form[action='/search/']").submit(function(){
				$input = $("input[name=q]",this);
				//get unsafe search string 
				var s = $input.val();
				//replace
				s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
				//set safe search string 
				$input.val(s);
	});
	
	
});