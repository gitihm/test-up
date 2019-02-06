
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var i = 0
var client = new net.Socket();
client.connect(PORT, HOST, function() {
   console.log('CONNECTED TO: ' + HOST + ':' + PORT);
   client.write('5935512030');
});

client.on('data', function(data) {
   console.log('DATA: ' + data);
   if(i==0){
    client.write('5');
   }else if(i==1){
    client.write('8');
   }
   else{
       client.destroy()
   }
   i++
   
   
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
   console.log('Connection closed');
});
