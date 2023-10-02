import * as HSet from '@effect/data/HashSet';
import * as DV from './directive-values.js';

/**
 * @since 1.0.0
 * @category models
 */
export type ScriptAttrSources = DV.CspNone | DV.CspReportSample | DV.cspUnsafeInline | DV.CspEvals;

/**
 * @since 1.0.0
 * @category models
 */

export type ScriptAttrDirectiveValue = DV.DirectiveValue<ScriptAttrSources>;

/**
 * Creates a ScriptAttrDirectiveValue with 'None' as allowed source
 * Remark: empty not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const noneScriptAttrDirective = DV.make<ScriptAttrSources>(HSet.make(DV.cspNone));

/**
 * Creates a ScriptAttrDirectiveValue with 'Self' as allowed source
 * Remark: empty not allowed for this directive
 * @since 1.0.0
 * @category constructors
 */
export const selfScriptAttrDirective = DV.make<ScriptAttrSources>(HSet.make(DV.cspSelf));

/**
 * Adds the specified predefined sources to the list of authorized sources. A source already
 * present is ignored. If 'None' is added, all other passed values will be ignored.
 * @since 1.0.0
 * @category combinators
 */

export const addPredefinedSources = DV.addPredefinedSources<ScriptAttrSources>;

/**
 * Removes the specified predefined sources from the list of authorized sources.
 * @since 1.0.0
 * @category combinators
 */

export const removePredefinedSources = DV.removePredefinedSources<ScriptAttrSources>;

/**
 * Adds the specified hosts to the list of authorized sources. A host already present
 * is ignored. Note that the validity of the passed host urls is not verified. Refer to
 * Content-Security-Policy documentation for details on permitted values.
 * @since 1.0.0
 * @category combinators
 */
