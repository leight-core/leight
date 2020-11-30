import createDelete from "./createDelete";
import createFetchPage from "./createFetchPage";
import createGet from "./createGet";
import createPost from "./createPost";
import {crud} from "./crud";
import httpDelete from "./httpDelete";
import httpGet from "./httpGet";
import httpPatch from "./httpPatch";
import httpPost from "./httpPost";
import httpPut from "./httpPut";

/**
 * Server just covers basic http method with Axios under the hood.
 */
const Server = {
	createDelete,
	createFetchPage,
	createGet,
	createPost,
	crud,
	httpGet,
	httpPost,
	httpPatch,
	httpPut,
	httpDelete,
};

export default Server;
