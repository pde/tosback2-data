$(document).ready(function(){
	$('from.contactus').submit(function(){
		var form = $(this);                           
		var phone = $('#phone');                       
		var phone = $('#phone3');                       
		var phone = $('#phone4');                                    
		var phone = $('#contactPhone');
		contactPhone.val() = phone.val() + phone3.val() + phone4.val();
	});

			$('#foo0').carouFredSel({
			prev: '#prev2',
			next: '#next2',
			pagination: "#pager2",
			auto    : {
				pauseOnHover: 'resume',
				button          : "#foo2_play"
			},
			scroll  : {
				duration        : 1000,
				pauseDuration   : 2000
			}
			}).trigger("pause");

	Cufon.replace('h3.frutiger',{fontFamily: 'Frutiger LT 45 Light'});
	Cufon.replace('.right .rtCont',{fontFamily: 'Futura Lt BT', hover: true});
});