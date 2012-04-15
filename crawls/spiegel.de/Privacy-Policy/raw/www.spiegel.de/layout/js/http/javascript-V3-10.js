
		SpOnENV_SERVER = window.location.protocol + '//www.spiegel.de';
	

SpOnENV_ForumSponDeServer='http://forum.spiegel.de';

var _sf_startpt=(new Date()).getTime();var spMobilePlusUrl;
var spOldMobileUrl;

var spMobilePlusHost="http://m.spiegel.de";
var spOldMobileHost="http://ml.spiegel.de";

var spDeviceConfig ={
	"devices": [
	           {"name": "iPad", "target":"ignore",
	        	"patterngroups": [
	        	                  {"white": ["ipad"]}
	        	                  ]
	           }, 
	           {"name": "iPhone/iPod", "target":"mobileplus",
	        	   "patterngroups": [
	        	                     {"white": ["iphone"]},
	        	                     {"white": ["ipod"]}
	        	                     ]
	           }, 
	           {"name": "OperaMini", "target":"ignore",
	        	   "patterngroups": [
	        	                     {"white": ["opera","mobile"]},
	        	                     {"white": ["opera","mini"]},
	        	                     {"white": ["opera","htc"]}
	        	                     ]
	           },
	           {"name": "Android", "target":"mobileplus",
	        	   "patterngroups": [
	        	                     {"white": ["android"]}
	        	                     ]
	           },
	           {"name": "Windows Phone", "target":"mobileplus",
	        	   "patterngroups": [
	        	                     	{"white": ["Windows Phone", "IEMobile/7"]},
	        	                     	{"white": ["Windows Phone", "IEMobile/9"]}
	        	                     ]
	           },
	           {"name": "Blackberry", "target":"mobileplus",
	        	   "patterngroups": [
	        	                     	{"white": ["blackberry","9800"]},
	        	                     	{"white": ["blackberry","9900"]},
	        	                     	{"white": ["blackberry","9780"]}
	        	                     ]
	           },
	           {"name": "OldMobileDevice","target":"mobile",
	        	   "patterngroups": [
									{"white": ["blackberry"]},
									{"white": ["midp"]},
									{"white": ["240x320"]},
									{"white": ["480x640"]},
									{"white": ["netfront"]},
									{"white": ["nokia"]},
									{"white": ["panasonic"]},
									{"white": ["portalmmm"]},
									{"white": ["sharp"]},
									{"white": ["sie-"]},
									{"white": ["sonyericsson"]},
									{"white": ["symbian"]},
									{"white": ["windows ce"]},
									{"white": ["benq"]},
									{"white": ["mda"]},
									{"white": ["mot-"]},
									{"white": ["opera mini"]},
									{"white": ["philips"]},
									{"white": ["pocket pc"]},
									{"white": ["sagem"]},
									{"white": ["samsung"]},
									{"white": ["sda"]},
									{"white": ["sgh-"]},
									{"white": ["vodafone"]},
									{"white": ["xda"]},
									{"white": ["htc"]},
									{"white": ["palm"]},
									{"white": [" arm"]},
									{"white": ["webos"]},
									{"white": ["mobile"]},
									{"white": ["mobi"]},
									{"white": ["mini"]},
									{"white": ["XV6850"]},
									{"white": ["plucker"]},
									{"white": ["Phone"]},
									{"white": ["Novarra-Vision"]},	        	                     
	        	                    {"white": ["windows", "mobi"]},
	        	                    {"white": ["opera", "mobi"]},
	        	                    {"white": ["nintendo", "dsi"]}
	        	                     ]
		       },
	           {"name": "Desktop", "target":"www",
	        	   "patterngroups": [
	        	                     {"white": ["Windows"]},
	        	                     {"white": ["Linux"]},
	        	                     {"white": ["konqueror"]},
	        	                     {"white": ["Macintosh"]},
	        	                     {"white": ["mac_powerpc"]}
	        	                     ]
			   }
	           ]
};

if (spMobilePlusUrl && spOldMobileUrl) {
	var skipDelegation = SPONgetCookie('spSkipDelegation');
	var spMobileHpFull = SPONgetCookie('spMobileHpFullView');
	if (spMobileHpFull != null && spMobileHpFull == 'true') {
		if (spMobilePlusUrl == '/index.html')
			spMobilePlusUrl='/index-full.html';
	}
	
	if (skipDelegation == null || skipDelegation != 'true') {
		var redirectHash="#spRedirectedFrom=www";
		var ua=navigator.userAgent;
		
		var device=spFindDevice(spDeviceConfig, ua);
		if (device != null) {
			if (device.target == 'mobileplus')
				document.location.href=spMobilePlusHost+spMobilePlusUrl+redirectHash;
			else if (device.target == 'mobile')
				document.location.href=spOldMobileHost+spOldMobileUrl;
		}
	}
}



function spFindDevice(spDeviceConfig, ua) {
	ua=ua.toLowerCase();
	var devices=spDeviceConfig.devices;
	for (var key in devices) {
		var device=devices[key];

		var patterngroups=device.patterngroups
		for (var p in patterngroups) {

			var  found = true;
			var patternList=patterngroups[p].white
			for (var k in patternList) {
				var pattern=patternList[k].toLowerCase();
				if (ua.indexOf(pattern) == -1) {
					found=false;
					break;
				}
			}
			if (found) {
				var patternList=patterngroups[p].black
				for (var k in patternList) {
					var pattern=patternList[k].toLowerCase();
					if (ua.indexOf(pattern) != -1) {
						found=false;
						break;
					}
				}
			}
			if (found)
				return device;			
		}
	}
	return null;
}SpOnENV_FlashvideoPopupParams  = 'width=769,height=489,scrollbars=no,resizable=no,screenX=150,screenY=100';
SpOnENV_PopTopPopupParams = 'width=500,height=310,resizable,screenX=150,screenY=100,status=no';

function goURL(frmlrname){
	adresse = document.forms[frmlrname].to.options[document.forms[frmlrname].to.selectedIndex].value;
	if(adresse=="") adresse = "javascript:void(0)";
	if(adresse.substr(0,1) == '/') adresse = SpOnENV_SERVER + adresse;
	window.location = adresse;
}

function RandomImg (Pfad,aBilder,Ext){
	if (typeof(Ext)=='undefined')Ext = "";
	if (Pfad =="img"){
		Pfad = SpOnENV_SERVER_IMG + "/img/0,1020,";
		if(Ext!="") Ext = ",00" + Ext;
	} else {
		Pfad = SpOnENV_SERVER_IMG + "/static/img/" + Pfad;
	}
	return Pfad + aBilder[Math.round(Math.random()*(aBilder.length-1))] + Ext;
}

function spon_popup(seite,breite,hoehe,scroll,rsize) {
	sbars = (scroll==1)? "yes" : "no";
	rsize = (rsize==1)? "yes" : "no";
	if(seite.substr(0,1) == '/') seite = SpOnENV_SERVER + seite;
	var win_name = breite+hoehe;
	var win_attr = "menubar=no,location=no,directories=no,toolbar=no,screenX=0,screenY=0";
	win_attr += ",width=" + breite + ",height=" + hoehe + ",scrollbars=" + sbars + ",resizable=" + rsize;
	sponWin = open(seite,win_name,win_attr);
	sponWin.focus();
}

function spToggleMPC(cid,nr) {
	for (i=1;i<=50;i++) {
		var mytab = document.getElementById('spMPCTab-'+cid+'-'+i);
		if (mytab) {
			if (nr == i) {
				mytab.className = 'spMPCTab spMPCTabAktiv';
				document.getElementById('spMPCContent-'+cid+'-'+i).style.display = 'block';
				spCounterContentainer(cid);
				window.setTimeout("spArrangeAnchorBoxes()", 250);
			} else {
				mytab.className = 'spMPCTab';
				document.getElementById('spMPCContent-'+cid+'-'+i).style.display = 'none';
			}
		} else {
			break;
		}
	}
}

function spToggleMultiboxReiter(assetid,nr) {
	for (i=1;i<=50;i++) {
		var mytab = document.getElementById('spMPCTab-'+assetid+'-'+i);
		if (mytab) {
			if (nr == i) {
				mytab.className = 'spMPCTab spMPCTabAktiv';
				document.getElementById('spMPCContent-'+assetid+'-'+i).style.display = 'block';
				window.setTimeout("spArrangeAnchorBoxes()", 250);
			} else {
				mytab.className = 'spMPCTab';
				document.getElementById('spMPCContent-'+assetid+'-'+i).style.display = 'none';
			}
		} else {
			break;
		}
	}
}

function spCounterGallery(galleryid) {
	spCounter('/fotostrecke/fotostrecke-' + galleryid + '-count.html');
}
function spCounterFlash(flashid) {
	spCounter('/flash/flash-' + flashid + '-count.html');
}
function spCounterContentainer(contentainerid) {
	spCounter('/count/contentainer/0,,' + contentainerid + ',00.html');
}
function spCounter(url) {
	if (typeof(spon_vdz_countframe) != 'undefined') spon_vdz_countframe.location.href = SpOnENV_SERVER + url;
}

function SPONgetCookie (name)
{
	function SPONgetCookieVal (offset)
	{
		var endstr = document.cookie.indexOf (";", offset);
		if (endstr == -1)
			endstr = document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));
	}
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return SPONgetCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

function spGetHashParams() {
	var loc=(document.location+"");
	var pos=loc.indexOf("#");
	if (pos == -1)
		return [];
	var hashQs=loc.substring(pos+1, loc.length);
	return spSplitParams(hashQs);
}
function spStripHashParams(url) {
	var pos=url.indexOf("#");
	if (pos == -1)
		return url;
	url = url.substring(0,pos);
	return url;
}

function spSplitParams(params) {
	var result=[];
	var pairs=params.split("&");
	for (var i=0; i < pairs.length; i++) {
		var kv=pairs[i].split("=");
		if (kv.length == 2)
			result[kv[0]]=kv[1];
	}
	return result;
}
function spShowOASPos(pos) {
	var color='red';
	if (typeof OAS_listpos != 'undefined' && typeof OAS_allposlist != 'undefined') {
		var searchpos = new RegExp('(^|,)'+pos+'(,|$)');
		if (searchpos.exec(OAS_listpos)) {
			color='lightgreen';
		} else if (searchpos.exec(OAS_allposlist)) {
			color='yellow';
		}
	}
	document.write('<div style="display:inline; border:1px solid black; background-color:'+color+'; text-decoration:blink;  margin:1px; padding:1px; font-size:12px; font-family: Arial; font-weight:bold">Ad: ' + pos + '</div>');
}


function spOpenLargePicture(page, width, height) {
	spon_popup(page,width+20,height+25,false,false);	
}

function spSetCookie(name, value, daystoexpire, path, domain, secure) {

	var expires = new Date();
	expires.setTime(expires.getTime() + (daystoexpire * 86400000));

	document.cookie= name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
} 

// HP-Channelboxen
function spHPTeaserInit(allchannels) {
	spHPTeaserLen = {};
	var cookie = SPONgetCookie('spHPTeaser');
	if (cookie != null) {
		var channel = cookie.split(' ');

		for (var i in channel) {
			spHPTeaserLen[channel[i]] = 1;
		}
	}
	var allchannelslist = allchannels.split(' ');
	for (var c in allchannelslist) {
		spHPTeaserToggle(allchannelslist[c],(typeof(spHPTeaserLen[allchannelslist[c]]) == 'undefined' ? 'less' : 'more'),0);
	}
	return false;
}

function spHPTeaserToggle(channelname, what, save) {
	if (typeof(spHPTeaserLen) == 'undefined') {
		spHPTeaserLen = {};
	}
	if (what == 'more') {
		spHPTeaserLen[channelname] = '1';
		document.getElementById('spRTmore_'+channelname).style.display = 'block';
		document.getElementById('spRTless_'+channelname).style.display = 'none';
	} else if (what == 'less'){
		if (typeof(spHPTeaserLen[channelname]) != 'undefined') {
			delete spHPTeaserLen[channelname];
		}
		document.getElementById('spRTmore_'+channelname).style.display = 'none';
		document.getElementById('spRTless_'+channelname).style.display = 'block';
	} else {
		return false;
	}
	
	if (save == 1) {
		var cookie = '';
		for (var c in spHPTeaserLen) {
			cookie = cookie + (cookie.length > 0 ? ' ' : '') + c
		}
		spSetCookie('spHPTeaser',cookie,365);
	}
	return false;
}

function spSetObjectHeight(id,newSize) {
    document.getElementById(id).height = newSize;
}
function spSetObjectSize(id,newWidth,newHeight) {
    document.getElementById(id).height = newHeight;
    document.getElementById(id).width  = newWidth;
}

function spClientIsIPad() {
	return navigator.userAgent.indexOf('iPad') > -1;
}
function spClientIsIPhone() {
	return navigator.userAgent.indexOf('iPhone') > -1;
}
function spClientIsIPod() {
	return navigator.userAgent.indexOf('iPod') > -1;
}
function spClientIsIDevice() {
	return spClientIsIPad() || spClientIsIPhone() || spClientIsIPod();
}

function spUtfSubmit(f) {
	if (navigator.appVersion.toLowerCase().indexOf("msie 6.") > 0 || navigator.appVersion.toLowerCase().indexOf("msie 7.") > 0) {  
		var url=f.action + '?';
		for (i = 0; i < f.elements.length; i++) {
			if (f.elements[i].name != 'undefined' && f.elements[i].name != '') {
				if (i>0) url += '&';
				url += f.elements[i].name + '=' + encodeURIComponent(f.elements[i].value)
			}
		}
		this.location.href=url;
		return false;
	} else {
		return true;
	}
}

