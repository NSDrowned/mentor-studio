const { ipcRenderer } = require('electron')

ipcRenderer.on('show-source-menu', (event) => {
  // const template = [
  //   {
  //     label: 'Menu Item 1',
  //     click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
  //   },
  //   { type: 'separator' },
  //   { label: 'Menu Item 2', type: 'checkbox', checked: true }
  // ]
  // const menu = Menu.buildFromTemplate(template)
  // menu.popup(BrowserWindow.fromWebContents(event.sender))
  console.log('got it');
})

function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}