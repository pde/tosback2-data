<!-- Quantcast tag option -->
_qoptions={
    qacct: "p-65DrxcUXjcWq6",
    labels: $('#Quantcast_label').val()
};

$(document).ready(function() 
{    
    $.ajaxSetup({ cache: true });

<!-- Start Quantcast tag -->
    $.getScript("http://edge.quantserve.com/quant.js"); 
<!-- End Quantcast tag -->

    $.ajaxSetup({ cache: false });

});
