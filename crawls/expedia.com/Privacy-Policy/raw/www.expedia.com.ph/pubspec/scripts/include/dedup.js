//This function required prototype.js or /daily/js/ajax.js to already be included
function Dedup()
{
	var url = window.location.href;
	var fDelete = false;

	//Checking for SEM links.
	if( (ParamExists("kword", url)) || (ParamExists("semcid", url)) )
	{
		fDelete = true;
	}
	//Checking for Email links
	else if ( (ParamExists("emlcid", url)) || ( (ParamExists("eml", url)) && (GetParam("tpid", url) == "1") ) )
	{	
		fDelete = true;
	}
	// Trip Advisor links or other Distribution Partners
	else if ( ParamExists("mdpcid", url) )
	{
		fDelete = true;
	}
	// Online Advertising links
	else if ( ParamExists("olacid", url) )
	{
		fDelete = true;
	}
	// MSN links
	else if ( ParamExists("mdpcid", url) && ParamExists("msncid", url) )
	{
		fDelete = true;
	}
	// Affinity Marketing
	else if ( ParamExists("afmcid", url) )
	{
		fDelete = true;
	}
	// EAPs - may need to check cookie
	else if ( ParamExists("eapid", url) && (GetParam("eapid", url) != "0" ) )
	{
		fDelete = true;
	}
	// affcid: if affcid param is present and not cjXXX then dedupe
	else if ( ParamExists("affcid", url) && (GetParam("affcid", url).indexOf("cj") != 0) )
	{
		fDelete = true;
	}
	
	if (fDelete)
	{
		try{
			if(typeof(Prototype) != 'undefined'){
				var ajax = new Ajax.Request('/pub/agent.dll',{method: 'get', parameters: 'qscr=uasc&flag=d', onFailure: DeleteError});
			}
			else{
				var ajax = new Ajax();
				ajax.SendRequest('/pub/agent.dll?qscr=uasc&flag=d');
				ajax = null;
			}
		}
		catch(e){
		}
	}
}

function DeleteSuccess() {}
function DeleteError() {}

function ParamExists(strParameterAnyCase, strQueryAnyCase)
{
  return GetParam(strParameterAnyCase, strQueryAnyCase).length > 0;
}

// from LaunchKanaRealtime.js. Made the comparisons case insensitive. 
// The returned query parameter value is always in lower case
function GetParam( strParameterAnyCase, strQueryAnyCase )
{
	var strQuery = strQueryAnyCase.toLowerCase();
	var strParameter = strParameterAnyCase.toLowerCase();

        // the value string
        var strValue = "" ;

        // can we find the specified parameter in the query string? (first try with "?")
        var strParamEquals = "?" + strParameter + "=" ;
        var iParamStart    = strQuery.indexOf( strParamEquals ) ;

        if ( iParamStart == -1 )
        {
            // no - can we find the specified parameter in the query string? (now try with "&")
            strParamEquals = "&" + strParameter + "=" ;
            iParamStart    = strQuery.indexOf( strParamEquals ) ;
        }

        // did we find the specified parameter?
        if ( iParamStart != -1 )
        {
            // yes - get the starting location for the value string
            var iValueStart = iParamStart + strParamEquals.length ;

            // get the value string pointed to by the parameter
            strValue = strQuery.substring( iValueStart, strQuery.length ) ;

            // is there another parameter in the value string?
            var iNextParameter = strValue.indexOf( "&" ) ;

            if ( iNextParameter != -1 )
            {
                // yes - truncate the value string before that parameter
                strValue = strValue.substring( 0, iNextParameter ) ;
            }
        }

        // unescape the value string
        strValue = unescape( strValue ) ;

        return( strValue ) ;
}

//Make function call
Dedup();
