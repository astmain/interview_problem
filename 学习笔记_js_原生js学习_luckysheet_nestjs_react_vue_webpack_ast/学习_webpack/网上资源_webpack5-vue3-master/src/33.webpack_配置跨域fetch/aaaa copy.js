var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa%E8%B7%91%E6%AD%A5%E9%9E%8B%20%E8%B7%91%E6%AD%A5%E9%9E%8B%20%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E7%94%B7%E7%BD%91%E9%9D%A2%E9%80%8F%E6%B0%94',
  headers: {
    // 'Connection': 'keep-alive', 
    // 'Pragma': 'no-cache', 
    // 'Cache-Control': 'no-cache', 
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36', 
    // 'DNT': '1', 
    // 'Content-type': 'application/json;charset=utf-8', 
    // 'Accept': '*/*', 
    // 'Accept-Language': 'zh-CN,zh;q=0.9', 
    // 'Cookie': 'wp-settings-1=mfold%3Do%26amp%3BampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampamplibraryContent%3Dbrowse%26amp%3Bampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampamphidetb%3D0%26amp%3Bampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampeditor%3Dtinymce%26amp%3Bampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampeditor_expand%3Don%26amp%3Bampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampamppost_dfw%3Doff%26amp%3Bampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampeditor%3Dtinymce%26amp%3BampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampamplibraryContent%3Dbrowse%26amp%3BampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampampamplibraryContent%3Dbrowse%26amp%3Bampampampampampampampampampampampampampampampampampampampampampampampampampampampampposts_list_mode%3Dlist%26amp%3Bampampampampampampampampampampampampampampampampeditor%3Dtinymce%26amp%3Bampampampampampeditor%3Dtinymce%26amp%3Bampampampampeditor%3Dtinymce%26amp%3Bampampampamppost_dfw%3Don%26amp%3Bampampposts_list_mode%3Dexcerpt%26amp%3Bampposts_list_mode%3Dlist; wp-settings-time-1=1650133062'
  }
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });



axios({
  method: 'get',
  url: 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa%E8%B7%91%E6%AD%A5%E9%9E%8B%20%E8%B7%91%E6%AD%A5%E9%9E%8B%20%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E7%94%B7%E7%BD%91%E9%9D%A2%E9%80%8F%E6%B0%94',
}).then(function (response) {
  console.log(JSON.stringify(response.data));
})
  .catch(function (error) {
    console.log(error);
  });