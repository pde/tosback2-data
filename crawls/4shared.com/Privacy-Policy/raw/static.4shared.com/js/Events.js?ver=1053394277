
function Events() {
  return this
}

Events._listeners = []

Events.addListener = function(event, listener) {
  if (!Events._listeners[event])
    Events._listeners[event] = []
  Events._listeners[event].push(listener)
}

Events.addListenerWithPriority = function(event, listener, priority){
  if (!Events._listeners[event])
    Events._listeners[event] = []
  for(var i in Events._listeners[event]){
    var lcCurPrior = Events._listeners[event].priority ?  Events._listeners[event].priority : 0;
    if(lcCurPrior<=priority){
      listener.priority = priority;
      Events._listeners[event].splice(i,0,listener);
      return;
    }
  }
}

Events.removeListener = function(event, listener) {
  if (!Events._listeners[event]) return
  if (!listener) delete Events._listeners[event]
  for (var i in Events._listeners[event]) {
    if (Events._listeners[event][i] != listener) continue

    Events._listeners[event].splice(i, 1)
    break
  }
}

Events.fireEvent = function(event, value) {
  if (!Events._listeners[event]) return
  
  for (var i in Events._listeners[event]) {
    Events._listeners[event][i](value)
  }
}