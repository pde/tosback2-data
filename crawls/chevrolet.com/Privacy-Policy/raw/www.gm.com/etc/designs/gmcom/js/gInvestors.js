/* Javascript Functionality for GM Investors
 *  
 * Roger Blanton (roger.blanton@mrmworldwide.com)  
*/
$(document).ready(function(){
	
	$('li.webcast a').click(function(e) {
		e.preventDefault();
		generateWebcastModal($(this));
	});
	
	$('#webcastClose').live('click' , function(e) {
		e.preventDefault();
		$('#iFrameModal').remove();
	});
	
	if ( $('body').attr('id') == 'contacts') {
		$( '.modalPopOutTarget' ).modal({ hideOrRemove : 'hide'});
	}
	
	if($('form').attr('action') != "/content/gmcom/home/company/investors/stock-financial/investment_calculator.html" ) {
		$('#form_hist_lookup div.filters select').change(function(){
				filterSubmitChange();
		});
	}
	
	/*Analyst Coverage Table Backgrounds */
	
	$('div.analystCoverage tbody tr:odd').addClass('light');
	$('div.analystCoverage tbody tr:even').addClass('dark');
	//dynamically update width of uppertitle so it matches the shaded container below
	
	$(window).resize(function() {
		updateTitleWidth();
	})
	
	function updateTitleWidth() {
		$('.upperTitle').css('width' , $('.upperTitle + .shadedContainer').width());
	}
	
	updateTitleWidth();
	//Add whatever the page name is to the class attribute on the HTML tag.
	
	addClassToHTMLTag();
	
	$('div.top_link_menu ul li').first().find('a').css('border', '0');
	
	/*Historical Releases Dropdown Filter Functionality */
	$('body#earning-releases select[name="quarter_year"]').change(function(){
		toggleResources();
	});
	
	$('body#stockholder-information select[name="quarter_year"]').change(function () {
		toggleReports();
	});
	
	if ( $('body').attr('id') == "stockholder-information" ) {
		toggleReports();
	}
	
	if ( $('body').attr('id') == "earning-releases" ) {
		toggleResources();
	}
	
	/* Sales and Production Historical Releases Filters */
	
	if ($('body').attr('id') == "sales-production" )  {
		toggleHistoricalReleases();
	}

	$('body#sales-production select[name="quarter_year"]').change(function() {
		toggleHistoricalReleases();
	});
	
	/*Request By Mail on Contact Page */
	
	if ( $('body').attr('id') == "contacts" ) {
		
		$.urlParam = function(name){
		    var results = new RegExp('[\\#&]' + name + '=([^&#]*)').exec(window.location.href); //regular expression to find the parameter you give it
		    if (results) //if there is a hash tag value returned
		    	return results[1] || 0; 
		}		
		var success = $.urlParam('success'); //get the success value from email		
		if (success) { // if it was succuessful show thank you message
			$('div#content').prepend('<div class="thankYouDiv"><a href="javascript:void(0)" id="closeBtn">Close</a></div>');
		}
		
		$('a#closeBtn').click(function() { //close button for thank you window
			$('div.thankYouDiv').remove(); //remove the thank you window
			window.location.hash=""; //remove the hash so the div doesn't show up on refresh again
		});
		
		$('#theForm').live('submit' , function(e) { 
		//	e.preventDefault();
		//	$form = document.forms["theForm"];
		//	console.log('the form' , $form);
			
			valid = true;

	        errorMsg = 'Please enter your ';
	        errorField = [];


	        $(this).find('.blank').removeClass('blank');

	        $(this).find('input.required:visible').each(function(){	        	
	            if($.trim($(this).val()) == ''){
	                //console.log($(this).attr('id') + '->'+$(this).next().attr('id'));
	                $(this).next('span.requiredStar').addClass('blank');

	                errorField[$(this).attr('class').replace('required _', '')] = $("label[for='" + $(this).attr('id') + "']").text()
	                valid = false;
	            }
	        });

	        //console.log($(this).find('input.rsDoc:checked').length);
	        if($(this).find('input.rsDoc:checked').length == 0){
	            $(this).find('#rsDocuments').addClass('blank');
	            errorField[5] = $("#rsDocuments-label").text()
	            valid = false;
	        }


	        if($.trim($(this).find('#email').val()) != '' && !validateEmail($(this).find('#email').val())){
	            $(this).find('#email').next('span.requiredStar').addClass('blank');
	            errorField[$(this).find('#email').attr('class').replace('required _', '')] = "Valid " + $("label[for='" + $(this).find('#email').attr('id') + "']").text()
	            valid = false;
	        }


	        if(valid){
	            // do nothing just let it submit
	            $('#errorMsg').text('');

	        }else{
	            e.preventDefault();
	            for (var i = 0, max = errorField.length; i < max; i++) {
	                if(typeof errorField[i] != 'undefined' && errorField[i] != ''){
	                    errorMsg += errorField[i] + ', ';
	                }
	            }
	           $('#errorMsg').text(errorMsg.substring(0,errorMsg.length - 2));
	        }
		});
		
	}
	
	/* Investors News Archive Page */
	
	if( $('body').hasClass('investorsnewsarchivepage') ) {
		var resultsCount = $('div.resultCount h3').text().split(" ")[0];
		if (resultsCount == 0) {
			if ( $('body').attr('id') == "announcements-events" ) {
				$('div.resultsWrapper').first().after('<p>There are no announcements or events that match your criteria.</p>');
			} else {
				$('div.resultsWrapper').first().after('<p>There are no news stories that match your criteria.</p>');
			}
		}
	}
	
});

