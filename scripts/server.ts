import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { getEnv } from './getEnv.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const env = getEnv();
const port = Number(env.PORT);

app.use(express.static('app'));

// Anything not already handled is a 404
app.get('*', (request, response, next) => {
	response.status(404).sendFile(join(__dirname, '../app/404.html'));
});

if (typeof port === 'undefined') {
	throw new Error('Cannot listen on undefined port');
}

if (isNaN(port)) {
	throw new Error('Cannot listen to NaN port');
}

app.listen(port, () => {});
console.log(`Listening on port ${port}`);
