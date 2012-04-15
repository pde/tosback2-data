if(typeof NICKJR == "undefined" || !NICKJR) var NICKJR = {};
KIDS.namespace("widgets", NICKJR);


NICKJR.widgets.shareWidget = function(){
	this.Flux = Flux;
	var that = this;
	
	this.add = function(template,container){
		if(!template)template="article";
		template = "share-"+template;
		that.writeTemplate(template,container);
		that.createFluxWidget(template);
		
		jQuery(document).ready(function(){
			jQuery('#'+template+'-link').mouseenter(function() {
				jQuery('#'+template+'-container').css("visibility","visible");
			}); 
			jQuery('#'+template+'-container').mouseleave(function() {
				jQuery('#'+template+'-container').css("visibility","hidden");
			}); 
		}); 
		
	}
	
	this.createFluxWidget = function(template){
		Flux.createWidget('Share',{
			contentUri: window.location.href.toString(),
			markupPlaceholder: 'shareMarkup',
			containerId: template+'-container',
			hideShareToFeedTab: true,
			hideShareToGroupsTab: true,
			elements: [
				{ id: 'Facebook', placeholder: 'share-icon-facebook' },
				{ id: 'Twitter', placeholder: 'share-icon-twitter' },
				{ id: 'Digg', placeholder: 'share-icon-digg' },
				{ id: 'MySpace', placeholder: 'share-icon-mySpace' },
				{ id: 'StumbleUpon', placeholder: 'share-icon-stumbleupon' },
				{ id: 'MyEmail', placeholder: 'share-icon-myemail' }
			]
		});
	}
	
	this.writeTemplate = function(template,container){
		var template = that.getShareWidgetTemplate(template);
		if(container){
			document.getElementById('#'+container).innerHtml=template;
		}else{
			document.write(template);
		}
	}
	
	this.getShareWidgetTemplate = function(template){
		var html="";
		html+="<div id='"+template+"-bar' class='share-bar'><div id='"+template+"-link' class='share-link'>&nbsp;</div>";
		html+="<div id='"+template+"-container' class='share-container'><div id='shareMarkup'>";
		html+="<!--";
		html+="<div class='share-container-right-col'>";
		html+=" <div class='share-icon share-icon-facebook'>&nbsp;</div>";
		html+=" <div class='share-icon share-icon-twitter'>&nbsp;</div>";
		html+=" <div class='share-icon share-icon-digg'>&nbsp;</div>";
		html+="</div>";
		html+="<div class='share-container-left-col'>";
		html+=" <div class='share-icon share-icon-mySpace'>&nbsp;</div>";
		html+=" <div class='share-icon share-icon-stumbleupon'>&nbsp;</div>";
		html+=" <div class='share-icon share-icon-myemail'>&nbsp;</div>";
		html+="</div>";
		html+="-->";
		html+="</div></div></div>";
		return html;
	}

}
shareWidget = new NICKJR.widgets.shareWidget();


