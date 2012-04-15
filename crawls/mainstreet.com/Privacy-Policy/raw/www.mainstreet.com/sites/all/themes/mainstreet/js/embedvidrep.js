/* video */

/********** utility functions **************/

// log to firebug
function log(m,o){


   if(typeof console != "undefined"){ 
      if(typeof o == "undefined"){
         console.log(m);
      }else{
         console.log(m,o);
      }
   }else{
      var d = document.getElementById('debug');
      if(typeof d=="undefined"){
         d  =  document.createElement("div");
         YAHOO.util.Dom.setStyle("width","100%");
         document.getElementsByTagName("body")[0].appendChild(d);
      }
         //d.innerHTML = m + "<br>"+ d;
   }

};
function evtlog(m){ if(typeof console != "undefined"){ console.log(m);}};


// convert a brightcove <cough> string array into a string
function bctoString(o){

   if(YAHOO.env.ua.ie){
      return o;
   }

   if(typeof o != "object"){
      return o;
   }
   var s = "";
   for(var i in o){
      if(typeof o[i] == "string"){
         if(o[i].indexOf("function")==-1){
         s += o[i];
         }
      }
   }
   return s;
}


/****  register the video namespace *****/

registerNS("TSCM.video");
registerNS("TSCM.util");
registerNS("TSCM.cfg");

TSCM.video.Defaults = {
   default_lineup_id:1111449338, // this happens to be "market strategy";
   default_lineup_refid:"strategysession",
   default_lineup_name:"Market Strategy"
};


/* this object deals with managing the whole thing. */
TSCM.video.Player = new function(){

      var dom = YAHOO.util.Dom;
      var Event = YAHOO.util.Event;
      var player = null;
      var carousel = null;
      var guide = null;
      var VG = null;
      var justSawViagra=false;

   return {  //Player
      search_id:1,
	  proxy:null,
      adcount:0,
	  playlist:{items:[]},	  
      lineupid:TSCM.video.Defaults.default_lineup_id, // default lineup id goes here: market updates.
      init:function(){


         // make a reporting call for the main page         
		// TSCM.video.Reporter.reportPage();

            //////////// tabs navigation for guide /////////////////
           //TSCM.video.Guide.tabset  = new YAHOO.widget.TabView("vidguidetabs"); 
           //TSCM.video.Guide.tabset2  = new YAHOO.widget.TabView("vidguidetabs"); 


            

		
			
      }, // init
	 
	
convertVidOb:function(vid,id){
	var ret = {};
	ret.displayName = bctoString(vid.displayName);
	ret.shortDescription = bctoString(vid.shortDescription);
	
	//log("ID IS %o",id);
	ret.id = id;
	ret.referenceId = bctoString(vid.referenceId);
	ret.thumbnailURL = bctoString(vid.thumbnailURL);
	return ret;
	
}
		
	  } 

   
}; // ya rly




/** this guide object deals with the gui.
it first loads the list of channels and 
displays results in the channeldisplay div
*/


