import * as E from '@effect/data/Either';
import * as Str from '@effect/data/String';
import { FormatError } from '@mjljm/effect-helmet/format-error';
import { HostRegExp } from '@mjljm/effect-helmet/utils';
import { makeWithPattern, type Value } from '@mjljm/effect-helmet/value/value';

/**
 * @since 1.0.0
 * @category models
 */
const tag = 'Host';
type Tag = typeof tag;

/**
 * @since 1.0.0
 * @category models
 */
export type Host = Value<Tag, string>;

/**
 * @since 1.0.0
 * @category constructor
 */
export const make = (value: string): E.Either<FormatError, Host> =>
	makeWithPattern(HostRegExp, tag)(Str.toLowerCase(value));
