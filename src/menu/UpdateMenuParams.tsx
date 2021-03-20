import {ReactNode, useEffect} from "react";
import {IParams} from "../interface/interface";
import {useMenuContext} from "./MenuContext";

export interface IUpdateMenuParamsProps<TParams extends IParams = any> {
	params: TParams
	children: ReactNode
}

/**
 * Forces redraw of components using MenuContext (thus be careful when using in data fetching and other async
 * components to prevent infinite loop).
 */
export const UpdateMenuParams = <TParams extends IParams>({params, children}: IUpdateMenuParamsProps<TParams>) => {
	const menuContext = useMenuContext();
	useEffect(() => {
		menuContext.setParams(params);
	}, []);
	return <>{children}</>;
};
