var xpos = 35, ypos = 35,
	submitFlag = false,

	newwin;




function buildOptions( options )
{
	if ( !options )
	{
		options = "";
	}

	var finalOptions = "";

	if ( options.indexOf( "left=" ) == -1 )
	{
		finalOptions += "left=" + xpos + ",";
	}

	if ( options.indexOf( "top=" ) == -1 )
	{
		finalOptions += "top=" + ypos + ",";
	}

	if ( options.indexOf( "height=" ) == -1 )
	{
		finalOptions += "height=550,";
	}

	if ( options.indexOf( "width=" ) == -1 )
	{
		finalOptions += "width=596,";
	}

	if ( options.indexOf( "scrollbars=" ) == -1 )
	{
		finalOptions += "scrollbars=yes,";
	}

	if ( options.indexOf( "resizable=" ) == -1 )
	{
		finalOptions += "resizable=yes,";
	}

	return finalOptions + options;
}

function launchNew( url, launchOptions )
{
	self.name = "opener";
	open( url, "_blank", buildOptions( launchOptions ) );
}

function launchExt( url )
{
	if ( opener == undefined )
	{
		self.name = "opener";
		remote = open( url, "external", "resizable=yes,scrollbars=yes,width=950,height=800,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
		remote.focus();
	}
	else
	{
		if ( opener.closed )
		{
			newwin = window.open( url, "newwin", "resizable=yes,status=yes,toolbar=yes,location=yes,menubar=yes,scrollbars=yes,width=790,height=500,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
			newwin.focus();
		}
		else
		{
			opener.location.href = url;
			opener.focus();
		}
	}
}

function launchDetails( url )
{
	self.name = "opener";
	remote = open( url, "enlarge", "scrollbars=yes,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 432, 510 );
	remote.focus();
}

function launch( url )
{
	self.name = "opener";
	remote = open( url, "remote", "scrollbars=yes,width=596,height=550,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.focus();
	trackLink( url );
}

function launchCorporate( url )
{
	corporate = open( url, "corporate", "resizable=yes,status=yes,toolbar=yes,location=yes,menubar=yes,scrollbars=yes,width=790,height=500,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	corporate.focus();
	trackLink( url );
}

function launchBB( url )
{
	self.name = "opener";
	remote = open( url, "remote", "scrollbars,width=650,height=550,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.focus();
}

function launchEnlargedBBABImage( url )
{
	self.name = "opener";
	remote = open( url, "enlarge", "resizable=yes,scrollbars=yes,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 489, 327 );
	remote.focus();
}

function launchEnlargedBBGSImage( url )
{
	self.name = "opener";
	remote = open( url, "enlarge", "resizable=yes,scrollbars=yes,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 523, 327 );
	remote.focus();
}

function launchEnlargedBBGRImage( url )
{
	self.name = "opener";
	remote = open( url, "enlarge", "resizable=yes,scrollbars=yes,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 485, 327 );
	remote.focus();
}

function launchEnlargedBBFLImage( url )
{
	self.name = "opener";
	remote = open( url, "enlarge", "resizable=yes,scrollbars=yes,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 489, 327 );
	remote.focus();
}

function launchSwatch( url )
{
	self.name = "opener";
	remote = open( url, "swatch", "top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 420, 520 );
	remote.focus();
}

function launchEnlargedImage( url )
{
	self.name = "opener";
	remote = open( url, "enlarge", "top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 420, 520 );
	remote.focus();
}

function getMVM( url )
{
	self.name = "opener";
	remote = open( url, "mvm", "scrollbars=no,width=700,height=460,top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.focus();
}

function launchZoom( url )
{
	self.name = "enlarge";
	remote = open( url, "enlarge", "top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 430, 530 );
	remote.focus();
}

function launchZoomButton( url )
{
	self.name = "opener";
	remote = open( url, "zoom", "top=" + ypos + ",left=" + xpos + ",screenY=" + ypos + ",screenX=" + xpos );
	remote.resizeTo( 430, 530 );
	remote.focus();
}









function checkSubmit()
{
	if ( !submitFlag )
	{
		submitFlag = true;

		return true;
	}
	else
	{
		return false;
	}
}

function checkCardSubmit( ignore )
{
	var ccTextField = document.getElementById( "ccnum" );

	if ( ccTextField == null || ccTextField.value == "" || ignore == true )
	{
		document.getElementById( "add_promo_code" ).click();
	}
	else
	{
		document.forms.submit_payment_information.action.value = "add_promo";
		document.getElementById( "submitPayment1" ).click();

		return false;
	}
}

function checkForCookies()
{
	if ( document.cookie )
	{
		return true;
	}
	else
	{
		return false;
	}
}

function trackLink( url )
{
	if ( typeof( s ) === 'undefined' )
	{
		return;
	}

	if ( url.indexOf( "?" ) >= 0 )
	{
		var removeIndex = new Number( url.indexOf( "?" ) );
		url = url.substring( 0, removeIndex );
	}

	s.prop23 = url;

	if ( url.indexOf( "://" ) >= 0 )
	{
		var removeIndex = new Number( url.indexOf( "://" ) );
		url = url.substring( removeIndex + 3 );
	}

	if ( url.indexOf( "www." ) >= 0 )
	{
		var removeIndex = new Number( url.indexOf( "www." ) );
		url = url.substring( removeIndex + 4 );
	}

	s.manageVars( "clearVars" );

	s.pageName = "General Info:Links:" + url;
	s.prop1    = "General Info";
	s.prop2    = "General Info";
	s.prop3    = "General Info";
	s.prop4    = "Link";
	s.prop9    = "General Info";

	s.t( s );
}