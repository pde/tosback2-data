function ErrorLogger(a){this.counter=0;
this.debug=a;
var c=window.onerror,b=this;
window.onerror=function(){c&&c.apply(null,arguments);
b.log.apply(b,arguments)
}
}ErrorLogger.prototype.log=function(g,e,a){if(this.debug){var h=window.console;
h&&h.log.apply(h,arguments)
}else{if(this.counter<=5){++this.counter;
var d=["msg="+g,"file="+e,"line="+a];
var b="/errorTracker.php?"+d.join("&"),f=null;
typeof ActiveXObject!="undefined"?f=new ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest&&(f=new XMLHttpRequest);
f&&setTimeout(function(){f.open("GET",b,!0);
f.send(null)
},0)
}}};
(function(){window.errorLogger=new ErrorLogger(false)
})();