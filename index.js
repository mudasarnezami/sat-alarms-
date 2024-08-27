
const selectMenu = document.querySelectorAll('select');
const timeBox = document.querySelector('.time');
const setAlarmBtn = document.querySelector('button');
const content = document.querySelectorAll('.co');
let alarmTime = '';
let alarmState = 'noset';  // Consistent with the check

const ringtone = new Audio('mu.mp3'); // Ensure the path is correct

// Function to populate select menu
function populateSelectMenu(menu, start, end) {
    for (let i = start; i <= end; i++) {
        let value = i < 10 ? '0' + i : i; // Add leading zero for single digits
        let option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        menu.appendChild(option);
    }
}

// Populate the select menus
populateSelectMenu(selectMenu[0], 0, 23); // Hours
populateSelectMenu(selectMenu[1], 0, 59); // Minutes

// Set up an interval to update the time every second
setInterval(() => {
    const now = new Date();
    const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    
    timeBox.textContent = `${hours}:${minutes}:${seconds}`;

    // Log current time and alarm time for debugging
    console.log(`Current time: ${hours}:${minutes}:${seconds}`);
    console.log(`Alarm time: ${alarmTime}`);

    // Check if the current time matches the alarm time
    if (alarmTime === `${hours}:${minutes}` && alarmState === 'set') {
        if (ringtone.paused) { // Check if the ringtone is not already playing
            ringtone.play().catch(error => {
                console.error('Error playing ringtone:', error);
            });
            ringtone.loop = true; // Set the ringtone to loop
        }
    }

}, 1000); // 1000ms = 1 second

// Add event listener to the button
setAlarmBtn.addEventListener('click', () => {
    checkstate(alarmState);
});

// Function to stop the ringtone (optional)
function stopRingtone() {
    if (!ringtone.paused) {
        ringtone.pause();
        ringtone.currentTime = 0; // Reset to start
    }
}

// Function to toggle alarm state
function checkstate(state) {
    if (state === 'noset') {
        const selectedHour = selectMenu[0].value;
        const selectedMinute = selectMenu[1].value;

        // Set the alarm time
        alarmTime = `${selectedHour}:${selectedMinute}`;
        console.log(`Alarm set for ${alarmTime}`);
        
        content.forEach(element => element.classList.add('mudasar'));
        setAlarmBtn.innerText = 'Clear Alarm';
        alarmState = 'set';

    } else {
        content.forEach(element => element.classList.remove('mudasar'));
        alarmTime = '';
        stopRingtone(); // Ensure the ringtone stops
        setAlarmBtn.innerText = 'Set Alarm';
        alarmState = 'noset';
    }
}
