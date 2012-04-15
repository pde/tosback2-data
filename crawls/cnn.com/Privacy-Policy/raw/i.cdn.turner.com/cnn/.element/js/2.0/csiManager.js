function CSIManager()
{
	if (CSIManager.caller != CSIManager.getInstance)
	{
		if((navigator.userAgent.indexOf('Safari')==-1) && (navigator.userAgent.indexOf('Opera')==-1))
		{
			throw new Error("There is no public constructor for CSIManager.");
		}
	}

	this.CSIObjects = new Array();
	this.delayedCSIList = new Array();
	this.domIDConfig = new Array();
	this.domOnLoad = new Array();
	this.domOnBeforeLoad = new Array();
	this.useDelayedCSI = false;
	this.numberofRequests = 0;
	var currTime = new Date();
	this.iframeOffset=0;
	this.queueAllCalls = false;
	this.queuedCallArray = new Array();
	
	var localUserAgent = navigator.userAgent.toLowerCase();
	if((localUserAgent.indexOf('msie')>-1) && (localUserAgent.indexOf('mac')>-1))
	{
		this.useDelayedCSI = true;
	}
	
	this.dojoSupport = (typeof dojo=="undefined")?false:true;
	this.prototypeSupport = (typeof Prototype=="undefined")?false:true;
	this.noFramework = (!this.dojoSupport && !this.prototypeSupport)?true:false;
	
	var csiMgr = this;
	var csiManagerOnLoad = function()
	{
		csiMgr.initialize();
	}
	
	var csiManagerShow = function(evt)
	{
		if(evt.persisted)
		{
			window.setTimeout('CSIManager.getInstance().delayedProcessing();',2000);
		}
	}
	
	if (this.prototypeSupport) 
	{
		Event.observe(window, 'load', csiManagerOnLoad);
		Event.observe(window, 'pageshow', csiManagerShow);
	}
	else if (this.dojoSupport) {dojo.addOnLoad(csiManagerOnLoad);}
	else if (this.noFramework)
	{
		if (window.addEventListener) // Firefox/DOm
		{
			window.addEventListener("load", csiManagerOnLoad, false);
			window.addEventListener("pageshow", csiManagerShow, false);
		}
		else if (window.attachEvent) // IE
		{
			window.attachEvent("onload", csiManagerOnLoad);
		}
		else // Older
		{
			var tempOnLoad = null;
			if (window.onload) tempOnLoad = window.onload;
			window.onload = function() 
			{
				csiManagerOnLoad();
				if (tempOnLoad!=null) tempOnLoad();
			}
		}
	}
}

CSIManager.prototype.initialize = function()
{

	if(!this.useDelayedCSI)
	{
		this.queueAllCalls = true;
		var lastDiv = document.createElement("div");
		lastDiv.setAttribute("id","csimanagerdiv");
		document.body.appendChild(lastDiv);
		var lastDiv = document.createElement("div");
		lastDiv.setAttribute("id","csimanagerdivdelayed");
		document.body.appendChild(lastDiv);
		this.useDelayedCSI = true;
		this.queueAllCalls = false;
		this.processAnyQueuedCalls();
		this.queuedCallArray = null;
	}
}

CSIManager.prototype.processAnyQueuedCalls = function ()
{
	if(this.queuedCallArray && this.queuedCallArray!=null)
	{
		for(var qCounter=0;qCounter<this.queuedCallArray.length;qCounter++)
		{
			var queuedObj = this.queuedCallArray[qCounter];
			this.queuedCallArray[qCounter] = '';
			if(queuedObj)
			{
				this.call(queuedObj.url, queuedObj.args, queuedObj.domId, queuedObj.funcObj, queuedObj.breakCache, queuedObj.overrideID);
			}
		}
	}
}

CSIManager.__instance__ = null;  //define the static property

CSIManager.getInstance = function () 
{
	if (this.__instance__ == null) 
	{
		this.__instance__ = new CSIManager();
	}
	return this.__instance__;
}

CSIManager.prototype.addOnLoadById = function( id, func)
{
	var arr = this.domOnLoad[ id ];
	if(!arr) { arr = new Array(); }
	arr.push(func);
	this.domOnLoad[ id ] = arr;
}

CSIManager.prototype.addOnBeforeLoadById = function( id, func)
{
	var arr = this.domOnBeforeLoad[ id ];
	if(!arr) { arr = new Array(); }
	arr.push(func);
	this.domOnBeforeLoad[ id ] = arr;
}

