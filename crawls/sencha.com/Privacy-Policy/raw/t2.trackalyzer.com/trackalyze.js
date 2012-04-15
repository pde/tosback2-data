var i;
var llactid;
var myid;

myid = 1;
mypage = escape(location.href);
myref = escape(document.referrer);
myip = escape(location.hostaddress);

if (i!="undefined")
    {
	if (i>10000)
	{
        myid = i;
	}
    }

if  (llactid!="undefined")
    {
	if (llactid>10000)
	{
        myid = llactid;
	}
    }



if (myref=="")
    {
     myref="None";
    }
if (mypage=="")
    {
    mypage="Unavailable";
    }
var linkreefer = "http://t2.trackalyzer.com/trackalyze.asp?r=" + myref + "&p=" + mypage + "&i=" + myid;
document.write ("<img src='" + linkreefer + "'>");



function Trackalyzer (myid, page)
{
	var currentpage = (location.href);
	var mypage = escape(location.href);
	var myref = escape(document.referrer);
	var myip = escape(location.hostaddress);
	var forward = false;
if (page!=null)
	{
	mypage=page;
	forward=true;
	};
if (myref=="")
    {
     myref="None";
    };
if (mypage=="")
    {
    mypage="Unavailable";
    };
var linkreefer = "http://t2.trackalyzer.com/trackalyze.asp?i=" + myid + "&r=" + myref + "&p=" + mypage + "&f=" + forward;
document.write ("<img src='" + linkreefer + "'>");

if (forward==true)
	{
	if (myid = 16228)
		{
		window.location.href = (mypage);
		}
	else
		{
		window.location = (currentpage);
		window.open(mypage)
		}
	};
}