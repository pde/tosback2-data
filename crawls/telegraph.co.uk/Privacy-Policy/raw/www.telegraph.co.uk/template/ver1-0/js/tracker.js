/* ------------------------DEV ONLY----------------------------*/
function urlPar(var1){
    var1 = var1.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+var1+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec (window.location.href);
    if (results == null)
	return "";
    else
	return results[1];
}
/* ------------------------------------------------------------*/
function tracker () {
	$("#tmgTracker a").each(function(){
		var curH = $(this).attr("href");
		curH = curH+"?source=olympicnav";
		$(this).attr("href",curH);
	});
    var dateArr = urlPar('dmDate').split(':');
    var serverTime = new Date(dateArr[2],(dateArr[1]-1),dateArr[0]);
    var defaultInterval = 120000;
    var minInterval = 20000;
    var int1, int2, int3, int4;
    var dc1 = 0, dc2, dc3, dc4, postTime = 0;
    var weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    var dayInt = (1000*3600*24);
    var blogSet = false;
    var _this=this;
    var LAPath = "";
    var postDataInt1 = {
	sectionID: '2586',
	elementGroupName: 'tr_stories_01',
	publicationID: '34',
	customFields: 'tagName',
	begin: '2',
	end: '11'
    }
    
    var postDataInt2 = {
	liveEventID: $('#scribbleLiveEventID').val(),
	source: 'webTracker',
	maxPosts: '10',
	since: ''
    }
    var postDataInt3 = {
	sectionID: '2586',
	elementGroupName: 'dontmissout_stories_01',
	publicationID: '34',
	customFields: ['description','eventStartTime','eventStartDate','eventUnitHeadline','paEventId'],
	begin: '2',
	end: '11'
    }
    
    var postDataInt4 = {};
    
    
    function formatDateChars(t) {
	return t<10 ? "0"+t : t;
    }
    tracker.prototype.headlinesRefresh=function() {
	$("#trackerHeadlines li").fadeIn(500);
    }
    function slideIn(elements, y) {
	var l = (elements.length - 1);
	if (l >= 0) {
	    elements[l].css({
		'margin-top' : '-' + y + 'px',
		'opacity' : '0'
	    });
	    elements[l].show().animate({
		'margin-top' : 0,
		'opacity' : 1
	    }, 1000)
	    for ( var s = (l - 1); s >= 0; s--) {
		elements[i].css({
		    'opacity' : '0'
		});
		elements[s].show().animate({
		    'opacity' : 1
		}, 1000);
	    }
	}
    }
    function getData (jsonAddress, postData, onReadyFunc){
	postData.cache = Math.random(10000);
	$.ajax({
	    url : jsonAddress,
	    data : postData,
	    type : 'GET',
	    traditional : true,
	    dataType : 'json',
	    async : true,
	    success : onReadyFunc
	});
    };
    function setInt(path, postData, func, timer,stopInit) {
	if(!stopInit) getData(path, postData, func);
	return setInterval(function() {
	    getData(path, postData, func);
	}, timer);
    }
    function runHeadlines(data) {
	if(data.success){
	    //dc1=data.lastUpdated;
	    var id = "trackerHeadlines",
	    count = 0,
	    breakingNews = false,
	    newListItem;
	    $("#"+id+" li").stop().fadeOut(500, function() {
		$(this).remove();
	    });
	    while(count < data.data.length){
		var content="";
		if(data.data[count].breakingNewsItem && count==0) breakingNews=true;
		var cssClass = (breakingNews && count==0) ? "breaking" : "normal";
		if(data.data[count].customFields[0]) content="<span class='listItemTitle'>"+data.data[count].customFields[0]+"</span>";
		if(data.data[count].url) {
		    content += "<a href='"+data.data[count].url+"?source=olympicnav' target='"+tracker.prototype.target+"'>"+data.data[count].title+"</a>";
		} else {
		    content += '<span>'+data.data[count].title+'</span>';
		}
		newListItem = $('<li />', {
		    html: content,
		    className : cssClass
		});
		$("#"+id).append(newListItem.hide());
		count++;
	    }
	    var cInt = setTimeout(function() {
		_this.headlinesRefresh(breakingNews);
	    }, 500);
	}
    };
    function runDontMiss(data) {
	var id = "dontMiss";
	if (data) {
	    var count = 0,
	    newListItem;
	    currTime = serverTime;
	    $("#"+id+" li").stop().fadeOut(500, function() {
		$(this).remove();
	    });
	    while (count < data.data.length) {
		var itemDateStr = data.data[count].customFields[2].substring(0, 10).split('-'),
		itemDate = new Date(itemDateStr[0], (itemDateStr[1]-1), itemDateStr[2]),
		dateCheck = itemDate - currTime,
		itemDateTime = data.data[count].customFields[2].substring(0,10).replace(/-/g,':') +":"+ data.data[count].customFields[2].substring(11,16);
	
		currTime=itemDate;
		if (dateCheck!=0)
		    (currTime - serverTime == dayInt) ?
		    $("#" + id).append($('<li />', {
			html: "<div>TOMORROW</div>"
		    }).hide().addClass('daySep')) :
		    $("#" + id).append($('<li />', {
			html: "<div>"+weekDays[itemDate.getDay()]+"</div>"
		    }).hide().addClass('daySep'));
		newListItem = $('<li/>', {
		    html : "<div class='colListHead'><div class='colTime'>"
		    + data.data[count].customFields[1] + "</div> "
		    + "<div class='heading'>" + data.data[count].title.toUpperCase() +": "+data.data[count].customFields[0] +"</div>"
		    + " </div><a href=http://"+ window.location.hostname +"/sport/olympics/schedule/?goto="+itemDateTime+"&source=olympicnav&paEventId="+data.data[count].customFields[4]+"&disciplineId="+data.data[count].title+" target='"+tracker.prototype.target+"'>"+data.data[count].customFields[3]+"</a>"
		});
		$("#" + id).append(newListItem.hide());
		count++;
	    }
	    var cInt = setTimeout(function() {
		$("#"+id+" li").fadeIn(500);
	    }, 500);
	}
    };
    function createBlogPost(data, targetId) {
	var icons="";
	var heading = "";
	var newListItem = null;
	if(data.icons) {
	    for(var i=0; i<data.icons.length; i++) {
		var imgName = data.icons[i];
		if(data.type) {
		    if(imgName=='GBGOLD' && (data.type.indexOf("BOLDGOLD"))>-1) imgName +='_g';
		    if(imgName=='GOLDMEDAL' && (data.type.indexOf("BOLDGOLD"))>-1) imgName +='_g';
		}
		icons+="<img src='/template/ver1-0/i/liveArticles/icons/"+imgName+".gif' alt='"+imgName+" icon' />"
	    }
	}
	
	
	
	var pathname = window.location.pathname;
	var videoWidth = "180";
	var videoHeight = "160";
	if( (pathname.indexOf('trackerDesktop.jsp') != -1) ){
	    videoWidth = $(window).width() * 0.92;
	    videoHeight = videoWidth * (360/480);
	}
	data.content = data.content.replace('"></script>','&width=' + videoWidth  + 'px&height=' + videoHeight  + 'px"></script>');	
	
	if (data.heading) heading =  "<h3>"+data.heading+"</h3>";
	var itemHtml = "<div class='colLeft'>" +
	"<div class='timeStamp'>"+data.dateAndTime.substring(11,16)+"</div>" +
	icons +
	"</div>" +
	"<div class='colRight'>" +
	heading +
	data.content +
	"</div>";
	if(targetId) {
	    $(targetId).html(itemHtml);
	} else {
	    newListItem = $('<li />', {
		"html" : itemHtml,
		"class" : "BIGHEADER "+data.type,
		"id" : "tpID"+data.postId
	    });
	    newListItem.find('.timeStamp').click( function(event) {
		window.open(LAPath+'?LAPID=pID'+data.postId, tracker.prototype.target);
	    } );
	    newListItem.find('img').click( function(event) {
		window.open(LAPath+'?LAPID=pID'+data.postId, tracker.prototype.target);
	    } );
	}
	return newListItem;
    }
    function runBlog(data) {
	var topMargin = 0;
	var id = "liveBlog";
	var newItemArray = new Array();
	for (var x in data.posts) {
	    var newListItem = createBlogPost(data.posts[x]);
	    if(!blogSet){
		$("#" + id).append(newListItem);
	    } else {
		$("#" + id).prepend(newListItem.hide())
		topMargin += (newListItem.height());
		newItemArray.push(newListItem);
	    }
	}
	if(data.posts.length < parseInt(postDataInt2.maxPosts,10) && !blogSet && parseInt(data.prevPageNum,10)>-1) {
	    postDataInt2.prevPageNum = data.prevPageNum;
	    getData("/livecontent/loadPosts.spring", postDataInt2, runBlog, true);
	} else {
	    postDataInt2.since = data.since;
	    blogSet=true;
	    slideIn(newItemArray, topMargin);
	}
	
	if(data.edits) 
	    for(var e in data.edits) 
		createBlogPost(data.edits[e], '#tpID'+data.edits[e].postId)
	if(data.deletes) 
	    for(var d in data.deletes)
		$('#tpID'+data.deletes).remove();
	$("#liveBlog .colRight a").each(function(){
		var curH = $(this).attr("href");
		curH = curH+"?source=olympicnav";
		$(this).attr("href",curH);
	});

    }
    var curBlock = "";
    function runLatestResults(data) {
	var id = "latestResults";
	var newElementArr = new Array();
	var topMargin = 0;
    var fullList = ""; 
    var newBlock = false;
	if (data && (data.lastUpdated > dc1)) {
	    var count = 0,
	    newListItem;
	   
	    if(curBlock != ""){
	    	if(curBlock != data.data[count].time){
	    		newBlock = true;
	    		curBlock = data.data[count].time;
	    	}else{
	    		newBlock = false;
	    	}
	    }else{
	    	curBlock = data.data[count].time;
	    }
	    while (count < data.data.length) {
		var timeStamp = new Date(data.data[count].time),
		htmlContent = "";
		if (true) {
		    htmlContent = "<div class='timeStamp'>"+formatDateChars(timeStamp.getHours()) +":"+formatDateChars(timeStamp.getMinutes())+"</div> ";
		    for(var i = 0; i<data.data[count].sportInfo.length; i++) {
			htmlContent += "<h3>"+data.data[count].sportInfo[i].sport+"</h3>";
			if(data.data[count].sportInfo[i].medalEvent) htmlContent+="<img class='medal-symbol' src='/template/ver1-0/i/tracker/medal-symbol.png' alt='Medal Event' />";
			htmlContent += "<div class='eventName'>"+ data.data[count].sportInfo[i].title +"</div>";
			htmlContent += '<table class="eventDetailsTbl" summary="'+data.data[count].sportInfo[i].sport+': '+ data.data[count].sportInfo[i].title +' latest results" cellpadding="0" cellspacing="0">';
			for(var ii = 0; ii<data.data[count].sportInfo[i].eventInfo.length; ii++) {
			    var rowClass = data.data[count].sportInfo[i].eventInfo[ii].countryCode;
			    var resultStr = data.data[count].sportInfo[i].eventInfo[ii].result;
			    if(resultStr == null || (!resultStr)) resultStr="";
			    htmlContent += "<tr class='resultRow "+rowClass+"'>" +
			    "<td class='position'>"+ data.data[count].sportInfo[i].eventInfo[ii].position +"</td>" +
			    "<td class='details'>"+
			    "<span class='name'>"+data.data[count].sportInfo[i].eventInfo[ii].name +"</span>"+
			    "<span class='countryCode'>"+ data.data[count].sportInfo[i].eventInfo[ii].countryCode +"</span>" +
			    "</td>"+
			    "<td class='recordStamp' nowrap='nowrap'>";
    							    
			    if(data.data[count].sportInfo[i].eventInfo[ii].record != null && data.data[count].sportInfo[i].eventInfo[ii].record == 'WR') 
				htmlContent +="<img src='/template/ver1-0/i/tracker/wr.gif' alt='World Record' />";
			    if(data.data[count].sportInfo[i].eventInfo[ii].qualification != null) 
				htmlContent +="<img src='/template/ver1-0/i/tracker/q.gif' alt='Qualified' />";
    									
			    htmlContent += "<td class='result'>"+ resultStr +"</td>"  +
			    "</tr>";						
			}
			htmlContent += "</table>";
		    }
    				    
		}
		newListItem = $('<li />', {
		    html : htmlContent
		});
		fullList = ""+fullList+newListItem.html();		
		if(dc1>0) { //if its the second + run
		    $("#" + id).prepend(newListItem.hide());
		    topMargin+=newListItem.height();
		    newElementArr.push(newListItem);
		} else {
		    $("#" + id).append(newListItem);
		}
		count++;
	    }
	    
		
	    if(fullList != ""||fullList != null){
			if(newBlock == true){
				$("#" + id).fadeOut("fast");
				$("#" + id).html(fullList);
				$("#" + id).fadeIn("fast");
			}else{			
				$("#" + id).html(fullList);				
			}
		}
	}
	
    }

    return {
	init:function(i1,i2,i3,i4,sTime,LAlnk) {
	    var dateArr = sTime.split('-');
	    LAPath = LAlnk
	    if(typeof(i1)!='number' || i1<minInterval) i1 = defaultInterval;
	    if(typeof(i2)!='number' || i2<minInterval) i2 = defaultInterval;
	    if(typeof(i3)!='number' || i3<minInterval) i3 = defaultInterval;
	    if(typeof(i4)!='number' || i4<minInterval) i4 = defaultInterval;
	    if(sTime) serverTime = new Date(dateArr[0],(dateArr[1]-1), dateArr[2]);
	    int1 = setInt("/articles/load.spring", postDataInt1, runHeadlines, i1);
	    int2 = setInt("/livecontent/loadLatestPosts.spring", postDataInt2, runBlog, i2, true);
	    getData("/livecontent/loadPosts.spring", postDataInt2, runBlog, true);
	    int3 = setInt("/articles/load.spring", postDataInt3 ,runDontMiss, i3);
	    int4 = setInt("/olympics/getlatestresults.spring",postDataInt4,runLatestResults, i4);
	}
    }
}

