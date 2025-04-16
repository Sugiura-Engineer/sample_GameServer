const socket =io();

document.getElementById('match-btn').addEventListener('click', ()=>{
  socket.emit('request_match');//マッチリクエスト送信
  console.log('リクエスト送信');
});

socket.on('match_success',(msg) =>{
  alert(msg);//マッチ成功のメッセ受け取り.
})