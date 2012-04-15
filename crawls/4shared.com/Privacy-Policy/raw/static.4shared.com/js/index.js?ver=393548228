function preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

  function popUpDemo(url) {
    demo=window.open(url,"win",'toolbar=0,status=0,scrollbars=yes,resizable=yes,top="0",left="0",width=790,height=600');
    self.name = "Flash Demo";
  }

function changeAPic(aElem,isOver)
{ var img = aElem.getElementsByTagName("img")[0];
  var src = img.src;
  var dot = src.lastIndexOf('.');
  if (src.substring(dot-4,dot)=='Over')
  { src = src.substring(0,dot-4)+src.substring(dot);// without '-Over'
  }
  if (isOver)
  { // add '-Over'
    dot = src.lastIndexOf('.');
    src = src.substring(0,dot)+"Over" + src.substring(dot);
  }
  img.src=src;
}

  function openNetworkFolder(url) {
    newWindow = window.open(url,"networkFolder"+Math.ceil(10000*Math.random()),'location=yes,toolbar=no,status=no,scrollbars=yes,resizable=yes,top=0,left=10,width=990,height=700');
    newWindow.focus();
  }

function openLiveHelp(link)
{
    window.open(link, 'chat54050872', 'width=520,height=470,menubar=no,scrollbars=0,resizable=1');
}
