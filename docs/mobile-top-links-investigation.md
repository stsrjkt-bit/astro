# スマホ版トップページのリンク不具合 調査レポート

**調査日**: 2025-11-22  
**対象サイト**: stsrjk.com (AstroWind ベース)  
**症状**: スマホ幅でトップページの全リンク・ボタンがタップに反応しない

---

## まとめ（結論の要約）

スマホ版でリンクが一切反応しない**最も有力な原因**は、以下の2点です：

### 🔴 主原因：FaqChatLauncher の親コンテナによる画面下部のクリックブロック

`src/components/FaqChatLauncher.astro` の親 `<div>` が、スマホ幅で画面下部全体を覆う透明な領域として存在し、`pointer-events: none` が設定されていないため、SchoolInfo セクションのボタン群を含む画面下部の要素へのタップイベントをすべてブロックしている。

**特定の問題箇所**:

- **ファイル**: `src/components/FaqChatLauncher.astro` (11行目)
- **問題のクラス**: `fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch`
- **スマホ幅での挙動**: `items-stretch` により子要素が横幅いっぱいに引き延ばされ、`gap-3` の隙間部分も含めて親コンテナが画面下部の広範囲を占有
- **z-index**: `z-50` と非常に高く、他の要素より手前に配置される

### 🟡 副次原因：BasicScripts のイベントリスナー初期化タイミングの問題

Astro の `ClientRouter` (View Transitions) を使用しているにもかかわらず、`window.onload` のみに依存した初期化を行っているため、ページ初回ロード時にハンバーガーメニューなどのイベントリスナーが正しくアタッチされない可能性がある。

**特定の問題箇所**:

- **ファイル**: `src/components/common/BasicScripts.astro` (157行目)
- **問題のコード**: `window.onload = onLoad;`
- **欠落している処理**: `astro:page-load` イベントリスナーがない

---

## 1. 画面全体を覆っている可能性があるオーバーレイ要素

### 1.1 FaqChatLauncher（最重要候補）

**ファイルパス**: `src/components/FaqChatLauncher.astro`

**問題のコード** (11行目):

```html
<div class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end gap-3 px-2 sm:px-0"></div>
```

#### 詳細分析

| プロパティ       | 値                       | スマホ幅での影響                      |
| ---------------- | ------------------------ | ------------------------------------- |
| `position`       | `fixed`                  | ビューポートに対して固定配置          |
| `inset-x-0`      | `left: 0; right: 0;`     | 画面の左右いっぱいに広がる            |
| `bottom-0`       | `bottom: 0;`             | 画面下部に配置                        |
| `z-index`        | `z-50`                   | 他の要素より手前（ヘッダーは `z-40`） |
| `flex-direction` | `flex-col`               | 縦方向に子要素を配置                  |
| `align-items`    | `items-stretch` (スマホ) | **子要素を横幅いっぱいに引き延ばす**  |
| `gap`            | `gap-3` (0.75rem)        | 子要素間に隙間を作る                  |

**重要な問題点**:

1. **親コンテナ自体に `pointer-events-none` が設定されていない**
   - 子要素（iframe ラッパーとボタン）は `pointer-events-none` を持つが、親コンテナには指定がない
   - このため、親コンテナの領域（特に `gap-3` で生じる子要素間の隙間）がクリックイベントをキャプチャする

2. **スマホ幅では `items-stretch` により横幅いっぱいに広がる**
   - `sm:items-end` は 640px 以上でのみ適用されるため、スマホ幅では `items-stretch` が有効
   - この結果、親コンテナが画面下部の左右全体を覆う形になる

3. **子要素の構成**:

```
親コンテナ (pointer-events 未指定、z-50)
├── iframe ラッパー (pointer-events-none で初期は非表示)
├── gap-3 の隙間 ← ここが問題！
└── FAQ ボタン (pointer-events: auto)
```

**実際のコード** (src/components/FaqChatLauncher.astro 11-36行目):

