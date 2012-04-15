var $cookieUtility = {};
$(document).ready(function(){
	cookieUtility = {
		setCookie : function(c_name,value,expiredays)		{
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		},
		getCookie : function(c_name){
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=");
		  if (c_start!=-1)
		    {
		    c_start=c_start + c_name.length+1;
		    c_end=document.cookie.indexOf(";",c_start);
		    if (c_end==-1) c_end=document.cookie.length;
		    return unescape(document.cookie.substring(c_start,c_end));
		    }
		  }
		return "";
		},
		checkCookie : function(c_name){
		var self = this;
		username=self.getCookie(c_name);
		if (username!=null && username!="")
		  {
			return true;
		  }
		else
		  {
		    self.setCookie(c_name,"active",365);
		    return false;
		  }
		}
	}
});