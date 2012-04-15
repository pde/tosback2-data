//THIS INITS EACH TAB AND FEEDS IT INTO THE MAIN TAB ARRAY
function initTabs(root){
	
	var more_width = 15;
	var is_more = false;
	var running_width = 0;
	var max_width = root.offsetWidth - more_width;
	var more_node = document.createElement('li');
	var more_hover_node = document.createElement('div');
	var outside_width = 375;
	
	for(var i=0;i<tabs.length;i++){
		
		var tab = tabs[i];
		
		if(!is_more){
		
			var li = document.createElement('li');
			var txt = document.createTextNode(tab.name);
			li.appendChild(txt);
			li.className = 'tab_item';
			li.ct = i;
			tabs[i].node = li;
			setUpTab(li);
			root.appendChild(li);
			running_width += li.offsetWidth;
			if(running_width >= max_width){
				running_width -= li.offsetWidth;
				//more_width += li.offsetWidth;
				
				more_width = outside_width - running_width - 1;
				
				root.removeChild(li);
				more_node.className = 'more nav_item last';
				var plus = document.createElement('div');
				var plus_wrap = document.createElement('strong');
				plus_wrap.appendChild(document.createTextNode('+'));
				plus.appendChild(plus_wrap);
				more_node.appendChild(plus);
				is_more = true;
			}
		}
		
		if(is_more){
			var p = document.createElement('p');
			var txt = document.createTextNode(tab.name);
			p.appendChild(txt);
			p.className = 'tab_item';
			p.ct = i;
			tabs[i].node = p;
			setUpTab(p);
			more_hover_node.appendChild(p);
		}
		
	}
	
	if(is_more){
		more_node.style.width = more_width + 'px';
		more_node.style.paddingLeft = '0px';
		more_node.style.paddingRight = '0px';
		more_hover_node.className = 'hover_content vert_nav';
		more_hover_node.id = 'tabNavMore';
		more_node.appendChild(more_hover_node);
		root.appendChild(more_node);
		
	}

}

//SETS THE CURRENT TAB WITH CSS AND GRABS IT'S CONTENT
function setCurrentTab(ct){

	showindicator('tabCont');

	for(var i=0;i<tabs.length;i++){
		var tab = tabs[i];
		var node = tab.node;
		if(i != ct){
			node.className=node.className.replace(" current", "");
			node.className=node.className.replace("current", "");
		}else{
			node.className +=" current";
			loadTab(tab.src,i,tab.handler,tab.settings);
			
		}
	}
}


//SETS UP THE TAB WITH ROLLOVER/ROLLOUT AND CLICK FUNCTIONALITY
function setUpTab(node){
	
	//ON OVER
	node.onmouseover=function() {
		this.className+=" over";
	}
	//ON OUT
	node.onmouseout=function() {
		this.className=this.className.replace(" over", "");
	}
	//ON CLICK
	node.onclick = function() {
		//alert('loading content for ' + this.id);
		//alert(this.ct + "\n" + "\n" + tabs[this.ct].id + "\n" + this.id);
		setCurrentTab(this.ct);
		var record_key = 'TABS|front|' + tabs[this.ct].name;
		//alert(record_key);
		record_click(record_key,'http://www.adn.com/layout/sitewide/front_tabs');
		return false;
	}
	
}

//ACTUALLY LOADS TAB CONTENT INTO MAIN TAB DIV
function loadTab(id,ct,handler,obj){
	
	//var src = id.replace(/tab_/,'') + '.xml';
	var src = id;
	src = src.replace(/:/,'/');

	var args = new Object;
	if(obj != undefined){
		args = obj;	
	}
	args.handler = handler;
	
	if(ct == undefined){
		args.ct = 0;
	}else{
		args.ct = ct;
	}
	

	
	handleXML('tabCont',src,args);
}


