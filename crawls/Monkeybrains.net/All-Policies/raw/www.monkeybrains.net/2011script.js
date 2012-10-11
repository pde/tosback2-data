// Sorting routines for the nav menus and dealing with 
// different size windows upon resize events.

var mySort;

window.addEvent('domready', function(){
    mySort = new Fx.Sort($$(".sortMe"), {
        duration: 700, 
        transition: Fx.Transitions.Back.easeOut
    } );
  var but=0;
  for (but=0;but<=5;but++) {
	if ($('but_'+but)) {
		$('but_'+but).title=but;
		$('but_'+but).addEvent('click', function(event){
			event.stop();
			hideAjax();
			mySort.sort(this.title);
		});
	}
  }

  if ($('but_webmail')) {
    document.id('but_webmail').addEvent('click', function(event){
      event.stop();
      slideAjax("Webmail.html");
    });
  }
  if ($('but_billing')) {
    document.id('but_billing').addEvent('click', function(event){
      event.stop();
      slideAjax("Billing.html");
    });
  }
  if ($('but_contact')) {
    document.id('but_contact').addEvent('click', function(event){
      event.stop();
      slideAjax("Contact.html");
    });
  }
  if ($('but_contactHosting')) {
    document.id('but_contactHosting').addEvent('click', function(event){
      event.stop();
      slideAjax("ContactHosting.html");
    });
  }

  var myTips = new Tips('.thisisatooltip');

  checkMargin();
  slideHashPageLoad();
    
  OverText.update();

  if ($("theWifiMap")) {
    $("theWifiMap").addEvent('click', function(event){
      event.stop();
      if ($("theWifiMap").title && $("theWifiMap").title=="Click to shrink") {
        $("theWifiMap").title="Click to grow";
        $("theWifiMap").setStyle('position','relative');
        $("theWifiMap").setStyle('left','0px');
        $("theWifiMap").setStyle('top','0px');
        $("theWifiMap").setStyle('height','');
        $("theWifiMap").setStyle('background','#FFF');
          checkMargin();
      } else {    
        $("theWifiMap").setStyle('background','#000');
        $("theWifiMap").setStyle('position','fixed');
        $("theWifiMap").setStyle('position','fixed');
        $("theWifiMap").setStyle('left','0px');
        $("theWifiMap").setStyle('top','0px');
        $("theWifiMap").setStyle('z-index','10');
        $("theWifiMap").setStyle('width','100%');
        $("theWifiMap").setStyle('height','100%');
        $("theWifiMap").setStyle('text-align','center');
        $("theWifiMap").title="Click to shrink";
        if ($("theWifiMapImg")) {
          $("theWifiMapImg").setStyle('width', '984px');
        }
      }
        
    });
  }
});

window.addEvent('resize', function(event){
  checkMargin();
});

function hideAjax() {
        new Fx.Slide('ajax').hide();
        OverText.hideAll();
        // log("Hiding... " + $('ajax').style.display);
}

function slideHashPageLoad () {
	if (window.location && window.location.hash && window.location.hash.length > 1) {
		slideAjax("./" + window.location.hash.substring(1) + ".html");
	}
}

function slideHash(el) {
	slideAjax(el.href.substring(el.href.indexOf('#') + 1) + ".html");
}

function slideAjax(aURL) {
  log(aURL);
  $('ajax').setStyle('display','block');
  var myRequest = new Request.HTML({
    url: aURL,
    method: 'get',
    update: $('ajax'),
    onRequest: function() { $('ajax').set('html','<img align=right src="2011/ajax.gif" />'); },
    onSuccess: function() {
        var mySlide = new Fx.Slide('ajax',{resetHeight: true}).hide().toggle().chain(function(){
            mySlide.open;
            OverText.showAll();
			var ajaxClose = new Element ('img', {
				'src': "2011/close.png",
				'class': 'close'
				});
			$('ajax').grab(ajaxClose, 'top');
			ajaxClose.addEvent('click', function(event){
      			event.stop(); hideAjax(); });
        });
    },
    onFailure: function(data) { $('ajax').set('text', 'Sorry, your request failed'); log("404 "+aURL); }
  });
  myRequest.send();
}

function checkMargin() {
  var bodyx = document.body.getSize().x;
  var bbx = $("blackBox").getSize().x;
  if (bodyx < 700) {
    $("content").setStyle('margin-top', -20);
    $("blackBox").setStyle('width', "95%");
  } else if (bodyx < 1045) {
    $("content").setStyle('margin-top', -20 - (bodyx - 700)/4.9);
    $("blackBox").setStyle('width', (85 + ((1045-bodyx)/345 * 10)) +"%");
  } else {
    $("content").setStyle('margin-top', -90);
    $("blackBox").setStyle('width', "85%");
  }
  // upper limit on blackBox width
  if (bodyx > 1200) {
    $("blackBox").setStyle('width', "1020px");
    // let the rocket fly across the screen!
    document.body.setStyle('margin-left', (bodyx-1200)/2+"px");
  } else {
    document.body.setStyle('margin-left', "0px");
  }

  if ($("theWifiMapImg")) {
    if ($("theWifiMap").title && $("theWifiMap").title=="Click to grow") {
      $("theWifiMapImg").setStyle('width', $("content").getSize().x-6);
    } else if (! $("theWifiMap").title) {
      $("theWifiMapImg").setStyle('width', $("content").getSize().x-6);
    }
  }

  return; //remove for java script error console info...
  log("body.x is " + document.body.getSize().x + "px");
  log("body.y is " + document.body.getSize().y + "px");
  log("content.x is " + $("content").getSize().x + "px");
  log("blackBox.x is " + $("blackBox").getSize().x + "px");
}

// logs to console
function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 100);
}

