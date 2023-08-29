chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data)
    document.querySelector('#chat-log').value += `${JSON.stringify(data)}\n`;
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.keyCode === 13) {
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function (e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        type: 'send_chat',
        request: {
            // target: '바다에서10년생존한사람'
            // target: '산에서20년생존한사람'
            chat_room: "{{ room_name }}",
            // chat_room: '4b3b5734b4400b39'
        },
        content: message
    }));
    messageInputDom.value = '';
};