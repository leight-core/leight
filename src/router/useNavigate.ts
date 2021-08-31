import {IParams} from "@leight-core/leight";
import {useRouter} from "next/router";

export interface INavigate {
	(href: string, params?: IParams): void;
}

export const useNavigate = (): INavigate => {
	const router = useRouter();
	return (href: string, params?: IParams) => {
		router.push({pathname: href, query: params});
	};
};
