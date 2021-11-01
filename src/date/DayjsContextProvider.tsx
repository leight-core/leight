import {DayjsContext} from "@leight-core/leight";
import {FC} from "react";

export interface IDayjsContextProviderProps {
	dayjs: any;
}

export const DayjsContextProvider: FC<IDayjsContextProviderProps> = ({dayjs, children}) => {
	return <DayjsContext.Provider value={{dayjs}}>
		{children}
	</DayjsContext.Provider>;
};
