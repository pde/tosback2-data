//Viral Tools Script
// Copyright (C) 2005 Ilya S. Lyubinskiy. All rights reserved.
// Technical support: http://www.php-development.ru/
// ----- Popup Control ---------------------------------------------------------

function at_display(x)
{
  var win = window.open();
  for (var i in x) win.document.write(i+' = '+x[i]+'<br>');
}

// ----- Show Aux -----

function at_show_aux(parent, child)
{
  var p = document.getElementById(parent);
  var c = document.getElementById(child );

  var top  = (c["at_position"] == "x") ? p.offsetHeight+2 : 0;
  var left = (c["at_position"] == "y") ? p.offsetWidth +2 : 0;

  for (; p; p = p.offsetParent)
  {
    top  += p.offsetTop;
    left += p.offsetLeft;
  }

  c.style.position   = "absolute";
  c.style.top        = top +'px';
  c.style.left       = left+'px';
  c.style.visibility = "visible";
}

// ----- Show -----

function at_show()
{
  var p = document.getElementById(this["at_parent"]);
  var c = document.getElementById(this["at_child" ]);

  at_show_aux(p.id, c.id);

  clearTimeout(c["at_timeout"]);
}

// ----- Hide -----

function at_hide()
{
  var c = document.getElementById(this["at_child"]);

  c["at_timeout"] = setTimeout("document.getElementById('"+c.id+"').style.visibility = 'hidden'", 100000);
}

// ----- Click -----

function at_click()
{
  var p = document.getElementById(this["at_parent"]);
  var c = document.getElementById(this["at_child" ]);

  if (c.style.visibility != "visible")
       at_show_aux(p.id, c.id);
  else c.style.visibility = "hidden";

  return false;
}

// ----- Attach -----

function at_attach(parent, child, showtype, position, cursor)
{
  var p = document.getElementById(parent);
  var c = document.getElementById(child);

  p["at_parent"]     = p.id;
  c["at_parent"]     = p.id;
  p["at_child"]      = c.id;
  c["at_child"]      = c.id;
  p["at_position"]   = position;
  c["at_position"]   = position;

  c.style.position   = "absolute";
  c.style.visibility = "hidden";

  if (cursor != undefined) p.style.cursor = cursor;

  switch (showtype)
  {
    case "click":
      p.onclick     = at_click;
      p.onmouseout  = at_hide;
      c.onmouseover = at_show;
      c.onmouseout  = at_hide;
      break;
    case "hover":
      p.onmouseover = at_show;
      p.onmouseout  = at_hide;
      c.onmouseover = at_show;
      c.onmouseout  = at_hide;
      break;
  }
}

/*For Kaboodle*/
function addtokaboodle() {
var dkbdl=document;
var skbdl=dkbdl.createElement('script');
skbdl.type='text/javascript';
skbdl.src='http://www.kaboodle.com/zg/addbutton.js';
dkbdl.getElementsByTagName('head')[0].appendChild(skbdl);
} 


//For Plus sign imageswap -onclick
function changeplus(obj) {
var img = obj.getElementsByTagName('img')[0];
if(document.getElementById) {
img.src = (img.src.indexOf("more-plus3.gif") != -1) ? "/cm/harpersbazaar/images/design/v02/viral-tools/more-minus3.gif" : "/cm/harpersbazaar/images/design/v02/viral-tools/more-plus3.gif";
	}
	return false;
}


//For Plus sign imageswap (BLOGS)-onclick
function changeplusblogs(obj) {
var img = obj.getElementsByTagName('img')[0];
if(document.getElementById) {
img.src = (img.src.indexOf("blogsv2-share-plus.gif") != -1) ? "/cm/harpersbazaar/images/design/v02/blogsv2/blogsv2-share-minus.gif" : "/cm/harpersbazaar/images/design/v02/blogsv2/blogsv2-share-plus.gif";
	}
	return false;
}
