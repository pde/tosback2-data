function searchParse(){
	var queryString, array1, array2, ret = {};
	queryString = window.location.search;
	queryString = queryString.substring(1);
	array1 = queryString.split("&");
	for( var i = 0; i < array1.length; i++ ){
		array2 = array1[i].split( "=" );
		ret[array2[0]] = array2[1];
	}
	return ret;
}

$(document).ready(function() {
	var searchTerm = searchParse()['q'],//<%= request.getParameter( "q" ) %>",
		page = 'page',
		hashPat = /^\#\/(.*)$/,
		hashResult = hashPat.exec( window.location.hash ),
		pagename = '',
		options = {};
	switch( true ){
		case $( 'body' ).hasClass( 'tabpage' ):
			if( hashResult ){
				pagename = hashResult[1];
			} else {
				pagename = $( 'ul#bottomTabContainerData li:eq(0)' ).attr( 'title' );
			}
			page = 'tab_page';
			options = { name : pagename };
			break;
		case uri == '/content/gmcom/home/article':
			options = { 'article_name' : $( 'div.flexLeftContent h3:eq(0)' ).text() }
			break;
		case typeof( brand ) != 'undefined' && typeof( model ) != 'undefined':
			//Page names have underscores; the existing omniture data has dashes.
			options = { brand : brand.replace( '_', '-' ), model : model.replace( '_', '-' ) };
			break;
		case $( 'span#numberOfDealersFound' ).length > 0:
			page = 'results_page';
			break;
		case location.search.length > 0 && searchTerm && searchTerm.length > 0:
			options = { "internal_search_term" : searchTerm };
			break;
		case $( 'div.mds-cmp-thank_you' ).length > 0:
			page = 'page_thankyou';
	}
	fireMetrics( page, options );
});
