// JavaScript Document



var hsocial_tool = {
	twitter : {
		getNumber : function(){
			$.getJSON("/api_static/twitter.json",function(json){
				// just adding  a "," in our 4+ digit numbers..
				console.log(json);
				nStr = json.followers_count || json[0].user.followers_count;
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				$("[hsocial='twittercount']").html(x1+x2);
			});
		}
	},
	tracking : {
		iframes : {
			fblikeTop : {dom: null, traced : false},
			fblikeBot : {dom: null, traced : false},
			twitterTop : {dom: null, traced : false},
			twitterBot : {dom: null, traced : false},
			pinTop : {dom: null, traced : false},
			pinBot : {dom: null, traced : false}
		},
		start : function(){//iframe script inspired from http://infinity-infinity.com/wp-content/uploads/2010/09/IframeOnClick.js
			if (document.activeElement){
				var  i;
				for (i in this.iframes){
					if (document.activeElement === this.iframes[i].dom){
						if (this.iframes[i].traced === false){
							this.fireIframeEvent(this.iframes[i]);
							this.iframes[i].traced = true;
						}
					} else {
						this.iframes[i].traced = false;
					}
				}
			}
		},
		fireIframeEvent : function(dom){
//			alert("FIRIN MAH LAZUR")
			console.dir(dom);
//			return false;
			switch (dom){
				case this.iframes.fblikeTop:						
					eventTracking("event81");
					break;
				case this.iframes.fblikeBot:				
					eventTracking("event81");
					break;
				case this.iframes.twitterTop:				
					eventTracking("event85");
					break;
				case this.iframes.twitterBot:				
					eventTracking("event85");
					break;
				case this.iframes.pinTop:
					eventTracking("event26");
					break;
				case this.iframes.pinBot:
					eventTracking("event26");
					break;					
			}
		},
		init : function(){
			this.iframes.fblikeTop.dom= $("[hvtnode='fblikebutton'] iframe")[0];
			this.iframes.twitterTop.dom = $("[hvtNode='twlikebutton']")[0]; 
			this.iframes.fblikeBot.dom = $("[hvtnode='fblikebutton'] iframe")[1];
			this.iframes.twitterBot.dom = $("[hvtNode='twlikebutton']")[1]; 
			this.iframes.pinTop.dom = $("[hvtnode='pinbutton'] a")[0];
			this.iframes.pinBot.dom = $("[hvtNode='pinbutton'] a")[1]; 
			$("[hTrack='emailTop']").click(function(){eventTracking("event87");hsocial_tool.tracking.emailTop();});
			$("[hTrack='printTop']").click(function(){eventTracking("event83");});
			$("[hTrack='emailBot']").click(function(){eventTracking("event87");hsocial_tool.tracking.emailBot();});
			$("[hTrack='printBot']").click(function(){eventTracking("event83");});
			$("#btnShareSend").click(function(){hsocial_tool.tracking.sendEmail();});
			$("[hsocial='pinterest_modal'] a").click(function(){eventTracking("event73");});
			$(".xs_soc_fbshare").click(function(){eventTracking("event99");});			
			setInterval(function(){hsocial_tool.tracking.start();},250);
			
			$(document).ready(function(){
				FB.Event.subscribe('comment.create',function(response){
					eventTracking('event31');
				})
			})
		},
		emailPositionLastPressed : null,
		emailTop : function(){
			$("#btnShareSend").click(function(){hsocial_tool.tracking.sendEmail();});
			this.emailPositionLastPressed = "top";
		},
		emailBot : function(){
			$("#btnShareSend").click(function(){hsocial_tool.tracking.sendEmail();});
			this.emailPositionLastPressed = "bot";
		},
		sendEmail : function(){
			if(this.emailPositionLastPressed === "top"){
				eventTracking("event88");
			} else if(this.emailPositionLastPressed === "bot"){
				eventTracking("event88");
			} else {
				$h.console.error("[hsocial_tool.tracking.sendmeail] email Position event call undetermined");
			}
			this.emailPositionLastPressed = null;
		}
	},
	hoverin : function(jqo){
		//console.log("in! "+jqo.attr("id")+" : "+jqo.attr("hsocial")+" [lastspot:"+hsocial_tool.lastspot+"]");
		clearTimeout(hsocial_tool.timer);
		if (jqo.attr("hsocial") === "modal"){
			//$h.console.log("hsocial attr found");
			// we don't want the modal window to move
		} else if (hsocial_tool.lastspot === jqo.attr("hsocial")){
			hsocial_tool.pointer.modal.show();
		} else {
//			console.warn("hsocial attr NOT found");
			if (jqo.attr("hsocial") === "facebook"){
				// activate facebook popup
				hsocial_tool.pointer.facebook_modal.show();
				hsocial_tool.pointer.twitter_modal.hide();
				hsocial_tool.pointer.pinterest_modal.hide();
				hsocial_tool.pointer.tumblr_modal.hide();
				hsocial_tool.pointer.linkedin_modal.hide();
				hsocial_tool.pointer.googlep_modal.hide();
				hsocial_tool.pointer.newsltr_modal.hide();	
			} else if (jqo.attr("hsocial") === "twitter"){
				// activate twitter popup
				hsocial_tool.pointer.facebook_modal.hide();
				hsocial_tool.pointer.twitter_modal.show();
				hsocial_tool.pointer.pinterest_modal.hide();
				hsocial_tool.pointer.tumblr_modal.hide();
				hsocial_tool.pointer.linkedin_modal.hide();
				hsocial_tool.pointer.googlep_modal.hide();
				hsocial_tool.pointer.newsltr_modal.hide();	
			} else if (jqo.attr('hsocial') == 'pinterest'){
				hsocial_tool.pointer.facebook_modal.hide();
				hsocial_tool.pointer.twitter_modal.hide();
				hsocial_tool.pointer.pinterest_modal.show();
				hsocial_tool.pointer.tumblr_modal.hide();
				hsocial_tool.pointer.linkedin_modal.hide();
				hsocial_tool.pointer.googlep_modal.hide();
				hsocial_tool.pointer.newsltr_modal.hide();
			} else if (jqo.attr('hsocial') == 'tumblr') {
				hsocial_tool.pointer.facebook_modal.hide();
				hsocial_tool.pointer.twitter_modal.hide();
				hsocial_tool.pointer.pinterest_modal.hide();
				hsocial_tool.pointer.tumblr_modal.show();
				hsocial_tool.pointer.googlep_modal.hide();
				hsocial_tool.pointer.newsltr_modal.hide();
			} else if (jqo.attr('hsocial') == 'linkedin') {
				hsocial_tool.pointer.facebook_modal.hide();
				hsocial_tool.pointer.twitter_modal.hide();
				hsocial_tool.pointer.pinterest_modal.hide();
				hsocial_tool.pointer.linkedin_modal.show();
				hsocial_tool.pointer.googlep_modal.hide();
				hsocial_tool.pointer.newsltr_modal.hide();
			} else if (jqo.attr('hsocial') == 'googlep'){
				hsocial_tool.pointer.facebook_modal.hide();
				hsocial_tool.pointer.twitter_modal.hide();
				hsocial_tool.pointer.pinterest_modal.hide();
				hsocial_tool.pointer.tumblr_modal.hide();
				hsocial_tool.pointer.linkedin_modal.hide();
				hsocial_tool.pointer.googlep_modal.show();
				hsocial_tool.pointer.newsltr_modal.hide();			
				
			} else {// all else, just use email
				// activate email popup
				hsocial_tool.pointer.facebook_modal.hide();
				hsocial_tool.pointer.twitter_modal.hide();
				hsocial_tool.pointer.pinterest_modal.hide();
				hsocial_tool.pointer.googlep_modal.hide();
				hsocial_tool.pointer.linkedin_modal.hide();
				hsocial_tool.pointer.newsltr_modal.show();	
			}
			hsocial_tool.pointer.facebook_modal.find("."+jqo.attr("tooltipShow")).show();
			hsocial_tool.pointer.twitter_modal.find("."+jqo.attr("tooltipShow")).show();
			hsocial_tool.pointer.pinterest_modal.find("."+jqo.attr("tooltipShow")).show();
			hsocial_tool.pointer.tumblr_modal.find("."+jqo.attr("tooltipShow")).show();
			hsocial_tool.pointer.linkedin_modal.find("."+jqo.attr("tooltipShow")).show();
			hsocial_tool.pointer.googlep_modal.find("."+jqo.attr("tooltipShow")).show();
			hsocial_tool.pointer.newsltr_modal.find("."+jqo.attr("tooltipShow")).show();
	
			hsocial_tool.pointer.facebook_modal.find("."+jqo.attr("tooltipHide")).hide();
			hsocial_tool.pointer.twitter_modal.find("."+jqo.attr("tooltipHide")).hide();
			hsocial_tool.pointer.pinterest_modal.find("."+jqo.attr("tooltipHide")).hide();
			hsocial_tool.pointer.tumblr_modal.find("."+jqo.attr("tooltipHide")).hide();
			hsocial_tool.pointer.linkedin_modal.find("."+jqo.attr("tooltipHide")).hide();
			hsocial_tool.pointer.googlep_modal.find("."+jqo.attr("tooltipHide")).hide();
			hsocial_tool.pointer.newsltr_modal.find("."+jqo.attr("tooltipHide")).hide();
			
			hsocial_tool.pointer.modal.addClass(jqo.attr("tooltipAddClass"));
			hsocial_tool.pointer.modal.removeClass(jqo.attr("tooltipRemoveClass"));
			
			// we want to move the modal window
			var offset = jqo.offset();
			var ttoffx = parseInt(jqo.attr("tooltipOffsetX"),10);
			var ttoffy = parseInt(jqo.attr("tooltipOffsetY"),10);
			hsocial_tool.pointer.modal.css("top", parseInt(offset.top,10)+parseInt(ttoffy,10)).css("left", parseInt(offset.left,10)+parseInt(ttoffx,10));
			hsocial_tool.animate.fadeIn();
			hsocial_tool.lastspot = jqo.attr("hsocial");
		}
	},
	hoverout : function(jqo){
		var offset = jqo.offset();
		hsocial_tool.queue_hide();
	},
	lastspot : null,
	pointer : {
		facebook: null,
		twitter: null,
		pinterest: null,
		tumblr:null,
		linkedin:null,
		googlep: null,
		newsletter: null,
		modal: null,
		facebook_modal: null,
		twitter_modal: null,
		pinterest_modal: null,
		tumblr_modal: null,
		linkedin_modal: null,
		googlep_modal: null,
		newsltr_modal: null
	},
	popup_show : function(){},
	popup_hide : function(){},
	queue_hide : function(){
		// this throws down a timeout event for 1.5 seconds to queue the hide
		hsocial_tool.timer = setTimeout(function(){$('#rr_social_tooltip,[hsocial="modal"]').hide();hsocial_tool.lastspot = null;},150);
	},
	animate : {
		setOpacity : function(opa){
			hsocial_tool.pointer.modal.css({ "opacity": opa });
		},
		timeoutArray : [],
		fadeIn : function(){
			while (hsocial_tool.animate.timeoutArray.length > 0){
				clearTimeout(hsocial_tool.animate.timeoutArray.pop());
			}
			var start = 1;
			var end = 0;
			var numframes = 20;
			var deltax = start-end;
			var framerate = 20;
			var incrementdifferences = [];
			var i;
			for (i=0; i <= numframes; i++) { // build out the list of opacity values to add
				incrementdifferences.push(Math.sin(i*Math.PI/2/numframes));
			}
			incrementdifferences = incrementdifferences.reverse();
			hsocial_tool.animate.setOpacity(0);
			hsocial_tool.pointer.modal.show();
			for (i=0; i <= numframes; i++) {
				var getnum = incrementdifferences.pop();
				hsocial_tool.animate.timeoutArray.push(window.setTimeout("hsocial_tool.animate.setOpacity("+getnum+")",framerate*i));
				if (i === 0){
					hsocial_tool.pointer.modal.show();
				}
			}
		}
	},
	timer : 0
};

