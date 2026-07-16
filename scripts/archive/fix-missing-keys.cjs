const fs = require('fs');

const filePath = 'src/components/PassiveSignalsPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const missingKeys = {
  es: {
    Status: "Estado",
    tracked: "rastreado"
  },
  ja: {
    Status: "ステータス",
    tracked: "追跡中"
  },
  de: {
    Status: "Status",
    tracked: "verfolgt"
  },
  vi: {
    Status: "Trạng thái",
    tracked: "được theo dõi"
  }
};

for (const lang of Object.keys(missingKeys)) {
  const langMatch = content.match(new RegExp(`  ${lang}: \\{([\\s\\S]*?)\n  \\}`));
  if (langMatch) {
    let langBlock = langMatch[1];
    for (const [key, val] of Object.entries(missingKeys[lang])) {
      if (!langBlock.includes(`${key}:`)) {
        langBlock += `,\n    ${key}: '${val}'`;
      }
    }
    content = content.replace(langMatch[0], `  ${lang}: {${langBlock}\n  }`);
  }
}

fs.writeFileSync(filePath, content);
console.log("Missing keys added.");
