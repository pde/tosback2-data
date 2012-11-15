
// JScript File

/* The "plugin.js" is a combination of (ui.datepicker.js),added for Haven-2012 Optimization */







/* THIS IS "ui.datepicker.js" added for HAVEN-2012 OPTIMIZATION starts here ****/

(function($){function Datepicker(){this.debug=false;this._nextId=0;this._inst=[];
this._curInst=null;this._disabledInputs=[];this._datepickerShowing=false;this._inDialog=false;
this._mainDivId="ui-datepicker-div";this._appendClass="ui-datepicker-append";this._wrapClass="ui-datepicker-wrap";
this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";
this._promptClass="ui-datepicker-prompt";this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";this.regional=[];this.regional[""]={clearText:"Clear",helpText:"This is test",clearStatus:"Erase the current date",closeText:"Close",closeStatus:"Close without change",prevText:"&#x3c;Prev",prevStatus:"Show the previous month",nextText:"Next&#x3e;",nextStatus:"Show the next month",currentText:"Today",currentStatus:"Show the current month",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],monthStatus:"Show a different month",yearStatus:"Show a different year",weekHeader:"Wk",weekStatus:"Week of the year",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],dayStatus:"Set DD as first week day",dateStatus:"Select DD, M d",dateFormat:"mm/dd/yy",firstDay:0,initStatus:"Select a date",isRTL:false};
this._defaults={showOn:"focus",showAnim:"show",defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,closeAtTop:true,mandatory:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,changeMonth:true,changeYear:true,yearRange:"-10:+10",changeFirstDay:true,highlightWeek:false,showOtherMonths:false,showWeeks:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",showStatus:false,statusForDate:this.dateStatus,minDate:null,maxDate:null,hideminDate:null,hidemaxDate:null,speed:"normal",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,stepMonths:1,rangeSelect:false,rangeSeparator:" - ",altField:"",altFormat:""};
$.extend(this._defaults,this.regional[""]);this._datepickerDiv=$('<div id="'+this._mainDivId+'"></div>');
}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",log:function(){if(this.debug){console.log.apply("",arguments);
}},_register:function(inst){var id=this._nextId++;this._inst[id]=inst;return id;},_getInst:function(id){return this._inst[id]||id;
},setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this;
},_attachDatepicker:function(target,settings){var inlineSettings=null;for(attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);
if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue);
}catch(err){inlineSettings[attrName]=attrValue;}}}var nodeName=target.nodeName.toLowerCase();
var instSettings=(inlineSettings?$.extend(settings||{},inlineSettings):settings);
if(nodeName=="input"){var inst=(inst&&!inlineSettings?inst:new DatepickerInstance(instSettings,false));
this._connectDatepicker(target,inst);}else{if(nodeName=="div"||nodeName=="span"){var inst=new DatepickerInstance(instSettings,true);
this._inlineDatepicker(target,inst);}}},_destroyDatepicker:function(target){var nodeName=target.nodeName.toLowerCase();
var calId=target._calId;var $target=$(target);$target.removeAttr("_calId");if(nodeName=="input"){$target.siblings("."+this._appendClass).replaceWith("").end().siblings("."+this._triggerClass).replaceWith("").end().removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress);
var wrapper=$target.parents("."+this._wrapClass);if(wrapper){wrapper.siblings("."+this._appendClass).replaceWith("").end().replaceWith(wrapper.html());
}}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty();
}}if($("input[_calId="+calId+"]").length==0){this._inst[calId]=null;}},_enableDatepicker:function(target){target.disabled=false;
$(target).siblings("button."+this._triggerClass).each(function(){this.disabled=false;
}).end().siblings("img."+this._triggerClass).css({opacity:"1.0",cursor:""});this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value);
});},_disableDatepicker:function(target){target.disabled=true;$(target).siblings("button."+this._triggerClass).each(function(){this.disabled=true;
}).end().siblings("img."+this._triggerClass).css({opacity:"0.5",cursor:"default"});
this._disabledInputs=$.map($.datepicker._disabledInputs,function(value){return(value==target?null:value);
});this._disabledInputs[$.datepicker._disabledInputs.length]=target;},_isDisabledDatepicker:function(target){if(!target){return false;
}for(var i=0;i<this._disabledInputs.length;i++){if(this._disabledInputs[i]==target){return true;
}}return false;},_changeDatepicker:function(target,name,value){var settings=name||{};
if(typeof name=="string"){settings={};settings[name]=value;}if(inst=this._getInst(target._calId)){extendRemove(inst._settings,settings);
this._updateDatepicker(inst);}},_setDateDatepicker:function(target,date,endDate){if(inst=this._getInst(target._calId)){inst._setDate(date,endDate);
this._updateDatepicker(inst);}},_getDateDatepicker:function(target){var inst=this._getInst(target._calId);
if(inst){inst._setDateFromField($(target));}return(inst?inst._getDate():null);},_doKeyDown:function(e){var inst=$.datepicker._getInst(this._calId);
if($.datepicker._datepickerShowing){switch(e.keyCode){case 9:$.datepicker._hideDatepicker(null,"");
break;case 13:$.datepicker._selectDay(inst,inst._selectedMonth,inst._selectedYear,$("td.ui-datepicker-days-cell-over",inst._datepickerDiv)[0]);
return false;break;case 27:$.datepicker._hideDatepicker(null,inst._get("speed"));
break;case 33:$.datepicker._adjustDate(inst,(e.ctrlKey?-1:-inst._get("stepMonths")),(e.ctrlKey?"Y":"M"));
break;case 34:$.datepicker._adjustDate(inst,(e.ctrlKey?+1:+inst._get("stepMonths")),(e.ctrlKey?"Y":"M"));
break;case 35:if(e.ctrlKey){$.datepicker._clearDate(inst);}break;case 36:if(e.ctrlKey){$.datepicker._gotoToday(inst);
}break;case 37:if(e.ctrlKey){$.datepicker._adjustDate(inst,-1,"D");}break;case 38:if(e.ctrlKey){$.datepicker._adjustDate(inst,-7,"D");
}break;case 39:if(e.ctrlKey){$.datepicker._adjustDate(inst,+1,"D");}break;case 40:if(e.ctrlKey){$.datepicker._adjustDate(inst,+7,"D");
}break;}}else{if(e.keyCode==36&&e.ctrlKey){$.datepicker._showDatepicker(this);}}},_doKeyPress:function(e){var inst=$.datepicker._getInst(this._calId);
var chars=$.datepicker._possibleChars(inst._get("dateFormat"));var chr=String.fromCharCode(e.charCode==undefined?e.keyCode:e.charCode);
return e.ctrlKey||(chr<" "||!chars||chars.indexOf(chr)>-1);},_connectDatepicker:function(target,inst){var input=$(target);
if(input.hasClass(this.markerClassName)){return;}var appendText=inst._get("appendText");
var isRTL=inst._get("isRTL");if(appendText){input[isRTL?"before":"after"]('<span class="'+this._appendClass+'">'+appendText+"</span>");
}var showOn=inst._get("showOn");if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker);
}if(showOn=="button"||showOn=="both"){input.wrap('<span class="'+this._wrapClass+'"></span>');
var buttonText=inst._get("buttonText");var buttonImage=inst._get("buttonImage");var trigger=$(inst._get("buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$("<button></button>").addClass(this._triggerClass).html(buttonImage!=""?$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText}):buttonText));
input[isRTL?"before":"after"](trigger);trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==target){$.datepicker._hideDatepicker();
}else{$.datepicker._showDatepicker(target);}});}input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker",function(event,key,value){inst._settings[key]=value;
}).bind("getData.datepicker",function(event,key){return inst._get(key);});input[0]._calId=inst._id;
},_inlineDatepicker:function(target,inst){var input=$(target);if(input.hasClass(this.markerClassName)){return;
}input.addClass(this.markerClassName).append(inst._datepickerDiv).bind("setData.datepicker",function(event,key,value){inst._settings[key]=value;
}).bind("getData.datepicker",function(event,key){return inst._get(key);});input[0]._calId=inst._id;
this._updateDatepicker(inst);},_inlineShow:function(inst){var numMonths=inst._getNumberOfMonths();
inst._datepickerDiv.width(numMonths[1]*$(".ui-datepicker",inst._datepickerDiv[0]).width());
},_dialogDatepicker:function(input,dateText,onSelect,settings,pos){var inst=this._dialogInst;
if(!inst){inst=this._dialogInst=new DatepickerInstance({},false);this._dialogInput=$('<input type="text" size="1" style="position: absolute; top: -100px;"/>');
this._dialogInput.keydown(this._doKeyDown);$("body").append(this._dialogInput);this._dialogInput[0]._calId=inst._id;
}extendRemove(inst._settings,settings||{});this._dialogInput.val(dateText);this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);
if(!this._pos){var browserWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
var browserHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY];}this._dialogInput.css("left",this._pos[0]+"px").css("top",this._pos[1]+"px");
inst._settings.onSelect=onSelect;this._inDialog=true;this._datepickerDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);if($.blockUI){$.blockUI(this._datepickerDiv);
}return this;},_showDatepicker:function(input){input=input.target||input;if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0];
}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return;
}var inst=$.datepicker._getInst(input._calId);var beforeShow=inst._get("beforeShow");
extendRemove(inst._settings,(beforeShow?beforeShow.apply(input,[input,inst]):{}));
$.datepicker._hideDatepicker(null,"");$.datepicker._lastInput=input;inst._setDateFromField(input);
if($.datepicker._inDialog){input.value="";}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);
$.datepicker._pos[1]+=input.offsetHeight;}var isFixed=false;$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";
return !isFixed;});if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;
$.datepicker._pos[1]-=document.documentElement.scrollTop;}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};
$.datepicker._pos=null;inst._rangeStart=null;inst._datepickerDiv.css({position:"absolute",display:"block",top:"-1000px"});
$.datepicker._updateDatepicker(inst);inst._datepickerDiv.width(inst._getNumberOfMonths()[1]*$(".ui-datepicker",inst._datepickerDiv[0])[0].offsetWidth);
offset=$.datepicker._checkOffset(inst,offset,isFixed);inst._datepickerDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});
if(!inst._inline){var showAnim=inst._get("showAnim")||"show";var speed=inst._get("speed");
var postProcess=function(){$.datepicker._datepickerShowing=true;if($.browser.msie&&parseInt($.browser.version)<7){$("iframe.ui-datepicker-cover").css({width:inst._datepickerDiv.width()+4,height:inst._datepickerDiv.height()+4});
}};inst._datepickerDiv[showAnim](speed,postProcess);if(speed==""){postProcess();}if(inst._input[0].type!="hidden"){inst._input[0].focus();
}$.datepicker._curInst=inst;}},_updateDatepicker:function(inst){var dims={width:inst._datepickerDiv.width()+4,height:inst._datepickerDiv.height()+4};
inst._datepickerDiv.empty().append(inst._generateDatepicker()).find("iframe.ui-datepicker-cover").css({width:dims.width,height:dims.height});
var numMonths=inst._getNumberOfMonths();if(numMonths[0]!=1||numMonths[1]!=1){inst._datepickerDiv.addClass("ui-datepicker-multi");
}else{inst._datepickerDiv.removeClass("ui-datepicker-multi");}if(inst._get("isRTL")){inst._datepickerDiv.addClass("ui-datepicker-rtl");
}else{inst._datepickerDiv.removeClass("ui-datepicker-rtl");}if(inst._input&&inst._input[0].type!="hidden"){$(inst._input[0]).focus();
}},_checkOffset:function(inst,offset,isFixed){var pos=inst._input?$.datepicker._findPos(inst._input[0]):null;
var browserWidth=window.innerWidth||document.documentElement.clientWidth;var browserHeight=window.innerHeight||document.documentElement.clientHeight;
var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
if((offset.left+inst._datepickerDiv.width()-scrollX)>browserWidth){offset.left=Math.max((isFixed?0:scrollX),pos[0]+(inst._input?inst._input.width():0)-(isFixed?scrollX:0)-inst._datepickerDiv.width()-(isFixed&&$.browser.opera?document.documentElement.scrollLeft:0));
}else{offset.left-=(isFixed?scrollX:0);}if((offset.top+inst._datepickerDiv.height()-scrollY)>browserHeight){offset.top=Math.max((isFixed?0:scrollY),pos[1]-(isFixed?scrollY:0)-(this._inDialog?0:inst._datepickerDiv.height())-(isFixed&&$.browser.opera?document.documentElement.scrollTop:0));
}else{offset.top-=(isFixed?scrollY:0);}return offset;},_findPos:function(obj){while(obj&&(obj.type=="hidden"||obj.nodeType!=1)){obj=obj.nextSibling;
}var position=$(obj).offset();return[position.left,position.top];},_hideDatepicker:function(input,speed){var inst=this._curInst;
if(!inst){return;}var rangeSelect=inst._get("rangeSelect");if(rangeSelect&&this._stayOpen){this._selectDate(inst,inst._formatDate(inst._currentDay,inst._currentMonth,inst._currentYear));
}this._stayOpen=false;if(this._datepickerShowing){speed=(speed!=null?speed:inst._get("speed"));
var showAnim=inst._get("showAnim");inst._datepickerDiv[(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide"))](speed,function(){$.datepicker._tidyDialog(inst);
});if(speed==""){this._tidyDialog(inst);}var onClose=inst._get("onClose");if(onClose){onClose.apply((inst._input?inst._input[0]:null),[inst._getDate(),inst]);
}this._datepickerShowing=false;this._lastInput=null;inst._settings.prompt=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if($.blockUI){$.unblockUI();$("body").append(this._datepickerDiv);}}this._inDialog=false;
}this._curInst=null;},_tidyDialog:function(inst){inst._datepickerDiv.removeClass(this._dialogClass).unbind(".ui-datepicker");
$("."+this._promptClass,inst._datepickerDiv).remove();},_checkExternalClick:function(event){if(!$.datepicker._curInst){return;
}var $target=$(event.target);if(($target.parents("#"+$.datepicker._mainDivId).length==0)&&!$target.hasClass($.datepicker.markerClassName)&&!$target.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)){$.datepicker._hideDatepicker(null,"");
}},_adjustDate:function(id,offset,period){var inst=this._getInst(id);inst._adjustDate(offset,period);
this._updateDatepicker(inst);},_gotoToday:function(id){var date=new Date();var inst=this._getInst(id);
inst._selectedDay=date.getDate();inst._drawMonth=inst._selectedMonth=date.getMonth();
inst._drawYear=inst._selectedYear=date.getFullYear();this._adjustDate(inst);inst._notifyChange();
},_selectMonthYear:function(id,select,period){var inst=this._getInst(id);inst._selectingMonthYear=false;
inst[period=="M"?"_drawMonth":"_drawYear"]=select.options[select.selectedIndex].value-0;
this._adjustDate(inst);inst._notifyChange();},_clickMonthYear:function(id){var inst=this._getInst(id);
if(inst._input&&inst._selectingMonthYear&&!$.browser.msie){inst._input[0].focus();
}inst._selectingMonthYear=!inst._selectingMonthYear;},_changeFirstDay:function(id,day){var inst=this._getInst(id);
inst._settings.firstDay=day;this._updateDatepicker(inst);},_selectDay:function(id,month,year,td){if($(td).hasClass(this._unselectableClass)){return;
}var inst=this._getInst(id);var rangeSelect=inst._get("rangeSelect");if(rangeSelect){this._stayOpen=!this._stayOpen;
if(this._stayOpen){$(".ui-datepicker td").removeClass(this._currentClass);$(td).addClass(this._currentClass);
}}inst._selectedDay=inst._currentDay=$("a",td).html();inst._selectedMonth=inst._currentMonth=month;
inst._selectedYear=inst._currentYear=year;if(this._stayOpen){inst._endDay=inst._endMonth=inst._endYear=null;
}else{if(rangeSelect){inst._endDay=inst._currentDay;inst._endMonth=inst._currentMonth;
inst._endYear=inst._currentYear;}}this._selectDate(id,inst._formatDate(inst._currentDay,inst._currentMonth,inst._currentYear));
if(this._stayOpen){inst._rangeStart=new Date(inst._currentYear,inst._currentMonth,inst._currentDay);
this._updateDatepicker(inst);}else{if(rangeSelect){inst._selectedDay=inst._currentDay=inst._rangeStart.getDate();
inst._selectedMonth=inst._currentMonth=inst._rangeStart.getMonth();inst._selectedYear=inst._currentYear=inst._rangeStart.getFullYear();
inst._rangeStart=null;if(inst._inline){this._updateDatepicker(inst);}}}},_clearDate:function(id){var inst=this._getInst(id);
if(inst._get("mandatory")){return;}this._stayOpen=false;inst._endDay=inst._endMonth=inst._endYear=inst._rangeStart=null;
this._selectDate(inst,"");},_selectDate:function(id,dateStr){var inst=this._getInst(id);
dateStr=(dateStr!=null?dateStr:inst._formatDate());if(inst._get("rangeSelect")&&dateStr){dateStr=(inst._rangeStart?inst._formatDate(inst._rangeStart):dateStr)+inst._get("rangeSeparator")+dateStr;
}if(inst._input){inst._input.val(dateStr);}this._updateAlternate(inst);var onSelect=inst._get("onSelect");
if(onSelect){onSelect.apply((inst._input?inst._input[0]:null),[dateStr,inst]);}else{if(inst._input){inst._input.trigger("change");
}}if(inst._inline){this._updateDatepicker(inst);}else{if(!this._stayOpen){this._hideDatepicker(null,inst._get("speed"));
this._lastInput=inst._input[0];if(typeof(inst._input[0])!="object"){inst._input[0].focus();
}this._lastInput=null;}}},_updateAlternate:function(inst){var altField=inst._get("altField");
if(altField){var altFormat=inst._get("altFormat");var date=inst._getDate();dateStr=(isArray(date)?(!date[0]&&!date[1]?"":$.datepicker.formatDate(altFormat,date[0],inst._getFormatConfig())+inst._get("rangeSeparator")+$.datepicker.formatDate(altFormat,date[1]||date[0],inst._getFormatConfig())):$.datepicker.formatDate(altFormat,date,inst._getFormatConfig()));
$(altField).each(function(){$(this).val(dateStr);});}},noWeekends:function(date){var day=date.getDay();
return[(day>0&&day<6),""];},iso8601Week:function(date){var checkDate=new Date(date.getFullYear(),date.getMonth(),date.getDate(),(date.getTimezoneOffset()/-60));
var firstMon=new Date(checkDate.getFullYear(),1-1,4);var firstDay=firstMon.getDay()||7;
firstMon.setDate(firstMon.getDate()+1-firstDay);if(firstDay<4&&checkDate<firstMon){checkDate.setDate(checkDate.getDate()-3);
return $.datepicker.iso8601Week(checkDate);}else{if(checkDate>new Date(checkDate.getFullYear(),12-1,28)){firstDay=new Date(checkDate.getFullYear()+1,1-1,4).getDay()||7;
if(firstDay>4&&(checkDate.getDay()||7)<firstDay-3){checkDate.setDate(checkDate.getDate()+3);
return $.datepicker.iso8601Week(checkDate);}}}return Math.floor(((checkDate-firstMon)/86400000)/7)+1;
},dateStatus:function(date,inst){return $.datepicker.formatDate(inst._get("dateStatus"),date,inst._getFormatConfig());
},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments";
}value=(typeof value=="object"?value.toString():value+"");if(value==""){return null;
}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;
var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var year=-1;
var month=-1;var day=-1;var literal=false;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++;}return matches;};var getNumber=function(match){lookAhead(match);
var size=(match=="y"?4:2);var num=0;while(size>0&&iValue<value.length&&value.charAt(iValue)>="0"&&value.charAt(iValue)<="9"){num=num*10+(value.charAt(iValue++)-0);
size--;}if(size==(match=="y"?4:2)){throw"Missing number at position "+iValue;}return num;
};var getName=function(match,shortNames,longNames){var names=(lookAhead(match)?longNames:shortNames);
var size=0;for(var j=0;j<names.length;j++){size=Math.max(size,names[j].length);}var name="";
var iInit=iValue;while(size>0&&iValue<value.length){name+=value.charAt(iValue++);
for(var i=0;i<names.length;i++){if(name==names[i]){return i+1;}}size--;}throw"Unknown name at position "+iInit;
};var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue;
}iValue++;};var iValue=0;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false;
}else{checkLiteral();}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");
break;case"D":getName("D",dayNamesShort,dayNames);break;case"m":month=getNumber("m");
break;case"M":month=getName("M",monthNamesShort,monthNames);break;case"y":year=getNumber("y");
break;case"'":if(lookAhead("'")){checkLiteral();}else{literal=true;}break;default:checkLiteral();
}}}if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100);
}var date=new Date(year,month-1,day);if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date";
}return date;},formatDate:function(format,date,settings){if(!date){return"";}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++;}return matches;};var formatNumber=function(match,value){return(lookAhead(match)&&value<10?"0":"")+value;
};var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value]);
};var output="";var literal=false;if(date){for(var iFormat=0;iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false;
}else{output+=format.charAt(iFormat);}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate());
break;case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);break;
case"m":output+=formatNumber("m",date.getMonth()+1);break;case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);
break;case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);
break;case"'":if(lookAhead("'")){output+="'";}else{literal=true;}break;default:output+=format.charAt(iFormat);
}}}}return output;},_possibleChars:function(format){var chars="";var literal=false;
for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false;
}else{chars+=format.charAt(iFormat);}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":chars+="0123456789";
break;case"D":case"M":return null;case"'":if(lookAhead("'")){chars+="'";}else{literal=true;
}break;default:chars+=format.charAt(iFormat);}}}return chars;}});function DatepickerInstance(settings,inline){this._id=$.datepicker._register(this);
this._selectedDay=0;this._selectedMonth=0;this._selectedYear=0;this._drawMonth=0;
this._drawYear=0;this._input=null;this._inline=inline;this._datepickerDiv=(!inline?$.datepicker._datepickerDiv:$('<div id="'+$.datepicker._mainDivId+"-"+this._id+'" class="ui-datepicker-inline">'));
this._settings=extendRemove(settings||{});if(inline){this._setDate(this._getDefaultDate());
}}$.extend(DatepickerInstance.prototype,{_get:function(name){return this._settings[name]!==undefined?this._settings[name]:$.datepicker._defaults[name];
},_setDateFromField:function(input){this._input=$(input);var dateFormat=this._get("dateFormat");
var dates=this._input?this._input.val().split(this._get("rangeSeparator")):null;this._endDay=this._endMonth=this._endYear=null;
var date=defaultDate=this._getDefaultDate();if(dates.length>0){var settings=this._getFormatConfig();
if(dates.length>1){date=$.datepicker.parseDate(dateFormat,dates[1],settings)||defaultDate;
this._endDay=date.getDate();this._endMonth=date.getMonth();this._endYear=date.getFullYear();
}try{date=$.datepicker.parseDate(dateFormat,dates[0],settings)||defaultDate;}catch(e){$.datepicker.log(e);
date=defaultDate;}}this._selectedDay=date.getDate();this._drawMonth=this._selectedMonth=date.getMonth();
this._drawYear=this._selectedYear=date.getFullYear();this._currentDay=(dates[0]?date.getDate():0);
this._currentMonth=(dates[0]?date.getMonth():0);this._currentYear=(dates[0]?date.getFullYear():0);
this._adjustDate();},_getDefaultDate:function(){var date=this._determineDate("defaultDate",new Date());
var minDate=this._getMinMaxDate("min",true);var maxDate=this._getMinMaxDate("max");
date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);
return date;},_determineDate:function(name,defaultDate){var offsetNumeric=function(offset){var date=new Date();
date.setDate(date.getDate()+offset);return date;};var offsetString=function(offset,getDaysInMonth){var date=new Date();
var year=date.getFullYear();var month=date.getMonth();var day=date.getDate();var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
var matches=pattern.exec(offset);while(matches){switch(matches[2]||"d"){case"d":case"D":day+=(matches[1]-0);
break;case"w":case"W":day+=(matches[1]*7);break;case"m":case"M":month+=(matches[1]-0);
day=Math.min(day,getDaysInMonth(year,month));break;case"y":case"Y":year+=(matches[1]-0);
day=Math.min(day,getDaysInMonth(year,month));break;}matches=pattern.exec(offset);
}return new Date(year,month,day);};var date=this._get(name);return(date==null?defaultDate:(typeof date=="string"?offsetString(date,this._getDaysInMonth):(typeof date=="number"?offsetNumeric(date):date)));
},_setDate:function(date,endDate){this._selectedDay=this._currentDay=date.getDate();
this._drawMonth=this._selectedMonth=this._currentMonth=date.getMonth();this._drawYear=this._selectedYear=this._currentYear=date.getFullYear();
if(this._get("rangeSelect")){if(endDate){this._endDay=endDate.getDate();this._endMonth=endDate.getMonth();
this._endYear=endDate.getFullYear();}else{this._endDay=this._currentDay;this._endMonth=this._currentMonth;
this._endYear=this._currentYear;}}this._adjustDate();},_getDate:function(){var startDate=(!this._currentYear||(this._input&&this._input.val()=="")?null:new Date(this._currentYear,this._currentMonth,this._currentDay));
if(this._get("rangeSelect")){return[this._rangeStart||startDate,(!this._endYear?null:new Date(this._endYear,this._endMonth,this._endDay))];
}else{return startDate;}},_generateDatepicker:function(){var today=new Date();today=new Date(today.getFullYear(),today.getMonth(),today.getDate());
var showStatus=this._get("showStatus");var isRTL=this._get("isRTL");var clear=(this._get("mandatory")?"":'<div class="ui-datepicker-clear"><a onclick="jQuery.datepicker._clearDate('+this._id+');"'+(showStatus?this._addStatus(this._get("clearStatus")||"&#xa0;"):"")+">"+this._get("clearText")+"</a></div>");
var controls='<div class="ui-datepicker-control">'+(isRTL?"":clear)+'<div class="ui-datepicker-close"><a onclick="jQuery.datepicker._hideDatepicker();"'+(showStatus?this._addStatus(this._get("closeStatus")||"&#xa0;"):"")+">"+this._get("closeText")+"</a></div>"+(isRTL?clear:"")+"</div>";
var prompt=this._get("prompt");var closeAtTop=this._get("closeAtTop");var hideIfNoPrevNext=this._get("hideIfNoPrevNext");
var navigationAsDateFormat=this._get("navigationAsDateFormat");var numMonths=this._getNumberOfMonths();
var stepMonths=this._get("stepMonths");var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);
var minDate=this._getMinMaxDate("min",true);var maxDate=this._getMinMaxDate("max");
var drawMonth=this._drawMonth;var drawYear=this._drawYear;if(maxDate){var maxDraw=new Date(maxDate.getFullYear(),maxDate.getMonth()-numMonths[1]+1,maxDate.getDate());
maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);while(new Date(drawYear,drawMonth,1)>maxDraw){drawMonth--;
if(drawMonth<0){drawMonth=11;drawYear--;}}}var prevText=this._get("prevText");prevText=(!navigationAsDateFormat?prevText:$.datepicker.formatDate(prevText,new Date(drawYear,drawMonth-stepMonths,1),this._getFormatConfig()));
var prev='<div class="ui-datepicker-prev">'+(this._canAdjustMonth(-1,drawYear,drawMonth)?'<a onclick="jQuery.datepicker._adjustDate('+this._id+", -"+stepMonths+", 'M');\""+(showStatus?this._addStatus(this._get("prevStatus")||"&#xa0;"):"")+">"+prevText+"</a>":(hideIfNoPrevNext?"":"<label>"+prevText+"</label>"))+"</div>";
var nextText=this._get("nextText");nextText=(!navigationAsDateFormat?nextText:$.datepicker.formatDate(nextText,new Date(drawYear,drawMonth+stepMonths,1),this._getFormatConfig()));
var next='<div class="ui-datepicker-next">'+(this._canAdjustMonth(+1,drawYear,drawMonth)?'<a onclick="jQuery.datepicker._adjustDate('+this._id+", +"+stepMonths+", 'M');\""+(showStatus?this._addStatus(this._get("nextStatus")||"&#xa0;"):"")+">"+nextText+"</a>":(hideIfNoPrevNext?"":"<label>"+nextText+"</label>"))+"</div>";
var currentText=this._get("currentText");currentText=(!navigationAsDateFormat?currentText:$.datepicker.formatDate(currentText,today,this._getFormatConfig()));
var html=(prompt?'<div class="'+$.datepicker._promptClass+'">'+prompt+"</div>":"")+(closeAtTop&&!this._inline?controls:"")+'<div class="ui-datepicker-links">'+(isRTL?next:prev)+(this._isInRange(today)?'<div class="ui-datepicker-current"><a onclick="jQuery.datepicker._gotoToday('+this._id+');"'+(showStatus?this._addStatus(this._get("currentStatus")||"&#xa0;"):"")+">"+currentText+"</a></div>":"")+(isRTL?prev:next)+"</div>";
var showWeeks=this._get("showWeeks");for(var row=0;row<numMonths[0];row++){for(var col=0;
col<numMonths[1];col++){var selectedDate=new Date(drawYear,drawMonth,this._selectedDay);
html+='<div class="ui-datepicker-one-month'+(col==0?" ui-datepicker-new-row":"")+'">'+this._generateMonthYearHeader(drawMonth,drawYear,minDate,maxDate,selectedDate,row>0||col>0)+'<table class="ui-datepicker" cellpadding="0" cellspacing="0"><thead><tr class="ui-datepicker-title-row">'+(showWeeks?"<td>"+this._get("weekHeader")+"</td>":"");
var firstDay=this._get("firstDay");var changeFirstDay=this._get("changeFirstDay");
var dayNames=this._get("dayNames");var dayNamesShort=this._get("dayNamesShort");var dayNamesMin=this._get("dayNamesMin");
for(var dow=0;dow<7;dow++){var day=(dow+firstDay)%7;var status=this._get("dayStatus")||"&#xa0;";
status=(status.indexOf("DD")>-1?status.replace(/DD/,dayNames[day]):status.replace(/D/,dayNamesShort[day]));
html+="<td"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end-cell"':"")+">"+(!changeFirstDay?"<span":'<a onclick="jQuery.datepicker._changeFirstDay('+this._id+", "+day+');"')+(showStatus?this._addStatus(status):"")+' title="'+dayNames[day]+'">'+dayNamesMin[day]+(changeFirstDay?"</a>":"</span>")+"</td>";
}html+="</tr></thead><tbody>";var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);
if(drawYear==this._selectedYear&&drawMonth==this._selectedMonth){this._selectedDay=Math.min(this._selectedDay,daysInMonth);
}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;var currentDate=(!this._currentDay?new Date(9999,9,9):new Date(this._currentYear,this._currentMonth,this._currentDay));
var endDate=this._endDay?new Date(this._endYear,this._endMonth,this._endDay):currentDate;
var printDate=new Date(drawYear,drawMonth,1-leadDays);var numRows=(isMultiMonth?6:Math.ceil((leadDays+daysInMonth)/7));
var beforeShowDay=this._get("beforeShowDay");var highlightWeek=this._get("highlightWeek");
var showOtherMonths=this._get("showOtherMonths");var calculateWeek=this._get("calculateWeek")||$.datepicker.iso8601Week;
var dateStatus=this._get("statusForDate")||$.datepicker.dateStatus;for(var dRow=0;
dRow<numRows;dRow++){html+='<tr class="ui-datepicker-days-row">'+(showWeeks?'<td class="ui-datepicker-week-col">'+calculateWeek(printDate)+"</td>":"");
for(var dow=0;dow<7;dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((this._input?this._input[0]:null),[printDate]):[true,""]);
var otherMonth=(printDate.getMonth()!=drawMonth);var unselectable=otherMonth||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);
html+='<td class="ui-datepicker-days-cell'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end-cell":"")+(otherMonth?" ui-datepicker-otherMonth":"")+(printDate.getTime()==selectedDate.getTime()&&drawMonth==this._selectedMonth?" ui-datepicker-days-cell-over":"")+(unselectable?" "+$.datepicker._unselectableClass:"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" "+$.datepicker._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?(highlightWeek?" onmouseover=\"jQuery(this).parent().addClass('ui-datepicker-week-over');\" onmouseout=\"jQuery(this).parent().removeClass('ui-datepicker-week-over');\"":""):" onmouseover=\"jQuery(this).addClass('ui-datepicker-days-cell-over')"+(highlightWeek?".parent().addClass('ui-datepicker-week-over')":"")+";"+(!showStatus||(otherMonth&&!showOtherMonths)?"":"jQuery('#ui-datepicker-status-"+this._id+"').html('"+(dateStatus.apply((this._input?this._input[0]:null),[printDate,this])||"&#xa0;")+"');")+"\" onmouseout=\"jQuery(this).removeClass('ui-datepicker-days-cell-over')"+(highlightWeek?".parent().removeClass('ui-datepicker-week-over')":"")+";"+(!showStatus||(otherMonth&&!showOtherMonths)?"":"jQuery('#ui-datepicker-status-"+this._id+"').html('&#xa0;');")+'" onclick="jQuery.datepicker._selectDay('+this._id+","+drawMonth+","+drawYear+', this);"')+">"+(otherMonth?(showOtherMonths?printDate.getDate():"&#xa0;"):(unselectable?printDate.getDate():"<a>"+printDate.getDate()+"</a>"))+"</td>";
printDate.setDate(printDate.getDate()+1);}html+="</tr>";}drawMonth++;if(drawMonth>11){drawMonth=0;
drawYear++;}html+="</tbody></table></div>";}}html+=(showStatus?'<div style="clear: both;"></div><div id="ui-datepicker-status-'+this._id+'" class="ui-datepicker-status">'+(this._get("initStatus")||"&#xa0;")+"</div>":"")+this._get("helpText")+(!closeAtTop&&!this._inline?controls:"")+'<div style="clear: both;"></div>'+($.browser.msie&&parseInt($.browser.version)<7&&!this._inline?'<iframe src="javascript:false;" class="ui-datepicker-cover"></iframe>':"");
return html;},_generateMonthYearHeader:function(drawMonth,drawYear,minDate,maxDate,selectedDate,secondary){var hminDate=this._getMinMaxDate("hidemin",true);
var hmaxDate=this._getMinMaxDate("hidemax");minDate=(this._rangeStart&&minDate&&selectedDate<minDate?selectedDate:minDate);
var showStatus=this._get("showStatus");var html='<div class="ui-datepicker-header">';
var monthNames=this._get("monthNames");if(secondary||!this._get("changeMonth")){html+=monthNames[drawMonth]+"&#xa0;";
}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);
html+='<select class="ui-datepicker-new-month" onchange="jQuery.datepicker._selectMonthYear('+this._id+", this, 'M');\" onclick=\"jQuery.datepicker._clickMonthYear("+this._id+');"'+(showStatus?this._addStatus(this._get("monthStatus")||"&#xa0;"):"")+">";
for(var month=0;month<12;month++){/*20120430-SS:EDIT allow november*/if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())&&(month>=2)&&(month<11)){html+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNames[month]+"</option>";
}}html+="</select>";}if(secondary||!this._get("changeYear")){html+=drawYear;}else{var years=this._get("yearRange").split(":");
var year=0;var endYear=0;if(years.length!=2){year=drawYear-10;endYear=drawYear+10;
}else{if(years[0].charAt(0)=="+"||years[0].charAt(0)=="-"){year=endYear=new Date().getFullYear();
year+=parseInt(years[0],10);endYear+=parseInt(years[1],10);}else{year=parseInt(years[0],10);
endYear=parseInt(years[1],10);}}year=(minDate?Math.max(year,minDate.getFullYear()):year);
endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);html+='<select class="ui-datepicker-new-year" onchange="jQuery.datepicker._selectMonthYear('+this._id+", this, 'Y');\" onclick=\"jQuery.datepicker._clickMonthYear("+this._id+');"'+(showStatus?this._addStatus(this._get("yearStatus")||"&#xa0;"):"")+">";
for(;year<=endYear;year++){html+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>";
}html+="</select>";}html+="</div>";return html;},_addStatus:function(text){return" onmouseover=\"jQuery('#ui-datepicker-status-"+this._id+"').html('"+text+"');\" onmouseout=\"jQuery('#ui-datepicker-status-"+this._id+"').html('&#xa0;');\"";
},_adjustDate:function(offset,period){var year=this._drawYear+(period=="Y"?offset:0);
var month=this._drawMonth+(period=="M"?offset:0);/*20120430-SS:EDIT allow november*/if(month>10){month=2;year=year+1;
}if(month<=1){month=10;year=year-1;}var day=Math.min(this._selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);
var date=new Date(year,month,day);var minDate=this._getMinMaxDate("min",true);var maxDate=this._getMinMaxDate("max");
date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);
this._selectedDay=date.getDate();this._drawMonth=this._selectedMonth=date.getMonth();
this._drawYear=this._selectedYear=date.getFullYear();if(period=="M"||period=="Y"){this._notifyChange();
}},_notifyChange:function(){var onChange=this._get("onChangeMonthYear");if(onChange){onChange.apply((this._input?this._input[0]:null),[new Date(this._selectedYear,this._selectedMonth,1),this]);
}},_getNumberOfMonths:function(){var numMonths=this._get("numberOfMonths");return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths));
},_getMinMaxDate:function(minMax,checkRange){var date=this._determineDate(minMax+"Date",null);
if(date){date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);
}return(!checkRange||!this._rangeStart?date:(!date||this._rangeStart>date?this._rangeStart:date));
},_getDaysInMonth:function(year,month){return 32-new Date(year,month,32).getDate();
},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay();
},_canAdjustMonth:function(offset,curYear,curMonth){var numMonths=this._getNumberOfMonths();
var date=new Date(curYear,curMonth+(offset<0?offset:numMonths[1]),1);if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()));
}return this._isInRange(date);},_isInRange:function(date){var newMinDate=(!this._rangeStart?null:new Date(this._selectedYear,this._selectedMonth,this._selectedDay));
newMinDate=(newMinDate&&this._rangeStart<newMinDate?this._rangeStart:newMinDate);
var minDate=newMinDate||this._getMinMaxDate("min");var maxDate=this._getMinMaxDate("max");
return((!minDate||date>=minDate)&&(!maxDate||date<=maxDate));},_getFormatConfig:function(){var shortYearCutoff=this._get("shortYearCutoff");
shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get("dayNamesShort"),dayNames:this._get("dayNames"),monthNamesShort:this._get("monthNamesShort"),monthNames:this._get("monthNames")};
},_formatDate:function(day,month,year){if(!day){this._currentDay=this._selectedDay;
this._currentMonth=this._selectedMonth;this._currentYear=this._selectedYear;}var date=(day?(typeof day=="object"?day:new Date(year,month,day)):new Date(this._currentYear,this._currentMonth,this._currentDay));
return $.datepicker.formatDate(this._get("dateFormat"),date,this._getFormatConfig());
}});function extendRemove(target,props){$.extend(target,props);for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name];
}}return target;}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))));
}$.fn.datepicker=function(options){var otherArgs=Array.prototype.slice.call(arguments,1);
if(typeof options=="string"&&(options=="isDisabled"||options=="getDate")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs));
}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options);
});};$.datepicker=new Datepicker();$(document).ready(function(){$(document.body).append($.datepicker._datepickerDiv).mousedown($.datepicker._checkExternalClick);
});})(jQuery);

