console.log('222222222222222>self:', self)
// console.log('333>window:', window)  //不能使用window
debugger

// let html=document.querySelector('html')
// console.log('444>html:',html )

self.addEventListener("message", function (e) {
    self.postMessage(e.data + "1")

    console.log('3333333333>e:', e)


    debugger
}, false)