function spArrangeAnchorBoxes() {
	if($("#spSmallTeaserColumnTop").offset() != null && $("#spArticleColumn .spAssetMarker").length > 0){
		var fixBoxOffset = $("#spSmallTeaserColumnTop").offset().top;
		var fixBoxOuterHeight = $("#spSmallTeaserColumnTop").outerHeight(true);
		var assetOffset = Math.round(fixBoxOffset + fixBoxOuterHeight);
	
		$("#spArticleColumn .spAssetMarker").each(function(index) {
			var ancOffset = Math.round($(this).offset().top + 3);
			var anchorBlock = $('#spSmallTeaserColumnAnchor' + $(this).attr('id').substr(13));
			var blockOffset = Math.round(anchorBlock.offset().top);

			if ((ancOffset - assetOffset) > 0 && anchorBlock.children().length > 0) {
				anchorBlock.css({"marginTop" : (ancOffset - assetOffset) + "px", "borderTop" : "4px solid #ececec"});
			}else{
				if($(this).attr("style") != "undefined"){
					anchorBlock.removeAttr("style");
				}
			}
			assetOffset = assetOffset + anchorBlock.outerHeight(true);
		});
	}
}
/* Calendar */

var spCalendar = function(initDate, startDate, endDate, contentainer) {
	this.initDate=initDate;
	if (contentainer != null)
		this.contentainerObject=document.getElementById(contentainer);
	this.months=new Array("Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli","August", "September", "Oktober", "November", "Dezember");
	this.weekDays=new Array("Mo", "Di", "Mi", "Do", "Fr", "Sa", "So");	
	this.year=null;
	this.month=null;
	this.day=null;
	this.date=null;
	this.startDate=startDate;
	this.endDate=endDate;
}

spCalendar.prototype = {

	init: function() {
		if (this.isDateValid(this.initDate)) {
			year=this.initDate.substring(0,4);
			month=this.initDate.substring(4,6);
			day=this.initDate.substring(6,8);
			this.date=new Date(year, month - 1, day);
		}
		else {
			this.date=new Date();
		}
	},

	isDateValid: function(date) {
		return (date != null && date != "" && !isNaN(date) &&	date.length == 8);
	},
	
	prepare: function() {
		if (this.date != null) {
			this.year=this.date.getFullYear();
			this.month=this.date.getMonth()+1;
			this.day=this.date.getDate();
		}
	}, 
	
	draw: function() {
		if (this.contentainerObject != null) {

			this.prepare();
			
			// Start Day of Calendar 
			var tmpDate=this.date;
			tmpDate.setDate(1);
			
			var firstDayOfMonth = tmpDate.getDay();
			if (firstDayOfMonth > 0)
				firstDayOfMonth--;
			else
				firstDayOfMonth=6;

			var daysInMonth = 31;
			if (this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11)
				--daysInMonth;
			if (this.month == 2) {
				daysInMonth = daysInMonth - 3;
				if (this.year % 4 == 0)
					daysInMonth++;
				if (this.year % 100 == 0)
					daysInMonth--;
				if (this.year % 400 == 0)
					daysInMonth++;
			}

			var table="";
			table+="<div id=\"spCalenderHead\"><p>24-STUNDEN-ARCHIV</p>";

			table+="<table cellpadding=\"0\" cellspacing=\"0\">";
			table+="<tr>";
			if (this.hasPrevMonth())
				table+="<td width=\"40\"><a href=\"javascript:void(0)\" id=\"spBtnBack\"><img src=\"/static/sys/v8/icons/pfeil-links-aktiv.jpg\" /></a></td>";
			else 
				table+="<td width=\"40\"><img src=\"/static/sys/v8/icons/pfeil-links-inaktiv.jpg\" /></td>";

			table+="<td width=\"202\">" + this.months[this.month-1] + " " + this.year + "</td>";
			if (this.hasNextMonth())
				table+="<td width=\"40\"><a href=\"javascript:void(0)\" id=\"spBtnNext\"><img src=\"/static/sys/v8/icons/pfeil-rechts-aktiv.jpg\" /></a></td>";
			else
				table+="<td width=\"40\"><img src=\"/static/sys/v8/icons/pfeil-rechts-inaktiv.jpg\" /></td>";

			table+="</tr>";
			table+="</table></div>";

			table+="<table cellpadding=\"0\" cellspacing=\"0\" id=\"spCalender\">";
			table+="<tr>";
			for (var i = 0; i <= 6; i++) {
				table+="<td><span>";
				table+=this.weekDays[i];
				table+="</span></td>";
			}
			table+="</tr>";
			
			var dayCount=1;
			//Rows
			for (var i = 0; i <= 5; i++) {
				if (dayCount <= daysInMonth) {
					table+="<tr>";
					// Columns
					for (var j = 0; j <= 6; j++) {
						if ((i == 0) && (j < firstDayOfMonth)) {
							table+="<td>&nbsp;</td>";
						}
						else {
							if (dayCount > daysInMonth) {
								table+="<td>&nbsp;</td>";
							}
							else {
								var dateString=this.year+""+(this.month < 10 ? "0"+this.month:this.month)+""+(dayCount<10?"0"+dayCount:dayCount);
	
								var drawLink=false;
								var today=false;
								if (dateString == this.initDate)
									today=true;
	
								if (dateString != this.initDate) {
									if (this.isDateValid(this.startDate) && this.isDateValid(this.endDate)) {
										if (parseInt(dateString) >= parseInt(this.startDate) && 
												parseInt(dateString) <= parseInt(this.endDate))
											drawLink=true;
										//alert(dateString + ">" + this.startDate +"\n" + dateString + "<" + this.endDate);
									}
									else if (this.isDateValid(this.startDate)) {
										if (parseInt(dateString) >= parseInt(this.startDate)) {
											drawLink=true;
										} 
									}
									else if (this.isDateValid(this.endDate)) {
										if (parseInt(dateString) < parseInt(this.endDate)) {
											drawLink=true;
										} 
									}
								}
	
								if (today)
									table+="<td class=\"spActive\">" + dayCount + "</td>";
								else if (this.endDate == dateString)
									table+="<td><a href=\"/home/seite2/index.html\">" + dayCount + "</a></td>";
								else if (drawLink)
									table+="<td><a href=\"/home/seite2/archiv-"+dateString+".html\">" + dayCount + "</a></td>";
								else
									table+="<td>" + dayCount + "</td>";
								dayCount++;
							 }
						}
					}
					table+="</tr>";
				}
			}
			table+="</table>";

			this.contentainerObject.innerHTML=table;

			var object=this;

			var btnNext=document.getElementById("spBtnNext");
			if (btnNext != null) {
				btnNext.onclick=function() {
					object.incMonth();
				}
			}
			var btnBack=document.getElementById("spBtnBack");
			if (btnBack != null) {
				btnBack.onclick=function() {
					object.decMonth();
				}
			}
		}
	},

	incMonth: function() {
		this.date.setMonth(this.date.getMonth()+1);
		this.draw();
	},
	
	decMonth: function() {
		this.date.setMonth(this.date.getMonth()-1);
		this.draw();
	},

	hasPrevMonth: function() {
		if (this.isDateValid(this.startDate)) {
			var sd=this.startDate.substring(0,6);
			var m=this.date.getMonth()+1;
			m=m < 10 ? "0"+m:m;
			var nd=this.date.getFullYear()+""+m;
			return (parseInt(sd) < parseInt(nd))
		}
		return true;
	},

	hasNextMonth: function() {
		if (this.isDateValid(this.endDate)) {
			var sd=this.endDate.substring(0,6);
			var m=this.date.getMonth()+1;
			m=m < 10 ? "0"+m:m;
			var nd=this.date.getFullYear()+""+m;
			return (parseInt(sd) > parseInt(nd))
		}
		return true;
	},

	getNextDayLink: function() {
		if (this.isDateValid(this.initDate) && this.isDateValid(this.endDate)) {
			if (this.initDate < this.endDate) {
				var tmp=new Date(this.date);
				tmp.setDate(tmp.getDate()+1);
				var m=tmp.getMonth()+1;
				var d=tmp.getDate();			
				return tmp.getFullYear()+""+(m<10?"0"+m:m)+""+(d<10?"0"+d:d);
			}
		}
		return "";
		
	},
	
	getLastDayLink:function() {
		if (this.isDateValid(this.initDate) && this.isDateValid(this.startDate)) {
			if (this.initDate > this.startDate) {
				var tmp=new Date(this.date);
				tmp.setDate(tmp.getDate()-1)
				var m=tmp.getMonth()+1;
				var d=tmp.getDate();
				return tmp.getFullYear()+""+(m<10?"0"+m:m)+""+(d<10?"0"+d:d);
			}
		}
		return "";
	
	}
}
/* /Calendar */
function spRedirectIE6(){
	var ua = $.browser;
	if(ua.msie && ua.version.slice(0,1) <= 6) {
		window.location = '/netzwelt/web/0,1518,774487,00.html';
		return false;
	}
}

var spUseVideoIframe = true;

function spOpenVideo(a, videoid){
	if($.browser.msie && $.browser.version.slice(0,1) <= 6) {
		window.location = '/netzwelt/web/0,1518,774487,00.html';
		return false;
	}else{
		// externe Videos in neuem Fenster öffnen
		if (videoid >= 99000000) {
			a.target='_blank';
			return true;
		}

		// sind wir im iFrame?
		var loc=location.href;
		var pos=loc.indexOf("iframe.html");
		if (pos > -1){
			a.href = "/video/video-"+videoid+"-iframe.html";
			a.target="_self";
			return true;
		}

		// kein iFrame, wenn die aufrufende Seite das verbietet (Video-Ansichten)
		if (!spUseVideoIframe) {
			return true;
		}

		// iFrame oeffnen
		if (document.images) {
			preload = new Image();
			preload.src = "/static/sys/v9/icons/ic_load-ani.gif";
		}
	
		var spGreyBox = document.createElement("DIV");
			
		spGreyBox.setAttribute("id", "spGreyBox");
		if (document.all)
			spGreyBox.attachEvent("onclick", spCloseVideoIframe);
		else
			spGreyBox.setAttribute("onclick", "spCloseVideoIframe();");
			
		var body = document.getElementsByTagName("BODY")[0];
		body.appendChild(spGreyBox);
	
		// iFrame-Position
		var scrolXOff = 0;
		var scrolYOff = 0;
		var windWidth = 0;
		var windHeigh = 0;
		var frameXpos = 0;
		var frameYpos = 0;
	
		if( typeof( window.innerWidth ) == 'number') {
			scrolXOff = window.pageXOffset;
			scrolYOff = window.pageYOffset;
			windWidth = window.innerWidth - 20;
			windHeigh = window.innerHeight - 20;
		} else if ( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			scrolXOff = document.documentElement.scrollLeft;
			scrolYOff = document.documentElement.scrollTop;
			windWidth = document.documentElement.clientWidth - 20;
			windHeigh = document.documentElement.clientHeight - 20;
		} else if ( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
			scrolXOff = document.body.scrollLeft;
			scrolYOff = document.body.scrollTop;
			windWidth = document.body.clientWidth - 20;
			windHeigh = document.body.clientHeight - 20;
		}
	
		if(windWidth > 998){
			frameXpos = (Math.floor((windWidth - 998) / 2) + scrolXOff);
		}else{
			frameXpos = (scrolXOff + 15);
			if (navigator.userAgent.indexOf('iPad') > -1){
				frameXpos = (scrolXOff);
			}
		}
	
		if(windHeigh > 725){
			frameYpos = (Math.floor((windHeigh - 725) / 2) + scrolYOff);
		}else{
			frameYpos = (scrolYOff + 30);
		}

		// Belegung weiterreichen
		var hashQs = "";

		// im Link direkt?
		var loc=(a.href + "");
		var pos=loc.indexOf("#");
		if (pos > -1){
			hashQs=loc.substring(pos, loc.length);
		}

		// oder in der aufrufenden Seite?
		else {
			var loc=(location.href + "");
			var pos=loc.indexOf("#");
			if (pos > -1){
				hashQs=loc.substring(pos, loc.length);
			}
		}
	
		var iframe = document.createElement("IFRAME");
		iframe.setAttribute("id", "spVideoIframe");
		iframe.setAttribute("src", "/video/video-"+videoid+"-iframe.html" + hashQs);
		iframe.setAttribute("width", "998");
		iframe.setAttribute("height", "725");
		iframe.setAttribute("border", "0");
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("scrolling", "no");
		iframe.style.left = frameXpos + 'px';
		iframe.style.top = frameYpos + 'px';
		if (!document.all)
			iframe.setAttribute("onload", "spIframeOnLoad(this.contentWindow.document.body.clientHeight);");
	
		var loadingDiv = document.createElement("DIV");
		loadingDiv.style.left = frameXpos + 'px';
		loadingDiv.style.top = frameYpos + 'px';
		loadingDiv.setAttribute("id", "spLoadingDiv");
		
		body.appendChild(loadingDiv);
		body.appendChild(iframe);
		if (navigator.userAgent.indexOf('iPad') > -1){
			var iframeWidth	= iframe.offsetWidth;
			var gbWidth		= window.innerWidth;
			var gbHeight	= document.getElementsByTagName('body')[0].offsetHeight;
			if(parseInt(iframeWidth) >= parseInt(gbWidth)){
				spGreyBox.style.width  = parseInt(iframeWidth) + 'px';
			}else{
				spGreyBox.style.width  = parseInt(gbWidth) + 'px';
			}
			spGreyBox.style.height = parseInt(gbHeight) + 'px';
		}
	
		return false;
	}
}

