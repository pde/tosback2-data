if (typeof TSC=="undefined"){var TSC={reporting:{},util:{},ads:{},logger:{}};}	
if(typeof TSC!="undefined"){if(typeof TSC.reporting=="undefined"){TSC.reporting={};}}
TSC.util={
	getPuc: function(){
		var puc = "";
		try {
			var path = window.location.pathname;

			var index = path.indexOf("/_")+1;
			if(index > -1) {
				puc = path.substring(index, path.indexOf("/", index));
			}
			var qRef=TSC.util.getQueryString("ref");
			if (TSC.util.isDefined(qRef)){
				puc="_" + qRef;
			}			
			var qPuc=TSC.util.getQueryString("puc");
			if (TSC.util.isDefined(qPuc)){
				puc=qPuc;
			}
		}catch(e){}
		try {
			var reg = /_/g;newstr = '';
	        puc= puc.replace(reg,newstr);
		}catch(e){}
		return puc;
		 }
	,
   	isValidPuc: function(checkPuc){
	  if (TSC.util.isDefined(checkPuc)){
				if (checkPuc.indexOf("txt")!=-1 || checkPuc.indexOf("html")!=-1 || checkPuc.indexOf("text")!=-1 || checkPuc.indexOf("tscrmb")!=-1){
				 return false;
				} 
				else 
					return true;
		}		 
		else {
		  return true;
		}	 
		}
	,
	getCookie: function(c_name){
				 if (document.cookie.length>0)
				   {
					   var c_start=document.cookie.indexOf(c_name + "=");
						   if (c_start!=-1)
							     {
									     c_start=c_start + c_name.length+1;
									     var c_end=document.cookie.indexOf(";",c_start);
									     if (c_end==-1) { c_end=document.cookie.length;}
										     return unescape(document.cookie.substring(c_start,c_end));
						       }
			    }
				  return "";
	 }
	,
	getQueryString: function (variable) {
 								try {
									var query = window.location.search.substring(1);
									var vars = query.split("&");
									for (var i=0;i<vars.length;i++) {
									    var pair = vars[i].split("=");
											  if (pair[0].toLowerCase() == variable.toLowerCase()) {
												      return pair[1];
											    }
								 } 
								  return "";
								 }catch(e){ return "";}
        },
    
	isDefined: function(v){if(typeof v==='undefined'||v===null||v===''||v==='undefined'){return false;}else{return true;}},		 
	cleanString: function(thestring)
							 {		
					  if (TSC.util.isDefined(thestring)){
							var	reg = /"/g;newstr = '\\"';
							return thestring.replace(reg,newstr);
					}else return "";		
							 }
};
TSC.reporting.propMap={};
TSC.reporting.setAccount=function(account){};
TSC.reporting.sendLinkEvent=function(lnkName){};
TSC.reporting.sendDebug=function(lnkName){};
TSC.reporting.config=function(o){};
TSC.reporting.makeCall=function(){};
