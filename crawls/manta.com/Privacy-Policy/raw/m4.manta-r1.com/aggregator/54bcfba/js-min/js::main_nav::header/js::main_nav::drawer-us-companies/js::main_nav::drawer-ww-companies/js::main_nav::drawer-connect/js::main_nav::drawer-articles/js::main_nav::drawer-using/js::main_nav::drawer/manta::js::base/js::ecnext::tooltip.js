;(function($){$(function(){var $signTop=$('.sign-top'),$signed=$('#signed');$signTop.click(function(){$signed.toggleClass('dropdown');});$signed.mouseup(function(){return false;});$(document).mouseup(function(e){if($(e.target).parent("#signed").length===0){$signed.removeClass("dropdown");}});var signin_name=$('.sign-btn strong').html();if(signin_name!=='Sign In'){var person_name_width=$('.sign-btn strong').outerWidth(),signin_content_width=$('.calc-signin-width').outerWidth();if(person_name_width+75>signin_content_width){$signed.width(person_name_width+75);}if(person_name_width+75<signin_content_width){$signed.width(signin_content_width+15);}}$signTop.click(function(){$('.dropdownUser').toggleClass('open');});});})(jQuery);;;drawer_us_companies='<div id="us-comp-drop" class="animate">\n\r\
					<div class="animate-drop">\n\r\
						<div class="animate-drop-left"></div>\n\r\
						<div class="animate-drop-right"></div>\n\r\
						<p class="preamble">Manta features more than 23 million companies in the U.S. Select an Industry or State below.</p>\n\r\
						<div class="list">\n\r\
							<div class="hold">\n\r\
								<div class="frame comp-us">\n\r\
									<div class="righty industries" id="right-column">\n\r\
										<div class="holder">\n\r\
											<div class="frame">\n\r\
												<div class="title">\n\r\
													<span class="subtitle">TOP INDUSTRIES</span>\n\r\
												</div>\n\r\
												<ul>\n\r\
													<li><a href="http://www.manta.com/mb_33_A0_000/advertising_marketing">Advertising and Marketing</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_33_B1_000/automotive_services">Automotive Services</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_33_E0_000/building_construction">Building and Construction</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_33_D0_000/healthcare">Healthcare</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_33_A2_000/insurance">Insurance</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_34_A306F_000/legal_services">Legal Services</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_34_E73E7_000/manufacturing_industries_nec">Manufacturing</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_33_A7_000/real_estate">Real Estate</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_33_C4_000/restaurants_bars">Restaurants and Bars</a></li>\n\r\
													<li><a href="http://www.manta.com/mb_33_B6_000/shopping_stores">Shopping and Stores</a></li>\n\r\
													<li><a href="http://www.manta.com/mb">See all...</a></li>\n\r\
												</ul>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
									<div class="lefty states" id="left-column">\n\r\
										<div class="holder">\n\r\
											<div class="frame">\n\r\
												<div class="title">\n\r\
													<span class="subtitle">U.S. STATES</span>\n\r\
												</div>\n\r\
												<div class="lists">\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_01/alabama">Alabama</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_02/alaska">Alaska</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_03/arizona">Arizona</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_04/arkansas">Arkansas</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_05/california">California</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_06/colorado">Colorado</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_07/connecticut">Connecticut</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_08/delaware">Delaware</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_09/district_of_columbia">District of Columbia</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_10/florida">Florida</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_11/georgia">Georgia</a></li>\n\r\
													</ul>\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_12/hawaii">Hawaii</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_13/idaho">Idaho</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_14/illinois">Illinois</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_15/indiana">Indiana</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_16/iowa">Iowa</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_17/kansas">Kansas</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_18/kentucky">Kentucky</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_19/louisiana">Louisiana</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_20/maine">Maine</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_21/maryland">Maryland</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_22/massachusetts">Massachusetts</a></li>\n\r\
													</ul>\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_23/michigan">Michigan</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_24/minnesota">Minnesota</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_25/mississippi">Mississippi</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_26/missouri">Missouri</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_27/montana">Montana</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_28/nebraska">Nebraska</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_29/nevada">Nevada</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_30/new_hampshire">New Hampshire</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_31/new_jersey">New Jersey</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_32/new_mexico">New Mexico</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_33/new_york">New York</a></li>\n\r\
													</ul>\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_34/north_carolina">North Carolina</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_35/north_dakota">North Dakota</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_36/ohio">Ohio</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_37/oklahoma">Oklahoma</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_38/oregon">Oregon</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_39/pennsylvania">Pennsylvania</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_40/rhode_island">Rhode Island</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_41/south_carolina">South Carolina</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_42/south_dakota">South Dakota</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_43/tennessee">Tennessee</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_44/texas">Texas</a></li>\n\r\
													</ul>\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_45/utah">Utah</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_46/vermont">Vermont</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_47/virginia">Virginia</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_48/washington">Washington</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_49/west_virginia">West Virginia</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_50/wisconsin">Wisconsin</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_41_ALL_51/wyoming">Wyoming </a></li>\n\r\
														<li class=wht>&ndash;</li>\n\r\
														<li><a href="http://www.manta.com/profile/my-companies/select?add_driver=drawer-us">Add Your Company</a></li>\n\r\
													</ul>\n\r\
												</div>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
								</div>\n\r\
							</div>\n\r\
							<div style="clear:both;height:0;line-height:0"></div>\n\r\
						</div>\n\r\
					</div>\n\r\
				</div>';jQuery(document).ready(function(){jQuery("#drawer-us-companies").html(drawer_us_companies);if(typeof(newco_select_subscriber)!="undefined"&&newco_select_subscriber){jQuery("#newco_select_drawer_link").attr("href","http://www.manta.com/mb?refine_company_dof_week=minus_4&dof_week_only=no");}});;;drawer_ww_companies='<div id="ww-comp-drop" class="animate" style="overflow: hidden;">\n\r\
					<div class="animate-drop">\n\r\
						<div class="animate-drop-left"></div>\n\r\
						<div class="animate-drop-right"></div>\n\r\
						<p class="preamble">Manta features more than 63 million companies worldwide..</p>\n\r\
						<div class="list">\n\r\
							<div class="hold">\n\r\
								<div class="frame comp-ww">\n\r\
									<div class="righty continents" id="left-column">\n\r\
										<div class="holder">\n\r\
											<div class="frame">\n\r\
												<div class="title">\n\r\
													<span class="subtitle">CONTINENTS</span>\n\r\
												</div>\n\r\
												<div class="lists">\n\r\
												<ul>\n\r\
													<li><a href="http://www.manta.com/world/Africa/">Africa</a></li>\n\r\
													<li><a href="http://www.manta.com/world/Asia/">Asia</a></li>\n\r\
													<li><a href="http://www.manta.com/world/Europe/">Europe</a></li>\n\r\
													<li><a href="http://www.manta.com/world/North+America/">N. America (non-U.S.)</a></li>\n\r\
													<li><a href="http://www.manta.com/world/Oceania/">Oceania</a></li>\n\r\
												</ul>\n\r\
												<ul>\n\r\
													<li><a href="http://www.manta.com/world/South+America/">South America</a></li>\n\r\
													<li><a href="http://www.manta.com/mb">U.S.</a></li>\n\r\
													<li><a href="http://www.manta.com/mb?refine_company_pubpri=public">U.S. Public</a></li>\n\r\
													<li><a id="newco_select_drawer_link" href="http://www.manta.com/newcompanies/">U.S. New Companies</a></li>\n\r\
												</ul>\n\r\
												</div>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
									<div class="lefty countries" id="right-column">\n\r\
										<div class="holder">\n\r\
											<div class="frame">\n\r\
												<div class="title">\n\r\
													<span class="subtitle">TOP COUNTRIES</span>\n\r\
												</div>\n\r\
												<div class="lists">\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/mb">United States</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Oceania/Australia/">Australia</a></li>\n\r\
														<li><a href="http://www.manta.com/world/South+America/Brazl/">Brazil</a></li>\n\r\
														<li><a href="http://www.manta.com/world/North+America/Canada/">Canada</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Asia/China/">China</a></li>\n\r\
													</ul>\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/world/Europe/France/">France</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Europe/Germany/">Germany</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Asia/Japan/">Japan</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Asia/Russian+Federation">Russian Federation</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Europe/United+Kingdom/">United Kingdom</a></li>\n\r\
													</ul>\n\r\
												</div>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
									<div class="lefty cities" id="right-column">\n\r\
										<div class="holder">\n\r\
											<div class="frame">\n\r\
												<div class="title">\n\r\
													<span class="subtitle">TOP CITIES FOR BUSINESS</span>\n\r\
												</div>\n\r\
												<div class="lists">\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/mb_51_ALL_KKS/houston_tx">Houston</a></li>\n\r\
														<li><a href="http://www.manta.com/world/South+America/Peru/-/Lima/">Lima</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Europe/United+Kingdom/-/London/">London</a></li>\n\r\
														<li><a href="http://www.manta.com/mb_51_ALL_1UH/los_angeles_ca">Los Angeles</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Asia/Russian+Federation/-/Moscow/">Moscow</a></li>\n\r\
													</ul>\n\r\
													<ul>\n\r\
														<li><a href="http://www.manta.com/mb_51_ALL_EEQ/new_york_ny">New York</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Europe/France/-/Paris/">Paris</a></li>\n\r\
														<li><a href="http://www.manta.com/world/South+America/Brazil/-/Sao+Paulo/">Sao Paulo</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Asia/Singapore/-/Singapore/">Singapore</a></li>\n\r\
														<li><a href="http://www.manta.com/world/Oceania/Australia/-/Sydney/">Sydney</a></li>\n\r\
													</ul>\n\r\
												</div>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
								</div>\n\r\
							</div>\n\r\
							<div style="clear:both;height:0;line-height:0"></div>\n\r\
						</div>\n\r\
					</div>\n\r\
				</div>';jQuery(document).ready(function(){jQuery("#drawer-ww-companies").html(drawer_ww_companies);if(typeof(newco_select_subscriber)!="undefined"&&newco_select_subscriber){jQuery("#newco_select_drawer_link").attr("href","http://www.manta.com/mb?refine_company_dof_week=minus_4&dof_week_only=no");}});;;var drawer_connect='				<div id=\"connect-drop\" class=\"animate\" style=\"overflow:hidden;\">\n\r\
					<div class=\"animate-drop\">\n\r\
						<div class=\"animate-drop-left\"></div>\n\r\
						<div class=\"animate-drop-right\"></div>\n\r\
						<p class=\"preamble\">A community for business owners to connect, share ideas, and ask questions to help grow your business.</p>\n\r\
						<div class=\"list list2\">\n\r\
							<div class=\"holder\">\n\r\
								<div class=\"frame\">\n\r\
									<div class=\"lefty\" id=\"left-column2\">\n\r\
										<div class=\"holder\" >\n\r\
											<div class=\"frame connect\" >\n\r\
												<ul class=\"box-list\">\n\r\
													<li class=\"xfolkentry\">\n\r\
														<strong><a href=\"http://connect.manta.com/index.php#categories-5\" target=\"_top\" class=\"taggedlink\">All About Manta</a></strong>\n\r\
														<p class=\"description\"><a href=\"http://connect.manta.com/f/announcements?f=20\">Announcements</a> | <a href=\"http://connect.manta.com/f/ask-manta?f=13\">Ask Manta</a> | <a href=\"http://connect.manta.com/f/introduce-yourself?f=11\">Introduce Yourself</a></p>\n\r\
													</li>\n\r\
													<li class=\"xfolkentry\">\n\r\
														<strong><a href=\"http://connect.manta.com/index.php#categories-21\" target=\"_top\" class=\"taggedlink\">Starting a Business</a></strong>\n\r\
														<p class=\"description\"><a href=\"http://connect.manta.com/f/business-plans-and-getting-started?f=22\">Business Plans and Getting Started</a> | <a href=\"http://connect.manta.com/f/funding-your-business?f=23\">Funding Your Business</a></p>\n\r\
													</li>\n\r\
													<li class=\"xfolkentry last\">\n\r\
														<strong><a href=\"http://connect.manta.com/index.php#categories-25\" target=\"_top\" class=\"taggedlink\">Operating a Business</a></strong>\n\r\
														<p class=\"description\"><a href=\"http://connect.manta.com/f/hiring-and-human-resources?f=26\">Hiring and Human Resources</a> | <a href=\"http://connect.manta.com/f/your-customers?f=27\">Your Customers</a> | <a href=\"http://connect.manta.com/f/money-accounting-and-finance?f=28\">Money, Accounting and Finance</a> | <a href=\"http://connect.manta.com/f/technology?f=29\">Technology</a></p>\n\r\
													</li>\n\r\
												</ul>\n\r\
												<ul class=\"box-list\">\n\r\
													<li class=\"xfolkentry\">\n\r\
														<strong><a href=\"http://connect.manta.com/index.php#categories-31\" target=\"_top\" class=\"taggedlink\">Marketing & Sales</a></strong>\n\r\
														<p class=\"description\"><a href=\"http://connect.manta.com/f/marketing?f=32\">Marketing &amp; Advertising</a> | <a href=\"http://connect.manta.com/f/sales?f=33\">Sales</a></p>\n\r\
													</li>\n\r\
													<li class=\"xfolkentry\">\n\r\
														<strong><a href=\"http://connect.manta.com/index.php#categories-3\" target=\"_top\" class=\"taggedlink\">Doing Business on the Web</a></strong>\n\r\
														<p class=\"description\"><a href=\"http://connect.manta.com/f/your-website?f=8\">Your Website</a> | <a href=\"http://connect.manta.com/f/social-media?f=9\">Social Media</a></p>\n\r\
													</li>\n\r\
													<li class=\"xfolkentry last\">\n\r\
														<strong><a href=\"http://connect.manta.com/listforums.php?#categories-4\" target=\"_top\" class=\"taggedlink\">Tip of the Day</a></strong>\n\r\
														<p class=\"description\"><a href=\"http://connect.manta.com/f/topic-of-the-day?f=12\">Tip of the Day</a> | <a href=\"http://connect.manta.com/f/anything-else?f=36\">Tip of the Day Suggestions</a></p>\n\r\
													</li>\n\r\
												</ul>\n\r\
												<ul class=\"box-list\">\n\r\
													<li class=\"xfolkentry\">\n\r\
														<strong><a href=\"http://connect.manta.com/index.php#categories-44\" target=\"_top\" class=\"taggedlink\">The Pulse: Politics and Your Business</a></strong>\n\r\
														<p class=\"description\"><a href=\"http://connect.manta.com/f/the-issues?f=50\">The Issues</a> | <a href=\"http://connect.manta.com/f/jobs-and-the-economy?f=52\">Jobs and The Economy</a> | <a href=\"http://connect.manta.com/f/healthcare-and-tax-policy?f=54\">Healthcare and Tax Policy</a> | <a href=\"http://connect.manta.com/f/access-to-credit-ability-to-get-a-loan?f=56\">Access to Credit / Ability To Get a Loan</a> | <a href=\"http://connect.manta.com/f/budget-deficit?f=58\">Budget Deficit</a></p>\n\r\
													</li>\n\r\
												</ul>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
								</div>\n\r\
							</div>\n\r\
							<div style=\"clear:both;height:0;line-height:0\"></div>\n\r\
						</div>\n\r\
					</div>\n\r\
				</div>';jQuery(document).ready(function(){jQuery("#drawer-connect").html(drawer_connect)});;;var drawer_articles='				<div id="articles-drop" class="animate" style="overflow: hidden;">\n\r\
					<div class="animate-drop">\n\r\
						<div class="animate-drop-left"></div>\n\r\
						<div class="animate-drop-right"></div>\n\r\
						<p class="preamble">Take advantage of Manta&rsquo;s business features: advice from the pros, dos &amp; don&rsquo;ts, tips &amp; advice.</p>\n\r\
						<div class="list list2">\n\r\
							<div class="holder">\n\r\
								<div class="frame biz-feat">\n\r\
									<div class="lefty categories" id="left-column2">\n\r\
										<div class="holder" >\n\r\
											<div class="frame categories" >\n\r\
												<div class="title">\n\r\
													<span class="subtitle">BUSINESS FEATURES</span>\n\r\
												</div>\n\r\
												<ul class="box-list W701">\n\r\
													<li class="xfolkentry">\n\r\
														<span class="image-box">\n\r\
															<a href="http://www.manta.com/small-business/" target="_top">\n\r\
																<span class="s-icon" id="s-icon01"></span>\n\r\
															</a>\n\r\
														</span>\n\r\
														<strong><a href="http://www.manta.com/small-business/" target="_top" class="taggedlink">Small Business</a></strong>\n\r\<p class="description"><a href="/small-business/Want-a-Better-Bottom-Line-0312" target="_top">Eight Ways to Make Customers to Love a Local Business</a></p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<span class="image-box">\n\r\
															<a href="http://www.manta.com/marketing/" target="_top">\n\r\
																<span class="s-icon" id="s-icon04"></span>\n\r\
															</a>\n\r\
														</span>\n\r\
														<strong><a href="http://www.manta.com/marketing/" target="_top" class="taggedlink">Marketing</a></strong>\n\r\<p class="description"><a href="/marketing/8-keys-email-writing" target="_top">8 Keys to Writing For Email Marketing</a></p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<span class="image-box">\n\r\
															<a href="http://www.manta.com/sales/" target="_top">\n\r\
																<span class="s-icon" id="s-icon02"></span>\n\r\
															</a>\n\r\
														</span>\n\r\
														<strong><a href="http://www.manta.com/sales/" target="_top" class="taggedlink">Sales Expertise</a></strong>\n\r\<p class="description"><a href="/sales/plan-sales-pitch-words" target="_top">Plan Your Sales Pitch Down to the Word; Hereâs Why</a></p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<span class="image-box">\n\r\
															<a href="http://www.manta.com/franchise/" target="_top">\n\r\
																<span class="s-icon" id="s-icon05"></span>\n\r\
															</a>\n\r\
														</span>\n\r\
														<strong><a href="http://www.manta.com/franchise/" target="_top" class="taggedlink">Franchise</a></strong>\n\r\<p class="description"><a href="/franchise/franchise_experience_1110" target="_top">Buying a Franchise: Need Previous Industry Experience?</a></p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<span class="image-box">\n\r\
															<a href="http://www.manta.com/hr/" target="_top">\n\r\
																<span class="s-icon" id="s-icon03"></span>\n\r\
															</a>\n\r\
														</span>\n\r\
														<strong><a href="http://www.manta.com/hr/" target="_top" class="taggedlink">Human Resources</a></strong>\n\r\<p class="description"><a href="/hr/hr-mistakes" target="_top">Common Human Resource Mistakes Made by Small Businesses</a></p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<span class="image-box">\n\r\
															<a href="http://www.manta.com/tech/" target="_top">\n\r\
																<span class="s-icon" id="s-icon06"></span>\n\r\
															</a>\n\r\
														</span>\n\r\
														<strong><a href="http://www.manta.com/tech/" target="_top" class="taggedlink">Technology</a></strong>\n\r\<p class="description"><a href="/tech/hackers-small-business" target="_top">Hackers Not Attracted to Small Businesses? False</a></p>\n\r\
													</li>\n\r\
												</ul>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
									<div class="lefty newsletters" id="right-column2">\n\r\
										<div class="holder">\n\r\
											<div class="frame newsletters">\n\r\
												<div class="title">\n\r\
													<span class="subtitle">NEWSLETTERS</span>\n\r\
												</div>\n\r\
												<ul class="box-list">\n\r\
													<li id="name-to-highlight">\n\r\
														<strong><a href="http://www.manta.com/business-topics/newsletters/" target="_top">Current Newsletters</a></strong>\n\r\
														<p class="description">Helpful insights for running your business delivered to your inbox</p>\n\r\
													</li>\n\r\
													<li id="name-to-highlight">\n\r\
														<strong><a href="http://www.manta.com/newsletters/archive/" target="_top">Newsletter Archive</a></strong>\n\r\
														<p class="description">Find past editions of Manta newsletters back to 2008</p>\n\r\
													</li>\n\r\
												</ul>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
								</div>\n\r\
							</div>\n\r\
							<div style="clear:both;height:0;line-height:0"></div>\n\r\
						</div>\n\r\
					</div>\n\r\
				</div>';jQuery(document).ready(function(){jQuery("#drawer-articles").html(drawer_articles);});;;var drawer_using='				<div id="using-drop" class="animate" style="overflow:hidden;">\n\r\
					<div class="animate-drop">\n\r\
						<div class="animate-drop-left"></div>\n\r\
						<div class="animate-drop-right"></div>\n\r\
						<p class="preamble"></p>\n\r\
						<div class="list list2">\n\r\
							<div class="holder">\n\r\
								<div class="frame">\n\r\
									<div class="lefty" id="left-column2">\n\r\
										<div class="holder" >\n\r\
											<div class="frame using" >\n\r\
												<div class="title">\n\r\
													<span class="subtitle">USING MANTA</span>\n\r\
												</div>\n\r\
												<ul class="box-list">\n\r\
													<li class="xfolkentry">\n\r\
														<strong><a href="http://www.manta.com/profile/my-companies/select?add_driver=drawer-more" target="_top" class="taggedlink">Promote Your Business on Manta</a></strong>\n\r\
														<p class="description">Add your company profile to Manta. It\'s FREE.</p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<strong><a href="http://www.manta.com/profile/my-companies/upgrade?sub_driver=pbl-'+argspage+'-drawer" target="_top" class="taggedlink">Upgrade to a Premium Listing</a></strong>\n\r\
														<p class="description">Move your profile to the top of Manta search results.</p>\n\r\
													</li>\n\r\
													<li class="xfolkentry last">\n\r\
														<strong><a href="http://www.manta.com/using-manta/enhance" target="_top" class="taggedlink">Enhance Your Manta Profile</a></strong>\n\r\
														<p class="description">Best practices for creating & improving your profile.</p>\n\r\
													</li>\n\r\
												</ul>\n\r\
												<ul class="box-list">\n\r\
													<li class="xfolkentry">\n\r\
														<strong><a href="http://connect.manta.com/" target="_top" class="taggedlink">Connect With the Community</a></strong>\n\r\
														<p class="description">Share ideas with business owners on Manta Connect.</p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<strong><a href="http://www.manta.com/coms2/page_FAQ" target="_top" class="taggedlink">Get Answers</a></strong>\n\r\
														<p class="description">To frequently asked questions about Manta.</p>\n\r\
													</li>\n\r\
													<li class="xfolkentry last">\n\r\
														<strong><a href="http://www.manta.com/mb#?tab=charts-emp_pie" target="_top" class="taggedlink">See How Your Business Ranks</a></strong>\n\r\
														<p class="description">Chart companies by industry & geographic area.</p>\n\r\
													</li>\n\r\
												</ul>\n\r\
												<ul class="box-list">\n\r\
													<li class="xfolkentry">\n\r\
														<strong><a href="http://www.manta.com/iphone" target="_top" class="taggedlink">Manta Mobile</a></strong>\n\r\
														<p class="description">Access Manta search on your mobile device.</p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<strong><a href="http://www.manta.com/android" target="_top" class="taggedlink">Manta Android</a></strong>\n\r\
														<p class="description">Access Manta search on your android.</p>\n\r\
													</li>\n\r\
													<li class="xfolkentry last">\n\r\
														<strong><a href="http://www.manta.com/using-manta/refine" target="_top" class="taggedlink">Refine Your Search Results</a></strong>\n\r\
														<p class="description">Use Manta filters to get right to the info you want.</p>\n\r\
													</li>\n\r\
												</ul>\n\r\
												<ul class="box-list">\n\r\
													<li class="xfolkentry">\n\r\
														<strong><a href="http://www.manta.com/jobs" target="_top" class="taggedlink">Find a Job</a></strong>\n\r\
														<p class="description">Search millions of jobs by category and location.</p>\n\r\
													</li>\n\r\
													<li class="xfolkentry">\n\r\
														<strong><a href="http://www.manta.com/video" target="_top" class="taggedlink">Learn From Business Videos</a></strong>\n\r\
														<p class="description">Thousands of videos to help you grow your business.</p>\n\r\
													</li>\n\r\
												</ul>\n\r\
											</div>\n\r\
										</div>\n\r\
									</div>\n\r\
								</div>\n\r\
							</div>\n\r\
							<div style="clear:both;height:0;line-height:0"></div>\n\r\
						</div>\n\r\
					</div>\n\r\
				</div>';jQuery(document).ready(function(){jQuery("#drawer-using").html(drawer_using)});;;$(function(){var _hoverClass='hover';var _animateSpeed=350;var _stayTime=600;$('#header-browse a').each(function(){var _opener=$(this);var _drop=$('#drawer-'+$(this).attr('rel'));if(_drop.length){var _timer;var _slideDrop=_drop.children();var _slideHeight=_slideDrop.outerHeight(true);_slideDrop.css({marginTop:-_slideHeight});_drop.show();var _hover=function(){if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_slideDrop.animate({marginTop:0},{duration:_animateSpeed,queue:false});},_stayTime);};var _unhover=function(){if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_slideDrop.animate({marginTop:-_slideHeight},{duration:_animateSpeed,queue:false});},_stayTime);};_drop.hover(_hover,_unhover);_opener.hover(_hover,_unhover);}});$('#nav-drawer').css({visibility:'visible'});});;;jQuery(function(){hideSlideDropDown();initTabs();initSubmits();initContentPopups();initRadioEnabler();initSignInOutArea('sign');initSignInOutArea('user-name');initLoginOnEnter();initSlideDropDown();});function initSignInOutArea(areaid){var _fadeSpeed=200;var _activeClass='hover';jQuery('#'+areaid).each(function(){var _holder=jQuery(this);var _opener=_holder.find('a.'+areaid+'-btn');var _slider=_holder.find('div.'+areaid+'-drop');_opener.click(function(){if(_holder.hasClass(_activeClass)){_holder.removeClass(_activeClass);_slider.fadeOut(_fadeSpeed);$('.ad-rectbox .conflict').removeClass('hide');}else{_holder.addClass(_activeClass);_slider.fadeIn(_fadeSpeed);_slider.find('input:eq(0)').focus();$('.ad-rectbox .conflict').addClass('hide');}
return false;});if(_holder.hasClass(_activeClass)){_slider.show();$('.ad-rectbox .conflict').addClass('hide');}
else{_slider.hide();$('.ad-rectbox .conflict').removeClass('hide');}
jQuery('body').click(function(e){if(!e)e=window.event;var _target=(e.target||e.srcElement);if(!jQuery(_target).parents('#'+areaid).length){_holder.removeClass(_activeClass);_slider.fadeOut(_fadeSpeed);$('.ad-rectbox .conflict').removeClass('hide');}});jQuery(document).keydown(function(e){if(!e)evt=window.event;if(e.keyCode==27){_holder.removeClass(_activeClass);_slider.fadeOut(_fadeSpeed);$('.ad-rectbox .conflict').removeClass('hide');}});});}
function initLoginOnEnter(){if($('.top_login_password')){$('.top_login_password').keypress(function(event){if(event.keyCode==13){$('#top_login_form').submit();}});}}
var initTabsAlreadyRan=false;function initTabs(){if(initTabsAlreadyRan){return false;}
else{initTabsAlreadyRan=true;}
(function($){$('ul.tabset').each(function(){$(this).find("a.tab").each(function(){$(this).click(function(){$("ul.tabset a.tab").filter('.active').each(function(){$(this).removeClass('active');});$(this).addClass('active');});});});var other_tabs=$('.tabset li .tab').not('.tabset li.main .tab').not('.colortabser li.company-profile .tab');var other_tabs_anim_duration=400;var i=0;other_tabs.each(function(){$(this).delay((other_tabs_anim_duration*0.5)*(i+1)).show('slide',{direction:'down',easing:'easeOutBounce'},other_tabs_anim_duration);i++;});})(jQuery);}
function initSubmits(){var inputs=document.getElementsByTagName("input");var onMouseOver=function(){this.src=this.src.replace(".gif","-hover.gif");};var onMouseOut=function(){this.src=this.src.replace("-hover.gif",".gif");};for(var i=0;i<inputs.length;i++){if(inputs[i].className.indexOf("image")!=-1){inputs[i].onmouseover=onMouseOver;inputs[i].onmouseout=onMouseOut;}}}
function initRadioEnabler(){var _disabledBefore='bdisabled';var _enabledClass='enabled';var _enablers=jQuery('.radio-enabler');if(_enablers.length>0){_enablers.each(function(){var _holder=$(this);var _inputs=_holder.find('input[type="radio"]').attr('checked','');var _button=_holder.find('.btn-started, .button').addClass(_disabledBefore);_inputs.click(function(){_holder.addClass(_enabledClass);_button.addClass(_enabledClass).removeClass(_disabledBefore);});});}}
function initContentPopups(){var _hoverDelay=500;var _openers=jQuery('a.content-popup');function positionPopup(){if(_positionMiddle){_popup.css({top:$(window).scrollTop()+($(window).height()/2-_popup.outerHeight(true)/2)+(_popupOffset?parseInt(_popupOffset[0],10):0),left:$(window).scrollLeft()+($(window).width()/2-_popup.outerWidth(true)/2)+(_popupOffset?parseInt(_popupOffset[1],10):0)});}else{var _openerOffset=_opener.offset();_popup.css({top:_openerOffset.top-_popup.outerHeight(true)+(_popupOffset?parseInt(_popupOffset[0],10):0),left:_openerOffset.left-(_popup.outerWidth(true)/2-_opener.width()/2)+(_popupOffset?parseInt(_popupOffset[1],10):0)});}}
if(_openers.length>0){_openers.each(function(){var _opener=$(this);var _popupInfo=_opener.attr('rel');var _popupOffset=false;var _popup;var _timer;if(!_popupInfo.length)return;if(_popupInfo.indexOf(' ')!=-1){_popupInfo=_popupInfo.split(' ');_popupOffset=_popupInfo[1].split(';');_popup=$('#'+_popupInfo[0]);}
else _popup=$('#'+_popupInfo);if(_popup.length){_popup.hide();var _positionMiddle=(!_opener.hasClass('show-onhover'));if(_opener.hasClass('show-onhover')){_opener.hover(function(){positionPopup();if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_popup.show();},_hoverDelay);},function(){if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_popup.hide();},_hoverDelay);});_popup.hover(function(){if(_timer)clearTimeout(_timer);},function(){if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_popup.hide();},_hoverDelay);});}
else{_opener.click(function(){positionPopup();_popup.show();return false;});}
_popup.find('a.btn-close, a.close, a.cancel').click(function(){_popup.hide();return false;});_popup.find('input[type="submit"], input[type="image"]').click(function(){_popup.hide();});$('body').click(function(e){if(!e)e=window.event;var _target=(e.target||e.srcElement);if(!$(_target).parents('div.popup').length){_popup.hide();}});}});}}
function initTooltip(){var _reactTime=50;var _tooltipOffsetX=-143;var _tooltipOffsetY=1;var _tipOpeners=jQuery('a:not(.highlighter)');var _attribute='rel';var _tooltipID='simpletooltip';var _tooltipContentID='tipcontent';var _tooltip=jQuery('<div class="tip-wrapper"><div class="popup" id="'+_tooltipID+'"><div class="popup-content" id="'+_tooltipContentID+'"></div><div class="btm-bg"></div></div></div>').appendTo('body').hide();var _tipContent=jQuery('#'+_tooltipContentID);var _stopload=false;var _timer;function toggleTooltip(_state,_text){if(_state){if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){if(_tipContent.html()!=_text){_tooltip.hide();_tipContent.html(_text);}
_tooltip.show();},_reactTime);}else{if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_tooltip.hide();},_reactTime);}}
_tipOpeners.each(function(){var _opener=jQuery(this);var _tipText=_opener.attr(_attribute);if(_tipText.length){_opener.hover(function(){_tooltip.css({position:'absolute',left:_opener.offset().left+_tooltipOffsetX,top:_opener.offset().top+_tooltipOffsetY});_stopload=false;jQuery.ajax({type:"GET",url:_tipText,dataType:"html",success:function(msg){if(!_stopload)
toggleTooltip(true,msg);}});},function(){_stopload=true;toggleTooltip(false,_tipText);});}});_tooltip.hover(function(){if(_timer)clearTimeout(_timer);},function(){if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_tooltip.hide();},_reactTime);});}
function initSlideDropDown(){var _hoverClass='hover';var _animateSpeed=350;var _stayTime=600;jQuery('.nav-anim').each(function(){var _opener=jQuery(this);var _drop=_opener.find('.animate');if(_drop.length){_drop.show();var _timer;var _slideDrop=_drop.children();var _slideHeight=_slideDrop.outerHeight(true);_slideDrop.css({marginTop:-_slideHeight});_opener.hover(function(){if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_slideDrop.animate({marginTop:0},{duration:_animateSpeed,queue:false});},_stayTime);},function(){if(_timer)clearTimeout(_timer);_timer=setTimeout(function(){_slideDrop.animate({marginTop:-_slideHeight},{duration:_animateSpeed,queue:false});},_stayTime);});}
jQuery('.nav-anim').each(function(){jQuery(this).hover(function(){jQuery('#'+jQuery(this).attr('rel')).addClass('hov');},function(){jQuery('#'+jQuery(this).attr('rel')).removeClass('hov');});jQuery(this).click(function(){if(this.attr('rel')!="more"){if(_timer){clearTimeout(_timer);}
_timer=_slideDrop.animate({marginTop:-_slideHeight},{duration:_animateSpeed,queue:false});}else if(this.attr('rel')=="more"){_slideDrop.animate({marginTop:0},{duration:_animateSpeed,queue:false});}});});_opener.find('.hilite').each(function(){jQuery(this).click(function(){if(_timer){clearTimeout(_timer);}
_timer=_slideDrop.animate({marginTop:-_slideHeight},{duration:_animateSpeed,queue:false});});});});}
function hideSlideDropDown(){jQuery('.nav-anim').each(function(){var _opener=jQuery(this);var _drop=_opener.find('div.animate');if(_drop.length){_drop.hide();var _sections=_opener.find('div.animate-drop');_sections.css({display:'block'});}});}
function PopUp(url,wsize,hsize,resize){window.open(url,'childwin','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width='+wsize+',height='+hsize+',resizable='+resize);}
function WinOpen(url,wsize,hsize,resize){window.open(url,'childwin','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width='+wsize+',height='+hsize+',resizable='+resize);}
function openWinView(url){winview=window.open(url,'winview','toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,resizable=yes,width=600,height=500,scrollbars=yes');winview.focus();}
function changeButton(myImage){re=/On\.gif/;found=re.exec(myImage.src);if(found=='On.gif'){re=/On\.gif/;newSrc=myImage.src.replace(re,'Off.gif');myImage.src=newSrc;}else{re=/Off\.gif/;newSrc=myImage.src.replace(re,'On.gif');myImage.src=newSrc;}}
function RUSure(){if(confirm("Are you sure you want to\nclear the entire form?")){document.registration.reset();}else{return;}}
function getCookieVal(offset){var endstr=document.cookie.indexOf(";",offset);if(endstr==-1)
endstr=document.cookie.length;return unescape(document.cookie.substring(offset,endstr));}
function getCookieSurvey(name){var arg=name+"=";var alen=arg.length;var clen=document.cookie.length;var i=0;while(i<clen){var j=i+alen;if(document.cookie.substring(i,j)==arg)
return getCookieVal(j);i=document.cookie.indexOf(" ",i)+1;if(i===0)break;}
return null;}
function SetCookie(name,value){var expdate=new Date();var argv=SetCookie.arguments;var argc=SetCookie.arguments.length;var expires=(argc>2)?argv[2]:null;expdate.setDate(expdate.getDate()+expires);var path=(argc>3)?argv[3]:null;var domain='.manta.com';var secure=(argc>5)?argv[5]:false;var cookieVal=name+"="+escape(value)+
((path==null)?"":("; path="+path))+
((expires==null)?"":("; expires="+expdate))+
((domain==null)?"":("; domain="+domain))+
((secure==true)?"; secure":"");document.cookie=cookieVal;}
function clearDefault(textfield){if(textfield.defaultValue==textfield.value)textfield.value=""}
function unclearDefault(textfield){if(textfield.value=='')textfield.value=textfield.defaultValue}
function positionBottomRight(target,eventCoords){target.style.left=(eventCoords[0]+10)+'px';target.style.top=eventCoords[1]+'px';}
function showTooltip(e,name,kwArgs)
{kwArgs=kwArgs||{positionCallback:positionBottomRight};var c=findCoords(e);if(!e)var e=window.event;var target=document.getElementById(name);kwArgs.positionCallback(target,c);target.style.display="";}
function hideTooltip(e,name)
{if(!e)var e=window.event;var target=document.getElementById(name);target.style.display="none";}
function findCoords(e){var posx=0;var posy=0;if(!e)var e=window.event;if(e.pageX||e.pageY){posx=e.pageX;posy=e.pageY;}
else if(e.clientX||e.clientY){posx=e.clientX+document.body.scrollLeft
+document.documentElement.scrollLeft;posy=e.clientY+document.body.scrollTop
+document.documentElement.scrollTop;}
return[posx,posy];}
function SubmitCompanySearch(search_form,interstitial_form)
{if(search_form.search.value!='')
{search_form.submit();}
else
{alert('Please enter a company name, category or location.');}}
(function($,manta){manta.fn={};})(jQuery,(window.manta=(window.manta?window.manta:{})));;;(function($){if(typeof ecnext=="undefined"){window.ecnext={};}
window.ecnext.toolTip=function(p){if(p==undefined){p={};}
if(!p.width){p.width=200;}
if(!p.bgcolor){p.bgcolor='#F6F9FD';}
if(!p.bordercolor){p.bordercolor='#D1E1F6';}
if(!p.xpos){p.xpos='right';}
if(!p.xoffset){p.xoffset=0;}
if(!p.yoffset){p.yoffset=0;}
this.width=p.width;this.bgcolor=p.bgcolor;this.bordercolor=p.bordercolor;this.xpos=p.xpos;this.xoffset=p.xoffset;this.yoffset=p.yoffset;this.id=$.jCache.setItem("tooltip_counter",$.jCache.getItem("tooltip_counter")+1);this.name='ec_tooltip_'+this.id;this.hidden=true;this.remove_old=false;if(p.contentText){this.innerHTML=p.contentText;}
else if(p.content&&$("#"+p.content).length){this.innerHTML=$("#"+p.content).html();this.remove_old=true;}
else{this.innerHTML='';}
this.content='<div id="'+this.name+'" style="z-index: 20; background-color:transparent; background-image:url(/manta/images/featured_listings/shadow.png); background-repeat:repeat; display:none; position:absolute;"><div style="position:relative; background:'+this.bgcolor+'; border:1px solid '+this.bordercolor+'; padding:4px; width:'+this.width+'px; left:-4px; top:-4px">'+this.innerHTML+'</div></div>';this.show=function(e){if(this.hidden){var coords=findCoords(e);if(this.xpos=='left'){this.left=(coords[0]-this.width-10-this.xoffset)+'px';}
else{this.left=(coords[0]+10+this.xoffset)+'px';}
this.top=(coords[1]+10+this.yoffset)+'px';if(!$("#"+this.name).length){var _this=this;$(document).ready(function(){_this._show()});}
else{this._show();}}}
this._show=function(){var target=$("#"+this.name);if(target.length){target.css("left",this.left);target.css("top",this.top);target.css("display","");this.hidden=false;}}
this._hide=function(){var target=$("#"+this.name);if(target.length){target.css("display","none");this.hidden=true;}}
this.hide=function(){if(!$("#"+this.name).length){var _this=this;$(document).ready(function(){_this.hide()});}
else{this._hide();}}
this.rendered=false;this.render=function(){if(this.rendered){return}
if(this.remove_old&&$("#"+p.content).length){$("#"+p.content).remove();}
var div=document.createElement("div");div.innerHTML=this.content;document.body.appendChild(div);this.rendered=true;}
var _this=this;$(document).ready(function(){_this.render()});}})(jQuery);;