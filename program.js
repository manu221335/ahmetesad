const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  // Tarayıcı penceresini oluşturuyoruz.
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.setMenu(null);

  // ve dosyayı yüklüyoruz.
  mainWindow.loadFile('program.html')

  // Otomatik olarak geliştirici araçlarını açıyoruz.
  // mainWindow.webContents.openDevTools()

  // Pencere kapatıldığında çağrılıyor.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// Uygulama başlamaya hazır olduğunda pencereyi açıyoruz.
app.on('ready', createWindow)

// Tüm pencereler kapatıldığında uygulamadan çıkarıyoruz.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// Hazırız!