//begin OAS Analytics
var d=document;
var OAS_rdl = '';
var OAS_CA = 'N';
if((d.referrer)&&(d.referrer!="[unknown origin]"))
{
    	if(d.referrer.indexOf("?") == -1)
	{
    		OAS_rdl += '&tax23_RefDocLoc='+d.referrer.toString();
    	}
	else
	{
    		var rdl=d.referrer;
                var rdl1=rdl.indexOf("?");
    		var rdl2=rdl.substring(0,rdl1);
    		OAS_rdl += '&tax23_RefDocLoc='+rdl2;
    	}
}

function cookie_check(ifd,ife)
{
    	var s=ife.indexOf(ifd);
    	if(s==-1) return "";
        s+=ifd.length;
    	var e=ife.indexOf(";",s);
     	if(e==-1)
           e=ife.length;
    	return ife.substring(s,e);
}
function write_cookie()
{
    	var d=new Date();
    	var m=d.getTime();
    	document.cookie="OAS_SC1="+m.toString()+";path=/;";
    	var v=cookie_check("OAS_SC1=",document.cookie);
    	if(v!=m.toString())
	   return false;
    	d.setTime(m+3600000);
    	return true;
}

if(write_cookie())OAS_CA="Y";

//end OAS Analytics
