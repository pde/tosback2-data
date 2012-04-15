// <![CDATA[
var MyTextBoxResizer= Class.create({
	initialize: function(srcId, trgId) {
		this.src = $(srcId);
		this.trg = $(trgId);
		if(!Prototype.Browser.IE) { this.trg = this.trg.childNodes[1]; } else { this.trg =  this.trg = this.trg.childNodes[0];}
		this.srcHeight = this.src.offsetHeight;
		this.trgHeight = this.trg.offsetHeight;
		this.resize();
	},
	resize: function (){
		if(this.srcHeight > this.trgHeight) {
			this.trg.style.height = this.srcHeight + 'px';
		}
	}
});
// ]]>