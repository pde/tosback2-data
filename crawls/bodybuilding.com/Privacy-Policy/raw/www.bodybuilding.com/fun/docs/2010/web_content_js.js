var browser_name = navigator.appName;
//HEADERS
document.write("<style type='text/css'>.mainheader h1 { position: relative;  color: #ffffff; line-height: 115%; vertical-align:bottom}.mainheader h1 span {  background: url(http://www.bodybuilding.com/fun/images/2009/maingrade.png); background-repeat: repeat-x;   position: absolute;  display: block;  width: 480px; height: 31px; } .subheader h2 span {  background: none;  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://www.bodybuilding.com/fun/images/2009/maingrade.png', sizingMethod='scale');}.subheader h2 { position: relative;  color: #ffffff; line-height: 115%; vertical-align:bottom}.subheader h2 span {  background: url(http://www.bodybuilding.com/fun/images/2009/maingrade.png); background-repeat: repeat-x;   position: absolute;  display: block;  width: 445px; height: 31px; }</style>");

function main_header(str) {
	if (browser_name == "Microsoft Internet Explorer") {
		main_ie(str);
	} else {
		main_not_ie(str);
	}
}
function sub_header(str) {
	if (browser_name == "Microsoft Internet Explorer") {
		sub_ie(str);
	} else {
		sub_not_ie(str);
	}
}

function main_ie(str2) {
	document.write("<p><font color='#ffffff' face='arial' size='5'><strong>"+str2+"</strong></font><table width='480' border='0' cellspacing='0' cellpadding='0'><tr height='1' bgcolor='#ffffff'><td> </td></tr><tr height='1' bgcolor='#000000'><td> </td></tr><tr height='1' bgcolor='#cccccc'><td> </td></tr></table></p>");
}
function main_not_ie(str2) {
	document.write("<p><div class='mainheader'><h1><span></span><font color='#ffffff' face='arial' size='5'>"+str2+"</font><table width='480' border='0' cellspacing='0' cellpadding='0'><tr height='1' bgcolor='#ffffff'><td> </td></tr><tr height='1' bgcolor='#000000'><td> </td></tr><tr height='1' bgcolor='#cccccc'><td> </td></tr></table></h1></div></p>");
}

function sub_ie(str2) {
	document.write("<p><strong><font size='3' face='arial' color='#ffdf00'>"+str2+"</font></strong><table width='445px' border='0' cellspacing='0' cellpadding='0'><tr height='1' bgcolor='#ffdf00'><td> </td></tr></table></p>");
}
function sub_not_ie(str2) {
	document.write("<p><div class='subheader'><h2><span></span><strong><font size='3' face='arial' color='#ffdf00'>"+str2+"</font></strong><table width='445px' border='0' cellspacing='0' cellpadding='0'><tr height='1' bgcolor='#ffdf00'><td> </td></tr></table></h2></div></p>");
}

//END HEADERS
//SUPPLEMENTS
function quickstart_supps(recommended, company, name, type, image, url, desc, review) {
	document.write("<p><br clear='all'><table width='430' cellpadding='4' cellspacing='4'><tr><td align='center' valign='top' width='70'><font face='arial' size='2'><a href='"+url+"'><img src='"+image+"' border='0'></a></font></td><td valign='top' width='315'><font face='arial' size='2'><strong>"+recommended+":<br><font color='#fff799'>"+company+" Presents: "+name+"</font></strong><br><strong>"+type+"</strong><br><font size='1'>"+desc+"<br>[ <a href='"+url+"' target='_blank'>Order</a> ] [ <a href='"+url+"' target='_blank'>Product Info</a> ] [ <a href='"+review+"' target='_blank'>Rating</a> ]</font></font></td><td align='center'><a href='"+url+"' target='_blank'><img src='http://www.bodybuilding.com/fun/images/2009/order_button.jpg' alt='Order' width='45' height='19' border='0' /></a><br><br><a href='"+url+"' target='_blank'><img src='http://www.bodybuilding.com/fun/images/2009/info_button.jpg' alt='Product Info' width='45' height='19' border='0' /></a><br><br><a href='"+review+"' target='_blank'><img src='http://www.bodybuilding.com/fun/images/2009/rate_button.jpg' alt='Rating' width='45' height='19' border='0' /></a> <br></td></tr></table><br clear='all'></p>");
}
//END SUPPLEMENTS
//TRAINING
function quickstart_training(name, url) {
	document.write("<p><table border='0' cellspacing='0' cellpadding='0' width='250'><tr><td><font face='arial' size='2' color='#ffffff'><strong>Get A Printable Log Of "+name+".</strong><br></font></td></tr><tr height='4' bgcolor='#000000'><td> </td></tr><tr><td><font face='arial' size='2'color='#ffffff'><img src='http://www.bodybuilding.com/fun/images/2009/printer_new_small.jpg' alt='print' align=\"absmiddle\" /> <font size='2'><a href='"+url+"'>Printable Page</a></font><img src='http://www.bodybuilding.com/fun/images/2009/pdf_new_small.jpg' alt='PDF' align=\"absmiddle\" /> <font size='2'><a href='"+url+"&pdf=yes'>PDF Document</a></font></td></tr></table></p>");
}
function quickstart_training_white(name, url) {
	document.write("<img src='http://www.bodybuilding.com/fun/images/2009/print1_white.jpg' alt='print' align=\"absmiddle\" /> <a href='"+url+"'>Printable Page</a> <img src='http://www.bodybuilding.com/fun/images/2009/print2_white.jpg' alt='PDF' align=\"absmiddle\" /> <a href='"+url+"&pdf=yes'>PDF Document</a><!--<img src='http://www.bodybuilding.com/fun/images/2009/print3_white.jpg' alt='EXCEL' align=\"absmiddle\" /> <a href='"+url+"&xls=yes'>Excel Document</a>-->");
}
//END TRAINING

