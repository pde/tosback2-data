function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_validateForm() { //v4.0
  var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
  for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=MM_findObj(args[i]);
    if (val) { nm=val.name; if ((val=val.value)!="") {
      if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
        if (p<1 || p==(val.length-1)) errors+='- '+nm+' must contain an e-mail address.\n';
      } else if (test!='R') { num = parseFloat(val);
        if (isNaN(val)) errors+='- '+nm+' must contain a number.\n';
        if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
          min=test.substring(8,p); max=test.substring(p+1);
          if (num<min || max<num) errors+='- '+nm+' must contain a number between '+min+' and '+max+'.\n';
    } } } else if (test.charAt(0) == 'R') errors += '- '+nm+' \n'; }
  } if (errors) alert('You must complete the following fields before submitting:\n'+errors);
  document.MM_returnValue = (errors == '');
}

function displayBuyButton(itemId){
 document.getElementById("itemNum").value = itemId ;
 document.frmItemAddition.submit(); 
}

function goToLastPage(){history.back();}

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

<!-- Begin
var ans = new Array;
var done = new Array;
var yourAns = new Array;

var score = 0;

ans[1] = "c";
ans[2] = "a";
ans[3] = "b";
ans[4] = "b";
ans[5] = "c";


function Engine(question, answer) {
yourAns[question]=answer;
}

function Score(){
var answerText = "How Did I Do?\n------------------------------------\n\n";
if(score >= 1)
{
	score = 0;
}
for(i=1;i<=5;i++){
   answerText=answerText+"\QUESTION "+i+"\n";
  if(ans[i]!=yourAns[i]){
    answerText=answerText+"The correct answer is \""+ans[i]+"\"\n\n";
  }
  else{
    answerText=answerText+" Correct! \n\n";
    score++;
  }
}



answerText=answerText+"\nYour total score is : "+score+"\n\n";



alert(answerText);

}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function popWinNotAvailable() {
    var page = "help_not_online.jsp";

    var popupwindow = window.open(page,"help_not_online","width=400,height=350,menubar=no,scrollbars,status=no");

    popupwindow.focus();

  }



function runSearch() {
  var f = document.mfgList;
  var mfg = "";
  var gotoPage = "/Grainger/rp_search_by_product.jsp";

  var mfgSelect = f.mfg_list;
  for (var i = 0; i < mfgSelect.length; i++) { 
    if (mfgSelect.options[i].selected) {
      mfg = mfgSelect.options[i].value;
      break;
    }
  }

  if (mfg) {
    if (mfg == "MasterLock") {
    	location = "/Grainger/static/rp_locks.html";
    } else {
        location = gotoPage + "?mfgSearchCriteria=" + mfg + "&search.x=1&baseSearchType=product";
    }
  }
  
}

function updateSelectBox(letter) {

  var f = document.mfgList;
  var sel = f.mfg_list;
  sel.options[0].selected = true;
  sel.options[0].selected = false;

  for (var i = 0; i < sel.length; i++) {
    var obj = sel.options[i].text;
    var arr = obj.split('');
    if (arr[0] == letter) {
      var loc = i + 11;
      if (loc > sel.length) loc = sel.length - 1; 
      sel.options[loc].selected = true;
      sel.options[loc].selected = false;
      break;
   }
  }

}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}


function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}


function checknew(date) {
var pic = "/images/new_icon.gif";
expdate = new Date(date);
curdate = new Date();
if (expdate.getTime() > curdate.getTime())
document.write("<img src=" + pic + " align=absbottom alt=New! title=New!>");
}



/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Scragar | Licensed under: Public Domain
 */

function BannerRotator(){
// first, defaults:
  this.timer = 2;
  this.bannerNum = 0;// -1 = random
// then normal init work
  this.banners = [];
  this.binding = null;
  this.timeout = null;

  this.add = function(){// add a banner to the array
    this.banners[this.banners.length] = [arguments[0], arguments[1]];
  }

  this.bind = function(){// bind to an element
    if(typeof arguments[0] == 'string')
      this.binding = document.getElementById(arguments[0]);
    else
      this.binding = arguments[0];
    this.rotate();
  }

  this.rotate = function(){// the actual image rotator
    if( ! this.empty())
      return;
    var showNum, tmpA = document.createElement('a'), tmpImg = document.createElement('img');

    if(this.bannerNum < 0)// random
      showNum = Math.floor(Math.random()*this.banners.length);
    else// syncronous
      showNum = this.bannerNum=(++this.bannerNum >= this.banners.length)?0:this.bannerNum;

    tmpA.href = this.banners[showNum][0];
    tmpImg.src = this.banners[showNum][1];
    tmpA.appendChild(tmpImg);
    this.binding.appendChild(tmpA);
  }

  this.empty = function(){// empty the element if possible
    if(this.binding == null)
      return false;
    while(this.binding.hasChildNodes())
      this.binding.removeChild(this.binding.firstChild);
    return true;
  }

  this.startTimer = function(){// start the loop, normaly done during page load.
    this.stopTimer();
    this.timeout = window.setInterval(
      (function(x){
        return function(){
          x.rotate();
        }
      })(this), this.timer*1000);
  }

  this.stopTimer = function(){// stop the loop, nice to make available via a button.
    if(this.timeout != null)
      window.clearInterval(this.timeout);
    this.timeout = null;
  }
}




// ************* ROTATE BANNER IMAGES ************* //

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

// Banner 1

var myBanner1 = new BannerRotator();

myBanner1.add('/Grainger/static/fos_gosm_online_training_courses.html', 'http://www.grainger.com/images/gosm-carousel-3.jpg');
myBanner1.add('/Grainger/static/fos_gosm_overview.html', 'http://www.grainger.com/images/gosm-carousel-1.jpg');
myBanner1.add('/Grainger/static/fos_gosm_safetymanager_complete.html', 'http://www.grainger.com/images/gosm-carousel-2.jpg');

myBanner1.timer = 7;// 5 secs between images

// Banner 2

var myBanner2 = new BannerRotator();

myBanner2.add('http://www.phpbuilder.com/', 'phpbuilder.gif');
myBanner2.add('http://www.4guysfromrolla.com/', 'http://www.4guysfromrolla.com/img/4guyslogo.gif');
myBanner2.add('http://www.codeguru.com/', 'http://www.codeguru.com/img/logo.gif');

myBanner2.timer = 6;// 6 secs between images
myBanner2.bannerNum = -1;// randomise banner

// Set-up display

addLoadEvent(function(){
  myBanner1.bind('banner1');// match to ID of element.
  myBanner1.startTimer();

  myBanner2.bind('banner2');// match to ID of element.
  myBanner2.startTimer();
});


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}


// *************TOGGLE VISIBILITY ************* //

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
	  e.style.display = 'none';
   else
	  e.style.display = 'block';
}


// ************* TOGGLE SHOW/HIDE ************* //

function toggle() {
	var ele = document.getElementById("toggleText");
	var text = document.getElementById("displayText");
	if(ele.style.display == "block") {
    		ele.style.display = "none";
		text.innerHTML = "Show Information";
  	}
	else {
		ele.style.display = "block";
		text.innerHTML = "Hide Information";
	}
} 


// *************QUICK TIPS TOGGLE VISIBILITY ************* //
//  <script language="javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
//		<script type="text/javascript"> 
//			$(document).ready(function() {
//				$('.ezList .ezSectionTitle a').click(function() {
//					$(this).parent().parent().toggleClass('opened').fing('ul').toggle('fast');
//					return false;
//				});
//			});
//		</script>
		