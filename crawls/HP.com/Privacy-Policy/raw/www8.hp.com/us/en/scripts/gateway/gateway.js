
/* =======[ BEGIN BROWSER DETECTION ]========================== */
var agt=navigator.userAgent.toLowerCase();
var is_major = parseInt(navigator.appVersion);
var is_ff	= (agt.indexOf("firefox") != -1);
var is_chr	= (agt.indexOf("chrome") != -1);
var is_ie	= (agt.indexOf("msie") != -1);
var is_ie6  = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
var is_ie7  = (is_ie && (is_major == 4) && (agt.indexOf("msie 7.")!=-1) );
var is_ie8  = (is_ie && (is_major == 4) && (agt.indexOf("msie 8.")!=-1) );
var is_win  = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
/* =======[ END BROWSER DETECTION ]========================== */


/* =======[ BEGIN GLOBAL VARIABLES ]========================== */
 var supportPgType = '';
 var supportText = '';
 
/* =======[ END GLOBAL VARIABLES ]========================== */

/* =======[ BEGIN SUPPORT AJAX CALL ]========================== */

function getSupport() {

	drawGMNButton();
	 
	if (($('drivers').checked == false) && ($('troubleshoot').checked == false)) {
		toggleSupportBottom(false);
	}
	else {
		if ($('drivers').checked == true)
			supportSelectedRadio = 'drivers';
		else 
			supportSelectedRadio = 'troubleshoot';
		supportPgType = (supportSelectedRadio=='drivers') ? 's-002' : 's-001';		
	}
	$('productInfo').set('value', supportText);
	
	
}

/* =======[ END SUPPORT AJAX CALL ]========================== */


/* =======[ BEGIN SUPPORT CODE ]========================== */


function drawGMNButton() {
	// This function decides whether or not to draw the "product detection" button.
	// This button has its own FORM. Nested html forms are invalid, so it is moved into right position in this function.
	var str = "";
	
	if( is_ie && is_win && (is_ie6 || is_ie7 || is_ie8) ||  is_ff  ||   is_chr)  {
		str = '<div>\n\
			<h3 class="bottomSpaceSmall" style="font-size: 120%;">'+ _or_automatically_detect_ +'</h3>\n\
			<div class="topSpaceSmall bottomSpace"></div>\n\
			<div style="text-align:center; ">\n\
			<form action="http://h20270.www2.hp.com/ediags/gmn2/welcome.aspx" method="get" name="productDetect" id="productDetect" class="zeroMargin">\n\
			<input type="submit" name="detectProducts" class="grayButton" tabindex="46" value="'+ _start_detection_ +' ">\n\
			<input type="hidden" name="lc" value="'+ll+'">\n\
			<input type="hidden" name="cc" value="'+cc+'">';
			//<input type="hidden" id="h_pagetype" name="h_pagetype" value="'+supportPgType+'">\n\
		str = str + '</form>\n\
			<div class="small topSpace linkColor"><a href="http://h20270.www2.hp.com/ediags/gmn2/About.aspx?cc='+cc+'&lc='+ll+'" tabindex="46">'+ _about_detection_ +'</a></div>\n\
			</div>\n\
			</div>';
	}
	if (str != "") {
		var btnNode = $('supportProductDetect');	
		if (btnNode != null) {
			btnNode.setStyle('display', 'block');
			//btnNode.setStyle('top', document.getElementById("supportProductSearch").offsetParent.offsetTop + "px");
			btnNode.setStyle('top', '140' + "px");
			var newdiv = document.createElement("div");
			newdiv.innerHTML = str;
			btnNode.appendChild(newdiv);
			
		}
	}
}

function toggleSupportBottom(visible) {
	var tabIndex = 46;
	var unClickable = document.getElementById('unClickable');
	if (!visible) {
		document.productQuery.h_query.disabled = true;
		document.getElementById("supportSubmitBtn").disabled = true;
		if ( document.getElementById("detectProducts") )
			document.getElementById("detectProducts").disabled = true;
		$('supportLeftColumn').set("tabIndex", "-1");
		unClickable.style.display = 'block';
		unClickable.style.height = (unClickable.offsetParent.offsetHeight - unClickable.offsetTop) + 'px';
	} else {
		if (unClickable.style.display == 'block') {
			// If bottom part is grayed-out then activate it else skip
			document.productQuery.h_query.disabled = false;
			document.getElementById("supportSubmitBtn").disabled = false;
			if ( document.getElementById("detectProducts") )
				document.getElementById("detectProducts").disabled = false;
			$('supportLeftColumn').set("tabIndex", tabIndex);
			
			if ($('productDetect') != null) {
				if ($('drivers').checked == true)
					supportPgType = 's-002';
				if ($('troubleshoot').checked == true)
					supportPgType = 's-001';
					
				//var field = document.createElement("input");
				//field.setAttribute("type","hidden");
				//field.setAttribute("value",supportPgType);
				//field.setAttribute("name","h_pagetype");
				//$('productDetect').appendChild(field);
			}
			unClickable.style.display = 'none';
		}
	}
}

