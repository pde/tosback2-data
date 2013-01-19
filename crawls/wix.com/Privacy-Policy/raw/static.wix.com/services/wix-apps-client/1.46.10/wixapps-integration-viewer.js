Constants.WixApps=Constants.WixApps||{TEXT_STYLES:{Title:"font_0",Menu:"font_1","Page title":"font_2","Heading XL":"font_3","Heading L":"font_4","Heading M":"font_5","Heading S":"font_6","Body L":"font_7","Body M":"font_8","Body S":"font_9","Body XS":"font_10"},TEXT_STYLE_NAMES:{font_0:"Title",font_1:"Menu",font_2:"Page title",font_3:"Heading XL",font_4:"Heading L",font_5:"Heading M",font_6:"Heading S",font_7:"Body L",font_8:"Body M",font_9:"Body S",font_10:"Body XS"}};
Constants.WixAppEvents=Constants.WixAppEvents||{APP_PART_RESIZE:"wix:appPartResize",APP_VIEW_READY:"wix:appViewready",APP_VIEW_CREATED:"wix:appViewCreated",APP_ZOOM_READY:"wix:appZoomready",APP_CONTENT_RESIZE:"wix:appContentResize"};
W.Classes.newClass({name:"wixapps.integration.WixAppConstants",Class:{}});
W.Components.newComponent({name:"wixapps.integration.components.AppPage",imports:["wixapps.core.utils.WixAppsLogger"],Class:{Extends:"mobile.core.components.Page",Binds:["_onLogicClassLoaded","_onDataItemLoaded","_onDataItemLoadError"],_itemLoadedCallbacks:[],initialize:function(c,a,b){this.parent(c,a,b);
this._logger=new this.imports.WixAppsLogger()
},_onAllSkinPartsReady:function(){this._appPageId=this._data.get("appPageId");
var c=this._data.get("appInnerID")||"1";
this._appInstance=W.Apps.getApp(c);
if(!this._appInstance){var b=this._logger;
b.reportError(b.Errors.APP_INSTANCE_NOT_LOADED,this.$className,"render",b.SubCategory.CORE_WIRING);
return
}this._pageDefinition=this._appInstance.getPageDefinition(this._appPageId);
var a=this._pageDefinition.logic.display.type;
W.Classes.get(a,this._onLogicClassLoaded)
},_onLogicClassLoaded:function(a){this._pagePrimaryLogic=new a(this.getEnvironment());
this._primaryLogicLoaded=true;
this._fetchDataItem()
},updateParams:function(a){var b=this._getParams(a);
this._fetchDataItem(b)
},_fetchDataItem:function(a){if(this._primaryLogicLoaded==false){W.Utils.callLater(this._fetchDataItem,[a],this);
return
}if(!a){a=this._getParams()
}this._pagePrimaryLogic.fetchDataItem(a,this._onDataItemLoaded,this._onDataItemLoadError)
},_getParams:function(a){if(!a){var c=W.Utils.hash.getHashParts();
a=c.extData
}var b=this._fromQueryString(a);
if(Object.keys(b).length==0){b=this._pagePrimaryLogic.getSampleDataItem()
}return b
},registerPageAppPart:function(b,a){this._itemLoadedCallbacks.push(a);
if(this._dataItemLoaded){a(this._dataItem)
}},_onDataItemLoaded:function(a){this._dataItem=a;
this._dataItemLoaded=true;
this._itemLoadedCallbacks.each(function(b){b(a)
})
},_onDataItemLoadError:function(a){this._logger.reportError(this._logger.Errors.UNABLE_TO_LOAD_DATA_ITEM_FROM_PARAMS,this.$className,"_onDataItemLoadError",this._logger.SubCategory.CORE_WIRING);
if(W.Viewer.isPublicMode()){var b=W.Data.getDataMap().SITE_STRUCTURE.get("mainPage");
W.Viewer.goToPage(b)
}else{this._pagePrimaryLogic.fetchSampleDataItem(this._onDataItemLoaded,this._onDataItemLoadError)
}},getLogger:function(){return this._logger
},getEnvironment:function(){if(!this._environment){var b=this;
this._environment={_context:[{dataService:b._appInstance.getDataService(),itemCache:b._appInstance.getItemCache(),dataItemFactory:b._appInstance.getDataItemFactory()}],getDataItemFactory:function(){return this._getContext().dataItemFactory
},getTypesManager:function(){return b._appInstance.getTypesManager()
},getDataService:function(){return this._getContext().dataService
},getItemCache:function(){return this._getContext().itemCache
},getAppInstance:function(){return b._appInstance
},getLogger:function(){return b.getLogger()
},_getContext:function(){return this._context[this._context.length-1]
}};
if(this._pageDefinition.logic.display.options){var a={};
Object.each(this._pageDefinition.logic.display.options,function(d,c){a[c]=d
});
this._environment.options=a
}}return this._environment
},_fromQueryString:function(c){var b={};
if(c!=undefined&&c.length>0){c=c.split("&");
for(var a=0;
a<c.length;
a++){var d=c[a].split("=");
b[d[0]]=d[1]
}}return b
},getAcceptableDataTypes:function(){return["AppPage"]
}}});
W.Components.newComponent({name:"wixapps.integration.components.AppPart",traits:["wixapps.integration.components.traits.SizeRefreshHandler"],imports:["wixapps.integration.WixAppConstants","wixapps.core.utils.WixAppsLogger","wixapps.core.views.ViewsCustomizer","wixapps.core.views.ViewDefinitionsRepository","wixapps.core.dataservice.ItemCache","wixapps.core.dataservice.DataService","wixapps.core.events.ProxyEventBus","wixapps.core.views.ProxyFactory","wixapps.integration.proxies.ProxyMap","wixapps.integration.managers.AppResizeHandler","wixapps.integration.managers.LifecycleManager"],skinParts:{inlineContent:{type:"htmlElement"}},Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_onLogicLoaded","_onContentResize"],_states:["loading","error","rendering","content"],_eventDispatcher:null,_resizeHandler:null,EDITOR_META_DATA:{general:{help:false,settings:true,design:false},custom:[{label:"EDIT_DATA_BUTTON",command:"WAppsEditorCommands.OpenEditDataDialog",commandParameter:{}}]},initialize:function(c,a,b,d){this.parent(c,a,b);
this._logger=new this.imports.WixAppsLogger();
this._appInstance=null;
this._eventDispatcher=new this.imports.ProxyEventBus();
this.setState("content");
this._resizeHandler=new this.imports.AppResizeHandler();
this._resizeHandler.activateResizeHandler(this._eventDispatcher,this._view);
this._lifecycleManager=new this.imports.LifecycleManager(this._eventDispatcher);
this._eventDispatcher.addEvent(Constants.WixAppEvents.APP_CONTENT_RESIZE,this._onContentResize);
this.injects().Commands.registerCommand("WViewerCommands.AppDataChange")
},render:function(){try{this.getAppInstance()
}catch(b){this.setState("error");
var a=this._logger;
a.reportError(a.Errors.APP_INSTANCE_NOT_LOADED,this.$className,"render",a.SubCategory.CORE_WIRING)
}},initApp:function(){this._customizations=new this.imports.ViewsCustomizer(this._appInstance.getDataItemFactory());
this._viewDefinitions=new this.imports.ViewDefinitionsRepository(this._appInstance.getDataItemFactory());
this._viewDefinitions.cloneAndListen(this._appInstance.getViewDefRepo());
this._applyCustomizationRulesToDefinitions();
this._proxyFactory=new this.imports.ProxyFactory(this._appInstance.getDataItemFactory(),this._appInstance.getTypesManager(),this._viewDefinitions,this._eventDispatcher,this._appInstance.getAppBasePath(),this._appInstance.getPackageName(),this._lifecycleManager);
(new this.imports.ProxyMap()).registerComponentProxies(this._proxyFactory);
this._partDef=this._appInstance.getPartDefinition(this._data.get("appPartName"));
if(!this._partDef){throw new Error("AppPart.initApp partName ["+this._data.get("appPartName")+"] not found in app descriptor")
}this._allowHeightResize=this._partDef.allowHeightResize||false;
if(!this._allowHeightResize){this._resizableSides=[W.BaseComponent.ResizeSides.LEFT,W.BaseComponent.ResizeSides.RIGHT]
}if(this._partDef.minWidth){this.setMinW(this._partDef.minWidth)
}this._loadPartLogic();
this._view.set("partid",this._appInstance.getPackageName()+"_"+this._partDef.id)
},getCustomizationDefaultValue:function(b,f,a,c){var e={forType:b,viewName:f,fieldId:a,key:c};
var d=this._appInstance.getViewDefRepo();
var g=d.getViewDefinition(b,f);
if(!g){throw"View "+b+"|"+f+" not found in repository"
}g=g.getValue(0);
return this._customizations.getCurrentValue(g,e)
},_applyCustomizationRulesToDefinitions:function(){this._customizations.clearRules();
this._customizations.addRules(this._data.get("appLogicCustomizations"));
var a=this._appInstance.getViewDefRepo();
this._viewDefinitions.getAllViewDefinitions().forEach(function(c){var b=a.getViewDefinition(c.getChildValue("forType"),c.getChildValue("name")).getValue(0);
this._customizations.applyAll(b);
c.setValue(b)
}.bind(this));
this.fireEvent("customizationApplied")
},getPartDef:function(){return this._partDef
},getHelpId:function(){if(this._partDef.helpId){return this._partDef.helpId
}return this._appInstance.getAppDescriptor().helpId
},getAppPartViewDefRepo:function(){return this._viewDefinitions
},getViewDef:function(){if(!this._mainProxy){return
}return this._mainProxy.getViewDefinition()
},getViewsCustomizer:function(){return this._customizations
},getMainProxy:function(){return this._mainProxy
},getAppInstance:function(){if(!this._appInstance){this._appInstance=W.Apps.getApp(this._data.get("appInnerID"));
this._appInstance.registerAppPart(this)
}return this._appInstance
},getLogger:function(){return this._logger
},getLogicParams:function(){var a={};
if(this._partDef.logic.display.options){Object.each(this._partDef.logic.display.options,function(d,c){a[c]=d
})
}var b=this._data.get("appLogicParams");
Object.each(b,function(d,c){a[c]=d.value
});
return a
},getEnvironment:function(){if(!this._environment){var a=this;
this._environment={_context:[{dataService:a._appInstance.getDataService(),itemCache:a._appInstance.getItemCache(),dataItemFactory:a._appInstance.getDataItemFactory()}],getProxyFactory:function(){return a._proxyFactory
},getDataItemFactory:function(){return this._getContext().dataItemFactory
},getTypesManager:function(){return a._appInstance.getTypesManager()
},getDataService:function(){return this._getContext().dataService
},getItemCache:function(){return this._getContext().itemCache
},getAppPart:function(){return a
},getAppInstance:function(){return a._appInstance
},getViewDefRepo:function(){return a._appInstance.getViewDefRepo()
},getLogger:function(){return a.getLogger()
},_getContext:function(){return this._context[this._context.length-1]
},newDataServiceContext:function(){var e=this.getDataService();
var d=e.getDataItemFactory().clone();
var c=new a.imports.ItemCache(d);
var b=new a.imports.DataService(e.getTransport(),d,c);
this._context.push({dataService:b,itemCache:c,dataItemFactory:d})
},popDataServiceContext:function(){if(this._context.length<2){throw"no data service context to pop"
}return this._context.pop().dataService
}}
}return this._environment
},_loadPartLogic:function(){W.Classes.get(this._partDef.logic.display.type,this._onLogicLoaded)
},_onLogicLoaded:function(b){var a=this.getEnvironment();
this._logic=new b(a);
this.fireEvent("logicLoaded");
this.getViewNode().fireEvent("logicLoaded");
this._runLogic()
},_runLogic:function(){var d=this.getLogicParams();
var b=this;
var a={showProxy:function(e){b.setState("rendering");
if(b._mainProxy){b._mainProxy.dispose()
}b._mainProxy=e;
b._mainComponent=b._mainProxy.createComponent();
b._skinParts.inlineContent.set("html","");
b._skinParts.inlineContent.adopt(b._mainComponent);
if(b._allowHeightResize){b._mainProxy.getElement().setStyle("height",b.getHeight())
}b._mainProxy.setupProxy();
window.requestAnimFrame(function(){b._lifecycleManager.performAction(function(){b.fireEvent("proxyDisplayed",e);
b._eventDispatcher.fireEvent(Constants.WixAppEvents.APP_VIEW_READY);
b.setState("content")
})
});
b._mainProxy.addEvent("innerCompResize",function(f){if(!b._userResize&&!b._allowHeightResize){b._wCheckForSizeChangeAndFireAutoSized(1)
}});
b._mainProxy.addEvent("wix:zoom-link:open-zoom",function(h){var f=h.zoomParams;
var g=b.getPartDef().zoomPartName;
b.getAppInstance().getZoomHandler().openZoomForItemsList(f.list,f.selectedIndex,g)
});
b._mainProxy.addEvent("wix:app-link:navigate",function(f){b._navigateToAppPage(f)
})
},showLoadingIndicator:function(){b.setState("loading")
},hideLoadingIndicator:function(){b.setState("content")
},showErrorIndicator:function(g,f){g=g||-1;
f=f||"Unspecified error";
b.setState("error");
var e=b._logger;
e.reportError({code:g,description:f},this.$className,"showErrorIndicator",e.SubCategory.APP_LOGIC)
}};
var c=this._data.get("viewName");
if(!c){c=this._partDef.views[0];
this._data.set("viewName",c,true)
}this._logic.run(c,d,a)
},_navigateToAppPage:function(e){var f=e.appPageId;
var b=e.dataItem;
var d=function(j){this._pagePrimaryLogic=new j(this.getEnvironment());
var m=this._pagePrimaryLogic.generateLinkParams(b);
var k=m.title;
var i=m.params;
var l=Object.toQueryString(i);
var h=W.Viewer.getAppPages()[f];
var g=h._data.get("id");
W.Utils.hash.setHash(g,k,l)
}.bind(this);
var c=this._appInstance.getPageDefinition(f);
var a=c.logic.display.type;
W.Classes.get(a,d)
},_onAutoSized:function(a){if(this._allowHeightResize===false){this.setHeight(this._getMinPhysicalHeight(),false,false)
}this.parent(a)
},_getMinPhysicalHeight:function(){var a=0;
if(this._mainProxy&&this._mainProxy.getElement()){a=this._mainProxy.getElement().getSize().y
}return a
},_onAllSkinPartsReady:function(){this._skinParts.inlineContent.setStyles({position:"relative"})
},hasChildren:function(){return false
},isContainer:function(){return false
},_onDataChange:function(b,a,c){if(this._ignoreUpdate){return
}if(this._appInstance){this._runLogic()
}},getAppPartLogic:function(){return this._logic
},getAcceptableDataTypes:function(){return["AppPart"]
},_ruleFits:function(d,a){var b=true;
for(var c in a){if(a[c]!=d[c]){b=false
}}return b
},getCustomization:function(b){var d=[];
if(!b){return this._data.get("appLogicCustomizations")
}else{var c=this._data.get("appLogicCustomizations");
for(var a=c.length-1;
a>-1;
a--){if(this._ruleFits(c[a],b)){d.push(c[a])
}}}return d
},clearCustomizations:function(c,a){if(!c){this._data.set("appLogicCustomizations",[])
}else{var d=this._data.get("appLogicCustomizations");
for(var b=d.length-1;
b>-1;
b--){if(this._ruleFits(d[b],c)){d.splice(b,1)
}}}this._ignoreUpdate=!a;
this._data.fireDataChangeEvent();
this._ignoreUpdate=false;
this._applyCustomizationRulesToDefinitions();
this._eventDispatcher.fireEvent(Constants.WixAppEvents.APP_PART_RESIZE);
window.requestAnimFrame(function(){this.fireEvent("autoSized")
}.bind(this))
},applyCustomizationRule:function(f,e){var a=this._data.get("appLogicCustomizations");
var j=false;
var k,d;
f.type="AppPartCustomization";
for(var c=0;
c<a.length;
c++){k=a[c];
if(k.forType===f.forType&&k.view===f.view&&k.fieldId===f.fieldId&&k.mode===f.mode&&k.key===f.key){d=a.splice(c,1);
break
}}a.push(f);
this._ignoreUpdate=!e;
var h=d?d[0]:undefined;
var g=this.getCustomizationDefaultValue(f.forType,f.view,f.fieldId,f.key);
var b=!h?(g!=f.value):!this.injects().Utils.areObjectsEqual(f,h);
if(b){this.injects().Commands.executeCommand("WViewerCommands.AppDataChange",[f,h,this])
}this._data.fireDataChangeEvent();
this._ignoreUpdate=false;
this._applyCustomizationRulesToDefinitions();
this._eventDispatcher.fireEvent(Constants.WixAppEvents.APP_PART_RESIZE);
window.requestAnimFrame(function(){this.fireEvent("autoSized")
}.bind(this))
},_onResize:function(){if(!this._mainProxy){return this.parent()
}if(this._allowHeightResize===false){this.setHeight(this._getMinPhysicalHeight(),false,false)
}else{if(this._mainProxy){this._mainProxy.getElement().setStyle("height",this.getHeight())
}}this.parent();
this._userResize=true;
this._eventDispatcher.fireEvent(Constants.WixAppEvents.APP_PART_RESIZE);
this._userResize=false
},_onContentResize:function(){window.requestAnimFrame(function(){this.fireEvent("autoSized")
}.bind(this))
},getEventDispatcher:function(){return this._eventDispatcher
}}});
W.Components.newComponent({name:"wixapps.integration.components.AppPart2",traits:["wixapps.integration.components.traits.SizeRefreshHandler"],imports:["wixapps.integration.managers.ViewHolder"],skinParts:{inlineContent:{type:"htmlElement"}},Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_onAppViewReady","_initApp","_retrieveData"],_states:["loading","error","rendering","content"],_viewHolder:null,_dataProvider:null,_allowHeightResize:false,_appPartDefinition:null,_appInstance:null,_appPartData:null,initialize:function(c,a,b,d){this.parent.apply(this,arguments);
this.setState("loading")
},_onAllSkinPartsReady:function(){W.Apps2.getApplicationInstance(this._data.get("appInnerID"),this._initApp)
},_initApp:function(g){this._appInstance=g;
var c="";
var a="";
this._viewHolder=new this.imports.ViewHolder(g.getDataItemFactory(),g.getTypesManager(),g.getViewDefinitions(),c,a);
this._viewHolder.setContainer(this._skinParts.inlineContent);
var b=g.getAppPartDefinitions();
this._appPartDefinition=b.getById(this._data.get("appPartName"));
this._viewName=this._appPartDefinition.getViewName();
var d=this._appPartDefinition.getDataSelectorId();
var e=this._appInstance.getDataSelectors();
var f=e.getById(d);
if(f.isListSelector()){f.getItems(this._retrieveData,this._onError)
}else{f.getItem(this._retrieveData,this._onError)
}},_retrieveData:function(a){this._appPartData=a;
this.setState("rendering");
this._viewHolder.getEventDispatcher().addEvent(Constants.WixAppEvents.APP_VIEW_CREATED,this._onAppViewReady);
this._viewHolder.setupViewHolder(a,this._viewName)
},_onError:function(){this.setState("error")
},_onAppViewReady:function(){this.setState("content");
if(this._allowHeightResize===true){this._viewHolder.setContentHeight(this.getHeight())
}this._view.fireEvent(Constants.WixAppEvents.APP_VIEW_READY)
},_onResize:function(){if(this._viewHolder){if(this._allowHeightResize===false){this.setHeight(this._getMinPhysicalHeight(),false,false)
}else{if(this._viewHolder){this._viewHolder.setContentHeight(this.getHeight())
}}this.parent();
this._viewHolder.getEventDispatcher().fireEvent(Constants.WixAppEvents.APP_PART_RESIZE)
}},_getMinPhysicalHeight:function(){return 100
},getAcceptableDataTypes:function(){return["AppBuilderComponent"]
},getAppInstance:function(){return this._appInstance
},getAppPartData:function(){return this._appPartData
},getAppPartDefinition:function(){return this._appPartDefinition
},dispose:function(){this._viewHolder.getEventDispatcher().removeEvent(Constants.WixAppEvents.APP_VIEW_READY,this._onAppViewReady);
this._viewHolder.dispose();
this._viewHolder=null;
this._dataProvider=null;
this.parent()
}}});
W.Components.newComponent({name:"wixapps.integration.components.ClippedParagraph",skinParts:{richTextContainer:{type:"htmlElement"}},imports:["wixapps.integration.utils.RichTextClippingUtils"],propertiesSchemaName:"ClippedParagraphProperties",Class:{Extends:"wysiwyg.viewer.components.WRichText",initialize:function(c,a,b){this.parent(c,a,b);
this._clippingUtils=new this.imports.RichTextClippingUtils()
},render:function(){this._clipTextContent()
},_updateText:function(){},_clipTextContent:function(){var e=this._data.get("text");
var c=parseInt(this.getComponentProperty("maxLines"))||0;
var b=parseInt(this.getComponentProperty("minLines"))||0;
var d=String(this.getComponentProperty("pack"));
var a=this.getRichTextContainer();
if(c){this._clippingUtils.findClippedTextByLines(e,a,this.getWidth(),c);
window.requestAnimFrame(function(){var g=0;
var f=0;
var i=this._clippingUtils.getContainerRectList(a);
if(i.length>0){f=i[i.length-1].bottom-i[0].top;
if(d!="none"&&i.length<c){var j=c-i.length;
var h=(j*i[0].height);
f+=h;
if(d=="bottom"){g=h
}else{if(d=="middle"){g=Math.floor(h/2)
}}}if(b>0){f=Math.max(f,this._clippingUtils.getMinimalHeight(a,b))
}}a.setStyle("margin-top",g);
this.setHeight(f);
this.fireEvent("autoSizeChange")
}.bind(this))
}else{this._clippingUtils.findClippedText(e,a,this.getWidth(),this.getHeight())
}if(this.getComponentProperty("showTooltip")==="true"||this.getComponentProperty("showTooltip")===true){if(this._getElementInnerText(a).substr(-3)==="..."){a.setAttribute("title",e.replace(/<.*?>/gi,""))
}else{a.removeAttribute("title")
}}},_getElementInnerText:function(e){var c,d,a=e.nodeType,b="";
if(a){if(a===1||a===9||a===11){if(typeof e.textContent==="string"){return e.textContent
}else{if(typeof e.innerText==="string"){return e.innerText.replace(rReturn,"")
}else{for(e=e.firstChild;
e;
e=e.nextSibling){b+=getText(e)
}}}}else{if(a===3||a===4){return e.nodeValue
}}}else{for(c=0;
(d=e[c]);
c++){if(d.nodeType!==8){b+=getText(d)
}}}return b
},_onResize:function(){if(this.getRichTextContainer().getParents("body").length){this._clipTextContent()
}},_onAutoSized:function(){this._clipTextContent()
},calcParagraphMaxHeight:function(){}}});
W.Components.newComponent({name:"wixapps.integration.components.Expander",skinParts:{icon:{type:"htmlElement"},summary:{type:"htmlElement"},content:{type:"htmlElement"}},Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_toggle"],_states:["expand","collapsed"],initialize:function(c,a,b){this.parent(c,a,b);
this._createSummary=b.createSummaryFunc;
this._createContent=b.createContentFunc;
this._initialState=b.initialState;
this._noIcon=b.noIcon
},_onAllSkinPartsReady:function(a){if(this._noIcon){a.icon.hide()
}a.icon.addEvent("click",this._toggle);
a.summary.addEvent("click",this._toggle);
this._createSummary(a.summary);
this._createContent(a.content);
this.setState(this._initialState||"expand")
},setOpen:function(){this.setState("expand")
},setClosed:function(){this.setState("collapsed")
},_toggle:function(){if(this.getState()=="expand"){this.setClosed()
}else{this.setOpen()
}},_onResize:function(){this.parent()
}}});
W.Components.newComponent({name:"wixapps.integration.components.HorizontalRepeater",skinParts:{inlineContent:{type:"htmlElement"}},imports:["wysiwyg.viewer.utils.ComponentSequencer"],Class:{Extends:"wysiwyg.viewer.components.VerticalRepeater"}});
W.Components.newComponent({name:"wixapps.integration.components.Icon",skinParts:{img:{type:"htmlElement"}},Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_onClick"],initialize:function(c,a,b){this.parent(c,a,b)
},_onAllSkinPartsReady:function(a){a.img.addEvent("click",this._onClick)
},render:function(){this._skinParts.img.set("src",this._data.get("url"));
this._skinParts.img.set("width",this._data.get("width"));
this._skinParts.img.set("height",this._data.get("height"));
this._skinParts.img.set("title",this._data.get("title"))
},_onClick:function(a){this.fireEvent(Constants.CoreEvents.CLICK,a)
},getAcceptableDataTypes:function(){return["Icon"]
}}});
W.Components.newComponent({name:"wixapps.integration.components.ImageLite",imports:["mobile.core.components.image.ImageUrl"],traits:["wixapps.integration.components.traits.ImageDimensionsTrait"],Class:{Extends:"mobile.core.components.base.BaseComponent",_currentUri:"",_img:null,_imgWidth:0,_imgHeight:0,_imageMode:"",initialize:function(c,a,b){this.parent(c,a,b);
this._imageMode=b.imageMode||"fill"
},_onAllSkinPartsReady:function(){if(!this._img){this._img=new Element("img");
this._view.adopt(this._img)
}},render:function(){var a=this._view.getSize();
this.setSize(a.x,a.y)
},setOwner:function(){},invalidateSize:function(){},setWidth:function(b,a,c,d){this.parent(b,a,c);
if(!(d===true)){this.setSize(b,this._$height)
}},setHeight:function(b,a,c,d){this.parent(b,a,c);
if(!(d===true)){this.setSize(this._$width,b)
}},setImageMode:function(a){this._imageMode=a;
this.setSize(this._$width,this._$height)
},setSize:function(c,a,b){b=b||this._imageMode;
this._imgWidth=parseInt(this._data.get("width"));
this._imgHeight=parseInt(this._data.get("height"));
var g=this._getImageModeDimensionsFunc(b)({width:this._$width,height:this._$height},{width:this._imgWidth,height:this._imgHeight});
var d;
if(this._data.get("uri").indexOf("http:")!=0){d=new this.imports.ImageUrl().getImageUrlFromPyramid({x:parseInt(g.imgWidth),y:parseInt(g.imgHeight)},this._data.get("uri")).url
}else{d=this._data.get("uri")
}if(this._currentUri!==d){this._currentUri=d;
this._img.setAttribute("src",d)
}var f={position:"static",width:Math.round(g.imgWidth)+1,height:parseInt(g.imgHeight),"margin-top":parseInt(g.imgTop),"margin-left":parseInt(g.imgLeft),"box-shadow":"#000 0 0 0","image-rendering":"optimizequality"};
this._img.setStyles(f);
var e={width:parseInt(c),height:parseInt(a),overflow:"hidden"};
if("wrapperWidth" in g){e.width=g.wrapperWidth
}if("wrapperHeight" in g){e.height=g.wrapperHeight
}this._$width=e.width;
this._$height=e.height;
this._view.setStyles(e);
this.fireEvent("autoSizeChange")
},getAcceptableDataTypes:function(){return["Image"]
}}});
W.Components.newComponent({name:"wixapps.integration.components.InlineText",imports:["mobile.core.components.base.BaseComponent"],skinParts:{},Class:{Extends:"wysiwyg.viewer.components.WRichText",_updateText:function(){var a=this._data.get("text");
a=a.replace("<p","<span");
a=a.replace("</p","</span");
this._view.set("html",a)
},getRichTextContainer:function(){if(this._skinParts){return this._view
}else{return null
}}}});
W.Components.newComponent({name:"wixapps.integration.components.LinkSelector",skinParts:{description:{type:"htmlElement"}},Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_onClick"],_descriptionVisibility:false,initialize:function(c,a,b){this.parent(c,a,b);
this._descriptionVisibility=(b&&b.descriptionVisible)||false
},_onAllSkinPartsReady:function(a){a.description.addEvent("click",this._onClick)
},_onClick:function(a){this.fireEvent(Constants.CoreEvents.CLICK,a)
},render:function(){this.parent();
this.setDescriptionVisibility(this._descriptionVisibility)
},setDescriptionVisibility:function(a){this._descriptionVisibility=a;
this._skinParts.description.set("text",a?this._data.get("text"):"");
this._skinParts.description.set("title",a?"":this._data.get("text"))
},getAcceptableDataTypes:function(){return["Text"]
}}});
W.Components.newComponent({name:"wixapps.integration.components.MultiColumnList",imports:["wysiwyg.viewer.utils.ComponentSequencer"],Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:[],_columns:3,_columnWidth:0,initialize:function(c,a,b){this.parent(c,a,b);
this._sequencer=new this.imports.ComponentSequencer();
if(b&&b.sequencingHook){this._sequencer.resolveItem=b.sequencingHook
}else{throw new Error("No sequencer")
}},_onAllSkinPartsReady:function(){this._sequencer.addEvent("componentSetup",function(a){this._onDisplayerCreation(a.compView,a.method,a.index)
}.bind(this));
this._sequencer.addEvent("productionFinished",function(a){this._onSequencerFinished(a)
}.bind(this))
},getAcceptableDataTypes:function(){return["ImageList"]
},render:function(){this._columnWidth=this._view.getSize().x/this._columns;
this._sequencer.createComponents(this._skinParts.itemsContainer,this._data.get("items").slice(0,this._numCols*this._numRows))
},_onSequencerFinished:function(a){},_onDisplayerCreation:function(b,c,a){b.setStyles({width:this._columnWidth})
},getSequencer:function(){return this._sequencer
}}});
W.Components.newComponent({name:"wixapps.integration.components.PaginatedGridGallery",skinParts:{itemsContainer:{type:"htmlElement"},buttonPrev:{type:"htmlElement"},buttonNext:{type:"htmlElement"},counter:{type:"htmlElement",optional:true},rolloverHolder:{type:"htmlElement",optional:true},rolloverContent:{type:"htmlElement",optional:true},title:{type:"htmlElement",optional:false},description:{type:"htmlElement",optional:false},zoom:{type:"htmlElement",optional:true},link:{type:"htmlElement",optional:false}},imports:["wysiwyg.viewer.utils.MatrixTransitions","wysiwyg.viewer.utils.GalleryUtils","mobile.core.utils.LinkUtils"],traits:["wysiwyg.viewer.components.traits.GalleryAutoplay"],propertiesSchemaName:"PaginatedGridGalleryProperties",Class:{Extends:"wysiwyg.viewer.components.MatrixGallery",Binds:["next","prev","_onTransitionComplete","_onRollOut","_onMouseMove","_onClick","_onRollOverViewCreated"],_states:{rendering:["pending","ready"],itemSelection:["rollover","idle"],linkableComponent:["link","noLink"]},_pageItemsCount:0,_currentItemIndex:0,_displayerDict:{},_transitionPending:false,_transitionUtils:null,_linkUtils:null,_hasRollOver:true,_NO_LINK_PROPAGATION:true,initialize:function(c,a,b){b=b||{};
this.parent(c,a,b);
this._transitionsOn=false;
this._transitionUtils=new this.imports.MatrixTransitions();
this._linkUtils=new this.imports.LinkUtils();
this._view.addEvent(Constants.CoreEvents.MOUSE_MOVE,this._onMouseMove);
this._view.addEvent(Constants.CoreEvents.MOUSE_OUT,this._onRollOut);
if("fixedRowNumber" in b){this._fixedRowNumber=(b.fixedRowNumber===true)
}if(b.sequencingHook===undefined){this._sequencer.resolveItem=function(){return{comp:"wysiwyg.viewer.components.ImageLite",skin:"mobile.core.skins.InlineSkin"}
}
}if(b.rolloverHook){this._rolloverSequencer=new this.imports.ComponentSequencer();
this._rolloverSequencer.resolveItem=b.rolloverHook;
this._rolloverSequencer.addEvent("componentSetup",this._onRollOverViewCreated)
}if(b.sequencingHook&&!b.rolloverHook){this._hasRollOver=false
}},getSequencer:function(){return this._sequencer
},_onAllSkinPartsReady:function(){this.parent();
this._skinParts.itemsContainer.setStyles({position:"relative"});
this._skinParts.itemsContainer.addEvent(Constants.CoreEvents.CLICK,this._onClick);
if(this._skinParts.rolloverHolder){this._skinParts.rolloverHolder.addEvent(Constants.CoreEvents.CLICK,this._onClick);
this._skinParts.rolloverHolder.setStyles({overflow:"hidden"})
}var a=this.injects().Utils.getCSSBrowserFeature("user-select");
var b={cursor:"pointer"};
if(a){b[a]="none"
}this._skinParts.buttonPrev.setStyles(b);
this._skinParts.buttonNext.setStyles(b);
this._skinParts.buttonPrev.addEvent(Constants.CoreEvents.CLICK,function(c){c.stopPropagation();
this.prev()
}.bind(this));
this._skinParts.buttonNext.addEvent(Constants.CoreEvents.CLICK,function(c){c.stopPropagation();
this.next()
}.bind(this));
this._skinParts.itemsContainer.setStyle("overflow","hidden");
this._transitionUtils.setupTransitionMap(this._calcItemPosition.bind(this),this._skinParts.itemsContainer);
this._checkSkinPartsVisibility()
},_getRowNumber:function(){if(this._fixedRowNumber===true){return parseInt(this.getComponentProperty("maxRows"))
}else{return this.parent()
}},_calculateItemSize:function(){if(this._skinParts&&this._data.get("items").length>0){var a={x:this.getWidth(),y:this.getHeight()};
var c=a.x-this._widthDiff;
var b=a.y-this._heightDiff;
this._itemWidth=Math.max(Math.floor((c-((this._numCols-1)*this._gap))/this._numCols),0);
this._itemHeight=Math.max(Math.floor((b-((this._numRows-1)*this._gap))/this._numRows),0)
}},_onResize:function(){this.parent();
if(this._skinParts){this._resetRollOver()
}},_onResizeEnd:function(){if(this._skinParts){this._skinParts.itemsContainer.getChildren().forEach(function(b,a){this._updateDisplayerGeometry(b,a)
}.bind(this))
}},_onDataChange:function(a,b){this._currentItemIndex=0;
this._pageItemsCount=parseInt(this.getComponentProperty("numCols")*this._getRowNumber());
if(this._componentReady&&a===this._data){this._skinParts.itemsContainer.empty()
}this.parent.apply(this,arguments);
this._checkSkinPartsVisibility()
},render:function(){var b=this._data.get("items");
this._displayerDict={};
if(this._skinParts.counter){this._skinParts.counter.set("text",this._getCounterText(this._currentItemIndex,b.length))
}this._pageItemsCount=parseInt(this.getComponentProperty("numCols")*this._getRowNumber());
this._displayedItems=this._getPageItems(b,this._currentItemIndex);
var a=this._displayedItems;
if(b.length>this._pageItemsCount){this._nextPageItems=this._getPageItems(b,this._getNextPageItemIndex());
this._prevPageItems=this._getPageItems(b,this._getPrevPageItemIndex());
a=a.concat(this._nextPageItems).concat(this._prevPageItems);
this._skinParts.buttonNext.setStyles({display:"block"});
this._skinParts.buttonPrev.setStyles({display:"block"})
}else{this._skinParts.buttonNext.setStyles({display:"none"});
this._skinParts.buttonPrev.setStyles({display:"none"})
}this._sequencer.createComponents(this._skinParts.itemsContainer,a)
},_getPageItems:function(b,d){var e=[];
var a=Math.min(this._numItems-1,d+this._pageItemsCount-1);
for(var c=d;
c<=a;
c++){e.push(b[c])
}return e
},_translateRefList:function(d){var h;
var a=[];
var c;
var g;
var f=this._skinParts.itemsContainer.children;
var b=typeOf(d[0]);
d=d.slice(0);
for(var e=0;
e<f.length;
e++){h=f[e];
c=h.getLogic().getDataItem();
g=(b==="string")?"#"+c.get("id"):c;
if(d.contains(g)){a.push(h);
d.splice(d.indexOf(g),1)
}}return a
},_checkSkinPartsVisibility:function(){if(this._skinParts){this._resetRollOver();
this._skinParts.buttonPrev.setStyle("visibility",this.getComponentProperty("showNavigation")?"visible":"hidden");
this._skinParts.buttonNext.setStyle("visibility",this.getComponentProperty("showNavigation")?"visible":"hidden");
this._skinParts.counter.setStyle("visibility",this.getComponentProperty("showCounter")?"visible":"hidden");
if(this._skinParts.rolloverHolder){this._skinParts.rolloverHolder.setStyle("cursor",this.getComponentProperty("expandEnabled")?"pointer":"default")
}}},_updateState:function(){},_onDisplayerCreation:function(c,e,b){var d;
var a=c.getViewNode();
if(c.getRef){d=c.getRef()
}else{d="#"+c.getDataItem().get("id")
}a.addClass("galleryDisplayer");
this._displayerDict[d]=c;
this._updateDisplayerGeometry(a,b)
},_updateDisplayerGeometry:function(b,a){this._setupItem(b);
if(a>=this._displayedItems.length){b.setStyles({top:-this._itemHeight*1.5,position:"absolute"})
}},_onSequencerFinished:function(a){a.elements=a.elements.slice(0,this._displayedItems.length);
this.parent(a);
this._transitionPending=false;
this.fireEvent("transitionFinished")
},gotoNext:function(){this.next()
},next:function(){if(!this._transitionPending&&this._numItems>this._pageItemsCount){this._currentItemIndex=this._getNextPageItemIndex();
this._goto(this._nextPageItems,0)
}},prev:function(){if(!this._transitionPending&&this._numItems>this._pageItemsCount){this._currentItemIndex=this._getPrevPageItemIndex();
this._goto(this._prevPageItems,1)
}},_getNextPageItemIndex:function(){var a=this._currentItemIndex+this._pageItemsCount;
if(a>=this._numItems){a=0
}return a
},_getPrevPageItemIndex:function(){var a=this._currentItemIndex-this._pageItemsCount;
if(a<0){a=(this._getTotalPageCount()-1)*this._pageItemsCount
}return a
},_getTotalPageCount:function(){var a=Math.floor(this._numItems/this._pageItemsCount);
if((this._numItems%this._pageItemsCount)>0){a++
}return a
},_getCounterText:function(a,c){var b=Math.floor(a/this._pageItemsCount);
var d=Math.max(this._getTotalPageCount(),1);
return String(b+1)+"/"+String(d)
},_goto:function(d,e){this._transitionPending=true;
this._resetRollOver();
var c=this._translateRefList(this._displayedItems);
var b=this._translateRefList(d);
var a=this._transitionUtils.getTransition(this.getComponentProperty("transition"));
this._setupAllItems(b);
a(c,b,this._numCols,this._numRows,e,parseFloat(this.getComponentProperty("transDuration")),function(){Array.each(c,function(f){if(f.getLogic){f.getLogic().dispose()
}else{f.destroy()
}});
this._onTransitionComplete(b)
}.bind(this))
},_onTransitionComplete:function(){this.render()
},_onMouseMove:function(b){if(this._transitionPending===true){return
}var c=this._findDisplayerFromPosition(b.page);
if(c&&this._skinParts.rolloverHolder&&this._hasRollOver){if(this._highlightedDisplayer!==c){this._highlightedDisplayer=c;
var a=c.getCoordinates(this._skinParts.rolloverHolder.getParent());
this._skinParts.rolloverHolder.setStyles({visibility:"visible",position:"absolute",padding:0,left:a.left,top:a.top,width:a.width,height:a.height});
this._skinParts.rolloverHolder.uncollapse();
this.setState("idle");
window.requestAnimFrame(function(){if(this._highlightedDisplayer){this._updateDisplayerInfo(c.getLogic().getDataItem());
var e=this._highlightedDisplayer.getLogic().getDataItem();
if(e.getType&&e.getType()==="Image"){var d=this.getSkinPart("link");
this._linkUtils.linkifyElement(this,d,e,true)
}this.setState("rollover")
}}.bind(this))
}}else{this._resetRollOver()
}},_onRollOut:function(a){if(a.relatedTarget&&(!a.relatedTarget.getParents().contains(this._view))){this._resetRollOver()
}},_findDisplayerFromPosition:function(g){var a;
var f=this._skinParts.itemsContainer.getPosition();
var d={x:g.x-f.x,y:g.y-f.y};
var b=Math.floor(d.x/(this._itemWidth+this._gap));
var e=Math.floor(d.y/(this._itemHeight+this._gap));
if(b>=0&&e>=0){var c=(e*this._numCols)+b;
if(c<this._galleryItems.length){a=this._galleryItems[c]
}}return a
},_findDisplayer:function(a){while(a){if(a===this._skinParts.itemsContainer){return null
}if(this._galleryItems.contains(a)){return a
}a=a.getParent()
}return null
},_updateDisplayerInfo:function(b){if(this._skinParts.rolloverHolder&&this._rolloverSequencer){var a=this._skinParts.rolloverContent||this._skinParts.rolloverHolder;
this._rolloverSequencer.createComponents(a,[b])
}else{if(b&&b.getData&&"title" in b.getData()&&"description" in b.getData()){this._skinParts.title.set("text",b.get("title"));
this._skinParts.description.set("text",b.get("description"))
}}},_onRollOverViewCreated:function(a){this._setupItem(a.compView)
},_hideRollOverHolder:function(){this.setState("idle");
this._skinParts.rolloverHolder.collapse()
},_resetRollOver:function(){this._hideRollOverHolder();
this._highlightedDisplayer=null
},_onClick:function(d){var c;
if(d.rightClick===false&&this.getComponentProperty("expandEnabled")===true){var e=this._highlightedDisplayer||this._findDisplayer(d.target);
if(e){c=e.getLogic().getDataItem();
if(c.get){var f=c.get("id");
var b=this._data.get("items");
var a=b.indexOf("#"+f);
this.injects().Commands.executeCommand("WViewerCommands.OpenZoom",{itemsList:this._data,currentIndex:a,getDisplayerDivFunction:this.injects().Viewer.getDefaultGetZoomDisplayerFunction("Image"),getHashPartsFunction:function(g,h){this.injects().Data.getDataItem(g,function(i){h({id:i.get("id"),title:i.get("title")})
})
}.bind(this)})
}}}}}});
W.Components.newComponent({name:"wixapps.integration.components.Toggle",skinParts:{on:{type:"htmlElement"},off:{type:"htmlElement"}},Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["toggle"],_states:["on","off"],initialize:function(c,a,b){this.parent(c,a,b);
this._createOnHook=b.createOnHook;
this._createOffHook=b.createOffHook;
this._initialState=b.initialState;
this._listensToPartsClick=b.listensToPartsClick
},_onAllSkinPartsReady:function(a){if(this._listensToPartsClick){a.on.addEvent("click",this.toggle);
a.off.addEvent("click",this.toggle)
}this._createOnHook(a.on);
this._createOffHook(a.off);
this.setState(this._initialState=="on"?"on":"off")
},turnOn:function(){this.setState("on")
},turnOff:function(){this.setState("off")
},toggle:function(){if(this.getState()=="on"){this.turnOff()
}else{this.turnOn()
}this.fireEvent("wix:toggle",{state:this.getState()})
},_onResize:function(){this.parent()
}}});
W.Components.newComponent({name:"wixapps.integration.components.inputs.CheckBoxGroupInput",skinParts:{collection:{type:Constants.ComponentPartTypes.HTML_ELEMENT},errorMessage:{type:Constants.ComponentPartTypes.HTML_ELEMENT,optional:"true"}},traits:["wysiwyg.viewer.components.traits.ValidationSettings"],Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_handleSingleCheckboxClick"],_states:{validity:["valid","invalid"]},initialize:function(c,a,b){this.parent(c,a,b);
this.addEvent(this.VALID_STATE_CHANGED_EVENT,function(d){this.setState(d?"valid":"invalid","validity")
}.bind(this));
this._checkboxGroupName=b.checkboxGroupName||"cbGroup"
},_onAllSkinPartsReady:function(){this._createCheckboxGroup()
},_createCheckboxGroup:function(){var a=function(c){this._optionsData=Object.values(c);
this._bindCheckboxGroupToData(this._skinParts.collection)
}.bind(this);
this._selectedOptions=this.getDataItem().get("selected");
var b=this.getDataItem().get("items").filter(function(c){return c.get("enabled")
});
if(b.length>0&&typeof(b[0])==="string"){this.injects().Data.getDataByQueryList(b,a)
}else{a(b)
}},_bindCheckboxGroupToData:function(a){a.empty();
for(var b=0;
b<this._optionsData.length;
b++){var e=this._optionsData[b];
var d=e.get("value");
var c=new Element("Input",{type:"checkbox",name:this._checkboxGroupName,value:d,idInData:b});
a.grab(c,"bottom");
a.addEvent("click",this._handleSingleCheckboxClick);
a.innerHTML+=e.get("text")+"<BR/>"
}this._setSelected(a)
},_setSelected:function(a){var c=this.getDataItem().get("selected");
var b=a.getElements('input[name="'+this._checkboxGroupName+'"]');
if(c){Array.each(c,function(e){var d=this._optionsData.indexOf(e);
if(d>-1&&d<b.length){b[d].set("checked","checked")
}}.bind(this))
}},_handleSingleCheckboxClick:function(a){var b=a.target;
var e=this.getDataItem().get("selected");
var c=b.getAttribute("idInData");
var d=this._optionsData[c];
if(b.checked){e.push(d)
}else{e.erase(d)
}this.getDataItem().set("selected",e);
this.getDataItem().fireDataChangeEvent("selected",e);
this.fireEvent("selectionChanged",d)
},setError:function(a){this.setValidationState(false);
if(this._skinParts.errorMessage){this._skinParts.errorMessage.set("text",a)
}},getAcceptableDataTypes:function(){return["MultiSelectableList"]
}}});
W.ComponentData.registerDataTypeSchema("DateInputProperties",{allowEmpty:{type:"boolean","default":true,description:"If set to false will not have empty options in the combo-boxes and the default value will be set to the current date."}});
W.Components.newComponent({name:"wixapps.integration.components.inputs.DateInput",skinParts:{year:{type:Constants.ComponentPartTypes.HTML_ELEMENT},month:{type:Constants.ComponentPartTypes.HTML_ELEMENT},day:{type:Constants.ComponentPartTypes.HTML_ELEMENT}},propertiesSchemaName:"DateInputProperties",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_userChange"],_states:{validation:["invalid"],allowEmpty:["allowEmpty","hideEmpty"]},_invalidDateString:"Invalid Date",_emptyYearText:"YYYY",_emptyMonthText:"MM",_emptyDayText:"DD",initialize:function(c,a,b){this.parent(c,a,b)
},showValidationMessage:function(a){this.setState("invalid","validation");
if(this._skinParts.message){this._skinParts.message.set("text",a)
}},resetInvalidState:function(){this.removeState("invalid","validation");
if(this._skinParts.message){this._skinParts.message.set("text","")
}},_onAllSkinPartsReady:function(){this._skinParts.year.addEvent(Constants.CoreEvents.CHANGE,this._userChange);
this._skinParts.month.addEvent(Constants.CoreEvents.CHANGE,this._userChange);
this._skinParts.day.addEvent(Constants.CoreEvents.CHANGE,this._userChange);
var c=new Option(this._emptyYearText,this._emptyYearText);
c.addClass("empty");
this._skinParts.year.options.add(c);
c=new Option(this._emptyMonthText,this._emptyMonthText);
c.addClass("empty");
this._skinParts.month.options.add(c);
var a=new Date().getFullYear();
var b;
for(b=new Date(0).getFullYear();
b<a+6;
b++){this._skinParts.year.options.add(new Option(b,b))
}for(b=1;
b<13;
b++){this._skinParts.month.options.add(new Option(b,b))
}},render:function(){var d,b;
var a=this._data.get("text");
var j=new Date(a);
var g=j.getFullYear();
var e=j.getMonth()+1;
var h=j.getDate();
var c=this._allowEmpty();
this.setState(c?"allowEmpty":"hideEmpty","allowEmpty");
if(c){if(j.toString()==this._invalidDateString){if(this._skinParts.day.options.length===0){b=new Option(this._emptyDayText,this._emptyDayText);
b.addClass("empty");
this._skinParts.day.options.add(b);
for(d=1;
d<this._getDaysForMonth(g,e)+1;
d++){this._skinParts.day.options.add(new Option(d,d))
}this._setSelectedValue(this._skinParts.day,this._emptyDayText)
}return
}if(j.getTime()==0){this._skinParts.day.innerHTML="";
b=new Option(this._emptyDayText,this._emptyDayText);
b.addClass("empty");
this._skinParts.day.options.add(b);
var f=this._getDaysForMonth(g,e);
for(d=1;
d<=f;
d++){this._skinParts.day.options.add(new Option(d,d))
}this._setSelectedValue(this._skinParts.year,this._emptyYearText);
this._setSelectedValue(this._skinParts.month,this._emptyMonthText);
this._setSelectedValue(this._skinParts.day,this._emptyDayText);
return
}}this._skinParts.day.innerHTML="";
b=new Option(this._emptyDayText,this._emptyDayText);
b.addClass("empty");
this._skinParts.day.options.add(b);
for(d=1;
d<this._getDaysForMonth(g,e)+1;
d++){this._skinParts.day.options.add(new Option(d,d))
}this._setSelectedValue(this._skinParts.year,g);
this._setSelectedValue(this._skinParts.month,e);
this._setSelectedValue(this._skinParts.day,h)
},_setSelectedValue:function(a,c){var b=Array.from(a.options).filter(function(d){return d.value==c
});
if(b.length){b[0].selected=true
}},_isValidDate:function(){return(this._skinParts.year.getSelected()[0].value!=this._emptyYearText&&this._skinParts.month.getSelected()[0].value!=this._emptyMonthText&&this._skinParts.day.getSelected()[0].value!=this._emptyDayText)
},_isEmptyDate:function(){return(this._skinParts.year.getSelected()[0].value==this._emptyYearText&&this._skinParts.month.getSelected()[0].value==this._emptyMonthText&&this._skinParts.day.getSelected()[0].value==this._emptyDayText)
},_userChange:function(){var a=new Date(0);
if(this._isEmptyDate()){this.getDataItem().set("text",a.toISOString());
this.fireEvent("selectionChanged",a.toISOString())
}else{if(this._isValidDate()){a.setFullYear(this._skinParts.year.getSelected()[0].value);
a.setMonth(this._skinParts.month.getSelected()[0].value-1);
var b=this._getDaysForMonth(a.getFullYear(),a.getMonth()+1);
a.setDate(b<this._skinParts.day.getSelected()[0].value?b:this._skinParts.day.getSelected()[0].value);
this.getDataItem().set("text",a.toISOString());
this.fireEvent("selectionChanged",a.toISOString())
}else{this.getDataItem().set("text",this._invalidDateString);
this.fireEvent("selectionChanged",this._invalidDateString)
}}},_allowEmpty:function(){return this.getComponentProperty("allowEmpty")===true||this.getComponentProperty("allowEmpty")==="true"
},_getDaysForMonth:function(a,b){a=a||new Date().getFullYear();
b=b;
return new Date(a,b,0).getDate()
},getAcceptableDataTypes:function(){return["Text"]
}}});
W.Components.newComponent({name:"wixapps.integration.components.inputs.LocationSelector",skinParts:{address:{type:Constants.ComponentPartTypes.HTML_ELEMENT},viewMode:{type:Constants.ComponentPartTypes.HTML_ELEMENT},message:{type:Constants.ComponentPartTypes.HTML_ELEMENT}},propertiesSchemaName:"GoogleMapProperties",traits:[],Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_handleSearch","_handleAddressKeyDown"],_states:{validation:["invalid"],viewMode:["loading","error","found","search"]},API_KEY:"AIzaSyDMbN5wvwwR2ePDQ1QquKP_0VAhvAFNWes",geocoder:null,initialize:function(c,a,b){this.parent(c,a,b);
this.setState("search","viewMode")
},showValidationMessage:function(a){this.setState("invalid","validation");
if(this._skinParts.message){this._skinParts.message.set("text",a);
this._skinParts.message.uncollapse()
}},resetInvalidState:function(){this.removeState("invalid","validation");
if(this._skinParts.message){this._skinParts.message.set("text","");
this._skinParts.message.collapse()
}},render:function(){var a=this.getDataItem().get("address");
this._skinParts.address.value=a
},_onAllSkinPartsReady:function(){this._skinParts.address.addEvent(Constants.CoreEvents.KEY_DOWN,this._handleAddressKeyDown);
this._skinParts.address.addEvent(Constants.CoreEvents.BLUR,this._handleSearch);
this._skinParts.viewMode.addEvent(Constants.CoreEvents.CLICK,this._handleSearch)
},_handleAddressKeyDown:function(b){if(b.code==13){b.stop();
this._getGeoLocationFromAddress(this._skinParts.address.value)
}else{var a=this.getDataItem();
a.set("latitude",-1970,true);
a.set("longitude",-1970,true);
this.setState("search","viewMode")
}},_handleSearch:function(a){if(this.getState("viewMode")==="search"){this._getGeoLocationFromAddress(this._skinParts.address.value)
}},_getGeoLocationFromAddress:function(a){this.setState("loading","viewMode");
if(this.geocoder===null){var c=new Request.JSONP({url:"http://maps.googleapis.com/maps/api/js?key="+this.API_KEY+"&sensor=true",onComplete:function(){this.geocoder=new google.maps.Geocoder();
this._getGeoLocationFromAddress(a)
}.bind(this)});
c.send();
return
}var b=this.getDataItem();
if(a.trim().length===0){this.resetInvalidState();
b.set("latitude",1970,true);
b.set("longitude",1970,true);
b.set("address","",true);
b.fireDataChangeEvent();
this.setState("search","viewMode");
return
}this.geocoder.geocode({address:a},function(f,d){var e=this.getDataItem();
if(d==google.maps.GeocoderStatus.OK){this.resetInvalidState();
var g=f[0].geometry.location;
e.set("latitude",g.lat(),true);
e.set("longitude",g.lng(),true);
e.set("address",f[0].formatted_address,true);
e.fireDataChangeEvent();
this.setState("found","viewMode")
}else{this.showValidationMessage("We couldn't find this address, enter another one or leave it empty");
e.set("address",a,true);
e.set("latitude",-1970,true);
e.set("longitude",-1970,true);
e.fireDataChangeEvent();
this.setState("error","viewMode")
}}.bind(this))
},getAcceptableDataTypes:function(){return["GeoMap"]
}}});
W.ComponentData.registerDataTypeSchema("TextInputProperties",{label:"string",placeholder:"string"});
W.Components.newComponent({name:"wixapps.integration.components.inputs.TextInput",skinParts:{input:{type:"htmlElement"}},propertiesSchemaName:"TextInputProperties",Class:{Extends:"mobile.core.components.base.BaseComponent",_states:{label:["hasLabel","noLabel"],validation:["invalid"]},Binds:["_changeEventHandler","_fireBlur","_fireKeyUp","_selectPresetFieldContent","_deselectPresetFieldContent"],render:function(){this.setLabel(this.getComponentProperty("label"));
this.setValue(this.getDataItem().get("text"),false);
this.setPlaceholder(this.getComponentProperty("placeholder"))
},_onAllSkinPartsReady:function(){this.addEvent("inputChanged",function(a){this._ignoreUpdate=true;
this.getDataItem().set("text",a.value);
this._ignoreUpdate=false
}.bind(this));
this._listenToInput()
},dispose:function(){this._stopListeningToInput();
this.parent()
},setPlaceholder:function(a){this._skinParts.input.set("placeholder",a);
if(window.Modernizr&&!window.Modernizr.input.placeholder){this._placeholderPolyFill()
}},_placeholderPolyFill:function(){function b(d){var c=d.target;
if(c.get("value")==""&&c.get("placeholder")){c.addClass("isPlaceholder");
c.set("value",c.get("placeholder"))
}}function a(d){var c=d.target;
if(c.hasClass("isPlaceholder")){c.removeClass("isPlaceholder");
c.set("value","")
}}if(!this.hasPlaceholder){this.hasPlaceholder=true;
this._skinParts.input.addEvent("focus",a);
this._skinParts.input.addEvent("blur",b);
b({target:this._skinParts.input})
}},setLabel:function(a){if(a&&typeof a=="string"){this.setState("hasLabel","label");
this._skinParts.label.set("html",a);
this._skinParts.label.uncollapse()
}else{this.setState("noLabel","label");
this._skinParts.label.set("html","");
this._skinParts.label.collapse()
}},showValidationMessage:function(a){this.setState("invalid","validation");
if(this._skinParts.message){this._skinParts.message.set("text",a);
this._skinParts.message.uncollapse()
}},resetInvalidState:function(){this.removeState("invalid","validation");
if(this._skinParts.message){this._skinParts.message.set("text","");
this._skinParts.message.collapse()
}},setValue:function(c,b){var a=this._skinParts.input;
if(this.hasPlaceholder){a.removeClass("isPlaceholder")
}if(!this._ignoreUpdate){a.set("value",c)
}if(b){a.set("isPreset","true")
}else{a.erase("isPreset")
}},_changeEventHandler:function(c){if(c.code&&!W.Utils.isInputKey(c.code)){return
}this._skinParts.input.set("isPreset","");
var b=this.getValue();
b=this.injects().Utils.convertToHtmlText(b);
var a={value:b,origEvent:c,compLogic:this};
this.fireEvent("inputChanged",a)
},_selectPresetFieldContent:function(a){if(a.target.get("isPreset")){if(!a.target.get("isSelected")){a.target.set("isSelected","true");
a.target.select()
}}},_deselectPresetFieldContent:function(a){a.target.erase("isSelected")
},_fireBlur:function(a){this.fireEvent(Constants.CoreEvents.BLUR,a)
},_fireKeyUp:function(a){this.fireEvent(Constants.CoreEvents.KEY_UP,a)
},_listenToInput:function(){this._skinParts.input.addEvent(Constants.CoreEvents.KEY_UP,this._changeEventHandler);
this._skinParts.input.addEvent(Constants.CoreEvents.KEY_UP,this._fireKeyUp);
this._skinParts.input.addEvent(Constants.CoreEvents.CUT,this._changeEventHandler);
this._skinParts.input.addEvent(Constants.CoreEvents.PASTE,this._changeEventHandler);
this._skinParts.input.addEvent(Constants.CoreEvents.CHANGE,this._changeEventHandler);
this._skinParts.input.addEvent(Constants.CoreEvents.CLICK,this._selectPresetFieldContent);
this._skinParts.input.addEvent(Constants.CoreEvents.BLUR,this._deselectPresetFieldContent);
this._skinParts.input.addEvent(Constants.CoreEvents.BLUR,this._fireBlur)
},_stopListeningToInput:function(){this._skinParts.input.removeEvent(Constants.CoreEvents.KEY_UP,this._changeEventHandler);
this._skinParts.input.removeEvent(Constants.CoreEvents.KEY_UP,this._fireKeyUp);
this._skinParts.input.removeEvent(Constants.CoreEvents.CUT,this._changeEventHandler);
this._skinParts.input.removeEvent(Constants.CoreEvents.PASTE,this._changeEventHandler);
this._skinParts.input.removeEvent(Constants.CoreEvents.CHANGE,this._changeEventHandler);
this._skinParts.input.removeEvent(Constants.CoreEvents.CLICK,this._selectPresetFieldContent);
this._skinParts.input.removeEvent(Constants.CoreEvents.BLUR,this._deselectPresetFieldContent);
this._skinParts.input.removeEvent(Constants.CoreEvents.BLUR,this._fireBlur)
},getValue:function(){var a=this._skinParts.input;
var b="";
if(!a.hasClass("isPlaceholder")){b=a.get("value")
}return b
},getAcceptableDataTypes:function(){return["Text"]
}}});
W.ComponentData.registerDataTypeSchema("TimeInputProperties",{resolution:{type:"string","enum":["hours","half-hour","quarter-hour","minutes","seconds"],"default":"minutes",description:"Specify the resolution of the time selector"},hourFormat:{type:"string","enum":["12h","24h"],"default":"12h",description:"Specify the format of the hour field in the time selector (12h / 24h)"},allowEmpty:{type:"boolean","default":true,description:"If set to false will not have empty options in the combo-boxes and the default value will be set to the current date."}});
W.Components.newComponent({name:"wixapps.integration.components.inputs.TimeInput",skinParts:{hours24:{type:Constants.ComponentPartTypes.HTML_ELEMENT},hours12:{type:Constants.ComponentPartTypes.HTML_ELEMENT},minutes:{type:Constants.ComponentPartTypes.HTML_ELEMENT},seconds:{type:Constants.ComponentPartTypes.HTML_ELEMENT},ampm:{type:Constants.ComponentPartTypes.HTML_ELEMENT},message:{type:Constants.ComponentPartTypes.HTML_ELEMENT}},propertiesSchemaName:"TimeInputProperties",traits:[],Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_userChange"],_states:{resolution:["hours","half-hour","quarter-hour","minutes","seconds"],hourFormat:["12h","24h"],allowEmpty:["allowEmpty","hideEmpty"],validation:["invalid"]},_options:{minutes:[],quarterHour:[],halfHour:[]},_invalidDateString:"Invalid Date",_emptyHoursText:"HH",_emptyMinutesText:"MI",_emptySecondsText:"SS",initialize:function(c,a,b){this.parent(c,a,b);
this._buildMinuteOptionCache()
},showValidationMessage:function(a){this.setState("invalid","validation");
if(this._skinParts.message){this._skinParts.message.set("text",a)
}},resetInvalidState:function(){this.removeState("invalid","validation");
if(this._skinParts.message){this._skinParts.message.set("text","")
}},render:function(){var g=this._data.get("text"),b=this.getComponentProperty("resolution"),f=this.getComponentProperty("hourFormat"),h=this._allowEmpty();
this.setState(b,"resolution");
this.setState(f,"hourFormat");
this.setState(h?"allowEmpty":"hideEmpty","allowEmpty");
if(h&&g==this._invalidDateString){return
}var a=new Date(g);
if(isNaN(a.getTime())){a=h?new Date(0):new Date()
}var e=a.getHours(),c=a.getMinutes(),d=a.getSeconds();
this._clearOptions(this._skinParts.minutes);
if(b=="quarter-hour"){this._populateOptions(this._skinParts.minutes,this._options.quarterHour);
c=(parseInt((c+7.5)/15)*15)%60;
e=a.getMinutes()>52?e+1:e
}if(b=="half-hour"){this._populateOptions(this._skinParts.minutes,this._options.halfHour);
c=(parseInt((c+15)/30)*30)%60;
e=a.getMinutes()>45?e+1:e
}if(this._skinParts.minutes.options.length==0){this._populateOptions(this._skinParts.minutes,this._options.minutes)
}if(h&&a.getTime()==0){this._setSelectedValue(this._skinParts.hours12,this._emptyHoursText);
this._setSelectedValue(this._skinParts.hours24,this._emptyHoursText);
this._setSelectedValue(this._skinParts.minutes,this._emptyMinutesText);
this._setSelectedValue(this._skinParts.seconds,this._emptySecondsText)
}else{if(e==0){this._setSelectedValue(this._skinParts.hours12,12);
this._setSelectedValue(this._skinParts.ampm,"PM")
}else{this._setSelectedValue(this._skinParts.hours12,e%12);
this._setSelectedValue(this._skinParts.ampm,e>12?"PM":"AM")
}this._setSelectedValue(this._skinParts.hours24,e);
this._setSelectedValue(this._skinParts.minutes,c);
this._setSelectedValue(this._skinParts.seconds,d)
}},_setSelectedValue:function(a,c){var b=Array.from(a.options).filter(function(d){return d.value==c
});
if(b.length){b[0].selected=true
}},_clearOptions:function(a){a.innerHTML=""
},_populateOptions:function(a,b){for(var c=0;
c<b.length;
c++){a.options.add(b[c])
}},_formatTimePart:function(b,a){a=a||" ";
return(a+b).substr(-2)
},_onAllSkinPartsReady:function(){this._populateStaticOptions();
this._skinParts.hours24.addEvent(Constants.CoreEvents.CHANGE,this._userChange);
this._skinParts.hours12.addEvent(Constants.CoreEvents.CHANGE,this._userChange);
this._skinParts.minutes.addEvent(Constants.CoreEvents.CHANGE,this._userChange);
this._skinParts.seconds.addEvent(Constants.CoreEvents.CHANGE,this._userChange)
},_isValidDate:function(){return((this.getState("hourFormat")=="24h"||this._skinParts.hours12.getSelected()[0].value!=this._emptyHoursText)&&(this.getState("hourFormat")=="12h"||this._skinParts.hours24.getSelected()[0].value!=this._emptyHoursText)&&(this.getState("resolution")=="hours"||this._skinParts.minutes.getSelected()[0].value!=this._emptyMinutesText)&&(this.getState("resolution")!="seconds"||this._skinParts.seconds.getSelected()[0].value!=this._emptySecondsText))
},_isEmptyDate:function(){var b=((this.getState("hourFormat")=="24h"&&this._skinParts.hours24.getSelected()[0].value==this._emptyHoursText)||(this.getState("hourFormat")=="12h"&&this._skinParts.hours12.getSelected()[0].value==this._emptyHoursText)),c=this._skinParts.minutes.getSelected()[0].value==this._emptyMinutesText,a=this._skinParts.seconds.getSelected()[0].value==this._emptySecondsText;
if(this.getState("resolution")=="hours"){return b
}if(this.getState("resolution")=="seconds"){return b&&c&&a
}return b&&c
},_userChange:function(){var b=new Date(0),a;
if(this._isEmptyDate()){this.getDataItem().set("text",b.toISOString());
this.fireEvent("selectionChanged",b.toISOString())
}else{if(this._isValidDate()){if(this.getState("hourFormat")=="12h"){a=this._skinParts.hours12.getSelected()[0].value;
if(this._skinParts.ampm.getSelected()[0].value=="PM"){a=(parseInt(a,10)+12)%24
}else{a=parseInt(a,10)
}}else{a=this._skinParts.hours24.getSelected()[0].value;
a=parseInt(a,10)
}b.setHours(a);
if(this.getState("resolution")!="hours"){b.setMinutes(parseInt(this._skinParts.minutes.getSelected()[0].value,10))
}else{b.setMinutes(0)
}if(this.getState("resolution")=="seconds"){b.setSeconds(parseInt(this._skinParts.seconds.getSelected()[0].value,10))
}else{b.setSeconds(0)
}b.setDate(5);
this.getDataItem().set("text",b.toISOString());
this.fireEvent("selectionChanged",b.toISOString())
}else{this.getDataItem().set("text",this._invalidDateString);
this.fireEvent("selectionChanged",this._invalidDateString)
}}},_buildMinuteOptionCache:function(){var b,c,a;
a=new Option(this._emptyMinutesText,this._emptyMinutesText);
a.addClass("empty");
this._options.quarterHour.push(a);
this._options.halfHour.push(a);
this._options.minutes.push(a);
for(b=0;
b<60;
b++){c=this._formatTimePart(b,"0");
a=new Option(c,b);
if(b%15==0){this._options.quarterHour.push(a)
}if(b%30==0){this._options.halfHour.push(a)
}this._options.minutes.push(a)
}},_populateStaticOptions:function(){var b,c,a;
this._skinParts.ampm.options.add(new Option("AM","AM"));
this._skinParts.ampm.options.add(new Option("PM","PM"));
a=new Option(this._emptyHoursText,this._emptyHoursText);
a.addClass("empty");
this._skinParts.hours12.options.add(a);
for(b=1;
b<13;
b++){c=this._formatTimePart(b);
this._skinParts.hours12.options.add(new Option(c,b))
}a=new Option(this._emptyHoursText,this._emptyHoursText);
a.addClass("empty");
this._skinParts.hours24.options.add(a);
for(b=0;
b<24;
b++){c=this._formatTimePart(b);
this._skinParts.hours24.options.add(new Option(c,b))
}a=new Option(this._emptySecondsText,this._emptySecondsText);
a.addClass("empty");
this._skinParts.seconds.options.add(a);
for(b=0;
b<60;
b++){c=this._formatTimePart(b,"0");
this._skinParts.seconds.options.add(new Option(c,b))
}},_allowEmpty:function(){return this.getComponentProperty("allowEmpty")===true||this.getComponentProperty("allowEmpty")==="true"
},getAcceptableDataTypes:function(){return["Text"]
}}});
W.Classes.newClass({name:"wixapps.integration.managers.AppResizeHandler",Class:{Binds:["_onAppResize","_onAppViewCreated"],_appHolderView:null,_resizeDispatcher:null,activateResizeHandler:function(a,b){if(this._resizeDispatcher){this.deactivateResizeHandler(this._resizeDispatcher)
}this._resizeDispatcher=a;
this._appHolderView=b;
this._resizeDispatcher.addEvent(Constants.WixAppEvents.APP_PART_RESIZE,this._onAppResize);
this._resizeDispatcher.addEvent(Constants.WixAppEvents.APP_VIEW_READY,this._onAppViewCreated)
},deactivateResizeHandler:function(){this._resizeDispatcher.removeEvent(Constants.WixAppEvents.APP_PART_RESIZE,this._onAppResize);
this._resizeDispatcher.removeEvent(Constants.WixAppEvents.APP_VIEW_READY,this._onAppViewCreated);
this._resizeDispatcher=null;
this._appHolderView=null
},_onAppViewCreated:function(){this._performResizeAction(this._appHolderView,function(a){a._onAppViewCreated()
})
},_onAppResize:function(){this._performResizeAction(this._appHolderView,function(a){a._onAppResize.call()
})
},_performResizeAction:function(b,d){var c=this;
var a=Array.filter(b.getElements("[hasproxy]"),function(e){return c._isResizableProxy(e.getViewProxy())
}).map(function(e){return{proxy:e.getViewProxy(),depth:c._getElementDepth(b,e)}
}).sort(function(f,e){return f.depth-e.depth
});
a.forEach(function(e){d(e.proxy)
})
},_isResizableProxy:function(a){return(a._onAppResize&&a._onAppViewCreated)
},_getElementDepth:function(a,b){return(b==a||b==null)?0:(this._getElementDepth(a,b.getParent())+1)
}}});
W.Classes.newClass({name:"wixapps.integration.managers.ApplicationInstance",imports:["wixapps.core.managers.TypesManager","wixapps.core.dataservice.DataServiceTransport","wixapps.core.data.DataItemFactory","wixapps.core.dataservice.ItemCache","wixapps.core.dataservice.DataService","wixapps.core.views.ViewsCustomizer","wixapps.core.views.ViewDefinitionsRepository","wixapps.integration.managers.applicationhandlers.ZoomHandler","wixapps.core.expressions.FunctionLibrary"],Class:{Binds:["_onDescriptorLoaded"],Extends:Events,initialize:function(b){this._appParts=[];
this._idInMetasite=b.applicationId;
this._appDefinitionId=b.appDefinitionId;
this._packageName=b.packageName;
this._types=new this.imports.TypesManager();
this._funcLibrary=new this.imports.FunctionLibrary();
this._dataFactory=new this.imports.DataItemFactory();
this._dataFactory.registerFunctionLibrary(this._funcLibrary);
this._itemCache=new this.imports.ItemCache(this._dataFactory);
this._zoomHandler=new this.imports.ZoomHandler(this);
if(b.type=="wixapps"){this._transport=new this.imports.DataServiceTransport(b.datastoreId,"","");
this._dataService=new this.imports.DataService(this._transport,this._dataFactory,this._itemCache)
}else{if(b.type=="ecommerce"){this._magentoStoreId=b.magentoStoreId
}}this._customizations=new this.imports.ViewsCustomizer();
this._viewDefinitions=new this.imports.ViewDefinitionsRepository(this._dataFactory);
this._appBasePath=null;
var a=W.Config.getServiceTopologyProperty("scriptsLocationMap");
if(a&&a.wixapps){this._appBasePath=a.wixapps+"/javascript/wixapps/apps/"+this._packageName+"/"
}this._createdApplicationPages={}
},loadDescriptor:function(){W.Apps.requestAppDescriptor(this._packageName,this._onDescriptorLoaded)
},getAppDefinitionId:function(){return this._appDefinitionId
},getPackageName:function(){return this._packageName
},getIdInMetasite:function(){return this._idInMetasite
},getDataService:function(){return this._dataService
},getMagentoStoreId:function(){return this._magentoStoreId
},getAppDescriptor:function(){return this._descriptor
},getAppBasePath:function(){return this._appBasePath
},getAppParts:function(){return this._appParts
},registerAppPart:function(a){this._appParts.push(a);
if(this.getDescriptorLoaded()){a.initApp()
}},getDescriptorLoaded:function(){return !!this._descriptor
},getTypesManager:function(){return this._types
},getDataServiceTransport:function(){return this._transport
},getDataItemFactory:function(){return this._dataFactory
},getItemCache:function(){return this._itemCache
},getCustomizations:function(){return this._customizations
},getViewDefRepo:function(){return this._viewDefinitions
},getPartDefinition:function(a){if(!this._descriptor||!this._descriptor.parts){return null
}for(var b=0;
b<this._descriptor.parts.length;
b++){if(this._descriptor.parts[b].id==a){return this._descriptor.parts[b]
}}return null
},getPageDefinition:function(a){if(!this._descriptor||!this._descriptor.pages){return null
}return this._descriptor.pages.first(function(b){return(b.id==a)
})
},_onDescriptorLoaded:function(d){this._descriptor=d;
var b;
var e=getSystemTypes();
for(b=0;
b<e.length;
b++){this._types.registerType(e[b])
}for(b=0;
b<d.types.length;
b++){this._types.registerType(d.types[b])
}this._customizations.addRules(d.customizations);
this._addDataEditingCustomizations();
for(b=0;
b<d.views.length;
b++){var c=this._viewDefinitions.cloneAndMultiply(d.views[b]);
for(var a=0;
a<c.length;
a++){this._customizations.fillMissingIds(c[a]);
this._customizations.applyAll(c[a]);
this._viewDefinitions.setViewDefinition(c[a])
}}for(b=0;
b<this._appParts.length;
b++){this._appParts[b].initApp()
}if(W.Viewer&&W.Viewer.isSiteReady()){this._zoomHandler.validateZoomRelatedData()
}W.Commands.registerCommandListenerByName("EditorCommands.SiteLoaded",this,this._zoomHandler.validateZoomRelatedData)
},_addDataEditingCustomizations:function(){var d=this.getDescriptorValue(["dataEditing","typeMetaData"]);
var c=this.getCustomizations();
for(var a in d){var b=d[a];
if(b.validationMessages){for(var e in b.validationMessages){c.addRule({forType:a,view:"editorForm",fieldId:e,mode:"*",key:"comp.validationMessage",value:b.validationMessages[e]})
}}}},getDescriptorValue:function(a){return this._getInnerValue(this._descriptor,a)
},_getInnerValue:function(c,d){var a=c;
for(var b=0;
b<d.length;
b++){a=a[d[b]];
if(!a){return null
}}return a
},getZoomHandler:function(){return this._zoomHandler
}}});
function getSystemTypes(){return[{_iid:"wix:Type",_type:"wix:Type",fields:[{name:"name",type:"String"},{name:"fields",type:"Array<wix:Field>"},{name:"validations",type:"Array<wix:Validation>",defaultValue:"[]"}]},{_iid:"wix:Field",_type:"wix:Type",fields:[{name:"name",type:"String"},{name:"type",type:"String"},{name:"defaultValue"},{name:"computed",type:"Boolean",defaultValue:false},{name:"validations",type:"Array<wix:Validation>",defaultValue:[]}]},{_iid:"wix:Validation",_type:"wix:Type",fields:[{name:"func",type:"String"},{name:"params",type:"Array",defaultValue:[]}]},{_iid:"wix:Object",_type:"wix:Type",fields:[]},{_iid:"wix:Ref",_type:"wix:Type",fields:[{name:"itemId",type:"String"},{name:"collectionId",type:"String"}]},{_iid:"wix:Permission",_type:"wix:Type",fields:[{name:"collectionId",type:"String"},{name:"operation",type:"String"},{name:"role",type:"String"}]},{_iid:"wix:Customizations",_type:"wix:Type",fields:[{name:"rules",type:"Array<wix:Object>",defaultValue:[]}]},{_iid:"wix:Date",_type:"wix:Type",fields:[{name:"iso",type:"String",defaultValue:"1970-01-01T00:00:00.000Z",validations:[{func:"ne",params:["Invalid Date"]}]}]},{_iid:"wix:Image",_type:"wix:Type",fields:[{name:"title",type:"String",defaultValue:""},{name:"src",type:"String"},{name:"width",type:"Number"},{name:"height",type:"Number"}]},{_iid:"wix:Video",_type:"wix:Type",fields:[{_type:"wix:Field",name:"videoId",type:"String",defaultValue:"UAxMzrWZOpY"},{_type:"wix:Field",name:"videoType",type:"String",defaultValue:"YOUTUBE"}]},{_iid:"wix:Link",_type:"wix:Type",fields:[{name:"linkType",type:"String"},{name:"href",type:"String"},{name:"label",type:"String"},{name:"target",type:"String"},{name:"icon",type:"String"}]},{_iid:"wix:NumberInRange",_type:"wix:Type",fields:[{name:"value",type:"Number"},{name:"minValue",type:"Number"},{name:"maxValue",type:"Number"}]},{_iid:"wix:RichText",_type:"wix:Type",fields:[{name:"text",type:"String",defaultValue:""},{name:"links",type:"Array<wix:PageLink,wix:DocLink,wix:ExternalLink,wix:MailLink>",defaultValue:[]}]},{_iid:"wix:LinkBase",_type:"wix:Type",fields:[]},{_iid:"wix:PageLink",_type:"wix:Type",baseTypes:["wix:LinkBase"],fields:[{name:"pageId",type:"String"},{name:"linkId",type:"String"}]},{_iid:"wix:DocLink",_type:"wix:Type",baseTypes:["wix:LinkBase"],fields:[{name:"docId",type:"String"},{name:"docName",type:"String"},{name:"linkId",type:"String"}]},{_iid:"wix:ExternalLink",_type:"wix:Type",baseTypes:["wix:LinkBase"],fields:[{name:"address",type:"String"},{name:"target",type:"String"},{name:"protocol",type:"String"},{name:"linkId",type:"String"}]},{_iid:"wix:MailLink",_type:"wix:Type",baseTypes:["wix:LinkBase"],fields:[{name:"email",type:"String"},{name:"subject",type:"String"},{name:"linkId",type:"String"}]},{_iid:"wix:Location",_type:"wix:Type",fields:[{name:"address",type:"String"},{name:"latitude",type:"Number"},{name:"longitude",type:"Number"},{name:"addressInfo",type:"String"}]}]
}W.Classes.newClass({name:"wixapps.integration.managers.ApplicationPageManager",imports:[],traits:[],Class:{Extends:Object,initialize:function(a){this._appPagesCreatedForApp={}
},addApplicationPages:function(f){if(this._isAppPagesCreated(f)){return
}var c=W.Preview.getPreviewManagers().Apps.getApp(f);
if(c.getDescriptorLoaded()){var h=c.getAppDescriptor();
var g=h.pages||[];
for(var e=0;
e<g.length;
e++){var b=g[e];
var d=b.id;
var a=b.name;
this._addApplicationPage(f,a,d)
}this._setAppPagesCreatedForApp(f)
}else{W.Utils.callLater(this.addApplicationPages,[f],this)
}},_addApplicationPage:function(d,b,g){var a=this.APPLICATION_PAGES;
var e=a[g];
if(!e){return
}var c=this.injects().Preview.getPreviewManagers().Viewer.getDocWidth();
var f=e(b,d,c);
W.Commands.executeCommand("WEditorCommands.AddPage",{page:f,dontGoToPageUponCreation:true},this)
},openDestinationPageDialogIfNeeded:function(a,j,e){var b=W.Preview.getPreviewManagers().Apps.getApp(a);
if(b.getDescriptorLoaded()){var d=b.getPartDefinition(j);
var l=d.canAppearInPages;
if(!l||l.length==0){e();
return
}var f=W.Preview.getPreviewManagers().Viewer;
var g=f.getSiteNode().getElement("#"+f.getCurrentPageId());
var h=g.getLogic();
var k=h._data.getSchemaType();
if(k=="AppPage"){var i=h.getDataItem().get("appPageId");
if(l.contains(i)){e();
return
}}var c=W.Commands.getCommand("WAppsEditorCommands.OpenPageSelectionDialog");
c.execute({allowedAppPages:l,okCallback:function(m){f.addEvent("pageTransitionEnded",function(){f.removeEvent("pageTransitionEnded",arguments.callee);
e()
});
f.goToPage(m)
}})
}else{W.Utils.callLater(this.openDestinationPageDialogIfNeeded,[a,j,e],this)
}},_setAppPagesCreatedForApp:function(a){this._appPagesCreatedForApp[a]=true
},_isAppPagesCreated:function(a){return this._appPagesCreatedForApp[a]
},APPLICATION_PAGES:{"ab127320-4a42-49de-88ca-27b636b8cda5":function(a,c,b){return{name:a||"Default Name",serializedPageData:{componentType:"wixapps.integration.components.AppPage",type:"Page",argObject:{},styleId:"p3",skin:"mobile.core.skins.InlineSkin",layout:{x:0,y:0,width:b,height:500,anchors:[]},data:{type:"AppPage",metaData:{isPreset:false,schemaVersion:"1.0",isHidden:false},title:name,hideTitle:true,descriptionSEO:"",metaKeywordsSEO:"",pageTitleSEO:"",pageUriSEO:"blank",hidePage:true,underConstruction:false,appPageId:"ab127320-4a42-49de-88ca-27b636b8cda5",appInnerID:c},dataRefs:{},components:[{componentType:"wixapps.integration.components.AppPart",type:"Component",id:W.Utils.getUniqueId("appPart"),skin:"wysiwyg.viewer.skins.AppPartSkin",layout:{x:0,y:0,width:b,height:300,anchors:[]},data:{type:"AppPart",appInnerID:c,appLogicParams:{},appLogicCustomizations:[],appPartName:"dd70fd3f-ba12-4fc2-8efb-19f041e90d17",viewName:"",metaData:{}}}]}}
}}}});
W.Classes.newClass({name:"wixapps.integration.managers.LifecycleManager",imports:[],traits:[],Class:{Extends:Object,Binds:["_defaultInvalidateLayoutAction"],_dispatcher:null,_pendingComponents:[],_pendingActions:[],initialize:function(a){this._dispatcher=a
},notifyComponentCreated:function(a){if(this._pendingComponents.indexOf(a)==-1){this._pendingComponents.push(a)
}},notifyComponentReady:function(b){var a=this._pendingComponents.indexOf(b);
if(a>-1){this._pendingComponents.splice(a,1)
}this._performCleanup();
if(this._pendingComponents.length==0){this._executeAllPendingActions()
}},performAction:function(a){if(this._pendingActions.indexOf(a)==-1){this._pendingActions.push(a)
}this._performCleanup();
if(this._pendingComponents.length==0){this._executeAllPendingActions()
}},_performCleanup:function(){var c=this._pendingComponents;
this._pendingComponents=[];
for(var b=0;
b<c.length;
b++){var a=c[b];
if(a.getParents("body").length>0&&this._waitsForWixification(a)){this._pendingComponents.push(a)
}}},_waitsForWixification:function(a){return !(a.getLogic&&a.getLogic().isReady()===true)
},_executeAllPendingActions:function(){var a=this._pendingActions;
this._pendingActions=[];
a.each(function(b){b()
})
},_defaultInvalidateLayoutAction:function(){this._dispatcher.fireEvent(Constants.WixAppEvents.APP_VIEW_READY)
},getDefaultInvalidateLayoutAction:function(){return this._defaultInvalidateLayoutAction
}}});
W.Classes.newClass({name:"wixapps.integration.managers.ViewHolder",imports:["wixapps.core.events.ProxyEventBus","wixapps.integration.managers.AppResizeHandler","wixapps.integration.managers.LifecycleManager","wixapps.core.views.ProxyFactory","wixapps.integration.proxies.ProxyMap"],Class:{Binds:[],Extends:Events,_container:null,_rootProxy:null,_data:null,_viewName:"",initialize:function(b,e,d,c,a){this._eventDispatcher=new this.imports.ProxyEventBus();
this._resizeHandler=new this.imports.AppResizeHandler();
this._lifecycleManager=new this.imports.LifecycleManager(this._eventDispatcher);
this._contextPath=c;
this._nameSpace=a;
this._proxyFactory=new this.imports.ProxyFactory(b,e,d,this._eventDispatcher,this._contextPath,this._nameSpace,this._lifecycleManager);
(new this.imports.ProxyMap()).registerComponentProxies(this._proxyFactory)
},setContainer:function(a){if(this._container){this.destroyContent()
}this._container=a
},setupViewHolder:function(a,c,b){this._mode=b||"view";
this._data=a;
this._viewName=c;
if(this._container){this._updateContent()
}},setContentHeight:function(a){this._rootProxy.getElement().setStyle("height",a)
},invalidateSize:function(){this._eventDispatcher.fireEvent(Constants.WixAppEvents.APP_PART_RESIZE)
},_updateContent:function(){this._rootProxy=this._proxyFactory.createView(this._data,this._viewName,this._mode);
var a=this._rootProxy.createComponent();
this.destroyContent();
this._container.adopt(a);
this._resizeHandler.activateResizeHandler(this._eventDispatcher,a);
this._rootProxy.setupProxy();
window.requestAnimFrame(function(){this._lifecycleManager.performAction(function(){this._eventDispatcher.fireEvent(Constants.WixAppEvents.APP_VIEW_READY);
this._eventDispatcher.fireEvent(Constants.WixAppEvents.APP_VIEW_CREATED)
}.bind(this))
}.bind(this))
},getEventDispatcher:function(){return this._eventDispatcher
},destroyContent:function(){this._container.empty()
},dispose:function(){this.destroyContent();
this._container=null;
this._data=null;
this._rootProxy.dispose();
this._rootProxy=null
}}});
W.Classes.newClass({name:"wixapps.integration.managers.WixAppsEditorData",imports:[],traits:[],Class:{Extends:"wixapps.integration.managers.WixAppsEditorDataBase",Binds:[],_setupData:function(){this.addDataPanel("AppPart","wixapps.integration.components.AppPart",{logic:"wixapps.integration.components.editor.AppPartDataPanel",skin:"wysiwyg.editor.skins.panels.base.AutoPanelSkin"});
this.addDataPanel("AppPart2","wixapps.integration.components.AppPart2",{logic:"wixapps.integration.components.panels.appbuilder.ItemListBuilder",skin:"mobile.core.skins.InlineSkin"})
}}});
W.Classes.newClass({name:"wixapps.integration.managers.WixAppsEditorDataBase",imports:[],traits:[],Class:{Binds:["_callWhenReady","_setupData"],initialize:function(){},setup:function(){this._callWhenReady(this._setupData)
},_callWhenReady:function(){if(this._isAllReady()){this._setupData()
}else{window.requestAnimFrame(this._callWhenReady)
}},_isAllReady:function(){return Boolean(W.Resources.bundles.EDITOR_LANGUAGE)
},_setupData:function(){},addLanguageKey:function(a,b){W.Resources.bundles.EDITOR_LANGUAGE[a]=b
},addDataPanel:function(b,c,a){W.Editor.addDataPanel(b,c,a)
}}});
W.Classes.newClass({name:"wixapps.integration.managers.WixAppsManager",imports:["wixapps.integration.managers.ApplicationInstance"],Class:{Binds:[],initialize:function(){W.Apps=this;
this._scriptLoader=new W.ClassManager.ScriptLoader();
this._appInstanceMap={};
this._appDescriptorMap={};
this._descriptionCallBacks={};
if(W.Managers&&W.Managers.list){W.Managers.list.push({target:"Apps"})
}this._loadInstalledApps()
},_loadInstalledApps:function(){var a=W.Viewer.getAppDataHandler().getAppsData();
Object.each(a,function(c,b){if(["wixapps","ecommerce"].indexOf(c.type)!=-1){this.loadApplication(c)
}},this)
},loadApplication:function(b){var a=new this.imports.ApplicationInstance(b);
this._appInstanceMap[b.applicationId]=a;
a.loadDescriptor()
},getApp:function(a){return this._appInstanceMap[a]
},getAppByPackageName:function(a){for(var b in this._appInstanceMap){if(this._appInstanceMap[b].getPackageName()==a){return this._appInstanceMap[b]
}}return null
},requestAppDescriptor:function(b,a){if(this._appDescriptorMap[b]){a(this._appDescriptorMap[b]);
return
}this._scriptLoader.loadMissingClasses([this._buildDescriptorURL(b)]);
this._descriptionCallBacks[b]=this._descriptionCallBacks[b]||[];
this._descriptionCallBacks[b].push(a)
},_buildDescriptorURL:function(a){return"wixapps.apps."+a+".descriptor"
},registerAppDescriptor:function(c){var b=0;
var a=c.packageName;
this._appDescriptorMap[a]=c;
if(this._descriptionCallBacks[a]){for(b=0;
b<this._descriptionCallBacks[a].length;
b++){this._descriptionCallBacks[a][b](c)
}delete this._descriptionCallBacks[a]
}},openPermaLink:function(a){var c=a.get("dataItemRef");
var b=W.Data.getDataByQuery(c);
var d=this._appInstanceMap[b.get("appInnerID")];
d.getZoomHandler().openZoomFromHash(a)
},setPageState:function(a,b){if(!this._stateByPage){this._stateByPage={}
}this._stateByPage[a]=b
},getPageState:function(a){var b=this._stateByPage&&this._stateByPage[a];
return b||""
}}});
W.Classes.newClass({name:"wixapps.integration.managers.WixAppsManager2",imports:["wixapps.core.apprepo.ApplicationInstance2","wixapps.core.apprepo.AppRepoTransport"],Class:{Binds:[],Static:{APPLICATION_TYPE:"appbuilder"},_appInstanceMap:{},_appInstWaitingList:[],_appRepoTransport:null,initialize:function(){if(W.Managers&&W.Managers.list){W.Managers.list.push({target:"Apps2"})
}this._appRepoTransport=new this.imports.AppRepoTransport();
this._loadInstalledApps()
},registerNewApplication:function(a){var b=this.getNextGeneratedApplicationId();
this._registerAppInstance(b,a);
a.setSavedInRepo(false);
W.Viewer.getAppDataHandler().registerAppData({applicationId:b,instanceId:null,type:this.APPLICATION_TYPE});
return b
},_registerAppInstance:function(b,a){this._appInstanceMap[b]=a
},_loadInstalledApps:function(){var a=W.Viewer.getAppDataHandler().getAppsData();
Object.each(a,function(d,b){if([this.APPLICATION_TYPE].indexOf(d.type)!=-1){var e=d.applicationId;
var c=d.instanceId;
this._loadApplicationFromRepo(e,c)
}},this)
},_loadApplicationFromRepo:function(d,c){var b=function(e){var f=new this.imports.ApplicationInstance2(e);
f.setSavedInRepo(true);
f.setInstanceId(c);
this._registerAppInstance(d,f);
if(this._appInstWaitingList.hasOwnProperty(d)){this._appInstWaitingList[d](f)
}}.bind(this);
var a=function(){throw"Error! unable to load appdef"
}.bind(this);
if(W.Viewer.isPublicMode()){this._appRepoTransport.getPublishedInstance(c,b,a)
}else{this._appRepoTransport.getSavedInstance(c,b,a)
}},getApplicationInstance:function(b,a){if(this._appInstanceMap.hasOwnProperty(b)){a(this._appInstanceMap[b])
}else{this._appInstWaitingList[b]=a
}},getApplicationInstances:function(){return this._appInstanceMap
},getNextGeneratedApplicationId:function(){var a=W.Viewer.getAppDataHandler();
return a.getLargestApplicationId()+1
}}});
W.Classes.newClass({name:"wixapps.integration.managers.applicationhandlers.ZoomHandler",imports:[],Class:{Binds:["validateZoomRelatedData"],Extends:Events,initialize:function(a){this._applicationInstance=a
},validateZoomRelatedData:function(){var c=this._applicationInstance.getDescriptorValue(["parts"]).filter(function(d){return !!d.zoomParams
});
var a=this._getZoomPartNameToPermaLinkMap();
var b=this;
c.forEach(function(e){var d=a[e.id];
if(!d){d=b._addPermaLinkItem(e);
a[e.id]=d
}})
},getZoomPartData:function(a){var b=this._getZoomPartNameToPermaLinkMap()[a];
return b&&b.partData
},_getZoomPartNameToPermaLinkMap:function(){if(!this._zoomAppPartsToDataItemsMap){var c=W.Data.getDataItemsByType("PermaLink");
var d=Object.values(c);
this._zoomAppPartsToDataItemsMap={};
for(var a=0;
a<d.length;
a++){var b=W.Data.getDataByQuery(d[a].get("dataItemRef"));
if(b.get("appInnerID")==this._applicationInstance.getIdInMetasite()){this._zoomAppPartsToDataItemsMap[b.get("appPartName")]={permaLinkData:d[a],partData:b}
}}}return this._zoomAppPartsToDataItemsMap
},_addPermaLinkItem:function(c){var b=W.Data.addDataItemWithUniqueId("appPart",{type:"AppPart",appInnerID:this._applicationInstance.getIdInMetasite(),appLogicParams:{},appLogicCustomizations:[],appPartName:c.id,viewName:c.views[0]});
var a=W.Data.addDataItemWithUniqueId("zoom",{type:"PermaLink",appType:"ListsApps",dataItemRef:"#"+b.id}).dataObject;
return{permaLinkData:a,partData:b.dataObject}
},openZoomFromHash:function(a){W.Commands.executeCommand("WViewerCommands.OpenZoom",{item:this._getItemFromHash(),getDisplayerDivFunction:this._getAppPartDivFunction(a),getHashPartsFunction:this._getHashPartsFunction(a)},this)
},openZoomForItemsList:function(f,d,c,e){var b=this._getZoomPartNameToPermaLinkMap()[c].permaLinkData;
var a=W.Data.createDataItem({type:"list",items:f},"list");
W.Commands.executeCommand("WViewerCommands.OpenZoom",{itemsList:a,currentIndex:d,extraParams:e||{},getDisplayerDivFunction:this._getAppPartDivFunction(b),getHashPartsFunction:this._getHashPartsFunction(b)},this)
},_getAppPartDivFunction:function(a){return function(b,c,d){this._createZoomContent(a,b,c,d)
}.bind(this)
},_createZoomContent:function(j,i,d,g){var a=("container" in d?"zoomLayout":"legacy");
var f=W.Data.getDataByQuery(j.get("dataItemRef"));
var b=this._applicationInstance.getPartDefinition(f.get("appPartName"));
var h=this._getItemAppPartData(i,j,f,b);
var c;
c=new Element("div");
if(a=="zoomLayout"){d.container.adopt(c)
}var e=this;
W.Components.createComponent("wixapps.integration.components.AppPart","wysiwyg.viewer.skins.area.CleanZoomAreaSkin",h,null,null,function(k){e.fireEvent("zoomContentChanged",k);
if(a=="legacy"){e._setComponentSize(b,k,d.x,g)
}else{k.addEvent("proxyDisplayed",function(l){if(l.className.contains("wixapps.integration.proxies.layout.ZoomLayoutProxy")){l.addEvent(Constants.WixAppEvents.APP_ZOOM_READY,function(){if(k.getViewNode().getParents("body").length){k.setWidth(k.getSkinPart("inlineContent").children[0].getSize().x);
window.requestAnimFrame(function(){g(k.getViewNode())
})
}l.removeEvent(Constants.WixAppEvents.APP_ZOOM_READY,arguments.callee)
});
l.renderZoomLayout(d.x,d.y)
}else{e._setComponentSize(b,k,d.x,g)
}})
}},null,c)
},_getItemAppPartData:function(e,b,f,g){var c=W.Data.createDataItem({type:f.getType()},f.getType());
c.copySchemaFieldsFrom(f,true);
var a=c.get("appLogicParams");
var d=g.zoomParams.itemIdParamName?g.zoomParams.itemIdParamName:"itemId";
a[d]={type:"AppPartParam",value:e.id};
return c
},_setComponentSize:function(e,d,b,c){var a=e.defaultWidth?Math.min(e.defaultWidth,b):b;
d.setWidth(a);
if(e.defaultHeight){d.setHeight(e.defaultHeight)
}window.requestAnimFrame(function(){d.getMainProxy().updateLayoutWhenReady(function(){d.getEventDispatcher().fireEvent(Constants.WixAppEvents.APP_VIEW_READY);
c(d.getViewNode())
}.bind(this))
}.bind(this))
},_getHashPartsFunction:function(a){var c=W.Data.getDataByQuery(a.get("dataItemRef"));
var b=this._applicationInstance.getPartDefinition(c.get("appPartName")).zoomParams;
return function(d,e){e({id:a.get("id"),title:b.urlTitle?b.urlTitle:"",extData:this._getHashExtraDataString(d.id,d.title)})
}.bind(this)
},_getHashExtraDataString:function(b,a){return b+"/"+encodeURIComponent(a)
},_getItemFromHash:function(){var a=W.Utils.hash.getHashParts().extData;
var b=a.split("/");
return{id:b[0],title:b[1]}
}}});
W.Classes.newClass({name:"wixapps.integration.managers.mvp.GUIFactory",imports:["wixapps.integration.managers.mvp.MvpEventBinding"],Class:{Binds:[],Extends:Object,_rootProxy:null,_data:null,initialize:function(a){this._dataItemFactory=a
},createGUI:function(c,a,f){a.forType="MVP_Model";
a.name="MVP_View";
var e=this._dataItemFactory.createDataItem(c);
var h=this._dataItemFactory.createDataItem(a);
var g=this._deriveTypeFromModel("MVP_Model",c);
var b=this._deriveViewRepo("MVP_View",h);
var d=new this.imports.ViewHolder(this._dataItemFactory,g,b);
if(typeOf(f)=="string"){W.Classes.get(f,function(i){this._setupEventBinding(d.getEventDispatcher(),new i())
}.bind(this))
}else{(new this.imports.MvpEventBinding(d.getEventDispatcher(),f))
}d.setupViewHolder(e,"MVP_View");
return d
}}});
W.Classes.newClass({name:"wixapps.integration.managers.mvp.MvpEventBinding",imports:[],traits:[],Class:{Extends:Object,Binds:["_onInternalEvent"],_presenter:null,_eventDispatcher:null,initialize:function(a,b){this._eventDispatcher=a;
this._presenter=b
},_onInternalEvent:function(c){var b=c.type;
var a=b.split(".");
if(a.length>1&&a[0]=="presenter"){this._presenter[a[1]].call(this._presenter,[c])
}},dispose:function(){this._eventDispatcher=null;
this._presenter=null
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.AppLinkProxy",imports:[],traits:[],Class:{Extends:"wixapps.integration.proxies.layout.BoxLayoutProxy",Binds:["_onClicked"],createComponent:function(){var a=this.parent();
a.setStyle("display","block");
a.addEvent("click",this._onClicked);
return a
},_getContainerElementType:function(){return"a"
},_dispose:function(){if(this._element){this._element.removeEvent("click",this._onClicked)
}},_onClicked:function(){this.fireEvent("wix:app-link:navigate",{dataItem:this._data,appPageId:this._def.getChildValue("pageId")})
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.AreaProxy",traits:["wixapps.integration.components.traits.ResizableProxyTrait"],imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){return this._createWixComponent("mobile.core.components.Container",undefined,undefined)
},_stylesMap:{"default":{skin:"wysiwyg.viewer.skins.area.DefaultAreaSkin",style:"c1"},ecomWrap:{skin:"wysiwyg.viewer.skins.area.WrapperSkin",style:"ecom_c1"}},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.area.DefaultAreaSkin"
},_getDefaultStyleName:function(){return"c1"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ButtonProxy",traits:["wixapps.integration.components.traits.ResizableProxyTrait"],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_handleSizeChange"],createComponent:function(){var a=this._createWixComponent("wysiwyg.viewer.components.SiteButton",this._createRawData(),undefined);
if(!this._innerElement.hasAttribute("height")){this._innerElement.setAttribute("height","30")
}return a
},_createRawData:function(){var a=this._data.getValue();
return{type:"SiteButton",label:this._getLabel(a),href:this._getChildValue("href","",a),target:this._getChildValue("target","_self",a),linkType:this._getChildValue("linkType","FREE_LINK",a),icon:this._getChildValue("icon","",a)}
},_getLabel:function(a){var b=null;
b=this._def.getChildValue("label");
b=b||(this._data.getTypeName()=="String"&&a);
b=b||a.label;
b=b||"Submit";
return b
},_getChildValue:function(b,a,c){return this._def.getChildValue(b)||(c[b]?c[b]:a)
},_onDataChanged:function(a){this._refresh();
this.parent(a)
},_refresh:function(){if(!this._componentLogic){return
}this._setNewData()
},_setNewData:function(){var a=this._componentLogic.getDataItem();
a.setData(this._createRawData());
a.setMeta("isPersistent",false)
},_getPropSchemaName:function(){return"ButtonProperties"
},_setupPropertyHandlers:function(){this._mapToCompProperty("align");
this._mapToCompProperty("margin","margin",function(a){return parseInt(a)
});
this._handleProperties(["label"],function(){this._refresh()
})
},_stylesMap:{"default":{skin:"wysiwyg.viewer.skins.button.BasicButton",style:"b3"},ecomViewCart:{skin:"wysiwyg.viewer.skins.button.BasicButton",style:"ecom_vc1"},ecomCheckout:{skin:"wysiwyg.viewer.skins.button.DisabledLayerButton",style:"ecom_co1"},ecomAddToCart:{skin:"wysiwyg.viewer.skins.button.BasicButton",style:"ecom_atc1"},ecomRemoveFromCart:{skin:"wysiwyg.viewer.skins.button.FixedFontButton",style:"ecom_rfc1"},ecomApplyCoupon:{skin:"wysiwyg.viewer.skins.button.ApplyButtonEcom",style:"ecom_apl1"},ecomAddProduct:{skin:"wysiwyg.viewer.skins.button.AddProductButton",style:"ecom_ap1"}},_getDefaultSkinName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].skin
},_getDefaultStyleName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].style
},_setNaturalSize:function(){if(this._isCompBasedWidth()){var a=this._getNaturalWidth();
this._element.setStyle("width",a);
this._innerElement.setStyle("width",a)
}if(this._isCompBasedHeight()){var b=this._getNaturalHeight();
this._element.setStyle("height",b);
this._innerElement.setStyle("height",b)
}},_getNaturalWidth:function(){return this._componentLogic.getSizeLimits().minW
},_getNaturalHeight:function(){return this._componentLogic.getSizeLimits().minH
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.CheckBoxProxy",traits:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged","_onValidation"],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation)
},createComponent:function(){var a=this._createWixComponent("wysiwyg.viewer.components.inputs.CheckBoxInput",this._createRawData(),{label:this._def.getChildValue("label")});
return a
},_createRawData:function(){return{type:"Boolean",value:this._data.getValue()}
},_onDataChanged:function(a){this._refresh();
this.parent(a)
},_refresh:function(){if(!this._componentLogic){return
}this._setNewData()
},_setNewData:function(){var a=this._componentLogic.getDataItem();
a.setData(this._createRawData());
a.setMeta("isPersistent",false)
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.input.CheckBoxInputSkin"
},_onComponentDataChanged:function(a,c,b){this._data.setValue(!!a.get("value"))
},_onValidation:function(a){if(!this._componentLogic||!a){return
}if(a.valid){this._componentLogic.setValidationState(true)
}else{var b=a.validationMessage||this._def.getValue().validationMessage;
this._componentLogic.setError(b)
}this._componentLogic.setValidationState(a.valid)
},_getAcceptableDataTypes:function(){return["Boolean"]
},_getDefaultStyleName:function(){return null
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.CheckBoxViewProxy",traits:[],Class:{Extends:"wixapps.integration.proxies.CheckBoxProxy",Binds:["_onComponentDataChanged","_onValidation"],_onComponentWixified:function(){this._componentLogic.setDisabled()
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.CheckBoxGroupProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged","_onValidation"],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation)
},createComponent:function(){var b=Number.random(0,99999).toString(36);
var a="x_group_"+b;
return this._createWixComponent("wixapps.integration.components.inputs.CheckBoxGroupInput",this._createRawData(),{checkboxGroupName:a})
},_createRawData:function(){var c=this._data.getChildByRef("items").getValue();
var b=c.map(this._getOptionWDataItem);
var a=this._data.getChildByRef("selectedValues").getValue();
var d=[];
a.each(function(f){var e=b.filter(function(g){return g.get("value")==f
});
if(e.length>0){d.push(e[0])
}});
return{type:"MultiSelectableList",items:b,selected:d}
},_getOptionWDataItem:function(b){var c={type:"SelectOption",value:b.value,text:b.text,enabled:b.enabled,description:b.description};
var a=W.Data.createDataItem(c);
a.setMeta("isPersistent",false);
return a
},_onComponentDataChanged:function(c,f,e){if(f=="selected"){if(c){var b=c.get("selected");
var a=[];
for(var d=0;
d<b.length;
d++){var g=b[d].get("value");
a.push(g)
}this._data.getChildByRef("selectedValues").setValue(a)
}}},_onDataChanged:function(a){var b=a.target.getParent().getChildRef(a.target);
if(b==="selectedValues"){return
}this._refreshComponentData()
},_refreshComponentData:function(){if(!this._componentLogic){return
}var b=this._createRawData();
var a=this._componentLogic.getDataItem();
a.setData(b);
a.setMeta("isPersistent",false)
},_onValidation:function(a){if(!this._componentLogic||!a){return
}if(a.valid==false){var b=a.validationMessage||this._def.getValue().validationMessage;
this._componentLogic.setError(b)
}this._componentLogic.setValidationState(a.valid)
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.input.CheckBoxGroupInputSkin"
},_getDefaultStyleName:function(){return"wa_cbg1"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ClippedParagraphProxy",imports:[],traits:["wixapps.integration.components.traits.ResizableProxyTrait"],Class:{Extends:"wixapps.integration.proxies.LabelProxy",_getCompName:function(){return"wixapps.integration.components.ClippedParagraph"
},_getPropSchemaName:function(){return"ClippedParagraphProperties"
},_isLayoutBasedHeight:function(){if(this._def.getChildValue("maxLines")){return false
}else{return this.parent()
}},_setupPropertyHandlers:function(){this.parent();
this._handleProperties(["maxLines","minLines","pack"],function(){this._componentLogic.getDataItem().set("text",this._createFormattedText())
});
this._mapToCompProperties(["maxLines","minLines","pack","showTooltip"])
},_onAppPartResize:function(){if(!this._disposed){this._componentLogic.render()
}}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ComboBoxProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onValidation","_onComponentDataChanged"],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation)
},createComponent:function(){return this._createWixComponent("wysiwyg.viewer.components.inputs.ComboBoxInput",this._createRawData())
},_createRawData:function(){var b=this._data.getChildByRef("items").getValue();
var a=b.map(this._getOptionWDataItem);
return{type:"SelectableList",items:a,selected:null}
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["hasPrompt","promptText"])
},_getOptionWDataItem:function(b){var c={type:"SelectOption",value:b.value,text:b.text,enabled:b.enabled,description:b.description};
var a=W.Data.createDataItem(c);
a.setMeta("isPersistent",false);
return a
},_getPropSchemaName:function(){return"ComboBoxInputProperties"
},_stylesMap:{"default":{skin:"wysiwyg.viewer.skins.input.ComboBoxInputSkinNoValidation",style:"wa_cb1"},ecomComboBox:{skin:"wixapps.integration.skins.ecommerce.inputs.ComboBoxInputSkin",style:""}},_getDefaultSkinName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].skin
},_getDefaultStyleName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].style
},_onDataChanged:function(a){if(this._componentLogic&&!this._ignoreUpdate){var g=null;
var f=this.getData().getChildValue("selectedValue");
var b=this._componentLogic.getDataItem().get("items");
var d=this.getData().getChildValue("items");
for(var e=0;
e<b.length;
e++){var h=b[e].get("value");
if(h==f){g=b[e]
}var c=d[e].enabled;
b[e].set("enabled",c)
}this._componentLogic.getDataItem().set("selected",g);
if(!g){this._refreshComponentData()
}}},_onComponentDataChanged:function(a,c,b){if(c=="selected"&&b.selected){this._ignoreUpdate=true;
this.getData().getChildByRef("selectedValue").setValue(b.selected.get("value"));
this._ignoreUpdate=false
}},_refreshComponentData:function(){if(!this._componentLogic){return
}var b=this._createRawData();
var a=this._componentLogic.getDataItem();
a.setData(b);
a.setMeta("isPersistent",false)
},_onValidation:function(a){if(!this._componentLogic||!a){return
}if(a.valid==false){var b=a.validationMessage||this._def.getValue().validationMessage;
this._componentLogic.setError(b)
}this._componentLogic.setValidationState(a.valid)
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ContainerProxy",imports:[],traits:["wixapps.integration.components.traits.ResizableProxyTrait"],Class:{Extends:"wixapps.integration.proxies.WCompositeProxy",Binds:["_handleSizeChange","_handleSizeChange"],_inlineDiv:null,createComponent:function(){var a=this._createWixComponent("mobile.core.components.Container",undefined,{allowDragChildren:false});
this._createChildProxies();
this._createChildComponents(this._innerElement);
return a
},_onComponentWixified:function(){this._doStuff()
},_onSkinChange:function(a){this._doStuff()
},_doStuff:function(){this._autoStretchContent();
this.updateLayoutWhenReady(function(){this._handleSizeChange();
if(!this._resizeMechanismActivated){this._activateResizeMechanism()
}setTimeout(function(){this._updateComponentDimension("x")
}.bind(this),2000)
}.bind(this))
},_onLayoutChange:function(){this._autoStretchContent();
var a={};
if(this._isLayoutBasedWidth()){this._updateComponentDimension("x",a)
}if(this._isLayoutBasedHeight()){this._updateComponentDimension("y",a)
}window.requestAnimFrame(this._handleSizeChange);
W.Utils.forceBrowserRepaint(this._innerElement,150,["safari","chrome"]);
W.Utils.forceBrowserRepaint(this._componentLogic.getSkinPart("bg"),150,["safari","chrome"])
},_autoStretchContent:function(){if(this._def.getChildValue("heightMode")=="stretch"){return
}if(!this._inlineDiv||!this._inlineDiv.getParent()){this._inlineDiv=this._componentLogic.getSkinPart("inlineContent");
this._inlineDiv.setStyles({height:this._def.getChildValue("packHeight")=="false"||this._def.getChildValue("packHeight")===false?"100%":"auto",position:"static"})
}},_getComponentHeight:function(){return this._componentLogic.getSkinPart("inlineContent").getSize().y
},_stylesMap:{"default":{skin:"wysiwyg.viewer.skins.area.AppleArea",style:"c1"},ecomCouponBox:{skin:"wysiwyg.viewer.skins.apps.DefaultBoxSkin",style:"ecom_cbx1"},ecomCartHeader:{skin:"wysiwyg.viewer.skins.apps.DefaultBoxSkin",style:"ecom_ch1"}},_getDefaultSkinName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].skin
},_getDefaultStyleName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].style
}}});
(function(){var a=function(){var b=/d{1,5}|m{1,5}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,c=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,e=/[^-+\dA-Z]/g,d=function(g,f){g=String(g);
f=f||2;
while(g.length<f){g="0"+g
}return g
};
return function(j,w,r){var h=a;
if(arguments.length==1&&Object.prototype.toString.call(j)=="[object String]"&&!/\d/.test(j)){w=j;
j=undefined
}j=j?new Date(j):new Date();
if(isNaN(j)){throw"invalid date"
}w=String(h.masks[w]||w||h.masks["default"]);
if(w.slice(0,4)=="UTC:"){w=w.slice(4);
r=true
}var u=r?"getUTC":"get",n=j[u+"Date"](),f=j[u+"Day"](),k=j[u+"Month"](),q=j[u+"FullYear"](),t=j[u+"Hours"](),l=j[u+"Minutes"](),v=j[u+"Seconds"](),p=j[u+"Milliseconds"](),g=r?0:j.getTimezoneOffset(),i={d:n,dd:d(n),ddd:h.i18n.dayNames[f],dddd:h.i18n.dayNames[f+7],ddddd:h.i18n.dayNames[f].toUpperCase(),m:k+1,mm:d(k+1),mmm:h.i18n.monthNames[k],mmmm:h.i18n.monthNames[k+12],mmmmm:h.i18n.monthNames[k].toUpperCase(),yy:String(q).slice(2),yyyy:q,h:t%12||12,hh:d(t%12||12),H:t,HH:d(t),M:l,MM:d(l),s:v,ss:d(v),l:d(p,3),L:d(p>99?Math.round(p/10):p),t:t<12?"a":"p",tt:t<12?"am":"pm",T:t<12?"A":"P",TT:t<12?"AM":"PM",Z:r?"UTC":(String(j).match(c)||[""]).pop().replace(e,""),o:(g>0?"-":"+")+d(Math.floor(Math.abs(g)/60)*100+Math.abs(g)%60,4),S:["th","st","nd","rd"][n%10>3?0:(n%100-n%10!=10)*n%10]};
return w.replace(b,function(m){return m in i?i[m]:m.slice(1,m.length-1)
})
}
}();
a.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};
a.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};
W.Classes.newClass({name:"wixapps.integration.proxies.DateProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.LabelProxy",_getInnerText:function(){var g="";
var e=this._def.getChildValue("prefix");
var h=this._def.getChildValue("postfix");
if(e){g+=e
}var f=this._def.getChildValue("format")||"default";
var d=this._data.getValue();
var c=d.iso||d;
var b=new Date(c);
if(b.getTime()>0){g+=a(b,f)
}if(h){g+=h
}return g
},_setupPropertyHandlers:function(){this._handleProperties(["format"],function(){this._componentLogic.getDataItem().set("text",this._createFormattedText())
});
this.parent()
},getProxyMetaTags:function(){return["text"]
},_getAcceptableDataTypes:function(){return["wix:Date","String"]
}}})
})();
W.Classes.newClass({name:"wixapps.integration.proxies.DateSelectorProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged","_onValidation"],createComponent:function(){this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation);
var b="wixapps.integration.components.inputs.DateInput";
this.useSkinsInsteadOfStyles();
var a=this._getIsoDate();
return this._createWixComponent(b,{type:"Text",text:a})
},_getPropSchemaName:function(){return"DateInputProperties"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["allowEmpty"])
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.appinputs.DateInputSkin"
},_getIsoDate:function(){var b=this._data.getValue();
var a=new Date(b.iso);
if(!this._allowEmpty()&&(isNaN(a.getTime())||a.getDate()==new Date(0).getDate())){b.iso=new Date().toISOString();
this._data.setValue(b)
}return b.iso
},_onDataChanged:function(a){if(!this._userInputChange&&this._element&&this._element.getLogic()){this._element.getLogic().getDataItem().set("text",this._getIsoDate())
}},_onComponentDataChanged:function(a){var b=this._element.getLogic().getDataItem().get("text");
this._userInputChange=true;
this._data.setValue({_type:"wix:Date",iso:b});
this._userInputChange=false
},_onValidation:function(a){if(!this._componentLogic){return
}if(a.valid){this._componentLogic.resetInvalidState()
}else{var b=a.validationMessage||this._def.getValue().validationMessage;
this._componentLogic.showValidationMessage(b)
}},_allowEmpty:function(){return !(this._def.getChildValue("allowEmpty")===false||this._def.getChildValue("allowEmpty")==="false")
},_getAcceptableDataTypes:function(){return["wix:Date"]
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.DeckProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.ListProxy",Binds:["_onSelectionChange"],getRepeaterClass:function(){return"wysiwyg.viewer.components.VerticalRepeater"
},createComponent:function(){var a=this.parent();
this._childrenLeftToBeReady=this._getInitialSelection()>=0?1:0;
return a
},setComponentStyles:function(a){var b={};
b.display=this._processCssProp("box");
b[this._processCssProp("box-orient")]="vertical";
a.setStyles(b);
return a
},_getInitialSelection:function(){var a=this.getViewDefinition().getChildValue("initialSelection");
return(a!==undefined&&a>=0)?a:-1
},_onComponentWixified:function(){var b=this.getViewDefinition().getChildValue("selectionChangeScope");
var a=this.getViewDefinition().getChildValue("selectionChangeEvent");
this.addEventFilteredByScope(b,a,this._onSelectionChange);
var c=this._getInitialSelection();
if(c>=0){this._selectIndex(c)
}},_onSelectionChange:function(c){var f=c.data;
var e=this._data.getChildren();
var b=0;
for(var d=0,a=e.length;
d<a;
d++){var g=e[d];
if(g==f){b=d;
break
}}this._selectIndex(b)
},_selectIndex:function(a){if(a>=0){if(this._selectedIndex!=undefined){this.getElement().children[this._selectedIndex].collapse()
}this._selectedIndex=a;
this.getElement().children[a].uncollapse()
}this.updateLayoutWhenReady()
},onChildCreate:function(a,b){a.collapse();
return a
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.EmptyProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){return this._createElement("div")
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ExpanderProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){var b=this._viewContext.getEnvironment().getProxyFactory();
var i=this._def.getChildByRef("items");
var d=this.getViewDefinition().getChildValue("initialState");
var c=this.getViewDefinition().getChildValue("noIcon");
if(i.getChildren().length!=2){throw"Expander must have two children, for summary and content."
}var j=i.getChildByIndex(0);
var a=b.createProxyFromItemDefinition(this._viewContext,j).proxy;
var e=i.getChildByIndex(1);
var h=b.createProxyFromItemDefinition(this._viewContext,e).proxy;
this._childrenLeftToBeReady=2;
var g=function(k){k.grab(a.createComponent());
a.setupProxy(this._onChildReady)
}.bind(this);
var f=function(k){k.grab(h.createComponent());
h.setupProxy(this._onChildReady)
}.bind(this);
return this._createWixComponent("wixapps.integration.components.Expander",undefined,{createSummaryFunc:g,createContentFunc:f,initialState:d,noIcon:c})
},_getDefaultSkinName:function(){return"wixapps.integration.skins.ExpanderSkin"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.FlowListProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.ListProxy",getRepeaterClass:function(){return"wixapps.integration.components.HorizontalRepeater"
},setComponentStyles:function(a){return a
},onChildCreate:function(a,b){var d={};
d.display="inline-block";
var c=this.getViewDefinition().getChildValue("margin");
if(b<this._data.getChildren().length-1){d["margin-right"]=c+"px"
}a.setStyles(d);
return a
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.FormattedPriceProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.LabelProxy",_currencySymbols:{GBP:"\u00A3",USD:"$",NIS:"\u20AA"},_getInnerText:function(){var a=this._data.getValue();
return this._currencySymbols[a.currency]+a.amount.toFixed(2)
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.GalleryProxy",imports:["wysiwyg.viewer.utils.GalleryUtils"],traits:["wixapps.integration.components.traits.ResizableProxyTrait"],Class:{Extends:"wixapps.integration.proxies.ListProxy",Binds:["_sequencingHook","_sequencingRolloverHook"],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._galleryUtils=new this.imports.GalleryUtils();
if(this._rolloverTemplate){this._repeaterArgs.rolloverHook=this._sequencingRolloverHook
}this._repeaterArgs.fixedRowNumber=true
},getRepeaterClass:function(){return"wixapps.integration.components.PaginatedGridGallery"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["transition","autoplayInterval","transDuration"]);
this._mapToCompProperty("columns","numCols");
this._mapToCompProperty("rows","maxRows");
this._mapToCompProperty("gap","margin");
this._mapToCompProperty("autoplay","autoplay",function(a){return(a===true)||(a=="true")
});
this._mapToCompProperty("expandEnabled","expandEnabled",function(a){return(a===true)||(a=="true")
})
},_getPropSchemaName:function(){return"PaginatedGridGalleryProperties"
},_sequencingHook:function(a,d,c){var b=this._createGalleryDisplayer(a,d,c,this._itemTemplate);
var e=new Element("div",{"class":"displayerBackground"});
e.inject(b,"top");
return b
},_sequencingRolloverHook:function(a,c,b){return this._createGalleryDisplayer(a,c,b,this._rolloverTemplate)
},_createGalleryDisplayer:function(b,a,h,i){var f=this._viewContext.getEnvironment().getProxyFactory();
var d=this._viewContext.newContextForData(b);
this._addPositionInParentVars(d,a,h.length);
var g=f.createProxyFromItemDefinition(d,i).proxy;
var e=g.createComponent();
e.setStyles({overflow:"hidden",width:"1px",height:"1px"});
if(Browser.firefox){var c=new Element("div");
c.getViewProxy=function(){return g
};
c.adopt(e);
e.setStyles({width:"100%",height:"100%"});
e=c
}this._galleryUtils.createMinimalGalleryDisplayer(e,b);
return e
},_stylesMap:{"default":{skin:"wysiwyg.viewer.skins.paginatedgrid.PaginatedGridDefaultSkin",style:"pagg1"},productGallery:{skin:"wysiwyg.viewer.skins.paginatedgrid.PaginatedGridSimple",style:"pgg_cg0"},contentGallery:{skin:"wysiwyg.viewer.skins.paginatedgrid.PaginatedGridNoDetail",style:"pgg_cg1"},minipostGallery:{skin:"wysiwyg.viewer.skins.paginatedgrid.PaginatedGridNoDetail",style:"pgg_cg2"}},_getDefaultSkinName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].skin
},_getDefaultStyleName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].style
},_loadTemplates:function(){var a=this._viewContext.getEnvironment();
this._itemTemplate=this._getItemTemplate("item")||a.getDataItemFactory().createDataItem({id:this.getFieldId()+"_template_item",comp:{}},this._def);
this._rolloverTemplate=this._getItemTemplate("rollover")
},_onStylePropertiesChange:function(a){if(Object.values(a).contains(Constants.SkinParamTypes.SIZE)){this.updateLayoutWhenReady()
}},_onComponentWixified:function(){this.parent();
this._activateResizeMechanism();
this._onLayoutChange()
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.GoogleMapProxy",traits:["wixapps.integration.components.traits.ResizableProxyTrait"],imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:[],createComponent:function(){var c="wysiwyg.viewer.components.GoogleMap",a=this._data.getValue(),b={type:"GeoMap",address:a.address,latitude:a.latitude,longitude:a.longitude,addressInfo:a.addressInfo};
return this._createWixComponent(c,b)
},_getPropSchemaName:function(){return"GoogleMapProperties"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["showZoom","showPosition","showStreetView","showMapType","mapDragging","mapType"])
},_getDefaultStyleName:function(){return"gm1"
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.GoogleMapSkin"
},_onDataChanged:function(a){if(this._componentLogic){var c=this._data.getValue();
var b=this._componentLogic.getDataItem();
b.set("address",c.address,true);
b.set("latitude",c.latitude,true);
b.set("longitude",c.longitude,true);
b.set("addressInfo",c.addressInfo,true);
b.fireDataChangeEvent()
}},_getAcceptableDataTypes:function(){return["wix:Location"]
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.GooglePlusOneProxy",Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){var a=this._createWixComponent("wysiwyg.viewer.components.WGooglePlusOne",this._createRawData());
return a
},_createRawData:function(){var a=this._data.getValue();
return{size:{type:"string","enum":["small","medium","standard","tall"],"default":"standard",description:"The button size to render"},annotation:{type:"string","enum":["none","bubble","inline"],"default":"inline",description:"The annotation to display next to the button."},width:{type:"string","default":"",description:"If annotation is set to *inline*, the width in pixels to use for the button and its inline annotation. If omitted, a button and its inline annotation use 450px."}}
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.HorizontalLineProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){return this._createWixComponent("wysiwyg.viewer.components.FiveGridLine",undefined,undefined,undefined)
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.FiveGridLineSkin"
},_getDefaultStyleName:function(){return"hl1"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.IconProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){var a=this._createRawData();
return this._createWixComponent("wixapps.integration.components.Icon",a,undefined)
},_getDefaultSkinName:function(){return"wixapps.integration.skins.IconSkin"
},_createRawData:function(){var a=this._data.getValue();
return{type:"Icon",url:this._toAppImageUrl(a.src),width:a.width,height:a.height,title:a.title}
},_onDataChanged:function(){this._updateIcon()
},_updateIcon:function(){if(this._componentLogic){var a=this._getAppsIconRawData();
this._componentLogic.getDataItem().set("url",this._toAppImageUrl(a.src),false);
this._componentLogic.getDataItem().set("width",a.width,false);
this._componentLogic.getDataItem().set("height",a.height,false);
this._componentLogic.getDataItem().set("title",a.title,false);
this._componentLogic.getDataItem().fireDataChangeEvent()
}},_toAppImageUrl:function(a){return this._viewContext.getEnvironment().getProxyFactory().convertContextUrlToAbsolute(a)
},_getAcceptableDataTypes:function(){return["wix:Image"]
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ImageProxy",imports:[],traits:["wixapps.integration.components.traits.ResizableProxyTrait"],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_handleSizeChange"],createComponent:function(){var a=this._createRawData();
return this._createWixComponent("wysiwyg.viewer.components.WPhoto",a)
},_toAppImageUrl:function(a){return this._viewContext.getEnvironment().getProxyFactory().convertContextUrlToAbsolute(a)
},getImageMode:function(){return this._def.getChildValue("imageMode")||"fill"
},_fixedAspectRatioModes:["fitWidth","fitHeight"],hasFixedAspectRatio:function(){var a=this.getImageMode();
return this._fixedAspectRatioModes.contains(a)
},getAspectRatio:function(){var a=this._data.getValue();
return parseFloat(a.width)/parseFloat(a.height)
},_createRawData:function(){var a=this._data.getValue();
return{type:"Image",uri:this._toAppImageUrl(a.src),title:a.title,width:a.width,height:a.height}
},_onDataChanged:function(){if(this._componentLogic){var a=this._data.getValue();
this._componentLogic.getDataItem().set("uri",this._toAppImageUrl(a.src),false);
this._componentLogic.getDataItem().set("title",a.title,false);
this._componentLogic.getDataItem().set("width",a.width,false);
this._componentLogic.getDataItem().set("height",a.height)
}},_getPropSchemaName:function(){return"WPhotoProperties"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperty("imageMode","displayMode",function(a){var b=a||"fill";
if(a=="fitWidth"){b="fitWidthStrict"
}else{if(a=="fitHeight"){b="fitHeightStrict"
}}return b
})
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.photo.NoSkinPhoto"
},_getDefaultStyleName:function(){return"wp1"
},_isLayoutBasedWidth:function(){var a=this.getImageMode();
if(a=="fitToWidth"){return true
}else{if(a=="fitToHeight"){return false
}else{return this.parent()
}}},_isLayoutBasedHeight:function(){var a=this.getImageMode();
if(a=="fitToWidth"){return false
}else{if(a=="fitToHeight"){return true
}else{return this.parent()
}}},_checkMinHeight:function(){},getSourceSize:function(){return{width:this.getData().getChildValue("width"),height:this.getData().getChildValue("height")}
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ImageSelectorProxy",imports:[],traits:[],Class:{Extends:"wixapps.integration.proxies.ImageProxy",Binds:["_openReplaceMedia","_onImgSelect","_onImgReset"],createComponent:function(){var a=this.parent();
this._galleryTypeID=this._def.getChildValue("galleryConfigID")||"photos";
a.addEvent("click",this._openReplaceMedia);
a.setStyle("cursor","pointer");
a.grab(new Element("div"));
return a
},_setupPropertyHandlers:function(){this.parent();
this._handleProperty("defaultImage",function(a){this._refreshResetState()
})
},_refreshResetState:function(){if(this._componentLogic){var b=this._getDefaultImage();
var a=b&&(b.src!=this._data.getChildValue("src"));
this._componentLogic.getViewNode().set("reset",a?"enabled":"disabled")
}},_getDefaultImage:function(){return this._def.getChildValue("defaultImage")
},_openReplaceMedia:function(){W.EditorDialogs.openMediaDialog(this._onImgSelect,false,this._galleryTypeID,false)
},_onImgReset:function(){this._data.setValue(this._getDefaultImage());
this._refreshResetState();
return false
},_onImgSelect:function(a){var b=this._data.getValue();
b.width=parseInt(a.width);
b.height=parseInt(a.height);
b.src=a.uri;
b.title=a.title;
this._data.setValue(b);
this._refreshResetState()
},_getDefaultSkinName:function(){return"wixapps.integration.skins.editor.ImageSelectorSkin"
},_onDataChanged:function(){this.parent();
this._refreshResetState()
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.InlineTextProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.LabelProxy",createComponent:function(){var a=this.parent();
this._addStylesOnElement(a);
return a
},_createRawData:function(){var a=this._data.getValue();
return{type:"RichText",text:a}
},_setupPropertyHandlers:function(){this.parent();
this._handleProperties(["postfix","disableLinks","lineThrough","singleLine","color","noWrap"],function(){this._element.set("class","");
this._element.set("style","");
this._addStylesOnElement(this._element)
})
},_getContainerElement:function(){return this._element
},_getViewElement:function(){return"span"
},_getCompName:function(){return"wixapps.integration.components.InlineText"
},_getDefaultStyleName:function(){},_getDefaultSkinName:function(){return"mobile.core.skins.InlineSkin"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.LabelProxy",imports:[],traits:["wixapps.integration.proxies.traits.AppsLinkTrait"],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onAppPartResize"],_styleString:"",createComponent:function(){this.useSkinsInsteadOfStyles();
var a=this._createRawData();
return this._createWixComponent(this._getCompName(),a)
},_setupPropertyHandlers:function(){this._handleProperties(["postfix","prefix","disableLinks","lineThrough","singleLine","color","bold","noWrap","style","italic"],function(){this._componentLogic.getDataItem().set("text",this._createFormattedText())
})
},_createRawData:function(){return{type:"RichText",text:this._createFormattedText()}
},_createFormattedText:function(){var a=this._getInnerText();
var b=new Element("span");
if(W.Editor||this._def.getChildValue("disableLinks")){a=a.replace(/<a\b[^>]*>(.*?)<\/a>/ig,"$1")
}else{this._updateLinkDataItems()
}b.set("html",a);
this._addStylesOnElement(b);
return b.outerHTML
},_getInnerText:function(){var c="";
var b=this._def.getChildValue("prefix");
var d=this._def.getChildValue("postfix");
if(b){c+=b
}var a;
if(this._data.getTypeName()=="wix:RichText"){a=this._data.getChildByRef("text").getValue()
}else{a=this._data.getValue()
}if(this._isSingleLine()){a=a.replace(/(<p>|<\/p>|<br\/?>)/ig,"")
}c+=a;
if(d){c+=d
}return c
},_addStylesOnElement:function(a){a.addClass(Constants.WixApps.TEXT_STYLES[this._def.getChildValue("style")]||this._getDefaultStyleName());
var b=this._def.getChildValue("lineThrough");
if(b){a.addClass("lineThrough")
}if(this._isSingleLine()){a.addClass("singleLine")
}this._applyColorStyle(a);
this._applyBoldStyle(a);
this._applyItalicStyle(a);
this._applyLineHeightStyle(a);
this._styleString=a.get("class")+" "+a.getStyle("color")
},_applyColorStyle:function(b){var a=this._def.getChildValue("color");
if(a){if(this._isCustomColor(a)){b.setStyle("color",a)
}else{b.addClass(a)
}}return a
},_applyBoldStyle:function(b){var a=this._def.getChildValue("bold")===true||this._def.getChildValue("bold")==="true";
if(a){b.addClass("bold")
}else{b.removeClass("bold")
}return a
},_applyItalicStyle:function(b){var a=this._def.getChildValue("italic")===true||this._def.getChildValue("italic")==="true";
if(a){b.addClass("italic")
}else{b.removeClass("italic")
}return a
},_applyLineHeightStyle:function(a){var b=parseInt(this._def.getChildValue("line-height"),10);
if(!isNaN(b)){a.setStyle("line-height",b+"em")
}else{a.setStyle("line-height",null)
}return b
},_isSingleLine:function(){if(this._def==null){return
}var a=this._def.getChildValue("singleLine");
return a===true||a=="true"
},getStyleString:function(){return this._styleString
},_onComponentWixified:function(){this._viewContext.getEnvironment().getEventsDispatcher().addEvent(Constants.WixAppEvents.APP_PART_RESIZE,this._onAppPartResize);
this._onAppPartResize();
window.setTimeout(this._setTooltip.bind(this),100);
if(Browser.firefox){if(this._isSingleLine()){this._element.setStyle("min-width","100%")
}}var a=this._def.getChildValue("noWrap");
if(a===true||a==="true"){this._element.setStyle("white-space","nowrap")
}},_onDataChanged:function(a){if(this._componentLogic&&!this._componentLogic.getIsDisposed()){this._componentLogic.getDataItem().set("text",this._createFormattedText())
}},_onAppPartResize:function(){if(!this._disposed){this._setTooltip()
}},_setTooltip:function(){var a=this._getContainerElement();
if(!a){return
}if(this._shouldShowTooltip(a)){a.setAttribute("title",this._getInnerText())
}else{a.removeAttribute("title")
}},_getContainerElement:function(){if(this._element&&this._element.children&&this._element.children.length&&this._element.children[0].children&&this._element.children[0].children.length){return this._element.children[0].children[0]
}else{return null
}},_shouldShowTooltip:function(a){return(this._def.getChildValue("showTooltip")==="true"||this._def.getChildValue("showTooltip")===true)&&(a.scrollWidth>a.offsetWidth)
},_isCustomColor:function(a){return a.slice(0,1)=="#"
},_getCompName:function(){return"wysiwyg.viewer.components.WRichText"
},_getDefaultStyleName:function(){return"font_8"
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.WRichTextSkin"
},_getAcceptableDataTypes:function(){return["String","wix:RichText","Number"]
},getProxyMetaTags:function(){return["text"]
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.LinkProxy",imports:[],traits:["wixapps.integration.proxies.traits.AppsLinkTrait"],Class:{Extends:"wixapps.integration.proxies.layout.BoxLayoutProxy",Binds:[],createComponent:function(){var a=this.parent();
this._updateLink();
return a
},_getDefaultOrientation:function(){return"vertical"
},_checkDataValidity:function(){if(!this._viewContext.getEnvironment().getTypesManager().isOf(this._data.getTypeName(),"wix:LinkBase")){throw"Link selector only accepts links of type wix:LinkBase or extending. Received ["+this._data.getTypeName()+"]"
}},_getContainerElementType:function(){return"a"
},_onDataChanged:function(a){this._updateLink()
},_updateLink:function(){this._checkDataValidity();
this._updateAnchorLink(this._element,this._data.getValue())
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.LinkSelectorProxy",imports:[],traits:["wixapps.integration.proxies.traits.AppsLinkTrait"],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onClick","_onLinkDialogClosing"],createComponent:function(){var a=this._createRawData();
return this._createWixComponent("wixapps.integration.components.LinkSelector",a,{descriptionVisible:this._getDescriptorVisibility()})
},_createRawData:function(){return{type:"Text",text:this._getLinkDescription()}
},_getDefaultSkinName:function(){return"wixapps.integration.skins.LinkSelectorSkin"
},_getDescriptorVisibility:function(){var a=this._def.getChildValue("showDescription");
return a===true||a=="true"
},_onDataChanged:function(a){if(this._componentLogic){this._componentLogic.getDataItem().set("text",this._getLinkDescription());
this._componentLogic.setDescriptionVisibility(this._getDescriptorVisibility())
}this.parent(a)
},_onComponentWixified:function(){this._componentLogic.addEvent(Constants.CoreEvents.CLICK,this._onClick)
},_onClick:function(a){var b;
if(this._data.getTypeName()=="wix:LinkBase"){var c=this.generateLinkId(this._viewContext.getEnvironment().getProxyFactory().getNameSpace());
b=this.injects().Preview.getPreviewManagers().Data.addDataItem(c,{type:"TextLink"});
b.setMeta("isPersistent",false)
}else{b=this._createWLink(this._data.getValue(),this.injects().Preview.getPreviewManagers().Data)
}this.injects().Commands.executeCommand("WEditorCommands.OpenLinkDialogCommand",{position:Constants.DialogWindow.POSITIONS.CENTER,previewComponent:this._previewComponent,data:b,state:b.get("linkType")||Constants.LinkState.NO_LINK,closeCallback:function(f,d,e){this._onLinkDialogClosing(b,f,d,e)
}.bind(this)})
},_onLinkDialogClosing:function(b,e,a,d){if(d.result==W.EditorDialogs.DialogButtons.CANCEL){return
}b.copySchemaFieldsFrom(a);
var c=this._createAppsLink(b).getValue();
if(e===Constants.LinkState.NO_LINK||!c._type){c={_type:"wix:LinkBase"}
}this._data.setValue(c)
},_getLinkDescription:function(){var b="Click to add link";
var a=this._data.getValue();
switch(a._type){case"wix:PageLink":b="page:"+this.injects().Preview.getPreviewManagers().Data.getDataByQuery("#"+a.pageId,function(){}).get("title");
break;
case"wix:ExternalLink":b=a.protocol+"://"+a.address;
break;
case"wix:DocLink":b=a.docName;
break;
case"wix:MailLink":b="mailto:"+a.email;
break
}return b
},_getAcceptableDataTypes:function(){return["wix:LinkBase"]
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ListProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WArrayProxy",Binds:["_sequencingHook"],_sequencerCompleted:false,_sequencer:null,_repeaterArgs:{},initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._undisposedChildren=[];
this._repeaterArgs.sequencingHook=this._sequencingHook
},getRepeaterClass:function(){},setComponentStyles:function(a){},onChildCreate:function(a,b){},createComponent:function(){var b=this._createRawData();
var a=this._createWixComponent(this.getRepeaterClass(),b,this._repeaterArgs);
this._childrenLeftToBeReady=this._data.getChildren().length;
this.setComponentStyles(a);
return a
},_sequencingHook:function(c,h,f){var a=this._viewContext.getEnvironment().getProxyFactory();
var g=this._itemTemplate;
if(h==0&&this._firstTemplate){g=this._firstTemplate
}else{if(h==f.length-1&&this._lastTemplate){g=this._lastTemplate
}}var b=this._viewContext.newContextForData(c);
g=a.createNewEvaluationScope(g,b);
this._addPositionInParentVars(b,h,f.length);
var e=a.createProxyFromItemDefinition(b,g).proxy;
var d=e.createComponent();
this._undisposedChildren.push(e);
this.onChildCreate(d,h);
return d
},_updateSequencerListeners:function(){if(this._sequencer===null){this._sequencer=this._componentLogic.getSequencer()
}this._sequencer.addEvent(W.ComponentEvents.COMPONENT_SEQUENCER_PRODUCTION_FINISHED,function(){this.updateLayoutWhenReady()
}.bind(this));
this._sequencer.addEvent(W.ComponentEvents.COMPONENT_SEQUENCER_COMP_SETUP,function(b){if(b.method=="create"){var a=b.compView.getViewProxy();
a.setupProxy()
}}.bind(this))
},_createRawData:function(){var a=this._data.getChildren();
return{type:"ImageList",items:a}
},_onDataChanged:function(a){if(a.phase==Constants.DataItemEventPhase.ON_TARGET){while(this._undisposedChildren.length>0){var b=this._undisposedChildren.pop();
b.dispose()
}this._dataItem.set("items",[]);
this._dataItem.set("items",this._data.getChildren())
}},_loadTemplates:function(){var a=this._viewContext.getEnvironment();
this._itemTemplate=this._getItemTemplate("item")||a.getDataItemFactory().createDataItem({id:this.getFieldId()+"_template_item",comp:{}},this._def);
this._firstTemplate=this._getItemTemplate("first");
this._lastTemplate=this._getItemTemplate("last")
},_getItemTemplate:function(a){return this._def.getChildByRef("templates")&&this._def.getChildByRef("templates").getChildByRef(a)
},_getDefaultStyleName:function(){return null
},_getDefaultSkinName:function(){return"mobile.core.skins.InlineSkin"
},_onComponentWixified:function(){this._updateSequencerListeners();
if(!this._componentLogic.getSequencer().isPending()){this.updateLayoutWhenReady()
}}}});
W.Classes.newClass({name:"wixapps.integration.proxies.LocationSelectorProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged"],createComponent:function(){var a="wixapps.integration.components.inputs.LocationSelector",b=this._data.getValue(),c={type:"GeoMap",address:b.address,latitude:b.latitude,longitude:b.longitude,addressInfo:b.addressInfo};
this.useSkinsInsteadOfStyles();
return this._createWixComponent(a,c)
},_getDefaultSkinName:function(){return"wixapps.integration.skins.inputs.LocationSelectorSkin"
},_onDataChanged:function(a){if(!this._userInputChange&&this._componentLogic){var c=this._data.getValue();
var b=this._componentLogic.getDataItem();
b.set("address",c.address,true);
b.set("latitude",c.latitude,true);
b.set("longitude",c.longitude,true);
b.set("addressInfo",c.addressInfo,true);
b.fireDataChangeEvent()
}},_onComponentDataChanged:function(c){var b=this._componentLogic.getDataItem();
var a={_type:"wix:Location",address:b.get("address"),latitude:b.get("latitude"),longitude:b.get("longitude"),addressInfo:b.get("addressInfo")};
this._userInputChange=true;
this._data.setValue(a);
this._userInputChange=false
},_getAcceptableDataTypes:function(){return["wix:Location"]
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.MultiColumnListProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.ListProxy",getRepeaterClass:function(){return"wixapps.integration.components.MultiColumnList"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.NumberInputProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.TextInputProxy",createComponent:function(){this.parent();
var a=this._createRawData();
return this._createWixComponent("wysiwyg.viewer.components.inputs.NumberInput",a)
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.input.NumberInputSkin"
},_getDefaultStyleName:function(){return"numi1"
},_getPropSchemaName:function(){return"NumberInputProperties"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["minValue","maxValue"])
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.NumericStepperProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged"],createComponent:function(){this.parent();
var a=this._createRawData();
return this._createWixComponent("wysiwyg.viewer.components.inputs.NumberInput",a)
},_createRawData:function(){var a=this._data.getValue();
return{type:"Text",text:a.value}
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.input.NumberInputSkin"
},_createCompProperties:function(){return this._getPropertiesFromData()
},_getPropertiesFromData:function(){var a=this._data.getValue();
return{type:"NumberInputProperties",minValue:a.minValue,maxValue:a.maxValue}
},_onDataChanged:function(a){if(this._componentLogic&&!this._ignoreUpdate){this._componentLogic.getDataItem().set("text",this._data.getValue().value);
var b=this._getPropertiesFromData();
this._componentLogic.setComponentProperty("minValue",b.minValue);
this._componentLogic.setComponentProperty("maxValue",b.maxValue)
}},_onComponentDataChanged:function(a,d,b){this._ignoreUpdate=true;
var c=this._data.getValue();
c.value=Number(b.text);
this._data.setValue(c);
this._ignoreUpdate=false
},_getDefaultStyleName:function(){return"numi1"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.OptionListInputProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.TextInputProxy",Binds:["_onComponentDataChanged"],createComponent:function(){var a=this._createRawData();
this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation);
return this._createWixComponent("wixapps.integration.components.inputs.TextInput",a)
},_getPropSchemaName:function(){return"TextInputProperties"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["label","placeholder"])
},_createRawData:function(){var a=this._data.getValue();
return{type:"Text",text:this._getOptionsAsText()}
},_getOptionsAsText:function(){var c=this._data.getValue();
var a="";
for(var b=0;
b<c.items.length;
b++){a+=c.items[b].text+"\n"
}return a
},_getOptionsFromText:function(c){var a=c.split("\n");
var d=[];
for(var b=0;
b<a.length;
b++){if(a[b].length>0){d.push({_type:"Option",value:b,text:a[b]})
}}return d
},_onComponentWixified:function(){},_onDataChanged:function(a){if(this._componentLogic&&!this._ignoreUpdate){this._componentLogic.getDataItem().set("text",this._getOptionsAsText())
}},_onComponentDataChanged:function(a,c,b){this._ignoreUpdate=true;
this._data.getChildByRef("items").setValue(this._getOptionsFromText(b.text));
this._ignoreUpdate=false
},_getDefaultStyleName:function(){return"ti1"
},_getDefaultSkinName:function(){return"wixapps.integration.skins.TextAreaSkin"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.OptionsListProxy",imports:[],traits:["wixapps.integration.proxies.traits.WDataExchangeTrait"],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged","_onValidation"],Static:{listType:{text:{compType:"wysiwyg.viewer.components.inputs.TextOption",compSkin:"wixapps.integration.skins.ecommerce.options.TextOptionSkin"},color:{compType:"wysiwyg.viewer.components.inputs.ColorOption",compSkin:"wixapps.integration.skins.ecommerce.options.ColorOptionSkin"}}},initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._listType=this._data.getChildValue("optionType")||"text";
this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation)
},createComponent:function(){this.useSkinsInsteadOfStyles();
return this._createWixComponent("wysiwyg.viewer.components.inputs.OptionsListInput",this._createRawData(),this.listType[this._listType])
},_createRawData:function(){var b=this._data.getChildByRef("items").getValue();
var a=b.map(this._getOptionWDataItem);
return{type:"SelectableList",items:a,selected:null}
},_getOptionWDataItem:function(b){var c={type:"SelectOption",value:b.value,text:b.text,enabled:b.enabled,description:b.description};
var a=W.Data.addDataItemWithUniqueId("apps",c).dataObject;
a.setMeta("isPersistent",false);
return a
},_onDataChanged:function(a){if(this._componentLogic&&!this._ignoreUpdate){var g=null;
var f=this.getData().getChildValue("selectedValue");
var b=this._componentLogic.getDataItem().get("items");
var d=this.getData().getChildValue("items");
for(var e=0;
e<b.length;
e++){var h=b[e].get("value");
if(h==f){g=b[e]
}var c=d[e].enabled;
b[e].set("enabled",c)
}this._componentLogic.getDataItem().set("selected",g);
if(!g&&this._componentLogic._selectedItem){this._refreshComponentData()
}}},_onComponentDataChanged:function(a,c,b){if(c=="selected"&&b.selected){this._ignoreUpdate=true;
this.getData().getChildByRef("selectedValue").setValue(b.selected.get("value"));
this._ignoreUpdate=false
}},_setupPropertyHandlers:function(){this._handleProperties(["align","margin","label","href","target","linkType","icon"],function(){this._refreshComponentData()
})
},_onValidation:function(a){if(!this._componentLogic||!a){return
}this._componentLogic.setValidationState(a.valid)
},_refreshComponentData:function(){if(!this._componentLogic){return
}var c=this._createRawData();
var a=this._componentLogic.getDataItem();
var b=this._convertWItemDataToRawData(a);
if(!this._rawDataEquals(this._convertWItemDataToRawData(c),b)){a.setData(c);
a.setMeta("isPersistent",false)
}},_replaceAllTable:function(){var a=this._element;
var b=this.createComponent();
a.parentNode.replaceChild(b,a);
this.setupProxy()
},_getDefaultSkinName:function(){return"wixapps.integration.skins.ecommerce.options.OptionsListInputSkin"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ProxyMap",imports:["wixapps.integration.proxies.VerticalLineProxy","wixapps.integration.proxies.HorizontalLineProxy","wixapps.integration.proxies.SwitchProxy","wixapps.integration.proxies.LabelProxy","wixapps.integration.proxies.ClippedParagraphProxy","wixapps.integration.proxies.DateProxy","wixapps.integration.proxies.DateSelectorProxy","wixapps.integration.proxies.TimeSelectorProxy","wixapps.integration.proxies.InlineTextProxy","wixapps.integration.proxies.TextInputProxy","wixapps.integration.proxies.NumberInputProxy","wixapps.integration.proxies.NumericStepperProxy","wixapps.integration.proxies.RichTextEditorInlineProxy","wixapps.integration.proxies.FormattedPriceProxy","wixapps.integration.proxies.ImageProxy","wixapps.integration.proxies.ImageSelectorProxy","wixapps.integration.proxies.VerticalListProxy","wixapps.integration.proxies.FlowListProxy","wixapps.integration.proxies.MultiColumnListProxy","wixapps.integration.proxies.ButtonProxy","wixapps.integration.proxies.LinkProxy","wixapps.integration.proxies.LinkSelectorProxy","wixapps.integration.proxies.layout.CssLayoutProxy","wixapps.integration.proxies.layout.BoxLayoutProxy","wixapps.integration.proxies.layout.StackLayoutProxy","wixapps.integration.proxies.SpacerProxy","wixapps.integration.proxies.GalleryProxy","wixapps.integration.proxies.SuperFlowProxy","wixapps.integration.proxies.VerticalListEditorProxy","wixapps.integration.proxies.TableProxy","wixapps.integration.proxies.OptionsListProxy","wixapps.integration.proxies.OptionListInputProxy","wixapps.integration.proxies.ComboBoxProxy","wixapps.integration.proxies.RadioGroupProxy","wixapps.integration.proxies.CheckBoxGroupProxy","wixapps.integration.proxies.TabMenuProxy","wixapps.integration.proxies.TextAreaProxy","wixapps.integration.proxies.AreaProxy","wixapps.integration.proxies.SliderGalleryProxy","wixapps.integration.proxies.VideoProxy","wixapps.integration.proxies.VideoThumbProxy","wixapps.integration.proxies.ExpanderProxy","wixapps.integration.proxies.IconProxy","wixapps.integration.proxies.VideoSelectorProxy","wixapps.integration.proxies.ExpanderProxy","wixapps.integration.proxies.ToggleProxy","wixapps.integration.proxies.DeckProxy","wixapps.integration.proxies.ContainerProxy","wixapps.integration.proxies.ZoomLinkProxy","wixapps.integration.proxies.AppLinkProxy","wixapps.integration.proxies.layout.ZoomLayoutProxy2","wixapps.integration.proxies.layout.FixedRatioLayoutProxy","wixapps.integration.proxies.CheckBoxProxy","wixapps.integration.proxies.CheckBoxViewProxy","wixapps.integration.proxies.GoogleMapProxy","wixapps.integration.proxies.LocationSelectorProxy","wixapps.integration.proxies.EmptyProxy"],traits:[],Class:{registerComponentProxies:function(a){a.registerProxy("Label",this.imports.LabelProxy,"String",[{forType:"String",forMode:"view"},{forType:"Number",forMode:"view"},{forType:"wix:RichText",forMode:"view"}]);
a.registerProxy("ClippedParagraph",this.imports.ClippedParagraphProxy,"String");
a.registerProxy("Date",this.imports.DateProxy,"wix:Date");
a.registerProxy("DateEdit",this.imports.DateSelectorProxy,"wix:Date");
a.registerProxy("TimeEdit",this.imports.TimeSelectorProxy,"wix:Date");
a.registerProxy("InlineText",this.imports.InlineTextProxy,"String");
a.registerProxy("TextInput",this.imports.TextInputProxy,"String",[{forType:"String",forMode:"edit"}]);
a.registerProxy("NumberInput",this.imports.NumberInputProxy,"Number");
a.registerProxy("NumericStepper",this.imports.NumericStepperProxy,"Number",[{forType:"NumberInRange",forMode:"edit"}]);
a.registerProxy("CheckBox",this.imports.CheckBoxProxy,"Boolean",[{forType:"Boolean",forMode:"edit"}]);
a.registerProxy("CheckBoxViewProxy",this.imports.CheckBoxViewProxy,"Boolean",[{forType:"Boolean",forMode:"view"}]);
a.registerProxy("RichTextEditorInline",this.imports.RichTextEditorInlineProxy,"wix:RichText",[{forType:"wix:RichText",forMode:"edit"}]);
a.registerProxy("Price",this.imports.FormattedPriceProxy,"Price",[{forType:"Price",forMode:"view"}]);
a.registerProxy("Image",this.imports.ImageProxy,"wix:Image",[{forType:"wix:Image",forMode:"view"}]);
a.registerProxy("Video",this.imports.VideoProxy,"wix:Video",[{forType:"Video",forMode:"view"},{forType:"wix:Video",forMode:"view"}]);
a.registerProxy("VideoSelector",this.imports.VideoSelectorProxy,"wix:Video",[{forType:"Video",forMode:"edit"},{forType:"wix:Video",forMode:"edit"}]);
a.registerProxy("VideoThumb",this.imports.VideoThumbProxy,"");
a.registerProxy("ImageSelector",this.imports.ImageSelectorProxy,"wix:Image",[{forType:"wix:Image",forMode:"edit"}]);
a.registerProxy("VerticalList",this.imports.VerticalListProxy,"Array",[{forType:"Array",forMode:"view"},{forType:"Array",forMode:"edit"}]);
a.registerProxy("FlowList",this.imports.FlowListProxy,"");
a.registerProxy("MultiColumn",this.imports.MultiColumnListProxy,"");
a.registerProxy("VerticalListEditor",this.imports.VerticalListEditorProxy,"");
a.registerProxy("Gallery",this.imports.GalleryProxy,"");
a.registerProxy("VBox",this.imports.BoxLayoutProxy,"");
a.registerProxy("HBox",this.imports.BoxLayoutProxy,"");
a.registerProxy("Stack",this.imports.StackLayoutProxy,"");
a.registerProxy("Css",this.imports.CssLayoutProxy,"");
a.registerProxy("VSpacer",this.imports.SpacerProxy,"");
a.registerProxy("HSpacer",this.imports.SpacerProxy,"");
a.registerProxy("HorizontalLine",this.imports.HorizontalLineProxy,"");
a.registerProxy("VerticalLine",this.imports.VerticalLineProxy,"");
a.registerProxy("Switch",this.imports.SwitchProxy,"");
a.registerProxy("SuperFlow",this.imports.SuperFlowProxy,"");
a.registerProxy("Button",this.imports.ButtonProxy,"");
a.registerProxy("Table",this.imports.TableProxy,"");
a.registerProxy("Expander",this.imports.ExpanderProxy,"");
a.registerProxy("Deck",this.imports.DeckProxy,"");
a.registerProxy("TabMenu",this.imports.TabMenuProxy,"");
a.registerProxy("Icon",this.imports.IconProxy,"");
a.registerProxy("Toggle",this.imports.ToggleProxy,"");
a.registerProxy("Link",this.imports.LinkProxy,"wix:LinkBase",[{forType:"wix:LinkBase",forMode:"view"}]);
a.registerProxy("LinkSelector",this.imports.LinkSelectorProxy,"wix:LinkBase",[{forType:"wix:LinkBase",forMode:"edit"}]);
a.registerProxy("OptionsList",this.imports.OptionsListProxy,"Array",[{forType:"OptionsList",forMode:"view"}]);
a.registerProxy("OptionsListInput",this.imports.OptionListInputProxy,"Array",[{forType:"ComboOptionsList",forMode:"edit"},{forType:"OptionsList",forMode:"edit"}]);
a.registerProxy("ComboBox",this.imports.ComboBoxProxy,"Array",[{forType:"ComboOptionsList",forMode:"view"}]);
a.registerProxy("RadioGroup",this.imports.RadioGroupProxy,"Array",[{forType:"ComboOptionsList",forMode:"view"}]);
a.registerProxy("CheckBoxGroup",this.imports.CheckBoxGroupProxy,"Array",[{forType:"MultiOptionsList",forMode:"view"}]);
a.registerProxy("TextArea",this.imports.TextAreaProxy,"String");
a.registerProxy("Area",this.imports.AreaProxy,"");
a.registerProxy("SliderGallery",this.imports.SliderGalleryProxy,"Array",[{forType:"Array<wix:Image>",forMode:"view"}]);
a.registerProxy("Container",this.imports.ContainerProxy,"");
a.registerProxy("ZoomLink",this.imports.ZoomLinkProxy,"");
a.registerProxy("AppLink",this.imports.AppLinkProxy,"");
a.registerProxy("ZoomLayout",this.imports.ZoomLayoutProxy2,"");
a.registerProxy("FixedRatioLayout",this.imports.FixedRatioLayoutProxy,"");
a.registerProxy("GoogleMap",this.imports.GoogleMapProxy,"wix:Location");
a.registerProxy("LocationSelector",this.imports.LocationSelectorProxy,"wix:Location");
a.registerProxy("Empty",this.imports.EmptyProxy,"",[]);
a.registerDefaultValue("String","");
a.registerDefaultValue("Number",0);
a.registerDefaultValue("Boolean",false);
a.registerDefaultValue("Array",[]);
a.registerDefaultValue("wix:Date",{_type:"wix:Date",iso:"1970-01-01T00:00:00.000Z"});
a.registerDefaultValue("wix:Image",{_type:"wix:Image",title:"",src:"",width:100,height:100});
a.registerDefaultValue("wix:Video",{_type:"wix:Video",videoId:"UAxMzrWZOpY",videoType:"YOUTUBE"});
a.registerDefaultValue("wix:Link",{_type:"wix:Link",linkType:"",href:"",label:"",target:"_blank",icon:""});
a.registerDefaultValue("wix:NumberInRange",{_type:"wix:NumberInRange",value:0,minValue:0,maxValue:100});
a.registerDefaultValue("wix:RichText",{_type:"wix:RichText",text:"",links:[]});
a.registerDefaultValue("wix:LinkBase",{_type:"wix:LinkBase"});
a.registerDefaultValue("wix:Location",{_type:"wix:Location",address:"",addressInfo:"",latitude:1970,longitude:1970})
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.RadioGroupProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.ComboBoxProxy",Binds:["_onComponentDataChanged"],createComponent:function(){var b=Number.random(0,99999).toString(36);
var a="radio_group_"+b;
return this._createWixComponent("wysiwyg.viewer.components.inputs.RadioGroupInput",this._createRawData(),{radioGroupName:a,selectedValue:this._data.getChildValue("selectedValue")})
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.input.RadioGroupInputSkin"
},_getDefaultStyleName:function(){return"wa_rg1"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.RichTextEditorInlineProxy",imports:[],traits:["wixapps.integration.proxies.traits.AppsLinkTrait"],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged","_linkIdGenerator"],createComponent:function(){var b=this._createRawData();
var a=W.Data;
if(W.Editor){a=W.Preview.getPreviewManagers().Data
}this._updateLinkDataItems(a);
return this._createWixComponent("wysiwyg.editor.components.richtext.WRichTextEditor",b,{fixedHeight:this._def.getChildValue("height"),persistantLinks:false,generateLinkIdFunc:this._linkIdGenerator})
},_getDefaultSkinName:function(){return"wysiwyg.editor.skins.WRichTextEditorSkin"
},_getDefaultStyleName:function(){return"wrte1"
},_createRawData:function(){var a=this._data.getChildValue("text");
return{type:"RichText",text:a}
},_onComponentWixified:function(){this._componentLogic.setState("dialogPart");
var a=function(d){if(d.data&&(d.data.className=="cke_styles"||d.data.className=="cke_button_textcolor")){var b=d.data._.panel;
var c=b.element.$;
if(c.className.indexOf("z-dialog")==-1){c.className=c.className+" z-dialog"
}}}.bind(this);
this._componentLogic.createEditor(this._dataItem,null,a)
},_onComponentDataChanged:function(e){var f=this._componentLogic.getDataItem().get("text");
var d=f.match(/dataQuery="[^"]*/ig)||[];
var b=[];
for(var c=0;
c<d.length;
c++){var g=d[c].split('"')[1];
var a=W.Preview.getPreviewManagers().Data.getDataByQuery(g);
b.push(this._createAppsLink(a))
}this._data.getChildByRef("links").setValue(b);
this._data.getChildByRef("text").setValue(f)
},_linkIdGenerator:function(){return this.generateLinkId(this._viewContext.getEnvironment().getProxyFactory().getNameSpace())
},_onDataChanged:function(a){if(this._componentLogic){this._componentLogic.getDataItem().set("text",this._data.getChildValue("text"))
}}}});
W.Classes.newClass({name:"wixapps.integration.proxies.SliderGalleryProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){this.useSkinsInsteadOfStyles();
var a=this._createWixComponent("wysiwyg.viewer.components.SelectableSliderGallery",this._createRawData(),null);
a.setStyle("position","relative");
return a
},_createRawData:function(){var a=this._data.getChildren();
var b=[];
a.forEach(function(c){b.push(this._getWImage(c.getValue()))
},this);
return{type:"ImageList",items:b}
},_getWImage:function(b){var c={type:"Image",title:"",uri:b.src,description:"",height:b.height,width:b.width,borderSize:"",alt:""};
var a=W.Data.createDataItem(c);
a.setMeta("isPersistent",false);
return a
},_getPropSchemaName:function(){return"SliderGalleryProperties"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["showAutoplay","loop","showCounter","expandEnabled"])
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.galleryselectableslider.SelectableSliderGalleryDefaultSkin"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.SpacerProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",_spacerType:"",_spacerSize:10,_sizePropMap:{HSpacer:"width",VSpacer:"height",InlineSpacer:"word-spacing"},getSpacerType:function(){return this._spacerType
},createComponent:function(){return this._createElement("div")
},isBoxFlexEnabled:function(){if(this._spacerType){return this._spacerType!=="InlineSpacer"
}else{return !this._isInlineSpacer()
}},getSpacerSize:function(){return this._spacerSize
},_onProxySetup:function(){this._updateSpacerSize()
},_setupPropertyHandlers:function(){this._handleProperty("size",function(a){this._updateSpacerSize()
})
},_updateSpacerSize:function(){var c;
this._spacerType=this._def.getChildValue("name");
var a={};
if(this._isInlineSpacer()){this._spacerType="InlineSpacer";
a.display="inline";
this._element.set("text"," ")
}else{a.display="block";
window.requestAnimFrame(function(){this._element.setStyle("display",this._processCssProp("box"))
}.bind(this))
}var b=this._def.getChildValue("size");
if(b!==undefined){this._spacerSize=b
}c=this._sizePropMap[this._spacerType];
if(this._spacerSize==="*"){a[c]=0;
a["box-flex"]="1"
}else{if(c){a[c]=parseInt(this._spacerSize)+"px";
a["box-flex"]="initial"
}}this._applyStyle(this._element,a)
},_isInlineSpacer:function(){var b=this._element.getPrevious();
var a=this._element.getNext();
var c=(b?b.getStyle("display"):"");
var d=(a?a.getStyle("display"):"");
return(c=="inline")||(c=="inline-block")||(d=="inline")||(d=="inline-block")
},getProxyMetaTags:function(){var a=["spacer"];
if(this._spacerType==="InlineSpacer"){a.push("inline")
}return a
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.SuperFlowProxy",imports:["wixapps.core.layouts.SuperFlowLayout"],Class:{Extends:"wixapps.integration.proxies.WCompositeProxy",_components:[],_layout:null,_layoutModel:null,createComponent:function(){var b=this.setWidth;
this.setWidth=function(c){b.apply(this,[c]);
this._setWidth(c)
}.bind(this);
var a=this._createWixComponent("mobile.core.components.Container");
this._layout=new this.imports.SuperFlowLayout();
this._buildLayoutModel();
this._createChildComponents(a);
this._components.forEach(function(c){c.setStyle("position","absolute")
});
return a
},_buildLayoutModel:function(){var b=this._def.getValue();
var a={items:[]};
if(b.regions){a.regions=Object.clone(b.regions)
}b.items.forEach(function(d){var c={};
if(d.layout){Object.each(d.layout,function(f,e){c[e]=f
})
}a.items.push(c)
});
this._layoutModel=a
},applyLayout:function(){this._layout.setModel(this._layoutModel,this._children);
this._layout.positionElements();
this._element.setStyle("height",this._layout.getHeight())
},_setWidth:function(a){this._layoutModel.minWidth=a;
this.applyLayout()
},_onDefinitionsChanged:function(){this.applyLayout()
},_getDefaultStyleName:function(){return"c1"
},_getDefaultSkinName:function(){return"mobile.core.skins.InlineSkin"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.SwitchProxy",imports:[],traits:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:[],_child:null,_prevCaseId:null,initialize:function(b,d,c,a){this.parent(b,d,c,a)
},_setupPropertyHandlers:function(){this.parent();
this._handleProperties(["cases"],function(){if(this._updateSwitchState()){this._child.setupProxy();
this._child.updateLayoutWhenReady()
}})
},_updateSwitchState:function(){var b=false;
var a=this._data?this._data.getValue().toString():"";
if(a!==this._prevCaseId){this._prevCaseId=a;
if(this._child){this._child.dispose();
this._child=null
}if(this._def.getChildByRef("cases")){var d=this._def.getChildByRef("cases").getChildByRef(a)||this._def.getChildByRef("cases").getChildByRef("default");
if(d&&d.getValue()==="NO_PROXY"){this._element.collapse()
}else{this._element.uncollapse();
this._child=this._viewContext.getEnvironment().getProxyFactory().createProxyFromItemDefinition(this._viewContext,d).proxy;
var c=this._child.createComponent();
if(c){this._element.adopt(c);
var e=d.getChildValue("layout")||{};
this._applyStyle(c,e);
b=true
}}}}return b
},setupProxy:function(a){this.parent();
if(this._child){this._child.setupProxy(a)
}else{if(a){a()
}}},createComponent:function(){var a=this._createElement();
this._applyStyle(a,{"box-orient":"vertical",display:this._prefix+"box"});
this._updateSwitchState();
return a
},_onDataChanged:function(){if(this._updateSwitchState()){this._child.setupProxy();
this._child.updateLayoutWhenReady()
}},dispose:function(){if(this._child){this._child.dispose();
this._child=null
}}}});
W.Classes.newClass({name:"wixapps.integration.proxies.TabMenuProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onSelectionChanged","_onSelectionChangeRequested"],createComponent:function(){this._initialSelectedIndex=this.getViewDefinition().getChildValue("initialSelectedIndex")||0;
this._selectionRequestEvent=this.getViewDefinition().getChildValue("selectionRequestEvent");
this._selectionRequestEventScope=this.getViewDefinition().getChildValue("selectionRequestScope")||"any";
this._titleExpression=this._def.getChildValue("titleExpression")||"this";
this._selectionChangedEvent=this.getViewDefinition().getChildValue("selectionChangedEvent");
return this._createWixComponent("wixapps.integration.components.TabMenu",this._createRawData(),{initialSelectedIndex:this._initialSelectedIndex})
},_createRawData:function(){var b=this._data.getChildren();
var a=[];
for(var c=0;
c<b.length;
c++){a.push(b[c].evaluatePath(this._titleExpression).getValue(0))
}return{type:"TextList",items:a}
},setSelectedIndex:function(a){if(this._componentLogic){this._componentLogic.setSelectedIndex(a)
}},_onComponentWixified:function(){this._componentLogic.addEvent("selectionChanged",this._onSelectionChanged);
if(this._selectionRequestEvent){this.addEventFilteredByScope(this._selectionRequestEventScope,this._selectionRequestEvent,this._onSelectionChangeRequested)
}var a=this._getInitialSelection();
if(a>=0){this.setSelectedIndex(a)
}},_onSelectionChanged:function(){if(this._selectionChangedEvent){this.fireEvent(this._selectionChangedEvent,{sender:this,data:this.data.getChildren()[this._componentLogic.getSelectedIndex()],context:this.getViewContext(),def:this.getViewDefinition()})
}},_onSelectionChangeRequested:function(a){var d=a.data;
if(!d){return
}var c=this._data.getChildren();
for(var b=0;
b<c.length;
b++){var e=c[b];
if(e==d){this.setSelectedIndex(b);
return
}}},_setupPropertyHandlers:function(){this._handleProperty("initialSelectedIndex",function(a){a=a||0;
if(a!=this._initialSelectedIndex){this._initialSelectedIndex=a;
this.setSelectedIndex(a)
}})
},_getDefaultSkinName:function(){return"wixapps.integration.skins.TabMenuSkin"
},_getAcceptableDataTypes:function(){return["Array"]
},dispose:function(){if(this._selectionRequestEvent){this.removeEvent(this._selectionRequestEvent,this._onSelectionChangeRequested)
}if(this._componentLogic){this._componentLogic.removeEvent("selectionChanged",this._onSelectionChanged)
}this.parent()
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.TableProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_bodyCellHookMethod","_headerAndFooterCellHookMethod"],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._proxyFactory=this._viewContext.getEnvironment().getProxyFactory();
this._columnsDefinition=this._getColumnsDef()
},createComponent:function(){return this._createWixComponent("wysiwyg.viewer.components.TableComponent",this._createRawData(),{SequencingHook:this._bodyCellHookMethod,HeaderFooterSequencingHook:this._headerAndFooterCellHookMethod})
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperty("minHeight");
this._handleProperties(["rowsDataArray","columns"],function(){this._columnsDefinition=this._getColumnsDef();
this._refreshComponentData()
})
},_bodyCellHookMethod:function(b){var a=this._columnsDefinition[b.index].getChildByRef("item");
return this._getCellElement(b.data,a)
},_headerAndFooterCellHookMethod:function(a){if(!a.data){return null
}return this._getCellElement(this._viewContext,a.data)
},_getCellElement:function(d,c){var b=this._proxyFactory.createProxyFromItemDefinition(d,c).proxy;
var a=b.createComponent();
b.setupProxy(function(){b.updateLayoutWhenReady()
});
return a
},_createRawData:function(){var b=this._getColumnsDef();
var a=this._getRowsListRawData(this._getRowsDataArray(),b);
var d=this._getHeaderOrFooterRawData(b,"header");
var c=this._getHeaderOrFooterRawData(b,"footer");
return{type:"Table",items:a,header:d,footer:c}
},_getRowsDataArray:function(){var a=this._viewContext;
if(this._def.getChildByRef("rowsDataArray")){var b=this._def.getChildValue("rowsDataArray");
a=this._data.getChildByRef(b)
}return a
},_onDataChanged:function(a){this.parent(a);
if(a.phase==Constants.DataItemEventPhase.ON_TARGET){this._refreshComponentData()
}},_refreshComponentData:function(){if(!this._dataItem){return
}var a=this._createRawData();
this._dataItem.setData(a);
this._dataItem.setMeta("isPersistent",false)
},_getColumnsDef:function(){return this._def.getChildByRef("columns").getChildren()
},_getRowsListRawData:function(c,b){var a=[];
c.getChildren().forEach(function(f){var d=[];
for(var e=0;
e<b.length;
e++){d[e]={data:this._viewContext.newContextForData(f),index:e,styleData:b[e].getChildValue("item").styleData}
}a.push(d)
}.bind(this));
return a
},_getHeaderOrFooterRawData:function(c,d){var b=false;
var a=[];
c.forEach(function(g,f){var e=g.getChildByRef(d);
if(e){b=true;
a.push({data:e,index:f})
}else{a.push(({data:null,index:f}))
}});
return b?a:null
},_getPropSchemaName:function(){return"TableComponentProperties"
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.table.TableComponentDefaultSkin"
},_getDefaultStyleName:function(){return"tblc1"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.TextAreaProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.TextInputProxy",Binds:["_onValidation"],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation)
},createComponent:function(){var b=this._createRawData();
var a={maxLength:this._def.getChildValue("maxLength")};
return this._createWixComponent("wysiwyg.viewer.components.inputs.TextAreaInput",b,a)
},_onValidation:function(a){if(!this._componentLogic||!a){return
}if(a.valid){this._componentLogic.setValidationState(true)
}else{var b=a.validationMessage||this._def.getValue().validationMessage;
this._componentLogic.setError(b)
}this._componentLogic.setValidationState(a.valid)
},_stylesMap:{"default":{skin:"wysiwyg.viewer.skins.input.TextAreaInputSkin",style:"wa_tai1"},ecomTextArea:{skin:"wixapps.integration.skins.ecommerce.inputs.TextAreaInputSkin",style:""}},_getDefaultSkinName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].skin
},_getDefaultStyleName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].style
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.TextInputProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged","_onValidation"],createComponent:function(){var b=this._createRawData();
var a=document.createElement("div");
a.innerHTML=b.text;
b.text=a.innerText||a.text||a.textContent;
this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation);
return this._createWixComponent("wixapps.integration.components.inputs.TextInput",b)
},_getPropSchemaName:function(){return"TextInputProperties"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["label","placeholder"])
},_createRawData:function(){var a=this._data.getValue();
return{type:"Text",text:a}
},_onComponentWixified:function(){},_onDataChanged:function(a){if(this._componentLogic&&!this._ignoreUpdate){this._componentLogic.getDataItem().set("text",this._data.getValue())
}},_onComponentDataChanged:function(a,c,b){this._ignoreUpdate=true;
this._data.setValue(b.text);
this._ignoreUpdate=false
},_onValidation:function(a){if(!this._componentLogic){return
}if(a.valid){this._componentLogic.resetInvalidState()
}else{var b=a.validationMessage||this._def.getValue().validationMessage;
this._componentLogic.showValidationMessage(b)
}},_stylesMap:{"default":{skin:"wysiwyg.viewer.skins.appinputs.AppsTextInputSkin",style:"wa_ti1"},ecomTextInput:{skin:"wysiwyg.viewer.skins.appinputs.EcomTextInputSkin",style:"ecom_ti1"}},_getDefaultSkinName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].skin
},_getDefaultStyleName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].style
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.TimeSelectorProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_onComponentDataChanged","_onValidation"],createComponent:function(){this._data.addEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,this._onValidation);
var a="wixapps.integration.components.inputs.TimeInput";
this.useSkinsInsteadOfStyles();
var b=this._getIsoDate();
return this._createWixComponent(a,{type:"Text",text:b})
},_getPropSchemaName:function(){return"TimeInputProperties"
},_setupPropertyHandlers:function(){this.parent();
this._mapToCompProperties(["resolution","hourFormat","allowEmpty"])
},_getDefaultSkinName:function(){return"wixapps.integration.skins.inputs.TimeInputSkin"
},_getIsoDate:function(){var b=this._data.getValue();
var a=new Date(b.iso);
if(!this._allowEmpty()&&(isNaN(a.getTime())||a.getDate()==new Date(0).getDate())){b.iso=new Date().toISOString();
this._data.setValue(b)
}return b.iso
},_onDataChanged:function(a){if(!this._userInputChange&&this._element&&this._element.getLogic()){this._element.getLogic().getDataItem().set("text",this._getIsoDate())
}},_onComponentDataChanged:function(a){var b=this._element.getLogic().getDataItem().get("text");
this._userInputChange=true;
this._data.setValue({_type:"wix:Date",iso:b});
this._userInputChange=false
},_onValidation:function(a){if(!this._componentLogic){return
}if(a.valid){this._componentLogic.resetInvalidState()
}else{var b=a.validationMessage||this._def.getValue().validationMessage;
this._componentLogic.showValidationMessage(b)
}},_allowEmpty:function(){return !(this._def.getChildValue("allowEmpty")===false||this._def.getChildValue("allowEmpty")==="false")
},_getAcceptableDataTypes:function(){return["wix:Date"]
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.ToggleProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",Binds:["_handlePeerToggleEvent","toggle"],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._loadTemplates()
},createComponent:function(){var a=this._viewContext.getEnvironment().getProxyFactory();
this._initialState=this.getViewDefinition().getChildValue("initialState")||"off";
var f=a.createProxyFromItemDefinition(this._viewContext,this._onTemplate).proxy;
var b=a.createProxyFromItemDefinition(this._viewContext,this._offTemplate).proxy;
this._childrenLeftToBeReady=1;
var e=function(h){h.grab(f.createComponent());
f.setupProxy(this._onChildReady)
}.bind(this);
var d=function(h){h.grab(b.createComponent());
b.setupProxy(this._onChildReady)
}.bind(this);
this._toggleTriggerEvent=this._def.getChildValue("toggleTriggerEvent");
var c=this._createWixComponent("wixapps.integration.components.Toggle",undefined,{createOnHook:e,createOffHook:d,initialState:this._initialState,listensToPartsClick:!this._toggleTriggerEvent});
if(this._toggleTriggerEvent){var g=this._def.getChildValue("toggleTriggerScope")||"same";
this.addEventFilteredByScope(g,this._toggleTriggerEvent,this.toggle)
}return c
},_onComponentWixified:function(){this._componentLogic.addEvent("wix:toggle",function(a){this.fireEvent("wix:toggle",{state:a.state,toggleGroup:this.getToggleGroup()});
this._viewContext.getEnvironment().getEventsDispatcher().fireEvent(Constants.WixAppEvents.APP_PART_RESIZE);
this._viewContext.getEnvironment().getEventsDispatcher().fireEvent(Constants.WixAppEvents.APP_CONTENT_RESIZE)
}.bind(this));
this.addEventFilteredByScope(this.getToggleScope(),"wix:toggle",this._handlePeerToggleEvent)
},getToggleGroup:function(){return this.getViewDefinition().getChildValue("toggleGroup")
},getToggleScope:function(){return this.getViewDefinition().getChildValue("toggleScope")
},turnOff:function(){this._componentLogic.turnOff()
},turnOn:function(){this._componentLogic.turnOn()
},toggle:function(){this._componentLogic.toggle()
},_setupPropertyHandlers:function(){this._handleProperties(["initialState"],function(){this._loadTemplates();
var a=this.getViewDefinition().getChildValue("initialState")||"off";
if(a!=this._initialState){this._initialState=a;
if(a=="on"){this.turnOn()
}else{this.turnOff()
}}})
},_loadTemplates:function(){var a=this._viewContext.getEnvironment();
this._onTemplate=this._getItemTemplate("on")||a.getDataItemFactory().createDataItem({id:this.getFieldId()+"_template_on",comp:{}},this._def);
this._offTemplate=this._getItemTemplate("off")||a.getDataItemFactory().createDataItem({id:this.getFieldId()+"_template_off",comp:{}},this._def)
},_getItemTemplate:function(a){return this._def.getChildByRef("templates")&&this._def.getChildByRef("templates").getChildByRef(a)
},_handlePeerToggleEvent:function(a){var c=a.state;
var b=a.toggleGroup;
if(a.sender==this){return
}if(c=="on"){if(b&&b==this.getToggleGroup()){this.turnOff()
}}},_getDefaultSkinName:function(){return"wixapps.integration.skins.ToggleSkin"
},dispose:function(){if(this._toggleTriggerEvent){this.removeEvent(this._toggleTriggerEvent,this.toggle)
}this.removeEvent("wix:toggle",this._handlePeerToggleEvent);
this.parent()
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.VerticalLineProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){return this._createWixComponent("wysiwyg.viewer.components.VerticalLine",undefined,undefined,undefined)
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.VerticalLineSkin"
},_getDefaultStyleName:function(){return"vl1"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.VerticalListEditorProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WArrayProxy",Binds:["_sequencingHook"],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._loadTemplates()
},createComponent:function(){var a=this._createRawData();
return this._createWixComponent("wysiwyg.viewer.components.VerticalListEditor",a,{sequencingHook:this._sequencingHook})
},_sequencingHook:function(c,g,f){var a=this._viewContext.getEnvironment().getProxyFactory();
var b=this._viewContext.newContextForData(c);
this._addPositionInParentVars(b,g,f.length);
var e=a.createProxyFromItemDefinition(b,this._itemTemplate).proxy;
var d=e.createComponent();
e.setupProxy();
return d
},_createRawData:function(){var a=this._data.getChildren();
return{type:"ImageList",items:a}
},_loadTemplates:function(){var a=this._viewContext.getEnvironment();
this._itemTemplate=this._getItemTemplate("item")||a.getDataItemFactory().createDataItem({id:this.getFieldId()+"_template_item",comp:{}},this._def)
},_getItemTemplate:function(a){return this._def.getChildByRef("templates")&&this._def.getChildByRef("templates").getChildByRef(a)
},_addPositionInParentVars:function(b,c,a){var d=b.getEnvironment();
d.setVar("indexInParent",c);
d.setVar("indexOneInParent",c+1);
d.setVar("positionInParent",c==0?"first":(c==a-1?"last":"middle"));
d.setVar("isOddIndexInParent",c%2==1)
},_getDefaultStyleName:function(){return null
},_getDefaultSkinName:function(){return"wixapps.integration.skins.editor.VerticalListEditorSkin"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.VerticalListProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.ListProxy",getRepeaterClass:function(){return"wysiwyg.viewer.components.VerticalRepeater"
},setComponentStyles:function(a){var b={};
b.display=this._processCssProp("box");
b[this._processCssProp("box-orient")]="vertical";
a.setStyles(b);
return a
},_stylesMap:{"default":{style:"vr1"},ecomOptionsList:{style:null}},_getDefaultStyleName:function(){var a=this._def.getChildValue("styleNS")||"default";
return this._stylesMap[a].style
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.VideoProxy",imports:[],traits:["wixapps.integration.components.traits.ResizableProxyTrait"],Class:{Extends:"wixapps.integration.proxies.WProxy",createComponent:function(){var b=this._createRawData(this._data.getValue()),a={type:"Video"};
return this._createWixComponent("wysiwyg.viewer.components.Video",b,undefined,a)
},_createRawData:function(b){var a={type:"Video",videoId:b.videoId,videoType:b.videoType};
return a
},_getDefaultSkinName:function(){return"wysiwyg.viewer.skins.video.VideoDefault"
},_getDefaultStyleName:function(){return"vd1"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.VideoSelectorProxy",imports:[],traits:["wysiwyg.viewer.components.traits.VideoUtils"],Class:{Extends:"wixapps.integration.proxies.TextInputProxy",Binds:["_onComponentDataChanged"],_createRawData:function(){var a=this._data.getValue();
return{type:"Text",text:this._getVideoUrlFromVideoData(a)}
},_onDataChanged:function(a){if(this._componentLogic&&!this._ignoreUpdate){this._componentLogic.getDataItem().set("text",this._getVideoUrlFromVideoData(this._data.getValue()))
}},_onComponentDataChanged:function(a,d,c){this._ignoreUpdate=true;
var b=this._getVideoDataFromVideoUrl(a.get("text"));
this._data.getChildByRef("videoId").setValue(b.videoId);
this._data.getChildByRef("videoType").setValue(b.videoType);
this._ignoreUpdate=false
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.VideoThumbProxy",imports:[],traits:["wixapps.integration.components.traits.ResizableProxyTrait","wysiwyg.viewer.components.traits.VideoUtils"],Class:{Extends:"wixapps.integration.proxies.ImageProxy",Binds:["_handleSizeChange","_showPic"],_createRawData:function(){var c=this._data.getValue();
var a=this._getServices()[c.videoType];
var b="84770f_7ce1ddb86000aefa86f1a05553079857.jpg_256";
b=a.getPreviewUrl(c.videoId,this._showPic)||b;
return{type:"Image",uri:b,title:"",width:480,height:360}
},_onDataChanged:function(){var a=this._createRawData();
this._showPic(a.uri)
},_showPic:function(a){if(this._componentLogic){this._componentLogic.getDataItem().set("uri",a)
}else{this._videoThumbUrl=a
}},_onComponentWixified:function(){this._element.addClass("videoIndicator");
this._showPic(this._videoThumbUrl);
this.parent()
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.WArrayProxy",imports:[],traits:["wixapps.integration.proxies.WIntegrationTrait","wixapps.integration.proxies.traits.ProxyPropertyChangeTrait"],Class:{Extends:"wixapps.core.views.proxies.ArrayProxy"}});
W.Classes.newClass({name:"wixapps.integration.proxies.WCompositeProxy",imports:[],traits:["wixapps.integration.proxies.WIntegrationTrait","wixapps.integration.proxies.traits.ProxyPropertyChangeTrait"],Class:{Extends:"wixapps.core.views.proxies.CompositeProxy"}});
W.Classes.newTrait({name:"wixapps.integration.proxies.WIntegrationTrait",trait:{Binds:["_onStyleChangeInternal","_onSkinChange","_onAutoSizeChange"],_dataItem:null,_element:null,_initArgs:null,_componentLogic:null,_applyAfterWixifiedActions:[],_prefix:null,_onReadyCallback:null,_childrenLeftToBeReady:0,_useSkinsInsteadOfStyles:false,_cssPropDict:{},_disposed:false,_lifecycleManager:null,initialize:function(){if(W&&W.Viewer&&W.Editor){this.useSkinsInsteadOfStyles()
}var a=String(this.injects().Utils.getCSSBrowserFeature("boxOrient")||"");
if(a){this._prefix=a.match(/^\-[a-z]+\-/)[0]||""
}},_createElement:function(b){var c;
var e=this;
this._lifecycleManager=this._viewContext.getEnvironment().getLifecycleManager();
var d=this._viewContext.getEnvironment();
c=new Element(b||this._getViewElement());
c.getViewProxy=function(){return e
};
c.setAttribute("hasProxy","true");
c.setAttribute("vctype",d.getForType());
c.setAttribute("vcview",d.getViewName());
c.setAttribute("vcfield",this.getFieldId());
c.setAttribute("pos",this._getDefaultPosition());
this._element=c;
var a=this._def.getChildValue("cssClass");
if(a){c.addClass(a);
this._cssClass=a
}var f=this._def.getChildValue("hidden");
if(f=="true"||f===true){c.collapse()
}return c
},_createWixComponent:function(f,a,b){b=b||{};
this._initArgs=b;
var d,h,g;
var i=this._createCompProperties()||{};
h=this._def.getChildValue("style")||this._getDefaultStyleName();
d=this._def.getChildValue("skin")||this._getDefaultSkinName();
this._styleNameSpace=this._def.getChildValue("styleNS")||this._getDefaultStyleNameSpace();
this._initArgs.styleNameSpace=this._styleNameSpace;
var e=this._createElement();
this._lifecycleManager.notifyComponentCreated(e);
e.setAttribute("comp",f);
if(h&&!this._useSkinsInsteadOfStyles){e.setAttribute("styleid",h)
}e.setAttribute("skin",d);
if(a){this._dataItem=W.Data.createDataItem(a);
this._dataItem.setMeta("isPersistent",false);
this._dataItem.addEvent(Constants.DataEvents.DATA_CHANGED,this._onComponentDataChanged)
}if(i.type){var c=W.ComponentData.addDataItemWithUniqueId("wixApps",i);
if(c){c.dataObject.setMeta("isPersistent",false);
e.setAttribute("propertyquery","#"+c.id)
}}e.addEvent(Constants.ComponentEvents.WIXIFIED,function(){this._onWixComponentWixifiedInternal(e)
}.bind(this));
e.addEvent(Constants.ComponentEvents.READY,function(){this._lifecycleManager.notifyComponentReady(e)
}.bind(this));
return e
},useSkinsInsteadOfStyles:function(){this._useSkinsInsteadOfStyles=true
},updateLayoutWhenReady:function(a){this._lifecycleManager.performAction(a||this._lifecycleManager.getDefaultInvalidateLayoutAction())
},setupProxy:function(){this._applyCssNode(this._element);
if(this._children){this._children.each(function(b){b.setupProxy()
}.bind(this))
}if(this._element.wixify&&this._element.get("comp")){this._element.wixify(this._initArgs,this._dataItem)
}else{if(this._element.wixifySubElement){this._element.wixifySubElement(this._initArgs,this._dataItem)
}}var a=this;
window.requestAnimFrame(function(){if(!a._disposed){a._onProxySetup()
}})
},_onReady:function(){},_onWixComponentWixifiedInternal:function(a){this._componentLogic=a.getLogic();
this._updateComponentState();
this._onComponentWixified();
this._registerStyleChangeHandler();
this._applyAfterWixifiedActions.forEach(function(b){b.apply(this)
}.bind(this));
this._applyAfterWixifiedActions=[];
this._componentLogic.addEvent("autoSizeChange",this._onAutoSizeChange)
},_onAutoSizeChange:function(a){this._viewContext.getEnvironment().getEventsDispatcher().fireEvent("innerCompResize",this._componentLogic)
},_registerProxyEvents:function(b,a){this._applyAfterWixified(function(){this._componentLogic.addEvent(b,a)
}.bind(this))
},_applyAfterWixified:function(a){if(this._componentLogic){a.apply(this)
}else{this._applyAfterWixifiedActions.push(a)
}},_onComponentWixified:function(){},_onComponentDataChanged:function(a,c,b){},_onDataChangedInternal:function(a){this.parent(a);
if(this._componentLogic&&!this._componentLogic.getIsDisplayed()){if(this._componentLogic.invalidateComponent){this._componentLogic.invalidateComponent()
}}},_onProxySetup:function(){},setWidth:function(a){this._element.setStyle("width",a)
},getWidth:function(){return this._element.getWidth()
},getHeight:function(){return this._element.getHeight()
},setPos:function(b,a){this._element.setStyles({left:b,top:a})
},_getViewElement:function(){return"div"
},_getDefaultStyleName:function(){return""
},_getDefaultSkinName:function(){return""
},_getDefaultStyleNameSpace:function(){return null
},refreshSize:function(){},_onLayoutChange:function(){},_applyStyle:function(c,d){if(!c){return
}var a={};
var b;
Object.each(d,function(f,e){b=this._processCssProp(e);
if(b=="width"||b=="height"){if(typeOf(f)=="string"&&(!String.contains(f,"%"))){f=parseInt(f)
}}a[b]=f
}.bind(this));
c.setStyles(a);
if("width" in a||"height" in a){if(c.getLogic&&c.getLogic()._onResize){setTimeout(function(){c.getLogic()._onResize()
},500)
}}},_processCssProp:function(b){var a;
if(b in this._cssPropDict){a=this._cssPropDict[b]
}else{a=this.injects().Utils.getCSSBrowserFeature(b)||this._prefix+b;
this._cssPropDict[b]=a
}return a
},_registerStyleChangeHandler:function(){if(this._styleObj){this._styleObj.removeEvent(Constants.StyleEvents.PROPERTY_CHANGED,this._onStyleChangeInternal);
this._styleObj.removeEvent(Constants.StyleEvents.SKIN_CHANGED,this._onSkinChange)
}this._styleObj=this._componentLogic.getStyle();
if(this._styleObj){this._styleObj.addEvent(Constants.StyleEvents.PROPERTY_CHANGED,this._onStyleChangeInternal);
this._styleObj.addEvent(Constants.StyleEvents.SKIN_CHANGED,this._onSkinChange)
}},_onStyleChangeInternal:function(a){this._onStylePropertiesChange(a.properties)
},_onSkinChange:function(a){},_onStylePropertiesChange:function(a){},_isLayoutBasedWidth:function(){var a=this._def.getParent().getChildValue("layout");
if(this._getImplicitDimensions().contains("width")){return false
}if(a&&(("width" in a)||("zoomExpand" in a))){return true
}else{var b=this._getParentLayoutOrientation();
if(b==="vertical"){return true
}else{if(b==="horizontal"){return Boolean(a&&("box-flex" in a))
}else{return false
}}}},_isLayoutBasedHeight:function(){var a=this._def.getParent().getChildValue("layout");
if(this._getImplicitDimensions().contains("height")){return false
}if(a&&(("height" in a))){return true
}else{var b=this._getParentLayoutOrientation();
if(b==="horizontal"){return true
}else{if(b==="vertical"){return(a&&("box-flex" in a))
}else{return false
}}}},_isCompBasedWidth:function(){return !this._isLayoutBasedWidth()
},_isCompBasedHeight:function(){return !this._isLayoutBasedHeight()
},_getImplicitDimensions:function(){return[]
},_getParentLayoutOrientation:function(){var a=this._element.getParents("[hasproxy]")[0];
if(a&&a.getViewProxy().getLayoutOrientation){return a.getViewProxy().getLayoutOrientation()
}},getProxyMetaTags:function(){return[]
},hasMetaTag:function(a){return this.getProxyMetaTags().contains(a)
},_getDefaultPosition:function(){return""
},getCompLogic:function(){return this._componentLogic
},getElement:function(){return this._element
},getSourceSize:function(){return undefined
},hasFixedAspectRatio:function(){return false
},getAspectRatio:function(){return NaN
},dispose:function(){if(this._disposed){return
}if(this._dataItem){this._dataItem.removeEvent(Constants.DataEvents.DATA_CHANGED,this._onComponentDataChanged)
}if(this._children){this._children.forEach(function(a){a.dispose()
})
}if(this._componentLogic){this._componentLogic.dispose()
}if(this._deactivateResizeMechanism){this._deactivateResizeMechanism(this._element)
}if(this._styleObj){this._styleObj.removeEvent(Constants.StyleEvents.PROPERTY_CHANGED,this._onStyleChangeInternal);
this._styleObj.removeEvent(Constants.StyleEvents.SKIN_CHANGED,this._onSkinChange);
this._styleObj=null
}this._dataItem=null;
this._componentLogic=null;
this._element.destroy();
this._element=null;
this.parent()
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.WProxy",imports:[],traits:["wixapps.integration.proxies.WIntegrationTrait","wixapps.integration.proxies.traits.ProxyPropertyChangeTrait"],Class:{Extends:"wixapps.core.views.proxies.Proxy"}});
W.Classes.newClass({name:"wixapps.integration.proxies.ZoomLinkProxy",imports:[],traits:[],Class:{Extends:"wixapps.integration.proxies.layout.BoxLayoutProxy",Binds:["_onClicked"],createComponent:function(){var a=this.parent();
a.addEvent("click",this._onClicked);
return a
},_getContainerElementType:function(){return"a"
},_dispose:function(){if(this._element){this._element.removeEvent("click",this._onClicked)
}},_onClicked:function(){var e=this._data;
var c=this._def.getChildValue("listExpression");
var f=c?this._viewContext.evaluatePath(c).getChildren():[e];
var d=this._def.getChildValue("idField")||"_iid";
var b=this._def.getChildValue("titleField")||"title";
var a=this._getZoomParams(f,e,b,d);
this.fireEvent("wix:zoom-link:open-zoom",{zoomParams:a});
return false
},_getZoomParams:function(c,e,g,d){g=g||"title";
d=d||"_iid";
var f=e.getChildByRef(d).getValue();
var b=c.map(function(h){return{id:h.getChildByRef(d).getValue(),title:h.getChildByRef(g).getValue()}
});
var a=b.getIndexByField("id",f);
return{list:b,selectedIndex:a}
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.layout.BoxLayoutProxy",imports:[],traits:["wixapps.integration.utils.FlexBoxIESupport"],Class:{Extends:"wixapps.integration.proxies.layout.CssLayoutProxy",_prefix:"",_orientation:"vertical",_spacers:[],_alignPropMap:{vertical:{left:"start",center:"center",right:"end"},horizontal:{top:"start",middle:"center",bottom:"end",left:"start",center:"center",right:"end",baseline:"baseline"}},createComponent:function(){this._orientation=this._def.getChildValue("orientation")||this._getDefaultOrientation();
return this.parent()
},getLayoutOrientation:function(){return this._orientation
},_getDefaultOrientation:function(){return((this._def.getChildValue("name")==="HBox")?"horizontal":"vertical")
},_setupBox:function(a){if(Modernizr.flexbox!==true){this.applyIESupport()
}this.parent();
setTimeout(this._finalizeLayout.bind(this),1000)
},_processLayoutDef:function(b){this._applyDisplayStyle(this._orientation,b);
this._processBoxFlex(this._element,b);
var a=this._def.getChildValue("box-align");
if(a){b["box-align"]=this._translateBoxAlignValues(this._orientation,a)
}return b
},_translateBoxAlignValues:function(a,b){return this._alignPropMap[a][b]
},_processChildLayoutDef:function(a,b){if(Browser.firefox){if(this._orientation=="horizontal"&&!("height" in a)){a.height="100%"
}else{if(this._orientation=="vertical"&&!("width" in a)){a.width="100%"
}}}this._processBoxFlex(this._components[b],a);
this._processSpacers(this._components[b],a,b);
return a
},_applyDisplayStyle:function(b,c){if(c.display===undefined){c.display=this._processCssProp("box")
}var a=this._processCssProp("box-orient");
c[a]=b
},_processBoxFlex:function(a,b){if(b["box-flex"]!==undefined&&b.width===undefined&&this._orientation==="horizontal"&&this._prefix==="-webkit-"){b.width="0"
}},_processSpacers:function(b,c,a){this._processSpacer(b,c,a,"before");
this._processSpacer(b,c,a,"after")
},_processSpacer:function(d,l,g,k){var b=k=="before"?"spacerBefore":"spacerAfter";
var c=l[b]!==undefined?l[b]:l.spacer;
if(c===undefined){c="none"
}var o=this._spacers[g]||{};
if(!d){c="none"
}else{if(d.getViewProxy){var e=d.getViewProxy().getViewDefinition().getChildValue("hidden");
if(e===true||e==="true"){c="none"
}}}if(o[k]&&(c=="none")){this._element.removeChild(o[k]);
delete o[k]
}else{if(!o[k]&&c!="none"){var m=this._children[g].getFieldId()+"_spacer_"+k;
var j={id:m,comp:{name:this._orientation=="vertical"?"VSpacer":"HSpacer"},layout:{}};
var f=this._viewContext.getEnvironment();
var a=f.getDataItemFactory().createDataItem(j);
var i=f.getProxyFactory().createProxyFromItemDefinition(this._viewContext,a).proxy;
var h=i.createComponent();
h.updateSize=function(q){a.getChildByRef("comp").getChildByRef("size").setValue(q)
};
o[k]=h;
if(k=="before"){this._element.insertBefore(h,this._components[g])
}else{var n=this._components[g].nextSibling;
if(n){this._element.insertBefore(h,n)
}else{this._element.appendChild(h)
}}a.getChildByRef("comp").addChild(c,"size");
var p=a.getChildValue("layout");
this._applyStyle(h,p);
this._processBoxFlex(h,p);
i.setupProxy()
}else{if(!o[k]&&c=="none"){return
}else{o[k].updateSize(c)
}}}this._spacers[g]=o
},_onChildLayoutPropertyChange:function(a){for(var c=0;
c<a.length;
c++){var b=a[c];
var e=b.path[0];
var f=parseInt(b.path[2]);
if(!isNaN(f)){var d={};
d[e]=b.item.getValue();
if(e=="spacer"||e=="spacerBefore"){this._processSpacer(this._components[f],d,f,"before")
}if(e=="spacer"||e=="spacerAfter"){this._processSpacer(this._components[f],d,f,"after")
}}}this.parent(a)
},_finalizeLayout:function(){}}});
W.Classes.newClass({name:"wixapps.integration.proxies.layout.CssLayoutProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.WCompositeProxy",_nativeEvents:[],createComponent:function(){var a=this._createElement(this._getContainerElementType());
this._nativeEvents.forEach(function(b){a.addEvent(b.type,b.fn)
});
this._createChildComponents(a);
return a
},_createChildComponents:function(a){this._createChildProxies();
a.set("html","");
this.parent(a);
var c=this._def.getChildByRef("items");
if(c){var b=c.getChildren()
}this._children.forEach(function(d,f){var g=b[f].getChildValue("layout");
if(g){var e=this._components[f];
if(g.hasOwnProperty("width")&&!(String(g.width).contains("%"))){e.setAttribute("width",parseInt(g.width))
}if(g.hasOwnProperty("height")&&!(String(g.height).contains("%"))){e.setAttribute("height",parseInt(g.height))
}}}.bind(this))
},_getContainerElementType:function(){return"div"
},_onProxySetup:function(){this._setupBox(this._element)
},_setupBox:function(a){this._applyLayoutsAsCss()
},_applyLayoutsAsCss:function(){var d={};
if(!this._def.getParent().getParent()){d=this._def.getParent().getChildValue("layout")||{}
}d=this._processLayoutDef(d)||d;
this._applyStyle(this._element,d);
var c=this._def.getChildValue("childLayout")||{};
this._components.forEach(function(e){this._applyStyle(e,c)
}.bind(this));
var b=this._def.getChildByRef("items");
if(b){var a=b.getChildren();
this._children.forEach(function(e,f){var g=a[f].getChildValue("layout")||{};
g=this._processChildLayoutDef(g,f)||g;
this._applyStyle(this._components[f],g)
}.bind(this))
}},_processLayoutDef:function(a){return a
},_processChildLayoutDef:function(a,b){return a
},_registerProxyEvents:function(b,a){this.parent(b,a);
this._nativeEvents.push({type:b,fn:a})
},_onChildLayoutPropertyChange:function(a){if(this._isReloadRequired()){this._createChildComponents(this._element);
this.setupProxy();
return
}if(this._element){var e;
for(var c=0;
c<a.length;
c++){var b=a[c];
var d=b.path[0];
var f=parseInt(b.path[2]);
e={};
e[d]=b.item.getValue();
this._applyStyle(this._components[f],e)
}}}}});
W.Classes.newClass({name:"wixapps.integration.proxies.layout.FixedRatioLayoutProxy",imports:[],traits:[],Class:{Extends:"wixapps.integration.proxies.layout.BoxLayoutProxy",Binds:["_onAppResize"],_onAppResize:function(){this._updateLayoutSize()
},_onAppViewCreated:function(){this._updateLayoutSize()
},getAspectRatio:function(){return this._def.getChildValue("aspectRatio")||1
},hasFixedAspectRatio:function(){return true
},_updateLayoutSize:function(){var d=this.getAspectRatio();
aspectRatio=parseFloat(d);
if(d=="golden"){aspectRatio=1.61803
}var b=this._element.getSize();
if(this._isLayoutBasedWidth()){var a=Math.floor(b.x/aspectRatio);
this._element.setStyle("height",a)
}else{var c=Math.floor(b.y*aspectRatio);
this._element.setStyle("width",c)
}}}});
W.Classes.newClass({name:"wixapps.integration.proxies.layout.StackLayoutProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.layout.CssLayoutProxy",_processLayoutDef:function(a){a.position="relative"
},_processChildLayoutDef:function(c,b){var a="absolute";
if(b==0){a=(this._def.getChildValue("stackType")=="layout"?"absolute":"static")
}c.position=c.position||a;
c.left=c.left||"0px";
c.top=c.top||"0px"
}}});
W.Classes.newClass({name:"wixapps.integration.proxies.layout.ZoomLayoutProxy",imports:[],Class:{Extends:"wixapps.integration.proxies.layout.CssLayoutProxy",initialize:function(b,d,c,a){if(b&&d&&c){this.parent(b,d,c,a)
}},renderZoomLayout:function(c,b){var a=this;
c=c||window.innerWidth-200;
b=b||window.innerHeight-82;
this._element.setStyles({position:"absolute"});
this.updateLayoutWhenReady(function(){window.requestAnimFrame(function(){a._expandElements(a._element,c,b,function(){a.updateLayoutWhenReady(function(){var d=a._viewContext.getEnvironment().getEventsDispatcher();
d.fireEvent(Constants.WixAppEvents.APP_VIEW_READY);
d.fireEvent(Constants.WixAppEvents.APP_ZOOM_READY)
})
})
})
})
},_expandElements:function(a,g,f,h){var d;
var b;
var c=this;
var e=c._getExpandingElements(a)[0];
if(e){c._deactivateChildResizeMechanism(e);
d=Math.max(parseInt(g*0.5),parseInt(f*0.5));
b=Math.max(parseInt(g),parseInt(f));
c._setElementSize(e,d);
window.requestAnimFrame(function(){var i=a.getSize();
c._setElementSize(e,b);
window.requestAnimFrame(function(){var k=a.getSize();
var j=c._calculateSize(e,g,f,d,i,b,k);
c._approximateSize(a,e,g,f,j,0,[],function(){c._activateChildResizeMechanism(e);
if(h){h()
}})
})
})
}else{a.setStyles({"max-width":g,"max-height":f});
if(h){h()
}}},_approximateSize:function(a,c,e,d,b,h,f,g){if(!isNaN(b)){this._setElementSize(c,b);
window.requestAnimFrame(function(){var i=a.getSize();
f=f.concat({containerSize:i,trialWidth:b});
if(h<10&&(i.x>e||i.y>d)){this._approximateSize(a,c,e,d,parseInt(b*0.9),h+1,f,g)
}else{this._finishApproximation(c,e,d,f,g)
}}.bind(this))
}else{this._finishApproximation(c,e,d,f,g)
}},_finishApproximation:function(a,c,b,e,f){var d=this._chooseBestSize(e,c,b)||e[e.length-1];
this._setElementSize(a,d.trialWidth);
f()
},_chooseBestSize:function(c,b,a){return c.filter(function(d){return d.containerSize.x<=b
}).sort(function(e,d){return e.containerSize.y-d.containerSize.y
})[0]
},_calculateSize:function(d,h,i,f,j,e,g){var b=this._solveLinearEq(f,j.x,e,g.x);
var a=this._solveLinearEq(f,j.y,e,g.y);
var k=this._getAspectRatio(d);
var c;
if(b.a==0){c=h
}else{if(k>1){c=parseInt((h-b.b)/b.a,10)
}else{c=parseInt(Math.min((h-b.b)/b.a,(i-a.b)*k),10)
}}return c
},_activateChildResizeMechanism:function(a){if(a.getViewProxy){var b=a.getViewProxy();
if(b&&b._activateResizeMechanism){b._activateResizeMechanism()
}}},_deactivateChildResizeMechanism:function(a){if(a.getViewProxy){var b=a.getViewProxy();
if(b&&b._deactivateResizeMechanism){b._deactivateResizeMechanism(a)
}}},_solveLinearEq:function(f,h,e,g){var d=(g-h)/(e-f);
var c=h-(f*d);
return{a:d,b:c}
},_getExpandingElements:function(a){return a.getElements("[hasproxy]").filter(this._getElementExpandProp)
},_getElementExpandProp:function(b){var e=0;
var a=b.getViewProxy();
var d=a.getViewDefinition();
var c=d.getParent().getChildValue("layout");
if(c&&c.zoomExpand){e=parseFloat(c.zoomExpand)
}return e
},_getAspectRatio:function(b){var c=3/2;
var a=b.getViewProxy&&b.getViewProxy();
if(a.getAspectRatio){c=a.getAspectRatio()
}return c
},_setElementSize:function(c,d){var e=this._getAspectRatio(c);
if(c.getViewProxy){var b=this._getDataSizeInfo(c.getViewProxy());
if(b){d=Math.min(d,b.width)
}}c.setStyle("width",d);
var f=c.getSize().x;
var a=f/e;
c.setStyle("height",a)
},_getDataSizeInfo:function(a){var b=a.getViewContext().getData().getValue();
if("width" in b&&"height" in b){return b
}}}});
W.Classes.newClass({name:"wixapps.integration.proxies.layout.ZoomLayoutProxy2",imports:["wixapps.integration.utils.LayoutGeometryMap"],Class:{Extends:"wixapps.integration.proxies.layout.CssLayoutProxy",_geometryMap:null,_childProxiesWithAspectRatioCache:null,_resizableProxiesCache:null,_richContentListCache:null,_richContentProxies:["wixapps.integration.proxies.ImageProxy","wixapps.integration.proxies.VideoProxy"],initialize:function(b,d,c,a){if(b&&d&&c){this.parent(b,d,c,a);
this._geometryMap=new this.imports.LayoutGeometryMap()
}},renderZoomLayout:function(e,d){var c=this;
this._resetCaches();
e=e||window.innerWidth-200;
d=d||window.innerHeight-82;
var b=this._element.children[0];
var a=this._element.getParents('[skinpart="blockingLayer"]')[0]||this._element;
this._getResizableProxies(b).each(this._deactivateChildResizeMechanism);
this._limitSizeToNative(b);
this._element.setStyles({position:"absolute"});
a.setStyle("overflow","hidden");
this.updateLayoutWhenReady(function(){window.requestAnimFrame(function(){c._contractContainer(b,e,d,function(){c.updateLayoutWhenReady(function(){c._getResizableProxies(b).each(c._activateChildResizeMechanism);
var f=c._viewContext.getEnvironment().getEventsDispatcher();
f.fireEvent(Constants.WixAppEvents.APP_VIEW_READY);
f.fireEvent(Constants.WixAppEvents.APP_ZOOM_READY);
a.setStyle("overflow","auto")
})
})
})
})
},_resetCaches:function(){this._childProxiesWithAspectRatioCache=null;
this._resizableProxiesCache=null;
this._richContentListCache=null
},_contractContainer:function(b,f,e,g){var d=this;
var c=7;
var a=4;
d._childProxiesWithAspectRatioCache=null;
d._checkContainerSizes(b,0,f,c,function(i){var h=d._findBestFit(i,f,e);
d._checkContainerSizes(b,h[0].appliedWidth,h[1].appliedWidth,a,function(j){var k=d._findBestFit(j,f,e);
d._setContainerWidth(b,k[0].appliedWidth);
window.requestAnimFrame(function(){d._recalcChildProxiesAspectRatio(b);
g()
})
})
})
},_checkContainerSizes:function(b,e,d,a,f){var c=Math.floor((d-e)/a);
if(c==0){f([{width:e},{width:d}])
}else{this._checkContainerSizesRecursive(b,d,c,a,[],f)
}},_checkContainerSizesRecursive:function(c,e,b,a,f,g){var d=this;
this._setContainerWidth(c,e);
window.requestAnimFrame(function(){d._recalcChildProxiesAspectRatio(c);
window.requestAnimFrame(function(){d._geometryMap.updateMap(c);
var i=d._geometryMap.get(c);
var h=f.concat({appliedWidth:e,width:i.width,height:i.height,richContentArea:d._calcRichContentArea(c,i.width,i.height),overflowCount:d._getOverflowCount(c),index:f.length});
if(a>0){d._checkContainerSizesRecursive(c,e-b,b,a-1,h,g)
}else{g(h)
}})
})
},_findBestFit:function(f,e,d){var g=f.slice(0).sort(this._getSizeInfoCmpFunc(e,d));
var b=g[0];
var c=(b.index<f.length-1?b.index+1:b.index-1);
var a=f[c];
return[b,a]
},_getSizeInfoCmpFunc:function(b,a){var c=b/a;
return function(f,e){var d=0;
if(f.height>a&&e.height<=a){d=1
}else{if(e.height>a&&f.height<=a){d=-1
}else{if(d==0){if(f.height<=a&&e.height<=a){d=f.overflowCount-e.overflowCount;
if(d==0){if(f.richContentArea>0&&e.richContentArea>0){d=e.richContentArea-f.richContentArea;
if(d==0){d=f.width-e.width
}}else{var h=f.width/f.height;
var g=e.width/e.height;
d=Math.abs(h-c)-Math.abs(g-c)
}}}else{d=f.height-e.height;
if(d==0){d=f.width-e.width
}}}}}return d
}
},_setContainerWidth:function(a,b){a.setStyle("width",b)
},_recalcChildProxiesAspectRatio:function(a){this._getChildProxiesWithAspectRatio(a).each(function(e){var d=e.getElement();
var c=d.getSize();
var b=Math.round(c.x/e.getAspectRatio());
d.setStyle("height",b)
})
},_getChildProxiesWithAspectRatio:function(a){if(!this._childProxiesWithAspectRatioCache){this._childProxiesWithAspectRatioCache=a.getElements("[hasproxy]").map(function(b){return b.getViewProxy()
}).filter(function(b){return b.hasFixedAspectRatio()
})
}return this._childProxiesWithAspectRatioCache
},_getResizableProxies:function(a){if(!this._resizableProxiesCache){this._resizableProxiesCache=a.getElements("[hasproxy]").filter(function(b){return Boolean(b.getViewProxy()._activateResizeMechanism)
})
}return this._resizableProxiesCache
},_getRichContentList:function(a){if(!this._richContentListCache){this._richContentListCache=a.getElements("[hasproxy]").filter(function(b){return(this._richContentProxies.contains(b.getViewProxy().getOriginalClassName()))
}.bind(this))
}return this._richContentListCache
},_calcRichContentArea:function(a,d,c){var b=this;
return this._getRichContentList(a).reduce(function(f,e){var g=b._geometryMap.get(e);
g.left=Math.max(0,g.left);
g.right=Math.min(d,g.right);
g.top=Math.max(0,g.top);
g.bottom=Math.min(c,g.bottom);
return f+((g.right-g.left)*(g.bottom-g.top))
},0)
},_getOverflowCount:function(a){return a.getElements("[hasproxy]").reduce(function(c,b){return((this._isOverflowElement(a,b)===true)?c+1:c)
}.bind(this),0)
},_isOverflowElement:function(a,b){var d=b.getParents("[hasproxy]");
var c=d.indexOf(a);
if(c>-1){return d.slice(0,c+1).some(function(h){var g=this._geometryMap.get(h);
var f=this._geometryMap.get(b);
var e=this._isCoordIntersection(g,f);
return e
}.bind(this))
}},_isCoordIntersection:function(b,a){return !(a.left>=b.left&&a.right<=b.right&&a.top>=b.top&&a.bottom<=b.bottom)
},_activateChildResizeMechanism:function(a){if(a.getViewProxy){var b=a.getViewProxy();
if(b&&b._activateResizeMechanism){b._activateResizeMechanism()
}}},_deactivateChildResizeMechanism:function(a){if(a.getViewProxy){var b=a.getViewProxy();
if(b&&b._deactivateResizeMechanism){b._deactivateResizeMechanism(a)
}}},_limitSizeToNative:function(b){var c=this;
var a=b.getElements("[hasproxy]").map(function(d){return{element:d,nativeSize:d.getViewProxy().getSourceSize()}
}).filter(function(d){return !(d.nativeSize===undefined)
});
a.each(function(d){d.element.setStyle("max-width",d.nativeSize.width)
})
}}});
W.Classes.newTrait({name:"wixapps.integration.proxies.traits.AppsLinkTrait",trait:{_updateLinkDataItems:function(a){if(this._data.getTypeName()!="wix:RichText"){return
}var b=this._data.getChildValue("links");
for(var c=0;
c<b.length;
c++){if(!W.Data.getDataByQuery("#"+b[c].linkId,function(){})){this._createWLink(b[c],a)
}}},_updateAnchorLink:function(b,d){var c=this._createWLink(d);
b.set("href",c.get("href"));
var e=c.get("target");
if(W.Viewer.isPublicMode()&&e){b.set("target",e)
}else{b.set("target",d._type.match(/^wix:(PageLink|MailLink)$/)?"_self":"_blank")
}},_createWLink:function(c,a){var d={type:"TextLink"};
a=a||W.Data;
switch(c._type){case"wix:PageLink":d.linkType="PAGE";
d.target="_self";
d.href="#!"+a.getDataByQuery("#"+c.pageId,function(){}).get("pageUriSEO")+"/"+c.pageId;
break;
case"wix:ExternalLink":d.linkType="WEBSITE";
d.target=c.target;
d.href=c.protocol+"://"+c.address;
break;
case"wix:DocLink":d.linkType="DOCUMENT";
d.href=W.Config.getServiceTopologyProperty("staticMediaUrl").replace("/media","/ugd")+"/"+c.docId;
d.text=c.docName;
d.target="_blank";
break;
case"wix:MailLink":d.linkType="EMAIL";
d.target="_self";
d.href="mailto:"+c.email;
d.text=c.subject;
break
}var b=a.addDataItem(c.linkId,d);
b.setMeta("isPersistent",false);
return b
},_createAppsLink:function(b){var c=this._viewContext.getEnvironment().getDataItemFactory();
var d={linkId:b.get("id")};
var a;
switch(b.get("linkType")){case"PAGE":d._type="wix:PageLink";
d.pageId=b.get("href").split("/")[1];
break;
case"WEBSITE":d._type="wix:ExternalLink";
d.target=b.get("target");
a=b.get("href").split("://");
d.protocol=a[0];
d.address=a[1];
break;
case"DOCUMENT":d._type="wix:DocLink";
a=b.get("href").split("/");
d.docId=a[a.length-1];
d.docName=b.get("text");
break;
case"EMAIL":d._type="wix:MailLink";
d.email=b.get("href").split(":")[1];
d.subject=b.get("text");
break
}return c.createDataItem(d)
},_CHARS:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),generateLinkId:function(g){var f=this._CHARS,d=[],c=0,e;
for(var b=0;
b<8;
b++){if(c<=2){c=33554432+(Math.random()*16777216)|0
}e=c&15;
c=c>>4;
d[b]=f[(b==19)?(e&3)|8:e]
}var a=d.join("");
return g+"_"+a
}}});
W.Classes.newTrait({name:"wixapps.integration.proxies.traits.ProxyPropertyChangeTrait",trait:{Binds:[],_propHandlers:{},_compProperties:[],initialize:function(){this._setupDefaultHandlers();
this._setupPropertyHandlers()
},_handleProperty:function(b,a){this._propHandlers[b]=a
},_handleProperties:function(b,a){b.forEach(function(c){this._handleProperty(c,function(){a.call(this)
})
}.bind(this))
},_mapToCompProperty:function(c,b,a){b=b||c;
this._compProperties.push({propName:c,compPropName:b,setterFunc:a});
this._handleProperty(c,function(d){this._componentLogic.setComponentProperty(b,a?a(d):d)
})
},_mapToCompProperties:function(a){a.forEach(function(b){this._mapToCompProperty(b)
}.bind(this))
},_setupPropertyHandlers:function(){},_setupDefaultHandlers:function(){this._handleProperty("enabled",function(a){this._updateComponentState()
});
this._handleProperty("style",function(a){this._updateCompStyle()
});
this._handleProperty("css",function(a){this._applyCssNode(this._element)
});
this._handleProperty("hidden",function(a){if(a=="true"||a===true){this._element.collapse()
}else{this._element.uncollapse()
}});
this._handleProperty("cssClass",function(a){var b=this._cssClass;
if(a!=b){this._cssClass=a;
if(b){this._element.removeClass(b)
}if(a){this._element.addClass(a)
}}})
},_onDefPropertyChanged:function(a){var c;
var d;
for(var b=0;
b<a.length;
b++){d=a[b].path[0];
c=this._propHandlers[d];
if(c){c.call(this,this._def.getChildValue(d))
}}},_createCompProperties:function(){var b=this._getPropSchemaName();
var a={};
if(b){a={type:b}
}this._compProperties.forEach(function(c){var d=this._def.getChildValue(c.propName);
a[c.compPropName]=c.setterFunc?c.setterFunc(d):d
}.bind(this));
return a
},_updateCompProperties:function(a){var c=this._getPropMap();
var b=this._def;
a.forEach(function(d){var f=d.path[0];
var e=c[f];
if(e){this._componentLogic.setComponentProperty(e,this._processPropValue(f,b.getChildValue(f)))
}}.bind(this))
},_processPropValue:function(a,b){return b
},_getPropMap:function(){return{}
},_getPropSchemaName:function(){},_updateCompStyle:function(){var a=this._def.getChildValue("style")||this._getDefaultStyleName();
if(a){W.Theme.getStyle(a,function(b){if(b){this._componentLogic.setStyle(b);
this._registerStyleChangeHandler()
}}.bind(this),this._getDefaultSkinName())
}},_updateComponentState:function(){var a=this._def.getChildValue("enabled");
if(a!==undefined){if(a==="false"||a===false){this._componentLogic.disable()
}else{this._componentLogic.enable()
}}},_applyCssNode:function(a){var b=this._def.getChildValue("css");
if(b){this._applyStyle(a,b)
}}}});
W.Classes.newTrait({name:"wixapps.integration.proxies.traits.WDataExchangeTrait",trait:{initialize:function(){},_convertWItemDataToRawData:function(d){var b=["metaData"];
var a={array:Array,object:Object};
var c=function(g){var h=typeOf(g);
if(h=="array"||h=="object"){var e=a[h];
var f=g;
if(h=="object"&&g.hasOwnProperty("_data")){f=g._data
}var i=e.filter(f,function(k,j){return !(b.contains(j))
});
return e.map(i,function(j){return c(j)
})
}else{return g
}};
return c(d)
},_rawDataEquals:function(b,a){return JSON.stringify(b)==JSON.stringify(a)
}}});
W.Data.registerDataTypeSchema("AppBuilderComponent",{appInnerID:"string",appPartName:"string"});
W.Data.registerDataTypeSchema("AppPage",{title:"string",hideTitle:"boolean",icon:"string",windowTitle:"string",descriptionSEO:"string",metaKeywordsSEO:"string",pageTitleSEO:"string",pageUriSEO:"string",hidePage:"boolean",underConstruction:"boolean",tpaApplicationId:"number",pageSecurity:{type:"object","default":{requireLogin:false,passwordDigest:""}},appPageId:"string",appInnerID:"number"});
W.Data.registerDataTypeSchema("AppPart",{appInnerID:"string",appLogicParams:"object",appLogicCustomizations:"array",appPartName:"string",viewName:"string"});
W.ComponentData.registerDataTypeSchema("ClippedParagraphProperties",{minLines:{type:"number","default":0},maxLines:{type:"number","default":0},pack:{type:"string","enum":["top","bottom","middle","none"],"default":"none"},showTooltip:{type:"boolean","default":false}});
W.Data.registerDataTypeSchema("Icon",{url:"string",width:"number",height:"number",title:"string"});
W.Data.registerDataTypeSchema("MultiSelectableList",{items:"refList",selected:"refList"});
W.Skins.newSkin({name:"wixapps.integration.skins.ExpanderSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_params:[{id:"tdr",type:Constants.SkinParamTypes.URL,defaultTheme:"BASE_THEME_DIRECTORY"},{id:"sel",type:Constants.SkinParamTypes.OTHER,defaultValue:"-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;"}],_html:'<div skinPart="icon"></div><div skinPart="summary" class="label"></div><div skinPart="content"></div>',_css:["{ width: 100%; height: 100%; }","%icon% {cursor: pointer;  height: 10px; width:10px;  display:inline-block; vertical-align: 50%; margin-right: 5px}",'[state="collapsed"] > %icon% { background: transparent url([tdr]arrow-left.png) no-repeat; }','[state="expand"] > %icon% { background: transparent url([tdr]arrow-down.png) no-repeat; }',"%summary% { display:inline-block; cursor: pointer; [sel]; width: 90%}",'[state="collapsed"] > %content% { display: none;}','[state="expand"] > %content% { display: block; margin-top: 3px;}']}});
W.Skins.newSkin({name:"wixapps.integration.skins.IconSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_html:'<img skinPart="img"></img>',_css:[]}});
W.Skins.newSkin({name:"wixapps.integration.skins.LinkSelectorSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_params:[{id:"baseThemeDir",type:Constants.SkinParamTypes.URL,defaultTheme:"BASE_THEME_DIRECTORY"}],_html:'<p skinPart="description"></p>',_css:["%description% { background:transparent url([baseThemeDir]wix_apps/link-selector-button.png) left center no-repeat; cursor:pointer; padding-bottom: 3px; padding-left:20px; min-width:1px; min-height:16px; }"]}});
W.Skins.newSkin({name:"wixapps.integration.skins.TextAreaSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_tags:[],_params:[{id:"shadowColor",type:Constants.SkinParamTypes.COLOR_ALPHA,defaultValue:"0,0,0,.3"}],_html:'<div class="clearfix"><label skinpart="label"></label><textarea skinpart="input" ></textarea><div skinpart="message"></div></div>',_css:["%.clearfix% {height:100%}","%input% {width:100%; height:100%; padding:12px; line-height: 1.3em;  font-size:1em; border: 1px solid #e3e3e3; box-shadow: 0 1px 1px 0 [shadowColor] inset;}","%input%:hover{border-color: #a3d9f6; }","%input%:focus{border-color: #19a0e9; }",'[state~="hasLabel"] %label% {display:block; padding-bottom: 5px;}',"[disabled] %label% {opacity:0.5}",'[state~="invalid"] input%input%{background: #f6e0dd; border-color: #de4c3a}','[state~="invalid"] %message% {color: #de4c3a; font-size: .916em;}',"input%input%.isPlaceholder{color: #999;}"]}});
W.Skins.newSkin({name:"wixapps.integration.skins.ToggleSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_params:[{id:"tdr",type:Constants.SkinParamTypes.URL,defaultTheme:"BASE_THEME_DIRECTORY"},{id:"sel",type:Constants.SkinParamTypes.OTHER,defaultValue:"-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;"}],_html:'<div skinPart="on" class="label"></div><div skinPart="off"></div>',_css:["{ width: 100%; height: 100%; }",'[state="on"] > %off% { display: none;}','[state="off"] > %off% { display: block; margin-top: 3px; cursor: pointer; } ','[state="on"] > %on% { display: block; margin-top: 3px; cursor: pointer; }','[state="off"] > %on% { display: none;}']}});
W.Skins.newSkin({name:"wixapps.integration.skins.ecommerce.inputs.ComboBoxInputSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_params:[],_html:'<select skinpart="collection"></select>',_css:["{position:relative;}",'[state~="invalid"]:before { content:"!"; position:absolute; text-align:center;bottom:50%; left:-20px; width:20px; height:20px; line-height:20px !important; margin-bottom:-11px;color:#fff; background:#f00; border:2px solid #fff; border-radius:50%; box-shadow:0 1px 3px rgba(0, 0, 0, 0.5); font-size:12px; font-weight:bold; }','[state~="invalid"]:after { content:"►"; position:absolute; bottom:50%; left:3px; margin:0 0 -7px -2px;color:#fff; text-shadow:1px 1px 3px rgba(0, 0, 0, 0.5); font-size:10px; }']}});
W.Skins.newSkin({name:"wixapps.integration.skins.ecommerce.inputs.TextAreaInputSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_params:[{id:"box",type:Constants.SkinParamTypes.OTHER,defaultValue:"box-sizing:border-box; -webkit-box-sizing:border-box -moz-box-sizing:border-box;"},{id:"bg",type:Constants.SkinParamTypes.BG_COLOR,defaultValue:"#ffffff",enableEdit:true},{id:"brd",type:Constants.SkinParamTypes.COLOR_ALPHA,defaultValue:"#e3e3e3",enableEdit:true},{id:"brw",type:Constants.SkinParamTypes.SIZE,defaultValue:"1px"},{id:"brdh",type:Constants.SkinParamTypes.COLOR_ALPHA,defaultValue:"#a3d9f6",enableEdit:true},{id:"brdf",type:Constants.SkinParamTypes.COLOR_ALPHA,defaultValue:"#19a0e9",enableEdit:true},{id:"txt",type:Constants.SkinParamTypes.COLOR,defaultValue:"#000000",enableEdit:true},{id:"rd",type:Constants.SkinParamTypes.BORDER_RADIUS,defaultValue:"0px"}],_html:'<textarea skinPart="textarea"></textarea>',_css:["{ position:relative;}","%textarea% {text:[txt] [box] [bg] [rd] resize: none; width:100%  !important; min-height:100px; height:100%; overflow:auto; font-size:14px; border:[brw] solid [brd]; box-shadow: 0 1px 1px 0 rgba(0,0,0,.3) inset; }","%textarea%:hover {border-color: [brdh]; }","%textarea%:focus {border-color: [brdf]; }",'[state~="invalid"]:before { content:"!"; position:absolute; text-align:center; bottom:50%; left:-20px; width:20px; height:20px; line-height:20px !important; margin-bottom:-11px; color:#fff; background:#f00; border:2px solid #fff; border-radius:50%; box-shadow:0 1px 3px rgba(0, 0, 0, 0.5); font-size:12px; font-weight:bold; }','[state~="invalid"]:after { content:"►"; position:absolute; bottom:50%; left:3px; margin:0 0 -7px -2px;color:#fff; text-shadow:1px 1px 3px rgba(0, 0, 0, 0.5); font-size:10px; }']}});
W.Skins.newSkin({name:"wixapps.integration.skins.ecommerce.options.ColorOptionSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_params:[],_html:'<div skinPart="tooltip" skin="wixapps.integration.skins.ecommerce.options.InfoTipSkin"></div><div class="olo"></div>',_css:["%.olo% { height:20px; position:relative; }",'[state~="selected"] %.olo%:after { content:"▼"; position:absolute; left:50%; bottom:-10px; margin-left:-6px; color:#444; font-weight:bold; font-size:12px; font-family:Arial; line-height:1;  }','[state~="disabled"] { display:none; }',"%tooltip%           { min-width:100px !important; margin:-4px 0 0 16px; font-size:12px; text-transform:uppercase; text-align:center; }",'%tooltip%:after     { content:"▼"; position:absolute; left:50%; bottom:-10px; margin-left:-6px;  color:#fffedf; font-size:12px; font-family:Arial; line-height:1; text-shadow:0 1px 2px rgba(0, 0, 0, 0.5); }']}});
W.Skins.newSkin({name:"wixapps.integration.skins.ecommerce.options.InfoTipSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_tags:[],_params:[{id:"bgcolor",type:Constants.SkinParamTypes.OTHER,defaultValue:"#fffedf"},{id:"txtcolor",type:Constants.SkinParamTypes.OTHER,defaultValue:"#656565"},{id:"fnt",type:Constants.SkinParamTypes.OTHER,defaultValue:'font-family: "Helvetica Neue", Helvetica, Arial,sans-serif; font-size:12px; line-height:16px; '},{id:"shd",type:Constants.SkinParamTypes.BOX_SHADOW,defaultValue:"0 1px 4px rgba(0, 0, 0, 0.6);"},{id:"rd",type:Constants.SkinParamTypes.BORDER_RADIUS,defaultValue:"5px"},{id:"max",type:Constants.SkinParamTypes.OTHER,defaultValue:"min-height:10px; min-width:10px; max-width:300px;"}],_html:'<div class="toolTipContainer"><p skinPart="content"></p></div>',_css:["{  [fnt][rd][shd][max] color:[txtcolor]; background:[bgcolor]; position:absolute;  padding:5px; top:0px; left: 0px;}","p {display:block; margin:0 0 5px 0; }","strong, b, i, big { font-size:12px; }",'[state~="hidden"] {visibility:hidden!important;}']}});
W.Skins.newSkin({name:"wixapps.integration.skins.ecommerce.options.OptionsListInputSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_params:[],_html:"",_css:["{position:relative;}"," > div { border:1px solid #444; display:inline-block; min-width:30px; line-height:20px; height:20px; margin:0 3px; text-align:center; text-transform:uppercase; cursor:pointer; }"," > div:first-child { margin-left:0; }"," > div:last-child { margin-right:0; }",'[state~="invalid"]:before { content:"!"; position:absolute; text-align:center;bottom:50%; left:-20px; width:20px; height:20px; line-height:20px !important; margin-bottom:-11px;color:#fff; background:#f00; border:2px solid #fff; border-radius:50%; box-shadow:0 1px 3px rgba(0, 0, 0, 0.5); font-size:12px; font-weight:bold; }','[state~="invalid"]:after { content:"►"; position:absolute; bottom:50%; left:3px; margin:0 0 -7px -2px;color:#fff; text-shadow:1px 1px 3px rgba(0, 0, 0, 0.5); font-size:10px; }']}});
W.Skins.newSkin({name:"wixapps.integration.skins.ecommerce.options.TextOptionSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_params:[],_html:'<div skinPart="tooltip" skin="wixapps.integration.skins.ecommerce.options.InfoTipSkin"></div><div skinPart="size"/>',_css:["{ background:#fff;  }","%size% {  position:relative; }",'[state~="selected"] %size%:after { content:"▼"; position:absolute; left:50%; bottom:-10px; margin-left:-6px; color:#444; ont-weight:bold; font-size:12px;  font-family:Arial; line-height:1;  }','[state~="disabled"] { display:none; }',"%tooltip%           { min-width:100px !important; margin:-4px 0 0 16px; font-size:12px; text-transform:uppercase; text-align:center; }",'%tooltip%:after     { content:"▼"; position:absolute; left:50%; bottom:-10px; margin-left:-6px;  color:#fffedf; font-size:12px; font-family:Arial; line-height:1; text-shadow:0 1px 2px rgba(0, 0, 0, 0.5); }']}});
W.Skins.newSkin({name:"wixapps.integration.skins.inputs.LocationSelectorSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_tags:[],_params:[{id:"baseThemeDir",type:Constants.SkinParamTypes.URL,defaultTheme:"BASE_THEME_DIRECTORY"}],_html:'<div class="clearfix"><div skinpart="container"><input skinpart="address" type="text" /><div skinpart="viewMode"></div></div><div skinpart="message"></div></div>',_css:["%container% { height:30px; line-height:30px; padding-right:35px; position:relative; }","%address% { width:100% }","%viewMode% { width:30px; height:30px; position:absolute; right:0px; top:0px; }",'[state~="loading"] %viewMode% { background:transparent url([baseThemeDir]wix_apps/loading.gif) center center no-repeat; }','[state~="error"] %viewMode% { background:transparent url([baseThemeDir]wix_apps/icon_x.png) center center no-repeat; }','[state~="found"] %viewMode% { background:transparent url([baseThemeDir]wix_apps/icon_v.png) center center no-repeat; }','[state~="search"] %viewMode% { background:transparent url([baseThemeDir]wix_apps/spy_glass.png) center center no-repeat; cursor:pointer; }','[state~="invalid"] %message% { height:20px; line-height:20px; color:#d00; font-size:12px; }']}});
W.Skins.newSkin({name:"wixapps.integration.skins.inputs.TimeInputSkin",Class:{Extends:"mobile.core.skins.BaseSkin",_tags:[],_params:[],_html:'<div class="clearfix"><select skinpart="hours24"></select><select skinpart="hours12"></select><select skinpart="minutes"></select><select skinpart="seconds"></select><select skinpart="ampm"></select><div skinpart="message"></div></div>',_css:['[state~="24h"] %hours24% { display: inline; }','[state~="24h"] %hours12% { display: none; }','[state~="24h"] %ampm% { display: none; }','[state~="12h"] %hours24% { display: none; }','[state~="12h"] %hours12% { display: inline; }','[state~="12h"] %ampm% { display: inline; }','[state~="hours"] %minutes% { display: none; }','[state~="hours"] %seconds% { display: none; }','[state~="half-hour"] %seconds% { display: none; }','[state~="quarter-hour"] %seconds% { display: none; }','[state~="minutes"] %minutes% option { display: inline; }','[state~="minutes"] %seconds% { display: none; }','[state~="allowEmpty"] option.empty { display: inline; }','[state~="hideEmpty"] option.empty { display: none; }',"%message% { visibility:hidden; height:20px; line-height:20px; color:#d00; font-size:12px; }",'[state~="invalid"] %message% { visibility:visible; }']}});
W.Classes.newTrait({name:"wixapps.integration.utils.FlexBoxIESupport",trait:{Binds:["_ie_recalcFlexes","_ie_onAppPartResize","_ie_resizeHandler"],Static:{_boxProxies:[]},initialize:function(){},_boxFlexes:[],_boxFlexList:[],_ie_boxAlignCssMap:{vertical:{start:"left",center:"center",end:"right"},horizontal:{start:"top",center:"middle",end:"bottom",baseline:"baseline"}},applyIESupport:function(){this._applyDisplayStyle=this._ie_applyDisplayStyle;
this._processBoxFlex=this._ie_processBoxFlex;
this._finalizeLayout=this._ie_recalcFlexes;
this._ie_replaceResizeEventMechanism(this._element);
Array.forEach(this._element.children,function(b){this._ie_replaceResizeEventMechanism(b)
}.bind(this));
this._registerResizeListeners();
var a=this._getParentBoxProxies();
if(a.length===0){this.addEvent(Constants.WixAppEvents.APP_PART_RESIZE,this._ie_onAppPartResize);
this._finalizeLayout=this._ie_onAppPartResize
}window._boxProxies=window._boxProxies||[];
window._boxProxies.push({proxy:this,depth:a.length})
},_ie_replaceResizeEventMechanism:function(a){if(!a.onresize){a.onresize=function(){a.fireEvent("resize")
}
}},_ie_onAppPartResize:function(){if(this._element){var a=window._boxProxies.sort(function(c,b){return c.depth-b.depth
});
a.reverse().forEach(function(b){b.proxy._ie_onResize()
});
a.forEach(function(b){b.proxy._ie_onResize()
})
}},_registerResizeListeners:function(){this._element.addEvent("resize",this._ie_resizeHandler);
Array.forEach(this._element.children,function(a){a.addEvent("resize",this._ie_resizeHandler)
}.bind(this))
},_ie_resizeHandler:function(){this._ie_onResize()
},_ie_onResize:function(){if(this._element){if(this._orientation==="horizontal"){}this._ie_recalcFlexes()
}},_ie_applyDisplayStyle:function(c,d){var e=(c=="horizontal")?"inline-block":"block";
var a=(c=="horizontal")?"height":"width";
var b={display:e};
var f=this._def.getChildValue("box-align");
var g=(f?this._translateBoxAlignValues(c,f):"start");
if(c==="horizontal"){b["vertical-align"]=this._ie_boxAlignCssMap[c][g]
}else{b["text-align"]=this._ie_boxAlignCssMap[c][g]
}this._applyToChildren(function(h){h.setStyles(b)
});
if(a==="height"&&g=="start"){this._ie_stretchChildrenVertically()
}},_ie_resetChildrenToStretch:function(){if(this._childrenToStretch){this._childrenToStretch.forEach(function(a){a.style.height="";
a.style["min-height"]="0"
})
}},_ie_stretchChildrenVertically:function(){var a=this._element.getSize().y;
this._ie_resetChildrenToStretch();
if(a>0){this._childrenToStretch=this._ie_getChildrenToStretch();
this._ie_getChildrenToStretch().forEach(function(b){b.setStyle("min-height",a-2);
b.setStyle("height","100%")
}.bind(this))
}},_ie_getChildrenToStretch:function(){return Array.filter(this._element.children,function(a){return !a.style.height
})
},_ie_processBoxFlex:function(a,b){if(b["box-flex"]!==undefined&&!this._boxFlexList.contains(a)){this._element.setStyle("white-space","nowrap");
if(b["white-space"]===undefined){b["white-space"]="normal"
}this._boxFlexList.push(a);
this._boxFlexes.push({element:a,flex:b["box-flex"]})
}delete b["box-flex"]
},_applyToChildren:function(b){for(var a=0;
a<this._element.children.length;
a++){b.call(this,this._element.children[a],a,this._element.children.length)
}},_ie_recalcFlexes:function(){var d=0;
var c=0;
var e=0;
var a=0;
var b;
this._applyToChildren(function(f){if(!this._boxFlexList.contains(f)){d+=this._getSize(f,true)
}}.bind(this));
c=this._getSize(this._element,false)-d;
this._boxFlexes.forEach(function(f){a+=parseInt(f.flex)
});
e=c/a;
this._boxFlexes.forEach(function(f){this._setSize(f.element,Math.floor(e*f.flex)-1)
}.bind(this))
},_getSize:function(b,c){var d=b.getSize();
var a;
var e=c===true?this._getExtraSpace(b,this._orientation):0;
if(this._orientation=="horizontal"){a=d.x+e
}else{a=d.y+e
}return a
},_setSize:function(c,f){var d;
var g=0;
g=this._getExtraSpace(c,this._orientation);
if(this._orientation=="horizontal"){d="width"
}else{d="height"
}var e=(f-g);
var b=c.getStyle(d);
var a=(b.contains("%")?Infinity:parseInt(b));
if(Math.abs(e-a)>1){c.setStyle(d,e+"px")
}},_getExtraSpace:function(b,a){var c;
a=a||this._orientation;
if(a=="horizontal"){c=(parseInt(b.getComputedStyle("margin-left"))||0)+(parseInt(b.getComputedStyle("margin-right"))||0)
}else{c=(parseInt(b.getComputedStyle("margin-top"))||0)+(parseInt(b.getComputedStyle("margin-bottom"))||0)
}return c
},_getParentBoxProxies:function(){var a=Array.filter(this._element.getParents("[hasproxy]"),function(b){return b.getViewProxy().className.contains("BoxLayoutProxy")
});
return a.reverse()
},dispose:function(){this.removeEvent(Constants.WixAppEvents.APP_PART_RESIZE,this._ie_onAppPartResize);
this._element.removeEvent("resize",this._ie_resizeHandler);
Array.forEach(this._element.children,function(a){a.removeEvent("resize",this._ie_resizeHandler)
}.bind(this));
this.parent()
}}});
W.Classes.newClass({name:"wixapps.integration.utils.FunctionCallThrottle",imports:[],traits:[],Class:{Extends:Object,Binds:[],Static:{createThrottle:function(b,a){var c;
return function(){if(c){clearTimeout(c)
}c=setTimeout(b,a)
}
}}}});
W.Classes.newClass({name:"wixapps.integration.utils.LayoutGeometryMap",imports:[],traits:[],Class:{Extends:Object,Binds:[],_dictKeys:[],_dictValues:[],initialize:function(){},get:function(b){var c=null;
var a=this._dictKeys.indexOf(b);
if(a>-1){c=this._dictValues[a]
}return Object.clone(c)
},put:function(b,c){if(!this._dictKeys.contains(b)){var a=this._dictKeys.length;
this._dictKeys.push(b);
this._dictValues[a]=c
}},updateMap:function(a){this._dictKeys=[];
this._dictValues=[];
this.put(a,this._createInfo(a,a));
a.getElements("[hasproxy]").forEach(function(b){this.put(b,this._createInfo(a,b))
}.bind(this))
},_createInfo:function(a,b){return b.getCoordinates(a)
}}});
W.Classes.newClass({name:"wixapps.integration.utils.ProxySelector",imports:[],Class:{Static:{SELECTION_ACTION:"selectionAction",ACTION_MOUSE_DOWN:"actionMouseDown",ACTION_DOUBLE_CLICK:"actionDoubleClick",ACTION_ROLL_OVER:"actionRollOver"},Extends:Events,Binds:["_onMouseMove","_onContentSelectorDblClick","_onContentSelectorDown"],_editedComponent:null,_selectionFilter:null,_editBoxView:null,initialize:function(){},activateProxySelector:function(a,b){this._editedComponent=a;
this._selectionFilter=b;
this._editBoxView=this._getEditingLayer();
this._editBoxView.addEvent(Constants.CoreEvents.MOUSE_MOVE,this._onMouseMove);
this._editBoxView.addEvent(Constants.CoreEvents.MOUSE_DOWN,this._onContentSelectorDown);
this._editBoxView.addEvent("dblclick",this._onContentSelectorDblClick)
},deactivateProxySelector:function(){this._editBoxView.removeEvent(Constants.CoreEvents.MOUSE_MOVE,this._onMouseMove);
this._editBoxView.removeEvent(Constants.CoreEvents.MOUSE_DOWN,this._onContentSelectorDown);
this._editBoxView.removeEvent("dblclick",this._onContentSelectorDblClick);
this._editedComponent=null;
this._selectionFilter=null;
this._editBoxView=null
},_getEditingLayer:function(){return $$("#editorUI")[0].getLogic().getSkinPart("componentEditBox").getViewNode()
},_getRelatedComponents:function(a){var c=a.getViewProxy().getViewDefinition();
var b=this._editedComponent.getSkinPart("inlineContent").getElements("[hasproxy]");
return b.filter(function(d){return(d.getViewProxy().getViewDefinition()===c)
})
},_calcComponentCoordinates:function(a){return a.getCoordinates()
},_isInside:function(b,a){return b.x>=a.left&&b.x<=a.right&&b.y>=a.top&&b.y<=a.bottom
},_filterByPosition:function(e,b){var a=this._calcComponentCoordinates(b);
if(b.get("tag")==="span"){var d=b.getClientRects();
var c=window.getScroll();
return Array.map(d,function(f){f=Object.clone(f);
f.top+=c.y;
f.bottom+=c.y;
return f
}).some(function(f){return this._isInside(e,f)
}.bind(this))
}else{return this._isInside(e,a)
}},_listElements:function(d,a){var c=[];
var b=a.getChildren();
Array.forEach(b,function(e){var f=false;
if(this._filterByPosition(d,e)){c.push(e);
f=true
}else{if(e.getStyle("position")==="absolute"||e.get("tag")=="a"){f=true
}}if(f){c=c.concat(this._listElements(d,e))
}}.bind(this));
return c
},_findComponents:function(b){var a=this._listElements(b,this._editedComponent.getSkinPart("inlineContent"));
return a.reverse().filter(function(c){return c.hasAttribute("hasproxy")
}).map(function(c){return c.getViewProxy()
}).filter(this._selectionFilter)
},_onMouseMove:function(a){this._handleMouseAction(a,this.ACTION_ROLL_OVER)
},_onContentSelectorDown:function(a){this._handleMouseAction(a,this.ACTION_MOUSE_DOWN)
},_onContentSelectorDblClick:function(a){this._handleMouseAction(a,this.ACTION_DOUBLE_CLICK)
},_handleMouseAction:function(d,b){var c=this.injects().Preview.editorToPreviewCoordinates(d.client);
var a=this._findComponents(c);
if(a.length>0){this._sendNotification(b,a)
}},_sendNotification:function(b,a){this.fireEvent(this.SELECTION_ACTION,{action:b,proxyList:a})
}}});
W.Classes.newClass({name:"wixapps.integration.utils.RichTextClippingUtils",imports:[],Class:{findClippedText:function(d,a,c,b){this._findClippedTextCommon(d,a,function(e){return this._isAcceptableSize(e,c,b)
}.bind(this))
},findClippedTextByLines:function(d,a,c,b){this._findClippedTextCommon(d,a,function(e){return this._isAcceptableByLines(e,c,b)
}.bind(this))
},_findClippedTextCommon:function(e,b,a){var d=e.replace(/\</g," <").replace(/\>/g,"> ");
var c=d.split(/\s+/);
var f=this._joinHtmlTags(c);
this._findClippedTextRecursive(f,b,a,0,f.length,0)
},_joinHtmlTags:function(a){var c,e=[],d="",b="";
for(c=0;
c<a.length;
c++){d=a[c];
if(d.length===0){continue
}if(/<\/\w+>/.test(d)){e[e.length-1]+=d;
continue
}if(d.substr(0,1)==="<"&&!d.contains(">")){b=d;
continue
}if(d.substr(-1)===">"){b+=" "+d;
e.push(b);
b="";
continue
}if(b.length){b+=" "+d;
continue
}e.push(d)
}return e
},_findClippedTextRecursive:function(a,c,b,k,j,f){var l=Math.floor((k+j)/2);
var i=Boolean(l<(a.length-1));
var e=i?a.slice(0,l):a;
var d;
while(/<.+>/.test(e[e.length-1])){d=e.pop();
if(d.charAt(0)!=="<"){e.push(d.split("<")[0])
}}var h=e.join(" ").concat(i?"...":"");
c.set("html",h);
if(f<15){var g=b(c);
if(g==1){this._findClippedTextRecursive(a,c,b,k,l,f+1);
return
}else{if(g==-1){this._findClippedTextRecursive(a,c,b,l,j,f+1);
return
}}}if(c.get("text")=="..."){c.set("text","")
}},_isAcceptableSize:function(c,f,e){var a=0;
var g=this.getContainerRectList(c);
if(g.length>0){var b=g[g.length-1].bottom-g[0].top;
var d=g[g.length-1].width;
if(b>e){a=1
}else{if(e-b>20){a=-1
}else{if((d/f)<0.9){a=-1
}}}}return a
},_isAcceptableByLines:function(b,e,c){var a=0;
var f=this.getContainerRectList(b);
if(f.length>0){var d=f[f.length-1].width;
if(f.length>c){a=1
}else{if(f.length<c){a=-1
}else{if((d/e)<0.9){a=-1
}}}}return a
},getContainerRectList:function(c){var a;
var d=c.getElements("*").filter(function(f){return f.getStyle("display")=="block"
});
if(d.length===0){d=[c]
}var b=d.reduce(function(g,f){return g.concat(Array.slice(f.children,0))
},[]);
if(b.length>0){a=b.reduce(function(g,f){return g.concat(Array.slice(f.getClientRects(),0))
},[])
}else{a=d.reduce(function(g,f){return g.concat(Array.slice(f.getClientRects(),0))
},[])
}if(a.length===0){a=Array.slice(c.getClientRects())
}var e=a.reduce(function(g,f){if(g.length===0){return[f]
}var h=g.indexOfByPredicate(function(j){var k=f.top<=j.top&&f.bottom>=j.bottom,i=j.top<=f.top&&j.bottom>=f.bottom;
return k||i
});
if(h===-1){return g.concat(f)
}else{if(g[h].height<f.height){g[h]=f
}return g
}},[]);
return e
},getMinimalHeight:function(b,a){var d=this.getContainerRectList(b);
if(d.length>=a){return d[a-1].bottom-d[0].top
}else{var c=(d[d.length-1].bottom-d[0].top)/d.length;
return Math.round(c*a)
}}}});
W.Classes.newClass({name:"wixapps.integration.utils.SelectionMarker",imports:[],traits:[],Class:{Extends:Object,Binds:[],initialize:function(){},_markedElements:[],markSelectedSubComponent:function(a){this.markSingleComponent(a);
if(this._tooltipShown===false){this._tooltipShown=true
}},unmarkSelectedSubComponent:function(){this._markedElements.forEach(this.unMarkSingleComponent);
this._markedElements=[]
},getMarkedElements:function(){return this._markedElements
},markSingleComponent:function(b,c){var a=2;
if(b.getStyle("display")==="inline"){a=0
}b.setStyles({"outline-style":"dashed","outline-width":"1px","outline-color":(c===true?this._selectionEditColor:this._selectionRollOverColor),"outline-offset":a+"px"});
this._markedElements.push(b)
},unMarkSingleComponent:function(a){a.setStyles({outline:"none"})
},initUIColors:function(d,c){var f=d.getPropertiesAccordingToType("color");
var a=f.map(function(g){return d.getProperty(g)
});
var e=this._getParentCompBgColor(d,c)||this._getDocumentBgColor(d);
if(e){var b=this._getHighlightColors(e,a);
this._selectionRollOverColor=b[0];
this._selectionEditColor=b[1]
}else{this._selectionRollOverColor="#999";
this._selectionEditColor="#333"
}},_getParentCompBgColor:function(f,c){var b="";
var e=c.getParentComponent();
if(e&&e.getStyle()){var a=e.getStyle();
var d=(a.get||a.getProperty).call(e.getStyle(),"bg");
if(d){var g=a.getPropertySource("bg");
if(g=="theme"){b=f.getProperty(d)
}else{if(g=="value"){b=d
}}}}return b
},_getDocumentBgColor:function(c){var a=c.getProperty("siteBg");
var b;
if(a){b=a.getColorReference()
}return c.getProperty(b||"color_0")
},_getHighlightColors:function(c,d){var a=this;
var b=d.map(function(e){return{color:e,contrast:a._getContrastValue(e,c)}
}).sort(function(f,e){return e.contrast-f.contrast
}).map(function(e){return e.color.toString()
}).filter(function(g,f,e){return !e.slice(0,f).contains(g)
});
return[b[2],b[4]]
},_getContrastValue:function(b,a){return Math.abs(b._l-a._l)
}}});