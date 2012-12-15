/* Javascript Functionality for GM Investors
 *
 * Roger Blanton (roger.blanton@mrmworldwide.com)
*/
$(document).ready(function(){
//	$('li.webcast a').attr('href',' http://edge.media-server.com/m/p/5cxac6oz/lan/en');

	if ( $('body').attr('id') == 'contacts') {
		$( '.modalPopOutTarget' ).modal({ hideOrRemove : 'hide'});
	}

	if($('form').attr('action') != "/content/gmcom/home/company/investors/stock-financial/investment_calculator.html" ) {
		$('#form_hist_lookup div.filters select').change(function(){
				filterSubmitChange();
		});
	}

	/*Analyst Coverage Table Backgrounds */

	$('div.analystCoverage tbody tr:odd, body#fundamentals table tbody tr:odd').addClass('light');
	$('div.analystCoverage tbody tr:even, body#fundamentals table tbody tr:even').addClass('dark');
	//dynamically update width of uppertitle so it matches the shaded container below


	//ie is retarded
	if($('html').hasClass('ie8')){

		var topNavLinktext='';

		$('ul#topMenuNav li').bind({

			mouseenter:function(){
        		$(this).children('a').addClass('hover');

        		if($(this).attr('class')==='')
    	    		topNavLinktext=$(this).children('a').html();

			},
			mouseleave:function(){

        		$(this).children('a').removeClass('hover');

        		if($(this).attr('class')==='')
   	     		$(this).children('a').html(topNavLinktext);

			},
			click:function(){
				window.location.href=$(this).children('a').attr('href');
			}
     });
	}


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

				var valid = true;

	       var errorMsg = 'Please enter your ';
	        var errorField = [];


	        $(this).find('.blank').removeClass('blank');

	        $(this).find('input.required:visible').each(function(){
	            if($.trim($(this).val()) == ''){
	                //console.log($(this).attr('id') + '->'+$(this).next().attr('id'));
	                $(this).next('span.requiredStar').addClass('blank');
	                errorField[$(this).attr('class').replace('required _', '')] = $("label[for='" + $(this).attr('id') + "']").text();
	                valid = false;
	            }
	        });

	        //console.log($(this).find('input.rsDoc:checked').length);
	        if($(this).find('input.rsDoc:checked').length == 0){
	            $(this).find('#rsDocuments').addClass('blank');
	            errorField[5] = $(".ui-checkbox").text();
	            valid = false;
	        }
for(i in errorField){
	console.log('field'+i+':'+errorField[i]);

}

	        if($.trim($(this).find('#email').val()) != '' && !validateEmail($(this).find('#email').val())){
	            $(this).find('#email').next('span.requiredStar').addClass('blank');
	            errorField[$(this).find('#email').attr('class').replace('required _', '')] = "Valid " + $("label[for='" + $(this).find('#email').attr('id') + "']").text();
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



	if($('body').attr('id')==='earning-releases'){

		$('.historical_releases ul.content li h4').each(function(){
				if($(this).parent().hasClass('headline')){
					caption=$(this).text();
					$(this).text('');
				 	cap_1=caption.slice(0,57);
				 	cap_2=caption.slice(57,caption.length);
				 	$(this).html(cap_1+'<br />'+cap_2);
				}
			});
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







function validateEmail(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.match(re)
}




