dojo.addOnLoad(function(){

//If there is no side navigation, do not try to decorate anything
if(dojo.query("#sub-nav-sidebar").length >0)
{

var pageUrlPath=createPageUrlPath();
var templateUrlPath=createTemplateUrlPath();
var iisUrlPath=createIISUrlPath();

var pathToMatch=getPath(pageUrlPath,templateUrlPath,iisUrlPath);
var urlOverride=dojo.query("#global_sidenav_component input[name=urlOverride]")[0].value;

if(pathToMatch != '' && pathToMatch != undefined){
	if(iisUrlPath != undefined){
		if(dojo.query("#global_sidenav_component input[name=urlOverride]")[0].value != ""){
			var urlOverride=dojo.query("#global_sidenav_component input[name=urlOverride]")[0].value;
			decorateForIISServer(getPathWithoutLeadingSlash(urlOverride));
		}else{
			decorateForIISServer(pathToMatch);
		}
	}else{
		if(dojo.query("#global_sidenav_component input[name=urlOverride]")[0].value != ""){
			var urlOverride=dojo.query("#global_sidenav_component input[name=urlOverride]")[0].value;
			decorate(getFolderStructureFromPath(urlOverride));
			}else{
				decorate(pathToMatch);
				}
		}
	}
}
decorateLongSpecificCategories();
});


function getPathWithoutLeadingSlash(pathToMatch){
var parts=pathToMatch.split("/");
parts=parts.splice(1,(parts.length-1));
return parts.join("/");
}

function getFolderStructureFromPath(override){
	var parts=override.split("/");
	if(parts){
		if(parts[1]=='iw-preview'){
			parts=parts.splice(4,(parts.length-4));
			return parts.join("/");
		}else{
			return override;
		}
	}else{
		return "";
	}
}

function decorateLongSpecificCategories(){
dojo.query("#sub-nav-sidebar .content-wrapper .content .content-inner ul li a").forEach(function(obj){
if(testIfFirefox()){
	if(obj.textContent.length >=30)
	{
		var innerhtml="";
		var originalInnerHTML=obj.innerHTML;
		
		if(obj.textContent.length > new String(obj.textContent.replace(/(\r\n|\n|\r)/gm,"")).length){
		//We found a </br> tag.  add the class and continue.
		dojo.query(obj.parentNode).addClass("tall");
		
		}else{
			for(var a=0;a<obj.textContent.length;a++){
				innerhtml+='<span>'+obj.textContent[a]+'</span>';
			}
			obj.innerHTML=innerhtml;
			var width=0;
			dojo.forEach(dojo.query("span",obj),function(item,index){
				width+=item.offsetWidth;
				if(width >= 195){
				dojo.query(obj.parentNode).addClass("tall");
				}
			});
			obj.innerHTML=originalInnerHTML;
		}
	}
}
else{
	if(obj.innerText.length >=30)
	{
		var innerhtml="";
		var originalInnerHTML=obj.innerHTML;
		if(obj.innerText.length > obj.innerText.replace(/(\r\n|\n|\r)/gm,"").length){
		//We found a </br> tag.  add the class.
		dojo.query(obj.parentNode).addClass("tall");
		}else{
			for(var a=0;a<obj.innerText.length;a++){
				innerhtml+='<span>'+obj.innerText.charAt(a)+'</span>';
			}
			obj.innerHTML=innerhtml;
			var width=0;
			dojo.forEach(dojo.query("span",obj),function(item,index){
				width+=item.offsetWidth;
				if(width >= 195){
				dojo.query(obj.parentNode).addClass("tall");
				}
			});
			obj.innerHTML=originalInnerHTML;
		}
	}
}


});
}
/*
Decorate for teamsite preview modes.
*/
function decorate(path){
var parts=path.split("/");
var topCategory= dojo.query("#sub-nav-sidebar h2 a[href*="+path+"]");
if(topCategory.length >0){
	decorateCategoryLink(topCategory[0]);
	if(parts.length >2){
		//Try to locate the child link.
		var specificLink=dojo.query("#sub-nav-sidebar .content-wrapper .content .content-inner ul li a[href*="+path+"]");
		if(specificLink.length >0){
			//If a child was found, decorate it.
			decorateSpecificLink(specificLink[0]);
			}else{ 
			//Otherwise, decorate the top category the same as a childless link.
			decorateChildlessCategoryLink(topCategory[0]);
			}
	}else{
		decorateChildlessCategoryLink(topCategory[0]);
	}
}else{
var candidateChildLink =dojo.query("#sub-nav-sidebar .content-wrapper .content .content-inner ul li a[href*="+path+"]");
 if(candidateChildLink.length > 0){
decorateSpecificLink(candidateChildLink[0]);
}
}
}

