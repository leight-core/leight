import {FC, useState} from "react";
import {ClientContext} from "./ClientContext";
import {IClient} from "./interface";

export interface IClientContextProviderProps {
}

export const ClientContextProvider: FC<IClientContextProviderProps> = ({children}) => {
	const [client, setClient] = useState<IClient>();
	return (
		<ClientContext.Provider
			value={{
				client: client!!,
				setClient,
			}}
			children={children}
		/>
	);
};
