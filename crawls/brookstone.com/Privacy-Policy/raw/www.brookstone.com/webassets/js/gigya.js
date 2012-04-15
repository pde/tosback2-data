function publishUserAction(userAct) {

    var params =   
    {  
        userAction:userAct, // including the UserAction object  
        scope: 'internal', // the Activity Feed will be published internally (site scope) only (not to social networks).  
        privacy: 'public' //,  
      //  callback:publishAction_callback  
    };  
    gigya.services.socialize.publishUserAction(conf, params);
}

function showReactionsBarUI(userAct) {

  userAct.linkBack = computeAbsoluteURL(userAct.linkBack);

  var params = {   
	  barID: 'myID',  
	  containerID:'textReactionsDiv',  
	  reactions:textReactions,  
	  //headerText:'You have reacted on this post',  
	  bodyText:'Share it on your favorite social networks:',  
	  userAction:userAct,  
	  showCounts:'top',
	  context:userAct,
	  onSendDone:onSendDone,  
	  onError:onError
  };  

  gigya.services.socialize.showReactionsBarUI(conf, params);
}
/*
function showShareUI(title, description, linkBack, imageURL) {  

    var act = new gigya.services.socialize.UserAction();  

    linkBack = computeAbsoluteURL(linkBack);
    imageURL = computeAbsoluteURL(imageURL);
    
    act.setUserMessage("Your comment here...");  
    act.setTitle(title);  
    act.setDescription(description);  
    act.setLinkBack(linkBack);  

    if ( !isEmptyVar(imageURL) ) {
    	act.addMediaItem( {   
    	    type: 'image',    // Type of the media (image/flash/mp3)  
    	    src: imageURL,  
    	    href: linkBack    // URL to redirect the user when he clicks the image  
    	 });
    }
    
    var params =   
    {  
        userAction: act  // The UserAction object enfolding the newsfeed data.    
        ,operationMode: 'autoDetect'// Opens the Share Plugin either in Simple or Multiselect mode according to the user connection status.   
        ,snapToElementID: "btnShare" // Snaps the Simple Share Plugin to the share button  
        ,onError: onError  // onError method will be summoned if an error occurs.   
        ,onSendDone: onSendDone // onError method will be summoned after   
                            // Gigya finishes the publishing process.  
        ,context: act           
        ,showMoreButton: true // Enable the "More" button and screen  
        ,showEmailButton: true // Enable the "Email" button and screen
        ,enabledProviders:twitter,facebook  

    }

    gigya.services.socialize.showShareUI(conf, params);  
}  
  */

function onError(event) {  
    alert('An error has occured' + ': ' + event.errorCode + '; ' + event.errorMessage);  
}  

function onSendDone(event) {  
    publishUserAction( event.context );
}

// Textual reactions   
var textReactions=[  
{  
    text: 'Inspiring',  
    ID: 'inspiring',  
    iconImgUp:'http://cdn.gigya.com/gs/i/reactions/icons/Inspiring_Icon_Up.png',  
    iconImgOver:'http://cdn.gigya.com/gs/i/reactions/icons/Inspiring_Icon_Down.png',  
    tooltip:'This item is inspiring',  
    userMessage: 'Inspiring!',  
    headerText:'Your reaction to this post is \'Inspiring\''  
}  
,{  
    text: 'Innovative',  
    ID: 'innovative',  
    iconImgUp:'http://cdn.gigya.com/gs/i/reactions/icons/Innovative_Icon_Up.png',  
    iconImgOver:'http://cdn.gigya.com/gs/i/reactions/icons/Innovative_Icon_Down.png',  
    tooltip:'This item is innovative',  
    userMessage: 'This is innovative',  
    headerText:'Your reaction to this post is \'Innovative\''  
}  
,{  
    text: 'LOL',  
    ID: 'lol',  
    iconImgUp:'http://cdn.gigya.com/gs/i/reactions/icons/LOL_Icon_Up.png',  
    iconImgOver:'http://cdn.gigya.com/gs/i/reactions/icons/LOL_Icon_Down.png',  
    tooltip:'This made me LOL',  
    userMessage: 'LOL!',  
    headerText:'Your reaction to this post is \'LOL\''  
}  
,{  
    text: 'Amazing',  
    ID: 'amazing',  
    iconImgUp:'http://cdn.gigya.com/gs/i/reactions/icons/Amazing_Icon_Up.png',  
    iconImgOver:'http://cdn.gigya.com/gs/i/reactions/icons/Amazing_Icon_Down.png',  
    tooltip:'This item is amazing',  
    userMessage: 'This is amazing!',  
    headerText:'Your reaction to this post is \'Amazing\''  
}  
,{  
    text: 'Geeky',  
    ID: 'geeky',  
    iconImgUp:'http://cdn.gigya.com/gs/i/reactions/icons/Geeky_Icon_Up.png',  
    iconImgOver:'http://cdn.gigya.com/gs/i/reactions/icons/Geeky_Icon_Down.png',  
    tooltip:'This item is geeky',  
    userMessage: 'This is geeky!',  
    headerText:'Your reaction to this post is \'Geeky\''  
}  
];


String.prototype.startsWith = function(str){
	return (this.match("^"+str)==str);
}

function isEmptyVar( v ) {
	return ( typeof(v)==='undefined' || v===null || v.length==0 || v==="null" );
}

function computeAbsoluteURL(pURL) {
	if ( !pURL.startsWith("http") ) {
		pURL = pURL.replace(/&amp;/g,"&");
		pURL = window.location.protocol+'//'+window.location.host+pURL;
	}
	return pURL;
}

//Display a status message according to the response from publishUserAction.  
function publishAction_callback(response)  
{  
    switch (response.errorCode )  
    {  
        case 0:  
            document.getElementById('status').style.color = "green";  
            document.getElementById('status').innerHTML =   
                    "Activity Feed item published, and will be presented shortly on the Activity Feed Plugin.";  
            break;  
        default:  
            document.getElementById('status').style.color = "red";  
            document.getElementById('status').innerHTML =   
                    "Unable to send Feed item. status="   
                    + response.errorCode + "; " + response.errorMessage + ";<br />"   
                    + "Please make sure you are logged in to Gigya. You may log in using the Login Plugin inside the 'Me' tab above" ;  
    }  
}  


