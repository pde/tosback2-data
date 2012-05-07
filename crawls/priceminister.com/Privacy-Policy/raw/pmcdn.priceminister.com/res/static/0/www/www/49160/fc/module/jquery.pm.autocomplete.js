/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 JÃ¶rn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 */



var autocompleter_last_proposed_value = '';

;(function($) {
  
$.fn.extend({
  /**
   * Liste des options disponibles sur http://docs.jquery.com/Plugins/Autocomplete/autocomplete
   * Remarques :
   * <ul>
   *   <li><code>extraParams</code> a été supprimée</li>
   *   <li><code>formatResult</code> n'est pas utilisable avec la méthode de parse $j.Autocompleter.parseFunctions.fastCompletionParse</li>
   *   <li>options également disponible, mais non documentée dans la doc "officielle" :
   *     http://pricewiki.lan/Wiki.jsp?page=Completion%20a%20la%20frappe%20-%20proptotypage%20JS#section-Completion+a+la+frappe+-+proptotypage+JS-Options
   *   </li>
   * </ul>
   * 
   * Options ajoutées :
   * <ul>
   *   <li><code>urlParams></code> : paramètres de requête, sous la forme <code>toto=1&pm=yes</code>.</li>
   *    <li><code>fillIn</code> : Permet que l'input contienne la proposition sur laquelle l'utilisateur s'est déplacé à l'aide des flèches.</li>
   *   <li><code>submitOnReturn</code> : Permet que la recherche soit lancée automatiquement lorsque l'utilisateur appuie sur Entrée.</li>
   *   <li>
   *     <code>submitOnClick</code> : Permet que la recherche soit lancée automatiquement lorsque l'utilisateur clique sur une proposition.
   *     Pour qu'elle soit prise en compte, l'option <code>submitId</code> doit également être définie.
   *   </li>
   *   <li>
   *     <code>submitId</code> : Id de l'input de soumission du formulaire (ex: le "Go" pour la recherche globale).
   *     Si cette option n'est pas définie, l'option <code>submitOnClick</code> n'est pas prise en compte.
   *   </li>
   *   <li>
   *     <code>includeInputInLoop</code> : Permet de revenir sur l'input, contenant l'expression initialement tapée par l'utilisateur,
   *                        avant la 1è proposition et après la dernière.
   *   </li>
   *   <li><code>cleanSearch<code> : Nettoie le terme entré par l'utilisateur. Le nettoyage :
   *                   - enlève tous les accents, 
   *                   - supprime tous les caractères spéciaux,
   *                   - fusionne tous les caractères blancs en doublon (espace, tabulation ...), 
   *                   - supprime tous les caractères blancs au début du terme.
   *   </li>
   *   <li><code>verticalGap></code> : Nombre de pixels pour un décalge vertical du <code><div /></code> d'autocomplétion.</li>
   *   <li><code>horizontalGap></code> : Nombre de pixels pour un décalge horizontal du <code><div /></code> d'autocomplétion.</li>
   *   <li><code>heightToAddForIE</code> : Nombre de pixels à ajouter à la hauteur de la liste pour IE</li>
   *   <li><code>isInputMoving</code> : Permet de Faire bouger la liste de propositions en même temps que l'input.
   *                                    Cela peut prendre un peu de charges, il ne faut le mettre à <code>true</code> que si l'input sur lequel il est attaché bouge au resize de la fenêtre. </li>
   *   <li><code>afterSelect</code> : Function appelée après qu'une valeur ait été sélectionnée.</li>
   *   <li><code>onChange</code> : Function appelée après que l'utilisateur ait changé la valeur de l'input.</li>
   *   <li><code>doAutoFill</code> : Function indiquant si on doit faire l'autofill pour la meilleure proposition trouvée.</li>
   *   <li><code>formatLi</code> : Function permettant de formater les éléments HTML li qui représentent une proposition.</li>
   *   <li><code>hasPressedKey</code> : Valeur par défaut de hasPressedKey. Permet d'inhiber le mécanisme du plugin qui empêche de sélectionner la première proposition sans avoir utilisée les flèches du clavier.</li> 
   *   <li><code>separatorLabel</code> : Séparateur pouvant être utilisé pour séparer deux listes, par exemple les deux types de liste de la mise en vente.</li>
   *   <li><code>addMaxHeightToList</code> : Permet de savoir si on doit rajouter l'attribut maxHeight à la liste des propositions.</li>
   * </ul>
   */
  autocomplete: function(urlOrData, options) {
    var isUrl = typeof urlOrData == "string";
    options = $.extend({}, $.Autocompleter.defaults, {
      url: isUrl ? urlOrData : null,
      data: isUrl ? null : urlOrData,
      delay: isUrl ? $.Autocompleter.defaults.delay : 10,
      max: options && options.max ? options.max : (!options.scroll ? 10 : 150)
    }, options);
    
    // if highlight is set to false, replace it with a do-nothing function
    options.highlight = options.highlight || function(value) { return value; };
    
    // if the formatMatch option is not specified, then use formatItem for backwards compatibility
    options.formatMatch = options.formatMatch || options.formatItem;
    
    return this.each(function() {
      new $.Autocompleter(this, options);
    });
  },
  result: function(handler) {
    return this.bind("result", handler);
  },
  search: function(handler) {
    return this.trigger("search", [handler]);
  },
  flushCache: function() {
    return this.trigger("flushCache");
  },
  setOptions: function(options){
    return this.trigger("setOptions", [options]);
  },
  unautocomplete: function() {
    return this.trigger("unautocomplete");
  }
});


$.Autocompleter = function(input, options) {

  var KEY = {
    UP: 38,
    DOWN: 40,
    DEL: 46,
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    COMMA: 188,
    PAGEUP: 33,
    PAGEDOWN: 34,
    BACKSPACE: 8
  };

  // Create $ object for input element
  var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

  var timeout;
  var previousValue = "";
  var cache = $.Autocompleter.Cache(options);
  var hasFocus = 0;
  var lastKeyPressCode;
  var config = {
    mouseDownOnSelect: false,
    hasPressedKey: ! options.hasPressedKey ? false : options.hasPressedKey
  };
  var select = $.Autocompleter.Select(options, input, selectCurrent, config);
  var inputCurrentValue = "";
  
  var blockSubmit;
  
  // prevent form submit in opera when selecting with return key
  $.browser.opera && $(input.form).bind("submit.autocomplete", function() {
    if (blockSubmit) {
      blockSubmit = false;
      return false;
    }
  });
  
  // only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
  $input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
    if (inputCurrentValue == "") {
      inputCurrentValue = $input.val();
    }
    /**
     * Variable "PM.Header.isMouseOver" utilisée pour le nouveau header PriceMinister
     * Commune aux fichiers large_menu_header.js et jquery.pm.autocomplete.js
     * Indique si l'utilisateur survole actuellement un des home-univers 
     */
    if ( typeof(PM.Header) == "undefined") {
      // Cas utilisé par les autres brands (laredoute...)
      hasFocus = 1;
    }
    else {
      if ( PM.Header.isMouseOver ) {
        hasFocus = 0;
      }
      // a keypress means the input has focus
      // avoids issue where input had focus before the autocomplete was applied
      else {
        hasFocus = 1;  
      }
    }
    // track last key pressed
    lastKeyPressCode = event.keyCode;

    switch(event.keyCode) {
    
      case KEY.UP:
        event.preventDefault();
        if ( select.visible() ) {
          select.prev();
          config.hasPressedKey = true;
          if (options.fillIn) {
            fillIn(select.current() && select.current().result || inputCurrentValue);
          }
        } else {
          onChange(0, true);
        }
        break;
        
      case KEY.DOWN:
        event.preventDefault();
        if ( select.visible() ) {
          select.next();
          config.hasPressedKey = true;
          if (options.fillIn) {
            fillIn(select.current() && select.current().result || inputCurrentValue);
          }
        } else {
          onChange(0, true);
        }
        break;
        
      case KEY.PAGEUP:
      case KEY.PAGEDOWN:
        //on ne fait rien
        break;
      
      // matches also semicolon
      case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
      case KEY.TAB:
      case KEY.RETURN:
        inputCurrentValue = "";
        if( config.hasPressedKey && selectCurrent() ) {
          // stop default to prevent a form submit, Opera needs special handling
          if (! options.submitOnReturn) {
            event.preventDefault();
          }
          blockSubmit = true;
          return options.submitOnReturn;
        } else {
          return true;
        }
        break;
        
      case KEY.ESC:
        select.hide();
        break;
        
      default:
        clearTimeout(timeout);
        timeout = setTimeout(onChange, options.delay);
        inputCurrentValue = "";
        select.resetActive();
        break;
    }
  
  }).focus(function(){
    // track whether the field has focus, we shouldn't process any
    // results if the field no longer has focus
    hasFocus++;
  }).blur(function() {
    hasFocus = 0;
    if (!config.mouseDownOnSelect) {
      hideResults();
    }
  }).click(function() {
    // show select when clicking in a focused field
    if ( hasFocus++ > 1 && !select.visible() ) {
      onChange(0, true);
    }
  }).bind("search", function() {
    // TODO why not just specifying both arguments?
    var fn = (arguments.length > 1) ? arguments[1] : null;
    function findValueCallback(q, data) {
      var result;
      if( data && data.length ) {
        for (var i=0; i < data.length; i++) {
          if( data[i].result.toLowerCase() == q.toLowerCase() ) {
            result = data[i];
            break;
          }
        }
      }
      if( typeof fn == "function" ) fn(result);
      else $input.trigger("result", result && [result.data, result.value]);
    }
    $.each(trimWords($input.val()), function(i, value) {
      request(value, findValueCallback, findValueCallback);
    });
  }).bind("flushCache", function() {
    cache.flush();
  }).bind("setOptions", function() {
    $.extend(options, arguments[1]);
    // if we've updated the data, repopulate
    if ( "data" in arguments[1] )
      cache.populate();
  }).bind("unautocomplete", function() {
    select.unbind();
    $input.unbind();
    $(input.form).unbind(".autocomplete");
  });
  
  
  function selectCurrent() {
    var selected = select.selected();
    if( !selected )
      return false;
        
    // Permet d'ignorer une proposition.
    if (selected.data.ignore) {
        return false;
    }
    
    var v = selected.result;
    previousValue = v;
    
    if ( options.multiple ) {
      var words = trimWords($input.val());
      if ( words.length > 1 ) {
        var seperator = options.multipleSeparator.length;
        var cursorAt = $(input).selection().start;
        var wordAt, progress = 0;
        $.each(words, function(i, word) {
          progress += word.length;
          if (cursorAt <= progress) {
            wordAt = i;
            return false;
          }
          progress += seperator;
        });
        words[wordAt] = v;
        // TODO this should set the cursor to the right position, but it gets overriden somewhere
        //$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
        v = words.join( options.multipleSeparator );
      }
      v += options.multipleSeparator;
    }
    
    $input.val(v);
    hideResultsNow();
    $input.trigger("result", [selected.data, selected.value]);
    autocompleter_last_proposed_value = selected.value;
    // Execute le callback après qu'une proposition ait été choisie dans la liste.
    if (options.afterSelect) {
        options.afterSelect(selected);
    }
    return true;
  }
  
  function onChange(crap, skipPrevCheck) {
    var currentValue = $input.val();
    
    if ( !skipPrevCheck && currentValue == previousValue )
      return;
    
    previousValue = currentValue;
    
    currentValue = lastWord(currentValue);
    
    // Callback de changement de valeur dans l'input.
    if (options.onChange) {
        options.onChange(currentValue);
    }
    
    if ( currentValue.length >= options.minChars) {
      $input.addClass(options.loadingClass);
      if (!options.matchCase)
        currentValue = currentValue.toLowerCase();
      request(currentValue, receiveData, hideResultsNow);
    } else {
      stopLoading();
      select.hide();
    }
  };
  
  function trimWords(value) {
    if (!value)
      return [""];
    if (!options.multiple)
      return [$.trim(value)];
    return $.map(value.split(options.multipleSeparator), function(word) {
      return $.trim(value).length ? $.trim(word) : null;
    });
  }
  
  function lastWord(value) {
    if ( !options.multiple )
      return value;
    var words = trimWords(value);
    if (words.length == 1) 
      return words[0];
    var cursorAt = $(input).selection().start;
    if (cursorAt == value.length) {
      words = trimWords(value)
    } else {
      words = trimWords(value.replace(value.substring(cursorAt), ""));
    }
    return words[words.length - 1];
  }
  
  // fills in the input box w/the first match (assumed to be the best match)
  // q: the term entered
  // data: the first matching result
  function autoFill(q, data){
    if (! options.doAutoFill || (options.doAutoFill && options.doAutoFill(q, data))) {      
      // autofill in the complete box w/the first match as long as the user hasn't entered in more data
      // if the last user key pressed was backspace, don't autofill
      if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
        // fill in the value (keep the case the user has typed)
        $input.val($input.val() + data.value.substring(lastWord(previousValue).length));
        // select the portion of the value not typed by the user (so the next character will erase)
        $(input).selection(previousValue.length, previousValue.length + data.value.length);
        if (options.afterSelect) {
            options.afterSelect(data);
        }
      }
    }
  };

  // fills in the input box w/the selected match
  // q: the term entered
  // sValue: the matching result
  function fillIn(sValue){
    // autofill in the complete box w/the selected match
    // if the last user key pressed was backspace, don't autofill
    if( options.fillIn && lastKeyPressCode != KEY.BACKSPACE ) {
      // fill in the value (totally replace the user input)
      $input.val(sValue);
      // select the portion of the value not typed by the user (so the next character will erase) if input is not include in loop
      if (! options.includeInputInLoop) {
        $(input).selection(previousValue.length, previousValue.length + sValue.length);
      }
    }
    autocompleter_last_proposed_value = sValue;
  };

  function hideResults() {
    clearTimeout(timeout);
    timeout = setTimeout(hideResultsNow, 200);
  };

  function hideResultsNow() {
    var wasVisible = select.visible();
    select.hide();
    clearTimeout(timeout);
    stopLoading();
    if (options.mustMatch) {
      // call search and run callback
      $input.search(
        function (result){
          // if no value found, clear the input box
          if( !result ) {
            if (options.multiple) {
              var words = trimWords($input.val()).slice(0, -1);
              $input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
            }
            else {
              $input.val( "" );
              $input.trigger("result", null);
            }
          }
        }
      );
    }
  };

  function receiveData(q, data) {
    if ( data && data.length && hasFocus ) {
      stopLoading();
      select.display(data, q);
      autoFill(q, data[0]);  
      select.show();
    } else {
      hideResultsNow();
    }
  };

  function request(term, success, failure) {
    if (!options.matchCase){
      term = term.toLowerCase();
    }
    if (options.cleanSearch){
      term = PM.Util.removeAccents(term);
      term = term.replace(/[^a-z0-9 &]/g, " ");
      term = term.replace(/(\s+)/g, " ");
      term = term.replace(/(^\s+)/g, "");
    }
    
    var data = cache.load(term);
    // receive the cached data
    if (data && data.length) {
      success(term, data);
    // if an AJAX url has been supplied, try loading the data now
    } else if( (typeof options.url == "string") && (options.url.length > 0) && (term.length > 0) ){
      
      var params = "q=" + encodeURIComponent(lastWord(term));
      if (options.urlParams) {
        params += "&" + options.urlParams;
      }
      
      PM.Ajax.request(options.url, function(data) {
          var parsed = options.parse && options.parse(data) || parse(data);
          cache.add(term, parsed);
          success(term, parsed);
        },
        {urlParams: params});
      
    } else {
      // if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
      select.emptyList();
      failure(term);
    }
  };
  
  function parse(data) {
    var parsed = [];
    var rows = data.split("\n");
    for (var i=0; i < rows.length; i++) {
      var row = $.trim(rows[i]);
      if (row) {
        row = row.split("|");
        parsed[parsed.length] = {
          data: row,
          value: row[0],
          result: options.formatResult && options.formatResult(row, row[0]) || row[0]
        };
      }
    }
    return parsed;
  };

  function stopLoading() {
    $input.removeClass(options.loadingClass);
  };

};

