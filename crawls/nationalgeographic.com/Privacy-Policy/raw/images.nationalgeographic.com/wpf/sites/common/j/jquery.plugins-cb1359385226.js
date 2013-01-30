
// Dynamic Lead Code

    $.fn.dynamiclead = function(vars) {
        
        var slideArray;               
		if (vars.slideArray !== undefined){
			slideArray = vars.slideArray;
		}
        var wrapper                 = this;
        var timeOut                 = (vars.timeOut !== undefined) ? vars.timeOut : 7000;
        var pause                   = false;
        var pagination              = (vars.pagination) ? vars.pagination : true;
        var SlideFade               = (vars.SlideFade) ? vars.SlideFade : "slow";
        var current                 = null;
        var timeOutFn               = null;
        // var wrapper              = jQuery(element[0].selector.text);
        // Boolean for whether this is a Mo'orea DL
        var mooreaDL                = wrapper.parent().hasClass('moorea_dl');
        var slideDiv                = '<div></div>\n';
        
        //set up structure
        $('li', wrapper).addClass('show');
        if (mooreaDL) {
            slideDiv = '<div class="moorea_text"></div>\n';
        } else {
            wrapper.css('position', 'relative');
        }
        
        for(var i=0; i<slideArray.length; i++) {
            wrapper
                .append('<li></li>\n')
                .find('li:last')
                .append('<a href="'+ slideArray[i]['link'] +'"><img src="" alt="'+ slideArray[i]['headline'] +'" /></a>\n')
                .append(slideDiv);
            if(slideArray[i]['headline']) {
                if (mooreaDL) {
                    wrapper.find('li:last div').append('\n<h4><a href="'+ slideArray[i]['link'] +'">'+ slideArray[i]['headline'] +'</a></h4>\n');
                } else {
                    wrapper.find('li:last div').append('\n<h4>'+ slideArray[i]['headline'] +'</h4>\n');
                }
            }
             if(slideArray[i]['caption']) {
				if(!slideArray[i]['link_text']){
				    if (mooreaDL) {
                        wrapper.find('li:last div').append('<p>'+ slideArray[i]['caption'] +'\n<span><a href="'+ slideArray[i]['link'] +'">More &raquo;</a></span></p>\n');} else {
                        wrapper.find('li:last div').append('<p>'+ slideArray[i]['caption'] +'</p>\n<p class="action"><a href="'+ slideArray[i]['link'] +'">More &raquo;</a></p>\n');
                    }
				} else {
				    if (mooreaDL) {
					    wrapper.find('li:last div').append('<p>'+ slideArray[i]['caption'] +'\n<span><a href="'+ slideArray[i]['link'] +'">' + slideArray[i]['link_text'] + ' &raquo;</a></span></p>\n');
					} else {
					    wrapper.find('li:last div').append('<p>'+ slideArray[i]['caption'] +'</p>\n<p class="action"><a href="'+ slideArray[i]['link'] +'">' + slideArray[i]['link_text'] + ' &raquo;</a></p>\n');
					}
				}
             } else {
                 //the div must exist for the animation to fire correctly.
                 if (!mooreaDL) {
                     wrapper.find('li:last div').css('padding','0px').css('height','0px');
                 }
             }
        }//end for
        
        // stack the slides on top of each other
        wrapper.find('li').css({ "left":"0", "top":"0", "position":"absolute" });
        
        $("li:not(:first)", this).css('display', 'none');
        //now that structure is in place grab the elements
        var items = $("li", this);
                
        //preload 2nd slide (if it's there)
        if(slideArray[0]) {
            wrapper.find('li:eq(1) img').attr("src", slideArray[0]['url']).load(function(){
                wrapper.find('li:eq(1)').addClass("next").css('display', 'block');
            });
        }

        //Set up slideSelect to load. Not needed if JS is not on.
        if(pagination) {
            //hack to force proper width in the DL navigation, taking it
            //from the ul medium / large / small dl display custom sizes
            var proper_width = wrapper.parent().find('ul').css('width');
            if (!mooreaDL) {
                wrapper.parent().parent().css('width', proper_width);
            }

            var pager = "<ul class=\"nav dl_navigation\">\n";
            if (mooreaDL) {
                pager += '<div class="moorea_pointer"><div class="moorea_triangle"></div><div class="moorea_rectangle"></div></div>';
            }
            pager += "<li class=\"prev\"><a class=\"hiddenText\" href=\"#\">Prev</a></li>";
            pager += "</ul>\n";
            wrapper.after(pager);
            var slideSelect = wrapper.parent().find('ul.dl_navigation');
            var i = 0;
            if (mooreaDL) {
                slideSelect.append('<li class="moorea_thumb" style="background: url(' + wrapper.find('li:eq(0)').attr('data-thumb') + ') no-repeat;"><a href="#">1</a></li>\n');
                for (i = 0; i < items.length - 1; i++) {
                    slideSelect.append('<li class="moorea_thumb" style="background: url(' + slideArray[i]['thumb'] + ') no-repeat;"><a href="#">'+(i+2)+'</a></li>\n');
                }
            } else {
                for (i = 0; i < items.length; i++) {
                    slideSelect.append('<li><a href="#">'+(i+1)+'</a></li>\n');
                }
            }
            
            slideSelect.append("<li class=\"next\"><a class=\"hiddenText\" href=\"#\">Next</a></li><li class=\"pause\"><a class=\"hiddenText\" href=\"#\">Pause</a></li>\n");
            
        }
        var playToggle = $('ul.dl_navigation li:last');
        wrapper.parent().find('ul.dl_navigation li:eq(1)').addClass("selected");
        
        //go to href around image
        items.click(function() {
            if (!mooreaDL) {
                location.href = jQuery(this).find("a").attr('href');
            }
        });//end onClick
        
        //play or pause button
        playToggle.click(function(){ 
            if(jQuery(this).hasClass('pause')) { //pause the animation
                $(this).removeClass("pause").addClass("play");
                $('a', this).text('Play');
                pause = true;
                window.clearTimeout(timeOutFn);
                return false;
            } else { //start animation
                $(this).addClass("pause").removeClass("play");
                $('a', this).text('Pause');
                window.clearTimeout(timeOutFn); //clear timout just to be careful
                pause = false;
                showSlide();
                return false;
            }
            
        });//end onClick
        
        //go to a specific slide
        wrapper.parent().find('ul.dl_navigation li a').slice(1,-2).click(function (e) {
            e.preventDefault();
            current = $(this).text()-1;
            
            $('ul.dl_navigation li.selected').removeClass('selected');
            $('ul.dl_navigation li:eq('+(current+1)+')').addClass("selected");
            
            if ($("li:eq("+current+") img", wrapper).attr("src") === '') {
                $("li:eq("+current+") img", wrapper).attr("src", slideArray[(current-1)]['url']).load(function(){
                    $('li.show', wrapper).removeClass('show');
                    wrapper.find("li:eq("+current+")").addClass('show').css('display', 'block');
                    $('li.next', wrapper).removeClass('next');
                });
            
            } else {
                
            $("li:eq("+current+") img", wrapper).load(function(){
                $('li.show', wrapper).removeClass('show');
                wrapper.find("li:eq("+current+")").addClass('show').css('display', 'block');
                $('li.next', wrapper).removeClass('next');
            });
            $('li.show', wrapper).removeClass('show');
            wrapper.find("li:eq("+current+")").addClass('show').css('display', 'block');
            $('li.next', wrapper).removeClass('next');
            }
            // Moves the pointer/border div behind the correct button
            if (mooreaDL) {
                $(".moorea_pointer").animate({'left': current * ($('.moorea_thumb:eq(0)').width() + parseInt($('.moorea_thumb:eq(0)').css('margin-left')) + parseInt($('.moorea_thumb:eq(0)').css('margin-right'))) + 'px'});
            }
            
            if(playToggle.hasClass('pause')) {
                playToggle.removeClass("pause").addClass("play");
                $('a', playToggle).text('Play');
                //return false;
            }
            
            if (current == (slideArray.length-1)) {
                wrapper
                    .find('li:eq(0)')
                    .addClass('next')
                    .css('display', 'block');
            }
            else {
                wrapper
                    .find('li:eq('+(current+1)+')')
                    .addClass('next')
                    .css('display', 'block');
            }

            window.clearTimeout(timeOutFn);
            //return false;
        });//end onClick
        
        //go to previous slide
        wrapper.parent().find('ul.dl_navigation li .prev a').click(function(){
            current = current+1;
            pageSelect(current, wrapper);
            window.clearTimeout(timeOutFn);
            return false;
        });//end onClick
        
        //go to next slide
        wrapper.parent().find('ul.dl_navigation li .next a').click(function(){
            current = current-1;
            pageSelect(current, wrapper);
            window.clearTimeout(timeOutFn);
            return false;
        });
    
        function showSlide() {
            if (playToggle.hasClass('pause')) {
            current = (current !== null) ? current : 0;
            current = (current == slideArray.length+1) ? 0 : current; //if you are 1 past the last slide go back to beginning
            var thisSlide = wrapper.find('li:eq('+current+')');
            if(thisSlide.next().find('img').attr("src") == '') { 
                thisSlide.next().find('img').attr("src", slideArray[(current)]['url']).load(function(){
                    // Moves the pointer/border div behind the correct button
                    if (mooreaDL) {
                        if (current == slideArray.length) {
                            $(".moorea_pointer").animate({'left': '0'});
                        } else {
                            $(".moorea_pointer").animate({'left': (current + 1) * ($('.moorea_thumb:eq(0)').width() + parseInt($('.moorea_thumb:eq(0)').css('margin-left')) + parseInt($('.moorea_thumb:eq(0)').css('margin-right'))) + 'px'});
                        }
                    }
                    thisSlide.fadeOut(SlideFade, function(){
                        
                    wrapper.parent().find('ul.dl_navigation .selected').removeClass("selected");
                    wrapper.parent().find('ul.dl_navigation li:eq('+(current+2)+')').addClass("selected");
                    
                    thisSlide.removeClass('show');

                    current++; //get ready for next slide
                    
                    // You're on the last slide, prep for transition back to the first
                    if (current == (slideArray.length+1)) { 
                        wrapper
                            .find('li:eq(0)')
                            .removeClass('next')
                            .addClass('show')
                            .css('display', 'block')
                            .end()
                            .find('li:eq(1)')
                            .addClass('next')
                            .css('display', 'block');
                            
                        wrapper
                            .parent()
                            .find('ul.dl_navigation li:eq(1)')
                            .addClass("selected");
                    } 
                    // You're on the next to last slide, prep for transition to the last
                    else if(current == (slideArray.length)) {
                        wrapper
                            .find('li:eq('+(current)+')')
                            .removeClass('next')
                            .addClass('show')
                            .css('display', 'block')
                            .end()
                            .find('li:eq(0)')
                            .addClass('next')
                            .css('display', 'block'); 
                    } 
                    else { 
                        wrapper
                            .find('li:eq('+(current)+')')
                            .removeClass('next')
                            .addClass('show')
                            .css('display', 'block')
                            .end()
                            .find('li:eq('+(current+1)+')')
                            .addClass('next')
                            .css('display', 'block');  
                    }
                    if(!pause) {
                        timeOutFn = setTimeout(showSlide, timeOut);
                    }
            });
                }); 
            } else {
                    // Moves the pointer/border div behind the correct button
                    if (mooreaDL) {
                        if (current == slideArray.length) {
                            $(".moorea_pointer").animate({'left': '0'});
                        } else {
                            $(".moorea_pointer").animate({'left': (current + 1) * ($('.moorea_thumb:eq(0)').width() + parseInt($('.moorea_thumb:eq(0)').css('margin-left')) + parseInt($('.moorea_thumb:eq(0)').css('margin-right'))) + 'px'});
                        }
                    }
                    thisSlide.fadeOut(SlideFade, function(){
                        
                    wrapper.parent().find('ul.dl_navigation .selected').removeClass("selected");
                    wrapper.parent().find('ul.dl_navigation li:eq('+(current+2)+')').addClass("selected");
                    
                    thisSlide.removeClass('show');

                    current++; //get ready for next slide
                    
                    // You're on the last slide, prep for transition back to the first
                    if (current == (slideArray.length+1)) { 
                        wrapper
                            .find('li:eq(0)')
                            .removeClass('next')
                            .addClass('show')
                            .css('display', 'block')
                            .end()
                            .find('li:eq(1)')
                            .addClass('next')
                            .css('display', 'block');
                            
                        wrapper
                            .parent()
                            .find('ul.dl_navigation li:eq(1)')
                            .addClass("selected");
                    } 
                    // You're on the next to last slide, prep for transition to the last
                    else if(current == (slideArray.length)) {
                        wrapper
                            .find('li:eq('+(current)+')')
                            .removeClass('next')
                            .addClass('show')
                            .css('display', 'block')
                            .end()
                            .find('li:eq(0)')
                            .addClass('next')
                            .css('display', 'block'); 
                    } 
                    else { 
                        wrapper
                            .find('li:eq('+(current)+')')
                            .removeClass('next')
                            .addClass('show')
                            .css('display', 'block')
                            .end()
                            .find('li:eq('+(current+1)+')')
                            .addClass('next')
                            .css('display', 'block');  
                    }
                    if(!pause) {
                        timeOutFn = setTimeout(showSlide, timeOut);
                    }
            });
        }
        }
        }//end showSlide()
        timeOutFn = setTimeout(showSlide, timeOut);
    };//end dynamiclead

