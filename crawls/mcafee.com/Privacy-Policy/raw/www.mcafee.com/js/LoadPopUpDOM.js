function LoadPopUpDOM(){
    var win = null;
    function newWindow(mypage,myname,w,h,features) {
      var winl = (screen.width-w)/2;
      var wint = (screen.height-h)/2;
      if (winl < 0) winl = 0;
      if (wint < 0) wint = 0;
      var settings = 'height=' + h + ',';
      settings += 'width=' + w + ',';
      settings += 'top=' + wint + ',';
      settings += 'left=' + winl + ',';
      settings += features;
      win = window.open(mypage,myname,settings);
      win.window.focus();
    }

    $(function() {
        var getWidth = screen.width;
        var getHeight = screen.height;
        
        $('.fulScreenPopup').click(function() {
                var fsPopup = $(this).attr('href');
                newWindow(fsPopup,'', getWidth, getHeight,'');
                return false;
        });
        
        var chatPopup = $('.chatPopup').attr('href');
        
        $('.chatPopup').click(function() {
                newWindow(chatPopup,'','495','300','');
                return false;
        });
        
        $('.bioPopup').click(function() { 
                var bioPopup = $(this).attr('href');
                newWindow(bioPopup,'','676','450','scrollbars=yes');
                return false;
        });
        
        $('.demoPopup').click(function() {
                var demoPopup = $(this).attr('href');
                newWindow(demoPopup,'','798','500','');
                return false;
        });
        
        $('.tutorialPopup').click(function() {
                var tutorialPopup = $(this).attr('href');
                newWindow(tutorialPopup,'','960','520','');
                return false;
        });             
        
        $('.videoPopup').click(function() {
                var videoPopup = $(this).attr('href');
                newWindow(videoPopup,'','700','394','');
                return false;
        });     
        
        $('.podcastPopup').click(function() {
                var podcastPopup = $(this).attr('href');
                newWindow(podcastPopup,'','390','400','');
                return false;
        });
        
        
    $(function ()
    {
        $("a").click(function (event)
        {
        var UserClickedURL = $(this).attr("href");
        var UserTarget = $(this).attr("target");
        
        if( (UserClickedURL != null) 
          &&(UserClickedURL != "undefined") 
          &&(UserClickedURL != "")
          )          
          { 
                if(UserClickedURL.substring(0,4) != "#tab")
                {  
                    if(getTargetHyprlink(UserClickedURL, UserTarget))
                    {
                       $(this).attr("target", "_self");
                    }else
                    {
                       $(this).attr("target", "_blank");
                    }
                }
          }
            
        });
    });
    
    // The line below is for the banner arrow links
    //$('.standardBanner a').after('<img src="/img/arrow-link.png" width="21" height="17" />'); 
 })};

    function getTargetHyprlink(hyprlink, Target)
    {
    var booltarget = false;
        for (iCnt in ArryMcAfeeDomains)
        { 
               if(hyprlink.indexOf(ArryMcAfeeDomains[iCnt])!= -1)
               {
                    if(Target == null)
                    {
                     booltarget = getTargetEndWith(hyprlink,"McAfee");
                    }else if(Target != "_blank" && Target != "_BLANK")
                    {
                     booltarget = getTargetEndWith(hyprlink,"McAfee");
                    }
                     return booltarget;
               }
               else
               {
                     booltarget = getTargetEndWith(hyprlink,"NMcAfee");
               }
               
        }
    return booltarget;
    }



function getTargetEndWith(hyprlinkURL,var1)
{
var boolendwithTarget = true;
//var patt1=  /^\/.*$/;
//var patt2=  /^\\.*$/;

    if((hyprlinkURL.substring(0,1) == "/") || (hyprlinkURL.substring(0,1) == "\\"))
    {
           for (jCnt in ArryEndsWith)
            { 
             if(hyprlinkURL.indexOf(ArryEndsWith[jCnt])!= -1)
              {
                boolendwithTarget = false;      
              }
            }
    }else if((hyprlinkURL.indexOf("http://")!= -1) && var1 == "NMcAfee")
    { 
        boolendwithTarget = false; 
    }
    else if((hyprlinkURL.indexOf("https://")!= -1) && var1 == "NMcAfee")
    { 
        boolendwithTarget = false; 
    }else if((hyprlinkURL.indexOf("www.")!= -1) && var1 == "NMcAfee")
    { 
        boolendwithTarget = false; 
    }else if((hyprlinkURL.indexOf("http://www.")!= -1) && var1 == "NMcAfee")
    { 
        boolendwithTarget = false; 
    }
    
 return boolendwithTarget;
}