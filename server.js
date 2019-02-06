
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var temp ={
    name : '',
    x : 0,
    y : 0,
    result: 0
}
var i = 0
net.createServer(function(sock) {
   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
   sock.on('data', function(data) {
       console.log('DATA ' + sock.remoteAddress + ': ' + data);
        if(i==0){
        temp.name = data
        sock.write('GET_X');
       }
       else if(i==1){
        temp.x = data
        sock.write('GET_Y');
            
       }else if(i==2){
        temp.y =data
        temp.result = +temp.x * +temp.y
        sock.write('AREA : ' + temp.result);
       }
       i++

       

   });

   sock.on('close', function(data) {
       console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
   });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