//Begin Empty text field validation
function validText() {
	if  (document.productQuery.h_query.value == "" || document.productQuery.h_query.value == document.productQuery.h_query.defaultValue) {
	} return true;
}
	
// Begin Form Validation
function validateForm(){
	if (!validText())
	return false;
	if ( document.productQuery.h_pagetype[0].checked==false && document.productQuery.h_pagetype[1].checked==false )
		 document.productQuery.h_pagetype[1].checked = true;	
	return true;
}

/* =======[ END SUPPORT CODE ]========================== */


/* =======[ BEGIN FINDER EVENTS CODE ]========================== */

var over = 0;
var accessories_over = 0;
var promo_over = 0;

for (var ii=0; ii<$$('div.panel_blue').length; ii++) {

	var el_id = $$('div.panel_blue')[ii].id;
//	alert(el_id);
	if ((el_id == "") || (el_id === 'promoteaser_panel'))
		continue;
	var popup_id = el_id.split("_")[0]+"_popup";
//	alert(popup_id);
		
	$(el_id).addEvents({
		'mouseenter': function(){
			var popup_id = this.id.split("_")[0]+"_popup";
			finder_popup(popup_id);
		}
	});
	$(el_id).addEvents({
		'mouseover': function(){
			var popup_id = this.id.split("_")[0]+"_popup";
			finder_popup(popup_id);
		}
	});
	$(popup_id).addEvents({
		'mouseenter': function(){
			over = 1;
		}
	});
	$(popup_id).addEvents({
		'mouseleave': function(){
			var popup_id = this.id.split("_")[0]+"_popup"
			finder_popup_hide(popup_id);
			over = 0;
		}
	});
	$(el_id).addEvents({
		'mouseleave': function(){
			var popup_id = this.id.split("_")[0]+"_popup";
			if(over == 0) {
				finder_popup_hide(popup_id);
			}
		}
	});
	
		
}

if ( $('promoteaser_panel') != null) {
	//promo teaser events
	$('promoteaser_panel').addEvents({
		'mouseenter': function(){
			if(window.promotions.length > 0) {
				finder_popup('promoteaser');
			}
		}
	});
	$('promoteaser_panel').addEvents({
		'mouseover': function(){
			if(window.promotions.length > 0) {
				finder_popup('promoteaser');
			}
		}
	});
	$('promoteaser').addEvents({
		'mouseenter': function(){
			promo_over = 1;
		}
	});
	$('promoteaser').addEvents({
		'mouseleave': function(){
			finder_popup_hide('promoteaser');
			promo_over = 0;
		}
	});
	$('promoteaser_panel').addEvents({
		'mouseleave': function(){
			if(promo_over == 0) {
				finder_popup_hide('promoteaser');
			}
		}
	});
}



function finder_popup(id) {
	$(id).style.display = 'block';
	
}

function finder_popup_hide(id) {
	$(id).style.display = 'none';
}

/* =======[ END FINDER EVENTS CODE ]========================== */


/* =======[ BEGIN PROMO TEASER CODE ]========================== */
function goToPage(link) {
	window.location = link;
}

function showPromotions(promo) {
	var promo_item;
	var content = '';
	var i;
	var id = '';
	
	if(promo.length>0) {
		//promo_local comes from gateway_config.js
		$('panel_bottom_promotions').innerHTML = promotions_local;
		id = 'promotion_items';
		for(i=0; i<promo.length; i++) {
			promo_item = promo[i];
			var title = promo_item[0];
			var link = promo_item[1];
			var description = promo_item[2];
			content += '<div class="promo_item" onclick=goToPage("'+link+'");>';
			content += '<a href="'+link+'">'+title+'';
			content += '<br><span>'+description+'</span></a>';
			content += '</div>';
		}
		$(id).innerHTML = content;
	}
	else {
		$('panel_bottom_promotions').innerHTML = '<a class="promotions_link" href="'+$('see_all_promotions_link').href+'">'+$('panel_bottom_promotions').innerHTML+'</a>';
	}
}

/* =======[ END PROMO TEASER CODE ]========================== */


/* =======[ BEGIN SUPPLIES CODE ]========================== */

function overHeader(id) {
	$('element_header_1').style.display = 'none';
	$('element_header_2').style.display = 'none';
	$('element_header_3').style.display = 'none';
	$('supplies_right_banner').style.display = 'none';
	$('element_contents_'+id).style.display = 'block';
}

function outOfContainer(id) {
	$('element_contents_'+id).style.display = 'none';
	$('element_header_1').style.display = 'block';
	$('element_header_2').style.display = 'block';
	$('element_header_3').style.display = 'block';
	$('supplies_right_banner').style.display = 'block';
}

