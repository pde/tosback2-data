

// email-edit.js
//---------------------------------------------------------------------
//  Change Log
//  DATE           WHO                CHANGE
//---------------------------------------------------------------------
//  2012-11-01     Joe Heasly	      allow 'rs' as valid domain extension
//---------------------------------------------------------------------
//  2012-07-09     Joe Heasly	      restored use of build-in alert(), which had been lost in merges
//                                    restored trailing comma at end of domain_types string
//
//---------------------------------------------------------------------
//  2012-06-18     JCherbonneau       Allowed att.com as vaild domain
//          
//---------------------------------------------------------------------
//  2012-03-14     JCherbonneau       Allowed "." for AOL & MSN in name of email
//          
//---------------------------------------------------------------------
//  2012-03-09     Mario Rodriguez    removed domain validations
//          
//---------------------------------------------------------------------
//  2011-12-07     Joe Heasly         added edits for common domain typos
//          
//---------------------------------------------------------------------
//  2006-08-21     Ted McClellan      changed MSN edits per Mark Klein
//          
//---------------------------------------------------------------------
//  2006-05-01     Ted McClellan      Tweaked edits:
//                                     added several entries to valid domains
//                                     added period as valid char within local Yahoo address
//                                     changed minimum chars after @ to 4  (formerly 3)
//                                     added MSN specific edits
//                                     changed edit on domains. can have 1 char except for final domain
//                                                              e.g. prof@u.mich.edu is now valid
//---------------------------------------------------------------------
//  2005-10-23     Mike Stavros       Changed logic for roles, removed extraneous code in AOL
//---------------------------------------------------------------------
//  2005-10-19     Mike Stavros       Added code to exclude "%", "`", "\" (local) and "_" (domain)
//                                    and to allow "/" (local)
//---------------------------------------------------------------------
//  2005-10-13     Srikanth Garnepudi Added code to include "-"and "." as a valid
//                                    character in the domain part of HOTMAIL e-mail address
//					and ".geo" in YAHOO.
//---------------------------------------------------------------------
//  2005-09-14     Srikanth Garnepudi Added code to include "_" as a valid
//                                    character in the domain part of e-mail address.
//---------------------------------------------------------------------
//  2005-08-31     J.J.Rouhana	      Added code to lower case the incoming
//                                    e-mail address.
//---------------------------------------------------------------------
//  2005-08-22     Srikanth Garnepudi Added new parameter isAlert
//                                    to make the tmpl more generic.
//---------------------------------------------------------------------
//  2005-07-28     Srikanth Garnepudi implemented pahse 1
//                                    new email validations.
//---------------------------------------------------------------------
//  2004-03-19     Chandan Rajpurohit Changed the code to make "._" 
//                                    in email address as valid 
//---------------------------------------------------------------------
//  2004-03-19     J.J.Rouhana        53887 - updated copy based on 
//                                    feedback from Dan Zarin
//---------------------------------------------------------------------
//  2003-04-17     Ted McClellan      acceptable characters for name & domain
//---------------------------------------------------------------------
//  2001-07-17     Ted McClellan      split name and domain and
//                                    tightened edits on domain 
//---------------------------------------------------------------------
//  1998           John Mooney        INITIAL
//---------------------------------------------------------------------
//  Documentation 
/* --------------------------------------------------------------------
    This Function receives 
    1) the value of the form's email field,
    2) the name of the email field (OPTIONAL)
    3) an indicator whether the email field is required (1=required; 0=not required) (OPTIONAL)
    4) an indicator whether the script is in debug mode (1=required; 0=not required) (OPTIONAL)
    5) an indicator whether the script is in alert mode (1=required; 0=not required) (OPTIONAL) default is "1".

    To call it, use the onSubmit event handler of the
    FORM object,
                        <FORM   NAME="form1"
                        onSubmit="return editEmail(this.email.value,'Buyer E-Mail Field','1','','1')" >

    or, the onClick event handler of the
    Submit button object, such as....

                        <INPUT  TYPE="submit"
                        NAME="submit-button"
                        onClick="return editEmail(form1.email.value,'','0','0','0')"
                        VALUE=" Submit "  >

       (where your FORM name='form1', & the email field is 'email')

   Note optional parms are set to default in initial code section

   Also,  in order to avoid JS error boxes popping up in clients using
   Netscape v2 or incompatible IE version 3 versions, any web page using
   this script as a SRC input should have the following structure in the
   SCRIPT tag that references the SRC file. By including this snippet,
   those browsers that do not support the SRC attribute, will encounter
   an empty function and will not result in an undefined function error.

   Those browsers will fall through to the net.data email field edits,
   currently less than 7% of our visitors.

    <SCRIPT LANGUAGE='JavaScript' SRC="email-editor.js">
     <!--
      //  dummy copy of the SRC file function, to help
      //  NSv2 and IE (< v3.02) from popping up JS error boxes..
      //
      //  In browsers supporting SRC file inclusion, JS scripts
      //  after the SCRIPT tag are ignored when SRC is used.

          function editEmail () {
          }
         function CheckI5(what2check)
           {
           }
      // -->
    </SCRIPT>
-------------------------------------------------------------------- */