function picGallery(xmlDoc,id,argsObj){
	//argsObj.picCt = 5;	
	
	var root = xmlDoc.getElementsByTagName('root').item(0);
	var items = root.getElementsByTagName('item');
	var tab = tabs[argsObj.ct];
	tab.items = items;
	var total_pics = tab.items.length;
	
	if(isNaN(argsObj.picCt)||(argsObj.picCt > (items.length - 1))){
		argsObj.picCt = Math.floor(Math.random()*(items.length));
	}
	
	argsObj.handler = 'stdPic';
	
	
	var galleryId = id + 'PhotoGallery';
			
	var parent = document.getElementById(id);
	parent.innerHTML = '';
	
	var holder = document.createElement('div');
	holder.className = 'std_pic';
	
	var wrap = document.createElement('div');
	wrap.className = 'wrap';
	wrap.id = galleryId;
	
	var controls = document.createElement('div');
	
	
	controls.className = 'controls';
	
	var prev = document.createElement('span');
	prev.className = 'bck';
	var prev_img = document.createElement('img');
	prev_img.src = '/includes/play/assets/cal_prev.gif';
	prev_img.alt = 'Previous image';
	prev_img.height = 10;
	prev_img.width = 10;
	//prev.href= '#';
	//prev.appendChild(document.createTextNode('Previous'));
	prev.appendChild(prev_img);
	prev.onclick = function(){
		showindicator(galleryId);
		var prev_ct = argsObj.picCt - 1;
		if(prev_ct < 0){
			prev_ct = total_pics - 1;
		}
				
		var src = tab.items[prev_ct].getAttribute('src');
		argsObj.picCt = prev_ct;
		handleXML(galleryId,src,argsObj);
		var record_key = 'TABS|front|' + tabs[argsObj.ct].name + '|prev';
		//alert(record_key);
		record_click(record_key,tabs[argsObj.ct].src);
		return false;
	}
	controls.appendChild(prev);
	
	var counter = document.createElement('span');
	counter.appendChild(document.createTextNode(' - '));
	counter.className = 'counter';
	tabs[argsObj.ct].counter = counter;
	
	controls.appendChild(counter);
	
	var next = document.createElement('span');
	next.className = 'fwd';
	var next_img = document.createElement('img');
	next_img.src = '/includes/play/assets/cal_next.gif';
	next_img.alt = 'Next image';
	//next.href = '#';
	//next.appendChild(document.createTextNode('Next'));
	next.appendChild(next_img);
	next.onclick = function(){
		showindicator(galleryId);
		var next_ct = argsObj.picCt + 1;
		if(next_ct >= total_pics){
			next_ct = 0;
		}
		
		argsObj.picCt = next_ct;
		var src = tab.items[next_ct].getAttribute('src');
		handleXML(galleryId,src,argsObj);
		var record_key = 'TABS|Front|' + tabs[argsObj.ct].name + '|next';
		//alert(record_key + ' // ' + tabs[argsObj.ct].src);
		record_click(record_key,tabs[argsObj.ct].src);
		return false;
	}
	
	controls.appendChild(next);
	
	/*var link1 = document.createElement('a');
	link1.href = tab.src.replace(/v-config\/index\.xml/,'v-photo_gallery_0');
	link1.appendChild(document.createTextNode('Full gallery'));
	link1.onclick = function(){
		photo_gallery(this.href);return false;	
	}*/
	
	//controls.appendChild(document.createTextNode(' | '));
	//controls.appendChild(link1);
	
	holder.appendChild(wrap);
	holder.appendChild(controls);
	parent.appendChild(holder);
	
	
	
	
	//grabs the first picture (change the 0 to grab other)
	handleXML(galleryId,items[argsObj.picCt].getAttribute('src'),argsObj);
}