function decorateForIISServer(path){
var parts=path.split("/");
var topCategory= dojo.query("#sub-nav-sidebar h2 a[href*="+path+"]");
if(topCategory.length >0){
	decorateCategoryLink(topCategory[0]);
	if(parts.length >2){
		//Try to locate the child link.
		var specificLink=dojo.query("#sub-nav-sidebar .content-wrapper .content .content-inner ul li a[href*="+path+"]");
		if(specificLink.length >0){
			//If a child was found, decorate it.
			decorateSpecificLink(specificLink[0]);
			}else{ 
			//Otherwise, decorate the top category the same as a childless link.
			decorateChildlessCategoryLink(topCategory[0]);
			}
	}else{
		decorateChildlessCategoryLink(topCategory[0]);
	}
}else{
var candidateChildLink =dojo.query("#sub-nav-sidebar .content-wrapper .content .content-inner ul li a[href*="+path+"]");
 if(candidateChildLink.length > 0){
decorateSpecificLink(candidateChildLink[0]);
}
}
}
function getTeamSitePageSpecificPath(pageUrlPath){
var beginningPath=dojo.query("#sub-nav-sidebar h2 a")[0].pathname;
beginningPath=beginningPath.split(pageUrlPath.split("/")[1])[0];
return beginningPath;
}

function getPath(pageUrlPath,templateUrlPath,iisUrlPath){
if(pageUrlPath != undefined){
return pageUrlPath;
}
if(templateUrlPath != undefined){
//there is no folder structure when previewing a template
return "";
}
if(iisUrlPath != undefined){
return iisUrlPath;

}
return "";
}
function getTopLevelFolderName(path){
return path.split("/")[1];
}

/*
Returns the teamsite page preview url.
*/
function createPageUrlPath(){
  	var urlVpathParameter=getUrlParameter('vpath');
  	var urlPath;
  	if(urlVpathParameter != "")
  		{
  		urlPath=urlVpathParameter.split("sites");
  		var newPath=urlPath[1];
		urlPath=urlPath[1];
  		}else{
  			urlPath= undefined;
  		}
  	return urlPath;
	
}
/*
Returns the teamsite template preview url.
*/
function createTemplateUrlPath(){
  	var urlVpathParameter=getUrlParameter('vpath');
  	var urlPath;
  	if(urlVpathParameter != "")
  		{
  		urlPath=urlVpathParameter.split("template");
  		var newPath=urlPath[1];
		urlPath=urlPath[1];
  		}else{
  			urlPath= undefined;
  		}
  	return urlPath;
	
}

