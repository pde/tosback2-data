//alert(oldQS);
// var oldQS is set on the page in php.  Is used in some functions
//setTimeout(checkCompareItems,1250);

$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});

//update the cart count when page is ready
$(document).ready(function(){
    
  if( $("#bannerRotator div.banners div").length > 1){
    $("#bannerRotator").scrollable({ vertical: true, circular: true, keyboard: false }).autoscroll(5000);
  }
	
	//update the cart count
	var baseUrl = "https:" == document.location.protocol?secureBase:base;
	$('#cartCountSpan').load(baseUrl+'cartCount.php');
	
	//Search Bar stuff
	$('#formSearch').submit(function(){ if($('#search').attr("value")=='' || $('#search').attr("value")=='Keyword, Item #'){return false;} s.doSearch(); });
	$('#search').blur(function(){ if($(this).attr("value")=='') $(this).attr("value",'Keyword, Item #');});
	$('#search').focus(function(){if($(this).attr("value")=='Keyword, Item #') $(this).attr("value","");});
	
	
	$('a[href=#top]').click(function(){
    $('html, body').animate({scrollTop:0}, 'slow');
    return false;
  });

	//if on a thumbnails page, initialize browser history stuff
	if ($('#thumbnails').length) {
		//$("div.thumbImageWrap").quickLookButton("testNarrow.php");
		$("div.thumbImageWrap").live('click',function(){
			window.location=$(this).find('a').attr('href');
		});
		//check to see if we have a right navbar
		var hasRightNav=$('#narrowOptions').length;
		
		//this runs when the hashtag changes
		$(window).bind( "hashchange", function(e) {
			//get current states from the hashtag
			// In jQuery 1.4, use e.getState( "url" );
			var page = $.bbq.getState( "p" ) || "1"; //page number
			var priceRange = $.bbq.getState( "pr" ); //price range
			var filters = $.bbq.getState( "f" ); //filters
			var sort = $.bbq.getState("s");
			var rows = $.bbq.getState("rows");
			
			// setup the url parameters
			var sendUrl=oldQS+'&page='+page;
			if (sort!=undefined){
				sendUrl+="&sort="+sort;
				switchSortOption('sort'+sort);
				if($('input[name=sortSelect]:checked').val() != sort){
					$('input[name=sortSelect][value="'+sort+'"]').attr('checked', true);
				}
			}
			if (priceRange!=undefined){sendUrl+="&priceRange="+priceRange;}
			if (filters!=undefined){sendUrl+="&filters="+filters;}
			if (rows!=undefined){sendUrl+="&rowsShown="+rows;}
			
			//make the ajax calls
			$('#thumbnails').fadeTo('fast','0.2',function(){
				$.post(baseUrl+'ajaxThumbHandler.php', sendUrl+'&data=thumbs', function(data){
				if(data.indexOf("doRedirect")>-1){
					redirect=data.substr(11,data.length);
					//alert(redirect);
					document.location.href=redirect;
				}
				else{
					$('#thumbnails').html(data);
					$('#thumbnails').fadeTo('fast','1');
					//$("div.thumbImageWrap").quickLookButton("testNarrow.php");
					equalHeight('#sidebar','#content');
					//alert($('#narrowOptions:in-view'));
					if(rows!='all' && !elementInViewport('#narrowOptions') ){
						$('html, body').animate({scrollTop:0}, 'slow');
					}
				}
			})});
			$('.pagingOptions').load(baseUrl+'ajaxThumbHandler.php?'+sendUrl.replace(/ /g,'%20')+'&data=paging');
			if(hasRightNav){
				$('#narrowOptions').load(baseUrl+'ajaxThumbHandler.php?'+sendUrl.replace(/ /g,'%20')+'&data=fullRightNav');
			}
			
		});
		
		if($.bbq.getState( "p" ) != undefined){
			$(window).trigger( "hashchange" );
		}

	}

	if ($('#narrowOptions').length) {
		$(".narrowHeading").live('mouseover mouseout', function(event) {
			if (event.type == 'mouseover') {
				if($(this).parents(".narrowGroup").find(".narrowSelected ul li").length==0){
						$(this).addClass("narrowHover");
				}
			} else {
				$(this).removeClass("narrowHover");
			}
		});
			
		$(".narrowChoices li").live('click',function(){
			if($(this).hasClass('priceOption')){
				changePriceRange($(this).find('a:first').attr('href'));
			}
			else{
				addFilter($(this).text());
			}
		});
		
		//$("select.narrowChoices").live('change',function(){
		//	if($(this).hasClass('priceOption')){
		//		changePriceRange($(this).val());
		//	}
		//	else{
		//		addFilter($(this).text());
		//	}
		//});
		
		$(".narrowSelected li").live('click',function(){
			if($(this).hasClass('priceOption')){
				changePriceRange('none');
			}
			else{
				removeFilter($(this).text());
			}
		});
	}
	
	if ($('.swatchSlider').length) {
		$(".swatchSlider").scrollable();
	}
	//$("#detailImagePopUp").dialog({
	//					modal: true,
	//					width: 600,
	//					position: 'center',
	//					autoOpen: false
	//});
	//$("#detailTabs").tabs();
	
	$("#detailImagePanel a[rel]").overlay({ mask:{ color: '#cccccc' }, top:'center', fixed:false });
	$("ul.css-tabs").tabs("div.css-panes > div");
	
	$("#gcAmount").change(function(){
			var dollarAmount=$(this).val();
			$("#price").html(dollarAmount);
		});
	
	//$("#addToCartButton").button({ icons: {primary: "ui-icon-locked"}});
	$("#detailOrderForm").live('submit',function(){
		$("#ajaxForm").val("1");
		var popUpElem = $('#addPopUp');
		popUpElem.html(" ").activity( { color: "#fff"}) ;
		if ( popUpElem.data("overlay") ){
			popUpElem.data("overlay").load();
		}
		else{
			popUpElem.overlay({
				mask:{ color: '#cccccc' },
				top: 'center',
				load: true
			});
		}
		$.post("detail.php", $("#detailOrderForm").serialize(), function(data){
			//alert(data);
				popUpElem.activity(false);
				responseAction = $(data).find('action').text();
				if( responseAction == 'redirect'){
					window.location = $(data).find('content').text();
				}
				else{
					popUpElem.html($(data).find('content').text());
					$('#cartCountSpan').load(baseUrl+'cartCount.php');
				}
			});
		
		return false;
	});
	
});

