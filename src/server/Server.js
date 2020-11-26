import createFetchPage from "./createFetchPage";
import createPost from "./createPost";
import httpDelete from "./httpDelete";
import httpGet from "./httpGet";
import httpPatch from "./httpPatch";
import httpPost from "./httpPost";
import httpPut from "./httpPut";

/**
 * Server just covers basic http method with Axios under the hood.
 */
const Server = {
	createFetchPage,
	createPost,
	httpGet,
	httpPost,
	httpPatch,
	httpPut,
	httpDelete,
};

export default Server;
