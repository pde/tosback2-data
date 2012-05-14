var validationResultsData = '';
var loadMsg = '';
var occTimeSpan = '';
var occHonoreeGender = '';
var loggedinUserFN = '';
var loggedinUserLN = '';


function InitLoadEvents() {
    $('.' + $("#Type").val()).addClass('selected');
    if ($("#FilterValue").val() != '') {
        $("#" + $("#FilterBy").val() + " > option").each(function() {
            if (this.value == $("#FilterValue").val())
                $("#Filter").html(this.text);
        });
    }
    else
        $("#Filter").html('All');

    if ($('#LoadEventsAdSpot1').size() > 0 && $('#LoadEventsAdSpot1').html() == "")
        adSpot.GetAdHTML($('#LoadEventsAdSpot1'), 'default', 'CALENDAR', 'ataGlancePromo1');

    if ($('#LoadEventsAdSpot2').size() > 0 && $('#LoadEventsAdSpot2').html() == "")
        adSpot.GetAdHTML($('#LoadEventsAdSpot2'), 'default', 'CALENDAR', 'ataGlancePromo2');

    if ($("#Type").val().toLowerCase() == "list") {
        $('.hmkEventListRoot').hmkListView("destroy");
        $(".hmkEventListRoot").hmkListView({ ajaxUrl: "/Events/List?StartDate=" + $("#Date").val(), filterBy: $("#FilterBy").val(), filterValue: $("#FilterValue").val(), onComplete: InitEventsList });
    }
    else if ($("#Type").val().toLowerCase() == "glance") {
        $('.hmkSliderRoot').hmkSlider("destroy");
        $(".hmkSliderRoot").hmkSlider({ initDataFunc: initEventDetail, ajaxUrl: "/Events/Glance", filterBy: $("#FilterBy").val(), filterValue: $("#FilterValue").val(), 
        noDataMsg: "<div class=\"ataglanceItem marginCenter border\"><div class=\"algnMid mt-2row pt-halfRow\"><p class=\"mb-qtRow upper large plumHmk\"><span class=\"peaGreenkHmk\"><strong>Save the date.</strong></span><br>Plan events, invite guests,<br>and set up reminders.</p><strong><a href=\"javascript:void(0);\" onclick=\"javascript:LoadAddEvent('');\" class=\"forward medium\">Add an event</a></strong> </div></div>" });
    }
    else if ($("#Type").val().toLowerCase() == "calendar") {
        $('.hmkCalendarRoot').html('');
        destroy_calendar();
        hmkInitCalendar('.hmkCalendarRoot', { ajaxUrl: "/Events/Calendar", filterBy: $("#FilterBy").val(), filterValue: $("#FilterValue").val() });
    }
    $('.hmkCalendarRoot').addClass('pt-2row');

    if (isRegisteredUser)
        $('.JQRegisteredUser').show();
    else if ($("#Type").val().toLowerCase() != "list")
        $('.JQGuestUser').show();
}

function InitializeDoubleClickHandler() {
    $(".JQPreventDblClick").live('click', function() {
        hallmarkBehaviors.hmkDisableButton('.JQDisableAction');
    });
}

var InitEventsList = function() {
    var firstElement = $('.hmkEventListRoot .accordionHead:first');
    if (firstElement) {
        firstElement.trigger('click');
    }
}

function LoadEventsList(startDate) {
    document.location.href = "/Events/Load/List?StartDate=" + startDate;
}

function ChangeFilterSelection(obj) {
    if (obj.value != "")
        $('.' + obj.id).val('');
}

function ApplyFilterSelection() {
    $('#calDropDown_box').css('display', 'none');
    if (($("#FilterValue").val() == '' && $("#GroupID").val() == '' && $("#Occasion").val() == '') || ($("#FilterBy").val() != "" && $("#FilterValue").val() == $("#" + $("#FilterBy").val()).val()))
        return;

    if ($("#GroupID").val() != '') {
        $("#FilterBy").val("GroupID");
        $("#FilterValue").val($("#GroupID").val());
    }
    else if ($("#Occasion").val() != '') {
        $("#FilterBy").val("Occasion");
        $("#FilterValue").val($("#Occasion").val());
    }
    else {
        $("#FilterBy").val("");
        $("#FilterValue").val("");
    }
    InitLoadEvents();
}

function SetFilterValue() {
    if ($("#FilterBy").val() != "")
        $("#" + $("#FilterBy").val()).val($("#FilterValue").val());
}

function GetRecWidgetHonoreeDisplayName(tabNumber) {
       
    var primaryHonoreeName = $('#JQEvent_' + tabNumber + 'PriHonName').val()
    var secondaryHonoreeName = $('#JQEvent_' + tabNumber + 'SecHonName').val()
    var recWidgDisplayName = '';
    if (secondaryHonoreeName != '')
        recWidgDisplayName = primaryHonoreeName.split(' ')[0] + " & " + secondaryHonoreeName.split(' ')[0];
    else
        recWidgDisplayName = primaryHonoreeName.split(' ')[0];
    return recWidgDisplayName;
}

function GetProductRecommendations(source, categoryID, objID, eventDescription, recipientRelation, senderRelation, sortOrder, isCarousel, gender, lifeStage, navigationURL, componentName, idlist, idmode, isCardshower, recWidgetHonoreeDisplayName, eventCategory) {
    
    if ("H" == categoryID || (("C" == categoryID || "F" == source) && ($("#Type").size() > 0 && $("#Type").val().toLowerCase() == "list")))
        return;

    //to check if the header contains anything else than the message "<firstname> might like for e.g. Home page
    if (typeof ($("#" + objID).attr("hdrDiv")) != 'undefined' && $("#" + $("#" + objID).attr("hdrDiv")).html().length > 0) {
        
        $("#" + $("#" + objID).attr("hdrDiv")).find('.xsmallCalTile').next().html("We recommend...");
        if (recWidgetHonoreeDisplayName != '' && recWidgetHonoreeDisplayName != undefined) {
            $("#" + $("#" + objID).attr("hdrDiv")).find('.xsmallCalTile').next().html(recWidgetHonoreeDisplayName + " might like...");
        }
    }

    var link = "See more";
    if (idmode == "in") {
        link = null != idlist && idlist != "" ? idlist.split(',').length > 5 ? "See more" : "" : "";
    }
    
    var headerTxt = $("#" + objID).attr("hdrDiv") ? $("#" + $("#" + objID).attr("hdrDiv")).html() : (recWidgetHonoreeDisplayName != '' && recWidgetHonoreeDisplayName != undefined) ? recWidgetHonoreeDisplayName + " might like..." : "Recommendations for " + eventDescription;
    
    if ($("#" + objID).html() == "") {
        $("#" + objID).addClass('loading');        
        if (("C" == categoryID && componentName != '' && (isCardshower != 'True' && isCardshower != true)) && eventDescription != "Thinking Of You") {
            if (componentName == "staticOtherRecommendations")
                $("#" + objID).html(headerTxt)
            contentSpot.AppendAdHTML($("#" + objID), 'ProductRecommendations', 'PRODUCTRECOMMENDATIONS', componentName, RecommendationsCallback);
        }
        else {
            
            var productLine = "";
            if (isCardshower == 'True' || isCardshower == true) {
                
                productLine = "PODCARD";
            }
            else {
               
                productLine = ($("#IsSubscribedUser").val().toLowerCase() == "true") ? "FINISHEDGOODS,PODCARD,ECARD" : "FINISHEDGOODS,PODCARD,FREEECARD";
            }
            var parameters = "eventDescription=" + encodeURIComponent(eventDescription) + "&recipientRelation=" + encodeURIComponent(recipientRelation) + "&senderRelation=" + encodeURIComponent(senderRelation) + "&gender=" + encodeURIComponent(gender) + "&productLine=" + productLine + "&age=" + lifeStage + "&idlist=" + idlist + "&idmode=" + idmode + "&eventCategory=" + eventCategory;

            if (isCardshower == 'True' || isCardshower == true) 
                parameters = parameters + "&productType=Greeting Card,Photo Card";
            
            $("#" + objID).hmkRecommendations({
                ajaxUrl: "/Recommendations/RecommendedProducts",
                params: parameters,
                alignment: "H",
                productSortOrder: sortOrder,
                isCarousel: isCarousel,
                headerText: headerTxt,
                headerLink: navigationURL,
                headerLinkText: link,
                successCallback: RecommendationsCallback,
                ajaxDataType: "json"
            });
        }
    }
}

function RecommendationsCallback() {
    $('.JQRecommendations').removeClass('loading');
    $(this).children(":first").show("slow");
    
    //Remove see all link from the purchased tab if it does not contain a title
    $('#Recommendations1').find('p').find('a').find('strong').each(function(index) {
        if($(this).html()==""){
            $(this).parent().remove();
        }
    });
}

function DisplayAddEventOverlay() {
    $("#ShowAddEvent").overlay({
        api: true,
        speed: 200,
        expose: {
            maskId: 'overlyMask',
            loadSpeed: 800,
            opacity: 0.9
        },
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getContent().find("div.wrap");
            // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
            if (wrap.is(":empty")) {
                wrap.load(this.getTrigger().attr("href"));
            }
        },
        onClose: function() {
            $("#ShowAddEvent.wrap").empty();
        }, closeOnClick: false
    }).load();
    $(".close").click(function() {
        document.getElementById("AddEvent").style.display = "none";
        $("#ShowAddEvent").overlay().close();
    });
}

function LoadAddEvent(startDate) {
    var params = (startDate != "") ? "StartDate=" + startDate : "";

    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/LoadAddEvent",
        data: params,
        dataType: "html",
        cache: false,
        error: function(e) {
        },
        success: function(data) {
            if (data != "") {
                $('#AddEvent').html(data);
                document.getElementById("AddEvent").style.display = 'block';
                DisplayAddEventOverlay();
                InitAddEvent();
                loadDatePickers();
            }
        }
    });
}

