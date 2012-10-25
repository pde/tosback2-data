
// breakingnews


document.write('<div id="breaking" style="background-image: url(http://bilder.bild.de/fotos/background-15402288/Bild/4.bild.jpeg);"><span>Breaking News</span><div class="breakingTicker" ><div class="ugL"></div><ul>'
	
	+'<li><a href="http://www.bild.de/newsticker-meldungen/home/13-magath-entlassung-26875004.bild.html" style="font-size:11px; font-family:Arial;color:#0xFFFFFF;" >VfL Wolfsburg trennt sich von Trainer Felix Magath +++ VfL Wolfsburg trennt sich von Trainer Felix Magath</a></li>'
	
	+'<li><strong style="font-size:11px; font-family:Arial;color:#0xFFFFFF;">+++</strong></li></ul><div class="ugR"></div></div></div>');

var de=de || {};
de.bild = de.bild || {};
de.bild.bn = de.bild.bn || {};

de.bild.bn.Ticker=function(obj){
//Hier TickerTempo aendern. 1=langsam, 2=mittel, 3=schnell
    obj.l-=2.7;

    obj.l=(obj.l>-obj.length-100)?obj.l:(obj.i==0)?-62:-82;
    obj.getElementsByTagName('ul')[0].style.left=obj.l+100+"px";
};

de.bild.bn.obj=document.getElementById('breaking');
de.bild.bn.obj.l=de.bild.bn.obj.length=0;
for(var i=0;i<de.bild.bn.obj.getElementsByTagName('li').length;i+=2){
    de.bild.bn.obj.length+=de.bild.bn.obj.getElementsByTagName('li')[i].offsetWidth;

}


de.bild.bn.obj.inh=de.bild.bn.obj.getElementsByTagName('ul')[0].innerHTML;
for(var i=0;i<de.bild.bn.obj.offsetWidth/de.bild.bn.obj.length;i++){
    de.bild.bn.obj.getElementsByTagName('ul')[0].innerHTML+=de.bild.bn.obj.inh;
    de.bild.bn.obj.i=i;
}
de.bild.bn.obj.onmouseover=function(){clearInterval(de.bild.bn.go)};
de.bild.bn.obj.onmouseout=function(){de.bild.bn.go=setInterval(function(){de.bild.bn.Ticker(de.bild.bn.obj)},50)};
de.bild.bn.go=setInterval(function(){de.bild.bn.Ticker(de.bild.bn.obj)},50);
