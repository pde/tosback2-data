if(document.URL.indexOf("www") == 0) {
	window.location = "//www."+document.URL.substring(document.URL.indexOf("//") + 2);
}
var isNN = (navigator.appName.indexOf("Netscape")!=-1);
function autoTab(input,len, e) {
			var keyCode = (isNN) ? e.which : e.keyCode;
			var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
			if(input.value.length >= len && !containsElement(filter,keyCode)) {
			input.value = input.value.slice(0, len);
			input.form[(getIndex(input)+1) % input.form.length].focus();
		}
		function containsElement(arr, ele) {
			var found = false, index = 0;
			while(!found && index < arr.length)
			if(arr[index] == ele)
			found = true;
			else
			index++;
			return found;
		}
		function getIndex(input) {
			var index = -1, i = 0, found = false;
			while (i < input.form.length && index == -1)
			if (input.form[i] == input)index = i;
			else i++;
			return index;
		}
		return true;
	}//end autoTab


	function trim(inputString) {
   // Removes leading and trailing spaces from the passed string. Also removes
   // consecutive spaces and replaces it with one space. If something besides
   // a string is passed in (null, custom object, etc.) then return the input.
   if (typeof inputString != "string") { return inputString; }
   var retValue = inputString;
   var ch = retValue.substring(0, 1);
   while (ch == " ") { // Check for spaces at the beginning of the string
	  retValue = retValue.substring(1, retValue.length);
	  ch = retValue.substring(0, 1);
   }
   ch = retValue.substring(retValue.length-1, retValue.length);
   while (ch == " ") { // Check for spaces at the end of the string
	  retValue = retValue.substring(0, retValue.length-1);
	  ch = retValue.substring(retValue.length-1, retValue.length);
   }
   while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
	  retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
   }
   return retValue; // Return the trimmed string back to the user
} // Ends the "trim" function

//Function for Report View
function popUp(url,win,features) {
	if (features == null){
		features = 'toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1';
	}
	  Win=window.open(url,win,features);
	}

//Universal window.open function
function openWindow(URL,name,props) {
	window.open(URL,name,props);
}

var exitvariable = true;
//Checks to see if parent window
//If parent window then load page in parent and close child
//If no parent load page in child
function setNewWindow(URL){
 newWindow=window.opener;
 if (newWindow == null || newWindow.closed){
   newWindow = popUp(URL,'Order','width=787,height=533,address=1,location=1,menubar=1,scrollbars=1,status=1,resizable=1,toolbar=1');
   self.close();
   // return false;
 }
 else {
 newWindow.location=URL;
 //first check for valid variable in opening window
 if (newWindow.exitvariable != null){
	newWindow.exitvariable=false;
 }
 self.close();
 }
}
//Pausing function
function pause(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (now.getTime() < exitTime) {
		now = new Date();
	}
}
//This function is to open a new window from a child window when a user close a browser
function toMainWindowAlt(URL){ 
 mainWindow=window.opener;
 if (mainWindow == null || mainWindow.closed){
   newwindow=window.open(URL,'newwin','toolbar=1,status=1,scrollbars=1,resizable=1,location=1')
   self.close();
 }
 else {
   mainWindow=window.opener;
   mainWindow.location.href=URL;
   pause(2000);
   self.close();
 }
}
//Checks to see if parent window
//If parent window then load page in parent and close child
//If no parent load page in child
function toMainWindow(URL){
 mainWindow=window.opener;
 if (mainWindow == null || mainWindow.closed){
   mainWindow = self;
   mainWindow.location=URL;
   return false;
 }
 else {
  if (mainWindow.exitvariable != null)
  {
	mainWindow.exitvariable=false;
  }
  mainWindow.location=URL;
  self.close();
 }
}

function myUnloadHandler(e)
{
	if (exitvariable) {

		if (e != null && e != undefined && e.data != null && e.data != undefined) {
			var url = e.data.url;
			var name = e.data.name;
			var props = e.data.props;

			if (url != null && url != undefined) {
				var exitPopup = popUp(url, name, props);
			}
		}
	}
}

function MoreInfo(sHtml, pWidth, pHeight){
	var sbHtml = sHtml;
	var elements = "width=" + pWidth + ",height=" + pHeight + ",resizable=1";
	var winName = window.open('','popup',elements);

	winName.document.write(sbHtml);
}