/* THIS IS "ui.datepicker.js" added for HAVEN-2012 OPTIMIZATION ends here ****/









/* THIS IS "jquery.jcarousel.min.js" for HAVEN-2012 OPTIMIZATION starts here ****/

/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function(i){i.fn.jcarousel=function(a){if(typeof a=="string"){var c=i(this).data("jcarousel"),b=Array.prototype.slice.call(arguments,1);return c[a].apply(c,b)}else return this.each(function(){i(this).data("jcarousel",new h(this,a))})};var p={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null, itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},q=false;i(window).bind("load.jcarousel",function(){q=true});i.jcarousel=function(a,c){this.options=i.extend({},p,c||{});this.locked=false;this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===undefined)this.options.rtl= (i(a).attr("dir")||i("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),e=0;e<d.length;e++)if(d[e].indexOf("jcarousel-skin")!=-1){i(a).removeClass(d[e]);b=d[e];break}if(a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"){this.list=i(a);this.container=this.list.parent();if(this.container.hasClass("jcarousel-clip")){if(!this.container.parent().hasClass("jcarousel-container"))this.container= this.container.wrap("<div></div>");this.container=this.container.parent()}else if(!this.container.hasClass("jcarousel-container"))this.container=this.list.wrap("<div></div>").parent()}else{this.container=i(a);this.list=this.container.find("ul,ol").eq(0)}b!=""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.clip=this.list.parent();if(!this.clip.length||!this.clip.hasClass("jcarousel-clip"))this.clip=this.list.wrap("<div></div>").parent(); this.buttonNext=i(".jcarousel-next",this.container);if(this.buttonNext.size()==0&&this.options.buttonNextHTML!=null)this.buttonNext=this.clip.after(this.options.buttonNextHTML).next();this.buttonNext.addClass(this.className("jcarousel-next"));this.buttonPrev=i(".jcarousel-prev",this.container);if(this.buttonPrev.size()==0&&this.options.buttonPrevHTML!=null)this.buttonPrev=this.clip.after(this.options.buttonPrevHTML).next();this.buttonPrev.addClass(this.className("jcarousel-prev"));this.clip.addClass(this.className("jcarousel-clip")).css({overflow:"hidden", position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});!this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var f=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;b=this.list.children("li");var g= this;if(b.size()>0){var j=0;e=this.options.offset;b.each(function(){g.format(this,e++);j+=g.dimension(this,f)});this.list.css(this.wh,j+100+"px");if(!c||c.size===undefined)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){g.next()};this.funcPrev=function(){g.prev()};this.funcResize=function(){g.reload()};this.options.initCallback!=null&&this.options.initCallback(this,"init");if(!q&& i.browser.safari){this.buttons(false,false);i(window).bind("load.jcarousel",function(){g.setup()})}else this.setup()};var h=i.jcarousel;h.fn=h.prototype={jcarousel:"0.2.5"};h.fn.extend=h.extend=i.extend;h.fn.extend({setup:function(){this.prevLast=this.prevFirst=this.last=this.first=null;this.animating=false;this.tail=this.timer=null;this.inTail=false;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start);this.prevFirst=this.prevLast=null;this.animate(a, false);i(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize)}},reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");this.options.initCallback!=null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!=null&&this.inTail&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=false;this.options.reloadCallback!=null&&this.options.reloadCallback(this);if(this.options.visible!= null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(e){b+=a.dimension(this,c);if(e+1<a.first)d=b});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,false)},lock:function(){this.locked=true;this.buttons()},unlock:function(){this.locked=false;this.buttons()},size:function(a){if(a!=undefined){this.options.size=a;this.locked||this.buttons()}return this.options.size},has:function(a,c){if(c==undefined||!c)c= a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return false}return true},get:function(a){return i(".jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,e=i(c);if(b.length==0){var f;b=this.create(a);for(var g=h.intval(a);f=this.get(--g);)if(g<=0||f.length){g<=0?this.list.prepend(b):f.after(b);break}}else d=this.dimension(b);if(e.get(0).nodeName.toUpperCase()=="LI"){b.replaceWith(e); b=e}else b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);e=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;d=this.dimension(b,e)-d;a>0&&a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,h.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(!(!c.length||a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt, h.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,h.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.stopAuto();this.tail!=null&&!this.inTail?this.scrollTail(false):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!=null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.stopAuto();this.tail!=null&&this.inTail?this.scrollTail(true):this.scroll((this.options.wrap=="both"||this.options.wrap== "first")&&this.options.size!=null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!(this.locked||this.animating||!this.tail)){var c=h.intval(this.list.css(this.lt));!a?c-=this.tail:c+=this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){this.locked||this.animating||this.animate(this.pos(a),c)},pos:function(a){var c=h.intval(this.list.css(this.lt));if(this.locked||this.animating)return c;if(this.options.wrap!= "circular")a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a;for(var b=this.first>a,d=this.options.wrap!="circular"&&this.first<=1?1:this.first,e=b?this.get(d):this.get(this.last),f=b?d:d-1,g=null,j=0,l=false,k=0;b?--f>=a:++f<a;){g=this.get(f);l=!g.length;if(g.length==0){g=this.create(f).addClass(this.className("jcarousel-item-placeholder"));e[b?"before":"after"](g);if(this.first!=null&&this.options.wrap=="circular"&&this.options.size!==null&&(f<=0||f>this.options.size)){e=this.get(this.index(f)); if(e.length)g=this.add(f,e.clone(true))}}e=g;k=this.dimension(g);if(l)j+=k;if(this.first!=null&&(this.options.wrap=="circular"||f>=1&&(this.options.size==null||f<=this.options.size)))c=b?c+k:c-k}d=this.clipping();var o=[],n=0;f=a;var m=0;for(e=this.get(a-1);++n;){g=this.get(f);l=!g.length;if(g.length==0){g=this.create(f).addClass(this.className("jcarousel-item-placeholder"));e.length==0?this.list.prepend(g):e[b?"before":"after"](g);if(this.first!=null&&this.options.wrap=="circular"&&this.options.size!== null&&(f<=0||f>this.options.size)){e=this.get(this.index(f));if(e.length)g=this.add(f,e.clone(true))}}e=g;k=this.dimension(g);if(k==0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");if(this.options.wrap!="circular"&&this.options.size!==null&&f>this.options.size)o.push(g);else if(l)j+=k;m+=k;if(m>=d)break;f++}for(g=0;g<o.length;g++)o[g].remove();if(j>0){this.list.css(this.wh,this.dimension(this.list)+j+"px");if(b){c-=j;this.list.css(this.lt,h.intval(this.list.css(this.lt))- j+"px")}}j=a+n-1;if(this.options.wrap!="circular"&&this.options.size&&j>this.options.size)j=this.options.size;if(f>j){n=0;f=j;for(m=0;++n;){g=this.get(f--);if(!g.length)break;m+=this.dimension(g);if(m>=d)break}}f=j-n+1;if(this.options.wrap!="circular"&&f<1)f=1;if(this.inTail&&b){c+=this.tail;this.inTail=false}this.tail=null;if(this.options.wrap!="circular"&&j==this.options.size&&j-n+1>=1){b=h.margin(this.get(j),!this.options.vertical?"marginRight":"marginBottom");if(m-b>d)this.tail=m-d-b}for(;a-- > f;)c+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=f;this.last=j;return c},animate:function(a,c){if(!(this.locked||this.animating)){this.animating=true;var b=this,d=function(){b.animating=false;a==0&&b.list.css(b.lt,0);if(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size==null||b.last<b.options.size)b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var e= b.prevFirst;e<=b.prevLast;e++)if(e!==null&&!(e>=b.first&&e<=b.last)&&(e<1||e>b.options.size))b.remove(e)};this.notify("onBeforeAnimation");if(!this.options.animation||c==false){this.list.css(this.lt,a+"px");d()}else this.list.animate(!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},this.options.animation,this.options.easing,d)}},startAuto:function(a){if(a!=undefined)this.options.auto=a;if(this.options.auto==0)return this.stopAuto();if(this.timer==null){var c=this;this.timer=setTimeout(function(){c.next()}, this.options.auto*1E3)}},stopAuto:function(){if(this.timer!=null){clearTimeout(this.timer);this.timer=null}},buttons:function(a,c){if(a==undefined||a==null){a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size==null||this.last<this.options.size);if(!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!=null&&this.last>=this.options.size)a=this.tail!=null&&!this.inTail}if(c==undefined||c==null){c=!this.locked&&this.options.size!== 0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1);if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!=null&&this.first==1)c=this.tail!=null&&this.inTail}var b=this;this.buttonNext[a?"bind":"unbind"](this.options.buttonNextEvent+".jcarousel",this.funcNext)[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?false:true);this.buttonPrev[c?"bind":"unbind"](this.options.buttonPrevEvent+".jcarousel",this.funcPrev)[c?"removeClass": "addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?false:true);this.options.buttonNextCallback!=null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a);this.options.buttonPrevCallback!=null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)},notify:function(a){var c=this.prevFirst==null?"init":this.prevFirst< this.first?"next":"prev";this.callback("itemLoadCallback",a,c);if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",a,c,this.first);this.callback("itemFirstOutCallback",a,c,this.prevFirst)}if(this.prevLast!==this.last){this.callback("itemLastInCallback",a,c,this.last);this.callback("itemLastOutCallback",a,c,this.prevLast)}this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast, this.first,this.last)},callback:function(a,c,b,d,e,f,g){if(!(this.options[a]==undefined||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var j=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(i.isFunction(j)){var l=this;if(d===undefined)j(l,b,c);else if(e===undefined)this.get(d).each(function(){j(l,this,d,b,c)});else for(var k=d;k<=e;k++)k!==null&&!(k>=f&&k<=g)&&this.get(k).each(function(){j(l,this,k,b,c)})}}},create:function(a){return this.format("<li></li>",a)},format:function(a, c){a=i(a);for(var b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")},dimension:function(a,c){var b=a.jquery!=undefined?a[0]:a,d=!this.options.vertical?(b.offsetWidth|| h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginLeft")+h.margin(b,"marginRight"):(b.offsetHeight||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginTop")+h.margin(b,"marginBottom");if(c==undefined||d==c)return d;d=!this.options.vertical?c-h.margin(b,"marginLeft")-h.margin(b,"marginRight"):c-h.margin(b,"marginTop")-h.margin(b,"marginBottom");i(b).css(this.wh,d+"px");return this.dimension(b)},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-h.intval(this.clip.css("borderLeftWidth"))- h.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-h.intval(this.clip.css("borderTopWidth"))-h.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==undefined)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});h.extend({defaults:function(a){return i.extend(p,a||{})},margin:function(a,c){if(!a)return 0;var b=a.jquery!=undefined?a[0]:a;if(c=="marginRight"&&i.browser.safari){var d={display:"block","float":"none",width:"auto"},e,f;i.swap(b,d, function(){e=b.offsetWidth});d.marginRight=0;i.swap(b,d,function(){f=b.offsetWidth});return f-e}return h.intval(i.css(b,c))},intval:function(a){a=parseInt(a);return isNaN(a)?0:a}})})(jQuery);


