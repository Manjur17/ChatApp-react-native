const io = require('socket.io-client');

class SocketCommunicator {

    constructor(networkListener) {
        this.networkListener = networkListener;
        this.socket = io('http://192.168.174.115:3000');
        this.connectToServer();
    }

    connectToServer() {
        // connect to the server

        this.socket.on('connect', () => {
            console.log('Connected to the server and running !!!');

        });

        // console.log(this.networkListener);
        this.socket.onAny((event, data) => {

            // console.log(event, data);
            
            if (event === 'chatting') {
            
                let message = JSON.parse(data);
                // console.log(data, 'before handle incoming events');
                this.handleIncomingEvent(event, message);
            } else {
                this.handleIncomingEvent(event, data);
            }
        });
    }

    sendMessage(event, data) {
        // console.log(event, data);

        this.socket.emit(event, data);
    }

    handleIncomingEvent(event, data) {
        // console.log(event, data);

        this.networkListener.handleEvents(event, data);
    }

    close() {
        this.socket.destroy();
        this.socket = null;
        console.log('Connection closed successfully');
    }
}

module.exports = SocketCommunicator;