function eReference(eName) {
	if (document.layers) {
	//we want 1 object (not nested)
		//simple layer reference
		if (eReference.arguments.length == 1) {
			var cEl = eval("document.layers['" + eName + "']");
		}
	//old IE browsers:
	} else if (document.all) {
		var cEl = eval('document.all.' + eName);
	//W3C standard:
	} else {
		var cEl = document.getElementById(eName);
	}
	return cEl;
}

function displayObj(id, display){
   if (document.getElementById || document.all){
		if (display){
			if(eReference(id).style.display == 'none' || eReference(id).style.display == ''){
				eReference(id).style.display = 'block';
			}
		}else if (!display){
			if(eReference(id).style.display == 'block' || eReference(id).style.display != ''){
				eReference(id).style.display = 'none';
			}
		}
	}
}

function toggleDisplay(id, state){
	//alert("fromToggleDisplay" + " " + id + "  " + state);
	if (state){
		displayObj(id, true);
	}else{
		displayObj(id, false);
	}
}

function toggle2(content, header) {

	var contentId = '#' + content;
	var headerId = '#' + header;

	var displayState = $(contentId).css('display');

	if (displayState == 'none') {
		$(contentId).show();
		$(headerId).text('[-]');
	} else {
		$(contentId).hide();
		$(headerId).text('[+]');
	}

}


function togglePanel(id, imgid, expandsrc, collapsesrc)  {
	var isOnDisplay = false;   
   if (document.getElementById || document.all){
		var e = eReference(id);
		var imgObj = eReference(imgid);
		if(e.style.display == 'none' || eReference(id).style.display == ''){
			e.style.display = 'block';
			isOnDisplay = false;
			
		}else{
			e.style.display = 'none';
			isOnDisplay = true;
		}

		imgObj.src=isOnDisplay ?  expandsrc : collapsesrc;
	}
}

function submitform() {
  if (submitform.arguments.length > 0) {
	  var formname = eval("document."+submitform.arguments[0]);
	  formname.submit();
  }
}

function submitASPXForm(url, target)
{
	document.forms[0].action		= url;
	document.forms[0].target		= target;
	document.forms[0].submit()
}

function makeBookmarkLink(elementParentId, imgSrc)
{
	var link	= '<a href="javascript:void(0);" onclick="addBookmark(document.title, document.location)">Click here to add to favorites</a> <img src="' + imgSrc + '" />';

	if (window.sidebar) // Mozilla Firefox Bookmark
	{
		// do nothing
	}
	else if(window.external) // IE Favorite
	{
		document.getElementById(elementParentId).innerHTML = link;
	}
	else if(window.opera && window.print) // Opera Bookmark
	{
		document.getElementById(elementParentId).innerHTML = link;
	}
}

function addBookmark(title, url)
{
	if (window.sidebar) // firefox
		window.sidebar.addPanel(title, url, "");
	else if(window.opera && window.print){ // opera
		var elem = document.createElement('a');
		elem.setAttribute('href',url);
		elem.setAttribute('title',title);
		elem.setAttribute('rel','sidebar');
		elem.click();
	} 
	else if(document.all)// ie
		window.external.AddFavorite(url, title);
}

/* Adds 'exitvaiable=false' to onclick event for all '<a>' */
function noPopupsOnAnchors()
{
	var atag = document.getElementsByTagName("a");
	var exitvariable = true;
	
	for (var i = 0; i < atag.length; i++)
	{
		addEvent(atag[i], 'click', function(){exitvariable=false;});
	}
}

function addEvent (obj, type, fn)
{
	if (obj.addEventListener)
	{
		obj.addEventListener (type, fn, false);
	} 
	else if (obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() {obj["e"+type+fn] (window.event);}
		obj.attachEvent("on"+type, obj[type+fn]);
	}
}

/*Creates Varable to use for Copyright Year
USE "<script language=javascript>document.write(copyYear + " -")</script>" 
to display the year in the HTML document*/
	var copyDate = new Date();
	var copyYear = copyDate.getFullYear();

function swapClass(obj, c, keep)
{
	// obj - this object
	// c = new class
	// keep = keep class
	var elm, i;
	elm = document.getElementById(obj.id);
	if (elm.className && (elm.className != keep))
	{
		elm.className = c;
	}
}

