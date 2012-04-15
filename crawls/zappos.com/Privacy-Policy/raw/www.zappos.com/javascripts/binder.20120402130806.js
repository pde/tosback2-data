


var Binder = new Class({
    Implements: Events,
    initialize: function(scoping) {
        this.items = new Hash();
        this.bindings = new Hash();
        this.scoping = scoping || this;
    },
  
    set: function(item, value, noBind) {
        oldValue = this.items.get(item);
        this.callBinding(item, "set", value, oldValue);
        
        if (this.items.get(item) != value) {
            console.debug("Setting ", item, " to ", value);
            this.items.set(item, value);
            if (noBind != false)
                this.callBinding(item, "change", value, oldValue);
        }
    },
    
    get: function(item) {
        return this.items.get(item);
    },
    
    bind: function(item, action, fn) {
        console.debug("Binding `", item, "` with action `", action, "`: ", fn);
        this.scoping.addEvent(item + action, fn);
    },
    
    callBinding: function(item, action, value, oldValue) {
        this.scoping.fireEvent(item + action, [value, oldValue]);
    }
});
