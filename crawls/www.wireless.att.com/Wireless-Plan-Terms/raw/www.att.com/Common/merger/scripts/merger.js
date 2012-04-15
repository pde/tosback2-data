// ****************************************************************************
// Right Content Area Drop Down Scripts [BEGIN]
// ****************************************************************************

fhDropDowns = new Array();
fhHover = function() {
    for (var x=0; x<fhDropDowns.length; x++) {
        var sfEls = document.getElementById(fhDropDowns[x]).getElementsByTagName("LI");
        for (var i=0; i<sfEls.length; i++) {
            sfEls[i].onmouseover=function() {
                this.className+=" fhhover";
            }
            sfEls[i].onmouseout=function() {
                this.className=this.className.replace(new RegExp(" fhhover\\b"), "");
            }
        }
    }
}
fhAddDropDown = function(divID) { fhDropDowns[fhDropDowns.length]=divID; }
if (window.attachEvent) window.attachEvent("onload", fhHover);

// Right Content Area Drop Down Scripts [END]
// ****************************************************************************



// ****************************************************************************
// Main Menu Drop Down Scripts [BEGIN]
// ****************************************************************************

var cssdropdown = {
disappeardelay: 250,    //set delay in miliseconds before menu disappears onmouseout
disablemenuclick: true, //when user clicks on a menu item with a drop down menu, disable menu item's link?
enableswipe: 1,         //enable swipe effect? 1 for yes, 0 for no


// FH:GRC - Added function for menu roll-over - requires [image names "*_over.*"] && [image id's "*_img"]
menuImgSwap:function(imgID,on){
obj=document.getElementById(imgID+'_img');
if (obj) {
slsh=obj.src.lastIndexOf("/");
dot=obj.src.lastIndexOf(".");
srcdir=obj.src.substr(0,slsh+1);
imgname=obj.src.substr(slsh+1,(dot-(slsh+1)));
imgext=obj.src.substr(dot);
if(imgname.lastIndexOf('_over')==-1&&on){ obj.src = srcdir+imgname+'_over'+imgext; }
else if(imgname.lastIndexOf('_over')>0&&!on) { 

if (imgID == 'drop1' | imgID == 'drop2' | imgID == 'drop3'){
obj.src = srcdir+(imgname.substr(0,imgname.length-5))+imgext; Currentstate(CimgID); }
else {obj.src = srcdir+(imgname.substr(0,imgname.length-5))+imgext;}

}
}
},



//No need to edit beyond here////////////////////////
dropmenuobj: null, ie: document.all, firefox: document.getElementById&&!document.all, swipetimer: undefined, bottomclip:0,getposOffset:function(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
},

swipeeffect:function(){
if (this.bottomclip<parseInt(this.dropmenuobj.offsetHeight)){
this.bottomclip+=10+(this.bottomclip/10) //unclip drop down menu visibility gradually
this.dropmenuobj.style.clip="rect(0 auto "+this.bottomclip+"px 0)"
}
else
return
this.swipetimer=setTimeout("cssdropdown.swipeeffect()", 10)
},

showhide:function(obj, e){
if (this.ie || this.firefox)
this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px"
if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover"){
if (this.enableswipe==1){
if (typeof this.swipetimer!="undefined")
clearTimeout(this.swipetimer)
obj.clip="rect(0 auto 0 0)" //hide menu via clipping
this.bottomclip=0
this.swipeeffect()
}
obj.visibility="visible"
}
else if (e.type=="click")
obj.visibility="hidden"
},

iecompattest:function(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : 

document.body
},

clearbrowseredge:function(obj, whichedge){
var edgeoffset=0
if (whichedge=="rightedge"){
var windowedge=this.ie && !window.opera? this.iecompattest().scrollLeft+this.iecompattest().clientWidth-15 

: window.pageXOffset+window.innerWidth-15
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth
if (windowedge-this.dropmenuobj.x < this.dropmenuobj.contentmeasure)  //move menu to the left?
edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
}
else{
var topedge=this.ie && !window.opera? this.iecompattest().scrollTop : window.pageYOffset
var windowedge=this.ie && !window.opera? this.iecompattest().scrollTop+this.iecompattest().clientHeight-15 

: window.pageYOffset+window.innerHeight-18
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight
if (windowedge-this.dropmenuobj.y < this.dropmenuobj.contentmeasure){ //move up?
edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight
if ((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure) //up no good either?
edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
}
}
return edgeoffset
},

dropit:function(obj, e, dropmenuID){

if (this.dropmenuobj!=null) {//hide previous menu
 
this.menuImgSwap(this.dropmenuobj.id,false);
this.dropmenuobj.style.visibility="hidden"; //hide menu

}
this.clearhidemenu();

this.menuImgSwap(dropmenuID,true);

if (this.ie||this.firefox){
obj.onmouseout=function(){cssdropdown.delayhidemenu();}
obj.onclick=function(){return !cssdropdown.disablemenuclick} //disable main menu item link onclick?
this.dropmenuobj=document.getElementById(dropmenuID)
this.dropmenuobj.onmouseover=function(){cssdropdown.clearhidemenu();}

//alert (dropmenuID);
if (dropmenuID == 'drop1' | dropmenuID == 'drop2' | dropmenuID == 'drop3'){
    this.dropmenuobj.onmouseout=function(){cssdropdown.dynamichide1(e);}
    this.dropmenuobj.onclick=function(){cssdropdown.delayhidemenu1()}
}
else {
    this.dropmenuobj.onmouseout=function(){cssdropdown.dynamichide(e);}
    this.dropmenuobj.onclick=function(){cssdropdown.delayhidemenu()}
}



this.showhide(this.dropmenuobj.style, e)
this.dropmenuobj.x=this.getposOffset(obj, "left")
this.dropmenuobj.y=this.getposOffset(obj, "top")
this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px"
this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, 

"bottomedge")+obj.offsetHeight+1+"px"
}
DivSetVisible(true, dropmenuID); ////fix for ie dropdown over select
},

contains_firefox:function(a, b) {
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
},

