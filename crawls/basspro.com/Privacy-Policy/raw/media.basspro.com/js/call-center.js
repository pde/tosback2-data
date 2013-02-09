// call-center.js
if ($.browser.mozilla) {
  window.addEventListener('message', receiver, false);
}

  if (getCookie('CALL_CENTER_USER')) {
  $(document).ready(function(){
    $('#mini-cart').hide();
    $('#user-nav').hide();

    $('.updateCartForShipBtn').unbind('click').click(function(e) {

      // change fulfillment

      e.preventDefault();

      var orderItemId = $('#orderItemId').val();

      var quantity = $('#quantity').val();

      if (quantity == undefined) {
        quantity = 1;
      }

      callUpdateToCart(orderItemId, quantity, "", "true");



      return (false);

    });

  });
}


function receiver(e) {
  if (e.data == 'SET_CC_COOKIE') {
    setCookieForCSR();
  } else if (e.data.indexOf('CUSTOMER_ID') != -1) {
    var values = e.data.split("=");
    var url = window.location.href;
    if (e.data.indexOf('URL') != -1) {
      var index = e.data.indexOf('URL');
      url = e.data.substr(index + 1);
    }
    setCookieForCustomer(values[1], url);
  }
}

function setCookieForCSR() {
  document.cookie = "CALL_CENTER_USER%3d1%3b%20path%3d/index.html";
  // THIS IS NOT WORKING $.cookie('CALL_CENTER_USER', '1');
}

function resetPagetoURL(url) {
  window.location = url;
}

function setCookieForCustomer(customerId, url) {
  if (getCookie('CALL_CENTER_CUSTOMER_ID') != customerId) {
    document.cookie = "CALL_CENTER_CUSTOMER_ID"+"="+customerId + "; path=/";

    if(window.location != url) {
      // DO NOTHING
    }
    else if(url.indexOf('orderItemId') != -1) {
      url = window.location.protocol + "//" + window.location.host + "/webapp/wcs/stores/servlet/topCategories___";
      resetPagetoURL(url);
    }
    else {
      window.location.reload(true);
    }
  }
}
function addToCartCC(qty_index) {

  var partNum = document.getElementById('partNum');

  var partNumber = $('#partNum').val();

  if(qty_index==''){
    var quantity = $('#quantity').val();
  }else{
    var qty='#qty_'+qty_index;
    var quantity = $(qty).val();
  }


  //CVCC-635 : changes for supporting defining attributes
  /*var productId = $('#OrderItemAddFormProductId').val();
  var attrNames = new Array();
  var attrValues = new Array();
  var definingAttr='false';
  if(definingAttributePage){
    definingAttr='true';
  }
  $('input[name= "attrName"]').each(function(i){
    attrNames.push(this.value);
  });
  $('[name= "attrValue"]').each(function(j){
    attrValues.push(this.value);
  });*/

  if(partNum.value){
    partNumber = partNum.value;
  }

  if (quantity == undefined) {
    quantity = 1;
  }

  var catentryId=$('#catEntryId').val();

  callAddToCart(partNumber, quantity,'', '','','','','',catentryId);

  return (false);
}


function addGiftCardToCartCC(){

    var partNumber = $('#partNum').val();
    var quantity = $('#quantity').val();

    var isEGiftCard = $('#isEGiftCard').val();

    if (quantity == undefined) {
        quantity = 1;
      }

    if(isEGiftCard=='true'){

    var senderName = $('#senderName').val();
    var senderEmail = $('#senderEmail').val();
    var recipientName = $('#recipientName').val();
    var recipientEmail = $('#recipientEmail').val();
    var recipientEmailVerify = $('#recipientEmailVerify').val();
    var	giftCardMessage = $('#giftCardMessage').val();

    callAddToCartGiftCard(partNumber, quantity, isEGiftCard, senderName, senderEmail, recipientName, recipientEmail, recipientEmailVerify, giftCardMessage);

    }

    // physical gift card
    else{

      var senderName = $('#senderName').val();
      var recipientName = $('#recipientName').val();
      var giftCardMessage = $('#giftCardMessage').val();

      callAddToCartGiftCard(partNumber, quantity, '', senderName, '', recipientName, '', '', giftCardMessage);

    }
    return (false);
  }

 function callAddToCartGiftCard(partNumber, quantity, isEGiftCard, senderName, senderEmail, recipientName, recipientEmail, recipientEmailVerify, giftCardMessage){

    var data = {};
    data.partNumber = partNumber;
    data.quantity = quantity;
    data.isEGiftCard = isEGiftCard;
    data.senderName = senderName;
    data.senderEmail = senderEmail;
    data.recipientName = recipientName;
    data.recipientEmail = recipientEmail;
    data.recipientEmailVerify = recipientEmailVerify;
    data.giftCardMessage = giftCardMessage;
    data.callType = 'addGiftCard';

    var dataStr = JSON.stringify(data);

    var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);

    if (typeof target != "undefined") {
      target.postMessage(dataStr, "*");
    } else {
      alert("Unable to post message to backend");
    }

 }

//CVCC-635 : added parameters to punchout for defining attributes
function callAddToCart(pn, qty, extparam, locationCode,definingAttr,attrNames,attrValues,productId,catentryId) {

  var data = {};
  data.partNumber = pn;
  data.quantity = qty;
  data.catentryId=catentryId;
  data.extraParam = extparam;
  data.locationCode = locationCode;
  data.definingAttr=definingAttr;
  data.attrNames=attrNames;
  data.attrValues=attrValues;
  data.productId=productId;


  data.callType = 'add';

  var dataStr = JSON.stringify(data);

  var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);

  if (typeof target != "undefined") {
    target.postMessage(dataStr, "*");
  } else {
    alert("Unable to post message to backend");
  }
}

function callUpdateToCart(orderItemId, quantity, locationCode, extraParam,orderId) {
  var data = {};
  data.orderItemId = orderItemId;
  data.quantity = quantity;
  data.locationCode = locationCode;
  data.callType = 'update';
  data.extraParam = extraParam;

  // this orderId param is added for order level BOPIS
  data.orderId = orderId;

  var dataStr = JSON.stringify(data);

  var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);

  if (typeof target != "undefined") {
    target.postMessage(dataStr, "*");
  } else {
    alert("Unable to post message to backend");
  }
}
