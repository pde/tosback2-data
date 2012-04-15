/*toggle.show will show/hide an element based on its current display
 *argument takes an elementID
 *USECASE: javascript:toggle.show('string')
 *toggle.hide will hide an array of objects
 *argument takes an array of elementIDs
 *USECASE: javascript:toggle.hide('string1','string2','string3')
 */
var toggle = 
{
	show : function(obj) 
	{
		$(obj).style.display = ($(obj).style.display != 'none' ? 'none' : '' );
	},
	hide : function(obj) 
	{
		for ( i=0; i < arguments.length; i++ ) 
		{
			$(arguments[i]).style.display = 'none';
		}
	}
};

function findHeight(obj, padding)
{
    if(obj.offsetHeight)
    {
        return obj.offsetHeight+padding;
    }
    else if(obj.style.pixelHeight)
    {
        return obj.style.pixelHeight+padding;
    }
}

/*
 *use this variable to set the height of the active content div for tabs
 */
var mContentHeight = 0;

/*
 *initializes the tab module. This must be called after the tab html has been written to the client
 *sets the display properties for all tab content
 */
function tabInit(mainCont, navCont, contentCont, panelToShow)
{
    var c = $(mainCont);
    var nav = $(navCont);
    var content = $(contentCont);
    var panel = $(panelToShow);
    
    for(i=0; i < content.childNodes.length; i++)
    {
        if(content.childNodes[i].nodeType == 1)
        {
            if(content.childNodes[i] == panel)
            {
                panel.style.display = '';
                if(findHeight(content.childNodes[i], 30)<500)
                {
                    $('tabModule').style.height = '550px';
                }
                else
                {
                    $('tabModule').style.height = findHeight(content.childNodes[i], 30)+'px';
                }
                if(c.parentNode.className=="previewWindowModule")
                {
                    $('tabModule').style.height = '260px';
                }
				mContentHeight = findHeight(content.childNodes[i], 30);
            }
            else
            {
                content.childNodes[i].style.display = 'none';
            }
        }
    }   
}
/*
 *sets the clicked tab to active and sets the proper display properties for all tab content
 */
function tabShow(contentShow, panelToShow, navContainer, tab)
{  
    var content = $(contentShow);
    var panel = $(panelToShow);
    var activeTab = $(tab);
    var navCont = $(navContainer);   
	
	tabS1 = contentShow;
	tabS2 = panelToShow;
	tabS3 = navContainer;
	tabS4 = tab;
    
    for(i = 0; i < navCont.childNodes.length; i++)
    {
        if(navCont.childNodes[i].nodeType!=3)
        {
            if(navCont.childNodes[i].childNodes[0] == activeTab)
            {
                navCont.childNodes[i].childNodes[0].className = 'active';
            }
            else
            {
                navCont.childNodes[i].childNodes[0].className = '';
            }
        }
    }
    
    for(i=0; i < content.childNodes.length; i++)
    {
        if(content.childNodes[i].nodeType == 1)
        {
            if(content.childNodes[i] == panel)
            {
                content.childNodes[i].style.display = '';
                if(findHeight(content.childNodes[i], 30)<500)
                {
                    $('tabModule').style.height = '550px';
                }
                else
                {
                    $('tabModule').style.height = findHeight(content.childNodes[i], 30)+"px";
                }
                if(content.parentNode.parentNode.className=="previewWindowModule")
                {
                    $('tabModule').style.height = '260px';
                }
                mContentHeight = findHeight(content.childNodes[i], 30);
            }
            else
            {
                content.childNodes[i].style.display = 'none';
            }
        }
    }
}

/*
 *the next tab functions are for the Phone Details page
 *it is meant to default to the "flash tab"
 *then show the 360 flash and a promo in the left hand column
 */

/*
 *initializes the tab module. This must be called after the tab html has been written to the client
 *sets the display properties for all tab content
 */