/* THIS IS "jquery.jcarousel.min.js" for HAVEN-2012 OPTIMIZATION ends here ****/


/**
 * jQuery.placeholder - Placeholder plugin for input fields
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2008/10/14
 *
 * @author Blair Mitchelmore
 * @version 1.0.1
 *
 **/
new function($) {
    $.fn.placeholder = function(settings) {
        settings = settings || {};
        var key = settings.dataKey || "placeholderValue";
        var attr = settings.attr || "placeholder";
        var className = settings.className || "placeholder";
        var values = settings.values || [];
        var block = settings.blockSubmit || false;
        var blank = settings.blankSubmit || false;
        var submit = settings.onSubmit || false;
        var value = settings.value || "";
        var position = settings.cursor_position || 0;

        
        return this.filter(":input").each(function(index) { 
            $.data(this, key, values[index] || $(this).attr(attr)); 
        }).each(function() {
            if ($.trim($(this).val()) === "")
                $(this).addClass(className).val($.data(this, key));
        }).focus(function() {
            if ($.trim($(this).val()) === $.data(this, key)) 
                $(this).removeClass(className).val(value)
                if ($.fn.setCursorPosition) {
                  $(this).setCursorPosition(position);
                }
        }).blur(function() {
            if ($.trim($(this).val()) === value)
                $(this).addClass(className).val($.data(this, key));
        }).each(function(index, elem) {
            if (block)
                new function(e) {
                    $(e.form).submit(function() {
                        return $.trim($(e).val()) != $.data(e, key)
                    });
                }(elem);
            else if (blank)
                new function(e) {
                    $(e.form).submit(function() {
                        if ($.trim($(e).val()) == $.data(e, key)) 
                            $(e).removeClass(className).val("");
                        return true;
                    });
                }(elem);
            else if (submit)
                new function(e) { $(e.form).submit(submit); }(elem);
        });
    };
}(jQuery);




/** PTV pager starts here **/


var flagCheck = "false";
(function($) {
      
  $.fn.quickPager = function(options) {
  
    var defaults = {
            pageSize: 10,
            naviSize: 5,
            currentPage: 1,
      holder: ""
      };
      var options = $.extend(defaults, options);
      
    //leave this

    var selector = $(this);
    var totalRecords = $("DIV.TotalRecordCountClass").html(); //$(this).children().length;
    var pageCounter = 1;
//alert("totalRecords : "+totalRecords);
//alert("options.pageSize : "+options.pageSize);


if (totalRecords > options.pageSize)
{
    for (i=0; i<=(totalRecords-1); i++)
    {
      if(i < pageCounter*options.pageSize && i >= (pageCounter-1)*options.pageSize) {
        //$(this).addClass("page"+pageCounter);
      }
      else {
        //$(this).addClass("page"+(pageCounter+1));
        pageCounter ++;
      } 
    }
}
     
    
    
    //alert("pageCounter : "+pageCounter);
    
    //first check if there is more than one page. If so, build nav
    if(pageCounter > 1) 
    {
    
      //Build pager navigation
      var pageNav = "<ul class='pageNav'>"; 
      pageNav += "<li class=\"prev\" style=\"display:none;\"><a rel=\"prev\" href=\"#\">Previous</a></li>";
      for (i=1;i<=pageCounter;i++)
      {
      
        if (i==options.currentPage)
        {
          pageNav += "<li style=\"display:none;\" class=\"currentPage pageNav"+i+"\"'><a rel='"+i+"' href='#'>"+i+"</a></li>";  
        } else
        {
          pageNav += "<li style=\"display:none;\" class='pageNav"+i+"'><a rel='"+i+"' href='#'>"+i+"</a></li>";
        }
      
      }
      pageNav += "<li style=\"display:block;\" class=\"resultsShowingLI\"><div class=\"resultsShowing\"></div></li>";
      pageNav += "<li class=\"next\" style=\"display:block;\"><a rel=\"next\" href=\"#\">Next</a></li>";

      pageNav += "</ul>";
      
      
      
      
      if(options.holder == "") 
      {
        selector.after(pageNav);
      }
      else 
      {
        $(options.holder).append(pageNav);
      }
      
      var start = 1;
      var end = options.naviSize;
      
      var liSize = ($("UL.pageNav LI").length)/2;
          
      
      liSize = liSize - 3;
      
      // all hide and show start to end page with navigation.
      $('.pageNav').children().hide();
      
      
      
      $("li.prev").css("display", "none");
      $("li.next").css("display", "block");
      var liSize = ($("UL.pageNav LI").length)/2;     
                
          liSize = liSize - 3;
           var clickedLinkQ = $(".CurrentPageClass").val();
      if(clickedLinkQ  == 1)
                  {
                  $('UL.pageNav LI.prev').css("display", "none");
                  $('UL.pageNav LI.next').css("display", "block");
                  }
                  else if(clickedLinkQ == (liSize))
                  {
                  $('UL.pageNav LI.prev').css("display", "block");
                  $('UL.pageNav LI.next').css("display", "none");
                  }
                  else
                  {
                  $('UL.pageNav LI.prev').css("display", "block");
                  $('UL.pageNav LI.next').css("display", "block");
                  }
                
          
          
                  //remove current current (!) page
                  $("UL.pageNav li.currentPage").removeClass("currentPage");
                  
                  
                  //Add current page highlighting
            $("ul.pageNav").find("a[rel='"+clickedLinkQ+"']").parent("li").addClass("currentPage");
      
      
      $(".pageNav a").click(function(ev)
      {
	  var $resCount = $(".result-count");
	  var offsetTop = 0;
	  if($resCount.length > 0)
	  {
		 offsetTop = $resCount.offset().top;
	  }
	  
      window.scrollTo(0,offsetTop);
      ev.preventDefault();
        
              if($(this).attr("rel")=='prev')
               {
              var clickedLink = $("li.currentPage A").attr("rel");      
                          var clickedLink = parseInt(clickedLink) - 1;                   
          
           $(".CurrentPageClass").val(clickedLink);
                         $(".pagerClickCls").click();
                         WEBABACUS.logclientdata('0', window.location.pathname+"|?desc=PlacesToVisit&action=PreviousPage");                        
              }
              else if ($(this).attr("rel") == 'next')
               {
               
               
              var clickedLink = $("UL.pageNav li.currentPage A").attr("rel");
              
              var clickedLink = parseInt(clickedLink) + 1;
              
              
              $(".CurrentPageClass").val(clickedLink);
              
              $(".pagerClickCls").click();
               WEBABACUS.logclientdata('0', window.location.pathname+"|?desc=PlacesToVisit&action=NextPage");
              }
              
              return false;
      });
      
    }
    
        
  }
  
  

})(jQuery);



/** PTV pager ends here **/


/**Holiday Finder Pager starts here**/

(function($) {
      
  $.fn.quickPagerPlugin = function(options) {
  
    var defaults = {
            pageSize: 10,
            naviSize: 5,
            currentPage: 1,
      holder: ""
      };
      var options = $.extend(defaults, options);
      
    //leave this

    var selector = $(this);
    var totalRecords = $(this).children().length;
    var pageCounter = 1;

    selector.children().each(function(i){
      if(i < pageCounter*options.pageSize && i >= (pageCounter-1)*options.pageSize) {
        $(this).addClass("page"+pageCounter);
      }
      else {
        $(this).addClass("page"+(pageCounter+1));
        pageCounter ++;
      } 
    });
    
     
    //show/hide the appropriate regions 
    selector.children().hide();
    $(".page"+options.currentPage).show();
    
    // For the Showing Results tag on Page Load 
    var firstPageLinkPageLength = $("LI.page1").length;                       
    var endPageResultNumber = (1*options.pageSize) - (options.pageSize - firstPageLinkPageLength);          

    //first check if there is more than one page. If so, build nav
    if(pageCounter > 1) {
    $(".resultsShowing").html("<strong>Results</strong>: <label>"+totalRecords+"</label> Parks | Showing <label>1-"+endPageResultNumber+"</label>");
      //Build pager navigation
      var pageNav = "<ul class='pageNav'>"; 
      pageNav += "<li class=\"prev prevPage\"><a rel=\"prev\" href=\"#\">Previous</a></li>";

      for (i=1;i<=pageCounter;i++)
      {
        if (i==options.currentPage)
        {
          pageNav += "<li class=\"currentPage pageNumbers pageNav"+i+"\"'><a rel='"+i+"' href='#'>"+i+"</a></li>";  
        } else
        {
          pageNav += "<li class='pageNumbers pageNav"+i+"'><a rel='"+i+"' href='#'>"+i+"</a></li>";
        }
      
      }
      pageNav += "<li class=\"next nextPage\"><a rel=\"next\" href=\"#\">Next</a></li>";

      pageNav += "</ul>";
      
      if(options.holder == "") {
        selector.after(pageNav);
      }
      else {
        $(options.holder).append(pageNav);
      }
      
      var start = 1;
      var end = options.naviSize;
      
      var liSize = ($("UL.pageNav LI").length)/2;
          
      
      liSize = liSize - 2;
      
      // all hide and show start to end page with navigation.
      $('.pageNav').children().hide();
      for (i=start; i<=end; i++) {
        if (i == end) {
          $('#parksMainHolidayFinder .prev').hide();
          $('#parksMainHolidayFinder .next').show();
        } else if (i == start) {
          $('#parksMainHolidayFinder .next').hide();
          $('#parksMainHolidayFinder .prev').show();
        }
        
        $('.pageNav'+i).show();
          
      }
      
      $('.currentPage').show();
      
      //pager navigation behaviour
      $(".pageNav a").click(function()
       {      
        //grab the REL attribute 
        var clickedLink = $(this).attr("rel");
        
        // For the Showing Results tag on Page Navigation Link
        var clickedLinkPagePreviousLength = $("LI.page"+(clickedLink-1)).length;
        var clickedLinkPageLength = $("LI.page"+clickedLink).length;        
        var startResultNumber = ((clickedLink-1)*clickedLinkPagePreviousLength)+1;        
        var endResultNumber = (clickedLink*options.pageSize) - (options.pageSize - clickedLinkPageLength);        

        
        if (clickedLink > 1 && clickedLink < liSize)
         {
        $('#parksMainHolidayFinder .prev').show();
        $('#parksMainHolidayFinder .next').show();
        }
        else if(clickedLink == 1)
        {
        $('#parksMainHolidayFinder .prev').hide();
        $('#parksMainHolidayFinder .next').show();
        }
        else if(clickedLink == liSize)
        {
        $('#parksMainHolidayFinder .prev').show();
        $('#parksMainHolidayFinder .next').hide();
        }
        if($(this).text()=='Previous')
         {
         WEBABACUS.logclientdata('0',window.location.pathname+'|?desc=HolidayFinder&action=PreviousResults');
         
          var clickedLink = $("li.currentPage A").attr("rel");

                    var clickedLink = parseInt(clickedLink) - 1;
                    end = Math.ceil(clickedLink / options.naviSize) * options.naviSize;
                    
          start = end - options.naviSize+1;
          
          // For the Showing Results tag on Page Previous Link
          var clickedLinkPagePreviousLength = $("LI.page"+(clickedLink-1)).length;        
          var clickedLinkPageLength = $("LI.page"+clickedLink).length;            
          var startResultNumber = ((clickedLink-1)*clickedLinkPagePreviousLength)+1;              
          var endResultNumber = (clickedLink*options.pageSize) - (options.pageSize - clickedLinkPageLength);                  

        
          $('.pageNav').children().hide();
          
           for (i=start; i<=end; i++)
            {
            
             if (clickedLink > 1 && clickedLink < liSize)
             {
             $('#parksMainHolidayFinder .prev').show();
             $('#parksMainHolidayFinder .next').show();
             }
             else
             {
              $('#parksMainHolidayFinder .prev').hide();
              $('#parksMainHolidayFinder .next').show();
             }
            
            
            $('.pageNav'+i).show();
            
            }
            $(".resultsShowing").html("Results : <label>"+totalRecords+"</label> Parks | Showing <label>"+startResultNumber+"-"+endResultNumber+"</label>");
            
            
          
        } else if ($(this).text() == 'Next')
         {
        
         WEBABACUS.logclientdata('0',window.location.pathname+'|?desc=HolidayFinder&action=NextResults');
                
        var clickedLink = $("li.currentPage A").attr("rel");
        start = Math.floor(clickedLink / options.naviSize) * options.naviSize + 1;
          
        var clickedLink = parseInt(clickedLink) + 1;
        
        // For the Showing Results tag on Page Next Link
        var clickedLinkPagePreviousLength = $("LI.page"+(clickedLink-1)).length;        
        var clickedLinkPageLength = $("LI.page"+clickedLink).length;          
        var startResultNumber = ((clickedLink-1)*clickedLinkPagePreviousLength)+1;          
        var endResultNumber = (clickedLink*options.pageSize) - (options.pageSize - clickedLinkPageLength);        
        
          end = start + (options.naviSize-1);
        
          $('.pageNav').children().hide();
          
            for (i=start; i<=end; i++)
            {
            if ((clickedLink >= start) && (clickedLink <= end))
             {
             if (clickedLink < liSize)
             {
             $('#parksMainHolidayFinder .prev').show();
             $('#parksMainHolidayFinder .next').show();
             }
             else
             {
              $('#parksMainHolidayFinder .prev').show();
              $('#parksMainHolidayFinder .next').hide();
              }
            }
          
            
          $('.pageNav'+i).show();   
          }
          $(".resultsShowing").html("Results : <label>"+totalRecords+"</label> Parks | Showing <label>"+startResultNumber+"-"+endResultNumber+"</label>");
          
        }
        
        
        options.currentPage = clickedLink;
        //remove current current (!) page
        $("li.currentPage").removeClass("currentPage");
        //Add current page highlighting
        $("ul.pageNav").find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
        //$(this).parent("li").addClass("currentPage");
        //hide and show relevant links        
        selector.children().hide();     
        selector.find(".page"+clickedLink).show();
        
        
        return false;
      });
      
    }
        
  }
  

})(jQuery);




