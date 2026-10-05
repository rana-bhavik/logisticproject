const fs = require('fs');

const md = fs.readFileSync('Project_Documentation.md', 'utf8');

// A very basic but effective Markdown to HTML converter
let htmlContent = md
  .replace(/^### (.*$)/gim, '<h3 style="color: #2c3e50; font-family: Arial; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px;">$1</h3>')
  .replace(/^## (.*$)/gim, '<h2 style="color: #2980b9; font-family: Arial; border-bottom: 2px solid #2980b9; padding-bottom: 5px; margin-top: 25px;">$1</h2>')
  .replace(/^# (.*$)/gim, '<h1 style="color: #1a252f; font-family: Arial; text-align: center; margin-bottom: 20px;">$1</h1>')
  .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
  .replace(/\*(.*?)\*/g, '<i>$1</i>')
  .replace(/---/g, '<hr style="border: 0; border-top: 1px solid #ccc; margin: 30px 0;">')
  .replace(/`([^`]+)`/g, '<code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: Consolas;">$1</code>')
  .replace(/```(.*?)\n([\s\S]*?)```/g, '<pre style="background-color: #f8f9fa; border: 1px solid #e9ecef; padding: 15px; border-radius: 5px; font-family: Consolas; font-size: 10.5pt; white-space: pre-wrap;">$2</pre>');

// Handle tables manually since basic regex is hard
let rows = htmlContent.split('\n');
let inTable = false;
let processedRows = [];

for (let i = 0; i < rows.length; i++) {
  let line = rows[i];
  if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
    if (!inTable) {
      inTable = true;
      processedRows.push('<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-family: Arial; font-size: 11pt;">');
    }
    // Skip the separator row like |---|---|
    if (line.includes('---')) continue;
    
    let cells = line.split('|').filter(c => c.trim() !== '');
    let rowHtml = '<tr>';
    for (let c of cells) {
      // If it's the first row of the table, make it th
      if (processedRows[processedRows.length - 1] === '<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-family: Arial; font-size: 11pt;">') {
        rowHtml += `<th style="border: 1px solid #ddd; padding: 12px 8px; background-color: #f4f6f8; text-align: left; font-weight: bold; color: #333;">${c.trim()}</th>`;
      } else {
        rowHtml += `<td style="border: 1px solid #ddd; padding: 10px 8px; color: #444;">${c.trim()}</td>`;
      }
    }
    rowHtml += '</tr>';
    processedRows.push(rowHtml);
  } else {
    if (inTable) {
      inTable = false;
      processedRows.push('</table>');
    }
    // Handle standard paragraphs and lists
    if (line.trim().startsWith('- ')) {
      processedRows.push(`<li style="margin-bottom: 5px;">${line.substring(2)}</li>`);
    } else if (line.match(/^\d+\. /)) {
      processedRows.push(`<li style="margin-bottom: 5px;">${line.replace(/^\d+\. /, '')}</li>`);
    } else if (line.trim() !== '' && !line.startsWith('<h') && !line.startsWith('<hr') && !line.startsWith('<pre')) {
      processedRows.push(`<p style="margin-bottom: 10px; line-height: 1.6;">${line}</p>`);
    } else {
      processedRows.push(line);
    }
  }
}
if (inTable) processedRows.push('</table>');

htmlContent = processedRows.join('\n');

// Wrap in Word-friendly HTML document
const finalDoc = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>Project Documentation</title>
<style>
  body {
    font-family: 'Calibri', 'Arial', sans-serif;
    font-size: 11pt;
    color: #333333;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  p { text-align: justify; }
</style>
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
</head>
<body>
${htmlContent}
</body>
</html>
`;

fs.writeFileSync('Logistis_Project_Report.doc', finalDoc);
console.log('Successfully generated Logistis_Project_Report.doc');
