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
            out.push('<div style = "width : 7008px" id="tblData">');
            start = true;

            //top row
            var am = true;
            var hour = 6;
            var time;
            out.push('<div>');
            for (var h = 0; h < 24; h++) {

                //build matching time string
                time = hour + ':00 ' + (am ? 'A' : 'P') + 'M';

                //write out
                out.push('<div class="iScheduleShow iScheduleShowTop"><div style = "display:table-cell;vertical-align:middle;height:inherit">' + time + '</div></div>');
                //set next
                hour++;
                if (hour == 12) {
                    am = !am;
                }
                if (hour == 13) {
                    hour = 1;
                }
            }
            out.push('</div>');

            //loop over each day
            $.each(json.data, function (iDate, itemDate) {
                //set up row
                var dateObj = new Date(iDate);
                if (start) {
                    out.push('<div class="iScheduleToday">');
                } else {
                    out.push('<div>');
                }

                //set tracking hours
                var amSuffix = true;
                var hour = 6;
                var time = '';
                var prevItemTime;
                var thisItemTime;
				var nextItem = false;
				var showLength = 4;
				var thisItemStartHour = '';
				var thisItemStartMin = '';

                for (var h = 0; h < 25; h++) 
				{
					for (var min = 0; min < 60; min = min + parseInt(15)) 
					{	
						thisItemTime = null;
						
						//build matching time string
						time = (hour < 10 ? '0' + hour : '' + hour) + (min < 10 ? '0' + min : '' + min) + (amSuffix ? 'A' : 'P') + 'M';	

						//loop over each show and find matching one
						$.each(itemDate, function (iTime, itemTime) {
						fields = iTime.split(':');
						iTimeHours  = fields[0];
						iTimeApproxMin = fields[1];
						fieldsTwo = iTimeApproxMin.split(' ');
						iTimeApproxMin = fieldsTwo[0];
						iTimeSuffix = fieldsTwo[1];
						
						var iTimeExactMin = (Math.round(iTimeApproxMin/15) * 15);
						iTime = iTimeHours  + (iTimeExactMin < 10 ? '0' + iTimeExactMin : iTimeExactMin) + iTimeSuffix;	
								
							//use last good time if one not present
							if (iTime == time) 
							{
								if (nextItem) 
								{
									nextItemStartHour = parseInt(trimNumber(iTimeHours));
									nextItemStartMin = parseInt(iTimeExactMin);
									hourDiff = nextItemStartHour - thisItemStartHour;
									minDiff = ((nextItemStartHour*60) + nextItemStartMin) - ((thisItemStartHour*60) + thisItemStartMin);
									showLength = parseInt(minDiff/15);
									nextItem = false;
									var index = $.inArray('style = "width:auto"',out); 
									out[index] = 'style = "width:'+((showLength*73)-1)+'px"';

								}							
								thisItemTime = itemTime;
								thisItemStartHour =(parseInt(trimNumber(iTimeHours)) == 12 ) ? 0 : parseInt(trimNumber(iTimeHours));
								thisItemStartMin = parseInt(iTimeExactMin);
								nextItem = true;
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
						if(prevItemTime != thisItemTime && h != 24) 
						{

							out.push('<div class="iScheduleShowData' + (h > 13 && h < 18 ? ' iSchedulePrime' : '') + '"');
							out.push('style = "width:auto"');
							out.push('><div class = "showContent" ><div id="iS_' + escape($.trim(thisItemTime.show)).replace(/\%/gi, '') + '">');

							if (thisItemTime.show != 'null') 
							{
								var showLinkArray = [
								'series/burnnotice',
								'series/csi/',
								'series/criminalintent',
								'series/covertaffairs',
								'series/fairlylegal',
								'series/house',
								'series/inplainsight',
								'series/necessaryroughness',
								'series/ncisla',
								'series/ncis',
								'series/psych',
								'sports/wwe',
								'series/royalpains',
								'series/suits',
								'series/svu',
								'series/toughenough',
								'series/whitecollar',
								'movies',
								'series/monk',
								'series/becker',
								'sports/wwe',
								'series/commonlaw',
								'series/politicalanimals'
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
								'^NCIS: LOS ANGELES',
								'^NCIS',
								'^PSYCH',
								'^WWE MONDAY NIGHT RAW',
								'^ROYAL PAINS',
								'^SUITS',
								'^LAW \& ORDER\: SVU',
								'^WWE TOUGH ENOUGH',
								'^WHITE COLLAR',
								'^USA MOVIE',
								'^MONK',
								'^BECKER',
								'^WWE A.M. RAW',
								'^COMMON LAW',
								'^POLITICAL ANIMALS'
								];

								var found = false;
								for (s = 0; s < showSearchArray.length; s++) 
								{
									var re = new RegExp(showSearchArray[s]);
									if (thisItemTime.show.match(re, 'i')) 
									{
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
							out.push('</div></div></div>');
						}
						prevItemTime = thisItemTime;
					}

						hour++;
						if (hour == 12) {
							amSuffix = !amSuffix;
						}
						if (hour == 13) {
							
							hour = 1;
						}					
				}
                //finish row
                out.push('</div>');
                start = false;
            });
            out.push('</div>');
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
            iBox.find('.iScheduleShows #tblData').css({ 'marginLeft': -293 * hours });

            //set up events
            iBox.find('.iScheduleNext').click(function () {
                if (!animated) {
                    animated = true;
                    var left = parseInt(iBox.find('.iScheduleShows #tblData').css('marginLeft'));
                    left -= 293;
                    if (left < -6153) {
                        animated = false;
                    } else {
                        iBox.find('.iScheduleShows #tblData').animate({ 'marginLeft': left }, 300, function () {
                            // Animation complete.
                            animated = false;
                            var left = parseInt(iBox.find('.iScheduleShows #tblData').css('marginLeft'),10);
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
                    var left = parseInt(iBox.find('.iScheduleShows #tblData').css('marginLeft'));
                    left += 293;
                    if (left > 0) {
                        animated = false;
                    } else {
                        iBox.find('.iScheduleShows #tblData').animate({ 'marginLeft': left }, 300, function () {
                            // Animation complete.
                            animated = false;
                            var left = parseInt(iBox.find('.iScheduleShows #tblData').css('marginLeft'),10);
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
	    	
	    	// add the close button
	    	if ($('#usa_globalHeaderSubNav_schedule div.iSchedule .globalHeaderCloseBtn').length == 0)
	    	{
	    		$('#usa_globalHeaderSubNav_schedule div.iSchedule').append('<a href="javascript:void(0);" onclick="usa_hideMenuAll()" class="globalHeaderCloseBtn"><span>Close Menu</span></a>');
	    	}
	    	
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

	//Added for Table to div conversion
	function trimNumber(s) {
	  while (s.substr(0,1) == '0' && s.length>1) { s = s.substr(1,9999); }
	  return s;
	}

})();