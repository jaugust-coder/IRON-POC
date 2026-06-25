#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('node:fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('node:path');

const reportDir = process.argv[2] || './allure-report';
const customDir = path.join(__dirname, 'static');

if (!fs.existsSync(reportDir)) {
  // eslint-disable-next-line no-console
  console.error(`Error: Report directory ${reportDir} does not exist`);
  process.exit(1);
}

// Copy logo
const logoSource = path.join(customDir, 'logo.svg');
const logoDest = path.join(reportDir, 'data', 'logo.svg');
if (fs.existsSync(logoSource)) {
  fs.mkdirSync(path.dirname(logoDest), { recursive: true });
  fs.copyFileSync(logoSource, logoDest);
  // eslint-disable-next-line no-console
  console.log('✓ Logo copied');
}

// Copy CSS
const cssSource = path.join(customDir, 'custom-theme.css');
const cssDest = path.join(reportDir, 'data', 'custom-theme.css');
if (fs.existsSync(cssSource)) {
  fs.mkdirSync(path.dirname(cssDest), { recursive: true });
  fs.copyFileSync(cssSource, cssDest);
}

// Find and update all HTML files to include custom CSS and logo
function processHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let htmlContent = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add custom CSS link before closing </head>
  if (!htmlContent.includes('custom-theme.css')) {
    htmlContent = htmlContent.replace(
      /<\/head>/i,
      '  <link rel="stylesheet" href="data/custom-theme.css">\n</head>'
    );
    modified = true;
  }

  // Update logo references - look for common Allure logo patterns
  const logoPatterns = [
    /<img[^>]*class="[^"]*logo[^"]*"[^>]*>/gi,
    /<img[^>]*id="[^"]*logo[^"]*"[^>]*>/gi,
    /<svg[^>]*class="[^"]*logo[^"]*"[^>]*>[\s\S]*?<\/svg>/gi
  ];

  for (const pattern of logoPatterns) {
    if (pattern.test(htmlContent)) {
      // Replace with custom logo - keeping the structure but updating the source
      htmlContent = htmlContent.replace(pattern, (match) => {
        // If it's an img tag, update src
        if (match.includes('<img')) {
          return match.replace(/src="[^"]*"/i, 'src="data/logo.svg"');
        }
        // If it's an SVG, replace with img tag
        return '<img src="data/logo.svg" alt="Logo" class="logo" height="32">';
      });
      modified = true;
    }
  }

  // Also try to find logo in header/navbar areas
  if (htmlContent.includes('allure-logo') || htmlContent.includes('logo.svg')) {
    htmlContent = htmlContent.replaceAll(
      /(allure-logo|logo\.svg)/gi,
      'data/logo.svg'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, htmlContent);
    return true;
  }
  return false;
}

// Process index.html and other HTML files
const indexHtmlPath = path.join(reportDir, 'index.html');
if (processHtmlFile(indexHtmlPath)) {
  // eslint-disable-next-line no-console
  console.log('✓ index.html updated');
}

// Process other HTML files in the report
const widgetsDir = path.join(reportDir, 'widgets');
if (fs.existsSync(widgetsDir)) {
  const widgetFiles = fs
    .readdirSync(widgetsDir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => path.join(widgetsDir, file));

  for (const file of widgetFiles) {
    if (processHtmlFile(file)) {
      // eslint-disable-next-line no-console
      console.log(`✓ ${path.basename(file)} updated`);
    }
  }
}
