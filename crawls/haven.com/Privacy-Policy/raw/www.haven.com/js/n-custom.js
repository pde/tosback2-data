/* The "n-custom.js" is a combination of (ParksAnimation.js) & (Calendar.js) added for Haven Optimization on 24th November 2010 */


/* THIS IS "ParksAnimation.js" added on 24/11/2010 for HAVEN OPTIMIZATION starts here ****/

      var isHighLightsOpen  = true;
      var initState = true;
      var takeATourInitHTML = "";
      var animCarouselFlag = false;
      var urlPathNameParks = window.location.pathname;
      var urlHostName=window.location.host;
//debugger;
      
      $(document).ready(function() {
      //document.execCommand("BackgroundImageCache",false,true);
     /* for left menu highlighting fix done at onsite on 11/01/11*/
     $("span.hghBgColor + div").css('display','block');
     
     loadTour();
      
      fillParksDropDown();
      ThickboxBoxInit_AskQuesionHeader();
      newsletterInitialState();
    //  setCentreLadyCss();
    
    
    /* for header menu "ask a question button" change done at offshore on 22/02/2011 */
    ThickboxBoxInit_HeadAskAQ();
    
      /*** Low graphics version ************/
      if((querySt("LowGraphics") != null) && (strTrim(querySt("LowGraphics")) == "Y"))
      {
      	SetCookie("LowGraphics","Y",1,"/")
      }
      
      if((querySt("LowGraphics") != null) && (strTrim(querySt("LowGraphics")) == "N"))
      {
      	deleteCookie("LowGraphics", "/")
      	
      }      
      
      
      if(strTrim(getCookie("LowGraphics")) == "Y")
      {
      //Low grpahics option
      $("#headingContainer").css("margin-top", "0px");
      $("#imageContainerHolder").css("display", "none");
      $("#imageContainer").css("display", "none");
      $("#banner-parks").css("display", "none");
     
      
      };
      
      
      
      
      
      
      /*************************************/
      
/****************Setting initial positon of the news letter divs ************/
          $('#newsLetterHome3').hide();
          $('#newsLetterHome1').hide();
/***************Setting initial positon of the news letter divs**************/

          

/***************partially opening take a tour *******************************/
    $('div.takeAtourArea').css('left' , '532px');
    var imgHighLightLink1 = document.getElementById('imgHighlightsLink');
    if (imgHighLightLink1 != null)
     {
      imgHighLightLink1.src = "/Images/Navigation/highlights_v.gif";
     }
/****************************************************************************/
     
/***************Load Our Park Map in Our Park Page*****************************************/
       
               $('div.regionMapOurParks').load("/ParksMap/InsideParksMap.html", mapLoaded);
               $('div.regionMapOurParksPHC').load("/ParksMap/InsidePHCParksMap.html", mapLoaded);
               $('div.regionMapOurParksMulti').load("/ParksMap/InsideParksMapMulti.html", mapLoadedMulti);

/***************Load Our Park Map*****************************************/



/***************Overriding the variour href default behavoiur ***************/
            

             bindNewsLetter();  
		
            //Binding Holiday Finder Checkboxes
	                 $(".holidayFinderActivityDiv :checkbox").bind("click", activitySelectionChanged);
	                
	                //chenging map selection for page refresh
	                activitySelectionChanged();
	                
	                
	                //Holiday Finder results
	                 var parksToShow = querySt("ShowParks");
	                 if (parksToShow != null)
	                  { 
	                    
	                    $(".textContainerHolidayAreas").addClass("hiddenDiv"); 
	                    showSelectedParks(parksToShow);
              }
             
              
	   var tempHTML = $("#footerbottomlinks ul").html();
	  
	   if(strTrim(getCookie("LowGraphics")) == "Y")
	    {
	      //Normal graphics Link
	      $("#footerbottomlinks ul").html("<li><a href=\"?LowGraphics=N\" rel=\"nofollow\">Graphics Version</a>" + tempHTML);
	    }
	   else
	   {
	     $("#footerbottomlinks ul").html("<li><a href=\"?LowGraphics=Y\" rel=\"nofollow\">Low Graphics Version</a>" + tempHTML);	
	   }  

	  
	    
	  
	   
	   var pcode = strTrim($("#CurrentParkCode").html());
	   
	   if (pcode != null && pcode != 'undefined' && pcode != '')
	   {
	   $(".homepageSelectBoxPark").val(pcode);
	   }
	   
	   
	   var rcode = strTrim($("#CurrentRegionCode").html());
	   
	   if (rcode != null && rcode != 'undefined' && rcode != '')
	   {
	   $(".homepageSelectBoxWide").val(rcode);
	   }
	   
         });
  
/**************************************************************************/
//Pushing map image to background ***************************************/
function mapLoaded()
{
  var defaultMapimage = $("#ukmapInside").attr("src");
  
  if ((defaultMapimage != null) && (defaultMapimage != ""))
  {
    $('#map_insideParks').css("background-image", "url('" + defaultMapimage + "')");
    $('#map_insideParks').css("background-repeat", "no-repeat");
  } 
  
}

function mapLoadedMulti()
{
  var defaultMapimage = $("#ukmapInside").attr("src");
  
  if ((defaultMapimage != null) && (defaultMapimage != ""))
  {
    $('#map_insideParks').css("background-image", "url('" + defaultMapimage + "')");
    $('#map_insideParks').css("background-repeat", "no-repeat");
  } 
  
  displaySelectedParks();
}
/***************Overriding the variour href default behavoiur ***************/
      
    
    

    function activateHighlight()
    {
       
            /*  - Change button should still be clickable to open the take a tour*/
      var imgHighLightLink = document.getElementById('imgHighlightsLink');
      var imgTakeATourLink = document.getElementById('imgTakeAtourLink');
      if ((typeof(imgHighLightLink) !='undefined') && (typeof(imgHighLightLink) !='imgTakeATourLink') )
       {
        imgHighLightLink.src = "/Images/Navigation/highlights_v.gif";
        
       }
       
       stopHighlightsAmin();
    }

      
/*****************  Cross Fade --  Highlights - Start    *********************/
$(document).ready(function() {
  // Start Animation
  //Loading background image
  
  var defaultimage = $(".defaultMainImage").attr("src");
  var defaultimageTitle = $(".defaultMainImage").attr("title");
  var defaultimageAlt = $(".defaultMainImage").attr("alt");
  
  if ((defaultimage != null) && (defaultimage != ""))
  {
    $('div.highlightsMainImage').css("background-image", "url('" + defaultimage + "')");
    $('div.highlightsMainImage').attr("title",defaultimageTitle);
    $('div.highlightsMainImage').attr("alt",defaultimageAlt);
    
        $('#banner-life').css("background-image", "url('" + defaultimage + "')");
    $('#banner-life').attr("title",defaultimageTitle);
  } 
  
  OurParksTabHovering();
  
  /*added by offshore on 21/02/2011 starts here*/
  
  /*check the primary menu on hover highlight state set in AvailANdBook User control level*/
                  //alert(typeof megaNavState);
                  
                  if (typeof megaNavState != 'undefined')
                  {
                  if(megaNavState == '0')
                  {                
			/*$("DIV#divNavArea1").css("display", "none");
			$("DIV#divNavArea2").css("display", "none");
			$("DIV#divNavArea3").css("display", "none");*/
			$("DIV#divNavArea1").remove();
			$("DIV#divNavArea2").remove();
			$("DIV#divNavArea3").remove();
			$("DIV#topNavCover").remove();
			
                  }
                  }
        
  /*added by offshore on 21/02/2011 ends here*/
  OnHoverFadingEffect();
  
  animCarouselFlag = true;
        
  if(strTrim(getCookie("LowGraphics")) != "Y")
  {
    if((querySt("show") != null) && (strTrim(querySt("show")) == "tour"))
          {
        	  stopHighlightsAmin();
        	  loadTour();
        	  //hideOtherTabsForTakeATour();
      }
      
      else if((querySt("show") != null) && (strTrim(querySt("show")) == "PlacesToVisit"))
      {
      stopHighlightsAmin(); 
     
      
        loadOffThePark();
  	hideOtherTabsforPlacesToVisit();
      }
      else if((querySt("show") != null) && (strTrim(querySt("show")) == "finder"))
      {
      
        stopHighlightsAmin();
        displayHolidayFinder();
        hideOtherTabsforHolidayFinder();
       
      }
      else
      {
      
      
                /*check the highlight state set in AvailANdBook User control level*/
                //alert(typeof highlightsState);
                if (typeof highlightsState != 'undefined')
                {
                if(highlightsState == '1')
                {
                	loadHighights();
                }
                }
      }
  } 
  /*functions added by offshore on 07/01/2011 starts here */
  $("DIV#rhs_HolidayFinder A").attr("href", "#step1");
  $("DIV#rhs_HolidayFinder A").click(function(ev)
    {
   
    //ev.preventDefault();
    stopHighlightsAmin();  
  displayHolidayFinder();
  hideOtherTabsforHolidayFinder();
    
  });
  /*functions added by offshore on 07/01/2011 ends here */
  specialOffersPeelOpenClose();
  
  $("DIV#rhs_PlacesToVisit A").attr("href", "#");
    $("DIV#rhs_PlacesToVisit A").click(function(ev)
    {
   
    //ev.preventDefault();
    stopHighlightsAmin();  
  loadOffThePark();
  hideOtherTabsforPlacesToVisit();
    
  });
  //primaryMenuTabTracking();
  var n = $("#findOutMoreBox").length;
  
  if(n <= 0)
  {
  $("A#findMoreBoxOpen").remove();
  }
  
  
  //alert($("DIV.bannerNav UL LI.menuouter").length);
  
  /* added by offshore on 10/11/2010 for the infopane issue starts here */
  //if ($("DIV.bannerNav UL LI.menuouter").length == 0)
  //{
 // $("DIV.bannerNav UL LI#menutop").remove();
//  $("DIV.bannerNav UL LI#menubottom").remove();
  //$("DIV.bannerNav UL").remove();
  //}
  /* added by offshore on 10/11/2010 for the infopane issue ends here */
  
  /* added by offshore on 30/11/2010 starts here */
  var pageHash = window.location.hash;
  //alert(topHash);
  pageHash = pageHash.replace("#", "");
  //alert(pageHash);
var pageHashResult = pageHash.match("PV");
if (pageHash == "PlacesToVisitStep1" || pageHashResult == "PV")
{
//alert('loading js');
//$(".bannerNav UL LI A#offThePark_over").click();
loadOffTheParkJSCSS();
hideOtherTabsforPlacesToVisitNew();
}
/* added by offshore on 30/11/2010 ends here */

/* added by offshore on 08/03/2011 starts here for PTV link */
$("DIV.holidayText A").each(function(i)
{
var ptvStep1 = $(this).attr("href");
var ptvStep1 = ptvStep1.replace("#", "");
if (ptvStep1 ==  "PlacesToVisitStep1")
{
$(this).addClass("ptvLinkStyle");
$(this).click(function(ev){

loadOffTheParkJSCSS();
hideOtherTabsforPlacesToVisitNew();
$("html").animate({ scrollTop: 0 }, "fast");
});
}
});

$("DIV.holidayTextLarge A").each(function(i)
{
var ptvStep1 = $(this).attr("href");
var ptvStep1 = ptvStep1.replace("#", "");
if (ptvStep1 ==  "PlacesToVisitStep1")
{
$(this).addClass("ptvLinkStyle");
$(this).click(function(ev){

loadOffTheParkJSCSS();
hideOtherTabsforPlacesToVisitNew();
$("html").animate({ scrollTop: 0 }, "fast");
});
}
});

/* added by offshore on 08/03/2011 ends here for PTV link */


/* added by offshore on 17/03/2011 starts here for Shwo me where link */
$("A.showMeWhereLinkOverlay").each(function(i)
{
$(this).click(function(ev){
var contentElement = $(this).closest("div.tabFree").find("div.headingCont h3").html();
//alert(contentElement.indexOf('href'));
if(contentElement.indexOf('href') >=0)
	contentElement = $(this).closest("div.tabFree").find("div.headingCont h3 a").html();
contentElement = contentElement.replace('*','');

WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=ShowMeWhere&action='+contentElement);

});
});
/* added by offshore on 17/03/2011 ends here for Shwo me where link */


var pageHashResultHFStep1 = pageHash.match("Interactive");
var pageHashResultHFResult = pageHash.match("Result");
var pageHashResultHFCompare = pageHash.match("Compare");
var pageHashResultHFPaging = pageHash.match("HFpNum");
if (pageHashResultHFStep1 == "Interactive" || pageHashResultHFResult == "Result" ||  pageHashResultHFCompare == "Compare" || pageHashResultHFPaging == "HFpNum")
{

loadHolidayFinderJSCSS();
hideOtherTabsforHolidayFinder();
$("#banner-finder").show();
}
  
});

/*functions added by offshore on 07/01/2011 starts here */
function hideOtherTabsforHolidayFinder()
{
$("#banner-highlights").hide();
$("DIV.highlightsMainImage").hide();
$("#banner-gallery").hide();
$("#banner-video").hide();
$("#banner-finder").hide();
$("#banner-tour").hide();
$("#banner-life").hide();
$("#banner-360view").hide();
$("#banner-map").hide();
$("DIV#divParkLogo").hide();
$("#banner-offThePark").show();

activateSelectedTab("finder");
}


function displayHolidayFinder()
{



var holidayFinderPath = $('#ParkFinderPath').html();
//$("#banner-finder").load(strTrim(holidayFinderPath));
$("#finderStep1").show();
$("#finderStep1a").html("");
$("#finderResult").html("");


}
/*functions added by offshore on 07/01/2011 ends here */

function hideOtherTabsforPlacesToVisit()
{
$("DIV.interactiveBanner DIV").hide();
  $("#banner-offThePark").show();
  $("DIV.OffTheParkBottomContent").show();
  var releaseImg1 = $("IMG.active-png").attr("src");          
  releaseImg1 = releaseImg1.replace("_on.png","_off.png");          
  $("IMG.active-png").attr("src", releaseImg1);
  //$(".bannerNav UL").find("IMG.active-png").attr("src").replace("_on.png","_off.png");
  $(".bannerNav UL LI A IMG").removeClass("active-png");
  $(".bannerNav UL LI A IMG").addClass("rollover-png");  
  var changeImageNew = $("A#offThePark > IMG").attr("src");   
  changeImageNew = changeImageNew.replace("_off.png","_on.png");    
$("A#offThePark > IMG").attr("src", changeImageNew);
$("A#offThePark > IMG").removeClass("rollover-png");
$("A#offThePark > IMG").addClass("active-png");
}

function hideOtherTabsforPlacesToVisitNew()
{
$("#banner-highlights").hide();
$("DIV.highlightsMainImage").hide();
$("#banner-gallery").hide();
$("#banner-video").hide();
$("#banner-finder").hide();
$("#banner-tour").hide();
$("#banner-life").hide();
$("#banner-360view").hide();
$("#banner-map").hide();
$("DIV#divParkLogo").hide();
$("#banner-offThePark").show(); 
activateSelectedTab("offThePark");
}

function activateSelectedTab(tabId)
{
//alert("hi");
//debugger;
//var marginTop = $(".menuitemactive").css('margin-top');
//$(".menuitemactive").css('margin-top',parseInt(marginTop) + parseInt(5));
$("LI.menuitemactive").find("IMG.divider").attr("src","/Images/NonTridion/imagenav/divider.gif");
$("LI.menuitemactive").find("IMG.divider").attr("style","margin-left:0px");
$("LI.menuitemactive").find("A.menuitem_over_active").addClass("menuitem_over");
$("LI.menuitemactive").find("A.menuitem_over_active").removeClass("menuitem_over_active");
$('A.menuitem > IMG').each(function(index) 
				{
				var releaseImg = $(this).attr("src");
				releaseImg = releaseImg.replace("_ON","_OFF");
								
				$(this).attr("src", releaseImg);
				
				});
$("IMG.divider").css("display", "block");			
$("A.menuitem").parent("LI").removeClass("menuitemactive");
$("A.menuitem_over").removeClass("menuitem_over_active");
var changeImage = $("A#" + tabId + " > IMG").attr("src");
//alert(changeImage);
changeImage = changeImage.replace("_OFF","_ON");
changeImage = changeImage.replace("_OVER","_ON");

$("A#" + tabId + " > IMG").attr("src", changeImage);
	
$("A#" + tabId).parent("LI").addClass("menuitemactive");
$("A#" + tabId+"_over").addClass("menuitem_over_active");
$("A#" + tabId+"_over").removeClass("menuitem_over");
//var marginTop = $(".menuitemactive").css('margin-top');
//$(".menuitemactive").css('margin-top',parseInt(marginTop) - parseInt(5));
		
$("LI.menuitemactive").find("IMG.divider").attr("src","/Images/NonTridion/imagenav/halfdivider.gif");
$("LI.menuitemactive").find("IMG.divider").attr("style","margin-left:12px");
var menulength = $('.bannerNav ul > li').length - 2;
$("#menu"+menulength+ " .divider").css('display','none');
}

var animationTime = 3000;
var stayTime = 1000;
var counter = 0;
var maxCount = 0;
var highlightsCarliArray;

var highlightsCarli;
var carouselType;

