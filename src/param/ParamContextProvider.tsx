import equal from "fast-deep-equal";
import {FC, useState} from "react";
import {useForceUpdate} from "../hook/useForceUpdate";
import {IParams} from "../interface/interface";
import {ParamContext} from "./ParamContext";

export interface IParamContextProviderProps {
}

export const ParamContextProvider: FC<IParamContextProviderProps> = ({children}) => {
	const [params, setParams] = useState<IParams | undefined>();
	const reload = useForceUpdate();
	return (
		<ParamContext.Provider
			value={{
				params,
				/**
				 * Update params just when they're different. This will prevent unnecessary redraws.
				 */
				setParams: (values, update = false) => {
					!equal(params, values) && setParams(values);
					update && reload();
				},
				reload,
			}}
			children={children}
		/>
	);
};