dynamichide:function(e){
var evtobj=window.event? window.event : e
if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
this.delayhidemenu()
else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& 

!this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
this.delayhidemenu()
},

delayhidemenu:function(){
this.delayhide=setTimeout("cssdropdown.dropmenuobj.style.visibility='hidden';cssdropdown.menuImgSwap(cssdropdown.dropmenuobj.id,false);",this.disappeardelay) //hide menu
},

/////////edit for stockdat drop down
dynamichide1:function(e){
var evtobj=window.event? window.event : e
if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
this.delayhidemenu1()
else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& 

!this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
this.delayhidemenu1()
},

delayhidemenu1:function(){
this.delayhide=setTimeout("cssdropdown.dropmenuobj.style.visibility='hidden';cssdropdown.menuImgSwap(cssdropdown.dropmenuobj.id,false); document.getElementById('DivShim1').style.display = 'none';",this.disappeardelay) //hide menu
},

///////////////////////edit done


clearhidemenu:function(){
if (this.delayhide!="undefined")
clearTimeout(this.delayhide)
},

startmainmenu:function(){
for (var ids=0; ids<arguments.length; ids++){
var menuitems=document.getElementById(arguments[ids]).getElementsByTagName("a")
for (var i=0; i<menuitems.length; i++){
if (menuitems[i].getAttribute("rel")){
var relvalue=menuitems[i].getAttribute("rel")
menuitems[i].onmouseover=function(e){

var event=typeof e!="undefined"? e : window.event
cssdropdown.dropit(this,event,this.getAttribute("rel"))
}
}
}
}
}
}
 
 function DivSetVisible(state, relvalue)
  {
   //var DivID = this.getAttribute("rel");
   
   if (relvalue == 'drop1' | relvalue == 'drop2' | relvalue == 'drop3'){
   
   //document.write (relvalue);
   var DivRef = document.getElementById(relvalue);
   var IfrRef = document.getElementById('DivShim1');
   if(state)
   { 
       //alert(DivRef.style.left);
       IfrRef.style.width = DivRef.offsetWidth;
    IfrRef.style.height = DivRef.offsetHeight;
    IfrRef.style.top = DivRef.style.top;
    IfrRef.style.left = DivRef.style.left;
    IfrRef.style.zIndex = DivRef.style.zIndex - 1;
    IfrRef.style.display = "block";
    DivRef.style.visibility ="visible";   
    DivRef.style.display = "block";

   }
   
   else
   {   
       IfrRef.style.display = "none";
    DivRef.style.display = "none";
 
   }
  }
  }

function page(num)
{
    switch(num) {
    case 1:
        location.href = "http://www.att.com/gen/landing-pages?pid=5718";
        break;
    case 2:
        location.href = "http://www.att.com/gen/landing-pages?pid=6080";
        break;
    case 3:
        location.href = "http://www.att.com/gen/landing-pages?pid=3309";
        break;
    case 4:
        location.href = "http://www.att.com/gen/landing-pages?pid=3309";
        break;
    case 6:
        location.href = "#";
        break;
    }

	
}


function fhrenderTopMenu() {

    document.write('<!-- BEGIN MAIN TOP MENU -->\n');
    document.write('<div class="dropdownstyle" id="dropdownmenu">\n');
    document.write('<a href="/gen/landing-pages?pid=5718" title="Investor Relations" rel="dropmenu1"><img src="/Common/merger/images/navbar_01.gif" onclick="page(1)" width="148" height="27" border="0" id="dropmenu1_img" alt="Investor Relations"></a><a href="/gen/landing-pages?pid=6080" rel="dropmenu2" title="Media Newsroom"><img src="/Common/merger/images/navbar_02.gif" onclick="page(2)" id="dropmenu2_img" width="130" height="27" border="0" alt="Media Newsroom"></a><a href="/gen/landing-pages?pid=3309" rel="dropmenu3" title="Industry Analyst Center"><img src="/Common/merger/images/navbar_03.gif" onclick="page(3)" id="dropmenu3_img" width="174" height="27" border="0" alt="Industry Analyst Center"></a><a href="/gen/landing-pages?pid=3309" rel="dropmenu4" title=""><img src="/Common/merger/images/navbar_04.gif" onclick="page(4)" id="dropmenu4_img" width="163" height="27" border="0" alt="Company Information"></a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<!--1st drop down menu -->\n');
    document.write('<div id="dropmenu1" class="dropmenudiv" style="width: 148px;">\n');
    document.write('<a href="/gen/investor-relations?pid=282" title="Quarterly Earnings">Quarterly Earnings</a>\n');
    document.write('<a href="/gen/investor-relations?pid=9186" title="Annual Report">Annual Report</a>\n');
    document.write('<a href="/gen/investor-relations?pid=5647" title="Events and Presentations">Events and Presentations</a>\n');
    document.write('<a href="/gen/investor-relations?pid=5609" title="Corporate Governance">Corporate Governance</a>\n');
    document.write('<a href="/gen/investor-relations?pid=9532" title="Investor News">Investor News</a>\n');
    document.write('<a href="/gen/investor-relations?pid=9533" title="Stockholder Services">Stockholder Services</a>\n');
    document.write('<a href="/gen/investor-relations?pid=5644" title="Investor Contacts">Investor Contacts</a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<!--2nd drop down menu -->\n');
    document.write('<div id="dropmenu2" class="dropmenudiv" style="width: 130px;">\n');
    document.write('<a href="/gen/landing-pages?pid=6080" title="Newsroom">Newsroom</a>\n');

    document.write('<a href="http://www.att.com/Common/about_us/news.html" title="Recent Releases">Recent Releases</a>\n');
    document.write('<a href="/gen/press-room?pid=9880" title="News Release Archives">News Release Archives</a>\n');
    document.write('<a href="/gen/press-room?pid=5834" title="Media Kits">Media Kits</a>\n');
    document.write('<a href="/gen/press-room?pid=6209" title="Multimedia Gallery">Multimedia Gallery</a>\n');
    document.write('<a href="/gen/press-room?pid=9201" title="Calendar of Events">Calendar of Events\n');
    document.write('<a href="/gen/investor-relations?pid=9534" title="Products and Services">Products and Services</a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<!--3rd drop down menu -->\n');
    document.write('<div id="dropmenu3" class="dropmenudiv" style="width: 174px;">\n');
    document.write('<a href="http://www.att.com/Common/about_us/news.html" title="Analyst News">Analyst News</a>\n');
    document.write('<a href="/gen/press-room?pid=9201" title="Calendar of Events">Calendar of Events</a>\n');
    document.write('<a href="/gen/press-room?pid=5036" title="Industry Analyst Contacts">Industry Analyst Contacts</a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<!--4th drop down menu -->\n');
    document.write('<div id="dropmenu4" class="dropmenudiv" style="width: 163px;">\n');
    document.write('<a href="/gen/investor-relations?pid=5711" title="Corporate Profile">Corporate Profile</a>\n');
    document.write('<a href="/gen/landing-pages?pid=7735" title="Citizenship and Sustainability">Citizenship and Sustainability</a>\n');
    document.write('<a href="/gen/landing-pages?pid=3309" title="Industry Analyst Center">Industry Analyst Center</a>\n');
    document.write('<a href="/gen/corporate-citizenship?pid=5882" title="Intellectual Property">Intellectual Property</a>\n');
    document.write('<a href="/gen/press-room?pid=1748" title="The New AT&amp;T Laboratories">The New AT&amp;T Laboratories</a>\n');
    document.write('<a href="/gen/general?pid=7512" title="Doing Business With AT&amp;T">Doing Business With AT&amp;T</a>\n');
    document.write('<a href="/gen/general?pid=5479" title="Business Customer News">Business Customer News</a>\n');
    document.write('<a href="http://www.att.jobs" title="Careers">Careers</a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<script type="text/javascript">\n');
    document.write('cssdropdown.startmainmenu("dropdownmenu")\n');
    document.write('</script>\n');
    document.write('<!-- END MAIN TOP MENU -->\n');

}


