var CONSTANT_SFUID_META_TAG_NAME="WT.sfuid";var TEST_URL_PG_SYSTEM="https://online2.statefarm.com/sfuidmgr/getSFUID.do";var sfuidObj;function JSONscriptRequest(fullUrl){this.fullUrl=fullUrl;this.noCacheIE='&noCacheIE='+(new Date()).getTime();this.headLoc=document.getElementsByTagName("head").item(0);this.scriptId='JscriptId'+JSONscriptRequest.scriptCounter++;}
JSONscriptRequest.scriptCounter=1;JSONscriptRequest.prototype.buildScriptTag=function(){this.scriptObj=document.createElement("script");this.scriptObj.setAttribute("type","text/javascript");this.scriptObj.setAttribute("charset","iso-8859-1");this.scriptObj.setAttribute("src",this.fullUrl);this.scriptObj.setAttribute("id",this.scriptId);}
JSONscriptRequest.prototype.removeScriptTag=function(){this.headLoc.removeChild(this.scriptObj);}
JSONscriptRequest.prototype.addScriptTag=function(){this.headLoc.appendChild(this.scriptObj);}
function getSFI(sfuidData){if(document.createElement&&(meta=document.createElement('meta'))){meta.name=CONSTANT_SFUID_META_TAG_NAME;meta.content=sfuidData.sfuid;document.getElementsByTagName('head').item(0).appendChild(meta);}
sfuidObj.removeScriptTag();}
function updateSFUID(){sfuidObj=new JSONscriptRequest(TEST_URL_PG_SYSTEM);sfuidObj.buildScriptTag();sfuidObj.addScriptTag();}
updateSFUID();