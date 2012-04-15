var vEditableOptionIndex_A = 0;
var seltext="Enter User Name"
var myarr=null;

function validateandsetcookie(userID, pwd, remember_me, domain, formname)
{
	
//	var selindex=userID.selectedIndex;
//				if(selindex!=-1)
//				{
//					var selitem=userID[selindex].text;
					////alert(selitem)
//				}
	

//	if(userID.options.length==0 && pwd.length==0)
  	

	if((userID.value.length==0) && (pwd.length==0))
	{
		alert("Error Message LO001:\nPlease enter both your User ID and Password.");
	return false;
	}

////alert(userID.value);
	chk1 = uidcheck(userID.value);
		
	chk2=pwdcheck(pwd);

//alert("chk1 = "+chk1+"\nchk2 = "+chk2);
	if((chk1==0) && (chk2==0))
	{	
		userID.value = userID.value.toLowerCase();
		setRememberMeCookie(remember_me, domain);
//alert("back from setRememberMeCookie");
//		setCookie(userID,domain);  //not used?
//alert(formname.usr_name.value+"\n"+formname.usr_password.value);
		formname.submit();

	}
	else
	{
		return false;
	}
}


function pwdkyenter(userID, pwd, remember_me,domain,formname)
{
	if(event.keyCode==13)
	{
		return validateandsetcookie(userID, pwd, remember_me, domain,formname);
	}
	
}


function uidcheck(userId)
{	
//				var selindex=userId.selectedIndex;
//				if(selindex!=-1)
//				{
					
//					var uidval=userId[selindex].text;
					////alert(selitem)
//				}
//	ulen=uidval.length
	ulen=userId.length;
	uidval=userId;
////alert("userId is "+ulen+" chars");
	var flag1=0
	var alphaNumericStr = "abcdefghijklmnopqrstuvwxyz0123456789_"
		
	if(ulen==0)
	{
		alert("Error Message LO001:\nPlease enter both your User ID and Password.");
		return 1;	
	}	
	
	if(!(ulen<=32))
	{
		alert("Error Message LO001:\nThe User ID you entered is not valid. \nYour User ID needs to be less than 32 characters long.")
		return 1;
	}
	
	for (i=0;i<uidval.length;i++)
	{
		if (!(alphaNumericStr.indexOf(uidval.substring(i,i+1).toLowerCase() ) >= 0))
		{	
			flag1=1;
		}
	}

	if(flag1==1)
	{	
		alert("Error Message LO011:\nThe User ID and/or Password you entered is not valid.\nYour User ID and Password must consist only of letters and numbers.");
		return 1;
	}
		
	return 0;	
}


function pwdcheck(pwd)
{	
	pspace=0
	plen=pwd.length
	if(plen==0)
	{
		alert("Error Message LO001:\nPlease enter both your User ID and Password.");
		return 1;		
	}
	
		
	else if(plen>32)
	{
		alert("Password needs to be less than 32 characters long.Please re-enter Password");		
		return 1;
	}

	for (i=0;i<pwd.length;i++)
	{
		if (pwd.charAt(i)==" ")
		{	
			pspace=1
		}
	}
	if(pspace==1)
	{
	alert("Password cannot contain spaces");
	return 1;
	}
	
	return 0;	
}

function setRememberMeCookie(remeber_me, domain)
{
	if(remeber_me==true)
	{
		//document.cookie="_tmprememberme=1; expires=0; path=/; domain="+domain; 
		document.cookie = "_tmprememberme=1;path=/;domain="+domain;
//alert("setting rememberme cookie");
	}
	else
	{
		//document.cookie="_tmprememberme=0; expires=0; path=/; domain="+domain; 
		document.cookie = "_tmprememberme=0;expires=0;path=/;domain="+domain;
	}
}



