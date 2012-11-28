(function(){
$.fn.customSelect = function(){
	this.each(function(){
		rsSelectReplace(this);
	});
	jQuery(document).click(function (e){
			var target = (window.event) ? window.event.srcElement : e.target;

			if(document.srExpandedList)
			{
				if((target.srIndex || target.srIndex === 0)
					&& document.srExpandedList == target.parentNode	)
					document.srExpandedList.srCollapse(target);
				else
					document.srExpandedList.srCollapse();
			}
			else
			{
				if(target.srIndex || target.srIndex === 0)
					target.parentNode.srExpand();
			}
	});
}


function rsSelectReplace(sel)
{
	//check ie
	var ie6 = (navigator.userAgent.search('MSIE 6.0') != -1);
	var ul = document.createElement('ul');
	jQuery(ul).addClass('srList srCollapsed srBlur');
	
	//link beetwen ul and select
	ul.srSelect = sel;
	sel.srReplacement = ul;
	
	jQuery(sel).addClass('srReplacedSelect');

	//sel.onfocus = function() { this.srReplacement.className = this.srReplacement.className.replace(/[\s]?srBlur/, ' srFocus'); }

	//sel.onblur = function() {
		//this.srReplacement.srCollapse();
		//this.srReplacement.className = this.srReplacement.className.replace(/[\s]?srFocus/, ' srBlur');
	//}
	
	sel.onchange = function()
	{
		var ul = this.srReplacement;
		ul.srSelectLi(ul.childNodes[this.selectedIndex]);
	}
	
	sel.onkeypress = function(e)
	{
		var i = this.selectedIndex;
		var ul = this.srReplacement;
		switch (e.keyCode) {
			case 9:
				this.srReplacement.srCollapse();
			break;

			case 37: // left
			case 38: // up
				if (i - 1 >= 0)
					ul.srSelectLi(ul.childNodes[i - 1]);
			break;

			case 40: // down
				if(e.altKey)
				{
					//ul.srExpand();
					//break;
				}
			case 39: // right

				if (i + 1 < ul.childNodes.length)
					ul.srSelectLi(ul.childNodes[i + 1]);
			break;

			case 33: // Page Up
			case 36: // Home
				ul.srSelectLi(ul.firstChild);
			break;

			case 34: // Page Down
			case 35: // End
				ul.srSelectLi(ul.lastChild);
			break;
		}
	}

	//change  class for ul on mouse over, mouse out
	//ul.onmouseover = function() { this.className += ' srHoverUl'; }
	//ul.onmouseout = function() { this.className = this.className.replace(/[\s]?srHoverUl/, ''); }

	ul.srSelectLi = function(li)
	{
		var ul = li.parentNode;

		if(ul.srSelectesIndex != null)
			jQuery(ul.childNodes[ul.srSelectesIndex]).removeClass();

		//store index of selected element
		ul.srSelectesIndex = li.srIndex;
		
		jQuery(ul.childNodes[li.srIndex]).removeClass();
		jQuery(ul.childNodes[li.srIndex]).addClass('srSelectedLi');
		return li.srIndex;
	}

	ul.srExpand = function()
	{
		if(!this.srExpanded)
		{
			if(document.srExpandedList)
				document.srExpandedList.srCollapse();

			document.srExpandedList = this;

			//expand list
			jQuery(this).removeClass('srCollapsed');
			jQuery(this).addClass('srExpanded');
			this.srExpanded = true;
			
			this.srSelect.focus();

			if(ie6) 
			{
				var node = this.firstChild;
				var offset = 0;
				var height = node.clientHeight;
				while(node)
				{
					node.style.position = 'absolute';
					node.style.top = offset;
					offset += height; 
					node = node.nextSibling;
				}
			}
		}
	}

	ul.srCollapse = function(li)
	{	
		if(this.srExpanded)
		{
			document.srExpandedList = null;

			if(li){
				this.srSelect.selectedIndex = this.srSelectLi(li);
				jQuery('[name=cgid]').val(this.srSelect.options[this.srSelect.selectedIndex].value);
			}
			this.srSelect.focus();
			jQuery(this).trigger("customselectorselected");
			//callapse list
			jQuery(this).removeClass('srExpanded');
			jQuery(this).addClass('srCollapsed');
			this.srExpanded = false;

			if(ie6)
			{
				var node = this.firstChild;
				while(node)
				{
					node.style.position = '';
					node = node.nextSibling;
				}
			}
		}
	}


	var options = sel.options;
	var len = options.length;

	for(var i = 0; i < len; i++)
	{
	    var li = document.createElement('li');
		li.appendChild(document.createTextNode(options[i].text));

		li.srIndex = i;

		jQuery(li).mouseover(function(){ 
			jQuery(this).toggleClass('srHoverLi'); 
		});
		
		jQuery(li).mouseout(function(){ 
			jQuery(this).toggleClass('srHoverLi'); 
		});

		ul.appendChild(li);
	}
	
	if(sel.selectedIndex == null)
		sel.selectedIndex = 0;
	jQuery('[name=cgid]').val(sel.options[sel.selectedIndex].value);
	ul.srSelectLi(ul.childNodes[sel.selectedIndex]);

	jQuery(sel).after(jQuery(ul));
}
})(jQuery);