function hideOtherTabsForTakeATour()
{
$("DIV.interactiveBanner DIV").hide();
  $("#banner-tour").show();  
  var releaseImg1 = $("IMG.active-png").attr("src");  				
  releaseImg1 = releaseImg1.replace("_on.png","_off.png");  				
  $("IMG.active-png").attr("src", releaseImg1);
  
  $(".bannerNav UL LI A IMG").removeClass("active-png");
  $(".bannerNav UL LI A IMG").addClass("rollover-png");  
  var changeImageNew = $("A#tour > IMG").attr("src");		
  changeImageNew = changeImageNew.replace("_off.png","_on.png");		
$("A#tour > IMG").attr("src", changeImageNew);
$("A#tour > IMG").removeClass("rollover-png");
$("A#tour > IMG").addClass("active-png");
}

function startCarousel()
{
$("DIV.highlightsMainImage").show();
  stopHighlightsAmin(); 
   maxCount = 0;
   counter = 0;
   animCarouselFlag = true;
   $("#carouselTempImg").remove();
   
   if(highlightsState == '1')
   	loadHighights();
   
}


var parkFolderName = "DevonCiffs";


function loadHighights()
{
carouselType = $("#carouselType").val();

  
  if (maxCount == 0)
  {
  
    $(".highlightsMainImageFrameTemp").html('');  
            
    var carouselHtml = $("#HighlightsCarousel #Carouselhtml").html();
	


    if (carouselHtml != null)
    {
      carouselHtml = strTrim(carouselHtml);
      //replacing temp classes to real required classes
      carouselHtml = carouselHtml.replace(/highlightsMainImageFrameTemp/gi, "highlightsMainImageFrame");
      //$('div.highlightsMainImage').html("<a id='carouselLink' href='#'>"+carouselHtml+"</a>");
      $('div.highlightsMainImage').html(carouselHtml);
      //$('div.highlightsMainImageFrame').html('<img class="CarouseTransperentImage" src="/Images/NonTridion/carousel_transparent.png" width="718px" height="330px" usemap="#offerImageMap"/>');
      highlightsCarliArray = $("#HighlightsCarousel").find("li a");
      
      highlightsCarli = $("#HighlightsCarousel").find("li");
      maxCount = highlightsCarliArray.length;
      if($("#carouselTempImg").html() == null)
      {
        var temphtml = $("#HighlightsCarousel #Carouselhtml").html();
        $("#HighlightsCarousel #Carouselhtml").html(temphtml + "<div id=\"carouselTempImg\">test</div>");
      }
      $('div.highlightsMainImageFrameTemp').css('opacity', 0);
      
    }
     
  }
  
  
  counter = counter + 1;
  if ((counter > maxCount) && (maxCount > 0))
   { 
   if (carouselType == "linear")
   {
   animCarouselFlag = false;
   }
   else
   {
   animCarouselFlag = true;
   }
     counter = 1;
   }

   if((animCarouselFlag == true) && maxCount > 0)
   {
     
     var newFileNameArray = new Array();
     var imgName = '';
    var fileName= highlightsCarliArray[counter-1].href;   //getting the carousel image path 
    var titleValue = highlightsCarliArray[counter-1].title;   //getting the carousel title
    if (fileName.match('/') != null && fileName.match('/')[0] != null && fileName.match('/').index >= 0)
    {
    newFileNameArray = fileName.split("/");
    imgName = newFileNameArray[newFileNameArray.length-1];
    }
    else
    {
    imgName = fileName;
    }
    
    
   
   var carouseLinkType = highlightsCarli[counter-1].title;
  //debugger;
   if (carouseLinkType == "MapArea")
   {
   
   $('div.highlightsMainImageFrame').css("cursor", "auto");
   $('div.highlightsMainImageFrame').unbind("click");
   $('div.highlightsMainImageFrame').html('<img src="/Images/NonTridion/carousel_transparent.png" width="718" height="330"/>');
   var mapHTML = $(highlightsCarli[counter-1]).find("map").html();
   //var mapHTML = highlightsCarMapArray[counter-1].innerHTML;
   //alert(mapHTML);
   if (mapHTML != '')
   {
   document.getElementById('offerImageMap').innerHTML = '';
   document.getElementById('offerImageMap').innerHTML = mapHTML;  // added for setting MAP Area html for each image on 18/07/2011
   $("div.highlightsMainImageFrame IMG").attr("usemap", "#offerImageMap")
   }
   else
   {
   $("div.highlightsMainImageFrame").html("");
   }
   }
   else
   {
   $('div.highlightsMainImageFrame').html('');
   var linkValue = highlightsCarliArray[counter-1].rel;
   //alert(linkValue);
  if (linkValue != '')
   {
   $('div.highlightsMainImageFrame').css("cursor", "pointer");
   $('div.highlightsMainImageFrame').bind("click", function(){window.location.href=linkValue;});
   }
   else
   {
   $('div.highlightsMainImageFrame').css("cursor", "auto");
   $('div.highlightsMainImageFrame').unbind("click");
   }
   }
   
   
   
    $('div.highlightsMainImageFrame').css('opacity', 0);
    //$('div.highlightsMainImage A#carouselLink').attr("href", linkValue); // setting carousel link added by offshore on 23/12/2010
    $('div.highlightsMainImage .highlightsMainImageFrame').attr("title", titleValue);
    $('div.highlightsMainImage .highlightsMainImageFrame').attr("alt", titleValue);
    $('div.highlightsMainImage .highlightsMainImageFrame').attr("id", imgName);
    $('div.highlightsMainImage .highlightsMainImageFrame').css("background-image", "url('" + fileName + "')");
    //$(".CarouseTransperentImage").attr("usemap", "#offerImageMap");
    $("#carouselTempImg").html("<img src=\"" + fileName + "\"  onload=\"carouselImgLoaded();\">");
   

  }
    
}

function carouselImgLoaded()
{ 
    $('div.highlightsMainImage .highlightsMainImageFrame').css("display", "block");;
    highlightsLoaded();
}

function highlightsLoaded()
{
  
  
        $('div.highlightsMainImageFrame').animate({
    opacity : 1.0
  }, animationTime, "linear", highlightsframeLoaded);
  
  
}

function highlightsframeLoaded()
{
  //Putting the framebg image to outer div
  
  var framebgImage = $('div.highlightsMainImageFrame').css('background-image');
  var frameTitle = $('div.highlightsMainImageFrame').attr("title");
  var frameAlt = $('div.highlightsMainImageFrame').attr("alt");
  $('div.highlightsMainImage').css('background-image',framebgImage);
  $('div.highlightsMainImage').attr('title',frameTitle);
  $('div.highlightsMainImage').attr('alt',frameAlt);
 
        $('div.highlightsMainImageFrame').animate({
      opacity : 0.0
  }, stayTime, "linear", loadHighights);
}

function stopHighlightsAmin()
{
  $('div.highlightsMainImageFrame').stop();
  $('div.highlightsMainImage').stop();
  animCarouselFlag = false;
}
/*****************  Cross Fade --  Highlights - End    *********************/



      




/********* Start Map load *************************/

        function loadLocationMap() 
        {
         
         var locationMapPath = $("#locationMapPath").html();
	 locationMapPath = strTrim(locationMapPath);
	 
	  if ((locationMapPath != null) && (locationMapPath != ""))
  	{
      $('div#banner-map').html("<iframe src=\""+locationMapPath+"\" width=\"718\" height=\"330\" scrollbar=\"no\" marginwidth=\"0\" marginheight=\"0\" hspace=\"0\" align=\"middle\" frameborder=\"0\"></iframe>"); 
      
       }
        }
/********* End Map ***************************/
/*************** Special Offers Peel Off On starts here ********************/

function specialOffersPeelOpenClose()
{

$("a[name^='clickToOpen_']").each(function()
{
$(this).click(function() 
{
$("#" + this.name).animate({"left": "+=361px", "top": "-=340px"}, "slow");
return false;
});
});
$("a[id^='closePeel_']").each(function()
{
$(this).click(function() 
{
$("." + this.id).animate({"left": "-=361px", "top": "+=340px"}, "slow");
return false;
});
});
}

/*************** Special Offers Peel Off On ends here ********************/

/********************* Start Video *************************************/
        function loadTakeATourVideo() 
        {
        
      
       var videoPath =strTrim($('#videoFileName').html());
       
      $('#banner-video').load(videoPath, function() {setTimeout('homepageVideo();', 50);});
      //$("#havenVideoNew").load(homeVideoPagePath, function() {setTimeout('homepageVideo();', 50);});
        }
/********************* End Video  **************************************/



/******************* News Letter Signup Boxes Start ******************************/
function openNewsLetterMoreInfo()
{
   
   $("#newsLetterHome3").slideDown("slow");
   $("#newsLetterHome2 a.blueLinkInfo").css("display", "none");
   $("#newsLetterHome1 a.lnkMoreInfo").css("display", "none");
} 
function closeNewsLetterMoreInfo()
{
   
   $("#newsLetterHome3").slideUp("slow"); 
   $("#newsLetterHome2 a.blueLinkInfo").css("display", "block");
   $("#newsLetterHome1 a.lnkMoreInfo").css("display", "block");
} 
function openNewsLetterSignUpBox()
{
   $("#newsLetterHome1").slideDown("slow"); 
   $("#newsLetterHome2").slideUp("slow"); 
}
/******************* News Letter Signup Boxes End   *******************************/

/********* Start Tour load *************************/
 function loadTour()
 {

 var virtualTourPath = $("#virtualTourPath").html();
 
 
 virtualTourPath = strTrim(virtualTourPath);

  if ((virtualTourPath != null) && (virtualTourPath != ""))
{
$("#banner-accom .interactiveBanner").css({ "height" : "535px" });
$("#banner-accom").css({ "height" : "535px" });
$("#banner-video").css({ "display" : "none" });
$("#banner-gallery").css({ "display" : "none" });
$("#pageContentRightContainerNew").css({ "margin-top" : "-220px" }); 
$("div#banner-tour #show-tour").load(virtualTourPath);
}

}
/********* End Tour *****************************/

  

/**************** partially hiding At a glance *********************/
   var maxGlanceItems = 5;
   function partiallyHideAtAGlance()
   {
    glanceCounter = 0;
    var atAGlanceList = $("#atAGlance .glanceTextDiv li, #atAGlancePopUp #glanceTextPopUp li, #atAGlanceNew .glanceTextDivNew li").each(function() {
      glanceCounter = glanceCounter + 1;
      if (glanceCounter > maxGlanceItems)
      {
        $(this).addClass("hiddenDiv");
      }  
    });
    if (glanceCounter > maxGlanceItems)
    {
        if ($("#atAGlance #glanceMore, #atAGlancePopUp #glanceMore, #atAGlanceNew #glanceMore") == null || $("#atAGlance #glanceMore, #atAGlancePopUp #glanceMore, #atAGlanceNew #glanceMore").length == 0)
        {
          $("#atAGlance .glanceBoxDiv, #atAGlancePopUp #glanceBoxPopUp, #atAGlanceNew .glanceBoxDivNew").html($("#atAGlance .glanceBoxDiv, #atAGlancePopUp #glanceBoxPopUp, #atAGlanceNew .glanceBoxDivNew").html() +  "<div id=\"glanceMore\"><a href=\"Javascript:showAtAGlance();\" onmouseover=\"Javascript:showAtAGlance();\">Show All&gt;</a></div>");

        }
        else
        {
          $("#atAGlance  #glanceMore, #atAGlancePopUp  #glanceMore, #atAGlanceNew  #glanceMore").html("<a href=\"Javascript:showAtAGlance();\" onmouseover=\"Javascript:showAtAGlance();\">Show All&gt;</a>");
        }
    }
   }
   
   function showAtAGlance()
   {
    $("#atAGlance .glanceTextDiv li, #atAGlancePopUp #glanceTextPopUp li").removeClass("hiddenDiv");
    $("#atAGlanceNew .glanceBoxDivNew .glanceTextDivNew li").removeClass("hiddenDiv");
    $("#atAGlance #glanceMore, #atAGlancePopUp #glanceMore, #atAGlanceNew #glanceMore").html("<a href=\"Javascript:partiallyHideAtAGlance();\">Hide&gt;</a>");
    //$(".glanceBoxDiv #glanceMore, #glanceBoxPopUp #glanceMore").addClass("hiddenDiv");
   }
   
   
/*******************************************************************/


/********************** Holiday Finder ***********************************************************/
  var finderCondition = "OR";   //"OR"
  var selectParkCodeList;
  
  
  function updateParkSelection()
  {
  }
  
  function updateParkSelectionForFeature (featureCode) 
  {
    var thisFeatureList = $("div.Feature_" + featureCode).html();
    
    thisFeatureList = strTrim(thisFeatureList);
    var colonRE = /[;]$/; 
    if (thisFeatureList != null && thisFeatureList != "")
    {
      if (thisFeatureList.match(colonRE))
      {
      }
      else
      {
        thisFeatureList = thisFeatureList + ";"   
      }
    }
    if (selectParkCodeList == null || selectParkCodeList == "")
    {
      selectParkCodeList = thisFeatureList;
    }
    else if (finderCondition == "AND")
    {
      addParkList(thisFeatureList); 
    }
    else if(finderCondition == "OR")
    {
      removeParkList(thisFeatureList);
    }
    
  }
  
  function addParkList(newList)
  {
    newListArray = newList.split(";");
    newListCount = newListArray.length;
    var i=0;
    var parkCode ="";
    for (i=0; i<newListCount ;i++)
    {
        parkCode = strTrim(newListArray[i]);
        if (parkCode != "")
        {
          if(selectParkCodeList.indexOf(parkCode + ";") < 0)
          {
            selectParkCodeList = selectParkCodeList + parkCode + ";";
          }
        }
      
    }
    
    
  }
  
  function removeParkList(newList)
  {
    oldListArray = selectParkCodeList.split(";");
    oldListCount = oldListArray.length;
    var i=0;
    var parkCode ="";
    for (i=0; i<oldListCount ;i++)
    {
        parkCode = strTrim(oldListArray[i]);
        if (parkCode != "")
        {
          if(newList.indexOf(parkCode + ";") < 0)
          {
            var colonRE = re = new RegExp(parkCode + "[\s]{0,};" ); 
            selectParkCodeList = selectParkCodeList.replace(colonRE , "");
          }
        }
      
    }   
    
  }
  
  
  function highlightParks() 
  { 
    
    if(selectParkCodeList != null && selectParkCodeList != "")
    {
      finalListArray = selectParkCodeList.split(";");
      finalListCount = finalListArray.length;
      var i=0;
      var parkCode ="";
      for (i=0; i<finalListCount ;i++)
      { 
          parkCode = strTrim(finalListArray[i]);
                           
          if (parkCode != "")
          {
        highLightPark(parkCode);
          }

      } 
    }
  }
  
  
  function activitySelectionChanged()
  {
    selectParkCodeList = "";
    revertAllHighlight();
    $(".holidayFinderActivityDiv :checked").each(function()
      {
        
        updateParkSelectionForFeature($(this).attr("name"));
      });
      
        
      highlightParks();
      var resultLink = $(".havenHolidayLink a").attr("href");
      if (resultLink != null && resultLink != "")
      {
        var selParksRE = new RegExp("ShowParks=(.*?)$" ); 
        if (selectParkCodeList == null || selectParkCodeList == "")
        {     
             resultLink = resultLink.replace(selParksRE , "ShowParks=NONE");
        }
        else
        {
        resultLink = resultLink.replace(selParksRE , "ShowParks=" + selectParkCodeList);
        }
        $(".havenHolidayLink a").attr("href", resultLink);
      }
  }
  
        function highLightPark(parkCode)
  {
       $("#PARK" + parkCode).css("display","block");
  }

  function revertAllHighlight()
  {
             $("#map_insideParks > div").css("display","none");
  } 
  
  function showSelectedParks(parksToShow)
  {
       showListArray = parksToShow.split(";");
       showListCount = showListArray.length;
       var i=0;
       var parkCode ="";
       for (i=0; i<showListCount ;i++)
       {  
     parkCode = strTrim(showListArray[i]);
            
                 if (parkCode != "")
           {
         $(".IntroPark" + parkCode).removeClass("hiddenDiv");
         var parkPageLnk = $("a.PARK" + parkCode).attr("href");
         if (parkPageLnk != null && parkPageLnk != "")
         {
            $("a.LinkPark" + parkCode).attr("href" , parkPageLnk);
         }
           }
  
     }
  }
  


  
  /*** News Letter ****/
  function bindNewsLetter()
  {
            //For Experience, Accommodation,Region Page Click for News Letter Sign Up Box     
             $("#newsLetterHome2 a.blueLink, #newsLetterHome2 .loginImageBox a").bind("click", 
                function(ev) { 
                        ev.preventDefault();
                            openNewsLetterSignUpBox();
                }    
             );

            //For Experience, Accommodation,Region Page Click for News Letter More Information
             $("#newsLetterHome2 a.blueLinkInfo").bind("click", 
                function(ev) { 
                        ev.preventDefault();
                            openNewsLetterMoreInfo();
                }    
             );
             
            //For Experience, Accommodation,Region Page Click for More Information link     
             $("#newsLetterHome1 a.lnkMoreInfo").bind("click", 
                function(ev) { 
                        ev.preventDefault();
                            openNewsLetterMoreInfo();
                }    
             );
             
             $("#newsLetterHome3 a.blueLink").bind("click", 
                function(ev) { 
                        ev.preventDefault();
                            closeNewsLetterMoreInfo();
                }    
             );
                          
             
              //For Experience, Accommodation,Region Page Click for More Information link     
             $("#newsLetter1Exp a.lnkMoreInfo").bind("click", 
                function(ev) { 
                        ev.preventDefault();
                            openNewsLetterMoreInfo();
                }    
             );  
  }
  
/*************************************************************************************************/

