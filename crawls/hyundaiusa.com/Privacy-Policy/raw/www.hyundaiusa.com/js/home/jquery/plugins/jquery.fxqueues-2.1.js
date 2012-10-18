/*
 * jQuery FxQueues 2.1
 * Copyright 2009, 2010 Luciano German Panaro <contact@decodeuri.com>
 * Released under the MIT and GPL licenses.
 */

(function($){
  var fxQueue = function(queueName) {
    return {
      name: queueName,

      isFxQueue: true,

      paused: false,

      playing: null,

      shouldStart: function() {
          return (this.playing == null || !this.paused);
      },

      pause: function() {
          if (!this.playing) { return false; }
          ((this.playing.isScope)? this.playing: this.playing.elem).stop();
          this.paused = true;
          return true;
      },

      stop: function() {
          if (!this.playing) { return false; }
          ((this.playing.isScope)? this.playing: this.playing.elem).stop();
          this.playing = null;
          this.paused = false;
          this.length = 0;
          return true;
      },

      start: function() {
          // if a dequeued fn was paused
          if (this.playing && this.paused) {
              this.playing();
              this.paused = false;
              return true;
          // or if the queue has not started
          } else if (this.length && !this.playing) {
              this.playing = this[0];
              $(document).dequeue(this.name);
              return true;
          }
          return false;
      },

      getScope: function( scopeName ) {
          if (this.playing && this.playing.isScope && this.playing.called == scopeName) {
              return this.playing;
          }

          for (var i = 0; i < this.length; i++) {
              if (this[i].isScope && this[i].called == scopeName) {
                  return this[i];
              }
          }
          return false;
      },

      dequeue: function( caller ) {
          // Do nothing if queue is not playing anything
          if (!this.playing) {
            return false;
          }

          if (this.playing.isScope) {

              var queueItems = this.playing.items;
              // Find the actual element in scope's items
              for ( var i=0; i < queueItems.length; i++) {
                  if ( caller == queueItems[i].elem[0] && !queueItems[i].finished ) {
                      queueItems[i].finished = true;
                      this.playing.finishedItems++;
                  }
              }

              // Do not dequeue if scope is not finished
              if (this.playing.finishedItems < queueItems.length) {
                  return false;
              }

          // Dequeue just once for every selection
          } else if (this.playing.elem && this.playing.elem[0] != caller) {
              return false;
          }

          var queue = this;

          setTimeout(function() {
              queue.playing = queue[0];
              $(document).dequeue(queue.name);
          }, this.playing.postDelay);

          return true;
      }

    };

  };

  var fxScope = function ( scopeName ) {
      var newScope = function() {
          for (var i=0; i < newScope.items.length; i++) {
              newScope.items[i]();
          }
      };
      newScope.called = scopeName;
      newScope.isScope = true;
      newScope.finishedItems = 0;
      newScope.stop = function() {
          for (var i=0; i < newScope.items.length; i++) {
              newScope.items[i].elem.stop();
          }
      };
      newScope.items = [];
      return newScope;
  };

  // We need to overload the default animate method
  var _animate = $.fn.animate;

  $.fn.animate = function( props, speed, easing, callback ) {
      if (!this.length) {
          return this;
      }

      var options = (typeof speed == "object")? speed: $.speed(speed, easing, callback);

      // Load in the default options
      var opts = $.extend({
          queue: "fx",
          position: "end",
          limit: -1,
          preDelay: 0,
          postDelay: 0,
          complete: null
      }, options );

      // Let normal animations just pass through
      if ( !opts.queue || opts.queue == "fx" ) {
          return _animate.apply( this, arguments );
      }

      // Get the name of the queue
      var queueName = opts.queue;

      // Get the effect queue (A global queue is centered on 'document')
      var queue = $(document).queue( opts.queue );

      // Queue initialization
      if ( queue.length == 0 && !queue.isFxQueue ) {
          $(document).queue( queueName, [] ); //initialize queue
          queue = $(document).queue( queueName ); //get the new queue
          $.extend(queue, fxQueue(queueName)); //extend with fxQueue
      }

      // We're overriding the default queueing behavior
      opts.queue = false;

      // The animation to queue
      var fn = function() {
          opts.complete = function() {
              queue.dequeue(this);
              if ( $.isFunction(fn.users_complete) ) {
                  return fn.users_complete.apply(this, arguments);
              }
          };
          setTimeout(function() {
              fn.elem.animate( props, opts );
          }, fn.preDelay);
      };
      fn.elem = this;
      fn.preDelay = opts.preDelay || 0;
      fn.postDelay = opts.postDelay || 0;
      fn.users_complete = speed.complete || callback; //Do not use the one generated by $.speed

      // If scope exists, just add the animation and return
      var scope = queue.getScope( opts.scope );
      if ( scope ) {
          scope.items.push( fn );
          // Start the animation if the scope is already being played
          if (queue.playing == scope) {
              fn();
          }
          return this;
      }

      // Restrict the animation to a specifically sized queue
      if ( opts.limit < 0 || queue.length < opts.limit) {

          var add = null; //What we are going to add into the queue
          if ( opts.scope ) {
              add = fxScope( opts.scope );
              add.items.push(fn);
          } else {
              add = fn;
          }

          if ( opts.position == "end" ) {
            queue.push( add );
          } else if ( opts.position == "front" ) {
            queue.splice( 1, 0, add );
          }

          if ( queue.shouldStart() ) {
            queue.start();
          }

          return this;
      }
  };

  // A simple global fx queue getter
  $.extend({
      fxqueue: function(queueName) {
          return $(document).queue( queueName );
      }
  });

  $.fxqueue.version = "2.1";
})(jQuery);
