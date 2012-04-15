/*fairPoint.com Q2 26-May-2011*/
var hideMe = true;
var matched = false;
var xmltxt = '';
var xmlAll;
var arr_listMatch = [];
var arr_listAllCountry = [];
var currency=duration=cname='';
var arr_listFrequentlyCalledCountry=[];
var donValidator;
var sponValidator;


$('document').ready(function(){

	//Pre-load jqprint JS library
	$.getScript('/scripts/jquery/jquery.jqprint.0.3.js', function(){});
	//Binding 'print' link to have the popup content printed
	$('#country_CodesRates h2>a').bind('click', function(e){
		e.preventDefault();
		$('#country_CodesRates').jqprint();
		return false;
	});

	$('.frmBtn').hover(function(){
		$(this).addClass('frmBtnHover')
	}, function(){
		$(this).removeClass('frmBtnHover')
	});

	$('.accessYourAccount').hover(function(){
		$(this).addClass('accessYourAccountHover')
	}, function(){
		$(this).removeClass('accessYourAccountHover')
	});

	$('.premiumAddonButton').hover(function(){
		$(this).addClass('premiumAddonButtonHover')
	}, function(){
		$(this).removeClass('premiumAddonButtonHover')
	});

	$('.shortPoint').hover(function(){
		$(this).addClass('shortPointHover');
	}, function(){
		$(this).removeClass('shortPointHover');
	});//end hover
	


var pg = 1;
var toMove = (-690);
	$('.navPaging a').click(function(){ 
		if($(this).text() === '1'){
			pg = 1;
			$('.navPaging').find('a').removeClass('selectedPage');
			var navPage = $('.navPaging').find('a');
			$(navPage).each(function(){
				if($(this).text() === '1')				 
				$(this).addClass('selectedPage');				
			});
			$('#billDemos').animate( { marginLeft:(toMove*0)+"px" }, 1000);
		}else if($(this).text() === '2'){
			pg = 2;
			$('.navPaging').find('a').removeClass('selectedPage');
			var navPage = $('.navPaging').find('a');
			$(navPage).each(function(){
				if($(this).text() === '2')				 
				$(this).addClass('selectedPage');				
			});
			$('#billDemos').animate( { marginLeft:toMove+"px" }, 1000);
		}else if($(this).text() === '3'){
			pg = 3;
			$('.navPaging').find('a').removeClass('selectedPage');
			var navPage = $('.navPaging').find('a');
			$(navPage).each(function(){
				if($(this).text() === '3')				 
				$(this).addClass('selectedPage');				
			});
			$('#billDemos').animate( { marginLeft:(toMove*2)+"px" }, 1000);
		}else if($(this).text() === '4'){
			pg = 4;
			$('.navPaging').find('a').removeClass('selectedPage');
			var navPage = $('.navPaging').find('a');
			$(navPage).each(function(){
				if($(this).text() === '4')				 
				$(this).addClass('selectedPage');				
			});
			$('#billDemos').animate( { marginLeft:(toMove*3)+"px" }, 1000);
		}//endif

	});//end click
	
	//requestDonation modal windowf
	$('#requestDonation').click(function(e){
		e.preventDefault();
		$('#donationForm').modal();									 		
	});//end click
//	$('#submitDonationForm').click(function(){ 
	donValidator = $('#frmDonation').validate({
		rules: {
	  		txtCname: "required",
			txtPh1: {
				required: true,
				digits: true,
				minlength: 3,
				maxlength: 3
			},
			txtPh2: {
				required: true,
				digits: true,
				minlength: 3,
				maxlength: 3
			},
			txtPh3: {
				required: true,
				digits: true,
				minlength: 4,
				maxlength: 4
			},
			txtEmail: {
				required: true,
				email: true
			},
			txtZip: {
				 required: true,
				 zip: true,
				 digits: true,
				 minlength: 5,
				 maxlength: 5
			},
			ddState: "required",
			txtAreaSummary: {
				required: true,
				maxlength: 1500
			},
		   recaptcha_response_field: {
			   required: true
		   }
	 },
	 messages:{
		 txtZip:{
			 digits: "We need the zip code.",
			 minlength: "Please entera  valid 5-digit ZIP code.",
			 maxlength: "Please enter valid 5-digit ZIP code."
		 },
		txtPh1: {
			required: "Please enter your Phone Number.",
			digits: "Please enter a valid Phone Number.",
			minlength: "Please enter a valid Phone Number.",
			maxlength: "Please enter a valid Phone Number."
		},
		txtPh2: {
			required: "Please enter your Phone Number.",
			digits: "Please enter a valid Phone Number.",
			minlength: "Please enter a valid Phone Number.",
			maxlength: "Please enter a valid Phone Number."
		},
		txtPh3: {
			required: "Please enter your Phone Number.",
			digits: "Please enter a valid Phone Number.",
			minlength: "Please enter a valid Phone Number.",
			maxlength: "Please enter a valid Phone Number."
		},
		  recaptcha_response_field: {
			required: "Please type both words separated by a space."
		  }
	 },
	 groups: {
				txtPh3: "txtPh1 txtPh2 txtPh3"
	},
	errorPlacement: function(error, element) {				
		 if (element.attr("name")  ===  "txtPh1" || element.attr("name")  ===  "txtPh2" || element.attr("name")  ===  "txtPh3" ){
			error.insertAfter("#phone3");
		 }else if (element.attr("name") == "recaptcha_response_field") {
	 		error.insertBefore('#captchaError');
		}else{
			error.insertAfter(element);
		}//endif
	},
	highlight: function(element, errorClass, validClass){
		$(element).removeClass(validClass).addClass(errorClass);
	   $('#captchaError').hide();
	},
   submitHandler: function(form) {
		var $form = $(form);
		$.ajax({
			//url: '/servlet/DonationFormServlet',
			url: $(form).attr('action')+'?callback=callBackFunc',//.replace('https', 'http'),
			data: $(form).serialize(),
			type: $(form).attr('method').toUpperCase(),
			crossDomain: true,
			dataType: 'jsonp',
			contentType: 'application/json; charset=utf-8',
			//jsonp: 'callBackFunc',
			jsonpCallback: 'callBackFunc',
			beforeSend: function(jqXHR){
				$('#captchaError').hide();
				if(!$('#wait-anim').length) $(document.body).append('<div id="wait-anim" style="display:none;"><img title="" alt="" src="/cmsimages/channel-loader.gif" /></div>');
				$('#wait-anim').modal({
					escClose: false,
					opacity: 20
				});
			},
			success: function(response) {
				_debug('success');
			},
			error: function(jqXHR, textStatus, errorThrown) {
				_debug(jqXHR);
				_debug('Error occured during AJAX...');
				_debug(textStatus);
				_debug(errorThrown);
				parent.$.modal.close();
			}
		});
	}	 
});



	$('#frmDonation #reset').click(function(){
		donValidator.resetForm();
		$(this).closest('form').find(':input').removeClass('in-focus');
	});
		//end validate
		//	});//end click 
		sponValidator = $('#sponsor-request').validate({
			rules: {
				txtCname:"required",
				txtPh1: {
					required: true,
					digits: true,
					minlength: 3,
					maxlength: 3
				},
				txtPh2: {
					required: true,
					digits: true,
					minlength: 3,
					maxlength: 3
				},
				txtPh3: {
					required: true,
					digits: true,
					minlength: 4,
					maxlength: 4
				},
				txtEmail:{
					required:true,
					email:true
				},
				txtOrgName :"required",
				txtAddress :"required",
				txtCity :"required",
				ddState:"required",		
					
				txtZip:{
					 required: true,
					 zip: true,
					 digits: true,
					 minlength: 5,
				 	 maxlength: 5
				},
				txtNameEvent:"required",
				txtAreaSummary: {
					required: true,
					maxlength: 1500
				},
				txtEventDate:"required",
			   recaptcha_response_field: {
				   required: true
			   }
			},
			messages:{
				txtCname:"Please enter your name.",
				txtPh1: {
					required: "Please enter a Phone Number.",
					digits: "Please enter a valid Phone Number.",
					minlength: "Please enter a valid Phone Number.",
					maxlength: "Please enter a valid Phone Number."
				},
				txtPh2: {
					required: "Please enter a Phone Number.",
					digits: "Please enter a valid Phone Number.",
					minlength: "Please enter a valid Phone Number.",
					maxlength: "Please enter a valid Phone Number."
				},
				txtPh3: {
					required: "Please enter a Phone Number.",
					digits: "Please enter a valid Phone Number.",
					minlength: "Please enter a valid Phone Number.",
					maxlength: "Please enter a valid Phone Number."
				},
				txtOrgName:"Please mention your organization name.",
				txtAddress:"Please fill your address details.",
				txtCity:"Please provide your city name.",
				txtPh:"Please enter your valid phone number.",
				txtZip: {
					digits: "We need your valid zip code.",
					minlength: "Please enter valid 5-digit ZIP code.",
					maxlength: "Please enter valid 5-digit ZIP code."
				},
				txtEventDate:"Please provide event date.",
				ddState:"Please select your State.",
				txtAreaSummary:"Please enter brief summary about event.",
				txtEmail: {
					 required: "Please enter your email address.",
					 Email: "Your email address must be in the format of name@domain.com."
				  }	,
				  recaptcha_response_field: {
					required: "Please type both words separated by a space."
				  }
			},
			groups: {
				txtPh3: "txtPh1 txtPh2 txtPh3"
			},
			errorPlacement: function(error, element) {				
				 if (element.attr("name")  ===  "txtPh1" || element.attr("name")  ===  "txtPh2" || element.attr("name")  ===  "txtPh3" ){
				   	error.insertAfter("#txtPh3");
				 }else if (element.attr("name") == "recaptcha_response_field") {
	 				error.insertBefore('#captchaError');
				}else{
					error.insertAfter(element);
			 	}//endif
			},
			highlight: function(element, errorClass, validClass){
				$(element).removeClass(validClass).addClass(errorClass);
			   $('#captchaError').hide();
			},
		   submitHandler: function(form) {
				$.ajax({
					//url: '/servlet/SponsorshipFormServlet',
					url: $(form).attr('action')+'?callback=callBackFunc',
					data: $(form).serialize(),
					type: $(form).attr('method').toUpperCase(),
					crossDomain: true,
					dataType: 'jsonp',
					contentType: 'application/json; charset=utf-8',
					//jsonp: 'callBackFunc',
					jsonpCallback: 'callBackFunc',
					beforeSend: function(){
						$('#captchaError').hide();
						if(!$('#wait-anim').length) $(document.body).append('<div id="wait-anim" style="display:none;"><img title="" alt="" src="/cmsimages/channel-loader.gif" /></div>');
						$('#wait-anim').modal({
							escClose: false,
							opacity: 20
						});
					},
					success: function(response) {
						_debug('success');
					},
					error: function(err) {
						_debug('Error occured during AJAX...');
						_debug(textStatus);
						_debug(errorThrown);
						parent.$.modal.close();
					}
				});
			}
		});//end validate
		
		$('#sponsor-request #reset').click(function(){
			sponValidator.resetForm();
			$(this).closest('form').find(':input').removeClass('in-focus');
		});
		
		
		
	/*email setting loging*/
	var errors
	$('#logIn').click(function(){ 
	    
	jQuery.validator.messages.required  =  "";							   
	var frmvalidator  =  $('#frmLogin').validate({
			invalidHandler: function(form, validator) {
			  frmvalidator.invalidElements().each(function(){					
					$(this).next('span').attr('style', 'display:block!important;');
			  });
			  errors  =  validator.numberOfInvalids();
			},						
			rules:{
				loginEmail:{
					required:true,
					email:true
				},
				loginPass:"required"
			},		
			
			messages:{
				loginEmail:"Login Id required.",
				loginPass:"Password required."
			},
			highlight: function(element, errorClass){  
				$(element).next('span').removeClass('hide');
				
			},
			unhighlight: function(element, errorClass){
				
			},
			
			errorPlacement: function(error, element) {  
				error.insertAfter($(element).next('span'));				
				//error.insertAfter(nxt);
			}			
		});	//end validate			
	});//end click
	
 	
	
	
/*international long distance country search box*/


	$('#txt_countrySearch').focus(function(){
		$(this).addClass('onFocus');
	});
	
	$('#txt_countrySearch').blur(function(){
		$(this).removeClass('onFocus');
		//$('#autoComplete').hide();	
	});

	$('#body-container').click(function(){
		$('#autoComplete').hide();
	});

//Pressing down arrow on menu to select an item from autosuggest dropdown
$('#autoComplete').keydown(function(e){
	var e = e||event;
	var selectedA = $('#autoComplete > a.hover');
	if(e.which == 40){
		selectedA.next().addClass('hover').focus().siblings().removeClass('hover');
	} else if(e.which == 38) {
		selectedA.prev().addClass('hover').focus().siblings().removeClass('hover');
	}
})
		
/* key up */	
	$('#txt_countrySearch').keyup(function(ev){
			//IE FIX for autosuggest popup
			
			if($.browser.msie && parseInt($.browser.version) <= 7) {
				$('.block, .left-col-liquid').css({position: 'static'});
			}
			
			var ev = ev||event;
			if( ($(this).val().length<2)  ||  (ev.which == 27))
			{				
				hideMe = true;			
			}else if(ev.which == 40){
				hideMe = false;
				if(!$('#autoComplete > a.hover').length) {
					$('#autoComplete > a:first').addClass('hover').focus();
				}
				return false;
			}
			if( ($(this).val().length >=  2) )
			{ 								
				autoMatch(); //matching the textbox value with stored array
			}//endif
			if(ev.which == 13){
				ev.preventDefault();
				hideMe = true;
				if($('#txt_countrySearch').val().toLowerCase()!= ""){
					if( ($('#txt_countrySearch').val().toLowerCase())  ===  ($('#autoComplete a:first-child').text().toLowerCase().substr(0,$('#txt_countrySearch').val().length )) )
					{
						$('#txt_countrySearch').val($('#autoComplete a:first-child').text());							
					}//endif
				}//endif
				$('#btn_countrySearch').click();
				$('#autoComplete').hide();
			}//endif
			
			if(hideMe){
				$('#autoComplete').hide();	
			}else{
				$('#autoComplete').show();
				$('#txt_countrySearch').removeClass('errorInput');
			}//end
			
	});//end keyup



$('#txt_countrySearch').dblclick(function(){
	if($('#autoComplete').html()!='')$('#autoComplete').toggle();
});//end 

function trimStr(str) {
	return str.replace(/^\s+|\s+$/g,"");
}
var bodyContHeight='';
$('#btn_countrySearch').click(function(){
	var multipleDetails='';	
	var $inputObj=$('#txt_countrySearch')
	var myVal = $inputObj.val().toLowerCase();//.toLowerCase(); 
	$('#autoComplete').hide();	
	if(matched)
	{
		$('.foundCountryDetails').empty();
		var inputValSepIndex =  myVal.indexOf(',');
			$(xmlAll).find('country').each(function(i){ 
				var $curr = $(this);
				var ph = manipulatePhone($curr.find('phonenumber').text());  //function call									
				var ccur= $curr.find('currencysymbol').text();
				var telco = getCookie("fp_telco");
				var rate="";
				if(null != telco){				   
				  $curr.find('telco').each(function(i){ 
					  if( ($curr.find('tname').text()) ===(telco.toString()) ) {	
						rate=$curr.find('tprice').text();					
					   }
				   });//end each
				}
				if(rate==""){
					rate=$curr.find('defaultprice').text();
				}	
				
				var myCountry = $curr.find('name').text().toLowerCase();
				var xmlValSepIndex = myCountry.indexOf(',');
				
				if(myVal == myCountry || (xmlValSepIndex!=-1 && myVal == trimStr(myCountry.substring(0,xmlValSepIndex).toLowerCase())) || (xmlValSepIndex!=-1 && myVal == trimStr(myCountry.substring(xmlValSepIndex+1,myCountry.length).toLowerCase())))
				{
					multipleDetails += '<div class = "dynamicContainer borderB">'
						multipleDetails+= '<div class = "countryDetail">';
							multipleDetails+= '<div class = "countryName">';
							//multipleDetails+= '<h3 class = "country_callingPrice"><span>'+ rate +'<sup>&cent;</sup></span></h3>'
							multipleDetails+= '<h3 class = "country_callingPrice"><span>'+ rate +'<sup>'+ccur+'</sup></span></h3>'
							multipleDetails+= '<span>per minute</span>'
							multipleDetails+= '<div class = "clear"></div>'
							multipleDetails+= '</div>';
							multipleDetails+= '<div class = "clear"></div>'
						multipleDetails+= '</div>'
						multipleDetails+= '<div class = "countryDial">'
							multipleDetails+= '<h1>'+manipulateCountry($curr.find('name').text()) +':</h1>'
							//multipleDetails+= '<h3>Dial :</h3>'
							multipleDetails+= '<h2>Dial '+ph+'</h2>'
							multipleDetails+= '<div class = "clear"></div>'
						multipleDetails+= '</div>'
						multipleDetails+= '<div class = "clear"></div>'
					multipleDetails+= '</div>'
					//add border from second to second last only
				}//endif
			});//endeach
			$('.foundCountryDetails').append(multipleDetails);
		$('.foundCountryDetails').show();
		$('#autoComplete').hide();
		$('#errorCountrySearch').hide();
		$('#txt_countrySearch').removeClass('errorInput');
		
	}else{
		$('#err_countryName').html(myVal);
		$('#countryName').html($('#txt_countrySearch').val());	
		$('#errorCountrySearch').show();
		$('.foundCountryDetails').hide();
		$('#autoComplete').hide();	
		$('#txt_countrySearch').addClass('errorInput');
	}//endif
	
});//end click


$('#autoComplete .findCountry').live('click',function(e){
	$('#txt_countrySearch').val($(this).text()).focus();
	$(this).parent().hide();
});

$('#autoComplete .findCountry').keyup(function(e){
	if(e.which == 13) {
		$('#txt_countrySearch').val($(this).text()).focus();
		$(this).parent().hide();
	}
});


/*ride side accordion*/
	$('.accordion_Rightside h5').bind('click', function(){
  		myAccordion(this)
	});//end 



//setting the with of understand your bill page container "billdemos"
	var billDemoWidth =  720*4;
	$('#billDemos').css({'width':billDemoWidth,'overflow':'hidden'});

	//the following line has been commented because it causes the button hover layout to disturb on global contact us page
	//$('.ie6hover').hover(function(){$(this).css('backgroundPosition','0 -35px')}, function(){$(this).css('backgroundPosition','0 0')});




/*service Area modal*/
	$('#columbusGrove').click(function(e){
		e.preventDefault();
		$('#columbusGroveModal').modal();	
	});




//button hover for ie6
$('.FpQ2_new-btn').hover(function(){
		$(this).css('backgroundPosition','0 -35px');
		$(this).find('a').css('backgroundPosition','right -35px');
	},
	function(){
		$(this).css('backgroundPosition','0 0px');
		$(this).find('a').css('backgroundPosition','right 0px');
	});//end hover


	$('.capsule-tab .first').click(function(){											
		$('.gridView').show();		
		$('.listView').hide();
		$('li.first').addClass('active').css('backgroundPosition','left -66px');
		$('li.caps').css('backgroundPosition','left -22px');
		
		$('li.last').removeClass('active').css('backgroundPosition','right -44px');
		$('li.cape').css('backgroundPosition','right 0px');
	});//end
	$('.capsule-tab .last').click(function(){
		$('.gridView').hide();
		$('.listView').show();
		$('li.first').removeClass('active').css('backgroundPosition','left -44px');;
		$('li.caps').css('backgroundPosition','0px 0px');
		
		$('li.last').addClass('active').css('backgroundPosition','0px -66px');
		$('li.cape').css('backgroundPosition','right -22px');
	});//end
	
	
/*        Dexter Carousel             */

	//setTimeout(dexterCarousel, 1000);
	var timeoutID = window.setInterval(dexterCarousel, 3500);
	var slideTo=242;
	var delay=0;
	var autoSlide=false;
	var adTotal=$('#dexterAd li').size()*$('#dexterAd li').width();
	$('#dexterAd').css('width', adTotal )
	$('#dexterTitle').width(adTotal);
	$('.carouselFooter ul li').hover(function(){
		$(this).css('cursor','pointer');
	}, function(){
		$(this).css('cursor','default');	
	});
	
	//console.log($('#dexterAd li').size())
	function dexterCarousel(){		
		if(!autoSlide)  //for single rotation
		{
			if(delay>=($('#dexterAd li').size()))
			{
				delay=$('#dexterAd li').size()-1;
			}		
			
		}else{  		// for continous rotation
			if(delay>=($('#dexterAd li').size()))
			{
				delay=0;
			}		
		}//endif
		
			$('#dexterAd').animate( { marginLeft:((-slideTo)*delay)+"px" }, 900);
			$('#dexterTitle').animate( { marginLeft:((-slideTo)*delay)+"px" }, 900);	
			$('.dexterCarousel .carouselFooter li').removeClass('currentSlide');
			$('.dexterCarousel .carouselFooter').find('li:eq('+(delay)+')').addClass('currentSlide');
			
			/*$('#requestVideo').live('click', function(){
				$('.video').eq($('.currentSlide').index()).modal();
				return false;
			});*/
		
		delay++;			
	}//end
	
			
	$('.carouselFooter li').click(function(){
		//clearInterval(timeoutID);										  
		var myIndex=0;
		
		//if(!autoSlide)
		{
			myIndex=$(this).index();
			delay=myIndex;
			$('#dexterAd').animate( { marginLeft:((-slideTo)*myIndex)+"px" }, 900);
			$('#dexterTitle').animate( { marginLeft:((-slideTo)*myIndex)+"px" }, 900);
			$('.dexterCarousel .carouselFooter li').removeClass('currentSlide');
			$(this).addClass('currentSlide');
			
		}

	});
	
	
	
	
})//end ready


