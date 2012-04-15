YAHOO.util.Event.onDOMReady(function () {
     var ua = YAHOO.env.ua,
                oAnim;  // Animation instance

            function onSubmenuBeforeShow(p_sType, p_sArgs) {
                var oBody = null,
                    oElement = null,
                    oShadow = null,
                    oUL = null;

                if (this.parent) {
                    oElement = this.element;
                    oShadow = oElement.lastChild;
                    oShadow.style.height = "0px";

                    if (oAnim && oAnim.isAnimated()) {
                        oAnim.stop();
                        oAnim = null;
                    }

                    oBody = this.body;

                    //  Check if the menu is a submenu of a submenu.
                    if (this.parent &&
                        !(this.parent instanceof YAHOO.widget.MenuBarItem)) {
                        if (ua.gecko || ua.opera) {
                            oBody.style.width = oBody.clientWidth + "px";
                        }

                        if (ua.ie == 7) {
                            oElement.style.width = oElement.clientWidth + "px";
                        }
                    }

                    oBody.style.overflow = "hidden";
                    oUL = oBody.getElementsByTagName("ul")[0];
                    oUL.style.marginTop = ("-" + oUL.offsetHeight + "px");
                }
            }

            function onTween(p_sType, p_aArgs, p_oShadow) {
                if (this.cfg.getProperty("iframe")) {
                    this.syncIframe();
                }

                if (p_oShadow) {
                    p_oShadow.style.height = this.element.offsetHeight + "px";
                }
            }

            function onAnimationComplete(p_sType, p_aArgs, p_oShadow) {
                var oBody = this.body,
                    oUL = oBody.getElementsByTagName("ul")[0];

                if (p_oShadow) {
                    p_oShadow.style.height = this.element.offsetHeight + "px";
                }

                oUL.style.marginTop = "";
                oBody.style.overflow = "";

                //  Check if the menu is a submenu of a submenu.
                if (this.parent &&
                    !(this.parent instanceof YAHOO.widget.MenuBarItem)) {

                    // Clear widths set by the "beforeshow" event handler
                    if (ua.gecko || ua.opera) {
                        oBody.style.width = "";
                    }

                    if (ua.ie == 7) {
                        this.element.style.width = "";
                    }
                }
            }

            function onSubmenuShow(p_sType, p_sArgs) {
                var oElement,
                    oShadow,
                    oUL;

                if (this.parent) {
                    oElement = this.element;
                    oShadow = oElement.lastChild;
                    oUL = this.body.getElementsByTagName("ul")[0];

                    oAnim = new YAHOO.util.Anim(oUL,
                        { marginTop: { to: 0 } },
                        0.5, YAHOO.util.Easing.easeOut);

                    oAnim.onStart.subscribe(function () {
                        oShadow.style.height = "100%";
                    });

                    oAnim.animate();

                    if (YAHOO.env.ua.ie) {
                        oShadow.style.height = oElement.offsetHeight + "px";
                        oAnim.onTween.subscribe(onTween, oShadow, this);
                    }

                    oAnim.onComplete.subscribe(onAnimationComplete, oShadow, this);
                }
            }

    /**
     * This is the top menu, to set it where it should, you need to put
     * the position: static as by default it sets position: absolute and
     * we don't want it that way.
     */
    var oMenuBar = new YAHOO.widget.MenuBar(
                                        "top_menu1",
                                            {
                                                position: 'static',
                                                autosubmenudisplay: true,
                                                hidedelay: 750,
                                                showdelay: 0,
                                                lazyload: true
                                            }
                                        );
    oMenuBar.subscribe("beforeShow", onSubmenuBeforeShow);
    oMenuBar.subscribe("show", onSubmenuShow);
    oMenuBar.render();
});