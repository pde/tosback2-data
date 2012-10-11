var AJAX_TIMEOUT=15000;
var SERVICE_DOMAIN="";
var LOCATE_BY_ZIP_URL="/locate/locateByZip.html";
var LOCATE_BY_ADDRESS_URL="/locate/locateByAddress.html";
var LOCATE_BY_PHONE_URL="/locate/locateByPhone.html";
var LOCATE_BY_PHONE_ACCOUNT_URL="/locate/locateByPhoneOrAccount.html";
var LOCATE_BY_REMEMBER_ME_URL="/locate/locateByRememberMe.html";
var GET_SERVICE_URL_URL="/locate/getServiceUrl.html";
var GET_DESTINATION_URL_URL="/locate/getDestinationUrl.html";
var GET_DESTINATION_URLS_URL="/locate/getDestinationUrls.html";
var SORRY_URL="http://sorry.centurylink.com"
var locatorClient;
var requestorId;

/*
 * Public function to initialize ajax and other locator functionality.  This function must be called from $document.ready
*/
function initializeLocator(requestor, serviceDomain) {
  //set the client timeout on all ajax calls to 15 seconds
  $.ajaxSetup({timeout:AJAX_TIMEOUT, cache:false});
  //register the handleAjaxError method to be invoked on all ajaxErrors
    $(document).ajaxError(function(event, xhr, options){ handleAjaxError(event, xhr, options);});
  //handle same origin issue for javascript subdomains
  $(document).domain="centurylink.com";
  // load and initialize locatorClient
  requestorId=requestor;
  if(serviceDomain) {
    SERVICE_DOMAIN=serviceDomain;
  }
  locatorClient = new LocatorClient();
}
function getProfileFromZip(zipCode, rememberMe, callback) {
    locatorClient.locateByZip(zipCode, requestorId, rememberMe, callback);
}
function getProfileFromAddress(streetAddress, unitType, unitNumber, city, state, zipCode, rememberMe, callback){
    locatorClient.locateByAddress(streetAddress, unitType, unitNumber, city, state, zipCode, requestorId, rememberMe, callback);
}
function getProfileFromPhone(phoneNumber, rememberMe, callback){
  locatorClient.locateByPhone(phoneNumber, requestorId, rememberMe, callback);
}
function getProfileFromPhoneOrAccount(entryValue, rememberMe, callback){
  locatorClient.locateByPhoneOrAccount(entryValue, requestorId, rememberMe, callback);
}
function getProfileFromRememberMe(callback) {
  locatorClient.locateByRememberMe(requestorId, callback);
}
function getServiceUrl(domain, callback){
  locatorClient.getServiceUrl(domain, requestorId, callback);
}
function getDestinationUrl(domain, topic, subdomain, callback){
  locatorClient.getDestinationUrl(domain, topic, subdomain, requestorId, callback);
}
function getDestinationUrls(domain, topicList, subdomain, callback){
  locatorClient.getDestinationUrls(domain, topicList, subdomain, requestorId, callback);
}
/*******************************************************************************************
 *  FUNCTIONS DEFINED BELOW ARE INTENDED ONLY TO BE USED INTERNAL TO THIS FILE
 *  USE AT YOUR OWN RISK.  DO NOT MODIFY.
 *******************************************************************************************/
