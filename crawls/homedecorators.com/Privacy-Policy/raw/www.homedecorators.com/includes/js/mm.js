<!-- Hide script from old browsers
document.menu = new Object();
document.menu.hirelist = new Object();
document.menu.hirelist.expandos = new Array();
document.menu.hirelist.heights = new Array();
document.menu.hirelist.names = new Array();

//****************** Begin cookie functions

function Cookie(document, name, hours, path, domain, secure)
{
    // All the predefined properties of this object begin with '$'
    // to distinguish them from other properties which are the values to
    // be stored in the cookie.
    this.$document = document;
    this.$name = name;
    if (hours)
        this.$expiration = new Date((new Date()).getTime() + hours*3600000);
    else this.$expiration = null;
    if (path) this.$path = path; else this.$path = null;
    if (domain) this.$domain = domain; else this.$domain = null;
    if (secure) this.$secure = true; else this.$secure = false;
}

// This function is the store() method of the Cookie object.
function _Cookie_store()
{
    // First, loop through the properties of the Cookie object and
    // put together the value of the cookie. Since cookies use the
    // equals sign and semicolons as separators, we'll use colons
    // and ampersands for the individual state variables we store 
    // within a single cookie value. Note that we escape the value
    // of each state variable, in case it contains punctuation or other
    // illegal characters.
    var cookieval = "";
    for(var prop in this) {
        // Ignore properties with names that begin with '$' and also methods.
        if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) 
            continue;
        if (cookieval != "") cookieval += '&';
        cookieval += prop + ':' + escape(this[prop]);
    }

    // Now that we have the value of the cookie, put together the 
    // complete cookie string, which includes the name and the various
    // attributes specified when the Cookie object was created.
    var cookie = this.$name + '=' + cookieval;
    if (this.$expiration)
        cookie += '; expires=' + this.$expiration.toGMTString();
    if (this.$path) cookie += '; path=' + this.$path;
    if (this.$domain) cookie += '; domain=' + this.$domain;
    if (this.$secure) cookie += '; secure';

    // Now store the cookie by setting the magic Document.cookie property.
    this.$document.cookie = cookie;
}
// This function is the load() method of the Cookie object.
function _Cookie_load()
{
    // First, get a list of all cookies that pertain to this document.
    // We do this by reading the magic Document.cookie property.
    var allcookies = this.$document.cookie;
    if (allcookies == "") return false;

    // Now extract just the named cookie from that list.
    var start = allcookies.indexOf(this.$name + '=');
    if (start == -1) return false;   // Cookie not defined for this page.
    start += this.$name.length + 1;  // Skip name and equals sign.
    var end = allcookies.indexOf(';', start);
    if (end == -1) end = allcookies.length;
    var cookieval = allcookies.substring(start, end);

    // Now that we've extracted the value of the named cookie, we've
    // got to break that value down into individual state variable 
    // names and values. The name/value pairs are separated from each
    // other by ampersands, and the individual names and values are
    // separated from each other by colons. We use the split method
    // to parse everything.
    var a = cookieval.split('&');    // Break it into array of name/value pairs.
    for(var i=0; i < a.length; i++)  // Break each pair into an array.
        a[i] = a[i].split(':');

    // Now that we've parsed the cookie value, set all the names and values
    // of the state variables in this Cookie object. Note that we unescape()
    // the property value, because we called escape() when we stored it.
    for(var i = 0; i < a.length; i++) {
        this[a[i][0]] = unescape(a[i][1]);
    }

    // We're done, so return the success code.
    return true;
}

// This function is the remove() method of the Cookie object.
function _Cookie_remove()
{
    var cookie;
    cookie = this.$name + '=';
    if (this.$path) cookie += '; path=' + this.$path;
    if (this.$domain) cookie += '; domain=' + this.$domain;
    cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';

    this.$document.cookie = cookie;
}

