var img_cookie = Class.create({
	global_var : { content_width: 980, view_port_thres: 998 },
	createCookie : function(name,value,days) {
		if (name == 'img_welcome_lbx') {
			var _checkforCook = this.readCookie('img_welcome_lbx'); 
			if (_checkforCook != null) {
			/*	var _kdate = new Date();
				_kdate.setTime(_kdate.getTime()+(-1*24*60*60*1000));
				window.console.log(_kdate.toUTCString());
				window.console.log(_checkforCook + ' <- THis is the current value');
				var _killcur = "; expires="+_kdate.toUTCString();*/
				document.cookie = name +"=" + value + '; expires=' + '; path=/';
				value = _checkforCook + '|' + value;
			}
		}
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toUTCString();
		}
		else {
			var expires = "";
		}
		//window.console.log(value);
		document.cookie = name+"="+value+expires+"; path=/";
	},
	readCookie : function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	eraseCookie : function(name) {
		this.createCookie(name,"",-1);
	},
	getVersion : function(req) {
		var cook = this.readCookie('img_welcome_lbx');	
		if (cook == 'true' || cook == null) {
			this.eraseCookie('img_welcome_lbx');
			return false;
		}
		return cook.indexOf(req) > -1;
		
	},
	create_div : function create_div(type, id, c) {
			var new_div = document.createElement(type);
			Element.extend(new_div);
			if (id != '') new_div.writeAttribute('id', id);
			if (c != '') new_div.writeAttribute('class', c);
			return new_div;
	},
	get_content_center: function(cw, xtra_txt) {
		
		var 
			content_left = this.get_content_left(''),
			content_center = content_left + ((this.global_var.content_width-cw) / 2)
		;
		return (xtra_txt != '') ? content_center.toString() + xtra_txt : content_center;
		
	},
	get_content_left : function(xtra_txt) {
		var content_left = ((document.viewport.getWidth() - this.global_var.content_width) / 2);
		return (xtra_txt != '') ? content_left.toString() + xtra_txt : content_left;
	}
});

var img_attr_icon = {
    local : { img_float : 0, img_duration : 1},
    init : function(img_cookobj) {
    	img_cookobj.createCookie('img_attraction_icon','at:01;',.25);
    	var cls_btn, 
  			attraction = img_cookobj.create_div('div', 'img_attraction', '')
  		;
		
		$('dtv_topnav_sections_nav').appendChild(attraction);
		
		cls_btn = img_cookobj.create_div('div', '', 'close-btn');
		attraction.appendChild(cls_btn);
		setTimeout(img_attr_icon.keepfloating, 1000);
		
		Event.observe(cls_btn, 'click', img_attr_icon.close_attr);
    },
	keepfloating : function() {			
		var distance = 8;
		
		if (img_attr_icon.local.img_float != 0 
			&& !img_attr_icon.isEven(img_attr_icon.img_float))
			img_attr_icon.local.img_duration++;
		
		var direction =	(img_attr_icon.isEven(img_attr_icon.local.img_float)) ? distance+img_attr_icon.local.img_float : -distance;
		if (++img_attr_icon.local.img_float < 5)
			new Effect.Move('img_attraction', {
				x: 0, 
				y: direction, 
				mode: 'relative', 
				duration:  img_attr_icon.local.img_duration/10, 
				afterFinish: img_attr_icon.keepfloating
			});
		else
			setTimeout(img_attr_icon.close_attr, 5000);
	},
	isEven : function(n){
			n = parseFloat(n);
	  	return n % 2 == 0;
	},
	close_attr : function(){
		//cls_btn.stopObserving('click');
		$('img_attraction').fade();	
	}
};