/******************Script functions being used for Image Gallery , added 14/10/2010 starts here****************/

                var jsLoaded = 0;
                var cssLoaded = 0;
                var htmlLoaded = 0;
                var defaultCat = '';
                var infoPaneTimerId;
                var galleryLoaded = 0;
                var startGalNew = "start";
                function galJSLoaded() {
                

                    jsLoaded = 1;
                    if (jsLoaded == 1 && cssLoaded == 1 && htmlLoaded == 1 && galleryLoaded == 0) {
                    //alert('inside galJSLoaded');
                        galleryLoaded = 1;
                       // alert(startGalNew);
                       trackPrevNextClick();
                       trackSliderMovement();
                       //trackInitilizeGallery(defaultCat);
                        initializegallery(defaultCat);
                        hideInfoPaneLoader();
                    }
                }

                function galCSSLoaded() {
                

                    cssLoaded = 1;
                    if (jsLoaded == 1 && cssLoaded == 1 && htmlLoaded == 1 && galleryLoaded == 0) {
                   // alert('inside galCSSLoaded');
                        galleryLoaded = 1;
                        initializegallery(defaultCat);
                        hideInfoPaneLoader();
                    }
                }

                function galHTMLLoaded() {
               
                htmlLoaded = 1;
               
               // var category=$('#hdnImageGalleryText').val();
                  //  LoadGallery(category);
                    //$(".galleryOuter .navSection .sliderBase .imgSlider").slider();
                
                   
                    
                  if (jsLoaded == 1 && cssLoaded == 1 && htmlLoaded == 1 && galleryLoaded == 0) 
                  {
                 // alert('inside galHTMLLoaded');
			
			            galleryLoaded = 1;
                        initializegallery(defaultCat);
                        hideInfoPaneLoader();
                    }           
                }                

                function LoadGallery(type) {
                    jsLoaded = 0;
		            cssLoaded = 0; 
		            htmlLoaded = 0;
                    
                    galleryLoaded = 0;
                    var ImageGalPath=strTrim($("#imageGalleryPath").html());
                    var category=$('#hdnImageGalleryText').val();
                    if (type != null && type != undefined && type != "")
                    {
                    var matchedContent2 = type;
                    //alert(type);
                    
		    var ImageGalPath = $("#"+type).attr("title");
		    //alert(ImageGalPath);
		    //debugger;
                    $("DIV#"+type).load(ImageGalPath, galHTMLLoaded);
                    }
                    else
		    {        
                    $("#banner-gallery").load(ImageGalPath, galHTMLLoaded);
                    }
                    //$("#infoPaneLoader").css("display", "block");
                    defaultCat = category;
                   
                    if (typeof initializegallery == 'function') {
                    
                   // alert('inside function');
                        
                        jsLoaded = 1;
                        cssLoaded = 1;
                        if (jsLoaded == 1 && cssLoaded == 1 && htmlLoaded == 1 && galleryLoaded == 0) 
                        {   
                        // alert('inside LoadGallery');
                          galleryLoaded = 1;
                          trackPrevNextClick();
                          trackSliderMovement();
                         // trackInitilizeGallery(defaultCat);
                          initializegallery(defaultCat);
                          hideInfoPaneLoader();
                        }

                    }
                    else {
                    //alert('loading files');
                    
                        // loading js
                        /*
                        var script_ig_js = document.createElement("script");
                        script_ig_js.src = "/js/imageGallery.js";
                        script_ig_js.type = "text/javascript";
                        
                        script_ig_js.onreadystatechange = function() {
                            
                            if (this.readyState == 'complete') 
                                 galJSLoaded();
                        }
                        script_ig_js.onload = galJSLoaded;
                        document.getElementsByTagName("head")[0].appendChild(script_ig_js);
                        */
                        //$.getScript("/js/jquery-ui.min.js");
                        $.getScript("/js/imageGallery.js" , galJSLoaded);
                        
                        // loading css
                        var fileref_css = document.createElement("link");
                        fileref_css.setAttribute("rel", "stylesheet")
                        fileref_css.setAttribute("type", "text/css")
                        fileref_css.setAttribute("href", "/css/ImageGallery.css")
			            //jsLoaded = 1;
                        fileref_css.onreadystatechange = function() {
                        
                        if (this.readyState == 'complete') galCSSLoaded();
                        }
                        fileref_css.onload = galCSSLoaded;
                        document.getElementsByTagName("head")[0].appendChild(fileref_css);
                        galCSSLoaded();  // firefox does not fires the event for CSS
                        
                    }                
                }
                
                function displayInfoPaneLoader()
                {
                    
                    $("#infoPaneLoader").css("display", "block");
                    
                }
                
                function hideInfoPaneLoader()
                {
                    clearTimeout(infoPaneTimerId);
                    $("#infoPaneLoader").css("display", "none");
                    
                }

/******************Script functions being used for Image Gallery , added 14/10/2010 ends here****************/


/******************Script functions being used for Dynamic js & css loading , added 15/11/2010 starts here****************/
function loadjscssfile(filename, filetype){
//alert(filename);
//alert(filetype);
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

var filesadded=""; //list of files already added

function checkloadJScssfile(filename, filetype){
 if (filesadded.indexOf("["+filename+"]")==-1){
  loadjscssfile(filename, filetype)
  filesadded+="["+filename+"]" //List of files added in the form "[filename1],[filename2],etc"
 }
}


/******************Script functions being used for Dynamic js & css loading , added 15/11/2010 ends here****************/



/********************** Animation added for Haven 2010 ***********************/

//animated banners for NON-lightbox pages
function pageBanners() { 
$("#banner-highlights").show();

var aDayInLifePath = $("#ADayInLifePath").html();
var aDayInLifePathHeight = $("#ADayInLifePathHeight").html();
var aDayInLifePathWidth = $("#ADayInLifePathWidth").html();
var galleryPath = $("#imageGalleryPath").html();
var panoFileName = $("#360FileName").html();

var videoFileName = $('#videoFileName').html();
var parkfinderPath = $('#ParkFinderPath').html();
var parkTourPath = $('#virtualTourPath').html();

var loadHFJSCSSDetect = 0;

if(aDayInLifePath != null || aDayInLifePath != "")
{

$("#life").attr("href", aDayInLifePath+"?KeepThis=true&amp;TB_iframe=true&amp;height="+aDayInLifePathHeight+"&amp;width="+aDayInLifePathWidth);
}
if(aDayInLifePath == null || aDayInLifePath == "")
{
$("#life").parent('li').remove();

}

/*if(galleryPath == null || galleryPath == "")
{
$("#gallery").parent('li').remove();

}*/
if(panoFileName == null || panoFileName == "")
{
$("#360view").parent('li').remove();

}
/*if(videoFileName == null || videoFileName == "")
{
$("#video").parent('li').remove();

}*/
if(parkfinderPath == null || parkfinderPath == "")
{
$("#finder").parent('li').remove();

}
if(parkTourPath == null || parkTourPath == "")
{
$("#tour").parent('li').remove();

}

	$(".bannerNav UL LI A").click(function(ev){
	ev.preventDefault();
		//hide all banners
		
		var thisId = this.id;
		
		
		
		thisId = thisId.replace("_over", "");
		
		//alert(thisId);
		//$(".bannerNav UL LI.menuouter").css("display", "block");
		//$(".bannerNav UL LI.PVStep2Class").css("display", "none");
		
		$(".interactiveBanner").css({ "height" : "330px" });
		$("#pageContentRightContainerNew").css({ "margin-top" : "-15px" });  /** to be tested**/
	        $(".bannerRight").css({ "margin" : "0px 0px 6px 0px" });
	        $(".bannerNav UL LI A > IMG").css("margin-left", "0px");
		$("#banner-highlights").hide();
		$("#banner-gallery").hide();
		$("#banner-video").hide();
		$("#banner-finder").hide();
		$("#banner-tour").hide();
		$("#banner-life").hide();
		$("#banner-360view").hide();
		$("#banner-map").hide();
		$("#banner-offThePark").hide();
		$("DIV#finderBottomText").hide();
		$("#pageContentRightContainer").css({ "margin-top" : "0px" });
		
		$("#banner-accom").css({ "background" : "none" });
		
		$("body#parks #pageContentRightContainer").css({ "margin-top" : "0px" });
		
		$("DIV#pageContentRightContainer").show(); // added by offshore on 21/01/2011
		$("DIV#pageContentLeftContainer").show(); // // added by offshore on 21/01/2011
		
		//hide banner elements
		
		$("#banner-video-movie").hide();
		$("#banner-video-options").hide();
		//hide link buttons
		$(".banner-slide-up").hide();
		//show selected banner
		
		$("#divParkLogo").hide();
		//alert("1 : "+thisId);
		//alert("bannerLeftClicked");
		//$("#banner-parks").css("height", "495px");
		
		if((this.id == "highlights") || (thisId == "highlights"))
		{
		  
		  //counter = 1;
		  var detectDiv = $("DIV#pageContentLeftContainer DIV.bannerNavParks").length;
		  
		  if (detectDiv != 1)
		  {
		  startCarousel();
		  $("#divParkLogo").show();
		  }
		  //HighlightsPanel_takeatour_Highlights();
		  WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=Infopane&action=HomeButton');

    // added by Tomasz to fix a bug (the height of banner-parks set to 475px by click on VIEW PHOTOS / GALLERY was never reset
    $("DIV#banner-parks").css("height", "auto");
		  
		  
		  
		}
		
		if((this.id == "gallery") || (thisId == "gallery"))
		{
           //infoPaneTimerId = setTimeout('displayInfoPaneLoader();', 1500);  
		  
		   stopHighlightsAmin();
		//$(".interactiveBanner").css({ "height" : "465px" });
		$(".interactiveBanner").css({ "height" : "530px" });
		$("#banner-parks").css({ "height" : "475px" });
		$("#banner-accom").css({ "height" : "475px" });
		$("#pageContentRightContainerNew").css({ "margin-top" : "-160px" });
		$("#pageContentRightContainer").css({ "margin-top" : "-135px" });
				
		
		$("body#parks #pageContentRightContainer").css({ "margin-top" : "-135px" });
		
	        $(".bannerRight").css({ "margin" : "0px 0px 141px 0px" });
		  
		  setTimeout('LoadGallery();', 1);		  
		  
		  WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=Infopane&action=ViewPhotos');   	         
		   
		}
		
		if(this.id == "life" || thisId == "life")
		{
    // added by Tomasz to fix a bug (the height of banner-parks set to 475px by click on VIEW PHOTOS / GALLERY was never reset
    $("DIV#banner-parks").css("height", "auto");
    		
		stopHighlightsAmin();
		   HighlightsPanel_takeatour_DayinLife();
		}		
		
		if((this.id == "video") || (thisId == "video"))
		{
    // added by Tomasz to fix a bug (the height of banner-parks set to 475px by click on VIEW PHOTOS / GALLERY was never reset
    $("DIV#banner-parks").css("height", "auto");		   
		   
		   if($("#"+this.id).closest("div").parent("div").attr("id")=="banner-accom")
		        $("#"+this.id).closest("div").parent("div").css("height","330px");
		   var videoTest=$("#video_gal").attr("src");
		
		   stopHighlightsAmin();
		   
		   loadTakeATourVideo();	
		   
		   
		                           //var script_video_js = document.createElement("script");
		                           //script_video_js.src = "/js/Home_Video_Page_2011.js";
		                           //script_video_js.type = "text/javascript";
		                           
		                           //script_video_js.onreadystatechange = function() {
		                           //if (this.readyState == 'complete') galJSLoaded();
		                           //}
		                           //script_video_js.onload = galJSLoaded;
                        		   //document.getElementsByTagName("head")[0].appendChild(script_video_js);
                        		   checkloadJScssfile("/js/Home_Video_Page_2011.js", "js") //dynamically load and add this .js file
                        		   checkloadJScssfile("/css/Home_Video_Page_2010.css", "css") ////dynamically load and add this .css file

                        
                      WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=Infopane&action=ViewVideo');  
		   
		 
		}
		if(this.id == "finder" || thisId == "finder")
		{
    // added by Tomasz to fix a bug (the height of banner-parks set to 475px by click on VIEW PHOTOS / GALLERY was never reset
    $("DIV#banner-parks").css("height", "auto");

if (loadHFJSCSSDetect == 0)
{

                
                 loadHolidayFinderJSCSS();
}
 $("DIV#finderBottomText").show();
		 loadHolidayFinderPark();
		     WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=Infopane&action=HolidayFinder');
		     loadHFJSCSSDetect = loadHFJSCSSDetect + 1;
		}
		if(this.id == "tour" || thisId == "tour")
		{
    // added by Tomasz to fix a bug (the height of banner-parks set to 475px by click on VIEW PHOTOS / GALLERY was never reset
    $("DIV#banner-parks").css("height", "auto");
    		
		     stopHighlightsAmin();
		     HighlightsPanel_takeatour_parkTour();
		    
		     $("#banner-accom").css({ "background" : "transparent url(/Images/NonTridion/acc_bg_leftedge.png) top left no-repeat" });
		     loadTour();
		}

		if(this.id == "map" || thisId == "map")
		{
    // added by Tomasz to fix a bug (the height of banner-parks set to 475px by click on VIEW PHOTOS / GALLERY was never reset
    $("DIV#banner-parks").css("height", "auto");
    		
		    stopHighlightsAmin();
		    //HighlightsPanel_takeatour_Map() /* commented by offshore on 08/04/2010 as new tracking is implemented below*/
		   
		    loadLocationMap();
		   WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=Infopane&action=LocationMap'); 
		}
		if (this.id == "360view")
		{
    // added by Tomasz to fix a bug (the height of banner-parks set to 475px by click on VIEW PHOTOS / GALLERY was never reset
    $("DIV#banner-parks").css("height", "auto");		
		    stopHighlightsAmin();
		    HighlightsPanel_takeatour_360();
		    loadTakeATour360();
		}
		if (this.id == "offThePark" || thisId == "offThePark")
		{
    // added by Tomasz to fix a bug (the height of banner-parks set to 475px by click on VIEW PHOTOS / GALLERY was never reset
    $("DIV#banner-parks").css("height", "auto");		
		//alert(thisId);
		WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=Infopane&action=PlacesToVisit'); // WEBABACUS Tracking for offThePark
		 stopHighlightsAmin();
		 loadOffTheParkJSCSS();
		 loadOffThePark();	 
		
		}
		
		var marginTop = $(".menuitemactive").css('margin-top');
        $(".menuitemactive").css('margin-top',parseInt(marginTop) + parseInt(5));
        
        $("LI.menuitemactive").find("IMG.divider").attr("src","/Images/NonTridion/imagenav/divider.gif");
		$("LI.menuitemactive").find("IMG.divider").attr("style","margin-left:0px");
		$("LI.menuitemactive").find("A.menuitem_over_active").addClass("menuitem_over");
		$("LI.menuitemactive").find("A.menuitem_over_active").removeClass("menuitem_over_active");
		if (thisId == "highlights")
		{
		var detectDiv = $("DIV#pageContentLeftContainer DIV.bannerNavParks").length;
		if (detectDiv != 1)
		{
		$("DIV#banner-" + thisId).show();
		}
		if (detectDiv == 1)
		{
		$("#banner-parks").hide("slow");
		$("#pageContentLeftContainer .tlcornerImg").css("display" ,"block");                                       
                $("#pageContentLeftContainer .bannerNavParks").css("display" ,"block");
                $("#pageContentLeftContainer").css("margin-top","0px");
		}
		}
		else
		{
		$("DIV#banner-" + thisId).show();
		}
		
				//debugger;
				//var releaseImg = $("A.menuitem > IMG").attr("src");
				$('A.menuitem > IMG').each(function(index) 
				{
				var releaseImg = $(this).attr("src");
				//releaseImg = releaseImg.replace("_ON","_OFF");
				releaseImg = releaseImg.replace("_ON","_OFF");
								
				$(this).attr("src", releaseImg);
				
				});
				
				//releaseImg = releaseImg.replace("_on.gif","_off.gif");
				
				//$("A.menuitem > IMG").attr("src", releaseImg);
				
				
				$("IMG.divider").css("display", "block");
				
				$("A.menuitem").parent("LI").removeClass("menuitemactive");
				$("A.menuitem_over").removeClass("menuitem_over_active");
		
				
				
		
		var changeImage = $("A#" + thisId + " > IMG").attr("src");
		
		
		//changeImage = changeImage.replace("_OFF.gif","_ON.gif");
		//changeImage = changeImage.replace("_OVER.gif","_ON.gif");
		changeImage = changeImage.replace("_OFF","_ON");
		changeImage = changeImage.replace("_OVER","_ON");
		
		$("A#" + thisId + " > IMG").attr("src", changeImage);
	
		$("A#" + thisId).parent("LI").addClass("menuitemactive");
		$("A#" + thisId+"_over").addClass("menuitem_over_active");
		$("A#" + thisId+"_over").removeClass("menuitem_over");

	
		
		
		var marginTop = $(".menuitemactive").css('margin-top');
		$(".menuitemactive").css('margin-top',parseInt(marginTop) - parseInt(5));
		
		$("LI.menuitemactive").find("IMG.divider").attr("src","/Images/NonTridion/imagenav/halfdivider.gif");
		$("LI.menuitemactive").find("IMG.divider").attr("style","margin-left:12px");
        var menulength = $('.bannerNav ul > li').length - 2;
        $("#menu"+menulength+ " .divider").css('display','none');
                
	});	
}

/********************** Animation end Here for Haven 2010 *********************/

function loadOffTheParkJSCSS()
{

 loadjscssfile("/js/PlacesToVisit-pager.jquery.js", "js") //dynamically load and add this .js file

 checkloadJScssfile("/js/OffTheParks-funcs_history.js", "js") //dynamically load and add this .js file

                        // loading css
                        var offThePark_css = document.createElement("link");
                        offThePark_css.setAttribute("rel", "stylesheet");
                        offThePark_css.setAttribute("type", "text/css");
                        offThePark_css.setAttribute("href", "/css/havenOffThePark.css");			            
                        document.getElementsByTagName("head")[0].appendChild(offThePark_css);
}

function loadOffThePark()
{
//alert('hi1');
window.location.hash = "#PlacesToVisitStep1";
$("DIV.bannerLeft").css("height", "auto");
$("DIV#banner-parks").css("height", "auto");
 $('div.interactiveBanner').css("height", "100%");
}

function loadHolidayFinderJSCSS()
{

 
 //loadjscssfile("/js/interactive-pager.jquery.js", "js") //dynamically load and add this .js file
//loadjscssfile("/js/finder-funcs-parks.js", "js") //dynamically load and add this .js file



 checkloadJScssfile("/js/holiday_finder_history.js", "js") //dynamically load and add this .js file
 

                        // loading css
                        var holFinderPark_css = document.createElement("link");
                        holFinderPark_css.setAttribute("rel", "stylesheet");
                        holFinderPark_css.setAttribute("type", "text/css");
                        holFinderPark_css.setAttribute("href", "/css/HolidayFinder.css");			            
                        document.getElementsByTagName("head")[0].appendChild(holFinderPark_css);
                        
                
}

function loadHolidayFinderPark()
{

window.location.hash = "#Interactive";

$("DIV#pageContentRightContainer").hide(); // added by offshore on 21/01/2011
$("DIV#pageContentLeftContainer").hide(); // // added by offshore on 21/01/2011
$("div#banner-finder").css("height", "560px"); // added by offshore on 19/01/2011 for the Holiday Finder issue.
$("div.interactiveBanner").css("height", "560px");
$("DIV.bannerLeft").css("height", "auto");
$("DIV#banner-parks").css("height", "auto");

}






function loadOffTheParkStep1()
{

var offTheParkPath = $("#OffTheParkPath").html();

 offTheParkPath = strTrim(offTheParkPath);
  if ((offTheParkPath != null) && (offTheParkPath != ""))

{
     loaderShowStep1();
     $("#regionStep2").html("");
     var currentRegionCode = $("#CurrentRegionCode").html();
     currentRegionCode = strTrim(currentRegionCode);

currentRegionCode = escape(currentRegionCode);
     // alert("Test!" + offTheParkPath+"?RegionCode="+currentRegionCode + " #step1Outer");
     // $("#regionStep1").load(offTheParkPath +"?RegionCode="+currentRegionCode + " #step1Outer",loaderHideStep1);
        //alert(offTheParkPath +"?RegionCode="+currentRegionCode);
        $.ajax({
            url: offTheParkPath +"?RegionCode="+currentRegionCode,
            dataType: 'html',
            cache: false,
            success: function(response) {
                $("#regionStep1").html(jQuery(response).find('#step1Outer').html());
                loaderHideStep1();
                detectTouringPTV("RegionsSearchBoxUC_ddlRegionFormRegion");
            }
        });      
      
      $("DIV.bannerLeft").css("height", "auto");
$("DIV#banner-parks").css("height", "auto");
 $('div.interactiveBanner').css("height", "100%");
 //$('div#banner-parks').css("height", "100%");
 //$('div#banner-parks').css("background", "#F8C66A url(/Images/_PW_bg-banner-parks.gif) repeat-x scroll left top");
 
 $("div#headingContents").hide();
}
}

function loaderHideStep1()
{
bindRegionClick();
$("#dvloader").hide();
$("#regionStep1").show();

}
function loaderShowStep1()
{

$("#dvloader").show();
$("#regionStep1").hide();

}


function removeDefaultPostCode()
{
var defaultValuePCode = strTrim($("input:text[name=postcode]").val());
//alert(defaultValuePCode);
if(defaultValuePCode == "Enter postcode")
                                {
                                    //alert("hi2");
                                   $("input:text[name=postcode]").val("");
                                    
                                }

                                $("input:text[name=postcode]").css({ "color" : "black"});
}

function parksFaqSection()
{


$("DIV.clickFaq").live('click', function(ev)
{
//ev.preventDefault();
var faqId = this.id; // faq_1;
faqId = faqId.replace("top_", "");

var className = $(this).attr("class");

if (className.match("faq_inner_section_top") == "faq_inner_section_top")
{

$(this).removeClass("faq_inner_section_top");
$(this).addClass("faq_inner_section_collapse");
$("DIV#inner_"+faqId).slideUp("slow");
$("DIV#bottom_"+faqId).slideUp("slow");
$("DIV#"+faqId).removeClass("faq_inner_section_top_arrow");
$("DIV#"+faqId).addClass("faq_inner_section_collapse_arrow");
}
else
{

$(this).removeClass("faq_inner_section_collapse");
$(this).addClass("faq_inner_section_top");
$("DIV#inner_"+faqId).slideDown("slow");
$("DIV#bottom_"+faqId).slideDown("slow");
$("DIV#"+faqId).removeClass("faq_inner_section_collapse_arrow");
$("DIV#"+faqId).addClass("faq_inner_section_top_arrow");
$("DIV#inner_"+faqId+" DIV.faq_inner_section_middle_inner DIV.textContainerHolidayAreas").first().addClass("textContainerHolidayAreas_frst");
}

});
}

function SeasonalPageOnClicksTrack()
{

$("A.SeasonalTrackLink IMG").bind("click", function(ev){

var altTxt = $(this).attr("alt");

if (altTxt != null && altTxt != "")
{
var altTextNew = returnToCapitalCase(altTxt);

WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=BottomInfoPane&action='+altTextNew);
}
});
}

function returnToCapitalCase(aText) 
{

var re = /\s+/;
var words = aText.split(re);
re = /(\S)(\S+)/;
for (i = words.length - 1; i >= 0; i--) 
{
re.exec(words[i]);
words[i] = RegExp.$1.toUpperCase() + RegExp.$2.toLowerCase();
}
return words.join('');
} 

function strTrim(strToTrim)
{
    if (strToTrim != null && strToTrim != "")
    {
     strToTrim = strToTrim.replace(/^\s*/, "").replace(/\s*$/, "");  
    }
    return strToTrim;
}

//Handling Query String
    
function querySt(ji) {
hu = window.location.search.substring(1);
gy = hu.split("&");
for (i=0;i<gy.length;i++) {
ft = gy[i].split("=");
if (ft[0] == ji) {
return ft[1];
}
}
} 

//Handling Cookies
function getCookie( name ) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ';', len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}

