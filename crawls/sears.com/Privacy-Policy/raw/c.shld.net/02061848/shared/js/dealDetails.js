/*********************************************************************************
 * File Name		: dealDetails.js
 * @author			: Infosys
 * Description		: This provides methods for BMGM/BMSM deal functionalities block
 *********************************************************************************/

/********************************************************************************
Global variables for storing model and trim values. 
 *********************************************************************************/
var isSYWRMember = false,
isSYWMaxMember = false;
var page;

/*********************************************************************************
 * Onload executing block
 * @author			: Infosys
 * Description		: If user loads any browse or checkout pages, this block must be 
				executed. This block will help execute deal related functionalities
 ***********************************************************************************/
$(document).ready( function () {
	page = $('body').attr('id');
	//Added to avoid the subnav changes in order comfirmation page
	if(page == "thankyou"){
		$('li.myRewards').addClass("nonActive"); 
	}
	if (typeof BMGMEnabled !== 'undefined' && BMGMEnabled === 'ON' && page !== "thankyou") {

		//getDealDetails(<PageType>) should be called always and inside this function check for existence of cookie and other logic..
		getDealDetails(page);
	}
});	

/*********************************************************************************
 * Method Name		: getUserLoginStatus
 * @author			: Infosys
 * @param			: none
 * Description		: This function returns the user status
 ***********************************************************************************/
function getUserLoginStatus(){
	isSYWRMember = false;
	isSYWMaxMember =  false;

	var chkLoginCookie= $.cookie('s_r');

	if(chkLoginCookie==null || chkLoginCookie=='s_r'){
		//Guest User
		return false;  
	}
	else{
		var personalCookie = eval('(' + $.cookie('SVPersonalizationCookie') + ')');
		if(personalCookie != null){
			if(personalCookie.svMembershipStatus.toLowerCase() === "true"){
				//SYWMax User
				isSYWMaxMember = true;
			}       

			if (personalCookie.sywrMember.toLowerCase() === "true"){
				//SYWR User
				isSYWRMember = true;
			}
		}
		// Logged-In User
		return true;
	}
}

/*********************************************************************************
 * Method Name		: animateProgressBar
 * @author			: Infosys
 * @param			: endAmt
 * Description		: this function is used to give animated effect to the progress bar
 ***********************************************************************************/
function animateProgressBar(endAmt) {
	$this = $('#progressBar');
	count = 0;
	completedRewards = endAmt;

	$this.find(".progressBar-value").animate({width: completedRewards+"%"}, 800, function() {
		if(completedRewards === 100){
			$('#rewardsTitle').text("Congratulations!");
			$('#rewardsMessage').text("You have reached your Reward");
			$('#rwdsAmount').text("Complete!").addClass("complete");
		}
	});
}

/*********************************************************************************
 * Method Name		: paintProgressBar
 * @author			: Infosys
 * @param			: currentDeal
 * Description		: This function is used to paint the div structure for current item
					deal status bar
 ***********************************************************************************/
