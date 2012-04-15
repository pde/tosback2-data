jQuery(document).ready(function(){
	if (jQuery(document.body).data("initModals") != true) {
		jQuery(document.body).data("initModals", true);
		jQuery("a.openModal").click(function(e) {
			var classes = this.className.split(" ");/* second class should be modal type */
			if (classes.length > 1 && modalProfiles[classes[1]]) {
				var modal =  modalProfiles[classes[1]];
				modal.preConfig({element:this, config:modal});
				jQuery.colorbox(modal.cbConfig);
			}
			e.preventDefault();e.stopPropagation();
		});
	}
});

var modalUtils = {
		init : function() { /* perform standard initialization for content */
			var modalContent = jQuery(".modalContent");
			modalUtils.loadModalFiles(modalContent);
			if (jQuery("form", modalContent).length != 0) {
				jQuery(".styled_forms input, .styled_forms textarea, .styled_forms select", modalContent).uniform();
			}
			if (jQuery(".toggle", modalContent) != 0) { toggle(); }
			if (jQuery(".toggleGroup", modalContent) != 0) { toggleGroup(); }
			jQuery(".modalHeader .closeModal, .modalContent .closeModal").click(function(){ parent.jQuery.colorbox.close(); return false; });
		},
		
		initIframe : function() {
			setTimeout( function(){
				jQuery(".cboxIframe").contents().find(".modalHeader .closeModal, .modalContent .closeModal").click(function(){ parent.jQuery.colorbox.close(); return false; });
			}, 1500); // oncomplete fires too soon add delay (IE7)
		},
		
		loadModalFiles : function(modalContent) {
			if (!jQuery.uniform && jQuery("form", modalContent) != 0) {
				jQuery.getScript('http://www.att.com/scripts/jquery.uniform.js', function(){}, true);
			}
		},
		localModalInit : function(args) {
			var contextRoot = (window.location.href.indexOf("/shop/") >= 0) ? "/shop" : "/homepage";
			jQuery.getScript(contextRoot + '/dwr/interface/DWRRequestManager.js', function(){}, true);
			jQuery.getScript(contextRoot + '/dwr/engine.js', function(){}, true);
			jQuery.getScript('/scripts/localization.js', function(){ Localization.init(args); }, true);
		},
		config : function(args) {
			args.config.cbConfig.href = args.element.href;
		},
		
		openModal : function(url, config) {
			var modal = config || modalProfiles.modal505;
			modal.cbConfig.href = url;
			jQuery.colorbox(modal.cbConfig);
		}
};

var modalProfiles = {/* cbConfig : colorbox configuration | preConfig : function called before modal */
		modalXXX : {cbConfig : {iframe:false, scrolling:false, onComplete:modalUtils.init, href:''}, preConfig:modalUtils.config},
		modal505 : {cbConfig : {iframe:false, scrolling:false, width:505, onComplete:modalUtils.init, href:''}, preConfig:modalUtils.config},
		modal705 : {cbConfig : {iframe:false, scrolling:false, width:705, onComplete:modalUtils.init, href:''}, preConfig:modalUtils.config},
		intentModal : {cbConfig : {iframe:false, scrolling:false, width:505, onComplete:modalUtils.init, href:''}, preConfig:modalUtils.config},
		modal705x400 : {cbConfig : {iframe:false, scrolling:false, width:705, onComplete:modalUtils.init, height:400, href:''}, preConfig:modalUtils.config},
		channelModal : {cbConfig : {iframe:false, scrolling:false, width:1010, onComplete:modalUtils.init, href:''}, preConfig:modalUtils.config},
		offerDetailsModal : {cbConfig : {iframe:false, scrolling:false, onComplete:modalUtils.init, href:''}, preConfig:modalUtils.config},
		localModal : {cbConfig : {iframe:true, scrolling:false, width:505, height:315, onComplete:modalUtils.initIframe, href:'/shop/localization/index.jsp'}, preConfig:modalUtils.localModalInit}
};