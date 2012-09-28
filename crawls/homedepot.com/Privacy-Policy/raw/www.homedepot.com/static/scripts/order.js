/****************************
* Invoked on the gift card
* page to check the balance
****************************/
var CalculateGiftCardTotal = null;
var ExpiryDate = null;
var FillGCInfo = null;
var CheckForGCBalanceError = null;
var AdjustCheckoutUI = null; 
var AdjustGCError = null;
var LoadStaticErrorMsgsFromPage = null;
var CheckForKiosk = null;
var ONLOAD_VAL = 'onLoad';
var CLEAR_ALL = 'ClearAll';
var CLEAR_PIN = 'ClearPIN';
var KEEP_GIFT_CARD = 'KeepGiftCard';
var PLUS_IMG_VAL = '/wcsstore/hdus/en_US/images/layout/btn_+.jpg'
var MINUS_IMG_VAL = '/wcsstore/hdus/en_US/images/layout/btn_-.jpg'
var NETSCAPE_VAL = 'Netscape';  //FireFox
var IE_VAL  = 'Microsoft Internet Explorer';
var OMNITURE_CAPTCHA_ERR_VAL = 'giftcard balance check - captcha error';
var OMNITURE_SYSTEM_ERR_VAL  = 'giftcard balance check - system error';
var OMNITURE_USER_ERR_VAL    = 'giftcard balance check - user error'; 
var GIFT_CARD_BALANCE_FORM_NAME    = 'OrderItemAddForm'; 
var CHECKOUT_FORM_NAME    = 'PaymentMethodForm';
var KEEP_GC_PIN = 'KeepGCandPin';
// KIOSK BEGIN
var UNSUPPORTED_CARD = 'Unsupported Card';
var UNKNOWN_CARD     = 'Unknown Card';
var deletedCookiesCount = 0;
// Global Variables BEGIN
var debugVal = 'false';
var groupCache = {};
var browserAppName = navigator.appName.toLowerCase();
var isGiftCardSectionCurrentlyVisible = false;
var isGiftCardTenderActiveValue = 'false';
var formName = '0';
var omnitureMsg = '';
var omnitureLinkTrackingObject = null;
var focusOn = null;
var focusOnAppliedTable = 'false';
// Error Messages
var gcUserErrorMsg = null;
var gcSystemErrorMsg = null;
var gcCaptchaErrorMsg = null;
var gcBalanceErrorMsg = null;
var duplicateGCErrorMsg = null;
var nonUSGiftCardErrorMsg = null;
var gcZeroBalanceErrorMsg = null;
// Global Variables END
 
 
 //Hide the gift card as soon as script is loaded - qc-21438
 $(function(){ $("#giftCard").css({"display":"none"}); });
 if(document.getElementById("taxId")){
     document.getElementById("taxIdNum").style.display = "none";
     document.getElementById("taxId").style.display = "none";
}
 
/*************************************************************************************************
*  Function:  expiryDate
*             set whether the expiry year and month should be disabled.             
*
*  Parms:
*                            NONE
*
*  <!-- Fixed for defect# 6001 -->
**************************************************************************************************/ 
function expiryDate()
{
  
                              var cardBrandVal = document.PaymentMethodForm.cardBrand.value ;
                              if (cardBrandVal != null && cardBrandVal != "" ){
                                             if(cardBrandVal == "HDCON" || cardBrandVal == "HDCOM"){
                                             document.PaymentMethodForm.cardExpiryYear.disabled = true;
                                             document.PaymentMethodForm.cardExpiryMonth.disabled = true;
                                             }else {
                                            document.PaymentMethodForm.cardExpiryYear.disabled = false;
                                             document.PaymentMethodForm.cardExpiryMonth.disabled = false;
                                             }
                              }
                              if(cardBrandVal!="HDCOM"){
                                             if(document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.length>19){
                                                            document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value=
                                                                           document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.substring(0,19);
                                             }             
                              }
} // expiryDate
 
 
 
 
              
/*************************************************************************************************
*  Function:  giftCardBalanceInquiry
*                            Invoked on the gift card page to check the balance of a giftcard.  This will make an
*                            ajax call to get the giftcard balance
*
*  Parms:
*                            NONE
**************************************************************************************************/ 
function giftCardBalanceInquiry(obj)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: giftCardBalanceInquiry('+ obj + ')' );
               }
               formName = GIFT_CARD_BALANCE_FORM_NAME;
               var storeId = document.forms[formName].storeId.value;
               var storeIdParam = document.forms[formName].storeId.name;
               var giftCardNbr = document.forms[formName].giftCardNumber.value;
               var giftCardNbrParam = document.forms[formName].giftCardNumber.name;
               var pinNbr = document.forms[formName].pinNumber.value;
               var pinNbrParam = document.forms[formName].pinNumber.name;
               var captchaTxt = document.forms[formName].captchaVerification.value;
               var captchaTxtParam = document.forms[formName].captchaVerification.name;
              
              
               // Clear out the previous balance inquiry results
               document.getElementById('gift-card-details').innerHTML = '';
              
               //Clear out any omniture message that may have been stored
               omnitureMsg = '';
              
               // obj is the "this" object that is passed in from the onClick event.  The omnitureLinkTrackingObject is interrogated in the
               // callOmniture function.  It is made a global variable to circumvent passing this variable to multiple functions and because this the entry point
               // to checking gift card balances.
               omnitureLinkTrackingObject = obj;
              
              
               var errorMsg = null;
               errorMsg = validateGiftCardFields(giftCardNbr, pinNbr, captchaTxt);
              
               if( errorMsg == null || errorMsg.length <= 0)         
               {
 
                              // Show the please wait image
                              document.getElementById('gc-entry-please-wait').innerHTML = '<img src="/wcsstore/hdus/en_US/images/pleasewait_3a.gif" width="335" height="65" />';
                              document.getElementById('gc-entry-please-wait').style.display = 'block';
                             
                              // Hide the gift card entry section and button
                              showOrHideGC(false);//document.getElementById('giftCard').style.display = 'NONE';
                              document.getElementById('if-you-still-cant-read-image-text').style.display = 'NONE';                             
                              document.getElementById('gc-entry-button').style.display = 'NONE';
                             
                              // Made the ajax call - build the name value pairs for the request
                              var url = '/webapp/wcs/stores/servlet/GiftCardBalanceInquiry?'+storeIdParam+'='+storeId+'&'+giftCardNbrParam+'='+giftCardNbr+'&'+pinNbrParam+'='+pinNbr+'&'+captchaTxtParam+'='+captchaTxt+'&nextView=GiftCardBalInqView';
                              makeHttpRequest(url, 'giftCardBalanceInquiryCallBack');
 
               }
               else
               {
                              //WCS 7UP 4.6 merge1-Start
                              updateLiveChatErrorCount();
                              //WCS 7UP 4.6 merge1-End
                              // Show the gift card error message
                              document.getElementById('gift-card-errors').innerHTML = errorMsg;
                              adjustCaptchaUI(KEEP_GIFT_CARD);
                              changeCaptcha();  // change the captcha image
                              callOmniture(OMNITURE_USER_ERR_VAL);  //client side validation failed, call omniture passing a user error message                   
               }
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: giftCardBalanceInquiry('+ obj + ')' );
               }
}  // end giftCardBalanceInquiry
 
 
 
 
 
/*************************************************************************************************
*  Function:  applyGiftCardCallBack
*                            Gets called after a successful return from ajax call to retrieve gift card balance
*                            off of the gift card page
*
*  Parms:
*                            text - the html that is being rendered back from the ajax call
**************************************************************************************************/
function giftCardBalanceInquiryCallBack(text)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: giftCardBalanceInquiryCallBack('+ text + ')' );
               }
 
               // Hide the please wait image
               //WCS 7UP 4.6 merge1-Start
               document.getElementById('gc-entry-please-wait').innerHTML = '';
              
                             
               // Replace the appropriate content
               document.getElementById('giftCard').innerHTML = text;
 
               adjustGCError('giftCardBalanceInquiryCallBack');
 
               // set the GC container back to visible
               showOrHideGC(true);//document.getElementById('giftCard').style.display = 'block';
               //WCS 7UP 4.6 merge1-End
               document.getElementById('if-you-still-cant-read-image-text').style.display = 'block';                          
               document.getElementById('gc-entry-button').style.display = 'block';
 
//"omnitureMsg" is set in validateGiftCardFields() it can be set to space if there are no errors.  This is intentional
//because HD wants to also track successful balance checks.
               callOmniture(omnitureMsg); 
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: giftCardBalanceInquiryCallBack(text)' );
               }             
}  // end function giftCardBalanceInquiryCallBack
 
// Start WCS 4.6.3 code merge.
/*************************************************************************************************
*  Function:  giftCardBalanceCheck
*                            Invoked on the gift card page to check the balance of a giftcard.  This will make an
*                            ajax call to get the giftcard balance
*
*  Parms:
*                            NONE
**************************************************************************************************/ 
function giftCardBalanceCheck(obj)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: giftCardBalanceCheck('+ obj + ')' );
               }
              
               formName = GIFT_CARD_BALANCE_FORM_NAME;
               var storeId = document.forms[formName].storeId.value;
               var storeIdParam = document.forms[formName].storeId.name;
               var giftCardNbr = document.forms[formName].giftCardNumber.value;
               var giftCardNbrParam = document.forms[formName].giftCardNumber.name;
               var pinNbr = document.forms[formName].pinNumber.value;
               var pinNbrParam = document.forms[formName].pinNumber.name;
               var captchaTxt = document.forms[formName].captchaVerification.value;
               var captchaTxtParam = document.forms[formName].captchaVerification.name;
              
              
               // Clear out the previous balance inquiry results
               document.getElementById('gift-card-details').innerHTML = '';
              
               //Clear out any omniture message that may have been stored
               omnitureMsg = '';
              
               // obj is the "this" object that is passed in from the onClick event.  The omnitureLinkTrackingObject is interrogated in the
               // callOmniture function.  It is made a global variable to circumvent passing this variable to multiple functions and because this the entry point
               // to checking gift card balances.
               omnitureLinkTrackingObject = obj;
              
              
               var errorMsg = null;
               errorMsg = validateGiftCardFields(giftCardNbr, pinNbr, captchaTxt);
              
               if( errorMsg == null || errorMsg.length <= 0)         
               {
 
                              // Show the please wait image
                              document.getElementById('gc-entry-please-wait').innerHTML = '<img src="/wcsstore/hdus/en_US/images/pleasewait_3a.gif" width="335" height="65" />';
                              document.getElementById('gc-entry-please-wait').style.display = 'block';
                             
                              // Hide the gift card entry section and button
                              document.getElementById('gc-entry-container').style.display = 'NONE';
                              document.getElementById('if-you-still-cant-read-image-text').style.display = 'NONE';                             
                              document.getElementById('gc-entry-button').style.display = 'NONE';
                             
                              // Made the ajax call - build the name value pairs for the request
                              var url = '/webapp/wcs/stores/servlet/GiftCardBalanceInquiry?'+storeIdParam+'='+storeId+'&'+giftCardNbrParam+'='+giftCardNbr+'&'+pinNbrParam+'='+pinNbr+'&'+captchaTxtParam+'='+captchaTxt+'&nextView=GiftCardBalInqView';
                              makeHttpRequest(url, 'giftCardBalanceCheckCallBack');
 
               }
               else
               {
                              // Show the gift card error message
                              document.getElementById('gift-card-errors').innerHTML = errorMsg;
                              adjustCaptchaUI(KEEP_GIFT_CARD);
                              changeCaptcha();  // change the captcha image
                              callOmniture(OMNITURE_USER_ERR_VAL);  //client side validation failed, call omniture passing a user error message                   
               }
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: giftCardBalanceCheck('+ obj + ')' );
               }
}  // end giftCardBalanceCheck
 
 
/*************************************************************************************************
*  Function:  giftCardBalanceCheckCallBack
*                            Gets called after a successful return from ajax call to retrieve gift card balance
*                            off of the gift card page
*
*  Parms:
*                            text - the html that is being rendered back from the ajax call
**************************************************************************************************/
function giftCardBalanceCheckCallBack(text)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: giftCardBalanceCheckCallBack('+ text + ')' );
               }
 
               // Hide the please wait image
               document.getElementById('gc-entry-please-wait').innerHTML = '';
              
                             
               // Replace the appropriate content
               document.getElementById('gc-entry-container').innerHTML = text;
 
               adjustGCError('giftCardBalanceCheckCallBack');
 
 
 
 
 
 
 
 
 
 
               // set the GC container back to visible
               document.getElementById('gc-entry-container').style.display = 'block';
               document.getElementById('if-you-still-cant-read-image-text').style.display = 'block';                          
               document.getElementById('gc-entry-button').style.display = 'block';
 
//"omnitureMsg" is set in validateGiftCardFields() it can be set to space if there are no errors.  This is intentional
//because HD wants to also track successful balance checks.
               callOmniture(omnitureMsg); 
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: giftCardBalanceCheckCallBack(text)' );
               }             
}  // end function giftCardBalanceCheckCallBack
 
 
// End WCS 4.6.3 code merge.

