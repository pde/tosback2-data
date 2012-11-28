// get URL
    var url  = this.location + "";
    var vm_ipid = 21026;

    // check against "known" channels
if (url.indexOf('bild.de/auto') != -1) {
        vm_ipid=20723;
} else if (url.indexOf('bild.de/lifestyle/mode-beauty') != -1) {
        vm_ipid=20724;
} else if (url.indexOf('bild.de/unterhaltung/royals') != -1) {
        vm_ipid=21753;
} else if (url.indexOf('bild.de/unterhaltung/leute') != -1) {
        vm_ipid=21754;
} else if (url.indexOf('bild.de/unterhaltung/tv') != -1) {
        vm_ipid=21755;
} else if (url.indexOf('bild.de/unterhaltung/kino') != -1) {
        vm_ipid=21756;
} else if (url.indexOf('bild.de/unterhaltung/musik') != -1) {
        vm_ipid=21757;
} else if ((url.indexOf('bild.de/geld/wirtschaft') != -1) || (url.indexOf('bild.de/geld/boerse') != -1)) {
        vm_ipid=27858;
} else if ((url.indexOf('bild.de/lifestyle/reise') != -1) || (url.indexOf('bild.de/reise') != -1)) {
        vm_ipid=27859;
} else if ((url.indexOf('bild.de/ratgeber/gesundheit') != -1) || (url.indexOf('bild.de/ratgeber/diaet') != -1)) {
        vm_ipid=27860;
} else if ((url.indexOf('bild.de/ratgeber/geld-karriere') != -1) || (url.indexOf('bild.de/geld/sparen') != -1) || (url.indexOf('bild.de/geld/versicherungen') != -1)) {
        vm_ipid=27857;
} else if ((url.indexOf('bild.de/digital/internet') != -1) || (url.indexOf('bild.de/digital/computer') != -1)) {
        vm_ipid=21648;
} else if ((url.indexOf('bild.de/digital/multimedia') != -1) || (url.indexOf('bild.de/digital/handy-und-telefon') != -1)) {
        vm_ipid=21649;
    }
    
    // we'll always have an vm_ipid at this point, so drop the script
    document.write(
        '<SCR'+'IPT language="javascript" type="text/javascript" ' +
        'src="http://bild.de.intellitxt.com/intellitxt/front.asp?ipid=' + vm_ipid +
        '"' +
        '>' +
        '</SCR'+'IPT>'
    );