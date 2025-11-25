# 横スクロール問題 調査レポート

## 調査概要

**症状**: スマホ表示（幅 360px 前後）でトップページに横スクロールが発生

**調査日**: 2025-11-25

**調査対象ファイル**:
- `/workspace/src/pages/index.astro`
- `/workspace/src/components/react/NewHomepage.tsx`
- `/workspace/src/layouts/PageLayout.astro`
- `/workspace/src/components/FaqChatLauncher.astro`

---

## 調査方法

1. コードの静的解析
2. viewport width (vw) を使用している箇所の特定
3. 固定位置要素（fixed）の確認
4. パディング・マージンの計算

---

## 発見された問題箇所

### 🔴 **問題1: ヒーローセクションの背景装飾要素（最も疑わしい）**

**ファイル**: `src/components/react/NewHomepage.tsx`

**場所**: 行542-545

```tsx
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-gradient-to-b from-[#BAE6FD] to-transparent rounded-full opacity-70 blur-3xl animate-blob" />
  <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-gradient-to-t from-[#E0F2FE] to-transparent rounded-full opacity-70 blur-3xl animate-blob animation-delay-2000" />
</div>
```

**問題点**:
- 1つ目の装飾要素: `right-[-10%]` で右に10%はみ出し、かつ幅が `w-[80vw]`（80%のビューポート幅）
- 2つ目の装飾要素: `left-[-10%]` で左に10%はみ出し、かつ幅が `w-[70vw]`（70%のビューポート幅）
- **計算例（360pxビューポート）**:
  - 右の装飾: 右端 -10% + 80vw = 360px × (-0.1 + 0.8) = 252px の幅が右にはみ出す可能性
  - 実際の右端位置: 100% + 10% + 一部の幅 = ビューポートを超える

**親要素の `overflow-hidden` の問題**:
- 親に `overflow-hidden` が設定されているが、これが正しく機能していない可能性がある
- または、親要素自体がビューポートからはみ出ている

**修正案**:
```tsx
// オプション1: はみ出さないように位置を調整
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute top-[-20%] right-0 w-[60vw] h-[60vw] bg-gradient-to-b from-[#BAE6FD] to-transparent rounded-full opacity-70 blur-3xl animate-blob" />
  <div className="absolute bottom-[-20%] left-0 w-[50vw] h-[50vw] bg-gradient-to-t from-[#E0F2FE] to-transparent rounded-full opacity-70 blur-3xl animate-blob animation-delay-2000" />
</div>

// オプション2: 親要素の overflow を強化
<div className="absolute inset-0 overflow-hidden" style={{ overflowX: 'hidden' }}>
  {/* 既存のコード */}
</div>

// オプション3: セクション全体に overflow-x-hidden を追加
<section
  id="top"
  className="relative w-full h-[100vh] flex items-center justify-center overflow-x-hidden bg-[#F0F9FF]"
>
```

---

### 🟡 **問題2: ギャラリーセクションのパディング計算**

**ファイル**: `src/components/react/NewHomepage.tsx`

**場所**: 行1037-1044

```tsx
<div
  ref={scrollContainerRef}
  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 px-6 md:px-[max(2rem,calc(50vw-400px))] pb-12"
>
  {galleryImages.map((img, index) => (
    <div
      key={index}
      className="snap-center flex-shrink-0 w-[85vw] md:w-[600px] h-[60vw] md:h-[400px] ..."
    >
```

**問題点**:
- スクロールコンテナ自体は意図的に `overflow-x-auto` を持っているが、親要素のパディング計算が複雑
- モバイルで `px-6` = 左右それぞれ 1.5rem（約24px）= 合計48px
- 子要素の幅: `w-[85vw]` = 85% of viewport width
- **360pxビューポートでの計算**:
  - 85vw = 306px
  - パディング = 48px
  - 合計 = 354px < 360px ✓ （理論上は問題なし）
  
**ただし**、ギャラリーが横スクロール可能な設計なので、これ自体は問題ではない可能性が高い。

**念のための修正案**:
```tsx
// パディングを少し減らす
className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 px-4 md:px-[max(2rem,calc(50vw-400px))] pb-12"

// または、子要素の幅を少し小さくする
className="snap-center flex-shrink-0 w-[80vw] md:w-[600px] h-[60vw] md:h-[400px] ..."
```

---

### 🟡 **問題3: FAQチャットランチャーのラッパー構造**

**ファイル**: `src/components/FaqChatLauncher.astro`

**場所**: 行11-19