CSIManager.prototype.setConfigForId = function (id, obj)
{
	this.domIDConfig[id] = obj;
}

CSIManager.prototype.getConfigForId = function (id)
{
	var retObj = this.domIDConfig[id];
	if(!retObj) { retObj = new Object();}
	return retObj;
}


CSIManager.prototype.call = function (url, args, domId, funcObj, breakCache, overrideID, forcediframe)
{
	// Let's look to see the documentState is complete but the useDelayedCSI flag hasn't been set yet. If so then initialize the manager
	if((!this.useDelayedCSI)  && (document && document.readyState && (document.readyState=='complete')))
	{
		this.initialize();
	}
	if(forcediframe === undefined || forcediframe === false) { 
		forcediframe = false;
		
		if(url.indexOf('http')==0){
			forcediframe = true;
			if(url.indexOf(window.location.hostname) > -1){
				forcediframe = false;
			}
		}
	}
	if(this.queueAllCalls)
	{
		var queuedObj = new Object();
		queuedObj.url = url;
		queuedObj.args = args;
		queuedObj.domId = domId;
		queuedObj.funcObj = funcObj;
		queuedObj.breakCache = breakCache;
		queuedObj.overrideId = overrideId;
		this.queuedCallArray.push(queuedObj)
	}
	else
	{
		this.numberofRequests++;
		var internalDomId = 'csi'+(this.iframeOffset+this.numberofRequests);
		if(overrideID)
		{
			internalDomId = overrideID;
		}
		var domList = new Array();
		var functionList = new Array();
		if(url.indexOf(document.domain)==-1 && url.indexOf('http') > -1) { return false;}
		if(domId.join)
		{
			domList = domId;
		}
		else
		{
			domList.push(domId);
		}
		
		if(funcObj)
		{
			if(funcObj.join)
			{
				functionList = funcObj;
			}
			else
			{
				functionList.push(funcObj);
			}
		}
		this.CSIObjects[internalDomId] = {
			functionList: functionList,
			dom: domList,
			url: url,
			args: args,
			csiRequestNum:this.numberofRequests,
			disableCache: breakCache
		};
		
		var newCSI = new Object();
		newCSI.src = url;
		newCSI.id  = internalDomId;
		newCSI.domId  = domList;
		newCSI.args = args;
		newCSI.breakCache = breakCache;
		newCSI.csiRequestNum=this.numberofRequests;
		this.delayedCSIList[this.delayedCSIList.length]=newCSI;
		
		var today = new Date();
		var currTime = today.getTime()%60;
		var iframeArgs = ( breakCache ) ? 'time='+currTime : '';
		if (args)
		{
			iframeArgs = ( iframeArgs ) ? iframeArgs+'&' : '';
			iframeArgs+= args;
		}
		if(forcediframe === false)
		{
			try
			{
				if (funcObj)
				{
					var xhrObject = null;
					if (this.dojoSupport)
					{
						try
						{
							if (navigator.userAgent.toLowerCase().indexOf("msie 7.0")!=-1) throw new Error("NoDojoSupport");
							var bindArgs = {
								url:		url+'?'+iframeArgs+'&csiID='+internalDomId,
								mimetype:	"text/html",
								transport:	"IframeTransport"
							};
							xhrObject = dojo.io.bind(bindArgs);
						}
						catch(err)
						{
							throw new Error("DojoFailure");
						}
					}
					else if (this.prototypeSupport)
					{
						try
						{
							if (navigator.userAgent.toLowerCase().indexOf("safari")!=-1) throw new Error("SafariCrossDomainFailure");
							var csiMgr = this;
							xhrObject = new Ajax.Request(
								url,
								{
									method:		"get",
									parameters:	iframeArgs+"&csiID="+internalDomId,
									onComplete: function(response) 
												{
													// Response must be either text/xml or text/plain.
													// Using text/plain, and doing string manipulation to
													// turn into JSON.
													if(response && response.responseText && response.responseText.indexOf('<textarea id="jsCode">')!=-1)
													{
														var startStr = '<textarea id="jsCode">';
														var startPos = response.responseText.indexOf(startStr)+startStr.length;
														var myCode = response.responseText.slice(startPos,response.responseText.indexOf('</textarea>'));
														var obj = eval('('+myCode+')');
														csiMgr.callBackJS(obj,internalDomId);
													}
													if(response && (!response.responseText))
													{
														CSIManager.getInstance().call(url, args, domId, funcObj, breakCache, overrideID, true);
													}
												},
									onException:function(x,o)
												{
													throw new Error("PrototypeException for url ["+url+"]: "+o.messageText);
												},
									onFailure:	function(x,o)
												{
													throw new Error("PrototypeFailure");
												}
								}
							);
						}
						catch(err)
						{
							throw new Error("PrototypeFailure");
						}
					}
					else 
					{
						throw new Error("NoXHRFramework");
					}
				}
				else 
				{
					throw new Error("NoCallBackFunction");
				}
			}
			catch(err)
			{
				forcediframe=true;
			}
		}
		if(forcediframe)
		{
			if (this.useDelayedCSI) 
			{
				var realIframeUrl=url+"?"+iframeArgs+"&csiID="+internalDomId;
				var iframeObj = document.createElement('iframe');
				iframeObj.setAttribute('src',realIframeUrl );
				iframeObj.setAttribute('id','csiDataIframe'+internalDomId );
				iframeObj.setAttribute('name','csiDataIframe'+internalDomId );
				iframeObj.setAttribute('width','10');
				iframeObj.setAttribute('height','10');
				iframeObj.setAttribute('style','visibility:hidden;position:absolute;top:0px;left:-100px;');
				iframeObj.style.top='0px';
				iframeObj.style.left='-100px';
				iframeObj.style.position='absolute';
				var containerDiv = document.createElement('div');
				containerDiv.setAttribute('id','csiIframeObjs'+internalDomId);
				containerDiv.appendChild(iframeObj);
				if(document.getElementById("csimanagerdiv"))
				{
					document.getElementById("csimanagerdiv").appendChild(containerDiv);
					// This is a hack to work around IE not wanting to set iframe's src reliably after the dom has been loaded
					if(navigator.userAgent.indexOf('MSIE')!=-1)
					{
						window.setTimeout("var tmpIframObj=document.getElementById('csiDataIframe"+internalDomId+"');if(tmpIframObj.readyState=='uninitialized'){tmpIframObj.src=tmpIframObj.getAttribute('src');tmpIframObj.position='absolute';tmpIframObj.style.left='-100px';}",500)
					}
				}
			}
			else
			{
				var iframeHtmlSrc='<div id="csiIframeObjs'+internalDomId+'"><iframe src="'+url+'?'+iframeArgs+'&csiID='+internalDomId+'" name="csiDataIframe'+internalDomId+'" id="csiDataIframe'+internalDomId+'" width="10" height="10" style="visibility:hidden;position:absolute;top:0px;left:-100px;"></iframe></div>';
				document.write(iframeHtmlSrc);
			}
		}
	}
}


