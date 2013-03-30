$(document).ready(function() {
	initalise_cabin_display();
	$('select[name=airport]').bind('change', function() 
		{
			if($('select[name=airport] option:selected').val() != '')
			{
				$("input[name='transport']").attr('checked', false);
				$("input[name='transport'][value!='C']").attr('checked', true);
			} else {
				$("input[name='transport']").attr('checked', false);
				$("input[name='transport'][value='C']").attr('checked', true);
			}
		});
	$("input[name='transport']").bind('click', function() 
		{
			if($("input[name='transport']:checked").attr('value') == 'C')
			{
				$('select[name=airport] option:selected').attr('selected', false);
				$('select[name=airport] option[value=""]').attr('selected', true);
			}
		});
		
		
	$('select#card_type').change(function() {
		$('div.card_charges').hide();
               
                if($("input[name='remove_service_charge']:checked").attr('value') == 'on' || $("input[name='no_service']").attr('value') == "TRUE" )
                {
                  $('div#card_charge_' + $(this).val()).show();
                }
                else
                {
                  $('div#minus_card_charge_' + $(this).val()).show();
                }
		
                
	});
	
	$('input.select_cabin').bind('click', function()
		{
			$('input.select_cabin').attr('disabled','disabled');
			$(this).next('input.select_cabin').removeAttr('disabled');
		}
	);
	
	$('input.cabin_option').live('click', function()
		{
			$('input.cabin_option').not(this).removeAttr('checked');
			$('input.select_cabin_button').css('visibility','hidden');
			$(this).parents('.cabin_numbers').next('tr').find('input.select_cabin_button').css('visibility','visible');
			
			/* DOM is rendered differently in different browsers */
			
			if ($(this).siblings('ul.metadata').size() > 0)
			{
				metadata = $(this).siblings('ul.metadata');
			}
			else
			{
				metadata = $(this).parent('label').siblings('ul.metadata');
			}

			/* select the deck plan for this cabin */
			if (metadata.children('li.deck'))
			{
				$('a.deckplan_' + metadata.children('li.deckcode').text()).click();
			}
			
			$('div.cabin_descriptions_' + metadata.children('li.categorycode').text()).hide();
			$('div.cabin_description_' + $(this).val()).show();
		}
	);
	
	$('.cabin_category_keys .category_key').bind('click', function()
		{
			$('.category_key').removeClass('active');
			$(this).addClass('active');
			
			$('.description, .standard_amenities, .additional_amenities, .smoking_policy').hide();
			
			if ($('.cat-' + $(this).text() + '.description').size() > 0)
			{
				$('a#room_layout_link').show();
				first_description = $('.cat-' + $(this).text() + '.description');
			}
			else
			{
				$('a#room_layout_link').hide();
			}
			
			if ($('.cat-' + $(this).text() + '.standard_amenities').size() > 0)
			{
				$('a#standard_amenities_link').show();
				first_description = $('.cat-' + $(this).text() + '.standard_amenities');
			}
			else
			{
				$('a#standard_amenities_link').hide();
			}
			
			if ($('.cat-' + $(this).text() + '.additional_amenities').size() > 0)
			{
				$('a#additional_amenities_link').show();
				first_description = $('.cat-' + $(this).text() + '.additional_amenities');
			}
			else
			{
				$('a#additional_amenities_link').hide();
			}
			
			if ($('.cat-' + $(this).text() + '.smoking_policy').size() > 0)
			{
				$('a#smoking_policy_link').show();
				first_description = $('.cat-' + $(this).text() + '.smoking_policy');
			}
			else
			{
				$('a#smoking_policy_link').hide();
			}
			first_description.show();
			
			$('.room_selection_views:visible:first').addClass('active');
		}
	);
	
	$('input#update_cabin_options').bind('click',function(){
			fetch_cabin_categories($(this).parents('form'));
			return false;
	});
	 
	$('a.room_selection_views').bind('click', function(){
			cabin_grade = $('.category_key.active').text();
			$('a.room_selection_views').removeClass('active');
			$(this).addClass('active');
			$('.description, .standard_amenities, .additional_amenities, .smoking_policy').hide();
                        
			switch (true)
			{
				case $(this).attr('id') == 'room_layout_link':
					$('.cat-' + cabin_grade + '.description').show();
					break;
				case $(this).attr('id') == 'standard_amenities_link':
                                        $('.cat-' + cabin_grade + '.standard_amenities').show();
					break;
				case $(this).attr('id') == 'additional_amenities_link':
					$('.cat-' + cabin_grade + '.additional_amenities').show();
					break;
				case $(this).attr('id') == 'smoking_policy_link':
					$('.cat-' + cabin_grade + '.smoking_policy').show();
			}
	});

	// Passenger details middle name
	function sync_middle_name_state()
	{
		var $tickbox = $(this);
		var $textfield = $('[name="' + $tickbox.attr('name').replace('no_middle_name', 'middle_name') + '"]');
		
		if ( $tickbox.is(':checked') )
		{
			$textfield.val('').attr('disabled', 'disabled');
		}
		else
		{
			$textfield.removeAttr('disabled', 'disabled');
		}
	}
	// When ticking the "no middle name" box, blank and disable the middle name field
	$('[name$="[no_middle_name]"]')
		.bind('click', sync_middle_name_state)
		// also run once on load, to handle state rendered in PHP/Smarty
		.each(sync_middle_name_state);
	
	// fix table layouts for IE6
	if ($.browser.msie && $.browser.version.substr(0,1)<8)
	{
		$('table').each(function(){
				$(this).attr('cellpadding','0').attr('cellspacing','0');
				
		});
	}
})



