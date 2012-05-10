/**************************************************
hoverTooltip.js
Author: Tong Lim
Version: 1.0
Date: 2/25/2010
Update: 8/9/2010
Depend: It depend on hoverTooltip.css file.
Description: A mouse over tool tip.
Example:<link rel="stylesheet" type="text/css" href="/u-verse/styles/hoverTooltip.css" />
		<script type="text/javascript" src="/u-verse/scripts/hoverTooltip.js"></script>
		<script type="text/javascript">window.onload=hoverTooltip.enableTooltips('useToolTip')</script>
		<script type="text/javascript">window.onload=hoverTooltip.enableTooltips('useToolTip_up','/media/en_US/images/img/bubbleTooltip_up_296x88.gif','/media/en_US/images/img/bubbleTooltipFlip_up_296x88.gif','296','88', 95, 230);</script>
		<a name="useToolTip" toolTipMessage="Hello World'>Mouse over here.</a>
***************************************************/

var hoverTooltip = new function () {
	var v_tooltipDiv = 'hoverTooltipDiv';
	var v_tooltipClass = 'hoverTooltip';
	var v_tooltipFlipClass = 'hoverTooltipFlip';
	var v_tooltipTextClass = 'hoverToolTipText';
	var v_type = '';
	var v_upWidth = '';
	var v_upHeight = '';
	
	this.enableTooltips = function enableTooltips (pName, pImage1, pImage2, pWidth, pHeight,  upHeight, upWidth) {
		if (arguments.length > 0) {
			var vDivElement, vArr_obj;
			vDivElement = document.createElement("div");
			vDivElement.id = v_tooltipDiv;
			vDivElement.style.position = 'absolute';
			vDivElement.style.zIndex = '150';
			document.getElementsByTagName('body')[0].appendChild(vDivElement);
			vArr_obj = (pName==undefined) ? document.getElementsByTagName("a") : document.getElementsByName(pName);
			for (var i=0; i < vArr_obj.length; i++) {
				if (arguments.length == 7) {
					vArr_obj[i].hoverTooltipImage1 = pImage1;
					vArr_obj[i].hoverTooltipImage2 = pImage2;
					vArr_obj[i].hoverTooltipWidth = pWidth;
					vArr_obj[i].hoverTooltipHeight = pHeight;
					v_upHeight = upHeight;
					v_upWidth = upWidth;
					v_type = 'image';
				}
				activateTooltip(vArr_obj[i]);
			}
			if ((arguments.length == 2) && (pImage1 = 'up')) {
				v_tooltipClass = 'hoverTooltip_up';
				v_tooltipFlipClass = 'hoverTooltipFlip_up';
				v_type = 'up';
				v_upHeight = 95;
				v_upWidth = 25;
		}
		}
	} // end of enableTooltips
		
	function activateTooltip(param) {
		var vText, vTooltipText, vTooltip;
		vText = param.getAttribute("toolTipMessage");
		if (vText != null) {
			param.removeAttribute("toolTipMessage");
			
			vTooltipText = document.createElement("div"); 
			vTooltipText.className = v_tooltipTextClass;
			vTooltipText.innerHTML = vText;
			vTooltip = document.createElement("div"); 
			vTooltip.className = v_tooltipClass;
			vTooltip.appendChild(vTooltipText);
			param.hoverTooltip = vTooltip;
			
			param.onmouseover = showTooltip;
			param.onmouseout = hideTooltip;
			param.onmousemove = showTooltip;
		}
	} // end of activateTooltip

	function showTooltip (e) {
		var elem = document.getElementById(v_tooltipDiv);
		if (elem.childNodes.length == 0) elem.appendChild(this.hoverTooltip); 
		var vIsFlip = cursorLocation(e,this.hoverTooltipWidth); 
		//if (this.hoverTooltipImage2 == undefined) {
		if (v_type != 'image') {
			if (vIsFlip) { this.hoverTooltip.className = v_tooltipFlipClass;} 
			else { this.hoverTooltip.className = v_tooltipClass;	} 
		} else {
			if (vIsFlip) { this.hoverTooltip.style.background = 'url(' + this.hoverTooltipImage2 + ') no-repeat'; } 
			else { this.hoverTooltip.style.background = 'url(' + this.hoverTooltipImage1 + ') no-repeat'; }
			//this.hoverTooltip.style.width = this.hoverTooltipWidth +"px";
			//this.hoverTooltip.style.height = this.hoverTooltipHeight  + "px";
			//this.hoverTooltip.firstChild.style.width = (this.hoverTooltipWidth - 20) + "px";
			//this.hoverTooltip.firstChild.style.height = this.hoverTooltipHeight + "px"; 
		}
	} // end of showTooltip

	function hideTooltip (e) {
		var elem = document.getElementById(v_tooltipDiv);
		if (elem.childNodes.length > 0) elem.removeChild(elem.firstChild);
	}

	function cursorLocation (e, pWidth){
		var posx=0, posy=0, vIsFlip=false, vNum=296;
		if (pWidth != undefined) vNum = pWidth;
		if (e==null) e=window.event;
		if (e.pageX || e.pageY) {
			posx = e.pageX; 
			posy = e.pageY;
		} else if (e.clientX || e.clientY) {
			if (document.documentElement.scrollTop) {
				posx = e.clientX +document.documentElement.scrollLeft;
				posy = e.clientY + document.documentElement.scrollTop;
			} else {
				posx = e.clientX +document.body.scrollLeft;
				posy = e.clientY+document.body.scrollTop;
			}
		}		
		if (posx + vNum > document.documentElement.clientWidth) {
			posx = posx - vNum + 40;
			vIsFlip = true; 	
		} 
		if (v_type == '') {
		document.getElementById(v_tooltipDiv).style.top = (posy + 5) + "px";
		document.getElementById(v_tooltipDiv).style.left = (posx - 18) + "px";
		} else {
			document.getElementById(v_tooltipDiv).style.top = (posy - v_upHeight) + "px";
			document.getElementById(v_tooltipDiv).style.left = (posx - v_upWidth) + "px";
		}
		return vIsFlip;
	} // end of cursorLocation

} // end of hoverTooltip
