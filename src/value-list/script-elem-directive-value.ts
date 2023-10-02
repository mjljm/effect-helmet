import * as HSet from '@effect/data/HashSet';
import * as DV from './directive-values.js';
/**
 * @since 1.0.0
 * @category models
 */

export type ScriptElemSources =
	| DV.CspNone
	| DV.UrlSources
	| DV.CspReportSample
	| DV.cspUnsafeInline
	| CspStrictDynamic
	| cspUnsafeHashes
	| DV.CspEvals;

/**
 * @since 1.0.0
 * @category models
 */

export type ScriptElemDirectiveValue = DV.DirectiveValue<ScriptElemSources>;

/**
 * Creates a ScriptElemDirectiveValue with 'None' as allowed source
 * Remark: empty not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const noneScriptElemDirective = DV.make<ScriptElemSources>(HSet.make(DV.cspNone));

/**
 * Creates a ScriptElemDirectiveValue with 'Self' as allowed source
 * Remark: empty not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const selfScriptElemDirective = DV.make<ScriptElemSources>(HSet.make(DV.cspSelf));

/**
 * Adds the specified predefined sources to the list of authorized sources. A source already
 * present is ignored. If 'None' is added, all other passed values will be ignored.
 * @since 1.0.0
 * @category combinators
 */

export const addPredefinedSources = DV.addPredefinedSources<ScriptElemSources>;

/**
 * Removes the specified predefined sources from the list of authorized sources.
 * @since 1.0.0
 * @category combinators
 */

export const removePredefinedSources = DV.removePredefinedSources<ScriptElemSources>;

/**
 * Adds the specified hosts, nonces and hashes to the list of authorized sources.
 * A value already present is ignored. Note that the validity of the passed host urls,
 * nonce strings and hash strings is not verified. Refer to Content-Security-Policy
 * documentation for details on permitted values.
 * @since 1.0.0
 * @category combinators
 */

export const addSources = DV.addSources<ScriptElemSources>;

/**
 * Removes the specified hosts, nonces and hashes to the list of authorized sources.
 * Note that the validity of the passed host urls, nonce strings and hash strings is
 * not verified. Refer to Content-Security-Policy documentation for details on permitted
 * values.
 * @since 1.0.0
 * @category combinators
 */

export const removeSources = DV.removeSources<ScriptElemSources>;

/**
 * Adds hosts, nonces and hashes that will be calculated upon request serving. Note that
 * the validity of the host urls; nonce strings and hash strings is not verified. Refer to
 * Content-Security-Policy documentation for details on permitted values.
 *
 * @param a: an array of effects that require a ServerRequest and yield the host url, the nonce
 * string or the hash string in form of a string
 * @since 1.0.0
 * @category combinators
 */

export const addRequestLinkedSources = DV.addRequestLinkedSources<ScriptElemSources>;

/**
 * Removes all request linked sources.
 * @since 1.0.0
 * @category combinators
 */

export const removeAllRequestLinkedSources = DV.removeAllRequestLinkedSources<ScriptElemSources>;
