FSR.surveydefs = [{
    site: 'everest',
    name: 'purch',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'now'
    },
    pin: 1,
    criteria: {
        sp: 8,
        lf: 1
    },
    include: {
        urls: ['/OrderShippingBillingConfirmationView', '/checkout_processconfirmation']
    }
}, {
    site: 'everest',
    name: 'chk',
    invite: false,
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    pin: 1,
    criteria: {
        sp: 0,
        lf: 1
    },
    links: {
        attach: [{
            tag: 'a',
            attribute: 'href',
            patterns: ['Anonymous'],
            sp: 26,
            when: 'later'
        }, {
            tag: 'button',
            attribute: 'name',
            patterns: ['signin-submit'],
            sp: 26,
            when: 'later'
        }]
    },
    include: {
    	urls: ['/CheckoutSignInView', '/CheckoutSignInRedirectControllerCmd', '/CheckoutCmd', '/checkout_process', '/checkout_signinform']
    }
}, {
    site: 'everest',
    name: 'browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 1,
        lf: 6
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en'
    },
    
    exclude: {},
    
    zIndexPopup: 1E4,
    
    ignoreWindowTopCheck: false,
    
    ipexclude: 'fsr$ip',
    
    mobileHeartbeat: {
        delay: 60, /*mobile on exit heartbeat delay seconds*/
        max: 3600 /*mobile on exit heartbeat max run time seconds*/
    },
    
    invite: {
    
        // Is this an MDOT Site?
        isMDOT: false,
        
        // Is this site zoomable? (aka pinch-able)
        isZoomable: false,
        
        // For no site logo, comment this line:
        siteLogo: "sitelogo.gif",
        
        /* Desktop */
        dialogs: [{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback"
        }],
        
        exclude: {
            local: ['/checkout_', '/CheckoutSignInView', '/OrderItemDisplay', '/CheckoutOrderItemDisplayView', '/GuestAsAnonymous', '/CheckoutOrderShippingView', '/SingleShipmentOrderSummaryView', '/CheckoutGiftOptionsView', '/CheckoutOrderBillingView', '/OrderShippingBillingConfirmationView', '/CheckoutEditItemsDisplayView', '/CalculateGiftWrap', '/CheckoutAddCardToWalletForm', '/OrderDisplay', '/OrderConfirmationPrintView', '/OrderReviewView', '/splitOrderItems', '/ESPDisplayOptionsViewCmd','/ExitCheckoutCmd', '/CheckoutCmd', 'authoring.target.com', 'cmc-wcsauth.target.com'],
            referer: ['google.com']
        },
        include: {
            local: ['.']
        },
        
        delay: 0,
        timeout: 0,
        
        hideOnClick: false,
        
        hideCloseButton : false,

        css: 'foresee-dhtml.css',
        
        hide: [],
        
        hideFlash: false,
        
        type: 'dhtml',
        /* desktop */
        // url: 'invite.html'
        /* mobile */
        url: 'invite-mobile.html',
        back: 'url'
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
        user_agent: false,
        entry: false,
        entry_params: false
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
    
    previous: false,
    
    analytics: {
        google: false
    },
    
    cpps: {
        visualScienceId: {
            source: 'cookie',
            name: 'v1st'
        },
        TLSessionID: {
        	source: 'cookie',
        	name: 'TLTSID'
        }
    },
    
    mode: 'first-party'
};
