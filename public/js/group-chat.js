document.addEventListener('DOMContentLoaded', () => {
  const fetchGroups = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/groups/getUserGroups/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const groupsList = document.getElementById('groups-list');
      groupsList.innerHTML = '';
      response.data.forEach(group => {
        const li = createGroupListItem(group);
        groupsList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching groups:', error);
      // Show an error message on the UI
    }
  };

  const createGroupListItem = (group) => {
    const li = document.createElement('li');
    li.textContent = group.name;
    li.dataset.groupId = group.id;
    li.addEventListener('click', () => {
      clearMessages();
      fetchGroupMessages(group.id);
      document.getElementById('chat-header').textContent = `Group Chat: ${group.name}`;
      document.querySelectorAll('#groups-list li').forEach(li => li.classList.remove('active'));
      li.classList.add('active');
      document.getElementById('add-user-section').classList.remove('hidden');
    });
    return li;
  };

  fetchGroups();

  document.getElementById('create-group-button').addEventListener('click', async () => {
    const groupName = document.getElementById('group-name-input').value.trim();
    if (groupName) {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          'http://localhost:3000/api/groups/create',
          { name: groupName, creatorId: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const groupId = response.data.id;
        const newGroup = { id: groupId, name: groupName };
        const li = createGroupListItem(newGroup);
        document.getElementById('groups-list').appendChild(li);
        document.getElementById('group-name-input').value = '';
      } catch (error) {
        console.error('Error creating group:', error);
        // Show an error message on the UI
      }
    }
  });

  document.getElementById('add-user-button').addEventListener('click', async () => {
    const activeGroup = document.querySelector('#groups-list li.active');
    if (activeGroup) {
      const groupId = activeGroup.dataset.groupId;
      const userId = document.getElementById('add-user-input').value.trim();
      if (groupId && userId) {
        const token = localStorage.getItem('token');
        try {
          await axios.post(
            `http://localhost:3000/api/groups/${groupId}/members`,
            { userId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          document.getElementById('add-user-input').value = '';
        } catch (error) {
          console.error('Error adding user to group:', error);
          // Show an error message on the UI
        }
      }
    }
  });

  const fetchGroupMessages = async (groupId) => {
    try {
      clearMessages();
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/groups/${groupId}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const messagesDiv = document.getElementById('messages');
      response.data.forEach(msg => {
        const div = document.createElement('div');
        div.classList.add('message', msg.senderId === userId ? 'sent' : 'received');
        div.textContent = `${msg.senderId === userId ? 'You' : msg.sender.name}: ${msg.message}`;
        messagesDiv.appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching group messages:', error);
      // Show an error message on the UI
    }
  };
});

function clearMessages() {
  const messagesList = document.getElementById('messages');
  if (messagesList) {
    messagesList.innerHTML = '';
  }
}
