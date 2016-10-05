/**
 * Todos os requires (Express, HTTP, Socket.IO)
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var spawn = require('child_process').spawn;
//var cmd = spawn('cmd');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/tty.html');
});

		
io.on('connection', function(socket){
	
	// Tentativa de comandos no terminal / cmd.
	socket.on('chat message', function(msg){
		//cmd.stdin.write(msg+"\n");
		io.emit('chat message', msg);
	});
  
	//cmd.stdout.on('data', function(data){
	//	io.emit('chat message', data);
	//});   
});


http.listen(80, function(){
  console.log('listening on *:3000');
  // tentando abrir movo kiosk
  //"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --chrome --kiosk http://127.0.0.1:3000 --incognito --disable-pinch --overscroll-history-navigation=0
  //var chrome = spawn('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', [
	//'--profile-directory=Default', 
	//'--app-id=kcpnkoekefdeknbkepdmbefkakdnnolk', 
	//'http://localhost.com:3000'
  //]);  
});


// Hello darkness my old friend.
var http2 = require('http');

http2.createServer(function(request, response) {
  var proxy = http2.createClient(80, request.headers['host'])
  var proxy_request = proxy.request(request.method, request.url, request.headers);
  proxy_request.addListener('response', function (proxy_response) {
    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });
  request.addListener('data', function(chunk) {
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
}).listen(3303);
