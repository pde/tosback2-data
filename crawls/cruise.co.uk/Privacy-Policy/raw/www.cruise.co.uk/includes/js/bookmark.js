function bookmark(url,title)
{
	if(window.external)
	{
		try
		{
			window.external.AddFavorite(url,title);
		}
		catch(e)
		{
			alert("To add our website to your bookmarks use\nCTRL+D on Windows and Linux and\nCommand+D on the Mac.");
		}
	}
	else
		alert("To add our website to your bookmarks use\nCTRL+D on Windows and Linux and\nCommand+D on the Mac.");
}
