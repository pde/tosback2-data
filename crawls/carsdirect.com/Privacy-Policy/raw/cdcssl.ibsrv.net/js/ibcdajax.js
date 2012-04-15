IBCDAjax = function(url,callback) {
  this.url = url;
  this.callback = callback;
  
  this.get = function(parameters){
    var myUrl = url;
    callbackName = '';
    if(typeof callback == 'string'){
      callbackName = callback;
    } else {
      callbackName = 'customCallback' + new Date().getTime() + "_" + Math.floor(Math.random() * 1000000);
      eval(callbackName + ' = callback;');
    }
    if(url.indexOf('?') < 0) {
      myUrl += '?callback=' + callbackName;
    } else {
      myUrl += '&callback=' + callbackName;
    }
    for(key in parameters){
      myUrl += '&' + escape(key) + '=' + escape(parameters[key]);
    }
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', myUrl);
    document.body.appendChild(scriptTag);  
  }  
  
  this.processForm = function(form){
    parameters = {};
    var elems = form.getElementsByTagName("input");
    for(i = 0; i < elems.length; i++){
      if(elems[i].type != 'checkbox' || elems[i].checked){
        if(parameters[elems[i].name] && parameters[elems[i].name].length > 0){
          parameters[elems[i].name] += ',' + elems[i].value;
        } else {
          parameters[elems[i].name] = elems[i].value;
        }
      }
    }
    var elems = form.getElementsByTagName("textarea");
    for(i = 0; i < elems.length; i++){
      parameters[elems[i].name] = elems[i].value;
    }
    var elems = form.getElementsByTagName("select");    
    for(i = 0; i < elems.length; i++){      
      parameters[elems[i].name] = elems[i].options[elems[i].selectedIndex].value;
    }
    
    this.get(parameters);  
  }
  
  
}

IBCDAjax.getUrl = function(url,callback,parameters){
  var intAjax = new IBCDAjax(url,callback);
  intAjax.get(parameters);
};
