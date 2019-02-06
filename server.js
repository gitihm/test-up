
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var BMI ={
    name : '',
    weight : 0,
    height : 0,
    resultBMI: 0,
    status:''
}
var i = 0
net.createServer(function(sock) {
   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
   sock.on('data', function(data) {
       console.log('DATA ' + sock.remoteAddress + ': ' + data);
       if(i==0){
        BMI.name = data
        sock.write('OK');
       }
       else if(i==1){
        BMI.weight = data
        sock.write('weight : '+BMI.weight);
            
       }else if(i==2){
        BMI.height = data
        sock.write('height : '+BMI.height);
       }
       if(data == 'GET') {
        BMI.resultBMI = (BMI.weight /Math.pow( (BMI.height) /100,2)).toFixed(1)
        if(BMI.resultBMI < 18.5) BMI.status='Underweight'
        else if (18.5< BMI.resultBMI < 24.9) BMI.status='Normal weight'
        else if(24.9< BMI.resultBMI < 29.9) BMI.status='Overweight'
        else BMI.status='Obesity'
        sock.write(BMI.name+" : BMI => "+BMI.status);
       }

       i++

       

   });

   sock.on('close', function(data) {
       console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
   });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