function stdPic(xmlDoc,id,argsObj){
	
	var tab = tabs[argsObj.ct];
	var total_pics = tab.items.length;
	var current_pic = argsObj.picCt + 1;
	var root = xmlDoc.getElementsByTagName('root').item(0);
	var summary_txt = getNodeText(root,'summary');
	var image_src = getNodeAttribute(root,'thumbnail','src');
	var enlarge_link = getNodeAttribute(root,'item','url');
	var more_link = enlarge_link.replace('/gallery/','/v-section_front/gallery/');
	
	var counter_text = document.createTextNode(current_pic + ' of ' + total_pics);
	tab.counter.innerHTML = '';
	tab.counter.appendChild(counter_text);
	
	
	
	var summary = document.createElement('p');
	summary.className = 'summary';
	//summary.appendChild(document.createTextNode(summary_txt));
	summary.innerHTML = new String(summary_txt);
	
	var photo = document.createElement('a');
	photo.href = enlarge_link;

	/*photo.onclick = function(){
		adn_media(this.href);
		return false;
	}*/


	var image = document.createElement('img');
	image.src = image_src;

	
	
	var image_width = getNodeAttribute(root,'thumbnail','width');
	var image_height = getNodeAttribute(root,'thumbnail','height');
	var scale = 1;
	if(image_width > 200){
			scale = 200/image_width;
			if(scale < 1){
				image_width = image_width * scale;
				image_height = image_height * scale;
			}
	}
	
	if(image_height > 150){
			scale = 150/image_height;
			if(scale < 1){
				image_width = image_width * scale;
				image_height = image_height * scale;
			}
	}
	
	
	if(image_width != undefined){
		image.width = image_width;
	}
	
	
	if(image_height != undefined){
		image.height = image_height;
	}
	
	photo.appendChild(image);
	
	var links = document.createElement('p');
	links.className = 'photo_tools';
	
	var link1 = document.createElement('a');
	link1.href = enlarge_link;
	/*link1.onclick = function(){
		adn_media(this.href);
		return false;
	}*/
	link1.appendChild(document.createTextNode('Enlarge photo'));
	links.appendChild(link1);
	
	var link2 = document.createElement('a');
	link2.href = more_link + '&view=thumbs_view';
	link2.appendChild(document.createTextNode('More photos'));
	/*link2.onclick = function(){
		adn_media(this.href);return false;	
	}*/
	links.appendChild(document.createTextNode(' | '));
	links.appendChild(link2);
	
	if(enlarge_link.match('/readersubmitted/')){
		var link3 = document.createElement('a');
		link3.href = enlarge_link;
		link3.appendChild(document.createTextNode('Submit a photo'));
		/*link3.onclick = function(){
			adn_media(this.href);return false;	
		}*/
		//links.appendChild(document.createTextNode(' | '));
		//links.appendChild(link3);
	}
	
	
	
	var pic_wrap = document.createElement('div');
	pic_wrap.className = 'tab_gallery_photo_wrap';
	
	var wrap = document.getElementById(id);	
	
	wrap.innerHTML = '';
	
	pic_wrap.appendChild(photo);
	pic_wrap.appendChild(summary);
	//pic_wrap.appendChild(links);
	wrap.appendChild(pic_wrap);
	wrap.appendChild(links);
	
}

function feature(wrap,root,maxWidth){
	
	var title_txt = getNodeText(root,'title');
	var summary_txt = getNodeText(root,'summary');
	var image_src = getNodeAttribute(root,'photo','src');
	var image_width = getNodeAttribute(root,'photo','width');
	var image_height = getNodeAttribute(root,'photo','height');
	var url = getNodeAttribute(root,'item','url');
	
	var title = document.createElement('p');
	title.className = 'head';
	title_link = document.createElement('a');
	title_link.href = url;
	title_link.appendChild(document.createTextNode(title_txt));
	title.appendChild(title_link);
	
	var summary = document.createElement('p');
	summary.className = 'summary';
	//summary.appendChild(document.createTextNode(summary_txt));
	summary.innerHTML = new String(summary_txt);
	
	var photo = document.createElement('a');
	photo.href = url;
	
	if(url.match('/video')||url.match('/vmix/')){
		//var pop_width = 830;
		//var pop_height = 780;
		
		photo.onclick = function(){
			adn_media(this.href);
			return false;
		}
		
		title_link.onclick = function(){
			adn_media(this.href);
			return false;
		}
	}else if(url.match('v-swf')||url.match('/slideshows/')||url.match('/plain/')||url.match('=plain/')){
		photo.onclick = function(){
			adn_media(this.href);
			return false;
		}
		
		title_link.onclick = function(){
			adn_media(this.href);
			return false;
		}		
	}



	var image = document.createElement('img');
	image.src = image_src;
	
	if(maxWidth != undefined && image_width != undefined && image_height != undefined){
		if(image_width > maxWidth){	
			scale = maxWidth/image_width;
			if(scale < 1){
				image_width = image_width * scale;
				image_height = image_height * scale;
			}		
		}
		
	}

	
	
	if(image_width != undefined){
		image.width = image_width;
	}
	
	if(image_height != undefined){
		image.height = image_height;
	}
	
	photo.appendChild(image);
	
	wrap.innerHTML = ''
	wrap.appendChild(title);
	wrap.appendChild(photo);
	wrap.appendChild(summary);
	
}