function spIframeOnLoad(iframeHeight) {
	spCloseLoadingDiv();
	if (!isNaN(iframeHeight)) {
		var iframe = document.getElementById("spVideoIframe");
		if (iframe != null)
			iframe.style.height=iframeHeight+"px";
	}
}

function spCloseLoadingDiv() {
	if (this.parent) {
		var parentDoc = this.parent.document;
		if (parentDoc !=null) {
			var videoloadingdiv = parentDoc.getElementById('spLoadingDiv');
			if (videoloadingdiv != null)
				videoloadingdiv.parentNode.removeChild(videoloadingdiv);
		}
	}
}

function spCloseVideoIframe(){
	var parentDoc = this.parent.document;
	var spGreyBox = parentDoc.getElementById('spGreyBox');
	spGreyBox.parentNode.removeChild(spGreyBox);
	var videoiframe = parentDoc.getElementById('spVideoIframe');
	videoiframe.parentNode.removeChild(videoiframe);
	spCloseLoadingDiv();
}

function spStartVideo2(videoId, poster, belegung, allowAds, credit, displaycat, videocat, server, trackingsize, startmod, onAdStart, onAdEnd, onVideoEnd, onFinalEnd, embedWidth, embedHeight){

	// Belegungseinheit fuer den Flash-Player
	try {
		var params=spGetHashParams();
		var oasVideoBelegung=params["oas.videobelegung"];
		if (oasVideoBelegung != null) {
			belegung = oasVideoBelegung;
		}
	}
	catch (e) {}

	
	// Pre- und Postroll-Gateway
	var rand = Math.round(Math.random()*99999) + '';
	while (rand.length < 5) { rand = '0' + rand;}
	var prerollGateway =  encodeURIComponent('http://adserv.quality-channel.de/RealMedia/ads/adstream_sx.ads/www.spiegel.de/' + belegung + '/' + rand + '@VMiddle2?videoad');
	var postrollGateway = encodeURIComponent('http://adserv.quality-channel.de/RealMedia/ads/adstream_sx.ads/www.spiegel.de/' + belegung + '/' + rand + '@VMiddle4?videoad');

	// Flash oder HTML5-Video ausgeben

	if (spClientIsIDevice()){

		if (parseInt(videoId) >= 58671) {
			$('#spReplaceVideo').sponVideoPlayer({

				// JSONP_Url_PreRoll : '/static/sys/ipad-video-special/content/preroll/wrapper.js',
				JSONP_Url_PreRoll : decodeURIComponent(prerollGateway),
				JSONP_Callback_PreRoll : '', // 'jason_callback', - fuer 3.10 auskommentiert, kommt erst mit 3.11

				/* (First Variant) Default configuration - START */ 
					// JSONP_Url_Content : '/static/sys/ipad-video-special/content/content/jsonp.js',
					// JSONP_Callback_Content :  'jason_callback',
				/* (First Variant) Default configuration - END */ 

				/* (Update 01.03.2012) Optional configuration - START */
					SPON_VIDEO_PATH_Content : '/video/media/', // Path to video file
					JSONP_Url_Content : 'video-'+videoId+'.html', // Video file.

					JSONP_DataFormat_Content : 'SPON_VIDEO_FILE', // !important - set this variable to 'SPON_VIDEO_FILE' to handle video files instead of 'SPON_CONTENT' for the old XML-structure.
				/* (Update 01.03.2012) Optional configuration - END */

				// JSONP_Url_PostRoll : '/static/sys/ipad-video-special/content/postroll/jsonp.js',
				JSONP_Url_PostRoll : decodeURIComponent(postrollGateway),
				JSONP_Callback_PostRoll :  '', // 'jason_callback', - fuer 3.10 auskommentiert, kommt erst mit 3.11

				SPON_POSTER_URL_Content : poster, // The default should be none.
				SPON_POSTER_URL_Ads : poster, // A black screen in 640 x 360 is recommended.

				// debug:true,

				netmind : {start : '/static/sys/ipad-video-special/track.gif?t=netmind_start', end: '/static/sys/ipad-video-special/track.gif?t=netmind_end'},

				companionAdDestinationID : '#spOasReminder',
				videoTagDestinationID : '#sponiPadPlayer',
				finalScreenID : '#spVideoEndScreen'

			}); // calls the init method

			// INIT FINAL SCREEN
			$('.spWatchVideoAgain')[0].addEventListener('click', function () {
				$('#spReplaceVideo').sponVideoPlayer('replay', 'content');
			}, false);

		} else {
			var spNoFlashPlayer = document.getElementById('spNoFlashPlayer');
			spNoFlashPlayer.innerHTML = 'Dieses Video steht für iPad/iPhone nicht zur Verfügung.';
			spNoFlashPlayer.setAttribute("style", "display:block;");
		}

	} else if (swfobject.getFlashPlayerVersion().major >= 9){

		document.getElementById('sponiPadPlayer').style.display = 'none';

		var referrer = encodeURI(spStripHashParams(document.referrer));
		var url      = encodeURIComponent(spStripHashParams(document.location.href));

		PlayerFlashVars = {
				brand: 				"spon",
				disableHQ :			"true",
				allowAds:			allowAds,
				category:			belegung,
				url:				url,
				referrer:			referrer,
				videoCredit:		credit,
				displayCategoryId:	displaycat,
				videoCategoryId:	videocat,
				videoPath:			server,
				playerTrackingSize:	trackingsize,
				fitVideoToStage:	"true",
				autoplay:			startmod,
				videoid:			videoId,
				videoWidth16x9:		embedWidth,
				videoWidth4x3:		embedWidth / 1.33333,
				videoHeight:		embedHeight,
				jsAdStart:			onAdStart,
				jsAdEnd:			onAdEnd,
				jsVideoEnd:			onVideoEnd,
				jsFinalEnd:			onFinalEnd,
				prerollGateway:		prerollGateway,
				postrollGateway:	postrollGateway
			};
		PlayerFlashVarsRestart = {
				brand: 				"spon",
				disableHQ :			"true",
				allowAds:			allowAds,
				category:			belegung,
				url:				url,
				referrer:			referrer,
				videoCredit:		credit,
				displayCategoryId:	displaycat,
				videoCategoryId:	videocat,
				videoPath:			server,
				playerTrackingSize:	trackingsize,
				fitVideoToStage:	"true",
				autoplay:			startmod,
				videoid:			videoId,
				videoWidth16x9:		embedWidth,
				videoWidth4x3:		embedWidth / 1.33333,
				videoHeight:		embedHeight,
				jsAdStart:			onAdStart,
				jsAdEnd:			onAdEnd,
				jsVideoEnd:			onVideoEnd,
				jsFinalEnd:			onFinalEnd
		};
		PlayerParams = {
			allowScriptAccess:	"always",
			allowFullScreen:	"true",
			wmode:				"opaque",
			menu:				"false",
			bgcolor:			"#000000",
			salign:				"tl"
		};
		
		swfobject.embedSWF("/static/flash/flashvideo/coreFlashPlayer-005.swf", "spReplaceVideo", embedWidth, embedHeight, "10.0.0", "", PlayerFlashVars, PlayerParams);
	} else {
		var spNoFlashPlayer = document.getElementById('spNoFlashPlayer');
		spNoFlashPlayer.setAttribute("style", "display:block;");
	}
}

function spRestartVideo(){
	// Vars wurden von spStartVideo2 gesetzt
	swfobject.embedSWF("/static/flash/flashvideo/coreFlashPlayer-005.swf", "spReplaceVideo", embedWidth, embedHeight, "10.0.0", "", PlayerFlashVarsRestart, PlayerParams);
}

// EndScreen anzeigen || Video erneut abspielen
function spToggleEndScreen(){
	var endScreen = document.getElementById('spVideoEndScreen').style.display;
	if( endScreen == 'none'){
		$("#spVideoEndScreen").fadeIn(300).delay(300);
	}else{
		$("#spVideoEndScreen").fadeOut(300).delay(300);
		return false;
	}
}

function spShowVideoShortUrl(){
	var checkLayers = document.getElementById('spPopupLayerArea').firstChild;
	if(checkLayers != null){
		parent.spClosePopupLayer();
	}
	$("#spVideoShortUrl").fadeIn(300);
	$("#spCloseVideoShortUrl").fadeIn(300);
	return false;
}

function spHideVideoShortUrl(){
	$("#spVideoShortUrl").fadeOut(300);
	$("#spCloseVideoShortUrl").fadeOut(300);
	return false;
}



//Reminder wird vom FlashPlayer aufgerufen
function spOasSetReminder(iframeUrl){
	var iframeUrl = ((typeof iframeUrl != 'undefined' && iframeUrl != '')?(iframeUrl):(false)),
		iFrameTarget = '#spOasReminder';
	
	$(iFrameTarget).removeClass('spCommercial').empty();
	
	if (iframeUrl) {
		$(iFrameTarget).addClass('spCommercial');
		$(iFrameTarget).append('<h5>ANZEIGE</h5>');
		$('<iframe />', {
			src: iframeUrl,
			width: '876',
			height: '50',
			scrolling: 'no',
			frameborder: 0
		}).appendTo(iFrameTarget);

		var iframe = this.parent.document.getElementById("spVideoIframe");
		if (!iframe == false)
			iframe.style.height=document.body.clientHeight+"px";

	}
}
	

