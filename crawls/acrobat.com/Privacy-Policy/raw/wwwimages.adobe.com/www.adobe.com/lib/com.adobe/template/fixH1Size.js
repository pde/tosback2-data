/*	FIX H1 SIZE IN Master DWT TEMPLATE
	$Revision: #1 $
	@author btapley
*/

registerOnLoad(function() {
	// The cast
	var h1 = $(document.getElementsByTagName("H1")[0]),
	layoutDiv = $("layoutLogic"),
	pathDiv = $("depthpath") || $("crumbs"),
	px = "px";
	
	if(!(h1 && layoutDiv && pathDiv)) { //not master template?
		return;	
	}
	
	
/*	FIX WIDTH
	A hack to make the pathDiv appear to be contained by the H1 in pages where we can't change any existing markup. 
	
	Possible Appearance without fix
	
	------- h1 ------
	| [ Path / Path / Path ]
	| #h1text# 	|
	-----------------
	
	Desired appearance
	
	-------------  h1 ---------------
	| [ Path / Path / Path ]	|
	| #h1text#			|
	---------------------------------
	
	How:
	Calculate the id the Path Nav is wider than the h1 tab
	If wider, increase the width of the h1 tab
*/
	var h1RightPadding = parseInt(h1.getStyle("padding-right")),
	pathWidth = pathDiv.getWidth() + parseInt(pathDiv.getStyle("left")),
	widthDiff = (pathWidth + h1RightPadding) - h1.getWidth(),
	quirksMode = (document.all && document.compatMode != "CSS1Compat");
		
	if(widthDiff > 0) {
		var widthAdjust = (quirksMode) ? (pathWidth + h1RightPadding) : pathWidth;
		h1.setStyle({
			width: widthAdjust+px
		});
	}
	
/*	FIX HEIGHT
	A hack to create the tabbed H1 in pages where we can't change any existing markup. 
	
	The existing markup
	
	-------------  Layout DIV ---------------
	| [ Path Nav ]				|
	| [ h1 ]				|
	|					|
	|					|
	|					|
	|					|
	-----------------------------------------
	
	The desired appearance
	
	-------------  h1 ---------------
	| [ Path Nav ]			|
	| #h1text#			|
	---------------------------------
	-------------  Layout DIV ---------------
	|					|
	|					|
	|					|
	|					|
	-----------------------------------------
	
	How:
	The LayoutDiv has a default number of pixels of top margin, providing a space for the h1 tab.
	The h1 is styled as a tab and negatively positioned a default number of pixels above its container. 
	The Path Nav is positioned in the same way to appear inside the h1 tab. 
	If the natural height of the h1 is taller than the single line provided as a default ie. the h1 text wraps, 
	resize the h1 box to contain it.
*/
	var h1StyleHeight = parseInt(h1.getStyle("height")),
	h1AdjustedHeight = 0,
	h1HeightOverflow;
	
	h1HeightOverflow = getHeightOverflow();
	
	if(!h1HeightOverflow) { return; }
	
	if(quirksMode) {			
		h1.setStyle({
			width: layoutDiv.getStyle("width")
		});
		
		h1HeightOverflow = getHeightOverflow(); // check again for IE, it tends to shift things around as this script sets styles
		
		if(!h1HeightOverflow) {
			h1.setStyle({
				width: "auto",
				whiteSpace: "nowrap"
			});
			
			return;
		}
		
	}
	
	h1AdjustedHeight = h1StyleHeight + h1HeightOverflow;
	
	h1AdjustedPadding = (!window.opera) ? 0 : parseInt(h1.getStyle("padding-top")) + parseInt(h1.getStyle("padding-bottom"));
	
	h1.setStyle({
		height: h1AdjustedHeight-h1AdjustedPadding+px,
		marginTop: (parseInt(h1.getStyle("margin-top")) - h1HeightOverflow + px)
	});
	
	layoutDiv.setStyle({
		marginTop: (parseInt(layoutDiv.getStyle("margin-top")) + h1HeightOverflow + px)
	});
	
	pathDiv.setStyle({
		top: (parseInt(pathDiv.getStyle("top")) - h1HeightOverflow + px)
	});
		
	return;
	
	function getHeightOverflow() {
		var result = 0;
		
		if(quirksMode) {
			
			result = h1.getHeight() - h1StyleHeight;
		
		} else {
			
			var h1Height = h1.getHeight();
			
			h1.setStyle({
				height: "auto",
				display: "block"
			});
			
			var h1NaturalHeight = h1.getHeight();
			
			result = (h1NaturalHeight - h1Height);
			
			h1.setStyle({
				height: "",
				display: ""
			});
		}
		
		return (result > 0) ? result : 0;
	}
});