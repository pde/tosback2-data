/**** EVENT-BASED LOADING PROCEDURE ******************************************************/

/** DOM-READY ****************************************************************************/
$(document).ready(function(){
    GuidedNav.Scrollbars();
});
/*****************************************************************************************/


/** Account + Help Menu Setup ************************************************************/
function SelectCurrentMenuItem(id){
    // Set Selected Menu Item's Class Name
    $(id).addClass('selected');
}

/** Header Menu Tab Selection ************************************************************/
function SelectCurrentHeaderMenuItem(){
    // Get Current 
    pathName = location.pathname;
    pathName = pathName.split("/");
    curPath  = pathName[1];
    
    //alert(curPath);
}

/**** Start of JavascriptPopupControl ****************************************************/
var popup_window_name = "popupWindow1";

function isNull(obj)
  {return (typeof(obj) === "undefined" || obj == null);}

var screen_width;
var screen_height;

function ensureScreenDimensions() {
    if(screen_width == null || screen_height == null) {
        if (typeof(window.innerWidth) == 'number') { 
		    screen_width = window.innerWidth;
		    screen_height = window.innerHeight;
	    } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		    // IE6+ in 'standards compliant mode'
		    screen_width = document.documentElement.clientWidth;
		    screen_height = document.documentElement.clientHeight;
	    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		    // IE4-compatible...?
		    screen_width = document.body.clientWidth;
		    screen_height = document.body.clientHeight;
	    }
    }
}

function screenWidth()
{
    ensureScreenDimensions();
    return screen_width;
}

function screenHeight()
{
    ensureScreenDimensions();
    return screen_height;
}

// jsPopup object

var jsPopup = {
    popupWindow: null,
    
    open: function(url, launchButtonID, width, height)
    {
        // Create the quickview window
        var left, top;
        popupWindow = dhtmlwindow.open(popup_window_name, "iframe", url, "", "width=" + width + ",height=" + height);
        
        // if located launch button
        var launchButton = document.getElementById(launchButtonID);
        if(!isNull(launchButton))
        {
            // Calculate the left and top positions for the window
            //var clientRect = launchButton.getBoundingClientRect(); 
            left = launchButton.offsetLeft - (popupWindow.clientWidth - launchButton.offsetWidth) / 2;
            var right = left + popupWindow.clientWidth;
            if(left < 0)
            {
                left = 0;
            }
            else if(right > screenWidth())
            {
                left = screenWidth() - popupWindow.clientWidth;
            }
            
            top = (screenHeight() - popupWindow.clientHeight) / 2;
            var bottom = top + popupWindow.clientHeight;
            if(top < 0)
            {
                top = 0;
            }
            else if(bottom > screenHeight())
            {
                top = screenHeight() - popupWindow.clientHeight;
            }
            
            // Move the window to calculated left and top
            dhtmlwindow.moveTo(popupWindow, left, top);
        }
        
        return popupWindow;
    },
    
    showControl: function(controlId)
    {
        if(!isNull(controlId))
        {
            var control = document.getElementById(controlId);
            if(!isNull(control))
            {
                control.style.display = "block";
            }
        }
    },
    
    hideControl: function(controlId)
    {
        if(!isNull(controlId))
        {
            var control = document.getElementById(controlId);
            if(!isNull(control))
            {
                control.style.display = "none";
            }
        }
    },

    showControlAjax: function (control) {
        $(control).parents('.product-wrapper').find('.quickLaunchButton').css("display", "block");
    },

    hideControlAjax: function (control) {
        $(control).parents('.product-wrapper').find('.quickLaunchButton').css("display", "none");
    },

    close: function()
    {
        dhtmlwindow.close(popupWindow);
        document.getElementById('quickinfooverlay').style.display = 'none';
    }
}; 
/*****************************************************************************************/

/**** Start of Underlayerframe ***********************************************************/
function onQuickViewLoad()   {  
  var iframe = document.createElement("iframe");
      iframe.setAttribute("id", "under_tt");
      iframe.frameBorder = "0";
      var popupWindow = document.getElementById(popup_window_name);  
      popupWindow.appendChild(iframe);
}  
/*****************************************************************************************/


