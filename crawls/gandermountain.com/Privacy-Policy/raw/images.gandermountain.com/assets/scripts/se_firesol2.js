isFromADWS();
toggleFA();
toggleLogo();
toggleUFSearch();

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

		var obj2=document.getElementById('hnav_shooting'); 
		if(obj2 != null) {showObject(obj2); }

		var shoot = getElementsByClass('hnav_shoot_cat');
		for(i=0; i<shoot.length; i++) 
		{ shoot[i].style.display = 'block'; }

	}
}

function toggleLogo()
{
	var fireRstrct = getCookie('fire_restrict');
	if((fireRstrct!=null) && (fireRstrct<4))
	{
		document.getElementById("logo").href='http://www.gandermountain.com/indexGoogle.shtml';
	}else{
		document.getElementById("logo").href='http://www.gandermountain.com/';
	}
}

function toggleUFSearch(){
	var fireRstrct = getCookie('fire_restrict');
	var searchDropdown = document.getElementById('ufSelect');
	if((fireRstrct!=null) && (fireRstrct<4))
	{	
		if(searchDropdown.options[1])
			searchDropdown.remove(1);
	}else{
		if(!searchDropdown.options[1]){
			var ufSearchOption = document.createElement('option');
			ufSearchOption.text = "Used Firearms";
			ufSearchOption.value = "1";
			try{
				searchDropdown.add(ufSearchOption,null);
			}catch(ex){
				searchDropdown.add(ufSearchOption);
			}
			
		}
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