// JavaScript Document
//code added to fix the logout button on the fly
var logOutButton = document.getElementById('LogIn_btn');
if (logOutButton){
	if(logOutButton.href.indexOf("Login") <0){
	logOutButton.href = "http://www.hottopic.com/hottopic/member/logout.jsp";
	}
}

var footer_logo = ''+
'<div style="width:227px; height:43px; background:url(http://community.hottopic.com/images/htFoundationV6.gif) no-repeat; position:relative;">'+
	'<a href="http://community.hottopic.com/content/ht1?cm_re=HTPlusOne-_-Footer-_-Join" style="position:absolute;left:0;width:66px; height:43px;">'+
		'<img src="http://community.hottopic.com/hottopic/images/clear.gif" border="0" style="width:66px; height:43px;"/>'+
	'</a>'+
	'<a href="http://community.hottopic.com/content/ht-foundation" style="position:absolute;left:66px;width:90px; height:43px;">'+
		'<img src="http://community.hottopic.com/hottopic/images/clear.gif" border="0" style="width:90px; height:43px;"/>'+
	'</a>'+
'</div>';
document.write(footer_logo);

try{
	var footerBottom = document.getElementById('footer_bottom');
	footerBottom.style.width='227px';
}catch(e){
	//let it go
}






