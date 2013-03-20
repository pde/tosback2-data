(function($) {

/**
 * jQuery debugging helper.
 *
 * Invented for Dreditor.
 *
 * @usage
 *   $.debug(var [, name]);
 *   $variable.debug( [name] );
 */
jQuery.extend({
  debug: function () {
    // Setup debug storage in global window. We want to look into it.
    window.debug = window.debug || [];

    args = jQuery.makeArray(arguments);
    // Determine data source; this is an object for $variable.debug().
    // Also determine the identifier to store data with.
    if (typeof this == 'object') {
      var name = (args.length ? args[0] : window.debug.length);
      var data = this;
    }
    else {
      var name = (args.length > 1 ? args.pop() : window.debug.length);
      var data = args[0];
    }
    // Store data.
    window.debug[name] = data;
    // Dump data into Firebug console.
    if (typeof console != 'undefined') {
      console.log(name, data);
    }
    return this;
  }
});
// @todo Is this the right way?
jQuery.fn.debug = jQuery.debug;

})(jQuery);
;
var contentanalysis = contentanalysis || {};

(function ($, $$) {
  $.extend($$, {
    contentanalysisPrevAnalyzerTab:'',
    contentanalysisPrevReportTab:'',
    contentanalysisCurrentAnalyzerTab:'',
    contentanalysisCurrentReportTab:'',
    contentanalysisReportActiveTab:{},

    init:function () {
      $$.contentanalysis_contentanalysisui();
    },

    contentanalysis_contentanalysisui:function () {
      if ($('#modalContent div.analyzers h3.analyzer').size() > 0) {
        $$.contentanalysis_show_analyzer_tab($('div.analyzers h3.analyzer').get(0));
        $('div.analyzers h3.analyzer').mousedown(function () {
          $$.contentanalysis_show_analyzer_tab(this);
        })
        $('h3.contentanalysis-report-tab').mousedown(function () {
          $$.contentanalysis_show_report_tab(this);
        })
      }
    },

    contentanalysis_back:function () {
      $$.contentanalysis_show_analyzer_tab(contentanalysisPrevAnalyzerTab);
    },

    contentanalysis_show_analyzer_tab:function (theTab) {
      $('div.analysis-results div.analyzer-analysis:eq(' + $('.analyzers h3.analyzer').index(theTab) + ')').children('.content-analysis-tab:first').addClass('active');
      $('div.analysis-results div.analyzer-analysis').hide();
      $('.analyzers h3.analyzer').removeClass('active');
      $(theTab).addClass('active');
      $('div.analysis-results div.analyzer-analysis:eq(' + $('.analyzers h3.analyzer').index(theTab) + ')').show();
      $('.content-analysis-results').hide();

      var id = $(theTab).attr('id');
      var e = id.split('-');
      var analyzer = e[3];

      if ($$.contentanalysisReportActiveTab[analyzer]) {
        $$.contentanalysis_show_report_tab($('#contentanalysis-report-tab-' + analyzer + '-' + $$.contentanalysisReportActiveTab[analyzer]));
      }
      else {
        $$.contentanalysis_show_report_tab($('#contentanalysis-report-tab-' + analyzer + '-0'));
      }
      $$.contentanalysisPrevAnalyzerTab = $$.contentanalysisCurrentAnalyzerTab;
      $$.contentanalysisCurrentAnalyzerTab = theTab;
    },

    contentanalysis_show_report_tab:function (theTab) {
      var id = $(theTab).attr('id');
      var e = id.split('-');
      $$.contentanalysisReportActiveTab[e[3]] = e[4];
      $('h3.contentanalysis-report-tab').removeClass('active');
      $(theTab).addClass('active');
      $('.contentanalysis-results-section').hide();

      var tabs = $("#contentanalysis-report-tabs-" + e[3]);
      var pos = $("#contentanalysis-report-tabs-" + e[3]).position();
      var offset = $("#contentanalysis-report-tabs-" + e[3]).offset();
      var height = tabs.height();
      var top = (pos.top + height) + "px";
      var left = (pos.left) + "px";

      var sec_id = id.replace('tab', 'results');
      var result_id = sec_id.replace('-' + e[4], '')
      $('#' + result_id).css('top', top);
      $('#' + sec_id).show();
      $$.contentanalysisPrevReportTab = $$.contentanalysisCurrentReportTab;
      $$.contentanalysisCurrentReportTab = theTab;
    },

    // called from inline Analyze content button
    contentanalysis_inline_analysis:function () {
      Drupal.settings.contentanalysis.display_dialog = 0;
      Drupal.settings.contentanalysis.display_inline = 1;
      $('#contentanalysis-buttons').after('<div class="ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div><div class="message">' + Drupal.t('Analyzing...') + '</div></div>');
      $$.contentanalysis_analyze();
    },

    // called from inline Analyze content button
    contentanalysis_dialog_analysis:function () {
      Drupal.settings.contentanalysis.display_dialog = 1;
      Drupal.settings.contentanalysis.display_inline = 0;
      $$.contentanalysis_analyze();
    },

    // called from inline Analyze content button
    contentanalysis_full_analysis:function () {
      Drupal.settings.contentanalysis.display_dialog = 1;
      Drupal.settings.contentanalysis.display_inline = 1;

      $$.contentanalysis_analyze();
    },

    // called from inline Analyze content button
    contentanalysis_refresh_analysis:function (analyzer) {
      Drupal.settings.contentanalysis.display_dialog = 0;
      Drupal.settings.contentanalysis.display_inline = 1;
      $('.contentanalysis-refresh-link-' + analyzer).replaceWith('<div class="ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div></div>');
      $$.contentanalysis_analyze(analyzer);
    },

    contentanalysis_analyze:function (analyzer_override) {
      // if TinyMCE is used, turn off and on to save body text to textarea
      var data = {
        'nid':-1,
        'node_type':-1,
        'source':-1,
        'analyzers':-1,
        'title':-1,
        'body':-1,
        'body_summary':-1,
        'page_title':-1,
        'meta_title':-1,
        'meta_keywords':-1,
        'meta_description':-1,
        'path_alias':-1,
        'path_pathauto':-1,
        'url':-1,
        'page':-1,
        'body_input_filter':-1,
        'hidden':-1,
        'code':Drupal.settings.contentanalysis.code,
        'action':-1
      };
      if (analyzer_override) {
        data.action = 'refresh';
      }
      if ($('#contentanalysis-page-analyzer-form').html()) {
        data.source = 'admin-form';
        data.body = $('[name=input]').val()
        data.nid = $('[name=input_nid]').val()
        data.url = $('[name=input_url]').val()
        if (data.body == '') {
          data.body = -1;
        }
        if (data.nid == '') {
          data.nid = -1;
        }
        if (data.url == '') {
          data.url = -1;
        }
      }
      else {
        if ($('.node-form').html()) {
          data.source = 'node-edit-form';
          // Turn off TinyMCE if enabled
          if (typeof tinyMCE == 'object') {
            tinyMCE.get('edit-body-und-0-value').hide();
          }
          // Turn off CKEditor if any.
          var ckeditor = false;
          if ($('#cke_edit-body-und-0-value').html()) {
            $('#wysiwyg-toggle-edit-body-und-0-value').click();
            ckeditor = true;
          }

          data.title = $('#edit-title').val();
          data.body = $('#edit-body-und-0-value').val();
          if ($('#edit-body-und-0-summary').val() != null) {
            data.body_summary = $('#edit-body-und-0-summary').val();
          }
          data.nid = Drupal.settings.contentanalysis.nid
          data.node_type = Drupal.settings.contentanalysis.node_type
          data.body_input_filter = $("select[name='body[und][0][format]'] option:selected").val();

          if ($('#edit-page-title').val() != null) {
            data.page_title = $('#edit-page-title').val();
          }
          // check if metatag module fields exist
          if ($('#edit-metatags-title-value').val() != null) {
            data.meta_title = $('#edit-metatags-title-value').val();
          }
          if ($('#edit-metatags-keywords-value').val() != null) {
            data.meta_keywords = $('#edit-metatags-keywords-value').val();
          }
          if ($('#edit-metatags-description-value').val() != null) {
            data.meta_description = $('#edit-metatags-description-value').val();
          }
          if ($('#edit-path-alias').val() != null) {
            data.url = window.location.host + Drupal.settings.contentanalysis.base_path + $('#edit-path-alias').val();
            data.path_alias = $('#edit-path-alias').val();
          }
          if ($("input[name='path[pathauto]']:checked").val() != null) {
            data.path_pathauto = 1;
          }
          // Turn back on tinyMCE
          if (typeof tinyMCE == 'object') {
            tinyMCE.get('edit-body-und-0-value').show();
          }
          // Turn back on CKEditor if needed.
          if (ckeditor) {
            $('#wysiwyg-toggle-edit-body-und-0-value').click();
          }

        }
        else {
          data.source = 'page-link';
          data.page = $('html').html()
          data.url = window.location.href
        }
      }
      if (Drupal.settings.contentanalysis.hidden != null) {
        data.hidden = Drupal.settings.contentanalysis.hidden;
      }

      var analyzers_arr = new Array();
      if (analyzer_override) {
        data.analyzers = analyzer_override;
        analyzers_arr[0] = data.analyzers;
      }
      else {
        if ($('#contentanalysis_analyzers_override input').val() != null) {
          data.analyzers = $('#contentanalysis_analyzers_override input').val();
          analyzers_arr[0] = data.analyzers;
        }
        else {
          var i = 0;
          $('#contentanalysis_analyzers .form-checkbox:checked').each(function () {
            var expr = new RegExp(/\[[^\]]+\]/);
            analyzers_arr[i] = expr.exec($(this).attr('name'))[0].replace(']', '').replace('[', '');
            i++;
          })
          data.analyzers = analyzers_arr.join(',');
        }
      }
      // call contentanalysis_data for enabed analyzers
      for (var i in analyzers_arr) {
        var aid = analyzers_arr[i];
        var module = Drupal.settings.contentanalysis.analyzer_modules[aid].module;
        if (eval('typeof ' + module + '_contentanalysis_data == "function"')) {
          d = eval(module + '_contentanalysis_data')(aid, data);
          for (var k in d) {
            eval('data.ao_' + aid + '_' + k + ' = "' + d[k] + '";');
          }
        }
      }
      $('#contentanalysis-buttons').hide();
      $.ajax({
        type:'POST',
        url:Drupal.settings.contentanalysis.analyze_callback,
        data:data,
        dataType:'json',
        success:function (data, textStatus) {
          analyzers_arr = data.inputs['analyzers'].split(",");
          if (Drupal.settings.contentanalysis.display_dialog == 1) {
            $('#analysis-modal').append(data.main['output']);
            $('#analysis-modal .progress').remove();
            $$.contentanalysis_contentanalysisui()
          }
          // display inline if enabled
          if (Drupal.settings.contentanalysis.display_inline == 1) {
            if (data.inputs['action'] == 'refresh') {
              for (i in analyzers_arr) {
                aid = analyzers_arr[i];
                $('.contentanalysis-report-' + aid + '-page_title').replaceWith(data.page_title['output']);
                $('.contentanalysis-report-' + aid + '-body').replaceWith(data.body['output']);
                $('.contentanalysis-report-' + aid + '-meta_description').replaceWith(data.meta_description['output']);
                $('.contentanalysis-report-' + aid + '-meta_keywords').replaceWith(data.meta_keywords['output']);
              }
            }
            else {
              var show_title = true;
              if ($('.form-item-metatags-title-value').length > 0) {
                $('.form-item-metatags-title-value > .contentanalysis_section_analysis').remove();
                $('.form-item-metatags-title-value').append(data.page_title['output']);
                // check if metatag-title contains [node:title] token
                if ($('#edit-metatags-title-value').val() != null) {
                  var meta_title = $('#edit-metatags-title-value').val();
                  if (meta_title.indexOf("[node:title]") == -1) {
                  }
                }
              }
              if (show_title) {
                $('.form-item-title > .contentanalysis_section_analysis').remove();
                $('.form-item-title').append(data.page_title['output']);
              }

              $('#edit-body > .contentanalysis_section_analysis').remove();
              $('#edit-body').append(data.body['output']);
              // check newer nodewords format
              if (($('.form-item-metatags-description-value').length > 0) && data.meta_description != null) {
                $('.form-item-metatags-description-value > .contentanalysis_section_analysis').remove();
                $('.form-item-metatags-description-value').append(data.meta_description['output']);
              }

              if (($('.form-item-metatags-keywords-value').length > 0) && data.meta_keywords != null) {
                $('.form-item-metatags-keywords-value > .contentanalysis_section_analysis').remove();
                $('.form-item-metatags-keywords-value').append(data.meta_keywords['output']);
              }
            }
            for (var i in analyzers_arr) {
              var aid = analyzers_arr[i];
              h = '<a href="#" class="contentanalysis-refresh-link-' + aid + '" onclick="contentanalysis.contentanalysis_refresh_analysis(\'' + aid + '\'); return false;">';
              h += '<img src="' + Drupal.settings.contentanalysis.path_to_module + '/icons/refresh.png" alt="refresh" />';
              h += '</a>';
              $('.contentanalysis-report-' + aid + ' label').append(h);
            }
          }
          // call any modules post analysis hooks
          for (var i in analyzers_arr) {
            var aid = analyzers_arr[i];
            var module = Drupal.settings.contentanalysis.analyzer_modules[aid].module;
            if (eval('typeof ' + module + '_contentanalysis_analysis_success == "function"')) {
              eval(module + '_contentanalysis_analysis_success')(aid, data);
            }
          }
          if (typeof Drupal.behaviors.collapse == 'function') {
            Drupal.behaviors.collapse();
          }
          $('.ahah-progress-throbber').remove();
          $('#contentanalysis-buttons').show();
        },
        error:function (xhr, status) {
          alert(xhr.responseText.toString());
          $('.ahah-progress-throbber').remove();
          $('#contentanalysis-buttons').show();
        }
      });
      return false;
    }
  });

  Drupal.behaviors.contentanalysisui = {
    attach:function (context, settings) {
      $$.init();
    }
  };

  Sliders = {};

  Sliders.changeHandle = function (e, ui) {
    var id = jQuery(ui.handle).parents('div.slider-widget-container').attr('id');
    if (typeof(ui.values) != 'undefined') {
      jQuery.each(ui.values, function (i, val) {
        jQuery("#" + id + "_value_" + i).val(val);
        jQuery("#" + id + "_nr_" + i).text(val);
      });
    }
    else {
      jQuery("#" + id + "_value_0").val(ui.value);
      jQuery("#" + id + "_nr_0").text(ui.value);
    }
  };

})(jQuery, contentanalysis);
;
var contentoptimizer_contentanalysis_data = function(aid) {		
  data = new Array();	
  data['keyword'] = document.getElementById('edit-seo-keyword').value;	
  return data;
};
/**
 * @file
 * Loads report blocks via ajax.  This is done because the API requests to Google
 * Analytics can add signifigant latency to page loads otherwise.
 */
