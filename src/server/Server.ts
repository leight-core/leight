import {
	createDelete,
	createGet,
	createPatch,
	createPost,
	createPut,
	createUseDelete,
	createUseGet,
	createUsePatch,
	createUsePost,
	createUsePut,
	httpDelete,
	httpGet,
	httpPatch,
	httpPost,
	httpPut,
	ServerRequestTimeout
} from "@leight-core/leight";
import axios from "axios";

axios.defaults.timeout = ServerRequestTimeout;

/**
 * Server just covers basic http method with Axios under the hood.
 */
export const Server = {
	createDelete,
	createUseDelete,
	createGet,
	createUseGet,
	createPatch,
	createUsePatch,
	createPost,
	createUsePost,
	createPut,
	createUsePut,
	httpGet,
	httpPost,
	httpPatch,
	httpPut,
	httpDelete,
};
