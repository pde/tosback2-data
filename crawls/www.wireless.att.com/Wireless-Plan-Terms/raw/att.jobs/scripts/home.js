/* Add common JS functions here */
document.write("<style type=\"text/css\">#flashcontent .testi{display:none;}#flashcontent #fca-home{display:block;} </style>");

var counter = 0;

$(document).ready(function() {


    /* Home Page */
    var timer = setInterval(homeAutoSlide, 10000);


    $("#fm-whatsnew").addClass("fm-whatsnew-active");

    $("#fm-whatsnew div").css("left", "163px");

    $("#four-piece-module li").mouseenter(function(e) {

        $("#four-piece-module li").removeClass();
        $("#four-piece-module li div").css("left", "-9999px");
        var CtrLi = $(this).attr("id");
        $("#" + CtrLi).addClass(CtrLi + "-active");
        $("#" + CtrLi + " div").css("left", "163px");
        $("#" + CtrLi + " div").hide();
        $("#" + CtrLi + " div").fadeIn(500);
    });

    $("#careerarea-big li").mouseenter(function(e) {
        $(".testi").hide();
        var liID = "f"+this.id.replace("-big", "");
        //alert(liID);
        $("#" + liID).fadeIn(1000);
        $("#ca-title").attr("src", "/flash/home/images/" + liID + ".png");
        //var imgID = 
    });


});



function homeAutoSlide() {

    var CtrLi = "";

    if (counter == 0)
        CtrLi = "fm-talent";
    if (counter == 1)
        CtrLi = "fm-video";
    if (counter == 2)
        CtrLi = "fm-events";
    if (counter == 3)
        CtrLi = "fm-whatsnew";
    counter++;

    $("#four-piece-module li").removeClass();
    $("#four-piece-module li div").css("left", "-9999px");
    $("#" + CtrLi).addClass(CtrLi + "-active");
    $("#" + CtrLi + " div").css("left", "163px");
    $("#" + CtrLi + " div").hide();
    $("#" + CtrLi + " div").fadeIn(500);


    if (counter == 4)
        counter = 0;

}