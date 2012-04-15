///////////////////////////////////////////
//author:  dominic green /////////////////
//version: 1.1 ///////////////////////////
//date   : 05/04/2011 ////////////////////
//////////////////////////////////////////
var samuiUrlDomain;
var tmgHomeUrl;
var paywallHomeUrl;
var toolbarCpcUrl;
var samuiUrlBase;
var toolbarSubscribeUrl;

//$.ajax({
 // url: 'https://auth.telegraph.co.uk/sam-ui/toolbar.json',
 // dataType: 'json',
 // async: false,
  //success: function(data) {
	//  samuiUrlDomain =  data["samuiUrlDomain"]; 
	//  tmgHomeUrl = data["tmgHomeUrl"];
	//  paywallHomeUrl = data["paywallHomeUrl"];
	//  toolbarCpcUrl = data["toolbarCpcUrl"];
	//  samuiUrlBase = data["samuiUrlBase"];
	//  toolbarSubscribeUrl = data["toolbarSubscribeUrl"];
	//}
//});
//generic speed of transitions
function gup(name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec (window.location.href);
	if (results == null)
		return "";
		else
		return results[1];	
}

var speed = 800;
var samMenuArray = new Array();
var samLoginMenu = new menu();
var samRegisterMenu = new menu();
var samSubscribeMenu = new menu();
var samSitesMenu = new menu();
var samSubInfoMenu = new menu();
var samCompleteMenu = new menu();
var samPageUser = new user();
var samMenuArray = new Array(samLoginMenu, samRegisterMenu, samSubscribeMenu, samSitesMenu, samSubInfoMenu, samCompleteMenu);
var samLoggedOutLogo = "logoU";
var samLoggedInLogo = "logoU";
var samLoggedOutMessage = "";
var samLoggedInMessage = "";
var samSubscribedMessage = "";
var samLinks = "";
var samCookie = getCookie("tmg_pid");
	
//which sam ui domain to point to v1.5
//var samDomain = ""+samuiUrlBase;
//var samAssets = ""+samuiUrlBase;
//var samHomeLink = ""+paywallHomeUrl;
//var samSubscribeLink = ""+toolbarSubscribeUrl;
//var cpcLink = ""+toolbarCpcUrl;
//var logOutLink = ""+samuiUrlBase+'/sam-ui/logoff.htm?redirectTo='+window.location;

var samDomain = 'https://auth.telegraph.co.uk';
var samAssets = 'http://s.telegraph.co.uk';
var samHomeLink = 'http://www.telegraph.co.uk';
var samSubscribeLink = 'http://www.telegraph.co.uk/subscriptions/';
var cpcLink = 'https://auth.telegraph.co.uk/customer-portal/myaccount/index';
var logOutLink = 'https://auth.telegraph.co.uk/sam-ui/logoff.htm?redirectTo='+window.location;
var tmgHomeUrl = 'http://www.telegraph.co.uk/';

$("#sitesButton").live('click', function(){
	window.location = ""+cpcLink;

});
$("#samLogOutButton").live('click', function(){
	window.location = ""+logOutLink;

});
$("#subscribeButton").live('click', function(){
	window.location = ""+samSubscribeLink;

});

$("body").prepend("<div id='tmgMenu-z1'></div>");


$('head').append('<link rel="stylesheet" href="'+samAssets+'/toolbar/css/tmgMenu.css" type="text/css" />');
//check if user cookie is set

