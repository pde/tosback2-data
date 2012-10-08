
function ArticleQuery(startPos, articleInformation)
{
    this.position = startPos;
    this.articleInfo = articleInformation;
}

ArticleQuery.prototype = {
        
    parseJson : function (json, callback) {
        var result = json;
        if(result.articles)
        {
            callback.call(this, result.articles);
        }
    },
    
    toHTML : function (articles){
        var articleList = "";
        var self = this;
        $.each(articles, function(index, article) {
            //if(self.articleInfo.getManualListStr().indexOf(article.nodePath)==-1)
            {
                       
                console.log(article);
                var groupNo = (self.position -1) * self.articleInfo.getGroupNumber() + Math.floor(index / self.articleInfo.getNumberPerRequest()) ;
                
                var articleHtml ;
               
                articleHtml = self.toSmallArticleHTML(index,groupNo,article);
                $(articleHtml).insertBefore('.view-more'); 

                
                if(groupNo == (self.position - 1) * self.articleInfo.getGroupNumber())
                {
                    if(groupNo != 0)
                    {
                        $('html, body').animate({ scrollTop: $('.set'+ groupNo).offset().top }, 'slow');
                    }
                }           
            }  
        });

        if($('.story-content').filter(':visible').length > 3  ){
            $('.msnADInTeaser').show();
        }
        
        if(articles.length == 0 )
        {
            $('#emptyTeaser').fadeIn();
        }else
        {
            $('#emptyTeaser').fadeOut();
        }
        
        if(articles.length <= this.articleInfo.getNumberPerRequest())
        {
            $('.view-more').fadeOut();
        }
        
        
    },
    
    toBannerHTML : function ()
    {
        var bannerHtml = "<a href='" + this.articleInfo.getBannerUrl() + "' banner='true'>" 
        bannerHtml += "<img src='" + this.articleInfo.getBannerImage() + "'></a>" ;
        return bannerHtml;
    },
    
    toSmallArticleHTML : function(index,groupNo,article)
    {
        var articleHtml = "";
        
        var articleRewriteUrl = URLBuilder.rewrite( article.nodePath + '.html');
        
        if(groupNo == (this.position - 1) * this.articleInfo.getGroupNumber())
        {
            articleHtml += "<div class='box story" + " set" + groupNo + "'>" ;
        }else
        {
            articleHtml += "<div class='box story" + " set" + groupNo + "' style='display:none;'>";
        }
        
        articleHtml += "<h2><a href='" + articleRewriteUrl + "'>" + article.headline ;
        if(article.premium)
        {
            articleHtml += "<span class='premium-content'></span>";
        }
        articleHtml += "</a></h2>";
        
        var authorHTML="<div class='author'><a href='" + article.teamPath + ".html' ><span class='team-arrow'><span class='team-25-" 
                    + article.team + "'></span></span></a>";
        if(article.author)
        {
            var authorFirstName = article.author.firstName=='--'?'':(article.author.firstName);
            var authorLastName = article.author.lastName=='--'?'':(article.author.lastName);
            var authorName = (authorFirstName+authorLastName)==''?'Fox Sports Next':(authorFirstName+'&nbsp;'+authorLastName); 
            var needAuthorLink = article.author.parentPagePath!=null?(article.author.parentPagePath.indexOf("/")==0?true:false):false;
            authorHTML +=("<strong>By "
                    +(needAuthorLink?("<a href='"+ article.author.parentPagePath + ".html'>"):"")
                    + authorName 
                    + (needAuthorLink?"</a>":"")
                    +"</strong>"
                    + ((article.author.title==null||article.author.title=='--')?"":article.author.title) + "</div>");
        }else
        {
            authorHTML +="<strong>By <a href=''></a>Fox Sports Next</strong></div>";
        }
        
        if(article["image.small"]==null||article["image.small"]==''){
            articleHtml += authorHTML;
            articleHtml += "<div class='story-content'><p>"+article.articleTeaserText+ "</p><a class='more-link' href='" 
                    + articleRewriteUrl + "' >READ MORE <span class='team-color'>\u00bb</span></a> </div>";
            articleHtml += "<div class='social-meta'>" + article.timeAgo + "</div>";
// + "<img src='" + this.articleInfo.getDesignPath() + "/static/i/tmp-social-links.png'></div>";;
        }else{
            articleHtml += "<div class='story-content two-col'> <div class='left'>";
            articleHtml += "<a href='" + articleRewriteUrl + "'>" + "<img title='"
                + article.headline + "' alt='" + article.headline + "' src='" + article["image.small"] + "' /></a>";
            articleHtml += authorHTML+'</div>';
            articleHtml += "<div class='right'><p>" + article.articleTeaserText + "</p><a class='more-link' href='" 
                    + articleRewriteUrl + "' >READ MORE <span class='team-color'>\u00bb</span></a> </div>";
            articleHtml += "<div class='social-meta'>" + article.timeAgo +" </div></div>";
//       "<img src='" + this.articleInfo.getDesignPath() + "/static/i/tmp-social-links.png'></div></div>";       
        }        
        console.log(articleHtml);
        
        return articleHtml;
    },
    
    toLargeArticleHTML : function(index,groupNo,article)
    {
        var articleHtml = "";
        
        var articleRewriteUrl = URLBuilder.rewrite( article.nodePath + '.html');
        if(article["image.large"]!=''){
            articleHtml += "a href='" + articleRewriteUrl + "'>" 
                        + "<img title='" + article.headline + "' alt='" 
                        + article.headline + "' src='" + article["image.large"] + "' class='video-thumb' /> </a>" ;
        }            
        articleHtml += "<div class='box story now" + " set" + groupNo + "'>" ;
        articleHtml += "<h2 class='icon-flag'><span class='icon-flag-bg'><span class='icon-flag-now'></span></span><a href='" + articleRewriteUrl + "'>" + article.headline ;
        if(article.premium)
        {
            articleHtml += "<span class='premium-content'></span>";
        }
        articleHtml += "</a></h2>";
        articleHtml += "<div class='author'><a href='" + article.teamPath + ".html' ><span class='team-arrow'><span class='team-25-"
                    + article.team + "'></span></span></a>";
        if(article.author)
        {
            var authorFirstName = article.author.firstName=='--'?'':(article.author.firstName);
            var authorLastName = article.author.lastName=='--'?'':(article.author.lastName);
            var authorName = (authorFirstName+authorLastName)==''?'Fox Sports Next':(authorFirstName+'&nbsp;'+authorLastName); 
            var needAuthorLink = article.author.parentPagePath!=null?(article.author.parentPagePath.indexOf("/")==0?true:false):false;
            articleHtml +=("<strong>By "
                    +(needAuthorLink?("<a href='"+ article.author.parentPagePath + ".html'>"):"")
                    + authorName 
                    + (needAuthorLink?"</a>":"")
                    +"</strong>"
                    + ((article.author.title==null||article.author.title=='--')?"":article.author.title) + "</div>");
        }else
        {
            articleHtml +="<strong>By <a href=''></a>Fox Sports Next</strong></div>";
        }

        articleHtml += "<div class='story-content'><p>"  + article.articleTeaserText + "</p><a class='more-link' href='" 
                    + articleRewriteUrl + "' >READ MORE <span class='team-color'>\u00bb</span></a>";
        articleHtml += "<div class='social-meta'>" + article.timeAgo +" </div></div></div>";
//       "<img src='" + this.articleInfo.getDesignPath() + "/static/i/tmp-social-links.png'>;
        console.log(articleHtml);
        
        return articleHtml;
    },
    
    getArticles : function () {
        var self = this;
        $.getJSON(this.articleInfo.getBaseUrl(this.position),function(result){
            self.parseJson(result,self.toHTML);
            });
    }
};

