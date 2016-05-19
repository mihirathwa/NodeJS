// simple socket server
var net = require('net');
var clients = {};

var EventEmitter = require('events').EventEmitter;
var evnt = new EventEmitter();

//Custom Event Listener for 'Lumberjack'
evnt.on('lumberjack', function(){
	console.log("I saw a lumberjack!");
});

net.createServer(
	function (sock) {
		console.log("Incoming connection accepted");
		sock.on('data', function (d) {
			
			var str = d.toString();
			var args = str.split(" ");
			var res = 0;
				
			if (args[0] == "undefined" || args[1] == "undefined" || !(isNaN(parseInt(args[1])))){
				sock.write("Invalid request specification");
				console.log("Result: Invalid request specification");
			}
			else{
				var clientid = args[0];
				
				if (clientid == "ASU"){
					setTimeout(function(){
						Operations(args[0], args[1], args[2]);
						}, 30000);
					}
				else if (clientid == "UA"){
					process.nextTick(function(){
						Operations(args[0], args[1], args[2]);
						});
					}
				else if (clientid == "NAU"){
					Operations(args[0], args[1], args[2]);
					evnt.emit('lumberjack');
					}
				else{
					Operations(args[0], args[1], args[2]);
					}
					
				//Function to perform commands
				function Operations (clnt, cmd, vlu){
					if (cmd == "q"){
						for (var i in clients){
							console.log("Client: " + i + " Total: " + clients[i]);
							}
					sock.write("Server Closed");
					process.exit();
					}
					if(isNaN(parseInt(vlu, 10)) || val == "undefined"){
						sock.write("Invalid request specification");
						console.log("Result: Invalid request specification");
						}
					else{
						var val = parseInt(vlu, 10);
						
						switch (cmd){
							case "a":
								var c_total = parseInt(clients[clnt], 10);
							
								if (isNaN(c_total)){
									c_total = 0;
								}
							
								clients[clnt] = c_total + val;
								
								sock.write(clients[clnt].toString());
								
							break;
							
							case "m":
								var c_total = parseInt(clients[clnt], 10);
			
								if (isNaN(c_total)){
									c_total = 0;
								}

								clients[clnt] = c_total - val;
								
								sock.write(clients[clnt].toString());
								
							break;
								
							case "s":
								clients[clnt] = val;
								
								sock.write(clients[clnt].toString());
								
							break;
								
							default:
				
								sock.write("Invalid request specification");
								console.log("Result: Invalid request specification");
								
							break;
							}
						}	
					}
					
				}			
		}).on('error', function (e) {
			sock.write("Error connecting to server");
			console.log("Some kind of server error");
			});
	}).listen(3000);
