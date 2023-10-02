import { pipe } from '@effect/data/Function';
import * as HSet from '@effect/data/HashSet';
import * as RA from '@effect/data/ReadonlyArray';
import * as Effect from '@effect/io/Effect';
import * as Http from '@effect/platform/HttpServer';
import { cspNone, cspReportSample } from '@mjljm/effect-helmet/keywords';

/*
DirectiveValues represents a list of values passed to a directive (e.g the sources of a fontSrc directive)
A value can be:
- a string that must belong to a list a predefined values named keywords. The type parameter T in
DirectiveValues<T> is a union of string literals representing the allowed keywords for this directive.
Such values are added and removed with the addKeywords and removeKeywords functions
- a string that must conform to a schema, for instance a host, a nonce, a hash, a scheme. Such values
are added and removed with the addValues and removeValues functions. For performance sake, no verification
is made as to the validity of the values added with addValues (e.g we don't check the string represents a
valid URL or nonce...). You could therefore use addValues instead of addKeywords to add a keyword. But this
is not recommended as you loose keyword auto-completion and verification by Typescript.
- an effect that uses a server request to produce one of the two kinds of values described above. By passing
an effect instead of a value, you can have request-linked policies. For instance, you could allow JQuery only
for specific routes,... Such values are added and removed with the addRequestLinkedKeyword,
addRequestLinkedValue and removeAllRequestLinkedValues functions.

For performance sake, all non effectful values (i.e. strings) are concatenated at server start.
*/

/**
 * @since 1.0.0
 * @category models
 */

export type RequestLinkedValue = Effect.Effect<Http.request.ServerRequest, never, string>;
export type RequestLinkedKeyword<T extends string> = Effect.Effect<
	Http.request.ServerRequest,
	never,
	T
>;

/**
 * @since 1.0.0
 * @category models
 */

