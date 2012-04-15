
function Events() {
  return this
}

Events._listeners = []

Events.addListener = function(event, listener) {
  if (!Events._listeners[event])
    Events._listeners[event] = []
  Events._listeners[event].push(listener)
}

Events.removeListener = function(event, listener) {
  if (!Events._listeners[event]) return
  for (var i in Events._listeners[event]) {
    if (Events._listeners[event][i] != listener) continue

    Events._listeners[event].splice(i, 1)
    break
  }
}

Events.fireEvent = function(event) {
  if (!Events._listeners[event]) return
  
  for (var i in Events._listeners[event]) {
    Events._listeners[event][i]()
  }
}