CSIManager.prototype.callBackHtml = function(html, id)
{
	var htmlContainerObj = false;
	if(document.getElementById) 
	{ 
		htmlContainerObj = document.getElementById( id ); 
		if(!htmlContainerObj)
		{
			if(this.CSIObjects[id] && this.CSIObjects[id].dom)
			{
				id = this.CSIObjects[id].dom;
				htmlContainerObj = document.getElementById( id ); 
			}
		}
	}
	else if(document.all) 
	{ 
		htmlContainerObj = document.all[id];
		if(!htmlContainerObj)
		{
			if(this.CSIObjects[id] && this.CSIObjects[id].dom)
			{
				id = this.CSIObjects[id].dom;
				htmlContainerObj = document.all[ id]; 
			}
		}
	}
	if(htmlContainerObj)
	{
		htmlContainerObj.innerHTML = html;
	}
	//force a refresh of the content area
	var htmlContentArea = 0;//document.body;
	if(htmlContentArea)
	{
		var previousTopVal = htmlContentArea.style.top || '0px';
		htmlContentArea.style.top = '1px';
		htmlContentArea.style.top = previousTopVal;
	}
}

CSIManager.prototype.callBackJS = function(jsonObj, csiID)
{
	if( this.CSIObjects[csiID] )
	{
		var functionList = this.CSIObjects[csiID].functionList;
		var domList = this.CSIObjects[csiID].dom;
		if(functionList)
		{
			var functionLength = functionList.length;
			var domListLength = domList.length;
			if(functionLength!=domListLength)
			{
				if(domListLength<functionLength)
				{
					var lastDomID = domList[domListLength-1];
					for(var i=domListLength;i<functionLength;i++)
					{
						domList.push(lastDomID);
					}
					domListLength = domList.length;
				}
				else
				{
					var lastFunctionObj = functionList[functionLength-1];
					for(var i=functionLength;i<domListLength;i++)
					{
						functionList.push(lastFunctionObj);
					}
					functionLength = functionList.length;
				}
			}
	
			for(var fCounter=0;fCounter<functionList.length;fCounter++)
			{
				var funcCall = functionList[ fCounter];
				if(funcCall)
				{
					var configObj = this.getConfigForId( domList[fCounter] );
					var beforeLoadFuncArr = this.domOnBeforeLoad [ domList[fCounter] ];
					if(beforeLoadFuncArr)
					{
						for(var i=0;i<beforeLoadFuncArr.length;i++)
						{
							var realFunc = beforeLoadFuncArr[i];
							realFunc(jsonObj, domList[fCounter], configObj );
						}
					}
					this.callBackHtml(funcCall(jsonObj, domList[ fCounter], configObj), domList[ fCounter] );
					var onLoadFunctionArr = this.domOnLoad [ domList[fCounter] ];
					if(onLoadFunctionArr)
					{
						for(var i=0;i<onLoadFunctionArr.length;i++)
						{
							var realFunc = onLoadFunctionArr[i];
							realFunc(jsonObj, domList[fCounter], configObj );
						}
					}
				}
			}
			this.CSIObjects[csiID]= '';
		}
	}
}

