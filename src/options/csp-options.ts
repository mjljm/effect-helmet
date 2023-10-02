import * as E from '@effect/data/Either';
import { pipe } from '@effect/data/Function';
import * as O from '@effect/data/Option';
import * as Record from '@effect/data/ReadOnlyRecord';
import * as RA from '@effect/data/ReadonlyArray';
import * as Effect from '@effect/io/Effect';
import * as SCADV from '@mjljm/effect-helmet/directive-values/script-attr-directive-value';
import * as SCEDV from '@mjljm/effect-helmet/directive-values/script-elem-directive-value';
import * as TTDV from '@mjljm/effect-helmet/directive-values/trusted-type-directive-value';
import * as UIRDV from '@mjljm/effect-helmet/directive-values/upgrade-insecure-request-directive-value';
import { directiveSep, kebabize, sourceSep } from '@mjljm/effect-helmet/utils';
import * as RTDV from '../directive-values/csp-destination-token.js';
import * as FDV from '../directive-values/csp-frame-sources.js';
import * as CSPDV from '../directive-values/csp-general-sources.js';
import * as RTTDV from '../directive-values/csp-require-trusted-type-targets.js';
import * as SBDV from '../directive-values/csp-sandbox-allowed-operations.js';
import * as DV from '../directive-values/directive-values.js';

/**
 * @since 1.0.0
 * @category models
 */
export interface CspOptions {
	readonly baseUri: O.Option<CSPDV.CspDirectiveValue>;
	readonly childSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly connectSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly defaultSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly fontSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly formAction: O.Option<CSPDV.CspDirectiveValue>;
	readonly frameAncestors: O.Option<FDV.FrameDirectiveValue>;
	readonly frameSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly imageSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly manifestSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly mediaSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly objectSrc: O.Option<CSPDV.CspDirectiveValue>;
	readonly reportTo: O.Option<RTDV.ReportToDirectiveValue>;
	readonly requireTrustedTypesFor: O.Option<RTTDV.RequireTrustedTypeDirectiveValue>;
	readonly sandbox: O.Option<SBDV.SandboxDirectiveValue>;
	readonly scriptSrc: O.Option<SCEDV.ScriptElemDirectiveValue>;
	readonly scriptSrcAttr: O.Option<SCADV.ScriptAttrDirectiveValue>;
	readonly scriptSrcElem: O.Option<SCEDV.ScriptElemDirectiveValue>;
	readonly styleSrc: O.Option<SCEDV.ScriptElemDirectiveValue>;
	readonly styleSrcAttr: O.Option<SCADV.ScriptAttrDirectiveValue>;
	readonly styleSrcElem: O.Option<SCEDV.ScriptElemDirectiveValue>;
	readonly trustedType: O.Option<TTDV.TrustTypeDirectiveValue>;
	readonly upgradeInsecureRequests: O.Option<UIRDV.UpgradeInsecureRequestDirectiveValue>;
	readonly workerSrc: O.Option<CSPDV.CspDirectiveValue>;
}

/**
 * Creates the default Options object. Use this object for broad general protection,
 * then tailor it to your needs thanks to the available combinators (csp-directive-value combinators,...)
 * @since 1.0.0
 * @category constructors
 */

export const defaultCspOptions = (): CspOptions => ({
	baseUri: O.some(CSPDV.selfCspDirective),
	childSrc: O.none(),
	connectSrc: O.none(),
	defaultSrc: O.some(CSPDV.selfCspDirective),
	fontSrc: O.some(
		pipe(CSPDV.selfCspDirective, CSPDV.addPredefinedSources([DV.cspHttps, DV.cspData]))
	),
	formAction: O.some(CSPDV.selfCspDirective),
	frameAncestors: O.some(FDV.selfFrameDirective),
	frameSrc: O.none(),
	imageSrc: O.some(pipe(CSPDV.selfCspDirective, CSPDV.addPredefinedSources([DV.cspData]))),
	manifestSrc: O.none(),
	mediaSrc: O.none(),
	objectSrc: O.some(CSPDV.noneCspDirective),
	reportTo: O.none(),
	requireTrustedTypesFor: O.none(),
	sandbox: O.none(),
	scriptSrc: O.some(SCEDV.selfScriptElemDirective),
	scriptSrcAttr: O.some(SCADV.noneScriptAttrDirective),
	scriptSrcElem: O.none(),
	styleSrc: O.some(
		pipe(
			SCEDV.selfScriptElemDirective,
			SCEDV.addPredefinedSources([DV.cspHttps, DV.cspUnsafeInline])
		)
	),
	styleSrcAttr: O.none(),
	styleSrcElem: O.none(),
	trustedType: O.none(),
	upgradeInsecureRequests: O.none(),
	workerSrc: O.none()
});

/**
 * Builds a CSP string based on the passed directives. Returns an effect for the request-linked
 * directives and a string for the other directives. The goal is to calculate as much as possible
 * at server start. Only request-linked sources will be computed for each request
 * @since 1.0.0
 * @category Conversion
 */

export const toString = (self: CspOptions) =>
	pipe(
		self,
		// We turn the record into an array
		Record.toArray,
		// We filter out directives that are not set and kebabize the directive names
		RA.filterMap(([k, odv]) =>
			O.map<DV.DirectiveValue<string>, [string, DV.DirectiveValue<string>]>(odv, (dv) => [
				kebabize(k),
				dv
			])
		),
		// We partition directives in two groups according to whether they contain request-linked sources
		RA.partitionMap(([k, dv]) =>
			RA.isEmptyReadonlyArray(dv.requestLinkedSources)
				? E.right([k, DV.concatenateSources(dv)] as const)
				: E.left([k, DV.concatenateSources(dv), DV.concatenateRequestLinkedSources(dv)] as const)
		),
		([rlos, os]) =>
			[
				pipe(
					os,
					RA.map(([k, s]) => k + (s === '' ? '' : sourceSep + s)),
					RA.join(directiveSep)
				),
				pipe(
					rlos,
					RA.map(([k, s, e]) =>
						Effect.map(
							e,
							(rls) => k + (s === '' ? '' : sourceSep + s) + (rls === '' ? '' : sourceSep + rls)
						)
					),
					Effect.allWith(),
					Effect.map(RA.join(directiveSep))
				)
			] as const
	);
