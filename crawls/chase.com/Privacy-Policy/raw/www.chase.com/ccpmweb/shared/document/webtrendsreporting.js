/*
 * File Name    : webtrendsreporting.js
 * 
 * Description	: This file contains javascript function
 *
 * Date         : Sep-11-2006
 * 
 ******************************************************************************
 * Version	Author        Date          Description
 ******************************************************************************
 * 0.1      Rohit B      09/11/2006    Draft version
 *                                    
 ******************************************************************************
 * 
*/

function createIframe(keys,values,domain)
{
	var params = "?";
	var flag=0;
	for (i=0; i < keys.length; i++) 
	{
	        if(values[i]!="")
        	{
        	    if(flag!=0)
        	    {
        	        params += "&";
        	    }
        	    else
        	    {
        	    	flag=1;
        	    }  
            	    params += keys[i] + "=" + escape(values[i]);
        	}
	}
	

if (values[0].substring(0,5)=="https")
 {document.write("<iframe src='https://" + domain + "/ccpmweb/shared/document/webtrends.html" + params + "' width=1 height=1 frameborder=0 marginwidth=0 marginheight=0 scrolling=no></iframe>")
 }
else 
 {document.write("<iframe src='https://" + domain + "/ccpmweb/shared/document/webtrends.html" + params + "' width=1 height=1 frameborder=0 marginwidth=0 marginheight=0 scrolling=no></iframe>")
 }

}
