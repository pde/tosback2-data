function getChildById(element, id) {
    if( element.id == id )
        return element; 

    var children = element.childNodes;
    for( var i = 0; i < children.length; ++i ) {
        var e = getChildById(children[i], id);
        if( e != null )
            return e; 
    }
    return null;
}

function getFirstChildByClassName(element, className) {
	if( hasClassName(element, className) )
        return element; 
    var children = element.childNodes;
    for( var i = 0; i < children.length; ++i ) {
        var e = getFirstChildByClassName(children[i], className);
        if( e != null )
            return e; 
    }
    return null;
}

function addClass(element, className) {
	if (element) {
    	element.className = element.className + " " + className;
	}
}

/* If there is no Swxl and there is no localSEO module the corresponding part of the 
footer which contains these two modules has to be collapsed */
footerOnDOMReady = function(callback) {
    if (window.addEventListener){
          window.addEventListener('load', callback, false); 
    }else if (window.attachEvent){
        window.attachEvent('onload', callback);
    }else {
         if ( window.onload != null ) {
              var _onload = window.onload;
              window.onload = function ( e ) {
                _onload(e);
                window[callback]();
              };
        } else
              window.onload = callback;
    }
}


countChildElements = function(parent, child) {
	  return parent.getElementsByTagName(child).length;
}

footerOnLoad = function() {
	
    var footer = findFooterDiv();
    var swxl = getChildById(footer, 'footer-swxl');
    removeEmptyModule(footer, 'footer-local-links');
    var localSeo = getChildById(footer, 'footer-local-links');
    var footerParent = footer.parentNode;
    
    /* If no any child elements for the parent with class 'footer-rounded-box-cnt' AND if footer-statements is null*/
    if (countChildElements(footer, getFirstChildByClassName(footer, 'footer-rounded-box-cnt')) == 0 &&
       (!getFirstChildByClassName(footer, 'footer-statements'))) {
    	footerParent.removeChild(footer);
    } else if (!swxl && !localSeo) {
    	
        /* Changing the backgound color of the top rounded border */
        
        var element = getFirstChildByClassName(footer, 'footer-rounded-box-tr-top'); 
        addClass(element, 'footer-links-inner-background');
        
        element = element.childNodes[0];
        addClass(element, 'footer-links-inner-background');
        
        /* Disabled paddings we don't need any more */ 
        
        element = getFirstChildByClassName(footer, 'footer-rounded-box-cnt'); 
        addClass(element, 'footer-links-outer-collapsed');
        
        element = getFirstChildByClassName(footer, 'footer-links-inner'); 
        addClass(element, 'footer-links-outer-collapsed');
        
        /* Deleting separator which is not needed */
        
        element = getFirstChildByClassName(footer, 'footer-separator-thin-up'); 
        addClass(element, 'footer-noXpend');
    } 
    
};

/**
 * Finds the div with id "footer" added by global footer.
 * 
 * Some pages (ex: Hotels launch pages) add a div with id "footer" to the page besides the global footer while some pages not.
 */
findFooterDiv = function()
{
	var footer = document.getElementById('footer');
	footer = getFirstChildByClassName(footer, 'footer');
	return footer;
}

/**
 * Removes a div with id moduleId if it does not contain links (just the heading).
 * 
 * @param footer the footer div
 * @param moduleId the id of the module div
 */
removeEmptyModule = function(footer, moduleId)
{
	var moduleDiv = getChildById(footer, moduleId);
	if( moduleDiv )
	{
		var moduleLinks = getFirstChildByClassName(moduleDiv, "footer-list");
		if( !moduleLinks )
		{
			moduleDiv.parentNode.removeChild(moduleDiv);
		}
	}
}

/**
 * Checks that an element has a class or not.
 * 
 * @param element
 * @param className
 * 
 * @returns true if the element has the class
 */
hasClassName = function(element, className)
{
	if( element.className ) {
		var classNames = element.className.split(" ");
		if( className ) {
			for ( var i = 0; i < classNames.length; i++) {
				if( classNames[i] == className )
					return true;
			}
		}
	}
	return false;
}

footerOnDOMReady(footerOnLoad);
