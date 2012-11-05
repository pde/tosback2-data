// Global var hold value to help decide that the TAF pop-up is already open.
var popUpOpened = 0;

function tellafriend(model_nbr, sku) {
		// if only the pop-up isn't open.
		if (popUpOpened != 1)
		{
			closeTellafriend();
			
			// hide select tag on ie6 because they will appear above zoom layer
			//if ($.browser.msie && $.browser.version < 7) $("select").hide();
			
			var documentWidth = $(document).width();
			var documentHeight = $(document).height();
			$("body").prepend('<div id="overlayBG" ></div>');
			$("#overlayBG").css({opacity: 0.6, left:0, position: "absolute", "z-index": 998, width: documentWidth, height: documentHeight,"background-color": "black" });
			var tellafriend_box = '<div id="tellafriend_box"><div id="tellafriend_content"></div><div id="tellafriend_close"><a href="javascript:closeTellafriend()">x close</a></div></div>';
			$("body").prepend(tellafriend_box);
			var linkImg = $("#tellafriend_link img");
			var linkImgOffset = linkImg.offset();
			var offsetTop = linkImgOffset.top - 160;
			var offsetTop = getViewpointTop() + ((getViewpointHeight() - 495) / 2);	
			var bodyWidth = $("body").width();
			var leftOffset = (bodyWidth - 650) / 2;
			$("#tellafriend_box").css({ width: linkImg.width(), height: linkImg.height(), left: linkImgOffset.left, top: offsetTop});
			$("#tellafriend_content").addClass("loading");
			var selectedSku = $("#pdp_selectedSKU").val();
			// alert(postCardURL);
			$("#tellafriend_box").animate({height: 485, width: 650, left: leftOffset}
				, 	"slow"
				,	function () {
					$("#tellafriend_content").load(
						postCardURL,				//#AKAMAIZED_ROOT#/shared/tellafriend/
						{model_nbr: model_nbr, sku: selectedSku, microsite: microsite},
						function (responseText, textStatus, XMLHttpRequest) {
							//alert(model_nbr); alert(sku);
							
							$("#tellafriend_content").removeClass("loading");
							if (textStatus != "success") {
								alert("There was a problem while loading the form. Please try back later.");
							}
							else {
								
							}
						}
					)				
				}
			);
		}
		// We get here after the pop-up has been opened the first time.
		if (popUpOpened != 1)
		{	popUpOpened = 1; }
	}
	
	function closeTellafriend() {
		var linkImg = $("#tellafriend_link img");
		var linkImgOffset = linkImg.offset();
		// reset this flag so that the pop-up can be opened again.
		popUpOpened = 0;
		
		$("#postcard").remove();
		$("#tellafriend_sent").remove();
		
		$("#tellafriend_box").animate({height: linkImg.height(), width: linkImg.width(), left: linkImgOffset.left, top: linkImgOffset.top}
			,	function () {
				if ($.browser.msie && $.browser.version < 7) $("select").show();
				$("#overlayBG").remove();
				$("#tellafriend_box").remove();			
			}
		);
	}	
	
	function sendTellafriend() {
		var errMsg = "";
		
		if ($.trim($("#tellafriend_fromName").val()) == "") {
			errMsg = errMsg + "- Please enter Sender's Name.\n";
		}
		if ($.trim($("#tellafriend_fromEmail").val()) == "") {
			errMsg = errMsg + "- Please enter Sender's Email.\n";
		}
		else if (validate_email($("#tellafriend_fromEmail").val()) == false) {
			errMsg = errMsg + "- Sender's Email is not of valid format.\n";
		}
		if ($.trim($("#tellafriend_toName").val()) == ""){
			errMsg = errMsg + "- Please enter Recipient's Name.\n";
		}	
		if ($.trim($("#tellafriend_toEmail").val()) == "") {
			errMsg = errMsg + "- Please enter your Recipient's email.\n";
		}
		else if (validate_email($("#tellafriend_toEmail").val()) == false) {
			errMsg = errMsg + "- Recipient's email is not of valid format.\n";
		}
		if ($.trim($("#tellafriend_msg").val()).length > 1000) {
			errMsg = errMsg + "- You have exceeded the maximum message length of 1000 characters.\n";
		}	
		if (errMsg != "") {
			alert(errMsg);
			return;
		}
		
		var arguments = new Object();
		
		arguments.tellafriend_fromName 	= $("#tellafriend_fromName").val();
		arguments.tellafriend_fromEmail = $("#tellafriend_fromEmail").val();
		arguments.tellafriend_toName 	= $("#tellafriend_toName").val();
		arguments.tellafriend_toEmail 	= $("#tellafriend_toEmail").val();
		arguments.sku 					= $("#sku").val();
		arguments.model_nbr 			= $("#model_nbr").val();
		// arguments.image_path            = $("#imagePath").val();
		arguments.nm_model				= $("#nm_model").val();
		arguments.tellafriend_msg 		= $("#tellafriend_msg").val();
		if (document.getElementById("formfield1234567891") != null)
			{ arguments.formfield1234567891 = $("#formfield1234567891").val(); }
		if (document.getElementById("formfield1234567892") != null)
			{ arguments.formfield1234567892 = $("#formfield1234567892").val();	} 
		if (document.getElementById("formfield1234567893") != null)
			{ arguments.formfield1234567893 = $("#formfield1234567893").val(); }
		if (document.getElementById("formfield1234567894") != null)
			{ arguments.formfield1234567894 = $("#formfield1234567894").val(); }	
		if (document.getElementById("tellafriend_selfCopy") != null)
			{ 
				if (document.getElementById("tellafriend_selfCopy").checked == true)
				{ arguments.tellafriend_selfCopy = true; }	
			}		
		arguments.html = $("#postcard").html();
		
		$("#postcard").hide();
		$("#tellafriend_content").addClass("loading");
		$.post(mailSender   //#root#/tellafriend/tellafriendSender.cfm
			,	arguments
			,	function(data, textStatus) {
					//alert(data);
					var startPosition = data.indexOf('bxbxb') + 5;
					var endPosition   = startPosition + 2;
					//vaidateResponse 11 if true, 00 if false
					var validateResponse = data.substring(startPosition,endPosition);
					$("#tellafriend_content").removeClass("loading");
					if (textStatus == "success" && validateResponse == "11"){
						$("#tellafriend_content").prepend('<div id="tellafriend_sent"><h1>Email Sent!</h1><div>Your friend will receive the email shortly.</div></div>');
						if (doCoreMetrix) {
							cmCreatePageviewTag("Tell A Friend Sent Email", "Tell A Friend: Successful email");
						}
					} else {
						alert("There was problem sending the e-mail. Please try back again later.");
						$("#postcard").show();
					} 
				}
		);
	}
	
	function validate_email(stringValue) {
		var objRegExp  =
		 /(^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$)/i;
		 ///(^[a-z0-9]([a-z0-9_\.]*)@([a-z_\.]*)([.][a-z]{3})$)|(^[a-z]([a-z_\.]*)@([a-z_\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i;
		
		 //check for valid email
		 return objRegExp.test(stringValue);
	}	
