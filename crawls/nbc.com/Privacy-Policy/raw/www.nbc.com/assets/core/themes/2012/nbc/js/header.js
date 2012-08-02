var randDARTNumber, SITE = {
    id: "69",
    absoluteUrl: "/"
};

function genSetRandDARTNumber() {
    randDARTNumber = Math.round(Math.random() * 1000000000000);
}

genSetRandDARTNumber();

function isDst() {
    var today = new Date(),
        yr = today.getFullYear(),
        dst_start = new Date("March 14, " + yr + " 02:00:00"),
        // 2nd Sunday in March can't occur after the 14th
        dst_end = new Date("November 07, " + yr + " 02:00:00"),
        // 1st Sunday in November can't occur after the 7th
        day = dst_start.getDay(); // day of week of 14th
    dst_start.setDate(14 - day); // Calculate 2nd Sunday in March of this year
    day = dst_end.getDay(); // day of the week of 7th
    dst_end.setDate(7 - day); // Calculate first Sunday in November of this year
    if (today >= dst_start && today < dst_end) { //does today fall inside of DST period?
        return true; //if so then return true
    } else {
        return false; //if not then return false
    }
}

function getCurrentUserTime() {
    var d = new Date(),
        gmtOffset = -d.getTimezoneOffset() / 60,
        isDST = isDst(),
        currentAdjustedTime = (d.getTime() - d.getMilliseconds()) / 1000;
        
    if (isDST) {
        gmtOffset--;
    }
    
    //nbcu.log("OFFSET: " + gmtOffset);
    // If time offset is GMT -5 through -10 (USA)
    if (gmtOffset >= -8 && gmtOffset <= -5) {
        //  nbcu.log('Is within the DST area');
        // Minus one hour from cst
        if (gmtOffset === -6 || gmtOffset === -7) {
            currentAdjustedTime += 3600;
            //  nbcu.log('Is central time');
        }
        // Add an hour for DST 
        if (isDST === true) { 
            currentAdjustedTime += (gmtOffset + 7) * 3600;
        }

        currentAdjustedTime += (gmtOffset + 8) * 3600;
    }

    //nbcu.log('currentAdjustedTime (Cleaned): ' + currentAdjustedTime);
    return currentAdjustedTime;
}

function getCurrentPacificTime() {
    var d = new Date(),
        gmtOffset = -8,
        currentAdjustedTime = (d.getTime() - d.getMilliseconds()) / 1000;

    currentAdjustedTime += (gmtOffset + 8) * 3600;

    return currentAdjustedTime;
}

function renderBreakingNewsBar(platforms) {
    var output = "",
    userDevice,
    totalRecords = platforms.length;

    if (navigator.userAgent.match(/iPad/i) !== null) {
        userDevice = "ipad";
    } else {
        userDevice = "web";
    }

    for (i = 0; i < totalRecords; i++) {
        if (platforms[i].platform == "web" || platforms[i].platform == userDevice) {
            headline = platforms[i].headline;
            href = platforms[i].link.href;
            target = platforms[i].link.target;
        }
    }

    output += '<div id="breaking-news-bar" class="breaking-news-bar"><div class="content"><div class="container">';
    output += '<a href="' + href + '" class="headline" target="' + target + '">' + headline + '</a>';
    output += '<a href="#" class="bnb-close" onclick="document.getElementById(\'breaking-news-bar\').style.display=\'none\';">Close</a>';
    output += '</div></div></div>';

    document.write(output);

    var onLoad = function(e) {
        // Close button
        NBC('header.global a.bnb-close').bind('click', function () {
            NBC('header.global .breaking-news-bar').slideUp(1000);
            NBC.cookie('breaking-news-bar', item.startTime);
            NBC.cookie('breaking-news-bar', item.startTime, { expires: 7, path: '/', domain: 'nbc.com' });
        });
    };
    
    if (window.addEventListener) {
        window.addEventListener("load", onLoad, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", onLoad);
    }
}

function initBreakingNews() {
     var currentUserTime = getCurrentUserTime(),
        currentPacificTime = getCurrentPacificTime(),
        timeToCheck,
        data = breakingNews.items,
        totalRecords = breakingNews.items.length,
        startTime = 0,
        endTime = 0,
        breakingNewsBarCookie = getCookie("breaking-news-bar") || 0,
        i;

    var d = new Date(),
        gmtOffset = -d.getTimezoneOffset() / 60;

    if (isDst()) {
        gmtOffset--;
    }

    // Show to continental USA only
    if (gmtOffset < -8 || gmtOffset > -5) {
        return;
    }

    for (i = 0; i < totalRecords; i++) {
        startTime = data[i].startTime;
        endTime = data[i].endTime;
        timeType = data[i].timeType;

        //nbcu.log(epoch+'-'+startTime);
        // Check that the user has not closed their breaking news bar
        if (startTime > breakingNewsBarCookie) {

            if (timeType == "relative") {
                timeToCheck = currentUserTime;
            } else {
                timeToCheck = currentPacificTime;
            }

            if (timeToCheck >= startTime && timeToCheck <= endTime) {
                // nbcu.log('renderBreakingNews('+i+',' +startTime+')');
                renderBreakingNewsBar(data[i].platforms);
                break;
            }
        }
    }

    function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    }
}

// BC for old sites
function initNewsBar() {
     return false;
}