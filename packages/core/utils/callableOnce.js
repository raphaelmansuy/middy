const callableOnce = function (sourceFn) {
  let called = false
  let returnVal

  const newFn = function (...args) {
    if (called) {
      return returnVal
    }

    called = true
    returnVal = sourceFn.apply(this, args)

    return returnVal
  }

  newFn.__reset = function () {
    called = false
    returnVal = undefined
  }

  // rename newFn to the name of the passed function (useful for debug)
  const renamedFn = Object.defineProperty(newFn, 'name', { value: sourceFn.name, configurable: true })

  // attaches the original function in the __source object (useful for debug)
  renamedFn.__source = sourceFn

  return renamedFn
}

module.exports = callableOnce