function paintProgressBar(currentDeal){
	var dealBalance=0,endAmt=100,promoName = '',thresholdType,thresholdVal;
	var tierObj=currentDeal.tiers;
	var promoId = currentDeal.pId;
	var promoType = currentDeal.pTyp;
	var iTotal = Number(currentDeal.iTot);
	var loginStatus = getUserLoginStatus();

	if(promoType != 'FREESHIP'){
		var dealsize = 0;
		if(typeof tierObj != 'undefined'){
			dealsize = tierObj.length;
		}
		for(var i=0;i<dealsize;i++){
			if(currentDeal.pSta === 'C' && tierObj[i].sta === 'C'){
				promoName = $("div#subnavDD_myRewards div#"+promoId).find('h3#tierName_'+getThresholdId(Number(tierObj[i].tVal)+1)).html();
				dealBalance = 0;
				endAmt = 100;
			}
			if(tierObj[i].sta === 'IP'){
				promoName= $("div#subnavDD_myRewards div#"+promoId).find('h3#tierName_'+getThresholdId(Number(tierObj[i].tVal)+1)).html();
				dealBalance=tierObj[i].tBal;
				thresholdVal = Number(tierObj[i].tVal) + 1;
				endAmt = (iTotal/thresholdVal)* 100;
				break;
			}
		}
	} else{
		promoName = 'FREE Shipping on this order';
		if(loginStatus && isSYWMaxMember){
			dealBalance = 0;
			endAmt = 100;
		} else if(currentDeal.pSta !== 'C'){
			dealBalance = currentDeal.tBal;
			thresholdVal = Number(currentDeal.tVal);
			endAmt = (iTotal/thresholdVal)* 100;
		}
	}

	if(endAmt >= 100){
		endAmt = 100;
	}else{
		endAmt = Math.floor(endAmt);
	}

	thresholdType = $("div#subnavDD_myRewards div#"+promoId).find('span.rwdsAmt').attr('info');
	
	if(typeof thresholdType !== 'undefined'){
		if(thresholdType === 'Quantity'){
			dealBalance = dealBalance + " item(s) Away";
		}else if(thresholdType === 'Price'){
			dealBalance = "$" + dealBalance + " Away";
		}
	}
	
	var progressBarDiv='<div class="rewardsOfferContent"><div class="rwdsLeftNonHeader">'+
	'<span class="rewardsCongrats" id="rewardsTitle">Getting Closer</span>'+
	'<h2 id="rewardsMessage">You\'re on your way to</h2></div>'+
	'<div class="rwdsRightNonHeader"><h3>'+promoName+'</h3>'+
	'<div id="progressBar" class="progressBar-wrap"><div class="progressBar">'+
	'<div class="progressBar-value blue" style="width: 0%;"></div></div></div>'+
	'<span class="rwdsAmt" id="rwdsAmount">' + dealBalance + '</span></div></div>';
	$('div#rewardsOfferWrap_ATC').html('').html(progressBarDiv);
	$('div#rewardsOfferWrap_ATC').show();
	animateProgressBar(endAmt);
}

/*********************************************************************************
 * Method Name		: encodeUserDealsJSON
 * @author			: Infosys
 * @param			: userDealsJSON
 * Description		: This function is used to encode the User deals JSON
 ***********************************************************************************/
function encodeUserDealsJSON(userDealsJSON){
	var encodedStr = '',encodedBMGM = '',encodedBMSM = '',encodedFS = '',encodedTemp = '';

	if(userDealsJSON.success == true || userDealsJSON.success == 'true'){
		encodedStr += '1';
	}else{
		encodedStr += '0';
	}

	var dealsList = userDealsJSON.usrLst;
	for(var key in dealsList){
		if(key === 'ci'){
			continue;
		}
		encodedTemp = '';
		for(var i=0;i<dealsList[key].length;i++){
			
			encodedTemp += dealsList[key][i].pId + ":";
			encodedTemp += dealsList[key][i].iTot + ":";
			if(typeof dealsList[key][i].isDef != 'undefined'){
				if(dealsList[key][i].isDef == true || dealsList[key][i].isDef == 'true'){
					encodedTemp += "1:";
				} else{
					encodedTemp += "0:";
				}
			}
			
			encodedTemp += dealsList[key][i].pSta;
			
			if(key === 'fs'){
				encodedTemp += ":" + dealsList[key][i].tBal;
				encodedTemp += ":" + dealsList[key][i].tVal;
			}
			else{
				encodedTemp += "~";
				var tierDet = dealsList[key][i].tiers;
				for(var j=0;j<tierDet.length;j++){
					encodedTemp += tierDet[j].sta + ':';
					encodedTemp += (Number(tierDet[j].tVal)+1) + ':';
					encodedTemp += tierDet[j].tBal;
					if(j < (tierDet.length - 1)){
						encodedTemp += "*";
					}
				}
			}
		
			if(i < (dealsList[key].length - 1)){
				encodedTemp += "^";
			}
		}

		if(key === 'bmgm'){
			encodedBMGM = encodedTemp;
		} else if(key === 'bmsm'){
			encodedBMSM = encodedTemp;
		} else if(key === 'fs'){
			encodedFS = encodedTemp;
		}
	}
	encodedStr += "|" + encodedBMGM + "|" + encodedBMSM + "|" + encodedFS;
	return encodedStr;
}

