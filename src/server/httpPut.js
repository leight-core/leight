import axios from "axios";
import {axiosError, axiosSuccess} from "./events";

/**
 * @param {string} href
 * @param {*} data
 * @param {EventsInstanceType} events
 *
 * @returns {CancelTokenSource}
 */
const httpPut = (
	href,
	data,
	events,
) => {
	const cancelToken = axios.CancelToken.source();
	axios.put(href, data, {cancelToken: cancelToken.token})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
};

export default httpPut;
