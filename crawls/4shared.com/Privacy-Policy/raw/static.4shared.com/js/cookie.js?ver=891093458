var Cookies = {
  read: function () {
    var allCookies = document.cookie.split('; ');
    for (var i=0;i<allCookies.length;i++) {
      var cookiePair = allCookies[i].split('=');
      this[cookiePair[0]] = cookiePair[1];
    }
  },
  create: function (name,value,days,path,domain,maxAge) {
    var cookie = name + "=" + value;
    if(days){
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      cookie += "; expires=" + date.toGMTString();
    }
    if(path){
      cookie += "; path=" + path;
    }
    if(domain){
      cookie += "; domain=" + domain;
    }
    if(maxAge != undefined){
      cookie += "; max-age=" + maxAge;
    }
    document.cookie = cookie;
    this[name] = value;
  },
  erase: function (name,path,domain) {
    this.create(name,'',0,path,domain,0);
    this[name] = undefined;
  }
};

Cookies.read();