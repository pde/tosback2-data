;(function($){
	$.fn.ajaxPagi = function(options) {
		var defaults = {
			url: "jquery/ajax.asp",
			data:"",
			method: "POST",
			dataType: "json",
			busy: false,
			items_per_page:10,
			//start_index:0,
			current_page:1,
			link_to:"#",
			prev_text:"&laquo;",
			next_text:"&raquo",
			ellipse_text:"...",
			content_id:$(this).attr("id"),
			callback:function(){return false;}
		};
		var opts = jQuery.extend(defaults,options);
		var id = "#"+$(this).attr("id");
		
		if(!$("#"+opts.content_id).length){	
			return;
		}
		var getAjax = function(current){
			var current_page = current?current:opts.current_page;
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: "page="+current_page+"&"+opts.data+"&offset="+opts.items_per_page,
				processData: false,
				dataType: opts.dataType,
				beforeSend: function(){
					if(opts.busy)
					$("#"+opts.content_id).html('<img src="'+opts.busy+'" border="0" />');
				},
				success: function(data){
						responseHtml(data, opts.url,opts.method,opts.busy,id, current_page);
				},
				error:function (XMLHttpRequest, textStatus, errorThrown) {
					//alert("error");
				}
			});		
		}
		
		var responseHtml = function(data, url, method, busy, id, current){
			var rowPerPage = opts.items_per_page;
			var html = new String();
			var totalPage = $(data).find("span[class='totalPage']").text();
			// call callback function;
			opts.callback(data, this);	
			//server side draw pagination;
			bindPagination(totalPage);			
		}
		
		var bindPagination = function(totalPage){					
			var record = 5;
			var currentNow = new String();
			$("#pagi div a").click(function(){
				currentNow = $(this).attr("name").substr(4);
				if($(this).attr("name").length > 0)
				{
					getAjax(currentNow);
				}				
				return false;
			});
			$("#pagiform").submit(function(){
				var requestedGotoPage = $("#gotofield").val();
				if(isNaN(requestedGotoPage)){$("#gotofield").val("");return false;};
				requestedGotoPage = Math.floor(requestedGotoPage);
				var gotoPage = requestedGotoPage>totalPage?totalPage:requestedGotoPage;
				gotoPage = gotoPage<1?1:gotoPage;
				if(isNaN(gotoPage)){return false;};
				getAjax(gotoPage);
				return false;
			});			
		}
		return $("#"+opts.content_id).each(function() {	
			getAjax(opts.current_page);
		});
		
	}
})(jQuery);

/*Help Dialog*/

;(function($){
	$.fn.helpDialog = function(options) {
		var defaults = {
				autoOpen: true,
				closeOnEscape: true,
				draggable: false,
				minHeight: 20,
				maxWidth: 240,
				maxHeight: 600,
				//position:"center",
				dialogClass: 'ui-helpDialog',
				resizable: false,
				bgiframe:true
		};
		var opts = jQuery.extend(defaults,options);
		var isFocus=false;
		var isDialogOpen =false;
		var dialogId= "helpDialogBox";
		this.each(function(i){
			bindDialog(this, dialogId);	
		});

		function delayClose(elem){	
			setTimeout(function(){
				if(isFocus){
					return false;
				}
				else{					
					$(elem).dialog("destroy");		 //close any leftover help dialogs
					$("."+opts.dialogClass).each(function(i){	
						$(this).remove();
					});
					isDialogOpen =false;
				}					
			}, 500);
		}
		function initDialog(elem, dialogId){
			if(isDialogOpen){return false};
			$(elem).after("<div id='" +dialogId+"'></div>");
			var helpId = $(elem).attr("id");
			$("#"+dialogId).load("/help/services/popUp", {nodeDesc: helpId}, function(){
				dialogWidth= $(this).width()>200?240:$(this).width()+40;
				var helpContent = "";
				if($("#"+helpId+"Dialog") && $("#"+helpId+"Dialog").attr("class") && $("#"+helpId+"Dialog").attr("class").indexOf("helpDialog")!=-1 && $("#"+helpId+"Dialog").html()) {
					helpContent = $("#"+helpId+"Dialog").html();
				} else {
					helpContent = $(this).html();
				}
				$(this).html(		
						"<div class='helpDialog'><div class='content'><div class='t'></div>" +
						helpContent +
						"</div><div class='b-l'><div class='b'><div></div></div></div></div>" 
						);
				$(this).css({width:dialogWidth});
				dialogHeight=$(this).outerHeight();

				$(this).dialog({
					autoOpen: opts.autoOpen,
					closeOnEscape: opts.closeOnEscape,
					draggable: opts.draggable,
					minHeight: opts.minHeight,
					maxWidth: opts.maxWidth,
					width: dialogWidth,
					maxHeight: opts.maxHeight,
					dialogClass: opts.dialogClass,				
					resizable: opts.resizable,
					bgiframe: opts.bgiframe
				});
				$(this).mouseout(function() {
					isFocus=false;
					delayClose(this);
				})
				$(this).mouseover(function() {
					isFocus= true;
				})
				isDialogOpen =true;
				$(".phoenix, ."+opts.dialogClass).css({top: $(elem).offset().top-dialogHeight+7, left: $(elem).offset().left-3});
			});
			// Prevent click eventpropagation;
			return false;
		}
		function bindDialog(elem, dialogId){
			height=0;
			$(elem).mouseover(function(e) {
				if(!isDialogOpen){
					initDialog(this, dialogId);
				}
				isFocus= true;
			})
			$(elem).mouseout(function() {
				isFocus= false;
				delayClose($("#"+dialogId));
				
			})
			// Prevent click eventpropagation;
			return false;
		}		
		
	}
})(jQuery);

