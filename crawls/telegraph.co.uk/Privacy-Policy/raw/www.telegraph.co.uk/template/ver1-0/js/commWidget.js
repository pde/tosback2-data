
/***********************************************
*         Commerical Puff Random Selector      *
*         
*         
* Updates:
* 
* 13/04/2011 S Gadhiraju	Changes made to open the ads in a new window	DIGI-42
* 19/04/2011 S Gadhiraju	Changes made to open the append3LayoutPuffs ads in a new window	DIGI-42
***********************************************/
// Randomly selects an advert from an array containing weighted elements

function selectRandomPuffIndex(puffs) {	
    var count = puffs.length;
    var puffIndex = 0;
    var accumulativeWeight = 0;
    
    var weightTotal = 0;
    for(var j=0; j<puffs.length; j++) {
    	weightTotal += parseInt(puffs[j].weight);
    } 

    var randomNum = Math.ceil(Math.random() * weightTotal);
    
    while(puffIndex < count) {
       accumulativeWeight += parseInt(puffs[puffIndex].weight);
       if(accumulativeWeight >= randomNum) {
         break;
       }
       puffIndex++;
    }

    return puffIndex;
}

/***********************************************
*         Commerical Puff Layout functions     *
***********************************************/

function append2LayoutPuffs(tabId, index, isOpenInNewWindow) { 
    var $tab = "div#configurableTab_" + tabId;
    var $puffs = eval("puffs_" + tabId);
    
    var openInNewWindowTarget = " target=\"_blank\"";
    
    if (!isOpenInNewWindow)
    {
    	openInNewWindowTarget = "";
    }
    
    $($tab + " > ul").append("<li class=\"doubleColumn" + lastClass + "\"><a href=\"" + $puffs[index].link + "\"" + openInNewWindowTarget + "\><img src=\"" + $puffs[index].imageUrl + "\" alt=\"" + $puffs[index].headline + "\" border=\"0\" width=\"130\" height=\"80\" /></a><div><a href=\"" + $puffs[index].link + "\" class=\"puff" + $puffs[index].id + "\"" + openInNewWindowTarget + ">" + $puffs[index].headline +"</a></div><p>" + $puffs[index].bodyText + "</p></li>");
    $("a.puff"+$puffs[index].id).data('puffId',$puffs[index].id);
}

function append3LayoutPuffs(tabId, index, isOpenInNewWindow) {
	
	var openInNewWindowTarget = " target=\"_blank\"";
	
	if (!isOpenInNewWindow)
    {
    	openInNewWindowTarget = "";
    }
	
    var $tab = "div#configurableTab_" + tabId;
    var $puffs = eval("puffs_" + tabId);
    $($tab + " > ul").append("<li><div><a href=\"" + $puffs[index].link + "\" class=\"puff" + $puffs[index].id + "\"" + openInNewWindowTarget +">"+ $puffs[index].headline +"</a></div><p>" + $puffs[index].bodyText + "</p></li>");
    $("a.puff"+$puffs[index].id).data('puffId',$puffs[index].id);
}

function rotateLayoutPuffs(tabId, index, isOpenInNewWindow) { 
    var $tab = "div#configurableTab_" + tabId;
    var $puffs = eval("puffs_" + tabId);
    
    var openInNewWindowTarget = " target=\"_blank\"";
    
    if (!isOpenInNewWindow)
    {
    	openInNewWindowTarget = "";
    }
    
    $($tab + " .configurableWidget").append("<li><a href=\"" + $puffs[index].link + "\"" + openInNewWindowTarget + "\ class=\"rotImgLink\"><img src=\"" + $puffs[index].imageUrl + "\" alt=\"" + $puffs[index].headline + "\" border=\"0\" width=\"280\" height=\"175\" /></a><div><a href=\"" + $puffs[index].link + "\" class=\"puff" + $puffs[index].id + "\"" + openInNewWindowTarget + ">" + $puffs[index].headline +"</a></div><p>" + $puffs[index].bodyText + "</p><div class=\"viewLink\"><a href=\"" + $puffs[index].link + "\"" + openInNewWindowTarget + "\>View</a></div></li>");
    $("a.puff"+$puffs[index].id).data('puffId',$puffs[index].id);
}

$(document).ready(function(){
	$("div.commPuffSearchForm > form > input.search").click(function() {		
		$(this).val("");	
	});
});