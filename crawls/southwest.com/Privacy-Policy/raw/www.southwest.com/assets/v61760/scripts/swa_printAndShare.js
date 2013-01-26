$(document).ready(function(){$(".swa_printAndShare_link_expandable").click(function(a){a.preventDefault();
if($("#swa_printAndShare_content").css("display")=="none"){coords=$(this).offset();
$("#swa_printAndShare_content").show().css({left:coords.left+$(".swa_printAndShare_link_container").width()+27-$("#swa_printAndShare_content").width()+"px",top:coords.top+12+"px"});
$(this).addClass("printAndShare_link_expandable_open")
}else{$("#swa_printAndShare_content").hide();
$(this).removeClass("printAndShare_link_expandable_open")
}return false
});
$("body").click(function(a){if(!pointerWithinObject(a,"icsDiv")&&!pointerWithinObject(a,"swa_printAndShare_content")){$("#swa_printAndShare_content").hide();
$(".swa_printAndShare_link_expandable").removeClass("printAndShare_link_expandable_open")
}});
$(".swa_printAndShare_printLink").show().click(function(){window.print();
return false
});
if(jQuery.browser.msie&&jQuery.browser.version=="6.0"){$("#shareThisLink_IE6").show()
}else{$("#shareThisLink").show()
}});