W.Classes.newClass({name:"wixapps.core.apprepo.AppPartDefinition",traits:["wixapps.core.apprepo.traits.AppRepoItem"],Class:{_dataSelector:null,_viewName:null,_type:null,initialize:function(a){this._appInstance=a
},loadFromDefinition:function(a){this._dataSelector=a.dataSelector;
this._viewName=a.viewName
},getDataSelectorId:function(){return this._dataSelector
},getViewName:function(){return this._viewName
},getType:function(){return this._type
},setDataSelectorId:function(a){this._dataSelector=a
},setViewName:function(a){this._viewName=a
},setType:function(a){this._type=a
},getSerializableProperties:function(){return["dataSelector","viewName"]
}}});
W.Classes.newClass({name:"wixapps.core.apprepo.AppPartsRepository",imports:["wixapps.core.apprepo.AppPartDefinition"],Class:{Binds:[],Extends:"wixapps.core.apprepo.base.BaseRepository",_getInstanceClass:function(a){return this.imports.AppPartDefinition
}}});
W.Classes.newClass({name:"wixapps.core.apprepo.AppRepoTransport",imports:["wixapps.core.utils.WixAppsLogger"],Class:{Extends:"wixapps.core.utils.WixServiceTransportBase",_getServiceUrl:function(){return"http://public.bestflashwebsitebuilder.com/apps/appbuilder/"
},updateInstance:function(d,a,e,b){var c=d.toObject();
a="50e010740e909da4e48a98a0";
this.doRequest("saved/"+a,{payload:c},e,b)
},getSavedInstance:function(b,c,a){b="50e010740e909da4e48a98a0";
this.doGetRequest("saved/"+b,{},c,a)
},getPublishedInstance:function(b,c,a){b="50e010740e909da4e48a98a0";
this.doGetRequest("published/"+b,{},c,a)
},publishInstance:function(b,c,a){b="50e010740e909da4e48a98a0";
this.doRequest("published/"+b,{},c,a)
}}});
W.Classes.newClass({name:"wixapps.core.apprepo.ApplicationDefinition",Class:{_appDef:{},Static:{DATA_PROVIDERS_KEY:"dataProviders",DATA_SELECTORS_KEY:"dataSelectors",PARTS_DEF_KEY:"parts",TYPES_KEY:"types",VIEWS_KEY:"views"},initialize:function(a){if(a){this._appDef=a
}},getDataProviders:function(){return this._appDef[this.DATA_PROVIDERS_KEY]
},setDataProviders:function(a){this._appDef[this.DATA_PROVIDERS_KEY]=a
},getDataSelectors:function(){return this._appDef[this.DATA_SELECTORS_KEY]
},setDataSelectors:function(a){this._appDef[this.DATA_SELECTORS_KEY]=a
},getAppPartDefinitions:function(){return this._appDef[this.PARTS_DEF_KEY]
},setAppPartDefinitions:function(a){this._appDef[this.PARTS_DEF_KEY]=a
},getTypes:function(){return this._appDef[this.TYPES_KEY]
},setTypes:function(a){this._appDef[this.TYPES_KEY]=a
},getViewDefinitions:function(){return this._appDef[this.VIEWS_KEY]
},setViewDefinitions:function(a){this._appDef[this.VIEWS_KEY]=a
},toObject:function(){return this._appDef
}}});
W.Classes.newClass({name:"wixapps.core.apprepo.ApplicationInstance2",imports:["wixapps.core.apprepo.ApplicationDefinition","wixapps.core.apprepo.DataProvidersRepository","wixapps.core.apprepo.DataSelectorsRepository","wixapps.core.apprepo.AppPartsRepository","wixapps.core.managers.TypesManager","wixapps.core.views.ViewDefinitionsRepository","wixapps.core.views.ViewsCustomizer","wixapps.core.utils.WixAppsLogger","wixapps.core.data.DataItemFactory","wixapps.core.expressions.FunctionLibrary"],Class:{Binds:[],Extends:Events,_appDef:null,initialize:function(a){this._funcLibrary=new this.imports.FunctionLibrary();
this._dataFactory=new this.imports.DataItemFactory();
this._dataFactory.registerFunctionLibrary(this._funcLibrary);
this._appCache=null;
this._dataProvidersRepo=new this.imports.DataProvidersRepository(this);
this._dataSelectorsRepo=new this.imports.DataSelectorsRepository(this);
this._partsRepo=new this.imports.AppPartsRepository(this);
this._typesManager=new this.imports.TypesManager();
this._viewsDefRepo=new this.imports.ViewDefinitionsRepository(this._dataFactory);
this._customizations=new this.imports.ViewsCustomizer();
this._logger=new this.imports.WixAppsLogger();
this._loadAppData(a)
},toObject:function(){var a=new this.imports.ApplicationDefinition();
a.setDataProviders(this._dataProvidersRepo.toObject());
a.setDataSelectors(this._dataSelectorsRepo.toObject());
a.setAppPartDefinitions(this._partsRepo.toObject());
var b=this.getDataProviders().getWixDbDataProvider();
a.setTypes(b.getManagedTypes());
var c=this._viewsDefRepo.getAllViewDefinitions();
a.setViewDefinitions(c.invoke("getValue"));
return a.toObject()
},_loadAppData:function(a){this._appDef=new this.imports.ApplicationDefinition(a);
this._dataProvidersRepo.fromObject(this._appDef.getDataProviders());
this._dataSelectorsRepo.fromObject(this._appDef.getDataSelectors());
this._partsRepo.fromObject(this._appDef.getAppPartDefinitions());
this.loadViews(this._appDef.getViewDefinitions());
this._appDefLoaded=true
},getAppDef:function(){return this._appDef
},getDataProviders:function(){return this._dataProvidersRepo
},getDataSelectors:function(){return this._dataSelectorsRepo
},getAppPartDefinitions:function(){return this._partsRepo
},getTypesManager:function(){return this._typesManager
},getViewDefinitions:function(){return this._viewsDefRepo
},getLogger:function(){return this._logger
},getAppCache:function(){return this._appCache
},getDataItemFactory:function(){return this._dataFactory
},isSavedInRepo:function(){return this._isSavedInRepo
},setSavedInRepo:function(a){this._isSavedInRepo=a
},loadViews:function(a){if(!a){return
}a.each(function(d){var c=this._viewsDefRepo.cloneAndMultiply(d);
for(var b=0;
b<c.length;
b++){this._customizations.fillMissingIds(c[b]);
this._viewsDefRepo.setViewDefinition(c[b])
}}.bind(this))
},getInstanceId:function(){return this._instanceId
},setInstanceId:function(a){this._instanceId=a
}}});
W.Classes.newClass({name:"wixapps.core.apprepo.DataProvidersRepository",imports:["wixapps.core.data.providers.wixdb.WixDbDraftDataProvider","wixapps.core.data.providers.wixdb.WixDbPublishedDataProvider"],Class:{Extends:"wixapps.core.apprepo.base.BaseRepository",_getInstanceClass:function(a){var b=a&&a.type;
switch(b){case"WixDb":return W.Viewer.isPublicMode()?this.imports.WixDbPublishedDataProvider:this.imports.WixDbDraftDataProvider;
break
}},registerWixDbDataProvider:function(a){return this.registerWithId("wixdb",a)
},getWixDbDataProvider:function(){return this.getById("wixdb")
}}});
W.Classes.newClass({name:"wixapps.core.apprepo.DataSelectorsRepository",imports:["wixapps.core.data.selectors.ItemDataSelector","wixapps.core.data.selectors.ListDataSelector"],Class:{Binds:[],Extends:"wixapps.core.apprepo.base.BaseRepository",_getInstanceClass:function(a){var b=a&&a.type;
switch(b){case"IB.ManualSelectedItem":return this.imports.ItemDataSelector;
break;
case"IB.ManualSelectionList":return this.imports.ListDataSelector;
break
}}}});
W.Classes.newClass({name:"wixapps.core.apprepo.base.BaseRepository",Class:{_instances:[],_instancesMap:{},_appInstance:null,initialize:function(a){this._appInstance=a
},fromObject:function(a){Object.each(a,function(c,d){var b=this._createInstance(c);
this.registerWithId(d,b)
}.bind(this))
},_createInstance:function(b){var c=this._getInstanceClass(b);
var a;
if(c){a=new c(this._appInstance);
a.loadFromDefinition(b)
}else{throw"No Class found for "+b
}return a
},toObject:function(){var b={};
for(var a=0;
a<this._getInstances().length;
a++){var c=this._getInstances()[a];
b[c.id]=c.instance
}return b
},_getInstances:function(){return this._instances
},_getInstanceClass:function(a){throw"Must Implement!"
},register:function(c,a){var b=W.Utils.getUniqueId(c);
this.registerWithId(b,a);
return b
},registerWithId:function(b,a){this._getInstances().push({id:b,instance:a});
this._instancesMap[b]=a;
return b
},getById:function(b){var a=this._instancesMap[b];
if(!a){throw"No item of id ["+b+"]"
}return a
}}});
W.Classes.newTrait({name:"wixapps.core.apprepo.traits.AppRepoItem",trait:{Binds:[],fromObject:function(a){Object.each(a,function(c,b){this["_"+b]=c
}.bind(this))
},toObject:function(){var a=this.getSerializableProperties();
var b={};
a.each(function(c){b[c]=this["_"+c]
}.bind(this));
return b
},getSerializableProperties:function(){throw"Must implement me!"
}}});
W.Classes.newClass({name:"wixapps.core.data.ArrayDataItem",imports:[],traits:["wixapps.core.events.EventAggregator"],Class:{Binds:[],Extends:"wixapps.core.data.DataItem",_children:[],getTypeName:function(){return"Array"
},addChild:function(c,b){var a;
c=(c.className&&(c.className.indexOf("wixapps.core.data")!=-1))?c:this._context.getFactory().createDataItem(c,this);
if(b!==undefined){a=typeof(b)==="number"?parseInt(b):this.getChildIndex(b)
}if(a>-1){this._children.splice(a,0,c)
}else{a=this._children.length;
this._children.push(c)
}this._dirtyFlag=true;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,action:Constants.DataItemEvents.CHANGE_EVENT_ACTION_ADD,child:c,index:a});
c._parent=this;
return c
},deleteChild:function(c){var b=typeof(c)==="number"?parseInt(c):this.getChildIndex(c);
if(b>-1&&b<this._children.length){var a=this._children.splice(b,1);
this._dirtyFlag=true;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,action:Constants.DataItemEvents.CHANGE_EVENT_ACTION_DELETE,child:a[0],index:b});
return a[0]
}else{return null
}},replaceChild:function(e,d){var b;
var a;
if(d!==undefined){b=typeof(d)==="number"?parseInt(d):this.getChildIndex(d)
}if(b>=0&&b<this._children.length){a=this._children[b];
if(e.className&&(e.className.contains("wixapps.core.data"))){if(a!==e){this._children[b]=e;
this._dirtyFlag=true;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,action:Constants.DataItemEvents.CHANGE_EVENT_ACTION_REPLACE,child:e,prevChild:a,index:b})
}}else{var c=e;
if(a.className===this._context.getFactory().getDataItemClassName(c)){a.setValue(c)
}else{e=this._context.getFactory().createDataItem(c);
if(e){this._children[b]=e;
this._dirtyFlag=true;
e._parent=this;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,action:Constants.DataItemEvents.CHANGE_EVENT_ACTION_REPLACE,child:e,prevChild:a,index:b})
}}}return e
}},getChildren:function(){return this._children.slice(0)
},getValue:function(b,c){var a=[];
var d=this._passScope(c);
this._children.forEach(function(e){a.push(e.getValue(b,d))
});
return a
},setValue:function(a){this.startEventAggregation();
this._applyData(a);
this.releaseEventAggregation(Constants.DataItemEvents.CHANGE)
},getChildIndex:function(a){return this._children.indexOf(a)
},getChildByIndex:function(a){return this._children[a]
},getChildValue:function(a){return(this._children&&this._children[a]!==undefined)?this._children[a].getValue():undefined
},isDirty:function(){if(this.parent()){return true
}for(var a=0;
a<this._children.length;
a++){if(this._children[a].isDirty()){return true
}}return false
},resetDirtyFlag:function(){this.parent();
for(var a=0;
a<this._children.length;
a++){this._children[a].resetDirtyFlag()
}},_applyData:function(d){var a=this._children.length;
for(var b=0;
b<d.length;
b++){if(b<a){this.replaceChild(d[b],b)
}else{this.addChild(d[b])
}}if(d.length<this._children.length){for(var c=this._children.length-1;
c>=d.length;
c--){this.deleteChild(c)
}}}}});
W.Classes.newClass({name:"wixapps.core.data.CompositeDataItem",imports:[],traits:["wixapps.core.events.EventAggregator"],Class:{Binds:[],Extends:"wixapps.core.data.DataItem",_children:{},getValue:function(b,d){var a={};
for(var c in this._children){var e=this._passScope(d);
a[c]=this._children[c].getValue(b,e)
}return a
},getTypeName:function(){var a=this.getChildByRef("_type");
return(a&&a.getValue())||"wix:Object"
},addChild:function(c,b){var a=this._context.getFactory().createDataItem(c);
this._children[b]=a;
this._dirtyFlag=true;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,action:Constants.DataItemEvents.CHANGE_EVENT_ACTION_ADD,child:a,ref:b});
a._parent=this;
return a
},deleteChild:function(b){var a=this._children[b];
if(a){a._parent=null;
delete this._children[b];
this._dirtyFlag=true;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,action:Constants.DataItemEvents.CHANGE_EVENT_ACTION_DELETE,child:a,ref:b})
}return a
},replaceChild:function(d,b){if(b.className&&(b.className.indexOf("wixapps.core.data")!=-1)){b=this.getChildRef(b)
}var a=this._children[b];
if(a){if(d&&d.className&&(d.className.indexOf("wixapps.core.data")!=-1)){if(a!==d){this._children[b]=d;
this._dirtyFlag=true;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,action:Constants.DataItemEvents.CHANGE_EVENT_ACTION_REPLACE,child:d,prevChild:a,ref:b})
}}else{var c=d;
if(a.className===this._context.getFactory().getDataItemClassName(c)){a.setValue(c)
}else{d=this._context.getFactory().createDataItem(c);
if(d){this._children[b]=d;
this._dirtyFlag=true;
d._parent=this;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,action:Constants.DataItemEvents.CHANGE_EVENT_ACTION_REPLACE,child:d,prevChild:a,ref:b})
}}}return d
}},getChildRef:function(b){for(var a in this._children){if(this._children[a]===b){return a
}}},getChildren:function(){return Object.values(this._children)
},getChildByRef:function(a){return this._children[a]
},getChildValue:function(a){return(this._children&&this._children[a]!==undefined)?this._children[a].getValue():undefined
},getChildrenRefs:function(){return Object.keys(this._children)
},setValue:function(a){this.startEventAggregation();
this._applyData(a);
this.releaseEventAggregation()
},isDirty:function(){if(this.parent()){return true
}var b=this.getChildrenRefs();
for(var a=0;
a<b.length;
a++){if(this._children[b[a]].isDirty()){return true
}}return false
},resetDirtyFlag:function(){this.parent();
var b=this.getChildrenRefs();
for(var a=0;
a<b.length;
a++){this._children[b[a]].resetDirtyFlag()
}},_applyData:function(b){for(var a in b){if(this._children[a]===undefined){this.addChild(b[a],a)
}else{this.replaceChild(b[a],a)
}}for(a in this._children){if(b[a]===undefined){this.deleteChild(a)
}}}}});
W.Classes.newClass({name:"wixapps.core.data.ComputedFieldItem",imports:[],Class:{Binds:["_onDataContextChange"],Extends:"wixapps.core.data.DataItem",_type:null,initialize:function(c,b,d,e,a){this.parent(c);
this._type=d;
this._dataContext=a;
this._getterFunc=c.getComputedFieldGetter(b,e);
this._setterFunc=c.getComputedFieldSetter(b,e);
this._dataContext.addEvent(Constants.DataItemEvents.CHANGE,this._onDataContextChange)
},getTypeName:function(){return this._type
},getValue:function(){var b;
var a=this._value;
if(this._getterFunc===undefined){return this._value
}else{b=this._getterFunc(this._dataContext,this.passValue.bind(this));
if(b!==undefined){this._value=b;
if(this._value!==a){this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this})
}}}return this._value
},setValue:function(a){if(this._setterFunc===undefined){throw new Error("Computed field not writable")
}else{this._setterFunc(a,this._dataContext.setValue.bind(this._dataContext));
this.passValue(a)
}},passValue:function(b){var a=this._value;
this._value=b;
if(this._value!==a){this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this})
}},_onDataContextChange:function(){this.fireEvent(Constants.DataItemEvents.CHANGE)
}}});
Constants=window.Constants||{};
Constants.DataItem=Constants.DataItem||{};
Constants.DataItemEvents=Constants.DataItemEvents||{};
Constants.DataItemEventPhase=Constants.DataItemEventPhase||{};
Constants.DataItem.VOID_REF="VOID_REF";
Constants.DataItemEvents.CHANGE="dataItemChange";
Constants.DataItemEvents.VALIDATION_PERFORMED="dataItemValidationChanged";
Constants.DataItemEvents.CHANGE_EVENT_ACTION_ADD="add";
Constants.DataItemEvents.CHANGE_EVENT_ACTION_DELETE="delete";
Constants.DataItemEvents.CHANGE_EVENT_ACTION_REPLACE="replace";
Constants.DataItemEvents.bubblingEvents=[Constants.DataItemEvents.CHANGE];
Constants.DataItemEventPhase.ON_TARGET="onTarget";
Constants.DataItemEventPhase.BUBBLING="bubbling";
W.Classes.newClass({name:"wixapps.core.data.DataItem",imports:[],Class:{Binds:[],Extends:Events,_context:null,_value:undefined,_parent:undefined,_dirtyFlag:false,initialize:function(a){this._context=a
},getValue:function(a){return this._value
},setValue:function(b){var a=this._value;
this._value=b;
if(this._value!==a){if(a!==undefined){this._dirtyFlag=true
}this.fireChangedEvent()
}},fireChangedEvent:function(){this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this})
},getTypeName:function(){switch(typeOf(this._value)){case"string":return"String";
case"number":return"Number";
case"boolean":return"Boolean";
default:return undefined
}},isRef:function(){return false
},getParent:function(){return this._parent
},fireEvent:function(a,b){b=b||{};
if(b._previousTargets===undefined||!b._previousTargets.contains(this)){b.currentTarget=this;
b.phase=(b.target===b.currentTarget)?Constants.DataItemEventPhase.ON_TARGET:Constants.DataItemEventPhase.BUBBLING;
this.parent(a,b);
if(this._parent){if(Constants.DataItemEvents.bubblingEvents.contains(a)){b._previousTargets=b._previousTargets||[];
b._previousTargets.push(this);
this._fireBubblingEvent(a,b)
}}}},_fireBubblingEvent:function(b,c){var a={};
Object.each(c,function(e,d){a[d]=e
});
this._parent.fireEvent(b,a)
},isDirty:function(){return this._dirtyFlag
},setDirty:function(){this._dirtyFlag=true
},resetDirtyFlag:function(){this._dirtyFlag=false
},_passScope:function(b){var a=true;
if(b&&b.inheritsScope){a=b.inheritsScope(this)
}if(a){return b
}}}});
W.Classes.newClass({name:"wixapps.core.data.DataItemFactory",imports:["wixapps.core.data.DataItem","wixapps.core.data.DataItemProxy","wixapps.core.data.ArrayDataItem","wixapps.core.data.VirtualArrayDataItem","wixapps.core.data.CompositeDataItem","wixapps.core.data.ComputedFieldItem","wixapps.core.data.ExprDataItem"],Class:{Binds:[],_refResolver:null,_cfCtrlDict:{},_constructorMap:{},_funcLibrary:null,_debugMode:0,Static:{SANITATION_WARNING_ILLEGAL_TYPE:"Illegal type"},initialize:function(){},getDataItemClassName:function(c){var b;
var a=typeOf(c);
if(a=="object"){b=(c._type&&c._type.substr(0,7)=="wix:Ref")?"wixapps.core.data.DataItemProxy":"wixapps.core.data.CompositeDataItem"
}else{if(a=="array"){b="wixapps.core.data.ArrayDataItem"
}else{if(a=="function"){}else{if(a=="string"&&c.charAt(0)=="{"&&c.charAt(c.length-1)=="}"){b="wixapps.core.data.ExprDataItem"
}else{b="wixapps.core.data.DataItem"
}}}}return b
},createDataItem:function(c){var d;
var a;
var b;
d=this.getDataItemClassName(c);
a=this._getDataItemConstructor(d);
if(a){b=new a(this);
b.setValue(c);
b.resetDirtyFlag();
if(this._debugMode>0){if(!window._debug_idCounter){window._debug_idCounter=1000;
window._debug_itemDict={}
}b._debug_itemID=window._debug_idCounter++;
if(this._debugMode>1&&W&&W.Utils){b._debug_whodunnit=W.Utils.getStackTrace()
}}}return b
},createComputedField:function(b,c,d,a){return new this.imports.ComputedFieldItem(this,b,c,d,a)
},createVirtualArray:function(){return new this.imports.VirtualArrayDataItem(this)
},getFactory:function(){return this
},getRefResolver:function(){return this._refResolver
},registerRefResolver:function(a){if(a.deReference&&typeOf(a.deReference)==="function"){this._refResolver=a
}else{throw new Error("refResolver must provide function 'deReference()'")
}},registerComputedFieldController:function(a,c,d,b){if(a&&c){this._cfCtrlDict[this._getCfCtrlKey(a,c)]={getter:d,setter:b}
}},getComputedFieldGetter:function(a,c){var b=this._getCfCtrlKey(a,c);
if(this._cfCtrlDict[b]){return this._cfCtrlDict[b].getter
}},getComputedFieldSetter:function(a,c){var b=this._getCfCtrlKey(a,c);
if(this._cfCtrlDict[b]){return this._cfCtrlDict[b].setter
}},getFunctionLibrary:function(){return this._funcLibrary
},registerFunctionLibrary:function(a){this._funcLibrary=a
},_getCfCtrlKey:function(a,b){return a+"|"+b
},_getDataItemConstructor:function(b){var a;
if(b){if(!(b in this._constructorMap)){a=b.match(/[^\.]+$/)[0];
if(a&&a in this.imports){this._constructorMap[b]=this.imports[a]
}}return this._constructorMap[b]
}},sanitizeRawData:function(e){var b=this;
var d=["string","boolean","number","object","array"];
var c=[];
var a=function(h,g){var j=typeOf(h);
if(d.contains(j)){var i=(j=="array"?Array:(j=="object"?Object:undefined));
if(i){var f=i.map(h,function(l,k){return a(l,g+"/"+String(k))
});
return i.filter(f,function(k){return k!==null
})
}else{return h
}}else{c.push({id:b.SANITATION_WARNING_ILLEGAL_TYPE,path:g,value:typeOf(h)});
return null
}};
return{processedData:a(e,""),warnings:c}
},clone:function(){var a=new (this.constructor)();
a.registerRefResolver(this._refResolver);
a._cfCtrlDict={};
Object.each(this._cfCtrlDict,function(c,b){a._cfCtrlDict[b]=c
});
return a
}}});
W.Classes.newClass({name:"wixapps.core.data.DataItemProxy",imports:[],Class:{Extends:"wixapps.core.data.DataItem",Binds:["_onReferencedChange"],Static:{DEFAULT_MAX_REF_DEPTH:1},_ref:null,setValue:function(a){var b=this._ref;
this._ref=Object.clone(a);
this._resolveReference();
if(b!==null&&(this._ref==null||(this._ref.collectionId!=b.collectionId||this._ref.itemId!=b.itemId))){this._dirtyFlag=true;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this})
}},_resolveReference:function(){if(this._referenced){this._referenced.removeEvent(Constants.DataItemEvents.CHANGE,this._onReferencedChange)
}this._referenced=this._context.getRefResolver().deReference(this._ref.collectionId,this._ref.itemId);
if(this._referenced){this._referenced.addEvent(Constants.DataItemEvents.CHANGE,this._onReferencedChange)
}},_onReferencedChange:function(b){var a={};
Object.each(b,function(d,c){a[c]=d
});
b._previousTargets=b._previousTargets||[];
b._previousTargets.push(this);
a.currentTarget=this;
this.fireEvent(Constants.DataItemEvents.CHANGE,a)
},_proxyCall:function(b,a){if(!this._referenced&&this._ref){this._resolveReference()
}return(this._referenced?this._referenced[b].apply(this._referenced,a):undefined)
},getValue:function(a){a=(a===undefined)?this.DEFAULT_MAX_REF_DEPTH:a;
a--;
if(a>=0){return this._proxyCall("getValue",[a])
}else{return this._ref?Object.clone(this._ref):{}
}},isRef:function(){return true
},getParent:function(){return this._proxyCall("getParent",arguments)
},getTypeName:function(){return this._proxyCall("getTypeName",arguments)
},getChildren:function(){return this._proxyCall("getChildren",arguments)
},getChildIndex:function(){return this._proxyCall("getChildIndex",arguments)
},getChildByIndex:function(){return this._proxyCall("getChildByIndex",arguments)
},getChildrenRefs:function(){return this._proxyCall("getChildrenRefs",arguments)
},addChild:function(){return this._proxyCall("addChild",arguments)
},deleteChild:function(){return this._proxyCall("deleteChild",arguments)
},replaceChild:function(){return this._proxyCall("replaceChild",arguments)
},getChildByRef:function(){return this._proxyCall("getChildByRef",arguments)
},getChildValue:function(a){return this._proxyCall("getChildValue",arguments)
},setReferencedValue:function(a){return this._proxyCall("setValue",arguments)
},startEventAggregation:function(){this._proxyCall("startEventAggregation",arguments)
},releaseEventAggregation:function(){this._proxyCall("releaseEventAggregation",arguments)
},getChildRef:function(a){return this._proxyCall("getChildRef",arguments)
},getReferencedDataItem:function(){if(!this._referenced&&this._ref){this._resolveReference()
}return this._referenced
}}});
W.Classes.newClass({name:"wixapps.core.data.DataItemUtils",imports:[],Class:{initialize:function(){},findDataItems:function(e,f){var c=[];
var b;
var a=typeOf(f);
if(a=="function"){b=f
}else{if(a=="string"){b=function(g){return g.className==f
}
}}var d=function(g){if(b(g)){c.push(g)
}if(g.getChildren){g.getChildren().each(d)
}};
d(e);
return c
},getDataItemPath:function(e,a){var d=[];
var b;
var c;
e=e||null;
while(a&&a!==e&&a.getParent()){b=a.getParent();
if(b.getChildRef){c=b.getChildRef(a)
}else{if(b.getChildIndex){c=b.getChildIndex(a)
}}d.push(c);
a=b
}return d.reverse()
},resolveDataItemPath:function(e,d){var a;
var c;
var b=e;
while(b&&d.length){c=d.shift();
if(b.getChildByRef){b=b.getChildByRef(c)
}else{if(b.getChildByIndex){b=b.getChildByIndex(c)
}}}return b
}}});
W.Classes.newClass({name:"wixapps.core.data.DataMigrator",imports:[],Class:{Binds:[],_typesManager:null,initialize:function(a){this._typesManager=a
},diffTypes:function(b,p){var q=this._typesManager;
if(q.getTypeName(b)!=q.getTypeName(p)){throw"type name change is not permitted. old name ["+q.getTypeName(b)+"] new name ["+q.getTypeName(p)+"]"
}var n=q.getFields(b);
var c=q.getFields(p);
var e={};
for(var h=0;
h<c.length;
h++){var o=c[h];
e[o.name]=o
}var l=[];
var g=[];
for(var f=0;
f<n.length;
f++){var r=n[f];
var a=r.name;
var m=e[a];
if(!m){l.push({op:"FieldDeleted",fieldName:a,oldField:r})
}else{if(r.type!=m.type){if(m.defaultValue===undefined){throw"field ["+a+"] with new type must have defaultValue"
}l.push({op:"FieldTypeChanged",fieldName:a,oldField:r,newField:m})
}if(!this._areEqual(r.validations,m.validations)){if(m.defaultValue===undefined){throw"field ["+a+"] with new validations must have defaultValue"
}l.push({op:"FieldValidationsChanged",fieldName:a,oldField:r,newField:m})
}}g.push(r.name)
}for(var d=0;
d<c.length;
d++){if(g.indexOf(c[d].name)==-1){l.push({op:"FieldAdded",fieldName:c[d].name,newField:c[d]})
}}return l
},migrateItem:function(e,d){var a=Object.clone(d);
for(var b=0;
b<e.length;
b++){var c=e[b];
var f=c.fieldName;
switch(c.op){case"FieldDeleted":delete a[f];
break;
case"FieldTypeChanged":a[f]=this._convertType(a[f],c.oldField.type,c.newField.type,c.newField.defaultValue);
break;
case"FieldValidationsChanged":if(!this._typesManager.validateValue(a[f],c.newField)){a[f]=c.newField.defaultValue
}break;
case"FieldAdded":if(c.newField.defaultValue!==undefined){a[f]=c.newField.defaultValue
}break
}}return a
},_convertType:function(d,c,b,a){return a
},_areEqual:function(n,l){var k=(n!==undefined&&n!==null);
var f=(l!==undefined&&l!==null);
if(k!=f){return false
}var g=typeof(n);
var e=typeof(l);
if(g!=e){return false
}switch(g){case"object":var p=Object.keys(n);
var m=Object.keys(l);
if(p.length!=m.length){return false
}for(var d=0;
d<p.length;
d++){var o=p[d];
var q=n[o];
var h=l[o];
if(!this._areEqual(q,h)){return false
}}break;
case"array":if(n.length!=l.length){return false
}for(var c=0;
c<n.length;
c++){if(!this._areEqual(n[c],l[c])){return false
}}break;
default:return n===l;
break
}return true
}}});
W.Classes.newClass({name:"wixapps.core.data.ExprDataItem",imports:["wixapps.core.expressions.Expression"],Class:{Binds:[],Extends:"wixapps.core.data.DataItem",_exprSource:null,_expr:null,setValue:function(a){var b=String(a).substr(1,String(a).length-2);
this._exprSource=a;
this._expr=new this.imports.Expression(this._context.getFunctionLibrary());
this._expr.parseExpression(b);
this._value=undefined
},getChangeDispatchers:function(a){return this._expr.getSymbolItems(a.getSymbolResolver())
},getValue:function(b,a){if(b==0){return this._exprSource
}else{if(a){return this._expr.evaluate(a.getSymbolResolver())
}else{return this._exprSource
}}}}});
W.Classes.newClass({name:"wixapps.core.data.PrimitiveValidations",imports:[],Class:{Binds:[],_byName:{},initialize:function(){this._byName.arrayMaxLength=this._arrayMaxLength;
this._byName.email=this._isEmail;
this._byName.maxLength=this._maxLength;
this._byName.minLength=this._minLength;
this._byName.isNotWhitespace=this._isNotWhitespace;
this._byName.isInteger=this._isInteger;
this._byName.isPositive=this._isPositive;
this._byName.gt=this._gt;
this._byName.gte=this._gte;
this._byName.lt=this._lt;
this._byName.lte=this._lte;
this._byName.eq=this._equals;
this._byName.ne=this._notEquals
},validate:function(d,f,b){var e=this._byName[d];
if(!e){throw"No such validation function ["+d+"]"
}var a=[f];
if(b&&b.length>0){for(var c=0;
c<b.length;
c++){a.push(b[c])
}}return e.apply(this,a)
},_arrayMaxLength:function(b,a){return b.length<=a
},_isEmail:function(c){var b=function(j){if(j.length>253){return false
}var k=j.split(".");
if(k.length<2){return false
}for(var g=0;
g<k.length;
g++){var h=k[g];
if(!h.test(/^[a-zA-Z0-9-]*$/)){return false
}if(h.length>63){return false
}}return true
};
var f=function(g){return g.test(new RegExp("^[a-zA-Z0-9!$&*-=^`|~#%'+/?_\\{\\}.]*$"))
};
var d=c.lastIndexOf("@");
if(d<0){return false
}var a=c.substring(0,d);
var e=c.substring(d+1);
if(!b(e)){return false
}return f(a)
},_maxLength:function(b,a){return b.length<=a
},_minLength:function(b,a){return b.length>=a
},_isNotWhitespace:function(a){return a.trim().length>0
},_isInteger:function(a){return isFinite(a)&&(parseFloat(a)==parseInt(a))
},_isPositive:function(a){return a>0
},_gt:function(a,b){return a>b
},_gte:function(a,b){return a>=b
},_lt:function(a,b){return a<b
},_lte:function(a,b){return a<=b
},_equals:function(b,a){return b==a
},_notEquals:function(b,a){return b!=a
}}});
W.Classes.newClass({name:"wixapps.core.data.VirtualArrayDataItem",imports:[],traits:["wixapps.core.events.EventAggregator"],Class:{Binds:[],Extends:"wixapps.core.data.DataItem",_children:[],getTypeName:function(){return"Array"
},setChildren:function(a){this._children=a;
this.fireEvent(Constants.DataItemEvents.CHANGE,{target:this,phase:Constants.DataItemEventPhase.ON_TARGET})
},addChild:function(b,a){throw"not implemented"
},deleteChild:function(a){throw"not implemented"
},replaceChild:function(b,a){throw"not implemented"
},getChildren:function(){return this._children.slice(0)
},getValue:function(b,c){var a=[];
var d=this._passScope(c);
this._children.forEach(function(e){a.push(e.getValue(b,d))
});
return a
},setValue:function(a){throw"not implemented"
},getChildIndex:function(a){return this._children.indexOf(a)
},getChildByIndex:function(a){return this._children[a]
},getChildValue:function(a){return(this._children&&this._children[a]!==undefined)?this._children[a].getValue():undefined
},isDirty:function(){if(this.parent()){return true
}for(var a=0;
a<this._children.length;
a++){if(this._children[a].isDirty()){return true
}}return false
},resetDirtyFlag:function(){this.parent();
for(var a=0;
a<this._children.length;
a++){this._children[a].resetDirtyFlag()
}}}});
W.Classes.newClass({name:"wixapps.core.data.providers.ItemBasedDataProvider",Class:{Extends:"wixapps.core.data.providers.base.BaseDataProvider",Binds:[],initialize:function(a){this.parent(a)
},loadFromDefinition:function(a){},createItem:function(b,c,a){throw"not implemented"
},updateItem:function(b,c,a){throw"not implemented"
},deleteItem:function(c,b,a){throw"not implemented"
},readItem:function(c,b,a){throw"not implemented"
},readItems:function(b,c,a){throw"not implemented"
},query:function(d,b,e,a,f,c){throw"not implemented"
}}});
W.Classes.newClass({name:"wixapps.core.data.providers.ItemsLocalStore",imports:[],Class:{_dataItemFactory:null,_items:{},_markedDeleted:{},initialize:function(a){this._dataItemFactory=a
},clear:function(){this._items={};
this._markedDeleted={}
},get:function(a){return this._items[a]||null
},put:function(b,c){var a=this._items[b];
if(!a){a=this._dataItemFactory.createDataItem(c);
this._items[b]=a
}else{a.setValue(c)
}return a
},putIfNotDirty:function(b,c){var d=false;
var a=this._items[b];
if(!a){a=this._dataItemFactory.createDataItem(c);
this._items[b]=a
}else{d=a.isDirty();
if(!d){a.setValue(c)
}}return{wasDirty:d,item:a}
},insertDataItem:function(b,a){this._items[b]=a
},remove:function(a){delete this._items[a]
},each:function(a){Object.each(this._items,a)
},removeAll:function(){for(var a in this._items){delete this._items[a]
}},markItemAsDeleted:function(a){this._markedDeleted[a]=true
},unMarkItemAsDeleted:function(a){delete this._markedDeleted[a]
},isItemMarkedAsDeleted:function(a){return this._markedDeleted[a]===true
},getItemsMarkedAsDeleted:function(){return Object.keys(this._markedDeleted)
}}});
W.Classes.newClass({name:"wixapps.core.data.providers.base.BaseDataProvider",traits:["wixapps.core.apprepo.traits.AppRepoItem"],Class:{Binds:[],_appInstance:null,_type:null,initialize:function(a){this._appInstance=a;
this._loadTypes(a.getTypesManager())
},loadFromDefinition:function(a){this._type=a.type
},_loadTypes:function(a){throw"must implement me"
},isTypeDefinitionReadOnly:function(){return true
},createType:function(a){if(this.isTypeDefinitionReadOnly){throw"type definition is read only"
}else{throw"not implemented"
}},updateType:function(a){if(this.isTypeDefinitionReadOnly){throw"type definition is read only"
}else{throw"not implemented"
}},deleteType:function(a){if(this.isTypeDefinitionReadOnly){throw"type definition is read only"
}else{throw"not implemented"
}},getSerializableProperties:function(){return["type"]
}}});
W.Classes.newClass({name:"wixapps.core.data.providers.wixdb.WixDbBaseDataProvider",imports:["wixapps.core.data.providers.ItemsLocalStore","wixapps.core.data.providers.wixdb.WixDbTransport"],Class:{Extends:"wixapps.core.data.providers.ItemBasedDataProvider",Binds:[],_localStore:null,_api:null,initialize:function(a){this.parent(a);
this._localStore=new this.imports.ItemsLocalStore(a.getDataItemFactory());
this._logger=a.getLogger();
this._api=new this.imports.WixDbTransport()
},loadFromDefinition:function(a){this.parent(a);
this._storeId=a.storeId;
this._api.setStoreId(this._storeId)
},getTransport:function(){return this._api
},readItem:function(e,c,b){var a=this._localStore.get(e);
if(a){c(a);
return
}if(this._api.isTempStore()){b(this._logger.Errors.ITEM_NOT_FOUND);
return
}var d=function(f){var g=this._translateLoadedItem(f.item);
var h=this._localStore.isItemMarkedAsDeleted(e)?undefined:this._putInCacheIfNotDirty(e,g);
c(h)
}.bind(this);
this._api.readItem(e,d,b)
},readItems:function(a,l,b){var h={};
for(var g=0;
g<a.length;
g++){h[a[g]]=1
}var c=function(j,i){return h[i.getChildValue("_iid")]-h[j.getChildValue("_iid")]
};
var d=a.clone();
var n=0;
var k=[];
for(var f=0;
f<a.length;
f++){var m=this._localStore.get(a[f]);
if(m){d.splice(f-n.length,1);
n++;
k.push(m)
}}var e=function(i){k.append(i);
k.sort(c);
l(k)
};
if(d.length>0){this.query({_iid:{$in:d}},{},0,-1,e,b)
}else{e([])
}},query:function(e,c,f,a,g,d){var h=function(j){var i=[];
j.items.forEach(function(n){n=this._translateLoadedItem(n);
var m=n._iid;
if(!this._localStore.isItemMarkedAsDeleted(m)){var o=this._localStore.get(m);
if(!(o&&o.isDirty())){var l=this._localStore.put(m,n);
l.resetDirtyFlag();
i.push(l)
}}}.bind(this));
var k=false;
this._localStore.each(function(l,m){if(l.isDirty()){if(this._match(e,l.getValue(0))){k=true;
i.push(l)
}}}.bind(this));
if(k){this._sortQueryResults(i,c)
}g(i)
}.bind(this);
if(this._api.isTempStore()){var b=this.queryLocalStore(e,c,f,a);
g(b);
return
}this._api.query(e,c,f,a,h,d)
},_translateLoadedItem:function(a){return a
},queryLocalStore:function(d,c,e,a){var b=[];
this._localStore.each(function(f,g){if(this._match(d,f.getValue(0))){b.push(f)
}}.bind(this));
this._sortQueryResults(b,c);
this._cropQueryResults(b,e,a);
return b
},_putInCacheIfNotDirty:function(c,b){var a=this._localStore.putIfNotDirty(c,b);
if(!a.wasDirty){a.item.resetDirtyFlag()
}return a.item
},_loadTypes:function(a){var b=this._appInstance.getAppDef().getTypes();
if(!b){return
}b.each(function(c){a.registerType(c)
}.bind(this))
},getStoreId:function(){return this._storeId
},getSerializableProperties:function(){return this.parent().push("storeId")
},_sortQueryResults:function(a,b){a.sort(function(d,c){return this._compare(d.getValue(0),c.getValue(0),b)
}.bind(this))
},_cropQueryResults:function(b,c,a){c=c===undefined||c===null?0:c;
a=a===undefined||a===null?-1:a;
if(c>0){b.splice(0,c)
}if(a>-1){a=Math.min(a,b.length);
var d=b.length-a;
var e=b.length-d;
b.splice(e,d)
}},_match:function(b,d){for(var e in b){if(b.hasOwnProperty(e)){var c=b[e];
var a=this._evaluatePath(d,e);
if(typeof a!="array"){a=[a]
}var f=function(g){return this._matchSingleValue(c,g)
}.bind(this);
if(!a.some(f)){return false
}}}return true
},_matchSingleValue:function(a,b){if(typeof a=="object"){if(a.hasOwnProperty("$in")){return a["$in"].contains(b)
}else{if(a.hasOwnProperty("$ne")){return b!=a["$ne"]
}else{if(a.hasOwnProperty("$gt")){return b>a["$gt"]
}else{if(a.hasOwnProperty("$gte")){return b>=a["$gte"]
}else{if(a.hasOwnProperty("$lt")){return b<a["$lt"]
}else{if(a.hasOwnProperty("$lte")){return b<=a["$lte"]
}else{if(a.hasOwnProperty("$size")){return a["$size"]==b.length
}else{return this._match(a,b)
}}}}}}}}else{return b==a
}},_compare:function(f,e,h){var d=0;
for(var g in h){if(h.hasOwnProperty(g)){var k=this._evaluatePath(f,g);
var i=this._evaluatePath(e,g);
var j=k==undefined&&i==undefined?0:k==undefined?-1:i==undefined?1:k>i?1:k<i?-1:0;
if(j!=0){d=j*h[g];
break
}}}return d
},_evaluatePath:function(b,j){var a=j.split(".");
var f=b;
for(var c=0;
c<a.length;
c++){if(f===undefined||f===null){return f
}var d=a[c];
var g=d.match(/^(.*)\[([0-9]+)\]$/);
if(g){var h=g[1];
var e=g[2];
f=f[h]&&f[h][e]
}else{f=f[d]
}}return f
}}});
W.Classes.newClass({name:"wixapps.core.data.providers.wixdb.WixDbDraftDataProvider",imports:["wixapps.core.data.DataMigrator"],Class:{Extends:"wixapps.core.data.providers.wixdb.WixDbBaseDataProvider",Binds:[],_dataMigrator:null,_typeDiffs:{},_managedTypes:{},initialize:function(a){this.parent(a);
this._dataMigrator=new this.imports.DataMigrator(a.getTypesManager())
},isTypeDefinitionReadOnly:function(){return false
},save:function(g,b){if(this._api.isTempStore()){throw"cannot save draft to temp store"
}this._typeDiffs={};
var l=function(m,p){var r=[];
var o=null;
var n=null;
for(var q=0;
q<m.results.length;
q++){if(m.results[q].success){var j=m.results[q];
var k=p[q];
switch(k.name){case"CreateItem":o=Object.clone(k.params.item);
o._id=j.id;
o._hash=j.hash;
n=this._localStore.put(j.id,o);
n.resetDirtyFlag();
break;
case"UpdateItem":o=Object.clone(k.params.item);
o._hash=j.hash;
n=this._localStore.put(o._iid,o);
n.resetDirtyFlag();
break;
case"DeleteItem":this._localStore.unMarkItemAsDeleted(j.itemId);
break
}}else{r.push(m.results[q])
}}if(r.length>0){b(r)
}else{g()
}}.bind(this);
var d=this._localStore.getItemsMarkedAsDeleted();
var h=[];
var a=[];
this._localStore.each(function(i,j){if(i.getChildValue("_hash")){a.push(i)
}else{h.push(i)
}});
this._api.activateBatchMode();
try{for(var f=0;
f<d.length;
f++){this._api.deleteItem(d[f])
}for(var e=0;
e<h.length;
e++){this._api.createItem(h[e].getValue(0))
}for(var c=0;
c<a.length;
c++){this._api.updateItem(a[c].getValue(0))
}this._api.sendBatchAndDeactivate(l,b)
}finally{this.getTransport().discardBatch()
}},createItem:function(c,f,d){var b=c.getValue(0);
if(!b._iid){b._iid=W.Utils.getUniqueId("i")
}var e=this._localStore.get(b._iid);
if(e||b._hash){d(this._logger.Errors.CREATE_ITEM_CALLED_FOR_NON_NEW);
return
}var a=this._localStore.put(b._iid,b);
f(a)
},updateItem:function(c,f,d){var b=c.getValue(0);
if(!b._iid){d(this._logger.Errors.UPDATE_ITEM_CALLED_FOR_NEW);
return
}var e=this._localStore.get(b._iid);
if(!e){d(this._logger.Errors.UPDATE_ITEM_CALLED_FOR_NEW);
return
}var a=this._localStore.put(b._iid,b);
f(a)
},deleteItem:function(c,b,a){this._localStore.remove(c);
this._localStore.markItemAsDeleted(c);
b(c)
},createType:function(b){var a=this._appInstance.getTypesManager();
a.registerType(b);
this._addManagedType(a.getTypeName(b))
},updateType:function(d){var a=this._appInstance.getTypesManager();
var b=a.getTypeName(d);
var c=a.getType(b);
var e=this._dataMigrator.diffTypes(c,d);
if(e.length>0){this._getDiffsForType(b).append(e)
}a.registerType(d);
this._localStore.each(function(g){if(g.getTypeName()==b){var i=g.getValue(0);
var h=g.isDirty();
var f=this._dataMigrator.migrateItem(e,i);
g.setValue(f);
if(!h){g.resetDirtyFlag()
}}}.bind(this))
},deleteType:function(b){var a=function(){};
this._localStore.each(function(c,d){if(c.getTypeName()==b){this.deleteItem(d,a,a)
}}.bind(this));
this._appInstance.getTypesManager().removeType(b);
this._removeManagedType(b)
},_getDiffsForType:function(a){var b=this._typeDiffs[a];
if(!b){b=[];
this._typeDiffs[a]=b
}return b
},_translateLoadedItem:function(b){var a=this._getDiffsForType(b._type);
if(a.length>0){return this._dataMigrator.migrateItem(a,b)
}else{return b
}},_loadTypes:function(a){var c=this._appInstance.getAppDef().getTypes();
if(c&&c.length>0){for(var b=0;
b<c.length;
b++){this._addManagedType(a.getTypeName(c[b]))
}}this.parent(a)
},_addManagedType:function(a){this._managedTypes[a]=true
},_removeManagedType:function(a){delete this._managedTypes[a]
},_getManagedTypes:function(){return Object.keys(this._managedTypes)
},getManagedTypes:function(){var c=[];
var e=this._getManagedTypes();
for(var b=0;
b<e.length;
b++){var a=e[b];
var d=this._appInstance.getTypesManager().getType(a);
c.push(d)
}return c
}}});
W.Classes.newClass({name:"wixapps.core.data.providers.wixdb.WixDbPublishedDataProvider",Class:{Extends:"wixapps.core.data.providers.wixdb.WixDbBaseDataProvider",Binds:[],createItem:function(b,d,c){var a=b.getValue(0);
var e=function(f){this._localStore.insertDataItem(f.id,b);
a._iid=f.id;
a._hash=f.hash;
b.setValue(a);
b.resetDirtyFlag();
d(b)
}.bind(this);
this._api.createItem(a,e,c)
},updateItem:function(b,d,c){var a=b.getValue(0);
var e=function(f){a._hash=f.hash;
var g=this._localStore.put(a._iid,a);
g.resetDirtyFlag();
d(g)
}.bind(this);
this._api.updateItem(a,e,c)
},deleteItem:function(d,c,b){var a=function(){this._localStore.remove(d);
this._localStore.unMarkItemAsDeleted(d);
c(d)
}.bind(this);
this._api.deleteItem(d,a,b)
}}});
W.Classes.newClass({name:"wixapps.core.data.providers.wixdb.WixDbTransport",imports:[],Class:{Extends:"wixapps.core.utils.WixServiceTransportBase",_draftStore:"<DRAFT>",_storeId:"<DRAFT>",_batch:null,_getServiceUrl:function(){this._serviceUrl=this._serviceUrl||this._getBaseUrl()+"/apps/wixdb/1/";
return this._serviceUrl
},_getBaseUrl:function(){return window.location.origin||this._extractBasePath(window.location.href)
},_extractBasePath:function(a){var b=document.createElement("a");
b.href=a;
return b.protocol+"//"+b.hostname
},loadFromDefinition:function(a){this.parent(a);
this._type=a.type
},createItem:function(b,c,a){this.doRequest("CreateItem",{storeId:this._storeId,item:b},c,a)
},updateItem:function(b,c,a){this.doRequest("UpdateItem",{storeId:this._storeId,item:b},c,a)
},deleteItem:function(c,b,a){this.doRequest("DeleteItem",{storeId:this._storeId,itemId:c},b,a)
},readItem:function(c,b,a){this.doRequest("ReadItem",{storeId:this._storeId,itemId:c},b,a)
},query:function(d,b,e,a,f,c){this.doRequest("Query",{storeId:this._storeId,filter:d,sort:b,skip:e,limit:a==-1?null:a},f,c)
},setStoreId:function(a){this._storeId=a
},isTempStore:function(){return this._storeId=="<DRAFT>"
},activateBatchMode:function(){if(this._batch){throw"batch already active"
}this._batch=[]
},discardBatch:function(){this._batch=null
},sendBatchAndDeactivate:function(d,c){if(!this._batch){throw"batch mode is not active"
}var b={operations:this._batch};
this._batch=null;
var a=function(e){d(e,b.operations)
};
this.doRequest("Batch",b,a,c)
},doRequest:function(a,c,d,b){if(this._batch){this._batch.push({name:a,params:c})
}else{this.parent(a,c,d,b)
}}}});
W.Classes.newClass({name:"wixapps.core.data.selectors.ItemDataSelector",Class:{Binds:[],Extends:"wixapps.core.data.selectors.base.BaseDataSelector",getItem:function(b,a){throw"not implemented"
},getSerializableProperties:function(){return this.parent().push("itemId")
}}});
W.Classes.newClass({name:"wixapps.core.data.selectors.ListDataSelector",Class:{Extends:"wixapps.core.data.selectors.base.BaseDataSelector",getItems:function(b,a){throw"not implemented"
},isListSelector:function(){return true
}}});
W.Classes.newClass({name:"wixapps.core.data.selectors.ManualSelectedItemDataSelector",Class:{Binds:[],_itemId:null,_virtualItem:null,Extends:"wixapps.core.data.selectors.ItemDataSelector",loadFromDefinition:function(a){this.parent(a);
this._itemId=a.itemId
},setSelectedItem:function(a){this._itemId=a;
this.getItem(function(){},function(){})
},getItem:function(c,b){var a=function(d){this._virtualItem=this._virtualItem||this._dataItemFactory.createDataItem({});
this._virtualItem.setValue(d.getValue(0));
c(this._virtualArray)
}.bind(this);
this._dataProvider.readItem(this._itemId,a,b)
},getSerializableProperties:function(){return this.parent().push("itemId")
}}});
W.Classes.newClass({name:"wixapps.core.data.selectors.ManualSelectedListDataSelector",traits:["wixapps.core.data.selectors.traits.Selectable"],Class:{Extends:"wixapps.core.data.selectors.ListDataSelector",_itemIds:null,_virtualArray:null,loadFromDefinition:function(a){this.parent(a);
this._itemIds=a.itemIds
},setSelectedItems:function(a){this._itemIds=a;
this.getItems(function(){},function(){})
},getItems:function(c,b){var a=function(d){this._virtualArray=this._virtualArray||this._dataItemFactory.createVirtualArray();
this._virtualArray.setChildren(d);
this.setSelectedItem(this._virtualArray.getChildByIndex(0));
c(this._virtualArray)
}.bind(this);
this._dataProvider.readItems(this._itemIds,a,b)
},getSerializableProperties:function(){return this.parent().push("itemIds")
}}});
W.Classes.newClass({name:"wixapps.core.data.selectors.SelectedItemDataSelector",Class:{Binds:[],Extends:"wixapps.core.data.selectors.ItemDataSelector",setListSelectorId:function(b){this._listSelectorId=b;
var a=this._appInstance.getDataSelectors().getById(this._listSelectorId);
this._virtualSelectedItem=a.getSelectedItem()
},loadFromDefinition:function(a){this.parent(a);
this._listSelectorId=a.listSelectorId;
this.setListSelectorId(this._listSelectorId)
},getItem:function(b,a){b(this._virtualSelectedItem)
},getSerializableProperties:function(){return this.parent().push("listSelectorId")
}}});
W.Classes.newClass({name:"wixapps.core.data.selectors.base.BaseDataSelector",traits:["wixapps.core.apprepo.traits.AppRepoItem"],Class:{Binds:[],_dataProvider:null,_appInstance:null,_dataItemFactory:null,initialize:function(a){this._appInstance=a;
this._dataItemFactory=a.getDataItemFactory()
},loadFromDefinition:function(a){this._forType=a.forType;
this._type=a.type;
this.setDataProvider(this._appInstance.getDataProviders().getById(a.dataProvider))
},setDataProvider:function(a){this._dataProvider=a
},getFriendlyName:function(){return this._name
},getSelectionType:function(){return this._forType
},isListSelector:function(){return false
},reset:function(){throw"not implemented"
},getSerializableProperties:function(){return["name","type","dataProvider","forType"]
}}});
W.Classes.newTrait({name:"wixapps.core.data.selectors.traits.Selectable",trait:{_selectedItem:null,setSelectedItem:function(a){this._virtualSelectedItem=this._virtualSelectedItem||this._dataItemFactory.createDataItem({});
this._virtualSelectedItem.setValue(a.getValue(0))
},getSelectedItem:function(){return this._virtualSelectedItem
}}});
W.Classes.newClass({name:"wixapps.core.dataservice.DataService",imports:["wixapps.core.dataservice.DataServiceTransport","wixapps.core.managers.TypesManager","wixapps.core.data.DataItemFactory","wixapps.core.data.DataItem"],Class:{_api:null,_dataItemFactory:null,_cache:null,initialize:function(c,a,b){this._api=c;
this._dataItemFactory=a;
this._cache=b;
this._dataItemFactory.registerRefResolver(this)
},getTransport:function(){return this._api
},getDataItemFactory:function(){return this._dataItemFactory
},getItemCache:function(){return this._cache
},createStore:function(b,a){this._api.createStore(b,a)
},createType:function(b,c,a){this._api.createType(b,c,a)
},readType:function(a,c,b){this._api.readType(a,c,b)
},listTypes:function(b,a){this._api.listTypes(b,a)
},deleteType:function(a,c,b){this._api.deleteType(a,c,b)
},createCollection:function(b,c,d,a){this._api.createCollection(b,c,d,a)
},listCollections:function(b,a){this._api.listCollections(b,a)
},deleteCollection:function(b,c,a){this._api.deleteCollection(b,c,a)
},createItem:function(c,a,e,b){var d=a.getValue(0);
var f=function(g){this._cache.insertDataItem(this._cache.key(c,g.id),a);
d._iid=g.id;
d._hash=g.hash;
a.setValue(d);
e(a)
}.bind(this);
this._api.createItem(c,d,f,b)
},updateItem:function(c,a,e,b){var d=a.getValue(0);
var f=function(g){d._hash=g.hash;
var h=this._cache.put(this._cache.key(c,d._iid),d);
e(h)
}.bind(this);
this._api.updateItem(c,d,f,b)
},deleteItem:function(c,e,d,b){var a=function(){this._cache.remove(this._cache.key(c,e));
d(e)
}.bind(this);
this._api.deleteItem(c,e,a,b)
},readItem:function(b,d,c,a){var e=function(f){Object.each(f.referencedItems,function(j,i){if(!this._cache.isItemMarkedAsDeleted(i)){this._putInCacheIfNotDirty(i,j)
}}.bind(this));
var g=this._cache.key(b,f.item._iid);
var h=this._cache.isItemMarkedAsDeleted(g)?null:this._putInCacheIfNotDirty(this._cache.key(b,f.item._iid),f.item);
Object.each(f.unreferencedItems,function(m,k){var i=this._api.getLogger();
var j={description:m.errorDescription,code:m.errorCode};
i.reportError(j,this.$className,"readItem",i.SubCategory.DATA_SERVICE)
}.bind(this));
c(h)
}.bind(this);
this._api.readItem(b,d,e,a)
},query:function(f,d,b,e,a,g,c){var h=function(j){Object.each(j.referencedItems,function(n,m){if(!this._cache.isItemMarkedAsDeleted(m)){this._putInCacheIfNotDirty(m,n)
}}.bind(this));
var i=[];
var k=[];
j.items.forEach(function(o){var n=this._cache.key(f,o._iid);
if(!this._cache.isItemMarkedAsDeleted(n)){var p=this._cache.get(n);
if(!(p&&p.isDirty())){var m=this._cache.put(n,o);
m.resetDirtyFlag();
i.push(m);
k.push({_type:"wix:Ref<"+o._type+">",collectionId:f,itemId:o._iid})
}}}.bind(this));
var l=false;
this._cache.each(function(m,n){if(m.isDirty()){var o=this._cache.idsFromKey(n);
if(o.collectionId==f){if(this._match(d,m.getValue(0))){l=true;
i.push(m);
k.push({_type:"wix:Ref<"+m.getTypeName()+">",collectionId:f,itemId:o.itemId})
}}}}.bind(this));
Object.each(j.unreferencedItems,function(p,o){var m=this._api.getLogger();
var n={description:p.errorDescription,code:p.errorCode};
m.reportError(n,this.$className,"readItem",m.SubCategory.DATA_SERVICE)
}.bind(this));
if(l){this._sortQueryResults(i,k,b)
}g(i,k)
}.bind(this);
this._api.query(f,d,b,e,a,h,c)
},queryCache:function(g,e,d,f,a){var b=[];
var c=[];
this._cache.each(function(h,i){var j=this._cache.idsFromKey(i);
if(j.collectionId==g){if(this._match(e,h.getValue(0))){b.push(h);
c.push({_type:"wix:Ref<"+h.getTypeName()+">",collectionId:g,itemId:j.itemId})
}}}.bind(this));
this._sortQueryResults(b,c,d);
this._cropQueryResults(b,c,f,a);
return{items:b,refList:c}
},_putInCacheIfNotDirty:function(b,c){var a=this._cache.putIfNotDirty(b,c);
if(!a.wasDirty){a.item.resetDirtyFlag()
}return a.item
},_sortQueryResults:function(a,d,f){var c=[];
for(var e=0;
e<a.length;
e++){c.push({item:a[e],ref:d[e]})
}c=c.sort(function(h,g){return this._compare(h.item.getValue(0),g.item.getValue(0),f)
}.bind(this));
a.empty();
d.empty();
for(var b=0;
b<c.length;
b++){a.push(c[b].item);
d.push(c[b].ref)
}},_cropQueryResults:function(b,c,d,a){d=d===undefined||d===null?0:d;
a=a===undefined||a===null?-1:a;
if(d>0){b.splice(0,d);
c.splice(0,d)
}if(a>-1){a=Math.min(a,b.length);
var e=b.length-a;
var f=b.length-e;
b.splice(f,e);
c.splice(f,e)
}},deReference:function(a,b){return this._cache.get(this._cache.key(a,b))||null
},readItemFromCache:function(a,b){return this.deReference(a,b)
},_match:function(b,d){for(var e in b){if(b.hasOwnProperty(e)){var c=b[e];
var a=this._evaluatePath(d,e);
if(typeof a!="array"){a=[a]
}var f=function(g){return this._matchSingleValue(c,g)
}.bind(this);
if(!a.some(f)){return false
}}}return true
},_matchSingleValue:function(a,b){if(typeof a=="object"){if(a.hasOwnProperty("$in")){return a["$in"].contains(b)
}else{if(a.hasOwnProperty("$ne")){return b!=a["$ne"]
}else{if(a.hasOwnProperty("$gt")){return b>a["$gt"]
}else{if(a.hasOwnProperty("$gte")){return b>=a["$gte"]
}else{if(a.hasOwnProperty("$lt")){return b<a["$lt"]
}else{if(a.hasOwnProperty("$lte")){return b<=a["$lte"]
}else{if(a.hasOwnProperty("$size")){return a["$size"]==b.length
}else{return false
}}}}}}}}else{return b==a
}},_compare:function(f,e,h){var d=0;
for(var g in h){if(h.hasOwnProperty(g)){var k=this._evaluatePath(f,g);
var i=this._evaluatePath(e,g);
var j=k==undefined&&i==undefined?0:k==undefined?-1:i==undefined?1:k>i?1:k<i?-1:0;
if(j!=0){d=j*h[g];
break
}}}return d
},_evaluatePath:function(b,j){var a=j.split(".");
var f=b;
for(var c=0;
c<a.length;
c++){if(f===undefined||f===null){return f
}var d=a[c];
var g=d.match(/^(.*)\[([0-9]+)\]$/);
if(g){var h=g[1];
var e=g[2];
f=f[h]&&f[h][e]
}else{f=f[d]
}}return f
}}});
W.Classes.newClass({name:"wixapps.core.dataservice.DataServiceTransport",imports:[],Class:{Extends:"wixapps.core.dataservice.DataServiceTransportBase",_storeId:null,initialize:function(a,c,b){this.parent(c,b);
this._storeId=a
},createStore:function(b,a){this.doRequest("CreateStore",{storeId:this._storeId},b,a)
},createType:function(b,c,a){this.doRequest("CreateType",{storeId:this._storeId,type:b},c,a)
},readType:function(a,c,b){this.doRequest("ReadType",{storeId:this._storeId,typeName:a},c,b)
},listTypes:function(b,a){this.doRequest("ListTypes",{storeId:this._storeId},b,a)
},deleteType:function(a,c,b){this.doRequest("DeleteType",{storeId:this._storeId,typeName:a},c,b)
},createCollection:function(b,c,d,a){this.doRequest("CreateCollection",{storeId:this._storeId,collectionId:b,typeNames:c},d,a)
},listCollections:function(b,a){this.doRequest("ListCollections",{storeId:this._storeId},b,a)
},deleteCollection:function(b,c,a){this.doRequest("DeleteCollection",{storeId:this._storeId,collectionId:b},c,a)
},createItem:function(c,b,d,a){this.doRequest("CreateItem",{storeId:this._storeId,collectionId:c,item:b},d,a)
},updateItem:function(c,b,d,a){this.doRequest("UpdateItem",{storeId:this._storeId,collectionId:c,item:b},d,a)
},deleteItem:function(b,d,c,a){this.doRequest("DeleteItem",{storeId:this._storeId,collectionId:b,itemId:d},c,a)
},readItem:function(b,d,c,a){this.doRequest("ReadItem",{storeId:this._storeId,collectionId:b,itemId:d,autoDereferenceLevel:3},c,a)
},query:function(f,d,b,e,a,g,c){this.doRequest("Query",{storeId:this._storeId,collectionId:f,filter:d,sort:b,skip:e,limit:a==-1?null:a,autoDereferenceLevel:3},g,c)
}}});
W.Classes.newClass({name:"wixapps.core.dataservice.DataServiceTransportBase",imports:["wixapps.core.utils.WixAppsLogger"],Class:{_serviceUrl:null,_userProperties:null,_accessToken:null,_logger:null,initialize:function(c,a){this._userProperties=c;
this._accessToken=a;
var b=window.location.origin||this._extractBasePath(window.location.href);
this._serviceUrl=b+"/apps/lists/1/"
},_extractBasePath:function(a){var b=document.createElement("a");
b.href=a;
return b.protocol+"//"+b.hostname
},getLogger:function(){if(!this._logger){this._logger=new this.imports.WixAppsLogger()
}return this._logger
},doRequest:function(a,e,f,d){if(!d){d=function(h){throw h.description+" ("+h.code+")"
}
}var c=function(i){var h=this.getLogger();
h.reportError(i,this.$className,"doRequest",h.SubCategory.DATA_SERVICE)
}.bind(this);
var b=function(h){if(!h.success){var i={code:h.errorCode,description:h.errorDescription};
c(i);
d(i)
}else{f(h.payload)
}}.bind(this);
var g=function(h){var i={code:h.status?h.status:-1,description:h.statusText?h.statusText:"Unspecified error occurred, possibly a connection problem"};
c(i);
d(i)
};
this._postJsonRequest(a,e,b,g)
},_postJsonRequest:function(a,d,e,b){var c=new Request.JSON({url:this._serviceUrl+a+"/",urlEncoded:false,onSuccess:e,onFailure:b});
c.options=c.options||{};
c.options.headers=c.options.headers||{};
c.options.headers["If-Modified-Since"]="Sat, 1 Jan 2005 00:00:00 GMT";
c.options.headers["Content-Type"]="application/json; charset=utf-8";
c.options.headers["x-wix-user-properties"]=this._userProperties;
c.options.headers["x-wix-access-token"]=this._accessToken;
c.post(JSON.encode(d))
}}});
W.Classes.newClass({name:"wixapps.core.dataservice.ItemCache",imports:[],Class:{_dataItemFactory:null,_items:{},_markedDeleted:{},initialize:function(a){this._dataItemFactory=a
},get:function(a){return this._items[a]||null
},put:function(b,c){var a=this._items[b];
if(!a){a=this._dataItemFactory.createDataItem(c);
this._items[b]=a
}else{a.setValue(c)
}return a
},putIfNotDirty:function(b,c){var d=false;
var a=this._items[b];
if(!a){a=this._dataItemFactory.createDataItem(c);
this._items[b]=a
}else{d=a.isDirty();
if(!d){a.setValue(c)
}}return{wasDirty:d,item:a}
},insertDataItem:function(b,a){this._items[b]=a
},remove:function(a){delete this._items[a]
},key:function(a,b){return a+"/"+b
},idsFromKey:function(a){var b=a.split("/");
return{collectionId:b[0],itemId:b[1]}
},each:function(a){Object.each(this._items,a)
},removeAll:function(){for(var a in this._items){delete this._items[a]
}},markItemAsDeleted:function(a){this._markedDeleted[a]=true
},unMarkItemAsDeleted:function(a){delete this._markedDeleted[a]
},isItemMarkedAsDeleted:function(a){return this._markedDeleted[a]===true
},getItemsMarkedAsDeleted:function(){return Object.keys(this._markedDeleted)
}}});
W.Classes.newTrait({name:"wixapps.core.events.EventAggregator",trait:{Binds:["_aggregatingDispatchFunc"],_aggregatedEvents:[],_eventFilter:[],_originalFireEventFunc:null,initialize:function(){this._originalFireEventFunc=this.fireEvent
},startEventAggregation:function(a){this._eventFilter=a||[];
this.fireEvent=this._aggregatingDispatchFunc
},releaseEventAggregation:function(a){a=a||Constants.DataItemEvents.CHANGE;
this.fireEvent=this._originalFireEventFunc;
if(this._aggregatedEvents.length>0){this.fireEvent(a,{target:this,events:this._aggregatedEvents})
}this._aggregatedEvents=[]
},_aggregatingDispatchFunc:function(a,b){if(this._eventFilter.length==0||this._eventFilter.contains(a)){if(b.events){this._aggregatedEvents=this._aggregatedEvents.concat(b.events)
}else{this._aggregatedEvents.push({type:a,payload:b})
}}else{this._originalFireEventFunc(a,b)
}}}});
W.Classes.newClass({name:"wixapps.core.events.ProxyEventBus",imports:["wixapps.core.events.TreePath"],Class:{Extends:Events,_map:null,_originals:[],_interceptors:[],initialize:function(){this._map={same:Constants.WixAppTreeRelation.THIS,parent:Constants.WixAppTreeRelation.PARENT,ancestor:Constants.WixAppTreeRelation.ANCESTOR,sibling:Constants.WixAppTreeRelation.SIBLING,descendant:Constants.WixAppTreeRelation.DESCENDANT,"parent-descendant":Constants.WixAppTreeRelation.PARENT_DESCENDANT,"sibling-descendant":Constants.WixAppTreeRelation.SIBLING_DESCENDANT}
},fireProxyEvent:function(c,d,b,a){b.sender=c;
b.context=c.getViewContext();
b.data=c.getData();
b.def=c.getViewDefinition();
this.fireEvent(d,b,a)
},addEventFilteredByScope:function(b,e,d,c,a){if(!e){e="same"
}var f=this._map[e];
if(!f&&e!="any"){throw'"'+e+'" is invalid scope value'
}var g=function(h){var j=h&&h.context&&h.context.getEnvironment().getTreePath();
var i=b.getEnvironment().getTreePath();
if(e=="any"||(i&&j&&i.isOtherRelatedToThisAs(j,f))){c(h)
}};
this._originals.push(c);
this._interceptors.push(g);
this.addEvent(d,g,a)
},removeEvent:function(c,b){var d=this._originals.indexOf(b);
var a=d==-1?b:this._interceptors[d];
if(d!=-1){this._originals.splice(d,1);
this._interceptors.splice(d,1)
}this.parent(c,a)
}}});
Constants.WixAppTreeRelation=Constants.WixAppTreeRelation||{PARENT:1,ANCESTOR:2,SIBLING:4,DESCENDANT:8,PARENT_DESCENDANT:16,SIBLING_DESCENDANT:32,THIS:64};
(function(){var a=0;
W.Classes.newClass({name:"wixapps.core.events.TreePath",Class:{_path:null,initialize:function(b){this._path=b?b._path.clone():[]
},pushScope:function(){this._path.push(a++)
},isOtherRelatedToThisAs:function(b,c){switch(c){case Constants.WixAppTreeRelation.THIS:return this._path.length==b._path.length&&this._path.every(function(e,d){return b._path[d]==e
});
break;
case Constants.WixAppTreeRelation.PARENT:return !this.isRoot()&&b.get(-1)==this.get(-2);
case Constants.WixAppTreeRelation.ANCESTOR:return this._path.indexOf(b.get(-1))!=-1;
case Constants.WixAppTreeRelation.SIBLING:return(this._path.length==b._path.length)&&this.get(-2)==b.get(-2);
case Constants.WixAppTreeRelation.DESCENDANT:return b.isOtherRelatedToThisAs(this,Constants.WixAppTreeRelation.ANCESTOR);
case Constants.WixAppTreeRelation.PARENT_DESCENDANT:return this.isRoot()||b.isOtherRelatedToThisAs(this._createTempParent(),Constants.WixAppTreeRelation.ANCESTOR);
case Constants.WixAppTreeRelation.SIBLING_DESCENDANT:return this.isOtherRelatedToThisAs(b,Constants.WixAppTreeRelation.PARENT_DESCENDANT)&&!this.isOtherRelatedToThisAs(b,Constants.WixAppTreeRelation.PARENT)&&!this.isOtherRelatedToThisAs(b,Constants.WixAppTreeRelation.DESCENDANT)
}},_createTempParent:function(){var b=new this.constructor(this);
b._path=this._path.slice(0,-1);
return b
},isRoot:function(){return this._path.length==1
},get:function(b){return this._path[(this._path.length+b)%this._path.length]
}}})
})();
W.Classes.newClass({name:"wixapps.core.expressions.EvalScopeWrapper",imports:["wixapps.core.data.DataItemFactory","wixapps.core.data.DataItemUtils"],traits:[],Class:{Binds:["_onSourceChange","_onEvaluationContextChange"],_source:null,_evaluationContext:null,_maxRefDepth:0,_data:null,_dataItemFactory:null,_dataItemUtils:null,_evalPending:false,_changeUpdateTimeChunk:0,initialize:function(c,b,d,a){this._source=c;
this._evaluationContext=b;
this._viewEnvironment=d;
this._maxRefDepth=a;
this._dataItemFactory=this._viewEnvironment.getDataItemFactory();
this._dataItemUtils=new this.imports.DataItemUtils();
this.evaluateData();
this._source.addEvent(Constants.DataItemEvents.CHANGE,this._onSourceChange);
this._exprChangeDispatchers=this._getExprChangeDispatchers(this._source,this._evaluationContext);
this._exprChangeDispatchers.each(function(e){e.addEvent(Constants.DataItemEvents.CHANGE,this._onEvaluationContextChange)
}.bind(this))
},evaluateData:function(){var a=this._source.getValue(this._maxRefDepth,this._evaluationContext);
if(this._data===null){this._data=this._dataItemFactory.createDataItem(a)
}else{this._data.setValue(a)
}},getData:function(){return this._data
},_onSourceChange:function(){this._requestEvaluation()
},_onEvaluationContextChange:function(){this._requestEvaluation()
},_requestEvaluation:function(){if(this._evalPending==false){this._evalPending=true;
setTimeout(function(){this.evaluateData();
this._evalPending=false
}.bind(this),this._changeUpdateTimeChunk)
}},_getExprChangeDispatchers:function(b,a){return this._dataItemUtils.findDataItems(b,"wixapps.core.data.ExprDataItem").reduce(function(c,d){var e=d.getChangeDispatchers(a)||[];
return Array.concat(c,e)
},[]).reduce(function(d,c){if(d.indexOf(c)==-1){return d.concat(c)
}else{return d
}},[])
},dispose:function(){this._exprChangeDispatchers.each(function(a){a.removeEvent(Constants.DataItemEvents.CHANGE,this._onEvaluationContextChange)
});
this._exprChangeDispatchers=null;
this._source.removeEvent(Constants.DataItemEvents.CHANGE,this._onSourceChange);
this._source=null
}}});
W.Classes.newClass({name:"wixapps.core.expressions.Expression",imports:["wixapps.core.expressions.ExpressionParser"],Class:{Binds:[],_parser:null,_funcLib:null,_expr:null,_exprSource:"",initialize:function(a){this._parser=new this.imports.ExpressionParser();
this._funcLib=a
},parseExpression:function(a){this._exprSource=a;
this._expr=this._parser.parseExpressionSource(a)[0]
},getSymbolItems:function(a){var c=this;
var b=function(e,d){if(d.type=="ref"){return e.concat(a.resolveExpressionReference(d.content))
}else{if(d.type=="function"){return Array.reduce(d.params,b,e)
}else{return e
}}};
return Array.reduce([this._expr],b,[]).filter(function(d){return d.addEvent
})
},evaluate:function(a){var c=this;
var b=function(e,d,h){if(e.type=="function"){var g=d.getFunctionByName(e.content);
var i=Array.map(e.params,function(j){return b(j,d,h)
});
if(!g&&e.content.slice(0,5)=="Debug"){c._performDebugFunc(e.content,a,i)
}else{return g.apply(null,i)
}}else{if(e.type=="primitive"){return e.content
}else{if(e.type=="ref"){var f=h.evaluateExpressionReference(e.content);
if(f===undefined){throw new Error("Expression: "+c._exprSource+" | Cannot resolve symbol "+e.content)
}return f
}}}};
if(this._expr){return b(this._expr,this._funcLib,a)
}},_performDebugFunc:function(b,a,c){if(b=="Debug.symbols"){var d=a.listSymbols();
Object.each(d,function(e,f){console.log(e,"=",f)
})
}},dispose:function(){this._funcLib=null;
this._parser=null
}}});
W.Classes.newClass({name:"wixapps.core.expressions.ExpressionLexer",imports:[],Class:{parseExpression:function(b){if(b.length){var a=this._findString(b)||this._findSymbol(b)||this._findBracket(b);
if(a){return Array.concat([a],this.parseExpression(b.slice(a.length)))
}else{return this.parseExpression(b.slice(1))
}}else{return[]
}},_findString:function(c){var a=["'",'"'];
var d=function(f,g){if(f.length){var e=f.charAt(0);
if(e=="\\"&&f.length>1){return String.concat(e+f.charAt(1),d(f.slice(2),g))
}else{if(e!=g){return String.concat(e,d(f.slice(1),g))
}}}return""
};
var b=c.charAt(0);
if(a.contains(b)){return String.concat('"',d(c.slice(1),b),'"')
}},_findSymbol:function(e){var d=/[\w\*\/\-\%\+\$]/;
var a=/[\w\*\/\-\%\+\.\$\[\]\?_]/;
var b=function(g){var f=g.charAt(0);
if(g.length&&f.match(a)){return String.concat(f,b(g.slice(1)))
}else{return""
}};
var c=e.charAt(0);
if(c.match(d)){return String.concat(c,b(e.slice(1)))
}},_findBracket:function(b){var a=b.charAt(0);
if(a=="("||a==")"){return a
}}}});
W.Classes.newClass({name:"wixapps.core.expressions.ExpressionParser",imports:["wixapps.core.expressions.ExpressionLexer"],Class:{DIALECT_JS:0,DIALECT_LISP:1,_primitiveTypes:["boolean","string","number"],parseExpressionSource:function(b){var d=new this.imports.ExpressionLexer(b);
var e=d.parseExpression(b);
var c=(e[0]=="(")?this.DIALECT_LISP:this.DIALECT_JS;
var a=this._foldTokenList(e,c);
return this._foldFunctionChain(a)
},_foldTokenList:function(c,b){if(c.length){var a=this._getFunction(c,b)||this._getPrimitive(c,b)||this._getReference(c,b);
if(a){return Array.concat([a.node],this._foldTokenList(a.next,b))
}}return[]
},_foldFunctionChain:function(a){var c=this._foldFunctionChain;
if(a.length>0&&a.every(function(d){return d.type=="function"
})){var b=a.slice(1).reduce(function(e,d){return{type:d.type,content:d.content,params:Array.concat([e],c(d.params))}
},a[0]);
return[b]
}else{return a
}},_getFunction:function(f,c){var a;
var d=(c==this.DIALECT_LISP)?0:1;
var b=(c==this.DIALECT_LISP)?1:0;
if(f[d]=="("&&typeOf(f[b])=="string"){var e=this._getFuncParams(f);
return{next:f.slice(e.length+3),node:{type:"function",content:f[b],params:this._foldTokenList(e,c)}}
}},_getFuncParams:function(b){var a=function(f,c){if(f.length&&c>0){var d=f[0];
var e=f.slice(1);
if(d=="("){return Array.concat([d],a(e,c+1))
}else{if(d==")"){return Array.concat([d],a(e,c-1))
}else{return Array.concat([d],a(e,c))
}}}else{return[]
}};
return a(b.slice(2),1).slice(0,-1)
},_getPrimitive:function(d,a){var c;
var b=d[0];
if(b=="true"){c=true
}else{if(b=="false"){c=false
}else{if((b.charAt(0)=='"'&&b.charAt(b.length-1)=='"')||(b.charAt(0)=="'"&&b.charAt(b.length-1)=="'")){c=this._unescapeString(b.slice(1,b.length-1))
}else{if(!isNaN(parseFloat(b,10))){c=parseFloat(b,10)
}else{if(!isNaN(parseInt(b,10))){c=parseInt(b,10)
}}}}}if(c!==undefined){return{next:d.slice(1),node:{type:"primitive",content:c}}
}},_unescapeString:function(a){a=a.replace(/\\/g,"");
return a
},_getReference:function(b,a){return{next:b.slice(1),node:{type:"ref",content:b[0]}}
}}});
W.Classes.newClass({name:"wixapps.core.expressions.FunctionLibrary",imports:[],Class:{_funcDef:{"if":function(c,a,b){return(c?a:b)
},eq:function(b,a){return b==a
},ne:function(b,a){return b!=a
},gt:function(b,a){return b>a
},lt:function(b,a){return b<a
},toString:function(a){return a.toString()
},mod:function(d,c){return d%c
},add:function(){var b=0;
for(var a=0;
a<arguments.length;
a++){b+=arguments[a]
}return b
},mult:function(){var b=1;
for(var a=0;
a<arguments.length;
a++){b*=arguments[a]
}return b
},sub:function(d,c){return d-c
},div:function(d,c){return d/c
},match:function(c,b,a){return(c==b?a:undefined)
},"true?":function(a,b){if(Boolean(a)===true){return b
}else{return undefined
}},"false?":function(a,b){if(Boolean(a)===false){return b
}else{return undefined
}},"else":function(a,b){if(a===undefined){return b
}else{return a
}},Math:{floor:function(a){return Math.floor(a)
},round:function(a){return Math.round(a)
}},String:{length:function(a){return a.length
},isEmpty:function(a){return a==null||a.length==0
},charAt:function(b,a){return b.charAt(a)
},charCodeAt:function(b,a){return b.charCodeAt(b,a)
},concat:function(){return String.concat.apply(arguments[0],arguments)
},indexOf:function(b,a){return b.indexOf(a)
},lastIndexOf:function(b,a){return b.lastIndexOf(a)
},match:function(b,a){return b.match(new RegExp(a))
},replace:function(c,a,b){return c.replace(a,b)
},search:function(b,a){return b.search(new RegExp(a))
},slice:function(b,c,a){return b.slice(c,a)
},split:function(b,a){return b.split(a)
},substr:function(b,c,a){return b.substr(c,a)
},substring:function(b,c,a){return b.substring(c,a)
},toLowerCase:function(a){return a.toLowerCase()
},toUpperCase:function(a){return a.toUpperCase()
},contains:function(b,a){return b.contains(a)
},trim:function(a){return a.trim()
},toInt:function(a){return parseInt(a)
},toFloat:function(a){return parseFloat(a)
}}},_funcTable:{},initialize:function(){var a=function(d,c,b){Object.each(c,function(f,e){if(typeOf(f)=="function"){d[b+e]=f
}else{if(typeOf(f=="object")){a(d,f,e+".")
}}})
};
this._funcTable={};
a(this._funcTable,this._funcDef,"")
},getFunctionByName:function(a){return this._funcTable[a]
}}});
Constants=window.Constants||{};
Constants.FlowLayout=Constants.FlowLayout||{};
Constants.FlowLayout.Anchors={TOP_LEFT:"top-left",BOTTOM_LEFT:"bottom-left",TOP_RIGHT:"top-right",BOTTOM_RIGHT:"bottom-right"};
Constants.FlowLayout.Anchors.ALL=[Constants.FlowLayout.Anchors.TOP_LEFT,Constants.FlowLayout.Anchors.BOTTOM_LEFT,Constants.FlowLayout.Anchors.TOP_RIGHT,Constants.FlowLayout.Anchors.BOTTOM_RIGHT];
W.Classes.newClass({name:"wixapps.core.layouts.FlowLayout",imports:["wixapps.core.layouts.Width","wixapps.core.layouts.Padding","wixapps.core.layouts.Spacing"],Class:{_anchor:null,_width:null,_model:null,_elements:null,_lines:null,_defaults:null,initialize:function(a){this._anchor=Array.contains(Constants.FlowLayout.Anchors.ALL,a)?a:Constants.FlowLayout.Anchors.TOP_LEFT;
this._defaults={spacing:new this.imports.Spacing(5),padding:new this.imports.Padding(0)}
},setModel:function(a,b){this._model=Object.clone(a);
this._elements=b.slice();
this._buildLines()
},getHeight:function(){return this._lines.height
},_getSpacing:function(){return this._model.spacing?new this.imports.Spacing(this._model.spacing):this._defaults.spacing
},_getPadding:function(a){return a.padding?new this.imports.Padding(a.padding):this._defaults.padding
},positionElements:function(k,c,a){k=k||this.getHeight();
c=c||0;
a=a||0;
var g=this._getSpacing();
var h=0;
for(var f=0;
f<this._lines.length;
f++){var m=this._lines[f];
var b=0+(m.align=="default"?0:(m.align=="center"?Math.floor((this._model.minWidth-m.width)/2):this._model.minWidth-m.width));
for(var d=0;
d<m.items.length;
d++){var l=m.items[d];
var e=m.elements[d];
this._positionElement(k,c,a,l,e,b,h,m.height);
b+=m.widths[d]+g.horizontal
}h+=m.height+g.vertical
}},_positionElement:function(i,c,a,j,d,b,f,h){var e=j.vAlign||"bottom";
if(this._anchor.indexOf("bottom")>-1){if(e=="bottom"){e="top"
}else{if(e=="top"){e="bottom"
}}}var g=this._getPadding(j);
if(e=="middle"){f+=Math.floor(((h-g.getPaddedHeight(d))/2))
}if(e=="bottom"){f+=h-g.getPaddedHeight(d)
}if(this._anchor.indexOf("bottom")>-1){f=i-(f+g.getPaddedHeight(d))
}if(this._anchor.indexOf("right")>-1){b=this._model.minWidth-(b+g.getPaddedWidth(d))
}d.setPos(c+b+g.left,a+f+g.top)
},_buildLines:function(){var m=function(){return{height:0,width:0,items:[],elements:[],widths:[]}
};
var t=[m()];
var n=this._getSpacing();
for(var e=0;
e<this._model.items.length;
e++){var f=this._elements[e];
var q=this._model.items[e];
var p=this._getPadding(q);
var s=q.minWidth!=undefined?new this.imports.Width(q.minWidth):new this.imports.Width(this._elements[e].getWidth());
var o=q.maxWidth!=undefined?new this.imports.Width(q.maxWidth):s;
var r=t[t.length-1];
var l=r.items.length>0?n.horizontal:0;
if((r.width+l+s.toAbsolute(this._model.minWidth))>this._model.minWidth){r=m();
t.push(r);
l=0
}var b=Math.min(Math.max(o.toAbsolute(this._model.minWidth),s.toAbsolute(this._model.minWidth)),this._model.minWidth-(r.width+l));
if(p.getPaddedWidth(f)!=b){f.setWidth(b-(p.getHorizontalPadding()))
}if(r.items.length==0){var k=this._anchor.indexOf("left")!=-1?"left":"right";
var a=q.align?q.align:k;
r.align=(a==k)?"default":(a=="center"?"center":"opposite")
}r.items.push(q);
r.elements.push(f);
r.widths.push(b);
r.width+=l+b;
var c=p.getPaddedHeight(f);
if(c>r.height){r.height=c
}if(q.last===true||q.last==="true"){t.push(m())
}}if(t[t.length-1].items.length==0){t.pop()
}var g=0;
for(var d=0;
d<t.length;
d++){g+=t[d].height
}t.height=g+(Math.max(t.length-1,0)*n.vertical);
this._lines=t
}}});
W.Classes.newClass({name:"wixapps.core.layouts.FourWayFlowLayout",imports:["wixapps.core.layouts.Spacing","wixapps.core.layouts.FlowLayout"],Class:{_model:null,_elements:null,_layouts:{},_spacing:null,setModel:function(b,d){this._model=Object.clone(b);
this._elements=d.slice();
this._spacing=new this.imports.Spacing(b.spacing!=undefined?b.spacing:5);
var f={};
var c={};
var e=function(h){var g=f[h];
if(!g){g={minWidth:b.minWidth,spacing:this._spacing.toString(),items:[]};
f[h]=g
}return g
}.bind(this);
var a=function(h){var g=c[h];
if(!g){g=[];
c[h]=g
}return g
};
this._model.items.forEach(function(k,h){var j=Object.clone(k);
var g=j.anchor||Constants.FlowLayout.Anchors.TOP_LEFT;
delete j.anchor;
e(g).items.push(j);
a(g).push(d[h])
}.bind(this));
Constants.FlowLayout.Anchors.ALL.forEach(function(g){if(f[g]){var h=new this.imports.FlowLayout(g);
h.setModel(f[g],c[g]);
this._layouts[g]=h
}else{this._layouts[g]={getHeight:function(){return 0
},positionElements:function(i,k,j){}}
}}.bind(this))
},getHeight:function(){var b=Constants.FlowLayout.Anchors;
var a=function(f,e){var d=f.getHeight();
var c=e.getHeight();
return d+c+((d>0&&c>0&&this._spacing.vertical>0)?this._spacing.vertical:0)
}.bind(this);
return Math.max(a(this._layouts[b.TOP_LEFT],this._layouts[b.BOTTOM_LEFT]),a(this._layouts[b.TOP_RIGHT],this._layouts[b.BOTTOM_RIGHT]),this._model.minHeight||0)
},positionElements:function(a,c,b){a=a||this.getHeight();
c=c||0;
b=b||0;
Constants.FlowLayout.Anchors.ALL.forEach(function(d){this._layouts[d].positionElements(a,c,b)
}.bind(this))
}}});
W.Classes.newClass({name:"wixapps.core.layouts.Padding",imports:[],Class:{top:0,right:0,bottom:0,left:0,initialize:function(a){this.setFromString(a)
},setFromString:function(b){var a=b.toString().split(/\s+/);
if(a.length>0){this.top=this.bottom=this.right=this.left=parseInt(a[0])
}if(a.length>1){this.right=this.left=parseInt(a[1])
}if(a.length>2){this.bottom=parseInt(a[2])
}if(a.length>3){this.left=parseInt(a[3])
}},getHorizontalPadding:function(){return this.left+this.right
},getVerticalPadding:function(){return this.top+this.bottom
},getPaddedWidth:function(a){return a.getWidth()+this.right+this.left
},getPaddedHeight:function(a){return a.getHeight()+this.top+this.bottom
}}});
W.Classes.newClass({name:"wixapps.core.layouts.Spacing",imports:[],Class:{horizontal:0,vertical:0,initialize:function(a){this.setFromString(a)
},setFromString:function(b){var a=b.toString().split(/\s+/);
if(a.length>0){this.horizontal=this.vertical=parseInt(a[0])
}if(a.length>1){this.vertical=this.left=parseInt(a[1])
}},toString:function(){return this.horizontal.toString()+" "+this.vertical.toString()
}}});
Constants=window.Constants||{};
Constants.SuperFlowLayout=Constants.SuperFlowLayout||{};
Constants.SuperFlowLayout.Regions={NORTH:"north",SOUTH:"south",EAST:"east",WEST:"west",CENTER:"center"};
Constants.SuperFlowLayout.Regions.ALL=[Constants.SuperFlowLayout.Regions.NORTH,Constants.SuperFlowLayout.Regions.WEST,Constants.SuperFlowLayout.Regions.CENTER,Constants.SuperFlowLayout.Regions.EAST,Constants.SuperFlowLayout.Regions.SOUTH];
W.Classes.newClass({name:"wixapps.core.layouts.SuperFlowLayout",imports:["wixapps.core.layouts.FourWayFlowLayout"],Class:{_model:null,_elements:null,_widths:{},_heights:{north:0,middle:0,south:0},_layouts:{},setModel:function(g,b){this._model=Object.clone(g);
this._elements=b.slice();
var c=Constants.SuperFlowLayout.Regions;
var j={};
c.ALL.forEach(function(k){j[k]=(this._model.regions&&this._model.regions[k]&&this._model.regions[k].minWidth)||0
}.bind(this));
this._widths={};
var f=j[c.EAST]+j[c.CENTER]+j[c.WEST];
var e=Math.max(j[c.NORTH],j[c.SOUTH],f,this._model.minWidth||0);
this._widths[c.NORTH]=this._widths[c.SOUTH]=e;
this._widths[c.EAST]=j[c.EAST];
this._widths[c.WEST]=j[c.WEST];
this._widths[c.CENTER]=e-(j[c.EAST]+j[c.WEST]);
var d={};
var i={};
var a=function(m){var k=d[m];
if(!k){k={minWidth:this._widths[m],items:[]};
var l=this._model.regions&&this._model.regions[m];
if(l){if(l.spacing!=undefined){k.spacing=l.spacing
}if(l.minHeight!=undefined){k.minHeight=l.minHeight
}}d[m]=k
}return k
}.bind(this);
var h=function(l){var k=i[l];
if(!k){k=[];
i[l]=k
}return k
};
this._model.items.forEach(function(m,k){var l=Object.clone(m);
var n=l.region||c.CENTER;
delete l.region;
a(n).items.push(l);
h(n).push(b[k])
}.bind(this));
c.ALL.forEach(function(l){if(d[l]){var k=new this.imports.FourWayFlowLayout();
k.setModel(d[l],i[l]);
this._layouts[l]=k
}else{this._layouts[l]={getHeight:function(){return 0
},positionElements:function(m,o,n){}}
}}.bind(this));
this._heights.north=this._layouts[c.NORTH].getHeight();
this._heights.south=this._layouts[c.SOUTH].getHeight();
this._heights.middle=Math.max(this._layouts[c.CENTER].getHeight(),this._layouts[c.EAST].getHeight(),this._layouts[c.WEST].getHeight())
},getHeight:function(){return this._heights.north+this._heights.middle+this._heights.south
},positionElements:function(m,e,c){m=m||this.getHeight();
e=e||0;
c=c||0;
var b=Constants.SuperFlowLayout.Regions;
var f=this._layouts;
var g=f[b.NORTH];
var h=f[b.SOUTH];
var i=f[b.EAST];
var k=f[b.WEST];
var a=f[b.CENTER];
var d=e;
var j=c;
g.positionElements(this._heights.north,d,j);
j+=this._heights.north;
k.positionElements(this._heights.middle,d,j);
d+=this._widths[b.WEST];
a.positionElements(this._heights.middle,d,j);
d+=this._widths[b.CENTER];
i.positionElements(this._heights.middle,d,j);
d=0;
j+=this._heights.middle;
h.positionElements(this._heights.south,d,j)
}}});
W.Classes.newClass({name:"wixapps.core.layouts.Width",imports:[],Class:{_kind:null,_val:null,initialize:function(a){if(a=="undefined"||a==null||!this.setFromString(a.toString())){throw"Incorrect width format: ["+a+"]"
}},setFromString:function(a){if(a&&/^(-?[0-9]+|[0-9]+%)$/.test(a)){var b={val:parseInt(a),kind:"exact"};
if(a.indexOf("-")!=-1){b.kind="offset"
}if(a.indexOf("%")!=-1){b.kind="percent"
}this._kind=b.kind;
this._val=b.val;
return true
}else{return false
}},toAbsolute:function(a){if(this._kind=="offset"){return a+this._val
}if(this._kind=="percent"){return Math.floor((a*this._val)/100)
}return this._val
}}});
Constants=window.Constants||{};
Constants.DataEditingModel=Constants.DataEditingModel||{};
Constants.DataEditingModel.ContainmentOptions={NONE:"none",DIRECT:"direct",ONE_TO_MANY_REFERENCE:"one-2-many-ref",MANY_TO_MANY_REFERENCE:"many-2-many-ref"};
W.Classes.newClass({name:"wixapps.core.logics.AbstractDataEditingModel",imports:[],Class:{Binds:[],initialize:function(a){},getDataService:function(){},getTypesManager:function(){},getCategories:function(){},getCategorySections:function(a){},getAddNewTypesInCategory:function(a){},getAddNewTypesToParent:function(a){},getQueryItems:function(b,a,c){},loadTree:function(b,a,c){},getTreeTopLevelItems:function(b,a,c){},getTreeChildren:function(c,a,b){},getChildren:function(a){},getContainmentOptions:function(a,b){},removeChild:function(a,b){},insertChild:function(b,d,c,a){},createItem:function(b,a){},copyItem:function(a){},getCollectionOfItem:function(a){},deleteItem:function(a){}}});
W.Classes.newClass({name:"wixapps.core.logics.CategoryLogic",imports:[],Class:{Extends:"wixapps.core.logics.SingleItemLogic",Binds:[],_dsp:function(a,b){return this._environment.getAppInstance().getDescriptorValue(["dataEditing","logicParams","dataSelection",a])||b
},_getDescriptorValue:function(a){return this._environment.getAppInstance().getDescriptorValue(a)
},generateDataSelectorPanel:function(a,b,c){this.generateSelectionList(a,b,c)
},_getCollectionForSelection:function(){},generateSelectionList:function(a,c,e,h,g){var j=this._getCollectionForSelection()||e.collectionId,b=this._dsp("categoriesSelectionFilter",null),f=this._dsp("categoriesSelectionSort",null),i=this._dsp("categoriesSelectionSkip",null),d=this._dsp("categoriesSelectionLimit",null);
this._environment.getDataService().query(j,b,f,i,d,function(k){var l;
if(k.length==0){a.addLabel(this._dsp("noCategoriesLabel","No categories found"));
l=this._dsp("addFirstCategoryLabel","Create a new category")
}else{a.addLabel(this._dsp("inlineHelp","Pick which category you'd like to appear and click OK."));
l=this._dsp("anotherCategoryLabel","No thanks, I’d like to create a new category");
var n=this._generateCategoriesCombo(k,a,c,e);
n.runWhenReady(function(o){if(g){g.apply(this,[o])
}})
}var m=a.addButtonField(null,l,null,null,"withArrow");
m.addEvent(Constants.CoreEvents.CLICK,function(){this._createNewListAndSelect(a,c,e)
}.bind(this))
}.bind(this))
},_generateCategoriesCombo:function(j,a,b,d){var e=[],h;
for(var f=0;
f<j.length;
f++){h=j[f].getValue();
e.push({value:h._iid,label:h.title})
}var g=b.get("appLogicParams");
a.addBreakLine(20);
var c=a.addComboBoxField("",e).addEvent("inputChanged",function(i){g.itemId={type:"AppPartParam",value:i.value};
b.fireDataChangeEvent()
});
if(d.itemId){c.setValue(d.itemId)
}return c
},_createNewListAndSelect:function(b,d,g){var a=b.injects();
if(a.Config.siteNeverSavedBefore()){a.EditorDialogs.openWixAppsSiteMustBeSaved()
}else{var c=this._dsp("newItemType","Category");
var f=this._dsp("newItemCollection","Categories");
var h=this.getDataEditingModel().getItemTemplate(c,true);
var e=this._dsp("newItemOverrides",{title:"New Category"});
Object.each(e,function(j,i){h.getChildByRef(i).setValue(j)
});
this._environment.getDataService().createItem(f,h,function(i){this._changeSelectedCategory(d,f+"/"+i.getChildValue("_iid"));
b._dialogWindow.closeDialog();
a.Commands.executeCommand("WAppsEditorCommands.OpenEditDataDialog",{selectedComp:this._environment.getAppPart()})
}.bind(this),function(i){a.EditorDialogs.openErrorDialog(this._dsp("newItemErrorTitle","Error creating new category"),this._dsp("newItemErrorDescription","Please try again in a few minutes"),i.code+"\n"+i.description,null)
}.bind(this))
}},_changeSelectedCategory:function(d,a){var f=d.get("appLogicParams");
var e=a.split("/")[0];
var g=a.split("/")[1];
var c={};
c=Object.merge(c,d._data);
f.itemId={type:"AppPartParam",value:g};
f.collectionId={type:"AppPartParam",value:e};
var b={};
b=Object.merge(b,d._data);
d.fireDataChangeEvent(undefined,b,c)
},getSelectedIId:function(a,b){return b.itemId
},getDataEditingMetaInfo:function(){var e=this._environment.getAppInstance();
var b=e.getDescriptorValue(["dataEditing","dataSelectionLabel"])||"Choose Category";
var a=e.getDescriptorValue(["dataEditing","dataEditingLabel"])||"Edit Data";
var d=this._environment.getAppPart().getPartDef().name;
var c=(this._logicParams?this._environment.getDataService().deReference(this._logicParams.collectionId,this._logicParams.itemId):null);
if(c){d=d+" - "+c.getChildValue("title");
if(d.length>35){d=d.substr(0,35)+"..."
}}return{title:d,hasDataEdit:true,hasDataSelection:true,dataSelectionLabel:b,dataEditingLabel:a}
}}});
W.Classes.newClass({name:"wixapps.core.logics.DescriptorDataEditingModel",imports:["wixapps.core.logics.AbstractDataEditingModel"],Class:{Binds:[],_logicEnv:null,_descriptor:null,_categories:[],_sectionsByCat:{},_addNewByCat:{},_sections:{},_trees:{},initialize:function(a){this._logicEnv=a;
this._descriptor=a.getAppInstance().getAppDescriptor();
this._parse()
},getDataService:function(){return this._logicEnv.getDataService()
},getTypesManager:function(){return this._logicEnv.getTypesManager()
},getCategories:function(){return this._categories
},getDataEditingHelpId:function(){return this._getDescriptorValue(["dataEditing","helpId"])
},getItemEditingHelpId:function(){return this._getDescriptorValue(["dataEditing","itemEditingHelpId"])
},getPotentialParentsTree:function(c,b){var a=this._getDescriptorValue(["dataEditing","typeMetaData",c,"parentsTreeId"]);
this.loadTree(a,function(){b(this.getFullTree(a))
}.bind(this))
},getCategorySections:function(a){return this._sectionsByCat[a]
},getCategoryHeight:function(c){var a=this._getDescriptorValue(["dataEditing","categories"]);
for(var b=0;
b<a.length;
b++){if(a[b].name==c){return a[b].height
}}},getAddNewTypesInCategory:function(a){return this._addNewByCat[a]||[]
},getAddNewTypesToParent:function(f){var b=this._getDescriptorValue(["dataEditing","typeMetaData",f.getTypeName(),"addChildrenTypes"]);
if(b){return b
}var g=this._getChildrenTypeField(f.getTypeName());
if(g){var a=this.getTypesManager();
var h=a.getArrayAllowedTypes(g.type);
var c=[];
for(var e=0;
e<h.length;
e++){var d=a.isRef(h[e])?a.getReferredType(h[e]):h[e];
if(!c.contains(d)){c.push(d)
}c.combine(a.getExtendingTypes(d))
}return c
}else{return[]
}},getQueryItems:function(a,d){var c=function(e,f){d(e)
};
var b=function(e){throw e
};
this.getDataService().query(a.collectionId,a.filter,a.sort,a.skip,a.limit,c,b)
},getQueryNoResultsMessage:function(a){return a.noResultsMessage||"No items"
},loadTree:function(e,g){var f=function(h,i){g(h)
};
var c=function(h){throw h
};
var a=this._getDescriptorValue(["dataEditing","trees",e]);
var d=a.collectionId;
var b=a.topLevelSorting||{};
this.getDataService().query(d,{},b,0,null,f,c)
},getTreeTopLevelItems:function(d){var a=this._getDescriptorValue(["dataEditing","trees",d]);
var c=a.collectionId;
var b=a.topLevelSorting||{};
return this.getDataService().queryCache(c,{},b,0,-1).items
},getTreeChildren:function(d,c){var f=this._getChildrenTypeField(c.getTypeName());
if(!f){return[]
}var a=this._getDescriptorValue(["dataEditing","trees",d]);
var g=a.includedTypes||[];
var e=c.getChildByRef(f.name);
var b=[];
e.getChildren().forEach(function(h){if(g.contains(h.getTypeName())){b.push(h)
}});
return b
},getFullTree:function(d){var b=this.getTreeTopLevelItems(d);
var c=[];
for(var a=0;
a<b.length;
a++){c.push({title:b[a].getChildValue("title"),item:b[a],children:this._getTreeChildrenRecursive(d,b[a])})
}return c
},getNoChildrenForItemMessage:function(a){return this._getDescriptorValue(["dataEditing","typeMetaData",a,"noChildrenMessage"])||"No Items"
},_getTreeChildrenRecursive:function(e,a){var b=[];
var d=this.getTreeChildren(e,a);
for(var c=0;
c<d.length;
c++){b.push({title:d[c].getChildValue("title"),item:d[c],children:this._getTreeChildrenRecursive(e,d[c])})
}return b
},getChildren:function(a){var c=this._getChildrenTypeField(a.getTypeName());
if(!c){return[]
}var b=a.getChildByRef(c.name);
return b.getChildren()
},getContainmentOptions:function(a,b){return this.getContainmentOptionsByTypeNames(a.getTypeName(),b.getTypeName())
},getContainmentOptionsByTypeNames:function(a,e){var g=this._getChildrenTypeField(a);
if(!g){return[]
}var b=this.getTypesManager().getArrayAllowedTypes(g.type);
var f=[];
var h=this.getTypesManager();
for(var c=0;
c<b.length;
c++){var j;
if(h.isOf(e,b[c])){j=Constants.DataEditingModel.ContainmentOptions.DIRECT;
if(!f.contains(j)){f.push(j)
}}else{if(h.isOf(e,h.getReferredType(b[c]))){var d=this._getParentTypeField(e);
j=(d&&!h.isArray(d.type))?Constants.DataEditingModel.ContainmentOptions.ONE_TO_MANY_REFERENCE:Constants.DataEditingModel.ContainmentOptions.MANY_TO_MANY_REFERENCE;
if(!f.contains(j)){f.push(j)
}}}}return f
},getContainmentType:function(e,g){var a=this.getTypesManager();
if(g.isRef()){g=g.getReferencedDataItem()
}var c=this.getChildren(e);
for(var b=0;
b<c.length;
b++){var d=c[b];
if(d===g){return Constants.DataEditingModel.ContainmentOptions.DIRECT
}if(d.isRef()&&d.getReferencedDataItem()===g){var f=this._getParentTypeField(g.getTypeName());
return(f&&!a.isArray(f.type))?Constants.DataEditingModel.ContainmentOptions.ONE_TO_MANY_REFERENCE:Constants.DataEditingModel.ContainmentOptions.MANY_TO_MANY_REFERENCE
}}return null
},getItemBreadCrumbs:function(a){itemTitle="";
parents=this.getItemParents(a);
if(parents.length==1){itemTitle=parents[0].getChildValue("title")+"/"
}itemTitle+=a.getChildValue("title");
return itemTitle
},getItemParents:function(d){var c=this._getParentTypeField(d.getTypeName());
if(!c){var b=d.getParent()&&d.getParent().getParent();
if(b){return[b]
}return[]
}var a=d.getChildByRef(c.name);
if(a.getValue()==null){return[]
}if(this.getTypesManager().isArray(a.getTypeName())){return a.getChildren()
}return[a]
},getChildContainmentOptions:function(a){var b=this._getParentTypeField(a);
if(!b){return this._getContainmentOptions(a)
}return this._getFieldAcceptableTypes(b)
},removeChild:function(b,g){var f=this._getChildrenTypeField(b.getTypeName());
if(f){var e=b.getChildByRef(f.name);
this._removeFromArray(e,g)
}var d=this._getParentTypeField(g.getTypeName());
if(d){var a=g.getChildByRef(d.name);
if(this.getTypesManager().isArray(a.getTypeName())){this._removeFromArray(a,b)
}else{if(this._areDataItemsEqual(a,b)){var c={_type:d.type,collectionId:Constants.DataItem.VOID_REF,itemId:Constants.DataItem.VOID_REF};
a.setValue(c)
}}}return g
},insertChild:function(k,b,m,h){var j=this._getChildrenTypeField(k.getTypeName());
if(!j){throw"child ["+b+"] cannot be added to parent ["+k+"] because parent has no children field definition in descriptor"
}var d=k.getChildByRef(j.name);
var i=b;
if(m==Constants.DataEditingModel.ContainmentOptions.MANY_TO_MANY_REFERENCE||m==Constants.DataEditingModel.ContainmentOptions.ONE_TO_MANY_REFERENCE){var l=this.getCollectionOfItem(b);
if(!l){throw"CollectionId for child ["+b+"] is unknown"
}i={_type:"wix:Ref<"+b.getTypeName()+">",collectionId:l,itemId:b.getChildValue("_iid")};
var g=this._getParentTypeField(b.getTypeName());
if(g){var f=this.getCollectionOfItem(k);
var a={_type:"wix:Ref<"+k.getTypeName()+">",collectionId:f,itemId:k.getChildValue("_iid")};
if(m==Constants.DataEditingModel.ContainmentOptions.MANY_TO_MANY_REFERENCE){var c=b.getChildByRef(g.name);
c.addChild(a)
}else{var e=b.getChildByRef(g.name);
e.setValue(a)
}}}d.addChild(i,h)
},getItemTemplate:function(a,d){var c=Object.clone(this._getDescriptorValue(["dataEditing","typeMetaData",a,"newItemTemplate"]));
c._type=a;
if(d){c._iid=this._generateId()
}var b=this.getDataService().getDataItemFactory().createDataItem(c);
return this.getTypesManager().applyDefaults(b)
},getItemDefaultCollection:function(a){return this._getDescriptorValue(["dataEditing","typeMetaData",a,"collectionId"])
},getItemDefaultNewChild:function(a){return this._getDescriptorValue(["dataEditing","typeMetaData",a,"defaultChildType"])
},getTypeFriendlyName:function(a){return this._getDescriptorValue(["dataEditing","typeMetaData",a,"friendlyName"])
},copyItem:function(b,c){var a=Object.clone(b.getValue(0));
a._iid=this._generateId();
delete a._hash;
var b=this.addToCache(c,a);
b.setDirty();
return b
},copyDependentItem:function(b){var a=Object.clone(b.getValue(0));
return this._logicEnv.getDataItemFactory().createDataItem(a)
},addToCache:function(b,c){var a=this.getDataService().getItemCache();
var d=c._iid;
return a.put(a.key(b,d),c)
},deleteItem:function(a){},getCollectionOfItem:function(b){var d=b.getChildValue("_iid");
if(!d){return null
}var c=this._descriptor.collections;
if(b.isRef()){b=b.getReferencedDataItem()
}for(var a=0;
a<c.length;
a++){if(this.getDataService().deReference(c[a].id,d)===b){return c[a].id
}}return null
},_areDataItemsEqual:function(d,c){if(d.isRef()){d=d.getReferencedDataItem()
}if(c.isRef()){c=c.getReferencedDataItem()
}return d===c
},_removeFromArray:function(e,c){var b=e.getChildren();
for(var a=0,d=0;
a<b.length;
a++,d++){var f=b[a];
if(this._areDataItemsEqual(f,c)){e.deleteChild(d);
d--
}}},_CHARS:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),_generateId:function(){var e=this._CHARS,c=[],b=0,d;
for(var a=0;
a<36;
a++){if(a==8||a==13||a==18||a==23){c[a]="-"
}else{if(a==14){c[a]="4"
}else{if(b<=2){b=33554432+(Math.random()*16777216)|0
}d=b&15;
b=b>>4;
c[a]=e[(a==19)?(d&3)|8:d]
}}}return c.join("")
},_getFieldAcceptableTypes:function(c){var d;
var a=[];
if(this.getTypesManager().isArray(c.type)){d=this.getTypesManager().getArrayAllowedTypes(c.type);
for(var b=0;
b<d.length;
b++){a.push(this.getTypesManager().getReferredType(d[b]))
}return{relation:Constants.DataEditingModel.ContainmentOptions.MANY_TO_MANY_REFERENCE,types:a}
}else{a.push(this.getTypesManager().getReferredType(c.type));
return{relation:Constants.DataEditingModel.ContainmentOptions.ONE_TO_MANY_REFERENCE,types:[a]}
}},_getContainmentOptions:function(c){var e=this._getDescriptorValue(["dataEditing","childrenField"]);
var f;
var b=[];
for(var a in e){var d=this._getChildrenTypeField(a);
f=this._getFieldAcceptableTypes(d).types;
if(f.contains(c)){b.push(a)
}}if(b.length==0){return{relation:Constants.DataEditingModel.ContainmentOptions.NONE}
}return{relation:Constants.DataEditingModel.ContainmentOptions.DIRECT,types:b}
},_getChildrenTypeField:function(b){var c=this._getDescriptorValue(["dataEditing","typeMetaData",b,"childrenField"]);
if(c){var a=this.getTypesManager();
return a.getField(a.getType(b),c)
}return null
},_getParentTypeField:function(b){var c=this._getDescriptorValue(["dataEditing","typeMetaData",b,"parentField"]);
if(c){var a=this.getTypesManager();
return a.getField(a.getType(b),c)
}return null
},_getDescriptorValue:function(a){return this._logicEnv.getAppInstance().getDescriptorValue(a)
},_getCollectionAllowedTypes:function(b){var c=this._descriptor.collections||[];
for(var a=0;
a<c.length;
a++){if(c[a].id==b){return c[a].allowedTypes
}}return[]
},_parse:function(){var c=this._getDescriptorValue(["dataEditing","categories"])||{};
for(var d=0;
d<c.length;
d++){var a=c[d].name;
this._categories.push(a);
this._sectionsByCat[a]=c[d].items||[];
for(var b=0;
b<this._sectionsByCat[a].length;
b++){var e=this._sectionsByCat[a][b];
this._sections[a+"/"+e.name]=e
}if(c[d].newTypes){this._addNewByCat[a]=c[d].newTypes
}}}}});
W.Classes.newClass({name:"wixapps.core.logics.LogicBase",imports:[],Class:{Binds:[],_environment:null,initialize:function(a){this._environment=a
},run:function(c,b,a){},getDataEditingModel:function(){},getDataEditingMetaInfo:function(){return{title:"",hasDataSelection:false,dataSelectionLabel:"",dataEditingLabel:"",hasDataEdit:true}
},_getLastTenItems:function(){return[]
},getLastTenItemsZoomParams:function(c,b,a,d){this._getLastTenItems(c,function(g){d=d||"title";
a=a||"_iid";
if(g.length==0){return{list:[],selectedIndex:0}
}var h=g[0].getValue()[a];
var f=g.map(function(i){return{id:i.getChildByRef(a).getValue(),title:i.getChildByRef(d).getValue()}
});
var e=f.getIndexByField("id",h);
b({list:f,selectedIndex:e})
})
},sendEmail:function(l,c,j,m,k,n,d,h,b){var f={to:l,cc:c,bcc:j,from:m,subject:k,htmlMessage:n,plainTextMessage:d,metaSiteId:h};
var e=this.injects();
var o=e.Config.getServiceTopologyProperty("emailServer");
var g=this._isPreviewMode();
if(g){o=o+"Secured"
}var a=[];
a.push(o);
a.push("?accept=json&contentType=json");
a.push("&appUrl="+encodeURIComponent(window.location.href));
if(g){a.push("&wixSession="+e.CookiesManager.getCookie("wixSession"))
}this._sendJsonCORS(a.join(""),f,"POST",b)
},_sendJsonCORS:function(url,data,method,onComplete){var createXHR=function(method,url){var xhr=new XMLHttpRequest();
if("withCredentials" in xhr){xhr.open(method,url,true);
xhr.withCredentials="true"
}else{if(typeof XDomainRequest!="undefined"){xhr=new XDomainRequest();
xhr.open(method,url);
xhr.setRequestHeader=function(key,value){}
}}return xhr
};
var parseResponseJSON=function(responseText){if(!xhr.responseText){return{success:false,errorDescription:"Invalid ajax response, no responseText",errorCode:-9001}
}var parser=JSON.parse?JSON.parse:eval;
try{return parser(responseText)
}catch(e){return{success:false,errorDescription:"Invalid JSON object",errorCode:-9000}
}};
var errorToString=function(err){return err.errorDescription+" ("+err.errorCode+")"
};
var xhr=createXHR(method,url);
xhr.onabort=function(){onComplete(false,"request aborted")
};
xhr.ontimeout=function(){onComplete(false,"request timeout")
};
xhr.onerror=function(){onComplete(false,errorToString(parseResponseJSON(xhr.responseText)))
};
xhr.onload=function(){var ret=parseResponseJSON(xhr.responseText);
onComplete(ret.success,ret.success?ret:errorToString(ret))
};
xhr.setRequestHeader("Content-Type","application/json");
xhr.send(JSON.encode(data))
},_isPreviewMode:function(){return this.injects().Viewer.getViewMode()!="site"
}}});
W.Classes.newClass({name:"wixapps.core.logics.SingleItemLogic",imports:["wixapps.core.logics.DescriptorDataEditingModel"],Class:{Extends:"wixapps.core.logics.LogicBase",Binds:["onSuccess","onFailure"],_environment:null,_logicParams:null,initialize:function(a){this._environment=a
},getSelectedIId:function(a,b){return b.itemId
},run:function(e,d,c){var a=this._environment;
this._viewName=e;
this._callBacks=c;
this._logicParams=d;
if(!d.collectionId||!d.itemId){this.onFailure({description:"'collectionId' and 'itemId' should be defined",code:-1});
return
}var b=a.getDataService().readItemFromCache(d.collectionId,d.itemId);
if(b){this.onSuccess(b)
}else{a.getDataService().readItem(d.collectionId,d.itemId,this.onSuccess,this.onFailure);
this._showLoading(c)
}},onSuccess:function(e){var d=this._environment;
var b=d.getTypesManager();
var a=d.getProxyFactory();
b.applyDefaults(e);
var c=a.createView(e,this._viewName);
this._onBeforeItemRendered(c);
this._callBacks.showProxy(c)
},onFailure:function(a){this._showError(this._callBacks,a)
},getDataEditingModel:function(){return new this.imports.DescriptorDataEditingModel(this._environment)
},_getLastTenItems:function(c,b){var a=this.getDataEditingModel().getItemDefaultCollection(c);
this.getDataEditingModel().getDataService().query(a,{_type:c},{_updatedAt:-1},0,10,b)
},_onBeforeItemRendered:function(a){},_showLoading:function(a){a.showLoadingIndicator()
},_showError:function(b,a){b.showErrorIndicator(a.code,a.description)
}}});
W.Classes.newClass({name:"wixapps.core.logics.TwoLevelCategoryLogic",imports:[],Class:{Extends:"wixapps.core.logics.CategoryLogic",Binds:[],_generateCategoriesCombo:function(i,a,b,e){var h=this._createCategoryTreeData(i);
var c=a.addComboBoxField("",h);
c.addEvent("inputChanged",function(j){this._changeSelectedCategory(b,j.value)
}.bind(this));
if(e.collectionId&&e.itemId){var f=e.collectionId+"/"+e.itemId;
var g=-1;
for(var d=0;
d<h.length;
d++){if(h[d].value==f){g=d;
break
}}if(g!=-1){c.setValue(f)
}else{if(h.length>0){this._changeSelectedCategory(b,h[0].value)
}}}return c
},_getCollectionForSelection:function(){return this._getTopLevelCollection()
},_getTopLevelItemType:function(){return this._dsp("topLevelItemType","Category")
},_getMidLevelItemType:function(){return this._dsp("midLevelItemType","Section")
},_getTopLevelCollection:function(){return this._dsp("topLevelCollection","Categories")
},_getMidLevelCollection:function(){return this._dsp("midLevelCollection","Sections")
},_createCategoryTreeData:function(a){var g=[],h;
for(var e=0;
e<a.length;
e++){h=a[e].getValue();
g.push({value:this._getTopLevelCollection()+"/"+h._iid,label:h.title});
var f=this._getDescriptorValue(["dataEditing","typeMetaData",a[e].getTypeName(),"childrenField"]);
var d=a[e].getChildByRef(f).getChildren();
for(var b=0;
b<d.length;
b++){var c=d[b];
if(c.getTypeName()==this._getMidLevelItemType()){g.push({value:this._getMidLevelCollection()+"/"+c.getChildValue("_iid"),label:" - "+c.getValue().title})
}}}return g
}}});
W.Classes.newClass({name:"wixapps.core.logics.page.EventsPageLogic",imports:[],Class:{Extends:"wixapps.core.logics.page.PageLogicBase",Binds:[],_environment:null,initialize:function(a){this._environment=a
},generateLinkParams:function(a){return{title:a.getChildValue("title"),params:{collectionId:this._getCollectionId(),itemId:a.getChildValue("_iid")}}
},_getCollectionId:function(){return"Events"
},getSampleDataItem:function(){return{collectionId:"Events",itemId:"Talk1"}
},fetchSampleDataItem:function(b,a){this.fetchDataItem(this.getSampleDataItem(),b,a)
},fetchDataItem:function(d,f,b){var c=this._environment.getDataService();
var h=d.collectionId;
var g=d.itemId;
var a=function(k){var j=this._environment.options.acceptableTypes;
if(!j||j.length>0||j.contains(k.getTypeName())){f(k)
}else{b({code:-10003,description:"Page expected ["+j+" ] but received "+k.getTypeName()})
}}.bind(this);
var e=function(j){b(j)
}.bind(this);
var i=c.readItemFromCache(h,g);
if(i){f(i)
}else{this._environment.getDataService().readItem(h,g,a,e)
}}}});
W.Classes.newClass({name:"wixapps.core.logics.page.ItemFromPageLogic",imports:[],Class:{Extends:"wixapps.core.logics.page.PageDependentLogicBase",Binds:[],_environment:null,initialize:function(a){this._environment=a
},_onDataLoaded:function(b){var a=this._params.acceptableTypes;
if(a&&a.length>0&&!a.contains(b.getTypeName())){throw"Part expected ["+a+" ] but received "+b.getTypeName()
}else{this.parent(b)
}}}});
W.Classes.newClass({name:"wixapps.core.logics.page.MenuPageLogic",imports:[],Class:{Extends:"wixapps.core.logics.page.PageLogicBase",Binds:[],_environment:null,initialize:function(a){this._environment=a
},generateLinkParams:function(a){return{title:a.getChildValue("title"),params:{collectionId:this._getCollectionId(),itemId:a.getChildValue("_iid")}}
},_getCollectionId:function(){return"Items"
},getSampleDataItem:function(){return{collectionId:"Items",itemId:"SampleItem1"}
},fetchSampleDataItem:function(b,a){this.fetchDataItem(this.getSampleDataItem(),b,a)
},fetchDataItem:function(d,f,b){var c=this._environment.getDataService();
var h=d.collectionId;
var g=d.itemId;
var a=function(k){var j=this._environment.options.acceptableTypes;
if(!j||j.length>0||j.contains(k.getTypeName())){f(k)
}else{b({code:-10003,description:"Page expected ["+j+" ] but received "+k.getTypeName()})
}}.bind(this);
var e=function(j){b(j)
}.bind(this);
var i=c.readItemFromCache(h,g);
if(i){f(i)
}else{this._environment.getDataService().readItem(h,g,a,e)
}}}});
W.Classes.newClass({name:"wixapps.core.logics.page.PageDependentLogicBase",imports:[],Class:{Binds:["_onDataLoaded"],Extends:"wixapps.core.logics.SingleItemLogic",initialize:function(a){this.parent(a)
},run:function(g,f,e){this._viewName=g;
this._callBacks=e;
this._params=f;
var b=this._environment.getAppPart().getViewNode().getParent('[comp$="AppPage"]');
var c=b.getLogic();
var d=this;
var a=function(){if(W.Viewer.isSiteReady()){c.registerPageAppPart(d,d._onDataLoaded)
}else{W.Utils.callLater(a)
}};
a();
this._showLoading(e)
},_onDataLoaded:function(a){this.onSuccess(a)
}}});
W.Classes.newClass({name:"wixapps.core.logics.page.PageLogicBase",imports:[],Class:{Binds:[],Extends:"wixapps.core.logics.LogicBase",generateLinkParams:function(a){},getSampleDataItem:function(){},fetchDataItem:function(c,b,a){}}});
W.Classes.newClass({name:"wixapps.core.managers.TypesManager",imports:["wixapps.core.data.PrimitiveValidations"],Class:{Binds:[],_validator:null,_typesMap:{},_extendingTypes:{},initialize:function(){this._validator=new this.imports.PrimitiveValidations()
},getType:function(a){return this._typesMap[a]
},getTypeName:function(a){return a.name||a._iid
},registerType:function(g){var b=this.getTypeName(g);
this._typesMap[b]=g;
if(g.baseTypes&&typeOf(g.baseTypes)!="array"){throw"Type ["+b+'] "baseTypes" field should be an array'
}if(g.baseTypes){for(var d=0;
d<g.baseTypes.length;
d++){var f=g.baseTypes[d];
var c=this._extendingTypes[f];
if(!c){c=[];
this._extendingTypes[f]=c
}if(!c.contains(b)){c.push(b)
}}var a={};
var e=function(i){this.getBaseTypes(i).forEach(function(j){e(j)
});
if(!i.fields){return
}for(var h=0;
h<i.fields.length;
h++){var k=i.fields[h];
if(a[k.name]){if(a[k.name].type!=k.type){throw"Type ["+b+"] is invalid. Field ["+k.name+"] is defined both as ["+k.type+"] and as ["+a[k.name].type+"]"
}}else{a[k.name]=k
}}}.bind(this);
e(g)
}},removeType:function(b){var a=this._extendingTypes[b]||[];
for(var c=0;
c<a.length;
c++){var e=a[c];
var d=this._typesMap[e];
if(d.baseTypes){d.baseTypes.erase(b)
}}delete this._extendingTypes[b];
delete this._typesMap[b]
},getExtendingTypes:function(a){var c=function(d,e){var f=this._extendingTypes[d];
if(f){f.forEach(function(g){c(g,e);
e[g]=true
})
}}.bind(this);
var b={};
c(a,b);
return Object.keys(b)
},getBaseTypeNames:function(a){return(a&&a.baseTypes)?a.baseTypes:[]
},getBaseTypes:function(b){var a=[];
this.getBaseTypeNames(b).forEach(function(c){var d=this.getType(c);
if(!d){throw"Base type ["+c+"] of type ["+this.getTypeName(b)+"] not found"
}a.push(d)
}.bind(this));
return a
},getField:function(b,c){var a=undefined;
this._getInheritanceTreeDFS(b).forEach(function(e){if(e.fields){for(var d=0;
d<e.fields.length;
d++){if(e.fields[d].name==c){a=this._mergeFieldDefinitions(a,e.fields[d])
}}}}.bind(this));
return a
},getFields:function(a){var b={};
this._getInheritanceTreeDFS(a).forEach(function(e){if(e.fields){for(var c=0;
c<e.fields.length;
c++){var d=e.fields[c].name;
b[d]=this._mergeFieldDefinitions(b[d],e.fields[c])
}}}.bind(this));
return Object.values(b)
},isOf:function(b,a){var c=function(d){if(d==a){return true
}else{var e=this.getType(d);
return this.getBaseTypeNames(e).some(function(f){return c(f,a)
})
}}.bind(this);
return c(b,a)
},_getInheritanceTreeDFS:function(b){var d={};
var a=[];
var c=function(f){var e=this.getTypeName(f);
if(!d[e]){d[e]=true;
a.push(f);
this.getBaseTypes(f).forEach(c)
}}.bind(this);
c(b);
return a
},_mergeFieldDefinitions:function(a,b){if(!a){return Object.clone(b)
}if(!a.defaultValue&&b.defaultValue){a.defaultValue=b.defaultValue
}if(b.validations){if(!a.validations){a.validations=b.validations.clone()
}else{a.validations=a.validations.concat(b.validations)
}}return a
},applyDefaults:function(b){var d={};
function e(f){return d[f.collectionId+"/"+f.itemId]
}function c(f){d[f.collectionId+"/"+f.itemId]=true
}var a=function(f){if(f.isRef()){var j=f.getValue(0);
if(e(j)){return f
}else{c(j)
}}var o=f.getTypeName();
if(this.isArray(o)){f.getChildren().forEach(function(i){a(i)
}.bind(this));
return f
}else{if(this.isSimple(o)){return f
}}var h=this.getType(o);
if(!h){return f
}var n=this.getFields(h);
for(var l=0;
l<n.length;
l++){var k=n[l];
var m=f.getChildByRef(k.name);
if(!m&&k.defaultValue!=undefined){var g=this.isSimple(k.type)?k.defaultValue:this.isArray(k.type)?Array.clone(k.defaultValue):Object.clone(k.defaultValue);
f.addChild(g,k.name)
}}f.getChildrenRefs().forEach(function(i){var p=f.getChildByRef(i);
a(p)
}.bind(this));
return f
}.bind(this);
return a(b)
},validateDataItem:function(a){return this._validateDataItem(a,{validations:[]})
},_validateDataItem:function(c,f){var a=c.getTypeName();
var b=true;
if(c.isRef()){return true
}if(f.validations&&f.validations.length>0){var e=c.getValue();
b=this.validateValue(e,f)&&b
}if(a=="Array"){c.getChildren().forEach(function(g){if(g){b=this.validateDataItem(g)&&b
}}.bind(this))
}else{if(!this.isSimple(a)){var d=this.getType(a);
this.getFields(d).forEach(function(g){if(g.computed!==true){var h=c.getChildByRef(g.name);
if(h){b=this._validateDataItem(h,g)&&b
}}}.bind(this))
}}c.fireEvent(Constants.DataItemEvents.VALIDATION_PERFORMED,{target:c,valid:b});
return b
},validateValue:function(d,e){var c=e.validations||[];
for(var b=0;
b<c.length;
b++){var a=c[b];
if(!this._validator.validate(a.func,d,a.params||[])){return false
}}return true
},isSimple:function(a){return a&&a.test(/^(String|Boolean|Number)$/)
},isArray:function(a){return a&&a.test(/^Array(<.+>)?$/)
},getArrayAllowedTypes:function(a){var c=a&&a.match(/^Array<(.+)>$/);
var b=[];
if(c){var d=c[1];
d.split(",").forEach(function(e){b.push(e.trim())
})
}return b
},isRef:function(a){return a&&a.test(/^wix:Ref<.+>$/)
},getReferredType:function(a){var b=a&&a.match(/^wix:Ref<(.+)>$/);
return b&&b[1].trim()
},isNative:function(a){return this.isSimple(a)||this.isArray(a)
},getAllTypes:function(){return Object.values(this._typesMap)
}}});
W.Classes.newClass({name:"wixapps.core.utils.AppLint",imports:[],Class:{_lintRules:{},_traverseCache:{},Binds:["_traverseCompNodes","_traverseLayoutNodes"],initialize:function(){this._lintRules={layout_in_comp:{walkFunc:this._traverseCompNodes,cond:function(a){return a.comp&&a.comp.layout
},message:"Layout placed inside the comp instead alongside it."},dimension_in_comp:{walkFunc:this._traverseCompNodes,cond:function(a){return a.comp&&(a.comp.width||a.comp.height)
},message:'Width/height placed inside the "comp" instead of the "layout" node.'},dimensions_as_string:{walkFunc:this._traverseLayoutNodes,cond:function(a){return(a.width&&typeOf(a.width)=="string"&&(!String.contains(a.width,"%")))||(a.height&&typeOf(a.height)=="string"&&(!String.contains(a.height,"%")))
},message:"Width/height specified as a string where integer number might be used."},hbox_flexbox_conflict:{walkFunc:this._traverseCompNodes,cond:function(a){if(a.comp&&a.comp.name==="HBox"&&a.comp.items){return Array.some(a.comp.items,function(b){return b.layout&&b.layout.width!==undefined&&b.layout["box-flex"]!==undefined
})
}},message:'"Width" property superfluous when horizontal "box-flex" specified.'},vbox_flexbox_conflict:{walkFunc:this._traverseCompNodes,cond:function(a){if(a.comp&&a.comp.name==="VBox"&&a.comp.items){return Array.some(a.comp.items,function(b){return b.layout&&b.layout.height!==undefined&&b.layout["box-flex"]!==undefined
})
}},message:'"Height" property superfluous when vertical "box-flex" specified.'},box_dimension_100:{walkFunc:this._traverseCompNodes,cond:function(a){if(a.comp&&a.comp.items){if(a.comp.name==="VBox"){return Array.some(a.comp.items,function(b){return b.layout&&b.layout.height=="100%"
})
}else{if(a.comp.name==="HBox"){return Array.some(a.comp.items,function(b){return b.layout&&b.layout.width=="100%"
})
}}}},message:'Width/height set to "100%" inside HBox/VBox is rendered inconsistently across the browsers.'}}
},formatResult:function(b){var a=this._getNodePath;
var c="* AppLint *\n";
c+=b.length+" warning(s)\n";
return c+"\t"+Array.map(b,function(d){return d.message+"\n"+d.nodes.map(function(e){return"\t\t"+a(e)
}).join("\n")
}).join("\n\t")
},lintDescriptor:function(b){var a=this;
b=this._mapRelationships(b);
this._traverseCache={};
return Object.values(this._lintRules).map(function(c){return a._applyRule(c,b)
}).filter(function(c){return c
})
},_applyRule:function(c,b){var a=c.walkFunc(b).filter(c.cond);
if(a.length>0){return{nodes:a,message:c.message}
}},_getNodePath:function(b){var a=[];
while(b){a.push(b);
b=b._parent
}return a.map(function(c){return Object.keys(c).filter(function(d){return["name","id","_iid","forType"].contains(d)
}).map(function(d){return c[d]
}).join(", ")
}).filter(function(c){return c
}).reverse().join(" > ")
},_memoize:function(a,b){if(!(a in this._traverseCache)){this._traverseCache[a]=b()
}return this._traverseCache[a]
},_traverseCompNodes:function(a){var b=function(d){var c=[];
if(typeOf(d)==="array"){Array.forEach(d,function(e){c=c.concat(b(e))
})
}else{if(typeOf(d)==="object"){c.push(d)
}if(d.comp&&d.comp.items){d.comp.items.forEach(function(f,e){c=c.concat(b(f))
})
}if(d.comp&&d.comp.cases){Object.each(d.comp.cases,function(e){c=c.concat(b(e))
})
}if(d.comp&&d.comp.columns&&d.comp.name=="Table"){d.comp.columns.forEach(function(e){Array.forEach(["item","header","footer"],function(f){if(e[f]!==undefined){c=c.concat(b(e[f]))
}})
})
}}return c
};
return b(a.views)
},_traverseLayoutNodes:function(a){return this._traverseCompNodes(a).map(function(b){return b.layout
}).filter(function(b){return b
})
},_mapRelationships:function(b){var c=function(e,d){var f=typeOf(e);
if(f=="object"||f=="array"){Object.each(e,function(g){c(g,e)
})
}e._parent=d
};
var a=Object.clone(b);
c(a,null);
return a
}}});
W.Classes.newClass({name:"wixapps.core.utils.DataTypesUtils",imports:[],traits:[],Class:{Extends:Object,Binds:[],_wixTypeMap:{string:"String",number:"Number","boolean":"Boolean",object:"wix:Object"},_typeDefaultValues:{String:"",Number:0,Boolean:true},initialize:function(){},generateTypeDefinitionFromData:function(b,d,c){var a=Object.keys(d).map(function(f){var g=this._wixTypeMap[typeOf(d[f])];
var e=(c?d[f]:this._typeDefaultValues[g]);
return{_type:"wix:Field",name:f,type:g,defaultValue:e}
}.bind(this)).filter(function(e){return Boolean(e.type)
});
return{_iid:b,_type:"wix:Type",fields:a}
}}});
W.Classes.newClass({name:"wixapps.core.utils.WixAppsLogger",imports:[],Class:{Static:{LISTS_EVENT_SOURCE:60,Type:{ERROR:10,USER_ACTION:40},Category:{EDITOR:1,VIEWER:2,CORE:3,SERVER:4},SubCategory:{GENERAL:0,PROXY:1,APP_LOGIC:2,DATA_SERVICE:3,DATA_ITEMS:4,CORE_WIRING:5,DATA_EDITING:6},Severity:{RECOVERABLE:10,WARNING:20,ERROR:30,FATAL:40},Errors:{GENERIC_ERROR:{code:-20000,description:"WixApps unspecified error"},APP_INSTANCE_NOT_LOADED:{code:-20001,description:"Application instance failed to load"},UNABLE_TO_REFRESH_AFTER_SAVE:{code:-20002,description:"Failed to update views after data save"},UNABLE_TO_LOAD_DATA_ITEM_FROM_PARAMS:{code:-20003,description:"Failed to load data item from url params"},CREATE_ITEM_CALLED_FOR_NON_NEW:{code:-20004,description:"CreateItem called with a non-new item"},UPDATE_ITEM_CALLED_FOR_NEW:{code:-20005,description:"UpdateItem called with a new item"},ITEM_NOT_FOUND:{code:-20006,description:"ReadItem called with unknown item"}},Events:{}},reportError:function(c,f,a,i,b,g){try{var d={desc:c.description||this.Errors.GENERIC_ERROR.description,errorCode:c.code||this.Errors.GENERIC_ERROR.code,type:this.Type.ERROR,issue:i||this.SubCategory.GENERAL,severity:b||this.Severity.ERROR,category:g||this.getDefaultCategory()};
LOG.reportError(d,f,a,{src:this.LISTS_EVENT_SOURCE,desc:c.description})
}catch(h){}},reportEvent:function(a,d){try{var b={type:this.Type.USER_ACTION,desc:a.description,biEventId:a.id,biAdapter:"lists",category:this.getDefaultCategory()};
d=d||{};
d.src=this.LISTS_EVENT_SOURCE;
LOG.reportEvent(b,d)
}catch(c){}},getDefaultCategory:function(){return W.Viewer.isPublicMode()?this.Category.VIEWER:this.Category.EDITOR
}}});
W.Classes.newClass({name:"wixapps.core.utils.WixServiceTransportBase",imports:["wixapps.core.utils.WixAppsLogger"],Class:{_logger:null,_getServiceUrl:function(){},getLogger:function(){if(!this._logger){this._logger=new this.imports.WixAppsLogger()
}return this._logger
},doRequest:function(a,c,d,b){this._doRequestInternal(a,c,"POST",d,b)
},doGetRequest:function(a,c,d,b){this._doRequestInternal(a,c,"GET",d,b)
},_doRequestInternal:function(a,e,h,f,d){if(!d){d=function(i){throw i.description+" ("+i.code+")"
}
}if(!f){f=function(i){}
}if(!h){h="POST"
}var c=function(j){var i=this.getLogger();
i.reportError(j,this.$className,"doRequest",i.SubCategory.DATA_SERVICE)
}.bind(this);
var b=function(i){if(!i.success){var j={code:i.errorCode,description:i.errorDescription};
c(j);
d(j)
}else{f(i.payload)
}}.bind(this);
var g=function(i){var j={code:i.status?i.status:-1,description:i.statusText?i.statusText:"Unspecified error occurred, possibly a connection problem"};
c(j);
d(j)
};
this._postJsonRequest(a,e,h,b,g)
},_postJsonRequest:function(a,d,f,e,b){var c=new Request.JSON({url:this._getServiceUrl()+a+"/",urlEncoded:false,onSuccess:e,onFailure:b,method:f,data:JSON.encode(d)});
c.options=c.options||{};
c.options.headers=c.options.headers||{};
c.options.headers["If-Modified-Since"]="Sat, 1 Jan 2005 00:00:00 GMT";
c.options.headers["Content-Type"]="application/json; charset=utf-8";
c.send()
}}});
W.Classes.newClass({name:"wixapps.core.views.ProxyFactory",imports:["wixapps.core.events.ProxyEventBus","wixapps.core.views.ViewEnvironment","wixapps.core.views.ViewContext","wixapps.core.data.DataItemUtils","wixapps.core.expressions.EvalScopeWrapper","wixapps.core.views.ViewEvaluationContext"],Class:{Binds:[],_viewRepository:null,_dataItemFactory:null,_typesManager:null,_managers:null,_defaultByTypeAndMode:{},_byName:{},_eventDispatcher:null,_contextPath:null,_lifecycleManager:null,_dataItemUtils:null,_defaultTypeForProxy:{},_defaultDataForType:{},initialize:function(c,d,g,b,e,a,f){this._viewRepository=g;
this._dataItemFactory=c;
this._typesManager=d;
this._eventDispatcher=b||new this.imports.ProxyEventBus();
this._contextPath=e;
this._nameSpace=a;
this._lifecycleManager=f;
this._dataItemUtils=new this.imports.DataItemUtils()
},registerProxy:function(a,c,d,b){this._byName[a]=c;
b=b||[];
b.forEach(function(e){this._defaultByTypeAndMode[e.forType+"|"+e.forMode]=a
}.bind(this));
d=d||"";
this._defaultTypeForProxy[a]=d
},registerDefaultValue:function(a,b){this._defaultDataForType[a]=b
},createView:function(c,e,d){d=d||"view";
var a=new this.imports.ViewEnvironment(this._dataItemFactory,this._typesManager,this,e,c.getTypeName(),d,this._eventDispatcher,[],undefined,undefined,this._lifecycleManager);
var b=new this.imports.ViewContext(a,c);
return this._createViewInternal(b,e)
},getViewDefinition:function(b,f){var c=this._viewRepository.getViewDefinition(b,f);
if(c){return c
}else{var a=this._typesManager.getBaseTypeNames(this._typesManager.getType(b));
for(var d=0;
d<a.length;
d++){var e=this.getViewDefinition(a[d],f);
if(e){return e
}}return undefined
}},hasViewDefinition:function(b,f){var c=this._viewRepository.hasViewDefinition(b,f);
if(c){return true
}else{var a=this._typesManager.getBaseTypeNames(this._typesManager.getType(b));
for(var d=0;
d<a.length;
d++){var e=this.hasViewDefinition(a[d],f);
if(e){return true
}}return false
}},getDefaultProxy:function(b,f){var c=this._defaultByTypeAndMode[b+"|"+f];
if(c){return c
}else{var a=this._typesManager.getBaseTypeNames(this._typesManager.getType(b));
for(var d=0;
d<a.length;
d++){var e=this.getDefaultProxy(a[d],f);
if(e){return e
}}return undefined
}},_createViewInternal:function(e,i){var h=e.getData().getTypeName();
var f=e.getEnvironment();
var g=this.getViewDefinition(h,i);
if(!g){throw"View definition ["+i+"] for type ["+h+"] is missing in the repository"
}var c=g.getChildValue("mode")||f.getMode()||"view";
var a=g.getChildByRef("comp");
if(!a||!a.getChildValue("name")){throw"View definition ["+i+"] for type ["+h+"] is incorrect. Missing comp.name attribute"
}var b=g.getChildValue("forType");
f.setViewName(i);
f.setVar("viewName",i);
f.setForType(b);
f.setVar("viewDataType",h);
f.setMode(c);
f.getTreePath().pushScope();
f.addIncludedView(b,i);
this._setupViewVariables(f,g);
g=this.createNewEvaluationScope(g,e);
var d=this.createProxyFromItemDefinition(e,g);
return d.proxy
},createProxyFromItemDefinition:function(d,h){var b=h.getChildValue("id");
var j=d.getEnvironment();
if(!b){throw"ID not defined for an item in ["+JSON.stringify(h.getValue())+"] in view for ["+j.getForType()+"|"+j.getViewName()+"]"
}var m=h.getChildByRef("value");
var e=d.getData();
var l=this._dataItemFactory;
var g=h.getChildByRef("comp")||h.addChild({},"comp");
var c=true;
if(m){var i=l.createDataItem(h.getChildValue("value"));
h.getChildByRef("value").addEvent(Constants.DataItemEvents.CHANGE,function(){i.setValue(h.getChildValue("value"))
});
e=i
}else{var f=h.getChildValue("data")||"this";
e=d.evaluatePath(f);
if(!e){c=false;
var o=d.resolveTypeForPath(f);
if(o){var q=this._typesManager.getType(d.getData().getTypeName());
var n=this._typesManager.getField(q,f);
if(n.hasOwnProperty("defaultValue")){e=l.createDataItem(n.defaultValue)
}}if(!o||!e){var p=this._resolveProxyName(o,g,j.getViewName(),j.getViewMode());
if(p.type=="view"){g=l.createDataItem({name:"Empty"});
e=l.createDataItem({})
}else{o=this._defaultTypeForProxy[p.name];
var a=this._getDefaultDataForType(o);
if(a!==undefined){e=l.createDataItem(a)
}}}}if(!e){throw"Evaluation of ["+f+"] on type ["+d.getData().getTypeName()+"] did not generate child context"
}}var k=this._createProxy(d,e,g,b);
k.setIsBound(c);
return{id:b,proxy:k}
},_getDefaultDataForType:function(b){var c=this._defaultDataForType[b];
if(c){return c
}else{var a=this._typesManager.getBaseTypeNames(this._typesManager.getType(b));
for(var d=0;
d<a.length;
d++){var e=this._getDefaultDataForType(a[d]);
if(e){return e
}}return undefined
}},_createProxy:function(b,c,d,f){var e=b.getEnvironment();
var a=d.getChildValue("mode")||e.getMode();
var h=c.getTypeName();
var i=e.getViewName();
var j=this._resolveProxyName(h,d,i,a);
if(!j.name){throw"Cannot resolve view/proxy for type ["+h+"] in mode ["+a+"] in context of view ["+i+"]"
}if(j.type=="view"){b=b.newContextForData(c);
return this._createViewInternal(b,j.name)
}else{var g=this._byName[j.name];
if(!g){throw"Proxy ["+j.name+"] for type ["+h+"] in mode ["+a+"] is not registered in factory"
}return new g(b,c,d,f)
}},_setupViewVariables:function(b,g){var e=g.getChildByRef("vars");
if(e){var a=e.getChildrenRefs();
for(var c=0;
c<a.length;
c++){var f=a[c];
var d=e.getChildByRef(f);
b.setVar(f,d.getValue(0));
d.addEvent(Constants.DataItemEvents.CHANGE,(function(h,j,i){return function(){h.setVar(j,i.getValue(0))
}
})(b,f,d))
}}},convertContextUrlToAbsolute:function(b){if(this._contextPath&&b){var a=b.match(/^(http:\/\/)?(images\/.*)/);
if(a){return this._contextPath+a[2]
}}return b
},getNameSpace:function(){return this._nameSpace
},_resolveProxyName:function(c,b,f,e){var d=b.getChildValue("name");
var a=d||f;
if(this.hasViewDefinition(c,a)){return{name:a,type:"view"}
}else{if(d){return{name:d,type:"proxy"}
}return{name:this.getDefaultProxy(c,e),type:"proxy"}
}},createNewEvaluationScope:function(d,a){if(this._dataItemUtils.findDataItems(d,"wixapps.core.data.ExprDataItem").length>0){var c=new this.imports.ViewEvaluationContext(a);
var b=new this.imports.EvalScopeWrapper(d,c,a.getEnvironment());
return b.getData()
}else{return d
}}}});
W.Classes.newClass({name:"wixapps.core.views.ViewBuilder",imports:["wixapps.core.views.ViewsCustomizer"],Class:{Binds:[],_viewCustomizer:null,_types:null,_views:null,_data:null,_templates:null,registerTemplates:function(a){this._viewCustomizer=new this.imports.ViewsCustomizer();
this._registerTypes(a.types);
this._registerData(a.data);
this._registerViews(a.views);
this._registerTemplates(a.templates)
},getViewTemplateDefinition:function(d){var f=this._getTemplateDef(d);
var e={id:f.id,friendlyName:f.friendlyName,defaultWidth:f.defaultWidth};
e.type=this._getTypeDef(f.type);
var b=this._viewCustomizer.fillMissingIds(this._getViewDef(f.viewName));
e.view=b;
var c,a;
a=f.data.length;
e.data=[];
for(c=0;
c<a;
c++){e.data.push(this._getDataItem(f.data[c]))
}return e
},getListViewTemplateDefinition:function(a){return{name:a,id:W.Utils.getUniqueId("listView"),forType:"Array",comp:{name:"VerticalList",templates:{item:{id:W.Utils.getUniqueId("listItem"),comp:{name:a}}}}}
},_registerInner:function(f,b,e){var c,d,a=f.length;
for(c=0;
c<a;
c++){d=f[c];
e[d[b]]=d
}},_registerTypes:function(a){this._types=this._types||{};
this._registerInner(a,"_iid",this._types)
},_registerViews:function(a){this._views=this._views||{};
this._registerInner(a,"name",this._views)
},_registerData:function(a){this._data=this._data||{};
this._registerInner(a,"_iid",this._data)
},_registerTemplates:function(a){this._templates=this._templates||{};
this._registerInner(a,"id",this._templates)
},_getTypeDef:function(a){if(this._types.hasOwnProperty(a)){return Object.clone(this._types[a])
}throw"ViewBuilder:: type ["+a+"] doesn't exist"
},_getViewDef:function(a){if(this._views.hasOwnProperty(a)){return Object.clone(this._views[a])
}throw"ViewBuilder:: view ["+a+"] doesn't exist"
},_getDataItem:function(a){if(this._data.hasOwnProperty(a)){return Object.clone(this._data[a])
}throw"ViewBuilder:: data item ["+a+"] doesn't exist"
},_getTemplateDef:function(a){if(this._templates.hasOwnProperty(a)){return this._templates[a]
}throw"ViewBuilder:: template ["+a+"] doesn't exist"
}}});
W.Classes.newClass({name:"wixapps.core.views.ViewContext",imports:[],Class:{Binds:[],_parent:null,_data:null,_computedFields:{},initialize:function(b,c,a){this._env=b.newCopy();
this._data=c;
this._parent=a
},getEnvironment:function(){return this._env
},getData:function(){return this._data
},getParent:function(){return this._parent
},newContextForData:function(a){return new this.constructor(this._env,a,this)
},newContextFromPath:function(b){var a=this.evaluatePath(b);
return a?new this.constructor(this._env,a,this):undefined
},evaluatePath:function(b){try{return this._evaluatePathRecursive(b.split("."),this._data)
}catch(a){return undefined
}},_evaluatePathRecursive:function(f,d){if(f.length==0){return d
}var c=f.shift();
var e=d;
var b=-1;
var a=c.match(/^(.*)\[([0-9]+)\]$/);
if(a){c=a[1];
b=a[2]
}if(c=="parent"){if(!this._parent){throw"'parent' not found"
}return this._parent._evaluatePathRecursive(f,b==-1?this._parent._data:this._parent._data.getChildByIndex(b))
}else{if(c=="this"){return this._evaluatePathRecursive(f,b==-1?this._data:this._data.getChildByIndex(b))
}else{if(c.indexOf("$")==0){e=this._env.getVar(c.substr(1));
if(!e){throw"var '"+c+"' not found"
}}else{var g=e.getChildByRef(c);
e=g?g:this._getComputedChild(e,c);
if(!e){throw"field '"+c+"' not found"
}}}}if(b!=-1){e=e.getChildByIndex(b);
if(!e){throw"index "+b+" on '"+c+"' not found"
}}return this._evaluatePathRecursive(f,e)
},_getComputedChild:function(c,d){var a=this._env.getTypesManager();
var f=c.getTypeName();
if(a.isNative(f)||f=="wix:Object"){return undefined
}var b=a.getType(f);
if(!b){throw"Type ["+f+"] is not defined in TypesManager"
}var e=a.getField(b,d);
if(!e||e.computed!==true){return undefined
}return this._env.getDataItemFactory().createComputedField(e.name,e.type,f,c)
},resolveTypeForPath:function(j){var a=j.split(".").length>1||j.indexOf("$")==0||j.indexOf("parent")==0;
if(a){return undefined
}var b=this._data.getTypeName();
var c=j;
var e=-1;
var f=c.match(/^(.*)\[([0-9]+)\]$/);
if(f){c=f[1];
e=f[2]
}if(c=="this"){return b
}else{var h=this._env.getTypesManager();
var i=h.getType(b);
var g=h.getField(i,c);
if(e==-1){return g.type
}else{var d=h.getArrayAllowedTypes(g.type);
if(d.length>0){return d[0]
}else{return undefined
}}}}}});
W.Classes.newClass({name:"wixapps.core.views.ViewDefinitionsRepository",imports:["wixapps.core.data.DataItemFactory"],Class:{Binds:["_onClonedViewChanged"],_dataItemFactory:null,_byTypeAndName:{},initialize:function(a){this._dataItemFactory=a
},cloneAndMultiply:function(d){var a=[];
if(typeOf(d.name)=="array"){for(var b=0;
b<d.name.length;
b++){var c=Object.clone(d);
c.name=d.name[b];
a.push(c)
}return a
}else{a.push(Object.clone(d))
}return a
},setViewDefinition:function(c){var a=c.forType+"|"+c.name;
var b=this._byTypeAndName[a];
if(b){b.setValue(c)
}else{b=this._dataItemFactory.createDataItem(c);
this._byTypeAndName[a]=b
}return b
},getViewDefinition:function(a,b){return this._byTypeAndName[a+"|"+b]
},hasViewDefinition:function(a,b){return !!(this._byTypeAndName[a+"|"+b])
},cloneAndListen:function(b){var c=b.getAllViewDefinitions();
for(var a=0;
a<c.length;
a++){this.setViewDefinition(c[a].getValue());
c[a].addEvent(Constants.DataItemEvents.CHANGE,this._onClonedViewChanged)
}},_onClonedViewChanged:function(a){this.setViewDefinition(a.currentTarget.getValue())
},getAllViewDefinitions:function(){var a=Object.values(this._byTypeAndName);
a.sort(function(d,c){var f=function(h,g){return h>g?1:(h==g?0:-1)
};
var e=f(d.getChildByRef("forType").getValue(),c.getChildByRef("forType").getValue());
return e!=0?e:f(d.getChildByRef("name").getValue(),c.getChildByRef("name").getValue())
});
return a
}}});
W.Classes.newClass({name:"wixapps.core.views.ViewEnvironment",imports:["wixapps.core.events.TreePath"],Class:{Binds:[],_dataItemFactory:null,_typesManager:null,_proxyFactory:null,_viewName:null,_forType:null,_mode:null,_eventsDispatcher:null,_includedViews:null,_treePath:null,_vars:null,initialize:function(h,k,b,j,e,f,a,c,g,i,d){this._dataItemFactory=h;
this._typesManager=k;
this._proxyFactory=b;
this._viewName=j;
this._forType=e;
this._mode=f;
this._eventsDispatcher=a;
this._includedViews=c;
this._vars={parent:g,vars:{}};
this._treePath=new this.imports.TreePath(i);
this._lifecycleManager=d
},newCopy:function(){return new this.constructor(this._dataItemFactory,this._typesManager,this._proxyFactory,this._viewName,this._forType,this._mode,this._eventsDispatcher,this._includedViews,this._vars,this._treePath,this._lifecycleManager)
},setViewName:function(a){this._viewName=a
},setForType:function(a){this._forType=a
},setMode:function(a){this._mode=a
},getDataItemFactory:function(){return this._dataItemFactory
},getTypesManager:function(){return this._typesManager
},getProxyFactory:function(){return this._proxyFactory
},getViewName:function(){return this._viewName
},getForType:function(){return this._forType
},getMode:function(){return this._mode
},getEventsDispatcher:function(){return this._eventsDispatcher
},getIncludedViews:function(){return this._includedViews
},getTreePath:function(){return this._treePath
},getLifecycleManager:function(){return this._lifecycleManager
},addIncludedView:function(a,c){var b=a+"|"+c;
if(this._includedViews.indexOf(b)==-1){this._includedViews.push(b)
}},getVars:function(){var a=function(c){if(!c){return{}
}var b=a(c.parent);
Object.each(c.vars,function(e,d){b[d]=e.getValue()
});
return b
};
return a(this._vars)
},getVar:function(a){for(var c=this._vars;
c;
c=c.parent){var b=c.vars[a];
if(b){return b
}}return undefined
},setVar:function(b,c){var a=this._vars.vars[b];
if(a){a.setValue(c)
}else{a=this._dataItemFactory.createDataItem(c);
this._vars.vars[b]=a
}return a
}}});
W.Classes.newClass({name:"wixapps.core.views.ViewEvaluationContext",Class:{_viewContext:null,initialize:function(a){this._viewContext=a
},getSymbolResolver:function(){return this
},resolveExpressionReference:function(a){return this._viewContext.evaluatePath(a)
},evaluateExpressionReference:function(a){var b=this.resolveExpressionReference(a);
if(b){return b.getValue(undefined,this)
}},listSymbols:function(){var c={};
var b=this._data;
var a={};
return Object.merge(c,a)
},inheritsScope:function(a){return !(a.className=="wixapps.core.data.CompositeDataItem"&&a.getParent()&&a.getParent().getChildRef&&a.getParent().getChildRef(a)=="templates")
}}});
W.Classes.newClass({name:"wixapps.core.views.ViewsCustomizer",imports:[],Class:{Binds:["addRule"],_byIndex:[],_byTypeAndView:{},addRules:function(a){a.forEach(this.addRule)
},addRule:function(a){var b=this.getByTypeAndView(a.forType,a.view);
b.push(this._byIndex.length);
this._byIndex.push(a)
},clearRules:function(){this._byIndex=[];
this._byTypeAndView={}
},getByTypeAndView:function(a,c){var b=a+"|"+c;
var d=this._byTypeAndView[b];
if(d==undefined){d=[];
this._byTypeAndView[b]=d
}return d
},applyAll:function(b){var a=[];
a=a.concat(this.getByTypeAndView(b.forType,b.name));
a=a.concat(this.getByTypeAndView("*",b.name));
a=a.concat(this.getByTypeAndView(b.forType,"*"));
a=a.concat(this.getByTypeAndView("*","*"));
a.sort(function(d,c){return d-c
});
a.forEach(function(c){this.applyRule(b,this._byIndex[c])
}.bind(this))
},applyRule:function(d,b){var c=d.mode||"view";
var a=this._findApplicableFields(d,b);
a.forEach(function(g){if(typeof(g)!="object"){return
}var k=g.mode||c;
if(b.mode=="*"||b.mode==k){var e=g;
var j=b.key.split(".");
for(var f=0;
f<j.length;
f++){var h=j[f];
if(f==j.length-1){var l=b.value;
if(/^\s*(\+|-)?\d+\s*$/.test(b.value)){l=parseInt(l,10)
}e[h]=l
}else{if(!e[h]){e[h]={}
}e=e[h]
}}}})
},fillMissingIds:function(a){this._fillMissingIdsForItem(a,0);
return a
},getCurrentValue:function(h,g){var b=this._findApplicableFields(h,g);
for(var c=0;
c<b.length;
c++){var a=b[c];
var f=g.key.split(".");
for(var d=0;
d<f.length;
d++){var e=f[d];
if(d==f.length-1){if(a[e]!==undefined){return a[e]
}else{break
}}else{if(!a[e]){break
}a=a[e]
}}}return undefined
},_findApplicableFields:function(d,c,b){var a=[];
if(c.fieldId=="vars"){a.push(d.vars)
}else{this._findApplicableFieldsOnItem(d,c,0,a)
}return a
},_findApplicableFieldsOnItem:function(b,e,d,c){var f=b.id||b.data||d;
var a=this;
if(e.fieldId=="*"||e.fieldId==f){c.push(b)
}if(b.comp&&b.comp.items){b.comp.items.forEach(function(h,g){a._findApplicableFieldsOnItem(h,e,g,c)
})
}if(b.comp&&b.comp.templates){Object.each(b.comp.templates,function(g){a._findApplicableFieldsOnItem(g,e,0,c)
})
}if(b.comp&&b.comp.cases){Object.each(b.comp.cases,function(g){a._findApplicableFieldsOnItem(g,e,0,c)
})
}if(b.comp&&b.comp.columns&&b.comp.name=="Table"){b.comp.columns.forEach(function(h,g){Array.forEach(["item","header","footer"],function(i){if(h[i]!==undefined){a._findApplicableFieldsOnItem(h[i],e,0,c)
}})
})
}},_fillMissingIdsForItem:function(b,d){b.id=b.id||b.data||"def_"+d;
var c=d+1;
var a=this;
if(b.comp&&b.comp.items){b.comp.items.forEach(function(f,e){c=a._fillMissingIdsForItem(f,c)
})
}if(b.comp&&b.comp.templates){Object.each(b.comp.templates,function(e){c=a._fillMissingIdsForItem(e,c)
})
}if(b.comp&&b.comp.cases){Object.each(b.comp.cases,function(e){c=a._fillMissingIdsForItem(e,c)
})
}if(b.comp&&b.comp.columns&&b.comp.name=="Table"){b.comp.columns.forEach(function(f,e){Array.forEach(["item","header","footer"],function(g){if(f[g]!==undefined){c=a._fillMissingIdsForItem(f[g],c)
}})
})
}return c
}}});
W.Classes.newClass({name:"wixapps.core.views.proxies.ArrayProxy",imports:["wixapps.core.views.ViewContext"],Class:{Extends:"wixapps.core.views.proxies.Proxy",Binds:[],_children:[],_components:[],initialize:function(b,d,c,a){this.parent(b,d,c,a);
this._loadTemplates()
},_createChildren:function(){var b=this._data.getChildren();
for(var a=0;
a<b.length;
a++){var c=b[a];
this._addChild(c,a,b.length)
}},_getItemTemplate:function(a){return this._def.getChildByRef("templates")&&this._def.getChildByRef("templates").getChildByRef(a)
},_addPositionInParentVars:function(b,c,a){var d=b.getEnvironment();
d.setVar("indexInParent",c);
d.setVar("indexOneInParent",c+1);
d.setVar("positionInParent",c==0?"first":(c==a-1?"last":"middle"));
d.setVar("isOddIndexInParent",c%2==1)
},_loadTemplates:function(){var a=this._viewContext.getEnvironment();
this._itemTemplate=this._getItemTemplate("item")||a.getDataItemFactory().createDataItem({id:this.getFieldId()+"_template_item",comp:{}},this._def)
},_processDefinitionsChangeList:function(a){this.parent(a);
var b=a.filter(function(c){return(c.path[c.path.length-1]=="templates")
});
if(b.length){this._loadTemplates()
}},_addChild:function(c,e,f){var a=this._viewContext.getEnvironment().getProxyFactory();
var b=this._viewContext.newContextForData(c);
var g=this._def.getChildValue("mode");
if(g&&g!=b.getEnvironment().getMode()){b.getEnvironment().setMode(g)
}this._addPositionInParentVars(b,e,f);
var d=a.createProxyFromItemDefinition(b,this._itemTemplate).proxy;
this._children.push(d)
},_createChildComponents:function(a){this._children.forEach(function(c){var b=c.createComponent();
this._components.push(b);
a.grab(b)
}.bind(this))
}}});
W.Classes.newClass({name:"wixapps.core.views.proxies.CompositeProxy",imports:["wixapps.core.views.ViewContext"],Class:{Extends:"wixapps.core.views.proxies.Proxy",Binds:[],_ids:[],_children:[],_components:[],_itemsDefAsRaw:{},initialize:function(b,d,c,a){this.parent(b,d,c,a)
},_isReloadRequired:function(){var f=this._itemsDefAsRaw;
var g=this._def.getChildValue("items")||[];
if(g.length!=f.length){return true
}for(var c=0;
c<f.length;
c++){var e=f[c];
var b=g[c];
var a=e.comp&&e.comp.name||"unspecified";
var d=b.comp&&b.comp.name||"unspecified";
if(a!=d){return true
}}return false
},_createChildProxies:function(){while(this._children.length>0){var b=this._children.pop();
b.dispose()
}this._ids=[];
this._components=[];
var c=this._def.getChildByRef("items");
this._itemsDefAsRaw=c?c.getValue():[];
if(c){var a=this._viewContext.getEnvironment().getProxyFactory();
c.getChildren().forEach(function(d,e){var f=a.createProxyFromItemDefinition(this._viewContext,d);
this._ids.push(f.id);
this._children.push(f.proxy)
}.bind(this))
}},_createChildComponents:function(a){a.set("html","");
this._components=[];
this._children.forEach(function(c){var b=c.createComponent();
this._components.push(b);
a.grab(b)
}.bind(this))
},_processDefinitionsChangeList:function(b){this.parent(b);
var a=b.filter(function(c){return(c.path.length==4&&c.path[1]=="layout")
});
if(a.length){this._onChildLayoutPropertyChange(a)
}},_onChildLayoutPropertyChange:function(a){}}});
W.Classes.newClass({name:"wixapps.core.views.proxies.Proxy",imports:["wixapps.core.data.DataItemUtils"],Class:{Binds:["_onDataChangedInternal","_onDefinitionsChangedInternal"],_viewContext:null,_data:null,_def:null,_disposed:false,_fieldId:null,_isBound:true,initialize:function(b,f,e,a){this._viewContext=b;
this._data=f;
this._def=e;
this._fieldId=a;
this._dataItemUtils=new this.imports.DataItemUtils();
this._validateDataType();
var d=e.getChildValue("events");
if(d){var c=function(g){return function(h){var i={cause:h};
this.fireEvent(g,i)
}.bind(this)
}.bind(this);
Object.each(d,function(g,h){this._registerProxyEvents(h,c(g))
}.bind(this))
}this._data.addEvent(Constants.DataItemEvents.CHANGE,this._onDataChangedInternal);
this._def.addEvent(Constants.DataItemEvents.CHANGE,this._onDefinitionsChangedInternal)
},setIsBound:function(a){this._isBound=a
},getIsBound:function(){return this._isBound
},isDisposed:function(){return this._disposed
},dispose:function(){if(this._disposed){return
}this._disposed=true;
this._data.removeEvent(Constants.DataItemEvents.CHANGE,this._onDataChangedInternal);
this._data=null;
this._def.removeEvent(Constants.DataItemEvents.CHANGE,this._onDefinitionsChangedInternal);
this._viewContext=null;
this._def=null
},addEvent:function(b,a){this._viewContext.getEnvironment().getEventsDispatcher().addEvent(b,a)
},addEventFilteredByScope:function(c,b,a){this._viewContext.getEnvironment().getEventsDispatcher().addEventFilteredByScope(this._viewContext,c,b,a)
},removeEvent:function(b,a){this._viewContext.getEnvironment().getEventsDispatcher().removeEvent(b,a)
},fireEvent:function(c,b,a){this._viewContext.getEnvironment().getEventsDispatcher().fireProxyEvent(this,c,b,a)
},setupProxy:function(){},createComponent:function(){},_registerProxyEvents:function(b,a){},_onDefinitionsChangedInternal:function(a){var b=this._createChangeEventList(a);
if(b.length){this._processDefinitionsChangeList(b)
}},_processDefinitionsChangeList:function(b){var a=b.filter(function(c){return c.path.length==1
});
if(a.length){this._onDefPropertyChanged(a)
}},_createChangeEventList:function(a){var g=[];
var f=a.events||[{type:a.type,payload:{target:a.target}}];
for(var b=0;
b<f.length;
b++){var e=f[b];
var c=e.payload.action||Constants.DataItemEvents.CHANGE;
var d;
if(c==Constants.DataItemEvents.CHANGE){d=e.payload.target
}else{if(e.payload.target.getChildByRef){d=e.payload.target.getChildByRef(e.payload.ref)
}else{if(e.payload.target.getChildByIndex){d=e.payload.target.getChildByIndex(e.payload.ref)
}}}var h=this._dataItemUtils.getDataItemPath(this._def,d).reverse();
g.push({type:c,item:d,path:h})
}return g
},_onDefPropertyChanged:function(a){},_onDataChanged:function(a){},_onDataChangedInternal:function(a){this._validateDataType();
this._onDataChanged(a)
},_validateDataType:function(){var d=this._getAcceptableDataTypes();
if(d&&d.length>0){var a=this._viewContext.getEnvironment().getTypesManager();
var b=this._data.getTypeName();
for(var c=0;
c<d.length;
c++){if(a.isOf(b,d[c])){return
}}throw"Proxy "+this.$className+" accepts only ["+d+"] but received ["+b+"]"
}},_getAcceptableDataTypes:function(){return[]
},getViewContext:function(){return this._viewContext
},getData:function(){return this._data
},getViewDefinition:function(){return this._def
},getFieldId:function(){return this._fieldId
},getFullFieldId:function(){return this._viewContext._env.getForType()+"|"+this._viewContext._env.getViewName()+"|"+this._fieldId
},setWidth:function(a){},getWidth:function(){return 0
},getHeight:function(){return 0
},setPos:function(b,a){}}});