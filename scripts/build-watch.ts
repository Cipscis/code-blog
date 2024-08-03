import * as esbuild from 'esbuild';

import { config as mainConfig } from './build-config/main.js';

const mainContext = await esbuild.context({ ...mainConfig });

mainContext.watch();
