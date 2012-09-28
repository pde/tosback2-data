/***** getElementsByClassName funtion *****/

function getElementsByClassName(classname,tag){
	if(!tag) tag = "*";
	var anchs =  document.getElementsByTagName(tag);
	var total_anchs = anchs.length;
	var regexp = new RegExp('\\b' + classname + '\\b');
	var class_items = new Array()

	for(var i=0;i<total_anchs;i++) { //Go thru all the links seaching for the class name
		var this_item = anchs[i];
		if(regexp.test(this_item.className)) {
			class_items.push(this_item);
		}
	}
return class_items;
}

/*
 
Correctly handle PNG transparency in Win IE 5.5 & 6.
http://homepage.ntlworld.com/bobosola. Updated 18-Jan-2006.

*/

var arVersion = navigator.appVersion.split("MSIE")
var version = parseFloat(arVersion[1])

if ((version >= 5.5) && (version < 7) && (document.body.filters)) 
{
   for(var i=0; i<document.images.length; i++)
   {
      var img = document.images[i];
      var imgName = img.src.toUpperCase();
      if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
      {
		 var imgID = (img.id) ? "id='" + img.id + "' " : ""
         var imgClass = (img.className) ? "class='" + img.className + "' " : ""
         var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
         var imgStyle = "display:inline-block;" + img.style.cssText 
         if (img.align == "left") imgStyle = "float:left;" + imgStyle
         if (img.align == "right") imgStyle = "float:right;" + imgStyle
         if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
         var strNewHTML = "<span " + imgID + imgClass + imgTitle
         + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
         + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
         + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>" 
         img.outerHTML = strNewHTML
         i = i-1
      }
   }
}

/***** Display diretory correctly *****/

function directoryDisplay(){
	var mainHeight = document.getElementById('article_info').offsetHeight;
	var rightHeight = document.getElementById('article_rightcolumn').offsetHeight + 93; // 93 - height of the sponsor section
	var totArticlesRows = 5; // total possible directory article rows
	
	if(document.getElementById('directory')) {
		for(i=0;i<totArticlesRows;i++){
			if(rightHeight<mainHeight){
				document.getElementById('directory').getElementsByTagName('tr')[i].style.display = "block";
				rightHeight = document.getElementById('article_rightcolumn').offsetHeight + 93;
				if(rightHeight>mainHeight){
					if(i==0){
						document.getElementById('directory').style.display = "none";
					   break;	
					}else{
						document.getElementById('directory').getElementsByTagName('tr')[i].style.display = "none";
						break;
					}
				}
				document.getElementById('directory_hdr').style.display = "block";
			}else{
				document.getElementById('directory').style.display = "none";
				break;	
			}
		}
	}
}

/***** Clear default value in forms function *****/

function clearDefault(el) {
  if (el.defaultValue==el.value) el.value = ""
}

/***** Viral drop down handler *****/

function showViralDrop(num){
	getElementsByClassName('viral_dd','div')[num].style.display = "block";	
}

function hideViralDrop(num){
	getElementsByClassName('viral_dd','div')[num].style.display = "none";
}

/***** Render keywords *****/

function displayKeywords(){
	if(document.getElementById('keyword_container')) {
		var keywordString = document.getElementById('keyword_container').innerHTML;
		var keywords = keywordString.split(',');
		var renderString = "<ul>";
		var keyLength = keywords.length;
		if(keyLength>5){
			keyLength = 5;
		}
		for(i=0;i<keyLength;i++){
			renderString += "<li>";
			renderString += '<a href="/search/fast_search?search_term=' + keywords[i] + '&x=0&y=0&srchtyp=system">';
			renderString += keywords[i];
			renderString += "</a></li>";		
		}
		renderString += "</ul>";	
		document.getElementById('keyword_container').innerHTML = renderString;
		document.getElementById('keyword_container').style.display = "block";
	}
}

function emailPop(url) {
	newwindow=window.open(url,'name','height=401,width=429');
	if (window.focus) {newwindow.focus()}
	return false;
}