
        var sweepTimer = null;        
        var usrClicked = 0;
        function showOnlineSweepStakes(isUsrClicked) {           
            usrClicked = isUsrClicked;
            $('.trigger').hide();
            $('.sweepClose').show();
            $('#sweepPanel').innerHeight = 300;            
            $('.panel').slideDown('fast'); 
        }
        function hideOnlineSweepStakes() {
            $('.panel').slideUp('fast',dispSweepHeader);
            $('.sweepClose').hide();
            clearError();
           
        }
        function dispSweepHeader() {
            usrClicked = 0;
            $('.sweepPanel').innerHeight = 35;
            $('.trigger').show();
            $('#panel').hide();
            clearError();
        }
        function setSweepTimer() {            
            if (null != sweepTimer) {
                window.clearTimeout(sweepTimer);
            }
            if (usrClicked == 0) {
                if ($('.panel').is(':visible')) {
                    sweepTimer = window.setTimeout(hideOnlineSweepStakes, 5000);
                }
            }
            if (usrClicked == 1) {
                if ($('.panel').is(':visible')) {
                }
            }
            
        }

        function removeSweepTimer() {

            if (null != sweepTimer) {
                window.clearTimeout(sweepTimer);
            }
            sweepTimer = null;
        }

       
        $(document).ready(function() {
        	var sView=$.cookie("sweepsHide");
			if(sView == 'true'){
				$('.trigger').hide();
				$('.sweepClose').hide();
			}else{
	            $('.trigger').click(function() {showOnlineSweepStakes(1);});
	            $('.sweepClose').click(hideOnlineSweepStakes);
	            $('.panel').mouseenter(removeSweepTimer);
	            $('.panel').mouseleave(setSweepTimer);
	            if(document.location.href.indexOf("Home_") != -1)
	            {
		            showOnlineSweepStakes(0);
		            setSweepTimer();
		        }
		        else
		        {
				$('.sweepClose').hide();
				$('.trigger').show();
				}   		    
			}
		     
        });