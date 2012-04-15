<!--

function rollOver( which )
{
	if ( document.images )
		document[which].src = eval(which + "_on.src");
}

function rollOff( which )
{
	if ( document.images )
		document[which].src = eval(which + "_off.src");
}

function OpenViewWindow( sURL, width, height, scbar, tbar )
{
	if ( isNaN( width ) )
		width=390;
	if ( isNaN( height ) )
		height=427;
	if ( scbar != "yes" )
		scbar = "no";
	if ( tbar != "yes" )
		tbar = "no";

	var bars = "menubar=no,toolbar=no";
	if ( tbar == "yes" )
		bars = "menubar=yes,toolbar=yes";

	var strwindow = "toolbar=no,width=" + width + ",height=" + height + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";
	if ( navigator.appName == "Microsoft Internet Explorer" )
		strwindow = "toolbar=no,width=" + (width-10) + ",height=" + (height-5) + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";

	if ( window.screen )
	{
		var aw = screen.availWidth - 30;
		var ah = screen.availHeight - 50;
		var nwidth = width;
		var nheight = height;
		strwindow = "width=" + nwidth + ",height=" +nheight + strwindow;
		strwindow += ",left=" + ( ( aw - nwidth ) / 2);
		var nTop = ( ah - nheight ) / 2;
		if (nTop < 0 )
			nTop = 0;
		strwindow += ",top=" + nTop;
	}
	var sWinName = "wwchild";
	if ( sURL == "http://bedbathandbeyond.custhelp.com" )
		sWinName = sWinName + "2";
	windowpic = window.open(sURL, sWinName, strwindow);
	windowpic.focus();
}

function OpenAboutWindow( sURL, width, height, scbar, tbar )
{
	if ( isNaN( width ) )
		width = 390;
	if ( isNaN( height ) )
		height = 427;
	if ( scbar != "yes" )
		scbar = "no";
	if ( tbar != "yes" )
		tbar = "no";

	var bars = "menubar=no,toolbar=no";
	if ( tbar == "yes" )
		bars = "menubar=yes,toolbar=yes";

	var strwindow = "toolbar=no,width=" + width + ",height=" + height + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";
	if ( navigator.appName == "Microsoft Internet Explorer" )
		strwindow = "toolbar=no,width=" + (width-10) + ",height=" + (height-5) + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";

	if ( window.screen )
	{
		var aw = screen.availWidth - 30;
		var ah = screen.availHeight - 50;
		var nwidth = width;
		var nheight = height;
		strwindow = "width=" + nwidth + ",height=" +nheight + strwindow;
		strwindow += ",left=" + ( ( aw - nwidth ) / 2);
		var nTop = ( ah - nheight ) / 2;
		if ( nTop < 0 )
			nTop = 0;
	        strwindow += ",top=" + nTop;
	}
	windowpic2 = window.open( sURL, "wwchild", strwindow );
	windowpic2.focus();
}

function checkIfCookiesEnabled()
{
	if (document.cookie)
		return true;
	else
		return false;
}
//-->