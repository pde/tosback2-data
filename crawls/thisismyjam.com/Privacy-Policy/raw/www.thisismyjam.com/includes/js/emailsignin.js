function setBoxes(replace){

    if(typeof(replace) !="undefined"){
        if(typeof $iData != 'undefined' && typeof $uData != 'undefined') {
            $('#sign-in-box').html($iData);
            $('#sign-up-box').html($uData);
        }
    } else {
        $uData = $('#sign-up-box').html();
        $iData = $('#sign-in-box').html();
    }
}


var createPoppers = function($popLink){

    $popLink.on("click",function(){
        popType = $(this).attr("class");

        if(closeVisibleBox()) {
            window.afterBoxyHide = function() {
                $popLink.data("boxy").show();
            };
        }
        else
            $popLink.data("showBoxy", true);

    }).boxy({
        hideFade : 100,
        hideShrink : false,
        closeText : "",
        draggable : true, // doesn't seem to be working?
        unloadOnHide : true,
        modal : true,
        show: false,
        cssClass: "white",

        afterShow : function(){
            // This is the point at which our functions take over from templating stuff...
            $("body").addClass("unselectable");

            setBoxes(true);

            if( popType.indexOf("sign-in") !== -1 )
            {
                setupSignInScreen("signIn");
            } else {
                setupSignInScreen("signUp");
            }

        },
        afterHide : function(){
            $("body").removeClass("unselectable");

            if(window.afterBoxyHide) {
                window.afterBoxyHide();
                window.afterBoxyHide = null;
            }
        }
    });
};

function getVisibleBoxy() {
    var box = $("body .boxy-wrapper:visible");
    return box.data("boxy");
}

function closeVisibleBox(){
    var box = getVisibleBoxy();
    if(box && box.visible){
        //this.$closeButton.click();
        $(".boxy-inner .close").click(); // ARGHHHHH!
        return true;
    }

    return false;
}

// Init a signup, which will do very little for now but grow in good time.
setupSignInScreen = function(type){

    var $twitter = $(".twitter-signin"),
    $facebook  = $(".facebook-signin"),
    $email = $(".email-signin"),
    $signInButton = $("#signInSubmit"),
    $form = $("#emailForm_" + type),
    inorup = "&inorup=" + (type == 'signIn' ? 'in' : 'up'),
    $hiddenEmailFields = $(".email-sign-in");
    var $recoverPasswordLink = $("#recoverPassword a");
    var $content = $form.parentsUntil(".sign-content").parent();

    $signInButton.click(function(){
        $form.submit();
    });

    $twitter.unbind().click(function() {
        location.href = $twitter.attr("href") + inorup;
        return false;
    });

    $facebook.unbind().click(function() {
        location.href = $facebook.attr("href") + inorup;
        return false;
    });

    $recoverPasswordLink.unbind().click(function() {
        recoverPassword($content, $recoverPasswordLink.attr("href"),
                        $recoverPasswordLink.attr("title"), $("#emailUsername").val());
        return false;
    });

    if ($hiddenEmailFields.length) {

        var $emailUsername = $('#emailUsername'),
            $signInPassword = $("#signInPassword");
        
        $('input[placeholder]').placeholder();
        $signInPassword.hide();
        $("#signInPassword.placeholder").hide();

        $emailUsername.focus(function() {
            if($(".placeholder#signInPassword").length){
                $("#signInPassword.placeholder").show();
            } else {
                $signInPassword.css({"display":"block"});
            }

            $("#signInSubmit,#recoverPassword").fadeIn('fast');
            
        });
    }

    $form.submit(function(e) {
        $.ajax({
            url : $form.attr("action"),
            data: $form.serialize(),
            type : $form.attr("method"),
            dataType : "JSON",
            success : function(data){
                if(!data.success){
                    $content.find("#status").html(data.message);
                } else {
                    if(type === "signUp"){
                        // Choose username
                        enterUsername($content);
                    } else {
                        // log this user in.
                        showLoading($content,location.href,2000,"Signing you in...");
                    }

                }
            },
            error : function(a,b,c){
            }
        });
        
        e.preventDefault();
        return false;
    });

    createPoppers($("#overlaySignup"));
    createPoppers($("#overlaySignIn"));
};