// Create a dummy Cookie object, so we can use the prototype object to make
// the functions above into methods.
new Cookie();
Cookie.prototype.store = _Cookie_store;
Cookie.prototype.load = _Cookie_load;
Cookie.prototype.remove = _Cookie_remove;

//****************** end cookie functions
 var compareOpt = new Cookie(document, "options", 24);
 var compareColor = new Cookie(document, "colors", 24);

function toggle(id) {
  if (document.all){
    if(document.all[id].style.display == 'none'){
      document.all[id].style.display = '';
    } else {
      document.all[id].style.display = 'none';
    }
  } else if (document.getElementById){
    if(document.getElementById(id).style.display == 'none'){
      document.getElementById(id).style.display = 'block';
    } else {
      document.getElementById(id).style.display = 'none';
    }
  } else if(document.layers) {
      if(parseInt(id + 1)){
	  ditem = id + 1;
      } else {
	  ditem = document.menu.hirelist.names[id];
      }
      if(document.menu.hirelist.expandos[ditem].clip.bottom == 0) {
	     document.menu.hirelist.expandos[ditem].clip.bottom = document.menu.hirelist.heights[ditem];
      } else {
	  document.menu.hirelist.expandos[ditem].clip.bottom = 0;
      }
      align();
  }
}

function align() {
    var i,j,stupid_netscape_array_infinate_loop_error;
    stupid_netscape_array_infinate_loop_error = document.menu.hirelist.expandos.length;
    for(i=0; i<stupid_netscape_array_infinate_loop_error; i++) {
		j = i + 1;
		if(document.menu.hirelist.expandos[j]){
	    	if(document.layers) {
				document.menu.hirelist.expandos[j].top = document.menu.hirelist.expandos[i].top + document.menu.hirelist.expandos[i].clip.bottom;
	   		}
		}
    }
}

function initialize_toolbar(){
    if(document.layers) {
		for(i=0; i<document.layers['container'].document.layers.length; i++){
	    	document.menu.hirelist.expandos[i] = document.layers['container'].document.layers[i];
	    	document.menu.hirelist.names[document.layers['container'].document.layers[i].name] = i;
	    	document.menu.hirelist.heights[i] = document.menu.hirelist.expandos[i].clip.bottom;
		}
		for (p=0;p<document.menu.hirelist.expandos.length;p=p+2){
	    	toggle(p);
		}
		document.layers['container'].visibility = 'visible';
    } else if (document.all){
		for(i = 0; i < document.all('container').all.length; i++){
		    document.all('container').all[i].style.position = 'relative';
		    if(document.all('container').all[i].className == 'menu'){
			document.all('container').all[i].style.display = 'none';
		    }
		}
		document.all('container').style.visibility = 'visible';
    } else if (document.getElementsByTagName && document.getElementById){
		var contained = document.getElementById('container').getElementsByTagName('div');
		for(i = 0; i < contained.length; i++){
		    contained[i].style.position = 'relative';
		    if(contained[i].getAttribute('class') == 'menu'){
			contained[i].style.display = 'none';
		    }
		}
		document.getElementById('container').style.visibility = 'visible';
    }
if (typeof category != 'undefined' && category != 'ITEMOFTHEWEEK' && category != 'Food' && category != 'INTERNETEXLUSIVES' && category != '') {toggle(category);}
}


//setup container tag
  if(document.layers) {
    containertag='<div id="container" class="container">';
  } else if (document.all){
  	containertag='<div id="container" class="container" style="position: absolute; left: 50px; top:50px; width:150px; height: 400px; visibility: hidden;">';
  }