```html
<div class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end gap-3 px-2 sm:px-0">
  <!-- チャット本体（iframe） -->
  <div
    id="faq-chat-iframe-wrapper"
    class="w-full h-[min(100vh-4rem,720px)] sm:w-[min(100vw-2rem,420px)] sm:h-[min(70vh,560px)] rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 ease-out translate-y-2 opacity-0 pointer-events-none"
    aria-hidden="true"
  >
    <iframe
      src="{faqChatUrl}"
      title="さとう数理塾 よくある質問チャット"
      class="w-full h-full border-0"
      loading="lazy"
    ></iframe>
  </div>

  <!-- 起動ボタン -->
  <button
    id="faq-chat-toggle"
    type="button"
    class="self-end inline-flex items-center gap-2 rounded-full bg-white/95 border border-slate-200 shadow-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-150"
  >
    <!-- ボタンの中身 -->
  </button>
</div>
```

**どこに配置されているか**:

- `src/layouts/PageLayout.astro` の 32行目で読み込まれている
- ページ全体のレイアウトに含まれるため、トップページを含むすべてのページで表示される

**画面下部の要素をブロックする可能性**: ⭐️⭐️⭐️⭐️⭐️ (最高)

---

### 1.2 その他のオーバーレイ要素候補（問題なし）

#### Header コンポーネント

**ファイルパス**: `src/components/widgets/Header.astro` (53行目)

```html
<header class="top-0 z-40 ..." data-aw-sticky-header></header>
```

- `z-40` で FaqChatLauncher の `z-50` より下
- `inset-0` や `w-screen h-screen` の指定はなし
- スマホメニューは初期状態で `hidden` クラスが付いており、表示されていない
- **問題なし**: 画面全体を覆う要素ではない

#### Footer コンポーネント

**ファイルパス**: `src/components/widgets/Footer.astro` (26行目)

```html
<div class="dark:bg-dark absolute inset-0 pointer-events-none" aria-hidden="true"></div>
```

- `pointer-events-none` が明示的に設定されている
- `absolute inset-0` だが、親要素（footer）に対する相対配置
- **問題なし**: クリックをブロックしない

#### Hero/HeroText/Hero2 コンポーネント

**ファイルパス**:

- `src/components/widgets/Hero.astro` (22行目)
- `src/components/widgets/Hero2.astro` (22行目)
- `src/components/widgets/HeroText.astro` (25行目)

```html
<div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
```

- すべて `pointer-events-none` が設定されている
- **問題なし**: クリックをブロックしない

---

## 2. ハンバーガーメニュー（data-aw-toggle-menu / #header nav）の挙動

### 2.1 ToggleMenu コンポーネント

**ファイルパス**: `src/components/common/ToggleMenu.astro`

**実装** (13行目):

```html
<button type="button" class="..." aria-label="Toggle Menu" data-aw-toggle-menu>
  <span class="sr-only">Toggle Menu</span>
  <!-- ハンバーガーアイコン -->
</button>
```

- ボタン自体のマークアップには問題なし
- `data-aw-toggle-menu` 属性が正しく設定されている

### 2.2 Header でのメニューの配置

**ファイルパス**: `src/components/widgets/Header.astro`

**ハンバーガーボタン** (77-79行目):

```html
<div class="flex items-center md:hidden">
  <ToggleMenu />
</div>
```

**ナビゲーションメニュー本体** (81-84行目):

```html
<nav
  class="items-center w-full md:w-auto hidden md:flex md:mx-5 text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:justify-self-center"
  aria-label="Main navigation"
></nav>
```

**初期状態のクラス**:

- `hidden` クラスが付いている（初期は非表示）
- `md:flex` により、デスクトップ幅（768px以上）では表示される

**JavaScript による切り替え** (src/components/common/BasicScripts.astro 57-65行目):

```javascript
attachEvent('[data-aw-toggle-menu]', 'click', function (_, elem) {
  elem.classList.toggle('expanded');
  document.body.classList.toggle('overflow-hidden');
  document.getElementById('header')?.classList.toggle('h-screen');
  document.getElementById('header')?.classList.toggle('expanded');
  document.getElementById('header')?.classList.toggle('bg-page');
  document.querySelector('#header nav')?.classList.toggle('hidden');
  document.querySelector('#header > div > div:last-child')?.classList.toggle('hidden');
});
```

**問題点**:

- このイベントリスナーは `window.onload` 後に実行される
- しかし、ClientRouter (View Transitions) 環境では、`window.onload` が期待通りに発火しない可能性がある
- 結果として、ハンバーガーボタンをタップしてもイベントリスナーが存在せず、何も起こらない

---

## 3. SchoolInfo セクション（Googleマップ・カレンダー）の確認

