/**
 * extensions to core JavaScript objects: Function, Array...
 */

/**
 * Class method for copying psuedo-arrays to *real* arrays, such
 * as function arguments and dom node collections (ie, document.getElementsByTagName("div"))
 * @param {Object} original array
 * @return {Array} new *real* array
 */
Array.Copy = function(original){
  var i,result = [];
  for(i=0;i<original.length;i++){
    result.push(original[i]);
  }
  return result;
};
/**
 * alters the context in which a method will run, can be handy when used in conjunction with events
 * @param {Object} context for method to run (sets up the "this" reference)
 * @param... all additional parameters are passed to the bound method as parameters
 * @return {Function} invoking this function in any context will run the method in the correct context
 */
/*
  example:
  var myObject = {
    name:"fred"
  };
  function doTest(param1,param2){
    alert(this.name +'\n'+ param1 +'\n'+ param2);
  }
  var boundMethod = doTest.bind(myObject,"12","jane");
  boundMethod();
*/
Function.prototype.bind = function(context) {
  var method = this;
  var args = Array.Copy(arguments);
  var obj = args.shift();
  return function() {
    return method.apply(obj, args);
  };
};

// JavaScript 1.6 methods
if (!Array.forEach) {
    // perform action on each item of array - used in place of: for(i=0;i<myArray.length;i++) {...}
    /*
     example:
     var myArray = ['apple','banana','pear'];
     myArray.forEach(function(fruit){
     document.write(fruit);
     });
     */
    Array.prototype.forEach = function(fn, thisObj) {
        var i, j, scope = thisObj || window;
        for (i = 0, j = this.length; i < j; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}
if (!Array.every) {
    // check if every item in array matches some criteria
    /*
     example:
     var myArray = [
     {name:'apple',type:'fruit'},
     {name:'steak',type:'meat'},
     {name:'pear',type:'fruit'}
     ];
     // returns false
     var allItemsAreFruits = myArray.every(function(food){
     return (food.type == "fruit");
     });
     */
    Array.prototype.every = function(fn, thisObj) {
        var i, j, scope = thisObj || window;
        for (i = 0, j = this.length; i < j; ++i) {
            if (!fn.call(scope, this[i], i, this)) {
                return false;
            }
        }
        return true;
    };
}
if (!Array.some) {
    // check if every item in array matches some criteria
    /*
     example:
     var myArray = [
     {name:'apple',type:'fruit'},
     {name:'steak',type:'meat'},
     {name:'pear',type:'fruit'}
     ];
     // returns true
     var someItemsAreFruits = myArray.some(function(food){
     return (food.type == "fruit");
     });
     */
    Array.prototype.some = function(fn, thisObj) {
        var i, j, scope = thisObj || window;
        for (i = 0, j = this.length; i < j; ++i) {
            if (fn.call(scope, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}
if (!Array.map) {
    // create a new array based on contents of original array
    /*
     example:
     var myArray = [
     {name:'apple',type:'fruit'},
     {name:'steak',type:'meat'},
     {name:'pear',type:'fruit'}
     ];
     var arrayOfHtml = myArray.map(function(food){
     return "<div>"+ food.name +" ("+ food.type +")</div>";
     });
     */
    Array.prototype.map = function(fn, thisObj) {
        var i, j, scope = thisObj || window,
            a = [];
        for (i = 0, j = this.length; i < j; ++i) {
            a.push(fn.call(scope, this[i], i, this));
        }
        return a;
    };
}
if (!Array.filter) {
    // create a new array of filtered results
    /*
     example:
     var myArray = [
     {name:'apple',type:'fruit'},
     {name:'steak',type:'meat'},
     {name:'pear',type:'fruit'}
     ];
     // returns true
     var fruits = myArray.map(function(food){
     return (food.type == "fruit");
     });
     */
    Array.prototype.filter = function(fn, thisObj) {
        var i, j, scope = thisObj || window,
            a = [];
        for (i = 0, j = this.length; i < j; ++i) {
            if (!fn.call(scope, this[i], i, this)) {
                continue;
            }
            a.push(this[i]);
        }
        return a;
    };
}
if (!Array.indexOf) {
    // returns index of specified element (-1 if not found)
    Array.prototype.indexOf = function(el, start) {
        var i, j;
        start = start || 0;
        for (i = start, j = this.length; i < j; ++i) {
            if (this[i] === el) {
                return i;
            }
        }
        return -1;
    };
}
if (!Array.lastIndexOf) {
    // returns the last index of specified element (-1 if not found)
    Array.prototype.lastIndexOf = function(el, start) {
        var i;
        start = start || this.length;
        if (start >= this.length) {
            start = this.length;
        }
        if (start < 0) {
            start = this.length + start;
        }
        for (i = start; i >= 0; --i) {
            if (this[i] === el) {
                return i;
            }
        }
        return -1;
    };
}
// more useful array methods
// override commented out as it was conflicting with Bing Maps API
// found no usage of this method in whole codebase except swfAddress library which is 3rd party anyway
/* if(!Array.splice){
 Array.prototype.splice = function (iIndex , iLength ) {
 var i,aResult  = new Array();
 var aRemoved  = new Array();
 for (i=0; i < iIndex; i++){
 aResult.push(this[i]);
 }
 for (i=iIndex; i < iIndex+iLength; i++) {
 aRemoved.push(this[i]);
 }
 if (arguments.length > 2) {
 for (i=2; i < arguments.length; i++) {
 aResult.push(arguments[i]);
 }
 }
 for (i=iIndex+iLength; i < this.length; i++) {
 aResult.push(this[i]);
 }
 for (i=0; i < aResult.length; i++) {
 this[i] = aResult[i];
 }
 this.length = aResult.length;
 return aRemoved;
 }
 } */
if (!Array.remove) {
    Array.prototype.remove = function (vItem) {
        this.removeAt(this.indexOf(vItem));
        return vItem;
    };
}
if (!Array.removeAt) {
    Array.prototype.removeAt = function (iIndex) {
        var vItem = this[iIndex];
        if (vItem) {
            this.splice(iIndex, 1);
        }
        return vItem;
    };
}


// object/JSON sorting
(function() {
    // local object which creates comparator functions for sorting arrays of objects
    var Comparator = {
        cache:{},
        getComparator:function(array,criteria) {
            // if array is empty, we can exit now
            if(array.length == 0){
                return function(){ return 0; }
            }
            // criteria are function arguments, need  to turn into 'real' array
            criteria = Array.Copy(criteria);
            var criteriaId = criteria.join();
            if(!Comparator.cache[criteriaId]){
                // generate function
                // "new Function" is generally not a good idea, but actually provides the best for performance in this case
                var functionBody = [];
                var thisCriteria,i;
                functionBody.push("  var val = 0;");
                for (i = 0; i < criteria.length; i++) {
                    thisCriteria = criteria[i];
                    switch(typeof array[0][thisCriteria]){
                        case "string":
                            functionBody.push("  val = (b."+ thisCriteria +" < a."+ thisCriteria +") - (a."+ thisCriteria +" < b."+ thisCriteria +");");
                            break;
                        case "number":
                            functionBody.push("  val = a."+ thisCriteria +" -  b."+ thisCriteria +";");
                            break;
                        case "boolean":
                            functionBody.push("  val = (a."+ thisCriteria +"*-1) -  (b."+ thisCriteria +"*-1);");
                            break;
                    }
                    functionBody.push("  if (val != 0) {");
                    // look ahead for -1;
                    if(criteria[i+1] === -1){
                        functionBody.push("    return val * -1;");
                    }else{
                        functionBody.push("    return val;");
                    }
                    functionBody.push("  }");
                }
                functionBody.push("  return val;");
                Comparator.cache[criteriaId] = new Function("a","b",functionBody.join("\n"));
            }
            return Comparator.cache[criteriaId];
        }
    };

    /**
        Object sorting (JSON sorting) method. To have a field use reverse order (DESC), make -1 the following parameter (see examples)
        Here is a sample objectSort call for DISTANCE sorting in SPG:
            searchResults.objectSort("isParticipating","favorite","distance","hasCash","cityName","propertyName");
        Simple example - for and array of people, sort by last name, then by first name
            people.sort("lsatName","firstName");
        Simple example - Sort people by age oldest to youngest, then by last name (a-z)
            people.sort("age",-1,"lastName");

    **/
    Array.prototype.objectSort = function() {
        // perform sort and return instance array
        this.sort(Comparator.getComparator(this,arguments));
        return this;
    };
})();

// object/JSON filtering
(function() {
    var FilterManager = {
        cache:{},
        getFilter:function(array,criteria){
            if(array.length === 0 || criteria.length === 0){
                return function(){return true;};
            }
            var criteriaId = criteria.join();
            if(!FilterManager.cache[criteriaId]){
                var functionBody = [],
                    conditions = [],
                    quoteChar = "",
                    thisField,thisValue,thisOperator,i,innerCondition,prefix,suffix;
                for (i = 0; i < criteria.length; i+=3) {
                    prefix = "";
                    suffix = "";
                    thisField = criteria[i];
                    thisValue = criteria[i+1];
                    // if value is not an array, turn it into one
                    if(!(typeof thisValue == "object" && thisValue.length > 0)){
                        thisValue = [thisValue];
                    }
                    thisOperator = criteria[i+2];
                    quoteChar = (typeof array[0][thisField] == "string") ? "\"" : "";
                    switch(thisOperator){
                        case "equals":
                            prefix = "item."+ thisField +" == "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "notEquals":
                            prefix = "item."+ thisField +" != "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "greaterThan":
                            prefix = "item."+ thisField +" > "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "lessThan":
                            prefix = "item."+ thisField +" < "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "greaterThanEquals":
                            prefix = "item."+ thisField +" >= "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "lessThanEquals":
                            prefix = "item."+ thisField +" <= "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "contains":
                            quoteChar = "\"";
                            prefix = "item."+ thisField +".indexOf("+ quoteChar;
                            suffix = quoteChar +") > -1";
                            break;
                        default:
                            // if invalid operator passed, do not use this criteria
                            continue;
                    }
                    innerCondition = [];
                    thisValue.forEach(function(val){
                        innerCondition.push(prefix + val + suffix);
                    });
                    conditions.push("("+ innerCondition.join(" ||  ") +")");
                }
                functionBody.push("if( "+ conditions.join(" && ") +"){");
                functionBody.push("  return true;");
                functionBody.push("}");
                functionBody.push("return false;");
                FilterManager.cache[criteriaId] = new Function("item",functionBody.join("\n"));

            }
            return FilterManager.cache[criteriaId];
        }
    };

    Array.prototype.setFilter = function(field,value,operator) {
        // first time calling setFilter, setup objects and methods
        var criteria = [],
            thisArray = this;
        thisArray.setFilter = function(field,value,operator) {
            if(arguments.length === 0){
                criteria.length = 0;
                return thisArray;
            }
            operator = operator || "equals";
            criteria.push(field,value,operator);
            return thisArray;
        };
        thisArray.objectFilter = function(){
            var result = thisArray.filter(FilterManager.getFilter(thisArray,criteria));
            criteria.length = 0;
            return result;
        };

        // set this filter criteria and return array (note - this code only runs first time setFilter is called)
        thisArray.setFilter(field,value,operator);
        return thisArray;
    };
    // dummy placeholder method... here just in case objectFilter is called before setFilter
    Array.prototype.objectFilter = function() {
        // behave like normal, return copy of this array
        return Array.Copy(this);
    };
})();