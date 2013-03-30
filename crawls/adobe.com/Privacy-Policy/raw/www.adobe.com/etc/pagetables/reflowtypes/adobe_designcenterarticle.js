
                var dispatcher = adobe.vrbl("reflowDispatcher", adobe.reflow.createDispatcher("width", document));
                
            dispatcher.addLayoutEvent(new adobe.reflow.LayoutEvent("tablet", 0, 960, true));
        
            dispatcher.addLayoutEvent(new adobe.reflow.LayoutEvent("phone", 0, 359, true));
        