/* custom extensions */
;(function($){
	$.fn.extend({
		collapse: function(callback) {
			return this.slideUp('normal',callback);
		},
		expand: function(callback) {
			return this.slideDown('normal',callback);
		},
		addHoverClass: function(){
			return this.addClass('hover');
		},
		removeHoverClass: function(){
			return this.removeClass('hover');
		},
		addSelectedClass: function(){
			return this.addClass('selected');
		},
		removeSelectedClass: function(){
			return this.removeClass('selected');
		}
	});
})(jQuery);


/* ui widget defaults */
;(function($){
	$.extend($.ui.accordion, {
		defaults: {
			selectedClass: "selected",
			alwaysOpen: false,
			collapsible: true,
			event: "click",
			header: "dt",
			active: false,
			icons: {
				header: "icon-arrow-e",
				headerSelected: "icon-arrow-s"
			},
			autoHeight: false,
			animated: 'slide',
			running: 0
		}
	});
	$.datepicker.setDefaults({
		showOn: 'button',
		buttonImage: '/resources/mojito/img/common/calendar_sm.gif',
		buttonImageOnly: true,
		dayNamesMin: ['S','M','T','W','T','F','S'],
		prevText:'',
		nextText: '',
		minDate: new Date(),
		duration:'',
		onClose: function() {this.focus();}
	});
})(jQuery);

;(function($) {
	/* set validator defaults */
	if($.validator){
		$.validator.setDefaults({ 
			/*debug:true, */
			onfocusout:false,
			onkeyup:false,
			onclick:false
		});
	};
	
	/* add validate extention with instruction text*/
	var validate = $.fn.validate;
	$.fn.validate = function(options) {
		// create settings for compatibility with validate
		opts = $.extend(options, $.extend({}, $.fn.validate.defaults, options));
		//run original validate function
		var validator = validate.apply(this, arguments);
		
		//start of custome code for instructionText
		//addMethod
		jQuery.validator.addMethod("instructionText", function(value, element, param) { 
			 return value!=param; 
			});
		var instruction = opts.instruction;
		//populate instruction text
		if(instruction){
			$.each(instruction, function(key, value) {
				var elem = $("#"+key);
				$(elem).attr("value", value);
				$(elem).addClass('readonlystyle');
				$(elem).focus(function(){
					this.value='';
					$(this).removeClass('readonlystyle');
					$(this).unbind();
				});
				//add rules for instructionText
				$(elem).rules("add", {instructionText: value});
			});
		}
		return validator;
	};
})(jQuery);

/* ======+====== Bindings ======+====== */