function gotolink(theword) {

window.location.href = "http://videos.bodybuilding.com/tags/"+theword;

return false;

}

//POLLS
var http_request = false;
function makeRequest(url, parameters)
{
	http_request = false;
	if (window.XMLHttpRequest)
	{ // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType)
		{
			// set type accordingly to anticipated content type
			//http_request.overrideMimeType('text/xml');
			http_request.overrideMimeType('text/html');
		}
	}
	else if (window.ActiveXObject)
	{ // IE
		try
		{
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {}
		}
	}
	if (!http_request)
	{
		alert('Cannot create XMLHTTP instance');
		return false;
	}
	http_request.onreadystatechange = alertContents;
	http_request.open('GET', url + parameters, true);
	http_request.send(null);
}

function alertContents()
{
	if (http_request.readyState == 4)
	{
		if (http_request.status == 200)
		{
			//alert(http_request.responseText);
			result = http_request.responseText;
			// document.getElementById('myspan').innerHTML = result;     
			showResults (result);
		}
		else
		{
			alert('There was a problem with the request.');
		}
	}
}

function get(obj)
{
	var getstr = "?";
	for (i=0; i<obj.getElementsByTagName("input").length; i++)
	{
		if (obj.getElementsByTagName("input")[i].type == "text")
		{
			getstr += obj.getElementsByTagName("input")[i].name + "=" + obj.getElementsByTagName("input")[i].value + "&";
		}
		if (obj.getElementsByTagName("input")[i].type == "checkbox")
		{
			if (obj.getElementsByTagName("input")[i].checked)
			{
				getstr += obj.getElementsByTagName("input")[i].name + "=" + obj.getElementsByTagName("input")[i].value + "&";
			}
			else
			{
				getstr += obj.getElementsByTagName("input")[i].name + "=&";
			}
		}
		if (obj.getElementsByTagName("input")[i].type == "radio")
		{
			if (obj.getElementsByTagName("input")[i].checked)
			{
				getstr += obj.getElementsByTagName("input")[i].name + "=" + obj.getElementsByTagName("input")[i].value + "&";
			}
		}  
		if (obj.getElementsByTagName("input")[i].type == "hidden")
		{
			getstr += obj.getElementsByTagName("input")[i].name + "=" + obj.getElementsByTagName("input")[i].value + "&";
		}  
		if (obj.getElementsByTagName("input")[i].tagName == "SELECT")
		{
			var sel = obj.getElementsByTagName("input")[i];
			getstr += sel.name + "=" + sel.options[sel.selectedIndex].value + "&";
		}
	}
	makeRequest("docs/2009/pollMiddle.php", getstr);
}

function showResults (res)
{
	var total = gup ('total', res);
	var id = gup ('id', res);
	var theform = document.getElementById ('poll' + id);
	var elems = theform.getElementsByTagName('span');
	var radios = theform.getElementsByTagName('input');
	var totalVotes = 0;
	var totalCount = 0;
	var resultCount = 0;
	var percCount = 0;
	var percentage = 0;
	for (a=0; a<elems.length; a++)
	{
		if (elems[a].id.match ("results"))
		{
			var result = gup ('results' + totalCount, res);
			totalVotes = parseInt (totalVotes) + parseInt(result);
			totalCount++;
		}
	}

	for (b=0; b<radios.length; b++)
	{
		radios[b].style.display = "none";
	}
	for (i=0; i<elems.length; i++)
	{
		if (elems[i].id.match ("perc"))
		{
			var tmpRes = parseInt (gup ('results' + percCount, res));
			if (totalVotes == 0)
			{
			percentage = 0;
			}
			else
			{
			percentage = parseInt ((tmpRes / totalVotes) * 100);
			}
			elems[i].innerHTML = percentage + "%";
			percCount++;
		}
		if (elems[i].id.match ("answer"))
		{
			elems[i].style.color = "#fff799";
			elems[i].innerHTML += ": ";
		}
		if (elems[i].id.match ("results"))
		{
			if (percentage == 100)
			{
			var showPct = 99;
			}
			else
			{
			var showPct = percentage;
			}
			elems[i].style.display = "block";
			elems[i].style.width = Math.round (showPct) + "%";
		}
		if (elems[i].id.match ("empty"))
		{
			var empPct = 100 - percentage;
			elems[i].style.width = "100%";
		}
		if (elems[i].id.match ("resHold"))
		{
			elems[i].style.display = "block";
			elems[i].style.width = "100%";
			elems[i].style.backgroundImage="url('http://www.bodybuilding.com/fun/images/2009/polls_gray.jpg')";
			elems[i].style.backgroundRepeat="repeat-x";
		}
	}
}
function gup (name, loc)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( loc );
	if( results == null )
	{
		return "";
	}
	else
	{
		return results[1];
	}
}
//END POLLS

