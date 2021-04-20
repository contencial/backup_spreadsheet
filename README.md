# スプレッドシートの自動パックアップ処理
## はじめに
スプレッドシートでデータを運用する上でバックアップ対応は欠かせません。
こうした「データの誤操作」対策として、TypeScriptでスプレッドシートの自動バックアップ処理を実装しました。
GAS（Google Apps Script）をローカルで開発できるようにclaspを導入し、githubでバージョン管理しています。
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

# Googleドライブにあるバックアップ元スプレッドシートとバックアップ用フォルダのIDをmain.tsに記載する。
vim src/main.ts　# 1,2行目の定数にIDを代入

# TypeScriptのコードをPUSH（PUSH時に自動的にトランスパイルされ、GASに変換される。）
clasp push
```
## トリガーを追加
Google Apps Scriptのメニュー画面で「トリガー」を選択し、トリガーを登録。
実行する関数には「main」を選択し、好みのタイミングを設定する。（日次で起動したいなら「日付ベースのタイマー」を選択する。）
以上で自動バックアップ処理の登録が完了です。
## 仕様について
1. スプレッドシートを日次でバックアップ用ディレクトリにコピーする。
2. 命名規則は「【yyyy-MM-dd】'スプレッドシート名'」。
3. 改廃期間は30日で設定。

[公式ドキュメント](https://developers.google.com/apps-script/reference)を確認したところ、バックアップ用スプレッドシートを作ってデータを洗い替えたり、ファイルの蓄積ではなくシートの蓄積にしたりなど異なる運用方法にも対応できそうです。
