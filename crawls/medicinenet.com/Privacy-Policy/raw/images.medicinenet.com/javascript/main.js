<!--
function WindowOpenNoMenu(url,width,height) {
  myWindow = window.open("" ,"windowRef","width=" + width + ",height=" + height+",top=0,left=0,screenX=0,screenY=0,resizable=yes,scrollbars=yes");
  myWindow.location.href = "" + url;
  if (!myWindow.opener) myWindow.opener = self;
  }
function WindowOpenMenu(url,width,height) {
  myWindow = window.open("" ,"windowRef","width=" + width + ",height=" + height+",top=0,left=0,screenX=0,screenY=0,directories=yes,location=yes,menubar=yes,scrollbars=yes,status=yes,toolbar=yes,resizable=yes");
  myWindow.location.href = "" + url;
  if (!myWindow.opener) myWindow.opener = self;
  }
function myVoid() {
  ;
  }
function pageto(sel){
  window.location.href(sel.value);
  }
function quickprintpage() {
  window.print();  
  }
function NewWindowOpenNoMenu(url,width,height) {
  myWindow = window.open("" ,"","width=" + width + ",height=" + height+",top=0,left=0,screenX=0,screenY=0,resizable=no,scrollbars=no");
  myWindow.location.href = "" + url;
  if (!myWindow.opener) myWindow.opener = self;
  }
function NewWindowOpenMenu(url,width,height) {
  myWindow = window.open("" ,"","width=" + width + ",height=" + height+",top=0,left=0,screenX=0,screenY=0,directories=yes,location=yes,menubar=yes,scrollbars=yes,status=yes,toolbar=yes,resizable=yes");
  myWindow.location.href = "" + url;
  if (!myWindow.opener) myWindow.opener = self;
  }
function JumpTo(sel){
  location=(sel.value);
  }
function JumpToFT(){
  window.location.href=(document.focusedtopics.topic.options[document.focusedtopics.topic.selectedIndex].value);
  }
function Template_swapImgRestore() { //v3.0
  var i,x,a=document.Template_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
  }
function Template_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.Template_p) d.Template_p=new Array();
    var i,j=d.Template_p.length,a=Template_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.Template_p[j]=new Image; d.Template_p[j++].src=a[i];}}
  }
function Template_findObj(n,d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=Template_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
  }
function Template_swapImage() { //v3.0
  var i,j=0,x,a=Template_swapImage.arguments; document.Template_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=Template_findObj(a[i]))!=null){document.Template_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
  }
function ShowNews(mySelect) {
  PageIndex2=mySelect.selectedIndex;
    {
    if (mySelect.options[PageIndex2].value != "none")
      {frames['newsframe'].location.href = mySelect.options[PageIndex2].value;}
    }
  }

	function Split(str, sep)
	{
		var tmpStr   = "";
		var tmpArray = new Array();

		for(var i=0; i < str.length; i++)
		{
			if(str.charAt(i) != sep)
			{	
				tmpStr += str.charAt(i);
			}
			else
			{
				tmpArray[tmpArray.length] = tmpStr;
				tmpStr = "";
			}
		}
		tmpArray[tmpArray.length] = tmpStr;
		return tmpArray;
	}

	function getQueryStringValues()
	{
	   var args  = new Array();
	   var query = location.search.substring(1);
	   var pairs = Split(query, "&");
	   
	   for(var i=0; i < pairs.length; i++)
	   {
		  var pos = pairs[i].indexOf("=");
		  if(pos == -1) 
		  {
			 continue;
		  }
		  var argname = pairs[i].substring(0, pos);
		  var value = pairs[i].substring(pos+1); 
		  args[i] = unescape(value); 
	   }
	   return args;
	}


	function checkEmailAddr() 
	{
	var argsVal = getQueryStringValues();	

		illegal = /[^\w._\-]/
		email = document.MiniForm.EmailAddr.value;

		if (email.length<6 || email.indexOf('@')==-1 || email.indexOf('.')==-1)
			email="";
		else 
		{
			At = email.indexOf('@');
			Period = email.lastIndexOf('.');
			DNS1 = email.substring(0,At);
			if (DNS1.length<1 || DNS1.match(illegal)!=null) email="";
			DNS2 = email.substring(At+1,Period);
			if (DNS2.length<1 || DNS2.match(illegal)!=null) email="";
			DNS3 = email.substring(Period+1,email.length);
			if (DNS3.length<2 || DNS3.match(illegal)!=null) email="";
		}

		if (email.length==0) 
		{
			alert("The email address you have entered is invalid. Please re-enter a valid email address.\n");
			document.MiniForm.EmailAddr.focus();
			return false;
		}
		
		return true;
	}

	function checkEmailAndPrivacy() 
	{        
	    var argsVal = getQueryStringValues();	

		illegal = /[^\w._\-]/
		email = document.MiniForm.EmailAddr.value;

        if($("#EmailCheck").is(':checked')) 
        {
		    if (email.length<6 || email.indexOf('@')==-1 || email.indexOf('.')==-1)
			    email="";
		    else 
		    {
			    At = email.indexOf('@');
			    Period = email.lastIndexOf('.');
			    DNS1 = email.substring(0,At);
			    if (DNS1.length<1 || DNS1.match(illegal)!=null) email="";
			    DNS2 = email.substring(At+1,Period);
			    if (DNS2.length<1 || DNS2.match(illegal)!=null) email="";
			    DNS3 = email.substring(Period+1,email.length);
			    if (DNS3.length<2 || DNS3.match(illegal)!=null) email="";
		    }

		    if (email.length==0) 
		    {
			    alert("The email address you have entered is invalid. Please re-enter a valid email address.\n");
			    document.MiniForm.EmailAddr.focus();
			    return false;
		    }
        }
        else 
        {
            $("#EmailCheck,.emailCheckError").addClass("error");
            return false;
        }
        

		
		return true;
	}


