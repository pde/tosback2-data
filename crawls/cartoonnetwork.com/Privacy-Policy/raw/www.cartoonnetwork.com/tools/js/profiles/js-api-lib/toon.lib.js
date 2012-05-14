/*


	TOON LS LIB
	
	Description:	This library is build to help communicate with all the different API's
					through 1 easy to use library. 

	Instructions:	Whenever you create a new instance, you must initialize the library by
					calling the .init function. When calling the .init function, always 
					pass in 'window.location' otherwise the library will default back to
					www.cartoonnetwork.com for the base_url.
					
	Local Storage:	Local storage is utilized in this library. We do this by saving all JSON
					we received and putting it in a local storage container. If you call the
					same function again before the expiration time of that local storage
					container, we will use the local stored JSON and not call the HTTP request.


*/ 

function toon_lib(){


	this.timeouts		= {
		msib_id_activity_stream		:  0,
		all_activity_stream			:  0,
		product_badges				:  0,
		msibid_search				:  0,
		product_players				:  0,
		name_search					:  0,
		game_leaderboard			:  0,
		highscore					:  0,
		relations					:  0,
		msibid_activity				:  0,
		msibid_and_friends_activity	:  0,
		msibid_singlegame_badges	:  0,
		last_games_badged			:  0,
		dna_search					: 60,
		user_friends_badges			:  0,
		profile_w_badges			: 60,
		clear_timeout				: 60
	};
	
	this.last_dna_update = '';

	this.base_url 		= 'http://www.cartoonnetwork.com'; 
	this.profile_url 	= '/profiles3';
	this.authid 		= '';  
	this.local_storage	= ''; 
	var gthat 			= this;
	
	this.ls_on			= false;
	this.is_md5			= true;
	
	this.init 	= function(location){  
	
		// Setup urls: 
		/*
		if(location.hostname == 'staging.cartoonnetwork.com'){
			this.base_url = 'http://staging.cartoonnetwork.com'; 
		}else if(location.hostname == 'staging1.cartoonnetwork.com'){
			this.base_url = 'http://staging1.cartoonnetwork.com'; 
		}else if(location.hostname == 'www.cartoonnetwork.com'){
			this.base_url = 'http://www.cartoonnetwork.com'; 
		}else{
			this.base_url = 'http://www.cartoonnetwork.com'; 
		}
		*/
		
		if(location.hostname != undefined){
			this.base_url = 'http://'+location.hostname;
		}else{
			this.base_url = 'http://www.cartoonnetwork.com'; 
		}
		
		this.authid = jQuery.cookie('authid');
		
		// Local Storage:
		this.local_storage	= new local_storage_class;
		if(this.local_storage.isAvail()){  
			// TURN ON / OFF LOCAL STORAGE GLOBALLY  
			this.ls_on = false;
			this.clear_old_storage();
		}else{
			this.ls_on = false; 
		}
	}
	
	// URL to variables
	
	/* Example:
		var obj = toon.parseUrl(window.location);
		console.log(obj.folder);
	*/
	this.parseUrl = function(location){
		//get url path - convert to lowercase
		var urlPath = location.pathname.toLowerCase();
		
		var game_id = '';
		//explode by '/'
		var folderSplit = urlPath.split('/');
		
		if (folderSplit[3] != undefined && folderSplit[3].length > 0){
			if(parseInt(folderSplit[3]) == folderSplit[3]){ 
				//set game_id var
				game_id = folderSplit[3];
			}
		}
		
		//set folderName var
		var folderName = folderSplit[1];
		
		//explode by '-' to get name
		if (folderSplit[2] != undefined){
			var nameSplit = folderSplit[2].split('-'); 
			//create urlVar		
			var urlVar = nameSplit.join(' ');	
		}
		
		
		
		var obj = {
			'folder' : folderName,
			'name_split' : 	urlVar,
			'game_id'	: game_id
		};
		return obj;
	}
	
	this.storage_api = function(params,callback){ 
		/* 
			This is the Storage API that will interface with HTML5 Local Storage 	
		*/ 
		if(this.ls_on == true && params.timer != 0){ 
			if(params.go == "set"){
				
				var values = {};
				
				if(gthat.is_md5 == true){ 
					values.key		= 'CN_'+jQuery.md5(params.key);
					values.value 	= params.value; 
					values.key2		= 'CN_'+jQuery.md5(params.key)+ '_timer';
					values.value2	= new Date();
				}else{ 
					values.key		= 'CN_'+params.key;
					values.value 	= params.value; 
					values.key2		= 'CN_'+params.key+ '_timer';
					values.value2	= new Date();
				}
				
				// Set Data
				this.local_storage.put(values.key,values.value);
				this.local_storage.put(values.key2,values.value2); 
				
			}else{
				
				if(gthat.is_md5 == true){
					var value_key = 'CN_'+jQuery.md5(params.key);
					var timer_key = 'CN_'+jQuery.md5(params.key)+'_timer';
					var value	= this.local_storage.get('CN_'+jQuery.md5(params.key)); 
					var timer	= this.local_storage.get('CN_'+jQuery.md5(params.key)+'_timer');
				}else{
					var value_key = 'CN_'+params.key;
					var timer_key = 'CN_'+params.key+'_timer';
					var value	= this.local_storage.get('CN_'+params.key); 
					var timer	= this.local_storage.get('CN_'+params.key+'_timer');
				}
				var timeout	= params.timer * 1000;
				var reply	= {};
				reply.success	= false;
				if(value != undefined && value != null && timer != undefined && timer != null){
					if(gthat.timed(new Date(timer),new Date()) <= timeout){ 
						reply.success		= true;
						reply.data 			= JSON.parse(value); 
					}else{
						gthat.local_storage.remove(value_key);
						gthat.local_storage.remove(timer_key);
					}
				}
				callback(reply);
			}
		
		}else{
			if(params.go == 'set'){
				// go nothing
			}else{
				var reply	= {};
				reply.success	= false;
				callback(reply);
			}
		}
	}
	
	
	
	/* STORAGE CLEAR OLD */
	this.clear_old_storage = function(){ 
		var all_storage = this.local_storage.getAll();
		for(x in all_storage){
			if(typeof(all_storage[x]) == 'string'){
				if(all_storage[x].substr((all_storage[x].length - 5),5) == 'timer'){
					var time = new Date(gthat.local_storage.get(all_storage[x]));
					if(gthat.timed(time,new Date()) >= (gthat.timeouts.clear_timeout*1000)){
						var data_key = all_storage[x].substr(0,(all_storage[x].length - 5));
						gthat.local_storage.remove(all_storage[x]);
						gthat.local_storage.remove(data_key);
						//console.log('cleared something' + all_storage[x]+' because its: '+gthat.timed(time,new Date()));
					}
				} 
			} 
		}
	}
	
	
	
	/* API WRAPPERS */
	this.rest_api = function(params,callback){
	
		// Default values
		var values 				= [];
		values.url				= (params.url != undefined) 			? params.url : this.base_url+this.profile_url+'/rest/';
		values.url 				+= params.ext;
		// Ajax call
		
		var passes				= [];
		if(params.passes != undefined){
			passes 				= params.passes;
		}
		if(params.type != undefined && params.type == 'post'){
			jQuery.postJSON( values.url,passes,
				function(data){
					callback(data);
				}
			); 
		}else{
			jQuery.getJSON2( values.url,passes,
				function(data){
					callback(data);
				}
			);
		}
		
	} 
		 
	this.manageapi = function(params,callback){
		
		// Default values
		var values 				= [];
		values.url				= (params.url != undefined) 			? params.url : this.base_url+this.profile_url+'/profilemanager';
		values.action 			= (params.action != undefined) 			? params.action : 'PLAYER_UPDATE';
		values.msib_id 			= (params.msib_id != undefined) 		? params.msib_id : '';
		values.player_id 		= (params.player_id != undefined) 		? params.player_id : '';
		values.dna 				= (params.dna != undefined) 			? params.dna : '';
		values.avatar_url 		= (params.avatar_url != undefined) 		? params.avatar_url : '';
		
		// Ajax call 
		jQuery.getJSON2( values.url,
			{ 
				url 			: values.url,
				action 			: values.action,
				msib_id 		: values.msib_id,
				player_id 		: values.player_id,
				dna 			: values.dna, 
				avatar_url 		: values.avatar_url
			},
			function(data){ 
				callback(data);
			}
		);
		
	}
	
	/*
	single game leaderboard
	*/
	
	this.leaderboardapi = function(params,callback){
		
		// Default value url:
		var values 				= []; 
		values.url				= this.base_url+'/leaderboard/';
		values.ext		 		= (params.ext != undefined) 			? params.ext : ''; 
		values.url				+= values.ext; 
		
		// Ajax call
		jQuery.getJSON2( values.url, 
			function(data){ 
				callback(data);
			}
		);
	
	}  
	
	this.relationsapi = function(params,callback){
		
		// Default value url:
		var values 				= []; 
		values.url				= this.base_url+'/relationship/';
		values.ext		 		= (params.ext != undefined) 			? params.ext : '';
		values.authid			= (params.authid != undefined) 			? params.authid : this.authid;
		values.url				+= values.ext; 
		
		// Ajax calls
		if(params.type != undefined && params.type == 'post'){
			jQuery.postJSON( values.url,
				{
					tid 			: params.tid,
					authid			: params.authid
				},
				function(data){
					callback(data);
				},'json'
			);
		}else if(params.type != undefined && params.type == 'delete'){
			values.url += '?tid='+params.tid+'&authid='+params.authid;
			jQuery.deletePost( values.url,
				{
					tid 			: params.tid,
					authid			: params.authid
				},
				function(data){
					callback(data);
				},'json'
			);
		}else{
			jQuery.getJSON2( values.url,
				{
					tid 			: params.tid,
					authid			: params.authid
				},
				function(data){ 
					callback(data);
				},'json'
			);
		}
	}
	
	this.social_api = function(params, callback){
		var values 				= [];		
		if (params.staticUrl == undefined){			
			values.url				= (params.url != undefined)? params.url :	this.base_url+'/social/';
			values.ext		 		= (params.ext != undefined)? params.ext : '';
			values.url				+= values.ext;
		} 
		else {
			values.url = params.staticUrl;			
		}
		jQuery.getJSON2(values.url,
			function(activitydata){
				callback(activitydata);
			}
		);
	} 
	
	
	this.me_and_my_friends_badges = function(params,callback){
		params.ext = 'client/badges/'+params.msib_id+'/@all?sort[0]=update_date|desc';
		this.social_api(params,function(data){
			callback(data);
		});
	}
	
	//badge manager
	/*	DEPRECATED ::: Use (rest_badge_count)
	this.badge_managerapi = function(params,callback){
		
		// Default values
		var values 				= [];
		values.url				= this.base_url+this.profile_url+'/badgemanager/';
		values.ext		 		= (params.ext != undefined) 			? params.ext : 'badges';
		values.url				+= values.ext;
		values.badge_ids 		= params.badge_ids;
		jQuery.getJSON2( values.url,
			{ 
				bid 	: values.badge_ids
			},
			function(data){
				callback(data);
			}
		); 
	}
	*/
	
	/*
	activity stream for a user and users friends
	*/
	
	this.activityuserfriendsapi = function(params,callback){
		
		//Default values:
		var values		= []
		values.url		= this.base_url+'/social/activities/' + params.msib_id + '@all'; 
		jQuery.getJSON2(values.url,
			function(data){
				callback(data);
			}
		
		);
	}
	
	this.rest_product_managerapi = function(params,callback){
		var values			= [];  
		params.ext 			= 'products/post';
		params.passes		= {productids:params.pids};
		params.type 		= 'post';
		this.rest_api(params,function(badgedata){ 			
			callback(badgedata);
		});
	}
	
	this.rest_badges_count = function(params,callback){
	
		var values			= [];  
		params.ext 			= 'badges/all/count'; 
		params.type 		= 'get';
		
		this.rest_api(params,function(badgedata){ 			
			callback(badgedata);
		});
		
	}
	
	this.personal_leaderboard = function(params,callback){
	
		var values		= [];
		values.url		= this.base_url + '/leaderboard/ranking/personal/'+
							params.gameid+ '/'+
							params.timeline;
							
		jQuery.getJSON2( values.url,
			{ 
				authid 	: params.authid,
				tid		: params.tid
			},
			function(data){
				callback(data);
			}
		);
	
	} 
	
	/*
	FUNCTIONS
	*/	
	
	var user_friends_badges_data 			= {}; 
	user_friends_badges_data.sent_off 		= 0;
	user_friends_badges_data.came_back		= 0;
	user_friends_badges_data.data 			= {};
	this.user_friends_badges = function(params,callback){ 
	 
		user_friends_badges_data.friends = {};
		user_friends_badges_data.product = {};
		
		params.sorter = params.sort;
		
		var count 			= 1; 
		var s_key 			= 'user_friends_badges_'+params.msib_id+'_'+params.game_id+'_'+params.sorter+'_'+params.badge_type; 
		params.s_key		= s_key;
		
		if(params.badge_type == undefined){
			params.badge_type = 'game';
		}
		if(params.game_id == undefined){
			params.game_id = 0;
		}
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.user_friends_badges },function(data){
 			if(data.success == true){ callback(data.data); }else{ 
 			
 				if(params.msib_id == undefined){ 
 					callback({error:'no MSIBID sent.'});
 				}else{
 				
					// Start getting my data:
					gthat.msibid_search({
						teg_ids: params.msib_id,
						with_dna:false,
						exact:true
					},function(data){
						
						user_friends_badges_data.friends[0] = {};
						user_friends_badges_data.friends[0].user_data = data[0]; 
						
						// Get User Friends
						gthat.relations({ 
						    tid 		: params.msib_id, 
						    authid 		: params.authid,
						    with_data	: 'true'
						},function(data){
						    if(data.relations != undefined){ 
						    	for(var x in data.relations){ 
						    		if(data.relations[x].status == 'related'){ 
						    			user_friends_badges_data.friends[count] = {};
						    			user_friends_badges_data.friends[count] = data.relations[x];
						    			count++;
						    		} 
						    	}   
						    	gthat.rest_product_managerapi({pids:params.game_id},function(data){
						    	
						    		if(params.badge_type == 'game'){
										user_friends_badges_data.product = data[0];  
									}
									
									
									var tcount = 0;  
									
									for(var x in user_friends_badges_data.friends){
										user_friends_badges_data.sent_off++;
									}
									
									if(params.badge_type == 'game'){
										for(var x in user_friends_badges_data.friends){
											gthat.msibid_singlegame_badges({
												msib_id:user_friends_badges_data.friends[x].user_data.msibID, 
												game_id:params.game_id
											},function(data){ 
												user_friends_badges_data.data[tcount] = {};
												user_friends_badges_data.data[tcount] = data; 
												gthat.user_friends_badges_process(data,params,callback); 
												tcount++;
											}); 
										} 
									}else{ 
									
										gthat.me_and_my_friends_badges({
											msib_id:params.msib_id
										},function(data){ 
											gthat.user_friend_badges_process_allbadges(data,params,callback);
										}); 
											
									}
								});  
						    }else{
						    	user_friends_badges_data.sent_off 		= 0;
								user_friends_badges_data.came_back		= 0;
								user_friends_badges_data.data 			= {};
						    	callback({});
						    } 
						}); 
					
					});
				
				}
		
			}
		});
		
		
	} 
	
	// This function is called if its for ALL BADGES
	this.user_friend_badges_process_allbadges = function(data,params,callback){
		for(var x in user_friends_badges_data.friends){
			for(var i in data){
				if(data[i].user_id == user_friends_badges_data.friends[x].user_data.msibID && data[i].completed == true){
					if(user_friends_badges_data.friends[x].badge_count == undefined){
						user_friends_badges_data.friends[x].badge_count = 1;
					}else{
						user_friends_badges_data.friends[x].badge_count++;
					}
				}
			}
		} 
		
		// Sort Function:
		if(params.sorter != undefined){
			var friends_data = user_friends_badges_data.friends;  
			var new_array = []; 
			for(var x in friends_data){ 
				var new_obj = {};
				new_obj.key = x;
				new_obj.name = friends_data[x].user_data.playerID;
				new_obj.badge_count = friends_data[x].badge_count;
				new_obj.received = friends_data[x].received;
				new_array.push(new_obj); 
			}  
			if(params.sorter == 'name'){
				new_array.sort(gthat.sortBy(params.sorter,true)); 
				new_array.reverse();
			}else if(params.sorter == 'friended'){
				new_array.sort(gthat.sortBy('received',true));
			}else{
				new_array.sort(gthat.sortBy(params.sorter,true,parseInt)); 
			} 
			var insert_sorted = [];
			var count = 0;
			for(var i=0; i<new_array.length; i++) {
				insert_sorted[count] = friends_data[new_array[i].key]; 
				count++;
			} 
			user_friends_badges_data.friends = gthat.to_object(insert_sorted);
		}
			
		callback(user_friends_badges_data);
	}
	
	this.user_friends_badges_process = function(data,params,callback){
		user_friends_badges_data.came_back++;
		if(user_friends_badges_data.came_back == user_friends_badges_data.sent_off){  
		 
			for(var x in user_friends_badges_data.friends){ 
				var user_id = user_friends_badges_data.friends[x].user_data.msibID;
				var friend_count = 0; 
				for(var i in user_friends_badges_data.data){
					if(user_friends_badges_data.data[i][0] != undefined){
						var badge_user = user_friends_badges_data.data[i][0].user_id;
						if(badge_user == user_id){
							user_friends_badges_data.friends[x].badge_count = user_friends_badges_data.data[i].length;
							friend_count++;
						}
					}
				} 
				if(friend_count == 0){
					user_friends_badges_data.friends[x].badge_count = 0;
				}
			}
			
			
			// Sort Function:
			if(params.sorter != undefined){
				var friends_data = user_friends_badges_data.friends;  
				var new_array = []; 
				for(var x in friends_data){ 
					var new_obj = {};
					new_obj.key = x;
					new_obj.name = friends_data[x].user_data.playerID;
					new_obj.badge_count = friends_data[x].badge_count;
					new_obj.received = friends_data[x].received;
					new_array.push(new_obj); 
				}  
				if(params.sorter == 'name'){
					new_array.sort(gthat.sortBy(params.sorter,true)); 
					new_array.reverse();
				}else if(params.sorter == 'friended'){
					new_array.sort(gthat.sortBy('received',true,parseInt));
				}else{
					new_array.sort(gthat.sortBy(params.sorter,true,parseInt)); 
				} 
				var insert_sorted = [];
				for(var x in new_array){ 
					insert_sorted[x] = friends_data[new_array[x].key]; 
				} 
				user_friends_badges_data.friends = gthat.to_object(insert_sorted);
			}
			
			user_friends_badges_data.data = {};
			gthat.storage_api({ go:'set',key:params.s_key,value:JSON.stringify(user_friends_badges_data)});
			callback(user_friends_badges_data);  
			
			user_friends_badges_data.sent_off 		= 0;
			user_friends_badges_data.came_back		= 0;
			user_friends_badges_data.data 			= {};
		}
	} 
	
	this.to_object = function(arr) {
	  var rv = {};
	  for (var i = 0; i < arr.length; ++i)
	    if (arr[i] !== undefined) rv[i] = arr[i];
	  return rv;
	} 
	
	
	
	this.game_creator_activities = function(params,callback){
	
		var activity 		= '';  
		params.ext 			= 'activities/' + params.msib_id; 
		params.ext 			+= '?filter[app_id]=43804,44321,45812'; 
		
		gthat.social_api(params,function(activity){
			var arr = {};
			arr['43804'] = 0;
			arr['44321'] = 0;
			arr['45812'] = 0;
			for(var x in activity.entry){
				var app_id = activity.entry[x].app_id;
				if(app_id == '43804' || app_id == '44321' || app_id == '45812'){
					arr[app_id]++;
				}
			}
			callback(arr);
		});
		
	}
	
	
	this.msib_id_activity_stream = function(params,callback){
	
		var activity 		= ''; 
		var that 			= this; 
		params.ext 			= 'activities/' + params.msib_id;
		
		if(params.with_friends == 'true'){
			params.ext 		+= '/@all';
		}
		params.ext 			+= '?filter[app_id]=2,11,43804,44321,45812';
		
		var s_key 			= 'msib_id_activity_stream_'+params.ext; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.msib_id_activity_stream },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.social_api(params,function(activity){ 			
					that.filterActivity(s_key,activity,callback);
				});
		
			}
		});
	} 
	
	this.all_activity_stream = function(params,callback){
		var activity 		= ''; 
		var that 			= this;
		if(this.base_url == 'http://staging.cartoonnetwork.com'){
			params.staticUrl	= this.base_url + '/social/toon_activity_stream_fetcher.json';	
		} else {
			params.staticUrl	= this.base_url+'/social/toon_activity_stream_fetcher.json';   			
		}
		params.ext 			= 'activities'; 
		params.count 		= (params.count != undefined) 		? params.count : 10;
		params.ext 			+= '?filter[app_id]=2,11,43804,44321,45812&count='+params.count;
		
		var s_key 			= 'all_activity_stream_'+params.ext; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.all_activity_stream },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.social_api(params,function(activity){ 			
					that.filterActivity(s_key,activity,callback,params.count);
				});
		
			}
		});
	}	
	
	this.badge_manager = function(params,callback){
		params.ext 			= 'badges/post';
		params.passes		= {badgeids:params.badge_ids};
		params.type 		= 'post';
		this.rest_api(params,function(badgedata){ 			
			callback(badgedata);
		});
	}
	


	this.msib_id_trim 			= '';
	this.badge_id_trim 			= '';
	this.msib_id_final 			= '';
	this.badges_final 			= '';
	this.prod_final 			= '';
	this.activity_data 			= '';
	this.final_activity_stream 	= [];
	
	this.filterActivity = function(s_key,activity, callback, counter){ 
		
		this.activity_data 		= activity;
		var unique_msib_id 		= {};
		var msib_id_string 		= '';
		var unique_badge_id 	= {};
		var badge_id_string 	= '';
		var unique_prod			= {};
		var product_string		= '';	
		var unique_rankings		= {};
		var count2 				= 0;
		
		if(activity.totalResults == 0){
			callback(activity);
		}else{ 
		
			//loop through activity json and get msibids
			for(var count=0, length = activity.entry.length; count < length; count++){
			
				if( activity.entry[count].app_id == '2' || activity.entry[count].app_id == '11' || activity.entry[count].app_id == '43804' || activity.entry[count].app_id == '44321' || activity.entry[count].app_id == '45812'){
					
					this.final_activity_stream[count2] = activity.entry[count];
					
					var msib_id 			= activity.entry[count].user_id;
					var badge_id 			= activity.entry[count].template_params.prev_badge_id;
					var prod_id				= activity.entry[count].template_params.game_id;
					var personal_ranking 	= activity.entry[count].template_params.personal_ranking;									
					
					// takes top personal leaderboard - filters out rest
					if(personal_ranking == 'true'){
						if(unique_rankings[msib_id] == undefined){
							unique_rankings[msib_id] = [];
						} 
						if(unique_rankings[msib_id][prod_id] == undefined){ 
							unique_rankings[msib_id][prod_id] = personal_ranking;
						}else{
							continue;
						}
					}
					
					//getting only the unique msibids
					if (unique_msib_id[msib_id] == undefined){
						unique_msib_id[msib_id] 	= msib_id; 
						msib_id_string 				+= msib_id+'|' ;			
					}
					//getting only unique badgeids
					if (unique_badge_id[badge_id] == undefined){
						unique_badge_id[badge_id] 	= badge_id; 
						badge_id_string 			+= badge_id+'|' ;		
					}
					if(activity.entry[count].app_id == '11' && unique_prod[prod_id] == undefined){
						unique_prod[prod_id] 		= prod_id;
						product_string				+= prod_id + '|';
					}
					count2++;			
					if(counter != undefined){
						if(count2 >= counter){
							break;
						}
					}
				}
													
			} 
			
			//trim trailing colon for msibid search api call
			this.msib_id_trim 	= msib_id_string.substring(0, msib_id_string.length-1);
			this.badge_id_trim 	= badge_id_string.substring(0, badge_id_string.length-1);
			this.prod_id_trim 	= product_string.substring(0, product_string.length-1);
			
			this.second_calls(s_key,this.msib_id_trim,this.badge_id_trim,this.prod_id_trim,callback);
		
		} 	
		
	} 
	
	
	
	// Function that is called to get all needed users
	this.second_calls = function(s_key,msibs,badges,products,callback){
		var that = this; 
		this.msibid_search({teg_ids:msibs, timer:0},function(data){
			that.msib_id_final = data;
			that.final_parser(s_key,callback);
		}); 
		this.badge_manager({badge_ids:badges, timer:0},function(data){				
			that.badges_final = data; 
			that.final_parser(s_key,callback);
		}); 
		if(products == ''){
			that.prod_final	= {};
		}else{
			this.rest_product_managerapi({pids:products, timer:0},function(data){
				that.prod_final = data; 
				that.final_parser(s_key,callback);
			});
		}
	} 
	
	this.final_parser = function(s_key,callback){
				
		//if(this.badges_final != '' && this.msib_id_final != '' && this.prod_final != ''){
		if(typeof(this.badges_final) == 'object' && typeof(this.msib_id_final) == 'object' && typeof(this.prod_final) == 'object'){
		
			// Both msib's and badge's data is ready for us: 
			// Go through entire activity stream entrys: 
			var that = this;
			for(var count=0, length = this.final_activity_stream.length; count < length; count++){
				 
				// Forloop the users to find the correct one for this Entry.
				for(var count2=0, length2 = that.msib_id_final.length; count2 < length2; count2++){
					if(that.msib_id_final[count2].msibID == that.final_activity_stream[count].user_id){
						// Since this user is the correct one:
						that.final_activity_stream[count].user_data = that.msib_id_final[count2];
					} 
				}
				
				// Now we have the user for this activity, we need the badge info:
				for(var count3=0, length3 = that.badges_final.length; count3 < length3; count3++){
					if(that.badges_final[count3].id == that.final_activity_stream[count].template_params.prev_badge_id){ 
						that.final_activity_stream[count].badge_data = that.badges_final[count3];
					} 
				}
				if(that.final_activity_stream[count].app_id == '11'){ 
					for(x in that.prod_final){ 
						if(that.final_activity_stream[count].template_params.game_id == that.prod_final[x].id){ 
							that.final_activity_stream[count].product_data = that.prod_final[x]; 
						} 
					} 
				}
			} 
			//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(that.final_activity_stream)});
			callback(that.final_activity_stream);
			this.msib_id_trim 			= '';
			this.badge_id_trim 			= '';
			this.msib_id_final 			= '';
			this.badges_final 			= '';
			this.prod_final 			= '';
			this.activity_data 			= '';
			this.final_activity_stream 	= [];
		}
	}
	
	this.product_badges = function(params,callback){
		params.ext 				= 'products/'+params.products;
		params.type 			= 'get';  
		var s_key 				= 'product_badges_'+params.teg_ids; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.product_badges },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.rest_api(params,function(data){ 
					gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					callback(data);
				});
		
			}
		});
		
	}
	
	// To be used for fallback data:
	this.fallback_json = function(params,callback){ 
		$.getJSON2(params.url,function(data){ 
			callback(data); 
		}); 
	} 
	
	this.msibid_search = function(params,callback){ 
		params.ext 				= 'tegids/post'; 
		
		// Only in staging
		if(params.with_dna != undefined && params.with_dna == true){
			params.ext 			+= '/include-dna/true';
		}else{
			params.ext 			+= '/include-dna/false';
		}
		
		params.passes			= { tegids:params.teg_ids };
		params.type 			= 'post'; 
		var s_key 				= 'msibid_search_'+params.teg_ids; 
		/*
		if(params.timer != undefined){
			var timer = params.timer;
		}else{
			var timer = ;
		}*/
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.msibid_search },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.rest_api(params,function(data){
					if(data.length <= 20){
						gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					}
					callback(data);
				});
		
			}
		});
		
	}
	
	this.product_players = function(params,callback){ 
		params.ext 				= 'product-players/post/'+params.products;
		if(params.max != undefined){
			params.ext 			+= '/max/'+params.max;
		}
		params.type 			= 'post'; 
		var that 				= this; 
		var rel_params			= {};
		rel_params.tid			= params.msibid;
		rel_params.authid		= params.authid;
		rel_params.with_data	= false;  
		var s_key 				= 'product_players_'+params.products+'_'+rel_params.tid+'_'+rel_params.authid+'_'+rel_params.with_data; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.product_players },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.relations(rel_params,function(data){
				
					var tegids 		= '';
					for (x in data.relations){
						tegids 		+= x+'|';
					}
					tegids 			+= params.msibid;
					params.passes	= {excludes:tegids}; 
				
					gthat.rest_api(params,function(data){ 
					
						if(params.with_data != undefined && params.with_data == true){
						
							var id_string 		= '';
							var id_string_final = '';
							var count 			= 0;
							for (x in data){
								for(i in data[x]){
									count++;
									id_string += data[x][i]+'|'; 
								}
							} 
							if(count >= 1){
								id_string_final = id_string.substring(0, id_string.length-1);
								that.msibid_search({teg_ids:id_string_final},function(friends){
									
									var new_data = {}; 
									for (i in data){ 
										new_data[i] = {};
										var this_count = 0;
										for(y in data[i]){
											for(c in friends){ 
												if(friends[c].msibID == data[i][y]){ 
													new_data[i][this_count] = {}; 
													new_data[i][this_count] = friends[c]; 
													this_count++;
												} 
											}  
										}
									}  
									gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(new_data)});
									callback(new_data); 
									
								}); 
							}else{
								gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
								callback(data);
							} 
							
						}else{
							gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
							callback(data);
						}
					});
				
				});
		
			}
		});
		
	}
	this.dna_search = function(params,callback){
	
		params.ext 				= 'dna/' + params.dna;
		params.type 			= 'get';
		var s_key 				= 'dna_search_'+params.dna;
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.dna_search },function(data){
 			if(data.success == true){ callback(data.data); }else{ 
 			
				gthat.rest_api(params,function(data){ 
					gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					callback(data);
				});
				
			}
		});
	}
	this.name_search = function(params,callback){
	
		if(params.exact == 'false'){
			var exact = 'false';
		}else{
			var exact = 'true';
		}
		
		if(params.max_results != undefined){
			var max = params.max_results;
		}else{
			var max = 4;
		}
		
		if(params.with_dna == true){
			var incdna = 'true';
		}else{
			var incdna = 'false';
		}
		
		params.ext 				= 'names/'+params.name+'/exact/'+exact+'/include-dna/'+incdna+'/max/'+max+'';
		
		if(params.exclude != undefined && params.exclude != ''){
			params.ext += '/exclude-name/' + params.exclude; 
		} 
		  
		params.type 			= 'get';
 		var s_key 				= 'name_search_'+params.name+'_'+params.exclude+'_'+params.with_dna+'_'+params.max_results; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.name_search },function(data){
 			if(data.success == true){ callback(data.data); }else{ 
 			
				gthat.rest_api(params,function(data){ 
					gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					callback(data); 
				}); 
				
			}
		});
	}
	this.update_avatar = function(params,callback){ 
		params.action			= 'AVATAR_UPDATE';
		this.manageapi(params,function(data){
			callback(data);
			gthat.local_storage.clear();			
		});
	}
	this.update_dna = function(params,callback){ 
		gthat.last_dna_update = new Date();
		params.action			= 'DNA_UPDATE';
		this.manageapi(params,function(data){
			callback(data); 
			gthat.local_storage.clear();
		});
	}
	this.update_user = function(params,callback){ 
		params.action			= 'PLAYER_UPDATE';
		this.manageapi(params,function(data){
			callback(data);
		});
	}
	
	this.game_leaderboard = function(params, callback){ 
		params.ext				= 'game/'+params.game_id+'/';
		var s_key 				= 'game_leaderboard_'+params.game_id; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.game_leaderboard },function(data){
 			if(data.success == true){ callback(data.data); }else{  
 			
				gthat.leaderboardapi(params,function(data){
					gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					callback(data); 
				});
				 
			}
		}); 
	} 
	
	this.highscore = function(params, callback){ 
		var that = this;
		params.type = (params.type != undefined) ? params.type : 'alltime';
		
		
		var s_key = 'highscore_'+params.game_id+'_'+params.type+'_'+params.tid;
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.highscore },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
 				gthat.game_leaderboard({game_id:params.game_id},function(data){
					if (params.type == 'alltime'){ 
						if (data.leaderboards[0] != undefined){
							params.ext	= 'ranking/system/'+data.leaderboards[0].id+'/';
							if(gthat.base_url == 'http://staging.cartoonnetwork.com'){
								params.ext += 'allTimeType1';
							}else{
								params.ext += '3979c350-307d-49e4-be77-5d0c6be14bfe';
							}							
							gthat.leaderboardapi({ext:params.ext},function(data){
								//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
								callback(data);
							});
						}else{
							callback({});
						}
					}
					if (params.type == 'personal'){
						if (data.leaderboards[0] != undefined){
							params.gameid  =  data.leaderboards[0].id;
							if(gthat.base_url == 'http://staging.cartoonnetwork.com'){
								params.timeline = 'allTimeType1';
							}else{
								params.timeline = '3979c350-307d-49e4-be77-5d0c6be14bfe';
							}
							gthat.personal_leaderboard(
								{ 	gameid		: params.gameid,
									timeline	: params.timeline,
									tid			: params.tid,
									authid		: params.authid
								},
							function(data){
								//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
								callback(data);
							});
						}else{
							callback({});
						}
					}
				}); 
				
		}});
		
	} 	
	
	this.relations = function(params, callback){ 
		params.ext 				= 'relations/';
		params.with_data 		= (params.with_data != undefined) 		? params.with_data : 'false';
		var that				= this;
		
		var s_key = 'relations_'+params.tid+'_'+params.with_data;
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.relations },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
 			
				gthat.relationsapi(params,function(data){
					if(params.with_data != undefined && params.with_data == 'true'){
					
						var id_string 		= '';
						var id_string_final = '';
						var count 			= 0;
						for (x in data.relations){
							count++;
							id_string += x+'|';
						} 
						if(count >= 1){
							id_string_final = id_string.substring(0, id_string.length-1);
							gthat.msibid_search({teg_ids:id_string_final},function(friends){
								
								for (i in data.relations){ 
									for(c in friends){ 
										if(friends[c].msibID == i){
											data.relations[i].user_data = friends[c];
										}
									}
								} 
								//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
								callback(data);
							}); 
						}else{ 
							callback(data);
						} 
					}else{ 
						callback(data);
					}  
				}); 
		
		}});
		
		
	}

	this.msibid_activity = function(params,callback){ 
		params.ext 		= '/activities/' + params.msib_id; 
		var s_key 		= 'msibid_activity_'+params.msib_id;
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.msibid_activity },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.social_api(params,function(data){ 
					//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					callback(data);
				});
				
			}
		});
	}

	this.msibid_and_friends_activity = function(params,callback){ 
		var s_key 		= 'msibid_and_friends_activity_'+params.msib_id;
		gthat.storage_api({ key	: s_key, timer : 5 },function(data){
 			if(data.success == true){ callback(data.data); }else{
				gthat.activityuserfriendsapi(params,function(data){ 
					//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					callback(data);
				});
			}
		});
	} 
	
	this.friend_requests = function(params,callback){ 
		params.ext 				= 'received';
		params.tid				= params.msib_id;
		params.with_data 		= (params.with_data != undefined) 		? params.with_data : 'false';
		var that				= this; 
		
		var s_key 		= 'friend_requests_'+params.msib_id+'_'+params.with_data;
		gthat.storage_api({ key	: s_key, timer : 5 },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.relationsapi(params,function(data){ 
				
				
					/* SORT FUCNTIONALITY :  */
					
					var relations = data.relations;  
					var new_array = []; 
					for(var x in relations){ 
						var new_obj = {};
						new_obj.key = x; 
						new_obj.received = relations[x].received;
						new_array.push(new_obj);
					}  
					new_array.sort(gthat.sortBy('received',true,parseInt)); 
					var insert_sorted = {};
					for(var x in new_array){ 
						if(parseInt(x) == x){
							insert_sorted[ new_array[x].key ] = relations[new_array[x].key]; 
						}
					} 
					data.relations = insert_sorted;
					
				
					if(params.with_data != undefined && params.with_data == 'true'){ 
						var id_string 		= '';
						var id_string_final = '';
						var count 			= 0;
						for (x in data.relations){
							count++;
							id_string 		+= x+'|';
						}
						
						if(count >= 1){
							id_string_final = id_string.substring(0, id_string.length-1);
							gthat.msibid_search({teg_ids:id_string_final},function(friends){
							
								for (i in data.relations){ 
									for(c in friends){
										if(friends[c].msibID == i){
											data.relations[i].user_data = friends[c];
										}
									}
								} 
								
								gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
								callback(data);
							}); 
						}else{
							gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
							callback(data);
						} 
					}else{
						gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
						callback(data);
					} 
					
				});
				
			}
		});
	} 
	this.sent_friend_requests = function(params,callback){ 
		params.ext 				= 'sent';
		params.tid				= params.msib_id;
		params.with_data 		= (params.with_data != undefined) 		? params.with_data : 'false';
		var that 				= this;
		
		var s_key 		= 'sent_friend_requests_'+params.msib_id+'_'+params.with_data;
		gthat.storage_api({ key	: s_key, timer : 5 },function(data){
 			if(data.success == true){ callback(data.data); }else{ 
				
 			
				gthat.relationsapi(params,function(data){ 
					
					
					/* SORT FUCNTIONALITY :  */
					
					var relations = data.relations;  
					var new_array = []; 
					for(var x in relations){ 
						var new_obj = {};
						new_obj.key = x; 
						new_obj.sent = relations[x].sent;
						new_array.push(new_obj);
					}  
					new_array.sort(gthat.sortBy('sent',true,parseInt)); 
					var insert_sorted = {};
					for(var x in new_array){ 
						insert_sorted[ new_array[x].key ] = relations[new_array[x].key]; 
					} 
					data.relations = insert_sorted;
				
				
					if(params.with_data != undefined && params.with_data == 'true'){
						var id_string 		= '';
						var id_string_final = '';
						var count 			= 0;
						for (x in data.relations){
							count++;
							id_string 		+= x+'|';
						}
						if(count >= 1){
							id_string_final = id_string.substring(0, id_string.length-1);
							gthat.msibid_search({teg_ids:id_string_final},function(friends){
							
								for (i in data.relations){ 
									for(c in friends){
										if(friends[c].msibID == i){
											data.relations[i].user_data = friends[c];
										}
									}
								} 
								gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
								callback(data);
							});  
						}else{
							gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
							callback(data);
						}
					}else{
						gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
						callback(data);
					} 
				});
				
			}
		});
	} 
	
	this.user_relation = function(params,callback){ 
		params.ext 				= 'relation/'+params.user_id;
		params.tid				= params.msib_id;
		
		var s_key 		= 'user_relation_'+params.user_id+'_'+params.msib_id;
		gthat.storage_api({ key	: s_key, timer : 0 },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.relationsapi(params,function(data){ 
					gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					callback(data);
				});
				
			}
		});
	} 
	
	this.request_friend = function(params,callback){ 
		params.ext 				= 'request/'+params.user_id;
		params.tid				= params.msib_id;
		params.type 			= 'post';
		this.relationsapi(params,function(data){ 
			callback(data);
		});
	}
	
	this.accept_friend_request = function(params,callback){ 
		params.ext 				= 'accept/'+params.user_id;
		params.tid				= params.msib_id;
		params.type 			= 'post';
		this.relationsapi(params,function(data){ 
			callback(data);
		});
	}	
	
	this.reject_friend_request = function(params,callback){ 
		params.ext 				= 'reject/'+params.user_id;
		params.tid				= params.msib_id;
		params.type 			= 'post';
		this.relationsapi(params,function(data){ 
			callback(data);
		});
	}
	
	this.delete_friend_request = function(params,callback){ 
		params.ext 				= 'request/'+params.user_id;
		params.tid				= params.msib_id;
		params.type 			= 'delete';
		this.relationsapi(params,function(data){ 
			callback(data);
		});
	}
	
	this.blocked_users = function(params,callback){ 
		params.ext 				= 'blocks';
		params.tid				= params.msib_id; 
		
		var s_key 		= 'blocked_users_'+params.msib_id;
		gthat.storage_api({ key	: s_key, timer : 5 },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.relationsapi(params,function(data){ 
					//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(data)});
					callback(data);
				});
		
			}
		});
	}	
	
	this.block_a_user = function(params,callback){ 
		params.ext 				= 'block/'+params.user_id;
		params.tid				= params.msib_id; 
		params.type 			= 'post';
		this.relationsapi(params,function(data){ 
			callback(data);
		});
	}
	
	this.unblock_a_user = function(params,callback){ 
		params.ext 				= 'block/'+params.user_id;
		params.tid				= params.msib_id; 
		params.type 			= 'delete';
		this.relationsapi(params,function(data){ 
			callback(data);
		});
	}
	
	this.delete_friend = function(params,callback){ 
		params.ext 				= 'relation/'+params.user_id;
		params.tid				= params.msib_id;  
		params.type 			= 'delete';
		this.relationsapi(params,function(data){ 
			callback(data);
		});
	}
	
	this.badge_filter = function(data){ 
		var badges = [];
		var count = 0;
		for(var x in data){
			if (data[x].completed == true){
				badges[count] = {};
				badges[count] = data[x];
				count++;
			}
		} 
		return badges;
	}
	
	this.user_badges = function(params,callback){ 
		params.ext 		= 'client/badges/'+params.msib_id+'/@self';
		var that 		= this;
		var s_key 		= 'user_badges_'+params.msib_id;
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.user_badges },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.social_api(params,function(data){
					//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(gthat.badge_filter(data))});
					callback(gthat.badge_filter(data));
				});
		
			}
		});
	}
	
	this.profile_w_badges = function(params,callback){
		var that					= this;
		var complete_data			= {};
		var badgeparam				= {};
		var msibidparam				= {};
		var badges_complete			= false;
		var msib_complete			= false;
		var badges_possible			= false; 
		var with_data		 		= (params.with_data != undefined) 	? params.with_data : 'false';
		complete_data.with_data		= with_data; 
		var s_key 					= 'profile_w_badges_'+params.msib_id+'_'+params.with_data; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.profile_w_badges },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.rest_badges_count({ ext: 'total', msib_id: params.msib_id },function(data){
					badges_possible 		= true;
					complete_data.poss		= data;
					if(badges_complete == true && msib_complete == true && badges_possible == true){
						gthat.profile_w_badges_compile(complete_data,callback,s_key);
					}
				});
				gthat.user_badges({ msib_id:params.msib_id },function(data){
					badges_complete			= true;
					complete_data.badges	= data;
					if(badges_complete == true && msib_complete == true && badges_possible == true){
						gthat.profile_w_badges_compile(complete_data,callback,s_key);
					}  
				});
				gthat.msibid_search({ teg_ids:params.msib_id },function(data){
					msib_complete			= true;
					complete_data.msibid	= data;
					if(badges_complete == true && msib_complete == true && badges_possible == true){
						gthat.profile_w_badges_compile(complete_data,callback,s_key);
					}  
				});
				
			}
		});
	}
	
	this.profile_w_badges_compile = function(data,callback,s_key){ 
	 
		var done_data 				= {};
		done_data.profile			= data.msibid[0];
		if(data.with_data == 'true'){
			done_data.badges		= data.badges;
		}
		done_data.total_badges		= 0;
		done_data.total_badges		= data.badges.length; 
		done_data.badges_possible	= data.poss.count;  
		
		gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(done_data)});
		callback(done_data);
	}
	
	this.msibid_games_and_badges = function(params,callback){
	
		var that				= this;
		var s_key 				= 'msibid_games_and_badges_'+params.msib_id; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.msibid_and_friends_activity },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.user_badges({msib_id:params.msib_id},function(data){ 
					var product_string 	= '';
					var unique_games 	= {};
					for(x in data){ 
						if(parseInt(x) == x){
							if(unique_games[data[x].badge_attributes.product] == null){
								unique_games[data[x].badge_attributes.product] = 1;
								product_string 	+= data[x].badge_attributes.product+'|';
							}				
							else{
								unique_games[data[x].badge_attributes.product]++;
							}
						}
					} 
					gthat.msibid_games_and_badges_compile(unique_games,product_string,callback,s_key); 
				});
		
			}
		});
	
	}
	
	this.msibid_games_and_badges_compile = function(games,game_string,callback,s_key){
		
		var that				= this;
		var final_games			= {}; 
		var count 				= 0; 
		this.rest_product_managerapi({ pids: game_string},function(data){
			
			for(x in data){ 
				if(games[data[x].id] != null){ 
					final_games[count] 					= {};
					final_games[count].product_id 		= data[x].id;
					final_games[count].product	 		= data[x];
					if(data[x].id == '100000'){
						final_games[count].product.product_Image100by75 = 'Images/i9/cn_activitybadges_100x75.jpg';				
					}
					final_games[count].earned_badges 	= games[data[x].id];
					final_games[count].possible_badges 	= data[x].badgesPossible;
					count++;
				}
			}
			
			//gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(final_games)});
			callback(final_games);
			
		});
		
	}
	/*
	this.msibid_singlegame_badges = function(params,callback){
		params.ext 		= 'badges/' + params.msib_id + '?filter[product]=' + params.game_id;
		var that		= this;
		var s_key 		= 'msibid_singlegame_badges_'+params.msib_id+'_'+params.game_id; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.msibid_singlegame_badges },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.social_api(params,function(data){ 
					gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(gthat.badge_filter(data))});			
					callback(gthat.badge_filter(data));
				});	
		
			}
		});	
	}		
	*/

	this.msibid_singlegame_badges = function(params,callback){
		params.ext 		= 'badges/' + params.msib_id + '?filter[product]=' + params.game_id;
		var that		= this;
		var s_key 		= 'msibid_singlegame_badges_'+params.msib_id+'_'+params.game_id; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.msibid_singlegame_badges },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.social_api(params,function(data){ 
					gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(gthat.badge_filter(data))});			
					callback(gthat.badge_filter(data));
				});	
		
			}
		});	
	}
	
	this.last_games_badged = function(params, callback){
	
		if(params.with_data == true){
			params.ext 					= 'client/badges/' + params.msib_id + '/@self?sort[0]=update_date|desc';
		}else{ 
			params.ext 					= 'client/badges/' + params.msib_id + '/@self';
		} 
		params.count		 		= (params.count != undefined) 		? params.count : 3;
		params.with_data		 	= (params.with_data != undefined) 	? params.with_data : false;
		params.timeline		 		= (params.timeline != undefined) 	? params.timeline : 'alltime';
		if(params.timeline == 'weekly'){
			var timeline = 'weeklyType1';
		}else if(params.timeline == 'alltime'){ 
			if(gthat.base_url == 'http://staging.cartoonnetwork.com'){
				var timeline = 'allTimeType1';
			}else{
				var timeline = '3979c350-307d-49e4-be77-5d0c6be14bfe';
			}
		}
		params.timeline = timeline;
		var count 					= 0;
		var returndata				= {};
		var beenused			 	= {};
		var that					= this;
		var s_key 					= 'lgb_'+params.msib_id+'_'+params.count+'_'+params.with_data+'_'+params.timeline; 
		
		gthat.storage_api({ key	: s_key, timer : gthat.timeouts.last_games_badged },function(data){
 			if(data.success == true){ callback(data.data); }else{
 			
				gthat.social_api(params,function(badges){
					badges = that.badge_filter(badges);  
					if(params.with_data == true){
						params.s_key = s_key; 
						that.badge_extension(badges,callback,params);
					}else{  
						badges.reverse();
						for(x in badges){
							if(beenused[badges[x].badge_attributes.product] == undefined /*&& badges[x].badge_attributes.product != 100000*/){
								beenused[badges[x].badge_attributes.product] = 'true';
								returndata[count] 							= badges[x].badge_attributes; 
								returndata[count].badge_media_parameters 	= badges[x].badge_media_parameters;
								count++;
								if(count >= params.count){
									break;
								} 
							}
						} 
						gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(returndata)});
						callback(returndata); 
					}
				});
		
			}
		});
	} 
	this.is_int = function(input){
		return typeof(input)=='number'&&parseInt(input)==input;
	}
	this.badge_extension = function(badges,callback,params){
		
		/* 
			Badge Image
			Game Title
			Badges Earned
			Badges Possible
			User Top Score (If available) 
		*/
		var beenused		= {};
		var that			= this;
		var count 			= 0;
		var newbadges		= {};
		var prodstring		= '';  
		var used_prods		= [];
		for(var _x in badges){ 
			if(parseInt(_x) == _x){ 
				if(used_prods[badges[_x].badge_attributes.product] === undefined){
					used_prods[badges[_x].badge_attributes.product] = 1;
					beenused[_x+'_'+badges[_x].badge_attributes.product] = 1;
				}  
			}
		} 
		used_prods = undefined;
		
		
		for(var _x in beenused){ 
		
			var prodi = _x.split('_');
			var prod = prodi[1]; 
			var prod_count = 0;
			
			for(var x in badges){
				if(parseInt(x) == x){
					if(badges[x].badge_attributes.product == prod){
						prod_count++;
					}
				}
			}
			
			newbadges[count]		= {};
			newbadges[count].game	= prod;
			newbadges[count].badges	= prod_count; 
			prodstring				+= prod + '|';
			count++;
			if(count >= params.count){
				break;
			}
		} 
		
		beenused 		= {}; //get this out of memory
		prodstring 		= prodstring.substring(0, prodstring.length-1);
		
		if(prodstring	== ''){
			gthat.storage_api({ go:'set',key:params.s_key,value:JSON.stringify({'response' : 'No products'})});
			callback({'response' : 'No products'});
		}else{
			this.rest_product_managerapi({ pids: prodstring},function(data){
			 
			 	var this_counter = 0;
				for(var x in data){
					for(var i in newbadges){
						if(data[x].id == newbadges[i].game){ 
							data[x].badgesEarned	= newbadges[i].badges; 
							data[x].order_number	= this_counter;
							this_counter++;
						}
					}
					if(data[x].id == '100000'){
						// hardcode registration badge icon
						data[x].product_Image100by75 = 'Images/i9/cn_activitybadges_100x75.jpg';
					}
				} 
				that.finalized_badge_extension(data,callback,params); 
				
			});
		}
	}
	
	// Last Games Badges Global Vars:
	this.sent_req	= 0; 
	this.badge_data_last_badged = {};
	this.gameids = [];
	
	this.finalized_badge_extension	= function(data,callback,params){
		var timeline	= 'weekly';
		var that		= this; 
		this.badge_data_last_badged = data;
		for(var x in data){
			if(data[x].isTopscoreGame == true && data[x].leaderboards[0] != undefined){
			
				var gameid 		= data[x].leaderboards[0].id; 
				
				if(gameid != ''){
					this.personal_leaderboard({
						tid			: params.msib_id,
						authid		: that.authid,
						gameid		: gameid,
						timeline	: params.timeline
					},function(data){
						that.roundup_badge_extension(gameid,data,callback,params.s_key);
					});
					this.sent_req++;
				}
			}else if(data[x].isTopscoreGame == true){
				data[x].high_score = 'Data error';
			}
		} 
		if(this.sent_req == 0){
			gthat.storage_api({ go:'set',key:params.s_key,value:JSON.stringify(data)});
			callback(data);
		}
	} 
	
	
	this.roundup_badge_extension = function(gameid,data,callback,s_key){
		this.gameids.push(data); 
		if(this.gameids.length == this.sent_req){
			for(var x in this.badge_data_last_badged){
				if(this.badge_data_last_badged[x].isTopscoreGame == true && this.badge_data_last_badged[x].high_score != 'Data error'){
					
					for(var i in this.gameids){
						if(this.gameids[i].leaderboard_id == this.badge_data_last_badged[x].leaderboards[0].id){
							this.badge_data_last_badged[x].high_score = this.gameids[i].plays[0].score;
							this.badge_data_last_badged[x].leaderboards_data = this.gameids[i]; 
						}
					}
					
				}
			}
			gthat.storage_api({ go:'set',key:s_key,value:JSON.stringify(this.badge_data_last_badged)});
			callback(this.badge_data_last_badged);
		}
	}
	 
	this.timed = function(date1, date2) { 
	   	return Math.abs(date1.getTime() - date2.getTime());
	} 
	
	////////////////////////////////////
	// SORT JSON 
	// Triptych on stackoverflow.com 
	///////////////////////////////////
	this.sortBy = function (field, reverse, primer){
	   reverse = (reverse) ? -1 : 1;
	   return function(a,b){
	       a = a[field];
	       b = b[field];
	
	       if (typeof(primer) != 'undefined'){
	           a = primer(a);
	           b = primer(b);
	       }
	
	       if (a < b) return reverse * -1;
	       if (a > b) return reverse * 1;
	       return 0;
	   }
	}
	
}




