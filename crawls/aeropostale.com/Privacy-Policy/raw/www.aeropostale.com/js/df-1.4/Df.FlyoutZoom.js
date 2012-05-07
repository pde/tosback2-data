/*
 ref:		Df.FlyoutZoom
 type:		Class
 returns:	Df.FlyoutZoom
 extends:	Df.Element
 event:		this :loaded
 event:		this :loading
*/

Df.FlyoutZoom = Class.create(Df.Element, {
	initialize: function($super, element, pars){
		$super(element, pars)
		
		/** @private */
		this.loader;
		
		/** @private */
		this.image
		
		/** @private */
		this.base = $(new Image());
		
		/** @private */
		this.baseAnimation;
		this._baseAnimationCompleteEvent = this.baseAnimationCompleteEvent.bindAsEventListener(this)
		
		/** @private */
		this.loaderAnimation;
		this._loaderAnimationCompleteEvent = this.loaderAnimationCompleteEvent.bindAsEventListener(this)
		
		/** @private */
		this.markerAnimation;
		this._markerAnimationCompleteEvent = this.markerAnimationCompleteEvent.bindAsEventListener(this)
		
		/** @private */
		this.markerHolderAnimation;
		this._markerHolderAnimationCompleteEvent = this.markerHolderAnimationCompleteEvent.bindAsEventListener(this)
		
		/** @private */
		this.index;
		
		/** @private */
		this.maxHeight;
		
		/** @private */
		this.maxWidth;
		
		/** @private */
		this.baseHeight;
		
		/** @private */
		this.baseWidth;
		
		this.panel
		
		this.xRatio
		
		this.yRatio
	
		this.currentImageGroup = {}
		
		this.holderDims()
		
		//build elements
		this.buildBaseImage()
		this.buildPanel()
		this.buildLoader()
		this.buildMarker()
		
		//event handlers
		this.zoomMouseMoveEvent()
		
		this.panel.getElement().observe(':show', this.zoomIn.bind(this))
		this.panel.getElement().observe(':hide', this.zoomOut.bind(this))
		
		return this
	},
	
	_initPars: function($super, pars){
		$super()
		this.setPars({
			loader: false,
			images: {},
			classNames: {
				base: 'base',
				zoom: 'zoom'
			},
			panelAnimate: {
				width:220,
				ease: Df.Transitions.circOut
			},
			panelHolder: $(document.body)
			
		});
		this.setPars(pars)
	},
	
	zoomIn: function(e){
		this.m.style.visibility = 'visible'
		this.markerAnimation.toggle()
		this.mh.style.visibility = 'visible'
		this.markerHolderAnimation.toggle()
	},
	
	zoomOut: function(e){
		this.markerAnimation.toggle()
		this.markerHolderAnimation.toggle()
	},
	
	positionMarker: function(e){
		var x = this.element.getPointerX(e);
		var y = this.element.getPointerY(e);
		
		if (x <= this.mW/2) {
			this.x2 = 0
			this.ml = 0
			this.mxb = 0
		}
		else if (x >= (this.baseWidth - this.mW) + (this.mW / 2)) {
			this.x2 = -(this.baseWidth - this.mW) * this.xRatio
			this.ml = (this.baseWidth - this.mW)
			this.mxb = -(this.baseWidth - this.mW)
		}
		else {
			this.x2 = -1*((parseInt(this.m.style.left)) * this.xRatio)
			this.ml = x - (this.mW / 2)
			this.mxb = -x + (this.mW/2)
		}
		
		if (y <= this.mH/2) {
			this.y2 = 0
			this.mt = 0
			this.myb = 0
		}
		else if ( y >= (this.baseHeight - this.mH) + (this.mH / 2)) {
			this.y2 = -(this.baseHeight - this.mH) * this.yRatio
			this.mt = this.baseHeight - this.mH 
			this.myb = -(this.baseHeight-this.mH)
		}
		else {
			this.y2 = -1*((parseInt(this.m.style.top)) * this.yRatio)
			this.mt = y - (this.mH/2)
			this.myb = -y + (this.mH/2)
		}
		
		this.image.style.top = this.y2 + 'px';
		this.image.style.left = this.x2 + 'px';
		
		this.m.style.left = this.ml + "px"
		this.m.style.top = this.mt + "px"
		this.m.style.backgroundPosition = this.mxb + "px " + this.myb + "px"
	},
	
	loadIndex: function(index) {
		this.index = index;
		this.load(this.pars.images[this.index])
		
		return this
	},
	
	load: function(imageGroup){
		if(!this.currentImageGroup.base || imageGroup.base !==  this.currentImageGroup.base){
			this.panel.eventType(false)
			
			this.currentImageGroup = imageGroup
			
			if(this.image){
				this.image.remove()
				delete(this.image)
			}
			
			this.base.src = this.currentImageGroup.base;
			this.base.style.display = 'block';
			
			this.baseAnimation.run({opacity:1});
			
			this.m.style.backgroundImage = ''
			
			if(this.currentImageGroup.zoom && this.currentImageGroup.zoom.strip() != ''){
				this.showLoader()
				this.m.style.backgroundImage = 'url("'+ this.currentImageGroup.base +'")'
				this.buildZoomImage()
			}
		}
		return this
	},
	
	holderDims: function(){
		this.baseHeight = parseInt(this.element.getStyle('height'));
		this.baseWidth = parseInt(this.element.getStyle('width'));
	},
	
	baseAnimationCompleteEvent: function(e){
		this.element.style.backgroundImage = "url('" + this.currentImageGroup.base + "')";
		this.base.setStyle({opacity:0});
		this.base.style.display = 'none';
	},
	
	buildBaseImage: function(){
		this.base.addClassName(this.pars.classNames.base);
		this.base.setStyle({opacity:0});
		this.element.insert(this.base);
		this.baseAnimation = new Df.Animate(this.base, {time:500});
		this.baseAnimation.getElement().observe(':complete', this._baseAnimationCompleteEvent)
	},
	
	buildPanel: function(){
		this.panel = new Df.TogglePane( $(this.pars.panelHolder).e('div', 'bottom', {className: 'panel'}), {
			controller: this,
			treatAsMenu: false,
			showClassName: 'df_element_visible',
			hideClassName: 'df_element_hidden',
			eventType: false,
			animate: this.pars.panelAnimate
		});
	},
	
	buildZoomImage: function(){
		this.image = $(new Image());
		this.image.addClassName(this.pars.classNames.zoom);
		
		this.zoomLoadEvent()
		
		this.panel.getElement().insert(this.image)
		
		this.image.src = this.currentImageGroup.zoom;
	},
	
	buildMarker: function(){
		//build marker holder
		this.mh = this.element.e('div', 'bottom', {className:"markerHolder"})
		this.mh.setStyle({opacity:0})
		this.markerHolderAnimation = new Df.Animate(this.mh, {opacity: .5});
		this.markerHolderAnimation.getElement().observe(':complete', this._markerHolderAnimationCompleteEvent)
		
		//build marker HTML
		this.m = this.element.e('div', 'bottom', {className:"marker"})
		this.m.setStyle({opacity:0})
		this.m.style.backgroundPosition = '0px 0px'
		
		this.oh = $(this.m).e('div', 'bottom', {className:"markB"})
		
		this.markerAnimation = new Df.Animate(this.m, {opacity: 1});
		this.markerAnimation.getElement().observe(':complete', this._markerAnimationCompleteEvent)
	},
	
	markerAnimationCompleteEvent: function(e){
		if(e.memo.pointer == 0){
			this.m.style.visibility = 'hidden';
		}
	},
	
	markerHolderAnimationCompleteEvent: function(e){
		if(e.memo.pointer == 0){
			this.mh.style.visibility = 'hidden';
		}
	},
	
	//START event handlers
	
	zoomMouseMoveEvent: function(){
		//move zoom image inside holder
		this.element.observe('mousemove', function(e){
			Event.stop(e);
			this.positionMarker(e)
		}.bind(this));
	},
	
	trackPanelPosition: function(e){
		this.panel.getElement().style.top = this.element.getPointerY(e) + 'px'
		this.panel.getElement().style.left =  this.element.getPointerX(e) + 'px'
	},
	
	zoomLoadEvent: function(){
		//zoom image load event
		this.image.observe('load', function(e){
			Event.stop(e);
			
			this.maxHeight = parseInt(this.image.offsetHeight);
			this.maxWidth = parseInt(this.image.offsetWidth);
			
			this.image.style.height = this.maxHeight + 'px';
			this.image.style.width = this.maxWidth + 'px';
			
			//get transfer ratios and marker demensions
			this.xRatio = (this.maxWidth/this.baseWidth)
			this.yRatio = (this.maxHeight/this.baseHeight)
			
			//marker dims
			this.mW = ((this.baseWidth / this.maxWidth) * this.baseWidth)
			this.mH = ((this.baseHeight / this.maxHeight) * this.baseHeight)
			this.m.style.left = '0px'
			this.m.style.top = '0px'
			this.m.style.width = this.mW+'px'
			this.m.style.height = this.mH+'px'
			this.oh.style.height = (this.mH-2) + 'px'	
			
			this.hideLoader()
			
			this.panel.eventType('hover')
				
		}.bind(this));
	},
		
	//END event handlers
	
	//START loader methods
	loaderAnimationCompleteEvent: function(e){
		if(e.memo.pointer == 0){
			this.pars.loader.style.display = 'none';
		}
	},
	
	buildLoader: function(){
		this.pars.loader.setStyle({opacity:0})
		this.element.insert(this.pars.loader);
		this.loaderAnimation = new Df.Animate(this.pars.loader, {time:1000, opacity:.50});
		this.loaderAnimation.getElement().observe(':complete', this._loaderAnimationCompleteEvent)
	},
	
	showLoader: function(){
		this.element.fire(':loading')
		
		this.element.style.cursor = 'auto';
			
		this.pars.loader.style.display = 'block';
		this.loaderAnimation.toggle();
		
		return this
	},
	
	hideLoader: function(){
		this.element.fire(':loaded')
		this.loaderAnimation.toggle();	
	}
});