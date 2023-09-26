
function quitHandler(socket, message) { //close connection
    let username = clients.get(socket);
    clients.delete(socket);

    //send message to all users
    let arr = [];

    clients.forEach((value, key) => {
        arr.push(value); //username
    });

    clients.forEach((value, socket) => {
        socket.emit('updateClients', `${username} is disconnected`);
        socket.emit('updateClients', arr);
    })

}

module.exports = quitHandler;