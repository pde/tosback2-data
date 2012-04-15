/***************************************************************************
[Custom_LaunchAgent.js]
 
Copyright (C) 2009 Next IT Corporation, Inc. Spokane, WA. All Rights Reserved. 
This document is confidential work and intellectual property of Next IT 
Corporation. Permission to copy, distribute or use any portion of this file 
is prohibited without the express written consent of Next IT Corporation.

Version: 1.0
Notes:
This will be included on Continentals's website to launch agent with proper size and location
Created 5/5/2009 Kate.Beck

*****************************************************************************/

//This is the core version, included all here so Continental wouldn't have to reference 2 files for launch (since LaunchChildWindow is overridden)  
//Also added agent window name and slimmed down launch functions for client that include appropriate parameters.
function LaunchInternalAgent(agentLocation) 
{
    //Agent window width/height and parent window width/height must match popupsettings control in agent.aspx
    var options = 'scrollbars=no,menubar=no,resizable=yes,location=no,status=yes,titlebar=no,toolbar=no';
    PopupScript.ApplyParentTop = true;
    PopupScript.LaunchChildWindow(agentLocation, 'internalAgent', 'right', 250, 675, 75, 0, true, null, null, options);
}

function LaunchExternalAgent(agentLocation) 
{   
    //Agent window width/height and parent window width/height must match popupsettings control in agent.aspx
    var options = 'scrollbars=no,menubar=no,resizable=yes,location=no,status=yes,titlebar=no,toolbar=no';
    PopupScript.ApplyParentTop = false;
    PopupScript.LaunchChildWindow(agentLocation, 'externalAgent', 'right', 250, 675, 20, 0, true, 1024, 768, options);
}

function LaunchExternalUnitedAgent(agentLocation)
{
    var qIndex = agentLocation.indexOf('Question');
    
    if ( qIndex == -1)
    {
        agentLocation = agentLocation + '#LaunchPointName=UnitedHub';
    }
    else
    {
        var Q = agentLocation.substr(qIndex);
        
        agentLocation = agentLocation.substring(0,qIndex-1);

        agentLocation = agentLocation + '#LaunchPointName=UnitedHub' + '&' + Q;
    }
    
    //Agent window width/height and parent window width/height must match popupsettings control in agent.aspx
    var options = 'scrollbars=no,menubar=no,resizable=yes,location=no,status=yes,titlebar=no,toolbar=no';
    PopupScript.ApplyParentTop = false;
    PopupScript.LaunchChildWindow(agentLocation, 'externalAgent', 'right', 250, 675, 20, 0, true, 1024, 768, options);
}

function LaunchInternalUnitedAgent(agentLocation)
{
    LaunchExternalUnitedAgent(agentLocation); //adding this just for mock, currently there isn't united super alex
}


var version = '6.2';
function PopupScript() { };
PopupScript.ApplyParentTop = false; // By default, parent top does not match popup window
PopupScript.PerfectWindowSize = false; // By default, we size by content only and allow window overlap

//JIRA:IMPCONT-121:Begin
var requestedUrl = '';
var agentWindowReference = null;
var checkWindowLoadedTimerId = null;
//JIRA:IMPCONT-121:End

//////////////////////////////////////
// JIRA:IMPCONT-121: string extension function endsWith
//////////////////////////////////////
String.prototype.endsWith = function(str)
{
    return (this.match(str + "$") == str) 
}

//////////////////////////////////////
// Overrode core popup script to include continental specific changes such as window name
// Opens popup window and sizes parent window accordingly
//////////////////////////////////////
PopupScript.LaunchChildWindow = function(url, agentWindowName, align, width, height, top, left, layoutParent, parentWidth, parentHeight, options)
{
    align = (!align || align.toLowerCase() != 'left') ? 'right' : 'left'; // Default to right if not 'left'
    width = (width) ? width : 250; // Default width: 250px
    height = (height) ? height : '100%'; // Default height: 100%
    top = (top) ? top : 0; // Default top: 0px
    left = (left) ? left : 0; // Default left: 0px
    layoutParent = (layoutParent) ? true : false;
    parentWidth = (parentWidth) ? parentWidth : '100%'; // Default height: 100%
    parentHeight = (parentHeight) ? parentHeight : '100%'; // Default height: 100%
    options = (options) ? options : 'scrollbars=no,menubar=no,resizable=no,location=no,status=yes,titlebar=no,toolbar=no';

    // Make sure they're numeric (Convert from percentages
    width = PopupScript.WidthToScreen(width);
    height = PopupScript.HeightToScreen(height, top);
    top = PopupScript.WidthToScreen(top);
    left = PopupScript.HeightToScreen(left, top);
    parentWidth = PopupScript.WidthToScreen(parentWidth);
    parentHeight = PopupScript.HeightToScreen(parentHeight, top);

    var parentLeft = (align == 'left') ? width : 0;

    // Parent width not specified or not enough space for parent window and need to shrink to fit
    if (parentWidth <= 0 || parentWidth + width > screen.availWidth)
    {
        parentWidth = screen.availWidth - width; // Must also make parent window fit
    }

    // Parent height not specified or taller than can fit
    if (parentHeight <= 0 || parentHeight + top > screen.availHeight)
    {
        parentHeight = screen.availHeight - top; // Must also make parent window fit
    }

    // Agent height is taller than can fit
    if (height + top > screen.availHeight)
    {
        height = screen.availHeight - top; // Must also make agent window fit
    }

    if (align == 'right') // Detect "left" and ignore setting
    {
        left = parentWidth;
    }

    var allOptions = 'width=' + width + 'px,height=' + height + 'px,left=' + left + ',top=' + top + ',' + options;

    var win = window.open('', agentWindowName, allOptions);

    if (win) 
    {
        var isNew = false;

        try 
        {
            url = url.replace('.aspx?', '.aspx?#');
            win.location.href = url;
            
            //Get the URL without hash string
            var urlWithoutHashString = GetAgentUrl(url);
            isNew = (win.location.href.indexOf(urlWithoutHashString) < 0);
        }
        catch (e) { }

        if (isNew) 
        {
            try
            {
                // The popup size is for content only, we need to resize to get the size perfect
                win.resizeTo(width, height);
                win.moveTo(left, top);

                if (layoutParent)
                    NIT.Launch.repositionWindow(self, parentWidth, parentHeight, 0, parentLeft);
            }
            catch (e) { }
        }
        
        win.focus(); //JIRA:AGNT-1017
    }

    return win; // Return window reference in case we need to use it
};

