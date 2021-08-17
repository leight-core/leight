import {CloudDownloadOutlined} from "@ant-design/icons";
import {ClientContext, httpGet, IClient, LoaderIcon} from "@leight-core/leight";
import {Result} from "antd";
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
		{loading && !error && <Result
			icon={<CloudDownloadOutlined/>}
			title={<LoaderIcon/>}
		/>}
		{error && <Result
			icon={<CloudDownloadOutlined/>}
			status={"error"}
			title={<LoaderIcon/>}
			subTitle={"Client config failed."}
		/>}
		{!loading && !error && children}
	</ClientContext.Provider>;
};
