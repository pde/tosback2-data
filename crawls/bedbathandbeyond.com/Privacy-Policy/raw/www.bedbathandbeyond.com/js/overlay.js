<!--
function continueToTOG()
{
	$("#signupFrame").hide();
	$("#darkLayer").hide();
	$("#signupContainer").hide();
    OpenNewWindow('/rdTOG.asp', 810, 560, 'yes', 'yes' );
    document.optin.email.disabled="";
}

function continueToTOGBTS()
{
	$("#signupFrame").hide();
	$("#darkLayer").hide();
	$("#signupContainer").hide();
    OpenNewWindow('/rdTOGBTS.asp', 810, 560, 'yes', 'yes' );
    document.optin.email.disabled="";
}

function onClickOpenTOG(sTOG)
{
	if ( sTOG == 1 )
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "default.asp";
		var sTempCookie = "Left Nav Promo Buttons";		
	}
	else if ( sTOG == 2 )
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "default.asp";
		var sTempCookie = "Home Page Promo Buttons - Wedding Stationary";		
	}
	else if ( sTOG == 3 )
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "regHome.asp";
		var sTempCookie = "Left Nav RegHome Promo Buttons";		
	}
	else if ( sTOG == 4 )
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "regHome.asp";
		var sTempCookie = "RegHome Promo Buttons";		
	}
	else if ( sTOG == 5 )
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "default.asp";
		var sTempCookie = "BBBYTOG Overlay Close Buttons";		
	}
	else if ( sTOG == 6 )
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "Searchsku.asp";
		var sTempCookie = "Invitations Keyword Banner";		
	}
	else if ( sTOG == 7 )
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "Btshome.asp";
		var sTempCookie = "Left Nav BTSHome Promo Buttons";
	}
	else if ( sTOG == 8 || sTOG == 9 )
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "brandQuirky.asp";
		var sTempCookie = "Quirky Get Involved Buttons";		
	}
	else
	{
		var sSrcKey = "BBBYTOG";
		var sURL_Used = "default.asp";
		var sTempCookie = "Home Page Close Buttons";		
	}
	var sParms = "SrcKey=" + sSrcKey + "&URL_Used=" + sURL_Used + "&TempCookie=" + sTempCookie;

	$.ajax(
	{
		url: "Redirect_TOG.asp",
		dataType: "application/x-www-form-urlencoded",
		data: sParms,
		success: function ( data )
		{
			if ( data == "True" )
			{
				if ( sTOG == 1 )
				{
					$("#signupFrame").show();
					$("#darkLayer").show();
					$("#darkLayer").addClass( "darkClass" );
					$("#signupContainer").removeClass();
					$("#signupContainer").addClass( "signupHome1" );
					$("#signupContainer").fadeIn( "slow" );
					document.optin.email.disabled="disabled";
				}
				else if ( sTOG == 2 )
				{
					$("#signupFrame").show();
					$("#darkLayer").show();
					$("#darkLayer").addClass( "darkClass" );
					$("#signupContainer").removeClass();
					$("#signupContainer").addClass( "signupHome2" );
					$("#signupContainer").fadeIn( "slow" );
					document.optin.email.disabled="disabled";
				}
				if ( sTOG == 3 )
				{
					$("#signupFrame").show();
					$("#darkLayer").show();
					$("#darkLayer").addClass( "darkClass" );
					$("#signupContainer").removeClass();
					$("#signupContainer").addClass( "signupReg1" );
					$("#signupContainer").fadeIn( "slow" );
					document.optin.email.disabled="disabled";
				}
				else if ( sTOG == 4 )
				{
					$("#signupFrame").show();
					$("#darkLayer").show();
					$("#darkLayer").addClass( "darkClass" );
					$("#signupContainer").removeClass();
					$("#signupContainer").addClass( "signupReg2" );
					$("#signupContainer").fadeIn( "slow" );
					document.optin.email.disabled="disabled";
				}
				else if ( sTOG == 5 )
				{
					$("#signupFrame").hide();
					$("#darkLayer").hide();
					$("#signupContainer").hide();
					document.optin.email.disabled="";                    
				}
				else if ( sTOG == 6 )
				{
					$("#signupFrame").show();
					$("#darkLayer").show();
					$("#darkLayer").addClass( "darkClass" );
					$("#signupContainer").removeClass();
					$("#signupContainer").addClass( "signupReg2" );
					$("#signupContainer").fadeIn( "slow" );
					document.optin.email.disabled="disabled";
				}
				else if ( sTOG == 7 )
				{
					$("#signupFrame").show();
					$("#darkLayer").show();
					$("#darkLayer").addClass( "darkClass" );
					$("#signupContainer").removeClass();
					$("#signupContainer").addClass( "signupBTS1" );
					$("#signupContainer").fadeIn( "slow" );
					document.optin.email.disabled="disabled";
				}
				else if ( sTOG == 8 )
				{
					$("#signupFrame").show();
					$("#darkLayer").show();
					$("#darkLayer").addClass( "darkClass" );
					$("#signupContainer").removeClass();
					$("#signupContainer").addClass( "quirkyGetinvolved" );
					$("#signupContainer").fadeIn( "slow" );
				}
				else if ( sTOG == 9 )
				{
					$("#signupFrame").show();
					$("#darkLayer").show();
					$("#darkLayer").addClass( "darkClass" );
					$("#signupContainer").removeClass();
					$("#signupContainer").addClass( "quirkyCommunity" );
					$("#signupContainer").fadeIn( "slow" );
				}
			}
		}
	});

       var b = document.body;       
       document.getElementById("signupFrame").style.height = b.scrollHeight + "px";
       document.getElementById("darkLayer").style.height = b.scrollHeight + "px"; 
              
}

//-->