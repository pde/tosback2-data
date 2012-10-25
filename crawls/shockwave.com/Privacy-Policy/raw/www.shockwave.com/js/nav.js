//navigation fix
$(document).ready(function(){
    // nick mom json nav parsing
    var nickmomPrimaryNavJsonObj = {
      "response" : {
        "start" : 0,
        "docs" : [ {
          "mtvi:id" : "0c4a0145-0260-4053-babc-066229033db6",
          "mtvi:shortId" : "fvh85t",
          "mtvi:urlKey" : "primary-nav",
          "mtvi:namespace" : "nickmom",
          "mtvi:contentType" : "Site:Nav",
          "Language" : "eng",
          "Title" : "primary-nav",
          "NavEntries" : [ {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "Today's Funny",
            "URL" : "/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "Photos",
            "URL" : "/photos/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "Videos",
            "URL" : "/videos/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "More LOLs",
            "URL" : "/more-lols/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "TV",
            "URL" : "/tv/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "Games",
            "URL" : "http://www.shockwave.com/"
          } ]
        } ]
      },
      "summary" : {
        "status" : 200,
        "host" : "platform-jboss-173.811.mtvi.com",
        "started" : "2012-06-27T16:33:21.267Z",
        "executionTime" : 10,
        "params" : {
          "indent" : true,
          "q" : {
            "select" : {
              "*" : {
                "*" : 1
              }
            },
            "where" : {
              "byUrlKey" : [ "primary-nav" ]
            }
          }
        },
        "scheduleTTL" : null
      }
    }
    var nickmomSubNavTvJsonObj = {
      "response" : {
        "start" : 0,
        "docs" : [ {
          "mtvi:id" : "8196cb24-9006-482e-b31d-b6caf31bbdaf",
          "mtvi:shortId" : "urqmjp",
          "mtvi:urlKey" : "sub-nav-tv",
          "mtvi:namespace" : "nickmom",
          "mtvi:contentType" : "Site:Nav",
          "Language" : "eng",
          "Title" : "sub-nav-tv",
          "NavEntries" : [ {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "NIckMom TV",
            "URL" : "/tv/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "divider-sub-nav-start",
            "URL" : "divider-sub-nav-start"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "Parental Discretion with Stefanie Wilder-Taylor",
            "URL" : "/tv/parental-discretion/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "MFF: Mom Friends Forever",
            "URL" : "/tv/mom-friends-forever/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "What Was Carol Brady Thinking?",
            "URL" : "/tv/what-was-carol-brady-thinking/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "NickMom Night Out",
            "URL" : "/tv/nickmom-night-out/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "divider-sub-nav-end",
            "URL" : "divider-sub-nav-end"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "NickMom TV Schedule",
            "URL" : "/tv-schedule/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "divider",
            "URL" : "divider"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "NickMom TV Channel Finder",
            "URL" : "/channel-finder/"
          }, {
            "mtvi:contentType" : "Site:NavEntry",
            "Title" : "divider",
            "URL" : "divider"
          } ]
        } ]
      },
      "summary" : {
        "status" : 200,
        "host" : "platform-jboss-173.811.mtvi.com",
        "started" : "2012-06-27T16:33:21.267Z",
        "executionTime" : 10,
        "params" : {
          "indent" : true,
          "q" : {
            "select" : {
              "*" : {
                "*" : 1
              }
            },
            "where" : {
              "byUrlKey" : [ "sub-nav" ]
            }
          }
        },
        "scheduleTTL" : null
      }
    }
    // var for JSON object
    var nickmomPrimaryNavJsonObj = nickmomPrimaryNavJsonObj.response.docs[0];
    var nickmomSubNavTvJsonObj = nickmomSubNavTvJsonObj.response.docs[0];
    var local = /localhost/.test(self.location.href)||/:8090/.test(self.location.href)||/dev/.test(self.location.href);
    var dev = /dev/.test(self.location.href);
    var qa = /qa/.test(self.location.href);
    var nav = '#nickmomNav ul';
    var logo = $('#logo a#logoURL');
    // call the json navigation parsing function
    navJSON();
    function navJSON(){
        var i,j;
        var navListItemsHtml = '';
        for(i=0; i<nickmomPrimaryNavJsonObj.NavEntries.length; i++){
            if(nickmomPrimaryNavJsonObj.NavEntries[i].Title == 'TV'){
                navListItemsHtml += '<li class="menu-wrapper"><a href="http://www.nickmom.com' + nickmomPrimaryNavJsonObj.NavEntries[i].URL + '">' +
                        nickmomPrimaryNavJsonObj.NavEntries[i].Title + '</a><div class="sub-nav"><ul>';

                for(j=0; j<nickmomSubNavTvJsonObj.NavEntries.length; j++){
                    if(nickmomSubNavTvJsonObj.NavEntries[j].Title == 'divider'){
                        navListItemsHtml += '<li class="divider"></li>';
                    } else if(nickmomSubNavTvJsonObj.NavEntries[j].Title == 'divider-sub-nav-start'){
                        navListItemsHtml += '<li class="divider"></li><li><ul class="sub-item">';
                    } else if(nickmomSubNavTvJsonObj.NavEntries[j].Title == 'divider-sub-nav-end'){
                        navListItemsHtml += '</ul></li>';
                    } else {
                        navListItemsHtml += '<li><a href="http://www.nickmom.com' + nickmomSubNavTvJsonObj.NavEntries[j].URL + '">' + nickmomSubNavTvJsonObj.NavEntries[j].Title + '</a></li>';
                    }
                }
                navListItemsHtml += '</ul></div></li>';
            } else if(nickmomPrimaryNavJsonObj.NavEntries[i].Title == 'Games'){
                navListItemsHtml += '<li><a class="nickmomGames" href="' + nickmomPrimaryNavJsonObj.NavEntries[i].URL + '">' +
                        nickmomPrimaryNavJsonObj.NavEntries[i].Title + '</a></li>';
            } else {
                navListItemsHtml += '<li><a href="http://www.nickmom.com' + nickmomPrimaryNavJsonObj.NavEntries[i].URL + '">' +
                        nickmomPrimaryNavJsonObj.NavEntries[i].Title + '</a></li>';
            }
        }
        $(nav).append(navListItemsHtml);
    }
    // remove hyperlink event from shockwave games
    $('a.nickmomGames').click(function(e){ e.preventDefault(); });
    // nickmom logo link function
    switch(true){
        case local:
        // logo.attr({ href: 'http://relaunch.nickmom-d.mtvi.com' });
        logo.attr({ href: 'http://www.nickmom.com' });
        break;
        case dev:
        // logo.attr({ href: 'http://relaunch.nickmom-d.mtvi.com' });
        logo.attr({ href: 'http://www.nickmom.com' });
        break;
        case qa:
        // logo.attr({ href: 'http://relaunch.nickmom-q.mtvi.com' });
        logo.attr({ href: 'http://www.nickmom.com' });
        break;
        default:
        // logo.attr({ href: 'http://beta.nickmom.com?betacookie=true' });
        logo.attr({ href: 'http://www.nickmom.com' });
    }
    // subnav fix
    var newReleases = /new-releases.jsp/.test(self.location.href);
    var newSales = /sales.jsp/.test(self.location.href);
    var timeManagement = /time-management-games/.test(self.location.href);
    var hiddenObject = /hidden-object-games.jsp/.test(self.location.href);
    var puzzleGames = /puzzle-games.jsp/.test(self.location.href);
    var strategyGames = /strategy-games.jsp/.test(self.location.href);
    var racingGames = /racing-games.jsp/.test(self.location.href);
    var matchingGames = /matching-games.jsp/.test(self.location.href);
    var jigsawGames = /jigsaw-games.jsp/.test(self.location.href);
    var dailyGames = /daily-games.jsp/.test(self.location.href);
    var cardBoard = /card-board-games.jsp/.test(self.location.href);
    var wordGames = /word-games.jsp/.test(self.location.href);
    var tokenStatement = /tokenStatement.jsp/.test(self.location.href);
    var gameface = /gameFace.jsp/.test(self.location.href);
    var myDownloads = /myDownloads.jsp/.test(self.location.href);

    if (newReleases){
        $('#subNav ul li#new_genre').addClass('active');
    } else if (newSales) {
       $('#subNav ul li#99sale').addClass('active');
    } else if (timeManagement) {
       $('#subNav ul li#time-management').addClass('active');
    } else if (hiddenObject) {
       $('#subNav ul li#hidden-object').addClass('active');
    } else if (puzzleGames) {
       $('#subNav ul li#puzzle').addClass('active');
    } else if (strategyGames) {
       $('#subNav ul li#strategy').addClass('active');
    } else if (racingGames) {
       $('#subNav ul li#racing').addClass('active');
    } else if (matchingGames) {
       $('#subNav ul li#matching').addClass('active');
    } else if (jigsawGames) {
       $('#subNav ul li#jigsaw').addClass('active');
    } else if (dailyGames) {
       $('#subNav ul li#daily').addClass('active');
    } else if (cardBoard) {
       $('#subNav ul li#card-board').addClass('active');
    } else if (wordGames) {
       $('#subNav ul li#word').addClass('active');
    } else if (tokenStatement) {
       $('#subNav ul li#mySwTokens').addClass('active');
    } else if (gameface) {
       $('#subNav ul li#mySwGameFace').addClass('active');
    } else if (myDownloads) {
       $('#subNav ul li#mySwDownloads').addClass('active');
    } else {
//        do nothing
    }
});