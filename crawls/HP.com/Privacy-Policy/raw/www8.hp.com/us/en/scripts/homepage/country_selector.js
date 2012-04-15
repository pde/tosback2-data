var cselector = new Class({
	
	Implements: [Options,Chain, Selectors],
	            
	
	options: {		
		container: null,	// hovered elements
		hovered:null,		// the element that when hovered shows the tip
		ToolTipClass:null	// tooltip display class
	},
	
	initialize: function(options) {
		this.setOptions(options||null);
		if(!this.options.hovered) return;	
		
		if( this.options.hovered )
		this.elements = $(document.body).getElements(this.options.hovered);

		this.attach();
	},


 
       attach: function(){
		this.elements.each(function(elem, key){

			var tooltip = this.createContainer();
			elem.store('tip', tooltip.container);
			elem.store('wimage', tooltip.worldimg);

			$(document.body).adopt(tooltip.container);

			tooltip.container.status=0;
			tooltip.countries1.status=0;
			tooltip.countries2.status=0;
			tooltip.countries3.status=0;
			//tooltip.container.setStyle('left',elem.getCoordinates().left);
			
			tooltip.container.tipSize=tooltip.container.getCoordinates();
			tooltip.container.tipSize.height='399';
			tooltip.container.bodySize=document.body.getCoordinates();
			tooltip.container.parentCoordinates=elem.getCoordinates();

			
			tooltip.container.elemClose=[tooltip.countries1,tooltip.countries2,tooltip.countries3];
			tooltip.continentDiv1.elemOpen=tooltip.countries1;
			tooltip.continentDiv1.elemClose=[tooltip.countries2,tooltip.countries3];
			
			tooltip.continentDiv2.elemOpen=tooltip.countries2;
			tooltip.continentDiv2.elemClose=[tooltip.countries1,tooltip.countries3];


			tooltip.continentDiv3.elemOpen=tooltip.countries3;
			tooltip.continentDiv3.elemClose=[tooltip.countries1,tooltip.countries2];

            tooltip.continentText1.partnerDiv=tooltip.continentDiv1
            tooltip.continentText2.partnerDiv=tooltip.continentDiv2
            tooltip.continentText3.partnerDiv=tooltip.continentDiv3

						
			tooltip.container.parent=elem;		

			var over = this.enter.bindWithEvent(this, elem);
			elem.addEvent('click', over);
			//elem.addEvent('focus', over);
			elem.addEvent('keydown', over);
	


            window.document.addEvent ('click', function(e){
            
            if($('cselector').status)
            if (e.client.x > $('cselector').getCoordinates().right || e.client.x < $('cselector').getCoordinates().left || e.client.y > $('cselector').getCoordinates().bottom || e.client.y < $('cselector').getCoordinates().top)
              {
              //event.stop();
              $('cselector').parent.set('tween',{}).tween('background-color','#1E1E1E');
              $('cselector').set('tween',{}).tween('opacity', 0);
              $('cselector').status=0;
            }
            
            
            });

            $(document.body).getElements('.map')[0].addEvent ('keydown', function(event){
            if(event.key =='enter'){

             if($('cselector').status){
               $('cselector').parent.set('tween',{}).tween('background-color','#1E1E1E');
               $('cselector').set('tween',{}).tween('opacity', 0);
               $('cselector').status=0;
             }
             else{
               $('cselector').setStyle('display', 'block');
               $('cselector').parent.set('tween',{}).tween('background-color','#5F5F5F');
               $('cselector').set('tween',{}).tween('opacity', 1);
               $('cselector').status=1;
             }  
          }  
            });





						
			tooltip.closeBtn.addEvent ('click', function(){
               this.getParent().parent.set('tween',{}).tween('background-color','#1E1E1E');
               this.getParent().set('tween',{}).tween('opacity', 0);
	           this.getParent().status=0;
			});

			tooltip.container.addEvent ('mouseleave', function(event){
              // if (event.client.x > this.getCoordinates().right || event.client.x < this.getCoordinates().left || event.client.y > this.getCoordinates().bottom || event.client.y < this.getCoordinates().top)
             this.elemClose.each(function(element){
              // element.getParent().setStyle('width','33.33%');
               
               if (element.status==1){
                  element.set('tween',{duration: 300}).tween('opacity', 0);
                  element.status=0;
               }
               });
			});


			tooltip.continentDiv1.addEvent ('mouseenter', function(){
              this.elemClose.each(function(element){
               if (element.status==1){
                  element.set('tween',{}).tween('opacity', 0);
                  element.status=0;
               }

//                element.getParent().setStyle('width','27.5%');
              
               });
               
 //              this.setStyle('width','45%');
               this.elemOpen.set('tween',{duration: 300}).tween('opacity', 1);
	           this.elemOpen.status=1;
			});


			tooltip.continentDiv2.addEvent ('mouseenter', function(){
               this.elemClose.each(function(element){
               if (element.status==1){

                  element.set('tween',{}).tween('opacity', 0);
                  element.status=0;
               }

//               element.getParent().setStyle('width','27.5%');

               });
 //              this.setStyle('width','45%');
               this.elemOpen.set('tween',{duration: 300}).tween('opacity', 1);
	           this.elemOpen.status=1;
			});




			tooltip.continentDiv3.addEvent ('mouseenter', function(){
               this.elemClose.each(function(element){
               if (element.status==1){
                  
                  element.set('tween',{}).tween('opacity', 0);
                  element.status=0;
               }


               });

               this.elemOpen.set('tween',{duration: 300}).tween('opacity', 1);
	           this.elemOpen.status=1;
			});


			tooltip.continentText1.addEvent ('keydown', function(event){
              
            if(event.key =='enter'){
              event.stop(); 
             this.partnerDiv.elemClose.each(function(element){
               if (element.status==1){
                  
                  element.setStyle('opacity', 0);
                  element.status=0;
               }


               });

               this.partnerDiv.elemOpen.setStyle('opacity', 1);
	           this.partnerDiv.elemOpen.status=1;
               var allCountries = $(this.partnerDiv.elemOpen).getElements('A');
               allCountries[0].parentText=this;
               allCountries[0].focus();
               
               allCountries.each(function(element,i){
                  element.i=i;
                  element.parentCountries=element.getParent().getParent().getElements('A');
                  
                  element.addEvent('keydown', function(event){
                  	
                  	if(event.key=='tab'){
                  	   event.stop(); 
                  	   this.parentCountries[0].parentText.focus();
                  	   this.parentCountries[0].parentText.partnerDiv.elemOpen.setStyle('opacity', 0);
                       this.parentCountries[0].parentText.partnerDiv.elemOpen.status=0;

                  	}
                  	else if(event.key=='down'){
                  	event.stop();
                       if(this.parentCountries[this.i+1])
                         this.parentCountries[this.i+1].focus();
                  
                  	}
                  	else if(event.key=='up'){
                  	event.stop();
                       if(this.parentCountries[this.i-1])
                         this.parentCountries[this.i-1].focus();
                  
                  	}
                  	else if(event.key=='right'){
                  	event.stop();
                       if(this.parentCountries[parseInt(this.parentCountries.length/2 +.5) + this.i])
                         this.parentCountries[parseInt(this.parentCountries.length/2 +.5) + this.i].focus();
                  
                  	}

                  	else if(event.key=='left'){
                  	event.stop();
                       if(this.parentCountries[this.i - parseInt(this.parentCountries.length/2 + .5)])
                         this.parentCountries[this.i -  parseInt(this.parentCountries.length/2 +.5)].focus();
                  
                  	}
                  });
               });
              }
			});

			tooltip.continentText2.addEvent ('keydown', function(event){
               
            if(event.key =='enter'){
              event.stop(); 
             this.partnerDiv.elemClose.each(function(element){
               if (element.status==1){
                  
                  element.setStyle('opacity', 0);
                  element.status=0;
               }


               });

               this.partnerDiv.elemOpen.setStyle('opacity', 1);
	           this.partnerDiv.elemOpen.status=1;
               var allCountries = $(this.partnerDiv.elemOpen).getElements('A');
               allCountries[0].parentText=this;
               allCountries[0].focus();
               
               allCountries.each(function(element,i){
                  element.i=i;
                  element.parentCountries=element.getParent().getParent().getElements('A');
                  
                  element.addEvent('keydown', function(event){
                  	
                  	if(event.key=='tab'){
                  	   event.stop(); 
                  	   this.parentCountries[0].parentText.focus();
                  	   this.parentCountries[0].parentText.partnerDiv.elemOpen.setStyle('opacity', 0);
                       this.parentCountries[0].parentText.partnerDiv.elemOpen.status=0;

                  	}
                  	else if(event.key=='down'){
                  	event.stop();
                       if(this.parentCountries[this.i+1])
                         this.parentCountries[this.i+1].focus();
                  
                  	}
                  	else if(event.key=='up'){
                  	event.stop();
                       if(this.parentCountries[this.i-1])
                         this.parentCountries[this.i-1].focus();
                  
                  	}
                  	else if(event.key=='right'){
                  	event.stop();
                       if(this.parentCountries[parseInt(this.parentCountries.length/2 +.5) + this.i])
                         this.parentCountries[parseInt(this.parentCountries.length/2 +.5) + this.i].focus();
                  
                  	}

                  	else if(event.key=='left'){
                  	event.stop();
                       if(this.parentCountries[this.i - parseInt(this.parentCountries.length/2 + .5)])
                         this.parentCountries[this.i -  parseInt(this.parentCountries.length/2 +.5)].focus();
                  
                  	}
                  });
               });
              }
			});




			tooltip.continentText3.addEvent ('keydown', function(event){
               
               if( event.key =='tab' && !event.event.shiftKey)
               {
               this.getParent().parent.set('tween',{}).tween('background-color','#1E1E1E');
               this.getParent().set('tween',{}).tween('opacity', 0);
	           this.getParent().status=0;
	           }
              else
           {
              
            if(event.key =='enter'){
              event.stop(); 
             this.partnerDiv.elemClose.each(function(element){
               if (element.status==1){
                  
                  element.setStyle('opacity', 0);
                  element.status=0;
               }


               });

               this.partnerDiv.elemOpen.setStyle('opacity', 1);
	           this.partnerDiv.elemOpen.status=1;
               var allCountries = $(this.partnerDiv.elemOpen).getElements('A');
               allCountries[0].parentText=this;
               allCountries[0].focus();
               
               allCountries.each(function(element,i){
                  element.i=i;
                  element.parentCountries=element.getParent().getParent().getElements('A');
                  
                  element.addEvent('keydown', function(event){
                  	
                  	if(event.key=='tab'){
                  	   event.stop(); 
                  	   this.parentCountries[0].parentText.focus();
                  	   this.parentCountries[0].parentText.partnerDiv.elemOpen.setStyle('opacity', 0);
                       this.parentCountries[0].parentText.partnerDiv.elemOpen.status=0;

                  	}
                  	else if(event.key=='down'){
                  	event.stop();
                       if(this.parentCountries[this.i+1])
                         this.parentCountries[this.i+1].focus();
                  
                  	}
                  	else if(event.key=='up'){
                  	event.stop();
                       if(this.parentCountries[this.i-1])
                         this.parentCountries[this.i-1].focus();
                  
                  	}
                  	else if(event.key=='right'){
                  	event.stop();
                       if(this.parentCountries[parseInt(this.parentCountries.length/2 +.5) + this.i])
                         this.parentCountries[parseInt(this.parentCountries.length/2 +.5) + this.i].focus();
                  
                  	}

                  	else if(event.key=='left'){
                  	event.stop();
                       if(this.parentCountries[this.i - parseInt(this.parentCountries.length/2 + .5)])
                         this.parentCountries[this.i -  parseInt(this.parentCountries.length/2 +.5)].focus();
                  
                  	}
                  });
               });
              }
            } 

			});



			
		}, this);
	},



	enter: function(event, element){
	    
    	var tip = element.retrieve('tip');	
    	var wimage = element.retrieve('wimage');	
        tip.parentCoordinates=element.getCoordinates();

	    if (event.type=='click')
	    event.stop();
		wimage.set({'src':'/us/en/images/i/country_selector_462697.png'});
		//pathArray = window.location.pathname.split( '/' );
		//wimage.set({'src': '/' + pathArray[1] + '/' + pathArray[2] + '/' +'/us/en/images/i/country_selector_462697.png'});
		tip.setStyle('display', 'block');
		if (event.type== 'keydown' && event.event.shiftKey && event.key =='tab')
		{
			element.set('tween',{}).tween('background-color','#1E1E1E');
			tip.set('tween',{}).tween('opacity',0);
		    tip.status=0;
		return true;
		}


		if (event.type== 'keydown' && event.key !='enter')
		return true;
		

		

		
		if (tip.status){
		
			element.set('tween',{}).tween('background-color','#1E1E1E');
			tip.set('tween',{}).tween('opacity',0);
		    tip.status=0;
        }
        else{
		
		tip.status=1;
	
               if (tip.getStyle('opacity')==0)
               tip.elemClose.each(function(element){
               
               if (element.status==1){
                  element.setStyle('opacity', 0);
                  element.status=0;
               }
               });

	         
             element.set('tween',{duration: 300}).tween('background-color','#5F5F5F');
             tip.setStyle('display', 'block');
       		 tip.setStyles({'left':tip.parentCoordinates.left -4,'top':tip.parentCoordinates.top - tip.getCoordinates().height +2});

              tip.set('tween',{duration: 300}).tween('opacity',1); 

      }        
	
	
	},
	

	createContainer: function(){
		var container = new Element('div').set({'class':this.options.ToolTipClass,'id':'cselector'});
		var closeBtn = new Element('div').set({'class':'cselectorBtn png'});
		var worldimg = new Element('img').set({'class':'mapImage png','alt':''});
		
		var continentDiv1 = new Element ('div', {'class':'continentDiv','styles':{'width':'27.5%','left':'.4%'}}); 
		var continentDiv2 = new Element ('div', {'class':'continentDiv','styles':{'width':'45%'}}); 
		var continentDiv3 = new Element ('div', {'class':'continentDiv','styles':{'width':'27.5%','left':'-.4%'}}); 

		var continentText1 = new Element ('a', {'class':'continentText','html':$('americas').get('title') + '<SPAN class="screenReading hidden"> menu </SPAN>','styles':{'width':'27.5%'},'tabindex':this.options.tabindex}); 
		var continentText2 = new Element ('a', {'class':'continentText','html':$('europe').get('title') + '<SPAN class="screenReading hidden"> menu </SPAN>','styles':{'width':'45%'},'tabindex':this.options.tabindex}); 
		var continentText3 = new Element ('a', {'class':'continentText','html':$('asia').get('title') + '<SPAN class="screenReading hidden"> menu </SPAN>','styles':{'width':'27.5%'},'tabindex':this.options.tabindex}); 
		

/*		var countries1 = new Element ('div', {'class':'countries','html':$('americas').get('html'),'styles':{'left':'0%'}}); 
		var countries2 = new Element ('div', {'class':'countries','html':$('europe').get('html'),'styles':{'left':'30%'}}); 
		var countries3 = new Element ('div', {'class':'countries','html':$('asia').get('html'),'styles':{'left':'60%'}}); */
		var countries1 = new Element ('div', {'class':'countries','html':$('americas').get('html')}); 
		var countries2 = new Element ('div', {'class':'countries','html':$('europe').get('html')}); 
		var countries3 = new Element ('div', {'class':'countries','html':$('asia').get('html')}); 

		countries1.injectInside(continentDiv1);
  		countries2.injectInside(continentDiv2);
    	countries3.injectInside(continentDiv3);
		/*continentText1.injectInside(continentDiv1);
		continentText2.injectInside(continentDiv2);
		continentText3.injectInside(continentDiv3);*/


/*        continentDiv1.adopt(countries1, continentText1);
        continentDiv2.adopt(countries2, continentText2);
        continentDiv3.adopt(countries3, continentText3);*/
        

		//container.adopt (continentDiv1, continentDiv2, continentDiv3 );

        container.setStyle ('display', 'none');
        container.setStyle ('opacity', 0);
       
        countries1.setStyle('opacity', 0);
        countries2.setStyle('opacity', 0);
        countries3.setStyle('opacity', 0);


		container.adopt ( closeBtn, worldimg,continentText1,continentText2,continentText3, continentDiv1, continentDiv2, continentDiv3 );
	
		
		return {'container':container,'closeBtn':closeBtn, 'continentDiv1':continentDiv1, 'continentDiv2':continentDiv2,
		        'continentDiv3':continentDiv3, 'countries1':countries1, 'countries2':countries2, 'countries3':countries3, 'continentText1':continentText1,'continentText2':continentText2,'continentText3':continentText3,'worldimg':worldimg};		
	}	



});


new cselector({
			hovered:'.cselector',		// the element that when hovered shows the tip
			ToolTipClass:'worldmap',	// tooltip display class
            tabindex: $(document.body).getElements('.cselector')[0].get('tabindex')

		});






/* UnCompressed - Reason: DISABLED_TARGET-LIVECWADEPLOYER# */

/*
Date: 10/19/2011 12:51:49 PM
All images published
*/