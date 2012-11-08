window.BNY = window.BNY || {};

/**
* @module favorites
*/
BNY.favorites = BNY.favorites || {};

$.extend(BNY.favorites, function () {
	'use strict';

	var methods = {
			

		bindEvents: function() {
		
			$('.categoryclick').css('cursor','pointer').click(function(e) {
				var href= $(this).data('href');
				e.preventDefault();
				window.location = href;
			});
		},

		/**
		 * A user's settings for their favorites
		 * @namespace BNY.favorites 
		 * @class settings
		 */

		settings: {

			/**
			* @event initialize
			*/

			initialize: function () {

				// if the user is not logged in, return
				if (!app.isUserLoggedIn) {
					return;
				}

				methods.settings.setUserIcon();

				$('#add-description').click(function (e) {
					e.preventDefault();

					var url = $(this).attr('href');
					methods.settings.openDescription(url);
				});

				// show the user the settings overlay on the first visit to the page
				if (app.showFavoritesSettings) {
					methods.settings.open(app.URLs.favoritesPreferences);
				}

				// Fire the show / bindings for list tooltip
				BNY.utilities.tooltip($('#filters .list-overview-tip'), $('#filters .list-overview-tip .close'), 'barneys.com-favorites-list-tip');

			}, // initialize
			
			/**
			* @event setUserIcon
			*/

			setUserIcon: function () {

				var setUserIconCallback = function (resource) {
					
					var icon = $('div.about-me div.image'),
						fbImg = icon.find('img#photo');
	
					// if we have a facebook empty image and a valid resource
					// returned from gigya, let's proceed
					if (fbImg.length === 1 && resource && resource.user && resource.user.isConnected) {

						// if this is a facebook connection,
						// let's set the photo
						if (resource.user.loginProvider === 'facebook') {
							var thumbnail = resource.user.thumbnailURL;
							$('img#photo').attr('src', thumbnail);
							
						// otherwise we bail and remove the icon
						// because we aren't using twitter icons
						} else {
							icon.remove();
						}
					}
				};

				// check gigya and pass in the callback
				BNY.utilities.gigyaCheck(setUserIconCallback);

			},
			
			/**
			* Open a jQuery UI dialog window with the favorites
			* preferences and two friends/influencers.
			*
			* @method open
			* @private
			* @param {String} href app.URLs.favoritesPreferences
			* @return {Boolean} Returns true on success
			*/

			open: function (href) {
				
				var dialogClass = '',
					dialogHeight = 0,
					dialogElem = $('#dialogcontainer');

				
				
				if(dialogElem.length > 0) {
					dialogElem.empty();
				}
				else {
					var dialogHTML = '<div id="dialogcontainer" ></div>';
					$('body').append(dialogHTML);
				}
				
				//$('<div/>').attr('id', 'dialogcontainer').appendTo(document.body);

				function openSettings(resource) {

					if (resource.user.isConnected) {
						dialogClass = 'gigya-dialog dialog-no-title';

						if ($("#influencers").length === 1) {
							dialogHeight = '393';
						} else {
							dialogHeight = '450';
						}

					} else {
						dialogHeight = '589';
						dialogClass = 'dialog-no-title';
					}
					
					app.createDialog({
						id: 'dialogcontainer',
						options: {
							width:	625,
							height:	dialogHeight,
							position: ['center', 'center'],
							modal:	true,
							dialogClass: dialogClass,
							open: function () {
								$('#dialogcontainer').load(href, function () {
									methods.settings.submitSettings();
								});
							}
						}
					});
				}

				BNY.utilities.gigyaCheck(openSettings);
				
				return true;

			}, // open
			
			/**
			* Open a jQuery UI dialog window with the ability
			* to add a description to a list.
			*
			* @method openDescription
			* @private
			* @param {String} href $('#add-description').attr('href');
			* @return {Boolean} Returns true on success
			*/

			openDescription: function (href) {

				$('<div/>').attr('id', 'dialogcontainer').appendTo(document.body);

				app.createDialog({
					id: 'dialogcontainer',
					options: {
						width:	388, /*400,*/
						height:	300,
						dialogClass: 'description',
						position: ['center', 'center'],
						modal:	true,
						title: 'Add a description to your list',
						open: function () {
							$('#dialogcontainer').load(href, function () {
								methods.settings.submitSettings();
							});
						}
					}
				});
	
				return true;
			},

			submitSettings: function () {
				var settingsForm	= $('div#favorites-settings').find('form'),
					displayName		= settingsForm.find('input#dwfrm_favorites_displayname'),
					buttons			= $('div#favorites-settings').find('.buttons input'),
					submitButton	= settingsForm.find('div.formactions button'),
					cancelSettings	= settingsForm.find('a.cancel');
				if (buttons.length) {
					buttons.change(function () {
						$('div.button').toggleClass('selected');
					});
				}

				BNY.utilities.clearDefaults();

				if (displayName.length > 0) {

					displayName.blur(function () {

						if ($.trim($(this).val()).length < 6) {
							$(this).prev('span.error').css({
								'visibility': 'visible'
							});
						} else {
							$(this).prev('span.error').css({
								'visibility': 'hidden'
							});
						}
					});
				}

				submitButton.click(function (e) {

					e.preventDefault();

					if (displayName.length > 0) {

						// make sure the user fills in a valid display name
						if (displayName.val().length < 6) {
							displayName.focus();
							displayName.prev('span.error').css({'visibility': 'visible'});
							return;
						}
					}

					var post	= settingsForm.serialize(),
						action	= settingsForm.attr('action');

					$.post(action, post, function (data) {

						//$('#dialogcontainer').dialog('close');
						var mySettings = $.parseJSON(data);

						// change visibility settings
						if (mySettings.settings.privacy === 'true') {
							$('p.visibility').text('Visible to just me');
						} else {
							$('p.visibility').text('Visible to everyone');
						}

						if (mySettings.settings.displayName !== 'null') {
							// change display name
							$('div.about-me p.name').text(mySettings.settings.displayName);
						}

						if (mySettings.settings.profilePic !== 'null') {
							// change my icon
							$('div.about-me div.icon').attr('id', mySettings.settings.icon);
						}

						if (mySettings.settings.description !== 'null') {
							// change my description
							$('div.about-me a#add-description').after('<p class=\"description\" > ' + mySettings.settings.description + ' </p>').remove();
						}
						app.showFavoritesSettings = false
						window.location.reload();
					});
				});

				cancelSettings.click(function (e) {
					e.preventDefault();
					var action	= settingsForm.attr('action');
					var formfield	= settingsForm.find('input#cancelAction').attr('name');

					$.post(action, formfield, function (data) {
						//$('#dialogcontainer').dialog('close');
						app.showFavoritesSettings = false;
						window.location.reload();
					});
				});

			}, // submitSettings

			myAccount: {

				initialize: function() {

					var settingsContainer = $('.editprofile.favorites');

					if (settingsContainer.length === 0) {
						return false;
					}

					methods.settings.myAccount.updateProfileSettings();
					methods.settings.myAccount.setUserIcon();

				},

				updateProfileSettings: function() {

					var formPostData		= {},
						formSubmitAction	= "",
						successElement		= {};

					var updateSettings = function (form) {

						successElement		= $(form).find('.update-success');
						formPostData		= $(form).serialize();
						formSubmitAction	= $(form).attr('action');
						
						$.getJSON(formSubmitAction, formPostData, function(json) {

							if (json.valid === true) {
								successElement.fadeIn(500).fadeOut(500);
								return true;
							} else {
								alert("An error has occurred.");
								return false;
							}

						});
						
					};
					
					$('#update-favorites-profile').validate({
						rules: {
							displayname: {
								required: true,
								minlength: 6
							},
							listDescription: {
								maxlength: 140
							}
						},
						submitHandler: updateSettings
					});
					
					$('#update-favorites-privacy').validate({
						rules: {
							isprivate: {
								required: true
							}
						},
						submitHandler: updateSettings
					});

				},

				setUserIcon: function () {

					var setUserIconCallback = function (resource) {
						
						var icon = $('div.icon.facebook'),
							fbImg = icon.find('img');
						
						if (fbImg.length !== 0 && resource && resource.user && resource.user.isConnected) {

							if (resource.user.loginProvider === 'facebook') {
								var thumbnail = resource.user.thumbnailURL;
								icon.find('img').attr('src', thumbnail);
							} else {
								icon.remove();
							}

						}
					};

					// check gigya and pass in the callback
					BNY.utilities.gigyaCheck(setUserIconCallback);

				}
			}

		},

		filters: {

			initialize: function () {

				var filters = $('div#filters').find('a.filter');

				filters.click(function (e) {

					e.preventDefault();

					var url = $(this).attr('href');

					$('div#filters').find('div.selector').removeClass('selected');

					$(this).parent('div').toggleClass('selected');

					$.ajax({
						url: url,
						success: function (data) {
							$('div#my-items').empty().html(data);
						},
						dataType: 'html'
					});
				});

			}
		},

		sharing: {

			bindHover: function () {

				var shareTrigger = $('#favorites-share'),
					shareBody = $('#favorites-share ul'),
					showShareBody = function () {
						shareBody.css({'visibility': 'visible'}); //ie7 FB like button fix
						shareBody.show();
					},
					hideShareBody = function () {
						shareBody.hide();
					},
					hoverConfig = {
						over: showShareBody,
						timeout: 500,
						out: hideShareBody
					};

				shareTrigger.hoverIntent(hoverConfig);
				
				shareTrigger.click(function (e) {
					e.preventDefault();
				});

			}

		},
		
		privateItem: {
			
			//fix for quantity drop down on buy this look
			bindHover: function() {
				$('.quantityinput').each(function(){
					var rollover = $(this).closest('.rollovers');
					$(this).hover(function(){
						$(this).closest('.rollovers').css('display','block');
					},function(e){
						e.stopPropagation();
					});
					rollover.mouseout(function(){
						$(this).attr('style','');
					});
					$(this).change(function(e){
						rollover.attr('tabindex','-1').focus();
					});
				});
				
				
				//itemtile
				var privateTrigger = $('div.itemtile div.name.private span.private'),
					privateBody = privateTrigger.find('span.tooltip'),
					showPrivateBody = function () {
						var self = $(this);
						self.find('span.tooltip').css({'visibility': 'visible'});
						//self.closest('div.producttile').trigger('mouseout'); // trying to fix lock/buy overlay z-index issue
						//self.closest('div.producttile').find('div.rollovers').hide();
					},
					hidePrivateBody = function () {
						$(this).find('span.tooltip').css({'visibility': 'hidden'});
					},
					hoverConfig = {
						over: showPrivateBody,
						timeout: 500,
						out: hidePrivateBody
					};
		
				privateTrigger.hoverIntent(hoverConfig);
				
				privateTrigger.click(function (e) {
					//e.preventDefault();
					e.stopPropagation();
				});
			}
		},
		

		
		loadMore: function () {
			
			if ($('.load-more').length === 0) {
				return;
			}

			var body = $('body');
			

			body.on('click', '.load-more', function (e) {
				e.preventDefault();
				
				var loadingArea = '<img id="load-more-ajax" height="32" width="32" src="'+app.URLs.loadingBrowseImg+'" />';
				
				

				var link		= $(this),
					href		= link.attr('href'),
					container	= $('#' + link.data('content-container'));
				
				container.append(loadingArea);
				link.remove();
				
				$.get(href, function (data) {
					
					$('#load-more-ajax').remove();
					container.append(data);		
					container.find('.list-container-form-items').css({height: '100px', width: '210px'}).jScrollPane();
					container.find('.lists-form form').each(function () {
						methods.lists.create.addItemToLists($(this));
					});

						
				});

			});

		},

		follow: {

			bindActions: function () {

				if ($('.follow').length === 0) {
					return;
				}

				var body = $('body');

				$('a.follow.unfollow').hover(
					function (e) {
						$(this).text('Unfollow');
					},
					function (e) {
						$(this).text('Following');
					}
				);

				body.on('click', 'a.follow', function (e) {

					e.preventDefault();

					var link = $(this),
						href = link.attr('href');

					$.getJSON(href, function (json) {

						if (json.valid === true) {

							link.toggleClass('active');
							link.siblings().toggleClass('active');

							if (link.hasClass('unfollow')) {

								var personWithItems = link.parents('.person-with-items');

								// here we remove the div on the "people I follow" page by sliding it up
								if (personWithItems.length === 1 && link.hasClass('people-i-follow')) {
									personWithItems.slideUp('slow', function () {
										personWithItems.remove();
									});
								}

							}
							
							//if user is already following all friends, show unfollow all button
							var followLinks = $('#activity.list-of-friends').find('a.follow.active:not(.unfollow)');
							//if there aren't any follow links, show unfollow button
							if (followLinks.length < 1) {
								$('#my-stuff.list-of-friends a.follow-all-friends:not(.unfollow)').removeClass('active');
								$('#my-stuff.list-of-friends a.follow-all-friends.unfollow').addClass('active');
							}
							var unfollowLinks = $('#activity.list-of-friends').find('a.follow.active.unfollow');
							if (unfollowLinks.length < 1) {
								$('#my-stuff.list-of-friends a.follow-all-friends:not(.unfollow)').addClass('active');
								$('#my-stuff.list-of-friends a.follow-all-friends.unfollow').removeClass('active');
							}
						} else {

							alert("An error has occurred with your request.");

						}

					});
				});

			}

		},

		findFriends: {

			followLinks: [],
			unfollowLinks: [],

			followAllFriends: function (n) {
				var scope = this,
					max = scope.followLinks.length;
				if (max > 0 && n < max) {
					$.getJSON(scope.followLinks.eq(n).attr('href'), function (json) {
						if (json.valid === true) {
							// show unfollow link, hide follow link
							scope.followLinks.eq(n)
								.removeClass('active')
								.siblings('a.unfollow')
									.addClass('active');
							// iterate through next friend link if there is one
							if (n + 1 < max) {
								scope.followAllFriends(n + 1);
							} else {
								$('#my-stuff.list-of-friends a.follow-all-friends').removeClass('active');
								$('#my-stuff.list-of-friends a.follow-all-friends.unfollow').addClass('active');
							}
						} else {
							alert("An error has occurred with your request.");
						}
					});
				}
			},

			unfollowAllFriends: function (n) {
				var scope = this,
					max = scope.unfollowLinks.length;
				if (max > 0 && n < max) {
					$.getJSON(scope.unfollowLinks.eq(n).attr('href'), function (json) {
						if (json.valid === true) {
							// show unfollow link, hide follow link
							scope.unfollowLinks.eq(n)
								.removeClass('active')
								.siblings('a.follow')
									.addClass('active');
							// iterate through next friend link if there is one
							if (n + 1 < max) {
								scope.unfollowAllFriends(n + 1);
							} else {
								$('#my-stuff.list-of-friends a.follow-all-friends').addClass('active');
								$('#my-stuff.list-of-friends a.follow-all-friends.unfollow').removeClass('active');
							}
						} else {
							alert("An error has occurred with your request.");
						}
					});
				}
			},

			bindActions: function () {
				var scope = this;

				// Follow All (x) button 
				$('body').on('click', '#my-stuff.list-of-friends a.follow-all-friends:not(.unfollow)', function (e) {
					e.preventDefault();
					scope.followLinks = [];
					scope.followLinks = $('#activity.list-of-friends').find('a.follow.active:not(.unfollow)');

					scope.followAllFriends(0);
				});

				// Unfollow All (x) button
				$('body').on('click', '#my-stuff.list-of-friends a.follow-all-friends.unfollow', function (e) {
					e.preventDefault();
					scope.unfollowLinks = [];
					scope.unfollowLinks = $('#activity.list-of-friends').find('a.unfollow.active');

					scope.unfollowAllFriends(0);
				});

				//if user is already following all friends, show unfollow all button
				scope.followLinks = $('#activity.list-of-friends').find('a.follow.active:not(.unfollow)');
				//if there aren't any follow links, show unfollow button
				if (scope.followLinks.length < 1) {
					$('#my-stuff.list-of-friends a.follow-all-friends:not(.unfollow)').removeClass('active');
					$('#my-stuff.list-of-friends a.follow-all-friends.unfollow').addClass('active');
				}

				// show the Share List dialog automatically if user has no friends (Favorites-FindFriends)
				$('a.lightbox.autolaunch').trigger('click');
			}

		},

		/**
		 * A utility for managing lists
		 * @namespace BNY.favorites 
		 * @class lists
		 */

		lists: {

			remove: {

				bindActions: function () {

					var body = $('body');

					body.on('click', '.delete-list .submit', function (e) {

						e.preventDefault();

						var $this = $(this),
							form = $this.parents('form'),
							list = form.serialize();

						$.getJSON(app.URLs.favoritesDeleteList, list, function (json) {

							var listId		= form.find('input[name=listID]').val(),
								listDetails	= $('#' + listId + '.list');

							if (json.valid === true) {

								if ($this.hasClass('dialog')) {
									$('#dialogcontainer').fadeOut(function () {
										listDetails.slideUp(function () {
											listDetails.remove();
										});
									}).remove();
								}
							}

						});

					});

				}

			},

			update: {

				bindActions: function () {

					var body = $('body'),
						self = this;

					// list privacy drop down
					body.on('click', '#favorites .dropdown .list-privacy a', function (e) {

						e.preventDefault();

						var $this = $(this),
							list = {},
							dropdown = null;

						//do nothing if selecting the active state
						if ($this.hasClass('active')) {
							return;
						}

						dropdown = $this.closest('div.dropdown');

						//deactivate old selection, activate new one
						dropdown.find('li.active').removeClass('active');
						$this.closest('li').addClass('active');

						list.listID = dropdown.find('ul.list-privacy').attr('data-listId');
						list.isPrivate = $this.attr('data-isPrivate');

						//update list privacy settings
						$.getJSON(app.URLs.favoritesUpdateList, list, function (json) {});
					});
					
					$("body").on('click', 'form.update-list a.cancel, form.delete-list a.cancel', function(e) {
						e.preventDefault();
						$('#dialogcontainer').dialog('close');
					});

					// list settings within the my account area
					body.on('click', '.update-list .submit, input.update-list-privacy', function (e) {

						var $this = $(this),
							form = $this.parents('form'),
							list = form.serialize();
						
						// if this is a submit button, let's take over and
						// do our own thing within the dialog
						// alternatively, it could be a radio button to toggle
						// list privacy settings
						if ($this.hasClass('submit')) {
							e.preventDefault();
						}
						
						// Checks whether validation plugin has successfully validated the form before saving
						if (!form.valid()) {
							return false;
						}

						$.getJSON(app.URLs.favoritesUpdateList, list, function (json) {

							if (json.valid === true) {

								var successEl		= form.find('.update-success'),
									listId			= form.find('input[name=listID]').val(),
									listName		= form.find('input[name=name]').val(),
									listDescription = form.find('textarea[name=description]').val(),
									listDetails		= $('#' + listId + '.list');

								// this callback is for the "my account" area and
								// the "favorites" area of the site
								// if the listDetails variable is empty, then we are not on the
								// my account page so we get the container on the favorites page
								if (listDetails.length === 0) {
									listDetails = $('#my-stuff .text');
								}

								// we fade in/out the green check mark
								// to indicate success
								if (successEl.length !== 0) {
									successEl.fadeIn(500).fadeOut(500);
								}

								// update the list name and description on the page
								// (not in the dialog window)
								if (!($this.hasClass('update-list-privacy'))) {
									listDetails.find('.name').text(listName);
									listDetails.find('.description').replaceWith('<p class="description">' + listDescription + '</p>');
								}
								
								// if this update action occurred within a dialog window,
								// let's fade it out and remove it from the DOM
								if ($this.hasClass('dialog')) {
									$('#dialogcontainer').fadeOut().remove();
								}

							}

						});

					});

					//add product, category or designer while viewing an empty list
					body.on('click', '#add-these a.add-item-to-empty-list', function (e) {
						e.preventDefault();
						self.addItemToEmptyList($(this));
					});

				},
				
				updateListSubmitHandler: function (form) {
					
					// Doesn't do anything right now -Evan Minto

					return true;

				},

				addItemToEmptyList: function (target) {

					var submitData = {};

					submitData.lists = target.attr('data-listID');
					submitData.items = target.attr('data-pid');

					//add designer
					if (target.attr('id') === 'add-designer-to-empty-list') {
						submitData.designer = target.attr('data-designer');
						submitData.cgid = target.attr('data-cgid');
					}

					//add category
					if (target.attr('id') === 'add-category-to-empty-list') {
						submitData.refinements = target.attr('data-refinements');
						submitData.cgid = target.attr('data-cgid');
					}

					// suppress automatic refresh
					if (app.isUserLoggedIn) {
						submitData.refresh = true;
					}
					else {
						submitData.refresh = false;
					}

					//add item to favorites
					$.getJSON(target.attr('href'), submitData, function (json) {

						//add item to list
						$.getJSON(app.URLs.favoritesAddItemsToLists + '?items=' + json.itemID + '&lists=' + submitData.lists, function (listJson) {

							// reload page to show updated list
							if (submitData.refresh)
								window.location.reload();
						});
					});

				}

			},

			validation: {
				validateListForm: function (context, submitHandlerFunction) {
	
					var createListForms = $(context);
	
					if (!(createListForms.length)) {
						return false;
					}
	
					$.each(createListForms, function () {
	
						var thisForm = $(this);
	
						thisForm.validate({
							rules: {
								name: {
									maxlength: 50,
									required: true
								}
							},
							messages: {
								name: {
									maxlength: "Please ensure that your list is no longer than 50 characters.",
									required: "You must enter a value for the list name."
								}
							},
							submitHandler: submitHandlerFunction,
							errorLabelContainer: thisForm.find('.form-errors')
						});
					});
	
				}
			},

			create: {

				bindActions: function () {

					var body = $('body');

					body.on('click', '.create-list', function (e) {

						e.preventDefault();

						// show/hide the elements used to create a new list
						$(this).parent('.create-list-container').toggleClass('expanded');

					});

					// canvas the page for create list forms and
					// setup validation for each one
					methods.lists.validation.validateListForm('form.create-list-form', methods.lists.create.createListSubmitHandler);

					body.on('click', '.add-to-lists', function (e) {

						e.preventDefault();

						// show/hide the elements used to create a new list
						$(this).toggleClass('expanded');
						$(this).siblings('.expanded-lists').toggle().find('.scrollpane').jScrollPane({
							verticalGutter: "16px"
						}).removeClass('scrollpane');
					});

					body.on('click', '.favorites-dropdown .switch', function (e) {

						e.preventDefault();

						if (!app.isUserLoggedIn) {
							BNY.utilities.makeUserLogin();
							// exit without opening the dropdown
							return;
						}

						var $this = $(this);

						// show/hide the elements used to create a new list
						$this.toggleClass('expanded');

						$('.favorites-dropdown').find('.lists-wrapper').toggle();
					});

					$('.lists-form form').each(function () {
						methods.lists.create.addItemToLists($(this));
					});

				},
				
				createListSubmitHandler: function (form) {

					form = $(form);

					var errorCont	= form.find('.form-errors'),
						errorEl		= errorCont.find('.server-side'),
						filters		= form.parents('#filters'),
						action		= form.attr('action'),
						container	= form.parents('.create-list-container'),
						params		= form.serialize(),
						privacy		= 'public-list',
						noLists		= $('.no-lists-message'),
						myLists		= $('.my-favorites-lists ul');

					// reset the error element to be blank
					errorEl.text('').hide();
					errorCont.hide();

					$.getJSON(action, params, function (list) {
						
						if (list.valid === true) {

							// hide the elements used to create a new list
							container.toggleClass('expanded');
							
							// hide the message that may be showing for someone
							// who didn't have any lists prior to this one
							noLists.hide();

							// reset the form fields
							form[0].reset();

							// pass the new list id and name and show all items favorited
							// by a user in the overlay if they have favorited at least one item
							if (app.myItems && Object.size(app.myItems) >= 1 && filters.length === 1) {
								methods.lists.create.addItemsToList(list);
							}

							// set a class to be used in the anchor tag below
							// that will show a lock icon denoting private
							if (list.isPrivate === true) {
								privacy = 'private-list';
							}

							// this is specific to the left nav of the favorites area
							// if we're in the favorites area of the site and the filters
							// area present, then we add a list item and link to the my lists ul
							if (filters.length === 1) {

								// add the new list into the list of lists
								myLists.prepend('<li class="clearfix"><a class="' + privacy + '" href="' + list.url + '" title="View your ' + list.name + ' list.">' + list.name + '</a><span class="count">0</span></li>');

								// fade the newest list in and out so the user
								// can see it has been added to the list of lists
								myLists.find('li').first().fadeOut().fadeIn();

							}

							// this is specific to the create list container
							// that is present in rollovers
							//
							// i.e. not the left nav
							if (filters.length === 0 || form.parents('.rollovers').length !== 0) {
								
								var listsForm		= $('.lists-form'),
									formItems		= listsForm.find('.list-container-form-items'),
									thisListsForm	= container.siblings('.lists-form'),
									formFields		= listsForm.find('.list-container-form-items .form-field'),
									formFieldsParent = formFields.parent();
								
								if (formFields.length === 0) {
									formFieldsParent = listsForm.find('.list-container-form-items');
									formFieldsParent.css('height', '100px').jScrollPane();
								}

								// add the new list into the list of lists
								formFieldsParent.prepend('<div class="form-field"><input id="list-' + list.id + '" type="checkbox" name="' + list.name + '" value="' + list.id + '"><label for="list-' + list.id + '" class="' + privacy + '">' + list.name + '</label><span class="count">0</span></div>');
								
								listsForm.find('.form-actions').show();
								
								thisListsForm.find('input#list-' + list.id).attr('checked', 'checked');
								
								// fade the newest list in and out so the user
								// can see it has been added to the list of form options
								formItems.find('.form-field').first().fadeOut().fadeIn();
							}

						} else {

							// add the error string to the error element
							// within the form
							errorEl.text(list.errorString).show();
							errorCont.show();
						}
					});

					return true;

				},
				
				/**
				* Open a jQuery UI dialog window with all of the users favorite
				* items so they can select them and add them to their new list.
				*
				* @method addItemsToList
				* @param {Object} list 
				*/

				addItemsToList: function (list) {

					var href	= app.URLs.getFavoritesItemsToAdd,
						title	= 'Select Items to Add',
						addToListDialog	= $('#addtolist-dialog');

					if (addToListDialog.length) {
						addToListDialog.remove();
					}

					$('<div/>').attr('id', 'addtolist-dialog').appendTo(document.body);

					app.createDialog({
						id: 'addtolist-dialog',
						options: {
							width:	1024,
							height:	660,
							position: ['center', 'center'],
							modal:	true,
							title: title,
							dialogClass: 'addtolist'
						}
					});

					// show the dialog window to the user
					var loadingArea = '<img id="load-more-ajax" src="'+app.URLs.loadingBrowseImg+'" />';
					addToListDialog.dialog('open');

					// create a jquery object for the dialog window
					addToListDialog = $('#addtolist-dialog');

					addToListDialog.load(href, function (data) {

						var dialogContainer		= $('.ui-dialog.addtolist'),
							checkboxes			= addToListDialog.find(':checkbox'),
							submitButton		= $('#addtolist-dialog-submit'),
							form				= $('#addtolist-dialog-form'),
							formAction			= form.attr('action'),
							itemsSelectedLabel	= $('#items-added-counter .label'),
							itemsSelectedName	= itemsSelectedLabel.find('.list-name'),
							itemsSelectedEl		= $('#items-added-count'),
							itemsSelectedPlural	= '',
							itemsSelectedLen	= 0;

						$('#addtolist-dialog img').lazyload();

						dialogContainer.prepend('<a id="addtolist-close" title="Close" href="#">Close</a>');

						form.jScrollPane({
							reinitialiseOnImageLoad: true
						});

						itemsSelectedName.text(list.name);

						// each time a checkbox is checked or uncheck,
						// we need to update the number of items selected
						// on the bottom left of the dialog
						checkboxes.change(function (e) {

							// look for all checkboxes that are checked and get a count
							itemsSelectedLen = checkboxes.filter(':checked').length;

							// update the span with a new number
							itemsSelectedEl.text(itemsSelectedLen);

							// let's disable the submit button if there are no items selected
							if (itemsSelectedLen === 0) {
								submitButton.addClass('disabled');
							} else {
								submitButton.removeClass('disabled');
							}

							// if only one item has been selected, let's show
							// "1 Item Selected"
							//
							// if any other number has been selected, let's show
							// "# Items Selected"
							itemsSelectedPlural = itemsSelectedLen === 1 ? '' : 's';
							itemsSelectedLabel.text('Item' + itemsSelectedPlural + ' selected for ' + list.name);

						});

						// submit the data to the back
						submitButton.click(function (e) {
							e.preventDefault();

							if (submitButton.hasClass('disabled') && itemsSelectedLen === 0) {
								window.location = list.url;
								return false;
							}

							var submitData	= {};

							// listId was passed in to us
							submitData.lists = list.id;
							submitData.items = '';

							// traverse through each checked checkbox
							checkboxes.filter(':checked').each(function (i) {

								// get the value for the current checkbox in the loop
								// this will be a string that could resemble a product, category, or designer
								var thisInputValue = $(this).val();

								// add on to the itemsAndTypes property of the
								// submitData object that will will pass in our
								// ajax call to the formAction url
								submitData.items = submitData.items + thisInputValue;

								// if this isn't the last item in the list, add the | delimiter
								if (i < (itemsSelectedLen - 1)) {
									submitData.items = submitData.items + '|';
								}

							});

							$.getJSON(formAction, submitData, function (json) {

								if (json.valid === true) {

									// take the user to the newly created list page
									window.location = list.url;

								} else {
									alert("An error has occurred with your request.");
								}
							});

						});

						dialogContainer.find('#addtolist-close').click(function (e) {
							e.preventDefault();
							addToListDialog.remove();
						});

					});

				},

				addItemToLists: function (form) {

					var addToListsForm		= $(form),
						addToListsForms		= $('.lists-form form'),
						checkboxes			= addToListsForm.find(':checkbox'),
						submitButton		= addToListsForm.find(':submit'),
						formAction			= addToListsForm.attr('action'),
						itemsSelectedLen	= 0;

					// submit the data to the back
					submitButton.click(function (e) {

						e.preventDefault();
						
						// Reinitialize checkboxes, since the list might have been asynchronously updated
						checkboxes = addToListsForm.find(':checkbox')

						var submitData	= {};

						// listId was passed in to us
						submitData.items = addToListsForm.attr('data-pid');
						submitData.lists = '';
						submitData.type = "product";

						// traverse through each checked checkbox
						var selectedCheckboxes = checkboxes.filter(':checked:not(:disabled)');
						itemsSelectedLen = selectedCheckboxes.length;
						selectedCheckboxes.each(function (i) {

							// get the value for the current checkbox in the loop
							// this will be a string that could resemble a product, category, or designer
							var thisInputValue = $(this).val();

							// add on to the itemsAndTypes property of the
							// submitData object that will will pass in our
							// ajax call to the formAction url
							submitData.lists = submitData.lists + thisInputValue;

							// if this isn't the last item in the list, add the | delimiter
							if (i < (itemsSelectedLen - 1)) {
								submitData.lists = submitData.lists + '|';
							}

						});
						
						// Check whether the item is already in favorites before adding it
						var foundItem = false;
						
						$.each(app.myItems, function (i) {
							if (i === submitData.items) {
								foundItem = true;
							}
						});
						
						if (!foundItem) {
							// Add the product to favorites before adding it to the list.
							// This ajax call has to be synchronous to ensure that the product is in favorites before it gets added to the list.
							var ajaxUrl = app.URLs.favoritesAddProduct + '?pid=' + submitData.items + '&type=product';
							
							$.ajax({
								type: 'POST',
								url: ajaxUrl,
								success: function(data) {
									if (data.itemID) {
										
										// Change the Add to Favorites list to Remove from Favorites
										var addItemButton		= addToListsForm.parents('.favorites-dropdown').siblings('a.add-item-favorites').first(),
											removeItemButton	= addToListsForm.parents('.favorites-dropdown').siblings('a.remove-item-favorites').first(),
											removeHref			= app.URLs.removeFromFavorites + '?id=' + data.itemID;

										submitData.items = data.itemID;

										// update the metadata and the buttons
										BNY.global.updateFavoritesMetadata();

										// show the remove link
										removeItemButton.attr('href', removeHref).show();

										// store the ID of the favorited item on the remove link
										removeItemButton.attr('data-favorite-id', data.itemID);

										// hide the add link
										addItemButton.hide();
									}
								},
								dataType: 'json',
								async: false
							});
						}

						$.getJSON(formAction, submitData, function (json) {
							
							if (json.valid === true) {

								// we need to increment/decrement the number of items
								// in each list here
								
								$.each(json.updatedLists, function (i) {
									var checkboxes	= addToListsForms.find('.form-field input[value=' + this.listId + ']'),
										counts		= checkboxes.siblings('.count'),
										newCount	= this.count;
									
									counts.each(function (i) {
										$(this).html(newCount);
									});
									
									checkboxes.attr("disabled", "disabled");
								});

								// hide the flyout that shows the lists and create new
								// list button
								
								var listsWrapper = addToListsForm.parents('.lists-wrapper');
								
								if (listsWrapper.length) {
									listsWrapper.hide();
									addToListsForm.parents().siblings('.switch').toggleClass('expanded');
								} else {
									addToListsForm.parents('.expanded-lists').hide();
									addToListsForm.parents().siblings('.add-to-lists').toggleClass('expanded');
								}
								

							} else {
								alert("An error has occurred with your request.");
							}
						});

					});
				}
			},

			scrollPane: {

				initialize: function() {

					var formItems = $('.list-container-form-items'), // Container holding all the lists
						scrollPane = null;
					
					// Find the scroll pane
					scrollPane = formItems.find('.jspContainer');
					
					// Check if the formItems exist and if the scroll pane already exists.
					// (It shouldn't reinitialize if the scroll pane is already there.)
					if (formItems.length && !scrollPane.length && formItems.find('.form-field').length !== 0) {

						// Initialize the scroll pane
						formItems.show().css('height', '110px').jScrollPane({
							autoReinitialise: true
						});
					}
					
					if (formItems.find('.form-field').length === 0) {
						formItems.siblings('.form-actions').hide();
					}
				}
			}

		}
	};

	return {

		initialize: function () {

			methods.settings.initialize();
			methods.settings.myAccount.initialize();

			methods.sharing.bindHover();
			methods.privateItem.bindHover();

			methods.follow.bindActions();

			methods.findFriends.bindActions();

			methods.loadMore();

			methods.lists.create.bindActions();
			methods.lists.update.bindActions();
			methods.lists.remove.bindActions();
			
			methods.lists.scrollPane.initialize();
			
			methods.bindEvents();
			
			BNY.global.equalizeChildHeights($('.productimage img'));

		},
		
		addItemToLists: function (form) {
			return methods.lists.create.addItemToLists(form);
		},

		/**
		* The form to create a new list can appear in many places.
		* This is a publicly accessible function to be called from elsewhere.
		*
		* @method validateCreateListForms
		* @return {Function} methods.lists.validation.validateListForm()
		*/

		validateCreateListForms: function () {
			return methods.lists.validation.validateListForm('form.create-list-form', methods.lists.create.createListSubmitHandler);
		},

		/**
		* The form to update a list can appear in many places.
		* This is a publicly accessible function to be called from elsewhere.
		*
		* @method validateUpdateListForms
		* @return {Function} methods.lists.validation.validateListForm()
		*/

		validateUpdateListForms: function () {
			return methods.lists.validation.validateListForm('form.update-list', methods.lists.update.updateListSubmitHandler);
		},

		removeItems: function () {

			$('div#favorites').on('click', 'a.remove-favorite', function (e) {

				e.preventDefault();

				var href = $(this).attr('href');

				$.get(href, function (data) {

					var json = $.parseJSON(data);

					if (typeof json === 'object') {

						if (json.valid === true) {
							window.location.reload();
						} else {
							alert("An error has occurred with your request.");
						}

					}

				});

			});
		}

	};

}.call(BNY.favorites));

$(document).ready(function () {
	'use strict';
	BNY.favorites.initialize();
	BNY.favorites.removeItems();
});
