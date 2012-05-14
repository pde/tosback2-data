/* js file */
$(document).ready(function(){
	try{
		var noJS = $(document).find("div.no-js"),
			sessCookie = Target.controller.header.cookie.read('s_sess');			
		if((noJS != null || noJS != "") && sessCookie != null){
			$("div.no-js").hide();
			$("#overlay-curtain").hide();
		}
	}catch(e){}
});