/** 
#  * Columnizer 
#  * Copyright (c) 2008 Pasyuk Sergey (www.codeasily.com) 
#  * Licensed under the MIT License: 
#  * http://www.opensource.org/licenses/mit-license.php 
#  *  
#  * Splits a <ul>/<ol>-list into equal-sized columns. 
#  *  
#  * Requirements:  
#  * <ul> 
#  * <li>"ul" or "ol" element must be styled with margin</li> 
#  * </ul> 
#  *  
#  * @see http://www.codeasily.com/jquery/multi-column-list-with-jquery 
#  */  

jQuery.fn.columns=function(settings){settings=jQuery.extend({cols:3,colWidth:0,equalHeight:false,startN:1},settings);if(jQuery('> li',this)){this.each(function(y){var y=jQuery('.li_container').size(),height=0,maxHeight=0,t=jQuery(this),classN=t.attr('class'),listsize=jQuery('> li',this).size(),percol=Math.ceil(listsize/settings.cols),contW=t.width(),bl=(isNaN(parseInt(t.css('borderLeftWidth'),10))?0:parseInt(t.css('borderLeftWidth'),10)),br=(isNaN(parseInt(t.css('borderRightWidth'),10))?0:parseInt(t.css('borderRightWidth'),10)),pl=parseInt(t.css('paddingLeft'),10),pr=parseInt(t.css('paddingRight'),10),ml=parseInt(t.css('marginLeft'),10),mr=parseInt(t.css('marginRight'),10),col_Width=Math.floor((contW-(settings.cols-1)*(bl+br+pl+pr+ml+mr))/settings.cols);if(settings.colWidth){col_Width=settings.colWidth}var colnum=1,percol2=percol;jQuery(this).addClass('li_cont1').wrap('<div id="li_container'+(++y)+'" class="li_container"></div>');if(settings.equalHeight=='li'){jQuery('> li',this).each(function(){var e=jQuery(this);var border_top=(isNaN(parseInt(e.css('borderTopWidth'),10))?0:parseInt(e.css('borderTopWidth'),10));var border_bottom=(isNaN(parseInt(e.css('borderBottomWidth'),10))?0:parseInt(e.css('borderBottomWidth'),10));height=e.height()+parseInt(e.css('paddingTop'),10)+parseInt(e.css('paddingBottom'),10)+border_top+border_bottom;maxHeight=(height>maxHeight)?height:maxHeight})}for(var i=0;i<=listsize;i++){if(i>=percol2){percol2+=percol;colnum++}var eh=jQuery('> li:eq('+i+')',this);eh.addClass('li_col'+colnum);if(jQuery(this).is('ol')){eh.attr('value',''+(i+settings.startN))+''}if(settings.equalHeight=='li'){var border_top=(isNaN(parseInt(eh.css('borderTopWidth'),10))?0:parseInt(eh.css('borderTopWidth'),10));var border_bottom=(isNaN(parseInt(eh.css('borderBottomWidth'),10))?0:parseInt(eh.css('borderBottomWidth'),10));mh=maxHeight-(parseInt(eh.css('paddingTop'),10)+parseInt(eh.css('paddingBottom'),10)+border_top+border_bottom);eh.height(mh)}}jQuery(this).css({cssFloat:'left',width:''+col_Width+'px'});for(colnum=2;colnum<=settings.cols;colnum++){if(jQuery(this).is('ol')){jQuery('li.li_col'+colnum,this).appendTo('#li_container'+y).wrapAll('<ol class="li_cont'+colnum+' '+classN+'" style="float:left; width: '+col_Width+'px;"></ol>')}else{jQuery('li.li_col'+colnum,this).appendTo('#li_container'+y).wrapAll('<ul class="li_cont'+colnum+' '+classN+'" style="float:left; width: '+col_Width+'px;"></ul>')}}if(settings.equalHeight=='ul'||settings.equalHeight=='ol'){for(colnum=1;colnum<=settings.cols;colnum++){jQuery('#li_container'+y+' .li_cont'+colnum).each(function(){var e=jQuery(this);var border_top=(isNaN(parseInt(e.css('borderTopWidth'),10))?0:parseInt(e.css('borderTopWidth'),10));var border_bottom=(isNaN(parseInt(e.css('borderBottomWidth'),10))?0:parseInt(e.css('borderBottomWidth'),10));height=e.height()+parseInt(e.css('paddingTop'),10)+parseInt(e.css('paddingBottom'),10)+border_top+border_bottom;maxHeight=(height>maxHeight)?height:maxHeight})}for(colnum=1;colnum<=settings.cols;colnum++){var eh=jQuery('#li_container'+y+' .li_cont'+colnum);var border_top=(isNaN(parseInt(eh.css('borderTopWidth'),10))?0:parseInt(eh.css('borderTopWidth'),10));var border_bottom=(isNaN(parseInt(eh.css('borderBottomWidth'),10))?0:parseInt(eh.css('borderBottomWidth'),10));mh=maxHeight-(parseInt(eh.css('paddingTop'),10)+parseInt(eh.css('paddingBottom'),10)+border_top+border_bottom);eh.height(mh)}}jQuery('#li_container'+y).append('<div style="clear:both; overflow:hidden; height:0px;"></div>')})}}

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

