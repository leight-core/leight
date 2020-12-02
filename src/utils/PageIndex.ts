export interface IPageIndex<TItem = any> {
	total: number
	limit: number
	size: number
	items: TItem[]
}

export function PageIndex(): IPageIndex {
	return {
		total: 0,
		limit: 0,
		size: 0,
		items: [],
	};
}
