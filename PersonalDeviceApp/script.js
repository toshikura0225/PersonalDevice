
$(function () {

});


var socket;


// ①RKSに接続
function ConnectRks() {
	// サーバーに接続
	socket = io.connect();
	
	// メッセージ受信イベント（PVを受信）
	socket.on('response', function (data) {
		//var a = data[0];
		//var b = String.fromCharCode.apply("", new Uint8Array(data));
		var arr_data = new Uint8Array(data);
		//$('#idPV').text(b);
		$('#idReceived').prepend(arr_data + '<br/>');		// デバッグ用に書き出し
		
		var recvData = new OrionRecvData(arr_data);
	});

}



function debug1() {
	socket.emit('open-connection', $('#idPortName').val());
}

function debug2() {
	// 配列形式で送信する
	var url = [4, 48, 48, 90, 87, 5];
	
	socket.emit('path-through', url);
}

var my_interval;

function debug3() {
	
	my_interval = setInterval(function () {
		debug2();
	}, 1500);


}
function debug4() {
	clearInterval(my_interval);
}



// Orion通信プロトコルクラス

var OrionRecvData = function (originalDataArray) {
	
	var originalDataArray = originalDataArray;	// １文字ずつのデータ配列をグローバル変数に格納
	
	// データ配列からSTXを削除
	var indexOfSTX = originalDataArray.indexOf(2);		// データ配列中のSTXの位置を検索
	var tempArray = originalDataArray.splice(indexOfSTX, 1);	// STXを削除
	
	// データ配列からETXとBCCを削除
	var indexOfETX = tempArray.indexOf(3);	// データ配列中のETXの位置を検索
	tempArray = tempArray.splice(str, 2);			// ETXとBCCを削除
	
	// データ配列を文字列化
	var str = tempArray.toString();
	
	Debug.writeln(str);

}
