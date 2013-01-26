var queryString = {};

$(window).load(function() {
	$('button.button, button.submit, a.button, a.submit').wrapInner('<span class="s1"><span class="s2"></span></span>').addClass('costco-button');
	
	// set up some jquery UI defaults
	if(typeof wcs!="undefined")
		$.datepicker.setDefaults( { dateFormat:wcs.DATE_FORMAT } );
	
	var popup = $('#fsa-popup');
	popup.hide();
	$('.fsa-popup-action').click(function() {
		popup.dialog({ title: messages.PDETAIL_FSA, 
				  modal : true,
				  width : 800,
				  resizable : false,
				  draggable : false, show: 'fade',
				  buttons: {'Close': function() { $(this).dialog('close'); return false; }}
	    		});
		return false;
	});
	
});

function jqConfirm(title,message,trueCallback,falseCallback) {
	$('<div class="confirm" title="'+title+'"><p>'+message+'</p></div>').dialog({
		resizable: false,
		height: 'auto',
		width: 500,
		modal: true,
		buttons: {
			"Yes" : function() {
				$(this).dialog("close").remove();
				if(typeof(trueCallback)=='function') trueCallback();
			},
			"No" : function() {
				$(this).dialog("close").remove();
				if(typeof(falseCallback)=='function') falseCallback();
			}
		}
	});
}