function InitAddEvent() {
    hallmarkBehaviors.hmkCustomFormFields();
    hallmarkBehaviors.hmkWidgets();
    //extendedBehaviors.hmkEnterKeyFormSubmit(); Disabling enter key submission to fix bug 17115
    extendedBehaviors.hmkFormFocus();
    $('#PrimaryHonoreeName').unbind('keypress.formEnterKey');
    $('#SecondaryHonoreeName').unbind('keypress.formEnterKey');
    clearAllErrorDivs();
    hallmarkBehaviors.hmkInitTextPlaceholders('.placeholderGen, .placeholderGenTA');
    InitTimeDropdowns();
    initializeInlineValidation();
    InitializeDoubleClickHandler();
    $('#MoreDetails').change(function() {
        if ($('#MoreDetails').is(':checked'))
            $('.addEventBtn').text($('.addEventBtn').attr("altText"));
        else
            $('.addEventBtn').text($('.addEventBtn').attr("btnText"));
    });
    InitTypeAhead();
    //hallmarkBehaviors.hmkSetCalendarIcon('#CSOcalendar', DisableInviteForPastEvent);
    DisableInviteForPastEvent();
    $('#PrimaryHonoreeName,#SecondaryHonoreeName').removeClass('JQValidateInputBoxInLine JQRequiredField JQValidateMinLength');
    $('#AnnualEvent').attr('checked',false);
}

function DisableInviteForPastEvent() {
    var eventStartDate = $('#CSOcalendar').datepicker('getDate');
    var tempDate = new Date();
    var today = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());

    if (eventStartDate < today) {
        $('#MoreDetails').attr("disabled", "true");
        $('#AnnualEvent').attr("checked", "true");
    }
    else
        $('#MoreDetails').removeAttr("disabled");
}

function InitEditEvent() {
    InitEditEventHeaders();
    $("#addEventLink").hide();
    var newRequestType = $("#RequestType").val().toLowerCase();
    if ((loggedinUserFN == '' || loggedinUserFN == null) && newRequestType == 'i') {
            newRequestType = 'd';
    }
    LoadEditEvent(newRequestType);
    InitializeDoubleClickHandler();
}

function InitEditEventHeaders() {
    $('.editHdr').removeClass('selected');
    $('.editFtr').hide();
    $('.' + $("#RequestType").val()).addClass('selected');
    $("#FT_" + $("#RequestType").val()).show();
}

function InitTimeDropdowns() {
    document.getElementById('EndTime').onchange = function(e) {
        if ($('#StartTime').val() == "" && $('#EndTime').val() != "")
            $('#StartTime').val("00:00");

        ValidateEventDetailsChange();
    }
    document.getElementById('StartTime').onchange = function(e) {
        if ($('#EndTime').val() == "" && $('#StartTime').val() != "")
            $('#EndTime').val("23:45");

        ValidateEventDetailsChange();
    }
}

function DisplayUpdateConfirmationOverlay(requestType) {
    if (($('#LoggedInUser\\.FirstName').val() == '' && $('#LoggedInUser\\.FirstName').css('visibility') == "visible") || ($('#LoggedInUser\\.LastName').val() == '' && $('#LoggedInUser\\.LastName').css('visibility') == "visible")) {
        $('#LoggedInUser\\.FirstName').blur();
        $('#LoggedInUser\\.LastName').blur();
        return;
    }

    var currentFormID = $('#EditEvent').find('form').attr('id');

    if (currentFormID == "frmInviteGuests" && $('#IsGuestsModified').val().toLowerCase() == 'true') {
        $("#TempRequestType").val(requestType);
        $('#inviteGuestUpdateOverlay').trigger('click');
    }
    else {
        if ($('#' + currentFormID).hmkFormChecker('didFormChange')) {
            $("#TempRequestType").val(requestType);

            $("#UpdateEventConfirmation").overlay({
                api: true,
                speed: 200,
                expose: {
                    maskId: 'overlyMask',
                    loadSpeed: 800,
                    opacity: 0.9
                },
                onBeforeLoad: function() {
                    // grab wrapper element inside content
                    var wrap = this.getContent().find("div.wrap");
                    // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
                    if (wrap.is(":empty")) {
                        wrap.load(this.getTrigger().attr("href"));
                    }
                },
                onClose: function() {
                    $("#UpdateEventConfirmation.wrap").empty();
                }, closeOnClick: false
            }).load();
            $(".close").click(function() {
                $("#UpdateEventConfirmation").overlay().close();
            });
            InitEnableEnterKey();
        }
        else
            LoadEditEvent(requestType.toLowerCase());
    }
}

/*
function LoadEditProgram(requestType) {
if (requestType == "d")
LoadEditProgramDetails()
else if (requestType == "i")
LoadInviteGuests();
else if (requestType == "u")
LoadEventReminders();
else if (requestType == "m")
LoadParticipants();
}*/

function LoadEditEvent(requestType) {
    if (requestType == "d")
        LoadEditEventDetails();
    else if (requestType == "i")
        LoadInviteGuests();
    else if (requestType == "u")
        LoadEventReminders();
    else if (requestType == "m")
        LoadParticipants();
}

function SaveEventDetails() {
    var currentFormID = $('#EditEvent').find('form').attr('id');

    if ($('#' + currentFormID).hmkFormChecker('didFormChange')) {
        if (currentFormID == 'frmUpdateEvent')
            UpdateEvent(false);
        else if (currentFormID == 'frmUpdateReminders')
            UpdateReminders(ConfirmUpdateReminderDetails);
    }
}

function CancelEventDetails() {    
    LoadEditEvent($("#TempRequestType").val().toLowerCase());
}

function LoadEditEventDetails() {
    clearAllErrorDivs();
    var params = "ID=" + $("#ID").val();
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/EditEventDetails",
        data: params,
        dataType: "html",
        error: function(e) {
        },
        success: function(data) {
            if (data != "") {
                $('#EditEvent').html(data);
                InitEditEventDetails();
            }
        }
    });
}

/*
function LoadEditProgramDetails() {
clearAllErrorDivs();
var params = "ID=" + $("#ID").val() + "&Programs[0].ProgramID=" + $("#ProgramID").val() + "&Programs[0].ProgramClassificationCode=" + $("#ClassificationCode").val();
console.log(params);
$.ajax({
type: "GET",
contentType: "application/x-www-form-urlencoded",
url: "/Programs/EditProgramDetails",
data: params,
dataType: "html",
error: function(e) {
//alert('error' + e);
},
success: function(data) {
if (data != "") {
$('#EditProgram').html(data);
InitEditEventDetails();
}
else { }
}
});
}*/

function InitEditEventDetails() {
    initializeInlineValidation();
    $("#RequestType").val('D');
    InitEditEventHeaders();
    hallmarkBehaviors.hmkCustomFormFields();
    hallmarkBehaviors.hmkWidgets();
    extendedBehaviors.hmkEnterKeyFormSubmit();
    extendedBehaviors.hmkFormFocus();
    hallmarkBehaviors.hmkInitTextPlaceholders('.placeholderGen, .placeholderGenTA');
    ChangeEventType();
    InitTimeDropdowns();
    InitTypeAhead();
    hallmarkBehaviors.hmkSetCalendarIcon('#StartDate', InitPastEvent);
    $("#AddressDetails").hmkFormChecker();
    $(".JQNotifyGuests").hmkFormChecker();
    $('#frmUpdateEvent').hmkFormChecker();

    if ($("#EventLocation\\.AddressLine1").val() != "")
        $(".accordionHead").trigger('click');

    PopulateOmnitureForEditEvent("edit details");
    loadDatePickers();
    $('#OccassionHonoreeTypeD').val($('#OccassionHonoreeType').val());
    
}


function InitActionDropdown() {
    $("input:radio").unbind("click.clearSelection").bind("click.clearSelection", function() {
        $(this).closest('ul').find('li').each(function() {
            $(this).find("input:radio").attr("checked", false);
        });
        $(this).attr("checked", true);
    });
}

function InitPastEvent() {
    ValidateEventDetailsChange();

    var eventStartDate = $('#StartDate').datepicker('getDate');
    var tempDate = new Date();
    var today = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());

    if (eventStartDate < today) {
        $('#AnnualEvent').attr("checked", true);
        $('#AnnualEvent').attr("disabled", true);
    }
    else
        $('#AnnualEvent').attr("disabled", false);
}

function ValidateEventDetailsChange() {
    if ($(".JQNotifyGuests").hmkFormChecker('didFormChange')) {
        $('#NotifyParticipants').attr("checked", true);
        $('#NotifyParticipants').attr("disabled", true);
        $("#NotifyGuests").val(true);
    }
    else {
        $('#NotifyParticipants').attr("disabled", false);
        $('#NotifyParticipants').attr("checked", false);
        $("#NotifyGuests").val(false);
    }
}

function UpdateEvent(showConfirmationOverlay) {
    clearAllErrorDivs();

    if ($("#AddressDetails").hmkFormChecker('didFormChange'))
        $("#EventLocation\\.AddressID").val("");

    $('#frmUpdateEvent').ajaxSubmit({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/UpdateEventDetails",
        dataType: "json",
        error: function(e) {
        },
        success: function(data) {
            if (null != data.ValidationErrors && data.ValidationErrors.length > 0)
                displayErrorMessagesOnReLoad(data.ValidationErrors, 'EditEvent');
            else {
                $("#AddressID").val(data.EventLocation.AddressID);
                $("#Occasion").val(data.Occasion);
                $("#HonoreeList\\[0\\]\\.ID").val(data.HonoreeList[0].ID);
                $("#HonoreeList\\[1\\]\\.ID").val(data.HonoreeList[1].ID);
                $("#Programs\\[0\\]\\.ProgramTitle").val(data.Title);
                $("#Programs\\[0\\]\\.ProgramStartDate").val($('#StartDate').val());
                $("#Programs\\[0\\]\\.ProgramEndDate").val($('#StartDate').val());
                $("#Programs\\[0\\]\\.ProgramStartTime").val(data.StartTime);
                $("#Programs\\[0\\]\\.ProgramEndTime").val(data.EndTime);
                $("#Programs\\[0\\]\\.AnnualProgram").val(data.AnnualEvent);

                $('#NotifyParticipants').attr("disabled", false);
                $("#IsRecurringEvent").val(data.AnnualEvent);
                $(".JQNotifyGuests").hmkFormChecker();
                $("#AddressDetails").hmkFormChecker();
                $('#frmUpdateEvent').hmkFormChecker();
                $('#DisplayTitle').html(data.Title);

                if (showConfirmationOverlay)
                    DisplayEditEventConfirmationOverlay();
                else
                    LoadEditEvent($("#TempRequestType").val().toLowerCase());
            }
            hallmarkBehaviors.hmkEnableButton();
        }
    });
}

