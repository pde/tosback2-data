 function $(Id) {
    if (Id == null)
        return null;
    return document.getElementById(Id);
}
function $$(Id) {
    if (Id == null)
        return null;
    return document.getElementById(Id);
}
function Event() {
    this.eventHandlers = new Array();
    return this;
}
Event.prototype.AddHandler = function(eventHandler) {
    var alreadyContains = false;
    for (var x = 0; x < this.eventHandlers.length; x++) {
        if (this.eventHandlers[x] == eventHandler) {
            alreadyContains = true;
        }
    }
    if (!alreadyContains)
        this.eventHandlers.push(eventHandler);
}
Event.prototype.Execute = function(args, args1, args2) {
    for (var i = 0; i < this.eventHandlers.length; i++) {
        this.eventHandlers[i](args, args1, args2);
    }
}
function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() { obj['e' + type + fn](window.event); }
        obj.attachEvent('on' + type, obj[type + fn]);
    } else
        obj.addEventListener(type, fn, false);
}
function removeEvent(obj, type, fn) {
    try {
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else
            obj.removeEventListener(type, fn, false);
    } catch (err) { }
}
GetWindowDimention = function() {
    var docEleWidth = 0;
    var docEleHeight = 0;
    if (document.documentElement.clientWidth || document.documentElement.clientHeight) {
        docEleWidth = document.documentElement.clientWidth;
        docEleHeight = document.documentElement.clientHeight;
    }
    return [docEleWidth, docEleHeight];
}
function getViewport() {
    var v = { width: 0, height: 0 };
    if (window.innerHeight) {
        v.height = window.innerHeight;
        v.width = window.innerWidth;
    } else if (document.documentElement.clientHeight) {
        v.height = document.documentElement.clientHeight;
        v.width = document.documentElement.clientWidth;
    } else {
        v.height = document.body.clientHeight;
        v.width = document.body.clientWidth;
    }
    return v;
}
function getElementDimensions(el, contentEl) {
    var dim = { width: 0, height: 0, contentWidth: 0, contentHeight: 0 };

    dim.width = RemovePX(el.style.width);
    dim.height = RemovePX(el.style.height);
    dim.contentWidth = RemovePX(contentEl.style.width);
    dim.contentHeight = RemovePX(contentEl.style.height);

    if (dim.width == 0) dim.width = el.offsetWidth;
    if (dim.height == 0) dim.height = el.offsetHeight;
    if (dim.contentWidth == 0) dim.contentWidth = contentEl.offsetWidth;
    if (dim.contentHeight == 0) dim.contentHeight = contentEl.offsetHeight;

    if (dim.width == 0 || dim.height == 0 || dim.contentHeight == 0 || dim.contentWidth == 0) {
        var origD = el.style.display;
        var origV = el.style.visibility;
        el.style.visibility = "hidden";
        el.style.display = "block";
        if (dim.width == 0)
            dim.width = el.offsetWidth;
        if (dim.height == 0)
            dim.height = el.offsetHeight;
        if (dim.contentWidth == 0)
            dim.contentWidth = contentEl.offsetWidth;
        if (dim.contentHeight == 0)
            dim.contentHeight = contentEl.offsetHeight;
        el.style.display = origD;
        el.style.visibility = origV;
    }

    return dim;
}
function RemovePX(s) {
    if (s.length == 0)
        return 0;
    if (s.indexOf("px"))
        return parseInt(s.replace("px", ""));
    else
        return s;
}
function getScrollPosition() {
    var pos = { x: 0, y: 0 };
    pos.x = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft;
    pos.y = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop;
    return pos;
}
function EmbedHtml(Html) {
    var body = document.body;
    var div = document.createElement('div');
    if (document.all) {
        body.appendChild(div);
        div.innerHTML = '&nbsp;' + Html;
    } else {
        div.innerHTML = '&nbsp;' + Html;
        body.appendChild(div);
    }
    if (navigator.userAgent.indexOf("Firefox") == -1) {
        var tags = div.getElementsByTagName('script');
        for (var i = 0; i < tags.length; i++) {
            var sc = document.createElement('script');
            sc.text = tags[i].data || tags[i].text;
            document.getElementsByTagName("head")[0].appendChild(sc);
        }
    }
}
function EmbedHtml(HtmlResponse) {
    if (HtmlResponse != null) {
        var body = document.body;
        var div = document.createElement('div');

        if (HtmlResponse.StyleSheets != null && HtmlResponse.StyleSheets.length > 0) {
            for (var i = 0; i < HtmlResponse.StyleSheets.length; i++) {
                LoadStyleSheet(HtmlResponse.StyleSheets[i]);
            }
        }
        if (HtmlResponse.HTML != null) {
            if (document.all) {
                body.appendChild(div);
                div.innerHTML = '&nbsp;' + HtmlResponse.HTML;
            } else {
                div.innerHTML = '&nbsp;' + HtmlResponse.HTML;
                body.appendChild(div);
            }
        }
        if (HtmlResponse.ScriptLibraries != null && HtmlResponse.ScriptLibraries.length > 0) {
            for (var i = 0; i < HtmlResponse.ScriptLibraries.length; i++) {
                LoadScriptLibrary(HtmlResponse.ScriptLibraries[i]);
            }
        }
        if (HtmlResponse.Scripts != null && HtmlResponse.Scripts.length > 0) {
            for (var i = 0; i < HtmlResponse.Scripts.length; i++) {
                LoadScriptBlock(HtmlResponse.Scripts[i]);
            }
        }
    }
}
function GetOverallBase(obj) {
    var x = obj;
    if (x != null)
        while (x.base != null)
        x = x.base;
    return x;
}
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };
function AllowOnlyNumericCharacters(e) {

    // If cntrl key(s)or backspace, tab, left right arrows, Home, End or Delete key pressed
    // Don't do anything
    if (true == SpecialKeysPressed(e))
        return true;
    // Ignore if Shift Key pressed.
    if (e.shiftKey == true)
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    // Allow numbers  only  
    else if ([e.keyCode || e.which] < 48 || [e.keyCode || e.which] > 57) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
}
// Tabs to the next phone field while entering
// the phone number
function TabNext(obj, event, len, next_field) {
    var phone_field_length = 0;
    if (event == "down") {
        phone_field_length = obj.value.length;
    }
    else if (event == "up") {
        if (obj.value.length != phone_field_length) {
            phone_field_length = obj.value.length;
            if (phone_field_length == len) {
                next_field.focus();
            }
        }
    }
}
function SpecialKeysPressed(e) {
    // This is to allow ctrl + a, ctrl + c, ctrl + v and ctrl + z keys (in fire fox)
    if ((e.ctrlKey) && ((e.which == 97) || (e.which == 99) || (e.which == 118) || (e.which == 122)))
        return true;

    // This is to allow backspace, tab, left right arrows, Home, End and Delete keys
    if (([e.keyCode || e.which] == 8) || ([e.keyCode || e.which] == 9)
                || ([e.keyCode || e.which] == 37) || ([e.keyCode || e.which] == 39)
                || ([e.keyCode || e.which] == 36) || ([e.keyCode || e.which] == 35)
                || ([e.keyCode || e.which] == 46))
        return true;
}

