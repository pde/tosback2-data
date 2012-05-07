var SM={};
SM.Object={create:function(obj){function F(){}
F.prototype=obj;return new F();},hasKeys:function(obj,keys){var len=keys.length,i=0;for(;i<len;i++){if(!(keys[i]in obj)){throw("key '"+keys[x]+"' is missing");}}}};if(window.Object.create){SM.Object.create=window.Object.create;}
SM.Array={indexOf:function(arr,item){var i=0,len=arr.length;for(;i<len;i++){if(arr[i]===item){return i;}}
return-1;},getValue:function(arr,index){if(index<0){index=0;}else if(index>=arr.length){index=arr.length-1;}
return arr[index];},sortAscending:function(a,b){var A;var B;if(typeof a==="string"){A=a.toLowerCase();B=b.toLowerCase();if(A<B){return 1;}else if(A>B){return-1;}
return 0;}else{return a-b;}},sortDescending:function(a,b){var A;var B;if(typeof a==="string"){A=a.toLowerCase();B=b.toLowerCase();if(A<B){return-1;}else if(A>B){return 1;}
return 0;}else{return b-a;}}};
SM.String={getPercent:function(val,tot,places){var percent;if(tot===0)return"N/A";percent=SM.Math.roundPercentageTo(val,tot,places);return""+percent+"%";},sanitize:function(str){var div=document.createElement("div");if(!str)return"";div.innerHTML=str;return div.textContent||div.innerText;},truncate:function(str,max_length){if(!str)return"";if(!max_length)return str;if(str.length&&str.length>max_length){return str.substring(0,max_length)+"...";}
return str;}};
SM.Math={roundTo:function(numerator,denominator,places){return SM.Math._roundTo(numerator,denominator,places,0);},roundPercentageTo:function(numerator,denominator,places){return SM.Math._roundTo(numerator,denominator,places,2);},_roundTo:function(numerator,denominator,places,multiplier){var top,bottom;if(numerator===0)return 0;if(places===undefined)places=1;top=Math.pow(10,places+multiplier)*(numerator/denominator);bottom=Math.pow(10,places);return(Math.round(top)/bottom);}}
SM.DOM={SPACE:' ',getClass:function(el){return el.className?el.className:"";},hasClass:function(el,className){var currentClassNames;var classNames;var i=0;var classNamesLen;if(!el){return false;}
currentClassNames=this.getClass(el).split(this.SPACE);classNames=className.split(this.SPACE);classNamesLen=classNames.length;for(;i<classNamesLen;i++){if(SM.Array.indexOf(currentClassNames,classNames[i])!=-1){return true;}}
return false;},removeClass:function(el,className){var currentClassNames=this.getClass(el).split(this.SPACE);var index;if(!el||!className){return;}
index=SM.Array.indexOf(currentClassNames,className);if(index!=-1){currentClassNames.splice(index,1);el.className=currentClassNames.join(this.SPACE);}},addClass:function(el,className){if(!el||!className){return;}
if(!this.hasClass(el,className)){el.className=this.getClass(el)+this.SPACE+className;}},walkChildren:function(el,func){var i=0,children=el.childNodes,len=children.length;var child;for(;i<len;i++){child=children[i];if(child&&child.nodeType==1){func(child);}}},getElementsByClassName:function(className,el){var els;var returnEls;var cur;var i=0;var len;el=el||document;if(document.getElementsByClassName){return el.getElementsByClassName(className);}
returnEls=[];els=(el.all)?el.all:el.getElementsByTagName("*");len=els.length;for(;i<len;i++){cur=els[i];if(this.hasClass(cur,className)){returnEls.push(cur);}}
return returnEls;}};
SM.Event={normalize:function(e){if(e.srcElement){e.target=e.srcElement;}
if(!e.preventDefault){e.preventDefault=function(){this.returnValue=false;};}
if(!e.stopPropagation){e.stopPropagation=function(){this.cancelBubble=true;};}
return e;},add:function(el,eventType,callback){var on="on";if(!el){return;}
function normalizedCallback(e){e=SM.Event.normalize(e);callback(e);}
if(el.addEventListener){el.addEventListener(eventType,normalizedCallback,false);}else if(el.attachEvent){el.attachEvent(on+eventType,normalizedCallback);}else if(el[on+eventType]){el[on+eventType]=normalizedCallback;}}};
(function(){var userAccountTab=document.getElementById('userAcctTab_MainMenu');var userAccountTab2=document.getElementById('userAcctTab_MainMenu2');var resourceTab=document.getElementById('resourceTab_MainMenu');var surveysTab=document.getElementById('surveysTab_MainMenu');var tourTab=document.getElementById('tourTab_MainMenu');var onId=null;function clickMenu(el){var _onId=onId;if(_onId){closeMenu(_onId);if(_onId!=el.id){openMenu(el);}}else{openMenu(el);}}
function openMenu(el){SM.DOM.addClass(el,'open');onId=el.id;}
function closeMenu(id){if(id==onId){try{SM.DOM.removeClass(document.getElementById(id),'open');}catch(err){}
onId=null;}}
function setupMenu(tab,menuid){SM.Event.add(tab,'click',function(e){clickMenu(document.getElementById(menuid));e.stopPropagation();e.preventDefault();});}
setupMenu(userAccountTab,'dd-my-account');setupMenu(userAccountTab2,'dd-my-account');setupMenu(resourceTab,'dd-use-cases');setupMenu(tourTab,'dd-take-a-tour');setupMenu(surveysTab,'dd-online-surveys');SM.Event.add(document.body,"click",function(){closeMenu('dd-use-cases');closeMenu('dd-take-a-tour');closeMenu('dd-online-surveys');closeMenu('dd-my-account');});})();