function pop(newwin,twidth,theight) {
	//alert(newwin);
	if (typeof twidth == 'undefined') {twidth=640;}
	if (typeof theight == 'undefined') {theight=500;}
	flyout=window.open(newwin,"flyout","resizable=yes,scrollbars=yes,width="+twidth+",height="+theight+",top=0,left=0,toolbar=no,status=no,menubar=no");
	if (window.focus) {flyout.focus();}
	if (!flyout.opener) {
		flyout.opener = self;
	}
}
function popwish(newwin) {flyout=window.open(newwin,"colorflyout","resizable=yes,scrollbars=yes,width=400,height=250,top=0,left=0,toolbar=no,status=no,menubar=no");if (!flyout.opener) flyout.opener = self;}
function popEmail(newwin,w) {flyout=window.open(newwin,"flyout","resizable=yes,scrollbars=yes,width=400,height=300,top=0,left=0,toolbar=no,status=no,menubar=no")}

//functions for netflame
function getCookie(name){
	var cookies=document.cookie;
	var start=cookies.indexOf(name+'=');
	if (start<0)
		return null;
	var end=cookies.indexOf(';',start);
	if (end<0)
		end=cookies.length;	
	return cookies.substring(start+name.length+1,end);
}
function fc_modify(url) {
	if (typeof(fcPref)=='undefined' || !fcPref)
		return url;
	var fcCCookie = getCookie("fcC");
	if (fcCCookie) {
		url += ((url.indexOf('?')>0) ? '&' : '?') + "fcC="+escape(fcCCookie);
	}
	return url;
}
function fc_submit(form) {
	if (form && form.action)
		form.action = fc_modify(form.action);
	return true;
}
function fc_click(lnk) {
	if (lnk && lnk.href) {
		var url = fc_modify(lnk.href);
		document.location.href=url;
	}
	return false;
}

/**
 * This array is used to remember mark status of rows in browse mode
 */
var marked_row = new Array;

/**
 * Sets/unsets the pointer and marker in browse mode
 * this is for highlighting tablerows like on phpMyAdmin
 * @param   object    the table row
 * @param   interger  the row number
 * @param   string    the action calling this script (over, out or click)
 * @param   string    the default background color
 * @param   string    the color to use for mouseover
 * @param   string    the color to use for marking a row
 *
 * @return  boolean  whether pointer is set or not
 */
function setPointer(theRow, theRowNum, theAction, theDefaultColor, thePointerColor, theMarkColor)
{
    var theCells = null;

    // 1. Pointer and mark feature are disabled or the browser can't get the
    //    row -> exits
    if ((thePointerColor == '' && theMarkColor == '')
        || typeof(theRow.style) == 'undefined') {
        return false;
    }

    // 2. Gets the current row and exits if the browser can't get it
    if (typeof(document.getElementsByTagName) != 'undefined') {
        theCells = theRow.getElementsByTagName('td');
    }
    else if (typeof(theRow.cells) != 'undefined') {
        theCells = theRow.cells;
    }
    else {
        return false;
    }

    // 3. Gets the current color...
    var rowCellsCnt  = theCells.length;
    var domDetect    = null;
    var currentColor = null;
    var newColor     = null;
    // 3.1 ... with DOM compatible browsers except Opera that does not return
    //         valid values with "getAttribute"
    if (typeof(window.opera) == 'undefined'
        && typeof(theCells[0].getAttribute) != 'undefined') {
        currentColor = theCells[0].getAttribute('bgcolor');
        domDetect    = true;
    }
    // 3.2 ... with other browsers
    else {
        currentColor = theCells[0].style.backgroundColor;
        domDetect    = false;
    } // end 3

    // 4. Defines the new color
    // 4.1 Current color is the default one
    if (currentColor == ''
        || currentColor.toLowerCase() == theDefaultColor.toLowerCase()) {
        if (theAction == 'over' && thePointerColor != '') {
            newColor              = thePointerColor;
        }
        else if (theAction == 'click' && theMarkColor != '') {
            newColor              = theMarkColor;
        }
    }
    // 4.1.2 Current color is the pointer one
    else if (currentColor.toLowerCase() == thePointerColor.toLowerCase()
             && (typeof(marked_row[theRowNum]) == 'undefined' || !marked_row[theRowNum])) {
        if (theAction == 'out') {
            newColor              = theDefaultColor;
        }
        else if (theAction == 'click' && theMarkColor != '') {
            newColor              = theMarkColor;
            marked_row[theRowNum] = true;
        }
    }
    // 4.1.3 Current color is the marker one
    else if (currentColor.toLowerCase() == theMarkColor.toLowerCase()) {
        if (theAction == 'click') {
            newColor              = (thePointerColor != '')
                                  ? thePointerColor
                                  : theDefaultColor;
            marked_row[theRowNum] = (typeof(marked_row[theRowNum]) == 'undefined' || !marked_row[theRowNum])
                                  ? true
                                  : null;
        }
    } // end 4

    // 5. Sets the new color...
    if (newColor) {
        var c = null;
        // 5.1 ... with DOM compatible browsers except Opera
        if (domDetect) {
            for (c = 0; c < rowCellsCnt; c++) {
                theCells[c].setAttribute('bgcolor', newColor, 0);
            } // end for
        }
        // 5.2 ... with other browsers
        else {
            for (c = 0; c < rowCellsCnt; c++) {
                theCells[c].style.backgroundColor = newColor;
            }
        }
    } // end 5

    return true;
} // end of the 'setPointer()' function

