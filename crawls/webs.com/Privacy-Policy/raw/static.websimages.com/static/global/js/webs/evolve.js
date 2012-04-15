function setHeader() { return; /* Used in random places, deprecated, this just keeps things tame */ }

if(typeof webs === 'undefined') webs = {};
window.force_mpq = true;    //Used for mixpanel tracking below.

//attaches multisite hover event to ie6
webs.suckerfishIE = function() {
	var multisite_trigger = document.getElementById('multisite_trigger'),
		multisite_container = document.getElementById('multisite_dropdown_container');
	
	if(multisite_trigger && multisite_container) {
		multisite_trigger.onmouseover = function() { this.className = "multisite_ie6hover"; return false; };
		multisite_container.onmouseout = function() { multisite_trigger.className = ""; return false; };
	}
	return false;
};



/**
 * Forked from ui.js
 * UI Functionality to use with ui.less
 * Requires: jQuery, ui.css
 */
if(typeof jQuery === "function") {
	jQuery(function(){
		// "More" dropdown (used in page options
		var $ = jQuery;
		var $body = $("body");
		var moreCover = $('<div/>').addClass('w-more_cover').appendTo($body);
        var helpButtonClick = function(){
            $("#help_options_anchor").click(function(e){
                var el = $(this),
                    url = el.attr('href'),
                    path = window.location.pathname,
                    host = window.location.host,
                    query = "source=help_button&path=" + path + "&host=" + host;

                if(url === "#"){
                    if(typeof(window.mpq) === 'undefined'){
                        window.mpq = [];
                    }
                    window.mpq.push(['track', 'Help Button Pushed', {"path": path, "host": host}]);
                }
                else{
                    if(url.indexOf("?") >= 0){
                        query = "&" + query;
                    }
                    else{
                        query = "?" + query;
                    }

                    el.attr('href', url+query);
                }

                return true;
            });
        }

        helpButtonClick();
		moreCover.click(function(){
			$('.w-more.active').removeClass('active');
			moreCover.removeClass('active');
		});
		$(document).mousedown(function(e) {
			var $t = $(e.target),
				$p = $t.parents('.w-more.active');

			if(!$p.length) {
				$('.w-more.active').removeClass('active');
				moreCover.removeClass('active');
			}
		});
		$(document).mouseup(function(e) {
			var $n = $("menu.left_tools.active"),
				$c = $n.find('.iD-input-container.active');

			$c.each(function(i, o){
				var $o = $(o);
				if(!$.contains(o, e.target)){
					$o.removeClass("active");
				}
			});


		});
		$('.w-more_link').live('click', function(){
			$(this).parent().toggleClass('active');
			moreCover.toggleClass('active');
			return false;
		});
	});
}


// We now search for jQuery's document.ready availability, as it conflicts with the old loadEvent in high use situations.
webs.loadEvent = function(func) {
	if(typeof jQuery != "undefined") jQuery(document).ready(function() { func(); });
	else webs.fallback_loadEvent(function() { func(); });
};

webs.fallback_loadEvent = (function() {
	var load_events = [], load_timer, script, done, exec, old_onload,
	init = function() {
		done = true;
		clearInterval(load_timer);
		for(i = 0; i < load_events.length; i++) {
			exec = load_events.shift(); 
			exec();
		}
		if(script) script.onreadystatechange = '';
	};
	return function(func) {
		if(done) return func();
		if(!load_events[0]) {
			if(document.addEventListener) document.addEventListener("DOMContentLoaded", init, false);
		
			/*@cc_on @*/ /*@if (@_win32) // Fairly obvious who this is for...
			    document.write("<script id=__ie_onload defer src=//0><\/scr"+"ipt>");
				script = document.getElementById("__ie_onload");
				script.onreadystatechange = function() {
				    if (this.readyState == "complete") init(); // call the onload handler
				};
			/*@end @*/
	
			if(/WebKit/i.test(navigator.userAgent)) {
			    load_timer = setInterval(function() {
				    if (/loaded|complete/.test(document.readyState)) init(); 
				}, 10);
			}
	
			old_onload = window.onload;
			window.onload = function() {
				init();
				if (old_onload) old_onload();
			};
		}
		load_events.push(func);
	}
})();

webs.appendInputTypeClasses = function() { /* Used in Domains and a few other places - need to deprecate eventually, leave it here for now -- Ryan */
	var inputs = document.getElementsByTagName('input');
	for(i = 0; i < inputs.length; i++) {
		if(inputs[1].getAttribute('type')) inputs[i].className = inputs[i].getAttribute('type');
	}
};

webs.staticServer = 'http://static.websimages.com'; /* This is reset in real time when the page loads */

