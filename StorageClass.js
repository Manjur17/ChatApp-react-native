class StorageClass {
  constructor() {
    this.connectedClients = [];
    this.messages = {};
    this.lastMessages = {};
  }

  updateClients(data) {
    const clientsArray = data;
    this.connectedClients.length = 0;

    if (Array.isArray(clientsArray) && clientsArray.length > 0) {
      clientsArray.forEach(client => {
        this.connectedClients.push(client);
      });
    }
  }

  updateLastMessage(username, lastMessage, lastMessageTime) {
    this.lastMessages[username] = { lastMessage, lastMessageTime };
  }

  addMessage(chatId, message) {
    if (!this.messages[chatId]) {
      this.messages[chatId] = [];
    }
    this.messages[chatId].push(message);
  }

  getMessagesForUser(chatId) {
    return this.messages[chatId] || [];
  }

  // Method to get the last message and time for a user
  getLastMessage(username) {
    return this.lastMessages[username] || { lastMessage: 'No new Message', lastMessageTime: '' };
  }

  clearMessages() {
    this.messages = {};
  }

  clearLastMessage() {
    this.lastMessages = {};
  }

  clearMessagesByUser(username) {
    if (Object.keys(this.messages).length == 0) {
      return;
    }

    for (const chatId in this.messages) {
      if (chatId.includes(username)) {
        delete this.messages[chatId];
      }
    }
  }

  clearLastMessageByUser(username) {
    if (Object.keys(this.lastMessages).length == 0) {
      return;
    }

    for (const chatId in this.lastMessages) {
      if (chatId.includes(username)) {
        delete this.lastMessages[chatId];
      }
    }
  }

  getClients() {
    return this.connectedClients || [];
  }

  hasMessage(chatId, query) {
    for (const chat_id in this.messages) {
      if (chat_id.includes(chatId)) {
        const messageArray = this.messages[chat_id];
        // console.log('messageArray: ', messageArray);

        // messageArray.forEach((msg) => {
        //   if (msg.message.includes(query)) {
        //     return true;
        //   }
        // })

        for (const msg of messageArray) {
          const msg_D = msg.message;
          // console.log('message: ', msg_D);

          if (msg_D.includes(query)) {
            return true;
          }

        }
      }
    }

    return false;
  }

  // searchMessages(chaId, query) {
  //   const matchingMessages = [];

  //   for (const chatId in this.messages) {
  //     const messages = this.messages[chatId];
  //     const chatMessages = messages.filter((message) => message.message.includes(query));

  //     if (chatMessages.length > 0) {
  //       matchingMessages.push({
  //         chatId,
  //         messages: chatMessages,
  //       });
  //     }
  //   }

  //   return matchingMessages;
  // }
}

module.exports = StorageClass;
