function show_comment_response_form(comment_id, response_type)
{
	var form = $('#comment_response_form').hide();
	var parent = $('#comment_' + comment_id);
	
	// Set the hidden fields
	form.find('input[name=parent_comment_id]').val( comment_id );
	form.find('input[name=comment_type]').val( response_type );
	
	// Add appropriate text to the text box or empty it
	textarea_text = '';
	
	if (response_type == 'comment')
	{
		textarea_text = 'add your COMMENT here...';
                if(international == 1){
                    textarea_text = add_your_comment_here + "...";
                }
        }
	
	if(response_type == 'question')
	{
                textarea_text = 'ask your QUESTION here...';
                if(international == 1){
                    textarea_text = add_your_question_here + "...";
                }
        }
	
	form.find('textarea').val(textarea_text);
	
	// Copy in some text
	if ( comment_id == 0 )
	{
		form.find('.c_parent_author').html( 'this' );
	}
	else
	{
		form.find('.c_parent_author').html( 
			parent.find('.c_comment_author').html() + "'s"
		);
	}
	form.find('.c_parent_type').html(
		parent.find('.comment_type').html()
	);
	
	// Hide all response type labels
	form.find('.response_label').hide();
	// Show the appropriate label for the selected type
	form.find('.add_' + response_type + '_label').show();
	
	if(comment_id != 0) // If comment about root object enable extra options (if applicable)
	{
		form.find('.root_extras').hide();
		form.find('.root_extras input').attr("disabled", true);
	}
	else
	{
		form.find('.root_extras').show();
		form.find('.root_extras input').attr("disabled", false);
	}
	
	// Put the form in position, and display!
	$('#comment_response_holder_' + comment_id).empty().append(form);
	form.fadeIn();
}

function report_comment(comment_id)
{
	if (
		confirm("Are you sure wish to report this comment?\n\n"
			+ "Please only report comments which you think are offensive, unlawful, or otherwise unsuitable for display on the site.")
	)
	{
		var width  = 330;
		var height = 160;
		var left   = (screen.width  - width)/2;
 		var top    = (screen.height - height)/2;
 		window.open("/comment_report.php?commentid="+comment_id, "", "resizable=0,status=0,height="+height+",width="+width+",top="+top+",left="+left);
	}
}

function toggle_textarea_contents(textarea_object)
{
	if(textarea_object.value == 'add your COMMENT here...' || textarea_object.value == 'ask your QUESTION here...')
	{
		textarea_object.value = '';
	}
        if(textarea_object.value == (add_your_comment_here  + '...') || textarea_object.value == (add_your_question_here  + '...'))
	{
		textarea_object.value = '';
	}
}