// always-include-ns.js  Copyright 1998-2005 PaperThin, Inc. All rights reserved.
function setStatbar(statbar)
{
	var strStatbar=unescape(statbar);
	window.status=strStatbar;
}
function HandleLink(parentID,link,displaylink)
{
	// links are in one of the following formats:
	// 		cpe_60_0,CP___PAGEID=100
	// 		CPNEWWIN:WindowName^params@CP___
	// displaylink is the server relative URL or fully qualified URL
	windowname = "";
	windowparams = "";

	// "CPNEWWIN:" & NewWindowName & "^" & params & "@" & linkStruct.LinkURL;
	pos = link.indexOf ("CPNEWWIN:");
	if (pos != -1)
	{
		pos1 = link.indexOf ("^");
		windowname = link.substring (pos+9, pos1);
		pos2 = link.indexOf ("@");
		windowparams = link.substring (pos1 + 1, pos2);
		link = link.substring (pos2 + 1, link.length);
	}

	if( displaylink && displaylink != "" )
	{		
		if (windowname == "")
			window.location = displaylink;
		else
		{
			windowparams = FormatWindowParams(windowparams);
			window.open (displaylink, windowname, windowparams);
		}
	}
	else
	{
		if (link.indexOf ("CP___") != -1)
		{
			targetLink = link;

			if (link.indexOf ("CP___") != -1)
			{


				httpPos = -1;
				commaPos = link.indexOf(",");
				if (commaPos != -1)
				{
					targetUrl = link.substr(commaPos + 1);
					if (targetUrl.indexOf("://") != -1 || targetUrl.indexOf("/") == 0)
					{
							httpPos = commaPos + 1;
					}		
				}
				
				if (httpPos != -1)
				{
					targetLink = link.substr(httpPos);

					commaPos = targetLink.indexOf(",");
					if (commaPos != -1)
						targetLink = targetLink.substr(0, commaPos);
				}
				else
					targetLink = jsDlgLoader + "?csModule=utilities/handle-link&thelink=" + link;

				if (windowname == "")
					window.location = targetLink;
				else
				{
					windowparams = FormatWindowParams(windowparams);
					window.open (targetLink, windowname, windowparams);
				}
			}
		}
		else
		{
			//commaPos = link.indexOf(",");
			//if (commaPos != -1)
			//	link = link.substr(0, commaPos);

			if (windowname == "")
				window.location = link;
			else
			{
				windowparams = FormatWindowParams(windowparams);
				window.open (link, windowname, windowparams);
			}
		}
	}
}
function onLoadComplete()
{
}
function doWindowOpen(href,name,params)
{
	window.open (href, name, params);
}
function FormatWindowParams(windowparams)
{
	if (windowparams.indexOf(":loc=") != -1 || windowparams.indexOf(":ww=") != -1 || windowparams.indexOf(":hh=") != -1 ||
	    windowparams.indexOf(":left=") != -1 || windowparams.indexOf(":top=") != -1)
	{
		windowparams = substringReplace(windowparams,':left=',',left=');
		windowparams = substringReplace(windowparams,'left=','left=');
		windowparams = substringReplace(windowparams,':ww=',',width=');
		windowparams = substringReplace(windowparams,'ww=','width=');
		windowparams = substringReplace(windowparams,':hh=',',height=');
		windowparams = substringReplace(windowparams,'hh=','height=');
		windowparams = substringReplace(windowparams,':loc=',',location=');
		windowparams = substringReplace(windowparams,'loc=','location=');
		windowparams = substringReplace(windowparams,':dir=',',directories=');
		windowparams = substringReplace(windowparams,'dir=','directories=');
		windowparams = substringReplace(windowparams,':tb=',',toolbar=');
		windowparams = substringReplace(windowparams,'tb=','toolbar=');
		windowparams = substringReplace(windowparams,':stat=',',status=');
		windowparams = substringReplace(windowparams,':mb=',',menubar=');
		windowparams = substringReplace(windowparams,':sb=',',scrollbars=');
		windowparams = substringReplace(windowparams,':rs=',',resizeable=');
	}
	return windowparams;
}
var loopcnt = 0;
function doReload(param)
{
	if (self.location.search == param)
	{
		self.location.reload();
		loopcnt = 0;
	}
	else
	{
		if (loopcnt > 10)
			return 0;
		setTimeout('doReload(tmp)',500);
		loopcnt = loopcnt + 1;
	}
	return 1;
}
