import {IQueryParams} from "@leight-core/leight";

export interface ILinkContext {
	generate(href: string, query?: IQueryParams): string;
}