//BeginExternalization
var emedt_msg_001 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";
var emedt_msg_002 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";
var emedt_msg_003 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";
var emedt_msg_004 = "domain =";
var emedt_msg_005 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  at symbol & period are not in pos.1 or pos.last.....
var emedt_msg_006 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  embedded ","
var emedt_msg_007 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		// all other invalid chars
var emedt_msg_008 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  must have at least 4 characters after the @
var emedt_msg_009 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  must not have '@' right after period '.' || period '.' right after '@'  || hyphen '-' right after '@' || underscore '_' right after '@' || hyphen '-' right after '.' || underscore '_' right after '.'
var emedt_msg_010 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  embedded space
var emedt_msg_011 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  Invalid Role Based Local Portions
var emedt_msg_012 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  Obsolete Domains Check
var emedt_msg_013 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  Invalid Domain Check
var emedt_msg_014 = "The email address you entered is invalid.\n\nPlease reenter your email address. Example: name@llbean.com";		//  Domain Typos Check
//EndExternalization

// valid_domains, obsolete_domains and domain_typos use exact match. So we need to start and end the keyword with comma(,). which will be the delimiter
var valid_domains = ",aero,arpa,biz,com,coop,edu,gov,info,int,usa,mil,mobi,museum,name,net,org,pro,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,ax,aw,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cs,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,er,es,et,eu,fi,fj,fk,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jm,jo,jobs,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,travel,tt,tv,tw,tz,ua,ug,uk,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,ye,yt,yu,za,zm,zw,";
var obsolete_domains = ",home.com,altavista.net,ivillage.net,";
var domain_typos = ",verison.net,yaho.com,hotmial.com,hotmail.co,yahoo.co,concast.net,aol.co,gmial.com,msm.com,gmail.co,ayhoo.com,oal.com";

// invalid_roles checks for the keyword any where in the email local address. So we dont' need to start and end the keyword with comma(,). which will be the delimiter
var invalid_roles = "abuse,postmaster,alerts,blacklist,blackhole,mailer-daemon,nospam,privacy,security,spam,spamtrap,webmaster";