(function($) {
	$(function() {
		/* put bindings here */
		if ($.stubhub.userAgent) $("#GridWrapper").addClass($.stubhub.userAgent+'_'+$.browser.version).addClass($.stubhub.userAgent).addClass($.browser.version);

		$("dt.ui-accordion-header").live('mouseover',function(){$(this).addHoverClass();});
		$("dt.ui-accordion-header").live('mouseout',function(){$(this).removeHoverClass();});

		if($.livequery){
			$(".helpIcon").livequery( function() {
				$(this).helpDialog();
			});
			/* mark top level (L1) and nested level (L2) accordion links, for easy selector access later on */
			$(".ui-accordion-nav div.ui-accordion-header a").livequery(function(){
				$(this).addClass("accordionL1Link");	
			});
			$(".ui-accordion-nav .ui-accordion-content ul li a").livequery(function(){
				$(this).addClass("accordionL2Link");	
			});

			$("a.accordionL1Link,a.accordionL2Link").livequery('click',function(){
				$("a.accordionL1Link").removeSelectedClass();
				$("a.accordionL2Link").removeSelectedClass();		
				$(this).addSelectedClass();
			});
			/*if dummy error "forcedErrorToBypassValidation", remove the error msg box*/
			$("#GridWrapper #specificErrorsMsg:has(#forcedErrorToBypassValidation)").livequery(function() {
				$(this).remove();
			});
			/* move any "specificErrorsMsg" div with class errorsIntro from within form to a location right below the title h1 */
			$("#GridWrapper #specificErrorsMsg[class*='moveToTop']").livequery( function() {
				$("#specificErrorsMsgAtTop").remove();
				$(this).removeClass('moveToTop')
					.removeAttr('id')
					.insertAfter2('#GridMiddle h1')
					.insertAfter2('#GridMiddle #errorsMsgTarget')
					.insertAfter2('#GridMiddle #fieldErrorsMsgAtTop')
					.roundedCorners({wrapperClass:'rc-panel4 rc-panel4-all',wrapperId:'specificErrorsMsgAtTop'})
					.removeClass('offscreenOnLoad');
			});
			$("#GridWrapper #specificErrorsMsg[class*='leaveInPlace']").livequery( function() {
				$("#specificErrorsMsgAtTop").remove();
				$(this).removeClass('leaveInPlace')
					.removeAttr('id')
					.roundedCorners({wrapperClass:'rc-panel4 rc-panel4-all',wrapperId:'specificErrorsMsgInPlace'})
					.removeClass('offscreenOnLoad');
			});
			/*move the "fieldErrorsMsg" div from within form to a location right below the title h1, style it, give it id "fieldErrorsMsgAtTop", and hide it */
			$("#GridWrapper #fieldErrorsMsg").livequery( function() {
				/*See whether fieldErrorsMsgAtTop already created*/
				if ($('#fieldErrorsMsgAtTop').length == 0) {
					$(this).removeClass('hidden')
						.removeAttr('id')
						.insertAfter2('#GridMiddle h1')
						.insertAfter2('#GridMiddle #errorsMsgTarget')
						.roundedCorners({wrapperClass:'rc-panel4 rc-panel4-all hidden',wrapperId:'fieldErrorsMsgAtTop'})
						.removeClass('offscreenOnLoad');
					$('#fieldErrorsMsgAtTop').hide().removeClass('hidden');
				}
			});
			/* check if there's any form with field errors, and if so, show the fieldErrorsMsgAtTop element (except when there's a specificErrorsMsgAtTop). Once field errors are resolved, collapse it again */
			$("#GridWrapper form:has(label.error:visible)").livequery( 
				function() {
					if ($('#specificErrorsMsgAtTop').length == 0 && $('#specificErrorsMsgInPlace').length == 0) {
						$('#fieldErrorsMsgAtTop').show();
						$('#GridMiddle').addClass('hasErrorIntro');
					}
				}, 
				function() {
					$('#fieldErrorsMsgAtTop').hide();
					$('#GridMiddle').removeClass('hasErrorIntro');
				}
			);

			/* special treatment for overlays with forms */
			$("#ov-wrapper-id").livequery( function() {
				$('#fieldErrorsMsg.offscreenOnLoad',this).livequery( function() {
					$(this).remove();
				});
			});
			$("#ov-wrapper-id #specificErrorsMsg.offscreenOnLoad").livequery( function() {
				$(this).removeClass('leaveInPlace')
					.removeAttr('id')
					.removeClass('moveToTop')
					.roundedCorners({wrapperClass:'rc-panel4 rc-panel4-all',wrapperId:'specificErrorsMsgInPlace'})
					.removeClass('offscreenOnLoad');
			});
		};

		/*
		 * This event binding is used for panels used as widgets which have pointer arrows.
		 * Clicking on the panel header <h2> will collpase and expand the panel and arrow will change direction accordingly.
		 * The panel container should have the class p-widget and the <h2> header should have an anchor tag with a
		 * div for the arrow pointer.
		 * The div class for arrow pointer can be either icon-arrow-s for expandable mode or icon-arrow-e for collapsible mode.
		 * The panel creation should be done by the specific application using the panel plugin like 
		 * $(".p-widget").panel({bgTopClass:'p-bg-hdrblu-lrg p-hdr-lrg',	blSliceClass:'p-collapsable', brSliceClass:'p-collapsable'});
		 * 
		 * Example:
		 * <div class="p-widget">
		 * 	<h2>
		 *		<a href="javascript:void(0);"><div class="arrow-13-orange arrow-13-s"></div>Some Header </a>
		 *	</h2>
		 *	<div class="content p-collapsable">
		 *		Some content
		 *	</div>										    
		 * </div
		 */

		$(".p-widget h2 a").live("click", function() {
			var currentWidget = $(this).parents("div.p-wrapper");
			currentWidget.toggleClass("p-collapse");
			if(currentWidget.hasClass("p-collapse"))
				currentWidget.removeClass("p-collapse-toggle");
			else
				currentWidget.addClass("p-collapse-toggle");
			
			currentWidget.find("h2 a div").toggleClass("arrow-13-e");			
			currentWidget.find("h2 a div").toggleClass("arrow-13-s");
		});
		//Events associated with Help overlay and formatting
		$(".formathelp").overlay({align:'relative',overlayId:'formatHelpLayer',width:510,open:$.formatHelp});
		//Assocaite the contact us overlay for minimal header
		$("#GridTop .contactUs").overlay({align:'relative',width:700});
	});
})(jQuery);		