// Video Player Popup

<!-- //
	function videoPlayer (in_path) {
		
		var v1Dimensions = "height=630, width=917";
		var v2Dimensions = "height=662, width=991";
		var playerDimensions = v2Dimensions; // default
		
		//if the file matches the kids player v1 path then use the v1 dimensions
//	if 	((in_path.indexOf('/video/player/animals.html') == 0)||
//			(in_path.indexOf('/video/player/environment.html') == 0)||
//			(in_path.indexOf('/video/player/featured-videos.html') == 0)||
//			(in_path.indexOf('/video/player/kids.html') == 0)||
//			(in_path.indexOf('/video/player/people-and-places.html') == 0)||
//			(in_path.indexOf('/video/player/world-music.html') == 0)){
	
		//if (in_path.indexOf('/video/player/kids.html')>-1){
		//	playerDimensions = v1Dimensions;
		//}
		
		var ngvideoplayer = window.open (	in_path, 
																			'ngvideoplayer', 
																			playerDimensions + ', toolbar=no, location=no, ' + 
																			'directories=no, status=yes, menubar=no, resizable=yes, scrollbars=no');

		if (ngvideoplayer)
			var popUpsBlocked = false
		else
			var popUpsBlocked = true
	
		if (popUpsBlocked)
			alert('In order to display the video player, please adjust your browser settings\nto allow for pop-up windows from nationalgeographic.com.');

		if (window.focus) { ngvideoplayer.focus() }
	}

