	// ADD ON INIT
	var add_on_present = false;

	// MT1.11 Compat
	var $E = function(selector, filter){
		return ($(filter) || document).getElement(selector);
	};
	
	var $ES = function(selector, filter){
		return ($(filter) || document).getElements(selector);
	};
	
	obfusc = function(user) {
		var user = {
			'dnawer' : ['Andrew Lyon', 'drew', 'an'], 
			'ejff' : ['Jeff Lyon', 'ff', 'je'],
			'fnoi' : ['Email us', 'fo', 'in'] 
		};

		var names = $$('.obfusc');
		if(names.length > 0) names.each(function(h) {
			var usr = h.id.replace(/h_/, '');
			var spn = $E('span', h);
			var name = spn.innerHTML;

			var str = '';
			atSymbol = '@';
			str += '<a title="'+ user[usr][0] +'" hr' + 'ef = "mail' + 'to:';
			str += user[usr][2] + user[usr][1];
			str += atSymbol;
			str += 'lyonbros.com">';
			str += name;
			str += '</a>';
			spn.setHTML(str);
		});
	}
	
	initTips = function(tips, timeout) {
		if(!timeout) timeout = 0;
		if(tips.length == 0) return false;
		
		if(tips.length > 0) tips.each(function(el) {
			if(!$(el.id + '_c')) return;
			var cont = $(el.id + '_c');
			var innit = true;
			
			el.addEvent('mouseover', function(e) {
				var e = new Event(e);
				innit = true;
				doit = function() {
					if(!innit) return;

					cont.setStyles({
						display: 'block',
						visibility: 'hidden'
					});

					var elc = el.getCoordinates();
					var contc = cont.getCoordinates();
					var bodyc = {};
					bodyc.top = f_scrollTop();
					bodyc.bottom = f_scrollTop() + f_clientHeight();
					bodyc.left = f_scrollLeft();
					bodyc.right = f_scrollLeft() + f_clientWidth();
					bodyc.width = f_clientWidth();
					bodyc.height = f_clientHeight();
					
					var mid = elc.left + (elc.width / 2);
					var top = parseInt(elc.top - (contc.height));
					
					if(top < bodyc.top) {
						top = bodyc.top - 10;
					}
					
					if(mid >= (bodyc.width / 2)) {
						left = elc.left - contc.width;
					} else {
						left = elc.right;
					}
					
					if (left < 0)
					{
						 left = elc.left;
						 top = elc.bottom;
					}
					
					cont.setStyles({
						left: left,
						top: top,
						visibility: 'visible'
					});
				}
				setTimeout('doit();', timeout);
			}); 
			
			el.addEvent('mouseout', function(e) {
				innit = false;
				cont.setStyle('display', 'none');
			});
		});
	}
	

	ff_check = function() {
		if(navigator.userAgent.match(/Firefox/)) {
			return true;
		}
		return false;
	}
	
	function f_clientWidth() {
		return f_filterResults (
			window.innerWidth ? window.innerWidth : 0,
			document.documentElement ? document.documentElement.clientWidth : 0,
			document.body ? document.body.clientWidth : 0
		);
	}
	function f_clientHeight() {
		return f_filterResults (
			window.innerHeight ? window.innerHeight : 0,
			document.documentElement ? document.documentElement.clientHeight : 0,
			document.body ? document.body.clientHeight : 0
		);
	}
	function f_scrollLeft() {
		return f_filterResults (
			window.pageXOffset ? window.pageXOffset : 0,
			document.documentElement ? document.documentElement.scrollLeft : 0,
			document.body ? document.body.scrollLeft : 0
		);
	}
	function f_scrollTop() {
		return f_filterResults (
			window.pageYOffset ? window.pageYOffset : 0,
			document.documentElement ? document.documentElement.scrollTop : 0,
			document.body ? document.body.scrollTop : 0
		);
	}
	function f_filterResults(n_win, n_docel, n_body) {
		var n_result = n_win ? n_win : 0;
		if (n_docel && (!n_result || (n_result > n_docel)))
			n_result = n_docel;
		return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
	}
	
	function trigger_addon_event(name, param)
	{
		var bod = document.getElementsByTagName('body')[0];
		
		if (ff_check())
		{
			bod.setAttribute(name, param);
			var ev = document.createEvent("Events");
			ev.initEvent("PrivacyChoiceEvent", true, false);
			bod.dispatchEvent(ev);
		}
		else
		{
			if (!$('privacychoiceEventFrame'))
			{
				var iframe = $(document.createElement('iframe'));
				iframe.setAttribute("id", 'privacychoiceEventFrame');
				iframe.setAttribute("width", '0');
				iframe.setAttribute("height", '0');
				iframe.setAttribute("style", 'position: absolute; bottom: 0px; right: 0px; width: 0px; height: 0px; display: none;');
				iframe.setAttribute("src", '/privacychoiceEventFrame/'+name+'/'+param);
				bod.appendChild(iframe);
			}
			else
			{
				$('privacychoiceEventFrame').src = '/privacychoiceEventFrame/'+name+'/'+param;
			}
		}
	}

Fx.Scroll = new Class({

	Extends: Fx,

	options: {
		offset: {'x': 0, 'y': 0},
		wheelStops: true
	},

	initialize: function(element, options){
		this.element = this.subject = $(element);
		this.parent(options);
		var cancel = this.cancel.bind(this, false);

		if ($type(this.element) != 'element') this.element = $(this.element.getDocument().body);

		var stopper = this.element;

		if (this.options.wheelStops){
			this.addEvent('start', function(){
				stopper.addEvent('mousewheel', cancel);
			}, true);
			this.addEvent('complete', function(){
				stopper.removeEvent('mousewheel', cancel);
			}, true);
		}
	},

	set: function(){
		var now = Array.flatten(arguments);
		this.element.scrollTo(now[0], now[1]);
	},

	compute: function(from, to, delta){
		var now = [];
		var x = 2;
		x.times(function(i){
			now.push(Fx.compute(from[i], to[i], delta));
		});
		return now;
	},

	start: function(x, y){ if (!this.check(arguments.callee, x, y)) return this; var offsetSize = this.element.getSize(), scrollSize = this.element.getScrollSize(); var scroll = this.element.getScroll(), values = { x: x, y: y }; for (var z in values) {
	
	var max = scrollSize[z] - offsetSize[z];
	// scrolling left had -ve value in values[x] - .limit set these to zero.
	if ($chk(values[z])) values[z] = ($type(values[z]) == 'number') ? values[z] : max;
	else values[z] = scroll[z];
	if (Browser.Engine.trident){
	  // add to scroll[z] as this is a scroll relative to this.element
	  values[z] = (values[z] + this.options.offset[z] + scroll[z]).limit(0, max)
	}else{
	  values[z] = (values[z] + this.options.offset[z]).limit(0, max)
	}
	
	} return this.parent([scroll.x, scroll.y], [values.x, values.y]); },

	toTop: function(){
		return this.start(false, 0);
	},

	toLeft: function(){
		return this.start(0, false);
	},

	toRight: function(){
		return this.start('right', false);
	},

	toBottom: function(){
		return this.start(false, 'bottom');
	},

	toElement: function(el){
		var position = $(el).getPosition(this.element);
		return this.start(position.x, position.y);
	}

});
	