const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
/*
describe.skip('Window', function () {
  //タイムアウト時間を30秒に設定
  jest.setTimeout(30000)

  let app
  //テスト開始時に動作
  beforeAll(function() {
    //electronアプリのインスタンス作成
    app = new Application({
      path: electronPath,
      args: [`/${__dirname}/..`]
    });
    //アプリをスタート
    return app.start()
  })

  //テスト終了時に動作
  afterAll(function() {
    //アプリをストップ
    return app.stop()
  })

  it("アプリケーションを起動するとウィンドウが1つ表示される", function() {
    app.client.getWindowCount().then((count) => assert.equal(count, 1))
  })
})
*/