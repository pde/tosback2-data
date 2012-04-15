var Typostream = {

	styledElements: {},
	idCounter: 0,

	getStyle: function(x,styleProp)
	{
		
		if (x.currentStyle)
		{
			var stylePropWords = styleProp.split(/\-/g);
			styleProp = stylePropWords[0];
			for(var i = 1; i < stylePropWords.length; i++)
				styleProp += stylePropWords[i].substring(0,1).toUpperCase() + stylePropWords[i].substring(1);
			var y = x.currentStyle[styleProp];
		}
		else if (window.getComputedStyle)
			var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
		return y;
	},

	applySelector: function(selector, specificity, styles)
	{
	},

	applyStyles: function()
	{
	},

	applyRecurse: function(node, styles, hoverStyles)
	{
	},

	replaceElement: function(el, q, hoverQ)
	{
	}

};