function tabInitFlash(mainCont, navCont, contentCont, panelToShow, flash360)
{
    var c = $(mainCont);
    var nav = $(navCont);
    var content = $(contentCont);
    var panel = $(panelToShow);
    var flashTab = $(flash360);
    
    flashTab.style.display = 'none';
    
    for(i=0; i < content.childNodes.length; i++)
    {
        if(content.childNodes[i].nodeType == 1)
        {
            if(content.childNodes[i] == panel)
            {
                panel.style.display = '';
                if(findHeight(content.childNodes[i], 30)<500)
                {
                    $('tabModule').style.height = '550px';
                }
                else
                {
                    $('tabModule').style.height = findHeight(content.childNodes[i], 30)+'px';
                }
            }
            else
            {
                content.childNodes[i].style.display = 'none';
            }
        }
    }   
}
/*
 *sets the clicked tab to active and sets the proper display properties for all tab content
 */
function tabShowFlash(contentShow, panelToShow, navContainer, tab, showFlash, flash360, flashTabLink)
{    

    var content = $(contentShow);
    var panel = $(panelToShow);
    var activeTab = $(tab);
    var navCont = $(navContainer);
    var flashTab = $(flash360);
    var flashLink = $(flashTabLink);
	
	tabSF1 = contentShow;
	tabSF2 = panelToShow;
	tabSF3 = navContainer;
	tabSF4 = tab;
	tabSF5 = showFlash;
	tabSF6 = flash360;
	tabSF7 = flashTabLink;
	
    if(showFlash)
    {
        flashTab.style.display = 'none';
        flashLink.className = 'active';        
    }
    else
    {
        flashTab.style.display = 'block';
        flashLink.className = '';
    }    
    
    for(i = 0; i < navCont.childNodes.length; i++)
    {
        if(navCont.childNodes[i].nodeType!=3)
        {
            if(navCont.childNodes[i].childNodes[0] == activeTab)
            {
                navCont.childNodes[i].childNodes[0].className = 'active';
            }
            else
            {
                navCont.childNodes[i].childNodes[0].className = '';
            }
        }
    }
    
    for(i=0; i < content.childNodes.length; i++)
    {
        if(content.childNodes[i].nodeType == 1)
        {
            if(content.childNodes[i] == panel)
            {
                content.childNodes[i].style.display = '';
                if(findHeight(content.childNodes[i], 30)<500)
                {
                    $('tabModule').style.height = '550px';
                }
                else
                {
                    $('tabModule').style.height = findHeight(content.childNodes[i], 30)+"px";
                }
                mContentHeight = findHeight(content.childNodes[i], 30);
            }
            else
            {
                content.childNodes[i].style.display = 'none';
            }
        }
    }
}

/*
 * Toggles content, arrows. Used in the tabs on Plan Detail pages.
 */
function toggleContent(pId)
{
	var idToToggle = pId.substring(pId.indexOf("_"));
	var imgToToggle = document.getElementById("toggleArrow" + idToToggle);
	var contentToToggle = document.getElementById("toggleContent" + idToToggle);
	
	var contentHeight = 0;

	if(imgToToggle.src.indexOf("toggle_arrow_u.gif") != -1)
	{
		imgToToggle.src = "/global/images/toggle_arrow_d.gif";
		imgToToggle.alt = "show";
	}
	else
	{
		imgToToggle.src = "/global/images/toggle_arrow_u.gif";
		imgToToggle.alt = "hide";
	}
	if(contentToToggle.style.display == "none")
	{
		contentToToggle.style.display = "block";
		contentHeight = findHeight(contentToToggle,10);
		mContentHeight += contentHeight;
	}
	else
	{
		contentHeight = findHeight(contentToToggle,10);
		contentToToggle.style.display = "none";
		mContentHeight -= contentHeight;
	}
	
	try {
    	$('tabModule').style.height = mContentHeight+"px";
	}
	catch (e) {
		// do nothing
	}
}


// for Enhanced Device Preview Window
function toggleSelects (destination, str) {
    var selectsList = $(destination).getElementsByTagName('select');
    var l = selectsList.length;
    for(var i=0; i<l; i++){
        selectsList[i].style.visibility = str;
    }
}
