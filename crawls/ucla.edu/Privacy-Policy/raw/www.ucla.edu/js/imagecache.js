//set global variable
document.cookie='resolution='+$(window).width()+'; path=/';

var breakpoint = new Array();
breakpoint[0] = 803;
breakpoint[1] = 480;

var curBr=0, stateBr=-1, tmp, oldsrc;

//refresh image on load
$(document).ready(function () {
	//refreshImage();
});		

//refresh image on resize
$(window).resize(function() {
	refreshImage();
});

//Refresh the image
function refreshImage() {
	var curwidth = Number($(window).width());
	
	for(var i=0; i<breakpoint.length; i++) {
		
		//if the current width is less than the smallest breakpoint
		if((i+1) == breakpoint.length) {
			if(curwidth < breakpoint[i])
				curBr = breakpoint[i];
			
			if(curwidth > breakpoint[0])
				curBr = 0;
		//else handle everything else
		} else {
			
			if(curwidth <= breakpoint[i] && curwidth > breakpoint[i+1])
				curBr = breakpoint[i];
			
			if(curwidth > breakpoint[0])
				curBr = 0;
		} 	
		
	}
	
	//if the browser has entered into a new breakpoint
	if(curBr != stateBr) {
	
		//update the cookie
		document.cookie='resolution='+curwidth+'; path=/';
		
		//add a timestamp to the images to force a refresh
		$('img').attr('src',function(){ 
			var src = $(this).attr('src');
			var tmp = src.split('?');
			//return tmp[0]+'?t='+new Date().getTime();
			
			return tmp[0]+'?t='+curBr;
		});
		
		//store current breakpoint state
		stateBr = curBr;
	}
}