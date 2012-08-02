/* browse/compare specific table functions */
/* ++++++++++++++++++++++++++++++++++
dynamic compare table
++++++++++++++++++++++++++++++++++ */
$(function() {
	function setTableClass() {
		var visibleColumns = $('.detailed-compare thead tr.last th:visible, .detailed-compare thead tr.last td:visible').length;
		switch(visibleColumns) {
			case 4:
				$('.detailed-compare').addClass('compare-three');
				break;
			case 3:
				$('.detailed-compare').removeClass('compare-three').addClass('compare-two');
				break;
			case 2:
				$('.detailed-compare').removeClass('compare-two').addClass('compare-one');
				$('.remove').hide();
				$('.return').show();
				break;
			default:
		}
	}
	setTableClass();
	$('.remove').click(function() { 
		hotIndex = $(this).parent().index() + 1;
		$('.detailed-compare tr td:nth-child(' + hotIndex + '),.detailed-compare tr th:nth-child(' + hotIndex + ')').hide();
		$('td.calloutappsubmit').show();
		setTableClass();
	});
});


/* ++++++++++++++++++++++++++++++++++
dynamic browse table
++++++++++++++++++++++++++++++++++ */
function initBrowseTable() {
     var Browse = {};
     //Reset
	$('table.browse-table div.compareCheckbox input:checkbox').removeAttr('checked').removeAttr('disabled').next('label').removeClass('disabled-label');
     //Variables
     Browse.prodCount = $('.compare-checkbox:checked').length;
     
     Browse.compareButtonEnabled = '<a class="compare-submit" href="#" id="cmp_button_bottom" style="display: inline;"><img src="/assets/img/global/btn/info-body-compare.gif" align="absmiddle" alt="Compare Button" title="View Product Comparison Results" /></a>';
     Browse.compareButtonDisabled = '<img src="/assets/img/global/btn/disabled-body-compare.gif" align="absmiddle" alt="Compare Button (disabled)" title="Select at least 2 products to compare" />';
     
     Browse.jq_infoTip = $('body').append('<div id="compareInfoTip" class="none"></div>').find("#compareInfoTip").eq(0);
     Browse.jq_infoTip.append('<div class="compareState nothingSelected">Check the box next to each <br />product you want to compare.</div>');
     Browse.jq_infoTip.append('<div class="compareState oneSelected">You can compare up to 3 products. <br />(Please select at least one more to compare.)</div>');
     Browse.jq_infoTip.append('<div class="compareState multiSelected">When you\'re ready, click the <span class="buttonName"></span>&nbsp;button.<br />(<span class="numChecked">'+ Browse.prodCount +'</span> currently checked, maximum of 3.)</div>');
     Browse.jq_infoTip.append('<div class="compareState maxSelected">You\'ve selected the maximum of 3 cards.</div>');
     
     //Functions
     Browse.setCompareQuery = function() {
           Browse.setCompareBtnState();
           Browse.setLabels();
           if (Browse.prodCount > 1) {
                var selectedProducts = $('.compare-checkbox:checked').map(function(){
                     return $(this).attr('id');
                }).get().join("~");

				compareTargetPage = typeof(compareTargetPage) == 'undefined' ? '/compare' : compareTargetPage;
                var targetPage = compareURL+compareTargetPage+'?pid=' + selectedProducts + '&fbtoc=true';
				
                $('.compare-submit').attr('href',targetPage);
                $('.compareNowLink').attr('href',targetPage);
           }
     }
     Browse.setTooltipState = function(){
           if (Browse.prodCount == 0) {
                $('div.compareState').removeClass('compareStateOn');
                $('div.compareState:eq(0)').show().addClass('compareStateOn');
                $('div.compareState:not(:eq(0))').hide();
           } else if (Browse.prodCount == 1) {
                $('div.compareState').removeClass('compareStateOn');
                $('div.compareState:eq(1)').show().addClass('compareStateOn');
                $('div.compareState:not(:eq(1))').hide();
           } else if (Browse.prodCount == 3) {
                $('div.compareState').removeClass('compareStateOn');
                $('div.compareState:eq(3)').show().addClass('compareStateOn');
                $('div.compareState:not(:eq(3))').hide();
           } else {
                $('div.compareState').removeClass('compareStateOn');
                $('div.compareState:eq(2)').show().addClass('compareStateOn');
                $('div.compareState:not(:eq(2))').hide();
                $('div.multiSelected span.numChecked').html(Browse.prodCount);
           }
     }
     Browse.setCompareCheckboxState = function() {
           if (Browse.prodCount > 2) {
                $('.compare-checkbox:not(:checked)').attr('disabled','disabled').next().addClass('disabled');
           } else {
                $('.compare-checkbox').removeAttr('disabled').next().removeClass('disabled');
           }
     }
     Browse.setCompareBtnState = function() { 
           switch(Browse.prodCount) {
                case 3:
                     $('.compare-btn').html(Browse.compareButtonEnabled);
                     break;
                case 2:
                     $('.compare-btn').html(Browse.compareButtonEnabled); 
                     break;
                case 1:
                     $('.compare-btn').html(Browse.compareButtonDisabled);  
                     break;
                default:
           }
     }
     Browse.setLabels = function() {
           $('.compare-checkbox').next('label').text('Compare');
           if (Browse.prodCount > 1) {
                $('.compare-checkbox:checked').next('label').html('<a class="compareNowLink" href="#">Compare Now</a>');   
           }
     }
     
     //Init
     Browse.setCompareQuery();
     Browse.setTooltipState();
     Browse.setCompareCheckboxState();
     
     //Events
     $('.compare-checkbox').change(function(){
           Browse.prodCount = $('.compare-checkbox:checked').length;
           Browse.setCompareQuery();
           Browse.setTooltipState();
           Browse.setCompareCheckboxState();
     });
     $('div.compareCheckbox').tooltip({
           bodyHandler: function() { return( Browse.jq_infoTip ); },
           showURL: false,
           track: true,
           delay: 0                                        
     });
  	//table detailed-compare
	$('table.detailed-compare tr').each(function() { $(this).find('td, th').first().addClass('first'); });
	$('table.detailed-compare').each(function() { 
		$(this).find('tbody tr:odd').addClass('even');
		$(this).find('tbody tr:even').addClass('odd');
		$(this).find('tbody tr').first().addClass('first');
		$(this).find('tbody tr').last().addClass('last');
		$(this).find('thead tr').last().addClass('last');
	});
}

$(function() {
	initBrowseTable();	
});