function setCookie( name, value, expires, path, domain, secure ) {
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name+'='+escape( value ) +
		( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
		( ( path ) ? ';path=' + path : '' ) +
		( ( domain ) ? ';domain=' + domain : '' ) +
		( ( secure ) ? ';secure' : '' );
}

function deleteCookie( name, path, domain ) {
	if ( getCookie( name ) ) document.cookie = name + '=' +
			( ( path ) ? ';path=' + path : '') +
			( ( domain ) ? ';domain=' + domain : '' ) +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

/** 360 code ************************************************************/
/*! SWFObject v2.1 <http://code.google.com/p/swfobject/>
  Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
  This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

var swfobject = function() {
  
  var UNDEF = "undefined",
    OBJECT = "object",
    SHOCKWAVE_FLASH = "Shockwave Flash",
    SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
    FLASH_MIME_TYPE = "application/x-shockwave-flash",
    EXPRESS_INSTALL_ID = "SWFObjectExprInst",
    
    win = window,
    doc = document,
    nav = navigator,
    
    domLoadFnArr = [],
    regObjArr = [],
    objIdArr = [],
    listenersArr = [],
    script,
    timer = null,
    storedAltContent = null,
    storedAltContentId = null,
    isDomLoaded = false,
    isExpressInstallActive = false;
  
  /* Centralized function for browser feature detection
    - Proprietary feature detection (conditional compiling) is used to detect Internet Explorer's features
    - User agent string detection is only used when no alternative is possible
    - Is executed directly for optimal performance
  */  
  var ua = function() {
    var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
      playerVersion = [0,0,0],
      d = null;
    if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
      d = nav.plugins[SHOCKWAVE_FLASH].description;
      if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
        d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
        playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
        playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
        playerVersion[2] = /r/.test(d) ? parseInt(d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
      }
    }
    else if (typeof win.ActiveXObject != UNDEF) {
      var a = null, fp6Crash = false;
      try {
        a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".7");
      }
      catch(e) {
        try { 
          a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".6");
          playerVersion = [6,0,21];
          a.AllowScriptAccess = "always";  // Introduced in fp6.0.47
        }
        catch(e) {
          if (playerVersion[0] == 6) {
            fp6Crash = true;
          }
        }
        if (!fp6Crash) {
          try {
            a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
          }
          catch(e) {}
        }
      }
      if (!fp6Crash && a) { // a will return null when ActiveX is disabled
        try {
          d = a.GetVariable("$version");  // Will crash fp6.0.21/23/29
          if (d) {
            d = d.split(" ")[1].split(",");
            playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
          }
        }
        catch(e) {}
      }
    }
    var u = nav.userAgent.toLowerCase(),
      p = nav.platform.toLowerCase(),
      webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
      ie = false,
      windows = p ? /win/.test(p) : /win/.test(u),
      mac = p ? /mac/.test(p) : /mac/.test(u);
    /*@cc_on
      ie = true;
      @if (@_win32)
        windows = true;
      @elif (@_mac)
        mac = true;
      @end
    @*/
    return { w3cdom:w3cdom, pv:playerVersion, webkit:webkit, ie:ie, win:windows, mac:mac };
  }();

  /* Cross-browser onDomLoad
    - Based on Dean Edwards' solution: http://dean.edwards.name/weblog/2006/06/again/
    - Will fire an event as soon as the DOM of a page is loaded (supported by Gecko based browsers - like Firefox -, IE, Opera9+, Safari)
  */ 
  var onDomLoad = function() {
    if (!ua.w3cdom) {
      return;
    }
    addDomLoadEvent(main);
    if (ua.ie && ua.win) {
      try {  // Avoid a possible Operation Aborted error
        doc.write("<scr" + "ipt id=__ie_ondomload defer=true src=//:></scr" + "ipt>"); // String is split into pieces to avoid Norton AV to add code that can cause errors 
        script = getElementById("__ie_ondomload");
        if (script) {
          addListener(script, "onreadystatechange", checkReadyState);
        }
      }
      catch(e) {}
    }
    if (ua.webkit && typeof doc.readyState != UNDEF) {
      timer = setInterval(function() { if (/loaded|complete/.test(doc.readyState)) { callDomLoadFunctions(); }}, 10);
    }
    if (typeof doc.addEventListener != UNDEF) {
      doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, null);
    }
    addLoadEvent(callDomLoadFunctions);
  }();
  
  function checkReadyState() {
    if (script.readyState == "complete") {
      script.parentNode.removeChild(script);
      callDomLoadFunctions();
    }
  }
  
  function callDomLoadFunctions() {
    if (isDomLoaded) {
      return;
    }
    if (ua.ie && ua.win) { // Test if we can really add elements to the DOM; we don't want to fire it too early
      var s = createElement("span");
      try { // Avoid a possible Operation Aborted error
        var t = doc.getElementsByTagName("body")[0].appendChild(s);
        t.parentNode.removeChild(t);
      }
      catch (e) {
        return;
      }
    }
    isDomLoaded = true;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    var dl = domLoadFnArr.length;
    for (var i = 0; i < dl; i++) {
      domLoadFnArr[i]();
    }
  }
  
  function addDomLoadEvent(fn) {
    if (isDomLoaded) {
      fn();
    }
    else { 
      domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
    }
  }
  
  /* Cross-browser onload
    - Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
    - Will fire an event as soon as a web page including all of its assets are loaded 
   */
  function addLoadEvent(fn) {
    if (typeof win.addEventListener != UNDEF) {
      win.addEventListener("load", fn, false);
    }
    else if (typeof doc.addEventListener != UNDEF) {
      doc.addEventListener("load", fn, false);
    }
    else if (typeof win.attachEvent != UNDEF) {
      addListener(win, "onload", fn);
    }
    else if (typeof win.onload == "function") {
      var fnOld = win.onload;
      win.onload = function() {
        fnOld();
        fn();
      };
    }
    else {
      win.onload = fn;
    }
  }
  
  /* Main function
    - Will preferably execute onDomLoad, otherwise onload (as a fallback)
  */
  function main() { // Static publishing only
    var rl = regObjArr.length;
    for (var i = 0; i < rl; i++) { // For each registered object element
      var id = regObjArr[i].id;
      if (ua.pv[0] > 0) {
        var obj = getElementById(id);
        if (obj) {
          regObjArr[i].width = obj.getAttribute("width") ? obj.getAttribute("width") : "0";
          regObjArr[i].height = obj.getAttribute("height") ? obj.getAttribute("height") : "0";
          if (hasPlayerVersion(regObjArr[i].swfVersion)) { // Flash plug-in version >= Flash content version: Houston, we have a match!
            if (ua.webkit && ua.webkit < 312) { // Older webkit engines ignore the object element's nested param elements
              fixParams(obj);
            }
            setVisibility(id, true);
          }
          else if (regObjArr[i].expressInstall && !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac)) { // Show the Adobe Express Install dialog if set by the web page author and if supported (fp6.0.65+ on Win/Mac OS only)
            showExpressInstall(regObjArr[i]);
          }
          else { // Flash plug-in and Flash content version mismatch: display alternative content instead of Flash content
            displayAltContent(obj);
          }
        }
      }
      else {  // If no fp is installed, we let the object element do its job (show alternative content)
        setVisibility(id, true);
      }
    }
  }
  
  /* Fix nested param elements, which are ignored by older webkit engines
    - This includes Safari up to and including version 1.2.2 on Mac OS 10.3
    - Fall back to the proprietary embed element
  */
  function fixParams(obj) {
    var nestedObj = obj.getElementsByTagName(OBJECT)[0];
    if (nestedObj) {
      var e = createElement("embed"), a = nestedObj.attributes;
      if (a) {
        var al = a.length;
        for (var i = 0; i < al; i++) {
          if (a[i].nodeName == "DATA") {
            e.setAttribute("src", a[i].nodeValue);
          }
          else {
            e.setAttribute(a[i].nodeName, a[i].nodeValue);
          }
        }
      }
      var c = nestedObj.childNodes;
      if (c) {
        var cl = c.length;
        for (var j = 0; j < cl; j++) {
          if (c[j].nodeType == 1 && c[j].nodeName == "PARAM") {
            e.setAttribute(c[j].getAttribute("name"), c[j].getAttribute("value"));
          }
        }
      }
      obj.parentNode.replaceChild(e, obj);
    }
  }
  
  /* Show the Adobe Express Install dialog
    - Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
  */
  function showExpressInstall(regObj) {
    isExpressInstallActive = true;
    var obj = getElementById(regObj.id);
    if (obj) {
      if (regObj.altContentId) {
        var ac = getElementById(regObj.altContentId);
        if (ac) {
          storedAltContent = ac;
          storedAltContentId = regObj.altContentId;
        }
      }
      else {
        storedAltContent = abstractAltContent(obj);
      }
      if (!(/%$/.test(regObj.width)) && parseInt(regObj.width, 10) < 310) {
        regObj.width = "310";
      }
      if (!(/%$/.test(regObj.height)) && parseInt(regObj.height, 10) < 137) {
        regObj.height = "137";
      }
      doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
      var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
        dt = doc.title,
        fv = "MMredirectURL=" + win.location + "&MMplayerType=" + pt + "&MMdoctitle=" + dt,
        replaceId = regObj.id;
      // For IE when a SWF is loading (AND: not available in cache) wait for the onload event to fire to remove the original object element
      // In IE you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
      if (ua.ie && ua.win && obj.readyState != 4) {
        var newObj = createElement("div");
        replaceId += "SWFObjectNew";
        newObj.setAttribute("id", replaceId);
        obj.parentNode.insertBefore(newObj, obj); // Insert placeholder div that will be replaced by the object element that loads expressinstall.swf
        obj.style.display = "none";
        var fn = function() {
          obj.parentNode.removeChild(obj);
        };
        addListener(win, "onload", fn);
      }
      createSWF({ data:regObj.expressInstall, id:EXPRESS_INSTALL_ID, width:regObj.width, height:regObj.height }, { flashvars:fv }, replaceId);
    }
  }
  
  /* Functions to abstract and display alternative content
  */
  function displayAltContent(obj) {
    if (ua.ie && ua.win && obj.readyState != 4) {
      // For IE when a SWF is loading (AND: not available in cache) wait for the onload event to fire to remove the original object element
      // In IE you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
      var el = createElement("div");
      obj.parentNode.insertBefore(el, obj); // Insert placeholder div that will be replaced by the alternative content
      el.parentNode.replaceChild(abstractAltContent(obj), el);
      obj.style.display = "none";
      var fn = function() {
        obj.parentNode.removeChild(obj);
      };
      addListener(win, "onload", fn);
    }
    else {
      obj.parentNode.replaceChild(abstractAltContent(obj), obj);
    }
  } 

  function abstractAltContent(obj) {
    var ac = createElement("div");
    if (ua.win && ua.ie) {
      ac.innerHTML = obj.innerHTML;
    }
    else {
      var nestedObj = obj.getElementsByTagName(OBJECT)[0];
      if (nestedObj) {
        var c = nestedObj.childNodes;
        if (c) {
          var cl = c.length;
          for (var i = 0; i < cl; i++) {
            if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
              ac.appendChild(c[i].cloneNode(true));
            }
          }
        }
      }
    }
    return ac;
  }
  
  /* Cross-browser dynamic SWF creation
  */
  function createSWF(attObj, parObj, id) {
    var r, el = getElementById(id);
    if (el) {
      if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
        attObj.id = id;
      }
      if (ua.ie && ua.win) { // IE, the object element and W3C DOM methods do not combine: fall back to outerHTML
        var att = "";
        for (var i in attObj) {
          if (attObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries, like Object.prototype.toJSONString = function() {}
            if (i.toLowerCase() == "data") {
              parObj.movie = attObj[i];
            }
            else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
              att += ' class="' + attObj[i] + '"';
            }
            else if (i.toLowerCase() != "classid") {
              att += ' ' + i + '="' + attObj[i] + '"';
            }
          }
        }
        var par = "";
        for (var j in parObj) {
          if (parObj[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
            par += '<param name="' + j + '" value="' + parObj[j] + '" />';
          }
        }
        el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
        objIdArr[objIdArr.length] = attObj.id; // Stored to fix object 'leaks' on unload (dynamic publishing only)
        r = getElementById(attObj.id);  
      }
      else if (ua.webkit && ua.webkit < 312) { // Older webkit engines ignore the object element's nested param elements: fall back to the proprietary embed element
        var e = createElement("embed");
        e.setAttribute("type", FLASH_MIME_TYPE);
        for (var k in attObj) {
          if (attObj[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
            if (k.toLowerCase() == "data") {
              e.setAttribute("src", attObj[k]);
            }
            else if (k.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
              e.setAttribute("class", attObj[k]);
            }
            else if (k.toLowerCase() != "classid") { // Filter out IE specific attribute
              e.setAttribute(k, attObj[k]);
            }
          }
        }
        for (var l in parObj) {
          if (parObj[l] != Object.prototype[l]) { // Filter out prototype additions from other potential libraries
            if (l.toLowerCase() != "movie") { // Filter out IE specific param element
              e.setAttribute(l, parObj[l]);
            }
          }
        }
        el.parentNode.replaceChild(e, el);
        r = e;
      }
      else { // Well-behaving browsers
        var o = createElement(OBJECT);
        o.setAttribute("type", FLASH_MIME_TYPE);
        for (var m in attObj) {
          if (attObj[m] != Object.prototype[m]) { // Filter out prototype additions from other potential libraries
            if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
              o.setAttribute("class", attObj[m]);
            }
            else if (m.toLowerCase() != "classid") { // Filter out IE specific attribute
              o.setAttribute(m, attObj[m]);
            }
          }
        }
        for (var n in parObj) {
          if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // Filter out prototype additions from other potential libraries and IE specific param element
            createObjParam(o, n, parObj[n]);
          }
        }
        el.parentNode.replaceChild(o, el);
        r = o;
      }
    }
    return r;
  }
  
  function createObjParam(el, pName, pValue) {
    var p = createElement("param");
    p.setAttribute("name", pName);  
    p.setAttribute("value", pValue);
    el.appendChild(p);
  }
  
  /* Cross-browser SWF removal
    - Especially needed to safely and completely remove a SWF in Internet Explorer
  */
  function removeSWF(id) {
    var obj = getElementById(id);
    if (obj && (obj.nodeName == "OBJECT" || obj.nodeName == "EMBED")) {
      if (ua.ie && ua.win) {
        if (obj.readyState == 4) {
          removeObjectInIE(id);
        }
        else {
          win.attachEvent("onload", function() {
            removeObjectInIE(id);
          });
        }
      }
      else {
        obj.parentNode.removeChild(obj);
      }
    }
  }
  
  function removeObjectInIE(id) {
    var obj = getElementById(id);
    if (obj) {
      for (var i in obj) {
        if (typeof obj[i] == "function") {
          obj[i] = null;
        }
      }
      obj.parentNode.removeChild(obj);
    }
  }
  
  /* Functions to optimize JavaScript compression
  */
  function getElementById(id) {
    var el = null;
    try {
      el = doc.getElementById(id);
    }
    catch (e) {}
    return el;
  }
  
  function createElement(el) {
    return doc.createElement(el);
  }
  
  /* Updated attachEvent function for Internet Explorer
    - Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
  */  
  function addListener(target, eventType, fn) {
    target.attachEvent(eventType, fn);
    listenersArr[listenersArr.length] = [target, eventType, fn];
  }
  
  /* Flash Player and SWF content version matching
  */
  function hasPlayerVersion(rv) {
    var pv = ua.pv, v = rv.split(".");
    v[0] = parseInt(v[0], 10);
    v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
    v[2] = parseInt(v[2], 10) || 0;
    return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
  }
  
  /* Cross-browser dynamic CSS creation
    - Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
  */  
  function createCSS(sel, decl) {
    if (ua.ie && ua.mac) {
      return;
    }
    var h = doc.getElementsByTagName("head")[0], s = createElement("style");
    s.setAttribute("type", "text/css");
    s.setAttribute("media", "screen");
    if (!(ua.ie && ua.win) && typeof doc.createTextNode != UNDEF) {
      s.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
    }
    h.appendChild(s);
    if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
      var ls = doc.styleSheets[doc.styleSheets.length - 1];
      if (typeof ls.addRule == OBJECT) {
        ls.addRule(sel, decl);
      }
    }
  }
  
  function setVisibility(id, isVisible) {
    var v = isVisible ? "visible" : "hidden";
    if (isDomLoaded && getElementById(id)) {
      getElementById(id).style.visibility = v;
    }
    else {
      createCSS("#" + id, "visibility:" + v);
    }
  }

  /* Filter to avoid XSS attacks 
  */
  function urlEncodeIfNecessary(s) {
    var regex = /[\\\"<>\.;]/;
    var hasBadChars = regex.exec(s) != null;
    return hasBadChars ? encodeURIComponent(s) : s;
  }
  
  /* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
  */
  var cleanup = function() {
    if (ua.ie && ua.win) {
      window.attachEvent("onunload", function() {
        // remove listeners to avoid memory leaks
        var ll = listenersArr.length;
        for (var i = 0; i < ll; i++) {
          listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
        }
        // cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
        var il = objIdArr.length;
        for (var j = 0; j < il; j++) {
          removeSWF(objIdArr[j]);
        }
        // cleanup library's main closures to avoid memory leaks
        for (var k in ua) {
          ua[k] = null;
        }
        ua = null;
        for (var l in swfobject) {
          swfobject[l] = null;
        }
        swfobject = null;
      });
    }
  }();
  
  
  return {
    /* Public API
      - Reference: http://code.google.com/p/swfobject/wiki/SWFObject_2_0_documentation
    */ 
    registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr) {
      if (!ua.w3cdom || !objectIdStr || !swfVersionStr) {
        return;
      }
      var regObj = {};
      regObj.id = objectIdStr;
      regObj.swfVersion = swfVersionStr;
      regObj.expressInstall = xiSwfUrlStr ? xiSwfUrlStr : false;
      regObjArr[regObjArr.length] = regObj;
      setVisibility(objectIdStr, false);
    },
    
    getObjectById: function(objectIdStr) {
      var r = null;
      if (ua.w3cdom) {
        var o = getElementById(objectIdStr);
        if (o) {
          var n = o.getElementsByTagName(OBJECT)[0];
          if (!n || (n && typeof o.SetVariable != UNDEF)) {
              r = o;
          }
          else if (typeof n.SetVariable != UNDEF) {
            r = n;
          }
        }
      }
      return r;
    },
    
    embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj) {
      if (!ua.w3cdom || !swfUrlStr || !replaceElemIdStr || !widthStr || !heightStr || !swfVersionStr) {
        return;
      }
      widthStr += ""; // Auto-convert to string
      heightStr += "";
      if (hasPlayerVersion(swfVersionStr)) {
        setVisibility(replaceElemIdStr, false);
        var att = {};
        if (attObj && typeof attObj === OBJECT) {
          for (var i in attObj) {
            if (attObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries
              att[i] = attObj[i];
            }
          }
        }
        att.data = swfUrlStr;
        att.width = widthStr;
        att.height = heightStr;
        var par = {}; 
        if (parObj && typeof parObj === OBJECT) {
          for (var j in parObj) {
            if (parObj[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
              par[j] = parObj[j];
            }
          }
        }
        if (flashvarsObj && typeof flashvarsObj === OBJECT) {
          for (var k in flashvarsObj) {
            if (flashvarsObj[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
              if (typeof par.flashvars != UNDEF) {
                par.flashvars += "&" + k + "=" + flashvarsObj[k];
              }
              else {
                par.flashvars = k + "=" + flashvarsObj[k];
              }
            }
          }
        }
        addDomLoadEvent(function() {
          createSWF(att, par, replaceElemIdStr);
          if (att.id == replaceElemIdStr) {
            setVisibility(replaceElemIdStr, true);
          }
        });
      }
      else if (xiSwfUrlStr && !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac)) {
        isExpressInstallActive = true; // deferred execution
        setVisibility(replaceElemIdStr, false);
        addDomLoadEvent(function() {
          var regObj = {};
          regObj.id = regObj.altContentId = replaceElemIdStr;
          regObj.width = widthStr;
          regObj.height = heightStr;
          regObj.expressInstall = xiSwfUrlStr;
          showExpressInstall(regObj);
        });
      }
    },
    
    getFlashPlayerVersion: function() {
      return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
    },
    
    hasFlashPlayerVersion: hasPlayerVersion,
    
    createSWF: function(attObj, parObj, replaceElemIdStr) {
      if (ua.w3cdom) {
        return createSWF(attObj, parObj, replaceElemIdStr);
      }
      else {
        return undefined;
      }
    },
    
    removeSWF: function(objElemIdStr) {
      if (ua.w3cdom) {
        removeSWF(objElemIdStr);
      }
    },
    
    createCSS: function(sel, decl) {
      if (ua.w3cdom) {
        createCSS(sel, decl);
      }
    },
    
    addDomLoadEvent: addDomLoadEvent,
    
    addLoadEvent: addLoadEvent,
    
    getQueryParamValue: function(param) {
      var q = doc.location.search || doc.location.hash;
      if (param == null) {
        return urlEncodeIfNecessary(q);
      }
      if (q) {
        var pairs = q.substring(1).split("&");
        for (var i = 0; i < pairs.length; i++) {
          if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
            return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
          }
        }
      }
      return "";
    },
    
    // For internal usage only
    expressInstallCallback: function() {
      if (isExpressInstallActive && storedAltContent) {
        var obj = getElementById(EXPRESS_INSTALL_ID);
        if (obj) {
          obj.parentNode.replaceChild(storedAltContent, obj);
          if (storedAltContentId) {
            setVisibility(storedAltContentId, true);
            if (ua.ie && ua.win) {
              storedAltContent.style.display = "block";
            }
          }
          storedAltContent = null;
          storedAltContentId = null;
          isExpressInstallActive = false;
        }
      } 
    }
  };
}();

