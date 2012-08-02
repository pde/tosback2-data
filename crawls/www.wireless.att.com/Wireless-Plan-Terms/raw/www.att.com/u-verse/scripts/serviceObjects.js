Modal = function (service, name, title, options) {
	//object to represent modals/steps
	if (Modal[service] && !options) return Modal[undefined] = Modal[service];
	else return Modal[undefined] = new objModal();
	
	function objModal() {
		this.key = service||'';
		this.name = name||'';
		this.title = title||'';
		this.options = options||[];
		
		this.insert = function (o) {
			//method to insert an option into array
			this.remove(o);
			this.options.push(o);
			this.options[o.key.toString()] = o;
		}
		
		this.remove = function (o) {
			//method to remove an option from array
			for (var i=0; i < this.options.length; ++i) {
				if (this.options[i].key == o.key) {
					this.options[o.key.toString()] = null;
					this.options.splice(i,1);
					return -1;
				}
			}
			return 0;
		}
		
		this.search = function (o, s, key) {
			//method to locate an option within array
			for (var i=0; i < this.options.length; ++i) {
				if (o && this.options[i][key||'key'] == o) return i;
				else for (var j=0; j < this.options[i].selections.length; ++j) {
					if (s && this.options[i].selections[j][key||'key'] == s) return i;
				}
			}
			return -1;
		}
		
		this.loop = function (inner, outer) {
			//method to loop thru array of options and selections
			for (var i=0; i < this.options.length; ++i) {
				var o = this.options[i];
				for (var j=0; j < this.options[i].selections.length; ++j) {
					var s = this.options[i].selections[j];
					if (inner) j += inner(o,s)||0;
				}
				if (outer) i += outer(o,s)||0;
			};
		}
		
		this.revert = function () {
			//method to restore the array of options after a cancel
			for (var i=0; i < this.options.length; ++i) {
				this.options[i].revert();
			}
		}
		
		this.requires = [];
		this.finished = [];
		this.ready = function () {
			for (var r = 0; r < this.requires.length; ++r) {
				if (!this.finished[r]) return false;
				if (!this.options[this.requires[r]]) return false;
			}
			return true;
		}
		
		this.changed = function (save, reset) {
			var x = [Modal.Details.phoneLinesList];
			for (var o = 0; o < this.options.length; ++o) {
				for (var s = 0; s < this.options[o].selections.length; ++s) {
					//TODO: fix this so that element order does not have to be static
					if (this.options[o].selections[s].key.indexOf('0.') != 0) {
						x.push(this.options[o].selections[s].key.split('.').slice(1).join('.'));
					}
				}
			}
			if(save == 'upGradeHsia'){
				showReturnToCart();	
			}
			if (reset) this.reset = -10;
			if (this.reset) save = true, this.reset++;
			if (save || !this.saved) this.saved = x.toString();
			
			//This is the fix for comparing this.saved and x.string() if the order is not same. 
			//Below code will put the comma separated values in arrays and then sort it and then convert to string and then compare if there is any change
			var savedArray = new Array();
			savedArray = this.saved.toString().split(',');
			var xArray = new Array();
			xArray = x.toString().split(',');
			savedArray = savedArray.sort();
			xArray = xArray.sort();
			if (xArray.join('') != savedArray.join('')) {
				return true;
			}
			return false;
		}
	};
}

Options = function (option, name, title, selections) {
	//object to represent option categories
	if (Options[option] && !selections) return Options[option].backup();
	else return new objOptions();
	
	function objOptions() {
		this.key = option||'';
		this.name = name||'';
		this.title = title||'';
		this.selections =  selections||[];
		
		this.insert = function (s) {
			//method to insert a selection into array
			this.remove(s);
			this.selections.push(s);
			this.selections[s.key.toString()] = s;
		}
		
		this.remove = function (s) {
			//method to remove a selection from array
			for (var i=0; i < this.selections.length; ++i) {
				if (this.selections[i].key == s.key) {
					this.selections[s.key.toString()] = null;
					this.selections.splice(i,1);
					return -1;
				}
			}
			return 0;
		}
		
		this.backup = function () {
			//method to backup the array of selections before changing
			if (!this._selections) this._selections = this.selections.slice();
			return this;
		}
		
		this.revert = function () {
			//method to revert the array of selections after a cancel
			if (this._selections) this.selections = this._selections.slice();
			this._selections = null;
			return this;
		}
		
		this.commit = function () {
			//method to commit the array of selections after a submit
			this._selections = null;
			return this;
		}
	};
}

Selections = function (pid, sku, qty, svc, price, name, title, status) {
	//object to represent option selections
	if (!arguments[1]) return Selections.apply(this, arguments[0]);
	
	var index = arguments[arguments.length-1];
	var text = arguments[arguments.length-2];
	if (arguments.length < 10) status = null;
	if (arguments.length < 9) title = null;
	if (arguments.length < 8) name = null;
	if (arguments.length < 7) price = null;
	
	return new objSelections();
	
	function objSelections() {
		this.pid = pid||'0';
		this.sku = sku||'0';
		this.qty = qty||'0';
		this.svc = svc||'';
		this.price = price||'0';
		this.key = pid + '.' + qty + '.' + index;
		this.name = name||text||'';
		this.title = title||text||'';
		this.status = status||'';
		this.text = text||'';
		this.index = index||'0';
		this.pointers = [];
	};
}

//these getKey functions are provided to allow introspection by other js functions
//passing in the name and value of the form element will return the objects key

//the key for Modals is the losgid with capitals and numbers removed
Modal.getKey = function (n, v) {return v[3].replace(/[A-Z0-9]+$/,'');}

//the key for Options is either the second or first value in the name
Options.getKey = function (n, v) {return n[1]||n[0];}

//the key for Selections is the pid + quantity + form element index 
Selections.getKey = function (n, v) {return v[0] + '.' + v[2] + '.' + v[v.length-1];}
