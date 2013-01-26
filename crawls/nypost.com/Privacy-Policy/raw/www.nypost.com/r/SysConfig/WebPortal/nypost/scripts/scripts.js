/**
* @Author: Teddy Moussignac
* @email: tmoussignac@nyp.com
* @email: storm2910@gmail.com
* @Copyright 2012. All Rights Reserved.
**/

$(document).ready(function(){

	//POST MODULES
	(function(){
	var POST,post, p = p || {};
	
	//NAV MODULE STARTS
	p.n = function(){
		try{
			if($('.nav-item').length <= 0 ) return;
			//drop-down-nav
			$('.nav-item .arr').each(function(){
				var d = $(this).parent().parent().find('.drop-down-nav');
				var o = $(this).parent();
				var a = $(this).parent().parent().attr('id').split('-')[0];
				var s = d.attr('data-section-id');
				
				$(this).on('mouseenter', function(){
					o.parent().addClass('on');
					d.addClass('init');
					d.find('img.delay-in').each(function(){
						p.photo.getImage($(this));
					})
					setTimeout(function(){
						d.addClass('active');	
					}, 100);
					//get ad
					if(d.ad === undefined){
						$.get('/Fragment/SysConfig/WebPortal/nypost/blocks/fat_header/fat_header_ad.jpt', { section : s, anchor : a }, function(r){
				       		d.find('.ad-wrap').html(r);
				    		d.ad = r;
				    	});
				    }
				});
				$(this).parent().parent().on('mouseleave', function(){
					o.parent().removeClass('on');
					d.removeClass('active').addClass('dismiss');	
					setTimeout(function(){
						d.removeClass('dismiss init');
					}, 300);
				})
			});
			//fat-header list
			if($('#fat-header.open .list ul li a').length > 1){
				$('#fat-header.open .list ul li a').each(function(){
					$(this).on('mouseover', function(){
						try{
							$(this).parent().parent().find('a').removeClass('hover'); 
							$(this).addClass('hover');
							$(this).parent().parent().parent().find('img').attr('src', $(this).attr('data-image')).attr('data-url', $(this).attr('href'));
						}catch(e){}
					});
					$('#fat-header.open .list ul li:first-child a').mouseover();
				});
				$('#fat-header.open img').on('click', function(){
					p.request($(this).attr('data-url'));
				});
			}
		}catch(e){}
	}
	
	//POST DROPDOWN MODULE STARTS
	p.d = function(){
		try{
		$('.drop-menu-init').each(function(){
			var d = $(this).find('.drop-menu:first');
			$(this).on('mouseenter', function(){
				$(this).addClass('on');
				d.addClass('init');
				setTimeout(function(){
					d.addClass('active');
				}, 0);
			});
			$(this).on('mouseleave', function(){
				$(this).removeClass('on');
				d.removeClass('active').addClass('dismiss');
				setTimeout(function(){
					d.removeClass('dismiss init')
				}, 300);
			});
		});
		}catch(e){}
	}
	
	//TOP STORY MODULE STARTS
	p.ts = function(){
		try{
			var f,o,l,a = $('#top-story .arrow');
			l = $('#top-story-ctrl > li');
			f = $('#top-story-ctrl li:first-child');
			a.css({ left :  f.position().left + ( f.width()/2) - 10 + 'px' });
			l.on('mouseover', function(){
				l.each(function(x){ try{ $(this).removeClass('on') }catch(e){}});
				$(this).addClass('on');
				$('.top-story-item').each(function(){ $(this).removeClass('show') });
				$('#' + $(this).attr('data-panel')).addClass('show');
				setTimeout(function(){	
					o = $('#top-story-ctrl li.on');
					a.css({ left :  o.position().left + ( o.width()/2) - 10 + 'px' });
				}, 0);
			});
			f.mouseover();
		}catch(e){}
	}
	
	//STORY-BLOCK-WRAP MODULE STARTS
	p.bt = function(){
		try{
			if( $('.story-block-wrap .ctrl').length <= 0 ) return;
			$('.story-block-wrap .ctrl').each(function(){
				var p,w,t = $(this).addClass('fast'); 
				p = t.parent();
				w = 0;
				t.find('li > a').each(function(){
					w += $(this).outerWidth();
				});	
				setTimeout(function(){
					if( w > p.outerWidth()){
						t.css({ width : w + 'px' });
						t.wrap('<div class="ctrl-wrap"></div>');
						setTimeout(function(){
							t.addClass('show');
							t.parent().prepend('<a href="javascript://" class="prev-next prev off"></a>');
							t.parent().append('<a href="javascript://" class="prev-next next"></a>');
							setTimeout(function(){
								var fx;
								t.removeClass('fast');
								p.find('.next').on('mouseenter', function(){
									fx = setInterval(function(){
										if( ((t.width() - p.width()) + t.position().left) <= 0){ 
											p.find('.next').addClass('off'); 
											return;
										}else{
											p.find('.prev').removeClass('off'); 
											t.css({ 'left' : t.position().left - 1 + 'px' });
										}
									}, 12);	
								}).on('mouseleave', function(){
									clearInterval(fx);
								});
								p.find('.prev').on('mouseenter', function(){
									fx = setInterval(function(){
										if(t.position().left >= 0) { 
											p.find('.prev').addClass('off'); 
											return; 
										}else{
											p.find('.next').removeClass('off'); 
											t.css({ 'left' : t.position().left + 1 + 'px' });
										}
									}, 12);	
								}).on('mouseleave', function(){
									clearInterval(fx);
								})
							}, 400);
						}, 0);
					}
					else t.addClass('show');	
				}, 0);
			});
			$('.story-block-wrap .ctrl li a').each(function(){
				$(this).on('mouseover', function(){
					$('.story-block-wrap .ctrl li a').each(function(x){ try{ $(this).removeClass('on') }catch(e){}});
					$(this).addClass('on');
					var w = {};//pane
					var p = ($('.ctrl-wrap').length > 0) ? ($(this).parent().parent().parent().parent()) : ($(this).parent().parent().parent());
					if( p.find('.story-list').length > 0 ){
						p.find('.story-list').each(function(){ $(this).removeClass('show') });
						w = p.find('.story-list[data-panel='+ $(this).attr('data-panel') +']');
						w.addClass('show');
					}
					if(p.find('.story-block-list .story-block').length > 0 ){
						p.find('.story-block-list .story-block').each(function(){ $(this).removeClass('show') });
						w = p.find('.story-block[data-panel='+ $(this).attr('data-panel') +']');
						w.addClass('show');
					}
					var t = $(this);
					setTimeout(function(){	
						p.find('.arrow').css({ left :  t.position().left + ( t.width()/2) - 5 + 'px' });
						w.find('img.delay-in').each(function(){
							p.photo.getImage($(this));
						});
					}, 0);
					
				});
			});
			$('.story-block-wrap .ctrl li:first-child a').mouseover();
			if( window.location.href.indexOf('/columnists#') > -1 ){
				var w,c = window.location.href.split('/columnists#')[1].replace(/\_/g,'-');
				w = $('#columnists-list-wrap ul.story-list[data-panel=' + c + ']');//pane
				$('#columnists-list-wrap .ctrl li a').removeClass('on');
				$('#columnists-list-wrap ul.story-list').removeClass('show');
				setTimeout(function(){
					$('#columnists-list-wrap .ctrl li a[data-panel=' + c + ']').addClass('on');
					w.addClass('show');
					var t = $('#columnists-list-wrap .ctrl li a[data-panel=' + c + ']');
					var a = $('#columnists-list-wrap .ctrl li.arrow');
					a.css({ left :  t.position().left + ( t.width()/2) - 5 + 'px' });
					setTimeout(function(){
						$('#columnists-list-wrap').addClass('show');
						w.find('img.delay-in').each(function(){
							p.photo.getImage($(this));
						});	
					}, 0);
				}, 0);
			}
			else return;
		}catch(e){}	
	}
	//TABLE SCROLL
	p.tscroll = function(){
		try{
		$('.section_tables,.datatable_wide').each(function(){
			$(this).find('tr td:first-child').attr('width','200');
			$(this).wrap('<div class="t-screen"></div>');
			var t= $(this);
			setTimeout(function(){
				w = t.parent();
				if(t.width() > w.width()){
					w.append('<div class="next"><span></span></div><div class="prev off"><span></span></div>');
					setTimeout(function(){
						var p,n = w.find('.next'); p = w.find('.prev');
						n.on('mouseenter',function(){
							fx = setInterval(function(){
								if( ((t.width() - w.width()) + t.position().left) <= 0){ 
									n.addClass('off'); 
									return;
								}else{
									p.removeClass('off'); 
									t.css({ 'left' : t.position().left - 1 + 'px' });
								}
							}, 12);	
						}).on('mouseleave', function(){
							clearInterval(fx);
						});
						p.on('mouseenter',function(){
							fx = setInterval(function(){
								if(t.position().left >= 0) { 
									p.addClass('off'); 
									return; 
								}else{
									n.removeClass('off'); 
									t.css({ 'left' : t.position().left + 1 + 'px' });
								}
							}, 12);	
						}).on('mouseleave', function(){
							clearInterval(fx);
						});
					},0);
				}
			},0);
		});
		}catch(e){}	
	}
	//STORY PKG STARTS
	p.sp = function(){
		try{
			//Key navigation
			$(document).on('keydown', function(e, txtObj, selObj){
				var evt = e || window.event;
				if( ( evt ) && (evt.keyCode) ){ 
					var keycode;
					keycode = evt.keyCode;
					switch(keycode){
						case 37 : //left arrow key
							if( $('.pkg-pagination .prev').length <= 0 ) break;
							window.location.href = $('.pkg-pagination').find('.prev').attr('href');
							evt.preventDefault();
							break;
						case 39 : //right arrow key
							if( $('.pkg-pagination .next').length <= 0 ) break;
							window.location.href = $('.pkg-pagination').find('.next').attr('href');
							evt.preventDefault();
							break;	
						default : ; //any key
					}
				}
			});
			
		}catch(e){ console.log(e.message) }
	}
	//STORY PKG ENDS
	
	//STORY SHARE MODULE STARTS
	p.sh = function(){
		try{
			if($('.share-mini').length > 0){
				setTimeout(function(){
					$('.share-mini').addClass('on');
					setTimeout(function(){$('.share-mini').addClass('show');}, 0);
				}, 1000);
			}
			if($('#share-story-wrap').length > 0){	
				setTimeout(function(){
					var l,p,o = $('#share-story-wrap'); 
					p = $('#story-tabs').height();
					l = $('#hat-wrap').height();
					o.css({ 'top' : p + 'px'});
					setTimeout(function(){
						o.addClass('show');
						setTimeout(function(){ o.removeClass('trans') },100);
					    $(window).scroll(function (event) {
					    	var y = $(this).scrollTop();
					    	if (y >= $('#lt-col').offset().top + p - l) o.addClass('fixed').css({ 'left' : $('#story-tabs').offset().left, 'top' : l + 'px' });
					    	else o.removeClass('fixed').css({ 'left' : 0, 'top' : p + 'px' });
						});
					}, 200);
				}, 100);
			}
		}catch(e){ console.log(e.message) }
	}
	
	//PHOTO STARTS
	p.photo = p.photo || {}
	p.photo.getImage = function(i){
		if(i.attr('data-src') !== undefined ){
			var im = new Image();
			im.src = i.attr('data-src');
			im.alt = '';
			im.className = i.attr('class');
			if(i.attr('id') !== undefined ) im.id = i.attr('id');
			im.onload = function(){
				i.replaceWith(im);
				setTimeout(function(){
					$('img[src="'+ i.attr('data-src') + '"]').addClass('on');
				}, 10);
			}
			im.onerror = function(){
				i.addClass('err');
				i.addClass('on');
			}
		}
	}
	p.photo.loadImage = function(){
		try{
		if(($( 'img.delay').length <= 0 ) && ($( 'img.delay-in').length <= 0)) return;
		$('img.delay').each(function(){
			var pos,i = $(this);
			pos = (i.offset().top) - ($(window).scrollTop()) - screen.height; 
			if( pos <= 0 ){
				p.photo.getImage($(this));
			}
		});
		}catch(e){}
	}
	p.photo.paginate = function(o){
		var l,s,e = o.find('.screen');
		l = parseInt(e.find('.story-list').outerHeight());
		s = Math.ceil(l/500);
		e.addClass('pager trans');
		e.after('<ul class="screen-pager"></ul>');
		e.find('.story-list').addClass('trans');
		setTimeout(function(){ 
			for(var i = 0; i < s+1; i++){
				$('.screen-pager').append('<li data-index="'+ i +'" class="p"></li>');
			};
			setTimeout(function(){
				$('.screen-pager .p').on('click', function(){
					$('.screen-pager .p').removeClass('init');
					e.find('.story-list').css({ 'margin-top' : '-' + 480 * (parseInt($(this).attr('data-index'))) + 'px'});
					$(this).addClass('init');
					if(parseInt($(this).attr('data-index')) === s)e.addClass('no-shade');
					else e.removeClass('no-shade');
					e.find('.story-list img').each(function(){
						p.photo.getImage($(this));
					})
				});
				$('.screen-pager .p:first-child').click();
			},10);
		}, 0);
	}
	p.photo.init = function(){
		try{
			$('.photo-list .toggle').on('click', function(){
				$('#ct-col, #rt-col').css({ 'min-height' : 0 });
				$(this).find('.tog').toggleClass('off');
				$('.screen[data-screen=' + $(this).attr('data-screen') + ']').toggleClass('collapse');
				setTimeout(p.photo.loadImage, 0);
			});
			if($('.screen.pager').length > 0) p.photo.paginate($('.photo-list').find('screen.pager').parent());
		}catch(e){ console.log(e.message) }
	}
	p.photo.viewer = function(){
		try{
			if($('#photo-viewer').length > 0 ){ 
				p.photo.viewer.dismiss();
				return;
			}	
			var img = arguments[0] !== undefined ? arguments[0] : $('#curr-photo');
			var s,w,h,v = '';
			var rf = function(){
				var e = $('.photo-viewer img');
				e.css({ 'margin-top' : ( $('.photo-viewer').height() / 2 ) - ( $('.photo-viewer img').height() / 2 ) - $('.photo-viewer').find('.caption').height()/2 + 'px'  });
				$('.photo-viewer .loader').remove();
				e.addClass('trans');
				setTimeout(function(){
					$('.photo-viewer img, .photo-viewer .caption').addClass('show');
				}, 300);
			}
			if( img.attr('src').match(/\-\-[0-9]*x[0-9]*/) !== null ){
				s = img.attr('src').match(/\-\-[0-9]*x[0-9]*/);
				w = parseInt(s.toString().replace('--', '').split('x')[0]); 
				h = parseInt(s.toString().replace('--', '').split('x')[1]);
				v = w > h ? '--1024x693' : '--768x949';
			}
			$('body').append( '<div id="photo-viewer" class="photo-viewer trans"><span class="loader white"></span><p class="caption trans">' + img.parent().find('.caption').text() + img.parent().parent().find('.photo_caption').text() + $('.gallery-wrap .caption').text() + ' <span class="credit"> '+ img.parent().parent().find('.credit').text() + img.parent().parent().find('.photo_credit').text() + ' ' + img.parent().find('.photo-credit').text() +'</span></p><div class="close-screen"></div><div class="close"></div></div>' );
			setTimeout(function(){
				var iv = new Image();
				var im = $.ajax({url : img.attr('src').replace(/\-\-[0-9]*x[0-9]*/, v ), type : 'GET'});
				im.always(function(){
					$('.photo-viewer').addClass('init');
					$('.photo-viewer .close').on('click', p.photo.viewer.dismiss);
					$('.photo-viewer .close-screen').on('click', p.photo.viewer.dismiss);
				});
				im.done(function(){
					iv.src = img.attr('src').replace(/\-\-[0-9]*x[0-9]*/, v );
					iv.onload = function(){
						$('.photo-viewer').prepend(iv);
						setTimeout(rf, 300);
					}
					iv.onerror = function(){
						iv.src = img.attr('src');
						setTimeout(rf, 300);
					}
				});
				im.fail(function(){
					iv.src = img.attr('src').replace(/\-\-[0-9]*x[0-9]*/, '' );
					iv.onload = function(){
						$('.photo-viewer').prepend(iv);
						setTimeout(rf, 300);
					}
					iv.onerror = function(){
						iv.src = img.attr('src');
						setTimeout(rf, 300);
					}
				});			
			}, 0);
		}catch(e){}
	}
	p.photo.viewer.dismiss = function(){
		$('.photo-viewer').removeClass('init');
		setTimeout(function(){
			$('.photo-viewer').empty().remove();
		}, 300);	
	}
	p.photo.start = function(){
		try{
			setTimeout(function(){ 
			$('.photo .gallery-wrap').addClass('show');
			}, 10);
			setTimeout(function(){ 
				$('.video .gallery-wrap').addClass('show') 
			}, 800);
			if( $('.thumbs-wrap').length <= 0 ) return;
			var toggle = function(o){
				o.toggleClass('on');
				o.find('img.delay-in').each(function(){
					p.photo.getImage($(this));
				});
				setTimeout(function(){ o.toggleClass('show') }, 0);
			}
			$(document).on('keydown', function(e, txtObj, selObj){
				var evt = e || window.event;
				
				if( ( evt ) && (evt.keyCode) ){ 
					var keycode;
					keycode = evt.keyCode;
					switch(keycode){
						case 37 : //left arrow key
							if( $('.img-wrap .prev').length <= 0 ) break;
							window.location.href = $('.img-wrap').find('.prev').attr('href');
							evt.preventDefault();
							break;
						case 39 : //right arrow key
							if( $('.img-wrap .next').length <= 0 ) break;
							window.location.href = $('.img-wrap').find('.next').attr('href');
							evt.preventDefault();
							break;	
						case 38 : //up arrow key
							p.photo.viewer();
							evt.preventDefault();
							break;
						case 27 :
						case 40 : //down arrow key
							if($('.photo-viewer').length > 0 )p.photo.viewer.dismiss();
							else toggle($('.thumbs-wrap'));
							evt.preventDefault();
							break;
					}
				}
			});
			$('.thumb-init, #story.gallery-wrap .counter').on('click', function(){
				var obj = $(this).parent().parent().find('.thumbs-wrap'); 
				toggle(obj);
				return false;
			});
			$('.thumb-close').on('click', function(){
				var obj = $(this).parent();
				toggle(obj);
				return false;
			});
		}catch(e){ console.log(e.message) }
	}
	p.photo.storyPhoto = function(){
		try{
			//$('#ct-col').on('click', '#curr-photo, .blogImage, .intext_photo > img', function(){
			$('#ct-col').on('click', '#curr-photo', function(){
				p.photo.viewer($(this));
			});
		}catch(e){}
	}
	
	//VIDEO STARTS
	p.v = function(){
		try{
			setTimeout(function(){ 
				$('#ct-col .loader').addClass('dismiss');
				setTimeout(function(){ 
					$('.video-player-wrap').addClass('init');
					$('#ct-col .loader').remove();  
				}, 100);
			}, 300);
		}catch(e){ console.log(e.message) }
	}
	//VIDEO ENDS
	
	//TEAM TRACKER
	p.tt = function(){
		try{
		//SET NAV
		$('#team_tracker_nav').css({ 'width' : ($('.team_nav_item').width() * $('.team_nav_item').length) + 'px' });
		//GET DATA
		setTimeout(function(){
			var fx;
			//next btn
			$('#team-tracker-block .next').on('mouseenter', function(){
				fx = setInterval(function(){
					if( (($('#team_tracker_nav').width() - $('#tracker-nav-mask').width()) + $('#team_tracker_nav').position().left) <= 0){ 
						$('#team-tracker-block .next').addClass('off'); 
						return;
					}else{
						$('#team-tracker-block .prev').removeClass('off'); 
						$('#team_tracker_nav').css({ 'left' : $('#team_tracker_nav').position().left - 1 + 'px' });
					}
				}, 12);	
			}).on('mouseleave', function(){
				clearInterval(fx);
			});
			//prev btn
			$('#team-tracker-block .prev').on('mouseenter', function(){
				fx = setInterval(function(){
					if($('#team_tracker_nav').position().left >= 0) { 
						$('#team-tracker-block .prev').addClass('off'); 
						return; 
					}else{
						$('#team-tracker-block .next').removeClass('off'); 
						$('#team_tracker_nav').css({ 'left' : $('#team_tracker_nav').position().left + 1 + 'px' });
					}
				}, 12);	
			}).on('mouseleave', function(){
				clearInterval(fx);
			})
			var results = new Array(); // for caching
		  	$('.team_nav_item').on('mouseenter', function(){
		    tab   = $(this);
		    team  = tab.attr("id").split('_')[2];
		    $('.team_nav_item').removeClass('current');
		    setTimeout(function(){	
		    	tab.addClass('current');
				$('#team-tracker-block .arrow').css({ left :  tab.position().left + ( tab.width()/2) - 10 + 'px' });
			}, 0);
		   if(results[team]==undefined){
		      /* set loading */
		      $('.team_tracker').html('<span class="loader"></span>');
		      /* get the data */
		      $.get('/Fragment/nypost/web/webpages/sports/blocks/team_tracker/' + team + '.dwc?style=/SysConfig/WebPortal/nypost/blocks/_sports/team_tracker/team_tracker_panel.jpt', {team: team }, function(result){
		        $('.team_tracker').html(result);
		        results[team] = result;
		      });
		    }else{
		      $('.team_tracker').html(results[team]);
		  	}
		  });
		  $('.team_nav_item.first').mouseenter();
		  $('#team-tracker-block .prev').addClass('off'); 
	  }, 300);
	  
	  }catch(e){}
	}
	
	//BREAKING NEWS
	p.bn = function(){
		try{
			$('#breaking-news-bar .close').on('click', function(){
				$('#breaking-news-bar').addClass('dismiss');
				setTimeout(function(){
					$('#breaking-news-bar').remove();	
				}, 100);
			});
		}catch(e){}
	}
	
	//SIGN UP
	p.su = function(){
		try{
		$("#sailthru-submit").click(function(){
			$("form").submit(function () { return false; });
			var st_email = $("input#sailthru-input").val();
			var valid = /(.*)@(.*)\.(.*)/.test(st_email);
			var params = "e=" + st_email;
			
			if (valid) {
				var a = $.ajax({ type:'GET', url:'/php/sailthru/signup.php?' + params });
				a.done(function(){
					$("#nyp-newsletter").html('<h2 class="block-title">Thank you, your email address has been subscribed!</h2>');
					$("input#sailthru-input").css({ 'border-color':'#0c0'})
				});
			}else $("input#sailthru-input").css({ 'border-color':'#c00'})
		});
		$('input#sailthru-input').keypress(function(e){
			var c = e.which ? e.which : e.keyCode;
			if(c == 13){
				$(this).blur();
	            $('#sailthru-submit').focus().click();
			}
		});
		}catch(e){}
	}
	//LOCAL
	p.local = p.local || {}
	p.local.start = function(){
		try{
			if( $('#boro-nav').length <= 0 ) return;
			if( $('#sub-sub-nav .boro').length <= 0 ) return;
			$('.boro').on('mouseenter', function(){
				if($(this).attr('data-list').length > 0){
					$('#boro-nav .nabe-list').removeClass('on');
					var that = $('#boro-nav #' + $(this).attr('data-list'));
					that.addClass('on');
					setTimeout(function(){
						$('#boro-nav').addClass('on');
						setTimeout(function(){
							$('#boro-nav').addClass('show').on('mouseleave', function(){
								$('#boro-nav').removeClass('show');
								setTimeout(function(){
									$('#boro-nav').removeClass('on');
								}, 400)
							});
						}, 0)
					}, 0)
				}
			});
		}catch(e){ console.log(e.message) }
	}
	
	//INIT COLS
	p.cols = function(){
		setTimeout(function(){
			try{
			if($('#rt-col').height() > $('#lt-col-wrap').height()){
				$('#lt-col-wrap').css('min-height', $('#rt-col').height() + 30 + 'px');
			}else{
				$('#rt-col').css('min-height', $('#lt-col-wrap').height() + 'px');
			}
			setTimeout(function(){
				$('#lt-col, #ct-col, #ct-col .inner_rt, #ct-col .inner_lt, #ct-col .blog-roll, .blog-page #story').css('min-height', $('#lt-col-wrap').height() + 'px');
			}, 0);
			}catch(e){}
		}, 300);
	}
	//SELECT
	p.select = function(){
		$('.mr-select select').change(function(){
			var str = "";
		    $(this).find("option:selected").each(function(){
		    	str += $(this).text() + " ";
		    });
			$(this).parent().find('.screen').text(str);
		})
	}
	//REQUEST STARTS
	p.request = function(o){
		var a = o;
		if( a === null ) return;
		if( typeof a === 'string' ) { 
			window.location.href = a;
			return;
		}
		else{
			if( (a.window === true) || ( a.external === true) ) window.open(a.url);
			else window.location.href = a.url;
		}
	}
	var href = p.request;//Legacy support
	//REQUEST ENDS
	//BLOGS
	p.blogsInit = function(){
		try{
		var loadBlog = function(obj, pw){
			var o = obj;
			var w = $('#'+o.parent().attr('data-panel') + ' .blog-roll');
			w.addClass('process');
			if( w.find('.loader').length === 0 ) w.prepend('<div class="loader"></div>');
			$.get(pw + o.attr('data-blog') + '.jpt',function(data) {
				if(data.length === 0) data = "Sorry, no recent postings in this Blog";
				$('#'+o.parent().attr('data-panel') + ' .blog-roll').html('<ul class="story-list">'+ data +'</ul>').ready(function() {
					w.prepend('<span class="update">' + w.find('.story-list .timestamp').text() + '</span>');
					$('.index > ul > li').removeClass('on');
					setTimeout(function(){
						o.addClass('on');
						w.removeClass('process');
						w.find('.story-list .timestamp').remove();
						w.find('.story-list img.delay-in').each(function(){
							p.photo.getImage($(this));
						});
					}, 0);
				});
			});
		}
		$('.index > ul > li').on('click', function(){
			loadBlog($(this), '/Fragment/SysConfig/WebPortal/nypost/blogs_jsp/landing_tabs/blogs/');
		});
		$('.index > ul > li:first-child').on('click', function(){
			loadBlog($(this), '/Fragment/SysConfig/WebPortal/nypost/blogs_jsp/landing_tabs/');
		});
		}catch(e){}
	}
	//ALEXA STORY BLOCK
	p.magStory = function(){
		$('.story-list-item').each(function(u){
			var s = $(this).attr('onclick') + '';
			if(s.match(/\/alexa\//i) !== null){
				$(this).addClass('mag alexa_story');
			}
		});
		$('.story-list-item').each(function(u){
			var s = $(this).attr('onclick') + '';
			if(s.match(/\/pagesixmag\//i) !== null){
				$(this).addClass('mag pagesixmag_story');
			}
		});
	}
	//COOKIE
	p.setCookie = function(c_name,value,exdays){
		var c_value,exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}
	p.getCookie = function(c_name){
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++){
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if(x==c_name) return unescape(y);
		}
	}
	//>cookie ends
		
	//HTML5 LOCAL STORAGE MODULE
	p.vars = function(){
		if( typeof window.localStorage === undefined ) return false ;
		var n,k,c = new Array(); n = localStorage.length-1;
		for (var i = 0; i <= n; i++){
			k = localStorage.key(i); 
			if( ( k.match(/mr-/) !== null ) && ( k.match(/-var/) != null ) ){
				c.push({ key : k,value : localStorage.getItem(k) });
			}
		}	
		return c;
	}
	p.vars.set = function(k,v){
		if( typeof window.localStorage === undefined ) return false ;
		var s,c = window.localStorage.setItem('mr-'+k+'-var', v); s = true;
		if(!c) s = false;
		return s;
	}
	p.vars.get = function(k){
		if( typeof window.localStorage === undefined ) return false ;
		var c = window.localStorage.getItem('mr-'+k+'-var');	
		return c;
	}
	p.vars.del = function(k){
		if( typeof window.localStorage === undefined ) return false ;
		var c,s = true;
		c = window.localStorage.removeItem('mr-'+k+'-var');
		if(!c) s = false;	
		return s;
	}
	p.vars.clear = function(){
		if( typeof window.localStorage === undefined ) return false ;
		var c = p.vars();
		c.each(function(i){
			window.localStorage.removeItem(i.key);
		});
	}
	//TABLET APP DOWNLOAD MODULE
	p.app_d = function(){
		var c,u,r,t,a = navigator.userAgent;
		if ((a.match(/ipad.+safari/gi) !== null) || (a.match(/android/gi) !== null) || (a.match(/silk/gi) !== null)){
			c = p.getCookie('nyp-d');
			if(c === undefined) p.setCookie('nyp-d',true,30);
			else return;
			if(a.match(/ipad.+safari/gi) !== null){ 
				//t="Have you seen our iPad app?  Download it today for free!";
				//u="http://click.linksynergy.com/fs-bin/click?id=x2qCbCo8eAE&subid=&offerid=146261.1&type=10&tmpid=5573&u1=topbrowser&RD_PARM1=http%3A%2F%2Fitunes.apple.com%2Fus%2Fapp%2Fnew-york-post%2Fid378590820";
				t="The New York Post's new ebook is now on sale! Click 'OK' for details.";
				u="http://click.linksynergy.com/fs-bin/click?id=x2qCbCo8eAE&subid=&offerid=146261.1&type=10&tmpid=3909&u1=mariner&RD_PARM1=https%3A%2F%2Fitunes.apple.com%2Fus%2Fbook%2FTricks-of-the-Trade%2Fid570785381%3Fmt%3D11";
			}
			if (a.match(/android/gi) !== null){ 
				//t="Have you seen our tablet app?  Download it today for free!";
				//u="market://details?id=com.nypost.tablet"
				t="The New York Post's new ebook is now on sale! Click 'OK' for details.";
				u="https://play.google.com/store/books/details?id=f5etMNLzx9QC&rdid=book-f5etMNLzx9QC&rdot=1&source=gbs_atb";
		    }
			if (a.match(/silk/gi) !== null){
				//t="Have you seen our Kindle Fire app?  Download it today for free!";
				//u="market://details?id=com.nypost.tablet"
				t="The New York Post's new ebook is now on sale! Click 'OK' for details.";
				u="https://play.google.com/store/books/details?id=f5etMNLzx9QC&rdid=book-f5etMNLzx9QC&rdot=1&source=gbs_atb";
			}
		    setTimeout(function(){
		    	r=confirm(t);
		    	if(r==true) window.location.href = u;
		    }, 0);
	    }
	}
	//ATTACH OBJECTS TO WINDOW 
	window.href = href;
	window.p = window.POST = window.post = p;
	}).call(this);

	//INIT
	setTimeout(function(){
		//START NAV MODULE
		p.n();
		//START TOP STORY MODULE
		if( $('#top-story-ctrl').length > 0 ) p.ts();
		//START STORY BLOCK TAB MODULE
		if( $('.story-block-wrap .ctrl').length > 0 ) p.bt();
		//START SECTION BLOCK
		if( $('.datatable_wide, .section_tables').length > 0 ) p.tscroll();
		//START DROPDOWN MODULE
		p.d();
		//START STORY
		if($('#story_tab_comment').length > 0){
			$('#story_tab_comment').on('click',function(){
				$('html, body').animate({scrollTop:$('#story-comments').position().top}, 'slow');
			})
		}
		if($('.story-page.pkg').length > 0 ) p.sp();
		//ALEXA STORY
		p.magStory();
		//START SHARE MODULE
		p.sh();
		//START PHOTO MODULES
		if( $('.gallery-wrap').length > 0 ) p.photo.start();
		if( $( '.photo-list .toggle').length > 0 ) p.photo.init();
		if($('.story-page').length > 0 ) p.photo.storyPhoto();
		//START VIDEO
		if( $('.video-player-wrap').length > 0 ) p.v();
		//START LOCAL
		if($('.local_page').length > 0 ) p.local.start();
		//START BLOG
		if($('.index_page').length > 0 ) p.blogsInit();
		//TEAM TRACKER
		if( $('.team_nav_item').length > 0 ) p.tt();
		//SELECT
		if($('.mr-select').length > 0 ) p.select();
		//SIGN UP
		if( $("#sailthru-submit").length > 0 ) p.su();
		//LOAD IMAGES
		p.photo.loadImage();
		$(window).scroll(function(){
			setTimeout(function(){ p.photo.loadImage(); }, 300);
		});
		//BREAKING NEWS
		if( $("#breaking-news-bar").length > 0 ) p.bn();
		//init columns
		setTimeout(function(){ p.cols(); }, 1000);
		//app download
		p.app_d();
	}, 0)		
});