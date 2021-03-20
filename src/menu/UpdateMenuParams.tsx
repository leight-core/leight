import {useEffect} from "react";
import {useMenuContext} from "./MenuContext";

export interface IUpdateMenuParamsProps<TParams extends Object = any, TChildren = JSX.Element> {
	params: TParams
	children: TChildren
}

/**
 * Forces redraw of components using MenuContext (thus be careful when using in data fetching and other async
 * components to prevent infinite loop).
 */
export const UpdateMenuParams = <TParams extends Object, TChildren>({params, children}: IUpdateMenuParamsProps<TParams, TChildren>): TChildren => {
	const menuContext = useMenuContext();
	useEffect(() => {
		menuContext.setParams(params);
	}, [params]);
	return children;
};