// Embedding-Dialog
function spConfigureVideoEmbed(videoId, eingabe){
	try {
		var userWidth			= document.getElementById('spVideoEmbedSourceWidth');
		var userHeight			= document.getElementById('spVideoEmbedSourceHeight');
		var userColorSel		= document.getElementById('spVideoEmbedSourceColorSelect');
		var userColor			= document.getElementById('spVideoEmbedSourceColorInput');
		var userBgColorSel		= document.getElementById('spVideoEmbedSourceBgColorSelect');
		var userBgColor			= document.getElementById('spVideoEmbedSourceBgColorInput');
		var userWidthValue		= userWidth.value;
		var userHeightValue		= userHeight.value;
		var userColorValue		= userColor.value;
		var userBgColorValue	= userBgColor.value;
		var sourceArea          = document.getElementById('spVideoEmbedSourceArea');
		var userSource			= sourceArea.value;
		var errorMsg			= '';
	
		if (userWidthValue < 400 || userWidthValue > 1000 || !userWidthValue.match(/([0-9]){3}$|([0-9]){4}$/)){
			errorMsg = 'Ungültiger Wert!\nBitte geben Sie eine Breite zwischen 400 und 1000 an.';
			userWidth.setAttribute('style', 'color:#900;font-weight:bold;');
		} else if (eingabe == 'breite'){
			userWidth.removeAttribute('style');
			userHeightValue = '' + Math.ceil((userWidthValue * 9 / 16) + 155);
			document.getElementById('spVideoEmbedSourceHeight').value = userHeightValue;
		}
	
		if (userHeightValue < 380 || userHeightValue > 718 || !userHeightValue.match(/([0-9]){3}$|([0-9]){4}$/)){
			errorMsg = 'Ungültiger Wert!\nBitte geben Sie eine Höhe zwischen 380 und 718 an.';
			userHeight.setAttribute('style', 'color:#900;font-weight:bold;');
		} else if (eingabe == 'hoehe'){
			userHeight.removeAttribute('style');
			userWidthValue = '' + Math.floor((userHeightValue - 155) * 16 / 9);
			document.getElementById('spVideoEmbedSourceWidth').value = userWidthValue;
		}
	
		if (eingabe == 'farbeSelect'){
			if (userColorSel.options[1].selected){
				userColorValue = document.getElementById('spVideoEmbedSourceColorSelect').options[1].value;
			}
			if (userColorSel.options[2].selected){
				userColorValue = document.getElementById('spVideoEmbedSourceColorSelect').options[2].value;
			}
			document.getElementById('spVideoEmbedSourceColorInput').value = userColorValue;
		}
	
		if (!userColorValue.match(/^#([0-9A-Fa-f]){3}$|^#([0-9A-Fa-f]){6}$/)){
			errorMsg = 'Ungültiger Wert!\nBitte geben Sie einen gültigen HEX-Wert an.';
			userColor.setAttribute('style', 'color:#900;font-weight:bold;');
		} else if (eingabe == 'farbeInput'){
			userColor.removeAttribute('style');
			document.getElementById('spVideoEmbedSourceColorInput').value = userColorValue;
			if (userColorValue == '#000' || userColorValue == '#000000'){
				document.getElementById('spVideoEmbedSourceColorSelect').options[1].selected = true;
			} else if (userColorValue == '#fff' || userColorValue == '#ffffff'){
				document.getElementById('spVideoEmbedSourceColorSelect').options[2].selected = true;
			} else {
				document.getElementById('spVideoEmbedSourceColorSelect').options[0].selected = true;
			}
		}
	
		if (eingabe == 'farbeBgSelect'){
			if (userBgColorSel.options[1].selected){
				userBgColorValue = document.getElementById('spVideoEmbedSourceBgColorSelect').options[1].value;
			}
			if (userBgColorSel.options[2].selected){
				userBgColorValue = document.getElementById('spVideoEmbedSourceBgColorSelect').options[2].value;
			}
			document.getElementById('spVideoEmbedSourceBgColorInput').value = userBgColorValue;
		}
	
		if (!userBgColorValue.match(/^#([0-9A-Fa-f]){3}$|^#([0-9A-Fa-f]){6}$/)){
			errorMsg = 'Ungültiger Wert!\nBitte geben Sie einen gültigen HEX-Wert an.';
			userBgColor.setAttribute('style', 'color:#900;font-weight:bold;');
		} else if (eingabe == 'farbeBgInput'){
			userBgColor.removeAttribute('style');
			document.getElementById('spVideoEmbedSourceBgColorInput').value = userBgColorValue;
			if (userBgColorValue == '#000' || userBgColorValue == '#000000'){
				document.getElementById('spVideoEmbedSourceBgColorSelect').options[2].selected = true;
			} else if (userBgColorValue == '#fff' || userBgColorValue == '#ffffff'){
				document.getElementById('spVideoEmbedSourceBgColorSelect').options[1].selected = true;
			} else {
				document.getElementById('spVideoEmbedSourceBgColorSelect').options[0].selected = true;
			}
		}
	
		if (errorMsg == ''){
			if (eingabe != 'default' && !document.getElementById('spVideoEmbedSourceBgColorInput').value.match(/^#([Ff]){3}$|^#([Ff]){6}$/)){
				sourceArea.setAttribute('style', 'color:' + userColorValue + ';background:' + userBgColorValue + ';');
			} else if (eingabe != 'default' && document.getElementById('spVideoEmbedSourceBgColorInput').value.match(/^#([Ff]){3}$|^#([Ff]){6}$/).length > 0){
				sourceArea.setAttribute('style', 'color:' + userColorValue + ';');
			}
			userSource = $('#spVideoEmbedSourceArea').val('<iframe width="' + userWidthValue + '" height="' + userHeightValue + '" frameborder="0" scrolling="no" border="0" src="http:/' + '/www.spiegel.de/video/video-' + videoId + '-embed.html#width=' + userWidthValue + '&color=' + userColorValue.substring(1) + '&bgcolor=' + userBgColorValue.substring(1) + '"></iframe>');
		} else {
			userSource = $('#spVideoEmbedSourceArea').val(errorMsg); 
		}

		if (eingabe == 'reset'){
			sourceArea.removeAttribute('style');
			userWidth.removeAttribute('style');
			userHeight.removeAttribute('style');
			userColor.removeAttribute('style');
			userBgColor.removeAttribute('style');
			document.getElementById('spVideoEmbedSourceWidth').value		= 640;
			document.getElementById('spVideoEmbedSourceHeight').value		= 531;
			document.getElementById('spVideoEmbedSourceColorSelect').options[0].selected = true;
			document.getElementById('spVideoEmbedSourceColorInput').value	= '#000000';
			document.getElementById('spVideoEmbedSourceBgColorSelect').options[0].selected = true;
			document.getElementById('spVideoEmbedSourceBgColorInput').value	= '#ffffff';
			userSource = $('#spVideoEmbedSourceArea').val('<iframe width="640" height="531" frameborder="0" scrolling="no" border="0" src="http:/' + '/www.spiegel.de/video/video-' + videoId + '-embed.html#width=640&color=000000&bgcolor=ffffff"></iframe>');
		}
	}
	catch (e) {}
}

function spOpenEmbedForm(assetId){
	var headline = "Dieses Video einbetten";
	var framelocation = "/video/embeddialog-" + assetId + ".html";
	spOpenPopupLayer('spEmbedVideoPopupLayer', headline, framelocation);

	var offset = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
		offset = window.pageYOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		offset = document.body.scrollTop;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		offset = document.documentElement.scrollTop;
	}
	if (offset > 500) scrollTo(0,0);
}

function spDetectVideoContext(action){
	var getSendFormPopup = document.getElementById('spSendFormPopup');
	var SendFormPopupLocation = document.location.href.indexOf("videoversand");
	if(SendFormPopupLocation >= 0 || action == 'byFunction'){
		if(getSendFormPopup.className != 'spSendVideoFormPopup'){
			getSendFormPopup.className = 'spSendVideoFormPopup';
		}
	}
}

function spIpadRemoveVideo(){
	if (navigator.userAgent.indexOf('iPad') > -1){
		var videoTag = document.getElementsByTagName('video')[0];
		if(typeof videoTag == 'object'){
			var srv = document.getElementById('spReplaceVideo');
			srv.setAttribute('style', 'display:none;');
		}
	}
}

function spIpadRemoveOldVideolinks(){
	if (spClientIsIPad()){
		var css = document.styleSheets[0];
		var rule = ".spNoIpadVideo {display:none;}";
		css.insertRule(rule, css.cssRules.length);		
	}
}

function spIpadPlayButtons(){
	if (navigator.userAgent.indexOf('iPad') > -1){
		var btns = document.getElementsByClassName('spIEsixPng');
		for(i=0; i<btns.length; i++){
		   if(btns[i].width == 37 && btns[i].height == 37 && btns[i].style.display != 'block'){
		        btns[i].style.display='block';
		    }
		}
	}
}

/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return }f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return }if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return }}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return }var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in swfobject){swfobject[q]=null}swfobject=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return }var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return }AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();// NaviInit IE6 
function spMainNaviInit() {
	if (document.all && document.getElementById) {
		var spNavContainer = document.getElementById("spChannel");
		var spNavis = spNavContainer.getElementsByTagName('ul');
		for (var i in spNavis) {
			var ul = spNavis[i];
//			wenn 2. Ebene, ...
			if (ul.nodeName == 'UL') {
				var spNavItems = spNavContainer.getElementsByTagName('li');
				for (var j in spNavItems) {
					var li = spNavItems[j];
//					...dann 3. Ebene einblenden, falls vorhanden
					if (li.nodeName == 'LI') {
						li.onmouseover = function() {
//							lazy initialization
							if (! this.spSubNav) {
								var spSubNavTmp = this.getElementsByTagName('ul')[0];
								if (spSubNavTmp && spSubNavTmp.nodeName == 'UL' && spSubNavTmp.className == 'spNaviLevel2')
									this.spSubNav = spSubNavTmp;
							}
							if (this.spSubNav) {
								this.spSubNav.style.display = "block";
							}
						}
						li.onmouseout = function() {
//							lazy initialization
							if (! this.spSubNav) {
								var spSubNavTmp = this.getElementsByTagName('ul')[0];
								if (spSubNavTmp && spSubNavTmp.nodeName == 'UL' && spSubNavTmp.className == 'spNaviLevel2')
									this.spSubNav = spSubNavTmp;
							}
							if (this.spSubNav)
								this.spSubNav.style.display = "none";
						}
					}
				}
			}
		}
	}
}
function spSynchDatumBis(FORM)
{
    if (FORM.suchzeitraum.selectedIndex == 0)
    {
        // Nichts tun
    }
    else
    {                            // - Bis-Datum aus Rollo-Wert errechnen
        FORM.spSearchFromDate.value = getDatumFromKey(FORM.suchzeitraum.options[FORM.suchzeitraum.selectedIndex].value);
        FORM.spSearchToDate.value = getDatumBisKey(FORM.suchzeitraum.options[FORM.suchzeitraum.selectedIndex].value);
        if (FORM.suchzeitraum.options[FORM.suchzeitraum.selectedIndex].value == "all")
        {
            FORM.spSearchToDate.value = "";
        }
    }
}

function spSynchDatumBisInternational(FORM)
{
    if (FORM.suchzeitraum.selectedIndex == 0)
    {
        // Nichts tun
    }
    else
    {                            // - Bis-Datum aus Rollo-Wert errechnen
        FORM.spSearchFromDate.value = getDatumFromKeyInternational(FORM.suchzeitraum.options[FORM.suchzeitraum.selectedIndex].value);
        FORM.spSearchToDate.value = getDatumBisKeyInternational(FORM.suchzeitraum.options[FORM.suchzeitraum.selectedIndex].value);
        if (FORM.suchzeitraum.options[FORM.suchzeitraum.selectedIndex].value == "all")
        {
            FORM.spSearchToDate.value = "";
        }
    }
}


function getDatumBisKey(key)
{
    var ret = "";

    switch (key)
            {
        case ""           : ret = "";             break;
        case "all"      : ret = "";             break;
        case "2005"      : ret = "31.12.2004";     break;
        case "2000"       : ret = "31.12.1999";     break;
        case "1995"     : ret = "31.12.1994";     break;
        case "1990"     : ret = "31.12.1989";     break;
        case "1980"     : ret = "31.12.1979";     break;
        case "1970"     : ret = "31.12.1969";     break;
        case "1960"     : ret = "31.12.1959";     break;
        default           : ret = "";             break; // tt.mm.jjjj
    }

    return ret;
}

function getDatumBisKeyInternational(key)
{
    var ret = "";

    switch (key)
            {
        case ""           : ret = "";             break;
        case "all"      : ret = "";             break;
        case "2005"      : ret = "12/31/2004";     break;
        case "2000"       : ret = "12/31/1999";     break;
        case "1995"     : ret = "12/31/1994";     break;
        case "1990"     : ret = "12/31/1989";     break;
        case "1980"     : ret = "12/31/1979";     break;
        case "1970"     : ret = "12/31/1969";     break;
        case "1960"     : ret = "12/31/1959";     break;
        default           : ret = "";             break; // tt.mm.jjjj
    }

    return ret;
}

function getDatumFromKey(key)
{
    var ret = "";

    switch (key)
            {
        case ""           : ret = "";             break;
        case "week"   : ret = datum7Tage;     break;
        case "month"   : ret = datum30Tage;     break;
        case "year"      : ret = datum1Jahr;     break;
        case "ab2005"      : ret = "01.01.2005";     break;
        default           : ret = "";         break; // tt.mm.jjjj
    }

    return ret;
}

function getDatumFromKeyInternational(key)
{
    var ret = "";

    switch (key)
            {
        case ""           : ret = "";             break;
        case "week"   : ret = datum7TageInternational;     break;
        case "month"   : ret = datum30TageInternational;     break;
        case "year"      : ret = datum1JahrInternational;     break;
        case "ab2005"      : ret = "01/01/2005";     break;
        default           : ret = "";         break; // tt.mm.jjjj
    }

    return ret;
}

//-------------------------------------
//value-Werte fuer DATUM_ROLLO-Optionen
var datumHeute = "";
var datumGestern = "";
var datum7Tage = "";
var datum7TageInternational = "";
var datum30Tage = "";
var datum30TageInternational = "";
var datum90Tage = "";
var datum1Jahr = "";
var datum1JahrInternational = "";
var datum2Jahre = "";
var datum3Jahre = "";

makeValues_Datum_Rollo();
//-------------------------------------


function makeValues_Datum_Rollo()
{
    //      --- option-value-Werte fuer Rollo vb bzw. DATUM_ROLLO
    var dateNow = new Date();                  // Datum-heute, Typ Date
    var milliNow = dateNow.getTime();           // Datum-heute in Millisek. seit Computers Geburt

    var dateX = new Date();                  // Hilfsvar., Typ Date
    var milliX = 0;

    milliX = milliNow - 1000 * 60 * 60 * 24;    // vor 1 Tag: 7Tage*24Std*60min*60sec*1000ms
    dateX.setTime(milliX);                  // Date-Objekt
    datumGestern = date2datumAnzeige(dateX); // 'tt.mm.iijj'

    milliX = milliNow - 1000 * 60 * 60 * 24 * 7;    // vor 7 Tagen: 7Tage*24Std*60min*60sec*1000ms
    dateX.setTime(milliX);                  // Date-Objekt
    datum7Tage = date2datumAnzeige(dateX); // 'tt.mm.iijj'
    datum7TageInternational = date2datumAnzeigeInternational(dateX); // 'tt.mm.iijj'

    milliX = milliNow - 1000 * 60 * 60 * 24 * 30;   // vor 30 Tagen
    dateX.setTime(milliX);                  // Date-Objekt
    datum30Tage = date2datumAnzeige(dateX); // 'tt.mm.iijj'
    datum30TageInternational = date2datumAnzeigeInternational(dateX); // 'tt.mm.iijj'

    milliX = milliNow - 1000 * 60 * 60 * 24 * 90;   // vor 90 Tagen
    dateX.setTime(milliX);                  // Date-Objekt
    datum90Tage = date2datumAnzeige(dateX); // 'tt.mm.iijj'

    var yearNow = dateNow.getYear();    // numer. iijj oder jj
    if (yearNow < 1900)
        yearNow += 1900;                  // num iijj

    var monthNow = dateNow.getMonth() + 1;
    if (monthNow < 10)
        monthNow = "0" + monthNow;        // mm

    var dayNow = dateNow.getDate();
    if (dayNow < 10)
        dayNow = "0" + dayNow;            // tt

    var monthLastYear = "" + monthNow;
    var dayLastYear = "" + dayNow;

    if (monthNow == "02" && dayNow == "29")
    {
        monthLastYear = "03";
        dayLastYear = "01";
    }

    datumHeute = dayNow + "." + monthNow + "." + yearNow;
    datum1Jahr = dayLastYear + "." + monthLastYear + "." + (yearNow - 1);
    datum1JahrInternational = monthLastYear + "/" + dayLastYear + "/" + (yearNow - 1);
    datum2Jahre = dayLastYear + "." + monthLastYear + "." + (yearNow - 2);
    datum3Jahre = dayLastYear + "." + monthLastYear + "." + (yearNow - 3);
}

