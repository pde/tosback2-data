$(document).ready( function() {
	
	/* ----------Config Vars----------- */
	var slideTimer = 9000;  //time between slides (1 second = 1000), a.k.a. the interval duration
	var transitionTime = 750; //transition time (1 second = 1000)
	var items = $('.slide_item').toArray();  //Get array of elements for sliding
	var prevBtn = $('#prevbtn');
	var playBtn = $('#playbtn');
	var nextBtn = $('#nextbtn');
	
	var btnDot0 = $('#Dot0');
	var btnDot1 = $('#Dot1');
	var btnDot2 = $('#Dot2');
	var btnDot3 = $('#Dot3');
	var btnDot4 = $('#Dot4');
	
	var itemNum = 0;  //initialize a variable to hold the current slide index
	var isPaused = 0;

	/* --------end config vars-------- */
	
	//Setup positions
	$('.slide_item').each(function(index) {
		
		try
		{
		    if ($(this))
		    {
		        //since the viewer obviously has javascript on, we can remove the 'first_item' class		
		        if(index == 0){
			        $(this).removeClass('first_item');
			        $(this).css('left', "0");
		        }
		        else{
			        $(this).css('left', "988px");
		        }
		    }
        }
        catch(e)
        {
            //alert("items.each error:" + e);
        }	
	});
	
	var numItems = items.length;  //get number of slider items
	//alert(numItems);
	//end setup
		
	var showPosition = function(){
		for(var i=0; i < numItems; i++)
		{		    
			var sID = "#Dot" + i;
			var img = $(sID);
			try
			{
			    if (img)// && img != null)
			    {
			        if (i == itemNum)
			            img.attr('src', g_imgDotOnButton);
			        else
			            img.attr('src', g_imgDotOffButton);
			    }
			}
			catch(e)
			{
			    //alert("showPosition error:" + e);
			}
		}
	};
	
	var gotoSlide = function(index){
		
		if (index == itemNum)
			return;
			
        if(isPaused == 0){
	        isPaused = 1;
	        clearInterval(theTimer);
	        document.getElementById('playbtnimg').src=g_imgPlayButton;
        }
        
        var bMoveForward = (index < itemNum);
		
		//get item to slide out
		var curItem = items[itemNum];  
	
		itemNum = index;
		
		//now get item to slide in using new index
		var newItem = items[itemNum];		

		if (bMoveForward)
		    moveSlidesLeftToRight(newItem, curItem);
		else
		    moveSlidesRightToLeft(newItem, curItem);
			

		showPosition();
	};
	
	var moveSlidesRightToLeft = function(newItem, curItem){
		//we will set a beginning value here
		//this is so that it gives the illusion of continuous motion from one direction, even after the first cycle of items
		$(newItem).css('left', '988px');
		$(newItem).animate({"left": "-=988px"}, "slow");
		
		//no beginning values needed, since we always want to push the old item out to the left
		$(curItem).animate({"left": "-=988px"}, "slow");
	};

	var moveSlidesLeftToRight = function(newItem, curItem){
		//we will set a beginning value here too, but this time to make it come from left to right
		$(newItem).css('left', '-988px');
		$(newItem).animate({"left": "+=988px"}, "slow");
		
		//no beginning values needed
		$(curItem).animate({"left": "+=988px"}, "slow");
	};
	
	
	//Slider Stuff
	var slideForward = function(){ 
	
		//get item to slide out
		var curItem = items[itemNum];  
		
		//change index
		if(itemNum < (numItems - 1)){
			itemNum++; 
		}
		else{
			itemNum = 0;
		}
		
		//now get item to slide in using new index
		var newItem = items[itemNum];
		
		
		//set up our animation stylings for out and in motions (note:  Fx.Styles does NOT exist in moo 1.2, so we must use Fx.Morph or Fx.Tween)
		
		moveSlidesRightToLeft(newItem, curItem);		
		showPosition();
	};
		
		
	var slideBackward = function(){ 
	
		//get item to slide out
		var curItem = items[itemNum];  
		
		//change index for reverse movement
		if(itemNum > 0){
			itemNum--; 
		}
		else{
			itemNum = (numItems - 1);
		}
		
		//now get item to slide in using new index
		var newItem = items[itemNum];
		
		
		
		moveSlidesLeftToRight(newItem, curItem);
		showPosition();
		
	};
	//end slideBackward
		
	//call the slider function periodically
	var theTimer = setInterval(slideForward, slideTimer); 
		
    var initNextButton = function(){   
		nextBtn = $('#nextbtn');      
        if (nextBtn==null)
        {
            setTimeout("initNextButton()", 1000);
        }
        else
        {
	        nextBtn.click(function(){
		        if(isPaused == 0){
			        clearInterval(theTimer);
			        theTimer = setInterval(slideForward, slideTimer);
		        }
		        slideForward();
	        });        
	    }
    };
    initNextButton();	
		
	
    var initPrevButton = function(){    
	   	prevBtn = $('#prevbtn');
        if (prevBtn==null)
        {
            setTimeout("initPrevButton()", 1000);
        }
        else
        {
	        prevBtn.click(function(){
		        if(isPaused == 0){
			        clearInterval(theTimer);
			        theTimer = setInterval(slideForward, slideTimer);
		        }				     
		        slideBackward();
	        });
	    }
    };
    initPrevButton();		


    var initPlayButton = function(){    
		playBtn = $('#playbtn');
        if (!playBtn)
        {
            setTimeout("initPlayButton()", 1000);
        }
        else
        {
	        playBtn.click(function(){
		        if(isPaused == 0){
			        isPaused = 1;
			        clearInterval(theTimer);
			        $('#playbtnimg').attr('src', g_imgPlayButton);
		        }
		        else{
			        isPaused = 0;
			        slideForward();
			        theTimer = setInterval(slideForward, slideTimer); 
			        $('#playbtnimg').attr('src', g_imgPauseButton);
		        }
	         });
	    }
    };
    initPlayButton();	
    
    var initDot0Button = function(){
	    btnDot0 = $('#Dot0');
	    if (!btnDot0)
	    {
	        //alert("!btnDot0..setting timeout");
	        setTimeout("initDot0Button()", 1000);
	    }
	    else
	        btnDot0.click(function(){gotoSlide(0);});    
    };
    initDot0Button();

    var initDot1Button = function(){
	    btnDot1 = $('#Dot1');
	    if (!btnDot1)
	    {
	        //alert("!btnDot1..setting timeout");
	        setTimeout("initDot1Button()", 1000);
	    }
	    else
	        btnDot1.click(function(){gotoSlide(1);});    
    };
    initDot1Button();

    var initDot2Button = function(){
	    btnDot2 = $('#Dot2');
	    if (!btnDot2)
	    {
	        //alert("!btnDot2..setting timeout");
	        setTimeout("initDot2Button()", 1000);
	    }    
	    else
	        btnDot2.click(function(){gotoSlide(2);});    
    };
    initDot2Button();

    var initDot3Button = function(){
	    btnDot3 = $('#Dot3');
	    if (!btnDot3)
	        setTimeout("initDot3Button()", 1000);
	    else
	        btnDot3.click(function(){gotoSlide(3);});    
    };
    initDot3Button();

    var initDot4Button = function(){
	    btnDot4 = $('#Dot4');
	    if (!btnDot4)
	        setTimeout("initDot4Button()", 1000);
	    else
	        btnDot4.click(function(){gotoSlide(4);});    
    };
    initDot4Button();
    
    showPosition();
	
});
