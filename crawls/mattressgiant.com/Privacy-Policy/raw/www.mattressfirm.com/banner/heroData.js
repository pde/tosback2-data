//don't change here
var startDate = "01/01/2010 00:00 ";
var endDate = "01/01/2020 00:00 ";

//minal length 2: "01/01/2010 00:00 ","01/01/2020 00:00 "
//add one more day for public
var dateTimeList = new Array(startDate, endDate);

var heroImgList = new Array("Banner/home/01_SertaAVally_599.gif;Banner/home/03_Tempur_4Years.gif");
var heroLinkList = new Array("Serta-Apple-Valley-8-Memory-Foam-Mid-Firm-P253.aspx?ref=Home&tag=01_SertaAVally_599;Tempur-Pedic-0-C20.aspx?ref=Home&tag=03_Tempur_4Years");

//specify images
//current data if no chnage needed
var slideimages;

//specify corresponding links
var slidelinks;

var curDate = new Date();
var len = dateTimeList.length;

for (m = 0; m < len; m++) {
    if (len == 2) {
        slideimages = heroImgList[0].split(";");
        slidelinks = heroLinkList[0].split(";");
        break;
    } 
    else if (m < len - 1) {
        if (curDate.valueOf() > Date.parse(dateTimeList[m]) && curDate.valueOf() < Date.parse(dateTimeList[m + 1])) {
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