/**Holiday Finder Pager Ends here**/

/**truncator plugin starts here **/

// HTML Truncator for jQuery
// by Henrik Nyh <http://henrik.nyh.se> 2008-02-28.
// Free to modify and redistribute with credit.

(function($) {

  var trailing_whitespace = true;

  $.fn.truncate = function(options) {

    var opts = $.extend({}, $.fn.truncate.defaults, options);
    
    $(this).each(function() {

      var content_length = $.trim(squeeze($(this).text())).length;
      //var content_length = $(this).text().length;
      if (content_length <= opts.max_length)
        return;  // bail early if not overlong

      var actual_max_length = opts.max_length;  // 3 for " ()"
     
      var truncated_node = recursivelyTruncate(this, actual_max_length);
      var full_node = $(this).hide();

      truncated_node.insertAfter(full_node);
      
      //findNodeForMore(truncated_node).append('<a href="#" class="MoreInfoLink"></a>');
      truncated_node.append('<a href="#" class="MoreInfoLink"></a>');
      findNodeForLess(full_node).append('<a href="#" class="LessInfoLink"></a>');
      
      truncated_node.find('a:last').click(function() {
        truncated_node.hide(); full_node.show(); return false;
      });
      full_node.find('a:last').click(function() {
        truncated_node.show(); full_node.hide(); return false;
      });

    });
  }

  // Note that the " (…more)" bit counts towards the max length – so a max
  // length of 10 would truncate "1234567890" to "12 (…more)".
  $.fn.truncate.defaults = {
    max_length: 100,
    more: '…more',
    less: 'less'
  };

  function recursivelyTruncate(node, max_length) {
    return (node.nodeType == 3) ? truncateText(node, max_length) : truncateNode(node, max_length);
  }

  function truncateNode(node, max_length) {
    var node = $(node);
    var new_node = node.clone().empty();
    var truncatedChild;
    //alert(new_node.text().length);
    node.contents().each(function() {
      var remaining_length = max_length - new_node.text().length;
     
      if (remaining_length == 0) return;  // breaks the loop
      truncatedChild = recursivelyTruncate(this, remaining_length);
      if (truncatedChild) new_node.append(truncatedChild);
    });
    return new_node;
  }

  function truncateText(node, max_length) {
 // alert('hi');
    var text = squeeze(node.data);
    //var text = (node.data);
    if (trailing_whitespace)  // remove initial whitespace if last text
      text = text.replace(/^ /, '');  // node had trailing whitespace.
    trailing_whitespace = !!text.match(/ $/);
     var text = text.slice(0, max_length);
    // Ensure HTML entities are encoded
    // http://debuggable.com/posts/encode-html-entities-with-jquery:480f4dd6-13cc-4ce9-8071-4710cbdd56cb
    text = $('<div/>').text(text).html();
    return text;
  }

  // Collapses a sequence of whitespace into a single space.
  function squeeze(string) {
    return string.replace(/\s+/g, ' ');
  }
  
  // Finds the last, innermost block-level element
  function findNodeForMore(node) {
  //debugger;
    var $node = $(node);
    var last_child = $node.children(":last");
    if (!last_child) return node;
    var display = last_child.css('display');
    if (!display || display=='inline') return $node;
    return findNodeForMore(last_child);
  };

  // Finds the last child if it's a p; otherwise the parent
  function findNodeForLess(node) {
    var $node = $(node);
    var last_child = $node.children(":last");
    if (last_child && last_child.is('p')) return last_child;
    return node;
  };

})(jQuery);


/** truncator plugin ends here **/


/** Jquery URL parser ***/
// JQuery URL Parser plugin - https://github.com/allmarkedup/jQuery-URL-Parser
// Written by Mark Perkins, mark@allmarkedup.com
// License: http://unlicense.org/ (i.e. do what you want with it!)

; (function($, undefined) {

    var tag2attr = {
        a: 'href',
        img: 'src',
        form: 'action',
        base: 'href',
        script: 'src',
        iframe: 'src',
        link: 'href'
    },

  key = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], // keys available to query

  aliases = { "anchor": "fragment" }, // aliases for backwards compatability

  parser = {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
  },

  querystring_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g, // supports both ampersand and semicolon-delimted query string key/value pairs

  fragment_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g; // supports both ampersand and semicolon-delimted fragment key/value pairs

    function parseUri(url, strictMode) {
        var str = decodeURI(url),
        res = parser[strictMode || false ? "strict" : "loose"].exec(str),
        uri = { attr: {}, param: {}, seg: {} },
        i = 14;

        while (i--) {
            uri.attr[key[i]] = res[i] || "";
        }

        // build query and fragment parameters

        uri.param['query'] = {};
        uri.param['fragment'] = {};

        uri.attr['query'].replace(querystring_parser, function($0, $1, $2) {
            if ($1) {
                uri.param['query'][$1] = $2;
            }
        });

        uri.attr['fragment'].replace(fragment_parser, function($0, $1, $2) {
            if ($1) {
                uri.param['fragment'][$1] = $2;
            }
        });

        // split path and fragement into segments

        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g, '').split('/');

        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g, '').split('/');

        // compile a 'base' domain attribute

        uri.attr['base'] = uri.attr.host ? uri.attr.protocol + "://" + uri.attr.host + (uri.attr.port ? ":" + uri.attr.port : '') : '';

        return uri;
    };

    function getAttrName(elm) {
        var tn = elm.tagName;
        if (tn !== undefined) return tag2attr[tn.toLowerCase()];
        return tn;
    }

    $.fn.url = function(strictMode) {
        var url = '';

        if (this.length) {
            url = $(this).attr(getAttrName(this[0])) || '';
        }

        return $.url(url, strictMode);
    };

    $.url = function(url, strictMode) {
        if (arguments.length === 1 && url === true) {
            strictMode = true;
            url = undefined;
        }

        strictMode = strictMode || false;
        url = url || window.location.toString();

        return {

            data: parseUri(url, strictMode),

            // get various attributes from the URI
            attr: function(attr) {
                attr = aliases[attr] || attr;
                return attr !== undefined ? this.data.attr[attr] : this.data.attr;
            },

            // return query string parameters
            param: function(param) {
                return param !== undefined ? this.data.param.query[param] : this.data.param.query;
            },

            // return fragment parameters
            fparam: function(param) {
                return param !== undefined ? this.data.param.fragment[param] : this.data.param.fragment;
            },

            // return path segments
            segment: function(seg) {
                if (seg === undefined) {
                    return this.data.seg.path;
                }
                else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },

            // return fragment segments
            fsegment: function(seg) {
                if (seg === undefined) {
                    return this.data.seg.fragment;
                }
                else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }

        };

    };

})(jQuery);

/********* URL Parser -END **************************/



/* THIS IS "thickbox.js" added on 24/11/2010 for HAVEN OPTIMIZATION starts here ****/

/* THIS IS THE CUSTOMIZED VERSION OF THE jquery.fancybox-1.3.1.js ****/
/* File name changes to thickbox.js to avoid maintenance and duplicate inclusion of files i.e. both fancybox and thickbox****/



