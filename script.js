document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const attendance = document.getElementById('attendance').value;

  const response = await fetch('https://glitch.com/edit/#!/weddinginvitation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, attendance })
  });

  if (response.ok) {
    loadMessages();
    loadAttendanceCount();
  }
});

async function loadMessages() {
  const response = await fetch('https://glitch.com/edit/#!/weddinginvitation');
  const messages = await response.json();

  const messagesList = document.getElementById('messages');
  messagesList.innerHTML = '';

  messages.forEach(message => {
    const listItem = document.createElement('li');
    listItem.textContent = `${message.name}: ${message.attendance}`;
    messagesList.appendChild(listItem);
  });
}

async function loadAttendanceCount() {
  const response = await fetch('https://glitch.com/edit/#!/weddinginvitation');
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
