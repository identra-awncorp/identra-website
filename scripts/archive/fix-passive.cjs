const fs = require('fs');

const filePath = 'src/components/PassiveSignalsPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the `pt` function to support all languages:
content = content.replace(
  /const pt = \(key: keyof typeof passiveSignalsTranslations\['en'\]\) => \{\n    return passiveSignalsTranslations\[isVi \? 'vi' : 'en'\]\[key\] \|\| passiveSignalsTranslations\['en'\]\[key\] \|\| '';\n  \};/,
  `const pt = (key: keyof typeof passiveSignalsTranslations['en']) => {\n    return (passiveSignalsTranslations as any)[language]?.[key] || passiveSignalsTranslations['en'][key] || '';\n  };`
);

// We should also replace translateLogLabel and translateCategory if they exist and are hardcoded
content = content.replace(
  /const translateLogLabel = \(label: string, isVi: boolean\) => \{[\s\S]*?return label;\n    \}\n  \};/,
  `const translateLogLabel = (label: string, lang: string) => {\n    if (lang === 'vi') {\n      switch (label) {\n        case 'Device OS': return 'Hệ điều hành Thiết bị';\n        case 'IP Address': return 'Địa chỉ IP';\n        case 'Network Connection': return 'Kết nối Mạng';\n        case 'Keystroke Hesitation': return 'Sự ngập ngừng Nhập phím';\n        case 'Autofill/Paste Detection': return 'Phát hiện Tự điền/Dán';\n        case 'Mouse speed jitter': return 'Độ rung tốc độ chuột';\n        default: return label;\n      }\n    }\n    if (lang === 'es') {\n      switch (label) {\n        case 'Device OS': return 'SO del dispositivo';\n        case 'IP Address': return 'Dirección IP';\n        case 'Network Connection': return 'Conexión de red';\n        case 'Keystroke Hesitation': return 'Duda al teclear';\n        case 'Autofill/Paste Detection': return 'Detección de Autocompletar/Pegar';\n        case 'Mouse speed jitter': return 'Fluctuación de la velocidad del ratón';\n        default: return label;\n      }\n    }\n    if (lang === 'ja') {\n      switch (label) {\n        case 'Device OS': return 'デバイス OS';\n        case 'IP Address': return 'IPアドレス';\n        case 'Network Connection': return 'ネットワーク接続';\n        case 'Keystroke Hesitation': return 'キーストロークの迷い';\n        case 'Autofill/Paste Detection': return '自動入力/貼り付けの検出';\n        case 'Mouse speed jitter': return 'マウス速度のジッター';\n        default: return label;\n      }\n    }\n    if (lang === 'de') {\n      switch (label) {\n        case 'Device OS': return 'Geräte-OS';\n        case 'IP Address': return 'IP-Adresse';\n        case 'Network Connection': return 'Netzwerkverbindung';\n        case 'Keystroke Hesitation': return 'Zögern beim Tippen';\n        case 'Autofill/Paste Detection': return 'Erkennung von Autovervollständigen/Einfügen';\n        case 'Mouse speed jitter': return 'Zittern der Mausgeschwindigkeit';\n        default: return label;\n      }\n    }\n    return label;\n  };`
);

content = content.replace(
  /const translateCategory = \(cat: string, isVi: boolean\) => \{[\s\S]*?return cat;\n    \}\n  \};/,
  `const translateCategory = (cat: string, lang: string) => {\n    if (lang === 'vi') {\n      switch (cat) {\n        case 'Device & Network': return 'Thiết bị & Mạng';\n        case 'Behavioral Biometrics': return 'Sinh trắc học Hành vi';\n        default: return cat;\n      }\n    }\n    if (lang === 'es') {\n      switch (cat) {\n        case 'Device & Network': return 'Dispositivo y Red';\n        case 'Behavioral Biometrics': return 'Biometría conductual';\n        default: return cat;\n      }\n    }\n    if (lang === 'ja') {\n      switch (cat) {\n        case 'Device & Network': return 'デバイスとネットワーク';\n        case 'Behavioral Biometrics': return '行動バイオメトリクス';\n        default: return cat;\n      }\n    }\n    if (lang === 'de') {\n      switch (cat) {\n        case 'Device & Network': return 'Gerät & Netzwerk';\n        case 'Behavioral Biometrics': return 'Verhaltensbiometrie';\n        default: return cat;\n      }\n    }\n    return cat;\n  };`
);

// Now we need to update the usages:
content = content.replace(/translateLogLabel\(([^,]+),\s*isVi\)/g, "translateLogLabel($1, language)");
content = content.replace(/translateCategory\(([^,]+),\s*isVi\)/g, "translateCategory($1, language)");

fs.writeFileSync(filePath, content);
console.log("Updated PassiveSignalsPage");
