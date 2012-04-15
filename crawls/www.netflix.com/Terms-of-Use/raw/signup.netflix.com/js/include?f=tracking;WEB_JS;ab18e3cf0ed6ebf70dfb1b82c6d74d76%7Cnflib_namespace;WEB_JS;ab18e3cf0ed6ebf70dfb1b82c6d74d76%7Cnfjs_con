
$.extend({
    beacon : function(value) {
        if (typeof value != "undefined" && value != "") {
            var img = new Image();
            img.src = "/beacons?v={value}&t={t}".replace("{value}", value).replace("{t}", +new Date());
            setTimeout(function(){img = null;}, 1e4);
        }
    }
});

$("body").delegate("A[data-b],BUTTON[data-b]", "click", function(event) {
    $.beacon($(this).data("b"));
});// JavascriptPackage will automatically prepend this to every
// script package so we don't have to check this at the beginning
// of every script file.
if (!window.netflix) { window.netflix = {}; }
window.netflix.namespace = function( ns )
{
    var pkg = window.netflix;
    var cPkg = null;
    var pkgs = ns.split('.');
    // Initial "netflix" is implied.
    if(pkgs[0] === 'netflix') { pkgs.shift(); }
    var len = pkgs.length;
    for ( var i = 0; i < len; ++i ) {
        cPkg = pkgs[i].toString();
        if ( !! cPkg ) {
            pkg = pkg[cPkg] = pkg[cPkg] || {};
        }
    }
    return pkg;
};
window.name='_nflx';
if (!window.netflix) { window.netflix = {}; }
netflix.constants = {};
netflix.constants.getProtocol = function() {
   return location.protocol == 'https:' ? "https://" : "http://";
}
netflix.constants.page = {
    bobInCloud:"true",
    bobServer: netflix.constants.getProtocol() + "movies.netflix.com",
    //bobServer:"http://bobservice.netflix.com",
    npm:true,
    ct: 3
};
netflix.constants.global = {};
netflix.constants.page["AUTOCOMPLETE"] = {
    autoCompleteUrl:"/JSON/AutoCompleteSearch",
    cloudUrl: "http://autocomplete.netflix.com/JSON/AutoCompleteSearch",
    loc: 3,
    edEnable:false
};