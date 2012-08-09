	var enl_cfg = {iframe: 1, scr: 0, x: 990, y: 700, resize: 0};
	
	document.write('<div id="upi_ol_bg" onclick="upi_ol.hide();"'+'></div>');
	document.write('<div id="upi_ol_div">');
	document.write('<img src="http://www.upi.com/img/clear.gif" class="close" onclick="upi_ol.hide();">');
	document.write('<div class="content" style="overflow: hidden;"></div>');
	document.write('</div>');
	document.write('<div id="feat_ph" class="feat_ph">');
	document.write('<div class="header">');
	document.write('<div class="pn">');
	document.write('<div id="next" class="scroll next" onclick="feat_ph.init(feat_ph.n);"></div>');
	document.write('<div class="mid"></div>');
	document.write('<div id="prev" class="scroll prev" onclick="feat_ph.init(feat_ph.p);"></div>');
	document.write('</div>');
	document.write('<div class="title"><a href="" target="_blank" onclick="upi_ol.go(feat_ph.photos.u+\'/ol/\'+feat_ph.c+\'/\', enl_cfg); return false;">2012 Olympics</a></div>');
	document.write('<div style="clear: both;"></div>');
	document.write('</div>');
	document.write('<div class="photo" style="height: 301px; height: 301px; overflow: hidden;"><a href="" target="_blank" class="perm" onclick="upi_ol.go(feat_ph.photos.u+\'ol/\'+feat_ph.c+\'/\', enl_cfg); return false;"><img src="" border="0" style="border: 0;" class="ph_cur"></a></div>');
	document.write('<div style="clear: both; margin-top: 5px;"></div>');
	document.write('<div class="scrollme">');
	document.write('<div class="caption"></div>');
	document.write('</div>');
	document.write('</div>');
		
	(function() {
		var upi_css=document.createElement("link");
		upi_css.setAttribute("rel", "stylesheet");
		upi_css.setAttribute("type", "text/css");
		upi_css.setAttribute("href", "http://fark.upi.com/upi_col.css");
		document.getElementsByTagName("head")[0].appendChild(upi_css);
	}());

	var upi_ol = {
		go: function(url, op) {
			upi_ol.ol_shown = 1;
			var cont_div = jQuery('#upi_ol_div').find('.content');
			jQuery('#upi_ol_div').css({width: '200px', height: '40px'});
			cont_div.css({width: '200px', height: '40px'});
			cont_div.empty().html('<div style="text-align: center; padding: 15px;" id="pi"><img src="http://www.upi.com/img/loading_long.gif"></div>')
			upi_ol.xy_opac(1);
			jQuery('#upi_ol_div').fadeIn('fast');
    		var ol_x = op.x ? op.x : 500;
    		var ol_y = op.y ? op.y : 500;
    		if(ol_x >= jQuery(window).width()) ol_x = jQuery(window).width() - 100;
    		if(ol_y >= jQuery(window).height()) ol_y = jQuery(window).height() - 100;

			if(op.iframe) {
				var ol_scr = op.scr ? 'no' : 'yes';
    			cont_div.append('<iframe src="'+url+'" style="width: 0px; height: 0px; border: 0px; visibility: hidden;" frameborder="0" id="upi_ol_iframe" scrolling="'+ol_scr+'">');
    			var if_rs = jQuery('#upi_ol_iframe');
    			if(op.resize) {
					if_rs.load(function() {
						var y_h = if_rs.contents().find("html").height();
						if(op.resize && y_h && y_h < jQuery(window).height()) {
							jQuery('#upi_ol_div').css({width: ol_x+'px', height: y_h+'px'});
							if_rs.css({width: ol_x+'px', height: y_h+'px'});
							jQuery('#upi_ol_div .content').css({width: ol_x+'px', height: ol_y+'px'});
						}else{
							if_rs.css({width: ol_x+'px', height: ol_y+'px'});
							jQuery('#upi_ol_div').css({width: ol_x+'px', height: ol_y+'px'});
							jQuery('#upi_ol_div .content').css({width: ol_x+'px', height: ol_y+'px'});
						}
						upi_ol.center();
						cont_div.find('#pi').fadeOut('fast', function() {cont_div.find('iframe').css({visibility: ''})});
					});
				}else{
					if_rs.css({width: ol_x+'px', height: ol_y+'px'});
					jQuery('#upi_ol_div').css({width: ol_x+'px', height: ol_y+'px'});
					jQuery('#upi_ol_div .content').css({width: ol_x+'px', height: ol_y+'px'});
					upi_ol.center();
					cont_div.find('#pi').fadeOut('fast', function() {cont_div.find('iframe').css({visibility: ''})});
				}
			} else {
				if(op) jQuery('#upi_ol_div').css({width: ol_x+'px', height: ol_y+'px'});
				jQuery('#upi_ol_div .content').css({width: ol_x+'px', height: ol_y+'px'});
    			jQuery.ajax({
    				type: 'GET', cache: false, url: url, 
    				dataType: 'html', 
    				success: function(d) {
    					jQuery('#upi_ol_div').fadeIn(function() {jQuery('#upi_ol_div .content').html(d);});
    					upi_ol.center();
    					cont_div.find('#pi').fadeOut('fast');
    				}
    			});
			}
			return false;
		},
		ol: function(op) {
			upi_ol.ol_shown = 1;
			var cont_div = jQuery('#upi_ol_div').find('.content');
			jQuery('#upi_ol_div').css({width: '200px', height: '40px'});
			upi_ol.xy_opac(1);
			jQuery('#upi_ol_div').fadeIn('fast');
    		var ol_x = op.x ? op.x : 500;
    		var ol_y = op.y ? op.y : 500;
    		if(ol_x >= jQuery(window).width()) ol_x = jQuery(window).width() - 100;
    		if(ol_y >= jQuery(window).height()) ol_y = jQuery(window).height() - 100;
			jQuery('#upi_ol_div').css({width: ol_x+'px', height: ol_y+'px'});
			jQuery('#upi_ol_div .content').css({width: ol_x+'px', height: ol_y+'px'});
    		if(op.text) jQuery('#upi_ol_div').fadeIn(function() {jQuery('#upi_ol_div .content').html(jQuery(op.id).html());});
    		if(op.img) jQuery('#upi_ol_div').fadeIn(function() {jQuery('#upi_ol_div .content').html('<div style="text-align: center; width: '+ol_x+'px, height: '+ol_y+'px"><img src="'+op.img+'"> </div>');});
    		upi_ol.center();
		},
		hide: function() {
			upi_ol.ol_shown = 0;
			jQuery('#upi_ol_bg').animate({opacity: 0}, 500).css({visibility:'hidden'});
			jQuery('#upi_ol_div').css({display:'none'})
			jQuery('#upi_ol_div .content').empty();
		},
		center: function (divid) {
			if(!divid) divid = 'upi_ol_div';
			var cc = jQuery('#'+divid);
			var xy_x = (jQuery(window).width() / 2) - (cc.width() / 2);
			var xy_y = (jQuery(window).height() / 2) - (cc.height() / 2) + jQuery(document).scrollTop();
			cc.css({left: xy_x+'px', top: xy_y+'px'});
		},
		xy_opac: function (sop) {
			var xy_x =  jQuery(document).width();
			var xy_y = jQuery(document).height();
			jQuery('#upi_ol_bg').css({width: xy_x+'px', height: xy_y+'px'});
			if(sop) jQuery('#upi_ol_bg').css({opacity:0, visibility:'visible'}).animate({opacity: 0.5}, 250);
			upi_ol.center();
		},
		ol_shown: 0
	}

	
	function pn(o, t) {
		if(t == "p") {
			if(o >= 1) return (o-1) <= 0 ? feat_ph.photos.t : (o-1);
			else return feat_ph.photos.t;
		}else{
			if(o < feat_ph.photos.t) return (o+1);
			else return 1;
		}
	}

	var feat_ph = {
		photos: {"lu":1344534121,"photos":{"1":{"c":"Sara Peterson of Denmark adjusts her shorts before running in round one of the Women's 400M Hurdles in track and field at the London 2012 Summer Olympics on August 5, 2012 in London.    UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/1\/Athletics-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/"},"2":{"c":"Jessica Ennis of Great Britain celebrates winning gold in the Women's Heptathlon at the London 2012 Summer Olympics on August 4, 2012 in London.    UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/2\/Womens-Heptathlon-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/2\/"},"3":{"c":"Elena Isinbaeva of Russia kisses the Bronze Medal for  the Women's Pole Vault from Albert II, Prince of Monaco, at the London 2012 Summer Olympics on August 7, 2012 in Stratford, London. Isinbaeva took the Bronze medal with a vault of 4.70M in the final.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/3\/Womens-Pole-Vault-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/3\/"},"4":{"c":"Canada's Marie-Andree Lessard (L) and teammate Annie Martin embrace after scoring a point in their match against Italy, during Beach Volleyball Preliminary competition at the 2012 Summer Olympics, August 2, 2012, in London, England.              UPI\/Mike Theiler","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/4\/Canada-Italy-Beach-Volleyball-competition-at-2012-Summer-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/4\/"},"5":{"c":"Ashton Eaton of the USA competes in the Shot Put of the Men's Decathlon at the London 2012 Summer Olympics on August 8, 2012 in London.  UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/5\/Athletics-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/5\/"},"6":{"c":"Keisuke Ushiro of Japan competes in the Long Jump of the Men's Decathlon at the London 2012 Summer Olympics on August 8, 2012 in Stratford, London. Ushiro's best mark was 6.86M.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/6\/Mens-Decathlon-Long-Jump-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/6\/"},"7":{"c":"USA's Alexandra Raisman performs her bronze medal routine on the Balance Beam during the Women's Gymnastics Apparatus Finals competition at the North Greenwich Arena  during the London 2012 Summer Olympics in Greenwich, London on August 7, 2012.  China's Deng Linlin won the gold, China's  Sui Lu the silver and USA's Alexandra Raisman the bronze.    UPI\/Pat Benic","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/7\/Womens-Gymnastics-Balance-Beam-Apparatus-Final-at-London-Olympics.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/7\/"},"8":{"c":"Trey Hardee of the USA competes in the Shot Put of the Men's Decathlon at the London 2012 Summer Olympics on August 8, 2012 in London.  UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/8\/Athletics-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/8\/"},"9":{"c":"American gymnast Gabrielle Douglas slips and has to grasp the balance beam as she fell during her routine at the Apparatus Finals at the Greenwich North Arena at the 2012 Summer Olympics, August 7, 2012, in London, England.              UPI\/Mike Theiler","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/9\/Gymnastics-apparatus-finals-at-2012-Summer-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/9\/"},"10":{"c":"Mihail Dudas of Serbia competes in the Long Jump of the Men's Decathlon at the London 2012 Summer Olympics on August 8, 2012 in Stratford, London. Dudas's best jump was 7.53M.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/10\/Mens-Decathlon-Long-Jump-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/10\/"},"11":{"c":"Lynsey Sharp of Great Britain gets ready for Round 1 of the Women's 800M at the London 2012 Summer Olympics on August 8, 2012 in Stratford, London. Sharp qualified with a time of 2:01.41.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/11\/Womens-800M-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/11\/"},"12":{"c":"Two members of the beach volleyball dance squad cool themselves down two days before the London 2012 games will commence in London, July 25, 2012.      UPI\/Hugo Philpott","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/12\/London-2012-Olympics.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/12\/"},"13":{"c":"The Duke and Duchess of Cambridge enjoy the tennis in the Royal Box on the ninth day of the 2012 Wimbledon championships in London, July 4, 2012.      UPI\/Hugo Philpott","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/13\/Day-Nine-at-Wimbledon-Tennis-Championships-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/13\/"},"14":{"c":"Gold Medalist Andy Murray of Great Britain (L) smiles as he walks around the court with Silver Medalist Roger Federer after winning the Men's Singles tennis final at the London 2012 Summer Olympics on August 5, 2012 in Wimbledon, London. Murray defeated Roger Federer of Switzerland 6-2, 6-1, 6-4, to win the final.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/14\/Mens-Singles-Tennis-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/14\/"},"15":{"c":"Gold Medalist Jennifer Suhr of the United States successfully completes a vault of 4.55M in the Women's Pole Vault Final at the London 2012 Summer Olympics on August 6, 2012 in Stratford, London. Suhr won a Gold Medal in the competition, successfully completing a vault of 4.75M.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/15\/Womens-Pole-Vault-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/15\/"},"16":{"c":"Damian Warner of Canada competes in the Long Jump of the Men's Decathlon at the London 2012 Summer Olympics on August 8, 2012 in Stratford, London. Warner's best mark was 7.54M.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/16\/Mens-Decathlon-Long-Jump-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/16\/"},"17":{"c":"Belarus Aliaksandra Herasimenia smiles as she holds her silver medal for the Women's 50M Freestyle Final at the Aquatics Center during the London 2012 Summer Olympics in Stratford, London on August 4, 2012.  Netherlands  Ranomi Kromowidjojo (L)won the gold in an Olympic Record of 24.05 and her teammate Marleen Veldhuis won the bronze.   UPI\/Pat Benic","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/17\/Womens-50M-Freestyle-Final-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/17\/"},"18":{"c":"Sally Pearson of Australia celebrates winning the gold in the Women's 100M Hurdles at the London 2012 Summer Olympics on August 7, 2012 in London. Pearson took first in a photo finish.     UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/18\/Athletics-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/18\/"},"19":{"c":"USA's Jordyn Wieber performs her routine on the Floor during the Women's Gymnastics Apparatus Finals competition at the North Greenwich Arena  during the London 2012 Summer Olympics in Greenwich, London on August 7, 2012.  USA's Alexandra Raisman won the gold, Romania's Cataline Ponor the silver and Russia's Aliya Mustafina the bronze.    UPI\/Pat Benic","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/19\/Womens-Gymnastics-Floor-Apparatus-Final-at-London-Olympics.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/19\/"},"20":{"c":"Great Britain's Chris Hoy cries as he awaits his gold medal in the Men's Keirin event at the Velodrome at the London 2012 Summer Olympics on August 7, 2012 in London.     UPI\/Hugo Philpott","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/20\/Mens-Keirin-Track-Cycling-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/20\/"},"21":{"c":"Cassidy Krug of the United States competes in the Women's 3M Springboard Semifinal at the London 2012 Summer Olympics on August 4, 2012 in Stratford, London. Krug's score of 345.60 qualified her for the final.    UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/21\/Womens-3M-Springboard-Semifinal-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/21\/"},"22":{"c":"Serena Williams of the United States reacts as she plays with her sister Venus against Andrea Hlavackova and Lucie Hradecka of the Czech Republic during the Women's Doubles Gold Medal tennis match at the London 2012 Summer Olympics on August 5, 2012 in Wimbledon, London. The Williams sisters defeated Hlavackova and Hradecka 6-4, 6-4 to win the Gold Medal.       UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/22\/Womens-Doubles-Gold-Medal-Tennis-Match-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/22\/"},"23":{"c":"American sprinter Carmelita Jeter (L) wins the silver medal by finishing second, as Jamaica's Veronica Campbell-Brown (C) won the bronze medal for the  Women's 100m final, at the 2012 Summer Olympics, August 4, 2012, in London, England.             UPI\/Mike Theiler","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/23\/Womens-100m-finals-at-2012-Summer-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/23\/"},"24":{"c":"Jennifer Suhr of the United States smiles after receiving the Gold Medal for  the Women's Pole Vault at the London 2012 Summer Olympics on August 7, 2012 in Stratford, London. Suhr took the Gold with a vault of 4.75M in the final.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/24\/Womens-Pole-Vault-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/24\/"},"25":{"c":"Shelly-Ann Fraser-Pryce of Jamaica wins the Women's 100M at the London 2012 Summer Olympics on August 4, 2012 in London.    UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/25\/Womens-100M-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/25\/"},"26":{"c":"China's Deng Linlin takes a bite of her gold medal she won on the Balance Beam during the Women's Gymnastics Apparatus Finals competition at the North Greenwich Arena  during the London 2012 Summer Olympics in Greenwich, London on August 7, 2012.  China's Deng Linlin won the gold, China's  Sui Lu the silver and USA's Alexandra Raisman the bronze.    UPI\/Pat Benic","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/26\/Womens-Gymnastics-Balance-Beam-Apparatus-Final-at-London-Olympics.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/26\/"},"27":{"c":"Usain Bolt of Jamaica wins the Men's 100M in track and field.at the London 2012 Summer Olympics on August 5, 2012 in London.    UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/27\/Athletics-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/27\/"},"28":{"c":"Holly Bleasdale of Great Britain fails a vault in the Women's Pole Vault Final at the London 2012 Summer Olympics on August 6, 2012 in Stratford, London. Bleasdale did not medal in the event.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/28\/Womens-Pole-Vault-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/28\/"},"29":{"c":"Dancing girls in beach attire entertain the crowd during a break in Beach Volleyball Preliminary competition at the 2012 Summer Olympics, August 2, 2012, in London, England.              UPI\/Mike Theiler","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/29\/Beach-Volleyball-competition-at-2012-Summer-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/29\/"},"30":{"c":"Michael Phelps holds a special Olympic recognition trophy after he won his 18th gold in the Men's 4x100 Medley Relay Final at the Aquatics Center during the London 2012 Summer Olympics in Stratford, London on August 4, 2012.  Phelps won his record 18th gold and 22nd Olympic Medals to end his Olympic career.   UPI\/Pat Benic","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/30\/Phelps-Wins-Record-18th-Gold-Medal.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/30\/"},"31":{"c":"South Korea's Joo Saehyuk in action against China's Jike Zhank in the final of the Men's Table Tennis at the London 2012 Summer Olympics on August 8, 2012 in London.     UPI\/Hugo Philpot","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/31\/Mens-Table-Tennis-Team-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/31\/"},"32":{"c":"Shelly-Ann Fraser-Pryce of Jamaica (R) beats out Allyson Felix of the USA in the Women's 100M at the London 2012 Summer Olympics on August 3, 2012 in London.    UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/32\/Womens-100M-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/32\/"},"33":{"c":"American gymnast McKayla Maroney falls as she lands in her second vault during the Apparatus Finals, but she still won a silver medal, at the Greenwich North Arena at the 2012 Summer Olympics, August 5, 2012, in London, England.              UPI\/Mike Theiler","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/33\/Gymnastics-apparatus-finals-at-2012-Summer-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/33\/"},"34":{"c":"USA's Sanya Richards-Ross exults in joy after winning the Women's 400M race final at Olympic Stadium during the London 2012 Summer Olympics in in Olympic Park in Stratford, London on August 5, 2012.   Richards-Ross won the gold medal in a time of 49.55 seconds.   UPI\/Pat Benic","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/34\/Womens-400M-Race-Final-at-London-Olympics.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/34\/"},"35":{"c":"Gold medal winner Ezekiel Kemboi of Kenya (R) is lifted by silver medal winner Mahiedine Mekhissi-Benabbad of France after winning the 3000M Steeplechase in track and field at the London 2012 Summer Olympics on August 5, 2012 in London.    UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/35\/Athletics-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/35\/"},"36":{"c":"Dominican Republic's Felix Sanchez wins the Final of the Men's 400 metres Final in the Olympic stadium at the London 2012 Summer Olympics on August 6, 2012 in  London.     UPI\/Hugo Philpott","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/36\/Mens-400m-Hurdles-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/36\/"},"37":{"c":"Moussa Dembele of Senegal watches the finish of the sixth heat of the Men's 110M Hurdles from under the last hurdle where he fell at the London 2012 Summer Olympics on August 7, 2012 in London.    UPI\/Terry Schmitt","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/37\/Athletics-for-the-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/37\/"},"38":{"c":"Netherlands Epke Zonderland flies over the bar during his gold medal performance on the Men's Horizontal Bar during the Men's Gymnastics Apparatus Finals competition at the North Greenwich Arena  during the London 2012 Summer Olympics in Greenwich, London on August 7, 2012.   Netherlands Epke Zonderland won the gold, Germany's Fabian Hambuchen the silver and China Zou Kai the bronze.  UPI\/Pat Benic","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/38\/Mens-Gymnastics-Horizontal-Bar-Apparatus-Final-at-London-Olympics.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/38\/"},"39":{"c":"Great Britain's Chris Hoy celebrates winning the final of the Men's Keirin event at the Velodrome at the London 2012 Summer Olympics on August 7, 2012 in London.     UPI\/Hugo Philpott","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/39\/Mens-Keirin-Track-Cycling-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/39\/"},"40":{"c":"Great Britain's Alistair Brownlee wins the Men's Triathlon in Hyde Park at the London 2012 Summer Olympics on August 7, 2012 in  London.     UPI\/Hugo Philpott","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/40\/Mens-Triathlon-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/40\/"},"41":{"c":"Great Britain's Laura Trott celebrates winnng the Women's Omnium over America's Sarah Hammer at the Velodrome at the London 2012 Summer Olympics on August 7, 2012 in London.     UPI\/Hugo Philpott","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/41\/Womens-Omnium-Cycling-Final-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/41\/"},"42":{"c":"Ilya Zakharov of Russia competes in the Men's 3m Springboard Diving final at the London 2012 Summer Olympics on August 7, 2012 in London.  Zakharov won the Gold Medal with a score of 555.90 points.   UPI\/Ron Sachs","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/42\/Mens-3m-Springboard-Diving-Final-at-the-London-2012-Summer-Olympics.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/42\/"},"43":{"c":"German weightlifter Almir Velagic lets out a yell as he makes a successful lift lifts during the Men's 105kg+ Group A class, at the Excel Arena at the 2012 Summer Olympics, August 7, 2012, in London, England.              UPI\/Mike Theiler","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/43\/Mens-105kg-weightlifting-finals-at-2012-Summer-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/43\/"},"44":{"c":"Edgars Erins of Latvia competes in the Long Jump of the Men's Decathlon at the London 2012 Summer Olympics on August 8, 2012 in Stratford, London. Erins best mark was 6.98M.     UPI\/Brian Kersey","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/44\/Mens-Decathlon-Long-Jump-at-2012-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/44\/"},"45":{"c":"Lithuania's Rimantas Kaukenas (L) and Russia's Sergey Monya battle for a loose ball during the Lithuania-Russia Men's Basketball Quarterfinal competition at the 2012 Summer Olympics, August 8, 2012, in London, England.             UPI\/Mike Theiler","u":"http:\/\/fark.upi.com\/img\/sq\/6963\/45\/Lithuania-Russia-mens-quarterfinal-basketball-at-2012-Summer-Olympics-in-London.jpg","p":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/45\/"}},"name":"2012 Olympics","u":"http:\/\/www.upi.com\/News_Photos\/Featured\/2012-Olympics\/6963\/","id":"6963","t":45}, 
		init: function(o) {
			feat_ph.n = pn(o, "n");
			feat_ph.p = pn(o, "p");
			jQuery('.ph_cur').attr('src', feat_ph.photos.photos[o].u);
			jQuery('.perm').attr('href', feat_ph.photos.photos[o].p);
			jQuery('.caption').html(feat_ph.photos.photos[o].c);
			jQuery('.mid').html(o+' of '+feat_ph.photos.t);
			feat_ph.c = o;
		},
		n: 2,
		c: 1,
		p: null
	}
	
	feat_ph.p = feat_ph.photos.t;
	feat_ph.init(feat_ph.c);