//Comcast.Framework.Web.UI.WebControls
function Button(Id, Title, Text, ImageUrl, Height, Width, ButtonElementId) {
    this.Id = Id;
    this.Title = Title;
    this.Text = Text;
    this.ImageUrl = ImageUrl;
    this.Height = Height;
    this.Width = Width;

    this.ButtonClick = new Event();
    this.ButtonElementId = ButtonElementId;
    this.ButtonElement = $(ButtonElementId);
    return this;
}

Button.prototype.OnClientClick = function() {
    this.ButtonClick.Execute(this);
}
function LoadScriptLibrary(js) {
    var s = document.createElement("script");
    s.src = js;
    s.setAttribute("type", "text/javascript");
    s.setAttribute("language", "javascript");
    document.body.appendChild(s);
}
function LoadScriptBlock(js) {
    var s = document.createElement("script");
    s.text = js;
    s.setAttribute("type", "text/javascript");
    s.setAttribute("language", "javascript");
    document.body.appendChild(s);
}
function LoadStyleSheet(css) {
    var headID = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = css;
    cssNode.media = 'screen';
    headID.appendChild(cssNode);
}
function TrackInteraction(InteractionTypeId, Value, ValueBit, ValueId, ValueInt, ValueDec) {
    var data = new InteractionData(InteractionTypeId, null, null, null, null, null);
    var track = new RemoteMethod('InteractionHelper', 'Track', data, false);
    track.Invoke();
}
function InteractionData(InteractionTypeId, Value, ValueBit, ValueId, ValueInt, ValueDec) {
    this.InteractionTypeId = InteractionTypeId;
    this.Value = (Value == null ? '' : Value);
    this.ValueBit = ValueBit;
    this.ValueId = ValueId;
    this.ValueInt = ValueInt;
    this.ValueDec = ValueDec;
}
String.prototype.replaceAll = function(
 strTarget, 
 strSubString 
 ) {
    var strText = this;
    var intIndexOfMatch = strText.indexOf(strTarget);
    while (intIndexOfMatch != -1) {
        strText = strText.replace(strTarget, strSubString)
        intIndexOfMatch = strText.indexOf(strTarget);
    }
    return (strText);
}
String.prototype.RemoveSpaces = function() {
    var s = this;
    s = s.replace(/(\n\r|\n|\r)/gm, "<1br />");
    s = s.replace(/\t/g, "");
    re1 = /\s+/g;
    s = s.replace(re1, " ");
    re2 = /\<1br \/>/gi;
    s = s.replace(re2, "\n");
    return s;
}

function AllowOnlyNumeric(e) {
    // If cntrl key(s)or backspace, tab, left right arrows, Home, End or Delete key pressed
    // Don't do anything
    if ([e.keyCode || e.which] == 46)
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    else if (([e.keyCode || e.which] == 8) || ([e.keyCode || e.which] == 9))
        return true;
    // Allow numbers  only 
    else if ([e.keyCode || e.which] < 48 || [e.keyCode || e.which] > 57) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
}

