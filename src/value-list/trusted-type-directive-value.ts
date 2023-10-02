import * as HSet from '@effect/data/HashSet';
import * as DV from './directive-values.js';

/**
 * @since 1.0.0
 * @category models
 */

export type TrustedTypeSources = CspAllowDuplicates;

/**
 * @since 1.0.0
 * @category models
 */

export type TrustTypeDirectiveValue = DV.DirectiveValue<TrustedTypeSources>;

/**
 * Creates an empty TrustedTypeSources
 * @since 1.0.0
 * @category constructors
 */
export const empty = DV.empty<TrustedTypeSources>;

/**
 * Creates a TrustedTypeSources with 'none' as allowed source
 * Remark: empty not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const noneFrameDirective = DV.make<TrustedTypeSources>(HSet.make(DV.cspNone));

/**
 * Adds the specified predefined sources to the list of authorized sources. A source already
 * present is ignored.
 * @since 1.0.0
 * @category combinators
 */

export const addPredefinedSources = DV.addPredefinedSources<TrustedTypeSources>;

/**
 * Removes the specified predefined sources from the list of authorized sources.
 * @since 1.0.0
 * @category combinators
 */

export const removePredefinedSources = DV.removePredefinedSources<TrustedTypeSources>;

/**
 * Adds the specified policies to the list of authorized policies. A policiy
 * already present is ignored. Note that the validity of the passed policy
 * strings is not verified. Refer to Content-Security-Policy documentation
 * for details on permitted values.
 * @since 1.0.0
 * @category combinators
 */

export const addPolicies = DV.addSources<TrustedTypeSources>;

/**
 * Removes the specified policies from the list of authorized sources. Note that
 * the validity of the passed policy strings is not verified. Refer to Content-Security-Policy
 * documentation for details on permitted values.
 * @since 1.0.0
 * @category combinators
 */

export const removePolicies = DV.removeSources<TrustedTypeSources>;
/**
 * Adds policies that will be calculated upon request serving. Note that the validity
 * of the policy strings is not verified. Refer to Content-Security-Policy documentation for
 * details on permitted values.
 *
 * @param a: an array of effects that require a ServerRequest and yield the policy name
 * in form of a string
 * @since 1.0.0
 * @category combinators
 */

export const addRequestLinkedPolicies = DV.addRequestLinkedSources<TrustedTypeSources>;

/**
 * Removes all request linked sources.
 * @since 1.0.0
 * @category combinators
 */

export const removeAllRequestLinkedHosts = DV.removeAllRequestLinkedSources<TrustedTypeSources>;