(function ($) {

Drupal.behaviors.googleAnalyticsReports = {
  attach: function (context, settings) {
    $('#block-google-analytics-reports-path-mini,#block-google-analytics-reports-dashboard', context).show();

    if ($('.google-analytics-reports-path-mini', context).length) {
      $.ajax({
        url: Drupal.settings.googleAnalyticsReportsAjaxUrl + '/path-mini',
        dataType: 'json',
        data: ({ path: window.location.pathname + window.location.search }),
        success: function(data) {
          $('.google-analytics-reports-path-mini', context).html(data.content).hide().slideDown('fast');
        },
        error: function(data) {
          // @TODO
        }
      });
    }

    if ($('.google-analytics-reports-dashboard', context).length) {
      $.ajax({
        url: Drupal.settings.googleAnalyticsReportsAjaxUrl + '/dashboard',
        dataType: 'json',
        success: function(data) {
          $('.google-analytics-reports-dashboard', context).html(data.content).hide().slideDown('fast');
        },
        error: function(data) {
          // @TODO
        }
      });
    }
  }
}

})(jQuery);;
// $Id:

(function ($) {

  Drupal.behaviors.user_alert_get_message = {
    attach: function(context) {
      $.ajax({
        type: 'GET',
        url: Drupal.settings.basePath + Drupal.settings.user_alert.url_prefix + 'js/user-alert/get-message',
        success: function(response) {
          var id = $('.block-user-alert').attr('id');
          if (typeof response[1] !== 'undefined') {
            $('#' + id).html(response[1].data);
          }
        }
      });
    	
      $('body').delegate('div.user-alert-close a', 'click', function() {
        id = $(this).attr('rel');
        $.ajax({
          type: 'GET',
          data: 'message=' + id,
          url: Drupal.settings.basePath + Drupal.settings.user_alert.url_prefix + 'js/user-alert/close-message',
          success: function(response) {
            $('#user-alert-' + id).fadeOut('slow');
          }
        });
      });
  	}
  };
}(jQuery));;
