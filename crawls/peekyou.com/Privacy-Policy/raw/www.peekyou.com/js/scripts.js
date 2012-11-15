      $(document).ready(function() {
      
              
	    $('#searchSubmit').click(function(){
	    var url="";
		var firstname = $("#first_name").val();
		var lastname  = $('#last_name').val();
		var username  = $('#username').val();
		console.log($("#first_name").val())
				console.log($("#last_name").val())
			if((firstname != "First Name" && lastname != '') && (lastname != "Last Name" && lastname != '')){
				url +="/"+ firstname.replace(/^\s+|\s+$|@|\./g,"")+"_"+ lastname.replace(/^\s+|\s+$|@|\./g,"");
			}


			else if((firstname != "First Name" && firstname != '')){
				url ="/"+firstname.replace(/^\s+|\s+$|@|\./g,"")+"_";
			}

			else if((lastname != "Last Name" && lastname != '')){
				url ="/_"+lastname.replace(/^\s+|\s+$|@|\./g,"");
			}  

			if(username != "Username" && username !=""){
				url+="/username="+ username.replace(/^\s+|\s+$/g,"")
			}
		       location.href = url;

		 //      console.log(location.href);
		       return false;
	   	 });
	    

    
	    
    });

