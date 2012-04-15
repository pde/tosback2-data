// This file contains any patches that need to be applied to the dojo codebase. 
// It should be included after the initial dojo.js file has been loaded, but before any
// custom code is loaded.constructor

// Fix for dojo.lfx.wipeIn growing by 2px every time it runs
// http://trac.dojotoolkit.org/ticket/2489

dojo.lfx.html.wipeIn = function(/*DOMNode[]*/ nodes, /*int?*/ duration, /*Function?*/ easing, /*Function?*/ callback){
	// summary: Returns an animation that will show and wipe in "nodes".
	// nodes: An array of DOMNodes or one DOMNode.
	// duration: Duration of the animation in milliseconds.
	// easing: An easing function.
	// callback: Function to run at the end of the animation.
	nodes = dojo.lfx.html._byId(nodes);
	var anims = [];

	dojo.lang.forEach(nodes, function(node){
		var oprop = {  };	// old properties of node (before we mucked w/them)
		
		// get node height, either it's natural height or it's height specified via style or class attributes
		// (for FF, the node has to be (temporarily) rendered to measure height)
		// TODO: should this offscreen code be part of dojo.html, so that getBorderBox() works on hidden nodes?
		var origTop, origLeft, origPosition;
		with(node.style){
			origTop=top; origLeft=left; origPosition=position;
			top="-9999px"; left="-9999px"; position="absolute";
			display="";
		}
		var height = dojo.html.getBorderBox(node).height;
		with(node.style){
			top=origTop; left=origLeft; position=origPosition;
			display="none";
		}

		var anim = dojo.lfx.propertyAnimation(node,
			{	"height": {
					start: 1, // 0 causes IE to display the whole panel
					end: function(){ return height; } 
				}
			}, 
			duration, 
			easing);
	
		anim.connect("beforeBegin", function(){
			oprop.overflow = node.style.overflow;
			oprop.height = node.style.height;
			with(node.style){
				overflow = "hidden";
				height = "1px"; // 0 causes IE to display the whole panel
			}
			dojo.html.show(node);
		});
		
		anim.connect("onEnd", function(){ 
			with(node.style){
				overflow = oprop.overflow;
				height = oprop.height;
			}
			if(callback){ callback(node, anim); }
		});
		anims.push(anim);
	});
	
	return dojo.lfx.combine(anims); // dojo.lfx.Combine
}