function ECD_ClearMask(obj, maskVal, groupSSN) 
{	
	if (groupSSN) {
		if (document.getElementById) {
			var ssn1ID, ssn2ID, ss3ID;
			ssn1ID = obj.id.replace(/\d/g, "1");
			ssn2ID = obj.id.replace(/\d/g, "2");
			ssn3ID = obj.id.replace(/\d/g, "3");
			
			var ssn = document.getElementById(ssn1ID).value;
			ssn += document.getElementById(ssn2ID).value;
			ssn += document.getElementById(ssn3ID).value;
			if ( ssn == maskVal ) {
				document.getElementById(ssn1ID).value = '';
				document.getElementById(ssn2ID).value = '';
				document.getElementById(ssn3ID).value = '';
			}
		}
		else
			obj.value = '';
	}
	else if (obj.value == maskVal) {
		obj.value = '';
	}
}

function verisign()
{
	var dd = document.domain;

	var x = "<scr"+"ipt src=https://seal.verisign.com/getseal?host_name=" + dd + "&size=M&use_flash=YES&use_transparent=YES&lang=en>"+"<\/scr"+"ipt>";
	return x;
}

function $ECD() {}
$ECD.prototype.findForm = function(formElement) {
	var result = null;

	// Iteratively climb up DOM to find closest <form> tag
	var el = formElement;
	while (el != null && el.length != 0) {
		if (el[0].tagName.toUpperCase() === "FORM") {
			result = el;
			break;
		}
		el = $(el).parent();
	}

	return result;
};

$ECD.prototype.setupSubmitClick = function (submitID) {
	
	$("#" + submitID).click(function () {
		var id = submitID + "_Clicked";
		if($("#" + id).length == 0) {
			var name = $(this).attr('name') + ".Clicked";
			$ECD.findForm($(this)).append("<input type='hidden' id='" + id + "' name='" + name + "' value='true' />");
		}
	});
};

$ECD.prototype.setupOverlay = function (triggerID) {

	var trigger = $("#" + triggerID);

	var refreshOverlay = function () {

		$(".submitOverlay").css("height", $(document).height()).css("opacity", 0.6);
		$(".submitOverlayMessage")
				.css("width", $(window).width() - 40)
				.css("top", $(document).scrollTop() + ($(window).height() / 2) - $(".submitOverlayMessage").outerHeight())
				.css("left", ($(window).width() / 2) - ($(".submitOverlayMessage").outerWidth() / 2));
	};

	var bindFormSubmit = function () {

		var form = $ECD.findForm(trigger);
		if (form != null) {

			form.submit(function () {

				if (form.valid()) {

					var overlay = $($("#overlayTemplate").text());
					var overlayMessage = $($("#overlayMessageTemplate").text());

					$("body").append(overlay).append(overlayMessage);

					refreshOverlay();
					$(window).scroll(refreshOverlay);
					$(window).resize(refreshOverlay);
				}
			});
		}

	};

	$(bindFormSubmit);
};

$ECD.prototype.setScrollHandler = function (scrollHandler) {
	$("html").data("ecd-scrollHandler", scrollHandler);
};

$ECD.prototype.getScrollHandler = function () {
	return $("html").data("ecd-scrollHandler");
};

window.$ECD = new $ECD();

function replaceDniLink(attr) {
	var target;
	var index;
	if (attr == "/dni") {
		$("a").each(function() {

			target = $(this).attr('href');
			if (target != undefined) {
				index = target.search("freecreditscore.com/");
				if (index != -1) {
					str = target.substring(index+20);
					$(this).attr("href","https://www.freecreditscore.com/dni/"+str);
				}
			}
			
		});
	}
}

