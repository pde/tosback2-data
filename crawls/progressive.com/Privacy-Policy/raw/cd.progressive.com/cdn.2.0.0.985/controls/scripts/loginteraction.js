function LogInteraction(interaction)
	{
		if(document.URL.indexOf("http://localhost")<0)
		{
			var beginDomain = document.URL.indexOf('://')+3;
			var domain = document.URL.substring(beginDomain, document.URL.indexOf('/',beginDomain));
			var protocal = document.URL.substring(0, beginDomain-3);
			var sUrl= protocal + "://" + domain + "/controls/pages/LogUserInteraction.aspx?Action="+interaction;
		}
		else
		{
			var sUrl = "http://localhost.progressive.local/motorcycle/controls/pages/LogUserInteraction.aspx?Action="+interaction;
		}
		var oXmlHttp;
		if (window.XMLHttpRequest) //IE7, Firefox, Opera
		{
			oXmlHttp = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) //IE6
		{
			oXmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		if(oXmlHttp != null)
		{
			try
			{
				oXmlHttp.open("GET",sUrl,true);
				oXmlHttp.send(null);
			}
			catch(ex) {}
		}
	}	