document.write("<style type=\"text/css\">.carousel li{position:absolute;display:none;width:0px;height:0px;left:100px;top:50px;}</style>");
var vSlideDisplayCount = 3;
var vCurrentDsiplaySlide = 1;
var slideNumber = new Array()
var vTotalSlides = $(".carousel li").length;
var VPadding = 1; //Left-Right number of slides

var slide1 = { width: "80px", height: "50px", top: "20px", left: "10px", zindex: 1, fontsize: "10%" }
var slide2 = { width: "100px", height: "65px", top: "15px", left: "55px", zindex: 2, fontsize: "30%" }
var slide3 = { width: "80px", height: "50px", top: "20px", left: "118px", zindex: 1, fontsize: "80%" }


$(document).ready(function () {
    //move he last list item before the first item. The purpose of this is if the user clicks to slide left he will be able to see the last item.
    // $('#carousel_ul li:first').before($('#carousel_ul li:last'));
    if ($("#carousel_ul").length == 0) {
        var t = setInterval("autoSlide()", 3000);
        setContinuesNumber(vTotalSlides, VPadding);
        doSlide();
    }

    $(".carousel").after("<ul id=\"page\"><li id=\"p-previous\"><a href=\"#previous\">Previous</a></li><li id=\"p-next\"><a href=\"#next\">Next</a></li></ul>");





    $('#p-next').click(function (event) {
        //alert("Next");

        event.preventDefault();
        vCurrentDsiplaySlide += 1;
        setContinuesNumber(vTotalSlides, VPadding);
        doSlide();
        clearInterval(t);
        t = setInterval("autoSlide()", 3000);
    });

    $('#p-previous').click(function (event) {
        //alert("Next");

        event.preventDefault();
        vCurrentDsiplaySlide -= 1;
        setContinuesNumber(vTotalSlides, VPadding);
        doSlide();
        clearInterval(t);
        t = setInterval("autoSlide()", 3000);
    });

    $('.carousel li a').click(function (e) {
        e.preventDefault();
    });

    $('.carousel li').click(function () {

      
        var SelectePanel = $('.carousel li').index(this) + 1;
        vCurrentDsiplaySlide = SelectePanel;
        setContinuesNumber(vTotalSlides, VPadding);
        doSlide();
        clearInterval(t);
        t = setInterval("autoSlide()", 3000);
    });

    $('.carousel li').mouseenter(function () {
        clearInterval(t);
    });

    $("#carousel_inner").before('<a id="left_scroll">Move Left</a>');
    $("#carousel_inner").after('<a id="right_scroll">Move Right</a>');
    $("#left_scroll").addClass("left_scroll_off");

    setAwardModuleTitle(1);

    //when user clicks the image for sliding right        
    $('#right_scroll').click(function () {


        if ($("#right_scroll").hasClass('right_scroll_off')) {
            return;

        }

        $("#left_scroll").removeClass("left_scroll_off");

        //get the width of the items ( i like making the jquery part dynamic, so if you change the width in the css you won't have o change it here too ) '
        var item_width = $('#carousel_ul li').width();

        //calculae the new left indent of the unordered list
        var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;

        var CurrentIndex = ((parseInt($('#carousel_ul').css('left'))) / item_width) * -1;
        setAwardModuleTitle(CurrentIndex + 2);



        var total_width = $('#carousel_ul li').width() * $('#carousel_ul .level1').size();
        var remaingin = total_width + left_indent;
        //alert(remaingin);
        var container_width = $('#carousel_inner').width();
        //alert(container_width);
        if (remaingin == container_width) {

            $("#right_scroll").addClass("right_scroll_off");
        }

        //make the sliding effect using jquery's anumate function '
        $('#carousel_ul:not(:animated)').animate({ 'left': left_indent }, 300, function () {

            //get the first list item and put it after the last list item (that's how the infinite effects is made) '
            //$('#carousel_ul li:last').after($('#carousel_ul li:first')); 

            //and get the left indent to the default -210px
            //$('#carousel_ul').css({'left' : '0px'});
        });
    });

    //when user clicks the image for sliding left
    $('#left_scroll').click(function () {

        if ($("#left_scroll").hasClass('left_scroll_off')) {
            return;
        }
        $("#right_scroll").removeClass("right_scroll_off");
        $('#right_scroll').show(100);

        var item_width = $('#carousel_ul li').outerWidth();


        /* same as for sliding right except that it's current left indent + the item width (for the sliding right it's - item_width) */
        var left_indent = parseInt($('#carousel_ul').css('left')) + item_width;
        var CurrentIndex = ((parseInt($('#carousel_ul').css('left'))) / item_width) * -1;
        setAwardModuleTitle(CurrentIndex);

        if (parseInt($('#carousel_ul').css('left')) == -item_width) {

            $("#left_scroll").addClass("left_scroll_off");
        }

        $('#carousel_ul:not(:animated)').animate({ 'left': left_indent }, 500, function () {

            /* when sliding to left we are moving the last item before the first list item */
            // $('#carousel_ul li:first').before($('#carousel_ul li:last')); 

            /* and again, when we make that change we are setting the left indent of our unordered list to the default -210px */
            // $('#carousel_ul').css({'left' : '-210px'});
        });


    });







    //when user clicks the image for sliding left
    $('#carousel_ul li li').mouseenter(function () {

        var CrrentTitle = $(this).children("div").html();
        var pLeft = $(this).position().left;

        var pTop = $(this).position().top;

        var item_width = $('#carousel_ul li').width();
        var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;
        $(".award-content-left").hide();
        $(".award-content-left").hide();
        $(".award-content-right h3").hide();
        //alert($('.award-content-left').width());
        pLeft = pLeft + left_indent + 200;
        //alert(pLeft);
        if (pLeft > $('.award-content-left').width()) {

            pLeft = pLeft + (-386);
            $(".award-content-left").css("left", pLeft);
            $(".award-content-left").css("top", pTop);
            $(".award-content-left").empty().append(CrrentTitle);
            $(".award-content-left h3").hide();
            $(".award-content-left p").hide();
            $(".award-content-left").fadeIn(100);
            $(".award-content-left h3").fadeIn(400);
            $(".award-content-left p").show(600);
        }
        else {

            pLeft = pLeft + 18;
            $(".award-content-right").css("left", pLeft);
            $(".award-content-right").css("top", pTop);
            $(".award-content-right").empty().append(CrrentTitle);
            $(".award-content-right h3").hide();
            $(".award-content-right p").hide();
            $(".award-content-right").fadeIn(100);
            $(".award-content-right h3").fadeIn(400);
            $(".award-content-right p").show(600);
        }

        //alert(pLeft);



    });

    $('#carousel_ul li li').mouseout(function () {

        $(".award-content-left").hide();
        $(".award-content-right").hide();
    });

    //when user clicks the image for sliding left
    $('#carousel_ul .thump').mouseenter(function () {

        var CrrentTitle = $(this).children("h3").html();
        var pLeft = $(this).position().left;
        var pTop = $(this).position().top;
        var item_width = $('#carousel_ul li').width();
        var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;
        pLeft = pLeft + left_indent + 100;
        $(".video-tooltip").css("left", pLeft);
        $(".video-tooltip").css("top", (pTop - 44));
        $(".video-tooltip").empty().append(CrrentTitle);
        $(".video-tooltip").show();

    });

    $('#carousel_ul .thump').mouseout(function () {
        $(".video-tooltip").hide();
    });

    //when user clicks the image for sliding left
    $('#carousel_ul a').click(function () {
        $(".video-tooltip").hide();
    });

    //For opening URL in New Window with provide size in URL
    $('.newpage-wh').click(function (e) {

        e.preventDefault();
        // Getting URL var by its nam
        var imgWidth = parseInt($.getUrlVar("w", this.href));
        var imgHeight = parseInt($.getUrlVar("h", this.href));
        openPopup(this.href, imgWidth + 40, imgHeight + 40, '100', '100');
    });



});

