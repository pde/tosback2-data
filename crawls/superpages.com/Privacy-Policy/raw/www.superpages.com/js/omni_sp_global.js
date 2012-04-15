// jQuery Enter Key tracking
(function(a){a.fn.listenForEnter=function(){return this.each(function(){a(this).focus(function(){a(this).data("safeEnter_InAutocomplete",false)});a(this).keypress(function(c){var b=(c.keyCode?c.keyCode:c.which);switch(b){case 13:if(!a(this).data("safeEnter_InAutocomplete")||!a(this).is("input[type=text]")||a.browser.opera){a(this).trigger("pressedEnter",c)}a(this).data("safeEnter_InAutocomplete",false);break;case 40:case 38:case 34:case 33:a(this).data("safeEnter_InAutocomplete",true);break;default:a(this).data("safeEnter_InAutocomplete",false);break}})})};a.fn.clickOnEnter=function(b){return this.each(function(){a(this).listenForEnter().bind("pressedEnter",function(){a(b).click()})})}})(jQuery);

if(typeof(s_account) == 'undefined')
{
	var host_name = window.location.hostname;
	if (host_name.indexOf('test') > 0 || host_name.indexOf('demo') > 0 || host_name == 'superpages.localhost' || host_name == 'spdev.superpages.com' || host_name == 'sptest.superpages.com')
	{
		s_account = 'superpagesdev';
	}
	else
	{
		s_account = 'superpagescom';
	}
}