TSCM.video.Guide = new function(el,cfg){

   var dom = YAHOO.util.Dom;
   var Event = YAHOO.util.Event;

   var iconsDT = null;
   var latestDT = null;
   var searchDT = null;
   



 
   // pull author out of a video object
   // format is, for example: [authors=Brittany Umar]
   function getAuthor(video){
      var auth = TSCM.video.Guide.getTagValue(video,"authors");
      auth = auth.replace(/\|/, ' & ');
      return auth;
   }


   // format thumbnail cells for a datatable.
   
   
   





   return {
      autoplay:true,
	  context_path:"/tsc",
      default_lineup:TSCM.video.Defaults.default_lineup_refid,
      loadchannels:false,
      search_in_progress:false,
      fetch_in_progress:false,
      adcount:0,
      adfreq:2, // 
      current_lineup_name:TSCM.video.Defaults.default_lineup_name, // this should really be named 'default' but oh well.
      search_id:0,
      searchPageIndex:1,
      searchDoneEvent:new YAHOO.util.CustomEvent("searchdone"), 
      latestDoneEvent:new YAHOO.util.CustomEvent("latestDone"), 
      latestdone:false, 
      dialog:null,
      current_lineup:null,
      lineups:[],
      videos:{},
      latest_vids:[],
      fetch_queue:[],
      player_queue:[],
      mostpopDT:null,
      current_video:null,
      queued_video:null,
	  
	  getFmtDate:function(pubdate){
	  	
	  	var epoch = bctoString(pubdate);
		if(epoch<10000000000) epoch *= 1000;
		var d = new Date(Number(epoch));
		var fmt = TSCM.util.formatDate(d,"E MM/dd/yy HH:mm a") + " EST";
		return fmt;
		},
      getAuthors:function(video){

       //  log('GET AUTH');
         var auth = TSCM.video.Guide.getTagValue(video,"authors");
         auth = auth.replace(/\|/, ' & ');
         return auth;

      },
      getTickers:function(video,formatlink){
      var t =  TSCM.video.Guide.getTagValue(video,"tickerList");
      if(t == ""){
         t = TSCM.video.Guide.getTagValue(video,"tickers");
      }
      try {
         if(t.toString().toLowerCase() == 'none'){
            return "";
         }

         if(typeof formatlink != 'undefined'){
            if(formatlink == true){
               t = t.replace(/ /g,"");
               var ticker = "['" + t.replace(/\|/g,"','") + "']";

               var tickarray = eval(ticker);

               var uniq = {};
               for(var i=0;i<tickarray.length;i++){
                  ticker = tickarray[i];
                  uniq[ticker] = 1;
               }

                  // remove duplicates
               var tickers = [];
               for(var i in uniq){
                  tickers.push(i);
               }

               ticker = "";
               tickarray = tickers;
               for(var i=0;i<tickarray.length;i++){
                  
                  if(TSC.util.isDefined(tickarray[i])){
                  var link = '<a target=new href="' + TSCM.cfg.contextRoot + '/quote/' + tickarray[i] + '.html?omorig=video">' + tickarray[i] + '</a>';
                  } else{
                     link = "";
                  }
                  ticker+=link;
                  ticker+= " | ";
               }
               ticker = ticker.substring(0,ticker.lastIndexOf('|')-1);
            }
         }else{
               var ticker = t.replace(/\|/g,", ");
         }

         return ticker;

      } catch(e){ log(e);return t; }
         return ticker;
     },

      onMediaComplete:function(a,b,c){
         //log(' media complete evnt');
         var lineup = TSCM.video.Guide.current_lineup;
         var currentvid = TSCM.video.Guide.currentvid.id;


        
      },

      /********************************/
      /*evt_lineupVideosFetched:new YAHOO.util.CustomEvent("lineupVideosFetched"), */
      addLineup:function(lineup){
         //log('adding lineup %o',lineup);
         this.lineups.push(lineup);
      },
      getTagValue:function(video,tagname){
         tagname+="=";
         var tags = video.tags;
         try {
            for(var i=0;i<tags.length;i++){
               var tag = bctoString(tags[i]);
               if(tag.indexOf(tagname)!=-1){
                  var ret = tag.substring(tagname.length+1);
                  ret = ret.substring(0,ret.lastIndexOf(']'));
                  return ret;
               }
            }
            return "";
         }catch(e){ log('ERROR' + e.message);}

      },
	  fetchPopular:function(){
        if( this.mostpopDT != null){
           return;
        }



	      //callFlash("fetchLineupById", TSCM.video.Guide.popularlineup.id); 

         this.current_lineup = "popular";
		
         // build fetch list based 
         try {

            var videolist = TSCM.video.Guide.popularlineup.videoIds;
            var tofetch = buildFetchList(videolist);  // returns array of video ids 

            if(tofetch.length > 0){
            TSCM.video.WaitDialog.getInstance().show();
            TSCM.video.WaitDialog.getInstance().setHeader('Loading most popular videos...');
            TSCM.video.WaitDialog.getInstance().setBody('Loading most popular videos...');
               this.fetch_queue = tofetch;
               this.fetchNonCachedTitles(tofetch);
            }
         }catch(e){
            log(e);
         }
     },
	

      /** this function is called when the player returns the lineups **/
      handlePlayerLineupsResult:function(ob){
	  	
	
      },
      loadDefaultLineup:function(){
         var lineup = this.default_lineup;



      },
      getLineupById:function(id){
         for(var i=0;i<this.lineups.length;i++){
            var lineup = this.lineups[i];
            if(Number(lineup.id) == Number(id))return lineup;
         }
      },
      getLineupByRefId:function(refid){
         for(var i=0;i<this.lineups.length;i++){
            var lineup = this.lineups[i];
            if(lineup.refid == refid)return lineup;
         }
      },
      // this displays the list of lineups in a datatable
      loadChannels:function(){
        

      },
     
    
   
      fetchNonCachedTitles:function(vidlist){
            for(var j=0;j<vidlist.length;j++){
               callFlash("fetchTitleById",vidlist[j]);

               //this.fetchTitle(vidlist[j]);
            }
      },
      /** fetch a list of titles, @param array of title ids */
      fetchTitles:function(vidlist){
            for(var j=0;j<vidlist.length;j++){
               var id ="V" + vidlist[j];
               callFlash("fetchTitleById",vidlist[j]);
               //this.fetchTitle(vidlist[j]);
            }
      },
      /* given a lineup object extract the list of video ids and fetch */
      fetchLineupTitles:function(lineup){
         // now would be a good time to show a dialog
            var vidlist = lineup.videoIds;
            // this is a list of ids by this point

            for(var j=0;j<vidlist.length;j++){
               var id ="V" + vidlist[j];
               if(typeof this.videos[id]== "undefined"){
                  callFlash("fetchTitleById",vidlist[j]);
               }else{
                 // log('found video with id ' + id);
               }
            }
      },
      /** it appears not to be able to handle getting all lineups at the same time */
      fetchAllTitles:function(){
         for(var i=0;i<this.lineups.length;i++){
            var vidlist = this.lineups[i].videoIds;
            for(var j=0;j<vidlist.length;j++){
               var id="V"+vidlist[j].id;
               if(typeof this.videos[id]== "undefined"){
                 // log('need to fetch ' + id);
                  this.fetchTitle(vidlist[j]);
               }else{
                  //log('found cached video with id ' + id);
               }
            }
         }
      },
      /* when a title result comes back, store it in the memory cache */
      handleTitleFetch:function(o){
	  	
		if(TSCM.video.Guide.fromplaylist == true){
			playVideo(o.id);
			TSCM.video.Guide.fromplaylist = false;
		}
		
         var id="V" + o.id;
         var id2="refid" + bctoString(o.referenceId);
         TSCM.video.Guide.videos[id] = o;
         TSCM.video.Guide.checkQueue(o.id);
      },
      checkQueue:function(id){
         //check  queue for id
         if(this.fetch_queue.length == 0) return;
         for(var i=0;i<this.fetch_queue.length;i++){
            // cast to number since its all wacky types here.
            if(Number(this.fetch_queue[i])==Number(id)){
               // found one, so cut it from the q
               this.fetch_queue.splice(i,1);

            }else{
               // didnt match anything. 
            }
         }


         // all are retreived so display it
         if(this.current_lineup  == "popular"){
            if(this.fetch_queue.length == 0){
               this.displayPopular();
            }
         }else{
            if(this.fetch_queue.length == 0){
               this.displayChannel(this.current_lineup);
            }
         }

      },
      /* given an id call bc to fetch title */
      fetchTitle:function(id){
         callFlash("fetchTitleById",id);
      },
      getTitles:function(ids){
         var list = [];
         for(var i=0;i<ids.length;i++){
            list.push(this.videos['V'+ids[i]]);
         }
         return list;
      },
      loadLatest:function(lineup){

         this.current_lineup = lineup;
         this.current_lineup.refid = "latestvideos";
         this.current_lineup_name = bctoString(lineup.displayName); 
         
         var videolist = lineup.videoIds;
         var tofetch = buildFetchList(videolist); 
         this.fetch_queue = tofetch;
         this.fetch_length = tofetch.length;
         this.fetchLineupTitles(lineup);

      },
      handleLatest:function( oRequest , oRawResponse , oCallback , oCaller , tId ){
         var vids = oRawResponse.results;
         this.latest_vids_response = oRawResponse.results;

         var cols = 5; 

         // create a data table. 
         var defs = [];
         var schema = {fields:[]};
         for(var i=0;i<cols;i++){
            var id = "col" + (i+1);
            var o = {key:id,label:"",formatter:latestCellFormat};
            defs.push(o);
            schema.fields.push(id);
         }

         var list = [];
         var o = {};
         var j=1;
         
         // convert list to multidimensional array
         for(var i=0;i<vids.length;i++,j++){
            var id="col" + j;
            o[id] = vids[i];
            if(j%cols==0){
               list.push(o);
               o={};
               j=0;
            }
         }

         
      },
      // when a search result comes back with a list of video ids
      // handle it by fetching the necessary videos then displaying
      // a datatable. 
      
      setTitleDisplay:function(video){

            
      } 



   }

};



