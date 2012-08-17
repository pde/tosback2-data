/* Popular phrases - SWISSCOLONY - 21:58:17, Fri Aug 17, 2012 */
__SLI_ClientDefaults =
[
    ['Alignment', 'offsetrelative' ],
	['IE6SelectBox', true ],
    ['ShowBrandingFooter', false ],
];
var asPhrases=new Array ('sale','fudge','petit fours','careers','catalog','chocolate','cashews','coffee','cheese','cakes','cookies','sugar free','baklava','fruit cake','coffee sampler','old fashioned fudge trio','peppermint bark','nuts','beef log','mustard','jerky','beef jerky','swiss cheese','fruit','pumpkin','jumbos','cheese slicer','mixed nuts','fudge trio','toffee','fruitcake','butter toffee','toys','jelly beans','bark','postpaid','peppermint','dips','coffee cake','pistachios','shipping','pretzels','cheese spreads','candy','pecan','divinity','meat','tea','baskets','spreads','cheese log','pecan log','fleece jacket','fruit spread','sugar free candy','dried fruit','jumbo cashews','jelly belly','dutch apple cake','fruit spread sampler','fours','chocolate nuts','cheddar','apple','shipping charges','big red cheddar','glasses','sweet hot mustard','select mixed nuts','military','sugar free chocolate pecan fudge','peanut brittle','smoked cheddar','electronics','holiday fruit tray','fruity gels','spring cookies','baby cheese','baby swiss cheese','fruit slices','mustard trio','wolf','gingerbread','taffy','blankets','sugar free fruity gels','sweatshirt','wheel of cheese','wreath','fashioned fudge trio','macadamia nuts','cakes and desserts','jumbo sausage','unsalted nuts','snowman','divinity candy','spring cookie gift assortment','music box','fruit trays','apple pie','garden vegetable','amaretto','petite mints','clusters','swirl cake','mp3','bonbons','lion','mint torte','christmas decorations','chocolate covered peanut butter','slicer','sailboat personalized','jalapeno beef log','smoked cheese','cheese and sausage','coffee sticks','ribbon candy','27 holiday favorites','peppermint chocolate','ribs','peppermint bark candy','holiday favorites','meat strip','jalapeno brittle','lemon','sharp cheese','camo','meat sticks','harvest fruit tray','peanut','shortbread','ingredients','meat stick bonanza','knife','all products','mini baklava','chees slicer','hummingbird','stick','pears','margarita','rum','unsalted','personalized bear','kreme cheese','meat strips gift box','alarm clock','beef sticks','brick cheese','five sausage gift box','kitty','sugar cookies','snack','wild','dried fruit tray','pick','coffe','holiday cookies','spring fruit gel slices','alarm','velour lounge set','garlic sausage','box of chocolates','sweater','gift sets','vintage cheddar','stollen','sausage n cheese','20.00','pocket watch','stuffed animals','butter fruit cake','reed diffuser','santa mrs claus s&p shakers','christmas fruitcake','apricots','apply','buffalo plaid','mail order catalog','scuff','stand','$40','2- piece thermal fleece lounge set','$15','dutch apple');
/* $Revision: 6883 $
 *
 */

