if(!window.Msn){window.Msn={};}

Msn.Flash=new function(){var me=this;var flv=null;var d=document;var w=window;function E(id){return d.getElementById(id);}
function flVer(){if(flv===null){flv=0;var i,f=null,p=w.navigator.plugins;if(p&&p.length){f=(p["Shockwave Flash"]||p["Shockwave Flash 2.0"]);if(f&&(i=f.description)){flv=parseInt(i.substring(i.indexOf('.')-2));}}
else if(w.ActiveXObject){for(i=15;i>2&&!f;--i){eval("try{f=new ActiveXObject('ShockwaveFlash.ShockwaveFlash.'+i);}catch(e){}");if(f){flv=i;}}}}
return flv;}
this.Version=function(){return flVer();};this.Build=function(f,v,wf,hf,id,pf){var m=5;if(v){var p=v.lastIndexOf(' ');if(p>0){p=parseInt(v.substring(p));}
else{p=parseInt(v);}
m=(isNaN(p)?m:p);}
if(m<=flVer()){var defs={movie:f,quality:'high',wmode:'transparent'};var el='<object id="'+id+'obj" type="application/x-shockwave-flash" width="'+
wf+'" height="'+hf+'" data="'+f+'">';if(pf)
{for(var r in defs)
{if(!pf[r])
{pf[r]=defs[r];}}}
else
{pf=defs;}
for(var p in pf)
{if(pf[p])
{el+='<param name="'+p+'" value="'+pf[p]+'"/>';}}
el+='</object>';var dv=(id?d.getElementById(id):null);if(dv){dv.innerHTML=el;}
else{d.write(el);}}};return this;};

Msn.Video=new function(){var me=this;this.OnVideoTitle=function(text,id)
{var id=id+"_t";if(checkString(text)&&checkString(id))
{var el=document.getElementById(id);if(el)
{el.innerHTML=text;}}}
this.OnLinkback=function(text,url,id)
{var id=id+"_m";var c;var el=document.getElementById(id);var css;if(el)
{el.innerHTML="";for(c=0;c<=text.length-1;c++)
{if(checkString(text[c])&&checkString(url[c]))
{css=(c==text.length-1)?"linkback last":"linkback";el.innerHTML=el.innerHTML+'<a class="'+css+'" href="'+url[c]+'" target="_blank">'+text[c]+'</a>';}}}}
this.OnAdLoaded=function(adData,id)
{var id=id+"_a";if(checkObject(adData)&&checkString(adData.imageUrl)&&checkArray(adData.clickUrls,2)&&checkString(id))
{var el=document.getElementById(id);if(el)
{el.innerHTML='<a class="ad" href="'+adData.clickUrls[1]+'" target="_blank"><img src="'+adData.imageUrl+'" width="300" height="60"></a>';}}}
this.Build=function(id,dl,fv,w,h)
{var el=document.getElementById(id);if(el){var v='<div class="video1"><h3 id="' + id + '_t"></h3><div id="' + id + '_p"><div>' + (dl?dl:'') + '</div><a href="http://www.adobe.com/go/getflashplayer" target="_blank">This video requires the AdobeÂ® FlashÂ® Player. Download a free version of the player.</a></div><div id="' + id + '_m"></div><div id="' + id + '_a"></div></div>';el.innerHTML=v;Msn.Video.BuildPlayer(id,fv,w,h);}}
this.BuildPlayer=function(id,fv,w,h)
{var fvv={ifs:"true",playlistmin:"2"};for(var i in fv)fvv[i]=fv[i].replace(/\&/g,"%26");var fvs="";for(var i in fvv)fvs+=i+"="+fvv[i]+"&amp;";fvs+="ch=true&amp;cbprefix=Msn.Video.&amp;cbdata="+id;Msn.Flash.Build('http://images.video.msn.com/flash/soapbox1_1.swf','9',w?w:300,h?h:269,id+'_p',{allowScriptAccess:'always',allowFullScreen:'true',base:'http://images.video.msn.com/flash/soapbox1_1.swf',flashvars:fvs});}
function checkString(s)
{return((typeof(s)=="string")&&(s.length>0));}
function checkObject(o)
{return(typeof(o)=="object"&&(null!=o));}
function checkArray(array,minLength)
{var arrayCheck=(array instanceof Array);if(minLength!='')
{arrayCheck=arrayCheck&&(array.length>=minLength);}
return arrayCheck;}
return this;};
