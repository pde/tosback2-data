// set sub nav to position: fixed on scroll
    var $win = $(window)
      , $nav = $('.subnav')
	  , $bdy = $('body')
	  , navTopOffset = 40 //, navTopOffset = navbarTopPos == 'fixed' ? 40 : -40
      , navTop = $('.subnav').length && $('.subnav').offset().top - navTopOffset
      , isFixed = 0

    processScroll()

    $win.on('scroll', processScroll)

    function processScroll() {
      var i, scrollTop = $win.scrollTop()
      if (scrollTop >= navTop && !isFixed) {
        isFixed = 1
		$bdy.addClass('subnav-fixed-top')
      } else if (scrollTop <= navTop && isFixed) {
        isFixed = 0
		$bdy.removeClass('subnav-fixed-top')
      }
    }
	

// Extending Bootstrap Modals.js (and related)

var replyLink = false;
$().ready(function() {

	// INLINE MODALS (tinyMCE should be initialized onready
	var edInline = $('.modal-inline');
	if(edInline.html() != null && !mceBody) { 
		tinyMCEInit(); // initialize any wysi editors that may exist (the init function puts focus on editor)
	}
	
	// POPUP MODALS...
	$('[data-toggle="modal"]').click(function() { // when opening modals
		
		var action = this.getAttribute('data-action');
		var target = this.href.replace(/.*(?=#[^\s]+$)/, '');
		var isIframe = target.search('-iframe') != -1;
		if(isIframe) { // target modal is an iframe
			var frame;
			if($(target).html()==null) { // if iframe doesn't exist in page yet, make it
				var id = target.replace(/[#]/,'');
				frame = document.createElement('iframe');
				frame = $(frame);
				frame.attr('class','modal modal-submit');
				frame.attr('id', id);
				frame.attr('allowTransparency', 'true');
				frame.attr('scrolling', 'no');
				$('.module-questions').append(frame);
			}
			else {
				frame = $(target);
			}
			var url = this.getAttribute('data-href');
			frame.attr('src', url);
		}
		
		if(!mceBody) { 
			tinyMCEInit(); // initialize any wysi editors that may exist (the init function puts focus on editor)
		}
		else {
			resetModal(target); // repeated here in case user had clicked body to close previous modal (instead of clicking a "cancel" or "close" link on the modal itself)
			// Put focus on editor whenever it's opened
			// Blur the body it's focused but not correctly focused
			mceBody.blur();
	
			// Refocus the body after a little while
			setTimeout(function() {
				mceBody.focus();
			}, 0);
		}
		
		
		
		var modalHeader = $(target + ' .modal-header h1')[0];
		var modalHeaderTxt;
		if(action == 'answer') { 
			modalHeaderTxt = 'Answer It'; 
		}
		else if(action == 'reply') {
			var submitter = $(this).parentsUntil('itemfooter').children('.item-submitter');
			if(submitter[0] != undefined) { submitter = submitter.children().html(); }
			var permalink = $(this).parentsUntil('itemfooter').children('.item-permalink');
			if(permalink[0] != undefined) { permalink = permalink.children().attr('href'); }
			var replyPost = $(this).attr('data-reply-post');
			modalHeaderTxt = 'Reply';
			replyLink = '<a href="' + permalink + '">@' + submitter + '</a> -&nbsp;';
			if(mceBody) {
				tinyMCE.activeEditor.execCommand('mceInsertContent', false, replyLink);
			}
			var form = $(target + ' form');
			var newfield = document.createElement("input");
			newfield = $(newfield);
			newfield.attr('id','input-reply-hidden');
			newfield.attr('name','qanda_parent');
			newfield.attr('type','hidden');
			newfield.attr('value',replyPost);
			form.append(newfield);
		}
		else if(action == 'ask') {
			$(target).toggleClass('modal-submit-question');
			var inp = $('#input-question-title');
		
			// Blur the inp it's focused but not correctly focused
			inp.blur();

			// Refocus the inp after a little while
			setTimeout(function() {
				inp.focus();
			}, 0);
			
		}
		else if(action == 'edit') {
			modalHeaderTxt = 'Edit';
		}
		
		if(modalHeaderTxt != null && !isIframe) {
			modalHeader.innerHTML = modalHeaderTxt;
		}

		
	
	});
	
	$('[data-dismiss="modal"]').click(function() { // when closing modals
		var target = this.getAttribute('data-target');
		target = '#' + target;
		
		resetModal(target);
		
	});

				
});

function resetModal(target) { // target is an ID, *including* a leading "#"
		// remove extra classes that may exist
		$(target).removeClass('modal-submit-question');
		
		// reset all fields in the modal (other than the textarea/tinyMCE editor, which is reset below)
		$('.modal-submit .control-group').removeClass('info');
		$('.modal-submit textarea').val('');
		$('.modal-submit input').val('');
		$('.modal-submit select').val(0);
		
		var modalWYSI = $(target).has('textarea:tinymce').html() != null; // true if the modal has a wysi textarea in it
		if(modalWYSI) { 
			// if there's a wysi editor in the modal you are closing
			// reset the editor
			$(target + ' textarea:tinymce').html('');
			
			// reset & close the simplelink panel (if open)
			if(simpleLinkPanelOpen) {
				var inp = document.getElementById('input-insert-link');
				inp.value = ''; // clear input field for subsequent usage
				$(target + ' .form-submit-wysi').toggleClass('mceSimpleLink'); // close the simplelink panel
				simpleLinkPanelOpen = false;
			}
		}
		
		// IFRAME MODALS
		if( $('body').attr('class').search('page-iframe') != -1) { // if it's an iframe modal (modal itself is in parent window, contents are in iframe)
			target += '-iframe';
			target_modal = window.parent.$(target); 
			target_modal.modal('hide');
			target_modal.remove(); // kill the node so it's always recreated (for new edit pages)
		}
		
		// REPLY MODALS
		// if previous action was a reply, need to remove the element(s) added for replying
		var replyInput = $('#input-reply-hidden');
		if(replyInput[0] != undefined) {
			replyInput.remove();
		}

}

// TinyMCE

// jquery.tinymce.js (version 3.4.9)
// copied here to reduce number of external JS calls

(function(b){var e,d,a=[],c=window;b.fn.tinymce=function(j){var p=this,g,k,h,m,i,l="",n="";if(!p.length){return p}if(!j){return tinyMCE.get(p[0].id)}p.css("visibility","hidden");function o(){var r=[],q=0;if(f){f();f=null}p.each(function(t,u){var s,w=u.id,v=j.oninit;if(!w){u.id=w=tinymce.DOM.uniqueId()}s=new tinymce.Editor(w,j);r.push(s);s.onInit.add(function(){var x,y=v;p.css("visibility","");if(v){if(++q==r.length){if(tinymce.is(y,"string")){x=(y.indexOf(".")===-1)?null:tinymce.resolve(y.replace(/\.\w+$/,""));y=tinymce.resolve(y)}y.apply(x||tinymce,r)}}})});b.each(r,function(t,s){s.render()})}if(!c.tinymce&&!d&&(g=j.script_url)){d=1;h=g.substring(0,g.lastIndexOf("/"));if(/_(src|dev)\.js/g.test(g)){n="_src"}m=g.lastIndexOf("?");if(m!=-1){l=g.substring(m+1)}c.tinyMCEPreInit=c.tinyMCEPreInit||{base:h,suffix:n,query:l};if(g.indexOf("gzip")!=-1){i=j.language||"en";g=g+(/\?/.test(g)?"&":"?")+"js=true&core=true&suffix="+escape(n)+"&themes="+escape(j.theme)+"&plugins="+escape(j.plugins)+"&languages="+i;if(!c.tinyMCE_GZ){tinyMCE_GZ={start:function(){tinymce.suffix=n;function q(r){tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute(r))}q("langs/"+i+".js");q("themes/"+j.theme+"/editor_template"+n+".js");q("themes/"+j.theme+"/langs/"+i+".js");b.each(j.plugins.split(","),function(s,r){if(r){q("plugins/"+r+"/editor_plugin"+n+".js");q("plugins/"+r+"/langs/"+i+".js")}})},end:function(){}}}}b.ajax({type:"GET",url:g,dataType:"script",cache:true,success:function(){tinymce.dom.Event.domLoaded=1;d=2;if(j.script_loaded){j.script_loaded()}o();b.each(a,function(q,r){r()})}})}else{if(d===1){a.push(o)}else{o()}}return p};b.extend(b.expr[":"],{tinymce:function(g){return !!(g.id&&tinyMCE.get(g.id))}});function f(){function i(l){if(l==="remove"){this.each(function(n,o){var m=h(o);if(m){m.remove()}})}this.find("span.mceEditor,div.mceEditor").each(function(n,o){var m=tinyMCE.get(o.id.replace(/_parent$/,""));if(m){m.remove()}})}function k(n){var m=this,l;if(n!==e){i.call(m);m.each(function(p,q){var o;if(o=tinyMCE.get(q.id)){o.setContent(n)}})}else{if(m.length>0){if(l=tinyMCE.get(m[0].id)){return l.getContent()}}}}function h(m){var l=null;(m)&&(m.id)&&(c.tinymce)&&(l=tinyMCE.get(m.id));return l}function g(l){return !!((l)&&(l.length)&&(c.tinymce)&&(l.is(":tinymce")))}var j={};b.each(["text","html","val"],function(n,l){var o=j[l]=b.fn[l],m=(l==="text");b.fn[l]=function(s){var p=this;if(!g(p)){return o.apply(p,arguments)}if(s!==e){k.call(p.filter(":tinymce"),s);o.apply(p.not(":tinymce"),arguments);return p}else{var r="";var q=arguments;(m?p:p.eq(0)).each(function(u,v){var t=h(v);r+=t?(m?t.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g,""):t.getContent()):o.apply(b(v),q)});return r}}});b.each(["append","prepend"],function(n,m){var o=j[m]=b.fn[m],l=(m==="prepend");b.fn[m]=function(q){var p=this;if(!g(p)){return o.apply(p,arguments)}if(q!==e){p.filter(":tinymce").each(function(s,t){var r=h(t);r&&r.setContent(l?q+r.getContent():r.getContent()+q)});o.apply(p.not(":tinymce"),arguments);return p}}});b.each(["remove","replaceWith","replaceAll","empty"],function(m,l){var n=j[l]=b.fn[l];b.fn[l]=function(){i.call(this,l);return n.apply(this,arguments)}});j.attr=b.fn.attr;b.fn.attr=function(n,q,o){var m=this;if((!n)||(n!=="value")||(!g(m))){return j.attr.call(m,n,q,o)}if(q!==e){k.call(m.filter(":tinymce"),q);j.attr.call(m.not(":tinymce"),n,q,o);return m}else{var p=m[0],l=h(p);return l?l.getContent():j.attr.call(b(p),n,q,o)}}}})(jQuery);

// tinyMCEInit()
// Initializes all textareas with class="wysi"
// set up as a separate function so it can be called only when needed
// NOTE: be sure to call it only after document.ready: $().ready(function() { });

var mceSelectedNode; // used to hold selected/target node inside editor
var mceSelectedBookmark; // used to hold original caret location/active selection inside editor
var mceBookmarked = false; // used to prevent multiple-bookmarking at any given time (which causes problems)
var mcePlaceholder = null; // used to pass textarea placeholder attribute to tinyMCE editor
var simpleLinkPanelOpen = false;
var isPlainText = false; // true if user is in plain text edit mode
var mceBody = false; // true if there's an active mceEditor on the page
var iMobile = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) != null;
var iOS5 = navigator.userAgent.match(/OS 5_.*\d like Mac OS X/i) != null; // using browser detection because feature detection (for contenteditable) returns a false positive for iOS < 5

function tinyMCEInit() {

	if(!iMobile || (iMobile && iOS5)) { // initialize tinyMCE only when supported
	
		$('textarea.wysi').tinymce({
			script_url : 'http://help.xanga.com/tinymce/jscripts/tiny_mce/tiny_mce_gzip.php', 
			theme : "advanced",
			skin : "x",
			height : "131",

			theme_advanced_buttons1 : "bold,italic,underline,simplelink,separator,bullist,numlist,separator,html",
			theme_advanced_buttons2 : "",
			theme_advanced_buttons3 : "",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			
			
			setup : function(ed) {
				$('.form-submit-wysi').hide();
				$('.modal-submit .loading').show();
				// editor area starts out in "edit html mode" by default
				// so when initiating tinyMCE, first toggle editor out of "edit html mode"
				$('.form-submit-wysi').toggleClass('mceEditHTMLMode');
				
				// CUSTOM BUTTON - EDIT HTML
				// lets you edit html right in editor area instead of in tinyMCE popup
				// (replaces tinyMCE "code" button/plugin)
				
				ed.addButton('html', {
					title : 'Edit HTML Source',
					onclick : function() {
						$('.form-submit-wysi').toggleClass('mceEditHTMLMode');
						var plaintext = $('.form-submit-wysi').attr('class').search('mceEditHTMLMode') != -1;
						isPlainText = plaintext;
						if(mcePlaceholder) {
							if(plaintext) {
								ed.dom.remove('placeholder');
							}
							else {
								ed.execCommand('mceInsertContent', false, mcePlaceholder);
							}
						}

						tinymce.execCommand('mceToggleEditor',false,'textarea-submit');
						
					}
				});
				
				// CUSTOM BUTTON - SIMPLE LINK 
				// lets you insert link with simple, inline panel instead of complex tinyMCE popup
				// (replaces tinyMCE "link" button/plugin)
				
				ed.addButton('simplelink', {
					title : 'Insert Link',
					onclick : function() {
						
						var inp = document.getElementById('input-insert-link');
						if (mceSelectedNode.nodeName == 'A') {
							inp.value = ed.dom.getAttrib(mceSelectedNode, 'href');
						}
						//mceSelectedNode = e;
						
						
						$('.form-submit-wysi').toggleClass('mceSimpleLink');
						
						// Blur the input; it's focused but not correctly focused
						inp.blur();
	
						// Refocus the input after a little while
						setTimeout(function() {
							inp.focus();
						}, 0);
					
						simpleLinkPanelOpen = true;
					}
					
					
				
				});
				
				
				// UTILITIES

				ed.onClick.add(function(ed) {

					// Hide SimpleLink Panel (if open) when editor is clicked
					var inp = document.getElementById('input-insert-link');
					if(simpleLinkPanelOpen){ // if simplelink panel is open, reset & close it
						inp.value = ''; // clear input field for subsequent usage
						$('.form-submit-wysi').toggleClass('mceSimpleLink'); // close the simplelink panel
						simpleLinkPanelOpen = false;
					}
					// enable update of bookmark on subsequent instances of simplelink	
					mceBookmarked = false;
					
					var e = ed.selection.getNode().getAttribute('data-mce-type');
					if(e == 'bookmark') { // if user accidentally clicked into a bookmark span, get him out of it
						ed.selection.moveToBookmark(mceSelectedBookmark);
					}
					
					
					// Placeholder (span #placeholder) - remove if present
					ed.dom.remove('placeholder');
					mcePlaceholder = null;
					
					
				});
				
				ed.onKeyPress.add(function(ed) {
				
					// enable update of bookmark on subsequent instances of simplelink	
					mceBookmarked = false;
					
					
				});
				
				ed.onInit.add(function(ed) {
				
					$('.form-submit-wysi').show();
					$('.modal-submit .loading').hide();
					
					mceBody = tinyMCE.activeEditor.getBody(); // PUT FOCUS IN EDITOR WHEN YOU OPEN IT
					// Blur the body it's focused but not correctly focused
					mceBody.blur();
			
					// Refocus the body after a little while
					setTimeout(function() {
						mceBody.focus();
					}, 0);
					
					
					// Handle HTML5 Placeholder on wysi textarea
				 	var placeholder = $('textarea.wysi').attr('placeholder');
					if(placeholder != null) {
						mcePlaceholder = '<span id="placeholder">' + placeholder + '</span>';
						tinyMCE.activeEditor.execCommand('mceInsertContent', false, mcePlaceholder);
					}
					
					var modal = $('.modal.in');
					var isIframe = $('body').attr('class').search('page-iframe') != -1;
					if (isIframe) {
						modal = $('.modal.modal-inline');
					}
					var isAsk = modal.attr('class').search('modal-submit-question') != -1;
					if(isAsk) {
						var inp = document.getElementById('input-question-title');
						
						// Blur the inp it's focused but not correctly focused
						inp.blur();
			
						// Refocus the inp after a little while
						setTimeout(function() {
							inp.focus();
						}, 0);
					}
					
					$('.mce_simplelink').mouseover(function(){
						
						// need to do the following onmouseover instead of onclick
						// because IE loses the editor focus when you click toolbar button 
						// (so it can't get the following onclick)
						
						// store selected node
						var e = ed.selection.getNode();
						while(e.nodeName != 'A' && e.nodeName != 'BODY') {
							e = e.parentNode;
						}
						mceSelectedNode = e;
						
						// store bookmark and target node for later use
						
						if(!mceBookmarked) {
							mceSelectedBookmark = ed.selection.getBookmark();
							mceBookmarked = true;
						}
						var e = ed.selection.getNode().getAttribute('data-mce-type');
						if(e == 'bookmark') { // if user ends up inside a bookmark span
							// get him out of it
							ed.selection.moveToBookmark(mceSelectedBookmark);
						}
						
						
					});
					
					// INSERT REPLY-TO LINK HERE IF THIS IS THE FIRST TIME THE EDITOR IS INITIATED
					
					if(replyLink) {
						ed.execCommand('mceInsertContent', false, replyLink);
					}
					
					
					
				});
				
			}
			
			
		});
		
	}
}



// handle clicks on wysi toolbar buttons that appear in plain-text mode
$().ready(function() {
	
	
	$('.form-submit-wysi .mceToolbar a').click(function() { 
		if(mceBody) { // if there's an active editor available to toggle
			$('.form-submit-wysi').toggleClass('mceEditHTMLMode'); 
			tinymce.execCommand('mceToggleEditor',false,'textarea-submit');
			// Put focus on editor whenever it's opened
			// Blur the body it's focused but not correctly focused
			mceBody.blur();
	
			// Refocus the body after a little while
			setTimeout(function() {
				mceBody.focus();
			}, 0);
		}
		else {
			alert('Rich text editing is not supported in your current browser or device');
		}
	
	});
	$('.form-submit-wysi .mceToolbar a.mce_bold').click(function() { 
		if(mceBody) { // if there's an active editor available to toggle
			tinymce.execCommand('Bold');
		}
	});
	$('.form-submit-wysi .mceToolbar a.mce_italic').click(function() { 
		if(mceBody) { // if there's an active editor available to toggle
			tinymce.execCommand('Italic');
		}
	});
	$('.form-submit-wysi .mceToolbar a.mce_underline').click(function() { 
		if(mceBody) { // if there's an active editor available to toggle
			tinymce.execCommand('Underline');
		}
	});
	$('.form-submit-wysi .mceToolbar a.mce_simplelink').click(function() { 
		if(mceBody) { // if there's an active editor available to toggle
			var inp = document.getElementById('input-insert-link');
			
			$('.form-submit-wysi').toggleClass('mceSimpleLink');
			
			// Blur the input; it's focused but not correctly focused
			inp.blur();

			// Refocus the input after a little while
			setTimeout(function() {
				inp.focus();
			}, 0);
		
			simpleLinkPanelOpen = true;
		}
	});
	$('.form-submit-wysi .mceToolbar a.mce_bullist').click(function() { 
		if(mceBody) { // if there's an active editor available to toggle
			tinymce.execCommand('InsertUnorderedList');
		}
	});
	$('.form-submit-wysi .mceToolbar a.mce_numlist').click(function() { 
		if(mceBody) { // if there's an active editor available to toggle
			tinymce.execCommand('InsertOrderedList');
		}
	});
	$('.form-submit-wysi .mceToolbar a.mce_html').click(function() { 
		if(mceBody && mcePlaceholder) { // if there's an active editor available to toggle
			tinymce.activeEditor.execCommand('mceInsertContent', false, mcePlaceholder);
		}
	});
	
	// SUBMIT BUTTONS IN MODALS
	
	$('.modal-submit .btn-primary').click(function() { 
		modalSubmit();
	});
	
	// IFRAME MODALS
	var ref = document.referrer;
	var postEdit = ref.search('/edit.php?') != -1;
	if(postEdit) { 
		// you are inside an iframe 
		// (it was pointing to an edit.php page and you submitted an edit, 
		// which updated the iframe to a new page showing your edits
		// now you want to refresh the *parent* page to show the edits on that page
		window.parent.location.reload();
	}
				
});

function modalSubmit() {
	var modal = $('.modal.in'); // active modal
	var isIframe = $('body').attr('class').search('page-iframe') != -1;
	if (isIframe) {
		modal = $('.modal.modal-inline');
	}
	var textareaHasContent = false;
	var val, ed, plainTextarea;
	if(mceBody) {
		ed = tinyMCE.activeEditor;
		if(!isPlainText) {
			val = ed.getContent();
		}
		else {
			// first toggle back to rich text so you can get most recent contents
			tinymce.execCommand('mceToggleEditor',false,'textarea-submit');
			val = ed.getContent(); 
			// now toggle back to previous state
			tinymce.execCommand('mceToggleEditor',false,'textarea-submit');
		}
		// now remove empty p tags (containing only nbsp or spaces)
		
		
	}
	else { // tinyMCE never initiated - plain text editor shown
		plainTextarea = $('.modal-submit textarea');
		if(plainTextarea != null) {
			val = plainTextarea.val();
		}
	}
	
	var regexp = /<p[^>]*>(\s|&nbsp;?)*<\/p>/g;
	val=val.replace(regexp, '');
	
	if(!(val.length == 0 || val.match(/^\s*$/)) // if the value isn't empty or comprised only of spaces
	     && val.search('id="placeholder"') == -1 ) { // and the value doesn't contain a placekeeper (which would mean it's empty)
		textareaHasContent = true;
	}
	
	var isAsk = modal.attr('class').search('modal-submit-question') != -1;
	if(isAsk) {
		$('.modal-submit .control-group').removeClass('info');
		var inp = $('#input-question-title');
		var title = inp.val();
		var sel = $('#select-question-category');
		var cat = sel.val();
		var regexp = /^\s*$/g;
		title = title.replace(regexp,'');
		
		if(!textareaHasContent) {
			// To allow topics (questions) with no body text
			// need to insert something into the body field (which gets stripped out on display);
			var emptyText = '&zwnj;';
			if(mceBody) {
				ed.execCommand('mceInsertContent', false, emptyText);
			}
			else {
				plainTextarea.val(emptyText);
			}
		}
		
		if(title == '') {
			alert('Please add a title');
			inp.focus();
			inp.parent().toggleClass('info');
		}
		else if(title.length<5) {
			alert('Please make your title more descriptive - to help others find and answer your question more quickly');
			inp.focus();
			inp.parent().toggleClass('info');
		}
		else if(cat == 0) {
			alert('Please choose a category');
			sel.focus();
			sel.parent().toggleClass('info');
		}
		else {
			if(isIframe) {
				submitEdit();
			}
			var form = $('.form-submit-wysi');
			form.submit(); // reloads page so don't need to reset the modal
		}
		return;
	
	}
	
	if(!textareaHasContent) {
		alert('Nothing to submit');
		if(!isPlainText) {
			ed.focus();
		}
		else {
			$('textarea.wysi').focus();
		}
	}
	
	else {
		if(isIframe) {
			submitEdit();
		}
		var form = $('.form-submit-wysi');
		form.submit(); // reloads page so don't need to reset the modal
	}

}
function submitEdit() {
	// IFRAMES
	// all edits are done inside iframes calling an edit.php page
	// when you submit an edit, hide the edit modal and open an stand-in ('loading...') modal on parent page
	// then when the original edit modal refreshes (after submit is finished) 
	// it'll trigger a refresh of parent page, showing your edit
	var target_noframe = '#' + $('.modal').attr('id');
	var target = target_noframe + '-iframe';
	var target_modal, target_modal_noframe, target_window;
	target_window = window.parent;
	target_modal = target_window.$(target); 
	target_modal_noframe = target_window.$(target_noframe);
	target_modal_noframe.children('.modal-header').children('h1').html('Edit');
	target_modal_noframe.children('.modal-body').children('.form-submit-wysi').hide();
	target_modal_noframe.children('.modal-body').children('.loading').show();
	target_modal.modal('hide');
	target_modal_noframe.modal('show');
}
function simpleLinkUpdate(action) {
	var inp = document.getElementById('input-insert-link');
	var href = validateURL(inp.value);
	var ed = tinyMCE.activeEditor;
	
	function resetPanel() {
		// reset & close the simplelink panel
		inp.value = ''; // clear input field for subsequent usage
		$('.form-submit-wysi').toggleClass('mceSimpleLink'); // close the simplelink panel
		simpleLinkPanelOpen = false;
		
		// reset the caret position in the active editor
		ed.focus();
		ed.selection.moveToBookmark(mceSelectedBookmark);
		
		// enable update of bookmark on subsequent instances of simplelink	
		mceBookmarked = false;
	}
	if (action == 'cancel' || (href == 'empty' && mceSelectedNode.nodeName != 'A')) {
			// if user clicks cancel or 
			// clicks insert when the url field is empty and the tinyMCE cursor is not inside a link
			// just close the panel
			resetPanel();
			return;
	}
	else if(!href) { // if URL isn't valid
		alert('Please enter a valid URL');
		// Refocus the input
		inp.focus();
		return;
	} 
	else {
		resetPanel();
		if (href == 'empty' && mceSelectedNode.nodeName == 'A') { 
			// if href input field is empty but link is selected, remove link
				b = ed.selection.getBookmark();
				ed.dom.remove(mceSelectedNode, 1);
				ed.selection.moveToBookmark(b);
				return;
		}
		else { // if URL is valid
				
			if(mceSelectedNode.nodeName != 'A' && ed.selection.isCollapsed()) {
				// if you're not inside a link and
				// the caret is on a single point
				// create and insert a new link
				var newLink = ' <a href=\"'+href+'">'+href+'</a> ';
				ed.execCommand("mceInsertContent", false, newLink);
			}
			else {
				tinyMCE.execCommand("mceInsertLink", false, href);
			}
			
		}
		
	}
	
}

var searchForm, searchButton, searchInput;
function submitSearch() {
	var query = escape(searchInput.val());
	location.href = 'http://help.xanga.com/search.php?q=' + query;
}
// OTHER PAGE INIT STUFF
$().ready(function() {
	
	// SEARCH 
	// add submit events
	searchForm = $('.navbar-search');
	searchButton = searchForm.children('.btn');
	searchInput = searchForm.children('input');
	searchButton.click( function() {
		submitSearch();
	});
	searchInput.keypress( function(e) {
		executeOnEnter(e,null, submitSearch);
	});
	// add ".focused" to search forms when search query fields are focused
	var q = $('.search-query');
	var s = $('.navbar-search');
	q.focus(function() {
		s.toggleClass('focused');
	});
	q.blur(function() {
		s.toggleClass('focused');
	});
	
	// Bootstrap Popovers
	$('#wrapper').tooltip({
      selector: "a[rel=tooltip]",
	  placement: "right"
    })
	
	$('#nav-item-admin-movelink').click( function() {
		toggleMove();
	});
	$('#nav-item-admin-move-cancel').click( function() {
		toggleMove();
	});
	
});

function toggleMove() {
	$('.subnav').children('menu').toggle();
}

// UTILITIES

// ExecuteOnEnter 
// executes a function upon clicking return or enter while inside a field
function executeOnEnter(evt, type, func) {

	var keyCode = evt.keyCode ? evt.keyCode : 
        evt.charCode ? evt.charCode :
        evt.which ? evt.which : void 0;
    if (keyCode == 13) {
     	func();

		// prevent bubbling, etc. so nothing gets fired after your target func
	    if(evt.preventDefault) {  
			evt.preventDefault();  
		}
		else {  // IE
			evt.returnValue = false;  
			evt.cancelBubble=true;  
		}
    }
}

// VALIDATE URL 
// Returns 'empty' for empty field, 'false' for invalid url, and url itself for valid url

function validateURL (val) {

    // if field is empty or contains only spaces, don't do anything
    if (val.length == 0 || val.match(/^\s*$/)) { return 'empty'; }
 
 	// if field is not empty but contains spaces, convert spaces to URL-friendly format
	val = val.replace(/ /g, '%20');
	
    // if user has not entered http:// https:// or ftp:// assume they mean http://
    if(!/^(https?|ftp):\/\//i.test(val)) {
        val = 'http://'+val; // set both the value
    }
    // now check if valid url
    // http://docs.jquery.com/Plugins/Validation/Methods/url
    // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
    if(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val) ) {
		return val;
	}
	else {
		return false;
	}
}


// iOS ORIENTATION CHANGE FIX
/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}
	
    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );