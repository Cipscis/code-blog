import { writeFileSync } from 'node:fs';

import dotenv from 'dotenv';

import packageJson from '../package.json' with { type: 'json' };

const defaultEnv = `PROJECT_NAME = "${packageJson.name}"
MODE = "development"
PORT = "8080"`;

function init() {
	try {
		// If no .env file exists, create one first
		writeFileSync('.env', defaultEnv, { flag: 'wx' });
		console.log('Creating default .env file');
	} catch (e) {
		// If a .env file exists, just continue
	}

	dotenv.config();
}

export function getEnv(): Partial<Record<string, string>> {
	init();

	return process.env;
}
