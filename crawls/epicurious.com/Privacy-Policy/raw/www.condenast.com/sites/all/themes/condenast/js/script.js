



function closeAllCombos(except)
{

	$('.combo').each(function(index)
	{
		if($(this) != except)
		{
			if($(this).hasClass("expanded"))
		{
			$(this).removeClass("expanded");
			$(this).find('ul').hide();
			
		}
		
		}
	});
	
}


// global spinner
GlobalSpinner = {
	show: function() {
		var el = $('<div/>').attr('id', 'global-spinner').hide();
		$('body').append(el);
		var spinner = new Spinner(spinOptions).spin();
		$(spinner.el).css({top: 35, left: 37});
		el.append(spinner.el);

		el.css('left', ($(window).width() / 2) + $('#menu-block').width() / 2);

		el.fadeIn(250);
	},
	hide: function() {
		var el = $('#global-spinner');
		el.fadeOut(250, function() {
			el.remove();
		});
	}

}



$(document).ready(function(){

	var ipad = navigator.platform.indexOf("iPad") != -1;
	var iphone = navigator.platform.indexOf("iPhone") != -1;
	var ipod = navigator.platform.indexOf("iPod") != -1;
	var android = navigator.platform.indexOf("android")>=0;
	// ios4, y u no support position:fixed?
	if(false)
	{
		if(parseInt((navigator.userAgent.split("CPU OS ")[1]).split(" ")[0]) < 5)
		{
				$('#container').css({'position': 'absolute', 'top': '0', 'bottom': '0', 'width':'100%'});
				// $('#container').css({'position': 'absolute', 'top': '0', 'bottom': '0', 'width':'100%'});
				$('#topnavcorner').appendTo('body');
				// $('#topnavcorner').css({'position':'absolute', 'top':$(document).scrollTop()});
				document.body.addEventListener('touchmove', function(e)
				{
					e.preventDefault();
				}, false);
				var ipadScroller = new $.ipadscroller($('#container'));
				// var scroller = new TouchScroll(document.querySelector("#container"));

			}
	}

 
 $(window).resize(function() {
		$('#topnav a.logo').css('left', $(window).width() < 1200 ? '20px' : '10px');
		return arguments.callee;
 }());
	$('#topnav .logo').each(function(index)
	{
		var h = $(this).find('img').parent().height();
		var w = $(this).find('img').parent().width();
		var lh = 0;
		var lw = 0;
		if($.browser.msie)
		{
			var lh = $(this).find('img').height();
			var lw = $(this).find('img').width();  
		}
		else
		{
			var lh = $(this).find('img').attr('height');
			var lw = $(this).find('img').attr('width');
		}
		//console.log("hihi", " ", w, " ", h, " ", lw, " ", lh);
		$(this).find('img').css({top:Math.round(h / 2 - lh / 2)+"px", left:Math.round(w / 2 - lw / 2)+"px"});

	});

	$('#topnav .menu li').each(function(index)
	{
		
		if($(this).hasClass('expanded') && $(this).parent().parent().hasClass("container") && !$(this).find('a').hasClass('fairchild')) /* eow */
		{
			$(this).find('a').first().wrapInner('<span class="v"/>');
			$(this).find('.menu a').wrapInner('<span/>');
			if(ipad || iphone || ipod || android)
			{
				 $(this).click(function(e)
				{
					if(jQuery.data(this, 'timeoutID') == '' || jQuery.data(this, 'timeoutID') == undefined)
					{
						e.preventDefault();
						window.clearTimeout(jQuery.data(this, 'timeoutID'));
						var elem = $(this);
						var tid = window.setTimeout(function() { elem.find('.menu').first().slideDown('fast'); }, 200);
						jQuery.data(this, 'timeoutID', tid);
					}
					else
					{
						//out
						window.clearTimeout(jQuery.data(this, 'timeoutID'));
						$(this).find('.menu').first().hide();
						jQuery.data(this, 'timeoutID', '');
					}
				});
			}
			else
			{
				 $(this).hover(function()
				{
					window.clearTimeout(jQuery.data($(this), 'timeoutID'));
					var elem = $(this);
					var tid = window.setTimeout(function() { elem.find('.menu').first().slideDown('fast'); }, 200);
					jQuery.data(this, 'timeoutID', tid);
				}, function()
				{
					window.clearTimeout(jQuery.data(this, 'timeoutID'));
					$(this).find('.menu').first().hide();
				});
			}
		}
	});

	$('.scociallabel').each(function(index)
	{
			//console.log($(this).outerWidth(), $(this).parent().outerWidth()); 
			if(!$.browser.mozilla)
			{
				var pos = -Math.round($(this).outerWidth() / 2) + Math.round($(this).parent().outerWidth() / 2);
			}
			else
			{
			 var pos = -Math.round($(this).outerWidth() / 2) + Math.round($(this).parent().outerWidth() / 2) + $(this).parent().position().left; 
			}
			$(this).css("left", pos+"px");
			$(this).parent().hover(function()
			{
				$(this).parent().css("z-index", "100")
			}, function()
			{
				$(this).parent().css("z-index", "0")
			});
	});
	 
	$('.metrics #lastupdate span').each(function(index)
	{
			var pos = -Math.round($(this).outerWidth() / 2) + Math.round($(this).parent().outerWidth() / 2);
			$(this).css("left", pos+"px");
			$(this).parent().hover(function()
			{
				$(this).parent().css("z-index", "100")
			}, function()
			{
				$(this).parent().css("z-index", "0")
			});
	});
	$('.metrics #sources span').each(function(index)
	{
			var pos = -Math.round($(this).outerWidth() / 2) + Math.round($(this).parent().outerWidth() / 2);
			$(this).css("left", pos+"px");
			$(this).parent().hover(function()
			{
				$(this).parent().css("z-index", "100")
			}, function()
			{
				$(this).parent().css("z-index", "0")
			});
	});
	$('.combo').each(function(index)
	{
//      $(this).find('ul').scrollbars();
			$(this).find('span').click(function(event)
			{
				event.stopPropagation();
				if($(this).parent().hasClass("expanded"))
				{
					$(this).parent().removeClass("expanded");
					$(this).parent().find('ul').hide();
				}
				else
				{
					closeAllCombos($(this).parent);
					$(this).parent().addClass("expanded");
					$(this).parent().find('ul').slideDown('fast');
				}
			});


		 

	});


	$('.bottom-tout .dagnyBody').each(function(index)
	{
			$(this).css('height', Math.max($('.bottom-tout .dagnyBody').height()));
	});
	 
	$('.brands-search-box').each(function(index)
	{
		$(this).find('input').focus(function()
		{
			$(this).parent().addClass('focus');
			if($(this).val() == "Search brand news")
			{
				$(this).val("");
			}
		});
		$(this).find('input').blur(function()
		{
			$(this).parent().removeClass('focus');
		});
		$(this).find('input').hover(function()
		{
			if($(this).val() == "" && (!$(this).parent().hasClass('focus')))
			{
				$(this).val("Search brand news");
			}
		}, function()
		{
			if($(this).val() == "Search brand news")
			{
				$(this).val("");
			}
		});
	});

	$('.press-search-box, .generic-search-box, .white-search-box').each(function(index)
	{
		$(this).find('input').focus(function()
		{
			$(this).parent().addClass('focus');
			if($(this).val() == "Search")
			{
				$(this).val("");
			}
		});
		$(this).find('input').blur(function()
		{
			$(this).parent().removeClass('focus');
		});
		$(this).find('input').hover(function()
		{
			if($(this).val() == "" && (!$(this).parent().hasClass('focus')))
			{
				$(this).val("Search");
			}
		}, function()
		{
			if($(this).val() == "Search")
			{
				$(this).val("");
			}
		});
	});



	$('html').click(function()
	{
		closeAllCombos(null);
	});
	
	
	// corner
	/*$(window).scroll(function(e) {
		var l = $('#admin-menu').height();
		$('a.corner').css('top', $('body').scrollTop() <= l ? l - $('body').scrollTop() : 0);
	}).scroll();*/
	
	$('a#topnavcorner').click(function(e) {
		$('body').animate({scrollTop: 0});
		e.stopPropagation();
		return false;
	});

	$('#highlight div').first().adjustChildHeights();
	$('#brand-news-settings').css('display', 'block');
	$('#brand-news-settings form').adjustChildHeights();
	$('#brand-news-settings').css('display', 'none');


	// contacts email form
	if ($('.brand-brand-contacts form').length > 0) {
		$('.brand-brand-contacts form').submit(function(e){

			var errors = 0;
			// validate
			if ($('.brand-brand-contacts form #name').val().length == 0) {
				$('.brand-brand-contacts form #name').parent().addClass('error').find('.error').show();
				errors++;
			}
			else
				$('.brand-brand-contacts form #name').parent().removeClass('error').find('.error').hide();

			if ($('.brand-brand-contacts form #email').val().indexOf('@') == -1) {
				$('.brand-brand-contacts form #email').parent().addClass('error').find('.error').show();
				errors++;
			}
			else
				$('.brand-brand-contacts form #email').parent().removeClass('error').find('.error').hide();

			if ($('.brand-brand-contacts form #question').val().length == 0) {
				$('.brand-brand-contacts form #question').parent().addClass('error').find('.error').show();
				errors++;
			}
			else
				$('.brand-brand-contacts form #question').parent().removeClass('error').find('.error').hide();
				

			if (errors != 0) 
				return false;

			var form = $(this);
			var url = $(this).attr('action');
			var data = $(this).serialize() + '&o=contact_form';
			$.ajax({
				url: url,
				data: data,
				type: 'POST',
				dataType: 'json',
				success: function(data) {
					if (data.success) {
						form.hide();
						$('.form .success-message').show();
					}
					else {
						form.hide();
						$('.form .error-message').show();
					}
				},
				error: function() {
					form.hide();
					$('.form .error-message').show();
				}    
			});

			e.stopPropagation();
			return false;
		});

		$('.brand-brand-contacts form input, .brand-brand-contacts form textarea' ).keyup(function(e){
			$('.brand-brand-contacts form #send').removeClass('disabled').removeAttr('disabled');
		});

		$('.brand-brand-contacts form #clear').click(function(e){
			$('.brand-brand-contacts form .field input, .brand-brand-contacts form .field textarea').val('');
			$('.brand-brand-contacts form #send').addClass('disabled').attr('disabled', 'disabled');
			$('.brand-brand-contacts form .field .row .error').hide();
			$('.brand-brand-contacts form .field').removeClass('error');
		});
		
		$('.brand-brand-contacts form .brand').dropkick({
			theme : 'white',
			change: function(value, label) {
				$('.brand-brand-contacts form #send').removeClass('disabled').removeAttr('disabled');
			}
		});

	}

	// product licensing
	if($('body.product-licensing').length > 0) {
		$('select').dropkick({
			theme : 'white',
			change: function(value, label) {
				location.href = value;
			}
		});
	}

	// brands landing
	if($('body.brands-landing').length > 0) {

		 $('select[name="media-kits-types"]').dropkick({
			theme : 'white',
			change: function(value, label) {
					console.log( "CLICK: " + value + ' ' + label );
				if (value != -1) {
					$('#brands ul li').each( function() {
						if ( $(this).hasClass( value ) ){
							$(this).fadeIn();
						} else {
							$(this).fadeOut();
						}
					});
				} else {
					$('#brands ul li').each( function() {
						$(this).fadeIn();
					});
				}
			}
		});

		$('select').dropkick({
			theme : 'white',
			change: function(value, label) {
				console.log( "wrong CLICK: " + value + ' ' + label );
				if (value != -1)
					location.href = value;
			}
		});
	}

	var heritageOpen = false;
	$('#heritageBtn').click( function(e) {
		if (!heritageOpen) {
			GlobalSpinner.show();
			openHeritage();
			heritageOpen = true;
		}

		e.stopPropagation();
		return false;
	});

	function openHeritage(){
		$('head').find('script').each ( function() {
				if ( $(this).attr('src') == "/sites/all/themes/condenast/js/libs/jquery.mousewheel.min.js" ){ 
						$(this).remove();
				}
				if ( $(this).attr('src') == "/sites/all/themes/condenast/js/heritage.js" ){ 
						$(this).remove();
				}
		});  

		$.getScript("/sites/all/themes/condenast/js/libs/jquery.mousewheel.min.js");
	 
		$.getScript("/sites/all/themes/condenast/js/heritage.js");
	}

	if(navigator.userAgent.match(/iPad/i) != null)
	{

		$('.combo').each(function()
		{
			var list = $(this).find('ul');
			var select = $(document.createElement('select')).insertBefore($(this).hide()).addClass('ios').css({'position': 'relative', 'visibility':'visible', 'top':'auto', 'margin-bottom':'10px',
'-webkit-appearance': 'button',
'display': 'block',
// 'background-image': 'url(../images/combo_v.png)',
// 'background-image': 'url(../images/combo_v.png), -moz-linear-gradient(top, #1F1E1F 0%, black 100%)',
// 'background-image': 'url(../images/combo_v.png), -webkit-gradient(linear, left top, left bottom, color-stop(0%,#1F1E1F), color-stop(100%,black))',
// 'background-image': 'url(../images/combo_v.png), -webkit-linear-gradient(top, #1F1E1F 0%,black 100%)',
// 'background-image': 'url(../images/combo_v.png), -o-linear-gradient(top, #1F1E1F 0%,black 100%)',
// 'background-image': 'url(../images/combo_v.png), -ms-linear-gradient(top, #1F1E1F 0%,black 100%)',
// 'background-image': 'url(../images/combo_v.png), linear-gradient(top, #1F1E1F 0%,black 100%)',
// 'background-color': '#1F1E1F',
// '-webkit-background-size': '12px 2px, 100%',
// '-moz-background-size': '12px 2px, 100%',
// 'background-size': '12px 2px, 100%',
// 'background-position': 'center right',
// 'background-repeat': 'no-repeat',
'-webkit-border-radius': '3px',
'-khtml-border-radius': '3px',
'-moz-border-radius': '3px',
'border-radius': '3px',
'padding': '4px 0 4px 7px',
'-webkit-box-shadow': '0 1px 2.5px rgba(0,0,0,.25)',
'-moz-box-shadow': '0 1px 2.5px rgba(0,0,0,.25)',
'box-shadow': '0 1px 2.5px rgba(0,0,0,.25)',
'font-size': '11px',
'line-height': '19px',
'color': 'white',
'border': 'none',
'width': '180px',
'left': 'auto',
'margin-left':'auto',
'margin-right':'auto'




		});
			var option = $(document.createElement('option')).appendTo(select).val('').html($(this).find('span').text());
			$('>li a', list).each(function()
			{
				var target = $(this).attr('target');
				var option = $(document.createElement('option')).appendTo(select).val($(this).attr('href')).html($(this).html());
			});
			select.change(function(){
						var lnk = $(this).find('option:selected').val();
						if(lnk != '')
							document.location.replace(lnk);
							return false;
							// window.open(lnk, '_blank');
				});
		});
	}

});