function LoadInviteGuests() {
    clearAllErrorDivs();
    hallmarkBehaviors.hmkEnableButton('.btnInviteMoreUpdate');
    var params = "ID=" + $("#ID").val() + "&RequestType=I";
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "/Programs/LoadInviteGuests",
        data: params,
        dataType: "html",
        error: function(e) {
        },
        success: function(data) {
            if (data != "") {
                $('#EditEvent').html(data);
                InitInviteGuests();
                $('#facebookInvite').hide();
                extendedBehaviors.PhoneTabOut();
            }
            else
                $(".inviteMoreSeeMoreItem").hide();
        }
    });
}

function InitInviteGuests() {
    $("#RequestType").val('I');
    initializeInlineValidation();
    InitEditEventHeaders();
    inviteMoreGuests();
    SetInviteGuestsModify();
    PopulateOmnitureForEditEvent("add guests");

    if ($('.noMoreContact').size() > 0 || $('.inviteMorePersonID').size() <= 0)
        $(".inviteMoreSeeMoreItem").hide();
}

function SendInvitation(participants) {
    var programId = $("#ProgramID").val();    
    if (programId == "0") {
        clearAllErrorDivs();
        if (participants.length > 0) {
            var programPE = [];
            programPE[0] = { "ProgramClassificationCode": "I", "Participants": (participants), "AllowGuestsToInvite": $('#AllowOthersToInvite').is(':checked') };
            var eventPE = { "eventParticipants": JSON.stringify({ "ID": $('#ID').val(), "Programs": (programPE) , "AnnualEvent": $('#IsRecurringEvent').val()}) };
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "/Events/SendInvitation",
                data: eventPE,
                dataType: "json",
                error: function(e) {
                },
                success: function(data) {
                    $('#SaveForLater').hide();
                    if (null != data.ValidationErrors && data.ValidationErrors.length > 0) {
                        displayErrorMessagesOnReLoad(data.ValidationErrors, 'EditEvent');
                        hallmarkBehaviors.hmkEnableButton();
                    }
                    else {
                        if (data.DuplicateEmailAddresses != null && data.DuplicateEmailAddresses.length > 0) {
                            var duplicateParticipants = BuildDuplicateEmailList(data.DuplicateEmailAddresses,false);
                            $('#DuplicateEmailDiv').html(duplicateParticipants);
                            $("#DuplicateEmailDiv").show();
                            hallmarkBehaviors.hmkEnableButton();
                        }
                        else {
                            $("#DuplicateEmailDiv").hide();
                            document.location.href = "/Programs/EditProgram/" + data.Programs[0].ProgramID + "/" + data.Programs[0].ProgramClassificationCode + "/M";
                        }
                    }
                }
            });
        }
        else
            hallmarkBehaviors.hmkEnableButton();
    }
    else {
        SendProgramInvitation(participants);
    }
}

function BuildDuplicateEmailList(duplicateParticipants, isExternalParticipant) {    
    var emails = duplicateParticipants.split(',');
    var emailList = '<li>' + emails[0] + '</li>';

    for (var i = 1; i < emails.length; i++) {
        emailList += '<li>' + emails[i] + '</li>';
    }

    if (isExternalParticipant == true) {
            var dupDivText = '<div class="contain" id="">  <div class="messageError fltLeft"></div>  <div class="contain">' +
    '<p style="display: block;" id="errMsgHdr" class="errorColor"> You\'ve already used this email address to invite someone. To send another invitation, please use a different email address.</p>' +
    '<ul class="errorColor bulletList" id="errMsgs">' + emailList + '</ul>  </div></div>';
    
    }
    else {
        var dupDivText = '<div class="contain" id="">  <div class="messageError fltLeft"></div>  <div class="width-9col">' +
    '<p style="display: block;" id="errMsgHdr" class="errorColor"> You\'ve already used this email address to invite someone. To send another invitation, please use a different email address.</p>' +
    '<ul class="errorColor bulletList" id="errMsgs">' + emailList + '</ul>  </div></div>';    
    }

    return dupDivText;
}

function LoadParticipants() {
    clearAllErrorDivs();
    var params = "ID=" + $("#ID").val() + "&RequestType=I";
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "/Programs/LoadParticipants",
        data: params,
        dataType: "html",
        error: function(e) {
        },
        success: function(data) {
            if (data != "") {
                $('#EditEvent').html(data);
                $("#RequestType").val('M');
                InitEditProgramHeaders();
                $('#facebookInvite').hide();
            }
            else
                $(".JQSeeMoreParticipants").hide();
        }
    });
}

function LoadConversation() {
    $('.JQGuests').removeClass('selected');
    $('.JQDetails').removeClass('selected');
    $('.JQConversation').addClass('selected');
    $('#eventContentContainer').hide();
    $('.EventDetailsComments').hide();
    $('.csGuestCommentWidget').hide();
    $('#GuestList').hide();
    $('.inviteeStatusBar').hide();
    $('.printBtn').hide();
    $('#eventConversationContainer').show();
    getComments('commentUL',100,1,false);
    $('.commentTitle').show();
    $('.commentBox').show();
    $('.commentGuidelines').show();
    $('.commentShare').show();
    $('#noCommentsMessage').show();
    $('.RecommendationsContainer').hide();    
}

function loadCommentsWidget() {
    getComments('widgetCommentUL', 3, 1,false);
}

var commentsDisabled = false;

function addComment(commentULid, commentBoxid, numComments) {
    if (IsProgramParticipant()&&commentsDisabled==false) {
        commentsDisabled = true;
        var programID = $('#ProgramID').val();
        var myComment = document.getElementById(commentBoxid).value;
        var params = { object: "Program", action: "AddComment", params: [{ name: "ProgramClassificationCode", value: $('#ProgramClassificationCode').val() }, { name: "ProgramID", value: programID }, { name: "Content", value: myComment }, { name: "CommentReferrerType", value: "P"}] }
        var jsonReq = "&JSONRequest=" + encodeURIComponent(JSON.stringify(params)) + "&ParticipantID=" + $('#IsProgramParticipantID').val();
        var parent = $('#' + commentBoxid).parent();
        var commentErrorDiv = parent.find('.commentError');
        if (myComment.length <= 1000 && myComment.length > 0) {
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "/Programs/addComment",
                data: jsonReq,
                dataType: "json",
                error: function(e) {
                    commentsDisabled = false;
                },
                success: function(data) {
                    if (null != data) {
                        var jObj = JSON.parse(data);
                        if (null != jObj.status.reasons[0]) {
                            commentErrorDiv.html('<div class="arrowErrorForm fltLeft"></div><div>' + jObj.status.reasons[0].message + '</div>');
                        }
                        else {
                            EventDetailsOmnitureCall('add comment popup');
                            $('#' + commentULid).html('');
                            $('#' + commentBoxid).val('');
                            commentErrorDiv.html('');
                            getComments(commentULid, numComments, 1, false);
                            $('.commentPopup').hide();
                        }
                    }
                    commentsDisabled = false;
                }
            });
        }
        else if (myComment.length == 0) {
            commentErrorDiv.html('<div class="arrowErrorForm fltLeft"></div><div>Please type a comment in the box before clicking <strong>Share With Group</strong>.</div>');
            commentsDisabled = false;
        }
        else {
            commentErrorDiv.html('<div class="arrowErrorForm fltLeft"></div><div>Your comment is too long. Please shorten it and try again.</div>');
            commentsDisabled = false;
        } 
    }    
}

function deleteCommentButtonClicked(commentId, creatorID,commentULid, numComments){
    $("#deleteCommentOverlay").overlay({
        api: true,
        speed: 200,
        expose: {
            maskId: 'overlyMask',
            loadSpeed: 800,
            opacity: 0.9
        },
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getContent().find("div.wrap");
            // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
            if (wrap.is(":empty")) {
                wrap.load(this.getTrigger().attr("href"));
            }
        },
        onClose: function() {
            $("#DeleteCommentOverlay.wrap").empty();
        }, closeOnClick: false
    }).load();
    $(".close").click(function() {
        $("#DeleteCommentOverlay").overlay().close();
    });

    $('#deleteCommentOverlayBtn').unbind('click');
    $("#deleteCommentOverlayBtn").click(function() {
    deleteComment(commentId, creatorID,commentULid, numComments);
    });
}

function deleteComment(commentId, creatorID, commentULid, numComments) {
    var programID = $('#ProgramID').val();
    var params = { object: "Program", action: "DeleteComment", params: [{ name: "CommentID", value: commentId.toString() }, { name: "ProgramID", value: programID }, { name: "ProgramClassificationCode", value: $('#ProgramClassificationCode').val() }, { name: "CreatorID", value: creatorID.toString() }, { name: "CommentReferrerType", value: "P"}] };
    var jsonReq = "&JSONRequest=" + JSON.stringify(params) + "&ParticipantID=" + $('#IsProgramParticipantID').val();

    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Programs/DeleteComment",
        data: jsonReq,
        dataType: "json",
        error: function(e) {
        },
        success: function(data) {
            if (null != data) {
                var jObj = JSON.parse(data);
                getComments(commentULid, numComments, 1,false);
                $("#deleteCommentOverlay").overlay().close();
            }
        }
    });
}

function getComments(commentULid, numComments, pageNum,shouldAppend) {
        var programID = $('#ProgramID').val();
        var params = { object: "Program", action: "GetComments", params: [{ name: "ProgramClassificationCode", value: $('#ProgramClassificationCode').val() }, { name: "ProgramID", value: programID }, { name: "Page", value: pageNum.toString() }, { name: "RecordsPerPage", value: numComments.toString() }, { name: "CommentReferrerType", value: "P"}] };
        var jsonReq = "&JSONRequest=" + JSON.stringify(params) + "&ParticipantID=" + $('#IsProgramParticipantID').val();

        $('#' + commentULid).addClass('loading');
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "/Programs/GetComments",
            data: jsonReq,
            dataType: "json",
            error: function(e) {
            },
            success: function(data) {
                gotComments(commentULid, data, numComments,shouldAppend);
            }
        });
}

