///////////////
//private functions and variables
var sjCallbacks=new Object();//!global variable MUST be created !
var sjErrCallbacks=new Object();//!global variable MUST be created !


 function setOptions(chosen,ID) {
      s7zoom.setImage(S7ConfigClient.isRoot + company + '/' + chosen);
		document.getElementById("cat-prod-flash-alt-views").innerHTML=dumpmyProps(imagset[ID]);
    }


/*
parseImageSets

A function used to split a comma separated list of image sets into an array for reference to the viewer and json calls

input: a comma seperated list of imagesets referencing only the set (not the company)
output:  none, this function writes to a globally defined object imagset_test
*/

function parseImageSets(sets, qv)  {
var b = sets;
b += "";  //for some reason JavaScript doesn't like splitting the return from getParam on a comma, but it works fine after performing a string operation on it.
  if(qv != null)
   {
      QVimagset_test = b.split(',');
   }
   else{
      imagset_test = b.split(',');  //split the list of imagesets on each comma and return each individual imagest to an index within the globally declared imagset_test Object
  }
return;
}

/*
initializeJSON

A function used to make the initial calls to load imageset properties via JSON from the image server and perform the necessary steps to parse that data into useful objects for reference by the page

input:  string of comma separated Image Sets
output:  None
usage notes:  In this code the initializeJSON method should be called when declaring the image argument that will be passed to the viewer
				  the function will return a comma separated list of company/imagesets that can then be passed to the viewer, and will as side
				  effect perform the other necessary actions in order to initialize the page with JSON support
*/

function initializeJSON(set, qv){
   scene7Ready = 0; // reset scene7state.
   scene7Count = 0; // reset the count

   parseImageSets(set, qv);  //Break out comma seperated list of imagesets to the globally defined imagset_test object
   if(qv != null)
   {
             var setCount=QVimagset_test.length-1;  //variable to store how many sets were passed to the viewer

         //dynamically generate parent swatch images based on number of sets passed to the page in the query string

         for (var i = 0; i <= setCount; i++) {  //For loop that executes as many times as there are imagesets declared to the viewer

         /*
           Generate the proper image in the page with a javascript call to the function that changes out the image through the setColor function
         */
         parentSwatches += '<a href="javascript:setOptions(' + "'" + QVimagset_test[i] + "'," + i + ')">' + '<img src="' + S7ConfigClient.isRoot + company + '/' + QVimagset_test[i] + '?wid=50&hei=50&crop=1000,1000,50,50" border=0 alt=""/>' + '</a>';
         QVimageNames[i] = QVimagset_test[i];
      }

      for (var i = 0; i <= setCount; i++) {  //this code makes JSON requests to the image server to retrieve the images for each set passed to the page and load them into the same array for reference by the viewer
          loadimagset(qv, company + '/' + QVimagset_test[i],i);
       }
   }
   else{
         var setCount=imagset_test.length-1;  //variable to store how many sets were passed to the viewer

         //dynamically generate parent swatch images based on number of sets passed to the page in the query string

         for (var i = 0; i <= setCount; i++) {  //For loop that executes as many times as there are imagesets declared to the viewer

         /*
           Generate the proper image in the page with a javascript call to the function that changes out the image through the setColor function
         */
         parentSwatches += '<a href="javascript:setOptions(' + "'" + imagset_test[i] + "'," + i + ')">' + '<img src="' + S7ConfigClient.isRoot + company + '/' + imagset_test[i] + '?wid=50&hei=50&crop=1000,1000,50,50" border=0 alt=""/>' + '</a>';
         imageNames[i] = imagset_test[i];
      }

      for (var i = 0; i <= setCount; i++) {  //this code makes JSON requests to the image server to retrieve the images for each set passed to the page and load them into the same array for reference by the viewer
          loadimagset(qv, company + '/' + imagset_test[i],i);
       }
   }
return;

} //End Initialize JSON


function sjGetResponseLocal(inReq, inImg, inCallback, inErrCallback) {

	var tempi = inImg.indexOf("?");
	var tempmod = "";
	if(tempi >= 0){
		tempmod = inImg.substring(tempi+1);
		inImg = inImg.substring(0,tempi);
	}

	var urljson = S7ConfigClient.isRoot + '/' + inImg + '?' + inReq;

	if (tempmod){
		urljson += '&' + tempmod;

	}

	var id = sjHashCode(urljson);
	urljson += '&id=' + id;
	if (typeof inCallback != 'undefined'){
		sjCallbacks[id] = inCallback;
	}
	if (typeof inErrCallback != 'undefined'){
		sjErrCallbacks[id] = inErrCallback;
	}
	//document.write("<script language='javascript' src='" + urljson + "'><\/script>");
   $.getScript(
		urljson,
		function() {
			scene7Count++;
			if(scene7Count == scene7FinishCount)
			{ appendS7(); }
		}
	);
}

function s7jsonResponse(inArg, inId) {
	sjCallbacks[inId](inArg);
}

