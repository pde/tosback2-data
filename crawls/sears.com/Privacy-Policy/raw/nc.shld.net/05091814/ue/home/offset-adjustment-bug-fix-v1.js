function calculateafadjustment(toppos, storeid){
	//fix for sears layout
	var adjustment = 0, ieadj, deftop =100;
	if(storeid=='10153_12605' || storeid== '10165_26151'){
		if($('body').hasClass('ie7')){
			ieadj =true;
		}
		
		if($('#MML_vertical').length != 0 ){ //vertical pages
			adjustment = (ieadj==true) ? -8 : 8;
		}else if($('#category').length != 0){	//category page
			adjustment =  (ieadj==true) ? -8 : 8;
		}else if($('#home').length != 0){		//home page
			adjustment =  (ieadj==true) ? -2 : -2;
		}else{
			adjustment = 0;
		}
		
	}else{
		adjustment =  0;
	}
	return (toppos - adjustment) > deftop ? deftop :(toppos - adjustment);
}
