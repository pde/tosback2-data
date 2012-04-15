DWREngine.setTimeout(90000);
DWREngine.setErrorHandler(errorHandler);
document.onclick=checkMouseClick;

function checkMouseClick(e){
	var target=(e&&e.target)||(event&&event.srcElement);
	var SmartSuggestDivObj=document.getElementById('SmartSuggestDiv');
	if(target!=SmartSuggestDivObj){
		SmartSuggestDivObj.style.display='none';
		$("SmartSuggestDiv_Shade").style.display='none';
	}
}

function checkFormSubmit(){
	var flag=$("formSubmitFlag").value;
	if(flag=='false'){
		var airportFld=$("airportTextField").value;
		$(airportFld).focus();
		$("formSubmitFlag").value='true';
		return false;
	}
	return true;
}

function checkTabNEnter(event,smartSuggestDiv){
	if(event.keyCode==9||event.keyCode==13){
		var smartSuggestItemIndex=$("smartSuggestItemIndex").value;
		var resLinkValue='resLinkValue'+smartSuggestItemIndex;
		if(smartSuggestDiv.style.display==''&&smartSuggestItemIndex>=0){
			var airportCodeValue=$(resLinkValue).value;
			setAirport(smartSuggestDiv,airportCodeValue);
			if(event.keyCode==13){
				$("formSubmitFlag").value='false';
			}
		}
		hideSmartSuggestDiv(smartSuggestDiv);
	}
}

function checkKeyPressed(event,smartSuggestDiv){
	var status='true';
	var totalSmartSuggestCount=$("totalSmartSuggestCount").value;
	var smartSuggestItemIndex=$("smartSuggestItemIndex").value;
	var key=event.keyCode;
	var moveRangeStart=$("moveRangeStart").value;
	var moveRangeEnd=$("moveRangeEnd").value;
	if(key==13){
		hideSmartSuggestDiv(smartSuggestDiv);
		status='false';
	}
	if(key==27){
		hideSmartSuggestDiv(smartSuggestDiv);
		status='false';
	}else if(key==40){
		if(smartSuggestDiv.style.display==''){
			if(totalSmartSuggestCount==0){
				smartSuggestItemIndex=0;
				selectItem(smartSuggestItemIndex);
				$("smartSuggestItemIndex").value=smartSuggestItemIndex;
			}else if(totalSmartSuggestCount>0&&smartSuggestItemIndex<totalSmartSuggestCount-1){
				if(smartSuggestItemIndex>=0){
					deSelectItem(smartSuggestItemIndex);
				}
				$("smartSuggestItemIndex").value=++smartSuggestItemIndex;
				selectItem(smartSuggestItemIndex);
				var divId='divId'+smartSuggestItemIndex;
				if(!(smartSuggestItemIndex>=moveRangeStart&&smartSuggestItemIndex<=moveRangeEnd)){
					smartSuggestDiv.scrollTop+=$(divId).offsetHeight;
					moveRangeStart++;
					moveRangeEnd++;
					$("moveRangeStart").value=moveRangeStart;
					$("moveRangeEnd").value=moveRangeEnd;
				}
				smartSuggestItemIndex++;
			}
		}
		status='false';
	}else if(key==38){
		if(smartSuggestDiv.style.display==''){
			if(totalSmartSuggestCount==0){
				deSelectItem(smartSuggestItemIndex);
				smartSuggestItemIndex=-1;
				$("smartSuggestItemIndex").value=smartSuggestItemIndex;
			}else if(totalSmartSuggestCount>0&&smartSuggestItemIndex>=0){
				if(smartSuggestItemIndex>=0){
					deSelectItem(smartSuggestItemIndex);
					smartSuggestItemIndex--;
					$("smartSuggestItemIndex").value=smartSuggestItemIndex;
				}
				if(smartSuggestItemIndex>=0){
					selectItem(smartSuggestItemIndex);
					$("smartSuggestItemIndex").value=smartSuggestItemIndex;
					var divId='divId'+smartSuggestItemIndex;
					if(!(smartSuggestItemIndex>=moveRangeStart&&smartSuggestItemIndex<=moveRangeEnd)){
						smartSuggestDiv.scrollTop-=$(divId).offsetHeight;
						moveRangeStart--;
						moveRangeEnd--;
						$("moveRangeStart").value=moveRangeStart;
						$("moveRangeEnd").value=moveRangeEnd;
					}
				}
			}
		}
		status='false';
	}else{
		$("smartSuggestItemIndex").value=-1;
		$("moveRangeStart").value=0;
		$("moveRangeEnd").value=6;
	}
	return status;
}

function selectItem(smartSuggestItemIndex){
	var resLink='resLink'+smartSuggestItemIndex;
	var divId='divId'+smartSuggestItemIndex;
	$(resLink).style.textDecoration='underline';
	$(resLink).style.backgroundColor='#FFFFCC';
	$(divId).style.backgroundColor='#FFFFCC';
}

function deSelectItem(smartSuggestItemIndex){
	if(smartSuggestItemIndex>=0){
		var resLink='resLink'+smartSuggestItemIndex;var divId='divId'+smartSuggestItemIndex;
		if(smartSuggestItemIndex%2){
			$(resLink).style.backgroundColor='#FFFFFF';
			$(divId).style.backgroundColor='#FFFFFF';
		}else{
			$(resLink).style.backgroundColor='#EEF1FA';
			$(divId).style.backgroundColor='#EEF1FA';
		}
		$(resLink).style.textDecoration='none';
	}
}