$(window).load(function() {
	var a =	window.location.search.substr(1).split('&'), b;
	for(var i=0;i<a.length;i++) {
		b = a[i].split('=');
		queryString[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
	}
	
	
	
	$(".html-tooltip").hover(
		function(e) {
			if($(this).parents('.disabled').length == 0) {
				this.t = this.title;
				this.title = "";									  
				$("body").append("<p id='tooltip'>"+ $(this).next('.tooltip').html() +"</p>");
				$("#tooltip").css({'top' : (e.pageY - yOffset) + "px", 'left' : (e.pageX + xOffset) + "px" }).show();
			}
		},
		function() {
			if($(this).parents('.disabled').length == 0) {
				this.title = this.t;		
				$("#tooltip").remove();
			}
		}).mousemove(function(e){
			var border_top = $(window).scrollTop();
			var border_right = $(window).width();
			var left_pos;
			var top_pos;
			var offset = 15;
			if(border_right - (offset *2) >= $("#tooltip").width() + e.pageX){
				left_pos = e.pageX+offset;
				} else{
				left_pos = border_right-$("#tooltip").width()-offset;
				}

			if(border_top + (offset *2)>= e.pageY - $("#tooltip").height()){
				top_pos = border_top +offset;
				} else{
				top_pos = e.pageY-$("#tooltip").height()-offset;
				}
			$("#tooltip")
				.css({left:left_pos, top:top_pos});
		}).append('<span class="tooltip">?</span>');
	
});

function navigateToURL(url) {
	window.location = url;
}

function navigateToProduct(partNum) {
	wcs.productBaseURL
	navigateToURL(wcs.productBaseURL + '&partNumber=' + partNum);
}


function formatCurrency(n, c, d, t) {
	var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


function formatLocalCurrency(v,c) {
	if(wcs.locale == 'fr_CA'){
		return localeSpecificCurrency(v,'fr',c);
	}else{
		return localeSpecificCurrency(v,wcs.locale,c);
	}
	
}

/* Added for defect CIS100064426 
Function to return locale specific formatted currency
v - value to be formatted
loc - locale
*/
function localeSpecificCurrency(v, loc, c) {
	var n = parseFloat(v);
	if(isNaN(v)) return v;
	c = typeof(c) != 'undefined' ? c : 2;
	switch(loc) {
		case 'fr' : return formatCurrency(n, c, ',', ' ') + ' $';
		default : return '$' + formatCurrency(n, c, '.', ',');
	}
}

function emailSubmit(form) {
		var dialog_props = {title: '', modal : true, resizable : false, draggable : false, show: 'fade', width: 400};
		var btns = {};
		btns[messages.JS_DIALOG_OK] = function() { $(this).dialog('close'); }
		dialog_props.buttons = btns;

		$.ajax({  
		  type: "POST",  
		  url: form.action,  
		  data: 'emailSignUp='+form['emailSignUp'].value,
		  success: function() {
			$(form).find('input[type=text]').each(function(){
				$(this).val("");
			});
			}
		});

		$('<div>'+messages.EMAIL_OPT_IN_SUCC+'</div>').dialog(dialog_props);
		$('div.ui-dialog').find('button').addClass('costco-button').addClass('submit');
	    $('div.ui-dialog').find('.ui-button-text').wrap('<span class="s1"></span>');
	    $('div.ui-dialog').find('.ui-button-text').addClass('s2').removeClass('ui-button-text');
		
	return false;
}

$(window).load(function(){

	$("#left_nav .collapsible").each(function() {
		var $list = $(this);
		if($list.find('> li').size() > 5) {
			$list.addClass('collapsed').find('li:gt(4)').addClass('collapsed').hide();
			$("<a href='javascript:void(0);'>"+messages.SEARCH_SHOW_MORE_OPTIONS+" &raquo;</a>").click(function(){
				$list.find('li.collapsed').toggle($list.hasClass('collapsed'));
				$list.hasClass('collapsed') ? $(this).html(messages.SEARCH_SHOW_FEWER_OPTIONS+" &raquo;") : $(this).html(messages.SEARCH_SHOW_MORE_OPTIONS+" &raquo;");
				$list.toggleClass('collapsed');
			}).appendTo($(this)).wrap('<li />');
		}
	});

    generateRatingStars();

	$('.print-link').click(function(){window.print();});
});

function generateRatingStars(){
	$("div.rating, .product-rating").each(function(){
		var v;
		if($(this).find("span").length > 0){
			v = $(this).find("span").width();
		} else {
			v = $(this).text()
			v = v*13;
		}
		$(this).empty().append('<span style="width:'+v+'px;"></span>');
	});
};

function rrComplete(){
	generateRatingStars();
}

$(window).load( function() {
	// adding this to all a tags is maybe a bit extreme, but not that expensive
	$('a').focus(function(){$(this).addClass('focus')});
	$('a').blur(function(){$(this).removeClass('focus')});
	
	// Setup up the navigation drop down elements
	function showDropdown(elem){
		$(this).find('.dropdown').css('visibility','visible');
		$(this).addClass('active');
	}
	function hideDropdown(elem){
		if(($(elem).attr("srcElement")=== undefined) || ($(elem).attr("srcElement").id != 'header_warehouseLocationsNum')){
			$(this).find('.dropdown').css('visibility','hidden');
			$(this).removeClass('active');
		}
	}
	
	if(typeof $().hoverIntent !="undefined") {	
	var hoverIntentConfig = {
			over:showDropdown,
			out:hideDropdown,
			timeout:250
	}
	$('#header_links1').children().hoverIntent(hoverIntentConfig);
	$('#header_links').children().hoverIntent(hoverIntentConfig);
	$('#country-select').hoverIntent(hoverIntentConfig);
	}		
})
	
$.fn.equalHeights = function(px) {
	$(this).each(function(){
		var currentTallest = 0;
		$(this).children().each(function(i){
			if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
		});
		$(this).children().css({'height': currentTallest}); 
	});
	return this;
};

$.fn.grid = function(cols) {
	$(this).each(function(i,e) {
		var $children = $(this).children().not('.rowdivider');
		var rows = Math.ceil($children.length / cols);
		var height = 0;
		for(var r = 0; r < rows; r++) {
			for(var c = 0; c < cols; c++) {
				if(c == 0) $children.eq(r*cols + c).css('margin-left', '0px');
				height = Math.max($children.eq(r*cols + c).height(), height);
			}
			$children.slice(r*cols, r*cols+cols).height(height);
			height = 0;
		}
	});
	return this;
};

$(window).load( function () {
	$('.inline-list').equalHeights();
	$('.grid-4col').grid(4).animate({opacity:1},'slow');
	$('.grid-5col').grid(5).animate({opacity:1},'slow');

	$( ".tabs" ).tabs();
	$('.autoTable').inputTable();
});

$.fn.inputTable = function () {
  
    return this.each(function () {
    	$table = $('tbody',this);
    	
    	$('>tr', $table).bind('keyup focusout mouseup', function() {
    		// if it's the last row, and has an input with a value, add a new row
    		if($(this).is(':last-child:has(input[value!=""])') && $(this).has()) {
    			if ($table.find('tr:last-child  input[name="itemNumber"][value!=""] ').length){
    				//stop clone at 15th row
    				if ($('#itemsTable >tbody >tr').length <= 14){
    					$template.clone(true).insertAfter($('>tr:last',$table));
    				}
    			}
    		}
    	});

    	$('.deleteRow', this).click(function(){
    		if($('> tr', $table).length > 1) {
        		// if there are more than one rows
    			$(this).closest('tr').remove();
    		}
    		else {
        		// if it's the only row, just clear inputs
    			$(this).closest('tr').find('input').val('');
    		}
    	});

    	// wait to clone our template row until all the event handlers have been attached
    	$template = $('tr.template',this).removeClass('template').clone(true);
    	
    });

};

function isOnWhiteList(hostname) {
	if (typeof urlWhitelist == "undefined" || urlWhitelist == null) return false;
	for(var i=0; i<urlWhitelist.length; i++) {
		if (hostname.indexOf(urlWhitelist[i]) > 0) return true;
	}
	return false;
}

$(window).load(function() {
	// Creating custom :external selector
	$.expr[':'].external = function(obj) {
		return !(obj.href.match(/^(mailto|javascript)\:/) || obj.hostname == location.hostname || obj.href == '' || isOnWhiteList(obj.hostname));
			// check URLs against a whitelist here too... && (urlWhitelist.indexOf(obj.hostname)
	};
	
	$('a:external').addClass('external').click(function() {
		var link = $(this).attr('href');
		var isPopup = $(this).hasClass('popup');
		var message1 = messages.JS_DIALOG_OK;
		var message2 = messages.JS_DIALOG_CANCEL;
		var dialog_buttons = {};
		dialog_buttons[message1] = function() { $(this).dialog('close').remove(); isPopup ? openPopup(link) : openWindow(link); };
		dialog_buttons[message2] = function() { $(this).dialog('close').remove(); return false; };
		
		$('<div>' + messages.JS_LEAVING_DOMAIN_ALERT.replace("{0}", this.hostname) + '</div>')
		.dialog({ title: messages.JS_DIALOG_EXTERNAL_LINK, 
				  modal : true,
				  resizable : false,
				  draggable : false, show: 'fade',
				  height : 'auto',
				  width : 500,
				  buttons: dialog_buttons
	    		});
		var buttons = $('div.ui-dialog').find('button');
		for(var i=0; i<buttons.length; i++){
			if (i % 2==0){
				$(buttons[i]).addClass('costco-button submit');
			}else{
				$(buttons[i]).addClass('costco-button button');
			}
		}
		$('div.ui-dialog').find('.ui-button-text').wrap('<span class="s1"></span>');
		$('div.ui-dialog').find('.ui-button-text').addClass('s2').removeClass('ui-button-text');
		return false;
		});
	// CIS100068375, Security popup removed for customer service link on order history
	//console.log("removing external class from customer service link");
	$("#custserv").removeClass("external");
	$("#custserv").unbind("click");
	$("#custserv").click(function(e){e.preventDefault();e.stopPropagation();window.open(this.href);});
	
	if(typeof $().truncate !="undefined")
		$('.truncate').truncate();
});

function openPopup(url) {
	window.open(url,'popUpWindow','height=700,width=800,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');
}

function openWindow(url) {
	window.open(url);
}


/**
* Opacity animation on hover
* @method hoverFormOpacity
* @public
* @param {Array} forms
*/
hoverFormOpacity = function (forms) {
	var form_elements = $(forms.join());

	for (var i = 0; i < forms.length; i++) {
		$(forms[i]).hover(function () {
			//if (hoverOpacity) {
			
				// Fade out other forms
				form_elements.not("#" + $(this).attr("id")).fadeTo("fast", 0.5);
			
				$(this).fadeTo("fast", 1.0).find("input:visible:first").focus();
			//}
		});
	}
}; 

(function($){
	$.fn.equalWidths = function(options) {
		return this.each(function(){
			var child_count = $(this).children().size();
			if (child_count > 0) { // only proceed if we've found any children
				var w_child = -1;
				for(i=0;i<child_count;i++) {
					w_child = Math.max(w_child, parseFloat($(this).children(':eq('+i+')').outerWidth()) + 1);
				}
				$(this).children().css({ 'width' : w_child + 'px' });
			}
		});
	};
})(jQuery);

$(window).load(function(){
	$('.alphabetical-list').each(function(){
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var h = '';
		for(var i=0;i<alphabet.length;i++){
			$('.alphabetical-item-index:contains('+alphabet[i]+')', this).length > 0 ?
				h += '<li><a href="#'+alphabet[i]+'">'+alphabet[i]+'</a></li>' :
				h += '<li>'+alphabet[i]+'</li>';
		}
		$('.alphabetical-list-index', this).html(h);
	});

	$('.col3').each(function(){
		var c = Math.ceil($(this).children().length / 3);
		for(var x=0; x < 3; x++){
			$(this).children().slice(x,x+c).wrapAll('<div class="column"></div>');
		}
	})
});

$(window).load(function(){
	xOffset = 10;
	yOffset = 30;
	$(".form-item label[title]").hover(function(e){											  
		this.t = this.title;
		this.title = "";									  
		$("body").append("<p id='tooltip'>"+ this.t +"</p>");
		$("#tooltip")
			.css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px")
			.show();
	},
	function(){
		this.title = this.t;		
		$("#tooltip").remove();
	}).mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px");
	}).append('<span class="has-tooltip">&nbsp;</span>');	
});

