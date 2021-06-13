'use strict';
const getDocumentationUrl = require('./utils/get-documentation-url.js');
const quoteString = require('./utils/quote-string.js');
const replaceTemplateElement = require('./utils/replace-template-element.js');
const escapeTemplateElementRaw = require('./utils/escape-template-element-raw.js');

const defaultMessage = 'Prefer `{{suggest}}` over `{{match}}`.';
const SUGGESTION_MESSAGE_ID = 'replace';
const messages = {
	[SUGGESTION_MESSAGE_ID]: 'Replace `{{match}}` with `{{suggest}}`.'
};

const ignoredIdentifier = new Set([
	'gql',
	'html',
	'svg'
]);

const ignoredMemberExpressionObject = new Set([
	'styled'
]);

const isIgnoredTag = node => {
	if (!node.parent || !node.parent.parent || !node.parent.parent.tag) {
		return false;
	}

	const {tag} = node.parent.parent;

	if (tag.type === 'Identifier' && ignoredIdentifier.has(tag.name)) {
		return true;
	}

	if (tag.type === 'MemberExpression') {
		const {object} = tag;
		if (
			object.type === 'Identifier' &&
			ignoredMemberExpressionObject.has(object.name)
		) {
			return true;
		}
	}

	return false;
};

function getReplacements(patterns) {
	return Object.entries(patterns)
		.map(([match, options]) => {
			if (typeof options === 'string') {
				options = {
					suggest: options
				};
			}

			return {
				match,
				regex: new RegExp(match, 'gu'),
				fix: true,
				...options
			};
		});
}

const create = context => {
	const {patterns} = {
		patterns: {},
		...context.options[0]
	};
	const replacements = getReplacements(patterns);

	if (replacements.length === 0) {
		return {};
	}

	return {
		'Literal, TemplateElement': node => {
			const {type, value, raw} = node;

			let string;
			if (type === 'Literal') {
				string = value;
			} else if (!isIgnoredTag(node)) {
				string = value.raw;
			}

			if (!string || typeof string !== 'string') {
				return;
			}

			const replacement = replacements.find(({regex}) => regex.test(string));

			if (!replacement) {
				return;
			}

			const {fix: autoFix, message = defaultMessage, match, suggest, regex} = replacement;
			const messageData = {
				match,
				suggest
			};
			const problem = {
				node,
				message,
				data: messageData
			};

			const fixed = string.replace(regex, suggest);
			const fix = type === 'Literal' ?
				fixer => fixer.replaceText(
					node,
					quoteString(fixed, raw[0])
				) :
				fixer => replaceTemplateElement(
					fixer,
					node,
					escapeTemplateElementRaw(fixed)
				);

			if (autoFix) {
				problem.fix = fix;
			} else {
				problem.suggest = [
					{
						messageId: SUGGESTION_MESSAGE_ID,
						data: messageData,
						fix
					}
				];
			}

			context.report(problem);
		}
	};
};

const schema = [
	{
		type: 'object',
		properties: {
			patterns: {
				type: 'object',
				additionalProperties: {
					anyOf: [
						{
							type: 'string'
						},
						{
							type: 'object',
							required: [
								'suggest'
							],
							properties: {
								suggest: {
									type: 'string'
								},
								fix: {
									type: 'boolean'
									// Default: true
								},
								message: {
									type: 'string'
									// Default: ''
								}
							},
							additionalProperties: false
						}
					]
				}}
		},
		additionalProperties: false
	}
];

module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Enforce better string content.',
			url: getDocumentationUrl(__filename)
		},
		fixable: 'code',
		schema,
		messages,
		hasSuggestions: true
	}
};
