var nitroProtocol = "http";
if( document.location.toString().indexOf( 'https://' ) != -1 ) {
	nitroProtocol = "https";
}
if (typeof nitroLibsVersion == "undefined") {
	nitroLibsVersion = "current";	
}	


if (typeof Nitro=="undefined") {
	function Nitro(connectionParams) {

		if (typeof Nitro.counter == "undefined") {
			Nitro.counter = 0;			
		}
		if (typeof Nitro.instances == "undefined") {
			Nitro.instances = new Array();			
		}
		if (typeof Nitro.divCounter == "undefined") {
			Nitro.divCounter = 0;	
		}
		
		this.counterId = Nitro.counter ++;
		var twitterEnabled = null;	
		var twitterLoginUrl = null;
		var facebookEnabled = null;
		var facebookLoginUrl = null;
		var paymentOptions = null;
		var paymentMethods = null;
		
		Nitro.instances.push(this);
		
		this.connectionParams = connectionParams;
		if (typeof this.connectionParams.debug == "undefined") {
			this.connectionParams.debug = false;
		}
		Nitro.debug = this.connectionParams.debug;
		this.jsConnector = new NitroJSConnector(connectionParams);
		
		//asynchronous since this object doesn't exist until the closing bracket
		var thisObj = this;
		setTimeout(function() {thisObj.handleRedirects();}, 250);
		
		this.getUserId = function (callback) {
			return NitroCookies.getUserId(this.connectionParams.apiKey, callback);
		}
		
		Nitro.getUserId = function (apiKey, callback) {
			return NitroCookies.getUserId(apiKey, callback);	
		}
		
		this.setUserId = function (value) {
			NitroCookies.setUserId(this.connectionParams.apiKey, value, true, false);
		}
		
		this.showPendingNotifications = function(callback, asyncToken, returnCount) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.showPendingNotifications(this.connectionParams, callback, asyncToken, returnCount);
		}
		Nitro.showPendingNotificationsNoCallback = function(callback, asyncToken) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
			return instance.showPendingNotifications();
		}		
		this.showNotificationsByName = function(notificationNames, callback, asyncToken, previewMode) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.showNotificationsByName(this.connectionParams, notificationNames, callback, asyncToken, previewMode);
		}
		this.getNotificationsFeed = function(callback, asyncToken, userIds, returnCount) {
			NitroNotifier.jsConnector = this.jsConnector;
			return NitroNotifier.getNotificationsFeed(this.connectionParams, callback, asyncToken, userIds, returnCount);
		}
		this.callAPI = function (params, callback, asyncToken, addUserId, noSessionKey) {
			return this.jsConnector.callAPI(params, callback, asyncToken, addUserId, noSessionKey);
		}	
		Nitro.callAPI = function (params, callback, asyncToken, addUserId, noSessionKey) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
			return instance.callAPI(params, callback, asyncToken, addUserId, noSessionKey);
		}
		this.logAction = function (tags, value) {
		  	this.jsConnector.callAPI("method=user.logAction&tags="+tags+(value ? '&value='+value : ''), "Nitro.processLogAction", this.counterId, true);
		}
		Nitro.logAction = function (tags, value, target, asyncToken) {
			var instance = Nitro.getInstanceForCounter(asyncToken);			
		  	instance.jsConnector.callAPI("method=user.logAction&tags="+tags+(value ? '&value='+value : '')+(target ? '&target='+target : ''), "Nitro.processLogAction", this.counterId, true);
		}
		
		Nitro.getInstanceForResponse = function(data, counterId) {
			if (data == null) {
				if (Nitro.debug) {
					alert ('Error');
				}
				return;
			}
			if (data.Nitro.res == "err") {
				if (Nitro.debug) {
					alert (data.Nitro.Error.Message);
				}
				return;
			}
			
			return Nitro.getInstanceForCounter(counterId);
		}
		
		Nitro.getInstanceForCounter = function(counterId) {
			for (var i = 0; i < Nitro.instances.length; i++) {
				if (Nitro.instances[i].counterId == counterId) {
					return Nitro.instances[i];
				}
			}
			return null;
		}		
		
		Nitro.processLogAction = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);
			// copy over session key to avoid extra login
			instance.connectionParams.sessionKey = instance.jsConnector.connectionParams.sessionKey;	
			NitroNotifier.jsConnector = this.jsConnector;
			NitroNotifier.showPendingNotifications(instance.connectionParams);
		}
		
		this.embedWidget = function(embedNames,divId,owner) {
			if (owner == null) {
				owner = "";	
			}
			if (this.jsConnector.connectionParams.userId == null) {
				var _self = this;
				setTimeout(function(){
					_self.embedWidget(embedNames,owner);
				}, this.retryEmbedInterval);
				return;			 
			}

			this.callAPI("method=user.getWidgetEmbeds&embedNames=" + embedNames, "Nitro.processGetWidgetEmbeds", this.counterId + "|" + divId + "|" + owner);
		}
		
		Nitro.processGetWidgetEmbeds = function(data, token) {
			var cId = token.split("|")[0];
			var instance = Nitro.getInstanceForResponse(data,cId);			
			instance.embedWidgetWithParams(data, token.split("|")[1], token.split("|")[2]);
		}
		
		this.embedWidgetWithParams = function(data, divId, owner) {
			var viewerId = this.jsConnector.connectionParams.userId;
			var ownerId = this.jsConnector.connectionParams.userId;		
			if (owner != null && owner != "") {
				ownerId = owner;	
			}
			var server = this.connectionParams.server.replace("/json", "/xml");
			
			var embedsArray = this.makeArray(data.Nitro.widgetEmbeds.WidgetEmbed);
			if (typeof embedsArray == "undefined") {
				return;	
			}
			
			for (var i=0; i < embedsArray.length; i++) {
				var embed = embedsArray[i];
				var type = embed.type;
				
				if(this.args && this.args[divId]) {
					var args = this.args[divId];
				}else  {
					var args = {};
				}
				args.apiKey=this.connectionParams.apiKey;
				args.server=server;
				args.ownerId=ownerId;
				args.viewerId=viewerId;
				args.divId=divId;
				args.nitroInstanceId=this.counterId;
					
				if (typeof this.connectionParams.timeStamp != "undefined") {
					args.timeStamp = this.connectionParams.timeStamp;
					args.signature = this.connectionParams.signature;
				}
				if (typeof this.connectionParams.sessionKey != "undefined") {
					args.sessionKey = this.connectionParams.sessionKey;				
				}

				var div = document.getElementById(divId);
				var attrs = div.attributes;

				/* precedence of params is
					1) Specified already in the args param
					2) Specified in the element tag via NML
					3) Specified in Nitro via the AdminUI
				*/
				var paramsArray = this.makeArray(embed.embedParams.WidgetEmbedParam);
				if (typeof paramsArray != "undefined") {
					for (var j=0; j < paramsArray.length; j++) {
						var param = paramsArray[j];
						//if the flashVar is not already set
						if(typeof args[param.name] == 'undefined') {
							//sets flashVars that came down from Nitro 
							if (param.value != null && param.value != "") {
								args[param.name] = param.value;
							}
							//overwrites those flashVars if they are specified via NML
							for(var k=attrs.length-1; k>=0; k--) {
								if (attrs[k].value == null || attrs[k].value == "null") {
									continue;
								}
								if (attrs[k].name.toLowerCase() == param.name.toLowerCase()) {
									args[param.name] = attrs[k].value;	
								}
							}
						}
					}
				}
				
				nitroWidget.embed(type, args);
			}
		}
		this.makeArray = function(obj) {
			if (typeof obj != "undefined" && typeof obj.length == "undefined") {
				return [obj];
			}
			return obj;
		}
		Nitro.isString = function() {
			if (typeof arguments[0] == 'string') 
				return true;
			if (typeof arguments[0] == 'object') {  
				var criterion = arguments[0].constructor.toString().match(/string/i); 
				return (criterion != null);  
			}
			return false;
		}		
		this.getElementForClass = function(className) {
			var all = document.all ? document.all :
			document.getElementsByTagName('*');
			var elements = new Array();
			for (var e = 0; e < all.length; e++)
				if (all[e].className.indexOf(className) != -1)
					elements[elements.length] = all[e];
			return elements;
		}
						
		this.addClass = function(elem, clazz) {
			if(!elem.className)
				elem.className = "";
			if(elem.className.indexOf(clazz) == -1) {
				elem.className+= " " + clazz;
			}
		}	
						
		this.removeClass = function(elem, clazz) {
			elem.className = elem.className ? elem.className.replace(clazz,'') : '';
		}		

		this.retryEmbedInterval = 10;
		
		this.refreshNML = function(primaryNMLThread) {
			if (this.jsConnector.connectionParams.sessionKey == null) {
				var _self = this;
				setTimeout(function(){
					_self.refreshNML();
				}, this.retryEmbedInterval);
				return;			 
			}
			
     		var items = document.getElementsByTagName("*");
		    var i=items.length;
			var elem;
			
			// look for tests first
			var testsToReplace = new Array();
			var testGroup = this.jsConnector.connectionParams.abTestGroup;
			if (typeof testGroup == "undefined" || testGroup == null || testGroup == "") {
				testGroup = "content";	
			}
			while (i > 0) {
				i--;
				elem = items[i];
				if (this.isNitroNode(elem, "block")) {
					var children = elem.getElementsByTagName("*");
					var childToUse = null;
					for (var j = 0; j < children.length; j++) {  
						var child = children[j];
						if (this.isNitroNode(child, testGroup)) {
							childToUse = child;
							break;
						}
					}					
					if (childToUse != null) {
						testsToReplace.push({child : child, elem : elem});						
					}					
				}
			}
			
			for (i = 0; i < testsToReplace.length; i++) {
				var testNode = testsToReplace[i].elem;
				var groupNode = testsToReplace[i].child;
				while (groupNode.firstChild) {
					testNode.parentNode.insertBefore(groupNode.firstChild, testNode);
				}
				testNode.parentNode.removeChild(testNode);
			}
			
			var nodeWasUpdated = false;
			items = document.getElementsByTagName("*");
		    i=items.length;
			while (i > 0) {
				i--;
				elem = items[i];
				if(elem && elem.id && elem.id.indexOf('nitro_elem_') == 0)	{
					//replacement in progress
					continue;
				}
				var params = "";
				var addUserId = false;
				var newElem = null;
				if (this.isNitroNode(elem, "request")) {
					var attrs = elem.attributes;
					for(var j=attrs.length-1; j>=0; j--) {
						if (attrs[j].name.toLowerCase() == "adduserid") {
							addUserId = true;
						}
						else if (this.isNitroParameter(attrs[j])) {
							var val = attrs[j].value;
							if(val.indexOf('eval(') != -1) {
								val = val.substring(6);
								val = val.substring(0,val.length-2);
								val = eval(val);
							}
							params += "&" + attrs[j].name + "=" + val;
						}
					}
					elem.id = "nitro_elem_" + Nitro.divCounter;
					this.callAPI(params, "Nitro.processNMLCall", this.counterId + "|" + elem.id, addUserId);	
					Nitro.divCounter++;
					nodeWasUpdated = true;
				}
				else if (this.isNitroNode(elem, "widget")) {
					var ownerId = this.getElemAttribute(elem,"ownerId");
					var name = elem.getAttribute("name");
					if (name == null || name == "") {
	  					continue;
					}
					if (ownerId == "") {
						ownerId = null;
					}
					elem.id = "nitro_elem_" + Nitro.divCounter;
					Nitro.divCounter++;

					if(!this.args)
						this.args = [];
					this.args[elem.id] = {};
					
					for(var i = 0; i < elem.attributes.length; i++) {
						var a = elem.attributes.item(i);
						if(a.name)
							eval("this.args[elem.id]['"+a.name+"']='"+a.value+"'");
					}					

					if(!this.args[elem.id].userId) 
						this.args[elem.id].userId = this.args[elem.id].userid ? this.args[elem.id].userid : this.jsConnector.connectionParams.userId;
						
					this.embedWidget(name, elem.id, ownerId);
					nodeWasUpdated = true;
				}
				else if (this.isNitroNode(elem, "avatar-full") || this.isNitroNode(elem, "avatar-thumb")) {
					var userId = this.jsConnector.connectionParams.userId;
					var ownerId = this.getElemAttribute(elem,"ownerId");
					if (ownerId != "" && ownerId != null) {
						userId = ownerId;
					}					
					var size = elem.getAttribute("size");
					var catalog = elem.getAttribute("catalog");
					var src = nitroProtocol + "://dynamic.bunchball.net/assets/avatar/" + this.connectionParams.apiKey + "/" + userId + "/";
					if (this.isNitroNode(elem, "avatar-full")) {
						src = src + "full.png";
					}
					else {
						src = src + "thumb.png";	
					}
					src = src + "?ts=" + (new Date()).getTime();
					if (size != null) {
						src = src + "&size=" + size;	
					}
					if (catalog != null) {
						src = src + "&catalog=" + catalog;	
					}
					this.replaceWithImage(src, elem);
					nodeWasUpdated = true;
				}	
				else if (this.isNitroNode(elem, "canvas-flat")) {
					var userId = this.jsConnector.connectionParams.userId;
					var ownerId = this.getElemAttribute(elem,"ownerId");
					if (ownerId != "" && ownerId != null) {
						userId = ownerId;
					}										
					var size = elem.getAttribute("size");
					var catalog = elem.getAttribute("catalog");
					var src = nitroProtocol + "://dynamic.bunchball.net/assets/canvas/" + this.connectionParams.apiKey + "/" + userId + ".jpg";
					src = src + "?ts=" + (new Date()).getTime();
					if (size != null) {
						src = src + "&size=" + size;	
					}
					if (catalog != null) {
						src = src + "&catalog=" + catalog;	
					}
					this.replaceWithImage(src, elem);
					nodeWasUpdated = true;
				}	
				else if (this.isNitroNode(elem, "notifications-feed")) {
					var returnCount = this.getElemAttribute(elem, "returnCount");
					var userIds = this.getElemAttribute(elem, "userIds");
					elem.id = "nitro_elem_" + Nitro.divCounter;
					Nitro.divCounter++;			
					NitroNotifier.jsConnector = this.jsConnector;
					NitroNotifier.getNotificationsFeed(connectionParams, "Nitro.processNotificationsFeedNMLCall", this.counterId + "|" + elem.id, userIds, returnCount);
					nodeWasUpdated = true;
				}
			}
			if(primaryNMLThread || !this.primaryNMLThreadStarted) {
				this.primaryNMLThreadStarted = true;
				var _self = this;
				if(!this.nmlRefreshTimeout)
					this.nmlRefreshTimeout = 500;			
				if(nodeWasUpdated)
					this.nmlRefreshTimeout = 500;
				else
					this.nmlRefreshTimeout*= 3;
				if(this.nmlRefreshTimeout > 120000)
					this.nmlRefreshTimeout = 120000;				

				setTimeout(function(){
					_self.refreshNML(true);
				}, this.nmlRefreshTimeout);
			}
		}

		Nitro.updateTwitterSettingsAndHideNotification = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);					
			instance.twitterEnabled = null;
			Nitro.updateTwitterSettings(data, token);
		}

		Nitro.updateTwitterSettings = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);					
			
			//first timers
			if(data.Nitro.Twitter.requiresLogin) {
				twitterLoginUrl = data.Nitro.Twitter.requiresLogin				
			}
					
			var twitterSlider = document.getElementById('nitro_statusUpdater_twitter');
					
			if(data.Nitro.Twitter.enabled == "false") {
				twitterSlider.style.backgroundPosition = "-40px 0px";
				CurrentTwitterNitroInstanceId = instance.counterId;
				instance.twitterEnabled = false;
				if(twitterLoginUrl != null)
					twitterSlider.onclick = function(){window.open(twitterLoginUrl);CurrentTwitterStatusRefreshCounter = 0;Nitro.checkTwitterStatus();};
				else
					twitterSlider.onclick = function(){Nitro.callAPI('method=user.twitter.enable','Nitro.updateTwitterSettings',instance.counterId)};
			}else {
				twitterSlider.style.backgroundPosition = "0px 0px";					
				twitterSlider.onclick = function(){Nitro.callAPI('method=user.twitter.disable','Nitro.updateTwitterSettings',instance.counterId)};
				instance.twitterEnabled = true;
				CurrentTwitterNitroInstanceId = null;
				twitterLoginUrl = null;
			}
		}	

		Nitro.updateFacebookSettings = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data,token);
			
			//first timers
			if(data.Nitro.Facebook.requiresLogin) {
				facebookLoginUrl = data.Nitro.Facebook.requiresLogin
			}
					
			var facebookSlider = document.getElementById('nitro_statusUpdater_facebook');
					
			if(data.Nitro.Facebook.enabled == "false") {
				facebookSlider.style.backgroundPosition = "-40px 0px";
				CurrentFacebookNitroInstanceId = instance.counterId;
				instance.facebookEnabled = false;
				if(facebookLoginUrl != null)
					facebookSlider.onclick = function(){window.open(facebookLoginUrl);CurrentFacebookStatusRefreshCounter = 0;Nitro.checkFacebookStatus();};
				else
					Nitro.callAPI('method=user.facebook.status','Nitro.updateFacebookSettings',instance.counterId);				
			}else {
				facebookSlider.style.backgroundPosition = "0px 0px";					
				facebookSlider.onclick = function(){Nitro.callAPI('method=user.facebook.disable','Nitro.updateFacebookSettings',instance.counterId)};
				instance.facebookEnabled = true;
				CurrentFacebookNitroInstanceId = null;
			}
		}

		var CurrentFacebookNitroInstanceId = null;
		var CurrentFacebookStatusRefreshCounter = 0;
		Nitro.checkFacebookStatus = function() {
			if(CurrentFacebookNitroInstanceId != null && CurrentFacebookStatusRefreshCounter < 50) {
				Nitro.callAPI('method=user.facebook.status','Nitro.updateFacebookSettings',CurrentFacebookNitroInstanceId);
				setTimeout("Nitro.checkFacebookStatus()", 2500);
				CurrentFacebookStatusRefreshCounter++;
			}
		}
		var CurrentTwitterNitroInstanceId = null;
		var CurrentTwitterStatusRefreshCounter = 0;
		Nitro.checkTwitterStatus = function() {
			if(CurrentTwitterNitroInstanceId != null && CurrentTwitterStatusRefreshCounter < 50) {
				Nitro.callAPI('method=user.twitter.status','Nitro.updateTwitterSettings',CurrentTwitterNitroInstanceId);
				setTimeout("Nitro.checkTwitterStatus()", 2500);
				CurrentTwitterStatusRefreshCounter++;
			}
		}		
		
		Nitro.processNotificationsFeedNMLCall = function(notifications, token) {
			var cId = token.split("|")[0];
			var instance = null;
			for (var i = 0; i < Nitro.instances.length; i++) {
				if (Nitro.instances[i].counterId == cId) {
					instance = Nitro.instances[i];
				}
			}
			instance.replaceNML(null, token.split("|")[1], notifications);
		}

		Nitro.processNMLCall = function(data, token) {
			var cId = token.split("|")[0];
			var instance = Nitro.getInstanceForResponse(data,cId);			
			instance.replaceNML(data, token.split("|")[1]);
		}
				
		this.replaceNML = function(data, divId, notifications) {
			var elem = document.getElementById(divId);
			var textReplacements = new Array();
			var imgReplacements = new Array();
			var htmlDivReplacements = new Array();
			var htmlSpanReplacements = new Array();			
			
			var children = elem.getElementsByTagName("*");
			var childToRepeat = null;
			for (var i = 0; i < children.length; i++) {  
				var child = children[i];
				if (child.getAttribute("nitro_repeat") != null) {
					childToRepeat = child;
					break;
				}
			}
			
			if (childToRepeat != null) {
				var numRows = this.getElemAttribute(elem, "returnCount");
				if (numRows == null) {
					numRows = 10;
				}
				for (var r=0; r < numRows;r++) {
					var clone = childToRepeat.cloneNode(true);									
					var cloneChildren = clone.getElementsByTagName("*");
					for (var c=0; c < cloneChildren.length; c++) {
						var setRank = false;
						if (this.isNitroNode(cloneChildren[c], "response") || this.isNitroNode(cloneChildren[c], "notification")) {
							cloneChildren[c].setAttribute("rank", r);
						}
					}
					childToRepeat.parentNode.insertBefore(clone, childToRepeat);
				}
				childToRepeat.parentNode.removeChild(childToRepeat);
			}
			
			for (var i = 0; i < children.length; i++) {  
				var child = children[i];
				if (this.isNitroNode(child, "notification")) {			
					var rank = child.getAttribute("rank");  
					if (rank == null) { 
						rank = 0; 
					}
					if (typeof (notifications[rank]) == "undefined") {
						continue;
					}
					this.addNodeReplacement(htmlDivReplacements, child, notifications[rank].html);
				}				
				else if (this.isNitroNode(child, "response")) {
					var accessor = child.getAttribute("data");
					if (accessor == "rank") {
						var rank = child.getAttribute("rank");  
						if (rank == null) { 
							rank = 0; 
						}
						this.addNodeReplacement(textReplacements, child, parseInt(rank) + 1);
						continue;
					}
					accessor = accessor.split(".");
					var value = data.Nitro;
					for (var a = 0; a < accessor.length; a++) {
						var curr = accessor[a];
						var arrI = curr.indexOf("[%]");
						if (arrI > -1) {
							var rank = child.getAttribute("rank");  
							if (rank == null) { 
								rank = 0; 
							}
							value = value[curr.substring(0, arrI)];
							if (typeof value == "undefined") {break;}
							value = this.makeArray(value);
							value = value[rank];
						}
						else {
							value = value[curr];
						}
						if (typeof value == "undefined") {break;}
					}
					if (typeof value == "undefined") {continue;}
					
					var postProcess = this.getElemAttribute(child, "postProcess");
					if (postProcess != null) {
						value = eval( postProcess + "(value)" );
					}
					
					if (child.getAttribute("type") != null && child.getAttribute("type") == "date") {
						var date = new Date(parseInt(value) * 1000);
						this.addNodeReplacement(textReplacements, child, date.toLocaleString());	
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "img") {
						this.addNodeReplacement(imgReplacements, child, value);
					}
					else if (child.getAttribute("type") != null && (child.getAttribute("type") == "avatar-full" || child.getAttribute("type") == "avatar-thumb")) {
					    var src = nitroProtocol + "://dynamic.bunchball.net/assets/avatar/" + this.connectionParams.apiKey + "/" + value + "/";
						if (child.getAttribute("type") == "avatar-full") {
							src = src + "full.png";
						}
						else {
							src = src + "thumb.png";	
						}	
						this.addNodeReplacement(imgReplacements, child, src);
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "canvas-flat") {
					    var src = nitroProtocol + "://dynamic.bunchball.net/assets/canvas/" + this.connectionParams.apiKey + "/" + value + ".jpg";
						this.addNodeReplacement(imgReplacements, child, src);
					}
					else if (child.getAttribute("type") != null && child.getAttribute("type") == "html") {
						this.addNodeReplacement(htmlSpanReplacements, child, value);
					}
					else {
						this.addNodeReplacement(textReplacements, child, value);								
					}
				}
			}		
			
			for (var i = 0; i < textReplacements.length; i++) {
				this.replaceWithText(textReplacements[i].value, textReplacements[i].elem);
			}
			for (var i = 0; i < htmlDivReplacements.length; i++) {
				this.replaceWithHtml(htmlDivReplacements[i].value, htmlDivReplacements[i].elem, "div");
			}
			for (var i = 0; i < htmlSpanReplacements.length; i++) {
				this.replaceWithHtml(htmlSpanReplacements[i].value, htmlSpanReplacements[i].elem, "span");
			}
			for (var i = 0; i < imgReplacements.length; i++) {
				this.replaceWithImage(imgReplacements[i].value, imgReplacements[i].elem);
			}
			
			while (elem.firstChild)
			{
				elem.parentNode.insertBefore(elem.firstChild, elem);
			}	
			elem.parentNode.removeChild(elem);				
		}
		
		this.isNitroNode = function(elem, type){
			if (!elem || !elem.nodeName) {
				return false;	
			}
			return (elem.nodeName.toUpperCase() == "NITRO:" + type.toUpperCase() || elem.nodeName.toUpperCase() == type.toUpperCase());
		}
		this.isNitroParameter = function(attr) {
			if (attr.value != null && attr.value != "null" && attr.value != "") {
				if (attr.name in {'id':'', 'tabIndex':'','disabled':'', 'contentEditable':'', 'hideFocus':''}) {
					return false;
				}
				if (attr.name.indexOf("nml_") == 0) {
					return false;
				}
				return true;
			}	
		}
		this.getElemAttribute = function(elem, attr) {
			if (elem.getAttribute(attr) != null) {
				return elem.getAttribute(attr);					
			}
			if (elem.getAttribute(attr.toLowerCase()) != null) {
				return elem.getAttribute(attr.toLowerCase());					
			}			
			return null;
		}
		this.addNodeReplacement = function(replacementsArr, elem, value) {
			if (typeof value == "undefined") {
				value = "";
			}
			replacementsArr.push({value : value, elem : elem});
		}
		this.replaceWithText = function(text, elem) {
			if (text != null && typeof text != "undefined") {
				var newNode = document.createTextNode(text);
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		this.replaceWithImage = function(url, elem) {
		    alert('replace with image')
			if (url != null && typeof url != "undefined") {
				var newNode = document.createElement('img');
				newNode.setAttribute("src", url);
				
				var attrs = elem.attributes;
				for(var j=attrs.length-1; j>=0; j--) {
					newNode.setAttribute(attrs[j].name, attrs[j].value);
				}
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		this.replaceWithHtml = function(html, elem, divOrSpan) {
			if (html != null && typeof html != "undefined") {
				var newNode = document.createElement(divOrSpan);
				newNode.innerHTML = html;
				elem.parentNode.replaceChild(newNode, elem);
			}
		}
		Nitro.onBuyPointsClick = function(pointCategory) {
		
			if (typeof Nitro_Overlay != "undefined") {
				nitroOverlay.reset();
			}
		
			var nitro = Nitro.getInstanceForCounter(0);
			if(nitro != null) {
				var params = new Object();
				params.pointCategory = pointCategory;
				nitro.showPaymentDialog(params);
			}
		}
		this.showPaymentDialog = function(params) {
			if (params.pointCategory == null) {
				return;	
			}
			if (params.useDefaultStyle == null) {
				params.useDefaultStyle = true;
			}
			if (params.paymentWindowTarget == null) {
				params.paymentWindowTarget = "_blank";
			}
			if(typeof nitroToolbar != "undefined")
				nitroToolbar.reset();
			this.paymentDialogParams = params;
			this.jsConnector.callAPI("method=site.getPaymentOptions&verifyPointCategory=true&pointCategory=" + this.paymentDialogParams.pointCategory, "Nitro.processPaymentOptions", this.counterId, true);
		}
		
		Nitro.processPointsBalance = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data, token);		
			instance.updatePaymentDialogPointsBalance(data);
		}
		Nitro.processPaymentOptions = function(data, token) {
			var instance = Nitro.getInstanceForResponse(data, token);			
			instance.showPaymentDialogWithOptions(data);
		}
		Nitro.reloadWidgets = function() {
			var isIE = navigator.appName.indexOf("Microsoft") != -1;
			for(var i in nitroWidget.embedNames) {
				var flashName = nitroWidget.embedNames[i];
				if(Nitro.isString(flashName) && flashName.toLowerCase().indexOf('cookie') >= 0)
					continue;
				if(Nitro.isString(flashName) && flashName.toLowerCase().indexOf('poker') >= 0)
					continue;					
				var flashObject = swfobject.getObjectById(flashName);
				if(flashObject) {
					var prevNode = flashObject.prevSibling;
					var parentNode = flashObject.parentNode;
					parentNode.removeChild(flashObject);
					if(prevNode == null) {
						parentNode.appendChild(flashObject);
					}else {
						parentNode.insertBefore(flashObject,prevNode.nextSibling);
					}
					if(isIE && document.getElementById('nitroAvatar')) {
						setTimeout("document.getElementById('nitroAvatar').focus()",2500);					
					}else {
						//document.getElementById(flashName).focus();
					}
				}
			}
		}
		this.updatePaymentDialogPointsBalance = function(data) {
			var balance = data.Nitro.Balance.pointCategories.PointCategory.points;
			var iconUrl = data.Nitro.Balance.pointCategories.PointCategory.iconUrl;
			var balanceDiv = document.getElementById('nitro_payment_dialog_points_balance');
			var iconImg = document.getElementById('nitro_payment_dialog_points_balance_pc');//!!! nitro_payment_dialog_points_icon
			balanceDiv.innerHTML = this.addCommas(balance);
			if (iconUrl && iconUrl.length > 0) {
				if(iconUrl.indexOf("swf") != -1) {
	
					var params = {
						base:				iconUrl.substr(0,iconUrl.lastIndexOf('/')),
						wmode:				"transparent",
						allowscriptaccess:	"always",
						allownetworking:	"all"	
					};
					
					var attributes = {
						id:					"nitro_payment_dialog_points_icon_swf",
						name:				"nitro_payment_dialog_points_icon_swf",
						style:				"background:#F0F0F0"
					};
					iconImg.innerHTML = "";
					nitroWidget.embedSWF(iconUrl, "nitro_payment_dialog_points_balance_pc", 20, 20, {}, params, attributes);
				}else {
					iconImg.innerHTML = "<img src='" + iconUrl + "' width='20' height='20' vertical-align='bottom'>";
				}
			}
		}
		this.showConfirmPaymentFrame = function() {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			this.addClass(backgroundFrame,'nitro_payment_dialog_container_small');			
			backgroundFrame.innerHTML = "<div style='margin-top:50px;width:100%;text-align:center'>Welcome back! Click \"Continue\" once you've finished.</div>";
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_cancel_button" href="#" onclick="nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_cancel_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_cancel_button_hover\')" ></a>';			
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_continue_button" href="#" onclick="Nitro.reloadWidgets();nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_continue_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_continue_button_hover\')" ></a>';
			this.toggleBackgroundFrame(true);
			if(!backgroundFrame.innerHTML) {
				//fix for chrome
				setTimeout("nitro.showConfirmPaymentFrame()",500);
				return;
			}			
		}		
		this.closePaymentDialog = function() {
			if(this.checkPaymentsDialogStatusTimer != null) {	
				clearTimeout(this.checkPaymentsDialogStatusTimer);
				this.checkPaymentsDialogStatusTimer = null;
			}
			if(document.getElementById("nitro_payment_dialog_container")) {
				document.body.removeChild(document.getElementById("nitro_payment_dialog_container"));
				document.body.removeChild(document.getElementById("nitro_payment_dialog_background_frame"));
				var mask = document.getElementById("nitro_payment_dialog_mask");
				if (mask != null) {
					document.body.removeChild(mask);
				}
				if(typeof nitroToolbar != "undefined") {
					nitroToolbar.reset();
					nitroToolbar.drawerOpen['nitroToolbar_drawer_payments'] = false;				
				}
			}	
		}
		this.onPaymentClicked = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				this.removeClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				if (document.nitroPaymentOptions.po[i].checked) {
					// paypal/credit card
					if(document.nitroPaypalForm) {
						document.nitroPaypalForm.amount.value = document.nitroPaymentOptions.po[i].value.split("|")[1];	
						document.nitroPaypalForm.item_name.value = document.nitroPaymentOptions.po[i].value.split("|")[0] + ' ' + this.paymentDialogParams.pointCategory;
					}					
					this.addClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				}
			}
			this.removeClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');				
			this.removeClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');
		}
		this.resetPaymentOptions = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				document.nitroPaymentOptions.po[i].checked = false;
				this.removeClass(document.getElementById('nitro_tr_po_'+i),'nitro_payment_dialog_selected_field');
				document.getElementById('nitro_tr_po_'+i).style.visibility = 'visible';
				if(this.hidablePaymentOptions['nitro_tr_po_'+i] && this.selectedPaymentMethod=='boku') {
					document.getElementById('nitro_tr_po_'+i).style.visibility = 'hidden';
				}
			}
		}
		this.getBokuFrame = function(img, price, desc) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<br><br><br><center><h3>Loading...</h3></center>";

			params = "method=user.payments.status&image=" + escape(img) + "&description=" + escape(desc) + "&price=" + price + "&forceNewBuyButton=true" + (typeof nitroToolbar != "undefined" && nitroToolbar.args.siteId ? '&toolbarSiteId='+nitroToolbar.args.siteId+'&affl='+nitroToolbar.args.siteId : '');
			this.callAPI(params,'nitro.setBokuFrame');
		}
		this.setBokuFrame = function(data, token) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<iframe id='nitro_payment_dialog_background_iframe' src='" + data.Nitro.paymentMethods.Boku.buyButton + "'></iframe>";
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_back_button" href="#" onclick="nitro.toggleBackgroundFrame()" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_back_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_back_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_terms_message">By clicking "Purchase" you agree to the <a href="'+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml" target="_blank">Bunchball Virtual Goods Terms of Service</a></p> \
										<div onclick="window.open(\''+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml\')" class="nitro_payment_dialog_poweredby">&nbsp;</div>';
		}
		Nitro.closeNotification = function(elem) {
			if(elem == null) return;
			if(elem.parentNode.className == 'nitro_notices')
				elem.parentNode.removeChild(elem);
			else
				Nitro.closeNotification(elem.parentNode);
		}
		
		var checkPaymentsDialogStatusTimer = null;
		Nitro.checkPaymentsDialogStatus = function(data, token) {

			var instance = Nitro.getInstanceForCounter(0);			
			if(data == null) {
				if(instance.checkPaymentsDialogStatusTimer == null) 
					instance.checkPaymentsDialogStatusTimer = setTimeout("Nitro.callAPI('method=user.payments.status','Nitro.checkPaymentsDialogStatus',0)",2500);
				return;
			}

			if(data.Nitro.paymentMethods.Boku.status == 'success') {
				instance.showConfirmPaymentFrame();
			}else if(data.Nitro.paymentMethods.Boku.status == 'failure') {
				instance.showConfirmPaymentFrame();
			}else {
				instance.checkPaymentsDialogStatusTimer = setTimeout("Nitro.callAPI('method=user.payments.status','Nitro.checkPaymentsDialogStatus',0)",2000);
			}
		}
		
		this.injectPaymentsDialogContent = function(button,content) {
			if(button != null) {
				var elems = this.getElementForClass('nitro_payment_dialog_method');
				for(var i = 0; i < elems.length; i++) {
					this.removeClass(elems[i],'nitro_payment_dialog_method_active');
				}
				this.addClass(button,'nitro_payment_dialog_method_active');

				var div = document.getElementById('nitro_payments_dialog_method_content');
				div.innerHTML = content;
				if(button.id == "nitro_surveyMethodButton") {
					this.removeClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');				
					this.addClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');
				}else {
					this.removeClass(document.getElementById('nitroPaymentOptions'),'nitro_payment_dialog_obscured');
					this.addClass(document.getElementById('nitro_payments_dialog_method_content'),'nitro_payment_dialog_obscured');				
				}					
			}
			this.resetPaymentOptions();
			
		}
		
		this.showBokuFrame = function() {
			for (var i = 0; i < document.nitroPaymentOptions.po.length; i ++) {
				if (document.nitroPaymentOptions.po[i].checked) {
					var img = this.paymentOptions.paymentProductUrl;
					var price = document.nitroPaymentOptions.po[i].value.split("|")[1];
					var desc = document.nitroPaymentOptions.po[i].value.split("|")[0] + ' ' + this.paymentDialogParams.pointCategory;
					this.getBokuFrame(img, price, desc);
					break;
				}
			}
			this.toggleBackgroundFrame(true);
		}
		this.showOfferpalFrame = function() {			
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			backgroundFrame.innerHTML = "<iframe id='nitro_payment_dialog_background_iframe_wide' src='" + this.paymentMethods.Offerpal.buyButton + (typeof nitroToolbar != "undefined" && nitroToolbar.args.siteId ? '&affl='+nitroToolbar.args.siteId : '') + "'></iframe>";
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_background_frame_title">Complete Surveys to Earn ' + this.paymentDialogParams.pointCategory + '</p>';
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_back_button" style="right:35px" href="#" onclick="nitro.toggleBackgroundFrame()" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_back_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_back_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<a class="nitro_payment_dialog_cancel_button" href="#" onclick="Nitro.reloadWidgets();nitro.closePaymentDialog();" onmouseout="nitro.removeClass(this,\'nitro_payment_dialog_cancel_button_hover\')" onmouseover="nitro.addClass(this,\'nitro_payment_dialog_cancel_button_hover\')" ></a>';
			backgroundFrame.innerHTML+= '<p class="nitro_payment_dialog_terms_message">By clicking "Purchase" you agree to the <a href="'+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml" target="_blank">Bunchball Virtual Goods Terms of Service</a></p> \
										<div onclick="window.open(\''+nitroProtocol+'://www.bunchball.com/about/vgtos.shtml\')" class="nitro_payment_dialog_poweredby">&nbsp;</div>';

			this.toggleBackgroundFrame(true);
		}
		
		this.toggleBackgroundFrame = function(show) {
			var backgroundFrame = document.getElementById('nitro_payment_dialog_background_frame');
			var light = document.getElementById('nitro_payment_dialog_container');
			if(show) {
				backgroundFrame.style.display = "block";
				light.style.display = "none";
			}else {
				backgroundFrame.style.display = "none";
				light.style.display = "block";
			}
		}
		
		this.addCommas = function(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}
		
		Nitro.redirectTo = null;
		Nitro.redirectToAction = null;
		Nitro.redirectToUserId = null;
		this.handleRedirects = function() {
			var action = this.getUrlParameter('nitroAction');
			var userId = this.getUrlParameter('nitroUserId');
			Nitro.redirectTo = this.getUrlParameter('nitroRedirectTo');
			Nitro.redirectToAction = action;
			Nitro.redirectToUserId = userId;

			if(action) {
				if(!userId) {
					userId = this.connectionParams.userId;
				}

				//check if this redirect has happened before
				var actionAlreadyLogged = NitroCookies.readJSCookie('NITRO_ACTION-'+Nitro.redirectToAction+"|"+Nitro.redirectToUserId)

				if(actionAlreadyLogged) {
					Nitro.handleClientLogAction();
				}else {
					this.jsConnector.callAPI("method=user.clientLogAction&userId=" + userId + "&tags=" + action, "Nitro.handleClientLogAction", this.counterId, true);
				}
			}
		}
		Nitro.handleClientLogAction = function() {		

			//save the cookie that we have logged the action
			NitroCookies.createJSCookie('NITRO_ACTION-'+Nitro.redirectToAction+"|"+Nitro.redirectToUserId, true, 365);

			if(Nitro.redirectTo) {
				window.location = unescape(Nitro.redirectTo);
			}
		}

		this.getUrlParameter = function(name) {
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)";
		  var regex = new RegExp( regexS );
		  var results = regex.exec(window.location.href);
		  if(results == null)
			return null;
		  else
			return results[1];
		}
	}
	

	/**** Localization *****
	* This variable will be populated after Login takes place and a locale is requested
	*/
	Nitro.Localization = null;
	
	Nitro.getLocale = function() {
		if ( navigator ) {
			if ( navigator.language ) {
				return navigator.language;
			} else if ( navigator.browserLanguage ) {
				return navigator.browserLanguage;
			} else if ( navigator.systemLanguage ) {
				return navigator.systemLanguage;
			} else if ( navigator.userLanguage ) {
				return navigator.userLanguage;
			}
		}
	}

	Nitro.getLocalizationFile = function(locale) {
		if(typeof JSONscriptRequest == "undefined") {
			eval('setTimeout("Nitro.getLocalizationFile(\''+locale+'\')",50)');
			return;
		}
		var fullUrl = nitroProtocol+"://assets.bunchball.net/scripts/locale/"+nitroLibsVersion+"/"+locale+".properties";
		var obj=new JSONscriptRequest(fullUrl,true);     
		obj.buildScriptTag(); // Build the script tag     
		obj.addScriptTag(); // Execute (add) the script tag
	}
	
	Nitro.processLocalizationFile = function(data) {
		
		if(!Nitro.Localization)
			Nitro.Localization = [];
		
		var localeMap = eval(data);
		for (var name in localeMap) {
			var value = localeMap[name];
			Nitro.Localization[name] = value;
		}
	}	
	
	//for flash ease of use
	Nitro.getLocalizedString = function(name,prefix) {
		return name.nitroLocalize(prefix);
	}
	
	String.prototype.nitroLocalize = function(prefix){
		if(!prefix)
			var prefix = 'javascript';
			
		var s = Nitro.Localization[prefix+"."+this];
		if( !s ) return( "§§§" + this + "§§§" );
		for (var i = 1; i < arguments.length; i++) {
			s = s.replace("{" + i + "}", arguments[i]);
		}  
		return s;
	};
	
	if(typeof nitroLocale != "undefined"){
		Nitro.getLocalizationFile(nitroLocale);
	}
}