/*
Returns the IIS Server url.
*/
function createIISUrlPath(){
  	//If we found a vpath, return undefined for the IIS url path.
  	if(getUrlParameter('vpath') != "")
  	{
  	return undefined;
  	} 
  	return location.pathname;
}

  function decorateCategoryLink(link){
  dojo.query(".left-panel-module h2").removeClass("open");
	
	link.parentNode.setAttribute("class", "open");
	link.parentNode.setAttribute("className", "open");
	link.setAttribute("class", "selected");
	link.setAttribute("className", "selected");
	
	//Hide all of the left nav groups
	var left_nav_groups=dojo.query(".left-panel-module .content-wrapper .content .content-inner ul");
	left_nav_groups.addClass("hide");
	left_nav_groups.query("li a").removeClass("hide");
	left_nav_groups.query("li a").removeClass("selected");
	
	//Hide the siblings of the group that is no longer selected and unhide the siblings of the newly-selected one.
	var siblings=new dojo.NodeList();
	//We are using IE7 or IE8
	if(getInternetExplorerVersion() != -1 && (getInternetExplorerVersion() != 9))
	{
	siblings.push(link.parentNode.nextSibling);
	}
	//We are using Firefox.
	if(testIfFirefox() || (getInternetExplorerVersion() >= 9))
	{
	siblings.push(link.parentNode.nextSibling.nextSibling);
	}
	var selectedSiblings=siblings.query(".content .content-inner ul");
	selectedSiblings.removeClass("hide");
	selectedSiblings.addClass("selected");
  }
  
  function decorateSpecificLink(link){

	//Deselect all top level headers.
  	dojo.query(".left-panel-module h2").removeClass("open");
  	dojo.query(".left-panel-module h2").removeClass("selected");
  
  	//Hide all of the left nav groups
	var left_nav_groups=dojo.query(".left-panel-module .content-wrapper .content .content-inner ul");
	left_nav_groups.addClass("hide");
	left_nav_groups.removeClass("selected");
	left_nav_groups.query("li a").removeClass("hide");
	left_nav_groups.query("li a").removeClass("selected");
	
	//Select our specific link.
	link.setAttribute("class", "selected");
	link.setAttribute("className", "selected");

	//Select the ul that our specified link is in. 
	var ul=link.parentNode.parentNode;
	ul.setAttribute("class","selected");
	ul.setAttribute("className","selected");

	//Find the div with class "content-wrapper" that is wrapping our link's category.
	var categoryLink=link.parentNode.parentNode.parentNode.parentNode.parentNode;
	
	//Hide the siblings of the group that is no longer selected and unhide the siblings of the newly-selected one.
	var siblings=new dojo.NodeList();
	//We are using IE7 or IE8
	if(getInternetExplorerVersion() != -1 && (getInternetExplorerVersion() != 9))
	{
	siblings.push(categoryLink.previousSibling);
	}
	
	//We are using Firefox.
	if(testIfFirefox() || (getInternetExplorerVersion() >= 9))
	{
	siblings.push(categoryLink.previousSibling.previousSibling);
	}

	siblings.addClass("open");
	siblings.query("a").addClass("selected");

  }
  
  function createUrlPathFromExisting(existingPath,topLevelFolderName){
		var urlPath=existingPath.split("/"+topLevelFolderName+"/");
  		return urlPath[1];
}

String.prototype.startsWith=function(str){
	return(this.indexOf(str)===0);
}

function decorateChildlessCategoryLink(link){
	link.parentNode.setAttribute("class", " open selected");
	link.parentNode.setAttribute("className", " open selected");
	link.setAttribute("class", "open selected");
	link.setAttribute("className", "open selected");
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

function testIfWebKit()
{
if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent))
{
return true;
}else{
return false;
}
}
function testIfFirefox()
{
if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
{
return true;
}else{
return false;
}
}
function testCategoryHasChildren(link){
	//Hide the siblings of the group that is no longer selected and unhide the siblings of the newly-selected one.
	var siblings=new dojo.NodeList();
	//We are using IE7 or IE8
	if(getInternetExplorerVersion() != -1 && getInternetExplorerVersion() != 9)
	{
	if(link.parentNode.nextSibling.className=="content-wrapper"){
	siblings.push(link.parentNode.nextSibling);
	}
	}
	//We are using Firefox.
	if(testIfFirefox() || (getInternetExplorerVersion() >= 9))
	{
	if(link.parentNode.nextSibling.nextSibling.className=="content-wrapper"){
	siblings.push(link.parentNode.nextSibling.nextSibling);
	}
	}
	if(siblings.length > 0)
	{
	return true;
	}else{
	return false;
	}
	
}
function getUrlParameter(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.top.location);
	if (results == null)
		return "";
	else
		return results[1];
}  