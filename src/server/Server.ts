import axios from "axios";
import {ServerRequestTimeout} from "./constants";
import {createDelete, createUseDelete} from "./createDelete";
import {createGet, createUseGet} from "./createGet";
import {createPatch, createUsePatch} from "./createPatch";
import {createPost, createUsePost} from "./createPost";
import {createPut, createUsePut} from "./createPut";
import {httpDelete} from "./httpDelete";
import {httpGet} from "./httpGet";
import {httpPatch} from "./httpPatch";
import {httpPost} from "./httpPost";
import {httpPut} from "./httpPut";

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
