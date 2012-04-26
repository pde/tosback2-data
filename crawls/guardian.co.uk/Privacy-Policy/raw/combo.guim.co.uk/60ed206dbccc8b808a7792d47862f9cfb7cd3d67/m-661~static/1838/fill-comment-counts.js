/* m-661~static/1838/fill-comment-counts.js */
jQ( function( $ ) {
    var serviceEndpoint = guardian.r2.resourceRoot + 'discussion/api/getCommentCounts.json';
    var shortUrls = '';
    
    var commentableLinks = $( '.content-comment-count, .trail-comment-count' ).each(
	function() {
            var shortUrl = $( this ).attr( 'short-url' ).replace('-', '/').replace('-', '/');
            shortUrls += shortUrl + ',';
	} );

    var data = { 'short-urls': shortUrls };

    $.ajax( {
        dataType: 'jsonp',
        jsonpCallback: 'commentCountCallback',
        url: serviceEndpoint,
        data: data,
        cache: true,
        success: successFunction
    } );            

    function successFunction( data ) {
        var commentRecords = {};
        
        $.each( data, function( i, commentRecord ) {
            var shortUrlForDom = commentRecord.shortUrl.replace('/', '-').replace('/', '-');
            commentRecords[ shortUrlForDom ] = commentRecord.numberOfComments;
        } );
        
        commentableLinks.filter( '.comments-open' ).each( function() {
            var nComments = getCommentCount( $( this ) );
            $( this ).children( '.comment-count-val' ).html( commentCountVal( nComments ) );
            $( this ).toggle();
        } );

        commentableLinks.filter( '.comments-closed' ).each( function() {
            var nComments = getCommentCount( $( this ) );
            if( nComments > 0 ) {
                $( this ).children( '.comment-count-val' ).html( commentCountVal( nComments ) );
                $( this ).toggle();
            }
            else
                $( this ).remove()
        } );
        
        commentableLinks.filter( '.content-comment-count' ).each( function() {
            var nComments = getCommentCount( $( this ) );
            $( this ).children( '.comment-count-val' ).html( nComments );
        } );

        function commentCountVal( nComments ) {
            if( nComments == 0 )
                return 'Post your comment';
            
            var label = nComments > 1 ? '&nbsp;comments' : '&nbsp;comment';
            return nComments + label;
        }

        function getCommentCount( commentableLink ) {
            var shortUrl = commentableLink.attr( 'short-url' );
            var nComments = commentRecords[ shortUrl ];
            
            if( nComments == undefined )
                nComments = 0;

            return nComments;
        }
    }
} );

