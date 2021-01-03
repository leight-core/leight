import omitEmpty from "omit-empty";
import {generatePath, Params, useParams} from "react-router";
import {useLayoutContext} from "../layout/LayoutContext";
import {generate} from "../router/router";

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
	const current = omitEmpty({...useLayoutContext().data, ...useParams(), ...params});
	try {
		return {
			enable: true,
			link: generate(to, current),
		};
	} catch (e) {
		try {
			return {
				enable: true,
				link: generatePath(to, current),
			};
		} catch (e) {
			return {
				enable: false,
				link: ""
			};
		}
	}
}