function getItemClickedGlobal(click_name, event)
{
	var s=s_gi(s_account);
    var event_name = "";

	page_name = (typeof(s.pageName) != 'undefined' && s.pageName != null )? ( (s.pageName.indexOf('SPHP') != -1) ? 'SPHP' : s.pageName ) : '';

    // To avoid "s.pageName not found" error on header link clicks, Sarayu 2/3/2011
	//s.pageName = null;	// We're only tracking clicks, not page loads.
    
    // Clear the Omniture object in case the user clicks multiple items.
	s.prop9 = null;
	s.prop25 = null;
	s.prop40 = null;
	s.prop41 = null;
	s.prop43 = null;
	s.eVar13 = null;
	s.linkTrackEvents = null;
    s.events = null;
    s.products = null;
    
    switch (click_name)
	{
        case 'gt_mobile':
        {
        	s.prop40="GT:Mobile:"+page_name;
            break;
        }
        case 'gt_advertise':
        {        	
        	s.prop41="Header:Claim My Listing:"+page_name;
            break;
        }
        case 'gt_mysuperpages':
        {
        	s.prop40="GT:MySuperpages:"+page_name;
            break;
        }
        case 'gt_superguarantee':
        {
        	s.prop40="GT:CSG:"+page_name;
            break;
        }
        case 'gt_signin':
        {
        	s.prop40="GT:SignIn:"+page_name;
            break;
        }
        case 'gt_facebook_signin':
        {
        	s.prop40="GT:FB SignIn:"+page_name;
            break;
        }
        case 'header_businesses':
        {
        	s.prop9="Header:Businesses:"+page_name;
            break;
        }
        case 'header_people':
        {
        	s.prop9="Header:People:"+page_name;
            break;
        }
        case 'header_cars':
        {
        	s.prop9="Header:Cars:"+page_name;
            break;
        }
        case 'header_maps':
        {
        	s.prop9="Header:Maps:"+page_name;
            break;
        }
        case 'header_coupons':
        {
        	s.prop9="Header:Coupons:"+page_name;
            break;
        }
        case 'header_supertips':
        {
        	s.prop9="Header:Supertips:"+page_name;
            break;
        }
        case 'header_weather':
        {
        	s.prop9="Header:Weather:"+page_name;
            break;
        }
        case 'header_lottery':
        {
        	s.prop9="Header:Lottery:"+page_name;
            break;
        }
        case 'header_superguarantee':
        {
        	s.prop9="Header:Superguarantee:"+page_name;
            break;
        }
        case 'header_shopping':
        {
        	s.prop9="Header:Shopping:"+page_name;
            break;
        }
        case 'header_games':
        {
        	s.prop9="Header:Games:"+page_name;
            break;
        }
        case 'header_search':
        {
        	s.prop40="Header:ClickSearch:"+page_name;
                event_name = "event21";
                s.eVar25 = "Header:ClickSearch:"+page_name;
            break;
        }
        case 'header_return_search':
        {
                s.prop40="Header:ReturnSearch:"+page_name;
                event_name = "event21";
                s.eVar25 = "Header:ReturnSearch:"+page_name;
            break;
        }
        case 'header_advanced_search':
        {
        	s.prop41="Search Widget:Search Option:"+page_name;
            break;
        }
        case 'header_change_city':
        {
        	s.prop41="Header:Change City:"+page_name;
            break;
        }
        case 'header_superguarantee_cape':
        {
        	s.prop41 = "Header:CSG: Cape Learn More";
        	break;
        }
        case 'header_superguarantee_learn':
        {
        	/*s.prop41 = "Header:CSG: Ribbon Learn More";*/
        	s.prop41 = "Header:Mobile:On the Go";
        	break;
        }
		case 'header_logo':
        {
        	s.prop40 = "Header:SP.com Logo";
        	break;
        } 
		case  'header_fbconnect':
		{
			s.prop40 = "GT:FBConnect:"+page_name;
        	break;
		}
        case 'footer_get_account':
        {
        	s.prop40="FT:Get a free account";
            break;
        }
        case 'footer_feedback':
        {
        	s.prop40="FT:Feedback";
            break;
        }
        case 'footer_facebook':
        {
        	s.prop40="FT:Facebook";
            break;
        }
        case 'footer_twitter':
        {
        	s.prop40="FT:Follow us on Twitter";
            break;
        }
        case 'footer_sharethis':
        {
        	s.prop40="FT:ShareThis";
            break;
        }
        case 'footer_about':
        {
        	s.prop40="FT:About Superpages";
            break;
        }
        case 'footer_add_business':
        {
        	s.prop40="FT:Add or Edit a Business";
            break;
        }
        case 'footer_advertise':
        {
        	s.prop40="FT:Advertise with Us";
            break;
        }
        case 'footer_affiliate':
        {
        	s.prop40="FT:Affiliate Program";
            break;
        }
        case 'footer_careers':
        {
        	s.prop40="FT:Careers";
            break;
        }
        case 'footer_contact':
        {
        	s.prop40="FT:Contact Us";
            break;
        }
        case 'footer_patents':
        {
        	s.prop40="FT:Patents";
            break;
        }
        case 'footer_privacy':
        {
        	s.prop40="FT:Privacy Policy";
            break;
        }
        case 'footer_terms':
        {
        	s.prop40="FT:Terms of Use";
            break;
        }
		case 'footer_home':
        {
        	s.prop40 = "FT:Home";
        	break;
        }
		case 'footer_cars':
        {
        	s.prop40 = "FT:Cars";
        	break;
        }
		case 'footer_coupons':
        {
        	s.prop40 = "FT:Coupons";
        	break;
        }
        case 'footer_games':
        {
        	s.prop40="FT:Games";
            break;
        }
		case 'footer_maps':
        {
        	s.prop40 = "FT:Maps & Directions";
        	break;
        }
		case 'footer_mobile':
        {
        	s.prop40 = "FT:SuperpagesMobile";
        	break;
        }
        case 'footer_shopping':
        {
        	s.prop40="FT:Online Shopping";
            break;
        }
        case 'footer_sitemap':
        {
        	s.prop40="FT:Site Map";
            break;
        }
        case 'footer_whitepages':
        {
        	s.prop40="FT:White Pages";
            break;
        }
        case 'footer_yellowpages':
        {
        	s.prop40="FT:Yellow Pages";
            break;
        }
        case 'footer_blackfriday':
        {
        	s.prop40="FT:Black Friday Deals";
            break;
        }
        case 'footer_cybermonday':
        {
        	s.prop40="FT:Cyber Monday Deals";
            break;
        }
        case 'footer_asklearnhire':
        {
        	s.prop40="FT:Ask Learn Hire";
            break;
        }
        case 'footer_cityguides':
        {
        	s.prop40="FT:City Guides";
            break;
        }
        case 'footer_everycarlisted':
        {
        	s.prop40="FT:Every Car Listed";
            break;
        }
        case 'footer_featuredbiz':
        {
        	s.prop40="FT:Featured Businesses";
            break;
        }
        case 'footer_popular_categories':
        {
        	s.prop40="FT:Popular Categories";
            break;
        }
        case 'footer_socialmedia':
        {
        	s.prop40="FT:Social Media";
            break;
        }
		case 'footer_superguarantee':
        {
        	s.prop40 = "FT:SuperGuarantee";
        	break;
        }
        case 'footer_supertips':
        {
        	s.prop40="FT:Consumer Center";
            break;
        }
		case 'footer_lottery':
        {
        	s.prop40 = "FT:Lottery Results";
        	break;
        }	
		case 'footer_weather':
        {
        	s.prop40 = "FT:Weather Forecasts";
        	break;
        }		
        case 'sharethis_email':
        {
        	s.prop40 = "FT:ShareThis:Email";
        	break;
        }
        case 'sharethis_facebook':
        {
        	s.prop40 = "FT:ShareThis:Facebook";
        	break;
        }
        case 'sharethis_twitter':
        {
        	s.prop40 = "FT:ShareThis:Twitter";
        	break;
        }
        case 'sharethis_gbuzz':
        {
        	s.prop40 = "FT:ShareThis:Google Buzz";
        	break;
        }
        case 'sharethis_blogger':
        {
        	s.prop40 = "FT:ShareThis:Blogger";
        	break;
        }
        case 'sharethis_myspace':
        {
        	s.prop40 = "FT:ShareThis:MySpace";
        	break;
        }
        case 'sharethis_digg':
        {
        	s.prop40 = "FT:ShareThis:Digg";
        	break;
        }
        case 'sharethis_aim':
        {
        	s.prop40 = "FT:ShareThis:AIM Share";
        	break;
        }
        case 'sharethis_stumbleupon':
        {
        	s.prop40 = "FT:ShareThis:Stumbleupon";
        	break;
        }
        case 'sharethis_windows_live':
        {
        	s.prop40 = "FT:ShareThis:Windows Live";
        	break;
        }
		/* Omniture code popular categories for the new footer */
		case 'footer_category_apartments':
        {
        	s.prop40="FT:Popular Searches:Apartments";
            break;
        }
		case 'footer_category_attorneys':
        {
        	s.prop40="FT:Popular Searches:Attorneys";
            break;
        }
		case 'footer_category_auto_parts':
        {
        	s.prop40="FT:Popular Searches:Auto Parts";
            break;
        }
		case 'footer_category_auto_repair':
        {
        	s.prop40="FT:Popular Searches:Auto Repair";
            break;
        }
		case 'footer_category_banks':
        {
        	s.prop40="FT:Popular Searches:Banks";
            break;
        }
		case 'footer_category_car_rental':
        {
        	s.prop40="FT:Popular Searches:Car Rental";
            break;
        }
		case 'footer_category_churches':
        {
        	s.prop40="FT:Popular Searches:Churches";
            break;
        }
		case 'footer_category_computer_repair':
        {
        	s.prop40="FT:Popular Searches:Computer Repair";
            break;
        }
		case 'footer_category_dentists':
        {
        	s.prop40="FT:Popular Searches:Dentists";
            break;
        }
		case 'footer_category_doctors':
        {
        	s.prop40="FT:Popular Searches:Doctors";
            break;
        }
		case 'footer_category_dry_cleaners':
        {
        	s.prop40="FT:Popular Searches:Dry Cleaners";
            break;
        }	
		case 'footer_category_flooring':
        {
        	s.prop40="FT:Popular Searches:Flooring";
            break;
        }
		case 'footer_category_florists':
        {
        	s.prop40="FT:Popular Searches:Florists";
            break;
        }
		case 'footer_category_golf_courses':
        {
        	s.prop40="FT:Popular Searches:Golf Courses";
            break;
        }		
		case 'footer_category_grocery_stores':
        {
        	s.prop40="FT:Popular Searches:Grocery Stores";
            break;
        }		
		case 'footer_category_hotels':
        {
        	s.prop40="FT:Popular Searches:Hotels";
            break;
        }
		case 'footer_category_insurance':
        {
        	s.prop40="FT:Popular Searches:Insurance";
            break;
        }
		case 'footer_category_locksmiths':
        {
        	s.prop40="FT:Popular Searches:Locksmiths";
            break;
        }
		case 'footer_category_movers':
        {
        	s.prop40="FT:Popular Searches:Movers";
            break;
        }
		case 'footer_category_movie_theaters':
        {
        	s.prop40="FT:Popular Searches:Movie Theaters";
            break;
        }
		case 'footer_category_nursing_homes':
        {
        	s.prop40="FT:Popular Searches:Nursing Homes";
            break;
        }
		case 'footer_category_painters':
        {
        	s.prop40="FT:Popular Searches:Painters";
            break;
        }
		case 'footer_category_pest_control':
        {
        	s.prop40="FT:Popular Searches:Pest Control";
            break;
        }
		case 'footer_category_pet_stores':
        {
        	s.prop40="FT:Popular Searches:Pet Stores";
            break;
        }
		case 'footer_category_plumbers':
        {
        	s.prop40="FT:Popular Searches:Plumbers";
            break;
        }
		case 'footer_category_restaurants':
        {
        	s.prop40="FT:Popular Searches:Restaurants";
            break;
        }
		case 'footer_category_schools':
        {
        	s.prop40="FT:Popular Searches:Schools";
            break;
        }
		case 'footer_category_self_storage':
        {
        	s.prop40="FT:Popular Searches:Self Storage";
            break;
        }
		case 'footer_category_used_cars':
        {
        	s.prop40="FT:Popular Searches:Used Cars";
            break;
        }
		case 'footer_category_veterinarians':
        {
        	s.prop40="FT:Popular Searches:Veterinarians";
            break;
        }
		case 'footer_category_child_care':
        {
        	s.prop40="FT:Popular Searches:Child Care";
            break;
        }
		case 'footer_category_contractors':
        {
        	s.prop40="FT:Popular Searches:Contractors";
            break;
        }
		case 'footer_category_electricians':
        {
        	s.prop40="FT:Popular Searches:Electricians";
            break;
        }
		case 'footer_category_home_improvement':
        {
        	s.prop40="FT:Popular Searches:Home Improvement";
            break;
        }
		case 'footer_category_surgeons':
        {
        	s.prop40="FT:Popular Searches:Surgeons";
            break;
        }
		case '404error_cpmimage':
        {
        	s.prop25="404:Footer";
			event_name = event;
            break;
        }
		case 'footer_supermedia_logo':
        {
        	s.prop40="FT:SuperMedia Logo";
            break;
        }
		case 'footer_terms_conditions':
        {
        	s.prop40="FT:terms and conditions";
            break;
        }
		case 'footer_feedback_icon':
		{
			s.prop40="FT:Feedback";
            break;
		}
		case 'emailsignup':
		{
			s.prop40="FT:Email Exclusives";
            break;
		}
    }
     
    s.linkTrackVars='prop4,prop5,prop6,prop7,prop9,prop25,prop40,prop41,prop43,eVar13,eVar25,products';
    
    if(event_name != "")
    {
    	s.linkTrackVars += ',events';
    	s.linkTrackEvents = event_name;
        s.events = event_name;
    }
    
    s.tl(this,'o', click_name);
}

