var jkmegamenu={

showeffectduration: 200, //duration of animation, in milliseconds
hideeffectduration: 0, //duration of animation, in milliseconds
showtimer: 150, //delay after mouseout before menu should be hidden, in milliseconds
delaytimer: 100, //delay after mouseout before menu should be hidden, in milliseconds

//No need to edit beyond here
megamenulabels: [],
megamenus: [], //array to contain each block menu instances
zIndexVal: 1000, //starting z-index value for drop down menu
//$shimobj: null,

/*addshim:function($){
	$(document.body).append('<IFRAME id="outlineiframeshim" src="'+(location.protocol=="https:"? 'blank.htm' : 'about:blank')+'" style="display:none; background-color:transparent; left:0; top:0; z-index:999; position:absolute; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)" frameBorder="0" scrolling="no"></IFRAME>')
	this.$shimobj=$("#outlineiframeshim")
},*/

alignmenu:function($, e, megamenu_pos){
	var megamenu=this.megamenus[megamenu_pos]
	var $anchor=megamenu.$anchorobj
	var $menu=megamenu.$menuobj
	var menuleft=($(window).width()-(megamenu.offsetx-$(document).scrollLeft())>megamenu.actualwidth)? megamenu.offsetx : megamenu.offsetx-megamenu.actualwidth+megamenu.anchorwidth //get x coord of menu
	//var menutop=($(window).height()-(megamenu.offsety-$(document).scrollTop()+megamenu.anchorheight)>megamenu.actualheight)? megamenu.offsety+megamenu.anchorheight : megamenu.offsety-megamenu.actualheight
	var menutop=megamenu.offsety+megamenu.anchorheight  //get y coord of menu
	$menu.css({left:menuleft+"px", top:menutop+"px"})
	//this.$shimobj.css({width:megamenu.actualwidth+"px", height:megamenu.actualheight+"px", left:menuleft+"px", top:menutop+"px", display:"block"})
},

showmenu:function(e, megamenu_pos){
	//var objAnchor = document.all.getElementById(this.megamenulabels[megamenu_pos].toString().split(",")[0]);
	//alert(objAnchor);
	var megamenu=this.megamenus[megamenu_pos]
	var label = this.megamenulabels[megamenu_pos][0]
	var $anchor = megamenu.$anchorobj
	var $menu=megamenu.$menuobj
	var $menuinner=megamenu.$menuinner
	if ($menu.css("display")=="none"){
		this.alignmenu(jQuery, e, megamenu_pos)
		$menu.css("z-index", ++this.zIndexVal)
		
		//Set the back image for the incoming anchor on hover in the drop down
		$anchor.css({
			"background-position" : "0 -99px",
			"color" : "#fff",
			"background-image" : "url('http://images.medicinenet.com/images/medicinenet/header/mednet_nav_bg2.jpg')"
		});
		
		//When Tab has class on background-position is left 0 
		if ((label=='nav-images' || label=='nav-slide' || label=='nav-quiz' || label=='nav-medications' || label=='nav-disease') && $anchor.hasClass('on'))
			$anchor.css({
				"background-position" : "left 0px",
				"color" : "#000"
			});
	
		//If the incoming anchor has on state then unconditionally set the menu for it to on state as well
		if ($anchor.hasClass('on'))
			$menu.addClass('on');

		$menu.slideDown(this.showeffectduration, function(){
			$menuinner.css('visibility', 'visible')
		})
		
		/*$menu.show(this.effectduration, function(){
			$menuinner.css('visibility', 'visible')
		})*/

	}
	else if ($menu.css("display")=="block" && e.type=="click"){ //if menu is hidden and this is a "click" event (versus "mouseout")
		this.hidemenu(e, megamenu_pos)
	}
	return false
},

hidemenu:function(e, megamenu_pos){
	var megamenu=this.megamenus[megamenu_pos]
	var $menu=megamenu.$menuobj
	var $anchor = megamenu.$anchorobj		
	var $menuinner=megamenu.$menuinner
	$menuinner.css('visibility', 'hidden')
	//$anchor.css("background-image", "");
	//$anchor.css({'background-position':'0 -35px','color':'#111C46'});
	$anchor.removeAttr('style');
	$menu.hide(this.hideeffectduration);
	//$menu.slideUp(100);
  	if ($('.nav-images_fmt').hasClass('on'))
  		$('.nav-images_fmt').css({'background-position':'left 0','color':'#000'});
  	if ($('.nav-slide_fmt').hasClass('on'))
  		$('.nav-slide_fmt').css({'background-position':'left 0','color':'#000'});
	if ($('.nav-quiz_fmt').hasClass('on'))
	    $('.nav-quiz_fmt').css({ 'background-position': 'left 0', 'color': '#000' });
	if ($('.nav-medications_fmt').hasClass('on'))
	    $('.nav-medications_fmt').css({ 'background-position': 'left 0', 'color': '#000' });

  	//this.$shimobj.css({display:"none", left:0, top:0})
},

definemenu:function(anchorid, menuid, revealtype){
	this.megamenulabels.push([anchorid, menuid, revealtype])
},

render:function($){
	for (var i=0, labels=this.megamenulabels[i]; i<this.megamenulabels.length; i++, labels=this.megamenulabels[i]){
		if ($('#'+labels[0]).length!=1 || $('#'+labels[1]).length!=1) //if one of the two elements are NOT defined, exist
			return
		this.megamenus.push({$anchorobj:$("#"+labels[0]), $menuobj:$("#"+labels[1]), $menuinner:$("#"+labels[1]).children('ul:first-child'), revealtype:labels[2], hidetimer:null})
		var megamenu=this.megamenus[i]	
		megamenu.$anchorobj.add(megamenu.$menuobj).attr("_megamenupos", i+"pos") //remember index of this drop down menu
		megamenu.actualwidth=megamenu.$menuobj.outerWidth()
		megamenu.actualheight=megamenu.$menuobj.outerHeight()
		megamenu.offsetx=megamenu.$anchorobj.offset().left
		megamenu.offsety=megamenu.$anchorobj.offset().top
		megamenu.anchorwidth=megamenu.$anchorobj.outerWidth()
		megamenu.anchorheight=megamenu.$anchorobj.outerHeight()
		$(document.body).append(megamenu.$menuobj) //move drop down menu to end of document
		megamenu.$menuobj.css("z-index", ++this.zIndexVal).hide()
		megamenu.$menuinner.css("visibility", "hidden")
		megamenu.$anchorobj.bind(megamenu.revealtype=="click"? "click" : "mouseenter", function(e){
			var menuinfo = jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			clearTimeout(menuinfo.hidetimer); //cancel hide menu timer
			menuinfo.mouseOverTimer = setTimeout(function() { 
				jkmegamenu.showmenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
			}, jkmegamenu.showtimer);
		})
		/*megamenu.$anchorobj.bind(megamenu.revealtype=="click"? "click" : "mouseenter", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			clearTimeout(menuinfo.hidetimer) //cancel hide menu timer
			return jkmegamenu.showmenu(e, parseInt(this.getAttribute("_megamenupos")))
		})*/
		megamenu.$anchorobj.bind("mouseleave", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			clearTimeout(menuinfo.mouseOverTimer);
			if (e.relatedTarget!=menuinfo.$menuobj.get(0) && $(e.relatedTarget).parents("#"+menuinfo.$menuobj.get(0).id).length==0){ //check that mouse hasn't moved into menu object
				menuinfo.hidetimer=setTimeout(function(){ //add delay before showing menu
					jkmegamenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
				}, jkmegamenu.delaytimer)
			}
		})
		megamenu.$menuobj.bind("mouseenter", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			clearTimeout(menuinfo.hidetimer) //cancel hide menu timer
		})
		megamenu.$menuobj.bind("click mouseleave", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			clearTimeout(menuinfo.mouseOverTimer);
			menuinfo.hidetimer=setTimeout(function(){ //add delay before hiding menu
				jkmegamenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
			}, jkmegamenu.delaytimer)
		})
		
	} //end for loop
	
	if(/Safari/i.test(navigator.userAgent)){ //if Safari
		$(window).bind("resize load", function(){
			for (var i=0; i<jkmegamenu.megamenus.length; i++){
				var megamenu=jkmegamenu.megamenus[i]
				var $anchorisimg=(megamenu.$anchorobj.children().length==1 && megamenu.$anchorobj.children().eq(0).is('img'))? megamenu.$anchorobj.children().eq(0) : null
				if ($anchorisimg){ //if anchor is an image link, get offsets and dimensions of image itself, instead of parent A
					megamenu.offsetx=$anchorisimg.offset().left
					megamenu.offsety=$anchorisimg.offset().top
					megamenu.anchorwidth=$anchorisimg.width()
					megamenu.anchorheight=$anchorisimg.height()
				}
			}
		})
	}
	else{
		$(window).bind("resize", function(){
			for (var i=0; i<jkmegamenu.megamenus.length; i++){
				var megamenu=jkmegamenu.megamenus[i]	
				megamenu.offsetx=megamenu.$anchorobj.offset().left
				megamenu.offsety=megamenu.$anchorobj.offset().top
			}
		})
	}
	//jkmegamenu.addshim($)
}

}

jQuery(document).ready(function($){
	
	jkmegamenu.render($)
	
	$(".megamenuCloseBtn").bind("click", function () {
		$(this.parent).hide();		
	});
})