function manipulatePhone(phCode)
{
	var ph = phCode;	
	var lastPlus_inString = ph.lastIndexOf('+');			
	var firstBlankSpace_inString = ph.indexOf(' ');			
	var codeInBold = ph.substring(firstBlankSpace_inString,lastPlus_inString);			
	var stringBefore_boldCode = ph.substring(0,firstBlankSpace_inString)			
	var remain_string = ph.substring(lastPlus_inString,ph.length)
			
	return stringBefore_boldCode+'<b class = "fontBlack">'+codeInBold+'</b>'+remain_string;
}//end

function manipulateCountry(countryName)
{
	var cnty = countryName;
	var first_comma = cnty.indexOf(',');		
	var firstString = cnty.substring(0, first_comma);		
	var rest_string = cnty.substring(first_comma+1, cnty.length);		
		if(first_comma>= 0){
			var final_string = (firstString+' - '+ rest_string);			
			return final_string;
		}else{
			return countryName;
		}//endif
	
 
}//end



function seeCodesRates(xml_all){	
	$('#ul_left').empty();
	$('#ul_right').empty();
	var ulLeftRight='<li class="heading"><span class="countryName">Country Name, Mobile, City</span><span class="countryCode">Code</span><span class="countryRate">Rate</span></li>';
	$('#ul_left').html(ulLeftRight);
	$('#ul_right').html(ulLeftRight);
	var str='<li><span class="countryName">$$India$$</span><span class="countryCode">$$+91$$</span><span class="countryRate">$$01$$</span><sup>&cent;</sup></li>';	
	var halfLength=arr_listAllCountry.length/2;

	$(xmlAll).find('country').each(function(i){
		var nameTxt = $(this).find('name').text(),
			cname= (nameTxt.indexOf(',') > -1)? $.trim(nameTxt.split(',').pop())+', '+$.trim(nameTxt.split(',').shift()) : $.trim(nameTxt),
			cprice= "",
			ccode= $(this).find('phonenumber').text(),
			ccur= $(this).find('currencysymbol').text(),
			//ccur='&cent;',
			telco = getCookie("fp_telco");
		if(null != telco)
		{				   
		  $(this).find('telco').each(function(i){ 
			if( ($(this).find('tname').text()) ===(telco.toString()) ) {	
				cprice=$(this).find('tprice').text();					
			 }
		 });//end each
	   }
	  if(cprice==""){
		cprice=$(this).find('defaultprice').text();
				}
		
		strFinal=str.replace("$$India$$", cname);
		strFinal=strFinal.replace("$$01$$",cprice);
		strFinal=strFinal.replace("&cent;",ccur);
		
		var lastPlus_inString = ccode.lastIndexOf('+');
		var firstBlankSpace_inString = ccode.indexOf(' ');		
		codeInBold = ccode.substring(firstBlankSpace_inString,lastPlus_inString); 
		
		strFinal=strFinal.replace("$$+91$$",'+'+codeInBold);
		
		
		//check for half row on left and rest on right ul
		if(i<Math.ceil(halfLength))
		{			
			$('#ul_left').append(strFinal);
			//adding alternate row except first 
			$('#ul_left li:even').addClass('alternateLI');
			$('#ul_left li:first-child').removeClass().addClass('heading');
		}else
		{
			$('#ul_right').append(strFinal);
			//adding alternate row except first 
			$('#ul_right li:even').addClass('alternateLI');
			$('#ul_right li:first-child').removeClass().addClass('heading');
		}//endif
		
	 });//end each
}//end


