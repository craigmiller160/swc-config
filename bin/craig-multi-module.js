#!/user/bin/env node

const path = require('path');
const spawn = require('cross-spawn');

const swcrcPath = path.join(__dirname, '..', '.swcrc');

spawn.sync('npx', ['swc', '-d', './src', '--config-file', swcrcPath, '-C', 'module.type', 'es6']);
spawn.sync('npx', ['swc', '-d', './src', '--config-file', swcrcPath, '-C', 'module.type', 'commonjs']);