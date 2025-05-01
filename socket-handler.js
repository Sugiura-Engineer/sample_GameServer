const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server);
    let waitingPlayer = null;

    io.on('connection', (socket) => {
        console.log('ユーザーが接続しました:', socket.id);

        socket.on('request_match', () => {
            if (waitingPlayer) {
                const player1 = waitingPlayer;
                const player2 = socket;

                player1.emit('match_success','マッチング成功！');
                player2.emit('match_success','マッチング成功！');

                // ここでゲーム開始処理を実装できます
                waitingPlayer = null; // 待機中プレイヤーをリセット
            } else {
                waitingPlayer = socket; // 現在のプレイヤーを待機状態にする
                console.log('プレイヤーがマッチング待機中:', socket.id);
            }
        });

        socket.on('disconnect', () => {
            if (waitingPlayer === socket) {
                waitingPlayer = null;
                console.log('待機中プレイヤーが切断しました:', socket.id);
            } else {
                console.log('ユーザーが切断しました:', socket.id);
            }
        });

        socket.on('match_cancel', () =>{
            if(waitingPlayer === socket) {
                waitingPlayer = null;
                console.log('マッチングリクエストをキャンセルしました',socket.id);
            }
        });
        
    });
};
