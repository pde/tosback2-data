var shUserAgent = navigator.userAgent;
var smUserAgent;
if (shUserAgent.match('KTXN') == 'KTXN' || shUserAgent.match('AlertSite') == 'AlertSite'){smUserAgent = 'true'} else { smUserAgent = 'false'};
	var dmn = intlDomain.substr(1);
	//var dmnchk = intlDomain.substr(10);
	//var dmnchk1 = "US";
	var dmnchk = ((window.location.hostname).match(/\.co.uk/) == ".co.uk") ? 'UK': 'US'
	
	var countryGeoArr={};
	var getProperty = function (country) {
	    return countryGeoArr[country];
		};
		
		var highBtnCook = $.readCookielet("STUB_BROWSE_SESS", "AvDateText");
		if(typeof(cid) != 'undefined' || typeof(chId)!='undefined')
		{
		if (cid == '174' ||  chId=='174')
		{$("#nav_theater > a.atest").addClass("highlight");}
		else if (cid == '28' ||  chId=='28' )
		{$("#nav_sports > a.atest").addClass("highlight");}
		else if (cid == '1' ||  chId=='1')
		{$("#nav_concerts > a.atest").addClass("highlight");}
		else if( highBtnCook == "2" || highBtnCook == "3" || highBtnCook == "4" || highBtnCook == "5" )
		{$("#nav_upcoming > a.atest").addClass("highlight");}
		}
