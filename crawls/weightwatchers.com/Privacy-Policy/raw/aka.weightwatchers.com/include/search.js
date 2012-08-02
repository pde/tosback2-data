var message = tmpSearchText
var msgError = msgWildcard;
var kObj=null;
var cObj=null;

function RunSearch(cid,kid,domain){ 
    var category, keyword;   
     
    if(document.getElementById){ 

        kObj = document.getElementById(kid); 
        cObj = document.getElementById(cid); 

        category = cObj.options[cObj.selectedIndex].value; 
        kObj.value = Trim(kObj.value);
        keyword = kObj.value;         
        if (keyword.indexOf("*") >-1 && keyword.length < 4)
        {
           WarringCheck(kObj);
           return false;
        }

        if (category == "0"){
            if (ErrCheck(kObj)) return false;
        }
        Redirect(category, keyword, domain);

        if (kObj.value == message) kObj.value = "";
    } 
} 
function RunAllTermsSearch(kid,domain)
{ 
    var category, keyword;   
     
    if(document.getElementById)
    {  
        kObj = document.getElementById(kid); 
		
        category = "0";//all terms 
        kObj.value = Trim(kObj.value);
        keyword = kObj.value;         
        if (keyword.indexOf("*") >-1 && keyword.length < 4)
        {
           WarringCheck(kObj);
           return false;
        }

        if (category == "0"){
            if (ErrCheck(kObj)) return false;
        }
        Redirect(category, keyword, domain);

        if (kObj.value == message) kObj.value = "";
    } 
} 
function Redirect(category, keyword, pDomain)
{
    //added for the purpose of using absolute urls
    var domain = "";
    
    if (document.getElementById("domainHidden") != null)
    {
        domain = document.getElementById("domainHidden").value;
    }
    
    if (domain != null && domain != "")
    {
        domain = "http://" + domain;
    }
    else if (pDomain != null && pDomain != "")
    {
        domain = pDomain;
    }
    
	if (category == "0")
		parent.location.href = domain + "/search/sitewide.aspx?cat=0&search=" + encodeURIComponent(keyword);
	else
		parent.location.href = domain + "/search/category.aspx?cat=" + category + "&search=" + encodeURIComponent(keyword);	
}

function ErrCheck(obj){ 
    if(!obj.value || obj.value == message  || obj.value == obj.getAttribute('PlaceHolder')){ 
        obj.value = message; 
        obj.blur(); 
        return true; 
    } 
    return false; 
} 

//This method was created for 9.4 search for WildCard 
function WarringCheck(obj){     
        
        alert(msgError);
        obj.blur(); 
        return true;    
} 

function Trim(str){ 
   return str.replace(/^\s+|\s+$/g,""); 
} 

function OnFocusClearField(kid){
    if(document.getElementById){
        kObj = document.getElementById(kid);
        if(kObj.value == message) kObj.value = "";
    }
}

//This method was created for 6.0components and it get text 
//entered in textBoxId and submit page to search page using
//Redirect method
function RunSearchTextBox(textBoxId, catId, validationMessage)
{
	var textBoxObject;
	var keyword;
	
	if(document.getElementById)
	{
		textBoxObject = document.getElementById(textBoxId);
		keyword = textBoxObject.value;
		if(keyword)
		{
			Redirect(catId, keyword);
		}
		else
		{
			if(validationMessage)
			{
				alert(validationMessage);
			}
			textBoxObject.focus();
			return false;
		}
	}
}

// Handled show-hide states for Recipe Image and List views
// Category: Recipe
function ShowHideSearchView(category) {

    if (category == "ViewImage") {

        $('#divImgView').css("display", "block");
        $('#divListView').css("display", "none");

        $('#lnkListView').removeClass('disabledAnchor');
        $('#lnkListView').addClass('activatedAnchor');

        $('#lnkImageView').removeClass('activatedAnchor');
        $('#lnkImageView').addClass('disabledAnchor');

        if ($("#anchPre").length > 0) {
            $("#anchPre").attr('href', $("#anchPre").attr("href").replace('[SEARCH_VIEW]', 'ViewImage'));
            $("#anchPre").attr('href', $("#anchPre").attr("href").replace('ViewList', 'ViewImage'));
        }
        if ($("#anchNext").length > 0) {
            $("#anchNext").attr('href', $("#anchNext").attr("href").replace('[SEARCH_VIEW]', 'ViewImage'));
            $("#anchNext").attr('href', $("#anchNext").attr("href").replace('ViewList', 'ViewImage'));
        }
    }
    else {

        $('#divListView').css("display", "block");
        $('#divImgView').css("display", "none");

        $('#lnkListView').removeClass('activatedAnchor');
        $('#lnkListView').addClass('disabledAnchor');
        $('#lnkImageView').removeClass('disabledAnchor');
        $('#lnkImageView').addClass('activatedAnchor');


        if ($("#anchPre").length > 0) {
            $("#anchPre").attr('href', $("#anchPre").attr("href").replace('[SEARCH_VIEW]', 'ViewList'));
            $("#anchPre").attr('href', $("#anchPre").attr("href").replace('ViewImage', 'ViewList'));
        }

        if ($("#anchNext").length > 0) {
            $("#anchNext").attr('href', $("#anchNext").attr("href").replace('[SEARCH_VIEW]', 'ViewList'));
            $("#anchNext").attr('href', $("#anchNext").attr("href").replace('ViewImage', 'ViewList'));
        }
    }
}