import omitEmpty from "omit-empty";
import {Params} from "react-router";
import {useLayoutContext} from "../layout/LayoutContext";
import {useRouterContext} from "../router/RouterContext";

export interface ICleverLink {
	/**
	 * Is a link enabled (available)?
	 */
	enable: boolean
	/**
	 * Link or an empty string if the link is not available (enabled).
	 */
	link: string
}

/**
 * Generate clever link - it knows if it has all required parameters based on the input.
 *
 * @param to
 * @param params
 */
export function useCleverLink(to: string, params?: Params): ICleverLink {
	const routerContext = useRouterContext();
	const current = omitEmpty({...useLayoutContext().data, ...routerContext.params, ...params});
	try {
		return {
			enable: true,
			link: routerContext.generate(to, current),
		};
	} catch (e) {
		console.error(e);
		return {
			enable: false,
			link: ""
		};
	}
}
