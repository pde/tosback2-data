
/*qgtv-zoom:15400972.24*/

/*
* Bildvergroesserung auf Lupen in den QGTV-Elementen, inklusive Verschiebung etc.
* unabhängig von anderen Scripten
* nur auf Bilder, NICHT auf Videos
* Grafikpfade (SHADOW und CLOSE, siehe unten ) müssen im CMS mit Verweisen belegt werden
* HTML: reagiert auf class=magnify im HTML
* HTML: im vor diesem Element liegenden A-Tag muss im href der Pfad zum Grossbild eingetragen werden
*/
var de = de || {};
de.bild = de.bild || {};
de.bild.qgtv = de.bild.qgtv || {};
de.bild.qgtv.zoom = de.bild.qgtv.zoom || {};
/*Grafikpfade fuer Bildvergroesserung (aus Konfig-Datei)*/
de.bild.qgtv.zoom.SHADOW="http://bilder.bild.de/fotos/shadow-lightbox-15401718/Bild/3.bild.png";
de.bild.qgtv.zoom.CLOSEGIF="http://bilder.bild.de/fotos/btn-schliessen-15401688/Bild/2.bild.gif";
/*Texte fuer Bildvergroesserung*/
de.bild.qgtv.zoom.BV1="Doppelklick zum  Schlie&szlig;en";
de.bild.qgtv.zoom.BV2="Schlie&szlig;en";
/*Fading-Sperre*/
de.bild.qgtv.zoom.block=0;
de.bild.qgtv.zoom.ziz=20000;
de.bild.qgtv.zoom.xo=0;
de.bild.qgtv.zoom.yo=0;
de.bild.qgtv.zoom.aktid=null;
/*------------------------------------------------------------------------------Zoom-Init----------*/
/*fuer jede Bildvergroeßerung wird ein entsprechender Div-Bereich angelegt*/
de.bild.qgtv.zoom.Init = function(e){
 var zielId=this.id.replace(/start/,"ziel");
 if(!document.getElementById(zielId)){
  var zdiv=document.createElement('div');
  zdiv.id=zielId;
  zdiv.className="imgElPopup";
  document.getElementsByTagName('body')[0].appendChild(zdiv);
 }
 var ziel=document.getElementById(zielId); 
 this.tmphref=this.tmphref?this.tmphref:this.href;
 this.href="javascript:void(0);";
 de.bild.qgtv.zoom.ziz++;
 var http=(window.ActiveXObject)?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
 if (http.overrideMimeType){http.overrideMimeType('text/html');}
 http.onreadystatechange=function(){
  if(http.readyState=="complete"||http.readyState==4){
   ziel.innerHTML=http.responseText;
   ziel.getElementsByTagName('img')[1].style.height="326px";
   if(ziel.getElementsByTagName('img')[1].offsetWidth>434){
    ziel.getElementsByTagName('img')[1].style.width="434px";
    ziel.getElementsByTagName('img')[1].style.height="";
   }
  }
 }
 http.open("GET",this.tmphref,true);
 http.send(null);
 ziel.onmousedown=de.bild.qgtv.zoom.Zieh;
 document.onmousemove=de.bild.qgtv.zoom.Maus;
 ziel.onmouseup=function(){de.bild.qgtv.zoom.aktid=null};
 with(ziel.style){
  if(window.event){
   top=event.clientY+((window.pageYOffset)?window.pageYOffset:document.documentElement.scrollTop)-event.offsetY-52+"px";
  }else{
   top=e.pageY-e.layerY-52+"px";
  }
  zIndex=de.bild.qgtv.zoom.ziz;
  cursor="move";
  display="block";
  opacity=0;
  filter="Alpha(opacity=0)";
 }
 ziel.opa=0;
 de.bild.qgtv.FadeUp(zielId);
};
/*-----------------------------------------------------------------------------Aufblenden----------*/
de.bild.qgtv.FadeUp=function(was){
 var obj=document.getElementById(was);
 
 if(obj){
 obj.style.background="none";
 de.bild.qgtv.zoom.block=1;
 obj.opa+=20;
 obj.style.opacity=obj.opa/100;
 obj.style.filter="Alpha(opacity="+obj.opa+")";
 obj.style.left="2px";
 if(obj.opa<100){
  if(obj.getElementsByTagName('img')[1]&&obj.getElementsByTagName('img')[1].offsetWidth>434){
   obj.getElementsByTagName('img')[1].style.width="434px";
   obj.getElementsByTagName('img')[1].style.height="";
  }
  setTimeout("de.bild.qgtv.FadeUp('"+was+"')",50)
 }else{
  obj.style.background="transparent url("+de.bild.qgtv.zoom.SHADOW+")";
  obj.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+de.bild.qgtv.zoom.SHADOW+"')";
  obj.opa=100;
  de.bild.qgtv.zoom.block=0;
 }
}};
/*------------------------------------------------------------------------------Abblenden----------*/
de.bild.qgtv.FadeDown=function(was){
 if(de.bild.qgtv.zoom.block==0){
  var obj=document.getElementById(was);
  obj.style.background="none";
  obj.opa-=20;
  obj.style.opacity=obj.opa/100;
  obj.style.filter="Alpha(opacity="+obj.opa+")";
  if(obj.opa>0){
   setTimeout("de.bild.qgtv.FadeDown('"+was+"')",50)
  }else{
   obj.opa=0;
   obj.style.display="none";
  }
 }
};
/*---------------------------------------------------------------------------------Ziehen----------*/
de.bild.qgtv.zoom.Zieh=function(e){
 if(de.bild.qgtv.zoom.aktid==null){
 de.bild.qgtv.zoom.aktid=this;
 this.tx=parseInt(this.style.left);
 this.ty=parseInt(this.style.top);
 de.bild.qgtv.zoom.ziz++;
 this.style.zIndex=de.bild.qgtv.zoom.ziz;
 de.bild.qgtv.zoom.xo=((window.event)?event.clientX+((window.pageXOffset)?window.pageXOffset:document.documentElement.scrollLeft):e.pageX)-this.tx;
 de.bild.qgtv.zoom.yo=((window.event)?event.clientY+((window.pageYOffset)?window.pageYOffset:document.documentElement.scrollTop):e.pageY)-this.ty;
 return false;
}};
/*--------------------------------------------------------------------------Mauserkennung----------*/
de.bild.qgtv.zoom.Maus=function(e){
 var mausX=(window.event)?event.clientX+((window.pageXOffset)?window.pageXOffset:document.documentElement.scrollLeft):e.pageX;
 var mausY=(window.event)?event.clientY+((window.pageYOffset)?window.pageYOffset:document.documentElement.scrollTop):e.pageY;
 if(de.bild.qgtv.zoom.aktid!=null){
  de.bild.qgtv.zoom.aktid.style.left=mausX-de.bild.qgtv.zoom.xo+'px'; 
  de.bild.qgtv.zoom.aktid.style.top=mausY-de.bild.qgtv.zoom.yo+'px';
 }
 return false;
};
/*-----------------------------------------------------------------Schaltflaechen belegen----------*/
de.bild.qgtv.zoom.Events = function(){
    /*alle Span-Tags der Seite*/
    var spans=document.getElementsByTagName('span');
    for(var i=0;i<spans.length;i++){
        /*wenn im Klassennamen "magnify"*/
        if(spans[i].className.match(/magnify/)){
   /*nur wenn Teaser ein Bild ist, kein Video*/
   if(spans[i].parentNode.getElementsByTagName('img')[0]&&spans[i].parentNode.getElementsByTagName('img')[0].className=="photo"){
    /*Initialisiere Zoomobjekte
    de.bild.qgtv.zoom.init(i);*/
    /*Gibt der jeweiligen "Vergroeßern"-Flaeche eine ID*/
    spans[i].parentNode.id="qgtvstartzoom"+i;
    /*onclick auf die Lupe-Icons*/
    spans[i].parentNode.onclick=de.bild.qgtv.zoom.Init;
   }
  }
    }
};
/*---------------------------------------------------------------------Start der Funktion----------*/
de.bild.qgtv.zoom.Events();