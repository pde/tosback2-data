function writeSessionCookie (cookieName, cookieValue) {
	document.cookie = escape(cookieName) + "=" + escape(cookieValue);
}

function getCookieValue (cookieName) {
  var exp = new RegExp (escape(cookieName) + "=([^;]+)");
  if (exp.test (document.cookie + ";")) {
	exp.exec (document.cookie + ";");
	return unescape(RegExp.$1);
  }
  else return false;
}


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

function setFontSize() {
	fontSize = getCookieValue('fontSize');
	if (fontSize) {
		setClass('textArea', fontSize);
		setClass('fs_01', 'font_sizer_002a_fmt');
		setClass('fs_02', 'font_sizer_002a_fmt');
		setClass('fs_03', 'font_sizer_002a_fmt');
		switch (fontSize) {
		case 'copyNormal':
			setClass('fs_01', 'font_sizer_002b_fmt');
			break;
		case 'copyMedium':
			setClass('fs_02', 'font_sizer_002b_fmt');
			break;
		case 'copyLarge':
			setClass('fs_03', 'font_sizer_002b_fmt');
			break;
		}
	}
}

/* For the font sizer */
function setClass(objectID,newClass) {	
	var object = document.getElementById(objectID);
	object.className = newClass
	switch (newClass) {
		case 'copyNormal':
			writeSessionCookie('fontSize','copyNormal');
			break;
		case 'copyMedium':
			writeSessionCookie('fontSize','copyMedium');
			break;
		case 'copyLarge':
			writeSessionCookie('fontSize','copyLarge');
			break;
	}
}

addLoadEvent(function() {
  setFontSize();
});