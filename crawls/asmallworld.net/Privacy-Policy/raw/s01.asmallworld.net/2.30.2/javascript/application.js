// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

function imageLinkDown(elm, url){
    elm.__drag_url__ = url;
}

function imageLinkUp(elm){
    if(elm["__drag_url__"] != null){
        window.location.href = elm["__drag_url__"];
    }
}
startList = function(){
    if (document.all && document.getElementById) {
        navRoot = document.getElementById("primarynav");
        if(navRoot){
            for (i = 0; i < navRoot.childNodes.length; i++) {
                node = navRoot.childNodes[i];
                if (node.nodeName == "LI") {
                    node.onmouseover = function(){
                        this.className += " over";
                    }
                    node.onmouseout = function(){
                        this.className = this.className.replace(" over", "");
                    }
                }
            }
        }
    }
}

function barChart(options){
    var id = options["id"];
    if(!id){
        throw "NoIDFound";
    }
    var total = options["total"] || 100;
    var val = options["value"] || 0;
    var fcolor = options["fcolor"] || "yellow";
    var bcolor = options["bcolor"] || "red";
    var border = options["border"] || "#000000";
    var borderSize = options["borderSize"] || 1;
    var width = options["width"] || "200";
    var height = options["height"] || "75";
    
    var label = options["label"];
    var fontFamily = options["fontFamily"] || "Helvetica";
    var fontSize = options["fontSize"] || "10pt";
    var textAlign = options["textAlign"] || "center";
    var verticalAlign = options["verticalAlign"] || "absmiddle";
    var fontColor = options["fontColor"] || "#000000";
    
    var container = document.getElementById(id);
    var cnv = document.createElement("canvas");
    cnv.setAttribute("width", width);
    cnv.setAttribute("height", height);
    container.appendChild(cnv); 
    if(window["G_vmlCanvasManager"]){
        G_vmlCanvasManager.initElement(cnv); // excanvas
    }
    var ctx = cnv.getContext("2d");
    var _drawRect = function(ctx, x, y, w, h){
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x+w, y);
      ctx.lineTo(x+w, y+h);
      ctx.lineTo(x, y+h);
      ctx.lineTo(x,y);
      ctx.closePath();
    };
    var drawRect = function(ctx, x, y, w, h, color, lineWidth){
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      _drawRect(ctx, x, y, w, h);
      ctx.stroke();
    };
    var fillRect = function(ctx, x, y, w, h, color){
      ctx.fillStyle = (color);
      _drawRect(ctx, x, y, w, h);
      ctx.fill();
    };

    var perc = ((val/total) * width) - (borderSize);
    var borderInc = borderSize / 2;
    drawRect(ctx, 0, 0, width, height, border, borderSize);
    fillRect(ctx, 
              borderInc, 
              borderInc, 
              width-borderSize, 
              height-borderSize, 
              bcolor);
    fillRect(ctx,
              borderInc,
              borderInc,
              perc,
              height-borderSize,
              fcolor);
    if(label){
        var ldiv = document.createElement("div");
        ldiv.style.width = width + "px";
        ldiv.style.height = height + "px";
        ldiv.style.fontFamily = fontFamily;
        ldiv.style.fontSize = fontSize;
        ldiv.style.textAlign = textAlign;
        ldiv.style.color = fontColor;
        ldiv.innerHTML = label;
        container.appendChild(ldiv);
    }
  
}
Event.observe(window, "load", startList);
