//var baseURL='http://feed.theplatform.com/f/fs-next/poc-allvideo?form=json';
//$("div[class=video-thumb-list-content]").ready(function(){
//    $.getJSON(baseURL,function(result){
//      parseJson4Thumbs(result,3,function (videoList){
//          var thumbnailList = "";
//          $.each(videoList, function(v, video) {
//              var thumbnail = "<div class='video-thumb'>";
//              thumbnail += "<a href='" + video.releasURL + "'><img width='100' height='80' src='"
//                      + video.small_thumbnail + "' desc='"+video.description+"'></a>";
//              thumbnail += "<h4><a href='" + video.releasURL + "'>" + video.title
//                      + "</a></h4>";
//              thumbnail += "<span class='date'>Posted " + millisecondsStrToDate(video.updateDate) + "</span>";
//              thumbnail +="<p>"+video.description+"</p>";
//              thumbnail += "</div>";
//              thumbnailList += thumbnail;
//          })
//          $(thumbnailList).appendTo($("div[class=video-thumb-list-content]"));
//      });
//    });
//         
//});

function VideoList (){
    this.mandaryPara="&count=true"
    this.thumbnailCount = 3;
    this.pageCount = 0;
    this.query = Video.BASE_URL;
    this.videoPlayerLocation ;
    this.videoList;
}
VideoList.prototype = {
        /**
         * Kick off function , get page properties then get json result from feed.platfrom.com
         */
        run:function(){
            this.checkProperties();
            this.getJsonFromFeed();
        },
        
        checkProperties:function(){
            var url =  ListProperty.getURL();
            var count = ListProperty.getCount();
            var playerLocation = ListProperty.getPlayerLocation();
            if(url!=null&&$.trim(url)!=""){
                this.query = url;
            }
            if(count!=null){
                this.thumbnailCount = parseInt(count);
            }
            if(playerLocation !=null && $.trim(playerLocation)!=""){
                this.videoPlayerLocation = playerLocation;
            }
        },
        
        getJsonFromFeed:function(){
            var self = this;
            Video.getVideos(self.query,this,this.createThumbnails);
        },
        
        wrapSentence:function (str, count){
            if(null!=str &&$.trim(str)!=''){
                var s = new String();
                if(str.length>count){
                    return str.substring(0, count)+"...";
                }else{
                    return str;
                }
            }else{
                return str;
            }
        },
        
        
        createThumbnails:function(vl){
            if(vl == null){
                return;
            }
            var self = this;
            var thumbnailList  = "";
            for(var i=0;i<vl.length && i<self.thumbnailCount;i++){
                var video = vl[i];
                var videoLink = (self.videoPlayerLocation ==null?'#':(self.videoPlayerLocation+'.html#'+video.guid));
                    videoLink+=(self.query == null?'#':'#'+Video.base64Encode(self.query));
                var thumbnail = "<div class='video-thumb'>";
                thumbnail += "<a href='" +(videoLink) + "'><img width='112' height='63' src='"
                        + (video.small_thumbnail?video.small_thumbnail:video.default_thumbnail) + "' desc='"+video.description+"'></a>";
                thumbnail += "<h4><a href='" +(videoLink) + "'>" + self.wrapSentence(video.title,65)
                        + "</a></h4>";
                thumbnail += "<span class='date'>Posted " + Video.millisecondsStrToDate(video.updateDate).toDateString() + "</span>";
                thumbnail +="<p>"+self.wrapSentence(video.description,150)+"</p>";
                thumbnail += "</div>";
                thumbnailList += thumbnail;
            }
            var allVideoLink="<a class='more-link' href='" +(self.videoPlayerLocation ==null?'#':(self.videoPlayerLocation)+".html") + "'>All Videos <span>&raquo;</span></a>"; 
            $(thumbnailList).appendTo($("div[class=video-thumb-list-content]"));
            $(allVideoLink).appendTo($("div[class='box video-thumb-list-container']"));
        }
        
        
        
        
        
        
}