window.onload=function(){

} 



//added by offshore on 05-10-2010 for highlighting tabs on Haven2011 pages starts

function rolloverTabs() {

$(".tabImage, .active-tab").hover(
function() {

this.src = this.src.replace("_off.gif","_on.gif");
},
function() {


// Only fade out if the user hasn't clicked the thumb
if(!$(this).hasClass("active-tab")) {
this.src = this.src.replace("_on.gif","_off.gif");
}
}
);		
      
}
	
//added by offshore on 05-10-2010 for highlighting tabs on Haven2011 pages ends




//added by offshore on 11-10-2010 for highlighting tabs on Haven2011 pages starts

function rolloverInfoPaneTabs() 
{
addIdsAndHidingDivider();
$("A.menuitem_over, A.menuitem_over_active").hide();
$("A.menuitem").mouseenter(function()
{
//alert("hi1");
//$('#'+this.id).hide("fast");
$("A.menuitem_over").hide();
$("A.menuitem_over_active").hide();
$('#'+this.id+'_over').show(0);

if(parseInt($("LI.menuitemactive").attr('id').replace('menu',''))==parseInt($('#'+this.id).parent('li').attr('id').replace('menu',''))-parseInt(1) 
|| parseInt($("LI.menuitemactive").attr('id').replace('menu','')) == parseInt($('.bannerNav ul > li').length-2))
    $("LI.menuitemactive").find("IMG.divider").hide();
else
    $("LI.menuitemactive").find("IMG.divider").show();
});
$("A.menuitem_over, A.menuitem_over_active").mouseleave(function()
{
//alert("hi2");
$("A.menuitem_over").hide();
$("A.menuitem_over_active").hide();
var hoverId = this.id;
hoverId = hoverId.replace("_over", "");
$('#'+hoverId).show("fast");
$('#'+hoverId+'_over').hide("fast");
if(parseInt($("LI.menuitemactive").attr('id').replace('menu',''))==parseInt($('#'+this.id).parent('li').attr('id').replace('menu',''))-parseInt(1))$("LI.menuitemactive").find("IMG.divider").show();
});

// added by offshore on 07/03/2011 to fix left hovering issue over infopane tabs
$("LI.menuouter").mouseleave(function(){

$("A.menuitem_over").hide();
$("A.menuitem_over_active").hide();
});

var videoFileName = $('#videoFileName').html();
var galleryPath = $("#imageGalleryPath").html();
$(".bannerNav ul li A#video").attr("href",$.trim(videoFileName));
$(".bannerNav ul li A#gallery").attr("href",$.trim(galleryPath));
var linkhref = $(this).attr('href');
        var widthRe = /width=[0-9]+/i;
        var heightRe = /height=[0-9]+/i;
        var dWidthVideo = 640;
        var dHeightVideo = 370;
        
        var dWidthGallery = 740;
        var dHeightGallery = 520;

        if (widthRe.test($.trim(videoFileName))) {
            dWidthVideo = parseInt(videoFileName.match(/width=[0-9]+/i)[0].replace('width=', ''));
        }
        if (heightRe.test($.trim(videoFileName))) {
            dHeightVideo = parseInt(videoFileName.match(/height=[0-9]+/i)[0].replace('height=', ''));
        }
        
        
        if (widthRe.test($.trim(galleryPath))) {
	            dWidthGallery = parseInt(galleryPath.match(/width=[0-9]+/i)[0].replace('width=', ''));
	        }
	        if (heightRe.test($.trim(galleryPath))) {
	            dHeightGallery = parseInt(galleryPath.match(/height=[0-9]+/i)[0].replace('height=', ''));
	        }
	        
	        $(".bannerNav ul li A#video").fancybox({   
							    'width':dWidthVideo,   
							    'height':dHeightVideo,   
							    'autoScale'         : false,   
							    'type'          : 'iframe',
							    'transitionIn': 'none',
                                                            'transitionOut': 'none'
							    
						});
                $(".bannerNav ul li A#gallery").fancybox({   
							 'width':dWidthGallery,   
							'height':dHeightGallery,   
							'autoScale'         : false,   
							'type'          : 'iframe',
							'transitionIn': 'none',
                                                        'transitionOut': 'none'
													    
						});


}
	
//added by offshore on 11-10-2010 for highlighting tabs on Haven2011 pages ends	

function addIdsAndHidingDivider()
{

$('.bannerNav ul > li').each(function(index) {
    if(index==0){this.id = "menutop";}
    else if(index==($('.bannerNav ul > li').length-1)){this.id = "menubottom";}
    else
        this.id = "menu" + index;
     
   
    });
    
  
    var menuOutLen = ($("LI.menuouter").length)*58 - 10;
    $("LI#menubottom").css("margin-top", menuOutLen+"px");
    
        var marginTop = $(".menuitemactive").css('margin-top');
        $(".menuitemactive").css('margin-top',parseInt(marginTop) - parseInt(5));
        
        $("LI.menuitemactive").find("IMG.divider").attr("src","/Images/NonTridion/imagenav/halfdivider.gif");
	$("LI.menuitemactive").find("IMG.divider").attr("style","margin-left:12px");
        var menulength = $('.bannerNav ul > li').length - 2;
        $("#menu"+menulength+ " .divider").css('display','none');
        //PlacesToVisitResultTabs();
        
}

function PlacesToVisitResultTabs()
{
//alert('hi');
/* added on 19/11/2010 by offshore for adding places to visit step2 info pane tab starts here*/
	  if ($("LI.PVStep2Class").length >=1)
	  {
	  var marginTop = $("LI#menubottom").css("margin-top");
	  //alert(marginTop);
	  marginTop = parseInt(marginTop)-58;
	  //alert(marginTop);
	  
	  $("LI#menubottom").css("margin-top", marginTop+"px");
	  
	  }
	  
  /* added on 19/11/2010 by offshore for adding places to visit step2 info pane tab ends here*/

}

function AccommTabsHovering()
{

            $("#divNavArea2 #accommImages li").hover(
                 function() {
                    $(this).find(".accommText").fadeIn(500);
                 },
                function() {
                    $(this).find(".accommText").fadeOut(300);
            });
}

