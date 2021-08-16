import {FC, useState} from "react";
import {AppContext} from "./AppContext";

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
