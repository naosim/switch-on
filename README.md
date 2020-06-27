# switch-on
リモート会議中に簡単なアンケートをするシステム  
YES/NOのアンケートをとることができます
利用するにはWebsocket.INのアカウントが必要です。

# 利用者アクター
- 登壇者: アンケートを出す側です。
- 観衆: アンケートに答える側です。YES/NOで答えることができます。

# 使い方
## 登壇者
アンケートをとる側の設定です
- speaker.htmlを開く
- channelとapikeyにWbsocket.INで利用する値を入れる
- 「部屋を作るボタン」を押す
- 表示された部屋URLを観衆に伝える

# ビルド
```
parcel --out-dir ./docs ./src/speaker.html
```