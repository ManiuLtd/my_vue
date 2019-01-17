
const express = require('express');
const app = express();
app.use(express.static("./yspage"));

/*start service*/
app.listen("3000","127.0.0.1");
/*自动打开网址*/
console.log("http://127.0.0.1:3000");
