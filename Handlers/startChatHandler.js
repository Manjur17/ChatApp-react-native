
function startChatHandler(socket, message) {
    let sender = clients.get(socket);
    let receiver = '';
    let receiverSocket = null;
    let msg = '';

    if (message.startsWith('wants to chat')) {
        receiver = message.substring(14);
        msg = `wants to chat ${sender}`

    } else if (message.startsWith('lets chat')) {
        receiver = message.substring(10);
        msg = `lets chat ${receiver}`;
    } else if (message.startsWith('okay')) {
        receiver = message.substring(5);
        msg = 'okay';
    }

    for (var [key, value] of clients) {
        if (value === receiver) {
            receiverSocket = key;
            break;
        }
    }


    if (receiverSocket) {
        receiverSocket.emit('newChat', msg);
    }

}



module.exports = startChatHandler;