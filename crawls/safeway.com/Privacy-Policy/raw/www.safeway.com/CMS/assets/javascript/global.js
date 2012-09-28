var enabledFeature = false;
window.console = window.console || { log: function(){}};

function alertkey(e) {
  if( !e ) {
    //if the browser did not pass the event information to the
    //function, we will have to obtain it from the event register
	    if( window.event ) {
	      //Internet Explorer
	      e = window.event;
	    } else {
	      //total failure, we have no way of referencing the event
	      return;
	    }
	}

	  if( typeof( e.keyCode ) == 'number'  ) {
	    //DOM
	    e = e.keyCode;
	  } else if( typeof( e.which ) == 'number' ) {
	    //NS 4 compatible
	    e = e.which;
	  } else if( typeof( e.charCode ) == 'number'  ) {
	    //also NS 6+, Mozilla 0.9+
	    e = e.charCode;
	  } else {
	    //total failure, we have no way of obtaining the key code
	    return;
	  }
	  
	  if (e == 192 && document.getElementById) {
	  	enabledFeature=true;
	  }
	  if (enabledFeature) {
		  if (e == 219 && document.getElementById) {
			var all = document.all ? document.all : document.getElementsByTagName('*');
			  for (var i = 0; i < all.length; i++) {
			    if (all[i].className == 'caption') {all[i].style.display='inline';}
			    if (all[i].className == 'genericESpot') {all[i].style.border='2px dashed red';}
			    if (all[i].className == 'genericCSpot') {all[i].style.border='2px dashed blue';}
			  }
		  }else if (e == 221 && document.getElementById) {
			var all = document.all ? document.all : document.getElementsByTagName('*');
			  for (var i = 0; i < all.length; i++) {
			    if (all[i].className == 'caption') {all[i].style.display='none';}
			    if (all[i].className == 'genericESpot') {all[i].style.border='0px solid white';}
			    if (all[i].className == 'genericCSpot') {all[i].style.border='0px solid white';}
			  }
		  }
	}
}

var keyPressAvailable=true;

function outlineSpots() {
	var all = document.all ? document.all : document.getElementsByTagName('*');
	  for (var i = 0; i < all.length; i++) {
	    if (all[i].className == 'caption') {all[i].style.display='block';}
	    if (all[i].className == 'genericESpot') {all[i].style.border='2px dashed red';}
	    if (all[i].className == 'genericCSpot') {all[i].style.border='2px dashed blue';}
	  }
}

function hideSpots() {
	var all = document.all ? document.all : document.getElementsByTagName('*');
	  for (var i = 0; i < all.length; i++) {
	    if (all[i].className == 'caption') {all[i].style.display='none';}
	    if (all[i].className == 'genericESpot') {all[i].style.border='0px solid white';}
	    if (all[i].className == 'genericCSpot') {all[i].style.border='0px solid white';}
	  }
}
