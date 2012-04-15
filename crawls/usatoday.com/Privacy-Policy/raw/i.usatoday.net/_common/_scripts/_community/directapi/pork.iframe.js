document.iframeLoaders = {};

iframe = function() { this.initialize.apply(this, arguments); };
iframe.prototype = {
	initialize: function(form, options,count){
		if (!options) options = {};
		this.form = form;
		this.uniqueId = count;
		document.iframeLoaders[this.uniqueId] = this;
		this.transport = this.getTransport();
		this.onComplete = options.onComplete || null;
		this.update = this.$(options.update) || null;
		this.updateMultiple = options.multiple || false;
		if (((navigator.vendor && (navigator.vendor.indexOf('Apple')) > -1) || window.opera) // safari and opera only
     && (/\/Direct\/Process(\?|$)/.test(form.action)) && form.elements && (form.elements.length == 1)) { // only change calls that contain 1 element and whose actions end with /Direct/Process
			var url = form.action + '?jsonRequest=' + escape(form.elements[0].value), // change form submit to string; similar to changing form method to get
					doc = this.transport.contentWindow || this.transport.contentDocument; // retrieve the document of the iframe
			if (url.length < 80000) { // allow fallback to normal submission (80k is the max length for urls in safari)
				if (doc.document) // make sure we have the document and not the window
					doc = doc.document;
				
				try { // if this fails, fallback to normal submission
					doc.location.replace(url); // use location.replace to overwrite elements in history 
					return;
				} catch (e) { };
			}
		}
		form.target= 'frame_'+this.uniqueId;
		form.setAttribute("target", 'frame_'+this.uniqueId); // in case the other one fails.
		form.submit();
	},

	onStateChange: function() {
		this.transport = this.$('frame_'+this.uniqueId);
		try {	 var doc = this.transport.contentDocument.document.body.innerHTML; this.transport.contentDocument.document.close(); }	// For NS6
		catch (e){ 
			try{ var doc = this.transport.contentWindow.document.body.innerHTML; this.transport.contentWindow.document.close(); } // For IE5.5 and IE6
			 catch (e){
				 try { var doc = this.transport.document.body.innerHTML; this.transport.document.body.close(); } // for IE5
					catch (e) {
						try	{ var doc = window.frames['frame_'+this.uniqueId].document.body.innerText; } // for really nasty browsers
						catch (e) { //alert(e); 
						} // forget it.
				 }
			}
		}
		this.transport.responseText = doc;
		if (this.onComplete) setTimeout(this.bind(function(){this.onComplete(this.transport);}, this), 10);
		if (this.update) setTimeout(this.bind(function(){this.update.innerHTML = this.transport.responseText;}, this), 10);
		if (this.updateMultiple){ setTimeout(this.bind(function(){ // JSON support!
				try	{ var hasscript = false; eval("var inputObject = "+this.transport.responseText);	// we're expecting a JSON object, eval it to inputObject
					for (var i in inputObject) { if (i == 'script') { hasscript = true; } // check if we passed some javascript along too
						else {if ( elm = this.$(i)) { elm.innerHTML = inputObject[i]; } else { 
						//alert("element "+i+" not found!"); 
						} } // if it's not script, update the corresponding div
					} if (hasscript) eval(inputObject['script']); // some on-the-fly-javascript exchanging support too
				} catch (e) { //alert('There was an error processing: '+this.transport.responseText); 
				} // in case of an error					
			}, this), 10);
		}	
	},

	getTransport: function() {
		var divElm = document.createElement('DIV'), frame;
		divElm.setAttribute('style', 'width: 0; height: 0; margin: 0; padding: 0; visibility: hidden; overflow: hidden');
		if (navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('Opera') == -1) {// switch to the crappy solution for IE
			divElm.style.width = 0;
			divElm.style.height = 0;
			divElm.style.margin = 0;
			divElm.style.padding = 0;
			divElm.style.visibility = 'hidden';
			divElm.style.overflow = 'hidden';
			divElm.innerHTML = '<iframe name=\"frame_'+this.uniqueId+'\" id=\"frame_'+this.uniqueId+'\" src=\"about:blank\" onload=\"setTimeout(function(){document.iframeLoaders['+this.uniqueId+'].onStateChange()},20);"></iframe>';
		} else {
			frame = document.createElement("iframe");
			frame.setAttribute("name", "frame_"+this.uniqueId);
			frame.setAttribute("id", "frame_"+this.uniqueId);
			frame.addEventListener("load", this.bind(function(){ this.onStateChange(); }, this), false);
			divElm.appendChild(frame);
		}
		document.body.appendChild(divElm);
		return frame;
	},
  
  bind: function(functionObject, referenceObject) {
    return function() {
      return functionObject.apply(referenceObject, arguments);
    }
  },
  
  '$': function(id) {
    return document.getElementById(id);
  }
};
