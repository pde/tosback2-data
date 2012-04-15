





(function($) {
	var site = window.site = function() {
		return {
			data : {
				active_sectionId : "",
				ratingImgSrc : "",
				cartTimer : null
			},
			func : {
				setUCartDisplay : function(){
					if($("#widget-but-ucart").attr("class") == "u-cart-hover"){
						$("#widget-but-ucart").mouseover(function(){
								cartTimer = setTimeout(function(){
									if($("#widget-ucart").css("display") != "block"){
										showBasket('show');
									}} 
								, 1000);	
						});
						$("#widget-but-ucart").mouseout(function(){
							clearTimeout(cartTimer);
						});
					}
					else if($("#widget-but-ucart").attr("class") == "u-cart-click"){
						$("#widget-but-ucart").attr("href","javascript:void(0)");
					
						$("#widget-but-ucart").click(function(){
							if($("#widget-ucart").css("display") != "block"){
								showBasket('show'); 
							}	
						});
					}
				},
				setActiveCategory : function() {
					
					
					if(site.data.active_sectionId){
						$("#top-nav li a").each(function(){
							var theLink = $(this).attr('href').split("?");
							var linkData = theLink[1];
							var linkDataArray = linkData.split("&");
							var parentCat = linkDataArray[0].split("=")[1];
							
							if(site.data.active_sectionId == parentCat){
								var activeState = $("img", this).attr('src').split("_off.gif")[0] + "_on.gif";
								$("img", this).unbind("mouseover.button").unbind("mouseout.button");
								$("img", this).attr('src', activeState);
						   }
						});
					}
				
				},
				refinementsToggle : function(){
					var isLeftNav = ($(".glo-left-nav-cont"))
					if(isLeftNav != null){
						$(".refinements .type a.refine-cat").toggle(function(elem){
							var currImage = $(this).css("background-image");
							newImage = currImage.split("plus")[0] + "minus" + currImage.split("plus")[1];
							
							$(this).css("background-image", newImage);
							$(this).parent().parent().children(".options").show("slow");
							elem.preventDefault();
						},
						function(elem){
							var currImage = $(this).css("background-image");
							newImage = currImage.split("minus")[0] + "plus" + currImage.split("minus")[1];
							
							$(this).css("background-image", newImage);
							$(this).parent().parent().children(".options").hide("slow");
							elem.preventDefault();
						});
						
						//Display the first refinement, when user first comes to page
						var optionsSelected = $(".refinements .applied").length;
						if(optionsSelected == 0){
							$(".refinements .type a.refine-cat").eq(0).trigger('click');
						}
						
						//Display selected refinements
						//$(".options .selected").parent().parent().children(".type").children(".refine-cat").trigger('click');
						$(".refinements .applied .type .refine-cat").trigger('click');
						
					}
				},
				buttonHover : function(){
					//for inputs
					$('input[type="image"]').add("img").each(function(){
						try {
							if($(this).attr('src').indexOf('_off.') != -1){
								var onPath = $(this).attr('src').split('_off.')[0] + '_on.' + $(this).attr('src').split('_off.')[1];
								var offPath = $(this).attr('src');
								var thisButton = this;
								
								new lib.obj.button ({
									off: offPath,
							       hover: onPath,
							       hasHover: true,
							       buttonSelector: thisButton
								});
							}
						}
						catch(ex){
						}
					});
				},
				ratingHover : function(){
					var bvTimer;
					$(".bvImage").each(function(i){
						$(this).hover(
							function(){
								clearTimeout(bvTimer);
								var currSrc = $(this).attr('src');
								var onSrc = "";
								var offSrc = "";
								
								//if moving to the off state image (to the right)
								if(currSrc.indexOf('empty') != -1){
									onSrc = currSrc.split('empty')[0] + 'filled' + currSrc.split('empty')[1];
									offSrc = $(this).attr('src');
								}
								//if moving to the on state image (to the left)
								else {
									onSrc = $(this).attr('src');
									offSrc = currSrc.split('filled')[0] + 'empty' + currSrc.split('filled')[1];
								}
								//for ie6
								if(lib.utils.isIE6()){
									onSrc = site.data.ratingImgSrc.split('empty')[0] + 'filled' + site.data.ratingImgSrc.split('empty')[1];
									offSrc = site.data.ratingImgSrc;
								}
								
								$(".bvImage:lt("+i+")").add(this).attr('src', onSrc);
								$(".bvImage:gt("+i+")").attr('src', offSrc);
								
							},
							function(){
								bvTimer = setTimeout(function() {
									var currSrc = $(".bvImage").eq(i).attr('src');
									
									if(currSrc.indexOf('filled') != -1){
										var offSrc = currSrc.split('filled')[0] + 'empty' + currSrc.split('filled')[1];
										$(".bvImage").attr('src', offSrc);
									}
									
									//for ie6
									if(lib.utils.isIE6()){
										var offSrc = site.data.ratingImgSrc;
										$(".bvImage").attr('src', offSrc);
									}
									
									
								}, 250);
								
								
							}
						);
					});
					
				}
				
				
			},
			obj : {
				
			},
			siteFont : {
				initializeFontSize : function(c_name){
					var font_size = this.getCookie(c_name);
					if (font_size != "null"){
						$("body").css("font-size", font_size+"%");
					}
					else {
						$("body").css("font-size", "62.5%");
					}
					if (font_size == "62.5"){
						elem = $("#global-font-changer a").eq(0);
					}
					else if (font_size == "75"){
						elem = $("#global-font-changer a").eq(1);
					}
					else if (font_size == "87.5"){
						elem = $("#global-font-changer a").eq(2);
					}
					else if (font_size == "112.5"){
						elem = $("#global-font-changer a").eq(3);
					}
					else {
						elem = $("#global-font-changer a").eq(0);
					}
					
					this.setToCurrent(elem);
					
					$("#global-font-changer a").click(function(evt){
						site.siteFont.setFontSize(this);
						evt.preventDefault();
					});	
				},
				
				setFontSize : function(elem){
					if($(elem).attr("class").indexOf("1") != -1){
						size = 62.5;	/* sets font to em% equivalent of 10px */
					}
					else if($(elem).attr("class").indexOf("2") != -1){
						size = 75;		/* sets font to em% equivalent of 12px */
					}
					else if($(elem).attr("class").indexOf("3") != -1){
						size = 87.5;	/* sets font to em% equivalent of 14px */
					}
					else if($(elem).attr("class").indexOf("4") != -1){
						size = 112.5;		/* sets font to em% equivalent of 18px */
					}
					else{
						size = 62.5;	/* defaults to 10px */
					}
					
					this.setToCurrent($(elem));
					
					/* set the cookie and let it expires in 30 days */
					this.setCookie("FONT_SIZE", size);	
					
					$("body").css("font-size", size+"%");
				},
			
				setToCurrent : function(elem){
					/* remove current from all other classes */
					$(elem).parent().children("a").each(function(i){
						i++;
						$(this).attr("class", "size" + i);
					});
					
					/* add current to the span that was clicked */
					currClass = $(elem).attr("class") + " current";
					$(elem).attr("class", currClass);	
				},
				
				setCookie : function(c_name, value, expireDays){
					var exDate = new Date();
					exDate.setDate(exDate.getDate() + expireDays);
					document.cookie = c_name + "=" + escape(value) + ";path=/" + ((expireDays==null) ? "" : ";expires=" + exDate.toGMTString());
				},
				getCookie : function(c_name){
					if (document.cookie.length>0){
						c_start=document.cookie.indexOf(c_name + "=");
						if (c_start!=-1){ 
							c_start=c_start + c_name.length+1; 
							c_end=document.cookie.indexOf(";",c_start);
								if (c_end==-1){
									c_end=document.cookie.length;
								}
								return unescape(document.cookie.substring(c_start,c_end));
						} 
						return "null";
					}
				}
			}
			
			
			
		};
	}($)
})($);

// on body load
$(function() {

	// Setup any forms
	lib.func.formSetup();
	
	//Setup global font size
	site.siteFont.initializeFontSize("FONT_SIZE");
	
	//global image hover states 
	site.func.buttonHover();
	
	// for universal cart display
	site.func.setUCartDisplay();
    	
	//display the active category
	site.func.setActiveCategory();
	
	//Leftnav refinements
	site.func.refinementsToggle();
	
	//bazaarvoice rating for leftnav
	site.func.ratingHover();

    $("#widget-ucart").stop(false, true).animate({"marginTop": ($(window).scrollTop() + 30) + "px"}, "slow" );

    $(window).scroll(function(){
        var headerPos  = $('#header-wrapper .shoppingCartWrap').position(),
            headerHeight = $('#header-wrapper .shoppingCartWrap').height(),
            windowScroll = $(window).scrollTop();

        if((headerPos.top + headerHeight) < windowScroll){
            $("#widget-ucart").stop(false, true).animate({"top": (windowScroll + 5)}, "slow" );
        }else{
            $("#widget-ucart").stop(false, true).animate({"top": (headerPos.top + headerHeight)}, "slow" );
        }          
    });


});
