import {DayjsContext} from "@leight-core/leight";
import {FC, PropsWithChildren} from "react";

export type IDayjsProviderProps = PropsWithChildren<{
	dayjs: any;
}>

export const DayjsProvider: FC<IDayjsProviderProps> = ({dayjs, ...props}) => {
	return <DayjsContext.Provider value={{dayjs}} {...props}/>;
};