//Need this to load after whole page is loaded to take into account image sizes in Chrome
$(window).bind("load", function() {
  if ($('#sidebar').length) {
		equalHeight('#sidebar','#content');
	}
});


var handleFailure = function callBack(o) {
	if (!redirected){
		//alert('failure');
	}
	return true;
}
//*********END callback information

//*********Detail Page ajax functions
function swatchClick(item,spec1,spec2){
	//alert("spec="+spec+"|item="+item+"|");	
	$('#detailMain').fadeTo('slow','0.2',function(){
		$.get('detailRequest.php', {'item': item, 'spec1': spec1, 'spec2': spec2, 'outletFlag': outletFlag}, function(data){
				$('#detailImagePanel').html($(data).find('image').text());
				$('#productOrderForm').html($(data).find('orderForm').text());
				$('#detailCopy').html($(data).find('productCopy').text());
				$('#longDesc').html($(data).find('longDesc').text());
				$('#productSpecs').html($(data).find('productSpecs').text());
				changeLargeImage($(data).find('largeImage').text());
				var backOrderDays = $(data).find('backOrderDays').text();
				$('#detailMain').fadeTo('fast','1');
				lpSendData('page','backOrderDays',backOrderDays);
				$("#detailImagePanel a[rel]").overlay({ mask: { color: '#cccccc' }, top:'center', fixed:false });
		})
	});
	return false;
}


//**********END detail page ajax

//**********Thumbnail page Ajax

function showAllOptions(divToChange,sendUrl, typeDesc){
	sendUrl+='&typeDesc='+typeDesc+'&data=oneRightNav&hide=false';
	$.post('ajaxThumbHandler.php', sendUrl, function(data){ $('#'+divToChange).html($(data));});
}

function hideExtraOptions(divToChange,sendUrl){
	typeDesc=divToChange.substring(0,divToChange.length-3);
	typeDesc = typeDesc.replace(/&/g,"%26");
	typeDesc = typeDesc.replace(/_/g," ");
	sendUrl+='&typeDesc='+typeDesc+'&data=oneRightNav&hide=true';
	$.post('ajaxThumbHandler.php', sendUrl, function(data){ $('#'+divToChange).html($(data));});
}

