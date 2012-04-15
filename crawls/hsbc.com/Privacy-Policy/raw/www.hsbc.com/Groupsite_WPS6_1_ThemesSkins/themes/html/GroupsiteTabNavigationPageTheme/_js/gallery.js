HW.Gallery = {
	getSwf:function(n) {
		if(document[n]) {
			return document[n];
		}
		if(HW.isIE) {
			if (document.embeds && document.embeds[n]) {
				return document.embeds[n]; 
			}
		}
		return document.getElementById(n);
	}
}


/*****************************************************************************************************
WINDOW OBJECT
*/
HW.Gallery.Window = function(cls,mask) {
	this.cls = cls;
	this.load(mask);
}
HW.Gallery.Window.prototype = {
	mask:null,
	/**
		load a lightbox window
	**/
	load:function(mask) {
		// if the mask and window have not been created then create them
		if(mask) {
			this.makeMask();
		}
		if(!this.window) {
			this.makeWindow();
		}
		// empty the window and display it
		this.open();
		this.content.empty();
		return this;
	},
	/**
		display the lightbox window
	**/
	open:function() {
		if(this.mask) {this.mask.show();}
		this.window.show();
		this.center();
		if(this.iframe) {this.iframe.show();}
	},
	/**
		hide the lightbox window
	**/
	close:function() {
		if(this.mask) {this.mask.hide();}
		this.window.hide();
		if(this.iframe) {this.iframe.hide();}
		this.remove();
	},
	/**
		remove the window from the DOM
	**/
	remove:function() {
		if(this.mask && this.mask.parentNode) {this.mask.parentNode.removeChild(this.mask);}
		if(this.window && this.window.parentNode) {this.window.parentNode.removeChild(this.window);}
		if(this.iframe && this.iframe.parentNode) {this.iframe.parentNode.removeChild(this.iframe);}
		_$$('div.gallery_tooltip').each(function(tt){tt.parentNode.removeChild(tt);});
	},
	/**
		get the full height of the document
	**/
	docHeight:function() {
		var winHeight = Math.max(document.body.scrollHeight,document.documentElement.offsetHeight);
		if(window.innerHeight) {winHeight = Math.max(winHeight,window.innerHeight)}
		return winHeight;
	},
	/**
		get the visible height of the window
	**/
	winHeight:function() {
		var h = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
		return h;
	},
	/**
		create a masking element
	**/
	makeMask:function() {
		this.mask = HW.createNode('div',document.body).addClass('gallery_mask').setStyle({height:this.docHeight()+'px'}).hide();
		
		// for ie we need to create an iframe to mask <select> objects
		if(HW.isIE) {
			this.iframe = HW.createNode('iframe',document.body).addClass('gallery_mask').setStyle({height:this.docHeight()+'px'}).hide().setFade(0);
			this.iframe.frameBorder = 'none';
		}
	},
	/**
		create the html for the window
	**/
	makeWindow:function() {
		var obj = this;
		// wrapper
		this.window = HW.createNode('div',document.body).addClass(this.cls).hide();
		// close button
		this.window.createNode('div').addClass(this.cls+'_close').createNode('a','',{href:'#'}).bind('click',function(){obj.close();},false);
		// top of window
		this.content = this.window.createNode('div').addClass(this.cls+'_top').createNode('div').addClass(this.cls+'_content');
		// bottom of window, separate from top to allow window to expand vertically as required
		this.window.createNode('div').addClass(this.cls+'_bottom');
	},
	/**
		center the window on the screen
	**/
	center:function() {
		var scr = window.scrollY||document.body.scrollTop||document.body.parentNode.scrollTop;
		var top = (this.winHeight() - this.window.offsetHeight)/2;
		this.window.setStyle({top:Math.max(top+scr,0)+'px'});
		
		if(this.mask) {
			if(this.mask.offsetWidth < 1000) {
				this.mask.setStyle({width:'1000px'});
			}
		}
	}
}


/*****************************************************************************************************
IMAGE GALLERY
*/
HW.Gallery.Images = {
	currentImage:null,
	/**
		get all links which point to the image gallery and bind behaviour to them
	**/
	init:function(xml,imagePath) {
		var obj = this;
		_$$('a.imageGalleryLoader').each(function(a){a.bind('click',function(){obj.load();},false);});
		
		var reg = new RegExp("(^|\\w*)imageLoader(\\d+)($|\\w*)");
		_$$('a.imageLoader').each(function(a){
			var n = reg.exec(a.className);
			if(n&&n[2]) {
				a.bind('click',function(){obj.load(n[2]);},false);
			}
		});
		
		new HW.Ajax(xml,function(r){obj.respond(r,imagePath);});
	},
	/**
		handle response from AJAX request for image list xml
		@response	- AJAX.Response object
	**/
	respond:function(response,imagePath) {
		var obj = this;
		this.images = [];
		var imgs = response.xml.getElementsByTagName('image');
		for(var i=0,j=imgs.length;i<j;i++) {
			var imgObj = new HW.Gallery.Images.Image(imgs[i],imagePath);
			this.images.push(imgObj);
		}
		this.loaded = true;
	},
	/**
		load gallery
	**/
	load:function(n) {
		var obj = this;
		if(!this.loaded) {
			setTimeout(function(){obj.load();},100);
			return;
		}
		if(this.window) {
			this.window.close();
		}
		this.window =  new HW.Gallery.Window('gallery_window_2',true);
		if(n) {
			for(var i=0,j=this.images.length;i<j;i++) {
				if(this.images[i].id == n) {
					this.FullView.load(this.images[i]);
					return;
				}
			}
		}
		this.ThumbnailView.load();
	}
}

/*****************************************************************************************************
THUMBNAIL VIEW
*/
HW.Gallery.Images.ThumbnailView = {
	defaultScale:0.4366,
	loadedCount:0,
	minWidth:104,
	margins:[5,10],
	/**
		load thumbnail view
	**/
	load:function() {
		var obj = this;
		this.content = HW.Gallery.Images.window.content;
		this.content.empty();
		
		// create the HTML structure for thumbnail gallery
		this.header = this.content.createNode('div').addClass('gallery_header');
		this.header.createNode('h2','Image Gallery');
		
		var wrapper = this.content.createNode('div').addClass('gallery_thumbs').setStyle({
			height:this.content.offsetHeight-this.header.offsetHeight+'px'
		})
		this.wrapper = wrapper.createNode('div').addClass('gallery_thumbs_inner').createNode('div').addClass('gallery_thumbs_inner2');
		this.content.addClass('loading');
		
		// create slider element for resizing
		var input = this.header.createNode('input','',{type:'text',value:this.defaultScale});
		var slider = new HW.UI.Slider(input,{size:213,title:'Drag to resize thumbnail images'});
		slider.onmove = function(){obj.resize(this.value);}
		new HW.Gallery.ToolTip(slider.handle,null,'gallery_tooltip');
		
		// center the window
		HW.Gallery.Images.window.center();
		
		// load thumbnail images into window
		this.loadThumbnails();
	},
	/**
		load thumbnail images into the window
	**/
	loadThumbnails:function() {
		var obj = this;
		this.loadedCount = 0;
		HW.Gallery.Images.images.each(function(img) {
			img.loadThumbnail();
		});
	},
	/**
		track how many thumbnails have loaded so we can run code once all are loaded
	**/
	count:function() {
		this.loadedCount++;
		if(this.loadedCount == HW.Gallery.Images.images.length) {
			this.content.removeClass('loading');
			this.resize();
		}
	},
	/**
		resize images in response to slider movement or on initial load
		@v		- value of image resizer slider in range [0,1]
	**/
	resize:function(val) {
		var obj = this;
		// if val is undefined then use default
		val = typeof val == 'undefined'?this.defaultScale:val;
		this.defaultScale = val;
		// apply weighting to val so that the number of thumbnails per line scales appropriately
		val = val*val;
		
		// resize the images
		HW.Gallery.Images.images.each(function(o) {
			o.resizeThumbnail(val);
		});
		// calculate margin size
		var m = Math.ceil(this.margins[0] + val*(this.margins[1]-this.margins[0]));
		this.wrapper.setStyle({width:710+m+'px'});
	}
}



