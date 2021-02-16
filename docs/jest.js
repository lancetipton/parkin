
(() => {

  const isFunc = item => typeof item === 'function'

  window.describe = (message, method) => {
    console.log(message)
    isFunc(method) && method()
  }

  window.test = (message, method) => {
    console.log(message)
    isFunc(method) && method()
  }

  window.it = window.test

})()