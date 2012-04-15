<!--

  // navigation images preload
  tab1_on 		= new Image();
  tab1_on.src 	= "images/nav/navHome_on.gif";
  tab1_off 		= new Image();
  tab1_off.src 	= "images/nav/navHome.gif";

  tab2_on 		= new Image();
  tab2_on.src 	= "images/nav/navMyPollen_on.gif";
  tab2_off 		= new Image();
  tab2_off.src 	= "images/nav/navMyPollen.gif";

  tab3_on 		= new Image();
  tab3_on.src 	= "images/nav/navFW_on.gif";
  tab3_off 		= new Image();
  tab3_off.src 	= "images/nav/navFW.gif";

  tab4_on 		= new Image();
  tab4_on.src 	= "images/nav/navAllergyInfo_on.gif";
  tab4_off 		= new Image();
  tab4_off.src 	= "images/nav/navAllergyInfo.gif";

  tab5_on 		= new Image();
  tab5_on.src 	= "images/nav/navAllergyNews_on.gif";
  tab5_off 		= new Image();
  tab5_off.src 	= "images/nav/navAllergyNews.gif";

  tab6_on 		= new Image();
  tab6_on.src 	= "images/nav/navPollenLibrary_on.gif";
  tab6_off 		= new Image();
  tab6_off.src 	= "images/nav/navPollenLibrary.gif";

  tab7_on 		= new Image();
  tab7_on.src 	= "images/nav/navToolsDownloads_on.gif";
  tab7_off 		= new Image();
  tab7_off.src 	= "images/nav/navToolsDownloads.gif";

  tab8_on 		= new Image();
  tab8_on.src 	= "images/nav/navPollenAffiliates_on.gif";
  tab8_off 		= new Image();
  tab8_off.src 	= "images/nav/navPollenAffiliates.gif";

  function menuHighlight(id) {
  	document.getElementById(id).src =  eval(id + "_on.src");
	document.getElementById(id).onmouseover = null;
	document.getElementById(id).onmouseout = null;
  }



  /* redirects top frame content to value of document var */
  function changeTopFrame(document) {
    parent.header.location.href = document;
  }
  
  /* //////////////////////////////////////////////////////////////////////////// */
  /* SHOW HIDE DIV LAYER FUNCTIONS (used on 4-day forecast) */
  function HideContent(d) {
    if(d.length < 1) {
      return;
    }
    document.getElementById(d).style.display = "none";
  }

  function ShowContent(d) {
    if(d.length < 1) {
      return;
    }
  document.getElementById(d).style.display = "";
  }

  function ReverseContentDisplay(d) {
    if(d.length < 1) {
      return;
    }
    if(document.getElementById(d).style.display == "none") {
      document.getElementById(d).style.display = "";
    } else {
      document.getElementById(d).style.display = "none";
    }
  }
  /* END - SHOW HIDE DIV LAYER FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////*/

  function ValidateForm(){
    var strMsg = "";
    if(document.form1.EmailFrom.value == ""){
      strMsg = "Please fill in your email address.\n";
    }
    if(strMsg == ""){
      return true;
    } else{
      alert(strMsg);
      return false;
    }
  }

  function open_window(url) {
    mywin = window.open(url,"win",'toolbar=1,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=345,height=350');
  }
  function CloseWindow() {
    mywin = window.close()
  }

  function isValidEmail(str) {
    var at        = "@";
    var dot       = ".";
    var lat       = str.indexOf(at);
    var lstr      = str.length;
    var ldot      = str.indexOf(dot);
    var blnResult = true;

    if (str.indexOf(at)==-1) {
      var blnResult = false;
    }
    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
      var blnResult = false;
    }
    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
      var blnResult = false;
    }
    if (str.indexOf(at,(lat+1))!=-1){
      var blnResult = false;
    }
    if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
      var blnResult = false;
    }
    if (str.indexOf(dot,(lat+2))==-1){
      var blnResult = false;
    }
    if (str.indexOf(" ")!=-1){
      var blnResult = false;
    }
    return blnResult;
  }

  function isValidZip(str) {
    var strValidChars = "0123456789";
    var strChar;
    var blnResult     = true;

    if (str.length < 5) {
      blnResult = false;
    }
    // string comprised of only the valid characters listed above?
    for (i=0; i<str.length && blnResult==true; i++) {
      strChar = str.charAt(i);
      if (strValidChars.indexOf(strChar) == -1) {
        blnResult = false;
      }
    }
    return blnResult;
  }

  function formMainSubmit(formToSubmit) {
    if (formToSubmit == "AA_Signup_Form") {
      var form = document.AA_Signup_Form;
    } else {
      var form = document.AA_Signup_Form_LeftNav;
    }

    // invalid email
    if (!isValidEmail(form.Email.value)) {
      alert("Please enter a valid e-mail address where you'd like to receive your alerts.");
      return false;
    }
    // invalid zip
    if (!isValidZip(form.PostalCode.value)) {
      alert("Please enter the valid 5-digit zip code of the city you'd like reported in your email alerts.");
      return false;
    }
    form.Email2.value = form.Email.value;
    form.submit();
  }

	/* navihgation functions */
  function imgAct(imgName) 
  {
	   document.getElementById(imgName).src = eval(imgName + "_on.src");
  }

  function imgInact(imgName) 
  {
	  document.getElementById(imgName).src = eval(imgName + "_off.src");
  }

  /* sub nav funcs */
  function ShowItem (itemID) {
	var x = document.getElementById(itemID);
	if (x)
	  x.style.visibility = "visible";
	return true;
  }

  function HideItem (itemID) { 
	var x = document.getElementById(itemID);
	if (x)
	   x.style.visibility = "hidden";
	return true;
  }

  /* form functions */
  function SubmitForm(formid)
  {  
	  var frmZipCode = document.getElementById(formid);
	  //var PostalCode = document.getElementById("PostalCode");  
  
	  //check the length
	  if (frmZipCode.PostalCode.value.length==0) {
			  alert ("Please enter a zip code.");
			  return false;
	  } 		  
   
	  //validate that the entry is in the correct form
	  if (validateZipCode(frmZipCode.PostalCode.value)==false) {
		  alert ("Please enter a valid zip code.");
		  return false;
	  } 	  
	  
	  return true;
  }

  function validateZipCode(elm)
  {

	  // ****************************************************************************
	  // VARIBLE USED TO TEST FOR VALID NUMERS AND STRINGS
	  // *****************************************************************************
	  var pattern = /^\d{5}([\-]\d{4})?$/ ;
	  
	  if (pattern.test(elm)) 
		  {
		  return true;
		  }
	  else 
		  {
		  return false;
		  }
  }


  /* resize columns function */
  function resize_cols(col1, col2)
  {
	if( col1 == '#adsurvey' )
	{
		var offset = (document.getElementById('adsurvey').offsetTop - 2); 
		$(col1).height($(col2).height() - offset);
	}
	else if( col2 == '#adsurvey' )
	{
		var offset = (document.getElementById('adsurvey').offsetTop - 2); 
		$(col2).height($(col1).height() - offset);
	}
	else if( col1 == '#iSmall' )
	{
		var offset = (document.getElementById('iSmall').offsetTop - 2); 
		$(col1).height($(col2).height() - offset);
	}
	else if( col2 == '#iSmall' )
	{
		var offset = (document.getElementById('iSmall').offsetTop - 2); 
		$(col2).height($(col1).height() - offset);
	}
	else
	{
		if( $(col1).height() > $(col2).height() )
		{
			$(col2).height($(col1).height());
		}
		else
		{
			$(col1).height($(col2).height());
		}
	}
  }

  function resize_column(column, height)
  {
  	$(column).height(height);
  }
	
// -->
