function VideoPlayerGenerator(videoAuth) {
    this.vl;
    this.listLength = 4;
    this.isPremium ;
    this.currentPlayingURL ;
    this.upsell ;
    this.upsellTarget;
    var self =this;
    if(typeof ($pdk)!='undefined'){
        $pdk.controller.addEventListener("OnMediaComplete", function(e){self.onMediaComplete(e)});
    }
    
    this.auth = videoAuth || null ;
}

VideoPlayerGenerator.UPSELL_VIDEO_URL='http://static-media.foxsportsnext.com/img/Fox_Networks_Group_-_Fox_Sports_Next/22/650/FOX-Sports-Next-short1_1300.mp4';
VideoPlayerGenerator.UPSELL_VIDEO_ANCHOR='/home/memberships.html';

VideoPlayerGenerator.prototype = {
        /**
         * 
         * Kick off function;
         */
        run:function(){
            this.getJsonFromFeed();
        },
        
        /*
         * 
         * After get feeds form feed.platform.com by the default url and store those videos in the allVideoList, This method check whether the url in the web browser belongs to the video list.
         * If the answer is true, start playing the video and list next 3 video on the right thumbnail.
         * If the answer is false , query feed.platform.com by the url and list the first 3 video in the videolist on the right of the player;
         */
        getJsonFromFeedCallBack:function(allVideoList){
            // the getVideoPathInBrowser return two params in an array, the param[0] is videoId;
            var paramsInBrowser = Video.getVideoPathInBrowser();
            var videoId = null;
            var tempFeedURL =null;
            if(paramsInBrowser!= null){
               if(paramsInBrowser[0]!=null&&paramsInBrowser[0]!=""){
                   videoId = paramsInBrowser[0];
               }
            }
           
            if(allVideoList != null){
                if(videoId !=null ){
                    //current video belongs to video list;
                    
                    var index=this.getVideoIndexByGuid(videoId,allVideoList);
                    if(index!=-1){
                        this.playList(allVideoList.splice(index, this.listLength));
                    }else{
                        this.setPlayList(allVideoList.splice(0,this.listLength));
                        this.playSingleVideoByVideoGuid(videoId);
                    }
                }else{ 
                    this.playList(allVideoList.splice(0, this.listLength));
                }
            }else if(videoId!=null){
                    this.playSingleVideoByVideoGuid(videoId);
            }else{
                console.log("Nothing to play");
            }
        },
        
        /*
         * the priority to use the url is as following , the number is smaller, the priority is higher
         * 1.feed url in browser
         * 2.feed url in the component editor
         * 3.feed url in the inherited page.
         * return the videoList;
         * TODO: check the error exception;
         */
        getJsonFromFeed :function(){  
            var query = PlayerURL.getURL();                    
            Video.getVideos(query,this,this.getJsonFromFeedCallBack);
        },
        
        
        /*
         * get the video url is appended to web browser;
         * i.e.http://localhost:4502/cf#/content/fsnext/college/usc-trojans/videos/video1.html#hello#feeurl . set the 'hello' and'feedurl' in the return array;
         * @return  if no "#" at the end of the url. return null;
         */
        getVideoPathInBrowser:function (){      
            var params = [];    
            var url =new String();
            var url =  window.location.href;
            var path = window.location.pathname;
            if(url.indexOf("#")==-1){
                return null;
            }
            if(url.indexOf(path)!==-1){
                var temp = url.substring(url.indexOf(path)+path.length+1);   //remove the whole path. in the above example. remove the http://localhost:4502/cf#/content/fsnext/college/usc-trojans/videos/video1.html. Then temp = #hello;
                var tempParams = temp.split("#");
                if(temp.indexOf("#")!==-1){                    
                    for(var i=0;i<tempParams.length;i++){
                        params[i]=tempParams[i];
                    }
                  }
            }
            return params;
            
        },
        
        /**
         * @param guid
         * @param list
         * @return if the url doesn't belong to the list ,return -1,else return the index;
         */

        getVideoIndexByGuid:function (guid,list){
            var i =0;
            while(i<list.length&&guid != list[i].guid&& guid != list[i].guid){
                i++;
            }
            if(i<list.length){
                return i;
            }else{
                return -1;
            }
        },
        
        
        /*
         * 
         * get video information in the 
         */
        playSingleVideoByVideoGuid:function (guid){
            if(null != guid && $.trim(guid)!=""){
                Video.getSingleVideo(guid,this,this.playSingleVideo);
            }else{
                console.error("guid :"+guid+"is null or blank");
            }
        },
        
        
        /*
         * Play Single Video ;
         */
        playSingleVideo:function(video){
            this.addVideoToPlayList(video);
            this.play();
        },
        
        addVideoToPlayList:function(video){
            if(null == this.vl){
                this.vl = [video];
            }else if( 0 == this.vl.length){
                this.vl.push(video);
            }else if(this.listLength==this.vl.length){
                this.vl.pop();
                this.vl.unshift(video);
            }else{
                this.vl.unshift(video);
            }
        },
        
        /*
         * play video list.
         */
        playList:function(videoList){
            this.setPlayList(videoList);
            this.play();
        },
        
        
        /*
         * set video play list;
         */
        setPlayList : function (videoList){
            this.removeAllThumbnails();
            this.vl=videoList;
        },
        /*
         * Play the first video in the list;
         */
        play:function(){
            this.playVideo(this.vl[0]);
            this.setMostRecentThumbnails();
        },
        
        playVideo : function(video){
            this.setVideoMetadata(video);
            this.changeCurrentPlayingThumbnail(video);
        },
        
        changeCurrentPlayingThumbnail : function (video){
            $(this.thumbnailCreator(video,true)).appendTo($("ul#video-list"));
        },
        
        setVideoMetadata : function (video){
            this.setReleaseCall(video);
            this.setCurrentVideoMetadate(video);
        },
        
        setCurrentVideoMetadate : function (currentVideo){
            $("div#video-btm[alt=videoDesc] h2").text(currentVideo.title);
           
            // in the author server ,we display the video-banner for ad forever
            if(CQ.WCM&&(CQ.WCM.getMode()==CQ.WCM.MODE_EDIT||CQ.WCM.getMode()==CQ.WCM.MODE_DESIGN )){
                  $("div#video-banner-1[class=video-banner]").show();
            }else  if(currentVideo.isPremium){
                $("div#video-btm[alt=videoDesc] h2").append("<span class='premium-content'></span>");
                if(! this.auth.isPremium()){
                    $("div#video-banner-1[class=video-banner]").show();
                }
            }else{
                $("div#video-banner-1[class=video-banner]").hide();
            }
            var videoDetails="";
            videoDetails+="<div id='video-description'>"+currentVideo.description+"</div>";
            videoDetails+="<div id='video-date-views'>Date:"+Video.millisecondsStrToDate(currentVideo.updateDate).toLocaleDateString();+"</div>";
            videoDetails+="<div id='video-attribution'>"+currentVideo.author+"</div>";
            $("div#video-btm[alt=videoDesc] div.clearfix div#video-details").empty().append(videoDetails);
        },
        
        thumbnailCreator : function(video,isPlaying){
            var meta=new String();
            meta="<li class='"+(video.isPremium?"premium ":"")+(isPlaying?"video-active":"")+ "' >";
            meta+="<a href='#'><img src='" + (video.small_thumbnail?video.small_thumbnail:video.default_thumbnail)
                    +"' width='112' height='63' ></a>";
            meta+="<div class='video-label-title'>"+video.title +"</div>";
            meta+="<div class='video-label-active'>Now Playing</div>";
            meta+="<div class='video-label-next'>Up Next</div>";
            meta+="</a> </li>";
            return meta;
        },
        
        setMostRecentThumbnails:function (){
            for(var i=1,j=1;i<this.vl.length&&j<this.listLength;i++) {
                video=this.vl[i];
                if(this.vl[0].guid!=video.guid){
                    $(this.thumbnailCreator(video,false)).appendTo($("ul#video-list"));
                    j++;
                }
            }
            $("ul#video-list li:eq(1)").addClass("video-next");
            $('#video-list-wrapper').jScrollPane({
                showArrows: true,
                verticalDragMaxHeight: 100
            }); 
            this.addNumAttr();
            this.addClickEventListener();
            
        },
        
        addNumAttr:function (){
            var i=0;
            $("ul#video-list li a img").each(function (){
                $(this).attr('num',i++);
            });
        },

        addClickEventListener:function (){
            var self = this;
            $("ul#video-list li a").unbind().click(function(e){
                e.preventDefault();
                if($(e.target).attr("num")){
                    self.setVideoMetadata(self.vl[e.target.getAttribute("num")]);
                     $(this).parent().parent().children().removeClass("video-active");
                     $(this).parent().parent().children().removeClass("video-next");
                     if($(this).parent().next().length==0){
                         // last node ;
                         if($(this).parent().prev().length!=0){
                             $(this).parent().parent().children().first().addClass("video-next");
                         }
                     }else{
                         $(this).parent().next().addClass("video-next");
                     }
                     $(this).parent().addClass("video-active");
                }
            });
        },
        
        removeAllThumbnails:function(){
            $("ul#video-list").empty();
        },

        
        /*****start  player for article marquee ****/
        /*
         * Query the video by video guid then display it in the article marquee;
         */
        displayMarqueeByVideoGuid:function(guid,url){
            if(null != guid && $.trim(guid)!=null){
                Video.getSingleVideo(guid,this,this.setMarqueeImage,url);
                var self =this;
                if(typeof($pdk)!='undefined'){
                     $pdk.controller.addEventListener("onMediaComplete", function(e){self.onMediaComplete});
                    }
            }else{
                alert("guid :"+guid+"is null or blank");
            }
        },
        
        /*
         * display the large image in the marque
         */
        setMarqueeImage:function(video){
            var self= this;
            var child = "<a href='#'>";
            child+="<img width='660' height='500' src='"+(video.larg_thumbnail==null?video.default_thumbnail:video.larg_thumbnail)+"'/>"
            child+="</a>"
            $(child).appendTo("div#image-wrapper[alt=marquee]");
            $("div#image-wrapper[alt=marquee] a").unbind().click(function (e){
                e.preventDefault();
                $(this).parent().after("<div id='video-wrapper' alt='marquee'></div>");
                $(this).hide();
                 PlayerInMarquee.setPlayerInMarquee(self,self.setReleaseCall,video);
            });
        },
        /*****end  player for article marquee ****/
    
        setReleaseCall:function(video)  
        {   
            //      console.log("User Access: " + this.isPremium);
            //       console.log("Video Entitlement: " + video.entitlement);
            var releaseUrl = video.releaseURL;  
            // Extract entitlement
            var tag = true;
            var previewUrl = releaseUrl + "&format=preview";
            if(this.auth.isPremium() || ! video.isPremium){
                tag = false;
            }
            console.log("tag is "+tag+"~~tag="+~~tag);
            var trk  ="trk=";
            for(var i = 0;i<5;i++){
                var ran = Math.floor(Math.random()+Math.ceil(i/(Math.random()*10+1+i)));
                trk+=Math.floor(((~~tag)|(ran))*Math.floor(Math.random()*(9+ran)+(1-ran))).toString();
            }
            releaseUrl +="&"+trk;
            console.log("Setting release URL: " + releaseUrl);
            
            /* the following code follow this logic
             * Is there token in the auth, if answer is true, check whether the token is activated.
             * If the token activated , send the release call , else try to activate the token .
             * 
             * If activate the token successfully, the event, "OnSetToken" would be captured and call the callback function.
             * in the call back function  ,send the release.
             * Otherwise, send the release directly.
             */
            if(typeof($pdk)!='undefined'){
                this.currentPlayingURL = releaseUrl;
                if(this.auth.hasToken()){
                    if(this.auth.isTokenActivated()){
                        $pdk.controller.setReleaseURL(releaseUrl);
                    }else if( ! this.auth.setVideoToken($pdk,this,function(){
                        $pdk.controller.setReleaseURL(releaseUrl);
                    })){
                        $pdk.controller.setReleaseURL(releaseUrl);
                    }
                }else{
                    $pdk.controller.setReleaseURL(releaseUrl);
                }
            }else{
                $pdk.controller.setReleaseURL(releaseUrl);
            }
            
        },
           
        onMediaComplete:function (e) {
        //  console.log("==== ON MEDIA COMPLETE ====");
            if (e.data.baseClip.guid != "upsell_video") {
                if ( e.data.baseClip.contentCustomData.entitlementTier &&  this.isPremium != 'true' ) {
                    var upsell = this.upsell?this.upsell:VideoPlayerGenerator.UPSELL_VIDEO_URL;
                    var upsellTarget = this.upsellTarget ? this.upsellTarget : VideoPlayerGenerator.UPSELL_VIDEO_ANCHOR;
                    $pdk.controller.setSmil(
                    "<smil xmlns='http://www.w3.org/2005/SMIL21/Language'>" +
                    "    <head> </head>" +
                    " <body> <seq> <switch>" +
                        "<video src='" +
                        upsell+
                        "' system-bitrate='6191526' height='720' width='1280'/> " +
                        "<ref src='" +
                        upsell+
                        "' title='Upsell Video' dur='6432ms' guid='upsell_video' type='video/mp4' height='720' width='1280'> " +
                        "<anchor href='" +
                       upsellTarget+
                        "'/> <param name='trackingData' value='b=6191526|ci=1|cid=22684938|d=1342646514525|l=6432|rid=22684946'/> </ref> " +
                        "</switch>" +
                    " </seq> </body> </smil>");

                    //$pdk.controller.setReleaseURL("http://link.theplatform.com/s/fs-next/upsell_video?mbr=true");
                }
            }else{
            //  console.log(this.currentPlayingURL+"&params=auth%3D" + this.authToken);
                console.log(this.currentPlayingURL);
                $pdk.controller.loadReleaseURL(this.currentPlayingURL);
            }
        }
}
 





