if (!window.Modal) {
	//ensure that service objects are available
	//Fix PROD11-1873
	var script = document.createElement('script');
	script.src = window.location.host+"/u-verse/scripts/serviceObjects.js";
	script.type = 'text/javascript';
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);
}

Modal.Details = function (service, div) {
	Modal.Details.div = div||Modal.Details.div||'mainPopupBodyIDM';
	if (!Modal[service]) Modal.Details.init(service, Modal.Details.div);
	Modal.Details.clearOptions(service);
	Modal.Details.readFormElements(Modal.Details.div);
	Modal.Details.updateOptions(service);
	Modal.Details.writeDetails('modalDetailsBody', service);
	Modal.Details.extras(service);
}

Modal.Details.init = function (service) {
	Modal[service] = new Modal(service,'','');
	Modal.Details.onloadJSCalls(service);
}

Modal.Details.extras = function (service) {
	//enable add to cart button	
	if (!Modal[service].changed()) {
		showReturnToCart();
	} else {
		Modal[service].ready() ? enableAddToCart() : disableAddToCart();
	}	
}

Modal.Details.clearOptions = function (service) {
	//need to both clear elements and remove elements
	if (!Modal[service]) return;

	Modal[service].loop (
		function (o,s) {
			Options[o.key].selections = [];
		},
		function (o,s) {
			Modal[service].options = [];
		}
	);

	Modal.Details.phoneLinesList = [];
}		

Modal.Details.readFormElements = function (div) {
	var div = typeof(div) == 'object' ? div : document.getElementById(div);
	
	var inputs = div ? div.getElementsByTagName('INPUT') : [];
	for (var i = 0; i < inputs.length; ++i) {
		var name = inputs[i].name||inputs[i].id;
		var value = inputs[i].value + ';' + inputs[i].text + ';' + i;
		if (specialCase(inputs[i])) continue;
		if ((inputs[i].checked || inputs[i].type=='hidden') && !inputs[i].disabled) {
			Modal.Details.insertElementAsOption(name, value);
		} else { 
			Modal.Details.removeElementAsOption(name, value);
		}
	}
	var selects = div ? div.getElementsByTagName('SELECT') : [];
	for (var i = 0; i < selects.length; ++i) {
		for (var j = 0; j < selects[i].options.length; ++j) {
			var name = (selects[i].name||selects[i].id);
			var value = selects[i].options[j].value + ';' + selects[i].options[j].text + ';' + i;
			if (specialCase(selects[i])) continue;
			if (selects[i].options[j].selected && !selects[i].options[j].disabled) {
				Modal.Details.insertElementAsOption(name, value);
			} else { 
				Modal.Details.removeElementAsOption(name, value);
			}
		}
	}
	
	function specialCase(element) {
		if (name.indexOf('phoneNumber')==0) {
			if (~name.indexOf('phoneNumberPrimary')) {
				Modal.Details.phoneLines(getPortOptionPrimary(),1);
			}
			if (~name.indexOf('phoneNumberAdditional')) {
				Modal.Details.phoneLines(getPortOptionAdditional(),2);
			}
			return true;
		}
	}
}

Modal.Details.insertElementAsOption = function (name, value, service) {
	var names = name.split(';');
	var values = value.split(';');
	if (!values[0] || !values[1] || !values[3]) return;
	
	var _service = Modal.getKey(names, values);
	var _name = Options.getKey(names, values);
	var _value = Selections.getKey(names, values);
	
	//insert option selection reference
	Selections[_value] = new Selections(values);
	Selections[_value].pointers = names;

	//insert option category reference
	Options[_name] = new Options(_name);
	Options[_name].insert(Selections[_value]);
	
	//insert modal container reference
	Modal[service] = new Modal(service);
	Modal[service].insert(Options[_name]);
}

Modal.Details.removeElementAsOption = function (name, value) {
	var names = name.split(';');
	var values = value.split(';')
	if (values.length < 4) return;

	var _name = Options.getKey(names, values);
	var _value = Selections.getKey(names, values);
	
	//check if option/selection references exists
	if (!Options[_name]) return;
	if (!Selections[_value]) return;

	//attempt to remove selection from option
	Options[_name].remove(Selections[_value]);
}

Modal.Details.updateOptions = function (service) {
	if (!Modal[service]) return;
	
	Modal[service].loop (
		function (o,s) {
			//remove if selection is dependent on an unselected option
			//returning -1 here to backup the loop index, otherwise it misses alternate options
			if (s.pointers[0] && s.pointers[1]) {
				if ((!~Modal[service].search(1, s.pointers[0], 'name'))) {
					return (Options[o.key].remove(s));
				}
			}
			
			//remove if selection is included in a selected option
			//returning -1 here to backup the loop index, otherwise it misses alternate options
			if (s.pointers[2] || s.pointers[3]) {
				if ((~Modal[service].search(1, s.pointers[2], 'name')) ||
					(~Modal[service].search(1, s.pointers[3], 'name'))) {
					return (Options[o.key].remove(s));
				}
			}
		},
		function (o,s) {
			//remove any empty options -- this is not strictly necessary
			if (!o.selections.length) return (Modal[service].remove(o));
		}
	);
}		

