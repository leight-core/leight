import {ReactNode, useEffect} from "react";
import {Params} from "react-router";
import {useMenuContext} from "./MenuContext";

export interface IUpdateMenuParamsProps<TParams extends Params = any> {
	params: TParams
	children: ReactNode
}

/**
 * Forces redraw of components using MenuContext (thus be careful when using in data fetching and other async
 * components to prevent infinite loop).
 */
export const UpdateMenuParams = <TParams extends Params>({params, children}: IUpdateMenuParamsProps<TParams>) => {
	const menuContext = useMenuContext();
	useEffect(() => {
		menuContext.setParams(params);
	}, [params]);
	return <>{children}</>;
};
