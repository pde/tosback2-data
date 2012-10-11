/*******************************************************************************************

  dw_drag.js 
  version date Nov 2003

  This code is from Dynamic Web Coding at http://www.dyn-web.com/
  See Terms of Use at http://www.dyn-web.com/bus/terms.html
  regarding conditions under which you may use this code.
  This notice must be retained in the code as is!

  This code borrows heavily from Aaron Boodman's dom drag at www.youngpup.net
  
********************************************************************************************/

var dragObj = {
  supported: document.getElementById && (document.addEventListener || document.attachEvent),
  obj: null,
  zOrder: 1000,
  // a class can be attached to close box (or other elements) so mousedown on it won't trigger drag
  skipClass: "xBox",
  
  // id is that of object you mousedown on when you want to drag,
  // which may or may not be inside another element (rootID) which gets dragged
  init: function(id, rootID, x, y, minX, maxX, minY, maxY) {
    if (this.supported) {
      var o = document.getElementById(id);
      o.root = rootID? document.getElementById(rootID): o;
      o.idx = id; // used for checking in start
      //  pass x/y, set left/top inline or via script, or it gets set to 0,0
      if ( isNaN( parseInt(o.root.style.left) ) ) o.root.style.left = x? x + "px": 0 + "px"; 
      if ( isNaN( parseInt(o.root.style.top) ) )  o.root.style.top =  y? y + "px": 0 + "px";
      o.minX = minX; o.maxX = maxX; o.minY = minY; o.maxY = maxY;
      o.root.on_drag_start = function() {}
      o.root.on_drag = function() {}
      o.root.on_drag_end = function() {}
      dw_event.add( o, "mousedown", dragObj.start, false );
    }
  },
  
  start: function(e) {
    var o;
    e = dw_event.DOMit(e);
    // Check if moused down on an object that shouldn't trigger drag (close box, for example)
    if (e.tgt.nodeType && e.tgt.nodeType == 3) e.tgt = e.tgt.parentNode;  // text node?
    if (e.tgt.className && e.tgt.className.indexOf( dragObj.skipClass )>=0 ) return;

    //Checking if click was made on the player elements (play, pause, stop, rewind, volume, etc.) //DEV-2936
    if (e.tgt.id == "ply" ) return
    if (e.tgt.id == "premiumColumnSelect") return //DEV-2583

    if (this.idx) o = dragObj.obj = this;
    else {  // o != this for ie when using attachEvent
     while (!e.tgt.idx) e.tgt = e.tgt.parentNode;
     o = dragObj.obj = e.tgt; 
    }
    o.root.style.zIndex = dragObj.zOrder++;
    o.downX = e.clientX; o.downY = e.clientY;
    o.startX = parseInt(o.root.style.left);
    o.startY = parseInt(o.root.style.top);
    o.root.on_drag_start(o.startX, o.startY);
    dw_event.add( document, "mousemove", dragObj.drag, true );
    dw_event.add( document, "mouseup",   dragObj.end,  true );
    e.preventDefault();
  },

  drag: function(e) {
    e = e? e: window.event;
    var o = dragObj.obj; 
    // calculate new x/y values
    var nx = o.startX + e.clientX - o.downX;
    var ny = o.startY + e.clientY - o.downY;
    if ( o.minX != null ) nx = Math.max( o.minX, nx );
    if ( o.maxX != null ) nx = Math.min( o.maxX, nx );
    if ( o.minY != null ) ny = Math.max( o.minY, ny );
    if ( o.maxY != null ) ny = Math.min( o.maxY, ny );
    o.root.style.left = nx + "px"; o.root.style.top  = ny + "px";
    o.root.on_drag(nx,ny);
    return false;
  },

  end: function() {
    dw_event.remove( document, "mousemove", dragObj.drag, true );
    dw_event.remove( document, "mouseup",   dragObj.end,  true );
    if ( !dragObj.obj ) return; // avoid errors in ie if inappropriate selections
    dragObj.obj.root.on_drag_end( parseInt(dragObj.obj.root.style.left), parseInt(dragObj.obj.root.style.top) );
    dragObj.obj = null;
  }

}