/*****************************************************************************************************

FULL VIEW
	
**/
HW.Gallery.Images.FullView = {
	current:null,
	/**
		load full image view
		@img		- Image object to load
		@isOpen		- Boolean, if full view is already open
	**/
	load:function(img,isOpen) {
		var obj = this;
		// don't do anything if new image is same as current and full view is open
		if(img == this.current && isOpen) {
			return;
		}
		this.current = img;
		this.content = HW.Gallery.Images.window.content;
		if(!isOpen) {
			this.content.addClass('loading_full');
		}
		
		// if no mask has been generated then generate it
		if(!this.mask) {
			this.mask = this.content.createNode('div').addClass('gallery_fullview_mask');
		}
		// if no image holder has been generated then generate it
		if(!this.fullview) {
			this.fullview = this.content.createNode('div').addClass('gallery_fullview').setStyle({height:this.content.offsetHeight+'px',overflow:'hidden'});
		}
		// some nodes may be removed when opening the window so re-append them
		this.content.appendChild(this.mask);
		this.content.appendChild(this.fullview);
		
		//fade in the mask and load the image when fade is complete
		this.mask.setStyle({height:this.content.offsetHeight+'px',zIndex:30})
					.show()
					.setFade(0)
					.fade(80,500,function(){
						// remove any existing image from the image placeholder
						if(obj.image) {obj.oldImage = obj.image;}
						// load new image
						obj.image=obj.current.loadFull();
						// hide the new image until it's fully loaded
						HW.hide(obj.image);
					});
		
		// create overlay manager object to handle showing and hiding of overlays depending on mouse position
		if(this.overlayManager) {this.overlayManager.setEvents(0);}
		this.overlayManager = new HW.Gallery.OverlayManager(this.content);
		
		// create the four overlays and add them to the overlay manager
		if(!this.heading) {
			this.heading = new HW.Gallery.Images.FullView.Heading(this);
			this.overlayManager.add(this.heading,{top:0,right:756,bottom:504,left:0});
		}
		if(!this.menu) {
			this.menu = new HW.Gallery.Images.FullView.Menu(this);
			this.overlayManager.add(this.menu,{top:401,right:756,bottom:564,left:0});
		}
		if(!this.leftNavigation) {
			this.leftNavigation = new HW.Gallery.Images.FullView.Navigation(this,-1);
			this.overlayManager.add(this.leftNavigation,{top:100,right:200,bottom:391,left:0});
		}
		if(!this.rightNavigation) {
			this.rightNavigation = new HW.Gallery.Images.FullView.Navigation(this,1);
			this.overlayManager.add(this.rightNavigation,{top:100,right:756,bottom:391,left:556});
		}
		
		if(!isOpen) {
			this.overlayManager.setEvents(0);
			this.overlayManager.showAll();
		}
		
	},
	/**
		handle image fully loaded
	**/
	loaded:function() {
		var obj = this;
		// if an old image exists then get rid of it
		if(this.oldImage && this.oldImage.parentNode) {
			this.oldImage.parentNode.removeChild(this.oldImage);
		}
		// show the new image
		HW.show(this.image);
		this.fullview.show();
		this.content.removeClass('loading_full');
		this.content.addClass('loaded_full');
		// hide the mask
		this.mask.hide().setFade(0);
		// set the current image data in top and bottom overlays
		this.heading.set(this.current);
		this.menu.set(this.current);
		
		// if loading for the first time display all the overlays for a short period before hiding
		if(!this.overlayManager.hasEvents) {
			setTimeout(function(){obj.overlayManager.setEvents(1);},1500);
		}
	},
	/**
		return to gallery view
	**/
	gotoGallery:function(){
		var obj = this;
		this.overlayManager.setEvents(0);
		this.mask.show().setStyle({zIndex:30}).fade(80,500,function() {
			setTimeout(function(){
				obj.mask.hide().setStyle({zIndex:''});
				obj.fullview.hide();
				obj.content.removeClass('loaded_full');
				HW.Gallery.Images.ThumbnailView.load();
			},500)
		});
	},
	/**
		return to gallery view
		@direction	- -1 to navigate left, +1 to navigate right
	**/
	navigate:function(direction) {
		var current = this.current.index + direction;
		current = (current+HW.Gallery.Images.images.length)%HW.Gallery.Images.images.length;
		this.load(HW.Gallery.Images.images[current],true);
	}
}


/*****************************************************************************************************

IMAGE HEADING

	heading overlay
**/
HW.Gallery.Images.FullView.Heading = function(parentObj) {
	this.init(parentObj.fullview,parentObj);
}
HW.Gallery.Images.FullView.Heading.prototype = {
	init:function(container,parentObj) {
		var obj = this;
		// create HTML structure
		this.heading = container.createNode('div').addClass('gallery_full_header');
		var inner = this.heading.createNode('div').addClass('gallery_full_header_inner')/*.createNode('div').addClass('gallery_full_bg')*/;
		inner.createNode('h2');
		var ul = inner.createNode('ul');
		
		// create back to gallery link
		var a = ul.createNode('li').createNode('a','',{href:'#',title:'Back to images'}).addClass('return').bind('click',function(){parentObj.gotoGallery();},false);
		new HW.Gallery.ToolTip(a,null,'gallery_tooltip');
		
		// create info link
		var li = ul.createNode('li');
		li.createNode('a','',{href:'#'}).addClass('info').bind('click',function(){},false);
		li.bind('mouseover',function(){obj.info.show();});
		li.bind('mouseout',function(){obj.info.hide();});
		
		// create info tooltip
		this.info = li.createNode('div').addClass('gallery_tooltip2').hide();
		var ttInner = this.info.createNode('div').addClass('gallery_tooltip2_inner');
		ttInner.createNode('h3');
		ttInner.createNode('p').addClass('description');
		ttInner.createNode('p').createNode('a','Read the case study');
	},
	/**
		hide heading overlay
		@trans		- transition to use
		@callback	- function called on completion
	**/
	hide:function(trans,callback) {
		/*this.heading.hide(trans,callback);*/
	},
	/**
		show heading overlay
		@trans		- transition to use
		@callback	- function called on completion
	**/
	show:function(trans,callback) {
		/*this.heading.show(trans,callback);*/
	},
	/**
		set content to current image
		@image		- Image object
	**/
	set:function(image) {
		_$('h2',this.heading).innerHTML = image.title;
		_$('h3',this.info).innerHTML = image.title;
		_$('p.description',this.info).innerHTML = image.description;
		// if the image has a case study url defined then create a link to it
		if(image.caseStudyURL) {
			_$('p a',this.info).show().href = image.caseStudyURL;
		}
		else {
			_$('p a',this.info).hide();
		}
	}
}



