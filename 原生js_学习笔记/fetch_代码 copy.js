
fh.hookFetch({
  requestInterceptors: {
    // input is usually url, init is of Request entity.
    itc1: function (input, init) {

      // ....do something
      console.log('itc1=>input:', input)
      console.log('itc1=>init:', init)
      return init
    },
    itc2: function (input, init) {

      // ....do something
      return init
    },
  },
  responseInterceptors: {
    // input is usually url, interceptorRes is of Response body.
    itc3: function (input, interceptorRes) {

      // ....do something
      return interceptorRes
    },
    itc4: function (input, interceptorRes) {

      // ....do something
      console.log('itc4=>input:', input)
      console.log('itc4=>interceptorRes:', interceptorRes)
      return interceptorRes
    },
  }
})








function itc4(params) {
  console.log('params=>itc4:', params)
}