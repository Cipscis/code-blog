import hljs from 'highlight.js/lib/core';

import typescript from 'highlight.js/lib/languages/typescript';

let isInitialised = false;
/**
 * Runs code necessary to initialise syntax highlighting, such as
 * registering languages and loading the CSS into the page.
 *
 * This function is idempotent. After the first run, subsequent
 * runs will do nothing.
 */
function initHighlighting() {
	if (isInitialised) {
		return;
	}

	initLanguages();
	initCSS();

	isInitialised = true;
}

/**
 * Register all supported languages for use in syntax highlighting.
 */
function initLanguages() {
	hljs.registerLanguage('typescript', typescript);
}

/**
 * Insert a `<link>` tag into the page to load the syntax highlighting CSS file.
 */
function initCSS() {
	const link = Object.assign(
		document.createElement('link'),
		{
			rel: 'stylesheet',
			href: '/assets/css/syntax-highlighting.css',
		} satisfies Partial<HTMLLinkElement>
	);
	document.head.append(link);
}

/**
 * For each tag that needs highlighting, detect its language and replace its
 * markup with highlighted markup.
 */
export function addSyntaxHighlighting(): void {
	initHighlighting();

	const codeToHighlight = document.querySelectorAll<HTMLElement>('code[data-language]');

	for (const codeEl of codeToHighlight) {
		const language = codeEl.dataset.language;
		if (!language) {
			continue;
		}
		const codeHtml = codeEl.innerHTML;

		const { value } = hljs.highlight(codeHtml, { language });
		codeEl.innerHTML = value;
	}
}
