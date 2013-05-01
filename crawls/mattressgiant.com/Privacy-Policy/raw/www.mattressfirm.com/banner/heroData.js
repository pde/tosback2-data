//don't change here
var startDate = "01/01/2010 00:00 ";
var endDate = "01/01/2020 00:00 ";

//minal length 2: "01/01/2010 00:00 ","01/01/2020 00:00 "
//add one more day for public
var dateTimeList = new Array(startDate, endDate);

var heroImgList = new Array("Banner/home/01_WK13_Special_399.gif;Banner/home/03_Tempur_3Years.png");
var heroLinkList = new Array("Hampton-and-Rhodes-11-Luxury-Pillow-Top-P265.aspx?ref=Home&tag=01_WK13_Special_399;Tempur-Pedic-0-C20.aspx?ref=Home&tag=03_Tempur_3Years");

//specify images
//current data if no chnage needed
var slideimages;
//specify corresponding links
var slidelinks;

var curDate = new Date();
var len = dateTimeList.length;

//document.write("<br>len=" + len);

for (m = 0; m < len; m++) {
    if (len == 2) {
        //document.write("<br><br>if2   m=" + m);
        slideimages = heroImgList[0].split(";");
        slidelinks = heroLinkList[0].split(";");
        break;
    } 
    else if (m < len - 1) {
        if (curDate.valueOf() > Date.parse(dateTimeList[m]) && curDate.valueOf() < Date.parse(dateTimeList[m + 1])) {
            // document.write("<br><br>else if2   m=" + m);

            // document.write("<br>image<br> " + heroImgList[m] + "<br>" + heroLinkList[m]); 
            slideimages = heroImgList[m].split(";");
            slidelinks = heroLinkList[m].split(";");

            break;
        }
    }

}

/*
//for testing
var temp = "<br>image<br> " + slideimages[0] + "<br>" + slideimages[1]
document.write(temp);

temp = "<br>url<br> " + slidelinks[0] + "<br>" + slidelinks[1]
document.write(temp);
*/
//specify interval between slide (in mili seconds)
var slidespeed = 6000;
