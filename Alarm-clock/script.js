window.addEventListener('DOMContentLoaded', (event) => {
  const setAlarmBtn = document.getElementById('set-alarm-btn');
  const alarmsList = document.getElementById('alarms-ul');

  let alarmInterval;
  const alarms = [];

  // Event listener for the "Set Alarm" button
  setAlarmBtn.addEventListener('click', () => {
    const alarmHr = document.getElementById('alarm-hr').value;
    const alarmMin = document.getElementById('alarm-min').value;
    const alarmSec = document.getElementById('alarm-sec').value;
    const alarmAmPm = document.getElementById('alarm-am-pm').value;

    const alarmTime = formatTime(alarmHr, alarmMin, alarmSec, alarmAmPm);
    if (alarmTime === '') {
      alert('Please select a valid time.');
      return;
    }

    // Create an alarm item and add it to the alarms array
    const alarmItem = {
      time: alarmTime,
      interval: null
    };

    alarms.push(alarmItem);
    renderAlarms();

    const currentTime = getCurrentTime();
    const timeUntilAlarm = getTimeDifference(currentTime, alarmTime);

    // Set a timeout for the alarm
    alarmItem.interval = setTimeout(() => {
      alert('Wake up!');
      removeAlarm(alarmItem);
    }, timeUntilAlarm);
  });

  function getCurrentTime() {
    const now = new Date();
    const currentHr = now.getHours();
    const currentMin = now.getMinutes();
    const currentSec = now.getSeconds();

    return formatTime(currentHr, currentMin, currentSec);
  }

  function formatTime(hr, min, sec, ampm = 'am') {
    const formattedHr = padZeroes(hr);
    const formattedMin = padZeroes(min);
    const formattedSec = padZeroes(sec);

    return `${formattedHr}:${formattedMin}:${formattedSec} ${ampm.toUpperCase()}`;
  }

  function padZeroes(num) {
    return num.toString().padStart(2, '0');
  }

  function getTimeDifference(time1, time2) {
    const t1 = new Date(`01/01/2023 ${time1}`);
    const t2 = new Date(`01/01/2023 ${time2}`);

    return t2 - t1;
  }

  function removeAlarm(alarmItem) {
    clearTimeout(alarmItem.interval);
    const index = alarms.indexOf(alarmItem);
    if (index > -1) {
      alarms.splice(index, 1);
      renderAlarms();
    }
  }

  function renderAlarms() {
    // Clear existing alarms list
    alarmsList.innerHTML = '';

    // Render each alarm item in the alarms array
    alarms.forEach((alarmItem) => {
      const li = document.createElement('li');
      li.className = 'list-group-item alarm-item';
      li.textContent = alarmItem.time;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        removeAlarm(alarmItem);
      });

      li.appendChild(deleteBtn);
      alarmsList.appendChild(li);
    });
  }
});
