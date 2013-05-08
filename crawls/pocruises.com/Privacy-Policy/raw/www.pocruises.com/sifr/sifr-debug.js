/*=:project
    scalable Inman Flash Replacement (sIFR) version 3, revision 436.

    Provides debug information about sIFR.

  =:file
    Copyright: 2006 Mark Wubben.
    Author: Mark Wubben, <http://novemberborn.net/>

  =:license
    * This software is licensed and provided under the CC-GNU LGPL
    * See <http://creativecommons.org/licenses/LGPL/2.1/>    
*/

sIFR.debug = new function() {
  function Errors() {
    this.fire = function(id) {
      if(this[id + 'Alert']) alert(this[id + 'Alert']);
      throw new Error(this[id]);
    };
  
    this.isFile      = 'sIFR: Did not activate because the page is being loaded from the filesystem.';
    this.isFileAlert = 'Hi!\n\nThanks for using sIFR on your page. Unfortunately sIFR couldn\'t activate, because it was loaded '
                        + 'directly from your computer.\nDue to Flash security restrictions, you need to load sIFR through a web'
                        + ' server.\n\nWe apologize for the inconvenience.';
  };
  
  sIFR.errors = new Errors();
  
  function log(msg) {
    if(!sIFR.ua.safari && window.console && console.log) console.log(msg);
    else alert(msg);
  }
  
  this.ua = function() {
    var info = [];
    
    for(var prop in sIFR.ua) {
      if(sIFR.ua[prop] == Object.prototype[prop]) continue;
      
      info.push(prop, ': ', sIFR.ua[prop], '\n');
    }
    
    log(info.join(''));
  };
  
  this.domains = function() {
    if(sIFR.domains.length == 0) {
      log('No domain verification used.');
      return;
    }
    
    var domain = sIFR.util.domain();
    var matches = [], nonMatches = [];

    for(var i = 0; i < sIFR.domains.length; i++) {
      var match = sIFR.domains[i];
      if(sIFR.util.domainMatches(domain, match)) matches.push(match);
      else nonMatches.push(match);
    }
    
    var msg = ['The domain "', domain, '"'];
    if(matches.length > 0) msg.push(' matches:\n* ', matches.join('\n* '));
    if(matches.length > 0 && nonMatches.length > 0) msg.push('\nbut');
    if(nonMatches.length > 0) msg.push(' does not match:\n* ', nonMatches.join('\n* '));
    log(msg.join(''));
  };

  this.ratios = function(kwargs, mergeKwargs) {
    if(mergeKwargs) kwargs = sIFR.util.copyProperties(kwargs, mergeKwargs);
    
    if(!kwargs.selector && !kwargs.elements) {
      log('Cannot calculate ratios, no selector or element given.');
      return;
    }
    
    delete kwargs.wmode;
    delete kwargs.transparent;
    delete kwargs.opaque;
    
    if (kwargs.css) {
      kwargs.css = sIFR.util.convertCssArg(kwargs.css);
      sIFR.util.extractFromCss(kwargs.css, '.sIFR-root', 'leading', true);
    }
    
    var running = false;
    kwargs.onReplacement = function(cb) {
      if(running) return; // Prevent duplicate results
      running = true;

      sIFR.debug.__ratiosCallback[cb.id] = function(ratios) {
        ratios = '[' + ratios.join(', ') + ']';
        setTimeout(function() {
          var before = new Date();
          prompt('The ratios for ' + kwargs.selector + ' are:', ratios);
          if(sIFR.ua.ie && before - new Date < 200) {
            alert("Press Control+C to copy the text of this alert box. Then paste it into your favorite text editor.\n"
                + "The numbers between the braces, including the braces, are the ratios. You have to add those to your sIFR configuration.\n\n"
                + "Tip: try calculating the ratios in Firefox instead, it'll be easier to copy the ratios.\n\n"
                + ratios);
          }
          cb.resetMovie();
        }, 0);
      };
      cb.call('calculateRatios');
    };

    sIFR.replace(kwargs);
  };
  
  this.__ratiosCallback = function(id, ratios) {
    if(this.__ratiosCallback[id]) this.__ratiosCallback[id](ratios);
  };
  
  function verifyResource(uri, fail, ok) {
    if(sIFR.ua.ie && uri.charAt(0) == '/') {
      uri = window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/, '$1$2$3') + uri;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', uri, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status != 200) log(fail);
        else log(ok);
      }
    };
    xhr.send('');
  }

  this.test = function(kwargs, mergeKwargs) {
    kwargs = merge(kwargs, mergeKwargs);

    var src = kwargs.src;
    var checked = false;
    if(typeof(src) != 'string') {
      if(src.src) src = src.src;

      if(typeof(src) != 'string') {
        var versions = [];
        for(var version in src) if(src[version] != Object.prototype[version]) versions.push(version);
        versions.sort().reverse();

        var result = '';
        var i = -1;
        while(!result && ++i < versions.length) {
          if(parseFloat(versions[i]) <= ua.flashVersion) result = src[versions[i]];
          var msg = '<' + src[versions[i]] + '>, flash ' + parseFloat(versions[i]);
          verifyResource(src[versions[i]], 'FAILED: ' + msg, 'OK: ' + msg);
        }
        
        src = result;
        checked = true;
      }
    }
    
    if(!src) log('Could not determine appropriate source.');
    else if(!checked) verifyResource(src, 'FAILED: <' + src + '>', 'OK: <' + src + '>');
  };
  
  this.forceTest = function() {
    var replace = sIFR.replace;
    sIFR.replace = function(kwargs, mergeKwargs) {
      sIFR.debug.test(kwargs, mergeKwargs);
      replace.call(sIFR, kwargs, mergeKwargs);
    };
  }
};