function OurParksTabHovering(){

  // Javascript for the meganav Parks - start
            $("#megaNavMap area").hover(
                 function() {
                 
                    var areaId = $(this).attr("ID");
                    
                    var areaClass = $(this).attr("class");
                    var areaTitle = $(this).attr("title");
                    var overlayPos =  areaClass.split("_");
                    var lPos = overlayPos[0].replace("L", "") + "px";
                    var tPos = overlayPos[1].replace("T", "") + "px";
                    var imageSource = "/Images/NonTridion/MegaNavMap/" + areaId + "_hover.gif";
                    var link = $("#divNavArea1 #ParkLinks #" + areaId.replace("PARK", "LINK")).html();
                    //var link = $(".hiddenDiv a." + areaId).attr("href");
                    
                    $(this).attr("href" , link);
                    
                    $("#divNavArea1").parent().addClass("sfMapHover");
                    $("#topnav_1").parent().addClass("sfMapHover");
                    $("#divNavArea1 #ParkOverlay img").attr("src" , imageSource);
                    $("#divNavArea1 #ParkOverlay").css("left", lPos);
                    $("#divNavArea1 #ParkOverlay").css("top", tPos);
                    $("#divNavArea1 #ParkOverlay").attr("title", areaTitle);
                    $("#divNavArea1 #ParkOverlay").attr("alt", areaTitle);
                    $("#divNavArea1 #ParkOverlay").css("display", "block");
                 },
                function() {
                    $("#divNavArea1").parent().removeClass("sfMapHover");
                    $("#topnav_1").parent().removeClass("sfMapHover");
                    $("#divNavArea1 #ParkOverlay img").attr("src" , "/Images/NonTridion/MegaNavMap/blank.png");
                    $("#divNavArea1 #ParkOverlay").css("left", "0px");
                    $("#divNavArea1 #ParkOverlay").css("top", "0px");  
                    $("#divNavArea1 #ParkOverlay").attr("title", "Overlay Title");
                    $("#divNavArea1 #ParkOverlay").attr("alt", "Overlay Title");              
                    $("#divNavArea1 #ParkOverlay").css("display", "none");

            });
            
   // Javascript for the meganav Parks - end
            
}


function ThickboxBoxInit() {

	$('A.thickbox').each(function(){ 
	
	        var dWidth  = 600;   
	        var dHeight     =  800;   
	$(this).fancybox({   
	    'width':600,   
	    'height':800,   
	    'autoScale'         : false,   
	    'transitionIn'      : 'elastic',   
	    'transitionOut'     : 'elastic',   
	    'type'          : 'iframe'  
	});   
   }); 
}


function SpecialOffersPrevNextTracking()
{
var lenSpPrev = $("#specialoffershome  DIV.jcarousel-skin-offers DIV.jcarousel-container DIV.jcarousel-prev").length;
var lenSpNext = $("#specialoffershome  DIV.jcarousel-skin-offers DIV.jcarousel-container DIV.jcarousel-next").length;

if (lenSpPrev != 0)
{
$("#specialoffershome  DIV.jcarousel-skin-offers DIV.jcarousel-container DIV.jcarousel-prev").bind("click", function()
{
WEBABACUS.logclientdata('0', urlPathNameParks+"|?desc=SpecialOffers&action=LeftArrow");
});
}
if (lenSpNext != 0)
{
$("#specialoffershome  DIV.jcarousel-skin-offers DIV.jcarousel-container DIV.jcarousel-next").bind("click", function(){
WEBABACUS.logclientdata('0', urlPathNameParks+"|?desc=SpecialOffers&action=RightArrow");
});
}

}

function NewsPrevNextTracking()
{
var lenNwPrev = $("#homelatestnews  DIV.jcarousel-skin-news DIV.jcarousel-container DIV.jcarousel-prev").length;
var lenNwNext = $("#homelatestnews  DIV.jcarousel-skin-news DIV.jcarousel-container DIV.jcarousel-next").length;

if (lenNwPrev != 0)
{
$("#homelatestnews  DIV.jcarousel-skin-news DIV.jcarousel-container DIV.jcarousel-prev").bind("click", function()
{
WEBABACUS.logclientdata('0', urlPathNameParks+"|?desc=News&action=LeftArrow");
});
}
if (lenNwNext != 0)
{
$("#homelatestnews  DIV.jcarousel-skin-news DIV.jcarousel-container DIV.jcarousel-next").bind("click", function(){
WEBABACUS.logclientdata('0', urlPathNameParks+"|?desc=News&action=RightArrow");
});
}
}

function primaryMenuTabTracking()
{
primaryMenuLen = $("DIV#topnav").length;
if (primaryMenuLen != 0)
{
includeWebacus = $("DIV.noWebacus").length;   //used to check if this class is present (as in header without mega nav) so exclude webacus inclusion
if (includeWebacus == 0)
{
//alert("hi");
$("DIV#topnav>UL>LI>A").each(function(){
$(this).hover(function(){

var insideHTML = $(this).html();
insideHTML = insideHTML.replace(/\s+/g, "");
insideHTML = insideHTML.replace("&amp;", "and");
var matchParks = insideHTML.match("Park");
if (matchParks == "Park")
{
insideHTML = "Park";
}
WEBABACUS.logclientdata('0', urlPathNameParks+"|?desc=TopNav&action="+insideHTML+"Tab");
},
function(){});
});
}
}
}

function ParksTabOnclickTracking()
{
var tabLen = $("DIV.divTabElement").length;
if (tabLen != 0)
{
$("DIV.divTabElement>A").each(function(){
$(this).click(function(){
var tabTitle = $(this).attr("title");
tabTitle = tabTitle.replace(/\s+/g,"");

WEBABACUS.logclientdata('0', urlPathNameParks+"|?desc=ParkTabs&action="+tabTitle);
});
});
}
}


function DayInTheLife()
{

$("DIV.divRHSOfferDetails>A>IMG").each(function()
{

$(this).bind("click", function(){
var titleTextDay = $(this).attr("title");

titleTextDay = titleTextDay.toLowerCase();
titleTextDay = titleTextDay.replace(/\s+/g, "");

if(titleTextDay=="dayinthelife")
{
var url=window.location.pathname + "|?desc=ParkPages&action=DayintheLife";

WEBABACUS.logclientdata("0",url);
}
});


});
}

function trackMapClickOnHomePage()
{
$("A#HolidayParksTrack").click(function(){
WEBABACUS.logclientdata('0', urlPathNameParks+"|?desc=Map&action=LaunchMapOverlay");
});
}

function fillParksDropDown()
{
//debugger;
//alert("in func");
var pastOptions;
var hdPastOptions;
//var pdPastOptions;
var ccPastOptions;

var len1 = $("SELECT#myselect").length;
var len2 = $("SELECT#selHeaderPark").length;
//var len3 = $("SELECT#ucCUParkDetails_txtpark").length;
var len4 = $("SELECT#ucCUCustCare_Selecttxtpark").length;

$("DIV#parksLinkTest A").each(function(){
var idValue = this.id;
//alert(idValue);
if (idValue == null || idValue == '')
{

var value = $(this).attr("href");
var prkClass = $(this).attr("class");

var prkCode=prkClass.replace("PARK", "");
//alert("prkCode:"+prkCode);

var text = $(this).html();

text = text.replace("&amp;", "&");
//alert(text);
 //$("SELECT#myselect").append( new Option(text,value) ); 
 if (len1 !=0)
 {
 $("SELECT#myselect").html("<option value='"+value+"'>"+text+"</option>"+pastOptions); 
 pastOptions = $("SELECT#myselect").html();
 }
 if (len2 !=0)
 {
 //alert("header");
 $("SELECT#selHeaderPark").html("<option value='"+value+"'>"+text+"</option>"+hdPastOptions); 
 hdPastOptions = $("SELECT#selHeaderPark").html();
 }

 if (len4 !=0)
  {
  //alert("hi");
  $("SELECT#ucCUCustCare_Selecttxtpark").html("<option value='" + prkClass + "'>"+text+"</option>"+ccPastOptions); 
  ccPastOptions = $("SELECT#ucCUCustCare_Selecttxtpark").html();
 }
 }
 
});

sortDropDownListByText();

var testHtml  = $("#myselect").html();
var hdTestHtml = $("#selHeaderPark").html();
//var pdTestHtml = $("#ucCUParkDetails_txtpark").html();
var ccTestHtml = $("#ucCUCustCare_Selecttxtpark").html();

if (len1 !=0)
{
$("#myselect").html("<option value='#' selected='true'>View Park</option>"+testHtml);
document.getElementById("myselect").value = "#";
}

if (len2 !=0)
{
$("#selHeaderPark").html("<option value='#' selected='true'>View Park</option>"+hdTestHtml);
document.getElementById("selHeaderPark").value = "#";
}

if (len4 !=0)
{
$("#ucCUCustCare_Selecttxtpark").html("<option value='#' selected='true'>Select Park</option>"+ccTestHtml);
document.getElementById("ucCUCustCare_Selecttxtpark").value = "#";
}

}


function sortDropDownListByText() {    
// Loop for each select element on the page.
$("#myselect").each(function() {
// Keep track of the selected option.
var selectedValue = $(this).val();
// Sort all the options by text. I could easily sort these by val. 
$(this).html($("option", $(this)).sort(function(a, b) {
return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
})); 

// Select one option. 
$(this).val(selectedValue);
});


$("#selHeaderPark").each(function() {
// Keep track of the selected option.
var hdSelectedValue = $(this).val();
// Sort all the options by text. I could easily sort these by val. 
$(this).html($("option", $(this)).sort(function(a, b) {
return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
})); 
$(this).val(hdSelectedValue);
});

$("#ucCUParkDetails_txtpark").each(function() {
// Keep track of the selected option.
var pdSelectedValue = $(this).val();
// Sort all the options by text. I could easily sort these by val. 
$(this).html($("option", $(this)).sort(function(a, b) {
return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
})); 
$(this).val(pdSelectedValue);
});

$("#ucCUCustCare_Selecttxtpark").each(function() {
// Keep track of the selected option.
var ccSelectedValue = $(this).val();
// Sort all the options by text. I could easily sort these by val. 
$(this).html($("option", $(this)).sort(function(a, b) {
return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
})); 
$(this).val(ccSelectedValue);
});

}

function viewParkDropDownChange(elem)
{

var selectId = elem.id;
//alert(selectId);
selectId="SELECT#"+selectId;
var hrefSelected = $(selectId).val();
//alert(hrefSelected);
document.location.href = hrefSelected;
}

//Webabacus tracking for rhs-offer

function RHSOfferLinkExtUrlTracking()
{
 $(".rhs-offer a#rhs-offer-HolidayOwnership").bind("click", function (){

var rhsOfferLinkHref = $(".rhs-offer a#rhs-offer-HolidayOwnership").attr("href");



var LinkHrefHostName=rhsOfferLinkHref.indexOf('http://');

if (LinkHrefHostName==-1)
 { 
  rhsOfferLinkHref="http:" + "//" + urlHostName + rhsOfferLinkHref;
 }


if (rhsOfferLinkHref != null && rhsOfferLinkHref != "")
      {
      
      if (rhsOfferLinkHref.match(urlHostName))
      {
      
      }
      
      else
      {
      
              WEBABACUS.logclientdata('0', urlPathNameParks+"/CustomEvent=extURL&URL="+rhsOfferLinkHref+"ClickType=Left&desc=homepage");
              
      }
      
      }

 } );
  }
  
  
  function OnHoverFadingEffect()
  {
                 $("#topnav #topnav_1, #topnav #topnav_2, #topnav #topnav_3").hover(
  
                  function() {
                       	  var divHeight = 800;
                       	  if($("#outer").height() != null)
                       	  {
                       	  	divHeight =  $("#outer").height() - 83;
                       	  }
                       	  else if($("#mainPageWrapperInner").height() != null)
                       	  {
                       	  	divHeight =  $("#mainPageWrapperInner").height() - 83;
                       	  }
                       	  
                          var height = divHeight - 83;  
                          $("#topNavCover").css("height", height + "px");  
                          $("#topNavCover").css("min-height", height + "px");  
                          $("#topNavCover").css("display", "block");                        
                            
                   },
  
                  function() {                     
                       $("#topNavCover").css("display", "none");   
                  }); 
                  
                  //force hiding the top cover
                  $("#topNavCover").hover(
                        function(){
                            $("#topNavCover").css("display", "none");
                        },
                        
                        function(){
                        }
                  );
                  

  }
  
  function RHSPromoBoxClick(pId)
  {
  //alert(pId);
  //alert($("#"+pId).attr("title"));
  var descVal = $("#"+pId).attr("title"); 
  descVal = descVal.replace("&amp;", "and");
  descVal = descVal.replace("/\s/", "");
  descVal = descVal.replace("-", "");
  WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc='+descVal+'&action=PromoBox');
  }
  
  
  function  SPFancyBoxInit()
  {
  
  $('a[rel*=spFancyBox]').click(function(ev){
  $("A.fancyboxClose").css("display", "inline");
  });
  
  
  	$('a[rel*=spFancyBox]').fancybox({
  		modal: true,
  		onStart: fancyboxStartSP,
  		titleShow : false,
  		scrolling : 'no',
  		showNavArrows : false
  		
  	});
  	
  	$("A#fancybox-close").show();
  	$("A#fancybox-close").addClass("fancyboxClose");
  	$("A.fancyboxClose, DIV#fancybox-overlay").click(function() {
  		$.fancybox.close();
  		$("DIV.offerPopupDiv").hide();
  		return false;
  	});
  
  }
  
function SPHelpFancyBoxInit() {
	// 2011/03/28 - added by Haven (wislam) for Offers Results - 'help'
	$('a[rel*=spHelpFancyBox]').fancybox({
		//modal: true,
		onStart: fancyboxStartSP,
		titleShow : false,
		scrolling : 'yes',
		autoDimensions:false,
		width:480,
		showNavArrows : false
	});
}
  
  function fancyboxStartSP() {
  	var showMe = $(this).attr("href");
  //	alert(showMe);
  	var showID = showMe.split("#");
  //	alert(showID[1]);
  $("DIV#"+showID[1]).css("border", "none");
  $("DIV#"+showID[1] + " DIV.offerPopupWrapper DIV.offerPopupButton DIV.closeTextDiv").hide();
  $("DIV#"+showID[1] + " DIV.offerPopupWrapper DIV.offerPopupButton DIV.closeBtnDiv").hide();
  $("DIV#"+showID[1] + " DIV.offerPopupWrapper DIV.offerPopupButton").hide();
  
    	$("DIV#" + showID[1]).show();
}
  
  
  
/* Following are the tracking functions moved from webabacus-tag.js on 24/11/2010 for the Haven optimization starts here */
  
  /* Events for Web Abacus Tracking added 27 oct */  
  
  function HighlightsPanel_highlights_open()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=highlights&action=open');
     //alert('test H');
     return true;
  } 
  
  function HighlightsPanel_takeatour_open()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=takeatour&action=open');
     //alert('test T');
     return true;
     
  }
  
  function HighlightsPanel_takeatour_video()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=takeatour&action=video');
     //  alert('Video');
     return true;
  
  }
  
  function HighlightsPanel_takeatour_imagegallery()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=takeatour&action=imagegallery');
     //alert('ImageGallery');
     return true;
     
  }
  
  function HighlightsPanel_takeatour_360()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=takeatour&action=360');
     //  alert('360');
     return true;
     
  }
  
  function HighlightsPanel_takeatour_parkTour()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=takeatour&action=ParkTour');
     //alert('ParkTour');
     return true;
     
  }
  
  function HighlightsPanel_takeatour_Map()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=takeatour&action=LocationMap');
     //alert('Map');
     return true;
     
  }
  
  function HighlightsPanel_takeatour_Highlights()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=takeatour&action=Highlights');
     //alert('Highlights');
     return true;
     
  }
  
  function HighlightsPanel_takeatour_DayinLife()
  {
     
     WEBABACUS.logclientdata('0','/parkpage|?event=highlightspanel&description=takeatour&action=DayInLife');
     //alert('Day in life');
     return true;
     
  }
  
  function OfferSearchNoResult()
  {
     
     WEBABACUS.logclientdata('0','/offerresult|?event=SearchOfferl&description=OfferSearchResult&action=NoResult');
    // alert('No Result');
     return true;
     
  }
  
  function ExperiencePanel_images_Open()
  {
     
     WEBABACUS.logclientdata('0','/homepage|?event=Experiencepanel&description=Images&action=open');
     return true;
     //alert('test');
  }
  
  function OurParkPanel_HomeMap_Open()
  {
     
     WEBABACUS.logclientdata('0','/homepage|?event=OurParkPanel&description=HomeMap&action=open');
     return true;
     //alert('test');
  }
  
  function AccomodationPanel_HavenAccommodation_Open()
  {
     
     WEBABACUS.logclientdata('0','/homepage|?event=AccomodationPanel&description=HavenAccommodation&action=open');
     return true;
     //alert('test');
  }
  
  function HavenHome_Booking()
  {
     
     HomePageBooking=1;
     
     //alert(HomePageBooking);
     return true;
  }
  
           function ViewOffers_Load(link)
  	    {
  	   
  	    var urlViewMore = link;
  
              var Offertyperef = Param_Eval(urlViewMore,'offertype');
              //alert(Offertyperef);
              var Holidaytype = Param_Eval(urlViewMore,'holidaytype');
              //alert(Holidaytype);
              var Linkname = Holidaytype+"_"+Param_Eval(urlViewMore,'duration')+"nght";
              //alert(Linkname);
                 WEBABACUS.logclientdata('0','/SearchResults|?LateOfferRef=Offertyperef&LateOfferType=Holidaytype&LateLinkname=Linkname');
  		//alert('Hi Abecus');
       	     return true;  
  	    }
  
           function BookNow_Load(link)
  	    {
  	    
  	      var urlViewMore = link;
                var lateOfferRef = Param_Eval(urlViewMore,'offertyperef');
                //alert(lateOfferRef);
                var lateOfferType = Param_Eval(urlViewMore,'offertypename');
                // alert(lateOfferType);
                 WEBABACUS.logclientdata('0','/SearchResults|?LateOfferRef=lateOfferRef&LateOfferType=lateOfferType'); 
                //alert('Hi');
   	       return true;
  	    }      
  
  	    function Param_Eval(urlViewMore,paramName)
  	    {
  	      
  	      var paramName= paramName;
  	     
  	      var posParamTypeParamBegin = urlViewMore.indexOf(paramName);
  	       
  	      var posParamTypeValueBegin = posParamTypeParamBegin + paramName.length + 1;
  	      
  	      var strParamTypeToEnd = urlViewMore.slice(posParamTypeValueBegin);
  	        
  	      var posParamTypeValueEnd = strParamTypeToEnd.indexOf("&");
  	      
  	      if(posParamTypeValueEnd == -1)
  	      {
  	        return strParamTypeToEnd;
  	      }
  	      else
  	      {
  	         var strParamTypeVal = strParamTypeToEnd.substring(0, posParamTypeValueEnd);
         
  	         return strParamTypeVal;
  	      }
  	    }
  
  	   function ParkDropDown(parkDropDown)
             {
             
             var selIndex = parkDropDown.selectedIndex;
             var parkName = parkDropDown.options[selIndex].text;   
             WEBABACUS.logclientdata('0','/ParkName|?linkname=ParkDropDown&parkname=' + parkName); 
             //alert("Webapacus called dropdown : " +  '/ParkName|?linkname=ParkDropDown&parkname=' + parkName);
             return true;             
            }
  
            function ParkLinkRegionPg(parkName)
            {
               //alert(parkName);	
               WEBABACUS.logclientdata('0','/ParkName|?linkname=parklist&parkname=' + parkName);
               //alert("Webapacus called Region Page:" + '/ParkName|?linkname=parklist&parkname=' + parkName);
               return true;
            }
            
            function ParkLinkHome(parkName)
            {
               //alert(parkName);
               WEBABACUS.logclientdata('0','/ParkName|?linkname=Parkmaphome&parkname=' + parkName);
               //alert("Webapacus called Home :" + '/ParkName|?linkname=Parkmaphome&parkname=' + parkName);
               return true;
            }
  
            function ParkLinkOurPark(parkName)
            {
               //alert(parkName);	
               WEBABACUS.logclientdata('0','/ParkName|?linkname=Parkmappark&parkname=' + parkName);
               //alert("Webapacus called Park : " + '/ParkName|?linkname=Parkmappark&parkname=' + parkName);
               return true;   
              
            }
             
            function NewsLetterSubmit()
            {
               var loct= location.href;
               var loctionRegExp=new RegExp("^(.*?)(([.]co[.]uk/)|([.]com/)|([.]org/)|(localhost/))", "gim");
               if(loct.search(loctionRegExp) >= 0)
               {
                loct = "/" + loct.replace(loctionRegExp, "");
               } 
               var loctionRegExpEnd=new RegExp("[?](.*?)$", "gim");
               loct = loct.replace(loctionRegExpEnd, "");             
               WEBABACUS.logclientdata("0",loct + "|?event=emailsignup");
               //alert(loct + "|?event=emailsignup");
               return true;   
              
            }   
            
