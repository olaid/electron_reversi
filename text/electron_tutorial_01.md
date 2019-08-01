# Electronを使ってオセロアプリを作る
## 概要 
ElectronとはHTML、CSS、JavaScriptなどのWeb技術を使用してデスクトップアプリを作ることができるフレームワークです。 
TDDはテスト駆動開発と呼ばれるものでテストを先に書いてそれに合わせて実装するという開発手法です。 
今回はテストツールとしてJest、Cypressを使用します。 

## Electron環境設定 
nodeのインストールは行われているでしょうか？ 
mac環境でhomebrew( [https://brew.sh/index_ja](https://brew.sh/index_ja) )をインストールし以下のコマンドを 
```
brew install node 
```
Windowsの場合は [https://nodejs.org/download/](https://nodejs.org/download/) )からダウンロードを行いダウンロードしてください。 

インストールはプロジェクトローカルに行いグローバル環境は汚さない様にします。 
```
mkdir electron_reversi 
cd electron_reversi 
```

## npm初期化 
パッケージの設定が記載されるpackage.jsonを作成するコマンドです。 
後ほど書き換えも可能な為まずはデフォルトのまま作成してください。 
```
npm init
```
package.jsonのmainを書き換え以下の様にします。 
こちらはnpm initではentry pointとされていた部分です。 
インストール状態の確認のため一旦src配下の呼び出しにしますが後でまた変更します。 
```
 "main": “./main/main.js",
```

## Electronのインストール 
ノードのコマンドnpmを使用しインストールします。 
```
npm install --save-dev electron@5.0.4
```
※--save-devはローカルインストールを行うオプション 
※@〜はバージョン指定です。指定なしで最新版ですが本ページのコードで動作しなくなる可能性があります。 
のちのステップアップとしてバージョン指定を最新化するのも良いかもしれません。 

## 起動 
まずは起動できることを確認します。 
npmから呼び出されるメインプロセスとメインプロセスから呼び出されるレンダラープロセスを作ります。 
詳細を知りたい方はElectron公式ページをどうぞ。 
### main/main.js 
```
// Electronのモジュール
const {app, BrowserWindow, ipcMain} = require('electron');

// Electronの初期化完了後に実行
app.on("ready", () => {
 //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
 var mainWindow = new BrowserWindow({width: 1280, height: 720, useContentSize: true});
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
./dist/reversi.html 
<!DOCTYPE html>
<html>
<head>
 <meta charset="UTF-8">
</head>
<body>
 <p>Hello World</p>
</body>
</html>
```
実際に起動してみます。 
```
./node_modules/.bin/electron .
```
このままだと起動コマンドが長いためnpm(package.json)にコマンドを登録します。 
./node_modules/.bin/へのパスが通っているものとして記載できます。 
### package.json 
```
"scripts": {
   "start": "electron ."
},
```
今後のアプリ起動は以下の様になります。 
```
npm start
```
起動できたでしょうか？できなかった場合は一度見直してみてください。 
エラーが出ている場合には検索等して読み解いてみましょう。 

## トランスパイル 
オセロでは石を置く判断や勝敗、パスなど複数の関数が必要になります。 
分かりやすくソースを管理するためにes6に準じたファイル分割、クラス作成します。 
現在のelectronではes6をそのまま実行できない為、webpack・babelで変換処理(=トランスパイル)を行います。 
( [https://ics.media/entry/16028/](https://ics.media/entry/16028/) ) 
インストール 
```
npm install -D webpack webpack-cli babel-loader @babel/core @babel/preset-env
```
起動コマンドをnpm に登録 
### package.json 
```
"scripts": {
   "start": "electron .",
   "build": "webpack",
  "watch": "webpack -w" 
}
```
webpackの設定を記載 
### webpack.config.js 
```
var mainConfig = { 
 mode: "development", 
 node: { 
   __dirname: false, 
   __filename: false 
 }, 
 module: { 
   rules: [ 
     { 
       // 拡張子 .js の場合 
       test: /\.js$/, 
       exclude: /node_modules/, 
       use: [ 
         { 
           // Babel を利用する 
           loader: "babel-loader" 
         } 
       ] 
     } 
   ] 
 }, 
 target: 'electron-main', 
 entry: { 
   "main": "./main/main.js" 
 } 
}; 
var rendererConfig = { 
 mode: "development", 
 node: { 
   __dirname: false, 
   __filename: false 
 }, 
 module: { 
   rules: [ 
     { 
       // 拡張子 .js の場合 
       test: /\.js$/, 
       exclude: /node_modules/, 
       use: [ 
         { 
           // Babel を利用する 
           loader: "babel-loader" 
         } 
       ] 
     } 
   ] 
 }, 
 target: 'electron-renderer', 
 entry: { 
   "reversi": "./renderer/reversi.js" 
 } 
}; 
module.exports = [mainConfig, rendererConfig]; 
.babelrc 
{ 
 presets: ["@babel/preset-env"], 
 "env": { 
   "test": {             
     "plugins": ["transform-es2015-modules-commonjs"] 
   } 
 } 
} 
```
トランスパイル用に空のjsファイルを作成します。 
touch renderer/reversi.js 
トランスパイル実行 
```
npm run build 
```
出力されたらエントリーポイントを出力ディレクトリに変更します。 
### package.json 
```
 "main": “./dist/main.js", 
```
これで起動すると先ほどと同じように出力が行われるはずです。 

常駐トランスパイル 
変更毎に手動でトランスパイルすると手間な時はターミナルに常駐させることもできます。 
書き込み毎に自動でトランスパイルが走ります。 
起動用のターミナルとは別に常駐ターミナルを開いておきましょう。 
```
npm run watch 
```
## テスト設定 
ここからはテスト駆動開発のための設定を行なっていきます。 
テストツールのJEST、Electron用テストフレームワークSpectronをインストールします。 
またbabelがテスト時にも動作するようプラグインも追加しておきます。 
```
npm install --save-dev jest spectron babel-jest babel-plugin-transform-es2015-modules-commonjs 
```
テストコマンドもnpmへ記載します。 
```
"scripts": {
   "start": "electron .",
   "build": "webpack",
 "watch": "webpack -w", 
   "test": "jest"
},
```
## mainプロセステスト 
アプリを起動しウィンドウが一つ表示されることを確認するテストを記載します。 
### test/main.test.js 
```
const Application = require('spectron').Application 
const assert = require('assert') 
const electronPath = require('electron') // Require Electron from the binaries included in node_modules. 

describe('Window', function () { 
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
```
テストを実行します。 
```
npm test
```
PASSと表示されていればテスト成功です。 
テストが動作しない場合は一度再起動することで動作することがあるようです。 
バージョン差などについても確認してみてください。 

## rendererテスト 
レンダラーはページ毎の処理を行います。 
関数レベルでテスト書いてみましょう。 

### test/renderer.test.js 
```
import Board from '../renderer/board' ; 
describe('Board', function () { 
  describe('put', () => { 
    it('石置き関数では1と-1が交互に置かれる', () => { 
      const board = new Board() 
      board.put(1,2) 
      expect(board.player).toBe(-1) 
      board.put(2,2) 
      expect(board.player).toBe(1) 
    }) 
  }) 
}) 
```
npm testを実行するとCannot find moduleになります。 
条件を満たすファイルを作成してみましょう。 
### renderer/board.js 
```
export default class Put_stone {
 constructor(){
   this.player = 1; 
 }
 put(x,y) {
   this.player = -this.player 
 }
}
```
テストを実行してグリーンになることを確認してください 

## 結合テスト 
表示、モジュールを組み合わせてのテストにはcypressを使います。 
```
npm install cypress --save-dev 
```
実行には以下のコマンドです。 
停止しない限り常駐するので書き換え等を行う場合に新しいターミナルを開いておきましょう。 
```
./node_modules/.bin/cypress open 
```
出てくる画面でOK,got it!をクリックします。 
cypress/integration内にあるテストモジュールが表示されます。 
exampleフォルダ内には様々な例が保存されており、クリックすることでCypress用のテストサイトに対して流すことができます。 
Run all specsは全てのテスト順次を流すボタンです。 
cypress/integration内のexampleフォルダごと削除しても問題ありませんが 
構文など調べる際には便利なのでひとまずそのままにしておきます。 

## Helloテスト 
最初に作ったHello worldをテストしてみましょう。 
保存した時点でcypressが起動済みなら自動で検知されテストが実施されます。 
### cypress/integration/renderer.js 
```
describe('reversi', function() { 
  it('initialize', function() { 
    cy.visit('/dist/reversi.html') 
    cy.get('p').contains("Hello") 
  }) 
}) 
```
cypress配下のテストは実行したくないため 
jsonを変更します。 
```
    "test": "jest test" 
```
これでやっと環境構築ができました。 

## 実装 
テーブル定義 
```
npm install --save-dev @babel/runtime @babel/plugin-transform-runtime 

npm ls --depth=0 
```

 [https://webpack.js.org/concepts/loaders/#loader-features](https://webpack.js.org/concepts/loaders/#loader-features) 
