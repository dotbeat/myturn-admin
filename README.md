# myturn-admin

## 環境要件

- **Node.js バージョン**: `v22.12.0`
- **エディター**: Visual Studio Code（以下のプラグインを推奨）
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
  - [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)
- **Next.js バージョン**: `15.2.4`
- **ブラウザ**: Google Chrome または Microsoft Edge

## 推奨ブラウザプラグイン

以下のブラウザプラグインを導入することで、開発体験が向上します：

### **1. React Developer Tools**

- **インストールリンク**: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

### **2. Redux DevTools**

- **インストールリンク**: [Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### **3. JSON Formatter**

- **インストールリンク**: [JSON Formatter](https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en)

## プロジェクトのセットアップ手順

### **1. 依存関係のインストール**

プロジェクトルートで以下のコマンドを実行して、必要な依存関係をインストールしてください：

```bash
npm ci
```

### **2. 開発モードの起動**

以下のコマンドを実行して開発モードを開始します：

```bash
npm run dev
```

開発サーバーが起動したら、ブラウザで以下の URL にアクセスしてください：
http://localhost:3002

## Git Flow 分支管理ルール

### 1. ブランチ構成

- `main` ブランチ:
  最新の安定版コードを保持するブランチ。
  マージ後、`Vercel` によって自動ビルド・デプロイが行われます。
- `feature`:
  mainブランチから分岐する、新機能の実装や修正を行うためのブランチ。
  命名例：feature/add-login、feature/update-dashboard。
- `hotfix`:
  mainブランチから分岐する、緊急バグ修正用のブランチ。
  命名例：hotfix/fix-login-issue。

### 2. 開発フロー

| **ブランチ**  | **用途**                                                 | **デプロイ環境**     |
| ------------- | -------------------------------------------------------- | -------------------- |
| `feature/xxx` | 個々の機能開発用のブランチ。開発者のローカル環境でテスト | ローカル環境         |
| `main`        | 安定した本番用ブランチ。本番環境に直接デプロイ           | 本番環境             |
| `hotfix/xxx`  | 緊急修正用ブランチ。`main` から直接派生し、修正後統合    | 本番環境（緊急修正） |

#### 1. 機能開発

- 新しい機能を開発する際は、`develop` ブランチから `feature`を作成：
  ```bash
  git checkout -b feature/xxx develop
  ```

#### 2. 本番環境へのリリース

- 作業ブランチを `main` に統合（PR）。
- `main` ブランチを本番環境に自動的にデプロイ。

#### 3. 緊急修正

- `main` から `hotfix/xxx` ブランチを作成：
  ```bash
  git checkout -b hotfix/xxx main
  ```
- 修正完了後、それを `main` と `develop` に統合：
  ```bash
  git checkout main
  git merge hotfix/xxx
  git checkout develop
  git merge hotfix/xxx
  git branch -d hotfix/xxx
  ```

## よくある質問

1. 開発環境が立ち上がらない
   ```js
   node setup.mjs
   ```
2. Vercel でビルドが失敗する。
   - 解決方法:
   1. Vercel ダッシュボードでエラーログを確認します。
   2. 環境変数が正しく設定されているか確認してください。
   3. ローカル環境で以下を実行し、同じエラーが再現されるか確認します：
   ```bash
   npm run build
   ```
3. Vercelの手動ビルド
   1. [Deploying to Vercel with Vercel CLI](https://vercel.com/docs/deployments/deploy-with-vercel-cli#deploying-to-vercel-with-vercel-cli)
4. Vercelの手動ビルドと自動ビルドの切り替え
   1. [deployment](https://vercel.com/docs/projects/project-configuration/git-configuration#git.deploymentenabled)

## プロジェクト構造の説明

### ルートディレクトリ

- **app/**

  - **app-router/**: app router。
  - **api/**: サーバーサイドのロジックを格納するディレクトリ。データベースの操作、APIリクエスト処理、認証などのバックエンドロジックを実装。
  - **globals.css**: グローバルスタイルシート、共通のCSSスタイルを定義。
  - **layout.tsx**: グローバルレイアウトファイル、ページの共通レイアウト構造を定義。
  - **page.tsx**: デフォルトのページエントリーファイル、フロントエンドの入口。

- **public/**: 静的リソースフォルダ（画像、フォントなど）で、URLを通じて直接アクセス可能。

- **src/**: コアソースコードのディレクトリ
  - **\_\_tests\_\_/**: テストファイル用ディレクトリ（単体テストを含む）。
  - **components/**: Reactコンポーネントを格納するディレクトリ。
  - **hooks/**: カスタムフックを格納するディレクトリ（業務ロジックに関連）。
  - **icons/**: @mui/icons-material。
  - **services/**: フロントエンドでのAPIロジックを処理するディレクトリ（RTKQuery）。
  - **store/**: 状態管理用ディレクトリ（redux toolkitの状態管理コードを格納）。
  - **utils/**: 補助的な関数群。
  - **lib/**: コアとなる機能、例：認証、データベース処理など。

## TODO
