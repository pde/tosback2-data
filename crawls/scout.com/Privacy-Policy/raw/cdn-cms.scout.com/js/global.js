//
//
//	global.js - client-side javascript functions (linked src)
//
var iButtonClickedCount = 0;
var FOXSPORTS_BRAND = 0;
if( getCookie("sessionbrandid") == "1" || ( getCookie("sessionbrandid") == null && getCookie("brandid") == "1" ) )
{
	FOXSPORTS_BRAND = 1;
}

window.onload = window_onload;
function window_onload()
{
	iButtonClickedCount = 0;
}

function isLoggedIn()
{
	return ( getCookie("tisession") != null ? true : false );
}

function ProductListFormSubmit(oForm)
{
	var bRadioButtonSelected = false;
	for (var i = 0; i < oForm.elements.length; i++)
	{
		var oElem=oForm.elements[i];
		if (oElem.type=="radio")
		{
			(oElem.checked?bRadioButtonSelected=true:false);
		}
	}
	if (!bRadioButtonSelected)
	{
		alert ('Please select at least one product by clicking on the circle in front of it.');
		return false;
	}
	
	if (PreventButtonClick(oForm))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function PreventButtonClick(oForm)
{
	iButtonClickedCount++;
	if (iButtonClickedCount > 1)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function CancelOrderClick(sCancelURL)
{
	if (confirm ('Are you sure you want to cancel this order?'))
	{
		location.replace(sCancelURL);
	}
}

function PrintThisPage()
{
	window.print();
}

function getCookie(sCookie,bReturnUpperCase)
{
	var sName = sCookie.toLowerCase() + "=";
	if (document.cookie.length > 0) 
	{
		var sCookies = (document.cookie).toLowerCase();
		var offset = sCookies.indexOf(sName);
		if (offset != -1) 
		{
			offset += sName.length;
			var end = sCookies.indexOf(";", offset);
			if (end == -1) 
			{
				end = sCookies.length;
			}
			if( bReturnUpperCase )
			{
				return (document.cookie.substring(offset, end));
			}
			else
			{
				return (sCookies.substring(offset, end));
			}
		}
	}
	return null;
}

function OpenFAQ(sURL)
{
	window.open(sURL,
				"_blank",
				"height=300,width=650,statusbar=no,status=no,location=no,scrollbars=yes,toolbar=no,resizable=yes"
	); 
}

function OpenMediaPlayer( URL )
{
	window.open( URL, "MediaPlayer", "statusbar=no,status=no,toolbar=no,menubar=no,location=no,directories=no,scrollbars=no,scrolling=no,resizable=no,width=775,height=525" );
}

function Help() 
{ 
	OpenFAQ("http://www.scout.com/support/help.html");
}

function isAllSpaces(sChars)
{
	if (sChars)
	{
		for (var i = 0; i < sChars.length; i++)
		{
			if (sChars.charAt(i) != ' ')
			{
				return false;
			}
		}
	}
	return true;
}

// From O'Reilly Javascript 3rd ed.
function getQuerystringArgs() {
	var args = new Object();
	var query = location.search.substring(1).toLowerCase(); 
	var pairs = query.split("&"); 
	for(var i = 0; i < pairs.length; i++) 
	{
		var pos = pairs[i].indexOf('='); 
		if (pos == -1) 
			continue; 
		var argname = pairs[i].substring(0,pos); 
		var value = pairs[i].substring(pos+1); 
		args[argname] = unescape(value); 
	}
	return args;
}

function GoToMessageBoard( sURL )
{
	location.href = sURL + (getCookie("brandid")?"?brandid=" + getCookie("brandid"):"") + (getCookie("sessionbrandid")?"&sessionbrandid=" + getCookie("sessionbrandid"):"") + (getCookie("iPM")?"&ipm=" + getCookie("iPM"):"");
}

function trim(str, bLeft, bRight)
{
	if (str == null || str == "undefined")
		return str;
	if (bLeft == null || bLeft == "undefined")
		bLeft = true;
	if (bRight == null || bRight == "undefined")
		bRight = true;
	if (bLeft)
		str = str.replace(/^\s+/, "");
	if (bRight)
		str = str.replace(/\s+$/, "");
	return str;
}

function ddshow(menu)
{
	document.getElementById(menu).style.visibility = 'visible';
}
function ddhide(menu)
{
	document.getElementById(menu).style.visibility = 'hidden';
}
function EmbedMediaPlayer( divTagId, mediaPlayerFileName )
{
	document.getElementById( divTagId ).innerHTML = '<OBJECT id="MediaPlayer1" codeBase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" type="application/x-oleobject" standby="Loading Microsoft® Windows® Media Player components..." width="410" height="366" align="middle" classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" VIEWASTEXT>' +
	'<PARAM NAME="fileName" VALUE="' + mediaPlayerFileName + '">' +
	'<PARAM NAME="ShowStatusBar" VALUE="1"><PARAM NAME="ShowControls" VALUE="1"><PARAM NAME="ShowDisplay" VALUE="0">' +
	'<embed type="application/x-mplayer2" pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" src="' + mediaPlayerFileName + '" align="middle" width="410" height="366" defaultframe="rightFrame" ShowStatusBar="1" ShowControls="1" ShowDisplay="0"></embed>' +
	'</OBJECT>';
}

function EmbedMySpaceMediaPlayer( myspaceFlashVars )
{
	document.write( '<embed src="http://lads.myspace.com/videos/vplayer.swf" flashvars="' + myspaceFlashVars + '" type="application/x-shockwave-flash" width="300" height="240"></embed>' );
}

function RGBColor(c)
{
    if (c.charAt(0) == '#') { 
        c = c.substr(1,6);
    }
    c = c.replace(/ /g,'');
    c = c.toLowerCase();

    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(c);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
        }
    }

    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
}
function getColor(el) {
	if(el.currentStyle){
	return el.currentStyle.color;
	}
	if(document.defaultView){
	return document.defaultView.getComputedStyle(el, '').getPropertyValue("color");
	}
}
function getBGColor(el) {
	if(el.currentStyle){
	return el.currentStyle.backgroundColor;
	}
	if(document.defaultView){
	return document.defaultView.getComputedStyle(el, '').getPropertyValue("background-color");
	}
}
/*
	getQuerystring getQuerystring(uri,key, default_)
	
	The following javascript code snippet facilitates Javascript's built in regular expressions to retrieve value of the key. 
	Optionally, you can specify a default value to return when key does not exist.
	
	The getQuerystring function is simple to use. Let's say you have the following URL:
	http://abc.com?myVal=1
	and you want to get the "myVal" querystring's value:
	var value = getQuerystring('myVal');
*/
function getQuerystring(key, default_)
{				    
	if (default_==null) default_="";
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);	 
	if(qs == null)
		return default_;
	else
		return qs[1];			   
}
// prevent continual background image reloads in IE6 on Ticker module
if( document && document.execCommand )
{
 try {
  document.execCommand("BackgroundImageCache", false, true);
 } catch(e) {}
}

