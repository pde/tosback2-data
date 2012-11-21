var esupportCarousel = {
    pageSize: 6,
    currentPage: 0,
    pageCount: 0,
    videoCount: 0,
    videos: [],
    pageAnchors: [],
    pageButtonSrcOn: '//www.att.com/media/en_US/scripts/JSAM/JSAM_blue_bullet.png',
    pageButtonSrcOff: '//www.att.com/media/en_US/scripts/JSAM/JSAM_gray_bullet.png',
    render: function() {
     
      // Pre-load images
      var img1 = new Image();
      var img2 = new Image();
      var img3 = new Image();
      var img4 = new Image();
      img1.src='//www.att.com/media/att/2011/global/btn/btn-carousel-rt-18x26.gif';
      img2.src='//www.att.com/media/att/2011/global/btn/btn-carousel-rt-dis_18x26.gif';
      img3.src='//www.att.com/media/att/2011/global/btn/btn-carousel-lt-18x26.gif';
      img4.src='//www.att.com/media/att/2011/global/btn/btn-carousel-lt-dis_18x26.gif';
      
      var self = this;
      var $ = jQuery;
      var videos = this.videos;

      gvp.gvpMetaData_setFailCallback( function(){
        self.renderUnavailable();
      });

      gvp.getMetaData(self.videos, function(response){
        var videoMap = [];
        var pageSize = this.pageSize;
        var currentPage = this.currentPage;

        $(response.gvpResponse.videoData).each(function(index,value){
          self.videoCount++;
          videoMap[value.id] = value;
        });
        if (videoMap.length == 0) {
          self.renderUnavailable();
          return;
        } 
        var videoCount = self.videoCount;
        self.pageCount = Math.ceil(videoCount / self.pageSize);
        var pageCount = self.pageCount;
        
        var used = [];

        $.each(self.videos, function(key,value){

          var video = videoMap[value];
          if (video == null || used[value] != null) {
            return;
          }
          used[value] = 1;
		  var vTitle=video.title;
		  if (vTitle == undefined ){
			vTitle ="";
		  }
		  if(vTitle.indexOf("&amp;") != -1){
				vTitle=vTitle.replace("&amp;","&");
			}
		  if (video.videoLength  == undefined){
				video.videoLength ="0:00";
		   }	
          var playVideo = function () {
            var videoPath = video.xmlFileName.replace(/^\/media\/gvp/, '');
            gvp.showPopUp('Please wait...', true, true, 'gvp', videoPath + '&gvpEnv=//www.att.com/media/gvp/');
          };
            $('<li>').append($('<div>').addClass('video-thumb-container')
			        .append($('<a>').append($('<img>').attr({src:video.thumbFilePath,width:110,height:62,alt:vTitle,style:'display:block'}))
				      .addClass('thumbnail')
				      .append(  $('<span>').addClass('overlay').addClass('persist').attr({alt:'Play button'}) ).click(playVideo)  )
                .append($('<h4>').append($('<a>').text(self.formatTitle(vTitle)).click(playVideo)).attr('title', vTitle).attr('style', 'margin-top: 10px;'))
                .append($('<p>').text('(' + video.videoLength + ')')))
              .keypress(function(e) {if (e.which == 13) {playVideo(true);}})
		          .appendTo($('#vidCarousel'));
        });	

        var anchorContainer = $('#carousel-buttons');

        var pageAnchors = []; 

        for (var i = 0; i < pageCount; i++) {
          var a = $('<a>').attr('href', '#').append($('<img>').attr({src:i == 0 ? self.pageButtonSrcOn : self.pageButtonSrcOff,width:15,height:15,alt:'More Videos'}));
          pageAnchors.push(a);
          anchorContainer.append(a);
        }

        self.pageAnchors = pageAnchors;

        var scroll = function(carousel) {
          var idx = Math.min(self.currentPage * self.pageSize + 1, self.videoCount - self.pageSize + 1);
          carousel.scroll(idx);
        };

        // Override next and previous to obey our index methods
        (function($){
          var jcarouselExtensions ={
              prev: function(){
                self.currentPage = self.currentPage - 1;
                scroll(this);
              },
              next: function(){
                self.currentPage = self.currentPage + 1;
                scroll(this);
              } 
          };
          $.extend($.jcarousel.prototype, jcarouselExtensions);
        })(jQuery);

        $('#vidCarousel').jcarousel({
          scroll: self.pageSize,
          itemFirstInCallback: function (carousel, item, idx, state) {
            self.currentPage = Math.ceil((idx - 1) / self.pageSize);
            self.updatePagination(idx);
          },
          initCallback: function (carousel) {
            $(pageAnchors).each(function(index, value){
              $(value).click(function(evt) {
                self.currentPage = index;
                scroll(carousel);
                return false;
              });
            });
            $('#vidExpand ul li.prev').click(function() {
              if (self.currentPage <= 0) {
                return;
              }
              self.currentPage = self.currentPage - 1;
              scroll(carousel);
            });
            $('#vidExpand ul li.next').click(function() {
              if (self.currentPage >= self.pageCount - 1) {
                return;
              }
              self.currentPage = self.currentPage + 1;
              scroll(carousel);
            });
          }
        });
      });
    },

    renderUnavailable: function() {
      var $ = jQuery;
      $('#video-container').append($('<p>').attr('align', 'center').text("We're sorry. Videos are unavailable. Please try back later."));
      $('.carouselWrapper').hide();
    },

    updatePagination: function (idx) {
      var $ = jQuery;
      var self = this;
      var pageSize = self.pageSize;
      var currentPage = self.currentPage;
      $(this.pageAnchors).each(function(index, value) {
          $('img', value).attr('src', index == currentPage ? self.pageButtonSrcOn : self.pageButtonSrcOff);
      });
    },
    
    formatTitle : function(input) {
      return input.length > 40 ? input.substring(0,40) + '...' : input;
    }
};



