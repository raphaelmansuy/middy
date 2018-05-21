const callableOnce = require('../callableOnce')

test('It should make a function callable only once until resetted', () => {
  let callCount = 0

  const increment = () => {
    return ++callCount
  }

  const newIncrement = callableOnce(increment)

  // checks if function was wrapped correctly
  expect(newIncrement.__source).toBe(increment)
  expect(newIncrement.name).toBe('increment')

  // invoke the function two times
  const retVal1 = newIncrement()
  const retVal2 = newIncrement()

  // function will be executed only once and the succesive times it just returns the
  // first value returned
  expect(retVal1).toBe(1)
  expect(retVal2).toBe(1)
  expect(callCount).toBe(1)

  // resetting the function will make it callable again for another time
  newIncrement.__reset()
  const retVal3 = newIncrement()
  expect(retVal3).toBe(2)
  expect(callCount).toBe(2)
})
