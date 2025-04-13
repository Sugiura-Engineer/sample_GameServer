const express = require("express");
const path = require("path"); // パスを安全に扱うためのモジュール// パス操作用の道具を取り出して.
const app = express();
const port = 3000;

// 静的ファイルを配信する設定（ここでは index.html など）.
// このフォルダの中のファイルを、ブラウザから見えるようにして.
app.use(express.static(__dirname));

//rootにアクセスしたらindex.htmlを返すようにする.
 // アクセスされたら パスをつないでindex.html を表示する
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

//こうやってlistenさせないと鯖はリクエストを受け付けてないことになる.
app.listen(port,() =>{
    console.log(`server activate at :${port}`);
});

// fetchで呼ばれるエンドポイント
app.get('/api/message', (req, res) => {
    res.send("Hello from fetch!");
});

//////ここからゲーム
let waitingPlayer = null;

app.post('/api/match', (req, res) => {
  if (!waitingPlayer) {
    // 誰も待ってなかったら待機に入る
    waitingPlayer = Date.now(); // いったん時間で識別
    res.json({ status: 'waiting' });
  } else {
    // 誰かが待ってたらマッチ成立！
    const opponent = waitingPlayer;
    waitingPlayer = null;
    res.json({ status: 'matched' });
  }
});