
        var CONTEXT_PATH='<%=properties.get("SITE_SEARCH_FULL_CONTEXT_PATH")%>'	
	

function trim(sString) 
	{
		while (sString.substring(0,1) == ' '){
			sString = sString.substring(1, sString.length);
		}	
		var subStr =sString.length;
		while (sString.substring(subStr-1, subStr) == ' '){		 
		sString = sString.substring(0,subStr-1);
		subStr =sString.length;
		}
		return sString;
	}

	
	var toEncode = [ "<",">","\"","'","%",";","(",")","+" ] ;
	var encodeWith = [ "\u003C","\u003E","\u0022","\u0027","\u0025","\u003B","\u0028","\u0029","\u002B" ] ;

	function checkFormParameters() {

		var formElements = document.SearchPageForm.elements;
		for (i=0; i<formElements.length; i++) {
			for( var j=0; j< toEncode.length; j++ ) {

				formElements[i].value=ReplaceAll(formElements[i].value, toEncode[j] , encodeWith[j]);
			}
		}
		//return false;
	}


	//	Find and replace a string in another string, with optional case-sensitivity.
	function ReplaceAll( inText, inFindStr, inReplStr, inCaseSensitive ) {
	   //	inText is the text in which to do the search;
	   //	inFindStr is the string to find;
	   //	inReplStr is the string to substitute into inText in place of inFindStr; and
	   //	inCaseSensitive is a boolean value (defaults to false).

	   var searchFrom = 0;
	   var offset = 0;
	   var outText = "";
	   var searchText = "";
	   if ( inCaseSensitive == null ) {
		  inCaseSensitive = false;
	   }
	   if ( inCaseSensitive ) {
		  searchText = inText.toLowerCase();
		  inFindStr = inFindStr.toLowerCase();
	   } else {
		  searchText = inText;
	   }
	   offset = searchText.indexOf( inFindStr, searchFrom );
	   while ( offset != -1 ) {
		  outText += inText.substring( searchFrom, offset );
		  outText += inReplStr;
		  searchFrom = offset + inFindStr.length;
		  offset = searchText.indexOf( inFindStr, searchFrom );
	   }
	   outText += inText.substring( searchFrom, inText.length );

	   return ( outText );
	}	



function themeSearch(e,x)
	{
	 
	   if(e.keyCode==13 || ((e.button==0) &&(e.type=="click")))
	   {
		var queryTheme = trim(document.SearchPageForm.searchString.value);
		checkFormParameters();
		if((queryTheme != null)&& (queryTheme.length > 0) && (queryTheme !="Enter key words"))
		{
	    		strURL=x +"&queryString="+ escape(queryTheme);
			location.href=strURL;			 
	 		return false;
		}
		else
		{
			alert("Please type the word(s) you wish to search");
			document.SearchPageForm.searchString.focus();
			return false;
		}
	   }
	}

function themeSearch_1(x)
	{
	 
	   
	   
		var queryTheme = trim(document.SearchPageForm.searchString.value);
		checkFormParameters();
		if((queryTheme != null)&& (queryTheme.length > 0))
		{
	    		strURL=x +"&queryString="+ escape(queryTheme);
			location.href=strURL;			 
	 		return false;
		}
		else
		{
			alert("Please type the word(s) you wish to search");
			document.SearchPageForm.searchString.focus();
			return false;
		}
	   
	}	
	
	//for predictive automatic submition
		
		function themeSearch_predictive()
			{
			  
			  var x='<%wpsURL.write(out);%>';
			  
			   
			  var queryTheme = trim(document.SearchPageForm.searchString.value);
			  
				checkFormParameters();
				if((queryTheme != null)&& (queryTheme.length > 0))
				{
			    		strURL=x +"&queryString="+ queryTheme;
					location.href=strURL;			 
			 		return false;
				}
				else
				{
					alert("Please type the word(s) you wish to search");
					document.SearchPageForm.searchString.focus();
					return false;
				}
	    }


	
	function changeThemeLanguage(e,x,y)
	{
	
	   	if(e.keyCode==13 || ((e.button==0) &&(e.type=="click")))
	   	{
	    		strURL=x +"&lang="+y;
			location.href=strURL;			 
	 		return false;
	 	}
	}
			

			
