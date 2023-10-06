// Patterns defined according to https://w3c.github.io/webappsec-csp/#grammardef-scheme-part
const schemeFirstChar = letter;
const schemeNextChar = /[A-Za-z0-9+.-]/.source;
const schemePart = `${schemeFirstChar}${zeroOrMore(schemeNextChar)}`;

const hostChar = /[A-Za-z0-9-]/.source;
const hostWord = oneOrMore(hostChar);
const hostPart = either(star, `${optional(star + dot)}${hostWord}${zeroOrMore(dot + hostWord)}`);

const portPart = either(star, number);

const pChar = /[A-Za-z0-9-._~!$&'()*+,;=:@%]/.source;
const segment = zeroOrMore(pChar);
const segmentNz = oneOrMore(pChar);
const pathPart = `${slash}${optional(segmentNz + zeroOrMore(slash + segment))}`;

const schemeSep = /:\/\//.source;

const schemeSource = makeLine(schemePart + colon);
const hostSource = makeLine(
	optional(schemePart + schemeSep) + hostPart + optional(colon + portPart) + optional(pathPart)
);

const base64ValueChar = /[A-Za-z0-9+/-_]/.source;
const base64Value = oneOrMore(base64ValueChar) + repeatBetween('=', '0', '2');
const nonceBase = /nonce-/.source;
const nonceSource = `${singleQuote}${nonceBase}${base64Value}${singleQuote}`;

const hashAlgorithm = 'sha' + either('256', '384', '512');
const hashSource = `${singleQuote}${hashAlgorithm}${base64Value}${singleQuote}`;

export const schemeRegExp = new RegExp(schemeSource);
export const hostRegExp = new RegExp(hostSource);
export const nonceRegExp = new RegExp(nonceSource);
export const hashRegExp = new RegExp(hashSource);