function playVideo(id,playlist){

      log('playing video ' + id);
	 
	  if(playlist){
	  	TSCM.video.Guide.fromplaylist  = true;
		callFlash("fetchTitleById",id);
	  }

      var the_video = TSCM.video.Guide.videos['V' + id];
	   TSCM.video.Guide.currentvideo = the_video;
      //TSCM.video.Guide.current_video = nextvideo;
      if(TSCM.video.Player.isRefId){
        // log("loadTitleByReferenceId");
         callFlash("loadTitleByReferenceId",id,"full");
      }else{
         callFlash("loadTitleById",id,"full");
      }

      var s = document.location.search; 
      if(TSC.util.isDefined(s)){
         top.document.location.href = document.location.pathname + document.location.search + '#' + id;
      }else{
         top.document.location.href = document.location.pathname + '#' + id;
      }
	
     // YAHOO.util.Dom.get('skipset').innerHTML ='';


}

YAHOO.util.Event.on(window,"load",TSCM.video.Player.init);



/******** brightcove native functions -- sadly must be global *****/

function muteVid() {
    callFlash("setVolume",0);
}

function onContentLoad(o){
  // log('content loaded');

      if(TSCM.video.Player.isRefId){
       //  log('ref id passed in .. fetching title' + vidid);
         callFlash("fetchTitleByReferenceId",vidid,"full");

         setTimeout(function(){
            //callFlash("fetchLineupByReferenceId",TSCM.video.Guide.default_lineup);
           // callFlash("getPlayerLineups");
         },1000);
      } else {
        // log('no ref id');

            //callFlash("getLineupByReferenceId","latestvideos");
            //callFlash("fetchLineupByReferenceId",TSCM.video.Guide.default_lineup);
            //callFlash("getLineupByReferenceId",TSCM.video.Guide.default_lineup);
            //callFlash("getPlayerLineups");
      }

      //callFlash("getPlayerLineupIds");
      //callFlash("getPlayerLineupIds");
   //log('end content loaded');
}

