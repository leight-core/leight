import {IPageIndex} from "../interface/interface";

export function PageIndex(): IPageIndex {
	return {
		total: 0,
		limit: 0,
		size: 0,
		items: [],
	};
}