tracker.prototype.target="_blank";

function trackerUI() {
    tracker.prototype.target = "_self";
    var trackerOpen = false;
    var breakingNews = false;

    function infoButton(){
//	$("#trackerCorner").mouseover(function(e){
//	    $(this).mousemove(function(e){
//		$("#trackerInfo").stop(true, true).css("left",e.pageX-110);
//		$("#trackerInfo").stop(true, true).css("top",e.pageY+20);
//	    });
//	    $("#trackerInfo").fadeIn();
//	}).mouseout(function(){
//	    $("#trackerInfo").fadeOut();
//	});
	$(".trackerPop").click(function() {
		dcsMultiTrack("DCS.dcssip",window.location.host,"DCS.dcsuri",window.location.pathname,"WT.ti","pop out","WT.dl","53");

	    var desktopTracker = window.open('/template/ver1-0/templates/fragments/olympics/trackerDesktop.jsp?liveEventID='+$('#scribbleLiveEventID').val(),
		'OlympicsDesktopTracker',
		'width=309, \
		   			 height=540, \
		   			 directories=no, \
		    		 location=no, \
		   			 menubar=no, \
		   			 resizable=yes, \
		   			 scrollbars=no, \
		   			 status=no, \
		   			 toolbar=no');
	    desktopTracker.focus();
	});
    }

    function clickTrack(){
	$(".tmgClick").click(function(){
		
	    $("#tmgTracker").hasClass("halfTrack")
	    ? fullTrack()
	    : halfTrack();
	});
    }
    function fullTrack(){
	trackerOpen=true;
	dcsMultiTrack("DCS.dcssip",window.location.host,"DCS.dcsuri",window.location.pathname,"WT.ti","show more","WT.dl","53");
	$("#tmgTracker").animate({
	    height: 630
	}, 500, function() {
	    $(this).removeClass("halfTrack");
	    $(".tmgClick").text("HIDE");
	    $(".advert").slideDown("quick");
	    $(".topSection").slideDown();
	});
	tickerAni.stop();
	rotateArticles.stop();
	$("#trackerHeadlines li").fadeIn(1000);
    }
    function halfTrack(height){
	trackerOpen=false;
	dcsMultiTrack("DCS.dcssip",window.location.host,"DCS.dcsuri",window.location.pathname,"WT.ti","show less","WT.dl","53");

	$("#tmgTracker").animate({
	    height: 125
	}, 500, function() {
	    $(this).addClass("halfTrack");
	    
	    $(".advert").slideUp("quick", function() {
		$(".tmgClick").text("EXPAND");
	    });
	    $(".topSection").slideUp();
	});
	(breakingNews) ? tickerAni.start() : rotateArticles.start();
    }
    var tickerAni=(function() {
	var tickerInt;
	var flashInt;
	var restartInt;
	var startInt;
	var tickerElement = null;
	var tData = new Array();
	var eIndex;
	var sIndex;

	var cursor = (function() {
	    var cursorInt;
	    var visible="visible";
	    var cursorItem = $('<span />', {
		html : "_",
		className : "cursor"
	    });
	    function toggle() {
		cursorItem.css('visibility', visible);
		(visible=='visible') ? visible='hidden' : visible='visible';
	    }
	    return {
		flash:function(target){
		    clearInterval(cursorInt);
		    target.append(cursorItem);
		    cursorInt=setInterval(toggle,500);
		},
		stop:function() {
		    clearInterval(cursorInt);
		    cursorItem.remove();
		}

	    };
	})();

	function runTicker() {
	    tData[eIndex][0].append(tData[eIndex][1].charAt(sIndex));
	    sIndex++;
	    if(sIndex>tData[eIndex][1].length) {
		eIndex++;
		sIndex=0;
		if(eIndex>=tData.length) {
		    stopTicker();
		    restartInt=setTimeout(function() {
			tickerElement.fadeOut(1000, function() {
			    if(!trackerOpen) restartTicker();
			});
		    },5000);

		}
	    }
	}

	function stopTicker() {
	    clearInterval(startInt);
	    clearInterval(tickerInt);
	    clearInterval(flashInt);
	    clearInterval(restartInt);
	    for(var i=0; i<tData.length;i++) {
		tData[i][0].html(tData[i][1]);
	    }
	}

	function restartTicker() {
	    stopTicker();
	    tickerElement.hide().fadeIn(1000);
	    tickerElement.children().html("");
	    eIndex = 0;
	    sIndex = 0;
	    tickerElement.show();
	    /*cursor.flash(tickerElement.children().eq(0));
			flashInt = setTimeout(function() {
				cursor.stop();
				runTicker();
				tickerInt=setInterval(runTicker, 75);
			}, 4000);*/
	    runTicker();
	    tickerInt=setInterval(runTicker, 75);
	}
	return {
	    start:function(){
		$("#trackerHeadlines li").fadeOut(500);
		clearInterval(startInt)
		startInt=setTimeout(restartTicker,500);
	    },
	    stop:function() {
		stopTicker();
	    },
	    init:function() {
		tickerElement = $("#trackerHeadlines .breaking");
		tData = new Array();
		for(var i=0; i<tickerElement.children().length;i++) {
		    tData.push([tickerElement.children().eq(i), tickerElement.children().eq(i).html()]);

		}
	    }
	};
    })();

    var rotateArticles=(function() {
	var rotateInt;
	function animate() {
	    var h = ($("#trackerHeadlines li:first").height()+8);
	    $("#trackerHeadlines li:first").animate({'margin-top':"-"+h+'px'},1000, function() {
		$(this).appendTo("#trackerHeadlines");
		$(this).css('margin-top', 0);
	    });
	};
	$("#trackerHeadlines").mouseover(function() {
	    rotateArticles.stop();
	});
	$("#trackerHeadlines").mouseout(function() {
	    if(!trackerOpen && !breakingNews) rotateArticles.start();
	});
	return {
	    stop:function() {
		clearInterval(rotateInt);
	    },
	    start:function() {
		$("#trackerHeadlines li").fadeIn(1000);
		clearInterval(rotateInt);
		rotateInt = setInterval(animate, 3000);
	    }
	};
    })();

    function headlinesRefresh(breaking) {
	breakingNews=breaking;
	rotateArticles.stop();
	if(breaking) {
	    tickerAni.init();
	    (trackerOpen) ? $("#trackerHeadlines li").fadeIn(500) : tickerAni.start();
	} else {
	    $("#trackerHeadlines li").fadeIn(500);
	    if (!trackerOpen) rotateArticles.start();
	}
    }
    tracker.prototype.headlinesRefresh=headlinesRefresh;
    clickTrack();
    infoButton();
}
trackerUI.prototype = new tracker;

