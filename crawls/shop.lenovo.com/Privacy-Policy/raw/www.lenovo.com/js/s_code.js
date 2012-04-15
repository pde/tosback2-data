var cSelect = "";
if(s_account.match("lenovous")||s_account.match("lenovoamericas")){
	cSelect = "us";
} else {
	cSelect = "ww";
}

document.write("<s"+"cript language=\"JavaScript\" src=\"//www.lenovo.com/js/s_code_"+cSelect+".js\"></scrip"+"t>");

/* Ensighten
 * Date added: 28-July-11
 * Owner: Siping Roussin/LENOVO
 */
document.write("<s"+"cript language=\"JavaScript\" src=\"//nexus.ensighten.com/lenovo/Bootstrap.js\"></scrip"+"t>");