function fhrenderTopMenuAbsolute() {
    document.write('<!-- BEGIN MAIN TOP MENU -->\n');
    document.write('<div class="dropdownstyle" id="dropdownmenu">\n');
        document.write('<a href="http://www.att.com/gen/landing-pages?pid=5718" rel="dropmenu1" title="Investor Relations"><img src="http://www.att.com/Common/merger/images/navbar_01.gif" onclick="page(1)" width="148" height="27" border="0" id="dropmenu1_img" alt="Investor Relations"></a><a href="http://www.att.com/gen/landing-pages?pid=6080" rel="dropmenu2" title="Media Newsroom"><img src="http://www.att.com/Common/merger/images/navbar_02.gif" onclick="page(2)" id="dropmenu2_img" width="130" height="27" border="0" alt="Media Newsroom"></a><a href="http://www.att.com/gen/landing-pages?pid=3309" rel="dropmenu3" title="Industry Analyst Center"><img src="http://www.att.com/Common/merger/images/navbar_03.gif" onclick="page(3)" id="dropmenu3_img" width="177" height="27" border="0" alt="Industry Analyst Center"></a><a href="http://www.att.com/gen/landing-pages?pid=3309" rel="dropmenu4" title="Company Information"><img src="http://www.att.com/Common/merger/images/navbar_04.gif" onclick="page(4)" id="dropmenu4_img" width="163" height="27" border="0" alt="Company Information"></a>\n');
        document.write('</div>\n');
    document.write('<!--1st drop down menu -->\n');
    document.write('<div id="dropmenu1" class="dropmenudiv" style="width: 148px;">\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=282" title="Quarterly Earnings">Quarterly Earnings</a>\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=9186" title="Annual Report">Annual Report</a>\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=5647" title="Events and Presentations">Events and Presentations</a>\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=5609" title="Corporate Governance">Corporate Governance</a>\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=9532" title="Investor News">Investor News</a>\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=9533" title="Stockholder Services">Stockholder Services</a>\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=5644" title="Investor Contacts">Investor Contacts</a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<!--2nd drop down menu -->\n');
    document.write('<div id="dropmenu2" class="dropmenudiv" style="width: 130px;">\n');
    document.write('<a href="http://www.att.com/Common/about_us/news.html">Releases</a>\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=9534" title="Products and Services">Products and Services</a>\n');
    document.write('<a href="http://www.att.com/gen/press-room?pid=5834" title="Media Kits">Media Kits</a>\n');
    document.write('<a href="http://www.att.com/gen/press-room?pid=6209" title="Multimedia Gallery">Multimedia Gallery</a>\n');
    document.write('<a href="http://www.att.com/gen/press-room?pid=9201" title="Calendar of Events">Calendar of Events</a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<!--3rd drop down menu -->\n');
    document.write('<div id="dropmenu3" class="dropmenudiv" style="width: 174px;">\n');
    document.write('<a href="http://www.att.com/Common/about_us/news.html" title="Analyst News">Analyst News</a>\n');
    document.write('<a href="http://www.att.com/gen/press-room?pid=9201" title="Calendar of Events">Calendar of Events</a>\n');
    document.write('<a href="mailto:IndustryAnalystRelations@attnews.us" title="Request a Briefing">Request a Briefing</a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<!--4th drop down menu -->\n');
    document.write('<div id="dropmenu4" class="dropmenudiv" style="width: 163px;">\n');
    document.write('<a href="http://www.att.com/gen/investor-relations?pid=5711" title="Corporate Profile">Corporate Profile</a>\n');
    document.write('<a href="http://www.att.com/gen/landing-pages?pid=7735" title="Citizenship and Sustainability">Citizenship and Sustainability</a>\n');
    document.write('<a href="http://www.att.com/gen/corporate-citizenship?pid=7744" title="Strengthening Communities">Strengthening Communities</a>\n');
    document.write('<a href="http://www.att.com/gen/landing-pages?pid=3309" title="Industry Analyst Center">Industry Analyst Center</a>\n');
    document.write('<a href="http://www.att.com/gen/corporate-citizenship?pid=5882" title="Intellectual Property">Intellectual Property</a>\n');
    document.write('<a href="http://www.att.com/gen/press-room?pid=1748" title="The New AT&amp;T Laboratories">The New AT&amp;T Laboratories</a>\n');
    document.write('<a href="http://www.att.com/gen/general?pid=7512" title="Doing Business With AT&amp;T">Doing Business With AT&amp;T</a>\n');
    document.write('<a href="http://www.att.com/gen/general?pid=5479" title="Business Customer News">Business Customer News</a>\n');
    document.write('<a href="http://www.att.jobs" title="Careers">Careers</a>\n');
    document.write('</div>\n');
    document.write('\n');
    document.write('<script type="text/javascript">\n');
    document.write('cssdropdown.startmainmenu("dropdownmenu")\n');
    document.write('</script>\n');
    document.write('<!-- END MAIN TOP MENU -->\n');

}



