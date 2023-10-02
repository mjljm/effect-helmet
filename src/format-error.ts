import * as Data from '@effect/data/Data';

export interface FormatError extends Data.Case {
	readonly _tag: 'FormatError';
	readonly received: string;
	readonly expected: string;
}

export const FormatError = Data.tagged<FormatError>('FormatError');
