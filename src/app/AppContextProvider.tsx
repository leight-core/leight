import {AppContext} from "@leight-core/leight";
import {FC, useState} from "react";

export interface IAppContextProviderProps {
}

export const AppContextProvider: FC<IAppContextProviderProps> = ({children}) => {
	const [ready, setReady] = useState<boolean>(false);
	return <AppContext.Provider
		value={{
			isReady: ready,
			ready: () => setReady(true),
		}}
	>
		{children}
	</AppContext.Provider>;
};
