import {IQueryParams} from "@leight-core/leight";

export interface ILinkContext {
	generate<TQuery extends IQueryParams = IQueryParams>(href: string, query?: TQuery): string;

	link<TQuery extends IQueryParams = IQueryParams>(href: string, query?: TQuery): string;
}