Modal.Details.writeDetails = function (div, service) {
	if (!Modal[service]) return;
	var div = typeof(div) == 'object' ? div : document.getElementById(div);

	//remove previous selections
	if (div) div.innerHTML = '';
	else return;

	//add current selections
	Modal[service].loop (
		function (o,s) {
			//don't display items with pid = 0 or status = 'included' or status = 'retired'
			if ((s.key.indexOf('0.') == 0) || (~s.status.toLowerCase().indexOf('retired')) ||
				(~s.status.toLowerCase().indexOf('existing'))) return;
			
			var table = document.createElement('TABLE');
			table.setAttribute('class', 'modal selection entry');
			
			var row = document.createElement('TR');
			table.appendChild(row);
			
			var cell1 = document.createElement('TD');
			cell1.setAttribute('class', 'modal selection entry-title');
			cell1.innerHTML = Selections[s.key].title;
			row.appendChild(cell1);
			
			var cell2 = document.createElement('TD');
			cell2.setAttribute('class', 'modal selection entry-price');
			cell2.innerHTML = '&nbsp;' + priceString(Selections[s.key].price);
			row.appendChild(cell2);

			if (div) div.appendChild(table);
			div.innerHTML += ''; //fix for IE6
		}
	);
	
	function priceString (p, q) {
		var period = p.match(/(\/month|\/mo|\/mo.)/) ? '/mo' : '';
		var p = p.toString().replace(/[^0-9\-\.]/g,'');
		p = (parseFloat(p)||0.00) + 0.0050000000001; // * (parseFloat(q)||0)
		var sign = p < 0 ? (p = -p, '-') : '';
		var dollars = parseInt(p).toString().replace(/(\d)(\d\d\d)$/,'$1,$2');
		var cents = parseInt(p*100%(100)).toString().replace(/^(\d)$/,'0$1');
		return (sign) + '$' + dollars + '.' + cents //+ period;
	}
	
}		

Modal.Details.onloadJSCalls = function (service) {
	if (service == 'hsia') {
		var tables = document.getElementsByClassName('modal hsia stage table').slice();
		
		for (var i=1; i < tables.length; ++i) {
			var colgroup = tables[0].getElementsByClassName('colgroup')[0];
			//don't strictly need cols since transferring class to cell below
			var col = tables[i].getElementsByClassName('col')[0];
			colgroup.appendChild(col);
			
			var rows = tables[i].getElementsByClassName('row');
			for (var j=0; j < rows.length; ++j) {
				var new_cell = tables[0].rows[j].appendChild(rows[j].cells[0].cloneNode(true));
				//need to transfer class to the cell since <col> has limited css support
				if (~col.className.indexOf('disabled')) {
					new_cell.className = col.className;
					new_cell.title = col.title;
					new_cell.onmousemove = showTitle;
					new_cell.onmouseout = hideTitle;
				}
			}
			
			tables[i].parentNode.removeChild(tables[i]);
		}
	}

	function showTitle(event) {
		if (!event) event = window.event;
		if (!event.srcElement) event.srcElement = event.target;
		if (event.srcElement.nodeType == 3) event.srcElement = event.srcElement.parentNode;
		
		var popup = document.getElementById('modalStageAlert');
		popup.style.display = 'block';
		
		var actualX = event.pageX || (event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft) || 385;
		var actualY = event.pageY || (event.clientY + document.documentElement.scrollTop + document.body.scrollTop) || 215;

		var offsetX = 0, offsetY = 0;
		var div = document.getElementById(Modal.Details.div);
		while (div.offsetParent) {
			div = div.offsetParent;
			if (div.offsetLeft) offsetX += div.offsetLeft;
			if (div.offsetTop) offsetY += div.offsetTop;
		}
		
		popup.style.left = actualX - offsetX + 15 + 'px';
		popup.style.top = actualY - offsetY + 10 + 'px';
	}
	
	function hideTitle(event) {
		if (!event) event = window.event;
		if (!event.srcElement) event.srcElement = event.target;
		if (event.srcElement.nodeType == 3) event.srcElement = event.srcElement.parentNode;
		var popup = document.getElementById('modalStageAlert');
		popup.style.display = 'none';
	}
}

Modal.Details.phoneLines = function (number, order) {
	if (!Modal.Details.phoneLinesList) Modal.Details.phoneLinesList = [];
	if (number == null) return;
	if (order && order==1) Modal.Details.phoneLinesList.unshift(number);
	else Modal.Details.phoneLinesList.push(number);
	Modal.Details.phoneLinesList.error = false;
	if (document.getElementById('phoneLine1Port').checked && !getPortOptionPrimary()) 
		Modal.Details.phoneLinesList.error = true;
	if (document.getElementById('secondLineCheckbox').checked && 
		document.getElementById('phoneLine2Port').checked && !getPortOptionAdditional()) 
		Modal.Details.phoneLinesList.error = true;
}

Modal.Details.submitOptions = function (service) {
	if (!Modal[service] || !Modal[service].ready()) return;

	var items = [];
	Modal[service].loop (
		function (o,s) {
			if (s.pid != '0' && s.sku != '0' && s.qty != '0') {
				var item = objectify(s.pid, s.sku, s.qty, s.svc);
				items.push(item);
			}
		}
	);

	if (ShoppingCart && items.length) {
		ShoppingCart.updateVOIPDataIDM.phoneLinesList = null;
		if (Modal.Details.phoneLinesList) {
			if (portPhoneLineslist()){
				return;
			}
		}
	
		Modal[service].changed(save=true);
		if (webTrendParamAddSkuQty) webTrendParamAddSkuQty();
		ShoppingCart.addItemsToOrderIDM(items);
	}
	
	function objectify (pid, sku, qty, svc) {
		return {
			productId : pid,
			catalogRefId : sku,
			quantity : qty,
			losgId : svc
		}
	}
}
