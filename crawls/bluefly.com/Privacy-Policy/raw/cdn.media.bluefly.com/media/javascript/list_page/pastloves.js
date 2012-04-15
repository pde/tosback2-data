//$(function() {
squish_zIndex_bug();
var pastlove_overlay_open = false;



$(".pastloveondesignerpage div.past_love_wrapper").css({width: 270});
$(".pastloveondesignerpage div.past_love").css({width: 635});

var pastlove_current_page = 1;
var per_page = 10;
var items = jQuery(".pastloveProductContainer");
var pages = Math.ceil(items.length/per_page);

jQuery(".pastlove_pagination div.pages").empty();

if(pages > 1){
	$("div.pastlove_pagination div.pages").prepend("<div class='pastlove_pagination_header'>MORE LOVES</div>");
}
$("div.pastlove_pagination div.next").remove();
$("div.pastlove_pagination div.prev").remove();

if(pages == 1){
	jQuery(".pastlove_pagination").hide();
}else{

	for(i=1; i<=pages; i++){
		if(i == pastlove_current_page){
			class_pag = ' class="pageselected"';
		}else{
			class_pag = ' class="pageunselected"';	
		}
		jQuery("div.pastlove_pagination div.pages").append('<a href="javascript:void(0);" '+class_pag+' onclick="javascript: pastLoveJumpPage('+i+')">'+i+'</a>');
	}
	pastLoveJumpPage(1);
}


if($("#tabs-pastlove-1").length == 0){
	plove_id = $(".pastloveProductContainer:eq(0)").parent().attr("id");
	if(plove_id==""){
		plove_id = "#"+$(".pastloveProductContainer:eq(0)").parent().parent().attr("id");
	}
}else{
	plove_id = "#tabs-pastlove-1";
}

w = $(plove_id).parent().width() - 20;
//$("div.pastlove_pagination").width();
$("div.pastlove_pagination").width(w);

$(".ql_link_2").hide();
$(".pastloveProductContainer .listProdImage").mouseover(function() {
		//console.log("pastlove_overlay_open mouseover "+pastlove_overlay_open);
		$(".ql_link_2",this.parentNode).show();
   }).mouseout(function() {
	   $(".ql_link_2",this.parentNode).hide();
   }).click(function() {
		if($(".ql_link_3.past_love",this.parentNode).length){
			pastlove_overlay_open = true;
			id = $(this.parentNode).attr("id");
			$("div.pastloveProductContainer").hide();	
			$("div.pastloveProductContainer#"+id).show();
			$(this.parentNode).show();
			$(plove_id).css("height", "260px");
			$("div.pastloveProductContainer#"+id+" .ql_link_2").hide();
			$("div.pastloveProductContainer#"+id).addClass("hauto");
			$("div.pastloveProductContainer#"+id+" .listProdImage").hide();
			$(".ql_link_3.past_love",this.parentNode).show();
			$(".pastlove_pagination").hide();
			$("div.pastloveProductContainer#"+id+" .ql_link_2").addClass("hide");
			return false;
		}else{
			return true;
		}
   });
//});

function closePastLove(){
	$(".past_love").hide();
	$(".pastloveProductContainer").show();
	$(".listProdImage").show();
	if(typeof(pastLoveJumpPage) == "function" && pages > 1){
		pastLoveJumpPage(pastlove_current_page);
	}
	$(plove_id).css("height", "auto");
	$(".ql_link_2").removeClass("hide");
	
	if(pages > 1){
		$(".pastlove_pagination").show();
	}else{
		$(".pastlove_pagination").hide();
	}
	$(".pastloveProductContainer").removeClass("hauto");
	pastlove_overlay_open = false;
}
function squish_zIndex_bug(){
    $('.pastloveProductContainer').each(function(i) {
       $(this).css('zIndex', 100 - (i * 1));
    });
}















function goPrev(){
	if(pastlove_current_page > 0){
		pastLoveJumpPage(pastlove_current_page-1);
	}
}
function goNext(){
	if(pastlove_current_page < pages){
		pastLoveJumpPage(pastlove_current_page+1);
	}
}
function pastLoveJumpPage(page){
	page = parseInt(page);//-1;
	if(page > 1){
		jQuery(".pastlove_pagination .prev").css("visibility", "visible");
		jQuery(".pastlove_pagination .next").css("visibility", "visible");
	}
	if(page == pages){
		jQuery(".pastlove_pagination .next").css("visibility", "hidden");
	}
	if(page == 1){
		jQuery(".pastlove_pagination .prev").css("visibility", "hidden");
		jQuery(".pastlove_pagination .next").css("visibility", "visible");
	}
	
	var index = 0;
	jQuery(".pastloveProductContainer").each(function(){
		if(index<page*per_page){
			jQuery(this).show();
		}else{
			jQuery(this).hide();
		}
		
		if(index<(page-1)*per_page){
			jQuery(this).hide();
		}
		index++;
	});

	for(i=1; i<=pages; i++){
		if(i!=page){
			jQuery(".pastlove_pagination .pages a:eq("+(i-1)+")").addClass("pageunselected");
			jQuery(".pastlove_pagination .pages a:eq("+(i-1)+")").removeClass("pageselected");
		}else{
			jQuery(".pastlove_pagination .pages a:eq("+(i-1)+")").addClass("pageselected");
			jQuery(".pastlove_pagination .pages a:eq("+(i-1)+")").removeClass("pageunselected");
		}
	}
	//jQuery(".pastlove_pagination .pages a").removeClass("pageselected");
	//jQuery(".pastlove_pagination .pages a:eq("+(page-1)+")").addClass("pageselected");
	
	pastlove_current_page = page;
}

