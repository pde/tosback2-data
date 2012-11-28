// jquery Document

$(document).ready(
function(){	

$("span.clickableBox").css("cursor","pointer");
$("span.clickableBox").click(
function(){
window.location=$(this).find("#myOnClick").attr("myTarget");
return false;
}
);
}

);