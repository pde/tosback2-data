// JavaScript Document

var cnt = 0;
var feedIndex = 0;
var blogFeedURLs = new Array();

function InitializeBlog(topic,feedurl,feedlimit, isProductPage,pageID) {

            if(feedurl instanceof Array) {       
                        blogFeedURLs = feedurl;                       
                        var pageFeedURL = "";
                        
                        if(feedurl[0] != "null")  {
                                    pageFeedURL = feedurl[0];
                                    feedIndex = 0;
                        }
                        else
                        if(feedurl[1] != "null") {
                                    pageFeedURL = feedurl[1];
                                    feedIndex = 1;
                        }
                        else
                        if(feedurl[2] != "null") { 
                                    pageFeedURL = feedurl[2];
                                    feedIndex =  2;
                        }
                                    
                        var feedpointer=new google.feeds.Feed(pageFeedURL); //Google Feed API method
                        feedpointer.setNumEntries(feedlimit); //Google Feed API method
                        feedpointer.load(function(result) { displayfeed(result,topic,pageFeedURL,feedlimit, isProductPage,pageID)}); //Google Feed API method
            }
            else {
            var feedpointer=new google.feeds.Feed(feedurl); //Google Feed API method
            feedpointer.setNumEntries(feedlimit); //Google Feed API method
            feedpointer.load(function(result) { displayfeed(result,topic,feedurl,feedlimit, isProductPage,pageID)}); //Google Feed API method
}
}

function InitializeBlogNE(feedurl1,feedurl2,feedlimit) {
            var feedpointer1=new google.feeds.Feed(feedurl1); //Google Feed API method
            feedpointer1.setNumEntries(feedlimit); //Google Feed API method
            feedpointer1.load(function(result) { displayfeedNE(result,feedurl1,feedlimit)}); //Google Feed API method
            var feedpointer2=new google.feeds.Feed(feedurl2); //Google Feed API method
            feedpointer2.setNumEntries(feedlimit); //Google Feed API method
            feedpointer2.load(function(result) { displayfeedNE(result,feedurl2,feedlimit)}); //Google Feed API method
}

function displayfeed(result,topic,feedurl,feedlimit, isProductPage,pageID){

            var display = document.getElementById("feeddiv");
            var blogPageURL = "http://networkingexchangeblog.att.com/";
            var parent = document.getElementById("feeddivgrp");
            if (!result.error) {
                        var feed = result.feed;
                        var entries = feed.entries;
                        var lastEntry = false;

                        if (entries != null && entries.length > 0 ) {
                                    if (!isProductPage) {
                                                document.getElementById("feeddivgrp").style.display = 'block';
                                                
                                    }
                                    
                                                
                                    for (var i = 0; i < entries.length; i++) {
                                    
                                                var entry = entries[i];            
                                                var title = entry.title;            
                                                var link = entry.link;
                                                var teaser = entry.contentSnippet;
                        var postDt = new Date(entry.publishedDate);
                                                var postDtStr = getMonthName(postDt.getMonth())+" "+postDt.getDate()+", "+postDt.getFullYear();
                                                var author = entry.author;                                                                                               
                                                var content = entry.content;                                           
                                                var thumbnailImg = parseThumbnailImg(content);            
                                                var img="<img width='90' class='newimgclass' src='"+thumbnailImg+"'>";
				
				var post_image= document.createElement('div'); 
				post_image.setAttribute("class","post-image");
				post_image.className="post-image";
				post_image.setAttribute("id","imgBox");	
                                                            
                                                var my_wrapper= document.createElement('div'); 
                                                my_wrapper.setAttribute("class","my_wrapper");                                     
                                                my_wrapper.className="my_wrapper";

                                                var next = i+1;
                                                
                                                if(thumbnailImg!="")
                                                    {
					//my_wrapper.innerHTML= img;
					post_image.innerHTML=img;
					//image
					my_wrapper.appendChild(post_image);
				}
				
				//title				
				var article_header= document.createElement('div'); 
				article_header.setAttribute("class","article-header");				
				article_header.className="article-header";
				
				article_header.appendChild(getBlogTitle(title,link,isProductPage,pageID));
				my_wrapper.appendChild(article_header);	
                                                //description      
                                                my_wrapper.appendChild(getTeaser(teaser,link,pageID));            
                                    
                                                if(entries[next] == null) lastEntry = true;
                                                if (feedlimit == 1 && isProductPage) lastEntry = false;
                                                //date and author
                                                my_wrapper.appendChild(getDateAuthor(postDtStr, author, feedurl, lastEntry, pageID) );
                                                
                                                if(lastEntry) {
                                                            my_wrapper.className="my_wrapper1";
                                                            my_wrapper.setAttribute("class","my_wrapper1");
                                                }
                                                display.appendChild(my_wrapper);                                             
                                    }
                                    
                        } else {
                                    cnt++;
                                    if((feedIndex+cnt) < 3 ) {
                                                InitializeBlog(topic,blogFeedURLs[feedIndex+cnt],feedlimit, isProductPage);
                                    }
                        }
            }
            else {
                        cnt++;
                        if((feedIndex+cnt) < 3 ) {
                                    InitializeBlog(topic,blogFeedURLs[feedIndex+cnt],feedlimit, isProductPage);
                        }
            }
}

