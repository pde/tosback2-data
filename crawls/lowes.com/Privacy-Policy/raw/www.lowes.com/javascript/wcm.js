/*
 * wcm.js
 * Javascript that is used on the WCM pages of the Lowes.com web site.
 * 
 * Copyright Lowes, Inc.
 */

var lowes=window.lowes || {};
//var errorMsgs = new Array();
lowes.wcm={
    
//=========================================================================
    init:function(){
//        lowes.wcm._setupCalculators();
        lowes.wcm._setupImageGallery();
        lowes.wcm._setupAdditionalImagesAccordion();
        lowes.wcm._setupAnchorLinks();
    },
//=========================================================================
//    _setupCalculators:function(){
//        var $calculator = dojo.query("div#calculator_body");
//        //if there is no calculator div - end the function
//        if (!$calculator) return;
//        // find the fields
//        var $textfields = dojo.query("div#calculator_body input[type='text']");
//        var $clearbutton = dojo.query("div#calculator_body input[type='button']");
//        var $submitbutton = dojo.query("div#calculator_body input[type='submit']");
//        var error = dojo.byId('calc-error');    
//        var clear = dojo.byId('clear-calc');
//        var submit = dojo.byId('calculate');
//        var result = dojo.byId('result');
//        
//        
//        clearcalcfields();
//        validation();
//        
//            //if the clear button is clicked, clear all fields
//            $clearbutton.onclick(function(e){
//                clearcalcfields();
//            });
//        //=================================================
//        // calculate values
//        dojo.query("div#calculator_body input[type='submit']").onclick(function(e) {
//            //get the calculator type from the parent node
//            var calctype = this.parentNode.parentNode.id;
//            switch(calctype){
//                //default - do nothing
//                default :
//                    return;
//                //begin paint ===================================================
//                case 'paint' :
//                    var rlength = parseFloat($textfields[0].value);
//                    var rwidth = parseFloat($textfields[1].value);
//                    var rheight = parseFloat($textfields[2].value);
//                    var rmoulding = parseFloat($textfields[3].value);
//                    var rdoors = parseInt($textfields[4].value);
//                    var rwindows = parseInt($textfields[5].value);
//                    var rcoverage = parseFloat($textfields[6].value);
//                    if(rcoverage == 0){
//                        errorMsgs.push('Please enter a coverage greater than zero.');
//                    }    
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var dwalls = ((((((rlength * rheight) + (rwidth * rheight)) * 2) - ((rdoors * 20) + (rwindows * 15))) / (rcoverage / 4 )));
//                            var dceiling = ((rlength * rheight) / (rcoverage / 4 ));
//                            var dpdoors = (((rdoors * 20) + (rwindows * 7.5)) / (rcoverage / 4 ));
//                            var dmoulding = ((((rlength + rwidth) * 2) * rmoulding) / (rcoverage / 4 ));
//                            // amount of wall paint
//                            if(dwalls > 3) {
//                                walls = Math.ceil(dwalls/4);
//                                if(walls == 1) {amount1 = "Gallon";} 
//                                else {amount1 = "Gallons";}
//                            } 
//                            else {
//                                walls = Math.ceil(dwalls);
//                                amount1 = "Quarts";
//                            }
//                            // amount of ceiling paint
//                            if(dceiling > 3) {
//                                ceiling = Math.ceil(dceiling/4);
//                                if(ceiling == 1) {amount2 = "Gallon";} 
//                                else {amount2 = "Gallons";}
//                            } 
//                            else {
//                                ceiling = Math.ceil(dceiling);
//                                if(ceiling <= 1) {amount2 = "Quart";} 
//                                else {amount2 = "Quarts";}
//                            }
//                            //amount of paint for doors and windows
//                            if(dpdoors > 3) {
//                                doors = dpdoors/4;
//                                amount3 = "Gallons";
//                            } 
//                            else {
//                                doors = dpdoors;
//                                if(Math.ceil(doors) == 1) {amount3 = "Quart";}
//                                else {amount3 = "Quarts";}
//                            }
//                            // amount of paint for the moulding
//                            if(dmoulding > 3) {
//                                moulding = dmoulding/4;
//                                amount4 = "Gallons";
//                            } 
//                            else {
//                                moulding = dmoulding;
//                                if(moulding == 1) {amount4 = "Quart";} 
//                                else {amount4 = "Quarts";}
//                            }
//                            doors = doors.toFixed(1);
//                            moulding = moulding.toFixed(1);
//                            result.innerHTML = '<strong>Paint Needed<br /><br />Walls: '+ walls +' '+ amount1 +'<br /><br />Ceiling: '+ ceiling +' '+ amount2 +'<br /><br />Molding: '+ moulding +' '+ amount4 +'<br /><br />Doors &amp; Windows: '+ doors +' '+ amount3 +'</strong>';
//                            return;
//                        }
//                //end paint =====================================================
//                //begin wallpaper ===============================================
//                case 'wallpaper' :
//                    var wall1Len = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var wall2Len = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    var wall3Len = (parseInt($textfields[4].value * 12) + parseInt($textfields[5].value))/12;
//                    var wall4Len = (parseInt($textfields[6].value * 12) + parseInt($textfields[7].value))/12;
//                    var wallHeight = (parseInt($textfields[8].value * 12) + parseInt($textfields[9].value))/12;
//                    var numDoors = (parseInt($textfields[10].value));
//                    var numWindows = (parseInt($textfields[11].value));
//                    var coverage = (parseInt($textfields[12].value));
//                    if(wallHeight == 0){
//                        errorMsgs.push('Please enter a number greater than zero for the wall height.');
//                    }
//                    if(coverage == 0){
//                        errorMsgs.push('Please enter a coverage amount greater than zero.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var rolls = Math.ceil((((wall1Len + wall2Len + wall3Len + wall4Len) * wallHeight) - ((parseFloat(numDoors) * 20) + (parseFloat(numWindows) * 15))) / parseFloat(coverage)) + 1;
//                            result.innerHTML = '<strong>Approximate number of rolls of wallpaper needed:</strong> ' + rolls;
//                            return;
//                        }
//                //end wallpaper =================================================
//                //begin flooring / carpeting ====================================
//                case 'flooring' :
//                    var calcWidth = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var calcLength = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    if(calcWidth <= 0){
//                        errorMsgs.push('Please enter a number greater than zero for the width of the room.');
//                    }
//                    if(calcLength <= 0){
//                        errorMsgs.push('Please enter a number greater than zero for the length of the room.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var sqft = Math.round((calcWidth * calcLength)*10)/10; // get square feet
//                            var sqyd = Math.round((sqft/9)*10)/10; // get square yards
//                            var extrasy = Math.round((sqyd*.20)*10)/10;
//                            var extrasf = Math.round((sqft*.20)*10)/10;
//                            result.innerHTML = '<strong>Approximate Amount Of Material Needed</strong><br /><br /><strong>Square feet: </strong>' + sqft + '<br /><br /><strong>Square yard: </strong>' + sqyd /* + '</strong> square yards of material to finish project. <br/> <br/>Add up to <strong>' + extrasy + '</strong> square yards <strong>(' + extrasf + ' sq ft)</strong> of extra material depending on the shape of the room.'*/;
//                            return;
//                        }
//                //end flooring / carpeting ======================================
//                //begin vinyl / laminate ========================================
//                case 'flooring-sqyd' :
//                    var calcWidth = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var calcLength = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    if(calcWidth <= 0){
//                        errorMsgs.push('Please enter a number greater than zero for the width of the room.');
//                    }
//                    if(calcLength <= 0){
//                        errorMsgs.push('Please enter a number greater than zero for the length of the room.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var sqft = Math.round((calcWidth * calcLength)*10)/10; // get square feet
//                            var sqyd = Math.round((sqft/9)*10)/10; // get square yards
//                            var extrasy = Math.round((sqyd*.20)*10)/10;
//                            var extrasf = Math.round((sqft*.20)*10)/10;
//                            result.innerHTML = '<strong>Approximate square yards needed: </strong>' + sqyd /*+ '</strong> square yards to finish project. <br/> <br/>Add up to <strong>' + extrasy + '</strong> square yards <strong>(' + extrasf + ' sq ft)</strong> of extra material depending on the shape of the room.'*/;
//                            return;
//                        }
//                //end vinyl / laminate ==========================================
//                //begin concrete pad / walls ====================================
//                case 'concrete-pad' :
//                    var length = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var width = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    var depth = (parseInt($textfields[4].value * 12) + parseInt($textfields[5].value))/12;
//                    if(depth == 0){
//                            errorMsgs.push('Please enter a number greater than zero for the depth of the pad.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var lbs = ((length * width * depth) * .037).toFixed(1); // total lbs of concrete needed
//                            var cuft = (lbs * 27).toFixed(1); // get square yards
//                            var d80 = Math.ceil(cuft / .67); // get how many 80 lb bags
//                            var d60 = Math.ceil(cuft / .5);
//                            var d40 = Math.ceil(cuft / .33);
//                            result.innerHTML = '<strong>Approximate Concrete Needed:<br /><br />Cubic yards: '+ lbs + '<br /><br />Cubic feet: '+ cuft +'<br /><br />Approximate No. of Bags Needed:<br /><br />80 lb. : '+ d80 +'<br /><br />60 lb. : '+ d60 +'<br /><br />40 lb. :'+ d40 +'</strong>';
//        /*                    result.innerHTML = 'You\'ll need about <strong>' + lbs + '</strong> cubic yards (' + cuft + ' cubic feet) of concrete for the finished project. <br/> <br/>Concrete comes in different sized bags, so you\'ll need to purchase about <strong>' + d80 + '</strong> 80 lb bag(s), <strong>' + d60 + '</strong> 60 lb bag(s), or <strong>' + d40 + '</strong> 40 lb bag(s) of concrete for your project.'
//        */                    return;
//                        }
//                //end concrete pad / walls =====================================
//                //begin concrete holes =========================================
//                case 'concrete-holes' :
//                    var diameter = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12
//                    var depth = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    var holes = $textfields[4].value;
//                    if(holes == 0){
//                        errorMsgs.push('Please enter a number greater than zero for the number of holes or pillars.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHMTL = '';
//                            var lbs = ((((((diameter / 2) * (diameter / 2)) * 3.14) * depth) * 0.037) * holes).toFixed(1); // total lbs of concrete needed
//                            var cuft = (lbs * 27).toFixed(1); // get square yards
//                            var d80 = Math.ceil(cuft / .67); // get how many 80 lb bags
//                            var d60 = Math.ceil(cuft / .5);
//                            var d40 = Math.ceil(cuft / .33);
//                            result.innerHTML = '<strong>Approximate Concrete Needed:<br /><br />Cubic yards: '+ lbs + '<br /><br />Cubic feet: '+ cuft +'<br /><br />Approximate No. of Bags Needed:<br /><br />80 lb. : '+ d80 +'<br /><br />60 lb. : '+ d60 +'<br /><br />40 lb. :'+ d40 +'</strong>';
//        /*                    result.innerHTML = 'You\'ll need about <strong>' + lbs.toFixed(2) + '</strong> cubic yards (' + cuft.toFixed(2) + ' cubic feet) of concrete for the finished project. <br/> <br/>Concrete comes in different sized bags, so you\'d need to about <strong>' + d80.toFixed(0) + '</strong> 80 lb bag(s), <strong>' + d60.toFixed(0) + '</strong> 60 lb bag(s), or <strong>' + d40.toFixed(0) + '</strong> 40 lb bag(s) of concrete for your project.';
//        */                    return;    
//                        }
//                //end concrete holes =========================================
//                //begin R value ==============================================
//                case 'rValue' :
//                    var depth = ($textfields[0].value * 3.6).toFixed(1);
//                    if(depth == 0){
//                        errorMsgs.push('Please enter a number greater than zero for the depth.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            result.innerHTML = '<strong>Approximate R-Value: </strong>' + depth;
//                            return;
//                        }
//                //end R value ================================================
//                //begin rolled insulation ====================================
//                case 'insulation-rolled' :
//                    var calcWidth = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var calcLength = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    if(calcWidth == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the width of the room.');
//                    }
//                    if(calcLength == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the length of the room.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var calArea = (calcWidth * calcLength).toFixed(1);
//                            result.innerHTML = '<strong>Approximate square feet needed: </strong>' + calArea;
//                            return;
//                        }
//                //end rolled insulation ======================================
//                //begin blown insulation =====================================
//                case 'insulation-blown' :
//                    var rvalue = parseFloat($textfields[0].value);
//                    var calcWidth = (parseInt($textfields[1].value * 12) + parseInt($textfields[2].value))/12;
//                    var calcLength = (parseInt($textfields[3].value * 12) + parseInt($textfields[4].value))/12;
//                    if(rvalue == 0){
//                        errorMsgs.push('Please enter a positive number for the desired R-value of the room.');
//                    }
//                    if(calcWidth == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the width.');
//                    }
//                    if(calcLength == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the length.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var depth = (rvalue / 3.26).toFixed(1);
//                            var lbs = (((depth/12) * (calcWidth * calcLength)) / 0.75).toFixed(1);
//                            result.innerHTML = '<strong>Insulation needed: </strong>'+ lbs +'<br /><br /><strong>For a depth of: </strong>' + depth;
//                            return;
//                        }
//                //end blown insulation =======================================
//                //begin rafter known rise ==============================
//                case 'rafter-riserun' :
//                    var calcRise = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var calcRun = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    if(calcRise == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the rise.');
//                    }
//                    if(calcRun == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the run.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var rafterLen = Math.sqrt(calcRise * calcRise + calcRun * calcRun);
//                            result.innerHTML = '<strong>Approximate feet: </strong>' + rafterLen.toFixed(2);
//                            return;
//                        }
//                //end rafter known rise ================================
//                //begin rafter pitch run ===============================
//                case 'rafter-pitcherun' :
//                    var calcPitch = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var calcRun = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    if(calcPitch == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the pitch.');
//                    }
//                    if(calcRun == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the run.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var calcRise = (calcRun * calcPitch);
//                            var rafterLen = Math.sqrt(calcRise * calcRise + calcRun * calcRun);
//                            result.innerHTML = '<strong>Approximate feet: </strong>' + rafterLen.toFixed(2);
//                            return;
//                        }
//                //end rafter pitch run ==================================
//                //begin rafter pitch rise ===============================
//                case 'rafter-pitcherise' :
//                    var calcPitch = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var calcRise = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    if(calcPitch == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the pitch.');
//                    }
//                    if(calcRise == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the rise.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var calcRun = (calcRise / calcPitch);
//                            var rafterLen = Math.sqrt(calcRise * calcRise + calcRun * calcRun);
//                            result.innerHTML = '<strong>Approximate feet: </strong>' + rafterLen.toFixed(2);
//                            return;
//                        }
//                //end rafter pitch run =================================
//                //begin rafter eave ====================================
//                case 'rafter-eave' :
//                    var calcRun = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var calcPitch = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    if(calcPitch == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the pitch.');
//                    }
//                    if(calcRun == 0){
//                        errorMsgs.push('Please enter a positive number greater than zero for the run.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            error.innerHTML = '';
//                            var calcRise = (calcRun * calcPitch);
//                            var rafterLen = Math.sqrt(calcRise * calcRise + calcRun * calcRun);
//                            result.innerHTML = '<strong>Approximate feet: </strong>' + rafterLen.toFixed(2);
//                            return;
//                        }
//                //end rafter eave =====================================
//                //begin mulch =========================================
//                case 'mulch' :
//                    var calcLength = (parseInt($textfields[0].value * 12) + parseInt($textfields[1].value))/12;
//                    var calcWidth = (parseInt($textfields[2].value * 12) + parseInt($textfields[3].value))/12;
//                    var calcDepth = parseInt($textfields[4].value);
//                    if(calcDepth == 0){
//                        errorMsgs.push('Please enter a number greater than zero for the depth of the mulch.');
//                    }
//                        if(errorMsgs.length > 0){
//                            errorPrompt();
//                            return;
//                        }
//                        else {
//                            var cubicFeet = (calcLength * calcWidth * (calcDepth)/12);
//                            result.innerHTML = '<strong>Approximate cubic feet needed: </strong>' + cubicFeet.toFixed(1);
//                            return;
//                        }
//                //end mulch =======================================
//            }
//        });
//        //===============================================================================
//        // clears fields on init
//        function clearcalcfields() {
//            submit.setAttribute("disabled", "true");
//            clear.setAttribute("disabled", "true");
//                $textfields.forEach(function(el) {
//                    var $this = el;
//                    $this.value = null;
//                    //console.log("cleared on init: " + $this.id);
//                });
//            result.innerHTML = "";
//            error.innerHTML = "";
//            $textfields[0].focus();
//            
//        }
//        //================================================================================
//        function errorPrompt(){
//            result.innerHTML = '';
//            var errorPrompt = '';
//            var len = errorMsgs.length;
//                for(var i = 0; i < len; i++){
//                    errorPrompt = errorPrompt + errorMsgs[i] + '<br /><br />';
//                }
//            error.innerHTML = errorPrompt;
//            errorMsgs = [];
//            return;
//        }
//        //================================================================================
//        // set tab order functionality
//        function validation() {
//            $inputs = dojo.query("div#calculator_body input[type='text']").onkeyup(function(e){
//                // get the key pressed
//                var tab = null;
//                var key = e.keyCode;
//                // if it's the tab key, don't throw a "blank" error
//                    if((key == dojo.keys.TAB) || (key == 190)) {
//                        tab = true;
//                    }
//                submit.setAttribute("taborder", $inputs.length+1);
//                var isblank = 0;
//                    if(isNaN(this.value) && !tab){
//                        var thisString = this.value.toUpperCase();
//                        var keyPressed = String.fromCharCode(key);
//                        var lengthNaN = (parseInt(thisString.lastIndexOf(keyPressed)) - parseInt(thisString.indexOf(keyPressed)));
//                        var curLen = ((this.value).length - lengthNaN) - 1;
//                        var curString = String(this.value).substring(0,curLen);        
//                        this.value = curString;
//                        error.innerHTML = '';
//                    }
//                    //if there's only one element to calculate enable both submit and clear
//                    else if(isblank == 0 && $textfields.length == 1){
//                        error.innerHTML = '';
//                        submit.removeAttribute('disabled');
//                        clear.removeAttribute('disabled');
//                    }
//                    //for multiple fields, enable submit when all are entered, and clear when first element is entered
//                    else {
//                        error.innerHTML = '';
//                        $inputs.forEach(function(el) {
//                            $this = el;
//                            if($this.value == '') {
//                                isblank++;
//                            }
//                        });
//
//                        if(isblank == 0) {
//                            submit.removeAttribute('disabled');    
//                        } 
//                        else {
//                            submit.setAttribute("disabled", "true");
//                            clear.removeAttribute('disabled');
//                        }
//                    }
//            });
//        }
//        //=========================================================================
//    },
//=======================================================================    
    _setupImageGallery:function(){
        var $imageGallery = dojo.byId('image-gallery');
        if (!$imageGallery) return;
        var $cells = dojo.query('div.image-gallery', $imageGallery);
        $cells.forEach(function(el){
            var $this = el;
            // Find out the width of the image within this div
            var $img = dojo.query('img',$this)[0];
            if($img) {
                var _width = dojo.marginBox($img).w;
                // Account for border of image by adding 4 pixels 
                dojo.style($this,'width',_width+4+'px');
            }
            // Find out the width of the object within this div
            var $object = dojo.query('object',$this)[0];
            if($object) {
                var _width = dojo.marginBox($object).w;
                dojo.style($this,'width',_width+'px');
            }
        });
    }, 
//========================================================================
    _setupAdditionalImagesAccordion:function(){
        var $expander = dojo.byId('add-images-expander');
        var $additionalImages = dojo.byId('add-images');
        if(!$expander) return;
        if(!$additionalImages) return;
        // We hide the additional images on page load
        dojo.style($additionalImages, 'display', 'none');
        dojo.connect($expander, 'onclick', function(ev,el){
            ev.preventDefault();
            if(dojo.hasClass($expander,'open')) {
                lowes.wcm.hideAdditionalImages();    
            } else {
                lowes.wcm.showAdditionalImages();
            }            
        });
    }, 
//========================================================================
    _setupAnchorLinks:function(){
        // Make sure there is an 'additional images' section
        var $additionalImages = dojo.byId('add-images');
        if (!$additionalImages) return;
        // Find all links within #article-general and capture the click event
        var $links = dojo.query('a', dojo.byId('article-content'));
        if (!$links) return;
        $links.forEach(function(link){
            var split = link.href.split('#');
            if(split[1] && (split[1] != 'top')) {
                dojo.connect(link,'onclick',function(){
                    var _display = dojo.style($additionalImages,'display');
                    if (_display == 'none') {
                        lowes.wcm.showAdditionalImages();
                    }
                    return true;
                });
            }
        });
    }, 
//=========================================================================
    showAdditionalImages:function(){
        var $expander = dojo.byId('add-images-expander');
        var $additionalImages = dojo.byId('add-images');
        if($additionalImages) dojo.style($additionalImages, 'display', 'block');
        if($expander) dojo.addClass($expander, 'open');    
    }, 
//=========================================================================
    hideAdditionalImages:function(){
        var $expander = dojo.byId('add-images-expander');
        var $additionalImages = dojo.byId('add-images');
        if($additionalImages) dojo.style($additionalImages, 'display', 'none');
        if($expander) dojo.removeClass($expander, 'open');
    }
//=========================================================================
}
dojo.addOnLoad(lowes.wcm.init);