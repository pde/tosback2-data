var fh_rollover = null;
var fh_parent   = null;

// rollovers
var results  = new Array(); //use this to cache results

function fh_close(){
  if(fh_rollover != null){
    tmp_rollover  = fh_rollover;
    tmp_parent    = fh_parent; 
    
    
    
    tmp_rollover.fadeOut('fast',function(){
      // show/hide needed by IE7 to prevent fatheader from moving
      tmp_parent.css('z-index','10');
      tmp_parent.hide().show();
      $('select').css({'visibility' : 'visible'});
      
      // make sure all ads are z-indexed bigly
      $('.ad.wrap').css({'z-index' : '20'});
    });
  }
}

function fh_open(){
  fh_close();
  //$('select').css({'visibility' : 'hidden'});
  
  // make sure all ads are z-indexed smally
  $('.ad.wrap').css({'z-index' : '1'});  
  
  fh_parent   = $(this).parent();
  fh_parent.hide().show();
   
  var section = fh_parent.attr('id').split('_')[1];
  
  if(fh_parent.find('#fatheader_rollover_wrap_'+section).length != 0){
    fh_rollover = $('#fatheader_rollover_wrap_'+section);
  }else{
    fh_rollover = fh_parent.prepend(fh_rollover_html(section)).find('#fatheader_rollover_wrap_'+section);
  }

  // selected fat head section to the top (margin needed by IE7 to stop fatheader from moving)
  fh_parent.css('z-index','20');

  if(results[section] == undefined){
    // ajaxically get the content for the rollover
    $.get('/Fragment/nypost/web/webpages/blocks/fat_header/' + section + '.dwc?style=/SysConfig/WebPortal/nypost/blocks/fat_header/fat_header_rollover.jpt',{"section": section},function(result){
      fh_rollover.html(result);
      
      fh_rollover.mouseleave(fh_close);
      fh_rollover.find('.close').mouseenter(fh_close); // needed by entertainment to show sports
      
      $('.dropmenu_wrap').parent().hover(ddm_open,ddm_timer);  
      fh_rollover.fadeIn('slow');
      results[section] = result; // for caching
    });
  }else{
    //fh_rollover.html(results[section]);
    //$('.dropmenu_wrap').parent().hover(ddm_open,ddm_timer); 
    fh_rollover.fadeIn('slow');
    fh_rollover.mouseleave(fh_close);
    fh_rollover.find('.close').mouseenter(fh_close); // needed by entertainment to show sports
  }
}

function fh_rollover_html(section){
  output  = '<div id="fatheader_rollover_wrap_'+section+'" class="fatheader_rollover_wrap">';
  output += '  <div class="fatheader_rollover">';
  output += '    <img alt="loading" class="loading" src="/rw/SysConfig/WebPortal/nypost/images/loading_white.gif" />';
  output += '  </div>';
  output += '</div>';
  
  return output;
}

$(document).ready(function(){
  // option 1
  $('#fat_header .tpl_1 .stories li').mouseover(function(){
    var id = parseInt(this.id.split('_').pop())+1;
    var idName = 'photoP'+id;
    var idPhoto = document.getElementById(idName).value;
    $('#fat_header .tpl_1 img.photo').attr('src',idPhoto);
    $('#fat_header .tpl_1 .stories li').removeClass('selected');
    $(this).addClass('selected');
  });
  $('#fat_header .tpl_1 .stories li#fat_header_news_stories_0').addClass('selected');
  
  
    $('#fat_header .dn').mouseenter(fh_open);
    
    /* fat header hover function */
    
    $('#fat_header .section').hover(
      function(){
        $(this).addClass('hover');
      },
      function(){
        $(this).removeClass('hover');
      }
    ).hide().show();
    
    
});