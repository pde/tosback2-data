FSR.surveydefs = [{
    name: 'browse',
	section: 'main',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 0.5,
        lf: 1
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
    
    ipexclude: 'fsr$ip',
    
    invite: {
        content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
		<b><font size=\"3\">We\'d like your feedback.</b></font>\
		<br><br>Thank you for visiting our site. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.\
		<br><br><b>The survey is designed to measure your entire site experience and will appear at the <u>end of your visit</u>.</b>\
		<br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee.</font><br></div></div></BODY></HTML>',
        
        /*content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
         <b><font size=\"3\">We\'d like your feedback.</b></font>\
         <br><br>Thank you for visiting our site. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.\
         <br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee.</font><br></div></div></BODY></HTML>',
         */
    exclude: {
        local: ['localization', 'buyflow'],
            referrer: []
        },
        include: {
            local: ['.']
    },
   
        width: '500',
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
        css: 'foresee-dhtml.css',
        hide: []
    },
    
    tracker: {
        width: '500',
        height: '350',
        timeout: 4,
        adjust: false,
        alert: {
            enabled: false,
            message: 'The survey is now available.'
        },
        url: 'tracker.html'
    },
    
    survey: {
        width: 550,
        height: 600
    },
    
    qualifier: {
        width: '625',
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
        css: false,
        url: 'qualifying.html'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
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
        url_params: false
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
        custom: {
            purchase: {
                enabled: true,
                repeat: false,
                source: 'url',
                patterns: ['/shop/buyflow2/OrderProgress', '/SinglePayment.aspx', '/AutoPay.aspx']
            }
        }
    },
    
    pool: 100,
    
    previous: false,
    
    analytics: {
        google: false
    },
    
    mode: 'first-party',
    
    cpps: {
        OrderProgress: {
            source: 'url',
            init: 'no',
            patterns: [{
                regex: '/shop/buyflow2/OrderProgress',
                value: 'yes'
            }]
        },
        SinglePayment: {
            source: 'url',
            init: 'no',
            patterns: [{
                regex: '/SinglePayment.aspx',
                value: 'yes'
            }]
        },
        AutoPay: {
            source: 'url',
            init: 'no',
            patterns: [{
                regex: '/AutoPay.aspx',
                value: 'yes'
            }]
        }
    }
};