function date2datumAnzeige(dateObj)

    //      // Rein: Objekt, das mit dateObj = new Date(); def. wurde
    //      // Raus: String 'tt.mm.iijj' fuer FROM/TO_DATE_DISPLAY
{
    var yearDisplay = dateObj.getYear();
    if (yearDisplay < 1900) yearDisplay += 1900;

    var monthDisplay = dateObj.getMonth() + 1;
    if (monthDisplay < 10) monthDisplay = "0" + monthDisplay;

    var dayDisplay = dateObj.getDate();
    if (dayDisplay < 10) dayDisplay = "0" + dayDisplay;

    var dateDisplay = dayDisplay + "." + monthDisplay + "." + yearDisplay;
    return dateDisplay;
}

function date2datumAnzeigeInternational(dateObj)

    //      // Rein: Objekt, das mit dateObj = new Date(); def. wurde
    //      // Raus: String 'tt.mm.iijj' fuer FROM/TO_DATE_DISPLAY
{
    var yearDisplay = dateObj.getYear();
    if (yearDisplay < 1900) yearDisplay += 1900;

    var monthDisplay = dateObj.getMonth() + 1;
    if (monthDisplay < 10) monthDisplay = "0" + monthDisplay;

    var dayDisplay = dateObj.getDate();
    if (dayDisplay < 10) dayDisplay = "0" + dayDisplay;

    var dateDisplay = monthDisplay + "/" + dayDisplay + "/" + yearDisplay;
    return dateDisplay;
}



var spSearchCookie="spSearchCookie";

function spSearchVerifyCookie() {
	var url = document.location + ""
	queryParams = spGetQueryStringParameter(url);
	var offset = queryParams["offset"];
	if (!offset) {
		spSetCookie(spSearchCookie, Array(), null, "/", null, null);
	}
}

function spSearchStoreUrl() {

	var url = document.location + ""
	queryParams = spGetQueryStringParameter(url);
	var pageNumber = queryParams["pageNumber"];
	if (pageNumber && pageNumber != 1)
		url = url.replace("pageNumber=" + pageNumber, "pageNumber=1");

	var offset = queryParams["offset"];
	if (!offset)
		offset=0;

	var cookie=spSearchGetCookie(spSearchCookie);
	
	if (cookie.length <= offset) {
		cookie.push(url);
		spSearchSetCookie(spSearchCookie, cookie, null, "/", null, null);
	}
}

function spSearchGoBack() {
	
	var cookie=spSearchGetCookie(spSearchCookie);
	if (cookie.length > 0) {

		var url = document.location + ""
		queryParams = spGetQueryStringParameter(url);
		var offset = queryParams["offset"];
		if (offset && cookie.length >= offset) {

			backurl=cookie[offset-1];
			document.location.href=backurl;
		}
	}
}

function spSearchDrawBackLink() {
	var cookie=spSearchGetCookie(spSearchCookie);
	if (cookie.length > 0) {
		
	    document.write('<div class="spItemNumber">');
	    document.write('<a href="javascript:spSearchGoBack()" style="font-size:1.4em">');
	    document.write('&#x25C4;');
	    document.write('</a>');
	    document.write('</div>');

	}

}

function spGetQueryStringParameter(queryString) {
	pairs = Array();
	queryString = queryString.substring(queryString.indexOf("?") + 1,
			queryString.length);
	qs = queryString.split("&");
	for (i = 0; i < qs.length; i++) {
		pair = qs[i].split("=");
		if (pair[1])
			pairs[pair[0]] = pair[1];
	}
	return pairs;
}

function spSearchSetCookie(name, cookie, expires, path, domain, secure) {
	if (cookie)
		cookievalue=cookie.join(";");
	else 
		cookievalue=null;
	spSearchSetCookieString(name, cookievalue, expires, path, domain, secure);
}

function spSearchSetCookieString(name, value, expires, path, domain, secure) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime(today.getTime());

	/*
	 if the expires variable is set, make the correct
	 expires time, the current script below will set
	 it for x number of days, to make it for hours,
	 delete * 24, for minutes, delete * 60 * 24
	 */
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date(today.getTime() + (expires));

	document.cookie = name + "=" + escape(value)
			+ ((expires) ? ";expires=" + expires_date.toGMTString() : "")
			+ ((path) ? ";path=" + path : "")
			+ ((domain) ? ";domain=" + domain : "")
			+ ((secure) ? ";secure" : "");
}


function spSearchGetCookie(check_name) {
	var cookie=spSearchGetCookieString(check_name);
	if (!cookie)
		cookie=Array();
	else 
		cookie=cookie.split(";");

	return cookie
}