/*
* FancyBox - jQuery Plugin
* Simple and fancy lightbox alternative
*
* Examples and documentation at: http://fancybox.net
* 
* Copyright (c) 2008 - 2010 Janis Skarnelis
*
* Version: 1.3.1 (05/03/2010)
* Requires: jQuery v1.3+
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/



(function($) {

    var tmp, loading, overlay, wrap, outer, inner, close, nav_left, nav_right,

    selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

    ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

    loadingTimer, loadingFrame = 1,

    start_pos, final_pos, busy = false, shadow = 20, fx = $.extend($('<div/>')[0], { prop: 0 }), titleh = 0,


    isIE6 = !$.support.opacity && !window.XMLHttpRequest,



    /*
    * Private methods 
    */

    fancybox_abort = function() {
        loading.hide();

        imgPreloader.onerror = imgPreloader.onload = null;

        if (ajaxLoader) {
            ajaxLoader.abort();
        }

        tmp.empty();
    },

    fancybox_error = function() {
        $.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>', {
            'scrolling': 'no',
            'padding': 20,
            'transitionIn': 'none',
            'transitionOut': 'none'
        });
    },

    fancybox_get_viewport = function() {
        return [$(window).width(), $(window).height(), $(document).scrollLeft(), $(document).scrollTop()];
    },

    fancybox_get_zoom_to = function() {
        var view = fancybox_get_viewport(),
        to = {},

        margin = currentOpts.margin,
        resize = currentOpts.autoScale,

        horizontal_space = (shadow + margin) * 2,
        vertical_space = (shadow + margin) * 2,
        double_padding = (currentOpts.padding * 2),

        ratio;

        if (currentOpts.width.toString().indexOf('%') > -1) {
            to.width = ((view[0] * parseFloat(currentOpts.width)) / 100) - (shadow * 2);
            resize = false;

        } else {
            to.width = currentOpts.width + double_padding;
        }

        if (currentOpts.height.toString().indexOf('%') > -1) {
            to.height = ((view[1] * parseFloat(currentOpts.height)) / 100) - (shadow * 2);
            resize = false;

        } else {
            to.height = currentOpts.height + double_padding;
        }


        if (resize && (to.width > (view[0] - horizontal_space) || to.height > (view[1] - vertical_space))) {
            if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
                horizontal_space += double_padding;
                vertical_space += double_padding;

                ratio = Math.min(Math.min(view[0] - horizontal_space, currentOpts.width) / currentOpts.width, Math.min(view[1] - vertical_space, currentOpts.height) / currentOpts.height);

                to.width = Math.round(ratio * (to.width - double_padding)) + double_padding;
                to.height = Math.round(ratio * (to.height - double_padding)) + double_padding;

            } else {
                to.width = Math.min(to.width, (view[0] - horizontal_space));
                to.height = Math.min(to.height, (view[1] - vertical_space));
            }




        }


        /*** max width and height percentage **/

        var currentWidthPercent = ((to.width + (shadow * 2)) / (view[0])) * 100;
        var currentHeightPercent = ((to.height + (shadow * 2)) / (view[1])) * 100;

        if (currentWidthPercent > parseFloat(currentOpts.maxWidthPercent)) {
            to.width = ((view[0] * parseFloat(currentOpts.maxWidthPercent)) / 100) - (shadow * 2);
            resize = false;
        }

        if (currentHeightPercent > parseFloat(currentOpts.maxHeightPercent)) {
            to.height = ((view[1] * parseFloat(currentOpts.maxHeightPercent)) / 100) - (shadow * 2);
            resize = false;
        }

        /*** max width and height percentage - End**/


        to.top = view[3] + ((view[1] - (to.height + (shadow * 2))) * 0.5);
        to.left = view[2] + ((view[0] - (to.width + (shadow * 2))) * 0.5);

        if (currentOpts.autoScale === false) {
            to.top = Math.max(view[3] + margin, to.top);
            to.left = Math.max(view[2] + margin, to.left);
        }

        return to;
    },

    fancybox_format_title = function(title) {
        if (title && title.length) {
            switch (currentOpts.titlePosition) {
                case 'inside':
                    return title;
                case 'over':
                    return '<span id="fancybox-title-over">' + title + '</span>';
                default:
                    return '<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">' + title + '</span><span id="fancybox-title-right"></span></span>';
            }
        }

        return false;
    },

    fancybox_process_title = function() {
        var title = currentOpts.title,
        width = final_pos.width - (currentOpts.padding * 2),
        titlec = 'fancybox-title-' + currentOpts.titlePosition;

        $('#fancybox-title').remove();

        titleh = 0;

        if (currentOpts.titleShow === false) {
            return;
        }

        title = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(title, currentArray, currentIndex, currentOpts) : fancybox_format_title(title);

        if (!title || title === '') {
            return;
        }

        $('<div id="fancybox-title" class="' + titlec + '" />').css({
            'width': width,
            'paddingLeft': currentOpts.padding,
            'paddingRight': currentOpts.padding
        }).html(title).appendTo('body');

        switch (currentOpts.titlePosition) {
            case 'inside':
                titleh = $("#fancybox-title").outerHeight(true) - currentOpts.padding;
                final_pos.height += titleh;
                break;

            case 'over':
                $('#fancybox-title').css('bottom', currentOpts.padding);
                break;

            default:
                $('#fancybox-title').css('bottom', $("#fancybox-title").outerHeight(true) * -1);
                break;
        }

        $('#fancybox-title').appendTo(outer).hide();
    },

    fancybox_set_navigation = function() {
        $(document).unbind('keydown.fb').bind('keydown.fb', function(e) {
            if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
                e.preventDefault();
                $.fancybox.close();

            } else if (e.keyCode == 37) {
                e.preventDefault();
                $.fancybox.prev();

            } else if (e.keyCode == 39) {
                e.preventDefault();
                $.fancybox.next();
            }
        });

        if ($.fn.mousewheel) {
            wrap.unbind('mousewheel.fb');

            if (currentArray.length > 1) {
                wrap.bind('mousewheel.fb', function(e, delta) {
                    e.preventDefault();

                    if (busy || delta === 0) {
                        return;
                    }

                    if (delta > 0) {
                        $.fancybox.prev();
                    } else {
                        $.fancybox.next();
                    }
                });
            }
        }

        if (!currentOpts.showNavArrows) { return; }

        if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
            nav_left.show();
        }

        if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length - 1)) {
            nav_right.show();
        }
    },

    fancybox_preload_images = function() {
        var href,
        objNext;

        if ((currentArray.length - 1) > currentIndex) {
            href = currentArray[currentIndex + 1].href;

            if (typeof href !== 'undefined' && href.match(imgRegExp)) {
                objNext = new Image();
                objNext.src = href;
            }
        }

        if (currentIndex > 0) {
            href = currentArray[currentIndex - 1].href;

            if (typeof href !== 'undefined' && href.match(imgRegExp)) {
                objNext = new Image();
                objNext.src = href;
            }
        }
    },

    _finish = function() {
        inner.css('overflow', (currentOpts.scrolling == 'auto' ? (currentOpts.type == 'image' || currentOpts.type == 'iframe' || currentOpts.type == 'swf' ? 'hidden' : 'auto') : (currentOpts.scrolling == 'yes' ? 'auto' : 'visible')));

        if (!$.support.opacity) {
            inner.get(0).style.removeAttribute('filter');
            wrap.get(0).style.removeAttribute('filter');
        }

        $('#fancybox-title').show();

        if (currentOpts.hideOnContentClick) {
            inner.one('click', $.fancybox.close);
        }
        if (currentOpts.hideOnOverlayClick) {
            overlay.one('click', $.fancybox.close);
        }

        if (currentOpts.showCloseButton) {
            close.show();
        }

        fancybox_set_navigation();

        $(window).bind("resize.fb", $.fancybox.center);

        if (currentOpts.centerOnScroll) {
            $(window).bind("scroll.fb", $.fancybox.center);
        } else {
            $(window).unbind("scroll.fb");
        }

        if ($.isFunction(currentOpts.onComplete)) {
            currentOpts.onComplete(currentArray, currentIndex, currentOpts);
        }

        busy = false;

        fancybox_preload_images();
    },

    fancybox_draw = function(pos) {
        var width = Math.round(start_pos.width + (final_pos.width - start_pos.width) * pos),
        height = Math.round(start_pos.height + (final_pos.height - start_pos.height) * pos),

        top = Math.round(start_pos.top + (final_pos.top - start_pos.top) * pos),
        left = Math.round(start_pos.left + (final_pos.left - start_pos.left) * pos);

        wrap.css({
            'width': width + 'px',
            'height': height + 'px',
            'top': top + 'px',
            'left': left + 'px'
        });

        width = Math.max(width - currentOpts.padding * 2, 0);
        height = Math.max(height - (currentOpts.padding * 2 + (titleh * pos)), 0);

        inner.css({
            'width': width + 'px',
            'height': height + 'px'
        });

        if (typeof final_pos.opacity !== 'undefined') {
            wrap.css('opacity', (pos < 0.5 ? 0.5 : pos));
        }
    },

    fancybox_get_obj_pos = function(obj) {
        var pos = obj.offset();

        pos.top += parseFloat(obj.css('paddingTop')) || 0;
        pos.left += parseFloat(obj.css('paddingLeft')) || 0;

        pos.top += parseFloat(obj.css('border-top-width')) || 0;
        pos.left += parseFloat(obj.css('border-left-width')) || 0;

        pos.width = obj.width();
        pos.height = obj.height();

        return pos;
    },

    fancybox_get_zoom_from = function() {
        var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
        from = {},
        pos,
        view;

        if (orig && orig.length) {
            pos = fancybox_get_obj_pos(orig);

            from = {
                width: (pos.width + (currentOpts.padding * 2)),
                height: (pos.height + (currentOpts.padding * 2)),
                top: (pos.top - currentOpts.padding - shadow),
                left: (pos.left - currentOpts.padding - shadow)
            };

        } else {
            view = fancybox_get_viewport();

            from = {
                width: 1,
                height: 1,
                top: view[3] + view[1] * 0.5,
                left: view[2] + view[0] * 0.5
            };
        }

        return from;
    },

    fancybox_show = function() {

        loading.hide();

        if (wrap.is(":visible") && $.isFunction(currentOpts.onCleanup)) {
            if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
                $.event.trigger('fancybox-cancel');

                busy = false;
                return;
            }
        }

        currentArray = selectedArray;
        currentIndex = selectedIndex;
        currentOpts = selectedOpts;

        inner.get(0).scrollTop = 0;
        inner.get(0).scrollLeft = 0;

        if (currentOpts.overlayShow) {
            if (isIE6) {
                $('select:not(#fancybox-tmp select)').filter(function() {
                    return this.style.visibility !== 'hidden';
                }).css({ 'visibility': 'hidden' }).one('fancybox-cleanup', function() {
                    this.style.visibility = 'inherit';
                });
            }

            overlay.css({
                'background-color': currentOpts.overlayColor,
                'opacity': currentOpts.overlayOpacity
            }).unbind().show();
        }

        final_pos = fancybox_get_zoom_to();

        fancybox_process_title();

        if (wrap.is(":visible")) {
            $(close.add(nav_left).add(nav_right)).hide();

            var pos = wrap.position(),
          equal;

            start_pos = {
                top: pos.top,
                left: pos.left,
                width: wrap.width(),
                height: wrap.height()
            };

            equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

            inner.fadeOut(currentOpts.changeFade, function() {
                var finish_resizing = function() {
                    inner.html(tmp.contents()).fadeIn(currentOpts.changeFade, _finish);
                };

                $.event.trigger('fancybox-change');

                inner.empty().css('overflow', 'hidden');

                if (equal) {
                    inner.css({
                        top: currentOpts.padding,
                        left: currentOpts.padding,
                        width: Math.max(final_pos.width - (currentOpts.padding * 2), 1),
                        height: Math.max(final_pos.height - (currentOpts.padding * 2) - titleh, 1)
                    });

                    finish_resizing();

                } else {
                    inner.css({
                        top: currentOpts.padding,
                        left: currentOpts.padding,
                        width: Math.max(start_pos.width - (currentOpts.padding * 2), 1),
                        height: Math.max(start_pos.height - (currentOpts.padding * 2), 1)
                    });

                    fx.prop = 0;

                    $(fx).animate({ prop: 1 }, {
                        duration: currentOpts.changeSpeed,
                        easing: currentOpts.easingChange,
                        step: fancybox_draw,
                        complete: finish_resizing
                    });
                }
            });



            return;
        }

        wrap.css('opacity', 1);

        if (currentOpts.transitionIn == 'elastic') {
            start_pos = fancybox_get_zoom_from();

            inner.css({
                top: currentOpts.padding,
                left: currentOpts.padding,
                width: Math.max(start_pos.width - (currentOpts.padding * 2), 1),
                height: Math.max(start_pos.height - (currentOpts.padding * 2), 1)
            })
          .html(tmp.contents());

            wrap.css(start_pos).show();

            if (currentOpts.opacity) {
                final_pos.opacity = 0;
            }

            fx.prop = 0;

            $(fx).animate({ prop: 1 }, {
                duration: currentOpts.speedIn,
                easing: currentOpts.easingIn,
                step: fancybox_draw,
                complete: _finish
            });

        } else {
            inner.css({
                top: currentOpts.padding,
                left: currentOpts.padding,
                width: Math.max(final_pos.width - (currentOpts.padding * 2), 1),
                height: Math.max(final_pos.height - (currentOpts.padding * 2) - titleh, 1)
            })
          .html(tmp.contents());

            wrap.css(final_pos).fadeIn(currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish);
        }
    },

    fancybox_process_inline = function() {
        tmp.width(selectedOpts.width);
        tmp.height(selectedOpts.height);

        if (selectedOpts.width == 'auto') {
            selectedOpts.width = tmp.width();
        }
        if (selectedOpts.height == 'auto') {
            selectedOpts.height = tmp.height();
        }

        fancybox_show();
    },

    fancybox_process_image = function() {
        busy = true;

        selectedOpts.width = imgPreloader.width;
        selectedOpts.height = imgPreloader.height;

        $("<img />").attr({
            'id': 'fancybox-img',
            'src': imgPreloader.src,
            'alt': selectedOpts.title
        }).appendTo(tmp);

        fancybox_show();
    },

    fancybox_start = function() {
        fancybox_abort();
        $("#fancybox-outer").removeClass("fancybox-outer-accomm"); // added by offshore on 16/11/2011
        var outerClass = ""; // added by offshore on 16/11/2011
        

        var obj = selectedArray[selectedIndex],
        href,
        type,
        title,
        str,
        emb,
        selector,
        data;

        selectedOpts = $.extend({}, $.fn.fancybox.defaults, (typeof $(obj).data('fancybox') == 'undefined' ? selectedOpts : $(obj).data('fancybox')));
        title = obj.title || $(obj).title || selectedOpts.title || '';

        if (obj.nodeName && !selectedOpts.orig) {
            selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj);
        }

        if (title === '' && selectedOpts.orig) {
            title = selectedOpts.orig.attr('alt');
        }

        if (obj.nodeName && (/^(?:javascript|#)/i).test(obj.href)) {
            href = selectedOpts.href || null;
        } else {
            href = selectedOpts.href || obj.href || null;
        }

        if (selectedOpts.type) {
            type = selectedOpts.type;

            if (!href) {
                href = selectedOpts.content;
            }

        } else if (selectedOpts.content) {
            type = 'html';

        } else if (href) {
            if (href.match(imgRegExp)) {
                type = 'image';

            } else if (href.match(swfRegExp)) {
                type = 'swf';

            } else if ($(obj).hasClass("iframe")) {
                type = 'iframe';

            } else if (href.match(/#/)) {
                obj = href.substr(href.indexOf("#"));

                type = $(obj).length > 0 ? 'inline' : 'ajax';
            } else {
                type = 'ajax';
            }
        } else {
            type = 'inline';
        }

        selectedOpts.type = type;
        selectedOpts.href = href;
        selectedOpts.title = title;

        if (selectedOpts.autoDimensions && selectedOpts.type !== 'iframe' && selectedOpts.type !== 'swf') {
            selectedOpts.width = 'auto';
            selectedOpts.height = 'auto';
        }

        if (selectedOpts.modal) {
            selectedOpts.overlayShow = true;
            selectedOpts.hideOnOverlayClick = false;
            selectedOpts.hideOnContentClick = false;
            selectedOpts.enableEscapeButton = false;
            selectedOpts.showCloseButton = false;
        }

        if ($.isFunction(selectedOpts.onStart)) {
            if (selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts) === false) {
                busy = false;
                return;
            }
        }

        tmp.css('padding', (shadow + selectedOpts.padding + selectedOpts.margin));

        $('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
            $(this).replaceWith(inner.children());
        });

        switch (type) {
            case 'html':
                tmp.html(selectedOpts.content);
                fancybox_process_inline();
                break;

            case 'inline':
                $('<div class="fancybox-inline-tmp" />').hide().insertBefore($(obj)).bind('fancybox-cleanup', function() {
                    $(this).replaceWith(inner.children());
                }).bind('fancybox-cancel', function() {
                    $(this).replaceWith(tmp.children());
                });

                $(obj).appendTo(tmp);

                fancybox_process_inline();
                break;

            case 'image':
                busy = false;

                $.fancybox.showActivity();

                imgPreloader = new Image();

                imgPreloader.onerror = function() {
                    fancybox_error();
                };

                imgPreloader.onload = function() {
                    imgPreloader.onerror = null;
                    imgPreloader.onload = null;
                    fancybox_process_image();
                };

                imgPreloader.src = href;

                break;

            case 'swf':
                str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
                emb = '';

                $.each(selectedOpts.swf, function(name, val) {
                    str += '<param name="' + name + '" value="' + val + '"></param>';
                    emb += ' ' + name + '="' + val + '"';
                });

                str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

                tmp.html(str);

                fancybox_process_inline();
                break;

            case 'ajax':
                selector = href.split('#', 2);
                data = selectedOpts.ajax.data || {};

                if (selector.length > 1) {
                    href = selector[0];

                    if (typeof data == "string") {
                        data += '&selector=' + selector[1];
                    } else {
                        data.selector = selector[1];
                    }
                }

                busy = false;
                $.fancybox.showActivity();

                ajaxLoader = $.ajax($.extend(selectedOpts.ajax, {
                    url: href,
                    data: data,
                    error: fancybox_error,
                    success: function(data, textStatus, XMLHttpRequest) {
                        if (ajaxLoader.status == 200) {
                            tmp.html(data);
                            fancybox_process_inline();
                        }
                    }
                }));

                break;

            case 'iframe':
        // added by offshore on 16/11/2011 starts here
       if (selectedOpts.href.match('accomm\=true') != null && selectedOpts.href.match('accomm\=true')[0] != null && selectedOpts.href.match('accomm\=true').index >= 0)
        {
              outerClass = "fancybox-outer-accomm"; 
        }
        else 
        { 
        outerClass = "";
        }
        if (outerClass != '')
        {
        if(!$("#fancybox-outer").hasClass(outerClass))
        {
        $("#fancybox-outer").addClass(outerClass);
        }
        }
        else
        {
        $("#fancybox-outer").removeClass("fancybox-outer-accomm");
        }
        // added by offshore on 16/11/2011 ends here
                $('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" scrolling="' + selectedOpts.scrolling + '" src="' + selectedOpts.href + '"></iframe>').appendTo(tmp);
                fancybox_show();
                break;
        }
    },

    fancybox_animate_loading = function() {
        if (!loading.is(':visible')) {
            clearInterval(loadingTimer);
            return;
        }

        $('div', loading).css('top', (loadingFrame * -40) + 'px');

        loadingFrame = (loadingFrame + 1) % 12;
    },

    fancybox_init = function() {
        if ($("#fancybox-wrap").length) {
            return;
        }

        $('body').append(
        tmp = $('<div id="fancybox-tmp"></div>'),
        loading = $('<div id="fancybox-loading"><div></div></div>'),
        overlay = $('<div id="fancybox-overlay"></div>'),
        wrap = $('<div id="fancybox-wrap"></div>')
      );

        if (!$.support.opacity) {
            wrap.addClass('fancybox-ie');
            loading.addClass('fancybox-ie');
        }
        
        

        outer = $('<div id="fancybox-outer"></div>')
        .append('<div class="fancy-bg" id="fancy-bg-n"></div><div class="fancy-bg" id="fancy-bg-ne"></div><div class="fancy-bg" id="fancy-bg-e"></div><div class="fancy-bg" id="fancy-bg-se"></div><div class="fancy-bg" id="fancy-bg-s"></div><div class="fancy-bg" id="fancy-bg-sw"></div><div class="fancy-bg" id="fancy-bg-w"></div><div class="fancy-bg" id="fancy-bg-nw"></div>')
        .appendTo(wrap);

        outer.append(
        inner = $('<div id="fancybox-inner"></div>'),
        close = $('<a id="fancybox-close"></a>'),

        nav_left = $('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
        nav_right = $('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
      );

        close.click($.fancybox.close);
        loading.click($.fancybox.cancel);

        nav_left.click(function(e) {
            e.preventDefault();
            $.fancybox.prev();
        });

        nav_right.click(function(e) {
            e.preventDefault();
            $.fancybox.next();
        });

        if (isIE6) {
            overlay.get(0).style.setExpression('height', "document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
            loading.get(0).style.setExpression('top', "(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");

            outer.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>');
        }
    };

    /*
    * Public methods 
    */

    $.fn.fancybox = function(options) {
        $(this)
      .data('fancybox', $.extend({}, options, ($.metadata ? $(this).metadata() : {})))
      .unbind('click.fb').bind('click.fb', function(e) {
          e.preventDefault();

          if (busy) {
              return;
          }

          busy = true;

          $(this).blur();

          selectedArray = [];
          selectedIndex = 0;

          var rel = $(this).attr('rel') || '';

          if (!rel || rel == '' || rel === 'nofollow') {
              selectedArray.push(this);

          } else {
              selectedArray = $("a[rel=" + rel + "], area[rel=" + rel + "]");
              selectedIndex = selectedArray.index(this);
          }

          fancybox_start();

          return false;
      });

        return this;
    };

    $.fancybox = function(obj) {
        if (busy) {
            return;
        }

        busy = true;

        var opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

        selectedArray = [];
        selectedIndex = opts.index || 0;

        if ($.isArray(obj)) {
            for (var i = 0, j = obj.length; i < j; i++) {
                if (typeof obj[i] == 'object') {
                    $(obj[i]).data('fancybox', $.extend({}, opts, obj[i]));
                } else {
                    obj[i] = $({}).data('fancybox', $.extend({ content: obj[i] }, opts));
                }
            }

            selectedArray = jQuery.merge(selectedArray, obj);

        } else {
            if (typeof obj == 'object') {
                $(obj).data('fancybox', $.extend({}, opts, obj));
            } else {
                obj = $({}).data('fancybox', $.extend({ content: obj }, opts));
            }

            selectedArray.push(obj);
        }

        if (selectedIndex > selectedArray.length || selectedIndex < 0) {
            selectedIndex = 0;
        }

        fancybox_start();
    };

    $.fancybox.showActivity = function() {
        clearInterval(loadingTimer);

        loading.show();
        loadingTimer = setInterval(fancybox_animate_loading, 66);
    };

    $.fancybox.hideActivity = function() {
        loading.hide();
    };

    $.fancybox.next = function() {
        return $.fancybox.pos(currentIndex + 1);
    };

    $.fancybox.prev = function() {
        return $.fancybox.pos(currentIndex - 1);
    };

    $.fancybox.pos = function(pos) {
        if (busy) {
            return;
        }

        pos = parseInt(pos, 10);

        if (pos > -1 && currentArray.length > pos) {
            selectedIndex = pos;
            fancybox_start();
        }

        if (currentOpts.cyclic && currentArray.length > 1 && pos < 0) {
            selectedIndex = currentArray.length - 1;
            fancybox_start();
        }

        if (currentOpts.cyclic && currentArray.length > 1 && pos >= currentArray.length) {
            selectedIndex = 0;
            fancybox_start();
        }

        return;
    };

    $.fancybox.cancel = function() {
        if (busy) {
            return;
        }

        busy = true;

        $.event.trigger('fancybox-cancel');

        fancybox_abort();

        if (selectedOpts && $.isFunction(selectedOpts.onCancel)) {
            selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);
        }

        busy = false;
    };

    // Note: within an iframe use - parent.$.fancybox.close();
    $.fancybox.close = function() {
        if (busy || wrap.is(':hidden')) {
            return;
        }

        busy = true;

        if (currentOpts && $.isFunction(currentOpts.onCleanup)) {
            if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
                busy = false;
                return;
            }
        }

        fancybox_abort();

        $(close.add(nav_left).add(nav_right)).hide();

        $('#fancybox-title').remove();

        wrap.add(inner).add(overlay).unbind();

        $(window).unbind("resize.fb scroll.fb");
        $(document).unbind('keydown.fb');

        function _cleanup() {
            overlay.fadeOut('fast');

            wrap.hide();

            $.event.trigger('fancybox-cleanup');

            inner.empty();

            if ($.isFunction(currentOpts.onClosed)) {
                currentOpts.onClosed(currentArray, currentIndex, currentOpts);
            }

            currentArray = selectedOpts = [];
            currentIndex = selectedIndex = 0;
            currentOpts = selectedOpts = {};

            busy = false;
        }

        inner.css('overflow', 'hidden');

        if (currentOpts.transitionOut == 'elastic') {
            start_pos = fancybox_get_zoom_from();

            var pos = wrap.position();

            final_pos = {
                top: pos.top,
                left: pos.left,
                width: wrap.width(),
                height: wrap.height()
            };

            if (currentOpts.opacity) {
                final_pos.opacity = 1;
            }

            fx.prop = 1;

            $(fx).animate({ prop: 0 }, {
                duration: currentOpts.speedOut,
                easing: currentOpts.easingOut,
                step: fancybox_draw,
                complete: _cleanup
            });

        } else {
            wrap.fadeOut(currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
        }
    };

    $.fancybox.resize = function() {
        var c, h;

        if (busy || wrap.is(':hidden')) {
            return;
        }

        busy = true;

        c = inner.wrapInner("<div style='overflow:auto'></div>").children();
        h = c.height();

        wrap.css({ height: h + (currentOpts.padding * 2) + titleh });
        inner.css({ height: h });

        c.replaceWith(c.children());

        $.fancybox.center();
    };

    $.fancybox.center = function() {
        busy = true;

        var view = fancybox_get_viewport(),
      margin = currentOpts.margin,
      to = {};

        to.top = view[3] + ((view[1] - ((wrap.height() - titleh) + (shadow * 2))) * 0.5);
        to.left = view[2] + ((view[0] - (wrap.width() + (shadow * 2))) * 0.5);

        to.top = Math.max(view[3] + margin, to.top);
        to.left = Math.max(view[2] + margin, to.left);

        wrap.css(to);

        busy = false;
    };

    $.fn.fancybox.defaults = {
        padding: 0,
        margin: 0,
        opacity: false,
        modal: false,
        cyclic: false,
        scrolling: 'auto', // 'auto', 'yes' or 'no'

        width: 560,
        height: 340,

        autoScale: true,
        autoDimensions: true,
        centerOnScroll: false,

        ajax: {},
        swf: { wmode: 'transparent' },

        hideOnOverlayClick: true,
        hideOnContentClick: false,

        overlayShow: true,
        overlayOpacity: 0.7,
        overlayColor: '#fff',

        titleShow: true,
        titlePosition: 'outside', // 'outside', 'inside' or 'over'
        titleFormat: null,

        transitionIn: 'fade', // 'elastic', 'fade' or 'none'
        transitionOut: 'fade', // 'elastic', 'fade' or 'none'

        speedIn: 300,
        speedOut: 300,

        changeSpeed: 300,
        changeFade: 'fast',

        easingIn: 'swing',
        easingOut: 'swing',

        showCloseButton: true,
        showNavArrows: true,
        enableEscapeButton: true,

        onStart: null,
        onCancel: null,
        onComplete: null,
        onCleanup: null,
        onClosed: null,
        maxWidthPercent: 90,
        maxHeightPercent: 90
    };

    $(document).ready(function() {
        fancybox_init();
    });

})(jQuery);



function fancyBox_Init() {
    $(".thickbox").each(function() {
        var linkhref = $(this).attr('href');
        var widthRe = /width=[0-9]+/i;
        var heightRe = /height=[0-9]+/i;
        var dWidth = 60;
        var dHeight = 40;

        if (widthRe.test(linkhref)) {
            dWidth = parseInt(linkhref.match(/width=[0-9]+/i)[0].replace('width=', ''));
        }
        if (heightRe.test(linkhref)) {
            dHeight = parseInt(linkhref.match(/height=[0-9]+/i)[0].replace('height=', ''));
        }
        //var repLink = linkhref.replace(/[&]height=[0-9]+/i, '').replace(/[&]amp;height=[0-9]+/i, '').replace(/[&]width=[0-9]+/i, '').replace(/[&]amp;width=[0-9]+/i, '');
        //repLink = repLink.replace(/[?]height=[0-9]+/i, '').replace(/[?]width=[0-9]+/i, '');
        //var repLink = linkhref.replace('?KeepThis=true&TB_iframe=true', '');
        //repLink = repLink.replace('&amp;KeepThis=true&TB_iframe=true', '');
        //alert(repLink);
        //$(this).attr('href', repLink);
        //alert("Widht =" + dWidth + 'px' + ", Height=" + dHeight + 'px');   
        $(this).fancybox({
            'width': dWidth,
            'height': dHeight,
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'titleShow': false,
            'autoDimensions': false,
            'maxWidthPercent': 99,
            'maxHeightPercent': 99
        });
    }
    );
}

$(document).ready(function() {
    fancyBox_Init();
});

