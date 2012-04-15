// Function: S7ConfigObject()
// Purpose: Constructor for the S7ConfigObject class
// Param: None
// Output: A new instantiated S7ConfigObject instance
// Notes: No need to use this function explicitly
function S7ConfigObject()
{
	this.isVersion		= "2.8";
	// These root variables should be altered to reflect the server VIP you are on
	// For example, if you call sample.scene7.com/is/image, you should use that here
	this.isViewerRoot	= "http://s7d5.scene7.com/is-viewers-3.9";
	//this.isRoot		= "http://sample.scene7.com/is/image/";
    this.isRoot     = "http://s7d5.scene7.com/is/image/";
   //for dhtml path  - this was causing issues because we have no control over their scripts and alerts
    //this.isDhtmlRoot =  "http://s7d5.scene7.com/is-viewers-4.0/dhtml/";
}

var S7ConfigClient		= new S7ConfigObject();

function docWrite(line) {
    document.write(line);
}