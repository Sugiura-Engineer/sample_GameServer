const socket =io();
import { drawGameCanvas } from "./gameCanvas.js";

let hasRequested = false;

document.getElementById('match-btn').addEventListener('click', ()=>{
  if(!hasRequested){//リクエストしてなければ.
    hasRequested = true;
    document.getElementById("match-btn").innerHTML = "キャンセルする";
    socket.emit('request_match');
    console.log('リクエスト送信');
  }else{//すでにしてれば.
    hasRequested = false;
    document.getElementById("match-btn").innerHTML = "マッチングスタート";
    socket.emit('match_cancel');
    console.log("リクエストキャンセル");
  }
});

//マッチ成功処理.
socket.on('match_success',(msg) =>{

  //ボタン消してマッチング成功！を出す.
  document.getElementById('match-btn').style.display = 'none';
  const text = document.getElementById('match-success-display');
  text.style.display = 'flex';

  // 2秒後に非表示にしてゲーム画面を表示
  setTimeout(() => {
    text.style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';

    drawGameCanvas();//ここで初めて描画(こうしないとdisplay:noneのまま描画してしまい、中身が空になる).

    // ゲームシークエンス突入
  }, 2000);
});