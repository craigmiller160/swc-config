#!/usr/bin/env node

const path = require('path');
const spawn = require('cross-spawn');

const swcrcPath = path.join(__dirname, '..', '.swcrc');
const cjsPath = path.join(process.cwd(), 'lib', 'cjs');
const esmPath = path.join(process.cwd(), 'lib', 'esm');
const srcPath = path.join(process.cwd(), 'src');

const handleError = (result) => {
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }
};

const esmResult = spawn.sync('swc', [srcPath, '-d', esmPath, '--config-file', swcrcPath, '-C', 'module.type=es6'], {
    stdio: 'inherit'
});
handleError(esmResult);

if (esmResult.status !== 0) {
    process.exit(esmResult.status);
}

const cjsResult = spawn.sync('swc', [srcPath, '-d', cjsPath, '--config-file', swcrcPath, '-C', 'module.type=commonjs'], {
    stdio: 'inherit'
});
handleError(cjsResult);

process.exit(cjsResult.status);