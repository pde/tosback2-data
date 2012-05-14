var l = {
    'src':{
        'cors':6,
        'loginHtml':5,
        'userApi':4
    },
    'category':{
        'defaultVal':1
    },
    'issue':{
        'defaultVal':1
    },
    'type':{
      'funnel':1,
      'userErr':2
    },
	'req':{
		'register':loginEvents,
		'login':loginEvents,
        'forgotPassword':loginEvents
	}
}
//function reportAction(){}
var loginEvents = {
    LOGIN_FORM_CALLED: {
        'desc':'called login form',
        'type':l.type.funnel,
        'category': l.category.defaultVal,
        'biEventId':1000,
        'timerId':'main',
        'callLimit':99999,
        'src':"hls"
    },
    FORM_OPENED: {
        'desc':'success forgot password.',
        'type':l.type.funnel,
        'category': l.category.defaultVal,
        'biEventId':1001,
        'timerId':'main',
        'callLimit':99999,
         'src':"hls"
    },
    LOGIN_REQ: {
        'desc':'login requested',
        'type':l.type.funnel,
        'category': l.category.defaultVal,
        'biEventId':1002,
        'timerId':'main',
        'callLimit':9999,
         'src':"hls"
    },
    LOGIN_SUCCESS: {
        'desc':'success login',
        'type':l.type.funnel,
        'category': l.category.defaultVal,
        'biEventId':1003,
        'timerId':'main',
        'callLimit':9999,
         'src':"hls"
    },
     REG_REQ: {
        'desc':'register requested',
        'type':l.type.funnel,
        'category': l.category.defaultVal,
        'biEventId':1005,
        'timerId':'main',
        'callLimit':99999,
         'src':"hls"
    },
    REG_SUCCESS: {
        'desc':'success registration ',
        'type':l.type.funnel,
        'category': l.category.defaultVal,
        'biEventId':1006,
        'timerId':'main',
        'callLimit':9999,
         'src':"hls"
    },
    PASS_REQ: {
        'desc':'forgot password requested.',
        'type':l.type.funnel,
        'category': l.category.defaultVal,
        'biEventId':1007,
        'timerId':'main',
        'callLimit':99999,
         'src':"hls"
    },
     USER_ACTION_ERROR:  {
         'desc':'user validation error.',
        'type':l.type.userErr,
        'category': l.category.defaultVal,
        'biEventId':1008,
        'timerId':'main',
        'callLimit':99999,
        'src':"hls"
    },
    USER_ASKED_FB:  {
         'desc':'user validation error.',
        'type':l.type.userErr,
        'category': l.category.defaultVal,
        'biEventId':401,
        'timerId':'main',
        'callLimit':99999,
        'src':"hls"
    },
    MERGE_ACCOUNT_OPENED:  {
         'desc':'user validation error.',
        'type':l.type.userErr,
        'category': l.category.defaultVal,
        'biEventId':402,
        'timerId':'main',
        'callLimit':99999,
        'src':"hls"
    },
    MERGE_ACCOUNT_SUBMIT:  {
         'desc':'user validation error.',
        'type':l.type.userErr,
        'category': l.category.defaultVal,
        'biEventId':403,
        'timerId':'main',
        'callLimit':99999,
        'src':"hls"
    }
}

