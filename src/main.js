const { app, BrowserWindow, globalShortcut, shell } = require("electron");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

function centerAndFocus(window) {
  window.show();
  window.focus();
  window.center();
  window.focusOnWebView();
}

let mainWindow;
const createWindow = () => {
  const isDev = process.env.NODE_ENV !== "production";

  mainWindow = new BrowserWindow({
    width: isDev ? 1300 : 800,
    height: 900,
    // only support frameless in prod as it breaks when devtools are open
    titleBarStyle: isDev ? undefined : 'hidden',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  centerAndFocus(mainWindow)

  // force opening the link with target=_blank in a browser window
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    return shell.openExternal(url);
  });

  const shortcut = 'CommandOrControl+Shift+Space';
  if (!globalShortcut.isRegistered(shortcut)) {
    globalShortcut.register(shortcut, () => {
      try {
        centerAndFocus(mainWindow)
      } catch (e) {
        createWindow();
      }
    })
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", (e) => {
  // prevent quitting the app so it can be opened with the global shortcut
  e.preventDefault();
  e.returnValue = false;
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
