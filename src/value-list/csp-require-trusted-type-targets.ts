import * as HSet from '@effect/data/HashSet';
import * as DV from '@mjljm/effect-helmet/directive-values/directive-values';
import * as KW from '@mjljm/effect-helmet/keywords';

/**
 * @since 1.0.0
 * @category models
 */

export type CspRequireTrustedTypeTargets = DV.DirectiveValue<KW.CspScript>;

/**
 * Creates a CspRequireTrustedTypeTargets with 'script' as allowed source
 * Remark: empty and 'none' not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const scriptRequireTrustedTypeDirective = DV.make<KW.CspScript>(HSet.make(KW.cspScript));
