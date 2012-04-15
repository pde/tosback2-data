/*Javascript for Bubble Tooltips by Alessandro Fulciniti http://pro.html.it - http://web-graphics.com */
/*edits by Jon Hartley and Tong Lim*/
function enableTooltips(id){
var links,i,h;
if(!document.getElementById || !document.getElementsByTagName) return;
AddCss();
h=document.createElement("span");
h.id="btc";
h.setAttribute("id","btc");
h.style.position="absolute";
document.getElementsByTagName("body")[0].appendChild(h);
if(id==null) links=document.getElementsByTagName("a");
else links=document.getElementsByName(id); //now works with multiple anchor tags with same name
for(i=0;i<links.length;i++){
	links[i].className="tooltipText"; //add a class name to the anchor tags 
    Prepare(links[i]);
    }
}

function Prepare(el){
	var tooltip,t,b,s,l;
	t=el.getAttribute("title");
	if(t==null || t.length==0) t="link:";
	el.removeAttribute("title");
	tooltip=CreateEl("span","tooltip"); 
	s=CreateEl("span","top");
	s.appendChild(document.createTextNode(t));
	tooltip.appendChild(s);
	b=CreateEl("b","bottom");
	tooltip.appendChild(b);
	el.tooltip=tooltip;
	el.onmouseover=showTooltip;
	el.onmouseout=hideTooltip;
	el.onmousemove=moveTooltip; // allows the bubble to "flip" when the mouse is moving along a link
}

function moveTooltip(e){ // set the class name of the span for flipping the background graphic
	var className = Locate(e); 
	if (this.tooltip.className != className) this.tooltip.className = className; //"if" prevents flickering
}

function showTooltip(e){
	this.tooltip.className = Locate(e); 
	document.getElementById("btc").appendChild(this.tooltip);
}

function hideTooltip(e){
	var d=document.getElementById("btc");
	if(d.childNodes.length>0) d.removeChild(d.firstChild);
}

function CreateEl(t,c){
	var x=document.createElement(t);
	x.className=c; 
	x.style.display="block";
	return(x);
}

function AddCss(){
	var l=CreateEl("link");
	l.setAttribute("type","text/css");
	l.setAttribute("rel","stylesheet");
	l.setAttribute("href","/global/styles/bubbleTooltip.css");
	l.setAttribute("media","screen");
	document.getElementsByTagName("head")[0].appendChild(l);
}

function Locate(e){
	var posx=0,posy=0;
	var str_tooltip;
	if(e==null) e=window.event;
	if(e.pageX || e.pageY){
		posx=e.pageX; posy=e.pageY;
		}
	else if(e.clientX || e.clientY){
		if(document.documentElement.scrollTop){
			posx=e.clientX+document.documentElement.scrollLeft;
			posy=e.clientY+document.documentElement.scrollTop;
			}
		else{
			posx=e.clientX+document.body.scrollLeft;
			posy=e.clientY+document.body.scrollTop;
			}
		}
		// Check to see if the right edge of browser window is too close to the tooltip. 
		if (posx + 200 > document.documentElement.clientWidth){
			posx = posx - 158;
			str_tooltip = 'tooltipFlip'; 	
		}
		else str_tooltip = 'tooltip';
	document.getElementById("btc").style.top=(posy+5)+"px";
	document.getElementById("btc").style.left=(posx-18)+"px";
	return str_tooltip;
}