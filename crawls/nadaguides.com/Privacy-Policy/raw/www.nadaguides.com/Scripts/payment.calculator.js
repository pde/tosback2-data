(function () {
    var paymentCalculator = function() {
        var self = this;
        
        self.getPrincipal = function(price, downPayment) {
            price = price || 0;
            downPayment = downPayment || 0;
            var principal = price - downPayment;
            return principal < 0 ? 0 : principal;
        };
        
        self.getMonthlyPayment = function(principal, interestRate, term) {
            principal = principal || 0;
            interestRate = interestRate || 0;
            term = term || 60;
            var monthlyPayment;
            
            if(interestRate > 0) {
                var rateRatio = interestRate / 1200;            
                monthlyPayment = principal * rateRatio / (1 - Math.pow((1 + rateRatio), -term));
            } else {
                monthlyPayment = principal / term;
            }
            
            return monthlyPayment;
        };
        
        self.getTotalInterest = function(principal, monthlyPayment, term) {
            principal = principal || 0;
            monthlyPayment = monthlyPayment || 0;
            term = term || 60;
            return monthlyPayment * term - principal;
        };
        
        self.getTotalCost = function(downPayment, monthlyPayment, term) {
            downPayment = downPayment || 0;
            monthlyPayment = monthlyPayment || 0;
            term = term || 60;
            return monthlyPayment * term + downPayment;
        };
        
        self.getPrice = function(downPayment, interestRate, monthlyPayment, term) {
            downPayment = downPayment || 0;
            interestRate = interestRate || 0;
            monthlyPayment = monthlyPayment || 0;
            term = term || 60;
            var rateRatio = interestRate / 1200;
            var price;
            
            if(interestRate > 0) {
                price = (monthlyPayment * (1 - Math.pow((1 + rateRatio), -term))) / rateRatio + downPayment;
            } else {
                price = downPayment + monthlyPayment * term;
            }
            
            return price;
        };
        
        return self;
    };
    
    window.PaymentCalculator = new paymentCalculator();
})();