function parseThumbnailImg(content){

            var wrapper= document.createElement('div');
            wrapper.innerHTML= content; 
            var anchor= document.createElement('div');        
            anchor.innerHTML=wrapper.childNodes[0].innerHTML;                                         
            var val=anchor.innerHTML;
            var thumbnailImg="";                 
            
            if(val.indexOf("<img")>0 || val.indexOf("<IMG")>0){
                        
                        if(val.indexOf("</A>")>0)
                                    thumbnailImg = val.substring(0,val.indexOf("</A>")+4);
                        else
                        if(!(thumbnailImg.length>3) && val.indexOf("</a>")>0){
                                    thumbnailImg=val.substring(0,val.indexOf("</a>")+4);
                        }else {
                                    thumbnailImg = val;
                        }           
                        
                        if(thumbnailImg.indexOf(".jpg")>0)
                                    thumbnailImg = thumbnailImg.substring(thumbnailImg.indexOf("src=")+5,thumbnailImg.indexOf(".jpg")+4);
                        else if(thumbnailImg.indexOf(".png")>0)
                                    thumbnailImg = thumbnailImg.substring(thumbnailImg.indexOf("src=")+5,thumbnailImg.indexOf(".png")+4);
                        else thumbnailImg="";
            }           
            
            return thumbnailImg;      
}

function getMonthName(month){            
            
            var monthStringArray=new Array();
            monthStringArray[0]="January";
            monthStringArray[1]="February";
            monthStringArray[2]="March";
            monthStringArray[3]="April";
            monthStringArray[4]="May";
            monthStringArray[5]="June";
            monthStringArray[6]="July";
            monthStringArray[7]="August";
            monthStringArray[8]="September";
            monthStringArray[9]="October";
            monthStringArray[10]="November";
            monthStringArray[11]="December";        
            return monthStringArray[month];                         
}

function displayfeedNE(result,feedurl,feedlimit){
            var display = document.getElementById("feeddiv");
            var parent = document.getElementById("feeddivgrp");
            if (!result.error) {
                        var feed = result.feed;
                        var entries = feed.entries;
                        if (entries != null && entries.length > 0 ) {
                                    parent.style.display = 'block';
                                    var liTag = document.createElement('li');
                                    liTag.setAttribute("style","margin-left:-5px;");
                                    for (var i = 0; i < entries.length; i++) {
                                                var entry = entries[i];            
                                                var title = entry.title;            
                                                var link = entry.link;
                                                var postDt = new Date(entry.publishedDate); 
                                                var postDtStr = (postDt.getMonth()+1)+"/"+postDt.getDate()+"/"+(postDt.getFullYear()+"").substring(2, 4);
                                                if (title.length > 65) { title = title.substring(0, 65) + '...'; }
                                                var blogTitle = getBlogTitleNE(title,link,false);
                                                blogTitle.appendChild(getDate(postDtStr));
                                                liTag.appendChild(blogTitle);
                                    }
                        } 
            display.appendChild(liTag);
            } 
}

function getBlogHeading() {
            var blogHeader = document.createElement('h2');
            blogHeader.setAttribute("class","Orangeheader");
            blogHeader.className = "Orangeheader" ;
            blogHeader.innerHTML = "You Might Also Be Interested in..";
            return blogHeader;
}
function getBlogTitle(title,link,isProductPage,pageID) {
            var h3Title = document.createElement('h2');
            //if (isProductPage) {
                   //     h3Title.setAttribute("class","h3title");
                   //     h3Title.className = "h3title" ;
            
            var anchor = document.createElement('a');
            anchor.innerHTML = title;
            anchor.href = link+'?source=EENT101912900996N';
    anchor.onclick = function(){ trackAtlasBlog(pageID)};
    h3Title.appendChild(anchor);
            return h3Title;
}

