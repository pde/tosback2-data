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
    $j('#mapresseAlerts').click(function(event) {
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
	//prevents menu item from closing from share button
    $j('li#mapresse a').click(function(event) {
        event.stopPropagation();
    });

    $j('a#mpLink').click(function(event) {
        event.stopPropagation();
    });
	//prevents menu item from closing from comment connect button
	$j('a#loginForComment').click(function(event) {
        event.stopPropagation();
    });

    $j("#loginForm").submit(function () {

        if ($j('#login').val() == ''
        ||  $j('#password').val() == '') {
            $j('#erreur').html('Veuillez entrer votre nom d\'utilisateur et votre mot de passe');
            $j('#erreur').show();
            return false;
        };

        return true;
    });

    var initMPLike = function() {
        FB.Event.subscribe('edge.create', function(response) {
            var m = response.match(/(\d{2})-(\d+)-[^/]+.php$/);
            if (m) {
                var p = getScriptParameters();
                $j.getJSON(
                    '/mapresse/?controllerName=Recommend&assetType=' + m[1] +'&assetId=' + m[2] + '&recommend_uqid=' + p['recommend_uqid'],
                    function(data) {
                    }
                );
            }
        });
    }

    if (typeof FB != 'undefined') {
        initMPLike();
    } else {
        var oldFbAsync = window.fbAsyncInit;
        if (oldFbAsync) {
            window.fbAsyncInit = function() {
                oldFbAsync();
                initMPLike();
            }
        }
    }
});

/**
 * login et sauvegarde dans mapresse
 */
function storeClient(action, id, nextUrl) {

    if (!isUserLogedIn) {
        if (action == 'store') {
            $j('#nextAction').attr('value', 'store');
            $j('#id').attr('value', id);
        }

        if (nextUrl) {
            $j('#nextUrl').attr('value', nextUrl);
        }

        toggleMenuItem('mapresseLogin','loginCtn', true);

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
        // bugfix, avec Chrome 19.x et Safari 5.x sur Mac OS, l'animation faisait afficher les éléments de façon «random» dans la page
        if ("undefined" == typeof $j.browser.webkit || !$j.browser.webkit) {
            $j('#' + menuContent).slideDown('fast');
        } else {
            $j('#' + menuContent).show();
        }
        $j('#' + menuItem ).addClass('active');
    }
}

/**
 * fermer un élément de menu
 */
function closeAllMenuItem() {
    // bugfix, avec Chrome 19.x et Safari 5.x sur Mac OS, l'animation faisait afficher les éléments de façon «random» dans la page
    if ("undefined" == typeof $j.browser.webkit || !$j.browser.webkit) {
        $j('#loginBar').siblings().slideUp('fast');
    } else {
        $j('#loginBar').siblings().hide();
    }
    $j('#loginBar span').removeClass('active');
}


function getScriptParameters(){
    var param = {};
    
    $j('script').each(function(index, value) {
        var m = /mapresse.js/;
        if (m.test(value.src) && $j(value).html()!=''){
            eval("param = "+$j(value).html());
        }
    });

    return param;
    
}