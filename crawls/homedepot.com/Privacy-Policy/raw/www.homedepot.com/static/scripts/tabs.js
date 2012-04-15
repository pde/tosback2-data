/*
	Overview:	TabNav is a JS object that controls one set of tabs
		and their respective content blocks
	Usage:	An instance of this object needs to be instantiated for each
		block of tabs on the page. The markup should be structured
		with the controller anchor and corresponding content div to
		be in the same relative position in it's respective parent.
		Ex) Second anchor tag controls the second content div tag.
		NOTE:
		* The content tabs must have a class name of tab-content
		* The control anchors must be the only anchors in the parent
		* The position of the anchor must be the same as the content
		* The H5 should have a classname called "alt-heading"
	Arguments:	Takes two string literal arguments. (controls, contents)
		controlsID: is the id of the parent block of the tab controls
		contentsID: is the id of the parent block of the content blocks
	Methods:	Object is self-initializing so the constructor is built in as init..
		init:	Content Blocks and alternate headings are hidden.
			Displays the first content block in the source.
			hideAltHeadings: Hides alt headings(h5.alt-heading)
			toggleControls: Switches active link/tab
				Calls the toggleContent method
			toggleContent: Switches active content block.
	Sample Use: var myTabs = new TabNav("myControlsID", "myContentsID");
*/

function TabNav(controlsID, contentsID){
	// Properties
	var t = this;
	t.controls = new Array();
	t.contents = new Array();
	t.active = 0;
	// Self-Initialization
	if((document.getElementById) && (document.getElementsByTagName)){
		// Tab Controls
		t.controlsParent = document.getElementById(controlsID);
		if(t.controlsParent){
			t.controls = t.controlsParent.getElementsByTagName('a');
			for(var i=0, control; i<t.controls.length; i++){
				control=t.controls[i];
				control.pos = i;
				_my_rel_ = 0 ;
				
				 if (contentsID == 'pip-tabs') {
					control.onclick = function(){ 
					if ( _my_rel_ != this.pos ){
					//	s.pageName=this.rel;var s_code=s.t();if(s_code)document.write(s_code)
						_my_rel_ = this.pos ;
					}
					t.activate(this.pos); this.blur(); return false;};
				} else {
					control.onclick = function(){t.activate(this.pos); this.blur(); return false;};
				}
				
				if(control.parentNode.nodeName == 'li'){control = control.parentNode;}
				if(control.className == 'active'){t.active = i;}
			}
		}else{return false;}
		// Content Blocks
		t.contentsParent = document.getElementById(contentsID);
		if(t.contentsParent){
			t.divs = t.contentsParent.getElementsByTagName('div');
			for(var j=0, div; j<t.divs.length; j++){
				div=t.divs[j];
				if(div.className == 'tab-content'){
					t.contents[(t.contents.length)] = div;
				}
			}
		}else{return false;}
	}else{return false;}
	// Methods
	t.toggleControls = function(){
		for(var i=0, control;i<t.controls.length; i++){
			control=t.controls[i];
			if(control.parentNode.nodeName.toLowerCase() == 'li'){control = control.parentNode;}
			control.className = 'inactive';
		}
		if(t.controls[t.active].parentNode.nodeName.toLowerCase() == 'li'){
			t.controls[t.active].parentNode.className = 'active';
		}else{
			t.controls[t.active].className = 'active';
		}
	};
	t.toggleBlocks = function(){
		for(var c=0, content; c<t.contents.length; c++){
			content=t.contents[c];
			content.className = 'tab-content-hidden';
		}
		activeBlock = t.contents[t.active];
		activeBlock.className = 'tab-content';
		
		//BEGIN INSERTION OF CODE for defect#7086
        /* We made pip-tabs scrollable so we need the focus to be at the top of the content when the user presses the tab */
        if (contentsID == 'pip-tabs')
        {
                activeBlock.scrollTop = 0;
        }       
		//END INSERTION OF CODE for defect#7086
		
	};
	t.showAllBlocks = function(){
		for(var c=0, content; c<t.contents.length; c++){
			content=t.contents[c];
			content.className = 'tab-content';}
	};
	t.hideAltHeadings = function(){
		altHeadings = t.contentsParent.getElementsByTagName('h5');
		if(altHeadings){
			for(var h=0, altHeading; h<altHeadings.length; h++){
				altHeading=altHeadings[h];
				if(altHeading.className == 'tab-alt-heading'){altHeading.className = 'tab-alt-heading-hidden';}
			}
		}
	};
	t.activate = function(pos){
		t.active = pos;
		t.toggleControls();
		t.toggleBlocks();
	};
	t.init = function(){
		t.toggleBlocks();
		t.hideAltHeadings();
	};
	// Initialize
	var constructor = t.init();
}
// Onload Init
onloadHandlers[onloadHandlers.length] = 'SideTabs = new TabNav("side-tabs", "side")';
onloadHandlers[onloadHandlers.length] = 'PipTabs = new TabNav("pip-tab-controls", "pip-tabs")';
onloadHandlers[onloadHandlers.length] = 'Tabs = new TabNav("tab-controls", "tabs")';
var _my_rel_ ;