//////////////////////////////////////
// Positions a window according to width/height, top/left (used by LaunchChildWindow)
//////////////////////////////////////
PopupScript.PositionWindow = function(win, width, height, top, left) 
{
    try 
    {
        win.moveTo(0, 0); // This helps it work better when it's maximized... (IE seems to get confused sometimes)
        win.resizeTo(width, height);
        win.moveTo(left, top);
    }
    catch (e) // Permission denied? Happens if we change out of our domain, we should make sure it doesn't happen in any other situation, or comment out throw below
	{
        // if not permission denied, throw the error
	    if (GetErrorMessage(e).indexOf('denied') == -1) 
        {
            throw e;
        }
    }
};

//////////////////////////////////////
// Converts percentages to pixels to match screen width (ie. 50% -> 600)
//////////////////////////////////////
PopupScript.WidthToScreen = function(w) 
{
    if (!IsNumeric(w) && w.indexOf('%') > -1) {
        w = w.substring(0, w.indexOf('%'));
        w = screen.availWidth * w / 100;
    }
    return parseInt(w);
};
//////////////////////////////////////
// Converts percentages to pixels to match screen height (ie. 50% -> 600)
//////////////////////////////////////
PopupScript.HeightToScreen = function(h, top) {
    if (!IsNumeric(h) && h.indexOf('%') > -1) {
        h = h.substring(0, h.indexOf('%'));
        h = (screen.availHeight * h / 100) - top;
    }
    return parseInt(h);
};

//////////////////////////////////////
// General functions
//////////////////////////////////////
function IsNumeric(o)
{
    return (typeof o == 'number' && isFinite(o)); 
};
function IsWindowClosed(win) 
{
    var closed = false;
    try // getting around permission problem on closed windows
	{
        closed = (win == null || win.closed || typeof (win.self) == 'undefined'); // Added checking win.self for Safari and browsers that don't support window.closed properly
    }
    catch (e) { closed = true; }
    return closed;
};

//////////////////////////////////////
// JIRA:IMPCONT-121: Check if contact us page question is found in the URL
//////////////////////////////////////
function CheckForContactUsPageQuestion(url) 
{
    var questionFound = false;
    var questionLocation = url.indexOf('?Question=');

    //if query string found
    if (questionLocation > -1) 
    {
        var questionToAsk = url.substring(questionLocation + 10);

        //if question found
        if (questionToAsk != '') 
        {
            questionFound = true;
        }
    }
    return questionFound;
}

//////////////////////////////////////
// JIRA:IMPCONT-121: Ask the question found from contact us page 
//////////////////////////////////////
function AskContactUsPageQuestion() 
{
    var questionLocation = requestedUrl.indexOf('?Question=');

    //if query string found
    if (questionLocation > -1) 
    {
        var questionToAsk = requestedUrl.substring(questionLocation + 10);
        
        //if question found
        if (questionToAsk != '')
        {
            //firefox requires unescape
            questionToAsk = unescape(questionToAsk);
            
            //call the function on agent window to ask the question
            agentWindowReference.SetAndAskContactUsPageQuestion(questionToAsk);
            
            //Set the flag
            questionFound = true;
        }
    }
}

//////////////////////////////////////
// JIRA:IMPCONT-121: Get only agent url from url with query string. (essentially just remove the query string part)
//////////////////////////////////////
function GetAgentUrl(url) 
{
    var agentUrl;
    var questionLocation = url.indexOf('#');

    //if query string found
    if (questionLocation > -1) 
    {
        agentUrl = url.substring(0, questionLocation);
    }
    else 
    {
        agentUrl = url;
    }
    return agentUrl;
}

//////////////////////////////////////
// JIRA:IMPCONT-121: Check if the agent window is loaded, if loaded, clear timer and ask the question directly
//////////////////////////////////////
function CheckIfAgentWindowLoaded() 
{
    try 
    {
        if (agentWindowReference.CheckAgentLastResponse != undefined) 
        {
            var isLoaded = agentWindowReference.CheckAgentLastResponse();

            if (isLoaded) //if loaded
            {
                //Clear timer interval
                clearInterval(checkWindowLoadedTimerId);
                
                //Ask the question now
                AskContactUsPageQuestion();        
            }
        }
    }
    catch (ex) {}
}