jQuery.noConflict();

var BASEURI = jQuery("base").attr("href");

/* menu */
jQuery(function(){
	var animation = true;
	var menuTimeout = null;
	
	jQuery('div.web-sitenav-1 ul.level-1 li').mouseover(function(event){
		animation = false;
		jQuery(this).find('> a.label').addClass('web-linkhover');
		jQuery(this).find('> ul.level-2').stop().animate(
			{"top": "0px"}, 700, 'easeOutCubic'
		);
	}).mouseout(function(event){
		animation = true;
		jQuery(this).find('> a.label').removeClass('web-linkhover');
		jQuery(this).find('> ul.level-2').stop().animate(
			{"top": "-1000px"}, 1000, 'easeInCubic'
		);
	});
});

/* lights */
function a_lights(){
	var timeout = null;

	var hw = jQuery(window).height();
	var hb = jQuery(document).height();
	var light = null;
	
	getSize();
	light = jQuery('div.web-bottomlight');
	if(light){
		timeout = setTimeout(resizeBottomLight,1);
	}
	
	function getSize() {
		hw = jQuery(window).height();
		hb = jQuery(document).height();
	}
		
	function resizeBottomLight(){
		var pos = light.position();
		if(pos != null){
			var t = 125;
			if(jQuery.browser.msie){
				t = 121;
				if(jQuery.browser.version <= 7){
					t = 125;
				}
				if(hw > hb)
					t = 119;
			}
			light.height(t);
			pos = light.position();
			hb = jQuery(document).height();
			light.height(hb-(pos.top-t));
		}
	}
		
	jQuery(window).bind("resize", function(){
		getSize();
		if(jQuery.browser.msie){
			//clearTimeout(timeout);
			//light.height(500);
			timeout = setTimeout(resizeBottomLight,100);
		} else {
			resizeBottomLight();
		}
	});
}
jQuery(function(){
	a_lights()
});

/* search */
jQuery(function(){
	var sfield = jQuery("#ss-search");
	var sfield2 = jQuery("#ss-search2");
	var sfieldU = jQuery("#ss-search-url");
	if(( sfield || sfield2 )&& sfieldU && sfieldU.length > 0){
		if(sfield){
			sfield.keypress(function(event){
				var k = event.keyCode;
				if(k!=13) { return true; }
				a_search(sfield.val());
			});
			jQuery("div.web-search-button").click(function(event){
				a_search(sfield.val());
				
			});
		}
		if(sfield2){
			sfield2.keypress(function(event){
				var k = event.keyCode;
				if(k!=13) { return true; }
				a_search(sfield2.val());
			});
			jQuery("div.web-wheretobuy-btn-mini a").click(function(event){
				a_search(sfield2.val());
				return false;
			});
		}
	}
	
	function escapeTxt(os){
		var ns='';
		var t;
		var chr='';
		var cc='';
		var tn='';
		for(i=0;i<256;i++){
			tn=i.toString(16);
			if(tn.length<2) {
				tn="0"+tn;
			}
			cc+=tn;
			chr+=unescape('%'+tn);	
		}
		cc=cc.toUpperCase();
		os.replace(String.fromCharCode(13)+'',"%13");
		for(q=0;q<os.length;q++){
			t=os.substr(q,1);
			for(i=0;i<chr.length;i++){
				if(t==chr.substr(i,1)){
					t=t.replace(chr.substr(i,1),"%"+cc.substr(i*2,2));
					i=chr.length;
				}
			}
			ns+=t;
		}
		return ns;
	}

	function a_search(val){
		var vak = val;
		if(vak.length <= 3 || vak == jQuery('.search-tr').val()) { return false; }
		var url = sfieldU.val();
		window.location.href = BASEURI + (url+"/"+vak);
		return false;
	}

});


jQuery(function(){
	var sfield = jQuery("#wtb-search");
	var sfieldC = jQuery("#wtb-search-country");
	var sfieldU = jQuery("#wtb-search-url");
	var sfieldP = jQuery("#wtb-search-params");
	var geocoder = null;
	if(sfield && sfield.length > 0 && sfieldC && sfieldC.length > 0 && sfieldU && sfieldU.length > 0){
		geocoder = new google.maps.Geocoder();
		sfield.keypress(function(event){
			var k = event.keyCode;
			if(k!=13) { return true; }
			a_searchPlace();
		});
		
		jQuery(".web-wheretobuy-btn-mini").click(function(event){
			return a_searchPlace();
		});
	}
	
	function a_searchPlace(){
		if(geocoder != null) {
			var vak = sfield.val();
			if(vak.length <= 3) { return false; }
			var ciso = sfieldC.val();
			var url = sfieldU.val();
			var urlParams = sfieldP.val();
			geocoder.geocode( { 'address': vak+" "+ciso}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
		      	var lat = results[0].geometry.location.lat();
		      	var lon = results[0].geometry.location.lng();
		       if (urlParams && urlParams.length > 0) {                       
                        window.location.href = BASEURI + (url + "/" + lat + ";" + lon + urlParams)
                     }
                    	else {
                        window.location.href = BASEURI + (url + "/" + lat + ";" + lon)
                    	}
		      }
		    });
		}
		return false;
	}
});


