function launchPlayer() {
	if(arguments.length > 0) var upc_arg = '?upc=' + arguments[0];
	else upc_arg = '';

	playerWindow = window.open('http://sixdegreesrecords.com/media_player/player.php'+upc_arg,'playerWindow','width=475,height=175,toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,location=no,history=no');
	playerWindow.focus();
}

function writeEncodedLink(string){
  var link = atob(string);
  document.write(link);
}