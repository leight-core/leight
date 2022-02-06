import {CloudDownloadOutlined} from "@ant-design/icons";
import {ClientContext, LoaderLayout, useClientConfigQuery} from "@leight-core/leight";
import {FC, ReactNode} from "react";

export interface IClientProviderProps {
	logo?: ReactNode;
	link: string;
}

export const ClientProvider: FC<IClientProviderProps> = ({logo, link, children}) => {
	const result = useClientConfigQuery(link);
	return <ClientContext.Provider
		value={{
			client: result.data!,
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
