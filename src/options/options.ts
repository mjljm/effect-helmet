import * as O from '@effect/data/Option';
import { CspOptions } from '@mjljm/effect-helmet/options/csp-options';

/**
 * @since 1.0.0
 * @category models
 */
export interface Options {
	readonly contentSecurityPolicy: O.Option<CspOptions>;
	readonly contentSecurityPolicyReportOnly: O.Option<CspOptions>;
}