function editEmail(theEmailAddr,theEmailAddrFieldName,isRequired,debug,isAlert) {

// lower case the e-mail address.  there are no rules for case sensitivity.
theEmailAddr=theEmailAddr.toLowerCase();

var cur_domain = theEmailAddr.substr(theEmailAddr.indexOf("@")+1,theEmailAddr.length);
var local_addr = theEmailAddr.substr(0,theEmailAddr.indexOf("@"));
  //----------------------------------------------------------
  //  set the optional parms to 0 if undefined (compares null)
  //  (avoid problems in NS v3.)
  //----------------------------------------------------------
  if ( theEmailAddrFieldName.length < 1  ) {
       theEmailAddrFieldName = "Email Address";
  }
  if ( isAlert == null ) {
         isAlert = 1;
  }
  if ( debug == null ) {
       debug = 0;
  }
  if ( isRequired == null ) {
       isRequired = 0;
  }
  if (debug == 1) {
           alert ("theEmailAddr="+theEmailAddr+"\n"+"theEmailAddr.length="+theEmailAddr.length+"\n"+"isRequired="+isRequired);
  }
  //----------------------------------------------
  //  empty email is ok unless its required
  //----------------------------------------------
  if (theEmailAddr.length < 1)  {
          if (isRequired == 1)  {
                  if (isAlert == 1) 
                  	{ alert(emedt_msg_001); }
                  return false;
      }
          return true;
  }

  //----------------------------------------------
  //  embedded " or "
  //----------------------------------------------
//  if ( theEmailAddr.indexOf(" or ") > -1 ) {
//   if (isAlert == 1){ alert("Only one email address can be entered.\n\nPlease enter one email address."); }
//    return false;
//  }

  //----------------------------------------------
  //  perfunctory length check .. must be 6 or greater x@x.bj
  //----------------------------------------------
  if (theEmailAddr.length < 6) {
    if (isAlert == 1) 
    	{ alert(emedt_msg_002); }
    return false;
  }
  
  //----------------------------------------------
  //  length of 70 (!) or less ....
  //----------------------------------------------
  if ( theEmailAddr.length > 70 ) {
   if (isAlert == 1)  
   	{ alert(emedt_msg_003); }
    return false;
  }

  //----------------------------------------------
  //  only one at symbol
  //----------------------------------------------
  var atCounter = 0;
  for (i=0;i<=theEmailAddr.length;i++) {
//        if (isAlert == 1) { alert (theEmailAddr.substring(i,i+1)+" in pos. "+i); }
          if (theEmailAddr.substring(i,i+1) == "@") {
        atCounter++;
      }
  }
  if ( atCounter == 0 ) {
    if (isAlert == 1) 
    	{ alert(emedt_msg_002); }
    return false;
  }
  if ( atCounter > 1 ) {
    if (isAlert == 1) 
    	{ alert(emedt_msg_002); }
    return false;
  }

  //-------------------------------------------------------
  //  at symbol & period are not in pos.1 or pos.last.....
  //-------------------------------------------------------
  if (  (theEmailAddr.charAt(theEmailAddr.length - 1 ) == ".") 
     || (theEmailAddr.charAt(0) == ".") ) {
      if (isAlert == 1) 
      	{ alert(emedt_msg_005); }
      return false;
  }   
     
  if (  (theEmailAddr.charAt(theEmailAddr.length - 1 ) == "@")
     ||   (theEmailAddr.charAt(0) == "@")                     ) {
      if (isAlert == 1) 
      	{ alert(emedt_msg_005);  }
      return false;
  }
  
    
  //----------------------------------------------
  //  embedded ","
  //----------------------------------------------
  if ( theEmailAddr.indexOf(",") > -1 ) {
   if (isAlert == 1) 
   	{ alert(emedt_msg_006); }
    return false;
  }

  //----------------------------------------------
  //  all other invalid chars (valid: A-Za-z0-9@-_.~`!#$%^&*()+={[}]|\'<>? (and space which will be invalidated later in the code) )
  //  (see: http://developer.netscape.com/docs/examples/javascript/field_edits/checkEmail.html )
  //----------------------------------------------
  
  // 7/01 sptwm 
  // Split email addr into 2 parts using the @
  // name before @ has looser edits than domain  
    var delim = '@';
    emailparts = theEmailAddr.split(delim);
    if (emailparts[0]) {
       var addrname = emailparts[0];
    } else {
       var addrname = ' ';
    }
    if (emailparts[1]) {
       var addrdomain = emailparts[1];
    } else {
       var addrdomain = ' ';
    }
    
    invalidCh = '';
  //check name part first
  // 04/03 sptwm INVALID chars for name ()<>{}[]\\ ,;:@"
    for (var i = 0; i < addrname.length; i++) {
        ch = addrname.substring(i, i + 1)        
        if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z") || (ch >= "0"  &&  ch <= "9")
               || (ch == "~") || (ch == "!")  || (ch == "@")
               || (ch == "#") || (ch == "$")  || (ch == "/")  || (ch == "^")
               || (ch == "&") || (ch == "*")  || (ch == ",")  
               || (ch == "-") || (ch == "_")  || (ch == "+")  || (ch == "=")
               || (ch == "|") || (ch == "\'") || (ch == ".")  || (ch == "?"))
        {
        } 
        else {
           if (ch == " ")
             ch = "(space)";
           if ( invalidCh.length == 0 ) {
              invalidCh += ch;
           } else {
              invalidCh += "  and  " + ch ;
           }
        }
    }

    //check domain - specials characters not allowed
    // 04/03 sptwm VALID chars for domain . a-z A-Z 0-9 -
    for (var i = 0; i < addrdomain.length; i++) {
        ch = addrdomain.substring(i, i + 1)        
        if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z") 
               || (ch >= "0"  &&  ch <= "9")
               || (ch == "-") 
               || (ch == "."))   {
        } 
        else {
           if (ch == " ")
             ch = "(space)";
           if ( invalidCh.length == 0 ) {
              invalidCh += ch;
           } else {
              invalidCh += "  and  " + ch ;
           }
        }
    }

    //if (isAlert == 1) { alert("name=" + addrname + " post domn=" + addrdomain + " invalid=" + invalidCh); }

    if ( invalidCh.length == 0 ) {
    } else if 
       ( invalidCh.length == 1 ) {
   if (isAlert == 1)  
   	{ alert(emedt_msg_007); }
    return false;
    } else {
   if (isAlert == 1)  
   	{ alert(emedt_msg_007); }
    return false;
    }

  //----------------------------------------------
  //  no double periods
  //----------------------------------------------

  var dbltrouble = theEmailAddr.match(/\.\./g);
  dbltrouble = (dbltrouble == '..');
  if (dbltrouble) {
    if (isAlert == 1) 
    	{ alert(emedt_msg_002); }
    return false;
  }

  //----------------------------------------------------------------
  // Site 05 phase 1 changes
  //----------------------------------------------------------------

  //----------------------------------------------------------------
  //  must have at least 4 characters after the @
  //----------------------------------------------------------------

  if(cur_domain.length < 4)	// Checks whether the length is greater than 4 characters
  {
     if (isAlert == 1) { alert(emedt_msg_008); }
     return false;
  }

  //----------------------------------------------
  //  '@' right after period '.' 
  //----------------------------------------------
  if (theEmailAddr.indexOf(".@") > -1) {
   if (isAlert == 1)  
   	{ alert(emedt_msg_009); }
    return false;
  }


  //----------------------------------------------
  //  hyphen '-' right after '@'
  //----------------------------------------------
  if (theEmailAddr.indexOf("@-") > -1) {
   if (isAlert == 1) 
   	{ alert(emedt_msg_009); }
    return false;
  }

  //----------------------------------------------
  //  underscore '_' right after '@'
  //----------------------------------------------
  if (theEmailAddr.indexOf("@_") > -1) {
   if (isAlert == 1) 
   	{ alert(emedt_msg_009); }
    return false;
  }

  //----------------------------------------------
  //  hyphen '-' right after '.'
  //----------------------------------------------
  if (theEmailAddr.indexOf(".-") > -1) {
   if (isAlert == 1) 
   	{ alert(emedt_msg_009); }
    return false;
  }

  //----------------------------------------------
  //  underscore '_' right after '.'
  //----------------------------------------------
  if (addrdomain.indexOf("._") > -1) {  	
   if (isAlert == 1) 
   	{ alert(emedt_msg_009); }
    return false;
  }


  //----------------------------------------------
  //  embedded space
  //----------------------------------------------
  if ( (theEmailAddr.indexOf(" ") < theEmailAddr.length)
     && (theEmailAddr.indexOf(" ") >= 0)) {
   if (isAlert == 1) 
   	{ alert(emedt_msg_010); }
    return false;
  }

  //----------------------------------------------
  //  no period after at symbol
  //----------------------------------------------
  var domain = theEmailAddr.substring(theEmailAddr.indexOf("@")+1,theEmailAddr.length);
  if ( debug == 1 ) 
  {
     if (isAlert == 1) 
     	{ alert (emedt_msg_004+domain ); }
  }
  if (domain.indexOf(".") < 1 ) 
  {
   if (isAlert == 1) 
   	{ alert(emedt_msg_009); }
    return false;
  }

  //----------------------------------------------------------------
  //  Invalid Role Based Local Portions
  //----------------------------------------------------------------
  // Ensures that the e-mail address local name does not match with any invalid roles

  var invalidrole = invalid_roles.split(','); // split all the invalid roles at "," and put in invalidrole variable

  // check email address does not contain any of the invalidroles
  for (var i=0;i< invalidrole.length;i++ )
  {
	if(local_addr == invalidrole[i])
	{
	    if (isAlert == 1) { alert(emedt_msg_011); }
	    return false;
	}
   }
   
  //----------------------------------------------------------------
  //  Obsolete Domains Check
  //----------------------------------------------------------------
  // ensures that the e-mail address does not match with any obsolete domains