$(window).load(function(){
	$('a.ClickInfoLink').click(function(){
		$.ajax({url:$('.ClickInfoUrl', this).text()});
	});
});

$(window).load(function(){
	var mainFormElements = $('div#main_content_wrapper input[type=text]').not('input#emailSignUp');
	if (mainFormElements.length > 0)  {
		// Login/Register Page focus
		if ( mainFormElements[0].name == 'logonId' ) {
			var c = $.cookie('PersistantUserCookie');
			if (c) {
				// User signed in before, focus on Registered Shoppers email field. 
				$('#logonId').focus()
			} else if (getUrlParam('type') == 'pwr'){			
				// User may have trouble logging in, requested password reset prior, focus on Registered Shoppers email field. 
				$('#logonId').focus()
			} else {
				// Smells like a fresh user, focus on Not Yet Registered email field.
				$('#register_email1').focus()
			}
		} else {
			$(mainFormElements[0]).focus();
		}
	} else {
		var submitButton = $('div.submit-row').find('button.submit');
		if (submitButton.length > 0){
			// set focus on submit button
			submitButton.focus();
		} else {
			// set focus on search
			$('#SimpleSearchForm_SearchTerm').focus();
		}	
	}	
});

function getUrlParam(name)
{
	 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	 var regexS = "[\\?&]"+name+"=([^&#]*)";
	 var regex = new RegExp( regexS );
	 var results = regex.exec( window.location.href );
	 if( results == null )
		 return "";
	 else
		 return results[1];
}

