//WEB SEARCH JS

//Validate Web Search, so empty searches are not executed
function validate (form) {
	if (form.q.value == "" || form.q.value.replace(/^\s*|\s*$/g,'') == "" || form.q.value == "Search here") {
    alert("Please enter a valid search term.");
    form.q.focus();
    return false ;
  }
  return true ;
}


//Swaps Tabs top SEACH BOX
function searchtabs(swap) 
{
	if (swap == 'websearch') {
	$("#websearch").show();
	$("#sitesearch").hide();
	$("#searchbox_top .google_logo").show();
	$("#web_tab").removeClass("inactive").addClass("active");
	$("#site_tab").removeClass("active").addClass("inactive");
		}
	
	else if (swap == 'sitesearch') {
	$("#websearch").hide();
	$("#sitesearch").show();
	$("#searchbox_top .google_logo").hide();
	$("#web_tab").removeClass("active").addClass("inactive");
	$("#site_tab").removeClass("inactive").addClass("active");
		}

}


//Swaps Tabs top SEACH BOX BOTTOM
function searchtabs_b(swap) 
{
	if (swap == 'websearch_b') {
	$("#websearch_b").show();
	$("#sitesearch_b").hide();
	$("#searchform_bottom .google_logo").show();
	$("#web_tab_b").removeClass("inactive").addClass("active");
	$("#site_tab_b").removeClass("active").addClass("inactive");
		}
	
	else if (swap == 'sitesearch_b') {
	$("#websearch_b").hide();
	$("#sitesearch_b").show();
	$("#searchform_bottom .google_logo").hide();
	$("#web_tab_b").removeClass("active").addClass("inactive");
	$("#site_tab_b").removeClass("inactive").addClass("active");
		}

}



//RECIPE FINDER SEARCH BOXES BELOW, USED FOR 3 TABBED SEARCH (WEB/SITE/RECIPES)
function searchtabs_rf(swap) 
{
	if (swap == 'websearch') {
	$("#websearch").show();
	$("#sitesearch").hide();
	$("#recipesearch").hide();
	$("#searchbox_top .google_logo").show();
	$("#web_tab").removeClass("inactive").addClass("active");
	$("#site_tab").removeClass("active").addClass("inactive");
	$("#recipe_tab").removeClass("active").addClass("inactive");
		}
	
	else if (swap == 'sitesearch') {
	$("#websearch").hide();
	$("#sitesearch").show();
	$("#recipesearch").hide();
	$("#searchbox_top .google_logo").hide();
	$("#web_tab").removeClass("active").addClass("inactive");
	$("#site_tab").removeClass("inactive").addClass("active");
	$("#recipe_tab").removeClass("active").addClass("inactive");
		}
		
	else if (swap == 'recipesearch') {
	$("#websearch").hide();
	$("#sitesearch").hide();
	$("#recipesearch").show();
	$("#searchbox_top .google_logo").hide();
	$("#web_tab").removeClass("active").addClass("inactive");
	$("#site_tab").removeClass("active").addClass("inactive");
	$("#recipe_tab").removeClass("inactive").addClass("active");
		}

}


//BOTTOM RF SEACH BOX
function searchtabs_rf_b(swap) 
{
	if (swap == 'websearch_b') {
	$("#websearch_b").show();
	$("#sitesearch_b").hide();
	$("#recipesearch_b").hide();
	$("#searchbox_bottom .google_logo").show();
	$("#web_tab_b").removeClass("inactive").addClass("active");
	$("#site_tab_b").removeClass("active").addClass("inactive");
	$("#recipe_tab_b").removeClass("active").addClass("inactive");
		}
	
	else if (swap == 'sitesearch_b') {
	$("#websearch_b").hide();
	$("#sitesearch_b").show();
	$("#recipesearch_b").hide();
	$("#searchbox_bottom .google_logo").hide();
	$("#web_tab_b").removeClass("active").addClass("inactive");
	$("#site_tab_b").removeClass("inactive").addClass("active");
	$("#recipe_tab_b").removeClass("active").addClass("inactive");
		}
		
	else if (swap == 'recipesearch_b') {
	$("#websearch_b").hide();
	$("#sitesearch_b").hide();
	$("#recipesearch_b").show();
	$("#searchbox_bottom .google_logo").hide();
	$("#web_tab_b").removeClass("active").addClass("inactive");
	$("#site_tab_b").removeClass("active").addClass("inactive");
	$("#recipe_tab_b").removeClass("inactive").addClass("active");
		}

}