jQuery(function(){

	jQuery(".web-single-product-compare span").click(function (){
		return false	
	})

	jQuery(".box-close").click(function(event){
		var menuid = jQuery(this).parent().attr("menuid");
		if(menuid != null){
			var menu = jQuery("li[menuid='menu-"+menuid+"']");
			if(menu != null){
				jQuery(menu).removeClass("web-menu-box-opened");
			}
		}
		if(jQuery.browser.msie && jQuery.browser.version > 7){
			jQuery(this).parent().hide();
			a_lights();
		} else {
			jQuery(this).parent().fadeOut(function(){
				a_lights();	
			});
		}
	});
	
	jQuery(".box-close-compare div").click(function(event){

		jQuery(this).parent().hide().parent().find('.web-single-product-compare').show();
		//var partnumber = jQuery(this).parent().removeClass("web-compare-full").find(".web-comp-partnumber").html();

		var partnumber = jQuery(this).parent().parent().parent().find(".web-single-product-pn").html();
		var cookComp = jQuery.cookie("g-" + jQuery('.web-content').attr('pg'));
		if(cookComp != null){
			var prods = jQuery.evalJSON(cookComp);
			if(prods!= null){
				var eles = jQuery.evalJSON(prods.eles);
				var pg = prods.pg;

				for (var i=0;i<eles.length;i++){
					if(eles[i].id == partnumber){
						eles[i] = null;
						eles.splice(i,1);
						prods = {'pg': pg, 'eles': eles};
						jQuery.cookie("g-" + jQuery('.web-content').attr('pg'), jQuery.toJSON(prods), { path: '/' });
					}
				}
				a_preloadCompareBox();
			}
		}		
		return false;
	});


	jQuery(".box-close-compare-top").click(function(event){
		
		//jQuery(this).hide().parent().find('.web-single-product-compare').show();
		var partnumber = jQuery(this).parent().removeClass("web-compare-full").find(".web-comp-partnumber").html();

		jQuery('.web-single-product').each(function() {
			if (jQuery(this).find('.web-single-product-pn').html() == partnumber)
			{
				jQuery(this).find('.web-single-product-compare').show();
				jQuery(this).find('.box-close-compare').hide();
			}
		})

		//var partnumber = jQuery(this).parent().find(".web-single-product-pn").html();
		var cookComp = jQuery.cookie("g-" + jQuery('.web-content').attr('pg'));
		if(cookComp != null){
			var prods = jQuery.evalJSON(cookComp);
			if(prods!= null){
				var eles = jQuery.evalJSON(prods.eles);
				var pg = prods.pg;
				for (var i=0;i<eles.length;i++){
					if(eles[i].id == partnumber){
						eles[i] = null;
						eles.splice(i,1);
						prods = {'pg': pg, 'eles': eles};
						jQuery.cookie("g-" + jQuery('.web-content').attr('pg'), jQuery.toJSON(prods), { path: '/' });
					}
				}
				a_preloadCompareBox();
			}
		}		
		return true;
	});
	
	jQuery(".web-menu-openbox").click(function(event){
		var boxid = jQuery(this).attr("boxid");
		var box = jQuery("div[menuid='"+boxid+"']");
		if(box != null){
			if(jQuery(this).hasClass("web-menu-box-opened")){
				jQuery(this).removeClass("web-menu-box-opened");
				jQuery(box).fadeOut(function(){
					a_lights();
				});
			} else {
				jQuery(this).addClass("web-menu-box-opened");
				jQuery(box).show();
				a_lights();
			}
		}
	});
	
});

