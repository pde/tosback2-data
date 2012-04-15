


window.addEvent("domready", function(){
  if(!$('measure'))
    return false;

  var tables = $('measure').getElements('table');
  for (i=0; i<tables.length; i++) {
    if (tables[i].hasClass('lightup')) {
      var tableRows = tables[i].getElements('tr');
      for (j=0; j<tableRows.length; j++) {
        if (!tableRows[j].hasClass('nolink')){
          tableRows[j].addEvent('mouseover',function(){
            this.addClass('highlit');
          });
          tableRows[j].addEvent('mouseout',function(){
            this.removeClass('highlit');
          });
          if (!tableRows[j].getParent('table').hasClass('nolink')){
            tableRows[j].setStyle('cursor','pointer');
            tableRows[j].addEvent('click',function(){
              var tableRowsTd = this.getElements('td');
              var inserter = tableRowsTd.get('text')[0];
              if (this.getParent('table').hasClass('womens')){
                var gender = 'Women';
               }
               else if (this.getParent('table').hasClass('mens')){
                var gender = 'Men';
               }
               window.location = document.location.protocol + '//' + document.location.host + '/search/null/filter/zc1/%22Shoes%22/txAttrFacet_Gender/' + gender + '/hc_' + gender.toLowerCase() + '_size/%22' + inserter + '%22';            
            });
          }
        }
      }
    }
  }
});

/**
 * TODO: Make this compatible with jQuery. Not necessary but could see use for
 * it at a later time.
 */
//Landing Page Promo
var LandingPagePromo = new Class ({
	
  Implements: Options,
  options: {
		'futureDate':'2009,12,04',
		'title':'Hold Tight! The adidas Ball Becomes Available In:'
	},
	
	initialize: function(el, type, options) {
    this.setOptions(options);

    this.el = document.getElement(el);
		this.type = type;
		this.futureDate = this.options['futureDate'];
		var dateItems = this.futureDate.split(',');
		this.title = this.options['title'];

		if (!this.el)
			return false;

		switch(this.type) {
			case 'countdown':
				//Create countdown div and inject countdown div at the top of div
				var type  = new Element('div', {id: this.type});
				type.inject(this.el, 'top');

				//Create h4 and spans for countdown div 
				$(type).set('html', '<h4>' + this.title + '</h4><span id="countdays"></span><span id="counthours"></span><span id="countminutes"></span><span id="countseconds"></span>');

				//The future date
				this.timer(dateItems[0], dateItems[1], dateItems[2]);
				break;
		}
	},
	
	timer: function(yr, m, d) {
		var theyear = yr;
		var themonth = m;
		var theday = d;

		var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

		//Get Today's Date
		var today = new Date();
		var todayy = today.getYear();
		if (todayy < 1000)
			todayy+=1900;
		var todaym = today.getMonth();
		var todayd = today.getDate();
		var todayh = today.getHours();
		var todaymin = today.getMinutes();
		var todaysec = today.getSeconds();
		var todaystring = months[todaym] + ' ' + todayd + ', ' + todayy + ' ' + todayh + ':' + todaymin + ':' + todaysec;

		//Calculate Countdown Time
		var futurestring = months[m-1] + ' ' + d + ', ' + yr;
		var dd = Date.parse(futurestring) - Date.parse(todaystring);
		var dday = Math.floor(dd / (60 * 60 * 1000 * 24) * 1);
		var dhour = Math.floor((dd% (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
		var dmin = Math.floor(((dd% (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
		var dsec = Math.floor((((dd% (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);

		if ((dday <= 0) && (dhour <= 0) && (dmin <= 0) && (dsec <= 1)) {
			//Removes countdown after time is up
			$(this.type).dispose();
		} else {
			//Athis.eldds the time to the countdown
			$('countdays').set('html', '<strong>' + dday + '</strong> days');
			$('counthours').set('html', '<strong>' + dhour + '</strong> hours');
			$('countminutes').set('html', '<strong>' + dmin + '</strong> mins');
			$('countseconds').set('html', '<strong>' + dsec + '</strong> secs');
			setTimeout(this.timer.bind(this, [theyear, themonth, theday]), 1000);
		}
	}
}); 

