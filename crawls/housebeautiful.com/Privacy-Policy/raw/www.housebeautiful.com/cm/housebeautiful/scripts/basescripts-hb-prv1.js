function img_swap(img_ID,nameoffile){
	document.getElementById(img_ID).setAttribute('src',nameoffile);
}

function hideme(){
document.getElementById(ID).style.display = 'none';
}
function showme(ID){
document.getElementById(ID).style.display = 'block';
}

function fastredirecturl(redirobj){
var upurlstr = this.location.href;
var upurlarray = upurlstr.split("?fastRedirectURL%");
if (upurlarray.length > 1){
var iframeurl = upurlarray.pop()
if (iframeurl.length > 1) { // a check is in place just in case the url is something funny. I’ll have to add in a check in here so that people don’t do funny stuff I suppose..
frames[redirobj].location.href = iframeurl;
}
}
}


function viralDD(state){
	if(state=="on"){
		document.getElementById('viral_dd').style.display = "block";	
	}
	if(state=="off"){
		document.getElementById('viral_dd').style.display = "none";	
	}
}

function viralDD_b(state){
	if(state=="on"){
		document.getElementById('viral_dd_b').style.display = "block";	
	}
	if(state=="off"){
		document.getElementById('viral_dd_b').style.display = "none";	
	}
}
function loadPage(list) {

  location.href=list.options[list.selectedIndex].value

}

/* prevent exec script in search box */
$(document).ready(function(){
            
            $("form[action='/search/'] a")
            .attr("href","#")
            .click(function(e){
                        e.preventDefault();
                        $(this).parents("form").submit();    
            });

            $("form[action='/search/']").submit(function(){
                        $input = $("input[name=q]",this);
                        //get unsafe search string 
                        var s = $input.val();
                        //replace
                        s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                        //set safe search string 
                        $input.val(s);
            });

});

