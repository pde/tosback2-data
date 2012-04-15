// <script>
var secs = new Array();
var timerID = new Array();
var timerRunning = new Array();
var delay = new Array();

function AdRotator(id) {
	this.timer = null;
	this.links = new Array(10);
	this.images = new Array(10);
	this.times = new Array(10);
	this.image = MM_findObj(id);
	this.index = -1;
	this.length = -1;
	this.id = id;
}

AdRotator.prototype.Add = function(image, time, link) {
	this.length++;
	this.links[this.length] = link;
	this.images[this.length] = image;
	this.times[this.length] = time;	
}

AdRotator.prototype.Click = function() {
	document.location.href = this.links[this.index];
}

AdRotator.prototype.Next = function() {
	if (this.length == -1) {
		return;
	}
	if (this.timer) window.clearTimeout(this.timer);
	this.index++;
	if (this.index > this.length) this.index = 0;
	this.image.src = this.images[this.index];
	if (this.length > 0) {
		var nextRef = NextRef(this);
		this.timer = window.setTimeout(nextRef, this.times[this.index]);
	}
}

function NextRef(obj) {
	return function() {
		obj.Next();
	}
}

function InitializeHideShowControl(iControlNum)
{
	secs[iControlNum] = "1";
	timerID[iControlNum] = null;
	timerRunning[iControlNum] = false;
	delay[iControlNum] = 300;
}

function StopTimer(iControlNum)
{
	secs[iControlNum] = 1;
	if(timerRunning[iControlNum]){
		clearTimeout(timerID[iControlNum]);
	}
	timerRunning[iControlNum] = false;
}

function StartTimer(controlName, iControlNum)
{
	if (secs[iControlNum]==0)
	{
		StopTimer(iControlNum);
		try
		{
			var divPanel = document.getElementById(controlName);
			divPanel.style.visibility = 'hidden';
		}
		catch(exception)
		{
		}
	}
	else
	{
		secs[iControlNum] = secs[iControlNum] - 1;
		timerRunning[iControlNum] = true;
		timerID[iControlNum] = self.setTimeout("StartTimer('" + controlName + "','" + iControlNum + "')", delay[iControlNum]);
	}
}

function ShowControl(controlName, iControlNum, InitControlName, Position)
{

	StopTimer(iControlNum);
	InitializeHideShowControl(iControlNum);    
	var initcntrl = document.getElementById(InitControlName); 
	var cntrl = document.getElementById(controlName);

	if(initcntrl.style.top =="") initcntrl.style.top = "0px";
	if(initcntrl.style.left =="") initcntrl.style.left = "0px";
	if(initcntrl.style.width =="") initcntrl.style.width = "0px";
	if(initcntrl.style.height =="") initcntrl.style.height = "0px";
	
	if(Position.toLowerCase()=="left"){
		cntrl.style.top = parseInt(initcntrl.style.top) - parseInt(initcntrl.style.height) - 3 + "px";	
		cntrl.style.left = parseInt(initcntrl.style.left) - parseInt(initcntrl.style.width) + "px";
	}else if(Position.toLowerCase()=="right"){	
		cntrl.style.top = parseInt(initcntrl.style.top) - parseInt(initcntrl.style.height) - 3 + "px";	
		cntrl.style.left = parseInt(initcntrl.style.left) + parseInt(initcntrl.style.width) + "px";
	}else if(Position.toLowerCase()=="bottom"){	
		cntrl.style.top = initcntrl.style.top;	
		cntrl.style.left = initcntrl.style.left;
	}else if(Position.toLowerCase()=="top"){	
		cntrl.style.top = parseInt(initcntrl.style.top) - (2* parseInt(initcntrl.style.height)) - 3 + "px";	
		cntrl.style.left = initcntrl.style.left;
	}

	
	cntrl.style.visibility = 'visible';
	
}