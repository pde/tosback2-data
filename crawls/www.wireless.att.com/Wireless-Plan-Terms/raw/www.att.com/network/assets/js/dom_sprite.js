// 
function DOMSprite(width, height)
{
	this.width = width;
	this.height = height;
}

DOMSprite.prototype.init = function(){
	this.wrapper = this.createWrapper();
}

DOMSprite.prototype.createWrapper = function(){
	var wrapper = document.createElement("div");
	wrapper.style.width = this.width + "px";
	wrapper.style.height = this.height + "px";
	wrapper.style.position = "absolute";
	wrapper.style.top = 207 + "px";
	wrapper.style.left = 0 + "px";

	return wrapper;
}