/*********************************************************************************
 * Method Name		: getDealDetails
 * @author			: Infosys
 * @param			: pageType
 * Description		: This function will decide ajax to be called  based on pageType
 ***********************************************************************************/
function getDealDetails(pageType){
	var page = pageType;
	if(pageType === 'productOptions'){
		orderItemId=$('#currentOrderItemId').val();
		getAllDealDetails('PO',orderItemId);
	} else if(pageType === 'shoppingcart'){
		$.cookie('userDealDetails',null,{expires:-1, path: '/' });
		getHeaderDealDetails();
	} else {
		getHeaderDealDetails();
	}
}
/*********************************************************************************
 * Method Name		: getAllDealDetails
 * @author			: Infosys
 * @param			: orderItemId
 * Description		: This function is called on load of the page type is productoptions or shopping cart and 
 * 					  also called explicitly from ATC layer flow from consistentcartmodal.js.
 ***********************************************************************************/
function getAllDealDetails(pageType,orderItemId){
	getAllDealDetailsAjax(pageType,orderItemId);
}

/*********************************************************************************
 * Method Name		: setCookieTime
 * @author			: Infosys
 * @param			: none
 * Description		: set the cookie expiry
 ***********************************************************************************/
function setCookieTime(){
	var date = new Date();
	var minutes = 60;
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	return date;
}
/*********************************************************************************
 * Method Name		: trackOnClickBMGMDealsForOmniture
 * @author			: Infosys
 * @param			: dealDetails,pageType,promotionType
 * Description		: tracking ATC click event for omniture.
 ***********************************************************************************/
function trackOnClickBMGMDealsForOmniture(pageType,dealDetails,promotionType){
	var responseObj = eval(dealDetails);
	var promoType = '';
	var tierName = '';

	if(pageType === 'ATC'){
		promoType=responseObj.pTyp;
	}else if(promotionType != null){
		promoType = promotionType;
	}

	var s=s_gi(omAcct);
	s.linkTrackVars='prop12,eVar16,eVar40';
	s.eVar16=pageType+':'+pageType+':Online:'+page+':WCS:'+promoType;
	s.prop12=s.eVar16;
	s.eVar40=promoType;
	s.tl(true,'o',s.prop12);
}

/*********************************************************************************
 * Method Name		: trackOnClickBMGMDealsForOmniture
 * @author			: Infosys
 * @param			: dealDetails
 * Description		: tracking PO click event for omniture.
 ***********************************************************************************/
function sendCurrItemPromoEventToOmnitureForBMGM(dealDetails){

	var promoType=dealDetails.usrLst.ci.pTyp;
	var tierName='';
	if(typeof dealDetails.usrLst.ci.tiers !='undefined'){ 
		for(var i=0;i<dealDetails.usrLst.ci.tiers.length;i++){
			if(dealDetails.usrLst.ci.tiers[i].sta==='IP'){
				tierName=dealDetails.usrLst.ci.tiers[i].tSeq;
			}
		}
	}
	var s=s_gi(omAcct);
	s.linkTrackVars='prop12,prop10,channel,prop1,prop2,prop3,prop27,prop28,eVar16,eVar40';
	s.prop12=tierName;
	s.eVar16='1:1:Online:PO:WCS:'+promoType;
	s.eVar40=promoType;
	s.tl(true,'o',tierName);

}

/*********************************************************************************
 * Method Name		: trackOnLoadBMGMDealsForOmniture
 * @author			: Infosys
 * @param			: none
 * Description		: tracking on load event for Omniture
 ***********************************************************************************/
