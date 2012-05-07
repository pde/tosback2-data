function mobileFormInit(){
	var oForm = document.getElementById("num");
	var oSms= document.getElementById("sms");
	var oSaisir =	document.getElementById("saisir");
	var oNumero =	document.getElementById("numero");
	var oImode =	document.getElementById("imode");
	var oAlEmail = document.getElementById("alerteEmail");
	var oAlNum = 	document.getElementById("alerteNumero");
	
	if(oSms && oSaisir && oNumero){
		addEvent(oSms, 'click', 
						function(){
							oSaisir.innerHTML="<acronym title=\"num&eacute;ro\">n<sup>o</sup></acronym> de mobile";
							oNumero.value="06";
						}, 
						false);
	}  
	if(oImode && oSaisir && oNumero){
		addEvent(oImode, 'click', 
						function(){
							oSaisir.innerHTML="<span lang=\"en\">mail i-mode</span>";
							oNumero.value="06××××××××@imode.fr";
						}, 
						false);
	}
	if( oNumero && oAlEmail && oAlNum ){
		addEvent(oNumero, 'focus', 
						function(){
							oAlEmail.style.display = "none";
							oAlNum.style.display = "none";
						}, 
						false);
	}
	if( oForm ){
		oForm.onsubmit = 
						function(){
								if(oSms && oSms.checked ){
									if( oNumero && oNumero.value.length != 10) {
										oAlEmail.style.display = "none";
										oAlNum.style.display = "block";
										return(false);
									}
								}
								else {
									if(	oNumero && (
												(oNumero.value.indexOf("@imode.fr") == -1)
													|| (oNumero.value == "06××××××××@imode.fr")
											)
										)
									{
										oAlEmail.style.display = "block";
										oAlNum.style.display = "none";
										return(false);
									}	
								}
								return(true);
						} 
	}
}

function mobileReponses(){

	var reponses = new Array();
	var qContainer = document.getElementById("q");
	if( qContainer ){
		var questions = qContainer.getElementsByTagName("a");
		for (var i = 0; i<questions.length ; i++)
		{
			reponses[i] = questions[i].hash.replace("#","");
			document.getElementById(reponses[i]).style.display = "none";
			questions[i].onclick = function()
			{
				if(document.getElementById(this.hash.replace("#","")).style.display == "block")
				{
					for (var j = 0; j<questions.length ; j++)
					{
						document.getElementById(reponses[j]).style.display = "none";
					}
				}
				else
				{
					for (var j = 0; j<questions.length ; j++)
					{
						document.getElementById(reponses[j]).style.display = "none";
					}
					document.getElementById(this.hash.replace("#","")).style.display = "block";
					var haut = this.hash.replace("#q","");
					document.getElementById(this.hash.replace("#","")).style.top = haut*32 +"px";
				}
				this.blur();
				return(false);
			};
			for (var k = 0; k<reponses.length ; k++)
			{
				document.getElementById(reponses[k]).onclick = function()
				{
					for (var j = 0; j<questions.length ; j++)
					{
						document.getElementById(reponses[j]).style.display = "none";
					}
				};
			}
		}
	}
}

addEvent(window, 'load', mobileFormInit, false);
addEvent(window, 'load', mobileReponses, false);
