import {ClientContext, IClient} from "@leight-core/leight";
import {FC, useState} from "react";

export interface IClientContextProviderProps {
}

export const ClientContextProvider: FC<IClientContextProviderProps> = ({children}) => {
	const [client, setClient] = useState<IClient>();
	return <ClientContext.Provider
		value={{
			client: client!!,
			setClient,
		}}
	>
		{children}
	</ClientContext.Provider>;
};
