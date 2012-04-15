function loadLogin(){
	$('#login_popup').slideDown();
}

function loadRegisterForm(baseurl){
	$('.container').load(baseurl+'/home/createnetworkhome');
}