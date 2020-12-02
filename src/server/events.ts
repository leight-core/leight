import axios from "axios";

/**
 * Handle axios error.
 *
 * @param error
 * @param events
 */
const axiosError = (error, events) => {
	if (axios.isCancel(error)) {
		return;
	}
	if (error.response && error.response.status) {
		events.call("http-" + error.response.status, error.response.data);
	} else {
		events.call("error", error);
	}
	events.call("catch", error);
	events.call("done");
};

/**
 * Handle axios success.
 *
 * @param data
 * @param events
 */
const axiosSuccess = ({data}, events) => {
	events.call("success", data);
	events.call("done");
};

export {
	axiosError,
	axiosSuccess
};
