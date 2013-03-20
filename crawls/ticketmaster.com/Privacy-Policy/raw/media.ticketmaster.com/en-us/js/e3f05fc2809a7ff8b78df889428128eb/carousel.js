
Slider = Class.create({
  // -----------------------------
  // Configuration
  // -----------------------------

  // Times in milliseconds
  pauseDuration: 2500,
  slideDuration: 300,
  debug: false,
  autoScroll: false,
  //this.itemsPerPage:3,

  // -----------------------------
  initialize: function(container, nextButton, prevButton, divHtPan, itemsPerPage) {
    this.debug = window.console && window.console.log && this.debug;
    this.viewport = $(container);
    this.slideElement = this.viewport.down(".sliderElement");
    this.slideElement.absolutize();
    this.sliderPanes = this.slideElement.select(".sliderPane");
    this.currentPane = 0;
    this.itemsPerPage = itemsPerPage;
    this.paneWidth = this.sliderPanes.first().getWidth();
    this.numPanes = this.sliderPanes.length;
    this.animating = false;
    this.viewport.setStyle({
      height: divHtPan + "px"
    });
    this.slideElement.setStyle({
      width: this.numPanes * this.paneWidth + "px"
    });

    if (this.debug) {
      console.log("height: " + this.viewport.style.height);
      console.log("width: " + this.slideElement.style.width);
    }
    // Here we duplicate the slideElement twice, once on the left
    // and once on the right, so that when we go past the end
    // it looks like we wrapped back to the beginning
    this.slideElementLeft = this.slideElement.cloneNode(true);
    this.slideElementLeft.setStyle({
      left: -1 * this.numPanes * this.paneWidth + "px"
    });
    this.slideElementRight = this.slideElement.cloneNode(true);
    this.slideElementRight.setStyle({
      left: this.numPanes * this.paneWidth + "px"
    });


    //For Accessibility purposes we're adding tabindex=-1 to each <a> contained
    //inside this div so that accessibile readers do not tab thorugh the carousel
    //more than once.
    this.slideElementLeft.getElementsBySelector('a').each(function(el) {
        $(el).writeAttribute("tabindex", -1);
    });
    this.slideElementRight.getElementsBySelector('a').each(function(el) {
        $(el).writeAttribute("tabindex", -1);
    });



    // Now we create a new slider container to move during the animation
    // that contains all three of the identical slide elements
    this.slidersContainer = Builder.node('div', { className: 'slidersContainer' }, [
      this.slideElement,
      this.slideElementLeft,
      this.slideElementRight
    ]);
    
    // Insert it into the viewport
    this.viewport.insert({ top: this.slidersContainer });

    // Start the automatic animation
    if (this.autoScroll) {
      this.autoAnimateInterval = setInterval(this.next.bind(this), this.pauseDuration);      
    }

    // Set up event listeners for the next and previous buttons
    this.nextButton = nextButton ? $(nextButton) : this.viewport.down(".nextButton");
    this.prevButton = prevButton ? $(prevButton) : this.viewport.down(".prevButton");
    this.nextButton.observe('click', this.clickNext.bindAsEventListener(this));
    this.prevButton.observe('click', this.clickPrev.bindAsEventListener(this));
    
    if (this.debug) {
      console.log("# Content Panes: " + this.numPanes);
      console.log("Pane width: " + this.paneWidth);
      console.log("Slider ready.");
    }
  },
  
  clickNext: function() {
    // Go to next panel and cancel auto animation
    if (this.autoAnimateInterval) {
      clearInterval(this.autoAnimateInterval);      
    }
    this.next();
  },
  
  clickPrev: function() {
    // Go to prev panel and cancel auto animation
    if (this.autoAnimateInterval) {
      clearInterval(this.autoAnimateInterval);      
    }
    this.prev();
  },
  
  next: function() {
    // We allow the animation to proceed one panel past the right
    // end of our actual content, since it's duplicated on the right
    if (this.animating) { return; }
    
    if (this.currentPane + this.itemsPerPage <= (this.numPanes + this.itemsPerPage)) {
      this.currentPane += this.itemsPerPage;
    }
    this.doAnimation();
    if (this.debug) { console.log("Current Pane: " + this.currentPane); }
  },
  
  prev: function() {
    // We allow the animation to proceed to one panel before the left
    // end of our actual content, since it's duplicated on the left
    if (this.animating) { return; }

    if (this.currentPane - this.itemsPerPage > -1 - this.numPanes) {
      this.currentPane -= this.itemsPerPage;
    }
    this.doAnimation();
    if (this.debug) { console.log("Current Pane: " + this.currentPane); }
  },
  
  handleAnimationFinish: function() {
    // If we've gone beyond the end of the original slider,
    // Snap the slider position back to the corresponding panel
    // within the original slider.

    if (this.debug) {
      console.log("afterFinish Callback");
    }

    if (this.currentPane >= (this.numPanes - (this.numPanes % this.itemsPerPage))) {
      // We're off the end to the right, reset to first pane.
      if (this.debug) { console.log("Off the end to the right... correcting overshoot."); }
      this.currentPane -= this.numPanes;
    }
    else if (this.currentPane < (0 - (this.numPanes % this.itemsPerPage))) {
      // We're off the end to the left, reset to the last pane.
      if (this.debug) { console.log("Off the end to the left... correcting overshoot."); }
      this.currentPane += this.numPanes;
    }

    this.slidersContainer.setStyle({
      left: this.currentPane * this.paneWidth * -1 + "px"
    });
    
    this.animating = false;
    
    if (this.debug) {
      console.log("Current Pane: " + this.currentPane);
    }
  },
  
  doAnimation: function() {
    // run the actual animation
    if (this.animationObject) {
      // stop any already playing animation before creating a new one
      this.animationObject.cancel();
    }
    this.animating = true;
    this.animationObject = new Effect.Move(
      this.slidersContainer,
      {
        x: this.paneWidth * this.currentPane * -1,
        mode: 'absolute',
        afterFinish: this.handleAnimationFinish.bind(this),
        duration: this.slideDuration / 1000
      }
    );
  }
});
