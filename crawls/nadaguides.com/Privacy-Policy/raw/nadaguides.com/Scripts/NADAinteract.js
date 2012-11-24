//put non critical interaction scripts in here (like button hover, etc)
//TODO move this stuff into the NADAjs namespace!
function validATCFYCForm() {
    //var objRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    //if (objRegExp.test($("#txtATCZip").val()) != true) {
    if (!validZipCode($("#txtATCZip").val())) {
        alert("Please enter a valid zip code");
        return false;
    }
    else if ($("#ddlATCMakes").val() == "") {
        alert("Please select a make");
        return false;
    }
    else {
        return true;
    }
};
//ajax + regex test
function validAjaxZip(zip) {
    if (!validZipCode(zip)) 
        return false;
    var result;
    $.ajax({
        url: '/Page/VerifySaveZipCode',
        type: 'POST',
        async: false,
        data: { zipCode: zip },
        timeout: 30000,
        error: function() {
            return true;
        },
        success: function(data) {
            if (data == 'false') 
                result = false;
            else 
                result = true;
        }
    });
    return result;
};


function validPartnersBoxForm() {
    if (!validZipCode($("#txtATFYCZip").val())) {
        alert("Please enter a valid zip code");
        return false;
    }
    else if ($("#ddlATFYCMakes").val() == "") {
        alert("Please select a make");
        return false;
    }
    else {
        return true;
    }
};

//takes in a jquery input object.  i.e. $('#idofinput')
function clearVINText(VINjqObject) {
    if ($(VINjqObject).val() == "Press GO or Enter VIN" || $(VINjqObject).val() == "Enter VIN(optional)") {
        $(VINjqObject).val('');
    }
    if ($(VINjqObject).val() == "Enter VIN (optional)") {
        $(VINjqObject).val('');
    }
};
//takes in a jquery input object.  i.e. $('#idofinput')
function clearHINText(HINjqObject) {
    if ($(HINjqObject).val() == "Press GO or Enter HIN") {
        $(HINjqObject).val('');
    }
};
function clearText(jqObject, initText) {
    if ($(jqObject).val() == initText) {
        $(jqObject).val('');
    }
};
//regex test only
function validZipCode(myzip) {
    var objRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

    if (objRegExp.test(myzip))
        return true;
    return false;
}

//TODO this can be done in CSS with an IE7 hack
$(function() {
    $("img.partner-go").hover(function() {
        $(this).attr("src", "http://www.nadaguides.com/App_Themes/mainreskin/Images/reskin/buttons/go-button.jpg");
    },
    function() {
        $(this).attr("src", "http://www.nadaguides.com/App_Themes/mainreskin/Images/reskin/buttons/go-button-roll.jpg");
    });
    $("button.partner-go").hover(function() {
        $(this).removeClass("partner-go").addClass("partner-go-roll");
    },
    function() {
        $(this).removeClass("partner-go-roll").addClass("partner-go");
    });
    
});

var optList = '';

