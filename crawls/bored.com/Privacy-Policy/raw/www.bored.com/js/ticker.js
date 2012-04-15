/************** ticker counter **************/
$(".counter-number").each( function(i) {
	$(this).attr('id','num'+i);
});

function loadinput() {
	var newval = $("#numgo").val();
	loadticker(newval);
}

function loadticker(ticnum) {
	var fticnum = add_commas(ticnum);
	var numheight=20;
	addticker(fticnum);
	if (ticnum && ticnum != 0) {
		
		var s = String(fticnum);
		
		for (i=s.length;i>=0; i--)
		{
			var onum=s.charAt(i);			
			$("#num"+i).attr('value',onum);
		}
		
		$(".counter-number").each( function() {
			var nval=$(this).attr("value");
			if (!isNaN(nval)) {
				var nheight = Number(nval)*numheight*-1;
				$(this).animate({ top: nheight+'px'}, 1500 );
			} 
			if (nval==','){
				$(this).animate({ top: '-200px'}, 1500 );
			}
		});
	}
}

function addticker(newnum) {
	var digitcnt = $(".counter-number").size();
	var nnum = String(newnum).length;
	var digitdiff = Number(nnum - Number(digitcnt));
	if (digitdiff <0) {
		var ltdig = (Number(nnum)-1);
		$(".counter-number:gt(" + ltdig + ")").remove();
	}
	
	for(i=1;i<=digitdiff;i++) {
		$(".counter-wrap").append('<div class="counter-number" id="num' + (Number(digitcnt+i-1)) + '">&nbsp;</div>');
	}
}

function add_commas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

/************** timer from target date **************/
TargetDate = "1/7/2012 12:00 AM";
CountActive = true;
CountStepper = 10;
LeadingZero = true;
DisplayFormat = "%%S%%";

function calcage(secs, num1, num2) {
  s = ((Math.floor(secs/num1))%num2).toString();
  if (LeadingZero && s.length < 2)
	s = "0" + s;
  return s;
}

function CountBack(secs) {
  if (secs < 0) {
	document.getElementById("cntdwn").innerHTML = FinishMessage;
	return;
  }
  DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(secs,86400,100000));
  DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(secs,3600,24));
  DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(secs,60,3456000000));
  DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(secs,1,207360000000));

  //document.getElementById("cntdwn").innerHTML = DisplayStr;
  loadticker(DisplayStr);
  if (CountActive)
	setTimeout("CountBack(" + (secs+CountStepper) + ")", SetTimeOutPeriod);
}

/*function putspan(backcolor, forecolor) {
 document.write("<span id='cntdwn'></span>");
}*/

if (typeof(TargetDate)=="undefined")
  TargetDate = "1/1/2012 12:00 AM";
if (typeof(DisplayFormat)=="undefined")
  DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
if (typeof(CountActive)=="undefined")
  CountActive = true;
if (typeof(CountStepper)!="number")
  CountStepper = -1;
if (typeof(LeadingZero)=="undefined")
  LeadingZero = true;


CountStepper = Math.ceil(CountStepper);
if (CountStepper == 0)
  CountActive = false;
var SetTimeOutPeriod = (Math.abs(CountStepper)-1)*1000 + 990;
//putspan();
var dthen = new Date(TargetDate);
var dnow = new Date();
if(CountStepper>0)
  ddiff = new Date(dnow-dthen);
else
  ddiff = new Date(dthen-dnow);
gsecs = Math.floor(ddiff.valueOf()/1000);
CountBack(gsecs);
