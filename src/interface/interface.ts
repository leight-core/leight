/**
 * Basic record must have an ID, thus all records must be extended from this type.
 */
export interface IRecordItem {
	id: string;
}

export interface IndexOf<T> {
	[index: string]: T;
}