// END TOP NAVIGATION


// Main Menu Drop Down Scripts [END]
// ****************************************************************************


//*****************************************************************************
// Corporate Profile Show/Hide Script
//*****************************************************************************

function cpSwitchMenu(obj, totalNum) {
var el;

for(j = 1; j <= totalNum; j++)
{
    el = document.getElementById('Box' + j);

    if(obj == j)
    {
        el.style.display = '';
    }
    else
    {
        el.style.display = 'none';
    }
}

}

function cpSwitchMenuArchive(obj, totalNum) {
var el;



for(j = 1; j <= totalNum; j++)
{
    el = document.getElementById('Box' + j);

    
    if(obj == j)
    {
        el.style.display = 'block';
         
    }
    else
    {
        el.style.display = 'none';
    }
}

}

function cpSwitchMenuSpecial(obj) {
var el;

    el = document.getElementById('Box' + obj);
    el2 = document.getElementById('Box13');

    if(el.style.display == 'none')
    {
        el.style.display = '';
        el2.style.display = 'none';
    }
    else
    {
        el.style.display = 'none';
    }

}


function cpShowAll(totalNum)
{
    for(i = 1; i <= totalNum; i++)
    {
        cplink = document.getElementById('cplink' + i);
        cplink.className = '';

        Box = document.getElementById('Box' + i);
        Box.style.display = '';

        cpShowAllvar = document.getElementById('cpShowAll-' + i);
        cpShowAllvar.style.display = 'none';
    }
}

function cpChange(id, newClass, totalNum) {

for(i = 1; i <= totalNum; i++)
{
    cplink = document.getElementById('cplink' + i);
    cplink.className = '';
}

identity=document.getElementById(id);
identity.className=newClass;

}


//*****************************************************************************
// Media Kit - Common Show/Hide Script
//*****************************************************************************

function ToggleContent()
{
    var elemContent = document.getElementById("viewContent");
    var elemLink = document.getElementById("viewLink");

    if (elemContent.style.display == "none") {
        elemContent.style.display = "";
        elemLink.innerHTML = "";
    }
    else {
        elemContent.style.display = "none";
        elemLink.innerHTML = "";
    }
}


//*************************************************************
//**** Pre-existing Function
//*************************************************************


function ToggleAnnouncements()
{
    var elemAllNews = document.getElementById("allAnnounce");
    var elemView = document.getElementById("viewToggle3");

    if (elemAllNews.style.display == "none") {
        elemAllNews.style.display = "";
        elemView.innerHTML = '<a href="#news" style="font-size: 12px!important;"><strong>Hide Additional Market Announcements</strong></a>';
    }
    else {
        elemAllNews.style.display = "none";
        elemView.innerHTML = '<a href="#news" style="font-size: 12px!important;"><strong>View Additional Market Announcements</strong></a>';
    }
}


function ToggleSpeakers()
{
    var elemAllNews = document.getElementById("speakers");
    var elemView = document.getElementById("viewSpeakers");

    if (elemAllNews.style.display == "none") {
        elemAllNews.style.display = "";
        elemView.innerHTML = '<a href="#news" style="font-size: 12px !important;"><strong>Hide Additional Speakers</strong></a>';
    }
    else {
        elemAllNews.style.display = "none";
        elemView.innerHTML = '<a href="#news" style="font-size: 12px !important;"><strong>View Additional Speakers</strong></a>';
    }
}


function ToggleMKNews()
{
    var elemAllNews = document.getElementById("MKNews");
    var elemView = document.getElementById("viewToggleMK");

    if (elemAllNews.style.display == "none") {
        elemAllNews.style.display = "";
        elemView.innerHTML = '<a href="#news" style="font-size: 12px !important;"><strong>Hide Additional News Releases</strong></a>';
    }
    else {
        elemAllNews.style.display = "none";
        elemView.innerHTML = '<a href="#news" style="font-size: 12px !important;"><strong>View Additional News Releases</strong></a>';
    }
}


function ToggleAllNews()
{
    var elemAllNews = document.getElementById("allNews");
    var elemView = document.getElementById("viewToggle");

    if (elemAllNews.style.display == "none") {
        elemAllNews.style.display = "";
        elemView.innerHTML = "<a href=&#34;#news&#34; STYLE=&#34;font-size: 12px;&#34;><strong>Hide Additional News Releases</strong></a>";
    }
    else {
        elemAllNews.style.display = "none";
        elemView.innerHTML = "<a href=&#34;#news&#34; STYLE=&#34;font-size: 12px;&#34;><strong>View Additional News Releases</strong></a>";
    }
}

function ToggleAllCaseStudies()
{
    var elemAllNews = document.getElementById("allCaseStudies");
    var elemView = document.getElementById("viewToggle2");

    if (elemAllNews.style.display == "none") {
        elemAllNews.style.display = "";
        elemView.innerHTML = "Hide additional case studies";
    }
    else {
        elemAllNews.style.display = "none";
        elemView.innerHTML = "View all case studies";
    }
}

