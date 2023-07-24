#!/usr/bin/env node

const path = require('path');
const spawn = require('cross-spawn');

const swcrcPath = path.join(__dirname, '..', '.swcrc');
const cjsPath = path.join(process.cwd(), 'lib', 'cjs');
const esmPath = path.join(process.cwd(), 'lib', 'esm');
const srcPath = path.join(process.cwd(), 'src');

const esmResult = spawn.sync('npx', ['swc', srcPath, '-d', esmPath, '--config-file', swcrcPath, '-C', 'module.type=es6'], {
    stdio: 'inherit'
});

if (esmResult.status !== 0) {
    process.exit(esmResult.status);
}

const cjsResult = spawn.sync('npx', ['swc', srcPath, '-d', cjsPath, '--config-file', swcrcPath, '-C', 'module.type=commonjs'], {
    stdio: 'inherit'
});

process.exit(cjsResult.status);