const socket = io('http://localhost:3000');

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Fetch users
  try {
    const response = await axios.get('http://localhost:3000/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const users = response.data.users;
    const userList = document.getElementById('users');

    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.name;
      li.dataset.userId = user.id;
      li.addEventListener('click', () => selectUser(user));
      userList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching users', error);
  }
});

const selectedUser = {};
const messagesContainer = document.getElementById('messages');
const chatHeader = document.getElementById('chat-header');

function selectUser(user) {
  selectedUser.id = user.id;
  selectedUser.name = user.name;
  chatHeader.textContent = `Chat with ${user.name}`;
  messagesContainer.innerHTML = '';

  // Fetch previous messages
  fetchMessages(user.id);
}

document.getElementById('send-button').addEventListener('click', async () => {
  const messageInput = document.getElementById('message');
  const messageText = messageInput.value;
  if (messageText.trim() === '') return;

  const token = localStorage.getItem('token');

  try {
    await axios.post('http://localhost:3000/messages', {
      receiverId: selectedUser.id,
      text: messageText
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    socket.emit('sendMessage', {
      receiverId: selectedUser.id,
      text: messageText
    });

    addMessageToChat('You', messageText);
    messageInput.value = '';
  } catch (error) {
    console.error('Error sending message', error);
  }
});

socket.on('receiveMessage', data => {
  const { sender, text } = data;
  const senderName = sender.id === selectedUser.id ? selectedUser.name : 'You';
  addMessageToChat(senderName, text);
});

function addMessageToChat(sender, text) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${text}`;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function fetchMessages(userId) {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(`http://localhost:3000/messages/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const messages = response.data.messages;

    messages.forEach(async (msg) => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${msg.senderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const sender = response.data.user.name;
        addMessageToChat(sender, msg.text);
      } catch (error) {
        console.error('Error fetching sender name', error);
        addMessageToChat('Unknown', msg.text);
      }
    });
  } catch (error) {
    console.error('Error fetching messages', error);
  }
}
