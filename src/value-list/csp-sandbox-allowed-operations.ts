import * as DV from '@mjljm/effect-helmet/directive-values/directive-values';
import * as KW from '@mjljm/effect-helmet/keywords';

/**
 * @since 1.0.0
 * @category models
 */

export type CspSandboxAllowedOperation =
	| KW.CspAllowDownloads
	| KW.CspAllowDownloadsWithoutUserActivation
	| KW.CspAllowForms
	| KW.CspAllowModals
	| KW.CspAllowOrientationLock
	| KW.CspAllowPointerLock
	| KW.CspAllowPopups
	| KW.CspAllowPopupsToEscapeSandbox
	| KW.CspAllowPresentation
	| KW.CspAllowSameOrigin
	| KW.CspAllowScripts
	| KW.CspAllowStorageAccessByUserActivation
	| KW.CspAllowTopNavigation
	| KW.CspAllowTopNavigationByUserActivation
	| KW.CspAllowTopNavigationToCustomProtocols;

/**
 * @since 1.0.0
 * @category models
 */

export type CspSandboxAllowedOperations = DV.DirectiveValue<CspSandboxAllowedOperation>;

/**
 * Creates an empty CspSandboxAllowedOperations
 * Remark: 'none' not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const empty = DV.empty<CspSandboxAllowedOperation>;

/**
 * Adds the specified predefined sources to the list of authorized sources. A source already
 * present is ignored.
 * @since 1.0.0
 * @category combinators
 */

export const addPredefinedSources = DV.addPredefinedSources<CspSandboxAllowedOperation>;

/**
 * Removes the specified predefined sources from the list of authorized sources.
 * @since 1.0.0
 * @category combinators
 */

export const removePredefinedSources = DV.removePredefinedSources<CspSandboxAllowedOperation>;
