//add element methods
Element.addMethods({

	dropnav: function(element, pars){
		return new Df.Dropnav( $(element), pars )
	},

	tabset: function(element, pars){
		return new Df.Tabset( $(element), pars )
	},

	accordion: function(element, pars){
		return new Df.Accordion( $(element), pars )
	},

	cardset: function(element, pars){
		return new Df.Cardset( $(element), pars )
	}
});

/*
 ref:		Df.NavCollection
 extends:	Df.UiCollection
 returns:	Df.NavCollection
 type:		Class
*/
Df.NavCollection = Class.create(Df.UiCollection, {

	_initPars: function($super, pars){
		$super()
		this.setPars({
			eventType: 'hover',
			onShow: false,
			onHide: false,
			scrollbars: false,
			forceClose: true
		});
		this.setPars(pars)
	},

	/** @private */
	buildItems: function(){
		var elem = this.element.immediateDescendants();

		for(var i=0; i<elem.length; i++){
			if(this.pars.displayStateId){
				this.pars.displayStateId += '_' + i
			}
			this.items.push( new Df.NavItem( $(elem[i]), this.pars ));
		}

	}
});

/*
 ref:		Df.NavItem
 extends:	Df.TogglePane
 returns:	Df.NavItem
 type:		Class
*/
Df.NavItem = Class.create(Df.TogglePane, {
	initialize: function($super, element, pars){
		$super(element, pars)

		this.iframe = false

		return this;
	},

	showClickObserver: function(){
		if(this.pars.forceClose){
			this.pars.collection.showOnlyItem(this)
		}else{
			this.show()
		}
	}
});

/*
 ref:		Df.Accordion
 extends:	Df.NavCollection
 returns:	Df.Accordion
 type:		Class
*/
Df.Accordion = Class.create(Df.NavCollection, {

	_initPars: function($super, pars){
		$super()
		this.setPars({
			eventType: 'click',
			forceClose: false
		});
		this.setPars(pars)
	},

	buildItems: function(){
		var elem = this.element.immediateDescendants();

		for(var i=0; i<elem.length; i++){

			if(elem[i].tagName == "DT" && elem[i].next('dd')){
				if(this.pars.displayStateId){
					this.pars.displayStateId += '_' + i
				}
				Object.extend(this.pars, {
					controller: new Df.Ui(elem[i])
				});
				this.items.push( new Df.NavItem( $(elem[i]).next('dd'), this.pars ));
			}

		}
	}
});

/*
 ref:		Df.Dropnav
 extends:	Df.NavCollection
 returns:	Df.Dropnav
 type:		Class
*/
Df.Dropnav = Class.create(Df.NavCollection, {
	
	_initPars: function($super, pars){
		$super()
		this.setPars({
			iframe: true,
			forceClose: true
		});
		this.setPars(pars)
	},

	/*_setup: function($super){
		if(this.pars.eventType === 'click' ){
			Event.observe(document.body,'click', function(e){
				this.bodyClickEvent(e);
			}.bind(this) );
		}
		$super()
	},*/

	bodyClickEvent: function(e){
		this.hideItems();
	},

	buildItems: function(){

		var elem = this.element.immediateDescendants();

		for(var i=0; i<elem.length; i++){
			if($(elem[i]).down('ul')){
				if(this.pars.displayStateId){
					this.pars.displayStateId += '_' + i
				}
				Object.extend(this.pars, {
					controller: new Df.Ui(elem[i])
				});

				this.items.push( new Df.NavItem( $(elem[i]).down('ul'), this.pars ));
			}
		}

	}
});

