
function DM_prepClient(csid,client){
	client.DM_addEncToLoc(asNodeName,asNodeValue);
	client.DM_addEncToLoc("Author",asAuthor);
}

function audSciWrite()
{
	
	asNodeName = typeof thisNode!="undefined" && thisNode!="" ? "thisNode":"commercialNode";
	asNodeValue = typeof thisNode!="undefined" && thisNode != "" ? thisNode : commercialNode;
	asNodeValue = asNodeValue.toLowerCase().replace(/\/$/gi,"");
	asAuthor = "";
	
	if(typeof wp_meta_data.author!=="undefined"){
		var i = wp_meta_data.author.length;
		while(i--){
			asAuthor += wp_meta_data.author[i] + (i !== 0 ? "," : "");
		}
	}else{
		asAuthor = "undefined";	
	}
	
	if(location.href.match('test_rs_values')) {
		document.write(asNodeName + '=' + asNodeValue + '<br/>');
		document.write('Author' + '=' + asAuthor + '<br/>');
	};

	//WP only reg-cookie logic:
	if( asNodeName == 'thisNode' && typeof getCookie != 'undefined' && getCookie('WPATC') )
	{
		var reg_values=getCookie('WPATC').split(':');
		for(i=0;reg_values[i];i++)
		{
			var rv_in_use=reg_values[i].split('=');
			DM_addEncToLoc(rv_in_use[0],rv_in_use[1]);
			if(location.href.match('test_rs_values')) {document.write(rv_in_use[0] + '=' + rv_in_use[1] + '<br/>')};
		}
	}
	
	DM_tag();
	
}

try
{
audSciWrite();
}
catch(e){}
