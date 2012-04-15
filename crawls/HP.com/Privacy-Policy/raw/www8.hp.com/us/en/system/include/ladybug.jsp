




function SetCookie(name,value,expires,path,domain,secure){
	 var today = new Date();today.setTime(today.getTime());
	 if (expires)expires=expires*1000*60*60;
	 var exp_date=new Date(today.getTime()+(expires));
	 document.cookie=name+'='+escape(value)+ 
	 ((expires) ? ';expires=' + exp_date.toGMTString() : '' )+ 
	 ((path) ? ';path=' + path : '' )+ 
	 ((domain) ? ';domain=' + domain : '' )+ 
	 ((secure) ? ';secure' : '' ); 
} 
function OAS_AD_LADYBUG(){SetCookie('HP_LB','0','4','/','.hp.com');}
/*64.147.188.8*/