/**
 *
 * inputMap is a map from input ids to validate functions
 *
 * For example:
 *
 *   var validator = new Validator({username: userchecker,
 *                                  password: [passwordChecker,
 *                                             {passwordConfirm: passwordConfirmChecker}],
 *                                  passwordConfirm: [{password: passwordChecker},
 *                                                    passwordConfirmChecker]});
 *
 * will create a validator that calls userchecker when username is keyup'd,
 * when password is keyup'd, passwordChecker is called, then passwordConfirmChecker is
 * called on passwordConfirm as a secondary check, etc.
 */
Validator = function(inputMap)
{
    var checks = {};
    var self = this;

    this.isValid = function() {
        for(var inputId in inputMap) {

            if(!checks[inputId])
                return false;
        }
        return true;
    };

    var singleCheck = function($input, func) {
        var iid = $input.attr("id");
        // return either bool or hook to hang on onChange to.
        var valid = func($input.val());
        if(typeof valid == "object") {
            valid.onReady = function(valid) {
                checks[iid] = valid;
                if(self.onChange)
                    self.onChange(self.isValid());
            };
        }
        else {
            checks[iid] = valid;
            if(self.onChange)
                self.onChange(self.isValid());
        }
    };

    this.runCheck = function($input) {

        var iid = $input.attr("id");

        var validateFunction = inputMap[iid];
        if(typeof validateFunction == 'object') {
            for(var i = 0; i < validateFunction.length; i ++) {
                var el = validateFunction[i];
                if(typeof el == 'object') {
                    for(var localIid in el) {
                        singleCheck($("#" + localIid), el[localIid]);
                    }
                }
                else
                    singleCheck($input, el);
            }
        }
        else {
            singleCheck($input, validateFunction);
        }
    };

    for(var inputId in inputMap) {
        checks[inputId] = false;

        (function(iid) {
            var $input = $("#" + iid);
            $input.keyup(function() {
                self.runCheck($input);
            });
        })(inputId)
    }
};

function recoverPassword($content, href, title, currentEmail) {
    $content.load(href, function() {
        if(title)
            $(".boxy-inner h2").text(title);
        var $email = $("#recoverEmail");
        $email.val(currentEmail);
        var $form = $("form", $content);
        setupRecoverPasswordForm($form, $content);
    });
}

function setupRecoverPasswordForm($form, $content)
{
    $form.submit(function(e) {
        e.preventDefault();
        var $this = $(this);
        var formData = $this.serialize();
        var method = $this.attr("method");
        var url = $this.attr("action");

        $.ajax({
            url: url,
            data: formData,
            type: method,
            dataType: "JSON",
            success: function(data) {
                if(data.success) {
                    recoverPasswordConfirm($content);
                }
                else {
                    if(data.signedInWith == 'twitter')
                        recoverSignedInWithTwitter($content);
                    else if(data.signedInWith == 'facebook')
                        recoverSignedInWithFacebook($content);
                    else if(data.unknownEmail)
                        recoverUnknownEmail($content);
                    else
                        alert(data.message);
                }
            }
        });

        e.preventDefault();
        return false;
    });
}

function recoverPasswordConfirm($content)
{
    $content.load("/signin/recoverpasswordconfirm", function() {
        $("#tryAgain").click(function() {
            recoverPassword($content, $(this).attr("href"), false, "");
            return false;
        });
    });
}

function recoverSignedInWithTwitter($content)
{
    $content.load("/signin/recoversignedinwithtwitter");
}

function recoverSignedInWithFacebook($content)
{
    $content.load("/signin/recoversignedinwithfacebook");
}

function recoverUnknownEmail($content)
{
    $content.load("/signin/recoverunknownemail", function() {
        setupRecoverPasswordForm($("#form"), $content);
    });
}

