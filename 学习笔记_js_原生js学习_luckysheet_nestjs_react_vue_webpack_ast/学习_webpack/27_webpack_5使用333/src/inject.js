// 常用库
// window.os = require('os')
// window.qs = require('qs');
window.axios = require('axios');
window.dayjs = require('dayjs');
window.jq = require('jquery');
window._ = require('lodash');


// zip压缩包
import { saveAs } from "file-saver";
var JSZip = require("jszip");
window.saveAs = saveAs;
window.JSZip = JSZip;