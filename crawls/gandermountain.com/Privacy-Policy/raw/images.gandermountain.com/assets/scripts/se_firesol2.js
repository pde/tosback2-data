isFromADWS();
toggleFA();

function isFromADWS()
{
	var fireRstrct=getCookie('fire_restrict');
	if((fireRstrct != null) && ((fireRstrct <=4 ) || (fireRstrct == "")))
	{
		if(fireRstrct=="") { fireRstrct=1; }
		fireRstrct++; setCookie('fire_restrict',fireRstrct,'',domain,'','','','');
	}
	else if((fireRstrct != null) && (fireRstrct > 4 ))
	{ setCookie('fire_restrict',fireRstrct,'',domain,'','-10','',''); }
	else if(!fireRstrct)
	{ }
}
function toggleFA()
{
	var fireRstrct=getCookie('fire_restrict');
	if((fireRstrct==null) || (fireRstrct >=4 ) || (fireRstrct==""))
	{
		var obj=document.getElementById('hnav_fire_cat'); 
		if(obj != null) {showObject(obj); }
		
		var shoot = getElementsByClass('hnav_shoot_cat');
		for(i=0; i<shoot.length; i++) 
		{ shoot[i].style.display = 'block'; }

	}
}

function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
} 