/* MD5
	 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
	 * @link http://www.semnanweb.com/jquery-plugin/md5.html
	 * @see http://www.webtoolkit.info/
	 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
	 * @param {jQuery} {md5:function(string))
	 * @return string
*/
	
	(function($){
		
		var rotateLeft = function(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}
		
		var addUnsigned = function(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			if (lX4 | lY4) {
				if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}
		
		var F = function(x, y, z) {
			return (x & y) | ((~ x) & z);
		}
		
		var G = function(x, y, z) {
			return (x & z) | (y & (~ z));
		}
		
		var H = function(x, y, z) {
			return (x ^ y ^ z);
		}
		
		var I = function(x, y, z) {
			return (y ^ (x | (~ z)));
		}
		
		var FF = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var GG = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var HH = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var II = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var convertToWordArray = function(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWordsTempOne = lMessageLength + 8;
			var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
			var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};
		
		var wordToHex = function(lValue) {
			var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValueTemp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
			}
			return WordToHexValue;
		};
		
		var uTF8Encode = function(string) {
			string = string.replace(/\x0d\x0a/g, "\x0a");
			var output = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					output += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					output += String.fromCharCode((c >> 6) | 192);
					output += String.fromCharCode((c & 63) | 128);
				} else {
					output += String.fromCharCode((c >> 12) | 224);
					output += String.fromCharCode(((c >> 6) & 63) | 128);
					output += String.fromCharCode((c & 63) | 128);
				}
			}
			return output;
		};
		
		jQuery.extend({
			md5: function(string) {
				var x = Array();
				var k, AA, BB, CC, DD, a, b, c, d;
				var S11=7, S12=12, S13=17, S14=22;
				var S21=5, S22=9 , S23=14, S24=20;
				var S31=4, S32=11, S33=16, S34=23;
				var S41=6, S42=10, S43=15, S44=21;
				string = uTF8Encode(string);
				x = convertToWordArray(string);
				a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
				for (k = 0; k < x.length; k += 16) {
					AA = a; BB = b; CC = c; DD = d;
					a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
					d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
					c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
					b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
					a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
					d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
					c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
					b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
					a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
					d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
					c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
					b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
					a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
					d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
					c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
					b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
					a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
					d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
					c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
					b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
					a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
					d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
					c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
					b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
					a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
					d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
					c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
					b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
					a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
					d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
					c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
					b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
					a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
					d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
					c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
					b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
					a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
					d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
					c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
					b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
					a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
					d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
					c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
					b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
					a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
					d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
					c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
					b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
					a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
					d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
					c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
					b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
					a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
					d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
					c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
					b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
					a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
					d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
					c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
					b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
					a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
					d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
					c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
					b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
					a = addUnsigned(a, AA);
					b = addUnsigned(b, BB);
					c = addUnsigned(c, CC);
					d = addUnsigned(d, DD);
				}
				var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
				return tempValue.toLowerCase();
			}
		});
	})(jQuery);
	
	
	// 	Extend jQuery with functions for PUT and DELETE requests.
