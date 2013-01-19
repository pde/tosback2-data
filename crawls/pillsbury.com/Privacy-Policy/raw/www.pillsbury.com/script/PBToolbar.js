/*********** TOOLBAR *********/
var toolbarV = 1;
var toolbar_min_cookie_name = "pbTBarMin";
var toolbar_reg_cookie_name = "pbTBarReg";
var reg_call_timeout;
var isIE6 = (navigator.userAgent.indexOf("IE 6") > -1);

function ApplyToolbarBindings(data) {
    if (!data.IsKnown) {
        jQuery("#ToolBar").attr("data-bind", 'template: { name: "AnonymousUserToolbarTemplate" }');
        CheckToolbarRegCall();

    } else {
        jQuery("#ToolBar").attr("data-bind", 'template: { name: "KnownUserToolbarTemplate" }');
        CheckToolbarLists();
    }
    ko.applyBindings(data, document.getElementById('ToolBar'));
}

function ApplyToolBarClickDataBindings(data, link, name) {
    jQuery("#" + name + "ID").attr("data-bind", "template: { name: '" + name + "TemplateBase" + "' }");
    ko.applyBindings(data, document.getElementById(name + "ID"));
    CheckToolbarLists(name);
    jQuery.removeData(link, "state");
    linkClicked(link,false);
}

function GetToolBarData(callbackFunction) {
    jQuery.ajax({
    	url: '/Services/Toolbar/ToolBarService.ashx?v=' + toolbarV,
        success: callbackFunction,
        dataType: 'json',
        type: 'GET'
    });
}
function GetToolBarUserData(callbackFunction) {
	jQuery.ajax({
		url: '/Services/Toolbar/ToolBarService.ashx?v=' + toolbarV +'&DC=User',
		success: callbackFunction,
		dataType: 'json',
		type: 'GET'
	});
}
function GetToolBarRecipeBoxData(currentLink) {
    jQuery.ajax({
    	url: '/Services/Toolbar/ToolBarService.ashx?v=' + toolbarV + '&DC=RecipeBox',
        success: function (data) { ApplyToolBarClickDataBindings(data, currentLink, 'RecipeBoxToolbar') },
        dataType: 'json',
        error: function (xhr, status, error) {
            ToolbarErrorHandler(xhr, status, error, "RecipeBoxToolbar", currentLink) 
        },
        type: 'GET'
    });
}
function GetToolBarRecentlyViewedData(currentLink) {
	jQuery.ajax({
		url: '/Services/Toolbar/ToolBarService.ashx?v=' + toolbarV + '&DC=RecentlyViewedRecipes',
		success: function (data) { ApplyToolBarClickDataBindings(data, currentLink, 'RecentRecipeToolbar') },
		dataType: 'json',
		error: function (xhr, status, error) {
		    ToolbarErrorHandler(xhr, status, error, "RecentRecipeToolbar", currentLink)
		},
		type: 'GET'
	});
}
function GetToolBarGroceryListsData(currentLink) {
	jQuery.ajax({
		url: '/Services/Toolbar/ToolBarService.ashx?v=' + toolbarV + '&DC=GroceryLists',
		success: function (data) { ApplyToolBarClickDataBindings(data, currentLink, 'GroceryListToolbar') },
		dataType: 'json',
		error: function (xhr, status, error) {
		    ToolbarErrorHandler(xhr, status, error, "GroceryListToolbar", currentLink)
		   
		},
		type: 'GET'
	});
}

function AjaxLogOut() {

    ntptEventTag('ev=membertoolbar_logout_bt&ActionType=Other');
    var logoutStatus = jQuery.parseJSON(jQuery.ajax({ url: "/Services/Profile/LogOffHandler.ashx",
        async: false,
        timeout: 3000
    }).responseText);
    if (logoutStatus.toUpperCase() == "S") {
        window.location.href = "/";
    }
    else {
        window.location.href = "/logout";
    }
}