//TODO change all of the above into the NADAjs namespace
var NADAjs = {
    NewOptions: new function() {
        //private properties
        var optState;
        var xhr = new XMLHttpRequest();
        var sending = false;
        var selectedPaintColor = 'Default';
        var quoteURL = "";

        //private functs

        var handleConflicts = function(conflictData) {
            if (conflictData) {
                var dialogText = conflictData.text + "<br /><br />";
                //var listContainer = document.getElementById("opt-conflict-list");

                var listContainer = $("#opt-conflict-list");
                listContainer.html("");
                for (i = 0; i < conflictData.conflictList.length; i++) {
                    var conflictCode = conflictData.conflictList[i].optCode;
                    var conflictName = conflictData.conflictList[i].name
                    listContainer.append("<input type=\"checkbox\" name=\"NCOption\" value=\"" + conflictCode + "\" optcode=\"" + conflictCode + "\" />");
                    listContainer.append(" " + conflictCode + " - " + conflictName + "<br />");
                }
                $("#opt-conflict-text").html(dialogText);
                $("#opt-conflict-text").show();
                $("#opt-conflict-list").show();
                $("#opt-conflict-loading").hide();
                $("#opt-conflict").dialog({
                    modal: true,
                    resizable: false,
                    width: 500,
                    title: "Conflicting options",
                    draggable: false
                });
                $("#opt-conflict").dialog("open");
            }
        }


        var toggleBoxes = function(optdata) {
            $('input:checked').attr("checked", false);
            $('.opt-img').attr("src", "http://images.nadaguides.com/shared/shim.gif").attr("alt", "");
            $('.opt-img').hide();
            $(optdata).each(function() {
                $(this.changeList).each(function() {
                    //? = unselected ? = selected 2 = included 3 = required 4 = excluded 5 = upgraded
                    switch (this.state) {
                        case "Unselected":
                            $('input[optcode=' + this.code + ']').attr("checked", false);
                            break;
                        case "Excluded":
                            $('img[optcode=' + this.code + ']').attr("src", this.img).show();
                            $('input[optcode=' + this.code + ']').attr("checked", false);
                            break;
                        case "Selected":
                            $('input[optcode=' + this.code + ']').attr("checked", true);
                            break;
                        case "Included":
                        case "Required":
                        case "Upgraded":
                            $('img[optcode=' + this.code + ']').attr("src", this.img).show();
                            $('input[optcode=' + this.code + ']').attr("checked", true);
                            break;
                    }

                });
            });
        }

        var updateShare = function(optCode) {
            shareUpdated = true;

            if (optList == '')
                optList += optCode;
            else
                optList += '|' + optCode;

            var printParams = '?options=' + optList;
            var destination = document.location.href + printParams;
//            if (optList != '') {
//                $('#sharebutton').html('');

//                stWidget.addEntry({
//                    "service": "sharethis",
//                    "element": document.getElementById('sharebutton'),
//                    "url": destination,
//                    "title": $('h2').html(),
//                    "type": "chicklet",
//                    "summary": $('title').html(),
//                    "text": "share"
//                });

//                $('#sharebutton').children('span').first().css('padding-top', '2px');
//                $('#sharebutton').children('span').first().children('span').first().css('padding-top', '2px');
//                $('#sharebutton').children('span').first().children('span').first().css('font-size', '10px');
//                $('#emailFriend-dialog').css('padding-bottom', '2px');
//            }

            document.getElementById('optParams').value = optList;
        }

        var buildSumm = function() {
            if (optState) {
                $('#opt-summ-optlist').html('');

                optState.each(function() {
                    var summTable = '<table class="opt-tbl"><tr><td class="opt-sect-head" colspan="3">' + this.groupName + '</td><td class="opt-sect-head">Invoice</td><td class="opt-sect-head">MSRP</td></tr>';
                    var isPaint = (this.groupName == "PAINT" | this.groupName == "PRIMARY PAINT");
                    var hasChecked = false; //has selected options (not excluded, etc)
                    $(this.changeList).each(function() {
                        if (this.state != "Unselected" && this.state != "Excluded") {
                            summTable += '<tr optcode="' + this.code + '">' + $('tr[optcode=' + this.code + ']').html() + '</tr>';
                            hasChecked = true;
                            if (isPaint) {
                                selectedPaintColor = $('#opt-value-' + this.code).html();
                            }
                        }
                    });
                    summTable += '</table>';
                    if (hasChecked) {
                        $('#opt-summ-optlist').append(summTable);
                    }
                });
            }
            $('#opt-summ-optlist input').attr('checked', 'checked');
            sending = false;
            $('.opt-summ-working').hide();
        }

        var changePrices = function(data) {
            $('#opttotl-inv').html(data.optInvoice);
            $('#ctl00_ctl16_lblOptionsInvoice').html(data.optInvoice); //TODO changes these id's to something readable or use classes
            $('#opttotl-msrp').html(data.optMsrp);
            $('#ctl00_ctl16_lblOptionsMSRP').html(data.optMsrp);
            $('#totl-inv').html(data.totalInvoice);
            $('#ctl00_ctl16_lblTotalInvoice').html(data.totalInvoice);
            $('#totl-msrp').html(data.totalMsrp);
            $('#ctl00_ctl16_lblTotalMSRP').html(data.totalMsrp);
            //DT payment
            if ($('#calcLink').length && $('#calcLink').is(":visible")) {
                $('#Cost').val(Number(data.totalInvoice.replace(/[^0-9\.]+/g, "")));
                $('#Retail').val(Number(data.totalMsrp.replace(/[^0-9\.]+/g, "")));
                // $('#calcLink').hide();
                // NADAjs.Calculator.getDefaultPayment("calcLink", null);
            }
        }

        var toggleConflict = function(vehId, optCode) {
            $("#opt-conflict-text").hide();
            $("#opt-conflict-list").hide();
            $("#opt-conflict-loading").show();
            toggleOpt(vehId, optCode);
        }

        var toggleOpt = function(vehId, optCode) {
            $('#opt-summ-optlist').html('');
            $('.opt-summ-working').show();
            sending = true;
            xhr.abort();
            xhr = $.ajax({
                type: 'POST',
                url: "/Cars/ToggleOption/" + vehId,
                data: { 'changedOptionCode': optCode },
                dataType: "json",
                async: false,
                error: function(data) {
                    /*$.modal.close();*/
                },
                success: function(data) {
                    //changePrices(data);
                    optState = $(data.optData);
                    $("#opt-conflict").dialog("close");
                    handleConflicts(data.optConflict);
                    toggleBoxes(optState);
                    //buildSumm();
                    //updateShare(optCode);
                }
            });


        }
        var setColor = function(color) {
            selectedPaintColor = color;
        }
        var gotoQuote = function() {
            window.location = this.quoteURL.replace("exteriorcolor", selectedPaintColor.replace(/ /g, "-"));
        }

        var getSendingVal = function() { return sending; }

        //public functs
        this.toggleOption = toggleOpt;
        this.toggleConflictOption = toggleConflict;
        this.buildSummary = buildSumm;
        this.isSending = getSendingVal;
        this.setPaintColor = setColor;
        this.gotoDealerQuote = gotoQuote;

        this.updateShare = updateShare;

    },
    PSCompare: new function() {
        var addVehicle = function(data, trimId) {
            var numVehicles = $('.comp-vehicle:visible').length;
            if (numVehicles == 1)
                $('#btnCompVehicles').show();
            if (numVehicles == 2)
                $('#pnlAdd').hide();
            var newPanel = $('.comp-pnl-template').clone(); //clone template
            $(newPanel).removeClass('comp-pnl-template');
            //add all the properties
            //kind of cheating, not getting the name from server
            var name = $('.psdrop-year :selected').html() + '<br />';
            name += $('.psdrop-make :selected').html() + '<br />';
            name += $('.psdrop-model :selected').html() + '<br />';
            name += $('.psdrop-trim :selected').html() + '<br />';
            $(newPanel).find('.comp-vehicle-name').html(name);
            if (data.image != '') {
                $(newPanel).find('.comp-vehicle-img').attr('src', data.image).show();
            }
            else {
                $(newPanel).find('.comp-vehicle-img').attr('src', 'http://images.nadaguides.com/shared/no-image.jpg').show();
            }
            $(newPanel).find('input[type=hidden]').val(trimId);
            //make it show up!
            $(newPanel).show().insertAfter('#pnlAdd');
            renumberPanels();
        }

        var resetDropdowns = function() {
            $('#pnlAdd select').val('');
            $('#pnlAdd select.psdrop-year').nextAll('select').attr('disabled', 'disabled');
            $('#btnAdd').hide();
        }

        var renumberPanels = function() {
            var index = $('.comp-vehicle:visible').length - 1;
            var titles = ["First Vehicle", "Second Vehicle", "Third Vehicle"];
            $('.comp-vehicle:visible').each(function() {
                $(this).find('.comp-pnl-title').html(titles[index]);
                index--;
            });
        }

        var changePSTrim = function(vehPanel) {
            $(vehPanel).remove();
            if ($('.comp-vehicle:visible').length < 2) {
                $('#btnCompVehicles').hide();
            }
            renumberPanels();
            $('#pnlAdd').show();
        }

        var getPSTrim = function(modelId, trimId) {
            $('.psdrop-loading').show();
            $('.psdrop-input-wrap').hide();
            $('#btnAdd').hide();
            $.ajax({
                type: 'GET',
                url: '/Motorcycles/Async/GetTrim?modelId=' + modelId + '&trimId=' + trimId,
                dataType: 'json',
                async: false,
                error: function(data) { },
                success: function(data) {
                    addVehicle(data, trimId);
                    resetDropdowns();
                }
            });
            $('.psdrop-loading').hide();
            $('.psdrop-input-wrap').show();
        }
        //publicly accessible
        this.getTrim = getPSTrim;
        this.changeVehicle = changePSTrim;

    },
    PSCascade: new function() {
        //private
        var makeDropdown = function(data, selectElement) {
            $(selectElement).html('');
            $(data).each(function() {
                $(selectElement).append($('<option></option>').val(this.id).html(this.name));
            });
            $(selectElement).removeAttr('disabled');
        }
        //public
        var getPSMakes = function(year, caller) {
            $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').show();
            $(caller).parent('.psdrop-input-wrap').hide();
            $.ajax({
                type: 'GET',
                url: '/Motorcycles/Async/GetMakes?year=' + year,
                dataType: 'json',
                error: function(data) {
                    $(caller).next('.psdrop-make').attr('disabled', 'disabled');
                    $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').hide();
                    $(caller).parent('.psdrop-input-wrap').show();
                },
                success: function(data) {
                    makeDropdown(data, $(caller).next('.psdrop-make'));
                    $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').hide();
                    $(caller).parent('.psdrop-input-wrap').show();
                }
            });
        }

        var getPSModels = function(makeId, year, caller) {
            $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').show();
            $(caller).parent('.psdrop-input-wrap').hide();
            $.ajax({
                type: 'GET',
                url: '/Motorcycles/Async/GetModels?year=' + year + '&makeId=' + makeId,
                dataType: 'json',
                error: function(data) {
                    $(caller).next('.psdrop-model').attr('disabled', 'disabled');
                    $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').hide();
                    $(caller).parent('.psdrop-input-wrap').show();
                },
                success: function(data) {
                    makeDropdown(data, $(caller).next('.psdrop-model'));
                    $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').hide();
                    $(caller).parent('.psdrop-input-wrap').show();
                }
            });
        }

        var getPSTrims = function(modelId, caller) {
            $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').show();
            $(caller).parent('.psdrop-input-wrap').hide();
            $.ajax({
                type: 'GET',
                url: '/Motorcycles/Async/GetTrims?modelId=' + modelId,
                dataType: 'json',
                error: function(data) {
                    $(caller).next('.psdrop-trim').attr('disabled', 'disabled');
                    $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').hide();
                    $(caller).parent('.psdrop-input-wrap').show();
                },
                success: function(data) {
                    makeDropdown(data, $(caller).next('.psdrop-trim'));
                    $(caller).parent('.psdrop-input-wrap').next('.psdrop-loading').hide();
                    $(caller).parent('.psdrop-input-wrap').show();
                }
            });
        }

        //expose public functs
        this.getMakes = getPSMakes;
        this.getModels = getPSModels;
        this.getTrims = getPSTrims;
    },

    PSNewOptions: new function() {
        var toggleOption = function(trim, option, config, configInputId, cbSelector, isAdd) {
            var togType = 'remove';
            if (isAdd)
                togType = 'add';
            $('.opt-working').modal({ opacity: 0, overlayCss: { backgroundColor: '#fff' }, containerId: 'opt-modal' });
            $.ajax({
                type: 'POST',
                url: '/Motorcycles/Async/ToggleNewOption',
                dataType: 'json',
                data: {
                    trimId: trim,
                    optionId: option,
                    currentConfig: config,
                    toggleType: togType
                },
                error: function(data) { $.modal.close(); },
                success: function(data) {
                    $('#' + configInputId).val(data.optstate);
                    $('#' + cbSelector).each(function() {
                        $(this).attr('checked', false);
                    });
                    $(data.list).each(function() {
                        //uncheck all
                        if (this.state == 'SELECTED') {
                            $('#' + this.id).attr('checked', true);
                        }
                        else if (this.state == 'EXCLUDED') {
                            //do something
                        }
                    });
                    $.modal.close();
                }
            });
        }

        var addOption = function(trim, option, config, configInputId, cbSelector) {
            toggleOption(trim, option, config, configInputId, cbSelector, true);
        }
        var removeOption = function(trim, option, config, configInputId, cbSelector) {
            toggleOption(trim, option, config, configInputId, cbSelector, false);
        }

        //public
        this.addNewOption = addOption;
        this.removeNewOption = removeOption;
    },

    RVsNewOptions: new function() {
        var toggleOption = function(trim, option, config, configInputId, cbSelector, isAdd) {
            var togType = 'remove';
            if (isAdd)
                togType = 'add';
            $('.opt-working').modal({ opacity: 0, overlayCss: { backgroundColor: '#fff' }, containerId: 'opt-modal' });
            $.ajax({
                type: 'POST',
                url: '/RVs/Async/ToggleNewOption',
                dataType: 'json',
                data: {
                    trimId: trim,
                    optionId: option,
                    currentConfig: config,
                    toggleType: togType
                },
                error: function(data) { $.modal.close(); },
                success: function(data) {
                    $('#' + configInputId).val(data.optstate);
                    $('#' + cbSelector).each(function() {
                        $(this).attr('checked', false);
                    });
                    $(data.list).each(function() {
                        //uncheck all
                        if (this.state == 'SELECTED') {
                            $('#' + this.id).attr('checked', true);
                        }
                        else if (this.state == 'EXCLUDED') {
                            //do something
                        }
                    });
                    $.modal.close();
                }
            });
        }

        var addOption = function(trim, option, config, configInputId, cbSelector) {
            toggleOption(trim, option, config, configInputId, cbSelector, true);
        }
        var removeOption = function(trim, option, config, configInputId, cbSelector) {
            toggleOption(trim, option, config, configInputId, cbSelector, false);
        }

        //public
        this.addNewOption = addOption;
        this.removeNewOption = removeOption;
    },


    VDPVehicleInfo: new function() {
        var toggleInfoOptions = function() { //maybe rewrite to be a little more modular...?
            $('#optionlist').css('overflow', 'visible').css('display', 'block');

            var fullheight = $('#optionlist').attr('scrollHeight');
            var clippedheight = 85;

            $('#optionlist').css('height', clippedheight).css('display', 'block').css('overflow', 'hidden');

            if (fullheight < clippedheight + 20) {
                $('#optionlist').css('height', clippedheight + 20);
                $('.lessmoreOptionsLink').css('display', 'none').css('visibility', 'hidden');
                $('#lessmoreOptionsSpacer').css('display', 'none');
            }
            else {
                if (fullheight > clippedheight) {
                    $('#lessmoreOptionsSpacer').css('display', 'block');
                    $('.lessmoreOptionsLink').click(function() {

                        if ($('#lessmoreOptionstext').text() == 'See all options chosen') {
                            $('#optionlist').animate({
                                height: fullheight
                            }, 800, function() {
                                $('#lessmoreOptionstext').text('See less options');
                                $('#updownicon').addClass('ui-icon-circle-arrow-n').removeClass('ui-icon-circle-arrow-s');
                            });
                        }
                        else {
                            $('#optionlist').animate({
                                height: clippedheight
                            }, 800, function() {
                                $('#lessmoreOptionstext').text('See all options chosen');
                                $('#updownicon').addClass('ui-icon-circle-arrow-s').removeClass('ui-icon-circle-arrow-n');
                            });
                        }

                        return false;
                    });
                }
                else {
                    $('.lessmoreOptionsLink').css('display', 'none').css('visibility', 'hidden');
                    $('#lessmoreOptionsSpacer').css('display', 'none');
                }
            }
        }
        this.showHideInfo = toggleInfoOptions;
    },
    VDPPictures: new function() {
        var setHovers = function() {
            $("img.slide-left").hover(function() {
                $(this).attr("src", "http://images.nadaguides.com/btn/slideshow/left-nav-button-rollover.jpg");
            },
            function() {
                $(this).attr("src", "http://images.nadaguides.com/btn/slideshow/left-nav-button.jpg");
            });
            $("img.slide-right").hover(function() {
                $(this).attr("src", "http://images.nadaguides.com/btn/slideshow/right-nav-button-rollover.jpg");
            },
            function() {
                $(this).attr("src", "http://images.nadaguides.com/btn/slideshow/right-nav-button.jpg");
            });
            $("img.slide-play").hover(function() {
                $(this).attr("src", "http://images.nadaguides.com/btn/slideshow/play-button-rollover.jpg");
            },
            function() {
                $(this).attr("src", "http://images.nadaguides.com/btn/slideshow/play-button.jpg");
            });
            $("img.slide-pause").hover(function() {
                $(this).attr("src", "http://images.nadaguides.com/btn/slideshow/pause-button-rollover.jpg");
            },
            function() {
                $(this).attr("src", "http://images.nadaguides.com/btn/slideshow/pause-button.jpg");
            });
        }
        this.setHoverImages = setHovers;
    },
    AllHomePages: new function() {
        var setHovers = function() {
            $('#home_toplbox_starthereimg').hover(
            function() {
                $(this).attr('src', 'http://images.nadaguides.com/redesign/hp/hp-start-here-active2.gif');
            },
            function() {
                $(this).attr('src', 'http://images.nadaguides.com/redesign/hp/hp-start-here-static.gif');
            });
        }
        this.setHoverImages = setHovers;
    },
    Survey: new function() {
        var showPollResults = function() {
            voteGetResults("SurveyID=" + $("#SurveyID").val() + "&IsMultipleSelect=" + $("#IsMultipleSelect").val());
        }
        var vote = function() {
            if ($("#IsGrid").val() == "False") {
                if (!$("input[name='AnswerIDList']").is(':checked')) {
                    alert("Please complete the quick poll before voting");
                    return;
                }
            }
            else {
                var answers = $("input:radio.answer");
                for (var i = 0; i < answers.length; i++) {
                    if (($("input[name='" + answers[i].name + "']:checked").val() == undefined)) {
                        alert("Please complete the quick poll before voting");
                        return;
                    }
                }
            }
            voteGetResults($("#frmPoll").serialize());
        }

        var hidePollResults = function() {
            $("input[name='AnswerIDList']").attr('checked', false);
            $("input:radio.answer").attr('checked', false);
            $("#OpenFieldText").val('');
            $("#frmPoll").show();
            $("#rtabbox_results").hide();
        }

        var voteGetResults = function(formdata) {
            $("#frmPoll").hide();
            $("#survey_waiting_panel").show();
            $.ajax(
            {
                type: "POST",
                data: formdata,
                dataType: 'json',
                url: 'Cars/Survey/Ajax/VoteGetResults',
                timeout: 210000,
                error: function(xhr, textStatus, errorThrown) {
                    $("#frmPoll").show();
                    $("#survey_waiting_panel").hide();
                    //alert(xhr.responseText);
                    alert("Sorry, an error occurred while processing your request.");
                },
                success: function(results) {
                    $.each(results, function(index, result) {
                        $("#AnswerID_" + result.SurveyAnswerID).html(result.DisplayPercent);
                    });
                    $("#survey_waiting_panel").hide();
                    $("#rtabbox_results").show();
                }
            })
        }
        this.ShowPollResults = showPollResults;
        this.Vote = vote;
        this.HidePollResults = hidePollResults;
    },
    Widgets: new function() {
        var bldAllMakeAccordion = function(divID) {
            $('#' + divID).accordion({
                autoHeight: false,
                active: false,
                fillSpace: false,
                collapsible: true
            });
        }
        this.buildAllMakeAccordion = bldAllMakeAccordion;
    },
    Util: new function() {
        //this is just for show....for now
        var alertMeNow = function() {
            alert('test');
        }
        this.alertMe = alertMeNow;
    },
    Calculator: new function() {
        var yearCutOff;
        var showLease;

        var setYearCutOff = function(year) {
            yearCutOff = year;
        }
        var setShowLease = function(show) {
            showLease = (show.toLowerCase() == "true");
        }

        //set calculator link (inputs are set through the Model)
        var setDTCalculatorLink = function(linkName, linkContainerName, callGetPmt) {
            var isNew = ($("#IsNew").val().toLowerCase() == "true");
            if (yearCutOff == '' || (!isNew && parseInt($("#ModelYear").val()) < parseInt(yearCutOff))) {
                hideLink(linkName, linkContainerName);
                return;
            }

            setPopupSize(isNew);
            $("#" + linkName).click(function() { NADAjs.Calculator.showCalculator(); });

            if (callGetPmt) {
                getDTDefaultPayment(linkName, linkContainerName);
            } else {
                showLink(linkName, linkContainerName);
            }
        }

        //set calculator (input + link - for multi-car pages)
        var setDTCalculator = function(linkName, linkContainerName, presetCarInfo, callGetPmt,
                            styleID, isNew, modelYear, carDisplayName, cost, retail, mileage) {

            //check that DT calc is enabled + cutoff year check
            if (yearCutOff == '' || (!isNew && parseInt(modelYear) < parseInt(yearCutOff))) {
                hideLink(linkName, linkContainerName);
                return;
            }

            //set link 
            if (presetCarInfo) {
                $("#" + linkName).click(function() { NADAjs.Calculator.showCalculator(); });
            }
            else {
                $("#" + linkName).click(function() {
                    NADAjs.Calculator.setCarShowCalculator(styleID, isNew, carDisplayName, cost, retail, mileage);
                });
            }
            //set car info if needed
            if (presetCarInfo || callGetPmt) {
                setCarInfo(styleID, isNew, carDisplayName, cost, retail, mileage);
            }

            //set pmt - WS
            if (callGetPmt) {
                getDTDefaultPayment(linkName, linkContainerName);
            }
            else {
                showLink(linkName, linkContainerName);
            }
        }

        var hideLink = function(linkName, linkContainerName) {
            if (linkContainerName != null)
                $("#" + linkContainerName).hide();
            else
                $("#" + linkName).hide();
        }
        var showLink = function(linkName, linkContainerName) {
            if (linkContainerName != null)
                $("#" + linkContainerName).show();
            else
                $("#" + linkName).show();
        }
        //set all the data from the parent page
        var setCarInfo = function(styleID, isNew, carDisplayName, cost, retail, mileage) {
            $("#ChromeStyleId").val(styleID);
            $("#IsNew").val(isNew);
            $("#carDisplayName").html(carDisplayName);
            $('#Cost').val(Number(cost.replace(/[^0-9\.]+/g, "")));
            $('#Retail').val(Number(retail.replace(/[^0-9\.]+/g, "")));

            setPopupSize(isNew);

        }

        var setPopupSize = function(isNew) {
            if (isNew && showLease) {
                $('#calc-modal').width(680);
            }
            else {
                $('#calc-modal').width(360).height(536);
            }
        }

        //show pmt in the calc link
        var getDTDefaultPayment = function(linkName, linkContainerName) {
            var formdata = $("#frmPmtInput").serialize();
            formdata += "&Term=60&FinanceTypeID=Loan";
            //alert(formdata);
            $.ajax(
            {
                type: "POST",
                url: '/Cars/Ajax/GetPayment',
                data: formdata,
                dataType: 'json',
                timeout: 210000,
                error: function(xhr, textStatus, errorThrown) {
                    //alert(xhr.responseText);
                    hideLink(linkName, linkContainerName);
                },
                success: function(data) {
                    if (data.MonthlyPayment != null) {
                        $("#" + linkName).html(data.MonthlyPayment);
                        showLink(linkName, linkContainerName);
                    }
                }
            })
        }

        //set inputs & show popup - for multiple cars page
        var setCarShowDTCalculator = function(styleID, isNew, carDisplayName, cost, retail, mileage) {
            setCarInfo(styleID, isNew, carDisplayName, cost, retail, mileage);
            showDTCalculator();
        }

        //show calc
        var showDTCalculator = function(onCloseURL) {

            $('#calc-modal').modal({
                persist: false,
                autoResize: false,
                resize: false,
                closeHTML: "",
                zIndex: 9100,
                position: ["20%"],
                overlayId: 'modal-overlay',
                onShow: function(dlg) {
                    $(dlg.wrap).css('overflow', 'visible');
                    $(dlg.wrap).draggable();
                },
                onClose: function() {
                    if (onCloseURL != undefined) {
                        window.location.href = onCloseURL;
                    }
                    $.modal.close();
                }
            });

            $('#calc-wait').show();

            var calc = $("#calc");
            calc.html("");
            var formdata = $("#frmPmtInput").serialize();
            $.ajax(
            {
                type: "POST",
                data: formdata,
                dataType: 'html',
                url: '/Cars/PaymentCalculator',
                timeout: 210000,
                error: function(xhr, textStatus, errorThrown) {
                    //alert(xhr.responseText);
                    alert("Sorry, an error occurred while processing your request.");
                    $('#calc-wait').hide();
                },
                success: function(calcHtml) {
                    calc.html(calcHtml);
                    $('#calc-wait').hide();
                }
            })
        }

        //public functs
        this.setCalculatorLink = setDTCalculatorLink;
        this.setCalculator = setDTCalculator;
        this.showCalculator = showDTCalculator;
        this.setCarShowCalculator = setCarShowDTCalculator;
        this.getDefaultPayment = getDTDefaultPayment;
        this.SetYearCutOff = setYearCutOff;
        this.SetShowLease = setShowLease;
    },
    Tracking: new function() {
        var _webID;
        var _routeID;

        var init = function(webID, routeID) {
            _webID = webID;
            _routeID = routeID;

            //onload tracking
            $("a.track-link[data-ga-load=1]").each(function() {
                _gaq.push(['_trackEvent', $(this).attr('data-ga-category'), $(this).attr('data-ga-action'),
                                  $(this).attr('data-extLinkId') + '-Load-' + $(this).attr('data-ga-label'), 1, true]);
            });

            //onclick tracking
            $("a.track-link").click(function() {
                var extLinkId = $(this).attr('data-extLinkId');
                if ($(this).attr('data-ga-click') == '1') {
                    _gaq.push(['_trackEvent', $(this).attr('data-ga-category'), $(this).attr('data-ga-action'),
                                  extLinkId + '-Click-' + $(this).attr('data-ga-label'), 1, false]);
                }
                trackExtLink(extLinkId, _webID, _routeID);
            });
        }

        var trackExtLink = function(extLinkID) {
            $.post('/page/TrackLinkId', {
                extLinkId: extLinkID,
                webId: _webID,
                routeId: _routeID
            });
        }

        this.Init = init;
        this.TrackExtLink = trackExtLink;
    },

    PartnerBoxes: new function() {
        var _routeID;
        var init = function(routeID) {
            _routeID = routeID;

            //onload tracking
            $("input[data-ga-category], a[data-ga-category]").each(function() {
                _gaq.push(['_trackEvent', $(this).attr('data-ga-category'), $(this).attr('data-ga-action') + ' - Load',
                           buildGALabel($(this)), 0, true]);
            });

            //onclick tracking
            $("input[data-ga-category], a[data-ga-category]").click(function() {
                //alert(buildGALabel($(this)));
                _gaq.push(['_trackEvent', $(this).attr('data-ga-category'), $(this).attr('data-ga-action') + ' - Click',
                          buildGALabel($(this)), 1, false]);
            });
        }

        var buildGALabel = function(element) {
            return element.attr('data-ga-label') + ' ' + element.attr('data-extLinkId') + ' | ' + _routeID;
        }

        this.Init = init;
    }, //PartnerBoxes

    AutoTraderWidget: new function() {
        var _link = "";
        var _ATBodyStyle = "";
        var _Year = "";
        var _ATMake = "";
        var _ATModel = "";
        var _Zip = "";
        var _UsedCarMakeId = "";
        var _UsedCarModelId = "";
        var _CarCount = 0;

        var _NoValResult = false;
        var _GOExtLinkID = "";
        var _LinkExtLinkID = "";
        var _doneInit = false;

        var init = function(ATvars) {
            _CarCount = parseInt(ATvars.CarCount);
            _link = ATvars.link;
            if (_Zip == "")
                _Zip = ATvars.ZipCode;
            _ATBodyStyle = ATvars.ATBodyStyle;
            _ATMake = ATvars.ATMake;
            _ATModel = ATvars.ATModel;
            _UsedCarMakeId = ATvars.UsedCarMakeId;
            _UsedCarModelId = ATvars.UsedCarModelId;
            _Year = ATvars.Year;
            _GOExtLinkID = ATvars.GOExtLinkID;
            _LinkExtLinkID = ATvars.LinkExtLinkID;

            if (_CarCount > 0) {
                //results found on the server-side
                hideWaitPanel();
                $("#atw-msg-found").show();
            }
            else {
                if (_CarCount == -1 || !validateInput()) {
                    //noval - not enough info to search or ivalid params
                    _NoValResult = true;
                    hideWaitPanel();
                    $("#atw-msg-noVal").show();
                }
                else {
                    //search
                    getAtCars(50);
                }
            }

            $("#atw-btn-go").click(function(event) {
                event.preventDefault();
                goAutoTrader($(this).attr('data-extLinkId'));
            });

            $("#atw-link").click(function(event) {
                event.preventDefault();
                goAutoTrader($(this).attr('data-extLinkId'));
            });

            _doneInit = true;
        } //init

        var validateInput = function() {
            if (_Zip == "" || _UsedCarMakeId == "" || _UsedCarModelId == "" || _Year == "" || _ATMake == "" || _ATModel == "") //_ATBodyStyle == "" ||
                return false;
            else if (isNaN(parseInt(_UsedCarMakeId)) || isNaN(parseInt(_UsedCarModelId)) || isNaN(parseInt(_Year)))
                return false;
            else
                return true;

        } //validateInput

        var goAutoTrader = function(extLinkId) {
            if (_link.length != 0) {
                $("form#formATWidget input[name='extLinkId']").val(extLinkId);
                $("#formATWidget").submit();
            }
        }

        var hideWaitPanel = function() {
            $("#atw-searching").hide();
            $("#atw-btn-go-wrap").show();
            $("#atw-link-wrap").show();
        }

        var getAtCars = function(radius) {
            $.ajax(
                { type: "GET",
                    url: '/Cars/' + _Year + '/' + _ATMake + '/' + _ATModel + '/' +
                    _ATBodyStyle + '/' + _Zip + '/' + radius + '/' + _UsedCarMakeId + '/' + _UsedCarModelId + '/' + 'GetATCarCount',
                    dataType: 'json',
                    timeout: 210000,
                    cache: false,
                    error: function(xhr, textStatus, errorThrown) {
                        hideWaitPanel();
                        $("#atw-msg-noVal").show();
                    },
                    success: function(atwidgetdata) {
                        var newcarcnt = parseInt(atwidgetdata.carCount);

                        //Found cars or done the last search... display, done
                        if (newcarcnt > 0) {
                            hideWaitPanel();
                            $("#linkATWidget").val(atwidgetdata.link);
                            _link = atwidgetdata.link;
                            $("#atw-radius").html(radius);
                            $("#atw-found-count").html(newcarcnt);
                            $("#atw-msg-found").show();

                        }
                        else {
                            //increase the radius and search again
                            if (radius < 200) {
                                if (radius == 25) {
                                    getAtCars(50);
                                } else if (radius == 50) {
                                    getAtCars(75);
                                } else if (radius == 75) {
                                    getAtCars(100);
                                } else if (radius == 100) {
                                    getAtCars(200);
                                }
                            }
                            else {
                                //show No Val message on zero results
                                $("#linkATWidget").val(atwidgetdata.link);
                                _link = atwidgetdata.link;
                                hideWaitPanel();
                                $("#atw-msg-noVal").show();
                            }
                        }
                    }
                });
        } //getAtCars

        var searchNewZip = function(zip) {
            if (!_doneInit) {
                _Zip = zip;
            }
            else if (_Zip != zip) {
                _Zip = zip;
                if (validateInput()) {
                    $("#atw-searching").show();
                    $("#atw-msg-found").hide();
                    $("#atw-msg-noVal").hide();
                    //reset from NoVal IDs
                    $("form#formATWidget .btn-go").attr('data-extLinkId', _GOExtLinkID);
                    $("form#formATWidget #atw-link").attr('data-extLinkId', _LinkExtLinkID);
                    getAtCars(25);
                }
            }
        } //searchNewZip

        this.Init = init;
        this.SearchNewZip = searchNewZip;

    }, //AutoTraderWidget

    Marketing: new function() {

        var boldMakeLinks = function() {
            $("#makelist a:contains('Hyundai')").css({ 'font-weight': 'bold' });
            $("#makelist a:contains('Jaguar')").css({ 'font-weight': 'bold' });
            $("#makelist a:contains('Land Rover')").css({ 'font-weight': 'bold' });
            $("#makelist a:contains('Scion')").css({ 'font-weight': 'bold' });
        }


        this.BoldMakeLinks = boldMakeLinks;
    },

    NewVDPPayment: new function() {
        var init = function(isNewCar, dTShowLease) {
            $("img.dealertrack").hover(function() {
                $(this).attr("src", "http://images.nadaguides.com/redesign/Large-QuickFinancing-Grey-Button.gif");
            },
            function() {
                $(this).attr("src", "http://images.nadaguides.com/redesign/Large-QuickFinancing-Blue-Button.gif");
            });

            var IsNewCar = (isNewCar.toLowerCase() == "true");
            var DTShowLease = (dTShowLease.toLowerCase() == "true");
            //loan 
            $("#frmCalcLoan").validate({ errorPlacement: function(error, element) { } });
            $("#frmCalcLoan").find("#LoanTerm").live("click", function() {
                hideLoanPayment();
            });
            $('#ZipCode').hide();
            getLoanPayment();
            $("#btnCalcLoan").click(function() {
                getLoanPayment();
            });
            $('#frmCalcLoan :input[type=text]').live("keyup", function() {
                hideLoanPayment();
            });

            $('a.help').cluetip({
                splitTitle: '|',
                showTitle: true,
                cluetipClass: 'jtip',
                width: "320px"
            });

            if (IsNewCar && DTShowLease) {
                //lease
                $("#frmCalcLease").validate({ errorPlacement: function(error, element) { } });
                $("#frmCalcLease").find("#LeaseTerm").val(36).live("click", function() {
                    hideLeasePayment();
                });
                $("#frmCalcLease").find("#LeaseMilage").val(36).live("click", function() {
                    hideLeasePayment();
                });
                getLeasePayment();
                $("#btnCalcLease").click(function() {
                    getLeasePayment();
                });

                $('#frmCalcLease :input[type=text]').live("keyup", function() {
                    hideLeasePayment();
                });

            }

            /*   $('#ZipCode').live('keyup', function(e) {
            hideLoanPayment();
            hideLeasePayment();
            var isValid = validateZip();
            if (e.keyCode == 13) {
            if (isValid) {
            $('#ZipCode').hide();
            $('#nvdp-a-zip').html($('#ZipCode').val());
            $('#nvdp-a-zip').show();
            getLoanPayment();
            getLeasePayment();
            }
            return false;
            }
            }); */

            $('#ZipCode').live('keyup', function(e) {
                var isValid = validateZip();
                if (isValid) {
                    $('#ZipCode').hide();
                    $('#nvdp-a-zip').html($('#ZipCode').val());
                    $('#nvdp-a-zip').show();
                    $.ajax({
                        type: 'POST',
                        url: "/Page/ZipCode",
                        data: { zipCode: $('#ZipCode').val() },
                        success: function() {
                            window.location = window.location.pathname;
                        },
                        error: function() {
                        }
                    });
                }
                else
                    return false;
            });

            $("input[name='LeaseMileage']").imageTick({
                tick_image_path: {
                10000: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-10k.gif",
                12000: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-12k.gif",
                15000: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-15k.gif",
                20000: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-20k.gif"
                },
                no_tick_image_path: {
                10000: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-10k.gif",
                12000: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-12k.gif",
                15000: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-15k.gif",
                20000: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-20k.gif"
                },
                image_tick_class: "LeaseMileage"
            });
            $('#LeaseMileage label').click(function() {
                $(this).addClass('selected').siblings().removeClass('selected');
            });

            $("input[name='LeaseTerm']").imageTick({
                tick_image_path: {
                24: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-24.gif",
                36: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-36.gif",
                39: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-39.gif",
                48: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-48.gif"
                },
                no_tick_image_path: {
                24: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-24.gif",
                36: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-36.gif",
                39: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-39.gif",
                48: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-48.gif"
                },
                image_tick_class: "LeaseTerm"
            });
            $('#LeaseTerm label').click(function() {
                $(this).addClass('selected').siblings().removeClass('selected');

            });

            $("input[name='LoanTerm']").imageTick({
                tick_image_path: {
                24: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-24.gif",
                36: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-36.gif",
                48: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-48.gif",
                60: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-60.gif",
                72: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-72.gif",
                84: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-blue-84.gif"
                },
                no_tick_image_path: {
                24: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-24.gif",
                36: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-36.gif",
                48: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-48.gif",
                60: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-60.gif",
                72: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-72.gif",
                84: "http://images.nadaguides.com/redesign/vdp/vdp-payment-calc-grey-84.gif"
                },
                image_tick_class: "LoanTerm"
            });
            $('#LoanTerm label').click(function() {
                $(this).addClass('selected').siblings().removeClass('selected');

            });

            $("input[name='rebateRadio']").bind('click mousedown', (function() {
                var isChecked;
                return function(event) {
                    if (event.type == 'click') {
                        if (isChecked) {
                            isChecked = this.checked = false;
                            $('input[name=rebateRadio]:radio:checked').val('0');
                        } else {
                            isChecked = true;
                        }
                        getLoanPayment();
                        getLeasePayment();
                    } else {
                        isChecked = this.checked;
                    }
                }
            })());

        } //init

        var showZipTextBox = function() {
            $('#ZipCode').show();
            $('#nvdp-a-zip').hide();
        }
        var hideLoanPayment = function(speed) {
            $("#LoanPayment").fadeOut('slow');
            $("#LoanDetails").fadeOut('slow');

        }
        var hideLeasePayment = function(speed) {
            $("#LeasePayment").fadeOut('slow');
            $("#LeaseDetails").fadeOut('slow');

        }
        var validateZip = function() {
            var isValid = false;
            var zipcode = $('#ZipCode').val();
            if (zipcode.length == 5) {
                isValid = /^\d{5}$/.test(zipcode);
            }
            if (isValid) {
                $("#zip-error").hide();
            }
            else {
                $("#zip-error").show();
            }
            return isValid;
        }

        var getLoanPayment = function() {

            var validFormInput = true;
            if (!$("#frmCalcLoan").valid()) {
                $("#LoanValidation").show();
                validFormInput = false;
            }
            else {
                $("#LoanValidation").hide();
            }
            if (!validateZip() || !validFormInput) {
                return;
            }

            var LoanPayment = $("#LoanPayment");
            var LoanDetails = $("#LoanDetails");

            LoanPayment.html('');
            LoanDetails.html('');

            $("#nvdp-pmt-loan").css("background-color", "#ffffff");
            $("#loan-wait").show();
            var formdata = $("#frmCalcLoan").serialize();
            formdata += "&ZipCode=" + $("#ZipCode").val() + "&FinanceTypeID=Loan" + "&Term=" + $("input[name='LoanTerm']:checked").val() + "&SelectedIncentiveID=" + $('input[name=rebateRadio]:radio:checked').val();
            //alert(formdata);
            $.ajax(
            {
                type: "POST",
                url: '/Cars/Ajax/getPayment',
                data: formdata,
                dataType: 'json',
                timeout: 210000,
                error: function(xhr, textStatus, errorThrown) {
                    $("#loan-wait").hide();
                    $("#nvdp-pmt-loan").css("background-color", "#dbdbdd");
                    //alert(xhr.responseText);
                    alert("Sorry, an error occurred while processing your request.");
                },
                success: function(data) {

                    $("#loan-wait").hide();
                    $("#nvdp-pmt-loan").css("background-color", "#dbdbdd");
                    if (data.Message != null && data.Message != "") {
                        LoanPayment.html(" ").removeClass("nvdp-calc-pmt").css({ 'padding-top': '10px' }).fadeIn('fast');
                        alert(data.Message);
                    }
                    else if (data.MonthlyPayment != null) {
                        var pay_detail = "";
                        LoanPayment.html(data.MonthlyPayment + " <span style='font-weight:none; font-size:14px'>/mo<span><div style='font-weight:normal;font-size:10px;'>" + data.DueAtSigning + "</div>").addClass("nvdp-calc-pmt").fadeIn('fast');
                        if (data.PmtDetails != null && data.PmtDetails.length > 0) {
                            var pmtDetails = $.map(data.PmtDetails, function(detail, i) {
                                if (i==0)
                                    return "<div style='padding-top:20px;font-size:12px;'>" + detail + "</div>";
                                else return "<div style='font-size:12px;'>" + detail + "</div>";
                            });
                            LoanDetails.html(pmtDetails.join("")).fadeIn('fast');
                        }
                        $("#frmCalcLoan").find("#DownPayment").val(data.DownPayment);
                    }
                }
            })
        }
        var getLeasePayment = function() {

            var validFormInput = true;
            if (!$("#frmCalcLease").valid()) {
                $("#LeaseValidation").show();
                validFormInput = false;
            }
            else {
                $("#LeaseValidation").hide();
            }
            if (!validateZip() || !validFormInput) {
                return;
            }

            var LeasePayment = $("#LeasePayment");
            LeasePayment.html('');
            var LeaseDetails = $("#LeaseDetails");
            LeaseDetails.html('');
            $("#nvdp-pmt-lease").css("background-color", "#ffffff");
            $("#lease-wait").show();
            var formdata = $("#frmCalcLease").serialize();
            formdata += "&ZipCode=" + $("#ZipCode").val() + "&FinanceTypeID=Lease" + "&Term=" + $("input[name='LeaseTerm']:checked").val() + "&LeaseAnnualMileage=" + $("input[name='LeaseMileage']:checked").val() + "&SelectedIncentiveID=" + $('input[name=rebateRadio]:radio:checked').val();

            $.ajax(
            {
                type: "POST",
                url: '/Cars/Ajax/getPayment',
                data: formdata,
                dataType: 'json',
                timeout: 210000,
                error: function(xhr, textStatus, errorThrown) {
                    $("#lease-wait").hide();
                    $("#nvdp-pmt-lease").css("background-color", "#dbdbdd");
                    //alert(xhr.responseText);
                    alert("Sorry, an error occurred while processing your request.");
                },
                success: function(data) {
                    $("#lease-wait").hide();
                    $("#nvdp-pmt-lease").css("background-color", "#dbdbdd");
                    if (data.Message != null && data.Message != "") {
                        LeasePayment.html(" ").removeClass("nvdp-calc-pmt").css({ 'padding-top': '10px' }).fadeIn('fast');
                        alert(data.Message);
                    }
                    else if (data.MonthlyPayment != null) {
                        LeasePayment.html(data.MonthlyPayment + " <span style='font-weight:none; font-size:14px'>/mo</span><div style='font-weight:normal;font-size:10px;'>" + data.DueAtSigning + "</div>").addClass("nvdp-calc-pmt").fadeIn('fast');
                        if (data.PmtDetails != null && data.PmtDetails.length > 0) {
                            var pmtDetails = $.map(data.PmtDetails, function(detail, i) {
                                if (i==0)
                                    return "<div style='padding-top:20px;font-size:12px;'>" + detail + "</div>";
                                else return "<div style='font-size:12px;'>" + detail + "</div>";
                            });
                            LeaseDetails.html(pmtDetails.join("")).fadeIn('fast');
                        }
                        $("#frmCalcLease").find("#DownPayment").val(data.DownPayment);

                    }
                }
            })
        }
        this.Init = init;
        this.HideLoanPayment = hideLoanPayment;
        this.HideLeasePayment = hideLeasePayment;
        this.ValidateZip = validateZip;
        this.GetLoanPayment = getLoanPayment;
        this.GetLeasePayment = getLeasePayment;
        this.ShowZipTextBox = showZipTextBox;

    }, //NewVDPPayment

    NewVDPCostToOwn: new function() {

        var init = function() {
            $('a.help').cluetip({
                splitTitle: '|',
                showTitle: true,
                cluetipClass: 'jtip',
                width: "320px"
            });
            $("#nvdp-years-select").change(function(e) { return $('#nvdp-years-select').blur(); });
            $("#nvdp-miles-select").change(function(e) { return $('#nvdp-miles-select').blur(); });
            
        } //init

        var ctoSubmit = function() {
            if (validZipCode($('#txtCTOZip').val())) {
                $('#txtCTOZip').attr('disabled', 'disabled');
                $('#nvdp-ctoSubmitBtn').hide();
                $('#ctoProcessing').show();
                $.ajax({
                    type: 'POST',
                    url: "/Page/ZipCode",
                    data: { zipCode: $("#txtCTOZip").val() },
                    success: function() {
                        var version = $('#nvdp-miles-select option:selected').val() + $('#nvdp-years-select option:selected').val();
                        var path = window.location.pathname;
                        if (path.substr(path.lastIndexOf('/') + 1, path.length).length == 8)
                            path = path.substr(0, path.lastIndexOf('/'));
                        window.location = path + '/' + version + $('#txtCTOZip').val();
                    },
                    error: function() {
                        $('#txtCTOZip').removeAttr('disabled');
                        $('#nvdp-ctoSubmitBtn').show();
                        $('#ctoProcessing').hide();
                    }
                });
            }
            else
                alert('Please enter a valid zip code');
        }
        this.Init = init;
        this.CtoSubmit = ctoSubmit;
    }, //NewVDPCostToOwn

    NewVDPPictures: new function() {
        var config = {
            play: false,
            slideSpeed: 3000,
            thumbWrapperId: 'nvdp-pic-thumbs',
            fullImgId: 'nvdp-pic-full',
            picIndexId: 'currpic',
            selectedClass: 'selected'
        };

        var thumbWrap;
        var fullImg;
        var slideShowOn;
        var picIndexElem;

        //public
        var next = function() {
            var nextThumb = getSelected().nextAll('img:first');
            if (nextThumb.length == 0) {
                nextThumb = thumbWrap.find('img:first-child');
            }
            showImg(nextThumb);
        };

        var prev = function() {
            var prevThumb = getSelected().prevAll('img:first');
            if (prevThumb.length == 0) {
                prevThumb = thumbWrap.find('img:last-child');
            }
            showImg(prevThumb);
        };

        var showImg = function(thumbElem) {
            if (!$(thumbElem).hasClass(config.selectedClass)) {
                fullImg.fadeOut(250, function() {
                    var bigImgSrc = $(thumbElem).attr('data-big');
                    var selectedClass = config.selectedClass;
                    getSelected().removeClass(selectedClass);
                    $(thumbElem).addClass(selectedClass);
                    fullImg.attr('src', bigImgSrc);
                    fullImg.fadeIn(500);
                    setPicCount();
                });

            }
        };

        var playSlideshow = function() {
            slideShowOn = true;
            slideshowNext();
        };

        var pauseSlideshow = function() {
            slideShowOn = false;
        };

        var init = function(userConfig) {
            $.extend(config, userConfig);
            thumbWrap = $('#' + config.thumbWrapperId);
            fullImg = $('#' + config.fullImgId);
            slideShowOn = config.play;
            picIndexElem = $('#' + config.picIndexId);
        };

        //private
        var slideshowNext = function() {
            if (slideShowOn) {
                next();
                setPicCount();
                setTimeout(function() { slideshowNext(); }, config.slideSpeed);
            }
        };

        var getSelected = function() {
            return thumbWrap.find('.' + config.selectedClass);
        };

        var setPicCount = function() {
            var picNum = 1;
            $(thumbWrap).children('img').each(function() {
                if ($(this).hasClass(config.selectedClass)) {
                    picIndexElem.html(picNum);
                    return false;
                } else {
                    picNum++;
                }
            });
        };

        this.playSlideshow = playSlideshow;
        this.pauseSlideshow = pauseSlideshow;
        this.next = next;
        this.prev = prev;
        this.showImg = showImg;
        this.init = init;
    }
};


