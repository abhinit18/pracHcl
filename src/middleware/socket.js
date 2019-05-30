let ioSocket = '';
const socketConnectionOn = (app) => {
   app.listen(8080);
   var io = require('socket.io')(app);
   io.on('connection',function(socket){
      var users = [];
      socket.on('setUsername', function(data) {
         
         if(users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
         } else {
            users.push(data);
            socket.emit('userSet', {username: data});
         }
      });
      
      socket.on('msg', function(data) {
         //Send message to everyone
         io.sockets.emit('newmsg', data);
      })
 
      ioSocket = socket;
      // return ioSocket;
   })
}
const socketNotify = (actionType,result) => {
   console.log(result);

   if(actionType === 'newUser') {
      var usr = 'Congrats... New User Added and the name is: '+ result.name
      ioSocket.emit('newUserAdded',usr);
   }
}


module.exports = {socketConnectionOn,socketNotify}