function s7jsonError(inArg, inId) {
	if (typeof sjErrCallbacks[inId] != 'undefined'){
		sjErrCallbacks[inId](inArg);
	}else{
		alert(inArg.message);
	}
}

function sjDebug(inPsResponse, inJsonResponse, inPsResponseParserName, inPsRequest) {
}

function sjHashCode(d) {//unix style
	if (!d || d=="") return 1;
	var h=0,g=0;
	for (var i=d.length-1;i>=0;i--) {
		var c=parseInt(d.charCodeAt(i));
		h=((h << 6) & 0xfffffff) + c + (c << 14);
		if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
	}
	return h;
}

function loadimagset(qv, inURL,isetid) {
	sjGetResponseLocal(
		'req=imageset,json',
		inURL,
		function(inArg) {
         if(qv != null){
              QVimagset_test[isetid]=inArg;
         }
         else
			imagset_test[isetid]=inArg;
		},
		function(inArg) {
			alert('failed loading imageset for [' + inURL + ']: ' + inArg.message);
		}
	);
}

function dumpmyProps(obj) {
	var i ="";
      var x=0;
      var y=0;
      var z=0;
      var altView="";
      var retstr="";
 	for (i in obj){
            x=obj[i].indexOf(";",0);
            y=obj[i].indexOf(",",0);
            if (y==-1) {
                y=obj[i].length;
            }
            while (x>0)
            {
                z++;
                altView=obj[i].substring(x+1,y);
                altView=S7ConfigClient.isRoot + '/' +altView;
                altImageURL[z]=altView;
                retstr=retstr + '<a href="javascript:s7zoom.setImage(altImageURL[' + z + '])">';
                if( document.getElementById("cat-prod-flash-alt-views") != null )
                  {  retstr=retstr + '<img src="' + altView + '?wid=54&hei=64" alt="" />'; }
                else if( document.getElementById("cat-alt-alt-img-wrapper") != null )
                  { retstr=retstr + '<img src="' + altView + '?wid=43&hei=50" alt=""/>'; }
                else if( document.getElementById("cat-ens-alt-img-con") != null)
                  { retstr=retstr + '<img src="' + altView + '?wid=41&hei=86" alt=""/>'; }
                else
                  { retstr=retstr + '<img src="' + altView + '?wid=43&hei=50" alt=""/>'; }

               retstr=retstr + '</a>';

                x=obj[i].indexOf(";",y);
                y=obj[i].indexOf(",",y+1);
                if (y==-1) {
                    y=obj[i].length;
                }
            }
	}

	return retstr;
}


/*This function takes an Object of imageset JSON responses and steps through the whole set to count how many individual images are in each imageset
Input:  An Object type containing JSON imageset information for all sets in the page, in the order that they are passed to the viewer
Output:  temp_index an array of ints that correspond to how many images are in each imageset
*/

function countAltsinSets(obj) {

	  var i ="";  //Iterator for the main for loop
      var x=0;  // conditional variable for the while loop is always set as the index of the next semi colon (indicating another image in the image set) in the json response currently evaluated
      var y=0;  // variable set to the index of the next comma in the json response evaluated
      var z=-1;

      var temp_index = new Array();

      for (var j=0; j <= obj.length; j++) {  //for j loop stepping through each index in the Object

      for (i in obj[j]){  //for i loop stepping through each character in each index of the Object

            x=obj[j][i].indexOf(";",0);        //  Look for the first occurence of ; which denotes a swatch image

            y=obj[j][i].indexOf(",",0);        //  Look for the first occurence of , which denotes an alternate image
           if (y==-1) { //Conditional                        //  If there are no specified swatch images
                y=obj[j][i].length;              //  Set the y index to the end of the array
            } //end conditional

            while (x>0)                       //Start a while loop to go through each imageset list loop is active as long as there's a , in the json response denoting that another image follows
            {//Begin While

                z++;                             //Increment the counter that's used to reference the position in the altImageUrl array

                x=obj[j][i].indexOf(";",y);                    //x is incremented to the next occurence of a comma that comes after the occurence of a semi-colon.  If there is no other comma then kick out of the while loop and return
                y=obj[j][i].indexOf(",",y+1);
                if (y==-1) {//conditional
                    y=obj[j][i].length;
                } //end conditional

            } //End while
	temp_index[j] = z +1;                     //after kicking out of the while loop (meaning there are no more alternate images) write the amount of iterations to an index in the returning array
     z=-1;    //reset the iterator to proceed to the next index of the Object in the for loop

	} //end for i loop

	}  //End for j loop

     return temp_index;
}  //End Function

// s7 stuff ------------------
var company="expressfashion";
var scene7Count = 0;
var scene7FinishCount = 0;
var s7zoom = new Object();

var imagesets;
var imagset_test = new Object();
var QVimagset_test = new Object();
var imagset = new Object;
var altImageURL = new Object();
var parentSwatches;
var imageNames = new Array();
var QVimageNames = new Array();
var imagset_index = new Array();