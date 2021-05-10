import {Params} from "react-router";

export interface IParams extends Partial<Params> {
}

export interface IOutputMapper {
	<T extends Object = any>(values: T): T
}

export interface IDeepMerge {
	<T1, T2>(x: Partial<T1>, y: Partial<T2>): T1 & T2
}

export interface ITranslation {
	language: string
	namespace: string
	label: string
	text: string
}

export interface ITranslations {
	translations: ITranslation[]
}

/**
 * Basic record must have an ID, thus all records must be extended from this type.
 */
export interface IRecordItem {
	id: string
}

export interface IPageRequest<TExtra = any> {
	page: number
	size: number
	extra?: TExtra
}

export interface IPageIndex<TItem> {
	total: number
	limit: number
	size: number
	items: TItem[]
}

export interface ISearchRequest {
	search: string
	extra?: any
	limit?: number
}