/*****************************************************************************************************

THUMBNAIL MENU


	menu overlay
**/
HW.Gallery.Images.FullView.Menu = function(parentObj) {
	this.init(parentObj.fullview,parentObj);
}
HW.Gallery.Images.FullView.Menu.prototype = {
	active:true,
	init:function(container,parentObj) {
		var obj = this;
		
		// create HTML structure
		this.menu = container.createNode('div').addClass('gallery_full_thumbnailmenu');
		var inner = this.menu.createNode('div').addClass('gallery_full_bg').createNode('div').addClass('gallery_full_thumbnailmenu_inner');
	
		// left link
		inner.createNode('a','',{href:'#'}).addClass('navigation_left').bind('click',function(){obj.scroll(-1);},false);
		
		// thumbnail menu
		var thumbnails = inner.createNode('div').addClass('thumbnails').createNode('div').addClass('thumbnails_inner').setStyle({width:HW.Gallery.Images.images.length*67+'px'});
		this.thumbnails = thumbnails;
		HW.Gallery.Images.images.each(function(img){
			img.loadNavThumbnail(thumbnails);
		});
		
		// right link
		inner.createNode('a','',{href:'#'}).addClass('navigation_right').bind('click',function(){obj.scroll(1);},false);
		
	},
	/**
		hide menu overlay
		@trans		- transition to use
		@callback	- function called on completion
	**/
	hide:function(trans,callback) {
		//this.menu.hide(trans,callback);
		var obj = this;
		// buttons are shown and hidden by setting their left/right position dependent on direction
		if(trans == 'slide') {
			new HW.Animator(this.menu,0,-this.menu.offsetHeight,function(o,v){o.setStyle({bottom:v+'px'});},500,callback);
		}
		else {
			this.menu.setStyle({bottom:-this.menu.offsetWidth +'px'});
			try{callback();}catch(e){}
		}
	},
	/**
		show menu overlay
		@trans		- transition to use
		@callback	- function called on completion
	**/
	show:function(trans,callback) {
		//this.menu.show(trans,callback);
		var obj = this;
		// buttons are shown and hidden by setting their left/right position dependent on direction
		if(trans == 'slide') {
			new HW.Animator(this.menu,-this.menu.offsetHeight,0,function(o,v){o.setStyle({bottom:v+'px'});},500,callback);
		}
		else {
			this.menu.setStyle({bottom:'0px'});
			try{callback();}catch(e){}
		}
	},
	/**
		scroll thumbnail menu
		@d		- direction to scroll
		@l		- left bound of thumbnail to focus
		@r		- right bound of thumbnail to focus
	**/
	scroll:function(d,l,r) {
		if(this.active) {
			var obj = this;
			var left = this.thumbnails.offsetLeft;
			var width = this.thumbnails.offsetWidth;
			// find limits for thumbnail position
			var leftBound = this.thumbnails.parentNode.offsetWidth - this.thumbnails.offsetWidth;
			var rightBound = 0;
			// if thumbnails do not fill full width then hide buttons and do nothing
			if(leftBound > rightBound) {
				this.scroll = function(){}
				_$$('a.navigation_left, a.navigation_right',this.menu).each(function(a){a.setStyle({visibility:'hidden'})});
				return;
			}
			var dLeft = left - d * width;
			// if bounds have been defined to focus an image then bring image into view.
			if(typeof l != 'undefined' && typeof r != 'undefined') {
				if(l > left) {
					dLeft = l;
				}
				else if(r < left-this.thumbnails.parentNode.offsetWidth) {
					dLeft = r + this.thumbnails.parentNode.offsetWidth;
				}
			}
			
			dLeft = Math.max(dLeft,leftBound);
			dLeft = Math.min(dLeft,rightBound);
			
			var t = Math.abs(left-dLeft);
			if(d) {
				this.active = false;
				new HW.Animator(this.thumbnails,left,dLeft,function(o,v){o.setStyle({left:v+'px'});},t,function(){obj.active=true;},true);
			}
			else {
				this.thumbnails.setStyle({left:dLeft+'px'});
			}
		}
	},
	/**
		set highlighted state to current image
		@img		- Image object
	**/
	set:function(img) {
		var obj = this;
		// loop the thumbnails
		_$$('div.nav_thumbnail',this.menu).each(function(div) {
			// if thumbnail image if for current image, then apply highlight and focus
			if(div._imgObj == img) {
				div.addClass('current');
				obj.scroll(0,-div.offsetLeft,-div.offsetLeft-div.offsetWidth);
			}
			else {
				div.removeClass('current');
			}
		});
	}
}


/*****************************************************************************************************

LEFT/RIGHT NAVIGATION LINK

	create a left or right navigation link
	@parentObj		- reference to view controller object
	@direction		- -1 for left, +1 for right
**/
HW.Gallery.Images.FullView.Navigation = function(parentObj,direction) {
	this.direction = direction;
	this.dirString = this.direction==-1?'left':'right';
	this.init(parentObj.fullview,parentObj);
}
HW.Gallery.Images.FullView.Navigation.prototype = {
	/**
		create HTML and bind events
		@container	- container element into which to place button
		@parentObj	- reference to view controller object
	**/
	init:function(container,parentObj) {
		var obj = this;
		this.button = container.createNode('div').addClass('gallery_full_navigation_'+this.dirString);
		this.button.createNode('a','',{href:'#'}).bind('click',function(){parentObj.navigate(obj.direction);},false);
	},
	/**
		hide navigation overlay
		@trans		- transition to use
		@callback	- function called on completion
	**/
	hide:function(trans,callback) {
		var obj = this;
		var cb = function() {
			obj.button.hide();
			try{callback();}catch(e){}
		}
		// buttons are shown and hidden by setting their left/right position dependent on direction
		if(trans == 'slide') {
			new HW.Animator(this.button,0,-this.button.offsetWidth,function(o,v){o.style[obj.dirString] = v+'px';},500,cb);
		}
		else {
			this.button.style[this.dirString] = -this.button.offsetWidth +'px';
			cb();
		}
	},
	/**
		show navigation overlay
		@trans		- transition to use
		@callback	- function called on completion
	**/
	show:function(trans,callback) {
		var obj = this;
		// buttons are shown and hidden by setting their left/right position dependent on direction
		this.button.show();
		if(trans == 'slide') {
			new HW.Animator(this.button,-this.button.offsetWidth,0,function(o,v){o.style[obj.dirString] = v+'px';},500,callback);
		}
		else {
			this.button.style[this.dirString] = '0px';
			try{callback();}catch(e){}
		}
	}
}


