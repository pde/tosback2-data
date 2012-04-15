		function getViewportDimensions() {
    var intH = 0, intW = 0;
    
    if(self.innerHeight) {
       intH = window.innerHeight;
       intW = window.innerWidth;
    } 
    else {
        if(document.documentElement && document.documentElement.clientHeight) {
            intH = document.documentElement.clientHeight;
            intW = document.documentElement.clientWidth;
        }
        else {
            if(document.body) {
                intH = document.body.clientHeight;
                intW = document.body.clientWidth;
            }
        }
    }

    return {
        height: parseInt(intH, 10),
        width: parseInt(intW, 10)
    };
}

function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return { 
  	scroll_x: parseInt(scrOfX,10), 
  	scroll_y: parseInt(scrOfY ,10)
  		};
}


	function GetOffset (object, offset) {
   		if (!object)
      		return;
     	offset.x += object.offsetLeft;
      	offset.y += object.offsetTop;
		GetOffset (object.offsetParent, offset);
        }

	function GetScrolled (object, scrolled) {
  		if (!object)
    		return;
     	scrolled.x += object.scrollLeft;
		scrolled.y += object.scrollTop;
		if (object.tagName.toLowerCase () != "html") {
   			GetScrolled (object.parentNode, scrolled);
   			}
        }

	function GetTopLeft (whichid) {
		//var div = document.getElementById ("secondpromopicker");
		var div = document.getElementById(whichid);
		var offset = {x : 0, y : 0};
 		GetOffset (div, offset);
   		var scrolled = {x : 0, y : 0};
   		GetScrolled (div.parentNode, scrolled);
     	posX = offset.x - scrolled.x;
  		posY = offset.y - scrolled.y;
   		return {
     		loc_posX: posX,
      		loc_posY: posY
 			};
   		}
