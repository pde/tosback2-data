function ifAdExists(slot_name, callback)
{
	var scriptTags = document.getElementsByTagName('script');
	var dom_ready = false;
	for(i=0;i<scriptTags.length;i++)
	{
		if(scriptTags[i].innerHTML.match("yld_mgr.place_ad_here.."+slot_name+".."))
		{
			dom_ready = true;
			if(scriptTags[i+1].innerHTML.match("no ads"))
			{
				// Ad does not exist
				return;
			}
			else
			{
				// Ad does exist
				callback();
				return;
			}
		}
	}
	if(!dom_ready)
	{
		setTimeout(function(){ ifAdExists(slot_name, callback); }, 500);
	}
	return;
}