/*************************************************************************************************
*  Function:  applyGiftCard
*                            Invoked on the checkout page to apply gift card(s) as payment to the order.  This will make an
*                            ajax call to get the giftcard balance
*
*  Parms:
*                            obj -- the "this" object being passed in from the onclick event in HTML
**************************************************************************************************/
function applyGiftCard(obj, whichBtn)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: applyGiftCard()' );
               }
    formName = CHECKOUT_FORM_NAME;
               var storeId = document.forms[formName].storeId.value;
               var storeIdParam = document.forms[formName].storeId.name;
               var giftCardNbr = document.forms[formName].giftCardNumber.value;
               var giftCardNbrParam = document.forms[formName].giftCardNumber.name;
               var pinNbr = document.forms[formName].pinNumber.value;
               var pinNbrParam = document.forms[formName].pinNumber.name;
               var captchaTxt = document.forms[formName].captchaVerification.value;
               var captchaTxtParam = document.forms[formName].captchaVerification.name;
               var lastRemNumber = document.forms[formName].lastRemNumber.value;
               var lastRemNumberParam = document.forms[formName].lastRemNumber.name;
               var lastRemAmount = document.forms[formName].lastRemAmount.value;
               var lastRemAmountParam = document.forms[formName].lastRemAmount.name;
              
 
               // Clear out the previous error messages and hidden fields.            
               document.getElementById('gift-card-errors').innerHTML = '';
 
              
               //Clear out any omniture message that may have been stored
               omnitureMsg = ''; 
              
               // obj is the "this" object that is passed in from the onClick event.  The omnitureLinkTrackingObject is interrogated in thc
               // callOmniture function.  It is made a global variable to circumvent passing this variable to multiple functions and because this the entry point
               // to applying gift cards.
               omnitureLinkTrackingObject = obj;
 
              
               var errorMsg = null;
               errorMsg = validateGiftCardFields(giftCardNbr, pinNbr, captchaTxt);
               if( errorMsg == null || errorMsg.length <= 0 )         // NO ERRORS
               {
              
                             
              
                              // Show the please wait image                   
                              document.getElementById('gc-entry-please-wait').innerHTML = '<img src="/wcsstore/hdus/en_US/images/pleasewait_3a.gif" width="335" height="65" />';
                              focuOn = 'lastRowInCCSection';
                              document.getElementById('gc-entry-please-wait').style.display = 'block';
                             
 
                              // Set up parameters and values for the AJAX call
                   var appliedGiftCardsArray = document.getElementsByName('appliedGiftCardAmounts');     
                              var lengthOfAppliedGiftCardsArray = appliedGiftCardsArray.length;             
                              var appliedGiftCardRemainder = 'appliedGiftCardRemainder';
                              if ( lengthOfAppliedGiftCardsArray > 0)
                              {             
                                             var appliedGiftCardNbrs = 'appliedGiftCardNbrs';
                                             var appliedGiftCardAmounts = 'appliedGiftCardAmounts';
                                             var availableGiftCardAmounts = 'availableGiftCardAmounts';
                                            
                                             var encryptedGiftCardNbrs = 'encryptedGiftCardNbrs';      
                                             var appliedGiftCardReserves = 'giftCardReserves';
                                             var appliedGCNbrsArray = document.getElementsByName('appliedGiftCardNbrs');   
                                             var appliedGCAmtsArray = document.getElementsByName('appliedGiftCardAmounts');                                                                                                     
                                             var availableGCAmtsArray = document.getElementsByName('availableGiftCardAmounts');                                                                                                  
                                             var appliedGCEncryptedArray = document.getElementsByName('encryptedGiftCardNbrs');
                                             var appliedGiftCardReservesArray = document.getElementsByName('giftCardReserves');                                                                                    
                              }
 
                              // Build parms for gift cards that have alredy been applied:
                              var appliedGiftCardsNbrParmVals = '';
                              var appliedGiftCardsAmtParmVals = '';
                              var availableGiftCardsAmtParmVals = '';
                              var lastRemAmountParmVal = '';
                              var appliedGiftCardsEncryptedParmVals = '';
                              var appliedGiftCardsReservesParmVals = '';
                             
                              // if we have applied gift cards, loop thru the applied gift cards table and set up the URL parms.
                              for(var i=0;i<lengthOfAppliedGiftCardsArray;i++)
                              {  
                                             appliedGiftCardsNbrParmVals = appliedGiftCardsNbrParmVals + '&' + appliedGiftCardNbrs + "=" + appliedGCNbrsArray[i].value;
                                             appliedGiftCardsAmtParmVals = appliedGiftCardsAmtParmVals + '&' + appliedGiftCardAmounts + "=" + appliedGCAmtsArray[i].value;
                                             availableGiftCardsAmtParmVals = availableGiftCardsAmtParmVals + '&' + availableGiftCardAmounts + "=" + availableGCAmtsArray[i].value;                              
                                             appliedGiftCardsEncryptedParmVals = appliedGiftCardsEncryptedParmVals + '&' + encryptedGiftCardNbrs + "=" + appliedGCEncryptedArray[i].value;
                                             appliedGiftCardsReservesParmVals = appliedGiftCardsReservesParmVals + '&' + appliedGiftCardReserves + "=" + appliedGiftCardReservesArray[i].value;
                              }
                                            
//                           // Made the ajax call - build the name value pairs for the request
                              var url = '/webapp/wcs/stores/servlet/GiftCardBalanceInquiry?'+storeIdParam+'='+storeId+'&'
                                                                                                                                                                                                                                                                 +giftCardNbrParam+'='+giftCardNbr
                                                                                                                                                                                                                                                                 +'&'+pinNbrParam+'='+pinNbr+'&'
                                                                                                                                                                                                                                                                 +captchaTxtParam+'='+captchaTxt
                                                                                                                                                                                                                                                                 +appliedGiftCardsNbrParmVals
                                                                                                                                                                                                                                                                 +appliedGiftCardsAmtParmVals
                                                                                                                                                                                                                                                                 +availableGiftCardsAmtParmVals
                                                                                                                                                                                                                                                                 +appliedGiftCardsEncryptedParmVals
                                                                                                                                                                                                                                                                 +appliedGiftCardsReservesParmVals
                                                                                                                                                                                                                                                                 +'&'+lastRemNumberParam+'='+lastRemNumber
                                                                                                                                                                                                                                                                 +'&'+lastRemAmountParam+'='+lastRemAmount
                                                                                                                                                                                                                                                                 +'&nextView=AppliedGiftCardsView';                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                  
                              makeHttpRequest(url, 'applyGiftCardCallBack','',whichBtn);                                                                                                                     
              
              
               }
               else  //there are errors
               {
                              //WCS 7UP 4.6 merge1-Start
                              updateLiveChatErrorCount();
                              //WCS 7UP 4.6 merge1-End
                              // Show the gift card error message
                              document.getElementById('gift-card-errors').innerHTML = errorMsg;
                              adjustCaptchaUI(KEEP_GIFT_CARD);
                              changeCaptcha();  // change the captcha image
                              document.getElementById('gc-entry-button').style.display = 'BLOCK';
                              document.getElementById('if-you-still-cant-read-image-text').style.display = 'BLOCK';
                              //WCS 7UP 4.6 merge1-Start
                              showOrHideGC(true);//document.getElementById('giftCard').style.display = 'BLOCK';
                              //WCS 7UP 4.6 merge1-End
                              callOmniture(OMNITURE_USER_ERR_VAL);  //client side validation failed, call omniture passing a user error message
               }
              
 
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: applyGiftCard()'  );
               }
              
}  // end function applyGiftCard
 
 
 
 
 
/*************************************************************************************************
*  Function:  applyGiftCardCallBack
*                            Gets called after a successful return from ajax call to retrieve gift card balance
*                            when the user presses the "apply gift card" button off of the checkout screen
*
*  Parms:
*                            text - the html that is being rendered back from the ajax call
**************************************************************************************************/
function applyGiftCardCallBack(text, whichBtn)
{
  
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: applyGiftCardCallBack(text)'  );
                              //  For Debug
                   alert ("applyGiftCardCallBack(text) [" + text + "]");                         
               }
 
 
               // Hide the please wait image
               document.getElementById('gc-entry-please-wait').innerHTML = '';
               //WCS 7UP 4.6 merge1-Start
    var maxGCsAllowed = document.forms[formName].maxGCsAllowed.value;  
    
    //if the text contains the div with id="applied-cards" we need to remove this
    
    var giftCardIdStr = "<div id=\"applied-cards\">";
    var index = text.indexOf(giftCardIdStr);
    var lengthOfGiftCardIdStr = (giftCardIdStr.length);
    var tempText = text;
    if(-1!=index){
        tempText = text.substring((lengthOfGiftCardIdStr+index));  
    
        var lastDivStr = "/div";
        index = tempText.lastIndexOf(lastDivStr);
   
        if(-1!=index){
            tempText = tempText.substring(0,index-2);
            text = tempText;
        }
    }
	//giftCardApplied=true; // if the present gift card is valid, make it true
	
    document.getElementById('applied-cards').innerHTML = text;
  //WCS 7UP 4.6 merge1-End
              calculateGiftCardTotal();
			  adjustCheckoutUI('applyGiftCardCallBack');
			  validateGSA.valGSA();  // this function is defined in checkoutRefresh.js to validate if a gift card is applied with a GSA card then treat that card as a normal card.
              changeCaptcha();
                             
                if (isGiftCardTenderActiveValue == "true" )  //Gift Card Tender is active
               {
                             // Replace the appropriate content
                              document.getElementById('gc-entry-button').style.display = 'block';
                              document.getElementById('if-you-still-cant-read-image-text').style.display = 'block';                             
                              showOrHideGC(true);//document.getElementById('giftCard').style.display='block';
                             
                              // we need to check to see if we need to focus on the top of the applied GC table.
                              if  (focusOnAppliedTable == 'true') 
                              {
                                             focusOnAnchor('topOfAppliedGiftCardTable');                                    
                              }
                             
                             
                              // Now check if we need to focus on anything else.                          
                              if (null != focusOn && focusOn.length > 0)
                              {
                                             focusOnAnchor(focusOn);
                              }                            
               }
               else  // Gift Card Tender is not active
               {            
                 document.getElementById('gc-entry-button').style.display = 'NONE';
      document.getElementById('if-you-still-cant-read-image-text').style.display = 'NONE';                  
      showOrHideGC(false);//document.getElementById('giftCard').style.display='NONE';  // giftCard is the parent container.  // gc-entry-container is the parent container.
               }
 
              //"omnitureMsg" is set in validateGiftCardFields() and adjustCheckout() it can be set to space if there are no errors.  This is intentional
               //because HD wants to also track successful balance checks.
               callOmniture(omnitureMsg);
               //WCS 7UP 4.6 merge1-Start
               var totalCC = document.forms[formName].totalCC.value;
    var totalGC = document.forms[formName].totalGC.value;
   
    if(totalGC >0){
        document.getElementById('appliedCardsText').style.display = 'block';
    }
    else{
        document.getElementById('appliedCardsText').style.display = 'none';
    }
    if(totalCC > 0 && document.getElementsByName('appliedGiftCardAmounts').length < maxGCsAllowed){            
                     
                   //Make sure that the parent giftCard section appears
                   showOrHideGC(true);//document.getElementById('giftCard').style.display = 'block';
                   //Make sure that the applied gift cards show up
                   document.getElementById('myCards').style.display = 'block';
                   //Show the gift card details
                   document.getElementById('applied-cards').style.display = 'block';
                   document.getElementById('applied-cards-table').style.display = 'block'; 
                  
                   var gcErrors = document.getElementById('gift-card-errors').innerHTML;
                   //Only display the Add Another card text if there are no errors
                   if(gcErrors.length == 0){            
                       document.getElementById('addAnotherGc').style.display = '';
                   }                            
                    $('.noBalanceDue').hide();
                   //document.getElementById('myCardsAppliedCards').style.display = 'block';             
               }
               else{
                   //Only show the no balance message if the balance is 0
                   if(totalCC <= 0){                          
                              document.getElementById("opInformationDisplay").style.display = "none";
                                  document.getElementById("opInformationForm").style.display = "block";
                                  if($('#cardBrandContainer').is(':visible')){
                                	  $('.noBalanceDue').show();
                                	  $("#noBalanceDueSaved").css('display','none');
                                  }else{
                                	  $('.noBalanceDue').show();  
                                  }
                   }
               }
              
               var gcErrMsg=document.forms[formName].gcErrorMsgs;
               if(whichBtn!=undefined && whichBtn == 'applyAndHide' && totalGC > 0 && (!(gcErrMsg) || !(gcErrMsg.value)) ){
                   document.getElementById('giftCardForm').style.display = 'NONE';
                   document.getElementById('showGCForm').value="false";
 
               } else  if(totalCC > 0 && document.getElementsByName('appliedGiftCardAmounts').length< maxGCsAllowed) {
 
                   document.getElementById('giftCardForm').style.display = 'block';
                   if(gcErrMsg==null || gcErrMsg.value==''){          
                       document.getElementById('addAnotherGc').style.display = 'NONE';
                   }
                   document.getElementById('showGCForm').value="true";  
               }
              
               if (debugVal == 'true')
    {
                   alert ('Function: applyGiftCard(): ' + '\n'+ 'url[' + url + ']');
               }                            
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: applyGiftCardCallBack(text)'  );
               }
               //WCS 7UP 4.6 merge1-End
} // end applyGiftCardCallBack
 
 
 
 
/*************************************************************************************************
*  Function:  checkForGCBalanceError
*                            This function checks to see if a particular erorr message exists when coming back from the server.
*                            This error means that the Gift + Credit Card totals do not match the Grand total on the server.  This
*       is considered a severe error and we need to clear out all of the applied GC's and force the user start over.
*
*  Parms:
**************************************************************************************************/ 
 
function  checkForGCBalanceError()
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: checkForGCBalanceError() '  );
               }
 
 
               var gcBalanceErrorMsgVal = gcBalanceErrorMsg;
              var customErrorMessageVal = '';
 
             
               //had to put it inside of a try catch block because sometimes the customErrorMessage is unavailable.
               try
               {
                              var customErrorMessage = document.getElementById('custom-error-message');
                              if ( customErrorMessage == null)
                              {
                                                            customErrorMessageVal = '';
                              }
                              else
                              {
                                             customErrorMessageVal = customErrorMessage.innerHTML;
                              }
                                                           
 
               }  // end Try
               catch(err)
               {
                              customErrorMessageVal = '';
               } // end Catch
             
 
               // check to see if the sever error message is the GC Balance error message. if so, clear out the necessary fields.
              if (gcBalanceErrorMsgVal == customErrorMessageVal)
               {
                              var         appliedGiftCardArray = document.getElementsByName('appliedGiftCardNbrs');
 
                              var tblLength = appliedGiftCardArray.length;
                              var outsideCounter = 1;
                              // loop thru the applied gift cards table table and delete each row.
                              for(var i=0;i<tblLength;i++)
                              {             
                                             if ( outsideCounter < tblLength) // not on last row.  call the delete function and do not adjust totals or UI yet.
                                             {
                                                            deleteAppliedGiftCardRow(document.getElementById('applied-cards-table').rows[0],'N');
                                             }
                                             else  // on the last row, delete the last row and adjust totals and UI.
                                            {
                                                            deleteAppliedGiftCardRow(document.getElementById('applied-cards-table').rows[0],'Y');                                                                                                                  
                                             }
                                            
                                             outsideCounter++;
 
                              } // end for                        
                             
                              adjustCaptchaUI(CLEAR_ALL);        // If the user inputted GC#, PIN or CAPTCHA -- clear it
 
              }
             
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: checkForGCBalanceError()'  );
               }
}
 
 
 
 
/*************************************************************************************************
*  Function:  clearGiftCardData
*                            This function is used to clear teh gift card data if the user clicks PayPal option in
*       PaymentMethod Page
*  Parms:
**************************************************************************************************/ 
 
function  clearGiftCardData(){
                              var         appliedGiftCardArray = document.getElementsByName('appliedGiftCardNbrs');
                              //make sure that any remaing gift card amount is cleared
                              //WCS 7UP 4.6 merge1-Start
                              document.forms[formName].lastRemAmount.value=0;
                              //WCS 7UP 4.6 merge1-End
                              if (appliedGiftCardArray!=undefined){
                                             var tblLength = appliedGiftCardArray.length;
                                             var outsideCounter = 1;
                                             // loop thru the applied gift cards table table and delete each row.
                                             for(var i=0;i<tblLength;i++){         
                                                            if ( outsideCounter < tblLength) // not on last row.  call the delete function and do not adjust totals or UI yet.
                                                            {
                                                                           deleteAppliedGiftCardRow(document.getElementById('applied-cards-table').rows[0],'N');
                                                            }
                                                            else  // on the last row, delete the last row and adjust totals and UI.
 
                                                           {
                                                                           deleteAppliedGiftCardRow(document.getElementById('applied-cards-table').rows[0],'Y');                                                                                                           
                                                            }
                                                            outsideCounter++;
                                             } // end for                        
                                             adjustCaptchaUI(CLEAR_ALL);        // If the user inputted GC#, PIN or CAPTCHA -- clear it
                              }
}
 
 
 
