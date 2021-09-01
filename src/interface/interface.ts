export interface IOutputMapper {
	<T extends Object = any>(values: T): T;
}

export interface IDeepMerge {
	<T1, T2>(x: Partial<T1>, y: Partial<T2>): T1 & T2;
}

/**
 * Basic record must have an ID, thus all records must be extended from this type.
 */
export interface IRecordItem {
	id: string;
}

export type IParams = any[] | null | undefined;

export interface ISearchRequest<TParams = any> {
	/** the search string */
	search: string;

	/** limit of returned results (could be internally overridden if too high) */
	limit?: number | null;

	/** extra parameters used for example for result filtering (eg. search just in the context of a client) */
	params?: IParams;
}

export interface ISearchItem {
	id: string;

	name: string;

	type: string;
}

export interface ISearchResult {
	items: ISearchItem[];
}
