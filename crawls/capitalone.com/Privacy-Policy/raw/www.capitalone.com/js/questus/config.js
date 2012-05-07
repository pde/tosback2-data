var questusSurveyConfig = {
    includeUrls : {
        '.*\.capitalone\.com(:80[0-9]0)?.*' : {
            delay: 30000,
            ratio: 1/223,
            list: 10
        },
        '.*\.capitalone\.com(:80[0-9]0)?/creditcards.*' : {
            delay: 30000,
            ratio: 1/28,
            list: 1
        },
        '.*\.capitalone\.com(:80[0-9]0)?/smallbusiness.*' : {
            delay: 30000,
            ratio: 1/5,
            list: 2
        },
        '.*\.capitalone\.com(:80[0-9]0)?/bank/business.*' : {
            delay: 30000,
            ratio: 1/5,
            list: 3
        },
        '.*\.capitalone\.com(:80[0-9]0)?/directbanking.*' : {
            delay: 30000,
            ratio: 1/8,
            list: 4
        },
        '.*\.capitalone\.com(:80[0-9]0)?/banking/personal.*' : {
            delay: 30000,
            ratio: 1/5,
            list: 5
        },
        '.*\.capitalone\.com(:80[0-9]0)?/savings-accounts/.*' : {
            delay: 30000,
            ratio: 1/447,
            list: 6
        },        
        '.*\.capitalone\.com(:80[0-9]0)?/checking-accounts/.*' : {
            delay: 30000,
            ratio: 0/447,
            list: 7
        },           
        '.*\.capitalone\.com(:80[0-9]0)?/certificates-deposit/.*' : {
            delay: 30000,
            ratio: 1/447,
            list: 8
        },           
        '.*\.capitalone\.com(:80[0-9]0)?/loans.*' : {
	      delay: 30000,
            ratio: 1/5,
            list: 9
        }
    },
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
