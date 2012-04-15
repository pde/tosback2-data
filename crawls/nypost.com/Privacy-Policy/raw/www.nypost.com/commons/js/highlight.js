
var PortalHighlight = {

	context : '',
	contentElement : null,
	cssClassName : 'highlight',
	
	init : function(always) {

		PortalCommons.addLoadEvent(function() {
		
			try {
		
				if (always || location.search.indexOf('?hl') != -1) {
					
					if (!PortalHighlight.contentElement)
						return;

					var el = PortalHighlight.contentElement ? document.getElementById(PortalHighlight.contentElement) : document.body;						
					if (el) {
						var qs = PortalCommons.getRemoteHTML(PortalHighlight.context + '/Search/Highlight');
						if (qs) {		
							var parts = eval(qs);
							if (typeof(parts) == 'string') {
								PortalHighlight.execute(parts,el);
							} else {
								for (var i = 0 ; i < parts.length ; ++i) {
									if (parts[i] && parts[i].length > 0)
										PortalHighlight.execute(parts[i],el);
								}
							}
						}
					}
				}
		
			} catch (ex) {
			}	
		});
	}, 
	
	execute : function (str,el) {

		if (document.body.createTextRange) {
			
			var range = document.body.createTextRange();
			range.moveToElementText(el);
			// range.findText iFlags:
			//   0 Default. Match partial words. 
			//   1 Match backwards. 
			//   2 Match whole words only. 
			//   4 Match case. 			
			for (var i = 0; range.findText(str,1,2); i++) {
				range.pasteHTML('<span class="' + PortalHighlight.cssClassName + '">' + range.text + '<\/span>');
				range.collapse(false);
			}

		} else {

			// reset selection and cursor
			var sel = window.getSelection();
			sel.selectAllChildren(document.body);
			sel.collapseToStart();

			//window.find(aString, aCaseSensitive, aBackwards, aWrapAround, aWholeWord, aSearchInFrames, aShowDialog);			
			while(window.find(str , false, false, true, true, false, false)) {					
				var sel = window.getSelection();
				
				// search if selection is an el subchild
				var skip = true;
				var n = sel.anchorNode;
				while(n) {
					if (n == el) {
						skip = false;
						break;
					}
					n = n.parentNode;
				}
				
				if (skip)
					continue;
				
				var range = sel.getRangeAt(0);
				var hlNode = document.createElement("span");
				hlNode.className = PortalHighlight.cssClassName;
				range.surroundContents(hlNode);
				sel.collapseToEnd();
			}

			// reset selection and cursor
			var sel = window.getSelection();
			sel.selectAllChildren(document.body);
			sel.collapseToStart();
			document.body.scrollTop = 0;
		}
	},

	__end__ : null
};