function onStreamStart(o){
  //log('stream started');
  TSCM.cfg.VideoPlaying = true;
  //YAHOO.util.Dom.get('skipset').innerHTML ='';
   callFlash("getCurrentTitle");
  
}


function getCurrentTitle_Result(video){
	TSCM.video.Guide.currentvid = video;
	TSCM.video.Guide.current_video = video;
	TSCM.video.Guide.currentvideo = video;
	//log(video);
	
	if (TSCM.video.Player.isRefId) {
		var lid = video.lineupId;
		TSCM.video.Player.lineupid = video.lineupId;
		//  log("CHANNEL LINEUP " + lid);
		//callFlash("fetchLineupById",video.lineupId);
	}
	
	/*
	 if( TSCM.video.Guide.adPlaying ) {
	 //log("AD is playing -- report preroll");
	 setTimeout(function(){
	 TSCM.video.Reporter.reportPreroll(video);
	 },1500);
	 return;
	 }
	 */
	TSCM.video.Guide.currentvid = video;
	//TSCM.video.Guide.setTitleDisplay(video);
	
	
	//log(" ------------------------------- " + TSCM.video.Player.isRefId);
	
	
	//  if(TSCM.video.Player.adcount > 0){
	
	TSCM.video.Reporter.report(video);
	//}
}


