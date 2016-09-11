
$(function () {

});


var socket;

function debug1() {
	// サーバーに接続
	socket = io.connect();
	// メッセージ受信イベント（PVを受信）
	socket.on('path-through', function (data) {
		
		var arr_data = new Uint8Array(data);
		$('#idReceived').prepend(arr_data + '<br/>');		// デバッグ用に書き出し
		
	});	
	
	socket.on('worst_stdout', function (data) {
		
		$('#idReceived').prepend(data + '<br/>');		// デバッグ用に書き出し
		
	});
}

function debug2() {
	// 配列形式で送信する
	var url = [4, 48, 48, 90, 87, 5];
	
	socket.emit('path-through', url);
}

function debug3() {
	
	socket.emit('worst_command', $('#abc').val());
}

function debug4() {
	
}

function debug5()
{
	
}

