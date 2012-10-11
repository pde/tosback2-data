MyAccount = function() {
};

MyAccount.prototype = {
	loginByCustomerArea : function() {
		var options = {
			type : "POST",
			beforeSubmit : function(formData, jqForm) {
			},
			success : function(data) {
				var hasFormError = $(data).find("#hasFormError").text();
				if (hasFormError == "true") {
					alert("login failed, todo");
				} else {
					var welcomeMessage = $(data).find("#welcomeMessage").html();
					$(".logged-in-welcome").html(welcomeMessage);
					$(".login-area").css("display", "none");
					$(".logged-in-welcome").css("display", "block");
				}
			}
		};
		$("#customerAreaLoginForm").ajaxSubmit(options);
	},
	logoutByCustomerArea : function() {
		var options = {
			type : "POST",
			beforeSubmit : function(formData, jqForm) {
			},
			success : function(data) {
				$(".login-area").css("display", "block");
				$(".logged-in-welcome").css("display", "none");
			}
		};
		$("#customerAreaLogoutForm").ajaxSubmit(options);
	}
};

var myAccount = new MyAccount();