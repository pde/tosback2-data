//Javascript Document

function skimlinks(){
    var skimlinks_pub_id = window.skimlinks_pub_id.toUpperCase();

    var skimlinks_script = document.createElement('script'); 
        skimlinks_script.type = 'text/javascript'; 
        skimlinks_script.async = true;
        skimlinks_script.src = 'http://s.skimresources.com/js/' + skimlinks_pub_id + '.skimlinks.js';

    var skimlinks_script_attach = document.getElementsByTagName('script')[0]; 
        skimlinks_script_attach.parentNode.insertBefore(skimlinks_script, skimlinks_script_attach.nextSibling);
}