webs.addEvent = function(element, evt, fn, bubble) {
	if(document.addEventListener) element.addEventListener(evt, fn, bubble);
	else element.attachEvent("on" + evt, fn);
};

webs.removeEvent = function(element, evt, fn, bubble) {
	if(document.removeEventListener) element.removeEventListener(evt, fn, bubble);
	else element.detachEvent("on" + evt, fn);
};
	
webs.loadScript = function(paramsObj) {
	var newScript = document.createElement("script");
	newScript.type = "text/javascript";
	newScript.src = paramsObj.src;
	
	if(typeof paramsObj.callback === "function") {
		if(newScript.readyState) {
			newScript.onreadystatechange = function() {
				if(newScript.readyState === "loaded" || newScript.readyState === "complete") {
					newScript.onreadystatechange = null;
					paramsObj.callback();
				}
			}
		} else {
			newScript.addEventListener("load", paramsObj.callback, false);
		}
	} else if(typeof paramsObj.callback === "string") {
		newScript.src = newScript.src + (paramsObj.src.indexOf("?") > -1 ? "&" : "?") + "callback=" + paramsObj.callback;			
	}

	document.documentElement.firstChild.appendChild(newScript);
};

/*
Author: @Dominick
Creates an instance to handle dropdown dates. Must at least pass in an object with an object called "id"
that contains the container ID to append the Month, Day, and Year dropdowns to.
function call requires at least
    new dateHandle({
        id: {
            month: 'monthID',
            day: 'dayID',
            year: 'yearID'
        },
        --extras--
        name: {month: 'string', day: 'string', year: 'string'},
        defaultDate: {month: '1', day: '5', year: '1986'},
        range: [1910,2010] or 'birthdate'
    });
 */