/* Events for Web Abacus ends*/ 

/* Following are the tracking functions moved from webabacus-tag.js on 24/11/2010 for the Haven optimization ends here */
  
  
/* THIS IS "ParksAnimation.js" added on 24/11/2010 for HAVEN OPTIMIZATION ends here ****/




/* THIS IS "Calendar.js" added on 24/11/2010 for HAVEN OPTIMIZATION starts here ****/
var disabledDays = new Array();
var passDates = "";
var StartDates = "";
var EndDates = "";

var disabledDateLength;
$(document).ready(function(){
BindCalendarForSpecialOffers();
bindCalendar();
//debugger;
});

var minCalDate = new Date();   
//change this min date to +0 after 1st march to avoid showing old dates

function bindCalendar(){


    $(".searchBoxElement .txtDateCls").datepicker({ yearRange: "2011-2012", minDate: new Date(StartDates), maxDate: new Date(EndDates), defaultDate: "", dateFormat: "dd/mm/yy", nextText: "N", prevText: "P", hideIfNoPrevNext: true, beforeShowDay: noWeekendsOrHolidays, showStatus: false, firstDay: 1, changeFirstDay: false, initStatus: "", dayStatus: "", statusForDate: describeDate, helpText: "<div class='dpHelpText' style='font-size:0.8em;text-align:left;background-color:#FAEAC8;'><strong>Standard Arrival Dates</strong><br />Monday 4 nights | Saturday 7 nights<br />Friday 3 &amp; 7 nights</div>", weekStatus: "" });
    $(".txtDateClsNoRes").datepicker({ yearRange: "2011-2012", minDate: new Date(StartDates), maxDate: new Date(EndDates), defaultDate: "", dateFormat: "dd/mm/yy", nextText: "N", prevText: "P", hideIfNoPrevNext: true, beforeShowDay: noWeekendsOrHolidays, showStatus: false, firstDay: 1, changeFirstDay: false, initStatus: "", dayStatus: "", statusForDate: describeDate, helpText: "<div class='dpHelpText' style='font-size:0.8em;text-align:left;background-color:#FAEAC8;'><strong>Standard Arrival Dates</strong><br />Monday 4 nights | Saturday 7 nights<br />Friday 3 &amp; 7 nights</div>", weekStatus: "" });
    
    $(".arrDtTextBox").datepicker({ yearRange: "2011-2012", minDate: minCalDate, maxDate: new Date(2012, 10 - 1, 26), defaultDate: "", dateFormat: "dd/mm/yy", nextText: "N", prevText: "P", hideIfNoPrevNext: true, beforeShowDay: nationalDays, showStatus: true, firstDay: 1, changeFirstDay: false, initStatus: "", dayStatus: "", statusForDate: describeDate, helpText: '<div class="holidayHelpText">Bank Holidays are marked in yellow</div>', weekStatus: "" });
    
    //$(".arrivalDateContainerTxtBox").datepicker({yearRange:"2011-2012",minDate:minCalDate,maxDate:new Date(2012,10-1,26),defaultDate:"",dateFormat:"dd/mm/yy",nextText:"N",prevText:"P",hideIfNoPrevNext:true,beforeShowDay:nationalDays,showStatus:true,firstDay:1,changeFirstDay:false,initStatus:"",dayStatus:"",statusForDate:describeDate,helpText:'<div class="holidayHelpText">Bank Holidays are marked in yellow</div>',weekStatus:""});
    $(".arrivalDateContainerTxtBox").datepicker({ yearRange: "2012", minDate: new Date(2012, 3 - 1, 16), maxDate: new Date(2012, 11 - 1, 04), defaultDate: "", dateFormat: "dd/mm/yy", nextText: "N", prevText: "P", hideIfNoPrevNext: true, beforeShowDay: nationalDays, showStatus: true, firstDay: 1, changeFirstDay: false, initStatus: "", dayStatus: "", statusForDate: describeDate, helpText: '<div class="holidayHelpText">Bank Holidays are marked in yellow</div>', weekStatus: "" });

    $(".rightLocationBookThirdDdl .ddlYear").datepicker({ yearRange: "2011-2012", minDate: minCalDate, maxDate: new Date(2012, 10 - 1, 26), defaultDate: "", dateFormat: "dd/mm/yy", nextText: "N", prevText: "P", hideIfNoPrevNext: true, beforeShowDay: nationalDays, showStatus: true, firstDay: 1, changeFirstDay: false, initStatus: "", dayStatus: "", statusForDate: describeDate, helpText: '<div class="holidayHelpText">Bank Holidays are marked in yellow</div>', weekStatus: "" });

    $(".rightLocationBookFirstDdlNew .ddlYear").datepicker({ yearRange: "2011-2012", minDate: minCalDate, maxDate: new Date(2012, 10 - 1, 26), defaultDate: "", dateFormat: "dd/mm/yy", nextText: "N", prevText: "P", hideIfNoPrevNext: true, beforeShowDay: nationalDays, showStatus: true, firstDay: 1, changeFirstDay: false, initStatus: "", dayStatus: "", statusForDate: describeDate, helpText: '<div class="holidayHelpText">Bank Holidays are marked in yellow</div>', weekStatus: "" });
    
    $(".arrDtTextBox").attr("readOnly",true);$(".arrivalDateContainerTxtBox").attr("readOnly",true);
    
    $(".rightLocationBookThirdDdl .ddlYear").attr("readOnly",true);$(".rightLocationBookFirstDdlNew .ddlYear").attr("readOnly",true);
    
    
    
    
}


function BindCalendarForSpecialOffers()
{

if ($("INPUT.PassDates").length > 0)
{
passDates = $("INPUT.PassDates").val();
StartDates = $("INPUT.StartDate").val();
EndDates = $("INPUT.EndDate").val();

//alert(pastDates);
//alert(StartDates);
//alert(EndDates);

disabledDays = passDates.split(",");
//alert("pastDaysArray::"+disabledDays);
disabledDateLength = disabledDays.length;
}
}

natDays = [
/*2011*/[1, 3, 2011, "NYD", "New Year Day"], [4, 22, 2011, "GFD", "Good Friday"], [4, 25, 2011, "ESD", "Easter Monday"], [4, 29, 2011, "ESD", "Royal Wedding Holiday"], [5, 2, 2011, "EMD", "Early May Bank Holiday"], [5, 30, 2011, "SPH", "Spring Bank Holiday"], [8, 29, 2011, "SUM", "Summer Bank Holiday"], [12, 26, 2011, "CHD", "Christmas Day"], [12, 27, 2011, "BXD", "Boxing Day"],
/*2012*/[1, 2, 2012, "NYD", "New Year Day"], [4, 6, 2012, "GFD", "Good Friday"], [4, 9, 2012, "ESD", "Easter Monday"], [5, 7, 2012, "EMD", "Early May Bank Holiday"], [6, 4, 2012, "SPH", "Spring Bank Holiday"], [6, 5, 2012, "SPH", "Queens Diamond Jubilee"], [8, 27, 2012, "SUM", "Summer Bank Holiday"], [12, 25, 2012, "CHD", "Christmas Day"], [12, 26, 2012, "BXD", "Boxing Day"]
];


/* utility functions */
function nationalDaysNew(date) {
  var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
  //console.log('Checking (raw): ' + m + '-' + d + '-' + y);
  for (i = 0; i < disabledDays.length; i++) {
    if($.inArray((m+1) + '-' + d + '-' + y,disabledDays) != -1 || new Date() > date) {
      //console.log('bad:  ' + (m+1) + '-' + d + '-' + y + ' / ' + disabledDays[i]);
      return [true];
    }
  }
  //console.log('good:  ' + (m+1) + '-' + d + '-' + y);
  return [false];
}
function noWeekendsOrHolidays(date) {
  //var noWeekend = jQuery.datepicker.noWeekends(date);
  //return noWeekend[0] ? nationalDaysNew(date) : noWeekend;
  return nationalDaysNew(date);
}

function changeDate()
{
var months = new Array(12);
months[0] = "Jan";
months[1] = "Feb";
months[2] = "Mar";
months[3] = "Apr";
months[4] = "May";
months[5] = "Jun";
months[6] = "Jul";
months[7] = "Aug";
months[8] = "Sep";
months[9] = "Oct";
months[10] = "Nov";
months[11] = "Dec";
//alert($(".ddlYear").val());
var chnagedDate = $(".txtDateCls").val();
var chdnDateArray = new Array();
chdnDateArray = chnagedDate.split("/");
var day = chdnDateArray[0];
var month = chdnDateArray[1];
//alert(month);
if (parseInt(month) <10)
{
month = month.replace("0", "");
}
var newmonth = months[parseInt(month)-1];
var year = chdnDateArray[2];
if (parseInt(day)<10)
{
day = day.replace("0", "");
}
//alert(day);
//alert(newmonth);
//alert(year);
$("select.ddlDay").val(day);
$("select.ddlMonth").val(newmonth+" "+year);
}




