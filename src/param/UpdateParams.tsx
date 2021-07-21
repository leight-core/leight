import {FC, ReactNode, useEffect} from "react";
import {IParams} from "../interface/interface";
import {useParamContext} from "./ParamContext";

export interface IUpdateParamsProps {
	params?: IParams;
	update?: boolean;
	children?: ReactNode;
}

/**
 * Sets new parameters into ParamsContext; it's useful for sharing data pieces across whole application; the original
 * idea and purpose is an ability to generate links in menu. And elsewhere.
 */
export const UpdateParams: FC<IUpdateParamsProps> = ({params, update = false, children}) => {
	const paramContext = useParamContext();
	useEffect(() => {
		paramContext.setParams(params, update);
	}, [params, update]);
	return <>{children}</>;
};
