	var current_onfocus_obj =  new String("");
	var current_onfocus_obj_classname =  new String("");
	
	function rollover(ref, classRef)
	{
	if (classRef.indexOf("-over") != -1)
		{current_onfocus_obj = ref;}
	else
		{current_onfocus_obj = ""; }
	
	eval(ref).className = classRef;
	current_onfocus_obj_classname = classRef;
	}
	
	function keyover()
	{
	if (current_onfocus_obj != "")
		{ 
		if (current_onfocus_obj_classname.indexOf("menu") != -1)
			{eval(current_onfocus_obj).className = current_onfocus_obj_classname.substr(0,6) + "hyperlinked";}
		else
			{eval(current_onfocus_obj).className = current_onfocus_obj_classname.substr(0,7) + "link";}
		current_onfocus_obj = ""; }

	}
