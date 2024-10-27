import { createHeaderLinks } from 'header-link';

window.addEventListener('load', () => {
	createHeaderLinks();

	// Only load syntax highlighting code if it's necessary on this page
	if (document.querySelector('code[data-language]')) {
		import('syntax-highlighting').then(({ addSyntaxHighlighting }) => {
			addSyntaxHighlighting();
		});
	}
});
