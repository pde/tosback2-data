var searchBox = {
    showBox: function(elem) {
        var regExNav = new RegExp('active_[a-zA-Z]+');
        var regExShow = new RegExp('theSearchBox_[a-zA-Z]+');
        var newClass = elem.replace('searchNav', 'active');
        var showId = elem.replace('searchNav', 'theSearchBox');
        var newSource = elem.replace('searchNav_', '').replace('count', '').toUpperCase();
        //alert(newSource);
        $('#source').val(newSource);
        document.getElementById('rolling_message_1').innerHTML = '';
        showId = showId.replace('count', '');
        //navigation		
        $('ul#searchNav li').each(function() {
            if ((" " + this.className + " ").match(regExNav)) {
                $(this).removeClass(" " + this.className + " ");
            }
        });
        $('#' + elem).addClass(newClass);

        //show/hidebox		
        $('div#searchBoxesWrapper div.searchBox').hide();
        $('#' + showId).show();
        var titleText = showId.replace('theSearchBox_', '');
        titleText = titleText.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        $('#theSearchBoxTitleExtention').replaceWith('<span id="theSearchBoxTitleExtention">' + titleText + '</span>');
    },
    submitSearch: function(elem) {
        switch (elem) {
            case 'DEALS':
                location.href = 'http://' + location.host + '/search/?date=' + $('#date').val() + '&date2=' + $('#date2').val() + '&operatorid=' + $.trim(($('#cruiselineid_deals').selectedValues())[0]) + '&destinationid=' + $.trim(($('#destinationid_deals').selectedValues())[0]) + '&shipid=' + $.trim(($('#cruiseshipid_deals').selectedValues())[0]) + '&chkuk=' + ($('#chkuk').attr('checked')) + '&chkitaly=' + ($('#chkitaly').attr('checked')) + '&chkspain=' + ($('#chkspain').attr('checked')) + '&chkcaribbean=' + ($('#chkcaribbean').attr('checked')) + '&chkusa=' + ($('#chkusa').attr('checked')) + '&chkocean=' + ($('#chkocean').attr('checked')) + '&chkriver=' + ($('#chkriver').attr('checked')) + '&chkallsailings=' + ($('#chkallsailings').attr('checked')) + '&chkall=' + ($('#chkall').attr('checked')) + '&searchtype=' + ($('#searchtype').selectedValues())[0] + '&cruisetypeid=' + ($('#cruisetypeid').selectedValues())[0] + '&chksouthampton=' + ($('#chksouthampton').attr('checked')) + '&chkbarcelona=' + ($('#chkbarcelona').attr('checked')) + '&chkrome=' + ($('#chkrome').attr('checked')) + '&chkvenice=' + ($('#chkvenice').attr('checked')) + '&chkeurope=' + ($('#chkeurope').attr('checked'));
                break;
            case 'REVIEWS':
                location.href = 'http://' + location.host + '/cruise-reviews/search/?reviewcruiselineid=' + ($('#cruiselineid_reviews').selectedValues())[0] + '&reviewcruiseshipid=' + ($('#cruiseshipid_reviews').selectedValues())[0] + '&reviewdestinationid=' + ($('#destinationid_reviews').selectedValues())[0] + '&searchtype=' + ($('#searchtype').selectedValues())[0] + '&chkocean=' + ($('#chkocean').attr('checked')) + '&chkriver=' + ($('#chkriver').attr('checked'));
                break;
            case 'ANSWERS':
                location.href = 'http://' + location.host + '/cruise-answers/search/?cruiselineid=' + ($('#cruiselineid_questions').selectedValues())[0] + '&cruiseshipid=' + ($('#cruiseshipid_questions').selectedValues())[0] + '&destinationid=' + ($('#destinationid_questions').selectedValues())[0] + '&topicid=' + ($('#topicid').selectedValues())[0] + '&searchtype=' + ($('#searchtype').selectedValues())[0] + '&topicid=' + ($('#topicid').selectedValues())[0] + '&chkocean=' + ($('#chkocean').attr('checked')) + '&chkriver=' + ($('#chkriver').attr('checked'));
                break;
            case 'PHOTOS':
                var script_destination = ($('#chkofficial_o').attr('checked')) ? 'official-photos' : 'cruise-photos';
                location.href = 'http://' + location.host + '/' + script_destination + '/search/?gallerycruiselineid=' + ($('#cruiselineid_photos').selectedValues())[0] + '&gallerycruiseshipid=' + ($('#cruiseshipid_photos').selectedValues())[0] + '&gallerydestinationid=' + ($('#destinationid_photos').selectedValues())[0] + '&chkocean=' + ($('#chkocean').attr('checked')) + '&chkriver=' + ($('#chkriver').attr('checked')) + '&chkofficial=' + ($('#chkofficial').attr('checked'));
                break;
            case 'VIDEOS':
                location.href = 'http://' + location.host + '/cruise-videos/search/?videocruiselineid=' + ($('#cruiselineid_videos').selectedValues())[0] + '&videocruiseshipid=' + ($('#cruiseshipid_videos').selectedValues())[0] + '&searchtype=' + ($('#searchtype').selectedValues())[0] + '&chkocean=' + ($('#chkocean').attr('checked')) + '&chkriver=' + ($('#chkriver').attr('checked'));
                break;
            case 'news':
                location.href = 'http://' + location.host + '/cruise-news/search/?articlecruiselineid=' + ($('#cruiselineid').selectedValues())[0] + '&articlecruiseshipid=' + ($('#cruiseshipid').selectedValues())[0] + '&articledestinationid=' + ($('#destinationid').selectedValues())[0] + '&searchtype=' + ($('#searchtype').selectedValues())[0];
                break;
            default:
                location.href = 'http://' + location.host + '/search/?date=' + $('#date').val() + '&date2=' + $('#date2').val() + '&operatorid=' + $.trim(($('#cruiselineid').selectedValues())[0]) + '&destinationid=' + $.trim(($('#destinationid').selectedValues())[0]) + '&shipid=' + $.trim(($('#cruiseshipid').selectedValues())[0]) + '&chkuk=' + ($('#chkuk').attr('checked')) + '&chkitaly=' + ($('#chkitaly').attr('checked')) + '&chkspain=' + ($('#chkspain').attr('checked')) + '&chkcaribbean=' + ($('#chkcaribbean').attr('checked')) + '&chkusa=' + ($('#chkusa').attr('checked')) + '&chkocean=' + ($('#chkocean').attr('checked')) + '&chkriver=' + ($('#chkriver').attr('checked')) + '&chkallsailings=' + ($('#chkallsailings').attr('checked')) + '&chkall=' + ($('#chkall').attr('checked')) + '&searchtype=' + ($('#searchtype').selectedValues())[0] + '&cruisetypeid=' + ($('#cruisetypeid').selectedValues())[0] + '&chksouthampton=' + ($('#chksouthampton').attr('checked')) + '&chkbarcelona=' + ($('#chkbarcelona').attr('checked')) + '&chkrome=' + ($('#chkrome').attr('checked')) + '&chkvenice=' + ($('#chkvenice').attr('checked')) + '&chkeurope=' + ($('#chkeurope').attr('checked'));
                break;
        }
    },
    checkRiver: function() {
        if ($("#chkriver").attr("checked") == "checked" || $("#chkriver").attr("checked") == true) {
            $("#chkocean").attr("checked", false);
            $("#chkshorex").attr("checked", false);
            jQuery('.search_form_field_standard').show();
            jQuery('#search_form_field_shorex').hide();

            $("#sailFrom_top").css("display", "none");
            $("#sailFrom_bottomLeft").css("display", "none");
        } else {
            $("#chkocean").attr("checked", true);
            $("#sailFrom_top").css("display", "");
            $("#sailFrom_bottomLeft").css("display", "");
        }
        searchBox.toggleDropdown('River');
    },
    checkOcean: function() {
        if ($("#chkocean").attr("checked") == true || $("#chkocean").attr("checked") == "checked") {
            $("#chkriver").attr("checked", false);
            $("#chkshorex").attr("checked", false);
            jQuery('.search_form_field_standard').show();
            jQuery('#search_form_field_shorex').hide();
            $("#sailFrom_top").css("display", "");
            $("#sailFrom_bottomLeft").css("display", "");
        } else {
            $("#chkriver").attr("checked", true);
            $("#sailFrom_top").css("display", "none");
            $("#sailFrom_bottomLeft").css("display", "none");
        }
        searchBox.toggleDropdown('Ocean');
    },
    toggleDropdown: function(elem) {
        var cruiselinesDropdown_offers = document.getElementById('hidden' + elem + 'Lines_offers').innerHTML;
        var cruiselinesDropdown_reviews = document.getElementById('hidden' + elem + 'Lines_reviews').innerHTML;
        var cruiselinesDropdown_answers = document.getElementById('hidden' + elem + 'Lines_answers').innerHTML;

        var destinationsDropdown = document.getElementById('hidden' + elem + 'Destinations').innerHTML;
        $('#cruiselineid_deals').empty().append(cruiselinesDropdown_offers);
        $('#cruiselineid_reviews').empty().append(cruiselinesDropdown_reviews);
        $('#cruiselineid_questions').empty().append(cruiselinesDropdown_answers);
        $('#cruiselineid_photos').empty().append(cruiselinesDropdown_answers);
        $('#cruiselineid_videos').empty().append(cruiselinesDropdown_offers);

        $('#destinationid_deals').empty().append(destinationsDropdown);
        $('#destinationid_reviews').empty().append(destinationsDropdown);
        $('#destinationid_questions').empty().append(destinationsDropdown);
        $('#destinationid_photos').empty().append(destinationsDropdown);

    },
    repopulateShips: function(elemLine, elemShip) {

        var pVal = $('#' + elemLine).val()
        pVal = $.trim(pVal)
        //alert(pVal);
        var postVal = 'type=html&ids=' + pVal + '&dynController=CruiseShips';		//fetch.php?type=html&ids=3&dynController=CruiseShips

        $.ajax({
            type: "POST",
            url: "/service/fetch.php",
            data: postVal,
            success: function(data) {
                //alert(data);
                var isError = data.indexOf('errorMessage');
                if (isError != -1) {
                    //document.getElementById(elemShip).innerHTML = data
                } else {
                    //document.getElementById(elemShip).innerHTML = data
                    $('#' + elemShip).empty().append(data);
                }
            }
        });
    },
    rollingMessage: function() {
        var source = $("#source").val();
        var msgId = document.getElementById('rollingMessages');
        if (msgId) {
            var msgStrg = $("#rollingMessages").val();

            var aMsgs = msgStrg.split('~');
            /*
             aMsgs[0]'Live Prices',
             aMsgs[1]'Live Availability',
             aMsgs[2]'Book Online',
             aMsgs[3]'Unbiased',			
             aMsgs[4]'Real People',
             aMsgs[5]'Real Reviews',
             aMsgs[6]'Unedited',
             aMsgs[7]'Impart Your Knowledge',
             aMsgs[8]'Passenger Photos',
             aMsgs[9]'All Lines &amp; All Ships',			
             aMsgs[10]'Upload Videos',
             aMsgs[11]'Amazing Videos Online'			
             */
            switch (source) {
                case 'DEALS':
                    if ($("#rolling_message_1").html() == aMsgs[0] || $("#rolling_message_1").html() == '') {
                        $("#rolling_message_1").html(aMsgs[1]);
                    } else if ($("#rolling_message_1").html() == aMsgs[1]) {
                        $("#rolling_message_1").html(aMsgs[2]);
                    } else if ($("#rolling_message_1").html() == aMsgs[2]) {
                        $("#rolling_message_1").html(aMsgs[0]);
                    }
                    break;
                case 'REVIEWS':
                    if ($("#rolling_message_1").html() == aMsgs[3] || $("#rolling_message_1").html() == '') {
                        $("#rolling_message_1").html(aMsgs[4]);
                    } else if ($("#rolling_message_1").html() == aMsgs[4]) {
                        $("#rolling_message_1").html(aMsgs[5]);
                    } else if ($("#rolling_message_1").html() == aMsgs[5]) {
                        $("#rolling_message_1").html(aMsgs[3]);
                    }
                    break;
                case 'QUESTIONS':
                    if ($("#rolling_message_1").html() == aMsgs[3] || $("#rolling_message_1").html() == '') {
                        $("#rolling_message_1").html(aMsgs[6]);
                    } else if ($("#rolling_message_1").html() == aMsgs[6]) {
                        $("#rolling_message_1").html(aMsgs[7]);
                    } else if ($("#rolling_message_1").html() == aMsgs[7]) {
                        $("#rolling_message_1").html(aMsgs[3]);
                    }
                    break;
                case 'PHOTOS':
                    if ($("#rolling_message_1").html() == aMsgs[8] || $("#rolling_message_1").html() == '') {
                        $("#rolling_message_1").html(aMsgs[6]);
                    } else if ($("#rolling_message_1").html() == aMsgs[6]) {
                        $("#rolling_message_1").html(aMsgs[9]);
                    } else if ($("#rolling_message_1").html() == aMsgs[9]) {
                        $("#rolling_message_1").html(aMsgs[8]);
                    }
                    break;
                case 'VIDEOS':
                    if ($("#rolling_message_1").html() == aMsgs[10] || $("#rolling_message_1").html() == '') {
                        $("#rolling_message_1").html(aMsgs[6]);
                    } else if ($("#rolling_message_1").html() == aMsgs[6]) {
                        $("#rolling_message_1").html(aMsgs[11]);
                    } else if ($("#rolling_message_1").html() == aMsgs[11]) {
                        $("#rolling_message_1").html(aMsgs[10]);
                    }
                    break;
            }
        }
    },
    getDestinationChecked: function(elem) {
        var pVal = $('#' + elem).val()
        pVal = $.trim(pVal)
        var postVal = 'type=json&ids=' + pVal + '&dynController=CheckedDestinations';
        $.ajax({
            type: "POST",
            url: "/service/fetch.php",
            data: postVal,
            success: function(data) {
                var isError = data.indexOf('errorMessage');
                if (isError != -1) {
                    //error
                } else {
                    var json = data
                    var obj = JSON && JSON.parse(json) || $.parseJSON(json);
                    var cnt = obj.length
                    var useDefault = true
                    $('#theSearchBox input.searchCheckbox').prop('checked', false);
                    for (var i = 0; i < cnt; i++) {
                        if (obj[i]['DestinationId']) {
                            useDefault = false
                            $('#' + obj[i]['CheckboxId']).prop('checked', true);
                        }
                    }
                    if (useDefault) {
                        $('#chkuk').prop('checked', true);
                        $('#chkbarcelona').prop('checked', true);
                        $('#chkrome').prop('checked', true);
                        $('#chkvenice').prop('checked', true);
                    }

                }
            }
        });
    },
    checkAll: function() {
        if ($("#chkall").attr("checked")) {
            //$("#chksouthampton").attr("checked", false);
            $("#chkuk").attr("checked", false);
            $("#chkbarcelona").attr("checked", false);
            $("#chkrome").attr("checked", false);
            $("#chkvenice").attr("checked", false);
            $("#chkeurope").attr("checked", false);
            $("#chkcaribbean").attr("checked", false);
            $("#chkusa").attr("checked", false);
        }
    },
    checkOther: function() {
        if ($("#chkuk").attr("checked") || $("#chkbarcelona").attr("checked") || $("#chkrome").attr("checked") || $("#chkvenice").attr("checked") || $("#chkeurope").attr("checked") || $("#chkcaribbean").attr("checked") || $("#chkusa").attr("checked")) {
            $("#chkall").attr("checked", false);
        }
    },
    setDates: function() {
        var dateselected = $("#date").val();
        var month = dateselected.substring(0, 2);
        var month2 = parseInt(month, 10) + 2;
        var year = dateselected.substring(2, 6);
        var year2 = parseInt(year, 10) + 1;
        if (month2 < 10) {
            defaultdate = "0" + month2 + "" + year;
        } else {
            defaultdate = month2 + "" + year;

            if (month2 > 12) {
                var monthdiff = month2 - 12;
                defaultdate = "0" + monthdiff + "" + year2;
            }
        }
        $("#date2 option[value=" + defaultdate + "]").attr("selected", "selected");
    },
    datePicker: function() {
        $(".datepicker").datepicker({
            dateFormat: "d M yy",
            changeMonth: true,
            changeYear: true,
            onSelect: function(date, instance) {
                if (instance.id == 'date') {
                    var date1 = new Date(date)
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var Y = date1.getUTCFullYear();
                    var M = months[(date1.getMonth( ) + 2)];
                    var D = date1.getDate();
                    var date2 = D + ' ' + M + ' ' + Y
                    $('input[name="date2"]').val(date2);
                }
            }
        });
    }

}/*<--end searchBox*/

window.setInterval(function() {
    searchBox.rollingMessage();
}, 2000);


$(document).ready(function() {
    searchBox.datePicker();
});