function featureOneColumn(xmlDoc,id,argsObj){
	
	var root = xmlDoc.getElementsByTagName('root').item(0);
	var wrap = document.getElementById(id);
	
	feature(wrap,root);
	
}


function featureTwoColumn(xmlDoc,id,argsObj){
	
	var root = xmlDoc.getElementsByTagName('root').item(0);
	var wrap = document.getElementById(id);
	var column_holder = document.createElement('div');
	column_holder.className = 'two_column';
	var column_wrap= document.createElement('div');
	column_wrap.className = 'wrap';
	var items = root.getElementsByTagName('item');
	for(var i=0;i<2;i++){
		var column = document.createElement('div');
		column.className = 'block';
		if(i < 1){
			column.className += ' left_col';
		}else{
			column.className += ' right_col';
		}
		var item = items[i];
		feature(column,item,177);
		column_wrap.appendChild(column);
	}
	column_holder.appendChild(column_wrap);
	wrap.innerHTML = '';
	wrap.appendChild(column_holder);
	
}


function featureThreeColumn(xmlDoc,id,argsObj){
	
	var root = xmlDoc.getElementsByTagName('root').item(0);
	var wrap = document.getElementById(id);
	var column_holder = document.createElement('div');
	column_holder.className = 'three_column';
	var column_wrap= document.createElement('div');
	column_wrap.className = 'wrap';
	var items = root.getElementsByTagName('item');
	for(var i=0;i<3;i++){
		var column = document.createElement('div');
		column.className = 'block';
		if(i < 1){
			column.className += ' first';
		}else if(i > 1){
			column.className += ' last';
		}
		
		var item = items[i];
		feature(column,item,120);
		column_wrap.appendChild(column);
	}
	column_holder.appendChild(column_wrap);
	wrap.innerHTML = '';
	wrap.appendChild(column_holder);
	
}

function twoColumnHeds(xmlDoc,id,argsObj){
	
	var root = xmlDoc.getElementsByTagName('root').item(0);
	var wrap = document.getElementById(id);
	var column_holder = document.createElement('div');
	column_holder.className = 'two_column scores';
	var column_wrap= document.createElement('div');
	column_wrap.className = 'wrap';
	var items = root.getElementsByTagName('column');
	for(var i=0;i<2;i++){
		var column = document.createElement('div');
		column.className = 'block';
		if(i < 1){
			column.className += ' left_col';
		}else{
			column.className += ' right_col';
		}
		var item = items[i];
		
		//COLUMN TITLE
		
		var title_txt = getNodeText(item,'title');
		var title_url = getNodeAttribute(item,'title','url');	
		
		var title = document.createElement('p');
		title.className = 'title';
		if(title_url){
			title_link = document.createElement('a');
			title_link.href = title_url;
			title_link.appendChild(document.createTextNode(title_txt));
			title.appendChild(title_link);
		}else{
			title.appendChild(document.createTextNode(title_txt));
		}
		
		column.appendChild(title);
		//END COLUMN TITLE
		
		//NOW ITERATE THROUGH ITEMS
		var heds = item.getElementsByTagName('item');
		for(var j=0;j<heds.length;j++){
			var hed_wrap = document.createElement('div');
						
			var hed = heds[j];
			var label_txt = getNodeText(hed,'label');
			if(label_txt.length > 0){
				var label = document.createElement('p');
				label.className='label';
				label.appendChild(document.createTextNode(label_txt));
				hed_wrap.appendChild(label);
			}
			
			var txt = getNodeText(hed,'headline');
			var url = getNodeAttribute(hed,'item','url');
			if(txt.length > 0 && url.length > 0){
				var headline = document.createElement('p');
				headline.className='headline';
				var headline_link = document.createElement('a');
				headline_link.href = url;
				headline_link.appendChild(document.createTextNode(txt));
				
				var timestamp = document.createElement('span');
				var ss = getNodeAttribute(hed,'item','update');
				timestamp.appendChild(document.createTextNode(' ' + getBreakingText(ss,12)));
				timestamp.className = 'minor';
				headline.appendChild(headline_link);
				headline.appendChild(timestamp);
				hed_wrap.appendChild(headline);
			}
			
			column.appendChild(hed_wrap);
			
		}
		
		//END ITERATE THROUGH ITEMS
				
		column_wrap.appendChild(column);
	}
	//END ITERATE THROUGH COLUMNS
	
	//START NAVIGATION
	var navs = root.getElementsByTagName('navigation');
	if(navs){
		var nav = navs[0];
		var items = nav.getElementsByTagName('item');
		var nav_wrap = document.createElement('p');
		nav_wrap.className = 'links_horizontal';
		for(var i=0;i<items.length; i++){
			var node = items[i];
			var url = getNodeAttribute(node,'item','url');
			var txt = getNodeText(node,'headline');
			var nav_link = document.createElement('a');
			nav_link.href = url;
			nav_link.appendChild(document.createTextNode(txt));
			if(i > 0){
				nav_wrap.appendChild(document.createTextNode(' | '));
			}
			nav_wrap.appendChild(nav_link);
			
		}
		column_wrap.appendChild(makeClear());
		column_wrap.appendChild(nav_wrap);
	}
	//END NAVIGATION
	column_holder.appendChild(column_wrap);
	wrap.innerHTML = '';
	wrap.appendChild(column_holder);
	
}


