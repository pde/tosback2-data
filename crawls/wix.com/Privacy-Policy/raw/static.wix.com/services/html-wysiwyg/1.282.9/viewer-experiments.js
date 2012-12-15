W.Experiments.registerExperimentComponent("Demimranize","New",{name:"experiments.wysiwyg.viewer.components.AdminLoginDemimranize",skinParts:clone(),Class:{Extends:"wysiwyg.viewer.components.AdminLogin",initialize:before(function(){this.isVolatile=true
})}});
W.Experiments.registerNewExperimentComponent("AudioPlayer","New",{name:"wysiwyg.viewer.components.AudioPlayer",skinParts:{playButton:{type:"htmlElement"},stopButton:{type:"htmlElement"},pauseButton:{type:"htmlElement"}},Class:{EDITOR_META_DATA:{general:{settings:true,design:true},custom:[{label:"AUDIO_REPLACE_AUDIO",command:"WEditorCommands.OpenImageDialog",commandParameter:{galleryTypeID:"audio"},commandParameterDataRef:"SELF"}],dblClick:{command:"WEditorCommands.OpenImageDialog",commandParameter:{galleryTypeID:"audio"},commandParameterDataRef:"SELF"}},Extends:"mobile.core.components.base.BaseComponent",Binds:["_play","_pause","_stop","_setVolume","_onApiLoaded","_createAudioPlayer"],_states:["playing"],initialize:function(c,a,b){this.parent(c,a,b);
this._loadApi()
},_onAllSkinPartsReady:function(a){this._createAudioPlayer()
},_createAudioPlayer:function(){if(!this.$class._audioManagerWasLoaded){W.Utils.callLater(this._createAudioPlayer,null,this,10);
return
}this._skinParts.playButton.addEvent("click",this._play);
this._skinParts.stopButton.addEvent("click",this._stop);
this._skinParts.pauseButton.addEvent("click",this._pause);
this.injects().Commands.registerCommandListenerByName("WPreviewCommands.WEditModeChanged",this,this._onModeChange);
if(this.$class._audioManagerWasLoaded){this._audio=this._createAudioObject()
}window.addEventListener("blur",function(){this._pause()
}.bind(this));
if(!this.injects().Viewer.getPreviewMode()&&this.getIsDisplayed()&&this._data.get("autoPlay")){this._play()
}},_onModeChange:function(a){if((this._isInPreviewMode(a)&&this.getIsDisplayed()&&this._data.get("autoPlay")&&this._fileWasSet())){this._play()
}else{this._stop()
}},_fileWasSet:function(){return this._data.get("uri").length>0
},_isInPreviewMode:function(a){return a.toLowerCase()===Constants.ViewManager.VIEW_MODE_PREVIEW.toLowerCase()
},_play:function(){if(this._fileWasSet()){this.setState("playing");
var a={volume:this._data.get("volume")};
if(this._data.get("loop")){a.onfinish=this._play
}if(this._audio){this._audio.play(a)
}}},_pause:function(){if(this._fileWasSet()){this.removeState("playing");
this._audio.pause()
}},_stop:function(){if(this._fileWasSet()&&this._audio){this.removeState("playing");
this._audio.stop();
this._audio.destruct();
this._audio=this._createAudioObject()
}},_createAudioObject:function(){return soundManager.createSound({id:this._view.getAttribute("id"),url:this._getFullUrl(this._data.get("uri"))})
},_getFullUrl:function(b){if(b.indexOf("http://")===-1){var a=window.serviceTopology.staticAudioUrl;
if(a[a.length-1]!=="/"){a+="/"
}a+=b;
return a
}return b
},_setVolume:function(b){var a=b.value||100;
this._audio.volume=a/100
},_onDataChange:function(a){this.parent(a);
this._stop()
},getAcceptableDataTypes:function(){return["AudioPlayer"]
},_getSoundManagerFolder:function(){var a=window.serviceTopology.scriptsRoot;
if(a[a.length-1]!=="/"){a+="/"
}a+="resources/wysiwyg/media/soundmanager2/";
return a
},_onApiLoaded:function(){soundManager.url=this._getSoundManagerFolder();
soundManager.onready(function(){this.$class._audioManagerWasLoaded=true
}.bind(this))
},_loadApi:function(){if(!this.$class.audioApiLoaded){this.$class.audioApiLoaded=true;
this.apiScriptNode=document.createElement("script");
var a=document.getElementsByTagName("script")[0];
this.apiScriptNode.src=this._getSoundManagerFolder()+"soundmanager2-nodebug-jsmin.js";
this.apiScriptNode.onload=this._onApiLoaded;
a.parentNode.insertBefore(this.apiScriptNode,a)
}},onPageVisibilityChange:function(a){if(window.viewMode==="editor"){return
}if(!a&&(this.getState()==="playing")){this._pause()
}else{if(a&&this._data.get("autoPlay")&&(this.getState()!=="playing")){this._play()
}}}}});
W.Experiments.registerExperimentComponent("NewComps","New",{name:"experiments.wysiwyg.viewer.components.DisplayerNewComps",skinParts:clone(),traits:["mobile.core.components.traits.LinkableComponent","wysiwyg.viewer.components.traits.SelectableOption"],Class:{Extends:"wysiwyg.viewer.components.Displayer",_states:merge({selectState:["selected","unselected"]}),setSelected:function(a){this.setState(a?"selected":"unselected","selectState")
}}});
W.Experiments.registerExperimentComponent("Demimranize","New",{name:"experiments.wysiwyg.viewer.components.MediaZoomDemimranize",skinParts:clone(),Class:{Extends:"wysiwyg.viewer.components.MediaZoom",initialize:before(function(){this.isVolatile=true
})}});
W.Experiments.registerExperimentComponent("WixApps","New",{name:"experiments.wysiwyg.viewer.components.MediaZoomWixApps",skinParts:clone(),Class:{Extends:"wysiwyg.viewer.components.MediaZoom",setGallery:function(e,c,b,a,d){if(!this._validateArgs(e,c)){return
}this._opened=true;
this._getDisplayerDivFunction=b;
this._getHashPartsFunction=a;
this._extraParams=d||{};
this.setDataItem(e);
this.setListAndCurrentIndex(e,c);
this._setNextPrevVisibility()
},_setNextPrevVisibility:function(){this._skinParts.buttonNext.uncollapse();
this._skinParts.buttonPrev.uncollapse();
if(this.getDataItem().get("items").length<=1||this._extraParams.hideNextPrevBtns){this._skinParts.buttonNext.collapse();
this._skinParts.buttonPrev.collapse()
}},_renderCurrentDisplayer:function(d){var a=this._skinParts.virtualContainer;
for(var b=0;
b<a.childNodes.length;
b++){a.childNodes[b].destroy()
}var c=this;
this._getDisplayerDivFunction(this._currentItem,{container:c._skinParts.virtualContainer,x:this._imageMaxWidth,y:this._imageMaxHeight},function(e){if(!e.getParent('[skinpart="virtualContainer"]')){e.insertInto(c._skinParts.virtualContainer)
}c._transitionToCurrentDisplayer(e)
})
},_transitionToCurrentDisplayer:function(c){if(this._inTransition){return
}this._inTransition=true;
c.setStyle("opacity","0.0");
var b=this._skinParts.itemsContainer;
var e=this;
var a=function(){for(var h=0;
h<b.childNodes.length;
h++){b.childNodes[h].destroy()
}b.empty();
var g=c.getStyles("width","height");
var f=e._getTopGap(g.height.replace("px",""));
b.adopt(c);
e._skinParts.virtualContainer.empty();
var j=new Fx.Morph(e._skinParts.dialogBox,{duration:e.transitionTime,link:"chain"});
j.addEvent("complete",function(){var k=new Fx.Tween(c,{duration:e.transitionTime,link:"chain"});
k.addEvent("complete",function(){e.unlock();
e._inTransition=false;
k.removeEvent("complete",arguments.callee)
});
k.start("opacity","1.0");
j.removeEvent("complete",arguments.callee)
});
j.start({width:g.width,"min-height":g.height,"margin-top":f+"px"});
if(d){d.removeEvent("complete",arguments.callee)
}};
if(b.hasChildNodes()){var d=new Fx.Tween(b.firstChild,{duration:e.transitionTime,link:"chain",property:"opacity"});
d.addEvent("complete",a);
d.start("0.0")
}else{a()
}},_changeImageNoTransition:function(b){var a=this._skinParts.itemsContainer;
var f=this;
for(var e=0;
e<a.childNodes.length;
e++){a.childNodes[e].destroy()
}a.empty();
var d=b.getStyles("width","height");
var c=f._getTopGap(d.height.replace("px",""));
a.adopt(b);
f._skinParts.virtualContainer.empty();
f._skinParts.dialogBox.setStyles({width:d.width,"min-height":d.height,"margin-top":c+"px"});
f.unlock()
}}});
W.Experiments.registerExperimentComponent("LazyShare","New",{name:"experiments.viewer.components.MediaZoomDisplayerLazyShare",traits:["mobile.core.components.traits.LinkableComponent"],skinParts:{title:{type:"htmlElement",optional:false},description:{type:"htmlElement",optional:false},link:{type:"htmlElement",optional:true},imageWrapper:{type:"htmlElement",command:"WViewerCommands.MediaZoom.Next"},image:{type:"mobile.core.components.Image",dataRefField:"*",optional:false,hookMethod:"_addImageArgs"},lazyShare:{type:"wysiwyg.viewer.components.LazySocialPanel",optional:false}},Class:{Extends:"wysiwyg.viewer.components.MediaZoomDisplayer",Binds:["_setCorrectImageSize"]}});
W.Experiments.registerNewExperimentComponent("NewComps","New",{name:"wysiwyg.viewer.components.MessageView",imports:[],skinParts:{blockingLayer:{type:"htmlElement"},okButton:{type:"mobile.editor.components.EditorButton"},title:{type:"htmlElement"},description:{type:"htmlElement"},dialog:{type:"htmlElement"}},Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_closeView"],initialize:function(c,a,b){this.parent(c,a,b)
},_onAllSkinPartsReady:function(a){a.okButton.setLabel("OK");
a.okButton.addEvent("buttonClick",this._closeView)
},_editModeChanged:function(b,a){this._closeView()
},showMessage:function(a){this.uncollapse();
this._skinParts.title.set("html",a.msgTitle||"");
this._skinParts.description.set("html",a.msgBody||"");
this._visible=true
},visible:function(){return this._visible
},_closeView:function(){this.collapse();
this._visible=false;
this.fireEvent("complete")
}}});
W.Experiments.registerExperimentComponent("CSW","New",{name:"experiments.wysiwyg.viewer.components.PageGroupCSWNew",skinParts:clone(),propertiesSchemaName:"PageGroupProperties",Class:{Extends:"wysiwyg.viewer.components.PageGroup",render:function(){this.parent();
var a=this.injects().Viewer.getDocWidth();
this.setWidth(a)
}}});
W.Experiments.registerExperimentComponent("GridLines","New",{name:"experiments.wysiwyg.viewer.components.PageGroupGridLinesNew",skinParts:merge({grid:undefined}),propertiesSchemaName:"PageGroupProperties",Class:{Extends:"wysiwyg.viewer.components.PageGroup",_states:[],Binds:["onCurrentPageResize","_resizePage","_onTransitionFinished"],toggleGrid:function(){},refreshGrid:function(){},_setHorizontalGrid:function(){},_setVerticalGrid:function(){},_resizePage:function(a){if(!a){a=this._currentPage.getLogic().getHeight()
}this.setHeight(a);
W.Layout.enforceAnchors([this])
}}});
W.Experiments.registerExperimentComponent("MasterPage","New",{name:"experiments.wysiwyg.viewer.components.PagesContainer",skinParts:{inlineContent:{type:"htmlElement"},screenWidthBackground:{type:"htmlElement"},bg:{type:"htmlElement"},centeredContent:{type:"htmlElement"}},Class:{Extends:"wysiwyg.viewer.components.PagesContainer",initialize:function(c,a,b){this.parent(c,a,b);
this.setMaxH(this.imports.Page.MAX_HEIGHT);
this.setMinH(this.imports.Page.MIN_HEIGHT);
this._resizableSides=[W.BaseComponent.ResizeSides.BOTTOM]
},getSelectableX:function(){return this.parent()
},getSelectableWidth:function(){return this.parent()
}}});
W.Experiments.registerExperimentComponent("WixApps","New",{name:"experiments.wysiwyg.viewer.components.PaginatedGridGalleryWixApps",skinParts:clone(),imports:["wysiwyg.viewer.utils.MatrixTransitions","wysiwyg.viewer.utils.GalleryUtils","mobile.core.utils.LinkUtils"],traits:["wysiwyg.viewer.components.traits.GalleryAutoplay"],propertiesSchemaName:clone(),Class:{Extends:"wysiwyg.viewer.components.PaginatedGridGallery",Binds:["_onRollOverViewCreated"],_rolloverSequencer:null,_fixedRowNumber:false,initialize:function(c,a,b){b=b||{};
this.parent(c,a,b);
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
}},getSequencer:function(){return this._sequencer
},_getRowNumber:function(){if(this._fixedRowNumber===true){return parseInt(this.getComponentProperty("maxRows"))
}else{return this.parent()
}},_translateRefList:function(d){var h;
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
},_onDataChange:function(a,b){this._updateGalleryImageOnClickAction();
this._currentItemIndex=0;
this._pageItemsCount=parseInt(this.getComponentProperty("numCols")*this._getRowNumber());
if(this._componentReady&&a===this._data){this._skinParts.itemsContainer.empty()
}this._checkSkinPartsVisibility();
this.parent(a,b)
},_updateDisplayerInfo:function(a){if(this._skinParts.rolloverHolder&&this._rolloverSequencer){this._rolloverSequencer.createComponents(this._skinParts.rolloverHolder,[a])
}else{if(a&&a.getData&&"title" in a.getData()&&"description" in a.getData()){this._skinParts.title.set("text",a.get("title"));
this._skinParts.description.set("text",a.get("description"))
}}},_onRollOverViewCreated:function(a){this._setupItem(a.compView)
},_onMouseMove:function(b){if(this._transitionPending===true){return
}var c=this._findDisplayerFromPosition(b.page);
if(c&&this._skinParts.rolloverHolder&&this._hasRollOver){if(this._highlightedDisplayer!==c){this._highlightedDisplayer=c;
var a=c.getCoordinates(this._skinParts.rolloverHolder.getParent());
this._skinParts.rolloverHolder.setStyles({visibility:"visible",position:"absolute",padding:0,left:a.left,top:a.top,width:a.width,height:a.height});
this.setState("idle");
window.requestAnimFrame(function(){if(this._highlightedDisplayer){this._updateDisplayerInfo(c.getLogic().getDataItem());
var e=this._getHighlightedDisplayerData();
if(e.getType&&e.getType()==="Image"){var d=this.getSkinPart("link");
this._linkUtils.linkifyElement(this,d,e,true)
}this._skinParts.rolloverHolder.setStyle("cursor",this._isImageClickable()?"pointer":"default");
if(this._galleryImageOnClickAction=="goToLink"){this._skinParts.link.setStyle("display","none")
}else{this._skinParts.link.setStyle("display",(this._isImageLinked())?"block":"none")
}this.setState("rollover")
}}.bind(this))
}}else{this._resetRollOver()
}},_onDisplayerCreation:function(c,e,b){var a=c.getViewNode();
this._setupItem(a);
var d;
if(c.getRef){d=c.getRef()
}else{d="#"+c.getDataItem().get("id")
}a.addClass("galleryDisplayer");
this._displayerDict[d]=c;
if(b>=this._displayedItems.length){a.setStyles({top:-this._itemHeight*1.5,position:"absolute"})
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
var d=this._getTotalPageCount();
if(!d){d=1
}return String(b+1)+"/"+String(d)
}}});
W.Experiments.registerExperimentComponent("Demimranize","New",{name:"experiments.wysiwyg.viewer.components.PasswordLoginDemimranize",skinParts:clone(),Class:{Extends:"wysiwyg.viewer.components.PasswordLogin",initialize:before(function(){this.isVolatile=true
})}});
W.Experiments.registerExperimentComponent("GridLines","New",{name:"experiments.wysiwyg.viewer.components.ScreenWidthContainerGridLines",skinParts:clone(),Class:{Extends:"wysiwyg.viewer.components.ScreenWidthContainer",_onResize:function(){this.parent()
}}});
W.Experiments.registerExperimentComponent("HorizontalScrollFix","New",{name:"experiments.viewer.components.ScreenWidthContainerHorizontalScrollFix",skinParts:clone(),Class:{Extends:"wysiwyg.viewer.components.ScreenWidthContainer",Binds:["_onScreenResize","_stretchBackgroundAndCenterContent"],_stretchBackgroundAndCenterContent:function(){var a=this._view;
var d=$(document).getSize();
var b=a.getSize();
var c=this.injects().Viewer.getDocWidth();
var e=-Math.round((d.x-c)/2);
if(e>0){e=0
}this._skinParts.screenWidthBackground.setStyles({position:"absolute",width:d.x+"px",height:b.y+"px",left:e})
}}});
W.Experiments.registerNewExperimentComponent("NewComps","New",{name:"wysiwyg.viewer.components.SelectableSliderGallery",skinParts:{imageItem:{type:"wysiwyg.viewer.components.Displayer",repeater:true,container:"itemsContainer",dataRefField:"items"},itemsContainer:{type:"htmlElement"},swipeLeftHitArea:{type:"htmlElement"},swipeRightHitArea:{type:"htmlElement"}},Class:{Extends:"wysiwyg.viewer.components.SliderGallery",_selectedItem:null,initialize:function(c,a,b){this._expandEnabled=false;
this._initialSelectedIndex=0;
if(b.selectedIndex){this._initialSelectedIndex=b.selectedIndex
}this.parent(c,a,b)
},_setupDisplayer:function(a,b){this.parent(a);
if(b===this._initialSelectedIndex){this.setSelectedState(a)
}a.addEvent("itemSelected",function(){this.setSelectedState(a);
this.fireEvent("imageSelected",a.getDataItem())
}.bind(this))
},setSelectedState:function(a){if(this._selectedItem){if(this._selectedItem===a){return
}this._selectedItem.setSelected(false)
}this._selectedItem=a;
this._selectedItem.setSelected(true)
}}});
W.Experiments.registerExperimentComponent("NewComps","New",{name:"experiments.wysiwyg.viewer.components.SiteButtonNewComps",skinParts:clone(),propertiesSchemaName:"ButtonProperties",Class:{Extends:"wysiwyg.viewer.components.SiteButton",_onMouseDown:function(a){if(this.isEnabled()&&this.getState()!="selected"){this.setState("pressed");
this.fireEvent(Constants.CoreEvents.MOUSE_DOWN,a)
}else{if(!this.isEnabled()){return this._cancelEvent(a)
}}},_onClick:function(b){if(this.isEnabled()){b.target=this.getViewNode();
this.fireEvent(Constants.CoreEvents.CLICK,b);
if(this._toggleMode){var a=(this.getState()!="selected")?"selected":"over";
this.setState(a)
}}else{return this._cancelEvent(b)
}},_cancelEvent:function(a){a.stopPropagation();
a.preventDefault();
return false
},_onDisabled:function(){var a=this._skinParts.view;
a.removeEvent(Constants.CoreEvents.MOUSE_OVER,this._onOver);
a.removeEvent(Constants.CoreEvents.MOUSE_OUT,this._onOut);
a.removeEvent(Constants.CoreEvents.MOUSE_UP,this._onMouseUp)
}}});
W.Experiments.registerExperimentComponent("fixSlideshowAutoplay2807","New",{name:"experiments.wysiwyg.viewer.components.SlideShowGalleryfixSlideshowAutoplay2807",skinParts:clone(),propertiesSchemaName:"SlideShowGalleryProperties",Class:{Extends:"wysiwyg.viewer.components.SlideShowGallery",onPageVisibilityChange:function(a){if(a){W.Utils.callLater(this._updateAutoplayState,[],this,1000)
}else{if(this._timeoutID!=null){clearTimeout(this._timeoutID);
this._timeoutID=null
}}}}});
W.Experiments.registerExperimentComponent("SliderAutoPlay","New",{name:"experiments.viewer.components.SliderGallerySliderAutoPlay",skinParts:{imageItem:{type:"wysiwyg.viewer.components.Displayer",repeater:true,container:"itemsContainer",dataRefField:"items"},itemsContainer:{type:"htmlElement"},swipeLeftHitArea:{type:"htmlElement"},swipeRightHitArea:{type:"htmlElement"}},propertiesSchemaName:"SliderGalleryProperties",traits:["mobile.core.components.traits.SwipeSupport","wysiwyg.viewer.components.traits.GalleryAutoplay"],Class:{EDITOR_META_DATA:{general:{settings:true,design:true},custom:[{label:"GALLERY_ORGANIZE_PHOTOS",command:"WEditorCommands.OpenListEditDialog",commandParameter:{galleryConfigID:"SliderGallery"},commandParameterDataRef:"SELF"}]},Extends:"wysiwyg.viewer.components.SliderGallery",Binds:["gotoNext","gotoPrev","_updateMovementNoLoop","_updateMovementInLoop","_stopMovement"],_states:{autoplay:["on","off"]},_itemHolder:null,_itemWidth:0,_itemHeight:0,_gap:20,_movementSpeed:0,_shiftOffset:0,_shiftOffsetMax:0,_shiftOffsetMin:0,_maxSpeed:0.05,_aspectRatio:0,_movementActive:false,_debugMode:false,_imageMode:"",_lastUpdate:NaN,_updateMovementFunc:null,_loop:false,_itemsHolderSize:0,_contentOverflow:false,_segment:0,_isZoomed:false,initialize:function(c,a,b){this.parent(c,a,b);
this.addEvent("resizeEnd",this._onResizeEnd);
this.injects().Commands.registerCommandListenerByName("WPreviewCommands.WEditModeChanged",this,this._onChangeMode,null)
},_onChangeMode:function(a){if(a!=="PREVIEW"){this._stopMovement()
}},_onResizeEnd:function(){this._recalcItemSize();
this._allRepeatersReady=false;
this._renderIfReady()
},_recalcItemSize:function(){if(this._skinParts){this._itemHeight=Math.floor(this._skinParts.itemsContainer.getHeight());
this._itemWidth=Math.floor(this._itemHeight*this._aspectRatio)
}},_processDataRefs:function(a){if(this._loop===true){return a.concat(a)
}else{return a
}},_onDataChange:function(a){this._enableMovement(false);
this._aspectRatio=this._parseAspectRatioPreset(this.getComponentProperty("aspectRatioPreset"));
if(this._aspectRatio){this.setComponentProperty("aspectRatio",this._aspectRatio,true)
}else{this._aspectRatio=parseFloat(this.getComponentProperty("aspectRatio"))
}this._loop=this.getComponentProperty("loop")===true;
this._maxSpeed=parseInt(this.getComponentProperty("maxSpeed"));
this._imageMode=String(this.getComponentProperty("imageMode"));
this._gap=parseInt(this.getComponentProperty("margin"));
this.parent()
},_parseAspectRatioPreset:function(c){var a=c.split(":");
var b=0;
if(a.length==2){b=parseFloat(a[0])/parseFloat(a[1])
}return b
},_onAllSkinPartsReady:function(){this._itemHolder=this._skinParts.itemsContainer;
this._itemHolder.setStyles({position:"absolute",left:"0px",right:"0px",top:"0px",bottom:"0px","white-space":"nowrap","-webkit-transform":"translateZ(0)"});
this._skinParts.itemsContainer.setStyles({overflow:(this._debugMode)?"visible":"hidden",border:(this._debugMode)?"1px solid black":"0"});
this.injects().Commands.registerCommandListenerByName("WViewerCommands.SetMediaZoomImage",this,this._onMediaZoomClicked,null);
this.injects().Commands.registerCommandListenerByName("WViewerCommands.MediaZoom.Close",this,this._onMediaZoomClosed,null);
this._skinParts.itemsContainer.addEvent(Constants.CoreEvents.MOUSE_OVER,function(){this._stopMovement(1)
}.bind(this));
if(this.getComponentProperties().getData().autoplay){this._hideSwipeArea()
}else{this._showSwipeArea()
}this.injects().ComponentData.addEvent(Constants.DataEvents.DATA_CHANGED,function(a){a.getData().autoplay?this._hideSwipeArea():this._showSwipeArea()
}.bind(this));
this.injects().ComponentData.addEvent(Constants.DataEvents.DATA_CHANGED,function(){this._bindAutoPlayControls()
}.bind(this))
},_showSwipeArea:function(){this._skinParts.swipeLeftHitArea.uncollapse();
this._skinParts.swipeRightHitArea.uncollapse();
this._bindSwipeAreas();
this._unbindAutoPlayControls()
},_hideSwipeArea:function(){this._skinParts.swipeLeftHitArea.collapse();
this._skinParts.swipeRightHitArea.collapse();
this._unbindSwipeAreas();
this._bindAutoPlayControls()
},_bindSwipeAreas:function(){this.setState("off","autoplay");
this._skinParts.swipeLeftHitArea.addEvent(Constants.CoreEvents.MOUSE_MOVE,this.gotoPrev);
this._skinParts.swipeRightHitArea.addEvent(Constants.CoreEvents.MOUSE_MOVE,this.gotoNext);
this._skinParts.swipeLeftHitArea.addEvent(Constants.CoreEvents.MOUSE_OUT,this._stopMovement);
this._skinParts.swipeRightHitArea.addEvent(Constants.CoreEvents.MOUSE_OUT,this._stopMovement)
},_unbindSwipeAreas:function(){this.setState("on","autoplay");
this._skinParts.swipeLeftHitArea.removeEvent(Constants.CoreEvents.MOUSE_MOVE,this.gotoPrev);
this._skinParts.swipeRightHitArea.removeEvent(Constants.CoreEvents.MOUSE_MOVE,this.gotoNext);
this._skinParts.swipeLeftHitArea.removeEvent(Constants.CoreEvents.MOUSE_OUT,this._stopMovement);
this._skinParts.swipeRightHitArea.removeEvent(Constants.CoreEvents.MOUSE_OUT,this._stopMovement)
},_bindAutoPlayControls:function(){if(this.getComponentProperties().getData().autoPlayDirection=="LTR"){this._skinParts.itemsContainer.removeEvent(Constants.CoreEvents.MOUSE_OUT,this.gotoNext);
this._skinParts.itemsContainer.addEvent(Constants.CoreEvents.MOUSE_OUT,this.gotoPrev)
}else{this._skinParts.itemsContainer.removeEvent(Constants.CoreEvents.MOUSE_OUT,this.gotoPrev);
this._skinParts.itemsContainer.addEvent(Constants.CoreEvents.MOUSE_OUT,this.gotoNext)
}},_unbindAutoPlayControls:function(){this._view.removeEvent(Constants.CoreEvents.MOUSE_OUT,this.gotoNext);
this._view.removeEvent(Constants.CoreEvents.MOUSE_OUT,this.gotoPrev);
this._view.addEvent(Constants.CoreEvents.MOUSE_OUT,this._stopMovement)
},_onMediaZoomClicked:function(){this._isZoomed=true;
this._stopMovement(0)
},_onMediaZoomClosed:function(){this._isZoomed=false;
this._enableMovement(true);
if(this.getComponentProperties().getData().autoplay){if(this.getComponentProperties().getData().autoPlayDirection=="LTR"){this.gotoPrev()
}else{this.gotoNext()
}return
}if(this._skinParts.zoom){this._skinParts.zoom.fireEvent("mosuseout")
}},getAcceptableDataTypes:function(){return["ImageList"]
},render:function(){var a;
this._recalcItemSize();
this._updateMovementFunc=(this._loop===true)?this._updateMovementInLoop:this._updateMovementNoLoop;
if(this._loop===false){this._segment=0
}this._shiftOffset=0;
this._itemsHolderSize=0;
for(a=0;
a<this._itemHolder.children.length;
a++){this._setupDisplayer(this._itemHolder.children[a].getLogic());
this._itemsHolderSize+=this._itemHolder.children[a].getLogic().getWidth()+this._gap
}this._checkItemsVisibility();
this._applyShiftOffset()
},_checkItemsVisibility:function(){var b=this._itemHolder.children.length/2;
var a=(this._loop===true?this._itemsHolderSize/2:this._itemsHolderSize);
this._contentOverflow=(a>this._skinParts.itemsContainer.getWidth());
if(this._loop===true&&this._contentOverflow===false){this._segment=0
}for(i=0;
i<this._itemHolder.children.length;
i++){if(this._loop===true&&this._contentOverflow===false&&i>=b){this._itemHolder.children[i].setStyle("opacity","0.0")
}else{this._itemHolder.children[i].setStyle("opacity","1.0")
}}},_setupDisplayer:function(a){a.invalidateSize();
a.setSize(this._itemWidth,this._itemHeight,this._imageMode);
a.setOwner(this);
a.getViewNode().setStyles({position:"static",display:"inline-block","vertical-align":"top","margin-right":String(this._gap)+"px","margin-left":"0px",opacity:"1.0"})
},_moveToRight:function(){if(this._contentOverflow){this._setMovementSpeed(this._maxSpeed);
this._enableMovement(true)
}},_moveToLeft:function(){if(this._contentOverflow){this._setMovementSpeed(-this._maxSpeed);
this._enableMovement(true)
}},gotoNext:function(){if(this._isZoomed){return
}if(this._contentOverflow){this._setMovementSpeed(this._maxSpeed);
this._enableMovement(true)
}},gotoPrev:function(){if(this._isZoomed){return
}if(this._contentOverflow){this._setMovementSpeed(-this._maxSpeed);
this._enableMovement(true)
}},_enableMovement:function(a){if(a===true&&this._movementActive===false){window.requestAnimFrame(this._updateMovementFunc)
}if(a===true){if(!this._movementActive){this._shiftOffsetMin=-(this._itemsHolderSize-this._skinParts.itemsContainer.getWidth()-this._gap);
this._movementActive=true
}}else{this._movementActive=false;
this._movementSpeed=0
}},_stopMovement:function(a){var b=this.injects().Utils.Tween;
b.to(this,a===undefined?1:a,{_movementSpeed:0,onComplete:function(){this.getState("autoplay")==="off"?this._enableMovement(false):this._enableMovement(true)
}.bind(this)})
},_setMovementSpeed:function(a){var b=this.injects().Utils.Tween;
b.to(this,1,{_movementSpeed:a})
},_calcMovementCoeficient:function(){var b=1;
var a=new Date().getTime();
if(!isNaN(this._lastUpdate)){b=((a-this._lastUpdate)/16)
}this._lastUpdate=a;
return 1
},_updateMovementNoLoop:function(){var a=this._calcMovementCoeficient();
if(this._movementActive){this._shiftOffset+=-this._movementSpeed*a;
if(this._shiftOffset>this._shiftOffsetMax){this._shiftOffset=this._shiftOffsetMax;
this._enableMovement(false)
}if(this._shiftOffset<this._shiftOffsetMin){this._shiftOffset=this._shiftOffsetMin;
this._enableMovement(false)
}this._applyShiftOffset()
}if(this._movementActive){window.requestAnimFrame(this._updateMovementFunc)
}},_updateMovementInLoop:function(){var a=this._calcMovementCoeficient();
if(this._movementActive){this._shiftOffset+=-this._movementSpeed*a;
if(this._movementSpeed<0){this._segment=0;
if(this._shiftOffset>(this._shiftOffsetMax)){this._shiftOffset-=this._itemsHolderSize/2
}}if(this._movementSpeed>0){this._segment=1;
if(this._shiftOffset<0){this._shiftOffset+=this._itemsHolderSize/2
}}this._applyShiftOffset()
}if(this._movementActive){window.requestAnimFrame(this._updateMovementFunc)
}},_applyShiftOffset:function(){var a=this._shiftOffset-(this._segment*this._itemsHolderSize/2);
if(this._itemHolder.children.length>0){this._itemHolder.children[0].setStyle("margin-left",String(Math.floor(a))+"px")
}}}});
W.Experiments.registerExperimentComponent("NewComps","New",{name:"experiments.wysiwyg.viewer.components.SliderGalleryNewComps",skinParts:clone(),propertiesSchemaName:"SliderGalleryProperties",Class:{Extends:"wysiwyg.viewer.components.SliderGallery",render:function(){var a;
this._recalcItemSize();
this._updateMovementFunc=(this._loop===true)?this._updateMovementInLoop:this._updateMovementNoLoop;
if(this._loop===false){this._segment=0
}this._shiftOffset=0;
this._itemsHolderSize=0;
for(a=0;
a<this._itemHolder.children.length;
a++){this._setupDisplayer(this._itemHolder.children[a].getLogic(),a);
this._itemsHolderSize+=this._itemHolder.children[a].getLogic().getWidth()+this._gap
}this._checkItemsVisibility();
this._applyShiftOffset()
},_setupDisplayer:function(a,b){a.invalidateSize();
a.setSize(this._itemWidth,this._itemHeight,this._imageMode);
a.setOwner(this);
a.getViewNode().setStyles({position:"static",display:"inline-block","vertical-align":"top","margin-right":String(this._gap)+"px","margin-left":"0px",opacity:"1.0"})
}}});
W.Experiments.registerNewExperimentComponent("NewComps","New",{name:"wysiwyg.viewer.components.TableComponent",skinParts:{tableBody:{type:"htmlElement"},tableHeader:{type:"htmlElement",optional:true},tableFooter:{type:"htmlElement",optional:true},table:{type:"htmlElement",optional:true}},imports:["wysiwyg.viewer.components.ComponentSequencer"],propertiesSchemaName:"TableComponentProperties",Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_createBodyRow","_createHeaderCell","_createFooterCell","_createBodyCell","_addSpacerRow"],initialize:function(c,a,b){this.parent(c,a,b);
this._rowsSequencer=new this.imports.ComponentSequencer();
this._rowsSequencer.resolveItem=this._createBodyRow;
this._rowsSequencer.addEvent("productionFinished",this._addSpacerRow);
this._bodyCellSequencingHook=b.SequencingHook;
this._headerFooterCellSequencingHook=b.HeaderFooterSequencingHook||b.SequencingHook
},_onAllSkinPartsReady:function(a){this.parent(a);
var b=this.getComponentProperty("minHeight");
if(b){this.setMinH(b)
}if(this.getDataItem()){this._populateTable()
}},_onComponentPropertyChange:function(b,a){if(b==="minHeight"){this.setMinH(a)
}},setMinH:function(a){if(this._skinParts){this._skinParts.table.setStyle("height",a+"px")
}this.parent(a);
this.setHeight(a)
},_onDataChange:function(a,c,b){if(this._skinParts){if(c=="minHeight"){this.setMinH(b.minHeight||b)
}else{this._populateTable();
this.fireEvent("autoSized",{ignoreLayout:false})
}}this.parent(a,c,b)
},_populateTable:function(){var a=this.getDataItem();
this._rowsSequencer.createComponents(this._skinParts.tableBody,a.get("items"));
if(a.hasField("header")){var c=this._createRow(a.get("header"),this._createHeaderCell);
this._skinParts.tableHeader.empty().adopt(c)
}else{this._skinParts.tableHeader.removeFromDOM()
}if(a.hasField("footer")){var b=this._createRow(a.get("footer"),this._createFooterCell);
this._skinParts.tableFooter.empty().adopt(b)
}else{this._skinParts.tableFooter.removeFromDOM()
}},_createBodyRow:function(a){return this._createRow(a,this._createBodyCell)
},_createRow:function(d,a){var c=new Element("tr");
var b=new this.imports.ComponentSequencer();
b.resolveItem=a;
b.createComponents(c,d);
return c
},_createHeaderCell:function(a,b,c){return this._createCell(a,b,c,"th",this._headerFooterCellSequencingHook)
},_createFooterCell:function(a,b,c){return this._createCell(a,b,c,"td",this._headerFooterCellSequencingHook)
},_createBodyCell:function(a,b,c){return this._createCell(a,b,c,"td",this._bodyCellSequencingHook)
},_createCell:function(d,e,g,a,c){var b=new Element(a);
var h=c(d,e,g);
if(h){b.grab(h)
}var f=d.styleData;
if(f){for(var j in f){b.setStyle(j,f[j])
}}return b
},_addSpacerRow:function(){var a=new Element("tr",{"class":"spacer"});
var b=new Element("td",{colspan:"100%"});
a.adopt(b);
this._skinParts.tableBody.adopt(a);
this.fireEvent("autoSized",{ignoreLayout:false})
},getAcceptableDataTypes:function(){return["list","Table"]
}}});
W.Experiments.registerNewExperimentComponent("NewComps","New",{name:"wysiwyg.viewer.components.inputs.ColorOption",skinParts:{tooltip:{type:"wysiwyg.viewer.components.InfoTip"}},Class:{Extends:"wysiwyg.viewer.components.inputs.TextOption",_onAllSkinPartsReady:function(){this.getViewNode().setStyle("background-color",this.getDataItem().get("text"));
this._initializeTooTip(this.getViewNode())
}}});
W.Experiments.registerNewExperimentComponent("NewComps","New",function(){return{name:"wysiwyg.viewer.components.inputs.NumberInput",propertiesSchemaName:"NumberInputProperties",Class:{Extends:"wysiwyg.viewer.components.inputs.TextInput",_origValue:null,_prevValue:null,_valueChanged:true,_onAllSkinPartsReady:function(){this.parent();
this._origValue=this._getValue();
this._prevValue=this._origValue;
this._skinParts.input.setAttribute("min",this.getComponentProperty("minValue"));
this._skinParts.input.setAttribute("max",this.getComponentProperty("maxValue"))
},_changeEventHandler:function(d){if(d.code&&!W.Utils.isInputKey(d.code)){return
}var c=this._getValue();
var a=this._getValidValue();
if(c&&c!=a&&this._valueChanged){this._valueChanged=false;
this.fireEvent("validationFailed",{evt:d,value:c,validValue:a})
}if(a!=this._prevValue){this._prevValue=a;
a=this.injects().Utils.convertToHtmlText(a);
var b={value:a,origEvent:d,compLogic:this};
this.fireEvent("inputChanged",b)
}},_fireBlur:function(a){this._setValidValue();
this.parent(a)
},_fireKeyUp:function(a){if(a.code=="13"){this._setValidValue()
}this.parent(a)
},_getValidValue:function(){var a=this._getValue();
if(!a){a=this._origValue
}else{if(a<this.getComponentProperty("minValue")){a=this.getComponentProperty("minValue")
}else{if(a>this.getComponentProperty("maxValue")){a=this.getComponentProperty("maxValue")
}}}return a
},_setValidValue:function(){var a=this._skinParts.input;
a.set("value",this._getValidValue());
this._valueChanged=true
}}}
});
W.Experiments.registerNewExperimentComponent("NewComps","New",{name:"wysiwyg.viewer.components.inputs.OptionsListInput",skinParts:{},traits:["wysiwyg.viewer.components.traits.ValidationSettings"],imports:["wysiwyg.viewer.components.ComponentSequencer"],Class:{Extends:"mobile.core.components.base.BaseComponent",Binds:["_onItemSelected"],_states:{validity:["valid","invalid"]},_selectedItem:null,initialize:function(c,a,b){this.parent(c,a,b);
this._sequencer=new this.imports.ComponentSequencer();
if(b){this._sequencer.resolveItem=function(){return{comp:b.compType,skin:b.compSkin}
}
}},_onAllSkinPartsReady:function(){},_preventRenderOnDataChange:function(a,c,b){return c=="selected"
},_prepareForRender:function(){this._sequencer.addEvent("productionFinished",function(a){this._onSequencerFinished(a)
}.bind(this));
this._sequencer.createComponents(this.getViewNode(),this.getDataItem().get("items"));
return true
},_onSequencerFinished:function(b){var a=b.elements;
a.forEach(function(d){var c=d.getLogic();
c.addEvent("itemSelected",this._onItemSelected);
if(c.getDataItem()===this.getDataItem().get("selected")){this._selectedItem=c;
this._selectedItem.setSelected(true)
}}.bind(this))
},_onItemSelected:function(a){if(this._selectedItem){if(this._selectedItem===a){return
}this._selectedItem.setSelected(false)
}this._selectedItem=a;
this._selectedItem.setSelected(true);
var b=this._selectedItem.getDataItem();
this.setValidationState(true);
this.getDataItem().set("selected",b);
this.fireEvent("selectionChanged",b)
},setValidationState:function(a){this.setState(a?"valid":"invalid","validity");
this.parent(a)
},getAcceptableDataTypes:function(){return["SelectableList"]
}}});
W.Experiments.registerNewExperimentComponent("NewComps","New",{name:"wysiwyg.viewer.components.inputs.TextAreaInput",skinParts:{textarea:{type:"htmlElement"},errorMessage:{type:"htmlElement",optional:true}},traits:["wysiwyg.viewer.components.traits.ValidationSettings"],Class:{Extends:"wysiwyg.viewer.components.inputs.TextInput",Binds:["_checkMaxLength"],initialize:function(c,a,b){this.parent(c,a,b);
b=b||{};
this._maxLength=b.maxLength||""
},_onAllSkinPartsReady:function(){var a=this._skinParts.textarea;
a.set("value",this.getDataItem().get("text"));
this.addEvent("inputChanged",function(b){this.getDataItem().set("text",b.value)
}.bind(this));
if(this._maxLength){a.setProperty("maxlength",this._maxLength);
if(Browser.ie){a.addEvent(Constants.CoreEvents.KEY_UP,this._checkMaxLength)
}}this._listenToInput()
},_checkMaxLength:function(d){var a=this._skinParts.textarea.get("value");
var b=a.length;
if(a.length>this._maxLength){var c=this._maxLength-b;
a=a.slice(0,c);
this._skinParts.textarea.set("value",a)
}},_changeEventHandler:function(a){if(a.code==13){return false
}this.parent(a)
},_listenToInput:function(){this._skinParts.textarea.addEvent(Constants.CoreEvents.KEY_UP,this._changeEventHandler);
this._skinParts.textarea.addEvent(Constants.CoreEvents.KEY_UP,this._fireKeyUp);
this._skinParts.textarea.addEvent(Constants.CoreEvents.CUT,this._changeEventHandler);
this._skinParts.textarea.addEvent(Constants.CoreEvents.PASTE,this._changeEventHandler);
this._skinParts.textarea.addEvent(Constants.CoreEvents.CHANGE,this._changeEventHandler);
this._skinParts.textarea.addEvent(Constants.CoreEvents.BLUR,this._fireBlur)
},_stopListeningToInput:function(){this._skinParts.textarea.removeEvent(Constants.CoreEvents.KEY_UP,this._changeEventHandler);
this._skinParts.textarea.removeEvent(Constants.CoreEvents.KEY_UP,this._fireKeyUp);
this._skinParts.textarea.removeEvent(Constants.CoreEvents.CUT,this._changeEventHandler);
this._skinParts.textarea.removeEvent(Constants.CoreEvents.PASTE,this._changeEventHandler);
this._skinParts.textarea.removeEvent(Constants.CoreEvents.CHANGE,this._changeEventHandler);
this._skinParts.textarea.removeEvent(Constants.CoreEvents.BLUR,this._fireBlur)
},_getValue:function(){var a=this._skinParts.textarea;
return a.get("value")
}}});
W.Experiments.registerNewExperimentComponent("NewComps","New",{name:"wysiwyg.viewer.components.inputs.TextOption",skinParts:{size:{type:"htmlElement"},tooltip:{type:"wysiwyg.viewer.components.InfoTip"}},traits:["wysiwyg.viewer.components.traits.SelectableOption"],Class:{Extends:"mobile.core.components.base.BaseComponent",_states:{selectState:["selected","unselected"],enabledState:["enabled","disabled"]},initialize:function(c,a,b){this.parent(c,a,b);
this.setSelected(false)
},_onAllSkinPartsReady:function(){var a=this._skinParts.size;
a.set("text",this.getDataItem().get("text"));
this._initializeTooTip(this.getViewNode())
},_initializeTooTip:function(a){var c=this._skinParts.tooltip;
var b=this.getDataItem().get("description");
if(b&&b.trim().length>0){a.addEvent("mouseenter",function(){c._showToolTipCmd({id:1,content:b},{source:a})
});
a.addEvent("mouseleave",function(){c._closeToolTipCmd()
})
}},_onDataChange:function(a,c,b){this.setEnabled(this.getDataItem().get("enabled"))
},setSelected:function(a){this.setState(a?"selected":"unselected","selectState")
},setEnabled:function(a){this.setState(a?"enabled":"disabled","enabledState")
},getAcceptableDataTypes:function(){return["SelectOption"]
}}});
W.Experiments.registerNewExperimentTrait("NewComps","New",{name:"wysiwyg.viewer.components.traits.SelectableOption",trait:{Static:{ITEM_SELECTED_EVENT:"itemSelected"},_isSelected:false,initialize:function(c,a,b){this.parent(c,a,b);
this.getViewNode().addEvent("click",function(){this.fireEvent(this.ITEM_SELECTED_EVENT,this)
}.bind(this))
},setSelected:function(a){this._isSelected=a
}}});
W.Experiments.registerNewExperimentDataTypeSchema("AudioPlayer","New","AudioPlayer",{uri:{type:"string","default":""},autoPlay:{type:"Boolean","default":false},loop:{type:"Boolean","default":false},visible:{type:"Boolean","default":true},volume:{type:"number","default":100},title:{type:"string","default":""},description:{type:"string","default":""},icon_uri:{type:"string","default":""},originalFileName:{type:"string","default":""}});
W.Experiments.registerNewExperimentSchemaProps("Aviary","New","Image",{originalImageDataRef:{type:"ref",description:"Original Image before edit","default":null}});
W.Experiments.registerNewExperimentDataTypeSchema("NewComps","New","SelectOption",{value:"string",text:"string",enabled:{type:"boolean","default":"true"},description:"string"});
W.Experiments.registerNewExperimentCompSchemaProps("SliderAutoPlay","New","SliderGalleryProperties",{autoplayInterval:{type:"number","default":"0",minimum:0,maximum:30,description:"Autoplay interval"},autoplay:{type:"boolean","default":false,description:""},showAutoplay:{type:"boolean","default":true,description:""},transDuration:{type:"number",minimum:0,maximum:5,"default":0,description:"Duration of the transition in seconds"},autoPlayDirection:{type:"string","default":"LTR"}});
W.Experiments.registerNewExperimentDataTypeSchema("NewComps","New","Table",{items:"refList",header:"refList",footer:"refList"});
W.Experiments.registerExperimentManager("PageManager","New",{name:"experiments.wysiwyg.viewer.managers.LayoutManagerPageManager",Class:{Extends:"wysiwyg.viewer.managers.LayoutManager",appendSavedAnchor:function(a){if(this._savedAnchors){Object.append(this._savedAnchors,a)
}else{this.setSavedAnchor(a)
}}}});
W.Experiments.registerExperimentManager("URM2","New",{name:"experiments.wysiwyg.viewer.managers.LayoutManagerURM2",Class:{Extends:"wysiwyg.viewer.managers.LayoutManager",enforceAnchors:function(b,f,k,d){if(b.length===0||b[0].getViewNode().getParent()===null){return
}this._validateCommonParent(b);
var h=b[0].getParentComponent();
var d=d||this._getSiblingsYSortedArray(b[0]);
if(d.length==0||!this._validateComponentsRendered(d)){for(e=0;
e<b.length;
e++){delete b[e].$layoutDirtyFlag
}return
}for(var e=0;
e<b.length;
e++){if(!f){b[e].$layoutDirtyFlag=this.FLAG_DIRTY_BOTTOM
}else{b[e].$layoutDirtyFlag=this.FLAG_DIRTY_TOP
}}var l=[];
for(e=0;
e<d.length;
e++){if(!l[e]){l[e]=0
}l[e]++;
if(l[e]>20){W.Utils.debugTrace("Layout Manager","enforceAnchors","infinite loop");
this._enforceParentIfNeeded(h);
return
}d[e].$tempIndex=e;
if(d[e].$layoutDirtyFlag){var a=Number.MAX_VALUE;
var g=d[e];
for(var c=0;
c<g.getAnchors().length;
c++){a=Math.min(this._enforceSingleAnchor(g.getAnchors()[c],k),a)
}if(g.getHorizontalGroup()){a=Math.min(this._enforceHGroup(g),a)
}delete g.$layoutDirtyFlag;
if(a<e){e=a-1
}}}for(e=0;
e<d.length;
e++){delete d[e].$tempIndex;
delete d[e].$layoutDirtyFlag
}this._enforceParentIfNeeded(h)
},_updateAnchors:function(q,d,p){this._validateCommonParent(d,q);
var f=this._getSiblingsYSortedArray(q);
var n=[];
var b=[];
var o,j,h,l=f.length,g=null;
for(h=0;
h<f.length;
h++){n[h]={};
this._clearReverseAnchorsByScope(f[h].getReverseAnchors(),false);
if(f[h].getHorizontalGroup()){f[h].getHorizontalGroup().$hGroupDirty=true
}}var m=q.getParentComponent();
if(m){this._clearReverseAnchorsByScope(m.getReverseAnchors(),true)
}for(o=l-1;
o>=0;
o--){var k=f[o];
this._updateOrClearHGroup(k.getHorizontalGroup());
b[o]=k.getAnchors();
var c=[];
var e=false;
if(k.isAnchorable().from.allow){for(j=o+1;
j<l;
j++){var a=f[j];
if(!a.isAnchorable()||!a.isAnchorable().to.allow){continue
}g=null;
if(!n[o][j]&&this._isHorizontalOverlap(k,a)){if(d.indexOf(k)===-1&&d.indexOf(a)===-1){g=this._findAnchorToComp(b[o],a)
}g=g||this._createToTopAnchor(k,a);
n[o][j]=true;
if(g.type==g.ANCHOR_BOTTOM_TOP){e=true;
this._mergeSets(n[o],n[j])
}if(g.type==g.ANCHOR_TOP_TOP&&k.isAnchorable().to.allow&&k.isAnchorable().to.allowBottomBottom!==false){this._checkAndAddBottomAnchor(a,k)
}c.push(g)
}}if(!e){if(m&&m.isAnchorable().to.allow){g=null;
if(d.indexOf(k)===-1&&!p){g=this._findAnchorToComp(b[o],m)
}if(!g){g=this._createToParentAnchor(k,m)
}c.push(g)
}}}this._setComponentAnchors(k,c)
}},_reportElementsSize:function(c){var b=null;
for(var a=0;
a<c.length;
a++){this._notifyPositionChanged(c[a],"updateSize")
}},reportMove:function(d){if(!d||d.length===0){throw new Error("Invalid changed elements")
}for(var b=0;
b<d.length;
b++){this._notifyPositionChanged(d[b],"updatePosition")
}this._updateAnchors(d[0],d,false);
var a=this._getAndClearChangedByHGroup();
for(b=0;
b<a.length;
b++){this._updateAnchors(a[0],[a[0]],false)
}var c={type:"componentMove",data:{changedElements:d}};
this.fireEvent(c.type,c)
},_notifyPositionChanged:function(m,g){var h=m.getLastCoordinates();
var l=m.getCurrentCoordinates();
var d=m.getLastDimensions();
var k=m.getCurrentDimensions();
var j={data:{type:"wysiwyg.editor.managers.undoredomanager.PositionChange",changedComponentIds:[m.getComponentId()],compId:m.getComponentId(),oldCoordinates:h,newCoordinates:l,oldDimensions:d,newDimensions:k}};
this.fireEvent(g,j);
var f=[m.getComponentId()];
var c=f.map(function(n){return this.injects().Utils.getComponentLogicFromDom(n)
}.bind(this));
var e=this._getSiblingsYSortedArray(c[0]);
var b=e.map(function(n){return n.getComponentId()
}.bind(this));
var a={data:{type:"wysiwyg.editor.managers.undoredomanager.PositionChange2",changedComponentIds:f,compId:m.getComponentId(),ySortedElementIds:b,oldCoordinates:h,newCoordinates:l,oldDimensions:d,newDimensions:k}};
this.fireEvent(g+"2",a)
},reportReparent:function(b,g,h,e){if(!b||b.length===0){throw new Error("Invalid changed elements")
}this._updateChildAnchors(g);
this._updateAnchors(b[0],b,false);
var f=b[0].getParentComponent();
var c=f.getChildComponents().map(function(k){return k.getLogic()
});
var d=b.map(function(k){return k.getComponentId()
});
var j=e?"showOnAllPagesChange":"scopeChangeWithinPage";
var a={type:"reparentComponent",data:{type:"wysiwyg.editor.managers.undoredomanager.ScopeChange",subType:j,changedComponentIds:d,oldState:{parentId:g._compId,children:h},newState:{parentId:f._compId,children:c}}};
this.fireEvent(a.type,a);
this.fireEvent("resetHistoryStack")
},_setComponentAnchors:function(b,a){var c=b.getAnchors();
b.setAnchors(a);
this._notifyComponentAnchorsChanged(b,a,c)
},_notifyComponentAnchorsChanged:function(b,a,c){this.fireEvent("updateAnchors",{data:{compId:b.getComponentId(),changedComponentIds:[b.getComponentId()],oldAnchors:c,newAnchors:a,sender:"layoutmanager"}})
},_checkAndAddBottomAnchor:function(c,a){var h=a.getY();
var b=c.getY();
var d=a.getPhysicalHeight();
var g=c.getPhysicalHeight();
if(b+g<h+d){var f=new this._AnchorClass();
f.type=f.ANCHOR_BOTTOM_BOTTOM;
f.fromComp=c;
f.toComp=a;
this._setAnchorableDistance(f,h+d-b-g);
f.locked=f.distance<=this.LOCK_THRESHOLD;
f.topToTop=b-h;
f.originalValue=d;
var e=[];
e=e.concat(c.getAnchors());
c.addAnchor(f);
this._notifyComponentAnchorsChanged(c,c.getAnchors(),e)
}},reportDeleteComponent:function(a){this._updateChildAnchors(a);
this.fireEvent("resetHistoryStack")
}}});
W.Experiments.registerExperimentManager("JITPageLoader","New",{name:"experiments.wysiwyg.viewer.managers.PageManagerJITPageLoaderNew",Class:{Extends:"experiments.wysiwyg.viewer.managers.PageManager",initialize:after(function(){this._loadedPages=[];
this._loadingPages=[];
this._callBacksForPageCreation={}
}),getPageData:function(a,b){if(!a||!a.urls){throw"page ["+page_id+"] is not listed in the pages list or it does not have url"
}if(typeof b!=="function"){throw"callback ["+b+"] supplied is not a function"
}this._requestPageJson(a.urls,b,a)
},_requestPageJson:function(b,c,a){this._restClient.get(b[0],undefined,{onSuccess:c,onError:this._getErrorCallbackForUrl(b,c,a)})
},_getErrorCallbackForUrl:function(d,a,b){if(d.length==1){return function(){if(b){this._loadingPages.remove(b.pageId)
}LOG.reportError(wixErrors.ALL_PAGE_RETRIEVAL_ATTEMPTS_FAILED,"PageManager","_requestPageJson")
}.bind(this)
}var c=d.clone();
c.splice(0,1);
return function(){LOG.reportError(wixErrors.SINGLE_PAGE_RETRIEVAL_ATTEMPT_FAILED,"PageManager","_requestPageJson",c[0]);
this._requestPageJson(c,a,b)
}.bind(this)
},createPage:function(c){var b=this._getJsonForString(c);
var e=b.data||b.payload.data;
this._setInitData(e);
var a=b.structure||b.payload.structure;
var d=this._createPageElements(a);
this._attachPageWhenReady(d,a.id)
},_attachPageWhenReady:function(b,a){if(!!$(a)){this._attachPage(b,a);
this._loadedPages.push(a);
W.Utils.callLater(this._callBacksForPageCreation[a].method,[],this._callBacksForPageCreation[a].scope,10);
this.fireEvent("PAGE_LOADED",a)
}else{W.Utils.callLater(this._attachPageWhenReady,[b,a],this,10)
}},_attachPage:function(b,a){var c=$(a);
if(c.getLogic){this._attachPageContentToWixifiedPage(c,b)
}else{b.replaces(c)
}},_attachPageContentToWixifiedPage:function(c,b){var a=c.getLogic();
c.empty();
b.getChildren().each(function(d){c.grab(d,"bottom")
});
if(c.get("skin")!==b.get("skin")){c.set("skin",b.get("skin"));
W.Skins.getSkin(b.get("skin"),function(d){var e=new d();
a.setSkin(e)
})
}if(b.get("styleId")!=c.get("styleId")){c.set("styleId",b.get("styleId"));
W.Theme.getStyle(b.get("styleId"),function(d){a.setStyle(d)
})
}if(b.get("dataQuery")!=c.get("dataQuery")){c.set("dataQuery",b.get("dataQuery"));
a.setDataByQuery(b.get("dataQuery"),function(){})
}if(b.get("propertyQuery")!=c.get("propertyQuery")){c.set("propertyQuery",b.get("propertyQuery"));
W.Data.getDataByQuery(b.get("propertyQuery"),a.setComponentProperties)
}},_attachMasterPage:function(a){$$("body")[0].grab(a,"top")
},_createMasterPage:after(function(){this._addPagesStubs()
}),_addPagesStubs:function(){Object.each(this._getPagesList().pages,function(a){$("SITE_PAGES").grab(this._createStubPage(a))
}.bind(this))
},_createStubPage:function(b){var a=new Element("div");
a.set({id:b.pageId,comp:"mobile.core.components.Page",skin:"mobile.core.skins.InlineSkin",dataQuery:"#"+b.pageId});
return a
},isPageLoaded:function(a){return this._isOldPageVersion()||this._loadedPages.contains(a)||this._loadingPages.contains(a)
},loadPageById:function(b,a,d){var c=this._getPageDataById(b);
if(!this._loadedPages.contains(b)&&!this._loadingPages.contains(b)){this._loadingPages.push(b);
this._callBacksForPageCreation[b]={method:a,scope:d};
this._loadSinglePage(c)
}},_getPageDataById:function(a){var b=null;
Object.each(this._getPagesList().pages,function(c){if(c.pageId===a){b=c
}});
return b
},_loadAllPages:function(a){this.addEvent("PAGE_LOADED",function(b){a.erase(b);
if(a.length===0){this._allPagesAreLoaded=true
}}.bind(this));
a.each(function(b){this.loadPageById(b)
}.bind(this))
},_loadAllPagesLazily:function(){var a=[];
Object.each(this._getPagesList().pages,function(b){if(!this.isPageLoaded(b.pageId)){a.push(b.pageId)
}}.bind(this));
if(a.length>0){this.loadPageById(a[0]);
W.Utils.callLater(this._loadAllPagesLazily,[],this,3000)
}},_getPagesToLoad:function(){var a=[this.getMainPage()];
var c=W.Utils.hash.getHashParts();
var b=(!!c.extData)?c.extData.match("([^/]+)/([^/]+)")[1]:c.id;
if(!!b&&b!==this.getMainPage()){a.push(b)
}return a
},_loadSiteNewVersion:function(){this._loadAllPages(this._getPagesToLoad());
this.getMasterPageData(this._createMasterPage);
W.Utils.callLater(this._loadAllPagesLazily,[],this,15000)
}}});
W.Experiments.registerNewExperimentManager("PageManager","New","Pages",{name:"experiments.wysiwyg.viewer.managers.PageManager",Class:{Binds:["_getPagesList","_createPageElements","createPage","_loadAllPages","_createMasterPage","_handleSinglePageData"],Extends:Events,initialize:function(){W.Pages=this;
if(W.Managers&&W.Managers.list){W.Managers.list.push({target:"Pages"})
}var a=W.Classes.get("mobile.core.managers.serverfacade.CorsRESTClient");
this._restClient=new a()
},isReady:function(){return true
},clone:function(){return new this.$class()
},_getPagesList:function(){if(!publicModel.pageList){return undefined
}var a=publicModel.pageList;
a.pages=a.pages.map(this._handleSinglePageData);
return a
},_handleSinglePageData:function(a){return a
},getMainPage:function(){return this._getPagesList().mainPageId
},getMasterPageData:function(a){this._requestPageJson(this._getPagesList().masterPage,a)
},getPageData:function(a,b){if(!a||!a.urls){throw"page ["+page_id+"] is not listed in the pages list or it does not have url"
}if(typeof b!=="function"){throw"callback ["+b+"] supplied is not a function"
}this._requestPageJson(a.urls,b)
},_requestPageJson:function(a,b){this._restClient.get(a[0],undefined,{onSuccess:b,onError:this._getErrorCallbackForUrl(a,b)})
},_getErrorCallbackForUrl:function(c,a){if(c.length==1){return function(){LOG.reportError(wixErrors.ALL_PAGE_RETRIEVAL_ATTEMPTS_FAILED,"PageManager","_requestPageJson")
}
}var b=c.clone();
b.splice(0,1);
return function(){LOG.reportError(wixErrors.SINGLE_PAGE_RETRIEVAL_ATTEMPT_FAILED,"PageManager","_requestPageJson",b[0]);
this._requestPageJson(b,a)
}.bind(this)
},_buildComponentProperties:function(a){if(!a){return{}
}var b={id:a.id,comp:a.componentType,skin:a.componentType=="wysiwyg.viewer.components.PagesContainer"?"wysiwyg.viewer.skins.screenwidthcontainer.BlankScreen":a.skin,styleId:a.styleId};
if(a.dataQuery){b.dataQuery=a.dataQuery.indexOf("#")!=0?"#"+a.dataQuery:a.dataQuery
}if(a.propertyQuery){b.propertyQuery=a.propertyQuery.indexOf("#")!=0?"#"+a.propertyQuery:a.propertyQuery
}if(a.layout){b.width=a.layout.width;
b.height=a.layout.height;
b.x=a.layout.x;
b.y=a.layout.y
}return b
},_addAnchors:function(b){if(b&&b.id&&b.layout&&b.layout.anchors){var a={};
a[b.id]=b.layout.anchors;
W.Layout.appendSavedAnchor(a)
}},_createElement:function(b){var a=new Element("div");
a.set(this._buildComponentProperties(b));
this._addAnchors(b);
return a
},_createPageElements:function(b){var a=this._createElement(b);
if(b.components){b.components.each(function(c){a.grab(this._createPageElements(c))
}.bind(this))
}return a
},createPage:function(c){var b=this._getJsonForString(c);
var e=b.data||b.payload.data;
this._setInitData(e);
var a=b.structure||b.payload.structure;
var d=this._createPageElements(a);
this._attachPage(d);
this.fireEvent("PAGE_LOADED",a.id)
},_setInitData:function(a){W.Data.setInitDataItems(a.document_data);
W.ComponentData.setInitDataItems(a.component_properties);
W.Theme.setInitDataItems(a.theme_data)
},_attachPage:function(a){$("SITE_PAGES").grab(a,"bottom")
},_attachMasterPage:function(a){$$("body")[0].grab(a,"top")
},_createSiteStructureNode:function(){var a=new Element("div");
a.set({id:"SITE_STRUCTURE",comp:"wysiwyg.viewer.components.WSiteStructure",skin:"mobile.core.skins.InlineSkin","class":"SITE_STRUCTURE"});
return a
},_getJsonForString:function(a){if(typeof a==="string"){return JSON.decode(a)
}return a
},_createMasterPage:function(d){var b=this._getJsonForString(d);
var e=b.data||b.payload.data;
this._setInitData(e);
var c=this._createSiteStructureNode();
var a=b.structure||b.payload.structure;
a.children.each(function(f){c.grab(this._createPageElements(f))
}.bind(this));
this._attachMasterPage(c);
this.fireEvent("MASTER_PAGE_WAS_LOADED")
},_loadSinglePage:function(a){this.getPageData(a,this.createPage)
},_loadAllPages:function(){var a=[];
this.addEvent("PAGE_LOADED",function(b){a.erase(b);
if(a.length===0){this._allPagesAreLoaded=true
}}.bind(this));
Object.each(this._getPagesList().pages,function(b){a.push(b.pageId);
this._loadSinglePage(b)
}.bind(this))
},_isOldPageVersion:function(){return !this._getPagesList()
},isPageLoadingCompleted:function(){return !!this._allPagesAreLoaded
},loadSite:function(){if(this._isOldPageVersion()){W.Data.getDataByQuery("#SITE_STRUCTURE",function(a){var b=(viewMode!="preview");
W.Viewer.setSite($("SITE_STRUCTURE"),a,b)
})
}else{this._loadSiteNewVersion()
}},_loadSiteNewVersion:function(){this.addEvent("MASTER_PAGE_WAS_LOADED",this._loadAllPages);
this.getMasterPageData(this._createMasterPage)
}}});
W.Experiments.registerExperimentManager("AppMarket","New",{name:"experiments.wysiwyg.viewer.managers.TPAManagerAppMarket",Class:{Extends:"wysiwyg.viewer.managers.TPAManager",Static:{APP_MARKET_URL:"http://market.apps.wix.com"},initialize:before(function(){this._setAppMarketUrl()
}),_setAppMarketUrl:function(){if(serviceTopology.baseDomain){var a=serviceTopology.baseDomain.indexOf("wixpress")>1;
if(a){if(serviceTopology.baseDomain.indexOf("burger")>-1){this.APP_MARKET_URL="http://market.burger.wixpress.com"
}}}},_handleAppMarketMessage:function(a){switch(a.cmd){case"ADD_APP_TO_SITE":W.Commands.executeCommand("WEditorCommands.AddApp",a.params,this);
W.Commands.executeCommand(Constants.EditorUI.CLOSE_PANEL);
break;
case"ADD_COMPONENT_TO_SITE":W.CommandsNew.executeCommand("WEditorCommands.AddComponent",a.params,this);
W.Commands.executeCommand(Constants.EditorUI.CLOSE_PANEL);
break;
case"OPEN_MARKET_POPUP":W.Commands.executeCommand("WEditorCommands.openMarketPopup",a.params,this);
break;
case"CLOSE_MARKET_POPUP":W.Commands.executeCommand("WEditorCommands.closeMarketPopup",a.params,this);
break;
case"GET_INSTALLED_APPS":var b=W.Preview.getPreviewManagers().Viewer.getAppDataHandler().getAppsData();
var c={eventType:"ON_COMMAND_RESPONSE",callerId:a.id,params:b};
this._marketPanelWindow.postMessage(JSON.stringify(c),this.APP_MARKET_URL);
break;
case"GET_TEST_APPS":this.getTestApps(function(d){var e={eventType:"ON_COMMAND_RESPONSE",callerId:a.id,params:d};
this._marketPanelWindow.postMessage(JSON.stringify(e),this.APP_MARKET_URL)
}.bind(this));
break
}},setMarketPanelWindow:function(a){this._marketPanelWindow=a
},postMessageEvent:function(b,c){var e=c||this._marketPanelWindow;
var a=location.protocol+"//"+location.host;
var d={eventType:b,origin:a};
e.postMessage(JSON.stringify(d),this.APP_MARKET_URL)
}}});
W.Experiments.registerExperimentManager("CSW","New",{name:"experiments.wysiwyg.viewer.managers.WViewManagerCSWNew",Class:{Extends:"wysiwyg.viewer.managers.WViewManager",_updateDocWidth:function(){var b=this._siteStructureData;
var a=b.get("renderModifiers");
var c=this.injects().Utils.getQueryParam("siteWidth");
if(c){this._docWidth=parseInt(c);
a.siteWidth=this._docWidth;
b.markDataAsDirty();
return
}if(a&&a.siteWidth){this._docWidth=a.siteWidth;
return
}switch(window.rendererModel.applicationType){case"HtmlFacebook":this._docWidth="520";
break;
case"HtmlWeb":this._docWidth="980";
break;
default:this._docWidth=980
}},getDocWidth:function(){if(!this._docWidth){this._updateDocWidth()
}return this._docWidth
}}});
W.Experiments.registerExperimentManager("PhantomPageFix","New",{name:"experiments.wysiwyg.viewer.managers.WViewManagerPhantomPageFix",Class:{Extends:"wysiwyg.viewer.managers.WViewManager",_fixPagesOrderByNewMenuData:function(a){if(W.Data.isDataAvailable("#MAIN_MENU")){var h=W.Data.getDataByQuery("#MAIN_MENU");
var e=h.getAllItems();
var b=e.length,d;
for(d=0;
d<b;
d++){var f=e[d];
var g=f.get("refId");
var c=$$("[dataquery="+g+"]");
if(c.length===0){h.deleteNavigationItem(g)
}}e=h.getAllItems();
a=e.map(function(j){return j.get("refId")
})
}return a
}}});
W.Experiments.registerExperimentManager("WixApps","New",{name:"experiments.wysiwyg.viewer.managers.WViewManagerWixApps",Class:{Extends:"wysiwyg.viewer.managers.WViewManager",_setZoomDataInner:function(a){if(a.itemsList){this._zoomComp.getLogic().setGallery(a.itemsList,a.currentIndex,a.getDisplayerDivFunction,a.getHashPartsFunction,a.extraParams)
}else{if(a.item){this._zoomComp.getLogic().setImage(a.item,a.getDisplayerDivFunction,a.getHashPartsFunction)
}}}}});
W.Experiments.registerNewExperimentSchemaProps("NewComps","New","NumberInputProperties",{minValue:{type:"number","default":0,description:"minimum allowed value"},maxValue:{type:"number","default":999,description:"maximum allowed value"}});
W.Experiments.registerNewExperimentSchemaProps("NewComps","New","TableComponentProperties",{minHeight:{type:"number","default":undefined,description:"minimum allowed value"}});
W.ComponentEvents=W.ComponentEvents||{};
W.ComponentEvents.COMPONENT_SEQUENCER_COMP_SETUP="componentSetup";
W.ComponentEvents.COMPONENT_SEQUENCER_PRODUCTION_FINISHED="productionFinished";
W.Experiments.registerExperimentClass("WixApps","New",{name:"experiments.wysiwyg.viewer.utils.ComponentSequencerWixApps",imports:["wysiwyg.viewer.utils.GalleryUtils"],Class:{Extends:"wysiwyg.viewer.components.ComponentSequencer",_createCompsFromDataList:function(a,c){this._preExistingElements=a.getChildren().slice(0);
this._pendingElements=[];
this._createdElements=[];
this._reusedElements=[];
for(var b=0;
b<c.length;
b++){this._setupComponent(a,b,c)
}this._preExistingElements.forEach(function(d){if(!this._reusedElements.contains(d)){this._removeElement(d)
}}.bind(this));
this._checkIfAllDone()
},_setupComponent:function(a,c,e){var b=e[c];
var g;
var f;
var d=this._findReusableComponent(this._preExistingElements,b);
if(d){g="reuse";
this._reusedElements.push(d)
}else{g="create";
d=this.createComponent(a,b,c,e)
}a.adopt(d);
this._createdElements.push(d);
if(!this._pendingElements.contains(d)){this.fireEvent(W.ComponentEvents.COMPONENT_SEQUENCER_COMP_SETUP,{method:g,compView:d,index:c})
}},createComponent:function(b,d,c,f){var e;
var h=this.resolveItem(d,c,f);
var g=typeOf(h);
var a=this._getCompStyle(b);
if(g==="element"){e=h;
if(!e.getLogic&&!e.hasAttribute("comp")){this._supplyMinimalLogic(e,d)
}}else{e=new Element("div");
e.setAttribute("comp",h.comp);
e.setAttribute("skin",h.skin);
if(h.hasOwnProperty("data")){d=h.data
}e.wixify(h.args||{},d,undefined,undefined,a);
this._pendingElements.push(e)
}e.addEvent(Constants.ComponentEvents.READY,function(){this.fireEvent(W.ComponentEvents.COMPONENT_SEQUENCER_COMP_SETUP,{method:"create",compView:e,index:c});
var j=this._pendingElements.indexOf(e);
if(j!=-1){this._pendingElements.splice(j,1);
this._checkIfAllDone()
}}.bind(this));
return e
},isPending:function(){return this._pendingElements.length>0
},_checkIfAllDone:function(){if(!this.isPending()){this._onAllComponentsReady()
}},_onAllComponentsReady:function(){var a=this._createdElements.slice(0);
this._createdElements=[];
this._reusedElements=[];
this._preExistingElements=[];
this.fireEvent(W.ComponentEvents.COMPONENT_SEQUENCER_PRODUCTION_FINISHED,{elements:a})
},_dataItemsIdentical:function(b,a){if(b===a){return true
}else{if(b.get&&a.get&&b.hasField("id")&&a.hasField("id")){var d=b.get("id");
var c=a.get("id");
return(d&&c&&(d===c))
}else{return false
}}},_getCompStyle:function(a){var b;
if(!this._style){b=a;
while(b&&!b.getLogic){b=b.getParent()
}if(b&&b.getLogic&&b.getLogic()&&b.getLogic().getStyle){return b.getLogic().getStyle()
}}}}});
W.Experiments.registerNewExperimentManager("NewComps","New","MessagesController",{name:"wysiwyg.viewer.utils.MessageViewController",Class:{Binds:["_showMessageBox","_messageBoxClosed"],initialize:function(){W.MessagesController=this;
this._messagesQueue=[];
this.BETWEEN_MESSAGES_DELAY=700
},_initIfNeededMessageView:function(a){if(!this._messageBox){this._messageBox=W.Components.createComponent("wysiwyg.viewer.components.MessageView","wysiwyg.viewer.skins.MessageViewSkin",null,null,function(b){$$("body").adopt(this._messageBox);
this._messageBox.getLogic().addEvent("complete",this._messageBoxClosed)
}.bind(this),a)
}else{if(a){a()
}}},showError:function(a,b){var c={};
c.msgTitle=a;
c.msgBody=b;
this._messagesQueue.push(c);
this._initIfNeededMessageView(this._showMessageBox)
},showMessage:function(a,c,d){var b={};
b.msgTitle=a;
b.msgBody=c;
b.cb=d;
this._messagesQueue.push(b);
this._initIfNeededMessageView(this._showMessageBox)
},_showMessageBox:function(){if((this._messagesQueue.length>0)&&(!this._messageBox.getLogic().visible())){this._messageBox.getLogic().showMessage(this._messagesQueue.shift())
}},_messageBoxClosed:function(){setTimeout(function(){this._showMessageBox()
}.bind(this),this.BETWEEN_MESSAGES_DELAY)
},kill:function(){if(this._messageBox){this._messageBox.dispose();
this._messageBox.removeFromDOM()
}},isReady:function(){return true
},clone:function(){return new this.$class()
}}});