
  // Location of the seal flash file and static image file in your server. 
  // Change the directory path if the locations are different in your
  // web server 
  seal_gif_url="/sbd/img/ico/verisignseal.gif";

  /* DON'T CHANGE BELOW */
  // dn field is your server host name that hosts the seal that must also 
  // match the SSL certificate common name 
  dn="www.staples.com";
  sap="getverisignsealimage.js";
  splash_url="https://seal.verisign.com";
  tpt="transparent";

  u1=splash_url+"/splash?form_file=fdf/splash.fdf&dn="+dn+"&lang=en";

  function vrsn_splash() {
    tbar = "location=yes,status=yes,resizable=yes,scrollbars=yes,width=560,height=500";
    sw = window.open(u1,'VRSN_Splash',tbar);
    sw.focus();
  }

  {
    var ver=-1;
    var v_ua=navigator.userAgent.toLowerCase();
    var re=new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(v_ua) != null)
     ver = parseFloat( RegExp.$1 );
    var v_old_ie=(v_ua.indexOf("msie")!=-1);
    if (v_old_ie) {
     v_old_ie = ver < 5;
    }

    function maction(e){
      if (document.addEventListener) {
        var seal=(e.target.name=="seal");
        if (seal) { vrsn_splash(); return false; }
      } else if(document.captureEvents) {
        var tgt=e.target.toString(); 
        var seal=(tgt.indexOf("splash")!=-1);
        if (seal){ vrsn_splash(); return false; }
      }
      return true;
    }

    function mouseDown() {
      if (event.button==1){
        if (v_old_ie) { return true; } else { vrsn_splash(); return false; }
      } else if (event.button==2) { vrsn_splash(); return false; }
    }

    document.write("<a HREF=\""+u1+"\" tabindex=\"-1\" onmousedown=\"return mouseDown();\" target=\"VRSN_Splash\"><IMG NAME=\"seal\" BORDER=\"true\" SRC=\""+seal_gif_url+"\" oncontextmenu=\"return false;\"></A>");

    if((v_ua.indexOf("msie")!=-1) && (ver>=7)) {
      var plat=-1;
      var re=new RegExp("windows nt ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(v_ua) != null)
        plat = parseFloat( RegExp.$1 );

      if (plat >= 5.1) {
       document.write("<div style='display:none'>");
       document.write("<img src='https://extended-validation-ssl.verisign.com/dot_clear.gif'/>");
       document.write("</div>");
      }
    }

    if (document.addEventListener){ 
      document.addEventListener('mouseup', maction, true); 
    } else {
      if (document.layers){
        document.captureEvents(Event.MOUSEDOWN); document.onmousedown=maction;
      }
    }

    function resized(){
      if(pageWidth!=innerWidth || pageHeight!=innerHeight){
        self.history.go(0);
      }
    }

    if(document.layers){
      pageWidth=innerWidth; pageHeight=innerHeight; window.onresize=resized;
    }
  }