if ($('element_header_1') != null) {
	$('element_header_1').addEvents({
		'click': function(){
			overHeader('1');
		}
	});
}

if ($('close_1') != null) {
	$('close_1').addEvents({
		'click': function(){
			outOfContainer('1');
		}
	});
}

if ($('element_header_2') != null) {
	$('element_header_2').addEvents({
		'click': function(){
			overHeader('2');
		}
	});
}

if ($('close_1') != null) {
	$('close_2').addEvents({
		'click': function(){
			outOfContainer('2');
		}
	});
}

if ($('element_header_3') != null) {
	$('element_header_3').addEvents({
		'click': function(){
			overHeader('3');
		}
	});
}

if ($('close_3') != null) {
	$('close_3').addEvents({
		'click': function(){
			outOfContainer('3');
		}
	});
}

/* =======[ END SUPPLIES CODE ]========================== */

/* =======[ BEGIN 404 CODE ]========================== */

	//Cleans search box
	function clearGatewaySearch(el,txt){ el.value=txt; }
	
	//restores search box
	function restoreGatewaySearch(el,txt){ el.value=txt; }

/* =======[ END 404 CODE ]========================== */

var GatewayScrollbox = new Class({
	contentEl:null, 
	sliderEl:null, 
	sliderHandleEl:null, 
	slider:null, 
	initialize:function(contentEl, sliderEl, sliderHandleEl) {
		var me = this;
		this.contentEl = contentEl;
		this.sliderEl = sliderEl; 
		this.sliderHandleEl = sliderHandleEl;
		
		// Determine if this item needs a scroll
		var contentSize = this.contentEl.getScrollSize().y;
		if(contentSize <= this.contentEl.getSize().y) { return;};
		
		// Add some padding to the content so the scrollbar isn't covering anything
		var rightPad = this.contentEl.getStyle('padding-right').toInt();
		if(!$chk(rightPad) || rightPad == 'NaN') rightPad = 0;
		rightPad += 8;
		this.contentEl.setStyle('padding-right', rightPad+'px');
		
		// Display the scrollbar to the right of the contentEl
		var offsetParent = this.contentEl.getOffsetParent();
		var coords = null;
		if(offsetParent)
			coords = this.contentEl.getCoordinates(offsetParent);
		else
			coords = this.contentEl.getCoordinates();
			
		// arturp: updated the top coords to include eventual initial scroll position of news article, if called with url with anchor:
//alert("here:" + " " + this.contentEl.scrollTop);
		this.sliderEl.setStyles({
			display:"block", 
			height:coords.height, 
			position:'absolute', 
			top:(coords.top+this.contentEl.scrollTop)+'px', 
			left:coords.right+'px'
		});

				
		// Connect the scrolling functionality
		this.slider = new Slider(this.sliderEl, this.sliderHandleEl, {
			wheel: true,
			snap: false,
			steps: contentSize-coords.height,
			mode: 'vertical', 
			onChange: function(pos){
				//alert(me.contentEl.id + " " + pos);
				me.contentEl.scrollTo(0, pos);
				//alert(me.contentEl.getPosition().y);
			}
		});

		// arturp: set the initial value of slider's knob to current newsroom article scroll position:
		this.slider.set(this.contentEl.scrollTop);
		
		// arturp: add scrollbox object to content element, in order to have it accessible
		contentEl.scrollbox = this;

		// arturp: add onscroll event, so that when anchor link is clicked on the article, scroller gets to be updated
		this.contentEl.addEvent('scroll', function(){ /*alert(this.scrollTop); */ this.scrollbox.slider.set(this.scrollTop); });
		
		
		// Scroll the content element when the mousewheel is used within the scrollable content.
		this.contentEl.addEvent('mousewheel', function(e){	
				e = new Event(e).stop();
				var step = me.slider.step - e.wheel * 30;	
				me.slider.set(step);					
			});
			
		// Make text inside scroller area selectable by dragging mouse
		this.contentEl.addEvent('mousedown', function(e){	
				var yStart = e.client.y;
				me.contentEl.addEvent('mousemove',function(e){
					if (e.client.y >= yStart + 1) {
						var step1 = me.slider.step + 10;	
						me.slider.set(step1);
					}
					if (e.client.y < yStart - 1) {
					    var step1 = me.slider.step - 10;	
						me.slider.set(step1);
					}
					yStart = e.client.y;
					});
				me.contentEl.addEvent('mouseup',function(e){
					me.contentEl.removeEvents('mousemove');
					});
			});	
				
					
				
	}
		
});

document.getElements(".scrollbox_slider").each(function(slider) {
				new GatewayScrollbox($(slider.get('rel')), slider, slider.getElements(".handle")[0]);
			});

/* UnCompressed - Reason: UNKNOWN REASON */

/*
Date: 5/29/2012 10:02:02 AM
All images published
*/