$.fn.mfancyBoxAjax = function() {   //generic ajax fancybox
    {
        var linkhref = $(this).attr('href');
        var widthRe = /width=[0-9]+/i;
        var heightRe = /height=[0-9]+/i;
        var dWidth = 40;
        var dHeight = 30;

        if (widthRe.test(linkhref)) {
            dWidth = parseInt(linkhref.match(/width=[0-9]+/i)[0].replace('width=', ''));
        }
        if (heightRe.test(linkhref)) {
            dHeight = parseInt(linkhref.match(/height=[0-9]+/i)[0].replace('height=', ''));
        }
        //var repLink = linkhref.replace(/[&]height=[0-9]+/i, '').replace(/[&]amp;height=[0-9]+/i, '').replace(/[&]width=[0-9]+/i, '').replace(/[&]amp;width=[0-9]+/i, '');
        //repLink = repLink.replace(/[?]height=[0-9]+/i, '').replace(/[?]width=[0-9]+/i, '');
        //repLink = repLink.replace('?KeepThis=true&TB_iframe=true' , '');
        var repLink = linkhref.replace('&amp;KeepThis=true&TB_iframe=true', '');
        //alert(repLink);
        $(this).attr('href', repLink);
        //alert("Widht =" + dWidth + 'px' + ", Height=" + dHeight + 'px');   
        $(this).fancybox({
            'width': dWidth,
            'height': dHeight,
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'ajax',
            'titleShow': false,
            'autoDimensions': false,
            'maxWidthPercent': 99,
            'maxHeightPercent': 99
        });

    }
}






$.fn.mfancyBox = function() {   //fancybox from the map  
    var mparams = this;
    $(mparams).fancybox({
        'width': 900,
        'height': 700,
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'titleShow': false,
        'autoDimensions': false,
        'maxWidthPercent': 99,
        'maxHeightPercent': 99
    });
}


/* THIS IS "thickbox.js" added on 24/11/2010 for HAVEN OPTIMIZATION ends here ****/



/*** easy-carousel Start **/
//***************** JQUERY - EASY CAROUSEL *****************************/
/****************** Developed by Nucleus Ltd. **************************/

function setStatePausePlay(a, b) { var c = b.find("." + a.pausePlayIconsDiv); var d = c.find("A.cPause"); var e = c.find("A.cPlay"); d.removeClass("cPauseActive"); e.removeClass("cPlayActive"); var f = false; if (b.data("stopCarousel") != null && b.data("stopCarousel") == true) { f = true } if (f) { e.addClass("cPlayActive") } else { d.addClass("cPauseActive") } } function PausePlayCarousel(a) { var b = a.data.options; var c = a.data.$this; var d = a.data.linkType; var e = c.find("." + b.defaultImageDiv + " .OverlayImageDiv"); var f = false; if (c.data("stopCarousel") != null && c.data("stopCarousel") == true) { f = true } if (d == "pause" && !f) { c.data("stopCarousel", true); e.stop(true, true) } else if (d == "play" && f) { c.data("stopCarousel", false); var g = c.data("imageNumber"); var h = c.data("stayTime"); var i = g + 1; loadImage(i, b, c, false) } setStatePausePlay(b, c) } function stopCarousel(a) { a.preventDefault(); var b = a.data.options; var c = a.data.$this; var d = c.data("imageNumber"); var e = $(this).html(); var f; if (e == "P") { f = parseInt(d) - 1 } else if (e == "N") { f = parseInt(d) + 1 } else { f = parseInt(e) } c.data("stopCarousel", true); $OverlayDiv = c.find(".OverlayImageDiv").stop(); setStatePausePlay(b, c); loadImage(f, b, c, true) } function highlightLink(a, b, c) { $linksAnchor = b.find("." + a.linksDiv + " .linkOuter A"); $linksAnchor.removeClass("active"); var d = c + 1; $linksAnchor.filter(":nth-child(" + d + ")").addClass("active"); } function buildLinks(a, b) { var c = b.find("UL." + a.imageLinksUL + " li").size(); if (c > 1 && a.displayLinks) { b.find("." + a.linksDiv).append('<div class="linkOuter"></div>'); var d = b.find("." + a.linksDiv).find(".linkOuter"); d.append('<a href="#" class="prev">P</a>'); var e = 1; b.find("UL." + a.imageLinksUL + " li").each(function() { d.append('<a href="#" class="mid">' + e + "</a>"); e = e + 1 }); var f = d.find("a.mid").width() + 10; var g = 12; var h = e * (f + 10) + 2 * (g + 10); d.css("width", h + "px"); d.append('<a href="#" class="next">N</a>'); d.find("A").bind("click", { options: a, $this: b }, stopCarousel); highlightLink(a, b, 1) } return c } function LoadCheckOK(a) { var b = a.data.options; var c = a.data.$this; var d = c.data("imageNumber"); var e = c.data("imageUrl"); var f = c.data("overlayText"); var g = c.data("imageMapHTML"); var h = c.data("stayTime"); var i = c.data("startCarousel"); var j = b.defaultImageDiv; var k = c.find("." + j); var l = k.find(".imageMapContainer"); var m = k.find(" .baseImage"); $OverlayDiv = k.find(".OverlayImageDiv"); $overlayTextDiv = $OverlayDiv.find(".overlayText"); $overlayTextDiv.html(f); if (b.transition == "fade") { var n = { opacity: 1, queue: false} } else if (b.transition == "slideLeft") { var n = { left: "0px", queue: false} } else if (b.transition == "slideRight") { var n = { left: "0px", queue: false} } else if (b.transition == "slideUp") { var n = { top: "0px", queue: false} } else if (b.transition == "slideDown") { var n = { top: "0px", queue: false} } var o = d + 1; var p = b.transitionTime; var q = false; if (c.data("stopCarousel") != null && c.data("stopCarousel") == true) { q = true; p = 100 } $overlayScreenDiv = c.find(".OverlayScreen"); $overlayScreenDiv.css("display", "none"); if (i) { $OverlayDiv.css(n); var r = k.find(".overlayTextDefault"); m.find("IMG").attr("src", e); r.html(f); l.html(g); $overlayScreenDiv.css("display", "block"); highlightLink(b, c, d); if (!q) { $OverlayDiv.delay(h).animate({ opacity: 1, queue: false }, 5, function() { loadImage(o, b, c, false) }) } } else { $OverlayDiv.animate(n, p, function() { var a = k.find(".overlayTextDefault"); m.find("IMG").attr("src", e); a.html(f); l.html(g); $overlayScreenDiv.css("display", "block"); highlightLink(b, c, d); if (!q) { $OverlayDiv.delay(h).animate({ opacity: 1, queue: false }, 5, function() { loadImage(o, b, c, false) }) } }) } } function loadImage(a, b, c, d) { var e = b.defaultImageDiv; if (b.stopAt > 0 && a > b.stopAt) { return } initOverLay(b, c); $imageLinksLi = c.find("UL." + b.imageLinksUL + " li"); var f = $imageLinksLi.size(); if (a > f) { a = a % f } while (a <= 0 && f > 0) { a = f + a } $imageLinksLi = $imageLinksLi.filter(":nth-child(" + a + ")"); $loadCheckImage = c.find(".OverlayImageDiv IMG"); var g = a; var h = $imageLinksLi.find("a.imageUrl").attr("href"); var i = $imageLinksLi.find("DIV.imageOverlayText").html(); var j = null; var k = null; var l = null; var m = $imageLinksLi.find("MAP").html(); if (m == null) { j = $imageLinksLi.find("a.imageLink").attr("href"); k = $imageLinksLi.find("a.imageLink").html(); l = $imageLinksLi.find("a.imageLink").attr("target") } if (l == null || l == "") { l = "_self" } var n = $imageLinksLi.find("DIV.stayTime"); var o = b.stayTime; if (n.html() != null) { o = parseInt(n.html()) } c.data("imageNumber", a); c.data("imageUrl", h); c.data("overlayText", i); c.data("stayTime", o); c.data("startCarousel", d); if (m == null && j != null) { m = '<map name="' + e + "_map" + '" id="' + e + "_map" + '"><area href="' + j + '" shape="rect" coords="0,0,' + b.imageWidth + "," + b.imageHeight + '" alt="' + k + '" title="' + k + '"  target="' + l + '" /></map>' } else { m = '<map name="' + e + "_map" + '" id="' + e + "_map" + '">' + m + "</map>" } c.data("imageMapHTML", m); $loadCheckImage.attr("src", h) } function initImageHtml(a, b, c) { var d = b.defaultImageDiv; $imageLinksLi = c.find("UL." + b.imageLinksUL + " li"); var e = $imageLinksLi.size(); if (a > e) { a = a % e } while (a <= 0 && e > 0) { a = e + a } $imageLinksLi = $imageLinksLi.filter(":nth-child(" + a + ")"); $loadCheckImage = c.find(".OverlayImageDiv IMG"); var f = a; var g = $imageLinksLi.find("a.imageUrl").attr("href"); var h = $imageLinksLi.find("a.imageLink").attr("href"); var i = $imageLinksLi.find("a.imageLink").html(); var j = $imageLinksLi.find("a.imageLink").attr("target"); var k = $imageLinksLi.find("DIV.imageOverlayText").html(); var l = c.find("." + d); var m = l.find(".baseImage"); var n = l.find(".overlayTextDefault"); m.find("A").attr("href", h); m.find("A").attr("title", i); m.find("A").attr("alt", i); m.find("A").attr("target", j); m.find("IMG").attr("src", g); m.find("IMG").attr("title", i); m.find("IMG").attr("alt", i); n.html(k); highlightLink(b, c, a) } function initOverLay(a, b) { var c = b.find("." + a.defaultImageDiv); var d = "0px"; var e = "0px"; var f = 1; $overlayDiv = c.find(".OverlayImageDiv"); if (a.transition == "fade") { f = 0 } else if (a.transition == "slideLeft") { d = a.imageWidth + "px" } else if (a.transition == "slideRight") { d = "-" + a.imageWidth + "px" } else if (a.transition == "slideUp") { e = a.imageHeight + "px" } else if (a.transition == "slideDown") { e = "-" + a.imageHeight + "px" } $overlayDiv.css("position", "absolute").css("opacity", f).css("z-index", "10").css("width", a.imageWidth + "px").css("height", a.imageHeight + "px").css("left", d).css("top", e) } function setupImageHTML(a, b) { var c = a.defaultImageDiv; var d = "#"; var e = "";  b.find("." + c).remove(); b.prepend('<div class="' + c + '"><div class="baseImage"><a href="#"><img src="/images/easy_carousel/blank.png"/></a></div></div>'); var f = b.find("." + c); f.find(".overlayTextDefault").detach(); f.append('<div class="overlayTextDefault" style="width:' + a.imageWidth + "px; height:" + a.imageHeight + 'px; z-index:7;" ></div>'); f.css("position", "relative").css("overflow", "hidden"); f.css("width", a.imageWidth + "px").css("height", a.imageHeight + "px").css("top", "0px").css("left", "0px").css("z-index", "10"); f.find(".OverlayImageDiv").detach(); f.append('<div class="OverlayImageDiv" style="width:' + a.imageWidth + "px; height:" + a.imageHeight + 'px;"><img src="#" /><div class="overlayText" style="width:' + a.imageWidth + "px; height:" + a.imageHeight + 'px;"></div></div>'); f.find(".OverlayScreen").detach(); f.append('<div class="OverlayScreen"><img width="' + a.imageWidth + 'px" height="' + a.imageHeight + '"  src="/images/easy_carousel/blank.png" usemap="#' + c + "_map" + '" /></div>'); f.append('<div class="imageMapContainer"></div>'); f.find(".OverlayScreen").css("position", "absolute").css("width", a.imageWidth + "px").css("height", a.imageHeight + "px").css("top", "0px").css("left", "0px").css("z-index", "20"); if (a.pausePlayIconsDiv != null) { $pausePlayDiv = b.find("." + a.pausePlayIconsDiv); $pausePlayDiv.append('<a href="#" class="cPause" alt="Pause" title="Pause">Pause</a><a href="#" class="cPlay" alt="Play" title="Play">Play</a>'); $pauseLink = $pausePlayDiv.find("A.cPause"); $playLink = $pausePlayDiv.find("A.cPlay"); if (a.autoStart == true) { $pauseLink.addClass("cPauseActive") } else { $playLink.find("A.cPlay").addClass("cPlayActive") } $pauseLink.bind("click", { options: a, $this: b, linkType: "pause" }, PausePlayCarousel); $playLink.bind("click", { options: a, $this: b, linkType: "play" }, PausePlayCarousel) } initOverLay(a, b);  b.find(".OverlayImageDiv IMG").bind("load", { options: a, $this: b }, LoadCheckOK) } $.fn.easy_Carousel = function(a) { var b = $.extend({}, $.fn.easy_Carousel.defaults, a); this.each(function() { var a = $(this); var c = $.meta ? $.extend({}, b, a.data()) : b; if (c.autoStart == false) { a.data("stopCarousel", true) } else { a.data("stopCarousel", false) } var d = buildLinks(c, a); var e = c.startIndex; var f = e - 1; if (f <= 0) { f = 1 } if (d > 1) { a.data("overlayText", ""); a.data("imageNumber", e); setupImageHTML(c, a); initImageHtml(f, c, a); loadImage(e, c, a, true) } }) }; $.fn.easy_Carousel.defaults = { displayLinks: true, linksDiv: "carouselLinks", imageLinksUL: "carouselImages", defaultImageDiv: "defaultMainImage", autoStart: true, stayTime: 2e3, transitionTime: 1500, transition: "fade", imageWidth: 200, imageHeight: 100, startIndex: 1, pausePlayIconsDiv: null, stopAt: -1 }

/*** easy-carousel end **/

/*** easy-checkbox Start **/
$.fn.easy_ImageCheckbox = function(a) { var b = $.extend({}, $.fn.easy_ImageCheckbox.defaults, a); this.each(function() { var c = $(this); var d = $.meta ? $.extend({}, b, c.data()) : b; wrapCheckboxAndBindAnchor(c, d); bindCheckBox(c, d); }); }; $.fn.easy_ImageCheckbox.defaults = { checkedCSSClass: "imgChecked", uncheckedCSSClass: "imgUnchecked" }; function wrapCheckboxAndBindAnchor(a, c) { a.wrap('<div class="imgCheck" />'); $parentDiv = a.parent(".imgCheck"); var b = c.uncheckedCSSClass; if (a.is(":checked") == true) { b = c.checkedCSSClass; } else { b = c.uncheckedCSSClass; } $parentDiv.prepend('<a href="#" class="' + b + '">Click</a>'); $parentDiv.find("A").bind("click", function(d) { d.preventDefault(); if (a.is(":checked")) { a.attr("checked", ""); a.removeAttr("checked"); a.trigger("change"); } else { a.attr("checked", "checked"); a.trigger("change"); } }); } function bindCheckBox(a, b) { a.bind("change", function() { $parentAnchor = a.parent(".imgCheck").find("A"); if (a.is(":checked") == true) { $parentAnchor.removeClass(b.uncheckedCSSClass); $parentAnchor.addClass(b.checkedCSSClass); } else { $parentAnchor.addClass(b.uncheckedCSSClass); $parentAnchor.removeClass(b.checkedCSSClass); } }); }
/** easy-cehckbox end **/


/*** easy slider plugin ******/
//***************** JQUERY - EASY Slider *****************************/
/****************** Developed by Nucleus Ltd. **************************/

$.fn.easy_Slider = function(a) { var b = $.extend({}, $.fn.easy_Slider.defaults, a); this.each(function() { var e = $(this); var f = $.meta ? $.extend({}, b, e.data()) : b; var d = d || {}; e.data("position", 0); e.wrap('<div class="eSliderOuter"/>'); d.$cmpOuter = $(f.parentOuterDivSelector); d.$leftScroll = $(f.prevLinkSelector); d.$rightScroll = $(f.nextLinkSelector); d.$scrollItems = $(f.itemSelector); d.$cmpOuter.css("overflow", "visible"); d.itemCount = d.$scrollItems.length; d.totalWidth = d.itemCount * (f.itemWidth + f.itemGap); var c = f.displayItems * (f.itemWidth + f.itemGap) - f.itemGap; e.parent(".eSliderOuter").css("width", c + "px"); e.parent(".eSliderOuter").css("position", "relative"); e.css("width", d.totalWidth + "px"); d.$leftScroll.bind("click", function(g) { g.preventDefault(); moveSlide(-1, d, e, f); }); d.$rightScroll.bind("click", function(g) { g.preventDefault(); moveSlide(1, d, e, f); }); initLinks(d, e, f); }); }; $.fn.easy_Slider.defaults = { itemWidth: 242, itemGap: 5, displayItems: 4, moveTime: 500, parentOuterDivSelector: "parentOuter", itemSelector: "LI.selParkItem", prevLinkSelector: ".ltScroll, .prevPage", nextLinkSelector: ".ltScroll, .prevPage", fullRightCallBack: "hideRight", fullLeftCallBack: "hideLeft" }; function moveSlide(b, c, e, f) { var a = 0; if (e.data("position") != null) { a = e.data("position"); } if ((b < 0 && a > 0) || (b > 0 && (c.itemCount > (a + f.displayItems)))) { var d = a + b; var g = "-" + d * (f.itemWidth + f.itemGap) + "px"; e.animate({ "margin-left": g }, f.moveTime, function() { e.data("position", d); initLinks(c, e, f); }); } } function initLinks(cmpSlider, $this, o) { var position = 0; if ($this.data("position") != null) { position = $this.data("position"); } if (position > 0) { cmpSlider.$leftScroll.css("display", "block"); } else { cmpSlider.$leftScroll.css("display", "none"); if (typeof o.fullRightCallBack == "string" && eval("typeof " + o.fullRightCallBack) == "function") { eval(o.fullRightCallBack + "()"); } } if ((position + o.displayItems) < cmpSlider.itemCount) { cmpSlider.$rightScroll.css("display", "block"); } else { cmpSlider.$rightScroll.css("display", "none"); if (typeof o.fullLeftCallBack == "string" && eval("typeof " + o.fullLeftCallBack) == "function") { eval(o.fullLeftCallBack + "()"); } } }

/*****************Easy Slider End*************************************/

/* THIS IS "webabacus-tag.js" added for HAVEN OPTIMIZATION starts here ****/

/* WEBABACUS CLIENT INFO VERSION 3.01,
 * (c)2007 Foviance Ltd ALL RIGHTS RESERVED.
 * Version to be used as a JS include
 * See accompanying clientinfo-include-notes.txt for change history, or contact helpdesk@foviance.com
 */

/* Server that data will be sent to, e.g. "http://tag1.webabacus.com" */
var server = "http://www.haven.com";

/* Server that secure requests will be sent to, e.g. "https://tag1.webabacus.com" */
var secureserver = "https://www.haven.com";

/* Site Name*/
var site = "BH_Haven_2009";

/* No. of days that the cookie is valid for (default is 730 - two years)*/
var cookieLife = 730;

/* (Optional) Domain for the cookie (must start with and include at least two full stops
 * e.g. .webabacus.com or .webabacus.co.uk)*/
var cookieDomain = "";

/* (Optional) Name of the parameter in the query string which indicates a source value */
var sourceparamname = "wa_mkt";

/* (Optional) Boolean to determine installed flash version, with the results written into the custom fields. Note this uses the SWFObjects code - Copyright (c) 2007 Geoff Stearns*/
var checkFlash = true;

/* (Optional) List of document extensions that should be automatically tagged
 * separate with a common, e.g. "doc,pdf,zip".*/
var autoTagDocuments = "doc,pdf,zip,ppt,pps,wmv";

/* (Optional) Boolean to auto tag external links.*/
var autoTagExternalLinks = true;

/* (Optional) List of alternative domains which should be automatically tagged with the Visitor ID,
 * to allow cookie value hand-over (separate with a common, e.g. "www.webabacus.com,www.foviance.com").*/
var autoTagTrustedDomain = "";

/* WebAbacus reference to be passed to trusted domains (see 'autoTagTrustedDomain' above).*/
var WebAbacusRef = "webabacus_ref" ;

/* Boolean to control whether to set a third party cookie based on the 'server' variable above. Note the 'clientinfo.asp' file MUST present on the relevatn 'server'.*/
var ThirdPartyCookie = false;             

/* Boolean to control whether to disable first party cookies. Setting this to 'true' will prevent the WebAbacus tag code from setting a first party cookie. */
var DisableFirstPartyCookies = false;

/* Test Variable */
var testvar = "";

/* Booking Variable */
var HomePageBooking = 0;

/* Offer String Array */
var OfferURLArray = new Array(3);

/* Offertyperef Variable */
var Offertyperef;

/* Holidaytype Variable */
var Holidaytype;

/* Linkname Variable */
var Linkname= "";


