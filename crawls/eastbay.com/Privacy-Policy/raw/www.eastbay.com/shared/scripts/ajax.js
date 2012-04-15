
function getHTTPObject() {
	try {
		var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			try {
				var xmlhttp = new XMLHttpRequest();
			} catch (e) {
				var xmlhttp = false;
			}
		}
	}
	return xmlhttp;
}


function loadXMLDoc(url,onStateChangeDo) {
	var ran_number= Math.random()*4;
	foundQuestion = url.indexOf("?");
	if (foundQuestion > 0)
		url = url + "&rand=" + ran_number;
	else
		url = url + "?rand=" + ran_number;
	ajax.onreadystatechange = onStateChangeDo;
	ajax.open("GET", url, true);
	ajax.send(null);

}
	
function postAjaxForm(str,url,onStateChangeDo) {
	var ran_number= Math.random()*4;
	foundQuestion = url.indexOf("?");
	if (foundQuestion > 0)
		url = url + "&rand=" + ran_number;
	else
		url = url + "?rand=" + ran_number;
	ajax.onreadystatechange = onStateChangeDo;
	ajax.open("POST",url,true);
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	ajax.send(str);
}

function getFormValues(fobj)
{
   var str = "";
   var valueArr = null;
   var val = "";
   var cmd = "";
   for(var i = 0;i < fobj.elements.length;i++)
   {
       switch(fobj.elements[i].type)
       {
           case "text":
           case "password":
           case "textarea":
           case "hidden":
                str += fobj.elements[i].name + "=" + cleanFormValue(fobj.elements[i].value) + "&";
                 break;

           case "radio":
		   case "checkbox":
       			if (fobj.elements[i].checked)
               		str += fobj.elements[i].name + "=" + cleanFormValue(fobj.elements[i].value) + "&";
		        break;

           case "select-one":
                str += fobj.elements[i].name + "=" + cleanFormValue(fobj.elements[i].options[fobj.elements[i].selectedIndex].value) + "&";
                break;

           case "select-multiple":
           		for (var j = 0; j < fobj.elements[i].options.length; j++)
           			if (fobj.elements[i].options[j].selected)
	               		str += fobj.elements[i].name + "=" + cleanFormValue(fobj.elements[i].options[j].value) + "&";
		        break;
       }
   }
   str = str.substr(0,(str.length - 1));
   return str;
}

function cleanFormValue(val){
 	return	escape(val).replace('&', '%26').replace('=', '%3D')
}
function getFieldFromContent(fieldName,content)
{
   	var startTag = "<" + fieldName + ">";
	var endTag = "</" + fieldName + ">";
	var startPoint = content.indexOf(startTag) + startTag.length;
	var endPoint = content.indexOf(endTag);
	if (startPoint > startTag.length && endPoint > 0 && endPoint > startPoint)
		return content.substring(startPoint, endPoint);
	else
		return "";
}	


function insertFragment(element,content) {
	if (typeof document.body.innerHTML == 'string') {
		element.innerHTML = content;
	} else if (typeof window.Range != 'undefined' && typeof Range.prototype.createContextualFragment == 'function') {
		var rng = document.createRange();
		rng.setStartBefore(element);
		var htmlFrag = rng.createContextualFragment(content);
		while (element.hasChildNodes()) {
			element.removeChild(element.lastChild);
		}
		element.appendChild(htmlFrag);
	} else {
		return false;
	}
}


	