	function promptMobile() 
	{
		if(confirm('Would you like to browse the mobile version of the pollen.com?'))
		{
			goMobile();
		}
		else
		{
			// else dont ask to redirect for today.
			noMobile();
		}
	}

	function goMobile()
	{
			// set cookie
			var cName = "mobile=true; ";
			var cExpire = new Date();
			cExpire.setDate(cExpire.getDate() + 180);
			document.cookie = cName + "expires=" + cExpire.toGMTString() + "; path=/";

			// redirect
			location.href='m/index.php'; 
	}

	function noMobile()
	{
			// set cookie
			var cName = "mobile=false; ";
			var cExpire = new Date();
			cExpire.setDate(cExpire.getDate() + 7);
			document.cookie = cName + "expires=" + cExpire.toGMTString() + "; path=/";
	}


	function getCookie(c_name)
	{
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
	}

