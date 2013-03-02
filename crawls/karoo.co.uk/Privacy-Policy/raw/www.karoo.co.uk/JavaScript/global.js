jQuery.noConflict();
var $j = jQuery;

$j(function() {
  themes.init();
  Carousel();
});

themes = function() {
  var THEME_COOKIE = "KAROO_THEME";
  var config = {
    openClass: 'themes-open'
  };
  var o = {};

  function init() {
    o.box = $j('#Themes');
    o.current = $j('#Current', o.box);
    o.options = $j('.options', o.box);
    o.optionsItems = $j('li', o.options);
    events();
  }
  function events() {
    o.box.click(function() {
      if (o.box.hasClass(config.openClass) === true) { close(); }
      else { open(); }
    });
    o.optionsItems.click(function() {
      o.current.attr('class', $j(this).attr('class'));
      o.theme = $j(this).attr('class');
      setTheme();
      close();
    });
  }
  function open() {
    //Open themes list
    o.box.addClass(config.openClass);
    o.options.slideDown();
  }
  function close() {
    //Close themes list
    o.options.slideUp(function() {
      o.box.removeClass(config.openClass);
    });
  }
  function startTheme() {
    if ($j.cookie(THEME_COOKIE)) {
    
      $j('body').attr('class', $j.cookie(THEME_COOKIE));
    }
  }
  function setTheme() {
    $j('body').attr('class', o.theme);
    $j.cookie(THEME_COOKIE, o.theme, { path: '/', expires: 30 });
  }
  return { init: init };
} ();

// cookies

