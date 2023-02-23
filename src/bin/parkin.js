#! /usr/bin/env node

/**
 * This file is used only for testing the CLI quickly without needing to rebuild
 * Before deploying a new version, you should build and run the cli directly to ensure it's working as expected
 */

const { register } = require('esbuild-register/dist/node')
register()
require('./parkin.ts')