function emailStep(type,$content,href){
    $content.load(href,function(){
        
        var $form = $("#form"),
        form_data = null;


        $form.submit(function(e){
            e.preventDefault();

            var $this = $(this),
            url = $this.attr("action"),
            method = $this.attr("method"),
            form_data = $this.serialize();
            
            
            if(type === "signUp"){
                // Check passwords match
                if(!passwordMatches()){
                    $this.find("#status").html("passwords do not match");
                    return false;
                }
            }

            $.ajax({
                url : url,
                data: form_data,
                type : method,
                dataType : "JSON",
                success : function(data){
                    if(!data.success){
                        $this.find("#status").html(data.message);
                    } else {
                        if(type === "signUp"){
                            // Choose username
                            enterUsername($content);
                        } else {
                            // log this user in.
                            showLoading($content,"/",2000);
                            
                        }

                    }
                },
                error : function(a,b,c){
                }
            });
            return false;
        });

    });

}


function userchecker(name){
    var $spinner = $("#nameCheckSpinner"),
    $status = $("#usernameStatus"),
    $submit = $("#userCheckSubmit");

    var hook = {};

    $.ajax({
        url : "/signin/checkusername",
        type : "POST",
        dataType : "JSON",
        data : { "username" : name },
        beforeSend : function(){
            if($spinner.is(":visible"))
                return;
            $spinner.fadeIn();
        },
        success : function(data){
            var classs = (data.success) ? "success" : "error";
            $status.removeClass("success error").addClass(classs).html(data.message);
            if(hook.onReady)
                hook.onReady(data.success);
        },
        complete : function(){
            $spinner.fadeOut();
        }
    });

    return hook;
}

function passwordChecker(password, dontCheckPasswordConfirm) {
    var $status = $("#passwordStatus");

    if(password.length >= 5) {
        $status.removeClass("success error").addClass("success").html("");
        return true;
    }
    else {
        $status.removeClass("success error").addClass("error").html("Sorry, passwords must be 5 characters or longer");
        return false;
    }
}

function passwordConfirmChecker(passwordConfirm)
{
    var password = $("#password").val();
    var success = password == passwordConfirm;
    var $status = $("#passwordConfirmStatus");
    if(success)
        $status.removeClass("success error").addClass("success").html("Great, those match!");
    else
        $status.removeClass("success error").addClass("error").html("Sorry, passwords do not match");
    return success;
}


function enterUsername($content) {
    $content.load("/signin/selectusername",function(){
        var $name = $("#username");

        var validator = new Validator(
            {username: userchecker,
             password: [passwordChecker,
                        {passwordConfirm: passwordConfirmChecker}],
             passwordConfirm: [{password: passwordChecker},
                               passwordConfirmChecker]});

        validator.runCheck($name); // will be populated, so check it

        validator.onChange = function(valid) {
            if(valid)
                $("#userCheckSubmit").removeClass("disabled").disable(false);
            else
                $("#userCheckSubmit").addClass("disabled").disable();
        };

        var $form = $("#form");
        $form.submit(function(e) {
            $.post("/signin/selectusername",
                   $form.serialize(),
                   function(data) {
                       if(data.success){
                           showLoading($content,"/welcome/verifyemail",2000,"Creating your account...");
                       } else {
                           alert(data.message);
                       }
                   },
                   'json'
                  );
            e.preventDefault();
            return false;
        });
    });
}

function showLoading($content,url,time,message) {

    // TODO: On sign in, $content was empty, so .load() was never triggered.
    //       I've hardcoded $content for now, might be worth
    //       making it a field in the (currently) hypothetical SignInModal
    //       class.  -- andreas

    $content = $(".sign-content");

    $content.load("/signin/loading",function(){
        $content.find("h2").html(message);
        window.setTimeout(function() {
            if(location.href == url)
                location.reload();
            else
                location.href = url;
        }, time);
    });
}

