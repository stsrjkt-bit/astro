// このスクリプトを Chrome DevTools のコンソールで実行してください
// モバイルビュー（375px）で実行することを推奨

console.log('=== 横スクロール調査開始 ===\n');

// 1. 基本情報
console.log('【基本情報】');
console.log('documentElement.scrollWidth:', document.documentElement.scrollWidth);
console.log('window.innerWidth:', window.innerWidth);
console.log('差分:', document.documentElement.scrollWidth - window.innerWidth, 'px');
console.log('body.scrollWidth:', document.body.scrollWidth);
console.log('body.offsetWidth:', document.body.offsetWidth);
console.log('\n');

// 2. はみ出ている要素を検出
console.log('【はみ出ている要素の検出】');
const viewportWidth = window.innerWidth;
const allElements = Array.from(document.querySelectorAll('*'));
const problematicElements = [];

allElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(el);
    
    // fixedとabsoluteは除外（意図的にはみ出る可能性があるため）
    const position = computedStyle.position;
    
    // 右端がビューポートを超えている要素
    if (rect.right > viewportWidth + 1) { // 1pxの誤差を許容
        const overflow = rect.right - viewportWidth;
        problematicElements.push({
            element: el,
            tag: el.tagName,
            id: el.id || '',
            classes: el.className || '',
            position: position,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            overflow: overflow,
            marginLeft: computedStyle.marginLeft,
            marginRight: computedStyle.marginRight,
            paddingLeft: computedStyle.paddingLeft,
            paddingRight: computedStyle.paddingRight,
        });
    }
});

// オーバーフロー量でソート
problematicElements.sort((a, b) => b.overflow - a.overflow);

console.log(`見つかった要素数: ${problematicElements.length}`);
console.log('\n上位10件:');

problematicElements.slice(0, 10).forEach((item, index) => {
    console.log(`\n${index + 1}. ${item.tag}${item.id ? '#' + item.id : ''}${item.classes ? '.' + item.classes.replace(/\s+/g, '.').substring(0, 50) : ''}`);
    console.log(`   position: ${item.position}`);
    console.log(`   left: ${item.left.toFixed(1)}px, right: ${item.right.toFixed(1)}px, width: ${item.width.toFixed(1)}px`);
    console.log(`   はみ出し量: ${item.overflow.toFixed(1)}px`);
    console.log(`   margin: ${item.marginLeft} / ${item.marginRight}`);
    console.log(`   padding: ${item.paddingLeft} / ${item.paddingRight}`);
    console.log('   ', item.element);
});

// 3. 特定セクションのチェック
console.log('\n\n【特定セクションのチェック】');

// FAQチャット関連
console.log('\n■ FAQチャットランチャー:');
const faqLauncher = document.getElementById('faq-chat-launcher');
if (faqLauncher) {
    const rect = faqLauncher.getBoundingClientRect();
    console.log('  位置:', `left: ${rect.left.toFixed(1)}, right: ${rect.right.toFixed(1)}, width: ${rect.width.toFixed(1)}`);
    console.log('  position:', window.getComputedStyle(faqLauncher).position);
}

const faqWrapper = document.getElementById('faq-chat-iframe-wrapper');
if (faqWrapper) {
    const rect = faqWrapper.getBoundingClientRect();
    const style = window.getComputedStyle(faqWrapper);
    console.log('\n■ FAQチャットラッパー:');
    console.log('  位置:', `left: ${rect.left.toFixed(1)}, right: ${rect.right.toFixed(1)}, width: ${rect.width.toFixed(1)}`);
    console.log('  position:', style.position);
    console.log('  padding:', `${style.paddingLeft} / ${style.paddingRight}`);
    const parent = faqWrapper.parentElement;
    if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const parentStyle = window.getComputedStyle(parent);
        console.log('  親要素:', parent.tagName, parent.className);
        console.log('  親の位置:', `left: ${parentRect.left.toFixed(1)}, right: ${parentRect.right.toFixed(1)}, width: ${parentRect.width.toFixed(1)}`);
        console.log('  親のpadding:', `${parentStyle.paddingLeft} / ${parentStyle.paddingRight}`);
    }
}

// ギャラリーセクション
console.log('\n■ ギャラリーセクション:');
const gallery = document.getElementById('gallery');
if (gallery) {
    const scrollContainers = gallery.querySelectorAll('[class*="overflow-x"]');
    if (scrollContainers.length > 0) {
        scrollContainers.forEach((container, i) => {
            const rect = container.getBoundingClientRect();
            const style = window.getComputedStyle(container);
            console.log(`\n  コンテナ${i + 1}:`, container.className.substring(0, 80));
            console.log(`    位置: left: ${rect.left.toFixed(1)}, right: ${rect.right.toFixed(1)}, width: ${rect.width.toFixed(1)}`);
            console.log(`    padding: ${style.paddingLeft} / ${style.paddingRight}`);
            console.log(`    scrollWidth: ${container.scrollWidth}, clientWidth: ${container.clientWidth}`);
        });
    }
}

// トップセクション
console.log('\n■ トップ（ヒーロー）セクション:');
const topSection = document.getElementById('top');
if (topSection) {
    const rect = topSection.getBoundingClientRect();
    console.log('  位置:', `left: ${rect.left.toFixed(1)}, right: ${rect.right.toFixed(1)}, width: ${rect.width.toFixed(1)}`);
    console.log('  overflow:', window.getComputedStyle(topSection).overflow);
}

console.log('\n\n=== 調査完了 ===');
console.log('\nさらに詳しく調べたい場合は、以下のコマンドで要素に赤枠を追加できます:');
console.log('document.querySelectorAll("*").forEach(el => el.style.outline = "1px solid red")');
