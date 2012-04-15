var sl = sl || {    
    coupons : {
        getDeviceId : function(){
            var cookie = readSubCookie("SLHCookie", "couponDevId");            
            return cookie != null ? cookie : -1;
        },
        setDeviceId : function(value){
            setSubCookieWithVdir('SLHCookie', 'couponDevId', value);
        },
        getClippings : function(){
            var cookie = readSubCookie("SLHCookie", "couponclippings");            
            return cookie != null && cookie != "" ? cookie.split('|') : [];
        },
        popUpPrintWindow : function(){
            if(this.getClippings().length > 0)
                window.open("couponsprint.aspx?deviceId=" + this.getDeviceId(), "couponsPrinter", "height=400,width=600");
        },  
        toggleClipping : function(bAdd, couponId, onComplete, onCompleteArgs){
            var clippings = this.getClippings();
            var existingIndex = -1;
            
            for(var x = 0; x < clippings.length; x++){
                if(clippings[x] == couponId){
                    existingIndex = x; break;
                }
            }
            // add it            
            if(bAdd && existingIndex == -1 && clippings.length < 50)
                clippings.push(couponId);
            // remove it
            else if(bAdd == false && existingIndex >= 0)
                clippings.splice(existingIndex,1);        
            
            setSubCookieWithVdir('SLHCookie', 'couponclippings', clippings.join('|'));
            
            if(onComplete)onComplete(onCompleteArgs);
        },        
        bindCoupons_onClick : function(className, onClip, checkedClassName, uncheckedClassName){
            var c = $$('.' + className);
            for(var x = 0; x < c.length; x++){
                var cdiv = $(c[x]);
                var input = cdiv.select("input")[0];
                
                cdiv.observe("click", function(){
                    var couponId = this.select("input")[0].value;
                    var isClipped = sl.coupons.getClippings().contains(couponId);
                    sl.coupons.toggleClipping(!isClipped, couponId, onClip, {sender:this, isClipped:isClipped, couponId:couponId});
                    if(isClipped){
                        this.removeClassName(checkedClassName);
                        this.addClassName(uncheckedClassName);
                    }
                    else{
                        this.removeClassName(uncheckedClassName);
                        this.addClassName(checkedClassName);
                    }
                });
            }
        }
    }
};