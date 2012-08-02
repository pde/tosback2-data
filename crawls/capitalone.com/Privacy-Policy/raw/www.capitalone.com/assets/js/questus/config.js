// begin copy from [js/questus/config_outputter.php]

var questusSurveyConfig = { includeUrls : { 
'.*\.capitalone\.com(:80[0-9]0)?.*' : { delay: 30000, ratio: 1/200, list: 28},
'.*\.capitalone\.com(:80[0-9]0)?/creditcards.*' : { delay: 30000, ratio: 1/28, list:1},
'.*\.capitalone\.com(:80[0-9]0)?/mobile-banking.*' : { delay: 30000, ratio: 1/28, list:2},
'.*\.capitalone\.com(:80[0-9]0)?/prepaid-cards.*' : { delay: 30000, ratio: 1/28, list:3},
'.*\.capitalone\.com(:80[0-9]0)?/bank.*' : { delay: 30000, ratio: 1/5, list:4},
'.*\.capitalone\.com(:80[0-9]0)?/banking.*' : { delay: 30000, ratio: 1/5, list:5},
'.*\.capitalone\.com(:80[0-9]0)?/certificates-of-deposit.*' : { delay: 30000, ratio: 1/5, list:6},
'.*\.capitalone\.com(:80[0-9]0)?/checking-accounts.*' : { delay: 30000, ratio: 1/5, list:7},
'.*\.capitalone\.com(:80[0-9]0)?/investing-and-insurance.*' : { delay: 30000, ratio: 1/5, list:8},
'.*\.capitalone\.com(:80[0-9]0)?/online-banking.*' : { delay: 30000, ratio: 1/5, list:9},
'.*\.capitalone\.com(:80[0-9]0)?/private-client-group.*' : { delay: 30000, ratio: 1/5, list:10},
'.*\.capitalone\.com(:80[0-9]0)?/savings-accounts.*' : { delay: 30000, ratio: 1/5, list:11},
'.*\.capitalone\.com(:80[0-9]0)?/directbanking.*' : { delay: 30000, ratio: 1/5, list: 12},
'.*\.capitalone\.com(:80[0-9]0)?/auto-financing.*' : { delay: 30000, ratio: 1/4, list: 13},
'.*\.capitalone\.com(:80[0-9]0)?/autoloans.*' : { delay: 30000, ratio: 1/4, list: 14},
'.*\.capitalone\.com(:80[0-9]0)?/home-equity.*' : { delay: 30000, ratio: 1/4, list: 15},
'.*\.capitalone\.com(:80[0-9]0)?/home-loans.*' : { delay: 30000, ratio: 1/4, list: 16},
'.*\.capitalone\.com(:80[0-9]0)?/loans.*' : { delay: 30000, ratio: 1/4, list: 17},
'.*\.capitalone\.com(:80[0-9]0)?/bank/commercial.*' : { delay: 30000, ratio: 1/4, list: 18},
'.*\.capitalone\.com(:80[0-9]0)?/business-cash-management.*' : { delay: 30000, ratio: 1/4, list: 19},
'.*\.capitalone\.com(:80[0-9]0)?/business-certificates-of-deposit.*' : { delay: 30000, ratio: 1/4, list: 20},
'.*\.capitalone\.com(:80[0-9]0)?/business-checking-accounts.*' : { delay: 30000, ratio: 1/4, list: 21},
'.*\.capitalone\.com(:80[0-9]0)?/business-credit-cards.*' : { delay: 30000, ratio: 1/4, list: 22},
'.*\.capitalone\.com(:80[0-9]0)?/business-loans-lines-of-credit.*' : { delay: 30000, ratio: 1/4, list: 23},
'.*\.capitalone\.com(:80[0-9]0)?/business-davings-accounts.*' : { delay: 30000, ratio: 1/4, list: 24},
'.*\.capitalone\.com(:80[0-9]0)?/merchant-services.*' : { delay: 30000, ratio: 1/4, list: 25},
'.*\.capitalone\.com(:80[0-9]0)?/small-business.*' : { delay: 30000, ratio: 1/4, list: 26},
'.*\.capitalone\.com(:80[0-9]0)?/small-business-bank.*' : { delay: 30000, ratio: 1/4, list: 27}
},

// end copy from [js/questus/config_outputter.php]
/**
 * !!!  IMPORTANT IMPORTANT IMPORTANT IMPORTANT  !!!
 * !!!  IMPORTANT IMPORTANT IMPORTANT IMPORTANT  !!!
 * !!!  IMPORTANT IMPORTANT IMPORTANT IMPORTANT  !!!
 * 
 * make sure that you DELETE the last comma after the last ordered pair and closing curley brace:
 * ...list: 27},     <-- this one
 * },    <-- NOT THIS ONE
 */
	
    killUrls : [
        /:\/\/cardfinder\.capitalone\.com/i,
        /:\/\/getmycard\.capitalone\.com/i,
        /:\/\/www\.loans\.clcprocessing\.com\/CapitalOneWeb\//i,
        /:\/\/www\.clc\-consumerservices\.com\/CLCCSWeb\/CapitalOne\//i,
        /:\/\/www\.capitalonehealthcarefinance\.com/i,
        /:\/\/switch\.atdmt\.com/i,
        /:\/\/view\.atdmt\.com/i,
        /:\/\/www\.capitalonehomeloans\.com/i,
        /:\/\/secure\.capitalonefinance\.com/i,
        /:\/\/www\.capitaloneautobuying\.com/i,
        /:\/\/www\.capitalonecar\.com/i,
        /:\/\/www\.capitaloneautofinance\.com/i,
        /:\/\/payroll\.capitalone\.com/i,
        /:\/\/cp\-sales\.capitalone\.com/i,
        /:\/\/nohasslerewards\.capitalone\.com/i,
        /:\/\/maps\.capitalone\.com/i,
        /:\/\/servicing\.capitalone\.com\//i,
        /:\/\/ads\.capitalone\.com/i,
        /:\/\/www\.capitalone.com\/imagecard/i,
        /capitalonemilesrewards\.com/i,
        /:\/\/www\.capitalone\.com\/nohasslerewards/i,
        /:\/\/www\.capitalone\.com\/banking\/espanol/i,
        /:\/\/applications\.capitalone\.com/i,
        /capitalone\.com\/creditcards\/cardlab/i,
        /:\/\/onlinebanking\.capitalone\.com(?!\/CapitalOne\/OAO\/)/i,
        /\/milesrewards/i,
        /goTo(Regional)*Login/i,
        /goToRegister/i,
        /accountLogin/i
    ],
    killSelectors: [
        'input[class*="kill-survey"]'
    ],
    stealthPages : {
        'capitalone.com' : '/js/questus/stealth.html'
    }
};
