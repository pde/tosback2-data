/* SiteCatalyst code version: H.22.1.
Copyright 1996-2011 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com -->

<script language="JavaScript" type="text/javascript">
/* Content Hierarchy Variables: set on every page */

var productInfo="";
s.pageType="";
s.prop5="";
/* Conversion Variables */
s.campaign="";
s.eVar1="";
s.eVar2="";
s.eVar5="";
//s.eVar6="";
s.eVar7="";
s.currencyCode="";
s.linkTrackVars="None";
s.linkTrackEvents="None";

s.pageName = ""; 	//page
s.server = "";		//server
s.channel = "";		//site section
s.prop1 = "";		//page type
s.prop2 = "";		//category or sub-section
s.prop3 = "";		//subcategory or sub-sub-section

/* Demographics Variables: set on every page where available */
s.prop14 = ""; 		//billing city
s.prop15 = "";		//billing state
s.prop16 = "";		//billing zip
s.prop17 = "";		//date of birth
s.prop18 = "";		//newsletter subscriber/non-subscriber flag
s.prop19 = "";		//gender
s.prop20 = "";		//how did you hear about us

/* Internal Search Variables: set on search results pages*/
s.prop1 = "";		//search term
s.prop2 = "";		//# of search results

/* Merchandising Category Variables: set on browse hierarchy pages */
s.eVar3 = "";		//browse category

/* Product Rating: set on product detail page */
s.eVar42 = "";		//product rating

/* Shopping Cart Fallout: set on all shopping cart pages */
s.prop4 = "";		//cart step

/* Cart Demographics: set on the first page of the checkout process */
s.eVar38 = "";		//wish list user
s.eVar4 = "";		//checkout registration status

/* Order Details: set on order confirmation page */
s.purchaseID = "";	//order number
s.state = "";		//billing state
s.zip = "";			//billing zip
s.eVar12 = "";		//shipping method
s.eVar13 = "";		//order discount
s.eVar14 = "";		//gift box option
s.eVar15 = "";		//coupon code
s.eVar16 = "";		//promo code
s.eVar17 = "";		//payment method

/* 
 * Events and Products: set on product interactions, in the shopping cart funnel 
 * and in the community and support section as outlined in the variable map 
 */
s.events = ""		//example: s.events="event7"
s.products=""		//example: s.products=";sku1;2;20.50,;sku2;1;1"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
/*var s_code=s.t();if(s_code)document.write(s_code)*///--></script>


function getPageName(reqURI, reqURL){
	 var pageName="";
	 var temp=reqURI.split("/")
	 if(temp.length==3){
	     pageName="Home Page";
	     s.prop3='Home Page';
	 }else if(temp.length >3){
	         for(var i=2;i<temp.length;i++){
	           pageName=pageName+temp[i]+":";
	         }
	         pageName=pageName;
	         var temp=pageName.substring(0,pageName.length-5);
	         temp=temp.split(":");
	         pageName="";
	         for(var i=0;i<temp.length;i++){
		            pageName=pageName+upperCase1(temp[i])+":";
	         }
	         pageName=pageName.substring(0,pageName.length-1);
	        
	      }
	  
	  
	  return pageName;
}

function getChannel(reqURI, reqURL){
  var channel="";
  var temp=reqURI.split("/")
  
  if(temp.length==3)
      channel="Home Page";
  else if(temp.length >3){
          for(var i=2;i<temp.length;i++){
            channel=channel+temp[i]+":";
          }
          channel=channel;
          var temp=channel.substring(0,channel.length-5);
          temp=temp.split(":");
          channel="";
          channel=upperCase1(temp[0]);
         
          
       }
  return channel;
}

	function trim(s)
	{
		return rtrim(ltrim(s));
	}

	function ltrim(s)
	{
		var l=0;
		while(l < s.length && s[l] == ' ')
		{	l++; }
		return s.substring(l, s.length);
	}

	function rtrim(s)
	{
		var r=s.length -1;
		while(r > 0 && s[r] == ' ')
		{	r-=1;	}
		return s.substring(0, r+1);
	}

	function upperCase1(str){
	 var str1=str.substring(0,1).toUpperCase();
	 var str2=str.substring(1,str.length);
	 //alert(str1+str2);
	 return (str1+str2).replace("_"," ");
	}
