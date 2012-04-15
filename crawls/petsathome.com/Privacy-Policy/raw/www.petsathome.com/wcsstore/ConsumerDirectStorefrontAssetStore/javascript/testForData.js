function testForData() {
var foundText = false;
	$(".personalise").each(
		function(i) {
		var myVal = $(this).val();
		if (myVal != "" ) foundText = true;
	});
	return foundText;
};

function message() {
	if (testForData()) {
	
	agree=confirm("Your changes will be lost, are you sure you want to go back?");
				if (agree) {
					history.back();
				}
				else {
				}
	}	
	else {
	history.back();
	}
}

$(document).ready(
	function() {
		$(".backbutton").click(
			function() {
				message();
			}
		);

	}
);