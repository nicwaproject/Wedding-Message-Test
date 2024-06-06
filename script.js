const backendUrl = 'https://weddinginvitation.glitch.me/api/messages';

async function sendMessage(message) {
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: 'Failed to send message' };
  }
}

async function getMessages() {
  try {
    const response = await fetch(backendUrl);
    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
}

function displayMessages(messages) {
  const messagesList = document.getElementById('messagesList');
  messagesList.innerHTML = '';
  messages.forEach(message => {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    messagesList.appendChild(listItem);
  });
}

document.getElementById('messageForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Mencegah form dari submit default
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim(); // Menghapus spasi di awal/akhir pesan
  if (message) {
    try {
      await sendMessage(message);
      messageInput.value = ''; // Mengosongkan input setelah mengirim pesan
      const messages = await getMessages();
      displayMessages(messages);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const messages = await getMessages();
    displayMessages(messages);
  } catch (error) {
    console.error('Error handling messages:', error);
  }
});