function autoMatch(){
	//matching text box value length by length with cname length to populate list with all matching values
	//eg if text box has 2 characters then 2 characters will match with cname and fetch all country names starts with 2 matched letter and then store in array to populate	
	var len = $('#txt_countrySearch').val().length;
	xmltxt = '';
	var str = '';
	arr_listMatch = [];

	for(i = 0;i<arr_listAllCountry.length;i++){
		
		if( $.trim($('#txt_countrySearch').val().toLowerCase())  ===  $.trim((arr_listAllCountry[i].substr(0,len).toLowerCase())) ){	
			
			{
				arr_listMatch.push(arr_listAllCountry[i]);
				replaceStr = '<b>'+arr_listAllCountry[i].substr(0,len)+'</b>'+arr_listAllCountry[i].substr(len, arr_listAllCountry[i].length);
				xmltxt+= "<a href = 'javascript:;' title = "+arr_listAllCountry[i]+" class = 'findCountry'>"+replaceStr+"</a>";
				$('#autoComplete').html(xmltxt);
			}
		}//endif
	}//end for
	
	if(arr_listMatch.length>0){
		matched = true;
		hideMe = false;		
	}else{
		matched = false;
		hideMe = true;
}}//end


function showError(){
	$('#errorCountrySearch').show();
}//end