function trackOnLoadBMGMDealsForOmniture(){
	var s = s_gi(omAcct);
	s.linkTrackVars='prop15';
	s.prop15="GlobalHeader::"+defaultDealType+":"+page+":WCS";
	s.t();

}

/*********************************************************************************
 * Method Name		: getAllDealDetailsAjax
 * @author			: Infosys
 * @param			: orderItemId
 * Description		: This function to rerive the deal details and paint the same in ATC/PO progress bar.
 ***********************************************************************************/
function getAllDealDetailsAjax(pageType,orderItemId){
	$.cookie('userDealDetails',null,{expires:-1,path: '/'});
	var fetchCommand = (window.location.protocol === 'https:' ? '/shc/s/FetchBMGMDealsSecured' : '/shc/s/FetchBMGMDeals');
	var dynamicDealsJSON=$.ajax({
		url:fetchCommand+'?storeId='+storeId+'&catalogId='+catalogId+'&fromPage='+pageType+'&orderItemId='+orderItemId,
		type:'GET',
		dataType: 'json',
		success:function(result){
			$.cookie('userDealDetails',encodeUserDealsJSON(result),{expires:setCookieTime(),path: '/' });
			if(typeof result.usrLst != 'undefined' && typeof result.usrLst.ci != 'undefined'){
				paintProgressBar(result.usrLst.ci);
				if(pageType == 'PO'){
					sendCurrItemPromoEventToOmnitureForBMGM(result);
				} else if(pageType == 'ATC'){
					trackOnClickBMGMDealsForOmniture(pageType,result.usrLst.ci,null);
				}
			}
			paintHeaderDeals();
		}
	});
}

/*********************************************************************************
 * Method Name		: getHeaderDealDetails
 * @author			: Infosys
 * @param			: pageType
 * Description		: This function will be called in all other flows when cookie is not present.
 ***********************************************************************************/
function getHeaderDealDetails(){
	if($.cookie('userDealDetails') === null){
		getHeaderDealDetailsAjax();
	}else{
		paintHeaderDeals();
		trackOnLoadBMGMDealsForOmniture();
	}
}

/*********************************************************************************
 * Method Name		: getHeaderDealDetailsAjax
 * @author			: Infosys
 * @param			: pageType
 * Description		: This function will be called in all other flows when cookie is not present.
 ***********************************************************************************/
function getHeaderDealDetailsAjax(){
	var fetchCommand = (window.location.protocol === 'https:' ? '/shc/s/FetchBMGMDealsSecured' : '/shc/s/FetchBMGMDeals');
	var dynamicDealsJSON=$.ajax({
		url:fetchCommand+'?storeId='+storeId+'&catalogId='+catalogId+'&fromPage=HEADER',
		type:'GET',
		dataType: 'json',

		success:function(result){
			$.cookie('userDealDetails',encodeUserDealsJSON(result),{expires:setCookieTime(),path: '/'});
			paintHeaderDeals();

			trackOnLoadBMGMDealsForOmniture();
		}
	});
}

/*********************************************************************************
 * Method Name		: paintHeaderDeals
 * @author			: Infosys
 * @param			: DealsJSON
 * Description		: this function is used to paint the subnav dropdown div structure
 ***********************************************************************************/
