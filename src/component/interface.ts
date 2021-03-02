export type IFetchMapper<TData> = (data: TData) => any;

export interface ISearchItem {
	id: string
	name: string
	type: string
}
