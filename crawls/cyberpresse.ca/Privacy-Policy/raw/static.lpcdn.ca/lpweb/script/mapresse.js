/**
 * when the DOM is ready to be manipulated
*/
 $j(document).ready(function() {
    $j('html').click(function() {
        // Hide the menus if visible
        closeAllMenuItem();
    });

    $j('#mapresseLogin').click(function(event){
        event.stopPropagation();
    });

    $j('#mapresseUser').click(function(event) {
        event.stopPropagation();
    });

    $j('#mapresseNews').click(function(event) {
        event.stopPropagation();
    });

    $j('#profile').click(function(event) {
        event.stopPropagation();
    });

    $j('#newsCtn').click(function(event) {
        event.stopPropagation();
    });

    $j('#loginCtn').click(function(event) {
        event.stopPropagation();
    });

    $j('li#mapresse a').click(function(event) {
        event.stopPropagation();
    });

    $j('a#mpLink').click(function(event) {
        event.stopPropagation();
    });

    $j("#loginForm").submit(function () {

        if ($j('#login').val() == ''
        ||  $j('#password').val() == '') {
            $j('#erreur').html('Veuillez entrer votre nom d\'utilisateur et un mot de passe');
            $j('#erreur').show();
            return false;
        };

        return true;
    });
});

/**
 * login et sauvegarde dans mapresse
 */
function storeClient(action, id, nextUrl) {

    if (!isUserLogedIn) {
        if (action == 'store') {
            $j('#loginForm').append('<input type="hidden" name="nextAction" id="nextAction" value="store" />');
            $j('#loginForm').append('<input type="hidden" name="id" id="id" value="'+id+'" />');
        }
        if (nextUrl) {
            $j('#loginForm').append('<input type="hidden" name="nextUrl" value="' + nextUrl + '" />');
        }

        toggleMenuItem('mapresseLogin','loginCtn', true);
        //$j('#mapresseLogin').click();

        return false;
    }

    if (action == 'storeContribution') {
        return false;
    }
}

/**
 * Comportement de la barre de login : affichage
 *
 * ouvrir ou refermer un élément de menu en fonction de sont statut au moment du click
 */
function toggleMenuItem(menuItem, menuContent, displayMsg) {

    if(true == displayMsg) {
        $j('#loginMsg').show();
    }
    else {
        $j('#loginMsg').hide();
    }

    var isMenuItemActive = $j('#'+menuItem).attr('class') == 'active';

    closeAllMenuItem();

    if (!isMenuItemActive) {
        $j('#' + menuContent).slideDown('fast');
        $j('#' + menuItem ).addClass('active');
    }
}

/**
 * fermer un élément de menu
 */
function closeAllMenuItem() {
    $j('#loginBar').siblings().slideUp('fast');
    $j('#loginBar span').removeClass('active');
}