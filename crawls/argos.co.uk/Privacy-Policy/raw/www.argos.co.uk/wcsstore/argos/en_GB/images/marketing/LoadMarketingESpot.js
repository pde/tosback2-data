
if(!argos) var argos = {};
if(!argos.marketing) argos.marketing  = {};

//argos.marketing.ESpotLoader = {};

argos.marketing.ESpotLoader = {

	context : { espotname: "",  preProcessESpotLoadData: function(data){}, postProcessESpotLoadData: function(){}, onsuccess: function(){}, onfail: function(){} },

	init: function(inputcontext){		
		var argmkespotldr= argos.marketing.ESpotLoader;
		if(inputcontext.espotname!=null)argmkespotldr.context.espotname=inputcontext.espotname;		
		if(inputcontext.preProcessESpotLoadData!=null)argmkespotldr.context.preProcessESpotLoadData=inputcontext.preProcessESpotLoadData;
		if(inputcontext.postProcessESpotLoadData!=null)argmkespotldr.context.postProcessESpotLoadData=inputcontext.postProcessESpotLoadData;
		if(inputcontext.onsuccess!=null)argmkespotldr.context.onsuccess=inputcontext.onsuccess;
		if(inputcontext.onfail!=null)argmkespotldr.context.onfail=inputcontext.onfail;
		
		if(argmkespotldr.context.espotname==null){
			alert("espotname is empty in inputcontext");
			return false;
		}
		
		return true;
		
	},
	
	load: function(inputcontext){
		var argmkespotldr = argos.marketing.ESpotLoader;	
		if(!argmkespotldr.init(inputcontext))	return false;
		var data = "&storeId=10151&langId=110";
		data += "&emsName="+argmkespotldr.context.espotname; 
		argos.marketing.ESpotLoader.context.preProcessESpotLoadData(data);
		
		var ajax = $.ajax({
			url: "http://" + window.location.host + "/webapp/wcs/stores/servlet/GenericEMarketingSpot",
			dataType: "json",
			type: "get",
			data: data,
			//timeout: 5000,
			success: argmkespotldr.handleSuccess,
			error: argmkespotldr.handleFail
		});
		
		argmkespotldr.context.postProcessESpotLoadData();
	},
	
	handleSuccess: function(json){
		argos.marketing.ESpotLoader.context.onsuccess(json);
		
	},
	
	handleFail: function(ajaxObj, textStatus, errorThrown){
		argos.marketing.ESpotLoader.context.onfail(ajaxObj, textStatus, errorThrown);
	}
	
};
