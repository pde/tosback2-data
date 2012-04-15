(function($) {
	
	$.fn.poll_register = function(options) {
		var opt = $.extend({}, $.fn.perc_poll.defaults);
		opt = $.extend(opt,options);
		_DEBUG = opt.debug;

		this.each(function() {
			var $this = $(this);
			function getChoice() { return $this.find("input[name='" + opt.radio_input_name + "']:checked").val(); }
			function getOtherChoiceValue(choice) { 
				var otherInputName = opt.radio_input_name + '_' + choice;
				return $this.find("input[type='text' and name='" + otherInputName + "']").val(); 
			}
			function hidePollChoices() { $this.find(opt.jq_poll_choices).hide(); $('.pole_image').remove();}
			function showPollChoices() { $this.find(opt.jq_poll_choices).show(); }
			
			var pollId = opt.pollId || $this.poll_data('poll');
			if (pollId) {
				showPollChoices();
				var oldBallot = getPreviousVote(pollId);
				debug("old ballot", oldBallot);
				if ( ! oldBallot ) {
					$this.submit(function() {
						var choice = getChoice();
						var otherValue = getOtherChoiceValue(choice);

						if (choice) {
							var ballot = {
								Ballot : {
									answers : { choice : choice },
									pollId : pollId
								}
							};
							debug('otherValue:', otherValue);
							if(otherValue) {
								ballot.Ballot.answers.otherValue = otherValue;
							}
							$.perc_rest_post(opt.vote_url, ballot, function(results) {
								saveVote(ballot); 
								hidePollChoices();
								opt.results_callback.apply($this, [ballot, results, opt]);
							});
						}
						else {
							alert("Please make a selection");
						}
						return false;
					});
				}
				else {
					hidePollChoices();
					$.getJSON(opt.results_url + pollId, function(results, textStatus) {
						opt.results_callback.apply($this, [oldBallot, results, opt]);
					});
				}
			}
		});
	};
	
	 $.fn.poll_data = function (type, value) {
                function getMeta($this, type) {
                        var q = "script";
                        var f = function() {
                                return this.type == type;
                        };
                        var t = function($this) {
                                return $this.get(0) && $this.get(0).text;
                        };
                        return t($this.children(q).filter(f)) || t($this.siblings(q).filter(f)) || $this.attr('title');
                }
                if ( value ) {
                        return this.filter(function(i) {
                                return getMeta($(this), type) == value;
                        });
                }
                else {
                        return getMeta(this, type);
                }
        }

	
	function getBallots() {
		var ballots = $.cookie('poll_ballots');
		ballots =  ballots || '{}';
		var rvalue;
		eval('rvalue = ' + ballots + ';');
		return rvalue;
	}
	
	function getPreviousVote(pollId) {
		var b = getBallots();
		return b['poll_'+pollId];
	}
	
	function saveVote(ballot) {
		var ballots = getBallots();
		ballots['poll_' + ballot.Ballot.pollId ] = ballot;
		$.cookie('poll_ballots', JSON.stringify(ballots));
	}
	
	function poll_results_default(ballot, results, options) {
		this.find(options.jq_poll_results).show();
		this.find(options.jq_poll_results).poll_results(ballot, results, options);
	}
	
	$.fn.poll_results = function(ballot, results, options) {
		debug("Poll results Ballot:", ballot);
		var opt = $.extend({}, $.fn.perc_poll.defaults);
		opt = $.extend(opt,options);
		this.each(function() {
			var $this = $(this);
			$this.find(opt.jq_poll_total).append(results.PollResults.ballotCount);
			$.each(results.PollResults.choiceResults, function(i, item) {
				var choice = item.choice.name;
				debug(choice);
				var jqChoice = $this.find('*').poll_data('choice', choice);
				debug("jqChoice", jqChoice);
				var choicePercent = Math.round((item.votes / results.PollResults.ballotCount) * 100);
				jqChoice.filter(opt.jq_poll_percent).append(''+ choicePercent);
				jqChoice.filter(opt.jq_poll_count).append('' + item.votes);
				jqChoice.filter(opt.jq_poll_bar).css ({width: '' + choicePercent + '%'});
				if ( ballot && ballot.Ballot.answers.choice == choice ) {
					jqChoice.addClass(opt.jq_poll_selected_class);
					jqChoice.removeClass('checkbox');
				}
			});
			
		});
	};
	
	$.perc_rest_post = function(url, obj, success, error) {
		error = error ? error : function(xhr, response, error) { alert("ERROR"); }; 
		var data = JSON.stringify(obj);
		$.ajax({
			type: 'POST',
			url: url,
			contentType: "application/json; charset=utf-8", 
			dataType : "json",
			data: data, 
			success : success,
			error : error
		});
	};
	
	$.fn.perc_poll = {}
	$.fn.perc_poll.defaults = {
		debug : false,
		radio_input_name : 'poll_choice',
		vote_url : '/soln-poll/ws/vote/',
		results_url : '/soln-poll/ws/polls/results/',
		results_callback : poll_results_default,
		jq_poll_choices : '.poll_choices',
		jq_poll_results : '.poll_results',
		jq_poll_total : '.poll_total',
		jq_poll_bar : '.poll_bar',
		jq_poll_percent : '.poll_percent',
		jq_poll_count : '.poll_count',
		jq_poll_selected_class : 'poll_selected'
	};
	
	var _DEBUG =  $.fn.perc_poll.defaults.debug;
	
	function debug() {
		if (typeof  console != 'undefined' && _DEBUG) {
			$.each(arguments, function(i, item) {
				console.log(item);
			});
		}
	}
	 
})(jQuery);
