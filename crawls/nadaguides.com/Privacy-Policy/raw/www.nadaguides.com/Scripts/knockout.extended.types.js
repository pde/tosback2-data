(function() {
    var globalParts = {       
        toFloat:function (amount) {
            amount = amount || 0;
            
            if(amount != 0) {            
                amount = parseFloat(amount.replace(/[^0-9.-]/g, ''));
                
                if(isNaN(amount)) {
                    amount = 0;
                }
            }
                        
            return amount;
        },
        
        getRegexForDecimalPlaces: function (decimalPlaces) {
            return new RegExp('\\.0{'+ decimalPlaces +'}');
        }
    };

    ko.subscribable.fn.positivePercent = function (decimalPlaces) {
        decimalPlaces = decimalPlaces || null;
        
        var parts = {                       
            formatPositivePercent: function (percentAmount) {
                percentAmount = percentAmount || null;

                if(percentAmount !== null && !isNaN(percentAmount)) {
                    if(percentAmount < 0) {
                        percentAmount *= -1;
                    }
                    
                    percentAmount = parts.toPositivePercentFixed(percentAmount);
                }
                
                return percentAmount;
            },
            
            toPositivePercentFixed: function (percentAmount) {
                percentAmount = percentAmount || 0;
                var parsedAmount = parseFloat(percentAmount.toFixed(decimalPlaces).replace(globalParts.getRegexForDecimalPlaces(decimalPlaces), '').replace('-', ''));
                
                if(isNaN(parsedAmount)) {
                    parsedAmount = percentAmount;
                }
                
                return parsedAmount;
            }                    
        };
                
        var self = this;
        
        var positivePercent = ko.computed({
            read: function () { return self(); },
            write: function (value) { self(globalParts.toFloat(value)); }
        });
        
        positivePercent.formatted = ko.computed({
            read: function () { return parts.formatPositivePercent(self()); },
            write: function (value) { self(globalParts.toFloat(value)); }
        });
        
        return positivePercent;    
    };

    ko.subscribable.fn.positiveMoney = function (decimalPlaces) {       
        decimalPlaces = decimalPlaces || 0;

        var parts = {           
            formatPositiveMoney: function (dollarAmount) {
                dollarAmount = dollarAmount || null;
                
                if(null !== dollarAmount && !isNaN(dollarAmount)) {            
                    if(dollarAmount < 0) {
                        dollarAmount *= -1;
                    }
                    
                    dollarAmount = parts.toPositiveMoneyFixed(dollarAmount);
                    dollarAmount = '$'+ parts.addCommaGroups(dollarAmount);
                }
                
                return dollarAmount;
            },
            
            toPositiveMoneyFixed: function (dollarAmount) {
                dollarAmount = dollarAmount || 0;
                var result = parseFloat(dollarAmount.toFixed(decimalPlaces).replace(globalParts.getRegexForDecimalPlaces(decimalPlaces), '').replace('-', ''));
                
                if(isNaN(result)) {
                    result = dollarAmount;
                }
                
                return result;
            },
            
            addCommaGroups: function (dollarAmount) {
                dollarAmount = dollarAmount || null;
                var result = dollarAmount;
                
                if(null !== dollarAmount) {
                    var parsedAmount = dollarAmount.toFixed(decimalPlaces);
                    
                    if(!isNaN(parsedAmount)) {
                        var tokens = parsedAmount.replace('-', '').split('.');
                    
                        result = $.map(tokens[0].split('').reverse(), function (digit, i) {
                            return [(i % 3 == 0 && i > 0 ? ',' : ''), digit];
                        }).reverse().join('');
                        
                        if(decimalPlaces >= 1 && tokens[1] !== '00') {
                            result += '.';
                            result += tokens[1];
                        }                                        
                    }
                }
                
                return result;          
            }                       
        };
               
        var self = this;
        
        var positiveMoney = ko.computed({
            read: function () { return self(); },
            write: function (value) { self(globalParts.toFloat(value)); }
        });
        
        positiveMoney.formatted = ko.computed({
            read: function () { return parts.formatPositiveMoney(self()); },
            write: function (value) { self(globalParts.toFloat(value)); }
        });
        
        return positiveMoney;
    };
    
    ko.subscribable.fn.money = function (decimalPlaces) {       
        decimalPlaces = decimalPlaces || 0;

        var parts = {           
            formatMoney: function (dollarAmount) {                
                dollarAmount = parts.toMoneyFixed(dollarAmount);                                                
                var dollarAmountWithCommas = parts.addCommaGroups(dollarAmount);
                return dollarAmount < 0 ? '-$' + dollarAmountWithCommas : '$' + dollarAmountWithCommas;                
            },
            
            toMoneyFixed: function (dollarAmount) {
                dollarAmount = dollarAmount || 0;
                var parsedAmount = parseFloat(dollarAmount.toFixed(decimalPlaces).replace(globalParts.getRegexForDecimalPlaces(decimalPlaces), ''));
                
                if(isNaN(parsedAmount)) {
                    parsedAmount = dollarAmount;
                }
                
                return parsedAmount;
            },
            
            addCommaGroups: function (dollarAmount) {
                dollarAmount = dollarAmount || 0;
                var parsedAmount = dollarAmount.toFixed(decimalPlaces);
                var result = dollarAmount;
                
                if(!isNaN(parsedAmount)) {
                    var tokens = parsedAmount.replace('-', '').split('.');
                
                    result = $.map(tokens[0].split('').reverse(), function (digit, i) {
                        return [(i % 3 == 0 && i > 0 ? ',' : ''), digit];
                    }).reverse().join('');
                    
                    if(decimalPlaces >= 1 && tokens[1] !== '00') {
                        result += '.';
                        result += tokens[1];
                    }                                        
                }

                return result;
            }                       
        };
               
        var self = this;
        
        var money = ko.computed({
            read: function () { return self(); },
            write: function (value) { self(globalParts.toFloat(value)); }
        });
        
        money.formatted = ko.computed({
            read: function () { return parts.formatMoney(self()); },
            write: function (value) { self(globalParts.toFloat(value)); }
        });
        
        return money;
    };    
})();