// for windows, but it's generic
function getFormIndex(n) {
	for (var i = 0; i < n.form.elements.length; i++) {
		if(n == n.form.elements[i]) {
			return i;
		}
	}
	return -1;
}

//window calculate total functions
function getCheckedWindowOptions(form) {
	var total = 0;
	var totalPrice = 0;
	//alert(form);
	var max = form.ckbox.length;
	for (var idx = 0; idx < max; idx++) {
		if (eval("document."+ form.name +".ckbox[" + idx + "].checked") == true) {
			total += 1;
			totalPrice += parseInt(eval("document."+ form.name +".ckbox[" + idx + "].value"));
		}
	}
	eval("document." + form.name + ".addOnPrice.value=totalPrice");
}

function setBasePrice(item,amount) {
	if (isNaN(amount)) { amount = "'Choose A Color'";}
	//alert(typeof(opener.document.getElementById));
	if (typeof(opener.document.getElementById) == "undefined") {
		eval("opener.document.compare.basePrice"+item+".value="+amount);
		eval("opener.document.compare.basePriceShow"+item+".value="+amount);
	}
	
	else {
		amount=toDollarsAndCents(amount);
		eval("opener.document.getElementById('priceDivform"+item+"').innerHTML='$"+amount+"'");
		eval("opener.document.compare.basePrice"+item+".value="+amount);
		
	}
	//alert(opener.document.compare);
	getCompareTotal(opener.document.compare,item);
}

function getTotal(form) {
	getCheckedWindowOptions(form);
	addOnPrice = parseInt(eval("document."+ form.name +".addOnPrice.value"));
	basePrice = parseInt(eval("document."+ form.name +".basePrice.value"));
	totalPrice = addOnPrice+basePrice;
	if (isNaN(totalPrice)) { totalPrice = "Choose A Color";}
	if (typeof(document.getElementById) == "undefined") {
		eval("document." + form.name + ".totalPrice.value=totalPrice");
	}
	else {
		if (!(eval("document.getElementById('priceDiv" + form.name + "').innerHTML=totalPrice") )) {
			eval("document." + form.name + ".totalPrice.value=totalPrice");
		}
	}
}

