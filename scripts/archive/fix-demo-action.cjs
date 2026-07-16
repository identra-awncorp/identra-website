const fs = require('fs');

let content = fs.readFileSync('src/components/DemoScenarioActionPage.tsx', 'utf8');

// fix the bad import
content = content.replace("import React from 'react';\nimport { useLanguage } from '../context/LanguageContext'; { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef } from 'react';\nimport { useLanguage } from '../context/LanguageContext';");

fs.writeFileSync('src/components/DemoScenarioActionPage.tsx', content);
