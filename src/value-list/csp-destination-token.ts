import * as DV from '@mjljm/effect-helmet/directive-values/directive-values';

const TypeId = '@mjljm/effect-helmet/directive-values/directive-values';
type TypeId = typeof TypeId;

/**
 * @since 1.0.0
 * @category models
 */

export type CspDestinationToken = DV.DirectiveValue<TypeId>;

/**
 * Sets the report-to token. The json content of the token must be declared
 * separately in the report-to header. Any previous token passed is erased.
 * @since 1.0.0
 * @category combinators
 */

export const setToken = DV.replaceValuesBy<TypeId>;

/**
 * Removes the report-to token.
 * @since 1.0.0
 * @category combinators
 */

export const clearToken = DV.removesAllValues<TypeId>;
