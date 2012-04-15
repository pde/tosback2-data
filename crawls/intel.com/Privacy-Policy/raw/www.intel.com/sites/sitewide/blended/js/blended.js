// Blended Forms 

// namespace
if (typeof Blended == "undefined" || !Blended) {
    var Blended = {};
}
if (typeof Blended.Forms == "undefined" || !Blended.Forms) {
  Blended.Forms = {};
}
if (typeof Blended.Sfx == "undefined" || !Blended.Sfx) {
  Blended.Sfx = {};
}

// *********************** //
// Innitiate Forms
Blended.Forms.SetUp = 
{
  Main : function()
  {
   if (window.attachEvent) 
   {
    window.attachEvent("onload", this.pageInit);
   }
   else if (window.addEventListener) 
   { 
    window.addEventListener( "load", this.pageInit, false );
   }
  },
  pageInit : function()
  { 
    Blended.Forms.SelectBox.AttachJumpToUrlEvent();
  }
}
// kick off here
Blended.Forms.SetUp.Main();
Blended.Forms.SelectBox =
{ 
  AttachJumpToUrlEvent : function()
  {
   
   var SelectList = document.getElementsByTagName("select")
   
   for (var i=0;i<SelectList.length;i++)
   {
    
    if (SelectList[i].className.indexOf("url-select") != -1)
    {
     SelectList[i].onchange = function () { window.location.href=this.options[this.selectedIndex].value; }
    }
   }
  }
}

// *********************************** //
// SFX
document.write("<style>.sfx-hidden{display:none}</style>")

// Innitiate Sfx
Blended.Sfx.SetUp = 
{
  Main : function()
  {
   if (window.attachEvent) 
   {
    window.attachEvent("onload", this.pageInit);
   }
   else if (window.addEventListener) 
   { 
    window.addEventListener( "load", this.pageInit, false );
   }
  },
  pageInit : function()
  { 
    Blended.Sfx.LinkHover.initLinkHover("rolloverlink")
    Blended.Sfx.ExpandCollapse.AttachEvent();
  }
}
// kick off here
Blended.Sfx.SetUp.Main();