/* Offertyperef Variable */
var lateOfferRef= "";

/* Holidaytype Variable */
var lateOfferType= "";



/*The following code loads the Flash Detector Object*/
if(typeof deconcept=="undefined") var deconcept=new Object()
if(typeof deconcept.util=="undefined") deconcept.util=new Object();
if(typeof deconcept.SWFObjectUtil=="undefined") deconcept.SWFObjectUtil=new Object();
deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){
  if(!document.getElementById) return;
  this.DETECT_KEY=_a?_a:"detectflash";
  this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);
  this.params=new Object();
  this.variables=new Object();
  this.attributes=new Array();
  if(_1) this.setAttribute("swf",_1);
  if(id) this.setAttribute("id",id);
  if(w) this.setAttribute("width",w);
  if(h) this.setAttribute("height",h);
  if(_5) this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));
  this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();
  if(!window.opera&&document.all&&this.installedVer.major>7) deconcept.SWFObject.doPrepUnload=true;
  if(c) this.addParam("bgcolor",c);
  var q=_7?_7:"high";
  this.addParam("quality",q);
  this.setAttribute("useExpressInstall",false);
  this.setAttribute("doExpressInstall",false);
  var _c=(_8)?_8:window.location;
  this.setAttribute("xiRedirectUrl",_c);
  this.setAttribute("redirectUrl","");
  if(_9) this.setAttribute("redirectUrl",_9);
};
deconcept.SWFObject.prototype={
  useExpressInstall:function(_d){
    this.xiSWFPath=!_d?"expressinstall.swf":_d;
    this.setAttribute("useExpressInstall",true);
  },
  setAttribute:function(_e,_f){
    this.attributes[_e]=_f;
  },
  getAttribute:function(_10){
    return this.attributes[_10];
  },
  addParam:function(_11,_12){
    this.params[_11]=_12;
  },
  getParams:function(){
    return this.params;
  },
  addVariable:function(_13,_14){
    this.variables[_13]=_14;
  },
  getVariable:function(_15){
    return this.variables[_15];
  },
  getVariables:function(){
    return this.variables;
  },
  getVariablePairs:function(){
    var _16=new Array();
    var key;
    var _18=this.getVariables();
    for(key in _18){
      _16[_16.length]=key+"="+_18[key];
    }
    return _16;
  },
  getSWFHTML:function(){
    var _19="";
    if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
      if(this.getAttribute("doExpressInstall")){
        this.addVariable("MMplayerType","PlugIn");
        this.setAttribute("swf",this.xiSWFPath);
      }
      _19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";
      _19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";
      var _1a=this.getParams();
      for(var key in _1a){
        _19+=[key]+"=\""+_1a[key]+"\" ";
      }
      var _1c=this.getVariablePairs().join("&");
      if(_1c.length>0) {
        _19+="flashvars=\""+_1c+"\"";
      }
      _19+="/>";
    } else {
      if(this.getAttribute("doExpressInstall")){
        this.addVariable("MMplayerType","ActiveX");
        this.setAttribute("swf",this.xiSWFPath);
      }
      _19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";
      _19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";
      var _1d=this.getParams();
      for(var key in _1d){
        _19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";
      }
      var _1f=this.getVariablePairs().join("&");
      if(_1f.length>0){
        _19+="<param name=\"flashvars\" value=\""+_1f+"\" />";
      }
      _19+="</object>";
    }
    return _19;
  },
  write:function(_20){
    if(this.getAttribute("useExpressInstall")){
      var _21=new deconcept.PlayerVersion([6,0,65]);
      if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){
        this.setAttribute("doExpressInstall",true);
        this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
        document.title=document.title.slice(0,47)+" - Flash Player Installation";
        this.addVariable("MMdoctitle",document.title);
      }
    }
    if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){
      var n=(typeof _20=="string")?document.getElementById(_20):_20;
      n.innerHTML=this.getSWFHTML();
      return true;
    } else {
      if(this.getAttribute("redirectUrl")!=""){
        document.location.replace(this.getAttribute("redirectUrl"));
      }
    }
    return false;
  }
};
deconcept.SWFObjectUtil.getPlayerVersion=function(){
  var _23=new deconcept.PlayerVersion([0,0,0]);
  if(navigator.plugins&&navigator.mimeTypes.length){
    var x=navigator.plugins["Shockwave Flash"];
    if(x&&x.description){
      _23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));
    }
  } else {
    if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){
      var axo=1;
      var _26=3;
      while(axo){
        try{
          _26++;
          axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);
          _23=new deconcept.PlayerVersion([_26,0,0]);
        } catch(e) {
          axo=null;
        }
      }
    } else {
      try{
        var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
      } catch(e) {
        try{
          var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
          _23=new deconcept.PlayerVersion([6,0,21]);
          axo.AllowScriptAccess="always";
        } catch(e) {
          if(_23.major==6) return _23;
        }
        try{
          axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        }catch(e){}
      }
      if(axo!=null){
        _23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
      }
    }
  }
  return _23;
};
deconcept.PlayerVersion=function(_29){
  this.major=_29[0]!=null?parseInt(_29[0]):0;
  this.minor=_29[1]!=null?parseInt(_29[1]):0;
  this.rev=_29[2]!=null?parseInt(_29[2]):0;
};
deconcept.PlayerVersion.prototype.versionIsValid=function(fv){
  if(this.major<fv.major) return false;
  if(this.major>fv.major) return true;
  if(this.minor<fv.minor) return false; 
  if(this.minor>fv.minor) return true;
  if(this.rev<fv.rev) return false; 
  return true;
};
deconcept.util={
  getRequestParameter:function(_2b){
    var q=document.location.search||document.location.hash;
    if(_2b==null) return q;
    if(q){
      var _2d=q.substring(1).split("&");
      for(var i=0;i<_2d.length;i++){
        if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){
          return _2d[i].substring((_2d[i].indexOf("=")+1));
        }
      }
    }
    return "";
  }
};
deconcept.SWFObjectUtil.cleanupSWFs=function(){
  var _2f=document.getElementsByTagName("OBJECT");
  for(var i=_2f.length-1;i>=0;i--){
    _2f[i].style.display="none";
    for(var x in _2f[i]){
      if(typeof _2f[i][x]=="function"){
        _2f[i][x]=function(){};
      }
    }
  }
};
if(deconcept.SWFObject.doPrepUnload){
  if(!deconcept.unloadSet){
    deconcept.SWFObjectUtil.prepUnload=function(){
      __flash_unloadHandler=function(){};
      __flash_savedUnloadHandler=function(){};
      window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);
    };
    window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);
    deconcept.unloadSet=true;
  }
}
if(!document.getElementById&&document.all){
  document.getElementById=function(id){
    return document.all[id];
  };
}

function SetCookie(cookieName, cookieValue, nDays) {
  var today = new Date();
  var expire = new Date();
  if (nDays == null || nDays == 0) nDays = 1;
  expire.setTime(today.getTime() + 3600000 * 24 * nDays);
  if (!DisableFirstPartyCookies)
    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString() + "; path=/" + (cookieDomain == "" ? "" : "; domain=" + cookieDomain);
}

function ReadCookie(cookieName) {
  var theCookie = "" + document.cookie;
  var ind = theCookie.indexOf(cookieName);
  if (ind == -1 || cookieName == "") return "";
  var ind1 = theCookie.indexOf(';', ind);
  if (ind1 == -1) ind1 = theCookie.length;
  return unescape(theCookie.substring(ind + cookieName.length + 1, ind1));
}

/*Create a WebAbacus Namespace*/
var WEBABACUS = function() {
  
  function cacheBuster(){
    return new Date().getTime();
  }

  function browserName(){
      if (navigator.appName == 'Netscape') return "NS";
      else {
          if (navigator.appName == 'Microsoft Internet Explorer') return "IE";
          else return "OT";
      }
  }

    function detectJava() {
        return (navigator.javaEnabled()) ? 1 : 0;
    }

  //Values used for the cookies
    var clifems = cookieLife * 86400000;
    var cexp = new Date((new Date().getTime()) + clifems);
    function detectCookies() {
        var testValue = Math.floor(1000 * Math.random());
        SetCookie('AreCookiesEnabled', testValue);
        return (testValue == ReadCookie('AreCookiesEnabled')) ? 1 : 0;
    }
    
  
 function getCookie(name) {
        var dc = document.cookie;
        var cname = name + "=";
        var clen = dc.length;
        var cbegin = 0;
        while (cbegin < clen) {
            var vbegin = cbegin + cname.length;
            if (dc.substring(cbegin, vbegin) == cname) {
                var vend = dc.indexOf(";", vbegin);
                if (vend == -1) vend = clen;
                return unescape(dc.substring(vbegin, vend));
            }
            cbegin = dc.indexOf(" ", cbegin) + 1;
            if (cbegin == 0) break;
        }
        return null;
    }

  //Simulate a hash with two corrosponding arrays
  var keys = new Array();
    var values = new Array();
    function getQSParam(key) {
        var value = null;
        for (var i = 0; i < keys.length; i++)
        {
            if (keys[i] == key)
            {
                value = values[i];
                break;
            }
        }
        return value;
    }

    function parseQS() {
        var query = "";
        try {
            query = top.window.location.search.substring(1);
        } catch (e) {
        }
        var query1 = query.toLowerCase();
        var pairs = query1.split("&");

        for (var i = 0; i < pairs.length; i++)
        {
            var pos = pairs[i].indexOf('=');
            if (pos >= 0)
            {
                keys[keys.length] = pairs[i].substring(0, pos);
                values[values.length] = pairs[i].substring(pos + 1);
            }
        }
    }

    function wa_getTagID(oAtag) {

        if (typeof(oAtag.id) != "undefined" && oAtag.id != "")
            return "&tagId=" + oAtag.id;
        else
            return "";
    }

    function wa_getTagHref(tag) {
        if (typeof(tag.href) != "undefined" && tag.href != "")
            return tag.getAttribute("href");
        else
            return "-";
    }

  /*The charArray is used in generating random number for the webabacusID and the trioID*/
    var charArray = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    function gen_id(int2) {
        var key1 = "";
        var key2 = "";
        for (i = 0; i < int2; i++) {
            key1 += charArray[Math.floor(Math.random() * charArray.length)];
        }
        for (i = 0; i < key1.length; i++) {
            key2 += key1.charCodeAt(i).toString(16);
        }

        var curDate = new Date();
        var curMonth = curDate.getMonth() + 1;
        var curYear = curDate.getYear();
        var curDay = curDate.getDate();

        //Create Date, Time, and GMT offset String
        if (curDay < 10)
            curDay = "0" + curDay;
        if (curMonth < 10)
            curMonth = "0" + curMonth;
        if (curYear < 1000)
            curYear += 1900;

        var CreationDate = curYear.toString() + curMonth.toString() + curDay.toString();

        var curDateTime = new Date();
        var curHour = curDateTime.getHours() + curDateTime.getTimezoneOffset() / 60;
        if (curHour > 24)  curHour -= 24;
        if (curHour < 0) curHour += 24;
        var curMin = curDateTime.getMinutes();
        var curSec = curDateTime.getSeconds();
        var curTime = ((curHour < 10) ? "0" : "") + curHour + ((curMin < 10) ? "0" : "") + curMin + ((curSec < 10) ? "0" : "") + curSec;
        var CreationTime = curTime + "-" + (curDateTime.getTimezoneOffset() / 60);

        var CreatedAt = "d" + CreationDate + "_t" + CreationTime;

        //Create WebAbacus ID (ID) from two random strings, and the date/time/offset string
        var id = key1 + key2 + "-1-" + CreatedAt;
        return(id);
    }

  function getSite() {
      var siteName = escape(site);
      if (siteName == null || siteName == "") siteName = "-";
      return siteName;
  }
  
  /* Computes the extension of the bug image on the server */
  function extension(){
    if(ThirdPartyCookie)
      return ".asp";
    else
      return".gif";
  }
  
  /*Returns the version of the tag code*/
  function civersion(){
    return "3.01";
  } 

  /*Returns the time at which the script was loaded */
    var timeAtLoad = new Date().getTime();
  function baseTime(){
    return timeAtLoad;
  }
   
  /*Returns the timeZoneOffset*/
  function timeZoneOffset() {
    return new Date().getTimezoneOffset();
  } 
  
  /*Return the unique user ID*/
  function ID(){
    return webabacusID;
  }
  
  /*Returns an integer flag showing if this is a new user*/
  function isNewUser(){
    return newUser;
  }
  
  /*Returns the screen depth, when pet is 2*/
  function screenDepth(pet){
    return Math.pow(2, screen.colorDepth);
  }

  /*Returns the screen resolution when pet is 02*/
  function screenResolution(pet){
    return screen.width + "x"+ screen.height;
  }

  /*Compute the window resolution when pet is 02*/
  function windowResolution(pet){
      var ww;
      var wh;
      if (browserName() == 'IE') {
          if (document.documentElement && document.documentElement.clientWidth) {
              ww = document.documentElement.clientWidth;
              wh = document.documentElement.clientHeight;
          }
          else if (document.body) {
              ww = document.body.clientWidth;
              wh = document.body.clientHeight;
          }
      } else {
          try {
              ww = window.outerWidth;
              wh = window.outerHeight;
          } catch (e) {
              ww = 0;
              wh = 0;
          }
      }
      return ( ww + "x" + wh);
  }

  /*Returns if java is enabled*/
  function javaEnabled(){
    return navigator.javaEnabled()? "Y" : "N";
  }

  /*Returns the js language when pet is 02*/
  function language(pet){
    return browserName() == "NS" ? navigator.language : navigator.browserLanguage;
  }

  /*Returns the server name when pet is 02 or null*/
  function serverName(pet){
    return document.domain;
  }
  
  /*Returns if the page request was for a secure site or not*/
  function isSecure(){
    return pageRes().substring(0,5)=="https";
  }
  
  /*Returns the page resource name when pet 02 or null*/
  function pageRes(pet){
    return (escape(document.URL) || "-");
  }

  /*Returns the page's referrer when pet is 02*/
  function referrer(pet){
    var ref = escape(document.referrer)
    if (ref==null || ref=="") ref="-";
    return ref
  }
  
  /*Returns the page's title when pet is 02*/
  function pageTitle(pet){
    var title = escape(document.title);
      if (title == null || title == "") title = "-";
    return title;
  }

  /*Returns the file size when pet=02*/
  function fileSize(pet){
    try {
      return document.fileSize;
    } catch (e) {
      return "-";
    }
  }
  
  /*Returns the size of the images when pet=02*/
  function imagesSize(pet){
    var sizeCounter=0;
    try{
      for(i=0; i<document.images.length; i++){
        sizeCounter+=parseInt(document.images[i].fileSize);
      }
      return sizeCounter;
    } catch (e) {
      return "-";
    }
  }

  /*Generate a trioID*/
  function generateTrioID(){
      var rn = "";
      for (var i = 0; i < 4; i++) {
          rn += charArray[Math.floor(Math.random() * charArray.length)];
      }
    var tmp2 = new Date().getTime();
      var tmp3 = Math.floor(tmp2 / 200000);
      var tmp4 = Math.floor(tmp3 * 200000);
    return (rn + (Math.floor(tmp2 - tmp4)));
  }
  
  /*Returns the trioID, which is pre-compuated and pushe into the closure to ensure it does not change.
   A PET value of anything other than 01, 02, 03 should result in a unique trioID*/
  var generatedTrioID = generateTrioID(); 
  function trioID(pet){
    if((pet==01) || (pet==02) || (pet==03)) return generatedTrioID;
    return generateTrioID();
  }

  function SRT(pet){
    if (pet==01) return (new Date().getTime()-baseTime());
    return 0;
  }

  function OET(pet){
    if (pet==02) return (new Date().getTime()-baseTime());
    return 0;
  }
  
  function UET(pet){
    if (pet==03) return (new Date().getTime()-baseTime());
    return 0;
  }

  /*Returns the marketing source of this visit, when pet=02*/
  function marketingSource(pet){
    var mktSrc = "-"
    if (getQSParam(sourceparamname)!=null){
      mrkSrc = escape(getQSParam(sourceparamname));
    } else if (optout != "1"){
      mktSrc = getCookie("wa_last_source");
    } 
    if (mktSrc==null || mktSrc=="") mrkSrc="-";
    return mktSrc;
  }
  
  /*Returns the date on which the marketing source was last changed*/
  function marketingSourceDate(pet){
    var mktSrcDate = "0"
    if (getQSParam(sourceparamname)!=null){
      mrkSrcDate = baseTime();
    } else if (optout != "1"){
      mktSrcDate = getCookie("wa_last_source_date");
    } 
    if (mktSrcDate==null || mktSrcDate=="") mrkSrc="0";
    return mktSrcDate;
  }

  /* Capture the values of the custom fields when pet=02*/
  function captureCustomFields(pet){
    var customfields = "";
      if (typeof(wacustomvarnames) != "undefined") {
          customfields = "";
          for (i = 0; i < wacustomvarnames.length; i++) {
              customfields = customfields + wacustomvarnames[i] + "~" + wacustomvarvalues[i];
              if (i != wacustomvarnames.length - 1) customfields = customfields + "~";
          }
      }
    customfields += (typeof(wa_SiteName) != "undefined") ? "~wa_SiteName~" + wa_SiteName : "";
    customfields += (typeof(wa_UniqueUserID) != "undefined") ? "~wa_UniqueUserID~" + wa_UniqueUserID : "";
    customfields += (typeof(wa_UniquePageName) != "undefined") ? "~wa_UniquePageName~" + wa_UniquePageName : "";
    customfields += (typeof(wa_SiteBreadCrumb) != "undefined") ? "~wa_SiteBreadCrumb~" + wa_SiteBreadCrumb : "";
    customfields += (typeof(wa_ProductID) != "undefined") ? "~wa_ProductID~" + wa_ProductID : "";
    customfields += (typeof(wa_ProductValue) != "undefined") ? "~wa_ProductValue~" + wa_ProductValue : "";
    customfields += (typeof(wa_TotalTransactionValue) != "undefined") ? "~wa_TotalTransactionValue~" + wa_TotalTransactionValue : "";
    customfields += (typeof(wa_UniqueTransactionId) != "undefined") ? "~wa_UniqueTransactionId~" + wa_UniqueTransactionId : "";
    customfields += (typeof(wa_TransactionCurrency) != "undefined") ? "~wa_TransactionCurrency~" + wa_TransactionCurrency : "";
    customfields += (typeof(wa_SearchPhrase) != "undefined") ? "~wa_SearchPhrase~" + wa_SearchPhrase : "";
    customfields += (typeof(wa_SearchResultsReturned) != "undefined") ? "~wa_SearchResultsReturned~" + wa_SearchResultsReturned : "";

    if(checkFlash) {
      var version = deconcept.SWFObjectUtil.getPlayerVersion();
      if(customfields == "-") customfields = "";
      customfields += "~fl~" + version['major'] +"."+ version['minor'] +"."+ version['rev'] + "~je~" + detectJava() + "~ce~" + detectCookies();
    }
      
    return customfields;
  }
  /*The following code, up untill return {...} is in effect the constructor. Shold be moved into a forma constructor at some
  poing in the future */
  
  parseQS();

    /*
  Check for and issue cookie. Set the webabacus id too
  webabacus id will be set to the value of  "webabacus_id" parameter by preference if it is included
  otherwise it will be got from the cookie
  otherwise it will be generated and written to the cookie
  */
    var optout = getCookie("nocookie");
  var webabacusID;
  var idparm;
  var newUser;
    if (optout != "1") {
        idparm = getQSParam(WebAbacusRef);
        if (idparm == null || idparm == "") {
            webabacusID = getCookie("webabacus_id");
        } else {
            webabacusID = idparm;
        }
        if (webabacusID == null || webabacusID == "-1") {
            webabacusID = gen_id(5);
            newUser = "1" // New user (they've not been issued a cookie before)
        } else {
      newUser = "0"
        }
        if (!DisableFirstPartyCookies) document.cookie = "webabacus_id=" + escape(webabacusID) + "; expires=" + cexp.toUTCString() + "; path=/" + (cookieDomain == "" ? "" : "; domain=" + cookieDomain);

        // Check that cookie has been set. If not set the webabacus id value to null.
        if (document.cookie.indexOf(escape(webabacusID)) < 0) {
            var webabacusID = '-';
            var newUser = '-';
        }
    } else {
        webabacusID = "nocookie";
        newUser = "-1";
    }


  
    // The source (ie marketing source) if set is identified by a query param of name sourceparamname
    // if it is set, and we are using cookies, set the value in the cookie 
    var source = getQSParam(sourceparamname);
    if ((source != null) && (!DisableFirstPartyCookies) && (optout != -1)) {
    document.cookie ="wa_last_source=" +  escape(source) + "; expires=" + cexp.toUTCString() + "; path=/" + (cookieDomain == "" ? "" : "; domain=" + cookieDomain);
    document.cookie ="wa_last_source_date=" + baseTime() + "; expires=" + cexp.toUTCString() + "; path=/" + (cookieDomain == "" ? "" : "; domain=" + cookieDomain);
  }
  
    return {
    /*Here we define the public methods on our WEBABACUS object */

      /*Writes out an alert messages into the page, rather than using the alert() browser method*/
        alert: function(text) {
            text = String(text).replace(/\n/g, "<br/>");
            var template =  "<center><div id='WEBABACUS-msg' style='height:80px;width:40%;border:2px solid GREY;overflow: auto;'>" +
              "<div style='background-color:#FFFDBE;color:black;padding:5px;font-family:verdana;font-size:xx-small'>" +
              "<center><b>WebAbacus Tag code (v" +civersion()+ ")</b><br/><br/>%TEXT%" +
              "<br/><input type='button' value='Hide' onclick='document.getElementById(\"WEBABACUS-msg\").style.display=\"none\"' />" +
              "<input type='button' value='Stop' onclick='SetCookie(\"webabacus_debug\", false, 740);document.getElementById(\"WEBABACUS-msg\").style.display=\"none\"' />" +
              "</div></div></center>";
            var to_write = template.replace("%TEXT%", text);
            if (document.getElementById("WEBABACUS-msg-div")) { //If the 'WEBABACUS-msg-div' exists, just write our data into it.
                document.getElementById("WEBABACUS-msg-div").innerHTML = to_write;
            } else { //Else create the element before writing the data.
                var div = document.createElement("div");
                div.setAttribute("id", "WEBABACUS-msg-div");
                div.innerHTML = to_write;
        var pageBody = document.getElementsByTagName("body")[0];
        if(pageBody){
          pageBody.insertBefore(div, pageBody.firstChild); //write to the page if we can
        } else {
          alert(to_write); // if the DOM has not yet been parsed, use an alert box
        } 
        
            }
        },
    //Browser Agnostic addEvent method
        addEvent: function(elm, evType, fn, useCapture) {
      //Check to see what functions are defined, and use that to 
      //add the necessary event handler. 
            if (elm.addEventListener){
                elm.addEventListener(evType, fn, useCapture);
                return true;
            } else if (elm.attachEvent) {
                return elm.attachEvent('on' + evType, fn);
            } else {
                elm['on' + evType] = fn;
            }
        },
    /*Attach events to all links that trigger tag requests*/
        attachOnClickExternalLink: function() {
            var trackableSuffixes = autoTagDocuments.split(",");
            var tags = document.getElementsByTagName('a');
            var sDomain = document.domain;
            var isTD = (typeof(autoTagTrustedDomain) != "undefined");
      var debug_flag=(document.URL.indexOf('wa_debug=true') > -1) || (document.cookie.indexOf("webabacus_debug=true") > -1);
      
      //Add onclick events for left and right clicks that send a tag request logging the event
      var makeLinkSelfTagging = function(tag, eventType){
        WEBABACUS.addEvent(tag, "click", function() {
                    WEBABACUS.logclientdata('0', "/CustomEvent="+eventType+"&URL=" + wa_getTagHref(tag) + "&ClickType=Left" + wa_getTagID(tag));
          if (debug_flag)
            WEBABACUS.alert("CustomEvent="+eventType+"&URL=" + wa_getTagHref(tag) + "&ClickType=Left" + wa_getTagID(tag));

                }, false);
                WEBABACUS.addEvent(tag, "contextmenu", function() {
                    WEBABACUS.logclientdata('0', "/CustomEvent="+eventType+"&URL=" + wa_getTagHref(tag) + "&ClickType=Right" + wa_getTagID(tag));
          if (debug_flag)
            WEBABACUS.alert("CustomEvent="+eventType+"&URL=" + wa_getTagHref(tag) + "&ClickType=Right" + wa_getTagID(tag));
                }, false);
      }
      
      //for each link on the page
            for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
        if (!tags[tagIndex].getAttribute("href")){continue;} //skip this link if no href attribute is avaiable            
        var href = tags[tagIndex].getAttribute("href").toLowerCase();
                
        //check for trackable documents
        for (var j = 0; j < trackableSuffixes.length; j++) {
                    if ((href.indexOf("." + trackableSuffixes[j]) > 0) && (autoTagDocuments.length > 0)) {
            makeLinkSelfTagging(tags[tagIndex], "file");
            continue;
                    } 
          }
      
        //check for trackable external links
        
        if ((autoTagExternalLinks) && (href.indexOf("http://") != -1 || href.indexOf("https://") != -1)) {
          sDomainLink = href.match(/:\/\/(www\.)?([^\/:\?]+)/);
                    sDomainLink = sDomainLink[2] ? sDomainLink[2] : '';
                    if (sDomain.indexOf(sDomainLink) == -1) {
            makeLinkSelfTagging(tags[tagIndex], "extURL");
                        if (isTD) {
                          if (autoTagTrustedDomain.indexOf(sDomainLink) > -1) {
                var tag_href=tags[tagIndex].getAttribute('href');
                tag_href += ((href.indexOf("?")>0) ? "&" : "?");
                                tag_href += WebAbacusRef + "=" + getCookie("webabacus_id");
                tags[tagIndex].setAttribute("href", tag_href);
                          }
                          continue;
                         }
                }
                } else if ((autoTagExternalLinks) && (href.indexOf("mailto:") != -1)) {
                      makeLinkSelfTagging(tags[tagIndex], "email");
                      continue;
                }
             }

        },
        /*Log data to the server*/
    logclientdata: function(thispet, event) {
            var page_resource_function = pageRes
      var page_referrer_function = referrer
      
      //If a custom event has been called redefine the functions used for page resource and referrer
      if ((thispet == "0")&& (event!=null)) {
        page_resource_function = function(thispet){
          var page_resource
          if (isSecure()) {
                      page_resource = escape('https://') + serverName() + escape(event.replace('https://', ''));
                  } else{
                      page_resource = escape('http://') + serverName() + escape(event.replace('http://', ''));
          }
          return page_resource;
        }
                
        page_referrer_function = function(thispet){
          return escape(document.URL);
        }
            }
          
            // decide which tag request (secure vs non-secure) to use
            var base = ((isSecure()) ? secureserver : server) + "/clientinfo" + extension() + "?" + civersion() + "&" + cacheBuster() + "&";
            var tag_request =   getSite() + "&" + 
                timeZoneOffset() + "&" + 
                ID() + "&" + 
                isNewUser() + "&" + 
                screenDepth(thispet) + "&" + 
                screenResolution(thispet) + "&" + 
                windowResolution(thispet) + "&" + 
                "-" + "&" + 
                javaEnabled() + "&" + 
                language(thispet) + "&" + 
                serverName(thispet) + "&" + 
                page_resource_function(thispet) + "&" + 
                page_referrer_function(thispet) + "&" + 
                pageTitle(thispet) + "&" + 
                fileSize(thispet) + "&" + 
                imagesSize(thispet) + "&" + 
                trioID(thispet) + "&" + 
                thispet + "&" + 
                SRT(thispet) + "&" + 
                OET(thispet) + "&" + 
                UET(thispet) + "&" + 
                marketingSource(thispet) + "&" + 
                marketingSourceDate(thispet) + "&" + 
                captureCustomFields(thispet)+ "&" +
                "-";

      /*Send the request*/
            var maxlen = 4000;
            if (tag_request.length > maxlen) tag_request = tag_request.substring(0, maxlen);
      
      if(document.URL.indexOf("file://") == -1){
        var request_bug = new Image();
        //alert(base + tag_request);
        //request_bug.src = base + tag_request ; //This line actually sends the http(s) request
        $(request_bug).attr("src", base + tag_request);
        
        $(request_bug).bind("onabort", function(ev){
        $(request_bug).attr("src", base + tag_request);
        });
        
        /*$.ajax({
                    url: base + tag_request,
                    dataType: 'image/gif',
                    cache: false,                  
                    success: function (response) {
                        //alert(response);
                    }
                });*/
               
               
                
        

        
        
      }
      
      var debug_flag=(document.URL.indexOf('wa_debug=true') > -1) || (document.cookie.indexOf("webabacus_debug=true") > -1);
            if ((thispet=="02")&& debug_flag) {
                WEBABACUS.alert("Base Details: " + base +"\nSite name (st): " + getSite() + "\nTime zone offset (tz): " + timeZoneOffset() + "\nWebabacus ID (id): " + ID() + "\nNew user flag (nu): " + isNewUser() + "\nVisitor Screen Colour Depth (sc): " + screenDepth(thispet) + "\nVisitor Screen resolution (sr): " + screenResolution(thispet) + "\nVisitor Window resolution (wr): " + windowResolution(thispet) + "\nJavascript version (js): " + "-" + "\nJava Enablement (je): " + javaEnabled() + "\nBrowser Language (lg): " + language(thispet) + "\nServer name (dn): " + serverName(thispet) + "\nResource (res): " + pageRes() + "\nReferrer (ref): " + referrer(thispet) + "\nPage Title (pt): " + pageTitle(thispet) + "\nFile Size: " + fileSize(thispet) + "\nImages Size: " + imagesSize(thispet)+ "\ntrioID: " + trioID(thispet) + "\nthispet: " + thispet + "\nSRT: " + SRT(thispet) + "\nOET: " + OET(thispet) + "\nUET: " + UET(thispet) + "\nMarketing Source: " + marketingSource(thispet) + "\nMarketing Source Date: " + marketingSourceDate(thispet) + "\ncustomfields: " + captureCustomFields(thispet) + "\nOffertyperef: " + Offertyperef + "\nHolidaytype: " + Holidaytype + "\nLinkname: " + Linkname + "\nlateOfferRef: " + lateOfferRef + "\nlateOfferType: " + lateOfferType + "\nHomePageBooking: " + HomePageBooking  + "\n\ncs(User Agent): " + navigator.userAgent);
                if (!DisableFirstPartyCookies)
          SetCookie('webabacus_debug',true,740);
            }

            if (document.URL.indexOf('wa_debug=false') > -1) {
        if (!DisableFirstPartyCookies)
          SetCookie('webabacus_debug',false,740);
            }
        }
    }
}();

