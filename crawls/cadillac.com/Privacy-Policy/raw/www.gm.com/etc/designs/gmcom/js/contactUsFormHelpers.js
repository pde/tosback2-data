// fixes $ / mrm.$ jQuery conflict call between site and gmds app
var mrm = mrm || {}; mrm.$ = mrm.$ || jQuery;

var com_gm_contactuspopup = {
	decisionRouter : {
		newPurchase_findLocDealer : function() {
			
			return;
		},
		newPurchase_promoQuestion : function() {
			
			return;
		},
		newPurchase_vehQuestion : function() {
			
			return;
		},
		newPurchase_requestInfo : function() {
			
			return;
		},
		newPurchase_certUsed : function() {
			
			return;
		},
		
		
		currentOwner_reportProb : function() {
			
			return;
		},
		currentOwner_currvehQuestion : function() {
			
			return;
		},
		
		unrelated_interestServices : function() {
			
			return;
		},
		unrelated_interestRetiree : function() {
			
			return;
		},
		unrelated_interestComm : function() {
			
			return;
		},
		unrelated_interestEnv : function() {
			
			return;
		},
		unrelated_newIdea : function() {
			
			return;
		}
		
		
		
	}	
}


function removeDash( phoneNumber ){
	if( /(\d\d\d)-(\d\d\d\d)/.test( phoneNumber )){
		var result = /(\d\d\d)-(\d\d\d\d)/.exec( phoneNumber );
		return "" + result[1] + result[2];
	} else { 
		return phoneNumber;
	}
}

$(document).ready( function(){
	console.log( $( '.mandatory' ), $( '.mandatory' ).text());
	$( '.mandatory' ).each( function(){
		var $this = $( this );
		$this.text( $this.text() + '*' );
	});

	if( $( 'body').attr( 'id' ) == 'contactUs' ){
		if( typeof( Cufon ) == 'function' && Cufon.replace ){
			$( 'div.cq-colctrl-lt9 p, div.cq-colctrl-lt1-c1 p').each( function(){
				Cufon.replace( 
						this, 
						{ 
							fontFamily: 'gotham-book',
							hover: true 
						}
					);
			});
		}
	}


	
    var otherQuestionClicked = false,
		$form = null;
	/*
    //$('.formComponents').hide();
    $('.close-btn').click(function() {
        $(this).parents('form').hide();
    });
    $('#help-me-find').click(function() {
        $('#help-me-find-form').show();
    });
    $('#help-me-find-form input:radio').click(function(){
        otherQuestionClicked = true;
        var theVal = $(this).val();
        $('form[id~="help-me-find-form"] input[name~="reasonSelected"]').val(theVal);
    });
    $('#help-me-find-form .help-me-decide-submit-button').click(function() {
        if(otherQuestionClicked){
        	var selectedElement = $( 'form[id~="help-me-find-form"] input[name~="reasonSelected"]').val();
        	com_gm_contactuspopup.decisionRouter[selectedElement](selectedElement);
        	//$(this).parents('form').hide();
            //$('#general-form').show();
        }
    });
	
    $('select').change(function() {
        var identifier = $(this).siblings('label').attr('for');
        $(this).parents('form').find("input[value*='"+identifier+"']").next().trigger('click');
        $(this).parents('form').find("input[value*='"+identifier+"']").next().trigger('click');
    });
	*/
	
	$('form').each(function(){
		var pat = /submitRequest$/,
			$this = $(this);
		if (pat.test($this.attr('id'))) $form = $this;
	});
	
	if($form){
		$('div#resetButton').click(function(){
			$form[0].reset();
			$('textarea').keyup();
		});
		$('div#submitButton').click(function(){
			if( $( 'input#postalcode' ).val().length == 0 && $( 'input#postalcode' ).val() == '' ){
				$form.submit(function(){
					$('input#tel-number').val(removeDash($('input#tel-number').val()));
				}).submit();
				return true;
			} else if( contactuspageZipCodeUpdate( $( 'input#postalcode' ).val())){
				$form.submit(function(){
					$('input#tel-number').val(removeDash($('input#tel-number').val()));
				}).submit();
				return true;
			} else {
				if( $( 'li.postalcode' ).next( 'span.errorIndicator' ).length <= 0 )
					$( 'li.postalcode' ).after( '<span class="errorIndicator"> </span>' );
				return false;
			}
		});
	}
	
	
	//format errorMessage
	var $errorMessageUL = $('#contactUsForm div.errorMessage');
	if ($('#contactUsForm div.errorMessage ul').children().length > 0) {
		$.each($('#contactUsForm div.errorMessage ul li'), function(index, value) {
			if ($(value).is('#contactUsForm div.errorMessage ul li:last-child') == false) {
				$(value).append(document.createTextNode(","));
			}
		});
	}
});