function getCompareTotal(form,items) {
	//alert(items);
	items = items.split(",");
	for(var j=0; j < items.length; j++) {
		addOnPrice = 0;
		for (var i = 0; i<form.length; i++) { // for every form field
			field = form.elements[i].name;
			
			//alert(field.substr(0,5) + ":" + field.substr(5,10) + ' items'+ items[j]);
			//field39000220201 11580
			//alert(field.substring(5,10));
			//strtest.substr(field.length-5)
			if (field.substr(0,5) == "field" && field.substr(field.length-5) == items[j]) { //hardcoded the 6 cause to find the last 5 digits isn't worth it
				addOnPrice += parseFloat(form.elements[i].value);
			}
		}
		basePrice = parseFloat(eval("form.basePrice"+items[j]+".value"));
		subtotal = addOnPrice+basePrice;
		//alert(basePrice +'+'+ addOnPrice +'='+ subtotal+isNaN(subtotal));
		if (isNaN(subtotal)) {
			subtotal='Select a Color';
		}
		else {
			subtotal='$'+toDollarsAndCents(subtotal);
		}
		if (typeof(document.getElementById) == "undefined") {
			eval("form.subtotal" + items[j] + ".value=subtotal");
		}
		else {
			//alert(typeOf(window.opener));
			if (window.name == 'flyout') {
				eval("opener.document.getElementById('subtotalshow" + items[j] + "').innerHTML=subtotal");
			}
			else {
				eval("document.getElementById('subtotalshow" + items[j] + "').innerHTML=subtotal");
			}
			eval("form.subtotal" + items[j] + ".value=subtotal");
		}
	}
}


function dropit(e,whichone){
	var zindex=100
	curmenuID=(document.getElementById&&!document.all)? document.getElementById(whichone).id : eval(whichone).id
	if (window.themenu&&themenu.id!=curmenuID)
	themenuStyle.visibility=document.layers?"hide" : "hidden"

	themenu=(document.getElementById&&!document.all)? document.getElementById(whichone): eval(whichone)
	themenuStyle=((document.getElementById&&!document.all)||document.all)? themenu.style : themenu
	
	themenuoffsetX=(document.all&&(navigator.userAgent.indexOf("Opera"))==-1)? document.body.scrollLeft : 0
	themenuoffsetY=(document.all&&(navigator.userAgent.indexOf("Opera"))==-1)? document.body.scrollTop : 0

	themenuStyle.left=(document.getElementById&&!document.all)||document.layers? e.pageX-e.layerX : themenuoffsetX+event.clientX-event.offsetX
	themenuStyle.top=(document.getElementById&&!document.all)||document.layers? e.pageY-e.layerY+19 : themenuoffsetY+event.clientY-event.offsetY+18
	
	hiddenconst=((document.getElementById&&!document.all)||document.all)? "hidden" : "hide"
	if (themenuStyle.visibility==hiddenconst){
		themenuStyle.visibility=((document.getElementById&&!document.all)||document.all)? "visible" : "show"
		themenuStyle.zIndex=zindex++
	}
	else {
		hidemenu()
	}
	return false
}

function hidemenu(){
	if ((document.all||(document.getElementById&&!document.all))&&window.themenu)
	themenuStyle.visibility="hidden"
	else if (document.layers)
	themenu.visibility="hide"
}

if (document.all||(document.getElementById&&!document.all))
	document.onclick=hidemenu


// Show/Hide functions for non-pointer layer/objects
function toggleVisObjects(pattern,form,items) {
	compareOpt.load();
	var tags = new Array("DIV","SPAN")
	for(var i=0; i < tags.length; i++) {
		var corTags = window.document.getElementsByTagName(tags[i]);
		for(var j=0; j < corTags.length; j++) {
			if(corTags[j].id.substring(0,pattern.length) == pattern) {
				togglevis(corTags[j].id);
			}
		}
	}
	compareOpt.store();
	getCompareTotal(form,items);
}

function toggleVisRadio(pattern,form,items) {
	var tags = new Array("DIV","SPAN")
	var radioOptNum ="";
	compareOpt.load();
	//alert(pattern);
	for(var i=0; i < tags.length; i++) {
		var corTags = window.document.getElementsByTagName(tags[i]);
		for(var j=0; j < corTags.length; j++) {
			if(corTags[j].id.substring(0,pattern.length) == pattern) {
				radioOptNum = corTags[j].id.substring(6,10);
				showNadd(corTags[j].id);
				eval("compareOpt.r"+radioOptNum+"=1");
				//alert(optNum);
			}
			else if (corTags[j].id.substring(0,7) == pattern.substring(0,7)) {
				//alert(pattern);
				radioOptNum = corTags[j].id.substring(6,10);
				hideVis(corTags[j].id);
				eval("compareOpt.r"+radioOptNum+"=0");
				//hideNclear(corTags[j].id);
			}
		}
	}
	compareOpt.store();
	getCompareTotal(form,items);
}