/* Historical Releases Filter Functionality */

function toggleHistoricalReleases() {
	var filterMonth = $('select[name="quarter_year"]').eq(0).val(),
		filterYear = $('select[name="quarter_year"]').eq(1).val();
		console.log('filterYear' , filterYear);
		console.log('filterYear' , filterMonth);
		$('.historical_releases ul.content li').each(function() {

			if ( $(this).hasClass(filterMonth) && $(this).hasClass(filterYear)  ) {
				$(this).show();
			} else {
				if ( !$(this).hasClass('dropdown') )
					$(this).hide();
			}
		});
}



function toggleResources() {		
		var filterValue = $('select[name="quarter_year"]').val();
		if (filterValue) {
			$('.historical_releases').find('li').each(function() {
				
				if ( $(this).hasClass(filterValue) ) {
					$(this).show();
				} else {
					if ( !$(this).hasClass('dropdown') )
					$(this).hide();
				}
			});
			
			if ( filterValue.indexOf("ALL") > -1 ) {
				filterValue = filterValue.split('_');
				$('li[class*="'+ filterValue[1]+'"]').show();
			}
		}
}

function toggleReports() {
	var filterValue = $('select[name="quarter_year"]').val();
	if (filterValue) {
		$('.annualReports').find('li').each(function() {
			
			if ( $(this).hasClass(filterValue) ) {
				$(this).show();
			} else {
				if ( !$(this).hasClass('dropdown') )
				$(this).hide();
			}
		});
		
		if ( filterValue.indexOf("ALL") > -1 ) {
			filterValue = filterValue.split('_');
			$('li[class*="'+ filterValue[1]+'"]').show();
		}
	}
}



function addClassToHTMLTag() {
	var bodyTag = $('body').attr('id');
	if ($('body').hasClass('simplepage')) {
		bodyTag = 'simplepage';
	}
	$('html').addClass(bodyTag);
}

function filterSubmitChange() {
	var $form = $('form'),
		query = $form.serialize(),
		obj = {};
	
	query.replace(
		new RegExp("([^?=&]+)(=([^&]*))?", "g"),
		function($0, $1, $2, $3) { obj[$1] = $3; }
	);
	
	if( $form.attr('id') != "form_stock_graph" ) {
		for (var i in obj) {
			if (!obj[i].length) {
				return;
			}
		}
	}
	$form.submit();
	
}



/* Investors disclaimer */

/**
 * @author tony.herford
 * original: /gm_investors/js/disclaimer.js
 * this mod: jason.campbell
 */