function toggleCaseStudies(idView, idAllCases)
{
    var elemView = document.getElementById(idView);
    var elemAllCases = document.getElementById(idAllCases);

    if (elemAllCases.style.display == "none") {
        elemAllCases.style.display = "";
        elemView.innerHTML = "Hide additional case studies";
    }
    else {
        elemAllCases.style.display = "none";
        elemView.innerHTML = "View all case studies";
    }
}

function OrderCaseStudies()
{
    var alpha = document.getElementById("alphabetical");
    var chrono = document.getElementById("chronological");
    var order = document.getElementById("orderView");

    if (alpha.style.display == "none")
    {
        alpha.style.display = "block";
        chrono.style.display = "none";
        order.innerHTML = "View Case Studies by Date";
    }
    else
    {
        alpha.style.display = "none";
        chrono.style.display = "block";
        order.innerHTML = "View Case Studies by Name";
    }
}

function ToggleNews()
{
    var elemAllNews = document.getElementById('allNews');
    var elemView = document.getElementById('viewToggle');

    if (elemAllNews.style.display == 'none') {
        elemAllNews.style.display = '';
        elemView.innerHTML = '<UL class="icons"><LI class="icn-none"><a href="#news"><strong>Hide Additional News Releases</strong></a></li>';
    }
    else {
        elemAllNews.style.display = 'none';
        elemView.innerHTML = '<UL class="icons"><LI class="icn-none"><a href="#news"><strong>View Additional News Releases</strong></a></li>';
    }
}

function ToggleArticles()
{
    var elemAllNews = document.getElementById('allArticles');
    var elemView = document.getElementById('viewToggle3');

    if (elemAllNews.style.display == 'none') {
        elemAllNews.style.display = '';
        elemView.innerHTML = '<UL class="icons"><LI class="icn-none"><a href="#news"><strong>Hide Additional News Articles</strong></a></li>';
    }
    else {
        elemAllNews.style.display = 'none';
        elemView.innerHTML = '<UL class="icons"><LI class="icn-none"><a href="#news"><strong>View Additional News Articles</strong></a></li>';
    }
}



//****************************************************************************
//Right Menu Include - Investor Relations
//****************************************************************************