function getBlogTitleNE(title,link,isProductPage) {
            var h2Title = document.createElement('div');
            h2Title.setAttribute("class","blogpromotions");
            h2Title.className = "blogpromotions" ;
            var anchor = document.createElement('a');
            anchor.innerHTML = "<b>" + title + "</b>";
            anchor.href = link;
            h2Title.appendChild(anchor);
            h2Title.innerHTML+= " ";
            return h2Title;
}

function getTeaser(teaser,link,pageID) {
            var content = teaser;
            var subTitle = document.createElement('div');
	subTitle.setAttribute("class","post-content");
	subTitle.className = "post-content" ;
            subTitle.innerHTML = content;
            return subTitle;
}
function getDate(pubDtStr) {
            var content = "";
            content = "("+pubDtStr+")";
            var contentVar = document.createElement('span');
            contentVar.innerHTML = content;
            return contentVar;
}

function getDateAuthor(pubDtStr, author, feedurl, lastEntry, pageID) {
            var authorURL =  getAuthorURL(author, feedurl);
            var content = "";
           if(authorURL.length > 0)
            content = "<span class='post-date'>"+pubDtStr+ "</span> <br/> <span class='bytext'>By </span><span class='author-link'><a href='"+authorURL+"?source=EENT101912900997N' onclick=trackAtlasBlog('"+pageID+"')>"+author+"</a><br/><br/> <a href='http://networkingexchangeblog.att.com/?source=EENT101912900998N' class='morepost'>[More Posts]</a>";
            else
            content = "<span class='post-date'>"+pubDtStr+ "</span> <br/><span class='author-link'>"+author+"</span>";
            var contentVar = document.createElement('p');
        
            if(lastEntry) {
                        contentVar.className = 'postmetadata';
                        contentVar.setAttribute("class","postmetadata");
            }
            else {
                        contentVar.className = 'postmetadata';
                        contentVar.setAttribute("class","postmetadata");
            }
            contentVar.innerHTML = content;
            return contentVar;
}
function getMoreTopic(topicName, TopicURL, pageID) {
            var content = document.createElement('p');
            var anchor = document.createElement('a');
            anchor.innerHTML = "You Might Also Be Interested in..";
            anchor.href = TopicURL;
       anchor.onclick = function(){ trackAtlasBlog(pageID)}; 
            content.innerHTML ="View more posts on "+topicName+" and other topics on the ";
            content.appendChild(anchor);
            return content;
}
function getMoreTopicOnNetworking(topicName, TopicURL, pageID) {
            var content = document.createElement('p');
            content.className = 'footer';
            content.setAttribute("class","footer");
            var anchor = document.createElement('a');
            anchor.innerHTML = "You Might Also Be Interested in..";
            anchor.href = TopicURL;
        anchor.onclick = function(){ trackAtlasBlog(pageID)};
            content.innerHTML ="View more posts on "+topicName+" and other topics on the";
            var brContent = document.createElement('BR');
            content.appendChild(brContent);
            content.appendChild(anchor);
            return content;
}
function getBlogPageURL(feedurl) {
   var pageURL = new String(feedurl);
   var index = pageURL.indexOf("/feed/");
   return pageURL.substring(0,index);
}
function getSeparator() {
            var separator = document.createElement("hr");
            separator.setAttribute("style","height: 1px;");
            return separator;
}
function getAuthorURL(author, feedurl) {
            var authorStr = new String(author);
            var authorURL = "";
            var spcInd = authorStr.indexOf(" ");
            if(spcInd > 0) {
                        var firstnam = new String(authorStr.substring(0,spcInd));
                        firstnam = firstnam.toLowerCase();
                        var lastnam =  new String(authorStr.substring(spcInd + 1));
                        lastnam = lastnam.toLowerCase();
                        var host="";
                        var port="";
                        var pattern = feedurl.split('/');
                        port = pattern[0];
                        host = pattern[2];
                        authorURL =port+"//"+host+"/author/"+firstnam+"-"+lastnam;
            }
            return authorURL;}