function ValidateSearchRequest(f) 
{
	if(f.txtDesc.value!="Enter keyword of item #")
	{
		
		//encode the value to handle special characters
		var encodedValue = escape(f.txtDesc.value);

		//Change the search box name and add new hidden field with same name and id
		//To avoid change in other areas
		f.txtDesc.id = "searchinput1";
		f.txtDesc.name = "txtDesc1";
		
		//add new element to the existing form 
		var field = document.createElement("input");
		field.setAttribute("type","hidden");
		field.setAttribute("value",encodedValue);
		field.setAttribute("name","txtDesc");
		field.setAttribute("id","searchinput");
		f.appendChild(field);

		// car 05June2007 - need to set the form action to /qsearch/search.aspx, and there needs to be
		// NO query string variables. so we have to make sure qic does not rewrite this form action
		var searchUrl = "http://www.qvc.com/qsearch/search.aspx";
		f.action = searchUrl;

		return true;
	} else 
	{
		alert("Please enter one or more search words before clicking SEARCH.");return false;
	}
}