/*************************************************************************************************
*  Function:  validateGiftCardFields
*                            Business validation around gift card fields (GC#, GC Pin#, captcha Text)
*
*  Parms:
*                            giftCardNbr         -              the gift card number that the user is trying to apply
*                            pinNbr                  -              the pin number of the gift card number that the user is trying to apply
*                            captchaTxt          -              the text that the user has entered for what they think the captcha image says
**************************************************************************************************/ 
function  validateGiftCardFields(giftCardNbr, pinNbr, captchaTxt)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: validateGiftCardFields(giftCardNbr, pinNbr, captchaTxt)' + giftCardNbr + ',' + pinNbr + ','  + captchaTxt );
               }
 
 
// return null;
 
  var errorMsg = null;
  var duplicateGCMsgVal = '';       
  var userErrorMsgVal = '<span class="error" > ' + gcUserErrorMsg + '</span>'; 
  var nonUSGiftCardErrorMsgVal = '<span class="error" > ' + nonUSGiftCardErrorMsg + '</span>';
 
  if ( duplicateGCErrorMsg != null)
  {
                 duplicateGCMsgVal = '<span class="error" >' + duplicateGCErrorMsg + '</span>';
  }
 
  
               // Check that the gift card number is 23 digits
               if( isGiftCardValid(giftCardNbr) )
               {
                              // check the pin nbr is 4 digits
                              if( isPinNbrValid(pinNbr) )
                              {
                                             // check the captcha is 7 alpha numeric
                                             if( isCaptchaValid(captchaTxt) )
                                             {
                                                            if ( isUSGiftCard(giftCardNbr) )
                                                            {
                                                                var isDuplicateFound = isDuplicateGiftCard(giftCardNbr)
                                                                           if ( !isDuplicateGiftCard(giftCardNbr) )
                                                                           {
                                                                                          // validation OK
                                                                           }
                                                                           else
                                                                           {
                                                                                          // Show the gift card error message
                                                                                          errorMsg = duplicateGCMsgVal;
                                                                           }
                                                            }
                                                            else  // else for isUSGiftCard(giftCardNbr)
                                                            {
                                                                           // Show the gift card error message
                                                                           errorMsg = nonUSGiftCardErrorMsgVal;
                                                            }
                                             } 
                                             else // else for isCaptchaValid(captchaTxt)
                                             {
                                                            // Show captcha error
                                                            errorMsg = userErrorMsgVal;
                                             }
                              }
                              else // else for isPinNbrValid(pinNbr)
                              {
                                             // Show the pin error message
                                             errorMsg = userErrorMsgVal;
 
                              }
               }
               else  // else for isGiftCardValid(giftCardNbr)
               {
                              // Show the gift card error message
                              errorMsg = userErrorMsgVal;
               }
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: validateGiftCardFields(giftCardNbr, pinNbr, captchaTxt)' + giftCardNbr + ',' + pinNbr + ','  + captchaTxt   );
               }
 
 
  return errorMsg
 
}  // end function validateGiftCardFields
 
 
 
 
 
/*************************************************************************************************
*  Function:  isGiftCardValid
*                            Quick validation of gift card is US (5th digit = 1).
*
*  Parms:
*                            giftCardNbr         -              the gift card number that the user is trying to apply
**************************************************************************************************/
function isGiftCardValid(giftCardNbr)
{
               var REG_EXP = /^\d{23}$/;
               return giftCardNbr.match(REG_EXP);
}  // end function isGiftCardValid
 
 
 
 
 
 
/*************************************************************************************************
*  Function:  isUSGiftCard
*                            Quick validation of gift card format.
*
*  Parms:
*                            giftCardNbr         -              the gift card number that the user is trying to apply
**************************************************************************************************/
function isUSGiftCard(giftCardNbr)
{
               return ('1' == giftCardNbr.charAt(4));
}  // end function isUSGiftCard
 
 
 
 
/*************************************************************************************************
*  Function:  isDuplicateGiftCard
*                            Quick validation to see if the user already applied the giftcard gift card.
*
*  Parms:
 
*                            giftCardNbr         -              the gift card number that the user is trying to apply
**************************************************************************************************/
function isDuplicateGiftCard(giftCardNbr)
{
//            var appliedGiftCardNbrsArray = document.forms[formName].appliedGiftCardNbrs;
               var appliedGiftCardNbrsArray = document.getElementsByName('appliedGiftCardNbrs');
               var duplicateFound = 'N';
 
               for(var i=0;i<appliedGiftCardNbrsArray.length;i++)
               {             
                              if (giftCardNbr == appliedGiftCardNbrsArray[i].value)                                                     
                              {
                                             duplicateFound = 'Y';
                                             break;
                              }
               }
               return ( 'Y' == duplicateFound );
 
              
}  // end function isDuplicateGiftCard
 
 
 
 
/*************************************************************************************************
*  Function:  isPinNbrValid
*                            Quick validation of pin number format.   
*
*  Parms:
*                            pinNbr   -              the pin number of the gift card that the user is trying to apply
**************************************************************************************************/
function isPinNbrValid(pinNbr)
{
               var REG_EXP = /^\d{4}$/;
               return pinNbr.match(REG_EXP);
}  // end function isPinNbrValid
 
 
 
 
 
/*************************************************************************************************
*  Function: isCaptchaValid
*                            Quick validation of captcha image text
*
*  Parms:
*                            captcha - the text that the user has entered  -- what they think the captcha image says
**************************************************************************************************/
function isCaptchaValid(captcha)
{
               var REG_EXP = /^[A-Za-z0-9]{7}$/;
               return captcha.match(REG_EXP);
}  // end function isCaptchaValid
 
 
 
 
 
 
/*************************************************************************************************
*  Function:  deleteAppliedGiftCardRow
*                            User clicked the "Remove gift card" button on the checkout page.
*                            Delete the giftcard from the table and recaluclate the totals.
*
*  Parms:
*                            r              - represents the row on the applied gift cards table that they user wants to delete
*                            calAndadjustUIAfterDelete           - a flag that tells this function if whether it should adjust the
*                                                                                                                        totals and UI.  
                                                                                                                                                      Y = Adjust everything after you delete the row
                                                                                                                                                      Anything else = Do not adjust anything after the deletion
 
**************************************************************************************************/
function deleteAppliedGiftCardRow(r, calAndadjustUIAfterDelete)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: deleteAppliedGiftCardRow(r, calAndadjustUIAfterDelete ' + r + "," + calAndadjustUIAfterDelete);
               }
              
               // had to set the display to none while deleting to correct IE shifting some of the fields up (but not all)
               // at the end of this function, display is set back to block.
               showOrHideGC(false);//document.getElementById('giftCard').style.display='none';
 
 
              
               var i=r.parentNode.parentNode.rowIndex;
               if(i==0){
                   document.forms[formName].lastRemAmount.value=0;
               }
               document.getElementById('applied-cards-table').deleteRow(i);
			   //checkIfAnyGiftCardIsApplied(); // this function is in order.js. Used to determine if there is still a valid gift card. Used for the purpose of GSA + Gift card
			   validateGSA.valGSA();
              
               if ('Y' == calAndadjustUIAfterDelete.toUpperCase() ) // Y is the only value that will recalculate and readjust
               {
                              document.forms[formName].gcErrorMsgs.value = '';
                              document.getElementById('gift-card-errors').innerHTML ='';
                              calculateGiftCardTotal();                             
                              adjustCheckoutUI('deleteAppliedGiftCardRow');
                              //WCS 7UP 4.6 merge1-Start
                              //The last row was deleted, we have to remove the Applied Cards: text
                             
                              if(document.getElementById('applied-cards-table').rows.length==0){
                                  document.getElementById('appliedCardsText').style.display = 'none';
                                  document.getElementById('addAnotherGc').style.display = 'none';
                                  document.getElementById('giftCardForm').style.display = 'block';                                                                  
                                  document.getElementById('showGCForm').value="true";
                                 
                                  if(document.getElementById('cardBrand').value!='PPAL'){
                                             document.getElementById('giftCard').style.display = 'block';
                             
               }
                                  document.getElementById('captchaVerification').value = '';
                              }
        var totalCC = document.forms[formName].totalCC.value;                     
                             
                              if(totalCC > 0){
                                             $('.noBalanceDue').hide();
                   }                                       
               }
               var gcAppliedTotalArray = document.getElementsByName('appliedGiftCardAmounts');
               //WCS 7UP 4.6 merge1-End
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: deleteAppliedGiftCardRow(r, calAndadjustUIAfterDelete ' + r + "," + calAndadjustUIAfterDelete);
               }
              
}  // end function deleteAppliedGiftCardRow
 
 
 
 
/*************************************************************************************************
*  Function:  changeGiftCardVisibility
*                            Determine if the gift card section is visible or not and whether is visibility should be changed
*                            This gets called when the user tries to expand or collapse the gift card section
*
*  Parms:
*                            NONE
**************************************************************************************************/
function changeGiftCardVisibility()
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: changeGiftCardVisibility() '  );
               }
 
               var section = document.getElementById("giftCard");
               var image = document.getElementById("gc_show_hide_img"); 
               var gcAppliedTotalArray = document.getElementsByName('appliedGiftCardAmounts');
 
               if (gcAppliedTotalArray.length > 0)   // Business rule: if there are "Applied" gift cards, do not allow the user to collapse the section.
               {
                              image.style.display = 'NONE';
                              isGiftCardSectionCurrentlyVisible = true;                
               }
               else
               { 
                              if ( isGiftCardSectionCurrentlyVisible )  // giftcard section is visible...collapse the section and setup button so that user can expand it.
                              {
                                             section.style.display = 'NONE';    
                                             image.src = PLUS_IMG_VAL;       
                                             isGiftCardSectionCurrentlyVisible = false;                                 
                              }
                              else // giftcard section is NOT visible...show the section and setup button so that user can collapse it.
                              {              section.style.display = 'block';
                                             image.src = MINUS_IMG_VAL;
                                             isGiftCardSectionCurrentlyVisible = true;
                              }
               }
              
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: changeGiftCardVisibility()'  );
               }             
              
}  // end function changeGiftCardVisibility
 
 
 
 
 
 
/*************************************************************************************************
*  Function:  calculateGiftCardTotal
*                            Calculate the total applied by the giftcards and adjust the totals on the "Merchandise SubTotal"
*                            accordingly section of the checkup page
*
*  Parms:
*                            NONE
**************************************************************************************************/
function calculateGiftCardTotal()
{
 
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: calculateGiftCardTotal()'  );
               }
 
               var gcAppliedTotalArray;
               var gcAvailableTotalArray;
               var gcNbrsArray;
               var lengthOfAppliedTotalArray;
               var lengthOfAvailableTotalArray;
               var appliedGCTotal;
               var availableGCTotal;
               var lastEnteredAvaiableAmt;  //what the available amount of the last card entered is
               var lastEnteredAppliedAmt;   //what we will eventually set the applied amount of the last card entered to
               var grandTotal;
               var gcTotal = 0;
               var ccTotal = 0;
               var lastRemAmount = 0;
               var orderSummaryGrandTotal;
               gcNbrsArray = document.getElementsByName('appliedGiftCardNbrs');         
               gcAppliedTotalArray = document.getElementsByName('appliedGiftCardAmounts');
               lengthOfAppliedTotalArray = gcAppliedTotalArray.length;
               gcAvailableTotalArray = document.getElementsByName('availableGiftCardAmounts');
               lengthOfAvailableTotalArray = gcAvailableTotalArray.length;
              
               lastEnteredAvaiableAmt = 0;
               lastEnteredAppliedAmt = 0;          
               var grandTotalInnerHTML = document.getElementById('grandTotal').innerHTML;
               grandTotal = checkNumber(grandTotalInnerHTML);
               gcTotal = 0;
               ccTotal = 0;
               lastRemAmount = 0;
               //WCS 7UP 4.6 merge1-Start
               var bottomGcTotal = document.getElementById('orderSummaryGcAmt').innerHTML;         
                   gcGrandTotal = checkNumber(bottomGcTotal);
                  
                   //get the left over available GC amount from the last added card
                   //Note: only the last added card can have a left over available amount
                   lastRemAmount = document.forms[formName].lastRemAmount.value;
                  
                   adjustedGrandTotal = grandTotal - gcGrandTotal;
 
