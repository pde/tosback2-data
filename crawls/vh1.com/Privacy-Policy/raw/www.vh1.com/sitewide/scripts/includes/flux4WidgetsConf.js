var MTVN = MTVN || {};
MTVN.conf = MTVN.conf || {};
MTVN.conf.flux4 = MTVN.conf.flux4 || {};

MTVN.conf.flux4["ucid"] = "87F6FFFF0099CB900002FFFFF687";

MTVN.conf.flux4.ubElements = [{id: 'MyStuff',showThumbnail: true}];

jQuery('#fwidgetvh1').bind("Flux4.coreLoad", function(){
    if(typeof window.Widgets4Context != 'undefined') 
        if (window.Widgets4Context.user) 
        	MTVN.conf.flux4.ubElements.push( { 
                id: 'ActivityFeed',
                settings: {
                    updateRequestInterval: 30,
                    injectSeconds: 10,
                    maxResults: 8				
                }
            });
        
});

MTVN.conf.flux4["widgets"] = {
	"userBar": {
 		"name": "UserBar",
 		"opts": {
			displayMode: 'EmbeddedTop',
			elements: MTVN.conf.flux4.ubElements
		}
	},
	
	"userProfile": {
 		"name": "UserProfile",
 		"opts": {
            ownerHeader: { showChangePhotoButton: true },
            guestHeader: { },
            tabs: [
                { id: 'Activity', title: 'My Activity', visibility: 'all' },
                //{ id: 'Custom', title: 'My Shows', visibility: 'all', markupUrl : "http://www.vh1-jd.mtvi.com/inhouse/rodridar/flux/favorites.jhtml" },
                { id: 'Following', title: 'My VH1', visibility: 'all' },
                { id: 'Followers', title: 'Followers', visibility: 'owner' },
                //{ id: 'Badges', title: 'Badges', visibility: 'all' },
                { id: 'Account', title: 'Account', visibility: 'owner' }
            ]
		}
	},
	
	"followBar": {
 		"name": "Follow",
 		"opts": {
 		    title: '',
 			contentUri: MTVN.conf.flux4.ucid,
			layout: 'horizontal',
			elements: [{ id: 'facebook', layout:'button_count'}, { id: 'twitter', width:'130px'}, { id: 'flux', title: 'My VH1', showCounter: false}]
		},
		"onLoad": function(widget) {
		    $j("<div/>").attr("id", "wFollow").attr("class", "mL10p").prependTo('.group-a');
	        $j('#wFollowContent .serviceList').append('<div class="followService copy">add show updates to your feed</div>');
	        $j('#wFollowContent').appendTo('#wFollow');
	        
        }
	},
	
	"followVideoContent": {
 		"name": "Follow",
 		"opts": {
 		    title: '',
 		    followParent: true,
 			contentUri: MTVN.conf.flux4.ucid,
			layout: 'horizontal',
			elements: [{ id: 'facebook', layout:'button_count'}, { id: 'twitter', width:'130px'}, { id: 'flux', title: 'My VH1', showCounter: false}]
		},
		"onLoad": function(widget) {
		    if($j('#seriesLinks div').length > 0) {
		        $j('#wFollow .serviceList').append('<div class="followService copy">add updates from this show to your feed</div>')
		        
		        if(!($j('#seriesLinks .simple-list li').size() > 1)) {
		            $j('#wFollow').appendTo('#seriesLinks .simple-list li');
		        } else {$j('#wFollow').remove();}
		        
		    } else {
		        $j('#wFollow').remove();
		    }
        }
	},
	
	"followContent": {
 		"name": "Follow",
 		"opts": {
 		    title:"",
			layout: 'horizontal',
			elements: [
			    { id: 'facebook'},
				{ id: 'twitter', title: 'Follow', count:'none' }, 
				{ id: 'flux', title: 'My VH1' }
			]
		}
	},
	
	"followShowOverlay": {
 		"name": "Follow",
 		"opts": {
 		    title:"",
			layout: 'horizontal',
			elements: [
				{ id: 'flux', title: 'My VH1' }
			]
		}
	},
	
	"activity": {
 		"name": "ActivityFeed",
 		"opts": {
			title: "",
			updateRequestInterval: 30,
			injectItems: 2,
			injectSeconds: 10,
			maxResults: 15,
			showPager: true,
			paginationType: 'pages',
			filterVisible: false,
			sortingVisible:false,
			defaultFilter: 'Comments',
			enableComments: true,
			topOrder: true,
			showPostToFacebook: false,
			commentMessage: 'Join the conversation ...'
		},
		"onLoad": function(widget) {
		    setTimeout(function() {
			    $j('ol.activityList .repliesContainer .replyLink').each(function(index) {
                    $j(this).html('Reply');
                })				
			},1000);
        }
	},
	
	"activityFeed": {
 		"name": "ActivityFeed",
 		"opts": {
			title: "",
			updateRequestInterval: 30,
			injectItems: 2,
			injectSeconds: 10,
			maxResults: 15,
			showPager: true,
			paginationType: 'pages',
			topOrder: true,
			showPostToFacebook: false,
			commentMessage: 'Join the conversation ...'
		},
		"onLoad": function(widget) {
		    setTimeout(function() {
			    $j('ol.activityList .repliesContainer .replyLink').each(function(index) {
                    $j(this).html('Reply');
                })				
			},1000);
        }
	},
	        
	"photoShare": {
 		"name": "Share",
 		"opts": {
			title: " ",
			layout: 'horizontal',
			elements: [
	            { id: 'Facebook', layout:'button_count', type: 'fblike', colorScheme: 'light', send: false },
	            { id: 'Twitter', originalButton: true, urlSettings: { related: 'mtvnews',via: "VH1" } },
				{ id: 'GooglePlusOne', count:false},					
				{ id: 'MyEmail' },
           		{ id: 'More', title: 'More&raquo;' }
	        ]
		}
	},
	
	"videoShare": {
 		"name": "Share",
 		"opts": {
			title: " ",
			layout: 'horizontal',
			elements: [
	            { id: 'Facebook', type: 'fblike', colorScheme: 'light', send: false },
	            { id: 'Twitter', originalButton: true, urlSettings: { related: 'mtvnews',via: "VH1" } },
				{ id: 'GooglePlusOne', count:false},					
				{ id: 'Embed' },
           		{ id: 'More', title: 'More&raquo;' }
	        ]
		}
	},
	
	"vevoVideoShare": {
 		"name": "Share",
 		"opts": {
			title: " ",
			layout: 'horizontal',
			elements: [
	            { id: 'Facebook', type: 'fblike', colorScheme: 'light', send: false },
	            { id: 'Twitter', originalButton: true, urlSettings: { related: 'mtvnews', via: "VH1" } },
				{ id: 'GooglePlusOne', count:false},					
           		{ id: 'More', title: 'More&raquo;' }
	        ],
	        overlayElements: {
                copyLinkEnabled: true,
                tabs: [
                   { id: 'SocialTab', visible: true,
                       elements: [
                         { id: 'Facebook', type: "fblike", send: true },
                            { id: 'Twitter', originalButton: true },
                            { id: 'GooglePlusOne' },
                            { id: 'StumbleUpon', originalButton: true },
                            { id: 'Digg' },
                            { id: 'Tumblr', originalButton: true },
                            { id: 'Reddit' },
                            { id: 'Blogger' },
                            { id: 'MySpace' },
                            { id: 'StudiVZ' },
                            { id: 'Orkut' },
                            { id: 'Hyves' },
                            { id: 'Tuenti' },
                            { id: 'Windowslive' },
                            { id: 'Pinterest' }
                         ]
                   },
                   { id: 'EmailTab', visible: true },
                   { id: 'EmbedTab', visible: false },
                   { id: 'FollowersTab', visible: true }
                ]
            }
		}
	},
	
	"flag": {
		"name": "Flag",
		"onLoad": function(widget) {
			//alert("Flag widget created");
		}
	},
	
	"facebookTimeline": {
 		"name": "FacebookTimeline",
 		"opts": {
 		    containerId: 'facebookTimeline-widget'
		},
		"onLoad": function(widget) {
		    widget.postReadToTimeline('news.reads','article', 'onTime', 5);
        }
	},
	
	"facebookFlipbookTimeline": {
 		"name": "FacebookTimeline",
 		"opts": {
 		    containerId: 'facebookTimeline-widget'
		},
		"onLoad": function(widget) {
		    widget.postReadToTimeline('mtvi_com:view','flipbook', 'onTime', 5);
        }
	},
	
	"facebookVideoTimeline": {
 		"name": "FacebookTimeline",
 		"opts": {
 		    containerId: 'facebookTimeline-widget'
		},
		"onLoad": function(widget) {
		    widget.postReadToTimeline('video.watches','video', 'onTime', 5);
        }
	},
	
	"badges": {
 		"name": "ActivityFeed",
 		"opts": {
			title: 'Recent Badges',
			mode: 'mini',
			updateRequestInterval: 30,
			injectItems: 1,
			injectSeconds: 20,
			maxResults: 3,
			showPager: false,
			filterVisible: false,
			defaultFilter: 'Badges', 
			enableComments: false
		}
	}
};