var iTop = 0;
var offset = 0;
var tracking = {disclosure:'INVESTOR INFORMATION | ADDITIONAL DISCLOSURES', terms:'INVESTOR INFORMATION | TERMS CONDITIONS'};

function createDisclosure(linkLabel, header, content, id){

	if(typeof id == 'undefined') id = "disclosure";
	jQuery('#disclosureLinks').append("<span class='disclosure-link' id='"+id+"-link'><a href='#' onclick='return false;'>" + linkLabel + "</a></span>");
	jQuery('#disclosureLinks').after(
		"<div class='disclosure-container' id='"+id+"-container'' >" +
			"<div id='mobile-closer' style='position:absolute;z-index:99999;height:100%;width:600px;'></div>"+
			"<div id='"+id+"-bg'>" +
				"<div id='title'>"+header+"</div>" +
				"<div class='disclosure-scroll-box' id='"+id+"-scroll-box'>" +
					"<div class='disclosure-content' id='"+id+"-content''>" + content + "</div>" +
				"</div>" +
				"<div class='scroll-btns' id='"+id+"-scroll-btns'>" +
					"<img class='scroll-up'id='"+id+"-scroll-up' src='/etc/designs/gmcom/images/gInvestors/up_arr.png'>" +
					"<img class='scroll-down' id='"+id+"-scroll-down' src='/etc/designs/gmcom/images/gInvestors/down_arr.png'>" +
				"</div>" +
			"</div>" +
			"<div id='"+id+"-bottom'>&nbsp;</div>" +
		"</div>"
	);
//	jQuery('#disclosureLinks').parents('.shadedContainer').after(jQuery('#terms-container'));

	if(jQuery('body').hasClass('mobile'))
		jQuery('#terms-container').css({top:'600px'});
	else
		jQuery('#auxiliaryNavigation').prepend(jQuery('#terms-container'));
	
	$('#terms-bg').css('background','url(/etc/designs/gmcom/images/tc_bg.png) no-repeat');
	var timer,
		hideTimer,
		event = {};

	jQuery('#'+id+'-link a').mouseenter(function()
	{
		timer = setTimeout('showDisclosure("'+id+'")', 500);
	});
	jQuery('#'+id+'-link a').mouseleave(function()
	{
		clearTimeout(timer);
		//hideDisclosure();
	});
		//jQuery('#'+id+'-close').live( "click", function(){
		//	hideDisclosure(id);
		//});
	jQuery('body').hasClass('mobile')?
	disclaimerCloser='#mobile-closer':
	disclaimerCloser='#'+id+'-container';
	jQuery(disclaimerCloser).live( $('body').hasClass('mobile')?"click":"mouseleave", function()
	{
		clearTimeout(timer);
		hideTimer = setTimeout( 'hideDisclosure( "' + id + '" )', 500 );
	});
	jQuery('#'+id+'-container').live( "mouseenter", function()
	{
		clearTimeout( hideTimer );
	});
	jQuery('#'+id+'-scroll-down').click(function (){
			iTop -= 200;
			if(iTop < offset) iTop = offset;
			jQuery('#'+id+'-content').animate({
				top: iTop
			},500);
			//console.log(iTop + " = " + offset);
			if(iTop <= offset)
			{
				jQuery('#'+id+'-scroll-down').hide();
			}
			jQuery('#'+id+'-scroll-up').show();
			return false;
		});
	jQuery('#'+id+'-scroll-up').click(function (){
			iTop += 200;
			if(iTop > 0) iTop = 0;
			jQuery('#'+id+'-content').animate({
				top: iTop
			},500);
			if(iTop == 0)
			{
				jQuery('#'+id+'-scroll-up').hide();
			}
			jQuery('#'+id+'-scroll-down').show();
			return false;
		});
}

var animating = false;

