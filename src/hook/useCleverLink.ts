import omitEmpty from "omit-empty";
import {IParams} from "../interface/interface";
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
export function useCleverLink(to: string, params?: IParams): ICleverLink {
	const current = omitEmpty(params);
	try {
		return {
			enable: true,
			link: useRouterContext().generate(to, current),
		};
	} catch (e) {
		console.warn(`Cannot generate clever link [${to}].`, "Params", current, e);
		return {
			enable: false,
			link: ""
		};
	}
}
