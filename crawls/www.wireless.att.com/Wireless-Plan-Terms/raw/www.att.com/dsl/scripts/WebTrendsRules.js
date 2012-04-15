/** 
 * The wtPageNameData JSON object maps page URIs to the page name value sent to WebTrends.
 * If a match occurs for the URI, and the user is qualified, the "qual" value is used.
 * In all other cases, the "pnDefault" value is used.
 */

var wtPageNameData = {
	"/dsl/shop/plandetails.jsp": {
		"qual": 				"DSL Plan Details (Qualified)",
		"pnDefault":			"DSL Plan Details (Unqualified)"
	},
	"/dsl/shop/plansShared.jsp": {
		"qual": 				"DSL Shared Plan Summary (Qualified)",
		"pnDefault":			"DSL Shared Plan Summary (Unqualified)"
	},
	"/dsl/shop/plansDirect.jsp": {
		"qual": 				"DSL Direct Plan Summary (Qualified)",
		"pnDefault":			"DSL Direct Plan Summary (Unqualified)"
	},
	"/dsl/shop/plansUpgrade.jsp": {
		"pnDefault":			"DSL Existing Plan Summary (Qualified)"
	},
	"/dsl/shop/compareDirect.jsp": {
		"qual": 				"DSL Compare Plans Direct (Qualified)",
		"pnDefault":			"DSL Compare Plans Direct (Unqualified)"
	},
	"/dsl/shop/compareShared.jsp": {
		"qual": 				"DSL Compare Plans Shared (Qualified)",
		"pnDefault":			"DSL Compare Plans Shared (Unqualified)"
	},
	"/dsl/shop/customize.jsp": {
		"pnDefault":			"DSL Equipment Install"
	},
	"/dsl/checkout/authentication/index.jsp": {
		"pnDefault":			"DSL Authentication"
	},
	"/dsl/checkout/complete/complete.jsp": {
		"pnDefault":			"DSL Order Complete"
	},
	"/dsl/checkout/personalInfo/personalinformation.jsp": {
		"pnDefault":			"DSL Personal Info"
	},
	"/dsl/checkout/payment/payment.jsp": {
		"pnDefault":			"DSL Payment"
	},
	"/dsl/checkout/reserve/scheduleInstallation.jsp": {
		"pnDefault":			"DSL Schedule Install"
	},
	"/dsl/checkout/reserve/scheduleActivation.jsp": {
		"pnDefault":			"DSL Schedule Activation"
	},
	"/dsl/cart/cart.jsp": {
		"pnDefault":			"DSL Cart Info"
	},
	"/dsl/checkout/review/review.jsp": {
		"pnDefault":			"DSL Checkout Review"
	},
	"/dsl/checkout/index.jsp": {
		"pnDefault":			"DSL Checkout Verify Account"
	},
	"/dsl/message.jsp": {
		"qual": 				"DSL Unavailable Message (Qualified)",
		"pnDefault":			"DSL Message (Unqualified)"
	},
	"/dsl/start/index.jsp": {
		"pnDefault":			"DSL Zip Code Entry"
	},
	"/dsl/modals/AAND.jsp": {
		"pnDefault":			"DSL AAND Modal"
	},
	"/dsl/modals/AANDbuttons.jsp": {
		"pnDefault":			"DSL AAND Buttons Modal"
	},
	"/dsl/modals/accountNumber.jsp": {
		"pnDefault":			"DSL Account Number Modal"
	},
	"/dsl/modals/advancedPayACHTerms.jsp": {
		"pnDefault":			"DSL Advance Pay ACH Terms Modal"
	},
	"/dsl/modals/advancedPayCreditcardTerms.jsp": {
		"pnDefault":			"DSL Advance Pay Credit Terms Modal"
	},
	"/dsl/modals/autopayACHTerms.jsp": {
		"pnDefault":			"DSL Autopay ACH Terms Modal"
	},
	"/dsl/modals/autopayCreditcardTerms.jsp": {
		"pnDefault":			"DSL Autopay Credit Terms Modal"
	},
	"/dsl/modals/checkAvailabilityByAddress.jsp": {
		"pnDefault":			"DSL Check Avail by Address Modal"
	},
	"/dsl/modals/checkAvailabilityByTN.jsp": {
		"pnDefault":			"DSL Check Avail by TN Modal"
	},
	"/dsl/modals/creditTerms.jsp": {
		"pnDefault":			"DSL Credit Terms Modal"
	},
	"/dsl/modals/creditTermsButtons.jsp": {
		"pnDefault":			"DSL Credit Terms Buttons Modal"
	},
	"/dsl/modals/customerCode.jsp": {
		"pnDefault":			"DSL Customer Code Modal"
	},
	"/dsl/modals/emptyCartConfirm.jsp": {
		"pnDefault":			"DSL Empty Cart Confirm Modal"
	},
	"/dsl/modals/loadingPlansProgress.jsp": {
		"pnDefault":			"DSL Loading Plans Progress Modal"
	},
	"/dsl/modals/multipleAddress.jsp": {
		"pnDefault":			"DSL Multi-Address Modal"
	},
	"/dsl/modals/routingNumber.jsp": {
		"pnDefault":			"DSL Routing Number Modal"
	},
	"/dsl/modals/unableToProcessOrder.jsp": {
		"pnDefault":			"DSL Unable to Process Modal"
	},
	"/dsl/modals/whyVerifyAccount.jsp": {
		"pnDefault":			"DSL Why Verify Account Modal"
	},
	"/dsl/modals/fragments/multipleAddressesTable.jsp": {
		"pnDefault":			"DSL Multi-Address Table Modal"
	}
};