webs.dateHandle = function(paramsObj) {
	var that = this;

	/* requires at least an ID in paramsObj with valid month, day, year */
	if (typeof paramsObj === 'undefined' || typeof paramsObj.id === 'undefined' ||
		typeof paramsObj.id.month === 'undefined' || document.getElementById(paramsObj.id.month) == null ||
		typeof paramsObj.id.day === 'undefined' || document.getElementById(paramsObj.id.day) == null ||
		typeof paramsObj.id.year === 'undefined' || document.getElementById(paramsObj.id.year) == null) {
		return false;
	}
	
	/* giving this instance an ID */
	this.id = (typeof paramsObj.instanceID !== 'undefined' ? paramsObj.instanceID : "fw-date-"+ parseInt(Math.random()*10000));
	
	var dom = {
		month: document.getElementById(paramsObj.id.month),
		day: document.getElementById(paramsObj.id.day),
		year: document.getElementById(paramsObj.id.year)
	};
	var name = {
		month: typeof paramsObj.name !== 'undefined' && typeof paramsObj.name.month !== 'undefined' ? paramsObj.name.month : this.id + "-month",
		day: typeof paramsObj.name !== 'undefined' && typeof paramsObj.name.day !== 'undefined' ? paramsObj.name.day : this.id + "-day",
		year: typeof paramsObj.name !== 'undefined' && typeof paramsObj.name.year !== 'undefined' ? paramsObj.name.year : this.id + "-year"
	};
	
	var currDate = new Date();
	var currYear = currDate.getFullYear();
	var defaultDate = {
		month: typeof paramsObj.defaultDate !== 'undefined' && typeof paramsObj.defaultDate.month !== 'undefined' ? paramsObj.defaultDate.month : "",
		day: typeof paramsObj.defaultDate !== 'undefined' && typeof paramsObj.defaultDate.day !== 'undefined' ? paramsObj.defaultDate.day : 1,
		year: typeof paramsObj.defaultDate !== 'undefined' && typeof paramsObj.defaultDate.year !== 'undefined' ? paramsObj.defaultDate.year : ""
	};
	
	var month=parseInt(defaultDate.month),day=parseInt(defaultDate.day),year=parseInt(defaultDate.year);
	
	/*----Determine year range----*/
	var range = [];
	range['start'] = currYear-100;
	range['end'] = currYear;
	if (typeof paramsObj.range !== 'undefined'){
		if(typeof paramsObj.range === 'object'){
			/* if range array is set */
			range[0] = typeof paramsObj.range[0] !== 'undefined' ? paramsObj.range[0] : currYear-100;
			range[1] = typeof paramsObj.range[1] !== 'undefined' ? paramsObj.range[1] : currYear;
		} else if(typeof paramsObj.range === 'string') {
			/* if range is a type */
			if(paramsObj.range === 'birthdate'){
				range[0] = currYear - 80;
				range[1] = currYear -13;
			}
		}
	}
	
	var monthStr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	/*----Generate Date----*/
	var domSelectMonth = document.createElement('select');
		domSelectMonth.setAttribute('name',name.month);
		dom.month.appendChild(domSelectMonth);
	var domSelectDay = document.createElement('select');
		domSelectDay.setAttribute('name',name.day);
		dom.day.appendChild(domSelectDay);
	var domSelectYear = document.createElement('select');
		domSelectYear.setAttribute('name',name.year);
		dom.year.appendChild(domSelectYear);
	
	var domOption,i;
	/*----Generate Months----*/
	for (i=-1; i<12; i++) {
		domOption = document.createElement('option');
		domOption.value = i===-1 ? "":i;
		domOption.innerHTML = i===-1 ? "Month" : monthStr[i];
		if(i === month) domOption.setAttribute('selected','true');
		domSelectMonth.appendChild(domOption);
	}
	/*----Generate Days----*/
	var domDate = [];
	for (i=0; i<32; i++) {
		domDate[i] = document.createElement('option');
		domDate[i].value = i===0 ? "":i;
		domDate[i].innerHTML = i===0 ? "Day" : i;
		if(i === day) domDate[i].setAttribute('selected','true');
		domSelectDay.appendChild(domDate[i]);
	}
	/*----Generate Years----*/
	for (i=range[0]-1; i<range[1]+1; i++) {
		domOption = document.createElement('option');
		domOption.value = i=== range[1]-1? "":i;
		domOption.innerHTML = i===range[0]-1 ? "Year" : i;
		if(i === year) domOption.setAttribute('selected','true');
		domSelectYear.appendChild(domOption);
	}
	
	/*----event handlers for month, day, year----*/
	domSelectMonth.onchange = function(){
		var selectedIndex = this.selectedIndex;
		month = this.options[selectedIndex].value;
		that.fixDayDisplay();
	};
	domSelectDay.onchange = function(){
		var selectedIndex = this.selectedIndex;
		day = this.options[selectedIndex].value;
	};
	domSelectYear.onchange = function(){
		var selectedIndex = this.selectedIndex;
		year = this.options[selectedIndex].value;
		that.fixDayDisplay();
	};
	
	/*----Date Fix when user change month/year ----*/
	this.fixDayDisplay = function(){
		var monthFix = parseInt(month)+1;
		isLeapYear = this.isLeapYear();
		
		if(monthFix != "" && day != "" && year != "" && year != -1) {
			/* add all nodes back if it isn't already there */
			if(domSelectDay.children[29] !== domDate[29]) domSelectDay.appendChild(domDate[29]);
			if(domSelectDay.children[30] !== domDate[30]) domSelectDay.appendChild(domDate[30]);
			if(domSelectDay.children[31] !== domDate[31]) domSelectDay.appendChild(domDate[31]);
			
			if(monthFix == 2) {
				/* move node only if it already exists*/
				domSelectDay.removeChild(domDate[31]);
				domSelectDay.removeChild(domDate[30]);
				if(!isLeapYear) domSelectDay.removeChild(domDate[29]);
			} else if(monthFix == (04 || 06 || 09 || 11)) {
				domSelectDay.removeChild(domDate[31]);
			}
			return true;
		} else {
			/* something just went wrong, user selected invalid date */
		}
	};
	this.isLeapYear = function() {
		if(year != ""){
		if (year%100 == 0 && year%400) return false;
		if (year%4 == 0) return true;
		}
    return false;
	};
	this.getMonth = function() { return month; };
	this.getDay = function() { return day; };
	this.getYear = function() { return year; };
	
	/* fix default */
	this.fixDayDisplay();
};

var multisite_dropdown = {
	dropdown: "",
	droplist: "",

	open: function() {
		multisite_dropdown.droplist.style.display = "block";
		webs.removeEvent(multisite_dropdown.dropdown, "click", multisite_dropdown.open, false);
		webs.addEvent(document.body, "mouseup", multisite_dropdown.close, false);
	},

	close: function() {
		multisite_dropdown.droplist.style.display = "none";
		webs.removeEvent(document.body, "mouseup", multisite_dropdown.close, false);
		setTimeout(function() { webs.addEvent(multisite_dropdown.dropdown, "click", multisite_dropdown.open, false); }, "500");
	}
}

webs.loadEvent(function() { 
	/* Stuff for the multi-site dropdown - shouldn't be a huge performance hit anywhere else since it's checking by ID first */	
	if(document.getElementById("multisite_dropdown") != null) {
		multisite_dropdown.droplist = document.getElementById("multisite_dropdown_choices");
		multisite_dropdown.dropdown = document.getElementById("multisite_dropdown");
		webs.addEvent(multisite_dropdown.dropdown, "click", multisite_dropdown.open, false);
	}
});