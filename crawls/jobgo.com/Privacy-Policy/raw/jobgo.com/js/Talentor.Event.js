if (!Talentor) {
    var Talentor = {};
}

(function($) {

/**
 * Generic event class for creating component events.
 * @param string name Event name.
 */
Talentor.Event =  Event = function (name) {
    this.name = name;
    this.bound = [];
    this.frozen = false;
}

$.extend(Event.prototype, {
    /**
     * Add an event handler for this event
     * @param function f Event handler callback
     * @param object scope The scope where the handler is executed. Defaults to the event scope (Not very useful).
     */
    bind:function(f, scope) {
        if (!scope) {
            scope = this;
        }
        this.bound.push([f, scope]);
    },
    /**
     * Rise the event == Notify all listeners
     * @param array args
     */
    trigger:function(args) {
        // Don't fire frozen events.
        if (this.isFrozen()) {
            return;
        }
        if (undefined == args) {
            args = [];
        }
        // Execute each handler.
        for (var k in this.bound) {
            try {
                this.bound[k][0].apply(this.bound[k][1], args);
            } catch(e) {
                //void
            }
        }

    },
    unbind: function(f) {
        for (var i = 0; i < this.bound.length; i++) {
            if (this.bound[i][0]==f) {
                this.bound.splice(i, 1);
            }
        }
    },
    isFrozen: function() {
        return this.frozen;
    },
    /**
     * Ability to freeze this event(wont fire).
     */
    freeze: function() {
        this.frozen = true;
        return this;
    },
    /**
     * Unfreeze this event(will fire again).
     */
    unFreeze: function() {
        this.frozen = false;
        return this;
    }
});

})($);