function loadToolbar() {
    //if (jQuery("meta[name='DCS.dcsaut'][content='non-member']").length == 1) {
    //check the Unica NTPT_GLBLEXTRA tag to see if the current user is anonymous
    if (window.NTPT_GLBLEXTRA !== undefined && window.NTPT_GLBLEXTRA.indexOf("UserStatus=Anonymous") != -1) {
        ApplyToolbarBindings({ IsKnown: false });
    } else {
        GetToolBarUserData(ApplyToolbarBindings);
    }
	SetToolBar();
	jQuery('#tb_log_out').live('click', function () {
		AjaxLogOut();
    });
    jQuery('#tb_close_button').live('click', function () {
        HideRegCallOut();
    });
    //jQuery('#tb_nl_link').live('click', function () {        
      //  window.location.href = "/login?esrc=15895&Overlay=Newsletter&email=" + jQuery('#nl_email').val();
   // });
    jQuery('#nl_email').live('keypress', function (e) {
        if (e.keyCode == '13') {
            e.preventDefault();           
            window.location.href = "/login?&Overlay=Newsletteresrc=15895&email=" + jQuery('#nl_email').val();
        }
    });
}

jQuery(function () { loadToolbar(); });

function SetToolBar() {
    if (js_getCookie(toolbar_min_cookie_name) == 'min') {
        jQuery('.toolbar_dashboard').css({ 'width': '0px' });
        jQuery('.toolbar_share_text').css({ 'width': '0px' });
        jQuery('.toolbar_content').css({ 'width': '300px' });
        jQuery('.toolbar_toggle a').addClass('minimized');
    }
    jQuery('.toolbar_content').animate({ 'top': '0px' }, 400);
    
    jQuery('.toolbar_toggle a').click(function () {
        if (jQuery('.toolbar_toggle a').hasClass('minimized')) {
            js_setCookie(toolbar_min_cookie_name, "max", 1)
            jQuery('.toolbar_dashboard .roll_up .roll_list').css({ 'top': '0px' });
            jQuery('.roll_up_link').data('state', 'down');
            jQuery('.toolbar_dashboard .roll_up').show();
            jQuery('.toolbar_content').animate({ 'top': '30px' }, 200, function () {
                jQuery('.toolbar_content').css({ 'width': '100%' });
                jQuery('.toolbar_dashboard').css({ 'width': 'auto' });
                jQuery('.toolbar_share_text').css({ 'width': 'auto' });
                jQuery('.toolbar_toggle a').removeClass('minimized');
                jQuery('.toolbar_content').animate({ 'top': '0px' }, 200);
            });
        }
        else {
            js_setCookie(toolbar_min_cookie_name, "min", 1)
            clearTimeout(reg_call_timeout);
            jQuery('.toolbar_dashboard .reg_call_out').hide();
            jQuery('.toolbar_dashboard .roll_up').hide();
            jQuery('.toolbar_content').animate({ 'top': '30px' }, 200, function () {
                jQuery('.toolbar_content').css({ 'width': '300px' });
                jQuery('.toolbar_dashboard').css({ 'width': '0px' });
                jQuery('.toolbar_share_text').css({ 'width': '0px' });
                jQuery('.toolbar_toggle a').addClass('minimized');
                jQuery('.toolbar_content').animate({ 'top': '0px' }, 200);
            });
        }
    });

    jQuery('.roll_up_link').live('click', function () {
        var cur_link = jQuery(this);


        if (cur_link.attr('id') == "rbox") {
            if (cur_link.data('dataLoaded') == undefined) {
                cur_link.data('dataLoaded', 'yes');
                linkClicked(cur_link,true);
                GetToolBarRecipeBoxData(this);
            }
            else
                linkClicked(cur_link,true);


        }
        else if (cur_link.attr('id') == "recent") {
            if (cur_link.data('dataLoaded') == undefined) {
                cur_link.data('dataLoaded', 'yes');
                linkClicked(cur_link,true);
                GetToolBarRecentlyViewedData(this);
            }
            else
                linkClicked(cur_link,true);

        }
        else if (cur_link.attr('id') == "glist") {
            if (cur_link.data('dataLoaded') == undefined) {
                cur_link.data('dataLoaded', 'yes');
                linkClicked(cur_link,true);
                GetToolBarGroceryListsData(this);
               
            }
            else
                linkClicked(cur_link,true);

        }
      

    });
}

