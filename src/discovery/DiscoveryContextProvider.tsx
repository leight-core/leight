import {CompassOutlined} from "@ant-design/icons";
import {DiscoveryContext, httpGet, IDiscovery, IParams, Loader, useClientContext, useLinkContext} from "@leight-core/leight";
import {FC, useEffect, useState} from "react";

export interface IDiscoveryContextProviderProps {
}

export const DiscoveryContextProvider: FC<IDiscoveryContextProviderProps> = ({children}) => {
	const clientContext = useClientContext();
	const [discovery, setDiscovery] = useState<IDiscovery>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const linkContext = useLinkContext();

	useEffect(() => httpGet<IDiscovery>(clientContext.client.discovery)
			.on("response", discovery => {
				setDiscovery(discovery);
				setLoading(false);
			})
			.on("catch", e => {
				console.error(e);
				setError(true);
			})
			.cleaner(),
		[]
	);

	return <DiscoveryContext.Provider
		value={{
			link(id: string, params: IParams | undefined): string {
				if (!discovery) {
					throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery is not initialized yet!`);
				}
				if (Object.keys(discovery.index).length === 0) {
					throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery index is empty! Check if backend returns good and nice data.`);
				}
				if (!discovery.index[id]) {
					throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery link does not exist.`);
				}
				/**
				 * A little replace hack to convert `/{foo}/bar` form into `/:foo/bar` form.
				 */
				const link = discovery.index[id].link.replaceAll(/{(.*?)}/g, ":$1");
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
		<Loader
			icon={<CompassOutlined/>}
			loading={loading}
			error={error}
			errorText={"Discovery Failed."}
		>
			{children}
		</Loader>
	</DiscoveryContext.Provider>;
};