function makeClear(){
	var clear = document.createElement('div');
	clear.className = 'clearing';
	return clear;
}


	


function topContent(xmlDoc,id,argsObj){
	
	var tab = tabs[argsObj.ct];
	var parent = document.getElementById(id);
	
	
	var holder = document.createElement('div');
	holder.className = 'three_column';
	
	var wrap = document.createElement('div');
	wrap.className = 'wrap';
		
	var root = xmlDoc.getElementsByTagName('root').item(0);

	//var hed = document.createElement('p');
	//hed.appendChild(document.createTextNode('Most viewed content'));
	//hed.className = 'lead_headline';
	
	var nodes = new Array({nodeName:'stories',title:'Top stories',tot:3},{nodeName:'photos',title:'Top galleries',tot:5},{nodeName:'email',title:'Most emailed',tot:3});	
	
	for(var i=0;i<nodes.length;i++){
		
		var nodeName = nodes[i].nodeName;
		var title_txt = document.createTextNode(nodes[i].title);
		
		var par = root.getElementsByTagName(nodeName)[0];
		var heds = par.getElementsByTagName('item');
		
		var title = document.createElement('p');
		title.appendChild(title_txt);
		title.className = 'lead_headline';
		
		var tot = nodes[i].tot;
		
		var col = document.createElement('div');
		col.className = 'block';
		
		col.appendChild(title);
		
		if(i == nodes.length - 1){
			col.className +=' last';	
		}else if(i == 0){
			col.className +=' first';	
		}
		
		for(var j=0;j<heds.length && j<tot;j++){
			var hed = heds[j];
			
			var graf = document.createElement('p');
			graf.className = 'headline';
			
			var a = document.createElement('a');
			a.href = hed.getAttribute('url');
			a.appendChild(document.createTextNode(hed.firstChild.nodeValue));
			
			
			graf.appendChild(a);
			
			col.appendChild(graf);
			
		}
		
		wrap.appendChild(col);
		
	}
	
	wrap.appendChild(makeClear());
	
	var update = document.createElement('p');
	update.appendChild(document.createTextNode('Last update : ' + root.getAttribute('update')));
	update.className = 'note';
	
	holder.appendChild(wrap);
	holder.appendChild(update);
	
	parent.innerHTML = '';
	parent.appendChild(holder);
}