function initalise_cabin_display()
{
	$('.category_title').each(function(){fetch_cabins($(this))}).css('cursor', 'pointer');
}

function fetch_cabin_categories(passenger_options)
{
	$('td#cabin_category_detail').empty();
	//$('tr#cabin_category_load').show();
	
	basket_id = passenger_options.find('input[name=basket_id]').val();
        cabin_type = $('input[name=cabin_type]:checked').val(); 
	stage = 'cabin-grades';
	adults = passenger_options.find('select[name=adults]').val();
	children = passenger_options.find('select[name=children]').val();
	infants = passenger_options.find('select[name=infants]').val();
	dining = passenger_options.find('select[name=dining]').val();
	transport = passenger_options.find('input[name=transport]:checked').val();
	airport = passenger_options.find('select[name=airport]').val();
        if(airport != ''){
            transport = 'A';
        }

	url = '/components/fetch_data.php?mode=cabingrades&basket_id='+basket_id+'&stage='+stage+'&adults='+adults+'&children='+children+'&infants='+infants+'&dining='+dining+'&transport='+transport;
	
	if (airport)
	{
		url = url + '&airport='+airport;
	}
	
	$.get(url, function(data)
	{
          
		cabin_categories = $(data).find('Data').text();
                
                if(cabin_categories){
		$('tr#cabin_category_load').hide();
		$('td#cabin_category_detail').html(cabin_categories).show();
                var h=$('#passenger_optionss').clone(true);
                var y='<hr style="border:#003882 1px solid" />';
                $('#cabin_category_details').html(cabin_categories).append(y).append(h);
                passenger_options.find('select[name=adults]').val(adults);
                 //$('input[name=cabin_type]').checked=cabin_type;
                 $('input[name="cabin_type"][value='+cabin_type+']').attr("checked", true);
                passenger_options.find('select[name=children]').val(children);
                 passenger_options.find('input[name=transport]:checked').val( transport);
	passenger_options.find('select[name=airport]').val(airport);
                }
                
	});
}

function fetch_cabins(category_row)
{
	//category_code = category_row.find('li.category_code').text();
	category_code = category_row.parents('form').find('[name=cabin_category_code]').val();
	// Find basket_id from a hidden form element
	basket_id = category_row.parents('form').find('[name=basket_id]').val();
	// Find fare code specific to this category
	//fare_code = category_row.find('li.fare_code').text();
	fare_code = category_row.parents('form').find('[name=fare_code]').val();
	// Update Display and unbind click handlers.
	
	category_row.find('.toggle img').hide();
	category_row.find('.toggle img.loading').show();
	
	url = '/components/fetch_data.php?mode=cabins&basket_id='+basket_id+'&cabin_category_code='+category_code+'&fare_code='+fare_code;
	
	if (category_row.parents('form').hasClass('first'))
	{
		url = url + '&first=1';
	}
	
	if (category_row.parents('form').hasClass('first'))
	{
		url = url + '&first=1';
	}

	
	// Ajax call for data.
	$.get(url, function(data)
	{
		cabins = $(data).find('Cabins')
		category_code = cabins.attr('categorycode');
		
		category_row = $('tr.category_row_'+category_code.toUpperCase());
		
		if(cabins.children('Cabin').length > 0) // as long as there is at least one Cabin
		{
			// Update display.
			//cabin_headers = '<tr><th>Cabin</th><th colspan="2">Description</th><th>Select</th></tr>';
			category_row.find('table.cabin_options').replaceWith(cabins.text());
			
			// Display [Hide] button and bind the appropriate handler
			category_row.find('.toggle img').hide();
			category_row.find('.toggle img.collapse').show();
		}
		else
		{
			// No results
			category_row.find('.toggle img').hide();
			category_row.find('.toggle img.noresults').show();
		}
		
		/* change the deck plan to that of the default cabin */
		$('input.cabin_option:checked').click();
	});
}

function hide_cabins(callee)
{
	// Unhide image if all categories are closed
	image_hide_count--;
	if (image_hide_count == 0)
	{
		$('.hide_image').show();
	}
	
	// Display [Expand] button
	category_row = $(callee).parent().parent();
	category_row.find('.toggle img').hide();
	category_row.find('.toggle img.expand').show();
	category_row.find('td').css('background', '#FFFFFF');
	category_row.next().find('td').css('background', '#FFFFFF');
	
	cabin_list = category_row.next().find('table.cabin_list');
	
	// Smoothly hide the cabins, and then remove them from the DOM when done
	cabin_list.slideUp('normal', function(){cabin_list.empty()} );
}

var booking = {
	changeFareCodeUrl: function(cabinType, oldFareCode){
		var newFareCode = $('#changeFareCodeUrl').val();
		var url = $('#fareCodeBookingUrl').val();
		var redirect = url.replace(cabinType + '_' + oldFareCode, cabinType + '_' + newFareCode);
		location.href = redirect;
	}
}