if(typeof(_sli_init )!='object'){var _sli_init=new Array();}
if(typeof(sli_init )!='function'){function sli_init(){ for(var x=0;x<_sli_init.length;x++) _sli_init[x]();}}
if(typeof(asPhrases)!='object'){ var asPhrases = new Array(); }
if(typeof(__SLI_customisations)!='object'){var __SLI_customisations = new Object();}
if(typeof(__SLI_ClientDefaults)!='object'){ var __SLI_ClientDefaults=[]; }
if(typeof(__SLI_validSearchBoxes)!='object'){ var __SLI_validSearchBoxes = new Array(); }
if(typeof(__SLI_asug_used_flag)!='object'){ var __SLI_asug_used_flag = false; }
if(typeof(__SLI_width)!='object'){ var __SLI_width = 0; }
if(typeof(sli_targeturl)!='object'){ var sli_targeturl = ""; }


    __AutoComplete = new Object(); //namespace...
    __AutoComplete_mouseMoved=false;

    // Basic UA detection
    isIE = document.all ? true : false;
    isGecko = navigator.userAgent.toLowerCase().indexOf('gecko') != -1;
    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;

    /* defaults and options */

    var __SLI_ApplicationName = 'AutoSuggest';
        __SLI_customisations[ 'AutoSuggest' ] =
                {
                    'ShowBrandingFooter' : true
                    ,
                    'TextBoxIDPrefix' : 'sli_search_'
                    ,
                    'BrandingFooterImagePath' : 'http://assets.resultspage.com/autosuggest/sli_systems-powered_150_15.gif'
                    ,
                    'BrandingFooterTitleTooltip' : 'AutoSuggest Powered by SLI Systems'
                    ,
                    'DropListMinWidth' : 150
                    ,
                    'MaxListItems' : 10
                    ,
                    'Alignment' : true
                    ,
                    'TextBoxIDCustom' : []
                    ,
                    'ValidSearchBoxes' : false 
                    ,
                    'IE6SelectBox' : false 
                    ,
                    'IE6SelectBoxPadding' : 0
                    ,
                    'TargetURL' : ''
                    ,
                    'IframeAlignment' : false
                    ,
                    'AlignmentBorderBug' : false
                    ,
                    'IE6OnFocus' : false
                };
    /* 0 = keyname, 1 = value */
    for( defaultValuePair in __SLI_ClientDefaults )
    {
        __SLI_customisations[__SLI_ApplicationName][__SLI_ClientDefaults[defaultValuePair][0]]=__SLI_ClientDefaults[defaultValuePair][1];
    }

    /* pre-fetch branding footer image if being used...
     */
    if( __SLI_customisations[ __SLI_ApplicationName ][ 'ShowBrandingFooter' ] )
    {
        
        if(location.protocol == "https:")
        {
            __SLI_customisations[ __SLI_ApplicationName ][ 'BrandingFooterImagePath' ] = __SLI_customisations[ __SLI_ApplicationName ][ 'BrandingFooterImagePath' ].replace(/http:/i, 'https:');
        }
    
        var __AutoCompleteBranding = new Image();
        __AutoCompleteBranding.src=__SLI_customisations[ __SLI_ApplicationName ][ 'BrandingFooterImagePath' ];
    }


    function AutoComplete_init()
    {
        if(!isOpera)
        {
            var oldonresize=function(){};
            if(typeof(window.onresize)=='function')
                oldonresize = window.onresize;//play nicely with other people's toys
            window.onresize= function(){ oldonresize(); AutoComplete_HideAll(); AutoComplete_Create( asPhrases ); }

            AutoComplete_Create( asPhrases );
            
            var els = document.getElementsByTagName('input');
            if(els)
            {
               for ( i = 0; i < els.length; i++ )
               {
                  if(els[i].name == "asug")
                  {
                     els[i].disabled = true;
                  }
               }
            }
        }
    }




    /**
    * Attachs the autocomplete object to a form element. Sets
    * onkeypress event on the form element.
    *
    * @param string formElement Name of form element to attach to
    * @param array  data        Array of strings of which to use as the autocomplete data
    */
    //function AutoComplete_Create (id, data)
    /*
     * iterate over 'sli_search_*' assumes one or more search boxes numbered from 1...
    */
    function AutoComplete_Create( data )
    {
        var idx=1, e, id, searchBoxPrefix=__SLI_customisations[ __SLI_ApplicationName ][ 'TextBoxIDPrefix' ];
        while( e = document.getElementById(searchBoxPrefix+idx) )
        {
            AutoComplete_AttachHandlers(e, data);
            if( __SLI_customisations[ __SLI_ApplicationName ][ 'ValidSearchBoxes' ] )
            {
                __SLI_validSearchBoxes.push(searchBoxPrefix+idx);
            }
            idx++;
        }
        
        
        //this array comes from the customised list
        var otherTextBoxIdList = __SLI_customisations[ __SLI_ApplicationName ][ 'TextBoxIDCustom' ];
        if( otherTextBoxIdList)
        {
            for(idx=0;idx<otherTextBoxIdList.length;idx++)
            {
                e = document.getElementById(otherTextBoxIdList[idx]);
                if(e)
				{
					if( __SLI_customisations[ __SLI_ApplicationName ][ 'ValidSearchBoxes' ] )
                	{
	                    __SLI_validSearchBoxes.push( otherTextBoxIdList[idx] );
                	}
					AutoComplete_AttachHandlers(e, data);
				}
            }
        }
        
    } 

    function AutoComplete_AttachHandlers(e, data){
        var iframe,id;
        id=e.id;


        __AutoComplete[id] = {'data':data,
                              'isVisible':false,
                              'element':document.getElementById(id),
                              'dropdown':null,
                              'highlighted':null};

        __AutoComplete[id]['element'].setAttribute('autocomplete', 'off');
        __AutoComplete[id]['element'].onkeydown = function(e) {if (!e) e = window.event; return AutoComplete_KeyDown(this.getAttribute('id'), e);}
        __AutoComplete[id]['element'].onkeyup = function(e) {if (!e) e = window.event; return AutoComplete_KeyUp(this.getAttribute('id'), e);}
        // The function call on the next line was changed by Andrew Grieve April 2008
        __AutoComplete[id]['element'].onkeypress = function(e) {if (!e) e = window.event; return AutoComplete_KeyPress(this.getAttribute('id'), e);}
        __AutoComplete[id]['element'].onclick = function(e)
        {
            if( __SLI_customisations[ __SLI_ApplicationName ][ 'IE6OnFocus' ] )
            {
                __AutoComplete[id]['element'].focus();
            }
            if (!e) e = window.event; e.cancelBubble = true; e.returnValue = false;
        }



        // Hides the dropdowns when document clicked
        var docClick = function()
        {
            if( __SLI_customisations[ __SLI_ApplicationName ][ 'ValidSearchBoxes' ] )
            {
               for(var i=0; i < __SLI_validSearchBoxes.length; i++)
               {
                   if(document.getElementById(__SLI_validSearchBoxes[i]))
                   {
                       AutoComplete_HideDropdown(__SLI_validSearchBoxes[i]);
                   }
               }
            }
            else
            {
                for (id in __AutoComplete)
                {
                   AutoComplete_HideDropdown(id);
                }
            }
        }

        if (document.addEventListener) {
            document.addEventListener('click', docClick, false);
        } else if (document.attachEvent) {
            document.attachEvent('onclick', docClick, false);
        }


        // Max number of items shown at once
        if (arguments[2] != null) {
            __AutoComplete[id]['maxitems'] = arguments[2];
            __AutoComplete[id]['firstItemShowing'] = 0;
            __AutoComplete[id]['lastItemShowing'] = arguments[2] - 1;
        }

        AutoComplete_CreateDropdown(id);

        // Prevent select dropdowns showing thru
        if (isIE) {
            iframe = document.createElement('iframe');
            __AutoComplete[id]['iframe'] = iframe;
                iframe.id = id +'_iframe';
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '0px';
                iframe.style.height = '0px';
                iframe.style.zIndex = '98';
                iframe.style.visibility = 'hidden';
                
                if(location.protocol == "https:")
                {
                   iframe.src = 'https://assets.resultspage.com/autosuggest/blank.html';
                }
                
                if( __SLI_customisations[ __SLI_ApplicationName ][ 'IE6SelectBox' ] )
                {
                  iframe.style.width = __SLI_width  + __SLI_customisations[ __SLI_ApplicationName ][ 'IE6SelectBoxPadding'];
                }

            if( __SLI_customisations[ __SLI_ApplicationName ][ 'IframeAlignment' ] )
            {
                document.body.insertBefore( iframe );
            }
            else
            {
                __AutoComplete[id]['element'].parentNode.insertBefore( iframe, __AutoComplete[id]['element'] );
            }
        }
    }

    /**
    * Creates the dropdown layer
    *
    * @param string id The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_CreateDropdown(id)
    {
        var theSearchbox = __AutoComplete[id]['element'];
        var theDropDown;
        var left_top = AutoComplete_getPos( theSearchbox );
        var left  = left_top[0];
        var top   = left_top[1] + theSearchbox.offsetHeight;
        var width = theSearchbox.offsetWidth;

        if ( width < __SLI_customisations[ __SLI_ApplicationName ][ 'DropListMinWidth' ] )
        {
            width = __SLI_customisations[ __SLI_ApplicationName ][ 'DropListMinWidth' ];
        }

        theDropDown = document.createElement('div');
        theDropDown.className = 'autocomplete'; // Don't use setAttribute()


        if(__SLI_customisations[ __SLI_ApplicationName ][ 'Alignment' ] == true && document.body)
        {
            theDropDown.style.position = 'absolute';
            document.body.insertBefore(theDropDown, document.body.nextSibling);
            
            // Position it
            theDropDown.style.visibility = 'hidden';
            theDropDown.style.left       = left + 'px';
            theDropDown.style.top        = top + 'px';
            theDropDown.style.width      = width + 'px';
            theDropDown.style.zIndex     = '99999';
        }
        else if(__SLI_customisations[ __SLI_ApplicationName ][ 'Alignment' ] == "offsetrelative" && document.body)
        {
          theSearchbox.parentNode.insertBefore(theDropDown, theSearchbox);
          // Position it
          if(sli_getStyle(theSearchbox.offsetParent, 'position') != "absolute")
          {
            theSearchbox.offsetParent.style.position = 'relative';
          }
          theDropDown.style.position = 'absolute';
          theDropDown.style.left = (theSearchbox.offsetLeft) + 'px';
          theDropDown.style.top = (theSearchbox.offsetTop + theSearchbox.offsetHeight) + 'px';
          if ( theSearchbox.clientWidth < __SLI_customisations[ __SLI_ApplicationName ][ 'DropListMinWidth' ] )
          {
            theDropDown.style.width = __SLI_customisations[ __SLI_ApplicationName ][ 'DropListMinWidth' ];
          }
          else
          {
            theDropDown.style.width = (theSearchbox.clientWidth) + 'px';
          }
          theDropDown.style.visibility = 'hidden';
          theDropDown.style.zIndex     = '99999999';
        }
        else
        {
            theSearchbox.parentNode.insertBefore(theDropDown, theSearchbox);
            // Position it
            theDropDown.style.visibility = 'hidden';
            theDropDown.style.left       = left + 'px';
            theDropDown.style.top        = top + 'px';
            theDropDown.style.width      = width + 'px';
            theDropDown.style.zIndex     = '99999';
        }
        

        __AutoComplete[id]['dropdown'] = theDropDown;
        __SLI_width = width;
    }

    function /* array [ left, top ] */ AutoComplete_getPos( obj )
    {
        var curleft = curtop = 0;
        var sli_flag = 0;

        if (obj.offsetParent)
        {
           do
           {
              if ( __SLI_customisations[ __SLI_ApplicationName ][ 'AlignmentBorderBug' ] )
              {         
                
                if(sli_flag == 1)
                {
                    var clientTop = (obj.offsetHeight - obj.clientHeight) / 2;
                    curtop += clientTop;

                    var clientLeft = (obj.offsetWidth - obj.clientWidth) / 2;
                    curleft += clientLeft;
                }
                sli_flag = 1;
              }
           
              curleft += obj.offsetLeft;
              curtop += obj.offsetTop;
           }
           while (obj = obj.offsetParent);
        }
        return [curleft,curtop];
    }

    /**
    * Shows the dropdown layer
    *
    * @param string id The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_ShowDropdown(id)
    {

        AutoComplete_HideAll();



        var value = __AutoComplete[id]['element'].value;
        var toDisplay = new Array();
        var newDiv    = null;
        var text      = null;
        var numItems  = __AutoComplete[id]['dropdown'].childNodes.length;

        __AutoComplete_mouseMoved=false;
        // SLI Code Modification - Start - Andrew Grieve April 08
        // Trim the textbox so that if is starts with a space then the feature will still work
        //value = value.replace(/^\s+|\s+$/g,"");
        value = value.replace(/^\s+/g,"");

        if(value.length == "")
        {
            // If Textbox length is nothing (after the trim) then don't show dropdown.
            return;
        }
        // SLI Code Modification - End

        // Remove all child nodes from dropdown
        while (__AutoComplete[id]['dropdown'].childNodes.length > 0) {
            __AutoComplete[id]['dropdown'].removeChild(__AutoComplete[id]['dropdown'].childNodes[0]);
        }


        var count=0;
        // Go thru data searching for matches
        for (i=0; i<__AutoComplete[id]['data'].length; ++i)
        {
            // SLI Code Modification - Start - Andrew Grieve April 08 - Added lower casing
            if (__AutoComplete[id]['data'][i].substr(0, value.length).toLowerCase() == value.toLowerCase())
            {
                // SLI Code Modification - End
                toDisplay[toDisplay.length] = __AutoComplete[id]['data'][i];
                count++;
                /* how many to display? */
                if(count == __SLI_customisations['AutoSuggest']['MaxListItems'] ) /* Code inserted to keep list to a maximum of 10 values (was 20 or 30) */
                {
                    break;
                }
            }
        }

        // No matches?
        if (toDisplay.length == 0) {
            AutoComplete_HideDropdown(id);
            return;
        }



        // Add data to the dropdown layer
        for (i=0; i<toDisplay.length; ++i) {
            newDiv = document.createElement('div');
            newDiv.className = 'autocomplete_item'; // Don't use setAttribute()
            newDiv.setAttribute('id', 'autocomplete_item_' + i);
            newDiv.setAttribute('index', i);
            newDiv.style.zIndex = '99999';

             // Scrollbars are on display ?
            if (toDisplay.length > __AutoComplete[id]['maxitems'] && navigator.userAgent.indexOf('MSIE') == -1) {
                newDiv.style.width = __AutoComplete[id]['element'].offsetWidth - 22 + 'px';
            }

            newDiv.onmouseover =
        function()
        {
            if( __AutoComplete_mouseMoved )
                AutoComplete_HighlightItem(__AutoComplete[id]['element'].getAttribute('id'), this.getAttribute('index'));
        };

            newDiv.onclick     =    function()
                                    {
                                    	  __SLI_asug_used_flag = true;
                                                                           
                                        AutoComplete_SetValue(__AutoComplete[id]['element'].getAttribute('id'));
                                        AutoComplete_HideDropdown(__AutoComplete[id]['element'].getAttribute('id'));
                                        AutoComplete_submitForm(id);
                                    }



            text   = document.createTextNode(toDisplay[i]);
            newDiv.appendChild(text);
            newDiv.title='Search for ' + toDisplay[i];

            /* ellipsis for IE only */
            if( isIE )
            {
                newDiv.style.textOverflow = 'ellipsis';
                newDiv.style.width = '100%';
                newDiv.style.whiteSpace = 'nowrap';
                newDiv.style.overflow = 'hidden';

            }
            __AutoComplete[id]['dropdown'].appendChild(newDiv);
        }
        /*
         * append DIV containing footer branding...
         */
        if(__SLI_customisations['AutoSuggest']['ShowBrandingFooter'])
        {
            i = toDisplay.length;
            newDiv = document.createElement('div');
            newDiv.className = 'autocomplete_footer'; // Don't use setAttribute()
            newDiv.setAttribute('id', 'autocomplete_item_' + i);
            newDiv.setAttribute('index', i);
            newDiv.style.zIndex = '99999';
            newDiv.innerHTML = '<a href="http://www.sli-systems.com/powered-by.php" title="' +
                                __SLI_customisations[ __SLI_ApplicationName ][ 'BrandingFooterTitleTooltip' ] +
                                '"><img class="autocomplete_footer_branding" src="'+__AutoCompleteBranding.src+'" /></a>';

            __AutoComplete[id]['dropdown'].appendChild(newDiv);
        }


        // Too many items?
        if (toDisplay.length > __AutoComplete[id]['maxitems']) {
            __AutoComplete[id]['dropdown'].style.height = (__AutoComplete[id]['maxitems'] * 15) + 2 + 'px';

        } else {
            __AutoComplete[id]['dropdown'].style.height = '';
        }


        /**
        * Set left/top in case of document movement/scroll/window resize etc
        */
        if(__SLI_customisations[ __SLI_ApplicationName ][ 'Alignment' ] == "true" || __SLI_customisations[ __SLI_ApplicationName ][ 'Alignment' ] == "false")
        {
            var left_top = AutoComplete_getPos( __AutoComplete[id]['element'] );
            __AutoComplete[id]['dropdown'].style.left = left_top[0];
            __AutoComplete[id]['dropdown'].style.top  = left_top[1] + __AutoComplete[id]['element'].offsetHeight;
        }


        // Show the iframe for IE
        if (isIE) {
            
            if(!__SLI_customisations[ __SLI_ApplicationName ][ 'Alignment' ] == true)
            {
               __AutoComplete[id]['iframe'].style.width  = __AutoComplete[id]['dropdown'].offsetWidth;
            }
            
            
            __AutoComplete[id]['iframe'].style.top    = __AutoComplete[id]['dropdown'].style.top;
            __AutoComplete[id]['iframe'].style.left   = __AutoComplete[id]['dropdown'].style.left;
            __AutoComplete[id]['iframe'].style.height = __AutoComplete[id]['dropdown'].offsetHeight;

            __AutoComplete[id]['iframe'].style.visibility = 'visible';
        }

    e =  __AutoComplete[id]['dropdown'];

    e.onmousemove =
        function()
        {
            if(!__AutoComplete_mouseMoved){__AutoComplete_mouseMoved=true;}
            this.onmousemove = null;
        }

        // Show dropdown
        if (!__AutoComplete[id]['isVisible']) {
            __AutoComplete[id]['dropdown'].style.visibility = 'visible';
            __AutoComplete[id]['isVisible'] = true;
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
    function AutoComplete_HideDropdown(id)
    {
        if (__AutoComplete[id]['iframe'])
        {
            __AutoComplete[id]['iframe'].style.visibility = 'hidden';
        }
        
        if (__AutoComplete[id]['dropdown'])
        {
            __AutoComplete[id]['dropdown'].style.visibility = 'hidden';
        }

        __AutoComplete[id]['highlighted'] = null;
        __AutoComplete[id]['isVisible']   = false;
    }


    /**
    * Hides all dropdowns
    */
    function AutoComplete_HideAll()
    {
         if( __SLI_customisations[ __SLI_ApplicationName ][ 'ValidSearchBoxes' ] )
         {
               for(var i=0; i < __SLI_validSearchBoxes.length; i++)
               {
                   if(document.getElementById(__SLI_validSearchBoxes[i]))
                   {
                       AutoComplete_HideDropdown(__SLI_validSearchBoxes[i]);
                   }
               }
         }
         else
         {
                for (id in __AutoComplete)
                {
                   AutoComplete_HideDropdown(id);
                }
         }
    }


    /**
    * Highlights a specific item
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    * @param int    index The index of the element in the dropdown to highlight
    */
    function AutoComplete_HighlightItem(id, index) // mouseover, index is the list element index, zero-based
    {
        if (__AutoComplete[id]['dropdown'].childNodes[index]) {
            for (var i=0; i<__AutoComplete[id]['dropdown'].childNodes.length; ++i) {
                if (__AutoComplete[id]['dropdown'].childNodes[i].className == 'autocomplete_item_highlighted') {
                    __AutoComplete[id]['dropdown'].childNodes[i].className = 'autocomplete_item';
                }
            }

            __AutoComplete[id]['dropdown'].childNodes[index].className = 'autocomplete_item_highlighted';
            __AutoComplete[id]['highlighted'] = index;

            //also see below...
            //__AutoComplete[id]['element'].value = __AutoComplete[id]['dropdown'].childNodes[index].innerHTML;
            //AutoComplete_SetValue(id);
        }
    }


    /**
    * Highlights the menu item with the given index
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    * @param int    index The index of the element in the dropdown to highlight
    */
    function AutoComplete_Highlight(id, index) // keyboard up/down - index is the direction of travel, 1==down,-1=up
    {
        var childNodes = __AutoComplete[id]['dropdown'].childNodes;
        if(childNodes.length)
        {
	        var lastItem = ( ( childNodes[ childNodes.length - 1 ].className != 'autocomplete_footer' ) ? childNodes.length - 1 : childNodes.length - 2 );

            // Out of bounds checking
            //if (index == 1 && __AutoComplete[id]['highlighted'] == __AutoComplete[id]['dropdown'].childNodes.length - 1) {
            if (index == 1 && __AutoComplete[id]['highlighted'] == lastItem ) {
                childNodes[__AutoComplete[id]['highlighted']].className = 'autocomplete_item';
                __AutoComplete[id]['highlighted'] = null;

            } else if (index == -1 && __AutoComplete[id]['highlighted'] == 0) {
                childNodes[0].className = 'autocomplete_item';
                __AutoComplete[id]['highlighted'] = lastItem;
                index = 0;//hack!
            }

            // Nothing highlighted at the moment
            if (__AutoComplete[id]['highlighted'] == null) {

                childNodes[0].className = 'autocomplete_item_highlighted';
                __AutoComplete[id]['highlighted'] = 0;
                newIndex = 0;
                
            } else {

                if (childNodes[__AutoComplete[id]['highlighted']]) {
                
                    childNodes[__AutoComplete[id]['highlighted']].className = 'autocomplete_item';
                }

                var newIndex = parseInt( __AutoComplete[id]['highlighted'] ) + parseInt(index);

                if (childNodes[newIndex]) {

                    childNodes[newIndex].className = 'autocomplete_item_highlighted';

                    __AutoComplete[id]['highlighted'] = newIndex;
                }
            }

            //populate textbox with currently highlighted term...
            //__AutoComplete[id]['element'].value = __AutoComplete[id]['dropdown'].childNodes[newIndex].innerHTML;
            AutoComplete_SetValue(id);
        }
    }


    /**
    * Sets the input to a given value
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_SetValue(id)
    {
        __AutoComplete[id]['element'].value = __AutoComplete[id]['dropdown'].childNodes[__AutoComplete[id]['highlighted']].innerHTML.replace(/&amp;/, "&");
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

        __AutoComplete[id]['dropdown'].scrollTop = __AutoComplete[id]['firstItemShowing'] * 15;
    }


    /**
    * Function which handles the keypress event
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_KeyDown(id, e)
    {
        var result = true;

       var event;
       event = e;
       if(!event) event = window.event;

        var keyCode = event.keyCode;

        switch (keyCode) {

            // Return/Enter
            case 13:
                if (__AutoComplete[id]['highlighted'] != null) {
                    AutoComplete_SetValue(id);
                    AutoComplete_HideDropdown(id);
					
                    __SLI_asug_used_flag = true;
					
                    if( e = __AutoComplete[id]['element'].form['asug'] )
                    {
                        
                        e.disabled=false;
                        e.value = __AutoComplete[id]['asug'];
                    }

                }

                result = AutoComplete_submitForm(id);

                break;

            // Escape
            case 27:
                AutoComplete_HideDropdown(id);
                event.returnValue = false;
                event.cancelBubble = true;
                break;

            // Up arrow
            case 38:
                if (!__AutoComplete[id]['isVisible']) {
                    AutoComplete_ShowDropdown(id);
                }

                AutoComplete_Highlight(id, -1);
                AutoComplete_ScrollCheck(id, -1);
                
                if( e = __AutoComplete[id]['element'].form['asug'] )
                {
                   e.disabled=false;
                   e.value = __AutoComplete[id]['asug'];
                }

                                
                result = false;
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
                    AutoComplete_ShowDropdown(id);
                }

                AutoComplete_Highlight(id, 1);
                //AutoComplete_ScrollCheck(id, 1);

                if( e = __AutoComplete[id]['element'].form['asug'] )
                {
                   e.disabled=false;
                   e.value = __AutoComplete[id]['asug'];
                }

                result = false;
                break;
        }
        return result;
    }


    /**
    * Function which handles the keyup event
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_KeyUp(id, e)
    {
       var event;
       event = e;
       if(!event) event = window.event;

        var keyCode = event.keyCode;

        switch (keyCode) {
            case 13:
                event.returnValue = false;
                event.cancelBubble = true;
                
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
                AutoComplete_ShowDropdown(id);
                
                __AutoComplete[id]['asug']=__AutoComplete[id]['element'].value;

                if( e = __AutoComplete[id]['element'].form['asug'] )
                {
                   e.disabled=true;
                   e.value = "";
                }  
                
                break;
        }
    }

    /**
    * Function which handles the keypress event
    * This function added April 2008 by Andrew Grieve
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */

    // SLI Code Modification - Start - Andrew Grieve April 08
    function AutoComplete_KeyPress(id, e)
    {
        var event = e;
        if(!event) event = window.event;
        var keyCode = event.keyCode;

        if (keyCode == 13 && isGecko || isOpera)
        {
            return false;
        }
        
        if( __SLI_customisations[ __SLI_ApplicationName ][ 'TargetURL' ] )
        {
            if (keyCode == 13 && isIE)
            {
                return false;
            }
        }
        
    }
    // SLI Code Modification - End

    /**
    * Returns whether the dropdown is visible
    *
    * @param string id    The form elements id. Used to identify the correct dropdown.
    */
    function AutoComplete_isVisible(id)
    {
        return __AutoComplete[id]['dropdown'].style.visibility == 'visible';
    }

    function AutoComplete_submitForm(id)
    {
      var e, f, result=true;
      if( f = __AutoComplete[id]['element'].form )
      {
        if( __AutoComplete[id]['element'].value != '' )
        {
          if(__SLI_asug_used_flag == true)
          {
            if( e = f['asug'])
            {
              e.value = __AutoComplete[id]['asug'];
              e.disabled=false;
            }
          }

          if( __SLI_customisations[ __SLI_ApplicationName ][ 'TargetURL' ] )
          {
            asugvar = "";
            if(__SLI_asug_used_flag == true)
            {
              asugvar = '&asug=' + escape(__AutoComplete[id]['asug']);
            }

            sliRegex = /resultsdemo\.com/;
            if(sliRegExArray = sliRegex.exec(document.domain))
            {
              sliRegex = /^http:\/\/(.*)\//;
              sliTargetDomain = sliRegex.exec(__SLI_customisations[__SLI_ApplicationName ][ 'TargetURL' ]);
              __SLI_customisations[__SLI_ApplicationName ][ 'TargetURL' ] = __SLI_customisations[__SLI_ApplicationName ][ 'TargetURL' ].replace(sliTargetDomain[1], document.domain);
            }

            document.location.href = __SLI_customisations[__SLI_ApplicationName ][ 'TargetURL' ] + escape(__AutoComplete[id]['element'].value) + asugvar;
          }
          else
          {
            if(f.onsubmit)
            {
              if(f.onsubmit() !== false)
              {
                f.submit();
              }
            }
            else
            {
              f.submit();
            }
          }

          AutoComplete_HideAll();
        }
        else
          result = false;
      }
      return result;
    }
    
    // get the style that will be applied by the browser, including stylesheets
    function sli_getStyle(el,styleProp)
    {
      if (el.currentStyle)
        var y = el.currentStyle[styleProp];
      else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
      return y;
    }

    // register with onLoad(er...
    _sli_init.push( AutoComplete_init );
    
    function sli_addEvent(obj, evType, fn) {
    	if (obj.addEventListener) {
    		obj.addEventListener(evType, fn, false);
    		return true;
    	} else if (obj.attachEvent) {
    		var r = obj.attachEvent("on" + evType, fn);
    		return r;
    	} else {
    		return false;
    	}
    }
    
    function sli_load()
    {
    	sli_addEvent(window, 'load', sli_init);
    }