import axios from "axios";
import {requestTimeout} from "./constants";
import {createCrud} from "./createCrud";
import {createDelete} from "./createDelete";
import {createFetchPage} from "./createFetchPage";
import {createGet} from "./createGet";
import {createPost} from "./createPost";
import {httpDelete} from "./httpDelete";
import {httpGet} from "./httpGet";
import {httpPatch} from "./httpPatch";
import {httpPost} from "./httpPost";
import {httpPut} from "./httpPut";

axios.defaults.timeout = requestTimeout;

/**
 * Server just covers basic http method with Axios under the hood.
 */
export const Server = {
	createCrud,
	createDelete,
	createFetchPage,
	createGet,
	createPost,
	httpGet,
	httpPost,
	httpPatch,
	httpPut,
	httpDelete,
};
