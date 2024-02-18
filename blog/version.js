const { writeFileSync } = require('fs');
const { join } = require('path');

const versionFilePath = join(__dirname, 'src', 'version.ts');
const content = `export const VERSION = { timestamp: '${new Date().toISOString()}' };`;

writeFileSync(versionFilePath, content, { encoding: 'utf-8' });