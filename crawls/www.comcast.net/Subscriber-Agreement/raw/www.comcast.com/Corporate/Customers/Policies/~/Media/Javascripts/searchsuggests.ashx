/**
    * Global vars
    */
    __AutoComplete = new Array();
    var user_typed_query;
    var toDisplay;
    var isMouseOverSearchPanel = false;
    var mySearchTimer = null;
    
    // Basic UA detection
    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;    
    /**
    * Attachs the autocomplete object to a form element. Sets
    * onkeypress event on the form element.
    * 
    * @param string formElement Name of form element to attach to
    * @param array  data        Array of strings of which to use as the autocomplete data
    */
    function AutoComplete_Create (id, url) {
        if (document.getElementById(id) == null) { return; }
        //this will remove the onchange of the search textbox because the form was causing a postback
        document.getElementById(id).onchange = function(e) { return false; }
            __AutoComplete[id] = { 'url': url,
                'isVisible': false,
                'element': document.getElementById(id),
                'dropdown': null,
                'highlighted': null,
                'close': null,
                'term_at_close': ""
            };

            __AutoComplete[id]['element'].setAttribute('autocomplete', 'off');
            __AutoComplete[id]['element'].onkeydown = function(e) { return AutoComplete_KeyDown(this.getAttribute('id'), e); }
            __AutoComplete[id]['element'].onkeyup = function(e) { return AutoComplete_KeyUp(this.getAttribute('id'), e); }
            __AutoComplete[id]['element'].onkeypress = function(e) { if (!e) e = window.event; if (e.keyCode == 13 || isOpera) return false; }
            __AutoComplete[id]['element'].ondblclick = function(e) { return AutoComplete_DoubleClick(this.getAttribute('id'), e); }
            __AutoComplete[id]['element'].onclick = function(e) { if (!e) e = window.event; e.cancelBubble = true; e.returnValue = false; }

            if (document.addEventListener) {
                document.addEventListener('click', CloseSearchPanel, false);
            } else if (document.attachEvent) {
            document.attachEvent('onclick', CloseSearchPanel, false);
            }

            // Max number of items shown at once
            if (arguments[2] != null) {
                __AutoComplete[id]['maxitems'] = arguments[2];
                __AutoComplete[id]['firstItemShowing'] = 1;
                __AutoComplete[id]['lastItemShowing'] = arguments[2];
            }

            AutoComplete_CreateDropdown(id);
        
    }

    
    /**
    * Creates the dropdown layer
    * 
    * @param string id The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_CreateDropdown(id) {

        if (__AutoComplete != null) {            
            __AutoComplete[id]['dropdown'] = document.createElement('div');
            __AutoComplete[id]['dropdown'].className = 'autocomplete'; // Don't use setAttribute()
            __AutoComplete[id]['dropdown'].id = 'autocomplete';
            __AutoComplete[id]['dropdown'].onmouseover = function(e) { MouseOverSearchPanel(); return false; }
            __AutoComplete[id]['dropdown'].onmouseout = function(e) { MouseOutSearchPanel(); return false; }

            __AutoComplete[id]['element'].parentNode.insertBefore(__AutoComplete[id]['dropdown'], __AutoComplete[id]['element'].nextSibling);


            __AutoComplete[id]['dropdown'].style.zIndex = '99';
            __AutoComplete[id]['dropdown'].style.display = 'none';

            __AutoComplete[id]['close'] = document.createElement('b');
            __AutoComplete[id]['close'].className = 'close';
            __AutoComplete[id]['close'].id = 'acclose';
            newA = document.createElement('a');
            newA.setAttribute("title", "Close");
            newA.onclick = function() { closeSuggestions(id); }
            text = document.createTextNode("Close");
            newA.appendChild(text);
            __AutoComplete[id]['close'].appendChild(newA);

            __AutoComplete[id]['element'].parentNode.insertBefore(__AutoComplete[id]['close'], __AutoComplete[id]['dropdown'].nextSibling);
            __AutoComplete[id]['close'].style.display = 'none';

        }
    }
 
    /**
    * Shows the dropdown layer
    * 
    * @param string id The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_ShowDropdown(id) {
      
        __AutoComplete[id]['isVisible'] = false;

        var value = qctrim(__AutoComplete[id]['element'].value).toLowerCase();

        var url = __AutoComplete[id]['url'] + "?q=" + value + "&cat=qc";

        if (value.length == 0) { __AutoComplete[id]['term_at_close'] = ""; }

        if (value.length < 1 || __AutoComplete[id]['term_at_close'] != "") {
            AutoComplete_HideDropdown(id);
            return;
        }


        var flashwrapper = document.getElementById('FlashWrapper');
        if (flashwrapper != null) {
            flashwrapper.style.cssText = '#z-Index: -1 ! important;';
        }

        initSuggestion(id);
    }
 
    function closeSuggestions(id) {
         AutoComplete_HideDropdown(__AutoComplete[id]['element'].getAttribute('id'));
         __AutoComplete[id]['term_at_close'] = __AutoComplete[id]['element'].value;
         __AutoComplete[id]['element'].ondblclick = "";
        
        /* To place the cursor at the end of the input field in IE when user clicks close button */
        
        if (__AutoComplete[id]['element'].createTextRange)
        {
           var FieldRange = __AutoComplete[id]['element'].createTextRange();
           FieldRange.moveStart('character',__AutoComplete[id]['element'].value.length);
           FieldRange.collapse();
           FieldRange.select();
        }
        else  {
           __AutoComplete[id]['element'].focus();
        }
    }


    function initSuggestion(id) {
       
        var searchfield = document.getElementById(id);
        var keyword = searchfield.value;
       
        var suggestion = new RemoteMethod('QueryCompletion', 'GetKeywords', keyword);
        suggestion.LocalAction = function(args) {

            if (args != null && args != undefined) {

                if (eval('(' + args + ')')._result != null) {

                    var sugList = eval('(' + args + ')')._result;

                    if (eval('(' + args + ')')._keyword == keyword) {
                        setSuggestions(id, sugList);

                    }
                }
            }
        }
            suggestion.Invoke();
                        
    }
    
    
    function setSuggestions(id,sugList) {

        toDisplay = new Array();

       
        
        for (i=0,j=0; i < sugList.length; i+=1) {
           toDisplay[j++] = sugList[i].replace(/&#039;/g,"'").replace(/&#034;/g,'"');
        } 

        var newDiv    = null;
        var newP = null;
        var text      = null;
        var numItems  = __AutoComplete[id]['dropdown'].childNodes.length;
        var value = qctrim(__AutoComplete[id]['element'].value);
        // Remove all child nodes from dropdown
        while (__AutoComplete[id]['dropdown'].childNodes.length > 0) {
            __AutoComplete[id]['dropdown'].removeChild(__AutoComplete[id]['dropdown'].childNodes[0]);
        }

        // No Data?
        if (toDisplay.length == 0) {
            AutoComplete_HideDropdown(id);
            return;
        }

        // Add data to the dropdown layer
       
	newP = document.createElement('p');
	newP.id = 'suggestions';
	newP.onmouseover = function() {AutoComplete_HighlightItem(__AutoComplete[id]['element'].getAttribute('id'), 1);};
	newP.onclick = function() {AutoComplete_SetValue(__AutoComplete[id]['element'].getAttribute('id')); AutoComplete_HideDropdown(__AutoComplete[id]['element'].getAttribute('id'));submit_form(id);}
	text   = document.createTextNode("Suggestions");
        newP.appendChild(text);            
        __AutoComplete[id]['dropdown'].appendChild(newP);

        for (i=0; i<toDisplay.length; ++i) {        
            newDiv = document.createElement('div');            
            newDiv.className = 'autocomplete_item'; // Don't use setAttribute()
            newDiv.setAttribute('id', 'autocomplete_item_' + i);
            newDiv.setAttribute('index', i+1);
            newDiv.style.zIndex = '99';

            newDiv.onmouseover = function() {AutoComplete_HighlightItem(__AutoComplete[id]['element'].getAttribute('id'), this.getAttribute('index'));};
            newDiv.onclick     = function() {AutoComplete_SetValue(__AutoComplete[id]['element'].getAttribute('id')); AutoComplete_HideDropdown(__AutoComplete[id]['element'].getAttribute('id'));submit_form(id);}
 
            var trunc_sugg = ""; 
            if (i==0) { 
              trunc_sugg = limitStr(toDisplay[i],30); 
            }
            else {
              trunc_sugg = limitStr(toDisplay[i],40); 
            }
            var index = trunc_sugg.indexOf(value);

            if (index != -1)
            { 
                var newB = document.createElement('b');
                text = document.createTextNode(trunc_sugg.substring(0,index));
                newDiv.appendChild(text);
                text = document.createTextNode(value);
                newB.appendChild(text);
                newDiv.appendChild(newB);
                text = document.createTextNode(trunc_sugg.substring(index+value.length));
                newDiv.appendChild(text);              
            }
            else {
                text = document.createTextNode(trunc_sugg);
                newDiv.appendChild(text);
            }
            __AutoComplete[id]['dropdown'].appendChild(newDiv);                      
        }
        
        
        // Too many items?
        if (toDisplay.length > __AutoComplete[id]['maxitems']) {
           __AutoComplete[id]['dropdown'].style.height = (__AutoComplete[id]['maxitems'] * 17) + 2 + 'px';
        } else {
            __AutoComplete[id]['dropdown'].style.height = '';
        }

        // Show dropdown
        if (!__AutoComplete[id]['isVisible']) {
            __AutoComplete[id]['dropdown'].style.display = 'block';            
            __AutoComplete[id]['isVisible'] = true;
            __AutoComplete[id]['dropdown'].scrollTop = 0;
            __AutoComplete[id]['close'].style.top = __AutoComplete[id]['dropdown'].offsetHeight + __AutoComplete[id]['dropdown'].offsetTop + 'px' ;
            __AutoComplete[id]['close'].style.display = 'block';
            
        }

        
        // If now showing less items than before, reset the highlighted value
        if (__AutoComplete[id]['dropdown'].childNodes.length != numItems) {
            __AutoComplete[id]['highlighted'] = null;
        }
    }
    
    
    /**
    * Hides the dropdown layer
    * 
    * @param string id The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_HideDropdown(id) {
        if (typeof __AutoComplete[id]['dropdown'] != 'undefined') {            
            __AutoComplete[id]['dropdown'].style.display = 'none';
            __AutoComplete[id]['highlighted'] = null;
            __AutoComplete[id]['isVisible'] = false;
            __AutoComplete[id]['close'].style.display = 'none';
        }
    }
    
    
    /**
    * Hides all dropdowns
    */
    function AutoComplete_HideAll()
    {
    
        for (id in __AutoComplete) {
            AutoComplete_HideDropdown(id);
        }
    }
    
    
    /**
    * Highlights a specific item
    * 
    * @param string id    The form elements id. Used to identify the correct dropdown.
    * @param int    index The index of the element in the dropdown to highlight
    */
    function AutoComplete_HighlightItem(id, index)
    {
        if (__AutoComplete[id]['dropdown'].childNodes[index]) {
            for (var i=0; i<__AutoComplete[id]['dropdown'].childNodes.length; ++i) {
                if (__AutoComplete[id]['dropdown'].childNodes[i].className == 'autocomplete_item_highlighted') {
                    __AutoComplete[id]['dropdown'].childNodes[i].className = 'autocomplete_item';
                }
            }
            
            __AutoComplete[id]['dropdown'].childNodes[index].className = 'autocomplete_item_highlighted';
            __AutoComplete[id]['highlighted'] = index;
       }
    }


    /**
    * Highlights the menu item with the given index
    * 
    * @param string id    The form elements id. Used to identify the correct dropdown.
    * @param int    index The index of the element in the dropdown to highlight
    */
    function AutoComplete_Highlight(id, index)
    {
        if (__AutoComplete[id]['highlighted'] == null)
    	{
	    	__AutoComplete[id]['highlighted'] = 0;
    	}

        // Out of bounds checking
        if (index == 1 && __AutoComplete[id]['highlighted'] == __AutoComplete[id]['dropdown'].childNodes.length - 1) {
            __AutoComplete[id]['dropdown'].childNodes[__AutoComplete[id]['highlighted']].className = 'autocomplete_item';
            __AutoComplete[id]['highlighted'] = 0;
            return; 
        } 
        else if (index == -1 && __AutoComplete[id]['highlighted'] == 0) {
            __AutoComplete[id]['highlighted'] = __AutoComplete[id]['dropdown'].childNodes.length;
        }

        // Nothing highlighted at the moment
        if ((__AutoComplete[id]['highlighted'] == 0) && (__AutoComplete[id]['dropdown'].childNodes[1])) {
            __AutoComplete[id]['dropdown'].childNodes[1].className = 'autocomplete_item_highlighted';
            __AutoComplete[id]['highlighted'] = 1;

        } else {
            if ((__AutoComplete[id]['dropdown'].childNodes[__AutoComplete[id]['highlighted']]) && (__AutoComplete[id]['highlighted'] != 0)) {
                __AutoComplete[id]['dropdown'].childNodes[__AutoComplete[id]['highlighted']].className = 'autocomplete_item';
            }
            if (__AutoComplete[id]['highlighted'] != 0)
            {
	            var newIndex = parseInt(__AutoComplete[id]['highlighted'],10) + index;	
	            if ((__AutoComplete[id]['dropdown'].childNodes[newIndex]) && (newIndex != 0)) {
	                __AutoComplete[id]['dropdown'].childNodes[newIndex].className = 'autocomplete_item_highlighted';
	            }    
	            __AutoComplete[id]['highlighted'] = newIndex;
	    }  
        }
    }


    /**
    * Sets the input to a given value
    * 
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_SetValue(id)
    {
          if (__AutoComplete[id]['highlighted'] == 0 ) 
          {          
               __AutoComplete[id]['element'].value = user_typed_query;
          }
          else
          {
               __AutoComplete[id]['element'].value = toDisplay[__AutoComplete[id]['highlighted']-1];
          } 
   }
    
    
    /**
    * Checks if the dropdown needs scrolling
    * 
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_ScrollCheck(id)
    {
        // Scroll down, or wrapping around from scroll up
        if (__AutoComplete[id]['highlighted'] > __AutoComplete[id]['lastItemShowing']) {
            __AutoComplete[id]['firstItemShowing'] = __AutoComplete[id]['highlighted'] - (__AutoComplete[id]['maxitems'] - 1);
            __AutoComplete[id]['lastItemShowing']  = __AutoComplete[id]['highlighted'];
        }
        
        // Scroll up, or wrapping around from scroll down
        if (__AutoComplete[id]['highlighted'] < __AutoComplete[id]['firstItemShowing']) {
            __AutoComplete[id]['firstItemShowing'] = __AutoComplete[id]['highlighted'];
            __AutoComplete[id]['lastItemShowing']  = __AutoComplete[id]['highlighted'] + (__AutoComplete[id]['maxitems'] - 1);
        }
         
        if (id == "search-fieldBtm") {
          __AutoComplete[id]['dropdown'].scrollTop = (__AutoComplete[id]['firstItemShowing'] - 1) * 17;
        }
        else {
          __AutoComplete[id]['dropdown'].scrollTop = (__AutoComplete[id]['firstItemShowing'] - 1) * 19;        
        } 
   }


    /**
    * Function which handles the keypress event
    * 
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_KeyDown(id) {
       
    
    var searchField = document.getElementById(id);
    if (searchField != null && searchField.value != '') 
    {

        // Mozilla
        if (arguments[1] != null) {
            event = arguments[1];
        }

        var keyCode = event.keyCode;
                
        switch (keyCode) {

            // Return/Enter
            case 13:
                if (__AutoComplete[id]['highlighted'] != null) {
                    AutoComplete_SetValue(id);
                    AutoComplete_HideDropdown(id);
                }
                
                event.returnValue = false;
                event.cancelBubble = true;
                submit_form(id);
                break;

            // Escape
           case 27:
                if (__AutoComplete[id]['isVisible']) {
                    __AutoComplete[id]['element'].value = user_typed_query;
                }
                AutoComplete_HideDropdown(id);
                event.returnValue = false;
                event.cancelBubble = true;
                break;
            
            // Up arrow
            case 38:
                if (!__AutoComplete[id]['isVisible']) {
                    user_typed_query = __AutoComplete[id]['element'].value;
                    if (__AutoComplete[id]['term_at_close'] != "") {
                      __AutoComplete[id]['term_at_close']="";
                      AutoComplete_ShowDropdown(id);
                      return;
                    }
                    else {
                      AutoComplete_ShowDropdown(id);
                    } 
                }
                    AutoComplete_Highlight(id, -1);
                    AutoComplete_SetValue(id);
                    AutoComplete_ScrollCheck(id, -1);
                return false;
                break;
            
            // Tab
            case 9:
                if (__AutoComplete[id]['isVisible']) {
                    AutoComplete_HideDropdown(id);
                }
                return;
            
            // Down arrow
            case 40:
                if (!__AutoComplete[id]['isVisible']) {
                    user_typed_query = __AutoComplete[id]['element'].value;
                    if (__AutoComplete[id]['term_at_close'] != "") {
                      __AutoComplete[id]['term_at_close']="";
                      AutoComplete_ShowDropdown(id);
                      return;
                    }
                    else {
                      AutoComplete_ShowDropdown(id);
                    }
                }
                    AutoComplete_Highlight(id, 1);
                    AutoComplete_SetValue(id);
                    AutoComplete_ScrollCheck(id, 1);
                return false;
                break;
        }
    }   
    
    }


    /**
    * Function which handles the keyup event
    * 
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_KeyUp(id) {

        // Mozilla
        if (arguments[1] != null) {
            event = arguments[1];
        }

        var keyCode = event.keyCode;

        
        var searchField = document.getElementById(id);
        if (searchField != null && searchField.value != '') 
        {            

            switch (keyCode)
             {
                case 13:
                    event.returnValue = false;
                    event.cancelBubble = true;
                    submit_form(id);
                    break;

                case 27:
                    AutoComplete_HideDropdown(id);
                    event.returnValue = false;
                    event.cancelBubble = true;
                    break;

                case 38:
                case 40:
                    return false;
                    break;

                default:
                    user_typed_query = __AutoComplete[id]['element'].value;
                    AutoComplete_ShowDropdown(id);
                    break;
               }
           }
           if (searchField.value == '') {
               AutoComplete_HideAll();
               if (keyCode == 8) {
                   __AutoComplete[id]['term_at_close'] = "";
               } 
           }
                           
        }
    
    /**
    * Returns whether the dropdown is visible
    * 
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_isVisible(id)
    {
        return __AutoComplete[id]['dropdown'].style.display == 'block';
    }

function submit_form(id)
{
    if (id == "searchField") {
        var searchForm = document.getElementById("SearchForm");
        if (searchForm != null) {
            searchForm.submit();
        }
        else {
            var menuSearch = document.getElementById("menuSearch");
            if (menuSearch != null) 
                menuSearch.submit();
                    
        }
    }
    else {
        //alert('submit_form');
        var aspnetForm = document.forms[0];
        if (aspnetForm != null)
            aspnetForm.submit();
                    
    }   
}

// remove multiple, leading or trailing spaces
function qctrim(s) {
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s;
}

function limitStr(long_str,length)
{
   if (length == 0 || long_str.length <= length ) {
      return long_str;
   }
   else {
      return long_str.substring(0, length) + '...';
   }
}

/**
* Returns when user double clicks in search field
* 
* @param string id    The form elements id. Used to identify the correct dropdown.
*/
function AutoComplete_DoubleClick(id) {

    user_typed_query = __AutoComplete[id]['element'].value;
    if (user_typed_query != '') {
        AutoComplete_ShowDropdown(id);
        return;
    }

    return false;

}

/**
* Close Search Panel
*/
function CloseSearchPanel() {
    if (!isMouseOverSearchPanel) {
        clearTimeout(mySearchTimer);
        AutoComplete_HideAll();
    }
}
/**
* Mouse Over Search Panel
*/
function MouseOverSearchPanel() {
    isMouseOverSearchPanel = true;
}
/**
* Mouse Out Search Panel
*/
function MouseOutSearchPanel() {
    if (isMouseOverSearchPanel) {
        mySearchTimer = setTimeout('CloseSearchPanel()', 3000);
        isMouseOverSearchPanel = false;
    }
}
