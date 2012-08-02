function basePageStr(){
	var pat = /^([\w\/]*)\./,
		result = pat.exec( window.location.pathname );
	return result[1];
}

function investorsFilter() {
	return window.location.pathname.split('.html')[0];
}

$('document').ready(function(){
	if( $( 'body' ).hasClass( 'newsarchivepage' )){
		var filter = /filter\-/.test( window.location.pathname ) ? decodeURI( window.location.pathname.split('filter-')[1].split('.')[0] ).replace( "_", " " ) : 'SEE ALL';
			viewPerPage = /display\-/.test( window.location.pathname ) ? window.location.pathname.split('display-')[1].split('.')[0] + ' PER PAGE' : '10 PER PAGE';
		//console.log( 'filter:', filter );
		//console.log( 'viewPerPage:', viewPerPage );
		$( 'div.filters select' ).next( 'span' ).html( filter );
		$( 'div.viewPerPage select' ).next( 'span' ).html( viewPerPage );
		$( 'select' ).change( function(){
			var filter = $( this ).parents( 'div.resultsWrapper' ).find( 'div.filters select' ).val(),
				viewPerPage = $( this ).parents( 'div.resultsWrapper' ).find( 'div.viewPerPage select' ).val();
				//console.log('filter #:', filter);
				//console.log('viewPerPage #:', viewPerPage);
			if( filter && viewPerPage ){
				window.location.href = basePageStr() + '.filter-' + filter + '.display-' + viewPerPage + '.html';
			} else if( filter && !viewPerPage ){
				window.location.href = basePageStr() + '.filter-' + filter + '.html';
			} else if( !filter && viewPerPage ){
				window.location.href = basePageStr() + '.display-' + viewPerPage + '.html';
			}
		});
	}
	
    if(  $( 'body' ).hasClass( 'investorsnewsarchivepage' )){
        $( 'select' ).change( function(){

            var filter = $( this ).parents( 'div.resultsWrapper' ).find( 'div.filters select' ).val();
            filter = escape(filter);
            var viewPerPage = $( this ).parents( 'div.resultsWrapper' ).find( 'div.viewPerPage select' ).val();
            var filterPerYear = $( this ).parents( 'div.resultsWrapper' ).find( 'div.filterPerYear select' ).val();
            var filterPerQ = $( this ).parents( 'div.resultsWrapper' ).find( 'div.filterPerQ select' ).val();

            window.location.replace( investorsFilter() + '.html?filter='+filter+'&display='+viewPerPage+'&year='+filterPerYear+'&Q='+filterPerQ);

        });
    }
});