function a_preloadCompareBox(openit){

	//var cookieName = "a-compare";

	var cookieName = "g-" + jQuery('.web-content').attr('pg');
	var cookComp = jQuery.cookie(cookieName);
	
	if(cookComp != null){
		//alert('c')
		var prods = jQuery.evalJSON(cookComp);
		//alert(prods)
		if(prods!= null && prods.pg == jQuery('.web-content').attr('pg')) {
			//alert('b')
			var eles = jQuery.evalJSON(prods.eles);
			for (var i=0;i<5;i++){
				a_setProduct(eles[i],i);

			}

			if(eles.length > 1 && eles.length < 6) {
				
				jQuery(".web-compare-btn").removeClass('locked');
				jQuery(".box-close-compare span a").css('cursor', 'pointer');
				
			} else {
				
				jQuery(".web-compare-btn").addClass('locked');	
				jQuery(".box-close-compare span a").css('cursor', 'default');
				

			}
			var lab = jQuery(".web-info-tools li[boxid='compare'], .web-compare-btn");
			if(lab != null){
				/*if(eles.length <= 0){
					lab.find(".web-counter").html("");
				} else {*/
					lab.find(".web-counter").html("("+eles.length+"/5)");
				//}
			}

			for (var i = 0; i <= eles.length; i++){
			if (eles[i] != null)
			{
				
				var cpn = eles[i].id;

				jQuery('.web-single-product').each(function () {
					var ppn = jQuery(this).find('.web-single-product-pn').html();
					if (ppn == cpn)
					{
						jQuery(this).find('.box-close-compare').show();
						jQuery(this).find('.web-single-product-compare').hide();
					}			
				})
			}	
			}
		}
		else
		{
			//alert('z')


				
				jQuery(".web-compare-btn").addClass('locked');	
				jQuery(".box-close-compare span a").css('cursor', 'default');
				
				jQuery(".web-counter").html("(0/5)");
			
				//var lab = jQuery(".web-info-tools li[boxid='compare'], .web-compare-btn");
				//if(lab != null){
					/*if(eles.length <= 0){
						lab.find(".web-counter").html("");
					} else {*/
						//lab.find(".web-counter").html(" (0)");
					//}
				//}
			var new_pg = jQuery('.web-content').attr('pg')
			var prods = {'pg': new_pg,'eles':[]};
			jQuery.cookie(cookieName, jQuery.toJSON(prods), { path: '/' });
		}
	} else {
		//alert('a')

		jQuery(".web-compare-btn").addClass('locked');	
				jQuery(".box-close-compare span a").css('cursor', 'default');
				
				jQuery(".web-counter").html("(0/5)");
		var prods = {'pg':'','eles':[]};
		jQuery.cookie(cookieName, jQuery.toJSON(prods), { path: '/' });
	}
	
	if(openit){
		var box = jQuery.find(".web-product-comparebox");
		var menuid = jQuery(box).attr("menuid");
		if(menuid != null){
			var menu = jQuery("li[menuid='menu-"+menuid+"']");
			if(menu != null){
				jQuery(menu).addClass("web-menu-box-opened");
			}
		}
		jQuery(box).show();
		a_lights();	
	}
	
	function a_setProduct(obj, i){
		var box = jQuery(".web-compare-single-product[pos='"+i+"']");
		if(box != null){
			if(obj != null){
				box.addClass("web-compare-full");
				box.find(".web-comp-name").html(obj.name);
				box.find(".web-comp-descr").html(obj.descr);
				box.find(".web-comp-partnumber").html(obj.id);
				//box.find(".web-comp-img").attr("src",obj.image);
			} else {
				box.removeClass("web-compare-full");
				box.find(".web-comp-name").html("");
				box.find(".web-comp-descr").html("");
				box.find(".web-comp-partnumber").html("");
				//box.find(".web-comp-img").attr("src","http://static.gateway.com/up/Static/shim.gif");
			}
		}
	}
}


function survey() {

var survey

if (!jQuery.cookie("g-survey"))
{
	//console.log("first time")
	jQuery.cookie("g-survey", "popup#0|counter#0|url#"+ window.location.href)
}
else
{

	survey = jQuery.cookie("g-survey")
	//console.log(survey)
	var sArr = new Array();
	//sArr = survey.split('=');
	//sArr = sArr[1].split('|');
	sArr = survey.split('|');

	var sUrl = sArr[2]
	sUrl = sUrl.substring(sUrl.indexOf('#') + 1)
	var sPopup = sArr[0]
	sPopup = sPopup.substring(sPopup.indexOf('#') + 1)
	var sCounter = sArr[1]

	sCounter = sCounter.substring(sCounter.indexOf('#') + 1)

	//console.log(sPopup);
	//console.log(sUrl);
	//console.log(sCounter);

	var random = 3
	var	showSurvey = false
	var showIn = 5
	var genRandom = Math.floor(Math.random()*(random + 1))



	if ( sPopup == 0)
	{
		//console.log(genRandom)
		if (genRandom == random )
			jQuery.cookie("g-survey", "popup#1|counter#" + (parseInt(sCounter) + 1) + "|url#"+ window.location.href)
			//console.log("selected")
		
		else
			jQuery.cookie("g-survey", "popup#-1|counter#0|url#"+ window.location.href)
			//console.log("segato")
		
	}
	
	if ( sPopup == 1)
	{
		//console.log("sPopup == 1")
		jQuery.cookie("g-survey", "popup#1|counter#" + (parseInt(sCounter) + 1) + "|url#"+ window.location.href)
		//console.log(jQuery.cookie("survey"))

		if (sCounter == showIn - 1)
		{
			showSurvey = true
			jQuery.cookie("g-survey", "popup#-1|counter#0|url#"+ window.location.href)
		}
	}

	if ( sPopup == -1)
	{
		//console.log("segato finche non chiudi il browser");
	}
	/*if ()
		survey = jQuery.cookie("survey", "url#"+ window.location.href +"|popup#-1|counter#0")
		*/
}
return showSurvey
}