$(document).ready(function() {

	if(typeof service == "undefined"){
		document.domain = "telegraph.co.uk";	
		}
	

if((gup("wall")==true)||(gup("wall")=="true")){  
	//loadWall();
	
	}
});

	


	
	if(samCookie!=null && samCookie!=""){
	samPageUser.setLoggedIn(true);
	$("#tmgMenu-z1").html("<div id='tmgMenuBar-z1'><div class='tmgMainMenu'></div></div><div class='drop' style='display: none;'>");
	}
	
	
	//set up login menu
		samLoginMenu.setMenuName("Log in"); 
		samLoginMenu.setMenuId("loginButton");
		samLoginMenu.setMenuClass("smlDrop");
		samLoginMenu.setContent("<div class='innerLogin'><iframe id='guestFrame1' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame1' width='960px' height='180px' frameborder='0' src='"+samDomain+"/sam-ui/login.htm?logintype=lite&plink="+plink+"' scrolling='no'></iframe></div>");
	
		//set up login menu
		samSubscribeMenu.setMenuName("Subscribe"); 
		samSubscribeMenu.setMenuId("subscribeButton");
		samSubscribeMenu.setMenuClass("hiddenDrop");
	
		
	//set up register menu		
		samRegisterMenu.setMenuName("Register"); 
		samRegisterMenu.setMenuId("registerButton");
		samRegisterMenu.setMenuClass("regDrop");
		samRegisterMenu.setContent("<div class='innerLogin'><iframe id='guestFrame1' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame2' width='960px' height='300px' overflow='hidden' frameborder='0' src='"+samDomain+"/sam-ui/registerLite.htm?logintype=lite&plink="+plink+"' scrolling='no'></iframe></div>");
	
	//set up congratulations menu		
		samCompleteMenu.setMenuName(""); 
		samCompleteMenu.setMenuId("completeButton");
		samCompleteMenu.setMenuClass("smlDrop");
		samCompleteMenu.setContent("<div class='innerLogin'><iframe id='guestFrame1' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame2' width='960px' height='170px' frameborder='0' src='"+samDomain+"/sam-ui/registerComplete.htm?logintype=lite&plink="+plink+"' scrolling='no'></iframe></div>");
	
	//set up sites menu
		samSitesMenu.setMenuName("Telegraph sites");
		samSitesMenu.setMenuId("sitesButton");
		samSitesMenu.setMenuClass("hiddenDrop");
		if(samPageUser.getLoggedIn() == false){
			samSitesMenu.setContent("");
		}else{
			var samUserfirstName = "";
			var samUserLastName = "";
			samSitesMenu.setContent("");
	
		}
	
	//set up sub info menu
		samSubInfoMenu.setMenuName("SubInfo"); 
		samSubInfoMenu.setMenuId("subinfocapture");
		samSubInfoMenu.setMenuClass("smlDrop");
		samSubInfoMenu.setContent("<div class='innerLogin'><iframe id='guestFrame1' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame1' width='960px' height='200px' frameborder='0' src='"+samDomain+"/sam-ui/subinfocapture.htm?logintype=lite&plink="+plink+"' scrolling='no'></iframe></div>");
	
		
		samReloadMenu();
		
	//logout button event handler
		$("#logOutButton").live('click', function(){
			samPageUser.setLoggedIn(false);
			window.location = ""+samDomain+"/sam-ui/logoff.htm?redirectTo="+document.location.href;
			samReloadMenu();
		});	
		
		
		
		//Generic menu button handler to control open and closing of menu's
		$(".menuButton").live('click', function() {
			//set up our generic menu depending on id
				samClickMenu($(this).attr("id"));
			});
		
		//Generic menu button handler to control registrations in messages
		$(".regButton").live('click', function() {
			//set up our generic menu depending on id
				samClickMenu("registerButton");
			});
		
		//Generic menu button handler to control registrations in messages
		$(".subButton").live('click', function() {
			//set up our generic menu depending on id
				samClickMenu("subscribeButton");
			});
			
		
		
		

		