function setCookie(uid,domain1) 
{
		
	d=new Date()
	d1=new Date()
	d1.setDate(d.getDate()+90)
	expdate=(d1.getDate())+"-"+(d1.getMonth()+1)+"-"+(d1.getYear())
	expdate=d1.toGMTString()
	ckval=" "

//			var selindex=uid.selectedIndex;
//				if(selindex!=-1)
//				{
//					var uid=uid[selindex].text;
					////alert(selitem)
//				}
	uid=uid.value;
//alert("in setCookie\nuid="+uid);

	if(chk1==0 && chk2==0)
	{
		$LOGIN_ID=uid
		//alert($LOGIN_ID)

		uidval=uid
		
		if(document.cookie.match("_rememberme"))
		{
			cknameindex=document.cookie.indexOf("_rememberme")

			//index of cookie name _rememberme
			ckpindex=document.cookie.lastIndexOf("|") 

			//lastindex of pipe
			fckval=cknameindex+12  

			//move 12 character ahead frm index of _rememberme to get index of first cookie value character
			cckval=(ckpindex-fckval)+1 

			//no of characters to move ahead from the first character
			ckval=document.cookie.substr(fckval,cckval) //give me the entire cookie value
			//$LOGIN_ID=ckval+$LOGIN_ID; only for multiple ID support
		}
	}


//		var ckvalarr=ckval.split("|")
//		cklen=ckvalarr.length
//		flag2=0;

//		for(i=0;i<cklen;i++)
//		{
//			if(uidval==ckvalarr[i])
//			{
//				flag2=1;
//			}
//		}

//		if(flag2==0)
//		{
			str="_rememberme"+"="+unescape($LOGIN_ID+"|")+"; expires="+d1.toGMTString()+"; path=/";
//alert("flag2==0\nstr="+str);
			document.cookie=str
		
// 		}
 		
} 	















		
	var remflag1=0
	//var remflag2=0


	if(document.cookie.match("_rememberme"))
	{	
		ckval=readCookie("_rememberme")
//alert("ckval = "+ckval);
		if (ckval==null || ckval.substr(0,1)==";") {ckval="";} // Added Firefox compatibility -- blanked cookies are stored as "[cookiename]=;"
//alert("ckval = "+ckval);
		remflag1=(ckval==null)?0:1;
		myarr = new Array(1);

		var arr=ckval.split("|")

		myarr[0] = arr[0];
//alert("myarr[0]="+myarr[0]);
//		cklen=arr.length
//alert("3) ckval="+ckval);					
//			if(cklen!=0)
//			{
//				myarr = new Array(cklen)
				//myarr[0]=seltext

//				for(i=0;i<cklen;i++)
//				{
//					myarr[i]=arr[i];
//					if(i==19)
//						break;
//				}
								
				
//			}

	}




