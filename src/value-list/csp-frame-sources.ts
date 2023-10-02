import * as HSet from '@effect/data/HashSet';
import * as DV from '@mjljm/effect-helmet/directive-values/directive-values';
import * as KW from '@mjljm/effect-helmet/keywords';

/**
 * @since 1.0.0
 * @category models
 */

export type CspFrameSources = DV.DirectiveValue<KW.UrlKeywords>;

/**
 * Creates a CspFrameSources with 'none' as unique allowed source
 * Remark: empty not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const none = DV.make<KW.UrlKeywords>(HSet.make(KW.cspNone));

/**
 * Creates a CspFrameSources with 'self' as unique allowed source
 * Remark: empty not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const self = DV.make<KW.UrlKeywords>(HSet.make(KW.cspSelf));

/**
 * Adds the specified predefined sources to the list of authorized sources.
 * See directive-values.ts for more details
 * @since 1.0.0
 * @category combinators
 */

export const addPredefinedSources = DV.addKeywords<KW.UrlKeywords>;

/**
 * Removes the specified predefined sources from the list of authorized sources.
 * See directive-values.ts for more details
 * @since 1.0.0
 * @category combinators
 */

export const removePredefinedSources = DV.removeKeywords<KW.UrlKeywords>;

/**
 * Adds the specified hosts to the list of authorized sources.
 * See directive-values.ts for more details
 * @since 1.0.0
 * @category combinators
 */

export const addHosts = DV.addValues<KW.UrlKeywords>;

/**
 * Removes the specified hosts from the list of authorized sources.
 * See directive-values.ts for more details
 * @since 1.0.0
 * @category combinators
 */

export const removeHosts = DV.removeValues<KW.UrlKeywords>;

/**
 * Adds predefined sources that will be determined upon request serving.
 * See directive-values.ts for more details
 * @since 1.0.0
 * @category combinators
 */

export const addRequestLinkedPredefinedSources = DV.addRequestLinkedKeywords<KW.UrlKeywords>;

/**
 * Adds sources that will be calculated upon request serving.
 * See directive-values.ts for more details
 * @since 1.0.0
 * @category combinators
 */

export const addRequestLinkedHosts = DV.addRequestLinkedValues<KW.UrlKeywords>;

/**
 * Removes all request linked sources.
 *
 * @since 1.0.0
 * @category combinators
 */

export const removeAllRequestLinkedSources = DV.removeAllRequestLinkedValues<KW.UrlKeywords>;
