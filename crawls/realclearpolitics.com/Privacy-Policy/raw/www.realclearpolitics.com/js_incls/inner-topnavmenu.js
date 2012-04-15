
function hidesub(id){
	document.getElementById("subnavbg"+id).style.display="none";
	document.getElementById("subnav"+id).style.display = "none";	
	document.getElementById("nav"+id).style.backgroundColor = "#000";
}

function showsub2(id){
	document.getElementById("subnavbg"+id).style.display="block";
	document.getElementById("subnav"+id).style.display = "block";
	document.getElementById("nav"+id).style.backgroundColor = "#cc0000";	
}