function togglevis(id) {
	var optNum = id.substring(5,9);
	if (document.layers) {
		if (document.layers[id].visibility=="show") {
			hideNclear(id);
		}
		else {
			showNadd(id);
		}
	}
	else if (document.all) {
		if (document.all[id].style.visibility=="visible") {
			hideNclear(id);
		}
		else {
			showNadd(id);
		}
	}
	else if (document.getElementById) {
		if(document.getElementById(id).style.visibility == 'visible') {
			hideNclear(id);
			eval("compareOpt.a"+optNum+"=0");
		}
		else {
			showNadd(id);
			//alert(optNum);
			eval("compareOpt.a"+optNum+"=1");
		}
	}

	/*
	if(document.getElementById(id).style.display == 'none'){
		document.getElementById(id).style.display = 'block';
	}
	*/
}

function hideVis(id) {
	if (document.layers) {
		if (document.layers[id].visibility=="show") {
			hideNclear(id);
		}
	}
	else if (document.all) {
		if (document.all[id].style.visibility=="visible") {
			hideNclear(id);
		}
	}
	else if (document.getElementById) {
		//alert(id.value);
		if(document.getElementById(id).style.visibility == 'visible') {
			hideNclear(id);
		}
	}
}

function showNadd(id) {
	show(id);
	eval('document.compare.field'+id.substr(5)+'.value = document.compare.keep'+id.substr(5)+'.value;');//uses substr(5) to not count 'field' of the id  
}

function hideNclear(id) {
	hide(id);
	eval('document.compare.field'+id.substr(5)+'.value = 0;'); //uses substr(5) to not count 'field' of the id 
}

function show(id) {
	if (document.layers) {document.layers[id].visibility = "show";}
	else if (document.all) {document.all[id].style.visibility = "visible";}
	else if (document.getElementById) {document.getElementById(id).style.visibility = "visible";}
}

function hide(id) {
	if (document.layers) document.layers[id].visibility = "hide"
	else if (document.all) document.all[id].style.visibility = "hidden"
	else if (document.getElementById) {document.getElementById(id).style.visibility = "hidden";}
}


// functions for the blinds rollover photo gallery
// on off and ToggleNode
function on(img){
	document['image'+img].src = eval('image' + img + 'on.src');
	document['otherimage'].src = eval('otherimage' + img + '.src');
	//toggle('Layer'+img);
	//toggle('Default');
}
function off(img){
	document['image'+img].src = eval('image' + img + 'off.src');
	document['otherimage'].src = otherimageDefault.src;
	//toggle('Layer'+img);
	//toggle('Default');
}


//this function is used in the glossary area to swap out the folder from open to closed and closed to open
function imageToggle(daImage, src1, src2, netscape_container, entire_container){
  var objStr,obj;
  // Check to make sure that images are supported in the DOM.
	  myImage = document.images[daImage];
  if(document.layers){
      myImage = document.layers[entire_container].document.layers[netscape_container].document.images[daImage];
  }
  if(document.images){
    // Check to see whether you are using a name, number, or object
      if(myImage.src == src1){
	  	myImage.src = src2;
      } else {
	  	myImage.src = src1;
      }
  }
}

function toDollarsAndCents(n) {
  var s = "" + Math.round(n * 100) / 100
  var i = s.indexOf('.')
  if (i < 0) return s + ".00"
  var t = s.substring(0, i + 1) + s.substring(i + 1, i + 3)
  if (i + 2 == s.length) t += "0"
  return t
}

