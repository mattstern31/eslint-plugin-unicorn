'use strict';

module.exports = (fixer, node, replacement) => {
	const {range: [start, end], tail} = node;
	return fixer.replaceTextRange(
		[start + 1, end - (tail ? 1 : 2)],
		replacement
	);
};
