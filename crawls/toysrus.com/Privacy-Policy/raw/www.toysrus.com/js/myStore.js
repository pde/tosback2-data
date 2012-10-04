var hasCookie=false;
var cityNameLB="";       //to display CityName in Lightbox after choosing my Store in storelocator Page
var cityName="";
var fax="";
function getMyStoreDetails(cookieName){
	var i,j,a,b,c,e,storeHeaderName,address1,address2,phone;
	var combAddress="";
	var address3="";
	var cookieArr=document.cookie.split(";");
	for(i=0;i<cookieArr.length;i++)
	{	
		a = cookieArr[i].substr(0,cookieArr[i].indexOf("="));
		b = cookieArr[i].substr(cookieArr[i].indexOf("=")+1);
		
		// for removing extra space added in beginning of cookieName 
		a = a.substring(1, a.length);
		
		if(a === cookieName){
			hasCookie=true;
			b=unescape(b);
			c = b.split("&");
			
			//Removed the index based implementation and used key-value pair mechanism
			
			for(j=0; j<c.length;j++){
			
				e=c[j].split("=");
				if(e[0]=="StoreHeaderName"){
					storeHeaderName=e[1];
				}
				else if(e[0]=="Address1"){
					address1=e[1];
				}
				else if(e[0]=="Address2"){
					address2=e[1];
				}
				else if(e[0]=="Address3"){
					address3=e[1];
				}	
				else if(e[0]=="comb-addr"){
					combAddress=e[1];
				}	
				else if(e[0]=="Phone"){
					phone=e[1];
				}	
				else if(e[0]=="City"){
					cityName=e[1];
				}
				else if(e[0]=="Fax" && e[1] != ""){
					fax=e[1];
				}
				else{}					
			}
			/*
			* Have used the JavaScript way to insert My Store Details in header dropdown to allow instant change in header after selection of my Store by User.
			*/
			jQuery('.storeSearch .heading')[0].innerHTML=storeHeaderName;
			jQuery('.address1')[0].innerHTML=address1;	
			jQuery('.address2')[0].innerHTML=address2;
			if(address3.length > 0){
				jQuery('.address3').removeClass('hidden')[0].innerHTML=address3
			}
			else{
				if(!jQuery('.address3').hasClass('hidden')){
					jQuery('.address3').addClass('hidden');
				}
			}
			combAddress.length > 0 ? jQuery('.comb-Adress').removeClass('hidden')[0].innerHTML=combAddress:"";
			if(fax.length>1){
				jQuery('.phone')[0].innerHTML=phone+ " | " +fax;
			}
			else{
				jQuery('.phone')[0].innerHTML=phone;
			}
			cityNameLB=cityName;
			cityName.length>16 ? cityName=cityName.substr(0,16).concat('...'):"";  //to restrict the size of cityname to 16 characters to accomodate large City Names in Header
			jQuery('.storeName')[0].innerHTML=cityName.toLowerCase();
			jQuery('.storeSearch .findAnother').show();
			jQuery('.storeSearch p').show();
			jQuery('.chooseMyStore span').hide();
			jQuery('.myStoreSelected').show();
			jQuery('#store-find').addClass('update');
			jQuery('.chooseMyStore').addClass('hasStore');
		}
	}
}

// function for the lightbox use in storeLocator Page to show My Store success message

function showStoreLocatorMyStoreLBx(layerclassname){
    if(this.modalBox === undefined){
        this.modalBox = new Df.Modal();
        this.modalBox.pars.animateHolder = {
            time: 100,
            pause: 50,
            opacity: .5,
                selectors: ['opacity']
        };
        this.modalBox.pars.animateDialog = {
            time: 100,
            pause: 50,
            opacity: .99,
            selectors: ['opacity']
        };

        this.modalBox.pars.minWidth= $(document).body.scrollWidth;
        this.modalBox.pars.minHeight= $(document).body.scrollHeight;
        this.modalBox.set();

    }
	window.scroll(200,200);
	$$('#myStConfrm strong')[0].innerHTML=cityNameLB;
	this.modalBox.setDomNode($$("." + layerclassname)[0]);
	this.modalBox.show();
};

/*custom function to close the lightbox*/
function ltBoxClose() {
	$$('.dialogHolder').invoke('hide');
	$$('.holder').invoke('hide');
}

/*Code for effects in Header for My Store DropDown Components*/

	if(myStoreEnabled == 'true'){
		getMyStoreDetails('myStoreDetails');
	}
(function($){
	$('.myStoreWrapper').hover(
		function(){
			$('.chooseMyStore').addClass('active');
			$('.storeSearch').show();
			$('.myStoreSelected .storeName').removeClass('activate');
		},
		function(){
			$('.storeSearch').hide();
			$('.chooseMyStore').removeClass('active');
			$('.myStoreSelected .storeName').addClass('activate');
		}
	);
	
	$('.storeLoc').hover(
		function(){
			$('.str').addClass('storeLocEffect');
			$('.storeSearch2').show();
		},
		function(){
			$('.str').removeClass('storeLocEffect');
			$('.storeSearch2').hide();
		}
	);
	
	// function call to fire omniture tracking function on header form submit for My Store
	
	
	$('#store-find').click(function(){
		if($(this).hasClass('update')){
			setTimeout(function()
			{
				fireInfoMyStore('Update My Store')}, // delaying the function to fire before next page is loaded
				100);
		}
		else{
			setTimeout(function()
			{
				fireInfoMyStore('Choose My Store')},	// delaying the function to fire before next page is loaded
			100);
		}		
	});	
	$('#Find-Store').click(function(){
			setTimeout(function()
			{	
				fireInfoMyStore('Choose My Store')},
				100);
	});
})(jQuery);	

/*
 *   Function created for omniture tracking in My Store
 *
*/
function fireInfoMyStore(title){
	s_events = null;

	s_products = null;

	s.products = null;

	s.prop4=null;

	s.prop5=null;

	s.eVar28 = "My Store: " + title;

	s.events = "event24";

	s.linkTrackEvents = s.events;

	var allPages =",prop9,prop10,prop11,server,eVar24";

    var jsPlugins= ",eVar12,eVar14,eVar15,eVar16,prop14,prop2";

    s.linkTrackVars = "eVar28,events" + allPages + jsPlugins;

    s.eVar25 = null;

	s_eVar25 = null;

	s.tl(true, 'o', title);

	s.events = null;

}