/** Fix for IE9 adding huge amounts of space above the footer on product pages   *********/
function IE9fix() {                                                             // <3 IE
    if ($.browser.msie && $.browser.version > 7) {                              // IE9 emulates IE8
        $('#container').css('position', 'static').css('position', 'relative');  // makes no sense, but it works
    }
}
/** [END] IE9 fix   **********************************************************************/


/* GUIDED NAV SCROLL BARS */

var GuidedNav = {
    Scrollbars: function () {
        // decide how scroll bars get allotted
        var scroll_threshhold = 99999; // default is no scroll bars
        if (jQuery('div#product-list').length > 0) { scroll_threshhold = 10; }
        if (location.href.match('SearchResults.aspx')) { scroll_threshhold = 5; }

        // find left nav elements that need scroll bars
        jQuery.each(jQuery('ul[class*="filter_value"]'), function () {
            if (jQuery(this).find('li').size() > scroll_threshhold) {
                jQuery(this).addClass('scroller');
            } else { jQuery(this).css('height', 'auto'); } // remove fixed-height hack
        });
        jQuery('#left-nav ul.scroller').jScrollPane({ // add the scroll bars
            mouseWheelSpeed: 10, verticalDragMinHeight: 43, verticalDragMaxHeight: 43, animateScroll: true, animateDuration: 1000, animateEase: 'swing'
        });
        jQuery('#left-nav .mui_gn').css('height', 'auto'); // remove fixed height where not necessary

        // scroll to a selected attribute (if applicable)
        if (jQuery('#department-nav .category_selected').length && jQuery('#department-nav .mui_gn_filter_value').is('.scroller')) {
            var position = jQuery('#department-nav .mui_gn_filter_value a.category_selected').position();
            jQuery('#department-nav ul.scroller').data('jsp').scrollToY(position.top - 6);
        };
    }
}

 /* START - Liveclicker video */
  
  function LiveclickerVideoTab()
   {   
        $(".image").click(function() {
            var ProductImageClass = ".productimage_" + this.className.split(' ')[2];
            var PlayerboxClass = ".playerbox_" + this.className.split(' ')[2];
            $(ProductImageClass).show();
            $(PlayerboxClass).hide();
           
        });

        $(".tab").click(function() {
        
            var productId = this.className.split(' ')[2];
            for(var i=1; i<$(".tab").length; i++)
            {
                var tabselectionclass = $(".tab")[i].className.split(' ');
                
                if(tabselectionclass.length>=3 && tabselectionclass[2] == productId)
                {
                    if(tabselectionclass[1] == "video")
                    {
                        $(".tab")[i].className = "tab video "+productId + " tabdeselected";
                    }
                    else if(tabselectionclass[1] == "image")
                    {
                        $(".tab")[i].className = "tab image "+productId + " tabdeselected";
                    }
                }
                
            }
            
            $(this).removeClass("tabdeselected");
            $(this).addClass("tabselected");
        });

        $(".video").click(function() {
            var ProductImageClass = ".productimage_" + this.className.split(' ')[2];
            var PlayerboxClass = ".playerbox_" + this.className.split(' ')[2];
            $(ProductImageClass).hide();
            $(PlayerboxClass).show();

        });

        $('div.playerbox').each(function () {
            if ($(this).find('div.Liveclicker_video').length > 0 || $(this).find('iframe').length > 0) {
                $(this).show();
            }
        });
        
        SwatchImageHandling();         
   }
   
 function DisplayLiveClickerVideo() {
     LiveclickerVideoTab();
    for(var i=1; i<$(".tab").length; i++)
    {
        var productID = $(".tab")[i].className.split(' ')[2];
        var liveclickerclass  =".playerbox_"+productID;
        var ProductImageClass = ".productimage_" +productID;
        var tabcontainerclass = ".tabscontainer_"+productID;
        
        if($(liveclickerclass).find(".Liveclicker_video").length>0)
        {
            $(tabcontainerclass).show();
            if (typeof (showVideoTabFirst) == "undefined" || !showVideoTabFirst) { $(".image").trigger('click'); }
        }
        else
        {
           $(ProductImageClass).show();
        }                       
    }  
}
  