function samClickMenu(menuId){
	var thisMenu = new menu();
				
				if(samCheckMenus() == false){					
					samLockMenus();
					for (var i = 0; i < samMenuArray.length; i++) {  
						if(menuId == samMenuArray[i].getMenuId()){
							$(".dLine").removeClass("dLineOn");
							$(".dLineL").removeClass("dLineOnL");
							$("#"+menuId).parent().find(".dLine").addClass("dLineOn");
							$("#"+menuId).parent().find(".dLineL").addClass("dLineOnL");
							$("#"+menuId).addClass("upArrow");
							samMenuWipe(samMenuArray[i].getMenuName());
							thisMenu = samMenuArray[i];
						}
					}
					if(thisMenu.getExpanded() == false){
						thisMenu.toggleMenu();
						//Turn me off here to stop the double menu up
						//$(".drop").slideUp(speed, function(){
						$(".drop").html(thisMenu.getContent());
						$(".drop").removeClass("regDrop smlDrop medDrop");
						
						$(".drop").addClass(thisMenu.getMenuClass());
						$(".drop").slideDown(speed, function(){samUnlockMenus();});
						
						//});
						
						}
					else{
						thisMenu.toggleMenu();
						$(".drop").slideUp(speed, function() { 	
								$(".drop").hide(); 
								samUnlockMenus(); 
								$("#"+thisMenu.getMenuId()+"").removeClass("upArrow");
								$(".dLine").removeClass("dLineOn");
								$(".dLineL").removeClass("dLineOnL");
								samMenuWipe(thisMenu.getMenuName());
			 					});
					}}
	
	
}
//*********Function to remake the menu***********/
function samReloadMenu(){
		
	if((samPageUser.getLoggedIn() == true)||(samPageUser.getLoggedIn() == "true")){
		var subStatus =  getCookieValue("tmg_p13n","subscriber");
		var subButton =  getCookieValue("tmg_p13n","subButton");
		if(subStatus=="true"){
			samLoggedInLogo = "logoS";	
		}
		if((getCookieValue("tmg_p13n","firstName")=="")&&(getCookieValue("tmg_p13n","lastName")=="")){
			var samUserName = getCookieValue("tmg_p13n","username");
			}else{
				var samUserName = getCookieValue("tmg_p13n","firstName")+" "+getCookieValue("tmg_p13n","lastName");
			}
		
		samSitesMenu.setContent("");
		
		if((samPageUser.getWall() == true)&&(samPageUser.getLoggedIn()!=true)){
			
			}else{
				if(subButton=="true"){
					var samSubMessage = samSubscribedMessage;
				}else{
					var samSubMessage = "<span class='menuButton logedInsubscribe' id='subscribeButton'>Subscribe<span class='dLine'></span></span></span>"+samLoggedInMessage;
				}
				$(".tmgMainMenu").html("<span class='menuButtonCon'><a href='"+tmgHomeUrl+"' title='The Telegraph Home'><img src='"+samAssets+"/toolbar/images/"+samLoggedInLogo+".png' name='"+samLoggedInLogo+"' alt='"+samLoggedInLogo+"' class='tmgMainMenuLogo'/></a><span class='menuButton downArrow noArrow userName' id='"+samSitesMenu.getMenuId()+"'>"+samUserName+"</span></span>"+samSubMessage+"<span class='menuButton downArrow noArrow' id='samLogOutButton'>Log out</span></span></div>");		
			}
		}else{
			if((samPageUser.getWall() == true)&&(samPageUser.getLoggedIn()!=true)){
				loadWall();
				}else{
					$("#tmgMenu-z1").html("<div id='tmgMenuBar-z1'><div class='tmgMainMenu'><span class='menuButtonCon'><a href='"+tmgHomeUrl+"' title='The Telegraph Home'><img src='"+samAssets+"/toolbar/images/"+samLoggedOutLogo+".png' name='"+samLoggedOutLogo+"' alt='"+samLoggedOutLogo+"' class='tmgMainMenuLogo'/></a></span><span class='menuButton downArrow noArrow' id='"+samSubscribeMenu.getMenuId()+"'>"+samSubscribeMenu.getMenuName()+"<span class='dLine'></span></span><span class='menuButtonCon'><span class='menuButton downArrow' id='"+samRegisterMenu.getMenuId()+"'>"+samRegisterMenu.getMenuName()+"<span class='dLine'></span></span><span class='menuButtonCon'><span class='menuButton downArrow' id='"+samLoginMenu.getMenuId()+"'>"+samLoginMenu.getMenuName()+"</span></span><span class='menuButtonCon'></span>"+samLoggedOutMessage+"</div></div></div><div class='drop' style='display: none;'>");
				}	
			}
}
	
