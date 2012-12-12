/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0
*/
(function(){var G=YAHOO.util.Dom,M=YAHOO.util.Event,I=YAHOO.lang,L=YAHOO.env.ua,B=YAHOO.widget.Overlay,J=YAHOO.widget.Menu,D={},K=null,E=null,C=null;function F(O,N,R,P){var S,Q;if(I.isString(O)&&I.isString(N)){if(L.ie){Q='<input type="'+O+'" name="'+N+'"';if(P){Q+=" checked";}Q+=">";S=document.createElement(Q);}else{S=document.createElement("input");S.name=N;S.type=O;if(P){S.checked=true;}}S.value=R;}return S;}function H(O,U){var N=O.nodeName.toUpperCase(),S=this,T,P,Q;function V(W){if(!(W in U)){T=O.getAttributeNode(W);if(T&&("value" in T)){U[W]=T.value;}}}function R(){V("type");if(U.type=="button"){U.type="push";}if(!("disabled" in U)){U.disabled=O.disabled;}V("name");V("value");V("title");}switch(N){case"A":U.type="link";V("href");V("target");break;case"INPUT":R();if(!("checked" in U)){U.checked=O.checked;}break;case"BUTTON":R();P=O.parentNode.parentNode;if(G.hasClass(P,this.CSS_CLASS_NAME+"-checked")){U.checked=true;}if(G.hasClass(P,this.CSS_CLASS_NAME+"-disabled")){U.disabled=true;}O.removeAttribute("value");O.setAttribute("type","button");break;}O.removeAttribute("id");O.removeAttribute("name");if(!("tabindex" in U)){U.tabindex=O.tabIndex;}if(!("label" in U)){Q=N=="INPUT"?O.value:O.innerHTML;if(Q&&Q.length>0){U.label=Q;}}}function A(P){var O=P.attributes,N=O.srcelement,R=N.nodeName.toUpperCase(),Q=this;if(R==this.NODE_NAME){P.element=N;P.id=N.id;G.getElementsBy(function(S){switch(S.nodeName.toUpperCase()){case"BUTTON":case"A":case"INPUT":H.call(Q,S,O);break;}},"*",N);}else{switch(R){case"BUTTON":case"A":case"INPUT":H.call(this,N,O);break;}}}YAHOO.widget.Button=function(R,O){if(!B&&YAHOO.widget.Overlay){B=YAHOO.widget.Overlay;}if(!J&&YAHOO.widget.Menu){J=YAHOO.widget.Menu;}var Q=YAHOO.widget.Button.superclass.constructor,P,N;if(arguments.length==1&&!I.isString(R)&&!R.nodeName){if(!R.id){R.id=G.generateId();}Q.call(this,(this.createButtonElement(R.type)),R);}else{P={element:null,attributes:(O||{})};if(I.isString(R)){N=G.get(R);if(N){if(!P.attributes.id){P.attributes.id=R;}P.attributes.srcelement=N;A.call(this,P);if(!P.element){P.element=this.createButtonElement(P.attributes.type);}Q.call(this,P.element,P.attributes);}}else{if(R.nodeName){if(!P.attributes.id){if(R.id){P.attributes.id=R.id;}else{P.attributes.id=G.generateId();}}P.attributes.srcelement=R;A.call(this,P);if(!P.element){P.element=this.createButtonElement(P.attributes.type);}Q.call(this,P.element,P.attributes);}}}};YAHOO.extend(YAHOO.widget.Button,YAHOO.util.Element,{_button:null,_menu:null,_hiddenFields:null,_onclickAttributeValue:null,_activationKeyPressed:false,_activationButtonPressed:false,_hasKeyEventHandlers:false,_hasMouseEventHandlers:false,_nOptionRegionX:0,NODE_NAME:"SPAN",CHECK_ACTIVATION_KEYS:[32],ACTIVATION_KEYS:[13,32],OPTION_AREA_WIDTH:20,CSS_CLASS_NAME:"yui-button",RADIO_DEFAULT_TITLE:"Unchecked.  Click to check.",RADIO_CHECKED_TITLE:"Checked.  Click another button to uncheck",CHECKBOX_DEFAULT_TITLE:"Unchecked.  Click to check.",CHECKBOX_CHECKED_TITLE:"Checked.  Click to uncheck.",MENUBUTTON_DEFAULT_TITLE:"Menu collapsed.  Click to expand.",MENUBUTTON_MENU_VISIBLE_TITLE:"Menu expanded.  Click or press Esc to collapse.",SPLITBUTTON_DEFAULT_TITLE:("Menu collapsed.  Click inside option "+"region or press down arrow key to show the menu."),SPLITBUTTON_OPTION_VISIBLE_TITLE:"Menu expanded.  Press Esc to hide the menu.",SUBMIT_TITLE:"Click to submit form.",_setType:function(N){if(N=="split"){this.on("option",this._onOption);}},_setLabel:function(O){this._button.innerHTML=O;var P,N=L.gecko;if(N&&N<1.9&&G.inDocument(this.get("element"))){P=this.CSS_CLASS_NAME;this.removeClass(P);I.later(0,this,this.addClass,P);}},_setTabIndex:function(N){this._button.tabIndex=N;},_setTitle:function(O){var N=O;if(this.get("type")!="link"){if(!N){switch(this.get("type")){case"radio":N=this.RADIO_DEFAULT_TITLE;break;case"checkbox":N=this.CHECKBOX_DEFAULT_TITLE;break;case"menu":N=this.MENUBUTTON_DEFAULT_TITLE;break;case"split":N=this.SPLITBUTTON_DEFAULT_TITLE;break;case"submit":N=this.SUBMIT_TITLE;break;}}this._button.title=N;}},_setDisabled:function(N){if(this.get("type")!="link"){if(N){if(this._menu){this._menu.hide();}if(this.hasFocus()){this.blur();}this._button.setAttribute("disabled","disabled");this.addStateCSSClasses("disabled");this.removeStateCSSClasses("hover");this.removeStateCSSClasses("active");this.removeStateCSSClasses("focus");}else{this._button.removeAttribute("disabled");this.removeStateCSSClasses("disabled");}}},_setHref:function(N){if(this.get("type")=="link"){this._button.href=N;}},_setTarget:function(N){if(this.get("type")=="link"){this._button.setAttribute("target",N);}},_setChecked:function(O){var P=this.get("type"),N;if(P=="checkbox"||P=="radio"){if(O){this.addStateCSSClasses("checked");N=(P=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}else{this.removeStateCSSClasses("checked");N=(P=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}if(!this._hasDefaultTitle){this.set("title",N);}}},_setMenu:function(U){var P=this.get("lazyloadmenu"),R=this.get("element"),N,W=false,X,O,Q;function V(){X.render(R.parentNode);this.removeListener("appendTo",V);}function T(){X.cfg.queueProperty("container",R.parentNode);this.removeListener("appendTo",T);}function S(){var Y;if(X){G.addClass(X.element,this.get("menuclassname"));G.addClass(X.element,"yui-"+this.get("type")+"-button-menu");X.showEvent.subscribe(this._onMenuShow,null,this);X.hideEvent.subscribe(this._onMenuHide,null,this);X.renderEvent.subscribe(this._onMenuRender,null,this);if(J&&X instanceof J){if(P){Y=this.get("container");if(Y){X.cfg.queueProperty("container",Y);}else{this.on("appendTo",T);}}X.cfg.queueProperty("clicktohide",false);X.keyDownEvent.subscribe(this._onMenuKeyDown,this,true);X.subscribe("click",this._onMenuClick,this,true);this.on("selectedMenuItemChange",this._onSelectedMenuItemChange);Q=X.srcElement;if(Q&&Q.nodeName.toUpperCase()=="SELECT"){Q.style.display="none";Q.parentNode.removeChild(Q);}}else{if(B&&X instanceof B){if(!K){K=new YAHOO.widget.OverlayManager();
}K.register(X);}}this._menu=X;if(!W&&!P){if(G.inDocument(R)){X.render(R.parentNode);}else{this.on("appendTo",V);}}}}if(B){if(J){N=J.prototype.CSS_CLASS_NAME;}if(U&&J&&(U instanceof J)){X=U;W=true;S.call(this);}else{if(B&&U&&(U instanceof B)){X=U;W=true;X.cfg.queueProperty("visible",false);S.call(this);}else{if(J&&I.isArray(U)){X=new J(G.generateId(),{lazyload:P,itemdata:U});this._menu=X;this.on("appendTo",S);}else{if(I.isString(U)){O=G.get(U);if(O){if(J&&G.hasClass(O,N)||O.nodeName.toUpperCase()=="SELECT"){X=new J(U,{lazyload:P});S.call(this);}else{if(B){X=new B(U,{visible:false});S.call(this);}}}}else{if(U&&U.nodeName){if(J&&G.hasClass(U,N)||U.nodeName.toUpperCase()=="SELECT"){X=new J(U,{lazyload:P});S.call(this);}else{if(B){if(!U.id){G.generateId(U);}X=new B(U,{visible:false});S.call(this);}}}}}}}}},_setOnClick:function(N){if(this._onclickAttributeValue&&(this._onclickAttributeValue!=N)){this.removeListener("click",this._onclickAttributeValue.fn);this._onclickAttributeValue=null;}if(!this._onclickAttributeValue&&I.isObject(N)&&I.isFunction(N.fn)){this.on("click",N.fn,N.obj,N.scope);this._onclickAttributeValue=N;}},_isActivationKey:function(N){var S=this.get("type"),O=(S=="checkbox"||S=="radio")?this.CHECK_ACTIVATION_KEYS:this.ACTIVATION_KEYS,Q=O.length,R=false,P;if(Q>0){P=Q-1;do{if(N==O[P]){R=true;break;}}while(P--);}return R;},_isSplitButtonOptionKey:function(P){var O=(M.getCharCode(P)==40);var N=function(Q){M.preventDefault(Q);this.removeListener("keypress",N);};if(O){if(L.opera){this.on("keypress",N);}M.preventDefault(P);}return O;},_addListenersToForm:function(){var T=this.getForm(),S=YAHOO.widget.Button.onFormKeyPress,R,N,Q,P,O;if(T){M.on(T,"reset",this._onFormReset,null,this);M.on(T,"submit",this._onFormSubmit,null,this);N=this.get("srcelement");if(this.get("type")=="submit"||(N&&N.type=="submit")){Q=M.getListeners(T,"keypress");R=false;if(Q){P=Q.length;if(P>0){O=P-1;do{if(Q[O].fn==S){R=true;break;}}while(O--);}}if(!R){M.on(T,"keypress",S);}}}},_showMenu:function(R){if(YAHOO.widget.MenuManager){YAHOO.widget.MenuManager.hideVisible();}if(K){K.hideAll();}var N=this._menu,Q=this.get("menualignment"),P=this.get("focusmenu"),O;if(this._renderedMenu){N.cfg.setProperty("context",[this.get("element"),Q[0],Q[1]]);N.cfg.setProperty("preventcontextoverlap",true);N.cfg.setProperty("constraintoviewport",true);}else{N.cfg.queueProperty("context",[this.get("element"),Q[0],Q[1]]);N.cfg.queueProperty("preventcontextoverlap",true);N.cfg.queueProperty("constraintoviewport",true);}this.focus();if(J&&N&&(N instanceof J)){O=N.focus;N.focus=function(){};if(this._renderedMenu){N.cfg.setProperty("minscrollheight",this.get("menuminscrollheight"));N.cfg.setProperty("maxheight",this.get("menumaxheight"));}else{N.cfg.queueProperty("minscrollheight",this.get("menuminscrollheight"));N.cfg.queueProperty("maxheight",this.get("menumaxheight"));}N.show();N.focus=O;N.align();if(R.type=="mousedown"){M.stopPropagation(R);}if(P){N.focus();}}else{if(B&&N&&(N instanceof B)){if(!this._renderedMenu){N.render(this.get("element").parentNode);}N.show();N.align();}}},_hideMenu:function(){var N=this._menu;if(N){N.hide();}},_onMouseOver:function(O){var Q=this.get("type"),N,P;if(Q==="split"){N=this.get("element");P=(G.getX(N)+(N.offsetWidth-this.OPTION_AREA_WIDTH));this._nOptionRegionX=P;}if(!this._hasMouseEventHandlers){if(Q==="split"){this.on("mousemove",this._onMouseMove);}this.on("mouseout",this._onMouseOut);this._hasMouseEventHandlers=true;}this.addStateCSSClasses("hover");if(Q==="split"&&(M.getPageX(O)>P)){this.addStateCSSClasses("hoveroption");}if(this._activationButtonPressed){this.addStateCSSClasses("active");}if(this._bOptionPressed){this.addStateCSSClasses("activeoption");}if(this._activationButtonPressed||this._bOptionPressed){M.removeListener(document,"mouseup",this._onDocumentMouseUp);}},_onMouseMove:function(N){var O=this._nOptionRegionX;if(O){if(M.getPageX(N)>O){this.addStateCSSClasses("hoveroption");}else{this.removeStateCSSClasses("hoveroption");}}},_onMouseOut:function(N){var O=this.get("type");this.removeStateCSSClasses("hover");if(O!="menu"){this.removeStateCSSClasses("active");}if(this._activationButtonPressed||this._bOptionPressed){M.on(document,"mouseup",this._onDocumentMouseUp,null,this);}if(O==="split"&&(M.getPageX(N)>this._nOptionRegionX)){this.removeStateCSSClasses("hoveroption");}},_onDocumentMouseUp:function(P){this._activationButtonPressed=false;this._bOptionPressed=false;var Q=this.get("type"),N,O;if(Q=="menu"||Q=="split"){N=M.getTarget(P);O=this._menu.element;if(N!=O&&!G.isAncestor(O,N)){this.removeStateCSSClasses((Q=="menu"?"active":"activeoption"));this._hideMenu();}}M.removeListener(document,"mouseup",this._onDocumentMouseUp);},_onMouseDown:function(P){var Q,O=true;function N(){this._hideMenu();this.removeListener("mouseup",N);}if((P.which||P.button)==1){if(!this.hasFocus()){this.focus();}Q=this.get("type");if(Q=="split"){if(M.getPageX(P)>this._nOptionRegionX){this.fireEvent("option",P);O=false;}else{this.addStateCSSClasses("active");this._activationButtonPressed=true;}}else{if(Q=="menu"){if(this.isActive()){this._hideMenu();this._activationButtonPressed=false;}else{this._showMenu(P);this._activationButtonPressed=true;}}else{this.addStateCSSClasses("active");this._activationButtonPressed=true;}}if(Q=="split"||Q=="menu"){this._hideMenuTimer=I.later(250,this,this.on,["mouseup",N]);}}return O;},_onMouseUp:function(P){var Q=this.get("type"),N=this._hideMenuTimer,O=true;if(N){N.cancel();}if(Q=="checkbox"||Q=="radio"){this.set("checked",!(this.get("checked")));}this._activationButtonPressed=false;if(Q!="menu"){this.removeStateCSSClasses("active");}if(Q=="split"&&M.getPageX(P)>this._nOptionRegionX){O=false;}return O;},_onFocus:function(O){var N;this.addStateCSSClasses("focus");if(this._activationKeyPressed){this.addStateCSSClasses("active");}C=this;if(!this._hasKeyEventHandlers){N=this._button;M.on(N,"blur",this._onBlur,null,this);M.on(N,"keydown",this._onKeyDown,null,this);M.on(N,"keyup",this._onKeyUp,null,this);
this._hasKeyEventHandlers=true;}this.fireEvent("focus",O);},_onBlur:function(N){this.removeStateCSSClasses("focus");if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}if(this._activationKeyPressed){M.on(document,"keyup",this._onDocumentKeyUp,null,this);}C=null;this.fireEvent("blur",N);},_onDocumentKeyUp:function(N){if(this._isActivationKey(M.getCharCode(N))){this._activationKeyPressed=false;M.removeListener(document,"keyup",this._onDocumentKeyUp);}},_onKeyDown:function(O){var N=this._menu;if(this.get("type")=="split"&&this._isSplitButtonOptionKey(O)){this.fireEvent("option",O);}else{if(this._isActivationKey(M.getCharCode(O))){if(this.get("type")=="menu"){this._showMenu(O);}else{this._activationKeyPressed=true;this.addStateCSSClasses("active");}}}if(N&&N.cfg.getProperty("visible")&&M.getCharCode(O)==27){N.hide();this.focus();}},_onKeyUp:function(N){var O;if(this._isActivationKey(M.getCharCode(N))){O=this.get("type");if(O=="checkbox"||O=="radio"){this.set("checked",!(this.get("checked")));}this._activationKeyPressed=false;if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}}},_onClick:function(Q){var S=this.get("type"),N,R,O,P;switch(S){case"radio":case"checkbox":if(!this._hasDefaultTitle){if(this.get("checked")){N=(S=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}else{N=(S=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}this.set("title",N);}break;case"submit":if(Q.returnValue!==false){this.submitForm();}break;case"reset":R=this.getForm();if(R){R.reset();}break;case"menu":N=this._menu.cfg.getProperty("visible")?this.MENUBUTTON_MENU_VISIBLE_TITLE:this.MENUBUTTON_DEFAULT_TITLE;this.set("title",N);break;case"split":if(this._nOptionRegionX>0&&(M.getPageX(Q)>this._nOptionRegionX)){P=false;}else{this._hideMenu();O=this.get("srcelement");if(O&&O.type=="submit"&&Q.returnValue!==false){this.submitForm();}}N=this._menu.cfg.getProperty("visible")?this.SPLITBUTTON_OPTION_VISIBLE_TITLE:this.SPLITBUTTON_DEFAULT_TITLE;this.set("title",N);break;}return P;},_onDblClick:function(O){var N=true;if(this.get("type")=="split"&&M.getPageX(O)>this._nOptionRegionX){N=false;}return N;},_onAppendTo:function(N){I.later(0,this,this._addListenersToForm);},_onFormReset:function(O){var P=this.get("type"),N=this._menu;if(P=="checkbox"||P=="radio"){this.resetValue("checked");}if(J&&N&&(N instanceof J)){this.resetValue("selectedMenuItem");}},_onFormSubmit:function(N){this.createHiddenFields();},_onDocumentMouseDown:function(Q){var N=M.getTarget(Q),P=this.get("element"),O=this._menu.element;if(N!=P&&!G.isAncestor(P,N)&&N!=O&&!G.isAncestor(O,N)){this._hideMenu();M.removeListener(document,"mousedown",this._onDocumentMouseDown);}},_onOption:function(N){if(this.hasClass("yui-split-button-activeoption")){this._hideMenu();this._bOptionPressed=false;}else{this._showMenu(N);this._bOptionPressed=true;}},_onMenuShow:function(O){M.on(document,"mousedown",this._onDocumentMouseDown,null,this);var N,P;if(this.get("type")=="split"){N=this.SPLITBUTTON_OPTION_VISIBLE_TITLE;P="activeoption";}else{N=this.MENUBUTTON_MENU_VISIBLE_TITLE;P="active";}this.addStateCSSClasses(P);this.set("title",N);},_onMenuHide:function(P){var O=this._menu,N,Q;if(this.get("type")=="split"){N=this.SPLITBUTTON_DEFAULT_TITLE;Q="activeoption";}else{N=this.MENUBUTTON_DEFAULT_TITLE;Q="active";}this.removeStateCSSClasses(Q);this.set("title",N);if(this.get("type")=="split"){this._bOptionPressed=false;}},_onMenuKeyDown:function(P,O){var N=O[0];if(M.getCharCode(N)==27){this.focus();if(this.get("type")=="split"){this._bOptionPressed=false;}}},_onMenuRender:function(P){var S=this.get("element"),O=S.parentNode,N=this._menu,R=N.element,Q=N.srcElement;if(O!=R.parentNode){O.appendChild(R);}this._renderedMenu=true;if(Q&&Q.nodeName.toLowerCase()==="select"&&Q.value){this.set("selectedMenuItem",N.getItem(Q.selectedIndex));}},_onMenuClick:function(O,N){var Q=N[1],P;if(Q){this.set("selectedMenuItem",Q);P=this.get("srcelement");if(P&&P.type=="submit"){this.submitForm();}this._hideMenu();}},_onSelectedMenuItemChange:function(N){var O=N.prevValue,P=N.newValue;if(O){G.removeClass(O.element,"yui-button-selectedmenuitem");}if(P){G.addClass(P.element,"yui-button-selectedmenuitem");}},createButtonElement:function(N){var P=this.NODE_NAME,O=document.createElement(P);O.innerHTML="<"+P+' class="first-child">'+(N=="link"?"<a></a>":'<button type="button"></button>')+"</"+P+">";return O;},addStateCSSClasses:function(N){var O=this.get("type");if(I.isString(N)){if(N!="activeoption"&&N!="hoveroption"){this.addClass(this.CSS_CLASS_NAME+("-"+N));}this.addClass("yui-"+O+("-button-"+N));}},removeStateCSSClasses:function(N){var O=this.get("type");if(I.isString(N)){this.removeClass(this.CSS_CLASS_NAME+("-"+N));this.removeClass("yui-"+O+("-button-"+N));}},createHiddenFields:function(){this.removeHiddenFields();var V=this.getForm(),Z,O,S,X,Y,T,U,N,R,W,P,Q=false;if(V&&!this.get("disabled")){O=this.get("type");S=(O=="checkbox"||O=="radio");if((S&&this.get("checked"))||(E==this)){Z=F((S?O:"hidden"),this.get("name"),this.get("value"),this.get("checked"));if(Z){if(S){Z.style.display="none";}V.appendChild(Z);}}X=this._menu;if(J&&X&&(X instanceof J)){Y=this.get("selectedMenuItem");P=X.srcElement;Q=(P&&P.nodeName.toUpperCase()=="SELECT");if(Y){U=(Y.value===null||Y.value==="")?Y.cfg.getProperty("text"):Y.value;T=this.get("name");if(Q){W=P.name;}else{if(T){W=(T+"_options");}}if(U&&W){N=F("hidden",W,U);V.appendChild(N);}}else{if(Q){V.appendChild(P);}}}if(Z&&N){this._hiddenFields=[Z,N];}else{if(!Z&&N){this._hiddenFields=N;}else{if(Z&&!N){this._hiddenFields=Z;}}}R=this._hiddenFields;}return R;},removeHiddenFields:function(){var Q=this._hiddenFields,O,P;function N(R){if(G.inDocument(R)){R.parentNode.removeChild(R);}}if(Q){if(I.isArray(Q)){O=Q.length;if(O>0){P=O-1;do{N(Q[P]);}while(P--);}}else{N(Q);}this._hiddenFields=null;}},submitForm:function(){var Q=this.getForm(),P=this.get("srcelement"),O=false,N;if(Q){if(this.get("type")=="submit"||(P&&P.type=="submit")){E=this;
}if(L.ie){O=Q.fireEvent("onsubmit");}else{N=document.createEvent("HTMLEvents");N.initEvent("submit",true,true);O=Q.dispatchEvent(N);}if((L.ie||L.webkit)&&O){Q.submit();}}return O;},init:function(O,a){var Q=a.type=="link"?"a":"button",V=a.srcelement,Z=O.getElementsByTagName(Q)[0],X;if(!Z){X=O.getElementsByTagName("input")[0];if(X){Z=document.createElement("button");Z.setAttribute("type","button");X.parentNode.replaceChild(Z,X);}}this._button=Z;this._hasDefaultTitle=(a.title&&a.title.length>0);YAHOO.widget.Button.superclass.init.call(this,O,a);var T=this.get("id"),N=T+"-button";Z.id=N;var U,W;var d=function(e){return(e.htmlFor===T);};var S=function(){W.setAttribute((L.ie?"htmlFor":"for"),N);};if(V&&this.get("type")!="link"){U=G.getElementsBy(d,"label");if(I.isArray(U)&&U.length>0){W=U[0];}}D[T]=this;this.addClass(this.CSS_CLASS_NAME);this.addClass("yui-"+this.get("type")+"-button");M.on(this._button,"focus",this._onFocus,null,this);this.on("mouseover",this._onMouseOver);this.on("mousedown",this._onMouseDown);this.on("mouseup",this._onMouseUp);this.on("click",this._onClick);var Y=this.get("onclick");this.set("onclick",null);this.set("onclick",Y);this.on("dblclick",this._onDblClick);if(W){this.on("appendTo",S);}this.on("appendTo",this._onAppendTo);var c=this.get("container"),P=this.get("element"),b=G.inDocument(P),R;if(c){if(V&&V!=P){R=V.parentNode;if(R){R.removeChild(V);}}if(I.isString(c)){M.onContentReady(c,this.appendTo,c,this);}else{this.on("init",function(){I.later(0,this,this.appendTo,c);});}}else{if(!b&&V&&V!=P){R=V.parentNode;if(R){this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:R});R.replaceChild(P,V);this.fireEvent("appendTo",{type:"appendTo",target:R});}}else{if(this.get("type")!="link"&&b&&V&&V==P){this._addListenersToForm();}}}this.fireEvent("init",{type:"init",target:this});},initAttributes:function(O){var N=O||{};YAHOO.widget.Button.superclass.initAttributes.call(this,N);this.setAttributeConfig("type",{value:(N.type||"push"),validator:I.isString,writeOnce:true,method:this._setType});this.setAttributeConfig("label",{value:N.label,validator:I.isString,method:this._setLabel});this.setAttributeConfig("value",{value:N.value});this.setAttributeConfig("name",{value:N.name,validator:I.isString});this.setAttributeConfig("tabindex",{value:N.tabindex,validator:I.isNumber,method:this._setTabIndex});this.configureAttribute("title",{value:N.title,validator:I.isString,method:this._setTitle});this.setAttributeConfig("disabled",{value:(N.disabled||false),validator:I.isBoolean,method:this._setDisabled});this.setAttributeConfig("href",{value:N.href,validator:I.isString,method:this._setHref});this.setAttributeConfig("target",{value:N.target,validator:I.isString,method:this._setTarget});this.setAttributeConfig("checked",{value:(N.checked||false),validator:I.isBoolean,method:this._setChecked});this.setAttributeConfig("container",{value:N.container,writeOnce:true});this.setAttributeConfig("srcelement",{value:N.srcelement,writeOnce:true});this.setAttributeConfig("menu",{value:null,method:this._setMenu,writeOnce:true});this.setAttributeConfig("lazyloadmenu",{value:(N.lazyloadmenu===false?false:true),validator:I.isBoolean,writeOnce:true});this.setAttributeConfig("menuclassname",{value:(N.menuclassname||"yui-button-menu"),validator:I.isString,method:this._setMenuClassName,writeOnce:true});this.setAttributeConfig("menuminscrollheight",{value:(N.menuminscrollheight||90),validator:I.isNumber});this.setAttributeConfig("menumaxheight",{value:(N.menumaxheight||0),validator:I.isNumber});this.setAttributeConfig("menualignment",{value:(N.menualignment||["tl","bl"]),validator:I.isArray});this.setAttributeConfig("selectedMenuItem",{value:null});this.setAttributeConfig("onclick",{value:N.onclick,method:this._setOnClick});this.setAttributeConfig("focusmenu",{value:(N.focusmenu===false?false:true),validator:I.isBoolean});},focus:function(){if(!this.get("disabled")){this._button.focus();}},blur:function(){if(!this.get("disabled")){this._button.blur();}},hasFocus:function(){return(C==this);},isActive:function(){return this.hasClass(this.CSS_CLASS_NAME+"-active");},getMenu:function(){return this._menu;},getForm:function(){var N=this._button,O;if(N){O=N.form;}return O;},getHiddenFields:function(){return this._hiddenFields;},destroy:function(){var P=this.get("element"),O=P.parentNode,N=this._menu,R;if(N){if(K&&K.find(N)){K.remove(N);}N.destroy();}M.purgeElement(P);M.purgeElement(this._button);M.removeListener(document,"mouseup",this._onDocumentMouseUp);M.removeListener(document,"keyup",this._onDocumentKeyUp);M.removeListener(document,"mousedown",this._onDocumentMouseDown);var Q=this.getForm();if(Q){M.removeListener(Q,"reset",this._onFormReset);M.removeListener(Q,"submit",this._onFormSubmit);}this.unsubscribeAll();if(O){O.removeChild(P);}delete D[this.get("id")];R=G.getElementsByClassName(this.CSS_CLASS_NAME,this.NODE_NAME,Q);if(I.isArray(R)&&R.length===0){M.removeListener(Q,"keypress",YAHOO.widget.Button.onFormKeyPress);}},fireEvent:function(O,N){var P=arguments[0];if(this.DOM_EVENTS[P]&&this.get("disabled")){return false;}return YAHOO.widget.Button.superclass.fireEvent.apply(this,arguments);},toString:function(){return("Button "+this.get("id"));}});YAHOO.widget.Button.onFormKeyPress=function(R){var P=M.getTarget(R),S=M.getCharCode(R),Q=P.nodeName&&P.nodeName.toUpperCase(),N=P.type,T=false,V,X,O,W;function U(a){var Z,Y;switch(a.nodeName.toUpperCase()){case"INPUT":case"BUTTON":if(a.type=="submit"&&!a.disabled){if(!T&&!O){O=a;}}break;default:Z=a.id;if(Z){V=D[Z];if(V){T=true;if(!V.get("disabled")){Y=V.get("srcelement");if(!X&&(V.get("type")=="submit"||(Y&&Y.type=="submit"))){X=V;}}}}break;}}if(S==13&&((Q=="INPUT"&&(N=="text"||N=="password"||N=="checkbox"||N=="radio"||N=="file"))||Q=="SELECT")){G.getElementsBy(U,"*",this);if(O){O.focus();}else{if(!O&&X){M.preventDefault(R);if(L.ie){X.get("element").fireEvent("onclick");}else{W=document.createEvent("HTMLEvents");W.initEvent("click",true,true);if(L.gecko<1.9){X.fireEvent("click",W);
}else{X.get("element").dispatchEvent(W);}}}}}};YAHOO.widget.Button.addHiddenFieldsToForm=function(N){var S=G.getElementsByClassName(YAHOO.widget.Button.prototype.CSS_CLASS_NAME,"*",N),Q=S.length,R,O,P;if(Q>0){for(P=0;P<Q;P++){O=S[P].id;if(O){R=D[O];if(R){R.createHiddenFields();}}}}};YAHOO.widget.Button.getButton=function(N){return D[N];};})();(function(){var C=YAHOO.util.Dom,B=YAHOO.util.Event,D=YAHOO.lang,A=YAHOO.widget.Button,E={};YAHOO.widget.ButtonGroup=function(J,H){var I=YAHOO.widget.ButtonGroup.superclass.constructor,K,G,F;if(arguments.length==1&&!D.isString(J)&&!J.nodeName){if(!J.id){F=C.generateId();J.id=F;}I.call(this,(this._createGroupElement()),J);}else{if(D.isString(J)){G=C.get(J);if(G){if(G.nodeName.toUpperCase()==this.NODE_NAME){I.call(this,G,H);}}}else{K=J.nodeName.toUpperCase();if(K&&K==this.NODE_NAME){if(!J.id){J.id=C.generateId();}I.call(this,J,H);}}}};YAHOO.extend(YAHOO.widget.ButtonGroup,YAHOO.util.Element,{_buttons:null,NODE_NAME:"DIV",CSS_CLASS_NAME:"yui-buttongroup",_createGroupElement:function(){var F=document.createElement(this.NODE_NAME);return F;},_setDisabled:function(G){var H=this.getCount(),F;if(H>0){F=H-1;do{this._buttons[F].set("disabled",G);}while(F--);}},_onKeyDown:function(K){var G=B.getTarget(K),I=B.getCharCode(K),H=G.parentNode.parentNode.id,J=E[H],F=-1;if(I==37||I==38){F=(J.index===0)?(this._buttons.length-1):(J.index-1);}else{if(I==39||I==40){F=(J.index===(this._buttons.length-1))?0:(J.index+1);}}if(F>-1){this.check(F);this.getButton(F).focus();}},_onAppendTo:function(H){var I=this._buttons,G=I.length,F;for(F=0;F<G;F++){I[F].appendTo(this.get("element"));}},_onButtonCheckedChange:function(G,F){var I=G.newValue,H=this.get("checkedButton");if(I&&H!=F){if(H){H.set("checked",false,true);}this.set("checkedButton",F);this.set("value",F.get("value"));}else{if(H&&!H.set("checked")){H.set("checked",true,true);}}},init:function(I,H){this._buttons=[];YAHOO.widget.ButtonGroup.superclass.init.call(this,I,H);this.addClass(this.CSS_CLASS_NAME);var J=this.getElementsByClassName("yui-radio-button");if(J.length>0){this.addButtons(J);}function F(K){return(K.type=="radio");}J=C.getElementsBy(F,"input",this.get("element"));if(J.length>0){this.addButtons(J);}this.on("keydown",this._onKeyDown);this.on("appendTo",this._onAppendTo);var G=this.get("container");if(G){if(D.isString(G)){B.onContentReady(G,function(){this.appendTo(G);},null,this);}else{this.appendTo(G);}}},initAttributes:function(G){var F=G||{};YAHOO.widget.ButtonGroup.superclass.initAttributes.call(this,F);this.setAttributeConfig("name",{value:F.name,validator:D.isString});this.setAttributeConfig("disabled",{value:(F.disabled||false),validator:D.isBoolean,method:this._setDisabled});this.setAttributeConfig("value",{value:F.value});this.setAttributeConfig("container",{value:F.container,writeOnce:true});this.setAttributeConfig("checkedButton",{value:null});},addButton:function(J){var L,K,G,F,H,I;if(J instanceof A&&J.get("type")=="radio"){L=J;}else{if(!D.isString(J)&&!J.nodeName){J.type="radio";L=new A(J);}else{L=new A(J,{type:"radio"});}}if(L){F=this._buttons.length;H=L.get("name");I=this.get("name");L.index=F;this._buttons[F]=L;E[L.get("id")]=L;if(H!=I){L.set("name",I);}if(this.get("disabled")){L.set("disabled",true);}if(L.get("checked")){this.set("checkedButton",L);}K=L.get("element");G=this.get("element");if(K.parentNode!=G){G.appendChild(K);}L.on("checkedChange",this._onButtonCheckedChange,L,this);}return L;},addButtons:function(G){var H,I,J,F;if(D.isArray(G)){H=G.length;J=[];if(H>0){for(F=0;F<H;F++){I=this.addButton(G[F]);if(I){J[J.length]=I;}}}}return J;},removeButton:function(H){var I=this.getButton(H),G,F;if(I){this._buttons.splice(H,1);delete E[I.get("id")];I.removeListener("checkedChange",this._onButtonCheckedChange);I.destroy();G=this._buttons.length;if(G>0){F=this._buttons.length-1;do{this._buttons[F].index=F;}while(F--);}}},getButton:function(F){return this._buttons[F];},getButtons:function(){return this._buttons;},getCount:function(){return this._buttons.length;},focus:function(H){var I,G,F;if(D.isNumber(H)){I=this._buttons[H];if(I){I.focus();}}else{G=this.getCount();for(F=0;F<G;F++){I=this._buttons[F];if(!I.get("disabled")){I.focus();break;}}}},check:function(F){var G=this.getButton(F);if(G){G.set("checked",true);}},destroy:function(){var I=this._buttons.length,H=this.get("element"),F=H.parentNode,G;if(I>0){G=this._buttons.length-1;do{this._buttons[G].destroy();}while(G--);}B.purgeElement(H);F.removeChild(H);},toString:function(){return("ButtonGroup "+this.get("id"));}});})();YAHOO.register("button",YAHOO.widget.Button,{version:"2.7.0",build:"1799"});var RNT={};RNT.namespace=function(name)
{var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=RNT;for(j=(d[0]=="RNT")?1:0;j<d.length;j++){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};RNT.namespace("MessageBase","Widgets","Profile","Events");RNT.Widgets.toGo=0;RNT.Widgets.c_id=0;RNT.Widgets.a_id=0;RNT.Widgets.i_id=0;RNT.Widgets.smrt_asst=true;RNT.Widgets.form=null;RNT.Widgets.form_error=false;RNT.Widgets.error_count=0;RNT.Widgets.FormFields=new Array();RNT.Widgets.chatSubmit=0;RNT.Widgets.passwordReset=0;RNT.VIS_ENDUSER_EDIT_RW=0x00000004;RNT.VIS_ENDUSER_DISPLAY=0x00000008;RNT.VIS_ENDUSER_EDIT_RO=0x00000010;RNT.EUF_DT_DATE=1;RNT.EUF_DT_DATETIME=2;RNT.EUF_DT_RADIO=3;RNT.EUF_DT_SELECT=4;RNT.EUF_DT_INT=5;RNT.EUF_DT_MEMO=6;RNT.EUF_DT_PASSWORD=7;RNT.EUF_DT_VARCHAR=8;RNT.EUF_DT_HIERMENU=9;RNT.EUF_DT_THREAD=10;RNT.EUF_DT_FATTACH=11;RNT.EUF_DT_CHECK=12;RNT.TBL_INCIDENTS=1;RNT.TBL_CONTACTS=2;RNT.TBL_ANSWERS=9;RNT.INT_NULL=-2147483647;RNT.ACTION_ADD=1;RNT.base64characterMap="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_/.";RNT.base64Encode=function(inputString)
{return RightNow.Text.Encoding.base64Encode(inputString);};RNT.base64Decode=function(inputString)
{return RightNow.Text.Encoding.base64Decode(inputString);};RNT.getAsciiPrefix=function(inputString)
{return RightNow.Text.Encoding.getAsciiPrefix(inputString);};RNT.utf8Encode=function(inputString)
{return RightNow.Text.Encoding.utf8Encode(inputString);};RNT.utf8Decode=function(inputString)
{return RightNow.Text.Encoding.utf8Decode(inputString);};function EventObject()
{return new RightNow.Event.EventObject();}
RNT.goToUrl=function(url,external)
{RightNow.Url.navigate(url,external);};function isEmpty()
{if(typeof(this)=="object")
{for(var prop in this)
if(this.hasOwnProperty(prop))
return false;}
return true;}
Object.prototype.isEmpty=isEmpty;function factorial(n)
{if(n<0)
return null;if(n==0)
return 1;else
return n*factorial(n-1);}
function findParentForm(id)
{var node=document.getElementById(id);if(node)
{while(node.parentNode.tagName!="BODY")
{node=node.parentNode;if(node.tagName=="FORM")
return node;}}
return null;}
function isArray(obj)
{return YAHOO.lang.isArray(obj);}
function advancedMode(dispElement,linkElement,basicText,advancedText)
{RightNow.UI.toggleVisibilityAndText(dispElement,linkElement,basicText,advancedText);}
function hideShow(element,imageId,expandText,collapseText)
{RightNow.UI.hideShow(element,imageId,expandText,collapseText);}
function urlParmAdd(url,parm_key,parm_val)
{return RightNow.Url.addParameter(url,parm_key,parm_val);}
function getUrlParm(parm_key)
{return RightNow.Url.getParameter(parm_key);}
function urlParmDelete(url,parm_key)
{return RightNow.Url.deleteParameter(url,parm_key);}
function searchFiltersToUrl(url,filters,reportId,searches)
{return RightNow.Url.convertSearchFilters(url,filters,reportId,searches);}
function trimComma(val)
{return RightNow.Text.trimComma(val);}
function getSubstringAfter(haystack,needle)
{RightNow.Text.getSubstringAfter(haystack,needle);}
function highlightElement(content,searchTerm)
{return RightNow.UI.highlightElement(content,searchTerm);}
function clearHighlights(text)
{return RightNow.UI.clearHighlights(text);}
function _createCookieString(name,value,encodeValue,options){var lang=YAHOO.lang;var text=encodeURIComponent(name)+"="+(encodeValue?encodeURIComponent(value):value);if(lang.isObject(options)){if(options.expires instanceof Date){text+="; expires="+options.expires.toGMTString();}
if(lang.isString(options.path)&&options.path!=""){text+="; path="+options.path;}
if(lang.isString(options.domain)&&options.domain!=""){text+="; domain="+options.domain;}
if(options.secure===true){text+="; secure";}}
return text;}
function _parseCookieString(text,decode){var cookies=new Object();if(YAHOO.lang.isString(text)&&text.length>0){var decodeValue=(decode===false?function(s){return s;}:decodeURIComponent);if(/[^=]+=[^=;]?(?:; [^=]+=[^=]?)?/.test(text)){var cookieParts=text.split(/;\s/g),cookieName=null,cookieValue=null,cookieNameValue=null;for(var i=0,len=cookieParts.length;i<len;i++){cookieNameValue=cookieParts[i].match(/([^=]+)=/i);if(cookieNameValue instanceof Array){try{cookieName=decodeURIComponent(cookieNameValue[1]);cookieValue=decodeValue(cookieParts[i].substring(cookieNameValue[1].length+1));}catch(ex){}}else{cookieName=decodeURIComponent(cookieParts[i]);cookieValue=cookieName;}
cookies[cookieName]=cookieValue;}}}
return cookies;}
function _getCookie(name,converter){var lang=YAHOO.lang;var cookies=_parseCookieString(document.cookie);if(!lang.isString(name)||name===""){throw new TypeError("Cookie.get(): Cookie name must be a non-empty string.");}
if(lang.isUndefined(cookies[name])){return null;}
if(!lang.isFunction(converter)){return cookies[name];}else{return converter(cookies[name]);}}
function _setCookie(name,value,options){var lang=YAHOO.lang;if(!lang.isString(name)){throw new TypeError("Cookie.set(): Cookie name must be a string.");}
if(lang.isUndefined(value)){throw new TypeError("Cookie.set(): Value cannot be undefined.");}
var text=_createCookieString(name,value,true,options);document.cookie=text;return text;}
function setCookie(name,value,expires,path,domain,secure)
{var options={path:path,domain:domain,secure:secure};if(expires){var expireDate=new Date();expireDate.setDate(expireDate.getDate()+expires);options.expires=expireDate;}
return _setCookie(name,value,options);}
function getCookie(name)
{return _getCookie(name);}
function getInputFieldByColumnName(name,parentForm)
{return RightNow.UI.getInputFieldByColumnName(name,parentForm);}
function uriToAssoc(segment)
{return RightNow.Url.convertToArray(segment);}
function subscribeOnce(nodes,eventName,handler)
{var result=true;if(YAHOO.lang.isArray(nodes)||YAHOO.lang.isObject(nodes))
{for(var i=0;i<nodes.length;i++)
result=subscribeOnceHelper(nodes[i],eventName,handler)&&result;}
else
{result=subscribeOnceHelper(nodes,eventName,handler);}
return result;}
function subscribeOnceHelper(node,eventName,handler)
{var listeners=YAHOO.util.Event.getListeners(node,eventName);var canAdd=true;var result=true;if(listeners)
{var j=0;while(j<listeners.length&&canAdd)
{if(listeners[j].fn==handler)
canAdd=false;j++;}}
if(canAdd)
result=YAHOO.util.Event.addListener(node,eventName,handler);return result;}
var dialogButtonName="rn_dlg_btn_";var dialogCount=0;function actionDialog(title,element,buttons,width)
{if((!(title))||(!(element))||(!(buttons)))
return null;YAHOO.namespace('widget.actionDialog');dialogCount++;var elementName='rnDialog'+dialogCount;YAHOO.widget.actionDialog.dialog=new YAHOO.widget.SimpleDialog(elementName,{visible:false,zIndex:9999,close:true,draggable:false,fixedcenter:true,modal:true,position:'absolute',constraintoviewport:true,underlay:'shadow'});YAHOO.widget.actionDialog.dialog.dialogNumber=dialogCount;YAHOO.widget.actionDialog.dialog.setHeader("<div class='tl'></div><span class='DialogHeader'>"+title+"</span><div class='tr'></div>");YAHOO.widget.actionDialog.dialog.setBody(element);YAHOO.widget.actionDialog.dialog.setFooter('<div class="bl"></div> <span id="rn_dlg_buttons"></span><div class="br"></div>');if(width)
YAHOO.widget.actionDialog.dialog.cfg.queueProperty('width',width);YAHOO.widget.actionDialog.dialog.render(document.body);YAHOO.widget.actionDialog.dialog.close.innerHTML="";var dialogButtonPrefix=dialogButtonName+dialogCount;var buttonArray=new Array();for(var i=0;i<buttons.length;i++)
{buttonArray[i]=new YAHOO.widget.Button({id:dialogButtonPrefix+'_'+i,type:"button",label:buttons[i].text,container:"rn_dlg_buttons"});if(buttons[i].handler){buttonArray[i].addListener('click',buttons[i].handler);}}
if(YAHOO.widget.actionDialog.dialog.bringToTop)
YAHOO.widget.actionDialog.dialog.bringToTop();YAHOO.util.Dom.addClass(document.getElementById(elementName),'rn_dialog');return YAHOO.widget.actionDialog.dialog;}
function disableDialogButtons(dialog_id)
{var dialogButtonPrefix=dialogButtonName+dialog_id;var submitButton=YAHOO.widget.Button.getButton(dialogButtonPrefix+'_0');if(submitButton)
submitButton.set("disabled",true);var cancelButton=YAHOO.widget.Button.getButton(dialogButtonPrefix+'_1');if(cancelButton)
cancelButton.set("disabled",true);}
function disableDialogSubmitButton(dialog_id)
{var dialogButtonPrefix=dialogButtonName+dialog_id;var submitButton=YAHOO.widget.Button.getButton(dialogButtonPrefix+'_0');if(submitButton)
submitButton.set("disabled",true);}
function enableDialogButtons(dialog_id)
{var dialogButtonPrefix=dialogButtonName+dialog_id;var submitButton=YAHOO.widget.Button.getButton(dialogButtonPrefix+'_0');if(submitButton)
submitButton.set("disabled",false);var cancelButton=YAHOO.widget.Button.getButton(dialogButtonPrefix+'_1');if(cancelButton)
cancelButton.set("disabled",false);}
function addDialogEnterKeyListener(dialog,functionName)
{if((!(dialog))||(!(functionName)))
return null;var keyListener=new YAHOO.util.KeyListener(document,{keys:13},{fn:functionName,scope:dialog,correctScope:true});dialog.cfg.setProperty("keylisteners",keyListener);return keyListener;}
function disableDialogKeyListener(dialog,keyListener)
{if((!(dialog))||(!(keyListener)))
return null;dialog.cfg.setProperty("keylisteners",null);keyListener.disable();}
function enableDialogKeyListener(dialog,keyListener)
{if((!(dialog))||(!(keyListener)))
return null;dialog.cfg.setProperty("keylisteners",keyListener);keyListener.enable();}
function disableDialogControls(dialog,keyListener)
{disableDialogKeyListener(dialog,keyListener);disableDialogButtons(dialog.dialogNumber);}
function disableDialogSubmitControls(dialog,keyListener)
{disableDialogKeyListener(dialog,keyListener);disableDialogSubmitButton(dialog.id.toString());}
function enableDialogControls(dialog,keyListener,focusElement)
{enableDialogKeyListener(dialog,keyListener);enableDialogButtons(dialog.dialogNumber);if(focusElement){focusElement.focus();}}
function messageDialog(title,message,icon,exitCallback,focusElement)
{YAHOO.namespace('widget.alert');function handleOk()
{YAHOO.widget.alert.dlg.destroy();if(exitCallback){if(focusElement){exitCallback(focusElement);}
else
exitCallback();}}
function focusFirstButton()
{if(document.getElementById("rn_dlg_buttons"))
{var okBtnName=dialogButtonName+YAHOO.widget.alert.dlg.dialogNumber+'_0';var myOKButton=YAHOO.widget.Button.getButton(okBtnName);if(myOKButton)
myOKButton.focus();}
else
{alert("Content not ready");}}
buttons=[{text:RNT.MessageBase.OK,handler:handleOk,isDefault:true}];var titleStr=title;switch(icon)
{case"HELP":var icon=YAHOO.widget.SimpleDialog.ICON_HELP;break;case"INFO":var icon=YAHOO.widget.SimpleDialog.ICON_INFO;break;case"WARN":var icon=YAHOO.widget.SimpleDialog.ICON_WARN;break;default:break;}
YAHOO.widget.alert.dlg=actionDialog(titleStr,document.createTextNode(message),buttons);if(YAHOO.widget.alert.dlg.bringToTop)
YAHOO.widget.alert.dlg.bringToTop();if(icon)
YAHOO.widget.alert.dlg.cfg.queueProperty('icon',icon);YAHOO.widget.alert.dlg.cfg.queueProperty('width','20em');YAHOO.widget.alert.dlg.cfg.queueProperty('fixedcenter',true);YAHOO.widget.alert.dlg.cfg.setProperty('role','alertdialog');var msgDlgK1=new YAHOO.util.KeyListener(document,{keys:13},{fn:handleOk,scope:YAHOO.widget.alert.dlg,correctScope:true});YAHOO.widget.alert.dlg.cfg.queueProperty("keylisteners",msgDlgK1);YAHOO.widget.alert.dlg.hideEvent.subscribe(handleOk);YAHOO.util.Event.onContentReady(YAHOO.widget.alert.dlg.id,focusFirstButton,this);YAHOO.widget.alert.dlg.render();YAHOO.widget.alert.dlg.show();return YAHOO.widget.alert.dlg;}
function updateTimer(id,timer,sub_label)
{timer--;if(timer==0)
document.getElementById(id).value=sub_label;else
{document.getElementById(id).value=timer;setTimeout("updateTimer('"+id+"',"+timer+",'"+sub_label+"')",1000);}}
function updateTimer2(id,timer)
{var timerElement=document.getElementById(id);if(timerElement){timer--;if(timer==0){timerElement.innerHTML="";}
else
{timerElement.innerHTML=timer+'';setTimeout("updateTimer2('"+id+"',"+timer+")",1000);}}}
var globalDialog=null;var globalKeyListener=null;var globalErrorElement=null;function resetControlsAndText(dialog,keyListener,errorElement)
{if((!(dialog))||(!(keyListener))||(!(errorElement)))
return null;enableDialogControls(dialog,keyListener);errorElement.innerHTML='';}
function alertDialog(message,icon)
{YAHOO.namespace('widget.alert');this.handleOk=function()
{YAHOO.widget.alert.dlg.hide();};buttons=[{text:'Ok',handler:handleOk,isDefault:true}];YAHOO.widget.alert.dlg=new YAHOO.widget.SimpleDialog('widget_alert',{buttons:buttons,visible:false,width:'20em',zIndex:9999,close:true,fixedcenter:true,modal:false,draggable:false,constraintoviewport:true});YAHOO.widget.alert.dlg.setBody(message);switch(icon)
{case"HELP":YAHOO.widget.alert.dlg.cfg.queueProperty('icon',YAHOO.widget.SimpleDialog.ICON_HELP);YAHOO.widget.alert.dlg.setHeader(RNT.MessageBase.HELP);break;case"INFO":YAHOO.widget.alert.dlg.cfg.queueProperty('icon',YAHOO.widget.SimpleDialog.ICON_INFO);YAHOO.widget.alert.dlg.setHeader(RNT.MessageBase.INFO);break;default:YAHOO.widget.alert.dlg.cfg.queueProperty('icon',YAHOO.widget.SimpleDialog.ICON_WARN);YAHOO.widget.alert.dlg.setHeader(RNT.MessageBase.WARN);}
YAHOO.widget.alert.dlg.cfg.queueProperty('zIndex',9999);YAHOO.widget.alert.dlg.render(document.body);if(YAHOO.widget.alert.dlg.bringToTop)
YAHOO.widget.alert.dlg.bringToTop();YAHOO.widget.alert.dlg.show();}
function textDialog(message,buttons,icon)
{var dlg=new YAHOO.widget.SimpleDialog('widget_alert',{buttons:buttons,visible:false,width:'20em',zIndex:9999,close:true,fixedcenter:false,modal:true,draggable:false,constraintoviewport:true});dlg.setBody(message);switch(icon)
{case"HELP":dlg.cfg.queueProperty('icon',YAHOO.widget.SimpleDialog.ICON_HELP);dlg.setHeader(RNT.MessageBase.HELP);break;case"INFO":dlg.cfg.queueProperty('icon',YAHOO.widget.SimpleDialog.ICON_INFO);dlg.setHeader(RNT.MessageBase.INFO);break;default:dlg.cfg.queueProperty('icon',YAHOO.widget.SimpleDialog.ICON_WARN);dlg.setHeader(RNT.MessageBase.WARN);}
dlg.cfg.queueProperty('zIndex',9999);dlg.render(document.body);if(dlg.bringToTop)
dlg.bringToTop();return dlg;}
function advanced_mode()
{if(document.getElementById("advsearch").style.display=="none")
{document.getElementById("advsearch").style.display="block";document.getElementById("adv_open").innerHTML="#rn:msg:BASIC_SEARCH_LBL#";}
else if(document.getElementById("advsearch").style.display=="block")
{document.getElementById("advsearch").style.display="none";document.getElementById("adv_open").innerHTML="#rn:msg:ADVANCED_SEARCH_LBL#";}}
function lengthWithoutSpaces(string)
{string=string.replace(/^\s+|\s+$/g,'');return(string.length);}
if(!Object.prototype.toJSONString){Array.prototype.toJSONString=function(){var a=["["],b,i,l=this.length,v;function p(s){if(b){a.push(",");}
a.push(s);b=true;}
for(i=0;i<l;i+=1){v=this[i];switch(typeof v){case"object":if(v){if(typeof v.toJSONString==="function"){p(v.toJSONString());}}else{p("null");}
break;case"string":case"number":case"boolean":p(v.toJSONString());}}
a.push("]");return a.join("");};Boolean.prototype.toJSONString=function(){return String(this);};Date.prototype.toJSONString=function(){function f(n){return n<10?"0"+n:n;}
return"\""+this.getFullYear()+"-"+f(this.getMonth()+1)+"-"+f(this.getDate())+"T"+f(this.getHours())+":"+f(this.getMinutes())+":"+f(this.getSeconds())+"\"";};Number.prototype.toJSONString=function(){return isFinite(this)?String(this):"null";};Object.prototype.toJSONString=function(){var a=["{"],b,k,v;function p(s){if(b){a.push(",");}
a.push(k.toJSONString(),":",s);b=true;}
for(k in this){if(this.hasOwnProperty(k)){v=this[k];switch(typeof v){case"object":if(v){if(typeof v.toJSONString==="function"){p(v.toJSONString());}}else{p("null");}
break;case"string":case"number":case"boolean":p(v.toJSONString());}}}
a.push("}");return a.join("");};(function(s){var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};s.parseJSON=function(_8){var j;function walk(k,v){var i;if(v&&typeof v==="object"){for(i in v){if(v.hasOwnProperty(i)){v[i]=walk(i,v[i]);}}}
return _8(k,v);}
if(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(this)){try{j=eval("("+this+")");}
catch(e){return false;}}else{return false;}
if(typeof _8==="function"){j=walk("",j);}
return j;};s.toJSONString=function(){if(/["\\\x00-\x1f]/.test(this)){return"\""+this.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);})+"\"";}
return"\""+this+"\"";};})(String.prototype);}if(typeof RNT==="undefined"||typeof RNT!=="object"){var RNT={};RNT.Events={};}
var on_before_ajax_request=new YAHOO.util.CustomEvent("on_before_ajax_request");var evt_sort_type_request=new YAHOO.util.CustomEvent("evt_sort_type_request");var evt_sort_type_update=new YAHOO.util.CustomEvent("evt_sort_type_update");var evt_org_type_request=new YAHOO.util.CustomEvent("evt_org_type_request");var evt_org_type_update=new YAHOO.util.CustomEvent("evt_org_type_update");var evt_keyword_changed_request=new YAHOO.util.CustomEvent("evt_keyword_changed_request");var evt_keyword_changed_update=new YAHOO.util.CustomEvent("evt_keyword_changed_update");var evt_search_request=new YAHOO.util.CustomEvent("evt_search_request");var evt_search_update=new YAHOO.util.CustomEvent("evt_search_update");var evt_get_filters_request=new YAHOO.util.CustomEvent("evt_get_filters_request");var evt_search_filters_update=new YAHOO.util.CustomEvent("evt_search_filters_update");var evt_search_type_request=new YAHOO.util.CustomEvent("evt_search_type_request");var evt_search_type_update=new YAHOO.util.CustomEvent("evt_search_type_update");var evt_custom_menu_request=new YAHOO.util.CustomEvent("evt_custom_menu_request");var evt_custom_menu_update=new YAHOO.util.CustomEvent("evt_custom_menu_update");var evt_menu_filter_get_request=new YAHOO.util.CustomEvent("evt_menu_filter_get_request");var evt_menu_filter_select_request=new YAHOO.util.CustomEvent("evt_menu_filter_select_request");var evt_menu_filter_get_update=new YAHOO.util.CustomEvent("evt_menu_filter_get_update");var evt_menu_filter_select_update=new YAHOO.util.CustomEvent("evt_menu_filter_select_update");var evt_menu_filter_set_update=new YAHOO.util.CustomEvent("evt_menu_filter_set_update");var evt_menu_filter_setting_update=new YAHOO.util.CustomEvent("evt_menu_filter_setting_update");var evt_menu_filter_set_request=new YAHOO.util.CustomEvent("evt_menu_filter_set_request");var evt_search_filters_unprocessed_request=new YAHOO.util.CustomEvent("evt_search_filters_unprocessed_request");var evt_search_filters_unprocessed_update=new YAHOO.util.CustomEvent("evt_search_filters_unprocessed_update");var evt_page_request=new YAHOO.util.CustomEvent("evt_page_request");var evt_report_update=new YAHOO.util.CustomEvent("evt_report_update");var evt_set_initial_filters_request=new YAHOO.util.CustomEvent("evt_set_initial_filters_request");var evt_search_in_progress_request=new YAHOO.util.CustomEvent("evt_search_in_progress_request");var evt_search_in_progress_update=new YAHOO.util.CustomEvent("evt_search_in_progress_update");var evt_more_results_request=new YAHOO.util.CustomEvent("evt_more_results_request");var evt_grid_widget_update=new YAHOO.util.CustomEvent("evt_grid_widget_update");var evt_topic_words_update=new YAHOO.util.CustomEvent("evt_topic_words_update");var evt_search_suggest_update=new YAHOO.util.CustomEvent("evt_search_suggest_update");var evt_file_upload_request=new YAHOO.util.CustomEvent("evt_file_upload_request");var evt_file_upload_update=new YAHOO.util.CustomEvent("evt_file_upload_update");var evt_a_id_request=new YAHOO.util.CustomEvent("evt_a_id_request");var evt_a_id_update=new YAHOO.util.CustomEvent("evt_a_id_update");var evt_i_id_request=new YAHOO.util.CustomEvent("evt_i_id_request");var evt_i_id_update=new YAHOO.util.CustomEvent("evt_i_id_update");var evt_ff_validate_request=new YAHOO.util.CustomEvent("evt_ff_validate_request");var evt_ff_validate_update=new YAHOO.util.CustomEvent("evt_ff_validate_update");var evt_ff_count=new YAHOO.util.CustomEvent("evt_ff_count");var evt_ff_province_request=new YAHOO.util.CustomEvent("evt_ff_province_request");var evt_ff_province_update=new YAHOO.util.CustomEvent("evt_ff_province_update");var evt_ff_account_exists_request=new YAHOO.util.CustomEvent("evt_ff_account_exists_request");var evt_ff_account_exists_update=new YAHOO.util.CustomEvent("evt_ff_account_exists_update");var evt_form_button_submit=new YAHOO.util.CustomEvent("evt_form_button_submit");var evt_form_button_submit_update=new YAHOO.util.CustomEvent("evt_form_button_submit_update");var evt_form_validated=new YAHOO.util.CustomEvent("evt_form_validated");var evt_form_fail_validation=new YAHOO.util.CustomEvent("evt_form_fail_validation");var evt_form_open_info_request=new YAHOO.util.CustomEvent("evt_form_open_info_request");var evt_form_passwd_reset=new YAHOO.util.CustomEvent("evt_form_passwd_reset");var evt_email_link_submit_request=new YAHOO.util.CustomEvent("evt_email_link_submit_request");var evt_email_link_submit_update=new YAHOO.util.CustomEvent("evt_email_link_submit_update");var evt_email_password_request=new YAHOO.util.CustomEvent("evt_email_password_request");var evt_email_password_update=new YAHOO.util.CustomEvent("evt_email_password_update");var evt_email_username_request=new YAHOO.util.CustomEvent("evt_email_username_request");var evt_email_username_update=new YAHOO.util.CustomEvent("evt_email_username_update");var evt_login_form_submit_request=new YAHOO.util.CustomEvent("evt_login_form_submit_request");var evt_login_form_submit_update=new YAHOO.util.CustomEvent("evt_login_form_submit_update");var evt_logout_link_request=new YAHOO.util.CustomEvent("evt_logout_link_request");var evt_logout_link_update=new YAHOO.util.CustomEvent("evt_logout_link_update");var evt_feedback_submit_request=new YAHOO.util.CustomEvent("evt_feedback_submit_request");var evt_feedback_submit_update=new YAHOO.util.CustomEvent("evt_feedback_submit_update");var evt_answer_notification_request=new YAHOO.util.CustomEvent("evt_answer_notification_request");var evt_answer_notification_update=new YAHOO.util.CustomEvent("evt_answer_notification_update");var evt_answer_notification_delete_request=new YAHOO.util.CustomEvent("evt_answer_notification_delete_request");var evt_answer_notification_delete_update=new YAHOO.util.CustomEvent("evt_answer_notification_delete_update");var evt_prodcat_notification_renewal_request=new YAHOO.util.CustomEvent("evt_prodcat_notification_renewal_request");var evt_prodcat_notification_renewal_update=new YAHOO.util.CustomEvent("evt_prodcat_notification_renewal_update");var evt_prodcat_notification_delete_request=new YAHOO.util.CustomEvent("evt_prodcat_notification_delete_request");var evt_prodcat_notification_delete_update=new YAHOO.util.CustomEvent("evt_prodcat_notification_delete_update");var evt_prodcat_notification_request=new YAHOO.util.CustomEvent("evt_prodcat_notification_request");var evt_prodcat_notification_update=new YAHOO.util.CustomEvent("evt_prodcat_notification_update");var evt_chat_queue_update=new YAHOO.util.CustomEvent("evt_chat_queue_update");var evt_chat_queue_request=new YAHOO.util.CustomEvent("evt_chat_queue_request");var evt_chat_settings_request=new YAHOO.util.CustomEvent("evt_chat_settings_request");var evt_pac_stat_request=new YAHOO.util.CustomEvent("evt_pac_stat_request");function setInitalReportFilters(report_id,token,filters,format)
{var eo=new RightNow.Event.EventObject();eo.type='report';eo.filters.report_id=report_id;eo.filters.token=token;eo.data.filters=filters;eo.data.format=format;evt_set_initial_filters_request.fire(eo);}
function startSearch(data)
{eo=new RightNow.Event.EventObject();eo.name=data.info.controller_name;eo.type=data.info.type;eo.w_id=data.info.w_id;eo.filters.report_id=data.attrs.report_id;eo.data.report_page=data.attrs.report_page;evt_search_in_progress_request.fire(eo);evt_search_request.fire(eo);}
function interceptHelper(tempUrl)
{var Url=RightNow.Url,parms=Url.convertToArray(RightNow.Url.getParameterSegment());for(var key in parms)
{if(parms.hasOwnProperty(key)&&key!="session"&&key!="a_id"&&key!="i_id"&&key!="refno"&&key!="error_id"&&key!="redirect"&&key!="notif"&&key!="related"&&key!="msg"&&key!="search")
{tempUrl=Url.addParameter(tempUrl,key,parms[key],true);}}
return tempUrl;}
function Events()
{var search_filters=new Object();var searches=null;var filter_count=new Object();var hier_menu_link_map=false;var pl_name="PageLogicController";var session;var sessionValue="";var chat=new Object();var GET_DATA=1;var CHANGE_PAGE=2;var SEND_FILTERS=3;var _answerID=0;var _incidentID=0;var _runningInIFrame=(top!==self);var browserHistoryManagementKey="s";var isBrowserHistoryManagementEnabled=false;var emptyHistoryState=false;var cachedReportResponses=[];this.init=function(sessionParm)
{session=sessionParm;if(sessionParm!=="")
{sessionValue=RightNow.Text.getSubstringAfter(session,'/session/');searches=RightNow.Url.getParameter("sno");if(!searches)
searches=0;}
initLinkInterception();evt_keyword_changed_request.subscribe(onKeywordChangedRequest);evt_search_request.subscribe(onSearchRequest);evt_search_filters_update.subscribe(onSearchFiltersUpdate);evt_search_type_request.subscribe(onSearchTypeRequest);evt_sort_type_request.subscribe(onSortTypeRequest);evt_org_type_request.subscribe(onOrgTypeRequest);evt_custom_menu_request.subscribe(onCustomMenuRequest);evt_page_request.subscribe(onPageRequest);evt_set_initial_filters_request.subscribe(onSetInitialFiltersRequest);evt_search_in_progress_request.subscribe(onSearchInProgress);evt_more_results_request.subscribe(onMoreResultsRequest);evt_grid_widget_update.subscribe(RightNow.Url.transformLinks);evt_grid_widget_update.subscribe(initLinkInterception);evt_menu_filter_get_request.subscribe(onMenuFilterGet);evt_menu_filter_select_request.subscribe(onMenuFilterSelect);evt_menu_filter_set_request.subscribe(onMenuFilterSet);evt_search_filters_unprocessed_request.subscribe(onSearchFiltersUnprocessed);evt_file_upload_request.subscribe(onFileUpload);evt_ff_validate_request.subscribe(ff_validate_request);evt_ff_province_request.subscribe(onCountryRequest);evt_ff_account_exists_request.subscribe(onAccountExistsRequest);evt_ff_count.subscribe(onFFCount);evt_form_button_submit.subscribe(submit_request);evt_form_open_info_request.subscribe(getTableIds);evt_form_passwd_reset.subscribe(onSendPasswordResetForm);evt_email_link_submit_request.subscribe(onEmailLinkRequest);evt_email_password_request.subscribe(onEmailPasswordRequest);evt_email_username_request.subscribe(onEmailUsernameRequest);evt_login_form_submit_request.subscribe(onLoginFormRequest);evt_logout_link_request.subscribe(onLogoutLinkRequest);evt_feedback_submit_request.subscribe(onFeedbackFormRequest);evt_answer_notification_request.subscribe(onAnswerNotificationRequest);evt_answer_notification_delete_request.subscribe(onAnswerNotificationDeleteRequest);evt_prodcat_notification_delete_request.subscribe(onProdCatDeleteRequest);evt_prodcat_notification_renewal_request.subscribe(onProdCatRenewRequest);evt_prodcat_notification_request.subscribe(onProdCatNotificationRequest);evt_i_id_request.subscribe(onIncidentChanged);evt_a_id_request.subscribe(onAnswerChanged);evt_chat_queue_request.subscribe(onCheckQueue);evt_chat_settings_request.subscribe(onChatSettingsRequest);};function interceptLinkClick(e)
{if((this.href.indexOf('javascript:')>-1||this.href=="")||this.href.indexOf('doc_view.php')>-1||this.href.indexOf('doc_submit.php')>-1||this.href.indexOf('doc_serve.php')>-1||this.href.indexOf('qautils.php')>-1||this.href.indexOf('verify_acct_login.php')>-1||this.hostname!=window.location.hostname||(this.href.indexOf("/ci/")>-1&&!(this.href.indexOf("/ci/opensearch")>-1)))
return;if(!YAHOO.util.Dom.hasClass(this,"noIntercept"))
{var tempUrl=this.href;if(this.href.indexOf('noIntercept')>-1)
{tempUrl=urlParmDelete(tempUrl,"noIntercept");tempUrl=urlParmAdd(tempUrl,"search",1);this.href=tempUrl;return true;}
var emptySearchFilters=true;for(var prop in search_filters)
{if(search_filters.hasOwnProperty(prop))
{emptySearchFilters=false;break;}}
if(emptySearchFilters)
{tempUrl=interceptHelper(tempUrl);}
else
{for(var report in search_filters)
{if(search_filters.hasOwnProperty(report))
{tempUrl=RightNow.Url.convertSearchFilters(tempUrl,search_filters[report].filters,report,searches);continue;}}}
this.href=tempUrl;}}
function initLinkInterception()
{var nodes=document.getElementsByTagName('a');RightNow.UI.subscribeOnce(nodes,"click",interceptLinkClick);}
function answerNotificationUpdate(o)
{if(o.responseText!=null)
evt_answer_notification_update.fire(o.responseText);}
function onAnswerNotificationRequest(type,event_obj)
{var evtObj=event_obj[0];var post=evtObj.data.post;var url="/ci/ajaxRequest/answerNotification";RNT.Events.ajaxRequest(post,url,"answerNotificationUpdate");}
function answerNotificationDeleteUpdate(o)
{if(o.responseText!=null)
evt_answer_notification_delete_update.fire(o.responseText);}
function onAnswerNotificationDeleteRequest(type,event_obj)
{var evtObj=event_obj[0];var post=evtObj.data.post;var url="/ci/ajaxRequest/answerNotification";RNT.Events.ajaxRequest(post,url,"answerNotificationDeleteUpdate");}
function loginSuccess(o)
{if(o.responseText!=null)
evt_login_form_submit_update.fire(o.responseText);}
function logoutSuccess(o)
{if(o.responseText!=null)
evt_logout_link_update.fire(o.responseText);}
function onLoginFormRequest(type,event_obj)
{var evtObj=event_obj[0],post=evtObj.data.post,url="/ci/ajaxRequest/doLogin";if(RightNow.Event._noSessionCookies)
document.cookie="cp_login_start=1;path=/";RNT.Events.ajaxRequest(post,url,"loginSuccess","genericAjaxFailure",evtObj.w_id);}
function onLogoutLinkRequest(type,event_obj)
{var evtObj=event_obj[0];var post=evtObj.data.post;var url="/ci/ajaxRequest/doLogout";RNT.Events.ajaxRequest(post,url,"logoutSuccess");}
function onFileUpload(type,event_obj)
{var upload_type=event_obj[0].data.upload_type;var callback={upload:uploadCallback,failure:genericAjaxFailure};try
{if(upload_type=="chat")
YAHOO.util.Connect.asyncRequest('POST',"/ci/fattach/uploadChat/"+event_obj[0].data.engagement_id+"/"+event_obj[0].data.chat_sid,callback);else
YAHOO.util.Connect.asyncRequest('POST',"/ci/fattach/upload"+session,callback);}
catch(e)
{var o=new Object();o.responseText="{\"error\":88}";uploadCallback(o);}}
function uploadCallback(o)
{if(o.responseText!=null)
evt_file_upload_update.fire(o.responseText);}
function setSearchFilter(evtObj)
{if(!search_filters[evtObj.filters.report_id])
{search_filters[evtObj.filters.report_id]=new Object();search_filters[evtObj.filters.report_id]['filters']=new Object();search_filters[evtObj.filters.report_id]['format']=new Object();}
search_filters[evtObj.filters.report_id]['filters'][evtObj.type]=evtObj;}
function getTableIds(type,event_obj)
{_answerID=event_obj[0][0];_incidentID=event_obj[0][1];}
function submit_request(type,event_obj)
{event_obj=event_obj[0];RightNow.UI.Form.errorCount=0;RightNow.UI.Form.formFields=new Array();RightNow.UI.Form.form=event_obj.data.form;RightNow.UI.Form.widgetsToValidate=evt_ff_validate_update.subscribers.length;RightNow.UI.Form.widgetsToProcess=evt_ff_validate_update.subscribers.length;RightNow.UI.Form.formToken=event_obj.data.f_tok;evt_ff_validate_update.fire(event_obj);}
function ff_validate_request(type,event_obj)
{--RightNow.UI.Form.widgetsToValidate;if(event_obj[0].form)
{if(event_obj[0].form===RightNow.UI.Form.form||event_obj[0].form.id===RightNow.UI.Form.form)
RightNow.UI.Form.formFields.push(event_obj[0].data);}
if(RightNow.UI.Form.widgetsToValidate==0)
{evt_form_validated.fire();if(!RightNow.UI.Form.chatSubmit&&!RightNow.UI.Form.passwordReset)
onSendForm();}}
function onFFCount(type,event_obj)
{--RightNow.UI.Form.widgetsToProcess;if(RightNow.UI.Form.widgetsToProcess==0&&RightNow.UI.Form.widgetsToValidate!=0)
evt_form_fail_validation.fire();}
function onCountryRequest(type,evtObj)
{var postData="country_id="+evtObj[0].data.country_id;RNT.Events.ajaxRequest(postData,"/ci/ajaxRequestMin/getCountryValues","onProvinceUpdate",null,evtObj);}
function onProvinceUpdate(o)
{if(o.responseText!=null)
{var result=YAHOO.lang.JSON.parse(o.responseText);if(result)
evt_ff_province_update.fire(result);else
RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{icon:"WARN"});}}
function onAccountExistsRequest(type,evtObj)
{var post=evtObj[0].data.post;post+=("&pwReset="+RightNow.UI.Form.passwordReset);RNT.Events.ajaxRequest(post,"/ci/ajaxRequest/checkForExistingContact","onExistingAccountUpdate");}
function onExistingAccountUpdate(o)
{if(o.responseText!=null)
evt_ff_account_exists_update.fire(YAHOO.lang.JSON.parse(o.responseText));}
function onSearchTypeRequest(type,arg)
{var evtObj=arg[0];evt_search_type_update.fire(evtObj);}
function onSortTypeRequest(type,arg)
{var evtObj=arg[0];evt_sort_type_update.fire(evtObj);}
function onOrgTypeRequest(type,arg)
{var evtObj=arg[0];evt_org_type_update.fire(evtObj);}
function onCustomMenuRequest(type,arg)
{var evtObj=arg[0];evt_custom_menu_update.fire(evtObj);}
function onAnswerChanged(type,arg)
{var evtObj=arg[0];var packet=new Object();packet.a_id=evtObj.a_id;evt_a_id_update.fire(packet);}
function onIncidentChanged(type,arg)
{var evtObj=arg[0];var packet=new Object();packet.i_id=evtObj.i_id;evt_i_id_update.fire(packet);}
function emailLinkSuccess(o)
{if(o.responseText!=null)
{var evtObj=o.argument;evt_email_link_submit_update.fire(o.responseText,evtObj);}}
function onEmailLinkRequest(type,arg)
{var evtObj=arg[0];var post=evtObj.data.post;var url="/ci/ajaxRequest/emailAnswer";RNT.Events.ajaxRequest(post,url,"emailLinkSuccess",null,evtObj);}
function emailPasswordSuccess(o)
{if(o.responseText!=null)
evt_email_password_update.fire(o.responseText);}
function onEmailPasswordRequest(type,arg)
{var evtObj=arg[0];var post=evtObj.data.post;var url="/ci/ajaxRequest/emailPassword";RNT.Events.ajaxRequest(post,url,"emailPasswordSuccess");}
function emailUsernameSuccess(o)
{if(o.responseText!=null)
evt_email_username_update.fire(o.responseText);}
function onEmailUsernameRequest(type,arg)
{var evtObj=arg[0];var post=evtObj.data.post;var url="/ci/ajaxRequest/emailUsername";RNT.Events.ajaxRequest(post,url,"emailUsernameSuccess");}
function feedbackSuccess(o)
{if(o.responseText!=null)
evt_feedback_submit_update.fire(o.responseText);}
function onFeedbackFormRequest(type,arg)
{var evtObj=arg[0];var post=evtObj.data.post;var url="/ci/ajaxRequest/submitFeedback";RNT.Events.ajaxRequest(post,url,"feedbackSuccess");}
function onKeywordChangedRequest(type,arg)
{var evt_obj=arg[0];if(search_filters[evt_obj.filters.report_id])
search_filters[evt_obj.filters.report_id]['format'].highlightLength=evt_obj.data.length;evt_keyword_changed_update.fire(evt_obj);}
function menuFilterGetSuccess(o)
{if(o.argument!=null)
{var evtObj=o.argument;if(o.responseText!==undefined)
{var results=YAHOO.lang.JSON.parse(o.responseText);if(results)
{evtObj.data.cache[evtObj.data.value]=results[0];evtObj.data.hier_data=results[0];evtObj.data.level+=1;evt_menu_filter_get_update.fire(evtObj);if(evtObj.data.linking_on&&evtObj.data.filter_name.indexOf("prod")>-1)
{hier_menu_link_map=results['link_map'];linkingEvtObj=new EventObject();linkingEvtObj.data.level=1;linkingEvtObj.data.hier_data=hier_menu_link_map[0];if(evtObj.data.filter_name.indexOf('products')!==-1)
linkingEvtObj.data.filter_name=evtObj.data.filter_name.replace("products","categories");else
linkingEvtObj.data.filter_name=evtObj.data.filter_name.replace("prod","cat");linkingEvtObj.filters.report_id=evtObj.filters.report_id;evt_menu_filter_get_update.fire(linkingEvtObj);if(evtObj.data.value==-1)
hier_menu_link_map="";}}
else
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{icon:"WARN"});}}}}
function onMenuFilterGet(type,arg)
{var evtObj=arg[0];if(evtObj.data.level>5)
return;if(evtObj.data.link_map&&hier_menu_link_map!="")
hier_menu_link_map=evtObj.data.link_map;if(!evtObj.data.linking_on)
{if(evtObj.data.value<1)
{evtObj.data.level+=1;evtObj.data.hier_data=Array();evt_menu_filter_get_update.fire(evtObj);return;}
if(evtObj.data.cache[evtObj.data.value])
{evtObj.data.hier_data=evtObj.data.cache[evtObj.data.value];evtObj.data.level+=1;evt_menu_filter_get_update.fire(evtObj);return;}}
else
{if((evtObj.data.filter_name.indexOf("cat")>-1)&&hier_menu_link_map!="")
{if(!evtObj.data.reset)
evtObj.data.level+=1;evtObj.data.hier_data=hier_menu_link_map[evtObj.data.value];evt_menu_filter_get_update.fire(evtObj);return;}}
var postData="filter="+evtObj.data.filter_name+"&lvl="+(evtObj.data.level+1)+"&id="+evtObj.data.value+"&linking="+evtObj.data.linking_on;RNT.Events.ajaxRequest(postData,"/ci/ajaxRequestMin/getHierValues","menuFilterGetSuccess",null,evtObj);}
function onMenuFilterSelect(type,arg)
{var evtObj=arg[0];evt_menu_filter_select_update.fire(evtObj);}
function onMenuFilterSetSuccess(o)
{if(o.responseText!=null)
{result=YAHOO.lang.JSON.parse(o.responseText);if(result)
evt_menu_filter_set_update.fire(result);else
RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{icon:"WARN"});}}
function onMenuFilterSet(type,arg)
{var chain;var hierValues=arg[0].data.hierSetData;chain=hierValues[1]['id'];for(var i=2;i<hierValues.length;++i)
{if(hierValues[i]['id']>0)
chain+=','+hierValues[i]['id'];}
var postData="chain="+chain+"&filter_type="+arg[0].data.filter_name;evt_menu_filter_setting_update.fire();RNT.Events.ajaxRequest(postData,"/ci/ajaxRequest/prodcatAddNotification","onMenuFilterSetSuccess");}
function onProdCatNotificationRequest(type,arg)
{var evtObj=arg[0];var postData="filter_type="+evtObj.data.filter_type+"&chain="+evtObj.data.chain+"&cid="+evtObj.data.cid;RNT.Events.ajaxRequest(postData,"/ci/ajaxRequest/prodcatAddNotification","onProdCatNotificationUpdate");}
function onProdCatNotificationUpdate(o)
{if(o.responseText!=null)
{var result=YAHOO.lang.JSON.parse(o.responseText);if(result)
evt_prodcat_notification_update.fire(result);else
RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{icon:"WARN"});}}
function onProdCatDeleteRequestSuccess(o)
{if(o.responseText!=null)
{var result=YAHOO.lang.JSON.parse(o.responseText);if(result)
evt_prodcat_notification_delete_update.fire(result);else
RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{icon:"WARN"});}}
function onProdCatDeleteRequest(type,arg)
{var evtObj=arg[0];var postData="filter_type="+evtObj.data.filter_type+"&chain="+evtObj.data.chain+"&timestamp="+evtObj.data.time;postData+=(evtObj.data.cid)?("&cid="+evtObj.data.cid):'';RNT.Events.ajaxRequest(postData,"/ci/ajaxRequest/prodcatDeleteNotification","onProdCatDeleteRequestSuccess");}
function onProdCatRenewRequestSuccess(o)
{if(o.responseText!=null)
{var result=YAHOO.lang.JSON.parse(o.responseText);if(result)
evt_prodcat_notification_renewal_update.fire(result);else
RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{icon:"WARN"});}}
function onProdCatRenewRequest(type,arg)
{var evtObj=arg[0];var postData="filter_type="+evtObj.data.filter_type+"&chain="+evtObj.data.chain+"&timestamp="+evtObj.data.time;RNT.Events.ajaxRequest(postData,"/ci/ajaxRequest/prodcatRenewNotification","onProdCatRenewRequestSuccess");}
function onSearchRequest(type,arg)
{var evtObj=arg[0];var location=window.location.pathname.toString();var splitResult=location.split("/app");var rel_path="/app"+((splitResult.length>1)?splitResult[1]:"");var url=evtObj.data.report_page;if(searches!=null)
{searches++;}
if(!_runningInIFrame&&(url==""||rel_path.substring(0,url.length)==url))
{if(!search_filters[evtObj.filters.report_id])
{search_filters[evtObj.filters.report_id]=new Object();search_filters[evtObj.filters.report_id]['filters']=new Object();search_filters[evtObj.filters.report_id]['format']=new Object();}
search_filters[evtObj.filters.report_id]['filters']['page']=1;search_filters[evtObj.filters.report_id]['filters']['search']=1;filter_count.action=GET_DATA;evt_search_update.fire(evtObj);}
else
{filter_count.action=CHANGE_PAGE;if(splitResult[0].slice(-1)=='/')
splitResult[0]=splitResult[0].slice(0,-1);filter_count.url=splitResult[0]+url;if(search_filters[evtObj.filters.report_id]&&search_filters[evtObj.filters.report_id]['filters'])
search_filters[evtObj.filters.report_id]['filters']['page']=1;}
filter_count.subscribed=evt_get_filters_request.subscribers.length;filter_count.actual=0;filter_count.report_id=evtObj.filters.report_id;requestUpdatedSearchFilters(evtObj.filters.report_id);}
function requestUpdatedSearchFilters(report_id)
{var evtObj=new RightNow.Event.EventObject();evtObj.filters.report_id=report_id;evtObj.name=pl_name;evt_get_filters_request.fire(evtObj);}
function onSearchFiltersUnprocessed(type,args)
{evtObj=args[0];filter_count.action=SEND_FILTERS;filter_count.subscribed=evt_get_filters_request.subscribers.length;filter_count.actual=0;filter_count.report_id=evtObj.filters.report_id;filter_count.url=evtObj.data.url;filter_count.filter_name=evtObj.data.filter_name;requestUpdatedSearchFilters(evtObj.filters.report_id);}
function onSearchFiltersUpdate(type,args)
{if(args[0]!=null)
setSearchFilter(args[0]);filter_count.actual++;if(filter_count.subscribed==filter_count.actual)
{if(filter_count.action==1)
{requestReport(filter_count.report_id);}
else if(filter_count.action==2)
{requestNewPage();}
else if(filter_count.action==3)
{var url=filter_count.url;url=RightNow.Url.convertSearchFilters(url,search_filters[filter_count.report_id]['filters'],filter_count.report_id,searches);var eo=new RightNow.Event.EventObject();eo.name=pl_name;eo.data.url=url;eo.data.report_id=filter_count.report_id+"";eo.data.filter_name=filter_count.filter_name;if(emptyHistoryState)
YAHOO.util.History.navigate(browserHistoryManagementKey,"");evt_search_filters_unprocessed_update.fire(eo);}}}
function requestNewPage(page)
{var newurl=filter_count.url;newurl=RightNow.Url.convertSearchFilters(newurl,search_filters[filter_count.report_id]['filters'],filter_count.report_id,searches);newurl=RightNow.Url.addParameter(newurl,"search","1");if(page)
newurl=RightNow.Url.addParameter(newurl,"page",page);newurl+=session;RightNow.Url.navigate(newurl);}
function onSetInitialFiltersRequest(type,args)
{var evtObj=args[0];if(!search_filters[evtObj.filters.report_id])
{search_filters[evtObj.filters.report_id]=new Object();search_filters[evtObj.filters.report_id]['filters']=new Object();search_filters[evtObj.filters.report_id]['format']=new Object();}
search_filters[evtObj.filters.report_id]['token']=evtObj.filters.token;for(var node in evtObj.data.format)
{if(node!='undefined')
search_filters[evtObj.filters.report_id]['format'][node]=evtObj.data.format[node];}
for(var node in evtObj.data.filters)
{if(node!='undefined')
search_filters[evtObj.filters.report_id]['filters'][node]=evtObj.data.filters[node];}
var bookmarkedState=YAHOO.util.History.getBookmarkedState(browserHistoryManagementKey);var initialHistoryState=bookmarkedState||"";if(!emptyHistoryState)
emptyHistoryState=getHistoryStateFor(buildRequestParameters(evtObj.filters.report_id));if(!_runningInIFrame)
{YAHOO.util.History.register(browserHistoryManagementKey,initialHistoryState,requestReportHistoryCallback);try
{YAHOO.util.History.onReady(function(){isBrowserHistoryManagementEnabled=true;var currentState=YAHOO.util.History.getCurrentState(browserHistoryManagementKey);if(currentState!=="")
requestReportHistoryCallback(currentState);});YAHOO.util.History.initialize("rn_History_Field","rn_History_Iframe");}catch(e){}}}
function onMoreResultsRequest(type,arg)
{var evtObj=arg[0];if(!search_filters[evtObj.filters.report_id])
{search_filters[evtObj.filters.report_id]=new Object();search_filters[evtObj.filters.report_id]['filters']=new Object();search_filters[evtObj.filters.report_id]['format']=new Object();}
search_filters[evtObj.filters.report_id]['filters']['no_truncate']=1;search_filters[evtObj.filters.report_id]['filters']['search']=0;requestReport(evtObj.filters.report_id);search_filters[evtObj.filters.report_id]['filters']['no_truncate']=0;}
function onSearchInProgress(type,arg)
{evt_search_in_progress_update.fire(arg[0]);}
function onPageRequest(type,arg)
{var evtObj=arg[0];if(!search_filters[evtObj.filters.report_id])
{search_filters[evtObj.filters.report_id]=new Object();search_filters[evtObj.filters.report_id]['filters']=new Object();search_filters[evtObj.filters.report_id]['format']=new Object();}
search_filters[evtObj.filters.report_id]['filters']['page']=evtObj.data.page;delete search_filters[evtObj.filters.report_id]['filters']['search'];if(_runningInIFrame)
{filter_count.report_id=evtObj.filters.report_id;filter_count.url=window.location.pathname;requestNewPage(evtObj.data.page);}
else
{requestReport(evtObj.filters.report_id);}}
function requestReport(report_id)
{var requestParameters=buildRequestParameters(report_id);if(isBrowserHistoryManagementEnabled)
{try{var stateString=YAHOO.lang.JSON.stringify(requestParameters);var stateObject=requestParameters;if("p"in stateObject.sf&&"data"in stateObject.sf.p&&"cache"in stateObject.sf.p.data)
delete stateObject.sf.p.data.cache;if("c"in stateObject.sf&&"data"in stateObject.sf.c&&"cache"in stateObject.sf.c.data)
delete stateObject.sf.c.data.cache;var state=RightNow.Text.Encoding.base64Encode(YAHOO.lang.JSON.stringify(stateObject));var newLength;if(window.location.href.indexOf('#')>-1)
newLength=window.location.href.substr(0,window.location.href.indexOf('#')).length+state.length;else
newLength=window.location.href.length+state.length;if(YAHOO.env.ua.ie>0&&newLength>2080)
{requestReportWith(requestParameters);return;}
YAHOO.util.History.navigate(browserHistoryManagementKey,state);}
catch(err){alert("error: "+err.message);}}
else
requestReportWith(requestParameters);}
function getRequestParametersFor(historyState)
{if(historyState==="")
return getRequestParametersFor(emptyHistoryState);return YAHOO.lang.JSON.parse(RightNow.Text.Encoding.base64Decode(historyState));}
function getHistoryStateFor(requestParameters)
{return RightNow.Text.Encoding.base64Encode(YAHOO.lang.JSON.stringify(requestParameters));}
function getEmptyEventObjectWith(reportId)
{var neweo=new RightNow.Event.EventObject();neweo.filters.report_id=reportId;neweo.filters.data="";return neweo;}
function requestReportHistoryCallback(historyState)
{var requestParameters=getRequestParametersFor(historyState);evt_search_in_progress_request.fire(new RightNow.Event.EventObject());if(requestParameters.sf.searchType!=null)
evt_search_type_update.fire(requestParameters.sf.searchType);if(requestParameters.sf.sort_args!=null)
evt_sort_type_update.fire(requestParameters.sf.sort_args);evt_keyword_changed_update.fire(requestParameters.sf.keyword||getEmptyEventObjectWith(requestParameters.report_id));requestParameters.token=search_filters[requestParameters.report_id].token;search_filters[requestParameters.report_id].filters=requestParameters.sf;requestReportWith(requestParameters);}
var requestParameterCounter=0;function buildRequestParameters(report_id)
{var sf=search_filters[report_id].filters;var fmt=search_filters[report_id].format;var token=search_filters[report_id].token;return{'sf':sf,'report_id':report_id,'token':token,'fmt':fmt,'c':requestParameterCounter++};}
function requestReportWith(requestParameters)
{var postData="filters="+encodeURIComponent(YAHOO.lang.JSON.stringify(requestParameters.sf))+"&report_id="+requestParameters.report_id+"&r_tok="+requestParameters.token+"&format="+YAHOO.lang.JSON.stringify(requestParameters.fmt);if(isBrowserHistoryManagementEnabled&&cachedReportResponses[postData])
ajaxReportDataSuccess(cachedReportResponses[postData]);else
RNT.Events.ajaxRequest(postData,"/ci/ajaxRequest/getReportData","ajaxReportDataSuccess");}
function ajaxReportDataSuccess(o)
{if(o.responseText!==undefined)
{if(isBrowserHistoryManagementEnabled)
cachedReportResponses[o.argument]=o;var results=YAHOO.lang.JSON.parse(o.responseText);var eo=new RightNow.Event.EventObject();eo.name=pl_name;eo.data=results;eo.filters.report_id=results.report_id;evt_report_update.fire(eo);evt_topic_words_update.fire(eo);evt_search_suggest_update.fire(eo);RightNow.Url.transformLinks();initLinkInterception();}}
function formFieldSendSuccess(o)
{if(o.responseText!==undefined)
evt_form_button_submit_update.fire(o.responseText);}
function onSendForm()
{var Form=RightNow.UI.Form;if(RightNow.Event._noSessionCookies)
{for(var i=0,length=Form.formFields.length;i<length;i++)
{var field=Form.formFields[i];if(field.table==='contacts'&&field.name==='login')
{document.cookie="cp_login_start=1;path=/";break;}}}
onSendForm._smartAssistant=(onSendForm._smartAssistant===true)?false:true;var formFields=YAHOO.lang.JSON.stringify(Form.formFields);var postData="a_id="+_answerID+"&i_id="+_incidentID+"&smrt_asst="+onSendForm._smartAssistant+"&f_tok="+Form.formToken+"&form="+encodeURIComponent(formFields);RNT.Events.ajaxRequest(postData,"/ci/ajaxRequest/sendForm","formFieldSendSuccess","genericAjaxFailure");}
function onSendPasswordResetForm(type,arg)
{var evtObj=arg[0];var postData="pw_reset="+evtObj.pw_reset;try{var formFields=YAHOO.lang.JSON.stringify(RightNow.UI.Form.formFields);formFields=encodeURIComponent(formFields);postData+="&f_tok="+RightNow.UI.Form.formToken+"&form="+formFields;}catch(e){}
if(RightNow.Event._noSessionCookies)
document.cookie="cp_login_start=1;path=/";RNT.Events.ajaxRequest(postData,"/ci/ajaxRequest/resetPassword","formFieldSendSuccess","genericAjaxFailure");}
function chatQueueAnswer(o)
{if(o.responseText!==undefined)
evt_chat_queue_update.fire(o.responseText);}
function onCheckQueue(type,args)
{var evtObj=YAHOO.lang.JSON.parse(args[0]);var postData="interface_id="+evtObj.data.interface_id;if(evtObj.data.qid)
postData+="&qid="+evtObj.data.qid;if(evtObj.data.c_id)
postData+="&c_id="+evtObj.data.c_id;if(evtObj.data.org_id)
postData+="&org_id="+evtObj.data.org_id;if(evtObj.data.contact_email)
postData+="&contact_email="+evtObj.data.contact_email;if(evtObj.data.contact_fname)
postData+="&contact_fname="+evtObj.data.contact_fname;if(evtObj.data.contact_lname)
postData+="&contact_lname="+evtObj.data.contact_lname;if(evtObj.data.prod)
postData+="&prod="+evtObj.data.prod;if(evtObj.data.cat)
postData+="&cat="+evtObj.data.cat;if(evtObj.data.test)
postData+="&test="+evtObj.data.test;RNT.Events.ajaxRequest(postData,"/ci/ajaxRequestOptional/checkChatQueue","chatQueueAnswer");}
function onChatSettingsRequest(type,args)
{var evtObj=args[0];chat.wait_threshold=evtObj.data.wait_threshold;chat.min_agents_avail=evtObj.data.min_agents_avail;}
function onPacStatRequest(type,args)
{var evtObj=args[0];if(evtObj)
{postData="type="+evtObj.data.dqaInsertType+"&widget="+evtObj.data.dqaWidgetType+"&column="+evtObj.data.dqaAction;RNT.Events.ajaxRequest(postData,"/ci/ajaxRequest/insertWidgetStats");}}
function genericAjaxFailure(o)
{if(o.responseText!==undefined)
{if(o.responseText=="Cleanse Error")
{alert("Ajax data failure: Illegal parameter value");}
else
{alert("Ajax request failure: "+o.responseText);}}}
RNT.Events.ajaxRequest=function(post,url,successHandler,failureHandler,data)
{var requestObject={"post":post,"url":url,"successHandler":successHandler,"failureHandler":failureHandler,"data":data};successHandler=eval(successHandler);on_before_ajax_request.fire(requestObject);requestObject=RightNow.Lang.cloneObject(requestObject);var challengeHandler=new RightNow.UI.AbuseDetection.Default(RightNow.UI.AbuseDetection.Default._deprecatedEventBusRequestResubmitHandler).getChallengeHandler();var callback={success:function(responseObject){if(RightNow.UI.AbuseDetection.doesResponseIndicateAbuse(responseObject)){try{challengeHandler(RightNow.JSON.parse(RightNow.Text.getSubstringAfter(responseObject.responseText,"\n")),requestObject,RightNow.UI.AbuseDetection.isRetry());}
catch(e){RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{"icon":"WARN"});}}
else{successHandler.apply(this,arguments);}},failure:(requestObject.failureHandler==null)?genericAjaxFailure:eval(requestObject.failureHandler),argument:requestObject.data||undefined};requestObject.callback=callback;requestObject.url+=session;var postData=(requestObject.post=="")?undefined:requestObject.post;YAHOO.util.Connect.asyncRequest('POST',requestObject.url,callback,postData);};}