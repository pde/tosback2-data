var SiteHelper;

(function ($) {

	SiteHelper = {
		is_loaded: false,
		
		initialize: function () {
			var self = this;
			
			this.is_loaded = true;
			this.detectPopups();
			this.detectWT8Track();
			this.detectPaidSearch();
			this.likeButtonFanPage();
			
			$('#customer_service').click(function (e) { self.openCs(e) });
			$('#fp_help').click(function (e) { self.openHelp(e) });
			$('#email_friend').click(function (e) { self.openEmail(e) });
		},

		exitSite: function (from, destination, windowName, options, goesto, pid, sSite) {
			if (typeof sSite == "undefined") sSite = "us";
			while (destination.indexOf('+') != -1)
				destination = destination.replace('+', 'FPSMBplusFPSMB');
		
			if (destination.indexOf("golink.asp") != -1)
				newWindow = window.open(destination + '&FPFrom=' + from, windowName, options);
			else
				newWindow = window.open('/' + sSite + '/leaving.asp?FPDest=' + encodeURIComponent(destination) + '&FPFrom=' + escape(from) + '&goto=' + escape(goesto) + '&pid=' + pid, windowName, options);
		},
		
		openEmail: function (e) {
			e.preventDefault();
			thisHref = $('#email_friend').attr('href'); 
			window.open(thisHref, 'emailWindow', 'left=150,top=50,screenX=200,screenY=100,resizable=yes,scrollbars=yes,toolbar=no,width=750,height=685');
		},
		
		openHelp : function (e) {
			e.preventDefault();
			thisHref = $('#fp_help').attr('href'); 
			window.open(thisHref, 'fphelp', 'left=5,top=10,screenX=100,screenY=100,resizable=yes,location=yes,scrollbars=yes,toolbar=yes,menubar=yes,width=790,height=470');
		},

		openCs : function (e) {
			e.preventDefault();
		
			thisHref = $('#customer_service').attr('href');
			thisSite = thisHref.match(/(\w{1,})(?=\/default)/g)[0];
			this.exitSite('/'+thisSite+'/default.asp?', thisHref, 'MATTELCR', 'left=5,top=10,screenX=100,screenY=100,resizable=yes,location=yes,scrollbars=yes,toolbar=yes,menubar=yes,width=790,height=470', 'Customer Service', '-1', thisSite);
		},
		
		validateSearch: function (default_text, options) {
			var defaults = {
				error_tooltip: true,
				error_text: 'Enter word(s) or item #'
			};
			
			var opts = $.extend({}, defaults, options);
			
			$('form#searchform input[name=\'keyword\']').focus(function () {
				var $this = $(this);
				if($this.hasClass('error')) {
					$this.removeClass('error');
				}
				if ($.trim($this.val()) == default_text || $.trim($this.val()) == opts.error_text) {
					$this.val('');
				}
			});
			$('form#searchform input[name=\'keyword\']').blur(function () { 
				var $this = $(this);
				if( $.trim($this.val()) == '') {
					$this.val(default_text);
				}
			});
			
			$('form#searchform').submit(function () {
				var $form = $(this);
				var $keyword = $('input[name=\'keyword\']', $form);
				if ($.trim($keyword.val()) != default_text && $keyword.val() != '' && $keyword.val() != 'search' && $keyword.val() != opts.error_text) {
					return true;
				} else {
					$keyword.blur();
					if (opts.error_tooltip) {
						$.getUniqueScript('/pages/script/jquery/jquery.fp.plugin.tooltip.js', function () {
							$form.tooltip(opts.error_text, { name: 'search', corner: true });
						});
					} else {
						$keyword.val(opts.error_text);
						if(!$keyword.hasClass('error')) {
							$keyword.addClass('error');
						}
					}
					return false;
				}
			});
		},
		
		detectPaidSearch: function () {
			$('a#store, a#fpstore, a#fpstore_link, div.buy-now, div.product-buy-now').click(function () {
				si_tracking();
			});
		},
		
		detectPopups: function () {
			$('a[rel^=popup]').click(function (e) {
				e.preventDefault();
				var $link = $(this);
				var options = $link.attr('rel').split('|');
				
				var settings = {
					width: options[1] || 800,
					height: options[2] || 600,
					scrollbars: ($.inArray('scrollbars', options) != -1) ? 1 : 0,
					resizable: ($.inArray('resizable', options) != -1) ? 1 : 1,
					toolbar: ($.inArray('toolbar', options) != -1) ? 1 : 0,
					status: ($.inArray('status', options) != -1) ? 1 : 0,
					location: ($.inArray('location', options) != -1) ? 1 : 0,
					menubar: ($.inArray('menubar', options) != -1) ? 1 : 0
				};
				if (typeof popupwin != 'undefined' && !popupwin.closed) popupwin.close();
				popupwin = window.open($link.attr('href'), 'popup', 'width=' + settings.width + ',height=' + settings.height + ',scrollbars=' + settings.scrollbars + ',toolbar=' + settings.toolbar + ',status=' + settings.status + ',resizable=' + settings.resizable + ',location=' + settings.location + ',menubar=' + settings.menubar);
			});

    		$('a[rel^=lightbox]').click(function (e) {
				e.preventDefault();
				var $link = $(this);
				var options = $link.attr('rel').split('|');
				
				var settings = {
					name: options[1],
					width: options[2] || 800,
					height: options[3] || 600,
					overlay: ($.inArray('overlay', options) != -1) ? true : false
				};
				
				var $existing_lightbox = $('div[id^=lightbox-]');
			});
			
			$('a[rel^=comm]').click(function (e) {
				e.preventDefault();
				var $link = $(this);				
				var buywin = window.open($link.attr('href'), 'comm', 'resizable,width=640,height=525');
			});
			
			if( typeof DomHelper == 'undefined') {
				$('a[rel^=pdf]').append('<em class="window-warning">&nbsp;(<abbr title="Portable Document Format">PDF</abbr>, opens in new window)</em>');
				$('a[rel^=pdf]').click(function (e) {
					e.preventDefault();
					var $link = $(this);				
					var pdfwin = window.open($link.attr('href'), 'pdf', 'location=no,scrollbars,menubar,resizable,toolbar=no');
				});
				
				$('a[rel*=buy]').click(function (e) {
					e.preventDefault();
					var $link = $(this);				
					var buywin = window.open($link.attr('href'), 'buy', 'location,scrollbars,menubar,resizable,toolbar,width=782,height=400');
				});
				
				$('a[rel^=external]').click(function (e) {
					e.preventDefault();
					var $link = $(this);				
					var newwin = window.open($link.attr('href'), 'new', 'location,scrollbars,menubar,resizable,toolbar');
				});
			}
		},
		
		detectWT8Track: function () {
			$('a[wt8track]').click(function (e) {
				var $link = $(this);
				var params = $link.attr('wt8track').split('|');
				
				var settings = {
					name: params[0] || 'NONE',
					campaign: params[1] || 'NONE',
					channel: params[2] || 'NONE',
					contenttype: params[3] || 'NONE',
					action: params[4] || 'NONE'
				};
				
				if(typeof Tracker != 'undefined') {
					if((typeof WT == 'undefined') || ( !WT.wt8trackCalled))  {
						var scriptCall = 'Tracker.track(' + '{name:\'' + settings.name.replace(/\\/g,"\\\\").replace(/\'/g,"\\\'") +  				
							'\',campaign:CAMPAIGN.' + settings.campaign.toUpperCase() + 
							',channel:CHANNEL.' + settings.channel.toUpperCase() +
							',contenttype:CONTENTTYPE.' + settings.contenttype.toUpperCase() + 
							',action:ACTION.' + settings.action.toUpperCase() + '})';
						eval(scriptCall);
					}
				}
			});
		},
		
		likeButtonFanPage: function () {
			$('a.addthis_button_facebook_like_fan_page').each(function () {
				$(this).attr('fb:like:href', 'http://facebook.com/fisherprice');
			});
		}
	};

	$(document).ready(function () {
		if(!SiteHelper.is_loaded) SiteHelper.initialize();
		try {
		
		//css for endeca search autopopulate. This has to load after all page css is loaded. So being added in script.
//		$("head").append("<link>");
//		css = $("head").children(":last");
//		css.attr({
//		  rel:  "stylesheet",
//		  type: "text/css",
//		  href: "/pages/v7/us/core/css/autocomplete.css"
//		});
		
			//Endeca Search box auto populate
			//var data = "Core Selectors Attributes Traversing Manipulation CSS Events Effects Ajax Utilities".split(" ");		//local data example
			//Ntt parameter which pass-in the search term -- appended in autopopulate.js as it is dynamic. Check the ajax call in that JS.
			//Di - number of records to return from dimension search
			//Dp - Dimension Value from Data Feed.
		var url = "/fp.aspx?st=10&e=autocompletesearch&autocomplete=true&N=0&timer=false&Dp=10&Nty=1" ;		
		
		$("input#keyword_box").autocomplete(url, {minChars:2,
												delay:0, //time in ms before it triggers
												scroll:false, //will show scrollbars
											//	mustMatch:true,
												selectFirst: false,
												max:10, // number of items to show in dropdown
												formatItem: function (row){												
													var items = row[0].split(","); //Dimension Id
													//category descriptin can have ",". Combine the category description together.
													var itemDescription="";
													for (var i = 1; i<items.length; i++) {
															itemDescription = itemDescription + items[i] + ",";															
													}
														//remove the trailing ","
													if (itemDescription.charAt(itemDescription.length-1) == ",") {
														itemDescription = itemDescription.substring(0, itemDescription.length-1);
													}
														
													var itemclass = ( row[1] % 2 == 0) ? "ac_even" : "ac_odd" ;
													//return "<li id=\"" + items[0] + "\">" + itemDescription + "</li>";
													return "<li class=\"" + itemclass + "\" id=\"" + items[0] + "\">" + itemDescription + "</li>";

												}
			});
		
		//can't use the new jquery UI with the old library across the site. Multiple sites are breaking with latest global search autopopulate.			
		//$("input#keyword_box").autocomplete({source:[Action Figures/Adventure Toys,Action/Adventure Toys,Activity Gyms & Tables,Baby Activity Toys,Baby Care bathing, diapering & training,Baby toys - Crawling,Baby toys - Lay & Play,Baby toys - Sitting,Baby toys - Standing","Baby toys - Tummy Time","Baby toys - Walking" ]}); 															 // ["Baby Care bathing, diapering & training","Baby Care by Need","Baby Care Entertaining","Baby Care Feeding","Baby Care feeding]
//		$("input#keyword_box").autocomplete(
//						{ source: function (request, response) {
//							$.ajax({
//								url: "/fp.aspx",
//								dataType: "json",
//								async: true,
//								data: {
//									st: 10,
//									e: "autocompletesearch",
//									autocomplete: "true",
//									N: 0,
//									Ntt: request.term + "*",
//									timer: false
//									//D: request.term,
//									//Dp: 10, //number of records to return
//									//Di: 20 // Dimension Value from data feed
//								},
//								success: function (data, status, jxXHR) {
//									response(data);
//								}
//							});
//						},
//						minLength: 2,
//						select: function (event, ui) {
//						    var searchTerm = ui.item.label;														
//						    var $input = $('#keyword_box');
//						    $input.val(searchTerm);
//						    $('#keywordsearch').submit();							
//						}
//					});
		} catch (err) {
		   //alert(err);
		}
	});

}) (jQuery);