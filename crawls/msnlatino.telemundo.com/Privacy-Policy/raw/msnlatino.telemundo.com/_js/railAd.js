

jQuery(document).ready(function(){



// ad tag that will passthru the javascript custom name=value pairs from the ad server
if( (typeof(railAdBg)!='undefined') && (railAdBg) )
{
	// site specific custom background code.
	jQuery('body').css({'background-image':'url('+railAdBg+')'} );
//	console.log(railAdBg);
}

if( ( typeof(railAdBgColor)!='undefined') && ( railAdBgColor ) )
{
	// site specific custom background color code.
	jQuery('body').css( {'background-color':railAdBgColor} );
//	 console.log(railAdBgColor);
}

if( ( typeof(railAdBgRepeat)!='undefined' ) && ( railAdBgRepeat ) )
{
	// site specific custom background repeat code.
	jQuery('body').css({'background-repeat':railAdBgRepeat});
//	console.log(railAdBgRepeat);
}

if( ( typeof(railAdBgClickthru)!='undefined') && ( railAdBgClickthru ))
{
//	console.log( railAdBgClickthru );
	// site specific custom background click event code.
	jQuery('body').click(function (e) {
		evt = e || window.event;
		if ( e.target ) targ = e.target;
		else if ( e.srcElement ) targ = e.srcElement;
		if ( targ.nodeType == 3 ) // Safari bug
			targ = targ.parentNode;

		if ( targ.id == jQuery('body').attr('id') ) 
		{
			window.open(railAdBgClickthru);
		}

	});

/*	jQuery('#'+jQuery('body')
			.attr('id'))
			.bind('mouseenter',function () 
			{
				jQuery(this).css('cursor','pointer');
	});

	jQuery('#'+jQuery('body')
			.attr('id'))
			.bind('mouseleave',function () 
			{
				jQuery(this).css('cursor','auto');

	});*/
}

});