function gotComments(commentULid, data, numComments, shouldAppend) {
    if (null != data && data != "") {
        var jObj = JSON.parse(data);
        var todayDate = new Date();
        todayDate.setHours(0,0,0,0);
        var liContent = "";
        
        if (jObj.comments.length > 0) {
            var i = 0;
            
            for (i = 0; i < jObj.comments.length; i++) {
                var createdDate = new Date(jObj.comments[i].dateCreated);
                createdDate.setHours(0,0,0,0);
                var createdDateParts = jObj.comments[i].dateCreated.split("/");
                var commentId = jObj.comments[i].id;
                                                                                                                                                                                                                                                                                                                                                                                                                                                //function deleteCommentButtonClicked(commentId, commentULid, numComments)
                liContent += "<li id='comment_" + commentId + "'>";
                liContent +=    "<div class='clear remainder mt-qtRow'>";
                liContent += "<p class='clear fltLeft xlarge mb-0'>" + jObj.comments[i].createdBy.firstName + " " + jObj.comments[i].createdBy.lastName;
                
                if (todayDate.toString('yyyy-MM-dd')  == createdDate.toString('yyyy-MM-dd')) {
                    liContent += "<span class='lightGrey mlt-2 mt-1 small'>TODAY</span>";
                } else {
                    liContent += "<span class='lightGrey mlt-2 mt-1 small'>" + createdDateParts[0] + "/" + createdDateParts[1] + "</span>";
                }
                liContent += "</p>";
                liContent += "<a class=\'remove " + ((jObj.comments[i].isDeleteable == true) ? "" : "hide ") + " fltRight\' " + " href='javascript:void(0);' onclick=\"deleteCommentButtonClicked(" + commentId + "," + jObj.comments[i].createdBy.id + ",'" + commentULid + "'," + numComments + ");\"></a>";
                liContent +=    "</div>";
                liContent +=    "<div class='clear remainder btmBorder pb-qtRow'>";
                liContent +=    "<p class='mb-0 mrt-4'>" + jObj.comments[i].content.replace(/\u000a/g,'<br/>') + "</p>";
                liContent +=    "</div>";
                liContent += "</li>";
            }
        }
        else if(jObj.status.code == "1004"){
            liContent = "<span id='noCommentsMessage'>Unable to fetch Comments at this time</span>";
        }
        else {
            var programStartDate = new Date($('#ProgramStartDate').val());
            if(programStartDate >= todayDate){
                liContent = "<span id='noCommentsMessage'>Leave a comment and get the conversation started.</span>";
            }
            else{
                if($('#ProgramClassificationCode').val()=="C"){
                    liContent += "<li>The Card Shower is over, so it's too late to leave a comment.</li>";
                }
                else if($('#ProgramClassificationCode').val()=="I"){
                    liContent += "<li>The event is over, so it's too late to leave a comment.</li>";
                }
            }
        }
        $('#'+commentULid).parent().parent().find('h2').show();
        var seeAllcontent;
        
        var currentPage;
        var totalPages;
        var commentsCount;
        var showSeeMoreButton = false;
        if(jObj.pagination){
            currentPage = jObj.pagination.page;
            totalPages = jObj.pagination.totalPages;
            commentsCount = jObj.pagination.totalCount;
            
            if((currentPage!=null) && (totalPages!=null) &&(currentPage < totalPages)){
                showSeeMoreButton = true;
            }
        }
        
        //show "see all" button on widget
        if ((commentULid == "widgetCommentUL" || commentULid =="guestWidgetCommentUL") && (commentsCount >= 4)) {
            
            //liContent += "<li><div class='clear remainder'><p><a class='button primary middle mt-halfRow' onclick='javascript:seeAllBtnClicked();'>See all ("+commentsCount+")</a></p></div></li>";
            var seeAllCommentsBtn = $('#'+commentULid).parent().parent().find('.seeAllCommentsBtn');
            seeAllCommentsBtn.html("<a class='pointer' onclick='javascript:seeAllBtnClicked();'>See all ("+commentsCount+")</a>");
        }
        else if(commentsCount < 4){
            $('.seeAllCommentsBtn').html('');
        }
        
        if(shouldAppend==true){
            $('#'+commentULid).find('.seeMoreButton').hide();
        }
        
        var liSeeMoreBtn="";
        if(showSeeMoreButton==true){
            liSeeMoreBtn += "<li class='seeMoreButton'>";
            liSeeMoreBtn +=         "<div class='clear remainder'>";
            liSeeMoreBtn +=             "<span>";
            liSeeMoreBtn +=                   "<a href='javascript:void(0);' class='button primary middle mt-halfRow' onclick=\"appendCommentPage('"+commentULid+"','"+numComments+"',"+(currentPage+1)+")\">Show more</a>";
            liSeeMoreBtn +=             "</span>";
            liSeeMoreBtn +=         "</div>";
            liSeeMoreBtn +=    "</li>";
        }
        
        //only show paginatition links in the conversation tab
        if(commentULid != "commentUL"){
            liSeeMoreBtn = "";
        }
        
        if(shouldAppend==true){
            $('#' + commentULid).append(liContent + liSeeMoreBtn);
            $('html, body').animate({
                scrollTop: (0+ $('#' + commentULid).children().last().offset().top)
            }, 1);
        }
        else{
            $('#' + commentULid).html(liContent + liSeeMoreBtn);
        }

        $('#' + commentULid).removeClass('loading');

        if ($('#IsOwner').val().toLowerCase() == 'false')
            PopulateEventDetailsOmniture('comments guest');
        else
            PopulateEventDetailsOmniture('comments owner');
    }
}

function appendCommentPage(commentULid,numComments,pageNum){
    getComments(commentULid,numComments,pageNum, true);
}

function seeAllBtnClicked(){
    $('.JQConversation').click();
    $("html, body").animate({ scrollTop: 0 }, "slow");
}
var AppendGuests = function(data) {
    if (data != "") {
        $(".PaginationParams").remove();
        $('.primaryTable > tbody:last').append(data);
        $('.JQGuestList').hide();
        $('.JQGuestTab').show();
        $('.JQOwner').show();   
              
        if ($("#IsOwner").val().toLowerCase() != "true")
            $('.JQOwner').hide();

        if ($('.noMoreParticipants').size() > 0)
            $(".JQSeeMoreParticipants").remove();

        if (IsPastDate($('#ProgramStartDate').val())) {
            $('.JQPastEvent').hide();
            $('.JQPastEvent').remove();
        }

        FixStripes();
    }
    else
        $(".JQSeeMoreParticipants").remove();
}

function FixStripes() {
    $('tbody tr').removeClass('inlineNeutral').filter(':odd').addClass('inlineNeutral');
}

/*function DisplayDeleteParticipantOverlay(participantID) {
    hallmarkBehaviors.hmkEnableButton('.btnDeleteParticipant');
    extendedBehaviors.hmkFormFocus();
    $("#DisplayParticipantName").html($("#Name_" + participantID).html());
    $("#ParticipantID").val(participantID);

    $("#DeleteParticipant").overlay({
        api: true,
        speed: 200,
        expose: {
            maskId: 'overlyMask',
            loadSpeed: 800,
            opacity: 0.9
        },
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getContent().find("div.wrap");
            // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
            if (wrap.is(":empty")) {
                wrap.load(this.getTrigger().attr("href"));
            }
        },
        onClose: function() {
            $("#DeleteParticipant.wrap").empty();
        }, closeOnClick: false
    }).load();
    $(".close").click(function() {
        $("#DeleteParticipant").overlay().close();
    });
}*/

function ClearAgeAndGenderAndChangeEventType() {
    $('#howLong').val('');
    $('#OccassionHonoreeTypeD').val('');
    ChangeEventType();
}

function ChangeEventType() {
    hideErrorDiv(msgDiv, $("#PrimaryHonoreeName"));
    hideErrorDiv(msgDiv, $("#SecondaryHonoreeName"));
    

    if ($('#TypeID').val() == '500001') {
        //Anniversary
        $("#SecondaryHonoreeName").show();
        $("#SecondaryHonoreeName").parent().find('.names').css('width', $("#SecondaryHonoreeName").width()); //Type ahead dropdown was getting initialized with a width of 1px.  This is a fix.
        $('#howLongLabel').text('How long?');
        $('#howLongDiv').show();
        $('#forWhom').hide();
    }
    else if ($('#TypeID').val() == '500002') {
        //Baby  Shower
        $('#howLongDiv').hide();
        $('#forWhom').show();
        $("#SecondaryHonoreeName").val('');
        $("#HonoreeList\\[1\\]\\.ID").val('');
        $("#SecondaryHonoreeName").hide();
    }
    else if ($('#TypeID').val() == '500005') {
        //Birthday
        $('#howLongLabel').text('How old?');
        $('#howLongDiv').show('slow');
        $('#forWhom').show('slow');
        $("#SecondaryHonoreeName").val('');
        $("#HonoreeList\\[1\\]\\.ID").val('');
        $("#SecondaryHonoreeName").hide('slow');
    }
    else if ($('#TypeID').val() == '500011') {
        //graduation
        $('#howLongDiv').hide();
        $('#forWhom').show();
        $("#SecondaryHonoreeName").val('');
        $("#HonoreeList\\[1\\]\\.ID").val('');
        $("#SecondaryHonoreeName").hide();
    }
    else if ($('#TypeID').val() == '500013') {
    //wedding
        $("#SecondaryHonoreeName").show();
        $('#howLongDiv').hide();
        $('#forWhom').hide();
    }
    else if ($('#TypeID').val() == '0') {
        //null
        $('#howLongDiv').hide();
        $('#forWhom').hide();
        $("#SecondaryHonoreeName").val('');
        $("#HonoreeList\\[1\\]\\.ID").val('');
        $("#SecondaryHonoreeName").hide();
    }
    else {
        $("#SecondaryHonoreeName").val('');
        $("#HonoreeList\\[1\\]\\.ID").val('');
        $("#SecondaryHonoreeName").hide();
        $('#forWhom').hide();
        $('#howLongDiv').hide();
    }
}

