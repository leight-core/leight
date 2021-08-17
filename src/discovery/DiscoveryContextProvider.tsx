import {FC, useState} from "react";
import {IParams} from "../link/interface";
import {useLinkContext} from "../link/LinkContext";
import {DiscoveryContext} from "./DiscoveryContext";
import {IDiscovery} from "./interface";

export interface IDiscoveryContextProviderProps {
}

export const DiscoveryContextProvider: FC<IDiscoveryContextProviderProps> = ({children}) => {
	const [discovery, setDiscovery] = useState<IDiscovery>();
	const linkContext = useLinkContext();
	return (
		<DiscoveryContext.Provider
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
				setDiscovery,
			}}
			children={children}
		/>
	);
};
