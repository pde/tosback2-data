var currentEnvironment = s_account;

// Call from page 
function omn_trackLinkClick( p_target, p_prop, p_propValue, p_identifier )
{
	s.linkTrackVars = p_prop; 
	s[p_prop] = p_propValue;
	s.tl( p_target, 'o', p_identifier );
}

// For feature clicks
function omn_featureClick( p_target, p_propValue, p_identifier )
{
	omn_trackLinkClick( p_target, 'prop4', p_propValue, p_identifier );
	omn_trackLinkClick( p_target, 'eVar18', p_propValue, p_identifier );
}

/**
 * Helper method to generate a unique ID for omniture serialized tracking
 */
function omn_getUID()
{
	uid = 0;
	theDate = new Date();
	
	uid = theDate.getFullYear() + '' +
          theDate.getMonth() + '' +
          theDate.getDate() + '' +
          theDate.getTime();
	
	return uid;
}