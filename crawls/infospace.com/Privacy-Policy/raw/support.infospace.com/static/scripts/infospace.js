// ldb 4/30/2009
var headerTabs = new Array('bizTab','ppleTab','webTab','imgTab','vidTab','newsTab');
var headerForms = new Array('headerFormWeb','headerFormBiz','headerFormPple');

function setTab(clicked) { 
	var wtf = document.getElementById(clicked.id);
	document.getElementById(clicked.id).className='selected'; 
	if (headerTabs[i] = clicked.id) {
		var tabIDs = clicked.id;
		if (tabIDs == 'webTab') {
			changeForm('headerFormWeb');
			document.getElementById('qcat').value = 'Web';
		}
		else if (tabIDs == 'imgTab') {
			changeForm('headerFormWeb');
			document.getElementById('qcat').value = 'Images';
		}
		else if (tabIDs == 'vidTab') {
			changeForm('headerFormWeb');
			document.getElementById('qcat').value = 'Video';
		}
		else if (tabIDs == 'newsTab') {
			changeForm('headerFormWeb');
			document.getElementById('qcat').value = 'News';
		}
		else if (tabIDs == 'bizTab') {
			changeForm('headerFormBiz');
		}
		else if (tabIDs == 'ppleTab') {
			changeForm('headerFormPple');
		}
	}
	
	for(var i=0;i<headerTabs.length;i++) {
		if (headerTabs[i]!=clicked.id) {
			if (document.getElementById(headerTabs[i])) {
				document.getElementById(headerTabs[i]).className='unselected';
			}
		}
	}
}

function changeForm(formIDs) {
	for(var i=0;i<headerForms.length;i++) {
		if (document.getElementById(headerForms[i])) {
			document.getElementById(headerForms[i]).style.display = 'none';
			document.getElementById(formIDs).style.display = 'block';
		}
	}
	return;
}

//Clear form text

function UpdateMessageBox(thisObj, deleteText, classId) {
	if(thisObj.value==deleteText){
		thisObj.value="";
	}
	
	thisObj.className="search_box" + classId;
}


//Clear form text

// JQUERY COMBOBOX
    var _stateCombobox = null;
    var _comboboxCreated = false;

	// create a jquery combobx and set the Css class styles
	function setupCombobox()
	{
	    if(!_comboboxCreated)
	    {
	        _comboboxCreated = true;
	    
		    _stateCombobox = $('#peopleStateField').combobox(
		    {
			    comboboxContainerClass: "headerComboboxContainer",
			    comboboxValueContentContainerClass: "headerComboboxValueContainer",
			    comboboxValueContentClass: "headerComboboxValueContent",
			    comboboxDropDownClass: "headerComboboxDropDownContainer",
			    comboboxDropDownButtonClass: "headerComboboxDropDownButton",
			    comboboxDropDownItemClass: "headerComboboxItem",
			    comboboxDropDownItemHoverClass: "headerComboboxItemHover",
			    comboboxDropDownGroupItemHeaderClass: "headerComboboxGroupItemHeader",
			    comboboxDropDownGroupItemContainerClass: "headerComboboxGroupItemContainer"
		    },
		    {
			    animationType: "slide",
			    width: 140,
			    tabIndex: 4
		    });
        }
	}

// JQUERY COMBOBOX


function addEngine()
	{
		var xml = "http://support.infospace.com/static/scripts/infospace_provider.xml";

		var ua = navigator.userAgent.toLowerCase();
		var setCookieFlag = false;
		
		if(ua.indexOf('msie 7.0') != -1 || ua.indexOf('msie 8.0') != -1) 
		{
			// IE 7
			try 
			{
				if(window.external && ("AddSearchProvider" in window.external)) 
				{
					window.external.AddSearchProvider(xml);
					setCookieFlag = true;
				} 
			}
			catch(x) 
			{
				if(70==(x.number&0xFFFF)) 
				{
					//alert("For security reasons, you must use the mouse\n(or the Enter key) to click the Install button.");
				} 
				else 
				{
					alert("Unable to add search provider. [" + (x.number & 0xFFFF) + "]");
				}
				
				return false;
			}
		} 
		else if(ua.indexOf('firefox/') != -1) 
		{
			// Firefox 2
			try 
			{
				if((typeof window.sidebar=="object") && (typeof window.sidebar.addSearchEngine=="function"))
				{
					window.sidebar.addSearchEngine(xml, "", "Dogpile - Search and Rescue", "Web");
					setCookieFlag = true;
				}
			} 
			catch (x) 
			{
				if(70==(x.number&0xFFFF)) 
				{
					alert("For security reasons, you must use the mouse\n(or the Enter key) to click the Install button.");
				} 
				else 
				{
					alert("Unable to add search provider. [" + (x.number & 0xFFFF) + "]");
				}
			
				return false;
			}
		} 
		else 
		{
			//No search engine support (IE 6, Opera, etc).
			alert("Your browser does not support this feature. Please try again with Firefox or Internet Explorer 7.");
		}

		try 
		{
			if (setCookieFlag) 
			{
				setCookie("preferredsearch", "installed", 365);
			}
		}
		catch (x)
		{
			//Do nothing
		}
		
		return true;
	}
	//Add preferred search
	function addProvider() {
		try {
			window.external.AddSearchProvider('http://www.dogreatgood.com/static/scripts/dgg_preferred.xml');
		} catch (e) {
			alert("Sorry, this feature does not work with your browser.");
		}
	  return true;
	}