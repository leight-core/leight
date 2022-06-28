import {CloudDownloadOutlined} from "@ant-design/icons";
import {ClientContext, LoaderLayout, useClientConfigQuery} from "@leight-core/leight";
import {FC, PropsWithChildren, ReactNode} from "react";

export type IClientProviderProps = PropsWithChildren<{
	logo?: ReactNode;
	link: string;
}>

export const ClientProvider: FC<IClientProviderProps> = ({logo, link, ...props}) => {
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
			{...props}
		/>
	</ClientContext.Provider>;
};