$.Autocompleter.defaults = {
  inputClass: "ac_input",
  resultsClass: "ac_results",
  loadingClass: "ac_loading",
  pyjamasEffect: false,
  minChars: 1,
  delay: 400,
  cleanSearch: false,
  matchCase: false,
  matchSubset: true,
  matchContains: false,
  cacheLength: 10,
  max: 100,
  mustMatch: false,
  selectFirst: true,
  formatItem: function(row) { return row[0]; },
  formatMatch: null,
  autoFill: false,
  width: 0,
  widthToAdd: 0,
  verticalGap: 0,
  horizontalGap: 0,
  heightToAddForIE: 0,
  multiple: false,
  multipleSeparator: ", ",
  highlight: function(value, term) {
    return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
  },
  scroll: true,
  scrollHeight: 180,
  isInputMoving: false,
  addMaxHeightToList: true
};

$.Autocompleter.parseFunctions = {
  /**
   * Méthode de parsing du résultat FAST pour la complétion.
   * Le tableau retourné à la forme suivante :
   * <code>["<mot tapé>" "", "<1er mot prop.>", "<méta du 1er mot prop.>", "<2ème mot prop.>", "<méta du 2ème mot prop.>", "<3ème... ]</code>
   * @param data - réponse envoyée par le completionserver de FAST
   * @ignore
   */
  fastCompletionParse: function(data) {
    var parsed = [];
    var rows = eval('(' + data.responseText + ')');
    // Le premier terme est le mot tapé par l'utilisateur, on le récupère
    var firstTerm = rows[0];
    // Du coup, on ne traite pas le premier terme
    for (var i=2; i < rows.length; i+=2) {
      if (!rows[i] || !rows[i + 1]) break;
      // terme proposé
      var term = rows[i];
        // Les méta-données sont toute dans la même chaîne de caratère et sont séparés par un certain caractère
        // Ce caractère a été choisi au moment de la création des dictionnaires, il correspond à celui que l'on place nous-même dans le dictionnaire
        var metaDatas = rows[i + 1].split("/");
        // Meta-donnée 1 : nombre de résultats fast pour cette recherche
        var nbHits = metaDatas[1];
          // On affiche la proposition en première place si le terme est identique au terme tapé par l'utilisateur
          var positionInArray = firstTerm != term ? parsed.length : 0;
          // Création de l'objet correspondant à la ligne
          var line = {
          data: {term: term, nbHits: nbHits},
          value: term,
          result: term
          };
          // Insertion de l'objet dans le tableau de parsing
          PM.Util.insertIntoArray(parsed, line, positionInArray);
    }
    return parsed;
  },
  
  /**
   * Méthode de parsing de l'auto-complete de la mise en vente.
   * Le tableau retourné à la forme suivante :
   * <code>["<1er mot prop.>", "<clé du 1er mot prop.>", "<2ème mot prop.>", "<clé du 2ème mot prop.>", "<3ème... ]</code>
   * @param data - réponse envoyée par la requête Ajax.
   * @ignore
   */
  submitCompletionParse: function(data) {
    var parsed = [];
    var rows = eval('(' + data.responseText + ')');
        
    // Ajout des lignes "suggest".
    for (var i = 0 ; i < rows.precise.length ; i++) {
      var elt = rows.precise[i];
      var elt_key;
      var elt_value;
        
      for (key in elt) {
        elt_key = key;
        elt_value = elt[key];
      }        
      
      // Création de l'objet correspondant à la ligne
      var line = {
        data: {term: elt_value, key: elt_key, precise:true},
        value: elt_value,
        result: elt_value
      };
        
      PM.Util.insertIntoArray(parsed, line, parsed.length);
    }
  
    // Séparateur des deux listes
    if (rows.approximate.length > 0) {
      var label = this.separatorLabel;
        
      var line = {
        data: {term: label, ignore: true},
        value: label,
        result: label
      }
      PM.Util.insertIntoArray(parsed, line, parsed.length);
    }
  
    // Ajout des lignes "Did you mean"
    for (var i = 0 ; i < rows.approximate.length ; i++) {
      var elt = rows.approximate[i];
      var elt_key;
      var elt_value;
        
      for (key in elt) {
        elt_key = key;
        elt_value = elt[key];
      }
        
      // Création de l'objet correspondant à la ligne
      var line = {
        data: {term: elt_value, key: elt_key, precise: false},
        value: elt_value,
        result: elt_value
      };
        
      PM.Util.insertIntoArray(parsed, line, parsed.length);
    }
    
    return parsed;
  }
};