// code added in support of WEBDEV-411

function embedSingleTitlePlayer(vid, siteid, adtag, videoWidth, videoHeight, autoplay, playerdivid){
	if(videoWidth == undefined) var videoWidth = 486;
	if(videoHeight == undefined) var videoHeight = 412;
	if(autoplay == undefined) var autoplay = false;
	if(adtag == undefined) var adtag = "http://ad.doubleclick.net/pfadx/ng.videoplayer/default;sz=400x300;tile=1";
	if(playerdivid == undefined) playerdivid = "single_title_player";
	
	var srcURL = "http://video.nationalgeographic.com/video/player/flash/single-title/cdn-player/single-title-player.swf";
	if(siteid == "singletitlekids" || siteid == "blogskids"){
		srcURL = "http://video.nationalgeographic.com/video/player/flash/single-title/cdn-player/single-title-player-kids.swf";
		videoHeight = Number(videoHeight)+66;
	}
	else if(siteid == "greeneffectmain"){
		srcURL = "http://ngm.nationalgeographic.com/greenguide/swf/green-effect-player.swf";
	}

	ngsEmbed.flash({ 	
	src: srcURL, 
	width: videoWidth,
	height: videoHeight,
	scale: "noscale",
	flashvars:"vid="+vid+"&siteid="+siteid+"&autoplay="+autoplay+"&adtag="+adtag,
	version:"9",
	wmode:"opaque"
	}, playerdivid);
}

