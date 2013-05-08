(function($){
   var TMsearchToggle_tt_vars = $.parseJSON(TM.global_header.TM_SEARCH_TOGGLE);
   if(TMsearchToggle_tt_vars.anchored_tab_enabled == 0) {
        var leaderBoard = $('#leaderBoard');
        if(leaderBoard.length && (leaderBoard.height() > 30)){
             leaderBoard.addClass("vis");
        }
        
        $('#site-search').find('#search-wrap > input')
            .live('focus', function() {
                  if($(this).val() === search_text) {
                    $(this).val("");
                  }
                  $(this).animate({ width: 360});
              })
            .live('blur', function() {
                 if($(this).val() === "") {
                   $(this).val(search_text);
                 }
                var that = this;
                var delayMin = setTimeout(function() { 
                   if(!$('#search-suggest').length || ($('#search-suggest').length && $('#search-suggest').not(':visible'))){
                           if($('#search-suggest').length && $('#search-suggest').not(':hidden')){
                               $('#search-suggest').hide();
                           }
                           $(that).animate({ width: 232});
                     }
               }, 350);
          });

   } else {

       var TMsearchToggle = {
                 dataVals:{
                       msActive: false,
                    sha_offset : $('#site-header-anchor').offset().top,
                    anchorSite : $('#site-header-anchor'),
                   leaderBoard : $('#leaderBoard'),
                lb_outerHeight : 0,
                   lb_paddings : 20,
                    tmLinksArr : $.merge($('#site-header-anchor').find('li > a'),[$("#search_form input[name~=tm_link]")]),
                      ssDelta  : $('#site-search').offset().top + 5,
                    actionDivs : {
                                  mini : {name: $('#mini-search'),min: 170, max: 300},
                                  main : {name: $('#site-search'),min: 232, max: 360}
                                 },
                    anchorSite : $('#site-header-anchor'),
               anchorLinksOmni : $('[data-omniExternalTrack]','#site-header-anchor') || {}
                  },
                  startListening: function(){
                    var dV = this.dataVals; 
                        dV.anchorSite.removeClass("on-scroll");
                        dV.anchorSite.show();
                         $.each(this.dataVals.anchorLinksOmni, function(){
                             $(this).click(function(){
                             var extOmniVal = TMsearchToggle_tt_vars.omn_domain_owner + ' ' + $(this).data('omniexternaltrack');
                             tm_omn.linkTrackVars='prop14,eVar14,events';
                                 tm_omn.linkTrackEvents='event27';
                                 tm_omn.prop14 = extOmniVal;
                                 tm_omn.eVar14 = extOmniVal;
                                 tm_omn.tl(true, 'o', 'Navigation Link');
                             })
                         })
                         
                         $.each(this.dataVals.actionDivs,function(i){
                             var self = this;
                             this.name.find('#search-wrap > input').live('focus',function(){
                                 if($(this).val() === search_text) {
                                    $(this).val("");
                                  }
                                 $(this).animate({ width: self.max});
                              }).live('blur',function(){
                                 if($(this).val() === "") {
                                   $(this).val(search_text);
                                 }
                                  var that = this;
                                  var delayMin = setTimeout(function(){ 
                                     if(!$('#search-suggest').length || ($('#search-suggest').length && $('#search-suggest').not(':visible'))){
                                       if($('#search-suggest').length && $('#search-suggest').not(':hidden')){
                                           $('#search-suggest').hide();
                                       }
                                       $(that).animate({ width: self.min});
                                     }
                                    }, 350)
                              });
                         });
                  },
                  leaderBoard: function(){
                  var dV = this.dataVals;
                     if(dV.leaderBoard.length){
                         if(dV.leaderBoard.height() < 30){
                             dV.leaderBoard.removeClass('vis');
                             dV.sha_offset = 0;
                             dV.anchorSite.addClass('on-scroll');
                         }else{
                            this.dataVals.lb_outerHeight = (dV.leaderBoard.height()+dV.lb_paddings);
                            dV.leaderBoard.addClass("vis");
                            dV.anchorSite.removeClass("on-scroll").show();
                         }
                     }else{
                        dV.anchorSite.addClass('on-scroll');
                    }
                   var self = this;
                   $(window).bind('scroll.miniSearch',function(){
                       self.checkScrollforSearch();
                   });
                  },
                  reorganizeDisplay: function(disp){
                      var actionItem = this.dataVals.actionDivs[disp];
                      if(!$.isEmptyObject(search_suggest) && $.isFunction(search_suggest.reset())){
                        search_suggest.reset();
                      }
                      actionItem.name.append($('#topNavSearchBlock'));
                      $('#mini-search,#mini-search-button,#site-nav-anchor-secondary,#search').toggle();
                      actionItem.name.find('#search-wrap > input').css('width',actionItem.min);
                  },
                  omniAnchorToggle: function(){
                      var dV = this.dataVals; that = this;
                      addAnchor = function(sel){
                         return $(this).attr(sel).replace(/^((.)*[tm mch]_link=)?(tm_)(homeA_)?/, "$&anchor_");
                      };
                      removeAnchor = function(sel){
                         return $(this).attr(sel).replace("_anchor_", "_");
                      };
                      $.each(dV.tmLinksArr, function(){
                          var that = this;
                          var attrSelector = $.map(['href','data-omniExternalTrack','value'],function(val){
                              if($(that).attr(val)){
                                  return val;
                              }
                          })
                          $.each(attrSelector, function(i,sel){ 
                              $(that).attr(sel,function(){
                                  return dV.msActive ?
                                      addAnchor.call(that,sel) :
                                      removeAnchor.call(that,sel);     
                              })
                          })
                      })
                  },
                  checkScrollforSearch: function(){
                      var dV = this.dataVals
                         ,st = $(window).scrollTop()
                         ,sha = dV.anchorSite.offset().top
                         ,ssDelta = dV.lb_outerHeight + dV.ssDelta;
                         
                            if((st === sha) && (st > ssDelta) && !dV.msActive){
                                 dV.msActive = true;
                                 this.reorganizeDisplay('mini');
                                 this.omniAnchorToggle();
                             }else if ((st <= ssDelta) && (sha <= ssDelta) && dV.msActive){
                                 dV.msActive = false;
                                 this.reorganizeDisplay('main');
                                 this.omniAnchorToggle();
                             };
                             
                             if(dV.lb_outerHeight >= st){
                                  dV.anchorSite.removeClass("on-scroll");
                             }else if(dV.lb_outerHeight < st){
                                  dV.anchorSite.addClass("on-scroll");
                             };
                  },
                  ie_fix: function(){
                    if($("body").width() > 1024) {
                        $(".require_ie_fix").each(function() {
                             $(this).addClass("ie_fix");
                        });
                    } else {
                        $(".require_ie_fix").each(function() {
                            $(this).removeClass("ie_fix");
                        });
                    }
                  },init: function(data){
                      $.extend(this.dataVals, data);
                      this.leaderBoard();
                      this.startListening();
                  }
            };
            
        TMsearchToggle.init({});
        
        if(navigator.appVersion.match(/MSIE\s+(?:7|8)\./)) { 
            $(document).ready(function($) {
                 var resizeTimer = null;
                 TMsearchToggle.ie_fix();
                 $(window).resize(function() {
                     if (typeof(resizeTimer) != null) {
                        clearTimeout(resizeTimer); // Clearing old timer to avoid unwanted resize calls.
                     }
                     resizeTimer = setTimeout(function() {
                          TMsearchToggle.ie_fix();
                     }, 200);
                });
            });
        }
    }
}(jQuery));