function fetchLineupByReferenceId_Result(o){
      callFlash("getLineupByReferenceId","latestvideos");
     // log('fetch lineup by reference id result');
};

function getLineupByReferenceId_Result(o){
   //log('player returned lineup by ref id');
   //log(bctoString(o.referenceId));
   //TSCM.video.Guide.loadLatest(o);
};

function getWorkday(){
    var now = new Date();
    if(now.getHours()<6 || now.getHours()>17){
        return false;
    } else {
        return true;
    }
}


function onTemplateLoaded() {
 
//	callFlash("enableAdFormats", 14, 1);
//	callFlash("enableAdFormats", 16, 2);

   // listen for content load so we can retreive lineups
   callFlash("addEventListener", "contentLoad", "onContentLoad");

   // listen to stream start for reporting events 
   callFlash("addEventListener", "streamStart", "onStreamStart");
 if(getWorkday() == true) { //between 6am and 5pm
       muteVid();
   };

   callFlash("addEventListener", "loadError", "onLoadError");

   //callFlash("addEventListener", "mediaComplete", "TSCM.video.Guide.onMediaComplete");
   callFlash("addEventListener", "mediaComplete", "onMediaComplete");
   callFlash("addEventListener", "mediaStart", "onMediaStart");
   callFlash("addEventListener", "mediaStop", "onMediaStop");



}

function onMediaStart(){
	TSCM.cfg.VideoPlaying = true;	
}

function onMediaStop(){
	TSCM.cfg.VideoPlaying = false;	
}

function getPlayerLineupIds_Result(o){
   //log("lineup ids result");
}


