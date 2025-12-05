console.log('111111111>index:', 333)
var myWorker = new Worker('./worker.js');
console.log('111111111>222:', myWorker)


myWorker.postMessage("我是index")
debugger  //


myWorker.onmessage=function(event){
    console.log('111111111>222:', 333)

    window.zzz=event.data
    debugger
}


