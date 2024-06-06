const backendUrl = 'https://weddinginvitation.glitch.me/api/messages';

// Fungsi untuk mengirim pesan ke backend
async function sendMessage(senderName, message, attendanceConfirmed) {
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderName, message, attendanceConfirmed }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: 'Failed to send message' };
  }
}

// Fungsi untuk mengambil pesan dari backend
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

// Fungsi untuk menampilkan pesan di frontend
function displayMessages(messages) {
  const messagesList = document.getElementById('messagesList');
  messagesList.innerHTML = '';
  messages.forEach(({ senderName, message, attendanceConfirmed }) => {
    const listItem = document.createElement('li');
    listItem.classList.add('message');
    listItem.innerHTML = `
      <span class="sender-name">${senderName}</span>: 
      <span class="message-text">${message}</span>
      <div>
        <span>Attendance: ${attendanceConfirmed}</span>
      </div>
    `;
    messagesList.appendChild(listItem);
  });
}

// Event listener saat form di-submit
document.getElementById('messageForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Mencegah form dari submit default
  const senderNameInput = document.getElementById('senderNameInput');
  const messageInput = document.getElementById('messageInput');
  const attendanceConfirmedInput = document.getElementById('attendanceConfirmedInput');

  const senderName = senderNameInput.value.trim();
  const message = messageInput.value.trim();
  const attendanceConfirmed = attendanceConfirmedInput.value;

  if (senderName && message) {
    try {
      await sendMessage(senderName, message, attendanceConfirmed);
      senderNameInput.value = ''; // Mengosongkan input setelah mengirim pesan
      messageInput.value = '';
      attendanceConfirmedInput.selectedIndex = 0; // Mengatur kembali opsi ke opsi pertama (Bisa)
      const messages = await getMessages();
      displayMessages(messages);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }
});

// Saat halaman dimuat, ambil dan tampilkan pesan
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const messages = await getMessages();
    displayMessages(messages);
  } catch (error) {
    console.error('Error handling messages:', error);
  }
});