function showHeds(xmlDoc,id,args){
	
	var root = xmlDoc.getElementsByTagName('channel').item(0);
	var items = root.getElementsByTagName('item');
	var mainlink = root.getElementsByTagName('link').item(0).firstChild.nodeValue;
	var maintitle = document.getElementById(id.replace('SubHeads','Nav')).getElementsByTagName('a').item(0).firstChild.nodeValue;
	
	var limit = 5;
	
	if(items.length < limit){
		limit = items.length;	
	}
	
	var ulist = document.getElementById(id);
	ulist.innerHTML = '';
	
	
	
	var title = document.createElement('p');
	title.className = 'link_list_title';
	title.style.paddingBottom = '3px';
	title.style.marginBottom = '0px';
	var title_link = document.createElement('a');
	title_link.href = mainlink;
	title_link.appendChild(document.createTextNode(maintitle + ' section'));
	title.appendChild(title_link);
	ulist.appendChild(title);
	
	
	for (var i = 0 ; i < limit ; i++) {
		
		var tag = items[i];
		
		//var layout = tag.getElementsByTagName("layout")[0].firstChild.nodeValue;
		var storytitle = tag.getElementsByTagName("title")[0].firstChild.nodeValue;
		var storylink = tag.getElementsByTagName("link")[0].firstChild.nodeValue;
		//var storydesc = tag.getElementsByTagName("description")[0].firstChild.nodeValue;
		
		//set layout by tag 
		//if (layout == ""){ var target = "";
		
		
		//var submenu = document.createElement('div');
			
		var story_row = document.createElement('p');
		
		story_row.className = 'headline';
		
		var newText = document.createTextNode(storytitle);
		
		
		
		
		var story_link=document.createElement('a');
		
		story_link.setAttribute('href', storylink);
		
		story_link.appendChild(newText);
		story_row.appendChild(story_link);
		
		
		var last_update = getNodeAttribute(tag,'item','update');
		var breaking = getNodeAttribute(tag,'item','breaking');
		
		if(breaking == 'true'){
			if(!breaking.match(/undef/)){
				var breaking_text = getBreakingText(last_update);
				if(breaking_text){
					var breaking_span = document.createElement('span');
					breaking_span.className = getBreakingClass(last_update);
					breaking_span.appendChild(document.createTextNode('  ' + breaking_text));
					story_row.appendChild(breaking_span);
				}
			}
		}
		
		
		
		//submenu.appendChild(story_row);
		//var SubClass = "subclass";
		//submenu.className = SubClass;
		ulist.appendChild(story_row);
	
	}
	
	
	/*var more = document.createElement('p');
	more.className = 'headline';
	var more_link = document.createElement('a');
	more_link.style.fontWeight = 'bold';
	more_link.href = mainlink;
	more_link.appendChild(document.createTextNode('More headlines'));
	more.appendChild(more_link);
	ulist.appendChild(more);*/

}


