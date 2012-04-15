$( document ).ready( function(){
	typeof mrm != "undefined" || (mrm = {});
	mrm.js = {"setArrowListHeight" : function() {
		var arrowListHeight = 0;
		$( 'div.arrowRow' ).css({height: "auto"});
		$( 'ul.arrowList' ).each( function(){
			arrowListHeight = $( this ).height() > arrowListHeight ? $( this ).height() : arrowListHeight;
		});
		$( 'div.arrowRow' ).css({ height: arrowListHeight });
			}
	};
	mrm.js.setArrowListHeight();
});