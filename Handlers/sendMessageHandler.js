
function sendMessageHandler(socket, data) {
    let messageData = JSON.parse(data);
    let sender = messageData.sender;
    let receiver = messageData.receiver;
    let msgData = messageData.message;

    if (isReceiverConnected(receiver)) {
        //takeout socket object of receiver and send msg along with sender
        let receiverSocket = null;

        for (var [key, value] of clients) {
            if (value === receiver) {
                receiverSocket = key;
                break;
            }
        }

        // receiverSocket.emit('chatting',`>> ${sender} : ${msgData}`);
        let messageData = JSON.stringify({
            sender: sender,
            receiver: receiver,
            message: msgData,
            timestamp: new Date().toLocaleTimeString()
        });


        receiverSocket.emit('chatting', messageData);


    } else {
        socket.write('chatting', `user not connected`);
    }
}

function isReceiverConnected(username) {
    for (var [key, value] of clients) {
        if (value === username) {
            return true;
        }
    }

    return false;
}

module.exports = sendMessageHandler;