$.Autocompleter.formatItemFunctions = {
  /**
   * Méthode de formattage du résultat à afficher pour une completion à la frappe (FAST)
   * l'item correspond à ce que l'on fourni dans <code>parse.data</code> dans la méthode de parsing.
   * @param item - Item à formatter. Représente une ligne de la liste.
   * @ignore
   */
  fastCompletionFormatItem: function(item) {
    if (!item || !item.term) return null;
    var formatted = '<span class="ac_suggst">' + item.term + '</span>';
    if (!isBrandNewExcluded && item.nbHits) {
        formatted += ' <span class="ac_rslt">';
      // labels dans le fichier translation.js sous IG
      if (item.nbHits > 1) {
        var nbRoundHits;
        if (item.nbHits < 10) { //1 chiffre significatif
          nbRoundHits = item.nbHits;
        } else if (item.nbHits < 100) { //1 chiffre significatif
          nbRoundHits = Math.round(item.nbHits/10)*10;
        } else if (item.nbHits < 1000) { //2 chiffres significatifs
          nbRoundHits = Math.round(item.nbHits/10)*10;
        } else if (item.nbHits < 10000) { //2 chiffres significatifs
          nbRoundHits = PM.Numbers.addThousandsSeparator(Math.round(item.nbHits/100)*100);
        } else { //label spécifique
          nbRoundHits = PM.Constants.Translation.autocomplete_item_more_than_10000;
        }
        formatted += PM.Util.variableReplace(PM.Constants.Translation.autocomplete_item_many_results, 'nb_hits', nbRoundHits);
      }
      else {
        formatted += PM.Constants.Translation.autocomplete_item_one_result;
      }
      formatted += '</span>';
    }
    return formatted;
  },
  
  /**
   * Méthode de formattage du résultat à afficher pour l'auto-complete de la mise en vente.
   * l'item correspond à ce que l'on fourni dans <code>parse.data</code> dans la méthode de parsing.
   * @param item - Item à formatter. Représente une ligne de la liste.
   * @ignore
   */
  submitCompletionFormatItem: function(item) {
    if (!item || !item.term) {
      return null;
    }
    return item.term;
  }
};

