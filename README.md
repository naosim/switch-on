# switch-on
リモート会議中に簡単なアンケートをするシステムです。  
YES/NOのアンケートをとることができます。  
利用するためにはWebSocket.INのApiKeyが必要です。
![アンケート結果の画像](https://naosim.github.io/switch-on/img/og_eyecatch.png)

# 利用者アクター
- 登壇者: アンケートを出す側です。
- 観衆: アンケートに答える側です。YES/NOで答えることができます。

# 使い方
## 登壇者
- 前準備: WebSocket.INのアカウントを作り、ApiKeyを取得する
- [speaker.html](https://naosim.github.io/switch-on/speaker.html)を開く
- WebSocket.INで取得したApiKeyを入力する
- OKボタンを押す
- 任意のチャンネル（数字）を入力する
- 部屋を作るボタンを押す
- 画面下部に表示された解答用URLを観衆に伝える
- 観衆が回答用URLを開きボタンを押すと、画面の数字がカウントアップします

## 観衆
- 登壇者から回答URLをもらう
- 部屋に入るボタンを押す
- 登壇者の質問にYESかNOで答える
- 答えると登壇者側の画面が更新されます


# ビルド
```
npm run-script build
```

# 開発中のビルド（watchモード)
```
npm start
```