function getUSxml(d) {
	var p = d;	
	var parentGeo =0;
	var parentGeo1 =0;
	var urly= location.protocol+"//publicfeed"+intlDomain+"/feedservices/lcsServices/getCoordinate/domain/"+dmn+"/country/US?_jsonp=?";
	
	if(document.getElementById("US")){
		var a , b ;
				$.ajax({
				type : "GET",
				url : urly,
				dataType : "json",
				success : function(data) {
					var root1 = data.GetCoordinateResponse;
					var sort_by = function(field, reverse, primer){
						var a , b ;
						  reverse = (reverse) ? -1 : 1;
						   return function(a,b){

						       a = a[field];
						       b = b[field];

						       if (typeof(primer) != 'undefined'){
						           a = primer(a);
						           b = primer(b);
						       }

						       if (a<b) return reverse * -1;
						       if (a>b) return reverse * 1;
						       return 0;

						   }
						}
					var Sroot = root1.coordinate;
					Sroot.sort(sort_by('state', false, function(a){return a.toUpperCase()}));
					var prevName = "";
					var cno =1;
					var countItem =1;
					var count=1;
					var count1= 1;
					
					$('.Mywrapper').prepend('<ul class = "tdp'+cno+'" style="width:120px;margin:0;list-style-type:none;" >');
					$.each(Sroot,function(i, item) {
						
										var currName = item.state;
										
										var currnext = item.city;
										var id = item.geographicId;
										 parentGeo = item.countryGeographicId;
									
						if (currName != prevName)
						{ 
										
											fname = currnext+", "+currName;
								if(p==true)
									{
											count1=  $('.tdp'+cno).children().size();
											if(count1>1)
											{
											$('.tdp'+cno).append('<li><br/></li>');
											}


											count=  $('.tdp'+cno).children().size();
											
											if(count>=34)
											{ 
												$('.tdp'+cno).append('</ul>');
												
												$('.Mywrapper').append('<ul  class = "tdp'+(++cno)+'"style="width:120px;margin:0;list-style-type:none;">');
												$('.tdp'+cno).append("<li><p>"+currName+"</p></li><li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id+"&#39;,&#39;"+fname+"&#39;,this);return false;'>" +currnext+ "</a></li>");
												
												prevName = currName;
												countItem=1;
												count=0;
											}
											else {	$('.tdp'+cno).append("<li><p>"+currName+"</p></li><li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id+"&#39;,&#39;"+fname+"&#39;,this);return false;'>" +currnext+ "</a></li>");
											
											prevName = currName;
											countItem=countItem+2;	
											}
									}
												
								else 
								  {
												
												count1=  $('.tdp'+cno).children().size();
												if(count1>1)
												{
												$('.tdp'+cno).append('<li><br/></li>');
												}
												count=  $('.tdp'+cno).children().size();
												
												if(count>=34)
												{ 
													$('.tdp'+cno).append('</ul>');
													
													$('.Mywrapper').append('<ul  class = "tdp'+(++cno)+'"style="width:120px;margin:0;list-style-type:none;">');
													$('.tdp'+cno).append("<li><p>"+currName+"</p></li><li value='"+id+"' ><a sname='"+currName+"' style='color:#2075C2;' href='#'>" +currnext+ "</a></li>");
													
													prevName = currName;
													countItem=1;
													count=0;
												}
												else {	$('.tdp'+cno).append("<li><p>"+currName+"</p></li><li value='"+id+"'><a sname='"+currName+"' style='color:#2075C2;' href='#'>" +currnext+ "</a></li>");
												
												prevName = currName;
												countItem=countItem+2;	
												}
												
								}
											
						} 
						
						else {
									if(p==true) 
										{
											count=  $('.tdp'+cno).children().size();
											if(count>=34)
											{ 
												$('.tdp'+cno).append('</ul>');
												
												$('.Mywrapper').append('<ul  class = "tdp'+(++cno)+'"style="width:120px;margin:0;list-style-type:none;">');
												countItem=1;
												count=0;
												fname = currnext+", "+currName;
												$('.tdp'+cno).append("<li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id+"&#39;,&#39;"+fname+"&#39;,this);return false;'>" +currnext+ "</a></li>");
												
											}
											else{	fname = currnext+", "+currName;
											$('.tdp'+cno).append("<li><a  style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id+"&#39;,&#39;"+fname+"&#39;,this);return false;'>" +currnext+ "</a></li>");
											countItem++;
										}
										}
						                 else {
						                	 count=  $('.tdp'+cno).children().size();
												if(count>=34)
												{ 
													$('.tdp'+cno).append('</ul>');
													
													$('.Mywrapper').append('<ul  class = "tdp'+(++cno)+'"style="width:120px;margin:0;list-style-type:none;">');
													countItem=1;
													count=0;
													fname = currnext+", "+currName;
													$('.tdp'+cno).append("<li value='"+id+"'><a  href='#' sname='"+currName+"' style='color:#2075C2;'>" +currnext+ "</a></li>");
													
												}
												else{	fname = currnext+", "+currName;
												$('.tdp'+cno).append("<li value='"+id+"'><a href='#' sname='"+currName+"'style='color:#2075C2;' href='#'>" +currnext+ "</a></li>");
												countItem++;
											}
						                	 
						                	 
						                 }
						
						}
										
									});
					count=  $('.tdp'+cno).children().size();
					if(!count>=34)
					{ 
						$('.tdp'+cno).append('</ul>');
					}
					
					
					
					
				}			});
				 
				countryGeoArr.US = parentGeo;
				var urlx= location.protocol+"//publicfeed"+intlDomain+"/feedservices/lcsServices/getCoordinate/domain/"+dmn+"/country/CA?_jsonp=?";
				 $.ajax({
				 type: "GET",
				 url:urlx,
				 dataType:"json",
				 success:function(data3) {
					 var root2 = data3.GetCoordinateResponse;
					 var sort_by = function(field, reverse, primer){

						   reverse = (reverse) ? -1 : 1;

						   return function(a,b){

						       a = a[field];
						       b = b[field];

						       if (typeof(primer) != 'undefined'){
						           a = primer(a);
						           b = primer(b);
						       }

						       if (a<b) return reverse * -1;
						       if (a>b) return reverse * 1;
						       return 0;

						   }
						}
					var sroot2 = root2.coordinate;
					sroot2.sort(sort_by('state', false, function(a){return a.toUpperCase()}));
					 
					 
					 var prevName1 = "";
					
						var cno1 =1;
						var countItem1 =1;
						
						$('.CAwrapper').prepend('<ul class = "tdc'+cno1+'" style="width:120px;margin:0;list-style-type:none;">');
						$.each(sroot2,function(i, itemset) {
							
											var currName1 = itemset.state;
											var id1 = itemset.geographicId;
											 parentGeo1 = itemset.countryGeographicId;
											var currnext1 = itemset.city;
							if (currName1 != prevName1) 
							   { 
												 fname = currnext1+", "+currName1;
												
													
	
												 if(p==true){
											 countItem1 = $('.tdc'+cno1).children().size();
														if(countItem1>1){
														$('.tdc'+cno1).append('<li><br/></li>');	}
														 countItem1 = $('.tdc'+cno1).children().size();
														if((countItem1>=6))
														{
														$('.tdc'+cno1).append('</ul>');
														$('.CAwrapper').append('<ul  class = "tdc'+(++cno1)+'"style="width:120px;margin:0;list-style-type:none;">');
														$('.tdc'+cno1).append("<li><p>"+ currName1+ "</p></li><li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id1+"&#39;,&#39;"+fname+"&#39;,this);return false;'>"+currnext1+" </a></li>");
														prevName1 = currName1;
														countItem1=0;
														}

														else { $('.tdc'+cno1).append("<li><p>"+ currName1+ "</p></li><li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id1+"&#39;,&#39;"+fname+"&#39;,this);return false;'>"+currnext1+" </a></li>");
												         prevName1 = currName1; }
												
												}
												else
												{
													 countItem1 = $('.tdc'+cno1).children().size();

													if(countItem1>1)
													{
														$('.tdc'+cno1).append('<li><br/></li>');
													}
													 countItem1 = $('.tdc'+cno1).children().size();
													if((countItem1>=6))
													{
													$('.tdc'+cno1).append('</ul>');
													$('.CAwrapper').append('<ul  class = "tdc'+(++cno1)+'"style="width:120px;margin:0;list-style-type:none;">');
													$('.tdc'+cno1).append("<li><p>"+ currName1+ "</p></li><li value='"+id1+"'><a sname='"+currName1+"'style='color:#2075C2;' href='#' >"+currnext1+" </a></li>");
													prevName1 = currName1;
													countItem1=0;
													}
													
													else{
													$('.tdc'+cno1).append("<li><p>"+ currName1+ "</p></li><li value='"+id1+"'><a sname='"+currName1+"'style='color:#2075C2;' href='#' >"+currnext1+" </a></li>");
													prevName1 = currName1;}
													
												}	
											
											} else {
											if(p==true){
												 countItem1 = $('.tdc'+cno1).children().size();
												 if(countItem1>=6)
												{ 
													$('.tdc'+cno1).append('</ul>');
													$('.CAwrapper').append('<ul class = "tdc'+(++cno1)+'"style="width:120px;margin:0;list-style-type:none;">');
													fname = currnext1+", "+currName1;
													$('.tdc'+cno1).append("<li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id1+"&#39;,&#39;"+fname+"&#39;,this);return false;'>"+currnext1+"</a></li>");
													countItem1=0;
												}
												else {
													fname = currnext1+", "+currName1;
													$('.tdc'+cno1).append("<li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id1+"&#39;,&#39;"+fname+"&#39;,this);return false;'>"+currnext1+"</a></li>");
												countItem1=0;}
											}
											else {
												
												countItem1 = $('.tdc'+cno1).children().size();
												 if(countItem1>=6)
												{ 
													$('.tdc'+cno1).append('</ul>');
													$('.CAwrapper').append('<ul class = "tdc'+(++cno1)+'"style="width:120px;margin:0;list-style-type:none;">');
													fname = currnext1+", "+currName1;
													$('.tdc'+cno1).append("<li value='"+id1+"'><a sname='"+currName1+"'  style='color:#2075C2;'href='#' >"+currnext1+"</a></li>");
													countItem1=0;
												}
												 else {
												fname = currnext1+", "+currName1;
												$('.tdc'+cno1).append("<li value='"+id1+"'><a sname='"+currName1+"' style='color:#2075C2;'href='#' >"+currnext1+"</a></li>");
												countItem1=0; }
											}
											}
											
										});
						if((!countItem1>4))
						{ $('.tdc'+cno1).append('</ul>');
						}
						
						
						
						
					}
				});

				 countryGeoArr.CA = parentGeo1;
						var allGeoId = getProperty("US")+" "+getProperty("CA");
						if(p==false) 
						{
							$('#Sid').attr("allgeoid",allGeoId);
						}
						
	}            
	var urlz= location.protocol+"//publicfeed"+intlDomain+"/feedservices/lcsServices/getCoordinate/domain/"+dmn+"/country/UK?_jsonp=?";
				 if(document.getElementById("UK"))	{
						$.ajax({
							type : "GET",
							url : urlz,
							dataType : "json",
							success : function(data) {
								var root1 = data.GetCoordinateResponse;
								var sort_by = function(field, reverse, primer){
									var a , b ;
									  reverse = (reverse) ? -1 : 1;
									   return function(a,b){

									       a = a[field];
									       b = b[field];

									       if (typeof(primer) != 'undefined'){
									           a = primer(a);
									           b = primer(b);
									       }

									       if (a<b) return reverse * -1;
									       if (a>b) return reverse * 1;
									       return 0;

									   }
									}
								var Sroot = root1.coordinate;
								Sroot.sort(sort_by('state', false, function(a){return a.toUpperCase()}));
								var prevName = "";
								var cno =1;
								var countItem =1;
								var count=1;
								var count1= 1;
								
								$('.UKwrapper').prepend('<ul class = "tdp'+cno+'" style="width:105px;margin:0;list-style-type:none;" >');
								$.each(Sroot,function(i, item) {
									
													var currName = item.state;
													
													var currnext = item.city;
													var id = item.geographicId;
													 parentGeo = item.countryGeographicId;
												
									if (currName != prevName)
									{ 
													
														fname = currnext+", "+currName;
											if(p==true)
												{
														count1=  $('.tdp'+cno).children().size();
														if(count1>1)
														{
														$('.tdp'+cno).append('<li><br/></li>');
														}


														count=  $('.tdp'+cno).children().size();
														
														if(count>=8)
														{ 
															$('.tdp'+cno).append('</ul>');
															
															$('.UKwrapper').append('<ul  class = "tdp'+(++cno)+'"style="width:105px;margin:0;list-style-type:none;">');
															$('.tdp'+cno).append("<li><p>"+currName+"</p></li><li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id+"&#39;,&#39;"+currnext+"&#39;,this);return false;'>" +currnext+ "</a></li>");
															
															prevName = currName;
															countItem=1;
															count=0;
														}
														else {	$('.tdp'+cno).append("<li><p>"+currName+"</p></li><li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id+"&#39;,&#39;"+currnext+"&#39;,this);return false;'>" +currnext+ "</a></li>");
														
														prevName = currName;
														countItem=countItem+2;	
														}
												}
															
											else 
											  {
															
															count1=  $('.tdp'+cno).children().size();
															if(count1>1)
															{
															$('.tdp'+cno).append('<li><br/></li>');
															}
															count=  $('.tdp'+cno).children().size();
															
															if(count>=8)
															{ 
																$('.tdp'+cno).append('</ul>');
																
																$('.UKwrapper').append('<ul  class = "tdp'+(++cno)+'"style="width:105px;margin:0;list-style-type:none;">');
																$('.tdp'+cno).append("<li><p>"+currName+"</p></li><li value='"+id+"' ><a sname='"+currName+"' style='color:#2075C2;' href='#'>" +currnext+ "</a></li>");
																
																prevName = currName;
																countItem=1;
																count=0;
															}
															else {	$('.tdp'+cno).append("<li><p>"+currName+"</p></li><li value='"+id+"'><a sname='"+currName+"' style='color:#2075C2;' href='#'>" +currnext+ "</a></li>");
															
															prevName = currName;
															countItem=countItem+2;	
															}
															
											}
														
									} 
									
									else {
												if(p==true) 
													{
														count=  $('.tdp'+cno).children().size();
														if(count>=8)
														{ 
															$('.tdp'+cno).append('</ul>');
															
															$('.UKwrapper').append('<ul  class = "tdp'+(++cno)+'"style="width:105px;margin:0;list-style-type:none;">');
															countItem=1;
															count=0;
															fname = currnext+", "+currName;
															$('.tdp'+cno).append("<li><a style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id+"&#39;,&#39;"+currnext+"&#39;,this);return false;'>" +currnext+ "</a></li>");
															
														}
														else{	fname = currnext+", "+currName;
														$('.tdp'+cno).append("<li><a  style='color:#2075C2;' href='#' onclick='setpgeo(&#39;"+id+"&#39;,&#39;"+currnext+"&#39;,this);return false;'>" +currnext+ "</a></li>");
														countItem++;
													}
													}
									                 else {
									                	 count=  $('.tdp'+cno).children().size();
															if(count>=8)
															{ 
																$('.tdp'+cno).append('</ul>');
																
																$('.UKwrapper').append('<ul  class = "tdp'+(++cno)+'"style="width:105px;margin:0;list-style-type:none;">');
																countItem=1;
																count=0;
																fname = currnext+", "+currName;
																$('.tdp'+cno).append("<li value='"+id+"'><a  href='#' sname='"+currName+"' style='color:#2075C2;'>" +currnext+ "</a></li>");
																
															}
															else{	fname = currnext+", "+currName;
															$('.tdp'+cno).append("<li value='"+id+"'><a href='#' sname='"+currName+"'style='color:#2075C2;' href='#'>" +currnext+ "</a></li>");
															countItem++;
														}
									                	 
									                	 
									                 }
									
									}
													
												});
								count=  $('.tdp'+cno).children().size();
								if(!count>=8)
								{ 
									$('.tdp'+cno).append('</ul>');
								}
								
								
								
								
							}			});



				 }


}


function getGenreFeed(){
    var dataForContent;
    nonstop = function(tmp){
        dataForContent = tmp;
    };

// "+intlDomain+"
	var newUrl = location.protocol+"//publicfeed"+intlDomain+"/feedservices/lcsServices/allFavouriteGenresForDomainAndGeo/domain/"+dmn+"/geoId/"+userGeo+"?_jsonp=nonstop";
	        $.ajax({
			type : "GET",
			url : newUrl,
			dataType : "script",
			cache:true,
			success : function(content) {
				var root = dataForContent.GetFavouriteGenresResponse;
				 
				 if(document.getElementById("sports"))	{
						var sroot3 = root.sports;
						cno3=1;
						

					//if(root.sports[0].DisplayDescription==undefined) 
						if(!(root.sports instanceof Array))
							{
							if(dmnchk!="US")
							{
						 $('#sports').css( "width","116px");
							}
							if(dmnchk=="US"){
							 $("#sports").append('<ul style="height: 117px;padding:15px 0 0 !important;"><li style="padding:0px !important" class="mmDivider_top"></li><li style="padding:0px !important" class="mmDivider_bot"></li></ul>');					
						$("#sports").append('<ul id= "cond'+cno3+'" ><li style="color:#444444;"><b>Event Packages</b></li><li><a href="/indianapolis-500-tickets/">Indy 500</a></li><li><a href="/us-open-golf-tickets/">U.S. Open Golf</a></li><li><a href="/us-open-tennis-tickets/">U.S. Open Tennis</a></li><li><a href="/ryder-cup-tickets/">Ryder Cup</a></li><li><a href="/bcs-national-championship-game-tickets/">BCS Championship</a></li><li><a href="/super-bowl-tickets/">Super Bowl</a></li>');
						$('#cond'+cno3).append('</ul>');
							}
							}
						else {
							
					//	document.getElementById('sports').style.width = "351px";
						$("#sports").append('<ul style="height: 117px;padding:15px 0 0 !important;"><li style="padding:0px !important" class="mmDivider_top"></li><li style="padding:0px !important"  class="mmDivider_bot"></li></ul>');						
						$("#sports").append('<ul id= "cont'+cno3+'" ><li style="color:#444444;"><b>Popular</b></li>');
						$.each(sroot3,function(k, dataitem) {
						desc2 =dataitem.DisplayDescription;
						altDesc = dataitem.Description;
						url2= "/" + dataitem.GenreUrlPath;
					var	count2=  $('#cont'+cno3).children().size();
						if(count2>8)
							{ 
							$('#cont'+cno3).append("</ul>");
							cno3++;
							 document.getElementById('sports').style.width = "500px";
							 
							
								$("#sports").append('<ul id= "cont'+cno3+'" >');
								$('#cont'+cno3).append('<li><br/></li>');
							}
							else
							{	$('#cont'+cno3).append("<li style='color:#2075C2' ><a style='color:#2075C2' title='"+altDesc+"' href='"+url2+"'>" +desc2+ "</a></li>");
						    }
						});
						 $('#cont'+cno3).append('</ul>');
						 if(dmnchk=="US"){
						 cno3++;
						  $("#sports").append('<ul style="height: 117px;padding:15px 0 0 !important;"><li style="padding:0px !important" class="mmDivider_top"></li><li style="padding:0px !important" class="mmDivider_bot"></li></ul>');					
						$("#sports").append('<ul id= "cond'+cno3+'" ><li style="color:#444444;"><b>Event Packages</b></li><li><a href="/indianapolis-500-tickets/">Indy 500</a></li><li><a href="/us-open-golf-tickets/">U.S. Open Golf</a></li><li><a href="/us-open-tennis-tickets/">U.S. Open Tennis</a></li><li><a href="/ryder-cup-tickets/">Ryder Cup</a></li><li><a href="/bcs-national-championship-game-tickets/">BCS Championship</a></li><li><a href="/super-bowl-tickets/">Super Bowl</a></li>');
						$('#cond'+cno3).append('</ul>');
						}
					}
						
//						if(document.getElementById("cont1")){
//							$('#sports ul:first-child').css("border-right","1px solid #CCCCCC");
//							}
						
						}
				 
				 
				 if(document.getElementById("concerts"))	{
					 cno=1;
				
					 var sroot1 = root.concerts;
var descCheck="";
					 //$.each(sroot1, function(k, item) {
						//if ( root.concerts[0].DisplayDescription== undefined) 
							if(!(root.concerts instanceof Array)){  			
							
							$('#concerts' ).css("width","auto");
							}
					 
		 else 	
					 		{
			 								//document.getElementById('concerts').style.width = "391px";
			 								$("#concerts").append('<ul style="height: 117px;padding:15px 0 0 !important;"><li style="padding:0px !important" class="mmDivider_top"></li><li style="padding:0px !important" class="mmDivider_bot"></li></ul>');						
			 								$("#concerts").append('<ul id= "conc'+cno+'" ><li style="color:#444444;"><b>Popular</b></li>');
			 								$.each(sroot1, function(k, item) {
			 								desc =item.DisplayDescription; 
			 								altDesc1 = item.Description;
			 								url1=item.GenreUrlPath;
			 								urln ="/"+url1;
			 								var count=  $('#conc'+cno).children().size();
			 						if(count>8)
			 							{ 
			 								$('#conc'+cno).append("</ul>");
			 								cno++;
			 								document.getElementById('concerts').style.width = "500px";
						
			 								$("#concerts").append('<ul id= "conc'+cno+'" >');
			 								$('#conc'+cno).append('<li><br/></li>');
			 							}
			 						else
			 							{	
			 								$('#conc'+cno).append("<li style='color:#2075C2' ><a style='color:#2075C2' title='"+altDesc1+"' href='"+urln+"'>" +desc+ "</a></li>"); 
			 							} 
			 				
			 								});
						 		
						 		$('#conc'+cno).append('</ul>');
			
				 }
				 
//							if(document.getElementById("conc1")){
//								$('#concerts ul:first-child').css("border-right","1px solid #CCCCCC");
//								}
				 
				
				 } 
				 
			 if(document.getElementById("comedy"))	{
										 var sroot2 = root.theaters;
										  if(!(root.theaters instanceof Array)){  
										// if(root.theaters[0].DisplayDescription==undefined)
											
						if(dmnchk!="US")
							{
						 $('#comedy').css( "width","197px");
							}
						else {
							$('#comedy').css( "width","125px");
						}
					}
					else{
						//document.getElementById('comedy').style.width = "351px";
					    cno1=1;
						$("#comedy").append('<ul style="height: 117px;padding:15px 0 0 !important;"><li style="padding:0px !important" class="mmDivider_top"></li><li style="padding:0px !important" class="mmDivider_bot"></li></ul>');					
						$("#comedy").append('<ul id= "cond'+cno1+'" ><li style="color:#444444;"><b>Popular</b></li>');
						$.each(sroot2,function(k, itemset) {
						desc1 =itemset.DisplayDescription;
						altDesc2 = itemset.Description;
						url1=itemset.GenreUrlPath;
						urlk ="/"+url1;
					var	count1=  $('#cond'+cno1).children().size();
						if(count1>8)
							{ 
								$('#cond'+cno1).append("</ul>");
								 cno1++;
								 document.getElementById('comedy').style.width = "500px";
								 
								$("#comedy").append('<ul id= "cond'+cno1+'" >');
								$('#cond'+cno1).append('<li><br/></li>');
							} 
							else
							{	
					    	    $('#cond'+cno1).append("<li style='color:#2075C2'><a style='color:#2075C2'title='"+altDesc2+"' href='"+urlk+"'>" +desc1+ "</a></li>"); 
						    }
						});
						 $('#cond'+cno1).append('</ul>');
					}	
//										  if(document.getElementById("cond1")){
//												$('#comedy ul:first-child').css("border-right","1px solid #CCCCCC");
//												}
						}
		
				
				$('.LIcolor' ).css( "color","#000");

			}
});
	        
	        	        
}

$(document).ready(function() {
	getGenreFeed();
    $("#srchbtn").click(function(){
	    $.writeCookielet("STUB_BROWSE_SESS", "searchKey", $("#searchStr").val())
 });
	if ( $.readCookielet('STUB_BROWSE_SESS', 'searchKey')){$("#searchStr").attr('value',$.readCookielet('STUB_BROWSE_SESS', 'searchKey'))}

    $("#oll2").overlay({
        align: "relative",
        source: '#geoloc2',
        offsetX:1,
        width:700,
        offsetY: -3,
        trigger: "click",
        showCloseIcon: true,
        modal: false,
        open: function() { 
        	var d=true;

        	
        	if(document.getElementById("geoloc2"))
        {	
        	if(dmnchk=="US")
        	{	
        		if(d==true)
        		{$("#geoloc2").append("<div id='locationtabs'><div><span>By telling us where you are, we'll feature events in your area on StubHub</span></div><div id='tabBody'class='setFormattingContext'><div id='US'style='height: 365px; width: 650px; overflow: hidden;'><div style='clear: both; margin: 10px 0px;'><a href='#'onclick='setpgeo(&#39;0&#39;,&#39;All locations&#39;,this);return false;'style='color: #2075C2;'>All locations</a></div><div class='Mywrapper'style='position:relative;'></div><div id='CA'style='clear: both; margin: 10px 0px;'><b>Canada</b><div class='CAwrapper'style='height: 140px; margin-left: 10px; margin-top: 5px;'></div></div></div></div></div><div id='loading'></div>");}
        		else 
                { $("#geoloc2").append("<div id='locationtabs'><div><span>By telling us where you are, we'll feature events in your area on StubHub</span></div><div id='tabBody'class='setFormattingContext'><div id='US'style='height: 365px; width: 650px;  overflow: hidden;'><div style='clear: both; margin: 10px 0px;'><li id='Sid'><a href='#'style='color: #2075C2;'>All locations</a></li></div><div class='Mywrapper'style='position:relative;'></div><div id='CA'style='clear: both; margin: 10px 0px;'><b>Canada</b><div class='CAwrapper'style='height: 140px; margin-left: 10px; margin-top: 5px;'></div></div></div></div></div><div id='loading'></div>");}
        	}
        	else 
        	{
        		if(d==true)
        		{$("#geoloc2").append("<div id='locationtabs'><div><span>By telling us where you are, we'll feature events in your area on StubHub</span></div><div id='tabBody'class='setFormattingContext'><div id='UK'style=' overflow: hidden;'><div style='clear: both; margin: 10px 0px;'><a href='#'onclick='setpgeo(&#39;0&#39;,&#39;All locations&#39;,this);return false;'style='color: #2075C2;'>All locations</a></div><div class='UKwrapper'style='border-top: 1px solid #CCCCCC; padding-top: 10px; display:none;'></div></div></div></div><div id='loading'></div>");}
        		else 
                { $("#geoloc2").append("<div id='locationtabs'><div><span>By telling us where you are, we'll feature events in your area on StubHub</span></div><div id='tabBody'class='setFormattingContext'><div id='UK'style=' overflow: hidden;'><div style='clear: both; margin: 10px 0px;'><li id='Pid'><a href='#'style='color: #2075C2;'>All locations</a></li></div><div class='UKwrapper'style='border-top: 1px solid #CCCCCC; padding-top: 10px; display:none;'></div></div></div></div><div id='loading'></div>");}
        		
        	}	
        	
        }
        		
        			
        			
        			
        			
        		
        	
        	getUSxml(d);
        
        	/*  if(dmnchk=="US"){
        	  $('#locationtabs').tabs({
                cache: false,
                selected: '0'
             }); }
        	  else{ 
        		  $('#locationtabs').tabs({
                      cache: false,
                      selected: '1'
                   });
        	  }*/
        }
    }); 
    function SelectElement(valueToSelect){var element = document.getElementById('Range');element.value = valueToSelect;}

      $("#OpenAdvanceSearch").overlay({ 
    	align: "relative",
        source: '#findTickets',
    	trigger: "click",
        showCloseIcon: true,
        offsetX:-60,
        offsetY:-43,
        overlayId:"advOverlay",
        width:710,
        height:42,
        modal:false,
        open: function() { 
        	// change location toggle
        // HTML 	
        
            
        	
        	if(document.getElementById("findTickets")){
        		if(dmnchk=="US"){
        	//	function SelectElement(valueToSelect){var element = document.getElementById('Range');element.value = valueToSelect;}
        		{$("#findTickets").append("<div id='dateRangeRow'><input autocomplete='off'id='keyword'name='searchStr'type='text'value='Keyword (optional)'style='padding-left: 5px; width: 275px;'/><select id='Range'style='width: 275px; margin-left: 10px;'><option value='1'>All available dates</option><option value='2'>This weekend</option><option value='3'>Next 3 days</option><option value='4'>Next 7 days</option><option selected='selected'value='5'>Next 30 days</option><option value='0'>Custom date range</option></select></div><div id='locexp'style='float: left; width: 275px; padding-top: 10px'><div id='ToggleAdvanceSearchLoc'><span id='slvalue'style='color: #666666;'>Location:</span><a id='SearchLocation'value='0'style='font-weight: bold; margin: 0 4px;'><script>if($.readCookielet('STUB_BROWSE_SESS','locCok')!=''){$('#SearchLocation').text($.readCookielet('STUB_BROWSE_SESS','locCok1'));$('#SearchLocation').attr('value',$.readCookielet('STUB_BROWSE_SESS','locCok'))}else if(document.getElementById('oll2')){var tag=$('#oll2 span:first-child').text();$('#SearchLocation').text(tag);$('#SearchLocation').attr('value',userGeo)}else{$('#SearchLocation').text('All locations')}</script></a><span class='nodecoration arrow-7-orange arrow-7-s' id='oll2-a'>&nbsp;</span></div><div id='id2'class='hideOnLoad'style='width: 100%; width: 670px; padding: 3px 0px;'><div id='locationtabs'><div id='US'style='height: 365px; width: 650px; overflow: hidden;'><div style='clear: both; margin: 10px 0px;'><ul><li value='0'><a style='color: #2075C2;'sname=''href='#'>All locations</a></li></ul></div><div class='Mywrapper'style='position:relative;'></div><div id='CA'style='clear: both; margin: 10px 0px;'><b>Canada</b><div class='CAwrapper'style='height: 140px; margin: 5px 0 0 10px'></div></div></div></div></div></div><div id='rowDate'><div class='dateInput'><input id='DateStart'readonly='true'name='startDate'type='text'/><span style='font-size: 14px; padding-right: 10px'>to</span><input id='DateEnd'readonly='true'name='endDate'type='text'/><button class='btn-search'id='eventfinderBtn'type='submit'style='float: right; margin: 0 !important; padding: 0px;'></button></div></div>")}
        			if($.readCookielet('STUB_BROWSE_SESS','AvDateText'))
        			{
        				function SelectElement(valueToSelect)
        				{
        					var element=document.getElementById('Range');
        					element.value=valueToSelect
        				}
        					SelectElement($.readCookielet('STUB_BROWSE_SESS','AvDateText'))
        			}
        			else
        			{	
        				SelectElement(5);
        			}
        		}
        		else {
            		{$("#findTickets").append("<div id='dateRangeRow'><input autocomplete='off'id='keyword'name='searchStr'type='text'value='Keyword (optional)'style='padding-left: 5px; width: 275px;'/><select id='Range'style='width: 275px; margin-bottom:2px; margin-left: 10px;'><option value='1'>All available dates</option><option value='2'>This weekend</option><option value='3'>Next 3 days</option><option value='4'>Next 7 days</option><option selected='selected' value='5'>Next 30 days</option><option value='0'>Custom date range</option></select></div><div id='locexp'style='float: left; width: 275px; padding-top: 10px'><div id='ToggleAdvanceSearchLoc'><span id='slvalue'style='color: #666666;'>Location:</span><a id='SearchLocation'value='0'style='font-weight: bold; margin: 0 4px;'><script>if($.readCookielet('STUB_BROWSE_SESS','locCok') !=''){$('#SearchLocation').text($.readCookielet('STUB_BROWSE_SESS','locCok1'));$('#SearchLocation').attr('value',$.readCookielet('STUB_BROWSE_SESS','locCok'))}else if(document.getElementById('oll2')){var tag=$('#oll2 span:first-child').text();$('#SearchLocation').text(tag);$('#SearchLocation').attr('value',userGeo);}else {$('#SearchLocation').text('All locations');}</script></a><span class='nodecoration arrow-7-orange arrow-7-s' id='oll2-a'>&nbsp;</span></div><div id='id2'class='hideOnLoad'style='width: 100%; width: 670px; padding: 3px 0px;'><div id='locationtabs'><div id='UK'style='height: 365px;  overflow: hidden;'><div style='clear: both; margin: 10px 0px;'><ul><li value='0'><a style='color: #2075C2;'sname=''href='#'>All locations</a></li></ul></div><div class='UKwrapper'style='border-top: 1px solid #CCCCCC; padding-top: 10px;'></div></div></div></div></div><div id='rowDate'><div class='dateInput'><input id='DateStart'readonly='true'name='startDate'type='text'/><span style='font-size: 14px; padding-right: 10px'>to</span><input id='DateEnd'readonly='true'name='endDate'type='text'/><button class='btn-search'id='eventfinderBtn'type='submit'style='float: right; margin: 0 !important; padding: 0px;'></button></div></div>");}
            		if($.readCookielet('STUB_BROWSE_SESS','AvDateText'))
        			{
        				function SelectElement(valueToSelect)
        				{
        					var element=document.getElementById('Range');
        					element.value=valueToSelect
        				}
        					SelectElement($.readCookielet('STUB_BROWSE_SESS','AvDateText'))
        			}
        			else
        			{	
        				SelectElement(5);
        			}
        		
        		}
        	}
        	
        	
        	/*$("#findTickets").live('click',function(){
        		if($.readCookielet('STUB_BROWSE_SESS','AvDateText')){function SelectElement(valueToSelect){var element=document.getElementById('Range');element.value=valueToSelect;}SelectElement($.readCookielet('STUB_BROWSE_SESS','AvDateText'))}else{SelectElement(5);}
          });*/
        	
        	
        // Change location toggle	
       	 $('#ToggleAdvanceSearchLoc').click(function() {
       		if(dmnchk=="US"){
 				if ($("#id2").is(":hidden")) {
 					$('#findTickets').css( "height","420px");
 					 
 				$("#id2").show("fast");
 				} else {
 					$('#findTickets').css( "height","55px");
 				$("#id2").hide("fast");
 				 
 				}
       		}  
       		else {
       			if ($("#id2").is(":hidden")) {
 					$('#findTickets').css( "height","250px");
 					 
 				$("#id2").show("fast");
 				} else {
 					$('#findTickets').css( "height","55px");
 				$("#id2").hide("fast");
 				 
 				}
       			
       		}
       		});
    	//End for change location toggle	
       	 

       	 
       		//Call for tabs
    		var d=false;  getUSxml(d);
    		
    		
    		/*if(dmnchk=="US"){
          	  $('#locationtabs').tabs({
                  cache: false,
                  selected: '0'
               }); }
          	  else{ 
          		  $('#locationtabs').tabs({
                        cache: false,
                        selected: '1'
                     });
          	  } */
            //End of tabs
    		function formatDate(date)
    		{  if(dmnchk=="US"){
    				var m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    			var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    			var y = date.getFullYear();
    			//.toString().slice(2);
    		
    			return m + "/" + d + "/" + y }
    		
    		else {
    				var m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    			var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    			var y = date.getFullYear();
    			//.toString().slice(2);
    		
    			return d + "/" + m + "/" + y }
    		
    		
    		}
    		var thirtyDay = new Date;
    		thirtyDay.setDate(thirtyDay.getDate() + 29);
    		
    		if(dmnchk=="US"){
    		
    		$("#DateStart").datepicker({
    			dateFormat: "mm/dd/yy",
    			defaultDate: null,
    			onSelect: function (dateText, inst) {
    			//	$.writeCookielet("STUB_BROWSE_SESS", "hds", dateText);
    			//	$("#DateStart").bind("change", function(e){
    		 	           // e.preventDefault();
    	 	           var startDate = $(this).datepicker('getDate');
    	 	           var setDate1 = $(this).datepicker('getDate');
    	 	          setDate1 = new Date(setDate1.getTime());
    	 	         setDate1.setMonth(setDate1.getMonth() + 6);
    	 	           startDate = new Date(startDate.getTime());
    	 	            startDate.setDate(startDate.getDate() + 1);
    	 	            $('#DateEnd').datepicker("option", "minDate", startDate);
    	 	            $('#DateEnd').datepicker( "setDate",setDate1 );
    	 	           function SelectElement(valueToSelect)
    	 	        	{    
    	 	        	    var element = document.getElementById('Range');
    	 	        	    element.value = valueToSelect;
    	 	        	}
    	 	            SelectElement(0);
    	 	  //  });
    			}
    		}).val($.readCookielet("STUB_BROWSE_SESS", "hds") != "" ? $.readCookielet("STUB_BROWSE_SESS", "hds") : formatDate(new Date));
    		
    		$("#DateEnd").datepicker({
    			dateFormat: "mm/dd/yy",
    			defaultDate: "+30d",
    			onSelect: function (dateText, inst) {
    			//	$.writeCookielet("STUB_BROWSE_SESS", "hde", dateText)
    				function SelectElement(valueToSelect)
   	 	        	{    
   	 	        	    var element = document.getElementById('Range');
   	 	        	    element.value = valueToSelect;
   	 	        	}
   	 	            SelectElement(0);
    				
    			}
    			}).val($.readCookielet("STUB_BROWSE_SESS", "hde") != "" ? $.readCookielet("STUB_BROWSE_SESS", "hde") : formatDate(thirtyDay));
    		
    		
    		
    		
    		
    		}
    		
    		else {
    			
    			$("#DateStart").datepicker({
        			dateFormat: "dd/mm/yy",
        			defaultDate: null,
        			onSelect: function (dateText, inst) {
        			//	$.writeCookielet("STUB_BROWSE_SESS", "hds", dateText);
        			//	$("#DateStart").bind("change", function(e){
        	     	           // e.preventDefault();
        	        	//		alert("was here");
        	     	         var   startDate = $(this).datepicker('getDate');
        	     	        var setDate1 = $(this).datepicker('getDate');
          	 	          setDate1 = new Date(setDate1.getTime());
        	 	            setDate1.setMonth(setDate1.getMonth() + 6);
        	     	         startDate = new Date(startDate.getTime());
        	     	            startDate.setDate(startDate.getDate() + 1);
        	     	            $('#DateEnd').datepicker("option", "minDate", startDate);
        	     	           $('#DateEnd').datepicker( "setDate",setDate1 );
        	     	           function SelectElement(valueToSelect)
           	 	        	{    
           	 	        	    var element = document.getElementById('Range');
           	 	        	    element.value = valueToSelect;
           	 	        	}
           	 	            SelectElement(0);
        	     	  //  });
        			}
        		}).val($.readCookielet("STUB_BROWSE_SESS", "hds") != "" ? $.readCookielet("STUB_BROWSE_SESS", "hds") : formatDate(new Date));
    			
    			    		    
        		$("#DateEnd").datepicker({
        			dateFormat: "dd/mm/yy",
        			defaultDate: "+30d",
        			onSelect: function (dateText, inst) {
        			//	$.writeCookielet("STUB_BROWSE_SESS", "hde", dateText)
        				function SelectElement(valueToSelect)
       	 	        	{    
       	 	        	    var element = document.getElementById('Range');
       	 	        	    element.value = valueToSelect;
       	 	        	}
       	 	            SelectElement(0);
        			}
        			}).val($.readCookielet("STUB_BROWSE_SESS", "hde") != "" ? $.readCookielet("STUB_BROWSE_SESS", "hde") : formatDate(thirtyDay));
        		


    		
    		}
    		
    				
    		
    		
    		

  $("#keyword").attr("value", "Keyword (optional)").addClass("inputtips");
  $("#keyword").focus(function () {
      if ($(this).hasClass("inputtips")) $(this).removeClass("inputtips").val("")
  });
  $("#keyword").blur(function () {
      if ($(this).val() == "") $(this).attr("value", "Keyword (optional)").addClass("inputtips")
  });
  $("#keyword").james("/search/suggestions", {
      minlength: 2,
      varname: "q",
      params: "limit=10",
      dataType: "text",
      width: "328px",
      onKeystroke: function (data) {
          dataArray = data.split("\n");
          return dataArray
      }
  });
	if ($.readCookielet('STUB_BROWSE_SESS', 'searchKey')){$("#keyword").attr('value',$.readCookielet('STUB_BROWSE_SESS', 'searchKey'))}

  
  $("#id2 ul li a").live('click',function(){   
	   ev=$(this).parent().attr("value");
	  if(dmnchk=="US"){
		  if($(this).text()=="All locations"){et=$(this).text()}else {
	   et=$(this).text()+", "+$(this).attr("sname");} }
	  else {et=$(this).text()+", UK" }
	      
	   $("#SearchLocation").text(et);
	$("#SearchLocation").attr('value', ev);
	   
	  
   });
 $("#eventfinderBtn").click(eventFinderSubmit);

 

 
 function formatUkDate(date){
	  var ukDate = date.toString(); 
	   ukday = ukDate.substr(0,2); 
	   ukmon = ukDate.substr(3,2);
	   ukyear = ukDate.substr(6,4);
	   return ukmon + "/"+ ukday + "/" +ukyear ;
 }
 function eventFinderSubmit() {
	 if(dmnchk=="US"){
     url = "/search/doSearch?pageNumber=1&rows=50&searchMode=event";
     var  e = $("#SearchLocation").attr("value");   
     var p =String(e); 
      if ($("#keyword").val() == "Keyword (optional)") 
    	  $("#keyword").val("");
      url += "&searchStr=" + escape($("#keyword").val());
      if(p != "0") 
    	  url += "&location=" + p + ";" + $("#SearchLocation").text(); 
    	  
      elem = "#Range option:selected";
      var sd= $("#DateStart").val(); 
      var ed= $("#DateEnd").val();
      

      selectDateRange(elem, sd,ed);
      if ($("#DateStart").val() != "0") {
    		var startDate = new Date($("#DateStart").val());  
           var  endDate = new Date($("#DateEnd").val()); 
           var  startCentury = startDate.getFullYear() < 2E3 ? 100 : 0; 
           var  endCentury = endDate.getFullYear() < 2E3 ? 100 : 0; 
           var  startMonth = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1; 
           var  endMonth = endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1;
            var startDay = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate();
          var   endDay = endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate();
             url += "&startDate=" + (startDate.getFullYear() + startCentury) + "-" + startMonth + "-" + startDay;
             if ($(elem).val() != "Custom date range") url += ";" + $(elem).val();
             else {
           	  
                 url += ";" + $("#DateStart").val() + " to " + $("#DateEnd").val();
                 $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
                 $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val())
             }
             url += "&endDate=" + (endDate.getFullYear() + endCentury) + "-" + endMonth + "-" + endDay + ";" + $("#DateEnd").val();
             $.writeCookielet("STUB_BROWSE_SESS", "locCok", p);
             $.writeCookielet("STUB_BROWSE_SESS", "locCok1", $("#SearchLocation").text());
             $.writeCookielet("STUB_BROWSE_SESS", "AvDateText",$(elem).val());
             $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
             $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val())
             $.writeCookielet("STUB_BROWSE_SESS", "searchKey", $("#keyword").val())
             window.location = url;
    		
    		}
 }
	 else{
		 url = "/search/doSearch?pageNumber=1&rows=50&searchMode=event";
	     var  e = $("#SearchLocation").attr("value");   
	     var p =String(e); 
	      if ($("#keyword").val() == "Keyword (optional)") 
	    	  $("#keyword").val("");
	      url += "&searchStr=" + escape($("#keyword").val());
//	      if(p != "0") 
	    	  url += "&location=" + p + ";" + $("#SearchLocation").text(); 
	    	  //changed p to e 
	      elem = "#Range option:selected";
	      var sd1= $("#DateStart").val(); 
	      var ed1= $("#DateEnd").val();
	      

	      selectDateRange(elem, sd1,ed1);
	      if (sd1 != "0") {
	    	  		var sd= formatUkDate(sd1); 
	    	  		var ed= formatUkDate(ed1);
	    	  		var urlmon = sd.substr(0,2);
	    	  		var urlday = sd.substr(3,2);
	    	  		var urlyr = sd.substr(6,4);
	             url += "&startDate=" + urlyr + "-" + urlmon + "-" + urlday + ";" + sd;
	             if ($(elem).val() != "Custom date range") url += ";" + $(elem).val();
	             else {
	           	  
	                 url += ";" + sd + " to " + ed;
	                 $.writeCookielet("STUB_BROWSE_SESS", "hds", sd);
	                 $.writeCookielet("STUB_BROWSE_SESS", "hde", ed);
	             }
	             var urlmon1 = ed.substr(0,2);
	    	  		var urlday1 = ed.substr(3,2);
	    	  		var urlyr1 = ed.substr(6,4);
	             url += "&endDate=" + urlyr1 + "-" + urlmon1 + "-" + urlday1 + ";" + ed;
	             $.writeCookielet("STUB_BROWSE_SESS", "locCok", p);
	             $.writeCookielet("STUB_BROWSE_SESS", "locCok1", $("#SearchLocation").text());
	             $.writeCookielet("STUB_BROWSE_SESS", "AvDateText",$(elem).val());
	             $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
                 $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val())
                 $.writeCookielet("STUB_BROWSE_SESS", "searchKey", $("#keyword").val())
                 window.location = url;
	    		
	    		}
	 }
	 }
     
  
 
 
  $("#Range").change(onSelectChange);

  function onSelectChange(){
	  
	var  today = new Date;
     var endDate = new Date;
  var selected = $("#Range option:selected")
 switch ($(selected).val()) {
        case "1":
        	endDate.setDate(endDate.getDate() + 365);
        	$("#DateStart").val(formatDate(today,dmnchk));
            $("#DateEnd").val(formatDate(endDate,dmnchk));
            break;
        case "2":
        	if (today.getDay() == 5 || today.getDay() == 6) {
                endDate.setDate(endDate.getDate() + 7 - today.getDay());
                $("#DateStart").val(formatDate(today,dmnchk));
                $("#DateEnd").val(formatDate(endDate,dmnchk))
            } else {
               var startDate = new Date;
                startDate.setDate(startDate.getDate() + (5 - today.getDay()));
                endDate.setDate(endDate.getDate() + (7 - today.getDay()));
                $("#DateStart").val(formatDate(startDate,dmnchk));
                $("#DateEnd").val(formatDate(endDate,dmnchk))
            }
            break;
        case "3":
        	endDate.setDate(endDate.getDate() + 2);
            $("#DateStart").val(formatDate(today,dmnchk));
            $("#DateEnd").val(formatDate(endDate,dmnchk));
            break;
        case "4":
   	        
        	endDate.setDate(endDate.getDate() + 6);
            $("#DateStart").val(formatDate(today,dmnchk));
            $("#DateEnd").val(formatDate(endDate,dmnchk));
            break;
        case "5":
        	
            endDate.setDate(endDate.getDate() + 29);
            $("#DateStart").val(formatDate(today,dmnchk));
            $("#DateEnd").val(formatDate(endDate,dmnchk));
            break;
            default:
            	endDate.setMonth(endDate.getMonth() + 6);
            $("#DateStart").val(formatDate(today,dmnchk));
            $("#DateEnd").val(formatDate(endDate,dmnchk));
        }
  /*$.writeCookielet("STUB_BROWSE_SESS", "AvDateText", $(selected).val());
  $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
  $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val())*/
    
  }
  
  
  function selectDateRange(elem, sd1, ed1) {
  if(dmnchk=="US") {
	  var el =$(elem).val();
      if ($(elem).val() == "customdate")
   {
    	  today = new Date;
      endDate = new Date;
      switch ($(elem).val()) {
      case "0":
      	endDate.setMonth(endDate.getMonth() + 6);
          if (dateStart || dateEnd) {
              $("#DateStart").val(dateStart);
              $("#DateEnd").val(dateEnd)
          } else {
              $("#DateStart").val(formatDate(today));
              $("#DateEnd").val(formatDate(endDate))
          }
         break;
      default:
          $("#DateStart").val(formatDate(today));
          $("#DateEnd").val(formatDate(endDate));
      }
     /* $.writeCookielet("STUB_BROWSE_SESS", "AvDateText", $(elem).val());
      $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
      $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val())*/
  }
      
  }
  else { 
	  var el =$(elem).val();
      if ($(elem).val() == "customdate")
   {
    	  today = new Date;
      endDate = new Date;
      switch ($(elem).val()) {
      case "0":
      	endDate.setMonth(endDate.getMonth() + 6);
          if (dateStart || dateEnd) {
              $("#DateStart").val(dateStart);
              $("#DateEnd").val(dateEnd)
          } else {
              $("#DateStart").val(formatUkDate(today));
              $("#DateEnd").val(formatUkDate(endDate))
          }
         break;
      default:
    	  
          $("#DateStart").val(formatUkDate(today));
          $("#DateEnd").val(formatUkDate(endDate))
      }
     /* $.writeCookielet("STUB_BROWSE_SESS", "AvDateText", $(elem).val());
      $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val());*/
  }
	  
	  
	  
	  
  }
  
  }
      
        }
    });
 
    
    $(" ul.mg > li > a").hover(
    		   function()
			   { 
			    $(this).parent().attr('style','');
			    $(this).parent().removeAttr('style');
			    $(this).parent().addClass('highlight');
			    $(this).next().show(); 
			   },
    		   function() 
			   { 
			   $(this).parent().removeClass('highlight');
			   $(this).parent().attr('style','');			 
			   $(this).parent().removeAttr('style');
			   $(this).next().hide() }
    		);
    	
    
    
    
    $("ul.mg div").hover(
    		   function(){
    			   $(this).show();
    		       $(this).parent().attr('style','');
				   $(this).parent().removeAttr('style');
    			   $(this).parent().addClass("highlight");
    		    		   },
    		    function() {
    			   $(this).parent().removeClass("highlight");
    			   $(this).parent().attr('style','');
				   $(this).parent().removeAttr('style');
    			  
    			   $(this).hide();
    			    }
    		);  
    		
    		
    		function formatDate(date) {
    		     var m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    		     var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    		     var y = date.getFullYear().toString().slice(2);
    		     return m + "/" + d + "/" + y
    		 }
    		
    		
    		 $('#weekend').click(function(){
        		 url = "/search/doSearch?pageNumber=1&rows=50&searchMode=event";
       			 url+= "&location="+ userGeo + ";" + $("#oll2 span:first-child").text();
       			 url += "&searchStr=" ;
       		 var today = new Date;
       		var endDate = new Date;
       		  if (today.getDay() == 5 || today.getDay() == 6) {
                  endDate.setDate(endDate.getDate() + 7 - today.getDay());
                  p =formatDate(today);
                  q= formatDate(endDate);
              } else {
                var  startDate = new Date;
                  startDate.setDate(startDate.getDate() + (5 - today.getDay()));
                  endDate.setDate(endDate.getDate() + (7 - today.getDay()));
                  p=formatDate(startDate);
                  q=formatDate(endDate);
              }
       		      if (p != "0") {
       		         var startDate = new Date(p);
       		         var endDate = new Date(q);
       		        var  startCentury = startDate.getFullYear() < 2E3 ? 100 : 0;
       		        var  endCentury = endDate.getFullYear() < 2E3 ? 100 : 0;
       		         var startMonth = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
       		         var endMonth = endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1;
       		         var startDay = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate();
       		         var endDay = endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate();
       		          url += "&startDate=" + (startDate.getFullYear() + startCentury) + "-" + startMonth + "-" + startDay;
       		          url += "&endDate=" + (endDate.getFullYear() + endCentury) + "-" + endMonth + "-" + endDay + ";" + q;
       		          var cookhds = startDay + "/" + startMonth + "/" + (startDate.getFullYear() + startCentury)  ;	
       		          var cookhde = endDay + "/" + endMonth + "/" + (endDate.getFullYear() + endCentury);
       		          var cookhds1 = startMonth + "/" + startDay + "/" + (startDate.getFullYear() + startCentury)  ;	
    		          var cookhde1 = endMonth + "/" + endDay + "/" + (endDate.getFullYear() + endCentury);
       		          if(dmnchk=="US")
       		       	   {
       		    	   $.writeCookielet("STUB_BROWSE_SESS", "hds", cookhds1);
       		    	   $.writeCookielet("STUB_BROWSE_SESS", "hde", cookhde1);
       		           } 
       		       else 
       		           {
       		    	   url+="&ae=2";
       		    	$.writeCookielet("STUB_BROWSE_SESS", "hds",cookhds );
                    $.writeCookielet("STUB_BROWSE_SESS", "hde",cookhde );
       		           }
       		    $.writeCookielet("STUB_BROWSE_SESS", "AvDateText","2");
                   window.location = url; 
       		      }
       			});
    		 
    		 
    		$("#three").click(function(){
    		 url = "/search/doSearch?pageNumber=1&rows=50&searchMode=event";
   			 url+= "&location="+ userGeo + ";" + $("#oll2 span:first-child").text();
   			 url += "&searchStr=" ;
   		  var today = new Date;
   		   var endDate = new Date;
   		
   		     p=  formatDate(today);
   			 endDate.setDate(endDate.getDate() + 2);
   			 q= formatDate(endDate);
   		      if (p != "0") {
   		       var   startDate = new Date(p);
   		        var  endDate = new Date(q);
   		        var  startCentury = startDate.getFullYear() < 2E3 ? 100 : 0;
   		         var endCentury = endDate.getFullYear() < 2E3 ? 100 : 0;
   		          var startMonth = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
   		         var endMonth = endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1;
   		         var startDay = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate();
   		          var endDay = endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate();
   		          url += "&startDate=" + (startDate.getFullYear() + startCentury) + "-" + startMonth + "-" + startDay;
   		          url += "&endDate=" + (endDate.getFullYear() + endCentury) + "-" + endMonth + "-" + endDay + ";" + q;
//   		       $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
//               $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val());
   		       var cookhds = startDay + "/" + startMonth + "/" + (startDate.getFullYear() + startCentury)  ;	
		          var cookhde = endDay + "/" + endMonth + "/" + (endDate.getFullYear() + endCentury);
		          var cookhds1 = startMonth + "/" + startDay + "/" + (startDate.getFullYear() + startCentury)  ;	
		          var cookhde1 = endMonth + "/" + endDay + "/" + (endDate.getFullYear() + endCentury);
		          if(dmnchk=="US")
		       	   {
		    	   $.writeCookielet("STUB_BROWSE_SESS", "hds", cookhds1 );
		    	   $.writeCookielet("STUB_BROWSE_SESS", "hde", cookhde1);
		           } 
		       else 
		           {
		    	   url+="&ae=2";
		    	$.writeCookielet("STUB_BROWSE_SESS", "hds",cookhds );
             $.writeCookielet("STUB_BROWSE_SESS", "hde",cookhde );
		           } 
		       $.writeCookielet("STUB_BROWSE_SESS", "AvDateText","3");
   		          window.location = url; 
   		      }
   			});
    		
    		
    		
    		$('#seven').click(function(){
    		 url = "/search/doSearch?pageNumber=1&rows=50&searchMode=event";
   			 url+= "&location="+ userGeo + ";" + $("#oll2 span:first-child").text();
   			 url += "&searchStr=" ;
   		 var today = new Date;
   		 var endDate = new Date;
		     p=  formatDate(today);
   			 endDate.setDate(endDate.getDate() + 6);
   			 q= formatDate(endDate);
   		      if (p != "0") {
   		       var startDate = new Date(p);
   		        var endDate = new Date(q);
   		        var  startCentury = startDate.getFullYear() < 2E3 ? 100 : 0;
   		        var  endCentury = endDate.getFullYear() < 2E3 ? 100 : 0;
   		        var  startMonth = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
   		         var endMonth = endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1;
   		         var startDay = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate();
   		          var endDay = endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate();
   		          url += "&startDate=" + (startDate.getFullYear() + startCentury) + "-" + startMonth + "-" + startDay;
   		          url += "&endDate=" + (endDate.getFullYear() + endCentury) + "-" + endMonth + "-" + endDay + ";" + q;
//   		       $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
//               $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val());
   		       var cookhds = startDay + "/" + startMonth + "/" + (startDate.getFullYear() + startCentury)  ;	
		          var cookhde = endDay + "/" + endMonth + "/" + (endDate.getFullYear() + endCentury);
		          var cookhds1 = startMonth + "/" + startDay + "/" + (startDate.getFullYear() + startCentury)  ;	
		          var cookhde1 = endMonth + "/" + endDay + "/" + (endDate.getFullYear() + endCentury);
		          if(dmnchk=="US")
		       	   {
		    	   $.writeCookielet("STUB_BROWSE_SESS", "hds", cookhds1 );
		    	   $.writeCookielet("STUB_BROWSE_SESS", "hde", cookhde1);
		           } 
		       else 
		           {
		    	   url+="&ae=2";
		    	$.writeCookielet("STUB_BROWSE_SESS", "hds",cookhds );
             $.writeCookielet("STUB_BROWSE_SESS", "hde",cookhde );
		           }
		     $.writeCookielet("STUB_BROWSE_SESS", "AvDateText","4");
   		          window.location = url; 
   		      }
   			});
    		
    		
    		 $('#upcum').click(function(){
    		 url = "/search/doSearch?pageNumber=1&rows=50&searchMode=event";
   			 url+= "&location="+ userGeo + ";" + $("#oll2 span:first-child").text();
   			 url += "&searchStr=" ;
   		   var today = new Date;
   		    var endDate = new Date;
		     p=  formatDate(today);
   			 endDate.setDate(endDate.getDate() + 6);
   			 q= formatDate(endDate);
   		      if (p != "0") {
   		        var  startDate = new Date(p);
   		        var  endDate = new Date(q);
   		        var  startCentury = startDate.getFullYear() < 2E3 ? 100 : 0;
   		        var  endCentury = endDate.getFullYear() < 2E3 ? 100 : 0;
   		         var startMonth = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
   		         var endMonth = endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1;
   		         var startDay = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate();
   		         var endDay = endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate();
   		          url += "&startDate=" + (startDate.getFullYear() + startCentury) + "-" + startMonth + "-" + startDay;
   		          url += "&endDate=" + (endDate.getFullYear() + endCentury) + "-" + endMonth + "-" + endDay + ";" + q;
//   		       $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
//               $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val());
   		       var cookhds = startDay + "/" + startMonth + "/" + (startDate.getFullYear() + startCentury)  ;	
		          var cookhde = endDay + "/" + endMonth + "/" + (endDate.getFullYear() + endCentury);
		          var cookhds1 = startMonth + "/" + startDay + "/" + (startDate.getFullYear() + startCentury)  ;	
		          var cookhde1 = endMonth + "/" + endDay + "/" + (endDate.getFullYear() + endCentury);
		          if(dmnchk=="US")
		       	   {
		    	   $.writeCookielet("STUB_BROWSE_SESS", "hds", cookhds1 );
		    	   $.writeCookielet("STUB_BROWSE_SESS", "hde", cookhde1);
		           } 
		       else 
		           {
		    	   url+="&ae=2";
		    	$.writeCookielet("STUB_BROWSE_SESS", "hds",cookhds );
             $.writeCookielet("STUB_BROWSE_SESS", "hde",cookhde );
		           }
		       $.writeCookielet("STUB_BROWSE_SESS", "AvDateText","4");
   		          window.location = url; 
   		      }
   			});
    		 
    		 
    		$('#thirty').click(function(){
    		 url = "/search/doSearch?pageNumber=1&rows=50&searchMode=event";
   			 url+= "&location="+ userGeo + ";" + $("#oll2 span:first-child").text();
   			 url += "&searchStr=" ;
   		   var today = new Date;
   		    var endDate = new Date;
   		     p=  formatDate(today);
   			 endDate.setDate(endDate.getDate() + 29);
   			 q= formatDate(endDate);
   		      if (p != "0") {
   		       var startDate = new Date(p);
   		         var endDate = new Date(q);
   		         var startCentury = startDate.getFullYear() < 2E3 ? 100 : 0;
   		         var endCentury = endDate.getFullYear() < 2E3 ? 100 : 0;
   		         var startMonth = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
   		         var endMonth = endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1;
   		         var startDay = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate();
   		        var endDay = endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate();
   		          url += "&startDate=" + (startDate.getFullYear() + startCentury) + "-" + startMonth + "-" + startDay;
   		          url += "&endDate=" + (endDate.getFullYear() + endCentury) + "-" + endMonth + "-" + endDay + ";" + q;
//   		       $.writeCookielet("STUB_BROWSE_SESS", "hds", $("#DateStart").val());
//               $.writeCookielet("STUB_BROWSE_SESS", "hde", $("#DateEnd").val());
   		       var cookhds = startDay + "/" + startMonth + "/" + (startDate.getFullYear() + startCentury)  ;	
		          var cookhde = endDay + "/" + endMonth + "/" + (endDate.getFullYear() + endCentury);
		          var cookhds1 = startMonth + "/" + startDay + "/" + (startDate.getFullYear() + startCentury)  ;	
		          var cookhde1 = endMonth + "/" + endDay + "/" + (endDate.getFullYear() + endCentury);
		          if(dmnchk=="US")
		       	   {
		    	   $.writeCookielet("STUB_BROWSE_SESS", "hds", cookhds1 );
		    	   $.writeCookielet("STUB_BROWSE_SESS", "hde", cookhde1);
		           } 
		       else 
		           {
		    	   url+="&ae=2";
		    	$.writeCookielet("STUB_BROWSE_SESS", "hds",cookhds );
             $.writeCookielet("STUB_BROWSE_SESS", "hde",cookhde );
		           }
		       $.writeCookielet("STUB_BROWSE_SESS", "AvDateText","5");
   		          window.location = url; 
   		      }
   			});

});
    
	
	
	function closepop(a) {
	    if (window.location.href.indexOf("test") != -1) window.location = "http://www.stubhub.com/?sgeo=0&pgeo=" + a;
	    else if ((a = location.pathname) && (a.indexOf("albany-events-tickets") != -1 || a.indexOf("albequerque-events-tickets") != -1 || a.indexOf("atlanta-events-tickets") != -1 || a.indexOf("atlantic-city-events-tickets") != -1 || a.indexOf("austin-events-tickets") != -1 || a.indexOf("baltimore-dc-events-tickets") != -1 || a.indexOf("baltimore-events-tickets") != -1 || a.indexOf("birmingham-events-tickets") != -1 || a.indexOf("boise-events-tickets") != -1 || a.indexOf("boston-events-tickets") != -1 || a.indexOf("buffalo-events-tickets") != -1 || a.indexOf("calgary-events-tickets") != -1 || a.indexOf("casper-events-tickets") != -1 || a.indexOf("charleston-sc-events-tickets") != -1 || a.indexOf("charleston-wv-events-tickets") != -1 || a.indexOf("charlotte-events-tickets") != -1 || a.indexOf("chicago-events-tickets") != -1 || a.indexOf("cincinnati-events-tickets") != -1 || a.indexOf("cleveland-events-tickets") != -1 || a.indexOf("columbia-events-tickets") != -1 || a.indexOf("columbus-events-tickets") != -1 || a.indexOf("dallas-events-tickets") != -1 || a.indexOf("denver-events-tickets") != -1 || a.indexOf("des-moines-events-tickets ") != -1 || a.indexOf("detroit-events-tickets") != -1 || a.indexOf("edmonton-events-tickets") != -1 || a.indexOf("el-paso-events-tickets") != -1 || a.indexOf("fargo-events-tickets ") != -1 || a.indexOf("frederickton-events-tickets") != -1 || a.indexOf("grand-rapids-events-tickets") != -1 || a.indexOf("green-bay-events-tickets") != -1 || a.indexOf("hallifax-events-tickets") != -1 || a.indexOf("hartford-events-tickets") != -1 || a.indexOf("houston-events-tickets") != -1 || a.indexOf("indianapolis-events-tickets") != -1 || a.indexOf("jackson-events-tickets") != -1 || a.indexOf("jacksonville-events-tickets") != -1 || a.indexOf("kansas-city-events-tickets") != -1 || a.indexOf("knoxville-events-tickets") != -1 || a.indexOf("la-san-diego-events-tickets") != -1 || a.indexOf("las-vegas-events-tickets") != -1 || a.indexOf("lincoln-events-tickets") != -1 || a.indexOf("little-rock-events-tickets") != -1 || a.indexOf("los-angeles-events-tickets") != -1 || a.indexOf("louisville-events-tickets") != -1 || a.indexOf("lubbock-events-tickets") != -1 || a.indexOf("memphis-events-tickets") != -1 || a.indexOf("miami-events-tickets") != -1 || a.indexOf("milwaukee-events-tickets") != -1 || a.indexOf("minneapolis-events-tickets") != -1 || a.indexOf("missoula-events-tickets") != -1 || a.indexOf("montreal-events-tickets") != -1 || a.indexOf("nashville-events-tickets") != -1 || a.indexOf("new-orleans-events-tickets") != -1 || a.indexOf("new-york-events-tickets") != -1 || a.indexOf("new-york-metro-events-tickets") != -1 || a.indexOf("oklahoma-city-events-tickets") != -1 || a.indexOf("orlando-events-tickets") != -1 || a.indexOf("ottawa-events-tickets") != -1 || a.indexOf("philadelphia-events-tickets") != -1 || a.indexOf("phoenix-events-tickets") != -1 || a.indexOf("pittsburgh-events-tickets") != -1 || a.indexOf("portland-events-tickets") != -1 || a.indexOf("raleigh-durham-events-tickets") != -1 || a.indexOf("reno-events-tickets") != -1 || a.indexOf("richmond-events-tickets") != -1 || a.indexOf("sacramento-events-tickets") != -1 || a.indexOf("salt-lake-city-events-tickets") != -1 || a.indexOf("san-diego-events-tickets") != -1 || a.indexOf("san-francisco-events-tickets") != -1 || a.indexOf("saskatoon-events-tickets") != -1 || a.indexOf("seattle-events-tickets") != -1 || a.indexOf("sioux-falls-events-tickets") != -1 || a.indexOf("st-louis-events-tickets") != -1 || a.indexOf("syracuse-events-tickets") != -1 || a.indexOf("tallahasee-events-tickets") != -1 || a.indexOf("tampa-events-tickets") != -1 || a.indexOf("toronto-events-tickets") != -1 || a.indexOf("vancouver-events-tickets") != -1 || a.indexOf("washington-dc-events-tickets") != -1 || a.indexOf("winnipeg-events-tickets") != -1)) window.location = "http://www.stubhub.com";
	    else window.location.reload()
	}	
	
	
	
function setpgeo(a,k,l){
	
	$.writeCookielet("STUB_PERSISTENT","geography_id",a,1E4);$.writeCookielet("STUB_SECR","geography_id",a,1E4);$.writeCookielet("STUB_BROWSE_SESS","hl",a);
	if(dmnchk=="US"){
		  $.writeCookielet("STUB_BROWSE_SESS", "locCok",a);
		  $.writeCookielet("STUB_BROWSE_SESS", "locCok1",k);
		var minG='';  if(k=="All locations")
			  {minG ="All locations"}
		  else{ var miniG1= k.split(","); minG = miniG1[1]; }
		  var s_account="stubliztest";
			var i=s_gi("stubhub");i.linkTrackVars="prop10";i.prop10=k;i.tl(this,"o","Change Location");if(a!="0")l.style.fontWeight="bold";l.style.color="#2075C2";document.getElementById("loading").innerHTML='<img src="https://cache1.stubhubstatic.com/promotions/scratch/sh/throbber22.gif" width="22" height="22" align="absmiddle" style="padding-right:5px;" /> We\'re saving '+minG+' as your location.'; 
			setTimeout(function(){closepop(a)},2E3)
	}
	else {
		var miniG = k+",UK"
		$.writeCookielet("STUB_BROWSE_SESS", "locCok",a);
		  $.writeCookielet("STUB_BROWSE_SESS", "locCok1",miniG);
		  var s_account="stubliztest";
			var i=s_gi("stubhub");i.linkTrackVars="prop10";i.prop10=k;i.tl(this,"o","Change Location");if(a!="0")l.style.fontWeight="bold";l.style.color="#2075C2";document.getElementById("loading").innerHTML='<img src="https://cache1.stubhubstatic.com/promotions/scratch/sh/throbber22.gif" width="22" height="22" align="absmiddle" style="padding-right:5px;" /> We\'re saving '+k+' as your location.'; 
			setTimeout(function(){closepop(a)},2E3)
	}
	};