var searchDefaultText = "Search by name, keyword, or item #";

function initSelectInline () {		
		if(window.attachEvent) { (!document.getElementById("hb-nav")) ? window.attachEvent("onload", sfHover) : sfHover(); }
		(!document.getElementById('search-select')) ? addEventSimple(window,"load",initSelect) : initSelect();
		//(!document.getElementById("search-input")) ? addEventSimple(window,"load",initInputBox) : initInputBox();
}

function initSelect () {
var sel = document.getElementById('search-select');
if (!sel) return;
sel.style.display = "none";

var div = document.createElement('div');

div.className = 'select-bg';

var ul = document.createElement('ul');
  ul.className = 'select-replacement';
  // collect our object’s options

  var obj = document.getElementById('search-select');
  var opts = obj.options;
  // iterate through them, creating <li>s
  for (var i=0; i<opts.length; i++) {
    var li = document.createElement('li');
	var a = document.createElement('a');
    var txt = document.createTextNode(opts[i].text);
	a.appendChild(txt);
    li.appendChild(a);
    li.selIndex = opts[i].index;
    li.selectID = obj.id;
	li.onclick = function() {
			selectMe(this);	
		}
	
	if(opts[i].selected){
		li.className = "top";
		li.onclick = function() {  
			hideFlash(); 
			this.parentNode.className += ' selectOpen';
			var lis = this.parentNode.getElementsByTagName('li');
			lis[0].className = 'top';
			if(this != lis[0])
				this.className = "selected";
			this.onclick = function () {
			selectMe(this);
			}
		}
		
	}
	    
	if (window.attachEvent) {
      li.onmouseover = function() {
        this.className += ' hover';
      }
      li.onmouseout = function() {
        this.className = 
          this.className.replace(new RegExp(" hover\\b"), '');
      }
    }
    
    ul.appendChild(li);
    
    if(opts[i].selected){
        var lis = ul.getElementsByTagName('li');
        var first_item = ul.firstChild;
        var copy_item = first_item.cloneNode(true);
        copy_item.className='';
        ul.insertBefore(copy_item, first_item);
    
        lis[0].innerHTML = li.innerHTML;
        lis[0].selectID = li.selectID;
        lis[0].selIndex = li.selIndex;
        
        lis[0].onclick = function() {
	        selectMe(this);
	    }
	}
    
  }
  // add the ul to the form
  div.appendChild(ul)
  obj.parentNode.appendChild(div);
}

function initSelectNoResults () {
	
var sel = document.getElementById('search-select-nr');
if (!sel) return;

sel.style.display = "none";

var div = document.createElement('div');

div.className = 'select-bg';

var ul = document.createElement('ul');
  ul.className = 'select-replacement';
  // collect our object’s options

  var obj = document.getElementById('search-select-nr');
  var opts = obj.options;
  // iterate through them, creating <li>s
  for (var i=0; i<opts.length; i++) {
    var li = document.createElement('li');
	var a = document.createElement('a');
    var txt = document.createTextNode(opts[i].text);
	a.appendChild(txt);
    li.appendChild(a);
    li.selIndex = opts[i].index;
    li.selectID = obj.id;
	li.onclick = function() {
			selectMe(this);	
		}
	if(opts[i].selected){;
		li.className = "top";
		li.onclick = function() {
			this.parentNode.className += ' selectOpen';
			
			var lis = this.parentNode.getElementsByTagName('li');
			
			lis[0].className = 'top';
			if(this != lis[0])
				this.className = "selected";
			this.onclick = function () {
			selectMe(this);
			}
		}		
	}
	if (window.attachEvent) {
          li.onmouseover = function() {
            this.className += ' hover';
          }
          li.onmouseout = function() {
            this.className = 
              this.className.replace(new RegExp(" hover\\b"), '');
          }
    }
    ul.appendChild(li);
  }
  // add the ul to the form
  div.appendChild(ul)
  obj.parentNode.appendChild(div);
}
function selectMe(obj) {
      var lis = obj.parentNode.getElementsByTagName('li');
      for (var i=0; i<lis.length; i++) {
        if (lis[i] != obj) {
          lis[i].className='';
          lis[i].onclick = function() {
            selectMe(this);
          }
       } else {
		  lis[0].innerHTML = obj.innerHTML;
		  lis[0].selectID = obj.selectID;
		  lis[0].selIndex = obj.selIndex;
		   
          setVal(obj.selectID, obj.selIndex);
          obj.className='top';
          obj.parentNode.className = 
            obj.parentNode.className.replace(new RegExp(" selectOpen\\b"), '');
		  showFlash();
          obj.onclick = function() {
		  	hideFlash();
            obj.parentNode.className += ' selectOpen';
			lis[0].className = 'top';
			if(lis[0] == obj) {
				for(var j = 1; j<lis.length; j++) {
					if(lis[0].innerHTML == lis[j].innerHTML)
						lis[j].className = 'selected';
				}
			}
			else
				obj.className = 'selected';
            this.onclick = function() {
              selectMe(this);
            }
          }
        }
      }
}
function setVal(objID,val) {
  var obj = document.getElementById(objID);
  obj.selectedIndex = val;
}
function searchFocus(textInput) {
	if (textInput.value == searchDefaultText)
		textInput.value = "";
}
function searchBlur(textInput) {
	if (textInput.value == "")
		textInput.value = searchDefaultText;
}
function initInputBox() {
	var input = document.getElementById("search-input");
	if(input) {
		if(input.value == "") {
			input.value = searchDefaultText; 
		}
		input.onfocus = function() {
			searchFocus(input)
		}
		input.onblur = function() {
			searchBlur(input);		
		}
	}
}

addEventSimple(window,"load",initSelectNoResults);

	function addEventSimple(obj,evt,fn) {
		if (obj.addEventListener)
			obj.addEventListener(evt,fn,false);
		else if (obj.attachEvent)
			obj.attachEvent('on'+evt,fn);
	}
	

// clear store locator zip code field
function clearInput(form,name) {
	form[name].value="";
	return true;
}	