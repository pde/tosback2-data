var count;

function GetPClickUrl(s, intl)
{
	if (s && intl)	
		return "http://pclick.internal.yahoo.com/p/s=" + s + "/lng=" + intl + "/t=" + Math.random();
		
	return "";
}

function GetRClickUrl(s, d)
{
	if (s && d)
		return "/r?s=" + s + "&d=" + escape(d) + "&rand="+ Math.random();
		
	return "";
}

function SendBeacon(sBeaconUrl, fOnComplete)
{
	if (!sBeaconUrl || !fOnComplete || typeof fOnComplete !== 'function')
		return false;
		
	var result = true;
	
	try
	{
		imgBeacon = new Image();		
		imgBeacon.onerror = fOnComplete;
		imgBeacon.onabort = imgBeacon.onerror;
		imgBeacon.onload = imgBeacon.onerror;
		imgBeacon.src = sBeaconUrl;
	}
	catch(e){result = false;}
	
	return result;
}

function BeaconNavigate(a, evt, sBeaconUrl)
{		
	var result = true;
	
	if (sBeaconUrl)
	{
		try
		{
			if(! (sBeaconUrl instanceof Array)) sBeaconUrl = [sBeaconUrl];
			count = sBeaconUrl.length;
			for(var i = 0; i < sBeaconUrl.length; i++)
			{
				var imgBeacon = new Image();
			
				if (a && a.href && !a.target && !(evt && evt.shiftKey))
				{				
					imgBeacon.url = a.href;
					imgBeacon.onerror = OnNavigateBeaconComplete(imgBeacon);
					imgBeacon.onabort = imgBeacon.onerror;			
					imgBeacon.onload = imgBeacon.onerror;			
					result = false;
				}	
	    
				imgBeacon.src = sBeaconUrl[i];
			}
		}
		catch(e){}
  }
  
  return result;
}

function BeaconDownload(a, evt, sBeaconUrl, sDownloadCompleteUrl)
{	
	// onreadystatechange and readyState can be used to detect when the download
	// is complete before navigating to sDownloadCompleteUrl.  Firefox and Safari
	// do not appear to offer alternatives (not that I could find).
		
	// IE 6.0 on XP SP2 or later will show the yellow bar security warning
	// if you delay the download until after the beacon completes.  Firefox and
	// Safari do not have this kind of behavior.
	
	// IE does not appear to interupt the beacon navigate with the navigate to
	// the download.
	
	if (document.onreadystatechange == null || typeof document.onreadystatechange == "undefined" || typeof document.readyState == "undefined")
	{
		var result = BeaconNavigate(a, evt, sBeaconUrl);
		
		if (sDownloadCompleteUrl)
			setTimeout("window.location.href='"+sDownloadCompleteUrl+"';", 2000);
			
		return result;
	}
	
	try
	{
		if(! (sBeaconUrl instanceof Array)) sBeaconUrl = [sBeaconUrl];
		count = sBeaconUrl.length;
		for(var i = 0; i < sBeaconUrl.length; i++)
		{
			var imgBeacon = new Image();
		
			if (sDownloadCompleteUrl)
			{			
				document.onreadystatechange = DownloadProgressIE(imgBeacon);
				imgBeacon.doneUrl = sDownloadCompleteUrl;
			}
    
			imgBeacon.src = sBeaconUrl[i];
		}
		
	}
	catch(e){}
  
  return true;
}

function BeaconNavigateToOnLoadDownload(sBeaconUrl, sOnLoadDownloadUrl)
{
	// This kind of behavior will cause the yellow bar to show up in IE6 on XP SP2 or later.
	// Use BeaconDownload for IE.
	if (document.onreadystatechange != null && typeof document.onreadystatechange != "undefined" && typeof document.readyState != "undefined")
	{
		assert(false);
		return true;
	}
	
	if (!sOnLoadDownloadUrl)
	{
		assert(false);	
		return true;
	}

	if (!sBeaconUrl)
	{
		setTimeout("window.location.href='"+sOnLoadDownloadUrl+"';", 100);
		return false;
	}
				
	var result = true;
			
	try
	{
		if(! (sBeaconUrl instanceof Array)) sBeaconUrl = [sBeaconUrl];
		count = sBeaconUrl.length;
		for(var i = 0; i < sBeaconUrl.length; i++)
		{
			var imgBeacon = new Image();
		
			imgBeacon.url = sOnLoadDownloadUrl;
			imgBeacon.onerror = OnNavigateBeaconComplete(imgBeacon);
			imgBeacon.onabort = imgBeacon.onerror;			
			imgBeacon.onload = imgBeacon.onerror;			
			result = false;
    
			imgBeacon.src = sBeaconUrl[i];
		}
		
	}
	catch(e){}
	
	return result;
}

function DownloadProgressIE(imgBeacon)
{	
	return function()
	{
		if (window.document.readyState=="interactive")
		{		
			if (imgBeacon && imgBeacon.doneUrl)
			{
				count--;
				if(!count)
				{
					var url = imgBeacon.doneUrl;
					imgBeacon = null;
			
					setTimeout("window.location.href='"+url+"';", 100);
				}
			}
		}
	}
}

function OnNavigateBeaconComplete(imgBeacon)
{
	return function()
	{
		if (imgBeacon && imgBeacon.url)
		{
			count--;
			if(!count)
			{
				var url = imgBeacon.url;
				imgBeacon = null;
		
				window.location.href = url; 		
			}
		}
	}
}