/*Executes as soon as the JS engine parses the script*/
WEBABACUS.logclientdata("01");

/*Executes once the page has been loaded, and rendered*/
WEBABACUS.addEvent(window, "load", function() {
                WEBABACUS.attachOnClickExternalLink();
                WEBABACUS.logclientdata('02');
            }, false);

/*Executes when the user triggers the "unload" event. Which happens whenever the user leaves the page,
i.e. by going to another page or by closing the window. However it will only execute if the page finsihed loading
before the user leaves the page*/
WEBABACUS.addEvent(window, "unload", function() {
                WEBABACUS.logclientdata('03');
            }, false);
            
/*Executes once the page has been loaded, and rendered*/
WEBABACUS.addEvent(window, "open", function() {
      WEBABACUS.highlightspanel();
      WEBABACUS.logclientdata('0');
}, false);


/* THIS IS "webabacus-tag.js" added on 24/11/2010 for HAVEN OPTIMIZATION ends here ****/

/* natsearch.js ########################################################### */
// haven natural traffic switcher by arena quantum /////////
// checks domain on common content to show correct script //
/* Disable this - DC */

var Host = (("https:" == document.location.protocol) ? "https:" : "http:"); // is current connection secure?
var siteName = document.domain; // get current domain
siteName = siteName.split("."); // split domain at full-stops
siteName = siteName[1]; // get value between first and second full stops

if(siteName == 'haven') { // write haven script to the browser
	document.write(unescape("%3Cscript src='" + Host + "//secure.img-cdn.mediaplex.com/0/13791/arenaq_haven_holidays_naturaltraffic.js' type='text/javascript'%3E%3C/script%3E"));
}
else if(siteName == 'caravancamping') { // write touring script to the browser
	document.write(unescape("%3Cscript src='" + Host + "//secure.img-cdn.mediaplex.com/0/13792/arenaq_haven_touring_naturaltraffic.js' type='text/javascript'%3E%3C/script%3E"));	
}
else { // if current domain neither haven nor caravancamping do nothing...
}
/* */


/* RedWeb - Carousel Animation plugin */
var redweb = {}
redweb.carousel=function(a){function k(){clearInterval(b.Options.carouselTimer)}function j(){b.Options.carouselTimer=setInterval(function(){c(b.Options.carouselDirection,b.Options);if(b.Options.addControls==true){if($("#"+$(b.Options.carouselContainer).parent().attr("id")+" .carouselControls .scrollTo .selected").next().length!=0){$("#"+$(b.Options.carouselContainer).parent().attr("id")+" .carouselControls .scrollTo .selected").removeClass("selected").next().addClass("selected")}else{$("#"+$(b.Options.carouselContainer).parent().attr("id")+" .carouselControls .scrollTo a").removeClass("selected");$("#"+$(b.Options.carouselContainer).parent().attr("id")+" .carouselControls .scrollTo a:first-child").addClass("selected")}}},b.Options.carouselInterval)}function i(a){c("scrollTo",b.Options,a)}function h(){c("forward",b.Options)}function g(){c("backward",b.Options)}function f(){b.Options.carouselArray=new Array;b.Options.carouselCount;b.Options.carouselTimer;b.Options.carouselStart;b.Options.carouselForwardLimit;b.Options.carouselBackwardLimit;b.Options.nextPosition;b.Options.currentPosition;b.Options.difference;b.Options.slidePosition;b.Options.carouselContents=$(b.Options.carouselContainer+" > "+b.Options.carouselContents);b.Options.carouselItemWidth=$(b.Options.carouselContents).width();$(b.Options.carouselContents).each(function(a){b.Options.carouselArray[a]=$(this);b.Options.carouselCount=a});if(b.Options.addControls==true){var a="<div class='carouselControls'>";a+="<a href='#' class='prev'>Previous</a><div class='scrollTo'>";for(var d=1;d<b.Options.carouselCount+2;d++){a+="<a href='#'";if(d==b.Options.startPosition){a+=" class='selected'"}a+=">"+d+"</a>"}a+="</div><a href='#' class='next'>Next</a>";a+="</div>";switch(b.Options.controlsLocation){case"before":$(b.Options.carouselContainer).before(a);break;case"after":$(b.Options.carouselContainer).after(a)}e(b.Options)}$(b.Options.carouselContainer).width((b.Options.carouselCount+1)*3*b.Options.carouselItemWidth);$(b.Options.carouselContents).clone().addClass("clone").prependTo(b.Options.carouselContainer);$(b.Options.carouselContents).clone().addClass("clone").appendTo(b.Options.carouselContainer);var f=$(b.Options.carouselContainer).parent().width();if(f==b.Options.carouselItemWidth*3){b.Options.carouselStart=-(b.Options.carouselItemWidth*(b.Options.carouselCount+1));b.Options.slidePosition=parseInt(b.Options.startPosition)+(b.Options.carouselCount-1);var g=-b.Options.slidePosition*b.Options.carouselItemWidth;$(b.Options.carouselContainer).css({left:g});b.Options.currentPosition=g;b.Options.carouselForwardLimit=b.Options.carouselStart;b.Options.carouselBackwardLimit=b.Options.carouselStart}else{b.Options.difference=(b.Options.carouselItemWidth*3-f)/2;b.Options.carouselStart=-(b.Options.carouselItemWidth*(b.Options.carouselCount+1))-b.Options.difference;b.Options.slidePosition=parseInt(b.Options.startPosition)+(b.Options.carouselCount-1);var g=-(b.Options.slidePosition*b.Options.carouselItemWidth)-b.Options.difference;$(b.Options.carouselContainer).css({left:g});b.Options.currentPosition=g;b.Options.carouselForwardLimit=b.Options.carouselStart+b.Options.difference;b.Options.carouselBackwardLimit=b.Options.carouselStart-b.Options.difference}if(b.Options.carouselAuto){b.Options.carouselTimer=setInterval(function(){c(b.Options.carouselDirection,b.Options);if(b.Options.addControls==true){if($("#"+$(b.Options.carouselContainer).parent().attr("id")+" .carouselControls .scrollTo .selected").next().length!=0){$("#"+$(b.Options.carouselContainer).parent().attr("id")+" .carouselControls .scrollTo .selected").removeClass("selected").next().addClass("selected")}else{$("#"+$(b.Options.carouselContainer).parent().attr("id")+" .carouselControls .scrollTo a").removeClass("selected");$("#"+$(b.Options.carouselContainer).parent().attr("id")+" .carouselControls .scrollTo a:first-child").addClass("selected")}}},b.Options.carouselInterval)}}function e(a){var c=$(a.carouselContainer).parent().attr("id");$("#"+c+" .carouselControls .prev").unbind().bind("click",function(){$("#"+c+" .carouselControls a").unbind().bind("click",function(){return false});b.Prev();if($("#"+c+" .carouselControls .scrollTo .selected").prev().length==0){$("#"+c+" .carouselControls .scrollTo a").removeClass("selected");$("#"+c+" .carouselControls .scrollTo a:last-child").addClass("selected")}else{$("#"+c+" .carouselControls .scrollTo .selected").removeClass("selected").prev().addClass("selected")}clearInterval(b.Options.carouselTimer);return false});$("#"+c+" .carouselControls .next").unbind().bind("click",function(){$("#"+c+" .carouselControls a").unbind().bind("click",function(){return false});b.Next();if($("#"+c+" .carouselControls .scrollTo .selected").next().length==0){$("#"+c+" .carouselControls .scrollTo a").removeClass("selected");$("#"+c+" .carouselControls .scrollTo a:first-child").addClass("selected")}else{$("#"+c+" .carouselControls .scrollTo .selected").removeClass("selected").next().addClass("selected")}clearInterval(b.Options.carouselTimer);return false});$("#"+c+" .carouselControls .scrollTo a").unbind().bind("click",function(){$("#"+c+" .carouselControls a").unbind().bind("click",function(){return false});b.ScrollTo($(this).text());$("#"+c+" .carouselControls .scrollTo a").removeClass("selected");$(this).addClass("selected");clearInterval(b.Options.carouselTimer);return false})}function d(a,b,c){switch(b){case"yes":$(c.carouselContainer).animate({left:a},c.slideSpeed,function(){$(c.carouselContainer).css({left:c.carouselStart});c.currentPosition=c.carouselStart;if(c.addControls==true){e(c)}if(c.slideCallBack){c.slideCallBack(c)}});break;case"no":$(c.carouselContainer).animate({left:a},c.slideSpeed,function(){c.currentPosition=a;if(c.addControls==true){e(c)}if(c.slideCallBack){c.slideCallBack(c)}})}}function c(a,b,c){switch(a){case"forward":b.nextPosition=b.currentPosition-b.carouselItemWidth;if(b.nextPosition<=b.carouselForwardLimit+b.carouselStart){d(b.nextPosition,"yes",b)}else{d(b.nextPosition,"no",b)}break;case"backward":b.nextPosition=b.currentPosition+b.carouselItemWidth;if(b.nextPosition>=b.carouselBackwardLimit-b.carouselStart){d(b.nextPosition,"yes",b)}else{d(b.nextPosition,"no",b)}break;case"scrollTo":b.slidePosition=parseInt(c)+(b.carouselCount-1);if(b.difference){b.nextPosition=-(b.slidePosition*b.carouselItemWidth)-b.difference}else{b.nextPosition=-(b.slidePosition*b.carouselItemWidth)}d(b.nextPosition,"no",b)}}var b=this;b.Options=new redweb.carousel.opt;this.Init=f;this.Prev=g;this.Next=h;this.ScrollTo=i;this.Auto=j;this.Stop=k};redweb.carousel.opt=function(){this.carouselContainer=".carousel > ul";this.carouselContents="li";this.carouselAuto=false;this.carouselInterval=5e3;this.startPosition=1;this.carouselDirection="forward";this.slideSpeed=1e3;this.addControls=false;this.controlsLocation="before";this.slideCallBack=""}
