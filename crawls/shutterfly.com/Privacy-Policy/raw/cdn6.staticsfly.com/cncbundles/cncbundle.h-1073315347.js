window.SearchBox=function(id,srchType){this.id=id;this.srchType=srchType;this.init=function(id,srchType){var _self=this;this.div=document.getElementById(id);this.form=this.div.getElementsByTagName('form')[0];this.input=this.form.getElementsByTagName('input')[0];this.button=this.form.getElementsByTagName('a')[0];this.enabled=true;if(srchType==="flyout"){var oClassName=this.div.className,newClass;if(this.div.attachEvent){this.div.attachEvent("onmouseover",function(){newClass=oClassName;if(oClassName.length>0){newClass+=" active";}else{newClass+="active";}
_self.div.className=newClass;_self.input.focus();});this.div.attachEvent("onmouseout",function(){_self.button.focus();_self.div.className=oClassName;});}
else{this.div.addEventListener("mouseover",function(){_self.input.focus();});}}
else{this.sError=document.getElementById("srch_err");this.errClose=document.getElementById("closeBtn");if(this.button.attachEvent){this.errClose.attachEvent("onclick",function(event){_self.sError.style.display="none";});}
else{this.errClose.addEventListener("click",function(event){_self.sError.style.display="none";},false);}}
if(this.button.attachEvent){this.button.attachEvent("onclick",function(event){_self.onFormSubmit.call(_self,event);});this.input.attachEvent("onkeypress",function(event){_self.onKeyPress.call(_self,event);});}
else{this.button.addEventListener("click",function(event){_self.onFormSubmit.call(_self,event);},false);this.input.addEventListener("keypress",function(event){_self.onKeyPress.call(_self,event);},false);}};this.onKeyPress=function(event){if(this.enabled==false){this.setEnable(true);}
event=event||window.event;if(this.srchType!=="flyout"){this.sError.style.display="none";}
if(event.keyCode==13){this.onFormSubmit.call(this,event);}};this.onFormSubmit=function(event){var _self=this;if(_self.enabled==false){return;}
_self.setEnable(false);event=event||window.event;var q=_self.input.value.replace(/^\s+|\s+$/g,'');if(!q.length||q==='Search'){if(this.srchType!=="flyout"){_self.sError.style.display="block";}
if(event.preventDefault){event.preventDefault();}
else{event.returnValue=false;}
_self.input.focus();return false;}else{if(typeof window._hbSet!=="undefined"){window._hbSet("lid","srch");window._hbSet("lpos",_self.id);window._hbSend();}
_self.form.submit();}};this.setEnable=function(enableSearch){if(enableSearch){this.enabled=true;this.button.className="srch_go srch_go_enabled";}else{this.enabled=false;this.button.className="srch_go srch_go_disabled";}};this.init(this.id,this.srchType);};function trim(s){var whitespace=" \t\n\r";var i=0;while((i<s.length)&&(whitespace.indexOf(s.charAt(i))!=-1))i++;var j=s.length;while((j>i)&&(whitespace.indexOf(s.charAt(j-1))!=-1))j--;return s.substr(i,j-i);}
function isEmailValid(emailStr){var emailPat=/^(.+)@(.+)$/;var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";var validChars="\[^\\s"+specialChars+"\]";var quotedUser="(\"[^\"]*\")";var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;var atom=validChars+'+';var word="("+atom+"|"+quotedUser+")";var userPat=new RegExp("^"+word+"(\\."+word+")*$");var domainPat=new RegExp("^"+atom+"(\\."+atom+")*$");var matchArray=emailStr.match(emailPat);if(matchArray==null)return false;var user=matchArray[1]
var domain=matchArray[2]
if(user.match(userPat)==null)return false;var IPArray=domain.match(ipDomainPat)
if(IPArray!=null){for(var i=1;i<=4;i++){if(IPArray[i]>255)return false;}
return true;}
var domainArray=domain.match(domainPat)
if(domainArray==null)return false;var atomPat=new RegExp(atom,"g");var domArr=domain.match(atomPat);var len=domArr.length;if(domArr[domArr.length-1].length<2||domArr[domArr.length-1].length>4)return false;if(len<2)return false;return true;}