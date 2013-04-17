
var strAboutNavHtml = '<div id="about_subnav" class="bucketwrap"> \
	<ul class="main"> \
		<li class="group"><a href="/about/aboutnpr/">About NPR</a> \
			<ul id="nav_aboutnpr" class="sub"> \
				<li><a href="/about/aboutnpr/history.html">Overview and History</a></li> \
				<li><a href="/about/aboutnpr/mission.html">Mission and Vision</a></li> \
				<li><a href="/about/aboutnpr/stations_publicmedia.html">NPR Stations and Public Media</a></li> \
				<li><a href="/about/aboutnpr/publicradiofinances.html">Public Radio Finances</a></li> \
				<li><a href="/about/aboutnpr/people/">People</a></li> \
				<li><a href="/about/aboutnpr/audience.html">Audience</a></li> \
				<li><a href="/about/aboutnpr/ethics/">Ethics and Practices</a></li> \
				<li><a href="/about-npr/177066727/visit-npr">Visit</a></li> \
			</ul> \
		</li> \
		<li class="group"><a href="/about/support/">Support and Sponsor</a> \
			<ul id="nav_support" class="sub"> \
				<li><a href="/about/support/supportus.html">Support Us</a></li> \
				<li><a href="/about/support/foundationsupport.html">Foundation Grants</a></li> \
				<li><a href="/about/support/majorgifts.html">Major Gifts</a></li> \
				<li><a href="/about/support/foundation.html">NPR Foundation</a></li> \
				<li><a href="/about/support/corpsponsorship.html">Corporate Sponsorship</a></li> \
				<li><a href="/about/support/advocate.html">Be an Advocate</a></li> \
			</ul> \
		</li> \
		<li class="group"><a href="/about/press/">Press Room</a> \
			<ul id="nav_press" class="sub"> \
				<li><a href="/about/press/releases/">Releases and Statements</a></li> \
				<li><a href="/about/press/media/">Media Library</a></li> \
				<li><a href="/about/press/awards.html">Awards</a></li> \
				<li><a href="/about/press/book_speaker.html">Book an NPR Speaker</a></li> \
				<li><a href="/about/press/media_contacts.html">Media Relations Contacts</a></li> \
			</ul> \
		</li> \
		<li class="group"><a href="/about/careers/">Careers</a> \
			<ul id="nav_careers" class="sub"> \
				<li><a href="https://careers-npr.icims.com">Job Openings</a></li> \
				<li><a href="/about/careers/appfaqs.html">Application FAQ\'s</a></li> \
				<li><a href="/about/careers/internships.html">Internships</a></li> \
				<li><a href="/about/careers/fellowships/">Fellowships</a></li> \
				<li><a href="/about/careers/volunteer.html">Volunteer</a></li> \
			</ul> \
		</li> \
	</ul> \
	</div>';
	
	
$('#main_sidebar').prepend(strAboutNavHtml);
var urlPathname = window.location.pathname;

$('#about_subnav a').each(function(index) {
	if ($(this).attr('href') == urlPathname) {
		$(this).addClass('selected');
	}
});

$('#about_subnav ul.sub').each(function(index) {
	var tmp = $(this).attr('id').slice(4);
	if (urlPathname == "/about/aboutnpr/") {
		$(this).show();
	} else if (urlPathname.indexOf(tmp) > 0) {
		$(this).show();
	}
	
});