/*****************************************************************************************************

IMAGE

	Image object
	@node			- XML node to load image data from
	@direction		- path to images directory
**/
HW.Gallery.Images.Image = function(node,imagePath) {
	this.gallery = HW.Gallery.Images.ThumbnailView;
	this.full = HW.Gallery.Images.FullView
	// get parameters from xml node
	this.id = node.getAttribute('id'); // id of image
	this.src = imagePath+node.getAttribute('src'); // src of main image
	this.thumb = imagePath+node.getAttribute('thumb'); // src of large thumb image
	this.thumb2 = imagePath+node.getAttribute('thumb2'); // src of small thumb image
	this.title = node.getAttribute('title'); // title of image
	this.description = node.getAttribute('description');
	this.caseStudyURL = node.getAttribute('casestudyurl'); // URL of case study page
	this.index = HW.Gallery.Images.images.length; // position within images array
}
HW.Gallery.Images.Image.prototype = {
	naturalWidth:0,
	naturalHeight:0,
	/**
		load single thumbnail image
	**/
	loadThumbnail:function() {
		var obj = this;
		var parentObj = this.gallery;
		
		// create HTML structure
		this.thumbnail = parentObj.wrapper.createNode('div').addClass('thumbnail_tl').addClass('thumbnail');
		var wrap = this.thumbnail.createNode('div').addClass('thumbnail_bl')
							 .createNode('div').addClass('thumbnail_tr')
							 .createNode('div').addClass('thumbnail_br')
							 .createNode('a','',{href:'#',title:this.title});
		wrap.bind('click',function(){wrap.hideToolTip();HW.Gallery.Images.FullView.load(obj);},false);
		
		// create tooltip
		new HW.Gallery.ToolTip(wrap,null,'gallery_tooltip');
							 
		// create image
		var img = new Image();
		img.src = this.thumb;
		var onload = function() {
			// get natural size of image before scaling
			if(!obj.naturalWidth) {
				obj.naturalWidth = img.offsetWidth;
				obj.naturalHeight = img.offsetHeight;
			}
			obj.resizeThumbnail(parentObj.defaultScale*parentObj.defaultScale);
			parentObj.count();
		}
		wrap.appendChild(img);
		
		// some browsers will not fire onload event reliably so check for complete property instead
		var int = setInterval(function(){if(img.complete){clearInterval(int);onload();}},500);
		
		this.img = img;
	},
	/**
		resize thumbnail image
		@val		- amount to scale image by in range [0,1]
	**/
	resizeThumbnail:function(val) {
		var margin = Math.ceil(this.gallery.margins[0] + val*(this.gallery.margins[1]-this.gallery.margins[0]));
		// only proceed if image is fully loaded
		if(this.img.complete) {
			var w = Math.ceil(this.gallery.minWidth + val*(this.naturalWidth-this.gallery.minWidth));
			this.img.width = w;
			this.img.height = w/this.naturalWidth * this.naturalHeight;
			this.thumbnail.setStyle({
				marginBottom:margin+'px',
				marginRight:margin+'px'
			});
		}
	},
	/**
		load full image
	**/
	loadFull:function() {
		var obj = this;
		
		// create image
		var img = new Image();
		img.src = this.src;
		img.className = 'main';
		var onload = function() {
			obj.full.loaded();
		}
		this.full.fullview.appendChild(img);
		// some browsers will not fire onload event reliably so check for complete property instead
		var int = setInterval(function(){if(img.complete){clearInterval(int);onload();}},1000);
		return img;
	},
	/**
		load full image
	**/
	loadNavThumbnail:function(parent) {
		var obj = this;
		var div = parent.createNode('div').addClass('nav_thumbnail');
		div._imgObj = this;
		var a = div.createNode('a','',{href:'#'});
		a.bind('click',function(){
			obj.hideInfo();
			HW.Gallery.Images.FullView.load(obj,true);
		},false);
		a.bind('mouseover',function(){obj.showInfo(div);},false);
		a.bind('mouseout',function(){obj.hideInfo();},false);
		// create image
		var img = new Image();
		img.src = this.thumb2;
		a.appendChild(img);
		return img;
	},
	/**
		show tool tip info in thumbnail menu in full view
	**/
	showInfo:function(div) {
		var win = HW.Gallery.Images.window.content;
		
		// find the position of the image relative to the window
		var o = div;
		var top = 0, left = 0;
		while(o && o != win) {
			top += o.offsetTop;
			left += o.offsetLeft;
			o = o.offsetParent;
		}
		// create the tooltip if it doesn't exist
		if(!this.tooltip) {
			this.tooltip = HW.createNode('div',win);
			this.tooltip.addClass('gallery_tooltip3');
			var topSection = this.tooltip.createNode('div').addClass('gallery_tooltip3_top');
			this.tooltip.createNode('div').addClass('gallery_tooltip3_bottom');
			topSection.createNode('h3',this.title);		
		}
		// add the tooltip to the window in case window has been emptied
		win.appendChild(this.tooltip);
		// show the tooltip and position accordingly
		this.tooltip.show().setStyle({
			top:top-this.tooltip.offsetHeight-8+'px',
			left:left-(this.tooltip.offsetWidth-div.offsetWidth)/2+'px'
		});
	},
	/**
		show tool tip info in thumbnail menu in full view
	**/
	hideInfo:function() {
		this.tooltip.hide();
	}
}

/*****************************************************************************************************

OVERLAY MANAGER


	overlay manager handles the display of overlay panels in full image view depending on mouse position
	@trigger 	- HTML node relative to which the mouse position is calculated
**/
HW.Gallery.OverlayManager = function(trigger) {
	var obj = this;
	this.trigger = trigger;
}
HW.Gallery.OverlayManager.prototype = {
	overlays:[],
	/**
		overlay manager handles the display of overlay panels in full image view depending on mouse position
		@trigger 	- HTML node relative to which the mouse position is calculated
	**/
	setEvents:function(toggle) {
		var obj = this;
		var f = function(e){obj.fire(e);}
		if(toggle) {
			HW.attachEvent(document.body,'mousemove',f);
			this.hasEvents = true;
		}
		else {
			HW.detachEvent(document.body,'mousemove',f);
			this.hasEvents = false;
		}
	},
	/**
		respond to a change in mouse position
		@e			- mousemove Event
	**/
	fire:function(e) {
		var obj = this;
		if(this.hasEvents) {
			e=e||window.event;
			// find the mouse position relative to the document
			var scrX = window.scrollX||document.body.scrollLeft||document.body.parentNode.scrollLeft;
			var scrY = window.scrollY||document.body.scrollTop||document.body.parentNode.scrollTop;
			var x = e.clientX + scrX;
			var y = e.clientY + scrY;
			// find the trigger position relative to the document and calculate difference
			var dx = 0,dy = 0,o = this.trigger;
			while(o) {
				dx += o.offsetLeft;
				dy += o.offsetTop;
				o = o.offsetParent;
			}
			x -= dx;
			y -= dy;
			// for each overlay check if mouse is in area defined
			this.overlays.each(function(o){
				if(x > o.left && x < o.right && y > o.top && y < o.bottom) {
					if(!o.hasMouseOver) {
						o.hasMouseOver = true;
						clearTimeout(o.timer);
						o.timer = setTimeout(function(){obj.show(o,'slide');},200);
					}
				}
				else {
					//if(o.hasMouseOver || !e) {
						o.hasMouseOver = false;
						clearTimeout(o.timer);
						o.timer = setTimeout(function(){obj.hide(o,'slide');},200);
					//}
				}
				clearTimeout(o.timer3);
				o.timer3 = setTimeout(function(){o.hasMouseOver=false;obj.hide(o,'slide');},5000);
			});
		}
	},
	/**
		add an overlay to the manager
		@overlay	- overlay object
		@coords		- coordinates of trigger area in form {top:x,right:x,bottom:x,leftx}
	**/
	add:function(overlay,coords) {
		var o = {panel:overlay,hidden:false,active:true,hasMouseover:false};
		HW.extendObject(o,coords);
		this.overlays.push(o);
	},
	/**
		hide an overlay
		@overlay	- overlay object
		@trans		- transition to apply
	**/
	hide:function(overlay,trans) {
		var obj = this;
		// only hide if element is not animating
		if(overlay.active) {
			// only hide if element is not already hidden
			if(!overlay.hidden) {
				overlay.active = false;
				overlay.panel.hide(trans,function(){overlay.active=true;overlay.hidden=true;});
			}
		}
		// if element is animating then wait
		else {
			clearTimeout(overlay.timer2);
			overlay.timer2 = setTimeout(function(){obj.hide(overlay,trans);},100);
		}
	},
	/**
		show an overlay
		@overlay	- overlay object
		@trans		- transition to apply
	**/
	show:function(overlay,trans) {
		var obj = this;
		// only show if element is not animating
		if(overlay.active) {
			// only show if element is not already shown
			if(overlay.hidden) {
				overlay.active = false;
				overlay.panel.show(trans,function(){overlay.active=true;overlay.hidden=false;});
			}
		}
		// if element is animating then wait
		else {
			clearTimeout(overlay.timer2);
			overlay.timer2 = setTimeout(function(){obj.show(overlay,trans);},100);
		}
	},
	/**
		show all overlays
	**/
	showAll:function() {
		var obj = this;
		this.overlays.each(function(o){
			o.active = true;
			o.hidden = true;
			clearTimeout(o.timer);
			clearTimeout(o.timer2);
			obj.show(o);
		});
	}
}