var vtemail = {
	focus : function(isin){
		if (isin){
			$("#vt_nl_emailfield").removeClass("nofocus");
			if ($("#vt_nl_emailfield").attr("value") == vtemail.origEmailValue){
				$("#vt_nl_emailfield").attr("value","");
			}
		} else {
			$("#vt_nl_emailfield").addClass("nofocus");
			if ($("#vt_nl_emailfield").attr("value") == ""){
				$("#vt_nl_emailfield").attr("value",vtemail.origEmailValue);
			}
		}
	},
	validateForm : function(formobj){ return true },
	oldcolor : "",
	origEmailValue : ""
}

$(document).ready(function(){
	$("body").append($("[hsocial='modal']"));
	//$("#rr_soc_fb_cont,#rr_soc_tw_cont,#rr_soc_em_cont,#rr_social_tooltip").hover(function(){hoverin($(this));},function(){hoverout($(this));});
	$("[hsocial='facebook'],[hsocial='twitter'],[hsocial='newsltr'],[hsocial='modal'],[hsocial=pinterest],[hsocial=tumblr], [hsocial=linkedin],[hsocial=googlep]").live({
		  mouseenter: 
		  	function(){
				hsocial_tool.hoverin($(this));
				}, 
			mouseleave: 
				function(){
					hsocial_tool.hoverout($(this));
				}
		  });
	// setting up pointers so we don't have to make new references every time
	hsocial_tool.pointer.facebook = $("[hsocial='facebook']");
	hsocial_tool.pointer.twitter = $("[hsocial='twitter']");
	hsocial_tool.pointer.newsletter = $("[hsocial='newsltr']");
	hsocial_tool.pointer.pinterest = $('[hsocial=pinterest]');
	hsocial_tool.pointer.tumblr = $('[hsocial=tumblr]');
	hsocial_tool.pointer.linkedin = $('[hsocial=linkedin]');
	hsocial_tool.pointer.googlep = $('[hsocial=googlep]');
	hsocial_tool.pointer.modal = $("[hsocial='modal']");
	hsocial_tool.pointer.facebook_modal = $("[hsocial='facebook_modal']");
	hsocial_tool.pointer.twitter_modal = $("[hsocial='twitter_modal']");
	hsocial_tool.pointer.pinterest_modal = $('[hsocial=pinterest_modal]');
	hsocial_tool.pointer.tumblr_modal = $('[hsocial=tumblr_modal]');
	hsocial_tool.pointer.linkedin_modal = $('[hsocial=linkedin_modal]');
	hsocial_tool.pointer.googlep_modal = $('[hsocial=googlep_modal]');
	hsocial_tool.pointer.newsltr_modal = $("[hsocial='newsltr_modal']");
	vtemail.origEmailValue = $("#vt_nl_emailfield").attr("value");
	$("#vt_nl_emailfield").mouseenter(function(){hsocial_tool.hoverin($("#rr_soc_em_cont, #lr_soc_em_cont"));}); // hack for chrome hover issue
	hsocial_tool.tracking.init();
	hsocial_tool.twitter.getNumber();
	
	$('.tooltip_body a.tw_f').live("click", function(){
		if (typeof eventTracking !== 'undefined'){
			eventTracking('event94');
		}
	});
	$("#vt_nl_emailfield").parent("form").attr('onsubmit','');
	$("#vt_nl_emailfield").parent("form").unbind('submit');
	$("#vt_nl_emailfield").parent("form").bind('submit', submitEmailForm);
});

function submitEmailForm(evt) {
	evt.preventDefault();
	eventTracking('event95');
	if(!$(this).attr('id') || $(this).attr('id') == '') {
		var idStr = 'form-';
		for(var _i=0; _i<10; _i++) {
		idStr += Math.floor(Math.random()*11);
		}
	}

	$(this).attr('id', idStr);
	$(this).unbind('submit');
	setTimeout("$('#"+idStr+"').submit(); $('#"+idStr+"').bind('submit', submitEmailForm)", 1500);
}

$(window).load(function(){
	var firstToolbar = $('.viral_tools').get(0);
	var likeFBSocialToolBar = $('.connect_button_container').get(0);
	if ( typeof FB !== 'undefined' ){
		FB.Event.subscribe('edge.create',function(href,widget){
			var thisToolbar = $(widget.dom.parentNode).parents('.viral_tools').get(0);
			var thisSocialToolBar = $(widget.dom.parentNode).parents('.connect_button_container').get(0);
			if ( thisToolbar === firstToolbar ){
				eventTracking('event81');
			} 
			else if ( thisSocialToolBar === likeFBSocialToolBar){
				eventTracking('event93');
			}
		});
	}
});



function plusone_vote( obj ) {
	eventTracking('event91');
	}


