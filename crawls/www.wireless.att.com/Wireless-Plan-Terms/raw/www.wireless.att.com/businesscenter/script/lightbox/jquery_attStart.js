Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function isEmpty(ob){
    for(var i in ob){
        return false;
    }
    return true;
}
/*----------------------------------*/
/*        LightBox object           */
/*  Initial                         */
/*  CreateOne                       */
/*  Build                           */
/*----------------------------------*/

function LightBox(){
   
}
/*----------------------------------*/
/*         class initial            */
/*----------------------------------*/
LightBox.prototype.Initial = function(){

    var lightBoxes = this;
    var cnt = 1;
    var newId;
    var linkList = new Array();
    this.link = linkList;
    this.imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i;
    this.swfRegExp = /[^\.]\.(swf)\s*$/i;
    this.pdfRegExp =  /\.(pdf)(.*)?$/i;
    this.jspRegExp =  /\.(jsp)(.*)?$/i;
    this.htmlRegExp =  /\.(html|htm)(.*)?$/i;
    //var numberOfA_tag = document.getElementsByTagName('a').length;
    if (document.getElementsByTagName('a').length != 0 ){
        $('a').each(function(){
            if($(this).hasClass('LightBox')){
                newId = "LightBox_" + cnt;
                $(this).attr('id',newId);
                lightBoxes.CreateOne(newId);
                cnt++;
            }
        })
    }
}

LightBox.prototype.CreateOne = function(lightboxId){
    var paramsJSON;
    var totalParams = 0;
    var lbID = "#" + lightboxId;

    var defaultTitle =  $(lbID).attr('title');
    var isVideoPlayer =  $(lbID).attr('videoplayer');
    var isNoTitle =  $(lbID).attr('notitle');
    if(defaultTitle == '' || defaultTitle == undefined){
        defaultTitle = document.title ;
    }
    if(isVideoPlayer != undefined){
        //        paramsJSON = '{titleShow : false ';
        defaultTitle = '';
        paramsJSON = '{title : "&nbsp;&nbsp;"';
        paramsJSON += ', videoPlayer : "yes"';
        paramsJSON += ', width : 642';
        paramsJSON += ', height : 400';
    }
    else{
        if(isNoTitle != undefined){
            defaultTitle = '';
            paramsJSON = '{titleShow : false ';
        }
        else{
            paramsJSON = '{title : "' + defaultTitle + '"';
        }
    }
    totalParams++;
    var box ={
        id : lightboxId,
        params:[]
    };

    var href = $(lbID).attr('href');
    var temp = href.split('?');
    var url = temp[0];
    if (href.match(this.imgRegExp)) {
        box.type = 'image';
    } else if (href.match(this.swfRegExp) || url.match(this.swfRegExp)) {
        box.type = 'swf';
        if(totalParams >0){
            paramsJSON += ', swf : {wmode: "transparent"} ';
        }
        else{
            paramsJSON += 'swf : {wmode: "transparent"} ';
        }
        totalParams++;

    } else if (href.match(this.jspRegExp)) {
        box.type = 'iframe';
    } else if (href.match(this.htmlRegExp)) {
        box.type = 'html';
    } else if (href.match(this.pdfRegExp)) {
        box.type = 'iframe';
    } else {
        box.type = 'iframe';
    }
    var valCode;
    if($(lbID).attr('params')!= undefined){
        var paramsSource = $(lbID).attr('params').replace(' ','');
        paramsSource = paramsSource.replace(',',';');
        var paramList = paramsSource.split(';');
        for(var i= 0 ; i< paramList.length; i++){
            var keyValue = paramList[i].split('=');
            if(isNaN(keyValue[1])){
                valCode = '"' + keyValue[1] + '"';
            }
            else{
                valCode =  keyValue[1] ;
            }

            if(totalParams >0){
                paramsJSON += ', ' + keyValue[0] + ' : ' + valCode + '';
            }
            else{
                paramsJSON += ' ' + keyValue[0] + ' : ' + valCode + '';
            }
            totalParams++;
        }
    }
    paramsJSON += "} ";
    box.params = paramsJSON;
    this.link[lightboxId]= box;
}

LightBox.prototype.Build = function(){
    var boxIndex = '';
    var box = null;

    var linksObj = this.link;
    for(key in linksObj){
        box = linksObj[key];
        boxIndex = "a#" + box['id']  ;

        var json = box['params'];
        var cmd = '$("'+boxIndex+'").fancybox(' + json + ');'
        eval(cmd);

    }
}



/*----------------------------------*/
/*        LightBox object           */
/*  Initial                         */
/*  CreateOne                       */
/*  Build                           */
/*----------------------------------*/
$(document).ready(function() {
    var lightBox = new LightBox();

    lightBox.Initial();
    lightBox.Build();

});