function killsChildNodes(an_element) {
    while (an_element.firstChild != null) {
        if (!an_element.firstChild.hasChildNodes()) {
            var k = an_element.firstChild;
            an_element.removeChild(k);
        } else {
            killsChildNodes2(an_element.firstChild);
        }
    }
}
function killsChildNodes2(another_element) {
    while (another_element.firstChild != null) {
        if (!another_element.firstChild.hasChildNodes()) {
            var k2 = another_element.firstChild;
            another_element.removeChild(k2);
        } else {
            killsChildNodes(another_element.firstChild);
        }
    }
}


function SetupModelDetailTableEvents() {

    $("#content_models tr.detailrow").click(function() {

        if ($('tr.selectedColor').length == 0) {
            $(this).removeClass("detailrow").removeClass('even').removeClass('highlightColor');
            $(this).find('td').removeClass('even');
            $(this).addClass("selectedColor");
            var url = $(this).find('td:first').find('div a').attr('href');
            if (url != '' && url != undefined)
                window.open(url, '_self', '');
        }
    });

    $("#content_models tr.detailrow").hover(
        function() {
            if ($(this).find('td').hasClass('even')) {
                $(this).find('td').addClass('highlightColoreven');
            } else {
                $(this).find('td').addClass('highlightColor');
            }

            if ($(this).find('td').hasClass('even')) {
                $(this).find('td').addClass('waseven').removeClass('even');
            }
        },
        function() {
            if ($(this).hasClass('detailrow')) {
                $(this).find('td').removeClass('highlightColor').removeClass('highlightColoreven');

                if ($(this).find('td').hasClass('waseven')) {
                    $(this).find('td').addClass('even');
                    $(this).find('td').removeClass('waseven');
                }
            }
        }
    );

    $("#content_models tr.detailrow td:nth-child(1)").addClass('borderRight');

}

function featureDetectionIEShadow() {
    var flagDetection = false;
    function shadowDetection($handle, css) {
        try {
            var shadow = $handle.css(css);
            if (shadow != 'null' && shadow != '') {
                var regTest = String(shadow.match(/AAAAAA/i));
                if (regTest != '') {
                    flagDetection = true;
                }
            }
        } catch (err) { };
    }
    var $testIE = $('<div></div>').css('box-shadow', '0px 0px 8px 5px #AAAAAA');
    shadowDetection($testIE, 'box-shadow');
    return flagDetection;
}