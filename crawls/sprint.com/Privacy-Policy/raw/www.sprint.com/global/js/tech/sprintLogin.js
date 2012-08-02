	function CheckForm(form)
	{
		form.submit();
		return  true;
	}
	function isRememberMe(form){
		 if (form.rememberMe.checked ){
			 if(form.target.value.indexOf("rememberMe=true")== -1){
				 if(form.target.value.indexOf("?")== -1){
					form.target.value=form.target.value+"?rememberMe=true";
				 }else{
					  form.target.value=form.target.value+"&rememberMe=true";
				 }
			 }
		 }
		 if (!form.rememberMe.checked ){
			  if(form.target.value.indexOf("?rememberMe=true")!= -1){
					 form.target.value=form.target.value.substring(0,form.target.value.indexOf("?rememberMe=true"));
			  } else if (form.target.value.indexOf("&rememberMe=true")!= -1) {
					 form.target.value=form.target.value.substring(0,form.target.value.indexOf("&rememberMe=true"));
			 
			  }
		 }
		 
	}
	function eraseCookies() {
		value="";
		var date = new Date();
		date.setTime(date.getTime()+(-1*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		
		document.cookie = "rememberUser="+value+expires+"; path=/; domain=sprint.com";
		document.cookie = "DYN_USER_ID="+value+expires+"; path=/; domain=sprint.com";
		document.cookie = "DYN_USER_CONFIRM="+value+expires+"; path=/; domain=sprint.com";
		var loc = window.location.href;
		var index = loc.indexOf("?");
		if (index == -1){
			window.location.href=window.location.href+"?notMe=true"
		}else{
			window.location.href=window.location.href+"&notMe=true"
		}
		document.forms[0].submit;
	}
	
	function isMobileRememberMe(form){
		 if (form.rememberMe.checked ){
			 if(form.target.value.indexOf("rememberMe=true")== -1){
				 if(form.target.value.indexOf("?")== -1){
					form.target.value=form.target.value+"?rememberMe=true";
				 } else {
					form.target.value=form.target.value+"&rememberMe=true";
				 }
			 }
		 }
		 if (!form.rememberMe.checked ){
			  if(form.target.value.indexOf("?rememberMe=true")!= -1){
				  form.target.value=form.target.value.replace("?rememberMe=true", "?rememberMe=false");
			  } else if (form.target.value.indexOf("&rememberMe=true")!= -1) {
					 form.target.value=form.target.value.replace("&rememberMe=true", "&rememberMe=false");
			  }
		 }
	}