// When there is a left navigation, then the main content isn't necessarily in the main_content_wrapper div  
$(window).load(function() {
	var mainContent;
	
	if(typeof messages == "undefined")
		return false;
		
	var label = messages.AX_MAIN_CONTENT;
	if ($('#main_content_wrapper h1').size() > 0) {
		mainContent = $($('#main_content_wrapper h1')[0]);
		label = mainContent.html(); 
	}
	
	if (mainContent == null || mainContent.hasClass('fsa-popup')) {
		mainContent = $('#main_content_wrapper');
	}
	
	var mainContentAnchor = $('<a href="javascript:void(0);" id="main_content" class="secondarySkipToMainContent">'+label+'</a>');
	mainContent.before(mainContentAnchor);
	$('.skipToMainContent').click(function() {
		$('#main_content').scrollTop();
		$('#main_content').focus();
		return false;
	});
});

function updateViewAndBeginIndexForLanguageChange(){
	if(document.getElementById('fastFinderResultControls')!=null && document.getElementById('fastFinderResultControls')!='')
	{
		if(document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = document.FastFinderForm.pageView.value;
		}
		if(document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = document.FastFinderForm.beginIndex.value;
		}
	}
	else if(document.getElementById('CategoryDisplay_Widget')!=null && document.getElementById('CategoryDisplay_Widget')!='')
	{
		if(wc.render.getContextById('CategoryDisplay_Context').properties['pageView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('CategoryDisplay_Context').properties['pageView'];
		} 
		if(wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex'];
		} 
	}
	else if(document.getElementById('Search_Result_Summary')!=null && document.getElementById('Search_Result_Summary')!='')
	{
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum'];
		}
	}
}