function getUrlParameter( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

//NGS embed code

if(window.NGS==undefined){
var NGS={};
// } //jgo 090205
var ngsEmbed={version:"1.0.0",embed:"",flash:function(_262,_263,_264){
this.embed=new NGS.Flash(_262);
this.embed.write(_263,_264);
},quicktime:function(_265,_266){
this.embed=new NGS.Quicktime(_265);
this.embed.write(_266);
}};
NGS.AbstractPlugin=function(){
return true;
};
NGS.AbstractPlugin.prototype={embedObject:"",config:"",cName:"undefined",targetDiv:"null",write:function(d,cl){
this.cName=cl;
if(!this.embedObject){
this.embedObject=this.getEmbed();
}
this.embedObject.write(this.config,d);
if(this.cName!=undefined&&this.cName!="undefined"){
this.targetDiv=d;
NGS.onload(Delegate.create(this,this.changeClass));
}
},getEmbed:function(){
NGS.ErrorMsg("'getEmbed' method must be overriden");
},detect:function(){
NGS.ErrorMsg("'detect' method must be overriden");
},getConfig:function(){
return this.config;
},changeClass:function(){
NGS.changeStyleClass(this.cName,this.targetDiv);
}};
NGS.Flash=function(c){
this.config=c;
return true;
};
NGS.Flash.prototype=new NGS.AbstractPlugin();
NGS.Flash.prototype.getEmbed=function(){
return new NGS.UfoWrapper();
};
NGS.Flash.prototype.detect=function(){
};
NGS.ErrorMsg=function(msg){
throw ("NGS ERROR: "+msg);
};
NGS.AbstractFlash=function(){
return true;
};
NGS.AbstractFlash.prototype={_required:["src","width","height","version","build"],_optional:["id","name","align","swliveconnect","play","loop","menu","quality","scale","salign","wmode","bgcolor","base","flashvars","devicefont","allowscriptaccess","seamlesstabbing","allowfullscreen","expressInstall"],initRequired:function(c){
var _26c=this._required.length;
for(var i=0;i<_26c;i++){
if(typeof c[this._required[i]]=="undefined"){
if(this._required[i]=="build"){
c[this._required[i]]="0";
}else{
NGS.ErrorMsg("Required parameter '"+this._required[i]+"' not found");
}
}
}
return c;
},initOptional:function(c){
if(typeof c["allowfullscreen"]=="undefined"){
c["allowfullscreen"]="true";
}
return c;
},write:function(){
NGS.ErrorMsg("'write' method must be overriden");
},detect:function(){
NGS.ErrorMsg("'detect' method must be overriden");
},optional:function(){
return this._optional;
},required:function(){
return this._required;
}};
NGS.UfoWrapper=function(){
this.typename="ufo wrapper";
return true;
};
NGS.UfoWrapper.prototype=new NGS.AbstractFlash();
NGS.UfoWrapper.prototype.write=function(_26f,div){
_26f=this.initRequired(_26f);
_26f=this.initOptional(_26f);
var FO={movie:_26f.src,width:_26f.width,height:_26f.height,majorversion:_26f.version,build:_26f.build};
var _272=this.optional();
var _273=_272.length;
for(var i=0;i<_273;i++){
if(typeof _26f[_272[i]]!="undefined"){
FO[_272[i]]=_26f[_272[i]];
}
}
UFO.create(FO,div);
};
/*********************************************************/
				

/*	Unobtrusive Flash Objects (UFO) v3.12 <http://www.bobbyvandersluis.com/ufo/>
	Copyright 2005, 2006 Bobby van der Sluis
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

var UFO={requiredAttrParams:["movie","width","height","majorversion","build"],optionalAttrEmb:["name","swliveconnect","align"],optionalAttrObj:["id","align"],optionalAttrParams:["play","loop","menu","quality","scale","salign","wmode","bgcolor","base","flashvars","devicefont","allowscriptaccess","seamlesstabbing","allowfullscreen"],ximovie:"ufo.swf",xiwidth:"215",xiheight:"138",is_w3cdom:(typeof document.getElementById!="undefined"&&typeof document.getElementsByTagName!="undefined"&&(typeof document.createElement!="undefined"||typeof document.createElementNS!="undefined")),is_ie:(navigator.userAgent.toLowerCase().indexOf("msie")!=-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1),is_safari:(navigator.userAgent.toLowerCase().indexOf("safari")!=-1),is_win:(navigator.userAgent.toLowerCase().indexOf("win")!=-1),is_mac:(navigator.userAgent.toLowerCase().indexOf("mac")!=-1),is_XML:(typeof document.contentType!="undefined"&&document.contentType.indexOf("xml")>-1),foList:[],create:function(FO,id){
if(!UFO.is_w3cdom){
return;
}
UFO.foList[id]=UFO.updateFO(FO);
UFO.createStyleRule("#"+id,"visibility:hidden;");
UFO.domLoad(id);
},updateFO:function(FO){
if(typeof FO.xi!="undefined"&&FO.xi=="true"){
if(typeof FO.ximovie=="undefined"){
FO.ximovie=UFO.ximovie;
}
if(typeof FO.xiwidth=="undefined"){
FO.xiwidth=UFO.xiwidth;
}
if(typeof FO.xiheight=="undefined"){
FO.xiheight=UFO.xiheight;
}
}else{
FO.xi=false;
}
FO.domLoaded=false;
return FO;
},domLoad:function(id){
var _279=setInterval(function(){
if((document.getElementsByTagName("body")[0]!=null||document.body!=null)&&document.getElementById(id)!=null){
UFO.main(id);
clearInterval(_279);
}
},250);
if(typeof document.addEventListener!="undefined"){
document.addEventListener("DOMContentLoaded",function(){
UFO.main(id);
clearInterval(_279);
},null);
}
},main:function(id){
if(document.getElementById(id)){
var FO=UFO.foList[id];
if(FO.domLoaded){
return;
}
UFO.foList[id].domLoaded=true;
document.getElementById(id).style.visibility="hidden";
if(UFO.hasRequiredAttrParams(id)){
if(UFO.hasFlashVersion(FO.majorversion,FO.build)){
if(typeof FO.setcontainercss!="undefined"&&FO.setcontainercss=="true"){
UFO.setContainerCSS(id);
}
UFO.writeFlashObject(id);
}else{
if(FO.xi&&UFO.hasFlashVersion("6","65")){
UFO.createModalDialog(id);
}
}
}
document.getElementById(id).style.visibility="visible";
}
},createStyleRule:function(_27c,_27d){
if(UFO.is_ie&&UFO.is_mac){
return;
}
var head=document.getElementsByTagName("head")[0];
var _27f=UFO.createElement("style");
if(!(UFO.is_ie&&UFO.is_win)){
var _280=document.createTextNode(_27c+" {"+_27d+"}");
_27f.appendChild(_280);
}
_27f.setAttribute("type","text/css");
_27f.setAttribute("media","screen");
head.appendChild(_27f);
if(UFO.is_safari&&UFO.is_XML){
head.innerHTML+="";
}
if(UFO.is_ie&&UFO.is_win&&document.styleSheets&&document.styleSheets.length>0){
var _281=document.styleSheets[document.styleSheets.length-1];
if(typeof _281.addRule=="object"){
_281.addRule(_27c,_27d);
}
}
},setContainerCSS:function(id){
var FO=UFO.foList[id];
var _284=(FO.width.indexOf("%")==-1)?"px":"";
var _285=(FO.height.indexOf("%")==-1)?"px":"";
UFO.createStyleRule("#"+id,"width:"+FO.width+_284+"; height:"+FO.height+_285+";");
if(FO.width=="100%"){
UFO.createStyleRule("body","margin-left:0; margin-right:0; padding-left:0; padding-right:0;");
}
if(FO.height=="100%"){
UFO.createStyleRule("html","height:100%; overflow:hidden;");
UFO.createStyleRule("body","margin-top:0; margin-bottom:0; padding-top:0; padding-bottom:0; height:100%;");
}
},createElement:function(el){
return (typeof document.createElementNS!="undefined")?document.createElementNS("http://www.w3.org/1999/xhtml",el):document.createElement(el);
},hasRequiredAttrParams:function(id){
var FO=UFO.foList[id];
for(var i=0;i<UFO.requiredAttrParams.length;i++){
if(typeof FO[UFO.requiredAttrParams[i]]=="undefined"){
return false;
}
}
return true;
},hasFlashVersion:function(_28a,_28b){
var _28c=parseFloat(_28a+"."+_28b);
if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){
var desc=navigator.plugins["Shockwave Flash"].description;
if(desc){
var _28e=desc.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
var _28f=parseInt(_28e.replace(/^(.*)\..*$/,"$1"));
var _290=(_28e.indexOf("r")==-1)?0:parseInt(_28e.replace(/^.*r(.*)$/,"$1"));
var _291=parseFloat(_28f+"."+_290);
}
}else{
if(window.ActiveXObject){
try{
var _292=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var desc=_292.GetVariable("$version");
if(desc){
var _293=desc.replace(/^\S+\s+(.*)$/,"$1").split(",");
var _28f=parseInt(_293[0]);
var _290=parseInt(_293[2]);
var _291=parseFloat(_28f+"."+_290);
}
}
catch(e){
}
}
}
if(typeof _291!="undefined"){
return (_291>=_28c?true:false);
}
return false;
},writeFlashObject:function(id){
var el=document.getElementById(id);
if(typeof el.innerHTML=="undefined"){
return;
}
var FO=UFO.foList[id];
if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){
try{
el.innerHTML="ufo-test";
}
catch(e){
}
if(el.innerHTML!="ufo-test"){
while(el.hasChildNodes()){
el.removeChild(el.firstChild);
}
var _297=UFO.createElement("embed");
_297.setAttribute("type","application/x-shockwave-flash");
_297.setAttribute("pluginspage","http://www.macromedia.com/go/getflashplayer");
_297.setAttribute("src",FO.movie);
_297.setAttribute("width",FO.width);
_297.setAttribute("height",FO.height);
for(var i=0;i<UFO.optionalAttrEmb.length;i++){
if(typeof FO[UFO.optionalAttrEmb[i]]!="undefined"){
_297.setAttribute(UFO.optionalAttrEmb[i],FO[UFO.optionalAttrEmb[i]]);
}
}
for(var i=0;i<UFO.optionalAttrParams.length;i++){
if(typeof FO[UFO.optionalAttrParams[i]]!="undefined"){
_297.setAttribute(UFO.optionalAttrParams[i],FO[UFO.optionalAttrParams[i]]);
}
}
el.appendChild(_297);
}else{
var _299="";
for(var i=0;i<UFO.optionalAttrEmb.length;i++){
if(typeof FO[UFO.optionalAttrEmb[i]]!="undefined"){
_299+=" "+UFO.optionalAttrEmb[i]+"=\""+FO[UFO.optionalAttrEmb[i]]+"\"";
}
}
for(var i=0;i<UFO.optionalAttrParams.length;i++){
if(typeof FO[UFO.optionalAttrParams[i]]!="undefined"){
_299+=" "+UFO.optionalAttrParams[i]+"=\""+FO[UFO.optionalAttrParams[i]]+"\"";
}
}
el.innerHTML="<embed type=\"application/x-shockwave-flash\" src=\""+FO.movie+"\" width=\""+FO.width+"\" height=\""+FO.height+"\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\""+_299+"></embed>";
}
}else{
var _29a="";
for(var i=0;i<UFO.optionalAttrObj.length;i++){
if(typeof FO[UFO.optionalAttrObj[i]]!="undefined"){
_29a+=" "+UFO.optionalAttrObj[i]+"=\""+FO[UFO.optionalAttrObj[i]]+"\"";
}
}
var _29b="";
for(var i=0;i<UFO.optionalAttrParams.length;i++){
if(typeof FO[UFO.optionalAttrParams[i]]!="undefined"){
_29b+="<param name=\""+UFO.optionalAttrParams[i]+"\" value=\""+FO[UFO.optionalAttrParams[i]]+"\" />";
}
}
var _29c=(window.location.protocol=="https:"?"https:":"http:");
el.innerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+_29a+" width=\""+FO.width+"\" height=\""+FO.height+"\" codebase=\""+_29c+"//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+FO.majorversion+",0,"+FO.build+",0\"><param name=\"movie\" value=\""+FO.movie+"\" />"+_29b+"</object>";
}
},cleanupIELeaks:function(){
var _29d=document.getElementsByTagName("OBJECT");
for(var i=0;i<_29d.length;i++){
for(var x in _29d[i]){
if(typeof _29d[i][x]=="function"){
_29d[i][x]=null;
}
}
}
},createModalDialog:function(id){
var FO=UFO.foList[id];
UFO.createStyleRule("html","height:100%; overflow:hidden;");
UFO.createStyleRule("body","height:100%; overflow:hidden;");
UFO.createStyleRule("#xi-con","position:absolute; left:0; top:0; z-index:1000; width:100%; height:100%; background-color:#333; filter:alpha(opacity:50); -khtml-opacity:0.5; -moz-opacity:0.5; opacity:0.5;");
UFO.createStyleRule("#xi-mod","position:absolute; left:50%; top:50%; margin-left: -"+(parseInt(FO.xiwidth)/2)+"px; margin-top: -"+(parseInt(FO.xiheight)/2)+"px; width:"+FO.xiwidth+"px; height:"+FO.xiheight+"px;");
var body=document.getElementsByTagName("body")[0];
var _2a3=UFO.createElement("div");
_2a3.setAttribute("id","xi-con");
var _2a4=UFO.createElement("div");
_2a4.setAttribute("id","xi-mod");
_2a3.appendChild(_2a4);
body.appendChild(_2a3);
var _2a5=window.location;
document.title=document.title.slice(0,47)+" - Flash Player Installation";
var _2a6=document.title;
var _2a7=(UFO.is_ie&&UFO.is_win)?"ActiveX":"PlugIn";
var _2a8=(typeof FO.xiurlcancel!="undefined")?"&xiUrlCancel="+FO.xiurlcancel:"";
var _2a9=(typeof FO.xiurlfailed!="undefined")?"&xiUrlFailed="+FO.xiurlfailed:"";
UFO.foList["xi-mod"]={movie:FO.ximovie,width:FO.xiwidth,height:FO.xiheight,majorversion:"6",build:"65",flashvars:"MMredirectURL="+_2a5+"&MMplayerType="+_2a7+"&MMdoctitle="+_2a6+_2a8+_2a9};
UFO.writeFlashObject("xi-mod");
},expressInstallCallback:function(){
var body=document.getElementsByTagName("body")[0];
var _2ab=document.getElementById("xi-con");
body.removeChild(_2ab);
UFO.createStyleRule("body","height:auto; overflow:auto;");
UFO.createStyleRule("html","height:auto; overflow:auto;");
}};
if(typeof window.attachEvent!="undefined"&&UFO.is_ie&&UFO.is_win){
window.attachEvent("onunload",UFO.cleanupIELeaks);
}
NGS.changeStyleClass=function(_2ac,_2ad){
var _2ae=document.getElementById(_2ad);
if(_2ae){
_2ae.className=_2ac;
}
};
NGS.onload=function(func){
if(document.getElementById){
if(typeof window.onload!="function"){
window.onload=func;
}else{
window.onload=Delegate.create(this,NGS.windowLoaded,func,window.onload);
}
}
};
NGS.windowLoaded=function(obj,func,_2b2){
if(_2b2){
_2b2();
func();
}
};
function Delegate(){
}
Delegate.create=function(o,f){
var a=new Array();
var l=arguments.length;
for(var i=2;i<l;i++){
a[i-2]=arguments[i];
}
return function(){
var aP=[].concat(arguments,a);
f.apply(o,aP);
};
};


// end WEBDEV-411 code

} // end if(window.NGS==undefined){ jgo 090205

// -->


/*-------------------------------------------------------------------- 
 * JQuery Plugin: "EqualHeights" & "EqualWidths"
 * by:	Scott Jehl, Todd Parker, Maggie Costello Wachs (http://www.filamentgroup.com)
 *
 * Copyright (c) 2007 Filament Group
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Description: Compares the heights or widths of the top-level children of a provided element 
 		and sets their min-height to the tallest height (or width to widest width). Sets in em units 
 		by default if pxToEm() method is available.
 * Dependencies: jQuery library, pxToEm method	(article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/)							  
 * Usage Example: $(element).equalHeights();
   						      Optional: to set min-height in px, pass a true argument: $(element).equalHeights(true);
 * Version: 2.0, 07.24.2008
 * Changelog:
 *  08.02.2007 initial Version 1.0
 *  07.24.2008 v 2.0 - added support for widths
--------------------------------------------------------------------*/

$.fn.equalHeights = function(px) {
	$(this).each(function(){
		var currentTallest = 0;
		$(this).children().each(function(i){
			if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
		});
		if (!px || !Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
		// for ie6, set height since min-height isn't supported
		if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': currentTallest}); }
		$(this).children().css({'min-height': currentTallest}); 
	});
	return this;
};

// just in case you need it...
$.fn.equalWidths = function(px) {
	$(this).each(function(){
		var currentWidest = 0;
		$(this).children().each(function(i){
				if($(this).width() > currentWidest) { currentWidest = $(this).width(); }
		});
		if(!px || !Number.prototype.pxToEm) currentWidest = currentWidest.pxToEm(); //use ems unless px is specified
		// for ie6, set width since min-width isn't supported
		if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'width': currentWidest}); }
		$(this).children().css({'min-width': currentWidest}); 
	});
	return this;
};


