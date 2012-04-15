var optin_url = window.location.href;
var submit_url = 'http://platform.3cinteractive.com/web_registration.php';
var api_username = '7n7oJH+/6iE=';
var api_password = 'MM1/4951hfS8xe7I/q9yycwZEwfdQawg4DVBIVzyVa4=';
var trigger_id = '76268';

function cellForm(){
    var html="<form id='cell_submit' target='target' action='"+submit_url+"'>" +
        "<table>" +
        "<tr>" +
        "<td>cell #:</td>" +
        "<td><input type='text' name='phone_number'/></td>" +
        "</tr>" +
        "<tr>" +
        "<td colspan='2'><center><input type='submit' name='submit' id='submitButton' value='submit' onclick='formSubmit()'></center></td>"+
        "</tr>" + 
        "</table>" +
        "<input type='hidden' name='username' value='"+api_username+"'>" +
        "<input type='hidden' name='password' value='"+api_password+"'>" +
        "<input type='hidden' name='optin_url' value='"+optin_url+"'>" +
        "<input type='hidden' name='trigger_id' value='"+trigger_id+"'>" +        
        "</form>"+
	"<div>"+"<iframe name='target' id='target' style='height:0px;width:0px;border:0px;'>"+"</div>";
    return html;
}

function addCellForm(){
    $("#sm_cell_form").html(cellForm());
 //   $("#cell_submit").submit(function(event) {
 //       event.preventDefault();
 //       enableWait();
 //       submitForm();
 //   });
}

function formSubmit(){
	if (validateForm()){
		submitForm();
		disableWait();
	}
}

function submitForm(){
    $("#cell_submit").submit();
}

function enableWait(){
    $("#submitButton").attr("disabled", true);    
}

function checkSubmitted(){

}

function disableWait(){
    alert(html_entity_decode('Gracias por registrarte para recibir alertas de Telemundo. Recibir&aacute;s hasta 10 mensajes por mes. Env&iacute;a STOP para cancelar tu subscripci&oacute;n. Env&iacute;a HELP para recibir ayuda. Pueden aplicar cargos por mensaje y/o uso de data.'));
    $("#submitButton").attr("disabled", false);
}

function validateForm(){
    var phone_number = $("#cell_submit").find("input[name=phone_number]").val();

    if (phone_number==undefined || phone_number==''){
        alert(html_entity_decode('Por favor entra un n&uacute;mero de tel&eacute;fono v&aacute;lido'));
        return false;
    }

    return true;
}

/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Ultimater | http://webdeveloper.com/forum/member.php?u=30185 */
function html_entity_decode(str) {
  var ta=document.createElement("textarea");
  ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return ta.value;
}

$(document).ready(function() {
    addCellForm();
    $('#videos_online').find('dt').click(function() {
    $('#videos_online').find('dt.uxd_selected').removeClass("uxd_selected");
    $('#videos_online').find('dd.uxd_T_selected').removeClass("uxd_T_selected");
    $(this).addClass("uxd_selected");
    $(this).next().addClass("uxd_T_selected");
    return false;
    });
});

/*
	WO#11480
*/

var wo11480_redirectLocation = '';

$(document).ready(function(){
	setupDefaultRedirect();
});

function setupDefaultRedirect(){
	var defaultPage = '';
	var type = '';

	if (window.location.toString().search('video_player') != -1){
		defaultPage = type = 'videos';	
	}
	else{
		defaultPage = window.location.toString().replace(/_gallery.*$/,"s/");
		type = 'photos';
	}

    var newDirect = mujerRedirect(type);
    if (newDirect != ''){
    	wo11480_redirectLocation = newDirect;
    }
    else{
        templateRedirect(defaultPage);
	}
}

function mujerRedirect(type){
	var new_location = '';
	var check = new Array();
    check[0] = window.location.toString().search(/belleza_y_estilo/i);
    check[1] = window.location.toString().search(/mujer_de_hoy/i);
    check[2] = window.location.toString().search(/de_mujer_a_mujer/i);
    check[3] = window.location.toString().search(/tu_vida/i);
    check[4] = window.location.toString().search(/mujer_de_hoy/i);
    check[5] = window.location.toString().search(/tu_vida/i);
    check[6] = window.location.toString().search(/amor_y_sexo/i);
    check[7] = window.location.toString().search(/vive_mejor/i);

    for (var i=0;i<check.length;i++){
        if (check[i] != -1){
            new_location = window.location.protocol+"//"+window.location.host+"/destacados/mujer_de_hoy/"+type;
            break;
        }
    }
	return new_location;	
}

function templateRedirect(defaultPage){
    var showConfig = '/config/showconfig/showconfig.xml';
    var retData;
    $.ajax({
        type: "GET",
        url: showConfig,
        dataType: "xml",
        success: function(xml){
			var default_page = '';
            $(xml).find('templateName').each(function(){
                var strTemplateName = $(this).contents().text();
                if ((strTemplateName == 'template4') || (strTemplateName == 'template9')){
                    var parent = $(this).parent();
                    var showName = $(parent).find('urlFriendlyShowName').contents().text();
                    if (window.location.toString().search(showName) != -1){
						default_page = window.location.protocol+"//"+window.location.host+"/shows/"+showName; 
                    }
                }
            });
			if (default_page == ''){
				default_page = defaultPage;
			}
			wo11480_redirectLocation = default_page;	
        }
    });
}

function redirectPage(type){
	window.location = wo11480_redirectLocation;
}