function verifyQuickOrder(f){ 
		var pattern=/quantity/;
		var num='0';
		var qCheck=true;
		var tmpCheck=false;
		for (var i=0;i<f.length;i++) {
			var e=f.elements[i]; 
			if (pattern.test(e.name)==true){ 
					//alert(e.value);
					curNum = e.name.substr(0,1);
					if (curNum != num) {
						num=curNum;
						if (qCheck==true){qCheck=tmpCheck;}
						tmpCheck=false;					
					}
					if ((e.value!='') && (!isNaN(e.value))) {
						//alert(e.value);
						if (e.value!=0){
							tmpCheck=true;
						}
					}	
			}
		}
		if ((qCheck==true)&&(tmpCheck==false)){qCheck=tmpCheck;}
		if (qCheck==false){alert('Invalid Quantity. Please make sure at least one quantity box is filled for each item.');}
		return qCheck;
	}
	
function changeImage(imgName,imgSrc) {
	//used for quick order in clsItem
	document[imgName].src=imgSrc;
	}
	
function addEmails() {
//used in wishlist to add email address to the sendTo box of the send wishlist form
	if(opener.document.sendEmail.sendTo.value == "name@name.com; anotherfriend@name.com;"){
		opener.document.sendEmail.sendTo.value = "";
	}
	if(document.chooseList.email.length > 0 ){
		for (var i=0;i<document.chooseList.email.length;i++) {
			if (document.chooseList.email[i].checked == true) {
				//alert(document.chooseList.email[i].value);
				opener.document.sendEmail.sendTo.value += document.chooseList.email[i].value +'; ';
			}
		}
	}
	else {
		if (document.chooseList.email.checked == true) {
				//alert(document.chooseList.email[i].value);
				opener.document.sendEmail.sendTo.value += document.chooseList.email.value +'; ';
		}
	}
	//return false;
}

/***********
 *function that sets radio button of a certain value
 *used in windows radioBuildAssociations when a drop down box is changed
 */
function setRadioButton(radioGroup, selValue){
  for (i = 0; i < radioGroup.length; i++){
    if (radioGroup[i].value == selValue){
      radioGroup[i].checked = true;
    }
  } 
}


//******************** begin absolutely positioned scrollable area object scripts 

function verifyCompatibleBrowser(){ 
    this.ver=navigator.appVersion 
    this.dom=document.getElementById?1:0 
    this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom)?1:0; 
    this.ie4=(document.all && !this.dom)?1:0; 
    this.ns5=(this.dom && parseInt(this.ver) >= 5) ?1:0; 
    this.ns4=(document.layers && !this.dom)?1:0; 
    this.bw=(this.ie5 || this.ie4 || this.ns4 || this.ns5) 
    return this 
} 


var speed=50;
var loop;
var timer;
var initialised; 
 
function ConstructObject(obj,nest){ 
    bw=new verifyCompatibleBrowser() ;
    nest=(!nest) ? '':'document.'+nest+'.' 
    this.el=bw.dom?document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?eval(nest+'document.'+obj):0; 
    this.css=bw.dom?document.getElementById(obj).style:bw.ie4?document.all[obj].style:bw.ns4?eval(nest+'document.'+obj):0; 
    this.scrollHeight=bw.ns4?this.css.document.height:this.el.offsetHeight 
    this.clipHeight=bw.ns4?this.css.clip.height:this.el.offsetHeight 
    this.up=MoveAreaUp;this.down=MoveAreaDown; 
    this.MoveArea=MoveArea; this.x; this.y; 
    this.obj = obj + "Object" 
    eval(this.obj + "=this") 
    return this 
} 

function MoveArea(x,y){ 
    this.x=x;this.y=y 
    this.css.left=this.x 
    this.css.top=this.y 
} 
 
