// function(store) { return function(next) { return function(action){}}}
// done via currying so that can call the outer function once
// and store in var, saving which store to use

// next is a callback like express
// if next not called, action not sent to reducer/store

// passing in socket is specific to use in this app
export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }

  return next(action);
}
