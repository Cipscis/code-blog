import type { BuildOptions } from 'esbuild';

import { dist, src } from './paths.js';

export const config: BuildOptions = {
	entryPoints: [
		`${src}/main.ts`,
	],
	outdir: dist,
	bundle: true,
};
