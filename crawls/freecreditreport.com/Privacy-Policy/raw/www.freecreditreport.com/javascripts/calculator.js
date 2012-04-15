
window.name = "_calcWindow";
function openCalcWin(URL) {
	//var urlExtension=URL+".html"
	//var urlExtension=URL+".jsp"
	
	window.open(URL,'calcWindow','width=758,height=550,screenX=200,screenY=0,left=200,top=0,scrollbars,toolbar,menubar');
}

function showbuttons()
{   
    var agt = navigator.userAgent.toLowerCase();
    var IEMAC = ((agt.indexOf("msie") != -1) && agt.indexOf("mac")!= -1);
    var N6 = (agt.indexOf("netscape6") != -1 || (agt.indexOf("netscape/6") != -1));
    var btn = 'Cobrand/Images';
    if(typeof(CalcBtnPath) != 'undefined')
    {
		btn = CalcBtnPath;
	}
    if (N6)
	{
		return "<p>Netscape 6 is unable to support our detailed reports.  Please upgrade to Nescape 7.</p>";
	}
	if (IEMAC)
	{
		return "";
	}
	return "<p><a href='Javascript:document.calculator.calculate()'><img src='" + btn + "/button_calculate.gif' border='0'></a>&nbsp;&nbsp;&nbsp;<A href='Javascript:openNote();'><IMG src='" + btn + "/button_viewreport.gif' border='0'></a></p>";
}

function openNote()
{ 
	var agt=navigator.userAgent.toLowerCase(); 
	var is_aol = (agt.indexOf("aol") != -1);
	leftpos = 0;
	if (screen)
	{
		leftpos=screen.width/2 - 300;
	}
	if (is_aol)
	{
		var s = " ";
		s=document.calculator.sJavaScriptReport('HTML');
		document.write(s);
	}
	else
	{
		var OpenWindow=window.open("","newwin","toolbar=yes,menubar=yes,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=380,left="+leftpos+",top=20");
		var s = " ";
		s=document.calculator.sJavaScriptReport('HTML');
		OpenWindow.document.write(s);
		OpenWindow.document.close(); 
		OpenWindow.focus();
	}
}