$.Autocompleter.doAutoFillFunctions = {
  /**
   * @param typedValue est ce que l'utilisateur a tapé.
   * @proposedData est la proposition qui a été choisie.
   * @return vrai si la proposition doit pré-remplir l'invite de saisie.
   * @ignore
   */
  submitDoAutoFill: function(typedValue, proposedData) {
    // Cas du champs à ignorer.
    if (proposedData.data.ignore) {
      return false;
    }
    // Cas des propositions de type "did you mean".
    if (! proposedData.data.precise) {
      return false;
    }
    // Cas où la proposition ne commence pas avec la valeur tapée par l'utilisateur.
    if (! proposedData.result.toLowerCase().match("^" + typedValue.toLowerCase())) {
      return false;
    } 
    return true;
  }    
};

$.Autocompleter.formatLiFunctions = {
  /**
   * Formatte le <li/> pour le contôle de la mise en vente.
   * @ignore
   */         
  submitFormatLi: function(liElement, item) {
    if (!item || !item.term) {
      return;
    }
    if (item.ignore) {
      liElement.className = "suggestion more";
    }
    else {
      liElement.id = item.key
    }
  }
}

$.Autocompleter.Cache = function(options) {

  var data = {};
  var length = 0;
  
  function matchSubset(s, sub) {
    if (!options.matchCase) 
      s = s.toLowerCase();
    var i = s.indexOf(sub);
    if (options.matchContains == "word"){
      i = s.toLowerCase().search("\\b" + sub.toLowerCase());
    }
    if (i == -1) return false;
    return i == 0 || options.matchContains;
  };
  
  function add(q, value) {
    if (length > options.cacheLength){
      flush();
    }
    if (!data[q]){ 
      length++;
    }
    data[q] = value;
  }
  
  function populate(){
    if( !options.data ) return false;
    // track the matches
    var stMatchSets = {},
      nullData = 0;

    // no url was specified, we need to adjust the cache length to make sure it fits the local data store
    if( !options.url ) options.cacheLength = 1;
    
    // track all options for minChars = 0
    stMatchSets[""] = [];
    
    // loop through the array and create a lookup structure
    for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
      var rawValue = options.data[i];
      // if rawValue is a string, make an array otherwise just reference the array
      rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
      
      var value = options.formatMatch(rawValue, i+1, options.data.length);
      if ( value === false )
        continue;
        
      var firstChar = value.charAt(0).toLowerCase();
      // if no lookup array for this character exists, look it up now
      if( !stMatchSets[firstChar] ) 
        stMatchSets[firstChar] = [];

      // if the match is a string
      var row = {
        value: value,
        data: rawValue,
        result: options.formatResult && options.formatResult(rawValue) || value
      };
      
      // push the current match into the set list
      stMatchSets[firstChar].push(row);

      // keep track of minChars zero items
      if ( nullData++ < options.max ) {
        stMatchSets[""].push(row);
      }
    };

    // add the data items to the cache
    $.each(stMatchSets, function(i, value) {
      // increase the cache size
      options.cacheLength++;
      // add to the cache
      add(i, value);
    });
  }
  
  // populate any existing data
  setTimeout(populate, 25);
  
  function flush(){
    data = {};
    length = 0;
  }
  
  return {
    flush: flush,
    add: add,
    populate: populate,
    load: function(q) {
      if (!options.cacheLength || !length)
        return null;
      /* 
       * if dealing w/local data and matchContains than we must make sure
       * to loop through all the data collections looking for matches
       */
      if( !options.url && options.matchContains ){
        // track all matches
        var csub = [];
        // loop through all the data grids for matches
        for( var k in data ){
          // don't search through the stMatchSets[""] (minChars: 0) cache
          // this prevents duplicates
          if( k.length > 0 ){
            var c = data[k];
            $.each(c, function(i, x) {
              // if we've got a match, add it to the array
              if (matchSubset(x.value, q)) {
                csub.push(x);
              }
            });
          }
        }        
        return csub;
      } else 
      // if the exact item exists, use it
      if (data[q]){
        return data[q];
      } else
      if (options.matchSubset) {
        for (var i = q.length - 1; i >= options.minChars; i--) {
          var c = data[q.substr(0, i)];
          if (c) {
            var csub = [];
            $.each(c, function(i, x) {
              if (matchSubset(x.value, q)) {
                csub[csub.length] = x;
              }
            });
            return csub;
          }
        }
      }
      return null;
    }
  };
};

