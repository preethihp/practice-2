document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId') || '';
    const userName = localStorage.getItem('userName') || '';
    let selectedUser = null;
    let messages = [];

    if (!userId) {
        console.error('userId is not set in localStorage');
    } else {
        console.log(`Logged in as user: ${userId}`);
    }

    const usersList = document.getElementById('users-list');
    const messagesDiv = document.getElementById('messages');
    const chatHeader = document.getElementById('chat-header');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    if (token) {
        fetchUsers();
    }

    sendButton.addEventListener('click', sendMessage);

    function fetchUsers() {
        fetch('http://localhost:3000/chat/users', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(users => {
            usersList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                li.addEventListener('click', () => selectUser(user));
                usersList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
    }

    function selectUser(user) {
        selectedUser = user;
        chatHeader.textContent = `Chat with ${user.name}`;
        fetchMessages(user.id);
    }

    function fetchMessages(receiverId) {
        if (!userId || !receiverId) {
            console.error('userId or receiverId is missing');
            return;
        }

        console.log(`Fetching messages for userId: ${userId}, receiverId: ${receiverId}`);

        fetch(`http://localhost:3000/chat/messages?userId=${userId}&receiverId=${receiverId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                messages = data;
                updateMessages();
            } else {
                console.error('Messages response is not an array:', data);
            }
        })
        .catch(error => console.error('Error fetching messages:', error));
    }

    function updateMessages() {
        messagesDiv.innerHTML = '';
        messages.forEach(msg => {
            const div = document.createElement('div');
            div.classList.add('message', msg.senderId === userId ? 'sent' : 'received');
            div.textContent = `${msg.senderName}: ${msg.message}`; // Display sender's name
            messagesDiv.appendChild(div);
        });
    }

    function sendMessage() {
        const message = messageInput.value;
        if (!message) return;

        fetch('http://localhost:3000/chat/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                senderId: userId,
                receiverId: selectedUser.id,
                message
            })
        })
        .then(response => response.json())
        .then(msg => {
            messages.push(msg);
            if (messages.length > 10) {
                messages.shift();
            }
            updateMessages();
            messageInput.value = '';
        })
        .catch(error => console.error('Error sending message:', error));
    }

    setInterval(() => {
        if (selectedUser) {
            fetchMessages(selectedUser.id);
        }
    }, 1000);
});