function staticCustomLink(link){
var s_md;
try{ s_md=window.parent.s_gi(window.parent.s_account); } catch(e){ s_md=s_gi(s_account); }
s_md.linkTrackVars="prop17,prop18,prop20,prop34,prop50";
try{s_md.prop18=link;}catch(e){}
try{s_md.prop17=link.split('_')[0];}catch(e){}
try{link=s_md.pageName.split("_").join("-") + "_"+link; }catch(e){} 
try{s_md.prop20=link;}catch(e){}
try{s_md.prop34=s_md.pageName.split("_").join("-") +"_"+s_md.prop17;}catch(e){}
try{ void(window.parent.s_md.tl(true, 'o', link.toLowerCase())); }catch(e){void(s_md.tl(true, 'o', link.toLowerCase())); } 
}



function openSponsorResourcesWin()
{ var h = 160, w = 340; var arg = "resizable=no,status=yes,scrollbars=no" + ",width=" + w + ",height=" + h; window.open("http://www.webmd.com/content/pages/25/114024.htm", "subWin", arg ); return false;} 


function show(tElement,sElement) {
  var tarElement = document.getElementById(tElement);
  var srcElement = document.getElementById(sElement);
  if(srcElement != null && tarElement != null) {
    tarElement.innerHTML = srcElement.innerHTML;
    tarElement.style.display = "block";
  }
  else {
    tarElement.style.display = "none";
  }
    //return false;
}

//-->

//** Tab Content script- used in the SuperCenter pages.

var enabletabpersistence=0 //enable tab persistence via session only cookies, so selected tab is remembered?

////NO NEED TO EDIT BELOW////////////////////////
var tabcontentIDs=new Object()

function expandcontent(linkobj){
var ulid=linkobj.parentNode.parentNode.id //id of UL element
var ullist=document.getElementById(ulid).getElementsByTagName("li") //get list of LIs corresponding to the tab contents
for (var i=0; i<ullist.length; i++){
ullist[i].className=""  //deselect all tabs
if (typeof tabcontentIDs[ulid][i]!="undefined") //if tab content within this array index exists (exception: More tabs than there are tab contents)
document.getElementById(tabcontentIDs[ulid][i]).style.display="none" //hide all tab contents
}
linkobj.parentNode.className="selected"  //highlight currently clicked on tab
document.getElementById(linkobj.getAttribute("rel")).style.display="block" //expand corresponding tab content
saveselectedtabcontentid(ulid, linkobj.getAttribute("rel"))
}

function expandtab(tabcontentid, tabnumber){ //interface for selecting a tab (plus expand corresponding content)
var thetab=document.getElementById(tabcontentid).getElementsByTagName("a")[tabnumber]
if (thetab.getAttribute("rel"))
expandcontent(thetab)
}

