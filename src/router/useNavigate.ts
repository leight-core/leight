import {IQuery} from "@leight-core/leight";
import {useRouter} from "next/router";

export interface INavigate {
	(href: string, query?: IQuery): void;
}

export const useNavigate = (): INavigate => {
	const router = useRouter();
	return (href: string, query?: IQuery) => {
		router.push({pathname: href, query});
	};
};
