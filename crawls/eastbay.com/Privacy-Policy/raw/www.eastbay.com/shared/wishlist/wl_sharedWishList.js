var popUpOpened = 0;

function sharedWishList(wishlistid, wishlistName) {
	// if only the pop-up isn't open.
	if (popUpOpened != 1)
	{
		closeSharedWishList();
		if (doCoreMetrix)
		{
			cmCreateConversionEventTag('ShareWishList', 1, 'Email Wish List', 0);
		}
		
		var documentWidth = $(document).width();
		var documentHeight = $(document).height();
		$("body").prepend('<div id="overlayBG" ></div>');
		$("#overlayBG").css({opacity: 0.6, left:0, position: "absolute", "z-index": 998, width: documentWidth, height: documentHeight,"background-color": "black" });
		var sharedWishList_box = '<div id="sharedWishList_box"><div id="sharedWishList_content"></div><div id="sharedWishList_close"><a href="javascript:closeSharedWishList()">x close</a></div></div>';
		$("body").prepend(sharedWishList_box);
		var linkImg = $("#sharedWishList_link img");
		var linkImgOffset = linkImg.offset();
		var offsetTop = linkImgOffset.top - 260;
		var bodyWidth = $("body").width();
		var leftOffset = (bodyWidth - 650) / 2;
		$("#sharedWishList_box").css({ width: linkImg.width(), height: linkImg.height(), left: linkImgOffset.left, top: offsetTop});
		$("#sharedWishList_content").addClass("loading");
		$("#sharedWishList_box").animate({height: 530, width: 650, left: leftOffset}
			, 	"slow"
			,	function () {
				// alert('here');
				$("#sharedWishList_content").load(
					wishlistpostCardURL,
					{wishlistid: wishlistid, wishlistName: wishlistName},
					function (responseText, textStatus, XMLHttpRequest) {
						$("#sharedWishList_content").removeClass("loading");
						if (textStatus != "success") {
							alert("There was a problem while loading the form. Please try back later.");
							closeSharedWishList();
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

function closeSharedWishList() {
	var linkImg = $("#sharedWishList_link img");
	var linkImgOffset = linkImg.offset();
	// reset this flag so that the pop-up can be opened again.
	popUpOpened = 0;
	
	$("#postcard").remove();
	$("#sharedWishList_sent").remove();
	
	$("#sharedWishList_box").animate({height: linkImg.height(), width: linkImg.width(), left: linkImgOffset.left, top: linkImgOffset.top}
		,	function () {
			if ($.browser.msie && $.browser.version < 7) $("select").show();
			$("#overlayBG").remove();
			$("#sharedWishList_box").remove();			
		}
	);
}

function sendWishList() {
	var errMsg = "";
	
	/*if ($.trim($("#sharedWishList_fromName").val()) == "") {
		errMsg = errMsg + "- Please enter Sender's Name.\n";
	}
	if ($.trim($("#sharedWishList_fromEmail").val()) == "") {
		errMsg = errMsg + "- Please enter Sender's Email.\n";
	}
	else if (validate_email($("#sharedWishList_fromEmail").val()) == false) {
		errMsg = errMsg + "- Sender's Email is not of valid format.\n";
	}*/
	
	var toName="";
	var toEmail="";
	var blankRecipient = 0;
	for (var i=1; i<=RecipientCount; i++) {
		toName = "#sharedWishList_toName_" + i;
		toEmail = "#sharedWishList_toEmail_" + i;
		
		if ($.trim($(toName).val()) == "" && $.trim($(toEmail).val()) != "") {
			errMsg = errMsg + "- Please enter #" + i + " Recipient's Name.\n";
		}
		else if ($.trim($(toName).val()) != "" && $.trim($(toEmail).val()) == "") {
			errMsg = errMsg + "- Please enter #" + i + " Recipient's Email.\n";
		}
		else if ($.trim($(toName).val()) == "" && $.trim($(toEmail).val()) == "") {
			blankRecipient = blankRecipient + 1;
		}
		else if (validate_email($(toEmail).val()) == false) {
			errMsg = errMsg + "- #" + i + " Recipient's Email is not of valid format.\n";
		}
	}

	if (blankRecipient == RecipientCount) {
		errMsg = errMsg + "- Please enter at least one Recipient's Name and Email.\n";
	}
	
	if (errMsg != "") {
		alert(errMsg);
		return;
	}
	
	var arguments = new Object();
	var recipientNameArray = new Array();
	var recipientEmailArray = new Array();
	
	arguments.dsnname = dsnname;
	
	var totalrecipient = 0;
	for (var j=1; j<=RecipientCount; j++) {
		toName = "#sharedWishList_toName_" + j;
		toEmail = "#sharedWishList_toEmail_" + j;
		if ($.trim($(toName).val()) != "" && $.trim($(toEmail).val()) != "") {
			recipientNameArray[totalrecipient] = $.trim($(toName).val());
			recipientEmailArray[totalrecipient] = $.trim($(toEmail).val());
			totalrecipient = totalrecipient + 1;			
		}
	}
	
	//create dotomiXML
	var dotomiXML = constructWishlistShareXML(recipientEmailArray);
	
	arguments.recipientNames = recipientNameArray.toString();
	arguments.recipientEmails = recipientEmailArray.toString();
	arguments.wishlistid 			= $("#wishlistid").val();
	arguments.wishlistname 			= $("#wishlistName").val();
	arguments.sharedwishlist_msg 		= $("#sharedWishList_msg").val();
	arguments.requestkey = $("#requestKey").val();
	arguments.totalrecipient = totalrecipient;
	
	if ($("#sharedWishList_selfCopy:checked").val() != null) {
		if ($("#sharedWishList_selfCopy:checked").val() == "on") {
			arguments.sharedwishlist_selfCopy = true;
		}
		else {
			arguments.sharedwishlist_selfCopy = false;
		}
	}
	else {
		arguments.sharedwishlist_selfCopy = false;
	}
	if (document.getElementById("formfield1234567891") != null)
		{ arguments.formfield1234567891 = $("#formfield1234567891").val(); }
	if (document.getElementById("formfield1234567892") != null)
		{ arguments.formfield1234567892 = $("#formfield1234567892").val();	}
	if (document.getElementById("formfield1234567893") != null)
		{ arguments.formfield1234567893 = $("#formfield1234567893").val(); }
	if (document.getElementById("formfield1234567894") != null)
		{ arguments.formfield1234567894 = $("#formfield1234567894").val(); }
	
	arguments.html = $("#postcard").html();
	
	$("#postcard").hide();
	$("#sharedWishList_content").addClass("loading");
	$.post(wishlistmailSender
		,	arguments
		,	function(data, textStatus) {
				var startPosition = data.indexOf('aaaa') + 4;
				var endPosition   = startPosition + 2;
				//vaidateResponse 11 if true, 00 if false, 22 is illegal words found
				var validateResponse = data.substring(startPosition,endPosition);
				$("#sharedWishList_content").removeClass("loading");

				if (textStatus != "success") {
					alert("There was problem sending the e-mail. Please try back again later.");
					$("#postcard").show();
				} else {
					if (validateResponse == "11") {
						$("#sharedWishList_content").prepend('<div id="sharedWishList_sent"><h1>Email Sent!</h1><div>Your friend will receive the email shortly.</div><img src="'+ dotomiWishListSharePixel + dotomiXML +'"></div>');
	
						if (doCoreMetrix) {
							cmCreatePageviewTag("Wish List Email Sent", "Wish List: Successful email");
							cmCreateConversionEventTag('ShareWishList', 2, 'Email Wish List', 0);
						}
					} else if (validateResponse == "22") {
						alert("There were illegal word(s) detected in the e-mail. Please try back again later.");
						$("#postcard").show();
					} else {
						alert("There was problem sending the e-mail. Please try back again later.");
						$("#postcard").show();
					}
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

function addmoreRecipients() {
	var moreRecipient = "";
	RecipientCount++;
	if (RecipientCount <= 50) {
		moreRecipient += '<label for="sharedWishList_toName_' + RecipientCount + '" class="sharedWishList_toName">#' + RecipientCount + ' Recipient\'s Name:</label><input type="text" name="sharedWishList_toName_' + RecipientCount + '" id="sharedWishList_toName_' + RecipientCount + '" class="sharedWishList_toName">';
		moreRecipient += '<label for="sharedWishList_toEmail_' + RecipientCount + '" class="sharedWishList_toEmail">#' + RecipientCount + ' Recipient\'s Email:</label><input type="text" name="sharedWishList_toEmail_' + RecipientCount + '" id="sharedWishList_toEmail_' + RecipientCount + '" class="sharedWishList_toEmail">';
		$(moreRecipient).insertBefore("#addmore");
	}
	else {
		alert("You can share your wish list to a maximum of 50 e-mail addresses.");
	}
}

function constructWishlistShareXML(recipientEmailArray) {
	var xmlString = "";
	var xmlString = "<wishlist>";
	for (var i = 0; i < recipientEmailArray.length; i++) {
		xmlString =  xmlString + "<entry><customernumber>"+ dotomiCustNbr + "</customernumber><email>" +  recipientEmailArray[i] + "</email><date>" + dotomiDate + "</date><wishlistid>"+ dotomiWishlistId + "</wishlistid></entry>";	
	}
	xmlString = xmlString + "</wishlist>";
	return xmlString;
}