/* NBW Pop-up Functions */
jQuery(function() {

	if ( typeof popupLightBoxFooterTheme !== "undefined" ) {
		
		var footerLightBox = {
			
			'popup,popuplarge' : {
				'width' : 660,
				'height' : 440
			},
			'popup-large-400' : {
				'width' : 680,
				'height' : 440
			},
			'popup-medium,popupmedium' : {
				'width' : 520,
				'height' : 300
			},
			'popup-medium-small' : {
				'width' : 520,
				'height' : 235
			},
			'popup-small,popupsmall' : {
				'width' : 330,
				'height' : 190
			},
			'popup-site-security' : {
				'width' : 440,
				'height' : 410
			}

		}

		$.each( footerLightBox , function( key, value ) {
			
			var currentLightBoxObject = value,
				allSelectorString = key.split(","),
				completeSelector = "";

			for( var i=0;i<allSelectorString.length;i++ ) {
				completeSelector += "." + allSelectorString[i] + ",";
			}
			if ( currentLightBoxObject !== undefined ) {

				/***********************************************************
				* Initialise the LightBox. Plugin for light box is colorbox
				************************************************************/
				$( completeSelector ).colorbox ( {
					iframe : true,
                                        transition : 'none',
                                        speed:0,
					height : currentLightBoxObject.height,
					width : currentLightBoxObject.width,
					lightBoxDimensionClass : key,
                                        className: 'footer-light-box-complete',
                                        fixed : true,
					scrolling : false ,
					opacity : 0.6,
					onComplete : function() {
						var $loadedIframe = $('#colorbox').find('iframe'),
							lightBoxWidget = $(this).data('colorbox');
						
						$loadedIframe.on('load', function() {

							var $contentSectionToManipulate = $(this).contents().find('#pageDiv'),
								$manipulateHeader = $contentSectionToManipulate.find('header'),
								$manipulateContentContainer = $contentSectionToManipulate.find('.main-container'),
								$manipulateContent = $contentSectionToManipulate.find('.main-content');

							$contentSectionToManipulate.addClass( 'lightbox-footer-controls' );
							$manipulateHeader.addClass( popupLightBoxFooterTheme );

							/***************************************************************
							* Calculate the exact dimensions and put scrollbars if needed.
							****************************************************************/
							$manipulateContentContainer.css({ 'width' : lightBoxWidget.width });
							var heightOfContentSection = lightBoxWidget.height - $manipulateHeader.height() - 10;

							if ( heightOfContentSection < $manipulateContent.height() ) {
								$manipulateContent.css({ 'overflow-y' : 'scroll' , 'height': heightOfContentSection  });
							}
						});
					}
				});

			}
		});

	}

	else {
	
		jQuery('a[href$="nbw"]:not(".popup",".popup-medium",".popup-site-security",".popup-medium-small",".popup-small",".popuplarge",".popupmedium",".popupsmall",".popuplarge-400")').addClass("popup");

		jQuery(".popup,.popuplarge").click(function (e) {
			e.preventDefault();
			window.open(this.href, '_blank', 'scrollbars=1,width=680,height=440,toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1');
			return false;
		});
		

		jQuery(".popuplarge-400").click(function (e) {
			e.preventDefault();
			window.open(this.href, '_blank', 'scrollbars=1,width=680,height=400,toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1');
			return false;
		});
		
		jQuery(".popup-medium,.popupmedium").click(function (e) {
			e.preventDefault();
			window.open(this.href, '_blank', 'scrollbars=0,width=540,height=300,toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1');
			return false;
		});

		jQuery(".popup-medium-small").click(function (e) {
			e.preventDefault();
			window.open(this.href, '_blank', 'scrollbars=0,width=540,height=255,toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1');
			return false;
		});

		jQuery(".popup-small,.popupsmall").click(function (e) {
			e.preventDefault();
			window.open(this.href, '_blank', 'scrollbars=0,width=350,height=225,toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1');
			return false;
		});

		jQuery(".popup-site-security").click(function (e) {
			e.preventDefault();
			window.open(this.href, '_blank', 'scrollbars=0,width=440,height=410,toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1');
			return false;
		});
		jQuery('#closePopup').click(function (e) {
			e.preventDefault();
			window.close();
		});
	}
});

$(function(){
				if (window.location.href.toLowerCase().indexOf("dni") != -1) {
					$('a[href]').each(function(){
						if ($(this).attr('href').toLowerCase().indexOf('https://member.freecreditscore.com') != -1) {
							var newHref = $(this).attr('href').toLowerCase().replace("https://member.freecreditscore.com/", "https://member.freecreditscore.com/dni/");
							$(this).attr('href', newHref);
						}
					});
				}

if($ECD.SiteVersionID == "1062")
{
$(".main-content p.active").html("Credit, Score and Identity Monitoring Active");
}

});
