import {CompassOutlined} from "@ant-design/icons";
import {DiscoveryContext, IQueryParams, LoaderLayout, useClientContext, useDiscoveryQuery, useLinkContext} from "@leight-core/leight";
import {FC, ReactNode} from "react";

export interface IDiscoveryProviderProps {
	logo?: ReactNode;
}

export const DiscoveryProvider: FC<IDiscoveryProviderProps> = ({logo, children}) => {
	const clientContext = useClientContext();
	const linkContext = useLinkContext();
	const result = useDiscoveryQuery(clientContext.client.discovery);
	return <DiscoveryContext.Provider
		value={{
			link(id: string, params: IQueryParams | undefined): string {
				if (!result.data) {
					throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery is not initialized yet!`);
				}
				if (Object.keys(result.data.index).length === 0) {
					throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery index is empty! Check if backend returns good and nice data.`);
				}
				if (!result.data.index[id]) {
					throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery link does not exist.`);
				}
				/**
				 * A little replace hack to convert `/{foo}/bar` form into `/:foo/bar` form.
				 */
				const link = result.data.index[id].url.replaceAll(/{(.*?)}/g, ":$1");
				try {
					const url = new URL(link);
					url.pathname = linkContext.generate(url.pathname, params);
					return url.href;
				} catch (e) {
					try {
						return linkContext.generate(link, params);
					} catch (e) {
						console.error(`Cannot generate path for ${link} with params`, params);
						throw e;
					}
				}
			},
		}}
	>
		<LoaderLayout
			logo={logo}
			icon={<CompassOutlined/>}
			queryResult={result}
			errorText={"Discovery Failed."}
		>
			{children}
		</LoaderLayout>
	</DiscoveryContext.Provider>;
};
