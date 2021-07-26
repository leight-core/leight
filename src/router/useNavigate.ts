import {useRouter} from "next/router";
import {IParams} from "../link/interface";

export interface INavigate {
	(href: string, params?: IParams): void;
}

export const useNavigate = (): INavigate => {
	const router = useRouter();
	return (href: string, params?: IParams) => {
		router.push({pathname: href, query: params});
	};
};
