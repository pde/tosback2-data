function I18n()
{
	this.settings = {
		"src" : "",
		"dataType" : "json",
		"page" : "",
		"method" : "post"
	};
	
	this.vars = {};
	
	this.exception = "";
}

I18n.prototype.init=function(){try{var e=this;var t=jQuery.ajax({url:e.settings.src,type:e.settings.method,data:{page:e.settings.page},dataType:e.settings.dataType,async:false});t.done(function(t,n,r){if(e.settings.dataType=="json")e.vars=t;else throw"This data type is not yet implemented"});t.fail(function(e,t){throw"Language file loading failed."})}catch(n){this.exception=n}};I18n.prototype.setSrc=function(e){this.settings.src=e};I18n.prototype.setDataType=function(e){this.settings.dataType=e};I18n.prototype.setPage=function(e){this.settings.page=e};I18n.prototype.setMethod=function(e){this.settings.method=e}