// loop thru the avaiable amounts on the GC's and build a total.
               availableGCTotal = 0;
               //WCS 7UP 4.6 merge1-Start
               for(var i=0;i<lengthOfAppliedTotalArray;i++)
               {             
                              if (i == 0)  // on the last GC entered by the user (first row on the table)
                              {
                                lastEnteredAvaiableAmt = gcAppliedTotalArray[i].value ;
                              }
                              var totalOnCurrentGiftCard = checkNumber(gcAppliedTotalArray[i].value);
                              //WCS 7UP 4.6 merge1-End
                              availableGCTotal = availableGCTotal + totalOnCurrentGiftCard;
                             
               } // end for
               availableGCTotal = checkNumber(availableGCTotal.toFixed(2));
               //WCS 7UP 4.6 merge1-Start       
               //figure out what the Gift Card and Credit Card totals are.              
               if ( adjustedGrandTotal > availableGCTotal )
               {             
                              gcTotal = availableGCTotal;
                              ccTotal = adjustedGrandTotal - availableGCTotal;
                              if(lastRemAmount && lastRemAmount > 0){
                                  if(ccTotal >= lastRemAmount){                                     
                                      ccTotal=ccTotal-lastRemAmount;
                                      //had to use parseFloat because it kept on concatenating the values as Strings instead of floats
                                      var tempGcTotal=parseFloat(gcTotal)+parseFloat(lastRemAmount);
                                      gcTotal=tempGcTotal;
                                      var totalOnCurrentGiftCard = checkNumber(gcAppliedTotalArray[0].value);
                                      //had to use parseFloat because it kept on concatenating the values as Strings instead of floats
                                      totalOnCurrentGiftCard = parseFloat(totalOnCurrentGiftCard) + parseFloat(lastRemAmount);
                                      gcAppliedTotalArray[0].value=CurrencyFormatted(totalOnCurrentGiftCard,'$',',');
                                      lastEnteredAvaiableAmt=totalOnCurrentGiftCard;
                                      lastRemAmount=0;
                                      document.forms[formName].lastRemAmount.value=0;                                 
                                  }
                                  else{
                                      lastRemAmount = lastRemAmount-ccTotal;  
                                      //call parseFloat to ensure arithmetic addition instead of String concatenation
                                      gcTotal=parseFloat(gcTotal)+parseFloat(ccTotal);              
                                      var totalOnCurrentGiftCard = checkNumber(gcAppliedTotalArray[0].value);
                                      //call parseFloat to ensure arithmetic addition instead of String concatenation
                                      totalOnCurrentGiftCard = parseFloat(totalOnCurrentGiftCard) + parseFloat(ccTotal);        
                                      gcAppliedTotalArray[0].value=CurrencyFormatted(totalOnCurrentGiftCard,'$',',');              
                                      lastEnteredAvaiableAmt=totalOnCurrentGiftCard;
                                      ccTotal=0;
                                      document.forms[formName].lastRemAmount.value=lastRemAmount;                   
                                  }
                              }
                              //WCS 7UP 4.6 merge1-End
                              lastEnteredAppliedAmt = lastEnteredAvaiableAmt;             
 
               }
               else if ( adjustedGrandTotal < availableGCTotal )
               {
                   // the Grand total is less than all of the Applied GC's.  Only apply what is needed from the last GC that the user has entered
                   // (first GC on the "appliedGiftCardTable"). We also have to change the hidden amount for the GC.
 
                              ccTotal = 0;
                              //lastRemAmount = availableGCTotal - grandTotal;
                              lastRemAmount = lastEnteredAvaiableAmt - grandTotal;
                              lastEnteredAppliedAmt = lastEnteredAvaiableAmt - lastRemAmount;
                              gcTotal = adjustedGrandTotal;
              
               }
               else  // grandTotal = appliedGCTotal
               {
                              gcTotal = adjustedGrandTotal;
                              ccTotal = 0;
                              lastEnteredAppliedAmt = lastEnteredAvaiableAmt
               }
               //WCS 7UP 4.6 merge1-Start
               var orderSummaryDisplayCCTotal = CurrencyFormatted(ccTotal,'$',',');
              
               if(gcTotal == 0){
                   document.getElementById('gcSummaryRow').style.display='none';
                              document.getElementById('giftCardAmountRow').style.display='none';
 
               } else{
                   document.getElementById('gcSummaryRow').style.display='';
                   var orderSummaryDisplayGCTotal = CurrencyFormatted(gcTotal,'$',',');
                  
                   $('#giftCardAmountRow').removeAttr("style");
                              $('#giftCardAmountRow th').css('display','block');
                              $('#giftCardAmountRow td.subtotal-col').css('display','block');
               }
              
               document.getElementById('orderSummaryGcAmt').innerHTML='-'+orderSummaryDisplayGCTotal;                              
               document.getElementById('grandTotal').innerHTML = orderSummaryDisplayCCTotal;
               document.getElementById('orderSummaryGrandTotal').innerHTML=orderSummaryDisplayCCTotal;
               //WCS 7UP 4.6 merge1-End
              
               //Now that you know what the Gift Card and Credit Card totals are, set the visibile fields ("To Be Paid with..." lines).
               //NOTE: we are looping thru the array because the business wanted the subtotals in 2 different places on the page so we have
               //      to update the DISPLAYED totals in 2 places.
              
               // update To Be Paid with Gift Card(s) lines
//            var displayGiftCardTotalArray = getElementsById('giftCardTotal','Y');
               var displayGiftCardTotalArray = getElementsById('giftCardTotal','Y');
               var displayGCTotal = CurrencyFormatted(gcTotal,'$',',');
               for(var i=0;i<displayGiftCardTotalArray.length;i++)
               {             
                              displayGiftCardTotalArray[i].innerHTML = '-'+displayGCTotal;        
               }  //end for loop
               //now we need to make sure that we update the values in the order summary
               //WCS 7UP 4.6 merge1-Start
               var gcTotalInOrderSummary = getElementsById('gcTotalPaidByGiftCard','Y');
               for(var i=0;i<gcTotalInOrderSummary.length;++i){
                   gcTotalInOrderSummary[i].innerHTML = displayGCTotal;
               }
               //WCS 7UP 4.6 merge1-End
               // update To Be Paid with Credit Card lines            
 
               var displaycreditCardTotalArray = getElementsById('creditCardTotal','Y');
               var displayCCTotal = CurrencyFormatted(ccTotal,'$',',');
               for(var i=0;i<displaycreditCardTotalArray.length;i++)
               {
                              displaycreditCardTotalArray[i].innerHTML = displayCCTotal;                          
               }  //end for loop
 
              
               // set all of the hidden fields
              
               document.forms[formName].totalGC.value = CurrencyFormatted(gcTotal,'','');
               document.forms[formName].totalCC.value = CurrencyFormatted(ccTotal,'','');      
               document.forms[formName].totalOrder.value = CurrencyFormatted(adjustedGrandTotal,'','');                                            
               document.forms[formName].lastRemAmount.value = CurrencyFormatted(lastRemAmount,'','');              
 
 
               //set the last entered GC to what actually got applied.
               if (lengthOfAvailableTotalArray > 0)
               {             
                              gcAppliedTotalArray[0].value = CurrencyFormatted(lastEnteredAppliedAmt,'','');
                              //WCS 7UP 4.6 merge1-Start
                              var appliedCards=$('.giftCardAppliedAmount').html();
                              //alert('first value='+$('.giftCardAppliedAmount:first').html());
                              if(appliedCards){
                                  var lastAppliedVal=CurrencyFormatted(lastEnteredAppliedAmt,'$',',');
                                  $('.giftCardAppliedAmount:first').html(lastAppliedVal); // first GC on the shown table is the last GC the user entered
								  
                              }
                              //WCS 7UP 4.6 merge1-End
               }
 
               // if there is a remainder, set the GC number that has the remainder (the last one entered)
               if  (lastRemAmount > 0) 
               {
                              document.forms[formName].lastRemNumber.value = gcNbrsArray[0].value;
               }
               else  // no remainder ..set the lastRemNumber to space
               {
                              document.forms[formName].lastRemNumber.value = '';
 
                             
               }
 
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: calculateGiftCardTotal()'  );
               }
              
 
}  // end function calculateGiftCardTotal
 
 
 
 
 
 
 
 
/*************************************************************************************************
*  Function:  adjustCheckoutUI
*                            This function will be called whenever we need to adjust the screen based off of user actions
*                            (adding/deleting Gift cards for instance or trying to submit an order and there is an error is antother instance). 
*                            It will apply all of the necessary business rules  as dictated by our users.
*
*  Parms:
*                            callingMethod    -              Anyone who calls this function must provide its name.  This is necessary
*                                                                                                       because we need to know when the call is from onLoad vs Ajax.
**************************************************************************************************/
function adjustCheckoutUI(callingMethod)
{
 
 
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: adjustCheckoutUI(callingMethod) ' +   callingMethod);
               }
 
 
 
  // the "callingMethod" variable is used to determine whether this method was called from the onLoad
  // function or not.         
              
               var DELETE_GC_VAL = 'deleteAppliedGiftCardRow';
               var labelArray = document.getElementsByTagName('label');
               var maxGCsAllowed = document.forms[formName].maxGCsAllowed.value;
               var nbrOfGCsToShowInTable = document.forms[formName].nbrOfGCsToShowInTable.value;
               var totalGC = document.forms[formName].totalGC.value;
               var totalCC = document.forms[formName].totalCC.value;              
               var gcAppliedTotalArray = document.getElementsByName('appliedGiftCardAmounts');
               var gcErrMsg = null;
               var gcErrMsgVal = '';
               var isCCSectionCollapsed = 'false';                           
               var appliedGiftCardTable = document.getElementById('myCards');
 
               isGiftCardTenderActiveValue = document.forms[formName].isGiftCardTenderActive.value;
 
			   // only get the val if the tax exempt feature is on
			   if(document.getElementById("taxId")){
					var taxExemptIdValue = document.getElementById("taxIdExemptNum").value;
			   }
 
 
 
// ===========================================================================================
// Gift Card error Section
// ===========================================================================================
               adjustGCError(callingMethod)
               gcErrMsg = document.forms[formName].gcErrorMsgs;
               if (gcErrMsg != null)
               {
                              gcErrMsgVal = gcErrMsg.value;  // gcErrMsgVal is used in multiple places in this function.
               }             
              
              
 
// ===========================================================================================
// Credit Card Section
// ===========================================================================================
/*
*  Set Credit Card visibility based on if there is a total needed for CC (totalCC NE 0)
*  When the Credit Card section is collapsed, we must clear out any inputted fields.
*  The user will have to re-input the CC info if CC section gets expanded again
*/          
  if (totalCC > 0) //there is a CC total .. we must have the CC section open.
  {
	if((document.getElementById('applied-cards-table').rows.length != 0)&& (taxExemptIdValue != null)) {
	}
	else{
		var registerType = document.getElementById("registerType").value;
		var profilesListTotal = document.getElementById("profilesListTotal").value;
          var cardBrandValue = document.PaymentMethodForm.cardBrand.value;

		if( (document.forms[formName].cardBrand.selectedIndex == 0) && (registerType != 'G'  &&  profilesListTotal >0 )){
		 document.PaymentMethodForm.cardBrand.value=document.getElementById('selectedCardBrand').value;
		 document.PaymentMethodForm.cardHolderName.value=document.getElementById('selectedCardHoldername').value;
		 document.PaymentMethodForm.cardNumberDisplayValue.value=document.getElementById('selectedCardNumberDisplayValue').value;
		 document.PaymentMethodForm.cardNumberOriginalDisplayValue.value=document.getElementById('selectedCardNumberOriginalDisplayValue').value;
		 document.PaymentMethodForm.cardNumber.value=document.getElementById('selectedCardNumber').value;
		 document.PaymentMethodForm.cardExpiryMonth.selectedIndex=document.getElementById('selectedCardExpMonth').value;
		 document.PaymentMethodForm.cardExpiryYear.value=document.getElementById('selectedCardExpYear').value;
		 document.PaymentMethodForm.cardVerificationCode.value=document.getElementById('selectedCardVerificationCodeValue').value;
		 document.PaymentMethodForm.poNumber.value=document.getElementById('selectedPoNumberValue').value;
		}
         ChangeDropdowns(cardBrandValue);
         $('.noBalanceDue').hide();
	}
  }  // end  if (totalCC > 0) 
  else //CC total == 0 .. we must have the CC section closed and values emptied.
  {           
               isCCSectionCollapsed = 'true';
               //WCS 7UP 4.6 merge1-Start
               $('.noBalanceDue').show();    
    document.forms[formName].cardBrand.selectedIndex=0;
	if((document.getElementById('applied-cards-table').rows.length != 0)&& (taxExemptIdValue != null)) {
	}
	else{
               ChangeDropdowns(cardBrandValue);
			   }
    document.getElementById('giftCardForm').style.display='NONE';
    document.getElementById('showGCForm').value="false";
    document.getElementById('addAnotherGc').style.display='NONE';
               // empty out any CC section values that the user may have entered                                                            
               document.forms[formName].cardHolderName.value='';
               if (document.forms[formName].cardBrand != undefined) {             
                              document.forms[formName].cardBrand.selectedIndex=0;
               }
               document.forms[formName].cardNumberDisplayValue.value='';
               document.forms[formName].cardNumberOriginalDisplayValue.value='';
               document.forms[formName].cardNumber.value='';
               //document.forms[formName].notifyOrderSubmitted.value='';
               if (document.forms[formName].cardExpiryMonth != undefined) { 
                              document.forms[formName].cardExpiryMonth.selectedIndex=0;
               }                            
               if (document.forms[formName].cardExpiryYear != undefined) {     
                              document.forms[formName].cardExpiryYear.selectedIndex=0;
               }
               document.forms[formName].cardVerificationCode.value='';
               if (document.forms[formName].poNumber != undefined) {            
                              document.forms[formName].poNumber.value='';
               }
  //WCS 7UP 4.6 merge1-End
// set focus on Gift card section (since we are collapsing, the GC section move up and we want the users to see the GC section
               focusOn = 'topOfGiftCardSection';
 
 
               // If this method is called from the onload section, it means that the user did an action that caused a server refresh (like try to check out),
               // If it's a server refresh, not not an AJAX call (like Apply or Delete GC's).
               if (callingMethod != ONLOAD_VAL) 
               // call came from AJAX. 
               //      Clear the contents of only the CC fields,
               //      Clear the error message and hide it.
               //      Set ALL fields in error back to normal (not only CC fields).
               {
 
                            
                              //clear and hide the error message
                              //had to put it inside of a try catch block because sometimes the customErrorMessage is unavailable. If it is unavailable, it's ok
                             //becuase it's not there so we don't have to clear anything out.
                              var customErrorMessage = document.getElementById('custom-error-message');
                              try
                              {
                                             if ( customErrorMessage != null)
                                             {
                                                            customErrorMessage.innerHTML = '';      
                                                            customErrorMessage.style.display='NONE';                                                                                                      
                                             }
                                            
                              }
                              catch(err)
                              {
                              }
                                                                                         
                              // loop thru all of the labels on the the screen remove any "error" class name associated with them.
                              // by removing the class name on the label, the label will revert to it's normal "non error" class on the TD.   
                              var labelArray = document.getElementsByTagName('label');
                              for(var i=0;i<labelArray.length;i++)
                              {
                                             if ( labelArray[i].className == 'error' )
                                             {
                                                            labelArray[i].className = '';                                                                    
                                             }
                              }  // end for
                             
               }  // end if (callingMethod != ONLOAD_VAL)
               else // calling method was ONLOAD_VAL...clear out GC error message
               {
                              gcErrMsgVal = null;
               }
 
  }  //end else (CC total == 0)
 
 
 
