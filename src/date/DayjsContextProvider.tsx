import {FC} from "react";
import {DayjsContext} from "./DayjsContext";

export interface IDayjsContextProviderProps {
	dayjs: any;
}

export const DayjsContextProvider: FC<IDayjsContextProviderProps> = ({dayjs, children}) => {
	return <DayjsContext.Provider value={dayjs}>
		{children}
	</DayjsContext.Provider>;
};