function savetabcontentids(ulid, relattribute){// save ids of tab content divs
if (typeof tabcontentIDs[ulid]=="undefined") //if this array doesn't exist yet
tabcontentIDs[ulid]=new Array()
tabcontentIDs[ulid][tabcontentIDs[ulid].length]=relattribute
}

function saveselectedtabcontentid(ulid, selectedtabid){ //set id of clicked on tab as selected tab id & enter into cookie
if (enabletabpersistence==1) //if persistence feature turned on
setCookie(ulid, selectedtabid)
}

function getullistlinkbyId(ulid, tabcontentid){ //returns a tab link based on the ID of the associated tab content
var ullist=document.getElementById(ulid).getElementsByTagName("li")
for (var i=0; i<ullist.length; i++){
if (ullist[i].getElementsByTagName("a")[0].getAttribute("rel")==tabcontentid){
return ullist[i].getElementsByTagName("a")[0]
break
}
}
}

function initializetabcontent(){
for (var i=0; i<arguments.length; i++){ //loop through passed UL ids
if (enabletabpersistence==0 && getCookie(arguments[i])!="") //clean up cookie if persist=off
setCookie(arguments[i], "")
var clickedontab=getCookie(arguments[i]) //retrieve ID of last clicked on tab from cookie, if any
var ulobj=document.getElementById(arguments[i])
var ulist=ulobj.getElementsByTagName("li") //array containing the LI elements within UL
for (var x=0; x<ulist.length; x++){ //loop through each LI element
var ulistlink=ulist[x].getElementsByTagName("a")[0]
if (ulistlink.getAttribute("rel")){
savetabcontentids(arguments[i], ulistlink.getAttribute("rel")) //save id of each tab content as loop runs
ulistlink.onclick=function(){
expandcontent(this)
return false
}
if (ulist[x].className=="selected" && clickedontab=="") //if a tab is set to be selected by default
expandcontent(ulistlink) //auto load currenly selected tab content
}
} //end inner for loop
if (clickedontab!=""){ //if a tab has been previously clicked on per the cookie value
var culistlink=getullistlinkbyId(arguments[i], clickedontab)
if (typeof culistlink!="undefined") //if match found between tabcontent id and rel attribute value
expandcontent(culistlink) //auto load currenly selected tab content
else //else if no match found between tabcontent id and rel attribute value (cookie mis-association)
expandcontent(ulist[0].getElementsByTagName("a")[0]) //just auto load first tab instead
}
} //end outer for loop
}


function getCookie(Name){ 
var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
if (document.cookie.match(re)) //if cookie found
return document.cookie.match(re)[0].split("=")[1] //return its value
return ""
}

function setCookie(name, value){
document.cookie = name+"="+value //cookie value is domain wide (path=/)
}

// end of Tab Content Scripts 

// TAB CONTENT FOR EMED. A-Z FIRSTAID
function tab_content(tabinterfaceid){
	this.tabinterfaceid=tabinterfaceid //ID of Tab Menu main container
	this.tabs=document.getElementById(tabinterfaceid).getElementsByTagName("a") //Get all tab links within container
	this.enabletabpersistence=true
	this.hottabspositions=[] //Array to store position of tabs that have a "rel" attr defined, relative to all tab links, within container
	this.subcontentids=[] //Array to store ids of the sub contents ("rel" attr values)
	this.revcontentids=[] //Array to store ids of arbitrary contents to expand/contact as well ("rev" attr values)
	this.selectedClassTarget="link" //keyword to indicate which target element to assign "selected" CSS class ("linkparent" or "link")
}

tab_content.getCookie=function(Name){ 
	var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
	if (document.cookie.match(re)) //if cookie found
		return document.cookie.match(re)[0].split("=")[1] //return its value
	return ""
}

tab_content.setCookie=function(name, value){
	document.cookie = name+"="+value+";path=/" //cookie value is domain wide (path=/)
}