function MoveAreaDown(move){ 
	if(this.y>-this.scrollHeight+objContainer.clipHeight){ 
    this.MoveArea(0,this.y-move) 
    if(loop) setTimeout(this.obj+".down("+move+")",speed) 
	} 
} 
function MoveAreaUp(move){ 
	if(this.y<0){ 
    this.MoveArea(0,this.y-move) 
    if(loop) setTimeout(this.obj+".up("+move+")",speed) 
	} 
} 
 
function PerformScroll(speed){ 
	if(initialised){ 
		loop=true;
		if(speed>0) objScroller.down(speed) 
		else objScroller.up(speed) 
	} 
} 
 
function CeaseScroll(){ 
    loop=false 
    if(timer) clearTimeout(timer) 
} 

function InitialiseScrollableArea(){ 
    objContainer=new ConstructObject('divScrollContainer');
    objScroller=new ConstructObject('divScrollContent','divScrollContainer');
    objScroller.MoveArea(0,0);
    objContainer.css.visibility='visible';
    initialised=true; 
} 
//****************** end absolutely positioned scrollable area object scripts

/***********
 *function that gets the values of the first order form and saves the window
 */
function saveWindow(){
    var item=document.getElementById('item').value;
    var colorInv2=document.getElementById('colorInv2').value;
    var color=document.getElementById('color').value;
    var width=document.getElementById('width').value;
    var width_fraction=document.getElementById('width_fraction').value;
    var height=document.getElementById('height').value;
    var height_fraction=document.getElementById('height_fraction').value;
    var room=document.getElementById('room').value;
    var mount=document.getElementById('mount').value;

    pop('winpop.php?item='+item+'&colorInv2='+colorInv2+'&color='+color+'&width='+width+'&width_fraction='+width_fraction+'&height='+height+'&height_fraction='+height_fraction+'&room='+room+'&mount='+mount+'&saved=addwindowQS',540,330);
}
function switchSortOption(newOption){    
    $("#sortOptions li.bold").removeClass("bold");
    $("#"+newOption).addClass("bold");
}

function calulateCustomRugPrice(){
    var widthFt=document.getElementById('widthFt').value;
    var widthIn=document.getElementById('widthIn').value;
    var lengthFt=document.getElementById('lengthFt').value;
    var lengthIn=document.getElementById('lengthIn').value;
    var ppsf=document.getElementById('ppsq').value;
    var minWidth=document.getElementById('minwidth').value;
    var maxWidth=document.getElementById('maxwidth').value;
    var minLength=document.getElementById('minlength').value;
    var maxLength=document.getElementById('maxlength').value;
    var errors="";//document.getElementById('errors');
    var noErrors=true;

    if(widthFt!="" && lengthFt!=""){
        var width = Number(widthFt) + (widthIn/12);
        var length = Number(lengthFt) + (lengthIn/12);
        if(isNaN(width)){errors+="Please enter a valid width.";}
        else{
            if(width < minWidth){
               errors+="Minimum width is "+minWidth+" ft., please enter a larger width.<br />";
            }
            if(width > maxWidth){
               errors+="Maximum width is "+maxWidth+" ft., please enter a smaller width.<br />";
            }
        }
        if(isNaN(length)){errors+="Please enter a valid length.";}
        else{
            if(length < minLength){
               errors+="Minimum length is "+minLength+" ft., please enter a larger length.<br />";
            }
            if(length > maxLength){
               errors+="Maximum length is "+maxLength+" ft., please enter a smaller length.<br />";
            }
        }
        document.getElementById('errors').innerHTML=errors;
        
        if(errors==""){
            var price = width * length * ppsf;
            price=toDollarsAndCents(price);
            document.getElementById('price').innerHTML=price;
            document.getElementById('addToCartBtn').disabled=false;
        }
        else{
            
            document.getElementById('price').innerHTML="N/A";
            document.getElementById('addToCartBtn').disabled=true;
        }
    }
    else{
        document.getElementById('price').innerHTML="N/A";
        document.getElementById('addToCartBtn').disabled=true;
    }
    
}


// End the hiding -->