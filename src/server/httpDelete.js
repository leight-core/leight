import axios from "axios";
import {
	axiosError,
	axiosSuccess
} from "./events";

/**
 * @param href
 * @param events
 *
 * @returns {CancelTokenSource}
 */
const httpDelete = (
	href,
	events,
) => {
	const cancelToken = axios.CancelToken.source();
	axios.delete(href, {cancelToken: cancelToken.token})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
};

export default httpDelete;
