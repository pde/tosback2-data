/*
Stylish Select 0.3 - $ plugin to replace a select drop down box with a stylable unordered list
http://scottdarby.com/

Copyright (c) 2009 Scott Darby

Requires: $ 1.3

Licensed under the GPL license:
http://www.gnu.org/licenses/gpl.html

This is a highly modified version of the stylish-select plugin
by Chris Klanac, 17 July 2009

Major change using spans instead of divs to mimic the inline-block behavior of a standard select
Other changes includes several minor performance enhancements and code refactoring/simplification

*/
(function($){

	//create cross-browser indexOf
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0); i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
	}

	$.fn.sSelect = function(options) {
		return this.each(function(){
			var defaults = {

			};

			//initial variables
			var opts = $.extend(defaults, options),
				$input = $(this),
				$container = $('<span class="custom-select" tabindex="0"></span>'),
				$containerText = $('<span></span>'),    // MOD Use spans to allow ie6 to apply inline-block
				$newUl = $('<ul class="custom-options"></ul>'),
				itemIndex = -1,
				currentIndex = -1,
				keys = [],
				prevKey = false,
				newListItems = '',
				prevented = false;

			//build new list
            $input.hide();
			$container.attr('id','custom-'+$input.attr('id')).css({position:'static',width:$(this).width()}).insertBefore($input)
			    .prepend($containerText).append($newUl.css({'left':'-1px',width:$(this).width()}).hide());

			//test for optgroup
			if ($input.children('optgroup').length == 0){
				$input.children().each(function(i){
					var option = $(this).text();
					//add first letter of each word to array
					keys.push(option.charAt(0).toLowerCase());
					if ($(this).attr('selected') == true){
						opts.defaultText = option;
						currentIndex = i;
					}
					newListItems += '<li>'+option+'</li>';
				});
				//add new list items to ul
				$newUl.html(newListItems);
				newListItems = '';
				//cache list items object
				var $newLi = $newUl.children();

			} else { //optgroup
				$input.children('optgroup').each(function(i){

					var optionTitle = $(this).attr('label'),
						$optGroup = $('<li class="newListOptionTitle">'+optionTitle+'</li>');

					$optGroup.appendTo($newUl);
					var $optGroupList = $('<ul></ul>');
					$optGroupList.appendTo($optGroup);

					$(this).children().each(function(){
						++itemIndex;
						var option = $(this).text();
						//add first letter of each word to array
						keys.push(option.charAt(0).toLowerCase());
						if ($(this).attr('selected') == true){
							opts.defaultText = option;
							currentIndex = itemIndex;
						}
						newListItems += '<li>'+option+'</li>';
					})
					//add new list items to ul
					$optGroupList.html(newListItems);
					newListItems = '';
				});
				//cache list items object
				var $newLi = $newUl.find('ul li');
			}

//force tall lists to scroll
if($input.children().length > 9) {
	$newUl.addClass('maxxed');	
}
			
			//get heights of new elements for use later

			var newUlHeight = $newUl.height()+2,
				newLiLength = $newLi.length;

			//check if a value is selected
			if (currentIndex != -1){
				navigateList(currentIndex, true);
			} else {
				$containerText.text(opts.defaultText); //set placeholder text
			}

			function newUlPos(){
				var containerPosY = $container.offset().top,
					docHeight = jQuery(window).height(),
					scrollTop = jQuery(window).scrollTop(),
					contHeight = $container.css('height');

				containerPosY = containerPosY-scrollTop;

				if (containerPosY+newUlHeight >= docHeight){
                    $newUl.css({top: '-'+newUlHeight+'px'}).removeClass('reveal-down').addClass('reveal-up');
					$input.onTop = true;
				} else {
                    $newUl.css({top:contHeight}).removeClass('reveal-up').addClass('reveal-down');
					$input.onTop = false;
				}
			}

			$(window).resize(function(){newUlPos();});
			$(window).scroll(function(){newUlPos();});

			//show/hide dropdown menu on click of container
			$container.toggle(
			    function(){
			    	$(this).css({'position': 'relative','z-index': '10'});
			    	newUlPos(); $newUl.show();
			    },
			    function(){
			    	$(this).css({'position': 'static'});
			    	newUlPos(); $newUl.hide();
			    }
			)

			$newLi.hover(
			  function (e) {$(this).addClass('newListHover');},
			  function (e) {$(this).removeClass('newListHover');});

			$newLi.click(function(e){
				var $clickedLi = $(e.target);
				//update counter
				currentIndex = $newLi.index($clickedLi);
				//remove all hilites, then add hilite to selected item
				prevented = true;
				navigateList(currentIndex);
				$newUl.hide();

			});

			function navigateList(currentIndex, init){

				//get offsets
				var containerOffsetTop = $container.offset().top,
					liOffsetTop = $newLi.eq(currentIndex).offset().top,
					ulScrollTop = $newUl.scrollTop();

				//get distance of current li from top of list
				if ($input.onTop == true){
					//if list is above select box, add max height value
					$input.liOffsetTop = (((liOffsetTop-containerOffsetTop))+ulScrollTop)+parseInt(opts.ddMaxHeight);
				} else {
					$input.liOffsetTop = ((liOffsetTop-containerOffsetTop))+ulScrollTop;
				}

				//scroll list to focus on current item
				$newUl.scrollTop($input.liOffsetTop);

				$newLi.removeClass('newListHover')
					.eq(currentIndex)
					.addClass('newListHover');
				var text = $newLi.eq(currentIndex).text();
				//page load
				if (init == true){
					$input.val(text);
					$containerText.text(text);
					return false;
				}
				$input.val(text).change();
				$containerText.text(text);

			};

			$input.change(function(event){
					$targetInput = $(event.target);
					//stop change function from firing
					if (prevented == true){
						prevented = false;
						return false;
					}
					$currentOpt = $targetInput.find(':selected');
					currentIndex = $targetInput.find('option').index($currentOpt);
					navigateList(currentIndex, true);
				}
			);


			//handle up and down keys
			function keyPress(element) {
				//when keys are pressed

				element.onkeydown = function(e){

					if (e == null) { //ie
						var keycode = event.keyCode;
					} else { //everything else
						var keycode = e.which;
					}

					//prevent change function from firing
					prevented = true;

					switch(keycode)
					{
					case 40: //down
					case 39: //right
						incrementList();
						return false;
						break;
					case 38: //up
					case 37: //left
						decrementList();
						return false;
						break;
					case 33: //page up
					case 36: //home
						gotoFirst();
						return false;
						break;
					case 34: //page down
					case 35: //end
						gotoLast();
						return false;
						break;
					case 13:
					case 27:
						$newUl.hide();
						return false;
						break;
					}

					//check for keyboard shortcuts
					keyPressed = String.fromCharCode(keycode).toLowerCase();
					var currentKeyIndex = keys.indexOf(keyPressed);
					if (typeof currentKeyIndex != 'undefined') { //if key code found in array
						++currentIndex;
						currentIndex = keys.indexOf(keyPressed, currentIndex); //search array from current index
						if (currentIndex == -1 || currentIndex == null || prevKey != keyPressed) currentIndex = keys.indexOf(keyPressed); //if no entry was found or new key pressed search from start of array
						navigateList(currentIndex);
						//store last key pressed
						prevKey = keyPressed;
						return false;
					}
				}
			}

			function incrementList(){
				if (currentIndex < (newLiLength-1)) {
					++currentIndex;
					navigateList(currentIndex);
				}
			}

			function decrementList(){
				if (currentIndex > 0) {
					--currentIndex;
					navigateList(currentIndex);
				}
			}

			function gotoFirst(){
				currentIndex = 0;
				navigateList(currentIndex);
			}

			function gotoLast(){
				currentIndex = newLiLength-1;
				navigateList(currentIndex);
			}

			$container.bind('focus click',function(){
				keyPress(this);
			})

			$container.blur(function(){
			   $newUl.hide().parent().css('position', 'static');
			});

		});

	};

})(jQuery);