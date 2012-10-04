jQuery(document).ready(function($) {

		var emailLink = $("#emailHeaderLink");
		var emailDiv = $("#emailPopup");
		var emailCloseBtn = emailDiv.find(".close");
		var emailOverlayTextFields = emailDiv.find("input[type=text]");
		var emailOverlayForm = emailDiv.find("#emailOverlayForm");
		var sendToURL = emailOverlayForm.attr("action");
		var emText1 = $("#emOvTxt1");
		var emText2 = $("#emOvTxt2");
		
		//Adjust the x-position of the email overlay based on the size of the
		//shopping cart list item
		var cartWidth = $("#cartItemCount").width();
		var emOvlAdj = 270 - cartWidth;
		emailDiv.css("left",emOvlAdj+"px");
		$("#emailOverlayAfterSubmit").hide();

		emailLink.click(function(){ emailDiv.fadeIn();	});
		emailCloseBtn.click(function(){ emailDiv.fadeOut();	});

		$("#afterSubmitCloseBtn").click(function(){ emailDiv.fadeOut();	});
		
		
		emailOverlayForm.submit(function(){
			if(emText1.val() === ""){
				alert("Please enter your email address.");
				emText1.focus();
				return false;
			}
			else if(emText2.val() === ""){
				alert("Please confirm your email address.");
				emText2.focus();
				return false;
			}
			else if(emText1.val() !== emText2.val()){
				alert("Email addresses do not match.");
				emText2.focus();
				return false;
			}
			else if(!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(emText1.val())){
				alert("Please enter a valid email address.");
				emText1.val("");
				emText1.focus();
				return false;
			}
			
			/*If email addresses match and are valid,
			grab all data from the form and send*/
			var sendData = emailOverlayForm.serialize();
			
			$.get(sendToURL, sendData, function(){
				$("#emailPopup h4.redHighlight").remove();
				$("p#receiveEmailMsg").hide();
				$("#emailOverlayBeforeSubmit").remove();
				$("#emailOverlay_AfterSubmit").css("cssText","display:block!important;");
				
				//Because IE just...doesn't...get it.
				document.getElementById("emailOverlay_AfterSubmit").style.cssText = "display:block!important;";
			});
			return false;
		});
		
});