### 3.1 コード上の問題有無

**ファイルパス**: `src/components/widgets/SchoolInfo.astro`

**セクション全体** (9行目):

```html
<section class="bg-white text-black py-20 md:py-28"></section>
```

- z-index の指定なし
- 通常の静的な section 要素
- **問題なし**

**リンクボタン** (46-68行目):

```html
<div class="flex flex-col sm:flex-row gap-4 pt-4">
  <a
    href="{calendarUrl}"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-black border-2 border-black rounded-full hover:bg-white hover:text-black transition-all duration-200"
  >
    今月のお休みを Googleカレンダーで見る
  </a>
  <a
    href="{mapUrl}"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black bg-white border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-200"
  >
    Googleマップで教室の場所を見る
  </a>
  <a
    href="/join"
    class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black bg-white border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-200"
  >
    入塾までの流れを見る
  </a>
</div>
```

**確認結果**:

- `<a>` タグは正しく `href` を持っている
- `pointer-events` の明示的な制限はなし
- z-index の指定もなし
- **コード上の問題はない**

### 3.2 なぜタップできないのか

SchoolInfo セクションは `<section>` として通常のドキュメントフロー内に配置されており、z-index も指定されていない（デフォルトの `auto`）。

一方、FaqChatLauncher の親コンテナは：

- `position: fixed` で画面下部に固定
- `z-index: 50` で非常に高い
- 画面下部全体を覆う可能性がある

このため、SchoolInfo セクションのボタンの**上に** FaqChatLauncher が重なっており、タップイベントが FaqChatLauncher の親コンテナでキャプチャされてしまうと考えられる。

**レイヤー構造の推定**:

```
[上層] z-50: FaqChatLauncher 親コンテナ（pointer-events 未指定）← タップイベントを奪う
  ↑
[中層] z-40: Header
  ↑
[下層] z-auto: SchoolInfo セクション（ボタンはここにある）← タップが届かない
```

---

## 4. 「スマホ幅のみ」で発生しうる CSS / z-index / pointer-events 周りの怪しい箇所

### 4.1 FaqChatLauncher のレスポンシブクラス

**ファイルパス**: `src/components/FaqChatLauncher.astro` (11行目)

```html
<div class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end gap-3 px-2 sm:px-0"></div>
```

**問題となるレスポンシブ設定**:

| クラス          | スマホ幅 (< 640px)     | タブレット以上 (≥ 640px) |
| --------------- | ---------------------- | ------------------------ |
| `items-stretch` | ✅ 適用 - 横幅いっぱい | ❌ 無効                  |
| `sm:items-end`  | ❌ 無効                | ✅ 適用 - 右端に寄せる   |
| `px-2`          | ✅ 適用                | ❌ 無効                  |
| `sm:px-0`       | ❌ 無効                | ✅ 適用                  |

**スマホ幅での実際の挙動**:

1. 親コンテナが `items-stretch` により、子要素を横幅いっぱいに引き延ばそうとする
2. iframe ラッパーは `w-full` なので画面幅いっぱいに広がる（ただし `pointer-events-none` で初期は無効）
3. FAQ ボタンは `self-end` で右端に配置される
4. しかし、親コンテナ自体は `flex flex-col` で縦方向に子要素を配置するため、**親コンテナの領域は画面下部の左右全体を覆う**
5. `gap-3` により子要素間に 0.75rem の隙間ができ、その隙間部分が親コンテナの領域として残る
6. 親コンテナには `pointer-events-none` が設定されていないため、この領域がクリックイベントをキャプチャする

**タブレット以上での挙動**:

- `sm:items-end` により子要素が右端に寄せられる
- 親コンテナの実効的な幅も右端のみに限定される
- 画面左側や中央の要素はブロックされない

**なぜスマホのみで問題が起こるのか**:

- Tailwind CSS の `items-stretch` は、flexコンテナの子要素を交差軸（この場合は横方向）いっぱいに引き延ばす
- スマホ幅では `items-stretch` が有効なため、親コンテナが横幅いっぱいに広がる領域を確保する
- この親コンテナに `pointer-events-none` が設定されていないため、画面下部全体がクリック不可になる

### 4.2 Header のスマホメニュー展開時のスタイル

**ファイルパス**: `src/components/common/BasicScripts.astro` (57-65行目)

