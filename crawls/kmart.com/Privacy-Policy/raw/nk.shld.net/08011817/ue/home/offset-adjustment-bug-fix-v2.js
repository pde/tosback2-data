
function calcafadj(input, storeid){
	//fix for sears layout
	
	var s = document.body.scrollTop, toppos = $('#search').position(), 
	adjustment = 0, ieadj, deftop =100, offset = $(input).offset();
	if(storeid=='10153_12605' || storeid== '10165_26151'){
		if($('body').hasClass('ie7')){
			ieadj =true;
		}
		
		if($('#MML_vertical').length != 0 ){ //vertical pages
			adjustment = (ieadj==true) ? -8 : 8;
		}else if($('#category').length != 0){	//category page
			adjustment =  (ieadj==true) ? -8 : 8;
		}else if($('#home').length != 0){		//home page
			if(s >= 50){
				return toppos.top + input.offsetHeight - 20;
			}else{
				return toppos.top + input.offsetHeight+(30-s);
			}
		}else{
			adjustment = 0;
		}
		
	}else{
		adjustment =  0;
	}
	return ((offset.top + input.offsetHeight) - adjustment) > deftop ? deftop :((offset.top + input.offsetHeight) - adjustment);
}