function InitTypeAhead() {
    $('#PrimaryHonoreeName').each(function(i, v) {
        InitTypeAheadFirstContact($(this), $(this).next('#HonoreeList\\[0\\]\\.ID').attr('id'));
    });
    $('#SecondaryHonoreeName').each(function(i, v) {
        InitTypeAheadSecondContact($(this), $(this).next('#HonoreeList\\[1\\]\\.ID').attr('id'));
    });
}
function SetAgeGender() {
    var annivDD = $('#HonoreeList\\[0\\]\\.AnniversaryDay').val();
    var annivMM = $('#HonoreeList\\[0\\]\\.AnniversaryMonth').val();
    var annivYYYY = $('#HonoreeList\\[0\\]\\.AnniversaryYear').val();

    var birthDD = $('#HonoreeList\\[0\\]\\.BirthDay').val();
    var birthMM = $('#HonoreeList\\[0\\]\\.BirthMonth').val();
    var birthYYYY = $('#HonoreeList\\[0\\]\\.BirthYear').val();


    if ($('#TypeID').val() == '500001' || $('#TypeID').val() == '500013' && annivDD != '' && annivDD > 0 && annivMM != '' && annivMM > 0 && annivYYYY != '' && annivYYYY > 0)
        occTimeSpan = calculateTimeSpan($('#HonoreeList\\[0\\]\\.AnniversaryDay').val(), $('#HonoreeList\\[0\\]\\.AnniversaryMonth').val(), $('#HonoreeList\\[0\\]\\.AnniversaryYear').val());
    else if(birthDD != '' && birthDD > 0 && birthMM != '' && birthMM > 0 && birthYYYY != '' && birthYYYY > 0)
        occTimeSpan = calculateTimeSpan($('#HonoreeList\\[0\\]\\.BirthDay').val(), $('#HonoreeList\\[0\\]\\.BirthMonth').val(), $('#HonoreeList\\[0\\]\\.BirthYear').val());
    else
        occTimeSpan = '';
    $('#howLong').val(occTimeSpan);
    $('#OccassionHonoreeTypeD').val($('#HonoreeList\\[0\\]\\.Gender').val());
}

var FirstHonoreeCallBack = function(obj) {
if (obj.Key) {
    $('#HonoreeList\\[0\\]\\.ID').val(obj.Key);
        $('#HonoreeList\\[0\\]\\.AnniversaryDay').val(obj.AnnivDay);
        $('#HonoreeList\\[0\\]\\.AnniversaryMonth').val(obj.AnnivMonth);
        $('#HonoreeList\\[0\\]\\.AnniversaryYear').val(obj.AnnivYear);
        $('#HonoreeList\\[0\\]\\.BirthDay').val(obj.BirthDay);
        $('#HonoreeList\\[0\\]\\.BirthMonth').val(obj.BirthMonth);
        $('#HonoreeList\\[0\\]\\.BirthYear').val(obj.BirthYear);
        $('#HonoreeList\\[0\\]\\.Gender').val(obj.Gender);
        if ($('#TypeID').val() == '500001' || $('#TypeID').val() == '500013') {
            if (obj.AnnivDay && obj.AnnivDay != '' && obj.AnnivMonth && obj.AnnivMonth != '' && obj.AnnivYear && obj.AnnivYear != '') {
                $('#howLong').focus();
                $('#howLong').val(calculateTimeSpan(obj.AnnivDay, obj.AnnivMonth, obj.AnnivYear));
                occTimeSpan = calculateTimeSpan(obj.AnnivDay, obj.AnnivMonth, obj.AnnivYear);
                //$('#Programs\\[0\\]\\.OccasionTimeSpan').val(calculateTimeSpan(obj.AnnivDay, obj.AnnivMonth, obj.AnnivYear));
            }
        }
        else if (obj.BirthDay && obj.BirthDay != '' && obj.BirthMonth && obj.BirthMonth != '' && obj.BirthYear && obj.BirthYear != '') {
            $('#howLong').focus();
            $('#howLong').val(calculateTimeSpan(obj.BirthDay, obj.BirthMonth, obj.BirthYear));
            occTimeSpan = calculateTimeSpan(obj.BirthDay, obj.BirthMonth, obj.BirthYear);
            //$('#Programs\\[0\\]\\.OccasionTimeSpan').val(calculateTimeSpan(obj.BirthDay, obj.BirthMonth, obj.BirthYear));
        }
        if (obj.Gender && obj.Gender != '' && $('#TypeID').val() != '500001' && $('#TypeID').val() != '500013') {
            $('#OccassionHonoreeTypeD').val(obj.Gender);
            $('#HonoreeList\\[0\\]\\.Gender').val(obj.Gender);
            occHonoreeGender = obj.Gender;

        }
        else {
            $('#OccassionHonoreeTypeD').val('');
            $('#HonoreeList\\[0\\]\\.Gender').val('');
            occHonoreeGender = '';
        }
    }
    else {
        $('#HonoreeList\\[0\\]\\.ID').val("");
        $('#howLong').val('');
        $('#OccassionHonoreeTypeD').val($('#OccassionHonoreeTypeD').find('option').first().val());
    }
}

var SecondHonoreeCallBack = function(obj) {
    if (obj.Key) {
        $('#HonoreeList\\[1\\]\\.AnniversaryDay').val(obj.AnnivDay);
        $('#HonoreeList\\[1\\]\\.AnniversaryMonth').val(obj.AnnivMonth);
        $('#HonoreeList\\[1\\]\\.AnniversaryYear').val(obj.AnnivYear);
        $('#HonoreeList\\[1\\]\\.BirthDay').val(obj.BirthDay);
        $('#HonoreeList\\[1\\]\\.BirthMonth').val(obj.BirthMonth);
        $('#HonoreeList\\[1\\]\\.BirthYear').val(obj.BirthYear);
        $('#HonoreeList\\[1\\]\\.Gender').val(obj.Gender);
        $('#HonoreeList\\[1\\]\\.ID').val(obj.Key);
    }
    else {
        $('#HonoreeList\\[1\\]\\.ID').val("");
    }
}

var TypeAheadDataParser = function(contact) {
    var contactArray = new Array();

    for (var i = 0; i < contact.length; i++) {
        contactArray[i] = {
            "Key": contact[i].RelatedPersonID,
            "Text": contact[i].DisplayName,
            "BirthDay": contact[i].BirthDay,
            "BirthMonth": contact[i].BirthMonth,
            "BirthYear": contact[i].BirthYear,
            "AnnivDay": contact[i].AnnivDay,
            "AnnivMonth": contact[i].AnnivMonth,
            "AnnivYear": contact[i].AnnivYear,
            "Gender": contact[i].Gender,
            "IsConnected": contact[i].IsConnected
             };
    }
    return contactArray;
}


function calculateTimeSpan(dd, mm, yyyy) {
    var bday = parseInt(dd);
    var bmo = (parseInt(mm) - 1);
    var byr = parseInt(yyyy);
    var byr;
    var age;
    var now = new Date();
    tday = now.getDate();
    tmo = (now.getMonth());
    tyr = (now.getFullYear());

    {
        if ((tmo > bmo) || (tmo == bmo & tday >= bday))
        { age = byr }

        else
        { age = byr + 1 }
        return (tyr - age);
    }
}


function InitTypeAheadFirstContact(obj, target) {
    $(obj).hmkTypeAheadish({ ajaxUrl: '/ConnectionsAddressBook/GetContactsByFilter',
        displayField: 'Text',
        dataListClass: 'names',
        dataItemClass: 'nameItem',
        dataItemSelectedClass: 'selected',
        specialDisplayField: "IsConnected",
        specialDisplayItemClass: "connected2",
        callback: FirstHonoreeCallBack,
        parser: TypeAheadDataParser
    });
}

function InitTypeAheadSecondContact(obj, target) {
    $(obj).hmkTypeAheadish({ ajaxUrl: '/ConnectionsAddressBook/GetContactsByFilter',
        displayField: 'Text',
        dataListClass: 'names',
        dataItemClass: 'nameItem',
        dataItemSelectedClass: 'selected',
        specialDisplayField: "IsConnected",
        specialDisplayItemClass: "connected2",
        callback: SecondHonoreeCallBack,
        parser: TypeAheadDataParser
    });
}

function AddEvent() {    
    clearAllErrorMessages();    
    $('#CSODateInvalid').hide();
    var eventPE = $("#frmAddEvent").serialize();
    eventPE += "&OccasionTimeSpan=" + occTimeSpan + "&OccassionHonoreeType=" + occHonoreeGender;
    $.post('/Events/AddEvent', eventPE, handleAddEventOptions, "json");
}

function handleAddEventOptions(jsonResponse) {
    if (null != jsonResponse.ValidationErrors && jsonResponse.ValidationErrors.length > 0) {
        displayErrorMessagesOnReLoad(jsonResponse.ValidationErrors, 'AddEvents');
        hallmarkBehaviors.hmkEnableButton($('#quickAdd'));
    }
    else {
        PopulateOmnitureForAddEvent();
	    document.location.href = document.URL;
        window.location.reload(true);
    }
}

function AddGuestsAndDetails() {
    clearAllErrorMessages();
    var eventPE = $("#frmAddEvent").serialize();
    eventPE += "&OccasionTimeSpan=" + occTimeSpan + "&OccassionHonoreeType=" + occHonoreeGender;
    hallmarkBehaviors.hmkDisableButton($('#btAddMore'));
    $.post('/Events/AddEvent', eventPE, handleAddGuestsAndDetails, "json");
}

function handleAddGuestsAndDetails(jsonResponse) {
    if (null != jsonResponse.ValidationErrors && jsonResponse.ValidationErrors.length > 0) {
        displayErrorMessagesOnReLoad(jsonResponse.ValidationErrors, 'AddEvents');
        hallmarkBehaviors.hmkEnableButton($('#btAddMore'));
    }
    else {
        PopulateOmnitureForAddEvent();
        if(jsonResponse.LoggedInUser.FirstName==null || jsonResponse.LoggedInUser.FirstName=="" || jsonResponse.LoggedInUser.LastName==null|| jsonResponse.LoggedInUser.LastName=="")
            document.location.href = "/Events/EditEvent/" + jsonResponse.ID + "/D";
        else
        document.location.href = "/Events/EditEvent/" + jsonResponse.ID + "/I";
    }
}

