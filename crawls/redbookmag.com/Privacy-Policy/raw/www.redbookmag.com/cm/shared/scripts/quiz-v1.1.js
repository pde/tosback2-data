/*global $, $h, window, refreshAds, pageviewTracking, console, newButton, mag_user, SHARETHIS */
/**********************
*	Quiz - Version 1.1
*	Features: ABC/Personality, Infinite Tout, Trivia, Functional Progress Bar, Profile, Sum-Scale
*	Purpose: This script is the version that should go live with
*		the launch of the Trivia Quizzes. This is also where profile
*		and progress bar work will be done.
*	Changes: Added native JSON parsing.
***********************/
if (!window.$h) { window.$h = {}; }

$h.quiz = {
	initQuiz: function(o){
		this.time_started = this.formatDate(new Date());
		this.container = o.container;
		this.article_id = o.article_id;
		this.title = o.title;
		this.url = o.url;
		this.type = o.type;
		this.pages = $(this.container).find('.page');
		this.scoreboard = [];
		this.in_progress = false;
		this.profileObj = {
			article_id: this.article_id,
			time_started: this.time_started,
			//ur_id: (mag_user.ur_id || null),
			user_result_text: '',
			user_result_additional_text: '',
			user_result_image: '',
			user_questions: []
		};
		this.randomizeAnswers();
		this.setRadioEvents();
		this.setQuestionNumbers();
		this.infiniteTout.init();

		//set share object for the virals
		this.setShareObject({
			sharethis: 'quiz-virals-sharethis',
			email: 'quiz-virals-email',
			facebook: 'quiz-virals-facebook',
			twitter: 'quiz-virals-twitter',
			offset: -130
		});

		this.userCookie.evaluate();

		var that = this;

		$('a.next').click(function(){
			var c = that.getCurrentPage(),
				islast = $(this).hasClass('submit');

			if (!that.in_progress){
				that.in_progress = true;
				window.onunload = function(){
					return false;
				};
			} else if (islast){
				that.in_progress = false;
				window.onunload = null;
			}

			if (typeof refreshAds === 'function' && typeof pageviewTracking === 'function'){
				refreshAds({option:'alwaysrefresh'});
			} else {
				//console.warn('refreshAds or pageviewTracking not loaded. skipping..');
			}

			if ($(this).hasClass('intro')){
				that.nextPage();
			} else {
				if (typeof that.progressBar.update !== 'function'){
					that.progressBar.init(c);
				}
				that.validatePage({
					page: c,
					success: function(p){
						that.recordAnswers(p);
						switch (that.type){
							case 'abc':
								if (islast){
									that.abcScore(function(){
										var result = that.scoreboard[0].val;
										that.showResults(result);
										that.nextPage();
										that.showResultSocialButton();
										that.calculateHeight();
									});
								} else {
									that.nextPage();
								}
								break;
							case 'trivia':
								that.unsetPageEvents(p);
								that.showTriviaAnswers(p);

								if (islast){
									that.triviaScore();
									that.showResultTriviaSocialButton();
									that.calculateHeight();
								}

								var oldButton = $(c).find('a.next'),
									newButton = $(oldButton).clone(false),
									next = $(c).find('a.nextPage');

								$(next).click(function(){
									that.nextPage();
									that.calculateHeight();
									return false;
								});

								$(newButton).removeClass('answer')
									.click(function(){
										that.nextPage();
										that.calculateHeight();
										return false;
								});

								$(oldButton).replaceWith(newButton);

								break;
							case 'sum-scale':
								if (islast){
									that.sumScaleScore();
									that.nextPage();
									that.showResultSocialButton();
									that.calculateHeight();
								} else {
									that.nextPage();
								}
								break;
							default:
								break;
						}
					},
					error: function(errors){
						that.showErrors(errors);
					}
				});
			}

			return false;

		});
		$('.result .close_popup').click(function(){
			$('.result .quiz_popup').addClass("hidden");
		});
		$('.result a.save').click(function(){
			if (mag_user.logged_in && mag_user.user_name){
				that.saveToProfile();
			} else {
				that.userCookie.data.click = 'save';
				that.userCookie.save();
				that.modal.init($('#quizModal #loggedOut'));
				that.modal.view();
			}
			return false;
		});

		$(this.container).find('a.profile').click(function(){
			if (mag_user.logged_in && mag_user.user_name){
				window.location = '/registration/editProfile.html';
			} else {
				that.userCookie.data.click = 'profile';
				that.userCookie.save();
				that.modal.init($('#quizModal #loggedOut'));
				that.modal.view();
			}
			return false;
		});
	},
	userCookie: {
		//requires jquery.json.js to converst json to/from a string
		//name of our cookie is hdm-quiz
		data: {
			questions: []
		},
		load: function(){
			//find/load the cookie. convert it back to json and assign it to userCookie.data
			var cookies = document.cookie.split(';'), json, i;
			for (i = 0; i < cookies.length; i++){
				if (cookies[i].indexOf('hdm-quiz=') > -1){
					$h.quiz.trim(cookies[i]);
					json = decodeURIComponent(cookies[i].substring(10,cookies[i].length));
					this.data = (typeof window.JSON !== 'undefined') ? JSON.parse(json) : $.toJSON(json);
				}
			}
			return this.data;
		},
		save: function(){
			//this cookie only needs to last long enough
			//for the user to get redirected back from login/reg
			//setting to 20 minutes
			//console.log('saving user cookie..');

			var d = new Date(),
				p = '/',
				data = (typeof window.JSON !== 'undefined') ? JSON.stringify(this.data) : $.jSONToString(this.data),
				val = encodeURIComponent(data);
			d.setMinutes(d.getMinutes()+20);
			document.cookie = 'hdm-quiz=' + val + ';path=' + p + ';expires=' + d.toUTCString();
			//console.log('cookie set..');
		},
		clear: function(){
			//Clears cookie by setting expires to yesterday
			var d = new Date();
			d.setDate(d.getDate() - 1);
			document.cookie = 'hdm-quiz=;path=/;expires=' + d.toUTCString();
		},
		evaluate: function(){
			/********************
			*	This function is going to rebuild the profile object from the userCookie.
			*	User's questions will be kept in this format ['a1','a2','a3','a1'] where
			*	the value matches the answer id of the question number that matches up
			*	to the array index.
			*********************/
			this.load();
			this.clear();

			var that = $h.quiz,
				data = this.data,
				profileObj = that.profileObj,
				quizQuestions = $(that.container).find('.question');

			if (data.result){
				//console.log('theres a result..');
				var ur_id = that.profileObj.ur_id || mag_user.ur_id || null,
					c = that.getCurrentPage();

				$(data.questions).each(function(i){
					$(quizQuestions).each(function(j){
						if (i === j){
							//question indexes match.. lets get the answer we need
							//console.log(data.questions[i]);
							var selectedAnswer = $(this).find('#' + data.questions[i]),
								qtext = $(this).find('.qtext').text(),
								qimage = $(this).find('.qimage img').attr('src') || '',
								atext = $(selectedAnswer).find('.answerText').text(),
								aimage = $(selectedAnswer).find('.answerImage').attr('src') || '',
								aval = $(selectedAnswer).find('input').val();

							var	qo = {
								user_question_text: that.trim(qtext),
								user_question_image: qimage,
								user_answer_text: that.trim(atext),
								user_answer_image: aimage,
								user_answer_val: (typeof aval === 'string') ? that.trim(aval) : aval
							};

							profileObj.user_questions.push(qo);
						}
					});
				});

				profileObj.ur_id = ur_id;

				that.showResults(data.result);

				$(c).hide();
				$('#results.page').show();
			}

			switch (data.click){
				case 'profile':
					$(document).ready(function(){
						window.location = '/registration/editProfile.html';
					});
					break;
				case 'save':
					that.saveToProfile();
					break;
				default:
					break;
			}
		}
	},
	nextPage: function(){
		var current = this.getCurrentPage(),
			next = $(current).next('.page');
		if (next.length > 0){
			$(current).removeClass('current');
			$(current).hide();
			$(next).addClass('current');
			$(next).show();


			if (typeof this.progressBar.update !== 'function'){
				this.progressBar.init(next);
			} else {
				this.progressBar.update(next);
			}

			this.gotoTop();
		}
	},
	getCurrentPage: function(){
		var c;
		$(this.pages).each(function(){
			if($(this).hasClass('current')){ c = this; }
		});
		return c;
	},
	randomizeAnswers: function(){
		var that = this;
		$(this.container).find('.answers.random').each(function(i){
			var answerList = $(this).find('.answer'),
				arr = $.makeArray(answerList);
			arr.sort(that.sortRand);
			$(this).html(arr);
		});
	},
	validatePage: function(po){
		/***************************
		*	This function goes through all of the questions
		*	on a quiz page and checks for any that weren't
		*	answered. If it finds blanks, it calls an error
		*	callback. If not, it calls a success callback.
		***************************/
		if (typeof po.success !== 'function'){ po.success = function(){}; }
		if (typeof po.error !== 'function'){ po.error = function(){}; }

		var regPagenum = /(\d+)/;

		var that = this,
			q = $(po.page).find('.question'),
			valid = true,
			errors = [];

		$(q).each(function(i){
			var a = $(this).find('.answer input:checked'),
				qnum = parseInt($(this).find('.qnum').text(),10);
			if(a.length < 1){
				var err = {
					page: po.page,
					qnum: qnum,
					question: this,
					index: i,
					type: 'blank'
				};
				valid = false;
				errors.push(err);
			} else {
				that.clearError(this);
			}
		});

		if (valid) {
			that.clearError(po.page);
			po.success(po.page);
		} else {
			po.error(errors);
		}
	},
	showTriviaAnswers: function(page){
		/*********************************
		*	This function will go through the page when a user clicks 'Continue'. It will
		*	determine whether each answer is correct or not, then show a marker next to each.
		*	If there are 1 or more incorrect answers, text for each incorrect answer will be shown.
		*	If there are 0 incorrect answers, text for each correct answer will be shown.
		*********************************/
		var that = this,
			questions = $(page).find('.question'),
			correct = [],
			correctBox = $(page).find('.qp_correct'),
			correctContainer = $(correctBox).find('.correct_container'),
			incorrect = [],
			incorrectBox = $(page).find('.qp_incorrect'),
			incorrectContainer = $(incorrectBox).find('.incorrect_container'),
			correctText, incorrectText, marker;

		$(questions).each(function(){
			var answer = $(this).find('.answer.selected'),
				a_text = $(answer).find('.answerText');

			if($(answer).hasClass('c1')){
				correctText = $(this).find('.correctText').html();
				marker = $(answer).find('.marker.correct');
				correct.push(correctText);
				$(marker).addClass('show');
			} else {
				incorrectText = $(this).find('.incorrectText').html();
				marker = $(answer).find('.marker.incorrect');
				incorrect.push(incorrectText);
				$(marker).addClass('show');
			}
		});

		if (incorrect.length > 0){
			var incorrectMessage = (incorrect.length > 1) ? incorrect.length + ' Questions ' : incorrect.length + ' Question ';
			for (var i = 0; i < incorrect.length; i++){
				var iText = $('<p></p>')
					.addClass('q_message')
					.html(incorrect[i])
					.appendTo(incorrectContainer);
			}

			$(incorrectBox).find('.incorrect_text').text(incorrectMessage);
			$(incorrectBox).show();

		} else if (correct.length > 0){
			for (var j = 0; j < correct.length; j++){
				var cText = $('<p></p>')
					.addClass('q_message')
					.html(correct[j])
					.appendTo(correctContainer);
			}

			$(correctBox).show();
		}

		that.gotoTop();
	},
	showResultSocialButton: function(){
		var title = $('#quizHead h1').text(),
		image = $('#quizHead img.mainImage').attr('src'),
		url = $('#quiz_url').text(),
		promo_teaser = $('#quiz_promo_teaser').text(),
		twitter_via = $('#quiz_twitter_via').text(),
		site_name = $('#quiz_site_name').text(),
		result_text = '',
		result_image = '';
		$('#results .result').each(function(){
			if($(this).attr("style") == "display: block;")
			{
				result_image = $(this).find('.resultImage > img').attr("src");
				result_text = $(this).find('.resultText').text();
			}
		});
		if(result_image == undefined || result_image == '')
		{
			result_image = image;
		}
		if(result_image == undefined)
		{
			result_image = '';
		}
		//Twitter
		$('.quiz_twitter').html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="I got ' + result_text + '. ' + title + '" data-url="' + url + '" data-count="none" data-via="' + twitter_via + '" data-lang="en" data-related="' + twitter_via + '">Tweet</a>');
		$.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true}); //Recall to re-render tweet button
		//Pinterest
		$('.quiz_pinterest').html('<div id="xs_soc_pinit" hvtnode="pinbutton"><a href="http://pinterest.com/pin/create/button/?url=' + url + '&media=' + result_image + '&description=I took the ' + title + ' quiz on ' + site_name + ' and got ' + result_text + '" class="pin-it-button" count-layout="none" target="_blank"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a></div>');
		$.ajax({ url: '//assets.pinterest.com/js/pinit.js', dataType: 'script', cache:true}); //Recall to re-render pinit button
		//Facebook
		$('.xs_quiz_fbshare').click(function(){
			FB.ui({
            method: 'feed',
            name: 'I took the ' + title + ' quiz on ' + site_name + ' and got ' + result_text,
            link: url,
            picture: result_image,
            caption: '',
            description: promo_teaser,
            message: ''
      		});
		});
		//Plusone
		//$('meta[property="og:description"]').attr('content', 'I took the ' + title + ' quiz on ' + url + ' and got ' + result_text);
		$('.xs_quiz_plusone').html('<g:plusone callback="plusone_vote" size="medium" count="false" href="' + url + '"></g:plusone>');
		$.ajax({ url: 'https://apis.google.com/js/plusone.js', dataType: 'script', cache:true}); //Recall to re-render plusone button => it's not working, cache problem
	},
	showResultTriviaSocialButton: function(){
		var num_correct = $('#r1 .num_correct').text(),
		num_total = $('#r1 .num_total').text(),
		title = $('#quizHead hgroup h1').text(),
		promo_teaser = $('#quiz_promo_teaser').text(),
		image = $('#quizHead figure img.mainImage').attr('src'),
		url = $('#quiz_url').text(),
		twitter_via = $('#quiz_twitter_via').text(),
		result_image = '';
		$('#results .result').each(function(){
			if($(this).attr("style") == "display: block;")
			{
				result_image = $(this).find('.resultImage > img').attr("src");
			}
		});
		if(result_image == undefined || result_image == '')
		{
			result_image = image;
		}
		//Twitter
		$('.quiz_twitter').html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="I got ' + num_correct + ' out of ' + num_total + ' on ' + title + '" data-count="none" data-url="' + url + '" data-via="' + twitter_via + '" data-lang="en" data-related="' + twitter_via + '">Tweet</a>');
		$.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true}); //Recall to re-render tweet button
		//Pinterest
		$('.quiz_pinterest').html('<div id="xs_soc_pinit" hvtnode="pinbutton"><a href="http://pinterest.com/pin/create/button/?url=' + url + '&media=' + result_image + '&description=I got ' + num_correct + ' out of ' + num_total + ' on ' + title + '" class="pin-it-button" count-layout="none" target="_blank"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a></div>');
		$.ajax({ url: '//assets.pinterest.com/js/pinit.js', dataType: 'script', cache:true}); //Recall to re-render pinit button
		//Facebook
		$('.xs_quiz_fbshare').click(function(){
			FB.ui({
            method: 'feed',
            name: title,
            link: url,
            picture: image,
            caption: url,
            description: 'I got ' + num_correct + ' out of ' + num_total + '! ' + promo_teaser,
            message: ''
      		});
		});
		$('.xs_quiz_plusone').html('<g:plusone callback="plusone_vote" size="medium" count="false" href="' + url + '"></g:plusone>');
		$.ajax({ url: 'https://apis.google.com/js/plusone.js', dataType: 'script', cache:true}); //Recall to re-render plusone button => it's not working, cache problem
	},
	calculateHeight: function(){
		var result_image = '',
		result_links = '',
		result_text_height = '',
		result_additional_text_height = '',
		result_scoreText = '',
		result_scoreText_height = 0,
		share_container = '',
		popup_container = '';
		$('#results .result').each(function(){
			if($(this).is(':visible'))
			{
				result_image = $(this).find('.resultImage img');
				result_text_height = $(this).find('.resultText').outerHeight(true);
				result_scoreText = $(this).find('.scoreText');
				result_links = $(this).find('.resultLinks');
				if(result_scoreText != undefined && result_scoreText.html() != null)
				{
					result_scoreText_height = result_scoreText.outerHeight(true);
				}
				result_additional_text_height = $(this).find('.resultAdditionalText').outerHeight(true);
				share_container = $(this).find('.socialbox');
				popup_container = $(this).find('.quiz_popup');
			}
		});
		if((result_image != '') && (result_image != undefined))
		{
			var result_image_height = result_image.outerHeight(true);
			if(result_image_height == 0)
			{
				result_image_height = result_image.height();
			}
			var share_container_height = share_container.outerHeight(true);
			if(result_image_height > result_text_height + result_scoreText_height + result_additional_text_height + 90)
			{
				share_container.addClass("vertical");
				result_links.addClass("resultLinksVertical");
			}
			else{
				share_container.addClass("hori");
			}
		}
	},
	recordAnswers: function(page){
		/*******************************
		*	This function is called at the end of every page. It records all of the users answer into
		*	an object that we'll pass to the user's profile later on. It also saves the answer id to
		*	the object that will hold cookie data later if they're not logged in. We will have to rebuild
		*	the profile object from the cookie once they log in.
		*******************************/
		var that = this,
			q = $(page).find('.question');

		$(q).each(function(i){
			var a = $(this).find('.answer input:checked'),
				qtext = $(this).find('.qtext').text(),
				qimage = $(this).find('.qimage img').attr('src') || '',
				aid = $(a).parents('.answer').attr('id'),
				atext = $(a).parents('.answer').find('.answerText').text(),
				aimage = $(a).parents('.answer').find('.answerImage').attr('src') || '',
				aval = $(a).val(),
				now = that.formatDate(new Date());

			var	qo = {
				user_question_text: that.trim(qtext),
				user_question_image: qimage,
				user_answer_text: that.trim(atext),
				user_answer_image: aimage,
				user_answer_val: (typeof aval == 'string') ? that.trim(aval) : aval
			};

			//save the answer's id to the cookie
			that.userCookie.data.questions.push(aid);

			//save the whole thing to the profile object
			that.profileObj.user_questions.push(qo);
		});
	},
	abcScore: function(cb){
		/*****************************
		*	Pretty self explanatory. This function
		*	scores the ABC Personality quizzes
		*****************************/
		if (typeof cb != 'function'){ cb = function(){}; }
		var questions = this.profileObj.user_questions,
			that = this;

		$(questions).each(function(i){
			var exists = false,
				q = this;
			$(that.scoreboard).each(function(){
				if (this.val == q.user_answer_val){
					exists = true;
					this.count++;
				}
			});
			if (!exists){ that.scoreboard.push(that.scorecard(this)); }
		});
		this.scoreboard.sort(this.sortDesc);
		cb();
	},
	triviaScore: function(){
		/***************************
		*	This function will go through each question and record the number correct and total
		*	questions. We then need to compare the number of correct answers to the start and
		*	end ranges for each result. Once we find the correct result, we call showResult.
		****************************/
		//console.log('tallying score..');
		var answers = $(this.pages).find('.answer.selected'),
			total = $(this.pages).find('.question').length,
			numCorrect = 0,
			results = $('#results').find('.result'),
			that = this;

		$(answers).each(function(){
			if ($(this).hasClass('c1')){
				numCorrect++;
			}
		});

		$(results).each(function(i){
			var start = parseInt($(this).find('.correctStart').text(),10),
				end = parseInt($(this).find('.correctEnd').text(),10);

			if (numCorrect >= start && numCorrect <= end){
				that.showResults(i+1);
			}

			$(this).find('.num_correct').text(numCorrect);
			$(this).find('.num_total').text(total);
		});
	},
	sumScaleScore: function(cb){
		if (typeof cb != 'function'){ cb = function(){}; }

		var questions = this.profileObj.user_questions,
			results = $(this.container).find('.result'),
			sum = 0,
			that = this;

		$(questions).each(function(){
			sum += parseInt(this.user_answer_val,10);
		});

		$(results).each(function(i){
			var start = parseInt($(this).find('.resultStart').text(),10),
				end = parseInt($(this).find('.resultEnd').text(),10);

			if (sum >= start && sum <= end){
				//console.log('sum is ' + sum);
				//console.log('found result match');
				that.showResults(i+1);
			}
		});
	},
	saveToProfile: function(){
		/*****************************
		*	This function is going to make some calls
		*	to save the quiz result to the user's
		*	profile.
		*****************************/
		var that = this;

		//attempt to load user's saved results
		this.getMyQuizResults(function(myResults){
			var url = '/api/js/quiz';

			//if this quiz is in user's result list, we need to update that result
			//instead of creating a new one
			$(myResults).each(function(){
				if (this.article_id == that.article_id){
					url += '/' + this.ur_quiz_id;
				}
			});

			//now we need to trim the profile object fields
			that.charLimits.apply(that.profileObj);

			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'text',
				data: {
					_method: 'PUT',
					json: (typeof window.JSON !== 'undefined') ? JSON.stringify(that.profileObj) : $.jSONToString(that.profileObj)
				},
				error: function(xhr,status,err){

				},
				success: function(data,status,xhr){
					that.modal.init($('#quizModal #loggedIn'));
					that.modal.view();
					that.userCookie.clear();
				}
			});

		});
	},
	getMyQuizResults: function(cb){
		/***********************
		*	This function returns an array
		*	of saved quiz results filtered
		*	by ur_id.
		***********************/
		if (typeof cb != 'function'){ cb = function(){}; }

		$.ajax({
			url: '/api/js/quiz/list',
			type: 'GET',
			dataType: 'json',
			error: function(e){
				if (e.status == 404){
					//no quizzes found..
					cb([]);
				} else {
					//console.warn('Error retrieving quizzes.');
				}
			},
			success: function(data){
				//got my quizzes..
				cb(data);
			}
		});
	},
	deleteMyQuizResult: function(obj){
		/*********************************
		*	This function deletes a quiz result
		*	using the 'ur_quiz_id' of the result
		**********************************/
		obj.success = obj.success || function(){};
		obj.error = obj.error || function(){};

		var url = '/api/js/quiz/' + obj.ur_quiz_id;

		$.ajax({
			url: url,
			type: 'POST',
			data: { _method: 'DELETE' },
			error: function(){ obj.error(); },
			success: function(data){ obj.success(); }
		});

	},
	renderMyQuizResults: function(obj){
		var target = obj.target,
			that = this;
		
		this.getMyQuizResults(function(results){
			
			$(results).each(function(i){
				var result = this;
				
				if (i === 0){
					$('<h4></h4>').text('Quiz Results')
						.appendTo(target);
				}
				
				//the container
				var resultContainer = $('<div></div>')
						.addClass('resultContainer');
				
				//image if there is one..
				if (result.user_result_image){
					var resultImage = $('<img />')
							.addClass('quizImage')
							.attr('src',result.user_result_image)
							.appendTo(resultContainer);
				}
						
				//Text result stuff
				var quizTitle = $('<a></a>')
						.addClass('quizTitle')
						.attr('href',result.url_name)
						.html(decodeURIComponent(result.title) || 'No title found')
						.appendTo(resultContainer),
					resultText = $('<p></p>')
						.addClass('resultText')
						.html(decodeURIComponent(result.user_result_text))
						.appendTo(resultContainer),
					resultAddText = $('<p></p>')
						.addClass('resultAddText')
						.html(decodeURIComponent(result.user_result_additional_text))
						.appendTo(resultContainer);
				
				//Button to delete the result
				var removeButton = $('<a></a>')
						.addClass('removeButton')
						.attr('href','#')
						.click(function(){
							that.deleteMyQuizResult({
								ur_quiz_id: result.ur_quiz_id,
								error: function(){
									alert('We are unable to delete this quiz result right now.');
								},
								success: function(){
									$(resultContainer).slideUp();
								}
							});
							return false;
						})
						.appendTo(resultContainer);
				
				//something to clear it..
				var clear = $('<div></div>')
						.addClass('clear')
						.appendTo(resultContainer);
						
				//render it
				$(resultContainer).appendTo(target);
			});
		});
	},
	showResults: function(r){
		var result = '#r' + r;

		this.userCookie.data.result = r;
		this.setUserResult(result);

		$(result).show();
	},
	setUserResult: function(result){
		var socialText = $(result).find('.resultSocialText').text() || this.title,
			resultSharethis = $(result).find('.result-sharethis').attr('id'),
			resultEmail = $(result).find('.result-email').attr('id'),
			resultEmailPopup = $(result).find('.result-email-popup').attr('id'),
			resultFacebook = $(result).find('.result-facebook').attr('id'),
			resultTwitter = $(result).find('.result-twitter').attr('id'),
			indexPattern = /\d+/g,
			resultURL = 'http://' + window.location.host + window.location.pathname + "?ur_quiz_result_index=" + indexPattern.exec(result);


		this.setShareObject({
			title: socialText,
			url: resultURL,
			sharethis: resultSharethis,
			email: resultEmail,
			emailPopup: resultEmailPopup,
			facebook: resultFacebook,
			twitter: resultTwitter,
			offset: 0
		});

		this.profileObj.user_result_text = encodeURIComponent($(result).find('.resultText').text()) || '';
		this.profileObj.user_result_additional_text = encodeURIComponent($(result).find('.resultAdditionalText').text()) || '';
		this.profileObj.user_result_image = $(result).find('.resultImage img').attr('src') || '';
	},
	showErrors: function(errors){
		var qp_error = $(errors[0].page).find('.qp_error'),
			p_msg = '', p_missed = '',
			missed = [], wrong = [];

		$(errors).each(function(i){
			var q_msg,
				qnum = this.qnum,
				q_error = $(this.question).find('.q_error');
			if (this.type === 'blank'){
				q_msg = 'Please answer this question.';
				missed.push(qnum);
			}
			if (q_msg){
				$(q_error).find('.message').text(q_msg);
				$(q_error).show();
			}
		});

		if (missed.length){
			p_msg = 'You must answer all of the questions to take the quiz.';
			p_missed = 'You missed ';
			p_missed += (missed.length > 1) ? 'numbers ' : 'number ';
			p_missed += missed.join(', ');
		} else if (wrong.length){
			//do trivia stuff
		}

		if (p_msg){ $(qp_error).find('.message').text(p_msg); }
		if (p_missed){ $(qp_error).find('.missed').text(p_missed).show(); }

		$(qp_error).show();
		this.gotoTop();
	},
	setRadioEvents: function(){
		$(this.pages).each(function(i){
			var questions = $(this).find('.question');
			$(questions).each(function(){
				var q = this,
					answers = $(this).find('.answer');
				$(answers).each(function(){
					//hover event
					$(this).hover(function(){
						$(this).addClass('over');
					},
					function(){
						$(this).removeClass('over');
					});
					//click event to show selected
					$(this).click(function(){
						var radio = $(this).find('input[type=radio]'),
							selected = $(q).find('.answer.selected'),
							selectedRadio = $(selected).find('input[type=radio]');

						$(selected).removeClass('selected');
						$(selectedRadio).attr('checked',false);
						$(selectedRadio).attr('disabled',false);

						$(radio).attr('checked',true);
						$(radio).attr('disabled',true);

						$(this).addClass('selected');
					});
				});
			});
		});
	},
	unsetPageEvents: function(page){
		/*********************************
		*	This function will go through a page and remove any event listeners
		*	on the radio buttons and answer divs. This is to make sure the user
		*	doesn't click a different answer after we've shown them the right answers
		*********************************/
		var answers = $(page).find('.answers .answer'),
			radios = $(page).find('input[type=radio]');

		$(answers).unbind('click')
			.unbind('mouseenter')
			.unbind('mouseleave')
			.css('cursor','auto');

		$(radios).each(function(){
			this.disabled = true;
		});

	},
	setShareObject: function(o){
		//this function only works with the sharethis script
		if (!window.SHARETHIS){
			//console.warn('SHARETHIS not found');
			$('#result-sharethis, #result-email, #result-facebook, #result-twitter').hide();
			return;
		}

		var so = SHARETHIS.addEntry({
				title: (o.title || this.title),
				url: (o.url || window.location)
			}, {offsetLeft:o.offset}),
			sharethis = document.getElementById(o.sharethis),
			email = document.getElementById(o.email),
			emailPopup = document.getElementById(o.emailPopup),
			facebook = document.getElementById(o.facebook),
			twitter = document.getElementById(o.twitter);

		if(sharethis){ so.attachButton(sharethis); }
		if(email){ so.attachChicklet('email',email); }
		if(emailPopup){ so.attachChicklet('email',emailPopup); }
		if(facebook){ so.attachChicklet('facebook',facebook); }
		if(twitter){ so.attachChicklet('twitter',twitter); }
	},
	infiniteTout: {
		quizzes: [],
		init: function(){
			var found = false;
			if (this.quizzes.length < 2){
				return;
			}
			for (var i = 0; i < this.quizzes.length; i++){
				if (this.quizzes[i].url == $h.quiz.url){
					found = true;
					this.render(this.quizzes[i+1] || this.quizzes[0]);
				}
			}
			if (!found){
				this.render(this.quizzes[0]);
			}
		},
		add: function(quizObj){
			this.quizzes.push(quizObj);
		},
		render: function(quizObj){
			var target = $('#infiniteToutContainer'),
				title = $('<a></a>').addClass('titleLink')
					.attr('href',quizObj.path + quizObj.url)
					.html(quizObj.title)
					.appendTo(target),
				teaser = $('<a></a>').addClass('teaserLink')
					.attr('href',quizObj.path + quizObj.url)
					.html(quizObj.teaser)
					.appendTo(target),
				button = $('<a></a>').addClass('continueLink')
					.attr('href',quizObj.path + quizObj.url)
					.html('<span>Continue</span>')
					.appendTo(target);
		}
	},
	progressBar: {
		/******************
		*	Progress Bar Object
		*	The idea here is that we take the difference between the starting position
		*	and the ending position and divide it by the number of pages. That will give
		*	us an incremental pixel width we can use to move the progress bar on each page.
		*******************/
		init: function(page){
			this.pages = $('.qp.page');
			this.maxWidth = $(page).find('.progressOverlay').width();
			this.currWidth = this.maxWidth;
			this.minWidth = $(page).find('.progressEdge').width() || 5;
			this.increment = (this.maxWidth - this.minWidth) / this.pages.length;

			this.update = function(page){
				var bar = $(page).find('.progressOverlay'),
					newWidth = this.currWidth - this.increment;

				if (newWidth < this.minWidth){
					newWidth = this.minWidth;
				}

				$(bar).width(newWidth);

				this.currWidth = newWidth;
			};
		}
	},
	//Alex's modal code from PM with some tweaks for multiple modals
	modal: {
		on : false,
		scrollTop : 0,
		timeoutArray : [],
		lock : true,
		view : function(){
			if (this.lock) return false;
			this.lock = true;
			var backdrop = document.getElementById("hmodalbackdrop");
			this.util.setOpacity(backdrop,0);
			backdrop.style.display = "block";
			window.setTimeout("$h.quiz.modal.util.unLock(false)",300);
			this.anim.flip();
			document.getElementById("hmodalframe").style.display = "block";
			document.getElementById("quizModal").style.display = "block";
		},
		close : function(){
			document.getElementById("hmodalbackdrop").style.display = "none";
			document.getElementById("hmodalframe").style.display = "none";
		},
		anim : {
			flip : function(){
				for (var items in this.timeoutArray){
					clearTimeout(this.timeoutArray[items]);
				}
				var numframes = 1,
					framerate = 30,
					// don't change this, as it's dependent on numframes
					opacityDelta = 100 / numframes,
					opacityIncrement = [],
					opacityset;
				for (var i=0; i <= numframes; i++) {
					opacityIncrement.push(50*Math.sin(i*(Math.PI/2)/numframes+Math.PI/2));
				}
				for (i=0; i <= numframes; i++) {
					opacityset = opacityIncrement.pop();
					$h.quiz.modal.timeoutArray.push(window.setTimeout("$h.quiz.modal.util.setOpacityById(\"hmodalbackdrop\","+opacityset+")",framerate*i));
				}
			}
		},
		util : {
			unLock : function(state){
				$h.quiz.modal.lock = state;
				//console.log("unlock!"+hModal.lock);
			},
			setOpacity : function(element, opacityLevel){
				// graciously lifted from Andrew Johnson
				var eStyle = element.style;
				eStyle.opacity = opacityLevel / 100;
				eStyle.filter = 'alpha(opacity='+opacityLevel+')';
			},
			setOpacityById : function(id,opacityLevel){
				// graciously lifted from Andrew Johnson
				var element = document.getElementById(id);
				if (!!!element) return false;
				var eStyle = element.style;
				eStyle.opacity = opacityLevel / 100;
				eStyle.filter = 'alpha(opacity='+opacityLevel+')';
			},
			getScrollTop : function(){
				return $(window).scrollTop();
			},
			setScrollTop : function(val){
				$(window).scrollTop(val);
			}

		},
		init : function(elModal){
			// if the window gets resized or something, we need to make adjustments
			var backdrop, frame,
				that = this;

			if (document.getElementById('hmodalbackdrop')){
				backdrop = document.getElementById('hmodalbackdrop');
			} else {
				backdrop = $('<div></div>')
					.attr('id','hmodalbackdrop')
					.click(function(){
						$h.quiz.modal.close();
					});
			}
			if (document.getElementById('hmodalframe')){
				frame = document.getElementById('hmodalframe');
			} else {
				frame = $('<div></div>')
					.attr('id','hmodalframe');
			}

			this.lock = false;

			$(backdrop).appendTo('body');
			$(frame).appendTo('body');
			$('#quizModal').appendTo(frame);
			$('#quizModal').find('.modalState').hide();
			$(elModal).find('.modalClose').click(function(){
				that.close();
			});
			$(elModal).show();

			this.resize();
		},
		resize : function(){
			var hmodalbackdrop = document.getElementById("hmodalbackdrop");
			var hmodalframe = document.getElementById("hmodalframe");

			var backdropon = false;
			if (hmodalbackdrop.style.display == "block"){
				hmodalbackdrop.style.display = "none";
				backdropon = true;
			}


			var docHeight = $(document).height();
			var docWidth = $(document).width();
			var windowHeight = $(window).height();
			var frameHeight = 275;
			var frameTop = ($(window).height()-275)/2;
			var frameLeft = ($(window).width()-630)/2;
			hmodalbackdrop.style.height = docHeight+"px";
			hmodalbackdrop.style.width = docWidth+"px";
			//hmodalframe.style.height = frameHeight+"px";
			hmodalframe.style.top = frameTop+"px";
			hmodalframe.style.left = frameLeft+"px";

			if (backdropon){
				hmodalbackdrop.style.display = "block";
			}
		}
	},
	setQuestionNumbers: function(){
		$(this.container).find('.question').each(function(i){
			var qnum = $('<span></span>')
				.addClass('qnum')
				.addClass('hidden')
				.text(i+1);
			$(qnum).appendTo(this);
			$(this).find('.qtext .counter').text(i+1);
		});
	},
	setPageTotal: function(el){
		$(this.pages).find('.progress .total').text($(el).length + 1);
	},
	clearError: function(q){
		$(q).find('.q_error, .qp_error').hide();
	},
	scorecard: function(o){
		return {
			val: o.user_answer_val,
			count: 1
		};
	},
	formatDate: function(d){
		var year = d.getFullYear(),
			month = ((d.getMonth() + 1) < 10) ? '0' + (d.getMonth() + 1) : d.getMonth() + 1,
			day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate(),
			hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours(),
			minute = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes(),
			second = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();

		return (year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
	},
	trim: function(s){
		return (s.replace(/^\s+|\s+$/g,''));
	},
	sortDesc: function(a,b){
		return (b.count - a.count);
	},
	sortRand: function(){
		return (0.5 - Math.random());
	},
	gotoTop: function(){
		if(window.location.hash == '#qtop' && $.browser.safari){
			window.location.hash = '#qtop-safari';
		} else {
			window.location.hash = '#qtop';
		}
	},
	cache: [],
	preload: function(){
		for (var i = arguments.length; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			this.cache.push(cacheImage);
		}
	},
	charLimits: {
		/* This object is going to hold all of the character limits for the profile fields
			and a function that applies them to the profile object. */
		apply: function(o){
			for (var i in o){
				if (typeof o[i] == 'object'){
					this.apply(o[i]);
				} else if ((typeof o[i] == 'string') && typeof this[i] == 'number'){
					if (o[i].length > this[i]){
						o[i] = o[i].substr(0,this[i]);
					}
				}
			}
		},
		user_result_text: 250,
		user_result_additional_text: 1000,
		user_result_image: 200,
		user_question_text: 250,
		user_question_image: 200,
		user_answer_text: 250,
		user_answer_image: 200,
		user_answer_val: 250
	}
};