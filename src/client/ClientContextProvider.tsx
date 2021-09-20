import {CloudDownloadOutlined} from "@ant-design/icons";
import {ClientContext, LoaderLayout, useClientConfigQuery} from "@leight-core/leight";
import {FC, ReactNode} from "react";

export interface IClientContextProviderProps {
	logo?: ReactNode;
	link?: string;
}

export const ClientContextProvider: FC<IClientContextProviderProps> = ({logo, link, children}) => {
	const {result} = useClientConfigQuery(link || "/client.json");
	return <ClientContext.Provider
		value={{
			client: result.data!!,
		}}
	>
		<LoaderLayout
			logo={logo}
			icon={<CloudDownloadOutlined/>}
			queryResult={result}
			errorText={"Client config failed."}
		>
			{children}
		</LoaderLayout>
	</ClientContext.Provider>;
};