function videoPlayer(xmlDoc,id,args){
	//onclick="popup_sized_scroll(this.href,830,780);return false;"
	var pop_width = 830;
	var pop_height = 780;
	
	var vid_width = 240;
	
	if(args.width){
		vid_width = args.width;	
	}
	
	var vid_height = 188;
	
	
	var wrap = document.getElementById(id);
	
	var root = xmlDoc.getElementsByTagName('root').item(0);
	
	var title_txt = getNodeText(root,'title');
	var summary_txt = getNodeText(root,'summary');
	var video_token = getNodeAttribute(root,'video','token');
	var url = 'http://community.adn.com/mini_apps/vmix/player.php';
	
	var isReelTime = false;
	
	if(title_txt.match('reelalaska')){
		isReelTime = true;	
	}
	
	var video_id = getNodeAttribute(root,'video','id');
	if(video_id.match(/\d+/)){
		url +='?ID=' + video_id;	
	}
	
	var group_ids = getNodeAttribute(root,'video','groups');
	if(group_ids && group_ids.match(/\d+/)){
		url +='&GID=' + group_ids;	
	}
	
	var genre_ids = getNodeAttribute(root,'video','genres');
	if(group_ids && genre_ids.match(/\d+/)){
		url +='&GENRES=' + genre_ids;	
	}
	
	if(title_txt.match('img:')){
		var title_url = url;
		if(isReelTime){
			title_url = '/video';
		}
		var title = document.createElement('a');
		title.href=title_url;
		var title_img = document.createElement('img');
		title_img.src = title_txt.replace('img:','');
		title.appendChild(title_img);
		title.onclick = function(){
			popup_vmix(this.href)
			showVid();
			return false;
		}

	}else{
		var title = document.createElement('p');
		title.className = 'head';
		title_link = document.createElement('a');
		title_link.href = url;
		title_link.appendChild(document.createTextNode(title_txt));
		title_link.onclick = function(){
			popup_vmix(this.href)
			showVid();
			return false;
		}
		title.appendChild(title_link);
	}
	
	var summary = document.createElement('p');
	summary.className = 'summary';
	//summary.appendChild(document.createTextNode(summary_txt));
	summary.innerHTML = new String(summary_txt);
	
	var player = document.createElement('div');
	player.className = 'video_player';
	
	if(isReelTime){
		player.className +=' promo_player';	
	}
	
	var links = document.createElement('p');
	links.className = 'photo_tools';
	
	
	if(isReelTime){
		var link3 = document.createElement('b');
		var link3_link = document.createElement('a');
		link3_link.href= '/video';
		link3_link.onclick = function(){
			popup_vmix(this.href)
			showVid();
			return false;
		}
		link3_link.appendChild(document.createTextNode('Vote on your favorites'));
		link3.appendChild(link3_link);
		links.appendChild(link3);
		links.appendChild(document.createTextNode(' | '));
	}	
	
	
	var link1 = document.createElement('a');
	link1.href = url;
	link1.onclick = function(){
		popup_vmix(this.href)
		showVid();
		return false;
	}
	link1.appendChild(document.createTextNode('Enlarge video'));
	links.appendChild(link1);

	var link2 = document.createElement('a');
	link2.href = '/video';
	link2.appendChild(document.createTextNode('More video'));
	link2.onclick = function(){
		popup_vmix(this.href)
		showVid();
		return false;
	}
	links.appendChild(document.createTextNode(' | '));
	links.appendChild(link2);
	
	var link3 = document.createElement('a');
	link3.href = 'http://www.adn.com/cgi-bin/apps/vmix/form.php';
	link3.appendChild(document.createTextNode('Submit your own video'));
	link3.onclick = function(){
		popup_vmix(this.href)
		showVid();
		return false;
	}
	links.appendChild(document.createTextNode(' | '));
	links.appendChild(link3);
	
	
	
	/*var video = '<object width="200" height="157">';
	video += '<param name="movie" value="http://media.vmixcore.com/player/' + video_token + '/player.swf"></param>';
	video += '<param name="wmode" value="transparent"></param>';
	video += '<embed src="http://media.vmixcore.com/player/'+ video_token +'/player.swf" width="200" height="157" FlashVars="pre_roll_url=&post_roll_url=&pre_roll=&post_roll=&auto_play=false&token='+ video_token +'&debug=&ref=adn-drupal-default.apps.prod.nandomedia.com/mini_apps/vmix/AdminPlayer.php?"/>';
	video += '</object>';*/
	
	var autoplay = 'false';
	
	var ref = 'http://www.adn.com';
	if(args.ct){
		ref += '/front/tab' + args.ct;	
	}
	
	function showVid(){
	
	var video = '<object id="player_swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="240" height="188" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="http://cdn-akm.vmixcore.com/core-flash/UnifiedVideoPlayer/UnifiedVideoPlayer.swf?player_id=1b46d84972003656d7ea292fc5d80122"></param><param name="allowScriptAccess" value="always"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="transparent"></param><param name="flashVars" value="player_id=1b46d84972003656d7ea292fc5d80122&services_url=http://cdn-akm.vmixcore.com/core-flash/UnifiedVideoPlayer/services.xml&env=&token='+token+'"/></param> <embed name="player_swf" src="http://cdn-akm.vmixcore.com/core-flash/UnifiedVideoPlayer/UnifiedVideoPlayer.swf?player_id=1b46d84972003656d7ea292fc5d80122" width="240" height="188" allowScriptAccess="always" allowFullScreen="true" wmode="transparent" type="application/x-shockwave-flash" flashvars="player_id=1b46d84972003656d7ea292fc5d80122&services_url=http://cdn-akm.vmixcore.com/core-flash/UnifiedVideoPlayer/services.xml&env=&token='+token+'" swliveconnect="true" pluginspage="http://www.adobe.com/go/getflashplayer"></embed></object>';

	
		
		player.innerHTML = video;
		
	}
	
		
	
	
	showVid();
	
		
	wrap.innerHTML = '';
	wrap.appendChild(player);
	wrap.appendChild(title);
	wrap.appendChild(summary);
	wrap.appendChild(makeClear());
	wrap.appendChild(links);
	
}



