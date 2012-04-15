function hasMetaDataSet(name, contentValues)
{
    var metas = document.getElementsByTagName("meta")
    var found = false;
    for (var i = 0; i < metas.length; i ++)
    {
	var meta = metas[i];
	if (meta.name.toLocaleUpperCase() == name.toLocaleUpperCase())
	{
            var content = meta.getAttribute("content");
            contents = content.split(",");
            for (var j = 0; j < contents.length; j ++)
            {
		var c = contents[j].replace(/^\s*/, "").replace(/\s*$/, "").toLocaleUpperCase();
		for (var k = 0; k < contentValues.length; k ++)
		{
		    var i = contentValues[k].toLocaleUpperCase();
		    if (c == i)
		    {
			found = true;
			break;
		    }
		}
		if (found)
		{
                    break;
		}
            }
	}
	if (found)
	{
            break;
	}
    }
    return found;
}