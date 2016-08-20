var http = require('http');
var fs = require('fs');
var url = require('url');


// ■■■■■■■■　Node.js　■■■■■■■■■
var http_src = fs.readFileSync('./index.html');		// HTMLファイルのソースを同期処理で読み出す
var js_src = fs.readFileSync('./script.js');

// HTTPサーバーを作成
var app = http.createServer(function (req, res) {
	
	// リクエストされたURLを取得
	var url_parts = url.parse(req.url);
	console.log(url_parts.pathname);
	
	// ルートまたはindex.htmlの場合
	if (url_parts.pathname == '/' || url_parts.pathname == '/index.html') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(http_src);
		res.end();
	}

	else if (url_parts.pathname == '/script.js') {
		res.writeHead(200, { 'Content-Type': 'text/javascript' });
		res.write(js_src);
		res.end();
	}
	
	else if (url_parts.pathname == '/cam1.jpg') {
		var img_src = fs.readFileSync('./cam1.jpg');
		res.writeHead(200, { 'Content-Type': 'image' });
		res.write(img_src);
		res.end();
	}
	
	// その他のファイルは404コードを返答する
	else {
		res.writeHead(404);
		res.write(url_parts.pathname + "not found.");	// 脆弱性
		res.end();
	}

}).listen(process.env.PORT || 3000);	// サーバー内環境のポートまたは3000番で待受


// ■■■■■■■■　socket.io（サーバー側）　■■■■■■■■■
var io = require('socket.io').listen(app);
io.sockets.on('connection', function (socket) {
	
	// なぜか.htmlにアクセス時に'connection'イベントが発生する（原因不明）
	console.log("socket.io connected.");
	
	/*
	socket.on('message', function(data) {		// messageイベント：すべてのメッセージを受信時
    //io.sockets.emit('msg', data);
		socket.broadcast.emit('msg', data);
		console.log("to server msg" + data);
	});
	*/
	
	/*
	// コマンドライン操作（セキュリティ最低...）
	const exec = require('child_process').exec;
	
	socket.on('worst_command', (data) => {
		console.log("worst_command received! =>" + data);
		exec(data,
		//{cwd: 'C:\\Users\\Toshihiro\\Desktop\\PersonalDevice\\PersonalDeviceApp'},
		(error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		});

	});
	*/
});

// ■■■■■■■■　socket.io-client（クライアント側）　■■■■■■■■■
var client = require('socket.io-client');
const exec = require('child_process').exec;
var cli_socket = client.connect('http://kuramata.herokuapp.com/');
cli_socket.on('connect', function (socket) {
	console.log("socket.io-client received connect event");
	cli_socket.on('path-through', function (data) {
		console.log('to client' + data);
		//exec(data,
		//exec("131106_ConnectionSupporter.exe",
		exec("ifconfig",
		//{cwd: 'C:\\Users\\Toshihiro\\Desktop\\PersonalDevice\\PersonalDeviceApp'},
		function(error, stdout, stderr) {
			if (error) {
				console.error('exec error:' + error);
				return;
			}
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
		});

	});
});
			


console.log('Server running!');