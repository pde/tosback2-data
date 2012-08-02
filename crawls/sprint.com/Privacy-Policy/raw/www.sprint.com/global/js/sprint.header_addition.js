// sprint.header_addition.js Author: Site development Team

//Global settings:

var optInURL='http://shop.sprint.com/mysprint/shop/phone_wall.jsp?INTNAV=ATG:HE:Phones';
var optOutURL='http://shop2.sprint.com/en/shop/';


jQuery(document).ready(function($) {

	var serverList = [];
		//serverList.push("rtb2-shop.test.sprint.com");
		serverList.push("shop.sprint.com");
		serverList.push("shop2.sprint.com");
		serverList.push("pvmk7680.corp.sprint.com");
		
	/* Bind Feedback and Report a Problem for Nav and Modals */
	$('#feedback').bind('click', function(event){ event.stopPropagation();});
 	//$('#report-problem').bind('click', function(event){ event.stopPropagation();openReport(); });
	$('#mFeedback').bind('click', function(event){ openSurvey(); });
	$('#mReport-problem').bind('click', function(event){ openReport(); });
	
	//$('#leave-store').bind('click', function(event){ doOptOut(); });
	//$('#try-store').bind('click', function(event){ doOptIn(); });
	
	$('#opt-out').bind('click', function(event){ doOptOutOmni(); });
	$('#opt-in').bind('click', function(event){ doOptInOmni(); });
	
	
	$('#close-modal').bind('click', function(event){ Sprint.modal.elem.closeModal(); });
	$('#close-modal-b').bind('click', function(event){ Sprint.modal.elem.closeModal(); });
	
	
	//Added temparary to remove class
	$('#feedback').removeClass('optinModalTrigger');
 	//$('#report-problem').removeClass('optinModalTrigger');
	//$('#report-problem').addClass('video');
	
	
	$('#feedback').attr('href','#');
	//$('#report-problem').attr('href','#');
  	$('#feedback').attr('href','http://shop2.sprint.com/assets/olsvideo/mediaPlayer.html?&selectedDeviceId=NEWSTORE1234&VideoID=0');
	
	/*  opt in/out code hide/shows based on the EXP_COOKIE  */
	if(document.cookie.indexOf("EXP_COOKIE=2.0")!=-1) {
		$('#opt-in').css('cssText', 'display: none !important');
		//$('#whatsnew').hide();
		//$('#whatsnew').css('cssText', 'display: none !important');
		$('#opt-out').attr("href","/global/snippets/abt/optout.html");
		
		for(var i=0;i<serverList.length;i++){
			//Following condition to show the feedback, report a problem only on the shop domain
			if (location.hostname.toLowerCase()==serverList[i]){
				$('#opt-out').css('cssText', 'display: inline !important');
				$('#feedback').css('cssText', 'display: inline !important');
				//$('#report-problem').css('cssText', 'display: inline !important');
			}
		}
	} else {
			if ((location.hostname.toLowerCase()==serverList[i]) && (location.hostname.toLowerCase()!='manage.sprintpcs.com')){
				$('#opt-out').css('cssText', 'display: none !important');
				$('#opt-in').css('cssText', 'display: inline !important');
				$('#opt-in').attr("href","/global/snippets/abt/optin.html");
			}
	}
	$('.addNewPhone, .optinModalTrigger, a[href=/global/snippets/abt/optin.html]').bind('click', function(event) {
		event.preventDefault();
		var anyModal = $('<div id="anyDisclaimerModal" style="font-size:10pt !important"></div>');
		if (!anyModal.length > 0) $('body').append(anyModal);
		var path = $(this).attr('href');
		anyModal.openModal({
			width: 590,
			height: 1000,
			ajaxContent: true,
			ajaxPath: path,
			openCallback: function() {
				$(".modalChromeCloseButton img").attr("src","http://www.sprint.com/global/images/template/widgets/modal/ico_close.png");
				$("#btnLegalDisclaimerClose").bind('click', function(event) {
					anyModal.closeModal();
					event.preventDefault();
				});
			}
		});
	});
//}
});

//Opt in function call, which sets the EXP_COOKIE=2.0 i.e 2.0 shop
function doOptIn(){
	var dte=new Date(2011,5,1,0,0);
	document.cookie='EXP_COOKIE=2.0; domain=.sprint.com; path=/; expires='+dte.toGMTString()+';';
	location.replace(optInURL);
}	

//Opt out function call, which sets the EXP_COOKIE=1.0 i.e 1.0 shop
function doOptOut(){
	document.cookie='EXP_COOKIE=1.0; domain=.sprint.com; path=/;';
	location.replace(optOutURL);
}

//Omniture function calls, to open feed back survey
function openSurvey(){
	try{ Analytics._numeric_.omni.trackBetaSurveys('RelC_CSATLink');
	}catch(e){}
}

//Omniture function calls, to open report a problem survey
function openReport(){
	try{ Analytics._numeric_.omni.trackBetaSurveys('RelC_Problem');
	}catch(e){}
}

function doOptInOmni(){
	try{Analytics._numeric_.omni.trackOptInOutModal('optin');
	}catch(e){}
}

function doOptOutOmni(){
	try{Analytics._numeric_.omni.trackOptInOutModal('optout');
	}catch(e){}
}

function openStoreVideos(){
	try{Analytics.eComATG.screenChangeHelperFunction('Using new store');
	}catch(e){}
}

function doiPhoneOmni(){
  try{Analytics.eComATG.screenChangeHelperFunction('Apple Marketing Modal');
	}catch(e){}
}

//Added for the video modal.

jQuery(document).ready(function($) {
	/* START - Loading third party url in iframe modal */
	//$(".video").bind("click", function(event){ doiPhoneOmni(); });
	if ($("#video, .video").length){
		$("#video, .video").unbind("click").bind("click", function(event) {
			event.preventDefault();
			var terms = $(this);
			var videoModal = $("#videoModal");
			if (videoModal.length < 1) {
				var newModal = $("<div class=\"modal\"></div>").appendTo("div.sprint div.body").hide();
				videoModal = $("<div id=\"videoModal\"></div>").appendTo(newModal);
			}
			//openStoreVideos();
			doiPhoneOmni();
			videoModal.openModal({
				width:942,
				openCallback: function(){	
					videoModal.html('<iframe id="modalIframe"  src="'+terms.attr("href")+'" frameborder="0" scrolling="no" width="942" height="430"></iframe>');
					Sprint.modal.elem.sizeModal();	
				/*	videoModal.html("<div id=\"modalSpinner\">"+Sprint.fn.getContentString("modal.loadingText")+"</div><iframe id=\"modalIframe\" style=\"display:none;\" src=\""+terms.attr("href")+"\" frameborder=\"0\" scrolling=\"no\" width=\"942\" height=\"430\"></iframe>");
					$('#modalIframe').load(function() {
						$("#modalSpinner").hide();
						$(this).show();
						Sprint.modal.elem.sizeModal();						
					});*/
				}
			});
		});
	}
	/* END - Loading third party url in iframe modal */ 
});