tab_content.prototype={

	expandit:function(tabid_or_position){ //PUBLIC function to select a tab either by its ID or position(int) within its peers
		this.cancelautorun() //stop auto cycling of tabs (if running)
		var tabref=""
		try{
			if (typeof tabid_or_position=="string" && document.getElementById(tabid_or_position).getAttribute("rel")) //if specified tab contains "rel" attr
				tabref=document.getElementById(tabid_or_position)
			else if (parseInt(tabid_or_position)!=NaN && this.tabs[tabid_or_position].getAttribute("rel")) //if specified tab contains "rel" attr
				tabref=this.tabs[tabid_or_position]
		}
		catch(err){alert("Invalid Tab ID or position entered!")}
		if (tabref!="") //if a valid tab is found based on function parameter
			this.expandtab(tabref) //expand this tab
	},

	setpersist:function(bool){ //PUBLIC function to toggle persistence feature
			this.enabletabpersistence=bool
	},

	setselectedClassTarget:function(objstr){ //PUBLIC function to set which target element to assign "selected" CSS class ("linkparent" or "link")
		this.selectedClassTarget=objstr || "link"
	},

	getselectedClassTarget:function(tabref){ //Returns target element to assign "selected" CSS class to
		return (this.selectedClassTarget==("linkparent".toLowerCase()))? tabref.parentNode : tabref
	},

	expandtab:function(tabref){
		var subcontentid=tabref.getAttribute("rel") //Get id of subcontent to expand
		//Get "rev" attr as a string of IDs in the format ",john,george,trey,etc," to easily search through
		var associatedrevids=(tabref.getAttribute("rev"))? ","+tabref.getAttribute("rev").replace(/\s+/, "")+"," : ""
		this.expandsubcontent(subcontentid)
		this.expandrevcontent(associatedrevids)
		for (var i=0; i<this.tabs.length; i++){ //Loop through all tabs, and assign only the selected tab the CSS class "selected"
			this.getselectedClassTarget(this.tabs[i]).className=(this.tabs[i].getAttribute("rel")==subcontentid)? "selected" : ""
		}
		if (this.enabletabpersistence) //if persistence enabled, save selected tab position(int) relative to its peers
			tab_content.setCookie(this.tabinterfaceid, tabref.tabposition)
	},

	expandsubcontent:function(subcontentid){
		for (var i=0; i<this.subcontentids.length; i++){
			var subcontent=document.getElementById(this.subcontentids[i]) //cache current subcontent obj (in for loop)
			subcontent.style.display=(subcontent.id==subcontentid)? "block" : "none" //"show" or hide sub content based on matching id attr value
		}
	},


	expandrevcontent:function(associatedrevids){
		var allrevids=this.revcontentids
		for (var i=0; i<allrevids.length; i++){ //Loop through rev attributes for all tabs in this tab interface
			//if any values stored within associatedrevids matches one within allrevids, expand that DIV, otherwise, contract it
			document.getElementById(allrevids[i]).style.display=(associatedrevids.indexOf(","+allrevids[i]+",")!=-1)? "block" : "none"
		}
	},

	autorun:function(){ //function to auto cycle through and select tabs based on a set interval
		var currentTabIndex=this.automode_currentTabIndex //index within this.hottabspositions to begin
		var hottabspositions=this.hottabspositions //Array containing position numbers of "hot" tabs (those with a "rel" attr)
		this.expandtab(this.tabs[hottabspositions[currentTabIndex]])
		this.automode_currentTabIndex=(currentTabIndex<hottabspositions.length-1)? currentTabIndex+1 : 0 //increment currentTabIndex
	},

	cancelautorun:function(){
		if (typeof this.autoruntimer!="undefined")
			clearInterval(this.autoruntimer)
	},

	init:function(automodeperiod){
		var persistedtab=tab_content.getCookie(this.tabinterfaceid) //get position of persisted tab (applicable if persistence is enabled)
		var persisterror=true //Bool variable to check whether persisted tab position is valid (can become invalid if user has modified tab structure)
		this.automodeperiod=automodeperiod || 0
		for (var i=0; i<this.tabs.length; i++){
			this.tabs[i].tabposition=i //remember position of tab relative to its peers
			if (this.tabs[i].getAttribute("rel")){
				var tabinstance=this
				this.hottabspositions[this.hottabspositions.length]=i //store position of "hot" tab ("rel" attr defined) relative to its peers
				this.subcontentids[this.subcontentids.length]=this.tabs[i].getAttribute("rel") //store id of sub content ("rel" attr value)
				this.tabs[i].onclick=function(){
					tabinstance.expandtab(this)
					tabinstance.cancelautorun() //stop auto cycling of tabs (if running)
					return false
				}
				if (this.tabs[i].getAttribute("rev")){ //if "rev" attr defined, store each value within "rev" as an array element
					this.revcontentids=this.revcontentids.concat(this.tabs[i].getAttribute("rev").split(/\s*,\s*/))
				}
				if (this.enabletabpersistence && parseInt(persistedtab)==i || !this.enabletabpersistence && this.getselectedClassTarget(this.tabs[i]).className=="selected"){
					this.expandtab(this.tabs[i]) //expand current tab if it's the persisted tab, or if persist=off, carries the "selected" CSS class
					persisterror=false //Persisted tab (if applicable) was found, so set "persisterror" to false
					//If currently selected tab's index(i) is greater than 0, this means its not the 1st tab, so set the tab to begin in automode to 1st tab:
					this.automode_currentTabIndex=(i>0)? 0 : 1
				}
			}
		} //END for loop
		if (persisterror) //if an error has occured while trying to retrieve persisted tab (based on its position within its peers)
			this.expandtab(this.tabs[this.hottabspositions[0]]) //Just select first tab that contains a "rel" attr
		if (parseInt(this.automodeperiod)>500 && this.hottabspositions.length>1){
			this.automode_currentTabIndex=this.automode_currentTabIndex || 0
			this.autoruntimer=setInterval(function(){tabinstance.autorun()}, this.automodeperiod)
		}
	} //END int() function

}

