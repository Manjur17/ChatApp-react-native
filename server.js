const server = require('http').createServer();

const io = require('socket.io')(server);

global.clients = new Map(); // global hashmap store all clients

const handlers = new Map(); // hashmap to store all actions and functions

const fs = require('fs');
const path = require('path');

const fullPath = path.join(__dirname, 'Handlers'); //current directory
//console.log(fullPath); //server/Hanlders
const files = fs.readdirSync(fullPath); //array of files

//dynamically adding handlers to map 
try {
    files.forEach((file) => {
        //console.log(file)
        let fileNameWithoutExtension = file.substring(0, file.length - 3);
        //console.log(fileNameWithoutExtension);

        let handler = require('./Handlers/' + fileNameWithoutExtension);

        let actionName = file.substring(0, file.length - 10);

        //console.log(actionName);
        handlers.set(actionName, handler); //[quit, quitHandler]
    }
    )
}
catch (error) { console.log(error) }



io.on('connection', (socket) => {
    console.log('a client is connected !!!');

    socket.onAny((event, data) => {

        console.log(event);

        if (handlers.has(event)) {
            handlers.get(event)(socket, data); //call the function
        } else {
            socket.emit('error', 'Wrong action !!! Cannot be performed');
        }
    });

});


server.listen(3000, () => {
    console.log(`Server is listening :)`);
});
