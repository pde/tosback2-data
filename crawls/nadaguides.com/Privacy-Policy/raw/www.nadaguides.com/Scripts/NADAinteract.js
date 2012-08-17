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
    if ($(VINjqObject).val() == "Press GO or Enter VIN") {
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
                async: true,
                error: function(data) { /*$.modal.close();*/ },
                success: function(data) {
                    changePrices(data);
                    optState = $(data.optData);
                    $("#opt-conflict").dialog("close");
                    handleConflicts(data.optConflict);
                    toggleBoxes(optState);
                    buildSumm();

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