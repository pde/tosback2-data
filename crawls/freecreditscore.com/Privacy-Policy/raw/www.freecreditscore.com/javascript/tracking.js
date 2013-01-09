function tracking(page, link)
{
  var url = window.location.href;
  var urlParts = url.split("/");
  var imgSrcFolder = "Cobrand/Images/Tracking";
  for (var i = 0; i < urlParts.length; i++)
  {
    if (urlParts[i].match("Member"))
    {
      imgSrcFolder = "../" + imgSrcFolder;
      break;
    }
  }
  var randomNumber = Math.floor(Math.random()*1000000000);
  var imgSrc = imgSrcFolder + "/" + page + "/" + link + ".gif?trackID=" + randomNumber;
  var img = document.createElement("IMG");
  img.setAttribute("src", imgSrc);
  img.setAttribute("width", "0");
  img.setAttribute("height", "0");
  document.body.appendChild(img);
}

function buildTrackingImg(page, link)
{
  var url = window.location.href;
  var urlParts = url.split("/");
  var imgSrcFolder = "Cobrand/Images/Tracking";
  for (var i = 0; i < urlParts.length; i++)
  {
    if (urlParts[i].match("Member"))
    {
      imgSrcFolder = "../" + imgSrcFolder;
      break;
    }
  }
  var randomNumber = Math.floor(Math.random()*1000000000);
  var imgSrc = imgSrcFolder + "/" + page + "/" + link + ".gif?trackID=" + randomNumber;
  var img = document.createElement("IMG");
  img.setAttribute("src", imgSrc);
  img.setAttribute("width", "0");
  img.setAttribute("height", "0");
  return img;
}
	