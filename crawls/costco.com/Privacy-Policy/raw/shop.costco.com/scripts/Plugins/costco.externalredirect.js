/*
This script runs on the Footer and creates Timed Redirect Modal window
*/

jQuery(function() {

    //jQuery("a[title=Investor Relations]").click(function(event) {
    jQuery("a[ExternalRedirect=Y]").click(function(event) {

        if (this.getAttribute("ExternalRedirect") == "Y") {

            //Get the hiden display prompt flag, which determines whether we need to display the Modal window. 
            var messagePrompt = document.getElementById("hdnDisplayPromptExternal").value;

            //Get the time delay from the configuration file.
            var Timer = document.getElementById("hdnTimer").value;

            // If message prompt is 'True' show the modal window.
            if (messagePrompt == "True") {
                //Style applied to the modal.
                jQuery("div#LeavingCostcoDialog").dialog({
                    autoOpen: false,
                    bgiframe: true,
                    width: 400,
                    modal: true,
                    closeOnEscape: false,
                    resizable: false
                });

                jQuery("div#LeavingCostcoDialog").dialog("open");
                jQuery(".ui-dialog-titlebar").hide();
                jQuery("div.dialogContent").corners("10px");

                jQuery("div#LeavingCostcoDialog").show();

                event.preventDefault();
                Href = this.href;
                Target = this.target;
               

                // Call the settimeout and delay the modal window based on the Timer value
                setTimeout(function() {

                    TimedRedirect(Target, Href);

                }
					, Timer);

            }
        }
    });


    //This function will work after the time delay configured in the configuration file. The page will redirect the Href.
    function TimedRedirect(Target, Href) {
        var RedirectWindow = window.open(Href, Target);
        if (RedirectWindow) {
            RedirectWindow.focus();
        }
        jQuery("div#LeavingCostcoDialog").dialog("close");
    }


});

      
            
      
            
            