// ===========================================================================================
// Gift Card Section
// ===========================================================================================
 
  //set the height of the applied gift card section  (The table of applied gift cards)
 
                 focusOnAppliedTable = 'false'; 
  
                 if (gcAppliedTotalArray.length <= 0)
                 {
                              //appliedGiftCardTable.style.height='1px';
                              //appliedGiftCardTable.overflow='NONE';             
 
                 }
                 else if (gcAppliedTotalArray.length <= nbrOfGCsToShowInTable)
                 {
                  //         var rowHeight = (gcAppliedTotalArray.length * 43) + 'px'; 
                              //appliedGiftCardTable.style.height=rowHeight; 
                 //          appliedGiftCardTable.overflow='NONE';                              
 
                 }
                 else  // more than number we want to show -- set the div to correct px's
                 {
                              //var rowHeight = (nbrOfGCsToShowInTable * 43) + 'px'; 
                              //appliedGiftCardTable.style.height=rowHeight; 
                              //appliedGiftCardTable.overflow='scroll';              
 
                             if ( isCCSectionCollapsed != 'true' ) // If the Credit card section is collapsed...don't override the current focus
                             {             
                                            if (callingMethod != ONLOAD_VAL) // if the calling method is from the ONLOAD // this anchor is hidden and we can't set focus
                                            {                                           
                                                            focusOnAppliedTable = 'true';
                                             }                                                         
                              }  //end if ( isCCSectionCollapsed != 'true' )
               } // end else ( more than number we want to show )
              
               //Figure out if the user is allowed to collapse the GC section
               //(rule is that if we have at least one GC that has been applied, user cannot collapse the section)
 
               if (gcAppliedTotalArray.length > 0)  // we have at least 1 applied gift card
                 {
                              showOrHideGC(true);//document.getElementById('giftCard').style.display='block';                //remove the button from the header if there are applied gift cards
                             
                              isGiftCardSectionCurrentlyVisible = true;
                              focusOn = 'topOfGiftCardSection';      
                 }
                 else  // no GC's applied, now check to see if there is a GC error.  If there is, we need to make GC section visible so that the user sees the error
                 {
                              if (gcErrMsgVal != null && gcErrMsgVal.length > 0 )  // No applied GC's but there is a GC error, gc section shoud NOT be hidden.
                              {
                                // document.getElementById('gc_show_hide_img').src = MINUS_IMG_VAL;  // set the minus image
                                // document.getElementById('gc_show_hide_img').style.display='inline';
                                             showOrHideGC(true);//document.getElementById('giftCard').style.display='block';
                     isGiftCardSectionCurrentlyVisible = true;          
                              }
                              else  // no applied gift cards and no errors, check to see if we have no applied GC becuase the user deleted the last one (we still want GC section to be visible in this condition)
                              {
                                             if ( callingMethod == DELETE_GC_VAL && gcAppliedTotalArray.length > 0)  // no GC's becuase the user deleted the last one -- GC section should be visible.  // no GC's becuase the user deleted the last one -- GC section should be visible.
                                             {
                                               // document.getElementById('gc_show_hide_img').src = MINUS_IMG_VAL;  // set the minus image                  
                                               // document.getElementById('gc_show_hide_img').style.display='inline';
                                    document.getElementById('giftCardSection').style.display='block'; 
                     isGiftCardSectionCurrentlyVisible = true;          
                                             }
                                             else // no GC's , no Errors.  Now figure out if the user has inputted any data
                                             {
                                                            var gcNbrInput                                                               = document.forms[formName].giftCardNumber.value;
 
                                                            // no GC's , no Errors but user has inputted some GC data -- GC section should be visible
                                                            if ( gcNbrInput != null && gcNbrInput.length > 0  )  
                                                            {
                                                                // document.getElementById('gc_show_hide_img').src = MINUS_IMG_VAL;  // set the minus image                            
                                                                // document.getElementById('gc_show_hide_img').style.display='inline';
                                                                           showOrHideGC(true);//document.getElementById('giftCard').style.display='block';
                                                     isGiftCardSectionCurrentlyVisible = true;        
                                                            }
                                                            else // no GC's , no Errors, no user Input --  the GC Section should be hidden.
                                                            {
                    /*
                    document.getElementById('gc_show_hide_img').src = PLUS_IMG_VAL;  // set the plus image                                                
                                                             document.getElementById('gc_show_hide_img').style.display='inline';
                                                 document.getElementById('giftCardSection').style.display='none';                                                       
                    isGiftCardSectionCurrentlyVisible = false;
                    */
                                                                           showOrHideGC(false);//document.getElementById('giftCard').style.display='none';
                                                     isGiftCardSectionCurrentlyVisible = true;                                                          
                }
                                             }
                              }  // end else (no GC's applied, no errors, check to see if the user deleted the last one.
                 } // end else (no GC's applied, now check if there is a GC error.
 
 
// ===========================================================================================
// Captcha section
// ===========================================================================================
               if (totalCC > 0)  //CC still has a total...user can still apply more GC's (as long as they haven't applied more than the max)
               {
                              if (gcAppliedTotalArray.length >= maxGCsAllowed)  //if user has applied max number of GC's allowed, hide the captcha section
                              {
                              //document.getElementById('captcha-section').style.display='NONE' ;
                                             //WCS 7UP 4.6 merge1-Start
                                               document.getElementById('giftCardForm').style.display='NONE' ;
                                               document.getElementById('showGCForm').value="false";             
                                               document.getElementById('addAnotherGc').style.display ='NONE';
                              }
                              else
                              {
                              //The Add another card text is not showing
                                               if( !$('#addAnotherGc').is(':visible')){                        
                                                   document.getElementById('giftCardForm').style.display='block' ;                                           
                                                   document.getElementById('showGCForm').value="true";                                    
                                               }
                              }
              
                 }  // endif (totalCC > 0)
                 else  // totalCC <= 0
                 {   
                                //document.getElementById('myCardsAppliedCards').style.display='block';
                     document.getElementById('myCards').style.display='block';
                     document.getElementById('appliedCardsText').style.display='block';           
                     document.getElementById('giftCardForm').style.display='NONE';
                     document.getElementById('showGCForm').value="false";
                                //document.getElementById('captcha-section').style.display='NONE';
                 }
              
                // If the gift card has an error -- refresh everything except for GC # otherwise refresh all captcha input fields because the GC was good and
               // got applied
               if ( gcErrMsgVal  != null && gcErrMsgVal.length > 0 )
               {
                             //adjustCaptchaUI(KEEP_GIFT_CARD);          
                }
               else  // no errors
               {
                             if (callingMethod == ONLOAD_VAL)   // refresh from server, if the user inputted any GC fields, keep everything but the PIN
                             {
                                             adjustCaptchaUI(CLEAR_PIN);        // Keep everything but the GC PIN (like CC section is today)   
                              }
                              else if (callingMethod == DELETE_GC_VAL)   // call coming from the delete GC function, keep everything but the PIN
                             {
                                             //Payment redesign does requires PIN to persist even on a delete of another GC
                                             //adjustCaptchaUI(CLEAR_PIN);    // Keep everything but the GC PIN (like CC section is today) 
                              }
                              else // not coming from server refresh or Delete function, it's coming from the AJAX and no GC errors (means that the GC was applied) ... clear all GC input fields
                              {
                                             adjustCaptchaUI(CLEAR_ALL);        // Clear everything
                              }
                             
                } 
 
 
// ===========================================================================================
// PAID WITH GC / CC ROWS section  and legal jargon for GC's
// ===========================================================================================
               var toBePaidWithGiftCardArray = getElementsById('PaidWithGiftCardRow','Y');
               var toBePaidWithCreditCardArray = getElementsById('paidWithCreditCardRow','Y');
               var legalGCJargonArray = getElementsById('dctm-frag-apply-gc-first','Y'); 
               var showHideStyle;
              
               // if totalGC is greater than zero (user has at least one GC applied), show the "To be paid with" lines and GC legal jaron
               if ( totalGC > 0)
               {
                   if ( NETSCAPE_VAL.toLowerCase() == browserAppName )  //ie doesn't know about 'table-row'
                   {
                              showHideStyle = 'table-row'; 
                   }
                   else
                   {
                              showHideStyle = 'block';
                   }
 
               }  //endif ( totalGC > 0)
               else
               {
                              showHideStyle = 'NONE';
               }
              
              
//NOTE: we are looping thru the array becuase the business wanted the subtotals in 2 different places on the page so we have
//      to hide/show the lines rows in 2 places.
              
               for(var i=0;i<toBePaidWithGiftCardArray.length;i++)
               {             
                 toBePaidWithGiftCardArray[i].style.display=showHideStyle;         
               }
              
               for(var i=0;i<toBePaidWithCreditCardArray.length;i++)
               {             
                 toBePaidWithCreditCardArray[i].style.display=showHideStyle;                    
               }
              
              
               for(var i=0;i<legalGCJargonArray.length;i++)
               {             
                 legalGCJargonArray[i].style.display=showHideStyle;                       
               }
              
 
// ===========================================================================================
// GIFT CARD ENTRY section
// ===========================================================================================
/*
*  We don't want to show gift card entry section if gift card tender is not active 
*  AND we only want to do this if the calling method is "onLoad".  If the call is coming from AJAX (not onLoad)
*  then the setting of visibility is coming from applyGiftCardCallBack();
*/
               if (callingMethod == ONLOAD_VAL) 
               {
                              if (isGiftCardTenderActiveValue == "true" && totalGC > 0)  //it is active
                              {
                                             showOrHideGC(true);//document.getElementById('giftCard').style.display='block';
											 
                              }
                              else  // it is not active
                              {                           
                                             showOrHideGC(false);//document.getElementById('giftCard').style.display='NONE';
                              }
               }
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: adjustCheckoutUI(callingMethod) ' +   callingMethod);
               }
 
             
 
} //end function adjustCheckoutUI
 
 
 
 
 
/*************************************************************************************************
*  Function: adjustGCError
*                            Adjusts the gift card error section (sometimes we need to change the error message) 
*       This will also set the appropriate Omniture message.
*
*  Parms:
*                            callingMethod    -              Anyone who calls this function must provide its name.  This is necessary
*                                                                                                       because we need to know when the call is from onLoad vs Ajax.
 
**************************************************************************************************/
function adjustGCError(callingMethod)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: adjustGCError(' + callingMethod + ')');
               }
/*
*  If this function was called from onLoad, empty out the gift-card-errors div.  We don't want
*  to show any errors that came from the full screen refresh.  This error section should only
*  display errors when the user tries to "apply gift card"
*/
 
 
               var gcErrMsg = null;
               var gcErrMsgVal = null;
                             
 
               gcErrMsg = document.forms[formName].gcErrorMsgs; 
               if (gcErrMsg != null)
               {
                              gcErrMsgVal = gcErrMsg.value;
               }
 
    // If the calling method is coming from onLoad, that means it was a server refresh (like user tried to checkout).  If this is the case
    // we want to clear out any GC errors that may have previously existed.               
               if (callingMethod == ONLOAD_VAL) 
               {
                              document.getElementById('gift-card-errors').innerHTML ='';
                              gcErrMsgVal = '';
                              //adjustCaptchaUI(CLEAR_PIN); //keep everything but the PIN (like CC section does today)
               }
               else // not from on load (coming from AJAX).  Check to see if there are any Gift Card Server Error messages and set the error message in the HTML
               {
                  if ( gcErrMsgVal != null && gcErrMsgVal.length > 0 )
                  {
 
                                             var genericUserMsg         = gcUserErrorMsg;
                                             var genericSystemMsg    = gcSystemErrorMsg;
                                             var captchaErrorMsg       = gcCaptchaErrorMsg;
                                             var zeroBalanceError    = gcZeroBalanceErrorMsg;
                                             var zeroBalanceErrorMsg = null;
                                            
                                             if (zeroBalanceError != null)
                                             {
                                                            zeroBalanceErrorMsg = zeroBalanceError.value;
                                             }
                                            
                                             var messageToShow = gcErrMsgVal;
 
                                             if (gcErrMsgVal == genericUserMsg)  // user error
                                             {
 
                                                            messageToShow = genericUserMsg;
                                                            omnitureMsg = OMNITURE_USER_ERR_VAL;
 
                                             }
                                             else if (gcErrMsgVal ==  captchaErrorMsg)  //Invalid Captcha error
                                             {             
 
                                                            messageToShow = genericUserMsg;
                                             omnitureMsg = OMNITURE_CAPTCHA_ERR_VAL;
                                                           
                                             }
                                             else if (gcErrMsgVal ==  zeroBalanceErrorMsg)  //Zero Balance error
                                             {             
 
                                                            messageToShow = zeroBalanceErrorMsg;
                                             omnitureMsg = OMNITURE_USER_ERR_VAL;
                                                           
                                             }
                                             else if (gcErrMsgVal == genericSystemMsg)  //system error
                                             {
 
                                                            messageToShow = genericSystemMsg;
                                             omnitureMsg = OMNITURE_SYSTEM_ERR_VAL;
                                             }
 
                                             updateLiveChatErrorCount();
                                             document.getElementById('gift-card-errors').innerHTML ='<span class="error">' + messageToShow +  '</span>';
                                             adjustCaptchaUI(KEEP_GIFT_CARD);
              
                  }  //end if ( gcErrMsgVal != null && gcErrMsgVal.length > 0 )
                  else // no GC errors 
                  {                                        
                                             omnitureMsg = '';
                  }
               }  //end else not from on load (coming from AJAX).  Check to see if there are any Gift Card Server Error messages and set the error message in the HTML
 
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: adjustGCError(' + callingMethod + ')');
               }
 
}  // end adjustGCError(callingMethod)
//WCS 7UP 4.6 merge1-Start
/*************************************************************************************************
*  Function: updateLiveChatErrorCount
*                            Updates errorcounter to live person chat
* 
**************************************************************************************************/
function updateLiveChatErrorCount(){
    //The s object enables us to look up the bread crumb value, if we can get the bread crumb value
    //make sure that this gets executed only from the payment method page
    if(CI_Page_Name){
        var thePageName=CI_Page_Name;
     //   var paymentMethodIndex=thePageName.indexOf('method_payment method');
        var paymentMethodIndex=thePageName.indexOf('PAYMENTMETHOD');
        //Make sure we are on the payment method page
        if(-1!=paymentMethodIndex){
            lpAddVars('page','ErrorCounter',1);
            if (debugVal == 'true')
                       {
                alert('called lpAddVars thePageName='+thePageName);
            }
        }
        else{
            //On successive tries after an initial failure, the s.pageName value is:
            //"check inventory>product availability" in the PaymentMethod.jsp page
            paymentMethodIndex=thePageName.indexOf('product availability');
            if(-1!=paymentMethodIndex){
                lpAddVars('page','ErrorCounter',1);
                if (debugVal == 'true')
                           {
                    alert('called lpAddVars thePageName='+thePageName);
                }
            }           
        }  
    }
    //if the s object is not resolvable, just go ahead and add the live person chat ErrorCounter
    else{
        lpAddVars('page','ErrorCounter',1);
        if (debugVal == 'true')
                   {
            alert('called lpAddVars thePageName='+thePageName);
        }
    }    
   
}
//WCS 7UP 4.6 merge1-End
 
 
/*************************************************************************************************
*  Function: adjustCaptchaUI
*                            Adjusts the capchta section of the page depending on the state that it needs to be in.  This
*       adjustment occurs after the ajax call to try to apply a gift card or get the balance of a GC
*
*  Parms:
*                            stateOfAdjusment            - The state that the function needs to adjust the captcha section for
*                                                                                                         either CLEAR_ALL or KEEP_GIFT_CARD. 
**************************************************************************************************/
function adjustCaptchaUI(stateOfAdjusment)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: adjustCaptchaUI(stateOfAdjusment) '  +  stateOfAdjusment);
               }
 
// The Captcha section on the GC PIP page is not on form 0 so I have to check the page name and adjust it.
    if (formName == 0) // what it is initially set to and it's called on the initial load of the page)
    {
                             setFormName()
    }
   
