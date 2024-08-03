import * as esbuild from 'esbuild';

import { config as mainConfig } from './build-config/main.js';

await Promise.all([
	esbuild.build(mainConfig),
]);
