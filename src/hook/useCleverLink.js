import diffArray from "arr-diff";
import omitEmpty from "omit-empty";
import {generatePath, useParams} from "react-router";
import {useLayoutContext} from "../layout/LayoutContext";

const useCleverLink = to => {
	const layoutContext = useLayoutContext();
	const request = to.matchAll(/:([a-z0-9-]+)/g).map(item => item[1]) || [];
	const params = useParams();
	const current = omitEmpty({...layoutContext.data, ...params});
	const diff = diffArray(request, Object.keys(current));
	return {
		enable: !diff.length,
		link: diff.length ? "" : generatePath(to, current),
	};
};

export default useCleverLink;
