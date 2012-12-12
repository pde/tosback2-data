/*
	Author:		Robert Hashemian (http://www.hashemian.com/)
	Modified by:	Munsifali Rashid (http://www.munit.co.uk/)
	Modified by:	rmariano@drugstore.com
*/
function countdown(obj,msg)
{
	this.obj			= obj;
	this.CountActive	= true;
	this.DisplayStr;
	this.Calcage		= cd_Calcage;
	this.CountBack		= cd_CountBack;
	this.Setup			= cd_Setup;
	this.DefaultMsg		= msg;
}
function cd_Calcage(secs, num1, num2)
{
  return ((Math.floor(secs/num1))%num2).toString();
}
function cd_CountBack(secs)
{
	if (secs > 0){
		var myDays = this.Calcage(secs,86400,100000);
		var szDays = (myDays == 1) ? myDays + " day" : myDays + " days"

		var myHours = this.Calcage(secs,3600,24);
		var szHours = (myHours == 1) ? myHours + " hour" : myHours + " hours"

		var myMins = this.Calcage(secs,60,60);
		var szMins = (myMins == 1) ? myMins + " minute" : myMins + " minutes"

		var mySeconds = this.Calcage(secs,1,60);
		var szSeconds = (mySeconds == 1) ? mySeconds + " second" : mySeconds + " seconds"

		this.DisplayStr = this.DisplayFormat.replace(/%%D%%/g, szDays);
		this.DisplayStr = this.DisplayStr.replace(/%%H%%/g, szHours);
		this.DisplayStr = this.DisplayStr.replace(/%%M%%/g, szMins);
		this.DisplayStr = this.DisplayStr.replace(/%%S%%/g, szSeconds);
		document.getElementById(this.Span).innerHTML = this.DisplayStr;
	} else {
		document.getElementById(this.Span).innerHTML = this.DefaultMsg;
		this.CountActive	= false;
	}
	if (this.CountActive) setTimeout(this.obj +".CountBack(" + (secs-1) + ")", 990);
}
function cd_Setup()
{
	var dthen	= new Date(this.TargetDate);
  	var dnow	= new Date();

  	//rmariano: convert customer's time to pacific standard time
  	var pstnow	= dnow.getTime() + (dnow.getTimezoneOffset() * 60000);
  	var pstdate	= new Date(pstnow + (3600000*-8));

	ddiff	= new Date(dthen-pstdate);
	gsecs	= Math.floor(ddiff.valueOf()/1000);
	this.CountBack(gsecs);
}

