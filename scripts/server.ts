import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { getEnv } from './getEnv.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const env = getEnv();
const port = Number(env.PORT);
const projectName = env.PROJECT_NAME;

if (projectName) {
	// GitHub Pages publishes projects to <username>.github.io/<projectname>
	// This breaks root-relative URLs, so instead use "/projectname/path/" locally
	// and resolve it by redirecting it here to a root relative path.
	const ghPagesPathPattern = new RegExp(`^/${projectName}(/|$)`, 'i');

	app.use((request, response, next) => {
		if (!ghPagesPathPattern.test(request.url)) {
			response.status(404);
			response.send(`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Error</title>
	</head>
	<body>
		<pre>Cannot GET ${request.url}
Did you mean <a href="/${projectName}${request.url}">/${projectName}${request.url}</a>?</pre>
	</body>
</html>`);
			return;
		}

		request.url = request.url.replace(ghPagesPathPattern, '/');
		next();
	});
}

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
