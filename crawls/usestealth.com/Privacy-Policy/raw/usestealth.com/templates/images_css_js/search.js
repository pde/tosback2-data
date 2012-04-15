function $(id) {
    return document.getElementById(id)
}
function replaceClassName(el, oldClassName, newClassName) {
    if(oldClassName == newClassName)
        return false;
    var classNames = el.className.split(' ');
    var newClassNames = new Array();
    var hasOld = false;
    for(var i = 0; i < classNames.length; i++) {
        if(classNames[i] == oldClassName) {
            newClassNames.push(newClassName);
            hasOld = true;
        }
        else
            newClassNames.push(classNames[i]);
    }
    if(!hasOld)
        newClassNames.push(newClassName)
    el.className = newClassNames.join(' ');
}
function changeSearchTab(el) {
    var tabs = $('search-tabs').getElementsByTagName('a');
    for(var i = 0; i < tabs.length; i++) {
        if(tabs[i].id != el.id)
            replaceClassName(tabs[i], "on", "off");
    }
    replaceClassName(el, "off", "on");
    var method = el.id.replace(/^tab-/, "");
    $('style').value = method;

    
}

