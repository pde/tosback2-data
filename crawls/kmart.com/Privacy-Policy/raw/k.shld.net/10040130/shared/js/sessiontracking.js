onload = function() {
	try{
		if($.cookie('sessiontracking'+storeId) == null){
			$.cookie('sessiontracking'+storeId,$.cookie('JSESSIONID'),{path:'/'});
		}
	}catch(e){}
}