/*
jQuery Plugin iSchedule v1.0.0
Author: Nico Westerdale
http://www.iconico.com
*/

(function () {

    var opts;
    var iBox;
    var animated = false;

    var methods = {
        init: function (options) {

            opts = $.extend({}, $.fn.ischedule.defaults, options);
            iBox = $(this);

            if (opts.jsonfile) {
                $.ajax({
                    type: 'GET',
                    url: opts.jsonfile + '?format=client&jsoncallback=?',
                    dataType: 'json',
                    success: methods.parseJSON
                });
            } else {
                alert('Quiz Error: No JSON Data Specified!');
            }

        },

        parseJSON: function (json) {
            var start = true;
            var out = [];   //use an array to speed up memory management

            //topper
            out.push('<div class="iScheduleTopper">Schedule<input type="text" class="iScheduleMonth" /><a class="iScheduleViewFullDay" href="http://www.usanetwork.com/schedules/sched.php"></a></div>');

            //create navigation
            out.push('<div class="iSchedulePrev"></div><div class="iScheduleNext"></div>');
            
            //create leftside
            out.push('<div class="iScheduleDates">');
            out.push('<table cellpadding="0" cellspacing="0" border="0" id="tblDates">');

            //top row
            out.push('<tr><td class="iScheduleDate iScheduleDateTop">ET/PT</td></tr>');

            //loop over each day
            $.each(json.data, function (iDate, itemDate) {

                //set up row
                var dateObj = new Date(iDate);
                if (start) {
                    out.push('<tr class="iScheduleToday">');
                } else {
                    out.push('<tr>');
                }
                out.push('<td class="iScheduleDate"><div>');
                if (start) {
                    out.push('ON NOW');
                } else {
                    out.push(dateObj.toString('ddd'));
                }
                out.push('</div>');
                out.push(dateObj.toString('MMM d'));
                out.push('</td>');
                out.push('</tr>');
                start = false;
            });

            out.push('</table>');
            out.push('</div>');



            //create main data table
            out.push('<div class="iScheduleShows">');
            out.push('<table cellpadding="0" cellspacing="0" border="0" id="tblData">');
            start = true;

            //top row
            var am = true;
            var hour = 6;
            var time;
            out.push('<tr>');
            for (var h = 0; h < 24; h++) {

                //build matching time string
                time = hour + ':00 ' + (am ? 'A' : 'P') + 'M';

                //write out
                out.push('<td class="iScheduleShow iScheduleShowTop">' + time + '</td>');

                //set next
                hour++;
                if (hour == 12) {
                    am = !am;
                }
                if (hour == 13) {
                    hour = 1;
                }
            }
            out.push('</tr>');

            //loop over each day
            $.each(json.data, function (iDate, itemDate) {

                //set up row
                var dateObj = new Date(iDate);
                if (start) {
                    out.push('<tr class="iScheduleToday">');
                } else {
                    out.push('<tr>');
                }

                //set tracking hours
                var am = true;
                var hour = 6;
                var time = '';
                var prevItemTime;
                var thisItemTime;

                for (var h = 0; h < 24; h++) {

                    thisItemTime = null;

                    //build matching time string
                    time = (hour < 10 ? '0' + hour : hour) + ':00 ' + (am ? 'A' : 'P') + 'M';

                    //loop over each show and find matching one
                    $.each(itemDate, function (iTime, itemTime) {

                        //use last good time if one not present
                        if (iTime == time) {
                            thisItemTime = itemTime;
                            return false;
                        }

                    });

                    if (!thisItemTime) {
                        thisItemTime = prevItemTime;
                    }
                    if (!thisItemTime) {
                        thisItemTime = { show: 'n/a', episode: 'n/a' }
                    }

                    //write out
                    out.push('<td class="iScheduleShow' + (h > 13 && h < 18 ? ' iSchedulePrime' : '') + '"><div id="iS_' + escape($.trim(thisItemTime.show)).replace(/\%/gi, '') + '">');

                    if (thisItemTime.show != 'null') {
                        var showLinkArray = [
                            'series/burnnotice',
                            'series/csi/',
                            'series/criminalintent',
                            'series/covertaffairs',
                            'series/fairlylegal',
                            'series/house',
                            'series/inplainsight',
                            'series/necessaryroughness',
                            'series/ncis',
                            'series/psych',
                            'series/wwe',
                            'series/royalpains',
                            'series/suits',
                            'series/svu',
                            'series/toughenough',
                            'series/whitecollar',
                            'movies'
                        ];
                        var showSearchArray = [
                            '^BURN NOTICE',
                            '^CSI',
                            '^LAW \& ORDER\: CRIMINAL INTENT',
                            '^COVERT AFFAIRS',
                            '^FAIRLY LEGAL',
                            '^HOUSE',
                            '^IN PLAIN SIGHT',
                            '^NECESSARY ROUGHNESS',
                            '^NCIS',
                            '^PSYCH',
                            '^WWE MONDAY NIGHT RAW',
                            '^ROYAL PAINS',
                            '^SUITS',
                            '^LAW \& ORDER\: SVU',
                            '^WWE TOUGH ENOUGH',
                            '^WHITE COLLAR',
                            '^USA MOVIE'
                        ];

                        var found = false;
                        for (s = 0; s < showSearchArray.length; s++) {
                            var re = new RegExp(showSearchArray[s]);
                            if (thisItemTime.show.match(re, 'i')) {
                                out.push('<a href="http://www.usanetwork.com/' + showLinkArray[s] + '">' + thisItemTime.show + '</a>');
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            out.push(thisItemTime.show);
                        }
                    }
                    out.push('</div><div>');
                    if (thisItemTime.episode != 'null') out.push(thisItemTime.episode);
                    out.push('<span id="iSNEW_' + escape($.trim(thisItemTime.show)).replace(/\%/gi, '') + '_' + escape($.trim(thisItemTime.episode)).replace(/\%/gi, '') + '">(NEW)</span>');
                    out.push('</div></td>');

                    //set next
                    hour++;
                    if (hour == 12) {
                        am = !am;
                    }
                    if (hour == 13) {
                        hour = 1;
                    }
                    prevItemTime = thisItemTime;

                }

                //finish row
                out.push('</tr>');
                start = false;
            });
            out.push('</table>');
            out.push('</div>');

            //footer
            out.push('<div class="iScheduleFoot">Schedule is subject to change<div></div></div>');



            iBox.append(out.join(''));


            //set up initial offset based on user's time
            var d = new Date();
            hours = d.getHours();
            if (hours < 4) {
                hours = hours + 18;
            } else if (hours < 6) {
                hours = 21;
            } else {
                hours = hours - 6;
            }
            iBox.find('.iScheduleShows table').css({ 'marginLeft': -293 * hours });

            //set up events
            iBox.find('.iScheduleNext').click(function () {
                if (!animated) {
                    animated = true;
                    var left = parseInt(iBox.find('.iScheduleShows table').css('marginLeft'));
                    left -= 293;
                    if (left < -6153) {
                        animated = false;
                    } else {
                        iBox.find('.iScheduleShows table').animate({ 'marginLeft': left }, 300, function () {
                            // Animation complete.
                            animated = false;
                            var left = parseInt(iBox.find('.iScheduleShows table').css('marginLeft'));
                            left -= 293;
                            if (left < -6153) {
                                iBox.find('.iScheduleNext').fadeOut(300);
                            } else {
                                iBox.find('.iScheduleNext').fadeIn(300);
                            }
                            if (left > 0) {
                                iBox.find('.iSchedulePrev').fadeOut(300);
                            } else {
                                iBox.find('.iSchedulePrev').fadeIn(300);
                            }
                        });
                    }
                }
            });

            iBox.find('.iSchedulePrev').click(function () {
                if (!animated) {
                    animated = true;
                    var left = parseInt(iBox.find('.iScheduleShows table').css('marginLeft'));
                    left += 293;
                    if (left > 0) {
                        animated = false;
                    } else {
                        iBox.find('.iScheduleShows table').animate({ 'marginLeft': left }, 300, function () {
                            // Animation complete.
                            animated = false;
                            var left = parseInt(iBox.find('.iScheduleShows table').css('marginLeft'));
                            left += 293;
                            if (left < -6153) {
                                iBox.find('.iScheduleNext').fadeOut(300);
                            } else {
                                iBox.find('.iScheduleNext').fadeIn(300);
                            }
                            if (left > 0) {
                                iBox.find('.iSchedulePrev').fadeOut(300);
                            } else {
                                iBox.find('.iSchedulePrev').fadeIn(300);
                            }
                        });
                    }
                }
            });


            iBox.find('.iScheduleMonth').datepicker({
                showOn: 'button',
                buttonImage: 'http://www.usanetwork.com/_img/schedule/btn_month_off.png',
                buttonImageOnly: true,
                minDate: 0,
                onSelect: function (dateText, inst) { location.href = 'http://www.usanetwork.com/schedules/sched.php?sdate=' + dateText; }
            });
            iBox.find('.iScheduleTopper .ui-datepicker-trigger').hover(function () {
                $(this).attr('src', 'http://www.usanetwork.com/_img/schedule/btn_month_on.png');
            }, function () {
                $(this).attr('src', 'http://www.usanetwork.com/_img/schedule/btn_month_off.png');
            });
            
            $('#usa_globalHeaderSubNav_schedule').addClass('done');
            
            // set events
	    	$('#ui-datepicker-div').mouseenter(function(event){
	    		usa_setOpenMenu('schedule');
	    	});
	    	
	    	$('#ui-datepicker-div').mouseleave(function(event){
	    		usa_beginHideMenu('schedule');
	    	});
        }
    }

    //Set up the ischedule
    $.fn.ischedule = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
    }

    //Set default options
    $.fn.ischedule.defaults = {
        jsonfile: '' 		// url to json file
    }

})();