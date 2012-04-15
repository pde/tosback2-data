mybuys.setClient("EASTBAY");
mybuys.enableZones();
mybuys.setOneclkSignupAsImg("http://w.p.mybuys.com/clients/EASTBAY/images/Eastbay_Signup-Button_125x16.gif");
mybuys.setOneclkButtonAlt("Get Product Alerts");

mybuys.retrieveProductIds = function ()
{
	// This code attempts to get the recently viewed products from the page.  The client
	// has this functionality and requested that we filter out the products.  
	// But I wanted to use what they had on the page in their Recently Viewed area as opposed
	// to using ours which might include more than just what was in the session
	
	// They have different URL patterns for Product and Cart pages...
	if(mybuys.pagetype=="PRODUCT_DETAILS")
	{
      mybuys.retrieveProductIdsFromHrefs("http://www.eastbay.com/shared/quickviewPDP.cfm?", "sku");          
   
   } else if (mybuys.pagetype=="SHOPPING_CART") {

      mybuys.retrieveProductIdsFromHrefs("http://www.eastbay.com/product/","sku");
      
  }

	// This code attempts to see if the currently viewed page is
	// in a microsite.  If so, grab the microsite identifier and
	// pass to MyBuys as a context attribute
	// Getting microsite id from URL  
  	var hrefURL = window.location.href;

	var name ="microsite";
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

  var regexS = "[\\/&]"+name+":([^/#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( hrefURL );

  if( results == null ) 
  {
  	regexS = "[\\?&]"+name+"=([^&#]*)";
  	regex = new RegExp( regexS );
  	results = regex.exec( hrefURL );
	}

  if( results != null ) 
  {
    	mybuys.addFilteringAttribute("Microsite",results[1]);
  }


}
 
 
 // We are overriding this function from mybuys3.js due to the different pattern (noted in the cart page above)
mybuys.retrieveProductIdsFromHrefs = function(pattern, param)
	{ 
		this.setOnPageItemUrlPattern(pattern);
		this.setOnPageItemUrlParam(param);

		if ( !this.onPageItemUrlPattern || !this.onPageItemUrlParam) return;
		var urls = document.getElementsByTagName("A");

		var param1 =  "?"+this.onPageItemUrlParam+"=";
		var param2 =  "&"+this.onPageItemUrlParam+"=";
		var param3 =  this.onPageItemUrlParam+":";

		var ids = {};
		for (var i=0; i<urls.length; i++)
		{	var url = urls[i].getAttribute("href");
			var pos1 = -1;
			var pos2 = -1;
			var pos3 = -1;
			if(url==null || url.length==0) continue;
			if ( url.indexOf(this.onPageItemUrlPattern) >= 0 &&
				 ((pos1=url.indexOf(param1)) > 0 ||
				  (pos2=url.indexOf(param2)) > 0 ||
				  (pos3=url.indexOf(param3)) > 0) )
			{
				// Retrieve product Id using pos1 or pos2 values, set it into id
				var id = null;
				var pos = (pos1>0)?pos1:pos2;
			
				if (pos1 >0)
				{
					pos = pos1;
				} else if (pos2>0)
				{
					pos = pos2;
				} else if (pos3>0)
				{
					pos = pos3;
					param1 = param3;
				}
				
				url = url.substr(pos+param1.length);
				if (   (pos=url.indexOf("/model")) == -1 && (pos=url.indexOf("&")) == -1)
				{
					id = url;					
				}
				else
				{
					id = url.substr(0, pos);
					
				}

				if (id)
				{
					mybuys.addItemPresentOnPage(id);
				}
			}    
		}
	}
	
	// we are overriding this function in mybuys3.js to do the URL rewriting, i.e.
	// if currently viewed product is in a microsite, add the microsite id 
	// to the rec URLS
mybuys.processResponseHTML = function(zoneHtmls)
	{	clearTimeout(this.requestProcId);
		if (!this.renderOK) return;
		var leftoverZones=[]
		for (var zk=0;zk<this.zoneKeysToZoneDivIds.length;zk++)
		{	if (this.zoneKeysToZoneDivIds[zk])
				leftoverZones[zk]=true;
		}

// Getting microsite id from URL  
  	var hrefURL = window.location.href;
	var name ="microsite";
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

  var regexS = "[\\/&]"+name+":([^/#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( hrefURL );
var micrositeURL = "";
  if( results == null ) 
  {
  	regexS = "[\\?&]"+name+"=([^&#]*)";
  	regex = new RegExp( regexS );
  	results = regex.exec( hrefURL );
	}

  if( results != null ) 
  {
    	micrositeURL = "/microsite:" + results[1];
  }



		for (zonekey in zoneHtmls)
		{
			var zoneDivId = this.zoneKeysToZoneDivIds[zonekey];
			if (!zoneDivId) continue;
			var zoneDiv = document.getElementById(zoneDivId);
			if (zoneDiv)
			{
				var zoneHTML = zoneHtmls[zonekey];
				
				zoneHTML = zoneHTML.replace(/http:\/\/www.eastbay.com\/product/g, "http://www.eastbay.com/product" + micrositeURL);
				
				zoneDiv.innerHTML=zoneHTML;
				leftoverZones[zonekey]=false;
			}
		}
		for (var zk=0;zk<leftoverZones.length;zk++)
		{	if (leftoverZones[zk])
				this.loadFailoverImage(zk);
		}
	

		
	}



mybuys.useOneclkForExistingSignup(true);
mybuys.setFailOverMsecs(5000);