var dmg_jsonpmify = {
	scripts : [],
	detect_json : function() {
		var _pass_this = this;
		$$('.dmg-jsonp').each(function(el, i){
			var q_need =el.readAttribute('class')
				, q_index = q_need.indexOf('dmg-category-');

			if (q_index === -1)
				return;

			q_need = q_need.substring(q_index, q_need.length);
			q_need = q_need.split(' ')[0];
			q_need = q_need.replace('dmg-category-', '');

			var q_need_eval = q_need.split('-')
				, maxResults = 3;

			q_need_eval = parseInt( q_need_eval[q_need_eval.length-1] );

			if ( !isNaN( q_need_eval ) ) 
				maxResults = q_need_eval;
			 else 
				if (q_need.substring(q_need.length, q_need.length-1) != '-')
					q_need+= '-';

			var build_q_need = q_need.split('-');
			q_need = '';

			for (var x = 0; x < build_q_need.length-1; x++) 
				q_need+= build_q_need[x] + ( ( ( build_q_need.length-2 ) === x ) ? '' : '-');

			var _script = document.createElement('script');

			_script.type = 'text/javascript';
			_script.src = 'http://news.directv.com/feed/json/?category_name=' 
				+ q_need + '&jsonp=dmg_jsonpmify.callbacks_' 
				+ i + '.func&maxResults=' + maxResults;

	 		_pass_this['callbacks_' + i] = {
	 			func : function(obj) {
					dmg_jsonpmify.dmg_padding(obj, el);
				}	
			};
			_pass_this.scripts.push(_script);

		});
		
		for (var x = 0;x < _pass_this.scripts.length;x++)
			document.getElementsByTagName("head")[0].appendChild(_pass_this.scripts[x]);

	},
	dmg_padding : function(obj, el) {
		if (typeof obj['posts'] === 'undefined') {
			//kill module
			return;
		}
		var is_border_only = (typeof el.down('.border-only') !== 'undefined')
			, el = el.down('ul')
			, posts = obj['posts'];
		
	//	el.insert('<div class="content json-c-div"></div>');
	//	el = el.down('.json-c-div');

		for (var i = 0;i < posts.length;i++) {
			/*el.insert('<li class="colspan-3"><b class="head"><b></b></b><div class="body"><div class="content"><div class="title"><div class="tup"><h4>' + posts[i].title + '</h4></div></div>');
			el.insert('<div class="body-copy"><div class="tup">' + posts[i].excerpt + '</div></div>');
			el.insert('<div class="link"><div class="tup"><a href="' + posts[i].permalink + '">Read more <span class="arrow"></span></a></div></div></div></div></li>');*/


			el.insert('<li class="colspan-3 none">'
				+ '<b class="head"><b></b></b>'
				+ '<div class="skin" style="">'
				+ '<div class="inner-skin">'
				+ '<div class="body">'
				+ '<div class="content" style="height: auto; padding-bottom: 0px; ">'
				+ '<div class="title ">'
				+ '<div class="tup"><h3>' + posts[i].title + '</h3></div></div>'
				+ '<div class="body-copy">'
				+ '<div class="tup">'
				+ posts[i].excerpt
				+ '</div>'
				+ '</div>'
				+ '<div class="link">'
				+ '<div class="tup">'
				+ '<a href="' + posts[i].permalink + '" target="_self">Read more<span class="arrow"></span></a>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<b class="foot"><b></b></b>'
				+ '</li>'
			);

		}
		el.down('li:first-child').addClassName('first-row');
	}
};

(function(){
	var img_cookobj = new img_cookie(),
		new_cooks = img_cookobj.readCookie('img_instrd')
	;
	
	if (new_cooks != null) {
		img_cookobj.eraseCookie('img_instrd');
		window.location = new_cooks;
	}
	
	//Event.observe(window, 'load', function() {
	document.observe("dom:loaded", function() {

		dmg_jsonpmify.detect_json();
		
	});
	
})();
(function($){
	$(document).ready(function(){
			try {
			var _window_location = window.location.pathname.substring(1)
				, current_tab_selector = $('.dmg-filter .ep-radio-toggle a[href*="' + _window_location + '"]');

			if (current_tab_selector.length > 1)
				current_tab_selector = $('.dmg-filter .ep-radio-toggle a.first');

			current_tab_selector.addClass('active');

			var class_switch = current_tab_selector.attr('href')
				, filter_qstring = null
				, is_movie_text = ( $('#ctl_tup').hasClass('movies_lp') ) ? 'Movies' : 'TV Shows'
				, display_dd = 'Browse All ' + is_movie_text + ' <br />';

			if (class_switch.indexOf('-online') > -1) {
				add_query_string('&isstreaming=true');
				display_dd+= 'to Watch Online';
			}
			else if (class_switch.indexOf('-on-tv') > -1) {
				add_query_string('&islinear=true');
				display_dd+= 'to Watch on TV';
			}
			else if (class_switch.indexOf('-on-demand') > -1) {
				add_query_string('&isnonlinear=true');
				display_dd+= 'On Demand';
			}

			$('.dmg-filter .dd-title span').html(display_dd);
			$('.dmg-filter .dmg-browse-all-dropdown').show();

			/*shows the big poster under all ep pages*/
			$('.poster-resize').each(function(i){
				var el = $(this);
				el.addClass('show');
			});
		}
		catch(err) {}
		
	});
	function add_query_string(q_string_addition) {
		var selector = $('.dmg-filter .dmg-browse-all-dropdown ul li a');
		
		selector.each(function(i){
			var el = $(this)
				, href = el.attr('href')
				, question_add = '';

			if (href.indexOf('?') == -1 ) 
				question_add = '?';

			el.attr('href', href + question_add + q_string_addition);

		});

	}
})(jQuery);