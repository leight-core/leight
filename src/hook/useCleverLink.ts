import diffArray from "arr-diff";
import omitEmpty from "omit-empty";
import {generatePath, useParams} from "react-router";
import {useLayoutContext} from "../layout/LayoutContext";

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
 */
export function useCleverLink(to: string): ICleverLink {
	const layoutContext = useLayoutContext();
	const request = Array.from(to.matchAll(/:([a-z0-9-]+)/g)).map(item => item[1]) || [];
	const params = useParams();
	const current = omitEmpty({...layoutContext.data, ...params});
	const diff = diffArray(request, Object.keys(current));
	return {
		enable: !diff.length,
		link: diff.length ? "" : generatePath(to, current),
	};
}
