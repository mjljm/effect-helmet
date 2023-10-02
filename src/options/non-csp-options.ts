import * as O from '@effect/data/Option';
import * as RA from '@effect/data/ReadonlyArray';

/**
 * @since 1.0.0
 * @category models
 */

export type CrossOriginEmbedderPolicyOptions =
	| typeof coepUnsafeNone
	| typeof coepRequireCorp
	| typeof coepCredentialless;

/**
 * @since 1.0.0
 * @category models
 */

export type CrossOriginOpenerPolicyOptions =
	| typeof coopUnsafeNone
	| typeof coopSameOriginAllowPopups
	| typeof coopSameOrigin;

/**
 * @since 1.0.0
 * @category models
 */

export type CrossOriginResourcePolicyOptions =
	| typeof corpSameSite
	| typeof corpSameOrigin
	| typeof corpCrossOrigin;

/**
 * @since 1.0.0
 * @category models
 */

export type OriginAgentClusterOptions = typeof oacNonTrueValue;

/**
 * @since 1.0.0
 * @category models
 */

export type ReferrerPolicyOptions =
	| typeof rpNoReferrer
	| typeof rpNoReferrerWhenDowngrade
	| typeof rpOrigin
	| typeof rpOriginWhenCrossOrigin
	| typeof rpSameOrigin
	| typeof rpStrictOrigin
	| typeof rpStrictOriginWhenCrossOrigin
	| typeof rpUnsafeUrl;

/**
 * @since 1.0.0
 * @category models
 */

export type XContentTypeOptionsOptions = typeof xctoNoSniff;

/**
 * @since 1.0.0
 * @category models
 */

export type XDNSPrefetchControlOptions = typeof xdpcOn | typeof xdpcOff;

/**
 * @since 1.0.0
 * @category models
 */

export type XDownloadOptionsOptions = typeof xdoNoOpen;

/**
 * @since 1.0.0
 * @category models
 */

export type XFrameOptionsOptions = typeof xfoDeny | typeof xfoSameOrigin;

/**
 * @since 1.0.0
 * @category models
 */

export type XPermittedCrossDomainPoliciesOptions =
	| typeof xpcdpNone
	| typeof xpcdpMasterOnly
	| typeof xpcdpByContentType
	| typeof xpcdpAll;

/**
 * @since 1.0.0
 * @category models
 */

export type XXSSProtectionOptions = typeof xxpDefaultValue;

/**
 * @since 1.0.0
 * @category models
 */
export interface NonCspOptions {
	readonly crossOriginEmbedderPolicy: O.Option<CrossOriginEmbedderPolicyOptions>;
	readonly crossOriginOpenerPolicy: O.Option<CrossOriginOpenerPolicyOptions>;
	readonly crossOriginResourcePolicy: O.Option<CrossOriginResourcePolicyOptions>;
	readonly originAgentCluster: O.Option<OriginAgentClusterOptions>;
	readonly referrerPolicy: O.Option<RA.NonEmptyReadonlyArray<ReferrerPolicyOptions>>;

	readonly xContentTypeOptions: O.Option<XContentTypeOptionsOptions>;
	readonly xDNSPrefetchControl: O.Option<XDNSPrefetchControlOptions>;
	readonly xDownloadOptions: O.Option<XDownloadOptionsOptions>;
	readonly xFrameOptions: O.Option<XFrameOptionsOptions>;
	readonly xPermittedCrossDomainPolicies: O.Option<XPermittedCrossDomainPoliciesOptions>;
	readonly xXSSProtection: O.Option<XXSSProtectionOptions>;
}