/*-------------------------------------------------------------------- 
 * javascript method: "pxToEm"
 * by:
   Scott Jehl (scott@filamentgroup.com) 
   Maggie Wachs (maggie@filamentgroup.com)
   http://www.filamentgroup.com
 *
 * Copyright (c) 2008 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Description: Extends the native Number and String objects with pxToEm method. pxToEm converts a pixel value to ems depending on inherited font size.  
 * Article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/
 * Demo: http://www.filamentgroup.com/examples/pxToEm/	 	
 *							
 * Options:  	 								
 		scope: string or jQuery selector for font-size scoping
 		reverse: Boolean, true reverses the conversion to em-px
 * Dependencies: jQuery library						  
 * Usage Example: myPixelValue.pxToEm(); or myPixelValue.pxToEm({'scope':'#navigation', reverse: true});
 *
 * Version: 2.0, 08.01.2008 
 * Changelog:
 *		08.02.2007 initial Version 1.0
 *		08.01.2008 - fixed font-size calculation for IE
--------------------------------------------------------------------*/

Number.prototype.pxToEm = String.prototype.pxToEm = function(settings){
	//set defaults
	settings = jQuery.extend({
		scope: 'body',
		reverse: false
	}, settings);
	
	var pxVal = (this == '') ? 0 : parseFloat(this);
	var scopeVal;
	var getWindowWidth = function(){
		var de = document.documentElement;
		return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
	};	
	
	/* When a percentage-based font-size is set on the body, IE returns that percent of the window width as the font-size. 
		For example, if the body font-size is 62.5% and the window width is 1000px, IE will return 625px as the font-size. 	
		When this happens, we calculate the correct body font-size (%) and multiply it by 16 (the standard browser font size) 
		to get an accurate em value. */
				
	if (settings.scope == 'body' && $.browser.msie && (parseFloat($('body').css('font-size')) / getWindowWidth()).toFixed(1) > 0.0) {
		var calcFontSize = function(){		
			return (parseFloat($('body').css('font-size'))/getWindowWidth()).toFixed(3) * 16;
		};
		scopeVal = calcFontSize();
	}
	else { scopeVal = parseFloat(jQuery(settings.scope).css("font-size")); };
			
	var result = (settings.reverse == true) ? (pxVal * scopeVal).toFixed(2) + 'px' : (pxVal / scopeVal).toFixed(2) + 'em';
	return result;
};