function SaveEventTypePreferences(formID, callBack) {
    if (formID == "frmEventTypePreferences")
        UpdateEventTypePreferences(callBack);
    else if (formID == "frmReminderPreferences")
        UpdateReminderPreferences(callBack);
    else if (formID = "frmHolidayPreferences")
        UpdateHolidayPreferences(callBack);
}

function UpdateEventTypePreferences(callBack) {
    $('#frmEventTypePreferences').ajaxSubmit({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/UpdateEventTypePreferences",
        dataType: "json",
        error: function(e) {
        },
        success: callBack
    });
}

function UpdateReminderPreferences(callBack) {
    $('#frmReminderPreferences').ajaxSubmit({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/UpdateReminderPreferences",
        dataType: "json",
        error: function(e) {
        },
        success: callBack
    });
}

function UpdateHolidayPreferences(callBack) {
    GetSelectedHolidayEvents();
    $('#frmHolidayPreferences').ajaxSubmit({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/UpdateHolidayPreferences",
        dataType: "json",
        error: function(e) {
        },
        success: callBack
    });
}

function PreferencesSuccessCallBackClose(data) {
    if (!data.IsValid) {
        displayErrorMessagesOnReLoad(data.ValidationErrors, "SettingsOverlay");
        hallmarkBehaviors.hmkEnableButton();
    }
    else
        window.location.reload();
}

function PreferencesSuccessCallBack(data) {
    if (!data.IsValid)
        displayErrorMessagesOnReLoad(data.ValidationErrors, "SettingsOverlay");

    hallmarkBehaviors.hmkEnableButton();
}

function ChangeSelectionByCategory(selectionOption, categoryID) {
    $('.' + categoryID).attr("checked", selectionOption);
    $('.' + categoryID).change();
    var checkedHolidayEventIDs = $("#div_" + categoryID + " input[type = checkbox]");
    for (var i = 0; i < checkedHolidayEventIDs.length; i++) {
        $('.' + checkedHolidayEventIDs[i].value).attr("checked", selectionOption);
        $('.' + checkedHolidayEventIDs[i].value).change();
    }
}

function ChangeHolidayEventSelection(obj) {
    $('.' + obj.value).attr("checked", obj.checked);
    $('.' + obj.value).change();
}

function GetSelectedHolidayEvents() {
    var selectedHolidayEvents = $("#HolidayEvents input:checked");
    $("#SelectedHolidayIDs").val('');
    for (var k = 0; k < selectedHolidayEvents.length; k++) {
        if ($("#SelectedHolidayIDs").val() != "")
            $("#SelectedHolidayIDs").val($("#SelectedHolidayIDs").val() + "," + (selectedHolidayEvents[k].value + "-" + $(selectedHolidayEvents[k]).attr("evDate")));
        else
            $("#SelectedHolidayIDs").val(selectedHolidayEvents[k].value + "-" + $(selectedHolidayEvents[k]).attr("evDate"));
    }
}

function InitHolidayPreferences() {
    hallmarkBehaviors.hmkWidgets();
    var selectedHolidayEvents = $("#SelectedHolidayIDs").val().split(",");

    for (var k = 0; k < selectedHolidayEvents.length; k++) {
        $('.' + selectedHolidayEvents[k]).attr("checked", true);
        $('.' + selectedHolidayEvents[k]).change();
    }
    InitEnableEnterKey();
}

function LoadEventReminders() {
    clearAllErrorDivs();
    var params = "ID=" + $("#ID").val();
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/LoadEventReminders",
        data: params,
        dataType: "html",
        error: function(e) {
        },
        success: function(data) {
            if (data != "") {
                $('#EditEvent').html(data);
                InitUpdateReminders();
            }
        }
    });
}

function InitUpdateReminders() {
    $("#RequestType").val('U');
    InitEditEventHeaders();
    $('#frmUpdateReminders').hmkFormChecker();
    PopulateOmnitureForEditEvent("edit reminders");
}

function UpdateReminders(successFn) {
    $('#frmUpdateReminders').ajaxSubmit({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/UpdateReminders",
        dataType: "json",
        error: function(e) {
        },
        success: successFn
    });
}

var ConfirmUpdateReminderDetails = function(data) {
    if (null != data.ValidationErrors && data.ValidationErrors.length > 0) {
        displayErrorMessagesOnReLoad(data.ValidationErrors, 'EditEvent');
        hallmarkBehaviors.hmkEnableButton();
    }
    else
        LoadEditEvent($("#TempRequestType").val().toLowerCase());
}

var ConfirmUpdateReminders = function(data) {
    if (null != data.ValidationErrors && data.ValidationErrors.length > 0)
        displayErrorMessagesOnReLoad(data.ValidationErrors, 'EditEvent');
    else {
        $('#frmUpdateReminders').hmkFormChecker();
        DisplayEditRemindersConfirmationOverlay();
    }
    hallmarkBehaviors.hmkEnableButton();
}

var ConfirmSaveReminders = function(data) {
    if (null != data.ValidationErrors && data.ValidationErrors.length > 0)
        displayErrorMessagesOnReLoad(data.ValidationErrors, 'EventDetails');
    else {
        $('#frmUpdateReminders').hmkFormChecker();
        DisplayReminders(data);
        $('.buttonLineRtCancel').trigger('click');
    }
    hallmarkBehaviors.hmkEnableButton();
}

function DisplayEditEventConfirmationOverlay() {
    $("#EditEventConfirmation").overlay({
        api: true,
        speed: 200,
        expose: {
            maskId: 'overlyMask',
            loadSpeed: 800,
            opacity: 0.9
        },
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getContent().find("div.wrap");
            // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
            if (wrap.is(":empty")) {
                wrap.load(this.getTrigger().attr("href"));
            }
        },
        onClose: function() {
            $("#EditEventConfirmation.wrap").empty();
        }, closeOnClick: false
    }).load();
    $(".close").click(function() {
        $("#EditEventConfirmation").overlay().close();
    });
    InitEnableEnterKey();
}

function DisplayEditRemindersConfirmationOverlay() {
    $("#EditRemindersConfirmation").overlay({
        api: true,
        speed: 200,
        expose: {
            maskId: 'overlyMask',
            loadSpeed: 800,
            opacity: 0.9
        },
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getContent().find("div.wrap");
            // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
            if (wrap.is(":empty")) {
                wrap.load(this.getTrigger().attr("href"));
            }
        },
        onClose: function() {
            $("#EditRemindersConfirmation.wrap").empty();
        }, closeOnClick: false
    }).load();
    $(".close").click(function() {
        $("#EditRemindersConfirmation").overlay().close();
    });
    InitEnableEnterKey();
}

function RemoveEvent(eventSource) {
    if (eventSource == "A")
        DisplayDeleteAutomaticEventOverlay();
    else
        DisplayDeleteEventOverlay();
}

function DisplayDeleteEventOverlay() {
    $("#DeleteOverlayCalIcon").html($("#DisplayCalIcon").html());
    $("#DeleteOverlayTitle").html($("#DisplayTitle").html());
    $("#DeleteOverlayDate").html($("#DisplayDate").val());
    $(".JQDeleteConfirmationText").hide();

    if ($("#IsRecurringEvent").val().toLowerCase() == "true")
        $("#RecurringEventConfirmationText").show();
    else
        $("#NonRecurringEventConfirmationText").show();


    $("#DeleteEvent").overlay({
        api: true,
        speed: 200,
        expose: {
            maskId: 'overlyMask',
            loadSpeed: 800,
            opacity: 0.9
        },
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getContent().find("div.wrap");
            // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
            if (wrap.is(":empty")) {
                wrap.load(this.getTrigger().attr("href"));
            }
        },
        onClose: function() {
            $("#DeleteEvent.wrap").empty();
        }, closeOnClick: false
    }).load();
    $(".close").click(function() {
        $("#DeleteEvent").overlay().close();
    });
    InitEnableEnterKey();
}

function InitEnableEnterKey() {
    extendedBehaviors.hmkEnterKeyFormSubmit();
    extendedBehaviors.hmkFormFocus();
}

function DisplayDeleteAutomaticEventOverlay() {
    $("#DeleteAutomaticEvent").overlay({
        api: true,
        speed: 200,
        expose: {
            maskId: 'overlyMask',
            loadSpeed: 800,
            opacity: 0.9
        },
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getContent().find("div.wrap");
            // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
            if (wrap.is(":empty")) {
                wrap.load(this.getTrigger().attr("href"));
            }
        },
        onClose: function() {
            $("#DeleteAutomaticEvent.wrap").empty();
        }, closeOnClick: false
    }).load();
    $(".close").click(function() {
        $("#DeleteAutomaticEvent").overlay().close();
    });
    InitEnableEnterKey();
}

function DeleteEvent(errorDiv) {
    var params = "ID=" + $("#ID").val();
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Events/DeleteEvent",
        data: params,
        dataType: "json",
        error: function(e) {
        },
        success: function(data) {
            if (null != data.ValidationErrors && data.ValidationErrors.length > 0) {
                displayErrorMessagesOnReLoad(data.ValidationErrors, errorDiv);
                $(".JQCancelDelete").trigger('click');
            }
            else
                document.location.href = "/Events/Load/Glance";
        }
    });
}

function LoadEventDetails() {
    $('.inviteeStatusBar').show();
    $("#GuestList").html('');
    $("#GuestList").hide();
    $('#eventConversationContainer').hide();
    $('.printBtn').show();
    $("#eventContentContainer").show();
    $('.JQGuests').removeClass('selected');
    $('.JQConversation').removeClass('selected');
    $('.JQDetails').addClass('selected');
    InitReminderOverlay();
    $('#frmUpdateReminders').hmkFormChecker();

    //$('.False').hide();

    if (!isRegisteredUser)
        $('.JQGuestUser').show();

    if ($("#IsEventEditable").val().toLowerCase() != "true") {
        $('.JQPastEvent').show();
        $('.JQReminderOptions').show();
    }
    else if ($("#ParticipantRSVPStatus").val() == "N")
        $('.JQNoResponse').show();
    else {
        $('.JQResponse').show();
        $('.JQReminderOptions').show();
    }
    
    $(".JQDisp_" + $("#ParticipantRSVPStatus").val()).show();

    if (isRegisteredUser)
        $('.JQRegisteredUser').show();

    if ($('#EventDetailsAdSpot1').size() > 0 && $('#EventDetailsAdSpot1').html() == "")
        adSpot.GetAdHTML($('#EventDetailsAdSpot1'), 'default', 'CALENDAR', 'eventDetailsPromo1');

    if ($('#EventDetailsAdSpot2').size() > 0 && $('#EventDetailsAdSpot2').html() == "")
        adSpot.GetAdHTML($('#EventDetailsAdSpot2'), 'default', 'CALENDAR', 'eventDetailsPromo2');
}