function paintHeaderDeals(){

	$("div#subnavDD_myRewards div.progressBar-wrap,div#subnavDD_myRewards span.rwdsAmt,div#subnavDD_myRewards div.rewardsOfferContent h4.rewardComplete,div#subnavDD_myRewards div.rewardsOfferContent h4.nextReward").attr('style','display:none');
	$("div#subnavDD_myRewards div.bmsmInfo").attr('style','display:block');
	var dealDetails = $.cookie("userDealDetails");
	var mainDeals = dealDetails.split('|');
	var loginStatus = getUserLoginStatus();
	var promoId,statusBarWidth,amountSpent,thresholdValue,thresholdBalance,dealStatus, balText='';
	var isDefault;
	var indiDealList, tierDealSep, dealDetails, tierList, tierName;

	// updating the subnav if no deal items are added to cart i.e. success=false
	if(typeof mainDeals[0] !== 'undefined' && mainDeals[0] === '0'){
		$('div#navigation li.myRewardsBar').hide();
		$('li.myRewards a#subnav_myRewards').html('').html(defaultDealDesc);
	}else{
		$('li.myRewards').removeClass('nonActive'); //added to remove nonActive class in case of only BMSM deal active and the eligible item is added to cart. ****BMSM will not have default message
	}

	for(var i=1;i<mainDeals.length;i++) {
		//(re)initializing the values
		statusBarWidth = 0;
		subnavstatusBarWidth=0;
		promoId = 0;
		amountSpent = 0.0;
		thresholdValue = 0.0;
		thresholdBalance = 0;
		isDefault = false;

		// if the deal is not BMGM(i=1) OR (if the deal is BMGM and user is a SYWR user) only then show the status bar.
		if(mainDeals[i] !== '' && (i!== 1 || (i==1 && loginStatus && isSYWRMember))){
			indiDealList = mainDeals[i].split('^');

			for(var j=0;j<indiDealList.length;j++){

				tierDealSep = indiDealList[j].split('~');	
				dealDetails = tierDealSep[0].split(':');

				dealStatus = dealDetails[3];
				amountSpent = Number(dealDetails[1]);
				promoId = dealDetails[0];
				balText = '';

				subnavDealDiv = $("div#subnavDD_myRewards div#"+promoId);
				if(subnavDealDiv.size()) {
					subnavDealDiv = subnavDealDiv[0];
				}

				if(typeof dealDetails[2] != 'undefined' && dealDetails[2] == '1'){
					isDefault = true;
				}else{
					
					isDefault = false;
				}

				if(typeof tierDealSep[1] === 'undefined'){
					thresholdBalance = dealDetails[4];
					thresholdValue = Number(dealDetails[5]);
					if(typeof isKiosk !== 'undefined' && isKiosk == 'true'){
						continue;
					} if((loginStatus === true && isSYWMaxMember === true) || (dealStatus === 'C')){
						statusBarWidth = 100;
					}
				} else{
					tierList = tierDealSep[1].split('*');

					if(dealStatus === 'C'){
						statusBarWidth = 100;
					}

					// if there are dynamic tier Details available, hide the default tier Name.
					if(tierList.length > 0){
						$(subnavDealDiv).find('div.rewardsOfferContent').find('h3').hide();
					}
					// manipulating the tier details
					for(var t=0; t<tierList.length;t++){
						tierDetails = tierList[t].split(':');
						statusBarWidth=0;
						if(tierDetails[0] === 'C'){
							if(dealStatus !== 'C'){
								$(subnavDealDiv).find('div.rewardsOfferContent').find('h4.rewardComplete').hide();
								if(isDefault){
									subnavstatusBarWidth=100;
								}
							}
							thresholdValue = tierDetails[1];
							$(subnavDealDiv).find('div.rewardsOfferContent').find('h4#rewardComplete_'+getThresholdId(thresholdValue)+'').show();
						}else if(tierDetails[0] === 'IP'){
							thresholdValue = tierDetails[1];
							thresholdBalance = tierDetails[2];
							$(subnavDealDiv).find('div.rewardsOfferContent').find('h3').hide();
						}else if(tierDetails[0] === 'N'){
							$(subnavDealDiv).find('div.rewardsOfferContent').find('h4#nextReward_'+getThresholdId(tierDetails[1])+'').show();
						}
					}
					$(subnavDealDiv).find('div.rewardsOfferContent').find('h3#tierName_'+getThresholdId(thresholdValue)+'').show();
					thresholdValue = Number(thresholdValue);
				}

				// calculating the width % for status bar
				if(thresholdValue != -1){
					if(statusBarWidth == 0 ){
						statusBarWidth = (amountSpent/thresholdValue)*100;
					} if(statusBarWidth > 100){
						statusBarWidth = 100;
					}
				}else{
					statusBarWidth=100;
				}
				statusBarWidth = Math.floor(statusBarWidth);

				//if the deal is default, then display the progress bar in subnav
				if(isDefault){
					$('div#navigation li.myRewards').find("a#subnav_myRewards").html('').html('Rewards');
					if(subnavstatusBarWidth==100){
						$('div#navigation li.myRewardsBar').find("div.progressBar-wrap div.progressBar-value").attr('style','width:'+subnavstatusBarWidth+'%');
					}else{
						$('div#navigation li.myRewardsBar').find("div.progressBar-wrap div.progressBar-value").attr('style','width:'+statusBarWidth+'%');
					}
					$('div#navigation li.myRewardsBar').show();
					if(i === 1){
						defaultDealType = 'BMGM';
					} else if(i === 2){
						defaultDealType = 'BMSM';
					} else if(i === 3){
						defaultDealType = 'FREESHIP';
					}
				}

				//Display the progress bar
				$(subnavDealDiv).find("div.progressBar-wrap div.progressBar-value").attr('style','width:'+statusBarWidth+'%');
				$(subnavDealDiv).find("div.progressBar-wrap").show();

				//hide the static Message
				$(subnavDealDiv).find('span.rwdsInfo').hide();
				$(subnavDealDiv).find('div.bmsmInfo').hide();

				//Display the balance amount
				if(statusBarWidth == 100){
					$(subnavDealDiv).find('span.rwdsAmt').addClass('completed');
					$(subnavDealDiv).find('span.rwdsAmt').html('Completed!').show();
				}else{
					thresType = $(subnavDealDiv).find('span.rwdsAmt').attr('info');
					if(thresType == 'Quantity'){
						balText = thresholdBalance + ' items away';
					} else if(thresType == 'Price'){
						balText = '$' + thresholdBalance + ' away';
					}

					$(subnavDealDiv).find('span.rwdsAmt').html(balText).show();
				}

				//Show the static messages and eligible items in the long description section
				$(subnavDealDiv).find('p.shortDesc').show();
				$(subnavDealDiv).show();
			}
		}
		
	}
	
	var signLink = '';
	if(!loginStatus){
		signLink = '<span class="signInLink"><a href=\'javascript:fnShowLoginModal("SYWRLOGIN", document.location.href, document.location.href, "signIn","sywrModal","");\'>';
		signLink += 'Sign In</a> or </span>';

		signLink += '<span class="joinNow"><a href=\'javascript:fnShowLoginModal("SYWRLOGIN", document.location.href, document.location.href, "signIn","sywrModal","");\'>';
		signLink += 'Join Now for free</a></span>';
	}else if(loginStatus && !isSYWRMember){
		signLink += '<span class="joinNow"><a href=\'javascript:showSywrModal(document.location.href, "sywrMemberLinking", "sywrModal", "");\'>';
		signLink += 'Join Now for free</a></span>';
	}
	$('div#subnavDD_myRewards div.signIn').html('').html(signLink);
}
/*********************************************************************************
 * Method Name		: getThresholdId
 * @author			: Infosys
 * @param			: thresholdValue
 * Description		: this function is used to create threshold value id.
 ***********************************************************************************/


