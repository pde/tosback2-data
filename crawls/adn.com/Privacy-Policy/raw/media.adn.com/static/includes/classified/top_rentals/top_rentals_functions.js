var tr_current = Math.floor ( Math.random ( ) * adn_tr_listing.length );

function adn_tr_title()
	{
		var tr_title = document.getElementById('adn_tr_title');

		for(var x=0;x<adn_tr_company.length;x++)
			{
				var tr_advertiser = adn_tr_company[x];
				var tr_adv_p = document.createElement('h4');
				var tr_adv_a = document.createElement('a');
				tr_adv_a.href = tr_advertiser.adn_tr_link;
				tr_adv_a.onclick  = function(){
					var rkey = 'TOP_RENTALS|' + this.innerHTML;
					var ref = this.href;
					//alert(rkey + ' / ' + ref);
					record_click(rkey,ref);
				}
				var tr_adv_txt = document.createTextNode(tr_advertiser.adn_tr_name);
				tr_adv_a.appendChild(tr_adv_txt);
				tr_adv_p.appendChild(tr_adv_a);
				tr_title.appendChild(tr_adv_p);	
			
				
				var tr_more_link = document.createElement('a');
				tr_more_link.onclick  = function(){
					var rkey = 'TOP_RENTALS|' + this.innerHTML;
					var ref = this.href;
					//alert(rkey + ' / ' + ref);
					record_click(rkey,ref);
				}
				
				tr_more_link.href = tr_advertiser.adn_tr_link;
				var tr_more_txt = document.createTextNode('more');
				var tr_more_p = document.createElement('p');
				tr_more_link.appendChild(tr_more_txt);
				tr_more_p.appendChild(tr_more_link);
				tr_title.appendChild(tr_more_p);
			}
	}
	
function load_tr_rental()
	{
		var tr_rental = document.getElementById('adn_toprentals');
		tr_rental.className = 'th';
		tr_rental.style.display = 'block';
		
		
		if (tr_current >= adn_tr_listing.length)
			{
				var trrental = adn_tr_listing[0]
				tr_current = 1
			}
		else
			{
			
				var trrental = adn_tr_listing[tr_current]
				tr_current++
			}

		tr_rental.innerHTML = '';

		var tr_img_a = document.createElement('a');
		tr_img_a.href = 'http://' + trrental.adn_tr_url;
		tr_img_a.onclick = function(){
					record_click('TOP_RENTALS|' + trrental.adn_tr_info1,this.href);	
					}
		
		var tr_img = document.createElement('img');
		tr_img.src = 'http://media.adn.com/images/top_rentals' + trrental.adn_tr_image;
		tr_img.className = 'main';
		tr_img_a.appendChild(tr_img);
		tr_rental.appendChild(tr_img_a);
		
		var tr_p = document.createElement('p');
		tr_p.className = 'pf_head';
		var tr_a = document.createElement('a');
		tr_a.href = 'http://' + trrental.adn_tr_url;
		tr_a.onclick = function(){
					record_click('TOP_RENTALS|' + trrental.adn_tr_info1,this.href);	
					}
		var tr_txt1 = document.createTextNode(trrental.adn_tr_info1);
		tr_a.appendChild(tr_txt1);
		tr_p.appendChild(tr_a);
		tr_rental.appendChild(tr_p);
	
		var tr_p = document.createElement('p');
		tr_p.className = 'pf_desc';
		var tr_a = document.createElement('a');
		tr_a.href = 'http://' + trrental.adn_tr_url;
		tr_a.onclick = function(){
					record_click('TOP_RENTALS|' + trrental.adn_tr_info1,this.href);	
					}
		var tr_txt2 = document.createTextNode(trrental.adn_tr_info2);
		tr_a.appendChild(tr_txt2);
		tr_p.appendChild(tr_a);
		tr_rental.appendChild(tr_p);
		
		var tr_p = document.createElement('p');
		tr_p.className = 'pf_head';
		var tr_a = document.createElement('a');
		tr_a.href = 'http://' + trrental.adn_tr_url;
		var tr_txt1 = document.createTextNode(trrental.adn_tr_info3);
		tr_a.appendChild(tr_txt1);
		tr_p.appendChild(tr_a);
		tr_rental.appendChild(tr_p);
				
		var tr_flipper = document.createTextNode(tr_current + ' of ' + adn_tr_listing.length);
		tr_rentalflip(tr_flipper);
	}
		
