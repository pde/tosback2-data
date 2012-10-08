
var URLBuilder = (function (){

    var patt = /(.*)\/(20\d{2}|19\d{2})\/(1[0-2]|0[1-9])\/(3[0-1]|[0-2][0-9])\/(.*).html/i;
    
    function isValidateUrlRewritePath(path, pathPattern)
    {
        var patt = new RegExp(pathPattern);
        return patt.test(path);
    };

    return {
        rewrite: function(path){
    	
            var result = path ;
            
            if(isUrlRewriteEnabled())
            {
            	var allowedPaths = getAppliedUrlRewritePaths();
                
                for ( i=0 ; i< allowedPaths.length; i++)
                {
                	if(isValidateUrlRewritePath(path, allowedPaths[i]))
                	{
                		var matcherResult = path.match(patt);
        	            if(matcherResult)
        	            {
        	                var path =  matcherResult[1];
        	                var year =  matcherResult[2];
        	                var month =  matcherResult[3];
        	                var day =  matcherResult[4];
        	                var nodeName =  matcherResult[5];
        	                result = path + "/" + nodeName + "." + year + month + day + ".html";
        	                break;
        	            }
                	}	
                }
	            
            }

            return result;
        }
    };

})();
