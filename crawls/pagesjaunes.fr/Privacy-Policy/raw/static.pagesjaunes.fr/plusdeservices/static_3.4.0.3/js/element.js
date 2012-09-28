// ******************************* FONCTION SPECIFIQUES AUX NOEUDS ***************************************** //
function getNodeValueOfFirstChild(_class, _root){
	var nodeValue = "";
	var child = getFirstElementByClass(_class, _root);
	if(child!=null && child.firstChild!=null){
		nodeValue=child.firstChild.nodeValue;
	}
	return nodeValue;
}
// ============================================================================================
function getFirstElementByClass(_class, _root) {
	var firstElement = null;
	if (!_root) {
		_root = document;
	}
	// Recherche dans les fils du noeud courant
	var reg = new RegExp('(^|\\s)' + _class + '(\\s|$)');
	if (_root.childNodes) {
		for (var i = 0; i < _root.childNodes.length ; i++) {
			var child = _root.childNodes[i];
			var nameClass= child.className;
			if(reg.test(nameClass)){
				return child;
			}else{
				firstElement = getFirstElementByClass(_class, child);
				if(firstElement){
					return firstElement;
				}
			}
		}
	}
	return firstElement;
}
// ============================================================================================
function getElementsByClass(_class, _root, _output) {
	if (!_root) {
		_root = document;
	}
	// Recherche dans les fils du noeud courant
	if (_root.childNodes) {
		var exp = new RegExp('(^|\\s)' + _class + '(\\s|$)');
		for (var i = 0; i < _root.childNodes.length ; i++) {
			if (exp.test(_root.childNodes[i].className)) {
				_output[_output.length] = _root.childNodes[i];
			}
			else {
				getElementsByClass(_class, _root.childNodes[i], _output);
			}
		}
	}
}
// ============================================================================================
// Prototype getElementsByClassName : retrouve un objet par son nom de classe
function getElementsByClassName(oElm, strTagName, oClassNames){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var arrRegExpClassNames = new Array();
    if(typeof oClassNames == "object"){
        for(var i=0; i<oClassNames.length; i++){
            arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)"));
        }
    }
    else{
        arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)"));
    }
    var oElement;
    var bMatchesAll;
    for(var j=0; j<arrElements.length; j++){
        oElement = arrElements[j];
        bMatchesAll = true;
        for(var k=0; k<arrRegExpClassNames.length; k++){
            if(!arrRegExpClassNames[k].test(oElement.className)){
                bMatchesAll = false;
                break;
            }
        }
        if(bMatchesAll){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements)
}
// ============================================================================================
/*	EventCache Version 1.0
	Copyright 2005 Mark Wubben

	Provides a way for automagically removing events from nodes and thus preventing memory leakage.
	See <http://novemberborn.net/javascript/event-cache> for more information.
	
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

/*	Implement array.push for browsers which don't support it natively.
	Please remove this if it's already in other code */
if(Array.prototype.push == null){
	Array.prototype.push = function(){
		for(var i = 0; i < arguments.length; i++){
			this[this.length] = arguments[i];
		};
		return this.length;
	};
};

/*	Event Cache uses an anonymous function to create a hidden scope chain.
	This is to prevent scoping issues. */
var EventCache = function(){
	var listEvents = [];
	
	return {
		listEvents : listEvents,
	
		add : function(node, sEventName, fHandler, bCapture){
			listEvents.push(arguments);
		},
	
		flush : function(){
			var i, item;
			for(i = listEvents.length - 1; i >= 0; i = i - 1){
				item = listEvents[i];
				
				if(item[0].removeEventListener){
					item[0].removeEventListener(item[1], item[2], item[3]);
				};
				
				/* From this point on we need the event names to be prefixed with 'on" */
				if(item[1].substring(0, 2) != "on"){
					item[1] = "on" + item[1];
				};
				
				if(item[0].detachEvent){
					item[0].detachEvent(item[1], item[2]);
				};
				
				item[0][item[1]] = null;
			};
		}
	};
}();
// ============================================================================================
// Attachement des handlers non-intrusifs
// John Resig 
//http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn, cap ) {
   if ( obj.attachEvent ) {
   	 try {
	     obj['e'+type+fn] = fn;
	     obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
	     obj.attachEvent( 'on'+type, obj[type+fn] );
     } catch(e){
     	 return obj.attachEvent("on"+type, fn);
     }
   } else{
	   obj.addEventListener( type, fn, cap );
	 }
	 //-----------
   EventCache.add(obj, type, fn, cap);
 }
	function removeEvent( obj, type, fn, cap ) {
		if ( obj.detachEvent ) {
	 		try {
		  	obj.detachEvent( 'on'+type, obj[type+fn] );
		  	obj[type+fn] = null;
			} catch(e){
				return obj.detachEvent("on"+type, fn);
			}
		} 
		else{
			 obj.removeEventListener( type, fn, cap );
		}
 }
addEvent(window, "unload", EventCache.flush);
