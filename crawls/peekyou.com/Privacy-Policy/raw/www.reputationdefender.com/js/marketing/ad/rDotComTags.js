if (typeof(idCtr) == "undefined"){
	idCtr=0;
}

rDotComTag = (function(params){
	
	function RDotCom(parms){
		this.urlName = parms.urlName;
		this.size = parms.size;
		this.tags = {
            "Privacy-728x90"  : {
                                    imgSrc:"http://www.reputation.com/lp/images/peekyou/rd_728x90.gif",
                                    url:"http://www.reputation.com/?code=peekyou_1"
                                },
            "SearchResultsPage-728x90"  : {
                                    imgSrc:"http://www.reputation.com/lp/images/peekyou/rd_728x90.gif",
                                    url:"http://www.reputation.com/?code=peekyou_2"
                                },
								
            "ProfilePage-728x90"  : {
                                    imgSrc:"http://www.reputation.com/lp/images/peekyou/rd_728x90.gif",
                                    url:"http://www.reputation.com/?code=peekyou_3"
                                },
			"SearchResultsPage-300x250" : {
				            imgSrc:"http://www.reputation.com/lp/images/peekyou/rd_300x250.gif",
							url:"http://www.reputation.com/?code=peekyou_4"
			             },
            "ProfilePage-300x250" : {
                            imgSrc:"http://www.reputation.com/lp/images/peekyou/rd_300x250.gif",
                            url:"http://www.reputation.com/?code=peekyou_5"
                         }
		};
	}
	
	RDotCom.prototype.createImg = function(){
		idCtr++;      
        var id = "rdcimg_" + ((new Date()).getTime() % 10000007 + parseInt(Math.random() * 10000))+ "-" + idCtr;       		
        var tag = this.tags[ this.urlName + "-" + this.size];
		var peekYou = typeof(peekyouclicktracking) == "undefined" ? "" : peekyouclicktracking;
		var url = peekYou + tag.url;
//        document.writeln('<a href="' + url + '"><img id="' + id + '" src="' + tag.imgSrc + '" style="cursor:pointer"/></a>');
        document.writeln('<img id="' + id + '" src="' + tag.imgSrc + '" style="cursor:pointer"/>');
		var img = document.getElementById(id);
		this.registerEvent("click", img, "imgClick", [img, url]);
	}
	
    RDotCom.prototype.imgClick = function(event, imgObj, url){
		document.location.href = url;
	}
	
	RDotCom.prototype.registerEvent = function(type, obj, fn, args) {
        if (typeof fn == "string")
            fn = this[fn];
        args = args||[];
		
        if ( !(args instanceof Array)){
	        args = !args ? []: [args];
	    }   

	    var that = this;
	    if (obj.addEventListener) {
	        obj.addEventListener (type, function(e) {
	            var ag = [e];
                for (var i = 0; i < args.length; i++) {
					ag.push(args[i]);
				}
	            fn.apply(that, ag);
	        }, false);
	    } else if (obj.attachEvent) {
	        obj.attachEvent ("on"+type, function(e) {
                var ag = [e];
                for (var i = 0; i < args.length; i++) {
                    ag.push(args[i]);
                }
	            fn.apply(that, ag);
	        });
	    } else {
	        obj["on"+type] = (function () {
	            return function(e) {
                    var ag = [e];
                    for (var i=0; i<args.length; i++){
                        ag.push(args[i]);
                    }
					alert("from else")
                    fn.apply(that, ag);
	            };
	        })();
	    } 
	}
	
	var r = new RDotCom(params);
	r.createImg();
	return RDotCom;
})(rdTag);