/******* reporting stuff *********/
TSCM.video.Reporter = new function(){
   var dom = YAHOO.util.Dom;

    var P = "|";
    var D = ":";

   return {
      default_channel:"Latest Videos",
      default_hier1:"mstv",
      section:"video",
      csection:"reference",
      ad:{sponsor:null,campaign:null},
      vdata:"video data",
	  vtsctv:"mstv",
	  tsc:"ms",
      content_type:"video",
      title:null,
      headline:null,
      callout:null,
      author:null,
      hier:null,
      contenttype:"VIDEO",
      channel:null,
      interval:"VideoInterval",
      init:function(){
         //log("hello from video reporter singleton ");
      },
      link:function(pagename){
         ob = { pageName:pagename };
         pi = pagename;
         TSC.reporting.sendLinkEvent(pagename);
         //var ord = Math.floor(Math.random()*1000000);
         //var tracker = 'http://102.112.2O7.net/b/ss/streetprod/1/G.4--NS/' + ord +'?pe=lnk_o&pev2=VideoInterval-' + sponsor + '-' + campaign + '-Start+' + ch;
         //new Image().src = tracker;


      },
      /* interval trackign */
      adstart:function(){
         var pn = this.interval + D + this.ad.sponsor + D + this.ad.campaign + D + "start" + D + this.ad.channel + D + this.ad.duration;
         this.link(pn);
      },
      admiddle:function(){
         var pn = this.interval + D + this.ad.sponsor + D + this.ad.campaign + D + "middle" + D + this.ad.channel + D + this.ad.duration;
         this.link(pn);
      },
      adend:function(){
         var pn = this.interval + D + this.ad.sponsor + D + this.ad.campaign + D + "end" + D + this.ad.channel + D + this.ad.duration;
         this.link(pn);


      },
      reportPreroll:function(video){
         return;

      },
      /* function to report the main page when it loads */
      reportPage:function(){
         return;
      },
      /** function to report a video play **/
      report:function(video){

         try {
		  	 
          var channel = TSCM.video.Guide.current_lineup_name;
			
          var orig_channel = TSCM.video.Guide.getTagValue(video,"storyTypeDirName");
		  
          if(!TSC.util.isDefined(channel))channel = this.default_channel;
          var cg = this.default_hier1 + P+this.section+P+channel; 
          
		  var vidObj = new Object();
          var headline =  bctoString(video.shortDescription);		  
          vidObj["pageName"]=this.default_hier1+":"+ headline;
          vidObj["channel"]=this.default_hier1;
          vidObj["hier1"]=this.tsc+P+this.default_hier1 +P + channel.toLowerCase() + P + headline;
          vidObj["contentCat"]=this.tsc+P+this.default_hier1 +P + channel;
          vidObj["contentType"]="embedded video";
          //if (TSC.util.isDefined(playerCalledfromHome)){
          if (document.location.pathname == "/"){
            //if  (playerCalledfromHome==true){
                vidObj["contentType"]="home page video";
            //}  
          }
          vidObj["videoChannel"]=orig_channel;
		  //reset these cos they may be on the page
		  vidObj["adzone"]="";
		  vidObj["sectionFront"]="";
		  vidObj["articleName"]="";
		  vidObj["subsection"]="";
		  vidObj["storyType"]= "";
		  vidObj["pagination"]="";
		   
		 
          var pubdate = TSCM.video.Guide.getTagValue(video,"publishTimestamp");
          var myDate = new Date( Number(pubdate));
          //var datefmt = myDate.toGMTString()+myDate.toLocaleString();

             try {
                vidObj["pubDate"]=TSC.util.dateDisplay(myDate);
             }catch(e){log(e);}

         
          vidObj["articleId"]=bctoString(video.referenceId);
          //vidObj["topArticles"]=headline;

          vidObj["authorName"]=TSCM.video.Guide.getTagValue(video,"authors");

          vidObj["authorId"]= "" ; //
          vidObj["videoViews"]=headline;
          vidObj["keywords"]= ""; 
          var tickers = TSCM.video.Guide.getTickers(video);

          vidObj["tickers"] = tickers;

          try {
             if(TSC.util.isValidPuc(vidObj.puc)){
                vidObj["stories"]=this.default_hier1 + P + vidObj.authorName + P + vidObj.articleId + P + vidObj.pubDate + headline;
             }			
          }catch(e){}	
		 vidObj["pi"]="TSCTV|" + TSCM.video.Guide.getTagValue(video,"authors") + " - " + headline + " (" + bctoString(video.referenceId) +  ") 1" + TSC.util.getPuc();
		  
          TSC.reporting.config(vidObj);	
          TSC.reporting.makeCall();


         } catch(e){
            log("ERROR: reporting");
            log(e.message);

         }

          window.rep = vidObj;

      }
                      
                      ,
      /** function to report an ad **/
      reportAd:function(video){

      },

      fireTracker:function(url){
			 
			
			   var allimages="";
			   if(url.indexOf(',')!=-1) {
                  var urls = url.split(",");				  
				  for(var i=0;i<urls.length;i++){
                     var u = urls[i];					 
                     // if its not an omni url go for it
                     if(u.indexOf('pev2')==-1){
						 //log("firing 3rd party tracker: " + u);							
								 //eval("pic" + i + "=new Image().src ='"+ u  + "';");							
								 //document.write("<img src='" + u + "'/>");
								  allimages += "<img  src='" + u + "'>";
     							//leader.innerHTML =("<img src='" + u + "'/>");
                     }else{
                        // if it is omni but is not one of ours...
                        if(u.indexOf('streetprod')==-1){
                           //new Image().src = u;
						   allimages += "<img src='" + u + "'>";
                        }
                     }
                  }
				  
               }else{
                  if(url.indexOf('streetprod')==-1){
					// log("firing 3rd party tracker 2: " + url);
                    // new Image().src = url;
					  if(url.length > 0){
					allimages += "<img src='" + url + "'>";
					}
                  }
               }
			   YAHOO.util.Dom.get('firetracker').innerHTML =  allimages;
			   //alert(allimages);
            }
   };
};


