
function Banner(refreshTime, width, height, altText, start, random){
	this.objName = "bannerAd" + (Banner.count++);
	eval(this.objName + "=this");
	if (!refreshTime) this.refreshTime = 5000; else this.refreshTime = refreshTime*1000;
	if (!width) this.width = 460; else this.width = width;
	if (!height) this.height = 68; else this.height = height;
	if (random == null) this.random = 1; else this.random = random;
	this.altText = altText;
	this.title = altText;
	this.ads = [];
	if (start) this.currentAd = start-1; else start = null;
	this.mySize = 0;

	this.Ad = function(src, href, target, mouseover) {
		var tempImage = new Image();
		tempImage.src = src;
		this.ads[this.mySize] = new Object();
		var ad = this.ads[this.mySize];
		ad.src = src;
		if (typeof(target) == "undefined" || target == null) ad.target = "_self"; else ad.target = target;
		ad.href = href;
		ad.altText = mouseover;
		ad.title = mouseover;
		ad.mouseover = mouseover;
		this.mySize++;
	}

	this.link = function(){
		var	ad = this.ads[this.currentAd];
		if (ad.target == "_self"){
			location.href = ad.href;
		}
		else if (ad.target == "_blank" || ad.target == "_new"){
			open(ad.href,this.objName + "Win");
		}
		else top.frames[ad.target].location.href = ad.href;
	}


	this.showStatus = function(){
		var ad = this.ads[this.currentAd];
		if (ad.mouseover) status = ad.mouseover;
		else status = ad.href;
	}

	this.randomAd = function(){
		var n;
		do { n = Math.floor(Math.random() * (this.mySize)); } 
		while(n == this.currentAd);
		this.currentAd = n;
	}

	this.output = function(){
		var tempCode = "";
		if (this.mySize > 1){
			if (this.currentAd == null) this.randomAd();
			if (this.currentAd >= this.mySize) this.currentAd = this.mySize - 1;
			tempCode = '<a href="javascript:'+this.objName+'.link();"';
			tempCode += ' onMouseOver="' + this.objName + '.showStatus(); return true"';
			tempCode += ' onMouseOut="status=\'\';return true">';
			tempCode += '<img src="' + this.ads[this.currentAd].src + '" width="' + this.width;
			tempCode += '" name="' + this.objName + 'Img" height="' + this.height + '" ';
			tempCode += ' alt="' + this.ads[this.currentAd].mouseover + '" title="' + this.ads[this.currentAd].mouseover + '" ';
			tempCode += 'border="0" /></a>';
			document.write(tempCode);
			this.nextAd();
		} else document.write("Error: two banners must be defined for the script to work.");
	}

	this.newAd = function(){
		if (!this.random){	
			this.currentAd++;
			if (this.currentAd >= this.mySize)
			   this.currentAd = 0;
		}
		else {
			this.randomAd();
		}
		this.nextAd();
	}

	this.nextAd = function(){
		document.images[this.objName+ 'Img'].src = this.ads[this.currentAd].src;
		document.images[this.objName+ 'Img'].title = this.ads[this.currentAd].mouseover;
		setTimeout(this.objName+'.newAd()',this.refreshTime)
	}
}
Banner.count = 0;