
// https://gitee.com/hokhyk/ajax_fetch_interceptor/blob/master/dist/fetchhook.min.js#
ah.proxy({
  //请求发起前进入
  onRequest: (config, handler) => {
    console.error("ah.proxy", config.url)
    handler.next(config);
  },
  //请求成功后进入
  onResponse: (response, handler) => {
    console.error("ah.proxy  ", response.response)
    handler.next(response)
  },
  //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
  onError: (err, handler) => {
    console.log(err.type)
    handler.next(err)
  }
})