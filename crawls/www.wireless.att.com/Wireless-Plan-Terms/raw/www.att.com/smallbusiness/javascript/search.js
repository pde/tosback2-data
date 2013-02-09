function showFilter(facetType){
	
	if(facetType=='support')
    {
    	$("#supportFacet").css('display', 'block');
        $("#collapse_support").css('display', 'block');
        $("#expand_support").css('display', 'none');
        
    }
    else if(facetType=='solution')
    {
        $("#solutionFacet").css('display', 'block');
        $("#collapse_solution").css('display', 'block');
        $("#expand_solution").css('display', 'none');
        
    }
    else 
        {	
            $("."+facetType).css('display', 'block');
            $("#collapse-"+facetType).css('display', 'block');
            $("#expand-"+facetType).css('display', 'none');
        }
    
}

function hideFilter(facetType){
	
   
    if(facetType=='support')
    {
        $("#supportFacet").css('display', 'none');
        $("#expand_support").css('display', 'block');
        $("#collapse_support").css('display', 'none');
        
    }
    else if(facetType=='solution')
    {
        $("#solutionFacet").css('display', 'none');
        $("#expand_solution").css('display', 'block');
        $("#collapse_solution").css('display', 'none');
        
    }
    else 
    {
    
        $("."+facetType).css('display', 'none');
        $("#collapse-"+facetType).css('display', 'none');
        $("#expand-"+facetType).css('display', 'block');
    }
     
}

function submitForm(searchTerm)
{  	var searchTerm = searchTerm;
	var findReplace = [[/</g, ""], [/>/g, ""], [/"/g, ""]]
	for(var item in findReplace)
		searchTerm = searchTerm.replace(findReplace[item][0], findReplace[item][1]);
	
	$("#question").val(searchTerm);
    $("#question_").val(searchTerm);
    $("#currentSelection").val("");
    if(window.WebMetrics){
    	WebMetrics.DCSext.wtB2BSearchTerm = searchTerm;
    	WebMetrics.dispatchReport("SMBID_SearchResultsPg_Search");
    }
    $("#searchButton").trigger("click");
    
}

function validateQuestion()

{ 
	searchTerm=$("#question_").val();
	var searchTerm = searchTerm;
	var findReplace = [[/</g, ""], [/>/g, ""], [/"/g, ""]]
	for(var item in findReplace)
		searchTerm = searchTerm.replace(findReplace[item][0], findReplace[item][1]);
	$("#question").val(searchTerm);
    $("#question_").val(searchTerm);
    $("#currentSelection").val("");
    $("#searchButton").trigger("click");
    }


function clearSearch()
{
	$("#question").val(searchTerm);
	$("#currentFilters").val(searchTerm);
}


function submitSubFilter(ts,rc,cs){
	
	$("#trail").val(ts);
    $("#facetTrailSub").val(ts);
    $("#refineConfigSub").val(rc);
    $("#currentSelectionSub").val(cs);
    document.getElementById('subFilterForm').submit();
    }

function submitFacetFilter(ts,rc){
    
    var trailStr = buildTrailString();    
    document.getElementById('trail').value=ts + ':' + trailStr;
    document.getElementById('facetTrailSub').value=ts + ':' + trailStr;
    document.getElementById('refineConfigSub').value="";
    document.getElementById('currentSelectionSub').value=rc;
    document.getElementById('filterSelectionSub').value=trailStr;
    document.getElementById('subFilterForm').submit();
    
    
    }


function buildTrailString(){
    
    var filters = document.getElementsByName('filterCheck');
    
    var trailStr ="";
	for(var i=0; i< filters.length; i++){
		if(filters[i].checked){
			var filterValue = filters[i].value;
			var filterSplit = filterValue.split(':');
			var refId = filterSplit[0];
			var refVal = filterSplit[1];
			if(trailStr == ""){
				trailStr = filterValue;
			}else{
				if(trailStr.indexOf(refId) > -1 && trailStr.indexOf(refVal) < 0){
					trailStr = trailStr.substr(0,trailStr.indexOf(refId)+ refId.length + 1) + refVal + '|' + trailStr.substr(trailStr.indexOf(refId) + refId.length + 1);
				}else if(trailStr.indexOf(refVal) < 0){
					trailStr = trailStr + ':' + filterValue;
				}
			}
		}
		
	}
	return trailStr;
    
}

function submitGlobalFilter(ts,rc,current){
    
    $("#trail").val(ts);
    $("#facetTrail").val(ts);
    $("#refineConfig").val(rc);
    $("#currentSelection").val(current);
    $("#enableFilterFacet").val(false);
    $("#globalSearch").val(false);
    $("#searchButton").trigger("click");
}

function submitSupportFilter(ts,current){
    
	$("#trail").val(ts); 
    $("#facetTrail").val(ts);
    $("#currentSelection").val(current);
    $("#supportSelection").val(current); 
    $("#enableFilterFacet").val(false);
    $("#globalSearch").val(false);
    $("#searchButton").trigger("click");
}


function nextPage(pageNum, requestChainToken , searchTerm)
{   $("#pageSize").val("10");
    $("#requestChainToken").val(requestChainToken);
    $("#goToPage").val(pageNum);
    $("#question_").val(searchTerm);
    $("#question").val(searchTerm);
    $("#globalSearch").val(false);
    $("#pageRequest").val(true);    
    $("#searchButton").trigger("click");
    return false;
}
function deselectAll(id){
    var allElm = document.getElementById(id);
    allElm.checked = false;
}
