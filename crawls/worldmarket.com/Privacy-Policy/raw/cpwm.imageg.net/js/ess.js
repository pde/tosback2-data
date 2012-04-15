// JavaScript Document
if(ess) {
}else{
	var ess={};
}

ess.showCustomPopUp = function(thisUrl,thisName,theseParams)
{
	remote = open(thisUrl, thisName, theseParams);
}


ess.distributeNavigation = function(element, groups, childTag, options){
	var tag = element.tagName
	var console = Df.console
	var nodes = element.childElements()
	if(options && options.minimumChildren && nodes.length < options.minimumChildren){
		var elementChild = element.e(childTag, 'bottom', {className:'closeOut', innerHTML:'<br clear="all"/>'});
	} else {
		nodes = $A(nodes).distributeEvenly(groups)
		nodes.each(function(v,index){
			var node = new Element(tag);
			if(index==0) {
				var elementChild = new Element(childTag,{'class':'first'});
			} else {
				var elementChild = new Element(childTag);
			}
			v.each(function(vv){
				if(vv.hasClassName('closeOut')){
					vv.remove()
				}else{
					node.insert(vv)
				}
			})
			elementChild.insert(node);
			element.insert(elementChild);
		})
		var elementChild = element.e(childTag, 'bottom', {className:'closeOut', innerHTML:'<br clear="all"/>'});
	}

	return element
}

document.observe('dom:loaded', function(e){
	if($('nav1')){
	    $('nav1').childElements().each(function(v){
		    if(v.down('ul')){
			  ess.distributeNavigation(v.down('ul'), 3, 'li', {minimumChildren: 1});
		    }
	    })
	}
})