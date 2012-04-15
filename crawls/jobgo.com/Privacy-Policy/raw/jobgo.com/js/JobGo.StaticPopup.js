JobGo.StaticPopup = {
    createContainer: function() {
        $('<div id="staticpopup-dialog"><div id="staticpopup-wrapper" class="staticpopup-wrapper"></div> <div class="close-button-wrap"><a href="javascript:void(0)" id="lnkCloseStaticPopup" class="btn-grey"><span>Close</span></a><div style="clear:both"></div></div> </div>').appendTo(document.body);
    }
};

JobGo.StaticPopup.OnLoad = function()
{

    new JobGo.Dialog.Modal('#staticpopup-dialog', false, {
        width: 700,
        minWidth: 700,
        maxWidth: 700,
        minHeight: 500,
        maxHeight: 500,
        height: 500,
        buttons: null,
        draggable: false,
        resizable: false,
        bgiframe: true,
        autoOpen:false,
        position:['center', 20],
        onClose:function(){ $('#staticpopup-wrapper').html(''); }
    });
}

JobGo.StaticPopup.ShowClick = function(identificator)
{
	$.post('/static/' + identificator, function(data)
	{
		$('#staticpopup-wrapper').html(data);
	    $('#staticpopup-dialog').dialog('open');
	    $('#staticpopup-wrapper').scrollTop(0);
		$('#lnkCloseStaticPopup').click(function()
		{
			$('#staticpopup-dialog').dialog('close');
		});
	});
}