function apVideoList(id,list,total){
	var wrap = document.getElementById(id);
	for(var i=0;i<total && i<list.length;i++){
		var obj = list[i];
		var item_wrap = document.createElement('div');
		item_wrap.className = 'ts2_standard_small';
		
		var photo = document.createElement('a');
		var img = document.createElement('img');
		img.src = obj.photo;
		img.width = 60;
		img.height = 43;
		photo.href = obj.url;
		photo.onclick = function(){
			popup_ap_video(this.href);
			return false;
		}
		photo.appendChild(img);
		
		var title = document.createElement('h6');
		title.className = 'head';
		var title_link = document.createElement('a');
		title_link.href=obj.url;
		title_link.onclick = function(){
			popup_ap_video(this.href);
			return false;
		}
		
		title_link.appendChild(document.createTextNode(obj.headline));
		title.appendChild(title_link);
		
		var summary = document.createElement('p');
		summary.className = 'summary';
		//summary.appendChild(document.createTextNode(obj.summary));
		summary.innerHTML = new String(summary_txt);
		
		item_wrap.appendChild(photo);
		item_wrap.appendChild(title);
		
		//item_wrap.appendChild(summary);
		item_wrap.appendChild(makeClear());
		wrap.appendChild(item_wrap);
	}
}

function headlineList(id,list,total){
	var wrap = document.getElementById(id);
	for(var i=0;i<total && i<list.length;i++){
		var obj = list[i];
		
		
		var title = document.createElement('p');
		title.className = 'headline';
		var title_link = document.createElement('a');
		title_link.href=obj.url;
		title_link.target = '_blank';
		
		title_link.appendChild(document.createTextNode(obj.headline));
		title.appendChild(title_link);
		
		wrap.appendChild(title);
	}
}

function loadHTML(xmlDoc,id,argsObj){
	if(document.getElementById(id)){
		document.getElementById(id).innerHTML = xmlDoc;
	}
}

function loadHTML2(xmlDoc,id,argsObj){
	if(document.getElementById(id)){
		document.getElementById(id).innerHTML = xmlDoc;
		document.getElementById(id).style.visibility = 'visible';
		document.getElementById(id).style.height = 'auto';
	}
}

function createTabs(id,param,selected){
	
	var root = document.getElementById(id);
	var menu = document.createElement('ul');
	menu.className = 'menu';
	var content = document.createElement('div');
	content.id = id + 'Inner';
	content.className = 'tab_content';
	
	var tabs = new Array();
	
	for(var i=0;i<param.length;i++){

		var li = document.createElement('li');
		if(i < 1){
			li.className = 'first';	
		}
		if(i == param.length - 1){
			li.className = 'last';
		}
		//li.appendChild(document.createTextNode(param[i].name));
		li.innerHTML = param[i].name;
		li.ind = i;
		tabs[i] = li;
		li.onclick = function(){
			activateTab(this.ind);
			var rn = param[this.ind].name;
			if(rn.match('<span>')){
				rn = rn.replace(/.*<span>/,'');
				rn = rn.replace(/<\/span>.*/,'');
				//alert(rn);
			}
			var record_key = 'TABS|' + id.replace('Tabs','') + '|' + rn;
			record_click(record_key,param[this.ind].src);
			//alert(record_key + ' // ' + param[this.ind].src);
		}
		
		menu.appendChild(li);
	}
	
	
	menu.appendChild(makeClear());
	root.appendChild(makeClear());
	root.appendChild(menu);
	root.appendChild(content);
	
	function activateTab(ind){
		

		
		var hndl = 'loadHTML2';
		if(param[ind].handler){
			hndl = param[ind].handler;	
		}else{
			document.getElementById(content.id).style.height = document.getElementById(content.id).offsetHeight + 'px';
			showindicator(content.id);			
		}
		
		handleXML(content.id,param[ind].src,{handler:hndl});
		for(var i=0;i<tabs.length;i++){
			tabs[i].className = tabs[i].className.replace(' on','');
			tabs[i].className = tabs[i].className.replace('on','');
		}
		tabs[ind].className += ' on';

	}
	
	
	if(isNaN(selected)||(selected > (param.length - 1))){
		selected = Math.floor(Math.random()*(param.length));
	}
	
	activateTab(selected);
	
}