function SwatchImageHandling()
{
    $(".swatches").click(function() { // Show the product image as per swatch image selection
    
        var productId = this.className.split(' ')[1];
        var outfitSwatchFlag="0";
        for(var i=1; i<$(".tab").length; i++)
        {
            var tabselectionclass = $(".tab")[i].className.split(' ');
            
            if(tabselectionclass.length>=3 && tabselectionclass[2] == productId)
            {
                outfitSwatchFlag = "1";
                if(tabselectionclass[1] == "video")
                {
                    $(".tab")[i].className = "tab video "+productId + " tabdeselected";
                }
                else if(tabselectionclass[1] == "image")
                {
                    $(".tab")[i].className = "tab image "+productId + " tabselected";
                }
            }
            
        }
        
        var ProductImageClass = ".productimage_" + this.className.split(' ')[1];
        var PlayerboxClass = ".playerbox_" + this.className.split(' ')[1];            
        $(ProductImageClass).show();
        $(PlayerboxClass).hide();        
        
    });
}     
/* END - Liveclicker video */

/* START - Liveclicker-Omniture v0.2 */

var OMTRcustomEventTag = 'Customer/Liveclicker Player';
var currentPlayer;

var timer_set = 0;
var sentMessageStarted = 0;
var sentMessage10PercentCompletion = 0;
var sentMessage90PercentCompletion = 0;
var sentMessageFullCompletion = 0;
var whatsupcounter = 1;
var lengthInSeconds = 30; // default. this value is changed on player loaded 

function onLCPlayerLoaded(player) {
    currentPlayer = player;
    lengthInSeconds = currentPlayer.getSettings().totalTime; // resets the proper play time 
}

function openMovie(productID, videoName, lengthInSeconds) {
    // alert('Sending "video open" message to Omniture, video name: ' + videoName + ' - length: ' + lengthInSeconds + ' - Event tag: ' + OMTRcustomEventTag);
    s.products = ";" + productID;
    s.Media.open(videoName, lengthInSeconds, OMTRcustomEventTag);
    s.Media.play(videoName, 0);
}

function endMovie(productID, videoName, lengthInSeconds) {
    // alert('Sending "video ended" message to Omniture');
    s.products = ";" + productID;
    s.Media.stop(videoName, lengthInSeconds);
    s.Media.close(videoName);
}

function update_timer() {
    var time;
    var timeinvideo;
    var videoLength = lengthInSeconds;
    try {
        time = Number(currentPlayer.getSettings().playTime);
    }
    catch (e) {
    }

    if ((time != undefined) && (time > 0) && (videoLength > 0)) {
        var percentComplete = time / videoLength;
        if (sentMessageStarted == 0) {
            sentMessageStarted = 1;
            openMovie(productID, videoName, videoLength);
        }
        if ((sentMessageFullCompletion == 0) && ((percentComplete) > 0.98)) {
            endMovie(productID, videoName, videoLength);
            sentMessageFullCompletion = 1;
        }
    }
}

setTimeout(function () { window.setInterval('update_timer()', 500); }, 1000);

/* END - Liveclicker-Omniture v0.2 */



function updateQuerystring(key, val, url) {
    url = document.URL
    newAdditionalURL = "";
    tempArray = url.split("?");
    baseURL = tempArray[0];
    aditionalURL = tempArray[1];
    temp = "";
    if (aditionalURL) {
        var tempArray = aditionalURL.split("&");
        for (var i in tempArray) {
            if (tempArray[i].indexOf(key) == -1) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    var rows_txt = temp + key + "=" + val;
    var finalURL = baseURL + "?" + newAdditionalURL + rows_txt;
    return finalURL;
}