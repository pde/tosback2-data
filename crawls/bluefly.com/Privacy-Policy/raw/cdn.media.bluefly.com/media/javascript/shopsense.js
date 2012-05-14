
//$(function() {
squish_zIndex_bug();
var pastlove_overlay_open = false;



var shopsafe_current_page = 1;
var per_page = 10;
var items = jQuery(".shopsafeProductContainer");
var pages = Math.ceil(items.length/per_page);

jQuery(".shopsafe_pagination div.pages").empty();

if(pages > 1){
	$("div.shopsafe_pagination div.pages").prepend("<div class='shopsafe_pagination_header'>MORE LOVES</div>");
}
$("div.shopsafe_pagination div.next").remove();
$("div.shopsafe_pagination div.prev").remove();

if(pages == 1){
	jQuery(".shopsafe_pagination").hide();
}else{

	for(i=1; i<=pages; i++){
		if(i == shopsafe_current_page){
			class_pag = ' class="pageselected"';
		}else{
			class_pag = ' class="pageunselected"';	
		}
		jQuery("div.shopsafe_pagination div.pages").append('<a href="javascript:void(0);" '+class_pag+' onclick="javascript: shopsafeJumpPage('+i+')">'+i+'</a>');
	}
	shopsafeJumpPage(1);
}


if($("#tabs-shopsafe-1").length == 0){
	plove_id = $(".shopsafeProductContainer:eq(0)").parent().attr("id");
	if(plove_id==""){
		plove_id = "#"+$(".shopsafeProductContainer:eq(0)").parent().parent().attr("id");
	}
}else{
	plove_id = "#tabs-shopsafe-1";
}

w = $(plove_id).parent().width() - 20;
//$("div.shopsafe_pagination").width();
$("div.shopsafe_pagination").width(w);

$(".ql_link_2").hide();
$(".shopsafeProductContainer .listProdImage").mouseover(function() {
		//console.log("shopsafe_overlay_open mouseover "+shopsafe_overlay_open);
		$(".ql_link_2",this.parentNode).show();
   }).mouseout(function() {
	   $(".ql_link_2",this.parentNode).hide();
   }).click(function() {
		if($(".ql_link_3.past_love",this.parentNode).length){
			shopsafe_overlay_open = true;
			id = $(this.parentNode).attr("id");
			$("div.shopsafeProductContainer").hide();	
			$("div.shopsafeProductContainer#"+id).show();
			$(this.parentNode).show();
			$(plove_id).css("height", "260px");
			$("div.shopsafeProductContainer#"+id+" .ql_link_2").hide();
			$("div.shopsafeProductContainer#"+id).addClass("hauto");
			$("div.shopsafeProductContainer#"+id+" .listProdImage").hide();
			$(".ql_link_3.past_love",this.parentNode).show();
			$(".shopsafe_pagination").hide();
			$("div.shopsafeProductContainer#"+id+" .ql_link_2").addClass("hide");
			return false;
		}else{
			return true;
		}
   });
//});

function closeshopsafe(){
	$(".past_love").hide();
	$(".shopsafeProductContainer").show();
	$(".listProdImage").show();
	if(typeof(shopsafeJumpPage) == "function" && pages > 1){
		shopsafeJumpPage(shopsafe_current_page);
	}
	$(plove_id).css("height", "auto");
	$(".ql_link_2").removeClass("hide");
	
	if(pages > 1){
		$(".shopsafe_pagination").show();
	}else{
		$(".shopsafe_pagination").hide();
	}
	$(".shopsafeProductContainer").removeClass("hauto");
	shopsafe_overlay_open = false;
}
function squish_zIndex_bug(){
    $('.shopsafeProductContainer').each(function(i) {
       $(this).css('zIndex', 100 - (i * 1));
    });
}















function goPrev(){
	if(shopsafe_current_page > 0){
		shopsafeJumpPage(shopsafe_current_page-1);
	}
}
function goNext(){
	if(shopsafe_current_page < pages){
		shopsafeJumpPage(shopsafe_current_page+1);
	}
}
function shopsafeJumpPage(page){
	page = parseInt(page);//-1;
	if(page > 1){
		jQuery(".shopsafe_pagination .prev").css("visibility", "visible");
		jQuery(".shopsafe_pagination .next").css("visibility", "visible");
	}
	if(page == pages){
		jQuery(".shopsafe_pagination .next").css("visibility", "hidden");
	}
	if(page == 1){
		jQuery(".shopsafe_pagination .prev").css("visibility", "hidden");
		jQuery(".shopsafe_pagination .next").css("visibility", "visible");
	}
	
	var index = 0;
	jQuery(".shopsafeProductContainer").each(function(){
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
			jQuery(".shopsafe_pagination .pages a:eq("+(i-1)+")").addClass("pageunselected");
			jQuery(".shopsafe_pagination .pages a:eq("+(i-1)+")").removeClass("pageselected");
		}else{
			jQuery(".shopsafe_pagination .pages a:eq("+(i-1)+")").addClass("pageselected");
			jQuery(".shopsafe_pagination .pages a:eq("+(i-1)+")").removeClass("pageunselected");
		}
	}
	//jQuery(".shopsafe_pagination .pages a").removeClass("pageselected");
	//jQuery(".shopsafe_pagination .pages a:eq("+(page-1)+")").addClass("pageselected");
	
	shopsafe_current_page = page;
}








$(function() {
    $(".product-info-dialog").hide();
    $(".product-image-wrapper").mouseover(
	
    function() {
        $(".product-info-dialog", $(this).parent()).show();
    }).mouseout(function() {
        $(".product-info-dialog", $(this).parent()).hide();
    });
});