
	
function adn_th_call_functions()
	{
		

		
		var r = 0 + Math.floor(Math.random() * (adn_top_homes.length));
				
		var adn_selected_home_src = adn_top_homes[r];
		var functions_file = 'http://media.adn.com/includes/classified/top_homes/top_homes_functions_level2.js';
		document.write('<scr' + 'ipt language="JavaScript" src="'+ adn_selected_home_src +'" type="text/javascript"></scr' + 'ipt>');
		document.write('<scr' + 'ipt language="JavaScript" src="'+ functions_file + '" type="text/javascript"></scr' + 'ipt>');

	}
	
