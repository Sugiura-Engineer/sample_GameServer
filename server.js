const express = require("express");
const path = require("path"); // パスを安全に扱うためのモジュール// パス操作用の道具を取り出して.
const http = require("http");
const setupSocket = require("./socket-handler");// socket.io処理用ファイルの読み込み

const app = express();
const port = 3000;
const server = http.createServer(app);

// 静的ファイル配信
app.use(express.static(path.join(__dirname,'public')));

//rootにアクセスしたらindex.htmlを返すようにする.
 // アクセスされたら パスをつないでindex.html を表示する.
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

//こうやってlistenさせないと鯖はリクエストを受け付けてないことになる.
// listenより前でも後でもOK
server.listen(port, () => {
    console.log(`server activate at :${port}`);
});
// socket.ioの設定を外部ファイルに任せる
setupSocket(server);