function nationalDays(B)
{
//debugger;
//alert(B);
    var C="";
    var A=true;
    if((B.getMonth()==0)||(B.getMonth()==1)||(B.getMonth()==11)||(B.getFullYear()==2012 & (B.getMonth()==2)&&(B.getDate()<16)) || (B.getFullYear()==2011 & (B.getMonth()==2)&&(B.getDate()<18)))
    {
        C="DisabledDate";
        A=false;
    }
    for(i=0;i<natDays.length;i++)
        {
        //alert(B.getMonth()+","+natDays[i][0]-1+","+B.getDate()+","+natDays[i][1]+","+B.getFullYear()+","+natDays[i][2]);
            if((B.getMonth()==natDays[i][0]-1) && B.getDate()==natDays[i][1]&&B.getFullYear()==natDays[i][2])
                {
                    if(C=="DisabledDate")
                        {
                            C="DisabledDate BankHoliday"+natDays[i][3];
                        }
                   else
                        {
                            C="BankHoliday"+natDays[i][3];}break;
                        }
                 }
           return[A,C];
        }
   
    function describeDate(A)
        {
            for(i=0;i<natDays.length;i++)
            {
                if(A.getMonth()==natDays[i][0]-1&&A.getDate()==natDays[i][1]&&A.getFullYear()==natDays[i][2])
                    {
                        return"<div>"+natDays[i][4]+"</div>";
                    }
            }
            return"";
        }
    function ShowCal()
        {
            var A=document.getElementById("hdnCalBtnClicked");
            if(A.value=="1"){}document.getElementById("hdnCalBtnClicked").value="0";
        }
    function ShowCalOnOffers(){}
    
    
  function SpecialOffersTagging(desc, action, p, s)
  {
   var tagContent = "|?desc="+desc+"&action="+action;
  var position1 = p;
  var sorttype1 = s;
 //alert(tagContent);
  if (position1 != null && position1 != 'undefined' && position1 != "")
  {
  tagContent = tagContent + "&Position="+position1;
  }
  if (sorttype1 != null && sorttype1 != 'undefined' && sorttype1 != "")    
  {
    tagContent = tagContent + "&SortType="+sorttype1;
  }
  
  if (($(".SearchButtonCls").length > 0) && ($(".SearchButtonCls").css("display") == "none"))
    	    {
    	    //alert('hi1');
    	    WEBABACUS.logclientdata('0',urlPathNameParks+window.location.search+tagContent);
    	    }
    	    else if ($(".filterButtonCls").length <= 0)
    	    {
    	    //alert('hi2.1');
    	    WEBABACUS.logclientdata('0',urlPathNameParks+window.location.search+tagContent);
    	   //alert('hi2.2');
    	     }
    	     //alert(tagContent);
  

  }
  function RedEyeTagOnPageLoadSP()
  {
  var RedValue = CustomTagOnPageLoad();
  redEyeTagFireOnPageLoadSP(RedValue);
  
  }
  
  
  function redEyeTagFireOnPageLoadSP(a)
  	    {
  	    
  	    var ClickTagArray = new Array();
  	    
  	    var HostName = encodeURIComponent(window.location.host) + encodeURIComponent(window.location.pathname);

             ClickTagArray = a.split(",");
             ClickTagArray[5] = ClickTagArray[5].replace(/\|/g, ",");
             ClickTagArray[4] = ClickTagArray[4].replace(/\|/g, ",");

             
             var durationVal = '';
             if (ClickTagArray[6] != '')
             {
             durationVal = ClickTagArray[6]+" Nights";
             
             }
             
             var detectTourFlag = detectTouringSpecialOffers();
             if (detectTourFlag == "1")
             {
             var redEyeContent ="&tour_spec_regions="+escape(ClickTagArray[4])+"&tour_spec_parks="+escape(ClickTagArray[5])+"&tour_spec_arrival="+escape(ClickTagArray[2])+"&tour_spec_duration="+escape(durationVal);
             }
             else
             {
             var redEyeContent ="&spec_regions="+escape(ClickTagArray[4])+"&spec_parks="+escape(ClickTagArray[5])+"&spec_arrival="+escape(ClickTagArray[2])+"&spec_duration="+escape(durationVal);
             
             }
             
             var urlRequest = "http://reporting.havenholidays.com/cgi-bin/rr.cgi/images/blank.gif?"+"nourl="+(HostName)+redEyeContent;  
                          
             $("IMG#redEyeIMGSearchOffers").attr("src", urlRequest);
  	    }
	    
  
  
  
  function CustomTagOnPageLoad()
  {
  var qarrivalDate = '';
  var qFlexibility = '';
  var qDuration= '';
  var qAccommsSelectedList = '';
  var qPricesSelectedList = '';
  var qRegionsParksSelectedList = '';
  var qParksSelectedList = '';
  var RegionArry = new Array();
  var ParkArry = new Array();
  
  if((querySt("region") != null) && (strTrim(querySt("region")) != ''))
        {
        	qRegionsParksSelectedList = querySt("region");
        	
      }
      if((querySt("duration") != null) && (strTrim(querySt("duration")) != ''))
              {
              	qDuration = querySt("duration");
      }
      if((querySt("arrivaldate") != null) && (strTrim(querySt("arrivaldate")) != ''))
              {
              	qarrivalDate = querySt("arrivaldate");
      }
      if((querySt("accommodation") != null) && (strTrim(querySt("accommodation")) != ''))
              {
              	qAccommsSelectedList = querySt("accommodation");
      }
      if((querySt("price") != null) && (strTrim(querySt("price")) != ''))
              {
              	qPricesSelectedList = querySt("price");
      }
      if((querySt("dateVariance") != null) && (strTrim(querySt("dateVariance")) != ''))
                    {
                    	qFlexibility = querySt("dateVariance");
      }
      if((querySt("parks") != null) && (strTrim(querySt("parks")) != ''))
                          {
                          	qParksSelectedList = querySt("parks");
      }
      //alert(qPricesSelectedList);
      //qRegionsParksSelectedList = '';
      //if (qRegionsParksSelectedList ! = 'undefined' && qRegionsParksSelectedList != '' && qParksSelectedList != 'undefined' && qParksSelectedList != '')
      //debugger;
      if (qParksSelectedList != 'undefined' && qParksSelectedList != null && qParksSelectedList != '')
      {
      qRegionsParksSelectedList = qRegionsParksSelectedList + "," + qParksSelectedList;
      }
      //alert(qRegionsParksSelectedList);
      var retValues = SpecialOffersCustomTagging(qarrivalDate, qFlexibility, qDuration, qAccommsSelectedList, qPricesSelectedList, qRegionsParksSelectedList);
      return retValues;
      
  }
  
  function SpecialOffersCustomTagging(arrivalDate, Flexibility, Duration, AccommsSelectedList, PricesSelectedList, RegionsParksSelectedList)
  {
  //debugger;
  var wabasesite = '';
             var SpecialOffersSearchSource = '';
             var SpecialOffersDay = '';
             var SpecialOffersMonth = '';
             var SpecialOffersFlexibility = '';
             var SpecialOffersRegion = '';
             var SpecialOffersPark = '';
             var SpecialOffersDuration = '';
             var SpecialOffersAccomodation = '';
             var SpecialOffersPrice = '';
             var SpecialOffersDate = '';
             var temDayArray = new Array();
             var temRegionArray = new Array();
             var temAccommArray = new Array();
             var temPriceArray = new Array();
             var tempRegion ='';
             var tempPark ='';
             var tempAccomm ='';
             var tempPrice ='';
             var SpecialOfferType = '';
             var websiteName = '';
             //debugger;
             var detectTourFlag = detectTouringSpecialOffers();
             if (detectTourFlag == "1")
             {
             SpecialOfferType = "TC";
             websiteName = "touring";
             }
             else
             {
             SpecialOfferType = "SC";
             websiteName = "haven";
             }
             var displayStat =  $(".filterButtonCls").css("display");
         if ($(".filterButtonCls").length > 0 && (displayStat == "block" || displayStat == "inline" ||  displayStat == "inline-block"))
         {
         SpecialOffersSearchSource = "SpecialOffersResults"+SpecialOfferType;
         }
         else
         {
         SpecialOffersSearchSource = "SpecialOffersMain"+SpecialOfferType;
         }
         if (arrivalDate != null && arrivalDate != 'undefined' && arrivalDate != 'dd/mm/yyyy' && arrivalDate != '')
         {
         temDayArray = arrivalDate.split('/');
         SpecialOffersDay = temDayArray[0];
         SpecialOffersMonth = temDayArray[1];
         SpecialOffersDate = arrivalDate;
         
         }
         if (Flexibility != null && Flexibility != 'undefined' && Flexibility != '')
         {
         SpecialOffersFlexibility = Flexibility;
         }
         if (Duration != null && Duration != 'undefined' && Duration != '')
         {
         SpecialOffersDuration = Duration;
         }
         if (AccommsSelectedList != null && AccommsSelectedList != 'undefined' && AccommsSelectedList != '')
         {
         if (AccommsSelectedList == "Accomm_Default" )
         {
         AccommsSelectedList = "All Found";
         }
         else
         {
         if (AccommsSelectedList.match(",") != null && AccommsSelectedList.match(",")[0] != null && AccommsSelectedList.match(",").index > 0)
	          {
	          
	          temAccommArray = AccommsSelectedList.split(",");
	          
	          for(i =0; i<temAccommArray.length; i++)
	          {
	          
	          
	          temAccommArray[i] = temAccommArray[i].replace("Accomm_", "");
	          tempAccomm = tempAccomm + "|" + $("INPUT#Accomm_"+temAccommArray[i]).parent().html().replace(/\<(.*?)\>/g,'');
	          
	         
	          
	          
	          }
	          
                  }
                  else
                  {
                  if (AccommsSelectedList != '')
                  {
                  AccommsSelectedList = AccommsSelectedList.replace("Accomm_", "");
                  tempAccomm = tempAccomm + "|" + $("INPUT#Accomm_"+AccommsSelectedList).parent().html().replace(/\<(.*?)\>/g,'');
                  }
                  }
         
         
         //AccommsSelectedList = AccommsSelectedList.replace(/\,/g,"|");
         }
         SpecialOffersAccomodation = trimSO(tempAccomm);
         }
         if (PricesSelectedList != null && PricesSelectedList != 'undefined' && PricesSelectedList != '')
         {
         //debugger;
         if (PricesSelectedList == "Price_Default")
         {
         PricesSelectedList = "All Found";
         }
         else
         {
         
         if (PricesSelectedList.match(",") != null && PricesSelectedList.match(",")[0] != null && PricesSelectedList.match(",").index >= 0)
         
         {
	 	          
	 	          temPriceArray = PricesSelectedList.split(",");
	 	          
	 	          for(i =0; i<temPriceArray.length; i++)
	 	          {
	 	          
	 	          
	 	          //temPriceArray[i] = temPriceArray[i].replace("_", "");
	 	          tempPrice = tempPrice + "|" + $("INPUT#"+temPriceArray[i]).parent().html().replace(/\<(.*?)\>/g,'');
	 	          
	 	         
	 	          
	 	          
	 	          }
	 	          
          }
          else
	                    {
	                    if (PricesSelectedList != '')
	                    {
	                    PricesSelectedList = PricesSelectedList.replace("Accomm_", "");
	                    tempPrice = tempPrice + "|" + $("INPUT#"+PricesSelectedList).parent().html().replace(/\<(.*?)\>/g,'');
	                    }
                  }
          //PricesSelectedList = PricesSelectedList.replace(/\,/g,"|");
         }
         
         SpecialOffersPrice = trimSO(tempPrice);
         }
        // alert(RegionsParksSelectedList);
         if (RegionsParksSelectedList != null && RegionsParksSelectedList != 'undefined' && RegionsParksSelectedList != '')
         {
         //debugger;
         if (RegionsParksSelectedList == "Region_Default" || RegionsParksSelectedList == "Any")
         {
         tempRegion = "Any Region";
         tempPark = "";
         }
         else
         {
         if (RegionsParksSelectedList.match(",") != null && RegionsParksSelectedList.match(",")[0] !=null && RegionsParksSelectedList.match(",").index >= 0)
         {
         
         temRegionArray = RegionsParksSelectedList.split(",");
         
         for(i =0; i<temRegionArray.length; i++)
         {
         
         if (temRegionArray[i].match(/\d{1,}/g) != null && temRegionArray[i].match(/\d{1,}/g)[0] != null)
         {
         
         temRegionArray[i] = temRegionArray[i].replace("Region_", "");
         tempRegion = tempRegion + "|" + $("INPUT#Region_"+temRegionArray[i]).parent().find("A").html();
         
         //tempRegion = tempRegion + "|" + temRegionArray[i];
         }
         else
         {
         temRegionArray[i] = temRegionArray[i].replace("Park_", "");
         //debugger;
         if (temRegionArray[i] != 'undefined' && temRegionArray[i] != '' && temRegionArray[i] !="Any" && temRegionArray[i] !="Region_Default")
         {
         tempPark = tempPark + "|" + $("INPUT#Park_"+temRegionArray[i]).parent().html().replace(/\<(.*?)\>/g,'');
         }
         //tempPark = tempPark + "|" + temRegionArray[i];
         }
         
         }
         
         }
         }
         SpecialOffersRegion = trimSO(tempRegion);
         SpecialOffersPark = trimSO(tempPark);
         //alert(SpecialOffersRegion);
         //alert(SpecialOffersPark);
         }
         //debugger;
         if ($(".ParkNameForRedEyeHdnCls").html() == '')
         {
         if (SpecialOffersRegion == "")
         {
         SpecialOffersRegion = "Any Region";
         SpecialOffersPark = "";
         }
         }
	      
	      if (SpecialOffersAccomodation == "")
	               {
	               SpecialOffersAccomodation = "All Found";
	               
         		}
         		if (SpecialOffersPrice == "")
				               {
				               SpecialOffersPrice = "All Found";
				               
         		}
	            //alert(websiteName+" , "+SpecialOffersSearchSource +","+ SpecialOffersDay+","+ SpecialOffersMonth+","+ SpecialOffersFlexibility+","+ SpecialOffersDuration+","+ SpecialOffersAccomodation+","+ SpecialOffersPrice+" , "+SpecialOffersRegion+" , "+SpecialOffersPark);
		  //  var wacustomvarnames  = new Array("wabasesite","SpecialOffersSearchSource", "SpecialOffersDay", "SpecialOffersMonth", "SpecialOffersFlexibility", "SpecialOffersRegion", "SpecialOffersPark", "SpecialOffersDuration", "SpecialOffersAccomodation", "SpecialOffersPrice");
		  //  var wacustomvarvalues = new Array(websiteName, SpecialOffersSearchSource, SpecialOffersDay, SpecialOffersMonth, SpecialOffersFlexibility, SpecialOffersRegion,SpecialOffersPark, SpecialOffersDuration, SpecialOffersAccomodation, SpecialOffersPrice);         
		   // WEBABACUS.attachOnClickExternalLink();
                   // WEBABACUS.logclientdata('02');
	           var retValueNew = websiteName+","+ SpecialOffersSearchSource+","+ SpecialOffersDate+","+  SpecialOffersFlexibility+","+  SpecialOffersRegion+","+ SpecialOffersPark+","+  SpecialOffersDuration+","+ SpecialOffersAccomodation+","+  SpecialOffersPrice;
	        return retValueNew;      
             
       // alert(RegionsParksSelectedList);
            // 
  
  }
  
  function RegionParksSeperation(r)
  {
  var RegionsParksSelectedList = r;
  var temRegionArray = new Array();
  var tempRegion = '';
  var tempPark = '';
  if (RegionsParksSelectedList != null && RegionsParksSelectedList != 'undefined' && RegionsParksSelectedList != '')
           {
           //debugger;
           if (RegionsParksSelectedList == "Region_Default" || RegionsParksSelectedList == "Any")
           {
           tempRegion = "Any";
           tempPark = "";
           }
           else
           {
           if (RegionsParksSelectedList.match(",") != null && RegionsParksSelectedList.match(",")[0] !=null && RegionsParksSelectedList.match(",").index >= 0)
           {
           
           temRegionArray = RegionsParksSelectedList.split(",");
           
           for(i =0; i<temRegionArray.length; i++)
           {
           
           if (temRegionArray[i].match(/\d{1,}/g) != null && temRegionArray[i].match(/\d{1,}/g)[0] != null)
           {
           
           temRegionArray[i] = temRegionArray[i].replace("Region_", "");
           
           
           tempRegion = tempRegion + "|" + temRegionArray[i];
           }
           else
           {
           temRegionArray[i] = temRegionArray[i].replace("Park_", "");
           //debugger;
           if (temRegionArray[i] != 'undefined' && temRegionArray[i] != '' && temRegionArray[i] !="Any" && temRegionArray[i] !="Region_Default")
           {
           tempPark = tempPark + "|" + temRegionArray[i];
           }
           
           }
           
           }
           
           }
           }
           tempRegion = trimSO(tempRegion);
           tempPark = trimSO(tempPark);
          
         }

return tempRegion + "," +tempPark;
  
  }
  
  function trimSO(stringToTrim) {
  	return stringToTrim.replace(/^\||\|$/g,"");
  }


/* THIS IS "Calendar.js" added on 24/11/2010 for HAVEN OPTIMIZATION ends here ****/

function setRegionFilterSession(regionId, categoryId, monthId, attributeId)
{

   //alert(regionId);
    var qdata = {opType: "SET", REGION: regionId, CATEGORY: categoryId, MONTH:  monthId, ATTRIBUTE: attributeId};
    $.ajax({
       url: '/NonTridionPages/setReadRegionFilters.ashx',
       data: qdata,
       async: false,
       cache: false,
       dataType: 'json',
       success: function (json) {
          mydata = json;
          regionDataSaved();
       }
    });
    //var qdata = {opType: "SET", REGION: regionId, CATEGORY: categoryId, MONTH:  monthId, ATTRIBUTE: attributeId};

    //$.getJSON("/NonTridionPages/setReadRegionFilters.ashx", qdata, regionDataSaved);
}

function regionDataSaved()
{
  // alert("Region Data saved in the session");
}

var regionSessionData;
function getRegionFilterSession()
{
    var qdata = {opType: "GET"};
    $.ajax({
       url: '/NonTridionPages/setReadRegionFilters.ashx',
       data: qdata,
       async: false,
       cache: false,
       dataType: 'json',
       success: function (json) {
          mydata = json;
       }
    });
}

function bindRegionClick()
{
$("#regionStep1 UL LI A").live('click', function(ev)
{
     ev.preventDefault();	     
     //alert("2");
     var categoryId = $(this).attr("name");
     regionName = $("DIV#RegionNameForFilterBox").html();
     //PageMethods.CategoryClick(regionName, categoryId, OnSucceeded, OnFailed);  
     setRegionFilterSession(regionName, categoryId, "", "");
     OnSucceeded("","","CategoryClick")
     return false;
});
}

function ThickboxBoxInit_HeadAskAQ(){

	$('A.thickboxAskAQuestionHead').fancybox({ 	
	    'width':900,   
	    'height':1000,   
	    'autoScale'         : true,   
	    'transitionIn'      : 'elastic',   
	    'transitionOut'     : 'elastic',   
	    'type'          : 'iframe'  
	   
   }); 
}
function setCentreLadyCss()
{
var ladyTop=$("#seasonal_outer DIV.middleLft").height();
//alert("ladyTop:"+ladyTop);
$("DIV.centerLadyImgDiv").css({ "top" : ladyTop });

var SetInitialMarginTop=parseInt($("#seasonal_outer #BottomSeasonalHome").css("margin-top"));

var ItemMinHeight=parseInt($("#seasonal_outer DIV.middleLft").css("min-height"));

var DiffInHeight=(ladyTop - ItemMinHeight)/10;

//alert("ItemMinHeight:"+ItemMinHeight);
var actulaMargin=SetInitialMarginTop+DiffInHeight;
$("#seasonal_outer #BottomSeasonalHome").css("margin-top",actulaMargin+"px");
}

function SpecialOffersFilterTagging(desc, action, FilterType, id)
  {
   var tagContent = "|?desc="+desc+"&action="+action;
   var FilterTypeVal = FilterType;
   var type=id;
   var parameterVal =$("#"+type.id).val();
   
   //if (parameterVal.match("All") != null 
   if(parameterVal==null || parameterVal=='')
   {
   parameterVal="All";
   }
   if(FilterType=='SpecialOffersDateFilter')
   {
   var dateParameterVal = parameterVal.split(" ");
   dateParameterVal=dateParameterVal[0];
   var TempdateParameterVal=dateParameterVal.split("/");
   parameterVal=TempdateParameterVal[1]+"/"+TempdateParameterVal[0]+"/"+TempdateParameterVal[2];
   }

  if (FilterTypeVal != null && FilterTypeVal != 'undefined' && FilterTypeVal != "")
  {
  tagContent = tagContent + "&"+FilterType+"="+parameterVal;
  }
  
       WEBABACUS.logclientdata('0',urlPathNameParks+window.location.search+tagContent);
   
 }
 
 
 
 
 function startCarousel()
 {
 var transitionSpeedValue = '';
 
 if ((typeof(HavenTridionJSNamespace) !='undefined') && (typeof(HavenTridionJSNamespace.transitionSpeedValue) !='undefined') && (HavenTridionJSNamespace.transitionSpeedValue != null) && (HavenTridionJSNamespace.transitionSpeedValue != ""))
 {
 transitionSpeedValue =parseInt(HavenTridionJSNamespace.transitionSpeedValue);
 }
 else
 {
 transitionSpeedValue = 1500;
 }
 
 //$("DIV.highlightsMainImage").easy_Carousel({ imageWidth: 742, imageHeight: 323, defaultImageDiv: 'mainCarouselDefault', transition: 'slideLeft', autoStart: true, linksDiv: null, imageLinksUL: 'offercarouselImages', stayTime: 2000, transitionTime: transitionSpeedValue, pausePlayIconsDiv: null });  
 
 	$(".jcarousel-skin-HorizontalSliding .jcarousel-next-horizontal").click(function(ev){
 	
 	WEBABACUS.logclientdata('0', window.location.pathname+"|?desc=PreFooter&action=NextArrow");
 	});
 	$(".jcarousel-skin-HorizontalSliding .jcarousel-prev-horizontal").click(function(ev){
 	WEBABACUS.logclientdata('0', window.location.pathname+"|?desc=PreFooter&action=PreviousArrow");
 });
 $(".bannerNav").css("visibility", "visible");
}

function ThickboxBoxInit_AskQuesionHeader() {

	$('a[id*=AskAQuestion]').fancybox({ 	
	    'width':950,   
	    'height':1100,   
	    'autoScale'         : false,   
	    'transitionIn'      : 'elastic',   
	    'transitionOut'     : 'elastic',   
	    'type'          : 'iframe'  
	   
   }); 
   }
   
   function newsletterInitialState()
   {
   $(".txtSms, .lblSms, .txtEmail, .lblEmail").hide();
}



function bindMakePaymnt()
{
WEBABACUS.logclientdata('0',urlPathNameParks+'|?desc=MakeaPayment');
}