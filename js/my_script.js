
var socket;
$(function() {
	socket = io.connect();
	socket.on('msg', function(data) {
		received('msg', data);
	});
});


function send(url)
{
	socket.emit('msg', url);
	/*
	$.ajax({
		type: 'POST',
		url: msg,

		success: function(data, textStatus){
		  // 成功したとき
		  // data にサーバーから返された html が入る
		  //alert(data);
		},
		error: function(xhr, textStatus, errorThrown){
		  // エラー処理
		  alert("error");
		}
	});
	*/
}