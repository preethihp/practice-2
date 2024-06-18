document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId') || '';
    const userName = localStorage.getItem('userName') || '';
    let selectedGroup = null;
    let groupMessages = [];

    const groupsList = document.getElementById('groups-list');
    const groupMessagesDiv = document.getElementById('messages'); // Reuse the messages div for group messages
    const groupChatHeader = document.getElementById('chat-header'); // Reuse the chat header for group chat
    const groupNameInput = document.getElementById('group-name-input');
    const createGroupButton = document.getElementById('create-group-button');
    const addUserSection = document.getElementById('add-user-section');
    const addUserInput = document.getElementById('add-user-input');
    const addUserButton = document.getElementById('add-user-button');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    if (token) {
        fetchUserGroups();
    }

    createGroupButton.addEventListener('click', createGroup);
    addUserButton.addEventListener('click', addUserToGroup);
    sendButton.addEventListener('click', sendMessageToGroup);

    function fetchUserGroups() {
        fetch(`http://localhost:3000/groups/${userId}/groups`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(groups => {
            groupsList.innerHTML = '';
            groups.forEach(group => {
                const li = document.createElement('li');
                li.textContent = group.name;
                li.addEventListener('click', () => selectGroup(group));
                groupsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching user groups:', error));
    }

    function createGroup() {
        const groupName = groupNameInput.value;
        if (!groupName) return;

        fetch('http://localhost:3000/groups/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name: groupName, createdBy: userId })
        })
        .then(response => response.json())
        .then(group => {
            groupsList.innerHTML += `<li>${group.name}</li>`;
            groupNameInput.value = '';
        })
        .catch(error => console.error('Error creating group:', error));
    }

    function selectGroup(group) {
        selectedGroup = group;
        groupChatHeader.textContent = `Group: ${group.name}`;
        addUserSection.classList.remove('hidden');
        fetchGroupMessages(group.id);
        fetchGroupUsers(group.id); // Fetch and display users in the group
        // Show the chat window
        //document.querySelector('.chat-window').style.display = 'block';
    }
    
    function fetchGroupUsers(groupId) {
        fetch(`http://localhost:3000/groups/${groupId}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(users => {
            if (Array.isArray(users)) {
                const usersList = document.getElementById('group-users-list');
                usersList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user.name;
                    usersList.appendChild(li);
                });
            } else {
                console.error('Invalid response format for group users:', users);
            }
        })
        .catch(error => console.error('Error fetching group users:', error));
    }
    
    function fetchGroupMessages(groupId) {
        fetch(`http://localhost:3000/groups/${groupId}/messages`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(messages => {
            groupMessages = messages;
            updateGroupMessages();
        })
        .catch(error => console.error('Error fetching group messages:', error));
    }

    function updateGroupMessages() {
        groupMessagesDiv.innerHTML = '';
        groupMessages.forEach(msg => {
            const div = document.createElement('div');
            div.classList.add('message', msg.senderId === userId ? 'sent' : 'received');
            div.textContent = `${msg.senderName}: ${msg.message}`; // Display sender's name
            groupMessagesDiv.appendChild(div);
        });
    }

    function sendMessageToGroup() {
        const message = messageInput.value;
        if (!message || !selectedGroup) return;

        fetch('http://localhost:3000/groups/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                groupId: selectedGroup.id,
                senderId: userId,
                message
            })
        })
        .then(response => response.json())
        .then(msg => {
            groupMessages.push(msg);
            if (groupMessages.length > 10) {
                groupMessages.shift();
            }
            updateGroupMessages();
            messageInput.value = '';
        })
        .catch(error => console.error('Error sending message:', error));
    }

    function addUserToGroup() {
        const newUserId = addUserInput.value;
        if (!newUserId || !selectedGroup) return;

        fetch('http://localhost:3000/groups/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                groupId: selectedGroup.id,
                userId: newUserId
            })
        })
        .then(response => response.json())
        .then(() => {
            addUserInput.value = '';
            console.log('User added to group');
        })
        .catch(error => console.error('Error adding user to group:', error));
    }

    setInterval(() => {
        if (selectedGroup) {
            fetchGroupMessages(selectedGroup.id);
        }
    }, 1000);
});