```astro
<div
  class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end px-2 sm:px-0 sm:pb-20 pointer-events-none"
>
  <div
    id="faq-chat-iframe-wrapper"
    class="relative w-full h-[min(100vh-4rem,720px)] sm:w-[min(100vw-2rem,420px)] sm:h-[min(70vh,560px)] ..."
  >
```

**問題点**:
- 外側のdivが `inset-x-0`（左右0）で画面全幅
- モバイルで `px-2` のパディング
- 内側のdivが `w-full` で親の幅いっぱいに広がる
- `items-stretch` により、子要素が親の横幅いっぱいに伸びる

**理論上の問題**:
- `w-full` は親の content-box の幅（パディングを除いた幅）になるはず
- ただし、flexboxの `items-stretch` との組み合わせで予期しない動作をする可能性がある

**修正案**:
```astro
<!-- オプション1: items-stretch を削除 -->
<div
  class="fixed inset-x-0 bottom-0 z-50 flex flex-col sm:items-end px-2 sm:px-0 sm:pb-20 pointer-events-none"
>

<!-- オプション2: パディングを内側に移動 -->
<div
  class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end sm:pb-20 pointer-events-none"
>
  <div
    id="faq-chat-iframe-wrapper"
    class="relative w-full h-[min(100vh-4rem,720px)] sm:w-[min(100vw-2rem,420px)] mx-2 sm:mx-0 ..."
  >

<!-- オプション3: 親要素に overflow-x-hidden を追加 -->
<div
  class="fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch sm:items-end px-2 sm:px-0 sm:pb-20 pointer-events-none overflow-x-hidden"
>
```

---

### 🟢 **問題なし: その他の確認した箇所**

以下の要素は調査の結果、問題ないと判断されました：

1. **ドットナビゲーション** (NewHomepage.tsx 行158-182)
   - `fixed right-8` で固定位置
   - 右から32pxの位置なので問題なし

2. **FAQチャットランチャーボタン** (FaqChatLauncher.astro 行47-59)
   - `fixed bottom-6 right-6` で固定位置
   - 問題なし

3. **モバイル目次** (NewHomepage.tsx 行207-240)
   - `w-full` だが、親要素に適切な制約あり
   - `px-5` のパディングも適切

---

## 推奨される調査手順（実機確認）

以下のスクリプトを Chrome DevTools のコンソールで実行してください：

### 1. 基本チェック
```javascript
console.log('scrollWidth:', document.documentElement.scrollWidth);
console.log('innerWidth:', window.innerWidth);
console.log('差分:', document.documentElement.scrollWidth - window.innerWidth, 'px');
```

### 2. 詳細調査
作成したデバッグスクリプトを使用:
```bash
# ブラウザで以下のファイルを開く
http://localhost:4322/check-overflow.js
```

または、直接コンソールで実行:
```javascript
// /workspace/check-overflow.js の内容をコピー＆ペースト
```

### 3. 視覚的確認
```javascript
// すべての要素に赤枠を追加
document.querySelectorAll('*').forEach(el => {
    el.style.outline = '1px solid red';
});
```

---

## 修正の優先度

### 🔴 **高優先度（最優先で対応）**

1. **ヒーローセクションの背景装飾要素**
   - ファイル: `src/components/react/NewHomepage.tsx` 行542-545
   - 修正内容: 装飾要素の位置とサイズを調整、またはセクションに `overflow-x-hidden` を追加

### 🟡 **中優先度（状況に応じて対応）**

2. **FAQチャットランチャーのラッパー**
   - ファイル: `src/components/FaqChatLauncher.astro` 行11-19
   - 修正内容: `items-stretch` の削除、またはパディングの調整

3. **ギャラリーセクション**
   - ファイル: `src/components/react/NewHomepage.tsx` 行1037-1044
   - 修正内容: パディングまたは子要素の幅を微調整（ただし、意図的な横スクロールなので要確認）

---

## 次のステップ

1. ✅ **この調査レポートを確認**
2. ⬜ **Chrome DevTools で実機確認**（iPhone SE / 375px または 360px）
3. ⬜ **デバッグスクリプトを実行して原因を特定**
4. ⬜ **修正案を実装**（実際のコード変更は行っていません）
5. ⬜ **修正後の確認**

---

## 補足情報

### テスト環境
- 推奨ブラウザ: Chrome DevTools のデバイスモード
- 推奨デバイス設定: iPhone SE (375px) または Galaxy S5 (360px)
- URL: http://localhost:4322/ （開発サーバー起動中）

### 関連ファイル
- デバッグスクリプト: `/workspace/check-overflow.js`
- デバッグHTML: `/workspace/debug-overflow.html`

---

**調査完了日時**: 2025-11-25
**調査担当**: Claude 4.5 Sonnet (Background Agent)
