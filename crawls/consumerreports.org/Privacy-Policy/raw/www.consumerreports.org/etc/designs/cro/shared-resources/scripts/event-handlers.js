// todo: this belongs in DOM.js, I think
function addEventHandler(inNode, inType, inFunction)
{
    if (inNode.addEventListener)
	{
        inNode.addEventListener(inType, inFunction, false);
    }
	else if (inNode.attachEvent)
	{
        inNode.attachEvent("on" + inType, inFunction);
    }
	else
	{
        inNode["on" + inType] = inFunction;
    }
}