function ChangeResponse() {
    $(".JQResponse").hide();
    $(".JQChangeResponse").show();
}

function LoadResponse() {
    $(".JQChangeResponse").hide();
    $(".JQResponse").show();
}

function DisplayReminders(data) {
    $('.JQReminders').hide();

    if (data.ReminderPreference.OneMonthBefore)
        $(".OneMonthBefore").show();

    if (data.ReminderPreference.TwoWeeksBefore)
        $(".TwoWeeksBefore").show();

    if (data.ReminderPreference.OneWeekBefore)
        $(".OneWeekBefore").show();

    if (data.ReminderPreference.ThreeDaysBefore)
        $(".ThreeDaysBefore").show();

    if (data.ReminderPreference.OneDayBefore)
        $(".OneDayBefore").show();

    if (data.ReminderPreference.DayOfTheEvent)
        $(".DayOfTheEvent").show();

    if (data.ReminderPreference.NoReminders)
        $(".NoReminders").show();
}

function InitReminderOverlay() {

    var overlay = $(".reminderOverlay");
    $(".reminderOverlay").remove();
    overlay.appendTo('body');

    // attach events	
    $(".editRemindersBtn").click(function(e) {
        var top = parseInt($(this).offset().top);
        var left = parseInt($(this).offset().left);

        $(".reminderOverlay").css("display", "block");

        $(".reminderOverlay").css({
            "position": "absolute",
            "top": (top - 63) + "px",
            "left": (left - 13) + "px"
        });
        e.preventDefault();
    });

    $('.buttonLineRtCancel').click(function(e) {
        $("#frmUpdateReminders").hmkFormChecker("resetForm");
        $(".reminderOverlay").css("display", "none");
        e.preventDefault();
    });
    $(".reminderOverlay").css("display", "none");
}

function SetRSVPStatus(eventID, participantID, rsvpStatus, programClassificationCode) {
    //var params = "ID=" + eventID + "&Participants[0].ID=" + participantID + "&Participants[0].RSVPStatus=" + rsvpStatus;
    var params = "Programs[0].ProgramID=" + eventID; 
    params += "&Programs[0].Participants[0].ID=" + participantID;
    params += "&Programs[0].Participants[0].RSVPStatus=" + rsvpStatus;
    params += "&Programs[0].ProgramClassificationCode=" + programClassificationCode;
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Programs/UpdateRSVPStatus",
        data: params,
        dataType: "json",
        error: function(e) {
        },
        success: function(data) {
            if (null != data.ValidationErrors && data.ValidationErrors.length > 0)
                $("#errorDiv").show();
            else {
                UpdateSecondaryNavPendingInvitationCount()
                //InitLoadEvents();
                window.location.href = "/Programs/LoadProgramDetails/"+eventID+"/"+programClassificationCode;
            }
        }
    });
}

function UpdateSecondaryNavPendingInvitationCount() {
    if ($('.JQSecNavPendingInvitationsCount').size() > 0 && $(".JQSecNavPendingInvitationsCount").html() != "" && $(".JQSecNavPendingInvitationsCount").html() != "0")
        $(".JQSecNavPendingInvitationsCount").html(parseInt($(".JQSecNavPendingInvitationsCount").html(), 10) - 1);
}

function UpdateRSVPStatus(rsvpStatus) {
    if (rsvpStatus != $("#ParticipantRSVPStatus").val()) {
        var params = "ID=" + $("#ID").val() + "&Participants[0].ID=" + $("#Participants\\[0\\]\\.ID").val() + "&Participants[0].RSVPStatus=" + rsvpStatus;
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "/Events/UpdateRSVPStatus",
            data: params,
            dataType: "json",
            error: function(e) {
            },
            success: function(data) {
                if (null != data.ValidationErrors && data.ValidationErrors.length > 0)
                    displayErrorMessagesOnReLoad(data.ValidationErrors, 'EventDetails');
                else {
                    $(".JQCount_" + $("#ParticipantRSVPStatus").val()).html(parseInt($(".JQCount_" + $("#ParticipantRSVPStatus").val()).html(), 10) - 1);
                    $(".JQCount_" + rsvpStatus).html(parseInt($(".JQCount_" + rsvpStatus).html(), 10) + 1);
                    UpdateSecondaryNavPendingInvitationCount();
                    DisplayRSVPStatus(rsvpStatus);
                    window.location.reload(true);
                }
            }
        });
    }
    else
        DisplayRSVPStatus(rsvpStatus);
}

function DisplayRSVPStatus(rsvpStatus) {
    $("#ParticipantRSVPStatus").val(rsvpStatus);
    $(".JQRSVPStatus").hide();
    $(".JQDisp_" + rsvpStatus).show();
    $(".JQChangeResponse").hide();
    $(".JQNoResponse").hide();
    $(".JQResponse").show();
    $('.JQReminderOptions').show();
}

function InitEventNotifications() {
    $('.JQRegisteredUser').show();

    if ($.trim($("#PendingInvitations").html()) == "")
        $(".JQPendingInvitations").hide();
    else if ($('.noMoreInvitations').size() > 0)
        $(".JQSeeMoreInvitations").remove();

    $('.hmkNotificationsList').bucketomatic({ ajaxUrl: "/Events/GetActivities", btnNextSelector: '.JQSeeMoreActivities', listGroupClass: 'dateList', itemClass: 'dd', pageVar: "ActivityDates.CurrentPageNumber" });

    $('.JQSeeMoreInvitations').click(function() {
        var params = "PendingInvitations.CurrentPageNumber=" + (parseInt($("#PendingInvitations\\.CurrentPageNumber").val(), 10) + 1);
        $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: "/Events/GetPendingInvitations",
            data: params,
            dataType: "html",
            error: function(e) {
            },
            success: AppendInvitations
        });
    });
}

var AppendInvitations = function(data) {
    if (data != "") {
        $(".CurrentPageNumber").remove();
        $('#PendingInvitations').append(data);

        if ($('.noMoreInvitations').size() > 0)
            $(".JQSeeMoreInvitations").remove();
    }
    else
        $(".JQSeeMoreInvitations").remove();
}

function PopulateOmnitureForEditEvent(pageName) {
    var eventType = 'P';
    if ($('#ProgramClassificationCode').val() == 'I')
        eventType = 'I';
    else if ($('#ProgramClassificationCode').val() == 'C')
        eventType = 'C';

    s.prop1 = "My Hallmark";
    s.pageName = "My Hallmark > Events > " + pageName + " > " + eventType + '_' + $("#Occasion").val();
    s.prop2 = "My Hallmark > Events";
    s.eVar32 = "My Hallmark > Events > " + pageName + " > " + eventType + '_' + $("#Occasion").val();

    if (pageName == 'add guests') {
        PopulateOmnitureForInviteGuestsPage('add guests', 'address book');

    }
    else {
        s.prop32 = "My Hallmark > Events > " + pageName + " > " + eventType + '_' + $("#Occasion").val();
        s.prop30 = "My Hallmark > Events > " + pageName;
        s.prop3 = "My Hallmark > Events > " + pageName + " > " + eventType + '_' + $("#Occasion").val();
    }

    s.prop45 = eventType + '_' + $("#Occasion").val();
    s.eVar48 = eventType + '_' + $("#Occasion").val();
    evalOmniture();
}

function PopulateOmnitureForInviteGuestsPage(pageName, tabName) {
    var eventType = 'P';
    if ($('#ProgramClassificationCode').val() == 'I')
        eventType = 'I';
    else if ($('#ProgramClassificationCode').val() == 'C')
        eventType = 'C';
    s.prop32 = "My Hallmark > Events > " + pageName + " > " + tabName + " > " + eventType + '_' + $("#Occasion").val();
    s.prop30 = "My Hallmark > Events > " + pageName + " > " + tabName;
    s.prop3 = "My Hallmark > Events > " + pageName + " > " + tabName + " > " + eventType + '_' + $("#Occasion").val();
    s.eVar32 = "My Hallmark > Events > " + pageName + " > " + tabName + " > " + eventType + '_' + $("#Occasion").val();
    evalOmniture();
}

function PopulateOmnitureForAddEvent() {
    var eventType = 'P';
    if($('#ClassificationCode').val() == 'C')
        eventType = 'C';

    s.prop45 = eventType + '_' + $("#TypeID option:selected").text();
    s.eVar48 = eventType + '_' + $("#TypeID option:selected").text();
    s.events = s.events + ",event96";
    evalOmniture();
}