function openPopup(theUrl,w,h) {
    var left = (screen.availWidth - w)/2;
    var top = (screen.availHeight - h)/2

    var args = "scrollbars,resizable" + ",width=" + w + ",height=" + h + ",top=" + top + ",left= " + left;

    var win = window.open(theUrl, "popup", args );

    /* If the window already existed, bring it to the front */
    if (win) { win.focus(); }
    return false;
}

/* function to toggle visibility */
function toggle( targetId, signId ) {
   if ( document.getElementById ) {
    target = document.getElementById( targetId );
	if (signId != '') {sign = document.getElementById( signId );}
    if ( target.style.display == "none" ) {
     target.style.display = "";
	 if (sign) {sign.src = sign.src.replace('plusSign','minusSign');}
    } else {
     target.style.display = "none";
	 if (sign) {sign.src = sign.src.replace('minusSign','plusSign');}
    }
   }
}

/* function to cycle left rail promo */
var imgs1 = new Array("http://images.medicinenet.com/images/ltnav-promo-adult-skin-problems.jpg",
					  "http://images.medicinenet.com/images/ltnav-promo-skin-conditions.jpg",
					  "http://images.medicinenet.com/images/ltnav-promo-ringworm.jpg",
					  "http://images.medicinenet.com/images/ltnav-promo-adhd-kids.jpg",
					  "http://images.medicinenet.com/images/ltnav-promo-chronic-fatigue.jpg");
					  
var lnks1 = new Array("http://www.medicinenet.com/skin-problems-pictures-slideshow/article.htm",
					  "http://www.medicinenet.com/script/main/art.asp?articlekey=107516",
					  "http://www.medicinenet.com/ringworm-pictures-slideshow/article.htm",
					  "http://www.medicinenet.com/adhd_children_pictures_slideshow/article.htm",
					  "http://www.medicinenet.com/chronic_fatigue_syndrome_pictures_slideshow/article.htm");
					  
var alt1 = new Array("Adult Skin Problems Slideshow",
					 "Skin Conditions Gallery",
					 "Ringworm Slideshow",
					 "ADHD in Children",
					 "Chronic Fatigue Syndrome");
var currentAd1 = 0;
var imgCt1 = 5;
var banner1 = document.getElementById('adBanner1');
var link1 = document.getElementById('ssBanner1'); 
function cycle1() {
if (currentAd1 == imgCt1) {
  currentAd1 = 0;
}
banner1 = document.getElementById('adBanner1');
link1 = document.getElementById('ssBanner1');     
banner1.src=imgs1[currentAd1]
banner1.alt=alt1[currentAd1]
document.getElementById('ssBanner1').href=lnks1[currentAd1]
currentAd1++;
}
function startCycle1() {
banner1 = document.getElementById('adBanner1');
if (banner1 != null) 
    window.setInterval("cycle1()",3500);
else
    window.setTimeout("startCycle1()", 2000);    
}
if (banner1 != null) 
startCycle1();
else
window.setTimeout("startCycle1()", 2000);
