import {createContext} from "react";
import {generatePath, Params, useNavigate} from "react-router";
import {useContext} from "../utils/useContext";
import {INavigate, IRouterContext} from "./interface";

/**
 * Global routing context; all stuff related to routing should be used through this.
 */
export const RouterContext = createContext<IRouterContext>(null as unknown as IRouterContext);

/**
 * Hook for router context usage.
 */
export const useRouterContext = () => useContext<IRouterContext>(RouterContext, "RouterContext");

export class RouterContextClass implements IRouterContext {
	matches: Record<string, string> = {};
	links: Record<string, string> = {};
	params: Params = {};

	public setParams(params: Params) {
		this.params = params;
	}

	public routes(callback: (route: (id: string, match: string, href: string) => void) => void): void {
		callback(this.route.bind(this));
	}

	public route(id: string, match: string, href: string): void {
		this.matches[id] = match;
		this.links[id] = href;
	}

	public match(id: string): string {
		if (!this.matches[id]) {
			throw new Error(`Requested unknown match with id [${id}]. Did you register it?`);
		}
		return this.matches[id];
	}

	public link(id: string): string {
		if (!this.links[id]) {
			throw new Error(`Requested unknown link with id [${id}]. Did you register it?`);
		}
		const link = this.links[id];
		try {
			const url = new URL(id);
			/**
			 * Slice because it looks like URL parses protocol including ":".
			 */
			return this.link(url.protocol.slice(0, -1)) + url.pathname;
		} catch (e) {
			return link;
		}
	}

	public generate(href: string, params?: Params): string {
		return generatePath(this.link(href), {...this.params, ...params});
	}

	public useNavigate(): INavigate {
		const navigate = useNavigate();
		return (href: string, params?: Params) => navigate(this.generate(href, params));
	}
}