var loginErrors = {
    /* CORS */
    AJAX_ABORTED:  {
        'errorCode': 1000,
        'evid:':10,
        'userMessage': 'ajax call aborted',
        'src':l.src.cors,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
     AJAX_TIMEOUT:  {
        'errorCode': 1001,
        'evid:':10,
        'userMessage': 'ajax call timed out',
        'src':l.src.cors,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    AJAX_GENERAL_ERROR:  {
        'errorCode': 1002,
        'evid:':10,
        'userMessage': 'ajax call general error',
        'src':l.src.cors,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    AJAX_JSON_PARSE_FAILED:  {
        'errorCode': 1003,
        'evid:':10,
        'userMessage': 'ajax call general error',
        'src':l.src.cors,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    AJAX_NOT_TRUE_AJAX:  {
        'errorCode': 1004,
        'evid:':10,
        'userMessage': 'ajax call general error',
        'src':l.src.cors,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    AJAX_NOT_TRUE_AJAX:  {
        'errorCode': 1003,
        'evid:':10,
        'userMessage': 'ajax call general error',
        'src':l.src.cors,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    LOGIN_BAD_SERVER_RESPONSE:  {
        'errorCode': 1009,
        'evid:':10,
        'userMessage': 'bad server response to login',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    UPDATE_FLASH_FAILED:  {
        'errorCode': 1011,
        'evid:':10,
        'userMessage': 'user action error',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    BAD_REDIRECT_URL:  {
        'errorCode': 1012,
        'evid:':10,
        'userMessage': 'user action error',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    JSONP_3S_TIMEOUT:  {
        'errorCode': 1013,
        'evid:':10,
        'userMessage': 'jsonp timeout 3 seconds',
        'src':l.src.cors,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    JSONP_10S_TIMEOUT:  {
        'errorCode': 1016,
        'evid:':10,
        'userMessage': 'jsonp timeout 10 seconds',
        'src':l.src.cors,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    VALIDATION_PAYLOAD:  {
        'errorCode': 1014,
        'evid:':10,
        'userMessage': 'validation error',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    CALL_FORM_NOT_COMPLETE:  {
        'errorCode': 1015,
        'evid:':10,
        'userMessage': 'call form called but init forms did not',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    IE_HORROR:  {
        'errorCode': 1017,
        'evid:':10,
        'userMessage': 'call form called but init forms did not',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    FLASH_DIM_START_ERROR:  {
        'errorCode': 1018,
        'evid:':10,
        'userMessage': 'flash dim did not started',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    FLASH_DIM_END_ERROR:  {
        'errorCode': 1019,
        'evid:':10,
        'userMessage': 'flash dim did not ended',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },

    GIGYA_ERROR:  {
        'errorCode': 1020,
        'evid:':10,
        'userMessage': 'problem communicate with gigya',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    INVALID_USER_ACTION: {
        'errorCode': 1021,
        'evid:':10,
        'userMessage': 'User API action is invalid',
        'src':l.src.userApi,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
     HTML_DIM_START_ERROR:  {
        'errorCode': 1022,
        'evid:':10,
        'userMessage': 'html dim did not started',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    HTML_DIM_END_ERROR:  {
        'errorCode': 1023,
        'evid:':10,
        'userMessage': 'html dim did not started',
        'src':l.src.loginHtml,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    USER_API_NOT_LOADED_INITIALIZED_YET: {
        'errorCode': 1024,
        'evid:':10,
        'userMessage': 'User api was not initialized yet',
        'src':l.src.userApi,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    IS_ALIVE_ABORTED: {
        'errorCode': 1025,
        'evid:':10,
        'userMessage': 'IsAlive request aborted',
        'src':l.src.userApi,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    IS_ALIVE_FAILED: {
        'errorCode': 1026,
        'evid:':10,
        'userMessage': 'isAlive request failed',
        'src':l.src.userApi,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
    IS_ALIVE_TIMED_OUT: {
        'errorCode': 1027,
        'evid:':10,
        'userMessage': 'IsAlive request timeout',
        'src':l.src.userApi,
        'category': l.category.defaultVal,
        'issue':l.issue.defaultVal,
        'log':"trg",
        'severity':1
    },
}



function cloneObj(obj) {
    var temp = new obj.constructor();
    for(var key in obj)
    temp[key] = obj[key];
    return temp;
}

/* for manager - generic form validation and ajax request*/
//var errorMap = (typeof err == 'undefined') ? {} : err;
var FormsManager ={
	options:{
		/* the callback function to be called when the api (script tag inserting) and ajax call is back */
		res:'formsManager.getResponse',
		/* callback after all the callback object is finnished OPTIONAL */
		callback:null,
		/* current working form. should be set when activating the manager */
		currentForm:'',
		/* validations: each validation is an html class name, add the class to the input and it will be validated with these regex */
		validate:{
			vldNumbers:{rgx:/^\\d{1,9999}$/,msg:'only numbers'},
			vldEmail:{rgx:/^[a-zA-Z0-9_\-+.]+@[a-zA-Z0-9_\-+]+\.[a-zA-Z0-9_\-+.]+$/, msg:err[99711]},
			vldPass:{rgx:/^[a-zA-Z0-9_\-!@#$%^&*]+$/,msg:err[99721]}
		},
        validateSize:{
            vldMand:{mand:[1,999999],msg:err[9973]},
            vldEmailLength:{mand:[6,60],msg:err[9974]},
            vldPassLength:{mand:[4,15],msg:err[9976]}
        }
	},
	init:function(){
		var that = this;
        /* catch every for submit */
        jQuery("form").submit(function(e){
			that.submit(e);
		});
        /* to use the form manager with a link without a native submit, add class "submit" to the submit button/link of the form */
        /* TODO - wait for call to end before enabling the button again */
		jQuery("form .submit").click([that], function(e){
            jQuery(e.target).closest("form").submit();
//			jQuery("form").submit();
		});
		jQuery("input").bind('focus',function(e){
			jQuery(e.target).parent().removeClass("errorInput");
            /* TODO - a quick solution because there is no option to change html, make only one class */
            jQuery(e.target).parent().removeClass("errorServerInput");
		});
        /* binding enter key with form submit button */
        jQuery("form").keypress(function(e){
            if(e.keyCode==13){
                e.preventDefault();
                jQuery("#"+this.id + " .submit").click();
            }
        })
	},
	submit:function(e){
		var form = this.options.currentForm = jQuery(e.target).closest("form").attr("id") || e.target;
		this.resetErrors();
        var valid = this.validateForm(form);
        if(valid){
            var data = jQuery('#'+form).serialize();
			var url = jQuery('#'+form).attr("action");
            if(jQuery('#'+form).hasClass("api")){
                jQuery('#'+form).trigger("validate",[url,data]);
            }else{
                this.ajaxReq(url,data);
            }
        }
//        e.preventDefault();
    },
	validateForm:function(id){
		jQuery(id).removeClass('error');
		var inputs = jQuery('#'+id+' input');
		for (var i = 0; i < inputs.length; i++) {
			if(!this.validateSize(inputs[i]) || !this.validateInput(inputs[i])){
				jQuery('#'+id).addClass('error');
				return false;
			}
		}
		return true;
	},
	validateInput:function(input){
		var item;
		for(item in this.options.validate){
			if(jQuery(input).hasClass(item)){
				if(!this.options.validate[item].rgx.test(input.value)){
					jQuery(input).parent().addClass('errorInput');
                    this.setError(this.options.validate[item].msg, input.name)
                    return false;
				}
			}
		}
		return true;
	},
    validateSize:function(input){
		var item;
		for(item in this.options.validateSize){
			if(jQuery(input).hasClass(item)){
				if(input.value.length < this.options.validateSize[item].mand[0] || input.value.length > this.options.validateSize[item].mand[1]){
					jQuery(input).parent().addClass('errorInput');
                    this.setError(this.options.validateSize[item].msg, input.name)
                    return false;
				}
			}
		}
		return true;
	},
	ajaxReq:function(url, data){
		jQuery.ajax({
			type:"POST",
			url: url,
			data:data,
			success: function(res) {
				this.res(res);
			},
			error: function(result){
				 reportError(loginErrors.AJAX_GENERAL_ERROR,"","",result);
			}
        });
	},
	getResponse:function(obj){
		obj = arguments[0];
		if(!obj.success){
			if(err && err[obj.errorCode]){
				this.setError(err[obj.errorCode]);
					}else{
					this.setError(obj.errorDescription);
				}
			return;
		}
		if(obj && !obj.redirect==""){
			document.location.href = obj.redirect;
		}
		this.options.callback(obj);
	},
	resetErrors:function(){
        /* TODO - a quick solution because there is no option to change html, make only one class */
		jQuery(".errorInput").removeClass('errorInput');
        jQuery(".errMsg").html("");
	},
	setError:function(msg, cont){
        var container = cont ? cont : "";
		var errContainer = jQuery("#"+this.options.currentForm+" ."+cont+" .errMsg");
        if(errContainer.length === 0)errContainer = jQuery("#"+this.options.currentForm+" .email .errMsg");
        /* TODO - locate the element in a better way */
        jQuery(errContainer).parent().parent().addClass('errorInput');
		errContainer.html(msg);
	}
}

var UserActionForm = {
	options:{
		currentForm:"login",
        initializeTimeOut:{}
	},
    successAction:{
        login:{
            redirect:"",
            action:function(){
                if(this.redirect && this.redirect !== "")document.location.href = this.redirect;
            },
            report:loginEvents.LOGIN_REQ,
            reportSuccess:loginEvents.LOGIN_SUCCESS
        },
        createUser:{
            redirect:"",
            action:function(obj){
                if(obj && obj.action != undefined && obj.action == "login")
                {
                    if(this.redirectWhenLogin && this.redirectWhenLogin !== "")document.location.href = this.redirectWhenLogin;
                } else{
                    if(this.redirect && this.redirect !== "")document.location.href = this.redirect
                }
            },
            report:loginEvents.REG_REQ,
            reportSuccess:loginEvents.REG_SUCCESS,
            redirectWhenLogin:""
        },
        forgotPassword:{
            action:function(){
                var e = {target:{rel:'postPassword'},preventDefault:function(){}};
		        userActionForm.pager(e);

            },
            report:loginEvents.PASS_REQ
        },
        mergeAccount:{
            redirect:"",
            action:function(){
                if(this.redirect && this.redirect !== "")document.location.href = this.redirect;
            },
            report:loginEvents.MERGE_ACCOUNT_SUBMIT
        }
    },
     /* all errors should be place at the default container under the email field.
        errors that are different should be in this map with a string that  will match the current error msg class of the input field
     */
    secondErrors:{
        9972:'password'
    },
    formsScheme:{
        createUser:true,
        login:true,
        forgotPassword:true,
        mergeAccount:true
    },
	init:function(arr){
        var id;
        /* for facebook merge account */
        if(arr[2] == "mergeAccount")this.options.currentForm="mergeAccount";
		this.targetListeners();
		/* because of the fact that the flash passing params in array we have to get it hardcoded. blame: NY */
        /* if form param passed and its in the map open it and set  */
		if(!(arr[2] == undefined || arr[2] == "") && this.formsScheme[arr[2]]){
			id = arr[2];
            if(id != this.options.currentForm){
                this.options.currentForm = id;
			    jQuery("[rel="+id+"]").click();
            }
		}else{
			id = "login";
		}

		/* REPORT LOGGER */
        reportEvent(loginEvents.LOGIN_FORM_CALLED, {'c1':id});
        this.successAction.createUser.redirect = arr[0];
        this.successAction.createUser.redirectWhenLogin = arr[1];
		this.successAction.login.redirect = arr[1];
        this.successAction.mergeAccount.redirect = arr[0];
        if(animateForm.options.callFormTimeOut){clearTimeout(animateForm.options.callFormTimeOut)}
        /* ugly bi for merge account */
        if(jQuery("#mergeAcount").length > 0)reportEvent(loginEvents.MERGE_ACCOUNT_OPENED);

        // Setup form background dimming
        if(arr[3]){
        var formBackground = arr[3];
            if (formBackground == "HTML")
                this.useHtmlDimming = true;
            else if (formBackground == "FLASH")
                this.useFlashDimming = true;
            else if (formBackground == "STANDALONE") {
                this.useFlashDimming = this.useHtmlDimming = false;
            }
        }
        else this.useFlashDimming = true; //backwards compatability
	},
	targetListeners:function(){
		var that = this;
		jQuery(".pager").click([that], function(e){
			that.pager(e);
		});
		jQuery("#facebookLoginBtn").click([that], function(e){
            that.goFacebook();
		});
		jQuery(".actBtn").click([that], function(e){
			/* REPORT LOGGER */
            reportEvent(that.successAction[that.options.currentForm].report, {'c1':that.options.currentForm});
		});

        jQuery("#login, #createUser, #forgotPassword, #mergeAcount").bind("validate", [that],function(e,url,data){
              that.sendToServer(url,data);
        });
        /* facebook */
//        jQuery("#mergeAcount").bind("validate", [that],function(e,url,data){
//             var action = "mergeAccount"; //jQuery(this).attr("id")
//             userApi.userAction(data, that.onError, that.onServerResponse, action);
//        });
        /* Loading image toggler */
        jQuery("body").bind("loading", [that],function(e,toggle){
            (toggle == "loadStart") ?  jQuery("#loaderWrapper").removeClass("Hidden") : jQuery("#loaderWrapper").addClass("Hidden");
        });
	},
	pager:function(e){
		e.preventDefault();
		jQuery(".container").addClass("Hidden");
		var id = e.target.rel ? e.target.rel : jQuery(e.target.parentNode).attr("rel");
		jQuery("#"+id).removeClass("Hidden");
        /* pass email value between forms */
        jQuery("#"+id+ " .vldEmail").val(jQuery("#"+this.options.currentForm + " .vldEmail").val());
        jQuery("#"+id+ " .vldPass").val("");
		this.options.currentForm = formsManager.options.currentForm = id;
		formsManager.resetErrors();
//        jQuery('.field input').blur();
	},
    sendToServer:function(url,data){
        var action = this.options.currentForm;
        userApi.userAction(action, data, this.onError, this.onServerResponse);

    },
    onServerResponse:function(obj){
        var obj = obj ? obj : {};
        if(obj && obj.success === false){
            /*  for local server error description:
                we get the error code that came back from the server, we get the description from the static error map messages_lng.js
                if the error code is -2012 we dont get it from the local map, we go to another place in the object that came back from the server and take
                the error array, run over it and display each error description from there.
             */
            // if we have the error in the local map, get it, if not place a default error
            var errDesc = err[obj.errorCode] ? err[obj.errorCode] : err[9975];
            /* decide where to place the server error */
            var container = 'email';
            // if the error code is -2012 call function that will extract all errors
            if(obj.errorCode=="-2012"){
                /* 2012 should never be, it means that we have a broken client validation that does not match server validation*/
                var errorObj = userActionForm.getErrorMessageFromHell(obj);
                /* report for bad validation behavior */
                reportError(loginErrors.VALIDATION_PAYLOAD,"","",errorObj.errDesc);
                container = errorObj.errContainer;
                errDesc = errorObj.errDesc;
            }
            if(userActionForm.secondErrors[obj.errorCode]){
                container = userActionForm.secondErrors[obj.errorCode];
            }
            // send error to the form
            formsManager.setError(errDesc, container);
            // report to BI
              reportEvent(loginEvents.USER_ACTION_ERROR, {'c1':errDesc});
//            reportError(loginErrors.USER_ACTION_ERROR,"","",errDesc);
        }else if(obj && obj.success === true){
            userActionForm.onSuccess(obj);
        }else{
            formsManager.setError("error, bad server response", "email");
            reportError(loginErrors.LOGIN_BAD_SERVER_RESPONSE,"","","bad Server response"+obj);
        }
        return 
    },
    onSuccess:function(obj){
        reportEvent(userActionForm.successAction[userActionForm.options.currentForm].reportSuccess);
        jQuery("#"+userActionForm.options.currentForm).trigger("userActionSuccess", [obj]);
        userActionForm.successAction[userActionForm.options.currentForm].action(obj);
    },
    onError:function(obj){
        formsManager.setError(err[9975], "email");

    },
   goFacebook:function(){
        reportEvent(loginEvents.USER_ASKED_FB);
        var redirectUrl =  loginParams.usersDomain + '/social/gigya?';
        redirectUrl = redirectUrl + 'redirectTo='+this.successAction.mergeAccount.redirect;
        redirectUrl = redirectUrl + '&orgDocID='+loginParams.orgDocID;
        redirectUrl = redirectUrl + '&appUrl='+document.location.href;
        try {
            var conf ={APIKey: loginParams.apiKey};
            gigya.services.socialize.login(conf,{
                 provider: 'facebook',
                 redirectURL: redirectUrl
            });
        }
        catch(e) {
            reportError(loginErrors.GIGYA_ERROR,"","",e);
        }
    },
    getErrorMessageFromHell:function(obj){
        var errors = obj.payload.errors;
        var obj = {};
        obj.errContainer = "email";
        obj.errDesc = "error validate input";
        var str = "";
        for(var item in errors){
            obj.errDesc = str + errors[item].message + "\n"
            if(errors[item].fieldName == "password")obj.errContainer = "password";
        }
        return obj;
    },
    processError:function(obj){
        return;
    },
    resetState:function(){
         var form = "login"; //(userServer.getCookie("userType")=="ANONYMOUS" || !userServer.getCookie("userType")) ? "createUser" : "login";
         var e = {target:{rel:form},preventDefault:function(){}};
		    userActionForm.pager(e);
    }
}

var userActionForm;
var animateForm = {
    options:{
        openFrom:"left",
        /* container: css selector */
        container:"#loginContainer",
        /* current container's position */
		currenPos:'',
        moveTo:'',
        halfWidth:'',
		openFlag:false,
        animateClose:true,
        formsManagerInit:false,
		duration:1000,
        moveDirection:1,
        callFormTimeOut:false,
        openForm:function(){animateForm.openForm()},
		closeForm:function(){animateForm.closeForm()}
    },
    init:function(direction){
        that = this;
        this.options.openFrom = (direction == "right" || direction == "left" || direction == "top")? direction : this.options.openFrom;
        jQuery("#login, #createUser,#forgotPassword").bind("userActionSuccess", [that],function(e,obj){
            if(jQuery(e.target).attr("id")!=="forgotPassword"){
                that.options.closeForm();
                jQuery('body').trigger("serverSuccessResponse",[obj]);
//                that.updateFlash(obj);
            }
        });
        jQuery(".back").click([that],function(e){
            that.options.animateClose = true;
            that.options.closeForm();
            /* clear all fields when user close the form */
            jQuery('.field input').val("");
            formsManager.resetErrors();
            userActionForm.resetState();
        });
        /* clone the user action form and initialize it */
        userActionForm = cloneObj(UserActionForm);
//        userActionForm.init(arr);
        /* getting teh real width of the content, not the container -
         we have to put it here and not in the initPosition because after the movement the size will turn to zero */
		this.options.halfWidth = jQuery(this.options.container).width() / 2;
//		this.options.halfWidthP = jQuery("#login").width() / 2;
    },
    initFormsManager:function(arr){
        /* initiate forms manager once */
        if(!this.options.formsManagerInit){
            userActionForm.init(arr);
            this.options.formsManagerInit = true;
        }else{
            clearTimeout(animateForm.options.callFormTimeOut);
        }
    },
    initPosition:function(){
		this.options.moveTo =  (jQuery(document).width() / 2) - this.options.halfWidth ;
		switch (this.options.openFrom)
        {
            case "left":
				break;
			case "right":
				jQuery(this.options.container).css('left', jQuery(document).width()+1000);
				this.options.moveDirection = -1;
				break;
		}
	},
   callForm:function(arr){
       /* pass to the new function because its harder to change function in flash */
       this.callOnContent(arr);

//        /* if form already open do not open it again*/
//        if(this.options.openFlag)return;
//        /* We have many actions to do from animation to events to initialize form. setting a timeout to tell if we have a problem somewhere*/
//        this.options.callFormTimeOut = setTimeout(
//                function(arr){
//                    reportError(loginErrors.CALL_FORM_NOT_COMPLETE,"","", arr);
//                }, 1000
//        );
//        this.initPosition();
//        this.initFormsManager(arr);
//        this.options.currenPos = parseInt(jQuery(this.options.container).css('left'));
//        jQuery('html, body').animate({scrollTop:0}, 1)
//        jQuery(this.options.container).css('display','block');
//        this.moveForm(this.options.moveTo);
//        this.pageContentMove(this.options.moveTo + 1000, 'hidden');
//        reportEvent(loginEvents.FORM_OPENED, {'c1':that.options.currentForm});
//        this.options.openFlag = true;
//        /* if we have no redirect url in the array, we want to show the closing animation.
//            if we do have a redirect link, we should not show animation because the page will reload to the
//            redirect request.
//         */
//        if((arr[1] != undefined && arr[1] != "") || (arr[0] != undefined && arr[0] != "")){
//            this.options.animateClose = false;
//        }
	},
    callOnContent:function(arr){
        this.checkForBrowserSupport(arr[0]);
        /* if form already open do not open it again*/
        if(this.options.openFlag)return;
        this.setLabels();
        /* We have many actions to do from animation to events to initialize form. setting a timeout to tell if we have a problem somewhere*/
        this.options.callFormTimeOut = setTimeout(function(arr){
            reportError(loginErrors.CALL_FORM_NOT_COMPLETE,"","", arr);
        }, 5000);
        this.initPosition();
        jQuery('html, body').animate({scrollTop:0}, 'slow');
        if(!this.options.formsManagerInit){
            var frameCss = {
                "height":""+(jQuery("#htmlLogin").height()+ 40)+"px",
                "width":""+(jQuery(this.options.container).width())+"px",
                "display":"block"
            }
            jQuery("#loginFrame").css(frameCss);
        }

        this.initFormsManager(arr);


       if (userActionForm && userActionForm.useHtmlDimming)
        {
             var mask = jQuery('#loginMask')
             if (mask) {
                 mask.css({'display':'block'});
                 var scrollHeight = jQuery('body')[0].scrollHeight || '100%';
                 mask.css({'height': scrollHeight});
             }
             else
                reportError(loginErrors.HTML_DIM_START_ERROR,"","","");
        }
        else if (userActionForm && userActionForm.useFlashDimming) {
            try {
                getFlashAppInstance().startHTMLDialogMode("","0.8","0xffffff");
            }
            catch(e) {
                reportError(loginErrors.FLASH_DIM_START_ERROR,"","","");
            }
        }
      
        jQuery("#htmlLogin").addClass('inFrame');

        jQuery(this.options.container).css({'display':'block','left':this.options.moveTo});

        this.options.closeForm = this.closeFormWithLayer;
//        this.moveForm(this.options.moveTo);
        /* if you click on the flash, ie (all versions) will select the flash and hide the html. we are playing with the css for it te render the component again */
        var appObject = document.getElementById("app");
        if(jQuery.browser.msie && appObject && appObject != undefined && appObject != null){
            var ieGoToHell =  1;
            document.getElementById("app").onfocus = function(){
                document.getElementById("loginFrame").style.marginBottom = (ieGoToHell =  ieGoToHell * (-1))
            }
        }
        this.options.openFlag = true;
	},
    closeForm:function(){
        if(this.options.animateClose){
            this.moveForm(this.options.currenPos, jQuery(this.options.container).css('display','none'));
            /* show table before animate in */
            jQuery('table').css('visibility', 'visible');
            this.pageContentMove(0);
            formsManager.resetErrors();
        }
		this.options.openFlag = false;
	},
    moveForm:function(moveTo, callback){
        var clbck = callback ? callback : {};
        jQuery(this.options.container).animate({left: moveTo},this.options.duration,function(){clbck});
    },
    closeFormWithLayer:function(){
        jQuery(animateForm.options.container).css({'left':animateForm.options.currenPos,'display':'none'})

            if (userActionForm && userActionForm.useHtmlDimming)
            {
                var mask = jQuery('#loginMask')
                 if (mask) {
                     mask.css({'display':'none'});
                 }
                 else
                    reportError(loginErrors.HTML_DIM_END_ERROR,"","","");
            }
            else {
                try {
                    getFlashAppInstance().endHTMLDialogMode()		}
                catch(e) {
                    reportError(loginErrors.FLASH_DIM_END_ERROR,"","","");
                }
            }
//        animateForm.moveForm(animateForm.options.currenPos, jQuery(animateForm.options.container).css('display','none'))
        animateForm.options.openFlag = false;
    },
    pageContentMove:function(px, vis){
        jQuery('table').animate({
			left:(px) * this.options.moveDirection
		}, this.options.duration, function(){if(vis)jQuery(this).css('visibility', vis)});
    },
    updateFlash:function(obj){
		try {
			getFlashAppInstance().handleUserServerResponse(obj.payload.action, obj.success, obj.errorCode, obj.errorDescription, obj.payload.userProperties, userServer.getCookie("wixSession"));
		} catch(e) {
            reportError(loginErrors.UPDATE_FLASH_FAILED,"","", e.message + obj.action);
		}
	},
    /* for browsers that does not support placeholders */
    setLabels:function(){
        var test = document.createElement('input');
	    if(!('placeholder' in test)){
            jQuery("input:text, input:password").each(function(){
                var prev = jQuery(this).prev();
                if(jQuery(prev).hasClass("Hidden")){
                    jQuery(prev).text(jQuery(this).attr("placeholder")).removeClass("Hidden");
                }
            });
        }
    },
    /* operation system detecting for safary on windows that does not support html over flash */
    os:[
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        }
//        {
//            string: navigator.platform,
//            subString: "Mac",
//            identity: "Mac"
//        },
//        {
//            string: navigator.userAgent,
//            subString: "iPhone",
//            identity: "iPhone/iPod"
//        },
//        {
//            string: navigator.platform,
//            subString: "Linux",
//            identity: "Linux"
//        }
    ],
    redirectBrowsers:[
        {browser:'safari',os:'windows'}
    ],
    supportedBrowser:function(){
        for (var i=0;i<this.os.length;i++)	{
            var dataString = this.os[i].string;
            if (dataString) {
                if (dataString.indexOf(this.os[i].subString) != -1)
                    return this.os[i].identity;
            }
        }
    },
    /* TODO make this function generic if more browsers will needed to exclude. */
    checkForBrowserSupport:function(redirectTo){
        if(this.supportedBrowser() == "Windows" && navigator.vendor && navigator.vendor.indexOf("Apple")  >= 0){
            document.location = loginParams.usersDomain ? loginParams.usersDomain + "/wix-users/login/form?orgDocID={0}&redirectTo="+redirectTo : "https://users.pita.wixpress.com/wix-users/login/form?orgDocID={0}&redirectTo="+redirectTo;
        }
    }
}

var LOG;
jQuery(document).ready(function() {
    initLog();
});

function reportError (c,b,a,d){
    if (!LOG)
        initLog();

    LOG.reportError(c, b, a, d);
}

function reportEvent (a,b) {
  if (!LOG)
        initLog();

    LOG.reportEvent(a, b);
}

function initLog() {
     LOG = new WixLogger({
        /* errors map */
        'errors': window.loginErrors,
        /* Events map */
        'events': window.loginEvents,
        'src': 6,
        'severity':1,
        'defaultAnalytics': ['UA-2117194-33', 'UA-2117194-1'],
        'optionalAnalytics': {'user':null},
        'floggerServerURL': window.location.protocol + '//' + window.loginParams.floggerDomain + '/' || window.location.protocol + '//flogger.wixpress.com/',
        'version': "1.0",
        'siteId': (window['siteId'] ? siteId : ""),
//        'userId': "00000000-0000-0000-0000-000000000000",
        'userLangauge': userServer.getCookie("wixLanguage") || 'unknown',
        'session': userServer.getCookie("_wix_browser_sess") || "00000000-0000-0000-0000-000000000000",
        'computerId': userServer.getCookie("_wixCIDX") || "00000000-0000-0000-0000-000000000000",
        'creationSource': document.location.href,
        'onEvent': function(event, params) {},
        'onError': function(err, className, methodName, params) {
            // Show console error in debug mode
            if (window['debugMode'] == 'debug' && window['console'] && window['console']['log'] && window['console']['error']) {
                console['error'](err.desc, err, className, methodName, params);
            }
        }
    });
}