jQuery.extend({
    putPost: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'PUT');
    },
    deletePost: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'DELETE');
    },
    getJSON2: function(url, data, callback, type){
    	// Replacing the getJSON with error handling function
    	var typeX 		= (type != undefined) 		? type : 'json';
    	return _ajax_request(url, data, callback, typeX, 'GET');
    },
    postJSON: function(url, data, callback, type){
    	var typeX 		= (type != undefined) 		? type : 'json';
    	return _ajax_request(url, data, callback, typeX, 'POST');
    }
}); 

function _ajax_request(url, data, callback, type, method, errors) {
    if (jQuery.isFunction(data)) {
        callback 	= data;
        data 		= {};
    }
    return jQuery.ajax({
        type: 		method,
        url: 		url,
        data: 		data,
        success: 	callback,
        error:function (xhr, a, t){
			callback({	
				'server_error':true
			});
        },
        dataType: 	type
    });
}

function local_storage_class(){ 
 
	this.isOn = false;	
	
	// Check to see if its Available:
	
	this.isAvail = function(){
		if('localStorage' in window && window['localStorage'] !== null){
			this.isOn = true;
			return true;
		}else{
			return false;
		} 
	}
	
	// Get a Key:
	this.get = function(key){
		if(this.isOn == true){
			return localStorage.getItem(key);
		}
	}
	
	// Get via Key:
	this.getKey = function(key){
		if(this.isOn == true){
			return localStorage.key(key);
		}
	}
	
	// Put a Key => Value:
	this.put = function(key,val){ 
		// Make sure we havent exceeded our 5mb limit:
		try {
		    return localStorage.setItem(key,val);
		} catch (e) {
			return false;
		}
	}
	
	// Clear all local storage:
	this.clear = function(){
		if(this.isOn == true){ 
			localStorage.clear();
		}
	}
	
	this.remove = function(id){
		localStorage.removeItem(id);
	}
	
	// Get all current keys:
	this.getAll = function(){ 
		var values = [];
		for(i=0; i<localStorage.length; i++) {
			var d = this.getKey(i);   
			if(typeof(d) == 'string'){
				if(d.substring(0, 3) == 'CN_'){
		    		values.push(d);
		    	}
		    }
		}  
	}

}

