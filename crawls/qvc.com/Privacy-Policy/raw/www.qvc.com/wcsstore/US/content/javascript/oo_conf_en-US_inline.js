/* OnlineOpinion v4.1.7 */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */

/* Create new OnlineOpinion Object instance */
var oOobj2 = new OnlineOpinion.ocode(); 

/* OnlineOpinion Object Preferences */
oOobj2.Preferences = {
		/* Configure Object Persitence (REQUIRED) */
		Persistence: {
			enabled: false, 			// Disapear onClick
			cookie_name: 'oo_inline',	// cookie name 
			cookie_type: 'null', 		// Remembers which page got rated
			expiration: 0		 		// How long to remember each page got Rated (in secs)
		},
		/* Configure Object Parameters (REQUIRED) */
		Render: {
			type: 'inline'
		},
		Plugins: {
			/* Configure URL Rewrite (optional) */
			URLRewrite: {
				active: false,
				regex_search_pattern: '' ,
				regex_replace_pattern: '',
				full_url_rewrite: ''
			},
			/* Configure Embedded Comment Card (optional) */
			CardOnPage: {
				enabled: false,
				close_link: '',
				overlay_close: false,
				loader_path: ''
			}
		}
}

/* Configure Custom Variables to Accompany Survey (optional) */
// oOobj2.Metrics.custom.clientID = 1234;
// oOobj2.Metrics.custom.countryCode = 'usa';

/*  OnlineOpinion v4.1.7, Copyright 2010 Opinionlab, Inc. */