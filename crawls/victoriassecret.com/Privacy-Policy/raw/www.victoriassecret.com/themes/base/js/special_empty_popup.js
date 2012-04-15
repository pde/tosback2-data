if(document.getElementById("submit_button")!==null)
		
			{
				document.getElementById("submit_button").src="/themes/base/images/email_popunder_02.gif";
			}
		
		if(document.getElementById("ExchangeReturnForm2")!=null)
			{
				document.getElementById("ExchangeReturnForm2").href="/themes/base/images/ExchangeReturnForm.pdf";
			}
		
		function checkEmail()
		  {
			var flg = true;
			var eid=document.getElementById("email").value;
			pos1=eid.indexOf("@");
			pos2=eid.lastIndexOf("@");
			pos3=eid.indexOf(".");

				if((eid == "") || (!(pos1==pos2 && pos1>4 && pos3>pos1)))
				{
					flg=false;
					if(document.getElementById("top_image")!==null)
					
					{
						document.getElementById("top_image").src="/themes/base/images/email_popunder_04.gif";
					}	
					if(document.getElementById("bottom_image")!==null)

					{
						document.getElementById("bottom_image").src="/themes/base/images/email_popunder_submit_foot.gif";
					}
					if(document.getElementById("bottom_image")!==null)

					{
						document.getElementById("container").width="526px";
						document.getElementById("container").background="#FFA9D4"; 
						document.getElementById("container").display="block";
						document.getElementById("container").margin="0";
						document.getElementById("container").padding="0";
					}
					
				}
				return flg;
		}