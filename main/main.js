// Electronのモジュール
const {app, BrowserWindow, ipcMain} = require('electron');

// Electronの初期化完了後に実行
app.on("ready", () => {
  //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
  var mainWindow = new BrowserWindow({width: 500, height: 500, useContentSize: true});
  //タイトル設定
  mainWindow.setTitle("reversi");
  //使用するhtmlファイルを指定する
  mainWindow.loadURL(`file://${__dirname}/../dist/reversi.html`);
  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
  app.quit();
});