var getPlayerLineups_Result = TSCM.video.Guide.handlePlayerLineupsResult;
var fetchTitleById_Result = TSCM.video.Guide.handleTitleFetch;

var fetchTitleByReferenceId_Result = function(ob){
  // log("title by ref id ");
  // log(ob);
   callFlash("getCurrentTitle");
   var id = ob.id;

   if(TSCM.video.Player.isRefId){
    //  log("ref id is true");
      playVideo(vidid);
      //log("calling load latest videos");
      //callFlash("fetchLineupByReferenceId","latestvideos");
      //callFlash("fetchLineupById",lid);
   }

}

function getTitleByReferenceId_Result(o){
  // log("get title by ref id result");
  // log(o);

}

function loadTitleByReferenceId_Result(ob){

 //  log('load title by reference id result');
  // log(ob);
   TSCM.video.Player.isRefId = false;

  // log(TSCM.video.Guide.current_video);
  // log('reinit!');
   setTimeout(function(){
  // TSCM.video.Carousel.reinit();
   },700);

}



function loadTitleById_Result(ob){

}



function searchFetchPage_Result(o){
   //log('search fetch page result');
  // TSCM.video.Guide.search_in_progress = false;
}

function onSearchError(o){
   log('search error');
   
   log(o);
}

function notyet(message){

            var handleYes = function() { this.hide();};
            var dia =  new YAHOO.widget.SimpleDialog("diad",  
	             { width: "300px", fixedcenter: true, visible: true, draggable: true, close: true, 
	               text: message, 
	               icon: YAHOO.widget.SimpleDialog.ICON_INFO, 
	               buttons: [ { text:"OK", handler:handleYes, isDefault:true }],  
	               constraintoviewport: true, 
                  iframe:true } ); 
                  dia.setHeader("not yet implemented.");
                  dia.render(document.body);


   }

/* listener handlers */






function getTheNodeValue(xml,node){
   var nodevalue ;
   //log('getting value for ' + node);
   try {
        nodevalue = xml.getElementsByTagName(node)[0].firstChild.nodeValue;
        //log(nodevalue);
        return nodevalue;
   }catch(e){
      //log('failed to get node value ' + e.message);
       return "";
   }
}


_g = TSCM.video.Guide;

