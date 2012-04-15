var jqN = jQuery;
var usa_defaultBgImg, usa_defaultBgAttach, usa_defaultBgPos, usa_defaultBgCol;
var usa_railsSet = false;

function usa_setRails(railAdBg, railAdBgColor, railAdBgRepeat, railAdBgClickthru)
{
	if (usa_railsSet)
	{
		return;
	}
	
	if((typeof(railAdBg)!='undefined')&&(railAdBg))
	{
	// site specific custom background code.
	if (typeof usa_defaultBgImg == 'undefined')
	{
		usa_defaultBgImg = jqN('body').css('background-image');
		usa_defaultBgAttach = jqN('body').css('background-attachment');
		usa_defaultBgPos = jqN('body').css('background-position');
	}
	jqN('body').css({'background-image':'url("'+railAdBg+'")'});
	jqN('body').css({'background-attachment':'fixed'});
	jqN('body').css({'background-position':'center 66px'});
	}
	if((typeof(railAdBgColor)!='undefined')&&(railAdBgColor))
	{
		if (typeof usa_defaultBgCol == 'undefined')
		{
			usa_defaultBgCol = jqN('body').css('background-color');
		}
	// site specific custom background color code.
	jqN('body').css({'background-color':'#'+railAdBgColor});
	}
	if((typeof(railAdBgRepeat)!='undefined')&&(railAdBgRepeat))
	{
	// site specific custom background repeat code.
	jqN('body').css({'background-repeat':railAdBgRepeat});
	}
	if((typeof(railAdBgClickthru)!='undefined')&&(railAdBgClickthru))
	{
		//usa_debugOut('railAdBgClickthru: ' + railAdBgClickthru);
		
		// site specific custom background click event code.
	 jqN('body').click(function (e) {
		 //usa_debugOut('body clicked: ');
		 //usa_debugOut(e);
	  evt = e || window.event;
	  if (e.target) targ = e.target;
	  else if (e.srcElement) targ = e.srcElement;
	  if (targ.nodeType == 3) // Safari bug 
	  targ = targ.parentNode;
	  //usa_debugOut(targ.id);
	  //railAdBgClickthru = unescape(railAdBgClickthru);
	  //if (targ.id == jqN('body').attr('id')) {
	  if (targ.tagName.toLowerCase() == jqN('body')[0].tagName.toLowerCase() || targ.id == 'usa_innerContainer') {
		  //usa_debugOut('open rails page...');
		  window.open(railAdBgClickthru);
	  }
	 });
	 //jqN('#'+jqN('body').attr('id')).bind('mouseenter',function () {
	 jqN('body').bind('mouseenter',function () {
	   jqN(this).css('cursor','pointer');
	 });
	 //jqN('#'+jqN('body').attr('id')).bind('mouseleave',function () {
	 jqN('body').bind('mouseleave',function () {
	    jqN(this).css('cursor','default');
	  });	
	}
	
	usa_railsSet = true;
}