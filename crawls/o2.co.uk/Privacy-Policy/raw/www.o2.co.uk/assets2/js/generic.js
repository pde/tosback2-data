/* WebChat*/
if(location.hostname == "www.o2.co.uk")
{
    var path = location.pathname;
    var firstPlacement = path.split("/",2);
    if(firstPlacement == ",broadband")
    {
        if(location.protocol == "https:")
        {
            document.write("<s"+"cript type='text/javascript' src='https://shop.o2.co.uk/update/chat/broadband/broadband-mtagconfig.js'></scr"+"ipt>");   
        }
        else
        {
            document.write("<s"+"cript type='text/javascript' src='http://shop.o2.co.uk/update/chat/broadband/broadband-mtagconfig.js'></scr"+"ipt>");
        }
    }
    
    // O2 Guru
    if 	(location.href.toLowerCase().indexOf('o2.co.uk/guru') > -1) {
			if (location.protocol == "https:") {
			document.write("<s"+"cript type='text/javascript' src='https://shop.o2.co.uk/update/chat/service/mtagconfig.js'></scr"+"ipt>");   	
			} else {
			document.write("<s"+"cript type='text/javascript' src='http://shop.o2.co.uk/update/chat/service/mtagconfig.js'></scr"+"ipt>");
			}
    }
	
	if 	(  (location.href.toLowerCase().indexOf('o2.co.uk/internationalfavourites') > -1)
		|| (location.href.toLowerCase().indexOf('o2.co.uk/sme/if') > -1)
		|| (location.href.toLowerCase().indexOf('apps/help/help?qid=1&q1=2&case=international%20favourites%20bolt%20on') > -1)
		|| (location.href.toLowerCase().indexOf('apps/help/help?qid=1&q1=2&case=international favourites bolt on') > -1) )
	{    
		if (location.protocol == "https:")
		{
			document.write("<s"+"cript type='text/javascript' src='https://shop.o2.co.uk/update/chat/service/mtagconfig.js'></scr"+"ipt>");   	
		}
			else
		{
			document.write("<s"+"cript type='text/javascript' src='http://shop.o2.co.uk/update/chat/service/mtagconfig.js'></scr"+"ipt>");
		}
	}
	
	// Business Webchat
	if 	(  (location.href.toLowerCase().indexOf('o2.co.uk/sme') > -1) || (location.href.toLowerCase().indexOf('o2.co.uk/corporate') > -1) )
	{    
		if (location.protocol == "https:")
		{
			document.write("<s"+"cript type='text/javascript' src='https://shop.o2.co.uk/update/chat/business/mtagconfig.js'></scr"+"ipt>");   	
		}
			else
		{
			document.write("<s"+"cript type='text/javascript' src='http://shop.o2.co.uk/update/chat/business/mtagconfig.js'></scr"+"ipt>");
		}
	}
	
	
	// Business Webchat for support pages
	if(location.href.toLowerCase().indexOf('o2.co.uk/business') > -1) 
	{
	
        if      (  (location.href.toLowerCase().indexOf('/business/support') > -1) || (location.href.toLowerCase().indexOf('/business/support/contact-us/') > -1) || (location.href.toLowerCase().indexOf('/business/myo2business') > -1) || (location.href.toLowerCase().indexOf('/business/gurusforbusiness') > -1) )
        {    
		
		 document.write("<s"+"cript type='text/javascript'>if (typeof(lpUnit)=='undefined') var lpUnit='o2-service-business';</scr"+"ipt>");  
		 
		             
               if (location.protocol == "https:")
               {
                       document.write("<s"+"cript type='text/javascript' src='https://shop.o2.co.uk/update/chat/service/mtagconfig.js'></scr"+"ipt>");      
               }
                       else
               {
                       document.write("<s"+"cript type='text/javascript' src='https://shop.o2.co.uk/update/chat/service/mtagconfig.js'></scr"+"ipt>");
               }
        }
		else {
	
		
			if (location.protocol == "https:")
			{
				document.write("<s"+"cript type='text/javascript' src='https://shop.o2.co.uk/update/chat/business/mtagconfig.js'></scr"+"ipt>");   	
			}
				else
			{
				document.write("<s"+"cript type='text/javascript' src='http://shop.o2.co.uk/update/chat/business/mtagconfig.js'></scr"+"ipt>");
			}
		
		}
		
	}
	
	
	
	
	
}

/* ADO */
/*
try{
    var my_loc = ""+document.location.href;
    var my_uri = "";	
    if (my_loc) {
		var my_loc_start = my_loc.indexOf('://');
		if (my_loc_start) my_loc_start += 3;
		var my_loc_end = my_loc.indexOf('?');
		if ((!my_loc_end)||(my_loc_end<0)) my_loc_end = my_loc.length;
		my_uri = my_loc.substring(my_loc_start,my_loc_end);
	}
    if ((my_uri == "www.o2.co.uk/broadband") || (my_uri == "www.o2.co.uk/broadband/") || (my_uri == "bluedawn.ref.o2.co.uk/broadband")) {
   //     document.write("<s"+"cript type='text/javascript' src='http://shop.o2.co.uk/update/js/ADO_JS.js'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js'></scr"+"ipt>");
	      document.write("<s"+"cript type='text/javascript' src='http://www8.tmvtp.com/allocator/execute/O2UK/O2BroadbandMasterTag'></scr"+"ipt>");
    }
}catch(err){}
*/