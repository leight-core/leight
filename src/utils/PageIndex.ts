import {IPageIndex} from "@leight-core/leight";

export function PageIndex(): IPageIndex<any> {
	return {
		total: 0,
		size: 0,
		pages: 0,
		count: 0,
		items: [],
	};
}