function addFilter(newFilter){
	var filters = $.bbq.getState( "f" );
	if(filters===undefined){filters=newFilter;}
	else{filters+=','+newFilter;}
	$.bbq.pushState({'p': '1', 'f':filters});
}

function removeFilter(rmFilter){
  rmFilter = rmFilter.replace(/\\/g,"");
	rmFilter = rmFilter.replace(/\+/g," ");
	rmFilter = rmFilter.replace(/"/g,"%22");
	rmFilter = rmFilter.replace(/&/g,"%26");
	rmFilter = rmFilter.replace(/'/g,"%27");
	var currentFilter = $.bbq.getState( "f" );
  var pattern = new RegExp(rmFilter, "i");
  var compattern = new RegExp(",,");
  currentFilter = currentFilter.replace(/\+/g, " ");
  currentFilter = currentFilter.replace(pattern, "");
  currentFilter = currentFilter.replace(compattern, ",");
	if (!currentFilter || currentFilter==","){
		$.bbq.removeState('f');
	}
	else{$.bbq.pushState({'p': '1', 'f':currentFilter});}
}

function getThumbsPage (sendUrl){
	$.post('ajaxThumbHandler.php', sendUrl+'&data=thumbs', function(data){ $('#thumbnails').html($(data));});
	$.post('ajaxThumbHandler.php', sendUrl+'&data=paging', function(data){ $('.pagingOptions').html($(data)); });
}

function changeNumRows(rows){
	$.bbq.pushState({'p': '1', 'rows': rows});
}

function resort(){
	sortOption =$('#sortSelect').val();
	$.bbq.pushState({'p': '1', 's': sortOption});
}
function changeThumbPage(page){
	$.bbq.pushState({ 'p': page });
}

function changePriceRange(priceRange){
	if(priceRange=='none'){$.bbq.removeState('pr');}
	else{$.bbq.pushState({ 'p': '1', 'pr': priceRange });}
}
function createPriceRange(high, low){
	priceRange=pad(high,'0',4).concat(pad(low,'0',4));
	changePriceRange(priceRange);
}
function pad(charString, padChar,stringLength){
	returnString = "";
	charsToAdd = stringLength - charString.length;
	if(charsToAdd < 0){returnString = charString.substr(0,charString);}
	else{
		for(x=0;x<charsToAdd;x++){
			returnString+=''+padChar;
		}
		returnString+=''+charString;
	}
	return returnString;
}
//************************************

//**** RUG Finder functions **********
//var handleSuccessCount = function callBack(o) {
//	//alert(o.argument[0]);
//	response = o.responseText;
//	document.getElementById("searchResultCount").innerHTML = response;
//}
//var countCallback={ success:handleSuccessCount,
//										failure:handleFailure
//	}


function calculateSearchResults(formObj,classId){
	sendUrl = "classId="+classId;
	defDesc = Array();
	count = 0;
	for(x=0;x<formObj.elements.length;x++){
		if(formObj.elements[x].type=="select-one" && formObj.elements[x].value!=""){
			defDesc[count]=formObj.elements[x].value;
			count++;
		}
	}
	sendUrl+="&defIds="+defDesc;
	sendUrl+="&data=resultCount";
	//alert(sendUrl);
	$('#searchResultCount').load('ajaxThumbHandler.php?'+sendUrl.replace(/ /g,'%20'));
}

function searchRugs(formObj){
	defDesc = Array();
	for(x=0;x<formObj.elements.length;x++){
		if(formObj.elements[x].type=="select-one" && formObj.elements[x].value!=""){
			defDesc[count]=formObj.elements[x].value;
			count++;
		}
	}
	if(defDesc.length > 0){
		document.location=base+"rugThumbs.php?classification=7&defDesc="+defDesc+"&rugFinder";
	}
}

//**********Quick Order page Ajax

function updateBaseIdDetails(sku){
	$.post(base+'quickOrderAjax.php', {'sku': sku}, function(data){
		sku = $(data).find('sku').text();
		ohQty = $(data).find('qty').text();
		price = $(data).find('price').text();
		retailPrice = $(data).find('retailPrice').text();
		priceBreak = $(data).find('priceBreak').text();
		inv7 = sku.substr(0,7);
		change = price.substr(-3);
		if(change==".00"){price = price.substr(0,(price.length-3) );}
		change = retailPrice.substr(-3);
		if(change==".00"){retailPrice = retailPrice.substr(0,(retailPrice.length-3) );}
		if(priceBreak=="1" && price!=retailPrice){
			price = "<span style=\"text-decoration:line-through;\">$"+retailPrice+"</span>"
							+"<span style=\"color:#CC0000;\">$"+price+"</span>";
		}
		else{price = "$"+price;}
		//if(document.getElementById(inv7+"qty")){document.getElementById(inv7+"qty").innerHTML = ohQty;}
		//document.getElementById(inv7+"price").innerHTML = price;
		if($('#'+inv7+"qty").length){$('#'+inv7+"qty").html(ohQty);}
		$('#'+inv7+"price").html(price);
	});

}
//***************

function createWelcomePanel(popUpDiv,width,timeOutSeconds,cookieName){
	if(cookieName){ var panelCookie = new Cookie(document, cookieName,"","",".homedecorators.com");}
	popUp = new YAHOO.widget.Panel(popUpDiv, {
    close:true,
    draggable: false,
    zindex:4,
    modal: true,
    visible: false,
    width:width,
    fixedcenter:true} );
  popUp.render(document.body);
	if(!panelCookie.load()){
		popUp.show();
		if(cookieName){
			panelCookie.value=1;
			panelCookie.store();
		}
		if(timeOutSeconds>0){
			setTimeout("popUp.hide()",timeOutSeconds*1000);
		}
	}
}

$.fn.quickLookButton = function(url) {
    return this.hover(function(e) {
				var $el = $(this);
				var parentEl=$(this).parents(".thumbnail");
				var title=parentEl.find(".thumbDetails a.itemDesc").text();
				var sku=parentEl.find(".thumbPopSku").text();
        
        var $tempButton = $("<a />", {
            "href": "#",
            "text": "Quick Look",
            "class": "qlButton",
            "css": {
								"position":"absolute",
								"bottom":"35px",
								"left": "55px"
            }
        }).button().click(function(){  //.appendTo($el);
					
					$("#quickLook").dialog({
						modal: true,
						draggable: false,
						resizable: false,
						//width: 600,
						//height: 200,
						title: title,
						open: function(){
							$("#quickLook").html(sku);
						}
					});
					return false;
				});
            
				$tempButton.appendTo($el);
      
    }, function(e) {
        $(".qlButton").fadeOut("fast", function() {
            $(this).remove();
        });
		 
		});
    
	}
	
function detailPop(){
	$("#detailImagePopUp").dialog("open");
	return false;
}

function changeLargeImage(imgSrc){
	$(".detailImagePop").each(function(){
		$(this).attr("src",imgSrc);
	});
	return false;
}

function equalHeight(container1, container2){
	var el1 = $(container1);
	var el2 = $(container2);
	el1.height("");
	el2.height("");
	var height1 = el1.height();
	var height2 = el2.height();
	if (height1 < height2){
		el1.height(height2);
	}
	else{el2.height(height1);}
}

$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
}


function elementInViewport(element) {
	var $element = $(element);
	var offset = $element.offset();

	var $window = $(window);
	var windowTop = $window.scrollTop();
	var threshold = 10;

	if (offset.top - threshold < windowTop) {
			if (offset.top + $element.height() + threshold >= windowTop) {
					// top edge below the window's top
			} else {
					return false;
			}
	} else {
			if (offset.top - threshold <= windowTop + $window.height()) {
					// bottom edge above the window's bottom
			} else {
					return false;
			}
	}

	var windowLeft = $window.scrollLeft();

	if (offset.left - threshold < windowLeft) {
			if (offset.left + $element.width() + threshold >= windowLeft) {
					// left edge be on the left side of the window's left edge
			} else {
					return false;
			}
	} else {
			if (offset.left - threshold <= windowLeft + $window.width()) {
					// right edge be on the right side of the window's right edge
			} else {
					return false;
			}
	}

	return true;
	
}



