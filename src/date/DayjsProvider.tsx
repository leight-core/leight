import {DayjsContext} from "@leight-core/leight";
import {FC} from "react";

export interface IDayjsProviderProps {
	dayjs: any;
}

export const DayjsProvider: FC<IDayjsProviderProps> = ({dayjs, ...props}) => {
	return <DayjsContext.Provider value={{dayjs}} {...props}/>;
};