function showDisclosure(id)
{
//	disclaimerInitTop=document.getElementById('auxiliaryNavigation').offsetTop;
//	negTop=disclaimerInitTop-(disclaimerInitTop*2);
	disclaimerInitTop=parseInt($('#terms-bg').css('height'));
	negTop=disclaimerInitTop-(disclaimerInitTop*2);
	
		$('#terms-container').css({
		marginTop:negTop
	});

	if(!animating)
	{
		animating = true;
		// reset to top each time it shows
		jQuery('#'+id+'-content').css({top: 0});
		jQuery('#'+id+'-scroll-down').show();
		jQuery('#'+id+'-scroll-up').hide();

		jQuery('#'+id+'-container').slideDown(400, function(){
			// get the disclosure pop-up height
			var containerHeight = (id == 'terms') ? 400 : 250;//had to hard code it for opera //jQuery('#disclosure-scroll-box').height();
			var contentHeight = jQuery('#'+id+'-content').height();
			var maxHeight = 0;

			if (contentHeight < containerHeight)
			{
				maxHeight = contentHeight
			}else
			{
			 	maxHeight = containerHeight
			}
			jQuery('#'+id+'-scroll-box').animate({height:maxHeight}, 400);
			offset = containerHeight - jQuery('#'+id+'-content').height();
			if(offset <= 0) jQuery('#'+id+'-scroll-btns').slideDown(400).delay(400);
			animating=false;
			
			jQuery('#'+id+'-scroll-btns').css('zIndex','9999');
		});
			jQuery('#disclosureLinks').css('visibility','hidden');
	}
}

function hideDisclosure(id)
{
	if(!animating)
	{
		animating = true;
		jQuery('#'+id+'-container').slideUp(400, function(){animating=false;});
		jQuery('#disclosureLinks').css('visibility','visible');
	}
}

// for testing
jQuery(document).ready(function()
{

	if(location.href.indexOf('/investors') > -1){
		// create holder for links
		
																			//somehow the script loads twice
		//		if(jQuery('div#disclosureLinks').length<=0){
					
					//get the authored content
					var grabContent=jQuery('div.parbase.disclaimer > .rollOverDetails>.tipText').html();
					//clear content from target container
					jQuery('div.parbase.disclaimer').html("");
					
					jQuery('div.parbase.disclaimer').append("<div id='disclosureLinks'></div>")
									
					createDisclosure("View Terms And Conditions", "", grabContent, "terms");
		//		}
			

	}
	
	/* home page brand links borders/states */
	if($('body').attr('id')=='investors')
		brandIconStates();

});

/* END Investors disclaimer */

function validateEmail(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.match(re)
}



/* home page brand links borders/states */
function brandIconStates(){
	var itemParent=$('.subsection_image_link_container:nth-child(2)').children('ul');
	var itemAnchors=itemParent.find('a');
	itemAnchors.css('height','97px');
	
	/* hide ie,ff link borders on new window */
	itemAnchors.mouseup(function(){$(this).blur();});

	itemParent.find('li').each(function(index){

		if(index==0){
			$(this).css({
				background:'url(/etc/designs/gmcom/images/gInvestors/brandLockUp-left.png) no-repeat #0C0F14',
				width:'140px',
				height:'99px',
				border:'none'
			});
		}
		else if(index==6){
			$(this).css({
				background:'url(/etc/designs/gmcom/images/gInvestors/brandLockUp-right.png) -1px 0 no-repeat #0C0F14',
				width:'140px',
				height:'99px',
				border:'none'
			});
		}
		else{
			$(this).css({
				background:'url(/etc/designs/gmcom/images/gInvestors/brandLockUp-center.png) 0 0 no-repeat #0C0F14',
				width:'140px',
				height:'99px',
				border:'none'
			});
		}
		$(this).hover(function(){$(this).css('backgroundColor','#1c1f23');},function(){$(this).css('backgroundColor','#0C0F14');});
	});
	
}

function generateWebcastModal($src) {
	
	var iFrame = '<iframe id="iframeWebcast" height="375" frameborder="0" width="557" allowtransparency="true" src="'+$src.attr('href')+'" />';
	
	$('div#content').prepend(iFrame);
	$('#iframeWebcast').wrap('<div id="iFrameModal">');
	$('#iFrameModal').prepend('<a href="javascript:void(0);" id="webcastClose">Close</a>');
}