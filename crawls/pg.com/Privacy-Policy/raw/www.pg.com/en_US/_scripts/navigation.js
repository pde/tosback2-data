$(document).ready(function() {

/* Added by Amar for left navigation highlighting starts as on 11/19/2009*/
	var divCounter = 1;
	$('#section-navigation div').each(function()
	{
		var div = $(this);
		var LinkSelected = 0;

		var CurrentHTML = GetNextNavHead(divCounter);

		$("ul", div).each(function()
		{
			var ulo = $(this);
			$("li", ulo).each(function()
			{
				var lio = $(this);
				var LeftNavChild = lio.children();
				var LeftNavLink = LeftNavChild.attr('href');
				if(divCounter != $('#section-navigation div').length)
				{
					if(CurrentHTML != null && CurrentHTML.indexOf(LeftNavLink) != -1)
					{
						lio.attr('class', 'selected');
					}
				}
				else
				{
					if(document.location.pathname.indexOf('/en_US/careers/careers_outside_us/countries/') != -1) /*fixing to forcefully highlight country pages in careers_outside_us*/
					{
						var MainSec = LeftNavLink.replace(/([^\/]+)\/([^\/]+)$/, "$1/");
						if(MainSec.indexOf('/careers_outside_us/') != -1)
						{
							lio.attr('class', 'selected');
						}
					}
					else
					{
						if(LeftNavLink && document.location.pathname.indexOf(LeftNavLink) != -1)
						{
							lio.attr('class', 'current');
						}
					}
				}
			});

		});
/*
		if((divCounter == $('#section-navigation div').length)) //At lowest level
		{
			var tmp = divCounter + 1;
			var heading = $("h" + tmp, div);
			if(heading)
			{
				var CurrentClass = heading.attr('class');
				heading.attr('class', CurrentClass + ' current');
				var txt = '<span class="sifr-header sIFR_">' + heading.html() + '</span>';
				heading.html(txt);
			}
			div.attr('class', 'active-box');
		}
*/
		divCounter++;
	});

	//set active box
	var $activebox = $('#section-navigation > div:last-child');
	$activebox
		.removeClass('nav-box').addClass('active-box')
		.find('.nav-header').wrapInner('<span class="sifr-header sIFR_"></span>');	
	//check if header needs to be current
	if(!$activebox.find('li.current').length) {
		$activebox.find('.nav-header').addClass('current');
	}	

function GetNextNavHead(divCounter)
{
	var count = 0;
	var CurrentHTML = '';
	$('#section-navigation div').each(function()
	{
		var div = $(this);
		if(divCounter == count)
		{
			var tmp = count + 2;
			var heading = $("h" + tmp, div);
			CurrentHTML = heading.html();
		}
		count++;
	});
	return CurrentHTML;
}
/* Added by Amar for left navigation highlighting end */



$('a').not('[tabindex]').attr('tabindex',0);  //fixes tabindexing in opera

// ======== hover and focus for primary-navigation ============
$('#site-navigation li.primary-nav-item').find('div.subnav-container').hide(); //init menus: hide all sub menus
	//NOTE: use mouse enter/leave instead of over/out to avoid conflicts between tabbing and mouse position
	//FF fires mouseover even when mouse is still so it can conflict with tabbing
	//Use timeout to show nav to allow the user to quickly mouseover the menu without activating it.
	//On mouseover, set a timeout to show the menu, if the mouse is still over the menu then show
	//it, else don't show it. The status is stored in the data object on the element.
	$('#site-navigation li.primary-nav-item')
		.mouseenter(function(evt) {
			var $elm = $(this);
			$elm.data('mouseover', true); //set mouseover status to true for tracking (see mouseleave below)
			//set timeout, if mouse is still over element then show. allows for quick mouseover without triggering
			setTimeout(function(){if($elm.data('mouseover'))$elm.children('div.subnav-container:hidden').slideDown();},100); })
		.mouseleave(function(evt) {
			var $elm = $(this);
			$elm.data('mouseover', false); 	//set mouseover status to false, value is used in timeout above
			$elm.children('div.subnav-container:visible').slideUp(); //hide the menu
		})
	//blur fires on the 'old' element before focus fires on the 'new' element, so set timeout on blur
	//if focus is set to another element within the same nav then cancel the hide() timeout. This allows
	//any blur (back-tab, mouse click) to hide the menu, but still keep menu open while tabbing
 	$('#site-navigation li.primary-nav-item a')
		.focus(function() {
			var $elm = $(this).parents('.primary-nav-item');
 			$elm.find('.subnav-container').show();
 			clearTimeout($elm.data('timer')); //remove the blur timeout callback
		}).blur(function() {
			var $elm = $(this).parents('.primary-nav-item'); //set local reference on this element
 			//store a handle on the timeout on the wrapper so the focus handler can easily access/cancel it
			$elm.data('timer',setTimeout(function(){$elm.find('div.subnav-container:visible').hide();},100)); //see quirk note above
		});

// ======== hover and focus for tertiary-navigation ============
	$('#section-navigation div.nav-box ul.tertiary-navigation').hide(); //on init, hide menus

	//tertiary nav is a bit different: the <a> can activate/open the menu like a regular menu but
	//it is not closed until the user navigates away from the entire menu. Hence, the mouseenter is
	//on the .nav-box but the mouseleave is on the section-navigation. Like the primary nav, a timeout
	//is used to trigger show so the user can mouseover the menu without triggering the slidedown
 	$('#section-navigation div.nav-box')
		.mouseenter(function(evt) {
		//console.log(this, 'mouseenter');
			var $elm = $(this);
			$elm.data('mouseover', true);	//set mouszeover status to true
			setTimeout(function(){
				if($elm.data('mouseover')){
					$elm.find('ul.tertiary-navigation:hidden').slideDown();
				}
			},100);
		})
		.mouseleave(function(evt) {
		//console.log(this, 'mouseleave');
			var $elm = $(this);
			$elm.data('mouseover', false); 	//set mouseover status to false
		})

//	this should target the entire section-navigation, not the nav-box or tertiary-navigation
//	CK: changed target from '#section-navigation' to '#sidebar-content'
// 	$('#section-navigation')
	$('#sidebar-content')
 		.mouseleave(function(evt){
 			$(this).find('div.nav-box ul.tertiary-navigation').slideUp();
 		})

 	//focus/blur -  see note on primary nav above
 	//target the section navigation links. User can tab down menu, on blur of any element
	$('#section-navigation a')
		.focus(function() {
		//console.log(this, 'focus');
			var $elm = $(this); //get handle on original event target
			//find parent wrapper 'nav-box' then back down to the menu to show
			$elm.parents('div.nav-box').find('ul.tertiary-navigation').show(); //see quirk note above re: show()/hide()
			//a handle on the timer for hiding the tertiary nav is stored in the section-navigation wrapper
			clearTimeout($('#section-navigation').data('timer')); //remove the hide timeout
		}).blur(function() {
		//console.log(this, 'blur');
 			$('#section-navigation').data('timer',setTimeout(function(){$('#section-navigation div.nav-box ul.tertiary-navigation').hide();},100));
		})

});