CSIManager.prototype.delayedProcessing = function()
{
	if(document.body && document.body.innerHTML && this.useDelayedCSI)
	{
		var iframeOwner = document.getElementById( 'csimanagerdivdelayed' ) || document.all[ 'csimanagerdivdelayed' ];
		var iframeHtmlSrc = '';
		
		for(var incCounter=0;incCounter<this.delayedCSIList.length;incCounter++)
		{
			var src = this.delayedCSIList[incCounter].src;
			var id = this.delayedCSIList[incCounter].id;
			var today = new Date();
			var breakCache = this.delayedCSIList[incCounter].breakCache;
			var currTime = today.getTime() % 60;
			var args = ( breakCache ) ? '&time='+currTime : '';
			if(this.delayedCSIList[incCounter].args)
			{
				args=args+'&'+this.delayedCSIList[incCounter].args;
			}
			
			iframeHtmlSrc+='<iframe src="'+src+'?csiID='+id+args+'" name="csiDataIframe'+id+'" id="csiDataIframe'+id+'" width="10" height="10" style="visibility:hidden;position:absolute;top:0px;left:-100px;"></iframe>';
		}
		if(iframeOwner)
		{
			iframeOwner.innerHTML=iframeHtmlSrc;
		
		}
	}
}

CSIManager.prototype.handleClientData = function(cliWinbj, cliDoc)
{
	var docId = '';
	var paramStr = cliWinbj.location.hash;
	if(!paramStr)
	{
		paramStr = cliWinbj.location.search.substring(1);
	}
	
	var queryId = '';
	var keyValPairs = paramStr.split('&');
	if(!keyValPairs)
	{
		keyValPairs = new Array();
		keyValPairs[keyValPairs.length]=query;
	}
	for(var counter=0;counter<keyValPairs.length;counter++) 
	{
		var keyVal = keyValPairs[counter].split('=');

		if(keyVal[0]=='csiID') 
		{
			queryId = keyVal[1];
			counter = keyValPairs.length+1
		}
	}

	var wId = '';
	if(cliWinbj.name && (cliWinbj.name.indexOf('csiDataIframe')==0))
	{
		wId = cliWinbj.name.substring(13);
	}
	if(wId=='' && cliWinbj.frameElement && cliWinbj.frameElement.id  && (cliWinbj.frameElement.id.indexOf('csiDataIframe')==0))
	{
		wId = cliWinbj.frameElement.id.substring(13);
		
	}
	docId = wId;
	if(cliDoc.mainForm.htmlArea && cliDoc.mainForm.htmlArea.value) 
 	{
		var rawHtml = cliDoc.mainForm.htmlArea.value;
		if(rawHtml) 
	 	{
			top.CSIManager.getInstance().callBackHtml(rawHtml, docId);
		}
	}
	else  if(cliDoc.mainForm.jsCode.value) 
 	{
		var rawJS = cliDoc.mainForm.jsCode.value;
		if(rawJS) 
	 	{
			top.CSIManager.getInstance().callBackJS( eval('('+rawJS+')'), docId);
		}
	}
}

CSIManager.getInstance();
