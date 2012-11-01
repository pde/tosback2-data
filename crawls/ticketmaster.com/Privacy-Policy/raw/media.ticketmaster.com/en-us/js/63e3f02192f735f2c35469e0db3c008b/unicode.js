<!--
// $Id: unicode.js,v 1.2 2006-09-25 22:15:46 pgollucci Exp $

var entArray = new Object();

entArray['&iexcl;'] = '\u00A1';
entArray['&cent;'] = '\u00A2';
entArray['&pound;'] = '\u00A3';
entArray['&curren;'] = '\u00A4';
entArray['&yen;'] = '\u00A5';
entArray['&brvbar;'] = '\u00A6';
entArray['&sect;'] = '\u00A7';
entArray['&uml;'] = '\u00A8';
entArray['&copy;'] = '\u00A9';
entArray['&ordf;'] = '\u00AA';
entArray['&laquo;'] = '\u00AB';
entArray['&not;'] = '\u00AC';
entArray['&shy;'] = '\u00AD';
entArray['&reg;'] = '\u00AE';
entArray['&macr;'] = '\u00AF';
entArray['&deg;'] = '\u00B0';
entArray['&plusmn;'] = '\u00B1';
entArray['&sup2;'] = '\u00B2';
entArray['&sup3;'] = '\u00B3';
entArray['&acute;'] = '\u00B4';
entArray['&micro;'] = '\u00B5';
entArray['&para;'] = '\u00B6';
entArray['&middot;'] = '\u00B7';
entArray['&cedil;'] = '\u00B8';
entArray['&sup1;'] = '\u00B9';
entArray['&ordm;'] = '\u00BA';
entArray['&raquo;'] = '\u00BB';
entArray['&frac14;'] = '\u00BC';
entArray['&frac12;'] = '\u00BD';
entArray['&frac34;'] = '\u00BE';
entArray['&iquest;'] = '\u00BF';
entArray['&agrave;'] = '\u00C0';
entArray['&aacute;'] = '\u00C1';
entArray['&acirc;'] = '\u00C2';
entArray['&atilde;'] = '\u00C3';
entArray['&auml;'] = '\u00C4';
entArray['&aring;'] = '\u00C5';
entArray['&aelig;'] = '\u00C6';
entArray['&ccedil;'] = '\u00C7';
entArray['&egrave;'] = '\u00C8';
entArray['&eacute;'] = '\u00C9';
entArray['&ecirc;'] = '\u00CA';
entArray['&euml;'] = '\u00CB';
entArray['&igrave;'] = '\u00CC';
entArray['&iacute;'] = '\u00CD';
entArray['&icirc;'] = '\u00CE';
entArray['&iuml;'] = '\u00CF';
entArray['&eth;'] = '\u00D0';
entArray['&ntilde;'] = '\u00D1';
entArray['&ograve;'] = '\u00D2';
entArray['&oacute;'] = '\u00D3';
entArray['&ocirc;'] = '\u00D4';
entArray['&otilde;'] = '\u00D5';
entArray['&ouml;'] = '\u00D6';
entArray['&times;'] = '\u00D7';
entArray['&oslash;'] = '\u00D8';
entArray['&ugrave;'] = '\u00D9';
entArray['&uacute;'] = '\u00DA';
entArray['&ucirc;'] = '\u00DB';
entArray['&uuml;'] = '\u00DC';
entArray['&yacute;'] = '\u00DD';
entArray['&thorn;'] = '\u00DE';
entArray['&szlig;'] = '\u00DF';
entArray['&agrave;'] = '\u00E0';
entArray['&aacute;'] = '\u00E1';
entArray['&acirc;'] = '\u00E2';
entArray['&atilde;'] = '\u00E3';
entArray['&auml;'] = '\u00E4';
entArray['&aring;'] = '\u00E5';
entArray['&aelig;'] = '\u00E6';
entArray['&ccedil;'] = '\u00E7';
entArray['&egrave;'] = '\u00E8';
entArray['&eacute;'] = '\u00E9';
entArray['&ecirc;'] = '\u00EA';
entArray['&euml;'] = '\u00EB';
entArray['&igrave;'] = '\u00EC';
entArray['&iacute;'] = '\u00ED';
entArray['&icirc;'] = '\u00EE';
entArray['&iuml;'] = '\u00EF';
entArray['&eth;'] = '\u00F0';
entArray['&ntilde;'] = '\u00F1';
entArray['&ograve;'] = '\u00F2';
entArray['&oacute;'] = '\u00F3';
entArray['&ocirc;'] = '\u00F4';
entArray['&otilde;'] = '\u00F5';
entArray['&ouml;'] = '\u00F6';
entArray['&divide;'] = '\u00F7';
entArray['&oslash;'] = '\u00F8';
entArray['&ugrave;'] = '\u00F9';
entArray['&uacute;'] = '\u00FA';
entArray['&ucirc;'] = '\u00FB';
entArray['&uuml;'] = '\u00FC';
entArray['&yacute;'] = '\u00FD';
entArray['&thorn;'] = '\u00FE';
entArray['&yuml;'] = '\u00FF'
entArray['&nbsp;'] = '\u00A0'
entArray['&Eacute;'] = '\u00C9'

function checkUni( textToCheck ) {
    var entRegEx = new RegExp("&[a-z]+;","gi");
    var entMatches = textToCheck.match(entRegEx);
    if( entMatches ) {
        for( var i = 0; i < entMatches.length; i++ ) {
            uniReplace = entArray[entMatches[i]];
            textToCheck = textToCheck.replace( entMatches[i], uniReplace );
        }
    }
    return textToCheck;
}
//-->