function myAccordion(obj){ 
	$(obj).next('div').slideToggle('medium', function(){
		$('#body-container, .right-rail-liquid').eqHeight();
	});
	$(obj).toggleClass('openAcc');
	if( $(obj).find('span').html() === '+' ){
		$(obj).find('span').html('&ndash;');
	}else{
		$(obj).find('span').html('+');
	}
}//end

$(function(){	
	$.expr[":"].econtains = function(obj, index, meta, stack){
		return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
	}
	
	$.expr[':'].Contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};
});

function emailConfirmation(){
	if(!$('#emailSuccessMessage').length) {
		var confirmDiag = $('<div class="modalContainer modal-overlay availability-con" id="emailSuccessMessage"><br /><button type="button" class="simplemodal-close frmBtn"><span title="Close">Close</span></button></div>');
		confirmDiag.prepend('<img src="/cmsimages/logo-fp_tcm12-450.jpg" alt="Fairpoint" title="Fairpoint" /><br /><br /><p>Thank you for contacting FairPoint Communications about potential support of your event or organization. We acknowledge your submission and will respond as promptly as possible.</p><p>If you have updates or additional information to accompany your on-line request, you may write <a href="mailto:communityengagement@fairpoint.com" title="communityengagement@fairpoint.com">communityengagement@fairpoint.com</a>.</p><p>Sincerely Yours,</p><p>Community Engagement<br />FairPoint Communications</p>')
					.find('button.simplemodal-close').click(function(){
						try{parent.$.modal.close();}catch(err){}
					}).end()
					.appendTo($(document.body)).modal();
		} else {
			$('#emailSuccessMessage').modal();
		}
}

