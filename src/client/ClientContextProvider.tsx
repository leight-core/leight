import {CloudDownloadOutlined} from "@ant-design/icons";
import {ClientContext, httpGet, IClient, Loader} from "@leight-core/leight";
import {FC, useEffect, useState} from "react";

export interface IClientContextProviderProps {
	href?: string;
}

export const ClientContextProvider: FC<IClientContextProviderProps> = ({href, children}) => {
	const [client, setClient] = useState<IClient>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => httpGet<IClient>(href || "/client.json")
		.on("response", client => {
			setClient(client);
			setLoading(false);
		})
		.on("catch", e => {
			console.error(e);
			setError(true);
		})
		.cleaner(), []
	);

	return <ClientContext.Provider
		value={{
			client: client!!,
		}}
	>
		<Loader
			icon={<CloudDownloadOutlined/>}
			loading={loading}
			error={error}
			errorText={"Client config failed."}
		>
			{children}
		</Loader>
	</ClientContext.Provider>;
};
