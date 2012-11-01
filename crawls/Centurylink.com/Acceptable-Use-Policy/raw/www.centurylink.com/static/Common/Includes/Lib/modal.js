		var refType = "";
		var clickUrl = "";
		var profile_zipCode = "";
		var shopDomain = "";
		var suppDomain = "";
		
		function getCookieInfo(){
			profile_zipCode = subcookiejar.fetch('remember_me','zipCode');
			shopDomain = subcookiejar.fetch('profile_cookie','shoppingDomain');
			suppDomain = subcookiejar.fetch('profile_cookie','supportDomain');
			//console.log("profile_zipCode: " + profile_zipCode);
			//console.log("shopDomain: " + shopDomain);
			//console.log("suppDomain: " + suppDomain);
		}
		function retrieveURL(linkType){
			//console.log("inside retrieveURL()");
			//console.log("shopDomain:"+ shopDomain + ",linkType:"+linkType+",suppDomain:"+suppDomain);
			getDestinationUrl(shopDomain,linkType,'Shop',function(getUrl){
				//console.log("inside getDestinationUrl() ");
				if (getUrl.errorMessage != null){
					//console.log("getUrl.errorMessage: " + getUrl.errorMessage);
					setModalOmnitureVars("ctl|corp|zam","corp","unknown","zam_modal","event34","locator|zam","corp_"+linkType+"_zam:"+profile_zipCode,"zam - getUrls:"+getUrl.errorMessage);
					alert("There was an issue retrieving URL for link");
					returnUrl = "#";
				} else {
					//console.log("successful");
					setModalOmnitureVars("ctl|corp|zam","corp","unknown","zam_modal","event46","locator|zam","corp_"+linkType+"_zam:"+profile_zipCode,"");
					//console.log("getUrl.url: " + getUrl.url );
					if (linkType=="Click2Chat" || linkType=="clickToCall" ) {
						window.open(getUrl.url,'CenturyLinkPopWin','height=450,width=400,resizable=no,scrollbars=no,toolbar=no,location=no');
					} else {
						window.location = getUrl.url;
					}
				}
			}); //end getDestinationUrls	
		}
		function retrieveSearchURLs(shopDomain,modalType){
			//console.log("inside retrieveSearchURLs()");
			//console.log("shopDomain:"+ shopDomain + ",modalType:"+modalType);
			var topicArr = ['searchAction','searchSite','searchClient'];
			getDestinationUrls(shopDomain,topicArr,'Search',function(urlsSearch){
				if (urlsSearch.errorMessage) {
					alert("There was an issue retrieving URL for search"); //slert on errors
					//console.log("urlsSearch.errorMessage: " + urlsSearch.errorMessage);
					setModalOmnitureVars("ctl|corp|zam","corp","unknown","zam_modal","event34,event46","locator|zam","corp_"+refType+"_zam:"+profile_zipCode,"zam - getSearchUrls:"+urlsSearch.errorMessage);
				} else {
					setModalOmnitureVars("ctl|corp|zam","corp","unknown","zam_modal","event46","locator|zam","corp_"+refType+"_zam:"+profile_zipCode,"");
					$("#siteSearch").attr("action",urlsSearch.urlMap.searchAction);
					//console.log("action:"+urlsSearch.urlMap.searchAction);
					$("#siteSearch > input[name='site']").val(urlsSearch.urlMap.searchSite);
					$("#siteSearch > input[name='client']").val(urlsSearch.urlMap.searchClient);
					$("#siteSearch > input[name='proxystylesheet']").val(urlsSearch.urlMap.searchClient);
					$("#siteSearch").submit();
				}
			}); //end getDestinationUrls	
		}
		function loadModal(file,refParm){
			refType = refParm;
			$("#modalDialog").load(file, function(){
				$("#modalDialog").modal({
					overlayClose:true,
					autoPosition:true,
					opacity:60,
					onClose: function(dialog){
						refType = "";
						$.modal.close();
						$("#modalDialog").html("");
					}
				});
			});
		}
		function loadModal2(file,refParm){
			refType = refParm;
			$("#modalDialog").load(file, function(){
				$("#modalDialog").modal({
					overlayClose:true,
					closeHTML: "<a title='close' href='#'>Close </a><a title='close' class='simplemodal-close2' href='#'></a>",
					autoPosition:true,
					opacity:60,
					onClose: function(dialog){
						refType = "";
						$.modal.close();
						$("#modalDialog").html("");
					}
				});
			});
		}		
		function openPopup(pageURL,title,w,h) {
			var left = (screen.width/2)-(w/2);
			var top = (screen.height/2)-(h/2) - 75;
			var targetWin = window.open(pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
		}
		function reloadModal(url,height){
			$("#simplemodal-container").fadeOut("fast", function(){
				$('#simplemodal-container').height(height);
				$("#modalContent").load(url);
				$('#simplemodal-container').fadeIn("slow", function(){});
					$.modal.setPosition();
			});
		}

		function setOmnitureVars(){
			s.linkTrackVars= "pageName,server,channel,eVar41,prop3,eVar24,prop6,prop38,eVar48,prop39,eVar49,prop52,eVar56";
			s.pageName="ctl|rsd|smb_cam";
			s.server="centurylink.com";
			s.channel=s.eVar41="smb";
			s.prop3=s.eVar24="Unknown";
			s.prop6="clinkbusiness,clinkcompany,clinkCTLdomain"; 
			s.prop38=s.eVar48="modal";
			s.prop39=s.eVar49="smb_cam_modal";
			s.prop52=s.eVar56="ctl";
			void(s.t());
		}
		function setModalOmnitureVars(parm_PageName,parm_channel,parm_custType,parm_modalType,parm_event,parm_registryMethod,parm_registryDetail,parm_sysError){
			s.linkTrackVars = "pageName,server,channel,eVar41,eVar51,prop3,eVar24,prop6,prop38,eVar48,prop39,eVar49,prop52,eVar56,prop51,eVar60,events";
			s.linkTrackEvents = parm_event;
			s.server = "centurylink.com";
			s.prop6 = "clinkbusiness,clinkcompany,clinkCTLdomain"; 
			s.prop38=s.eVar48 = "modal";
			s.prop52=s.eVar56 = "ctl";
			s.pageName = parm_PageName; //ie. ctl|corp|zam
			s.channel=s.eVar41 = parm_channel; //ie. corp
			s.prop3=s.eVar24 = parm_custType; //ie. unknown
			s.prop39=s.eVar49 = parm_modalType; //ie. zam_modal
			s.prop51=s.eVar51 = parm_registryMethod; //ie. locator|zam
			s.eVar60 = parm_registryDetail; //ie. zam:[zipcode]
			s.prop4=s.eVar28 = parm_sysError; //ie. zam - [system error text] - [modal display text]
			s.events = parm_event;  
			void(s.t());
		}

        function setNotifyMeModalOmnitureVars(parm_custType, param_trackClickEvent, parm_event, parm_sysError)
        {
          s.linkTrackVars = "pageName,server,channel,events,linkTrackEvents,eVar41,prop3,eVar24,prop39,eVar49,prop4,eVar28,prop6,prop38,eVar48,prop52,eVar56,prop20,prop25,eVar53,prop26,eVar54,prop27,eVar55,eVar30";
		  
          s.pageName = "ctl|corp|notify_me"; //ie. ctl|corp|notify_me
          s.server = "centurylink.com";
          s.channel=s.eVar41 = "corp"; //ie. corp
          s.events = parm_event;
          s.linkTrackEvents = parm_event;
          s.prop3=s.eVar24 = parm_custType; //ie. unknown/NC/EC
          s.prop39=s.eVar49 = "notify_me_modal"; //ie. notify_me_modal
          s.prop4=s.eVar28 =  parm_sysError; //ie. zam - [system error text] - [modal display text]
          s.prop6 = "clinkcompany,clinkCTLdomain"; 
          s.prop38=s.eVar48 = "modal";
          s.prop52=s.eVar56 = "ctl";
          s.eVar30="CTL|rsd|Notify_Me|COM|" + param_trackClickEvent;
		  
          s.prop20="";
          s.prop25=s.eVar53="";
          s.prop26=s.eVar54="";
          s.prop27=s.eVar55="";
          void(s.t());
        }
			

		function toggleDisabled(elem){
				if ( $(elem).is(":visible") ){
				$(elem).hide();
				$(elem).after('<button id="loading" class="disabled" disabled="disabled">Loading</button>');
			} else {
				$("#loading").remove();
				$(elem).show();
			}
		}

		$(document).ready(function() {
			//add modal container to page
			if ($("#modalDialog").length == 0) {$("#main").after('<div id="modalDialog" style="display:block"></div>');}
			
			//handle removal of search backgrounds on focus (not needed on real page)
			$('#searchText').focus(function() {
				$(this).prev("label").css("background-image","none");
				$(this).prev("label").html("");
			});
			$('#searchText').keypress(function(e){
				if(e.which == 13){
					e.preventDefault();
					$("input[src='/static/Images/Layout/btnSiteSearch.gif']").focus().click();
					return false;
				}
			});
			$("#siteSearch > input[type='image']").addClass("loadZAMmodal search");
			
			//add click events for ZAM
			$.each($(".loadZAMmodal"), function(i,thisElem) {
				$(thisElem).attr("href","#");	
				$(thisElem).click(function() {
													
					var modalType = "support";
					var strHTML = $(thisElem).html();
					if( $(thisElem).hasClass('search') ) modalType = "Search";
					if( strHTML == "Customer Support" ) modalType = "support";
					if( strHTML == "Contact Us" ) modalType = "contactUs";
					if( strHTML == "Yellow Pages" ) modalType = "yellowPages";
					if( strHTML == "Email Offers" ) modalType = "emailOffers";
					if( strHTML == "Internet Security and Backup" ) modalType = "internetSecurity";
					if( strHTML == "FREE Wi-Fi" ) modalType = "freeWifi";
					if( strHTML == "Home Wireless Network" ) modalType = "homeWireless";
					if( strHTML == "Movies" ) modalType = "movies";
					if( strHTML == "Contact Customer Service" ) modalType = "support";
					if( strHTML == "Move My Services" ) modalType = "moveMyServices";
					if( strHTML == "Get help with moving" ) modalType = "moveMyServices";
					if( strHTML == "Click Here for Live Help" ) modalType = "clickToCall";
					if( strHTML == "My Account FAQs" ) modalType = "myAccountFAQs";
					if( strHTML == "Click2Chat" ) modalType = "Click2Chat";
					if( strHTML == "Find a Store" ) { window.location = "http://storelocator.centurylinkapps.com/"; }
					if( strHTML == "Store Locator" ) { window.location = "http://storelocator.centurylinkapps.com/"; }
					if( strHTML.indexOf("reponline.gif") >= 0 ) modalType = "Click2Chat"; //look for image name
					if( strHTML.indexOf("btnSiteSearch.gif") >= 0 ) modalType = "Search"; //look for image name

					//check profile cookie for Domain to remove unnecessary modal loads
					getCookieInfo();
					if ( shopDomain != null && modalType != "Search"  ){
						//console.log("retrieveURL('" + modalType + "')");
						retrieveURL(modalType);
						return false;
					} else if ( shopDomain != null && modalType == "Search"  ){
						//console.log("call retrieveSearchURLs('" + shopDomain + "','" + modalType + "')");
						retrieveSearchURLs(shopDomain,modalType);
						return false;
					} else {
						loadModal('/static/Pages/Modals/ZAM.txt',modalType);
						return false;
					}		
				});
			});
			
			//add click events for CTAM
			$.each($(".loadCTAMmodal"), function(i,thisElem) {
				//$(thisElem).attr("href","#");
				$(thisElem).click(function() {
					loadModal('/static/Pages/Modals/CTAM.txt','Change');
					clickUrl=this.href;
					setOmnitureVars();
					return false;
				});
			});
			
			//add click events for MAM
			/* COMMENT OUT MAM LOGIC SINCE WE CAN JUST DROP THE USER ON MY ACCOUNT LANDING
			$.each($(".loadMAMmodal"), function(i,thisElem) { 
				if ( $(thisElem).parent().hasClass('aboutSectn') ){
					$(thisElem).attr("href","#");
					$(thisElem).click(function() {
						loadModal('/static/Pages/Modals/MAM.txt','MyAcct');
						return false;
					});
				}
			});
			*/
			
			//add click events for Notify Me
			$.each($(".loadNotifyMemodal"), function(i,thisElem) {
				$(thisElem).attr("href","#");
				$(thisElem).click(function() {
					loadModal('/static/Pages/Modals/NotifyMeModal.txt','NotifyMe');
					return false;
				});
			});
			
			//add click events for Notify Me Prism
			$.each($(".loadNotifyMePrismModal"), function(i,thisElem) {
				$(thisElem).attr("href","#");
				$(thisElem).click(function() {
					loadModal('/static/Pages/Modals/NotifyMePrismModal.txt','NotifyMe');
					return false;
				});
			});
			
			
			//add click events for Monthly Charges
			$("#loadMonthlyChargesModal").click(function() {
				loadModal2('/static/Pages/Modals/MonthlyChargesModal.txt','MonthlyCharges');
				return false;
				});
			//add click events for One-Time Charges
			$("#oneTimeChargesModal").click(function() {
				loadModal2('/static/Pages/Modals/OneTimeChargesModal.txt','OneTimeCharges');
				return false;
				});

		});
		