// import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
// const { window } = new JSDOM('<!DOCTYPE html>')
// const domPurify = DOMPurify(window)

// const createDOMPurify = require('dompurify');
// const { JSDOM } = require('jsdom');

// const window = new JSDOM('').window;
// const DOMPurify = createDOMPurify(window);


/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = ( content ) => {
	return process.browser ? DOMPurify.sanitize( content ) : content;
	// return typeof window ? DOMPurify.sanitize( content ) : content;
	// return DOMPurify.sanitize( content );
};