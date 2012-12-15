$(document).ready(function(){
    // SUBNAV ACCORDIONS
    $('#interior-nav').accordion({
        autoHeight: false,
        // clearStyle: true,
        collapsible: true,
        header: 'h2.header'
    });
    $('#interior-nav h2.header').each(function(index){
        // get current from h2
        if ($(this).hasClass('current')){
            if (index!=0){
                $('#interior-nav').accordion( "activate" , index);
            }
            $(this).next().find('li.first').addClass('current');
            // console.log("HEADER")
        } else {
            // get current from li
            if ($(this).next().find('li').hasClass('current')){
                if (index!=0){
                    $('#interior-nav').accordion( "activate" , index);
                }
                $(this).addClass('current');
                // console.log("LI")
            };
        }
    })
    // NEWS SEARCH
    $('#news-search-field').focusin(function(e){
        $('.news-search-input label').fadeOut(200);
    });
    // clear input if search term already entered
    var newsSearchInput = $('#news-search-field').attr('value');
    if (newsSearchInput){
        $('#news-search-field').attr('value', '');
    }
});