```javascript
attachEvent('[data-aw-toggle-menu]', 'click', function (_, elem) {
  elem.classList.toggle('expanded');
  document.body.classList.toggle('overflow-hidden');
  document.getElementById('header')?.classList.toggle('h-screen');
  document.getElementById('header')?.classList.toggle('expanded');
  document.getElementById('header')?.classList.toggle('bg-page');
  document.querySelector('#header nav')?.classList.toggle('hidden');
  document.querySelector('#header > div > div:last-child')?.classList.toggle('hidden');
});
```

**展開時に追加されるクラス**:

- `h-screen`: ヘッダーが画面の高さいっぱいに広がる
- `overflow-hidden`: body のスクロールを無効化
- `expanded`: カスタムクラス
- `bg-page`: 背景色を設定

**問題点**:

- このイベントリスナー自体が `window.onload` 後に初期化されるため、そもそもハンバーガーボタンが機能しない
- FaqChatLauncher の問題とは別の、独立した問題

---

## 5. BasicScripts の初期化確認

### 5.1 イベントリスナーの初期化方法

**ファイルパス**: `src/components/common/BasicScripts.astro`

**現在の初期化コード** (43-165行目):

```javascript
<script is:inline define:vars={{ defaultTheme: UI.theme }}>
  // ... 省略 ...

  const onLoad = function () {
    // attachEvent でハンバーガーメニューなどのイベントリスナーをアタッチ
    attachEvent('[data-aw-toggle-menu]', 'click', function (_, elem) {
      // メニュー開閉の処理
    });
    // ... その他のイベントリスナー ...
  };

  const onPageShow = function () {
    // ページ表示時の処理
  };

  window.onload = onLoad;  // ← 問題のある初期化
  window.onpageshow = onPageShow;

  document.addEventListener('astro:after-swap', () => {
    initTheme();
    onLoad();
    onPageShow();
  });
</script>
```

### 5.2 問題点の詳細

#### 🔴 `window.onload` だけに依存している

**問題**:

- `window.onload` は、すべてのリソース（画像、スタイルシートなど）の読み込みが完了してから発火する
- Astro の `ClientRouter` (View Transitions) を使用している場合、初回ページロードでは `window.onload` が期待通りに発火しないことがある
- 特に、他のスクリプトが `window.onload` を上書きしていると、BasicScripts の `onLoad` 関数が実行されない

#### 🔴 `astro:page-load` イベントリスナーがない

**問題**:

- Astro の View Transitions を使用する場合、ページ遷移時には `astro:after-swap` が発火するが、**初回ページロード時には発火しない**
- 初回ページロード時には `astro:page-load` イベントを使用する必要がある
- 現在のコードには `astro:after-swap` のリスナーはあるが、`astro:page-load` のリスナーがない

**Astro のライフサイクルイベント**:

- `astro:page-load`: 初回ページロード時と、View Transitions による遷移後の両方で発火
- `astro:after-swap`: View Transitions による遷移時のみ発火（初回ロードでは発火しない）

**現状の問題**:

1. 初回ページロード時: `window.onload` に依存（タイミングの問題あり）
2. ページ遷移時: `astro:after-swap` で `onLoad()` を再実行（こちらは動作する）

**結果**:

- 初回ページロード時にイベントリスナーが正しくアタッチされない
- ハンバーガーメニューをタップしても反応しない
- 一度別ページに遷移して戻ってくると、`astro:after-swap` で再初期化されるため動作する可能性がある

### 5.3 BasicScripts の配置確認

**配置場所**: `src/layouts/Layout.astro` (46行目)

```html
<body class="antialiased text-default bg-page tracking-tight">
  <slot />

  <BasicScripts />
</body>
```

- `<body>` の最後に配置されている
- `<slot />` の後なので、ページコンテンツの後に実行される
- **配置自体は適切**

**PageLayout での使用**:
`src/layouts/PageLayout.astro` は `Layout.astro` を使用しているため、`BasicScripts` は確実に読み込まれている。

---

## 6. 原因の仮説と修正ポイント

### 6.1 最も有力な原因の仮説

**🔴 主原因: FaqChatLauncher の親コンテナによるクリックブロック**

`src/components/FaqChatLauncher.astro` の親 `<div>` が、以下の理由により画面下部全体のクリックイベントをブロックしている：

