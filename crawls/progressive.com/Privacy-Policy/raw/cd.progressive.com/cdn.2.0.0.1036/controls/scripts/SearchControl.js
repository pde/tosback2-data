function checkSearchValue(source, arguments)
{
	var value = arguments.Value;
	value = arguments.Value.replace(/^\s*|\s*$/g,"");
	if ((value == "Search/Keyword"))
		arguments.IsValid = false;
	else
		arguments.IsValid = true;
}