function tr_rentalflip(tr_flipper)
	{
		var tr_flip = document.getElementById('adn_tr_flipper');
	
		tr_flip.innerHTML = '';
		
		var tr_imgflp_a = document.createElement('a');
		tr_imgflp_a.style.cursor = 'pointer';
		tr_imgflp_a.onclick = function(){
			load_tr_rental();
			var rkey = 'TOP_RENTALS|' + adn_tr_listing[tr_current - 1].adn_tr_info1 + '|next';
			var ref = adn_tr_listing[tr_current - 1].adn_tr_url;
			//alert(rkey + ' // ' + ref);
			record_click(rkey,ref);			
		}
		
		var tr_rentalflip_p = document.createElement('span');
		tr_rentalflip_p.appendChild(tr_flipper);
		tr_flip.appendChild(tr_rentalflip_p);
	
		var tr_imgflp = document.createElement('img');
		tr_imgflp.src = 'http://media.adn.com/includes/play/assets/cal_next.gif';
		tr_imgflp.alt = 'Next listing';
		tr_imgflp.title = 'Next listing';
		tr_imgflp_a.appendChild(tr_imgflp);
		tr_flip.appendChild(tr_imgflp_a);
		

	}
	
function adn_tr_rentalscape()
	{
		var tr_scape = document.getElementById('adn_tr_rentalscape');
		
		var scape_img_a = document.createElement('a');
		scape_img_a.href = 'http://rentals.adn.com/';
		var scape_img = document.createElement('img');
		scape_img.className = 'class_logo';
		scape_img.src = 'http://media.adn.com/includes/assets/images/apts_logo.gif';
		scape_img_a.appendChild(scape_img);
		tr_scape.appendChild(scape_img_a);
		
		scape_img_a.onclick=function(){
			var rkey = 'TOP_RENTALS|rentals_page';
			var ref = 'http://rentals.adn.com';
			record_click(rkey,ref);		
		}
	}

function adn_tr_links()
	{
		var tr_links = document.getElementById('adn_tr_links');
	
		var tr_links1_p = document.createElement('p');
		tr_links1_p .className = 'links_horz';
		var tr_links1a_a = document.createElement('a');
		tr_links1a_a.style.fontWeight = 'bold';
		var tr_links1b_a = document.createElement('a');
		tr_links1a_a.href = 'http://www.apartments.com/partner/Community.aspx?p=anchnews&Area2=Y&cont.x=42&cont.y=17&page=SubArea&state=ak&rgn2=190&partner=anchnews&prvpg=3';
		tr_links1b_a.href = 'http://sellit.adn.com/';
		var tr_links1a_txt = document.createTextNode('Advanced Search');
		var tr_links1b_txt = document.createTextNode(' | ');
		var tr_links1c_txt = document.createTextNode('Place a rentals ad');
		tr_links1a_a.appendChild(tr_links1a_txt);
		tr_links1b_a.appendChild(tr_links1c_txt);
		tr_links1_p.appendChild(tr_links1a_a);
		tr_links1_p.appendChild(tr_links1b_txt);
		tr_links1_p.appendChild(tr_links1b_a);
		tr_links.appendChild(tr_links1_p);
		
		tr_links1a_a.onclick  = function(){
			var rkey = 'TOP_RENTALS|' + this.innerHTML;
			var ref = 'http://rentals.adn.com/';
			//alert(rkey);
			record_click(rkey,ref);
		}
		
		tr_links1b_a.onclick  = function(){
			var rkey = 'TOP_RENTALS|' + this.innerHTML;
			var ref = 'http://rentals.adn.com/';
			//alert(rkey);
			record_click(rkey,ref);
		}
		
	}
	
function adn_tr_call_functions()
	{
		var tr_wrap = document.getElementById('top_rentals2');
		
		var adn_trtitle = document.createElement('div');
		adn_trtitle.className = 'title_strip';
		adn_trtitle.id = 'adn_tr_title';
		tr_wrap.appendChild(adn_trtitle);
		
		var adn_toprentals = document.createElement('div');
		adn_toprentals.id = 'adn_toprentals';
		tr_wrap.appendChild(adn_toprentals);
		
		var adn_tr_flipper = document.createElement('p');
		adn_tr_flipper.className = 'next';
		adn_tr_flipper.id = 'adn_tr_flipper';
		tr_wrap.appendChild(adn_tr_flipper);
		
		var adn_trrentalscape = document.createElement('div');
		adn_trrentalscape.id = 'adn_tr_rentalscape';
		tr_wrap.appendChild(adn_trrentalscape);
		
		var adn_tr_srch = document.createElement('div');
		adn_tr_srch.id = 'adn_tr_srch';
		tr_wrap.appendChild(adn_tr_srch);
		
		var adn_tr_link = document.createElement('div');
		adn_tr_link.id = 'adn_tr_links';
		tr_wrap.appendChild(adn_tr_link);
		
		adn_tr_title();
		load_tr_rental();
		adn_tr_rentalscape();
		adn_tr_links();
	}