	// convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();
    // *** BROWSER VERSION ***
    // Note: On IE5, these return 4, so use is.ie5up to detect IE5.
    var is_major = parseInt(navigator.appVersion);
    var is_minor = parseFloat(navigator.appVersion);
    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) && (agt.indexOf('webtv')==-1));
    var is_nav2 = (is_nav && (is_major == 2));
    var is_nav3 = (is_nav && (is_major == 3));
    var is_nav4 = (is_nav && (is_major == 4));
    var is_nav4up = (is_nav && (is_major >= 4));
    var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) || (agt.indexOf("; nav") != -1)) );
    var is_nav5 = (is_nav && (is_major == 5));
    var is_nav5up = (is_nav && (is_major >= 5));

    var is_ie   = (agt.indexOf("msie") != -1);
    var is_ie3  = (is_ie && (is_major < 4));
    var is_ie4  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")==-1) );
    var is_ie4up  = (is_ie  && (is_major >= 4));
    var is_ie5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
    var is_ie5up  = (is_ie  && !is_ie3 && !is_ie4);

    var is_aol   = (agt.indexOf("aol") != -1);
    var is_aol3  = (is_aol && is_ie3);
    var is_aol4  = (is_aol && is_ie4);

    var is_opera = (agt.indexOf("opera") != -1);
    var is_webtv = (agt.indexOf("webtv") != -1);

    // *** JAVASCRIPT VERSION CHECK ***
    // Useful to workaround Nav3 bug in which Nav3
    var is_js;
    if (is_nav2 || is_ie3) is_js = 1.0
    else if (is_nav3 || is_opera) is_js = 1.1
    else if ((is_nav4 && (is_minor <= 4.05)) || is_ie4) is_js = 1.2
    else if ((is_nav4 && (is_minor > 4.05)) || is_ie5) is_js = 1.3
    else if (is_nav5) is_js = 1.4
    // NOTE: In the future, update this code when newer versions of JS
    // are released. For now, we try to provide some upward compatibility
    // so that future versions of Nav and IE will show they are at
    // *least* JS 1.x capable. Always check for JS version compatibility
    // with > or >=.
    else if (is_nav && (is_major > 5)) is_js = 1.4
    else if (is_ie && (is_major > 5)) is_js = 1.3
    // HACK: no idea for other browsers; always check for JS version with > or >=
    else is_js = 0.0;

    // *** PLATFORM ***
    var is_win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
    // NOTE: On Opera 3.0, the userAgent string includes "Windows 95/NT4" on all
    //        Win32, so you can't distinguish between Win95 and WinNT.
    var is_win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));

    // is this a 16 bit compiled version?
    var is_win16 = ((agt.indexOf("win16")!=-1) || (agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("windows 16-bit")!=-1) );  

    var is_win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) || (agt.indexOf("windows 16-bit")!=-1));

    // NOTE: Reliable detection of Win98 may not be possible. It appears that:
    //       - On Nav 4.x and before you'll get plain "Windows" in userAgent.
    //       - On Mercury client, the 32-bit version will return "Win98", but
    //         the 16-bit version running on Win98 will still return "Win95".
    var is_win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
    var is_winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
    var is_win32 = (is_win95 || is_winnt || is_win98 || ((is_major >= 4) && (navigator.platform == "Win32")) || (agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));

    var is_os2   = ((agt.indexOf("os/2")!=-1) || (navigator.appVersion.indexOf("OS/2")!=-1) || (agt.indexOf("ibm-webexplorer")!=-1));

    var is_mac    = (agt.indexOf("mac")!=-1);
    var is_mac68k = (is_mac && ((agt.indexOf("68k")!=-1) || (agt.indexOf("68000")!=-1)));
    var is_macppc = (is_mac && ((agt.indexOf("ppc")!=-1) || (agt.indexOf("powerpc")!=-1)));

    var is_sun   = (agt.indexOf("sunos")!=-1);
    var is_sun4  = (agt.indexOf("sunos 4")!=-1);
    var is_sun5  = (agt.indexOf("sunos 5")!=-1);
    var is_suni86= (is_sun && (agt.indexOf("i86")!=-1));
    var is_irix  = (agt.indexOf("irix") !=-1);    // SGI
    var is_irix5 = (agt.indexOf("irix 5") !=-1);
    var is_irix6 = ((agt.indexOf("irix 6") !=-1) || (agt.indexOf("irix6") !=-1));
    var is_hpux  = (agt.indexOf("hp-ux")!=-1);
    var is_hpux9 = (is_hpux && (agt.indexOf("09.")!=-1));
    var is_hpux10= (is_hpux && (agt.indexOf("10.")!=-1));
    var is_aix   = (agt.indexOf("aix") !=-1);      // IBM
    var is_aix1  = (agt.indexOf("aix 1") !=-1);    
    var is_aix2  = (agt.indexOf("aix 2") !=-1);    
    var is_aix3  = (agt.indexOf("aix 3") !=-1);    
    var is_aix4  = (agt.indexOf("aix 4") !=-1);    
    var is_linux = (agt.indexOf("inux")!=-1);
    var is_sco   = (agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1);
    var is_unixware = (agt.indexOf("unix_system_v")!=-1); 
    var is_mpras    = (agt.indexOf("ncr")!=-1); 
    var is_reliant  = (agt.indexOf("reliantunix")!=-1);
    var is_dec   = ((agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1) || (agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1) || (agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1)); 
    var is_sinix = (agt.indexOf("sinix")!=-1);
    var is_freebsd = (agt.indexOf("freebsd")!=-1);
    var is_bsd = (agt.indexOf("bsd")!=-1);
    var is_unix  = ((agt.indexOf("x11")!=-1) || is_sun || is_irix || is_hpux || is_sco ||is_unixware || is_mpras || is_reliant || is_dec || is_sinix || is_aix || is_linux || is_bsd || is_freebsd);
    var is_vms   = ((agt.indexOf("vax")!=-1) || (agt.indexOf("openvms")!=-1));

