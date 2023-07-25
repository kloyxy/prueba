const {ipcRenderer} = require('electron');
const closeBtn = document.getElementById('closeBtn');
const minimizeBtn = document.getElementById('minimizeBtn');

closeBtn.addEventListener('click', () => {
   ipcRenderer.send('closeApp')
})

minimizeBtn.addEventListener('click', () => {
   ipcRenderer.send('minimizeApp')
})