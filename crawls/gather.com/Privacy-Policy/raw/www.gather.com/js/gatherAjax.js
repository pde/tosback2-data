var gatherAjax;

if (!gatherAjax) gatherAjax = {};

//constructor for
/*gatherAjax.Parameters = function(){}


//lets set some defaults
gatherAjax.Parameters.prototype.options = {};
gatherAjax.Parameters.prototype.options.prototype.method = 'GET';
gatherAjax.Parameters.prototype.options.prototype.asynchronous = true;
gatherAjax.Parameters.options.prototype.contentType = 'application/x-www-form-urlencoded';
gatherAjax.Parameters.options.prototype.encoding = 'UTF-8';
gatherAjax.Parameters.options.prototype.parameters = {requestURL: window.location.href};
gatherAjax.Parameters.options.prototype.postbody = '';
*/


//a utility function for validating the passed in parameters
//this does a minimal validation for required parameters
//it does not check type or anything liek that since there
//are no types in js
function validateParameters(parameters) {
  if (typeof parameters.url == 'undefined')
    return(false);
  else if (typeof parameters.options == 'undefined')
    return(false);
  else if (typeof parameters.options.method == 'undefined')
    parameters.options.method = 'GET';


  //Add the requesting url to the paramters.
  if (typeof parameters.options.parameters == 'undefined') {
    parameters.options.parameters = {};
  }
  Object.extend(parameters.options.parameters, {url: document.URL});

  return(true);
}

//this function is a wrapper around the Ajax.Updater method call in prototype
gatherAjax.Updater = function(parameters) {
  if (!validateParameters(parameters))
    return(false);

  //execute the update
  new Ajax.Updater(parameters.container, parameters.url, parameters.options);

}

//this function is a wrapper around the Ajax.Updater method call in prototype
gatherAjax.Request = function(parameters) {
  if (!validateParameters(parameters))
    return(false);

  //execute the update
  new Ajax.Request(parameters.url, parameters.options);
}

//this function is a wrapper around the Ajax.Updater method call in prototype
gatherAjax.PeriodicalUpdater = function(parameters) {
  if (!validateParameters(parameters)) return(false);

  //execute the update
  new Ajax.PeriodicalUpdater(parameters.url, parameters.options);
}

gatherAjax.JSON2Object = function(json) {
  return(json.evalJSON(true));
}

gatherAjax.Object2JSON = function(object) {
  return(Object.toJSON(object));
}