//    formName = 'OrderItemAddForm';
               var giftCardNbr = document.forms[formName].giftCardNumber;
               var pinNbr = document.forms[formName].pinNumber;
               var captchaTxt = document.forms[formName].captchaVerification;
 
 
  if (CLEAR_ALL == stateOfAdjusment)
  {
               giftCardNbr.value = '';
               pinNbr.value = '';
              
  } 
  else if (KEEP_GIFT_CARD == stateOfAdjusment)
  {
               //pinNbr.value = '';
               captchaTxt.value = '';     
  }
   else if (CLEAR_PIN == stateOfAdjusment)
  {
               pinNbr.value = '';
  }
   else if(KEEP_GC_PIN == stateOfAdjustment)
   {
     captchaTxt.value = '';
   }
  else  // some other .. clear everything
  {
               giftCardNbr.value = '';
               pinNbr.value = '';
               captchaTxt.value = '';                    
  }
 
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: adjustCaptchaUI(stateOfAdjusment) '  +  stateOfAdjusment);
               }
}  // end function adjustCaptchaUI
 
 
/*************************************************************************************************
*  Function: setFormName
*                            This function sets the form name of the particular form that needs to be set. This was needed
*                            because in Checkout, we could use form[0] but that is not the case for the GC Pip page. 
*       Note: formName is used throughout the function modules.
*
*  Parms:
*                            NONE
**************************************************************************************************/
function setFormName()
{
               if (CI_Page_Name == 'GC_PIP_PAGE') //gift card PIP page
               {  
                              formName = GIFT_CARD_BALANCE_FORM_NAME;
               }
               else if(CI_Page_Name == 'ORDER_SUMMARY' )  // checkout page
               {
                              formName = CHECKOUT_FORM_NAME
               }
}
 
 
 
/*************************************************************************************************
*  Function: CurrencyFormatted
*                            This function reads in a number and based upon parameters explained below, will
*       return a number that is formated as currency (2 decimal places to the right)
*  Parms:
*     num                                                            - the number that needs to be converted
*     currencySymbol         - the symbol to place at the beginning of the number ('' is valid)
*     currencySeprator      - the seperator to use when the number becomes greater than 999 ('' is valid)
**************************************************************************************************/
function CurrencyFormatted(num, currencySymbol, currencySeprator)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: CurrencyFormatted(num, currencySymbol, currencySeprator)' + num + ',' + currencySymbol + ',' + currencySeprator  );
               }
 
 
              
               num = num.toString().replace(/\$|\,/g,'');
               if(isNaN(num))
               num = "0";
               sign = (num == (num = Math.abs(num)));
               num = Math.floor(num*100+0.50000000001);
               cents = num%100;
               num = Math.floor(num/100).toString();
               if(cents<10)
               cents = "0" + cents;
               for(var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
               num = num.substring(0,num.length-(4*i+3))+ currencySeprator + num.substring(num.length-(4*i+3));
 
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: CurrencyFormatted(num, currencySymbol, currencySeprator)' + num + ',' + currencySymbol + ',' + currencySeprator  );
               }
 
               return (((sign)?'':'-') + currencySymbol + num + '.' + cents);
} // end CurrencyFormatted
 
 
 
 
 
 
 
/*************************************************************************************************
*  Function:  checkNumber
*                            This function takes in a text value and strips all known currency symbols out of it.  It then
*                            checks to see if the stripped number is indeed a number.  If it is a number, it returns itself.  If it is not
*       a number, it returns 0.
*  
*  Parms:
*                            number                - the number which needs to be checked.
**************************************************************************************************/
function checkNumber(number)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: checkNumber(number)' + number  );
               }
 
               number = number.replace(/\$/g, '').replace(/,/g, '').replace(/\(/g, '-').replace(/\)/g, '').replace('&nbsp;','').replace('&#160;', '');
              
               number = leftTrim(number);
              
 
               if( isNaN(number) )
               {
                  return (0*1);
               }
               else
               {
                  return (number*1);
               }
                             
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: checkNumber(number)' + number  );
               }
} // end checkNumber(number)
 
 
 
 
 
/*************************************************************************************************
*  Function:  getElementsById
*                            This function returns back all elements with the specified id.  This was needed because
*       FireFox doesn't support getElementsByName if it is an id.
*  
*  Parms:
*                            id            - the id of the element(s) that needs to be returned.
**************************************************************************************************/
function getElementsById(id, useGroupCache)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: getElementsById(' + id + ')'  );
               }
              
               var nodes;
              
               // I had to put in the useGroupCache in because the getelementById will return null if the id is hidden.
               // but the group cache messes up when you have a growing table of id's.
               if ('Y' == useGroupCache.toUpperCase() )
               {
                              if(!groupCache[id])
                              {
                              groupCache[id] = [];
                              }
                              nodes = groupCache[id];
                              for(var x=0; x<nodes.length; x++)
                              {
                                             if(nodes[x].id != "")
                                             {
                                                            nodes.splice(x, 1);
                                                            x--;
                                             }
                              }
               }
               else
               {
                              nodes = [];
               }
 
 
 
  var tmpNode = document.getElementById(id);
 
  while(tmpNode)
  {
    nodes.push(tmpNode);
    tmpNode.id = "";
    tmpNode = document.getElementById(id);   
  }
 
               if (debugVal == 'true')
               {
                 alert( "Total no. of nodes returned:" +nodes.length );
                   for(var i=0; i<nodes.length;i++)
                                {
                                             alert (id + '[' + i + ']' + nodes[i].innerHTML);
                                }
               }
 
 
 
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: getElementsById(' + id + ')'  );
               }
 
               return nodes;
} // end getElementsById(id, useGroupCache)
 
 
 
 
/*************************************************************************************************
*  Function:  popWhereIsMyGiftCardPin
*                            This function will open the gift-card-pin layer and set focus to it.
*
*  Parms:
*                            None
**************************************************************************************************/
function popWhereIsMyGiftCardPin()
{ 
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: popWhereIsMyGiftCardPin()');
               }
 
               openLayer('gift-card-pin');
               focusOnAnchor('popupFocusArea');
              
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: popWhereIsMyGiftCardPin()');
               }
              
} // END popWhereIsMyGiftCardPin()
 
 
 
 
 
 
/*************************************************************************************************
*  Function:  focusOnAnchor
*                            This function will set focus on an anchor.  Based on browser name
*
*  Parms:
*                            anchorName      -              The name of the anchor that needs focusing set
**************************************************************************************************/
 
function focusOnAnchor(anchorName)
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: focusOnAnchor(' + anchorName + ')'  );
               }             
              
 
 
               if ( NETSCAPE_VAL.toLowerCase() == browserAppName ) 
               {
                              var anchorsArray = document.anchors;
                              var anchorsArrayLength = anchorsArray.length; 
              
                              for (var i=0;i<anchorsArrayLength;i++)
                              {
                                             if ( anchorName == anchorsArray[i].name )
                                             {
                                                            anchorsArray[i].focus();
                                                            break;
                                             } // end if
                              } // end for
               } // end if netscape browser
               else // for all other browsers
               {
                              var anchorObject = document.getElementById(anchorName);
                              if (anchorObject != null)
                              {
                                             anchorObject.focus();
                              }
               }
                             
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: focusOnAnchor(' + anchorName + ')'  );
               }
 
} // end focusOnAnchor(anchorName)
 
 
 
/*************************************************************************************************
*  Function:  callOmniture
*                            This function will set the required omniture fields needed for Giftcard balance and will then
*                            call ominture with them
*
*  Parms:
*                            msg -- the message to set in omniture.
**************************************************************************************************/
function callOmniture(msg)
{
 
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: callOmniture(' + msg + ')'  );
 
               }
 
               try
               {
                              var GIFT_CARD_BALANCE_CHECK_VAL = '>giftcard balance check';
                              var origPageName = s.pageName.replace(GIFT_CARD_BALANCE_CHECK_VAL,'');
                             
 
                              s.linkTrackVars='prop27,events';                // tell Omniture what fields that you will be tracking
                              s.prop27 = msg;                                                                            // set the error message to what was passed in ('<space>' will not produce an error message in Omniture)
                              s.linkTrackEvents = 'event10';       // tell Omniture what events that you will be tracking
                              s.events = 'event10';                                                     // set the events to a page event.
              
                              s.pageName = origPageName + GIFT_CARD_BALANCE_CHECK_VAL;           // set the page name for Omniture
 
//                           s.tl(omnitureLinkTrackingObject,'e','giftcard balance check');
                              s.t();
 
               }
               catch(e)
               {             
               }
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: callOmniture(' + msg + ')'  );
               }
              
}   // end callOmniture(msg)
 
 
/*************************************************************************************************
*  Function:  gcNumbersOnly(event)
*                            This function gets called when the user types data into the GC number or GC PIN fields.
*                            It ultimately calls the nubmersOnly(event) function in utils.js to check if it is indeed
*       a number.  I just extended that function to allow the user to click additional keys (like insert)
*       to help them in editing the number
*
*  Parms:
*                            event -- The onKeyPress event
**************************************************************************************************/
function gcNumbersOnly(event)
{
 
// keys that we will allow in addition to numbers -- BEGIN
               var BACK_SPACE = 8;
               var TAB = 9;
               var END_KEY  = 35;
               var HOME_KEY = 36;
               var INSERT = 39;
               var DELETE = 46;
               var LEFT_ARROW = 37;
               var RIGHT_ARROW = 39;
 
// keys that we will allow in addition to numbers -- END
               var keynum;       
              
               if(event.keyCode)
               {
                              keynum = event.keyCode;
               }
               else if(event.which)
               {
                              keynum = event.which;
               }
               else if (event.charCode)
               {
                              keynum = event.charCode;
               }             
              
               if (          (keynum == BACK_SPACE)
                              ||           (keynum == TAB)
                              ||           (keynum == INSERT)
                              ||           (keynum == DELETE)
                              ||           (keynum == LEFT_ARROW)
                              ||           (keynum == RIGHT_ARROW)
                              ||           (keynum == HOME_KEY)
                              ||           (keynum == END_KEY)
 
 
                              )
               {
                              return true;
               }
               else
               {             
                              return numbersOnly(event);
               }
}  // end gcNumbersOnly(event)
 
 
 
/*************************************************************************************************
*  Function:  leftTrim(str)
*                            Trim all beginning white space from a string
*
*  Parms:
*                            str -- the string that you want lett trimmed
**************************************************************************************************/
function leftTrim(str)
{
               var i;
               var len = str.length;
              
               for( i=0; i<len; i++ )
               {
                              if( str.charCodeAt(i) == 160 )
                              {
                                             str = str.substring(1, str.length );
                                             i--;  
                                             len--;
                              }
                              else
                              {
                                             break;
                              }
               }
              
               return str;
}
 
 
 
 
/*************************************************************************************************
*  Function:  alertGCFields
*                            This function was added purely for degbug purposes
*
*  Parms:
*                            None
**************************************************************************************************/
function alertGCFields()
{
               if (debugVal == 'true')
               {
                              alert ('ENTERING Function: alertGCFields()'  );
               }
              
               var totalGC = document.forms[formName].totalGC.value;
               var totalCC = document.forms[formName].totalCC.value;              
               var totalOrder = document.forms[formName].totalOrder.value;   
               var lastRemNumber = document.forms[formName].lastRemNumber.value;
               var lastRemAmount = document.forms[formName].lastRemAmount.value;
               var maxGCsAllowed = document.forms[formName].maxGCsAllowed.value;
    var nbrOfGCsToShowInTable = document.forms[formName].nbrOfGCsToShowInTable.value;
 
               var gcNbrsArray = document.getElementsByName('appliedGiftCardNbrs');  
               var gcAppliedTotalArray = document.getElementsByName('appliedGiftCardAmounts');
               var gcAvailableTotalArray = document.getElementsByName('availableGiftCardAmounts');
               var gcEncryptedGCArray = document.getElementsByName('encryptedGiftCardNbrs');          
               var gcReservedGCArray = document.getElementsByName('giftCardReserves');       
               var arrayLength = gcNbrsArray.length;
              
               var cardHolderName = document.forms[formName].cardHolderName.value;
              var cardBrand = '';
              if (document.forms[formName].cardBrand != undefined) {
       cardBrand = document.forms[formName].cardBrand.value;
    }
              cardBrand = document.forms[formName].cardBrand.value;
              var cardNumberDisplayValue = document.forms[formName].cardNumberDisplayValue.value;
               var cardNumberOriginalDisplayValue = document.forms[formName].cardNumberOriginalDisplayValue.value;
               var cardNumber = document.forms[formName].cardNumber.value;
               //var notifyOrderSubmitted = document.forms[formName].notifyOrderSubmitted.value;
               var cardExpiryMonth = '';
               if (document.forms[formName].cardExpiryMonth != undefined) {
       cardExpiryMonth = document.forms[formName].cardExpiryMonth.value;
    }
    var cardExpiryYear = '';
               if (document.forms[formName].cardExpiryYear != undefined) {
       cardExpiryYear = document.forms[formName].cardExpiryYear.value;
    }
               var cardVerificationCode = document.forms[formName].cardVerificationCode.value;
               var poNumber = '';
               if (document.forms[formName].poNumber != undefined) {
       poNumber = document.forms[formName].poNumber.value;
    }
               var gcErrorMsgs = document.forms[formName].gcErrorMsgs.value; 
              
              
               var gcRow = '';
                             
               for(var i=0;i<arrayLength;i++)
               {                            
                  gcRow = gcRow
                + '[' + i + ']  GC#:' + gcNbrsArray[i].value + '\t'
                + '    Available Amt:' + gcAvailableTotalArray[i].value + '\t'                
                + '    Applied Amt:' + gcAppliedTotalArray[i].value + '\t'
                + '    Reserved Amt:' + gcReservedGCArray[i].value + '\t'
               + '    Encrypted:' + gcEncryptedGCArray[i].value + '\n' + '\n' ;
 
               }
 
               alert(
                 "totalOrder [" + totalOrder + "]" + "\n"
               + "totalGC [" + totalGC + "]" + '\n' 
               + "totalCC [" + totalCC + "]" + '\n'  + '\n' 
               + "lastRemNumber [" + lastRemNumber + "]" + "\n"
               + "lastRemAmount [" + lastRemAmount + "]" + "\n" + "\n"
               + gcRow + '\n' + '\n'
               + "isGiftCardTenderActive [" + isGiftCardTenderActiveValue + "]" + "\n"
               + "maxGCsAllowed [" + maxGCsAllowed + "]" + "\n"
               + "nbrOfGCsToShowInTable [" + nbrOfGCsToShowInTable + "]" + "\n" + "\n" + "\n"
               + "cardHolderName [" + cardHolderName + "]" + "\n"
               + "cardBrand [" + cardBrand + "]" + "\n"
               + "cardNumberDisplayValue [" + cardNumberDisplayValue + "]" + "\n"
               + "cardNumberOriginalDisplayValue [" + cardNumberOriginalDisplayValue + "]" + "\n"
               + "cardNumber [" + cardNumber + "]" + "\n"
               + "notifyOrderSubmitted [" + notifyOrderSubmitted + "]" + "\n"
               + "cardExpiryMonth [" + cardExpiryMonth + "]" + "\n"
               + "cardExpiryYear [" + cardExpiryYear + "]" + "\n"
               + "cardVerificationCode [" + cardVerificationCode + "]" + "\n"
               + "poNumber [" + poNumber + "]" + "\n"                
               + "gcErrorMsgs [" + gcErrorMsgs + "]" + "\n"         
 
               );  
              
               if (debugVal == 'true')
               {
                              alert ('EXITING Function: alertGCFields()'  );
               }
              
}  //end alertGCFields
 
 
 
 
 
              
/*************************************************************************************************
*  Function:  alertAppliedGCs
*                            This function was added purely for degbug purposes
*
*  Parms:
*                            None
**************************************************************************************************/
function alertAppliedGCs()
{
               alert(document.getElementById('applied-cards-table').innerHTML);
}
 
