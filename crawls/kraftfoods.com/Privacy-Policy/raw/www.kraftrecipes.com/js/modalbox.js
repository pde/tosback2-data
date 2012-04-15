/*
	Based on:
	Slimbox v1.3
	by Christophe Beyls (http://www.digitalia.be) - MIT-style license.
	Inspired by the original Lightbox v2 by Lokesh Dhakar.
*/

var Modalbox = {
	init: function(options){
		this.options = Object.extend({
			resizeDuration: 0,
			resizeTransition: Fx.Transitions.linear,
			initialWidth: 250,
			initialHeight: 250,
			animateCaption: true,
			defaultIframeWidth : 500, 
			defaultIframeHeight: 300,
			initialHeaderHeight: 35,
			initialFooterHeight: 10,
			reloadParent: 0,
			redirectUrl: ""
		}, options || {});

		// IE 6 - XML prolog problem
		if(window.ie6 && document.compatMode=="BackCompat"){
			this.options.animateCaption = false;
		}

		this.anchors = [];
		$each(document.links, function(el){
			if (el.rel && el.rel.test(/^modalbox/i)){
				el.onclick = this.click.pass(el, this);
				this.anchors.push(el);
				if ($defined(el.alink)){
					el.href = el.alink;
				}
			}
		}, this);

		this.eventPosition = this.position.bind(this);

		this.body2 = $('modalBody');
		this.overlay = new Element('div').setProperty('id', 'lbOverlay').injectInside(this.body2);
		this.center = new Element('div').setProperty('id', 'lbCenter').setStyles({width: this.options.initialWidth+'px', height: this.options.initialHeight+'px', marginLeft: '-'+(this.options.initialWidth/2)+'px', display: 'none'}).injectInside(this.body2);
		this.header = new Element('div').setProperty('id', 'mb_header').injectInside(this.center);
		new Element('div').injectInside(this.header);
		this.canvas = new Element('div').setProperty('id', 'lbCanvas').injectInside(this.center);
		this.headerContainer = new Element('div').setProperty('class', 'header_container').injectInside(this.canvas);
		this.xbutton = new Element('a').setProperties({id: 'lbCloseLink', href: '#'}).injectInside(this.headerContainer)
		this.xbutton.onclick = this.overlay.onclick = this.close.bind(this);
		this.caption = new Element('div').setProperty('id', 'lbCaption').injectInside(this.headerContainer);
		this.footer = new Element('div').setProperty('id', 'mb_footer').injectInside(this.center);
		new Element('div').injectInside(this.footer);

		/* Build effects */
		var nextEffect = this.nextEffect.bind(this);
		this.fx = {
			overlay: this.overlay.effect('opacity', {duration: 0}).hide(),
			resizeCenter: this.center.effects({duration: 0, onComplete: nextEffect}),
			image: this.canvas.effect('opacity', {duration: 0, onComplete: nextEffect})
		};
		
		/* Set MoodalBox is Ready */
		moo=1;
		
	},

	click: function(link){
	    if (link.rel.substring(0,10).toLowerCase()  == 'modalbox_x') {
			this.xbutton.onclick = this.overlay.onclick = this.closeX.bind(this);
	    };
		if (link.rel.substring(0,8).toLowerCase()  == 'modalbox') return this.show(link.href, link.title, link.rev, link.redirectUrl);
	},

	show: function(url, title, rev, red){
		return this.open([[url, title, rev, red]], 0);
	},

	open: function(items, itemNumber){
		/* 09-15-09 : No need to hide it for the KF Redesign
		if ($defined($('hdr_search'))){
			$('hdr_search').setStyle('display', 'none');
		}*/
		this.items = items;
		this.position();
		this.setup(true);
		var wh = (window.getHeight() == 0) ? window.getScrollHeight() : window.getHeight();
		var st = this.body2.scrollTop  || document.documentElement.scrollTop;
		this.top = st + 50 + (wh / 15);
		this.center.setStyles({top: this.top+'px', display: ''});
		this.fx.overlay.start(0.3);
		return this.changeItem(itemNumber);
	},

	position: function(){
		//IE6 - XML prolog problem.
		var ww = (window.getWidth() == 0) ? window.getScrollWidth()-22 : window.getWidth();
		var wh = (window.getHeight() == 0) ? window.getScrollHeight() : window.getHeight();
		var st = this.body2.scrollTop  || document.documentElement.scrollTop;
		this.overlay.setStyles({top: st+'px', height: wh+'px', width:ww+'px'});
	},

	setup: function(open){
		var elements = $A(document.getElementsByTagName('object'));
		if (window.ie) elements.extend(document.getElementsByTagName('select'));
		elements.each(function(el){ el.style.visibility = open ? 'hidden' : ''; });
		var fn = open ? 'addEvent' : 'removeEvent';
		//window[fn]('scroll', this.eventPosition)[fn]('resize', this.eventPosition);
		this.step = 0;
	},

	//previous: function(){
	//	return this.changeItem(this.activeItem-1);
	//},

	nextPage: function(ht,wt,cap){
		this.preload.w =  wt;
		this.preload.h =  ht;
		this.p_width = wt;
		this.p_height = ht;
		this.canvas.style.width = this.p_width+'px';
		this.canvas.style.height = eval(this.p_height)+eval(this.options.initialHeaderHeight)+eval(this.options.initialFooterHeight)+'px';
		$(this.iframeId).setProperties({width: this.p_width, height: this.p_height});
		this.caption.setHTML(cap);
	},

	//next: function(){
	//	return this.changeItem(this.activeItem+1);
	//},

	changeItem: function(itemNumber){
		if (this.step || (itemNumber < 0) || (itemNumber >= this.items.length)) return false;
		this.step = 1;
		this.activeItem = itemNumber;

		this.fx.image.hide();
		this.center.className = 'lbLoading';

		// discard previous content by clicking
		this.removeCurrentItem();

		// check item type
		var url = this.items[this.activeItem][0];
		var rev = this.items[this.activeItem][2];
		var transferpage = this.items[this.activeItem][3];

		this.preload = new Object ();	// JavaScript native Object
		this.preload.datatype = 'iframe';

		this.preload.w =  this.matchOrDefault(rev, new RegExp("width=(\\d+)", "i"), this.options.defaultIframeWidth);
		this.preload.h = this.matchOrDefault(rev, new RegExp("height=(\\d+)", "i"), this.options.defaultIframeHeight);
		
		this.options.reloadParent = this.matchOrDefault(rev, new RegExp("reloadParent=(\\d+)", "i"), 0);
		
		if (transferpage!="")
		{
		this.options.redirectUrl = transferpage;
		}
		else
		{
		this.options.redirectUrl = "";
		}
		
		this.preload.src = url;
								
		this.nextEffect(); //asynchronous loading

		return false;
	},

	nextEffect: function(){
		switch (this.step++){
		case 1:

			// create HTML element
			this.p_width = this.preload.w;
			this.p_height = this.preload.h;
			// Safari would not update iframe content that has static id.
			this.iframeId = "lbFrame_"+new Date().getTime();
			new Element('iframe').setProperties({id: this.iframeId, width: this.p_width, height: this.p_height, frameBorder:0, scrolling:'no', src:this.preload.src}).injectInside(this.canvas);
			this.canvas.style.width = this.p_width+'px';
			this.canvas.style.height = eval(this.p_height)+eval(this.options.initialHeaderHeight)+eval(this.options.initialFooterHeight)+'px';

			this.caption.setHTML(this.items[this.activeItem][1] || '');

			if (this.center.clientHeight != this.canvas.offsetHeight){
				var oh = (this.p_height == this.canvas.clientHeight) ? eval(this.canvas.offsetHeight)+eval(this.options.initialHeaderHeight)+eval(this.options.initialFooterHeight) : eval(this.p_height)+17+eval(this.options.initialHeaderHeight)+eval(this.options.initialFooterHeight); // fix for ie (18)
				this.center.setStyles({height: oh+'px'});
				//this.fx.resizeCenter.start({height: oh});
				//break;
			}
			if (this.center.clientWidth != this.canvas.offsetWidth){
				var ow = (this.p_width == this.canvas.clientWidth) ? this.canvas.offsetWidth : eval(this.p_width)+18; // fix for ie (18)
				this.center.setStyles({width: ow+'px', marginLeft: '-'+(ow/2)+'px'});
				//this.fx.resizeCenter.start({width: ow, marginLeft: -ow/2});
				//break;
			}
			
			this.step++;
			this.nextEffect();
			
		case 2:
			/*if (this.center.clientWidth != this.canvas.offsetWidth){
				var ow = (this.p_width == this.canvas.clientWidth) ? this.canvas.offsetWidth : eval(this.p_width)+18; // fix for ie (18)
				this.fx.resizeCenter.start({width: ow, marginLeft: -ow/2});
				break;
			}*/
			this.step++;
			this.nextEffect();
		case 3:
			this.fx.image.start(1);
			this.center.className = '';
			break;
		case 4:
			if (this.options.animateCaption){
				// This is not smooth animation in IE 6 with XML prolog.
				// If your site is XHTML strict with XML prolog, disable this option.
				//[clean]this.fx.bottom.start(0,this.bottom.offsetHeight+10);
				break;
			}
		case 5:
			if (this.activeItem){
			}
			if (this.activeItem != (this.items.length - 1)){
			}
			
			this.step = 0;
		}
	},

	closeX: function(){
		if (this.step < 0) return;
		/* 09-15-09 : No need to hide it for the KF Redesign
		if ($defined($('hdr_search'))){
			$('hdr_search').setStyle('display', 'block');
		} */
		this.step = -1;
		this.removeCurrentItem();	// discard content
		for (var f in this.fx) this.fx[f].stop();
		this.center.style.display = 'none';
		this.fx.overlay.chain(this.setup.pass(false, this)).start(0);
		return false;
	},
	
	close: function(){
		if (this.step < 0) return;
		/* 09-15-09 : No need to hide it for the KF Redesign
		if ($defined($('hdr_search'))){
			$('hdr_search').setStyle('display', 'block');
		} */
		this.step = -1;
		this.removeCurrentItem();	// discard content
		for (var f in this.fx) this.fx[f].stop();
		this.center.style.display = 'none';
		this.fx.overlay.chain(this.setup.pass(false, this)).start(0);
		if (this.options.reloadParent==1){
			window.location.reload(true);
		}

		if (this.options.redirectUrl !="" && $defined(this.options.redirectUrl)){
			alert('close: ' + this.options.redirectUrl);
			window.location.href = this.options.redirectUrl;
		}
		return false;
	},
	
	closeNoReload: function(){
		if (this.step < 0) return;
		/* 09-15-09 : No need to hide it for the KF Redesign
		if ($defined($('hdr_search'))){
			$('hdr_search').setStyle('display', 'block');
		} */
		this.step = -1;
		this.removeCurrentItem();	// discard content
		for (var f in this.fx) this.fx[f].stop();
		this.center.style.display = 'none';
		this.fx.overlay.chain(this.setup.pass(false, this)).start(0);

		if (this.options.redirectUrl !="" && $defined(this.options.redirectUrl)){
			alert('closeNoReload: ' + this.options.redirectUrl);
			window.location.href = this.options.redirectUrl;
		}
		return false;
	},	

	removeCurrentItem: function(){
		if (this.preload){
			$(this.iframeId).remove();
			this.preload = null;
		}
	},

	matchOrDefault: function(str, re, val){
		var hasQuery = str.match(re);
		return hasQuery ? hasQuery[1] : val;
	}

};

window.addEvent('domready', Modalbox.init.bind(Modalbox));

// popup windows via code-behind init code (initPopUp)
window.addEvent('domready', modalInit);
function modalInit() { if(typeof initPopUp == 'function') { initPopUp(); }}