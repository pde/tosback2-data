var defaultOpened = 1;
var initAccordion = function(){
	var headers = $('.individual_tab_wrapper .header');
	var contents = $('.individual_tab_wrapper .content');
	
	var hiddenItems = $('.individual_tab_wrapper .content ul.hidden');
	//hiddenItems.slideUp(500);
	
	var viewLinks = $('.individual_tab_wrapper .content a.view');
	viewLinks.bind('click',function(e){
		if ($(this).hasClass('active')){
			$(this).prev().slideUp(500);
			$(this).removeClass('active');
			$(this).html('View more');
		} else {
			$(this).prev().slideDown(500);
			$(this).addClass('active');
			$(this).html('View less');
		}
		return false;
	});
	
	if (headers.length == contents.length && headers.length > 0){
		for (var i = 0; i < contents.length; i++){
			if (i + 1 != defaultOpened){
				$(contents[i]).slideUp(500);
			} else {
			    $(contents[i]).show("fast");
				//$(contents[i]).slideDown(500);
				$(headers[i]).addClass('active');
			}
		}
	}
	headers.bind('click',function(e){
		if (!/active/.test(this.className)){
			openBlock($(this), $(this).next())
		}
		return false;
	});
}

var openBlock = function(header, content){
	var headers = $('.individual_tab_wrapper .header.active');
	closeBlock($(headers),$(headers).next());

	content.slideDown(500);
	header.addClass('active');
}

var closeBlock = function(header, content){
	content.slideUp(500);
	header.removeClass('active');
}

/* Tech Centers and Homepage*/
function initPage()
{
	initActive();
	var label_hover = document.getElementById("storage");
	var box = document.getElementById("box");
	if (label_hover)
	{
		label_hover.onmouseover = function()
		{
			box.style.display='block';
		}
		label_hover.onmouseout = function()
		{
			box.style.display='none';
		}
	}
}

function check(id){
	var bx = "box"+id.substring(2);
	var lbh = document.getElementById(id);
	var bxh = document.getElementById(bx);
	if(lbh){
		lbh.onmouseover = function()
		{
			bxh.style.display='block';
		}
		lbh.onmouseout = function()
		{
			bxh.style.display='none';
		}		
	}		
}

function initActive()
{
	var all_links=document.getElementsByTagName("a");
	for (var i = 0; i < all_links.length; i++)
	{
		if (all_links[i].className == "more")
		{
			all_links[i].onclick = function()
			{
				if (this.parentNode.className == "active")
				{
					this.parentNode.className="";

				} else
				{
					this.parentNode.className="active";
				}	
				return false;
			}
		}
	}		
}
if (window.addEventListener){
	window.addEventListener("load", initPage, false);
}
else if (window.attachEvent){
	window.attachEvent("onload", initPage);
}

/* // Tech Centers and Homepage */


/*
jQuery().ready(function(){
	if(typeof(bcid) != "undefined" && bcid > 0) defaultOpened = 2;
	initAccordion();
	$('#container').tabs({fxFade: true, fxSpeed: 'normal'});
});
*/