/**
 * The wtInjectData JSON object contains link onclick injection rules.  These are
 * for onclick reporting events that are added to pages dynamically via JavaScript in onload().
 * 
 * "RuleXX" names are arbitrary, but must be unique.  Don't use URIs as keys unless they are unique.
 * 
 *  "uri", "idlike", and "hreflike" are rule criteria to determine if link modification should happen.
 *  Other values are the data used to add the onclick event data.
 *  
 *  "uri" is mandatory.  This is the URI of the page on which to inject onclick events.
 *  "idlike" and "hreflike":
 *  	* may be used separately or together.  At least one must be used.
 *  	* refer to the href or id of the <a href="" id=""> tags on page "uri".\
 *  	* are arrays.  One or more string values can be specified.
 */
var wtInjectData = {  
/*  */	
	"Rule10": {
		"uri":			"/dsl/index.jsp",
		"hreflike":		["javascript:popupBTNModal();"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/index.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": "",
		"buyFlowType":	"DSL_N_SH"
	},
	"Rule11": {
		"uri":			"/dsl/shop/plansShared.jsp",
		"hreflike":		["showPopupByUrl(\"/dsl/modals/checkAvailabilityByTN.jsp\""],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plansShared.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": "",
		"buyFlowType":	"DSL_N_SH"
	},
	"Rule15": {
		"uri":			"/dsl/index.jsp",
		"hreflike":		["javascript:popupBTNModal_or_redirect("],
		"ctdcsref": 	"[js]uriRoot + '/dsl/index.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": "",
		"buyFlowType":	"DSL_U"
	},
	"Rule16": {
		"uri":			"/dsl/shop/plansDirect.jsp",
		"hreflike":		["javascript:popupBTNModal('existing')"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plansDirect.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": "",
		"buyFlowType":	"DSL_U"
	},
	"Rule20": {
		"uri":			"/dsl/shop/plansShared.jsp", 
		"idlike": 		["check_plan_", "btn_modal_link"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plansShared.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_CheckAvailabilityByTN_Modal_Load",
		"ctFormSubmit": "",
		"buyFlowType":	"DSL_U"
	},
	"Rule30": {
		"uri":			"/dsl/shop/compareShared.jsp",
		"hreflike":		["modals/checkAvailabilityByAddress.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/compareShared.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByAddress.jsp",
		"ctPN": 		"DSL Check Avail by Address Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByAddress_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule35": {
		"uri":			"/dsl/shop/compareDirect.jsp",
		"hreflike":		["modals/checkAvailabilityByAddress.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/compareDirect.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByAddress.jsp",
		"ctPN": 		"DSL Check Avail by Address Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByAddress_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule40": {
		"uri":			"/dsl/shop/compareShared.jsp",
		"hreflike":		["modals/checkAvailabilityByTN.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/compareShared.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule50": {
		"uri":			"/dsl/shop/plansDirect.jsp",
		"idlike": 		["check_plan_", "address_modal_link"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plansDirect.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByAddress.jsp",
		"ctPN": 		"DSL Check Avail by Address Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_CheckAvailabilityByAddress_Modal_Load",
		"ctFormSubmit": ""
	},			
	"Rule51": {
		"uri":			"/dsl/shop/plansDirect.jsp",
		"hreflike":     ["/dsl/modals/checkAvailabilityByAddress.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plansDirect.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByAddress.jsp",
		"ctPN": 		"DSL Check Avail by Address Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_CheckAvailabilityByAddress_Modal_Load",
		"ctFormSubmit": ""
	},			
	"Rule60": {
		"uri":			"/dsl/shop/plandetails.jsp",
		"idlike": 		["link"], //todo, was tags[i].id.indexOf("link") == 0.  doesn't seem to cause a problem.
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plandetails.jsp'",
		"ctdcsuri": 	"[js]'/dsl/shop/plandetails.jsp?' + (document.location.search.length > 1 ? document.location.search.substring(1) : '') + '&planDetailsTab=' + tag.firstChild.data",
		"ctPN": 		"[js]'DSL Plan Details ' + tag.firstChild.data + ' Tab (' + ((qualified != null && qualified == true) ? 'Qualified' : 'Unqualified') + ')'",
		"ctIsModal": 	"true",
		"ctEvent": 		"",
		"ctFormSubmit": "",
		"ctNoHit":      ""
	},
	"Rule70": {
		"uri":			"/dsl/shop/plandetails.jsp",
		"hreflike":		["modals/checkAvailabilityByAddress.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plandetails.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByAddress.jsp",
		"ctPN": 		"DSL Check Avail by Address Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByAddress_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule80": {
		"uri":			"/dsl/shop/plandetails.jsp",
		"hreflike":		["modals/checkAvailabilityByTN.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plandetails.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule90": {
		"uri":			"/dsl/checkout/payment/payment.jsp",
		"hreflike":		["modals/routingNumber.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/checkout/payment/payment.jsp'",
		"ctdcsuri": 	"/dsl/modals/routingNumber.jsp",
		"ctPN": 		"DSL Routing Number Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_routingNumber_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule100": {
		"uri":			"/dsl/checkout/payment/payment.jsp",
		"hreflike":		["modals/accountNumber.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/checkout/payment/payment.jsp'",
		"ctdcsuri": 	"/dsl/modals/accountNumber.jsp",
		"ctPN": 		"DSL Account Number Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_accountNumber_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule110": {
		"uri":			"/dsl/shop/customize.jsp",
		"hreflike":		["modals/checkAvailabilityByAddress.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/customize.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByAddress.jsp",
		"ctPN": 		"DSL Check Avail by Address Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByAddress_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule120": {
		"uri":			"/dsl/shop/customize.jsp",
		"hreflike":		["modals/checkAvailabilityByTN.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/customize.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule130": {
		"uri":			"/dsl/checkout/index.jsp",
		"hreflike":		["modals/checkAvailabilityByAddress.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/checkout/index.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByAddress.jsp",
		"ctPN": 		"DSL Check Avail by Address Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByAddress_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule140": {
		"uri":			"/dsl/checkout/index.jsp",
		"hreflike":		["modals/checkAvailabilityByTN.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/checkout/index.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule150": {
		"uri":			"/dsl/cart/cart.jsp",
		"hreflike":		["modals/checkAvailabilityByAddress.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/cart/cart.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByAddress.jsp",
		"ctPN": 		"DSL Check Avail by Address Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByAddress_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule160": {
		"uri":			"/dsl/cart/cart.jsp",
		"hreflike":		["modals/checkAvailabilityByTN.jsp"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/cart/cart.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_checkAvailabilityByTN_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule170": {
		"uri":			"/dsl/cart/cart.jsp",
		"idlike": 		["emptyCartLink"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/cart/cart.jsp'",
		"ctdcsuri": 	"/dsl/modals/emptyCartConfirm.jsp",
		"ctPN": 		"DSL Empty Cart Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_Empty_Cart_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule180": {
		"uri":			"/dsl/checkout/index.jsp",
		"idlike": 		["whyVerifyAcctModalLink"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/checkout/index.jsp'",
		"ctdcsuri": 	"/dsl/modals/whyVerifyAccount.jsp",
		"ctPN": 		"DSL Why Verify Account Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_whyVerifyAccount_Modal_Load",
		"ctFormSubmit": ""
	},	
	"Rule190": {
		"uri":			"/dsl/shop/customize.jsp",
		"idlike": 		["updateCartImg"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/customize.jsp'",
		"ctdcsuri": 	"/dsl/shop/customize.jsp",
		"ctPN": 		"DSL Equipment Install",
		"ctIsModal": 	"false",
		"ctEvent": 		"DSL_cart_update_SKUs_submit",
		"ctFormSubmit": ""
	},
	"Rule200": {
		"uri":			"/dsl/shop/customize.jsp",
		"idlike": 		["continueButton"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/customize.jsp'",
		"ctdcsuri": 	"/dsl/shop/customize.jsp",
		"ctPN": 		"DSL Equipment Install",
		"ctIsModal": 	"false",
		"ctEvent": 		"DSL_cart_add_SKUs_submit",
		"ctFormSubmit": "",
		"ctStatusCodeFn":	"getErrorCodes()"
	},
	"Rule210": {
		"uri":			"/dsl/message.jsp",
		"hreflike": 	["javascript:void(-999888);"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/message.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_CheckAvailabilityByTN_Modal_Load",
		"ctFormSubmit": ""
	},
	"Rule220": {
		"uri":			"/dsl/checkout/payment/payment.jsp",
		"idlike": 		["continue_btn_payment"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/checkout/payment/payment.jsp'",
		"ctdcsuri": 	"/dsl/checkout/payment/payment.jsp",
		"ctPN": 		"DSL Payment",
		"ctIsModal": 	"false",
		"ctEvent": 		"DSL_Pmt_Info_Submit",
		"ctFormSubmit": "",
		"ctStatusCodeFn":	"getErrorCodes()",
		"ctNoHit":      ""
	},
	"Rule230": {
		"uri":				"/dsl/checkout/personalInfo/personalinformation.jsp",
		"idlike": 			["continue_btn_direct"],
		"ctdcsref": 		"[js]uriRoot + '/dsl/checkout/personalInfo/personalinformation.jsp'",
		"ctdcsuri": 		"/dsl/checkout/personalInfo/personalinformation.jsp",
		"ctPN": 			"DSL Personal Info",
		"ctIsModal": 		"false",
		"ctEvent": 			"DSL_Personal_Info_Submit",
		"ctFormSubmit": 	"",
		"ctStatusCodeFn":	"getErrorCodes()",
		"ctNoHit":          ""
	},/*
	"Rule240": {
		"uri":			"/dsl/shop/plansDirect.jsp", 
		"idlike": 		["check_plan_", "btn_modal_link"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/shop/plansDirect.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityByTN.jsp",
		"ctPN": 		"DSL Check Avail by TN Modal",
		"ctIsModal": 	"true",
		"ctEvent": 		"DCS_CheckAvailabilityByTN_Modal_Load",
		"ctFormSubmit": ""
	},*/
	
	
	
	// Start modal rules //
	
	//Normal model is that event is fired from cookie on next page.  Can't do that here since
	//we need wtVSOrderRR and wtVSOrderNRR which have been cleared in cart empty.  So, have event on cart page.
	"Rule300": { 
		"uri":			"/dsl/cart/cart.jsp", 
		"idlike": 		["empty_cart_event"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/cart/cart.jsp'",
		"ctdcsuri": 	"[js]empty_cart_ctdcsuri",
		"ctPN": 		"DSL Cart Info",
		"ctIsModal": 	"true",
		"ctEvent": 		"DSL_Cart_ Emptied",
		"ctFormSubmit": ""
	}/*,	
	"Rule310": { 
		"uri":			"/dsl/shop/plansDirect.jsp", 
		"idlike": 		["empty_cart_event"],
		"ctdcsref": 	"[js]uriRoot + '/dsl/modals/checkAvailabilityByAddress.jsp'",
		"ctdcsuri": 	"/dsl/modals/checkAvailabilityMultiAddress.jsp",
		"ctPN": 		"DSL Direct Multi-Address Modal",
		"ctIsModal": 	"false",
		"ctEvent": 		"DSL_checkAvailabilityByAddress",
		"ctFormSubmit": ""
	}
	*/
		
	
	//btn_check_event, address_check_event, empty_cart_event	
	/* End modal rules */
		
	
	
	
	
		
	
};

var wtQSData = {
		"/dsl/shop/plansDirect.jsp":	"Get_DSL_No_Local",
		"/dsl/shop/compareShared.jsp":	"Compare_Plans",
		"/dsl/shop/compareDirect.jsp":	"Compare_Plans",
		"/dsl/shop/compareUpgrade":		"Compare_Plans", //RedHat B2C-47832, 03/08/10
		"/dsl/message.jsp":				"DSL_Message",
		"/dsl/shop/plandetails.jsp":	"DSL_Plan_Details_Page",
		"/dsl/start/index.jsp":			"Enter_Zip_Code",
		"ID:show_existing_static_IP_link": "Add_Static_IP", //RedHat B2C-47834, 03/08/10
		"ID:show_existing_dynamic_IP_link": "Drop_Static_IP", //RedHat B2C-47834, 03/08/10
		"/dsl/shop/plansUpgrade.jsp":	"Add_Static_IP" //RedHat B2C-47833, 03/08/10 (**Note that there's an exception to this rule.  See webtrendsfunc2.addQSDataToWebTrendTags)
	};



