if ( typeof(PM) == 'undefined' ) var PM = {};

/**
 * PM Constants 
 *
 * @base PM
 */
PM.Constants = {
  blankImg: "http://pmcdn.priceminister.com/res/static/0/www/www/215/fb/images/default/structure/blank.gif"
}

/**
 * PM Price Constants 
 *
 * @base PM.Constants 
 */
PM.Constants.Price = {
  nationalPattern:  '(-)?[0-9]{1,3}([ ][0-9]{3})*([,][0-9]{1,2}0*)?',
  pmPattern: '(-)?([0-9])+([,.][0-9]{1,2}0*)?',
  thousandsSeparator: ' ',
  digitsSeparator: ','
}


/**
 * Sponsored links constants
 */
PM.Constants.SL = {
  trackingCodeRegExp: "7[0-9]{3}"
}
PM.Constants.Translation = {
  txt_loader: "En cours ...",
  autocomplete_item_many_results: "{{nb_hits}} résultats",
  autocomplete_item_one_result: "1 résultat",
  autocomplete_item_more_than_10000: "+ de 10 000",
  shop_open_out_header: "Voir ses rayons",
  shop_close_header: "Réduire",
  js_check_length: "Le champ '{{name}}' est limité à {{maxlength}} caractères (il en contient {{length}}).",

  close_clemup: "Fermer la fenêtre", 

  dontForgetToPrintSkybill: "Suite à l'impression du bon de livraison, n'oubliez pas de cliquer sur le bouton bleu \"Bordereau {{mode}}\", puis imprimez et collez le bordereau sur votre colis."
}