//*******Set a menu back to default state function *********/
function samMenuWipe(menuName){
	for (var i = 0; i < samMenuArray.length; i++) {
		if(menuName != samMenuArray[i].getMenuName()){
			samMenuArray[i].setExpanded(false);
			samMenuArray[i].setLocked(false);
			$("#"+samMenuArray[i].getMenuId()+"").removeClass("upArrow");
			//$("#"+samMenuArray[i].getMenuId()+"").parent().find(".dLine").removeClass("dLineOn");
			$("#"+samMenuArray[i].getMenuId()+"").addClass("downArrow");
		}	
	}	
}
//*******Lock all menus******************/
function samLockMenus(){
	for (var i = 0; i < samMenuArray.length; i++) {
		samMenuArray[i].setLocked(true);
	}
}
//*****Unlock all menus*****************/
function samUnlockMenus(){
	for (var i = 0; i < samMenuArray.length; i++) {
		samMenuArray[i].setLocked(false);
	}
}
//*****check if menus are locked*****************/
function samCheckMenus(){
	var stat = false;
	for (var i = 0; i < samMenuArray.length; i++) {
		if(samMenuArray[i].getLocked() == true){
			stat = true;
		}
	}
	return stat;
}


function samSlideUp(){
	$(".drop").slideUp(speed, function(){samReloadMenu();});
	
}

function samRefresh(){	
		samPageUser.setLoggedIn(true);
		samReloadMenu();		
}
function samReloadPage(){
	location.reload(true);	
}
function samFinishPage(){
	var domain = window.location.href;
	if (domain.indexOf("?")!=-1){
		window.location = domain+"&regComplete=true";
	}else{
		window.location = domain+"?regComplete=true";
	}
}
function linkAccount(){
	var linkaddress = samuiUrlBase;
	window.location = ""+linkaddress+"/sam-ui/setupcaptureFromLink.htm?logintype=tmgsubscriber";
}


//*********menu object*************//


function menu()
{	this.menuName = "";
	this.menuId = "";
	this.menuClass = "";
	this.expanded=false;
	this.locked = false;
	this.content = "";


		function getMenuName(){
			return this.menuName;	
		}
		this.getMenuName = getMenuName;
		
		function setMenuName(menuName){
			this.menuName = menuName;	
		}
		this.setMenuName = setMenuName;
			
		function getMenuId(){
			return this.menuId;
		}
		this.getMenuId = getMenuId;
		
		function setMenuId(menuId){
			this.menuId = menuId;
		}
		this.setMenuId = setMenuId;
		
		
		function getMenuClass(){
			return this.menuClass;
		}
		this.getMenuClass = getMenuClass;
		
		function setMenuClass(menuClass){
			this.menuClass = menuClass;
		}
		this.setMenuClass = setMenuClass;
		
		function getExpanded(){
			return this.expanded;
		}
		this.getExpanded = getExpanded;
	
		function setExpanded(expanded){
			this.expanded = expanded;
		}
		this.setExpanded = setExpanded;
		
		function getLocked(){
			return this.locked;
		}
		this.getLocked = getLocked;
		
		function setLocked(locked){
			this.locked = locked;
		}
		this. setLocked = setLocked;
		
		function getContent(){
			return this.content;
		}
		this.getContent = getContent;
		
		function setContent(content){
			this.content = content;
		}
		this.setContent = setContent;
		
	
		
		function toggleMenu(){
			if(this.expanded == false){
				this.expanded = true;}
			else{
				this.expanded = false;
			}
		}
		this.toggleMenu = toggleMenu;
		
		function toggleBox(){
			if(this.box == 1){
				this.box = 2;}
			else{
				this.box = 1;}
		}
		this.toggleBox = toggleBox;
		
}

//*********user object*************//

function user()
{
	this.loggedIn = false;
	this.subscriber = false;
	this.clicks = 10;
	this.wall = false;
	
		function getLoggedIn(){
			return this.loggedIn;
		}
		this.getLoggedIn = getLoggedIn;
		
		
		function setLoggedIn(loggedIn){
			this.loggedIn = loggedIn;
			}
		this.setLoggedIn = setLoggedIn;	
		
		function getSubscriber(){
			return this.subscriber;	
		}
		this.getSubscriber = getSubscriber;
		
		function setSubscriber(subscriber){
			this.subscriber = subscriber;	
		}
		this.setSubscriber = setSubscriber;
		
		function getClicks(){
			return clicks;
			}
		this.getClicks = getClicks;
		
		function setClicks(clicks){
			this.clicks = clicks;
			}
		this.setClicks = setClicks;
		
		function getWall(){
			return this.wall;
		}
		this.getWall = getWall;
		
		function setWall(wall){
			this.wall = wall;
		}
		this.setWall = setWall;
}






