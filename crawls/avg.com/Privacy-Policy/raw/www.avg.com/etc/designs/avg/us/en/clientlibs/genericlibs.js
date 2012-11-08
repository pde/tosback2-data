jQuery("document").ready(function(B){var A,C=0;
B("body .erbox").each(function(D){if(D%2){C=B(this).height();
A=B(B(".erbox").get(D-1)).height();
if(C>A){B(B(".erbox").get(D-1)).height(C)
}else{B(this).height(A)
}}})
});
(function(A){A(document).ready(function(){B()
});
function B(){A(".productsystemreq table").addClass("intab");
A(".productsystemreq table tr th:first-child, .productsystemreq table tr td:first-child").addClass("tleft");
var C=A(".productsystemreq table > tbody > tr:first > th, .productsystemreq table > tr:first > th").length;
A(".productsystemreq .table-container table").addClass("cols-"+C);
A(".productsystemreq table").each(function(){var F=A(this).find("th").length;
if(F===0){A("tr:even",this).addClass("dark")
}else{A("tr",this).each(function(){A(".productsystemreq table tr:has(th)").addClass("tableHeader");
A(".productsystemreq table tr.tableHeader").next("tr").addClass("dark");
A(".productsystemreq table tr.dark").next("tr").addClass("normal");
A(".productsystemreq table tr.normal").next("tr").addClass("dark");
A(".productsystemreq table tr:has(th)").removeClass("dark");
A(".productsystemreq table tr:has(th)").removeClass("normal")
})
}});
var E;
var D=0;
A(".productsystemreq table.intab tr td").each(function(){E=A("td",A(this).parent()).length;
if(D<E){D=E
}});
A(".productsystemreq table.intab").addClass("cols-"+D)
}})(jQuery);
(function(A){A.fn.accordion=function(C){if(C===undefined){C=A(".tabs-content > div:has(dl.accordion)")
}A(".accordion dd").hide();
var B=A(C);
B.css("cursor","pointer");
B.find(".more").show();
B.find(".close").hide();
B.hover(function(){A(this).find(".more").addClass("hover");
A(this).find(".close").addClass("hover")
},function(){A(this).find(".more").removeClass("hover");
A(this).find(".close").removeClass("hover")
})
};
A(function(){A(".productfeature .block").each(function(){A(this).click(function(){A(".accordion dd",this).slideToggle("fast");
A(".close",this).toggle();
A(".more",this).toggle()
})
});
A(".productfeature .icon").click(function(){A(this).next("div.block").find(".accordion dd").slideToggle("fast");
A(this).next("div.block").find(".close").toggle();
A(this).next("div.block").find(".more").toggle()
})
})
})(jQuery);
(function(A){A(document).ready(function(){A("#comparehomeProduct table th").first().addClass("firstRow");
A("#comparisionDiv table td").addClass("greyBg");
A('#comparisionDiv table tbody tr th:contains("Console")').css("text-align","center");
A(".product-accordion").bind("click",function(){if(A(this).hasClass("opened")){A(".morecontent",this).slideUp("fast");
A(".close",this).hide();
A(".more",this).show();
A(this).removeClass("opened")
}else{A(".morecontent",this).slideDown("fast");
A(".close",this).show();
A(".more",this).hide();
A(this).addClass("opened")
}})
})
})(jQuery);
jQuery(document).ready(function(E){E(".secondaryNav").each(function(){if(E(".subColumn",this).size()==0){E(this).addClass("hasnosub")
}});
if(E("div#maincontainer").length>0){var D=E("body").width()-E("div#maincontainer").offset().left;
var C,A,B;
E(".menu-section").each(function(){C=E(this);
C.css("display","block");
A=0;
C.width(4000);
E(".menuColumn",E(this)).each(function(){A=A+E(this).width()
});
C.width(A);
if((C.parent().offset().left+C.width())>D){B=(C.parent().offset().left+C.width())-D;
E(this).css("left",-B)
}C.css("display","")
});
E("#navigation #menu>li").css("position","relative");
E("#navigation #menu").css("position","relative")
}});
/*
 * jQuery UI 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(A,D){A.ui=A.ui||{};
if(A.ui.version){return 
}A.extend(A.ui,{version:"1.8.13",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
A.fn.extend({_focus:A.fn.focus,focus:function(E,F){return typeof E==="number"?this.each(function(){var G=this;
setTimeout(function(){A(G).focus();
if(F){F.call(G)
}},E)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var E;
if((A.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){E=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(A.curCSS(this,"position",1))&&(/(auto|scroll)/).test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0)
}else{E=this.parents().filter(function(){return(/(auto|scroll)/).test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!E.length?A(document):E
},zIndex:function(H){if(H!==D){return this.css("zIndex",H)
}if(this.length){var F=A(this[0]),E,G;
while(F.length&&F[0]!==document){E=F.css("position");
if(E==="absolute"||E==="relative"||E==="fixed"){G=parseInt(F.css("zIndex"),10);
if(!isNaN(G)&&G!==0){return G
}}F=F.parent()
}}return 0
},disableSelection:function(){return this.bind((A.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(E){E.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
A.each(["Width","Height"],function(G,E){var F=E==="Width"?["Left","Right"]:["Top","Bottom"],H=E.toLowerCase(),J={innerWidth:A.fn.innerWidth,innerHeight:A.fn.innerHeight,outerWidth:A.fn.outerWidth,outerHeight:A.fn.outerHeight};
function I(M,L,K,N){A.each(F,function(){L-=parseFloat(A.curCSS(M,"padding"+this,true))||0;
if(K){L-=parseFloat(A.curCSS(M,"border"+this+"Width",true))||0
}if(N){L-=parseFloat(A.curCSS(M,"margin"+this,true))||0
}});
return L
}A.fn["inner"+E]=function(K){if(K===D){return J["inner"+E].call(this)
}return this.each(function(){A(this).css(H,I(this,K)+"px")
})
};
A.fn["outer"+E]=function(K,L){if(typeof K!=="number"){return J["outer"+E].call(this,K)
}return this.each(function(){A(this).css(H,I(this,K,true,L)+"px")
})
}
});
function C(G,E){var J=G.nodeName.toLowerCase();
if("area"===J){var I=G.parentNode,H=I.name,F;
if(!G.href||!H||I.nodeName.toLowerCase()!=="map"){return false
}F=A("img[usemap=#"+H+"]")[0];
return !!F&&B(F)
}return(/input|select|textarea|button|object/.test(J)?!G.disabled:"a"==J?G.href||E:E)&&B(G)
}function B(E){return !A(E).parents().andSelf().filter(function(){return A.curCSS(this,"visibility")==="hidden"||A.expr.filters.hidden(this)
}).length
}A.extend(A.expr[":"],{data:function(G,F,E){return !!A.data(G,E[3])
},focusable:function(E){return C(E,!isNaN(A.attr(E,"tabindex")))
},tabbable:function(G){var E=A.attr(G,"tabindex"),F=isNaN(E);
return(F||E>=0)&&C(G,!F)
}});
A(function(){var E=document.body,F=E.appendChild(F=document.createElement("div"));
A.extend(F.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
A.support.minHeight=F.offsetHeight===100;
A.support.selectstart="onselectstart" in F;
E.removeChild(F).style.display="none"
});
A.extend(A.ui,{plugin:{add:function(F,G,I){var H=A.ui[F].prototype;
for(var E in I){H.plugins[E]=H.plugins[E]||[];
H.plugins[E].push([G,I[E]])
}},call:function(E,G,F){var I=E.plugins[G];
if(!I||!E.element[0].parentNode){return 
}for(var H=0;
H<I.length;
H++){if(E.options[I[H][0]]){I[H][1].apply(E.element,F)
}}}},contains:function(F,E){return document.compareDocumentPosition?F.compareDocumentPosition(E)&16:F!==E&&F.contains(E)
},hasScroll:function(H,F){if(A(H).css("overflow")==="hidden"){return false
}var E=(F&&F==="left")?"scrollLeft":"scrollTop",G=false;
if(H[E]>0){return true
}H[E]=1;
G=(H[E]>0);
H[E]=0;
return G
},isOverAxis:function(F,E,G){return(F>E)&&(F<(E+G))
},isOver:function(J,F,I,H,E,G){return A.ui.isOverAxis(J,I,E)&&A.ui.isOverAxis(F,H,G)
}})
})(jQuery);
(function(B,A){if(B.cleanData){var D=B.cleanData;
B.cleanData=function(E){for(var H=0,G;
(G=E[H])!=null;
H++){try{B(G).triggerHandler("remove")
}catch(F){}}D(E)
}
}else{var C=B.fn.remove;
B.fn.remove=function(E,F){return this.each(function(){return F||(!E||B.filter(E,[this]).length)&&B("*",this).add([this]).each(function(){try{B(this).triggerHandler("remove")
}catch(G){}}),C.call(B(this),E,F)
})
}
}B.widget=function(E,J,I){var H=E.split(".")[0],G;
E=E.split(".")[1],G=H+"-"+E,I||(I=J,J=B.Widget),B.expr[":"][G]=function(K){return !!B.data(K,E)
},B[H]=B[H]||{},B[H][E]=function(L,K){arguments.length&&this._createWidget(L,K)
};
var F=new J;
F.options=B.extend(!0,{},F.options),B[H][E].prototype=B.extend(!0,F,{namespace:H,widgetName:E,widgetEventPrefix:B[H][E].prototype.widgetEventPrefix||E,widgetBaseClass:G},I),B.widget.bridge(E,B[H][E])
},B.widget.bridge=function(F,E){B.fn[F]=function(J){var I=typeof J=="string",H=Array.prototype.slice.call(arguments,1),G=this;
return J=!I&&H.length?B.extend.apply(null,[!0,J].concat(H)):J,I&&J.charAt(0)==="_"?G:(I?this.each(function(){var L=B.data(this,F),K=L&&B.isFunction(L[J])?L[J].apply(L,H):L;
if(K!==L&&K!==A){return G=K,!1
}}):this.each(function(){var K=B.data(this,F);
K?K.option(J||{})._init():B.data(this,F,new E(J,this))
}),G)
}
},B.Widget=function(F,E){arguments.length&&this._createWidget(F,E)
},B.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(E,G){B.data(G,this.widgetName,this),this.element=B(G),this.options=B.extend(!0,{},this.options,this._getCreateOptions(),E);
var F=this;
this.element.bind("remove."+this.widgetName,function(){F.destroy()
}),this._create(),this._trigger("create"),this._init()
},_getCreateOptions:function(){return B.metadata&&B.metadata.get(this.element[0])[this.widgetName]
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(G,F){var E=G;
if(arguments.length===0){return B.extend({},this.options)
}if(typeof G=="string"){if(F===A){return this.options[G]
}E={},E[G]=F
}return this._setOptions(E),this
},_setOptions:function(E){var F=this;
return B.each(E,function(H,G){F._setOption(H,G)
}),this
},_setOption:function(F,E){return this.options[F]=E,F==="disabled"&&this.widget()[E?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",E),this
},enable:function(){return this._setOption("disabled",!1)
},disable:function(){return this._setOption("disabled",!0)
},_trigger:function(E,J,I){var H,G,F=this.options[E];
I=I||{},J=B.Event(J),J.type=(E===this.widgetEventPrefix?E:this.widgetEventPrefix+E).toLowerCase(),J.target=this.element[0],G=J.originalEvent;
if(G){for(H in G){H in J||(J[H]=G[H])
}}return this.element.trigger(J,I),!(B.isFunction(F)&&F.call(this.element[0],J,I)===!1||J.isDefaultPrevented())
}}
})(jQuery);
(function(D,F){var C=0,B=0;
function E(){return ++C
}function A(){return ++B
}D.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)
},_setOption:function(G,H){if(G=="selected"){if(this.options.collapsible&&H==this.options.selected){return 
}this.select(H)
}else{this.options[G]=H;
this._tabify()
}},_tabId:function(G){return G.title&&G.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+E()
},_sanitizeSelector:function(G){return G.replace(/:/g,"\\:")
},_cookie:function(){var G=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+A());
return D.cookie.apply(null,[G].concat(D.makeArray(arguments)))
},_ui:function(H,G){return{tab:H,panel:G,index:this.anchors.index(H)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var G=D(this);
G.html(G.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(R){var S=this,I=this.options,H=/^#.+/;
this.list=this.element.find("ol,ul").eq(0);
this.lis=D(" > li:has(a[href])",this.list);
this.anchors=this.lis.map(function(){return D("a",this)[0]
});
this.panels=D([]);
this.anchors.each(function(V,T){var U=D(T).attr("href");
var W=U.split("#")[0],X;
if(W&&(W===location.toString().split("#")[0]||(X=D("base")[0])&&W===X.href)){U=T.hash;
T.href=U
}if(H.test(U)){S.panels=S.panels.add(S.element.find(S._sanitizeSelector(U)))
}else{if(U&&U!=="#"){D.data(T,"href.tabs",U);
D.data(T,"load.tabs",U.replace(/#.*$/,""));
var Z=S._tabId(T);
T.href="#"+Z;
var Y=S.element.find("#"+Z);
if(!Y.length){Y=D(I.panelTemplate).attr("id",Z).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(S.panels[V-1]||S.list);
Y.data("destroy.tabs",true)
}S.panels=S.panels.add(Y)
}else{I.disabled.push(V)
}}});
if(R){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.lis.addClass("ui-state-default ui-corner-top");
this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(I.selected===F){if(location.hash){this.anchors.each(function(U,T){if(T.hash==location.hash){I.selected=U;
return false
}})
}if(typeof I.selected!=="number"&&I.cookie){I.selected=parseInt(S._cookie(),10)
}if(typeof I.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length){I.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}I.selected=I.selected||(this.lis.length?0:-1)
}else{if(I.selected===null){I.selected=-1
}}I.selected=((I.selected>=0&&this.anchors[I.selected])||I.selected<0)?I.selected:0;
I.disabled=D.unique(I.disabled.concat(D.map(this.lis.filter(".ui-state-disabled"),function(U,T){return S.lis.index(U)
}))).sort();
if(D.inArray(I.selected,I.disabled)!=-1){I.disabled.splice(D.inArray(I.selected,I.disabled),1)
}this.panels.addClass("ui-tabs-hide");
this.lis.removeClass("ui-tabs-selected ui-state-active");
if(I.selected>=0&&this.anchors.length){S.element.find(S._sanitizeSelector(S.anchors[I.selected].hash)).removeClass("ui-tabs-hide");
this.lis.eq(I.selected).addClass("ui-tabs-selected ui-state-active");
S.element.queue("tabs",function(){S._trigger("show",null,S._ui(S.anchors[I.selected],S.element.find(S._sanitizeSelector(S.anchors[I.selected].hash))[0]))
});
this.load(I.selected)
}D(window).bind("unload",function(){S.lis.add(S.anchors).unbind(".tabs");
S.lis=S.anchors=S.panels=null
})
}else{I.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}this.element[I.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");
if(I.cookie){this._cookie(I.selected,I.cookie)
}for(var L=0,Q;
(Q=this.lis[L]);
L++){D(Q)[D.inArray(L,I.disabled)!=-1&&!D(Q).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}if(I.cache===false){this.anchors.removeData("cache.tabs")
}this.lis.add(this.anchors).unbind(".tabs");
if(I.event!=="mouseover"){var K=function(U,T){if(T.is(":not(.ui-state-disabled)")){T.addClass("ui-state-"+U)
}};
var N=function(U,T){T.removeClass("ui-state-"+U)
};
this.lis.bind("mouseover.tabs",function(){K("hover",D(this))
});
this.lis.bind("mouseout.tabs",function(){N("hover",D(this))
});
this.anchors.bind("focus.tabs",function(){K("focus",D(this).closest("li"))
});
this.anchors.bind("blur.tabs",function(){N("focus",D(this).closest("li"))
})
}var G,M;
if(I.fx){if(D.isArray(I.fx)){G=I.fx[0];
M=I.fx[1]
}else{G=M=I.fx
}}function J(T,U){T.css("display","");
if(!D.support.opacity&&U.opacity){T[0].style.removeAttribute("filter")
}}var O=M?function(T,U){D(T).closest("li").addClass("ui-tabs-selected ui-state-active");
U.hide().removeClass("ui-tabs-hide").animate(M,M.duration||"normal",function(){J(U,M);
S._trigger("show",null,S._ui(T,U[0]))
})
}:function(T,U){D(T).closest("li").addClass("ui-tabs-selected ui-state-active");
U.removeClass("ui-tabs-hide");
S._trigger("show",null,S._ui(T,U[0]))
};
var P=G?function(U,T){T.animate(G,G.duration||"normal",function(){S.lis.removeClass("ui-tabs-selected ui-state-active");
T.addClass("ui-tabs-hide");
J(T,G);
S.element.dequeue("tabs")
})
}:function(U,T,V){S.lis.removeClass("ui-tabs-selected ui-state-active");
T.addClass("ui-tabs-hide");
S.element.dequeue("tabs")
};
this.anchors.bind(I.event+".tabs",function(){var U=this,W=D(U).closest("li"),T=S.panels.filter(":not(.ui-tabs-hide)"),V=S.element.find(S._sanitizeSelector(U.hash));
if((W.hasClass("ui-tabs-selected")&&!I.collapsible)||W.hasClass("ui-state-disabled")||W.hasClass("ui-state-processing")||S.panels.filter(":animated").length||S._trigger("select",null,S._ui(this,V[0]))===false){this.blur();
return false
}I.selected=S.anchors.index(this);
S.abort();
if(I.collapsible){if(W.hasClass("ui-tabs-selected")){I.selected=-1;
if(I.cookie){S._cookie(I.selected,I.cookie)
}S.element.queue("tabs",function(){P(U,T)
}).dequeue("tabs");
this.blur();
return false
}else{if(!T.length){if(I.cookie){S._cookie(I.selected,I.cookie)
}S.element.queue("tabs",function(){O(U,V)
});
S.load(S.anchors.index(this));
this.blur();
return false
}}}if(I.cookie){S._cookie(I.selected,I.cookie)
}if(V.length){if(T.length){S.element.queue("tabs",function(){P(U,T)
})
}S.element.queue("tabs",function(){O(U,V)
});
S.load(S.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}if(D.browser.msie){this.blur()
}});
this.anchors.bind("click.tabs",function(){return false
})
},_getIndex:function(G){if(typeof G=="string"){G=this.anchors.index(this.anchors.filter("[href$="+G+"]"))
}return G
},destroy:function(){var G=this.options;
this.abort();
this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.anchors.each(function(){var H=D.data(this,"href.tabs");
if(H){this.href=H
}var I=D(this).unbind(".tabs");
D.each(["href","load","cache"],function(J,K){I.removeData(K+".tabs")
})
});
this.lis.unbind(".tabs").add(this.panels).each(function(){if(D.data(this,"destroy.tabs")){D(this).remove()
}else{D(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))
}});
if(G.cookie){this._cookie(null,G.cookie)
}return this
},add:function(J,I,H){if(H===F){H=this.anchors.length
}var G=this,L=this.options,N=D(L.tabTemplate.replace(/#\{href\}/g,J).replace(/#\{label\}/g,I)),M=!J.indexOf("#")?J.replace("#",""):this._tabId(D("a",N)[0]);
N.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var K=G.element.find("#"+M);
if(!K.length){K=D(L.panelTemplate).attr("id",M).data("destroy.tabs",true)
}K.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(H>=this.lis.length){N.appendTo(this.list);
K.appendTo(this.list[0].parentNode)
}else{N.insertBefore(this.lis[H]);
K.insertBefore(this.panels[H])
}L.disabled=D.map(L.disabled,function(P,O){return P>=H?++P:P
});
this._tabify();
if(this.anchors.length==1){L.selected=0;
N.addClass("ui-tabs-selected ui-state-active");
K.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){G._trigger("show",null,G._ui(G.anchors[0],G.panels[0]))
});
this.load(0)
}this._trigger("add",null,this._ui(this.anchors[H],this.panels[H]));
return this
},remove:function(G){G=this._getIndex(G);
var I=this.options,J=this.lis.eq(G).remove(),H=this.panels.eq(G).remove();
if(J.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(G+(G+1<this.anchors.length?1:-1))
}I.disabled=D.map(D.grep(I.disabled,function(L,K){return L!=G
}),function(L,K){return L>=G?--L:L
});
this._tabify();
this._trigger("remove",null,this._ui(J.find("a")[0],H[0]));
return this
},enable:function(G){G=this._getIndex(G);
var H=this.options;
if(D.inArray(G,H.disabled)==-1){return 
}this.lis.eq(G).removeClass("ui-state-disabled");
H.disabled=D.grep(H.disabled,function(J,I){return J!=G
});
this._trigger("enable",null,this._ui(this.anchors[G],this.panels[G]));
return this
},disable:function(H){H=this._getIndex(H);
var G=this,I=this.options;
if(H!=I.selected){this.lis.eq(H).addClass("ui-state-disabled");
I.disabled.push(H);
I.disabled.sort();
this._trigger("disable",null,this._ui(this.anchors[H],this.panels[H]))
}return this
},select:function(G){G=this._getIndex(G);
if(G==-1){if(this.options.collapsible&&this.options.selected!=-1){G=this.options.selected
}else{return this
}}this.anchors.eq(G).trigger(this.options.event+".tabs");
return this
},load:function(J){J=this._getIndex(J);
var H=this,L=this.options,G=this.anchors.eq(J)[0],I=D.data(G,"load.tabs");
this.abort();
if(!I||this.element.queue("tabs").length!==0&&D.data(G,"cache.tabs")){this.element.dequeue("tabs");
return 
}this.lis.eq(J).addClass("ui-state-processing");
if(L.spinner){var K=D("span",G);
K.data("label.tabs",K.html()).html(L.spinner)
}this.xhr=D.ajax(D.extend({},L.ajaxOptions,{url:I,success:function(N,M){H.element.find(H._sanitizeSelector(G.hash)).html(N);
H._cleanup();
if(L.cache){D.data(G,"cache.tabs",true)
}H._trigger("load",null,H._ui(H.anchors[J],H.panels[J]));
try{L.ajaxOptions.success(N,M)
}catch(O){}},error:function(O,M,N){H._cleanup();
H._trigger("load",null,H._ui(H.anchors[J],H.panels[J]));
try{L.ajaxOptions.error(O,M,J,G)
}catch(N){}}}));
H.element.dequeue("tabs");
return this
},abort:function(){this.element.queue([]);
this.panels.stop(false,true);
this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));
if(this.xhr){this.xhr.abort();
delete this.xhr
}this._cleanup();
return this
},url:function(H,G){this.anchors.eq(H).removeData("cache.tabs").data("load.tabs",G);
return this
},length:function(){return this.anchors.length
}});
D.extend(D.ui.tabs,{version:"1.8.13"});
D.extend(D.ui.tabs.prototype,{rotation:null,rotate:function(I,K){var G=this,L=this.options;
var H=G._rotate||(G._rotate=function(M){clearTimeout(G.rotation);
G.rotation=setTimeout(function(){var N=L.selected;
G.select(++N<G.anchors.length?N:0)
},I);
if(M){M.stopPropagation()
}});
var J=G._unrotate||(G._unrotate=!K?function(M){if(M.clientX){G.rotate(null)
}}:function(M){t=L.selected;
H()
});
if(I){this.element.bind("tabsshow",H);
this.anchors.bind(L.event+".tabs",J);
H()
}else{clearTimeout(G.rotation);
this.element.unbind("tabsshow",H);
this.anchors.unbind(L.event+".tabs",J);
delete this._rotate;
delete this._unrotate
}return this
}})
})(jQuery);
jQuery(document).ready(function(A){A(".tabFreeAVG").tabs()
});
(function(A){A(function(){function C(F,G){try{if(A.cq.isAuthor()||window.location.hash=="#debug"){if(typeof console!="undefined"&&typeof console.log!="undefined"){console.log(F);
console.log(G)
}alert(F.name+":\n"+F.message+".\n"+G+".")
}}catch(H){}}try{var D=A.browser.msie?0:250;
function B(F){try{if(window.location.hash.length>0&&A(window.location.hash,F).length>0){window.location=(window.location+"").replace(window.location.hash,"")
}}catch(G){C(G,"Could not remove hash")
}}try{A(".cq-carousel").each(function(){var U=A(this);
var G=+A("var[title='play-delay']",this).text();
if(!G){G=6000
}var J=+A("var[title='transition-time']",this).text();
if(!J){J=1000
}var S=A(".cq-carousel-banners",this);
var N=A(".cq-carousel-banner-switch",this);
var T=N.find("a");
var O=A(".cq-carousel-banner-item",this);
var F=O.outerWidth();
var P=O.filter(":first");
var L=null;
var H=null;
var K=0;
var M=A("a.cq-carousel-control-prev",this);
M.click(function(){if(M.is(".cq-carousel-active")){A(T[(K+T.length-1)%T.length]).click()
}return false
});
var R=A("a.cq-carousel-control-next",this);
R.click(function(){if(R.is(".cq-carousel-active")){A(T[(K+1)%T.length]).click()
}return false
});
if(T.length>1){R.addClass("cq-carousel-active")
}function I(){Q();
if(G>0){H=setInterval(function(){A(T[(K+1)%T.length]).click()
},G)
}}function Q(){if(H!==null){clearInterval(H);
H=null
}}if(D||A.browser.version>6){P.css("left",0)
}else{P.show()
}T.click(function(){var X=A(this);
var V=O.filter(X.attr("href"));
var W=V.prevAll().length;
var Y=(W>K||H!==null)?1:-1;
if(!X.is(".cq-carousel-active")){T.removeClass("cq-carousel-active");
X.addClass("cq-carousel-active");
if(P.is(":animated")){P.stop(true,true);
L.stop(true,true)
}if(D){V.css({left:Y*F}).animate({left:0,opacity:1},J);
P.animate({left:-Y*F,opacity:0},J)
}else{if(A.browser.version>6){V.css({left:Y*F}).animate({left:0},J);
P.animate({left:-Y*F},J)
}else{V.fadeIn();
P.fadeOut()
}}L=P;
P=V;
K=W;
if(K>0){M.addClass("cq-carousel-active")
}else{M.removeClass("cq-carousel-active")
}if(K<T.length-1){R.addClass("cq-carousel-active")
}else{R.removeClass("cq-carousel-active")
}}return false
}).each(function(){var V=A(this);
V.attr("title",V.text())
}).filter(":first").addClass("cq-carousel-active");
I();
U.hover(function(){Q();
M.fadeIn();
R.fadeIn()
},function(){I();
M.fadeOut();
R.fadeOut()
});
B(this)
})
}catch(E){C(E,"Could not initialize the banners")
}}catch(E){C(E,"Init failed")
}})
})(jQuery);
function validatePhone(B){var A="";
var C=B.value.replace(/[\(\)\.\-\ ]/g,"");
if(B.value==""){A="You didn't enter a phone number.\n";
B.style.background="Yellow"
}else{if(isNaN(parseInt(C))){A="The phone number contains illegal characters.\n";
B.style.background="Yellow"
}else{if(!(C.length==10)){A="The phone number is the wrong length. Make sure you included an area code.\n";
B.style.background="Yellow"
}}}alert(A)
}function validateEmail(B){var A=/^([a-zA-Z0-9])([a-zA-Z0-9\._-])*@(([a-zA-Z0-9])+(\.))+([a-zA-Z]{2,4})+$/;
var C=B.value;
if(C.search(A)==-1){alert("Invalid")
}}
/* jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1
}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");
d.remove();
if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);
if(!cl||!ck.createElement){cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close()
}d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)
}cj[a]=e
}return cj[a]
}function ct(a,b){var c={};
f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a
});
return c
}function cs(){cq=b
}function cr(){setTimeout(cs,0);
return cq=f.now()
}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")
}catch(b){}}function ch(){try{return new a.XMLHttpRequest
}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));
var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;
for(g=1;
g<i;
g++){if(g===1){for(h in a.converters){typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h])
}}l=k,k=d[g];
if(k==="*"){k=l
}else{if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];
if(!n){p=b;
for(o in e){j=o.split(" ");
if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];
if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);
break
}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))
}}}return c
}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;
for(i in g){i in d&&(c[g[i]]=d[i])
}while(f[0]==="*"){f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"))
}if(h){for(i in e){if(e[i]&&e[i].test(h)){f.unshift(i);
break
}}}if(f[0] in d){j=f[0]
}else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;
break
}k||(k=i)
}j=j||k
}if(j){j!==f[0]&&f.unshift(j);
return d[j]
}}function b_(a,b,c,d){if(f.isArray(b)){f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)
})
}else{if(!c&&f.type(b)==="object"){for(var e in b){b_(a+"["+e+"]",b[e],c,d)
}}else{d(a,b)
}}}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};
for(d in c){c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d])
}e&&f.extend(!0,a,e)
}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;
var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;
for(;
i<j&&(k||!l);
i++){l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)))
}(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));
return l
}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");
if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;
for(;
e<g;
e++){h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)
}}}
}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;
if(d>0){if(c!=="border"){for(;
e<g;
e+=2){c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0
}}return d+"px"
}d=by(a,b);
if(d<0||d==null){d=a.style[b]
}if(bt.test(d)){return d
}d=parseFloat(d)||0;
if(c){for(;
e<g;
e+=2){d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0)
}}return d+"px"
}function bo(a){var b=c.createElement("div");
bh.appendChild(b),b.innerHTML=a.outerHTML;
return b.firstChild
}function bn(a){var b=(a.nodeName||"").toLowerCase();
b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)
}function bm(a){if(a.type==="checkbox"||a.type==="radio"){a.defaultChecked=a.checked
}}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]
}function bk(a,b){var c;
b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))
}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;
if(i){delete h.handle,h.events={};
for(c in i){for(d=0,e=i[c].length;
d<e;
d++){f.event.add(b,c,i[c][d])
}}}h.data&&(h.data=f.extend({},h.data))
}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a
}function U(a){var b=V.split("|"),c=a.createDocumentFragment();
if(c.createElement){while(b.length){c.createElement(b.pop())
}}return c
}function T(a,b,c){b=b||0;
if(f.isFunction(b)){return f.grep(a,function(a,d){var e=!!b.call(a,d,a);
return e===c
})
}if(b.nodeType){return f.grep(a,function(a,d){return a===b===c
})
}if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1
});
if(O.test(b)){return f.filter(b,d,!c)
}b=f.filter(b,d)
}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c
})
}function S(a){return !a||!a.parentNode||a.parentNode.nodeType===11
}function K(){return !0
}function J(){return !1
}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);
h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())
},0)
}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b])){continue
}if(b!=="toJSON"){return !1
}}return !0
}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();
d=a.getAttribute(e);
if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d
}catch(g){}f.data(a,c,d)
}else{d=b
}}return d
}function h(a){var b=g[a]={},c,d;
a=a.split(/\s+/);
for(c=0,d=a.length;
c<d;
c++){b[a[c]]=!0
}return b
}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")
}catch(a){setTimeout(J,1);
return 
}e.ready()
}}var e=function(a,b){return new e.fn.init(a,b,h)
},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()
},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};
e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;
if(!a){return this
}if(a.nodeType){this.context=this[0]=a,this.length=1;
return this
}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;
return this
}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];
if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);
return e.merge(this,a)
}h=c.getElementById(g[2]);
if(h&&h.parentNode){if(h.id!==g[2]){return f.find(a)
}this.length=1,this[0]=h
}this.context=c,this.selector=a;
return this
}return !d||d.jquery?(d||f).find(a):this.constructor(d).find(a)
}if(e.isFunction(a)){return f.ready(a)
}a.selector!==b&&(this.selector=a.selector,this.context=a.context);
return e.makeArray(a,this)
},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length
},toArray:function(){return F.call(this,0)
},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]
},pushStack:function(a,b,c){var d=this.constructor();
e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");
return d
},each:function(a,b){return e.each(this,a,b)
},ready:function(a){e.bindReady(),A.add(a);
return this
},eq:function(a){a=+a;
return a===-1?this.slice(a):this.slice(a,a+1)
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))
},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)
}))
},end:function(){return this.prevObject||this.constructor(null)
},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;
typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);
for(;
j<k;
j++){if((a=arguments[j])!=null){for(c in a){d=i[c],f=a[c];
if(i===f){continue
}l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)
}}}return i
},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);
return e
},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)
},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body){return setTimeout(e.ready,1)
}e.isReady=!0;
if(a!==!0&&--e.readyWait>0){return 
}A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")
}},bindReady:function(){if(!A){A=e.Callbacks("once memory");
if(c.readyState==="complete"){return setTimeout(e.ready,1)
}if(c.addEventListener){c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1)
}else{if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);
var b=!1;
try{b=a.frameElement==null
}catch(d){}c.documentElement.doScroll&&b&&J()
}}}},isFunction:function(a){return e.type(a)==="function"
},isArray:Array.isArray||function(a){return e.type(a)==="array"
},isWindow:function(a){return a!=null&&a==a.window
},isNumeric:function(a){return !isNaN(parseFloat(a))&&isFinite(a)
},type:function(a){return a==null?String(a):I[C.call(a)]||"object"
},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a)){return !1
}try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf")){return !1
}}catch(c){return !1
}var d;
for(d in a){}return d===b||D.call(a,d)
},isEmptyObject:function(a){for(var b in a){return !1
}return !0
},error:function(a){throw new Error(a)
},parseJSON:function(b){if(typeof b!="string"||!b){return null
}b=e.trim(b);
if(a.JSON&&a.JSON.parse){return a.JSON.parse(b)
}if(n.test(b.replace(o,"@").replace(p,"]").replace(q,""))){return(new Function("return "+b))()
}e.error("Invalid JSON: "+b)
},parseXML:function(c){if(typeof c!="string"||!c){return null
}var d,f;
try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))
}catch(g){d=b
}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);
return d
},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)
})(b)
},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)
},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()
},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);
if(d){if(i){for(f in a){if(c.apply(a[f],d)===!1){break
}}}else{for(;
g<h;
){if(c.apply(a[g++],d)===!1){break
}}}}else{if(i){for(f in a){if(c.call(a[f],f,a[f])===!1){break
}}}else{for(;
g<h;
){if(c.call(a[g],g,a[g++])===!1){break
}}}}return a
},trim:G?function(a){return a==null?"":G.call(a)
}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")
},makeArray:function(a,b){var c=b||[];
if(a!=null){var d=e.type(a);
a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)
}return c
},inArray:function(a,b,c){var d;
if(b){if(H){return H.call(b,a,c)
}d=b.length,c=c?c<0?Math.max(0,d+c):c:0;
for(;
c<d;
c++){if(c in b&&b[c]===a){return c
}}}return -1
},merge:function(a,c){var d=a.length,e=0;
if(typeof c.length=="number"){for(var f=c.length;
e<f;
e++){a[d++]=c[e]
}}else{while(c[e]!==b){a[d++]=c[e++]
}}a.length=d;
return a
},grep:function(a,b,c){var d=[],e;
c=!!c;
for(var f=0,g=a.length;
f<g;
f++){e=!!b(a[f],f),c!==e&&d.push(a[f])
}return d
},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));
if(k){for(;
i<j;
i++){f=c(a[i],i,d),f!=null&&(h[h.length]=f)
}}else{for(g in a){f=c(a[g],g,d),f!=null&&(h[h.length]=f)
}}return h.concat.apply([],h)
},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];
c=a,a=d
}if(!e.isFunction(a)){return b
}var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))
};
g.guid=a.guid=a.guid||g.guid||e.guid++;
return g
},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;
if(d&&typeof d=="object"){for(l in d){e.access(a,c,l,d[l],1,h,f)
}g=1
}else{if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)
}):(c.call(a,f),c=null));
if(c){for(;
l<m;
l++){c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i)
}}g=1
}}return g?a:k?c.call(a):m?c(a[0],d):h
},now:function(){return(new Date).getTime()
},uaMatch:function(a){a=a.toLowerCase();
var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];
return{browser:b[1]||"",version:b[2]||"0"}
},sub:function(){function a(b,c){return new a.fn.init(b,c)
}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));
return e.fn.init.call(this,d,f,b)
},a.fn.init.prototype=a.fn;
var b=a(c);
return a
},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()
}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()
}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())
});
return e
}(),g={};
f.Callbacks=function(a){a=a?g[a]||h(a):{};
var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;
for(d=0,e=b.length;
d<e;
d++){g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)
}},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;
for(;
c&&m<l;
m++){if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;
break
}}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))
},p={add:function(){if(c){var a=c.length;
n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))
}return this
},remove:function(){if(c){var b=arguments,d=0,e=b.length;
for(;
d<e;
d++){for(var f=0;
f<c.length;
f++){if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);
if(a.unique){break
}}}}}return this
},has:function(a){if(c){var b=0,d=c.length;
for(;
b<d;
b++){if(a===c[b]){return !0
}}}return !1
},empty:function(){c=[];
return this
},disable:function(){c=d=e=b;
return this
},disabled:function(){return !c
},lock:function(){d=b,(!e||e===!0)&&p.disable();
return this
},locked:function(){return !d
},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));
return this
},fire:function(){p.fireWith(this,arguments);
return this
},fired:function(){return !!i
}};
return p
};
var i=[].slice;
f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e
},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);
return this
},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);
return this
},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;
f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])
}):i[a](d[e])
})
}).promise()
},promise:function(a){if(a==null){a=h
}else{for(var b in h){a[b]=h[b]
}}return a
}},i=h.promise({}),j;
for(j in g){i[j]=g[j].fire,i[j+"With"]=g[j].fireWith
}i.done(function(){e="resolved"
},c.disable,d.lock).fail(function(){e="rejected"
},b.disable,d.lock),a&&a.call(i,i);
return i
},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)
}
}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)
}
}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();
if(d>1){for(;
c<d;
c++){b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g
}g||j.resolveWith(j,b)
}else{j!==a&&j.resolveWith(j,d?[a]:[])
}return k
}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;
p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];
if(!d||!d.length||!e){return{}
}g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;
try{delete p.test
}catch(r){b.deleteExpando=!1
}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1
}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);
if(p.attachEvent){for(n in {submit:1,change:1,focusin:1}){m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o
}}j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];
!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div><table "+n+"' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))
});
return b
}();
var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;
f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];
return !!a&&!m(a)
},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";
if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b){return 
}n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));
if(typeof c=="object"||typeof c=="function"){e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c)
}g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);
if(o&&!h[c]){return g.events
}k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;
return i
}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;
if(!j[k]){return 
}if(b){d=c?j[k]:j[k].data;
if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));
for(e=0,g=b.length;
e<g;
e++){delete d[b[e]]
}if(!(c?m:f.isEmptyObject)(d)){return 
}}}if(!c){delete j[k].data;
if(!m(j[k])){return 
}}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)
}},_data:function(a,b,c){return f.data(a,b,c,!0)
},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];
if(b){return b!==!0&&a.getAttribute("classid")===b
}}return !0
}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;
if(a===b){if(this.length){m=f.data(j);
if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;
for(i=g.length;
k<i;
k++){h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]))
}f._data(j,"parsedAttrs",!0)
}}return m
}if(typeof a=="object"){return this.each(function(){f.data(this,a)
})
}d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";
return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));
return m===b&&d[1]?this.data(d[0]):m
}d[1]=c,this.each(function(){var b=f(this);
b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)
})
},null,c,arguments.length>1,null,!1)
},removeData:function(a){return this.each(function(){f.removeData(this,a)
})
}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))
},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);
if(b){c=c||"fx";
var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;
e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))
}},queue:function(a,b,c){var d;
if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));
return d||[]
}},dequeue:function(a,b){b=b||"fx";
var c=f.queue(a,b),d=c.shift(),e={};
d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)
},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))
}}),f.fn.extend({queue:function(a,c){var d=2;
typeof a!="string"&&(c=a,a="fx",d--);
if(arguments.length<d){return f.queue(this[0],a)
}return c===b?this:this.each(function(){var b=f.queue(this,a,c);
a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)
})
},dequeue:function(a){return this.each(function(){f.dequeue(this,a)
})
},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";
return this.queue(b,function(b,c){var d=setTimeout(b,a);
c.stop=function(){clearTimeout(d)
}
})
},clearQueue:function(a){return this.queue(a||"fx",[])
},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])
}typeof a!="string"&&(c=a,a=b),a=a||"fx";
var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;
while(g--){if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0)){h++,l.add(m)
}}m();
return d.promise(c)
}});
var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;
f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)
},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)
})
},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)
},removeProp:function(a){a=f.propFix[a]||a;
return this.each(function(){try{this[a]=b,delete this[a]
}catch(c){}})
},addClass:function(a){var b,c,d,e,g,h,i;
if(f.isFunction(a)){return this.each(function(b){f(this).addClass(a.call(this,b,this.className))
})
}if(a&&typeof a=="string"){b=a.split(p);
for(c=0,d=this.length;
c<d;
c++){e=this[c];
if(e.nodeType===1){if(!e.className&&b.length===1){e.className=a
}else{g=" "+e.className+" ";
for(h=0,i=b.length;
h<i;
h++){~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ")
}e.className=f.trim(g)
}}}}return this
},removeClass:function(a){var c,d,e,g,h,i,j;
if(f.isFunction(a)){return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))
})
}if(a&&typeof a=="string"||a===b){c=(a||"").split(p);
for(d=0,e=this.length;
d<e;
d++){g=this[d];
if(g.nodeType===1&&g.className){if(a){h=(" "+g.className+" ").replace(o," ");
for(i=0,j=c.length;
i<j;
i++){h=h.replace(" "+c[i]+" "," ")
}g.className=f.trim(h)
}else{g.className=""
}}}}return this
},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";
if(f.isFunction(a)){return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)
})
}return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);
while(e=j[g++]){i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)
}}else{if(c==="undefined"||c==="boolean"){this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""
}}})
},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;
for(;
c<d;
c++){if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1){return !0
}}return !1
},val:function(a){var c,d,e,g=this[0];
if(!!arguments.length){e=f.isFunction(a);
return this.each(function(d){var g=f(this),h;
if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""
})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];
if(!c||!("set" in c)||c.set(this,h,"value")===b){this.value=h
}}})
}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];
if(c&&"get" in c&&(d=c.get(g,"value"))!==b){return d
}d=g.value;
return typeof d=="string"?d.replace(q,""):d==null?"":d
}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;
return !b||b.specified?a.value:a.text
}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";
if(g<0){return null
}c=j?g:0,d=j?g+1:i.length;
for(;
c<d;
c++){e=i[c];
if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();
if(j){return b
}h.push(b)
}}if(j&&!h.length&&i.length){return f(i[g]).val()
}return h
},set:function(a,b){var c=f.makeArray(b);
f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0
}),c.length||(a.selectedIndex=-1);
return c
}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;
if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn){return f(a)[c](d)
}if(typeof a.getAttribute=="undefined"){return f.prop(a,c,d)
}i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));
if(d!==b){if(d===null){f.removeAttr(a,c);
return 
}if(h&&"set" in h&&i&&(g=h.set(a,d,c))!==b){return g
}a.setAttribute(c,""+d);
return d
}if(h&&"get" in h&&i&&(g=h.get(a,c))!==null){return g
}g=a.getAttribute(c);
return g===null?b:g
}},removeAttr:function(a,b){var c,d,e,g,h,i=0;
if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;
for(;
i<g;
i++){e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))
}}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode){f.error("type property can't be changed")
}else{if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;
a.setAttribute("type",b),c&&(a.value=c);
return b
}}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button")){return w.get(a,b)
}return b in a?a.value:null
},set:function(a,b,c){if(w&&f.nodeName(a,"button")){return w.set(a,b,c)
}a.value=b
}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;
if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);
return d!==b?g&&"set" in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get" in g&&(e=g.get(a,c))!==null?e:a[c]
}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");
return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b
}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);
return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b
},set:function(a,b,c){var d;
b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));
return c
}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;
d=a.getAttributeNode(c);
return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b
},set:function(a,b,d){var e=a.getAttributeNode(d);
e||(e=c.createAttribute(d),a.setAttributeNode(e));
return e.nodeValue=b+""
}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");
return c
}}})
}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)
}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);
return d===null?b:d
}})
}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b
},set:function(a,b){return a.style.cssText=""+b
}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;
b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);
return null
}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value
}}
}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b)){return a.checked=f.inArray(f(a).val(),b)>=0
}}})
});
var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);
b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));
return b
},H=function(a,b){var c=a.attributes||{};
return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))
},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")
};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;
if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b
},i.elem=a),c=f.trim(I(c)).split(" ");
for(k=0;
k<c.length;
k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];
if(!r){r=j[m]=[],r.delegateCount=0;
if(!s.setup||s.setup.call(a,e,n,i)===!1){a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)
}}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0
}a=null
}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;
if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");
for(h=0;
h<b.length;
h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];
if(!j){for(j in o){f.event.remove(a,j+b[h],c,d,!0)
}continue
}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;
for(n=0;
n<r.length;
n++){s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s))
}r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])
}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))
}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;
if(E.test(h+f.event.triggered)){return 
}h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());
if((!e||f.event.customEvent[h])&&!f.event.global[h]){return 
}c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";
if(!e){j=f.cache;
for(l in j){j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0)
}return 
}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};
if(p.trigger&&p.trigger.apply(e,d)===!1){return 
}r=[[e,p.bindType||h]];
if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;
for(;
m;
m=m.parentNode){r.push([m,s]),n=m
}n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])
}for(l=0;
l<r.length&&!c.isPropagationStopped();
l++){m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault()
}c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));
return c.result
}},dispatch:function(c){c=f.event.fix(c||a.event);
var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;
g[0]=c,c.delegateTarget=this;
if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;
for(m=c.target;
m!=this;
m=m.parentNode||this){if(m.disabled!==!0){p={},r=[],n[0]=m;
for(k=0;
k<e;
k++){s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s)
}r.length&&j.push({elem:m,matches:r})
}}}d.length>e&&j.push({elem:this,matches:d.slice(e)});
for(k=0;
k<j.length&&!c.isPropagationStopped();
k++){q=j[k],c.currentTarget=q.elem;
for(l=0;
l<q.matches.length&&!c.isImmediatePropagationStopped();
l++){s=q.matches[l];
if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace)){c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))
}}}i.postDispatch&&i.postDispatch.call(this,c);
return c.result
}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);
return a
}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;
a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);
return a
}},fix:function(a){if(a[f.expando]){return a
}var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;
a=f.Event(g);
for(d=i.length;
d;
){e=i[--d],a[e]=g[e]
}a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);
return h.filter?h.filter(a,g):a
},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)
},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)
}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});
d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()
}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)
}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)
},f.Event=function(a,b){if(!(this instanceof f.Event)){return new f.Event(a,b)
}a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0
},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;
var a=this.originalEvent;
!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)
},stopPropagation:function(){this.isPropagationStopped=K;
var a=this.originalEvent;
!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()
},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;
if(!d||d!==c&&!f.contains(c,d)){a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b
}return h
}}
}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form")){return !1
}f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;
d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0
}),d._submit_attached=!0)
})
},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))
},teardown:function(){if(f.nodeName(this,"form")){return !1
}f.event.remove(this,"._submit")
}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)
}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))
})
}return !1
}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;
z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)
}),b._change_attached=!0)
})
},handle:function(a){var b=a.target;
if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox"){return a.handleObj.handler.apply(this,arguments)
}},teardown:function(){f.event.remove(this,"._change");
return z.test(this.nodeName)
}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)
};
f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)
},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)
}}
}),f.fn.extend({on:function(a,c,d,e,g){var h,i;
if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);
for(i in a){this.on(i,c,d,a[i],g)
}return this
}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));
if(e===!1){e=J
}else{if(!e){return this
}}g===1&&(h=e,e=function(a){f().off(a);
return h.apply(this,arguments)
},e.guid=h.guid||(h.guid=f.guid++));
return this.each(function(){f.event.add(this,a,e,d,c)
})
},one:function(a,b,c,d){return this.on(a,b,c,d,1)
},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;
f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);
return this
}if(typeof a=="object"){for(var g in a){this.off(g,c,a[g])
}return this
}if(c===!1||typeof c=="function"){d=c,c=b
}d===!1&&(d=J);
return this.each(function(){f.event.remove(this,a,d,c)
})
},bind:function(a,b,c){return this.on(a,null,b,c)
},unbind:function(a,b){return this.off(a,null,b)
},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);
return this
},die:function(a,b){f(this.context).off(a,this.selector||"**",b);
return this
},delegate:function(a,b,c,d){return this.on(b,a,c,d)
},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)
},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)
})
},triggerHandler:function(a,b){if(this[0]){return f.event.trigger(a,b,this[0],!0)
}},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;
f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();
return b[e].apply(this,arguments)||!1
};
e.guid=c;
while(d<b.length){b[d++].guid=c
}return this.click(e)
},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)
}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);
return arguments.length>0?this.on(b,null,a,c):this.trigger(b)
},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)
}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;
h<i;
h++){var j=e[h];
if(j){var k=!1;
j=j[a];
while(j){if(j[d]===c){k=e[j.sizset];
break
}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);
if(typeof b!="string"){if(j===b){k=!0;
break
}}else{if(m.filter(b,[j]).length>0){k=j;
break
}}}j=j[a]
}e[h]=k
}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;
h<i;
h++){var j=e[h];
if(j){var k=!1;
j=j[a];
while(j){if(j[d]===c){k=e[j.sizset];
break
}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);
if(j.nodeName.toLowerCase()===b){k=j;
break
}j=j[a]
}e[h]=k
}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;
[0,0].sort(function(){i=!1;
return 0
});
var m=function(b,d,e,f){e=e||[],d=d||c;
var h=d;
if(d.nodeType!==1&&d.nodeType!==9){return[]
}if(!b||typeof b!="string"){return e
}var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;
do{a.exec(""),i=a.exec(x);
if(i){x=i[3],w.push(i[1]);
if(i[2]){l=i[3];
break
}}}while(i);
if(w.length>1&&p.exec(b)){if(w.length===2&&o.relative[w[0]]){j=y(w[0]+w[1],d,f)
}else{j=o.relative[w[0]]?[d]:m(w.shift(),d);
while(w.length){b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)
}}}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);
if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;
while(w.length){q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)
}}else{k=w=[]
}}k||(k=j),k||m.error(q||b);
if(g.call(k)==="[object Array]"){if(!u){e.push.apply(e,k)
}else{if(d&&d.nodeType===1){for(t=0;
k[t]!=null;
t++){k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t])
}}else{for(t=0;
k[t]!=null;
t++){k[t]&&k[t].nodeType===1&&e.push(j[t])
}}}}else{s(k,e)
}l&&(m(l,h,e,f),m.uniqueSort(e));
return e
};
m.uniqueSort=function(a){if(u){h=i,a.sort(u);
if(h){for(var b=1;
b<a.length;
b++){a[b]===a[b-1]&&a.splice(b--,1)
}}}return a
},m.matches=function(a,b){return m(a,null,null,b)
},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0
},m.find=function(a,b,c){var d,e,f,g,h,i;
if(!a){return[]
}for(e=0,f=o.order.length;
e<f;
e++){h=o.order[e];
if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);
if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);
if(d!=null){a=a.replace(o.match[h],"");
break
}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);
return{set:d,expr:a}
},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);
while(a&&c.length){for(h in o.filter){if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);
if(l.substr(l.length-1)==="\\"){continue
}s===r&&(r=[]);
if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);
if(!f){g=i=!0
}else{if(f===!0){continue
}}}if(f){for(n=0;
(j=s[n])!=null;
n++){j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0))
}}if(i!==b){d||(s=r),a=a.replace(o.match[h],"");
if(!g){return[]
}break
}}}if(a===q){if(g==null){m.error(a)
}else{break
}}q=a
}return s
},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)
};
var n=m.getText=function(a){var b,c,d=a.nodeType,e="";
if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string"){return a.textContent
}if(typeof a.innerText=="string"){return a.innerText.replace(k,"")
}for(a=a.firstChild;
a;
a=a.nextSibling){e+=n(a)
}}else{if(d===3||d===4){return a.nodeValue
}}}else{for(b=0;
c=a[b];
b++){c.nodeType!==8&&(e+=n(c))
}}return e
},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")
},type:function(a){return a.getAttribute("type")
}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;
d&&(b=b.toLowerCase());
for(var f=0,g=a.length,h;
f<g;
f++){if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1){}a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b
}}e&&m.filter(b,a,!0)
},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;
if(d&&!l.test(b)){b=b.toLowerCase();
for(;
e<f;
e++){c=a[e];
if(c){var g=c.parentNode;
a[e]=g.nodeName.toLowerCase()===b?g:!1
}}}else{for(;
e<f;
e++){c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b)
}d&&m.filter(b,a,!0)
}},"":function(a,b,c){var d,f=e++,g=x;
typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)
},"~":function(a,b,c){var d,f=e++,g=x;
typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)
}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);
return d&&d.parentNode?[d]:[]
}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);
for(var e=0,f=d.length;
e<f;
e++){d[e].getAttribute("name")===a[1]&&c.push(d[e])
}return c.length===0?null:c
}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined"){return b.getElementsByTagName(a[1])
}}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";
if(f){return a
}for(var g=0,h;
(h=b[g])!=null;
g++){h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1))
}return !1
},ID:function(a){return a[1].replace(j,"")
},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()
},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");
var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);
a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0
}else{a[2]&&m.error(a[0])
}a[0]=e++;
return a
},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");
!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");
return a
},PSEUDO:function(b,c,d,e,f){if(b[1]==="not"){if((a.exec(b[3])||"").length>1||/^\w/.test(b[3])){b[3]=m(b[3],null,null,c)
}else{var g=m.filter(b[3],c,d,!0^f);
d||e.push.apply(e,g);
return !1
}}else{if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0])){return !0
}}return b
},POS:function(a){a.unshift(!0);
return a
}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"
},disabled:function(a){return a.disabled===!0
},checked:function(a){return a.checked===!0
},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;
return a.selected===!0
},parent:function(a){return !!a.firstChild
},empty:function(a){return !a.firstChild
},has:function(a,b,c){return !!m(c[3],a).length
},header:function(a){return/h\d/i.test(a.nodeName)
},text:function(a){var b=a.getAttribute("type"),c=a.type;
return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)
},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type
},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type
},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type
},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type
},submit:function(a){var b=a.nodeName.toLowerCase();
return(b==="input"||b==="button")&&"submit"===a.type
},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type
},reset:function(a){var b=a.nodeName.toLowerCase();
return(b==="input"||b==="button")&&"reset"===a.type
},button:function(a){var b=a.nodeName.toLowerCase();
return b==="input"&&"button"===a.type||b==="button"
},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)
},focus:function(a){return a===a.ownerDocument.activeElement
}},setFilters:{first:function(a,b){return b===0
},last:function(a,b,c,d){return b===d.length-1
},even:function(a,b){return b%2===0
},odd:function(a,b){return b%2===1
},lt:function(a,b,c){return b<c[3]-0
},gt:function(a,b,c){return b>c[3]-0
},nth:function(a,b,c){return c[3]-0===b
},eq:function(a,b,c){return c[3]-0===b
}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];
if(f){return f(a,c,b,d)
}if(e==="contains"){return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0
}if(e==="not"){var g=b[3];
for(var h=0,i=g.length;
h<i;
h++){if(g[h]===a){return !1
}}return !0
}m.error(e)
},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;
switch(k){case"only":case"first":while(l=l.previousSibling){if(l.nodeType===1){return !1
}}if(k==="first"){return !0
}l=a;
case"last":while(l=l.nextSibling){if(l.nodeType===1){return !1
}}return !0;
case"nth":c=b[2],e=b[3];
if(c===1&&e===0){return !0
}f=b[0],g=a.parentNode;
if(g&&(g[d]!==f||!a.nodeIndex)){i=0;
for(l=g.firstChild;
l;
l=l.nextSibling){l.nodeType===1&&(l.nodeIndex=++i)
}g[d]=f
}j=a.nodeIndex-e;
return c===0?j===0:j%c===0&&j/c>=0
}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b
},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b
},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1
},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];
return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1
},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];
if(f){return f(a,c,b,d)
}}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)
};
for(var r in o.match){o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q))
}o.match.globalPOS=p;
var s=function(a,b){a=Array.prototype.slice.call(a,0);
if(b){b.push.apply(b,a);
return b
}return a
};
try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType
}catch(t){s=function(a,b){var c=0,d=b||[];
if(g.call(a)==="[object Array]"){Array.prototype.push.apply(d,a)
}else{if(typeof a.length=="number"){for(var e=a.length;
c<e;
c++){d.push(a[c])
}}else{for(;
a[c];
c++){d.push(a[c])
}}}return d
}
}var u,v;
c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;
return 0
}if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1
}return a.compareDocumentPosition(b)&4?-1:1
}:(u=function(a,b){if(a===b){h=!0;
return 0
}if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex
}var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;
if(g===i){return v(a,b)
}if(!g){return -1
}if(!i){return 1
}while(j){e.unshift(j),j=j.parentNode
}j=i;
while(j){f.unshift(j),j=j.parentNode
}c=e.length,d=f.length;
for(var k=0;
k<c&&k<d;
k++){if(e[k]!==f[k]){return v(e[k],f[k])
}}return k===c?v(a,f[k],-1):v(e[k],b,1)
},v=function(a,b,c){if(a===b){return c
}var d=a.nextSibling;
while(d){if(d===b){return -1
}d=d.nextSibling
}return 1
}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;
a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);
return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]
}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");
return a.nodeType===1&&c&&c.nodeValue===b
}),e.removeChild(a),e=a=null
}(),function(){var a=c.createElement("div");
a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);
if(a[1]==="*"){var d=[];
for(var e=0;
c[e];
e++){c[e].nodeType===1&&d.push(c[e])
}c=d
}return c
}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)
}),a=null
}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";
b.innerHTML="<p class='TEST'></p>";
if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;
if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1]){return s(e.getElementsByTagName(b),f)
}if(h[2]&&o.find.CLASS&&e.getElementsByClassName){return s(e.getElementsByClassName(h[2]),f)
}}if(e.nodeType===9){if(b==="body"&&e.body){return s([e.body],f)
}if(h&&h[3]){var i=e.getElementById(h[3]);
if(!i||!i.parentNode){return s([],f)
}if(i.id===h[3]){return s([i],f)
}}try{return s(e.querySelectorAll(b),f)
}catch(j){}}else{if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);
l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);
try{if(!q||p){return s(e.querySelectorAll("[id='"+n+"'] "+b),f)
}}catch(r){}finally{l||k.removeAttribute("id")
}}}}return a(b,e,f,g)
};
for(var e in a){m[e]=a[e]
}b=null
}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;
if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;
try{b.call(c.documentElement,"[test!='']:sizzle")
}catch(f){e=!0
}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!m.isXML(a)){try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);
if(f||!d||a.document&&a.document.nodeType!==11){return f
}}}catch(g){}}return m(c,null,null,[a]).length>0
}
}}(),function(){var a=c.createElement("div");
a.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";
if(a.getElementsByClassName("e").length===1){return 
}o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c){return b.getElementsByClassName(a[1])
}},a=null
}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)
}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16)
}:m.contains=function(){return !1
},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;
return b?b.nodeName!=="HTML":!1
};
var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;
while(d=o.match.PSEUDO.exec(a)){f+=d[0],a=a.replace(o.match.PSEUDO,"")
}a=o.relative[a]?a+"*":a;
for(var h=0,i=g.length;
h<i;
h++){m(a,g[h],e,c)
}return m.filter(f,e)
};
m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains
}();
var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};
f.fn.extend({find:function(a){var b=this,c,d;
if(typeof a!="string"){return f(a).filter(function(){for(c=0,d=b.length;
c<d;
c++){if(f.contains(b[c],this)){return !0
}}})
}var e=this.pushStack("","find",a),g,h,i;
for(c=0,d=this.length;
c<d;
c++){g=e.length,f.find(a,this[c],e);
if(c>0){for(h=g;
h<e.length;
h++){for(i=0;
i<g;
i++){if(e[i]===e[h]){e.splice(h--,1);
break
}}}}}return e
},has:function(a){var b=f(a);
return this.filter(function(){for(var a=0,c=b.length;
a<c;
a++){if(f.contains(this,b[a])){return !0
}}})
},not:function(a){return this.pushStack(T(this,a,!1),"not",a)
},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)
},is:function(a){return !!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)
},closest:function(a,b){var c=[],d,e,g=this[0];
if(f.isArray(a)){var h=1;
while(g&&g.ownerDocument&&g!==b){for(d=0;
d<a.length;
d++){f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h})
}g=g.parentNode,h++
}return c
}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;
for(d=0,e=this.length;
d<e;
d++){g=this[d];
while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);
break
}g=g.parentNode;
if(!g||!g.ownerDocument||g===b||g.nodeType===11){break
}}}c=c.length>1?f.unique(c):c;
return this.pushStack(c,"closest",a)
},index:function(a){if(!a){return this[0]&&this[0].parentNode?this.prevAll().length:-1
}if(typeof a=="string"){return f.inArray(this[0],f(a))
}return f.inArray(a.jquery?a[0]:a,this)
},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);
return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))
},andSelf:function(){return this.add(this.prevObject)
}}),f.each({parent:function(a){var b=a.parentNode;
return b&&b.nodeType!==11?b:null
},parents:function(a){return f.dir(a,"parentNode")
},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)
},next:function(a){return f.nth(a,2,"nextSibling")
},prev:function(a){return f.nth(a,2,"previousSibling")
},nextAll:function(a){return f.dir(a,"nextSibling")
},prevAll:function(a){return f.dir(a,"previousSibling")
},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)
},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)
},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)
},children:function(a){return f.sibling(a.firstChild)
},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)
}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);
L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());
return this.pushStack(e,a,P.call(arguments).join(","))
}
}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");
return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)
},dir:function(a,c,d){var e=[],g=a[c];
while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d))){g.nodeType===1&&e.push(g),g=g[c]
}return e
},nth:function(a,b,c,d){b=b||1;
var e=0;
for(;
a;
a=a[c]){if(a.nodeType===1&&++e===b){break
}}return a
},sibling:function(a,b){var c=[];
for(;
a;
a=a.nextSibling){a.nodeType===1&&a!==b&&c.push(a)
}return c
}});
var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);
bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))
},null,a,arguments.length)
},wrapAll:function(a){if(f.isFunction(a)){return this.each(function(b){f(this).wrapAll(a.call(this,b))
})
}if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);
this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;
while(a.firstChild&&a.firstChild.nodeType===1){a=a.firstChild
}return a
}).append(this)
}return this
},wrapInner:function(a){if(f.isFunction(a)){return this.each(function(b){f(this).wrapInner(a.call(this,b))
})
}return this.each(function(){var b=f(this),c=b.contents();
c.length?c.wrapAll(a):b.append(a)
})
},wrap:function(a){var b=f.isFunction(a);
return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)
})
},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)
}).end()
},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)
})
},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)
})
},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)
})
}if(arguments.length){var a=f.clean(arguments);
a.push.apply(a,this.toArray());
return this.pushStack(a,"before",arguments)
}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)
})
}if(arguments.length){var a=this.pushStack(this,"after",arguments);
a.push.apply(a,f.clean(arguments));
return a
}},remove:function(a,b){for(var c=0,d;
(d=this[c])!=null;
c++){if(!a||f.filter(a,[d]).length){!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d)
}}return this
},empty:function(){for(var a=0,b;
(b=this[a])!=null;
a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));
while(b.firstChild){b.removeChild(b.firstChild)
}}return this
},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;
return this.map(function(){return f.clone(this,a,b)
})
},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;
if(a===b){return c.nodeType===1?c.innerHTML.replace(W,""):null
}if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");
try{for(;
d<e;
d++){c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a)
}c=0
}catch(g){}}c&&this.empty().append(a)
},null,a,arguments.length)
},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a)){return this.each(function(b){var c=f(this),d=c.html();
c.replaceWith(a.call(this,b,d))
})
}typeof a!="string"&&(a=f(a).detach());
return this.each(function(){var b=this.nextSibling,c=this.parentNode;
f(this).remove(),b?f(b).before(a):f(c).append(a)
})
}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this
},detach:function(a){return this.remove(a,!0)
},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];
if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j)){return this.each(function(){f(this).domManip(a,c,d,!0)
})
}if(f.isFunction(j)){return this.each(function(e){var g=f(this);
a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)
})
}if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;
if(g){c=c&&f.nodeName(g,"tr");
for(var l=0,m=this.length,n=m-1;
l<m;
l++){d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)
}}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)
})
}return this
}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];
b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);
return{fragment:e,cacheable:g}
},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;
if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);
return this
}for(var h=0,i=e.length;
h<i;
h++){var j=(h>0?this.clone(!0):this).get();
f(e[h])[b](j),d=d.concat(j)
}return this.pushStack(d,a,e.selector)
}
}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);
if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);
for(g=0;
d[g];
++g){e[g]&&bk(d[g],e[g])
}}if(b){bj(a,h);
if(c){d=bl(a),e=bl(h);
for(g=0;
d[g];
++g){bj(d[g],e[g])
}}}d=e=null;
return h
},clean:function(a,b,d,e){var g,h,i,j=[];
b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);
for(var k=0,l;
(l=a[k])!=null;
k++){typeof l=="number"&&(l+="");
if(!l){continue
}if(typeof l=="string"){if(!_.test(l)){l=b.createTextNode(l)
}else{l=l.replace(Y,"<$1></$2>");
var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;
b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];
while(o--){p=p.lastChild
}if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];
for(i=t.length-1;
i>=0;
--i){f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])
}}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))
}}var u;
if(!f.support.appendChecked){if(l[0]&&typeof (u=l.length)=="number"){for(i=0;
i<u;
i++){bn(l[i])
}}else{bn(l)
}}l.nodeType?j.push(l):j=f.merge(j,l)
}if(d){g=function(a){return !a.type||be.test(a.type)
};
for(k=0;
j[k];
k++){h=j[k];
if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type))){e.push(h.parentNode?h.parentNode.removeChild(h):h)
}else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);
j.splice.apply(j,[k+1,0].concat(v))
}d.appendChild(h)
}}}return j
},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;
for(var h=0,i;
(i=a[h])!=null;
h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()]){continue
}c=i[f.expando];
if(c){b=d[c];
if(b&&b.events){for(var j in b.events){e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle)
}b.handle&&(b.handle.elem=null)
}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]
}}}});
var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;
f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)
},a,c,arguments.length>1)
},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");
return c===""?"1":c
}return a.style.opacity
}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];
c=f.cssProps[i]||i;
if(d===b){if(k&&"get" in k&&(g=k.get(a,!1,e))!==b){return g
}return j[c]
}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");
if(d==null||h==="number"&&isNaN(d)){return 
}h==="number"&&!f.cssNumber[i]&&(d+="px");
if(!k||!("set" in k)||(d=k.set(a,d))!==b){try{j[c]=d
}catch(l){}}}},css:function(a,c,d){var e,g;
c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");
if(g&&"get" in g&&(e=g.get(a,!0,d))!==b){return e
}if(by){return by(a,c)
}},swap:function(a,b,c){var d={},e,f;
for(f in b){d[f]=a.style[f],a.style[f]=b[f]
}e=c.call(a);
for(f in b){a.style[f]=d[f]
}return e
}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;
b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);
return c
}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;
f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));
return f===""?"auto":f
}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c){return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)
})
}},set:function(a,b){return bs.test(b)?b+"px":b
}}
}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""
},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";
c.zoom=1;
if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");
if(d&&!d.filter){return 
}}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e
}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight
})
}})
}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;
return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"
},f.expr.filters.visible=function(a){return !f.expr.filters.hidden(a)
}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};
for(d=0;
d<4;
d++){f[a+bx[d]+b]=e[d]||e[d-2]||e[0]
}return f
}}
});
var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];
try{bU=e.href
}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href
}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR){return bR.apply(this,arguments)
}if(!this.length){return this
}var e=a.indexOf(" ");
if(e>=0){var g=a.slice(e,a.length);
a=a.slice(0,e)
}var h="GET";
c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));
var i=this;
f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a
}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])
}});
return this
},serialize:function(){return f.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))
}).map(function(a,b){var c=f(this).val();
return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}
}):{name:b.name,value:c.replace(bE,"\r\n")}
}).get()
}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)
}
}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);
return f.ajax({type:c,url:a,data:d,success:e,dataType:g})
}
}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")
},getJSON:function(a,b,c){return f.get(a,b,c,"json")
},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);
return a
},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;
var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;
if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified")){f.lastModified[k]=y
}if(z=v.getResponseHeader("Etag")){f.etag[k]=z
}}if(a===304){w="notmodified",o=!0
}else{try{r=cb(d,x),w="success",o=!0
}catch(A){w="parsererror",u=A
}}}else{u=w;
if(!w||a){w="error",a<0&&(a=0)
}}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))
}}typeof a=="object"&&(c=a,a=b),c=c||{};
var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();
a=m[c]=m[c]||a,l[a]=b
}return this
},getAllResponseHeaders:function(){return s===2?n:null
},getResponseHeader:function(a){var c;
if(s===2){if(!o){o={};
while(c=bG.exec(n)){o[c[1].toLowerCase()]=c[2]
}}c=o[a.toLowerCase()]
}return c===b?null:c
},overrideMimeType:function(a){s||(d.mimeType=a);
return this
},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);
return this
}};
h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;
if(s<2){for(b in a){j[b]=[j[b],a[b]]
}}else{b=a[v.status],v.then(b,b)
}}return this
},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);
if(s===2){return !1
}t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");
if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;
if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);
d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")
}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);
for(u in d.headers){v.setRequestHeader(u,d.headers[u])
}if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();
return !1
}for(u in {success:1,error:1,complete:1}){v[u](d[u])
}p=bZ(bT,d,c,v);
if(!p){w(-1,"No Transport")
}else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")
},d.timeout));
try{s=1,p.send(l,w)
}catch(z){if(s<2){w(-1,z)
}else{throw z
}}}return v
},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)
};
c===b&&(c=f.ajaxSettings.traditional);
if(f.isArray(a)||a.jquery&&!f.isPlainObject(a)){f.each(a,function(){e(this.name,this.value)
})
}else{for(var g in a){b_(g,a[g],c,e)
}}return d.join("&").replace(bC,"+")
}}),f.extend({active:0,lastModified:{},etag:{}});
var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;
f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++
}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);
if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";
b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]
},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])
}),b.converters["script json"]=function(){g||f.error(h+" was not called");
return g[0]
},b.dataTypes[0]="json";
return"script"
}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);
return a
}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)
}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;
return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState)){d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")
}},e.insertBefore(d,e.firstChild)
},abort:function(){d&&d.onload(0,1)
}}
}});
var ce=a.ActiveXObject?function(){for(var a in cg){cg[a](0,1)
}}:!1,cf=0,cg;
f.ajaxSettings.xhr=a.ActiveXObject?function(){return !this.isLocal&&ch()||ci()
}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials" in a})
}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;
return{send:function(e,g){var h=c.xhr(),i,j;
c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);
if(c.xhrFields){for(j in c.xhrFields){h[j]=c.xhrFields[j]
}}c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");
try{for(j in e){h.setRequestHeader(j,e[j])
}}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;
try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);
if(e){h.readyState!==4&&h.abort()
}else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);
try{m.text=h.responseText
}catch(a){}try{k=h.statusText
}catch(o){k=""
}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)
}}}catch(p){e||g(-1,p)
}m&&g(j,k,m,l)
},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)
},abort:function(){d&&d(0,1)
}}
}});
var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;
f.fn.extend({show:function(a,b,c){var d,e;
if(a||a===0){return this.animate(ct("show",3),a,b,c)
}for(var g=0,h=this.length;
g<h;
g++){d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)))
}for(g=0;
g<h;
g++){d=this[g];
if(d.style){e=d.style.display;
if(e===""||e==="none"){d.style.display=f._data(d,"olddisplay")||""
}}}return this
},hide:function(a,b,c){if(a||a===0){return this.animate(ct("hide",3),a,b,c)
}var d,e,g=0,h=this.length;
for(;
g<h;
g++){d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e))
}for(g=0;
g<h;
g++){this[g].style&&(this[g].style.display="none")
}return this
},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";
f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");
f(this)[b?"show":"hide"]()
}):this.animate(ct("toggle",3),a,b,c);
return this
},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)
},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);
var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;
b.animatedProperties={};
for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);
if((k=f.cssHooks[g])&&"expand" in k){l=k.expand(a[g]),delete a[g];
for(i in l){i in a||(a[i]=l[i])
}}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";
if(h==="hide"&&d||h==="show"&&!d){return b.complete.call(this)
}c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))
}b.overflow!=null&&(this.style.overflow="hidden");
for(i in a){j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""))
}return !0
}var e=f.speed(b,c,d);
if(f.isEmptyObject(a)){return this.each(e.complete,[!1])
}a=f.extend({},a);
return e.queue===!1?this.each(g):this.queue(e.queue,g)
},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);
return this.each(function(){function h(a,b,c){var e=b[c];
f.removeData(a,c,!0),e.stop(d)
}var b,c=!1,e=f.timers,g=f._data(this);
d||f._unmark(!0,this);
if(a==null){for(b in g){g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b)
}}else{g[b=a+".run"]&&g[b].stop&&h(this,g,b)
}for(b=e.length;
b--;
){e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1))
}(!d||!c)&&f.dequeue(this,a)
})
}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)
}
}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};
d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;
if(d.queue==null||d.queue===!0){d.queue="fx"
}d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)
};
return d
},easing:{linear:function(a){return a
},swing:function(a){return -Math.cos(a*Math.PI)/2+0.5
}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}
}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)
},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var a,b=f.css(this.elem,this.prop);
return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a
},custom:function(a,c,d){function h(a){return e.step(a)
}var e=this,g=f.fx;
this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))
},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))
},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);
this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()
},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)
},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;
if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;
for(b in i.animatedProperties){i.animatedProperties[b]!==!0&&(g=!1)
}if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]
}),i.hide&&f(h).hide();
if(i.hide||i.show){for(b in i.animatedProperties){f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0)
}}d=i.complete,d&&(i.complete=!1,d.call(h))
}return !1
}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();
return !0
}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;
for(;
c<b.length;
c++){a=b[c],!a()&&b[c]===a&&b.splice(c--,1)
}b.length||f.fx.stop()
},interval:13,stop:function(){clearInterval(co),co=null
},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)
},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now
}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)
})
}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem
}).length
});
var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;
"getBoundingClientRect" in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()
}catch(e){}if(!d||!f.contains(c,a)){return d?{top:d.top,left:d.left}:{top:0,left:0}
}var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;
return{top:m,left:n}
}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;
while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed"){break
}d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d
}if(j.position==="relative"||j.position==="static"){k+=h.offsetTop,l+=h.offsetLeft
}f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));
return{top:k,left:l}
},f.fn.offset=function(a){if(arguments.length){return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)
})
}var c=this[0],d=c&&c.ownerDocument;
if(!d){return null
}if(c===d.body){return f.offset.bodyOffset(c)
}return cv(c,d,d.documentElement)
},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;
f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);
return{top:b,left:c}
},setOffset:function(a,b,c){var d=f.css(a,"position");
d==="static"&&(a.style.position="relative");
var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;
j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using" in b?b.using.call(a,k):e.css(k)
}},f.fn.extend({position:function(){if(!this[0]){return null
}var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();
c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;
return{top:c.top-d.top,left:c.left-d.left}
},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;
while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static"){a=a.offsetParent
}return a
})
}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);
f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);
if(g===b){return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e]
}h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g
},a,e,arguments.length,null)
}
}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;
f.fn["inner"+a]=function(){var a=this[0];
return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null
},f.fn["outer"+a]=function(a){var b=this[0];
return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null
},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;
if(f.isWindow(a)){i=a.document,j=i.documentElement[d];
return f.support.boxModel&&j||i.body&&i.body[d]||j
}if(a.nodeType===9){i=a.documentElement;
if(i[d]>=i[e]){return i[d]
}return Math.max(a.body[e],i[e],a.body[g],i[g])
}if(h===b){k=f.css(a,c),l=parseFloat(k);
return f.isNumeric(l)?l:k
}f(a).css(c,h)
},c,a,arguments.length,null)
}
}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f
})
})(window);
/*
 * jQuery UI 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(A,C){function D(F,G){var E=F.nodeName.toLowerCase();
if("area"===E){G=F.parentNode;
E=G.name;
if(!F.href||!E||G.nodeName.toLowerCase()!=="map"){return false
}F=A("img[usemap=#"+E+"]")[0];
return !!F&&B(F)
}return(/input|select|textarea|button|object/.test(E)?!F.disabled:"a"==E?F.href||G:G)&&B(F)
}function B(E){return !A(E).parents().andSelf().filter(function(){return A.curCSS(this,"visibility")==="hidden"||A.expr.filters.hidden(this)
}).length
}A.ui=A.ui||{};
if(!A.ui.version){A.extend(A.ui,{version:"1.8.13",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
A.fn.extend({_focus:A.fn.focus,focus:function(E,F){return typeof E==="number"?this.each(function(){var G=this;
setTimeout(function(){A(G).focus();
F&&F.call(G)
},E)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var E;
E=A.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(A.curCSS(this,"position",1))&&/(auto|scroll)/.test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0);
return/fixed/.test(this.css("position"))||!E.length?A(document):E
},zIndex:function(E){if(E!==C){return this.css("zIndex",E)
}if(this.length){E=A(this[0]);
for(var F;
E.length&&E[0]!==document;
){F=E.css("position");
if(F==="absolute"||F==="relative"||F==="fixed"){F=parseInt(E.css("zIndex"),10);
if(!isNaN(F)&&F!==0){return F
}}E=E.parent()
}}return 0
},disableSelection:function(){return this.bind((A.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(E){E.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
A.each(["Width","Height"],function(I,J){function G(K,M,N,L){A.each(E,function(){M-=parseFloat(A.curCSS(K,"padding"+this,true))||0;
if(N){M-=parseFloat(A.curCSS(K,"border"+this+"Width",true))||0
}if(L){M-=parseFloat(A.curCSS(K,"margin"+this,true))||0
}});
return M
}var E=J==="Width"?["Left","Right"]:["Top","Bottom"],H=J.toLowerCase(),F={innerWidth:A.fn.innerWidth,innerHeight:A.fn.innerHeight,outerWidth:A.fn.outerWidth,outerHeight:A.fn.outerHeight};
A.fn["inner"+J]=function(K){if(K===C){return F["inner"+J].call(this)
}return this.each(function(){A(this).css(H,G(this,K)+"px")
})
};
A.fn["outer"+J]=function(K,L){if(typeof K!=="number"){return F["outer"+J].call(this,K)
}return this.each(function(){A(this).css(H,G(this,K,true,L)+"px")
})
}
});
A.extend(A.expr[":"],{data:function(F,G,E){return !!A.data(F,E[3])
},focusable:function(E){return D(E,!isNaN(A.attr(E,"tabindex")))
},tabbable:function(F){var G=A.attr(F,"tabindex"),E=isNaN(G);
return(E||G>=0)&&D(F,!E)
}});
A(function(){var E=document.body,F=E.appendChild(F=document.createElement("div"));
A.extend(F.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
A.support.minHeight=F.offsetHeight===100;
A.support.selectstart="onselectstart" in F;
E.removeChild(F).style.display="none"
});
A.extend(A.ui,{plugin:{add:function(G,H,F){G=A.ui[G].prototype;
for(var E in F){G.plugins[E]=G.plugins[E]||[];
G.plugins[E].push([H,F[E]])
}},call:function(G,H,F){if((H=G.plugins[H])&&G.element[0].parentNode){for(var E=0;
E<H.length;
E++){G.options[H[E][0]]&&H[E][1].apply(G.element,F)
}}}},contains:function(E,F){return document.compareDocumentPosition?E.compareDocumentPosition(F)&16:E!==F&&E.contains(F)
},hasScroll:function(F,G){if(A(F).css("overflow")==="hidden"){return false
}G=G&&G==="left"?"scrollLeft":"scrollTop";
var E=false;
if(F[G]>0){return true
}F[G]=1;
E=F[G]>0;
F[G]=0;
return E
},isOverAxis:function(F,G,E){return F>G&&F<G+E
},isOver:function(I,J,G,E,H,F){return A.ui.isOverAxis(I,G,H)&&A.ui.isOverAxis(J,E,F)
}})
}})(jQuery);
(function(A,C){if(A.cleanData){var D=A.cleanData;
A.cleanData=function(F){for(var G=0,E;
(E=F[G])!=null;
G++){A(E).triggerHandler("remove")
}D(F)
}
}else{var B=A.fn.remove;
A.fn.remove=function(E,F){return this.each(function(){if(!F){if(!E||A.filter(E,[this]).length){A("*",this).add([this]).each(function(){A(this).triggerHandler("remove")
})
}}return B.call(A(this),E,F)
})
}
}A.widget=function(H,I,F){var E=H.split(".")[0],G;
H=H.split(".")[1];
G=E+"-"+H;
if(!F){F=I;
I=A.Widget
}A.expr[":"][G]=function(J){return !!A.data(J,H)
};
A[E]=A[E]||{};
A[E][H]=function(K,J){arguments.length&&this._createWidget(K,J)
};
I=new I;
I.options=A.extend(true,{},I.options);
A[E][H].prototype=A.extend(true,I,{namespace:E,widgetName:H,widgetEventPrefix:A[E][H].prototype.widgetEventPrefix||H,widgetBaseClass:G},F);
A.widget.bridge(H,A[E][H])
};
A.widget.bridge=function(E,F){A.fn[E]=function(I){var G=typeof I==="string",J=Array.prototype.slice.call(arguments,1),H=this;
I=!G&&J.length?A.extend.apply(null,[true,I].concat(J)):I;
if(G&&I.charAt(0)==="_"){return H
}G?this.each(function(){var K=A.data(this,E),L=K&&A.isFunction(K[I])?K[I].apply(K,J):K;
if(L!==K&&L!==C){H=L;
return false
}}):this.each(function(){var K=A.data(this,E);
K?K.option(I||{})._init():A.data(this,E,new F(I,this))
});
return H
}
};
A.Widget=function(E,F){arguments.length&&this._createWidget(E,F)
};
A.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(F,G){A.data(G,this.widgetName,this);
this.element=A(G);
this.options=A.extend(true,{},this.options,this._getCreateOptions(),F);
var E=this;
this.element.bind("remove."+this.widgetName,function(){E.destroy()
});
this._create();
this._trigger("create");
this._init()
},_getCreateOptions:function(){return A.metadata&&A.metadata.get(this.element[0])[this.widgetName]
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(F,G){var E=F;
if(arguments.length===0){return A.extend({},this.options)
}if(typeof F==="string"){if(G===C){return this.options[F]
}E={};
E[F]=G
}this._setOptions(E);
return this
},_setOptions:function(E){var F=this;
A.each(E,function(H,G){F._setOption(H,G)
});
return this
},_setOption:function(E,F){this.options[E]=F;
if(E==="disabled"){this.widget()[F?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",F)
}return this
},enable:function(){return this._setOption("disabled",false)
},disable:function(){return this._setOption("disabled",true)
},_trigger:function(H,I,F){var E=this.options[H];
I=A.Event(I);
I.type=(H===this.widgetEventPrefix?H:this.widgetEventPrefix+H).toLowerCase();
F=F||{};
if(I.originalEvent){H=A.event.props.length;
for(var G;
H;
){G=A.event.props[--H];
I[G]=I.originalEvent[G]
}}this.element.trigger(I,F);
return !(A.isFunction(E)&&E.call(this.element[0],I,F)===false||I.isDefaultPrevented())
}}
})(jQuery);
(function(A){var B=false;
A(document).mousedown(function(){B=false
});
A.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var C=this;
this.element.bind("mousedown."+this.widgetName,function(D){return C._mouseDown(D)
}).bind("click."+this.widgetName,function(D){if(true===A.data(D.target,C.widgetName+".preventClickEvent")){A.removeData(D.target,C.widgetName+".preventClickEvent");
D.stopImmediatePropagation();
return false
}});
this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)
},_mouseDown:function(F){if(!B){this._mouseStarted&&this._mouseUp(F);
this._mouseDownEvent=F;
var D=this,C=F.which==1,E=typeof this.options.cancel=="string"?A(F.target).parents().add(F.target).filter(this.options.cancel).length:false;
if(!C||E||!this._mouseCapture(F)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){D.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(F)&&this._mouseDelayMet(F)){this._mouseStarted=this._mouseStart(F)!==false;
if(!this._mouseStarted){F.preventDefault();
return true
}}true===A.data(F.target,this.widgetName+".preventClickEvent")&&A.removeData(F.target,this.widgetName+".preventClickEvent");
this._mouseMoveDelegate=function(G){return D._mouseMove(G)
};
this._mouseUpDelegate=function(G){return D._mouseUp(G)
};
A(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
F.preventDefault();
return B=true
}},_mouseMove:function(C){if(A.browser.msie&&!(document.documentMode>=9)&&!C.button){return this._mouseUp(C)
}if(this._mouseStarted){this._mouseDrag(C);
return C.preventDefault()
}if(this._mouseDistanceMet(C)&&this._mouseDelayMet(C)){(this._mouseStarted=this._mouseStart(this._mouseDownEvent,C)!==false)?this._mouseDrag(C):this._mouseUp(C)
}return !this._mouseStarted
},_mouseUp:function(C){A(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
C.target==this._mouseDownEvent.target&&A.data(C.target,this.widgetName+".preventClickEvent",true);
this._mouseStop(C)
}return false
},_mouseDistanceMet:function(C){return Math.max(Math.abs(this._mouseDownEvent.pageX-C.pageX),Math.abs(this._mouseDownEvent.pageY-C.pageY))>=this.options.distance
},_mouseDelayMet:function(){return this.mouseDelayMet
},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true
}})
})(jQuery);
(function(A){A.widget("ui.draggable",A.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))){this.element[0].style.position="relative"
}this.options.addClasses&&this.element.addClass("ui-draggable");
this.options.disabled&&this.element.addClass("ui-draggable-disabled");
this._mouseInit()
},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy();
return this
}},_mouseCapture:function(B){var C=this.options;
if(this.helper||C.disabled||A(B.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(B);
if(!this.handle){return false
}A(C.iframeFix===true?"iframe":C.iframeFix).each(function(){A('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(A(this).offset()).appendTo("body")
});
return true
},_mouseStart:function(B){var C=this.options;
this.helper=this._createHelper(B);
this._cacheHelperProportions();
if(A.ui.ddmanager){A.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.positionAbs=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
A.extend(this.offset,{click:{left:B.pageX-this.offset.left,top:B.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(B);
this.originalPageX=B.pageX;
this.originalPageY=B.pageY;
C.cursorAt&&this._adjustOffsetFromHelper(C.cursorAt);
C.containment&&this._setContainment();
if(this._trigger("start",B)===false){this._clear();
return false
}this._cacheHelperProportions();
A.ui.ddmanager&&!C.dropBehaviour&&A.ui.ddmanager.prepareOffsets(this,B);
this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(B,true);
return true
},_mouseDrag:function(B,C){this.position=this._generatePosition(B);
this.positionAbs=this._convertPositionTo("absolute");
if(!C){C=this._uiHash();
if(this._trigger("drag",B,C)===false){this._mouseUp({});
return false
}this.position=C.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}A.ui.ddmanager&&A.ui.ddmanager.drag(this,B);
return false
},_mouseStop:function(C){var D=false;
if(A.ui.ddmanager&&!this.options.dropBehaviour){D=A.ui.ddmanager.drop(this,C)
}if(this.dropped){D=this.dropped;
this.dropped=false
}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original"){return false
}if(this.options.revert=="invalid"&&!D||this.options.revert=="valid"&&D||this.options.revert===true||A.isFunction(this.options.revert)&&this.options.revert.call(this.element,D)){var B=this;
A(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){B._trigger("stop",C)!==false&&B._clear()
})
}else{this._trigger("stop",C)!==false&&this._clear()
}return false
},_mouseUp:function(B){this.options.iframeFix===true&&A("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
});
return A.ui.mouse.prototype._mouseUp.call(this,B)
},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();
return this
},_getHandle:function(B){var C=!this.options.handle||!A(this.options.handle,this.element).length?true:false;
A(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==B.target){C=true
}});
return C
},_createHelper:function(B){var C=this.options;
B=A.isFunction(C.helper)?A(C.helper.apply(this.element[0],[B])):C.helper=="clone"?this.element.clone().removeAttr("id"):this.element;
B.parents("body").length||B.appendTo(C.appendTo=="parent"?this.element[0].parentNode:C.appendTo);
B[0]!=this.element[0]&&!/(fixed|absolute)/.test(B.css("position"))&&B.css("position","absolute");
return B
},_adjustOffsetFromHelper:function(B){if(typeof B=="string"){B=B.split(" ")
}if(A.isArray(B)){B={left:+B[0],top:+B[1]||0}
}if("left" in B){this.offset.click.left=B.left+this.margins.left
}if("right" in B){this.offset.click.left=this.helperProportions.width-B.right+this.margins.left
}if("top" in B){this.offset.click.top=B.top+this.margins.top
}if("bottom" in B){this.offset.click.top=this.helperProportions.height-B.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var B=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0])){B.left+=this.scrollParent.scrollLeft();
B.top+=this.scrollParent.scrollTop()
}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&A.browser.msie){B={top:0,left:0}
}return{top:B.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:B.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var B=this.element.position();
return{top:B.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:B.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var C=this.options;
if(C.containment=="parent"){C.containment=this.helper[0].parentNode
}if(C.containment=="document"||C.containment=="window"){this.containment=[(C.containment=="document"?0:A(window).scrollLeft())-this.offset.relative.left-this.offset.parent.left,(C.containment=="document"?0:A(window).scrollTop())-this.offset.relative.top-this.offset.parent.top,(C.containment=="document"?0:A(window).scrollLeft())+A(C.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(C.containment=="document"?0:A(window).scrollTop())+(A(C.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!/^(document|window|parent)$/.test(C.containment)&&C.containment.constructor!=Array){C=A(C.containment);
var D=C[0];
if(D){C.offset();
var B=A(D).css("overflow")!="hidden";
this.containment=[(parseInt(A(D).css("borderLeftWidth"),10)||0)+(parseInt(A(D).css("paddingLeft"),10)||0),(parseInt(A(D).css("borderTopWidth"),10)||0)+(parseInt(A(D).css("paddingTop"),10)||0),(B?Math.max(D.scrollWidth,D.offsetWidth):D.offsetWidth)-(parseInt(A(D).css("borderLeftWidth"),10)||0)-(parseInt(A(D).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(B?Math.max(D.scrollHeight,D.offsetHeight):D.offsetHeight)-(parseInt(A(D).css("borderTopWidth"),10)||0)-(parseInt(A(D).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];
this.relative_container=C
}}else{if(C.containment.constructor==Array){this.containment=C.containment
}}},_convertPositionTo:function(D,E){if(!E){E=this.position
}D=D=="absolute"?1:-1;
var C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,B=/(html|body)/i.test(C[0].tagName);
return{top:E.top+this.offset.relative.top*D+this.offset.parent.top*D-(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():B?0:C.scrollTop())*D),left:E.left+this.offset.relative.left*D+this.offset.parent.left*D-(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():B?0:C.scrollLeft())*D)}
},_generatePosition:function(G){var H=this.options,E=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,D=/(html|body)/i.test(E[0].tagName),F=G.pageX,C=G.pageY;
if(this.originalPosition){var B;
if(this.containment){if(this.relative_container){B=this.relative_container.offset();
B=[this.containment[0]+B.left,this.containment[1]+B.top,this.containment[2]+B.left,this.containment[3]+B.top]
}else{B=this.containment
}if(G.pageX-this.offset.click.left<B[0]){F=B[0]+this.offset.click.left
}if(G.pageY-this.offset.click.top<B[1]){C=B[1]+this.offset.click.top
}if(G.pageX-this.offset.click.left>B[2]){F=B[2]+this.offset.click.left
}if(G.pageY-this.offset.click.top>B[3]){C=B[3]+this.offset.click.top
}}if(H.grid){C=this.originalPageY+Math.round((C-this.originalPageY)/H.grid[1])*H.grid[1];
C=B?!(C-this.offset.click.top<B[1]||C-this.offset.click.top>B[3])?C:!(C-this.offset.click.top<B[1])?C-H.grid[1]:C+H.grid[1]:C;
F=this.originalPageX+Math.round((F-this.originalPageX)/H.grid[0])*H.grid[0];
F=B?!(F-this.offset.click.left<B[0]||F-this.offset.click.left>B[2])?F:!(F-this.offset.click.left<B[0])?F-H.grid[0]:F+H.grid[0]:F
}}return{top:C-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():D?0:E.scrollTop()),left:F-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():D?0:E.scrollLeft())}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();
this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(C,D,B){B=B||this._uiHash();
A.ui.plugin.call(this,C,[D,B]);
if(C=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return A.Widget.prototype._trigger.call(this,C,D,B)
},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}});
A.extend(A.ui.draggable,{version:"1.8.13"});
A.ui.plugin.add("draggable","connectToSortable",{start:function(E,F){var C=A(this).data("draggable"),B=C.options,D=A.extend({},F,{item:C.element});
C.sortables=[];
A(B.connectToSortable).each(function(){var G=A.data(this,"sortable");
if(G&&!G.options.disabled){C.sortables.push({instance:G,shouldRevert:G.options.revert});
G.refreshPositions();
G._trigger("activate",E,D)
}})
},stop:function(D,E){var C=A(this).data("draggable"),B=A.extend({},E,{item:C.element});
A.each(C.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
C.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(D);
this.instance.options.helper=this.instance.options._helper;
C.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})
}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",D,B)
}})
},drag:function(D,E){var C=A(this).data("draggable"),B=this;
A.each(C.sortables,function(){this.instance.positionAbs=C.positionAbs;
this.instance.helperProportions=C.helperProportions;
this.instance.offset.click=C.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=A(B).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return E.helper[0]
};
D.target=this.instance.currentItem[0];
this.instance._mouseCapture(D,true);
this.instance._mouseStart(D,true,true);
this.instance.offset.click.top=C.offset.click.top;
this.instance.offset.click.left=C.offset.click.left;
this.instance.offset.parent.left-=C.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=C.offset.parent.top-this.instance.offset.parent.top;
C._trigger("toSortable",D);
C.dropped=this.instance.element;
C.currentItem=C.element;
this.instance.fromOutside=C
}this.instance.currentItem&&this.instance._mouseDrag(D)
}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",D,this.instance._uiHash(this.instance));
this.instance._mouseStop(D,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
this.instance.placeholder&&this.instance.placeholder.remove();
C._trigger("fromSortable",D);
C.dropped=false
}}})
}});
A.ui.plugin.add("draggable","cursor",{start:function(){var B=A("body"),C=A(this).data("draggable").options;
if(B.css("cursor")){C._cursor=B.css("cursor")
}B.css("cursor",C.cursor)
},stop:function(){var B=A(this).data("draggable").options;
B._cursor&&A("body").css("cursor",B._cursor)
}});
A.ui.plugin.add("draggable","opacity",{start:function(B,C){B=A(C.helper);
C=A(this).data("draggable").options;
if(B.css("opacity")){C._opacity=B.css("opacity")
}B.css("opacity",C.opacity)
},stop:function(B,C){B=A(this).data("draggable").options;
B._opacity&&A(C.helper).css("opacity",B._opacity)
}});
A.ui.plugin.add("draggable","scroll",{start:function(){var B=A(this).data("draggable");
if(B.scrollParent[0]!=document&&B.scrollParent[0].tagName!="HTML"){B.overflowOffset=B.scrollParent.offset()
}},drag:function(D){var E=A(this).data("draggable"),C=E.options,B=false;
if(E.scrollParent[0]!=document&&E.scrollParent[0].tagName!="HTML"){if(!C.axis||C.axis!="x"){if(E.overflowOffset.top+E.scrollParent[0].offsetHeight-D.pageY<C.scrollSensitivity){E.scrollParent[0].scrollTop=B=E.scrollParent[0].scrollTop+C.scrollSpeed
}else{if(D.pageY-E.overflowOffset.top<C.scrollSensitivity){E.scrollParent[0].scrollTop=B=E.scrollParent[0].scrollTop-C.scrollSpeed
}}}if(!C.axis||C.axis!="y"){if(E.overflowOffset.left+E.scrollParent[0].offsetWidth-D.pageX<C.scrollSensitivity){E.scrollParent[0].scrollLeft=B=E.scrollParent[0].scrollLeft+C.scrollSpeed
}else{if(D.pageX-E.overflowOffset.left<C.scrollSensitivity){E.scrollParent[0].scrollLeft=B=E.scrollParent[0].scrollLeft-C.scrollSpeed
}}}}else{if(!C.axis||C.axis!="x"){if(D.pageY-A(document).scrollTop()<C.scrollSensitivity){B=A(document).scrollTop(A(document).scrollTop()-C.scrollSpeed)
}else{if(A(window).height()-(D.pageY-A(document).scrollTop())<C.scrollSensitivity){B=A(document).scrollTop(A(document).scrollTop()+C.scrollSpeed)
}}}if(!C.axis||C.axis!="y"){if(D.pageX-A(document).scrollLeft()<C.scrollSensitivity){B=A(document).scrollLeft(A(document).scrollLeft()-C.scrollSpeed)
}else{if(A(window).width()-(D.pageX-A(document).scrollLeft())<C.scrollSensitivity){B=A(document).scrollLeft(A(document).scrollLeft()+C.scrollSpeed)
}}}}B!==false&&A.ui.ddmanager&&!C.dropBehaviour&&A.ui.ddmanager.prepareOffsets(E,D)
}});
A.ui.plugin.add("draggable","snap",{start:function(){var B=A(this).data("draggable"),C=B.options;
B.snapElements=[];
A(C.snap.constructor!=String?C.snap.items||":data(draggable)":C.snap).each(function(){var E=A(this),D=E.offset();
this!=B.element[0]&&B.snapElements.push({item:this,width:E.outerWidth(),height:E.outerHeight(),top:D.top,left:D.left})
})
},drag:function(R,S){for(var P=A(this).data("draggable"),O=P.options,Q=O.snapTolerance,M=S.offset.left,T=M+P.helperProportions.width,N=S.offset.top,L=N+P.helperProportions.height,J=P.snapElements.length-1;
J>=0;
J--){var G=P.snapElements[J].left,H=G+P.snapElements[J].width,K=P.snapElements[J].top,I=K+P.snapElements[J].height;
if(G-Q<M&&M<H+Q&&K-Q<N&&N<I+Q||G-Q<M&&M<H+Q&&K-Q<L&&L<I+Q||G-Q<T&&T<H+Q&&K-Q<N&&N<I+Q||G-Q<T&&T<H+Q&&K-Q<L&&L<I+Q){if(O.snapMode!="inner"){var F=Math.abs(K-L)<=Q,E=Math.abs(I-N)<=Q,C=Math.abs(G-T)<=Q,D=Math.abs(H-M)<=Q;
if(F){S.position.top=P._convertPositionTo("relative",{top:K-P.helperProportions.height,left:0}).top-P.margins.top
}if(E){S.position.top=P._convertPositionTo("relative",{top:I,left:0}).top-P.margins.top
}if(C){S.position.left=P._convertPositionTo("relative",{top:0,left:G-P.helperProportions.width}).left-P.margins.left
}if(D){S.position.left=P._convertPositionTo("relative",{top:0,left:H}).left-P.margins.left
}}var B=F||E||C||D;
if(O.snapMode!="outer"){F=Math.abs(K-N)<=Q;
E=Math.abs(I-L)<=Q;
C=Math.abs(G-M)<=Q;
D=Math.abs(H-T)<=Q;
if(F){S.position.top=P._convertPositionTo("relative",{top:K,left:0}).top-P.margins.top
}if(E){S.position.top=P._convertPositionTo("relative",{top:I-P.helperProportions.height,left:0}).top-P.margins.top
}if(C){S.position.left=P._convertPositionTo("relative",{top:0,left:G}).left-P.margins.left
}if(D){S.position.left=P._convertPositionTo("relative",{top:0,left:H-P.helperProportions.width}).left-P.margins.left
}}if(!P.snapElements[J].snapping&&(F||E||C||D||B)){P.options.snap.snap&&P.options.snap.snap.call(P.element,R,A.extend(P._uiHash(),{snapItem:P.snapElements[J].item}))
}P.snapElements[J].snapping=F||E||C||D||B
}else{P.snapElements[J].snapping&&P.options.snap.release&&P.options.snap.release.call(P.element,R,A.extend(P._uiHash(),{snapItem:P.snapElements[J].item}));
P.snapElements[J].snapping=false
}}}});
A.ui.plugin.add("draggable","stack",{start:function(){var B=A(this).data("draggable").options;
B=A.makeArray(A(B.stack)).sort(function(E,D){return(parseInt(A(E).css("zIndex"),10)||0)-(parseInt(A(D).css("zIndex"),10)||0)
});
if(B.length){var C=parseInt(B[0].style.zIndex)||0;
A(B).each(function(D){this.style.zIndex=C+D
});
this[0].style.zIndex=C+B.length
}}});
A.ui.plugin.add("draggable","zIndex",{start:function(B,C){B=A(C.helper);
C=A(this).data("draggable").options;
if(B.css("zIndex")){C._zIndex=B.css("zIndex")
}B.css("zIndex",C.zIndex)
},stop:function(B,C){B=A(this).data("draggable").options;
B._zIndex&&A(C.helper).css("zIndex",B._zIndex)
}})
})(jQuery);
(function(A){A.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var B=this.options,C=B.accept;
this.isover=0;
this.isout=1;
this.accept=A.isFunction(C)?C:function(D){return D.is(C)
};
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
A.ui.ddmanager.droppables[B.scope]=A.ui.ddmanager.droppables[B.scope]||[];
A.ui.ddmanager.droppables[B.scope].push(this);
B.addClasses&&this.element.addClass("ui-droppable")
},destroy:function(){for(var B=A.ui.ddmanager.droppables[this.options.scope],C=0;
C<B.length;
C++){B[C]==this&&B.splice(C,1)
}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
return this
},_setOption:function(B,C){if(B=="accept"){this.accept=A.isFunction(C)?C:function(D){return D.is(C)
}
}A.Widget.prototype._setOption.apply(this,arguments)
},_activate:function(B){var C=A.ui.ddmanager.current;
this.options.activeClass&&this.element.addClass(this.options.activeClass);
C&&this._trigger("activate",B,this.ui(C))
},_deactivate:function(B){var C=A.ui.ddmanager.current;
this.options.activeClass&&this.element.removeClass(this.options.activeClass);
C&&this._trigger("deactivate",B,this.ui(C))
},_over:function(B){var C=A.ui.ddmanager.current;
if(!(!C||(C.currentItem||C.element)[0]==this.element[0])){if(this.accept.call(this.element[0],C.currentItem||C.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);
this._trigger("over",B,this.ui(C))
}}},_out:function(B){var C=A.ui.ddmanager.current;
if(!(!C||(C.currentItem||C.element)[0]==this.element[0])){if(this.accept.call(this.element[0],C.currentItem||C.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);
this._trigger("out",B,this.ui(C))
}}},_drop:function(D,E){var C=E||A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return false
}var B=false;
this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var F=A.data(this,"droppable");
if(F.options.greedy&&!F.options.disabled&&F.options.scope==C.options.scope&&F.accept.call(F.element[0],C.currentItem||C.element)&&A.ui.intersect(C,A.extend(F,{offset:F.element.offset()}),F.options.tolerance)){B=true;
return false
}});
if(B){return false
}if(this.accept.call(this.element[0],C.currentItem||C.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);
this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);
this._trigger("drop",D,this.ui(C));
return this.element
}return false
},ui:function(B){return{draggable:B.currentItem||B.element,helper:B.helper,position:B.position,offset:B.positionAbs}
}});
A.extend(A.ui.droppable,{version:"1.8.13"});
A.ui.intersect=function(J,K,H){if(!K.offset){return false
}var G=(J.positionAbs||J.position.absolute).left,I=G+J.helperProportions.width,E=(J.positionAbs||J.position.absolute).top,L=E+J.helperProportions.height,F=K.offset.left,D=F+K.proportions.width,C=K.offset.top,B=C+K.proportions.height;
switch(H){case"fit":return F<=G&&I<=D&&C<=E&&L<=B;
case"intersect":return F<G+J.helperProportions.width/2&&I-J.helperProportions.width/2<D&&C<E+J.helperProportions.height/2&&L-J.helperProportions.height/2<B;
case"pointer":return A.ui.isOver((J.positionAbs||J.position.absolute).top+(J.clickOffset||J.offset.click).top,(J.positionAbs||J.position.absolute).left+(J.clickOffset||J.offset.click).left,C,F,K.proportions.height,K.proportions.width);
case"touch":return(E>=C&&E<=B||L>=C&&L<=B||E<C&&L>B)&&(G>=F&&G<=D||I>=F&&I<=D||G<F&&I>D);
default:return false
}};
A.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(G,H){var E=A.ui.ddmanager.droppables[G.options.scope]||[],D=H?H.type:null,F=(G.currentItem||G.element).find(":data(droppable)").andSelf(),C=0;
A:for(;
C<E.length;
C++){if(!(E[C].options.disabled||G&&!E[C].accept.call(E[C].element[0],G.currentItem||G.element))){for(var B=0;
B<F.length;
B++){if(F[B]==E[C].element[0]){E[C].proportions.height=0;
continue A
}}E[C].visible=E[C].element.css("display")!="none";
if(E[C].visible){D=="mousedown"&&E[C]._activate.call(E[C],H);
E[C].offset=E[C].element.offset();
E[C].proportions={width:E[C].element[0].offsetWidth,height:E[C].element[0].offsetHeight}
}}}},drop:function(C,D){var B=false;
A.each(A.ui.ddmanager.droppables[C.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&A.ui.intersect(C,this,this.options.tolerance)){B=B||this._drop.call(this,D)
}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],C.currentItem||C.element)){this.isout=1;
this.isover=0;
this._deactivate.call(this,D)
}}});
return B
},drag:function(B,C){B.options.refreshPositions&&A.ui.ddmanager.prepareOffsets(B,C);
A.each(A.ui.ddmanager.droppables[B.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var E=A.ui.intersect(B,this,this.options.tolerance);
if(E=!E&&this.isover==1?"isout":E&&this.isover==0?"isover":null){var D;
if(this.options.greedy){var F=this.element.parents(":data(droppable):eq(0)");
if(F.length){D=A.data(F[0],"droppable");
D.greedyChild=E=="isover"?1:0
}}if(D&&E=="isover"){D.isover=0;
D.isout=1;
D._out.call(D,C)
}this[E]=1;
this[E=="isout"?"isover":"isout"]=0;
this[E=="isover"?"_over":"_out"].call(this,C);
if(D&&E=="isout"){D.isout=0;
D.isover=1;
D._over.call(D,C)
}}}})
}}
})(jQuery);
(function(A){A.widget("ui.resizable",A.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function(){var H=this,G=this.options;
this.element.addClass("ui-resizable");
A.extend(this,{_aspectRatio:!!G.aspectRatio,aspectRatio:G.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:G.helper||G.ghost||G.animate?G.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&A.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});
this.element.wrap(A('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("resizable",this.element.data("resizable"));
this.elementIsWrapper=true;
this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");
this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css({margin:this.originalElement.css("margin")});
this._proportionallyResize()
}this.handles=G.handles||(!A(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"
}var I=this.handles.split(",");
this.handles={};
for(var E=0;
E<I.length;
E++){var D=A.trim(I[E]),F=A('<div class="ui-resizable-handle '+("ui-resizable-"+D)+'"></div>');
/sw|se|ne|nw/.test(D)&&F.css({zIndex:++G.zIndex});
"se"==D&&F.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
this.handles[D]=".ui-resizable-"+D;
this.element.append(F)
}}this._renderAxis=function(K){K=K||this.element;
for(var J in this.handles){if(this.handles[J].constructor==String){this.handles[J]=A(this.handles[J],this.element).show()
}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var L=A(this.handles[J],this.element),M=0;
M=/sw|ne|nw|se|n|s/.test(J)?L.outerHeight():L.outerWidth();
L=["padding",/ne|nw|n/.test(J)?"Top":/se|sw|s/.test(J)?"Bottom":/^e$/.test(J)?"Right":"Left"].join("");
K.css(L,M);
this._proportionallyResize()
}A(this.handles[J])
}};
this._renderAxis(this.element);
this._handles=A(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!H.resizing){if(this.className){var J=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}H.axis=J&&J[1]?J[1]:"se"
}});
if(G.autoHide){this._handles.hide();
A(this.element).addClass("ui-resizable-autohide").hover(function(){if(!G.disabled){A(this).removeClass("ui-resizable-autohide");
H._handles.show()
}},function(){if(!G.disabled){if(!H.resizing){A(this).addClass("ui-resizable-autohide");
H._handles.hide()
}}})
}this._mouseInit()
},destroy:function(){this._mouseDestroy();
var E=function(F){A(F).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
if(this.elementIsWrapper){E(this.element);
var D=this.element;
D.after(this.originalElement.css({position:D.css("position"),width:D.outerWidth(),height:D.outerHeight(),top:D.css("top"),left:D.css("left")})).remove()
}this.originalElement.css("resize",this.originalResizeStyle);
E(this.originalElement);
return this
},_mouseCapture:function(E){var D=false;
for(var F in this.handles){if(A(this.handles[F])[0]==E.target){D=true
}}return !this.options.disabled&&D
},_mouseStart:function(G){var F=this.options,H=this.element.position(),E=this.element;
this.resizing=true;
this.documentScroll={top:A(document).scrollTop(),left:A(document).scrollLeft()};
if(E.is(".ui-draggable")||/absolute/.test(E.css("position"))){E.css({position:"absolute",top:H.top,left:H.left})
}A.browser.opera&&/relative/.test(E.css("position"))&&E.css({position:"relative",top:"auto",left:"auto"});
this._renderProxy();
H=B(this.helper.css("left"));
var D=B(this.helper.css("top"));
if(F.containment){H+=A(F.containment).scrollLeft()||0;
D+=A(F.containment).scrollTop()||0
}this.offset=this.helper.offset();
this.position={left:H,top:D};
this.size=this._helper?{width:E.outerWidth(),height:E.outerHeight()}:{width:E.width(),height:E.height()};
this.originalSize=this._helper?{width:E.outerWidth(),height:E.outerHeight()}:{width:E.width(),height:E.height()};
this.originalPosition={left:H,top:D};
this.sizeDiff={width:E.outerWidth()-E.width(),height:E.outerHeight()-E.height()};
this.originalMousePosition={left:G.pageX,top:G.pageY};
this.aspectRatio=typeof F.aspectRatio=="number"?F.aspectRatio:this.originalSize.width/this.originalSize.height||1;
F=A(".ui-resizable-"+this.axis).css("cursor");
A("body").css("cursor",F=="auto"?this.axis+"-resize":F);
E.addClass("ui-resizable-resizing");
this._propagate("start",G);
return true
},_mouseDrag:function(F){var E=this.helper,G=this.originalMousePosition,D=this._change[this.axis];
if(!D){return false
}G=D.apply(this,[F,F.pageX-G.left||0,F.pageY-G.top||0]);
if(this._aspectRatio||F.shiftKey){G=this._updateRatio(G,F)
}G=this._respectSize(G,F);
this._propagate("resize",F);
E.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();
this._updateCache(G);
this._trigger("resize",F,this.ui());
return false
},_mouseStop:function(H){this.resizing=false;
var G=this.options,I=this;
if(this._helper){var E=this._proportionallyResizeElements,D=E.length&&/textarea/i.test(E[0].nodeName);
E=D&&A.ui.hasScroll(E[0],"left")?0:I.sizeDiff.height;
D=D?0:I.sizeDiff.width;
D={width:I.helper.width()-D,height:I.helper.height()-E};
E=parseInt(I.element.css("left"),10)+(I.position.left-I.originalPosition.left)||null;
var F=parseInt(I.element.css("top"),10)+(I.position.top-I.originalPosition.top)||null;
G.animate||this.element.css(A.extend(D,{top:F,left:E}));
I.helper.height(I.size.height);
I.helper.width(I.size.width);
this._helper&&!G.animate&&this._proportionallyResize()
}A("body").css("cursor","auto");
this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",H);
this._helper&&this.helper.remove();
return false
},_updateCache:function(D){this.offset=this.helper.offset();
if(C(D.left)){this.position.left=D.left
}if(C(D.top)){this.position.top=D.top
}if(C(D.height)){this.size.height=D.height
}if(C(D.width)){this.size.width=D.width
}},_updateRatio:function(F){var E=this.position,G=this.size,D=this.axis;
if(F.height){F.width=G.height*this.aspectRatio
}else{if(F.width){F.height=G.width/this.aspectRatio
}}if(D=="sw"){F.left=E.left+(G.width-F.width);
F.top=null
}if(D=="nw"){F.top=E.top+(G.height-F.height);
F.left=E.left+(G.width-F.width)
}return F
},_respectSize:function(K){var J=this.options,L=this.axis,H=C(K.width)&&J.maxWidth&&J.maxWidth<K.width,M=C(K.height)&&J.maxHeight&&J.maxHeight<K.height,I=C(K.width)&&J.minWidth&&J.minWidth>K.width,G=C(K.height)&&J.minHeight&&J.minHeight>K.height;
if(I){K.width=J.minWidth
}if(G){K.height=J.minHeight
}if(H){K.width=J.maxWidth
}if(M){K.height=J.maxHeight
}var F=this.originalPosition.left+this.originalSize.width,D=this.position.top+this.size.height,E=/sw|nw|w/.test(L);
L=/nw|ne|n/.test(L);
if(I&&E){K.left=F-J.minWidth
}if(H&&E){K.left=F-J.maxWidth
}if(G&&L){K.top=D-J.minHeight
}if(M&&L){K.top=D-J.maxHeight
}if((J=!K.width&&!K.height)&&!K.left&&K.top){K.top=null
}else{if(J&&!K.top&&K.left){K.left=null
}}return K
},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){for(var G=this.helper||this.element,F=0;
F<this._proportionallyResizeElements.length;
F++){var H=this._proportionallyResizeElements[F];
if(!this.borderDif){var E=[H.css("borderTopWidth"),H.css("borderRightWidth"),H.css("borderBottomWidth"),H.css("borderLeftWidth")],D=[H.css("paddingTop"),H.css("paddingRight"),H.css("paddingBottom"),H.css("paddingLeft")];
this.borderDif=A.map(E,function(J,I){J=parseInt(J,10)||0;
I=parseInt(D[I],10)||0;
return J+I
})
}A.browser.msie&&(A(G).is(":hidden")||A(G).parents(":hidden").length)||H.css({height:G.height()-this.borderDif[0]-this.borderDif[2]||0,width:G.width()-this.borderDif[1]-this.borderDif[3]||0})
}}},_renderProxy:function(){var E=this.options;
this.elementOffset=this.element.offset();
if(this._helper){this.helper=this.helper||A('<div style="overflow:hidden;"></div>');
var D=A.browser.msie&&A.browser.version<7,F=D?1:0;
D=D?2:-1;
this.helper.addClass(this._helper).css({width:this.element.outerWidth()+D,height:this.element.outerHeight()+D,position:"absolute",left:this.elementOffset.left-F+"px",top:this.elementOffset.top-F+"px",zIndex:++E.zIndex});
this.helper.appendTo("body").disableSelection()
}else{this.helper=this.element
}},_change:{e:function(E,D){return{width:this.originalSize.width+D}
},w:function(E,D){return{left:this.originalPosition.left+D,width:this.originalSize.width-D}
},n:function(E,D,F){return{top:this.originalPosition.top+F,height:this.originalSize.height-F}
},s:function(E,D,F){return{height:this.originalSize.height+F}
},se:function(E,D,F){return A.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[E,D,F]))
},sw:function(E,D,F){return A.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[E,D,F]))
},ne:function(E,D,F){return A.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[E,D,F]))
},nw:function(E,D,F){return A.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[E,D,F]))
}},_propagate:function(E,D){A.ui.plugin.call(this,E,[D,this.ui()]);
E!="resize"&&this._trigger(E,D,this.ui())
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}});
A.extend(A.ui.resizable,{version:"1.8.13"});
A.ui.plugin.add("resizable","alsoResize",{start:function(){var E=A(this).data("resizable").options,D=function(F){A(F).each(function(){var G=A(this);
G.data("resizable-alsoresize",{width:parseInt(G.width(),10),height:parseInt(G.height(),10),left:parseInt(G.css("left"),10),top:parseInt(G.css("top"),10),position:G.css("position")})
})
};
if(typeof E.alsoResize=="object"&&!E.alsoResize.parentNode){if(E.alsoResize.length){E.alsoResize=E.alsoResize[0];
D(E.alsoResize)
}else{A.each(E.alsoResize,function(F){D(F)
})
}}else{D(E.alsoResize)
}},resize:function(I,H){var J=A(this).data("resizable");
I=J.options;
var F=J.originalSize,D=J.originalPosition,G={height:J.size.height-F.height||0,width:J.size.width-F.width||0,top:J.position.top-D.top||0,left:J.position.left-D.left||0},E=function(K,L){A(K).each(function(){var P=A(this),N=A(this).data("resizable-alsoresize"),M={},O=L&&L.length?L:P.parents(H.originalElement[0]).length?["width","height"]:["width","height","top","left"];
A.each(O,function(R,Q){if((R=(N[Q]||0)+(G[Q]||0))&&R>=0){M[Q]=R||null
}});
if(A.browser.opera&&/relative/.test(P.css("position"))){J._revertToRelativePosition=true;
P.css({position:"absolute",top:"auto",left:"auto"})
}P.css(M)
})
};
typeof I.alsoResize=="object"&&!I.alsoResize.nodeType?A.each(I.alsoResize,function(K,L){E(K,L)
}):E(I.alsoResize)
},stop:function(){var E=A(this).data("resizable"),D=E.options,F=function(G){A(G).each(function(){var H=A(this);
H.css({position:H.data("resizable-alsoresize").position})
})
};
if(E._revertToRelativePosition){E._revertToRelativePosition=false;
typeof D.alsoResize=="object"&&!D.alsoResize.nodeType?A.each(D.alsoResize,function(G){F(G)
}):F(D.alsoResize)
}A(this).removeData("resizable-alsoresize")
}});
A.ui.plugin.add("resizable","animate",{stop:function(I){var H=A(this).data("resizable"),J=H.options,F=H._proportionallyResizeElements,D=F.length&&/textarea/i.test(F[0].nodeName),G=D&&A.ui.hasScroll(F[0],"left")?0:H.sizeDiff.height;
D={width:H.size.width-(D?0:H.sizeDiff.width),height:H.size.height-G};
G=parseInt(H.element.css("left"),10)+(H.position.left-H.originalPosition.left)||null;
var E=parseInt(H.element.css("top"),10)+(H.position.top-H.originalPosition.top)||null;
H.element.animate(A.extend(D,E&&G?{top:E,left:G}:{}),{duration:J.animateDuration,easing:J.animateEasing,step:function(){var K={width:parseInt(H.element.css("width"),10),height:parseInt(H.element.css("height"),10),top:parseInt(H.element.css("top"),10),left:parseInt(H.element.css("left"),10)};
F&&F.length&&A(F[0]).css({width:K.width,height:K.height});
H._updateCache(K);
H._propagate("resize",I)
}})
}});
A.ui.plugin.add("resizable","containment",{start:function(){var I=A(this).data("resizable"),H=I.element,J=I.options.containment;
if(H=J instanceof A?J.get(0):/parent/.test(J)?H.parent().get(0):J){I.containerElement=A(H);
if(/document/.test(J)||J==document){I.containerOffset={left:0,top:0};
I.containerPosition={left:0,top:0};
I.parentData={element:A(document),left:0,top:0,width:A(document).width(),height:A(document).height()||document.body.parentNode.scrollHeight}
}else{var F=A(H),D=[];
A(["Top","Right","Left","Bottom"]).each(function(K,L){D[K]=B(F.css("padding"+L))
});
I.containerOffset=F.offset();
I.containerPosition=F.position();
I.containerSize={height:F.innerHeight()-D[3],width:F.innerWidth()-D[1]};
J=I.containerOffset;
var G=I.containerSize.height,E=I.containerSize.width;
E=A.ui.hasScroll(H,"left")?H.scrollWidth:E;
G=A.ui.hasScroll(H)?H.scrollHeight:G;
I.parentData={element:H,left:J.left,top:J.top,width:E,height:G}
}}},resize:function(I){var H=A(this).data("resizable"),J=H.options,F=H.containerOffset,D=H.position;
I=H._aspectRatio||I.shiftKey;
var G={top:0,left:0},E=H.containerElement;
if(E[0]!=document&&/static/.test(E.css("position"))){G=F
}if(D.left<(H._helper?F.left:0)){H.size.width+=H._helper?H.position.left-F.left:H.position.left-G.left;
if(I){H.size.height=H.size.width/J.aspectRatio
}H.position.left=J.helper?F.left:0
}if(D.top<(H._helper?F.top:0)){H.size.height+=H._helper?H.position.top-F.top:H.position.top;
if(I){H.size.width=H.size.height*J.aspectRatio
}H.position.top=H._helper?F.top:0
}H.offset.left=H.parentData.left+H.position.left;
H.offset.top=H.parentData.top+H.position.top;
J=Math.abs((H._helper?H.offset.left-G.left:H.offset.left-G.left)+H.sizeDiff.width);
F=Math.abs((H._helper?H.offset.top-G.top:H.offset.top-F.top)+H.sizeDiff.height);
D=H.containerElement.get(0)==H.element.parent().get(0);
G=/relative|absolute/.test(H.containerElement.css("position"));
if(D&&G){J-=H.parentData.left
}if(J+H.size.width>=H.parentData.width){H.size.width=H.parentData.width-J;
if(I){H.size.height=H.size.width/H.aspectRatio
}}if(F+H.size.height>=H.parentData.height){H.size.height=H.parentData.height-F;
if(I){H.size.width=H.size.height*H.aspectRatio
}}},stop:function(){var J=A(this).data("resizable"),I=J.options,K=J.containerOffset,G=J.containerPosition,D=J.containerElement,H=A(J.helper),F=H.offset(),E=H.outerWidth()-J.sizeDiff.width;
H=H.outerHeight()-J.sizeDiff.height;
J._helper&&!I.animate&&/relative/.test(D.css("position"))&&A(this).css({left:F.left-G.left-K.left,width:E,height:H});
J._helper&&!I.animate&&/static/.test(D.css("position"))&&A(this).css({left:F.left-G.left-K.left,width:E,height:H})
}});
A.ui.plugin.add("resizable","ghost",{start:function(){var E=A(this).data("resizable"),D=E.options,F=E.size;
E.ghost=E.originalElement.clone();
E.ghost.css({opacity:0.25,display:"block",position:"relative",height:F.height,width:F.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof D.ghost=="string"?D.ghost:"");
E.ghost.appendTo(E.helper)
},resize:function(){var D=A(this).data("resizable");
D.ghost&&D.ghost.css({position:"relative",height:D.size.height,width:D.size.width})
},stop:function(){var D=A(this).data("resizable");
D.ghost&&D.helper&&D.helper.get(0).removeChild(D.ghost.get(0))
}});
A.ui.plugin.add("resizable","grid",{resize:function(){var I=A(this).data("resizable"),H=I.options,J=I.size,F=I.originalSize,D=I.originalPosition,G=I.axis;
H.grid=typeof H.grid=="number"?[H.grid,H.grid]:H.grid;
var E=Math.round((J.width-F.width)/(H.grid[0]||1))*(H.grid[0]||1);
H=Math.round((J.height-F.height)/(H.grid[1]||1))*(H.grid[1]||1);
if(/^(se|s|e)$/.test(G)){I.size.width=F.width+E;
I.size.height=F.height+H
}else{if(/^(ne)$/.test(G)){I.size.width=F.width+E;
I.size.height=F.height+H;
I.position.top=D.top-H
}else{if(/^(sw)$/.test(G)){I.size.width=F.width+E;
I.size.height=F.height+H
}else{I.size.width=F.width+E;
I.size.height=F.height+H;
I.position.top=D.top-H
}I.position.left=D.left-E
}}}});
var B=function(D){return parseInt(D,10)||0
},C=function(D){return !isNaN(parseInt(D,10))
}
})(jQuery);
(function(A){A.widget("ui.selectable",A.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var B=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var C;
this.refresh=function(){C=A(B.options.filter,B.element[0]);
C.each(function(){var E=A(this),D=E.offset();
A.data(this,"selectable-item",{element:this,$element:E,left:D.left,top:D.top,right:D.left+E.outerWidth(),bottom:D.top+E.outerHeight(),startselected:false,selected:E.hasClass("ui-selected"),selecting:E.hasClass("ui-selecting"),unselecting:E.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=C.addClass("ui-selectee");
this._mouseInit();
this.helper=A("<div class='ui-selectable-helper'></div>")
},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");
this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy();
return this
},_mouseStart:function(C){var D=this;
this.opos=[C.pageX,C.pageY];
if(!this.options.disabled){var B=this.options;
this.selectees=A(B.filter,this.element[0]);
this._trigger("start",C);
A(B.appendTo).append(this.helper);
this.helper.css({left:C.clientX,top:C.clientY,width:0,height:0});
B.autoRefresh&&this.refresh();
this.selectees.filter(".ui-selected").each(function(){var E=A.data(this,"selectable-item");
E.startselected=true;
if(!C.metaKey){E.$element.removeClass("ui-selected");
E.selected=false;
E.$element.addClass("ui-unselecting");
E.unselecting=true;
D._trigger("unselecting",C,{unselecting:E.element})
}});
A(C.target).parents().andSelf().each(function(){var E=A.data(this,"selectable-item");
if(E){var F=!C.metaKey||!E.$element.hasClass("ui-selected");
E.$element.removeClass(F?"ui-unselecting":"ui-selected").addClass(F?"ui-selecting":"ui-unselecting");
E.unselecting=!F;
E.selecting=F;
(E.selected=F)?D._trigger("selecting",C,{selecting:E.element}):D._trigger("unselecting",C,{unselecting:E.element});
return false
}})
}},_mouseDrag:function(H){var I=this;
this.dragged=true;
if(!this.options.disabled){var F=this.options,E=this.opos[0],G=this.opos[1],C=H.pageX,B=H.pageY;
if(E>C){var D=C;
C=E;
E=D
}if(G>B){D=B;
B=G;
G=D
}this.helper.css({left:E,top:G,width:C-E,height:B-G});
this.selectees.each(function(){var K=A.data(this,"selectable-item");
if(!(!K||K.element==I.element[0])){var J=false;
if(F.tolerance=="touch"){J=!(K.left>C||K.right<E||K.top>B||K.bottom<G)
}else{if(F.tolerance=="fit"){J=K.left>E&&K.right<C&&K.top>G&&K.bottom<B
}}if(J){if(K.selected){K.$element.removeClass("ui-selected");
K.selected=false
}if(K.unselecting){K.$element.removeClass("ui-unselecting");
K.unselecting=false
}if(!K.selecting){K.$element.addClass("ui-selecting");
K.selecting=true;
I._trigger("selecting",H,{selecting:K.element})
}}else{if(K.selecting){if(H.metaKey&&K.startselected){K.$element.removeClass("ui-selecting");
K.selecting=false;
K.$element.addClass("ui-selected");
K.selected=true
}else{K.$element.removeClass("ui-selecting");
K.selecting=false;
if(K.startselected){K.$element.addClass("ui-unselecting");
K.unselecting=true
}I._trigger("unselecting",H,{unselecting:K.element})
}}if(K.selected){if(!H.metaKey&&!K.startselected){K.$element.removeClass("ui-selected");
K.selected=false;
K.$element.addClass("ui-unselecting");
K.unselecting=true;
I._trigger("unselecting",H,{unselecting:K.element})
}}}}});
return false
}},_mouseStop:function(B){var C=this;
this.dragged=false;
A(".ui-unselecting",this.element[0]).each(function(){var D=A.data(this,"selectable-item");
D.$element.removeClass("ui-unselecting");
D.unselecting=false;
D.startselected=false;
C._trigger("unselected",B,{unselected:D.element})
});
A(".ui-selecting",this.element[0]).each(function(){var D=A.data(this,"selectable-item");
D.$element.removeClass("ui-selecting").addClass("ui-selected");
D.selecting=false;
D.selected=true;
D.startselected=true;
C._trigger("selected",B,{selected:D.element})
});
this._trigger("stop",B);
this.helper.remove();
return false
}});
A.extend(A.ui.selectable,{version:"1.8.13"})
})(jQuery);
(function(A){A.widget("ui.sortable",A.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){var B=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?B.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit()
},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var B=this.items.length-1;
B>=0;
B--){this.items[B].item.removeData("sortable-item")
}return this
},_setOption:function(B,C){if(B==="disabled"){this.options[B]=C;
this.widget()[C?"addClass":"removeClass"]("ui-sortable-disabled")
}else{A.Widget.prototype._setOption.apply(this,arguments)
}},_mouseCapture:function(E,F){if(this.reverting){return false
}if(this.options.disabled||this.options.type=="static"){return false
}this._refreshItems(E);
var C=null,B=this;
A(E.target).parents().each(function(){if(A.data(this,"sortable-item")==B){C=A(this);
return false
}});
if(A.data(E.target,"sortable-item")==B){C=A(E.target)
}if(!C){return false
}if(this.options.handle&&!F){var D=false;
A(this.options.handle,C).find("*").andSelf().each(function(){if(this==E.target){D=true
}});
if(!D){return false
}}this.currentItem=C;
this._removeCurrentsFromItems();
return true
},_mouseStart:function(D,E,C){E=this.options;
var B=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(D);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
A.extend(this.offset,{click:{left:D.pageX-this.offset.left,top:D.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(D);
this.originalPageX=D.pageX;
this.originalPageY=D.pageY;
E.cursorAt&&this._adjustOffsetFromHelper(E.cursorAt);
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();
this._createPlaceholder();
E.containment&&this._setContainment();
if(E.cursor){if(A("body").css("cursor")){this._storedCursor=A("body").css("cursor")
}A("body").css("cursor",E.cursor)
}if(E.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",E.opacity)
}if(E.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",E.zIndex)
}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",D,this._uiHash());
this._preserveHelperProportions||this._cacheHelperProportions();
if(!C){for(C=this.containers.length-1;
C>=0;
C--){this.containers[C]._trigger("activate",D,B._uiHash(this))
}}if(A.ui.ddmanager){A.ui.ddmanager.current=this
}A.ui.ddmanager&&!E.dropBehaviour&&A.ui.ddmanager.prepareOffsets(this,D);
this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(D);
return true
},_mouseDrag:function(E){this.position=this._generatePosition(E);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){var F=this.options,C=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-E.pageY<F.scrollSensitivity){this.scrollParent[0].scrollTop=C=this.scrollParent[0].scrollTop+F.scrollSpeed
}else{if(E.pageY-this.overflowOffset.top<F.scrollSensitivity){this.scrollParent[0].scrollTop=C=this.scrollParent[0].scrollTop-F.scrollSpeed
}}if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-E.pageX<F.scrollSensitivity){this.scrollParent[0].scrollLeft=C=this.scrollParent[0].scrollLeft+F.scrollSpeed
}else{if(E.pageX-this.overflowOffset.left<F.scrollSensitivity){this.scrollParent[0].scrollLeft=C=this.scrollParent[0].scrollLeft-F.scrollSpeed
}}}else{if(E.pageY-A(document).scrollTop()<F.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()-F.scrollSpeed)
}else{if(A(window).height()-(E.pageY-A(document).scrollTop())<F.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()+F.scrollSpeed)
}}if(E.pageX-A(document).scrollLeft()<F.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()-F.scrollSpeed)
}else{if(A(window).width()-(E.pageX-A(document).scrollLeft())<F.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()+F.scrollSpeed)
}}}C!==false&&A.ui.ddmanager&&!F.dropBehaviour&&A.ui.ddmanager.prepareOffsets(this,E)
}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(F=this.items.length-1;
F>=0;
F--){C=this.items[F];
var B=C.item[0],D=this._intersectsWithPointer(C);
if(D){if(B!=this.currentItem[0]&&this.placeholder[D==1?"next":"prev"]()[0]!=B&&!A.ui.contains(this.placeholder[0],B)&&(this.options.type=="semi-dynamic"?!A.ui.contains(this.element[0],B):true)){this.direction=D==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(C)){this._rearrange(E,C)
}else{break
}this._trigger("change",E,this._uiHash());
break
}}}this._contactContainers(E);
A.ui.ddmanager&&A.ui.ddmanager.drag(this,E);
this._trigger("sort",E,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false
},_mouseStop:function(C,D){if(C){A.ui.ddmanager&&!this.options.dropBehaviour&&A.ui.ddmanager.drop(this,C);
if(this.options.revert){var B=this;
D=B.placeholder.offset();
B.reverting=true;
A(this.helper).animate({left:D.left-this.offset.parent.left-B.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:D.top-this.offset.parent.top-B.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){B._clear(C)
})
}else{this._clear(C,D)
}return false
}},cancel:function(){var B=this;
if(this.dragging){this._mouseUp({target:null});
this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();
for(var C=this.containers.length-1;
C>=0;
C--){this.containers[C]._trigger("deactivate",null,B._uiHash(this));
if(this.containers[C].containerCache.over){this.containers[C]._trigger("out",null,B._uiHash(this));
this.containers[C].containerCache.over=0
}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();
A.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
this.domPosition.prev?A(this.domPosition.prev).after(this.currentItem):A(this.domPosition.parent).prepend(this.currentItem)
}return this
},serialize:function(C){var D=this._getItemsAsjQuery(C&&C.connected),B=[];
C=C||{};
A(D).each(function(){var E=(A(C.item||this).attr(C.attribute||"id")||"").match(C.expression||/(.+)[-=_](.+)/);
if(E){B.push((C.key||E[1]+"[]")+"="+(C.key&&C.expression?E[1]:E[2]))
}});
!B.length&&C.key&&B.push(C.key+"=");
return B.join("&")
},toArray:function(C){var D=this._getItemsAsjQuery(C&&C.connected),B=[];
C=C||{};
D.each(function(){B.push(A(C.item||this).attr(C.attribute||"id")||"")
});
return B
},_intersectsWith:function(J){var K=this.positionAbs.left,H=K+this.helperProportions.width,G=this.positionAbs.top,I=G+this.helperProportions.height,E=J.left,L=E+J.width,F=J.top,D=F+J.height,C=this.offset.click.top,B=this.offset.click.left;
C=G+C>F&&G+C<D&&K+B>E&&K+B<L;
return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>J[this.floating?"width":"height"]?C:E<K+this.helperProportions.width/2&&H-this.helperProportions.width/2<L&&F<G+this.helperProportions.height/2&&I-this.helperProportions.height/2<D
},_intersectsWithPointer:function(C){var D=A.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,C.top,C.height);
C=A.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,C.left,C.width);
D=D&&C;
C=this._getDragVerticalDirection();
var B=this._getDragHorizontalDirection();
if(!D){return false
}return this.floating?B&&B=="right"||C=="down"?2:1:C&&(C=="down"?2:1)
},_intersectsWithSides:function(D){var E=A.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,D.top+D.height/2,D.height);
D=A.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,D.left+D.width/2,D.width);
var C=this._getDragVerticalDirection(),B=this._getDragHorizontalDirection();
return this.floating&&B?B=="right"&&D||B=="left"&&!D:C&&(C=="down"&&E||C=="up"&&!E)
},_getDragVerticalDirection:function(){var B=this.positionAbs.top-this.lastPositionAbs.top;
return B!=0&&(B>0?"down":"up")
},_getDragHorizontalDirection:function(){var B=this.positionAbs.left-this.lastPositionAbs.left;
return B!=0&&(B>0?"right":"left")
},refresh:function(B){this._refreshItems(B);
this.refreshPositions();
return this
},_connectWith:function(){var B=this.options;
return B.connectWith.constructor==String?[B.connectWith]:B.connectWith
},_getItemsAsjQuery:function(G){var H=[],E=[],D=this._connectWith();
if(D&&G){for(G=D.length-1;
G>=0;
G--){for(var F=A(D[G]),C=F.length-1;
C>=0;
C--){var B=A.data(F[C],"sortable");
if(B&&B!=this&&!B.options.disabled){E.push([A.isFunction(B.options.items)?B.options.items.call(B.element):A(B.options.items,B.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),B])
}}}}E.push([A.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):A(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(G=E.length-1;
G>=0;
G--){E[G][0].each(function(){H.push(this)
})
}return A(H)
},_removeCurrentsFromItems:function(){for(var C=this.currentItem.find(":data(sortable-item)"),D=0;
D<this.items.length;
D++){for(var B=0;
B<C.length;
B++){C[B]==this.items[D].item[0]&&this.items.splice(D,1)
}}},_refreshItems:function(H){this.items=[];
this.containers=[this];
var I=this.items,F=[[A.isFunction(this.options.items)?this.options.items.call(this.element[0],H,{item:this.currentItem}):A(this.options.items,this.element),this]],E=this._connectWith();
if(E){for(var G=E.length-1;
G>=0;
G--){for(var C=A(E[G]),B=C.length-1;
B>=0;
B--){var D=A.data(C[B],"sortable");
if(D&&D!=this&&!D.options.disabled){F.push([A.isFunction(D.options.items)?D.options.items.call(D.element[0],H,{item:this.currentItem}):A(D.options.items,D.element),D]);
this.containers.push(D)
}}}}for(G=F.length-1;
G>=0;
G--){H=F[G][1];
E=F[G][0];
B=0;
for(C=E.length;
B<C;
B++){D=A(E[B]);
D.data("sortable-item",H);
I.push({item:D,instance:H,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(D){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}for(var E=this.items.length-1;
E>=0;
E--){var C=this.items[E];
if(!(C.instance!=this.currentContainer&&this.currentContainer&&C.item[0]!=this.currentItem[0])){var B=this.options.toleranceElement?A(this.options.toleranceElement,C.item):C.item;
if(!D){C.width=B.outerWidth();
C.height=B.outerHeight()
}B=B.offset();
C.left=B.left;
C.top=B.top
}}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(E=this.containers.length-1;
E>=0;
E--){B=this.containers[E].element.offset();
this.containers[E].containerCache.left=B.left;
this.containers[E].containerCache.top=B.top;
this.containers[E].containerCache.width=this.containers[E].element.outerWidth();
this.containers[E].containerCache.height=this.containers[E].element.outerHeight()
}}return this
},_createPlaceholder:function(D){var E=D||this,C=E.options;
if(!C.placeholder||C.placeholder.constructor==String){var B=C.placeholder;
C.placeholder={element:function(){var F=A(document.createElement(E.currentItem[0].nodeName)).addClass(B||E.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!B){F.style.visibility="hidden"
}return F
},update:function(G,F){if(!(B&&!C.forcePlaceholderSize)){F.height()||F.height(E.currentItem.innerHeight()-parseInt(E.currentItem.css("paddingTop")||0,10)-parseInt(E.currentItem.css("paddingBottom")||0,10));
F.width()||F.width(E.currentItem.innerWidth()-parseInt(E.currentItem.css("paddingLeft")||0,10)-parseInt(E.currentItem.css("paddingRight")||0,10))
}}}
}E.placeholder=A(C.placeholder.element.call(E.element,E.currentItem));
E.currentItem.after(E.placeholder);
C.placeholder.update(E,E.placeholder)
},_contactContainers:function(G){for(var H=null,E=null,D=this.containers.length-1;
D>=0;
D--){if(!A.ui.contains(this.currentItem[0],this.containers[D].element[0])){if(this._intersectsWith(this.containers[D].containerCache)){if(!(H&&A.ui.contains(this.containers[D].element[0],H.element[0]))){H=this.containers[D];
E=D
}}else{if(this.containers[D].containerCache.over){this.containers[D]._trigger("out",G,this._uiHash(this));
this.containers[D].containerCache.over=0
}}}}if(H){if(this.containers.length===1){this.containers[E]._trigger("over",G,this._uiHash(this));
this.containers[E].containerCache.over=1
}else{if(this.currentContainer!=this.containers[E]){H=10000;
D=null;
for(var F=this.positionAbs[this.containers[E].floating?"left":"top"],C=this.items.length-1;
C>=0;
C--){if(A.ui.contains(this.containers[E].element[0],this.items[C].item[0])){var B=this.items[C][this.containers[E].floating?"left":"top"];
if(Math.abs(B-F)<H){H=Math.abs(B-F);
D=this.items[C]
}}}if(D||this.options.dropOnEmpty){this.currentContainer=this.containers[E];
D?this._rearrange(G,D,null,true):this._rearrange(G,null,this.containers[E].element,true);
this._trigger("change",G,this._uiHash());
this.containers[E]._trigger("change",G,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[E]._trigger("over",G,this._uiHash(this));
this.containers[E].containerCache.over=1
}}}}},_createHelper:function(B){var C=this.options;
B=A.isFunction(C.helper)?A(C.helper.apply(this.element[0],[B,this.currentItem])):C.helper=="clone"?this.currentItem.clone():this.currentItem;
B.parents("body").length||A(C.appendTo!="parent"?C.appendTo:this.currentItem[0].parentNode)[0].appendChild(B[0]);
if(B[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(B[0].style.width==""||C.forceHelperSize){B.width(this.currentItem.width())
}if(B[0].style.height==""||C.forceHelperSize){B.height(this.currentItem.height())
}return B
},_adjustOffsetFromHelper:function(B){if(typeof B=="string"){B=B.split(" ")
}if(A.isArray(B)){B={left:+B[0],top:+B[1]||0}
}if("left" in B){this.offset.click.left=B.left+this.margins.left
}if("right" in B){this.offset.click.left=this.helperProportions.width-B.right+this.margins.left
}if("top" in B){this.offset.click.top=B.top+this.margins.top
}if("bottom" in B){this.offset.click.top=this.helperProportions.height-B.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var B=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0])){B.left+=this.scrollParent.scrollLeft();
B.top+=this.scrollParent.scrollTop()
}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&A.browser.msie){B={top:0,left:0}
}return{top:B.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:B.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var B=this.currentItem.position();
return{top:B.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:B.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var C=this.options;
if(C.containment=="parent"){C.containment=this.helper[0].parentNode
}if(C.containment=="document"||C.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,A(C.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(A(C.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!/^(document|window|parent)$/.test(C.containment)){var D=A(C.containment)[0];
C=A(C.containment).offset();
var B=A(D).css("overflow")!="hidden";
this.containment=[C.left+(parseInt(A(D).css("borderLeftWidth"),10)||0)+(parseInt(A(D).css("paddingLeft"),10)||0)-this.margins.left,C.top+(parseInt(A(D).css("borderTopWidth"),10)||0)+(parseInt(A(D).css("paddingTop"),10)||0)-this.margins.top,C.left+(B?Math.max(D.scrollWidth,D.offsetWidth):D.offsetWidth)-(parseInt(A(D).css("borderLeftWidth"),10)||0)-(parseInt(A(D).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,C.top+(B?Math.max(D.scrollHeight,D.offsetHeight):D.offsetHeight)-(parseInt(A(D).css("borderTopWidth"),10)||0)-(parseInt(A(D).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(D,E){if(!E){E=this.position
}D=D=="absolute"?1:-1;
var C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,B=/(html|body)/i.test(C[0].tagName);
return{top:E.top+this.offset.relative.top*D+this.offset.parent.top*D-(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():B?0:C.scrollTop())*D),left:E.left+this.offset.relative.left*D+this.offset.parent.left*D-(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():B?0:C.scrollLeft())*D)}
},_generatePosition:function(F){var G=this.options,D=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,C=/(html|body)/i.test(D[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var E=F.pageX,B=F.pageY;
if(this.originalPosition){if(this.containment){if(F.pageX-this.offset.click.left<this.containment[0]){E=this.containment[0]+this.offset.click.left
}if(F.pageY-this.offset.click.top<this.containment[1]){B=this.containment[1]+this.offset.click.top
}if(F.pageX-this.offset.click.left>this.containment[2]){E=this.containment[2]+this.offset.click.left
}if(F.pageY-this.offset.click.top>this.containment[3]){B=this.containment[3]+this.offset.click.top
}}if(G.grid){B=this.originalPageY+Math.round((B-this.originalPageY)/G.grid[1])*G.grid[1];
B=this.containment?!(B-this.offset.click.top<this.containment[1]||B-this.offset.click.top>this.containment[3])?B:!(B-this.offset.click.top<this.containment[1])?B-G.grid[1]:B+G.grid[1]:B;
E=this.originalPageX+Math.round((E-this.originalPageX)/G.grid[0])*G.grid[0];
E=this.containment?!(E-this.offset.click.left<this.containment[0]||E-this.offset.click.left>this.containment[2])?E:!(E-this.offset.click.left<this.containment[0])?E-G.grid[0]:E+G.grid[0]:E
}}return{top:B-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(A.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():C?0:D.scrollTop()),left:E-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(A.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():C?0:D.scrollLeft())}
},_rearrange:function(F,G,D,C){D?D[0].appendChild(this.placeholder[0]):G.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?G.item[0]:G.item[0].nextSibling);
this.counter=this.counter?++this.counter:1;
var E=this,B=this.counter;
window.setTimeout(function(){B==E.counter&&E.refreshPositions(!C)
},0)
},_clear:function(D,E){this.reverting=false;
var C=[];
!this._noFinalSort&&this.currentItem[0].parentNode&&this.placeholder.before(this.currentItem);
this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var B in this._storedCSS){if(this._storedCSS[B]=="auto"||this._storedCSS[B]=="static"){this._storedCSS[B]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}this.fromOutside&&!E&&C.push(function(F){this._trigger("receive",F,this._uiHash(this.fromOutside))
});
if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!E){C.push(function(F){this._trigger("update",F,this._uiHash())
})
}if(!A.ui.contains(this.element[0],this.currentItem[0])){E||C.push(function(F){this._trigger("remove",F,this._uiHash())
});
for(B=this.containers.length-1;
B>=0;
B--){if(A.ui.contains(this.containers[B].element[0],this.currentItem[0])&&!E){C.push(function(F){return function(G){F._trigger("receive",G,this._uiHash(this))
}
}.call(this,this.containers[B]));
C.push(function(F){return function(G){F._trigger("update",G,this._uiHash(this))
}
}.call(this,this.containers[B]))
}}}for(B=this.containers.length-1;
B>=0;
B--){E||C.push(function(F){return function(G){F._trigger("deactivate",G,this._uiHash(this))
}
}.call(this,this.containers[B]));
if(this.containers[B].containerCache.over){C.push(function(F){return function(G){F._trigger("out",G,this._uiHash(this))
}
}.call(this,this.containers[B]));
this.containers[B].containerCache.over=0
}}this._storedCursor&&A("body").css("cursor",this._storedCursor);
this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);
if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)
}this.dragging=false;
if(this.cancelHelperRemoval){if(!E){this._trigger("beforeStop",D,this._uiHash());
for(B=0;
B<C.length;
B++){C[B].call(this,D)
}this._trigger("stop",D,this._uiHash())
}return false
}E||this._trigger("beforeStop",D,this._uiHash());
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
this.helper[0]!=this.currentItem[0]&&this.helper.remove();
this.helper=null;
if(!E){for(B=0;
B<C.length;
B++){C[B].call(this,D)
}this._trigger("stop",D,this._uiHash())
}this.fromOutside=false;
return true
},_trigger:function(){A.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()
},_uiHash:function(B){var C=B||this;
return{helper:C.helper,placeholder:C.placeholder||A([]),position:C.position,originalPosition:C.originalPosition,offset:C.positionAbs,item:C.currentItem,sender:B?B.element:null}
}});
A.extend(A.ui.sortable,{version:"1.8.13"})
})(jQuery);
jQuery.effects||function(L,I){function J(N){var M;
if(N&&N.constructor==Array&&N.length==3){return N
}if(M=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(N)){return[parseInt(M[1],10),parseInt(M[2],10),parseInt(M[3],10)]
}if(M=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(N)){return[parseFloat(M[1])*2.55,parseFloat(M[2])*2.55,parseFloat(M[3])*2.55]
}if(M=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(N)){return[parseInt(M[1],16),parseInt(M[2],16),parseInt(M[3],16)]
}if(M=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(N)){return[parseInt(M[1]+M[1],16),parseInt(M[2]+M[2],16),parseInt(M[3]+M[3],16)]
}if(/rgba\(0, 0, 0, 0\)/.exec(N)){return C.transparent
}return C[L.trim(N).toLowerCase()]
}function G(O,N){var M;
do{M=L.curCSS(O,N);
if(M!=""&&M!="transparent"||L.nodeName(O,"body")){break
}N="backgroundColor"
}while(O=O.parentNode);
return J(M)
}function F(){var Q=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,N={},M,P;
if(Q&&Q.length&&Q[0]&&Q[Q[0]]){for(var O=Q.length;
O--;
){M=Q[O];
if(typeof Q[M]=="string"){P=M.replace(/\-(\w)/g,function(R,S){return S.toUpperCase()
});
N[P]=Q[M]
}}}else{for(M in Q){if(typeof Q[M]==="string"){N[M]=Q[M]
}}}return N
}function H(O){var N,M;
for(N in O){M=O[N];
if(M==null||L.isFunction(M)||N in A||/scrollbar/.test(N)||!/color/i.test(N)&&isNaN(parseFloat(M))){delete O[N]
}}return O
}function D(P,N){var M={_:0},O;
for(O in N){if(P[O]!=N[O]){M[O]=N[O]
}}return M
}function K(P,N,M,O){if(typeof P=="object"){O=N;
M=null;
N=P;
P=N.effect
}if(L.isFunction(N)){O=N;
M=null;
N={}
}if(typeof N=="number"||L.fx.speeds[N]){O=M;
M=N;
N={}
}if(L.isFunction(M)){O=M;
M=null
}N=N||{};
M=M||N.duration;
M=L.fx.off?0:typeof M=="number"?M:M in L.fx.speeds?L.fx.speeds[M]:L.fx.speeds._default;
O=O||N.complete;
return[P,N,M,O]
}function E(M){if(!M||typeof M==="number"||L.fx.speeds[M]){return true
}if(typeof M==="string"&&!L.effects[M]){return true
}return false
}L.effects={};
L.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(N,M){L.fx.step[M]=function(O){if(!O.colorInit){O.start=G(O.elem,M);
O.end=J(O.end);
O.colorInit=true
}O.elem.style[M]="rgb("+Math.max(Math.min(parseInt(O.pos*(O.end[0]-O.start[0])+O.start[0],10),255),0)+","+Math.max(Math.min(parseInt(O.pos*(O.end[1]-O.start[1])+O.start[1],10),255),0)+","+Math.max(Math.min(parseInt(O.pos*(O.end[2]-O.start[2])+O.start[2],10),255),0)+")"
}
});
var C={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},B=["add","remove","toggle"],A={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
L.effects.animateClass=function(P,N,M,O){if(L.isFunction(M)){O=M;
M=null
}return this.queue(function(){var U=L(this),S=U.attr("style")||" ",T=H(F.call(this)),R,Q=U.attr("class");
L.each(B,function(W,V){P[V]&&U[V+"Class"](P[V])
});
R=H(F.call(this));
U.attr("class",Q);
U.animate(D(T,R),{queue:false,duration:N,easding:M,complete:function(){L.each(B,function(W,V){P[V]&&U[V+"Class"](P[V])
});
if(typeof U.attr("style")=="object"){U.attr("style").cssText="";
U.attr("style").cssText=S
}else{U.attr("style",S)
}O&&O.apply(this,arguments);
L.dequeue(this)
}})
})
};
L.fn.extend({_addClass:L.fn.addClass,addClass:function(P,N,M,O){return N?L.effects.animateClass.apply(this,[{add:P},N,M,O]):this._addClass(P)
},_removeClass:L.fn.removeClass,removeClass:function(P,N,M,O){return N?L.effects.animateClass.apply(this,[{remove:P},N,M,O]):this._removeClass(P)
},_toggleClass:L.fn.toggleClass,toggleClass:function(Q,N,M,P,O){return typeof N=="boolean"||N===I?M?L.effects.animateClass.apply(this,[N?{add:Q}:{remove:Q},M,P,O]):this._toggleClass(Q,N):L.effects.animateClass.apply(this,[{toggle:Q},N,M,P])
},switchClass:function(Q,N,M,P,O){return L.effects.animateClass.apply(this,[{add:N,remove:Q},M,P,O])
}});
L.extend(L.effects,{version:"1.8.13",save:function(O,N){for(var M=0;
M<N.length;
M++){N[M]!==null&&O.data("ec.storage."+N[M],O[0].style[N[M]])
}},restore:function(O,N){for(var M=0;
M<N.length;
M++){N[M]!==null&&O.css(N[M],O.data("ec.storage."+N[M]))
}},setMode:function(N,M){if(M=="toggle"){M=N.is(":hidden")?"show":"hide"
}return M
},getBaseline:function(O,N){var M;
switch(O[0]){case"top":M=0;
break;
case"middle":M=0.5;
break;
case"bottom":M=1;
break;
default:M=O[0]/N.height
}switch(O[1]){case"left":O=0;
break;
case"center":O=0.5;
break;
case"right":O=1;
break;
default:O=O[1]/N.width
}return{x:O,y:M}
},createWrapper:function(O){if(O.parent().is(".ui-effects-wrapper")){return O.parent()
}var N={width:O.outerWidth(true),height:O.outerHeight(true),"float":O.css("float")},M=L("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});
O.wrap(M);
M=O.parent();
if(O.css("position")=="static"){M.css({position:"relative"});
O.css({position:"relative"})
}else{L.extend(N,{position:O.css("position"),zIndex:O.css("z-index")});
L.each(["top","left","bottom","right"],function(Q,P){N[P]=O.css(P);
if(isNaN(parseInt(N[P],10))){N[P]="auto"
}});
O.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})
}return M.css(N).show()
},removeWrapper:function(M){if(M.parent().is(".ui-effects-wrapper")){return M.parent().replaceWith(M)
}return M
},setTransition:function(P,N,M,O){O=O||{};
L.each(N,function(R,Q){unit=P.cssUnit(Q);
if(unit[0]>0){O[Q]=unit[0]*M+unit[1]
}});
return O
}});
L.fn.extend({effect:function(P){var N=K.apply(this,arguments),M={options:N[1],duration:N[2],callback:N[3]};
N=M.options.mode;
var O=L.effects[P];
if(L.fx.off||!O){return N?this[N](M.duration,M.callback):this.each(function(){M.callback&&M.callback.call(this)
})
}return O.call(this,M)
},_show:L.fn.show,show:function(N){if(E(N)){return this._show.apply(this,arguments)
}else{var M=K.apply(this,arguments);
M[1].mode="show";
return this.effect.apply(this,M)
}},_hide:L.fn.hide,hide:function(N){if(E(N)){return this._hide.apply(this,arguments)
}else{var M=K.apply(this,arguments);
M[1].mode="hide";
return this.effect.apply(this,M)
}},__toggle:L.fn.toggle,toggle:function(N){if(E(N)||typeof N==="boolean"||L.isFunction(N)){return this.__toggle.apply(this,arguments)
}else{var M=K.apply(this,arguments);
M[1].mode="toggle";
return this.effect.apply(this,M)
}},cssUnit:function(O){var N=this.css(O),M=[];
L.each(["em","px","%","pt"],function(Q,P){if(N.indexOf(P)>0){M=[parseFloat(N),P]
}});
return M
}});
L.easing.jswing=L.easing.swing;
L.extend(L.easing,{def:"easeOutQuad",swing:function(Q,N,M,P,O){return L.easing[L.easing.def](Q,N,M,P,O)
},easeInQuad:function(Q,N,M,P,O){return P*(N/=O)*N+M
},easeOutQuad:function(Q,N,M,P,O){return -P*(N/=O)*(N-2)+M
},easeInOutQuad:function(Q,N,M,P,O){if((N/=O/2)<1){return P/2*N*N+M
}return -P/2*(--N*(N-2)-1)+M
},easeInCubic:function(Q,N,M,P,O){return P*(N/=O)*N*N+M
},easeOutCubic:function(Q,N,M,P,O){return P*((N=N/O-1)*N*N+1)+M
},easeInOutCubic:function(Q,N,M,P,O){if((N/=O/2)<1){return P/2*N*N*N+M
}return P/2*((N-=2)*N*N+2)+M
},easeInQuart:function(Q,N,M,P,O){return P*(N/=O)*N*N*N+M
},easeOutQuart:function(Q,N,M,P,O){return -P*((N=N/O-1)*N*N*N-1)+M
},easeInOutQuart:function(Q,N,M,P,O){if((N/=O/2)<1){return P/2*N*N*N*N+M
}return -P/2*((N-=2)*N*N*N-2)+M
},easeInQuint:function(Q,N,M,P,O){return P*(N/=O)*N*N*N*N+M
},easeOutQuint:function(Q,N,M,P,O){return P*((N=N/O-1)*N*N*N*N+1)+M
},easeInOutQuint:function(Q,N,M,P,O){if((N/=O/2)<1){return P/2*N*N*N*N*N+M
}return P/2*((N-=2)*N*N*N*N+2)+M
},easeInSine:function(Q,N,M,P,O){return -P*Math.cos(N/O*(Math.PI/2))+P+M
},easeOutSine:function(Q,N,M,P,O){return P*Math.sin(N/O*(Math.PI/2))+M
},easeInOutSine:function(Q,N,M,P,O){return -P/2*(Math.cos(Math.PI*N/O)-1)+M
},easeInExpo:function(Q,N,M,P,O){return N==0?M:P*Math.pow(2,10*(N/O-1))+M
},easeOutExpo:function(Q,N,M,P,O){return N==O?M+P:P*(-Math.pow(2,-10*N/O)+1)+M
},easeInOutExpo:function(Q,N,M,P,O){if(N==0){return M
}if(N==O){return M+P
}if((N/=O/2)<1){return P/2*Math.pow(2,10*(N-1))+M
}return P/2*(-Math.pow(2,-10*--N)+2)+M
},easeInCirc:function(Q,N,M,P,O){return -P*(Math.sqrt(1-(N/=O)*N)-1)+M
},easeOutCirc:function(Q,N,M,P,O){return P*Math.sqrt(1-(N=N/O-1)*N)+M
},easeInOutCirc:function(Q,N,M,P,O){if((N/=O/2)<1){return -P/2*(Math.sqrt(1-N*N)-1)+M
}return P/2*(Math.sqrt(1-(N-=2)*N)+1)+M
},easeInElastic:function(S,N,M,R,Q){S=1.70158;
var O=0,P=R;
if(N==0){return M
}if((N/=Q)==1){return M+R
}O||(O=Q*0.3);
if(P<Math.abs(R)){P=R;
S=O/4
}else{S=O/(2*Math.PI)*Math.asin(R/P)
}return -(P*Math.pow(2,10*(N-=1))*Math.sin((N*Q-S)*2*Math.PI/O))+M
},easeOutElastic:function(S,N,M,R,Q){S=1.70158;
var O=0,P=R;
if(N==0){return M
}if((N/=Q)==1){return M+R
}O||(O=Q*0.3);
if(P<Math.abs(R)){P=R;
S=O/4
}else{S=O/(2*Math.PI)*Math.asin(R/P)
}return P*Math.pow(2,-10*N)*Math.sin((N*Q-S)*2*Math.PI/O)+R+M
},easeInOutElastic:function(S,N,M,R,Q){S=1.70158;
var O=0,P=R;
if(N==0){return M
}if((N/=Q/2)==2){return M+R
}O||(O=Q*0.3*1.5);
if(P<Math.abs(R)){P=R;
S=O/4
}else{S=O/(2*Math.PI)*Math.asin(R/P)
}if(N<1){return -0.5*P*Math.pow(2,10*(N-=1))*Math.sin((N*Q-S)*2*Math.PI/O)+M
}return P*Math.pow(2,-10*(N-=1))*Math.sin((N*Q-S)*2*Math.PI/O)*0.5+R+M
},easeInBack:function(R,N,M,Q,P,O){if(O==I){O=1.70158
}return Q*(N/=P)*N*((O+1)*N-O)+M
},easeOutBack:function(R,N,M,Q,P,O){if(O==I){O=1.70158
}return Q*((N=N/P-1)*N*((O+1)*N+O)+1)+M
},easeInOutBack:function(R,N,M,Q,P,O){if(O==I){O=1.70158
}if((N/=P/2)<1){return Q/2*N*N*(((O*=1.525)+1)*N-O)+M
}return Q/2*((N-=2)*N*(((O*=1.525)+1)*N+O)+2)+M
},easeInBounce:function(Q,N,M,P,O){return P-L.easing.easeOutBounce(Q,O-N,0,P,O)+M
},easeOutBounce:function(Q,N,M,P,O){return(N/=O)<1/2.75?P*7.5625*N*N+M:N<2/2.75?P*(7.5625*(N-=1.5/2.75)*N+0.75)+M:N<2.5/2.75?P*(7.5625*(N-=2.25/2.75)*N+0.9375)+M:P*(7.5625*(N-=2.625/2.75)*N+0.984375)+M
},easeInOutBounce:function(Q,N,M,P,O){if(N<O/2){return L.easing.easeInBounce(Q,N*2,0,P,O)*0.5+M
}return L.easing.easeOutBounce(Q,N*2-O,0,P,O)*0.5+P*0.5+M
}})
}(jQuery);
(function(A){A.effects.blind=function(B){return this.queue(function(){var I=A(this),G=["position","top","bottom","left","right"],F=A.effects.setMode(I,B.options.mode||"hide"),H=B.options.direction||"vertical";
A.effects.save(I,G);
I.show();
var D=A.effects.createWrapper(I).css({overflow:"hidden"}),C=H=="vertical"?"height":"width";
H=H=="vertical"?D.height():D.width();
F=="show"&&D.css(C,0);
var E={};
E[C]=F=="show"?H:0;
D.animate(E,B.duration,B.options.easing,function(){F=="hide"&&I.hide();
A.effects.restore(I,G);
A.effects.removeWrapper(I);
B.callback&&B.callback.apply(I[0],arguments);
I.dequeue()
})
})
}
})(jQuery);
(function(A){A.effects.bounce=function(B){return this.queue(function(){var L=A(this),J=["position","top","bottom","left","right"],I=A.effects.setMode(L,B.options.mode||"effect"),K=B.options.direction||"up",G=B.options.distance||20,M=B.options.times||5,H=B.duration||250;
/show|hide/.test(I)&&J.push("opacity");
A.effects.save(L,J);
L.show();
A.effects.createWrapper(L);
var F=K=="up"||K=="down"?"top":"left";
K=K=="up"||K=="left"?"pos":"neg";
G=B.options.distance||(F=="top"?L.outerHeight({margin:true})/3:L.outerWidth({margin:true})/3);
if(I=="show"){L.css("opacity",0).css(F,K=="pos"?-G:G)
}if(I=="hide"){G/=M*2
}I!="hide"&&M--;
if(I=="show"){var E={opacity:1};
E[F]=(K=="pos"?"+=":"-=")+G;
L.animate(E,H/2,B.options.easing);
G/=2;
M--
}for(E=0;
E<M;
E++){var C={},D={};
C[F]=(K=="pos"?"-=":"+=")+G;
D[F]=(K=="pos"?"+=":"-=")+G;
L.animate(C,H/2,B.options.easing).animate(D,H/2,B.options.easing);
G=I=="hide"?G*2:G/2
}if(I=="hide"){E={opacity:0};
E[F]=(K=="pos"?"-=":"+=")+G;
L.animate(E,H/2,B.options.easing,function(){L.hide();
A.effects.restore(L,J);
A.effects.removeWrapper(L);
B.callback&&B.callback.apply(this,arguments)
})
}else{C={};
D={};
C[F]=(K=="pos"?"-=":"+=")+G;
D[F]=(K=="pos"?"+=":"-=")+G;
L.animate(C,H/2,B.options.easing).animate(D,H/2,B.options.easing,function(){A.effects.restore(L,J);
A.effects.removeWrapper(L);
B.callback&&B.callback.apply(this,arguments)
})
}L.queue("fx",function(){L.dequeue()
});
L.dequeue()
})
}
})(jQuery);
(function(A){A.effects.clip=function(B){return this.queue(function(){var I=A(this),G=["position","top","bottom","left","right","height","width"],F=A.effects.setMode(I,B.options.mode||"hide"),H=B.options.direction||"vertical";
A.effects.save(I,G);
I.show();
var D=A.effects.createWrapper(I).css({overflow:"hidden"});
D=I[0].tagName=="IMG"?D:I;
var C={size:H=="vertical"?"height":"width",position:H=="vertical"?"top":"left"};
H=H=="vertical"?D.height():D.width();
if(F=="show"){D.css(C.size,0);
D.css(C.position,H/2)
}var E={};
E[C.size]=F=="show"?H:0;
E[C.position]=F=="show"?0:H/2;
D.animate(E,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){F=="hide"&&I.hide();
A.effects.restore(I,G);
A.effects.removeWrapper(I);
B.callback&&B.callback.apply(I[0],arguments);
I.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.drop=function(B){return this.queue(function(){var I=A(this),G=["position","top","bottom","left","right","opacity"],F=A.effects.setMode(I,B.options.mode||"hide"),H=B.options.direction||"left";
A.effects.save(I,G);
I.show();
A.effects.createWrapper(I);
var D=H=="up"||H=="down"?"top":"left";
H=H=="up"||H=="left"?"pos":"neg";
var C=B.options.distance||(D=="top"?I.outerHeight({margin:true})/2:I.outerWidth({margin:true})/2);
if(F=="show"){I.css("opacity",0).css(D,H=="pos"?-C:C)
}var E={opacity:F=="show"?1:0};
E[D]=(F=="show"?H=="pos"?"+=":"-=":H=="pos"?"-=":"+=")+C;
I.animate(E,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){F=="hide"&&I.hide();
A.effects.restore(I,G);
A.effects.removeWrapper(I);
B.callback&&B.callback.apply(this,arguments);
I.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.explode=function(B){return this.queue(function(){var J=B.options.pieces?Math.round(Math.sqrt(B.options.pieces)):3,H=B.options.pieces?Math.round(Math.sqrt(B.options.pieces)):3;
B.options.mode=B.options.mode=="toggle"?A(this).is(":visible")?"hide":"show":B.options.mode;
var G=A(this).show().css("visibility","hidden"),I=G.offset();
I.top-=parseInt(G.css("marginTop"),10)||0;
I.left-=parseInt(G.css("marginLeft"),10)||0;
for(var E=G.outerWidth(true),C=G.outerHeight(true),F=0;
F<J;
F++){for(var D=0;
D<H;
D++){G.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-D*(E/H),top:-F*(C/J)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:E/H,height:C/J,left:I.left+D*(E/H)+(B.options.mode=="show"?(D-Math.floor(H/2))*(E/H):0),top:I.top+F*(C/J)+(B.options.mode=="show"?(F-Math.floor(J/2))*(C/J):0),opacity:B.options.mode=="show"?0:1}).animate({left:I.left+D*(E/H)+(B.options.mode=="show"?0:(D-Math.floor(H/2))*(E/H)),top:I.top+F*(C/J)+(B.options.mode=="show"?0:(F-Math.floor(J/2))*(C/J)),opacity:B.options.mode=="show"?1:0},B.duration||500)
}}setTimeout(function(){B.options.mode=="show"?G.css({visibility:"visible"}):G.css({visibility:"visible"}).hide();
B.callback&&B.callback.apply(G[0]);
G.dequeue();
A("div.ui-effects-explode").remove()
},B.duration||500)
})
}
})(jQuery);
(function(A){A.effects.fade=function(B){return this.queue(function(){var D=A(this),C=A.effects.setMode(D,B.options.mode||"hide");
D.animate({opacity:C},{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){B.callback&&B.callback.apply(this,arguments);
D.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.fold=function(B){return this.queue(function(){var K=A(this),I=["position","top","bottom","left","right"],H=A.effects.setMode(K,B.options.mode||"hide"),J=B.options.size||15,F=!!B.options.horizFirst,L=B.duration?B.duration/2:A.fx.speeds._default/2;
A.effects.save(K,I);
K.show();
var G=A.effects.createWrapper(K).css({overflow:"hidden"}),E=H=="show"!=F,D=E?["width","height"]:["height","width"];
E=E?[G.width(),G.height()]:[G.height(),G.width()];
var C=/([0-9]+)%/.exec(J);
if(C){J=parseInt(C[1],10)/100*E[H=="hide"?0:1]
}if(H=="show"){G.css(F?{height:0,width:J}:{height:J,width:0})
}F={};
C={};
F[D[0]]=H=="show"?E[0]:J;
C[D[1]]=H=="show"?E[1]:0;
G.animate(F,L,B.options.easing).animate(C,L,B.options.easing,function(){H=="hide"&&K.hide();
A.effects.restore(K,I);
A.effects.removeWrapper(K);
B.callback&&B.callback.apply(K[0],arguments);
K.dequeue()
})
})
}
})(jQuery);
(function(A){A.effects.highlight=function(B){return this.queue(function(){var F=A(this),D=["backgroundImage","backgroundColor","opacity"],C=A.effects.setMode(F,B.options.mode||"show"),E={backgroundColor:F.css("backgroundColor")};
if(C=="hide"){E.opacity=0
}A.effects.save(F,D);
F.show().css({backgroundImage:"none",backgroundColor:B.options.color||"#ffff99"}).animate(E,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){C=="hide"&&F.hide();
A.effects.restore(F,D);
C=="show"&&!A.support.opacity&&this.style.removeAttribute("filter");
B.callback&&B.callback.apply(this,arguments);
F.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.pulsate=function(B){return this.queue(function(){var D=A(this),C=A.effects.setMode(D,B.options.mode||"show");
times=(B.options.times||5)*2-1;
duration=B.duration?B.duration/2:A.fx.speeds._default/2;
isVisible=D.is(":visible");
animateTo=0;
if(!isVisible){D.css("opacity",0).show();
animateTo=1
}if(C=="hide"&&isVisible||C=="show"&&!isVisible){times--
}for(C=0;
C<times;
C++){D.animate({opacity:animateTo},duration,B.options.easing);
animateTo=(animateTo+1)%2
}D.animate({opacity:animateTo},duration,B.options.easing,function(){animateTo==0&&D.hide();
B.callback&&B.callback.apply(this,arguments)
});
D.queue("fx",function(){D.dequeue()
}).dequeue()
})
}
})(jQuery);
(function(A){A.effects.puff=function(B){return this.queue(function(){var G=A(this),E=A.effects.setMode(G,B.options.mode||"hide"),D=parseInt(B.options.percent,10)||150,F=D/100,C={height:G.height(),width:G.width()};
A.extend(B.options,{fade:true,mode:E,percent:E=="hide"?D:100,from:E=="hide"?C:{height:C.height*F,width:C.width*F}});
G.effect("scale",B.options,B.duration,B.callback);
G.dequeue()
})
};
A.effects.scale=function(B){return this.queue(function(){var H=A(this),F=A.extend(true,{},B.options),E=A.effects.setMode(H,B.options.mode||"effect"),G=parseInt(B.options.percent,10)||(parseInt(B.options.percent,10)==0?0:E=="hide"?0:100),D=B.options.direction||"both",C=B.options.origin;
if(E!="effect"){F.origin=C||["middle","center"];
F.restore=true
}C={height:H.height(),width:H.width()};
H.from=B.options.from||(E=="show"?{height:0,width:0}:C);
G={y:D!="horizontal"?G/100:1,x:D!="vertical"?G/100:1};
H.to={height:C.height*G.y,width:C.width*G.x};
if(B.options.fade){if(E=="show"){H.from.opacity=0;
H.to.opacity=1
}if(E=="hide"){H.from.opacity=1;
H.to.opacity=0
}}F.from=H.from;
F.to=H.to;
F.mode=E;
H.effect("size",F,B.duration,B.callback);
H.dequeue()
})
};
A.effects.size=function(B){return this.queue(function(){var N=A(this),L=["position","top","bottom","left","right","width","height","overflow","opacity"],K=["position","top","bottom","left","right","overflow","opacity"],M=["width","height","overflow"],I=["fontSize"],O=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],J=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],H=A.effects.setMode(N,B.options.mode||"effect"),F=B.options.restore||false,C=B.options.scale||"both",D=B.options.origin,G={height:N.height(),width:N.width()};
N.from=B.options.from||G;
N.to=B.options.to||G;
if(D){D=A.effects.getBaseline(D,G);
N.from.top=(G.height-N.from.height)*D.y;
N.from.left=(G.width-N.from.width)*D.x;
N.to.top=(G.height-N.to.height)*D.y;
N.to.left=(G.width-N.to.width)*D.x
}var E={from:{y:N.from.height/G.height,x:N.from.width/G.width},to:{y:N.to.height/G.height,x:N.to.width/G.width}};
if(C=="box"||C=="both"){if(E.from.y!=E.to.y){L=L.concat(O);
N.from=A.effects.setTransition(N,O,E.from.y,N.from);
N.to=A.effects.setTransition(N,O,E.to.y,N.to)
}if(E.from.x!=E.to.x){L=L.concat(J);
N.from=A.effects.setTransition(N,J,E.from.x,N.from);
N.to=A.effects.setTransition(N,J,E.to.x,N.to)
}}if(C=="content"||C=="both"){if(E.from.y!=E.to.y){L=L.concat(I);
N.from=A.effects.setTransition(N,I,E.from.y,N.from);
N.to=A.effects.setTransition(N,I,E.to.y,N.to)
}}A.effects.save(N,F?L:K);
N.show();
A.effects.createWrapper(N);
N.css("overflow","hidden").css(N.from);
if(C=="content"||C=="both"){O=O.concat(["marginTop","marginBottom"]).concat(I);
J=J.concat(["marginLeft","marginRight"]);
M=L.concat(O).concat(J);
N.find("*[width]").each(function(){child=A(this);
F&&A.effects.save(child,M);
var P={height:child.height(),width:child.width()};
child.from={height:P.height*E.from.y,width:P.width*E.from.x};
child.to={height:P.height*E.to.y,width:P.width*E.to.x};
if(E.from.y!=E.to.y){child.from=A.effects.setTransition(child,O,E.from.y,child.from);
child.to=A.effects.setTransition(child,O,E.to.y,child.to)
}if(E.from.x!=E.to.x){child.from=A.effects.setTransition(child,J,E.from.x,child.from);
child.to=A.effects.setTransition(child,J,E.to.x,child.to)
}child.css(child.from);
child.animate(child.to,B.duration,B.options.easing,function(){F&&A.effects.restore(child,M)
})
})
}N.animate(N.to,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){N.to.opacity===0&&N.css("opacity",N.from.opacity);
H=="hide"&&N.hide();
A.effects.restore(N,F?L:K);
A.effects.removeWrapper(N);
B.callback&&B.callback.apply(this,arguments);
N.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.shake=function(B){return this.queue(function(){var K=A(this),I=["position","top","bottom","left","right"];
A.effects.setMode(K,B.options.mode||"effect");
var H=B.options.direction||"left",J=B.options.distance||20,F=B.options.times||3,L=B.duration||B.options.duration||140;
A.effects.save(K,I);
K.show();
A.effects.createWrapper(K);
var G=H=="up"||H=="down"?"top":"left",E=H=="up"||H=="left"?"pos":"neg";
H={};
var D={},C={};
H[G]=(E=="pos"?"-=":"+=")+J;
D[G]=(E=="pos"?"+=":"-=")+J*2;
C[G]=(E=="pos"?"-=":"+=")+J*2;
K.animate(H,L,B.options.easing);
for(J=1;
J<F;
J++){K.animate(D,L,B.options.easing).animate(C,L,B.options.easing)
}K.animate(D,L,B.options.easing).animate(H,L/2,B.options.easing,function(){A.effects.restore(K,I);
A.effects.removeWrapper(K);
B.callback&&B.callback.apply(this,arguments)
});
K.queue("fx",function(){K.dequeue()
});
K.dequeue()
})
}
})(jQuery);
(function(A){A.effects.slide=function(B){return this.queue(function(){var I=A(this),G=["position","top","bottom","left","right"],F=A.effects.setMode(I,B.options.mode||"show"),H=B.options.direction||"left";
A.effects.save(I,G);
I.show();
A.effects.createWrapper(I).css({overflow:"hidden"});
var D=H=="up"||H=="down"?"top":"left";
H=H=="up"||H=="left"?"pos":"neg";
var C=B.options.distance||(D=="top"?I.outerHeight({margin:true}):I.outerWidth({margin:true}));
if(F=="show"){I.css(D,H=="pos"?isNaN(C)?"-"+C:-C:C)
}var E={};
E[D]=(F=="show"?H=="pos"?"+=":"-=":H=="pos"?"-=":"+=")+C;
I.animate(E,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){F=="hide"&&I.hide();
A.effects.restore(I,G);
A.effects.removeWrapper(I);
B.callback&&B.callback.apply(this,arguments);
I.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.transfer=function(B){return this.queue(function(){var F=A(this),D=A(B.options.to),C=D.offset();
D={top:C.top,left:C.left,height:D.innerHeight(),width:D.innerWidth()};
C=F.offset();
var E=A('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(B.options.className).css({top:C.top,left:C.left,height:F.innerHeight(),width:F.innerWidth(),position:"absolute"}).animate(D,B.duration,B.options.easing,function(){E.remove();
B.callback&&B.callback.apply(F[0],arguments);
F.dequeue()
})
})
}
})(jQuery);
(function(A){A.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()
}},_create:function(){var D=this,E=D.options;
D.running=0;
D.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
D.headers=D.element.find(E.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){E.disabled||A(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){E.disabled||A(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){E.disabled||A(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){E.disabled||A(this).removeClass("ui-state-focus")
});
D.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(E.navigation){var C=D.element.find("a").filter(E.navigationFilter).eq(0);
if(C.length){var B=C.closest(".ui-accordion-header");
D.active=B.length?B:C.closest(".ui-accordion-content").prev()
}}D.active=D._findActive(D.active||E.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
D.active.next().addClass("ui-accordion-content-active");
D._createIcons();
D.resize();
D.element.attr("role","tablist");
D.headers.attr("role","tab").bind("keydown.accordion",function(F){return D._keydown(F)
}).next().attr("role","tabpanel");
D.headers.not(D.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();
D.active.length?D.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):D.headers.eq(0).attr("tabIndex",0);
A.browser.safari||D.headers.find("a").attr("tabIndex",-1);
E.event&&D.headers.bind(E.event.split(" ").join(".accordion ")+".accordion",function(F){D._clickHandler.call(D,F,this);
F.preventDefault()
})
},_createIcons:function(){var B=this.options;
if(B.icons){A("<span></span>").addClass("ui-icon "+B.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(B.icons.header).toggleClass(B.icons.headerSelected);
this.element.addClass("ui-accordion-icons")
}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();
this.element.removeClass("ui-accordion-icons")
},destroy:function(){var B=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");
this._destroyIcons();
var C=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
if(B.autoHeight||B.fillHeight){C.css("height","")
}return A.Widget.prototype.destroy.call(this)
},_setOption:function(B,C){A.Widget.prototype._setOption.apply(this,arguments);
B=="active"&&this.activate(C);
if(B=="icons"){this._destroyIcons();
C&&this._createIcons()
}if(B=="disabled"){this.headers.add(this.headers.next())[C?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")
}},_keydown:function(E){if(!(this.options.disabled||E.altKey||E.ctrlKey)){var F=A.ui.keyCode,C=this.headers.length,B=this.headers.index(E.target),D=false;
switch(E.keyCode){case F.RIGHT:case F.DOWN:D=this.headers[(B+1)%C];
break;
case F.LEFT:case F.UP:D=this.headers[(B-1+C)%C];
break;
case F.SPACE:case F.ENTER:this._clickHandler({target:E.target},E.target);
E.preventDefault()
}if(D){A(E.target).attr("tabIndex",-1);
A(D).attr("tabIndex",0);
D.focus();
return false
}return true
}},resize:function(){var C=this.options,D;
if(C.fillSpace){if(A.browser.msie){var B=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}D=this.element.parent().height();
A.browser.msie&&this.element.parent().css("overflow",B);
this.headers.each(function(){D-=A(this).outerHeight(true)
});
this.headers.next().each(function(){A(this).height(Math.max(0,D-A(this).innerHeight()+A(this).height()))
}).css("overflow","auto")
}else{if(C.autoHeight){D=0;
this.headers.next().each(function(){D=Math.max(D,A(this).height("").height())
}).height(D)
}}return this
},activate:function(B){this.options.active=B;
B=this._findActive(B)[0];
this._clickHandler({target:B},B);
return this
},_findActive:function(B){return B?typeof B==="number"?this.headers.filter(":eq("+B+")"):this.headers.not(this.headers.not(B)):B===false?A([]):this.headers.filter(":eq(0)")
},_clickHandler:function(H,I){var F=this.options;
if(!F.disabled){if(H.target){H=A(H.currentTarget||I);
I=H[0]===this.active[0];
F.active=F.collapsible&&I?false:this.headers.index(H);
if(!(this.running||!F.collapsible&&I)){var E=this.active;
D=H.next();
C=this.active.next();
B={options:F,newHeader:I&&F.collapsible?A([]):H,oldHeader:this.active,newContent:I&&F.collapsible?A([]):D,oldContent:C};
var G=this.headers.index(this.active[0])>this.headers.index(H[0]);
this.active=I?A([]):H;
this._toggle(D,C,B,I,G);
E.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(F.icons.headerSelected).addClass(F.icons.header);
if(!I){H.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(F.icons.header).addClass(F.icons.headerSelected);
H.next().addClass("ui-accordion-content-active")
}}}else{if(F.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(F.icons.headerSelected).addClass(F.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var C=this.active.next(),B={options:F,newHeader:A([]),oldHeader:F.active,newContent:A([]),oldContent:C},D=this.active=A([]);
this._toggle(D,C,B)
}}}},_toggle:function(I,J,G,F,H){var D=this,K=D.options;
D.toShow=I;
D.toHide=J;
D.data=G;
var E=function(){if(D){return D._completed.apply(D,arguments)
}};
D._trigger("changestart",null,D.data);
D.running=J.size()===0?I.size():J.size();
if(K.animated){G={};
G=K.collapsible&&F?{toShow:A([]),toHide:J,complete:E,down:H,autoHeight:K.autoHeight||K.fillSpace}:{toShow:I,toHide:J,complete:E,down:H,autoHeight:K.autoHeight||K.fillSpace};
if(!K.proxied){K.proxied=K.animated
}if(!K.proxiedDuration){K.proxiedDuration=K.duration
}K.animated=A.isFunction(K.proxied)?K.proxied(G):K.proxied;
K.duration=A.isFunction(K.proxiedDuration)?K.proxiedDuration(G):K.proxiedDuration;
F=A.ui.accordion.animations;
var C=K.duration,B=K.animated;
if(B&&!F[B]&&!A.easing[B]){B="slide"
}F[B]||(F[B]=function(L){this.slide(L,{easing:B,duration:C||700})
});
F[B](G)
}else{if(K.collapsible&&F){I.toggle()
}else{J.hide();
I.show()
}E(true)
}J.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur();
I.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()
},_completed:function(B){this.running=B?0:--this.running;
if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});
this.toHide.removeClass("ui-accordion-content-active");
if(this.toHide.length){this.toHide.parent()[0].className=this.toHide.parent()[0].className
}this._trigger("change",null,this.data)
}}});
A.extend(A.ui.accordion,{version:"1.8.13",animations:{slide:function(G,H){G=A.extend({easing:"swing",duration:300},G,H);
if(G.toHide.size()){if(G.toShow.size()){var E=G.toShow.css("overflow"),D=0,F={},C={},B;
H=G.toShow;
B=H[0].style.width;
H.width(parseInt(H.parent().width(),10)-parseInt(H.css("paddingLeft"),10)-parseInt(H.css("paddingRight"),10)-(parseInt(H.css("borderLeftWidth"),10)||0)-(parseInt(H.css("borderRightWidth"),10)||0));
A.each(["height","paddingTop","paddingBottom"],function(J,I){C[I]="hide";
J=(""+A.css(G.toShow[0],I)).match(/^([\d+-.]+)(.*)$/);
F[I]={value:J[1],unit:J[2]||"px"}
});
G.toShow.css({height:0,overflow:"hidden"}).show();
G.toHide.filter(":hidden").each(G.complete).end().filter(":visible").animate(C,{step:function(J,I){if(I.prop=="height"){D=I.end-I.start===0?0:(I.now-I.start)/(I.end-I.start)
}G.toShow[0].style[I.prop]=D*F[I.prop].value+F[I.prop].unit
},duration:G.duration,easing:G.easing,complete:function(){G.autoHeight||G.toShow.css("height","");
G.toShow.css({width:B,overflow:E});
G.complete()
}})
}else{G.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},G)
}}else{G.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},G)
}},bounceslide:function(B){this.slide(B,{easing:B.down?"easeOutBounce":"swing",duration:B.down?1000:200})
}}})
})(jQuery);
(function(A){var B=0;
A.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var E=this,D=this.element[0].ownerDocument,C;
this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(G){if(!(E.options.disabled||E.element.attr("readonly"))){C=false;
var F=A.ui.keyCode;
switch(G.keyCode){case F.PAGE_UP:E._move("previousPage",G);
break;
case F.PAGE_DOWN:E._move("nextPage",G);
break;
case F.UP:E._move("previous",G);
G.preventDefault();
break;
case F.DOWN:E._move("next",G);
G.preventDefault();
break;
case F.ENTER:case F.NUMPAD_ENTER:if(E.menu.active){C=true;
G.preventDefault()
}case F.TAB:if(!E.menu.active){return 
}E.menu.select(G);
break;
case F.ESCAPE:E.element.val(E.term);
E.close(G);
break;
default:clearTimeout(E.searching);
E.searching=setTimeout(function(){if(E.term!=E.element.val()){E.selectedItem=null;
E.search(null,G)
}},E.options.delay);
break
}}}).bind("keypress.autocomplete",function(F){if(C){C=false;
F.preventDefault()
}}).bind("focus.autocomplete",function(){if(!E.options.disabled){E.selectedItem=null;
E.previous=E.element.val()
}}).bind("blur.autocomplete",function(F){if(!E.options.disabled){clearTimeout(E.searching);
E.closing=setTimeout(function(){E.close(F);
E._change(F)
},150)
}});
this._initSource();
this.response=function(){return E._response.apply(E,arguments)
};
this.menu=A("<ul></ul>").addClass("ui-autocomplete").appendTo(A(this.options.appendTo||"body",D)[0]).mousedown(function(G){var F=E.menu.element[0];
A(G.target).closest(".ui-menu-item").length||setTimeout(function(){A(document).one("mousedown",function(H){H.target!==E.element[0]&&H.target!==F&&!A.ui.contains(F,H.target)&&E.close()
})
},1);
setTimeout(function(){clearTimeout(E.closing)
},13)
}).menu({focus:function(G,F){F=F.item.data("item.autocomplete");
false!==E._trigger("focus",G,{item:F})&&/^key/.test(G.originalEvent.type)&&E.element.val(F.value)
},selected:function(I,G){var F=G.item.data("item.autocomplete"),H=E.previous;
if(E.element[0]!==D.activeElement){E.element.focus();
E.previous=H;
setTimeout(function(){E.previous=H;
E.selectedItem=F
},1)
}false!==E._trigger("select",I,{item:F})&&E.element.val(F.value);
E.term=E.element.val();
E.close(I);
E.selectedItem=F
},blur:function(){E.menu.element.is(":visible")&&E.element.val()!==E.term&&E.element.val(E.term)
}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");
A.fn.bgiframe&&this.menu.element.bgiframe()
},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
this.menu.element.remove();
A.Widget.prototype.destroy.call(this)
},_setOption:function(D,C){A.Widget.prototype._setOption.apply(this,arguments);
D==="source"&&this._initSource();
if(D==="appendTo"){this.menu.element.appendTo(A(C||"body",this.element[0].ownerDocument)[0])
}D==="disabled"&&C&&this.xhr&&this.xhr.abort()
},_initSource:function(){var E=this,D,C;
if(A.isArray(this.options.source)){D=this.options.source;
this.source=function(G,F){F(A.ui.autocomplete.filter(D,G.term))
}
}else{if(typeof this.options.source==="string"){C=this.options.source;
this.source=function(G,F){E.xhr&&E.xhr.abort();
E.xhr=A.ajax({url:C,data:G,dataType:"json",autocompleteRequest:++B,success:function(H){this.autocompleteRequest===B&&F(H)
},error:function(){this.autocompleteRequest===B&&F([])
}})
}
}else{this.source=this.options.source
}}},search:function(D,C){D=D!=null?D:this.element.val();
this.term=this.element.val();
if(D.length<this.options.minLength){return this.close(C)
}clearTimeout(this.closing);
if(this._trigger("search",C)!==false){return this._search(D)
}},_search:function(C){this.pending++;
this.element.addClass("ui-autocomplete-loading");
this.source({term:C},this.response)
},_response:function(C){if(!this.options.disabled&&C&&C.length){C=this._normalize(C);
this._suggest(C);
this._trigger("open")
}else{this.close()
}this.pending--;
this.pending||this.element.removeClass("ui-autocomplete-loading")
},close:function(C){clearTimeout(this.closing);
if(this.menu.element.is(":visible")){this.menu.element.hide();
this.menu.deactivate();
this._trigger("close",C)
}},_change:function(C){this.previous!==this.element.val()&&this._trigger("change",C,{item:this.selectedItem})
},_normalize:function(C){if(C.length&&C[0].label&&C[0].value){return C
}return A.map(C,function(D){if(typeof D==="string"){return{label:D,value:D}
}return A.extend({label:D.label||D.value,value:D.value||D.label},D)
})
},_suggest:function(D){var C=this.menu.element.empty().zIndex(this.element.zIndex()+1);
this._renderMenu(C,D);
this.menu.deactivate();
this.menu.refresh();
C.show();
this._resizeMenu();
C.position(A.extend({of:this.element},this.options.position));
this.options.autoFocus&&this.menu.next(new A.Event("mouseover"))
},_resizeMenu:function(){var C=this.menu.element;
C.outerWidth(Math.max(C.width("").outerWidth(),this.element.outerWidth()))
},_renderMenu:function(E,D){var C=this;
A.each(D,function(G,F){C._renderItem(E,F)
})
},_renderItem:function(D,C){return A("<li></li>").data("item.autocomplete",C).append(A("<a></a>").text(C.label)).appendTo(D)
},_move:function(D,C){if(this.menu.element.is(":visible")){if(this.menu.first()&&/^previous/.test(D)||this.menu.last()&&/^next/.test(D)){this.element.val(this.term);
this.menu.deactivate()
}else{this.menu[D](C)
}}else{this.search(null,C)
}},widget:function(){return this.menu.element
}});
A.extend(A.ui.autocomplete,{escapeRegex:function(C){return C.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
},filter:function(E,D){var C=new RegExp(A.ui.autocomplete.escapeRegex(D),"i");
return A.grep(E,function(F){return C.test(F.label||F.value||F)
})
}})
})(jQuery);
(function(A){A.widget("ui.menu",{_create:function(){var B=this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(C){if(A(C.target).closest(".ui-menu-item a").length){C.preventDefault();
B.select(C)
}});
this.refresh()
},refresh:function(){var B=this;
this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(C){B.activate(C,A(this).parent())
}).mouseleave(function(){B.deactivate()
})
},activate:function(E,F){this.deactivate();
if(this.hasScroll()){var C=F.offset().top-this.element.offset().top,B=this.element.scrollTop(),D=this.element.height();
if(C<0){this.element.scrollTop(B+C)
}else{C>=D&&this.element.scrollTop(B+C-D+F.height())
}}this.active=F.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();
this._trigger("focus",E,{item:F})
},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");
this.active=null
}},next:function(B){this.move("next",".ui-menu-item:first",B)
},previous:function(B){this.move("prev",".ui-menu-item:last",B)
},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},move:function(C,D,B){if(this.active){C=this.active[C+"All"](".ui-menu-item").eq(0);
C.length?this.activate(B,C):this.activate(B,this.element.children(D))
}else{this.activate(B,this.element.children(D))
}},nextPage:function(D){if(this.hasScroll()){if(!this.active||this.last()){this.activate(D,this.element.children(".ui-menu-item:first"))
}else{var E=this.active.offset().top,C=this.element.height(),B=this.element.children(".ui-menu-item").filter(function(){var F=A(this).offset().top-E-C+A(this).height();
return F<10&&F>-10
});
B.length||(B=this.element.children(".ui-menu-item:last"));
this.activate(D,B)
}}else{this.activate(D,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))
}},previousPage:function(C){if(this.hasScroll()){if(!this.active||this.first()){this.activate(C,this.element.children(".ui-menu-item:last"))
}else{var D=this.active.offset().top,B=this.element.height();
result=this.element.children(".ui-menu-item").filter(function(){var E=A(this).offset().top-D+B-A(this).height();
return E<10&&E>-10
});
result.length||(result=this.element.children(".ui-menu-item:first"));
this.activate(C,result)
}}else{this.activate(C,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))
}},hasScroll:function(){return this.element.height()<this.element[A.fn.prop?"prop":"attr"]("scrollHeight")
},select:function(B){this._trigger("selected",B,{item:this.active})
}})
})(jQuery);
(function(A){var C,D=function(E){A(":ui-button",E.target.form).each(function(){var F=A(this).data("button");
setTimeout(function(){F.refresh()
},1)
})
},B=function(G){var H=G.name,F=G.form,E=A([]);
if(H){E=F?A(F).find("[name='"+H+"']"):A("[name='"+H+"']",G.ownerDocument).filter(function(){return !this.form
})
}return E
};
A.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",D);
if(typeof this.options.disabled!=="boolean"){this.options.disabled=this.element.attr("disabled")
}this._determineButtonType();
this.hasTitle=!!this.buttonElement.attr("title");
var G=this,H=this.options,F=this.type==="checkbox"||this.type==="radio",E="ui-state-hover"+(!F?" ui-state-active":"");
if(H.label===null){H.label=this.buttonElement.html()
}if(this.element.is(":disabled")){H.disabled=true
}this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!H.disabled){A(this).addClass("ui-state-hover");
this===C&&A(this).addClass("ui-state-active")
}}).bind("mouseleave.button",function(){H.disabled||A(this).removeClass(E)
}).bind("focus.button",function(){A(this).addClass("ui-state-focus")
}).bind("blur.button",function(){A(this).removeClass("ui-state-focus")
}).bind("click.button",function(I){H.disabled&&I.stopImmediatePropagation()
});
F&&this.element.bind("change.button",function(){G.refresh()
});
if(this.type==="checkbox"){this.buttonElement.bind("click.button",function(){if(H.disabled){return false
}A(this).toggleClass("ui-state-active");
G.buttonElement.attr("aria-pressed",G.element[0].checked)
})
}else{if(this.type==="radio"){this.buttonElement.bind("click.button",function(){if(H.disabled){return false
}A(this).addClass("ui-state-active");
G.buttonElement.attr("aria-pressed",true);
var I=G.element[0];
B(I).not(I).map(function(){return A(this).button("widget")[0]
}).removeClass("ui-state-active").attr("aria-pressed",false)
})
}else{this.buttonElement.bind("mousedown.button",function(){if(H.disabled){return false
}A(this).addClass("ui-state-active");
C=this;
A(document).one("mouseup",function(){C=null
})
}).bind("mouseup.button",function(){if(H.disabled){return false
}A(this).removeClass("ui-state-active")
}).bind("keydown.button",function(I){if(H.disabled){return false
}if(I.keyCode==A.ui.keyCode.SPACE||I.keyCode==A.ui.keyCode.ENTER){A(this).addClass("ui-state-active")
}}).bind("keyup.button",function(){A(this).removeClass("ui-state-active")
});
this.buttonElement.is("a")&&this.buttonElement.keyup(function(I){I.keyCode===A.ui.keyCode.SPACE&&A(this).click()
})
}}this._setOption("disabled",H.disabled)
},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";
if(this.type==="checkbox"||this.type==="radio"){var E=this.element.parents().filter(":last"),F="label[for="+this.element.attr("id")+"]";
this.buttonElement=E.find(F);
if(!this.buttonElement.length){E=E.length?E.siblings():this.element.siblings();
this.buttonElement=E.filter(F);
if(!this.buttonElement.length){this.buttonElement=E.find(F)
}}this.element.addClass("ui-helper-hidden-accessible");
(E=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");
this.buttonElement.attr("aria-pressed",E)
}else{this.buttonElement=this.element
}},widget:function(){return this.buttonElement
},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");
this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
this.hasTitle||this.buttonElement.removeAttr("title");
A.Widget.prototype.destroy.call(this)
},_setOption:function(E,F){A.Widget.prototype._setOption.apply(this,arguments);
if(E==="disabled"){F?this.element.attr("disabled",true):this.element.removeAttr("disabled")
}this._resetButton()
},refresh:function(){var E=this.element.is(":disabled");
E!==this.options.disabled&&this._setOption("disabled",E);
if(this.type==="radio"){B(this.element[0]).each(function(){A(this).is(":checked")?A(this).button("widget").addClass("ui-state-active").attr("aria-pressed",true):A(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)
})
}else{if(this.type==="checkbox"){this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)
}}},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label)
}else{var H=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),I=A("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(H.empty()).text(),F=this.options.icons,E=F.primary&&F.secondary,G=[];
if(F.primary||F.secondary){if(this.options.text){G.push("ui-button-text-icon"+(E?"s":F.primary?"-primary":"-secondary"))
}F.primary&&H.prepend("<span class='ui-button-icon-primary ui-icon "+F.primary+"'></span>");
F.secondary&&H.append("<span class='ui-button-icon-secondary ui-icon "+F.secondary+"'></span>");
if(!this.options.text){G.push(E?"ui-button-icons-only":"ui-button-icon-only");
this.hasTitle||H.attr("title",I)
}}else{G.push("ui-button-text-only")
}H.addClass(G.join(" "))
}}});
A.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")
},_init:function(){this.refresh()
},_setOption:function(E,F){E==="disabled"&&this.buttons.button("option",E,F);
A.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return A(this).button("widget")[0]
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
},destroy:function(){this.element.removeClass("ui-buttonset");
this.buttons.map(function(){return A(this).button("widget")[0]
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
A.Widget.prototype.destroy.call(this)
}})
})(jQuery);
(function(a,d){function c(){this.debug=false;
this._curInst=null;
this._keyEvent=false;
this._disabledInputs=[];
this._inDialog=this._datepickerShowing=false;
this._mainDivId="ui-datepicker-div";
this._inlineClass="ui-datepicker-inline";
this._appendClass="ui-datepicker-append";
this._triggerClass="ui-datepicker-trigger";
this._dialogClass="ui-datepicker-dialog";
this._disableClass="ui-datepicker-disabled";
this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";
this._dayOverClass="ui-datepicker-days-cell-over";
this.regional=[];
this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};
this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};
a.extend(this._defaults,this.regional[""]);
this.dpDiv=f(a('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
}function f(b){return b.delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a","mouseout",function(){a(this).removeClass("ui-state-hover");
this.className.indexOf("ui-datepicker-prev")!=-1&&a(this).removeClass("ui-datepicker-prev-hover");
this.className.indexOf("ui-datepicker-next")!=-1&&a(this).removeClass("ui-datepicker-next-hover")
}).delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a","mouseover",function(){if(!a.datepicker._isDisabledDatepicker(i.inline?b.parent()[0]:i.input[0])){a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
a(this).addClass("ui-state-hover");
this.className.indexOf("ui-datepicker-prev")!=-1&&a(this).addClass("ui-datepicker-prev-hover");
this.className.indexOf("ui-datepicker-next")!=-1&&a(this).addClass("ui-datepicker-next-hover")
}})
}function g(b,h){a.extend(b,h);
for(var j in h){if(h[j]==null||h[j]==d){b[j]=h[j]
}}return b
}a.extend(a.ui,{datepicker:{version:"1.8.13"}});
var e=(new Date).getTime(),i;
a.extend(c.prototype,{markerClassName:"hasDatepicker",log:function(){this.debug&&console.log.apply("",arguments)
},_widgetDatepicker:function(){return this.dpDiv
},setDefaults:function(b){g(this._defaults,b||{});
return this
},_attachDatepicker:function(b,h){var j=null;
for(var l in this._defaults){var o=b.getAttribute("date:"+l);
if(o){j=j||{};
try{j[l]=eval(o)
}catch(n){j[l]=o
}}}l=b.nodeName.toLowerCase();
o=l=="div"||l=="span";
if(!b.id){this.uuid+=1;
b.id="dp"+this.uuid
}var k=this._newInst(a(b),o);
k.settings=a.extend({},h||{},j||{});
if(l=="input"){this._connectDatepicker(b,k)
}else{o&&this._inlineDatepicker(b,k)
}},_newInst:function(b,h){return{id:b[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:b,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:h,dpDiv:!h?this.dpDiv:f(a('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}
},_connectDatepicker:function(b,h){var j=a(b);
h.append=a([]);
h.trigger=a([]);
if(!j.hasClass(this.markerClassName)){this._attachments(j,h);
j.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(l,o,n){h.settings[o]=n
}).bind("getData.datepicker",function(l,o){return this._get(h,o)
});
this._autoSize(h);
a.data(b,"datepicker",h)
}},_attachments:function(b,h){var j=this._get(h,"appendText"),l=this._get(h,"isRTL");
h.append&&h.append.remove();
if(j){h.append=a('<span class="'+this._appendClass+'">'+j+"</span>");
b[l?"before":"after"](h.append)
}b.unbind("focus",this._showDatepicker);
h.trigger&&h.trigger.remove();
j=this._get(h,"showOn");
if(j=="focus"||j=="both"){b.focus(this._showDatepicker)
}if(j=="button"||j=="both"){j=this._get(h,"buttonText");
var o=this._get(h,"buttonImage");
h.trigger=a(this._get(h,"buttonImageOnly")?a("<img/>").addClass(this._triggerClass).attr({src:o,alt:j,title:j}):a('<button type="button"></button>').addClass(this._triggerClass).html(o==""?j:a("<img/>").attr({src:o,alt:j,title:j})));
b[l?"before":"after"](h.trigger);
h.trigger.click(function(){a.datepicker._datepickerShowing&&a.datepicker._lastInput==b[0]?a.datepicker._hideDatepicker():a.datepicker._showDatepicker(b[0]);
return false
})
}},_autoSize:function(b){if(this._get(b,"autoSize")&&!b.inline){var h=new Date(2009,11,20),j=this._get(b,"dateFormat");
if(j.match(/[DM]/)){var l=function(o){for(var n=0,k=0,m=0;
m<o.length;
m++){if(o[m].length>n){n=o[m].length;
k=m
}}return k
};
h.setMonth(l(this._get(b,j.match(/MM/)?"monthNames":"monthNamesShort")));
h.setDate(l(this._get(b,j.match(/DD/)?"dayNames":"dayNamesShort"))+20-h.getDay())
}b.input.attr("size",this._formatDate(b,h).length)
}},_inlineDatepicker:function(b,h){var j=a(b);
if(!j.hasClass(this.markerClassName)){j.addClass(this.markerClassName).append(h.dpDiv).bind("setData.datepicker",function(l,o,n){h.settings[o]=n
}).bind("getData.datepicker",function(l,o){return this._get(h,o)
});
a.data(b,"datepicker",h);
this._setDate(h,this._getDefaultDate(h),true);
this._updateDatepicker(h);
this._updateAlternate(h);
h.dpDiv.show()
}},_dialogDatepicker:function(b,h,j,l,o){b=this._dialogInst;
if(!b){this.uuid+=1;
this._dialogInput=a('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
this._dialogInput.keydown(this._doKeyDown);
a("body").append(this._dialogInput);
b=this._dialogInst=this._newInst(this._dialogInput,false);
b.settings={};
a.data(this._dialogInput[0],"datepicker",b)
}g(b.settings,l||{});
h=h&&h.constructor==Date?this._formatDate(b,h):h;
this._dialogInput.val(h);
this._pos=o?o.length?o:[o.pageX,o.pageY]:null;
if(!this._pos){this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)]
}this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");
b.settings.onSelect=j;
this._inDialog=true;
this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);
a.blockUI&&a.blockUI(this.dpDiv);
a.data(this._dialogInput[0],"datepicker",b);
return this
},_destroyDatepicker:function(b){var h=a(b),j=a.data(b,"datepicker");
if(h.hasClass(this.markerClassName)){var l=b.nodeName.toLowerCase();
a.removeData(b,"datepicker");
if(l=="input"){j.append.remove();
j.trigger.remove();
h.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)
}else{if(l=="div"||l=="span"){h.removeClass(this.markerClassName).empty()
}}}},_enableDatepicker:function(b){var h=a(b),j=a.data(b,"datepicker");
if(h.hasClass(this.markerClassName)){var l=b.nodeName.toLowerCase();
if(l=="input"){b.disabled=false;
j.trigger.filter("button").each(function(){this.disabled=false
}).end().filter("img").css({opacity:"1.0",cursor:""})
}else{if(l=="div"||l=="span"){h=h.children("."+this._inlineClass);
h.children().removeClass("ui-state-disabled");
h.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
}}this._disabledInputs=a.map(this._disabledInputs,function(o){return o==b?null:o
})
}},_disableDatepicker:function(b){var h=a(b),j=a.data(b,"datepicker");
if(h.hasClass(this.markerClassName)){var l=b.nodeName.toLowerCase();
if(l=="input"){b.disabled=true;
j.trigger.filter("button").each(function(){this.disabled=true
}).end().filter("img").css({opacity:"0.5",cursor:"default"})
}else{if(l=="div"||l=="span"){h=h.children("."+this._inlineClass);
h.children().addClass("ui-state-disabled");
h.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")
}}this._disabledInputs=a.map(this._disabledInputs,function(o){return o==b?null:o
});
this._disabledInputs[this._disabledInputs.length]=b
}},_isDisabledDatepicker:function(b){if(!b){return false
}for(var h=0;
h<this._disabledInputs.length;
h++){if(this._disabledInputs[h]==b){return true
}}return false
},_getInst:function(b){try{return a.data(b,"datepicker")
}catch(h){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(b,h,j){var l=this._getInst(b);
if(arguments.length==2&&typeof h=="string"){return h=="defaults"?a.extend({},a.datepicker._defaults):l?h=="all"?a.extend({},l.settings):this._get(l,h):null
}var o=h||{};
if(typeof h=="string"){o={};
o[h]=j
}if(l){this._curInst==l&&this._hideDatepicker();
var n=this._getDateDatepicker(b,true),k=this._getMinMaxDate(l,"min"),m=this._getMinMaxDate(l,"max");
g(l.settings,o);
if(k!==null&&o.dateFormat!==d&&o.minDate===d){l.settings.minDate=this._formatDate(l,k)
}if(m!==null&&o.dateFormat!==d&&o.maxDate===d){l.settings.maxDate=this._formatDate(l,m)
}this._attachments(a(b),l);
this._autoSize(l);
this._setDate(l,n);
this._updateAlternate(l);
this._updateDatepicker(l)
}},_changeDatepicker:function(b,h,j){this._optionDatepicker(b,h,j)
},_refreshDatepicker:function(b){(b=this._getInst(b))&&this._updateDatepicker(b)
},_setDateDatepicker:function(b,h){if(b=this._getInst(b)){this._setDate(b,h);
this._updateDatepicker(b);
this._updateAlternate(b)
}},_getDateDatepicker:function(b,h){(b=this._getInst(b))&&!b.inline&&this._setDateFromField(b,h);
return b?this._getDate(b):null
},_doKeyDown:function(b){var h=a.datepicker._getInst(b.target),j=true,l=h.dpDiv.is(".ui-datepicker-rtl");
h._keyEvent=true;
if(a.datepicker._datepickerShowing){switch(b.keyCode){case 9:a.datepicker._hideDatepicker();
j=false;
break;
case 13:j=a("td."+a.datepicker._dayOverClass+":not(."+a.datepicker._currentClass+")",h.dpDiv);
j[0]?a.datepicker._selectDay(b.target,h.selectedMonth,h.selectedYear,j[0]):a.datepicker._hideDatepicker();
return false;
case 27:a.datepicker._hideDatepicker();
break;
case 33:a.datepicker._adjustDate(b.target,b.ctrlKey?-a.datepicker._get(h,"stepBigMonths"):-a.datepicker._get(h,"stepMonths"),"M");
break;
case 34:a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(h,"stepBigMonths"):+a.datepicker._get(h,"stepMonths"),"M");
break;
case 35:if(b.ctrlKey||b.metaKey){a.datepicker._clearDate(b.target)
}j=b.ctrlKey||b.metaKey;
break;
case 36:if(b.ctrlKey||b.metaKey){a.datepicker._gotoToday(b.target)
}j=b.ctrlKey||b.metaKey;
break;
case 37:if(b.ctrlKey||b.metaKey){a.datepicker._adjustDate(b.target,l?+1:-1,"D")
}j=b.ctrlKey||b.metaKey;
if(b.originalEvent.altKey){a.datepicker._adjustDate(b.target,b.ctrlKey?-a.datepicker._get(h,"stepBigMonths"):-a.datepicker._get(h,"stepMonths"),"M")
}break;
case 38:if(b.ctrlKey||b.metaKey){a.datepicker._adjustDate(b.target,-7,"D")
}j=b.ctrlKey||b.metaKey;
break;
case 39:if(b.ctrlKey||b.metaKey){a.datepicker._adjustDate(b.target,l?-1:+1,"D")
}j=b.ctrlKey||b.metaKey;
if(b.originalEvent.altKey){a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(h,"stepBigMonths"):+a.datepicker._get(h,"stepMonths"),"M")
}break;
case 40:if(b.ctrlKey||b.metaKey){a.datepicker._adjustDate(b.target,+7,"D")
}j=b.ctrlKey||b.metaKey;
break;
default:j=false
}}else{if(b.keyCode==36&&b.ctrlKey){a.datepicker._showDatepicker(this)
}else{j=false
}}if(j){b.preventDefault();
b.stopPropagation()
}},_doKeyPress:function(b){var h=a.datepicker._getInst(b.target);
if(a.datepicker._get(h,"constrainInput")){h=a.datepicker._possibleChars(a.datepicker._get(h,"dateFormat"));
var j=String.fromCharCode(b.charCode==d?b.keyCode:b.charCode);
return b.ctrlKey||b.metaKey||j<" "||!h||h.indexOf(j)>-1
}},_doKeyUp:function(b){b=a.datepicker._getInst(b.target);
if(b.input.val()!=b.lastVal){try{if(a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,a.datepicker._getFormatConfig(b))){a.datepicker._setDateFromField(b);
a.datepicker._updateAlternate(b);
a.datepicker._updateDatepicker(b)
}}catch(h){a.datepicker.log(h)
}}return true
},_showDatepicker:function(b){b=b.target||b;
if(b.nodeName.toLowerCase()!="input"){b=a("input",b.parentNode)[0]
}if(!(a.datepicker._isDisabledDatepicker(b)||a.datepicker._lastInput==b)){var h=a.datepicker._getInst(b);
a.datepicker._curInst&&a.datepicker._curInst!=h&&a.datepicker._curInst.dpDiv.stop(true,true);
var j=a.datepicker._get(h,"beforeShow");
g(h.settings,j?j.apply(b,[b,h]):{});
h.lastVal=null;
a.datepicker._lastInput=b;
a.datepicker._setDateFromField(h);
if(a.datepicker._inDialog){b.value=""
}if(!a.datepicker._pos){a.datepicker._pos=a.datepicker._findPos(b);
a.datepicker._pos[1]+=b.offsetHeight
}var l=false;
a(b).parents().each(function(){l|=a(this).css("position")=="fixed";
return !l
});
if(l&&a.browser.opera){a.datepicker._pos[0]-=document.documentElement.scrollLeft;
a.datepicker._pos[1]-=document.documentElement.scrollTop
}j={left:a.datepicker._pos[0],top:a.datepicker._pos[1]};
a.datepicker._pos=null;
h.dpDiv.empty();
h.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
a.datepicker._updateDatepicker(h);
j=a.datepicker._checkOffset(h,j,l);
h.dpDiv.css({position:a.datepicker._inDialog&&a.blockUI?"static":l?"fixed":"absolute",display:"none",left:j.left+"px",top:j.top+"px"});
if(!h.inline){j=a.datepicker._get(h,"showAnim");
var o=a.datepicker._get(h,"duration"),n=function(){var k=h.dpDiv.find("iframe.ui-datepicker-cover");
if(k.length){var m=a.datepicker._getBorders(h.dpDiv);
k.css({left:-m[0],top:-m[1],width:h.dpDiv.outerWidth(),height:h.dpDiv.outerHeight()})
}};
h.dpDiv.zIndex(a(b).zIndex()+1);
a.datepicker._datepickerShowing=true;
a.effects&&a.effects[j]?h.dpDiv.show(j,a.datepicker._get(h,"showOptions"),o,n):h.dpDiv[j||"show"](j?o:null,n);
if(!j||!o){n()
}h.input.is(":visible")&&!h.input.is(":disabled")&&h.input.focus();
a.datepicker._curInst=h
}}},_updateDatepicker:function(b){var h=a.datepicker._getBorders(b.dpDiv);
i=b;
b.dpDiv.empty().append(this._generateHTML(b));
var j=b.dpDiv.find("iframe.ui-datepicker-cover");
j.length&&j.css({left:-h[0],top:-h[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()});
b.dpDiv.find("."+this._dayOverClass+" a").mouseover();
h=this._getNumberOfMonths(b);
j=h[1];
b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
j>1&&b.dpDiv.addClass("ui-datepicker-multi-"+j).css("width",17*j+"em");
b.dpDiv[(h[0]!=1||h[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
b.dpDiv[(this._get(b,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
b==a.datepicker._curInst&&a.datepicker._datepickerShowing&&b.input&&b.input.is(":visible")&&!b.input.is(":disabled")&&b.input[0]!=document.activeElement&&b.input.focus();
if(b.yearshtml){var l=b.yearshtml;
setTimeout(function(){l===b.yearshtml&&b.yearshtml&&b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml);
l=b.yearshtml=null
},0)
}},_getBorders:function(b){var h=function(j){return{thin:1,medium:2,thick:3}[j]||j
};
return[parseFloat(h(b.css("border-left-width"))),parseFloat(h(b.css("border-top-width")))]
},_checkOffset:function(b,h,j){var l=b.dpDiv.outerWidth(),o=b.dpDiv.outerHeight(),n=b.input?b.input.outerWidth():0,k=b.input?b.input.outerHeight():0,m=document.documentElement.clientWidth+a(document).scrollLeft(),p=document.documentElement.clientHeight+a(document).scrollTop();
h.left-=this._get(b,"isRTL")?l-n:0;
h.left-=j&&h.left==b.input.offset().left?a(document).scrollLeft():0;
h.top-=j&&h.top==b.input.offset().top+k?a(document).scrollTop():0;
h.left-=Math.min(h.left,h.left+l>m&&m>l?Math.abs(h.left+l-m):0);
h.top-=Math.min(h.top,h.top+o>p&&p>o?Math.abs(o+k):0);
return h
},_findPos:function(b){for(var h=this._get(this._getInst(b),"isRTL");
b&&(b.type=="hidden"||b.nodeType!=1||a.expr.filters.hidden(b));
){b=b[h?"previousSibling":"nextSibling"]
}b=a(b).offset();
return[b.left,b.top]
},_hideDatepicker:function(b){var h=this._curInst;
if(!(!h||b&&h!=a.data(b,"datepicker"))){if(this._datepickerShowing){b=this._get(h,"showAnim");
var j=this._get(h,"duration"),l=function(){a.datepicker._tidyDialog(h);
this._curInst=null
};
a.effects&&a.effects[b]?h.dpDiv.hide(b,a.datepicker._get(h,"showOptions"),j,l):h.dpDiv[b=="slideDown"?"slideUp":b=="fadeIn"?"fadeOut":"hide"](b?j:null,l);
b||l();
if(b=this._get(h,"onClose")){b.apply(h.input?h.input[0]:null,[h.input?h.input.val():"",h])
}this._datepickerShowing=false;
this._lastInput=null;
if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if(a.blockUI){a.unblockUI();
a("body").append(this.dpDiv)
}}this._inDialog=false
}}},_tidyDialog:function(b){b.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
},_checkExternalClick:function(b){if(a.datepicker._curInst){b=a(b.target);
b[0].id!=a.datepicker._mainDivId&&b.parents("#"+a.datepicker._mainDivId).length==0&&!b.hasClass(a.datepicker.markerClassName)&&!b.hasClass(a.datepicker._triggerClass)&&a.datepicker._datepickerShowing&&!(a.datepicker._inDialog&&a.blockUI)&&a.datepicker._hideDatepicker()
}},_adjustDate:function(b,h,j){b=a(b);
var l=this._getInst(b[0]);
if(!this._isDisabledDatepicker(b[0])){this._adjustInstDate(l,h+(j=="M"?this._get(l,"showCurrentAtPos"):0),j);
this._updateDatepicker(l)
}},_gotoToday:function(b){b=a(b);
var h=this._getInst(b[0]);
if(this._get(h,"gotoCurrent")&&h.currentDay){h.selectedDay=h.currentDay;
h.drawMonth=h.selectedMonth=h.currentMonth;
h.drawYear=h.selectedYear=h.currentYear
}else{var j=new Date;
h.selectedDay=j.getDate();
h.drawMonth=h.selectedMonth=j.getMonth();
h.drawYear=h.selectedYear=j.getFullYear()
}this._notifyChange(h);
this._adjustDate(b)
},_selectMonthYear:function(b,h,j){b=a(b);
var l=this._getInst(b[0]);
l._selectingMonthYear=false;
l["selected"+(j=="M"?"Month":"Year")]=l["draw"+(j=="M"?"Month":"Year")]=parseInt(h.options[h.selectedIndex].value,10);
this._notifyChange(l);
this._adjustDate(b)
},_clickMonthYear:function(b){var h=this._getInst(a(b)[0]);
h.input&&h._selectingMonthYear&&setTimeout(function(){h.input.focus()
},0);
h._selectingMonthYear=!h._selectingMonthYear
},_selectDay:function(b,h,j,l){var o=a(b);
if(!(a(l).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0]))){o=this._getInst(o[0]);
o.selectedDay=o.currentDay=a("a",l).html();
o.selectedMonth=o.currentMonth=h;
o.selectedYear=o.currentYear=j;
this._selectDate(b,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear))
}},_clearDate:function(b){b=a(b);
this._getInst(b[0]);
this._selectDate(b,"")
},_selectDate:function(b,h){b=this._getInst(a(b)[0]);
h=h!=null?h:this._formatDate(b);
b.input&&b.input.val(h);
this._updateAlternate(b);
var j=this._get(b,"onSelect");
if(j){j.apply(b.input?b.input[0]:null,[h,b])
}else{b.input&&b.input.trigger("change")
}if(b.inline){this._updateDatepicker(b)
}else{this._hideDatepicker();
this._lastInput=b.input[0];
typeof b.input[0]!="object"&&b.input.focus();
this._lastInput=null
}},_updateAlternate:function(b){var h=this._get(b,"altField");
if(h){var j=this._get(b,"altFormat")||this._get(b,"dateFormat"),l=this._getDate(b),o=this.formatDate(j,l,this._getFormatConfig(b));
a(h).each(function(){a(this).val(o)
})
}},noWeekends:function(b){b=b.getDay();
return[b>0&&b<6,""]
},iso8601Week:function(b){b=new Date(b.getTime());
b.setDate(b.getDate()+4-(b.getDay()||7));
var h=b.getTime();
b.setMonth(0);
b.setDate(1);
return Math.floor(Math.round((h-b)/86400000)/7)+1
},parseDate:function(b,h,j){if(b==null||h==null){throw"Invalid arguments"
}h=typeof h=="object"?h.toString():h+"";
if(h==""){return null
}var l=(j?j.shortYearCutoff:null)||this._defaults.shortYearCutoff;
l=typeof l!="string"?l:(new Date).getFullYear()%100+parseInt(l,10);
for(var o=(j?j.dayNamesShort:null)||this._defaults.dayNamesShort,n=(j?j.dayNames:null)||this._defaults.dayNames,k=(j?j.monthNamesShort:null)||this._defaults.monthNamesShort,m=(j?j.monthNames:null)||this._defaults.monthNames,p=j=-1,q=-1,s=-1,r=false,u=function(y){(y=G+1<b.length&&b.charAt(G+1)==y)&&G++;
return y
},v=function(y){var H=u(y);
y=new RegExp("^\\d{1,"+(y=="@"?14:y=="!"?20:y=="y"&&H?4:y=="o"?3:2)+"}");
y=h.substring(z).match(y);
if(!y){throw"Missing number at position "+z
}z+=y[0].length;
return parseInt(y[0],10)
},w=function(y,H,N){y=a.map(u(y)?N:H,function(D,E){return[[E,D]]
}).sort(function(D,E){return -(D[1].length-E[1].length)
});
var J=-1;
a.each(y,function(D,E){D=E[1];
if(h.substr(z,D.length).toLowerCase()==D.toLowerCase()){J=E[0];
z+=D.length;
return false
}});
if(J!=-1){return J+1
}else{throw"Unknown name at position "+z
}},x=function(){if(h.charAt(z)!=b.charAt(G)){throw"Unexpected literal at position "+z
}z++
},z=0,G=0;
G<b.length;
G++){if(r){if(b.charAt(G)=="'"&&!u("'")){r=false
}else{x()
}}else{switch(b.charAt(G)){case"d":q=v("d");
break;
case"D":w("D",o,n);
break;
case"o":s=v("o");
break;
case"m":p=v("m");
break;
case"M":p=w("M",k,m);
break;
case"y":j=v("y");
break;
case"@":var C=new Date(v("@"));
j=C.getFullYear();
p=C.getMonth()+1;
q=C.getDate();
break;
case"!":C=new Date((v("!")-this._ticksTo1970)/10000);
j=C.getFullYear();
p=C.getMonth()+1;
q=C.getDate();
break;
case"'":if(u("'")){x()
}else{r=true
}break;
default:x()
}}}if(j==-1){j=(new Date).getFullYear()
}else{if(j<100){j+=(new Date).getFullYear()-(new Date).getFullYear()%100+(j<=l?0:-100)
}}if(s>-1){p=1;
q=s;
do{l=this._getDaysInMonth(j,p-1);
if(q<=l){break
}p++;
q-=l
}while(1)
}C=this._daylightSavingAdjust(new Date(j,p-1,q));
if(C.getFullYear()!=j||C.getMonth()+1!=p||C.getDate()!=q){throw"Invalid date"
}return C
},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*10000000,formatDate:function(b,h,j){if(!h){return""
}var l=(j?j.dayNamesShort:null)||this._defaults.dayNamesShort,o=(j?j.dayNames:null)||this._defaults.dayNames,n=(j?j.monthNamesShort:null)||this._defaults.monthNamesShort;
j=(j?j.monthNames:null)||this._defaults.monthNames;
var k=function(u){(u=r+1<b.length&&b.charAt(r+1)==u)&&r++;
return u
},m=function(u,v,w){v=""+v;
if(k(u)){for(;
v.length<w;
){v="0"+v
}}return v
},p=function(u,v,w,x){return k(u)?x[v]:w[v]
},q="",s=false;
if(h){for(var r=0;
r<b.length;
r++){if(s){if(b.charAt(r)=="'"&&!k("'")){s=false
}else{q+=b.charAt(r)
}}else{switch(b.charAt(r)){case"d":q+=m("d",h.getDate(),2);
break;
case"D":q+=p("D",h.getDay(),l,o);
break;
case"o":q+=m("o",(h.getTime()-(new Date(h.getFullYear(),0,0)).getTime())/86400000,3);
break;
case"m":q+=m("m",h.getMonth()+1,2);
break;
case"M":q+=p("M",h.getMonth(),n,j);
break;
case"y":q+=k("y")?h.getFullYear():(h.getYear()%100<10?"0":"")+h.getYear()%100;
break;
case"@":q+=h.getTime();
break;
case"!":q+=h.getTime()*10000+this._ticksTo1970;
break;
case"'":if(k("'")){q+="'"
}else{s=true
}break;
default:q+=b.charAt(r)
}}}}return q
},_possibleChars:function(b){for(var h="",j=false,l=function(n){(n=o+1<b.length&&b.charAt(o+1)==n)&&o++;
return n
},o=0;
o<b.length;
o++){if(j){if(b.charAt(o)=="'"&&!l("'")){j=false
}else{h+=b.charAt(o)
}}else{switch(b.charAt(o)){case"d":case"m":case"y":case"@":h+="0123456789";
break;
case"D":case"M":return null;
case"'":if(l("'")){h+="'"
}else{j=true
}break;
default:h+=b.charAt(o)
}}}return h
},_get:function(b,h){return b.settings[h]!==d?b.settings[h]:this._defaults[h]
},_setDateFromField:function(b,h){if(b.input.val()!=b.lastVal){var j=this._get(b,"dateFormat"),l=b.lastVal=b.input?b.input.val():null,o,n;
o=n=this._getDefaultDate(b);
var k=this._getFormatConfig(b);
try{o=this.parseDate(j,l,k)||n
}catch(m){this.log(m);
l=h?"":l
}b.selectedDay=o.getDate();
b.drawMonth=b.selectedMonth=o.getMonth();
b.drawYear=b.selectedYear=o.getFullYear();
b.currentDay=l?o.getDate():0;
b.currentMonth=l?o.getMonth():0;
b.currentYear=l?o.getFullYear():0;
this._adjustInstDate(b)
}},_getDefaultDate:function(b){return this._restrictMinMax(b,this._determineDate(b,this._get(b,"defaultDate"),new Date))
},_determineDate:function(b,h,j){var l=function(n){var k=new Date;
k.setDate(k.getDate()+n);
return k
},o=function(n){try{return a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),n,a.datepicker._getFormatConfig(b))
}catch(k){}var m=(n.toLowerCase().match(/^c/)?a.datepicker._getDate(b):null)||new Date,p=m.getFullYear(),q=m.getMonth();
m=m.getDate();
for(var s=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,r=s.exec(n);
r;
){switch(r[2]||"d"){case"d":case"D":m+=parseInt(r[1],10);
break;
case"w":case"W":m+=parseInt(r[1],10)*7;
break;
case"m":case"M":q+=parseInt(r[1],10);
m=Math.min(m,a.datepicker._getDaysInMonth(p,q));
break;
case"y":case"Y":p+=parseInt(r[1],10);
m=Math.min(m,a.datepicker._getDaysInMonth(p,q));
break
}r=s.exec(n)
}return new Date(p,q,m)
};
if(h=(h=h==null||h===""?j:typeof h=="string"?o(h):typeof h=="number"?isNaN(h)?j:l(h):new Date(h.getTime()))&&h.toString()=="Invalid Date"?j:h){h.setHours(0);
h.setMinutes(0);
h.setSeconds(0);
h.setMilliseconds(0)
}return this._daylightSavingAdjust(h)
},_daylightSavingAdjust:function(b){if(!b){return null
}b.setHours(b.getHours()>12?b.getHours()+2:0);
return b
},_setDate:function(b,h,j){var l=!h,o=b.selectedMonth,n=b.selectedYear;
h=this._restrictMinMax(b,this._determineDate(b,h,new Date));
b.selectedDay=b.currentDay=h.getDate();
b.drawMonth=b.selectedMonth=b.currentMonth=h.getMonth();
b.drawYear=b.selectedYear=b.currentYear=h.getFullYear();
if((o!=b.selectedMonth||n!=b.selectedYear)&&!j){this._notifyChange(b)
}this._adjustInstDate(b);
if(b.input){b.input.val(l?"":this._formatDate(b))
}},_getDate:function(b){return !b.currentYear||b.input&&b.input.val()==""?null:this._daylightSavingAdjust(new Date(b.currentYear,b.currentMonth,b.currentDay))
},_generateHTML:function(b){var h=new Date;
h=this._daylightSavingAdjust(new Date(h.getFullYear(),h.getMonth(),h.getDate()));
var j=this._get(b,"isRTL"),l=this._get(b,"showButtonPanel"),o=this._get(b,"hideIfNoPrevNext"),n=this._get(b,"navigationAsDateFormat"),k=this._getNumberOfMonths(b),m=this._get(b,"showCurrentAtPos"),p=this._get(b,"stepMonths"),q=k[0]!=1||k[1]!=1,s=this._daylightSavingAdjust(!b.currentDay?new Date(9999,9,9):new Date(b.currentYear,b.currentMonth,b.currentDay)),r=this._getMinMaxDate(b,"min"),u=this._getMinMaxDate(b,"max");
m=b.drawMonth-m;
var v=b.drawYear;
if(m<0){m+=12;
v--
}if(u){var w=this._daylightSavingAdjust(new Date(u.getFullYear(),u.getMonth()-k[0]*k[1]+1,u.getDate()));
for(w=r&&w<r?r:w;
this._daylightSavingAdjust(new Date(v,m,1))>w;
){m--;
if(m<0){m=11;
v--
}}}b.drawMonth=m;
b.drawYear=v;
w=this._get(b,"prevText");
w=!n?w:this.formatDate(w,this._daylightSavingAdjust(new Date(v,m-p,1)),this._getFormatConfig(b));
w=this._canAdjustMonth(b,-1,v,m)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+e+".datepicker._adjustDate('#"+b.id+"', -"+p+", 'M');\" title=\""+w+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"e":"w")+'">'+w+"</span></a>":o?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+w+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"e":"w")+'">'+w+"</span></a>";
var x=this._get(b,"nextText");
x=!n?x:this.formatDate(x,this._daylightSavingAdjust(new Date(v,m+p,1)),this._getFormatConfig(b));
o=this._canAdjustMonth(b,+1,v,m)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+e+".datepicker._adjustDate('#"+b.id+"', +"+p+", 'M');\" title=\""+x+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"w":"e")+'">'+x+"</span></a>":o?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+x+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"w":"e")+'">'+x+"</span></a>";
p=this._get(b,"currentText");
x=this._get(b,"gotoCurrent")&&b.currentDay?s:h;
p=!n?p:this.formatDate(p,x,this._getFormatConfig(b));
n=!b.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+e+'.datepicker._hideDatepicker();">'+this._get(b,"closeText")+"</button>":"";
l=l?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(j?n:"")+(this._isInRange(b,x)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+e+".datepicker._gotoToday('#"+b.id+"');\">"+p+"</button>":"")+(j?"":n)+"</div>":"";
n=parseInt(this._get(b,"firstDay"),10);
n=isNaN(n)?0:n;
p=this._get(b,"showWeek");
x=this._get(b,"dayNames");
this._get(b,"dayNamesShort");
var z=this._get(b,"dayNamesMin"),G=this._get(b,"monthNames"),C=this._get(b,"monthNamesShort"),y=this._get(b,"beforeShowDay"),H=this._get(b,"showOtherMonths"),N=this._get(b,"selectOtherMonths");
this._get(b,"calculateWeek");
for(var J=this._getDefaultDate(b),D="",E=0;
E<k[0];
E++){for(var P="",L=0;
L<k[1];
L++){var Q=this._daylightSavingAdjust(new Date(v,m,b.selectedDay)),B=" ui-corner-all",F="";
if(q){F+='<div class="ui-datepicker-group';
if(k[1]>1){switch(L){case 0:F+=" ui-datepicker-group-first";
B=" ui-corner-"+(j?"right":"left");
break;
case k[1]-1:F+=" ui-datepicker-group-last";
B=" ui-corner-"+(j?"left":"right");
break;
default:F+=" ui-datepicker-group-middle";
B="";
break
}}F+='">'
}F+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+B+'">'+(/all|left/.test(B)&&E==0?j?o:w:"")+(/all|right/.test(B)&&E==0?j?w:o:"")+this._generateMonthYearHeader(b,m,v,r,u,E>0||L>0,G,C)+'</div><table class="ui-datepicker-calendar"><thead><tr>';
var I=p?'<th class="ui-datepicker-week-col">'+this._get(b,"weekHeader")+"</th>":"";
for(B=0;
B<7;
B++){var A=(B+n)%7;
I+="<th"+((B+n+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+x[A]+'">'+z[A]+"</span></th>"
}F+=I+"</tr></thead><tbody>";
I=this._getDaysInMonth(v,m);
if(v==b.selectedYear&&m==b.selectedMonth){b.selectedDay=Math.min(b.selectedDay,I)
}B=(this._getFirstDayOfMonth(v,m)-n+7)%7;
I=q?6:Math.ceil((B+I)/7);
A=this._daylightSavingAdjust(new Date(v,m,1-B));
for(var R=0;
R<I;
R++){F+="<tr>";
var S=!p?"":'<td class="ui-datepicker-week-col">'+this._get(b,"calculateWeek")(A)+"</td>";
for(B=0;
B<7;
B++){var M=y?y.apply(b.input?b.input[0]:null,[A]):[true,""],K=A.getMonth()!=m,O=K&&!N||!M[0]||r&&A<r||u&&A>u;
S+='<td class="'+((B+n+6)%7>=5?" ui-datepicker-week-end":"")+(K?" ui-datepicker-other-month":"")+(A.getTime()==Q.getTime()&&m==b.selectedMonth&&b._keyEvent||J.getTime()==A.getTime()&&J.getTime()==Q.getTime()?" "+this._dayOverClass:"")+(O?" "+this._unselectableClass+" ui-state-disabled":"")+(K&&!H?"":" "+M[1]+(A.getTime()==s.getTime()?" "+this._currentClass:"")+(A.getTime()==h.getTime()?" ui-datepicker-today":""))+'"'+((!K||H)&&M[2]?' title="'+M[2]+'"':"")+(O?"":' onclick="DP_jQuery_'+e+".datepicker._selectDay('#"+b.id+"',"+A.getMonth()+","+A.getFullYear()+', this);return false;"')+">"+(K&&!H?"&#xa0;":O?'<span class="ui-state-default">'+A.getDate()+"</span>":'<a class="ui-state-default'+(A.getTime()==h.getTime()?" ui-state-highlight":"")+(A.getTime()==s.getTime()?" ui-state-active":"")+(K?" ui-priority-secondary":"")+'" href="#">'+A.getDate()+"</a>")+"</td>";
A.setDate(A.getDate()+1);
A=this._daylightSavingAdjust(A)
}F+=S+"</tr>"
}m++;
if(m>11){m=0;
v++
}F+="</tbody></table>"+(q?"</div>"+(k[0]>0&&L==k[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");
P+=F
}D+=P
}D+=l+(a.browser.msie&&parseInt(a.browser.version,10)<7&&!b.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");
b._keyEvent=false;
return D
},_generateMonthYearHeader:function(b,h,j,l,o,n,k,m){var p=this._get(b,"changeMonth"),q=this._get(b,"changeYear"),s=this._get(b,"showMonthAfterYear"),r='<div class="ui-datepicker-title">',u="";
if(n||!p){u+='<span class="ui-datepicker-month">'+k[h]+"</span>"
}else{k=l&&l.getFullYear()==j;
var v=o&&o.getFullYear()==j;
u+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+e+".datepicker._selectMonthYear('#"+b.id+"', this, 'M');\" onclick=\"DP_jQuery_"+e+".datepicker._clickMonthYear('#"+b.id+"');\">";
for(var w=0;
w<12;
w++){if((!k||w>=l.getMonth())&&(!v||w<=o.getMonth())){u+='<option value="'+w+'"'+(w==h?' selected="selected"':"")+">"+m[w]+"</option>"
}}u+="</select>"
}s||(r+=u+(n||!(p&&q)?"&#xa0;":""));
if(!b.yearshtml){b.yearshtml="";
if(n||!q){r+='<span class="ui-datepicker-year">'+j+"</span>"
}else{m=this._get(b,"yearRange").split(":");
var x=(new Date).getFullYear();
k=function(z){z=z.match(/c[+-].*/)?j+parseInt(z.substring(1),10):z.match(/[+-].*/)?x+parseInt(z,10):parseInt(z,10);
return isNaN(z)?x:z
};
h=k(m[0]);
m=Math.max(h,k(m[1]||""));
h=l?Math.max(h,l.getFullYear()):h;
m=o?Math.min(m,o.getFullYear()):m;
for(b.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+e+".datepicker._selectMonthYear('#"+b.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+e+".datepicker._clickMonthYear('#"+b.id+"');\">";
h<=m;
h++){b.yearshtml+='<option value="'+h+'"'+(h==j?' selected="selected"':"")+">"+h+"</option>"
}b.yearshtml+="</select>";
r+=b.yearshtml;
b.yearshtml=null
}}r+=this._get(b,"yearSuffix");
if(s){r+=(n||!(p&&q)?"&#xa0;":"")+u
}r+="</div>";
return r
},_adjustInstDate:function(b,h,j){var l=b.drawYear+(j=="Y"?h:0),o=b.drawMonth+(j=="M"?h:0);
h=Math.min(b.selectedDay,this._getDaysInMonth(l,o))+(j=="D"?h:0);
l=this._restrictMinMax(b,this._daylightSavingAdjust(new Date(l,o,h)));
b.selectedDay=l.getDate();
b.drawMonth=b.selectedMonth=l.getMonth();
b.drawYear=b.selectedYear=l.getFullYear();
if(j=="M"||j=="Y"){this._notifyChange(b)
}},_restrictMinMax:function(b,h){var j=this._getMinMaxDate(b,"min");
b=this._getMinMaxDate(b,"max");
h=j&&h<j?j:h;
return h=b&&h>b?b:h
},_notifyChange:function(b){var h=this._get(b,"onChangeMonthYear");
if(h){h.apply(b.input?b.input[0]:null,[b.selectedYear,b.selectedMonth+1,b])
}},_getNumberOfMonths:function(b){b=this._get(b,"numberOfMonths");
return b==null?[1,1]:typeof b=="number"?[1,b]:b
},_getMinMaxDate:function(b,h){return this._determineDate(b,this._get(b,h+"Date"),null)
},_getDaysInMonth:function(b,h){return 32-this._daylightSavingAdjust(new Date(b,h,32)).getDate()
},_getFirstDayOfMonth:function(b,h){return(new Date(b,h,1)).getDay()
},_canAdjustMonth:function(b,h,j,l){var o=this._getNumberOfMonths(b);
j=this._daylightSavingAdjust(new Date(j,l+(h<0?h:o[0]*o[1]),1));
h<0&&j.setDate(this._getDaysInMonth(j.getFullYear(),j.getMonth()));
return this._isInRange(b,j)
},_isInRange:function(b,h){var j=this._getMinMaxDate(b,"min");
b=this._getMinMaxDate(b,"max");
return(!j||h.getTime()>=j.getTime())&&(!b||h.getTime()<=b.getTime())
},_getFormatConfig:function(b){var h=this._get(b,"shortYearCutoff");
h=typeof h!="string"?h:(new Date).getFullYear()%100+parseInt(h,10);
return{shortYearCutoff:h,dayNamesShort:this._get(b,"dayNamesShort"),dayNames:this._get(b,"dayNames"),monthNamesShort:this._get(b,"monthNamesShort"),monthNames:this._get(b,"monthNames")}
},_formatDate:function(b,h,j,l){if(!h){b.currentDay=b.selectedDay;
b.currentMonth=b.selectedMonth;
b.currentYear=b.selectedYear
}h=h?typeof h=="object"?h:this._daylightSavingAdjust(new Date(l,j,h)):this._daylightSavingAdjust(new Date(b.currentYear,b.currentMonth,b.currentDay));
return this.formatDate(this._get(b,"dateFormat"),h,this._getFormatConfig(b))
}});
a.fn.datepicker=function(b){if(!this.length){return this
}if(!a.datepicker.initialized){a(document).mousedown(a.datepicker._checkExternalClick).find("body").append(a.datepicker.dpDiv);
a.datepicker.initialized=true
}var h=Array.prototype.slice.call(arguments,1);
if(typeof b=="string"&&(b=="isDisabled"||b=="getDate"||b=="widget")){return a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(h))
}if(b=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(h))
}return this.each(function(){typeof b=="string"?a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this].concat(h)):a.datepicker._attachDatepicker(this,b)
})
};
a.datepicker=new c;
a.datepicker.initialized=false;
a.datepicker.uuid=(new Date).getTime();
a.datepicker.version="1.8.13";
window["DP_jQuery_"+e]=a
})(jQuery);
(function(A,D){var E={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},C={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},B=A.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};
A.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(G){var F=A(this).css(G).offset().top;
F<0&&A(this).css("top",G.top-F)
}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var K=this,I=K.options,F=I.title||"&#160;",J=A.ui.dialog.getTitleId(K.element),H=(K.uiDialog=A("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+I.dialogClass).css({zIndex:I.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(M){if(I.closeOnEscape&&M.keyCode&&M.keyCode===A.ui.keyCode.ESCAPE){K.close(M);
M.preventDefault()
}}).attr({role:"dialog","aria-labelledby":J}).mousedown(function(M){K.moveToTop(false,M)
});
K.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(H);
var G=(K.uiDialogTitlebar=A("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(H),L=A('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){L.addClass("ui-state-hover")
},function(){L.removeClass("ui-state-hover")
}).focus(function(){L.addClass("ui-state-focus")
}).blur(function(){L.removeClass("ui-state-focus")
}).click(function(M){K.close(M);
return false
}).appendTo(G);
(K.uiDialogTitlebarCloseText=A("<span></span>")).addClass("ui-icon ui-icon-closethick").text(I.closeText).appendTo(L);
A("<span></span>").addClass("ui-dialog-title").attr("id",J).html(F).prependTo(G);
if(A.isFunction(I.beforeclose)&&!A.isFunction(I.beforeClose)){I.beforeClose=I.beforeclose
}G.find("*").add(G).disableSelection();
I.draggable&&A.fn.draggable&&K._makeDraggable();
I.resizable&&A.fn.resizable&&K._makeResizable();
K._createButtons(I.buttons);
K._isOpen=false;
A.fn.bgiframe&&H.bgiframe()
},_init:function(){this.options.autoOpen&&this.open()
},destroy:function(){var F=this;
F.overlay&&F.overlay.destroy();
F.uiDialog.hide();
F.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
F.uiDialog.remove();
F.originalTitle&&F.element.attr("title",F.originalTitle);
return F
},widget:function(){return this.uiDialog
},close:function(I){var G=this,F,H;
if(false!==G._trigger("beforeClose",I)){G.overlay&&G.overlay.destroy();
G.uiDialog.unbind("keypress.ui-dialog");
G._isOpen=false;
if(G.options.hide){G.uiDialog.hide(G.options.hide,function(){G._trigger("close",I)
})
}else{G.uiDialog.hide();
G._trigger("close",I)
}A.ui.dialog.overlay.resize();
if(G.options.modal){F=0;
A(".ui-dialog").each(function(){if(this!==G.uiDialog[0]){H=A(this).css("z-index");
isNaN(H)||(F=Math.max(F,H))
}});
A.ui.dialog.maxZ=F
}return G
}},isOpen:function(){return this._isOpen
},moveToTop:function(I,G){var F=this,H=F.options;
if(H.modal&&!I||!H.stack&&!H.modal){return F._trigger("focus",G)
}if(H.zIndex>A.ui.dialog.maxZ){A.ui.dialog.maxZ=H.zIndex
}if(F.overlay){A.ui.dialog.maxZ+=1;
F.overlay.$el.css("z-index",A.ui.dialog.overlay.maxZ=A.ui.dialog.maxZ)
}I={scrollTop:F.element.attr("scrollTop"),scrollLeft:F.element.attr("scrollLeft")};
A.ui.dialog.maxZ+=1;
F.uiDialog.css("z-index",A.ui.dialog.maxZ);
F.element.attr(I);
F._trigger("focus",G);
return F
},open:function(){if(!this._isOpen){var H=this,G=H.options,F=H.uiDialog;
H.overlay=G.modal?new A.ui.dialog.overlay(H):null;
H._size();
H._position(G.position);
F.show(G.show);
H.moveToTop(true);
G.modal&&F.bind("keypress.ui-dialog",function(K){if(K.keyCode===A.ui.keyCode.TAB){var J=A(":tabbable",this),I=J.filter(":first");
J=J.filter(":last");
if(K.target===J[0]&&!K.shiftKey){I.focus(1);
return false
}else{if(K.target===I[0]&&K.shiftKey){J.focus(1);
return false
}}}});
A(H.element.find(":tabbable").get().concat(F.find(".ui-dialog-buttonpane :tabbable").get().concat(F.get()))).eq(0).focus();
H._isOpen=true;
H._trigger("open");
return H
}},_createButtons:function(J){var H=this,F=false,I=A("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),G=A("<div></div>").addClass("ui-dialog-buttonset").appendTo(I);
H.uiDialog.find(".ui-dialog-buttonpane").remove();
typeof J==="object"&&J!==null&&A.each(J,function(){return !(F=true)
});
if(F){A.each(J,function(K,L){L=A.isFunction(L)?{click:L,text:K}:L;
var M=A('<button type="button"></button>').click(function(){L.click.apply(H.element[0],arguments)
}).appendTo(G);
A.each(L,function(O,N){if(O!=="click"){O in B?M[O](N):M.attr(O,N)
}});
A.fn.button&&M.button()
});
I.appendTo(H.uiDialog)
}},_makeDraggable:function(){function J(K){return{position:K.position,offset:K.offset}
}var H=this,F=H.options,I=A(document),G;
H.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(K,L){G=F.height==="auto"?"auto":A(this).height();
A(this).height(A(this).height()).addClass("ui-dialog-dragging");
H._trigger("dragStart",K,J(L))
},drag:function(K,L){H._trigger("drag",K,J(L))
},stop:function(K,L){F.position=[L.position.left-I.scrollLeft(),L.position.top-I.scrollTop()];
A(this).removeClass("ui-dialog-dragging").height(G);
H._trigger("dragStop",K,J(L));
A.ui.dialog.overlay.resize()
}})
},_makeResizable:function(J){function H(K){return{originalPosition:K.originalPosition,originalSize:K.originalSize,position:K.position,size:K.size}
}J=J===D?this.options.resizable:J;
var F=this,I=F.options,G=F.uiDialog.css("position");
J=typeof J==="string"?J:"n,e,s,w,se,sw,ne,nw";
F.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:F.element,maxWidth:I.maxWidth,maxHeight:I.maxHeight,minWidth:I.minWidth,minHeight:F._minHeight(),handles:J,start:function(K,L){A(this).addClass("ui-dialog-resizing");
F._trigger("resizeStart",K,H(L))
},resize:function(K,L){F._trigger("resize",K,H(L))
},stop:function(K,L){A(this).removeClass("ui-dialog-resizing");
I.height=A(this).height();
I.width=A(this).width();
F._trigger("resizeStop",K,H(L));
A.ui.dialog.overlay.resize()
}}).css("position",G).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var F=this.options;
return F.height==="auto"?F.minHeight:Math.min(F.minHeight,F.height)
},_position:function(I){var G=[],F=[0,0],H;
if(I){if(typeof I==="string"||typeof I==="object"&&"0" in I){G=I.split?I.split(" "):[I[0],I[1]];
if(G.length===1){G[1]=G[0]
}A.each(["left","top"],function(K,J){if(+G[K]===G[K]){F[K]=G[K];
G[K]=J
}});
I={my:G.join(" "),at:G.join(" "),offset:F.join(" ")}
}I=A.extend({},A.ui.dialog.prototype.options.position,I)
}else{I=A.ui.dialog.prototype.options.position
}(H=this.uiDialog.is(":visible"))||this.uiDialog.show();
this.uiDialog.css({top:0,left:0}).position(A.extend({of:window},I));
H||this.uiDialog.hide()
},_setOptions:function(I){var G=this,F={},H=false;
A.each(I,function(K,J){G._setOption(K,J);
if(K in E){H=true
}if(K in C){F[K]=J
}});
H&&this._size();
this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",F)
},_setOption:function(J,H){var F=this,I=F.uiDialog;
switch(J){case"beforeclose":J="beforeClose";
break;
case"buttons":F._createButtons(H);
break;
case"closeText":F.uiDialogTitlebarCloseText.text(""+H);
break;
case"dialogClass":I.removeClass(F.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+H);
break;
case"disabled":H?I.addClass("ui-dialog-disabled"):I.removeClass("ui-dialog-disabled");
break;
case"draggable":var G=I.is(":data(draggable)");
G&&!H&&I.draggable("destroy");
!G&&H&&F._makeDraggable();
break;
case"position":F._position(H);
break;
case"resizable":(G=I.is(":data(resizable)"))&&!H&&I.resizable("destroy");
G&&typeof H==="string"&&I.resizable("option","handles",H);
!G&&H!==false&&F._makeResizable(H);
break;
case"title":A(".ui-dialog-title",F.uiDialogTitlebar).html(""+(H||"&#160;"));
break
}A.Widget.prototype._setOption.apply(F,arguments)
},_size:function(){var I=this.options,G,F,H=this.uiDialog.is(":visible");
this.element.show().css({width:"auto",minHeight:0,height:0});
if(I.minWidth>I.width){I.width=I.minWidth
}G=this.uiDialog.css({height:"auto",width:I.width}).height();
F=Math.max(0,I.minHeight-G);
if(I.height==="auto"){if(A.support.minHeight){this.element.css({minHeight:F,height:"auto"})
}else{this.uiDialog.show();
I=this.element.css("height","auto").height();
H||this.uiDialog.hide();
this.element.height(Math.max(I,F))
}}else{this.element.height(Math.max(I.height-G,0))
}this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())
}});
A.extend(A.ui.dialog,{version:"1.8.13",uuid:0,maxZ:0,getTitleId:function(F){F=F.attr("id");
if(!F){this.uuid+=1;
F=this.uuid
}return"ui-dialog-title-"+F
},overlay:function(F){this.$el=A.ui.dialog.overlay.create(F)
}});
A.extend(A.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:A.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(F){return F+".dialog-overlay"
}).join(" "),create:function(G){if(this.instances.length===0){setTimeout(function(){A.ui.dialog.overlay.instances.length&&A(document).bind(A.ui.dialog.overlay.events,function(H){if(A(H.target).zIndex()<A.ui.dialog.overlay.maxZ){return false
}})
},1);
A(document).bind("keydown.dialog-overlay",function(H){if(G.options.closeOnEscape&&H.keyCode&&H.keyCode===A.ui.keyCode.ESCAPE){G.close(H);
H.preventDefault()
}});
A(window).bind("resize.dialog-overlay",A.ui.dialog.overlay.resize)
}var F=(this.oldInstances.pop()||A("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
A.fn.bgiframe&&F.bgiframe();
this.instances.push(F);
return F
},destroy:function(H){var G=A.inArray(H,this.instances);
G!=-1&&this.oldInstances.push(this.instances.splice(G,1)[0]);
this.instances.length===0&&A([document,window]).unbind(".dialog-overlay");
H.remove();
var F=0;
A.each(this.instances,function(){F=Math.max(F,this.css("z-index"))
});
this.maxZ=F
},height:function(){var G,F;
if(A.browser.msie&&A.browser.version<7){G=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
F=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
return G<F?A(window).height()+"px":G+"px"
}else{return A(document).height()+"px"
}},width:function(){var G,F;
if(A.browser.msie&&A.browser.version<7){G=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
F=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
return G<F?A(window).width()+"px":G+"px"
}else{return A(document).width()+"px"
}},resize:function(){var F=A([]);
A.each(A.ui.dialog.overlay.instances,function(){F=F.add(this)
});
F.css({width:0,height:0}).css({width:A.ui.dialog.overlay.width(),height:A.ui.dialog.overlay.height()})
}});
A.extend(A.ui.dialog.overlay.prototype,{destroy:function(){A.ui.dialog.overlay.destroy(this.$el)
}})
})(jQuery);
(function(A){A.ui=A.ui||{};
var D=/left|center|right/,E=/top|center|bottom/,C=A.fn.position,B=A.fn.offset;
A.fn.position=function(K){if(!K||!K.of){return C.apply(this,arguments)
}K=A.extend({},K);
var I=A(K.of),F=I[0],J=(K.collision||"flip").split(" "),H=K.offset?K.offset.split(" "):[0,0],G,L,M;
if(F.nodeType===9){G=I.width();
L=I.height();
M={top:0,left:0}
}else{if(F.setTimeout){G=I.width();
L=I.height();
M={top:I.scrollTop(),left:I.scrollLeft()}
}else{if(F.preventDefault){K.at="left top";
G=L=0;
M={top:K.of.pageY,left:K.of.pageX}
}else{G=I.outerWidth();
L=I.outerHeight();
M=I.offset()
}}}A.each(["my","at"],function(){var N=(K[this]||"").split(" ");
if(N.length===1){N=D.test(N[0])?N.concat(["center"]):E.test(N[0])?["center"].concat(N):["center","center"]
}N[0]=D.test(N[0])?N[0]:"center";
N[1]=E.test(N[1])?N[1]:"center";
K[this]=N
});
if(J.length===1){J[1]=J[0]
}H[0]=parseInt(H[0],10)||0;
if(H.length===1){H[1]=H[0]
}H[1]=parseInt(H[1],10)||0;
if(K.at[0]==="right"){M.left+=G
}else{if(K.at[0]==="center"){M.left+=G/2
}}if(K.at[1]==="bottom"){M.top+=L
}else{if(K.at[1]==="center"){M.top+=L/2
}}M.left+=H[0];
M.top+=H[1];
return this.each(function(){var R=A(this),Q=R.outerWidth(),P=R.outerHeight(),O=parseInt(A.curCSS(this,"marginLeft",true))||0,V=parseInt(A.curCSS(this,"marginTop",true))||0,N=Q+O+(parseInt(A.curCSS(this,"marginRight",true))||0),U=P+V+(parseInt(A.curCSS(this,"marginBottom",true))||0),T=A.extend({},M),S;
if(K.my[0]==="right"){T.left-=Q
}else{if(K.my[0]==="center"){T.left-=Q/2
}}if(K.my[1]==="bottom"){T.top-=P
}else{if(K.my[1]==="center"){T.top-=P/2
}}T.left=Math.round(T.left);
T.top=Math.round(T.top);
S={left:T.left-O,top:T.top-V};
A.each(["left","top"],function(W,X){A.ui.position[J[W]]&&A.ui.position[J[W]][X](T,{targetWidth:G,targetHeight:L,elemWidth:Q,elemHeight:P,collisionPosition:S,collisionWidth:N,collisionHeight:U,offset:H,my:K.my,at:K.at})
});
A.fn.bgiframe&&R.bgiframe();
R.offset(A.extend(T,{using:K.using}))
})
};
A.ui.position={fit:{left:function(H,G){var F=A(window);
F=G.collisionPosition.left+G.collisionWidth-F.width()-F.scrollLeft();
H.left=F>0?H.left-F:Math.max(H.left-G.collisionPosition.left,H.left)
},top:function(H,G){var F=A(window);
F=G.collisionPosition.top+G.collisionHeight-F.height()-F.scrollTop();
H.top=F>0?H.top-F:Math.max(H.top-G.collisionPosition.top,H.top)
}},flip:{left:function(K,I){if(I.at[0]!=="center"){var F=A(window);
F=I.collisionPosition.left+I.collisionWidth-F.width()-F.scrollLeft();
var J=I.my[0]==="left"?-I.elemWidth:I.my[0]==="right"?I.elemWidth:0,H=I.at[0]==="left"?I.targetWidth:-I.targetWidth,G=-2*I.offset[0];
K.left+=I.collisionPosition.left<0?J+H+G:F>0?J+H+G:0
}},top:function(K,I){if(I.at[1]!=="center"){var F=A(window);
F=I.collisionPosition.top+I.collisionHeight-F.height()-F.scrollTop();
var J=I.my[1]==="top"?-I.elemHeight:I.my[1]==="bottom"?I.elemHeight:0,H=I.at[1]==="top"?I.targetHeight:-I.targetHeight,G=-2*I.offset[1];
K.top+=I.collisionPosition.top<0?J+H+G:F>0?J+H+G:0
}}}};
if(!A.offset.setOffset){A.offset.setOffset=function(K,I){if(/static/.test(A.curCSS(K,"position"))){K.style.position="relative"
}var F=A(K),J=F.offset(),H=parseInt(A.curCSS(K,"top",true),10)||0,G=parseInt(A.curCSS(K,"left",true),10)||0;
J={top:I.top-J.top+H,left:I.left-J.left+G};
"using" in I?I.using.call(K,J):F.css(J)
};
A.fn.offset=function(G){var F=this[0];
if(!F||!F.ownerDocument){return null
}if(G){return this.each(function(){A.offset.setOffset(this,G)
})
}return B.call(this)
}
}})(jQuery);
(function(A,B){A.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});
this.valueDiv=A("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
this.oldValue=this._value();
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();
A.Widget.prototype.destroy.apply(this,arguments)
},value:function(C){if(C===B){return this._value()
}this._setOption("value",C);
return this
},_setOption:function(D,C){if(D==="value"){this.options.value=C;
this._refreshValue();
this._value()===this.options.max&&this._trigger("complete")
}A.Widget.prototype._setOption.apply(this,arguments)
},_value:function(){var C=this.options.value;
if(typeof C!=="number"){C=0
}return Math.min(this.options.max,Math.max(this.min,C))
},_percentage:function(){return 100*this._value()/this.options.max
},_refreshValue:function(){var D=this.value(),C=this._percentage();
if(this.oldValue!==D){this.oldValue=D;
this._trigger("change")
}this.valueDiv.toggle(D>this.min).toggleClass("ui-corner-right",D===this.options.max).width(C.toFixed(0)+"%");
this.element.attr("aria-valuenow",D)
}});
A.extend(A.ui.progressbar,{version:"1.8.13"})
})(jQuery);
(function(A){A.widget("ui.slider",A.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var F=this,G=this.options,D=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),C=G.values&&G.values.length||1,E=[];
this._mouseSliding=this._keySliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(G.disabled?" ui-slider-disabled ui-disabled":""));
this.range=A([]);
if(G.range){if(G.range===true){if(!G.values){G.values=[this._valueMin(),this._valueMin()]
}if(G.values.length&&G.values.length!==2){G.values=[G.values[0],G.values[0]]
}}this.range=A("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(G.range==="min"||G.range==="max"?" ui-slider-range-"+G.range:""))
}for(var B=D.length;
B<C;
B+=1){E.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>")
}this.handles=D.add(A(E.join("")).appendTo(F.element));
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(H){H.preventDefault()
}).hover(function(){G.disabled||A(this).addClass("ui-state-hover")
},function(){A(this).removeClass("ui-state-hover")
}).focus(function(){if(G.disabled){A(this).blur()
}else{A(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
A(this).addClass("ui-state-focus")
}}).blur(function(){A(this).removeClass("ui-state-focus")
});
this.handles.each(function(H){A(this).data("index.ui-slider-handle",H)
});
this.handles.keydown(function(H){var K=true,J=A(this).data("index.ui-slider-handle"),I,L,M;
if(!F.options.disabled){switch(H.keyCode){case A.ui.keyCode.HOME:case A.ui.keyCode.END:case A.ui.keyCode.PAGE_UP:case A.ui.keyCode.PAGE_DOWN:case A.ui.keyCode.UP:case A.ui.keyCode.RIGHT:case A.ui.keyCode.DOWN:case A.ui.keyCode.LEFT:K=false;
if(!F._keySliding){F._keySliding=true;
A(this).addClass("ui-state-active");
I=F._start(H,J);
if(I===false){return 
}}break
}M=F.options.step;
I=F.options.values&&F.options.values.length?(L=F.values(J)):(L=F.value());
switch(H.keyCode){case A.ui.keyCode.HOME:L=F._valueMin();
break;
case A.ui.keyCode.END:L=F._valueMax();
break;
case A.ui.keyCode.PAGE_UP:L=F._trimAlignValue(I+(F._valueMax()-F._valueMin())/5);
break;
case A.ui.keyCode.PAGE_DOWN:L=F._trimAlignValue(I-(F._valueMax()-F._valueMin())/5);
break;
case A.ui.keyCode.UP:case A.ui.keyCode.RIGHT:if(I===F._valueMax()){return 
}L=F._trimAlignValue(I+M);
break;
case A.ui.keyCode.DOWN:case A.ui.keyCode.LEFT:if(I===F._valueMin()){return 
}L=F._trimAlignValue(I-M);
break
}F._slide(H,J,L);
return K
}}).keyup(function(H){var I=A(this).data("index.ui-slider-handle");
if(F._keySliding){F._keySliding=false;
F._stop(H,I);
F._change(H,I);
A(this).removeClass("ui-state-active")
}});
this._refreshValue();
this._animateOff=false
},destroy:function(){this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();
return this
},_mouseCapture:function(G){var H=this.options,E,D,F,C,B;
if(H.disabled){return false
}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
E=this._normValueFromMouse({x:G.pageX,y:G.pageY});
D=this._valueMax()-this._valueMin()+1;
C=this;
this.handles.each(function(J){var I=Math.abs(E-C.values(J));
if(D>I){D=I;
F=A(this);
B=J
}});
if(H.range===true&&this.values(1)===H.min){B+=1;
F=A(this.handles[B])
}if(this._start(G,B)===false){return false
}this._mouseSliding=true;
C._handleIndex=B;
F.addClass("ui-state-active").focus();
H=F.offset();
this._clickOffset=!A(G.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:G.pageX-H.left-F.width()/2,top:G.pageY-H.top-F.height()/2-(parseInt(F.css("borderTopWidth"),10)||0)-(parseInt(F.css("borderBottomWidth"),10)||0)+(parseInt(F.css("marginTop"),10)||0)};
this.handles.hasClass("ui-state-hover")||this._slide(G,B,E);
return this._animateOff=true
},_mouseStart:function(){return true
},_mouseDrag:function(B){var C=this._normValueFromMouse({x:B.pageX,y:B.pageY});
this._slide(B,this._handleIndex,C);
return false
},_mouseStop:function(B){this.handles.removeClass("ui-state-active");
this._mouseSliding=false;
this._stop(B,this._handleIndex);
this._change(B,this._handleIndex);
this._clickOffset=this._handleIndex=null;
return this._animateOff=false
},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"
},_normValueFromMouse:function(B){var C;
if(this.orientation==="horizontal"){C=this.elementSize.width;
B=B.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{C=this.elementSize.height;
B=B.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}C=B/C;
if(C>1){C=1
}if(C<0){C=0
}if(this.orientation==="vertical"){C=1-C
}B=this._valueMax()-this._valueMin();
return this._trimAlignValue(this._valueMin()+C*B)
},_start:function(C,D){var B={handle:this.handles[D],value:this.value()};
if(this.options.values&&this.options.values.length){B.value=this.values(D);
B.values=this.values()
}return this._trigger("start",C,B)
},_slide:function(D,E,C){var B;
if(this.options.values&&this.options.values.length){B=this.values(E?0:1);
if(this.options.values.length===2&&this.options.range===true&&(E===0&&C>B||E===1&&C<B)){C=B
}if(C!==this.values(E)){B=this.values();
B[E]=C;
D=this._trigger("slide",D,{handle:this.handles[E],value:C,values:B});
this.values(E?0:1);
D!==false&&this.values(E,C,true)
}}else{if(C!==this.value()){D=this._trigger("slide",D,{handle:this.handles[E],value:C});
D!==false&&this.value(C)
}}},_stop:function(C,D){var B={handle:this.handles[D],value:this.value()};
if(this.options.values&&this.options.values.length){B.value=this.values(D);
B.values=this.values()
}this._trigger("stop",C,B)
},_change:function(C,D){if(!this._keySliding&&!this._mouseSliding){var B={handle:this.handles[D],value:this.value()};
if(this.options.values&&this.options.values.length){B.value=this.values(D);
B.values=this.values()
}this._trigger("change",C,B)
}},value:function(B){if(arguments.length){this.options.value=this._trimAlignValue(B);
this._refreshValue();
this._change(null,0)
}else{return this._value()
}},values:function(E,F){var C,B,D;
if(arguments.length>1){this.options.values[E]=this._trimAlignValue(F);
this._refreshValue();
this._change(null,E)
}else{if(arguments.length){if(A.isArray(arguments[0])){C=this.options.values;
B=arguments[0];
for(D=0;
D<C.length;
D+=1){C[D]=this._trimAlignValue(B[D]);
this._change(null,D)
}this._refreshValue()
}else{return this.options.values&&this.options.values.length?this._values(E):this.value()
}}else{return this._values()
}}},_setOption:function(D,E){var C,B=0;
if(A.isArray(this.options.values)){B=this.options.values.length
}A.Widget.prototype._setOption.apply(this,arguments);
switch(D){case"disabled":if(E){this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.attr("disabled","disabled");
this.element.addClass("ui-disabled")
}else{this.handles.removeAttr("disabled");
this.element.removeClass("ui-disabled")
}break;
case"orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue();
break;
case"value":this._animateOff=true;
this._refreshValue();
this._change(null,0);
this._animateOff=false;
break;
case"values":this._animateOff=true;
this._refreshValue();
for(C=0;
C<B;
C+=1){this._change(null,C)
}this._animateOff=false;
break
}},_value:function(){var B=this.options.value;
return B=this._trimAlignValue(B)
},_values:function(C){var D,B;
if(arguments.length){D=this.options.values[C];
return D=this._trimAlignValue(D)
}else{D=this.options.values.slice();
for(B=0;
B<D.length;
B+=1){D[B]=this._trimAlignValue(D[B])
}return D
}},_trimAlignValue:function(C){if(C<=this._valueMin()){return this._valueMin()
}if(C>=this._valueMax()){return this._valueMax()
}var D=this.options.step>0?this.options.step:1,B=(C-this._valueMin())%D;
alignValue=C-B;
if(Math.abs(B)*2>=D){alignValue+=B>0?D:-D
}return parseFloat(alignValue.toFixed(5))
},_valueMin:function(){return this.options.min
},_valueMax:function(){return this.options.max
},_refreshValue:function(){var I=this.options.range,J=this.options,G=this,F=!this._animateOff?J.animate:false,H,D={},K,E,C,B;
if(this.options.values&&this.options.values.length){this.handles.each(function(L){H=(G.values(L)-G._valueMin())/(G._valueMax()-G._valueMin())*100;
D[G.orientation==="horizontal"?"left":"bottom"]=H+"%";
A(this).stop(1,1)[F?"animate":"css"](D,J.animate);
if(G.options.range===true){if(G.orientation==="horizontal"){if(L===0){G.range.stop(1,1)[F?"animate":"css"]({left:H+"%"},J.animate)
}if(L===1){G.range[F?"animate":"css"]({width:H-K+"%"},{queue:false,duration:J.animate})
}}else{if(L===0){G.range.stop(1,1)[F?"animate":"css"]({bottom:H+"%"},J.animate)
}if(L===1){G.range[F?"animate":"css"]({height:H-K+"%"},{queue:false,duration:J.animate})
}}}K=H
})
}else{E=this.value();
C=this._valueMin();
B=this._valueMax();
H=B!==C?(E-C)/(B-C)*100:0;
D[G.orientation==="horizontal"?"left":"bottom"]=H+"%";
this.handle.stop(1,1)[F?"animate":"css"](D,J.animate);
if(I==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[F?"animate":"css"]({width:H+"%"},J.animate)
}if(I==="max"&&this.orientation==="horizontal"){this.range[F?"animate":"css"]({width:100-H+"%"},{queue:false,duration:J.animate})
}if(I==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[F?"animate":"css"]({height:H+"%"},J.animate)
}if(I==="max"&&this.orientation==="vertical"){this.range[F?"animate":"css"]({height:100-H+"%"},{queue:false,duration:J.animate})
}}}});
A.extend(A.ui.slider,{version:"1.8.13"})
})(jQuery);
(function(A,E){function F(){return ++B
}function C(){return ++D
}var B=0,D=0;
A.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)
},_setOption:function(H,G){if(H=="selected"){this.options.collapsible&&G==this.options.selected||this.select(G)
}else{this.options[H]=G;
this._tabify()
}},_tabId:function(G){return G.title&&G.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+F()
},_sanitizeSelector:function(G){return G.replace(/:/g,"\\:")
},_cookie:function(){var G=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+C());
return A.cookie.apply(null,[G].concat(A.makeArray(arguments)))
},_ui:function(H,G){return{tab:H,panel:G,index:this.anchors.index(H)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var G=A(this);
G.html(G.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(O){function Q(T,S){T.css("display","");
!A.support.opacity&&S.opacity&&T[0].style.removeAttribute("filter")
}var P=this,N=this.options,L=/^#.+/;
this.list=this.element.find("ol,ul").eq(0);
this.lis=A(" > li:has(a[href])",this.list);
this.anchors=this.lis.map(function(){return A("a",this)[0]
});
this.panels=A([]);
this.anchors.each(function(W,V){var U=A(V).attr("href"),T=U.split("#")[0],S;
if(T&&(T===location.toString().split("#")[0]||(S=A("base")[0])&&T===S.href)){U=V.hash;
V.href=U
}if(L.test(U)){P.panels=P.panels.add(P.element.find(P._sanitizeSelector(U)))
}else{if(U&&U!=="#"){A.data(V,"href.tabs",U);
A.data(V,"load.tabs",U.replace(/#.*$/,""));
U=P._tabId(V);
V.href="#"+U;
V=P.element.find("#"+U);
if(!V.length){V=A(N.panelTemplate).attr("id",U).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(P.panels[W-1]||P.list);
V.data("destroy.tabs",true)
}P.panels=P.panels.add(V)
}else{N.disabled.push(W)
}}});
if(O){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.lis.addClass("ui-state-default ui-corner-top");
this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(N.selected===E){location.hash&&this.anchors.each(function(T,S){if(S.hash==location.hash){N.selected=T;
return false
}});
if(typeof N.selected!=="number"&&N.cookie){N.selected=parseInt(P._cookie(),10)
}if(typeof N.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length){N.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}N.selected=N.selected||(this.lis.length?0:-1)
}else{if(N.selected===null){N.selected=-1
}}N.selected=N.selected>=0&&this.anchors[N.selected]||N.selected<0?N.selected:0;
N.disabled=A.unique(N.disabled.concat(A.map(this.lis.filter(".ui-state-disabled"),function(S){return P.lis.index(S)
}))).sort();
A.inArray(N.selected,N.disabled)!=-1&&N.disabled.splice(A.inArray(N.selected,N.disabled),1);
this.panels.addClass("ui-tabs-hide");
this.lis.removeClass("ui-tabs-selected ui-state-active");
if(N.selected>=0&&this.anchors.length){P.element.find(P._sanitizeSelector(P.anchors[N.selected].hash)).removeClass("ui-tabs-hide");
this.lis.eq(N.selected).addClass("ui-tabs-selected ui-state-active");
P.element.queue("tabs",function(){P._trigger("show",null,P._ui(P.anchors[N.selected],P.element.find(P._sanitizeSelector(P.anchors[N.selected].hash))[0]))
});
this.load(N.selected)
}A(window).bind("unload",function(){P.lis.add(P.anchors).unbind(".tabs");
P.lis=P.anchors=P.panels=null
})
}else{N.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}this.element[N.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");
N.cookie&&this._cookie(N.selected,N.cookie);
O=0;
for(var I;
I=this.lis[O];
O++){A(I)[A.inArray(O,N.disabled)!=-1&&!A(I).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}N.cache===false&&this.anchors.removeData("cache.tabs");
this.lis.add(this.anchors).unbind(".tabs");
if(N.event!=="mouseover"){var J=function(T,S){S.is(":not(.ui-state-disabled)")&&S.addClass("ui-state-"+T)
},M=function(T,S){S.removeClass("ui-state-"+T)
};
this.lis.bind("mouseover.tabs",function(){J("hover",A(this))
});
this.lis.bind("mouseout.tabs",function(){M("hover",A(this))
});
this.anchors.bind("focus.tabs",function(){J("focus",A(this).closest("li"))
});
this.anchors.bind("blur.tabs",function(){M("focus",A(this).closest("li"))
})
}var K,H;
if(N.fx){if(A.isArray(N.fx)){K=N.fx[0];
H=N.fx[1]
}else{K=H=N.fx
}}var G=H?function(T,S){A(T).closest("li").addClass("ui-tabs-selected ui-state-active");
S.hide().removeClass("ui-tabs-hide").animate(H,H.duration||"normal",function(){Q(S,H);
P._trigger("show",null,P._ui(T,S[0]))
})
}:function(T,S){A(T).closest("li").addClass("ui-tabs-selected ui-state-active");
S.removeClass("ui-tabs-hide");
P._trigger("show",null,P._ui(T,S[0]))
},R=K?function(T,S){S.animate(K,K.duration||"normal",function(){P.lis.removeClass("ui-tabs-selected ui-state-active");
S.addClass("ui-tabs-hide");
Q(S,K);
P.element.dequeue("tabs")
})
}:function(T,S){P.lis.removeClass("ui-tabs-selected ui-state-active");
S.addClass("ui-tabs-hide");
P.element.dequeue("tabs")
};
this.anchors.bind(N.event+".tabs",function(){var V=this,U=A(V).closest("li"),T=P.panels.filter(":not(.ui-tabs-hide)"),S=P.element.find(P._sanitizeSelector(V.hash));
if(U.hasClass("ui-tabs-selected")&&!N.collapsible||U.hasClass("ui-state-disabled")||U.hasClass("ui-state-processing")||P.panels.filter(":animated").length||P._trigger("select",null,P._ui(this,S[0]))===false){this.blur();
return false
}N.selected=P.anchors.index(this);
P.abort();
if(N.collapsible){if(U.hasClass("ui-tabs-selected")){N.selected=-1;
N.cookie&&P._cookie(N.selected,N.cookie);
P.element.queue("tabs",function(){R(V,T)
}).dequeue("tabs");
this.blur();
return false
}else{if(!T.length){N.cookie&&P._cookie(N.selected,N.cookie);
P.element.queue("tabs",function(){G(V,S)
});
P.load(P.anchors.index(this));
this.blur();
return false
}}}N.cookie&&P._cookie(N.selected,N.cookie);
if(S.length){T.length&&P.element.queue("tabs",function(){R(V,T)
});
P.element.queue("tabs",function(){G(V,S)
});
P.load(P.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}A.browser.msie&&this.blur()
});
this.anchors.bind("click.tabs",function(){return false
})
},_getIndex:function(G){if(typeof G=="string"){G=this.anchors.index(this.anchors.filter("[href$="+G+"]"))
}return G
},destroy:function(){var G=this.options;
this.abort();
this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.anchors.each(function(){var H=A.data(this,"href.tabs");
if(H){this.href=H
}var I=A(this).unbind(".tabs");
A.each(["href","load","cache"],function(K,J){I.removeData(J+".tabs")
})
});
this.lis.unbind(".tabs").add(this.panels).each(function(){A.data(this,"destroy.tabs")?A(this).remove():A(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
});
G.cookie&&this._cookie(null,G.cookie);
return this
},add:function(J,G,K){if(K===E){K=this.anchors.length
}var I=this,H=this.options;
G=A(H.tabTemplate.replace(/#\{href\}/g,J).replace(/#\{label\}/g,G));
J=!J.indexOf("#")?J.replace("#",""):this._tabId(A("a",G)[0]);
G.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var L=I.element.find("#"+J);
L.length||(L=A(H.panelTemplate).attr("id",J).data("destroy.tabs",true));
L.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(K>=this.lis.length){G.appendTo(this.list);
L.appendTo(this.list[0].parentNode)
}else{G.insertBefore(this.lis[K]);
L.insertBefore(this.panels[K])
}H.disabled=A.map(H.disabled,function(M){return M>=K?++M:M
});
this._tabify();
if(this.anchors.length==1){H.selected=0;
G.addClass("ui-tabs-selected ui-state-active");
L.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){I._trigger("show",null,I._ui(I.anchors[0],I.panels[0]))
});
this.load(0)
}this._trigger("add",null,this._ui(this.anchors[K],this.panels[K]));
return this
},remove:function(I){I=this._getIndex(I);
var G=this.options,J=this.lis.eq(I).remove(),H=this.panels.eq(I).remove();
if(J.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(I+(I+1<this.anchors.length?1:-1))
}G.disabled=A.map(A.grep(G.disabled,function(K){return K!=I
}),function(K){return K>=I?--K:K
});
this._tabify();
this._trigger("remove",null,this._ui(J.find("a")[0],H[0]));
return this
},enable:function(H){H=this._getIndex(H);
var G=this.options;
if(A.inArray(H,G.disabled)!=-1){this.lis.eq(H).removeClass("ui-state-disabled");
G.disabled=A.grep(G.disabled,function(I){return I!=H
});
this._trigger("enable",null,this._ui(this.anchors[H],this.panels[H]));
return this
}},disable:function(H){H=this._getIndex(H);
var G=this.options;
if(H!=G.selected){this.lis.eq(H).addClass("ui-state-disabled");
G.disabled.push(H);
G.disabled.sort();
this._trigger("disable",null,this._ui(this.anchors[H],this.panels[H]))
}return this
},select:function(G){G=this._getIndex(G);
if(G==-1){if(this.options.collapsible&&this.options.selected!=-1){G=this.options.selected
}else{return this
}}this.anchors.eq(G).trigger(this.options.event+".tabs");
return this
},load:function(J){J=this._getIndex(J);
var G=this,K=this.options,I=this.anchors.eq(J)[0],H=A.data(I,"load.tabs");
this.abort();
if(!H||this.element.queue("tabs").length!==0&&A.data(I,"cache.tabs")){this.element.dequeue("tabs")
}else{this.lis.eq(J).addClass("ui-state-processing");
if(K.spinner){var L=A("span",I);
L.data("label.tabs",L.html()).html(K.spinner)
}this.xhr=A.ajax(A.extend({},K.ajaxOptions,{url:H,success:function(O,N){G.element.find(G._sanitizeSelector(I.hash)).html(O);
G._cleanup();
K.cache&&A.data(I,"cache.tabs",true);
G._trigger("load",null,G._ui(G.anchors[J],G.panels[J]));
try{K.ajaxOptions.success(O,N)
}catch(M){}},error:function(O,N){G._cleanup();
G._trigger("load",null,G._ui(G.anchors[J],G.panels[J]));
try{K.ajaxOptions.error(O,N,J,I)
}catch(M){}}}));
G.element.dequeue("tabs");
return this
}},abort:function(){this.element.queue([]);
this.panels.stop(false,true);
this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));
if(this.xhr){this.xhr.abort();
delete this.xhr
}this._cleanup();
return this
},url:function(H,G){this.anchors.eq(H).removeData("cache.tabs").data("load.tabs",G);
return this
},length:function(){return this.anchors.length
}});
A.extend(A.ui.tabs,{version:"1.8.13"});
A.extend(A.ui.tabs.prototype,{rotation:null,rotate:function(J,G){var K=this,I=this.options,H=K._rotate||(K._rotate=function(L){clearTimeout(K.rotation);
K.rotation=setTimeout(function(){var M=I.selected;
K.select(++M<K.anchors.length?M:0)
},J);
L&&L.stopPropagation()
});
G=K._unrotate||(K._unrotate=!G?function(L){L.clientX&&K.rotate(null)
}:function(){t=I.selected;
H()
});
if(J){this.element.bind("tabsshow",H);
this.anchors.bind(I.event+".tabs",G);
H()
}else{clearTimeout(K.rotation);
this.element.unbind("tabsshow",H);
this.anchors.unbind(I.event+".tabs",G);
delete this._rotate;
delete this._unrotate
}return this
}})
})(jQuery);
(function(j,L,x){var k={transition:"elastic",speed:300,width:false,initialWidth:"600",innerWidth:false,maxWidth:false,height:false,initialHeight:"450",innerHeight:false,maxHeight:false,scalePhotos:true,scrolling:true,inline:false,html:false,iframe:false,fastIframe:true,photo:false,href:false,title:false,rel:false,opacity:0.9,preloading:true,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:false,returnFocus:true,reposition:true,loop:true,slideshow:false,slideshowAuto:true,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:false,onLoad:false,onComplete:false,onCleanup:false,onClosed:false,overlayClose:true,escKey:true,arrowKey:true,top:false,bottom:false,left:false,right:false,fixed:false,data:undefined},X="colorbox",s="cbox",R=s+"Element",w=s+"_open",E=s+"_load",v=s+"_complete",U=s+"_cleanup",AD=s+"_closed",I=s+"_purge",V=!j.support.opacity&&!j.support.style,AG=V&&!x.XMLHttpRequest,AB=s+"_IE6",q,AH,AI,D,h,P,B,p,C,AA,n,K,H,O,T,y,S,r,Z,b,AF,AJ,M,G,A,W,i,N,d,z,m,a,l,AE="div",AC;
function g(AK,AN,AM){var AL=L.createElement(AK);
if(AN){AL.id=s+AN
}if(AM){AL.style.cssText=AM
}return j(AL)
}function e(AL){var AK=C.length,AM=(i+AL)%AK;
return(AM<0)?AK+AM:AM
}function o(AK,AL){return Math.round((/%/.test(AK)?((AL==="x"?AA.width():AA.height())/100):1)*parseInt(AK,10))
}function c(AK){return AF.photo||/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(AK)
}function u(){var AK,AL=j.data(W,X);
if(AL==null){AF=j.extend({},k);
if(console&&console.log){console.log("Error: cboxElement missing settings object")
}}else{AF=j.extend({},AL)
}for(AK in AF){if(j.isFunction(AF[AK])&&AK.slice(0,2)!=="on"){AF[AK]=AF[AK].call(W)
}}AF.rel=AF.rel||W.rel||"nofollow";
AF.href=AF.href||j(W).attr("href");
AF.title=AF.title||W.title;
if(typeof AF.href==="string"){AF.href=j.trim(AF.href)
}}function f(AK,AL){j.event.trigger(AK);
if(AL){AL.call(W)
}}function Y(){var AL,AN=s+"Slideshow_",AO="click."+s,AP,AM,AK;
if(AF.slideshow&&C[1]){AP=function(){y.text(AF.slideshowStop).unbind(AO).bind(v,function(){if(AF.loop||C[i+1]){AL=setTimeout(l.next,AF.slideshowSpeed)
}}).bind(E,function(){clearTimeout(AL)
}).one(AO+" "+U,AM);
AH.removeClass(AN+"off").addClass(AN+"on");
AL=setTimeout(l.next,AF.slideshowSpeed)
};
AM=function(){clearTimeout(AL);
y.text(AF.slideshowStart).unbind([v,E,U,AO].join(" ")).one(AO,function(){l.next();
AP()
});
AH.removeClass(AN+"on").addClass(AN+"off")
};
if(AF.slideshowAuto){AP()
}else{AM()
}}else{AH.removeClass(AN+"off "+AN+"on")
}}function F(AK){if(!m){W=AK;
u();
C=j(W);
i=0;
if(AF.rel!=="nofollow"){C=j("."+R).filter(function(){var AM=j.data(this,X),AL;
if(AM){AL=AM.rel||this.rel
}return(AL===AF.rel)
});
i=C.index(W);
if(i===-1){C=C.add(W);
i=C.length-1
}}if(!d){d=z=true;
AH.show();
if(AF.returnFocus){j(W).blur().one(AD,function(){j(this).focus()
})
}q.css({opacity:+AF.opacity,cursor:AF.overlayClose?"pointer":"auto"}).show();
AF.w=o(AF.initialWidth,"x");
AF.h=o(AF.initialHeight,"y");
l.position();
if(AG){AA.bind("resize."+AB+" scroll."+AB,function(){q.css({width:AA.width(),height:AA.height(),top:AA.scrollTop(),left:AA.scrollLeft()})
}).trigger("resize."+AB)
}f(w,AF.onOpen);
b.add(O).hide();
Z.html(AF.close).show()
}l.load(true)
}}function Q(){if(!AH&&L.body){AC=false;
AA=j(x);
AH=g(AE).attr({id:X,"class":V?s+(AG?"IE6":"IE"):""}).hide();
q=g(AE,"Overlay",AG?"position:absolute":"").hide();
AI=g(AE,"Wrapper");
D=g(AE,"Content").append(n=g(AE,"LoadedContent","width:0; height:0; overflow:hidden"),H=g(AE,"LoadingOverlay").add(g(AE,"LoadingGraphic")),O=g(AE,"Title"),T=g(AE,"Current"),S=g(AE,"Next"),r=g(AE,"Previous"),y=g(AE,"Slideshow").bind(w,Y),Z=g(AE,"Close"));
AI.append(g(AE).append(g(AE,"TopLeft"),h=g(AE,"TopCenter"),g(AE,"TopRight")),g(AE,false,"clear:left").append(P=g(AE,"MiddleLeft"),D,B=g(AE,"MiddleRight")),g(AE,false,"clear:left").append(g(AE,"BottomLeft"),p=g(AE,"BottomCenter"),g(AE,"BottomRight"))).find("div div").css({"float":"left"});
K=g(AE,false,"position:absolute; width:9999px; visibility:hidden; display:none");
b=S.add(r).add(T).add(y);
j(L.body).append(q,AH.append(AI,K))
}}function J(){if(AH){if(!AC){AC=true;
AJ=h.height()+p.height()+D.outerHeight(true)-D.height();
M=P.width()+B.width()+D.outerWidth(true)-D.width();
G=n.outerHeight(true);
A=n.outerWidth(true);
AH.css({"padding-bottom":AJ,"padding-right":M});
S.click(function(){l.next()
});
r.click(function(){l.prev()
});
Z.click(function(){l.close()
});
q.click(function(){if(AF.overlayClose){l.close()
}});
j(L).bind("keydown."+s,function(AL){var AK=AL.keyCode;
if(d&&AF.escKey&&AK===27){AL.preventDefault();
l.close()
}if(d&&AF.arrowKey&&C[1]){if(AK===37){AL.preventDefault();
r.click()
}else{if(AK===39){AL.preventDefault();
S.click()
}}}});
j("."+R,L).live("click",function(AK){if(!(AK.which>1||AK.shiftKey||AK.altKey||AK.metaKey)){AK.preventDefault();
F(this)
}})
}return true
}return false
}if(j.colorbox){return 
}j(Q);
l=j.fn[X]=j[X]=function(AK,AM){var AL=this;
AK=AK||{};
Q();
if(J()){if(!AL[0]){if(AL.selector){return AL
}AL=j("<a/>");
AK.open=true
}if(AM){AK.onComplete=AM
}AL.each(function(){j.data(this,X,j.extend({},j.data(this,X)||k,AK))
}).addClass(R);
if((j.isFunction(AK.open)&&AK.open.call(AL))||AK.open){F(AL[0])
}}return AL
};
l.position=function(AM,AO){var AQ,AS=0,AL=0,AP=AH.offset(),AK,AN;
AA.unbind("resize."+s);
AH.css({top:-90000,left:-90000});
AK=AA.scrollTop();
AN=AA.scrollLeft();
if(AF.fixed&&!AG){AP.top-=AK;
AP.left-=AN;
AH.css({position:"fixed"})
}else{AS=AK;
AL=AN;
AH.css({position:"absolute"})
}if(AF.right!==false){AL+=Math.max(AA.width()-AF.w-A-M-o(AF.right,"x"),0)
}else{if(AF.left!==false){AL+=o(AF.left,"x")
}else{AL+=Math.round(Math.max(AA.width()-AF.w-A-M,0)/2)
}}if(AF.bottom!==false){AS+=Math.max(AA.height()-AF.h-G-AJ-o(AF.bottom,"y"),0)
}else{if(AF.top!==false){AS+=o(AF.top,"y")
}else{AS+=Math.round(Math.max(AA.height()-AF.h-G-AJ,0)/2)
}}AH.css({top:AP.top,left:AP.left});
AM=(AH.width()===AF.w+A&&AH.height()===AF.h+G)?0:AM||0;
AI[0].style.width=AI[0].style.height="9999px";
function AR(AT){h[0].style.width=p[0].style.width=D[0].style.width=AT.style.width;
D[0].style.height=P[0].style.height=B[0].style.height=AT.style.height
}AQ={width:AF.w+A,height:AF.h+G,top:AS,left:AL};
if(AM===0){AH.css(AQ)
}AH.dequeue().animate(AQ,{duration:AM,complete:function(){AR(this);
z=false;
AI[0].style.width=(AF.w+A+M)+"px";
AI[0].style.height=(AF.h+G+AJ)+"px";
if(AF.reposition){setTimeout(function(){AA.bind("resize."+s,l.position)
},1)
}if(AO){AO()
}},step:function(){AR(this)
}})
};
l.resize=function(AK){if(d){AK=AK||{};
if(AK.width){AF.w=o(AK.width,"x")-A-M
}if(AK.innerWidth){AF.w=o(AK.innerWidth,"x")
}n.css({width:AF.w});
if(AK.height){AF.h=o(AK.height,"y")-G-AJ
}if(AK.innerHeight){AF.h=o(AK.innerHeight,"y")
}if(!AK.innerHeight&&!AK.height){n.css({height:"auto"});
AF.h=n.height()
}n.css({height:AF.h});
l.position(AF.transition==="none"?0:AF.speed)
}};
l.prep=function(AL){if(!d){return 
}var AO,AM=AF.transition==="none"?0:AF.speed;
n.remove();
n=g(AE,"LoadedContent").append(AL);
function AK(){AF.w=AF.w||n.width();
AF.w=AF.mw&&AF.mw<AF.w?AF.mw:AF.w;
return AF.w
}function AN(){AF.h=AF.h||n.height();
AF.h=AF.mh&&AF.mh<AF.h?AF.mh:AF.h;
return AF.h
}n.hide().appendTo(K.show()).css({width:AK(),overflow:AF.scrolling?"auto":"hidden"}).css({height:AN()}).prependTo(D);
K.hide();
j(N).css({"float":"none"});
if(AG){j("select").not(AH.find("select")).filter(function(){return this.style.visibility!=="hidden"
}).css({visibility:"hidden"}).one(U,function(){this.style.visibility="inherit"
})
}AO=function(){var AZ,AW,AX=C.length,AT,AY="frameBorder",AS="allowTransparency",AQ,AP,AV,AU;
if(!d){return 
}function AR(){if(V){AH[0].style.removeAttribute("filter")
}}AQ=function(){clearTimeout(a);
H.hide();
f(v,AF.onComplete)
};
if(V){if(N){n.fadeIn(100)
}}O.html(AF.title).add(n).show();
if(AX>1){if(typeof AF.current==="string"){T.html(AF.current.replace("{current}",i+1).replace("{total}",AX)).show()
}S[(AF.loop||i<AX-1)?"show":"hide"]().html(AF.next);
r[(AF.loop||i)?"show":"hide"]().html(AF.previous);
if(AF.slideshow){y.show()
}if(AF.preloading){AZ=[e(-1),e(1)];
while(AW=C[AZ.pop()]){AU=j.data(AW,X);
if(AU&&AU.href){AP=AU.href;
if(j.isFunction(AP)){AP=AP.call(AW)
}}else{AP=AW.href
}if(c(AP)){AV=new Image();
AV.src=AP
}}}}else{b.hide()
}if(AF.iframe){AT=g("iframe")[0];
if(AY in AT){AT[AY]=0
}if(AS in AT){AT[AS]="true"
}AT.name=s+(+new Date());
if(AF.fastIframe){AQ()
}else{j(AT).one("load",AQ)
}AT.src=AF.href;
if(!AF.scrolling){AT.scrolling="no"
}j(AT).addClass(s+"Iframe").appendTo(n).one(I,function(){AT.src="//about:blank"
})
}else{AQ()
}if(AF.transition==="fade"){AH.fadeTo(AM,1,AR)
}else{AR()
}};
if(AF.transition==="fade"){AH.fadeTo(AM,0,function(){l.position(0,AO)
})
}else{l.position(AM,AO)
}};
l.load=function(AM){var AL,AN,AK=l.prep;
z=true;
N=false;
W=C[i];
if(!AM){u()
}f(I);
f(E,AF.onLoad);
AF.h=AF.height?o(AF.height,"y")-G-AJ:AF.innerHeight&&o(AF.innerHeight,"y");
AF.w=AF.width?o(AF.width,"x")-A-M:AF.innerWidth&&o(AF.innerWidth,"x");
AF.mw=AF.w;
AF.mh=AF.h;
if(AF.maxWidth){AF.mw=o(AF.maxWidth,"x")-A-M;
AF.mw=AF.w&&AF.w<AF.mw?AF.w:AF.mw
}if(AF.maxHeight){AF.mh=o(AF.maxHeight,"y")-G-AJ;
AF.mh=AF.h&&AF.h<AF.mh?AF.h:AF.mh
}AL=AF.href;
a=setTimeout(function(){H.show()
},100);
if(AF.inline){g(AE).hide().insertBefore(j(AL)[0]).one(I,function(){j(this).replaceWith(n.children())
});
AK(j(AL))
}else{if(AF.iframe){AK(" ")
}else{if(AF.html){AK(AF.html)
}else{if(c(AL)){j(N=new Image()).addClass(s+"Photo").error(function(){AF.title=false;
AK(g(AE,"Error").html(AF.imgError))
}).load(function(){var AO;
N.onload=null;
if(AF.scalePhotos){AN=function(){N.height-=N.height*AO;
N.width-=N.width*AO
};
if(AF.mw&&N.width>AF.mw){AO=(N.width-AF.mw)/N.width;
AN()
}if(AF.mh&&N.height>AF.mh){AO=(N.height-AF.mh)/N.height;
AN()
}}if(AF.h){N.style.marginTop=Math.max(AF.h-N.height,0)/2+"px"
}if(C[1]&&(AF.loop||C[i+1])){N.style.cursor="pointer";
N.onclick=function(){l.next()
}
}if(V){N.style.msInterpolationMode="bicubic"
}setTimeout(function(){AK(N)
},1)
});
setTimeout(function(){N.src=AL
},1)
}else{if(AL){K.load(AL,AF.data,function(AP,AO,AQ){AK(AO==="error"?g(AE,"Error").html(AF.xhrError):j(this).contents())
})
}}}}}};
l.next=function(){if(!z&&C[1]&&(AF.loop||C[i+1])){i=e(1);
l.load()
}};
l.prev=function(){if(!z&&C[1]&&(AF.loop||i)){i=e(-1);
l.load()
}};
l.close=function(){if(d&&!m){m=true;
d=false;
f(U,AF.onCleanup);
AA.unbind("."+s+" ."+AB);
q.fadeTo(200,0);
AH.stop().fadeTo(300,0,function(){AH.add(q).css({opacity:1,cursor:"auto"}).hide();
f(I);
n.remove();
setTimeout(function(){m=false;
f(AD,AF.onClosed)
},1)
})
}};
l.remove=function(){j([]).add(AH).add(q).remove();
AH=null;
j("."+R).removeData(X).removeClass(R).die()
};
l.element=function(){return j(W)
};
l.settings=k
}(jQuery,document,this));
(function(A){A.cookie=function(J,I,H){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(I))||I===null||I===undefined)){H=A.extend({},H);
if(I===null||I===undefined){H.expires=-1
}if(typeof H.expires==="number"){var G=H.expires,F=H.expires=new Date;
F.setDate(F.getDate()+G)
}I=String(I);
return document.cookie=[encodeURIComponent(J),"=",H.raw?I:encodeURIComponent(I),H.expires?"; expires="+H.expires.toUTCString():"",H.path?"; path="+H.path:"",H.domain?"; domain="+H.domain:"",H.secure?"; secure":""].join("")
}H=I||{};
var E=H.raw?function(K){return K
}:decodeURIComponent;
var D=document.cookie.split("; ");
for(var C=0,B;
B=D[C]&&D[C].split("=");
C++){if(E(B[0])===J){return E(B[1]||"")
}}return null
}
})(jQuery);
var JSON;
if(!JSON){JSON={}
}(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}
}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)
}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;
i<length;
i+=1){partial[i]=str(i,value)||"null"
}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;
return v
}if(rep&&typeof rep==="object"){length=rep.length;
for(i=0;
i<length;
i+=1){if(typeof rep[i]==="string"){k=rep[i];
v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;
return v
}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";
indent="";
if(typeof space==="number"){for(i=0;
i<space;
i+=1){indent+=" "
}}else{if(typeof space==="string"){indent=space
}}rep=replacer;
if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})
}
}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];
if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v
}else{delete value[k]
}}}}return reviver.call(holder,key,value)
}text=String(text);
cx.lastIndex=0;
if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
}
}}());
(function(A){A(document).ready(function(){A("#countrySelector .countryList a").each(function(){var B=A(this).children("img").attr("src"),C=A(this).children("span").text();
A(this).bind("click",function(){var D=A(this).attr("href");
if(D==="javascript:void(0);"){A("#countrySelector").hide();
A("#globalSiteSelector").hide();
A("#langSelector").show();
A("#langSelector .selectedCountry img").attr("src",B);
A("#langSelector .selectedCountry span").text(C);
A("#langSelector .languageSelect").empty();
str=JSON.stringify(A(this).data("languages"));
data=A.parseJSON(str);
for(var E=0;
E<data.length;
E++){A("#langSelector .languageSelect").append("<li><a href=\"javascript:setLocaleCookie('"+data[E].locale+"', '"+data[E].langPath+"');\">"+data[E].lang+"</a></li>")
}}else{A("#langSelWrapper").hide();
A("#shadow").hide()
}})
});
A("#globalSiteSelectorLink").bind("click",function(){A("#countrySelector").hide();
A("#langSelector").hide();
A("#globalSiteSelector").show()
});
A(".closePopup").bind("click",function(){A(".customModal").hide();
A("#shadow").hide()
});
A("#language-change").bind("click",function(){showLangSelector()
});
A("#shadow").bind("click",function(){hideLangSlector()
});
A(document).keyup(function(B){if(B.keyCode==27){hideLangSlector()
}})
})
})(jQuery);
function getCookieValue(B){var C,A,E,D=document.cookie.split(";");
for(C=0;
C<D.length;
C++){A=D[C].substr(0,D[C].indexOf("="));
E=D[C].substr(D[C].indexOf("=")+1);
A=A.replace(/^\s+|\s+$/g,"");
if(A==B){return unescape(E)
}}}var declineCookiePresent=false;
if(getCookieValue("cookie_decline_avg")=="cookie_decline_avg"){declineCookiePresent=true
}var cookieDomainGA="avg.com";
var s_code="",s_objectID;
function s_gi(F,G,P){var I="s.version='H.24.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return document.domain};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){if(!declineCookiePresent){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0}};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if((''+o.tagUrn)!='undefined'||((''+o.scopeName)!='undefined'&&(''+o.scopeName).toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){if(!declineCookiePresent){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)}};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td&&!declineCookiePresent){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk && !declineCookiePresent){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",L=window,C=L.s_c_il,A=navigator,N=A.userAgent,M=A.appVersion,H=M.indexOf("MSIE "),B=N.indexOf("Netscape6/"),K,E,D,J,O;
if(F){F=F.toLowerCase();
if(C){for(D=0;
D<2;
D++){for(E=0;
E<C.length;
E++){O=C[E];
J=O._c;
if((!J||J=="s_c"||(D>0&&J=="s_l"))&&(O.oun==F||(O.fs&&O.sa&&O.fs(O.oun,F)))){if(O.sa){O.sa(F)
}if(J=="s_c"){return O
}}else{O=0
}}}}}L.s_an="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
L.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
L.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
L.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
L.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
L.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
L.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a");
L.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
I=s_d(I);
if(H>0){K=parseInt(E=M.substring(H+5));
if(K>3){K=parseFloat(E)
}}else{if(B>0){K=parseFloat(N.substring(B+10))
}else{K=parseFloat(M)
}}if(K<5||M.indexOf("Opera")>=0||N.indexOf("Opera")>=0){I=s_ft(I)
}if(!O){O=new Object;
if(!L.s_c_in){L.s_c_il=new Array;
L.s_c_in=0
}O._il=L.s_c_il;
O._in=L.s_c_in;
O._il[O._in]=O;
L.s_c_in++
}O._c="s_c";
(new Function("s","un","pg","ss",I))(O,F,G,P);
return O
}function s_giqf(){var A=window,E=A.s_giq,C,B,D;
if(E){for(C=0;
C<E.length;
C++){B=E[C];
D=s_gi(B.oun);
D.sa(B.un);
D.setTagContainer(B.tagContainerName)
}}A.s_giq=0
}s_giqf();
if(getCookieValue("cookie_decline_avg")=="cookie_decline_avg"){$.cookie("s_cc",null,{domain:"."+document.domain,path:"/"});
$.cookie("s_sq",null,{domain:"."+document.domain,path:"/"});
$.cookie("s_vi",null,{domain:".avgtechnologies.112.2o7.net",path:"/"});
$.cookie("__utma",null,{domain:"."+cookieDomainGA,path:"/"});
$.cookie("__utmb",null,{domain:"."+cookieDomainGA,path:"/"});
$.cookie("__utmc",null,{domain:"."+cookieDomainGA,path:"/"});
$.cookie("__utmz",null,{domain:"."+cookieDomainGA,path:"/"});
$.cookie("__utmv",null,{domain:"."+cookieDomainGA,path:"/"})
};