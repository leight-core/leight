import {IPageIndex} from "../interface/interface";

export function PageIndex(): IPageIndex<any> {
	return {
		total: 0,
		limit: 0,
		size: 0,
		items: [],
	};
}
