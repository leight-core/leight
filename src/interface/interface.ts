/**
 * Basic record must have an ID, thus all records must be extended from this type.
 */
export interface IRecordItem {
	readonly [index: string]: any;

	readonly id: string;
}

export interface IndexOf<T> {
	[index: string]: T;
}
