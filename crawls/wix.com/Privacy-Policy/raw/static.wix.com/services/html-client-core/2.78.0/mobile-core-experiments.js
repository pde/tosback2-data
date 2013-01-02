W.Experiments.registerExperimentComponent("URM2","New",{name:"experiments.mobile.core.components.ContainerURM2",skinParts:clone(),Class:{Extends:"mobile.core.components.Container",addChild:function(a){var c=a.getParentComponent();
var b=c.getChildComponents().map(function(d){return d.getLogic().getComponentId()
});
a.getViewNode().insertInto(this.getInlineContentContainer());
this._reportComponentsZOrderChanged(a,c,b);
this.moveChild(a,this.Z_INDEX_CHANGE_TYPES.TOP)
},moveChildFromIndexToIndex:function(d,c,a){var b=this.getChildComponents().map(function(e){return e.getLogic().getComponentId()
});
W.Utils.setChildIndex(this.getInlineContentContainer(),c,a);
this._reportComponentsZOrderChanged(d,this,b)
},moveChild:function(e,a){var c=this.getChildren();
var d=this._getChildIndex(e);
var b;
switch(a){case this.Z_INDEX_CHANGE_TYPES.BACK:b=d-1;
break;
case this.Z_INDEX_CHANGE_TYPES.FORWARD:b=d+1;
break;
case this.Z_INDEX_CHANGE_TYPES.BOTTOM:b=0;
break;
case this.Z_INDEX_CHANGE_TYPES.TOP:b=c.length-1;
break
}this.moveChildFromIndexToIndex(e,d,b)
},_getChildIndex:function(c){var b=this.getChildren();
var a=c.getViewNode();
return b.indexOf(a)
},_reportComponentsZOrderChanged:function(b,e,a){var d=e.getChildComponents().map(function(f){return f.getLogic().getComponentId()
});
var c={type:"wysiwyg.editor.managers.undoredomanager.ZOrderChange",subType:"explicitZOrderChange",changedComponentIds:[b.getComponentId()],oldState:{children:a},newState:{children:d}};
this.injects().Commands.executeCommand("WViewerCommands.ComponentZIndexChanged",b,c)
}}});
W.Experiments.registerExperimentComponent("Aviary","New",{name:"experiments.mobile.core.components.ImageAviary",skinParts:clone(),Class:{Extends:"mobile.core.components.Image",_getImageFullUrl:function(d,f){var e=this._uri;
this._uri=this._data.get("uri");
f.isSameImage=e===this._uri;
var c=this._uri;
var b=this._uri.test(/(^https?)|(^data)/);
if(!(this._useWebUrl||b)){if(this._requestExactSize){c=this._imageUrl.getImageUrlExactSize(d,this._uri)
}else{var a=this._imageUrl.getImageUrlFromPyramid(d,this._uri,f.isSameImage,this._pyramidRequestSize);
c=a.url;
f.isSameImageWithBiggerPyramidSize=f.isSameImage&&a.pyramidRequestSize>this._pyramidRequestSize;
this._pyramidRequestSize=a.pyramidRequestSize
}}return c
}}});
W.Experiments.registerExperimentComponent("WixAppsPage","New",{name:"experiments.mobile.core.components.MenuButtonWixAppsPageNew",skinParts:{label:{type:"htmlElement"},icon:{type:"htmlElement",optional:true},description:{type:"htmlElement",optional:true},bullet:{type:"htmlElement",optional:true}},Class:{Extends:"mobile.core.components.MenuButton",_getButtonLabelTextField:function(){return(this._data.getType().contains("Page")?"title":"text")
}}});
W.Experiments.registerExperimentComponent("GridLines","New",{name:"experiments.mobile.core.components.PageGridLinesNew",skinParts:clone(),Class:{Extends:"mobile.core.components.Page",getPaddingBottom:function(){return this._view.get("paddingBottom")||0
}}});
W.Experiments.registerExperimentComponent("JITPageLoader","New",{name:"experiments.mobile.core.components.PageJITPageLoaderNew",Class:{Extends:"mobile.core.components.Page",initialize:after(function(c,a,b){a.setStyle("position","relative")
}),wixifyContent:function(a){if(a){this._wixifyCBList.push(a)
}var b=this._view.getAttribute("id");
if(!W.Pages.isPageLoaded(b)){W.Pages.loadPageById(b,this._oldWixifyContent.bind(this),this)
}else{this._oldWixifyContent()
}},_oldWixifyContent:function(){if(this._isContentWixified){this._setWixified();
return
}if(this._isContentWixifyStarted){return
}this._isContentWixifyStarted=true;
var b=this._view.getElements("[comp]");
if(b.length===0){this._setWixified();
this.listenForContentRendered();
return
}var a=new Async.Bulk(b,null,{completeEvent:"wixified",completeCallback:function(){this._setWixified()
}.bind(this)});
this.listenForContentRendered();
b.wixify()
}}});
W.Experiments.registerExperimentComponent("MasterPage","New",{name:"experiments.mobile.core.components.PageMasterPageNew",skinParts:clone(),Class:{Extends:"mobile.core.components.Page",render:function(){var a=this.injects().Viewer._siteStructureData.get("renderModifiers");
var c=true;
if(a&&a.pageAutoShrink==false){c=false
}if(c&&W.Layout&&W.Layout.getComponentMinResizeHeight){var b=W.Layout.getComponentMinResizeHeight(this);
this.setHeight(b)
}}}});
W.Experiments.registerExperimentClass("ValidateDataType","New",{name:"experiments.mobile.core.components.base.DataItemBaseValidateDataType",Class:{Extends:"mobile.core.components.base.BaseComponent",setDataItem:around(function(e,d){var f=this._validateTypeAcceptance(d);
if(f){e(d)
}else{var b=new Error(),a=b.stack,g=d.getType(),c=this.getComponentType();
LOG.reportError(wixErrors.DATA_ITEM_INVALID_TYPE,"BaseComponent","setDataItem",{c1:"componentType: "+c+" improperType: "+g+" stack: "+a});
e()
}}),_validateTypeAcceptance:function(a){var c=this.getAcceptableDataTypes();
if(c.indexOf("")!==-1){return true
}if(a===null||a===undefined||!a.getType()){return false
}var b=a.getType();
return c.indexOf(b)!==-1
}}});
W.Experiments.registerExperimentComponent("Aviary","New",{name:"experiments.mobile.core.components.ImageNewAviary",skinParts:clone(),Class:{Extends:"mobile.core.components.ImageNew",_refreshImage:function(){this._skinParts.image.set("alt",this._data.get("alt"));
this._handleImageLoadingError();
var c=this._getImageDimensions();
this._setContainerSize(c.containerSize);
var b=this._imageUrl;
if(!(this._useWebUrl||this._imageUrl.test(/(^https?)|(^data)/))){b=this._getImageSrc(c.imageSize,!this._isSameImage)
}this._isSameImage=true;
this._setImageSrc(b);
var a=this._settings.getCropMode()===this._settings.CropModes.STRETCH?c.containerSize:c.imageSize;
this._setImagePositionAndSize(c.imagePosition,a)
}}});
W.Experiments.registerExperimentTrait("CursorBug4810","New",{name:"experiments.core.components.traits.LinkableComponentCursorBug4810",trait:{Extends:"mobile.core.components.traits.LinkableComponent",Binds:[],_linkify:function(b,c,a,d){if(!c){return
}if(a&&a!==""){c.set("href",a);
c.setStyle("cursor","pointer");
this._setTarget(c,d);
if(this.hasState("noLink","linkableComponent")){this.removeState("noLink","linkableComponent")
}}else{c.setStyle("cursor","");
c.erase("href");
c.erase("target");
if(this.hasState("noLink","linkableComponent")){this.setState("noLink","linkableComponent")
}}this._handleSpecialCases(b,c)
}}});
W.Experiments.registerExperimentTrait("RefactorLinkUtils","New",{name:"experiments.core.components.traits.LinkableComponentRefactorLinkUtils",trait:{Extends:"mobile.core.components.traits.LinkableComponent",Binds:[],initialize:function(){var a=W.Utils.linkUtils;
var b=this.render.bind(this);
this.render=function(){b();
var c=this.getDataItem();
a.renderLinks.call(this,c,this._skinParts.link);
if(W.Viewer.getEditorMode()=="PREVIEW"){a.linkableComponentEditModeChanged.call(this,"PREVIEW",c,this._skinParts.link)
}}.bind(this);
this.injects().Commands.registerCommandListenerByName("WPreviewCommands.WEditModeChanged",this,a.linkableComponentEditModeChanged.bind(this))
}}});
W.Experiments.registerExperimentDataSchema("GridLines","New","Page",{title:"string",hideTitle:"boolean",icon:"string",windowTitle:"string",descriptionSEO:"string",metaKeywordsSEO:"string",pageTitleSEO:"string",pageUriSEO:"string",hidePage:"boolean",underConstruction:"boolean",tpaApplicationId:"number",pageSecurity:{type:"object","default":{requireLogin:false,passwordDigest:""}},pageBottomMargin:{type:"number","default":0}});
W.Experiments.registerExperimentManager("SyncWixify","New",{name:"experiments.core.managers.ComponentManagerSyncWixify",Class:{Extends:"mobile.core.managers.ComponentManager",getComponent:function(a,b){if(this._componentMap[a]){if(this._componentMap[a].NEW_BASE_COMP===true){if(b){b(this._componentMap[a])
}}else{W.Utils.callLater(b,[this._componentMap[a]])
}return this._componentMap[a]
}else{this._componentQue.add(a,b);
W.Classes.get(a,function(){});
return null
}}}});
W.Experiments.registerExperimentManager("NewComps","New",{name:"experiments.mobile.core.managers.ConfigurationManagerEcomNew",Class:{Extends:"mobile.core.managers.ConfigurationManager",getCurrentOrigin:function(){var a="http://"+window.location.host;
return a
},getMetaSiteData:function(){return this.getEditorModelProperty("metaSiteData")
},getPremiumFeatures:function(){var b=this.getRendererModelProperty("premiumFeatures");
if(!b){var a=this.getMetaSiteData();
b=a&&a.premiumFeatures
}return b
}}});
W.Experiments.registerExperimentManager("Staff","Wix",{name:"experiments.core.managers.CssManagerStaff",Class:{Extends:"mobile.core.managers.CssManager",_configureSystemFonts:function(){Constants.CSS.SYSTEM_FONTS["sans-serif"].push(["Helvetica Neue"]);
Constants.CSS.SYSTEM_FONTS["sans-serif"].push(["Helvetica Neue Italic"]);
Constants.CSS.SYSTEM_FONTS["sans-serif"].push(["Helvetica Neue Thin"]);
Constants.CSS.SYSTEM_FONTS["sans-serif"].push(["Helvetica Neue Medium"]);
this._systemFontsCssDefinition={};
this._systemFontsNames=[];
this._addFontsLoaderCssTag(window.serviceTopology.publicStaticsUrl+"/css/Helvetica/fontFace.css");
for(var a in Constants.CSS.SYSTEM_FONTS){var f=Constants.CSS.SYSTEM_FONTS[a];
for(var c=0;
c<f.length;
++c){var e=f[c];
var d=(typeOf(e)=="array")?e[0]:e;
this._systemFontsNames.push(d);
var b=(typeOf(e)=="array")?e.concat().reverse():[e];
b.push(a);
this._addQuoteToArrayElementsIfContainSpaces(b);
this._systemFontsCssDefinition[d]=b.join(",")
}}}}});
W.Experiments.registerExperimentManager("SyncWixify","New",{name:"experiments.core.managers.SkinManagerSyncWixify",Class:{Extends:"mobile.core.managers.SkinManager",getSkin:function(a,b){if(this._skinClassMap[a]){if(b){b(this._skinClassMap[a])
}return this._skinClassMap[a]
}else{this._skinQue.add(a,b);
W.Classes.get(a,function(){});
return null
}}}});
W.Experiments.registerExperimentManager("StyleRefactor","New",{name:"experiments.mobile.core.managers.ThemeManagerStyleRefactor",imports:["mobile.core.managers.style.SkinParamMapper"],Class:{Extends:"mobile.core.managers.ThemeManager",getStyle:function(b,d,a){if(this._styleCache[b]){d(this._styleCache[b])
}else{this._styleQueue.add(b,d);
if(this._styleQueue.getQueue(b).length>1){return
}var c=function(e){this._styleCache[b]=e;
this._styleQueue.getQueue(b).forEach(function(f){f(e)
});
this._styleQueue.removeKey(b)
}.bind(this);
if(this.isStyleAvailable(b)){this.getDataByQuery("#"+b,function(e){var f=e.get("style");
W.Skins.getSkin(e.get("skin"),function(h){var g=new this.SkinParamMapperClass(e,e.get("style"),h);
c(g)
}.bind(this))
}.bind(this))
}else{this.createStyle(b,"",a,c)
}}},createStyle:function(b,d,a,f){if(this._styleCache[b]){LOG.reportError(wixErrors.STYLE_ALREADY_EXISTS,"ThemeManager","createStyle",b)()
}var e=Object.clone(this.INIT_STYLE_RAW_DATA);
e.skin=a;
var c=this.addDataItem(b,e);
W.Skins.getSkin(c.get("skin"),function(i){var g=new this.SkinParamMapperClass(c,c.get("style"),i);
var h=g.getId();
this._styleCache[h]=g;
f(g)
}.bind(this))
},initialize:function(a){this.parent();
this.SkinParamMapperClass=this.imports.SkinParamMapper;
this._placeHoldersMap={};
this._isReady=false;
this._styleQueue=new W.Queue();
this._styleCache={};
this._isOperating=false;
if(a){this._onDataReady(a)
}}}});
W.Experiments.registerExperimentClass("SyncWixify","New",{name:"experiments.mobile.core.managers.data.DataItemBaseSyncWixify",Class:{Extends:"mobile.core.managers.data.DataItemBase",isReady:function(){return true
}}});
W.Experiments.registerExperimentClass("SchemaFieldPresenceValidation","New",{name:"experiments.mobile.core.managers.data.DataItemWithSchemaSchemaFieldPresenceValidation",Class:{Extends:"mobile.core.managers.data.DataItemWithSchema",set:around(function(f,c,e,d,b){var a=this._validateByPresenceInSchema(c);
if(a){f(c,e,d,b)
}else{LOG.reportError(wixErrors.SCHEMA_MISSING_KEY,"DataItemWithSchema","set",{c1:"key: "+c+"schemaType: "+this._schemaType})
}}),setData:function(a,b){if(a===this._data){return
}if(!this._hasValidType(a.type)){LOG.reportError(wixErrors.SCHEMA_MISSING,"DataItemWithSchema","setData",{c1:"type: "+a.type+"schemaType: "+this._schemaType});
return
}if(!this._data){this.parent(a,b)
}else{a.id=this._data.id;
this.parent(a,false);
this._setSchemaDefaults();
if(b!==false){this.fireDataChangeEvent()
}}},_hasValidType:function(a){return this._schemaType===a
},_hasCheckableSchema:function(){return this._schemaType&&(this._schemaType!=="Document")
},_isKeyPresentedInSchema:function(a){return this._schema[a]!==undefined
},_validateByPresenceInSchema:function(a){if(!this._hasCheckableSchema()){return true
}return this._isKeyPresentedInSchema(a)
}}});
W.Experiments.registerExperimentClass("URM3","New",{name:"experiments.mobile.core.managers.data.DataItemWithSchemaURM3",Class:{Extends:"mobile.core.managers.data.DataItemWithSchema",copySchemaFieldsTo:function(a,e,d){var c=this._cloneBySchemaAndReturnDataChange(a._data,this._data);
var b=Object.keys(c.newValue).length+Object.keys(c.oldValue).length==0;
if(b){return
}if(!e){a.fireDataChangeEvent(undefined,c.newValue,c.oldValue,d)
}},_cloneBySchemaAndReturnDataChange:function(f,g){var d,a,c={},b={};
for(var h in this._schema){var e=g[h];
var i=typeof e;
d=f[h];
if(instanceOf(e,Array)){a=e.slice();
f[h]=a
}else{if("object"==i){a=Object.clone(e);
f[h]=a
}else{a=e;
f[h]=a
}}if((d||a)&&(d!=a)){b[h]=d;
c[h]=a
}}return{dataItem:f,newValue:c,oldValue:b}
}}});
W.Experiments.registerExperimentClass("SyncWixify","New",{name:"experiments.mobile.core.managers.data.DataItemWithSchemaSyncWixify",Class:{Extends:"mobile.core.managers.data.DataItemWithSchema",isReady:function(){if(this._isReady){return true
}var a=this.getWaitingForReadyList();
if(a.length>0){this._isReady=false
}else{this._isReady=true
}return this._isReady
},getWaitingForReadyList:function(){var f=[];
var d=this.getData();
var b=this.getDataManager();
for(var g in d){var e=this.getFieldType(g);
var a,j;
if(e=="ref"){a=this.get(g);
j=b.isDataAvailable(a);
if(!j){f.push(a)
}}else{if(e=="refList"){var h=this.get(g);
for(var c=0;
c<h.length;
c++){a=h[c];
j=b.isDataAvailable(a);
if(!j){f.push(a)
}}}}}return f
}}});
Constants.DataEvents={DATA_CHANGED:"dataChanged",BEFORE_CHANGE:"beforeDataChange",AFTER_CHANGE:"afterDataChange"};
Constants.DataTypes={TYPE_RESOURCE_KEY:"resourceKey"};
W.Experiments.registerExperimentClass("SyncWixify","New",{name:"experiments.mobile.core.managers.data.DataManagerSyncWixify",Class:{Extends:"mobile.core.managers.data.DataManager",initialize:after(function(){this._notReadyDataMap={};
this._waitingForReadyDataMap={}
}),addDataItem:function(d,c){this._appendDataPropAdds(d,c);
var a=this.createDataItem(c);
a._data.id=d;
if(!this.skipDirtyMarking){this.markDirtyObject(a)
}var b=a.isReady();
if(!b){this._addToWaitingForReady(a)
}else{this._setDataReady(a)
}return a
},_addToWaitingForReady:function(c){var b=c.get("id");
this._notReadyDataMap[b]=c;
var e=c.getWaitingForReadyList();
for(var d=0;
d<e.length;
d++){var a=e[d];
if(a.indexOf("#")===0){a=a.substr(1)
}if(!this._waitingForReadyDataMap[a]){this._waitingForReadyDataMap[a]=[]
}this._waitingForReadyDataMap[a].push(b)
}},_setDataReady:function(b){var a=b.get("id");
this.dataMap[a]=b;
this._runCallbacks(a,b);
this._updateDataWaitingList(b);
if(this._notReadyDataMap[a]){delete this._notReadyDataMap[a]
}},_updateDataWaitingList:function(b){var a=b.get("id");
var e=this._waitingForReadyDataMap[a];
if(e){delete this._waitingForReadyDataMap[a];
for(var d=0;
d<e.length;
d++){var c=this._notReadyDataMap[e[d]];
if(c){if(c.isReady()){this._setDataReady(c)
}}}}},getDataByQuery:function(d,c){var b=null;
if(d.indexOf("#")===0){var a=d.substr(1);
b=this.dataMap[a];
if(c){if(!b){this.callbackQueue.add(a,c)
}else{c(b)
}}return b
}else{LOG.reportError(wixErrors.DM_MALFORMED_QUERY,"DataManager","getDataByQuery",d);
W.Utils.callLater(c,[null])
}},isReady:function(){if(Object.getLength(this._notReadyDataMap)>0&&Object.getLength(this._waitingForReadyDataMap)>0){return false
}else{return true
}}}});
W.Experiments.registerExperimentClass("URM2","New",{name:"experiments.mobile.core.managers.data.DataManagerURM2",Class:{Extends:"mobile.core.managers.data.DataManager",reportDataItemChangeEvent:after(function(b,d,a,c){if(d!==undefined&&a!==undefined&&b._data.id){this.fireEvent("undoDataChangedEvent",[b,d,a,c])
}})}});
W.Experiments.registerExperimentManager("ShowOneMnMessage","New",{name:"experiments.mobile.core.managers.serverfacade.CorsRESTClientShowOneMnMessageNew",Class:{Extends:"mobile.core.managers.serverfacade.CorsRESTClient",get:function(a,d,b){var c=this._createCorsXhr(a);
c.onabort=function(f){this._onXhrEvent("abort",c,b)
}.bind(this);
c.ontimeout=function(f){this._onXhrEvent("timeout",c,b)
}.bind(this);
c.onerror=function(f){this._onXhrEvent("error",c,b)
}.bind(this);
c.onload=function(f){this._onXhrEvent("load",c,b)
}.bind(this);
c.onprogress=function(f){};
if(d){Object.each(d,function(e){if(e.key&&e.value){c.setRequestHeader(e.key,e.value)
}})
}c.send()
}}});
W.Experiments.registerExperimentClass("StyleRefactor","New",{name:"experiments.mobile.core.managers.skin.SkinRendererStyleRefactor",Class:{Extends:"mobile.core.managers.skin.SkinRenderer",_getParamValue:function(g,a){var b=null;
if(g.defaultParam){var e=g.defaultParam;
return this._applyParamMutators(this._getParamValue(e,a),g)
}if(a&&a.getProperty(g.id)){var h=a.getPropertySource(g.id);
b=a.getProperty(g.id);
if(h=="theme"){b=this.injects().Theme.getProperty(b)
}b=this._castToType(b,g);
b=this._addExtraToParamByType(g,b,a);
return this._applyParamMutators(b,g)
}if(g.defaultTheme){var f=g.defaultTheme;
var j=W.Theme.getProperty(f);
j=this._castToType(j,g);
return this._applyParamMutators(j,g)
}if(g.sumParams){var d=g.sumParams;
if(d&&typeOf(d)=="array"&&d.length>0){var k=this._getParamValue(d[0],a);
if(k.add&&typeof k.add==="function"){for(var c=1;
c<d.length;
c++){k.add(this._getParamValue(d[c],a))
}}return this._applyParamMutators(k,g)
}}if(g.defaultValue){b=this._castToType(g.defaultValue,g);
return this._applyParamMutators(b,g)
}return null
}}});