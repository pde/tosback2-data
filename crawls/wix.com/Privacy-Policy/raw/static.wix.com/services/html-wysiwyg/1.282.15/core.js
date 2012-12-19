W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.LayoutChange",Class:{Extends:Events,Binds:["_onUpdateAnchors","_serializeAnchors"],initialize:function(){},startListenTo:function(a){a.addEvent("updateAnchors",this._onUpdateAnchors)
},_reportChange:function(a){this.fireEvent(Constants.DataEvents.DATA_CHANGED,a)
},_onUpdateAnchors:function(b){var a=b.data;
this._reportChange(this._serializeData(a))
},_serializeData:function(a){a.type=this.className;
a.oldAnchors=this._serializeAnchors(a.oldAnchors);
a.newAnchors=this._serializeAnchors(a.newAnchors);
return a
},_serializeAnchors:function(b){var c=[];
var a=this.injects().CompSerializer;
b.each(function(d){c.push(a.serializeAnchor(d))
});
return c
},_deSerializeData:function(b){var a=this.injects().Preview.getPreviewSite().$$("#"+b.compId)[0].getLogic();
return{compRef:a,oldAnchors:this._deSerializeAnchors(b.oldAnchors,a),newAnchors:this._deSerializeAnchors(b.newAnchors,a)}
},_deSerializeAnchors:function(c,a){var d=[];
var b=this.injects().Preview.getPreviewManagers().Layout;
c.each(function(e){d.push(b.desrializeAnchor(e,a))
});
return d
},_replaceComponentAnchors:function(a,b){this._removeReverseAnchorsFromTargetComponent(a);
a.setAnchors(b)
},_removeReverseAnchorsFromTargetComponent:function(a){var b=a.getAnchors();
b.each(function(c){this._removeSingleAnchorFromTargetComponent(c)
}.bind(this))
},_removeSingleAnchorFromTargetComponent:function(b){var c=b.toComp;
var d=c.getReverseAnchors();
var a=d.indexOf(b);
d.splice(a,1)
},_undo:function(a){var b=this._deSerializeData(a);
this._replaceComponentAnchors(b.compRef,b.oldAnchors);
this.injects().Preview.getPreviewManagers().Layout.enforceAnchors([b.compRef],true,true)
},_redo:function(a){var b=this._deSerializeData(a);
this._replaceComponentAnchors(b.compRef,b.newAnchors)
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.LayoutChange2",Class:{Extends:"wysiwyg.editor.managers.undoredomanager.LayoutChange",startListenTo:function(){this.injects().Preview.getPreviewManagers().Layout.addEvent("updateAnchors",this._onUpdateAnchors)
},stopListenTo:function(){this.injects().Preview.getPreviewManagers().Layout.removeEvent("updateAnchors",this._onUpdateAnchors)
},getPreliminaryActions:function(){return null
},getModuleFinished:function(){return true
},postEnforceAnchors:function(){},_reportChange:function(a){this.fireEvent(Constants.DataEvents.DATA_CHANGED,a)
},_onUpdateAnchors:function(e){var a=e.data;
var d=this._serializeData(a);
var b=false;
if(d.oldAnchors.length!=d.newAnchors.length){b=true
}for(var c=0;
c<d.oldAnchors.length;
c++){if(!W.Utils.isEquivalent(d.oldAnchors[c],d.newAnchors[c])){b=true
}}if(b){this._reportChange(d)
}},_undo:function(a){if(!a.oldAnchors||a.oldAnchors.length==0){return true
}var b=this._deSerializeData(a,true);
this._replaceComponentAnchors(b.compRef,b.anchorsToUse);
return true
},_redo:function(a){if(!a.newAnchors||a.newAnchors.length==0){return true
}var b=this._deSerializeData(a,false);
this._replaceComponentAnchors(b.compRef,b.anchorsToUse);
return true
},_deSerializeData:function(d,a){var b=this.injects().Preview.getPreviewSite().$$("#"+d.compId)[0].getLogic();
var c=a?this._deSerializeAnchors(d.oldAnchors,b):this._deSerializeAnchors(d.newAnchors,b);
return{compRef:b,anchorsToUse:c}
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.ScopeChange",Class:{Extends:Events,Binds:["_onScopeChange"],initialize:function(){},startListenTo:function(){this.injects().Preview.getPreviewManagers().Layout.addEvent("reparentComponent",this._onScopeChange)
},stopListenTo:function(){this.injects().Preview.getPreviewManagers().Layout.removeEvent("reparentComponent",this._onScopeChange)
},getPreliminaryActions:function(b){var a=this.injects().UndoRedoManager._constants.PreliminaryActions;
if(b.subType=="showOnAllPagesChange"){return[a.SELECT_COMPONENT,a.OPEN_COMPONENT_PANEL]
}else{return[a.SELECT_COMPONENT]
}},getModuleFinished:function(){return true
},postEnforceAnchors:function(){},_onScopeChange:function(b){var a=b.data;
this._reportChange(a)
},_reportChange:function(a){this.fireEvent(Constants.DataEvents.DATA_CHANGED,a)
},_undo:function(a){for(var b=0;
b<a.changedComponentIds.length;
b++){var d=this.injects().Utils.getComponentLogicFromDom(a.changedComponentIds[b]);
this._addComponentToScope(a.oldState,d)
}var c=W.Utils.getComponentLogicFromDom(a.oldState.parentId);
this.injects().Commands.executeCommand("WEditorCommands.componentScopeChange",this.injects().Editor.getComponentScope(c));
return true
},_redo:function(a){for(var b=0;
b<a.changedComponentIds.length;
b++){var d=this.injects().Utils.getComponentLogicFromDom(a.changedComponentIds[b]);
this._addComponentToScope(a.newState,d)
}var c=W.Utils.getComponentLogicFromDom(a.newState.parentId);
this.injects().Commands.executeCommand("WEditorCommands.componentScopeChange",this.injects().Editor.getComponentScope(c));
return true
},_addComponentToScope:function(b,a){var c=W.Utils.getComponentLogicFromDom(b.parentId);
c.addChild(a);
this.injects().Editor.setEditMode(this.injects().Editor.getComponentScope(c))
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.PositionChange",Class:{Extends:Events,Binds:["_onChange"],startListenTo:function(a){a.addEvent("updatePosition",this._onChange);
a.addEvent("updateSize",this._onChange)
},_onChange:function(b){var a=b.data;
this.fireEvent(Constants.DataEvents.DATA_CHANGED,a)
},_updateComponentPosition:function(a,b){b.x!=null?a.setX(b.x):false;
b.y!=null?a.setY(b.y):false;
a.saveCurrentCoordinates()
},_updateComponentDimensions:function(a,b){b.h!=null?a.setHeight(b.h):false;
b.w!=null?a.setWidth(b.w):false;
a.saveCurrentDimensions()
},_getComp:function(a){return this.injects().Preview.getPreviewSite().$$("#"+a)[0].getLogic()
},_undo:function(a){var b=this._getComp(a.compId);
if(this._hasCoordinates(a)){this._updateComponentPosition(b,a.oldCoordinates)
}if(this._hasDimensions(a)){this._updateComponentDimensions(b,a.oldDimensions);
b.fireEvent("resizeEnd")
}},_redo:function(a){var b=this._getComp(a.compId);
if(this._hasCoordinates(a)){this._updateComponentPosition(b,a.newCoordinates)
}if(this._hasDimensions(a)){this._updateComponentDimensions(b,a.newDimensions);
b.fireEvent("resizeEnd")
}},_hasCoordinates:function(a){return a.oldCoordinates&&a.newCoordinates
},_hasDimensions:function(a){return a.oldDimensions&&a.newDimensions
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.PositionChange2",Class:{Extends:"wysiwyg.editor.managers.undoredomanager.PositionChange",startListenTo:function(){this.injects().Preview.getPreviewManagers().Layout.addEvent("updatePosition2",this._onChange);
this.injects().Preview.getPreviewManagers().Layout.addEvent("updateSize2",this._onChange);
this.injects().Commands.registerCommandListenerByName("WEditorCommands.ComponentMoved",this,this._onChange)
},stopListenTo:function(){this.injects().Preview.getPreviewManagers().Layout.removeEvent("updatePosition2",this._onChange);
this.injects().Preview.getPreviewManagers().Layout.removeEvent("updateSize2",this._onChange);
this.injects().Commands.unregisterListener(this)
},getPreliminaryActions:function(){var a=this.injects().UndoRedoManager._constants.PreliminaryActions;
return[a.SELECT_COMPONENT]
},getModuleFinished:function(){return true
},_onChange:function(b){var a=b.data;
this.fireEvent(Constants.DataEvents.DATA_CHANGED,a)
},_undo:after(function(a){this._commitTransaction()
}),_redo:after(function(a){this._commitTransaction()
}),_commitTransaction:function(){this.injects().Commands.executeCommand("WEditorCommands.componentPosSizeChange");
var a=this.injects().Editor.getEditedComponent();
if(a){a.fireEvent("autoSizeChange")
}},postEnforceAnchors:function(b){var a=b.changedComponentIds.map(function(d){return this.injects().Utils.getComponentLogicFromDom(d)
}.bind(this));
var c=b.ySortedElementIds.map(function(d){return this.injects().Utils.getComponentLogicFromDom(d)
}.bind(this));
this.injects().Layout.enforceAnchors(a,true,undefined,c)
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.PropertyChange",Class:{Extends:Events,Binds:["_onDataChange","_getDataItemById"],startListenTo:function(a){this._dataManager=a;
a.addEvent(Constants.DataEvents.DATA_CHANGED,this._onDataChange)
},_reportChange:function(a){this.fireEvent(Constants.DataEvents.DATA_CHANGED,a)
},_onDataChange:function(c,e,b,d){var a={type:this.className,sender:d||null,dataItemId:c.getData().id,newValue:e,oldValue:b};
if(typeof a.newValue==="undefined"&&typeof a.oldValue==="undefined"){return
}this._reportChange(a);
return a
},_applyValue:function(b,e){var c=this._getDataItemById(b);
var a=Object.keys(e)[0];
var d=e[a];
c.set(a,d,false,"undo")
},_undo:function(a){this._applyValue(a.dataItemId,a.oldValue)
},_redo:function(a){this._applyValue(a.dataItemId,a.newValue)
},_getDataItemById:function(a){return this._dataManager.getDataByQuery("#"+a)
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.PropertyChange2",Class:{Extends:"wysiwyg.editor.managers.undoredomanager.PropertyChange",startListenTo:function(){this._dataManager=this.injects().Preview.getPreviewManagers().ComponentData;
this._dataManager.addEvent(Constants.DataEvents.DATA_CHANGED,this._onDataChange)
},stopListenTo:function(){this._dataManager.removeEvent(Constants.DataEvents.DATA_CHANGED,this._onDataChange)
},getPreliminaryActions:function(){var a=this.injects().UndoRedoManager._constants.PreliminaryActions;
return[a.SELECT_COMPONENT,a.OPEN_COMPONENT_PANEL]
},getModuleFinished:function(){return true
},postEnforceAnchors:function(){},_onDataChange:function(c,e,b,d){var a={type:this.className,changedComponentIds:[this.injects().Editor.getEditedComponent().getComponentId()],sender:d||null,dataItemId:c.getData().id,newValue:e,oldValue:b};
if(typeof a.newValue==="undefined"&&typeof a.oldValue==="undefined"){return
}this._reportChange(a);
return a
},_applyValue:function(b,e){if(!this.injects().Utils.getComponentLogicFromDom(b)){return
}var c=this._getDataItemById(b);
var a=Object.keys(e)[0];
var d=e[a];
c.set(a,d,false,"undo")
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.DataChange",Class:{Extends:Events,Binds:["_onDataChange","_getDataItemById"],startListenTo:function(a){this._dataManager=a;
a.addEvent(Constants.DataEvents.DATA_CHANGED,this._onDataChange)
},_reportChange:function(a){this.fireEvent(Constants.DataEvents.DATA_CHANGED,a)
},_onDataChange:function(c,e,b,d){var a={type:this.className,timestamp:new Date().getTime(),sender:d||null,dataItemId:c.getData().id,newValue:e,oldValue:b};
this._reportChange(a);
return a
},_applyValue:function(b,e){var c=this._getDataItemById(b);
var a=Object.keys(e)[0];
var d=e[a];
c.set(a,d,false,"undo")
},_undo:function(a){this._applyValue(a.dataItemId,a.oldValue)
},_redo:function(a){this._applyValue(a.dataItemId,a.newValue)
},_getDataItemById:function(a){return this._dataManager.getDataByQuery("#"+a)
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.undoredomanager.DataChange2",Class:{Extends:"wysiwyg.editor.managers.undoredomanager.DataChange",startListenTo:function(){this._dataManager=this.injects().Preview.getPreviewManagers().Data;
this._dataManager.addEvent(Constants.DataEvents.DATA_CHANGED,this._onDataChange)
},stopListenTo:function(){this._dataManager.removeEvent(Constants.DataEvents.DATA_CHANGED,this._onDataChange)
},getPreliminaryActions:function(){var a=this.injects().UndoRedoManager._constants.PreliminaryActions;
return[a.SELECT_COMPONENT,a.OPEN_COMPONENT_PANEL]
},getModuleFinished:function(){return true
},postEnforceAnchors:function(){},_onDataChange:function(c,e,b,d){var a={type:this.className,changedComponentIds:[this.injects().Editor.getEditedComponent().getComponentId()],sender:d||null,dataItemId:c.getData().id,newValue:e,oldValue:b};
this._reportChange(a);
return a
},_applyValue:function(c,g){var d=this._getDataItemById(c);
var b=Object.keys(g);
for(var e=0;
e<b.length;
e++){var a=b[e];
var f=g[a];
d.set(a,f,false,"undo")
}}}});
W.Classes.newClass({name:"wysiwyg.editor.commandregistrars.EditCommandRegistrar",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:[],initialize:function(){},registerCommands:function(){var a=W.Commands;
this._copyCommand=a.registerCommandAndListener("EditCommands.Copy",this,this._onCopy);
this._pasteCommand=a.registerCommandAndListener("EditCommands.Paste",this,this._onPaste);
this._cutCommand=a.registerCommandAndListener("EditCommands.Cut",this,this._onCut);
this._duplicateCommand=a.registerCommandAndListener("EditCommands.Duplicate",this,this._onDuplicate);
this._deleteSelectedComponentCommand=a.registerCommandAndListener("WEditorCommands.WDeleteSelectedComponent",this,this._confirmAndDeleteSelectedComponent);
this._undoCommand=a.registerCommandAndListener("WEditorCommands.Undo",this,this._onUndo);
this._redoCommand=a.registerCommandAndListener("WEditorCommands.Redo",this,this._onRedo);
this._moveTopCommand=a.registerCommandAndListener("WEditorCommands.MoveTop",this,this._onMoveTop);
this._moveBottomCommand=a.registerCommandAndListener("WEditorCommands.MoveBottom",this,this._onMoveBottom);
this._moveForwardCommand=a.registerCommandAndListener("WEditorCommands.MoveForward",this,this._onMoveForward);
this._moveBackCommand=a.registerCommandAndListener("WEditorCommands.MoveBack",this,this._onMoveBack);
this._traverseComponentsCommand=a.registerCommandAndListener("WEditorCommands.TraverseComponents",this,this._onTraverseComponents);
this._traverseComponentsReverseCommand=a.registerCommandAndListener("WEditorCommands.TraverseComponentsReverse",this,this._onTraverseComponentsReverse)
},setKeyboardEvents:function(){var a=W.InputBindings;
a.addBinding(["ctrl+v","command+v"],{command:this._pasteCommand});
a.addBinding(["ctrl+c","command+c"],{command:this._copyCommand});
a.addBinding(["ctrl+x","command+x"],{command:this._cutCommand});
a.addBinding(["ctrl+d","command+d"],{command:this._duplicateCommand});
a.addBinding(["ctrl+shift+[","command+shift+["],{command:this._moveBottomCommand});
a.addBinding(["ctrl+shift+]","command+shift+]"],{command:this._moveTopCommand});
a.addBinding(["ctrl+[","command+["],{command:this._moveBackCommand});
a.addBinding(["ctrl+]","command+]"],{command:this._moveForwardCommand});
a.addBinding(["del","backspace"],{command:this._deleteSelectedComponentCommand});
a.addBinding(["ctrl+z","command+z"],{command:this._undoCommand});
a.addBinding(["ctrl+y","command+y","ctrl+shift+z","command+shift+z"],{command:this._redoCommand});
a.addBinding(["ctrl+m","command+m"],{command:this._traverseComponentsCommand});
a.addBinding(["ctrl+shift+m","command+shift+m"],{command:this._traverseComponentsReverseCommand})
},enableEditCommands:function(c){c=!!c;
var a=[this._copyCommand,this._cutCommand,this._duplicateCommand,this._deleteSelectedComponentCommand,this._moveTopCommand,this._moveBottomCommand,this._moveForwardCommand,this._moveBackCommand,this._traverseComponentsCommand,this._traverseComponentsReverseCommand];
var b;
for(b=a.length-1;
b>=0;
--b){a[b].setState(c)
}},_onCopy:function(c,b){var a=W.Editor.getEditedComponent();
if(!(a&&a.isDeleteableRecurse())){return
}W.ClipBoard.setClip(a)
},_onPaste:function(b,a){if(W.Editor.getEditingScope()){W.ClipBoard.paste()
}},_onCut:function(c,b){var a=W.Editor.getEditedComponent();
if(!(a&&a.isDeleteableRecurse())){return
}W.EditorDialogs.openPromptDialog(W.Resources.get("EDITOR_LANGUAGE","CUT_COMPONENT_TITLE"),W.Resources.get("EDITOR_LANGUAGE","CUT_COMPONENT_TEXT"),"",W.EditorDialogs.DialogButtonSet.OK_CANCEL,function(d){if(d.result=="OK"){W.ClipBoard.setClip(a);
W.Editor.doDeleteSelectedComponent()
}}.bind(this))
},_onDuplicate:function(c,b){var a=W.Editor.getEditedComponent();
if(!(a&&a.isDeleteableRecurse())){return
}W.ClipBoard.duplicateComp(a,a.getParentComponent().getViewNode())
},_confirmAndDeleteSelectedComponent:function(){var d=W.Editor.getEditedComponent();
if(!W.Editor.canDeleteSelectedComponent()){return
}var c="DELETE_COMPONENT_TEXT";
if(d.isMultiSelect){c="DELETE_MULTI_COMPONENT_TEXT"
}var b=[];
if(d.isTpa){b.push(d);
if(d.isPremiumApp()){c="DELETE_TPA_COMPONENT_TEXT"
}}else{if(d.isInstanceOfClass("mobile.core.components.Container")){b=d.getContainerComponents([]).filter(function(e){return e.isTpa
});
if(b.length>0){var a=b.filter(function(e){return e.isPremiumApp()
});
if(a.length>0){c="DELETE_TPA_COMPONENT_IN_CONTAINER_TEXT"
}}}}W.EditorDialogs.openPromptDialog(W.Resources.get("EDITOR_LANGUAGE","DELETE_COMPONENT_TITLE"),W.Resources.get("EDITOR_LANGUAGE",c),"",W.EditorDialogs.DialogButtonSet.DELETE_CANCEL,function(e){if(e.result=="DELETE"){LOG.reportEvent(wixEvents.COMPONENT_REMOVED,{c1:d.className});
b.forEach(function(g){var f=g.getAppData();
LOG.reportEvent(wixEvents.APPS_FLOW_APP_REMOVED_FROM_STAGE,{c1:f.appDefinitionName,g1:f.appDefinitionId})
});
W.Editor.doDeleteSelectedComponent()
}}.bind(this))
},_onUndo:function(){W.UndoRedoManager.undo()
},_onRedo:function(){W.UndoRedoManager.redo()
},_onMoveTop:function(){this._onZIndexChange(W.Editor.Z_INDEX_CHANGE_TYPES.TOP)
},_onMoveBottom:function(){this._onZIndexChange(W.Editor.Z_INDEX_CHANGE_TYPES.BOTTOM)
},_onMoveForward:function(){this._onZIndexChange(W.Editor.Z_INDEX_CHANGE_TYPES.FORWARD)
},_onMoveBack:function(){this._onZIndexChange(W.Editor.Z_INDEX_CHANGE_TYPES.BACK)
},_onTraverseComponents:function(){this._traverseComponents(true)
},_onTraverseComponentsReverse:function(){this._traverseComponents(false)
},_onZIndexChange:function(a){var c=W.Editor.getEditedComponent();
if(!c){return
}var b=c.getParentComponent();
b.moveChild(c,a)
},_traverseComponents:function(b){var a=this.injects().Preview.getPreviewManagers().Viewer.getCurrentPageNode();
var k=this.injects().CompSerializer.serializeComponent(a,false);
var c=this._getSubComponentIds(k,[]);
var d=this.injects().Preview.getPreviewManagers().Viewer.getSiteNode();
var j=this.injects().CompSerializer.serializeComponent(d,false);
var h=this._getSubComponentIds(j,[],["wysiwyg.viewer.components.PagesContainer"]);
var i=["PAGES_CONTAINER"].concat(c).concat(h);
var e=this.injects().Editor.getEditedComponent();
var g;
if(!e){g=i[0]
}else{var f=i.indexOf(e.getID());
if(b){g=f!=i.length-1?i[f+1]:i[0]
}else{g=f!=0?i[f-1]:i[i.length-1]
}}this.injects().Editor.setSelectedComp(d.getElementById(g).getLogic());
this.injects().Editor.openComponentPropertyPanels(false,false,true)
},_getSubComponentIds:function(e,a,d){a.push(e.id);
var b=e.components;
if(!b){return
}var c;
for(c=0;
c<b.length;
c++){if(d&&d.indexOf(b[c].componentType)>-1){continue
}this._getSubComponentIds(b[c],a)
}return a.slice(1,a.length)
}}});
W.Classes.newClass({name:"wysiwyg.editor.commandregistrars.SaveCommandRegistrar",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_onSaveSuccess","_onSaveFail"],initialize:function(){},registerCommands:function(){var a=W.Commands;
this._saveCommand=a.registerCommandAndListener("WEditorCommands.Save",this,this._onSaveCommand);
this._saveAsCommand=a.registerCommandAndListener("WEditorCommands.SaveAs",this,this._onSaveAsCommand);
this._saveAsTemplateCommand=a.registerCommandAndListener("WEditorCommands.SaveAsTemplate",this,this._onPublishTemplateCommand)
},setKeyboardEvents:function(){var a=W.InputBindings;
if(window.debugMode=="debug"){a.addBinding(["ctrl+e","command+e"],{command:this._saveAsCommand,commandParameter:{promptResultDialog:true}},true)
}if(W.Editor._siteIsTemplate===false&&editorModel.siteHeader.userId==="84770f67-ecbd-44b6-b35a-584f2dc15af1"){a.addBinding(["ctrl+p","command+p"],{command:this._saveAsTemplateCommand,commandParameter:{promptResultDialog:true}},true)
}a.addBinding(["ctrl+s","command+s"],{command:this._saveCommand,commandParameter:{promptResultDialog:true}},true)
},_onSaveCommand:function(b,a){if(!W.Preview.isSiteReady()){return
}if(W.Editor._editMode==W.Editor.EDIT_MODE.PREVIEW){return
}if(W.Config.siteNeverSavedBefore()){W.EditorDialogs.openSaveDialog()
}else{if(W.Editor.getEditorStatusAPI().getSaveInProcess()){return
}this._lastSaveParam=b;
W.Editor.getEditorStatusAPI().setSaveInProcess(true);
W.ServerFacade.saveDocument(window.siteHeader.id,W.Preview.getPreviewSite(),this._onSaveSuccess,this._onSaveFail)
}if(b&&(b.src=="saveBtn")){LOG.reportEvent(wixEvents.SAVE_BUTTON_CLICKED_IN_MAIN_WINDOW,{g1:W.Editor._templateId})
}},_onSaveSuccess:function(){this._removeSaveFreeze();
var b=this._lastSaveParam;
W.Editor.getEditorStatusAPI().setSaveInProcess(false);
if(b&&b.onCompleteCallback){b.onCompleteCallback()
}else{if(b&&b.promptResultDialog){W.EditorDialogs.openPromptDialog(W.Resources.get("EDITOR_LANGUAGE","SUCCESS_SAVE_TITLE"),W.Resources.get("EDITOR_LANGUAGE","SUCCESS_SAVE_DESCRIPTION"),"",W.EditorDialogs.DialogButtonSet.OK)
}}try{if(window.opener&&window.opener.document&&window.opener.document.domain&&(window.opener.document.domain==document.domain)){window.opener.location.reload()
}}catch(a){}},_onSaveFail:function(b,c){this._removeSaveFreeze();
var e=this._lastSaveParam;
W.Editor.getEditorStatusAPI().setSaveInProcess(false);
if(e&&e.onErrorCallback){e.onErrorCallback()
}else{if(e&&e.promptResultDialog){var a=W.Utils.EditorErrorUtils;
var d=a.getErrorMsg(c,"ERROR_SAVE_DOCUMENT");
W.EditorDialogs.openPromptDialog(W.Resources.get("EDITOR_LANGUAGE","ERROR_SAVE_TITLE"),d,"",W.EditorDialogs.DialogButtonSet.OK)
}}},_onSaveAsCommand:function(c,a){var b={saveAs:true};
W.EditorDialogs.openSaveDialog(b)
},_onPublishTemplateCommand:function(){if(!W.Preview.isSiteReady()){return
}var a={};
a.onCompleteCallback=function(){W.ServerFacade.publishTemplate(window.siteHeader.id,function(){},function(b){})
}.bind(this);
this._onSaveCommand(a)
},_saveCurrentDocument:function(){if(!W.Config.siteNeverSavedBefore()){this._onSaveCommand()
}},_removeSaveFreeze:function(){var a=$("TEMP_SAVE_FREEZE");
if(a&&a.dispose){a.dispose()
}}}});
W.Classes.newClass({name:"wysiwyg.editor.commandregistrars.OpenDialogCommandRegistrar",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:[],initialize:function(){},registerCommands:function(){var a=W.Commands;
this._openPublishDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenPublishDialog",this,this._onOpenPublishDialogCommand);
this._openPublishWebsiteDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenPublishWebsiteDialog",this,this._onOpenPublishWebsiteDialogCommand);
this._openPublishWebsiteSuccessDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenPublishWebsiteSuccessDialog",this,this._onOpenPublishWebsiteSuccessDialogCommand);
this._openPublishWebsiteShareDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenPublishWebsiteShareDialog",this,this._onOpenPublishWebsiteShareDialogCommand);
this._openPublishFbSiteDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenPublishFbSiteDialog",this,this._onOpenPublishFbSiteDialogCommand);
this._openPublishFbSiteSuccessDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenPublishFbSiteSuccessDialog",this,this._onOpenPublishFbSiteSuccessDialogCommand);
this._openSaveSuccessDialogCommand=a.registerCommandAndListener("WEditorCommands.SaveSuccessDialog",this,this._onOpenSaveSuccessDialogCommand);
this._addPageDialogCommand=a.registerCommandAndListener("WEditorCommands.AddPageDialog",this,this._onOpenAddPageDialog);
this._openFontDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenFontDialogCommand",this,this._openFontDialog);
this._openColorSelectorDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenColorSelectorDialogCommand",this,this._openColorSelectorDialog);
this._openLinkDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenLinkDialogCommand",this,this._openLinkDialog);
this._openColorAdjusterDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenColorAdjusterDialogCommand",this,this._openColorAdjusterDialog);
this._openTPASettingsDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenTPASettingsDialog",this,this._openTPASettingsDialog);
this._openListEditDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenListEditDialog",this,this._openListEditDialog);
this._openImageDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenImageDialog",this,this._openImageDialog);
this._openFlashDialogCommand=a.registerCommandAndListener("WEditorCommands.OpenFlashDialog",this,this._openFlashDialog);
this._showHelpDialogCommand=a.registerCommandAndListener("WEditorCommands.ShowHelpDialog",this,this._showHelpDialog);
this._showColorPickerDialogCommand=a.registerCommandAndListener("WEditorCommands.ShowColorPickerDialog",this,this._openColorPickerDialog);
this._showBoxShadowDialogCommand=a.registerCommandAndListener("WEditorCommands.ShowBoxShadowDialog",this,this._openBoxShadowDialog)
},_onOpenPublishDialogCommand:function(b,a){LOG.reportEvent(wixEvents.PUBLISH_BUTTON_CLICKED_IN_MAIN_WINDOW);
if(!W.Preview.isSiteReady()){return
}if(W.Config.siteNeverSavedBefore()){this.injects().Commands.executeCommand("WEditorCommands.Save",b);
return
}if(W.Config.getApplicationType()==Constants.WEditManager.SITE_TYPE_FACEBOOK){this._onOpenPublishFbSiteDialogCommand()
}else{this._onOpenPublishWebsiteDialogCommand()
}},_onOpenPublishWebsiteDialogCommand:function(b,a){W.EditorDialogs.openPublishWebsiteDialog()
},_onOpenPublishWebsiteSuccessDialogCommand:function(b,a){W.EditorDialogs.openPublishWebsiteSuccessDialog()
},_onOpenPublishWebsiteShareDialogCommand:function(b,a){W.EditorDialogs.openPublishWebsiteShareDialog()
},_onOpenPublishFbSiteDialogCommand:function(b,a){W.EditorDialogs.openPublishFbSiteDialog()
},_onOpenPublishFbSiteSuccessDialogCommand:function(b,a){W.EditorDialogs.openPublishFbSiteSuccessDialog()
},_onOpenSaveSuccessDialogCommand:function(b,a){W.EditorDialogs.openSaveSuccessDialog()
},_onOpenAddPageDialog:function(b,a){W.EditorDialogs.openWAddPageDialog(b)
},_openColorSelectorDialog:function(a){W.EditorDialogs.openColorSelectorDialog(a)
},_openFontDialog:function(a){W.EditorDialogs.openFontDialog(a)
},_openLinkDialog:function(a){W.EditorDialogs.openLinkDialog(a)
},_openColorAdjusterDialog:function(a){W.EditorDialogs.openColorAdjusterDialog(a)
},_openTPASettingsDialog:function(a){W.EditorDialogs.openTPASettingsDialog(a)
},_openListEditDialog:function(a){W.EditorDialogs.openListEditDialog(a.data,a.galleryConfigID)
},_openImageDialog:function(a){a=a||{};
this._openMediaDialog(a.callback,a.galleryTypeID||"photos")
},_openFlashDialog:function(a){a=a||{};
this._openMediaDialog(a.callback,"swf")
},_openMediaDialog:function(c,a,b){W.EditorDialogs.openMediaDialog(c||this._onMediaSelectDefault,false,a,b)
},_onMediaSelectDefault:function(e){if(e.width||e.height){e.width=Number(e.width);
e.height=Number(e.height)
}var c=W.Data.createDataItem(e);
var b=W.Editor.getEditedComponent().getDataItem();
var a=c.getData();
delete a.linkType;
delete a.href;
delete a.target;
b.setFields(a)
},_showHelpDialog:function(e,c){var a=this.injects().Config.getHelpServerUrl();
var d=W.Data.dataMap.HELP_IDS._data.items[e];
var b=a+d;
W.EditorDialogs.openHelpDialog(b)
},_openColorPickerDialog:function(a){W.EditorDialogs.openColorPickerDialog(a)
},_openBoxShadowDialog:function(a){W.EditorDialogs.openBoxShadowDialog(a)
}}});
W.Classes.newClass({name:"wysiwyg.editor.commandregistrars.OpenPanelCommandRegistrar",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:[],initialize:function(){},registerCommands:function(){var a=W.Commands;
this._pagesCommand=a.registerCommandAndListener("WEditorCommands.Pages",this,this._onPages);
this._settingsCommand=a.registerCommandAndListener("WEditorCommands.Settings",this,this._onSettings);
this._marketCommand=a.registerCommandAndListener("WEditorCommands.Market",this,this._onMarket);
this._designCommand=a.registerCommandAndListener("WEditorCommands.Design",this,this._showEditDesignPanel);
this._showComponentCategoriesCommand=a.registerCommandAndListener("WEditorCommands.ShowComponentCategories",this,this._onShowComponentCategories);
this._showSiteName=a.registerCommandAndListener("WEditorCommands.ShowSiteName",this,this._onShowSiteName);
this._showFaviconAndThumbnail=a.registerCommandAndListener("WEditorCommands.ShowFaviconAndThumbnail",this,this._onShowFaviconAndThumbnail);
this._showSocial=a.registerCommandAndListener("WEditorCommands.ShowSocial",this,this._onShowSocial);
this._showSEO=a.registerCommandAndListener("WEditorCommands.ShowSEO",this,this._onShowSEO);
this._showStatistics=a.registerCommandAndListener("WEditorCommands.ShowStatistics",this,this._onShowStatistics);
this._showBackgroundDesignPanelCommand=a.registerCommandAndListener("WEditorCommands.ShowBackgroundDesignPanel",this,this._onShowBackgroundDesignPanel);
this._showBackgroundEditorPanelCommand=a.registerCommandAndListener("WEditorCommands.ShowBackgroundEditorPanel",this,this._onShowBackgroundEditorPanel);
this._showColorsPanelCommand=a.registerCommandAndListener("WEditorCommands.ShowColorsPanel",this,this._onShowColorsPanel);
this._showFontsPanelCommand=a.registerCommandAndListener("WEditorCommands.ShowFontsPanel",this,this._onShowFontsPanel);
this._advancedDesignCommand=a.registerCommandAndListener("WEditorCommands.AdvancedDesign",this,this._showAdvancedDesignPanel);
this._customizeComponentStyle=a.registerCommandAndListener("WEditorCommands.CustomizeComponentStyle",this,this._onCustomizeComponentStyle);
this._customizeColorsCommand=a.registerCommandAndListener("WEditorCommands.CustomizeColors",this,this._onCustomizeColors);
this._customizeFontsCommand=a.registerCommandAndListener("WEditorCommands.CustomizeFonts",this,this._onCustomizeFonts);
this._pageSettingsCommand=a.registerCommandAndListener("WEditorCommands.PageSettings",this,this._onPageSettings);
this._backToParentPanelCommand=a.registerCommandAndListener("WEditorCommands.BackToParentPanel",this,this._backToParentPanel);
this._showComponentCategoryCommand=a.registerCommandAndListener("WEditorCommands.ShowComponentCategory",this,this._onShowAddComponent)
},_onPages:function(){this._stopRichTextEdit();
W.Editor.clearSelectedComponent();
W.Editor._editorUI.showComponentInPanel("pagesPanel",true,null,Constants.EditorUI.PAGES_PANEL)
},_onSettings:function(a){var b=a?a.callback:null;
this.injects().Editor.getEditorUI().hidePropertyPanel();
this._stopRichTextEdit();
W.Editor._editorUI.showComponentInPanel("settings",true,null,Constants.EditorUI.SETTINGS_PANEL,b)
},_onMarket:function(a){this._stopRichTextEdit();
this.injects().Editor.getEditorUI().hidePropertyPanel();
W.Editor._editorUI.showComponentInPanel("market",true,null,Constants.EditorUI.MARKET_PANEL)
},_showEditDesignPanel:function(){this._stopRichTextEdit();
this.injects().Editor.getEditorUI().hidePropertyPanel();
W.Editor._editorUI.showComponentInPanel("design",true,null,Constants.EditorUI.DESIGN_PANEL)
},_onShowComponentCategories:function(){this._stopRichTextEdit();
this.injects().Editor.getEditorUI().hidePropertyPanel();
W.Editor._editorUI.showComponentInPanel("masterComponents",true,null,Constants.EditorUI.ADD_PANEL)
},_stopRichTextEdit:function(){if(W.Editor._editorComponents.editingFrame.getState()=="inPlaceEdit"){W.Editor._editorComponents.editingFrame.stopEditRichText()
}},_onShowSiteName:function(a){var b="siteName";
if(this._showPanelIfExist(b)){return
}W.Editor._editorUI.createComponentPart(b,false,a,function(c){this._savePanelInCache(c,b);
W.Editor._editorUI.showSubPanelWithParentPanelSize(c,true)
}.bind(this))
},_onShowFaviconAndThumbnail:function(a){var b="faviconAndThumbnail";
if(this._showPanelIfExist(b)){return
}W.Editor._editorUI.createComponentPart(b,false,a,function(c){this._savePanelInCache(c,b);
W.Editor._editorUI.showSubPanelWithParentPanelSize(c,true)
}.bind(this))
},_onShowSocial:function(a){var b="social";
if(this._showPanelIfExist(b)){return
}W.Editor._editorUI.createComponentPart(b,false,a,function(c){this._savePanelInCache(c,b);
W.Editor._editorUI.showSubPanelWithParentPanelSize(c,true)
}.bind(this))
},_onShowSEO:function(a){var b="seo";
if(this._showPanelIfExist(b)){return
}W.Editor._editorUI.createComponentPart(b,false,a,function(c){this._savePanelInCache(c,b);
W.Editor._editorUI.showSubPanelWithParentPanelSize(c,true)
}.bind(this));
LOG.reportEvent(wixEvents.SEO_PANEL_OPENED)
},_onShowStatistics:function(a){var b="statistics";
if(this._showPanelIfExist(b)){return
}W.Editor._editorUI.createComponentPart(b,false,a,function(c){this._savePanelInCache(c,b);
W.Editor._editorUI.showSubPanelWithParentPanelSize(c,true)
}.bind(this))
},_onShowBackgroundDesignPanel:function(b,a){W.Editor._editorUI.showComponentInPanel("backgroundDesign",true,null,Constants.EditorUI.DESIGN_PANEL,function(c){c.saveCurrentState()
})
},_onShowBackgroundEditorPanel:function(b,a){W.Editor._editorUI.showComponentInPanel("backgroundEditor",false,null,Constants.EditorUI.DESIGN_PANEL,function(c){c.saveCurrentState()
})
},_onShowColorsPanel:function(b,a){W.Editor._editorUI.showComponentInPanel("colorDesign",true,null,Constants.EditorUI.DESIGN_PANEL,function(c){c.saveCurrentState()
})
},_onShowFontsPanel:function(a,b){W.Editor._editorUI.showComponentInPanel("fonts",true,null,Constants.EditorUI.DESIGN_PANEL,function(c){c.saveCurrentState()
})
},_showAdvancedDesignPanel:function(b,a){W.Data.getDataByQuery("#STYLES",function(c){if(!c||!c.get("styleItems")){return
}W.EditorDialogs.openAdvancedStylingDialog({styleList:c._data.styleItems,selectedComponent:b.editedComponent,left:b.left})
}.bind(this))
},_onCustomizeComponentStyle:function(a){a=a||{};
W.Commands.executeCommand("WEditorCommands.AdvancedDesign",a)
},_onCustomizeColors:function(b,a){W.Editor._editorUI.showComponentInPanel("customizeColors",true,null,Constants.EditorUI.DESIGN_PANEL);
LOG.reportEvent(wixEvents.CUSTOMIZE_COLORS_OPENED)
},_onCustomizeFonts:function(b,a){W.Editor._editorUI.showComponentInPanel("customizeFonts",true,null,Constants.EditorUI.DESIGN_PANEL,function(c){c.saveCurrentState()
});
LOG.reportEvent(wixEvents.CUSTOMIZE_FONTS_OPENED)
},_onPageSettings:function(a){W.Editor._siteStructure.getDataManager().getDataByQuery(a.pageId,this._onPageSettingsDataReady.bind(this))
},_onPageSettingsDataReady:function(a){if(this._showPanelIfExist(a._data.id)){return
}W.Editor._editorUI.createComponentPart("pageSettings",false,{data:a},function(b){this._savePanelInCache(b,a._data.id);
W.Editor._editorUI.showSubPanelWithParentPanelSize(b,true)
}.bind(this))
},_backToParentPanel:function(){var a=W.Editor._editorUI.popHistory();
if(a){W.Editor._editorUI.showComponentInPanel(a.skinPart,true,a.args,a.state)
}},_onShowAddComponent:function(a){LOG.reportEvent(wixEvents.ADD_COMPONENT_CATEGORY_CLICKED,{c1:a});
W.Editor._editorUI.showComponentInPanel("addComponent",false,{category:a},Constants.EditorUI.ADD_PANEL)
},_showPanelIfExist:function(a){this._cachedPanels=this._cachedPanels||{};
if(this._cachedPanels[a]){W.Editor._editorUI.showSubPanelWithParentPanelSize(this._cachedPanels[a],true);
return true
}return false
},_savePanelInCache:function(a,b){this._cachedPanels=this._cachedPanels||{};
this._cachedPanels[b]=a
}}});
W.Classes.newClass({name:"wysiwyg.editor.commandregistrars.PageManipulationCommandRegistrar",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_pastePage","_updatePageMenuItem"],initialize:function(){},registerCommands:function(){var a=W.Commands;
this._pageTransitionCommand=a.registerCommandAndListener("WEditorCommands.PageTransition",this,this._onPageTransitionChanged);
this._deletePageCommand=a.registerCommandAndListener("WEditorCommands.DeletePage",this,this._onDeletePage);
this._duplicatePageCommand=a.registerCommandAndListener("WEditCommands.DuplicatePage",this,this._onDuplicatePage);
this._addPageCommand=a.registerCommandAndListener("WEditorCommands.AddPage",this,this._onWAddPage);
this._setHomepage=a.registerCommandAndListener("WEditorCommands.SetHomepage",this,this._onSetHomepage);
this._setHomepageButtonIndication=a.registerCommandAndListener("WEditorCommands.SetHomepageButtonIndication",this,this._onSetHomepageButtonIndication);
this._setPageVisibility=a.registerCommandAndListener("WEditorCommands.SetPageVisibility",this,this._onSetPageVisibility)
},_onPageTransitionChanged:function(c,b){var a=W.Preview.getPreviewManagers().Viewer.getPageGroup();
a.setComponentProperty("transition",c)
},_onDeletePage:function(a,b){W.Editor.deletePage(a)
},_onDuplicatePage:function(d){var a=d.newPageName;
var c=d.pageParent;
var e=W.Preview.getPreviewSite().$(d.pageHtmlId).getLogic();
var b=W.ClipBoard.copyComponent(e);
this._pastePage(b,a,c)
},_onWAddPage:function(g){var f=g.page;
var c=g.parent;
LOG.reportEvent(wixEvents.ADD_PAGE,{label:f.name});
var h=new WClass({Extends:Events,initialize:function(i){this.compData=i
}},"ComponentData");
var a=[];
var e=["wixapps.integration.components.AppPart","wysiwyg.viewer.components.tpapps.TPASection","wysiwyg.viewer.components.tpapps.TPAWidget"];
var b=function(i){if(i.data){i.data.metaData.isPreset=true
}if(i.components){i.components.forEach(b)
}if(e.contains(i.componentType)){a.push(new h(i))
}};
f.serializedPageData.components.forEach(b);
var d=new Async.Bulk(a,this._provisionAppComponent,{parallel:false,completeCallback:function(){this._pastePage(f.serializedPageData,f.name,c);
this.injects().UndoRedoManager._endTransaction(null)
}.bind(this)})
},_pastePage:function(c,a,b){W.Editor.setEditMode(W.Editor.EDIT_MODE.CURRENT_PAGE);
var f=W.Preview.getPreviewManagers().Viewer;
var e=f.getSiteNode().getElement("#SITE_PAGES");
var d=W.ClipBoard.pasteFromClip(e,true,c,false,function(){d.getLogic().listenForContentRendered()
}.bind(this));
d.addEvent(Constants.ComponentEvents.READY,function(){W.Preview.getPreviewManagers().Data.getDataByQuery(d.get("dataquery"),function(g){var i=g.get("id");
d.set("id",i);
var h=W.Utils.convertToValidUrlPart(a);
g.set("pageUriSEO",h);
g.set("title",a);
this._updatePageMenuItem(b,g);
f.indexPages(e);
f.updatePagesData();
d.getLogic().setAsWixified();
W.Commands.executeCommand("EditorCommands.gotoSitePage",i)
}.bind(this))
}.bind(this))
},_updatePageMenuItem:function(b,a){var c=W.Preview.getPreviewManagers().Data.getDataByQuery("#MAIN_MENU");
c.createAndAddNavigationItem("#"+a.get("id"),b)
},_onSetHomepage:function(c){var b=W.Preview.getPreviewManagers().Data.getDataMap().SITE_STRUCTURE;
var a="mainPage";
if(c.currentPageId!=="mainPage"){a=c.currentPageId
}b.set("mainPage","#"+c.currentPageId);
b.set("mainPageId",a)
},_onSetPageVisibility:function(b,a){},_onSetHomepageButtonIndication:function(a,b){},_provisionAppComponent:function(){var i=this.compData;
var h=this;
var e=i.componentType;
var f=W.AppStoreManager.getAppTypeByClassName(e);
var d=W.AppStoreManager.getAppManager(f);
var b=d.getApplicationIdFieldName();
var c=i.data[b];
if(c==undefined){this.fireEvent("error");
LOG.reportError("App inner ID for ["+f+"] is blank","PageManipulationRegistrar","_provisionAppComponent");
return
}if(W.Utils.isNumber(c)){this.fireEvent("complete");
return
}var k=/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/i;
var g=c.match(k);
if(!g||g.length!=1){this.fireEvent("error");
LOG.reportError("App inner ID for ["+f+"] contains illegal value","PageManipulationRegistrar","_provisionAppComponent");
return
}var j=g[0];
var a={appDefinitionId:j};
W.AppStoreManager.provisionAndRegisterComponent(f,a,null,function(l){W.Preview.getPreviewManagers().Viewer.getAppDataHandler().registerAppData(l);
if(f=="wixappsPart"){var m=W.Preview.getPreviewManagers().Apps;
if(!m.getAppByPackageName(l.packageName)){m.loadApplication(l)
}}i.data[b]=l.applicationId;
h.fireEvent("complete")
})
}}});
W.Classes.newClass({name:"wysiwyg.editor.commandregistrars.AccountCommandRegistrar",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:[],initialize:function(){},registerCommands:function(){var a=W.Commands;
this._upgradeToPremiumCommand=a.registerCommandAndListener("WEditorCommands.UpgradeToPremium",this,this._onUpgradeToPremiumCommand);
this._publishCommand=a.registerCommandAndListener("WEditorCommands.Publish",this,this._onPublishCommand);
this._goToMyAcountCommand=a.registerCommandAndListener("WEditorCommands.GoToMyAcount",this,this._onGoToMyAcountCommand);
this._manageDomainCommand=a.registerCommandAndListener("WEditorCommands.ManageDomain",this,this._onManageDomainCommand);
this._postInFacebookCommand=a.registerCommandAndListener("WEditorCommands.PostInFacebook",this,this._onPostInFacebookCommand);
this._postInTwitterCommand=a.registerCommandAndListener("WEditorCommands.ShareInTwitter",this,this._onShareInTwitterCommand)
},_onUpgradeToPremiumCommand:function(c,d){var i=!W.Config.siteNeverSavedBefore();
var f=W.Config.isPremiumUser();
var h=i?(f?2:1):0;
LOG.reportEvent(wixEvents.UPGRADE_BUTTON_CLICKED,{c1:c.referralAdditionalInfo,i1:h});
if(!i){var k=W.Resources.get("EDITOR_LANGUAGE","MUST_SAVE_BEFORE_PUBLISH");
var g={description:k};
W.EditorDialogs.openSaveDialog(g)
}else{var b=window.serviceTopology.premiumServerUrl;
var a=b+"/wix/api/premiumStart";
var e=W.Config.getMetaSiteId();
var j="edhtml_"+c.referralAdditionalInfo;
window.open(a+"?siteGuid="+e+"&referralAdditionalInfo="+j);
W.EditorDialogs.openPromptDialog(W.Resources.get("EDITOR_LANGUAGE","REFRESH_WHEN_UPGRADE_COMPLETED_TITLE"),W.Resources.get("EDITOR_LANGUAGE","REFRESH_WHEN_UPGRADE_COMPLETED_DESCRIPTION"),"",W.EditorDialogs.DialogButtonSet.OK)
}},_onPublishCommand:function(){if(!W.Preview.isSiteReady()){return
}var a={};
a.onCompleteCallback=function(){if(W.Config.getApplicationType()==Constants.WEditManager.SITE_TYPE_FACEBOOK){W.ServerFacade.publishDocument(window.siteHeader.id,function(){this._removeSaveFreeze();
W.Commands.executeCommand("WEditorCommands.OpenPublishFbSiteSuccessDialog")
}.bind(this),function(b,c){this._removeSaveFreeze();
W.Utils.errorPopup(W.Resources.get("EDITOR_LANGUAGE","ERROR_PUBLISH_DOCUMENT_FB_TITLE"),W.Resources.get("EDITOR_LANGUAGE","ERROR_PUBLISH_DESC")+" ("+c+")","")
}.bind(this))
}else{W.ServerFacade.publishDocument(siteHeader.id,function(){this._removeSaveFreeze();
W.Commands.executeCommand("WEditorCommands.OpenPublishWebsiteSuccessDialog")
}.bind(this),function(c,d){this._removeSaveFreeze();
var b=W.Utils.EditorErrorUtils;
var e=b.getErrorMsg(d,"ERROR_PUBLISH_DESC");
W.EditorDialogs.openPromptDialog(W.Resources.get("EDITOR_LANGUAGE","ERROR_PUBLISH_TITLE"),e,"",W.EditorDialogs.DialogButtonSet.OK,function(){})
}.bind(this))
}}.bind(this);
this.injects().Commands.executeCommand("WEditorCommands.Save",a)
},_removeSaveFreeze:function(){var a=$("TEMP_SAVE_FREEZE");
if(a&&a.dispose){a.dispose()
}},_onGoToMyAcountCommand:function(){var a=window.serviceTopology.dashboardUrl;
window.open(a);
this._closeDialog()
},_onManageDomainCommand:function(){var a=window.serviceTopology.premiumServerUrl;
window.open(a+"/wix/api/domainViewForm?domainName=anotherpleskdomainfortest.com&")
},_onPostInFacebookCommand:function(a){window.open("http://www.facebook.com/sharer/sharer.php?u="+a.url+"&t="+a.text)
},_onShareInTwitterCommand:function(b){var a=b.isPremium?W.Resources.get("EDITOR_LANGUAGE","TWITTER_CHECK_OUT_MY_SITE_MSG_PREMIUM"):W.Resources.get("EDITOR_LANGUAGE","TWITTER_CHECK_OUT_MY_SITE_MSG_NON_PREMIUM");
window.open("https://twitter.com/intent/tweet?url="+b.siteUrl+"&text="+a+"&related="+W.Resources.get("EDITOR_LANGUAGE","TWITTER_RELATED_WIX_ACCOUNTS"))
}}});
W.Classes.newClass({name:"wysiwyg.editor.commandregistrars.ComponentCommandRegistrar",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:[],initialize:function(){},registerCommands:function(){var a=W.Commands;
this._changeSelectedComponentPosSizeCommand=a.registerCommandAndListener("WEditorCommands.SetSelectedCompPositionSize",this,this._setSelectedComponentPosSize);
this._moveSelectedComponentCommand=a.registerCommandAndListener("WEditorCommands.MoveSelectedComponent",this,this._moveSelectedComponent);
this._addComponentCommand=W.CommandsNew.registerCommandListener("WEditorCommands.AddComponent",this,this._onAddComponent);
this._addAppCommand=a.registerCommandAndListener("WEditorCommands.AddApp",this,this._onAddApp);
this._addAppComponentCommand=a.registerCommandAndListener("WEditorCommands.AddAppComponent",this,this._onAddAppComponent);
this._openMarketPopupCommand=a.registerCommandAndListener("WEditorCommands.openMarketPopup",this,this._onOpenMarketPopup);
this._closeMarketPopupCommand=a.registerCommand("WEditorCommands.closeMarketPopup");
this._addComponentfullParamsCommand=a.registerCommandAndListener("WEditorCommands.AddComponentFullParams",this,this._onAddComponentFullParams);
this._gridSnapToGridCommand=a.registerCommandAndListener("EditCommands.SnapToGrid",this,this._onSnapToGrid);
this._moveComponentToOtherScopeCommand=a.registerCommandAndListener("EditCommands.moveCurrentComponentToOtherScope",this,this._moveCurrentComponentToOtherScopeCommand);
this._componentScopeChangeCommand=a.registerCommand("WEditorCommands.componentScopeChange");
this._componentCoordinatesSizeChangeCommand=a.registerCommand("WEditorCommands.componentPosSizeChange");
this._addSMComponentCommand=this.injects().Commands.registerCommandAndListener("WEditorCommands.AddSMDependantComponent",this,this._onAddSMDependantComponent)
},_moveSelectedComponent:function(b){b=b||{};
var a=W.Editor.getEditedComponent().getX();
var d=W.Editor.getEditedComponent().getY();
var c={x:a+(b.x||0),y:d+(b.y||0)};
this._setSelectedComponentPosSize(c)
},_setSelectedComponentPosSize:function(e){var c=W.Editor.getEditedComponent();
var d=c.getSizeLimits();
var b=e.updateLayout;
var a=c.useLayoutOnDrag();
if(e.x!=undefined){c.setX(this._enforceMinMax(e.x,this.MINIMUM_X_DEFAULT,this.MAXIMUM_X_DEFAULT))
}if(e.y!=undefined){if(a){e.y=Math.max(c.getMinDragY(),e.y)
}c.setY(this._enforceMinMax(e.y,this.MINIMUM_Y_DEFAULT,this.MAXIMUM_Y_DEFAULT))
}if(e.width!=undefined){c.setWidth(this._enforceMinMax(e.width,d.minW,d.maxW))
}if(e.height!=undefined){c.setHeight(this._enforceMinMax(e.height,d.minH,d.maxH))
}var f=[c];
if(c.isMultiSelect){f=c.getSelectedComps()
}if(b&&!a){if(e.width!=undefined||e.height!=undefined){W.Preview.getPreviewManagers().Layout.reportResize(f)
}else{W.Preview.getPreviewManagers().Layout.reportMove(f)
}}if(e.enforceAnchors||a){W.Preview.getPreviewManagers().Layout.enforceAnchors(f,true)
}if(W.Editor._editorComponents.componentPanel){W.Editor._editorComponents.componentPanel.updateCompPosSize()
}W.Editor._editorComponents.editingFrame.fitToComp();
W.Editor.onComponentChanged(false,true)
},_enforceMinMax:function(c,b,a){return Math.min(Math.max(c,b),a)
},_onAddComponentFullParams:function(e,d){if(W.Editor._editMode!=W.Editor.EDIT_MODE.CURRENT_PAGE){W.Commands.executeCommand("WEditorCommands.WSetEditMode",{editMode:W.Editor.EDIT_MODE.CURRENT_PAGE})
}W.Editor.clearSelectedComponent();
var a=this._addComponentToCurrentScope(e.compDef,e.styleId);
var c=e.viewNodeEvents;
var b;
if(c){for(b in c){a.addEvent(b,function(){c[b](a)
})
}}},_addComponentToCurrentScope:function(d,b){var e=W.Preview.getPreviewManagers().Viewer;
var a;
if(W.Editor.getEditMode()==W.Editor.EDIT_MODE.CURRENT_PAGE){a=e.getSiteNode().getElement("#"+e.getCurrentPageId())
}else{if(W.Editor.getEditMode()==W.Editor.EDIT_MODE.MASTER_PAGE){a=e.getSiteNode()
}}if(d.comp){d.componentType=d.comp
}var c=W.CompDeserializer.createAndAddComponent(a,d,undefined,undefined,b,undefined);
return c
},_onAddComponent:function(b){var a=b.data.passedData;
if(!W.Editor._componentData){return
}if(!a){return W.Utils.debugTrace("WEditManager::_onAddComponent: Missing parameter")
}var c=a.compData||W.Editor._componentData[a.compType];
return this._onAddComponentInternal(a,c)
},_onAddComponentInternal:function(b,a){if(!a){return W.Utils.debugTrace("WEditManager::_onAddComponent: unknown component type "+b)
}var c=a.data;
if(c){c.metaData=c.metaData||{};
c.metaData.isPreset=true
}if(b.showOnAllPagesByDefault){W.Commands.executeCommand("WEditorCommands.WSetEditMode",{editMode:W.Editor.EDIT_MODE.MASTER_PAGE})
}else{if(W.Editor._editMode!=W.Editor.EDIT_MODE.CURRENT_PAGE){W.Commands.executeCommand("WEditorCommands.WSetEditMode",{editMode:W.Editor.EDIT_MODE.CURRENT_PAGE})
}}W.Editor.clearSelectedComponent();
this._addComponentToCurrentScope(a,b.styleId);
LOG.reportEvent(wixEvents.COMPONENT_ADDED,{c1:b.compType,c2:b.styleId})
},_onSnapToGrid:function(b){if(b==undefined){var a=W.Editor.getGridScale()!=1?1:Constants.WEditManager.DEFAULT_GRID_SCALE;
W.Editor.setGridScale(a);
return
}if(b){W.Editor.setGridScale(Constants.WEditManager.DEFAULT_GRID_SCALE)
}else{W.Editor.setGridScale(1)
}},_onAddAppComponent:function(e){var b=e.appDefinitionDataObj;
var d=e.widgetId||null;
var c=e.type;
var a=b.appDefinitionId;
var f=this.injects().AppStoreManager.countAppElements(c,a);
LOG.reportEvent(wixEvents.APPS_FLOW_APP_BUTTON_CLICKED,{g1:a,i1:f});
W.EditorDialogs.openAddAppDialog(b,c,d,function(){this.injects().AppStoreManager.addComponent(c,b,d);
LOG.reportEvent(wixEvents.APPS_FLOW_APP_ADDED_TO_STAGE,{g1:b.appDefinitionId})
}.bind(this))
},_onAddApp:function(d){var a=d.appDefinitionDataObj;
var c=d.widgetId||null;
var b=d.type;
this.injects().AppStoreManager.addComponent(b,a,c);
LOG.reportEvent(wixEvents.APPS_FLOW_APP_ADDED_TO_STAGE,{g1:a.appDefinitionId})
},_onOpenMarketPopup:function(a){W.EditorDialogs.openMarketPopup(a)
},_moveCurrentComponentToOtherScopeCommand:function(a){W.Editor.moveCurrentComponentToOtherScope(a.event)
},_onAddSMDependantComponent:function(b,a){W.SMEditor.provisionIfNeeded(function(){var c={data:{passedData:b}};
this._onAddComponent(c)
}.bind(this))
},setKeyboardEvents:function(){var a=W.InputBindings;
var c=1;
var b=10;
a.addBinding("down",{command:this._moveSelectedComponentCommand,commandParameter:{y:c}});
a.addBinding("up",{command:this._moveSelectedComponentCommand,commandParameter:{y:-c}});
a.addBinding("right",{command:this._moveSelectedComponentCommand,commandParameter:{x:c}});
a.addBinding("left",{command:this._moveSelectedComponentCommand,commandParameter:{x:-c}});
a.addBinding(["ctrl+down","command+down"],{command:this._moveSelectedComponentCommand,commandParameter:{y:b}});
a.addBinding(["ctrl+up","command+up"],{command:this._moveSelectedComponentCommand,commandParameter:{y:-b}});
a.addBinding(["ctrl+right","command+right"],{command:this._moveSelectedComponentCommand,commandParameter:{x:b}});
a.addBinding(["ctrl+left","command+left"],{command:this._moveSelectedComponentCommand,commandParameter:{x:-b}})
},enableEditCommands:function(c){c=!!c;
var a=[this._moveSelectedComponentCommand];
var b;
for(b=a.length-1;
b>=0;
--b){a[b].setState(c)
}}}});
W.Classes.newClass({name:"wysiwyg.editor.commandregistrars.EditorCommandRegistrar",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:[],initialize:function(){},registerCommands:function(){var a=W.Commands;
this._gridCommand=a.registerCommandAndListener("EditCommands.ToggleGridLines",this,this._onGrid);
this._setEditModeCommand=a.registerCommandAndListener("WEditorCommands.WSetEditMode",this,this._onSetEditMode)
},_onSetEditMode:function(b,a){if(!W.Preview.isSiteReady()){return
}W.Editor.setEditMode(b.editMode);
if(b&&(b.src=="previewBtn")){LOG.reportEvent(wixEvents.PREVIEW_BUTTON_CLICKED_IN_MAIN_WINDOW,{g1:W.Editor._templateId})
}else{if(b&&(b.previousEditMode=="PREVIEW")){LOG.reportEvent(wixEvents.BACK_TO_EDITOR_MODE_BUTTON_CLICKED,{g1:W.Editor._templateId})
}}},_onGrid:function(b){var a=W.Preview.getPreviewManagers().Viewer.getPageGroup();
a.toggleGrid()
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.WCommandRegistrar",imports:["wysiwyg.editor.commandregistrars.EditCommandRegistrar"],Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_suppressUnboundBackspace"],initialize:function(){this._editCommandRegistrar=new (W.Classes.get("wysiwyg.editor.commandregistrars.EditCommandRegistrar"))();
this._saveCommandRegistrar=new (W.Classes.get("wysiwyg.editor.commandregistrars.SaveCommandRegistrar"))();
this._openDialogCommandRegistrar=new (W.Classes.get("wysiwyg.editor.commandregistrars.OpenDialogCommandRegistrar"))();
this._openPanelCommandRegistrar=new (W.Classes.get("wysiwyg.editor.commandregistrars.OpenPanelCommandRegistrar"))();
this._pageManipulationCommandRegistrar=new (W.Classes.get("wysiwyg.editor.commandregistrars.PageManipulationCommandRegistrar"))();
this._accountCommandRegistrar=new (W.Classes.get("wysiwyg.editor.commandregistrars.AccountCommandRegistrar"))();
this._componentCommandRegistrar=new (W.Classes.get("wysiwyg.editor.commandregistrars.ComponentCommandRegistrar"))();
this._editorCommandRegistrar=new (W.Classes.get("wysiwyg.editor.commandregistrars.EditorCommandRegistrar"))();
this._ignoreKeyhandlerInTags=null
},registerCommands:function(){W.Commands.registerCommand("EditorCommands.SiteLoaded");
this._editCommandRegistrar.registerCommands();
this._saveCommandRegistrar.registerCommands();
this._openDialogCommandRegistrar.registerCommands();
this._openPanelCommandRegistrar.registerCommands();
this._pageManipulationCommandRegistrar.registerCommands();
this._accountCommandRegistrar.registerCommands();
this._componentCommandRegistrar.registerCommands();
this._editorCommandRegistrar.registerCommands()
},setKeyboardEvents:function(){this._editCommandRegistrar.setKeyboardEvents();
this._saveCommandRegistrar.setKeyboardEvents();
this._componentCommandRegistrar.setKeyboardEvents();
window.addEvent("keydown",this._suppressUnboundBackspace);
window.addEvent("keydown",this._suppressUnboundSave);
W.Preview.getPreviewSite().addEvent("keydown",this._suppressUnboundBackspace)
},_suppressUnboundBackspace:function(c){if(c&&c.key=="backspace"){var a=!W.Editor.getKeysEnabled();
var b=!W.Editor.getEditedComponent();
if(a||b){if(!W.InputBindings.isStopCallback(c,c.target,c.key,true)){c.stopPropagation();
c.preventDefault();
return false
}}}},_suppressUnboundSave:function(a){if((a.control||a.meta)&&a.key=="s"){if(!W.Editor.getKeysEnabled()){a.stopPropagation();
a.preventDefault();
return false
}}},enableEditCommands:function(a){this._editCommandRegistrar.enableEditCommands(a);
this._componentCommandRegistrar.enableEditCommands(a)
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.WEditorStatusAPI",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:[],initialize:function(){},getSaveInProcess:function(){return this._saveInProcess
},setSaveInProcess:function(a){this._saveInProcess=a
},isPreviouslyPublished:function(){return(this._alreadyPublishedBefore||W.Preview.getPreviewSite().window.rendererModel.published)
},markSiteAsPublishedBefore:function(){this._alreadyPublishedBefore=true
}}});
W.Classes.newClass({name:"wysiwyg.editor.managers.UndoRedoManager",imports:["wysiwyg.editor.managers.undoredomanager.LayoutChange","wysiwyg.editor.managers.undoredomanager.PropertyChange","wysiwyg.editor.managers.undoredomanager.PositionChange","wysiwyg.editor.managers.undoredomanager.DataChange"],Class:{Extends:Events,Binds:["_onChange","_getComponentDataManager","_resetStacks","_onSiteLoaded","_beforeSiteLoaded","_startTransaction","undo","redo","_onPageChange"],_constants:{Modules:{LAYOUT_CHANGE:"LayoutChange",COMP_DATA_CHANGE:"PropertyChange",POSITION_CHANGE:"PositionChange",DATA_CHANGE:"DataChange"},Commands:{UNDO:"_undo",REDO:"_redo"},_prefix:"wysiwyg.editor.managers.undoredomanager."},initialize:function(){this._historyStack=[];
this._knownFutureStack=[];
this._transactionStack=[];
this._layoutData=new this.imports.LayoutChange();
this._positionData=new this.imports.PositionChange();
this._compPropData=new this.imports.PropertyChange();
this._compData=new this.imports.DataChange();
this._isReady=false;
W.Managers.addEvent("deploymentCompleted",this._beforeSiteLoaded)
},isReady:function(){return this._isReady
},clone:function(){return new this.$class()
},_beforeSiteLoaded:function(){this.injects().Commands.registerCommandListenerByName("EditorCommands.SiteLoaded",this,this._onSiteLoaded,null);
this.injects().Commands.registerCommandListenerByName("WEditorCommands.AddPage",this,this._onAddPage,null);
this.injects().CommandsNew.registerCommandListener("WEditorCommands.AddComponent",this,this._resetStacks,null);
this._isReady=true
},_onSiteLoaded:function(){W.Editor.addEvent(Constants.EditorEvents.SITE_PAGE_CHANGED,this._onPageChange);
W.Managers.getManagers().Layout.addEvent("resetHistoryStack",this._resetStacks);
this._layoutData.addEvent(Constants.DataEvents.DATA_CHANGED,this._onChange);
this._positionData.addEvent(Constants.DataEvents.DATA_CHANGED,this._onChange);
this._compPropData.addEvent(Constants.DataEvents.DATA_CHANGED,this._onChange);
this._compData.addEvent(Constants.DataEvents.DATA_CHANGED,this._onChange);
this.modules={};
this.modules[this._constants.Modules.LAYOUT_CHANGE]=this._layoutData;
this.modules[this._constants.Modules.POSITION_CHANGE]=this._positionData;
this.modules[this._constants.Modules.COMP_DATA_CHANGE]=this._compPropData;
this.modules[this._constants.Modules.DATA_CHANGE]=this._compData;
var a=W.Managers.getManagers();
this._layoutData.startListenTo(a.Layout);
this._positionData.startListenTo(a.Layout);
this._compPropData.startListenTo(this._getComponentPropDataManager());
this._compData.startListenTo(this._getComponentDataManager());
this._currentPageId=this._getCurrentPageId()
},_onChange:function(d){if(d&&d.sender==="undo"){return
}this._resetFutureStack();
if(this._isInTransaction){this._transactionStack.unshift(d);
var c=d.type===this._constants._prefix+"DataChange";
var a=d.type===this._constants._prefix+"PropertyChange";
if(c||a){this._endTransaction(this._startScopeId);
this._startTransaction(this._startScopeId)
}return
}if(d&&d.timestamp&&this._isUndoable()&&this._historyStack[0].timestamp){var b=this._historyStack[0];
if(b.type!=d.type){return
}if(b.dataItemId!=d.dataItemId){return
}if(d.timestamp-b.timestamp<500){return
}}if(d){d.pageId=W.Preview.getPreviewManagers().Viewer.getCurrentPageId()
}this._historyStack.unshift(d)
},undo:function(){if(!this._isUndoable()){return false
}var b=this._historyStack[0];
this._currentPageId=this._getCurrentPageId();
if(this._currentPageId!=b.pageId){W.Preview.getPreviewManagers().Viewer.addEvent("pageTransitionEnded",this.undo);
this.injects().Preview.goToPage(b.pageId);
return
}else{W.Preview.getPreviewManagers().Viewer.removeEvent("pageTransitionEnded",this.undo)
}if(this._isTransactionData(b)){this._undoTransaction(b.transaction);
var a=this.injects().Editor.getComponentEditBox()._editedComponent;
if(a&&a.getLogic){this.injects().Preview.getPreviewManagers().Layout.enforceAnchors([a],true,false)
}}else{this._applyChangeMap(this._constants.Commands.UNDO,b,b.type)
}this._knownFutureStack.unshift(b);
this._removeItemFromStack(this._historyStack);
this._refreshComponentEditBox();
this.injects().Editor.onComponentChanged(true);
return true
},redo:function(){if(!this._isRedoable()){return false
}var a=this._knownFutureStack[0];
this._currentPageId=this._getCurrentPageId();
if(this._currentPageId!=a.pageId){this.injects().Preview.getPreviewManagers().Viewer.addEvent("pageTransitionEnded",this.redo);
this.injects().Preview.goToPage(a.pageId);
return
}else{W.Preview.getPreviewManagers().Viewer.removeEvent("pageTransitionEnded",this.redo)
}if(this._isTransactionData(a)){this._redoTransaction(a.transaction)
}else{this._applyChangeMap(this._constants.Commands.REDO,a,a.type)
}this._historyStack.unshift(a);
this._removeItemFromStack(this._knownFutureStack);
this._refreshComponentEditBox();
this.injects().Editor.onComponentChanged(true);
return true
},_undoTransaction:function(a){for(var c=0;
c<a.length;
++c){var b=a[c].type;
this._applyChangeMap(this._constants.Commands.UNDO,a[c],b)
}},_redoTransaction:function(a){for(var c=0;
c<a.length;
++c){var b=a[c].type;
this._applyChangeMap(this._constants.Commands.REDO,a[c],b)
}},_startTransaction:function(a){if(a===null&&!this._isInTransaction){this._resetAfterTransaction=true
}if(a){this._startScopeId=a
}else{this._startScopeId=null
}if(this._isInTransaction){return
}this._isInTransaction=true;
this._transactionStack=[]
},_endTransaction:function(a){if(this._resetAfterTransaction){this._resetAfterTransaction=false;
this._resetStacks();
return
}if(this._resetStacksFlag){this._transactionStack=[];
this._resetStacksFlag=false;
return
}if(a==null||a!=this._startScopeId){this._resetStacks();
return
}this._isInTransaction=false;
if(!this._transactionStack.length){return
}this._historyStack.unshift({transaction:this._transactionStack,pageId:W.Preview.getPreviewManagers().Viewer.getCurrentPageId()});
this._transactionStack=[]
},_isTransactionData:function(a){return a.transaction&&typeOf(a.transaction)=="array"
},_applyChangeMap:function(c,a,b){this.modules[this._getType(b)][c](a)
},_getType:function(a){return a.replace(this._constants._prefix,"")
},_resetFutureStack:function(){if(this._isRedoable()){this._knownFutureStack=[]
}},_isUndoable:function(){return this._historyStack.length>0
},_isRedoable:function(){return this._knownFutureStack.length>0
},_removeItemFromStack:function(a){a.splice(0,1)
},_refreshComponentEditBox:function(){var a=this.injects().Editor;
if(a.getSelectedComp()){a.getComponentEditBox().fitToComp()
}},_onAddPage:function(){this._startTransaction(null)
},_resetStacks:function(){this._resetStacksFlag=true;
this._endTransaction(null);
this._isInTransaction=false;
this._transactionStack=[];
this._knownFutureStack=[];
this._historyStack=[]
},_onPageChange:function(a){this._currentPageId=a
},_getCurrentPageId:function(){return W.Preview.getPreviewManagers().Viewer.getCurrentPageId()
},_getComponentPropDataManager:function(){return this.injects().Preview.getPreviewManagers().ComponentData
},_getComponentDataManager:function(){return this.injects().Preview.getPreviewManagers().Data
}}});