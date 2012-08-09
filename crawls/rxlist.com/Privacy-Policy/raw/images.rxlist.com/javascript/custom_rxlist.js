$(document).ready(function() {
    $('.artTable tbody tr:odd').addClass('odd');

    //Related Toggle
    $('.ltcToggleTitle').click(function () {
        $(this).closest('.ltcToggle').find('.ltcToggleWrap').slideToggle();
        $(this).closest('.ltcToggle').find('.ltcToggleTitle i').toggleClass('down');
    });
});

