# さとう数理塾 ホームページ仕様書

## プロジェクト概要
**サイト名**: さとう数理塾  
**目的**: 沼津の理系専門個別指導塾のWebサイト  
**技術スタック**: Astro 5.0 + Tailwind CSS (AstroWindテンプレートベース)  
**デプロイ**: Vercel対応 + Docker対応

---

## サイト構造

### ページ一覧
```
/                    : トップページ（塾の紹介・特徴）
/math-nigate         : 数学が苦手な高校生向けページ
/rikei               : 理系大学をめざす人向けページ
/join                : 入塾・お問い合わせページ
/guide               : 学習ガイドページ（noindex設定）
```

### ナビゲーション構造
**ヘッダー**:
- HOME (/)
- 数学が苦手な高校生へ (/math-nigate)
- 理系大学をめざすあなたへ (/rikei)

**フッター**:
- © 2016-2025 さとう数理塾

---

## ディレクトリ構造

```
src/
├── pages/              # ページファイル（.astro）
├── components/
│   ├── widgets/        # セクションコンポーネント（Hero, Features等）
│   ├── ui/            # UIコンポーネント（Button, Form等）
│   ├── blog/          # ブログ関連コンポーネント
│   ├── common/        # 共通コンポーネント（Meta, Analytics等）
│   ├── FaqChatLauncher.astro  # FAQチャット起動ボタン
│   ├── Logo.astro     # ロゴコンポーネント
│   └── CustomStyles.astro     # カスタムスタイル
├── layouts/           # レイアウトテンプレート
│   ├── Layout.astro
│   ├── PageLayout.astro
│   ├── LandingLayout.astro
│   └── MarkdownLayout.astro
├── assets/
│   ├── images/        # 画像ファイル
│   ├── styles/        # グローバルスタイル
│   └── favicons/      # ファビコン類
├── utils/             # ユーティリティ関数
├── content/           # コンテンツ（MDX/Markdown）
├── config.yaml        # サイト設定ファイル
└── navigation.ts      # ナビゲーション定義
```

---

## 設定ファイル

### config.yaml
サイトの基本設定を管理：
- サイト名、URL、SEO設定
- OGP画像設定
- ブログ機能の有効/無効
- テーマ設定（light/dark/system）

### navigation.ts
ヘッダー・フッターのリンク構造を定義

---

## デザインシステム

### カラースキーム
- **メインカラー**: 黒 (#000000)
- **テキストカラー**: 白（黒背景時）、黒（白背景時）
- **セカンダリテキスト**: グレー (#9C9C9C)
- **背景色バリエーション**: 
  - 黒 (#000000) - Hero sections
  - 白 (#FFFFFF) - Content sections
  - ライトグレー (#F5F5F5) - Feature sections

### タイポグラフィ
- **フォント**: Inter (variable font)
- **見出し**: 4xl〜6xl (bold)
- **本文**: lg〜xl
- **キャッチコピー**: tracking-widest

### コンポーネントスタイル
- **ボタン**: rounded-full, border-2, hover animations
- **セクション**: py-20〜32 (vertical padding)
- **レイアウト**: max-w-6xl centered container

---

## 主要コンポーネント

### Widgets (src/components/widgets/)
- `Hero.astro` - ヒーローセクション
- `Features.astro` - 特徴セクション
- `SchoolInfo.astro` - 教室情報セクション
- `Header.astro` - グローバルヘッダー
- `Footer.astro` - グローバルフッター
- `CallToAction.astro` - CTA（行動喚起）セクション

### UI Components (src/components/ui/)
- `Button.astro` - ボタンコンポーネント
- `Form.astro` - フォームコンポーネント
- `Headline.astro` - 見出しコンポーネント
- `ItemGrid.astro` - グリッドレイアウト

### カスタムコンポーネント
- `FaqChatLauncher.astro` - FAQチャット機能

---

## 開発コマンド

```bash
npm run dev         # 開発サーバー起動 (localhost:4321)
npm run build       # 本番ビルド (./dist/)
npm run preview     # ビルドのプレビュー
npm run check       # 型チェック・Lint・フォーマット確認
npm run fix         # ESLint・Prettierで自動修正
```

---

## ページ編集ガイドライン

### 新規ページ追加時
1. `src/pages/` に `.astro` ファイルを作成
2. `src/navigation.ts` にリンクを追加
3. 適切なレイアウト（`PageLayout.astro`等）を使用
4. メタデータ（title, description）を設定

### コンポーネント追加時
1. 適切なディレクトリに配置（widgets/ui/common）
2. Propsの型定義を明確に
3. Tailwind CSSでスタイリング
4. レスポンシブ対応（sm:, md:, lg:）

### スタイル変更時
- `src/components/CustomStyles.astro` - カスタムCSS
- `src/assets/styles/tailwind.css` - Tailwind拡張

---

## デプロイ

### Vercel
- `vercel.json` で設定済み
- GitHubプッシュで自動デプロイ

### Docker
- `Dockerfile` + `docker-compose.yml` で構築可能
- Nginxで静的ファイル配信

---

## SEO・Analytics

- Google Site Verification: 設定済み
- Sitemap: 自動生成 (@astrojs/sitemap)
- RSS Feed: `/rss.xml` で配信可能
- OGP画像: `~/assets/images/default.png`

---

## 注意事項

- ブログ機能は実装されているが、現在投稿なし
- i18n設定は英語だが、コンテンツは日本語
- 静的サイト生成（output: 'static'）
- カスタムドメイン設定は `config.yaml` で変更

---

## 制作指示テンプレート

### ページ追加の場合
```
「[ページ名]」ページを作成してください
- URL: /[slug]
- 内容: [具体的な内容]
- レイアウト: [PageLayout/LandingLayout等]
- ナビゲーションへの追加: [要/不要]
```

### コンポーネント追加の場合
```
「[コンポーネント名]」を作成してください
- 配置場所: src/components/[widgets/ui/common]/
- 機能: [具体的な機能]
- Props: [必要なプロパティ]
- スタイル: [デザイン指示]
```

### スタイル変更の場合
```
[対象ページ/コンポーネント]のスタイルを変更してください
- 変更箇所: [具体的な場所]
- 変更内容: [色、サイズ、レイアウト等]
```
