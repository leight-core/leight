import {IQueryParams} from "@leight-core/leight";
import {useRouter} from "next/router";

export interface INavigate {
	(href: string, query?: IQueryParams): void;
}

export const useNavigate = (): INavigate => {
	const router = useRouter();
	return (href: string, query?: IQueryParams) => {
		router.push({pathname: href, query});
	};
};