/**
 * jQuery.labelify - Display in-textbox hints
 * Stuart Langridge, http://www.kryogenix.org/
 * Released into the public domain
 * Date: 25th June 2008
 * @author Stuart Langridge
 * @version 1.3
 */
 
jQuery.fn.labelify=function(settings){settings=jQuery.extend({text:"title",labelledClass:""},settings);var lookups={title:function(input){return $(input).attr("title")},label:function(input){return $("label[for="+input.id+"]").text()}};var lookup;var jQuery_labellified_elements=$(this);return $(this).each(function(){if(typeof settings.text==="string"){lookup=lookups[settings.text]}else{lookup=settings.text};if(typeof lookup!=="function"){return}var lookupval=lookup(this);if(!lookupval){return}$(this).data("label",lookup(this).replace(/\n/g,''));$(this).focus(function(){if(this.value===$(this).data("label")){this.value=this.defaultValue;$(this).removeClass(settings.labelledClass)}}).blur(function(){if(this.value===this.defaultValue){this.value=$(this).data("label");$(this).addClass(settings.labelledClass)}});var removeValuesOnExit=function(){jQuery_labellified_elements.each(function(){if(this.value===$(this).data("label")){this.value=this.defaultValue;$(this).removeClass(settings.labelledClass)}})};$(this).parents("form").submit(removeValuesOnExit);$(window).unload(removeValuesOnExit);if(this.value!==this.defaultValue){return}this.value=$(this).data("label");$(this).addClass(settings.labelledClass)})};


