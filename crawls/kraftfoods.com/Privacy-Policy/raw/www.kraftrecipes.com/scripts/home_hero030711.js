<!--||||		Agency: Digitas	Chicago												||||-->
<!--||||		Developer: Andrew Foust												||||-->
<!--||||		Date: November 2010													||||-->
<!--||||		Description															||||-->
<!--||||		This file controls the home page hero content and it's navigation	||||-->



<!---------------------------------------------------------------------------------------------->
					<!--||||			Variables				||||-->
<!---------------------------------------------------------------------------------------------->

var curHeroNum;
var totalNumHeros;
var intervalID;
var navColorArray;
var timerActive = true;

<!---------------------------------------------------------------------------------------------->
					<!--||||			Init Functions			||||-->
<!---------------------------------------------------------------------------------------------->

function initHeroComponent(_defaultHeroNum, _navColorArray){

	curHeroNum = _defaultHeroNum;
	navColorArray = _navColorArray;
	totalNumHeros = navColorArray.length;

	for(var i = 0; i < totalNumHeros; i++){
	
		jQuery("#hero_"+i).stop(true, true).hide();
		
		jQuery("#hero-description_"+i).stop(true, true).hide();
	}
	jQuery("#nav-container").hide();
	jQuery("#main-hero-container").css("visibility", "visible");
	jQuery("#nav-container").stop(true, true).fadeIn(1000,null);
	
	initButtons();
	changeHero(_defaultHeroNum);

	resetTimer();
	
}

function initButtons(){
	
	jQuery("#main-hero-container").mouseover(function(e){
    	stopTimer();
    });
	jQuery("#main-hero-container").mouseout(function(e){
      	resetTimer();
    });


}

<!---------------------------------------------------------------------------------------------->
					<!--||||			View Functions			||||-->
<!---------------------------------------------------------------------------------------------->

function changeHero(_newHeroNum){
	
	
	for(var i = 0; i < totalNumHeros; i++){
		if(i != _newHeroNum){
			jQuery("#hero_"+i).stop(true, true).fadeOut(1000,null);
		} else {
			jQuery("#hero_"+i).stop(true, true).fadeIn(1000,null);
		}
	}
	changeDescription(_newHeroNum);
	curHeroNum = _newHeroNum;
	setNavSelection(_newHeroNum);
	animateTimer();
	//cmCreateElementTag("Panel " + _newHeroNum + " Impression","HP Hero");
	
}


function changeDescription(_newHeroNum){
	for(var i = 0; i < totalNumHeros; i++){
		if(i != _newHeroNum){
			jQuery("#hero-description_"+i).stop(true, true).fadeOut(0,null);
		} else {
			jQuery("#hero-description_"+i).stop(true, true).fadeIn(0,null);
		}
	}
}


<!---------------------------------------------------------------------------------------------->
					<!--||||			Nav Functions			||||-->
<!---------------------------------------------------------------------------------------------->

function setNavSelection(_newHeroNum){
	
	for(var i = 0; i < totalNumHeros; i++){
		jQuery("#nav_"+i).removeClass('nav-on').addClass('nav-off');
		jQuery("#nav_"+i).css({color:"#035642"});
	}
	jQuery("#nav_"+_newHeroNum).addClass('nav-on');
	//jQuery("#nav_"+_newHeroNum).css({color:navColorArray[_newHeroNum]});
	jQuery("#nav_"+_newHeroNum).css({color:"#FFCD5B"});
}

function handleArrowClick(_direction){
	jQuery(".nav-item > span").css({display:"none"});

	switch(_direction){
		case "back":
			if(curHeroNum > 0){
				changeHero(curHeroNum - 1);
			} else {
				changeHero(totalNumHeros - 1);
			}
		break;
		case "next":
			if(curHeroNum < totalNumHeros - 1){
				changeHero(curHeroNum + 1);
			} else {
				changeHero(0);
			}
		break;
	}
	window.clearInterval(intervalID);
	stopTimer();
	
}

function handleArrowMouseOver(_direction){
	
	var id;
	var src;
	
	switch(_direction){
		case "back":
			id = "#nav-arrow-back";
			src = "nav-arrow-back_on.png";
		break;
		case "next":
			id = "#nav-arrow-next";
			src = "nav-arrow-next_on.png";
		break;
	}
	
	jQuery(id).attr("src", "/assets/hp_hero/images/" + src);
	
}

function handleArrowMouseOut(_direction){
	
	var id;
	var src;
	
	switch(_direction){
		case "back":
			id = "#nav-arrow-back";
			src = "nav-arrow-back_off.png";
		break;
		case "next":
			id = "#nav-arrow-next";
			src = "nav-arrow-next_off.png";
		break;
	}
	
	jQuery(id).attr("src", "/assets/hp_hero/images/" + src);
	
}

function handleNavClick(_newHeroNum){
	
	jQuery(".nav-item > span").css({display:"none"});
	changeHero(_newHeroNum);
	window.clearInterval(intervalID);
	stopTimer();
	
}

function handleNavMouseOver(_newHeroNum){
	
	changeDescription(_newHeroNum);
	if(_newHeroNum != curHeroNum){
		jQuery("#nav_"+_newHeroNum).addClass("nav-on");
		//jQuery("#nav_"+_newHeroNum).css({color:navColorArray[_newHeroNum]});
		jQuery("#nav_"+_newHeroNum).css({color:"#FFCD5B"});
	}
	stopTimer();
	
}

function handleNavMouseOut(_newHeroNum){
	
	changeDescription(curHeroNum);
	if(_newHeroNum != curHeroNum){
		jQuery("#nav_"+_newHeroNum).css({color:"#035642"});
		jQuery("#nav_"+_newHeroNum).removeClass('nav-on').addClass('nav-off');
	}
	resetTimer();
	
}

function animateTimer(){
	//jQuery("#nav_"+curHeroNum+"_bull").css({color:navColorArray[curHeroNum] , display:"block"});
	//jQuery("#nav_"+curHeroNum+"_bull").css({display:"block", opacity:.75}).fadeOut(5200);
}

function pauseTimerAnimation()
{
	jQuery("#nav_"+curHeroNum+"_bull").stop(true);
}


<!---------------------------------------------------------------------------------------------->
					<!--||||			Timer Functions			||||-->
<!---------------------------------------------------------------------------------------------->

function handleTimerInterval(){
	if(curHeroNum < totalNumHeros - 1){
		changeHero(curHeroNum + 1);
	} else {
		changeHero(0);
	}
}

function resetTimer(){
	timerActive = true;
	window.clearInterval(intervalID);
	if(timerActive == true){
		intervalID = setInterval(function() { handleTimerInterval(); }, 5000);
	}
	
	animateTimer();
}

function stopTimer(){
	timerActive = false;
	window.clearInterval(intervalID);

	pauseTimerAnimation();
}