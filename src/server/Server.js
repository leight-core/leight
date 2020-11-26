import httpDelete from "./httpDelete";
import httpGet from "./httpGet";
import httpPatch from "./httpPatch";
import httpPost from "./httpPost";
import httpPut from "./httpPut";

/**
 * Server just covers basic http method with Axios under the hood.
 */
const Server = {
	httpGet,
	httpPost,
	httpPatch,
	httpPut,
	httpDelete,
};

export default Server;
