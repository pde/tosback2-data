function AjaxSuggestion() {
  return this;
}

AjaxSuggestion.elem = 0;

AjaxSuggestion.selected = -1;

AjaxSuggestion.init = function(element) {
  this.elem = element;
  element.attr("autocomplete", "off");
  element.keydown(function(event) {
    if(event.keyCode == 27) {
      $('.suggest').hide();
      return false;
    }
    if(!AjaxSuggestion.popupShown() && (event.keyCode==38 || event.keyCode==40)) {
      AjaxSuggestion.loadSuggestions();
      return false;
    }
    //up
    if(event.keyCode == 38) {
      AjaxSuggestion.moveUp();
      return false;
    }
    //down
    if(event.keyCode == 40) {
      AjaxSuggestion.moveDown();
      return false;
    }

    if(AjaxSuggestion.popupShown() && event.keyCode == 13 && AjaxSuggestion.selected >= 0) {
      if(event.preventDefault){
				event.preventDefault();
			}
			else{
				event.returnValue = false;
			}
			if(event.stopPropagation){
				event.stopPropagation();
			}
			else{
				event.cancelBubble = true;
			}
      doHeaderSearchSuggest($('#sugg'+AjaxSuggestion.selected).html());
      return false;
    }

    AjaxSuggestion.startTimer();
  });

  element.keypress(AjaxSuggestion.preventDefaultForArrowKeys);
	element.keyup(AjaxSuggestion.preventDefaultForArrowKeys);
};

AjaxSuggestion.preventDefaultForArrowKeys = function (evt){
    var keyCode = evt.keyCode;
		var navigateUp = keyCode == 38;
		var navigateDown = keyCode == 40;
		if((!evt.ctrlKey && !evt.metaKey) && ajaxSuggestions.resultsAreVisible && (navigateUp || navigateDown)){
			if(evt.preventDefault){
				evt.preventDefault();
			}
			else{
				evt.returnValue = false;
			}
			if(evt.stopPropagation){
				evt.stopPropagation();
			}
			else{
				evt.cancelBubble = true;
			}
			return false;
		}
	},

AjaxSuggestion.highlightSelected = function () {
  if (AjaxSuggestion.selected >= 0) {
    $('#sugg' + AjaxSuggestion.selected).addClass("hovered");
  }
}
AjaxSuggestion.moveUp = function() {
  $('.suggestAnchor').removeClass('hovered');
  if(AjaxSuggestion.selected <= 0) {
    AjaxSuggestion.selected = AjaxSuggestion.lastIdx;
  } else {
    AjaxSuggestion.selected--;
  }
  AjaxSuggestion.highlightSelected();
};

AjaxSuggestion.moveDown = function() {
  $('.suggestAnchor').removeClass('hovered');
  if(AjaxSuggestion.selected >= AjaxSuggestion.lastIdx) {
    AjaxSuggestion.selected = 0;
  } else {
    AjaxSuggestion.selected++;
  }

  AjaxSuggestion.highlightSelected();
};

AjaxSuggestion.timeOut = 0;

AjaxSuggestion.startTimer = function () {
  if (AjaxSuggestion.timeOut) {
    clearTimeout(AjaxSuggestion.timeOut);
  }

  this.timeOut = setTimeout(AjaxSuggestion.loadSuggestions, 1000);
};

AjaxSuggestion.searchBaseUrl = "";
AjaxSuggestion.lastIdx = -1;
AjaxSuggestion.popupShown = function() {
  return $('.suggest').is(":visible")
};

AjaxSuggestion.loadSuggestions = function () {
  if (AjaxSuggestion.timeOut) {
    clearTimeout(AjaxSuggestion.timeOut);
  }
  var q = AjaxSuggestion.elem.val();

  $.post(AjaxSuggestion.searchBaseUrl+"/network/search-suggest.jsp", {
    search: Base64.encode(q),
    format: "json"
  }, function(data) {
    if(!!data && !!data.suggestions && data.suggestions.length > 0) {
      var list = "";
      $.each(data.suggestions, function(idx, obj) {
        list +="<li><a href='#' class='suggestAnchor' id='sugg"+idx+"'>"+obj+"</a></li>";
        AjaxSuggestion.lastIdx = idx;
      });
      $('.suggest ul').html(list);
      $('.suggest').ready(function() {
        $('.suggestAnchor').click(function(){
          return doHeaderSearchSuggest($(this).html());
        });

        $('.suggest').hover(function() {
          $('.suggestAnchor').removeClass('hovered');
          AjaxSuggestion.selected = -1;
        })
      });
      $('.suggest').show();
    } else {
      $('.suggest').hide();
      $('.suggest ul').html('');
    }
  }, "json");
};

$(function() {
  $('.suggest #cl').click(function() {
    $('.suggest').hide()
    $('.suggest ul').html('')
  })
})
