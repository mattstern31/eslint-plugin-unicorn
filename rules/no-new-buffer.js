'use strict';
const getDocumentationUrl = require('./utils/get-documentation-url');

const inferMethod = arguments_ => {
	if (arguments_.length > 0) {
		const [firstArgument] = arguments_;
		if (
			firstArgument.type === 'Literal' &&
			typeof firstArgument.value === 'number'
		) {
			return 'alloc';
		}
	}

	return 'from';
};

const create = context => {
	return {
		'NewExpression[callee.name="Buffer"]': node => {
			const method = inferMethod(node.arguments);
			const range = [
				node.range[0],
				node.callee.range[1]
			];

			context.report({
				node,
				message: `\`new Buffer()\` is deprecated, use \`Buffer.${method}()\` instead.`,
				fix: fixer => fixer.replaceTextRange(range, `Buffer.${method}`)
			});
		}
	};
};

module.exports = {
	create,
	meta: {
		type: 'problem',
		docs: {
			url: getDocumentationUrl(__filename)
		},
		fixable: 'code'
	}
};
