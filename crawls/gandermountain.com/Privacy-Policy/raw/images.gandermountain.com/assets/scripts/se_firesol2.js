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
	if((fireRstrct==null) || (fireRstrct >=4 ))
	{var obj=document.getElementById('hnav_fire_cat'); if(obj != null) {showObject(obj); } }
}