export interface DirectiveValue<T extends string> {
	readonly sources: HSet.HashSet<string | T>;
	readonly requestLinkedSources: ReadonlyArray<RequestLinkedValue>;
	readonly reportSample: boolean;
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const make = <T extends string>(
	sources: HSet.HashSet<string | T> = HSet.empty<string | T>(),
	requestLinkedSources: ReadonlyArray<RequestLinkedValue> = RA.empty(),
	reportSample = false
): DirectiveValue<T> => ({ sources, requestLinkedSources, reportSample });

/**
 * Creates an empty DirectiveValue
 * @since 1.0.0
 * @category constructors
 */
export const empty = <T extends string>(): DirectiveValue<T> => make();

/**
 * Adds the specified keywords to the list of authorized sources. A source already
 * present is ignored.
 * @since 1.0.0
 * @category combinators
 */

export const addKeywords =
	<T extends string>(a: ReadonlyArray<T>) =>
	(self: DirectiveValue<T>): DirectiveValue<T> =>
		addValues<T>(a)(self);

/**
 * Removes the specified predefined keywords from the list of authorized sources.
 * @since 1.0.0
 * @category combinators
 */

export const removeKeywords =
	<T extends string>(a: ReadonlyArray<T>) =>
	(self: DirectiveValue<T>): DirectiveValue<T> =>
		removeValues<T>(a)(self);

/**
 * Adds the specified values to the list of authorized sources. A source already present
 * is ignored. Note that no control is made as to the contents of the input strings. Prefer
 * addKeywords to add keywords so Typescript will provide autocompletion and a list of allowed
 * keywords for this directive.
 * @since 1.0.0
 * @category combinators
 */

export const addValues =
	<T extends string>(a: ReadonlyArray<string>) =>
	(self: DirectiveValue<T>): DirectiveValue<T> => ({
		...self,
		sources: HSet.union(self.sources, a)
	});

/**
 * Removes the specified values from the list of authorized sources. Prefer removeKeywords
 * to remove keywords
 * @since 1.0.0
 * @category combinators
 */

export const removeValues =
	<T extends string>(a: ReadonlyArray<string>) =>
	(self: DirectiveValue<T>): DirectiveValue<T> => ({
		...self,
		sources: HSet.difference(self.sources, a)
	});

/**
 * Replaces all the values by the specified value
 * @since 1.0.0
 * @category combinators
 */

export const replaceValuesBy =
	<T extends string>(a: string) =>
	(self: DirectiveValue<T>): DirectiveValue<T> => ({
		...self,
		sources: HSet.make(a)
	});

/**
 * Removes all values
 * @since 1.0.0
 * @category combinators
 */

export const removesAllValues = <T extends string>(self: DirectiveValue<T>): DirectiveValue<T> => ({
	...self,
	sources: HSet.empty()
});

/**
 * Adds keywords that will be determined upon request serving.
 * @since 1.0.0
 * @category combinators
 */

export const addRequestLinkedKeywords = <T extends string>(a: Array<RequestLinkedKeyword<T>>) =>
	addRequestLinkedValues(a);

/**
 * Adds values that will be calculated upon request serving. Prefer addRequestLinkedKeywords to add
 * keywords so Typescript will provide autocompletion and a list of allowed keywords for this directive
 * @since 1.0.0
 * @category combinators
 */

export const addRequestLinkedValues =
	<T extends string>(a: Array<RequestLinkedValue>) =>
	(self: DirectiveValue<T>): DirectiveValue<T> => ({
		...self,
		requestLinkedSources: RA.appendAll(self.requestLinkedSources, a)
	});

/**
 * Removes all request linked values.
 * @since 1.0.0
 * @category combinators
 */

export const removeAllRequestLinkedValues = <T extends string>(
	self: DirectiveValue<T>
): DirectiveValue<T> => ({
	...self,
	requestLinkedSources: RA.empty()
});

/**
 * Returns a copy of self with the reportSample flag set.
 * @since 1.0.0
 * @category combinators
 */

export const setReportSample = <T extends string>(self: DirectiveValue<T>): DirectiveValue<T> => ({
	...self,
	reportSample: true
});

/**
 * Returns a copy of self with the reportSample flag set to false.
 * @since 1.0.0
 * @category combinators
 */

export const unsetReportSample = <T extends string>(
	self: DirectiveValue<T>
): DirectiveValue<T> => ({
	...self,
	reportSample: false
});

/**
 * Local function. Concatenates string values joining them with valueSep. If removeAllIfNonePresent
 * is set and cspNone is one of the values, all other values are discarded as they will be ignored
 * by the navigators.
 * @since 1.0.0
 * @category utils
 */

const concatenateStringValues =
	(valueSep: string, removeAllIfNonePresent: boolean, reportSample: boolean) =>
	(values: HSet.HashSet<string>): string =>
		(removeAllIfNonePresent && HSet.has(values, cspNone)
			? cspNone
			: RA.join(RA.fromIterable(values), valueSep)) +
		(reportSample ? valueSep + cspReportSample : '');

/**
 * Concatenates all values.
 *
 * 1) If no request-linked value is present, returns a string of the concatenated
 * values joining them with valueSep. If removeAllIfNonePresent is set and cspNone is one of the values,
 * all other values are discarded as they will be ignored
 * by the navigators.
 *
 * 2) If there is at least one request-linked value, returns an effect that performs the algorithm described
 * in 1).
 * @since 1.0.0
 * @category utils
 */

export const concatenateValues =
	(valueSep = '', removeAllIfNonePresent = true) =>
	<T extends string>(self: DirectiveValue<T>): string | RequestLinkedValue =>
		RA.isEmptyReadonlyArray(self.requestLinkedSources)
			? concatenateStringValues(valueSep, removeAllIfNonePresent, self.reportSample)(self.sources)
			: pipe(
					self.requestLinkedSources,
					Effect.allWith(),
					Effect.map((rls) =>
						pipe(HSet.union(self.sources, rls), (vs) =>
							concatenateStringValues(valueSep, removeAllIfNonePresent, self.reportSample)(vs)
						)
					)
			  );
