
function registerHandler(socket, userName) {
    let username = userName.trim();

    if (!clients.has(socket) && isNotSameUserName(username)) {
        clients.set(socket, username); //add to map

        //send message to all users and send all username to all users, //arr[] ->json string
        let arr = [];

        clients.forEach((value, key) => {
            arr.push(value); //username
        })


        clients.forEach((value, socket) => {
            socket.emit('updateClients', `${username} is connected`);
            socket.emit('updateClients', arr);
        })

        socket.emit('registered', 'success');

    } else {
        socket.emit('registerFailed', `username already exist`);
    }

}

function isNotSameUserName(username) {
    for (let [key, value] of clients) {
        if (value === username) {
            return false;
        }
    }

    return true;
}

module.exports = registerHandler;