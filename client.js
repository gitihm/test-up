
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var i = 0
var client = new net.Socket();
client.connect(PORT, HOST, function() {
   console.log('CONNECTED TO: ' + HOST + ':' + PORT);
   client.write('ISMAEL HAMA');
});

client.on('data', function(data) {
   console.log('DATA: ' + data);
   if(i==0){
    client.write('62');
   }else if(i==1){
    client.write('175');
   }
   else if(i==2){
    client.write('GET');
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
