jQuery.fn.combobox=function(F,A){var D=this;
this.combobox=new Function();
var H={comboboxContainerClass:null,comboboxValueContentContainerClass:null,comboboxValueContentClass:null,comboboxDropDownButtonClass:null,comboboxDropDownClass:null,comboboxDropDownItemClass:null,comboboxDropDownItemHoverClass:null,comboboxDropDownGroupItemHeaderClass:null,comboboxDropDownGroupItemContainerClass:null};
var C={animationType:"slide",animationSpeed:"fast",width:120,tabIndex:0};
if(F){jQuery.extend(H,F)
}if(A){jQuery.extend(C,A)
}this.combobox.onChange=null;
function I(K){return K[0].internalCombobox
}function J(K){return function(){I(K).remove()
}
}function G(K){return function(){I(K).update()
}
}function B(K){return function(){I(K).updateSelection()
}
}function E(K){return function(L){I(K).addRange(L)
}
}jQuery.fn.extend(this.combobox,{addRange:E(D),remove:J(D),update:G(D),updateSelection:B(D)});
return this.each(function(){this.internalCombobox=new K(this);
this.internalCombobox.initialise();
function K(y){var V=jQuery(y);
var s=null;
var c="background-color:#fff;border-left: solid 2px #777;border-top: solid 2px #777;border-right: solid 1px #ccc;border-bottom: solid 1px #ccc;";
var b="padding:0;";
var Ai=null;
var Ah="list-style-type:none;min-height:15px;padding-top:0;margin:0;overflow:auto";
var O="cursor:default;padding:2px;background:#fff;border-right:solid 1px #000;border-bottom:solid 1px #000;border-left:solid 1px #aaa;border-top:solid 1px #aaa;";
var Av="display:block;";
var Ac="cursor:default;padding-left:2px;font-weight:normal;font-style:normal;";
var a="list-style-type:none;";
var l="padding-left:10px;margin-left:0;";
var AC="";
var AH="font-style:italic;font-weight:bold;";
var Y=300;
var Aa=null;
var Al="position:relative;overflow:hidden;";
var d=null;
var h="float:left;position:absolute;cursor:default;overflow:hidden;";
var Ae="padding-left:3px;";
var As=null;
var n="overflow:hidden;width:16px;height:18px;color:#000;background:#D6D3CE;font-family:arial;font-size:8px;cursor:default;text-align:center;vertical-align:middle;";
var Ar="background-repeat:no-repeat;float:right;";
var An="padding-left:0px;padding-top:1px;width:12px;height:13px;border-right:solid 2px #404040;border-bottom:solid 2px #404040;border-left:solid 2px #f0f0f0;border-top:solid 2px #f0f0f0";
var S="padding-left:1px;padding-top:3px;width:12px;height:13px;border:solid 1px #808080";
var W="&#9660;";
var q=null;
var R=null;
var AL=null;
var AJ=false;
var Ax=0;
var P=null;
var Aw=0;
var Ad=null;
var Aq=null;
var Au=null;
String.format=function(){var AO=null;
if(arguments.length!=0){AO=arguments[0];
for(var AN=1;
AN<arguments.length;
AN++){var AM=new RegExp("\\{"+(AN-1)+"\\}","gm");
AO=AO.replace(AM,arguments[AN])
}}return AO
};
function L(AN){var AM=null;
if(AN){if(AN.substr(-2,2)=="px"){AM=AN.substr(0,(AN.length-2))
}}return AM
}function Am(AN,AM){var AO=(AN.outerWidth()-AN.width());
AN.width(AM-AO)
}function AB(AO,AN){var AM=(AO.outerHeight()-AO.height());
AO.height(AN-AM)
}function m(AO,AP){var AM=AP.split(";");
if(AM.length>0){for(var AN=0;
AN<AM.length;
AN++){var AQ=AM[AN];
var AR=AQ.split(":");
AO.css(AR[0],AR[1])
}}}function U(AN){var AM=new Object();
AM.width=0;
AM.height=0;
sizingImageJQuery=jQuery("<img style='border:none;margin:0;padding:0;'></img>");
sizingImageJQuery.attr("src",AN);
s.append(sizingImageJQuery);
AM.width=sizingImageJQuery.width();
AM.height=sizingImageJQuery.height();
sizingImageJQuery.remove();
return AM
}function M(AN){var AM=null;
var AO=AN.css("background-image");
AO=AO.replace("url(","","gi");
AO=AO.replace('"',"","gi");
AO=AO.replace('"',"","gi");
AO=AO.replace(")","","gi");
if(AO!="none"){AM=U(AO)
}return AM
}function AD(){Ad=M(As);
Aq=M(Aa)
}function f(AM){if(H.comboboxValueContentContainerClass){if(Aq!=null){var AN=Aa.height();
var AP=(AM*AN);
if(Aq.height>AP){var AO=String.format("0px -{0}px",AP);
Aa.css("background-position",AO)
}}}}function Z(AM){if(H.comboboxDropDownButtonClass){if(Ad!=null){var AO=As.width();
var AQ=(AM*AO);
if(Ad.width>AQ){var AP=String.format("-{0}px 0px",AQ);
As.css("background-position",AP)
}}}else{var AN=An;
if(AM==1){AN=S
}m(As,AN)
}}function AA(AM){f(AM);
Z(AM)
}function w(){var AN="";
if(H.comboboxValueContentContainerClass){AN=String.format("<div class='{0}' style='{1}'></div>",H.comboboxValueContentContainerClass,Al)
}else{AN=String.format("<div style='{0}'></div>",Al)
}var AM="";
if(H.comboboxValueContentClass){AM=String.format("<div class='{0}' style='{1}'></div>",H.comboboxValueContentClass,h)
}else{AM=String.format("<div style='{0}'></div>",h+Ae)
}var AO="";
if(H.comboboxDropDownButtonClass){AO=String.format("<div class='{1}' style='{0}'></div>",Ar,H.comboboxDropDownButtonClass)
}else{AO=String.format("<div style='{0}'>{1}</div>",(Ar+n),W)
}d=jQuery(AM);
As=jQuery(AO);
Aa=jQuery(AN);
Aa.appendTo(s);
d.appendTo(Aa);
As.appendTo(Aa);
AD();
Au=L(d.css("max-height"));
AA(0)
}function Ay(AN){var AP="";
var AM=null;
var AS="";
var AO="";
var AR=null;
var AQ="";
var AT="option";
var AU=AN[0];
if(AU.title){if(AU.title!=""){AO=AU.title
}}if(AN.is("option")){if(AU.dataText){AS=AU.dataText
}else{AS=AN.text()
}AR=AN.val();
if(H.comboboxDropDownItemClass){AM=H.comboboxDropDownItemClass;
AQ=Av
}else{AQ=(Av+Ac)
}if(AM){AP=String.format("<li style='{0}' class='{1}'>{2}</li>",AQ,AM,AS)
}else{AP=String.format("<li style='{0}'>{1}</li>",AQ,AS)
}}else{if(AN[0].dataText){AS=AN[0].dataText
}else{AS=AN.attr("label")
}AR=AN.attr("class");
AT="optgroup";
if(H.comboboxDropDownGroupItemHeaderClass){AM=H.comboboxDropDownGroupItemHeaderClass;
AQ=AC
}else{AQ=(AC+AH)
}if(AM){AP=String.format("<li><span style='{0}' class='{1}'>{2}</span></li>",AQ,AM,AS)
}else{AP=String.format("<li><span style='{0}'>{1}</span></li>",AQ,AS)
}}var AV=jQuery(AP);
AV.css("display","inline");
AV[0].dataText=AS;
AV[0].dataValue=AR;
AV[0].dataType=AT;
if(AO==""){AO=AS
}AV[0].title=AO;
return AV
}function AF(AM,AN){AN.each(function(){var AR=jQuery(this);
var AT=Ay(AR);
AM.append(AT);
var AO=AT.offset().left;
AO-=P.left;
if(AO<0){AO=0
}var AP=(AO+AT.outerWidth());
if(AP>Ax){Ax=AP
}m(AT,Av);
if(AR.is("optgroup")){var AQ="";
if(H.comboboxDropDownGroupItemContainerClass){AQ=String.format("<ul style='{0}' class='{1}'></ul>",a,H.comboboxDropDownGroupItemContainerClass)
}else{AQ=String.format("<ul style='{0}'></ul>",(a+l))
}var AS=jQuery(AQ);
AT.append(AS);
AF(AS,AR.children())
}})
}function x(){var AO=V.children();
q=null;
AL=null;
if(Ai){Ai.empty()
}else{var AN="";
if(H.comboboxDropDownClass){AN=String.format("<ul class='{0}' style='{1}'></ul>",H.comboboxDropDownClass,Ah)
}else{AN=String.format("<ul style='{0}'></ul>",(Ah+O))
}Ai=jQuery(AN);
Ai.appendTo(s);
Ai.attr("tabIndex",C.tabIndex)
}if(AO.length>0){Ax=0;
P=Ai.offset();
AF(Ai,AO)
}var AP=L(Ai.css("max-height"));
if(AP){Y=AP
}var AM=Ai.height();
if(AM>Y){Ai.height(Y)
}Aw=Ai.height()
}function Ak(){var AM=s.outerWidth()-6;
if(AM<Ax){AM=Ax
}Ai.width(AM)
}function p(){d.height("auto");
var AM=d.outerHeight();
var AN=Aa.height();
if(Au){if(Au<AM){AM=Au;
d.height(AM)
}}var AO=((AN-AM)/2);
if(AO<0){AO=0
}d.css("top",AO)
}function z(){s.width(C.width);
var AN=s.width();
Am(Aa,AN);
var AO=(Aa.width()-As.outerWidth());
Am(d,AO);
var AQ=As.outerHeight();
AB(Aa,AQ);
Ai.css("position","absolute");
Ai.css("z-index","20000");
Ak();
var AP=Ai.offset().left;
var AM=(AP-(s.outerWidth()-s.width()));
Ai.css("left",AM+1);
Ai.hide()
}function T(){var AN=false;
var AP=V[0];
var AM;
if(AP.length>0){var AO=jQuery("li[@dataValue='"+V.val()+"']",Ai);
d.html(AO[0].dataText);
d.attr("title",AO[0].title);
p();
if(AL){if(AL!=V.val()){AN=true
}}AL=V.val();
if(AN){if(D.combobox.onChange){D.combobox.onChange()
}}if(q){Af(q,false)
}q=AO;
Af(q,true)
}}function Ao(AM){if(AM){if(Aw>=Y){var AN=AM.offset();
if((AN.top>Aw)||(AN.top<=AM.outerHeight())){AM[0].scrollIntoView()
}}}}function Af(AM,AN){if(AM){if(H.comboboxDropDownItemHoverClass){if(AN){AM.addClass(H.comboboxDropDownItemHoverClass)
}else{AM.removeClass(H.comboboxDropDownItemHoverClass)
}}else{if(AN){AM.css("background","#000");
AM.css("color","#fff")
}else{AM.css("background","");
AM.css("color","")
}}}}function o(){var AM="";
if(H.comboboxContainerClass){AM=String.format("<div class='{0}' style='{1}'></div>",H.comboboxContainerClass,b)
}else{AM=String.format("<div style='{0}' style='{1}'></div>",c,b)
}s=jQuery(AM);
V.before(s);
s.append(V);
V.hide();
s.attr("tabIndex",C.tabIndex)
}this.initialise=function(){o();
w();
x();
z();
Ab();
T()
};
function j(){Ai.focus()
}function t(){s.focus();
k()
}function e(AM){Ai.animate({height:"toggle",top:AM},C.animationSpeed,j)
}function Ag(AM){Ai.animate({height:"toggle",opacity:"toggle",top:AM},C.animationSpeed,t)
}function AI(AM){Ai.animate({height:"toggle",opacity:"toggle"},C.animationSpeed,AM)
}function At(){var AS=s.position().top;
var AN=Ai.outerHeight();
var AO=(AS+s.outerHeight());
var AQ=jQuery(window).scrollTop();
var AM=jQuery(window).height();
var AP=(AM-(AO-AQ));
var AR;
AR=AO;
AJ=false;
if(AP<AN){if((AS-AQ)>AN){AR=(AS-AN);
AJ=true
}}return AR
}function r(AO){if(AO){if(Ai.is(":hidden")){N();
Af(R,false);
Af(q,true);
AA(1);
var AM=At();
Ai.css("top",AM);
Ai.css("left",s.offset().left);
switch(C.animationType){case"slide":if(AJ){var AP=s.position().top;
var AN=s.outerHeight();
Ai.css("top",(AP-AN));
e(AM)
}else{AI(j)
}break;
case"fade":Ai.fadeIn(C.animationSpeed,j);
break;
default:Ai.show(1,j)
}}}else{if(Ai.is(":visible")){AA(0);
switch(C.animationType){case"slide":if(AJ){AP=s.position().top;
dropdownListHeight=Ai.height();
Ag(AP-s.outerHeight())
}else{AI(t)
}break;
case"fade":Ai.fadeOut(C.animationSpeed,t);
break;
default:Ai.hide();
t()
}}}}function AK(AO,AN){var AM=V[0];
if(AN==null){AM.selectedIndex=AO
}else{AM.value=AN
}if(AM.onchange){AM.onchange()
}T()
}function u(AQ,AS){var AR=V[0];
var AM=AR.selectedIndex;
var AN=-1;
var AO=AR.length-1;
if(AS!=""){var AP=false;
for(i=AM+1;
i<AR.length;
i++){if(AR.options[i].text.charAt(0)==String.fromCharCode(AS)){AN=i;
AP=true;
break
}}if(!AP){for(i=0;
i<AM;
i++){if(AR.options[i].text.charAt(0)==String.fromCharCode(AS)){AN=i;
AP=true;
break
}}}if(!AP){return
}}else{switch(AQ){case":next":AN=AM+1;
if(AN>AO){AN=AO
}break;
case":previous":AN=AM-1;
if(AN<0){AN=0
}break;
case":first":AN=0;
break;
case":last":AN=AO;
break
}}AK(AN,null)
}function v(){return Ai.is(":visible")
}function g(){jQuery("li",Ai).not("ul").not("span").not("[@dataType='optgroup']").each(function(){var AM=jQuery(this);
AM.click(function(AN){AN.stopPropagation();
Aj(AM)
});
AM.mouseover(function(){AE(AM)
});
AM.mouseout(function(){Ap(AM)
})
})
}function AG(){Ai.blur(function(AM){AM.stopPropagation();
Q()
})
}function k(){s.click(function(){X()
})
}function N(){s.unbind("click")
}function Ab(){s.keydown(function(AM){AM.preventDefault();
Az(AM)
});
k();
AG();
g()
}function X(){if(Ai.is(":hidden")){r(true)
}else{r(false)
}}function Q(){if(Ai.is(":visible")){r(false)
}}function Aj(AM){AK(null,AM[0].dataValue);
r(false)
}function AE(AM){Af(q,false);
Af(R,false);
Af(AM,true)
}function Ap(AM){R=AM
}function Az(AM){if(AM.which>=65&&AM.which<=90){u("",AM.which)
}else{switch(AM.which){case 13:$("#aspnetForm").submit();
break;
case 32:X();
break;
case 33:case 36:u(":first","");
break;
case 34:case 35:u(":last","");
break;
case 37:u(":previous","");
break;
case 38:if(AM.altKey){r(!(v()))
}else{u(":previous","")
}break;
case 39:u(":next","");
break;
case 40:if(AM.altKey){r(!(v()))
}else{u(":next","")
}break;
case 27:r(false);
break;
case 9:Ai.blur();
jQuery(window)[0].focus();
break
}}}this.updateSelection=function(){T()
};
this.update=function(){x();
Ak();
g();
T()
};
this.remove=function(){s.before(V);
s.remove();
delete V[0].internalCombobox;
V[0].internalCombobox=null;
V.show()
};
this.addRange=function(AO){if(AO){var AP=V[0].options;
var AM=AP.length;
for(optionIndex in AO){var AN=AO[optionIndex];
var AQ=document.createElement("option");
AQ.value=AN.value;
AQ.text=AN.text;
AQ.dataText=AN.text;
if(AN.title){AQ.title=AN.title
}AP[AM+optionIndex]=AQ
}V.combobox.update()
}}
}})
};