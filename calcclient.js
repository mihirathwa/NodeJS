// simplesockclient to go with simplesockserver.js
var sock = require('net').Socket();
sock.on('data', function(data) {
	console.log('Response: ' + data);
	sock.end();
	sock.destroy(); // kill client after server's response
});
sock.on('close', function() {
	console.log('Connection closed');
});
// now make a request
var conn = sock.connect(3000);
conn.on('error', function () {
	console.log("Server Error!");
});

sock.write(process.argv[2]+" "+process.argv[3]+" "+process.argv[4]);