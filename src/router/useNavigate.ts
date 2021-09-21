import {IQueryParams} from "@leight-core/leight";
import {useRouter} from "next/router";

export interface INavigate<TQuery extends IQueryParams = IQueryParams> {
	(href: string, query?: TQuery): void;
}

export const useNavigate = <TQuery extends IQueryParams = IQueryParams>(): INavigate<TQuery> => {
	const router = useRouter();
	return (href: string, query?: TQuery) => {
		router.push({pathname: href, query: query || undefined});
	};
};
