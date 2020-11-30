import diffArray from "arr-diff";
import omitEmpty from "omit-empty";
import {generatePath, useParams} from "react-router";
import {useLayoutContext} from "../layout/LayoutContext";

/**
 * Generate clever link - it knows if it has all required parameters based on the input.
 *
 * @param {string} to
 * @returns {{enable: boolean, link: string}}
 */
const useCleverLink = to => {
	const layoutContext = useLayoutContext();
	const request = Array.from(to.matchAll(/:([a-z0-9-]+)/g)).map(item => item[1]) || [];
	const params = useParams();
	const current = omitEmpty({...layoutContext.data, ...params});
	const diff = diffArray(request, Object.keys(current));
	return {
		enable: !diff.length,
		link: diff.length ? "" : generatePath(to, current),
	};
};

export default useCleverLink;
