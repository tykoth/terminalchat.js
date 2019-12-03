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


http.listen(8088, function(){
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
