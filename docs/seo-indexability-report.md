# SEO Indexability Report

## 調査概要
- **調査日**: 2025-11-24
- **調査対象**: `src/pages/` 配下の全ページ
- **目的**: `/`、`/math-nigate`、`/rikei` の3ページのみをインデックス対象とし、それ以外を noindex とすること。

## 1. ルーティング一覧とインデックス判定

| パス | 対応ファイル | 判定 | 判定の根拠 |
| :--- | :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | **index** | `metadata.robots` の指定なし（デフォルト `index: true`） |
| `/math-nigate` | `src/pages/math-nigate.astro` | **index** | `metadata.robots` の指定なし（デフォルト `index: true`） |
| `/rikei` | `src/pages/rikei.astro` | **index** | `metadata.robots` の指定なし（デフォルト `index: true`） |
| `/counseling` | `src/pages/counseling.astro` | **noindex** | `<PageLayout noindex={true}>` が指定されている |
| `/guide` | `src/pages/guide.astro` | **noindex** | `metadata.robots.index: false` および `<meta name="robots" content="noindex,follow" />` の明示的記述あり |
| `/join` | `src/pages/join.astro` | **index** | **(要修正)** `metadata` に robots 指定がなく、Layout への `noindex` 渡しもなし |
| `/404` | `src/pages/404.astro` | **index** | **(要修正)** `metadata` に robots 指定がなく、Layout への `noindex` 渡しもなし |
| `/rss.xml` | `src/pages/rss.xml.ts` | - | XMLファイルのため対象外（通常は検索結果に表示されない） |

### 備考
- `public/robots.txt` はすべてのクローラに対してすべてのパスを許可（`Disallow: `）しており、ブロックは行われていません。
- `src/config.yaml` にて、デフォルトの SEO 設定は `index: true`, `follow: true` となっています。

## 2. 条件適合状況

- ✅ `/` は index
- ✅ `/math-nigate` は index
- ✅ `/rikei` は index
- ❌ 上記以外のパスは、いずれかの手段で noindex になっている
  - `/join` が index のままになっている
  - `/404` が index のままになっている

## 3. 改善候補

以下のページについて、`noindex` 設定を追加する必要があります。

### 修正対象 1: `/join` (`src/pages/join.astro`)

**現状:**
```astro
<Layout metadata={metadata}>
```

**修正案:**
`Layout` コンポーネントに `noindex={true}` プロパティを追加します。

```astro
<Layout metadata={metadata} noindex={true}>
  <EnrollmentFlow client:load />
</Layout>
```

### 修正対象 2: `/404` (`src/pages/404.astro`)

**現状:**
```astro
<Layout metadata={{ title }}>
```

**修正案:**
同様に `Layout` コンポーネントに `noindex={true}` プロパティを追加します。

```astro
<Layout metadata={{ title }} noindex={true}>
  <section class="flex items-center h-full p-16">
    ...
  </section>
</Layout>
```
