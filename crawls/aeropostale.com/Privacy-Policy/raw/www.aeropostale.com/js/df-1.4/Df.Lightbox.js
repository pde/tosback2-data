/*
 -ref		Df.Lightbox
 -type		Static Class
 -returns	Object
*/
Df.Lightbox = {
	pars: {
		dialog:{
	    	className:'df_modal_dialog',
		    animate: false,
		    title: 'TitleBar'
		},
		modal:{
	    	className:'df_modal',
		    clickToClose: true,
		    animate: false,
	    	iframe: true,
		    styles: {
			opacity: .5
	    	}
		}
    },

    setPars: function(pars){
    	Object.extend(Df.Lightbox.pars, pars);
        return Df.Lightbox;
    },

    getModal: function(){
		Df.Lightbox._checkModal()
		return Df.Lightbox._modal
    },

    getDialog: function(){
		Df.Lightbox._checkDialog()
		return Df.Lightbox._dialog
    },

    show: function(){
        Df.Lightbox._checkModal()
		Df.Lightbox._checkDialog()
        Df.Lightbox._modal.show()
		Df.Lightbox._dialog.show()
        return Df.Lightbox
    },

    hide: function(){
        Df.Lightbox._checkModal()
		Df.Lightbox._checkDialog()
		Df.Lightbox._modal.hide()
		Df.Lightbox._dialog.hide()
        return Df.Lightbox
    },

    _modal: false,
    _dialog: false,

    _checkModal: function(){
		if(!Df.Lightbox._modal){
            Df.Lightbox._createModal()
		}
    },

   	_checkDialog: function(){
		if(!Df.Lightbox._dialog){
            Df.Lightbox._createDialog()
		}
    },

    _createModal: function(){
        Df.Lightbox._modal = new Df.Ui(
            $(document.body).e('div', 'top',{className: Df.Lightbox.pars.modal.className}),
            {animate: Df.Lightbox.pars.modal.animate, iframe: Df.Lightbox.pars.modal.iframe}
        );

        Df.Lightbox._modal.element.setStyle(Df.Lightbox.pars.modal.styles);

		if(Prototype.Browser.ie6){
		    Df.Lightbox._modal.element.setStyle({position:'absolute'});
		}

        Df.Lightbox._modal.element.observe(':show', function(e){
            if(Df.Lightbox.pars.modal.clickToClose){
                Df.Lightbox._modal.element.observe('click', Df.Lightbox.hide);
			}

			if(Prototype.Browser.ie6){
				Event.observe(window, 'scroll', Df.Lightbox._positionModal);
			}
       	});

        Df.Lightbox._modal.element.observe(':hide', function(e){
            Df.Lightbox._modal.element.stopObserving('click', Df.Lightbox.hide);

	    	if(Prototype.Browser.ie6){
				Event.stopObserving(window, 'scroll', Df.Lightbox._positionModal);
			}
        });

		if(Prototype.Browser.ie6 && Df.Lightbox.pars.modal.iframe){
		    //Event.observe(window, 'resize', Df.Modal._sizeModal);
        }
    },

    createDialogShell: function(node){
		var h = Df.e('h2').update(Df.Lightbox.pars.dialog.title)
		h.e('span').observe('click', function(e){
		    Df.Lightbox.hide();
		});

		this._content = Df.e('div');
		node.insert(h).insert(this._content);
    },

    getDialogContent: function(){
		this._checkDialog();
		return this._content;
    },

    _createDialog: function(){
        Df.Lightbox._dialog = new Df.Ui(
            $(document.body).e('div', 'top',{className: Df.Lightbox.pars.dialog.className}),
            {animate: Df.Lightbox.pars.dialog.animate}
        );

		this.createDialogShell(Df.Lightbox._dialog.element);

		if(Prototype.Browser.ie6){
		    Df.Lightbox._dialog.element.setStyle({position:'absolute'});
		}

        Df.Lightbox._dialog.element.observe(':show', function(e){
		    Df.Lightbox._positionDialog();
		    Event.observe(window, 'resize', Df.Lightbox._positionDialog);
    
			if(Prototype.Browser.ie6){
				Event.observe(window, 'scroll', Df.Lightbox._positionDialog);
			}
       	});

        Df.Lightbox._dialog.element.observe(':hide', function(e){
		    Event.stopObserving(window, 'resize', Df.Lightbox._positionDialog);
    	    if(Prototype.Browser.ie6){
				Event.stopObserving(window, 'scroll', Df.Lightbox._positionDialog);
			}
	    });
    },

    _positionDialog: function(){
		Df.Lightbox._dialog.element.center();
    },

    _positionModal: function(){
		var o = document.viewport.getScrollOffsets();
		Df.Lightbox._modal.element.setStyle({
		    left: o.left + 'px',
		    top: o.top + 'px'
		});
    }
}