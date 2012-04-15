function makeHovers(id){
	if (document.all&&document.getElementById&&document.getElementById(id)) {
		navRoot = document.getElementById(id);
		for (var i=0; i<navRoot.childNodes.length; i++) {
			var node = navRoot.childNodes[i];
			if(node.className){
				if (node.className.match("nav_item")) {
					node.onmouseover=function() {
						this.className+=" over";
						
						var sel=document.getElementsByTagName('select');
						for( var x = 0; sel[x]; x++ ) {
							if(sel[x].id!='mainSearchSel'){
								sel[x].style.visibility='hidden';
							}
						}
						/*var ifr=document.getElementsByTagName('iframe');
						for( var x = 0; ifr[x]; x++ ) {
							ifr[x].style.visibility='hidden';
						}*/						
						
					}
					
					node.onmouseout=function() {
						this.className=this.className.replace(" over", "");
						
						var sel=document.getElementsByTagName('select');
						for( var x = 0; sel[x]; x++ ) {
							sel[x].style.visibility='visible';
						}
						/*var ifr=document.getElementsByTagName('iframe');
						for( var x = 0; ifr[x]; x++ ) {
							ifr[x].style.visibility='visible';
						}*/
					}
					
				}
			}
		}
		
	}
}


function startList(id){
	var isLame = false;
	if (document.all&&document.getElementById) {
		isLame = true;	
	}
	
	navRoot = document.getElementById(id);
	for (var i=0; i<navRoot.childNodes.length; i++) {
		var node = navRoot.childNodes[i];
		if(node.className){
				
			//GET THE URL FOR THIS NODE
			for(var j=0;j<node.childNodes.length;j++){
				if(node.childNodes[j].nodeName == 'DIV'){
					var c1 = node.childNodes[j];
					for(var k=0;k<c1.childNodes.length;k++){
						var c2 = c1.childNodes[k];
						if(c2.nodeName == 'A'){
							node.url = c2.href;;
						}
					}
				}
			}
			
			
			if (node.className.match("nav_item")) {
				
				node.onmouseover=function() {
					
					if(isLame){
						this.className+=" over";
						
						var sel=document.getElementsByTagName('select');
						for( var x = 0; sel[x]; x++ ) {
							if(sel[x].id!='mainSearchSel'){
								sel[x].style.visibility='hidden';
							}
						}
						
						/*var ifr=document.getElementsByTagName('iframe');
						for( var x = 0; ifr[x]; x++ ) {
							ifr[x].style.visibility='hidden';
						}*/
						
					}
					
					if(!this.isDone && !this.className.match('no_heads')){
						
						
						var menu = this.id.replace('Nav','SubHeads');
						

						
						
						if(this.url){
							
							if(this.className.match('content')){
								
								var url = this.url.replace(/index.html/,'') + 'v-side_gallery/index.html';
								showindicator(menu,'Loading content ...');
								handleXML(menu,url,{handler:'loadHTML'});
							}else{
							
								var url = this.url + '/index.xml'					
								if(url && menu && document.getElementById(menu)){
									//makeRequest_stories(menu,url);
									showindicator(menu,'Loading headlines ...');
									handleXML(menu,url,{handler:'showHeds'});
								}
							
							}
						}
						
					}
					
					this.isDone = true;
					
				}
				
				//mouseout
				if(isLame){
					node.onmouseout=function() {
						this.className=this.className.replace(" over", "");
						var sel=document.getElementsByTagName('select');
						for( var x = 0; sel[x]; x++ ) {
							sel[x].style.visibility='visible';
						}
						/*var ifr=document.getElementsByTagName('iframe');
						for( var x = 0; ifr[x]; x++ ) {
							ifr[x].style.visibility='visible';
						}*/
					}
				}
			}
		}
	}
	
	assignClickTags(navRoot,'PRIMARY_NAV');
	
	

}

function assignClickTags(root,id){
	if(root.getElementsByTagName){
		var links = root.getElementsByTagName('a');
		var root_id;
		if(id){
			root_id = id + '|';
		}
		var cur_id='';
		for(var i=0;i < links.length; i++){
			var cur_link = links[i];
			
			if(cur_link.parentNode.nodeName == 'DIV'){
				cur_id = cur_link.firstChild.nodeValue.toLowerCase();
				cur_link.parent_id = '';
			}else{
				cur_link.parent_id = cur_id + '|';	
			}
			
			cur_link.onclick = function(){
				var name = this.innerHTML;//this.firstChild.nodeValue;
				name = name.replace(/&nbsp;|\s/g,'');
				name = name.replace(/\/|\:|-|\'/g,'');
				name = root_id + this.parent_id + name.toLowerCase();
				record_click(name,this.href);
				//should handle popups for rollover nav items
				if(this.href.match(/gallery|plain\/|swf\//)){
					adn_media(this.href);
					return false;
				}
			}
		}
	}
}
