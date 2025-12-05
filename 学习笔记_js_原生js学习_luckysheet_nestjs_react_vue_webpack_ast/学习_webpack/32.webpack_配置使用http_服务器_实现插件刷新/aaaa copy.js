//1.引入http模块
const http = require("http")
const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
  if (1) {
    res.write("刷新")
  } else {
    res.write("不刷新")
  }
  res.end()
})

app.listen(8000)
