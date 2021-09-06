import {CloudDownloadOutlined} from "@ant-design/icons";
import {ClientContext, httpGet, IClient, LoaderLayout} from "@leight-core/leight";
import {FC, ReactNode, useEffect, useState} from "react";

export interface IClientContextProviderProps {
	logo?: ReactNode;
	link?: string;
}

export const ClientContextProvider: FC<IClientContextProviderProps> = ({logo, link, children}) => {
	const [client, setClient] = useState<IClient>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => httpGet<IClient>(link || "/client.json")
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
		<LoaderLayout
			logo={logo}
			icon={<CloudDownloadOutlined/>}
			loading={loading}
			error={error}
			errorText={"Client config failed."}
		>
			{children}
		</LoaderLayout>
	</ClientContext.Provider>;
};
