const CssClass = {
	HEADER_LINK_JS: 'js-header-link',
	HEADER_LINK_CSS: 'header-link',
} as const;

const Selector = {
	HEADER_LINK: `.${CssClass.HEADER_LINK_JS}`,
} as const;

/**
 * For each header element with an `id` attribute, create and insert an
 * `<a>` tag that links to that document fragment, for ease of copying.
 */
export function createHeaderLinks(): void {
	const headers = document.querySelectorAll<HTMLElement>(':is(h1, h2, h3, h4, h5, h6)[id]');

	for (const header of headers) {
		createHeaderLink(header);
	}
}

/**
 * Creates and inserts an `<a>` tag for a specified header element.
 */
function createHeaderLink(header: HTMLElement) {
	if (hasHeaderLink(header)) {
		return;
	}

	const headerLink = createHeaderLinkEl(header);
	if (!headerLink) {
		return;
	}

	const headerFirstChild = header.firstChild;
	if (!headerFirstChild) {
		return;
	}
	header.append(headerLink, headerFirstChild);
}

/**
 * Check whether or not an element already contains a header link element.
 */
function hasHeaderLink(header: HTMLElement): boolean {
	return Boolean(header.querySelector(Selector.HEADER_LINK));
}

/**
 * Construct the `<a>` tag to be inserted in a header. Returns `null` if
 * the element doesn't contain all the necessary info, such as an id.
 */
function createHeaderLinkEl(header: HTMLElement): HTMLAnchorElement | null {
	const headerId = header.getAttribute('id');
	if (!headerId) {
		return null;
	}
	const headerText = header.textContent;

	const headerLink = document.createElement('a');
	headerLink.textContent = '🔗';
	headerLink.href = `#${headerId}`;
	if (headerText) {
		headerLink.title = `Direct link to "${headerText}"`;
	}
	headerLink.classList.add(CssClass.HEADER_LINK_JS, CssClass.HEADER_LINK_CSS);

	return headerLink;
}
