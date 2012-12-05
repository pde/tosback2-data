/* flash
/*-------------------------------------------------------------------------------*/
var init_Flash = function()
{
	if ($("#wallReplace").length > 0)
	{
		var flashvars = {};
		var qs = swfobject.getQueryParamValue("start");
		if (qs) flashvars.startTile = qs;
		var params = {};
		params.wmode = "opaque";
		var attributes = {};
		attributes.id = "flashId";
		swfobject.embedSWF("flash/wall.swf", "wallReplace", "1300", "520", "10.0.0", "flash/expressInstall.swf", flashvars, params, attributes);
	}
}

/* new window
/*-------------------------------------------------------------------------------*/
var init_newWindow = function()
{
	$("a[rel=external]").attr('target', '_blank');
}


/* new parent
/*-------------------------------------------------------------------------------*/
var init_newParent = function()
{
	$("a[rel=me]").attr('target', '_parent');
}


/* input labelify
/*-------------------------------------------------------------------------------*/
var init_labelify = function()
{
	$(":text").labelify({ replaceEmptyOnly: true }); 
}


/* jcookie
/*-------------------------------------------------------------------------------*/

var init_cookie = function()
{
	var date = new Date();
	date.setTime(date.getTime() + (1 * 60 * 1000 ));

	$('#business').click(function(){ 
		$.cookie('WinSeg', 'business'); 
		//$.cookie('WindstreamSegmentPerm', 'business', {expires:5000}); 
		//$.cookie('DelayRedirect', 'Y', {expires: date}); 
		//$.cookie('OnSite', 'Y', {expires: date});
		//cmCreateElementTag("Business", "Customer type"); 
	});

	$('#residential').click(function(){ 
		$.cookie('WinSeg', 'residential'); 
		//$.cookie('WindstreamSegmentPerm', 'residential', {expires:5000}); 
		//$.cookie('DelayRedirect', 'Y', {expires: date}); 
		//$.cookie('OnSite', 'Y', {expires: date});
		//cmCreateElementTag("Residential", "Customer type");
	});
};


/* jqmodal
/*-------------------------------------------------------------------------------*/

var resetScrollTop = function(hash)
{
	hash.w.show();
	$('html, body').scrollTop(0);
};
var init_jqmodal = function()
{
	$('#locationOffer').jqm({overlay: 70});
	$('#locationOverlay').jqm({trigger: 'a.locationTrigger', modal: true, overlay: 70});
	$('#bundleOverlay').jqm({trigger: 'a.bundleTrigger', overlay: 70, onShow:resetScrollTop});
	$('#chatOverlay').jqm({trigger: 'a.chatTrigger', overlay: 70});
	$('#moversOverlay').jqm({overlay: 70}).jqmShow();
	$('#privacyOverlay').jqm({trigger: 'a.privacyTrigger', overlay: 70});
	$('#promoOverlay').jqm({trigger: 'a.promoTrigger', overlay: 70});
}

 
/* tabs
/*-------------------------------------------------------------------------------*/

var init_tabs = function()
{
	if ($("#tabModule").length > 0)
	{
		$("#tabModule").tabs().tabs();
	}
	if ($("#featureTabs").length > 0)
	{
		$("#featureTabs").tabs({ event: 'mouseover' }).tabs('rotate', 3000);
	}
	if ($("#bundleHero").length > 0)
	{
		$("#bundleHero").tabs({ event: 'mouseover' }).tabs('rotate', 7000);
		$("#bundleHero a").click(function(){
			document.location=$(this).attr("data-url");
			return true;
		});
	}	
	if ($("#businessTabs").length > 0)
	{
		$("#businessTabs").tabs().tabs();
	}
}


/* toggle
/*-------------------------------------------------------------------------------*/

var init_toggle = function()
{
	if ($(".bundleInfo").length > 0)
	{
		$(".bundleInfo").hide();
	
		$("h3.trigger").click(function(e){
			$(this).toggleClass("active").next().slideToggle("fast");
			e.preventDefault();
	});
	}
}


/* accordian
/*-------------------------------------------------------------------------------*/

var init_accordion = function()
{
	$('#bbAccordian').accordion({
		header: '.bbTrigger',
		collapsible: true,
		active: false,
		animated: false
	});
}


/* call center hours
/*-------------------------------------------------------------------------------*/

function setCCHours(stateCode) {
	var strHours = "";
	if(stateCode != "") {
	    switch (stateCode) {
			case "IA":
	        case "MN":
	            strHours = "M-F 8 a.m. - 5 p.m. CT"
	            break;
			case "NE":
				strHours = "M-F 9 a.m. - 6 p.m. ET"
			break;
			case "TX":
				strHours = "M-F 7 a.m. - 8:00 p.m. ET<br />"
				strHours += "\nSat. 8:30 a.m. - 5 p.m. ET";
			break;
			case "NM":
				strHours = "M-F 7 a.m. - 8:00 p.m. ET<br />"
				strHours += "\nSat. 8:30 a.m. - 7 p.m. ET";
			break;
			case "OK":
				strHours = "M-F 7 a.m. - 8:00 p.m. ET<br />"
				strHours += "\nSat. 8:30 a.m. - 7 p.m. ET";
			break;
			default:
				strHours = "M-F 7 a.m. - 7 p.m. ET<br />"
				strHours += "\nSat. 8:30 a.m. - 5 p.m. ET";
			break;
		}
	}
	$('#taCCHours').html(strHours);
}


