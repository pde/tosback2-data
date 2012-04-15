var omniture={};

omniture.orig_values={};
omniture.get_pageName = function(loc) {    
if(!loc) {
       loc = window.location.pathname;
}
var s = window.location.host.slice(0,3);
if(s=='dev'||s=='wor'||s=='sta') {
    loc = window.location.host+loc;  }
  return loc;
}
omniture.restore_values = function() {
    for(var k in omniture.orig_values) {    
       eval(k+'=omniture.orig_values[k];');    
  }
  omniture.orig_values = {};
}
omniture.swap_var = function(varname, newvalue) {
  omniture.orig_values[varname] = eval(varname);
 eval(varname+'=newvalue;');
}
omniture.swap_pageName = function(new_pn) {
    new_pn = omniture.get_pageName(new_pn);
    omniture.swap_var('s_pageName', new_pn);
    omniture.swap_var('s_prop6', new_pn+'|'+s_prop5);
    omniture.swap_var('s_prop8', new_pn+'|'+s_prop2);
}
omniture.swap_vars = function(vars) {
    for(var k in vars) {
       // do special/more complicated stuff as needed
       if(k=='s_pageName') {
	omniture.swap_pageName(vars[k])
      } else {
          omniture.swap_var(k, vars[k])
       }   
}
}
omniture.swap_vars_and_ping = function(vars) {
  try {
        if(vars) {          
		omniture.swap_vars(vars);       }
      do_omniture();   
} catch(e) {} 
   
omniture.restore_values();
}

omniture.inTrackingSample = function(rate, ckname) {
   var SAMPLE_PERCENT = 10;
    var COOKIE_NAME = 'agsample';
   var host = window.location.host;
   if(!rate) rate = SAMPLE_PERCENT;
   if(!ckname) ckname = COOKIE_NAME;

   // do we need to do fancy sampling magic?
    if ( host.indexOf('webshots' ) != -1) {
       var allcookies = document.cookie;
        var pos = allcookies.indexOf(ckname);
     // if we find the cookie then use it
     if (pos != -1) {
           var start = pos + ckname.length + 1;
          var end = allcookies.indexOf(';', start);
           if (end == -1) end = allcookies.length;
           var num = allcookies.substring(start, end);

          //alert('found it; ' + num + '; ' + num % rate);
       }
     else {
            // set the sample group number in the cookie to be used later
          var num = Math.round(Math.random() * 100);
    //alert('not found; ' + num +'; ' + num % rate);
           var nextyear = new Date();
          nextyear.setFullYear(nextyear.getFullYear() + 1);

           var domain = host.substr(host.indexOf('.'), host.length);
         document.cookie = ckname + '=' + num + '; expires='        + nextyear.toGMTString() + '; domain=' + domain                 + '; path=/';
       }
       if (num < rate) {
            return true;
       } else {
       return false;
      }
   }
   else {
       return true;
   }
}
