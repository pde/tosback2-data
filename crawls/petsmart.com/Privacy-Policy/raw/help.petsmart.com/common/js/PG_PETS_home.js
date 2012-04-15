function showTab(thisTab,tabId)

{

	numTabs = 3;

	i = 1;

	while (i <= numTabs)

	{

		curImage = "homeTabs" + i;

		curContent = "homeTab" + i;

		if (i == thisTab)

		{

			document.getElementById(curImage).src = "http://includes.petsmart.com/common/images/" + curImage + "On.gif"

			document.getElementById(curContent).style.display = "block";

		}

		else if (i != thisTab)

		{

			document.getElementById(curImage).src = "http://includes.petsmart.com/common/images/" + curImage + "Off.gif"

			document.getElementById(curContent).style.display = "none";

		}

		i++;

	}

}


if (document.images)

{

	//home tabset preloading

	homeTabs1_off = new Image();	homeTabs1_off.src = "http://includes.petsmart.com/common/images/" + "homeTabs1Off.gif";

	homeTabs2_off = new Image();	homeTabs2_off.src = "http://includes.petsmart.com/common/images/" + "homeTabs2Off.gif";

	homeTabs3_off = new Image();	homeTabs3_off.src = "http://includes.petsmart.com/common/images/" + "homeTabs3Off.gif";


	homeTabs1_on = new Image();		homeTabs1_on.src = "http://includes.petsmart.com/common/images/" + "homeTabs1On.gif";

	homeTabs2_on = new Image();		homeTabs2_on.src = "http://includes.petsmart.com/common/images/" + "homeTabs2On.gif";

	homeTabs3_on = new Image();		homeTabs3_on.src = "http://includes.petsmart.com/common/images/" + "homeTabs3On.gif";

}