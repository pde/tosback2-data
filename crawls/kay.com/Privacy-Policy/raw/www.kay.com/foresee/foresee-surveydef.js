FSR.surveydefs = [{
    name: 'browse',
    site: 'jared.com',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 7,
        lf: 4
    },
    include: {
        urls: ['.']
    }
}, {
    name: 'browse',
    site: 'kay.com',
    invite: {
        when: 'onentry',
        content: '<div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}kay.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
      <div style=\"padding:0 0 8px 0;font-size:medium;font-weight:bold;\">We\'d welcome your feedback!</div>\
      <div style=\"padding:0 0 8px 0;\">Thank you for visiting our website. You have been selected to participate<br>in a brief customer satisfaction survey to let us know how we can improve<br>your experience.</div>\
      <div style=\"font-weight:bold;\">The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.</div>\
      </div></div>'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 5,
        lf: 4
    },
	tracker: {
		url: 'tracker_kay.html'
	},
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: [90, 30],
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en'
    },
    
    exclude: {
        variables: [{
            name: 'store',
            value: ['true']
        }]
    },
    
    zIndexPopup: 10000,
    
    ignoreWindowTopCheck: false,
    
    reverseButtons: false,
    
    ipexclude: 'fsr$ip',
    
    invite: {
        /* desktop */
        content: '<div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}jared.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
      <div style=\"padding:0 0 8px 0;font-size:medium;font-weight:bold;\">We\'d welcome your feedback!</div>\
      <div style=\"padding:0 0 8px 0;\">Thank you for visiting our website. You have been selected to participate<br>in a brief customer satisfaction survey to let us know how we can improve<br>your experience.</div>\
      <div style=\"font-weight:bold;\">The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.</div>\
      </div></div>',
        
        /*
         content: '<div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
         <div style=\"padding:0 0 8px 0;font-size:medium;font-weight:bold;\">We\'d welcome your feedback!</div>\
         <div style=\"padding:0 0 8px 0;\">Thank you for visiting our website. You have been selected to participate<br>in a brief customer satisfaction survey to let us know how we can improve<br>your experience.</div>\
         </div></div>',
         */
        /* mobile
         content: '<div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
         <div style=\"padding:0 0 5px 0;font-size:medium;font-weight:bold;\">We\'d welcome your feedback!</div>\
         <div style=\"padding:0 0 0 0;\">Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.</div>\
         </div></div>',
         */
        /* desktop */
        footer: '<div div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
        
        /* mobile
         footer: '<div div id=\"fsrcontainer\"><div style=\"float:left;width:50%;font-size:8pt;text-align:left;line-height:12px;\">Conducted by ForeSee</div><div style=\"float:right;font-size:8pt;text-align:right;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img style=\"width:50%;\" border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
         */
        exclude: {
            local: ['/CheckoutLogonView', '/CheckoutBillingShippingView', '/PaymentMethodView', '/CheckoutLogonView', '/CheckoutBillingShippingView', '/PaymentMethodView'],
            referrer: []
        },
        include: {
            local: ['.']
        },
        
        /* desktop */
        width: '500',
        /* mobile
         width: {p: '260', l: '380'},
         text: {p: '100%', l: '70%'},
         */
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        timeout: 0,
        buttons: {
            accept: "Yes, I'll give feedback",
            decline: 'No thanks'
        },
        hideOnClick: false,
        /* desktop */
        css: 'foresee-dhtml.css',
        /* mobile
         css: 'foresee-dhtml-mobile.css',
         */
        hide: [],
        type: 'dhtml',
        /* desktop */
        url: 'invite.html'
        /* mobile
         url: 'invite-mobile.html'
         */
    },
    
    tracker: {
        width: '690',
        height: '415',
        timeout: 3,
        adjust: true,
        alert: {
            enabled: true,
            message: 'The survey is now available.'
        },
        url: 'tracker.html'
    },
    
    survey: {
        width: 690,
        height: 600
    },
    
    qualifier: {
        footer: '<div div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
        width: '690',
        height: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        url: 'qualifying.html'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '690',
        height: '400'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    meta: {
        referrer: true,
        terms: true,
        ref_url: true,
        url: true,
        url_params: false,
        user_agent: false
    },
    
    events: {
        enabled: true,
        id: true,
        codes: {
            purchase: 800,
            items: 801,
            dollars: 802,
            followup: 803,
            information: 804,
            content: 805
        },
        pd: 7,
        custom: {}
    },
    
    pool: 200,
    
    previous: false,
    
    analytics: {
        google: false
    },
    
    cpps: {},
    
    mode: 'first-party'
};