//function to get cookies
function getCookie(c_name)
	{
		var y= "";
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
			{
			  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			  x=x.replace(/^\s+|\s+$/g,"");
			  if (x==c_name)
			    {
			    return unescape(y);
			    }
			}
	}

//function to strip out variables from a cookie
function getCookieValue(c_name, c_var)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
		{
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==c_name)
		    {
			  var name = c_var;
			  var regexS = name+":'([^'#]*)'";
			  var regex = new RegExp( regexS );
			  var results = regex.exec (y);
		    return unescape(results[1]);
		    }
		}
}
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()+"; path=/;");
document.cookie=c_name + "=" + c_value;
}

function loadWall(){
	samPageUser.setWall(true);
	
	setCookie("count","1",365);
	$(".tmgMainMenu").html("<span class='menuButtonCon'><span class='menuButton floatLeft' ><span class='dLineL'></span><img src='"+samAssets+"/toolbar/images/"+samLoggedOutLogo+".png' name='"+samLoggedOutLogo+"' alt='"+samLoggedOutLogo+"' class='tmgMainMenuLogo'/></div>");	
	$('#wallRegbutton').live('click', function() {
		$('.wallRegister').html(samwWallRegister2);
	});
	var samWallRegister1 = "<h3>Register for free unlimited website access</h3><p class='wallRegisterTitle'>It&#39;s quick and easy to access more<br/>than 10 articles a day.</p><span class='wallReglink'>Find out more</span><span id='wallRegbutton' class='xLrgButton'>Continue</span>";
	var samwWallRegister2 = "<iframe id='guestFrame1' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame2' width='440px' height='370px' frameborder='0' src='"+samDomain+"/sam-ui/registerLite.htm?logintype=lite&wall=true&plink="+plink+"' scrolling='no'></iframe>";
	var samWallLogin = "<iframe id='guestFrame1' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame1' width='960px' height='115px' frameborder='0' src='"+samDomain+"/sam-ui/login.htm?logintype=lite&wall=true&plink="+plink+"' scrolling='no' class='mN10'>";
	$("#tmgMenu-z1").before("<div id='wall-z1' style='display: none;'></div>");
	if($('.ssImg').find('img').attr('src') !=null){
		var samImage = "<img src='"+$('.ssImg').find('img').attr('src')+"' width='280px' height='175px'/>";
	}else{
		var samImage = "";
	}
	var samArticle = "";
	var samArticle = $('.storyHead').find('h2').html();
	var samArticle = samCharLimit(samArticle, 200);
	var samArticleTitle = "";
	var samArticleTitle = $('.storyHead').find('h1').html();
	var samArticleTitle = samCharLimit(samArticleTitle, 140);
	
	$("#tmgMenu-z1").append("<div id='wallBlock' style='display: none;'></div><div id='wallSlides' style='display: none;'><div class='innerWallSlide'><div class='floatLeft w480'><div class='wallPreview'><h2>"+samArticleTitle+"</h2><span class='wallArticleImage'>"+samImage+"</span><p class='wallPreviewArticle'>"+samArticle+"</p><p class='wallPreviewDate'>"+$('.publishedDate').html()+"</p></div><a id='samBackLink' href='javascript: history.go(-1);'  class='wallBack' title='back to last page'>Back</a><a href='"+samHomeLink+"' title='Back to Telegraph.co.uk' class='wallHome'>Home</a></div><div class='floatRight w480'><div class='wallRegister'>"+samWallRegister1+"</div></div>"+samWallLogin+"</div></div>");
	$("#wall-z1").height($("body").height()+100);
	$("#wall-z1").fadeIn(speed, function(){$("#wallSlides").slideDown(speed);$("#wallBlock").slideDown(speed);});
	

}
function samGoBack(){
history.go(-1);}

function samCharLimit(word, limit){
	if(word.length < limit){
		return word;
	}else{
	word = word.substring(0,limit);
		
		var i = limit-1;
		while(i != 0){
			if(word.charAt(i) != " "){
				i --;
			}else{
				word = word.slice(0, i);
				return word+ "....";
			}
		}
		return word;
	}
}

