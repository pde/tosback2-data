	//Browser detection code - quirks mode 
	var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return 
	
			parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
		    },
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]
	
	};
	
	BrowserDetect.init();

// End of Browser detection code
// Code for asynchronously loading MSN ads
	function ShowMSN(theUniqueID)
	{
	      var tDiv = document.getElementById("datadiv");
	        var FirstElement = tDiv.firstChild;
	        var v = FirstElement.nodeValue;
	        var tFrame = document.getElementById(theUniqueID);
	        var doc = tFrame.contentDocument;
	        if (doc == undefined || doc == null)
	          doc = tFrame.contentWindow.document;
	        doc.open();
			doc.write('<html><body style="margin:0px !important;">');
	        doc.write(v);
			doc.write('</body></html>');
	        doc.close();
	      tFrame.style.visibility="visible";
	}


// Code for testing the browser and calling different approach
	function iv_NewdrawMSN() {
		if(BrowserDetect.browser != 'Explorer') {
				document.write('<div style="position:absolute;left:0;top:0;visibility:hidden;" id="datadiv">');
				document.write('<!--');
				document.writeln('<scr'+'ipt type=\"text/javascript\">');
				document.writeln("microsoft_adunitid= \"" + theAdUnit + "\";");
	 			document.writeln("microsoft_adunit_width= \"" + theWidth + "\";");
	 			document.writeln("microsoft_adunit_height= \"" + theHeight + "\";");
				document.writeln('microsoft_adunit_legacy = "false";')
				document.writeln('</scr'+'ipt>');
				document.writeln('<scr'+'ipt type=\"text/javascript\" src=\"http://adsyndication.msn.com/delivery/getads.js\"></scr'+'ipt>');
				document.write('-->');
				document.write('</div>');
				document.writeln('<iframe scrolling=\"no\" frameborder=\"no\" id=\"' + theUniqueID + '\" style=\"visibility:hidden; border: none; width:' + theWidth + 'px; height:' + theHeight + 'px;\" src=\"about:blank\"></iframe>');
				setTimeout("ShowMSN('" + theUniqueID + "')", 1000);
			} else {
					microsoft_adunitid	= theAdUnit;
					microsoft_adunit_width	= theWidth ;
					microsoft_adunit_height	= theHeight;
					microsoft_adunit_legacy	= "false";	
					document.writeln('<scr'+'ipt type=\"text/javascript\" src=\"http://adsyndication.msn.com/delivery/getads.js\"></scr'+'ipt>');
			}  
	}