1. **親コンテナの配置とサイズ**:
   - `fixed inset-x-0 bottom-0`: 画面下部の左右いっぱいに固定
   - `items-stretch`: スマホ幅で子要素を横幅いっぱいに引き延ばす
   - 結果として、親コンテナ自体が画面下部の広範囲を占有

2. **pointer-events の設定ミス**:
   - 子要素（iframe ラッパー）には `pointer-events-none` が設定されている
   - しかし、**親コンテナには `pointer-events-none` が設定されていない**
   - `gap-3` で生じる子要素間の隙間が、親コンテナの領域として残る
   - この隙間部分がクリックイベントをキャプチャし、背後の SchoolInfo ボタンにイベントが届かない

3. **z-index の高さ**:
   - `z-50` と非常に高い z-index
   - SchoolInfo セクション（z-index 未指定 = auto）より確実に手前に配置される

**影響範囲**:

- SchoolInfo セクションの全ボタン（Googleマップ、カレンダー、入塾案内）
- ページ下部の他のインタラクティブ要素すべて

**なぜスマホのみで発生するのか**:

- `items-stretch` がスマホ幅でのみ適用される（`sm:items-end` は 640px 以上）
- タブレット以上では `sm:items-end` により子要素が右端に寄せられ、親コンテナの実効領域も右端のみになる

---

**🟡 副次原因: BasicScripts のイベントリスナー初期化タイミング**

ハンバーガーメニューが動作しない理由は、`window.onload` だけに依存した初期化と、`astro:page-load` イベントリスナーの欠落による。

1. **初回ページロード時**:
   - `window.onload` が期待通りに発火しない可能性
   - `astro:page-load` イベントリスナーがないため、View Transitions 環境での初期化が不完全

2. **ページ遷移時**:
   - `astro:after-swap` でイベントリスナーが再アタッチされるため、遷移後は動作する可能性がある

**影響範囲**:

- ハンバーガーメニューの開閉
- テーマ切り替えボタン
- その他 BasicScripts で管理されるすべてのインタラクティブ要素

---

### 6.2 コード上の根拠まとめ

| 問題箇所                   | ファイルパス                               | 行番号  | 問題のあるクラス/コード                                                  | 影響度          |
| -------------------------- | ------------------------------------------ | ------- | ------------------------------------------------------------------------ | --------------- |
| FaqChatLauncher 親コンテナ | `src/components/FaqChatLauncher.astro`     | 11      | `fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end` | ⭐️⭐️⭐️⭐️⭐️ |
| BasicScripts 初期化        | `src/components/common/BasicScripts.astro` | 157     | `window.onload = onLoad;`                                                | ⭐️⭐️⭐️⭐️    |
| astro:page-load の欠落     | `src/components/common/BasicScripts.astro` | 160-164 | `document.addEventListener('astro:after-swap', ...)` のみ                | ⭐️⭐️⭐️⭐️    |

---

### 6.3 修正するとしたら、このあたりをいじることになりそう（修正案）

#### 🔧 修正案1: FaqChatLauncher の親コンテナに `pointer-events-none` を追加

**ファイル**: `src/components/FaqChatLauncher.astro` (11行目)

**現在**:

```html
<div class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end gap-3 px-2 sm:px-0"></div>
```

**修正後**:

```html
<div
  class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end gap-3 px-2 sm:px-0 pointer-events-none"
></div>
```

**さらに、子要素に `pointer-events-auto` を追加**:

```html
<div
  class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end gap-3 px-2 sm:px-0 pointer-events-none"
>
  <!-- チャット本体（iframe）: pointer-events-none のままでOK -->
  <div id="faq-chat-iframe-wrapper" class="w-full ... pointer-events-none">
    <iframe src="{faqChatUrl}" ...></iframe>
  </div>

  <!-- 起動ボタン: pointer-events-auto を追加 -->
  <button id="faq-chat-toggle" type="button" class="self-end ... pointer-events-auto">
    <!-- ボタンの中身 -->
  </button>
</div>
```

**修正後の JavaScript** (FaqChatLauncher.astro 48-58行目):

```javascript
const applyState = () => {
  if (isOpen) {
    wrapper.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
    wrapper.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto'); // auto を追加
    wrapper.removeAttribute('aria-hidden');
  } else {
    wrapper.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
    wrapper.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto'); // auto を削除
    wrapper.setAttribute('aria-hidden', 'true');
  }
};
```