$.Autocompleter.Select = function (options, input, select, config) {
  var CLASSES = {
    ACTIVE: "ac_over"
  };
  
  var listItems,
    active = -1,
    data,
    term = "",
    needsInit = true,
    element,
    list;
  
  // Create results
  function init() {
    if (!needsInit)
      return;
    element = $("<div/>")
    .hide()
    .addClass(options.resultsClass)
    .css("position", "absolute")
    .appendTo(document.body);
                
    if (options.isInputMoving) {
      PM.Event.add(window, 'resize', function(event) {
        var offset = $(input).offset();
        var top = offset.top + input.offsetHeight + options.verticalGap;
        var left = offset.left + options.horizontalGap;
        var width = typeof options.width == "string" || options.width > 0 ? options.width : $(input).width();
        element.css({
          width: width,
          top: top,
          left: left
        });

        if (ie6) { // ie6 iframe
          $j('#pmautocomplete_iframe').css({
            top: top,
            left: left,
            width: width
          });
        }

      });
    }
    
    if (ie6) { // ie6 iframe
      var ieDiv = $("<div/>");
      ieDiv.html('<iframe id="pmautocomplete_iframe" src="javascript:false;" style="width:0px; position: absolute; top:0px; left:0px; filter:alpha(opacity=0); z-index: 1990; height: 0; display:none;"></iframe>');
      ieDiv.appendTo(document.body);
    }
  
    list = $("<ul/>").appendTo(element).mouseover( function(event) {
      if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
        config.hasPressedKey = false;
              active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
          $(target(event)).addClass(CLASSES.ACTIVE);            
          }
    }).click(function(event) {
      $(target(event)).addClass(CLASSES.ACTIVE);
      select();
      // TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
      input.focus();
      
      if (options.submitOnClick && options.submitId) {
        var parent;
        if(options.parent){
          parent = options.parent;
        }else{
          parent = input.parentNode;
        }
        $j('#' + options.submitId, parent)[0].click();
      }
      return false;
    }).mousedown(function() {
      config.mouseDownOnSelect = true;
    }).mouseup(function() {
      config.mouseDownOnSelect = false;
    });
    
    if (options.edito) {
      $("<p/>").html(options.edito).addClass("ac_edito").appendTo(element);
    }
    
    if( options.width > 0 )
      element.css("width", options.width);
      
    needsInit = false;
  } 
  
  function target(event) {
    var element = event.target;
    while(element && element.tagName != "LI")
      element = element.parentNode;
    // more fun with IE, sometimes event.target is empty, just ignore it then
    if(!element)
      return [];
    return element;
  }

  function moveSelect(step) {
    listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
    movePosition(step);
    //si l'input n'est pas inclus dans la boucle,
    //sinon si on est pas sur l'input (cad on est sur une proposition)
    if (! options.includeInputInLoop || active != -1) {
      var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
      if(options.scroll) {
          var offset = 0;
          listItems.slice(0, active).each(function() {
          offset += this.offsetHeight;
        });
          if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
              list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
          } else if(offset < list.scrollTop()) {
              list.scrollTop(offset);
          }
      }
    }
  };
  
  //active = -1 : on est sur l'input
  function movePosition(step) {
    active += step;
    if (active < (options.includeInputInLoop ? -1 : 0)) {
      active = listItems.size() - 1;
    } else if (active >= listItems.size()) {
      active = options.includeInputInLoop ? -1 : 0;
    }
  }
  
  function limitNumberOfItems(available) {
    return options.max && options.max < available
      ? options.max
      : available;
  }
  
  function fillList() {
    list.empty();
    var max = limitNumberOfItems(data.length);
    for (var i=0; i < max; i++) {
      if (!data[i])
        continue;
      var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
      if ( formatted === false )
        continue;
      var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(options.pyjamasEffect ? (i%2 == 0 ? "ac_even" : "ac_odd") : "ac_item").appendTo(list)[0];
      if (options.formatLi) options.formatLi(li, data[i].data);
      $.data(li, "ac_data", data[i]);
    }
    listItems = list.find("li");
    if ( options.selectFirst ) {
      listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
      active = 0;
    }
    // apply bgiframe if available
    if ( $.fn.bgiframe )
      list.bgiframe();
  }
  
  return {
    display: function(d, q) {
      init();
      data = d;
      term = q;
      fillList();
    },
    next: function() {
      moveSelect(1);
    },
    prev: function() {
      moveSelect(-1);
    },
    pageUp: function() {
      if (active != 0 && active - 8 < 0) {
        moveSelect( -active );
      } else {
        moveSelect(-8);
      }
    },
    pageDown: function() {
      if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
        moveSelect( listItems.size() - 1 - active );
      } else {
        moveSelect(8);
      }
    },
    hide: function() {
      element && element.hide();
      listItems && listItems.removeClass(CLASSES.ACTIVE);
      active = -1;

      if (ie6) { // ie6 iframe
        $j('#pmautocomplete_iframe').css({
          display: "none"
        });
      }
    },
    visible : function() {
      return element && element.is(":visible");
    },
    current: function() {
      return this.visible() && $.data(listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0], "ac_data");
    },
    show: function() {
      var offset = $(input).offset();
      var top = offset.top + input.offsetHeight + options.verticalGap;
      var left = offset.left + options.horizontalGap;
      var width = (typeof options.width == "string" || options.width > 0 ? options.width : $(input).width()) + options.widthToAdd;
      element.css({
        width: width,
        top: top,
        left: left
      }).show();
      
      if(options.scroll) {
        list.scrollTop(0);
        
        if (options.addMaxHeightToList) { 
          list.css('max-height', options.scrollHeight);
        }   
        list.css('overflow', 'hidden');
        
        if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
          var listHeight = 0;
          listItems.each(function() {
            listHeight += this.offsetHeight;
          });
          var scrollbarsVisible = listHeight > options.scrollHeight;
          list.css('height', scrollbarsVisible ? options.scrollHeight : (listHeight + options.heightToAddForIE));
          if (!scrollbarsVisible) {
            // IE doesn't recalculate width when scrollbar disappears
            listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
          }
            }
      }
      
      if (ie6) { // ie6 iframe
        $j('#pmautocomplete_iframe').css({
          top: top,
          left: left,
          width: width,
          height: element.height(),
          display: "block"
        });
      }
      
    },
    selected: function() {
      var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
      return selected && selected.length && $.data(selected[0], "ac_data");
    },
    emptyList: function (){
      list && list.empty();
    },
    unbind: function() {
      element && element.remove();
    },
    resetActive: function() {
      listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
      active = -1;
    }
  };
};

/**
 * @ignore
 */
$.fn.selection = function(start, end) {
  if (start !== undefined) {
    return this.each(function() {
      if( this.createTextRange ){
        var selRange = this.createTextRange();
        if (end === undefined || start == end) {
          selRange.move("character", start);
          selRange.select();
        } else {
          selRange.collapse(true);
          selRange.moveStart("character", start);
          selRange.moveEnd("character", end);
          selRange.select();
        }
      } else if( this.setSelectionRange ){
        this.setSelectionRange(start, end);
      } else if( this.selectionStart ){
        this.selectionStart = start;
        this.selectionEnd = end;
      }
    });
  }
  var field = this[0];
  if ( field.createTextRange ) {
    var range = document.selection.createRange(),
      orig = field.value,
      teststring = "<->",
      textLength = range.text.length;
    range.text = teststring;
    var caretAt = field.value.indexOf(teststring);
    field.value = orig;
    this.selection(caretAt, caretAt + textLength);
    return {
      start: caretAt,
      end: caretAt + textLength
    }
  } else if( field.selectionStart !== undefined ){
    return {
      start: field.selectionStart,
      end: field.selectionEnd
    }
  }
};

})($j);

