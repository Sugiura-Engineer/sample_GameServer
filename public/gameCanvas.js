export function drawGameCanvas(){
    //htmlIDを取得.
    const canvas = document.getElementById("game-screen");
    const ctx = canvas.getContext("2d"); //2D描画モードを使用.

    //canvasに実際に使用されているpxを取得、canvasのピクセルにそれを当てはめる(こうしないと中身のpxが初期設定の幅300px,縦150pxになってしまう).
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    console.log("表示サイズ:", rect.width, rect.height);
    console.log("canvas解像度:", canvas.width, canvas.height);

    //外枠を制作.
    ctx.strokeStyle = "black";//線の意図を黒に.
    ctx.lineWidth = canvas.height/100;//線の太さ.
    ctx.beginPath();          //新しい線の描画を開始.
    ctx.moveTo(0,0);          //線の始点(左上、ペンをここに置く).
    ctx.lineTo(canvas.width,0);//線の終点(右上、ペンをここまで動かす).
    ctx.stroke();             //線の描画を実行.

    ctx.beginPath();
    ctx.moveTo(0,canvas.height)
    ctx.lineTo(canvas.width,canvas.height)
    ctx.stroke();             //これは毎回いる.

    ctx.lineWidth = canvas.height/200;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.stroke();

    //マレットを制作.
    ctx.strokeStyle = "red";
    ctx.lineWidth = canvas.width/50;
    ctx.beginPath();
    ctx.moveTo(canvas.width/15,canvas.height/2-canvas.height/10);
    ctx.lineTo(canvas.width/15,canvas.height/2+canvas.height/10);
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.lineWidth = canvas.width/50;
    ctx.beginPath();
    ctx.moveTo(canvas.width*14/15,canvas.height/2-canvas.height/10);
    ctx.lineTo(canvas.width*14/15,canvas.height/2+canvas.height/10);
    ctx.stroke();
}