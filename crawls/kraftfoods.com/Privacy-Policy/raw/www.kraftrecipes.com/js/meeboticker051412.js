//*****     VARS     *****//

var curMeeboTickerLink = "";
var curMeeboTickerTag = "";
var meeboTickerIntervalID;
var meeboTickerLabelsArray = [
			"Healthy Living Recipes",
			"Top Rated Chicken Recipes",
			"BBQ Recipes",
			"Memorial Day Recipes"
			];
var meeboTickerIconsArray = [
			"/SiteCollectionImages/ImageRepository/Feb_11/hl_icon.gif",
			"/SiteCollectionImages/ImageRepository/Feb_11/kr_icon.png",
			"/SiteCollectionImages/ImageRepository/May_12/Meebo_BBQ.png",
			"/SiteCollectionImages/ImageRepository/May_12/Meebo_Flag.png"
			];
var meeboTickerLinksArray = [
			"http://www.kraftrecipes.com/recipes/healthy-living/healthy-living-recipes/main.aspx",
			"http://www.kraftrecipes.com/recipes/dinner/chicken-recipes/main.aspx",
			"http://www.kraftrecipes.com/recipes/holidays-and-entertaining/entertaining/summer-center/bbq-recipes/main.aspx",
			"http://www.kraftrecipes.com/recipes/holidays-and-entertaining/holidays/memorial-day-recipes.aspx"
			];
var meeboTickerTagsArray = [
			"Healthy Living",
			"Top Rated Chicken Recipes",
			"BBQ Recipes",
			"Memorial Day Recipes"
			];


//*****     INIT FUNCTIONS     *****//
function createRecipeButton(){
	 Meebo('addButton', {
        id: "recipesByEmail", 
        type: "menu", 
        icon: "/SiteCollectionImages/ImageRepository/Feb_11/rbe_icon.png",
        label: "Recipe By Email",
        items: [
            {value: "http://www.kraftrecipes.com/registration/contextualsignuplogin.aspx?RegistrationActivityID=1315", text: "Sign up for Recipe By Email", icon: ""}
        ],
        onSelect: function(value){ 
            window.location = value; 
        } 
    });
}

function createTickerButton(){
	Meebo('addButton', {
		id: "meeboTicker", 
		type: "action", 
		icon: "/SiteCollectionImages/ImageRepository/Feb_11/hl_icon.gif",
		label: "Healthy Living Recipes &nbsp;", 
		onClick: function(){ 
			handleMeeboTickerClick(); 
		}
	});
}

function initTickerItems(){
		
	jQuery('#meeboTicker').empty();
	
	for($i = 0; $i < meeboTickerLinksArray.length; $i++){
		jQuery('#meeboTicker').append('<div id="meeboItem" style="width: 500px; background-color: #e5e5e5;"><div style="float: left; height: 20px; margin-top: 3px; padding-left: 7px; background-color: #e5e5e5;"><img src="' + meeboTickerIconsArray[$i] + '"></div><div style="float: left; width: 300px; background-color: #e5e5e5; color: #666; font-family: Tahoma, Arial, sans-serif; font-size: 11px; margin-top: 5px; padding-left: 4px; overflow: hidden; height: 20px;">' + meeboTickerLabelsArray[$i] + '</div></div>');
	
	}
	
	jQuery(".meeboItem").click(function(){
		handleMeeboTickerClick();
		return false;
	});
	
	jQuery('#meeboTicker').css({
		'position': 'relative',
		'top': '2px',
		'width': 300,
		'borderRight': '1px solid #999',
		'borderLeft': '1px solid #999',
		'cursor': 'pointer'
	});
}
	
//*****     EVENT HANDLER FUNCTIONS     *****//

function handleMeeboTickerClick(){
	cmCreateElementTag(curMeeboTickerTag,'Meebo Toolbar');
	window.location = curMeeboTickerLink;
}

function changeMeeboTickerItem(curr,next,opts){
	curMeeboTickerLink = meeboTickerLinksArray[opts.currSlide];
	curMeeboTickerTag = meeboTickerTagsArray[opts.currSlide];
}

//*****     TIMER FUNCTIONS     *****//

function resetMeeboTickerTimer(){
	meeboTickerIntervalID = setInterval(function() { handleMeeboTickerTimerInterval(); }, 4000); 
	//alert("meebo ticker timer fired");
}
function handleMeeboTickerTimerInterval(){
	window.clearInterval(meeboTickerIntervalID);
	createRecipeButton();
	createTickerButton();
	initTickerItems();
	jQuery('#meeboTicker').cycle({
		fx: 'scrollDown',
		after:	changeMeeboTickerItem
	});
}
	