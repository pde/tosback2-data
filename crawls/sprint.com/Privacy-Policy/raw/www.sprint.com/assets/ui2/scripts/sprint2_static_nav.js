var sprintLegacyNav={
		ieVersion:(function(){
			var nav_isIE=((typeof window.ActiveXObject!="undefined") && (navigator.appVersion.indexOf('MSIE')!=-1));
			if(nav_isIE){
				return parseInt(navigator.appVersion.substring(navigator.appVersion.indexOf('MSIE')+4));
			}
			else{
				return 0;
			}
		})(),
		doIEMouseEnter:function(el){
			if(sprintLegacyNav.ieVersion>0){
				if(sprintLegacyNav.permNode!==el){
					if(sprintLegacyNav.ieVersion===6){
						sprintLegacyNav.addClass(el,'over');
					}
					sprintLegacyNav.unsetPermNode(el);
				}
			}
		},
		doIEMouseLeave:function(el){
			if(sprintLegacyNav.ieVersion>0){
				if(sprintLegacyNav.permNode!==el){
					if(sprintLegacyNav.ieVersion===6){
						sprintLegacyNav.removeClass(el,'over');
					}
					sprintLegacyNav.resetPermNode(el);
				}
			}
		},
		doMouseOver:function(el){
			if(sprintLegacyNav.ieVersion==0){
				if(sprintLegacyNav.permNode!==el){
					sprintLegacyNav.unsetPermNode(el);
				}
			}
		},
		doMouseOut:function(el){
			if(sprintLegacyNav.ieVersion==0){
				if(sprintLegacyNav.permNode!==el){
					sprintLegacyNav.resetPermNode(el);
				}
			}
		},
		addClass:function(el,className){
			el.className=el.className+' '+className;
		},
		removeClass:function(el,className){
			el.className=el.className.replace(new RegExp('(^|\\s)('+className+')(\\s|$)'),'');
		},
		unsetPermNode:function(el){
			if(sprintLegacyNav.permNode===null){
				sprintLegacyNav.getPermNode(el);
			}
			if(sprintLegacyNav.permNode!=='' && sprintLegacyNav.permNode!==el){
				sprintLegacyNav.removeClass(sprintLegacyNav.permNode,'selected');
			}
		},
		resetPermNode:function(el){
			if(sprintLegacyNav.permNode===null){
				sprintLegacyNav.getPermNode(el);
			}
			if(sprintLegacyNav.permNode!=='' && sprintLegacyNav.permNode!==el){
				sprintLegacyNav.addClass(sprintLegacyNav.permNode,'selected');
			}
		},
		getPermNode:function(el){
			var p=el.parentNode;
			var ch=p.childNodes;
			var ln=ch.length;
			for(var x=0; x<ln; x++){
				if(ch[x].nodeType===1){
					if(ch[x].className.match(/(^|\s)(selected)(\s|$)/)!=null){
						sprintLegacyNav.permNode=ch[x];
						return;
					}
				}
			}
			sprintLegacyNav.permNode='';			
		},
		positionSubs:function(){
			var nav=document.getElementById('navGlobal');
			if(nav){
				var ch=nav.childNodes;
				var mWid=0;
				for(var x=0; x<ch.length; x++){
					if(ch[x].nodeType===1){	
						if(document.defaultView){
							var d=document.defaultView.getComputedStyle(ch[x],null);
							mWid+=Math.round(parseFloat(d.getPropertyValue('width')));
						}
						else{
							mWid+=ch[x]["offsetWidth"];
						}
					}
				}
				for(var x=0; x<ch.length; x++){
					if(ch[x].nodeType===1){
						var wid=ch[x]["offsetWidth"];
						var left=ch[x]["offsetLeft"];
						var sNav=ch[x].getElementsByTagName('ul')[0];
						if(sNav){
							var sWid=sNav["offsetWidth"];
							if(sprintLegacyNav.ieVersion>0 && sprintLegacyNav.ieVersion<7){
								var nds=sNav.getElementsByTagName('li');
								sWid=0;
								for(var y=0; y<nds.length; y++){
									sWid+=nds[y]['offsetWidth'];
								}
								sNav.style.width=sWid;
							}
							if(sWid>mWid||left==0||sWid>(left+wid)){
								sNav.style.left=0;
							}		
							if((mWid-(wid+left)<left && sWid<mWid)){
								sNav.style.left=(mWid-sWid)+'px';
							}
							
						}						
					}
				}
			}
		},
		setup:function(){
			for(var x=0; x<arguments.length; x++){
				var nd=document.getElementById(arguments[x]);
				if(nd){
					sprintLegacyNav.addClass(nd,'selected');
				}
			}
			if(/WebKit/i.test(navigator.userAgent)){
				document.addEventListener('DOMContentLoaded',sprintLegacyNav.positionSubs,false);
				window.addEventListener('load',sprintLegacyNav.positionSubs,false);
			}
			else{
				sprintLegacyNav.positionSubs();
			}				
		},
		permNode:null
	};