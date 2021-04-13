import {FC, useRef} from "react";
import {generatePath, Params, useNavigate} from "react-router";
import {IParams} from "../interface/interface";
import {INavigateOptions} from "./interface";
import {RouterContext} from "./RouterContext";

export interface IRouterContextProviderProps {
}

export const RouterContextProvider: FC<IRouterContextProviderProps> = ({children}) => {
	const matches = useRef<Record<string, string>>({});
	const links = useRef<Record<string, string>>({});

	const route = (id: string, match: string, href: string) => {
		matches.current[id] = match;
		links.current[id] = href;
	};

	const link = (id: string) => {
		if (!links.current[id]) {
			throw new Error(`Requested unknown link with id [${id}]. Did you register it?`);
		}
		const current = links.current[id];
		try {
			const url = new URL(current);
			/**
			 * Slice because it looks like URL parses protocol including ":".
			 */
			return link(url.protocol.slice(0, -1)) + url.pathname;
		} catch (e) {
			return current;
		}
	};

	const generate = (href: string, params?: IParams) => generatePath(link(href), params as Params);

	return (
		<RouterContext.Provider
			value={{
				routes: (callback: (route: (id: string, match: string, href: string) => void) => void) => callback(route),
				route,
				match: (id: string) => {
					if (!matches.current[id]) {
						throw new Error(`Requested unknown match with id [${id}]. Did you register it?`);
					}
					return matches.current[id];
				},
				link,
				generate,
				useNavigate: (options?: INavigateOptions) => {
					const navigate = useNavigate();
					return (href: string, params?: IParams) => navigate(generate(href, params), options);
				}
			}}
			children={children}
		/>
	);
};
