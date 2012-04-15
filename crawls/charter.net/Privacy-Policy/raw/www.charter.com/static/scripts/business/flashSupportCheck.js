FlashUtil = function(){
	
};
FlashUtil.prototype = {
		
		checkSupport : function(){
			var ua = navigator.userAgent.toLowerCase(), s, o = {};
			if( s=ua.match(/msie ([\d.]+)/) ) {  
	            o.ie = true;  
	            o.info = "ie";  
             } else if( s=ua.match(/firefox\/([\d.]+)/) ) {  
	            o.ff = true;  
	            o.info = "ff";
             }else if( s=ua.match(/version\/([\d.]+).*safari/) ) {  
		         o.safari = true;  
		         o.info = "safari";  
             }  
             if( s && s[1] ) {  
  		        	 o.version = parseFloat( s[1] );  
          	} else {  
                 o.version = 0;  
        	}  
        	o.info = (o.info?o.info:"") + "_" + o.version;  
            if(/ff\w+/.test(o.info) || /safari/.test(o.info)){
				if(navigator.mimeTypes){
					if(navigator.mimeTypes["application/x-shockwave-flash"]==null){
						return false;
					}
				} 
			}else if(/ie\w+/.test(o.info)){
				if(window.ActiveXObject){
					try{
						new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					}catch(error){
						return false;
					}
				}
			}
		   return true;				
		}
};
var fu = new FlashUtil();