( function($){
    try {
        if (window && window.external && window.external.msIsSiteMode()){
            var favicon = $('link[rel=icon]').attr('href') || "/images/favicon.ico";  
            window.external.msSiteModeCreateJumplist('IMDb Favorites');
            window.external.msSiteModeAddJumpListItem('Now Playing', '/nowplaying/', favicon);
            window.external.msSiteModeAddJumpListItem('Top Box Office Movies', '/chart/', favicon);
            window.external.msSiteModeAddJumpListItem('IMDb Video', '/features/video/', favicon);
            window.external.msSiteModeAddJumpListItem('DVD & Blu-Ray', '/sections/dvd/', favicon);
            window.external.msSiteModeAddJumpListItem('Community', '/boards/', favicon);
            window.external.msSiteModeAddJumpListItem('IMDb Pro', 'http://pro.imdb.com', favicon);
            window.external.msSiteModeShowJumplist();
        }
    }
    catch(ex){
    }

} )(jQuery);