function linkClicked(currentLink,isFirstTime) {
    var cur_link = jQuery(currentLink);
    if (cur_link.data('state') == undefined) { cur_link.data('state', 'down'); }
    var targ_list = ".toolbar_dashboard .roll_up ." + cur_link.attr('id');

    if (cur_link.data('state') != 'moving') {
        jQuery('.roll_list').not('.' + cur_link.attr('id')).css({ 'top': '0px' });
        jQuery('.roll_up_link').removeClass('selected');
        cur_link.addClass('selected');
        if (cur_link.data('state') == 'down') {
            cur_link.data('state', 'moving');
            var targ_top = jQuery(targ_list).outerHeight() * -1;
            jQuery(targ_list).animate({ 'top': targ_top }, 500, function () {
                jQuery('.roll_up_link').data('state', 'down');
                cur_link.data('state', 'up');

                if (isFirstTime == true) {
                   
                    WebTrendsCall(cur_link.attr('id').toString());
                }
            });
        }
        else {
            jQuery('.roll_up_link').removeClass('selected');
            cur_link.data('state', 'moving');
            jQuery(targ_list).animate({ 'top': '0px' }, 500, function () {
                jQuery('.roll_up_link').data('state', 'down');
            });
        }
    }
     
}

function WebTrendsCall(itemClicked) {

    switch(itemClicked)
    {
        case 'rbox':
            ntptEventTag('ev=membertoolbar_recipebox_bt&ActionType=Other');
            break;

        case 'recent':
            ntptEventTag('ev=membertoolbar_recentlyviewedrecipes_bt&ActionType=Other');
            break;

        case 'glist':
            ntptEventTag('ev=membertoolbar_grocerylist_bt&ActionType=Other');
            break;
         default:
         return true;

    }
    return false;

}
function CheckToolbarLists() {
    if (jQuery('.roll_list').length == 3) {
        jQuery('.roll_list').each(function () {
            var list_count = jQuery('li', jQuery(this)).length;
            if (list_count > 3) {
                jQuery('li.empty', jQuery(this)).hide();
            }
            else {
                jQuery('li.see_all', jQuery(this)).hide();
            }
        });
    }
    else {
        setTimeout("CheckToolbarLists()", 200);
    }
    jQuery('li.Error', jQuery(this)).hide();  
}


function CheckToolbarLists(ulElement) {
    var obj = jQuery("#" + ulElement);
    var list_count = jQuery('li', obj).length;
    if (list_count > 3) {
        jQuery('li.empty', obj).hide();
    }
    else {
        jQuery('li.see_all', obj).hide();
    }
    jQuery('li.Error', obj).hide();
}

function ToolbarErrorHandler(xhr, status, error, name, currentLink) {
    try {       
            jQuery("#" + name + "ID").attr("data-bind", "template: { name: '" + name + "TemplateBase" + "' }");
            var data = { "GroceryLists": null, "RecentRecipes": null, "RecipeBoxItems": null, "AvatarLink": null, "UserName": "pbuser", "IsKnown": true, "LastDateModified": null, "SerializedForm": null, "UniqueIdentifier": null, "DataCategory": 0 }
            ko.applyBindings(data, document.getElementById(name + "ID"));
            var obj = jQuery("#" + name);
            var list_count = jQuery('li', obj).length;
                jQuery('li.Error', obj).show();
                jQuery('li.empty', obj).hide();
                jQuery('li.see_all', obj).hide();
               
            }
     catch (err) 
        {           
            
}
 
}


function CheckToolbarRegCall() {
    var userData = js_getCookie("UserData").split("&");
    var len = userData.length;
    var pageViewCount = 0;
    for(var i = 0; i<len; i++)
    {
        var keyvalueArray = userData[i].split("=");
        if(keyvalueArray[0] == "UCONV-PgV") {
            pageViewCount = keyvalueArray[1];
            break;
        }
    }
    if(pageViewCount == 1){
        setTimeout("ShowRegCallOut()", 1000);
    }
}

function ShowRegCallOut() {
    if (isIE6) { jQuery('.toolbar_dashboard .reg_call_out').addClass('reg_call_out_ie6'); }

    jQuery('.toolbar_dashboard .reg_call_out').fadeIn(500, function () {
        reg_call_timeout = setTimeout("HideRegCallOut()", 10000);
    });
}

function HideRegCallOut() {
    jQuery('.toolbar_dashboard .reg_call_out').fadeOut(500);
}

//End Of File