jQuery.cookie = function(name, value, options) {
  if (typeof value != 'undefined') {
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString();
    }
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

// sfhover

sfHover = function() {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

// make homepage

function setHomepage() {
	if (document.all) {
		document.body.style.behavior='url(#default#homepage)';
		document.body.setHomePage('http://www.karoo.co.uk');
	} else if (window.sidebar) {
		window.location = "/firefox.aspx";
	}
}

// box height

window.onload=function() {
	fixHeight8('box1','box2','box3','box4','box5','box6','box7','box8');
	fixHeight7('box1','box2','box3','box4','box5','box6','box7');
	fixHeight6('box1','box2','box3','box4','box5','box6');
	fixHeight5('box1','box2','box3','box4','box5');
	fixHeight4('box1','box2','box3','box4');
	fixHeight3('box1','box2','box3');
	fixHeight2('box1','box2');
}
function fixHeight8(a,b,c,d,e,f,g,h) {
	if (document.getElementById(h)) {
		var b1=document.getElementById(a).offsetHeight;
		var b2=document.getElementById(b).offsetHeight;
		var b3=document.getElementById(c).offsetHeight;
		var b4=document.getElementById(d).offsetHeight;
		var b5=document.getElementById(e).offsetHeight;
		var b6=document.getElementById(f).offsetHeight;
		var b7=document.getElementById(g).offsetHeight;
		var b8=document.getElementById(h).offsetHeight;
		var nh = Math.max(b1,b2,b3,b4,b5,b6,b7,b8);
		document.getElementById(a).style.height=nh+"px";
		document.getElementById(b).style.height=nh+"px";
		document.getElementById(c).style.height=nh+"px";
		document.getElementById(d).style.height=nh+"px";
		document.getElementById(e).style.height=nh+"px";
		document.getElementById(f).style.height=nh+"px";
		document.getElementById(g).style.height=nh+"px";
		document.getElementById(h).style.height=nh+"px";
	}
}
function fixHeight7(a,b,c,d,e,f,g) {
	if (document.getElementById(g)) {
		var b1=document.getElementById(a).offsetHeight;
		var b2=document.getElementById(b).offsetHeight;
		var b3=document.getElementById(c).offsetHeight;
		var b4=document.getElementById(d).offsetHeight;
		var b5=document.getElementById(e).offsetHeight;
		var b6=document.getElementById(f).offsetHeight;
		var b7=document.getElementById(g).offsetHeight;
		var nh = Math.max(b1,b2,b3,b4,b5,b6,b7);
		document.getElementById(a).style.height=nh+"px";
		document.getElementById(b).style.height=nh+"px";
		document.getElementById(c).style.height=nh+"px";
		document.getElementById(d).style.height=nh+"px";
		document.getElementById(e).style.height=nh+"px";
		document.getElementById(f).style.height=nh+"px";
		document.getElementById(g).style.height=nh+"px";
	}
}
function fixHeight6(a,b,c,d,e,f) {
	if (document.getElementById(f)) {
		var b1=document.getElementById(a).offsetHeight;
		var b2=document.getElementById(b).offsetHeight;
		var b3=document.getElementById(c).offsetHeight;
		var b4=document.getElementById(d).offsetHeight;
		var b5=document.getElementById(e).offsetHeight;
		var b6=document.getElementById(f).offsetHeight;
		var nh = Math.max(b1,b2,b3,b4,b5,b6);
		document.getElementById(a).style.height=nh+"px";
		document.getElementById(b).style.height=nh+"px";
		document.getElementById(c).style.height=nh+"px";
		document.getElementById(d).style.height=nh+"px";
		document.getElementById(e).style.height=nh+"px";
		document.getElementById(f).style.height=nh+"px";
	}
}
function fixHeight5(a,b,c,d,e) {
	if (document.getElementById(e)) {
		var b1=document.getElementById(a).offsetHeight;
		var b2=document.getElementById(b).offsetHeight;
		var b3=document.getElementById(c).offsetHeight;
		var b4=document.getElementById(d).offsetHeight;
		var b5=document.getElementById(e).offsetHeight;
		var nh = Math.max(b1,b2,b3,b4,b5);
		document.getElementById(a).style.height=nh+"px";
		document.getElementById(b).style.height=nh+"px";
		document.getElementById(c).style.height=nh+"px";
		document.getElementById(d).style.height=nh+"px";
		document.getElementById(e).style.height=nh+"px";
	}
}
function fixHeight4(a,b,c,d) {
	if (document.getElementById(d)) {
		var b1=document.getElementById(a).offsetHeight;
		var b2=document.getElementById(b).offsetHeight;
		var b3=document.getElementById(c).offsetHeight;
		var b4=document.getElementById(d).offsetHeight;
		var nh = Math.max(b1,b2,b3,b4);
		document.getElementById(a).style.height=nh+"px";
		document.getElementById(b).style.height=nh+"px";
		document.getElementById(c).style.height=nh+"px";
		document.getElementById(d).style.height=nh+"px";
	}
}
function fixHeight3(a,b,c) {
	if (document.getElementById(c)) {
		var b1=document.getElementById(a).offsetHeight;
		var b2=document.getElementById(b).offsetHeight;
		var b3=document.getElementById(c).offsetHeight;
		var nh = Math.max(b1,b2,b3);
		document.getElementById(a).style.height=nh+"px";
		document.getElementById(b).style.height=nh+"px";
		document.getElementById(c).style.height=nh+"px";
	}
}
function fixHeight2(a,b) {
	if (document.getElementById(b)) {
		var b1=document.getElementById(a).offsetHeight;
		var b2=document.getElementById(b).offsetHeight;
		var nh = Math.max(b1,b2);
		document.getElementById(a).style.height=nh+"px";
		document.getElementById(b).style.height=nh+"px";
	}
}

var gCurrentSel = 0;

function ChangeLocalMainDivSelection(a){
    
    var hidele = $j("#localMain").find("input:hidden");
    var k;
    
    clearLocalMainDivSelection();
    
    if(a!=''){  
          k = a;            
    }else{         
         k = hidele[gCurrentSel].id.split('hidden')[1];                 
    }
    var ah = document.getElementById('href'+k);
    var h = document.getElementById('hidden'+k);
    var li = document.getElementById('li'+k);
    var localImage = document.getElementById('localMainImgId');
    li.className = 'active';
    ah.className = 'active';    
    localImage.setAttribute('src', h.value); 
    localImage.setAttribute('title',ah.innerHTML);
    document.getElementById('localMainLinkId').href = ah;    
    if(a!=''){  
        for(i=0; i<hidele.length; i++){
             if(k==hidele[i].id.split('hidden')[1]){
                gCurrentSel = i; 
             }       
        }       
           
    }else{
          
        if(gCurrentSel==3){
            gCurrentSel = 0;
        }else{
            gCurrentSel++;   
        }
        t1 = $j(setTimeout("ChangeLocalMainDivSelection('')",5000));
    }   
} 
function Carousel(){   
    if(document.getElementById('ultabList')){
        ChangeLocalMainDivSelection('','false');   
    }
}

function clearLocalMainDivSelection(){

    $j("#localMain").find("[href]").removeClass('active');
}

function TrackLocalClick(s,h){
    if(s=='image'){    
        var localImage = document.getElementById('localMainImgId');   
        _gaq.push(['_trackEvent','Karoo Local Image','Clicked',h.title]);
    }
    if(s=='link'){         
        _gaq.push(['_trackEvent','Karoo Local Link','Clicked',h]);
    }
    if(s=='all'){
        _gaq.push(['_trackEvent','Karoo Local All','Clicked','See all our local news']);
    } 
}


function TrackArchiveClick(c,t){        
        _gaq.push(['_trackEvent','Karoo Archive '+c,'Clicked',t]);
}



// Focus on Google Search on load
( function($) {
	$(document).ready(function () { 
		$("#ctl00_Search_googlesearchbox").focus();
	});
} ) ( jQuery );