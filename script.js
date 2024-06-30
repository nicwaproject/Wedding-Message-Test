const weddingId = 'uniqueWeddingIdForEachCouple'; // Ganti dengan ID pasangan yang sesuai

document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const attendance = document.getElementById('attendance').value;
  const message = document.getElementById('message').value;

  const response = await fetch('https://handle-pesan-di-website-pernikahan.glitch.me/messages', {
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
  const response = await fetch(`https://handle-pesan-di-website-pernikahan.glitch.me/messages?weddingId=${weddingId}`);
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
  const response = await fetch(`https://handle-pesan-di-website-pernikahan.glitch.me/attendance-count?weddingId=${weddingId}`);
  const attendanceCount = await response.json();

  const attendanceList = document.getElementById('attendance-count');
  attendanceList.innerHTML = '';

  attendanceCount.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item._id}: ${item.count}`;
    attendanceList.appendChild(listItem);
  });
}

loadMessages();
loadAttendanceCount();
setInterval(loadAttendanceCount, 10000); // Refresh setiap 10 detik