/**
 * Class for authentication
 */
function VideoAuth(authToken, isPremium) {
      this.token = authToken || null;
      this.premium = isPremium ;
      this.tokenActivated = false;
}

    VideoAuth.prototype = {    


        /**
         * 
         * After setToken 
         * @param callee: the callee for the callback function
         * @param callback: callback function 
         * @return boolean, true means setToken done. if the $pdk is null 
         */
        setVideoToken : function (pdk,callee,callback){
            if(typeof(pdk)!="undefined" && this.token!=null){
                 pdk.controller.addEventListener("OnSetToken", function(){
                         this.tokenActivated = true;
                         if(callback != null){
                            callback.call(callee)   ;
                         }
                    });
                   pdk.controller.setToken (this.token);
                   return true;

            }else if (typeof(pdk) =="undefined"){
                console.error("$pdk is undefined");
            }
            return false;
        },
        
        isPremium:function(){
            return this.premium;
        },
        
        
        /**
         * 
         * @return if the token activated , return true;
         */
        isTokenActivated:function(){
            return this.tokenActivated;
        },
        
        hasToken:function(){
            return this.token==null?false:true;
        }
        
        
        
        
        
    }

    VideoAuth.getInstance = function(authToken, isPremium){
        return new VideoAuth(authToken, isPremium);  
    }
    
        
   VideoAuth.initializeToken = function (callee,callback){
              var isPremiumTemp =false;
              var token;
              if(typeof(CookieUtil)!="undefined"){
                  var cookieStr = CookieUtil.getCookie("video-authToken");
                  if(cookieStr){
                      var arrStr = cookieStr.split(",");
                       for (var i=0; i<arrStr.length;i++){
                           var temp = arrStr[i].split("=");
                              if (temp[0] == "is-premium") {
                                  isPremiumTemp = temp[1]; 
                              }
                              if(temp[0] =="videoToken"){
                                token = temp[1];
                              }
                       }          
                   }
              }
              
              videoAuthObj = new VideoAuth(token, ("true" == isPremiumTemp));
    
              if (typeof(videoAuthObj.token) == "undefined" || videoAuthObj.token == null ) {
                $.ajax({
                    type: 'GET',
                    url: '/content/fsnext/video.token.anonymous-token.json',
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        videoAuthObj = new VideoAuth(data.videoToken, false);
                        callback.call(callee,videoAuthObj);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                  });
              } else {
                   callback.call(callee,videoAuthObj);
              }
      }

    