**効果**:

- 親コンテナがクリックイベントを通過させる（`pointer-events-none`）
- ボタンと開いた iframe だけがクリック可能（`pointer-events-auto`）
- SchoolInfo セクションのボタンにタップイベントが届くようになる

---

#### 🔧 修正案2: BasicScripts に `astro:page-load` イベントリスナーを追加

**ファイル**: `src/components/common/BasicScripts.astro` (157-164行目)

**現在**:

```javascript
window.onload = onLoad;
window.onpageshow = onPageShow;

document.addEventListener('astro:after-swap', () => {
  initTheme();
  onLoad();
  onPageShow();
});
```

**修正後**:

```javascript
// DOMContentLoaded を使用（window.onload より早く、より確実）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onLoad);
} else {
  onLoad(); // すでに読み込み済みの場合は即実行
}

window.onpageshow = onPageShow;

// Astro View Transitions 対応: 初回ロードと遷移後の両方で実行
document.addEventListener('astro:page-load', () => {
  initTheme();
  onLoad();
  onPageShow();
});
```

**効果**:

- 初回ページロード時に確実にイベントリスナーがアタッチされる
- View Transitions による遷移後も正しく動作する
- `DOMContentLoaded` を使用することで、`window.onload` より早く実行される

---

#### 🔧 修正案3（代替案）: FaqChatLauncher のレイアウトを変更

スマホ幅でも `items-end` を使用し、親コンテナの領域を最小化する。

**ファイル**: `src/components/FaqChatLauncher.astro` (11行目)

**現在**:

```html
<div class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end gap-3 px-2 sm:px-0"></div>
```

**修正後**:

```html
<div class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-end gap-3 px-2 sm:px-0"></div>
```

**変更点**:

- `items-stretch` を削除し、すべての画面幅で `items-end` を使用
- スマホ幅でも子要素が右端に寄せられる

**追加の調整**:

- iframe ラッパーの幅を調整する必要があるかもしれない（現在は `w-full`）

**効果**:

- 親コンテナの実効領域が右端のみになる
- 画面中央や左側の要素をブロックしなくなる

**欠点**:

- スマホ幅で iframe が画面いっぱいに表示されなくなる（デザインの変更が必要かもしれない）

---

### 6.4 推奨する修正の優先順位

1. **最優先: 修正案1** - FaqChatLauncher の `pointer-events` 修正
   - 最も直接的で、副作用が少ない
   - SchoolInfo セクションのボタンがすぐに動作するようになる

2. **第二優先: 修正案2** - BasicScripts の初期化方法改善
   - ハンバーガーメニューが動作するようになる
   - 他のインタラクティブ要素も正しく動作する

3. **検討: 修正案3** - レイアウトの変更
   - デザインへの影響が大きいため、慎重に検討
   - 修正案1で対応できれば不要

---

## 7. 補足情報

### 7.1 ClientRouter (View Transitions) の使用確認

**ファイルパス**: `src/layouts/Layout.astro` (16行目, 40行目)

```javascript
import { ClientRouter } from 'astro:transitions';

// ...

<ClientRouter fallback="swap" />;
```

Astro の View Transitions が有効になっており、ページ遷移時に完全なページリロードではなく、部分的な DOM 更新が行われる。このため、従来の `window.onload` だけに依存した初期化は不適切。

### 7.2 Tailwind CSS のブレークポイント

**ファイルパス**: `tailwind.config.js`

Tailwind CSS のデフォルトブレークポイント:

- `sm`: 640px 以上
- `md`: 768px 以上
- `lg`: 1024px 以上
- `xl`: 1280px 以上

`items-stretch sm:items-end` は、640px 未満（スマホ）で `items-stretch`、640px 以上（タブレット以上）で `items-end` が適用される。

---

## まとめ

スマホ版でリンクが一切反応しない原因は、**FaqChatLauncher の親コンテナが `pointer-events-none` を持たず、画面下部全体をクリックブロックしている**ことが最も有力です。

加えて、**BasicScripts のイベントリスナー初期化が `window.onload` のみに依存しており、View Transitions 環境で正しく動作していない**ことが、ハンバーガーメニューの不具合を引き起こしています。

これらを修正することで、スマホ版でのリンク・ボタンの動作が改善されると考えられます。

---

**以上、調査レポート終わり**
