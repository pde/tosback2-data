function linkCode(obj, values, params)
{
    //defaults
    suite = 'chronedubuild';
    vars = trackvars = trackevents = '';
    ltype = 'o';
    props = ['prop44', 'eVar48'];
    events = [];
    
    //values populate name-data, if missing stop here
    if (!values || values.length == 0) return false;

    //set custom params
    if (typeof(params) == "object")
    {
        //set custom suite is ther is one
        if (params['suite']) suite = params['suite'];        
        
        //set custom vars if there are any
        if (params['props'])
        {
            if (typeof(params['props']) == 'string')
            {
                props = params['props'].split(',');
            }
            else if (typeof(params['props']) == 'string')
            {
                props = params['props'];
            }
            //get rid of the s. preficx if there is one
            if (typeof(params['props']) == 'object')
            {
                for (x in props) props[x] = props[x].replace('s\.', '');
            }
        }

        //set custom event if there is one 
        if (params['events'])
        {
            if (typeof(params['events']) == 'string')
            {
                events = params['events'].split(',');
            }
            else if (typeof(params['events']) == 'object')
            {
                events = params['events'];
            }
            //get rid of the s. preficx if there is one
            if (typeof(events) == 'object')
            {
                for (x in events) events[x] = events[x].replace('s\.', '');
            }
        }
      
        //set custom type if there is one
        if (params['type'])
        {
            if (params['type'] == "d" || params['type'] == "o" || params['type'] == "e")
            {
                ltype = params['type'];
            }            
        }       
    }

    //init suite
    var s = s_gi(suite);
    
    //define init string for prop/evar vars
    if (typeof(props) == 'object' && props.length > 0)
    {
        for (x in props)
        {
            trackvars += props[x];
            if (x < props.length - 1) trackvars += ',';
        }
    }  
    s.linkTrackVars = trackvars;
    
    //define init string for events
    if (typeof(events) == 'object' && events.length > 0)
    {
        for (x in events)
        {
            trackevents += events[x];
            if (x < events.length - 1) trackevents += ',';
        }
    }
    s.linkTrackEvents = trackevents;
    
    //define name-data value
    name = '';
    if (typeof(values) == "string") name = values;
    else
    {
        if (values.length > 0)
        {
            p = [];
            for (x in values)
            {
                if (values[x] != null && values[x].length > 0) p.push(values[x]);
            }
            name = p.join("|");
        }
    }

    //explicitly declare s.props and s.eVars
    prop_eval_str = '';
    if (props.length)
    {        
        for (x in props) prop_eval_str += 's.' + props[x] + ' = ';
        prop_eval_str += '"' + name + '";'
        eval(prop_eval_str);
    }

    //explicityl declare events
    event_eval_str = '';
    if (events.length)
    {        
        for (x in events) event_eval_str += 's.' + events[x] + ' = "' +events[x] + '";';
        eval(event_eval_str);
    }

// alert("SUITE: "+suite+" \nType: "+ltype+"\nTrackvars: "+trackvars+"\nTrackevents: "+trackevents+"\nProps/Evars: "+prop_eval_str+"\nEvents: "+event_eval_str+"\nName: "+name);

    //execute track links method
    s.tl(obj, ltype, name);
}

/*DEPRECATED
function updateOmniture(type, name, value, execute)
{
	if (type && (name || value))
	{		
		var e, t, n, v;
		e = (execute) ? true : false; 
		t = type;
		n = (name) ? name : "";
		v = (value) ? value : "";		
	 	$.ajax({
	   		type: "GET",
	   		url: "omniture/omniture.php",
	   		data: {"update":true, "execute":e, "type":t, "name":n, "value":v},
	   		dataType: "json",	   		
	   		complete: function(msg){
			   alert(msg.responseText);
	   		}
		 });
	}
}
*/