/**
 * jQuery.ratings - Set WPF ratings in the object
 **/
$.fn.wpf_ratings = function (settings) {
    return this.each(function(){
        var $this = $(this),
            object_id = $this.attr('data-object-id') || '0',
            ctype_id = $this.attr('data-ctype-id') || '0',
            //r_str = '.ratings_' + settings.object_id,
            avg = 0,
            votes = 0,
            u_rate = 0,
            hasVoted = false,
            tid,
            cookie,
            c_vals,
            i,
            c_id_val,
            showStars = function () {
                $this.find('div.status').hide();
                $this.find('ul li').removeClass('selected');
                $this.find('ul li:lt(' + u_rate + ')').addClass('selected').addClass('user_rate');
                $this.find('ul').show();
                window.clearTimeout(tid);
            },
            ajaxSuccess = function () {
                tid = window.setTimeout(showStars, 500);
                votes += 1;
                $('[data-object-id="' + object_id + '"] div.num_votes').html('(' + votes + ')');
            },
            clearFunctions = function () {
                $this.find('ul li').each(function (i) {
                    $(this).hover(function (e) {}, function (e) {});
                    $(this).click(function (e) {});
                });
            },
            init = function () {
                $this.find('ul li').each(function (i) {
                    $(this).hover(function (e) {
                        if (!hasVoted) {
                            $this.find('ul li').removeClass('selected');
                            $this.find('ul li:lt(' + i + ')').addClass('selected');
                            $(this).addClass('selected');
                        }
                    }, function (e) {
                        if (!hasVoted) {
                            $this.find('ul li').removeClass('selected');
                            $this.find('ul li:lt(' + Math.floor(avg) + ')').addClass('selected');
                        }
                    });
                    $(this).click(function (e) {
                        if (!hasVoted) {
                            $this.find('div.status').show();
                            $this.find('ul').hide();
                            u_rate = i + 1;
                            cookie += ctype_id + '_' + object_id + '&' + u_rate + ';';
                            $.ajax({
                                type: 'GET',
                                dataType: 'json',
                                url: '/ratings/ajax/rate/' + ctype_id + '/' + object_id + '/' + (i + 1) + '/',
                                success: function (response) {
                                    if (response.result === 'success') {
                                        ajaxSuccess();
                                        hasVoted = true;
                                        $.cookie('ngratings', cookie, {
                                            expires: 14,
                                            path: '/'
                                        })
                                        clearFunctions();
                                    } else if (response.result === 'error') {
                                        $this.find('div.status').html(response.result_message);
                                    }
                                }
                            });
                        }
                    });
                });
            };

        $.getJSON('/ratings/ajax/rate/get_score/' + ctype_id + '/' + object_id + '/', function (data) {
            avg = parseFloat(data.score);
            votes = parseInt(data.num_votes, 10);
            $this.find('div.num_votes').html('(' + votes + ')');
            cookie = $.cookie('ngratings') || '';
            if (!cookie) {
                c_vals = cookie.split(';');
                for (i = 0; i < c_vals.length; i++) {
                    c_id_val = c_vals[i].split('&');
                    if (c_id_val[0] === ctype_id + '_' + object_id) {
                        hasVoted = true;
                        u_rate = c_id_val[1];
                        break;
                    }
                }
            }
            if (hasVoted) {
                $this.find(' ul li:lt(' + u_rate + ')').addClass('selected').addClass('user_rate');
            } else {
                $this.find(' ul li:lt(' + Math.floor(avg) + ')').addClass('selected');
                init();
            }
        });
    });
};

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(a,b,c){if(typeof b!='undefined'){c=c||{};if(b===null){b='';c.expires=-1}var d='';if(c.expires&&(typeof c.expires=='number'||c.expires.toUTCString)){var e;if(typeof c.expires=='number'){e=new Date();e.setTime(e.getTime()+(c.expires*24*60*60*1000))}else{e=c.expires}d='; expires='+e.toUTCString()}var f=c.path?'; path='+(c.path):'';var g=c.domain?'; domain='+(c.domain):'';var h=c.secure?'; secure':'';document.cookie=[a,'=',encodeURIComponent(b),d,f,g,h].join('')}else{var j=null;if(document.cookie&&document.cookie!=''){var k=document.cookie.split(';');for(var i=0;i<k.length;i++){var l=jQuery.trim(k[i]);if(l.substring(0,a.length+1)==(a+'=')){j=decodeURIComponent(l.substring(a.length+1));break}}}return j}};
