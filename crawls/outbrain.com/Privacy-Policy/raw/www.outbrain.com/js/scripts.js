$(document).ready(function() {
  $('#blog-select ol').hide();
  $('#blog-select h2').live('click', function() {
    if ($('#blog-select ol').data("disabled")) {
      $('#blog-select ol').toggle(false);
    } else {
      $('#blog-select ol').toggle();
    }
    return false;
  });

    $('#publisher-select ol').hide();
  $('#publisher-select h2').live('click', function() {
    $('#blog-select ol').hide();
    $('#publisher-select ol').toggle();
    return false;
  });

  if ($('#blog-select ol').data("disabled")) {
    $('#blog-select').css({
      'background-color' : '#597380',
      'opacity' : '0.7'
    });
  }

   // popup stats modal

    $('.stats-pop').hide();
    $('.show-stats-pop').click( function() {
      $(this).siblings('.stats-pop').fadeIn();
    });
    $('.stats-pop-close').click( function() {
      $(this).parents('.stats-pop').fadeOut();
    });



    // Hide/show blog select menu


});


function makeFAQList(className,insertInElement,prefix, noFragment){
    var t=0;
    if (prefix == null || prefix == 'undefined'){ prefix = "a";}

    jQuery.each($("."+className), function() {
     t++;
       $("<li><a href='" + ((noFragment)?"":"#") +prefix+ ((noFragment)?"#":"_") +t+"'>"+$(this).text()+"</a></li>").appendTo("#"+insertInElement);
       if (!noFragment) {
         $(this).before("<a name='" + ((noFragment)? "" : prefix+ "_")+t+"'></a>");
       }

       //to give a hard anchor chek if this element has id and create another anchor
       if (this.id != null && this.id != 'undefined' &&(this.id).length > 0){
         $(this).before("<a name='"+ (this).id +"'></a>");
       }
    });


};

//hide google visualization tooltip's close button
function hideCloseButton(){
    $("iframe[id*='GChart_Frame']").contents().find("path[onclick*='_closeTooltip']").hide();
  }

 /**
 * Make the source name short so it will fit the pie chart tooltip ( example: "This is long name ...")
 */
 function formatName(data , nameIndex){
  for(i=0; i < data.getNumberOfRows(); i++){
       var name = data.getValue(i, nameIndex);
       if(name.length > 30){
        data.setFormattedValue(i, nameIndex, name.substr(0, 30)+'...');
       }

 }
}

