import axios from "axios";
import {axiosError, axiosSuccess} from "./events";

/**
 * @param href
 * @param events
 *
 * @returns {CancelTokenSource}
 */
const httpGet = (
	href,
	events,
) => {
	const cancelToken = axios.CancelToken.source();
	axios.get(href, {cancelToken: cancelToken.token})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
};

export default httpGet;
