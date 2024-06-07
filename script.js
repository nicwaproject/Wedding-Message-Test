document.getElementById('messageForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const senderName = document.getElementById('senderName').value;
  const message = document.getElementById('message').value;
  const attendanceConfirmed = document.getElementById('attendanceConfirmed').value;
  
  const response = await fetch('https://weddinginvitation.glitch.me/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ senderName, message, attendanceConfirmed })
  });
  
  const result = await response.json();
  if (result.success) {
    loadMessages();
    document.getElementById('messageForm').reset();
  } else {
    alert('Failed to send message');
  }
});

async function loadMessages() {
  const response = await fetch('https://weddinginvitation.glitch.me/api/messages');
  const messages = await response.json();
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.innerHTML = `<h3>${msg.senderName}</h3><p>${msg.message}</p><p>Attendance: ${msg.attendanceConfirmed}</p>`;
    messagesDiv.appendChild(msgDiv);
  });
}

window.onload = loadMessages;