function onMediaComplete(){
   //log("ON MEDIA COMPLETE - autoplay is: " + TSCM.video.Guide.autoplay);
   // get next one in the queue
   //log(TSCM.video.Guide.current_lineup);
   TSCM.video.Player.isRefId = false;

   if(!TSCM.video.Guide.autoplay)return;
   try {
   if(TSCM.video.Guide.fromplaylist){
   	//log("plyed from playlist"); 
   	  	 var currentvid = TSCM.video.Guide.currentvid.id;
   		 for(var i=0;i<TSCM.video.Player.playlist.length;i++){
	  		if(Number(TSCM.video.Player.playlist[i].id) == Number(currentvid)){
				var vid = TSCM.video.Player.playlist[i];
				playVideo(TSCM.video.Player.playlist[i+1].id);
				return;
	  		}
		}
   }
   }catch(e){
   	// 
   }
   
   try {
      var lineup = TSCM.video.Guide.current_lineup;
      var currentvid = TSCM.video.Guide.currentvid.id;

      // this handles the autoplay
     // log(lineup);
     // log(currentvid);
      for(var i=0;i<lineup.videoIds.length;i++){
         if(Number(lineup.videoIds[i]) == Number(currentvid)){
            //log('next video is: ');
            //log(lineup.videoIds[i+1]);
            playVideo(lineup.videoIds[i+1]);
               var c = TSCM.video.Carousel.getInstance();
               c.moveTo(i+3);
            return;
         }
      }
   }catch(e){
      log('err');
      log(e);

   }

}


function onAdStart(){
  // log("ON AD START");
   try {
   var ad = TSCM.video.Guide.ad;
   var url = ad.trackStartURLs;
   TSCM.video.Reporter.fireTracker(url);
   }catch(e){
      log(e);
   }
}


function onAdComplete(){
  // log("ON AD COMPLETE");
   TSCM.video.Guide.adPlaying = false;

   setTimeout(function(){
   TSCM.video.Carousel.reinit();
   },1500);


   try {
   var ad = TSCM.video.Guide.ad;
   var url = ad.trackEndURLs;
   TSCM.video.Reporter.adend();

   // force one ad
   //if(TSCM.video.Reporter.ad.sponsor == "viagra"){
    //  if(TSCM.video.Player.firstRun = true){
     //    TSCM.video.Guide.adfreq = 2;
    //     TSCM.video.Player.firstRun = false;
     // }
  // }

   /*var ch = bctoString(TSCM.video.Guide.current_lineup.refid);
   //TSCM.video.Guide.adchannel = ch;
   if(ch == "cramermarketupdates"){
      if(TSCM.video.Guide.adcount > TSCM.video.Guide.adfreq ){
         TSCM.video.Guide.adcount = 3;
         TSCM.video.Guide.override = false;
      }else{
         TSCM.video.Guide.override = true;
      }
      TSCM.video.Guide.adcount++;
   }
*/


   TSCM.video.Reporter.fireTracker(url);
   }catch(e){
      log(e);
   }
}



function fetchLineupById_Result(o){

//   evtlog("fetch lineup by id result returned:");
//   log(o);
}

function onAdProgress(o){
 
   try {
      var pos = o.parameters.position;
      //log("position: " + pos);
      var dur = Number(TSCM.video.Reporter.ad.duration/2);
      //log("duration: " + dur);

      if(o.parameters.position > Number(TSCM.video.Reporter.ad.duration/2)){
         if(TSCM.video.Reporter.ad.mid == false){
            TSCM.video.Reporter.ad.mid=true;
            //log('firing middle interval');
            TSCM.video.Reporter.admiddle();
            setTimeout(function(){
            TSCM.video.Reporter.fireTracker(TSCM.video.Reporter.ad.midurl)
            },500);
         }
      }
			//log(TSCM.video.Guide.over30);
			
	   if (o.parameters.position>30 && TSCM.video.Guide.skipSet==false  ){
		//callFlash("setControlsMode", "video");
		
		YAHOO.util.Dom.get('skipset').innerHTML ="<div style='float:right;margin-right:8px'><div style='width:100px;border:1px solid #cccccc;background:#eeeeee;text-align:center'><a style='cursor:pointer;color:999999' onclick='callFlash(\"endExternalAd\",true);'>Skip Ad</a></div></div>" + "<br/>";
		TSCM.video.Guide.skipSet=true;  
		
		
		}
	  
   }catch(e){
      log(e);
      throw e.message;
   }
  
}

function onCuePoint(o){
  // log("hit cue point");
  // log(o);
}

function onLoadError(o){
   log("load error");
   log(o);
}







