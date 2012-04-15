/**
 * @author kirill.prasalov
 */
function buttonize(table_class_name, content_cell_class_name) {
  var core_navigate = function(event)
  {
    location.href = $(this).find('.' + content_cell_class_name + ' a').attr('href');
  };

  var core_highlight = function(event)
  {
    this.style.cursor = 'pointer';
  };

  $('table.' + table_class_name).bind('click', core_navigate);
  $('table.' + table_class_name).bind('mouseover', core_highlight);
}

String.prototype.toCharCode = function() {
    var r = '';

    for (var i = 0; i <this.length; i++){
        r += this.charCodeAt(i) + ',';
    }
    return r.substr(0,r.length - 1);
}

/**
 * Shows and popupates the system notification message
 * @author T�nis Kevvai
 */
function alertMessage(message, options) {
    var type = 'notice';
    var addIns = '';
    if (options.type) {
        type = options.type;
    }
    if (options.addIns) {
        addIns = options.addIns;
    }

    var speed = parseInt(options.speed);
    if (speed == 'NaN' || !speed) {
        speed = 0;
    }

    if (!$('#systemMessage')[0]) {
        alert(message);
    } else {
        var alertMsg = $('#systemMessage');
        alertMsg.attr("class", type + "Message");

        var note = alertMsg.find(".messageBody");
        note.html(message);

        if (addIns != '') {
            note.append("&nbsp;" + addIns);
        }

        alertMsg.fadeIn("fast", function() {
            if (speed > 0) {
                setTimeout(function() {
                    alertMsg.fadeOut("slow");
                }, speed);
            }
        });
    }
}

/**
 * Initializez main login form in the header
 * @author T�nis Kevvai
 */
function initMainLoginForm() {
    $("#mainLoginForm").bind('submit', validateMainLoginForm);
    $("#mainLoginForm").find('.header-login-link').bind('click', validateMainLoginForm);
    field_note_decorate("main_username");
    field_note_decorate("main_password");
}

/**
 * Validates main login form and submits data to server
 * @author T�nis Kevvai
 */
function validateMainLoginForm() {
    var data = {
        username: $('#main_username').val(),
        password: $('#main_password').val()
    };

    $.ajax({
        type: 'POST',
        url: $('.header-login-link').attr('href'),
        data: data,
        success: verifyMainLoginForm,
        dataType: "json"
    });

    return false;
}

/**
 * Verifies response of submitted login data
 * @param response Json response
 */
function verifyMainLoginForm(response) {
    if (response.status == 'FAIL') {
        alertMessage(response.error, { type: "error" });
        $('#main_password').val('');
        $('#main_username').focus().select();
    } else {
        location.reload();
    }
}

/**
 * disable tabstop in all anchor tags in all forms
 */
function reloadIndex() {
    var anchors = $('form a:visible');
    anchors.each(function() {
        var anchor = $(this);
        anchor.attr("tabindex" , -1);
    });
}

/**
 * Decorates text field so that it has note field on top of it when field is empty
 * @author T�nis Kevvai
 * @param name string input field id
 */
function field_note_decorate(name) {
    var input = $("#" + name);
    var note = $("#" + name + "_note");
    if (input.val() != undefined && input.val().length == 0) {
        note.show();
    }

    input.keypress(function() {
      input.focus();
    });

    note.bind('click', function() { input.focus(); });
    // note.bind('mousedown', function() { input.focus(); });
    input.bind('focus', function() { note.hide(); });
    input.bind('blur', function() {

        if (input.val() == undefined) {
            note.hide();
            return;
        }
        if (input.val().length == 0) {
            note.show();
        } else {
            note.hide();
        }

    });
}



/**
 * @author maksim.chernov
 */
var numb = '0123456789.,';
var IE='\v'=='v';

/**
 * @author maksim.chernov
 */
function numbersOnly(myfield, e) {
    var key;
    var keychar;
    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;

    keychar = String.fromCharCode(key);
    // control keys
    if ((key==null) || (key==0) || (key==8) ||
    (key==9) || (key==13) || (key==27) )
        return true;
    else if (((numb).indexOf(keychar) > -1))
        return true;
    else
        return false;
}

/**
 * @author maksim.chernov
 */
function disallowChars(myfield, e, chars) {
    var key;
    var keychar;
    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;

    keychar = String.fromCharCode(key);
    // control keys
    if ((key==null) || (key==0) || (key==8) ||
    (key==9) || (key==13) || (key==27) )
        return true;
    else if (((chars).indexOf(keychar) > -1))
        return true;
    else
        return false;
}

/**
 * @author maksim.chernov
 */
function allowedNameRegex(myfield, e) {
    var key;
    var keychar;
    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    if ((key==92)||(key==93)||(key==32))
        return false;
    if (((key==39)||(key==45))&&myfield.value == '')
        return false;
    return allowedRegex(key, '(^[^0-9,/"/</>/._///(/)/{/}/[\|/*/&/^/%/$/#@!/?:;/+/=]+$)');
}

/**
 * @author maksim.chernov
 */
function allowedRegex(key, pattern) {
    keychar = String.fromCharCode(key);
    var re = new RegExp(pattern);
    if ((key == null) || (key == 0) || (key == 8) ||
    (key == 9) ||
    (key == 13) ||
    (key == 27))
        return true;
    else
        if (keychar && keychar.match(re))
            return true;
        else
            return false;
}

/**
 * @author maksim.chernov
 */
function allowedNameUp(myfield, e) {
    if (myfield.value[0])
    {
        key = myfield.value[0].toCharCode();
        if ((key==39)||(key==45))
            myfield.value = '';
    }
}

/**
 * @author maksim.chernov
 */
function allowedCityRegex(myfield, e) {
    var key;
    var keychar;
    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    if ((key==92)||(key==93))
        return false;

    if (((key==39)||(key==45))&&myfield.value == '')
        return false;
    if (myfield.value == '')
        return allowedNameRegex(myfield, e);
    // control keys
    return allowedRegex(key, '(^[^,/"/</>/._///(/)/{/}/[\|/*/&/^/%/$/#@!/?:;/+/=]+$)');
}

/**
 * @author maksim.chernov
 */
function allowedCityUp(myfield, e) {
    var key;
    if (window.event) {
        key = window.event.keyCode;
    } else if (e) {
        key = e.which;
    } else {
        return;
    }

    if (myfield.value[0]) {
        key = myfield.value[0].toCharCode();
        if ((key==39)||(key==32)||(key==45)||(!allowedRegex(key, '(^[^0-9,/"/</>/._///(/)/{/}/[\|/*/&/^/%/$/#@!/?:;/+/=]+$)')))
            myfield.value = '';
    }
}
