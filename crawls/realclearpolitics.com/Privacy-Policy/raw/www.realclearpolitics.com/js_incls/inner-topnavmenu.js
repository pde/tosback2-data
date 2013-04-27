$(document).ready(function() {	
	$('#navcontainer ul li a.submenu').unbind();
	$('#navcontainer ul li a.submenu').click(function(){
		var id = $(this).attr('id');
		var parent_element = $(this);
		
		// RESPONSIVE (functions exist in /incls/responsive_articles_entries.js)
		if(typeof reset_sub_menu == 'function' && $('#navcontainer ul li a#'+id).hasClass("active")) {
        	reset_sub_menu(id);
        	$('#navcontainer ul li a#'+id).removeClass("active");
        } else if(typeof move_sub_menu == 'function' && !$('#navcontainer ul li a#'+id).hasClass("active")) {
        	move_sub_menu(id);
        	$('#navcontainer ul li a#'+id).addClass("active");
        } else {
			//OPEN SUBMENU AND SET STYLES (NON-RESPONSIVE)
			$('#sub_nav_'+id).slideToggle('fast', function() {																									
				if($('#navcontainer ul li a#'+id).hasClass("active")){
					$('#navcontainer ul li a#'+id).removeClass("active");						
				}else{
					$('#navcontainer ul li a#'+id).addClass("active");
				}												
			});
		}
						
		//CLOSE OTHER SUBMENUS OPEN	AND REMOVE CLASS FROM THEIR PARENT LINKS				
		$('.sub_navcontainer').each(function(){
			if($(this).attr('rel')!=id){
				$(this).hide();	
				var xid = $(this).attr('rel');						
				$('#navcontainer ul li a#'+xid).removeClass("active");				
			}					
		});					
														
	});
});

/*legacy menu */
function hidesub(id){
	document.getElementById("subnavbg"+id).style.display="none";
	document.getElementById("subnav"+id).style.display = "none";	
	document.getElementById("nav"+id).style.backgroundColor = "#000";
}

function showsub2(id){
	document.getElementById("subnavbg"+id).style.display="block";
	document.getElementById("subnav"+id).style.display = "block";
	document.getElementById("nav"+id).style.backgroundColor = "#cc0000";	
}



























/*$(document).ready(function() {	
	$('#navcontainer ul li a.submenu').unbind();
	$('#navcontainer ul li a.submenu').click(function(){
		var id = $(this).attr('id');
		var parent_element = $(this);
						
		//OPEN SUBMENU AND SET STYLES
		$('#sub_nav_'+id).slideToggle('fast', function() {																									
			if($('#navcontainer ul li a#'+id).hasClass("active")){
				$('#navcontainer ul li a#'+id).removeClass("active");						
			}else{
				$('#navcontainer ul li a#'+id).addClass("active");
			}												
		}); 	
						
		//CLOSE OTHER SUBMENUS OPEN	AND REMOVE CLASS FROM THEIR PARENT LINKS				
		$('.sub_navcontainer').each(function(){
			if($(this).attr('rel')!=id){
				$(this).hide();	
				var xid = $(this).attr('rel');						
				$('#navcontainer ul li a#'+xid).removeClass("active");				
			}					
		});					
														
	});
});


function hidesub(id){
	document.getElementById("subnavbg"+id).style.display="none";
	document.getElementById("subnav"+id).style.display = "none";	
	document.getElementById("nav"+id).style.backgroundColor = "#000";
}

function showsub2(id){
	document.getElementById("subnavbg"+id).style.display="block";
	document.getElementById("subnav"+id).style.display = "block";
	document.getElementById("nav"+id).style.backgroundColor = "#cc0000";	
}*/