function LocatorClient(){
  var available=true;
  var locatorResponse;
  var clientCallbackFunction;
  var acquireLock= function() { available=false; }
  var releaseLock= function() {available=true;}
  
  var buildZipRequest = function(zipCode, requestorId, rememberMe) {
    if(!rememberMe) {
      rememberMe="N";
    }
    var request = new Object();
    request.requestorId=requestorId;
    request.rememberMe=rememberMe;
    request.zipCode=zipCode;
    return request;
        }
  var buildAddressRequest = function(streetAddress, unitType, unitNumber, city, state, zipCode, requestorId, rememberMe) {
    if(!rememberMe) {
      rememberMe="N";
    }
    var request = new Object();
    request.streetAddress1=streetAddress;
    request.unitType=unitType;
    request.unitNumber=unitNumber;
    request.city=city;
    request.state=state;
    request.zipCode=zipCode;
    request.requestorId=requestorId;
    request.rememberMe=rememberMe;
    return request;
  }
  var buildPhoneOrAccountRequest = function(entryValue, requestorId, rememberMe) {
    if(!rememberMe) {
      rememberMe="N";
    }
    var time = (new Date()).getTime();
    var request = new Object();
    request.entryValue=entryValue;
    request.requestorId=requestorId;
    request.rememberMe=rememberMe;
    request.t=time;
    return request;
  }
  var buildRememberMeRequest = function(requestorId) { 
    var request = new Object();
    request.requestorId=requestorId;
    return request;
  }
  var buildServiceUrlRequest = function(domain, requestorId) {
	var request = new Object();
        request.domain = domain
        request.requestorId = requestorId;
	return request;
  }
  var buildDestinationUrlRequest = function(domain, topic, subdomain, requestorId) {
	var request = new Object();
        request.domain = domain;
	request.subDomain=subdomain;
        request.topic = topic;
	request.requestorId = requestorId;
        return request;
  }

   var buildDestinationUrlsRequest = function(domain, topicList, subdomain, requestorId) {
	var request = new Object();
        request.domain = domain;
	request.subDomain=subdomain;
        request.topicList = topicList;
	request.requestorId = requestorId;
        return request;
  }
  var setClientCallbackFunction = function(callback) { clientCallbackFunction=callback; }
 
  this.getLocatorResponse = function() {
				
			 	return locatorResponse; 
				
  }
  var setLocatorResponse = function(data) {
  				locatorResponse=data;
  }
   var onSuccess = function(data) {
		releaseLock();
		setLocatorResponse(data);
		clientCallbackFunction(data);
  }

  this.isAvailable= function() { return available; }
  
  this.locateByZip = function(zipCode, requestorId, rememberMe, callback) {
    if(this.isAvailable()){
      acquireLock();
      setLocatorResponse(null);
      setClientCallbackFunction(callback);
      var request = buildZipRequest(zipCode,requestorId,rememberMe);
      $.ajax({url: SERVICE_DOMAIN+LOCATE_BY_ZIP_URL, 
	      data: request, 
	      dataType: "jsonp",
	      success: onSuccess});
    }
  }
  this.locateByAddress = function(streetAddress, unitType, unitNumber, city, state, zipCode, requestorId, rememberMe, callback) {
    if(this.isAvailable()){
      acquireLock();
      setLocatorResponse(null);
      setClientCallbackFunction(callback);
      var request = buildAddressRequest(streetAddress, unitType, unitNumber, city, state,zipCode,requestorId,rememberMe);
      $.ajax({url: SERVICE_DOMAIN+LOCATE_BY_ADDRESS_URL, 
	      data: request, 
	      dataType: "jsonp",
	      success: onSuccess});
    }
  }
  this.locateByPhone = function(entryValue, requestorId, rememberMe, myCallback) {
    
    if(this.isAvailable()){
      acquireLock();
      setLocatorResponse(null);
      setClientCallbackFunction(myCallback);
      var request = buildPhoneOrAccountRequest(entryValue,requestorId,rememberMe);
      $.ajax({url: SERVICE_DOMAIN+LOCATE_BY_PHONE_URL, 
		data: request, 
		dataType: "jsonp",
		success: onSuccess});
    }
  }
  this.locateByPhoneOrAccount = function(entryValue, requestorId, rememberMe, callback) {
    if(this.isAvailable()){
      acquireLock();
      setLocatorResponse(null);
      setClientCallbackFunction(callback);
      var request = buildPhoneOrAccountRequest(entryValue,requestorId,rememberMe);
      $.ajax({url: SERVICE_DOMAIN+LOCATE_BY_PHONE_ACCOUNT_URL, 
	      data: request, 
	      dataType: "jsonp",
	      success: onSuccess});
    }
  }
  this.locateByRememberMe = function(requestorId, callback) {
    if(this.isAvailable()){
      acquireLock();
      setLocatorResponse(null);
      setClientCallbackFunction(callback);
      var request = buildRememberMeRequest(requestorId);
      $.ajax({url: SERVICE_DOMAIN+LOCATE_BY_REMEMBER_ME_URL, 
	      data: request, 
	      dataType: "jsonp",
	      success: onSuccess});
    }
  }
  this.getServiceUrl = function(domain, requestorId, callback) {
	if(this.isAvailable()){
		acquireLock();
		setLocatorResponse(null);
		setClientCallbackFunction(callback);
		var request = buildServiceUrlRequest(domain, requestorId);
		$.ajax({url: SERVICE_DOMAIN+GET_SERVICE_URL_URL,
			data: request,
			dataType: "jsonp",
			success: onSuccess});
       }
  }
  this.getDestinationUrl = function(domain, topic, subdomain, requestorId, callback) {
	if(this.isAvailable()){
		acquireLock();
		setLocatorResponse(null);
		setClientCallbackFunction(callback);
		var request = buildDestinationUrlRequest(domain, topic, subdomain, requestorId);
		$.ajax({url: SERVICE_DOMAIN+GET_DESTINATION_URL_URL,
			data: request,
			dataType: "jsonp",
			success: onSuccess});
       }
  }
  this.getDestinationUrls = function(domain, topicList, subdomain, requestorId, callback) {
	if(this.isAvailable()){
		acquireLock();
		setLocatorResponse(null);
		setClientCallbackFunction(callback);
		var request = buildDestinationUrlsRequest(domain, topicList, subdomain, requestorId);
		$.ajax({url: SERVICE_DOMAIN+GET_DESTINATION_URLS_URL,
			data: request,
			dataType: "jsonp",
			success: onSuccess});
       }
  }
}
/*
 * This function is invoked on every error from any ajax call.  
 * xhr is the XmlHttpRequest and xhr.status would give you the http error code (e.g 404, 302, 500)   options is the ajax settings object and 
 * options.url gives you the url that was being invoked when the error occurred.
 */           
function handleAjaxError(event, xhr, options){
  window.location=SORRY_URL;
}
