var omniture={};

omniture.swap_vars_and_ping = function(vars) {
    try {
        googleAnalytics.do_googleAnalytics(vars)
    } catch(e) {}
}
