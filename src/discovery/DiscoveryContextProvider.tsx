import {FC, useState} from "react";
import {generatePath, Params} from "react-router";
import {DiscoveryContext} from "./DiscoveryContext";
import {IDiscovery} from "./interface";

export interface IDiscoveryContextProviderProps {
}

export const DiscoveryContextProvider: FC<IDiscoveryContextProviderProps> = ({children}) => {
	const [discovery, setDiscovery] = useState<IDiscovery>();

	const link = (id: string, params ?: Params) => {
		if (!discovery) {
			throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery is not initialized yet!`);
		}
		if (!discovery[id]) {
			throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery link does not exist.`);
		}
		/**
		 * A little replace hack to convert `/{foo}/bar` form into `/:foo/bar` form.
		 */
		const link = discovery[id].link.replaceAll(/{(.*?)}/g, ":$1");
		try {
			const url = new URL(link);
			url.pathname = generatePath(url.pathname, params);
			return url.href;
		} catch (e) {
			try {
				return generatePath(link, params);
			} catch (e) {
				console.error(`Cannot generate path for ${link} with params`, params);
				throw e;
			}
		}
	};
	return (
		<DiscoveryContext.Provider
			value={{
				link,
				setDiscovery,
			}}
			children={children}
		/>
	);
};