function smartSuggestLookup(element,smartSuggestDiv,event, flag){
	$("airportTextField").value=element.id;
	var airportField=$(element.id);
	var cumulativeOffset=airportField.cumulativeOffset();
	var elementDimensions=airportField.getDimensions();
	var searchText=element.value;
	var keyStatus=checkKeyPressed(event,smartSuggestDiv);
	if(keyStatus=='true'){
		if(searchText.length<3){
			hideSmartSuggestDiv(smartSuggestDiv);
			return;
		}else{
			SmartSuggestAjaxUtils.smartSuggestLookup(searchText,flag,
			function(response){
				if(response==null){
					hideSmartSuggestDiv(smartSuggestDiv);
				}else{
					displaySmartSuggestResults(response,smartSuggestDiv,cumulativeOffset,elementDimensions);
				}
			});
		}
	}
}

function displaySmartSuggestResults(locations,smartSuggestDiv,cumulativeOffset,elementDimensions){
	var resultsStart='<ul class=\"airports\" tabindex="-1">';
	var rowNode='';
	var resultsEnd='</ul>';
	var airportResults='';
	var myObj=eval('('+locations+')');
	if(myObj==undefined||myObj.list==undefined||myObj.list.Airport==undefined){
		return;
	}
	if((myObj.list.Airport.length==undefined)&&(myObj.list.Airport!=null)){
		row=createRowNode(smartSuggestDiv,0,myObj.list.Airport,'oddRow');
		$("totalSmartSuggestCount").value=0;
		airportResults+=row;
	}else{
		var airportMax=myObj.list.Airport.length;
		$("totalSmartSuggestCount").value=airportMax;
		for(var count=0;count<airportMax;count++){
			row=createRowNode(smartSuggestDiv,count,myObj.list.Airport[count],(count%2)?'evenRow':'oddRow');
			airportResults+=row;
		}
	}
	smartSuggestDiv.innerHTML=resultsStart+airportResults+resultsEnd;
	smartSuggestDiv.style.display='';
	var airportFld=$("airportTextField").value;
	var top=cumulativeOffset.top+elementDimensions.height;
	var left=cumulativeOffset.left;
	if(airportFld=='homeAirportForm.homeAirportCity'||airportFld=='salesAlertCityPairForm.origin'||airportFld=='salesAlertCityPairForm.destination'){
		top=cumulativeOffset.top+elementDimensions.height+10;
	}
	smartSuggestDiv.style.top=top;
	smartSuggestDiv.style.left=left;
	$("SmartSuggestDiv_Shade").style.top=top;
	$("SmartSuggestDiv_Shade").style.left=left;
	var shadeDivWidth=smartSuggestDiv.offsetWidth;
	var shadeDivHeight=smartSuggestDiv.offsetHeight;
	if(shadeDivHeight>120){
		shadeDivHeight=120;
	}
	$("shade").style.width=shadeDivWidth;
	$("SmartSuggestDiv_Shade").style.width=shadeDivWidth;
	$("SmartSuggestDiv_Shade").style.height=shadeDivHeight;
	$("SmartSuggestDiv_Shade").style.display='';
}

function createRowNode(smartSuggestDiv,count,airport,rowCssClass){
	rowNode='';
	rowNode+='<li class=\"'+rowCssClass+'Li\">';
	rowNode+='<div id=\"divId'+count+'\" class=\"'+rowCssClass+'\">';
	rowNode+='<input type=\"hidden\" id=\"resLinkValue'+count+'\" value=\"'+airport.code+'\" />';
	var stateCodeOrCountryName='';
	var countryCode=airport.countryCode;
	if("US"==countryCode){
		stateCodeOrCountryName=airport.stateCode;
	}else{
		stateCodeOrCountryName=airport.countryName;
	}
	rowNode+='<a id=\"resLink'+count+'\" style=\"text-decoration:none; color:#0000CC\" onmouseout=\"javascript:mouseOut()\" onmouseover="\javascript:mouseOver('+count+')\" href=\"javascript:void(0);\" onClick=\"javascript:setAirport('+smartSuggestDiv.id+','+'\''+airport.code+'\''+')\">'+airport.code+' - '+airport.name+', '+stateCodeOrCountryName+'</a>';
	rowNode+='</div></li>';
	return rowNode;
}

function setAirport(smartSuggestDiv,airportCode){
	var airportTextField=$("airportTextField").value;
	$(airportTextField).value=airportCode;
	hideSmartSuggestDiv(smartSuggestDiv);
}

function hideSmartSuggestDiv(smartSuggestDiv){
	smartSuggestDiv.innerHTML='';
	smartSuggestDiv.style.display='none';
	$("SmartSuggestDiv_Shade").style.display='none';
}

function mouseOver(reslinkItem){
	var smartSuggestItemIndex=$("smartSuggestItemIndex").value;
	deSelectItem(smartSuggestItemIndex);
	selectItem(reslinkItem);
	$("smartSuggestItemIndex").value=reslinkItem;
}

function mouseOut(){
	var smartSuggestItemIndex=$("smartSuggestItemIndex").value;
	if(smartSuggestItemIndex>=0){
		deSelectItem(smartSuggestItemIndex);
	}else{
		deSelectItem(0);
	}
	$("smartSuggestItemIndex").value=-1;
}

function errorHandler(message){systemError();}