/*****************************************************************************************************

TOOLTIP OBJECT 

*/
HW.Gallery.ToolTip = function(a,content,cls) {
	var obj = this;
	a.bind('mouseover',function(e){obj.over(e);});
	a.bind('mouseout',function(){obj.out();});
	a.bind('mousemove',function(e){obj.move(e);});
	if(!content) {
		this.content = a.title;
		a.title = '';
	}
	else {
		this.content = content;
	}
	this.cls = cls;
	a.hideToolTip = function(){obj.hide(true);}
	this.src = a;
}
HW.Gallery.ToolTip.prototype = {
	text:'',
	isOver:false,
	out:function() {
		var obj = this;
		this.isOver = false;
		setTimeout(function(){obj.hide();},500);
	},
	over:function(e) {
		var obj = this;
		this.isOver = true;
		this.move(e);
		setTimeout(function(){obj.show()},1000);
	},
	move:function(e) {
		e = e||window.event;
		if(e) {
			var scr = window.scrollY||document.body.scrollTop||document.body.parentNode.scrollTop;
			this.left = e.clientX;
			this.top = e.clientY + scr;
		}
	},
	show:function() {
		if(this.isOver) {
			var obj = this;
			if(!this.tooltip) {
				this.build();
			}
			this.tooltip.show().setStyle({left:this.left+'px',top:this.top+'px'});
		}
	},
	hide:function(force) {
		if(force) {
			this.isOver = false;
		}
		if(this.tooltip && !this.isOver) {
			this.tooltip.hide();
		}

	},
	build:function() {
		var obj = this;
		this.tooltip = HW.createNode('div',document.body).addClass(this.cls);
		if(this.content.constructor == String) {
			this.tooltip.createNode('p',this.content);
		}
		else if(this.content.nodeType == 1) {
			this.tooltip.appendChild(this.content);
		}
		
		if(this.tooltip.offsetWidth > 200) {
			this.tooltip.setStyle({width:'200px'});
		}
	}
}





/*****************************************************************************************************
VIDEO GALLERY
*/
HW.Gallery.Videos = {
	/**
		id of default video
	**/
	def:2,
	/**
		id of current video
	**/
	current:null,
	/**
		get all links which point to the image gallery and bind behaviour to them
	**/
	init:function(xml,videoPath) {
		var obj = this;
		this.videoPath = videoPath;
		_$$('a.videoGalleryLoader').each(function(a){a.bind('click',function(){obj.load();},false);});
		
		var reg = new RegExp("(^|\\w*)videoLoader(\\d+)($|\\w*)");
		_$$('a.videoLoader').each(function(a){
			var n = reg.exec(a.className);
			if(n&&n[2]) {
				a.bind('click',function(){obj.load(n[2]);},false);
			}
		});
		
		new HW.Ajax(xml,function(r){obj.respond(r,videoPath);});
	},
	/**
		handle response from AJAX request for image list xml
		@response	- AJAX.Response object
	**/
	respond:function(response,videoPath) {
		var obj = this;
		this.videos = [];
		var vids = response.xml.getElementsByTagName('video');
		for(var i=0,j=vids.length;i<j;i++) {
			var vidObj = new HW.Gallery.Videos.Video(vids[i],videoPath);
			this.videos.push(vidObj);
		}
		this.loaded = true;
	},
	/**
		load gallery
		@id			- optional id of video to show
	**/
	load:function(id,isOpen) {
		var obj = this;
		if(!this.loaded) {
			setTimeout(function(){obj.load(id);},100);
			return;
		}
		
		id = id||this.def;
		if(id != this.current || !isOpen) {
			this.current = id;
			var video = this.getById(id);
			
			if(!isOpen) {
				this.window =  new HW.Gallery.Window('gallery_window',true);
				this.createStructure(video);
			}
			this.render(video);
		}
	},
	getById:function(id) {
		var video;
		HW.Gallery.Videos.videos.each(function(vid){
			if(vid.id == id) {
				video = vid;
			}
		});
		return video;
	},
	createStructure:function(video) {
		var wrap = this.window.content.createNode('div').addClass('video_gallery');
		this.content = wrap.createNode('div').addClass('video_gallery_top');
		this.content.empty();
		
		var bottom = wrap.createNode('div').addClass('video_gallery_bottom');
		
		this.details = this.content.createNode('div').addClass('video_gallery_col').addClass('video_gallery_col01')
								.createNode('div').addClass('video_details');
		
		var c2 = this.content.createNode('div').addClass('video_gallery_col').addClass('video_gallery_col02');
		c2.createNode('div').setStyle({visibility:'hidden'}).id = 'video_holder';
		var f = new HW.Flash();
		f.src = [8,this.videoPath+'/video_player.swf'];
		f.width = 492;
		f.height = 294;
		f.name = 'video_gallery';
		f.id = 'video_gallery';
		f.wmode = 'window';
		f.load('video_holder');
		
		var c3 = this.content.createNode('div').addClass('video_gallery_col').addClass('video_gallery_col03');
		c3.createNode('h3','Related HSBC links');
		this.related = c3.createNode('ul').addClass('related_links');
		
		new HW.Gallery.Videos.Menu(bottom,this);
		
		this.window.center();
	},
	render:function(video) {
		var obj = this;
		
		this.details.empty();
		this.related.empty();
		
		this.details.createNode('h2',video.title);
		this.details.createNode('p',video.description);
		if(video.linkurl && video.linktext) {
			this.details.createNode('p').createNode('a',video.linktext,{href:video.linkurl});
		}
		
		video.related.each(function(a){
			obj.related.createNode('li').createNode('a',a.text,{href:a.url});
		});
		_$('#video_holder').setStyle({visibility:'hidden'});
		setTimeout(function(){
			obj.loadVideo(video.xml);
		},500);
		
		this.window.center();
	},
	loadVideo:function(xml) {
		var obj = this;
		var v = HW.Gallery.getSwf('video_gallery');
		try {
			v.SetVariable('videoPath',xml);
			v.SetVariable('prefixPath',this.videoPath);
			setTimeout(function(){_$('#video_holder').setStyle({visibility:''});},200);
			return;
		}
		catch(e){setTimeout(function(){obj.loadVideo(xml);},500);}
	}
}

/*****************************************************************************************************
VIDEO
*/
HW.Gallery.Videos.Video = function(node,videoPath) {
	// get parameters from xml node
	this.id = node.getAttribute('id'); // video id
	this.xml = videoPath+node.getAttribute('xml'); // src of FLV
	this.thumb = videoPath+node.getAttribute('thumb'); // src of FLV placeholder image
	this.title = node.getAttribute('title'); // title of video
	this.description = node.getAttribute('description'); // description of video
	this.linkurl = node.getAttribute('link'); // url of associated link
	this.linktext = node.getAttribute('linktext'); // text of associated link
	this.index = HW.Gallery.Videos.videos.length; // position within videos array
	
	this.related = [];
	var rel = node.getElementsByTagName('relatedLink');
	for(var i=0,j=rel.length;i<j;i++) {
		this.related.push({
			text:rel[i].getAttribute('text'),
			url:rel[i].getAttribute('url')
		});
	}
}
HW.Gallery.Videos.Video.prototype = {
	/**
		load thumbnail
	**/
	loadNavThumbnail:function(parent) {
		var obj = this;
		var div = parent.createNode('div').addClass('nav_thumbnail');
		var a = div.createNode('a','',{href:'#'});
		a.bind('click',function(){
			HW.Gallery.Videos.load(obj.id,true);
		},false);
		// create image
		var img = new Image();
		img.src = this.thumb;
		a.appendChild(img);
		return img;
	}
}



