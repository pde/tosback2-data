(function() {

	lib.obj.itemFader = function(settings) {
		if(arguments.length > 0)
		{ this.init(settings); }
	};
	
	lib.obj.itemFader.prototype.init = function(settings) {
		var settings = $.extend({
			viewport : "#itemFader",
			item : "#itemFader .item",
			interval : 250,
			next : "#itemFader .next",
			prev : "#itemFader .prev",
			first : "#itemFader .first",
			last : "#itemFader .last",
			circular : false,
			preFadeCallback : null,
			postFadeCallback : null
		}, settings);
		
		this.viewport = settings.viewport;
		this.item = settings.item;
		this.interval = settings.interval;
		this.next = settings.next;
		this.prev = settings.prev;
		this.first = settings.first;
		this.last = settings.last;
		this.circular = settings.circular;
		this.preFadeCallback = settings.preFadeCallback;
		this.postFadeCallback = settings.postFadeCallback;
		this.faderInfo = {};
		this.faderInfo.index = 0;
		this.faderInfo.prevIndex = 0;
		this.faderInfo.end = $(this.item).size() - 1;
		this.zIndex = 0;
		
		/* Setup the Items */
		var jqThisViewport = $(this.viewport);
		if( jqThisViewport.size() > 0 )
		{
			var jqThisItems = $(this.item);
			this.zIndex = jqThisItems.eq(0).css("z-index");
			this.zIndex = ( this.zIndex == "auto") ? 0 : parseInt(this.zIndex);
			
			/* Size the items to fit the viewport, show first one */
			var w = jqThisViewport.width();
			var h = jqThisViewport.height();
			jqThisItems.each(function() { h = $(this).height() > h || $(this).height() < h ? $(this).height() : h; });
				/* Cabelas Specific Update here */
				//jqThisItems.width(w).height(h).css({ position: "absolute", top : 0, left : 0 }).fadeTo(0,0).css("z-index", this.zIndex).eq(0).fadeTo(0,1).css("z-index", this.zIndex+1);
				$(this.viewport).css( {position: 'relative' });
				/* ------------------ */
			/* ------------- */
				
			/* Set the default states of the buttons */
			$(this.next).hide();
			$(this.prev).hide();
			if(this.circular && ($(this.item).size() > 1))
			{
				$(this.next).show();
				$(this.prev).show();
			}
			else if( !this.circular && ($(this.item).size() > 1))
			{ $(this.next).show(); }
			/* ----------------------- */
			
			$(this.next + "," + this.prev + "," + this.first + "," + this.last).click(function(evt){ evt.preventDefault(); });
			this.removeEvents();
			this.createEvents();
		}
		/* ----------------- */
	};
	
	lib.obj.itemFader.prototype.createEvents = function() {
		var currObj = this;
		$(this.prev).bind("click.itemFader", function(evt) {
			currObj.backward(); 
		});
		$(this.next).bind("click.itemFader", function(evt) {
			currObj.forward();
		});
		$(this.first).bind("click.itemFader", function(evt){
			currObj.toFirst();
		});
		$(this.last).bind("click.itemFader", function(evt){
			currObj.toLast();
		});
	};
	
	lib.obj.itemFader.prototype.removeEvents = function() {
		$(this.prev).unbind("click.itemFader");
		$(this.next).unbind("click.itemFader");
		$(this.last).unbind("click.itemFader");
		$(this.first).unbind("click.itemFader");
	};
	
	lib.obj.itemFader.prototype.forward = function() {
		this.faderInfo.prevIndex = this.faderInfo.index;
		this.faderInfo.index++;
		this.fade();
	};
	
	lib.obj.itemFader.prototype.backward = function() {
		this.faderInfo.prevIndex = this.faderInfo.index;
		this.faderInfo.index--;
		this.fade();
	};
	
	lib.obj.itemFader.prototype.toFirst = function() {
		this.faderInfo.prevIndex = this.faderInfo.index;
		this.faderInfo.index = 0;
		this.fade();
	};
	
	lib.obj.itemFader.prototype.toLast = function() {
		this.faderInfo.prevIndex = this.faderInfo.index;
		this.faderInfo.index = this.faderInfo.end;
		this.fade();
	};
	
	lib.obj.itemFader.prototype.fade = function() {
		/* Make index is in range */
		if(this.circular)
		{
			if( this.faderInfo.index > this.faderInfo.end )
			{ this.faderInfo.index = 0; }
			else if( this.faderInfo.index < 0 )
			{ this.faderInfo.index = this.faderInfo.end; }
		}
		else
		{
			if( this.faderInfo.index > this.faderInfo.end )
			{ this.faderInfo.index = this.faderInfo.end; }
			else if( this.faderInfo.index < 0 )
			{ this.faderInfo.index = 0; }
		}
		/* --------------- */
		
		/* show/hide buttons */
		if( !this.circular )
		{
			if( this.faderInfo.index == this.faderInfo.end )
			{ $(this.next).hide(); }
			else if(this.faderInfo.end > 0 )
			{ $(this.next).show(); }
			
			if( this.faderInfo.index == 0 )
			{ $(this.prev).hide(); }
			else
			{ $(this.prev).show(); }
		}
		/* ----------------------- */
		
		if( this.faderInfo.prevIndex != this.faderInfo.index)
		{
			this.removeEvents();
			if($.isFunction(this.preFadeCallback))
			{ this.preFadeCallback( this ); }
			
			var currObj = this;
			var jqThisItems = $(currObj.item);
			//jqThisItems.css({ position: "absolute", top : 0, left : 0 }).fadeTo(1000,0).css("z-index", this.zIndex);
			//jqThisItems.eq(this.faderInfo.index).fadeTo(1000,1).css("z-index", this.zIndex+1);
			
			jqThisItems.eq(currObj.faderInfo.prevIndex).css({ position: "absolute", top : 0, left : 0 }).fadeTo( currObj.interval, 0 ).css("z-index", this.zIndex);
			jqThisItems.eq(currObj.faderInfo.index).fadeTo( currObj.interval, 1, function() {
				currObj.createEvents();
				if($.isFunction(currObj.postFadeCallback))
				{ currObj.postFadeCallback( currObj ); }
			}).css("z-index", this.zIndex+1);
		}
	};

})();