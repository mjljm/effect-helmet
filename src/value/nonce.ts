import * as E from '@effect/data/Either';
import { FormatError } from '@mjljm/effect-helmet/format-error';
import { nonceRegExp } from '@mjljm/effect-helmet/utils';
import { makeWithPattern, type Value } from '@mjljm/effect-helmet/value/value';

/**
 * @since 1.0.0
 * @category models
 */
const tag = 'Nonce';
type Tag = typeof tag;

/**
 * @since 1.0.0
 * @category models
 */
export type Nonce = Value<Tag, string>;

/**
 * @since 1.0.0
 * @category constructor
 */
export const make = (value: string): E.Either<FormatError, Nonce> =>
	makeWithPattern(nonceRegExp, tag)(value);