function renderRightMenu1()  {
   pageId = queryString('pid').toString();

var navHTML       = '<div class="nav-box">';
navHTML       += '<ul>';
navHTML       += '<li';
if(pageId == 5718 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/landing-pages?pid=5718" TITLE="Investor Relations Home" onClick="javascript:urchinTracker(\'/outgoing/ir_5718\');">Investor Relations Home</a></li>';
navHTML       += '<li';
if(pageId == 5711 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5711" TITLE="Corporate Profile" onClick="javascript:urchinTracker(\'/outgoing/ir_5711\');">Corporate Profile</a></li>';
navHTML       += '<li';
if(pageId == 9531 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=9531" title="Financials/Debt">Financials/Debt</a></li>';
navHTML       += '<li';
if(pageId == 5647 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5647" title="Events and Presentations">Events and Presentations</a></li>';
navHTML       += '<li';
if(pageId == 9532 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=9532" title="Investor News">Investor News</a></li>';
navHTML       += '<li';
if(pageId == 5691 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5691" title="Reports and SEC Filings">Reports and SEC Filings</a></li>';
navHTML       += '<li';
if(pageId == 9533 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=9533" title="Stockholder Services">Stockholder Services</a></li>';
navHTML       += '<li';
if(pageId == 5644 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5644" onClick="javascript:urchinTracker(\'/outgoing/ir_5644\');" title="Investor Contacts">Investor Contacts</a></li>';
navHTML       += '<li';
if(pageId == 5609 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5609" TITLE="Corporate Governance" onClick="javascript:urchinTracker(\'/outgoing/ir_5609\');">Corporate Governance</a></li>';
navHTML       += '<li';
if(pageId == 9534 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=9534" title="Key Products">Key Products</a></li>';
navHTML       += '<li><a href="http://phx.corporate-ir.net/phoenix.zhtml?c=113088&p=irol-alerts" onClick="javascript:urchinTracker(\'/outgoing/ir_Financial_Alerts\');" title="Subscribe to Financial E-mail Alerts">Subscribe to Financial E-mail Alerts</a></li>';
navHTML       += '</ul>';
navHTML       += '</div>';
navHTML       += '<div style="background: url(http://www.att.com/Common/merger/images/bkg-ad.gif) no-repeat bottom right;margin-top:10px;border:1px solid #ccc;width:208px;">';
navHTML       += '<p style="padding:0;margin:11px 13px; font-family:Verdana, Helvetica, sans-serif; font-size:1.4em; color:#008ec2; font-weight:bold;">AT&amp;T 2010 Annual Meeting of Stockholders</p>';
navHTML       += '<p style="padding:0;margin:0 13px;"><a href="http://www.attproxy.com">View</a> the 2010 Proxy Statement.</p>';
navHTML       += '<p style="padding:0;margin:0 13px;"><a href="http://www.att.com/gen/investor-relations?pid=17393">View</a> the 2009 Annual Report.</p>';
navHTML       += '<p style="padding:0;margin:0 13px 0 13px;"><a href="http://www.attproxy.com">View</a> Final Voting Results </p><BR /><BR />';
navHTML       += '</div>';
document.write(navHTML);
}



//****************************************************************************
//Right Menu Include - Investor Relations
//****************************************************************************

function renderRightMenu8()  {
   pageId = queryString('pid').toString();

var navHTML       = '<div class="nav-box">';
navHTML       += '<ul>';
navHTML       += '<li';
if(pageId == 5718 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/landing-pages?pid=5718" TITLE="Investor Relations Home" onClick="javascript:urchinTracker(\'/outgoing/ir_5718\');">Investor Relations Home</a></li>';
navHTML       += '<li';
if(pageId == 5711 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5711" TITLE="Corporate Profile" onClick="javascript:urchinTracker(\'/outgoing/ir_5711\');">Corporate Profile</a></li>';
navHTML       += '<li';
if(pageId == 9531 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=9531" title="Financials/Debt">Financials/Debt</a></li>';
//navHTML += '><a href="/gen/investor-relations?pid=9531" title="Financials">Financials</a></li>';
navHTML       += '<li';
if(pageId == 5647 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5647" title="Events and Presentations">Events and Presentations</a></li>';
navHTML       += '<li';
if(pageId == 9532 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=9532" title="Investor News">Investor News</a></li>';
navHTML       += '<li';
if(pageId == 5691 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5691" title="Reports and SEC Filings">Reports and SEC Filings</a></li>';
navHTML       += '<li';
if(pageId == 9533 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=9533" title="Stockholder Services">Stockholder Services</a></li>';
navHTML       += '<li';
if(pageId == 5644 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5644" onClick="javascript:urchinTracker(\'/outgoing/ir_5644\');" title="Investor Contacts">Investor Contacts</a></li>';
navHTML       += '<li';
if(pageId == 5609 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=5609" TITLE="Corporate Governance" onClick="javascript:urchinTracker(\'/outgoing/ir_5609\');">Corporate Governance</a></li>';
navHTML       += '<li';
if(pageId == 9534 ) { navHTML += ' class="current" ';}
navHTML += '><a href="/gen/investor-relations?pid=9534" title="Key Products">Key Products</a></li>';
navHTML       += '<li><a href="http://phx.corporate-ir.net/phoenix.zhtml?c=113088&p=irol-alerts" onClick="javascript:urchinTracker(\'/outgoing/ir_Financial_Alerts\');" title="Subscribe to Financial E-mail Alerts">Subscribe to Financial E-mail Alerts</a></li>';
navHTML       += '</ul>';
navHTML       += '</div>';
navHTML       += '<div style="background: url(http://www.att.com/Common/merger/images/bkg-ad.gif) no-repeat bottom right;margin-top:10px;border:1px solid #ccc;width:208px;">';
navHTML       += '<p style="padding:0;margin:11px 13px; font-family:Verdana, Helvetica, sans-serif; font-size:1.4em; color:#008ec2; font-weight:bold;">AT&amp;T 2010 Annual Meeting of Stockholders</p>';
navHTML       += '<p style="padding:0;margin:0 13px;"><a href="http://www.attproxy.com">View</a> the 2010 Proxy Statement.</p>';
navHTML       += '<p style="padding:0;margin:0 13px;"><a href="http://www.att.com/gen/investor-relations?pid=17393">View</a> the 2009 Annual Report.</p>';
navHTML       += '<p style="padding:0;margin:0 13px 0 13px;"><a href="http://www.attproxy.com">View</a> Final Voting Results </p><BR /><BR />';
navHTML       += '</div>';
document.write(navHTML);
}


function renderStockChartSm() {
var stockChartSm       = '<a href="http://phx.corporate-ir.net/phoenix.zhtml?c=113088&amp;p=irol-stockQuote" TITLE="Click for Price Quotes &amp; Charts" ONCLICK="javascript:urchinTracker(\'/outgoing/ir_stockQuote\');"><IMG SRC="http://quotes.corporate-ir.net/media_files/irol/11/113088/QI/t_qi_1.gif" ALT="Stock Information" TITLE="Click for Price Quotes &amp; Charts" WIDTH="210" HEIGHT="245" BORDER="0" CLASS="banner-sidebar"></a>';
document.write(stockChartSm);
}

function renderStockChartLg() {
var stockChartLg       = '<a href="http://phx.corporate-ir.net/phoenix.zhtml?c=113088&amp;p=irol-stockQuote" TITLE="Click for Price Quotes &amp; Charts" ONCLICK="javascript:urchinTracker(\'/outgoing/ir_stockQuote\');"><IMG SRC="http://quotes.corporate-ir.net/media_files/irol/11/113088/QI/t_qi_1.gif" ALT="Stock Information" TITLE="Click for Price Quotes &amp; Charts" WIDTH="210" HEIGHT="245" BORDER="0" CLASS="banner-sidebar"></a>';
document.write(stockChartLg);
}

//****************************************************************************
//Right Menu Include - Investor Relations (updated 5/1/2007)
//****************************************************************************

function renderRightMenu1abs() {
   pageId = queryString('pid').toString();

var navHTML       = '<div class="nav-box">';
navHTML       += '<ul>';
navHTML       += '<li';
if(pageId == 5718 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/landing-pages?pid=5718" TITLE="Investor Relations Home">Investor Relations Home</a></li>';
navHTML       += '<li';
if(pageId == 5711 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=5711" TITLE="Corporate Profile">Corporate Profile</a></li>';
navHTML       += '<li';
if(pageId == 9531 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=9531" title="Financials/Debt">Financials/Debt</a></li>';
navHTML       += '<li';
if(pageId == 5647 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=5647" title="Events and Presentations">Events and Presentations</a></li>';
navHTML       += '<li';
if(pageId == 9532 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=9532" title="Investor News">Investor News</a></li>';
navHTML       += '<li';
if(pageId == 5691 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=5691" title="Reports and SEC Filings">Reports and SEC Filings</a></li>';
navHTML       += '<li';
if(pageId == 9533 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=9533" title="Stockholder Services">Stockholder Services</a></li>';
navHTML       += '<li';
if(pageId == 5644 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=5644" title="Investor Contacts">Investor Contacts</a></li>';
navHTML       += '<li';
if(pageId == 5609 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=5609" TITLE="Corporate Governance" onClick="javascript:urchinTracker(\'/outgoing/ir_5609\');">Corporate Governance</a></li>';
navHTML       += '<li';
if(pageId == 9534 ) { navHTML += ' class="current" ';}
navHTML += '><a href="http://www.att.com/gen/investor-relations?pid=9534" title="Key Products">Key Products</a></li>';
navHTML       += '<li><a href="http://phx.corporate-ir.net/phoenix.zhtml?c=113088&p=irol-alerts" title="Subscribe to Financial E-mail Alerts">Subscribe to Financial E-mail Alerts</a></li>';
navHTML       += '</ul>';
navHTML       += '</div>';
navHTML       += '<div style="background: url(http://www.att.com/Common/merger/images/bkg-ad.gif) no-repeat bottom right;margin-top:10px;border:1px solid #ccc;width:208px;">';
navHTML       += '<p style="padding:0;margin:11px 13px; font-family:Verdana, Helvetica, sans-serif; font-size:1.4em; color:#008ec2; font-weight:bold;">AT&amp;T 2010 Annual Meeting of Stockholders</p>';
navHTML       += '<p style="padding:0;margin:0 13px;"><a href="http://www.attproxy.com">View</a> the 2010 Proxy Statement.</p>';
navHTML       += '<p style="padding:0;margin:0 13px;"><a href="http://www.att.com/gen/investor-relations?pid=17393">View</a> the 2009 Annual Report.</p>';
navHTML       += '<p style="padding:0;margin:0 13px 0 13px;"><a href="http://www.attproxy.com">View</a> Final Voting Results </p><BR /><BR />';
navHTML       += '</div>';
document.write(navHTML);
}



function ToggleAllNews()
{
    var elemAllNews = document.getElementById("allNews");
    var elemView = document.getElementById("viewToggle");

    if (elemAllNews.style.display == "none") {
        elemAllNews.style.display = "";
        elemView.innerHTML = "Hide additional news releases";
    }
    else {
        elemAllNews.style.display = "none";
        elemView.innerHTML = "View additional news releases";
    }
}

function ToggleAllNewsEdu()
{
    var elemAllNews = document.getElementById("allNewsEdu");
    var elemView = document.getElementById("viewToggleEdu");

    if (elemAllNews.style.display == "none") {
        elemAllNews.style.display = "";
        elemView.innerHTML = "Hide old Education news releases";
    }
    else {
        elemAllNews.style.display = "none";
        elemView.innerHTML = "View all Education news releases";
    }
}


//****************************************************************************
//Common Functions - Active Arrow Menu  [Kevin O'Reilly] 01-29-2007
//****************************************************************************

function PageQuery(q) {
   if(q.length > 1) this.q = q.substring(1, q.length);
   else this.q = null;
   this.keyValuePairs = new Array();
   if(q) {
      for(var i=0; i < this.q.split("&").length; i++) {
         this.keyValuePairs[i] = this.q.split("&")[i];
      }
   }
   this.getKeyValuePairs = function() { return this.keyValuePairs; }
   this.getValue = function(s) {
      for(var j=0; j < this.keyValuePairs.length; j++) {
         if(this.keyValuePairs[j].split("=")[0] == s)
         return this.keyValuePairs[j].split("=")[1];
      }
      return false;
   }



   this.getParameters = function() {
      var a = new Array(this.getLength());
      for(var j=0; j < this.keyValuePairs.length; j++) {
         a[j] = this.keyValuePairs[j].split("=")[0];
      }
      return a;
   }
   this.getLength = function() { return this.keyValuePairs.length; }
}

function queryString(key){
   var page = new PageQuery(window.location.search);
   return unescape(page.getValue(key));
}



function  show3GRegion(divID) {
    if (divID == "west3G") {
        document.getElementById('west3G').style.display = "block";
        document.getElementById('midwest3G').style.display = "none";
        document.getElementById('southwest3G').style.display = "none";
        document.getElementById('east3G').style.display = "none";
        document.getElementById('southeast3G').style.display = "none";
    }
    if (divID == "midwest3G") {
        document.getElementById('west3G').style.display = "none";
        document.getElementById('midwest3G').style.display = "block";
        document.getElementById('southwest3G').style.display = "none";
        document.getElementById('east3G').style.display = "none";
        document.getElementById('southeast3G').style.display = "none";
    }
    if (divID == "southwest3G") {
        document.getElementById('west3G').style.display = "none";
        document.getElementById('midwest3G').style.display = "none";
        document.getElementById('southwest3G').style.display = "block";
        document.getElementById('east3G').style.display = "none";
        document.getElementById('southeast3G').style.display = "none";
    }
    if (divID == "east3G") {
        document.getElementById('west3G').style.display = "none";
        document.getElementById('midwest3G').style.display = "none";
        document.getElementById('southwest3G').style.display = "none";
        document.getElementById('east3G').style.display = "block";
        document.getElementById('southeast3G').style.display = "none";
    }
    if (divID == "southeast3G") {
        document.getElementById('west3G').style.display = "none";
        document.getElementById('midwest3G').style.display = "none";
        document.getElementById('southwest3G').style.display = "none";
        document.getElementById('east3G').style.display = "none";
        document.getElementById('southeast3G').style.display = "block";
    }
    }

// ****************************************************************************
// Flash Embed Script [BEGIN]
// ****************************************************************************

/**
 * SWFObject v1.4.1: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * **SWFObject is the SWF embed script formerly known as FlashObject. The name was changed for
 *   legal reasons.
 */
if(typeof deconcept == "undefined") var deconcept = new Object();




if(typeof deconcept.util == "undefined") deconcept.util = new Object();
if(typeof deconcept.SWFObjectUtil == "undefined") deconcept.SWFObjectUtil = new Object();
deconcept.SWFObject = function(swf, id, w, h, ver, c, useExpressInstall, quality, xiRedirectUrl, redirectUrl, detectKey){
    if (!document.createElement || !document.getElementById) { return; }
    this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
    this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
    this.params = new Object();
    this.variables = new Object();
    this.attributes = new Array();
    if(swf) { this.setAttribute('swf', swf); }
    if(id) { this.setAttribute('id', id); }
    if(w) { this.setAttribute('width', w); }
    if(h) { this.setAttribute('height', h); }
    if(ver) { this.setAttribute('version', new deconcept.PlayerVersion(ver.toString().split("."))); }
    this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion(this.getAttribute('version'), useExpressInstall);
    if(c) { this.addParam('bgcolor', c); }
    var q = quality ? quality : 'high';
    this.addParam('quality', q);
    this.setAttribute('useExpressInstall', useExpressInstall);
    this.setAttribute('doExpressInstall', false);
    var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
    this.setAttribute('xiRedirectUrl', xir);
    this.setAttribute('redirectUrl', '');
    if(redirectUrl) { this.setAttribute('redirectUrl', redirectUrl); }
}
deconcept.SWFObject.prototype = {
    setAttribute: function(name, value){
        this.attributes[name] = value;
    },
    getAttribute: function(name){
        return this.attributes[name];
    },
    addParam: function(name, value){
        this.params[name] = value;
    },
    getParams: function(){
        return this.params;
    },
    addVariable: function(name, value){
        this.variables[name] = value;
    },
    getVariable: function(name){
        return this.variables[name];
    },
    getVariables: function(){
        return this.variables;
    },
    getVariablePairs: function(){
        var variablePairs = new Array();
        var key;
        var variables = this.getVariables();
        for(key in variables){
            variablePairs.push(key +"="+ variables[key]);
        }
        return variablePairs;
    },
    getSWFHTML: function() {
        var swfNode = "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
            if (this.getAttribute("doExpressInstall")) this.addVariable("MMplayerType", "PlugIn");
            swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'"';
            swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
            var params = this.getParams();
             for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
            var pairs = this.getVariablePairs().join("&");
             if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
            swfNode += '/>';
        } else { // PC IE
            if (this.getAttribute("doExpressInstall")) this.addVariable("MMplayerType", "ActiveX");
            swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'">';
            swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
            var params = this.getParams();
            for(var key in params) {
             swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
            }
            var pairs = this.getVariablePairs().join("&");
            if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
            swfNode += "</object>";
        }
        return swfNode;
    },
    write: function(elementId){
        if(this.getAttribute('useExpressInstall')) {
            // check to see if we need to do an express install
            var expressInstallReqVer = new deconcept.PlayerVersion([6,0,65]);
            if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
                this.setAttribute('doExpressInstall', true);
                this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
                document.title = document.title.slice(0, 47) + " - Flash Player Installation";
                this.addVariable("MMdoctitle", document.title);
            }
        }
        if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))){
            var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
            n.innerHTML = this.getSWFHTML();
            return true;
        }else{
            if(this.getAttribute('redirectUrl') != "") {
                document.location.replace(this.getAttribute('redirectUrl'));
            }
        }
        return false;
    }
}

/* ---- detection functions ---- */
deconcept.SWFObjectUtil.getPlayerVersion = function(reqVer, xiInstall){
    var PlayerVersion = new deconcept.PlayerVersion([0,0,0]);
    if(navigator.plugins && navigator.mimeTypes.length){
        var x = navigator.plugins["Shockwave Flash"];
        if(x && x.description) {
            PlayerVersion = new deconcept.PlayerVersion(x.description.replace(/([a-z]|[A-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
        }
    }else{
        try{
            var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            for (var i=3; axo!=null; i++) {
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
                PlayerVersion = new deconcept.PlayerVersion([i,0,0]);
            }
        }catch(e){}
        if (reqVer && PlayerVersion.major > reqVer.major) return PlayerVersion; // version is ok, skip minor detection
        // this only does the minor rev lookup if the user's major version
        // is not 6 or we are checking for a specific minor or revision number
        // see http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
        if (!reqVer || ((reqVer.minor != 0 || reqVer.rev != 0) && PlayerVersion.major == reqVer.major) || PlayerVersion.major != 6 || xiInstall) {
            try{
                PlayerVersion = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
            }catch(e){}
        }
    }
    return PlayerVersion;
}
deconcept.PlayerVersion = function(arrVersion){
    this.major = parseInt(arrVersion[0]) != null ? parseInt(arrVersion[0]) : 0;
    this.minor = parseInt(arrVersion[1]) || 0;
    this.rev = parseInt(arrVersion[2]) || 0;
}
deconcept.PlayerVersion.prototype.versionIsValid = function(fv){
    if(this.major < fv.major) return false;
    if(this.major > fv.major) return true;
    if(this.minor < fv.minor) return false;
    if(this.minor > fv.minor) return true;
    if(this.rev < fv.rev) return false;
    return true;
}
/* ---- get value of query string param ---- */
deconcept.util = {
    getRequestParameter: function(param){
        var q = document.location.search || document.location.hash;
        if(q){
            var startIndex = q.indexOf(param +"=");
            var endIndex = (q.indexOf("&", startIndex) > -1) ? q.indexOf("&", startIndex) : q.length;
            if (q.length > 1 && startIndex > -1) {
                return q.substring(q.indexOf("=", startIndex)+1, endIndex);
            }
        }
        return "";
    }
}
/* fix for video streaming bug */
deconcept.SWFObjectUtil.cleanupSWFs = function() {
    var objects = document.getElementsByTagName("OBJECT");
    for (var i=0; i < objects.length; i++) {
        for (var x in objects[i]) {
            if (typeof objects[i][x] == 'function') {
                objects[i][x] = null;
            }
        }
    }
}
if (typeof window.onunload == 'function') {
    var oldunload = window.onunload;
        window.onunload = function() {
        deconcept.SWFObjectUtil.cleanupSWFs();
        oldunload();
    }
} else {
    window.onunload = deconcept.SWFObjectUtil.cleanupSWFs;
}
/* add Array.push if needed (ie5) */
if (Array.prototype.push == null) { Array.prototype.push = function(item) { this[this.length] = item; 

return this.length; }}

/* add some aliases for ease of use/backwards compatibility */
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject; // for legacy support
var SWFObject = deconcept.SWFObject;

// Flash Embed Script [END]
// ****************************************************************************

function newWindow(url, w, h)
{
// Fudge factors for window decoration space.
 // In my tests these work well on all platforms & browsers.
w += 32;
h += 96;
 var win = window.open(url,
  'newWindow',
  'width=' + w + ', height=' + h + ', ' +
  'location=no, menubar=no, ' +
  'status=no, toolbar=no, scrollbars=no, resizable=no');
 win.resizeTo(w, h);
 win.focus();
}


// END MERGER.JS // JavaScript Document 

