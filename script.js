// Mendapatkan parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const isCouple = urlParams.get('isCouple') === 'true';
const weddingId = urlParams.get('weddingId');

document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const attendance = document.getElementById('attendance').value;
  const message = document.getElementById('message').value;

  const response = await fetch('https://weddinginvitation.glitch.me/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ weddingId, name, attendance, message })
  });

  if (response.ok) {
    loadMessages();
    loadAttendanceCount();
  }
});

async function loadMessages() {
  const response = await fetch(`https://weddinginvitation.glitch.me/messages?weddingId=${weddingId}`);
  const messages = await response.json();

  const messagesList = document.getElementById('messages');
  messagesList.innerHTML = '';

  messages.forEach(message => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${message.name}</strong><br><em>${message.message}</em>`;
    messagesList.appendChild(listItem);
  });
}

async function loadAttendanceCount() {
  const response = await fetch(`https://weddinginvitation.glitch.me/attendance-count?weddingId=${weddingId}`);
  const attendanceCount = await response.json();

  const attendanceList = document.getElementById('attendance-count');
  attendanceList.innerHTML = '';

  attendanceCount.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item._id}: ${item.count}`;
    attendanceList.appendChild(listItem);
  });
}

// Mengatur WebSocket dengan parameter isCouple
const socket = new WebSocket(`wss://weddinginvitation.glitch.me/?isCouple=${isCouple}`);

socket.addEventListener('open', function (event) {
  console.log('Connected to WebSocket server');
});

socket.addEventListener('message', function (event) {
  const data = JSON.parse(event.data);

  if (data.type === 'newMessage') {
    // Menambahkan pesan baru ke daftar pesan
    const messagesList = document.getElementById('messages');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${data.data.name}</strong><br><em>${data.data.message}</em>`;
    messagesList.appendChild(listItem);
  }
});

loadMessages();
loadAttendanceCount();
setInterval(() => {
  loadMessages();
  loadAttendanceCount();
}, 5000); // Refresh setiap 5 detik
