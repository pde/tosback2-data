var followus = function() {
	setTimeout(function(){
		twttr.anywhere(function(T){
			if(!T.isConnected()){
				T.requireConnect(function(){
					T.User.find('RollingStone').follow({
						success: function(){ alert('Thank You'); },
						error: function(T){ alert([T.status, T.response.error]); }
					});
				});
			}
		});
	}, 10);
	return false;
};