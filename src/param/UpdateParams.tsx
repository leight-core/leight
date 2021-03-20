import {FC, ReactNode, useEffect} from "react";
import {IParams} from "../interface/interface";
import {useParamContext} from "./ParamContext";

export interface IUpdateParamsProps {
	params?: IParams
	update?: boolean
	children: ReactNode
}

/**
 * Forces redraw of components using MenuContext (thus be careful when using in data fetching and other async
 * components to prevent infinite loop).
 */
export const UpdateParams: FC<IUpdateParamsProps> = ({params, update = false, children}) => {
	const paramContext = useParamContext();
	useEffect(() => {
		paramContext.setParams(params, update);
	}, []);
	return <>{children}</>;
};