function changeDebugVal(str)
{
               debugVal = str.toLowerCase();
               alert ('debugVal[' + debugVal + ']');
}
 
 
function ccCharsOnlyWithCheck(e)
{
               var cardBrandVal = document.PaymentMethodForm.cardBrand.value ;
               if(cardBrandVal == "HDCOM"){
                              if(document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.length>21){
                                             document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value=
                                                            document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.substring(0,21);
                                             return false;
                              }
                              else if(document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.length==21){
                                             // Added WCS7Up CodeMerge 4.5.2 STARTS
                                             if(!(e.keyCode==8 || e.keyCode== 46))
                                             // Added WCS7Up CodeMerge 4.5.2 ENDS
                                             return false;
                              }
                              else
                              {                            
                                             ccCharsOnly(e); 
                              }
               }
               else{
                              if(document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.length>19){
                                             document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value=
                                                            document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.substring(0,19);
                                             return false;
                              }
                              else if(document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.length==19){
                                             // Added WCS7Up CodeMerge 4.5.2 STARTS
                                             if(!(e.keyCode==8 || e.keyCode== 46))
                                             // Added WCS7Up CodeMerge 4.5.2 ENDS
                                             return false;
                              }
                              else
                              {                            
                                             ccCharsOnly(e); 
                              }
               }             
}
 
function trimCardValue()
{
               var cardBrandVal = document.PaymentMethodForm.cardBrand.value ;
 
               if(cardBrandVal!="HDCOM"){
                                             if(document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.length>19){
                                                            document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value=
                                                                           document.getElementById('WC_StandardCreditCard_FormInput_cardNumber_2').value.substring(0,19);
                                             }             
                              }
 
 
}  // end function trimCardValue
 
/*************************************************************************************************
*  Function:  clearCreditCardFields
*                            This function is responsible for clearing the credit card fields on the checkout page
*       a kiosk and a credit card value has not been entered.
*
*  Parms:
*                            none
**************************************************************************************************/
function clearCreditCardFields()
{
               if (debugVal == 'true')
               {
                              alert("Entering clearCreditCardFields()");
               }
              
               document.PaymentMethodForm.cardHolderName.value =    '';
               document.PaymentMethodForm.cardNumber.value = '';
               document.PaymentMethodForm.cardNumberDisplayValue.value = '';                        
               document.PaymentMethodForm.cardNumberOriginalDisplayValue.value = '';                        
               document.PaymentMethodForm.cardVerificationCode.value = '';
               if (document.PaymentMethodForm.cardBrand != undefined) {
       document.PaymentMethodForm.cardBrand.selectedIndex = 0;
    }
    if (document.PaymentMethodForm. cardExpiryMonth != undefined) {
        document.PaymentMethodForm.cardExpiryMonth.selectedIndex = 0;
    }
    if (document.PaymentMethodForm. cardExpiryYear != undefined) {
        document.PaymentMethodForm.cardExpiryYear.selectedIndex = 0;
               }             
               if (debugVal == 'true')
               {
                              alert("Exiting clearCreditCardFields()");
               }             
}              // end function clearCreditCardFields
 
 
 
 
/*************************************************************************************************
*  Function:  checkForKiosk
*                            This function is responsible for showing the Swipe card popup when the request is coming from
*       a kiosk and a credit card value has not been entered.
*
*  Parms:
*                            idToShow:  The id of the swipe card screen that will need to pop.
**************************************************************************************************/
   function checkForKiosk(idToShow)
   {
              
               if (debugVal == 'true')
               {
                              alert("Entering checkForKiosk(" +idToShow+ ")");
               }
 
                              if ( isComingFromKiosk() )  //request is coming from our kiosk at at stores
                              {             
                                             // Create the THD_KIOSK cookie with the kioskID.
                                             createCookie("THD_KIOSK", SiteKiosk.ScriptDispatch.getKioskID() );                           
              
                                             // set the request param so that confirmation page will know
                                             document.PaymentMethodForm.isKioskRequest.value = true;       
                                            
//            the resquest is coming from our kiosk, now check to see if there is a card reader present.
//                                          creditCard = isCardReaderAvailable(); 
              
                                             creditcard = SiteKiosk.Plugins("SiteCash").Devices("CreditCard");
                                            
                                             if (debugVal == 'true')
                                             {
                                                            alert('Card reader was found');                                 
                                             }
                                            
                                             setupTheEventHandlers(creditcard);
                                            
                                             if (document.PaymentMethodForm.cardNumber.value == null || document.PaymentMethodForm.cardNumber.value.length <=0)
                                             {
                                                 openLayer(idToShow);               // pop the swipe card section.                                  
                                                            loadLightBox(idToShow);  // make the popup a light box
                                             }  // end if of credit card not null check
                              }
                              else  // kiosk is not coming from kiosk  -- Regular user
                              {
                                             // set the request param so that confirmation page will know                                                                                   
                                             document.PaymentMethodForm.isKioskRequest.value = false; 
                              } // end else statement
 
               if (debugVal == 'true')
               {
                              alert("Exiting checkForKiosk(" +idToShow+ ")");
               }
                             
  } // end function checkForKiosk
  
 
 
 
 
/*************************************************************************************************
*  Function:  cancelCardSwipe
*             function that represents the user action of cancel on the card swipe page 
*
*  Parms:
*             idToHide:  the id of the div that needs to be hidden
**************************************************************************************************/
               function cancelCardSwipe(idToHide)
               {
                              if (debugVal == 'true')
                              {
                                             alert("Entering cancelCardSwipe(" +idToHide+ ")");
                              }                            
                                             closeLayer("swipeCard");                                                 // user hit cancel from the initial card swipe box
                                             deactivateLightBox("swipeCard");                   // user hit cancel from the initial card swipe box                 
                                             closeLayer("swipeCardError");                                    // user hit cancel from the the error screen.
                                  deactivateLightBox("swipeCardError");               // user hit cancel from the the error screen.
                                             closeLayer("swipeCardSuccess");                               // user hit cancel from the the success screen.
                                  deactivateLightBox("swipeCardSuccess");           // user hit cancel from the the success screen.
 
                              if (debugVal == 'true')
                              {
                                             alert("Exiting cancelCardSwipe(" +idToHide+ ")");
                              }
                             
                                                                                                                                                     
               }  // end function  cancel
 
 
/*************************************************************************************************
*  Function:  cardSwipeError
*             function that represents a card swipe error
*
*  Parms:
*             errMsg :  The error message that needs to displayed
**************************************************************************************************/
               function cardSwipeError(errMsg)
               {
                              if (debugVal == 'true')
                              {
                                             alert("Entering cardSwipeError()");
                              }
                              clearCreditCardFields();
                              document.PaymentMethodForm.cardBrand.selectedIndex = getSelectedIndex(0);  // set the card type to not selected.
 
 
/******************************************************************************************************
   This will dynamically set an error message.  We have chosen not to have an error message at this time.  Documentum will publish a generic
   error message. If that decision is changed, documentum will need to add a <p> tag with the name of "cardSwipeErrorMessage" and this code block
   will need to be uncommented.
  
                              var cardSwipeErrorMessage = document.getElementById('cardSwipeErrorMsg');
                             
                              if ( cardSwipeErrorMessage != null  && errMsg !=null )
                              {                                           
                                             cardSwipeErrorMessage.innerHTML = errMsg;
                              }
/*******************************************************************************************************/
                             
                              closeLayer('swipeCard');               
                              openLayer('swipeCardError');
                              loadLightBox('swipeCardError');
                             
                              if (debugVal == 'true')
                              {
                                             alert("Entering cardSwipeError()");
                              }
                             
               }  // end function  cardSwipeError
 
 
/*************************************************************************************************
*  Function:  setupTheEventHandlers
*             function to set up all of the event handlers that can occur on the card swipe unit on the kiosk              
*
*  Parms:
*             creditcard:  The creditCard object
*
**************************************************************************************************/ 
function setupTheEventHandlers(creditcard)
{
               if (debugVal == 'true')
               {
                              alert("Entering setupTheEventHandlers(" +creditcard+ ")");
               }
              
               creditcard.OnCardSwiped = OnCardSwiped;
               creditcard.OnTransactionBegin = OnTransactionBegin;
               creditcard.OnProgressChange = OnProgressChange;
               creditcard.OnTransactionComplete = OnTransactionComplete;
              
               if (debugVal == 'true')
               {
                              alert("Exiting setupTheEventHandlers(" +creditcard+ ")");
               }
                                            
              
} // end function setupTheEventHandlers(creditcard)
 
 
 
 
 
/*************************************************************************************************
*  Function:  OnCardSwiped
*             Handler function for the credit card swipe action.              
*
*  Parms:
*             ccardinfo:  The creditCardInfo object -- the information that came off of the CC when swiped
*
**************************************************************************************************/ 
function OnCardSwiped(ccardinfo)
{
               if (debugVal == 'true')
               {
                              alert("Entering OnCardSwiped(" +ccardinfo+ ")");
               }
              
               clearCreditCardFields();
              
               var hdCardBrand = getHDsCardBrand(ccardinfo.CardType, ccardinfo.Number);
              
               switch(hdCardBrand)      
               {
                              case UNKNOWN_CARD:  // we cannot identify which card type it is
                                             alert(UNKNOWN_CARD);
                                             cardSwipeError('This is an UNKNOW card');
                                             break;
                              case UNSUPPORTED_CARD:  // we can identify the card type but it's a type that we do not support.
                                             cardSwipeError('This is an UNSUPPORTED card');
                                             break;                                 
                              default:  // it is a card that we accept
                                             var maskedCCNbr = maskCCNumber(ccardinfo.Number, 4 , '*');
                                             document.PaymentMethodForm.cardHolderName.value =    ccardinfo.FirstName + ' ' + ccardinfo.LastName;
                                             document.PaymentMethodForm.cardNumber.value = ccardinfo.Number;
                                             document.PaymentMethodForm.cardNumberDisplayValue.value = maskedCCNbr;                 
                                             document.PaymentMethodForm.cardNumberOriginalDisplayValue.value = maskedCCNbr;                 
                                             document.PaymentMethodForm.cardVerificationCode.value = ccardinfo.CVCode;
                                             if(!(hdCardBrand == 'HDCON' || hdCardBrand =='HDCOM')){
                                             document.PaymentMethodForm.cardExpiryMonth.selectedIndex = getSelectedIndex(document.PaymentMethodForm.cardExpiryMonth, ccardinfo.Month);
                                             document.PaymentMethodForm.cardExpiryYear.selectedIndex = getSelectedIndex(document.PaymentMethodForm.cardExpiryYear, ccardinfo.Year);
                                             }
                                             if (ccardinfo.CustomerEmail != null && ccardinfo.CustomerEmail != "" )
                                             document.PaymentMethodForm.email1.value = ccardinfo.CustomerEmail;
              
                                             // Set the value
                                             document.PaymentMethodForm.cardBrand.selectedIndex = getSelectedIndex(document.PaymentMethodForm.cardBrand, hdCardBrand);
                                             ChangeDropdowns(document.PaymentMethodForm.cardBrand.value);
                                             $('#opInformationForm').show();
                                             $('#opInformationDisplay').hide();
                                             closeLayer("swipeCard");                                           
                                             deactivateLightBox("swipeCard");                                           
                                             closeLayer("swipeCardError");                                   // need to do this just incase they swiped the card from the error screen.
                                  deactivateLightBox("swipeCardError");               // need to do this just incase they swiped the card from the error screen.
                                  openLayer("swipeCardSuccess");
                                  loadLightBox("swipeCardSuccess");                          
               } // end switch
              
               document.PaymentMethodForm.cardVerificationCode.focus();
               //expiryDate(); // set the expiry dates (enabled / disabled) based off of card brand
 
               if (debugVal == 'true')
               {
                              alert("Exiting onCardSwiped(" +ccardinfo+ ")");
               }                                           
} // end function OnCardSwiped
 
 
/*************************************************************************************************
*  Function:  swipeCardSucessOk
*             Fires when the user clicks OK on the card swipe sucess popup.  This popup notifies the user that
*   the card swipe was a sucess and to fill out the requried fields on the payment and summary page. 
*   When the user clicks ok, we need to close the card swipe sucess popup and put focus on the first required field
*   which is CVV.
*
*  Parms:
*                            None
*
**************************************************************************************************/ 
 
function swipeCardSucessOk()
{
                                             closeLayer("swipeCardSuccess");                                            
                                             deactivateLightBox("swipeCardSuccess");              
                                             document.PaymentMethodForm.cardVerificationCode.focus();
                              //            expiryDate(); // set the expiry date.
}
 
 
/*************************************************************************************************
*  Function:  OnTransactionBegin
*             Fires when a credit card swipe transaction begins.              
*
*  Parms:
*             id            : Long value that contains the ID of the transaction.
*             obj         : CreditCardInfo object that contains information about the card.
*             cur         : Currency value that contains the amount to transact.
*
**************************************************************************************************/ 
 
function OnTransactionBegin(id, ccardinfo, amount)
{
                              // do nothing.  This event shouldn't get called but I wanted it in here as a place holder incase HD changes
                              // their mind.
}
 
 
 
 
/*************************************************************************************************
*  Function:  OnTransactionComplete
*             Handler function for the credit card swipe action.  Fires when a transaction is complete.     
*
*  Parms:
*             id            : Long value that contains the ID of the transaction.
*             errortxt: String that contains an error text if an error occurred.
*             scode    : Scode value that describes the error or warning.
 
*
**************************************************************************************************/ 
function OnTransactionComplete(id, errortxt, scode)
{
                              // do nothing.  This event shouldn't get called but I wanted it in here as a place holder incase HD changes
                              // their mind.
}
 
 
 
 
 
/*************************************************************************************************
*  Function:  OnProgressChange
*             Fires when the credit card swipe transaction progress changes.     
*
*  Parms:
*             id            : Long value that contains the ID of the transaction
*             cur         : Long value that contains the current progress.
*             max       : Long value that contains the maximum progress.
*             status    : String that contains the status text.
*
**************************************************************************************************/ 
 
