const fs = require('fs');

const filePath = 'src/components/PassiveSignalsPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /const translateLogValue = \(value: string, isVi: boolean\) => \{[\s\S]*?return value;\n  \};/,
  `const translateLogValue = (value: string, lang: string) => {\n    if (lang === 'vi') {\n      if (value.includes('macOS 14.5')) return 'macOS 14.5 (Apple Silicon)';\n      if (value.includes('VPN proxy detected')) return '185.220.101.4 (Phát hiện VPN proxy)';\n      if (value.includes('Normal typing speed')) return 'Tốc độ gõ bình thường (85 WPM)';\n      if (value.includes('Clipboard paste')) return 'Dán từ clipboard (500 ký tự/giây)';\n      if (value.includes('Human-like cursor')) return 'Chuyển động con trỏ giống con người';\n    }\n    if (lang === 'es') {\n      if (value.includes('macOS 14.5')) return 'macOS 14.5 (Apple Silicon)';\n      if (value.includes('VPN proxy detected')) return '185.220.101.4 (Proxy VPN detectado)';\n      if (value.includes('Normal typing speed')) return 'Velocidad de escritura normal (85 WPM)';\n      if (value.includes('Clipboard paste')) return 'Pegado desde el portapapeles (500 caracteres/seg)';\n      if (value.includes('Human-like cursor')) return 'Movimiento del cursor similar al humano';\n    }\n    if (lang === 'ja') {\n      if (value.includes('macOS 14.5')) return 'macOS 14.5 (Apple Silicon)';\n      if (value.includes('VPN proxy detected')) return '185.220.101.4 (VPN プロキシが検出されました)';\n      if (value.includes('Normal typing speed')) return '通常のタイピング速度 (85 WPM)';\n      if (value.includes('Clipboard paste')) return 'クリップボードからの貼り付け (500文字/秒)';\n      if (value.includes('Human-like cursor')) return '人間のようなカーソルの動き';\n    }\n    if (lang === 'de') {\n      if (value.includes('macOS 14.5')) return 'macOS 14.5 (Apple Silicon)';\n      if (value.includes('VPN proxy detected')) return '185.220.101.4 (VPN-Proxy erkannt)';\n      if (value.includes('Normal typing speed')) return 'Normale Tippgeschwindigkeit (85 WPM)';\n      if (value.includes('Clipboard paste')) return 'Einfügen aus der Zwischenablage (500 Zeichen/Sek)';\n      if (value.includes('Human-like cursor')) return 'Menschenähnliche Cursor-Bewegung';\n    }\n    return value;\n  };`
);

content = content.replace(/translateLogValue\(([^,]+),\s*isVi\)/g, "translateLogValue($1, language)");

fs.writeFileSync(filePath, content);
console.log("Updated PassiveSignalsPage again");
