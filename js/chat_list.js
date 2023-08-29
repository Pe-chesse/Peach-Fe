// const chatSocket = new WebSocket(`ws://3.37.239.49:8000/ws/v1/chat/`);

document.querySelector('.chat-list-index').onclick = function (e) {
    chatSocket.send(JSON.stringify({
        type: 'active_chat',
        request: {
            // target: '바다에서10년생존한사람'
            // target: '산에서20년생존한사람'
            chat_room: "{{ room_name }}",
            // chat_room: '4b3b5734b4400b39'
        },
    }));
};