if ( obsolete_domains.match(","+cur_domain+",") != null)
{
   	if (isAlert == 1) 
   		{ alert(emedt_msg_012); }
	return false;
}

  //----------------------------------------------------------------
  //  Domain Typos Check
  //----------------------------------------------------------------
  // ensures that the e-mail address does not match common domain typos

if ( domain_typos.match(","+cur_domain+",") != null)
{
   	if (isAlert == 1) 
   		{ alert(emedt_msg_014); }
	return false;
}

 //----------------------------------------------------------------
 //  Valid Domain Check
 //----------------------------------------------------------------

 // ensures that the e-mail address does match only with valid domains
 //get all the domains after the host. Eg: In Yahoo.co.in temp takes yahoo.co.in adding a "." at he end ie. yahoo.co.in.

 //temp=cur_domain.substr(cur_domain.indexOf(".")+1,cur_domain.length)+".";
temp=cur_domain + ".";
dom="";
while((i=temp.indexOf(".") ) >=0 ) // checks every domain
{
     dom = (temp.substr(0,temp.indexOf(".")));
     //----------------------------------------------------------------
     // every domain must have atleast 2 characters 
     //----------------------------------------------------------------
     // twm 2006-05 loop is needed to populate last domain	
     temp = temp.substr(i+1,cur_domain.length);
}


// Note this should be after the above valid domain checks only
// as it access the variable created and set in the above check.
 



 //----------------------------------------------------------------
 //  last domain must be a valid domain
 //----------------------------------------------------------------

 if(valid_domains.match(","+dom+",") == null || valid_domains.match(","+dom+",") == "")
 {
   if (isAlert == 1) { alert(emedt_msg_013); }
   return false;
 }


  return true;
}   // end of editEmail function



function optinCheck(formname)
  {
    if (formname.saemail_optin_flg.checked && formname.saemail1.value== "" )
    {
               alert(emedt_msg_001);
               return false;
     }
    return true;
  }