/* Script for My FairPoint Page starts here */
$(function(){
	if($('.myfp').length)	$('.briefHeight').height(142);
	var aElem = $('.paybill-box p>a:only-child'),
		innerTxt = (aElem.length)? aElem.text() : '';

		if(aElem && innerTxt) {
			$('.paybill-box p>a:only-child').html('<span>'+innerTxt+'</span>').addClass('new-btn');
			$('.paybill-box p>a:only-child').html('<span>'+innerTxt+'</span>').addClass('new-btn').after('<br class="clear" />');
		}

	$('#myaccount-help').bind('click', function(){
		$(this).parent().next().toggleClass('hidden');
		return false;
	});
	
	$('#MyAccount').validate({
		rules: {
			u: {
				required: true,
				email: true
			},
			p: {
				required: true
			}
		},
		messages: {
			u: {
				required: 'Email is required.',
				email: 'Invalid Email format.'
			},
			p: {
				required: 'Password is required.'
			}
		},
		submitHandler: function(form){
			form.submit();
		}
	});
});
/* Script for My FairPoint Page ends here */

function spamCheck(form, fields) {
	var isSpam 	= false,
		$form	= $(form);
		
	for (var field in fields) {
		var f1	= $form.find('[name="'+field+'"]'),
			f2	= $form.find('[name="'+fields[field]+'"]');
		if((f1.val() != '' && f1.val() != '') && (f1.val().toLowerCase() === f2.val().toLowerCase())) {
			return false;
		}
	}
	return !isSpam;
}