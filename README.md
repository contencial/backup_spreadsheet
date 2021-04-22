# スプレッドシートの自動パックアップ処理
## はじめに
スプレッドシートでデータを運用する上で気にするポイントにバックアップ対応があるかと思います。
誤った操作をしてしまっても、すぐに気づければCtrl+Zや履歴から復元することも可能ですが、後から気づいて復元できないというケースも考えられます。

そこで万が一起こる「データの誤操作」対策として、TypeScriptでスプレッドシートの自動バックアップ処理を実装しました。
基本的にGAS（Google Apps Script）の開発はブラウザで行う必要がありますが、それだと使い慣れているエディタを使えなかったりgithubとの連携に苦慮したりするので、ローカルで開発できるようにclaspを導入し、TypeScriptで実装しました。

以下、GASの導入と実際にclaspを使ってローカルで開発する手順を説明していきます。
## GAS(Google Apps Script)の準備
まずはGASを使用するための環境構築をします。
[こちら](https://gsuite.google.com/marketplace/?pann=gam)から「Google Apps Script」と検索をかけてアプリをインストールしてください。
## git clone & 環境構築
```bash
# 事前にNode.jsの環境構築を行ってください。

git clone https://github.com/kefujiwa/backup_spreadsheet.git
cd backup_spreadsheet

# 設定ファイルを元に必要なパッケージをインストール（@google/clasp、tslint、@types/google-apps-script等）
npm install

# GASプロジェクトの作成
clasp login
clasp create --rootDir ./src

# TypeScriptのコードをPUSH（PUSH時に自動的にトランスパイルされ、GASに変換される。）
clasp push

# ブラウザで該当のGASプロジェクトを開き、IDをプロパティに設定するため、下記スクリプトをGASにて実行する
  # スプレッドシートのIDは、「https://docs.google.com/spreadsheets/d/〇〇/edit#gid=0」の〇〇の部分
  PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID","スプレッドシートのID");
  # バックアップ用フォルダのIDは、「https://drive.google.com/drive/folders/〇〇」の〇〇の部分
  PropertiesService.getScriptProperties().setProperty("BKUP_FOLDER_ID","バックアアップ用フォルダのID");
```
## トリガーを追加
Google Apps Scriptのメニュー画面で「トリガー」を選択し、トリガーを登録。
実行する関数には「main」を選択し、好みのタイミングを設定する。（日次で起動したいなら「日付ベースのタイマー」を選択する。）
以上で自動バックアップ処理の登録が完了です。
## 仕様について
1. スプレッドシートを日次でバックアップ用ディレクトリにコピーする。
2. 命名規則は「【yyyy-MM-dd】'スプレッドシート名'」。
3. 改廃期間は30日で設定。

[GASの公式ドキュメント](https://developers.google.com/apps-script/reference)を確認したところ、バックアップ用スプレッドシートを作ってデータを洗い替えたり、ファイルの蓄積ではなくシートの蓄積にしたりなど異なる運用方法にも対応できそうです。