function showAll(userid,remember_me)
	{		
//alert("in showAll\nmyarr="+myarr+"\nremflag1="+remflag1);		
		chkbox = document.logonform.remember;
		if(myarr!=null && remflag1==1)
		{
//alert("myarr before sort\n"+myarr);		
//			myarr.sort();
//alert("myarr after sort\n"+myarr);			
			//userid.options[0].text=myarr[myarr.length-1]

			userid.value = myarr[0]; //converted from dropdown to single field
			
			for(i=1;i<=myarr.length;i++)
			{
				//userid.options[i] = new Option(myarr[i-1]);
				////alert(userid.options[i]+"options"+i)
				////alert(myarr[i]+"arr"+i)
			}

		chkbox.checked=true;
												
		}	
		else if(myarr==null)
		{
//alert("in myarr null");
			//userid.options[0].text=seltext;
			chkbox.checked=false;
		}

try {
		if(myarr[0]==null || myarr[0]=="")
		{
//alert("in myarr[0] null");
			chkbox.checked=false;
		}
	}
catch(err) {
			chkbox.checked=false;
	}





	}



  function fnKeyDownHandler(getdropdown, e)
  {
    fnSanityCheck(getdropdown);

	
	
    // Press [ <- ] and [ -> ] arrow keys on the keyboard to change alignment/flow.
    // ...go to Start : Press  [ <- ] Arrow Key
    // ...go to End : Press [ -> ] Arrow Key
    // (this is useful when the edited-text content exceeds the ListBox-fixed-width)
    // This works best on Internet Explorer, and not on Netscape

    var vEventKeyCode = FindKeyCode(e);
	
    // Press left/right arrow keys
    if(vEventKeyCode == 37)
    {
    fnLeftToRight(getdropdown);
    }
    if(vEventKeyCode == 39)
    {
    fnRightToLeft(getdropdown);
    }

    // Delete key pressed
    if(vEventKeyCode == 46)
    {
    fnDelete(getdropdown);
    }

    // backspace key pressed
    if(vEventKeyCode == 8 || vEventKeyCode==127)
    {
    if(e.which) //Netscape
    {
      //e.which = ''; //this property has only a getter.
    }
    else //Internet Explorer
    {
      //To prevent backspace from activating the -Back- button of the browser
      e.keyCode = '';
      if(window.event.keyCode)
      {
      window.event.keyCode = '';
      }
    }
    return true;
    }

    // Tab key pressed, use code below to reorient to Left-To-Right flow, if needed
    //if(vEventKeyCode == 9)
    //{
    //  fnLeftToRight(getdropdown);
    //}
  }

  function fnLeftToRight(getdropdown)
  {
    getdropdown.style.direction = "ltr";
  }

  function fnRightToLeft(getdropdown)
  {
    getdropdown.style.direction = "rtl";
  }

  function fnDelete(getdropdown)
  {
    if(getdropdown.options.length != 0)
    // if dropdown is not empty
    {
    if (getdropdown.options.selectedIndex == vEditableOptionIndex_A)
    // if option the Editable field
    {
      getdropdown.options[getdropdown.options.selectedIndex].text = '';
      //getdropdown.options[getdropdown.options.selectedIndex].value = ''; //Use this line only if want to change the internal value too; else this line is not required.
    }
    }
  }


  
  function FindKeyCode(e)
  {
	
	

    if(e.which)
    {
    keycode=e.which;  //Netscape
    }
    else
    {
    keycode=e.keyCode; //Internet Explorer
    }
	
    ////alert("FindKeyCode"+ keycode);
    return keycode;
  }

  function FindKeyChar(e)
  {
	

    keycode = FindKeyCode(e);
    if((keycode==8)||(keycode==127))
    {
    character="backspace"
    }
    else if((keycode==46))
    {
    character="delete"
    }
    else
    {
    character=String.fromCharCode(keycode);
    }
    ////alert("FindKey"+ character);
    return character;
  }
  

  function fnSanityCheck(getdropdown)
  {
	if(vEditableOptionIndex_A>(getdropdown.options.length-1))
    {
    alert("PROGRAMMING ERROR: The value of variable vEditableOptionIndex_... cannot be greater than (length of dropdown - 1)");
    return false;
    }
	
		
  }
 
 
   var vEditableOptionText_A = "--?--";
   //var vEditableOptionText_A = "";
 
   
  
 
   var vPreviousSelectIndex_A = 0;
   // Contains the Previously Selected Index, set to 0 by default
 
   var vSelectIndex_A = 0;
   // Contains the Currently Selected Index, set to 0 by default
 
   var vSelectChange_A = 'MANUAL_CLICK';
   // Indicates whether Change in dropdown selected option
   // was due to a Manual Click
   // or due to System properties of dropdown.
 
   // vSelectChange_A = 'MANUAL_CLICK' indicates that
   // the jump to a non-editable option in the dropdown was due
   // to a Manual click (i.e.,changed on purpose by user).
 
   // vSelectChange_A = 'AUTO_SYSTEM' indicates that
   // the jump to a non-editable option was due to System properties of dropdown
   // (i.e.,user did not change the option in the dropdown;
   // instead an automatic jump happened due to inbuilt
  // dropdown properties of browser on typing of a character )


   
   function fnChangeHandler_A(getdropdown,event,chkbox)
  {
    fnSanityCheck(getdropdown);
		
    vPreviousSelectIndex_A = vSelectIndex_A;
    // Contains the Previously Selected Index
	cookieflag=0

    vSelectIndex_A = getdropdown.options.selectedIndex;
	
    // Contains the Currently Selected Index
		ckval=readCookie("_rememberme")
		var arr=ckval.split("|")
		cklen=arr.length


			if(cklen!=0)
			{
			for(i=0;i<cklen;i++)
				{			
						if(getdropdown.options[vSelectIndex_A].text==arr[i])
								{
								cookieflag=1
									break;
								}
				}
			}
	
	
				if(cookieflag==1)
				{
				chkbox.checked=true

				}
				else if(cookieflag==0)
				{
				chkbox.checked=false
				}

		if(getdropdown.options[vSelectIndex_A].text==seltext)
		{
		chkbox.checked=false
		}

    if ((vPreviousSelectIndex_A == (vEditableOptionIndex_A)) && (vSelectIndex_A != (vEditableOptionIndex_A))&&(vSelectChange_A != 'MANUAL_CLICK'))
    // To Set value of Index variables - 
    {
      getdropdown[(vEditableOptionIndex_A)].selected=true;
      vPreviousSelectIndex_A = vSelectIndex_A;
      vSelectIndex_A = getdropdown.options.selectedIndex;
      vSelectChange_A = 'MANUAL_CLICK';
      // Indicates that the Change in dropdown selected
      // option was due to a Manual Click
    }
  }

  function fnKeyPressHandler_A(getdropdown, e)
  {
	 if(getdropdown.options[0].text==seltext)
	  {
			getdropdown.options[0].text=""
	  }

    fnSanityCheck(getdropdown);
	 
	keycode = FindKeyCode(e);
    keychar = FindKeyChar(e);

    // Check for allowable Characters
    // The various characters allowable for entry into Editable option..
    // may be customized by minor modifications in the code (if condition below)
    // (you need to know the keycode/ASCII value of the  character to be allowed/disallowed.
    // - 

    if ((keycode>47 && keycode<59)||(keycode>62 && keycode<127) ||(keycode==32))
    {
      var vAllowableCharacter = "yes";
    }
    else
    {
      var vAllowableCharacter = "no";
    }

    ////alert(window); //alert(window.event);

    if(getdropdown.options.length != 0)
    // if dropdown is not empty
      if (getdropdown.options.selectedIndex == (vEditableOptionIndex_A))
      // if selected option the Editable option of the dropdown
      {

        var vEditString = getdropdown[vEditableOptionIndex_A].text;

        // make Editable option Null if it is being edited for the first time
        if((vAllowableCharacter == "yes")||(keychar=="backspace"))
        {
          if (vEditString == vEditableOptionText_A)
            vEditString = "";
        }
        if (keychar=="backspace")
        // To handle backspace - 
        {
          vEditString = vEditString.substring(0,vEditString.length-1);
          // Decrease length of string by one from right

          vSelectChange_A = 'MANUAL_CLICK';
          // Indicates that the Change in dropdown selected
          // option was due to a Manual Click

        }
        ////alert("EditString2:"+vEditString);

        if (vAllowableCharacter == "yes")
        // To handle addition of a character - 
        {
          vEditString+=String.fromCharCode(keycode);
          // Concatenate Enter character to Editable string

          // The following portion handles the "automatic Jump" bug
          // The "automatic Jump" bug (Description):
          //   If a alphabet is entered (while editing)
          //   ...which is contained as a first character in one of the read-only options
          //   ..the focus automatically "jumps" to the read-only option
          //   (-- this is a common property of normal dropdowns
          //    ..but..is undesirable while editing).

          var i=0;
          var vEnteredChar = String.fromCharCode(keycode);
          var vUpperCaseEnteredChar = vEnteredChar;
          var vLowerCaseEnteredChar = vEnteredChar;


          if(((keycode)>=97)&&((keycode)<=122))
          // if vEnteredChar lowercase
            vUpperCaseEnteredChar = String.fromCharCode(keycode - 32);
            // This is UpperCase


          if(((keycode)>=65)&&((keycode)<=90))
          // if vEnteredChar is UpperCase
            vLowerCaseEnteredChar = String.fromCharCode(keycode + 32);
            // This is lowercase

          if(e.which) //For Netscape
          {
            // Compare the typed character (into the editable option)
            // with the first character of all the other
            // options (non-editable).

            // To note if the jump to the non-editable option was due
            // to a Manual click (i.e.,changed on purpose by user)
            // or due to System properties of dropdown
            // (i.e.,user did not change the option in the dropdown;
            // instead an automatic jump happened due to inbuilt
            // dropdown properties of browser on typing of a character )

            for (i=0;i<=(getdropdown.options.length-1);i++)
            {
              if(i!=vEditableOptionIndex_A)
              {
                var vReadOnlyString = getdropdown[i].text;
                var vFirstChar = vReadOnlyString.substring(0,1);
                if((vFirstChar == vUpperCaseEnteredChar)||(vFirstChar == vLowerCaseEnteredChar))
                {
                  vSelectChange_A = 'AUTO_SYSTEM';
                  // Indicates that the Change in dropdown selected
                  // option was due to System properties of dropdown
                  break;
                }
                else
                {
                  vSelectChange_A = 'MANUAL_CLICK';
                  // Indicates that the Change in dropdown selected
                  // option was due to a Manual Click
                }
              }
            }
          }
        }

        // Set the new edited string into the Editable option
        getdropdown.options[vEditableOptionIndex_A].text = vEditString;
        //getdropdown.options[vEditableOptionIndex_A].value = vEditString; //Use this line only if want to change the internal value too; else this line is not required.

        return false;
      }
    return true;
  }

  function fnKeyUpHandler_A(getdropdown, e)
  {
    fnSanityCheck(getdropdown);

    if(e.which) // Netscape
    {
      if(vSelectChange_A == 'AUTO_SYSTEM')
      {
        // if editable dropdown option jumped while editing
        // (due to typing of a character which is the first character of some other option)
        // then go back to the editable option.
        getdropdown[(vEditableOptionIndex_A)].selected=true;
      }

      var vEventKeyCode = FindKeyCode(e);
      // if [ <- ] or [ -> ] arrow keys are pressed, select the editable option
      if((vEventKeyCode == 37)||(vEventKeyCode == 39))
      {
        getdropdown[vEditableOptionIndex_A].selected=true;
      }
    }
  }
 
  


function browserconfig(getdropdown,password)
{
	
	if(navigator.vendor == ("Netscape6")) 
	{
		getdropdown.style.width="80"
				
	}

	if(navigator.vendor == ("Firefox")) 
	{
		getdropdown.style.width="97"; // changed from 85
		getdropdown.style.height="12%"
				
	}

	if(navigator.appName == ("Microsoft Internet Explorer")) 
	{
		getdropdown.style.width="87%"; // changed from 57%
		password.style.height="99%"; // added
	
	}
}

function readCookie(name) 
{
	var NameOfCookie=name
	if (document.cookie.length > 0) 
	{ 
//alert(document.cookie);
		begin = document.cookie.indexOf(NameOfCookie+"="); 
//alert("begin="+begin);		
		if (begin != -1) // Note: != means "is not equal to"
		{ 
			begin += NameOfCookie.length+1; 
//alert("begin="+begin);			
			//end = document.cookie.indexOf(";", begin);
			end = document.cookie.lastIndexOf("|");
//alert("end="+end);			
			if (end == -1) end = document.cookie.length;
//alert("end="+end);
				return unescape(document.cookie.substring(begin, end)); 

		} 
	}
	return null; 
}