function capeClick(){
    s.prop41="Header:CSG:Cape Learn More";
    s.linkTrackVars='prop41';
    s.tl(this,'o',"caped_guy");
}
function clickTrackCMPRightRail(type){

  var s = s_gi(s_account);
  var label = "404:"+type;
  s.linkTrackVars = "prop25,events";
  s.linkTrackEvents = "event22";
  s.prop25 = label;
  s.events = "event22";
  void(s.tl(this,"o",label)); 
	   
}	

function clickTrack404ErrorGolink(type,option){
	
  
  
  var s = s_gi(s_account);
  var label = type+" <"+option+">";
  s.linkTrackVars = "prop25,events";
  s.linkTrackEvents = "event22";
  s.prop25 = label;
  s.events = "event22";
  void(s.tl(this,"o",label)); 		

}
jQuery(document).ready(function($)
{
	// Normal Omniture tracking.
    $('[class*="ot_"]').live('click',function()
    {
    	var classList = this.className.split(/\s+/);
    	
    	for (i = 0; i < classList.length; i++)
    	{
    	   if(classList[i].substr(0, 3) == "ot_")
    	   {
    	        getItemClickedGlobal(classList[i].substr(3), this);
    	   }
    	}
	});
    $('#what').listenForEnter().bind('pressedEnter', function(){
        getItemClickedGlobal("header_return_search", "event21");
    });

});
