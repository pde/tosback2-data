function Mask(Id) {
    this.Id = Id;
    this.MaskDivId = '__Mask';
    this.MaskDiv = null;
    this.OnShow = new Event();
    this.OnHide = new Event();
    this.ShowCounter = 0;
    return this;
}

Mask.ShowCounter = 0;

Mask.prototype.Show = function() {
    if (this.Id == '' || this.Id == undefined)
        return;
    if (this.MaskDiv == null) {
        var maskDiv = null;
        maskDiv = $$(this.MaskDivId);
        if (maskDiv == null || maskDiv == undefined) {
            maskDiv = document.createElement('div');
            maskDiv.id = '__Mask';
            maskDiv.className = "Mask";
            document.body.appendChild(maskDiv);
        }
        this.MaskDiv = maskDiv;
    }
    this.MaskDiv.style.display = "block";
    Mask.Resize(this);
    var maskObj = this;

    addEvent(window, "resize", function() { Mask.Resize(maskObj) });

    Mask.ShowCounter++;
    this.OnShow.Execute();
}

Mask.Resize = function(MaskObject) {
    if (MaskObject.MaskDiv != null && MaskObject.MaskDiv != undefined && MaskObject.MaskDiv.style.display == "block") {
        var dim = MaskObject.GetMaskDimention();
        MaskObject.MaskDiv.style.width = dim[0] + "px";
        MaskObject.MaskDiv.style.height = dim[1] + "px";
    }
}
Mask.prototype.GetMaskDimention = function() {
    var docEleWidth = 0;
    var docEleHeight = 0;
    var width = 0;
    var height = 0;
    var bodyWidth = 0;
    var bodyHeight = 0;
    var scrollHeight = 0;
    if (document.documentElement.clientWidth || document.documentElement.clientHeight) {
        docEleWidth = document.documentElement.clientWidth;
        docEleHeight = document.documentElement.clientHeight;
    }
    this.MaskDiv.style.width = docEleWidth + "px";

    if (document.body.clientWidth || document.body.clientHeight) {
        bodyWidth = document.body.clientWidth;
        bodyHeight = document.body.clientHeight;
    }
    width = docEleWidth > bodyWidth ? docEleWidth : bodyWidth;
    height = docEleHeight > bodyHeight ? docEleHeight : bodyHeight;

    scrollHeight = document.documentElement.scrollHeight;
    scrollWidth = document.documentElement.scrollWidth;

    if (scrollHeight > height)
        height = height + (scrollHeight - height);

    if (scrollWidth > width)
        width = width + (scrollWidth - width);

    return [width, height];
}

Mask.prototype.Hide = function() {
    if (this.Id == '' || this.Id == undefined)
        return;
    Mask.ShowCounter--;
    if (Mask.ShowCounter <= 0 && this.MaskDiv != undefined) {
        this.MaskDiv.style.display = "none";
        Mask.ShowCounter = 0;
    }
    this.OnHide.Execute();
}

/*
Mask.prototype.OnShow = function() {
this.Show.Execute();
}

Mask.prototype.OnHide = function() {
this.Hide.Execute();
}
*/