/*****************************************************************************************************

THUMBNAIL MENU


	menu overlay
**/
HW.Gallery.Videos.Menu = function(container,parentObj) {
	this.init(container,parentObj);
}
HW.Gallery.Videos.Menu.prototype = {
	active:true,
	init:function(container,parentObj) {
		var obj = this;
		
		// create HTML structure
		this.menu = container.createNode('div').addClass('video_thumbnailmenu');
		var inner = this.menu.createNode('div').addClass('video_thumbnailmenu_inner');
	
		// left link
		inner.createNode('a','',{href:'#'}).addClass('navigation_left').bind('click',function(){obj.scroll(-1);},false);
		
		// thumbnail menu
		var thumbnails = inner.createNode('div').addClass('thumbnails').createNode('div').addClass('thumbnails_inner').setStyle({width:HW.Gallery.Videos.videos.length*144+'px'});
		this.thumbnails = thumbnails;
		HW.Gallery.Videos.videos.each(function(vid){
			vid.loadNavThumbnail(thumbnails);
		});
		
		// right link
		inner.createNode('a','',{href:'#'}).addClass('navigation_right').bind('click',function(){obj.scroll(1);},false);
		
		
	},
	/**
		scroll thumbnail menu
		@d		- direction to scroll
	**/
	scroll:function(d) {
		if(this.active) {
			var obj = this;
			var left = this.thumbnails.offsetLeft;
			var width = this.thumbnails.offsetWidth;
			// find limits for thumbnail position
			var leftBound = this.thumbnails.parentNode.offsetWidth - this.thumbnails.offsetWidth;
			var rightBound = 0;
			// if thumbnails do not fill full width then hide buttons and do nothing
			if(leftBound > rightBound) {
				this.scroll = function(){}
				_$$('a.navigation_left, a.navigation_right',this.menu).each(function(a){a.setStyle({visibility:'hidden'})});
				return;
			}
			var dLeft = left - d * width;
			
			dLeft = Math.max(dLeft,leftBound);
			dLeft = Math.min(dLeft,rightBound);
			
			var t = Math.abs(left-dLeft);
			this.active = false;
			new HW.Animator(this.thumbnails,left,dLeft,function(o,v){o.setStyle({left:v+'px'});},t,function(){obj.active=true;},true);
		}
	}
}











/*****************************************************************************************************
CASE STUDY BROWSER
*/
HW.Gallery.CaseStudies = {
	/**
		get all links which point to the image gallery and bind behaviour to them
	**/
	init:function(flashPath) {
		var obj = this;
		this.flashPath = flashPath;
		_$$('a.caseStudyLoader').each(function(a){a.bind('click',function(){obj.load();},false);});
	},
	load:function() {
		var obj = this;
		
		this.window =  new HW.Gallery.Window('gallery_window',true);
		var flashHolder = this.window.content.createNode('div').addClass('case_study_browser');
		flashHolder.createNode('div').setStyle({visibility:'hidden'}).id = 'case_study_browser';
		
		var f = new HW.Flash();
		f.src = [8,this.flashPath+'/casestudybrowser.swf?xmlPath='+this.flashPath+'/xml/sustainability.xml'];
		f.width = 945;
		f.height = 415;
		f.name = 'case_study_flash';
		f.id = 'case_study_flash';
		f.wmode = 'window';
		f.load('case_study_browser');
		
		this.loadVideo();
		
		this.window.center();
	},
	loadVideo:function() {
		var obj = this;
		var v = HW.Gallery.getSwf('case_study_flash');
		try {
			setTimeout(function(){_$('#case_study_browser').setStyle({visibility:''});},100);
			return;
		}
		catch(e){setTimeout(function(){obj.loadVideo();},100);}
	}
}







/****************************************************************************
* 																			*
* HW Javascript Drag-and-Drop Module										*
* ----------------------------------										*
* 																			*
* Author:			Leonard Martin (leonard.martin@heathwallace.com)		*
* Version:			0.1.1													*
* Updated:			11 September 2008										*
* 																			*
* **************************************************************************/

/*
--- DRAGANDDROP FUNCTIONS ---
Requires:	Core
CSS:		None
-----------------------------
*/

