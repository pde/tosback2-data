function getParameterByName(name, hrefs){
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(hrefs);
	if(results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function() {
	var aTags = $("a");
	var abcdVals = "";
	var finalUrlSplit;
	var dReportVal;
	
/*function to add onclick function to all anchor tags*/
	$.each(aTags, function() {
		
		var tempRelVal = $(this).attr("rel").split('|');
		if(parseInt(tempRelVal.length) != 4){
			/* code for name parameter in href*/
			var tempUrlSplit = getParameterByName("name",$(this).attr("href"));
			if(tempUrlSplit != ""){
				$(this).click(function(){
					captureReportingMain($(this),15); 
					if($(this).attr('href')){return false;}
				}).click(function(){
					if($(this).attr('href')){
						if($(this).attr('target') != "_blank"){
							window.location = $(this).attr('href');
						}else{
							window.open(this.href);
						}
					}
				});
				/*
				$(this).attr("onClick",function(){
					return "captureReportingMain($(this),15)";
				});

				$(this).click(function(){
					captureReportingMain($(this),15);
				}); 
				*/
			} else {
				/* code for _lnm parameter in href*/
				tempUrlSplit = getParameterByName("_lnm",$(this).attr("href"));
				if(tempUrlSplit != ""){
					$(this).click(function(){
						captureReportingMain($(this),15); 
						if($(this).attr('href')){return false;}
					}).click(function(){
						if($(this).attr('href')){
							if($(this).attr('target') != "_blank"){
								window.location = $(this).attr('href');
							}else{
								window.open(this.href);
							}
						}
					});
					
					/*
					$(this).attr("onClick",function(){
						return "captureReportingMain($(this),15)";
					});
					
					$(this).click(function(){
						captureReportingMain($(this),15);
					});
					*/
				}
			}
		}
	});
/*Code to use attribute rel to get A|B|C|D */
	$.each($("[rel]"), function() {
		var tempRelVal = $(this).attr("rel").split('|');
		if(parseInt(tempRelVal.length) == 4){
			abcdVals = "\""+ tempRelVal[0] +"\",\""+ tempRelVal[1] +"\",\""+ tempRelVal[2] +"\",\""+ tempRelVal[3] +"\"";

			$(this).click(function(){
				captureReportingMain($(this),15); 
				if($(this).attr('href')){return false;}
			}).click(function(){
				if($(this).attr('href')){
					if($(this).attr('target') != "_blank"){
						window.location = $(this).attr('href');
					}else{
						window.open(this.href);
					}
				}
			});

		}
	});
/******* end ******/
});

function captureReporting(parameterA,parameterB,parameterC,parameterD,ActionNum) {
	/* Use page title if title exists */
	var pageTitle = document.title;
	if(pageTitle != ""){
		parameterA = pageTitle;
	}
	var actionnumber = ActionNum;
	var YWATracker = YWA.getTracker("10002088440579");
	YWATracker.setCF(19, parameterA); //(denotes the first parameter used in click through)
	YWATracker.setCF(20, parameterB); //(denotes the second parameter used in click through)
	YWATracker.setCF(21, parameterC); //(denotes the third parameter used in click through)
	YWATracker.setCF(22, parameterD); //(denotes the fourth parameter used in click through)
	YWATracker.setAction(actionnumber);			
	YWATracker.submit_action();
}

function captureReportingMain(thisObj,ActionNum) {
	var tempRelVal = thisObj.attr("rel").split('|');

	var pageTitle = document.title;
	if(pageTitle != ""){
		tempRelVal[0] = pageTitle;
	}

	if(parseInt(tempRelVal.length) == 4){
		/**** code for rel attribute ****/
		captureReporting(tempRelVal[0],tempRelVal[1],tempRelVal[2],tempRelVal[3],ActionNum);
	} else {
		/**** code for name param in href ****/
		var tempUrlSplit = getParameterByName("name",thisObj.attr("href"));
		if(tempUrlSplit != ""){
			finalUrlSplit = tempUrlSplit.split('.');
			abcdVals = "\""+ finalUrlSplit[0] +"\",\""+ finalUrlSplit[1] +"\",\""+ finalUrlSplit[2] +"\",";
			
			if(isNaN(parseInt(finalUrlSplit[3]))){
				abcdVals = abcdVals + "\""+ finalUrlSplit[3] +"\"";
				dReportVal = finalUrlSplit[3];
			} else {
				var tempTitle = thisObj.attr("title");
				if (tempTitle.length== 0){
						tempTitle = finalUrlSplit[3];
				}
				abcdVals = abcdVals + "\""+ tempTitle +"\"";
				dReportVal = tempTitle;
			}
			captureReporting(finalUrlSplit[0],finalUrlSplit[1],finalUrlSplit[2],dReportVal,15);
		} else {
			/**** code for _lnm param in href ****/
			tempUrlSplit = getParameterByName("_lnm",$(this).attr("href"));
			if(tempUrlSplit != ""){
				finalUrlSplit = tempUrlSplit.split('.');
				abcdVals = "\""+ finalUrlSplit[0] +"\",\""+ finalUrlSplit[1] +"\",\""+ finalUrlSplit[2] +"\",";
				
				if(isNaN(parseInt(finalUrlSplit[3]))){
					abcdVals = abcdVals + "\""+ finalUrlSplit[3] +"\"";
					dReportVal = finalUrlSplit[3];
				} else {
					var tempTitle = $(this).attr("title");
					if (tempTitle.length== 0){
							tempTitle = finalUrlSplit[3];
					}
					abcdVals = abcdVals + "\""+ tempTitle +"\"";
					dReportVal = tempTitle;
				}
					captureReporting(finalUrlSplit[0],finalUrlSplit[1],finalUrlSplit[2],dReportVal,15);
			}
		}
	}
	
	return false;
}
