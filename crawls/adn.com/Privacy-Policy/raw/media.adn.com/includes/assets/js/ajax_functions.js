var xmlRand=parseInt(Math.random()*99999999);

function handleXML(targetId,target,argsObj){
	
	//var source = this.xml_source;
	//var menu = this.headline_target;
	//var url = source;
	
	var url = target;
	url = url.replace(/http:\/\/www\.adn\.com/,'');
	url = url.replace(/http:\/\/adn-preview\.nandomedia\.com/,'');
	
	var menu = targetId;

	url +='?rand=' + xmlRand;
	
	
	
	
	http_request = false;
	var http_request = new XMLHttpRequest();
	
	if(http_request){
		
		//showindicator(menu);
		
		http_request.onreadystatechange = function(){
		
			if (http_request.readyState==4) { 	
			
				if(http_request.status == 404){
					
					if(!argsObj.retry){
						handleXML(targetId,target,argsObj);
						argsObj.retry = true;
					}
					
					
				}else{
						
					argsObj.retry = false;
					var xmlDoc = http_request.responseXML;
					var func = 'showHeds';
					

					
					if(target.match(/\.html/)){
						xmlDoc = http_request.responseText;	
						if(argsObj.handler){
							func = argsObj.handler;
						}
					}else{
						if(argsObj.handler){
							func = argsObj.handler;
						}else if(xmlDoc.getElementsByTagName('root').item(0).getAttribute('handler')){
							func = xmlDoc.getElementsByTagName('root').item(0).getAttribute('handler');
						}
					}
					
					eval(func + "(xmlDoc,menu,argsObj);");
				
				}
					
			}
			
		}
	};
		 
			
	http_request.open('GET', url, true);
	http_request.send(null);

}
	

function showindicator(menu, msg) {

		var parentdiv = document.getElementById(menu);
		var indicatordiv = document.createElement('div');
		
		parentdiv.innerHTML = '';
		
		var img = document.createElement('img');
		img.src = 'http://media.adn.com/includes/assets/images/indicator.gif';
				
		if (msg){
			var indicatorcontent = document.createTextNode(msg);
		} else {
			var indicatorcontent = document.createTextNode("Loading");
		}
		
		//indicatorimage.setAttribute('src', indicatorgif);
		indicatordiv.className = 'indicator';
		
		//indicatordiv.appendChild(indicatorimage);
		
		indicatordiv.appendChild(img);
		indicatordiv.appendChild(indicatorcontent);
		parentdiv.appendChild(indicatordiv);
		} 


function hideindicator(menu){
	
		var childdiv = document.getElementById('indicator');
		var parentdiv = childdiv.parentNode;
		
		parentdiv.removeChild(childdiv);
		}
		


function getNodeAttribute(parentNode,nodeName,attributeName,nodeCt){
	
	if(nodeCt == undefined){
		nodeCt = 0;	
	}
	
	var attribute = undefined;
	
	
	if(parentNode.getElementsByTagName(nodeName)[nodeCt]){
		var node = parentNode.getElementsByTagName(nodeName)[nodeCt];
		if(node.getAttribute(attributeName)){
			attribute = node.getAttribute(attributeName);				 
		}
	}else if(parentNode.getAttribute(attributeName)){
		attribute = parentNode.getAttribute(attributeName);	
	}
	
	return attribute;

}


function getNodeText(parentNode,nodeName,nodeCt){
	
	
	if(nodeCt == undefined){
		nodeCt = 0;	
	}
	
	var txt = ' ';
	
	
	if(parentNode.getElementsByTagName(nodeName)[nodeCt]){
		var node = parentNode.getElementsByTagName(nodeName)[nodeCt];
		if(node.firstChild){
			if(node.firstChild.nodeValue){
				txt = parentNode.getElementsByTagName(nodeName)[nodeCt].firstChild.nodeValue;
			}
		}
	}
	
	return txt;
	
}


