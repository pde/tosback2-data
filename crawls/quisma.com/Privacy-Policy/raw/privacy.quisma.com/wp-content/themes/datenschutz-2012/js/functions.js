
jQuery(document).ready(function($) {
    $(".redLink").click(function() {
      $("#boxLeft").css("width", "960px");
      if($("#optOutHolder").children().length == 0){
            $("#optOutHolder").append('<iframe class="iframed" style="overflow-x: hidden;" src="http://www.youronlinechoices.com/opt_out_interface_v2" width="960px" height="2000" frameborder="0" />');
      }
      else{
          $(".iframed").remove();
          $("#boxLeft").css("width", "620px");
      }
    });
    
    $("#tabs").tabs({
		collapsible: true
	});
    
    $("#accordion, #accordion2").accordion({
            collapsible: true,
            autoHeight: false
    });
    
    $("#select_laenderauswahl").change(function() {
        switch($(this).val()){
            case "de":
                window.location = "/";
                break;
            case "uk":
                window.location = "/uk/";
                break;
            case "es":
                window.location = "/uk/";
                break;
            case "fr":
                window.location = "/uk/";
                break;
            case "it":
                window.location = "/uk/";
                break;
            case "nl":
                window.location = "/nl/";
                break;
            case "pl":
                window.location = "/uk/";
                break;
        }
    });
})

