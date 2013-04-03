$(document).ready(function() {
    $('.popLogin').bind('click',login.popLogin);
    $('.popSignup').bind('click',login.popSignup);
});

var digits = {'el':false,'frame':0,'num':0,'timer':0};

digits.init = function (el,animate,clean) {
    //подготовим к перемотке
    digits.el = $(el);
    if (!digits.el.size()) return;
    if (digits.num) num = digits.num;
    else num = digits.el.attr('num')*1;
    if (clean) digits.el.html('');
    var items = $('div',digits.el);
    toStr = num.toString();
    if (items.size() != toStr.length) {
        var count = items.size();
        if (count<toStr.length) {
            //добавим недостающие цифры
            while (count<toStr.length) {
                count++;
                if (count>1 && (count % 3)==1) digits.el.prepend("<span class='dot'></span>");
                digits.el.prepend("<span><div class='d00' num='0'></div></span>");
            }
        } else {
            //удалим лишнее
            var dotCount = Math.floor(toStr.length/3);
            var dotCurrent = Math.floor(count/3);
            $('span',digits.el).slice(0,count+dotCurrent-toStr.length-dotCount).remove();
        }
        var items = $('div',digits.el);
    }
    for (i=toStr.length-1;i>=0;i--) {
        items.eq(i).attr('to',toStr.charAt(i));
    }
    digits.num = num;
    if (digits.timer) clearInterval(digits.timer);
    if (animate) digits.animate();
}

digits.inc = function () {
    digits.num++;
    digits.init(digits.el,true);
}

digits.animate = function () {
    digits.frame++;
    if (digits.frame>4) frame=0;
    else frame=digits.frame;
    var animated = false;
    $('div',digits.el).each(function() {
        var t = $(this);
        var numCurr = t.attr('num')*1;
        var numEnd = t.attr('to')*1;
        if (numCurr == numEnd) return;
        animated = true;
        if (digits.frame>4) {
            numCurr++;
            if (numCurr>9) numCurr=0;
            t.attr('num',numCurr);
        }
        var animClass = "d"+numCurr.toString()+frame.toString();
        t.attr('class',animClass);
    });
    digits.frame = frame;
    if (digits.timer) clearInterval(digits.timer);
    if (animated) digits.timer = setTimeout('digits.animate()',30);
}

var login = {'timer':0,'loginAjax':0,'emailAjax':0, 'ajaxPop':0,'digitTimer':0};

login.ready = function(loginform) {
    $('.login form').bind('submit',login.submit);
    if (!login.digitTimer) login.digitTimer = setInterval('digits.inc()',5000);
    if (loginform) {
        digits.init('#digitsLogin',true,true);
        $('#loginForm .loginBnt').bind('click',login.loginClick);
        $('#loginPop .signup').bind('click',login.popSignup);
    } else {
        digits.init('#digitsSignup',true,true);
        $('#signup .signup').bind('click',login.signupClick);
        $('#signupLogin, #signupMail').bind('keypress',login.changeTimer);
        //$('#signupMail').bind('blur',login.mailCheck);
        $("#mailHelp a").bind('click',function(e){
            $('#signupMail').val($(this).text());
            $('#mailHelp').hide();
            return false;
        });
        $('#signupCountry').bind('change',login.states).change();
        captchaLoad('recaptcha');
    }
}

login.mailCheck = function(e) {
    $(this).mailcheck({
        suggested: function(element, suggestion) {
          $("#mailHelp a").text(suggestion.full)
          $("#mailHelp").show();
        },
        empty: function(element) {
          $("#mailHelp").hide();
        }
    });
}

login.change = function(el) {
    if (typeof(login['ajax'+el]) !='undefined') login['ajax'+el].abort();
    $('#'+el).addClass('ajax');
    login['ajax'+el] = $.ajax({
        'url':'/ajax/login.php',
        'data':{'act':'check','val':$('#'+el).val(),'name':$('#'+el).attr('name')},
        'dataType':'script',
        'complete': function() {
            $('#'+el).removeClass('ajax');
        }
    });
}

login.changeTimer = function(e) {
    if (!e.charCode && e.keyCode!=8) return;
    var name = $(this).attr('id');
    if (typeof(login['timer'+name])!='undefined') clearTimeout(login['timer'+name]);
    login['timer'+name] = setTimeout('login.change("'+name+'")',1000);
}

login.error = function(name,title,signupForm) {
    var input, box;
    if (name.substr(0,1) == '#') input = $(name);
    else {
        if (signupForm) input = $('#signup :input[name='+name+']');
        else input = $('#loginForm :input[name='+name+']');
    }
    if (!input.size()) return;
    box = input.parents('td:eq(0)');
    if (!box.size()) return;
    var errorBox = $('.err',box);
    if (!title) {
        if (input.attr('type') == 'checkbox') input.parent().removeClass('err');
        else {
            input.removeClass('red');
            errorBox.remove();
        }
        return;
    }
    if (input.attr('type') == 'checkbox') input.parent().addClass('err');
    else {
        if (!errorBox.size()) box.append('<div class="err">'+title+'</div>');
        else errorBox.html(title);
        input.addClass('red');
    }
}

login.states = function(e) {
    var country = $(this).val();
    if (country == 'US') {
        $('#us_state').show();
        $('#ca_state').hide();
    } else if (country == 'CA') {
        $('#ca_state').show();
        $('#us_state').hide();
    } else $('#ca_state,#us_state').hide();
}

login.loginClick = function(e) {
    e.preventDefault();
    $('#loginForm').submit();
}

login.signupClick = function(e) {
    e.preventDefault();
    $('#signup').submit();
}

login.submit = function(e) {
    e.preventDefault();
    $('.login .ajSubmit').show();
    if (login['ajaxSubmit']) return false;
    login['ajaxSubmit'] = $.ajax({
        'url':'/ajax/login.php',
        'data':$(this).serialize(),
        'dataType':'script',
        'complete': function() {
            login['ajaxSubmit'] = false;
            $('.login .ajSubmit').hide();
        }
    });
}

login.pop = function(data) {
    if (login['ajaxPop']) login['ajaxPop'].abort();
    login['ajaxPop'] = $.ajax({
        'url':'/ajax/login.php',
        'data':data,
        'dataType':'script',
        'complete': function() {
            login['ajaxPop'] = false;
        }
    });
}

login.popLogin = function(e) {
    if (e) e.preventDefault();
    login.ready(true);
    $('#signupPop').hide();
    modal.show('#loginPop',false);
}

login.popSignup = function(e) {
    if (e) e.preventDefault();
    if (!$('#signupPop').size()) login.pop({'act':'popSignup'})
    else {
        $('#loginPop').hide();
        login.ready(false);
        modal.show('#signupPop',false);
    }
}
