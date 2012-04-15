/* This script is for create and maintain source code coming in to the site
   
   Cookie creation: A cookie is create if a link comes in with a query paramter 'emailid' or 'searchid'.
                    Cookie name : VCS_SourceCode
                    Expiry : 14 days
   
   Cookie Replacement :  If a cookie exist, source code will be replaced with the new source code came in.

*/
    jQuery(window).load(function () {
        isSourCodePresent();
    });
    
    function isSourCodePresent()
    {
        var queryString = window.top.location.search.substring(1);
        var paramValue = getParameter(queryString,"emailid");
        var paramValue1 = getParameter(queryString,"searchid");
        
        if(paramValue != null && paramValue != "null" && paramValue != '')
        {
            saveSourceCode(paramValue);
        }else if(paramValue1 != null && paramValue1 != "null" && paramValue1 != '')
        {
            saveSourceCode(paramValue1);
        }else if(g_sourceCode != null && g_sourceCode != "null" && g_sourceCode != '')
        {
         saveSourceCode(g_sourceCode);
        }
    }
    
    function getParameter( queryString, parameterName ) {
       
        var parameterName = parameterName + "=";   // Add "=" to the parameter name (i.e. parameterName=value)
        
        if ( queryString.length > 0 ) {  // Find the beginning of the string
            begin = queryString.indexOf ( parameterName );
            
            // If the parameter name is not found, skip it, otherwise return the value
            if ( begin != -1 ) {
                // Add the length (integer) to the beginning
                begin += parameterName.length;
                // Multiple parameters are separated by the "&" sign
                end = queryString.indexOf ( "&" , begin );
                if ( end == -1 ) {
                    end = queryString.length
                }
                // Return the string
                return unescape ( queryString.substring ( begin, end ) );
            }
            // Return "null" if no parameter has been found
            return "null";
        }
    }
    
    function saveSourceCode(paramValue){
    
        var cookieName = 'VCS_SourceCode';
        var today = new Date();
        var expiry = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);  // Expiry set to 14 days.
        
        createCookie(cookieName, paramValue, "/", expiry);        
    }
    

    function createCookie(name, value, path, expiry) {
    
        document.cookie = name + "=" + escape (value) +
        ((expiry) ? "; expires=" + expiry.toGMTString() : "") +
        ((path) ? "; path=" + path : "");
    }