function setAwardModuleTitleNew(CrrentTitle) {

    
    $(".mod-award-title").animate({ fontSize: "0em" }, 20);
    $(".mod-award-title").empty().append(CrrentTitle);
    $(".mod-award-title").animate({ fontSize: "1.1em" }, 200);
    
}

function setAwardModuleTitle(CurrentIndex) {
    if ($("#carousel_ul").length > 0) {
    
        var CurrentLi = $("#carousel_ul li:nth-child(" + (CurrentIndex) + ")");
        var CrrentTitle = $(CurrentLi).children("h3").html();
        $(".mod-award-title").animate({ fontSize: "0em" }, 20);
        $(".mod-award-title").empty().append(CrrentTitle);
        $(".mod-award-title").animate({ fontSize: "1.1em" }, 200);
    }
}


function setContinuesNumber(vTotal, vPadding) {

    if (vCurrentDsiplaySlide > vTotal) vCurrentDsiplaySlide = 1;
    if (vCurrentDsiplaySlide < 1) vCurrentDsiplaySlide = vTotal;
    slideNumber = new Array();
    var vReturnSet = vPadding * 2 + 1;
    var vStart = vCurrentDsiplaySlide - vPadding;

    if (vStart > vTotal) vStart = vStart + vTotal;
    if (vStart <= 0) vStart = vTotal + vStart;

    for (var i = 0; i < vReturnSet; i++) {

        if (vStart > vTotal)
            vStart = vTotal - (vStart - 2);
        slideNumber[i] = vStart;
        //alert(vStart);
        vStart += 1;
    }

}



function doSlide() {
    //alert(slideNumber.length);
    $(".carousel li").css("z-index", 0);
    $(".carousel li").hide();
    for (var i = 1; i <= slideNumber.length; i++) {

        //alert(slideNumber[i-1]);
        var vSlideObj = eval("slide" + i);
        if ($('#carousel_container').length == 0)
            return;
        var ctrCurrentPanel = $(".carousel li:nth-child(" + slideNumber[i - 1] + ")");
        //alert($(ctrCurrentPanel).css("left"));
        $(ctrCurrentPanel).show();
        $(ctrCurrentPanel).css("z-index", vSlideObj.zindex);
        $(ctrCurrentPanel).fadeIn(100);
        if (i == 2) {
            setAwardModuleTitleNew($(ctrCurrentPanel).children("h3").html());
        }
        //$(ctrCurrentPanel + " a").show(); ;
        //$(ctrCurrentPanel + " a").css("width", vSlideObj.width);
        $(ctrCurrentPanel).animate({ opacity: 1, height: vSlideObj.height, top: vSlideObj.top, width: vSlideObj.width, left: vSlideObj.left, fontSize: vSlideObj.fontsize }, (300), function() {
            // Animation complete.
        });
    }
};


function autoSlide() {
    //alert(vCurrentDsiplaySlide);
    vCurrentDsiplaySlide -= 1;
    setContinuesNumber(vTotalSlides, VPadding);
    doSlide();
}