HW.DragAndDrop = {
	/*
	* getMousePosition(e)
	* gets the position of a mouse event relative to the document
	* e:		Mouse Event
	* Returns:	Position object with properties x,y
	*/
	getMousePosition:function(e) {
		var p = {x:0,y:0};
		// have to try a couple of methods to work cross-browser
		if (e.pageX || e.pageY) 	{
			p.x = e.pageX;
			p.y = e.pageY;
		}
		else if(e.clientX || e.clientY) {
			p.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			p.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return p;
	},
	
	/*
	* getPosition(o)
	* gets the position of an object relative to the document
	* o:		Object to measure
	* Returns:	Position object with properties x,y
	*/
	getPosition:function(o) {
		var p = {x:0,y:0};
		// step up the DOM getting offsets as we go
		while (o.offsetParent) 	{
			p.x += o.offsetLeft;
			p.y += o.offsetTop;
			o = o.offsetParent;
		}
		return p;
	},
	
	/*
	* getWindowScroll()
	* gets the current scroll position of the window
	* Returns:	Position object with properties x,y
	*/
	getWindowScroll:function() {
		var p = {x:0,y:0};
		// have to try a couple of methods to work cross-browser
		if(window.scrollX || window.scrollY) {
			p.x = window.scrollX;	
			p.y = window.scrollY;
		}
		else if(document.body.scrollLeft || document.body.scrollTop) {
			p.x = document.body.scrollLeft;
			p.y = document.body.scrollTop;
		}
		else if(document.body.parentNode.scrollLeft || document.body.parentNode.scrollTop) {
			p.x = document.body.parentNode.scrollLeft;
			p.y = document.body.parentNode.scrollTop;
		}
		return p;
	},
	
	/*
	* getDocSize()
	* gets the size of the document, if document does not fill window then returns window size
	* Returns:	Position object with properties x,y
	*/
	getDocSize:function() {
		// take window size as a minimum
		var p = this.getWindowSize();
		
		// have to try a couple of methods to work cross-browser
		p.x = Math.max(p.x,document.body.offsetWidth);
		p.x = Math.max(p.x,document.documentElement.offsetWidth);
		p.y = Math.max(p.x,document.documentElement.scrollWidth);
		
		p.y = Math.max(p.y,document.body.offsetHeight);
		p.y = Math.max(p.y,document.documentElement.offsetHeight);
		p.y = Math.max(p.y,document.documentElement.scrollHeight);
		
		return p;
	},
	
	/*
	* getWindowSize()
	* gets the size of the viewable window
	* Returns:	Position object with properties x,y
	*/
	getWindowSize:function() {
		var p = {x:0,y:0};
		
		// have to try a couple of methods to work cross-browser
		if(window.innerWidth) {
			p.x = window.innerWidth;
			p.y = window.innerHeight;
		}
		else if(document.documentElement.clientWidth) {
			p.x = document.documentElement.clientWidth;
			p.y = document.documentElement.clientHeight;
		}
		else if(document.body.clientWidth) {
			p.x = document.body.clientWidth;
			p.y = document.body.clientHeight;
		}
		
		return p;
	}
};

/*
* HW.DragAndDrop.Element(o,h,b,c) 
* makes an element draggable
* o:		The object to drag
* opts:		DragAndDrop.Options object containing the parameters for the drag and drop element
* Returns:	Self
*/
HW.DragAndDrop.Element = function(o,opts) {
	// if opts is not specified then create a null object
	this.options = new HW.DragAndDrop.Options();
	this.options = HW.extendObject(this.options,opts);
	
	// set the target element
	this.target = o;
	
	// if a handle is specified, use it, otherwise set the handle as the whole object
	this.handle = this.options.handle?this.options.handle:o;
	
	// set the limits
	this.bounds = this.options.bounds;
	
	// set the active class
	this.activeClass = this.options.activeClass;
	
	// give the handle a tabIndex so it can receive focus
	this.handle.tabIndex = 0;
	
	// add event handlers to object
	this.addEventHandlers();
	
	// set limits
	this.setBounds();
	
}

HW.DragAndDrop.Element.prototype = {
	// current position of element
	position:{x:0,y:0},
	
	// class to be given to active elements
	activeClass:'',
	
	// boundaries to keep object within
	bounds:{
		top:null,
		bottom:null,
		left:null,
		right:null
	},
	
	// flags to set if element is currently dragging
	dragging:false,
	keyDragging:false,
	
	// offset between mouse and top-left of object when dragging
	offset:{x:0,y:0},
	
	// move handler function, set by user
	onmove:function(e) {},
	
	// drop handler function, set by user
	ondrop:function(e) {},
	
	/*
	* addEventHandlers()
	* adds events handlers to D&D object
	* Returns:	Nothing
	*/
	addEventHandlers:function() {
		// create object alias for closures
		var obj = this;
		
		// add mousedown event to handle calling drag function
		HW.attachEvent(this.handle,'mousedown',function(e){HW.preventDefault(e);obj.drag(e);});
		
		// add focus event to handle calling drag function to allow keyboard interaction
		HW.attachEvent(this.handle,'focus',function(e){obj.keyDrag(e);});
		
		// add blur event to handle calling drop function to allow keyboard interaction
		HW.attachEvent(this.handle,'blur',function(e){obj.drop(e);});
		
		// add blur event to handle calling drop function to allow keyboard interaction
		HW.attachEvent(this.handle,'drag',function(e){HW.preventDefault(e);});
		
		// add blur event to handle calling drop function to allow keyboard interaction
		HW.attachEvent(document,'keydown',function(e){obj.keyMove(e);});
		
		// add mousemove event to document so that if cursor gets outside handle then dragging still occurs
		HW.attachEvent(document,'mousemove',function(e){obj.move(e);});
		
		// add mouseup to document so releasing the mouse anywhere drops any dragged element
		HW.attachEvent(document,'mouseup',function(e){obj.drop(e);});
	},
	
	/*
	* setBounds()
	* sets the dragging limits to an object, if not specified then are set to the document dimensions
	* Returns:	Nothing
	*/
	setBounds:function() {
		// get document dimensions
		var doc = HW.DragAndDrop.getDocSize();
		
		// set top-left limits to zero unless specified
		this.bounds.top = this.bounds.top!==null?this.bounds.top:0;
		this.bounds.left = this.bounds.left!==null?this.bounds.left:0;
		
		// set bottom right limits to doc size unless specified
		this.bounds.bottom = this.bounds.bottom!==null?this.bounds.bottom:doc.y - this.target.offsetHeight;
		this.bounds.right = this.bounds.right!==null?this.bounds.right:doc.x - this.target.offsetWidth;
	},
	
	/*
	* drag()
	* called when handle is clicked
	* e:		Mouse Event
	* Returns:	Nothing
	*/
	drag:function(e) {
		e=e||window.event;
		
		// get the cursor position
		var p = HW.DragAndDrop.getMousePosition(e);
		
		// get the current position of target
		var o = HW.DragAndDrop.getPosition(this.target);
		
		// calculate coords of click relative to target
		this.offset.x = p.x - o.x;
		this.offset.y = p.y - o.y;
		
		// set dragging flag
		this.dragging = true;
		
		// give the target element the active class
		HW.addClass(this.target,this.activeClass);
		
		// add event listener to stop selecting text whilst dragging
		HW.attachEvent(document,'selectstart',function(e){HW.preventDefault(e);});
		
		// call the move handler function
		this.move(e);
	},
	
	/*
	* keyDrag()
	* called when handle is focused using keyboard
	* e:		Event
	* Returns:	Nothing
	*/
	keyDrag:function(e) {
		e=e||window.event;
		
		// get the current position of target
		var o = HW.DragAndDrop.getPosition(this.target);
		
		this.position = o;
		
		// since we're using keyboard offset will be 0
		this.offset = {x:0,y:0};
		
		// set dragging flag
		this.keyDragging = true;
		
		// give the target element the active class
		HW.addClass(this.target,this.activeClass);
		
		this.keyMove(e);
	},
	
	/*
	* keyMove()
	* called when handle is moved using keyboard
	* e:		Event
	* Returns:	Nothing
	*/
	keyMove:function(e) {
		if(this.keyDragging) {
			
			e=e||window.event;
		
			var dx=0,dy=0;
			switch(e.keyCode) {
				case 37:
					dx = -1*this.options.increment;
					break;
				case 38:
					dy = -1*this.options.increment;
					break;
				case 39:
					dx = this.options.increment;
					break;
				case 40:
					dy = this.options.increment;
					break;
			}
			switch(e.keyCode) {
				case 37:
				case 38:
				case 39:
				case 40:
					HW.preventDefault(e);
				default:
					this.position.x += dx;
					this.position.y += dy;
					this.moveElement();
					break;
			}
		}
	},
	
	/*
	* move()
	* called when cursor moves
	* e:		Mouse Event
	* Returns:	Nothing
	*/
	move:function(e) {
		
		// we only need to act if we're being dragged
		if(this.dragging) {
			e=e||window.event;
			
			// get the cursor location
			var p = HW.DragAndDrop.getMousePosition(e);
			
			// get the position of the element relative to the document
			this.position.x = p.x - this.offset.x;
			this.position.y = p.y - this.offset.y;
			
			this.moveElement();
		}
	},
	
	moveElement:function() {
			
		// have to set element to position absolute first to fix bug in ie
		HW.setStyle(this.target,{position:'absolute'});
		
		// if a parent object has position absolute or relative need to ensure we take this into account when positioning
		var h = HW.DragAndDrop.getPosition(this.target.offsetParent);
		
		// ensure the element is within the set limits
		
		var b = HW.extendObject({},this.bounds);
		
		if(this.bounds.scope == 'parent') {
			b.top += h.y;
			b.bottom += h.y;
			
			b.left += h.x;
			b.right += h.x;
		}
		
		// check vertical limits
		if(this.bounds.top !== null) {this.position.y = Math.max(b.top,this.position.y);}
		if(this.bounds.bottom !== null) {this.position.y = Math.min(b.bottom,this.position.y);}
		
		// check horizontal limits
		if(this.bounds.left !== null) {this.position.x = Math.max(b.left,this.position.x);}
		if(this.bounds.right !== null) {this.position.x = Math.min(b.right,this.position.x);}
	
		// then set the position, now relative to any container
		HW.setStyle(this.target,{left:this.position.x - h.x + 'px',top:this.position.y - h.y + 'px'});
		
		// need to scroll the window if we drag to the edges
		// first get the current scroll values
		var scr = HW.DragAndDrop.getWindowScroll();
		// then get the window size
		var win = HW.DragAndDrop.getWindowSize();
		
		// take care of horizontal scrolling first
		// if going off left then  scroll left
		if(this.position.x < scr.x + 50) {
			window.scroll(scr.x - 10,scr.y);
		}
		// if going off right then  scroll right
		if(this.position.x > scr.x + win.x - 50) {
			window.scroll(scr.x + 10,scr.y);
		}
		
		// then take care of vertical scrolling
		// if going off top of screen scroll up
		if(this.position.y < scr.y + 50) {
			window.scroll(scr.x,scr.y - 10);
		}
		// if going off bottom of screen scroll down
		if(this.position.y > scr.y + win.y - 50) {
			window.scroll(scr.x,scr.y + 10);
		}
		
		// call the onmove event to allow user specified functionality
		this.onmove();
	},
	
	/*
	* drop()
	* called when mouse is released
	* Returns:	Nothing
	*/
	drop:function(e) {
		
		// if element is being dragged then called its ondrop event
		if(this.dragging || this.keyDragging) {
			// remove the active class from the target element
			HW.removeClass(this.target,this.activeClass);
			
			// fire ondrop function
			this.ondrop();
		}
		
		// stop dragging
		this.dragging = false;
		this.keyDragging = false;
		
		// allow text selection again
		HW.detachEvent(document,'selectstart',function(e){HW.preventDefault(e);});
	}
}

// create an instance of the DragAndDrop.Options object
HW.DragAndDrop.Options = function(){}

HW.DragAndDrop.Options.prototype = {
	// default drag limits
	bounds:{top:null,bottom:null,left:null,right:null,scope:'document'},
	// default active class
	activeClass:'active',
	// default handle element
	handle:null,
	// set the increment size for keyboard nav
	increment:5
}

/*
--- END DRAGANDDROP FUNCTIONS ---
*/

/****************************************************************************
* 																			*
* HW Javascript UI.Slider Module											*
* ------------------------------											*
* 																			*
* Author:			Leonard Martin (leonard.martin@heathwallace.com)		*
* Version:			0.1.1													*
* Updated:			4 June 2008												*
* NOTE: THIS FILE HAS BEEN EDITED SPECIFICALLY FOR HSBC SUTAINABILITY		*
* DO NOT OVERWRITE															*
* 																			*
* **************************************************************************/

if(!HW.UI) {
	HW.UI = {};
}

// Check for required extensions
if(!HW.DragAndDrop) {
	HW.error('UI.Slider Modules requires DragAndDrop to run!');
}

/*
--- UI.SLIDER FUNCTIONS ---
Requires:	Core, DragAndDrop
CSS:		css/slider.css
----------------------------
*/

/*
* HW.UI.Slider(o) 
* creates a slider element
* opts:		A Slider.Options object containing the setup paramters for the Slider
* Returns:	Self
*/
HW.UI.Slider = function(o,opts) {
	this.options = new HW.UI.Slider.Options();
	this.options = HW.extendObject(this.options,opts);
	
	if(!this.options.value) {this.options.value = this.options.lower;}
	
	this.build(o);
	HW.setStyle(o,{display:'none'});
	this.value = o.value?o.value:this.options.lower;
	this.input = o;
	
	this.setPosition(this.getPosition());
}

HW.UI.Slider.prototype = {
	handle:null,
	track:null,
	onchange:function(){},
	onmove:function(){},
	build:function(o) {
		var obj = this;
		
		var slider = HW.createNode('div',o.parentNode);
		o.parentNode.insertBefore(o,slider);
		
		HW.addClass(slider,'SliderWrapper');
		HW.addClass(slider,this.options.direction);
		HW.addClass(slider,this.options.className);
		
		if(this.options.wheelscroll) {
			HW.attachEvent(slider,'mousewheel',function(e){HW.preventDefault(e);obj.mouseScroll(e);});
		}
		
		HW.attachEvent(slider,'click',function(e){obj.trackClick(e);});
		
		this.wrapper = HW.createNode('div',slider);
		
		switch(this.options.direction) {
			case 'horizontal':
				var s = {width:this.options.size+'px'};
				break;
			case 'vertical':
				var s = {height:this.options.size+'px'};
				break;
			default:
				var s = {};
				break;
		}
		s.position = 'relative';
		
		HW.setStyle(this.wrapper,s);
		
		this.track = HW.createNode('div',this.wrapper);
		this.track.className = 'SliderTrack';
		
		this.handle = HW.createNode('a',this.wrapper);
		this.handle.href = '#';
		this.handle.title = this.options.title;
		var h = HW.createNode('span',this.handle,'&nbsp;');
		h.className = 'SliderHandle';
		HW.attachEvent(this.handle,'click',function(e){HW.preventDefault(e);});
		HW.attachEvent(h,'drag',function(e){HW.preventDefault(e);});
		
		var bounds = null;
		
		if(this.options.direction == 'horizontal') {
			bounds = {top:0,bottom:0,left:0,right:this.options.size,scope:'parent'};
		}
		if(this.options.direction == 'vertical') {
			bounds = {top:0,bottom:this.options.size,left:0,right:0,scope:'parent'};
		}
		
		var inc = 1;
		if(this.options.increments > 0) {
			inc = this.options.size/this.options.increments;
		}
		
		var s = new HW.DragAndDrop.Element(this.handle,{bounds:bounds,activeClass:'active',increment:inc});
		s.onmove = function() {
			var p = this.position;
			var q = HW.DragAndDrop.getPosition(this.handle.parentNode);
			obj.move({x:p.x-q.x,y:p.y-q.y});
		}
		s.ondrop = function() {
			obj.drop();
		}
		
	},
	trackClick:function(e) {
		var p = HW.DragAndDrop.getMousePosition(e);
		var q = HW.DragAndDrop.getPosition(this.handle.parentNode);
		this.move({x:p.x-q.x,y:p.y-q.y});
	},
	mouseScroll:function(e) {
		var d = e.wheelDelta/Math.abs(e.wheelDelta);
		var incSize = 1;
		if(this.options.increments > 0) {
			incSize = this.options.size/this.options.increments;
		}
		var p = this.getPosition();
		if(this.options.direction == 'horizontal') {
			this.move({x:p.x+d*incSize,y:0});
		}
		if(this.options.direction == 'vertical') {
			this.move({x:0,y:p.y-d*incSize});
		}
	},
	move:function(p) {
		if(this.options.direction == 'horizontal') {
			p.x = Math.max(0,Math.min(this.options.size,p.x));
		}
		if(this.options.direction == 'vertical') {
			p.y = Math.max(0,Math.min(this.options.size,p.y));
		}
		if(this.options.snap) {
			this.options.increments = this.options.increments?this.options.increments:1;
			var incSize = this.options.size/this.options.increments;
			
			switch(this.options.direction) {
				case 'horizontal':
					p.x = incSize * Math.round(p.x/incSize);
					break;
				case 'vertical':
					p.y = incSize * Math.round(p.y/incSize);
					break;
			}
			
		}
		this.setPosition(p);
		this.value = this.getValue(p);
		
		this.input.value = this.value;
		
		this.onmove();
	},
	drop:function(p) {
		this.onchange();
	},
	getValue:function(pos) {
		var p = this.options.direction=='horizontal'?pos.x:this.options.size-pos.y;
		
		var v = this.options.lower + (p/this.options.size)*(this.options.upper - this.options.lower);
		
		return v;
	},
	getPosition:function() {
		
		var p = this.options.size*(this.value - this.options.lower)/(this.options.upper - this.options.lower);
		if(this.options.direction == 'horizontal') {
			var pos = {x:p,y:0};
		}
		if(this.options.direction == 'vertical') {
			p = this.options.size - p;
			var pos = {x:0,y:p};
		}
		
		return pos;
	},
	setPosition:function(pos) {
		if(this.options.direction == 'horizontal') {
			HW.setStyle(this.handle,{left:pos.x+'px',top:0,position:'absolute'});
		}
		else if(this.options.direction == 'vertical') {
			HW.setStyle(this.handle,{top:pos.y+'px',left:0,position:'absolute'});
		}
	}
}

HW.UI.Slider.Options = function() {}
HW.UI.Slider.Options.prototype = {
	size:200,
	increments:10,
	snap:false,
	lower:0,
	upper:1,
	direction:'horizontal',
	className:null,
	wheelscroll:true
}


/*
--- END UI.SLIDER FUNCTIONS ---
*/