/*
 ref:		Df.Cardset
 extends:	Df.NavCollection
 returns:	Df.Cardset
 type:		Class
*/
Df.Cardset = Class.create(Df.NavCollection, {
	_initPars: function($super, pars){
		$super()
		this.setPars({
			treatAsMenu: false,
			showClassName: 'active',
			hideClassName: false,
			activeControllerClassName: false
		});
		this.setPars(pars)
	},

	animationCompleteEvent: function(e){
		return
	},

	buildItems: function(){

		var elem = this.element.immediateDescendants();

		for(var i=0; i<elem.length; i++){
			if(this.pars.displayStateId){
				this.pars.displayStateId += '_' + i
			}
			Object.extend(this.pars, {
				controller: new Df.Ui(elem[i])
			});
			
			this.items.push( new Df.CardsetItem( $(elem[i]), this.pars ));
		}
	}
});

/*
 ref:		Df.CardsetItem
 extends:	Df.NavItem
 returns:	Df.CardsetItem
 type:		Class
*/
Df.CardsetItem = Class.create(Df.NavItem, {

	animationCompleteEvent: function(e){
		return
	},

	controllerClickObserver: function(e){
		Event.stop(e);
		this.show()
		return this
	},

	controllerHoverOutObserver: function(e){
		Event.stop(e);
		this.status = false
		return this
	},

	_show: function(){
		this.status = true
		this._showByStatus()
	},

	_showByStatus: Df.Ui.prototype.showByStatus,

	showByStatus: function(){
		if( this.status){
			var index = this.pars.collection.getInstanceItemIndex(this)

			for (var i=0; i<index; i++) {
				this.pars.collection.items[i].hide()

				if(this.pars.collection.pars.hideClassName){
					this.pars.collection.items[i].getElement().addClassName(this.pars.collection.pars.hideClassName)
				}

				if(this.pars.collection.pars.showClassName){
					this.pars.collection.items[i].getElement().removeClassName(this.pars.collection.pars.showClassName)
				}
			}

			for (var i=index; i<this.pars.collection.items.length; i++) {
				this.pars.collection.items[i]._show()

				if(this.pars.collection.pars.hideClassName){
					this.pars.collection.items[i].getElement().addClassName(this.pars.collection.pars.hideClassName)
				}

				if(this.pars.collection.pars.showClassName){
					this.pars.collection.items[i].getElement().removeClassName(this.pars.collection.pars.showClassName)
				}

			}

			if(this.pars.collection.pars.showClassName){
				this.getElement().addClassName(this.pars.collection.pars.showClassName)
			}

			if(this.pars.collection.pars.hideClassName){
				this.getElement().removeClassName(this.pars.collection.pars.hideClassName)
			}
		}

		return this
	}
});

/*
 ref:		Df.Tabset
 extends:	Df.NavCollection
 returns:	Df.Tabset
 type:		Class
*/
Df.Tabset = Class.create(Df.NavCollection, {
	_initPars: function($super, pars){
		$super()
		this.setPars({
			eventType: 'click',
			forceClose: true,
			treatAsMenu: false,
			hideClassName: 'df_element_hidden',
			showClassName: 'df_element_visible'
		});
		this.setPars(pars)
	},

	buildItems: function(){
		var elem = this.element.immediateDescendants();

		for(var i=0; i<elem.length; i++){

			if(elem[i].tagName == "DT" && elem[i].next('dd')){
				if(this.pars.displayStateId){
					this.pars.displayStateId += '_' + i
				}
				Object.extend(this.pars, {
					controller: new Df.Ui(elem[i])
				});
				this.items.push( new Df.TabsetItem( $(elem[i]).next('dd'), this.pars ));
			}

		}
	}
});

/*
 ref:		Df.TabsetItem
 extends:	Df.NavItem
 returns:	Df.TabsetItem
 type:		Class
*/
Df.TabsetItem = Class.create(Df.NavItem, {
	controllerHoverOutObserver: function(e){
		Event.stop(e);
		this.status = false
		return this
	},

	showByStatus: function(){

		if( this.status && !this.displayStatus ){

			this.pars.collection.hideItems()

			this.showActions()
		}

		return this;
	},

	hideClickObserver: function(e){
		return
	}

});