var sbrw_cookie_name = 'sbrmi';
function getRewardPointBalance(populate_values_function, refresh_value, rewards_info, isRecursive) {
	if( !populate_values_function )
		return;
	
	var lin = readCookie('lin');
	if( !lin ) {
		eraseCookie(sbrw_cookie_name);
		populate_values_function({rewards_member: false});
		return;
	}
	lin = base64_decode(url_decode(lin)).split('\t');
	
	var rewards_info_cookie = readCookie(sbrw_cookie_name);
	if( !rewards_info && !refresh_value && rewards_info_cookie ) {
		rewards_info = JSON.parse(base64_decode(url_decode(rewards_info_cookie)));
		if( !rewards_info.cid || !lin[2] || rewards_info.cid !== lin[2] ) {
			eraseCookie(sbrw_cookie_name);
			rewards_info = null;
		}
	} 
	if( !rewards_info ) {
		if(isRecursive) return;
		var member_req = "";
		if( lin && lin[2] )
			member_req = "?cid=" + lin[2];
		$.ajax({
			url: "/ws/json/rewards/rewards_member_info" + member_req,
			dataType: 'json',
			success: function(data) {
				if( data ) {
					rewards_info = data;
					getRewardPointBalance(populate_values_function, false, rewards_info, true);
				}
			}
		});
		return;
	}
	populate_values_function(rewards_info);
}

function show_rewards_member_info_loading() {
	$('#rewards-loading').show();
	$('#rewards-member-info').hide();
	$('#rewards-learn').hide();
}

function show_rewards_member_info() {
	$('#rewards-member-info').show();
	$('#rewards-loading').hide();
	$('#rewards-learn').hide();
}

function show_rewards_learn() {
	$('#rewards-learn').show();
	$('#rewards-loading').hide();
	$('#rewards-member-info').hide();
}

function hide_rewards_info() {
	$('#rewards-loading').hide();
	$('#rewards-member-info').hide();
	$('#rewards-learn').hide();
}

function populate_rewards_member_info(refresh_value) {
	show_rewards_member_info_loading();
	getRewardPointBalance(function (data) {
		if( !data )
			return;
		if(data.rewards_member) {
			if( data.maximum_reward ) {
				$('#max-reward').text(data.maximum_reward);
				$('#redeem-reward-phrase').show();
				$('#next-reward-phrase').hide();
				$('#next-reward').text( 0 );
			} else {
				$('#max-reward').text( 0 );
				$('#redeem-reward-phrase').hide();
				$('#next-reward').text( data.points_to_next_reward );
				if( data.points_to_next_reward && data.points_to_next_reward == 1) {
					$('#next-reward-plural').hide();
				} else {
					$('#next-reward-plural').show();
				}
			}
			show_rewards_member_info();
		} else {
			show_rewards_learn();
		}
	}, refresh_value);
}