function ChangeEventClassification() {
    DisplayAddGuestsAndDetailsButton();
    if ($('#ClassificationCode').val() == 'C') {

        if ($('#addTimeButton').hasClass('accSlideDown')) {
            $('#addTimeButton').click();
        }

        $('.ShowForEvents').css('display', 'none').filter('a.primary').removeClass('JQPreventDblClick JQDisableAction JQfrmSubmitButton');
        $('.ShowForCardShower').css('display', 'block').filter('a.primary').addClass('JQPreventDblClick JQDisableAction JQfrmSubmitButton');

        $('#PrimaryHonoreeName,#SecondaryHonoreeName').addClass('JQValidateInputBoxInLine JQRequiredField JQValidateMinLength');

        $('#normalRemindersList').hide();
        $('#CSRemindersList').show();
        $('#CardsShouldArriveSpan').show();

        var selectedDate = new Date($('#CSOcalendar').val());
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        if (selectedDate < (currentDate)) {
            $('#CSODateInvalid').show();
        }
        else {
            $('#CSODateInvalid').hide();
        }

        $('#CSOcalendar').val('');
        
    }
    else {
        $('.ShowForCardShower').css('display', 'none').filter('a.primary').removeClass('JQPreventDblClick JQDisableAction JQfrmSubmitButton');
        $('.ShowForEvents').css('display', 'block').filter('a.primary').addClass('JQPreventDblClick JQDisableAction JQfrmSubmitButton');

        hideErrorDiv(msgDiv, $("#PrimaryHonoreeName"));
        hideErrorDiv(msgDiv, $("#SecondaryHonoreeName"));

        $('#PrimaryHonoreeName,#SecondaryHonoreeName').removeClass('JQValidateInputBoxInLine JQRequiredField JQValidateMinLength');

        $('#normalRemindersList').show();
        $('#CSRemindersList').hide();
        $('#CardsShouldArriveSpan').hide();
        $('#CSODateWarning').hide();
        $('#CSODateInvalid').hide();
        var today = new Date();
        $('#CSOcalendar').val((today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear());
    }
    //extendedBehaviors.hmkEnterKeyFormSubmit(); Disabling enter key to fix bug 17115
    $('#PrimaryHonoreeName').unbind('keypress.formEnterKey');
    $('#SecondaryHonoreeName').unbind('keypress.formEnterKey');
}

function AddCardShowerEvent() {
    clearAllErrorMessages();
    $('#CSODateInvalid').hide();
    $('#Programs\\[0\\]\\.ProgramStartDate').val($('#CSOcalendar').val());  
    var eventPE = $("#frmAddEvent").serialize();
    //eventPE += "&Programs[0].ProgramClassificationCode=C&Programs[0].ProgramStatusCode=D";
    eventPE += "&Programs[0].ProgramClassificationCode=C&Programs[0].ProgramStatusCode=D&Programs[0].ProgramStartDate=" + $('#CSOcalendar').val() + "&Programs[0].OccasionTimeSpan=" + occTimeSpan + "&Programs[0].OccassionHonoreeType=" + occHonoreeGender;
    $.post('/Programs/AddProgram', eventPE, handleAddCardShowerEventtOptions, "json");
}

function handleAddCardShowerEventtOptions(jsonResponse) {
    if (null != jsonResponse.ValidationErrors && jsonResponse.ValidationErrors.length > 0) {
        displayErrorMessagesOnReLoad(jsonResponse.ValidationErrors, 'AddEvents');
        hallmarkBehaviors.hmkEnableButton();
    }
    else {
        PopulateOmnitureForAddEvent();
        window.location = "/Programs/EditProgram/" + jsonResponse.Programs[0].ProgramID + "/C/D?firstVisit=true";
    }
}

function fnLogOff() {
    $.ajax({ url: '/UserLogon/SignOff', async: false, type: 'get' });
    document.location.href = '/UserLogon/SignInSignUp?URL=/Programs/LoadProgramDetails/' + $("#ProgramID").val() + '/' + $('#ProgramClassificationCode').val() ;
}

function fnMerge(participantID) {
    var params = new Object();
    params.ParticipantID = participantID;
    params.ProgramClassificationCode = $('#ProgramClassificationCode').val()
    $.post('/Programs/MergeParticipant', params, function(e) { window.location.reload(); });
}

function fnEmailAddressNotInProfile() {
    if ($('input[name="logonOption"]:checked').val() == "Merge")
        fnMerge($("#Participants\\[0\\]\\.ID").val());
    else
        fnLogOff();
}

function DisplayAddGuestsAndDetailsButton(){
    var isAnnual = $('#AnnualEvent').is(":checked");
    var current_date = new Date();
    var selected_date = new Date($('#CSOcalendar').val());
    current_date.setHours(0,0,0,0);

    var isFuture = false;
    if(selected_date){    
        isFuture = (selected_date >= current_date);
    }
    
    if($('#ClassificationCode').val() == "I"){
        if(isFuture || (!isFuture&&isAnnual)){
            $("#btAddMore").css('display','block');
        }
        else {
            $("#btAddMore").css('display', 'none');
        }
    }
    else {
        $("#btAddMore").css('display', 'none');
    }
}

function loadDatePickers() {
    $('#CSOcalendar').datepicker({
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        onClose: function(date) {
            //Show the card shower date messages if the date is not null
            var current_date = new Date();
            var selected_date = new Date(date);
            var ONE_DAY = 1000 * 60 * 60 * 24;  // milliseconds in a day
            var selected_date_ms = selected_date.getTime(); //selected date in milliseconds
            var current_date_ms = current_date.getTime();   //today's date in milliseconds
            var difference_ms = selected_date_ms - current_date_ms;  //difference between days in milliseconds
            var difference_days = Math.round(difference_ms / ONE_DAY); //difference between days in days

            if (selected_date != 'Invalid Date' && date.length != 4) {

                if ($('#ClassificationCode').val() == "I") 
                    DisableInviteForPastEvent();

                DisplayAddGuestsAndDetailsButton();

                if ((date) && (($('#ClassificationCode').val() == "C") || ($('#ClassificationCode').length < 1))) {
                    if ((difference_days >= -1) && (difference_days < 7)) {
                        //Show the "1 week" warning if selected date < 7 days from today
                        $('#CSODateInvalid').hide();
                        $('#CSODateWarning').show();
                    }
                    else if (difference_days < -1) {
                        //Show the "Invalid date" warning if the date is in the past
                        $('#CSODateInvalid').show();
                        $('#CSODateWarning').hide();
                    }
                    else {
                        //Hide both warnings if the date is > 7 days from now
                        $('#CSODateWarning').hide();
                        $('#CSODateInvalid').hide();
                    }
                }
                else if (!date) {
                    //Show the "Invalid date" warning if the date is null
                    $('#CSODateInvalid').show();
                }
                else {
                    $('#CSODateInvalid').hide();
                }

                //change date on calendar tile
                if (date) {
                    var c = arguments[0];
                    var d = null;
                    if (arguments.length == 2) {
                        d = arguments[1]
                    }
                    var a = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                    var e = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var b = function(g, h) {
                        for (var f = 0; f < a.length; f++) {
                            if (g.hasClass(a[f])) {
                                g.removeClass(a[f]);
                                break
                            }
                        }
                        g.addClass(a[h])
                    };
                    var h = new Date(date);
                    var n = h.getDay();

                    var l;
                    var j = $(this).closest(".overlayWrap");
                    if (j.size() == 0) {
                        l = $(".xlargeCalTile")
                    } else {
                        l = j.find(".xlargeCalTile")
                    }
                    var f = l.children().eq(0);
                    var o = l.children().eq(1).children("p");
                    var g = l.children().eq(1).children("span");
                    b(f, h.getMonth());
                    o.html(h.getDate());
                    g.first().html(h.getFullYear());
                    g.last().html(e[h.getDay()]);
                }
            }

            else {
                //Show the "Invalid date" warning if the date is null
                $('#CSODateInvalid').show();
            }
        }
    });
    $('#CScalendar').datepicker({
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        minDate:0,
        onClose: function(date) {
            if ((date) && (($('#ClassificationCode').val() == "C") || ($('#ClassificationCode').length < 1))) {
                //Show the card shower date messages if the date is not null
                var current_date = new Date();
                var selected_date = new Date(date);

                var ONE_DAY = 1000 * 60 * 60 * 24;  // milliseconds in a day

                var selected_date_ms = selected_date.getTime(); //selected date in milliseconds
                var current_date_ms = current_date.getTime();   //today's date in milliseconds

                var difference_ms = selected_date_ms - current_date_ms;  //difference between days in milliseconds
                var difference_days = Math.round(difference_ms / ONE_DAY); //difference between days in days

                if ((difference_days >= -1) && (difference_days < 7)) {
                    //Show the "1 week" warning if selected date < 7 days from today
                    $('#CSDateInvalid').hide();
                    $('#CSDateWarning').show();
                }
                else if (difference_days < -1) {
                    //Show the "Invalid date" warning if the date is in the past
                    $('#CSDateInvalid').show();
                    $('#CSDateWarning').hide();
                }
                else {
                    //Hide both warnings if the date is > 7 days from now
                    $('#CSDateWarning').hide();
                    $('#CSDateInvalid').hide();
                }
            }
            else if (!date) {
                //Show the "Invalid date" warning if the date is null
                $('#CSDateInvalid').show();
            }

            //change date on calendar tile
            if (date) {
                var c = arguments[0];
                var d = null;
                if (arguments.length == 2) {
                    d = arguments[1]
                }
                var a = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                var e = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var b = function(g, h) {
                    for (var f = 0; f < a.length; f++) {
                        if (g.hasClass(a[f])) {
                            g.removeClass(a[f]);
                            break
                        }
                    }
                    g.addClass(a[h])
                };
                var h = new Date(date);
                var n = h.getDay();

                var l;
                var j = $(this).closest(".overlayWrap");
                if (j.size() == 0) {
                    l = $(".xlargeCalTile")
                } else {
                    l = j.find(".xlargeCalTile")
                }
                var f = l.children().eq(0);
                var o = l.children().eq(1).children("p");
                var g = l.children().eq(1).children("span");
                b(f, h.getMonth());
                o.html(h.getDate());
                g.first().html(h.getFullYear());
                g.last().html(e[h.getDay()]);
            }
            
            if ($("#ProgramClassificationCode").val() == "C" && $("#IsProjectAssociated").val().toLowerCase() == 'true') {
                CSChangeDateWarningOverlay()
            }
        }
    })
}

function CSChangeDateWarningOverlay(){
    $("#CSChangeDateWarning").overlay({
        api: true,
        speed: 200,
        expose: {
            maskId: 'overlyMask',
            loadSpeed: 800,
            opacity: 0.9
        },
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getContent().find("div.wrap");
            // if the wrap is empty, it will load the content from the page specified in the anchor tag that triggers the overlay
            if (wrap.is(":empty")) {
                wrap.load(this.getTrigger().attr("href"));
            }
        },
        onClose: function() {
            $("#CSChangeDateWarning.wrap").empty();
        }, closeOnClick: false
    }).load();
    $(".close").click(function() {
        $("#CSChangeDateWarning").overlay().close();
    });
}

function loadChooseService() {
    $('#popupContainer2').removeClass('smallOverlay').addClass('mediumOverlay');
    this.getContent().find("div.JQolayContent").html(loadMsg);
    $.ajax({
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded',
        url: '/ImportContacts/ChooseService',
        data: '',
        dataType: 'html',
        cache: false,
        error: function(e) {
        },
        success: function(data) {
            if (data != "") {
                olay.getContent().find("div.JQolayContent").html(data);
            }
        }
    });
    olay = this;
}