//EXERCISE POPUP
function pop (url)
{
	window.open("http://www.bodybuilding.com/exercises/main/popup/name/" + url, "exercise", "status = 1, height = 440, width = 645, resizable = 0")
}

//END EXERCISE POPUP

//NUTRIENT POPUP
function nutrientpop (url)
{
	window.open("http://bodybuilding.com/fun/nutrient-popup.php?id=" + url, "exercise", "status = 1, height = 440, width = 645, resizable = 0")
}

//END NUTRIENT POPUP

//FAP FIND A PLAN
function bottomNav (s, a, g)
{
	if (a == "2039")
	{
		a = "20to39";
	}
	document.write ("<a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/intro\">Introduction</a> | <a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/training\">Training</a> | <a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/nutrition\">Nutrition</a> | <a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/supplements\">Supplements</a> | <a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/motivation\">Motivation</a> | <a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/moreinfo\">More Info</a>");
}
function changeValues (val, id)
{
	val = val.split("||");
	document.getElementById ("ours" + id).innerHTML = "$" + val[0];
	document.getElementById ("retail" + id).innerHTML = "$" + val[1];
	document.getElementById ("savings" + id).innerHTML = "(" + Math.round ((1 - (val[0] / val[1]))*100) + "% Off)";
	document.getElementById ("order" + id).innerHTML = "<a href=\"http://www.bodybuilding.com/cart/cart.php?mode=add&amount=1&productid=" + val[2] + "\"><img src=\"http://assets.bodybuilding.com/images/btnOrder.png\" alt=\"Order\" border=\"0\" /></a>";
}
function topNavigation (s, a, g)
{
	var current = document.location.href;
	if (!current.match(/intro/gi))
	{
		document.write ("<a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/intro\">Introduction</a>");
	}
	else
	{
		document.write ("<strong>Introduction</strong>")
	}
	document.write ("&nbsp;&nbsp;|&nbsp;&nbsp;");
	if (!current.match(/training/gi))
	{
		document.write ("<a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/training\">Training</a>");
	}
	else
	{
		document.write ("<strong>Training</strong>")
	}
	document.write ("&nbsp;&nbsp;|&nbsp;&nbsp;");
	if (!current.match(/nutrition/gi))
	{
		document.write ("<a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/nutrition\">Nutrition</a>");
	}
	else
	{
		document.write ("<strong>Nutrition</strong>")
	}
	document.write ("&nbsp;&nbsp;|&nbsp;&nbsp;");
	if (!current.match(/supplements/gi))
	{
		document.write ("<a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/supplements\">Supplements</a>");
	}
	else
	{
		document.write ("<strong>Supplements</strong>")
	}
	document.write ("&nbsp;&nbsp;|&nbsp;&nbsp;");
	if (!current.match(/motivation/gi))
	{
		document.write ("<a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/motivation\">Motivation</a>");
	}
	else
	{
		document.write ("<strong>Motivation</strong>")
	}
	document.write ("&nbsp;&nbsp;|&nbsp;&nbsp;");
	if (!current.match(/moreinfo/gi))
	{
		document.write ("<a href=\"http://www.bodybuilding.com/guides/" + s + "-" + a + "-" + g + "/moreinfo\">More Info</a>");
	}
	else
	{
		document.write ("<strong>More Info</strong>")
	}
}
function beginVideo ()
{
	var cssCode = '<style type="text/css">body {margin:0px 0px 0px 0px;}</style>';
	var embedCode = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0' width='800' height='600' id='muscle_building_iq_quiz' align='middle'><param name='allowScriptAccess' value='sameDomain' /><param name='allowFullScreen' value='false' /><param name='movie' value='http://www.bodybuilding.com/fun/videos/2010/fap-player.swf' /><param name='quality' value='high' /><param name='bgcolor' value='#000000' /><embed src='http://www.bodybuilding.com/fun/videos/2010/fap-player.swf' quality='high' bgcolor='#000000' width='800' height='600' name='muscle_building_iq_quiz' align='middle' allowScriptAccess='sameDomain' allowFullScreen='false' type='application/x-shockwave-flash' pluginspage='http://www.adobe.com/go/getflashplayer' /></object>";

	newwindow2=window.open('','videoPopup','width=800,height=600');
	void(0);
	var tmp = newwindow2.document;
	tmp.write(cssCode +"<p>" + embedCode + "</p>");
	tmp.close();
}
//END FIND A PLAN