function getThresholdId(thresholdValue){
	
	subthresholdValue= thresholdValue.toString().split(".");
	decimal= Number(subthresholdValue[0]);
	fraction= Number(subthresholdValue[1]);
	if(isNaN(fraction)){
		return decimal;
	}else{
		return decimal +'\\.'+ fraction;
	}
}


/* learnmore start */

/*********************************************************************************
 * Method Name		: learnMore
 * @author			: Infosys
 * @param			: catentryId, promoId
 * Description		: this function is used to show the learn more popup on click 
				of BMSM/BMGM indicators
 ***********************************************************************************/
function learnMore(_this,pid) {

	var currentDeal=$(_this).parent().attr('class');
	var userStatus=getUserLoginStatus();
	var promoType = '';

	if(currentDeal=='getMore'){
		promoType = 'BMGM';
		if(userStatus && isSYWRMember){
			getLayer(_this,pid);
		}else{
			getModal(pid);
		}
	}
	if(currentDeal=='saveMore'){
		promoType = 'BMSM';
		getLayer(_this,pid);
	}

	//omniture changes
	trackOnClickBMGMDealsForOmniture('LearnMore', null, promoType);
}

/*********************************************************************************
 * Method Name		: getLayer
 * @author			: Infosys
 * @param			: divObject, promoId
 * Description		: this function creates the div structure for a learn More layer
 ***********************************************************************************/
