	/*This script is for search results page begins*/
		function search(form) {
	     var formActionURL="";
		var helpFormActionURL="";
		var medicationFormActionURL="";
		var healthFormActionURL="";
		

		var txt = document.searchForm.question.value;

		

		
		formActionURL="search_results.jsp?removeAllFacets=true&addFacet=SRCH:"+txt;
		helpFormActionURL="help_all_results.jsp?removeAllFacets=true&addFacet=SRCH:"+txt;
		medicationFormActionURL="medication_all_results.jsp?removeAllFacets=true&addFacet=SRCH:"+txt;
		healthFormActionURL="health_all_results.jsp?removeAllFacets=true&addFacet=SRCH:"+txt;
		
		

	   if(form.name =='healthBreadcrumbSearchResultsForm'){
		 form.action=formActionURL;
	   }
	    else if(form.name =='helpBreadcrumbSearchResultsForm'){
		 form.action = formActionURL;
	  }
	    else if(form.name =='medicationBreadcrumbSearchResultsForm'){
		 form.action = formActionURL;
	  }
	
	   else if(form.name=='backToSearchResultsForm'){
		form.action = formActionURL;
	  }
	  else if(form.name=='leftNavHelpForm'){
	
		form.action = helpFormActionURL;
	  }
	  else if(form.name=='helpForm'){
		form.action = helpFormActionURL;
	  }
	  else if(form.name=='helpForm'){
		form.action = helpFormActionURL;
	  }
	   else if(form.name=='leftNavMedicationForm'){
		form.action = medicationFormActionURL;
	  }
	  else if(form.name=='medicationForm'){
		form.action = medicationFormActionURL;
	  }
	   else if(form.name=='leftNavHealthForm'){
		form.action = healthFormActionURL;
	  }
	  else if(form.name=='healthForm'){

		form.action =healthFormActionURL;
	  }
	    else if(form.name=='headerForm'){

		form.action =formActionURL;
	  }
		
	     form.submit();
    }

	function spellSuggest(form)
	{
		var spellTerm=document.searchTermForm.spellSuggestion1.value;
		spellTermURL ="search_results.jsp?removeAllFacets=true&addFacet=SRCH:"+spellTerm;
    	 if(form.name=='searchTermForm'){
		 form.action = spellTermURL;
		}
		form.submit();
	}
	
	/*This script is used for Search jsp*/
	function GlobalSearch(searchQueryParam)
	{
		var searchTerm = document.GlobalSearchForm.searchTermId.value;
		if(searchTerm!="")
		{
	    	document.GlobalSearchForm.action="../"+searchQueryParam+"&Ntt="+searchTerm;
		}
		else
		{
	   		document.GlobalSearchForm.action="../search/search_no_results.jsp";
		}
	}
	
	/*This script is used for Drug only search results*/
	function Drug_Search(searchQueryParam)
	{
	   	var searchTerm = document.DrugSearchForm.searchDrugName.value;
		if(searchTerm!="")
		{
	    	document.DrugSearchForm.action="../"+searchQueryParam+"&Ntt="+searchTerm;
		}
		else
		{
	   		document.DrugSearchForm.action="../search/search_no_results.jsp";
		}
	}
	
	/*This script is used for Beauty360 search results*/
	function GlobalSearchBeauty360(searchQueryParam)
	{
		var searchTerm = document.Beauty360Form.b360searchterm.value;
		if(searchTerm!="")
		{
	    	document.Beauty360Form.action="../"+searchQueryParam+"&Ntt="+searchTerm;
		}
		else
		{
	   		document.Beauty360Form.action="../search/search_no_results.jsp";
		}
	}
	
	/*This script is used for Help results*/
	function Help_Search(searchQueryParam)
	{
		var searchTerm = document.HelpSearchForm.searchHelpQuestion.value;
		if(searchTerm!="")
		{
	    	document.HelpSearchForm.action="../"+searchQueryParam+"&Ntt="+searchTerm;
		}
		else
		{
	   		document.HelpSearchForm.action="../search/search_no_results.jsp";
		}
	}

	

	   /*This script is for search results page ends*/
	    /*This script is for sorting search results page begins*/
	   	function sort(form) {
					var sortProp = document.sortForm.sortBy.value;
					if(sortProp == 'relevance'){
						document.sortForm.docSort.value = 'relevance';
						} else if(sortProp == 'strpropAZ'){
							document.sortForm.docSort.value = 'title';
							document.sortForm.docSortOrder.value='ascending';
						} else if(sortProp == 'strpropZA'){
							document.sortForm.docSort.value = 'title';
							document.sortForm.docSortOrder.value='descending';
						} else if(sortProp == 'numpropLH'){
							document.sortForm.docSort.value = 'numprop';
							document.sortForm.docSortProp.value='Price';
							document.sortForm.docSortOrder.value='ascending';
						} else if(sortProp == 'numpropHL'){
							document.sortForm.docSort.value = 'numprop';
							document.sortForm.docSortProp.value='Price';
							document.sortForm.docSortOrder.value='descending';
						}
					form.action="search_results.jsp?hideImage="+form.hideImage.value;	
					form.submit();
				}
		 /*This script is for sorting search results page ends*/
		 	 
		function checkKey()
{
if ((event.keyCode < 48) || (event.keyCode > 57))
    {
        event.returnValue = false;
    }
}
function checkQty(count,maxqnty){
    
    var userQnty=document.getElementById("userQty"+count).value;
    document.getElementById("qty"+count).value=userQnty;
    if(userQnty>maxqnty)
    {
        
        document.getElementById("limit"+count).style.display="block";
        
    }else
        document.getElementById("limit"+count).style.display="none";
    
}
		 /*This script is to display confirmation pop up box starts*/
function showAddConfirmationSearch(giftItemId,giftlistId,returnToShopping) {
	if ((giftlistId != null) && (giftlistId != null)) {
		var dialogURL = "../user/add_shopping_list_confirmation.jsp?giftItemId="+giftItemId+"&giftlistId="+giftlistId+"&returnToShopping="+returnToShopping;
		if (window.showModalDialog) {
			var returnVal = window.showModalDialog(dialogURL,'Add to Shoppinglist','dialogWidth:677px;dialogHeight:509px;resizable:no;help:no;status:no;scroll:no');
			if (returnVal != null) {
				window.location.href = returnVal;
			}
		} else {
			var returnVal = window.open(dialogURL, "Add to Shoppinglist", "width=677,height=509,scrollbars=no,titlebar=no,alwaysRaised=yes,dialog,modal=yes");
		}
	}
}


			 /*This script is to display confirmation pop up box ends*/
			function doSearch()
			{
				document.getElementById('searchForm').submit();
			}
			
			/*This script for save to list functionality starts*/
			 function saveToList(itemIndex)
			 {
				var elementName = "submit"+itemIndex;
				document.getElementById(elementName).click();
 			 }
			 /*This script for save to list functionality ends*/
		