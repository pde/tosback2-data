
RightNow.Widget.KeywordText2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._textElement=document.getElementById("rn_"+this.instanceID+"_Text");if(this._textElement)
{this._searchedOn=this._textElement.value;this.data.initialValue=this._textElement.value;this._setFilter();YAHOO.util.Event.addListener(this._textElement,"change",this._onChange,null,this);RightNow.Event.subscribe("evt_keywordChangedResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_reportResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_getFiltersRequest",this._onGetFiltersRequest,this);RightNow.Event.subscribe("evt_resetFilterRequest",this._onResetRequest,this);if(this.data.attrs.initial_focus)
this._textElement.focus();}};RightNow.Widget.KeywordText2.prototype={_onChange:function(evt)
{this._eo.data=this._textElement.value;this._eo.filters.data=this._textElement.value;RightNow.Event.fire("evt_keywordChangedRequest",this._eo);},_onGetFiltersRequest:function(type,args)
{this._eo.filters.data=YAHOO.lang.trim(this._textElement.value);this._searchedOn=this._eo.filters.data;RightNow.Event.fire("evt_searchFiltersResponse",this._eo);},_setFilter:function()
{this._eo.w_id=this.instanceID;this._eo.filters={"searchName":this.data.js.searchName,"data":this.data.initialValue,"rnSearchType":this.data.js.rnSearchType,"report_id":this.data.attrs.report_id};},_onChangedResponse:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id))
{var data=RightNow.Event.getDataFromFiltersEventResponse(args,this.data.js.searchName,this.data.attrs.report_id),newValue=(data===null)?this.data.initialValue:data;if(this._textElement.value!==newValue)
this._textElement.value=newValue;}},_onResetRequest:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id)&&(args[0].data.name===this.data.js.searchName||args[0].data.name==="all"))
{this._textElement.value=this._searchedOn;}}};
RightNow.Widget.SearchButton2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._requestInProgress=false;this._searchButton=document.getElementById("rn_"+this.instanceID+"_SubmitButton");this._enableClickListener();RightNow.Event.subscribe("evt_reportResponse",this._onSearchResponse,this);};RightNow.Widget.SearchButton2.prototype={_startSearch:function(evt)
{if(this._requestInProgress)return false;if(!this.data.attrs.popup_window)
this._disableClickListener();if(YAHOO.env.ua.ie!==0)
{if(!this._parentForm)
this._parentForm=YAHOO.util.Dom.getAncestorByTagName("rn_"+this.instanceID,"FORM");if(this._parentForm&&window.external&&"AutoCompleteSaveForm"in window.external)
{window.external.AutoCompleteSaveForm(this._parentForm);}}
var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.filters={report_id:this.data.attrs.report_id,reportPage:this.data.attrs.report_page_url,target:this.data.attrs.target};RightNow.Event.fire("evt_searchRequest",eo);},_onSearchResponse:function(type,args)
{if(args[0].filters.report_id==this.data.attrs.report_id)
this._enableClickListener();},_enableClickListener:function()
{this._searchButton.disabled=this._requestInProgress=false;YAHOO.util.Event.addListener(this._searchButton,"click",this._startSearch,null,this);},_disableClickListener:function()
{this._searchButton.disabled=this._requestInProgress=true;YAHOO.util.Event.removeListener(this._searchButton,"click",this._startSearch);}};
RightNow.Widget.ProductCategorySearchFilter=function(data,instanceID)
{this.data=data,this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._currentIndex=0;this._noValueNodeIndex=0;this._displayField=document.getElementById("rn_"+this.instanceID+"_"+this.data.attrs.filter_type+"_Button");this._displayFieldVisibleText=document.getElementById("rn_"+this.instanceID+"_ButtonVisibleText");this._accessibleView=document.getElementById("rn_"+this.instanceID+"_Links");if(!this._displayField)return;RightNow.Event.subscribe("evt_getFiltersRequest",this._getFiltersRequest,this);RightNow.Event.subscribe("evt_menuFilterGetResponse",this._getSubLevelResponse,this);RightNow.Event.subscribe("evt_accessibleTreeViewGetResponse",this._getAccessibleTreeViewResponse,this);RightNow.Event.subscribe("evt_reportResponse",this._onReportResponse,this);RightNow.Event.subscribe("evt_resetFilterRequest",this._onResetRequest,this);YAHOO.util.Event.addListener(this._displayField,"click",this._toggleProductCategoryPicker,null,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_LinksTrigger","click",this._toggleAccessibleView,null,this);this._initializeFilter();this._panel=new YAHOO.widget.Panel("rn_"+this.instanceID+"_Tree",{close:false,width:"300px",visible:false,constraintoviewport:true});this._panel.setHeader("");this._panel.render();YAHOO.util.Dom.setStyle(this._panel.innerElement,"overflow-y","auto");if(this.data.js.defaultData)
this._buildTree();};RightNow.Widget.ProductCategorySearchFilter.prototype={_buildTree:function()
{this._initializeKeyBindings();this._tree=new YAHOO.widget.TreeView("rn_"+this.instanceID+"_Tree");if(this._tree)
{this._tree.setDynamicLoad(RightNow.Event.createDelegate(this,this._getSubLevelRequest));var root=this._tree.getRoot(),defaultValues=false;for(var i=0,node,length=this.data.js.hierData.length;i<length;i++)
{for(var j=0,nodeData;j<this.data.js.hierData[i].length;j++)
{nodeData=this.data.js.hierData[i][j];if(i!==0&&nodeData.parentID)
root=this._tree.getNodeByProperty("hierValue",nodeData.parentID);node=new YAHOO.widget.MenuNode(nodeData.label,root);node.hierValue=nodeData.value;node.href='javascript:void(0);';if(nodeData.selected)
{defaultValues=true;this._currentIndex=node.index;}
if(!nodeData.hasChildren)
{node.dynamicLoadComplete=true;node.iconMode=1;}}
root.loadComplete();}
var noValueNode=this._tree.getRoot().children[0];noValueNode.isLeaf=true;this._noValueNodeIndex=noValueNode.index;this._tree.subscribe("enterKeyPressed",this._enterPressed,null,this);this._tree.subscribe('clickEvent',this._selectNode,null,this);this._tree.subscribe('expandComplete',function(node){this._panel.innerElement.scrollTop=node.getEl().offsetTop-20;},null,this);this._tree.render();this._tree.collapseAll();YAHOO.util.Dom.setStyle("rn_"+this.instanceID+"_Tree","display","block");if(defaultValues)
this._displaySelectedNodesAndClose(false);}},_displayAccessibleDialog:function()
{if(!this._tree)
this._buildTree();if(!(this._dialog))
{var handleDismiss=function()
{this.hide();};this._buttons=[{text:RightNow.Interface.getMessage("CANCEL_CMD"),handler:handleDismiss,isDefault:false}];YAHOO.util.Dom.removeClass(this._accessibleView,"rn_Hidden")
this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_nothing_selected,this._accessibleView,{"buttons":this._buttons,"width":"400px"});}
else
{var currentlySelectedSpan=document.getElementById("rn_"+this.instanceID+"_IntroCurrentSelection");var introLink=document.getElementById("rn_"+this.instanceID+"_Intro");if(currentlySelectedSpan&&introLink)
{var currentNode=this._tree.getNodeByIndex(this._currentIndex);if(!currentNode)
{currentNode={};currentNode.hierValue=0;}
var localInstanceID=this.instanceID;introLink.onclick=function(){document.getElementById("rn_"+localInstanceID+"_AccessibleLink_"+currentNode.hierValue).focus();};var selectedNodes=this._getSelectedNodesMessage();currentlySelectedSpan.innerHTML=RightNow.Text.sprintf(RightNow.Interface.getMessage("SELECTION_PCT_S_ACTIVATE_LINK_JUMP_MSG"),selectedNodes);}}
YAHOO.lang.later(1000,this._dialog,'show');return false;},_toggleAccessibleView:function(e)
{if(this._dataType==="categories"&&this.data.js.linkingOn)
this._eo.data.linkingProduct=RightNow.UI.Form.currentProduct;if(this._flatTreeViewData)
this._displayAccessibleDialog();else
RightNow.Event.fire("evt_accessibleTreeViewRequest",this._eo);},_getAccessibleTreeViewResponse:function(e,args)
{if(args[0].data.hm_type!=this._eo.data.hm_type)
return;var evtObj=args[0];if(evtObj.data.data_type==this._dataType)
{this._flatTreeViewData=evtObj.data.accessibleLinks;var noValue={0:RightNow.Interface.getMessage("NO_VAL_LBL"),1:0,hier_list:0,level:0};if(!YAHOO.lang.isArray(this._flatTreeViewData))
{var tempArray=[];for(var i in this._flatTreeViewData)
if(!isNaN(parseInt(i)))
tempArray[i]=this._flatTreeViewData[i];this._flatTreeViewData=tempArray;}
this._flatTreeViewData.unshift(noValue);var htmlList="<p><a href='javascript:void(0)' id='rn_"+this.instanceID+"_Intro'"+"onclick='document.getElementById(\"rn_"+this.instanceID+"_AccessibleLink_"+noValue[1]+"\").focus();'>"+RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_LINKS_DEPTH_ANNOUNCED_MSG"),this.data.attrs.label_input)+" <span id='rn_"+this.instanceID+"_IntroCurrentSelection'>"+RightNow.Text.sprintf(RightNow.Interface.getMessage("SELECTION_PCT_S_ACTIVATE_LINK_JUMP_MSG"),noValue[0])+"</span></a></p>";var previousLevel=-1;for(var i in this._flatTreeViewData)
{if(this._flatTreeViewData.hasOwnProperty(i))
{var item=this._flatTreeViewData[i];if(item.level>previousLevel)
htmlList+="<ol>";while(item.level<previousLevel)
{htmlList+="</li></ol>";previousLevel--;}
if(item.level===previousLevel)
htmlList+="</li>";htmlList+="<li>"+'<a href="javascript:void(0)" id="rn_'+this.instanceID+'_AccessibleLink_'+item[1]+'" class="rn_AccessibleHierLink" hierList="'+item['hier_list']+'">'+item[0]+'</a>';previousLevel=item.level;}}
for(var i=previousLevel;i>=0;--i)
htmlList+="</li></ol>";htmlList+="<div id='rn_"+this.instanceID+"_AccessibleErrorLocation'></div>";this._accessibleView.innerHTML=htmlList;var allNodes=YAHOO.util.Dom.getElementsByClassName("rn_AccessibleHierLink","a",this._accessibleView);YAHOO.util.Event.addListener(allNodes,"click",this._accessibleLinkClick,null,this);this._displayAccessibleDialog();}},_accessibleLinkClick:function(e)
{var element=YAHOO.util.Event.getTarget(e);var hierArray=element.getAttribute("hierList").split(",");this._expandAndCreateNodes(hierArray);return false;},_toggleProductCategoryPicker:function(event)
{if(!this._tree)
this._buildTree();if(this._panel.cfg.getProperty("visible")===false)
{if(!this._toggleProductCategoryPicker._buttonPos||this._toggleProductCategoryPicker._buttonPos!==this._panel.cfg.getProperty("x"))
{this._toggleProductCategoryPicker._buttonPos=YAHOO.util.Dom.getX(this._displayField);this._panel.cfg.setProperty("x",this._toggleProductCategoryPicker._buttonPos);}
this._panel.syncPosition();this._panel.show();var currentNode=this._tree.getNodeByIndex(this._currentIndex);if(currentNode&&currentNode.focus)
{currentNode.focus();}
else if(this._tree.getRoot().children[0]&&this._tree.getRoot().children[0].focus)
{this._tree.getRoot().children[0].focus();}
this._toggleProductCategoryPicker._closeListener=this._toggleProductCategoryPicker._closeListener||function(event)
{if(this._panel.cfg.getProperty("visible"))
{var coordinates=YAHOO.util.Event.getXY(event);if((event.type==="click"&&YAHOO.util.Event.getTarget(event).id===this._displayField.id)||coordinates[0]===0&&coordinates[1]===0)
return;coordinates=new YAHOO.util.Point(coordinates[0],coordinates[1]);var panelRegion=YAHOO.util.Dom.getRegion("rn_"+this.instanceID+"_Tree"),buttonRegion=YAHOO.util.Dom.getRegion(this._displayField);if(panelRegion&&buttonRegion&&(!panelRegion.contains(coordinates)&&!buttonRegion.contains(coordinates)))
{this._displaySelectedNodesAndClose();YAHOO.util.Event.removeListener(document,this._toggleProductCategoryPicker._closeListener);}}};YAHOO.util.Event.addListener(document,"click",this._toggleProductCategoryPicker._closeListener,null,this);}
else
{this._displaySelectedNodesAndClose();YAHOO.util.Event.removeListener(document,this._toggleProductCategoryPicker._closeListener);}},_getSelectedNodesMessage:function()
{this._currentIndex=this._currentIndex||1;var hierValues=[],currentNode=this._tree.getNodeByIndex(this._currentIndex);while(currentNode&&!currentNode.isRoot())
{hierValues.push(currentNode.label);currentNode=currentNode.parent;}
return hierValues.reverse();},_displaySelectedNodesAndClose:function(focus)
{this._panel.hide();if(this._dialog&&this._dialog.cfg.getProperty("visible"))
this._dialog.hide();if(this._currentIndex<=this._noValueNodeIndex)
{this._displayFieldVisibleText.innerHTML=this.data.attrs.label_nothing_selected;var description=document.getElementById("rn_"+this.instanceID+"_TreeDescription");if(description)
description.innerHTML=this.data.attrs.label_nothing_selected;}
else
{var hierValues=this._getSelectedNodesMessage().join("<br/>"),field=this._displayFieldVisibleText;if(YAHOO.env.ua.webkit){setTimeout(function(){field.innerHTML=hierValues;},1);}
else{field.innerHTML=hierValues;}
var description=document.getElementById("rn_"+this.instanceID+"_TreeDescription");if(description)
description.innerHTML=this.data.attrs.label_screen_reader_selected+hierValues;}
if(focus&&!this._dialog)
try{this._displayField.focus();}catch(e){}},_enterPressed:function(keyEvent)
{this._selectNode({node:keyEvent});},_selectNode:function(clickEvent)
{this._currentIndex=clickEvent.node.index;this._selected=true;this._selectNode._selectedWidget=this.data.info.w_id;if(clickEvent.node.expanded||this._noValueNodeIndex===clickEvent.node.index)
{this._eo.data.level=clickEvent.node.depth+1;if(this._eo.data.level!==this._eo.filters.data[0].length)
{this._eo.filters.data[0]=[];var currentNode=clickEvent.node;while(currentNode&&!currentNode.isRoot())
{this._eo.filters.data[0][currentNode.depth]=currentNode.hierValue;currentNode=currentNode.parent;}}
else
{this._eo.filters.data[0][this._eo.data.level-1]=this._eo.data.value;for(var i=this._eo.data.level;i<this._eo.filters.data[0].length;i++)
delete this._eo.filters.data[0][i];}}
else
{this._getSubLevelRequest(clickEvent.node);this._tree.collapseAll();}
this._displaySelectedNodesAndClose(true);if(clickEvent.event)
YAHOO.util.Event.preventDefault(clickEvent.event);return false;},_getSubLevelRequest:function(expandingNode)
{if(this._nodeBeingExpanded||expandingNode.expanded)return;this._nodeBeingExpanded=true;this._eo.data.level=expandingNode.depth+1;this._eo.data.label=expandingNode.label;this._currentIndex=expandingNode.index;this._eo.data.value=expandingNode.hierValue;this._getSubLevelRequest._origRequest=this._getSubLevelRequest._origRequest||[];this._getSubLevelRequest._origRequest[this._dataType]=expandingNode.hierValue;if(this._dataType==="products")
{RightNow.UI.Form.currentProduct=this._eo.data.value;}
if(this._eo.data.value<1&&this._eo.data.linking_on)
{this._eo.data.reset=true;if(this._eo.data.value===0&&this._dataType==="products")
{this._eo.data.reset=false;var eo=new RightNow.Event.EventObject();eo.data={"name":"c","reset":true};eo.filters.report_id=this.data.attrs.report_id;RightNow.Event.fire("evt_resetFilterRequest",eo);this._nodeBeingExpanded=false;return;}
else
{this._eo.data.value=0;}}
else
{this._eo.data.reset=false;}
if(this.data.js.link_map)
{this._eo.data.link_map=this.data.js.link_map;this.data.js.link_map=null;}
if(this._eo.data.level!==this._eo.filters.data[0].length)
{this._eo.filters.data[0]=[];var currentNode=expandingNode;while(currentNode&&!currentNode.isRoot())
{this._eo.filters.data[0][currentNode.depth]=currentNode.hierValue;currentNode=currentNode.parent;}}
else
{this._eo.filters.data[0][this._eo.data.level-1]=this._eo.data.value;for(var i=this._eo.data.level;i<this._eo.filters.data[0].length;i++)
delete this._eo.filters.data[0][i];}
RightNow.Event.fire("evt_menuFilterRequest",this._eo);this._nodeBeingExpanded=false;},_onReportResponse:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id)){var data=RightNow.Event.getDataFromFiltersEventResponse(args,this.data.js.searchName,this.data.attrs.report_id);if(data[0]&&data[0].length){if(!this._tree)
this._buildTree();if(typeof data[0]==="string")
data[0]=data[0].split(",");var finalData=RightNow.Lang.arrayFilter(data[0]);this._expandAndCreateNodes(finalData);this._eo.filters.data[0]=finalData;this._lastSearchValue=finalData.slice(0);if(this._eo.filters.data.reconstructData){this._eo.filters.data.level=this._eo.filters.data.reconstructData.level;this._eo.filters.data.label=this._eo.filters.data.reconstructData.label;}}
else if(this._tree){this._eo.filters.data[0]=[];this._currentIndex=this._noValueNodeIndex;this._displaySelectedNodesAndClose();}}},_expandAndCreateNodes:function(hierArray)
{var i=hierArray.length-1,currentNode=null;while(!currentNode&&i>=0){currentNode=this._tree.getNodeByProperty("hierValue",parseInt(hierArray[i]));i--;}
if(this._currentIndex===currentNode.index)
{if(this._dialog&&this._dialog.cfg.getProperty("visible"))
this._dialog.hide();return;}
i++;if(this._noValueNodeIndex===currentNode.index||currentNode.hierValue==hierArray[hierArray.length-1]){this._selectNode({node:currentNode});}
else{var onExpandComplete=function(expandingNode){if(expandingNode.nextToExpand){var nextNode=this._tree.getNodeByProperty("hierValue",parseInt(expandingNode.nextToExpand));if(nextNode){nextNode.nextToExpand=hierArray[++i];nextNode.expand();}}
else if(i===hierArray.length){this._tree.unsubscribe("expandComplete",onExpandComplete,null);expandingNode.expanded=false;this._selectNode({node:expandingNode});}
return true;};this._tree.subscribe("expandComplete",onExpandComplete,null,this);currentNode.nextToExpand=hierArray[++i];currentNode.expand();}},_getSubLevelResponse:function(type,args)
{var evtObj=args[0];if((evtObj.data.data_type!==this._dataType)||(evtObj.filters.report_id!==this.data.attrs.report_id))
return;var hierLevel=evtObj.data.level,hierData=evtObj.data.hier_data,redisplaySelectedNode=false,currentRoot=null;if(!this._tree)
this._buildTree();if(!evtObj.data.reset_linked_category&&this._getSubLevelRequest._origRequest&&this._getSubLevelRequest._origRequest[this._dataType])
{currentRoot=this._tree.getNodeByProperty("hierValue",this._getSubLevelRequest._origRequest[this._dataType]);if(currentRoot.index!==this._currentIndex)
{this._currentIndex=currentRoot.index;redisplaySelectedNode=true;}}
else if(evtObj.data.reset_linked_category)
{currentRoot=this._tree.getRoot();currentRoot.dynamicLoadComplete=false;this._tree.removeChildren(currentRoot);this._flatTreeViewData=null;var tempNode=new YAHOO.widget.MenuNode(RightNow.Interface.getMessage("NO_VAL_LBL"),currentRoot,false);tempNode.hierValue=0;tempNode.href='javascript:void(0);';tempNode.isLeaf=true;this._noValueNodeIndex=this._currentIndex=tempNode.index;this._displayFieldVisibleText.innerHTML=this.data.attrs.label_nothing_selected;var description=document.getElementById("rn_"+this.instanceID+"_TreeDescription");if(description)
description.innerHTML=this.data.attrs.label_nothing_selected;}
if(hierLevel<7&&!currentRoot.dynamicLoadComplete)
{var isLeafIndex=(this.data.js.linkingOn&&this._dataType==="categories")?2:3;for(var i=0,tempNode;i<hierData.length;i++)
{tempNode=new YAHOO.widget.MenuNode(hierData[i][1],currentRoot,false);tempNode.hierValue=hierData[i][0];tempNode.href='javascript:void(0);';if(!hierData[i][isLeafIndex]||hierLevel===6)
{tempNode.dynamicLoadComplete=true;tempNode.iconMode=1;}}
currentRoot.loadComplete();}
if(hierData.length===0&&!this._selected)
{this._displaySelectedNodesAndClose();}
else if(this._selected)
{this._selected=false;}
else if(redisplaySelectedNode&&this._selectNode._selectedWidget)
{this._selectNode._selectedWidget=null;this._displaySelectedNodesAndClose();}},_getFiltersRequest:function(type,args)
{if(this._tree)
{this._eo.filters.data.reconstructData=[];if(this._currentIndex!==this._noValueNodeIndex)
{var currentNode=this._tree.getNodeByIndex(this._currentIndex||this._noValueNodeIndex),hierValues,level;this._eo.data.level=currentNode.depth+1;this._eo.data.label=currentNode.label;this._eo.data.value=currentNode.hierValue;while(currentNode&&!currentNode.isRoot())
{level=currentNode.depth+1;hierValues=this._eo.filters.data[0].slice(0,level).join(",");this._eo.filters.data.reconstructData.push({"level":level,"label":currentNode.label,"hierList":hierValues});currentNode=currentNode.parent;}
this._eo.filters.data.reconstructData.reverse();}
else
{this._eo.filters.data[0]=[];this._eo.data.value=0;}}
this._lastSearchValue=this._eo.filters.data[0].slice(0);RightNow.Event.fire("evt_searchFiltersResponse",this._eo);},_onResetRequest:function(type,args)
{if(this._tree&&RightNow.Event.isSameReportID(args,this.data.attrs.report_id)&&(args[0].data.name===this.data.js.searchName||args[0].data.name==="all"))
{if(args[0].data.name==="all"&&this._lastSearchValue)
{this._eo.filters.data[0]=this._lastSearchValue;this._currentIndex=this._tree.getNodeByProperty("hierValue",this._lastSearchValue[this._lastSearchValue.length-1]).index;}
else
{if(args[0].data.reset&&this.data.js.linkingOn&&this._dataType==="categories")
{this._buildTree();}
this._eo.filters.data[0]=[];this._currentIndex=this._noValueNodeIndex;}
this._displaySelectedNodesAndClose();}},_initializeFilter:function()
{this._eo.w_id=this.instanceID;this._eo.data.data_type=this._dataType=this.data.attrs.filter_type;this._eo.data.linking_on=this.data.js.linkingOn;this._eo.data.cache=[];this._eo.data.hm_type=this.data.js.hm_type;this._eo.data.linkingProduct=0;this._eo.filters={"rnSearchType":"menufilter","searchName":this.data.js.searchName,"report_id":this.data.attrs.report_id,"fltr_id":this.data.js.fltr_id,"oper_id":this.data.js.oper_id,"data":[]};this._eo.filters.data[0]=(this.data.js.initial)?this.data.js.initial:[];this._lastSearchValue=this._eo.filters.data[0].slice(0);if(this._dataType==="products")
{RightNow.UI.currentProduct=this._eo.filters.data[0][this._eo.filters.data[0].length-1];RightNow.UI.linkingOn=this.data.js.linkingOn;RightNow.UI.linkingFilter=this.data.attrs.filter_name;}},_initializeKeyBindings:function()
{if(!this._initializeKeyBindings._initialized){this._initializeKeyBindings._initialized=true;YAHOO.widget.TreeView.prototype._onKeyDownEvent=function(ev){var target=YAHOO.util.Event.getTarget(ev),node=this.getNodeByElement(target),newNode=node,KEY=YAHOO.util.KeyListener.KEY;switch(ev.keyCode){case KEY.UP:do{if(newNode.previousSibling){var currentNode=newNode.previousSibling;while(currentNode&&currentNode.expanded&&currentNode.children.length){currentNode=currentNode.children[currentNode.children.length-1];}
newNode=currentNode;}
else{newNode=newNode.parent;}}
while(newNode&&!newNode._canHaveFocus());if(newNode)
newNode.focus();YAHOO.util.Event.preventDefault(ev);break;case KEY.DOWN:do{if(newNode.children.length&&newNode.expanded){newNode=newNode.children[0];}
else if(newNode.nextSibling){newNode=newNode.nextSibling;}
else{var currentNode=newNode.parent;while(currentNode){if(currentNode.nextSibling){newNode=currentNode.nextSibling;break;}
else{currentNode=currentNode.parent;}}}}
while(newNode&&!newNode._canHaveFocus);if(newNode)
newNode.focus();YAHOO.util.Event.preventDefault(ev);break;case KEY.LEFT:node.collapse();YAHOO.util.Event.preventDefault(ev);break;case KEY.RIGHT:node.expand();YAHOO.util.Event.preventDefault(ev);break;case KEY.ENTER:case KEY.TAB:if(node.href){if(node.target){window.open(node.href,node.target);}
else{window.location(node.href);}}
else{node.toggle();}
this.fireEvent('enterKeyPressed',node);YAHOO.util.Event.preventDefault(ev);break;case KEY.HOME:newNode=this.getRoot();if(newNode.children.length)
newNode=newNode.children[0];if(newNode._canHaveFocus())
newNode.focus();YAHOO.util.Event.preventDefault(ev);break;case KEY.END:newNode=newNode.parent.children;newNode=newNode[newNode.length-1];if(newNode._canHaveFocus())
newNode.focus();YAHOO.util.Event.preventDefault(ev);break;case 107:if(ev.shiftKey){node.parent.expandAll();}
else{node.expand();}
break;case 109:if(ev.shiftKey){node.parent.collapseAll();}
else{node.collapse();}
break;default:break;}};}}};
RightNow.Widget.resultsHeading=function(data,instanceID){this.data=data;this.instanceID=instanceID;RightNow.Event.subscribe("evt_reportResponse",this._onReportChanged,this);};RightNow.Widget.resultsHeading.prototype={_onReportChanged:function(type,args)
{if(args[0].data&&args[0].data.report_id==this.data.attrs.report_id)
{var newData=args[0].data,resultQuery="",parameterList="";if(this.data.attrs.add_params_to_url!==""&&args[0].filters&&args[0].filters.allFilters&&args[0].filters.allFilters.format)
{var allFilters=RightNow.Lang.cloneObject(args[0].filters.allFilters);allFilters.format.parmList=this.data.attrs.add_params_to_url;parameterList=RightNow.Url.buildUrlLinkString(allFilters);}
if(newData.search_term)
{var stopWords=newData.stopword,noDictWords=newData.not_dict,searchTerms=newData.search_term.split(" "),displayedNoResultsMsg=false;for(var i=0,word,strippedWord;i<searchTerms.length;i++)
{word=searchTerms[i];strippedWord=word.replace(/\W/,"");if(stopWords&&strippedWord&&stopWords.indexOf(strippedWord)!==-1)
word="<strike title='"+this.data.attrs.label_common+"'>"+word+"</strike>";else if(noDictWords&&strippedWord&&noDictWords.indexOf(strippedWord)!==-1)
word="<strike title='"+this.data.attrs.label_dictionary+"'>"+word+"</strike>";else
word="<a href='"+RightNow.Url.addParameter(this.data.js.linkUrl+encodeURIComponent(word.replace(/\&amp;/g,"&"))+parameterList+"/search/1","session",RightNow.Url.getSession())+"'>"+word+"</a>";resultQuery+=word+" ";}
resultQuery=YAHOO.lang.trim(resultQuery);}
var noResultsDiv=document.getElementById("rn_"+this.instanceID+"_NoResults");if(noResultsDiv)
{if(newData.total_num===0&&resultQuery&&!newData.topics)
{noResultsDiv.innerHTML=this.data.attrs.label_no_results+"<br/><br/>"+this.data.attrs.label_no_results_suggestions;YAHOO.util.Dom.removeClass(noResultsDiv,"rn_Hidden");displayedNoResultsMsg=true;}
else
{YAHOO.util.Dom.addClass(noResultsDiv,"rn_Hidden");}}
var resultsDiv=document.getElementById("rn_"+this.instanceID+"_Results");if(resultsDiv)
{if(!displayedNoResultsMsg&&!newData.truncated)
{if(resultQuery.length>0){resultsDiv.innerHTML="for \""+resultQuery+"\"";YAHOO.util.Dom.addClass("topQuestions_"+this.instanceID,"rn_Hidden");YAHOO.util.Dom.removeClass("rn_"+this.instanceID,"rn_Hidden");YAHOO.util.Dom.removeClass("outer_"+this.instanceID+"_Results","rn_Hidden");YAHOO.util.Dom.removeClass(resultsDiv,"rn_Hidden");}else{resultsDiv.innerHTML=RightNow.Text.sprintf(this.data.attrs.label_results,newData.start_num,newData.end_num,newData.total_num);}}
else
{YAHOO.util.Dom.addClass(resultsDiv,"rn_Hidden");}}}}};
RightNow.Widget.Multiline2=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._contentName="rn_"+this.instanceID+"_Content";this._loadingName="rn_"+this.instanceID+"_Loading"
if(RightNow.Event.isHistoryManagerFragment())
this._setLoading(true);RightNow.Event.subscribe("evt_reportResponse",this._onReportChanged,this);RightNow.Event.subscribe("evt_searchInProgressRequest",this._searchInProgress,this);this._setFilter();RightNow.Event.fire("evt_setInitialFiltersRequest",this._eo);};RightNow.Widget.Multiline2.prototype={_setFilter:function()
{this._eo.w_id=this.instanceID;this._eo.filters={"report_id":this.data.attrs.report_id,"token":this.data.js.r_tok,"allFilters":this.data.js.filters,"format":this.data.js.format};this._eo.filters.format.parmList=this.data.attrs.add_params_to_url;},_searchInProgress:function(type,args)
{if(args[0].filters.report_id==this.data.attrs.report_id)
{document.body.setAttribute("aria-busy","true");this._setLoading(true);}},_setLoading:function(loading)
{if(loading)
{var element=document.getElementById(this._contentName);if(element)
{YAHOO.util.Dom.setStyle(element,"height",element.offsetHeight+"px");YAHOO.util.Dom.addClass(element,"rn_Hidden");if(!YAHOO.env.ua.ie){(new YAHOO.util.Anim(element,{opacity:{to:0}},0.4,YAHOO.util.Easing.easeIn)).animate();}
YAHOO.util.Dom.addClass(this._loadingName,"rn_Loading");}}
else
{YAHOO.util.Dom.removeClass(this._loadingName,"rn_Loading");YAHOO.util.Dom.removeClass(this._contentName,"rn_Hidden");if(!YAHOO.env.ua.ie){(new YAHOO.util.Anim(this._contentName,{opacity:{to:1}},0.4,YAHOO.util.Easing.easeIn)).animate();}}},_onReportChanged:function(type,args)
{var newdata=args[0].data;this._setLoading(false);if(newdata.report_id==this.data.attrs.report_id)
{var currentPageSize=newdata.per_page;var cols=newdata.headers.length;var str="";var report=document.getElementById(this._contentName);if(!report)
return;if(newdata.total_num>0)
{if(newdata.row_num)
str+='<ol start="'+newdata.start_num+'">';else
str+='<ul>';for(var i=0;i<currentPageSize;i++)
{str+='<li>';newdata.data[i][2]=newdata.data[i][2].replace(/ [a-z]+?$/,"...");str+='<span class="rn_Element1">'+newdata.data[i][0]+'&nbsp;</span>';str+=(newdata.data[i][1])?'<span class="rn_Element2">'+newdata.data[i][1]+'</span>':'';str+='<br/>';str+=(newdata.data[i][2])?'<span class="rn_Element3">'+newdata.data[i][2]+'</span>':'';str+=(newdata.data[i][3])?'&nbsp;<span class="rn_Element3"><a href="/app/answers/detail/a_id/'+newdata.data[i][3]+'">read more</a></span>':'';str+='</li>';}
if(newdata.row_num)
str+='</ol>';else
str+='<ul>';report.innerHTML=str;}
else
{report.innerHTML="";}
YAHOO.util.Dom.setStyle(report,"height","auto");RightNow.Url.transformLinks(report);document.body.setAttribute("aria-busy","false");var anchors=report.getElementsByTagName('a');if(anchors&&anchors[0])
anchors[0].focus();}}};
RightNow.Widget.ResultInfo2=function(data,instanceID){this.data=data;this.instanceID=instanceID;RightNow.Event.subscribe("evt_reportResponse",this._onReportChanged,this);};RightNow.Widget.ResultInfo2.prototype={_onReportChanged:function(type,args)
{if(args[0].data&&args[0].data.report_id==this.data.attrs.report_id)
{var newData=args[0].data,resultQuery="",parameterList="";if(this.data.attrs.add_params_to_url!==""&&args[0].filters&&args[0].filters.allFilters&&args[0].filters.allFilters.format)
{var allFilters=RightNow.Lang.cloneObject(args[0].filters.allFilters);allFilters.format.parmList=this.data.attrs.add_params_to_url;parameterList=RightNow.Url.buildUrlLinkString(allFilters);}
if(newData.search_term)
{var stopWords=newData.stopword,noDictWords=newData.not_dict,searchTerms=newData.search_term.split(" "),displayedNoResultsMsg=false;for(var i=0,word,strippedWord;i<searchTerms.length;i++)
{word=searchTerms[i];strippedWord=word.replace(/\W/,"");if(stopWords&&strippedWord&&stopWords.indexOf(strippedWord)!==-1)
word="<strike title='"+this.data.attrs.label_common+"'>"+word+"</strike>";else if(noDictWords&&strippedWord&&noDictWords.indexOf(strippedWord)!==-1)
word="<strike title='"+this.data.attrs.label_dictionary+"'>"+word+"</strike>";else
word="<a href='"+RightNow.Url.addParameter(this.data.js.linkUrl+encodeURIComponent(word.replace(/\&amp;/g,"&"))+parameterList+"/search/1","session",RightNow.Url.getSession())+"'>"+word+"</a>";resultQuery+=word+" ";}
resultQuery=YAHOO.lang.trim(resultQuery);}
var suggestedDiv=document.getElementById("rn_"+this.instanceID+"_Suggestion");if(suggestedDiv)
{if(newData.ss_data)
{var links=this.data.attrs.label_suggestion+" ";for(var i=0;i<newData.ss_data.length;i++)
links+='<a href="'+this.data.js.linkUrl+newData.ss_data[i]+parameterList+'">'+newData.ss_data[i]+'</a>&nbsp;';suggestedDiv.innerHTML=links;YAHOO.util.Dom.removeClass(suggestedDiv,"rn_Hidden");}
else
{YAHOO.util.Dom.addClass(suggestedDiv,"rn_Hidden");}}
var spellingDiv=document.getElementById("rn_"+this.instanceID+"_Spell");if(spellingDiv)
{if(newData.spelling)
{spellingDiv.innerHTML=this.data.attrs.label_spell+' <a href="'+this.data.js.linkUrl+newData.spelling+parameterList+'">'+newData.spelling+' </a>';YAHOO.util.Dom.removeClass(spellingDiv,"rn_Hidden");}
else
{YAHOO.util.Dom.addClass(spellingDiv,"rn_Hidden");}}
var noResultsDiv=document.getElementById("rn_"+this.instanceID+"_NoResults");if(noResultsDiv)
{if(newData.total_num===0&&resultQuery&&!newData.topics)
{noResultsDiv.innerHTML=this.data.attrs.label_no_results+"<br/><br/>"+this.data.attrs.label_no_results_suggestions;YAHOO.util.Dom.removeClass(noResultsDiv,"rn_Hidden");displayedNoResultsMsg=true;}
else
{YAHOO.util.Dom.addClass(noResultsDiv,"rn_Hidden");}}
var resultsDiv=document.getElementById("rn_"+this.instanceID+"_Results");if(resultsDiv)
{if(!displayedNoResultsMsg&&!newData.truncated)
{if(resultQuery.length>0)
resultsDiv.innerHTML=RightNow.Text.sprintf(this.data.attrs.label_results,newData.start_num,newData.end_num,newData.total_num);else
resultsDiv.innerHTML=RightNow.Text.sprintf(this.data.attrs.label_results,newData.start_num,newData.end_num,newData.total_num);YAHOO.util.Dom.removeClass(resultsDiv,"rn_Hidden");}
else
{YAHOO.util.Dom.addClass(resultsDiv,"rn_Hidden");}}}}};
RightNow.Widget.Paginator=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._currentPage=this.data.js.currentPage;RightNow.Event.subscribe("evt_reportResponse",this._onReportChanged,this);for(var i=this.data.js.startPage;i<=this.data.js.endPage;i++)
{YAHOO.util.Event.addListener("rn_"+this.instanceID+"_PageLink_"+i,"click",this._onPageChange,i,this);}
YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Forward","click",this._onForward,null,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Back","click",this._onBack,null,this);this._setFilters();};RightNow.Widget.Paginator.prototype={_setFilters:function()
{this._eo.w_id=this.data.info.w_id;this._eo.data.per_page=this.data.attrs.per_page;this._eo.data.page=this._currentPage;this._eo.filters.report_id=this.data.attrs.report_id;},_onPageChange:function(evt,pageNumber)
{YAHOO.util.Event.preventDefault(evt);if(this._currentlyChangingPage||!pageNumber||pageNumber===this._currentPage)
return;this._currentlyChangingPage=true;RightNow.Event.fire("evt_searchInProgressRequest",this._eo);pageNumber=(pageNumber<1)?1:pageNumber;this._eo.data.page=this._currentPage=pageNumber;RightNow.Event.fire("evt_pageRequest",this._eo);},_onForward:function(evt)
{YAHOO.util.Event.preventDefault(evt);if(this._currentlyChangingPage)return;this._currentlyChangingPage=true;RightNow.Event.fire("evt_searchInProgressRequest",this._eo);this._currentPage++;this._eo.data.page=this._currentPage;RightNow.Event.fire("evt_pageRequest",this._eo);},_onBack:function(evt)
{YAHOO.util.Event.preventDefault(evt);if(this._currentlyChangingPage)return;this._currentlyChangingPage=true;RightNow.Event.fire("evt_searchInProgressRequest",this._eo);this._currentPage--;this._eo.data.page=this._currentPage;RightNow.Event.fire("evt_pageRequest",this._eo);},_onReportChanged:function(type,args)
{var newData=args[0];newData=newData.data;if(args[0].filters.report_id==this.data.attrs.report_id)
{this._currentPage=newData.page;var totalPages=newData.total_pages;if(totalPages<2||newData.truncated)
YAHOO.util.Dom.addClass("rn_"+this.instanceID,"rn_Hidden");else
{var pagesContainer=document.getElementById("rn_"+this.instanceID+"_Pages");if(pagesContainer)
{pagesContainer.innerHTML="";var startPage,endPage;if(this.data.attrs.maximum_page_links===0)
startPage=endPage=this._currentPage;else if(totalPages>this.data.attrs.maximum_page_links)
{var split=Math.round(this.data.attrs.maximum_page_links/2);if(this._currentPage<=split)
{startPage=1;endPage=this.data.attrs.maximum_page_links;}
else
{var offsetFromMiddle=this._currentPage-split;var maxOffset=offsetFromMiddle+this.data.attrs.maximum_page_links;if(maxOffset<=newData.total_pages)
{startPage=1+offsetFromMiddle;endPage=maxOffset;}
else
{startPage=newData.total_pages-(this.data.attrs.maximum_page_links-1);endPage=newData.total_pages;}}}
else
{startPage=1;endPage=totalPages;}
for(var i=startPage,link,titleString;i<=endPage;i++)
{if(i===this._currentPage)
{link=document.createElement("span");YAHOO.util.Dom.addClass(link,"rn_CurrentPage");link.innerHTML=i;titleString=this.data.attrs.label_page;if(titleString)
{titleString=titleString.replace(/%s/,'<strong>'+i+'</strong>');titleString=titleString.replace(/%s/,'<strong>'+newData.total_pages+'</strong>');link.title=titleString;}}
else
{link=document.createElement("a");link.id="rn_"+this.instanceID+"_PageLink_"+i;link.href=this.data.js.pageUrl+i;link.innerHTML=i;}
pagesContainer.innerHTML=titleString;YAHOO.util.Event.addListener(link,"click",this._onPageChange,i,this);}
YAHOO.util.Dom.removeClass("rn_"+this.instanceID,"rn_Hidden");}}
var forwardButton=document.getElementById("rn_"+this.instanceID+"_Forward");if(forwardButton)
{if(newData.total_pages>newData.page)
{YAHOO.util.Dom.removeClass(forwardButton,"rn_Hidden");forwardButton.href=this.data.js.pageUrl+(this._currentPage+1);}
else
YAHOO.util.Dom.addClass(forwardButton,"rn_Hidden","rn_Hidden");}
var backButton=document.getElementById("rn_"+this.instanceID+"_Back");if(backButton)
{if(newData.page>1)
{YAHOO.util.Dom.removeClass(backButton,"rn_Hidden");backButton.href=this.data.js.pageUrl+(this._currentPage-1);}
else
YAHOO.util.Dom.addClass(backButton,"rn_Hidden");}}
this._currentlyChangingPage=false;}};
RightNow.Widget.TopX=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();};RightNow.Widget.TopX.prototype={};