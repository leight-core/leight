import axios from "axios";
import {IEvents} from "../utils/interface";

/**
 * Handle axios error.
 *
 * @param error
 * @param events
 */
export const axiosError = (error, events: IEvents) => {
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
export const axiosSuccess = ({data}, events: IEvents) => {
	events.call("success", data);
	events.call("done");
};