Blended.Sfx.LinkHover = 
{
hintdisplay : null,
timer : null,
delay : 1000,
activeLink : null,
initLinkHover : function(className) {
    var exclude = YAHOO.util.Dom.get("excludeinfobox");
    if (exclude) 
        return;
   
    var els = YAHOO.util.Dom.getElementsByClassName(className, 'div');
    for (var i =0; i < els.length; i++) {
          YAHOO.util.Event.addListener(els[i], "mouseover", this.ShowHint );
          YAHOO.util.Event.addListener(els[i], "mouseout", this.HideHint );
    }
    
    var els = YAHOO.util.Dom.getElementsByClassName(className, 'span');
    for (var i =0; i < els.length; i++) {
          YAHOO.util.Event.addListener(els[i], "mouseover", this.ShowHint );
          YAHOO.util.Event.addListener(els[i], "mouseout", this.HideHint );
    }
    
    Blended.Sfx.LinkHover.hintdisplay = new YAHOO.widget.Overlay("hoverdisplay", { xy:[200,200], visible:false, constraintoviewport:false} );
    
    Blended.Sfx.LinkHover.hintdisplay.setHeader("");
    Blended.Sfx.LinkHover.hintdisplay.setBody("");
    Blended.Sfx.LinkHover.hintdisplay.setFooter("");
    
   
           
   YAHOO.util.Event.addListener("hoverdisplay", "mouseover", this.KeepVisible );
   YAHOO.util.Event.addListener("hoverdisplay", "mouseout", this.QuickHideHint );
   Blended.Sfx.LinkHover.hintdisplay.render(document.body); 

},
ShowHint : function(e) {
    if (Blended.Sfx.LinkHover.timer != null)
    {
        clearTimeout(Blended.Sfx.LinkHover.timer);
    }
    if (Blended.Sfx.LinkHover.activeLink) {
        YAHOO.util.Dom.setStyle(Blended.Sfx.LinkHover.activeLink, "text-decoration", "none");
        this.activeLink = null;
    }
    
    var target = YAHOO.util.Event.getTarget(e).parentNode;
    var hint = YAHOO.util.Dom.getElementsByClassName('rolloverbody', '*', target)[0];
    var hintLink = hint.getElementsByTagName('a')[0];
    
    Blended.Sfx.LinkHover.activeLink = YAHOO.util.Event.getTarget(e);
    YAHOO.util.Dom.setStyle(Blended.Sfx.LinkHover.activeLink, "text-decoration", "underline"); 

    var hintPositionTop = YAHOO.util.Dom.getRegion(target).bottom + 2;
    var hintPositionLeft = YAHOO.util.Dom.getRegion(target).left;
    var hintWidth =  YAHOO.util.Dom.getRegion(target).right -  YAHOO.util.Dom.getRegion(target).left;
    hintWidth -= Math.ceil(hintWidth/7);
    hintPositionLeft += Math.floor(hintWidth/7); 

    YAHOO.util.Dom.setStyle(Blended.Sfx.LinkHover.hintdisplay.body.parentNode, "width", hintWidth+"px");

    Blended.Sfx.LinkHover.hintdisplay.moveTo(hintPositionLeft,hintPositionTop);
    Blended.Sfx.LinkHover.hintdisplay.setBody(hint.innerHTML);
    
    Blended.Sfx.LinkHover.hintdisplay.show();
 },

 KeepVisible : function() {
    if (Blended.Sfx.LinkHover.timer != null)
    {
        clearTimeout(Blended.Sfx.LinkHover.timer);
    }
 },

 HideHint : function() {
    if (Blended.Sfx.LinkHover.timer != null)
    {
        clearTimeout(Blended.Sfx.LinkHover.timer);
    }
    Blended.Sfx.LinkHover.timer = setTimeout("Blended.Sfx.LinkHover.doHideHint()",Blended.Sfx.LinkHover.delay);
 },
 
 QuickHideHint : function() {
     if (Blended.Sfx.LinkHover.timer != null)
    {
      clearTimeout(Blended.Sfx.LinkHover.timer);
    }
    Blended.Sfx.LinkHover.timer = setTimeout("Blended.Sfx.LinkHover.doHideHint()",100);
 },
 
doHideHint : function() {
    YAHOO.util.Dom.setStyle(Blended.Sfx.LinkHover.activeLink, "text-decoration", "none"); 

    if (Blended.Sfx.LinkHover.hintdisplay) {
         Blended.Sfx.LinkHover.hintdisplay.hide();
    }               
    Blended.Sfx.LinkHover.timer = null;
 }
}

// expand and collapse concertina
Blended.Sfx.ExpandCollapse =
{   
  ExpandCollapseLayer : function(obj)
  {
    var DLobj = obj.parentNode;
    var SpanContainer = DLobj.getElementsByTagName('a')[0];
    var DDobj = DLobj.getElementsByTagName('dd')[0];
    if(DDobj.className.indexOf("sfx-hidden") != -1)
    {
      DDobj.className=DDobj.className.replace(new RegExp("\\bsfx-hidden\\b"), "");
      SpanContainer.innerHTML = "-";
    }
    else
    {
      DDobj.className += " sfx-hidden";
      SpanContainer.innerHTML = "+";
    }

  },
  AttachEvent : function()
  {
    var DLlist = document.getElementsByTagName('dl')
    for (i=0; i<DLlist.length; i++)
    {
     if (DLlist[i].className.indexOf("concertina")!= -1)
     {
      var ocText = document.createTextNode("+");
      var ocLink = document.createElement('a');
      ocLink.href="#"
      ocLink.appendChild(ocText);
      DLlist[i].getElementsByTagName('span')[0].appendChild(ocLink);
      
      
      var DTLink = DLlist[i].getElementsByTagName('span');
      for (var j=0; j<DTLink.length; j++) {
        DTLink[j].style.cursor = 'pointer';
        DTLink[j].onclick = function () { Blended.Sfx.ExpandCollapse.ExpandCollapseLayer(this.parentNode);return false }
      }
     }
    }
  }
}