$(document).ready(function(){

	$.ajax({ 
			url: "/Services/Holiday2012_Handler.ashx",
		    type: "GET",
		    contentType: "application/json; charset=utf-8",
		    dataType: "jsonp",
		    jsonpCallback: "processData",
		    success: processData
		});

		//get Flash Vars
		 function getUrlVars()
          {
              var vars = [], hash;
              var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
              for(var i = 0; i < hashes.length; i++)
              {
                  hash = hashes[i].split('=');
                  vars.push(hash[0]);
                  vars[hash[0]] = hash[1];
              }
              return vars;
          }

		//this is the callback function
		function processData(data) {
			eventArr = data.Holiday2012Events.Event;
			var date = new Date().getTime();
			var eDate = getUrlVars()['eDate'];

			if(eDate != undefined)
		 		date = new Date(eDate).getTime() ;

		 	if(date >=  new Date("11/1/2012").getTime() && date <=  new Date("11/15/2012").getTime() )
			{
				$('.sponsorLink').attr('href', 'http://www.samsclub.com/sams/windows-8/4680101.cp?pid=20121022');
				$('.sponsor').find('img').attr('src', '/Holiday/SideRail/images/sponsors/win8.png');
			}
			// if(date >=  new Date("11/8/2012").getTime() && date <=  new Date("11/14/2012").getTime() )
			// {
			// 	//Update IT
			// 	// $('.sponsorLink').attr('href', 'http://www5.samsclub.com/Featured-Brand/Coke/Vitamin-Angels/');
			// 	$('.sponsor').find('img').attr('src', '/Holiday/SideRail/images/sponsors/coke.png');
			// }
			if(date >=  new Date("11/15/2012").getTime() && date <=  new Date("11/22/2012").getTime() )
			{
				$('.sponsorLink').attr('href', 'http://www5.samsclub.com/Showcase/Samsung_Showcase.aspx');
				$('.sponsor').find('img').attr('src', '/Holiday/SideRail/images/sponsors/samsung.png');
			}
			if(date >=  new Date("11/22/2012").getTime() && date <=  new Date("11/29/2012").getTime() )
			{
				$('.sponsorLink').attr('href', 'http://www5.samsclub.com/Showcase/Serta-Showcase.aspx');
				$('.sponsor').find('img').attr('src', '/Holiday/SideRail/images/sponsors/serta.png');
			}
			if(date >=  new Date("11/29/2012").getTime() && date <=  new Date("12/13/2012").getTime() )
			{
				$('.sponsorLink').attr('href', 'http://www5.samsclub.com/Featured-Brand/Del-Monte/Holiday/');
				$('.sponsor').find('img').attr('src', '/Holiday/SideRail/images/sponsors/delmonte.png');
			}
			if(date >=  new Date("12/13/2012").getTime() && date <=  new Date("12/27/2012").getTime() )
			{
				$('.sponsorLink').attr('href', 'http://www5.samsclub.com/Featured-Brand/Unilever/AXE/');
				$('.sponsor').find('img').attr('src', '/Holiday/SideRail/images/sponsors/unilever.png');
			}


			for (var i = 0; i < eventArr.length; i++) 
			{
				var startDate = new Date(eventArr[i].PromoStart).getTime();
				var endDate = new Date(eventArr[i].PromoEnd).getTime();



				if(date >= startDate && date <= endDate)
				{
					if(eventArr[i].Type == "Event")
					{
						var eventStartDate = eventArr[i].EventStart.replace("/2012", "")
						var eventEndDate = "- " + eventArr[i].EventEnd.replace("/2012", "");
						if(eventEndDate == "- ")
							eventEndDate = "";
						if(eventEndDate == undefined)
							eventEndDate = "";
						if(eventStartDate == undefined)
							eventStartDat = "";

						$('.flexSliderEvent').find('ul').append('<li>\
							<div class="event"> \
							<h2>'+eventArr[i].Title + '<br/> <span>' +eventStartDate + eventEndDate +'</span></h2>\
								<p>'+ eventArr[i].Notes+'</p>\
								<img src="'+eventArr[i].Image+'"" class="prodImg">\
								<h3>Find a Club</h3>\
								<div class="zipWrapper">\
			                        <a class="pngFix findClubBTN cTrack" iTrack="Mod_FindClubBTN" title="Find a Club" target="_top"><img src="images/searchBtn.png"></a>\
			                        <div class="zipInput"><input type="text" name="ZipCode"/></div>\
			                    </div>\
                       	</li>')

					}
					if(eventArr[i].Type == "Category"  || eventArr[i].Type == "Item")
					{
						$('.flexSliderEvent').find('ul').append('<li>\
                       		<div class="catalog"> \
								<h2>'+eventArr[i].Title+'</h2>\
								<p>'+eventArr[i].Notes+'</p>\
								<img src="'+eventArr[i].Image+'" class="prodImg">\
								<a href="'+eventArr[i].URL+'" class="shopNow" target="_top"><img src="images/shopNow.png"></a>\
							</div>\
                       	</listName>')
					}
					if(eventArr[i].Type == "Message")
					{
						$('.flexSliderEvent').find('ul').append('<li>\
                       		<div class="catalog"> \
								<h2>'+eventArr[i].Title+'</h2>\
								<p>'+eventArr[i].Notes+'</p>\
								<img src="'+eventArr[i].Image+'" class="prodImg">\
							</div>\
                       	</li>')
					}

					if(eventArr[i].Type == "Catalog")
					{
						$('.flexSliderEvent').find('ul').append('<li>\
							<div class="catalog"> \
								<h2>'+eventArr[i].Title+'</h2>\
								<p>'+eventArr[i].Notes+'</p>\
								<img src="'+eventArr[i].Image+'" class="prodImg">\
								<a href="'+eventArr[i].URL+'"  target="_top"><img src="images/ViewHolidaycatalog.png"></a>\
							</div>\
                       	</li>')
					}	 
					if(eventArr[i].Type == "Promo")
					{
						var eventStartDate = eventArr[i].EventStart.replace("/2012", "")
						var eventEndDate = "- " + eventArr[i].EventEnd.replace("/2012", "");
						if(eventEndDate == "- ")
							eventEndDate = "";
						if(eventEndDate == undefined)
							eventEndDate = "";
						if(eventStartDate == undefined)
							eventStartDat = "";
						
						$('.flexSliderEvent').find('ul').append('<li>\
							<div class="catalog"> \
								<h2>'+eventArr[i].Title+'<br/> <span>' +eventStartDate + eventEndDate +'</span></h2>\
								<p>'+eventArr[i].Notes+'</p>\
								<img src="'+eventArr[i].Image+'" class="prodImg">\
								<a href="'+eventArr[i].URL+'"  target="_top"><img src="images/ViewEvent.png"></a>\
							</div>\
                       	</li>')
					}	 
				}
			};

				 $('.flexSliderEvent').flexslider({
					directionNav: false,
					animation:'fade',
					slideshow: false, 
					animationLoop: false,        
					controlsContainer: ".flex-nav-container"     
				});

				 $('.flexSliderEvent').find('a').show();
			

			 $('.zipWrapper').zipValidator({
		        val:"Your ZIP" ,
		        errorVal: "Your ZIP"
		    });

		} 


	

});