function OnProgressChange(id, cur, max, status)
{
                              // do nothing.  This event shouldn't get called but I wanted it in here as a place holder incase HD changes
                              // their mind.
}
 
 
/*************************************************************************************************
*  Function:  getHDsCardBrand
*             Fires when the credit card swipe transaction progress changes.     
*
*  Parms:
*             kioskCardType    : the card type from the credit card object that came from the card swipe
*             returns                                : a String that represents HD's card brand. If we cannot determine the card brand,
*                                                                           we will return UNKNOWN_CARD.  If we currently do not support the card that was swiped
*                                                                           we will return UNSUPPORTED_CARD
**************************************************************************************************/ 
function getHDsCardBrand(kioskCardType, ccNbr)
{
               if (debugVal == 'true')
               {
                              alert("Entering getHDsCardBrand(" +kioskCardType+ ")");
               }             
              
var HD_CONSUMER_VAL              = 'HDCON';
var HD_COMMERCIAL_VAL          = 'HDCOM';
var HD_CONSUMER_BIN                              = "603532";
var HD_COMMERCIAL_BIN           = "6035322";
 
               switch(kioskCardType)
               {
               case 0:  // unknown card type.
                 if (startsWith(ccNbr,HD_COMMERCIAL_BIN))
                 {
                              return HD_COMMERCIAL_VAL;
                 }
                 else if (startsWith(ccNbr,HD_CONSUMER_BIN))
                 {
                              return HD_CONSUMER_VAL;
                 }
                 else
                 {
                              return UNKNOWN_CARD;
                 }
                 break;
               case 1:
                 return 'VISA';
                 break;
               case 2:
                 return 'MC';
                 break;
               case 3:
                 return 'AMEX';
                 break; 
               case 4:  // DinersClub     
                 return UNSUPPORTED_CARD;
                 break;
               case 5:
                 return 'DISC';
                 break;
               case 6:
                 return UNSUPPORTED_CARD;
                 break;     
               default:
                 return UNSUPPORTED_CARD;
               }              // end switch
 
               if (debugVal == 'true')
               {
                              alert("Exiting getHDsCardBrand(" +kioskCardType+ ")");
               }             
 
}  // end function getHDsCardBrand
 
 
 
/*************************************************************************************************
*  Function:  startsWith
*             This function is responsible returning a boolean value that says whether or not the CCnbr starts with a
*   passed string
*
*  Parms:
*             ccNbr                   : the credit card number
*   searchStr        : the string that we are trying to see if the CC number starts with.
*             returns                 : a boolean that represents the answer of wether or not the CC number starts with the search string
*                                                                                       
**************************************************************************************************/
function startsWith(ccNbr,searchStr)
{
               var result = ccNbr.indexOf(searchStr);
               if ( result == 0 )
               {
                              return true;  // it does start with
               }
               else
               {
                              return false; // it does not start with.
               }
}// end function startsWith
 
 
 
/*************************************************************************************************
*  Function:  deleteCookiesOnKiosk
*             This function is responsible for deleting our cookies.
*
*  Parms:
*             none
*                           
*   FYI...the          FLAGS for the DeleteTempInternetFiles method (below) are as follows:
*                            1)showdialog      Boolean value that specifies if a dialog should be shown.
*                            2)cache                               Boolean value that specifies if the cached files should be deleted.
*                            3)cookies                            Boolean value that specifies if the cookies should be deleted.
*                            4)endsession       Boolean value that specifies if the session should be closed.
*                            5)history                             Boolean value that specifies if the history should be deleted.
*                            6)callback            Callback function that will be called after deleting the files.  (I omitted this one from the call0
**************************************************************************************************/
function deleteCookiesOnKiosk()
{
               if ( isComingFromKiosk() )
               {
                              SiteKiosk.DeleteTempInternetFiles(false, false, true, true, false);
               } //endif
} // end function  deleteCookiesOnKiosk
//Added for Payment Order Summery Page mesg KIOSK- End
 
// Added for defect 7943 special character validation - Start
var isSpChars;
function validateGCMsgEditFields(parentNode,indx,thdFormName,divName)
{
               var retVal=validateGCMsgFields(indx,divName);
               if(retVal==true)
                              addMessage1(parentNode,indx,thdFormName);
               return retVal;
 
}
function validateGCMsgAddFields(indx,divName)
{
               var retVal=validateGCMsgFields(indx,divName);
               if(retVal==true)
                              addGiftCardMessage('giftMessageFormName', 'giftMessageURL');
               return retVal;
 
}
 
function validateGCMsgFields(indx,divName)
{             
               isSpChars=false;
               resetFields(indx,divName);
 
               var firstElement = "messageLine_"+indx+"_1";
               checkGCMsgSpcar(firstElement);
               var secondElement = "messageLine_"+indx+"_2";
               checkGCMsgSpcar(secondElement );
               var trdElement = "messageLine_"+indx+"_3";
               checkGCMsgSpcar(trdElement);
               var fourthElement = "messageFrom_"+indx+"_1";
               checkGCMsgSpcar(fourthElement);
               var fifthElement = "messageFrom_"+indx+"_2";
 
               checkGCMsgSpcar(fifthElement);
               if(isSpChars==true)
               {
                              var divId=divName+indx;
                              document.getElementById(divId).style.display="block";
                              return false;
              
               }
               return true;
}
 
function checkGCMsgSpcar(fieldName)
{
              var msgLineId=document.getElementById(fieldName);
               if(msgLineId!=null)
               {
 
                              var msgLine=msgLineId.value;
                              if(msgLine.length>0 && (msgLine.indexOf( '&') >=0 || msgLine.indexOf( '<') >=0 || msgLine.indexOf( '>') >=0 || msgLine.indexOf( '\'') >=0 || msgLine.indexOf( '\"') >=0))
                              {
                                             var msgLine=document.getElementById("lbl"+fieldName);
                                             msgLine.style.color="#CD0001";
                                             isSpChars=true;
                              }
               }
}
function resetFields(indx,divName)
{
               var firstElementId = "lblmessageLine_"+indx+"_1";
               var firstElement=document.getElementById(firstElementId);
               if(firstElement!=null)
                              firstElement.style.color="#666666";
 
               var secondElementId = "lblmessageLine_"+indx+"_2";
               var secondElement=document.getElementById(secondElementId);
               if(secondElement!=null)
                              secondElement.style.color="#666666";
 
               var trdElementId = "lblmessageLine_"+indx+"_3";
               var trdElement=document.getElementById(trdElementId);
               if(trdElement!=null)
                              trdElement.style.color="#666666";
 
               var fourthElementId = "lblmessageFrom_"+indx+"_1";
               var fourthElement =         document.getElementById(fourthElementId);
               if(fourthElement !=null)
                              fourthElement.style.color="#666666";
              
               var fifthElementId = "lblmessageFrom_"+indx+"_2";
               var fifthElement=document.getElementById(fifthElementId);
               if(fifthElement !=null)
                              fifthElement.style.color="#666666";
               var divId=divName+indx;
               var divEle=document.getElementById(divId);
               if(divEle !=null)
                              divEle.style.display="none";
              
 
}
// Added for defect 7943 special character validation - End
//WCS 7UP 4.6 merge1-Start
function confirmShipAddressEdit(url)
{
               var confirm=window.confirm("Are you sure you want to update your Billing and Shipping Addresses")
               if(confirm){
                              location.href= url;
 
               }
 
}
 // this method is updated for Sept release - payment method-multiple credit cards task
function resubmitForDisplayorEdit(frmName,selectOrEdit,profileSelectedId) {
	
		var currentForm = document.getElementById(frmName);	
	
		var buttonX;
		try {
		if(selectOrEdit == 'edit'){
				buttonX = document.createElement("<input name='addrEdit.x' type='hidden' value='1' />");
			}else{
				buttonX = document.createElement("<input name='addrSelect.x' type='hidden' value='1' />");
			}
		}
		catch(e) {
			buttonX = document.createElement("input");
			buttonX.type  = "hidden";
			if(selectOrEdit == 'edit'){
				buttonX.name = "addrEdit.x";
			}else{
				buttonX.name = "addrSelect.x";
			}
			buttonX.value = "1";
		}
		currentForm.appendChild(buttonX);
		var buttonY;
		try {
			if(selectOrEdit == 'edit'){
				buttonY = document.createElement("<input name='addrEdit.y' type='hidden' value='1' />");
			}else{
				buttonY = document.createElement("<input name='addrSelect.y' type='hidden' value='1' />");
			}
		}
		catch(e) {
			buttonY = document.createElement("input");
			buttonY.type = "hidden";
			if(selectOrEdit == 'edit'){
				buttonY.name = "addrEdit.y";
			}else{
				buttonY.name = "addrSelect.y";
			}
			buttonY.value = "1";
		}
		currentForm.appendChild(buttonY);
		
		var	selectedProfileId = document.createElement("input");
		selectedProfileId.type  = "hidden";
		
			selectedProfileId.name = "selectedProfileId";
		
		selectedProfileId.value = profileSelectedId;										
	currentForm.appendChild(selectedProfileId);
			
		 if( !$('#opInformationForm').is(':visible')){                          
        	document.PaymentMethodForm.cardVerificationCode.value = document.getElementById("cardVerificationCodeDisp").value;                                	
        	document.PaymentMethodForm.paymentEditForm.value = "false";
        }
		var selectedcardBrandValue = document.getElementById("addNewCreditCard").value
		if(selectedcardBrandValue == 'true'){
		   document.getElementById("selectedCreditCard").value = $("#cardBrand").val();
		}													
		currentForm.submit();
	}
	//payment method page Editpayment will execute this function
	function changePaymentSection (){		
		document.getElementById("opInformationDisplay").style.display = "none";
		document.getElementById("opInformationForm").style.display = "block";
		if(!$('.noBalanceDue').is(':visible'))	
		document.getElementById("WC_StandardCreditCard_FormInput_cardNumber_2").value = document.getElementById("cardNumberCrossRefValue").value				
		document.getElementById("cardVerificationCode").value = document.getElementById("cardVerificationCodeDisp").value;
  	}

	function refreshBillAddr(profileSelectedId) {
		var currentForm = document.getElementById('PaymentMethodForm');	
		var	selectedProfileId;
		var buttonX;
		var cardSelect;

		buttonX = document.createElement("input");
		buttonX.type  = "hidden";
		buttonX.name = "addrSelect.x";
		buttonX.value = "1";
		currentForm.appendChild(buttonX);

		selectedProfileId = document.createElement("input");
		selectedProfileId.type  = "hidden";
		selectedProfileId.name = "selectedProfileId";
		selectedProfileId.id = "selectedProfileId";
		selectedProfileId.value = profileSelectedId;										
		currentForm.appendChild(selectedProfileId);	
		
		cardSelect = document.createElement("input");
		cardSelect.type  = "hidden";
		cardSelect.name = "cardSelect";
		cardSelect.value = "true";
		currentForm.appendChild(cardSelect);
		
		if( !$('#opInformationForm').is(':visible')){                          
			document.PaymentMethodForm.cardVerificationCode.value = document.getElementById("cardVerificationCodeDisp").value;                                	
			document.PaymentMethodForm.paymentEditForm.value = "false";
		}	
		document.getElementById("selectedCreditCard").value = "";		
		document.getElementById("selectedProfileCard").value = profileSelectedId;
		document.getElementById("addNewCreditCard").value = "false";
		currentForm.submit();
	}	
	function addNewPaymentProfile() {
		var currentForm = document.getElementById('PaymentMethodForm');
		var buttonX;
		buttonX = document.createElement("input");
		buttonX.type  = "hidden";
		buttonX.name = "addrSelect.x";
		buttonX.value = "1";
		currentForm.appendChild(buttonX);
	    document.getElementById("addNewCreditCard").value = "true";
	    document.getElementById("selectedCreditCard").value = "";
	    $(".error").css('display','none');  
		$('.required').removeClass('required');
		$("#cardHolderName",self.$selectedDomPayPalAndCC).val("");			
		$("#WC_StandardCreditCard_FormInput_cardNumber_2",self.$selectedDomPayPalAndCC).val("");
		$("#cardExpiryMonthLabel",self.$selectedDomPayPalAndCC).val("");
		document.PaymentMethodForm.addressId.value = "-1";
		document.PaymentMethodForm.selectedProfileCard.value = "-1";
		if(document.getElementById("taxId")){
			document.PaymentMethodForm.taxIdExemptNum.value="";
		}
		
		currentForm.submit();
	}    
	function editPaymentSection(cardBrand,cardMaskedCC,cardHolderName,cardExpMonth,cardExpYear)	{
		
		$("#cardHolderName",self.$selectedDomPayPalAndCC).val(cardHolderName);
		$("#cardBrand",self.$selectedDomPayPalAndCC).val(cardBrand);
		//calling change drop down for setting UI behavioure
		ChangeDropdowns(cardBrand);
		$("#WC_StandardCreditCard_FormInput_cardNumber_2",self.$selectedDomPayPalAndCC).val(cardMaskedCC);
		$("#cardExpiryMonthLabel",self.$selectedDomPayPalAndCC).val(cardExpMonth);
		$("#cardExpiryYearLabel",self.$selectedDomPayPalAndCC).val(cardExpYear);
		$(".defaultCCContainer,#cardBrandContainer,.otherCCDetails,.update-CCInfo",self.$selectedDomPayPalAndCC).show();		
		$(".save-CCInfo",self.$selectedDomPayPalAndCC).hide();	
	    document.getElementById("selectedCreditCard").value= cardBrand;	   
	    $(".error").css('display','none');
	    $('.required').removeClass('required'); 
	    $("#noBalanceDueSaved").css('display','none');
	}	 
	function changePaymentSelection(value)	{		
		document.getElementById("selectedCreditCard").value= value;
	}
              
               function gcUISet(){
                              var totalGC = document.forms[0].totalGC.value;
 
                              if(totalGC == '0.00' || totalGC == '0'){
                                  document.getElementById("addAnotherGc").style.display="none";
                                  if($('#giftCard').is(':visible'))
                                             showOrHideGC(false);
                              }else{
                                             showOrHideGC(true);
                                             if(document.getElementById("showGCForm")){
                                                            if( document.getElementById("showGCForm").value =='true'){
                                                                           $('#addAnotherGc').hide();
                                                                           document.getElementById("giftCardForm").style.display="block";
                                                                           document.getElementById('showGCForm').value="true";
                                                            }else{
                                                                           document.getElementById("giftCardForm").style.display="none";
                                                                           document.getElementById('showGCForm').value="false";
                                                            }
                                             }
                              }
              
               }
              
                              function saveDefCard(check,elem){
                              if(check){
                                             elem.checked=true;
                              }else{
                                             elem.checked=false;
                             
                              }
              
               }
              
               function submitPostEditLink(pageAction){
                   document.editLinkPostForm.method="post";
                   if(pageAction){
                       if(debugVal == 'true'){                    
                           alert("pageAction="+pageAction);
                       }
                       document.editLinkPostForm.action=pageAction;
                       document.editLinkPostForm.submit();
                      
                       return true;
        }
        else{
            if(debugVal == 'true'){
                alert("The javascript function: submitPostEditLink(pageAction) requires an action argument");
            }
            return false;
        }
               }
              
              
 
               //WCS 7UP 4.6 merge1-End
 
//WCS7 Up-Refactoring-start
function showDescription(id, val) {
               document.getElementById(id).style.top = val;
               openLayer(id);
}
//WCS7 Up-Refactoring-End
