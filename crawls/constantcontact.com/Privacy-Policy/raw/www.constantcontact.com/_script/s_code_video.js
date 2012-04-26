/*------------Find player----------------------*/

var OurVideo = $('div[id^="wistia_"]');
if(OurVideo.length){

    var WistiaID = OurVideo.attr("id").split("_")[1];
    var WistiaVideoName = OurVideo.attr("name");
    var WistiaPlayerName = "BasicPlayer";
    console.log("Found embedded video: "+WistiaID);

    wistiaEmbed = Wistia.embed(WistiaID, {
    videoWidth: OurVideo.attr("data-video-width"),
    videoHeight: OurVideo.attr("data-video-height"),
    playerColor: "000000"
    });

    /*------------Listeners------------------------*/

    wistiaEmbed.quartertime = 0;
    wistiaEmbed.quartertimeHit = false;
    wistiaEmbed.halftime = 0;
    wistiaEmbed.halftimeHit = false;
    wistiaEmbed.threefourthtime = 0;
    wistiaEmbed.threefourthtimeHit = false;
    wistiaEmbed.endtime = 0;
    wistiaEmbed.endtimeHit = false;


    wistiaEmbed.bind("play", function () {
        //console.log("Bound Event: Play",getVideoName(),wGetTime());
        s.Media.play(getVideoName(),wGetTime());
    });

    wistiaEmbed.bind("pause", function () {
        //console.log("Bound Event: Paused",getVideoName(),wGetTime());
        s.Media.stop(getVideoName(),wGetTime());
    });

    wistiaEmbed.bind("end", function () {
        //console.log("Bound Event: Ended");
        s.Media.complete(getVideoName(),wGetTime());
        s.Media.close(getVideoName());
    });

    wistiaEmbed.bind("timechange", function (t) {
        var now = Math.floor(t);

        if(Math.floor(wistiaEmbed.quartertime)==now && !wistiaEmbed.quartertimeHit){
            //console.log("Bound Event: 1/4 Over");
            wistiaEmbed.quartertimeHit=true;
        }else if(Math.floor(wistiaEmbed.halftime)==now && !wistiaEmbed.halftimeHit){
            //console.log("Bound Event: 1/2 Over");
            wistiaEmbed.halftimeHit=true;
        }else if(Math.floor(wistiaEmbed.threefourthtime)==now && !wistiaEmbed.threefourthtimeHit){
            //console.log("Bound Event: 3/4 Over");
            wistiaEmbed.threefourthtimeHit=true;
        }else if(Math.floor(wistiaEmbed.endtime)==now && !wistiaEmbed.endtimeHit){
            //console.log("Bound Event: Video Over");
            wistiaEmbed.endtimeHit=true;
        }


    });

    wistiaEmbed.ready(function () {
        wFindPoints();
        //console.log("Open: "+getVideoName(),getVideoLength(),WistiaPlayerName);
        s.Media.open(getVideoName(),getVideoLength(),WistiaPlayerName);

    });

}//end If Wistia exists on this page

/*------------Main Functions------------------------*/

function wPlay(){    //video start or unpause
    //console.log("Function: play");
    wistiaEmbed.play();
}

function wPause(){  //video pause
    //console.log("Function: pause");
    wistiaEmbed.pause();
}

function wSetTime(t){   //move time to t in seconds (can be a float for milliseconds).  No minutes notation! (i.e. 1:07)
    wistiaEmbed.time(t);
}

function wGetTime(){
    return wistiaEmbed.time();
}

function wGetState(){ // will return ended, playing, paused, or unknown (not started)
    //console.log("Current State: "+wistiaEmbed.state());
}

function wGetVolume(){
    //console.log("Current Volume: "+wistiaEmbed.volume());
    return wistiaEmbed.volume();
}

function wSetVolume(v){ //expects values between 0 and 1
    //console.log("Set volume to "+v+"");
    wistiaEmbed.volume(v);
}

function getVideoLength(){
    return wistiaEmbed.duration();
}

function wFindPoints(){
    var EndTime = parseFloat(getVideoLength());
    wistiaEmbed.quartertime = (EndTime * .25);
    wistiaEmbed.halftime = (EndTime * .5);
    wistiaEmbed.threefourthtime = (EndTime * .75);
    wistiaEmbed.endtime = (EndTime);
}

function getVideoName(){
    return WistiaVideoName;
}