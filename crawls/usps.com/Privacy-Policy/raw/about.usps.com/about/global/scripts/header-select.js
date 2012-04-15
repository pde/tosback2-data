dojo.addOnLoad(function(){
var pageUrlPath=createPageUrlPath();
var templateUrlPath=createTemplateUrlPath();
var iisUrlPath=createProductionUrlPath();
var folderToMatch=getTopNavLinkName(pageUrlPath,templateUrlPath,iisUrlPath);
dojo.query("#navigation-list > li").removeClass("current");
dojo.query("#navigation-list > li#nav-"+folderToMatch).addClass("current");

var selectedHeaderOverride=dojo.byId('selectedHeaderOverride');
if(selectedHeaderOverride){
if(selectedHeaderOverride.value!=''){
dojo.query("#navigation-list > li").removeClass("current");
dojo.query(dojo.query("#navigation-list > li")[selectedHeaderOverride.value]).addClass("current");
}

}

/*var listAnchors=dojo.query(".list-wrapper ul li a");
listAnchors.forEach(function(item){
dojo.connect(item,"onkeypress","listAnchorEventHandler");
});
var categoryAnchors=dojo.query("#navigation-list li h3 a");
categoryAnchors.forEach(function(item){
dojo.connect(item,"onkeypress","categoryAnchorEventHandler");
});
*/
if(dojo.byId("search-text")){
dojo.byId("search-text").onkeypress=function(event){
				if(!event){
					event=window.event;
					}
				return event.keyCode!=13;
			}

dojo.connect(dojo.byId("search-text"),"onkeyup",function(e){
				e.preventDefault();
				var searchText=dojo.query("#form-search-submit #search-text")[0].value;
				if(e.keyCode == dojo.keys.ENTER){
					if(isTrackingNumber(searchText)){
					window.top.location="https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1="+searchText;
					}else{
						if(dojo.byId("search-text").value==""||dojo.byId("search-text").value=="Search") {
						alert("Please enter a word or phrase to search for.");
						} else {
							window.top.location="/search.htm?q="+dojo.query("#form-search-submit #search-text")[0].value;
						}
					}
				}	
			});
dojo.connect(dojo.byId("search-btn"),"onclick",function(e){
				e.preventDefault();
				var searchText=dojo.query("#form-search-submit #search-text")[0].value;
				if(isTrackingNumber(searchText)){
				window.top.location="https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1="+searchText;
				}else{
					if(dojo.byId("search-text").value==""||dojo.byId("search-text").value=="Search") {
					alert("Please enter a word or phrase to search for.");
					} else {
						window.top.location="/search.htm?q="+searchText;
					}
				}
			});
}
});

function isTrackingNumber(searchText){
	var regex=new RegExp(/^\d{20}/);
	var result=regex.exec(searchText.split(' ').join(''));
	if(result){
	return true;
	}
	regex=new RegExp(/^[a-zA-Z]{2}\d{9}[a-zA-Z]{2}/);
	result=regex.exec(searchText.split(' ').join(''));
	if(result){
	return true;
	}	

	regex=new RegExp(/^[a-zA-Z]{2}\d{9}/);
	result=regex.exec(searchText.split(' ').join(''));
	if(result){
	return true;
	}

	regex=new RegExp(/^\d{10}/);
	result=regex.exec(searchText.split(' ').join(''));
	if(result){
	return true;
	}

	regex=new RegExp(/^\d{22}/);
	result=regex.exec(searchText.split(' ').join(''));
	if(result){
	return true;
	}

	regex=new RegExp(/^\d{30}/);
	result=regex.exec(searchText.split(' ').join(''));
	if(result){
	return true;
	}
return false;
}

function getTopNavLinkName(pageUrlPath,templateUrlPath,iisUrlPath){
if(pageUrlPath != undefined){
return pageUrlPath.split("/")[1];
}
if(templateUrlPath != undefined){
//there is no folder structure when previewing a template
return "";
}
if(iisUrlPath != undefined){
return iisUrlPath.split("/")[1];
}
}

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

function createProductionUrlPath(){
  	//If we found a vpath, return undefined for the IIS url path.
  	if(getUrlParameter('vpath') != "")
  	{
  	return undefined;
  	} 
  	return location.pathname;
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

function listAnchorEventHandler(elem){
	elem.preventDefault();
	var allCategories=dojo.query("#navigation-list li h3 a");
	var category=elem.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	category=dojo.query("h3 a",category)[0];
	var categoryIndex=dojo.indexOf(allCategories,category);

	//Left
	if(elem.keyCode==9 && elem.shiftKey){
		if(categoryIndex !=0){
			if((categoryIndex) !=0){
			setTimeout(function(){
			allCategories[(Number(categoryIndex)-1)].focus();
			},100);
			}
		}
	}
	//Right
	if(elem.keyCode==9 && !elem.shiftKey)
	{
		if(((Number(categoryIndex)+1)) !=allCategories.length){
			setTimeout(function(){
			allCategories[(Number(categoryIndex)+1)].focus();
			},100);
		}else{
			dojo.byId("link-logo").focus();
		}


	}
	//Up
	if(elem.keyCode==38)
	{
		var subCategories;
		var currentIndex=NaN;

		subCategories=dojo.query(dojo.query(elem.target.parentNode.parentNode)).query("li a").reverse();
		currentIndex=subCategories.indexOf(elem.target);
		if(currentIndex!=-1){
			if(currentIndex ==0){
			subCategories[subCategories.length-1].focus();
			}else{
			subCategories[currentIndex -1].focus();
			}
		}
	}

	//Down
	if(elem.keyCode==40)
	{
		var subCategories;
		var currentIndex=NaN;
		subCategories=dojo.query(dojo.query(elem.target.parentNode.parentNode)).query("li a").reverse();
		currentIndex=subCategories.indexOf(elem.target);
		if(currentIndex!=-1){
			if(currentIndex ==subCategories.length-1){
				subCategories[0].focus();
			}else{
				subCategories[currentIndex +1].focus();
			}
	}


}

}







function categoryAnchorEventHandler(elem){
	elem.preventDefault();
	//All Categories
	var allCategories=dojo.query("#navigation-list li h3 a");
	var index=dojo.indexOf(allCategories,elem.target);

	//Left
	if(elem.keyCode==9 && elem.shiftKey){
		if((index) !=0){
			setTimeout(function(){
			allCategories[(Number(index)-1)].focus();
			},100);
		}
	}
	if(elem.keyCode==9 && !elem.shiftKey)
	{
		//If we're at the end of the list, set focus on the first element.
		if(((Number(index)+1)) !=allCategories.length){
			setTimeout(function(){
			allCategories[(Number(index)+1)].focus();
			},100);
		}else{
		dojo.byId("link-logo").focus();
		}
	}
	//Up
	if(elem.keyCode==38)
	{
		var subCategories;
		subCategories=dojo.query(dojo.query(elem.target.parentNode.parentNode)).query(".list-wrapper ul li a").reverse();
		subCategories[subCategories.length-1].focus();
	}
	//Down
	if(elem.keyCode==40)
	{
		var subCategories;
		subCategories=dojo.query(dojo.query(elem.target.parentNode.parentNode)).query(".list-wrapper ul li a").reverse();
		subCategories[0].focus();
	}
}