ArticleInfo.i = 0;

ArticleInfo.prototype.queryArtiles = function()
{
    var pageNum = Math.floor(ArticleInfo.i/ this.getGroupNumber()) + 1;
    var query = new ArticleQuery(pageNum,this);
    query.getArticles();
    return query;
};
    
ArticleInfo.prototype.isFirstArticleQuery = function()
{
    return ArticleInfo.i % this.getGroupNumber() == 0;
};

$ = jQuery;
    
$(document).ready(function() {
    
    var articleInfo = new ArticleInfo();
    var query ;
    
    if( articleInfo.isFirstArticleQuery())
    {
        //query = articleInfo.queryArtiles();
        ArticleInfo.i++;
    }
    
    $('.view-more').on('click',function(){
        var articleInfo = new ArticleInfo();
        
        if( ArticleInfo.i % articleInfo.getGroupNumber() == 0)
        {
            query = articleInfo.queryArtiles();
        }else
        {
            if($('.set'+ ArticleInfo.i).length > 0)
            {
                $('.set'+ ArticleInfo.i).fadeIn();
                
                var cnt_visible_storycontent = $('.story-content').filter(':visible').length;
                if( cnt_visible_storycontent >3 ){
                    try{
                        $('.msnADInTeaser').insertAfter($('.box.story').filter(':visible')[2]);
                        $('.msnADInTeaser').show();
                    }catch(e)
                    {
                        console.log(e);
                    }
                }
                
                $('html, body').animate({ scrollTop: $('.set'+ ArticleInfo.i).offset().top }, 'slow');
                //$(window).scrollTop($('.view-more').position().top - 600);
                
                if($('.set'+ ArticleInfo.i).length < articleInfo.getNumberPerRequest())
                {
                    $('.view-more').fadeOut();
                }else if( (ArticleInfo.i % articleInfo.getGroupNumber()) != (articleInfo.getGroupNumber() -1))
                {
                    if($('.set'+ (ArticleInfo.i + 1)).length == 0 )
                    {
                        $('.view-more').fadeOut();
                    }
                }
                
            }else
            {
                $('.view-more').fadeOut();
            }
        }
        ArticleInfo.i++ ;
    });
    
    var getTimeAgo = function(videoDate){
       var dt = new Date();
       dt.setTime(videoDate);       
       return CQ.Ext.util.Format.date(dt,'M d, Y h:i A T');
    }
    
    $('span[videoURL]').each(function(){
      Video.getSingleVideo(
        $(this).attr("videoURL"),this,function(video){
          $(this).html(getTimeAgo(video.updateDate)); 
      },$(this).attr("feedURL"))
    });

});
