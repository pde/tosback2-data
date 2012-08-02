function MakeTextView(sSelector, icharLengthSmall, icharLengthBig) {
    function ExpandAllText() {
        $('.blob-second').slideDown('fast');
        $('.expand-collapse').text('[ - ] ' + ScriptVariables.Get('ShowLess'));
        $('.show-blur').toggleClass('expanded-text');
    }

    function CollapseText() {
        $('.blob-second').slideUp('fast');
        $('.expand-collapse').text('[ + ] ' + ScriptVariables.Get('ReadMore'));
        $('.show-blur').toggleClass('expanded-text');
    }

    if (window.innerWidth <= 600 && $('.blob-first').length == 0) {

        var copy = $(sSelector);
        var copyHTML = copy.html();

        if (window.innerWidth > 480) {
            var firstCopy = copyHTML.substring(0, copyHTML.indexOf('. ', icharLengthBig) + 1);
            var secondCopy = copyHTML.substring(copyHTML.indexOf('. ', icharLengthBig) + 1);
        }
        else {
            var firstCopy = copyHTML.substring(0, copyHTML.indexOf('. ', icharLengthSmall) + 1);
            var secondCopy = copyHTML.substring(copyHTML.indexOf('. ', icharLengthSmall) + 1);
        }
        
        copy.html("");
        $('<div class="blob-first" />').html(firstCopy).appendTo(sSelector);
        $('<div class="blob-second" />').html(secondCopy).appendTo(sSelector);
        $('.blob-second', copy).hide();
        $('<div class="show-blur"><a class="expand-collapse" href="#">[ + ] ' + ScriptVariables.Get('ReadMore') + '</a> </div>').appendTo(sSelector);
        $('.expand-collapse').toggle(ExpandAllText, CollapseText);
    }
}




