import * as Data from '@effect/data/Data';
import * as E from '@effect/data/Either';
import { FormatError } from '@mjljm/effect-helmet/format-error';
/**
 * @since 1.0.0
 * @category models
 */
export interface Value<T extends string, V extends string> extends Data.Case {
	readonly _tag: T;
	readonly value: V;
}

export const getValue = <T extends string, V extends string>(self: Value<T, V>): V => self.value;
export const makeWithPattern =
	<T extends string>(pattern: RegExp, tag: T) =>
	(value: string): E.Either<FormatError, Value<T, string>> =>
		pattern.test(value)
			? E.right(Data.tagged<Value<T, string>>(tag)({ value }))
			: E.left(FormatError({ received: value, expected: pattern.source }));