/* highlight table columns
/*-------------------------------------------------------------------------------*/

function highlight(ele)
	{	
		//alert(document.getElementById(ele.parentNode.parentNode.parentNode.id));
		if(ele != null){
		if(document.getElementById('ame')){
		    var ameHasClassOn = document.getElementById('ame').className.match(new RegExp('(\\s|^)'+ 'on' +'(\\s|$)'));
		    if(ele.id == 'ame') {
		        if (document.getElementById('lpg'))
		            document.getElementById('lpg').style.display = 'block';
		        //if (document.getElementById('3MonFreeImg'))
		        //    document.getElementById('3MonFreeImg').style.display = 'block';
		    }
		    else if( ele.id == '3' || ele.id == '6' || ele.id == '12'){
		        if (ameHasClassOn) {
		            if (document.getElementById('lpg'))
		                document.getElementById('lpg').style.display = 'block';
		        }
		    }
		    else
		    {
		        if (document.getElementById('lpg'))
		            document.getElementById('lpg').style.display = 'none';
		        //if (document.getElementById('3MonFreeImg'))
		        //    document.getElementById('3MonFreeImg').style.display = 'none';
		    }
		}
		if (document.getElementById(ele.parentNode.parentNode.parentNode.id))
		    var oTable = document.getElementById(ele.parentNode.parentNode.parentNode.id);
		var colsCount = oTable.rows.item(0).cells.length;
		var i =0;
		for (i =0; i < colsCount ; i++) //i gets the colIndex
        {
            if (oTable.rows.item(0).cells.item(i) == ele){
                //oTable.rows.item(0).cells.item(i).className = "on";
                highlightCol(i,ele,oTable);
            }
            else
                oTable.rows.item(0).cells.item(i).className += " ";
        }}
}

function highlightCol(colIndex,ele,table)
{
   var rowsCount = table.rows.length;
   var r =0;
   for (r=0; r < rowsCount ; r++) 
   {
        var colsInRow = table.rows.item(r).cells;
        var colsCount = colsInRow.length;
        var j =0;
        for (j=1; j < colsCount ; j++) 
        {
            if(j == colIndex){
				colsInRow.item(j).className = "ctr on";
            }
            else{
                colsInRow.item(j).className = "ctr";
            }
        }
   }
}

function populateText(ctrlID,descEle)
{	
	//alert(descEle);
    if(document.getElementById(ctrlID))
	{
		if (descEle == '3')
			document.getElementById(ctrlID).innerHTML = 'up to 3 Mbps';
		if (descEle == '6')
			document.getElementById(ctrlID).innerHTML = 'up to 6 Mbps';
		if (descEle == '12')
			document.getElementById(ctrlID).innerHTML = 'up to 12 Mbps';
		if (descEle == '120')
			document.getElementById(ctrlID).innerHTML = 'America\'s Top 120'; 
		if (descEle == '200')
			document.getElementById(ctrlID).innerHTML = 'America\'s Top 200';
		if (descEle == '250')
			document.getElementById(ctrlID).innerHTML = 'America\'s Top 250';
		if (descEle == 'ame' || descEle == '100')
			document.getElementById(ctrlID).innerHTML = 'America\'s Everything';
		if (descEle == 'WIN1')
			document.getElementById(ctrlID).innerHTML = 'WIN 1 Package';
		if (descEle == 'WIN2')
			document.getElementById(ctrlID).innerHTML = 'WIN 2 Package';
		if (descEle == 'WIN3')
			document.getElementById(ctrlID).innerHTML = 'WIN 3 Package';
		if (descEle == 'WIN4')
			document.getElementById(ctrlID).innerHTML = 'WIN 4 Package';
		if (descEle == 'WIN5')
			document.getElementById(ctrlID).innerHTML = 'WIN 5 Package';
			
			
		if(document.getElementById("Top120MonthFree"))
			if (descEle != '120')
				document.getElementById("Top120MonthFree").style.display = "none";
			else
				document.getElementById("Top120MonthFree").style.display = "block";

	}
}

function popWin(linkHref){
   
	if(linkHref.toLowerCase().indexOf("chat.html") != -1 )
		window.open(linkHref,'name','width=460,height=400,scrollbars=no');
	else
		window.open(linkHref,'name','width=600,height=400,scrollbars=yes');
}


/* add class
/*-------------------------------------------------------------------------------*/
var init_lastChild = function()
{
	$('div.promoCol4 div.promoCol:last-child').addClass('last');
	$('div.promoCol3 div.promoCol:last-child').addClass('last');
	$('div.promoCol2 div.promoCol:last-child').addClass('last');

}

/* zebra tables
/*-------------------------------------------------------------------------------*/
var init_zebraTables = function()
{
	$('.zebra tr:odd').css('background-color', '#eee');
}


/* init
/*-------------------------------------------------------------------------------*/
$(document).ready(function()
{ 
	init_Flash();
	init_newWindow();
	init_newParent();
	init_cookie();	
	init_jqmodal();
	init_labelify();
	init_tabs();
	init_toggle();
	init_accordion();
	init_lastChild();
	init_zebraTables();
});