function getLayer(_this,pId){

	var layerDiv='<div id="bmsmLayer" class="shcLayer" style="top: 735px; left: 181px; display: block;">'+
	'<span class="shclTip"><span></span></span>'+
	"<span class=\"shclClose\">close<span>x</span></span></div>";
	$('body').find('div#bmsmLayer').remove();
	$('body').append(layerDiv);
	var pidArray = pId.split("|");
	for(var i=0; i<pidArray.length; i++){
		var bmsmDiv=$('body').find("div#"+pidArray[i]+" div.learnMoreDiv");
		if(bmsmDiv.html() !== null){
			$('div.shcLayer').append('<div class="myRewardsContent">'+bmsmDiv.html()+'</div>');
		}
	}
	var $thispos = $(_this).offset();
	bmsmLayer = $("#bmsmLayer");
	bmsmLayer.css({
		top: $thispos.top +10,
		left: $thispos.left - 25
	}).show();
	$("#bmsmLayer .shclClose").unbind('click').click(function(){
		$("#bmsmLayer").hide();
	});
}

/*********************************************************************************
 * Method Name		: getModal
 * @author			: Infosys
 * @param			: promoId
 * Description		: this function creates the div structure for a learn More modal
 ***********************************************************************************/
function getModal(pId){
	var userStatus=getUserLoginStatus();
	var usertype ='';
	var joinDiv;
	var bmgmDiv=$('body').find('div#'+pId+" div.learnMoreDiv");

	if(bmgmDiv.html() !== null){
		if(!userStatus){
			joinDiv='<a class="shcBtn shcOrangeBtn joinNow" href="javascript:fnShowLoginModal(\'SYWRLOGIN\',location.href,location.href,\'signIn\',\'sywrModal\')">Join Now for Free</a>'+
			'<a class="shcBtn" href="javascript:;">Cancel</a>';
		}else if(userStatus && !isSYWRMember){
			joinDiv='<a class="shcBtn shcOrangeBtn joinNow" href="javascript:showSywrModal(location.href,\'sywrMemberLinking\',\'sywrModal\',\'\')">Join Now for Free</a>'+
			'<a class="shcBtn" href="javascript:;">Cancel</a>';
		}
		var modalDiv='<div class="shcModal" id="shcModal" ><div id="shcModal-stuff" class="shcModal-wrapper"><div id="bmgm_learn_close">'+
		'<span id="shcModal-closer">CLOSE</span></div><div class="sywrLoGo"></div></div></div>';
		$('body').find('div#shcModal').remove();
		$('body').append(modalDiv);


		$('#shcModal-stuff').append('<div class="myRewardsContent">'+bmgmDiv.html()+'</div>');
		$('#shcModal-stuff').find('div.myRewardsContent').append(joinDiv);

		$('#shcModal').shcModal({
			curtain: 'curtain', curtainOpacity: 0.5, modalClose: 'bmgm_learn_close'
		}).shcCenter();
		
		$('#shcModal .shcBtn').unbind('click').click(function(){
			$('div#bmgm_learn_close').click();
		});
	}
}
/* learnmore end */