function spSearchGetCookieString(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split(';');
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for (i = 0; i < a_all_cookies.length; i++) {
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split('=');

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if (cookie_name == check_name) {
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if (a_temp_cookie.length > 1) {
				cookie_value = unescape(a_temp_cookie[1].replace(
						/^\s+|\s+$/g, ''));
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if (!b_cookie_found) {
		return null;
	}
}
 var spTmpImgSetToLoad;
//Muss ausserhalb des spEnhPaginators stehen, da per timeout aufgerufen...
function spLoadDeferImgSet(prefix) {
	for (var i=0; i < spTmpImgSetToLoad.length; i++) {
		var imgElement=document.getElementById(prefix + i);
		if (imgElement != null)
			imgElement.src = spTmpImgSetToLoad[i];
	}
}
var spEnhPaginator = function(paginatorId, imageSets) {
	this.pages=[];
	this.controls=[];
	this.imageSets=imageSets;
	this.completedImageSets=(imageSets != null) ? new Array(imageSets.length) : null;
	this.index=0;
	this.paginatorId=paginatorId;
	this.imageSetToLoad=null;
	this.currentPage=null;
	this.currentControl=null;
	this.initDone=false;
	this.onChangePage=null;
}
spEnhPaginator.prototype = {
		checkInit: function() {
	if (!this.initDone) {
		var container=document.getElementById(this.paginatorId);
		var pagesTmp=container.getElementsByTagName('DIV');
		for (key=0; key < pagesTmp.length; key++) {
			if (pagesTmp[key].className == 'spPaginatorPage') {
				this.pages.push(pagesTmp[key]);
			}
			if (pagesTmp[key].className == 'spPaginatorControl' || pagesTmp[key].className == 'spPaginatorControl spActive') {
				this.controls.push(pagesTmp[key]);
			}
		}
		this.currentPage=this.pages[this.index];
		this.currentControl=this.controls[this.index];
		this.initDone=true;
	}
},
showNext: function(element) {
	this.checkInit();
	var oldIndex = this.index++;
	if (this.index >= this.pages.length)
		this.index = 0;
	if (this.onChangePage != null)
		this.onChangePage(this.pages[oldIndex]);
	this.switchToNewIndex();
},
showPrev: function(element) {
	this.checkInit();
	var oldIndex = this.index--;
	if (this.index < 0)
		this.index = this.pages.length - 1;
	if (this.onChangePage != null)
		this.onChangePage(this.pages[oldIndex]);
	this.switchToNewIndex();
},
showNum: function(element) {
	this.checkInit();
	var oldIndex = this.index;
	this.index = arguments[0];
	if (this.index < 0)
		this.index = this.pages.length - 1;
	if (this.onChangePage != null)
		this.onChangePage(this.pages[oldIndex]);
	this.switchToNewIndex();
},
switchToNewIndex: function(newPage) {
	this.currentPage.style.display='none';
	if (this.currentControl != null)
		this.currentControl.className = 'spPaginatorControl';
	this.currentPage=this.pages[this.index];
	this.currentControl=this.controls[this.index];
	this.currentPage.style.display='block';
	if (this.currentControl != null)
		this.currentControl.className = 'spPaginatorControl spActive';
	this.checkLoadImages();
},
checkLoadImages: function() {
	if (this.imageSets != null) {
		var imageSetIndex=this.index-1;
		if (this.imageSets[imageSetIndex] != null && !this.completedImageSets[imageSetIndex]) {
			spTmpImgSetToLoad=this.imageSets[imageSetIndex];
			window.setTimeout("spLoadDeferImgSet('" + this.paginatorId + imageSetIndex + "')", 20);
			this.completedImageSets[imageSetIndex]=true;
		}
	}
}
}
function spVideoGet(videoId) {
	if (navigator.appName.indexOf("Microsoft") != -1)
		return window[videoId];
	else
		return document[videoId];
}
function spVpPaginatorOnChangePage(element) {
	if (element == null || element.childNodes == null || element.childNodes.length == 0)
		return;
	var node=element.firstChild;
	while (node != null) {
		if (node.nodeName.toUpperCase() == "OBJECT") {
			var v=spVideoGet(node.id);
			if (v != null) {
				try {
					v.stopVideo();
					return;
				}
				catch(e) {
				}
			}
		}
		else if (node.childNodes != null && node.childNodes.length > 0)
			spVpPaginatorOnChangePage(node);
		node=node.nextSibling;
	}
}


function spAutoDbChangeModellMultiInstanz(formularname)
{
	var spHerstellerIndex = document.forms[formularname].hersteller.selectedIndex;
	var spHersteller = document.forms[formularname].hersteller.options[spHerstellerIndex].text;
	
	if(spHerstellerIndex > 0)
	{
		document.forms[formularname].typ.length = spHerstellerModelle[spHersteller].length + 1;			
		document.forms[formularname].typ.options[0].text = "beliebig";
		
		document.forms[formularname].typ.style.color = "#000000";
		document.forms[formularname].typ.style.background = "#ffffff";
		
		for (var i = 1; i < spHerstellerModelle[spHersteller].length + 1; i++) {
			document.forms[formularname].typ.options[i].text = spHerstellerModelle[spHersteller][i-1];
		}
		
		document.forms[formularname].typ.selectedIndex = 0;
		
	} else {
		document.forms[formularname].typ.length = 1;
		document.forms[formularname].typ.options[0].text = "beliebig";
		
		document.forms[formularname].typ.style.color = "#666666";
		document.forms[formularname].typ.style.background = "#f9f9f9";
	}
}

function spAutoDbShowResultMultiInstanz(formularname) {
	document.forms[formularname].submit();
}

function spAutoDbToggleViewMultiInstanz(formularname)
{
	if(document.forms[formularname].spSearchExtended.value == "true") {
		document.getElementById("spDivErweiterteSucheCO2"+formularname).style.display = 'none';
		document.getElementById("spDivErweiterteSucheZeitraum"+formularname).style.display = 'none';
		document.getElementById("spEinblendenSucheErweitert"+formularname).style.display = 'block';
		document.getElementById("spEinblendenSucheKompakt"+formularname).style.display = 'none';			
		document.forms[formularname].spSearchExtended.value = "false";
		document.forms[formularname].co2ausstoss.selectedIndex = 0;
		document.forms[formularname].zeitraum.selectedIndex = 0;
	}
	else {
		document.getElementById("spDivErweiterteSucheCO2"+formularname).style.display = 'block';
		document.getElementById("spDivErweiterteSucheZeitraum"+formularname).style.display = 'block';
		document.getElementById("spEinblendenSucheErweitert"+formularname).style.display = 'none';
		document.getElementById("spEinblendenSucheKompakt"+formularname).style.display = 'block';
		document.forms[formularname].spSearchExtended.value = "true";
	}
}



function spAutoDbSetUserParamsMultiInstanz(formularname) {
	
	if(typeof spAutoDbUserSelection_hersteller != 'undefined') {
		for (var i = 1; i < document.forms[formularname].hersteller.options.length; i++) {
			if(document.forms[formularname].hersteller.options[i].text == spAutoDbUserSelection_hersteller) {
				document.forms[formularname].hersteller.selectedIndex = i;
				spAutoDbChangeModellMultiInstanz(formularname);
			}
		}
	}
	
	if(typeof spAutoDbUserSelection_typ != 'undefined') {
		for (var i = 1; i < document.forms[formularname].typ.options.length; i++) {
			if(document.forms[formularname].typ.options[i].text == spAutoDbUserSelection_typ) {
				document.forms[formularname].typ.selectedIndex = i;
			}
		}
	}


	if(typeof spAutoDbUserSelection_karosserie != 'undefined') {
		for (var i = 1; i < document.forms[formularname].karosserie.options.length; i++) {
			if(document.forms[formularname].karosserie.options[i].text == spAutoDbUserSelection_karosserie) {
				document.forms[formularname].karosserie.selectedIndex = i;
			}
		}
	}

	if(typeof spAutoDbUserSelection_suchbegriff != 'undefined') {
		document.forms[formularname].suchbegriff.value = spAutoDbUserSelection_suchbegriff;
	}
		
	if(typeof spAutoDbUserSelection_co2ausstoss != 'undefined') {
		for (var i = 1; i < document.forms[formularname].co2ausstoss.options.length; i++) {
			if(document.forms[formularname].co2ausstoss.options[i].text == spAutoDbUserSelection_co2ausstoss) {
				document.forms[formularname].co2ausstoss.selectedIndex = i;
			}
		}
	}

	if(typeof spAutoDbUserSelection_zeitraum != 'undefined') {
		for (var i = 1; i < document.forms[formularname].zeitraum.options.length; i++) {
			if(document.forms[formularname].zeitraum.options[i].text == spAutoDbUserSelection_zeitraum) {
				document.forms[formularname].zeitraum.selectedIndex = i;
			}
		}
	}
	
	if(typeof spAutoDbUserSelection_extended != 'undefined') {
		document.forms[formularname].spSearchExtended.value = spAutoDbUserSelection_extended;
	}
}


function spAutoDbInitMultiInstanz(formularname) {
	
	spAutoDbChangeModellMultiInstanz(formularname);

	if(document.getElementsByName('spSearchExtended')[0].value == "true") {
		document.getElementById("spDivErweiterteSucheCO2"+formularname).style.display = 'block';
		document.getElementById("spDivErweiterteSucheZeitraum"+formularname).style.display = 'block';
		document.getElementById("spEinblendenSucheErweitert"+formularname).style.display = 'none';
		document.getElementById("spEinblendenSucheKompakt"+formularname).style.display = 'block';
	}
	
	if(typeof spAutoDbUserSelection_hersteller != 'undefined') {
		spAutoDbSetUserParamsMultiInstanz(formularname);
	}
}
function spVgWortCount(token) {
	document.write('<div style="display:none;"><img src="http://spiegel.met.vgwort.de/na/'+token+'" width="1" height="1" alt="" align="right" /></div>');
}
/**
 * Event handler function tests where the user clicked
 * and acts	according to this
 */
function spMouseUpEvent(e) {
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;

	if (targ.id == "spTopicBoxToggleLink_" + spHpTopicBoxCurrentElement || targ.id == "spTopicBoxToggleLinkMore_" + spHpTopicBoxCurrentElement) {
		spStopMouseEvent();
		return false;
	}
	if (spHpTopicBoxCurrentElement && targ.id == "spSubjectBox_"+spHpTopicBoxCurrentElement) {
		return false;
	}


	var isHpTopicboxDiv = false;
	while(targ != null) {
		if (spHpTopicBoxCurrentElement && targ.id == "spSubjectBox_"+spHpTopicBoxCurrentElement) {
			isHpTopicboxDiv=true;
			break;
		}
		targ = targ.parentNode;
	}

	if (!isHpTopicboxDiv) {
		spHpTopicBoxToggle(spHpTopicBoxCurrentElement, false);
		spStopMouseEvent();
	}
	return false;
}

/**
 * starts EventHandling
 */
function spStartMouseEvent(){
	if (document.addEventListener) { // DOM Level 2 Event Model
		document.addEventListener("mouseup", spMouseUpEvent, true);
	}
	else if (document.attachEvent) { // IE 5+ Event Model
		document.attachEvent("onmouseup", spMouseUpEvent);
	}
	else { // IE 4 Event Model
		document.onmouseup=spMouseUpEvent;
	}
}
/**
 * stops EventHandling
 * spOldHandler is a hack for EI4 Event Model
 */
var spOldHandler = document.onmouseup;	// Eventhandler for EI 4 StopEvent
function spStopMouseEvent() {
//	Unregister the capturing event handlers.
	if (document.removeEventListener) { // DOM Event Model
		document.removeEventListener("mouseup", spMouseUpEvent, true);
	}
	else if (document.detachEvent) { // IE 5+ Event Model
		document.detachEvent("onmouseup", spMouseUpEvent);
	}
	else { // IE 4 Event Model
		document.onmouseup = spOldHandler;
	}
}



/**
 * 
 * @return
 */
var spHpTopicBoxState=false;
function spHpTopicBoxToggle(spElementName) {
	
	if (!spHpTopicBoxState) {
		spHpTopicBoxSetDisplay(spElementName, true);
		spStartMouseEvent();
	}
	else
		spHpTopicBoxSetDisplay(spElementName, false);
}
/**
 * 
 * @param spDisplay
 * @return
 */
var spHpTopicBoxCurrentElement=null;
function spHpTopicBoxSetDisplay(spElementName, spDisplay) {
	
	spHpTopicBoxElement = document.getElementById("spSubjectBox_"+spElementName).style;
	spHpTopicBoxElement.display = (spDisplay ? "block" : "none");
	spHpTopicBoxState=spDisplay;
	spHpTopicBoxCurrentElement=spElementName
}


/**
 * Simple in_array function
 * @param haystack (Array)
 * @param needle (Object)
 * @return
 */
function spInArray(haystack, needle) {
	for (var i in haystack) {
		if (haystack[i] == needle)
			return true;
	}
	return false;
}
function spOpenPopupLayer(classname, headline, framelocation)  {
	var popup = document.getElementById('spPopupLayerArea');
	var html = '<div id="spPopupLayerHeader"><a href="javascript:spClosePopupLayer();"><img src="/static/sys/v9/login/login_close.png" id="spCloseButton" width="20" height="20" alt="Schlie&szlig;en" /><\/a><h1>' + headline + '</h1><\/div>';
	html += '<iframe id="spPopupLayerFrame" src="' + framelocation + '" scrolling="no" frameborder="0"></iframe>';
	html = '<div class="spPLcorTopLeft"></div><div class="spPLcorTopRight"></div><div class="spPLlineLeft"><div class="spPLlineRight"><div class="spPLcontent">' + html + '</div></div></div><div class="spPLcorBottomLeft"></div><div class="spPLcorBottomRight"></div>';
	popup.innerHTML = html;
	popup.className = classname;
}

function spClosePopupLayer()  {
	var popup = document.getElementById('spPopupLayerArea');
	popup.innerHTML = '';
	popup.className = '';
	if (navigator.userAgent.indexOf('iPad') > -1){
		var videoArea = document.getElementById('spReplaceVideo');
		if(typeof videoArea == 'object'){
			videoArea.setAttribute('style', 'display:block;');
		}
	}
}
function spMSisLoggedIn()  {
	return SPONgetCookie('boSession') || (SPONgetCookie('digasnet.cookie.loginname') && SPONgetCookie('digasnet.cookie.passwd'));
}

function spMSLogin(feature, language)  {
	var classname = 'spLoginPopupLayer';

	var headline = '<img src="/static/sys/v9/login/logo_mein_spiegel.png" id="spMSLogo" alt="Mein SPIEGEL" />';
	var framelocation = SpOnENV_SERVER;
	if (language == 'en') {
		framelocation += '/international/login/';
	} else {
		framelocation += '/meinspiegel/';
		language = 'de';
	}

	if (feature != null) {
		var backUrl = framelocation + feature + '.html';
		if ( spMSisLoggedIn() )	{
			top.location.href = backUrl;
		} else {
			framelocation += 'popup.html?feature=' + feature + '&backUrl=' + framelocation + feature + '.html';
			classname = 'spLoginPopupLayer spLoginPopupLayerCentered';
		}
	} else {
		framelocation += 'popup.html?backUrl=' + escape(window.location.href);
	}
	spOpenPopupLayer(classname, headline, framelocation);
}


function spWriteMSLoginLinks()  {
	if ( spMSisLoggedIn() )	{
		document.write('<li><a href="' + SpOnENV_SERVER + '/meinspiegel/logout.html?backUrl=' + escape(window.location.href) + '">Logout<\/a>|<\/li>');
		document.write('<li><a href="' + SpOnENV_SERVER + '/meinspiegel/index.html">Mein SPIEGEL</a>|<\/li>');
		if ( SPONgetCookie('wiWlNumBookmarks') && /^[1-9][0-9]*$/.test(SPONgetCookie('wiWlNumBookmarks')) ) {
			document.write('<li class="spLast"><a href="' + SpOnENV_SERVER + '/meinspiegel/merkliste/index.html">Merkliste (' + SPONgetCookie('wiWlNumBookmarks') + ')<\/a><\/li>');
		} else {
			document.write('<li class="spLast"><a href="' + SpOnENV_SERVER + '/meinspiegel/merkliste/index.html">Merkliste<\/a><\/li>');
		}
	} else {
		document.write('<li><a onclick="spMSLogin(); return false;" href="' + SpOnENV_SERVER + '/meinspiegel/login.html">Login<\/a>|<\/li>');
		document.write('<li class="spLast"><a href="' + SpOnENV_SERVER + '/meinspiegel/artikel/0,1518,703606,00.html">Registrierung<\/a><\/li>');
	}
}
function spOpenSendForm(language, which)  {
	var headline;
	var framelocation;
	if (which == 'sms') {
		headline = 'Per SMS auf den Artikel hinweisen';
		framelocation = 'http://mobil.spiegel.de/follow/sendArticle.do?articleId=/spon/article/mobile/' + parent.spMetadataAssetId;
		spOpenPopupLayer('spSendFormPopupLayer', headline, framelocation);
	}
	else if (which == 'video') {
        framelocation = /*SpOnENV_SERVER + */'/videoversand/index-' + language + '.html';
        if (language == 'en') {
            headline = 'Recommend this video by mail';
        } else {
            headline = 'Dieses Video versenden';
        }
        spOpenPopupLayer('spSendVideoPopupLayer', headline, framelocation);
	}  else {
		framelocation = SpOnENV_SERVER + '/artikelversand/index-' + language + '.html';
		if (language == 'en') {
			headline = 'Send this article';
		} else {
			headline = 'Artikel versenden';
		}
		spOpenPopupLayer('spSendFormPopupLayer', headline, framelocation);
	}

	var offset = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
		offset = window.pageYOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		offset = document.body.scrollTop;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		offset = document.documentElement.scrollTop;
	}
	if (offset > 500) scrollTo(0,0);
}

function spDetectVideoContext(action){
	var getSendFormPopup = document.getElementById('spSendFormPopup');
	var SendFormPopupLocation = document.location.href.indexOf("videoversand");
	var EmbedVideoPopupLocation = document.location.href.indexOf("embeddialog");
	if(SendFormPopupLocation >= 0 || action == 'byFunction'){
		if(getSendFormPopup.className != 'spSendVideoFormPopup'){
			getSendFormPopup.className = 'spSendVideoFormPopup';
		}
	}else if(EmbedVideoPopupLocation >= 0 || action == 'byFunction'){
		if(getSendFormPopup.className != 'spEmbedVideoPopupLayer'){
			getSendFormPopup.className = 'spEmbedVideoPopupLayer';
		}
	}
}

function spSendFormSetAction(form, language)  {
	if (form.action == '') {
		var action = SpOnENV_SERVER + '/artikelversand/';
		if (parent.spMetadataAssetTypeId == '29') {
			action += 'print/d-';
        }
        else if (parent.spMetadataAssetTypeId == '33') {
            action = '/video/send/video-';
            spDetectVideoContext('byFunction');
        }
		else {
			action += 'online/a-';
			var smsversand = document.getElementById('spSendFormSMS');
			if (smsversand != null) {
				smsversand.style.display = 'block';
			}
		}
		action += parent.spMetadataAssetId + '-' + language + '.html';
		form.action = action;
	}
}

function spAutoOpenSendForm(language, which)  {
	try {
		var params=spGetHashParams();
		var sendarticle = params["sp.sendarticle"];
		if (sendarticle == null) return;
	} catch (e) {}
	spOpenSendForm(language, which);
}function spEpubInhaltToggle() {
	document.getElementById('spEpubInhaltHidden').style.display = 'block';
	document.getElementById('spEpubInhaltToggle').style.display = 'none';
}
// alter Aufruf, raus in 3.6, Achtung: noch in Contis
function spShowVideo(a, videoid, category){
	return spOpenVideo(a, videoid);
}

/*** Bug #25704 - Version 3.11 - neuer param "poster" fuer iPad-Videos
 * 	 alter Aufruf spStartVideo(...); kann mit 3.12 entfernt werden
 * 	 vorher muss alles aus ./assetviews/video entcached werden
***/ 
function spStartVideo(videoId, belegung, allowAds, credit, displaycat, videocat, server, trackingsize, startmod, onAdStart, onAdEnd, onVideoEnd, onFinalEnd, embedWidth, embedHeight){
	return spStartVideo2(videoId, '', belegung, allowAds, credit, displaycat, videocat, server, trackingsize, startmod, onAdStart, onAdEnd, onVideoEnd, onFinalEnd, embedWidth, embedHeight);
}
/*!
 * jQuery JavaScript Library v1.6.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu May 12 15:04:36 2011 -0400
 */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!cj[a]){var b=f("<"+a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),c.body.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write("<!doctype><html><body></body></html>");b=cl.createElement(a),cl.body.appendChild(b),d=f.css(b,"display"),c.body.removeChild(ck)}cj[a]=d}return cj[a]}function cu(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function ct(){cq=b}function cs(){setTimeout(ct,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bF.test(a)?d(a,e):b_(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bU,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bQ),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bD(a,b,c){var d=b==="width"?bx:by,e=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return e;f.each(d,function(){c||(e-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?e+=parseFloat(f.css(a,"margin"+this))||0:e-=parseFloat(f.css(a,"border"+this+"Width"))||0});return e}function bn(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bm(a){f.nodeName(a,"input")?bl(a):a.getElementsByTagName&&f.grep(a.getElementsByTagName("input"),bl)}function bl(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bk(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bj(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bi(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bh(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function X(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(S.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function W(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function O(a,b){return(a&&a!=="*"?a+".":"")+b.replace(A,"`").replace(B,"&")}function N(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(y,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function L(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function F(){return!0}function E(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"$1-$2").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function H(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(H,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=d.userAgent,x,y,z,A=Object.prototype.toString,B=Object.prototype.hasOwnProperty,C=Array.prototype.push,D=Array.prototype.slice,E=String.prototype.trim,F=Array.prototype.indexOf,G={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.1",length:0,size:function(){return this.length},toArray:function(){return D.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?C.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),y.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(D.apply(this,arguments),"slice",D.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:C,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;y.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!y){y=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",z,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",z),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&H()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):G[A.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!B.call(a,"constructor")&&!B.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||B.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:E?function(a){return a==null?"":E.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?C.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(F)return F.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=D.call(arguments,2),g=function(){return a.apply(c,f.concat(D.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){G["[object "+b+"]"]=b.toLowerCase()}),x=e.uaMatch(w),x.browser&&(e.browser[x.browser]=!0,e.browser.version=x.version),e.browser.webkit&&(e.browser.safari=!0),j.test("Â ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?z=function(){c.removeEventListener("DOMContentLoaded",z,!1),e.ready()}:c.attachEvent&&(z=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",z),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};f=c.createElement("select"),g=f.appendChild(c.createElement("option")),h=a.getElementsByTagName("input")[0],j={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},h.checked=!0,j.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,j.optDisabled=!g.disabled;try{delete a.test}catch(s){j.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function b(){j.noCloneEvent=!1,a.detachEvent("onclick",b)}),a.cloneNode(!0).fireEvent("onclick")),h=c.createElement("input"),h.value="t",h.setAttribute("type","radio"),j.radioValue=h.value==="t",h.setAttribute("checked","checked"),a.appendChild(h),k=c.createDocumentFragment(),k.appendChild(a.firstChild),j.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",l=c.createElement("body"),m={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};for(q in m)l.style[q]=m[q];l.appendChild(a),b.insertBefore(l,b.firstChild),j.appendChecked=h.checked,j.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,j.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",j.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",n=a.getElementsByTagName("td"),r=n[0].offsetHeight===0,n[0].style.display="",n[1].style.display="none",j.reliableHiddenOffsets=r&&n[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(i=c.createElement("div"),i.style.width="0",i.style.marginRight="0",a.appendChild(i),j.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(i,null)||{marginRight:0}).marginRight,10)||0)===0),l.innerHTML="",b.removeChild(l);if(a.attachEvent)for(q in{submit:1,change:1,focusin:1})p="on"+q,r=p in a,r||(a.setAttribute(p,"return;"),r=typeof a[p]=="function"),j[q+"Bubbles"]=r;return j}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[f.camelCase(c)]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[f.camelCase(c)]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u=/\:/,v,w;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.addClass(a.call(this,b,c.attr("class")||""))});if(a&&typeof a=="string"){var b=(a||"").split(o);for(var c=0,d=this.length;c<d;c++){var e=this[c];if(e.nodeType===1)if(!e.className)e.className=a;else{var g=" "+e.className+" ",h=e.className;for(var i=0,j=b.length;i<j;i++)g.indexOf(" "+b[i]+" ")<0&&(h+=" "+b[i]);e.className=f.trim(h)}}}return this},removeClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a=="string"||a===b){var c=(a||"").split(o);for(var d=0,e=this.length;d<e;d++){var g=this[d];if(g.nodeType===1&&g.className)if(a){var h=(" "+g.className+" ").replace(n," ");for(var i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){var d=f(this);d.toggleClass(a.call(this,c,d.attr("class"),b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;return(e.value||"").replace(p,"")}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);c=j&&f.attrFix[c]||c,i=f.attrHooks[c],i||(!t.test(c)||typeof d!="boolean"&&d!==b&&d.toLowerCase()!==c.toLowerCase()?v&&(f.nodeName(a,"form")||u.test(c))&&(i=v):i=w);if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j)return i.get(a,c);h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);c=i&&f.propFix[c]||c,h=f.propHooks[c];return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),w={get:function(a,c){return a[f.propFix[c]||c]?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=b),a.setAttribute(c,c.toLowerCase()));return c}},f.attrHooks.value={get:function(a,b){if(v&&f.nodeName(a,"button"))return v.get(a,b);return a.value},set:function(a,b,c){if(v&&f.nodeName(a,"button"))return v.set(a,b,c);a.value=b}},f.support.getSetAttribute||(f.attrFix=f.propFix,v=f.attrHooks.name=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var x=Object.prototype.hasOwnProperty,y=/\.(.*)$/,z=/^(?:textarea|input|select)$/i,A=/\./g,B=/ /g,C=/[^\w\s.|`]/g,D=function(a){return a.replace(C,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=E;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=E);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),D).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem
)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,O(a.origType,a.selector),f.extend({},a,{handler:N,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,O(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?F:E):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=F;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=F;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=F,this.stopPropagation()},isDefaultPrevented:E,isPropagationStopped:E,isImmediatePropagationStopped:E};var G=function(a){var b=a.relatedTarget;a.type=a.data;try{if(b&&b!==c&&!b.parentNode)return;while(b&&b!==this)b=b.parentNode;b!==this&&f.event.handle.apply(this,arguments)}catch(d){}},H=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?H:G,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?H:G)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&L("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&L("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var I,J=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},K=function(c){var d=c.target,e,g;if(!!z.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=J(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:K,beforedeactivate:K,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&K.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&K.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",J(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in I)f.event.add(this,c+".specialChange",I[c]);return z.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return z.test(this.nodeName)}},I=f.event.special.change.filters,I.focus=I.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var M={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||E,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=y.exec(h),k="",j&&(k=j[0],h=h.replace(y,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,M[h]?(a.push(M[h]+k),h=h+k):h=(M[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+O(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+O(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var P=/Until$/,Q=/^(?:parents|prevUntil|prevAll)/,R=/,/,S=/^.[^:#\[\.,]*$/,T=Array.prototype.slice,U=f.expr.match.POS,V={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(X(this,a,!1),"not",a)},filter:function(a){return this.pushStack(X(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=U.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=U.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(W(c[0])||W(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=T.call(arguments);P.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!V[a]?f.unique(e):e,(this.length>1||R.test(d))&&Q.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var Y=/ jQuery\d+="(?:\d+|null)"/g,Z=/^\s+/,$=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,_=/<([\w:]+)/,ba=/<tbody/i,bb=/<|&#?\w+;/,bc=/<(?:script|object|embed|option|style)/i,bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Y,""):null;if(typeof a=="string"&&!bc.test(a)&&(f.support.leadingWhitespace||!Z.test(a))&&!bg[(_.exec(a)||["",""])[1].toLowerCase()]){a=a.replace($,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bh(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bn)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bc.test(a[0])&&(f.support.checkClone||!bd.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bj(a,d),e=bk(a),g=bk(d);for(h=0;e[h];++h)bj(e[h],g[h])}if(b){bi(a,d);if(c){e=bk(a),g=bk(d);for(h=0;e[h];++h)bi(e[h],g[h])}}return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||
b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!bb.test(k))k=b.createTextNode(k);else{k=k.replace($,"<$1></$2>");var l=(_.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=ba.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&Z.test(k)&&o.insertBefore(b.createTextNode(Z.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bm(k[i]);else bm(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bo=/alpha\([^)]*\)/i,bp=/opacity=([^)]*)/,bq=/-([a-z])/ig,br=/([A-Z]|^ms)/g,bs=/^-?\d+(?:px)?$/i,bt=/^-?\d/,bu=/^[+\-]=/,bv=/[^+\-\.\de]+/g,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB,bC=function(a,b){return b.toUpperCase()};f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0,widows:!0,orphans:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bu.test(d)&&(d=+d.replace(bv,"")+parseFloat(f.css(a,c))),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bq,bC)}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){a.offsetWidth!==0?e=bD(a,b,d):f.swap(a,bw,function(){e=bD(a,b,d)});if(e<=0){e=bz(a,b,b),e==="0px"&&bB&&(e=bB(a,b,b));if(e!=null)return e===""||e==="auto"?"0px":e}if(e<0||e==null){e=a.style[b];return e===""||e==="auto"?"0px":e}return typeof e=="string"?e:e+"px"}},set:function(a,b){if(!bs.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bp.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bo.test(g)?g.replace(bo,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,c){var d,e,g;c=c.replace(br,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bs.test(d)&&bt.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bE=/%20/g,bF=/\[\]$/,bG=/\r?\n/g,bH=/#.*$/,bI=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bJ=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bK=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bL=/^(?:GET|HEAD)$/,bM=/^\/\//,bN=/\?/,bO=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bP=/^(?:select|textarea)/i,bQ=/\s+/,bR=/([?&])_=[^&]*/,bS=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bT=f.fn.load,bU={},bV={},bW,bX;try{bW=e.href}catch(bY){bW=c.createElement("a"),bW.href="",bW=bW.href}bX=bS.exec(bW.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bT)return bT.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bO,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bP.test(this.nodeName)||bJ.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bG,"\r\n")}}):{name:b.name,value:c.replace(bG,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bW,isLocal:bK.test(bX[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*"+"/"+"*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bZ(bU),ajaxTransport:bZ(bV),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?ca(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=cb(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bI.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bH,"").replace(bM,bX[1]+"/"+"/"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bQ),d.crossDomain==null&&(r=bS.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bX[1]&&r[2]==bX[2]&&(r[3]||(r[1]==="http:"?80:443))==(bX[3]||(bX[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bU,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bL.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bN.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bR,"$1_="+x);d.url=y+(y===d.url?(bN.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", *"+"/"+"*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bV,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bE,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq,cr=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cv(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cm.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=cn.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this),f.isFunction(d.old)&&d.old.call(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=cq||cs(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!co&&(cr?(co=1,g=function(){co&&(cr(g),e.tick())},cr(g)):co=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cq||cs(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){return this[0]?parseFloat(f.css(this[0],d,"padding")):null},f.fn["outer"+c]=function(a){return this[0]?parseFloat(f.css(this[0],d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( event.wheelDelta ) { delta = event.wheelDelta/120; }
    if ( event.detail     ) { delta = -event.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return $.event.handle.apply(this, args);
}

})(jQuery);/*
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var az,Q=this,Y,ak,v,am,T,Z,y,q,aA,aF,av,i,I,h,j,aa,U,aq,X,t,A,ar,af,an,G,l,au,ay,x,aw,aI,f,L,aj=true,P=true,aH=false,k=false,ap=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";aI=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0);function at(aR){var aM,aO,aN,aK,aJ,aQ,aP=false,aL=false;az=aR;if(Y===c){aJ=D.scrollTop();aQ=D.scrollLeft();D.css({overflow:"hidden",padding:0});ak=D.innerWidth()+f;v=D.innerHeight();D.width(ak);Y=b('<div class="jspPane" />').css("padding",aI).append(D.children());am=b('<div class="jspContainer" />').css({width:ak+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aP=az.stickToBottom&&K();aL=az.stickToRight&&B();aK=D.innerWidth()+f!=ak||D.outerHeight()!=v;if(aK){ak=D.innerWidth()+f;v=D.innerHeight();am.css({width:ak+"px",height:v+"px"})}if(!aK&&L==T&&Y.outerHeight()==Z){D.width(ak);return}L=T;Y.css("width","");D.width(ak);am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aR.contentWidth){T=aR.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/ak;q=Z/v;aA=q>1;aF=y>1;if(!(aF||aA)){D.removeClass("jspScrollable");Y.css({top:0,width:am.width()-f});n();E();R();w();ai()}else{D.addClass("jspScrollable");aM=az.maintainPosition&&(I||aa);if(aM){aO=aD();aN=aB()}aG();z();F();if(aM){N(aL?(T-ak):aO,false);M(aP?(Z-v):aN,false)}J();ag();ao();if(az.enableKeyboardNavigation){S()}if(az.clickOnTrack){p()}C();if(az.hijackInternalLinks){m()}}if(az.autoReinitialise&&!aw){aw=setInterval(function(){at(az)},az.autoReinitialiseDelay)}else{if(!az.autoReinitialise&&aw){clearInterval(aw)}}aJ&&D.scrollTop(0)&&M(aJ,false);aQ&&D.scrollLeft(0)&&N(aQ,false);D.trigger("jsp-initialised",[aF||aA])}function aG(){if(aA){am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=am.find(">.jspVerticalBar");aq=U.find(">.jspTrack");av=aq.find(">.jspDrag");if(az.showArrows){ar=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aE(0,-1)).bind("click.jsp",aC);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aE(0,1)).bind("click.jsp",aC);if(az.arrowScrollOnHover){ar.bind("mouseover.jsp",aE(0,-1,ar));af.bind("mouseover.jsp",aE(0,1,af))}al(aq,az.verticalArrowPositions,ar,af)}t=v;am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});av.hover(function(){av.addClass("jspHover")},function(){av.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);av.addClass("jspActive");var s=aJ.pageY-av.position().top;b("html").bind("mousemove.jsp",function(aK){V(aK.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});o()}}function o(){aq.height(t+"px");I=0;X=az.verticalGutter+aq.outerWidth();Y.width(ak-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aF){am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));an=am.find(">.jspHorizontalBar");G=an.find(">.jspTrack");h=G.find(">.jspDrag");if(az.showArrows){ay=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aE(-1,0)).bind("click.jsp",aC);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aE(1,0)).bind("click.jsp",aC);
if(az.arrowScrollOnHover){ay.bind("mouseover.jsp",aE(-1,0,ay));x.bind("mouseover.jsp",aE(1,0,x))}al(G,az.horizontalArrowPositions,ay,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);h.addClass("jspActive");var s=aJ.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aK){W(aK.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});l=am.innerWidth();ah()}}function ah(){am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aF&&aA){var aJ=G.outerHeight(),s=aq.outerWidth();t-=aJ;b(an).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;ak-=aJ;G.parent().append(b('<div class="jspCorner" />').css("width",aJ+"px"));o();ah()}if(aF){Y.width((am.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aF){au=Math.ceil(1/y*l);if(au>az.horizontalDragMaxWidth){au=az.horizontalDragMaxWidth}else{if(au<az.horizontalDragMinWidth){au=az.horizontalDragMinWidth}}h.width(au+"px");j=l-au;ae(aa)}if(aA){A=Math.ceil(1/q*t);if(A>az.verticalDragMaxHeight){A=az.verticalDragMaxHeight}else{if(A<az.verticalDragMinHeight){A=az.verticalDragMinHeight}}av.height(A+"px");i=t-A;ad(I)}}function al(aK,aM,aJ,s){var aO="before",aL="after",aN;if(aM=="os"){aM=/Mac/.test(navigator.platform)?"after":"split"}if(aM==aO){aL=aM}else{if(aM==aL){aO=aM;aN=aJ;aJ=s;s=aN}}aK[aO](aJ)[aL](s)}function aE(aJ,s,aK){return function(){H(aJ,s,this,aK);this.blur();return false}}function H(aM,aL,aP,aO){aP=b(aP).addClass("jspActive");var aN,aK,aJ=true,s=function(){if(aM!==0){Q.scrollByX(aM*az.arrowButtonSpeed)}if(aL!==0){Q.scrollByY(aL*az.arrowButtonSpeed)}aK=setTimeout(s,aJ?az.initialDelay:az.arrowRepeatFreq);aJ=false};s();aN=aO?"mouseout.jsp":"mouseup.jsp";aO=aO||b("html");aO.bind(aN,function(){aP.removeClass("jspActive");aK&&clearTimeout(aK);aK=null;aO.unbind(aN)})}function p(){w();if(aA){aq.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageY-aP.top-I,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageY-aS.top-A/2,aQ=v*az.scrollPagePercent,aR=i*aQ/(Z-v);if(aN<0){if(I-aR>aT){Q.scrollByY(-aQ)}else{V(aT)}}else{if(aN>0){if(I+aR<aT){Q.scrollByY(aQ)}else{V(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}if(aF){G.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageX-aP.left-aa,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageX-aS.left-au/2,aQ=ak*az.scrollPagePercent,aR=j*aQ/(T-ak);if(aN<0){if(aa-aR>aT){Q.scrollByX(-aQ)}else{W(aT)}}else{if(aN>0){if(aa+aR<aT){Q.scrollByX(aQ)}else{W(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(aq){aq.unbind("mousedown.jsp")}}function ax(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");if(av){av.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aJ){if(!aA){return}if(s<0){s=0}else{if(s>i){s=i}}if(aJ===c){aJ=az.animateScroll}if(aJ){Q.animate(av,"top",s,ad)}else{av.css("top",s);ad(s)}}function ad(aJ){if(aJ===c){aJ=av.position().top}am.scrollTop(0);I=aJ;var aM=I===0,aK=I==i,aL=aJ/i,s=-aL*(Z-v);if(aj!=aM||aH!=aK){aj=aM;aH=aK;D.trigger("jsp-arrow-change",[aj,aH,P,k])}u(aM,aK);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aM,aK]).trigger("scroll")}function W(aJ,s){if(!aF){return}if(aJ<0){aJ=0}else{if(aJ>j){aJ=j}}if(s===c){s=az.animateScroll}if(s){Q.animate(h,"left",aJ,ae)
}else{h.css("left",aJ);ae(aJ)}}function ae(aJ){if(aJ===c){aJ=h.position().left}am.scrollTop(0);aa=aJ;var aM=aa===0,aL=aa==j,aK=aJ/j,s=-aK*(T-ak);if(P!=aM||k!=aL){P=aM;k=aL;D.trigger("jsp-arrow-change",[aj,aH,P,k])}r(aM,aL);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aM,aL]).trigger("scroll")}function u(aJ,s){if(az.showArrows){ar[aJ?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aJ,s){if(az.showArrows){ay[aJ?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aJ){var aK=s/(Z-v);V(aK*i,aJ)}function N(aJ,s){var aK=aJ/(T-ak);W(aK*j,s)}function ab(aW,aR,aK){var aO,aL,aM,s=0,aV=0,aJ,aQ,aP,aT,aS,aU;try{aO=b(aW)}catch(aN){return}aL=aO.outerHeight();aM=aO.outerWidth();am.scrollTop(0);am.scrollLeft(0);while(!aO.is(".jspPane")){s+=aO.position().top;aV+=aO.position().left;aO=aO.offsetParent();if(/^body|html$/i.test(aO[0].nodeName)){return}}aJ=aB();aP=aJ+v;if(s<aJ||aR){aS=s-az.verticalGutter}else{if(s+aL>aP){aS=s-v+aL+az.verticalGutter}}if(aS){M(aS,aK)}aQ=aD();aT=aQ+ak;if(aV<aQ||aR){aU=aV-az.horizontalGutter}else{if(aV+aM>aT){aU=aV-ak+aM+az.horizontalGutter}}if(aU){N(aU,aK)}}function aD(){return -Y.position().left}function aB(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aB()<10)}function B(){var s=T-ak;return(s>20)&&(s-aD()<10)}function ag(){am.unbind(ac).bind(ac,function(aM,aN,aL,aJ){var aK=aa,s=I;Q.scrollBy(aL*az.mouseWheelSpeed,-aJ*az.mouseWheelSpeed,false);return aK==aa&&s==I})}function n(){am.unbind(ac)}function aC(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aJ,aL=[];aF&&aL.push(an[0]);aA&&aL.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aO){if(aO.target!==this&&!(aL.length&&b(aO.target).closest(aL).length)){return}var aN=aa,aM=I;switch(aO.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aO.keyCode;aK();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aJ=aO.keyCode==s&&aN!=aa||aM!=I;return !aJ}).bind("keypress.jsp",function(aM){if(aM.keyCode==s){aK()}return !aJ});if(az.hideFocus){D.css("outline","none");if("hideFocus" in am[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in am[0]){D.attr("hideFocus",false)}}function aK(){var aN=aa,aM=I;switch(s){case 40:Q.scrollByY(az.keyboardSpeed,false);break;case 38:Q.scrollByY(-az.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*az.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*az.scrollPagePercent,false);break;case 39:Q.scrollByX(az.keyboardSpeed,false);break;case 37:Q.scrollByX(-az.keyboardSpeed,false);break}aJ=aN!=aa||aM!=I;return aJ}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aL,aJ,aK=escape(location.hash);try{aL=b(aK)}catch(s){return}if(aL.length&&Y.find(aK)){if(am.scrollTop()===0){aJ=setInterval(function(){if(am.scrollTop()>0){ab(aK,true);b(document).scrollTop(am.position().top);clearInterval(aJ)}},50)}else{ab(aK,true);b(document).scrollTop(am.position().top)}}}}function ai(){b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")}function m(){ai();b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack",function(){var s=this.href.split("#"),aJ;if(s.length>1){aJ=s[1];if(aJ.length>0&&Y.find("#"+aJ).length>0){ab("#"+aJ,true);return false}}})}function ao(){var aK,aJ,aM,aL,aN,s=false;am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aO){var aP=aO.originalEvent.touches[0];aK=aD();aJ=aB();aM=aP.pageX;aL=aP.pageY;aN=false;s=true}).bind("touchmove.jsp",function(aR){if(!s){return}var aQ=aR.originalEvent.touches[0],aP=aa,aO=I;Q.scrollTo(aK+aM-aQ.pageX,aJ+aL-aQ.pageY);aN=aN||Math.abs(aM-aQ.pageX)>5||Math.abs(aL-aQ.pageY)>5;
return aP==aa&&aO==I}).bind("touchend.jsp",function(aO){s=false}).bind("click.jsp-touchclick",function(aO){if(aN){aN=false;return false}})}function g(){var s=aB(),aJ=aD();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ap.append(Y.children()));ap.scrollTop(s);ap.scrollLeft(aJ)}b.extend(Q,{reinitialise:function(aJ){aJ=b.extend({},az,aJ);at(aJ)},scrollToElement:function(aK,aJ,s){ab(aK,aJ,s)},scrollTo:function(aK,s,aJ){N(aK,aJ);M(s,aJ)},scrollToX:function(aJ,s){N(aJ,s)},scrollToY:function(s,aJ){M(s,aJ)},scrollToPercentX:function(aJ,s){N(aJ*(T-ak),s)},scrollToPercentY:function(aJ,s){M(aJ*(Z-v),s)},scrollBy:function(aJ,s,aK){Q.scrollByX(aJ,aK);Q.scrollByY(s,aK)},scrollByX:function(s,aK){var aJ=aD()+Math[s<0?"floor":"ceil"](s),aL=aJ/(T-ak);W(aL*j,aK)},scrollByY:function(s,aK){var aJ=aB()+Math[s<0?"floor":"ceil"](s),aL=aJ/(Z-v);V(aL*i,aK)},positionDragX:function(s,aJ){W(s,aJ)},positionDragY:function(aJ,s){V(aJ,s)},animate:function(aJ,aM,s,aL){var aK={};aK[aM]=s;aJ.animate(aK,{duration:az.animateDuration,easing:az.animateEase,queue:false,step:aL})},getContentPositionX:function(){return aD()},getContentPositionY:function(){return aB()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aD()/(T-ak)},getPercentScrolledY:function(){return aB()/(Z-v)},getIsScrollableH:function(){return aF},getIsScrollableV:function(){return aA},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:function(){m()},destroy:function(){g()}});at(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}})(jQuery,this);/**
 * @author trixta
 * @version 1.2
 */
(function($){

var mwheelI = {
			pos: [-260, -260]
		},
	minDif 	= 3,
	doc 	= document,
	root 	= doc.documentElement,
	body 	= doc.body,
	longDelay, shortDelay
;

function unsetPos(){
	if(this === mwheelI.elem){
		mwheelI.pos = [-260, -260];
		mwheelI.elem = false;
		minDif = 3;
	}
}

$.event.special.mwheelIntent = {
	setup: function(){
		var jElm = $(this).bind('mousewheel', $.event.special.mwheelIntent.handler);
		if( this !== doc && this !== root && this !== body ){
			jElm.bind('mouseleave', unsetPos);
		}
		jElm = null;
        return true;
    },
	teardown: function(){
        $(this)
			.unbind('mousewheel', $.event.special.mwheelIntent.handler)
			.unbind('mouseleave', unsetPos)
		;
        return true;
    },
    handler: function(e, d){
		var pos = [e.clientX, e.clientY];
		if( this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif ){
            mwheelI.elem = this;
			mwheelI.pos = pos;
			minDif = 250;
			
			clearTimeout(shortDelay);
			shortDelay = setTimeout(function(){
				minDif = 10;
			}, 200);
			clearTimeout(longDelay);
			longDelay = setTimeout(function(){
				minDif = 3;
			}, 1500);
			e = $.extend({}, e, {type: 'mwheelIntent'});
            return $.event.handle.apply(this, arguments);
		}
    }
};
$.fn.extend({
	mwheelIntent: function(fn) {
		return fn ? this.bind("mwheelIntent", fn) : this.trigger("mwheelIntent");
	},
	
	unmwheelIntent: function(fn) {
		return this.unbind("mwheelIntent", fn);
	}
});

$(function(){
	body = doc.body;
	//assume that document is always scrollable, doesn't hurt if not
	$(doc).bind('mwheelIntent.mwheelIntentDefault', $.noop);
});
})(jQuery);/*** Middle1 ***/
function spSwitchTopAsset() {
	try {
		var topsection	= document.getElementById('spArticleWideTopSection');
		var asset		= document.getElementById('spArticleTopWideAsset');
		var articlecol	= document.getElementById('spArticleColumn');

		var nodes = asset.childNodes;
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var c = node.className;
			if(c && c.toString().indexOf('spXXLPano') > -1){
				node.className = c.replace('spXXLPano', 'spPanoV9');
				node.removeAttribute('style');
			}
		}

		topsection.removeChild(asset);
		articlecol.innerHTML = asset.innerHTML + articlecol.innerHTML;

		window.setTimeout("spArrangeAnchorBoxes()", 250);

		return false;
	}
	catch (e) {}
}

/*** ColumnAd bei zentriertem Layout positionieren ***/
function spMoveAdCol(){
	var checkBody  = $("body").hasClass("spCenteredPage");
	var checkAdCol = $("body").html().indexOf("spColumnAd");
	if(checkBody == true && checkAdCol > -1){
		var superLayer	= $("#spColumnAd").html().indexOf("qcSuperLayer");
		var wrapperPos	= Math.round($("#spWrapper").offset().top);

		if(superLayer > -1){
			$("#spColumnAd").css({'top': '-' + wrapperPos + 'px'});
		}
	}
	$("#spColumnAd").css({'visibility': 'visible', 'z-index': '1'});
}

var spPageLoaded = false;

$(document).ready(function() {
	window.setTimeout("spMoveAdCol()", 250);
	spPageLoaded = true;
});

setTimeout(function() {
	if(!spPageLoaded) {
		$("#spColumnAd").css({'visibility': 'visible', 'z-index': '1'});
	}
}, 5*1000 );