function newWindow(URL) {
       window.open(URL,"EmailToFriend","width=650,height=600,scrollbars=yes,resizable=yes,status=yes");
}

function newInvisibleWindow(URL) {
       window.open(URL,"EmailToFriend","width=0,height=0,scrollbars=yes,resizable=yes,status=yes");
}

// Function used to create popup windows for in article body links.
function popupWin(URL, winName, width, height) {

   if (isNaN(parseInt(width))) {
      // Error with width parameter, use default value of 600.
      width=600;
   }

   if (isNaN(parseInt(height))) {
      // Error with height parameter, use default value of 650.
      height=650;
   }

   window.open(URL,winName,"width="+ width + ",height=" + height + ",scrollbars=yes,resizable=yes,status=yes");   
}

// Functions used to define and play sound files (e.g. sound.wav).
var audioOn = false;
function defineMySound (sound_name, sound_file) {

   // alert("defineMySound: sound_name=" + sound_name + " sound_file= " + sound_file);

   document.writeln("<EMBED NAME='" + sound_name + "' SRC='" + sound_file + "' MASTERSOUND LOOP='false' AUTOSTART='false' AUTOREWIND='true' HIDDEN='true' WIDTH='0' HEIGHT='0'>");
}

function audioDo(doWhat,toWhat){
   if(audioOn){
      var A = eval('document.'+toWhat);
      if (A != null){
         if (doWhat=='stop') A.stop();
         else{
            if (navigator.appName == 'Netscape') A.play();
            else{
               if (document.M == null){
                  document.M = false; 
				  var m;
                  for(m in A) if (m == "ActiveMovie"){
                     document.M = true; break;
                     }
                  }
               if (document.M) A.SelectionStart = 0;
               if (document.M) A.play();
            }
         }
      }
   }
}

// Function used to open URL in a new window (target="_blank").
function openBlankTargetWin (myURL) {
   // alert ("openBlankTargetWin: attempting to open up URL in new browser window");
   window.open(myURL,"_blank");
}

//Function used to validate search text entry 
function validateQT() {
	if(document.SeekForm.SearchTextArea != null && document.SeekForm.SearchTextArea.value.length == 0 || document.SeekForm.SearchTextArea.value == "Search here...") {
         document.SeekForm.SearchTextArea.focus();
         alert("Please enter a question or keyword to search.");
         return false;
    }
	return true;
}

//Function used to validate search text entry 
//function validateQT(form) {
//	if(form.qt != null && form.qt.value.length == 0) {
//	   form.qt.focus();
//		alert("Please enter a question or keyword to search.");
//		return false;
//	}
//	return true;
//}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  
  if(!d) d=document; 
  if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
  }
  if(!(x=d[n])&&d.all) x=d.all[n]; 
  for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); 
  return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function printWindow(URL) {
	window.open(URL,"Print","width=700,height=600,scrollbars=yes,resizable=yes,status=yes,toolbar=yes,menubar=yes");
}

function checkOutWindow(URL) {
	window.open(URL,"CheckOut","width=600,height=400,scrollbars=yes,resizable=yes,status=yes")
}
//Just a dummy function, so that when in the onload this function is called, no javascript error in thrown for mothership. There is no marquee for the mothership.
function intializemarquee(){
}

function NewCPNNPNWindow(URL, name) {
     window.open(URL,name,"width=650,height=430,scrollbars=yes,resizable=yes,status=yes");
}

// General Nemours Cookie check/create, especially for pages that don't carry ads
function checkCookieNemours2() {
var nemCheck = readTheCookie2('refNemours');
var referringURL = document.referrer;
var referringURLowerCase = referringURL.toLowerCase();
	//First check to see if a Nemours cookie exists
	if(nemCheck == '1') {
		//Recreate the cookie to reset the timer
		createTheCookie2('refNemours','1','.5');
		function gamRefresh(url) {
			//alert('booYa');
		}
		//do no more (don't display ads)
		//alert("cookie existed");
		}
		
	//Next, if there's no cookie, check if the user was referred from Nemours
	///* test line */ else if(document.referrer.indexOf('mobilewebby') >-1) {
	/* actual line */ 
else if(referringURLowerCase.indexOf('nemours') >-1 || referringURLowerCase.indexOf('medlineplus') >-1 || referringURLowerCase.indexOf('nlm') >-1 || referringURLowerCase.indexOf('nih') >-1 || referringURLowerCase.indexOf('mobilewebby') >-1) {
		//This user was sent from Nemours so let's create a cookie
		createTheCookie2('refNemours','1','.5');
		function gamRefresh(url) {
			//alert('booYa');
		}
		//do no more (don't display ads)
		//alert("cookie created");
		}
		
	//If none of the above conditions are true then the user either didn't come from Nemours
	//or their session has timed out -- show the ads
	else {
		// Do nothing in this instance	
		}
}
			
function createTheCookie2(name,value,days) {
	if (days) 
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*60*60*1000));
		var expires = "; expires="+date;
		//alert(date);
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
	
function readTheCookie2(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

checkCookieNemours2();

document.write(unescape("%3Cscript src=\"/misc/foresee/foresee-trigger.js\" %3E%3C/script%3E"));